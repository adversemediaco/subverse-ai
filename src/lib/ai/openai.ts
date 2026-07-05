import "server-only";
import OpenAI from "openai";
import { isOpenAIEnabled } from "@/lib/config";

/**
 * OpenAI-powered AI services: transcription (Whisper), translation, and
 * content generation (GPT). The client is lazily created so this module can be
 * imported safely in demo mode.
 */

let openai: OpenAI | null = null;

export function getOpenAI(): OpenAI {
  if (!isOpenAIEnabled) {
    throw new Error(
      "OpenAI is not configured. Set OPENAI_API_KEY to enable AI features."
    );
  }
  if (!openai) {
    openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY as string });
  }
  return openai;
}

export interface TranscriptSegment {
  start: number;
  end: number;
  text: string;
}

/**
 * Transcribe an audio/video file with Whisper.
 * Returns timed segments suitable for building subtitles.
 */
export async function transcribeAudio(
  file: File,
  language?: string
): Promise<{ text: string; segments: TranscriptSegment[]; language: string }> {
  const client = getOpenAI();

  const result = await client.audio.transcriptions.create({
    file,
    model: "whisper-1",
    language,
    response_format: "verbose_json",
    timestamp_granularities: ["segment"],
  });

  // verbose_json returns `segments` and `language`
  const raw = result as unknown as {
    text: string;
    language: string;
    segments?: Array<{ start: number; end: number; text: string }>;
  };

  const segments: TranscriptSegment[] = (raw.segments ?? []).map((s) => ({
    start: s.start,
    end: s.end,
    text: s.text.trim(),
  }));

  return { text: raw.text, segments, language: raw.language };
}

/**
 * Translate transcript segments to a target language while preserving timing.
 * Uses a chat model with a system prompt tuned for subtitle translation,
 * including natural code-switching for Hinglish.
 */
export async function translateSegments(
  segments: TranscriptSegment[],
  targetLanguage: string
): Promise<TranscriptSegment[]> {
  const client = getOpenAI();

  const numbered = segments.map((s, i) => `[${i}] ${s.text}`).join("\n");

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.3,
    messages: [
      {
        role: "system",
        content:
          `You are a professional subtitle translator. Translate each numbered line into ${targetLanguage}, ` +
          `preserving tone, meaning, and cultural nuance. For "Hinglish", mix Hindi and English naturally as ` +
          `spoken by bilingual speakers. Return ONLY a JSON array of objects like {"i": number, "text": string}. ` +
          `Keep the same indices. Do not merge or split lines.`,
      },
      { role: "user", content: numbered },
    ],
    response_format: { type: "json_object" },
  });

  const content = completion.choices[0]?.message?.content ?? "{}";

  try {
    const parsed = JSON.parse(content) as
      | { translations?: Array<{ i: number; text: string }> }
      | Array<{ i: number; text: string }>;

    const list = Array.isArray(parsed) ? parsed : parsed.translations ?? [];
    const byIndex = new Map(list.map((t) => [t.i, t.text]));

    return segments.map((s, i) => ({
      ...s,
      text: byIndex.get(i) ?? s.text,
    }));
  } catch {
    // If parsing fails, return originals rather than throwing.
    return segments;
  }
}

export type ContentKind =
  | "instagram"
  | "linkedin"
  | "twitter"
  | "blog"
  | "newsletter"
  | "seo"
  | "hashtags"
  | "youtube-title";

const CONTENT_PROMPTS: Record<ContentKind, string> = {
  instagram: "Write an engaging Instagram caption with emojis and a call to action.",
  linkedin: "Write a professional, insightful LinkedIn post.",
  twitter: "Write a punchy Twitter/X thread (use line breaks between tweets).",
  blog: "Write a well-structured, SEO-friendly blog article with headings.",
  newsletter: "Write a friendly email newsletter section.",
  seo: "Write an SEO-optimized meta description under 160 characters.",
  hashtags: "Generate 15 relevant, high-reach hashtags as a space-separated list.",
  "youtube-title": "Write 5 compelling, click-worthy YouTube title options.",
};

/**
 * Generate platform-specific content from a video transcript.
 */
export async function generateContent(
  transcript: string,
  kind: ContentKind,
  tone = "professional"
): Promise<string> {
  const client = getOpenAI();

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.7,
    messages: [
      {
        role: "system",
        content: `You are an expert content marketer. ${CONTENT_PROMPTS[kind]} Use a ${tone} tone. Base it on the transcript provided.`,
      },
      { role: "user", content: transcript.slice(0, 12000) },
    ],
  });

  return completion.choices[0]?.message?.content?.trim() ?? "";
}
