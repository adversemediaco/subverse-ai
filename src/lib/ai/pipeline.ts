import "server-only";
import { transcribeAudio, translateSegments, generateContent, type ContentKind, type TranscriptSegment } from "@/lib/ai/openai";
import { getPresignedDownloadUrl } from "@/lib/storage/r2";
import { prisma } from "@/lib/db/prisma";
import { isDatabaseEnabled, isOpenAIEnabled, isR2Enabled } from "@/lib/config";

/**
 * End-to-end processing pipeline orchestration.
 *
 * runPipeline() ties together the individual services:
 *   R2 (fetch video) → Whisper (transcribe) → DB (save subtitles)
 *   → translate each target language → generate each content type.
 *
 * It is intentionally synchronous-friendly for reasonably-sized clips. For
 * large videos, production would extract/compress audio with FFmpeg and chunk
 * it in a background worker (Whisper's API accepts files up to 25MB). The
 * `maxBytes` guard makes that limit explicit.
 *
 * Every stage is guarded — if a required service is missing, that stage is
 * skipped so the pipeline degrades gracefully instead of throwing.
 */

const WHISPER_MAX_BYTES = 25 * 1024 * 1024; // 25MB API limit

export interface PipelineOptions {
  projectId: string;
  videoKey?: string | null;
  sourceLanguage?: string;
  targetLanguages?: string[];
  contentTypes?: ContentKind[];
  tone?: string;
}

export interface PipelineResult {
  transcribed: boolean;
  segmentCount: number;
  translatedLanguages: string[];
  generatedContent: ContentKind[];
  skipped: string[];
}

/**
 * Fetch the uploaded video/audio from R2 as a File for Whisper.
 * Throws if the object is larger than Whisper's limit.
 */
async function fetchMediaFile(videoKey: string): Promise<File> {
  const url = await getPresignedDownloadUrl(videoKey, 600);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch media from storage (${res.status})`);

  const contentLength = Number(res.headers.get("content-length") ?? 0);
  if (contentLength > WHISPER_MAX_BYTES) {
    throw new Error(
      `Media is ${(contentLength / 1024 / 1024).toFixed(0)}MB. Whisper accepts up to 25MB — extract/compress audio first (FFmpeg worker).`
    );
  }

  const blob = await res.blob();
  const filename = videoKey.split("/").pop() || "audio.mp4";
  return new File([blob], filename, { type: blob.type || "audio/mpeg" });
}

export async function runPipeline(options: PipelineOptions): Promise<PipelineResult> {
  const {
    projectId,
    videoKey,
    sourceLanguage = "en",
    targetLanguages = [],
    contentTypes = [],
    tone = "professional",
  } = options;

  const result: PipelineResult = {
    transcribed: false,
    segmentCount: 0,
    translatedLanguages: [],
    generatedContent: [],
    skipped: [],
  };

  // ---- 1. Transcription (requires OpenAI + R2 to fetch the media) ----
  if (!isOpenAIEnabled) {
    result.skipped.push("transcription:no-openai");
    return result;
  }
  if (!isR2Enabled || !videoKey) {
    result.skipped.push("transcription:no-media");
    return result;
  }

  const mediaFile = await fetchMediaFile(videoKey);
  const { segments, text } = await transcribeAudio(mediaFile, sourceLanguage);
  result.transcribed = true;
  result.segmentCount = segments.length;

  // ---- 2. Persist the source subtitle track ----
  if (isDatabaseEnabled) {
    await saveSubtitleTrack(projectId, sourceLanguage, segments);
  }

  // ---- 3. Translations ----
  for (const lang of targetLanguages) {
    if (lang === sourceLanguage) continue;
    try {
      const translated = await translateSegments(segments, lang);
      result.translatedLanguages.push(lang);
      if (isDatabaseEnabled) {
        await prisma.translation.upsert({
          where: { projectId_language: { projectId, language: lang } },
          update: { status: "COMPLETE", progress: 100, segments: translated as unknown as object },
          create: {
            projectId,
            language: lang,
            status: "COMPLETE",
            progress: 100,
            segments: translated as unknown as object,
          },
        });
      }
    } catch (err) {
      console.error(`Translation failed for ${lang}:`, err);
      result.skipped.push(`translation:${lang}`);
    }
  }

  // ---- 4. AI content generation ----
  for (const kind of contentTypes) {
    try {
      const content = await generateContent(text, kind, tone);
      result.generatedContent.push(kind);
      if (isDatabaseEnabled) {
        await prisma.generatedContent.create({
          data: {
            projectId,
            type: mapContentKindToDbType(kind),
            content,
            tone,
          },
        });
      }
    } catch (err) {
      console.error(`Content generation failed for ${kind}:`, err);
      result.skipped.push(`content:${kind}`);
    }
  }

  // ---- 5. Mark complete ----
  if (isDatabaseEnabled) {
    await prisma.project.update({
      where: { id: projectId },
      data: { status: "COMPLETE" },
    });
  }

  return result;
}

/** Persist a subtitle track and its segments (replaces any existing track). */
async function saveSubtitleTrack(
  projectId: string,
  language: string,
  segments: TranscriptSegment[]
) {
  const existing = await prisma.subtitle.findUnique({
    where: { projectId_language: { projectId, language } },
  });
  if (existing) {
    await prisma.subtitleSegment.deleteMany({ where: { subtitleId: existing.id } });
    await prisma.subtitle.delete({ where: { id: existing.id } });
  }

  await prisma.subtitle.create({
    data: {
      projectId,
      language,
      wordCount: segments.reduce((n, s) => n + s.text.split(/\s+/).length, 0),
      segments: {
        create: segments.map((s, i) => ({
          index: i,
          startTime: s.start,
          endTime: s.end,
          text: s.text,
        })),
      },
    },
  });
}

/** Map the UI content kind to the Prisma ContentType enum value. */
function mapContentKindToDbType(kind: ContentKind): string {
  const map: Record<ContentKind, string> = {
    instagram: "INSTAGRAM_CAPTION",
    linkedin: "LINKEDIN_POST",
    twitter: "TWITTER_THREAD",
    blog: "BLOG_ARTICLE",
    newsletter: "NEWSLETTER",
    seo: "SEO_DESCRIPTION",
    hashtags: "HASHTAGS",
    "youtube-title": "YOUTUBE_TITLE",
  };
  return map[kind];
}
