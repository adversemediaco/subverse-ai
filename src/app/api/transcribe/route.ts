import { NextRequest, NextResponse } from "next/server";
import { isOpenAIEnabled } from "@/lib/config";
import { transcribeAudio, translateSegments, generateContent, type ContentKind, type TranscriptSegment } from "@/lib/ai/openai";

/**
 * POST /api/transcribe  (multipart/form-data)
 *
 * The FASTEST path to real AI — no storage/DB/auth required, only OPENAI_API_KEY.
 * The browser uploads the media file directly here; we stream it straight to
 * Whisper, then optionally translate and generate content, and return
 * everything in one JSON response.
 *
 * Fields:
 *   file            (File)   the video/audio (<= 25MB for Whisper)
 *   language        (string) source language hint (optional)
 *   translate       (string) comma-separated target languages (optional)
 *   content         (string) comma-separated content kinds (optional)
 *   tone            (string) content tone (optional)
 *
 * In demo mode (no OpenAI key) returns representative sample data so the UI
 * still works end-to-end.
 */

export const maxDuration = 300;

const DEMO_SEGMENTS: TranscriptSegment[] = [
  { start: 0, end: 3.2, text: "Welcome to SubVerse AI — this is a live demo transcript." },
  { start: 3.2, end: 7.8, text: "Add your OpenAI API key to transcribe your own videos for real." },
  { start: 7.8, end: 12.1, text: "One video becomes subtitles, translations, and content for every platform." },
];

export async function POST(request: NextRequest) {
  try {
    const form = await request.formData();
    const file = form.get("file") as File | null;
    const language = (form.get("language") as string) || undefined;
    const translateList = ((form.get("translate") as string) || "")
      .split(",").map((s) => s.trim()).filter(Boolean);
    const contentList = ((form.get("content") as string) || "")
      .split(",").map((s) => s.trim()).filter(Boolean) as ContentKind[];
    const tone = (form.get("tone") as string) || "professional";

    // ---- DEMO MODE ----
    if (!isOpenAIEnabled) {
      const text = DEMO_SEGMENTS.map((s) => s.text).join(" ");
      return NextResponse.json({
        demo: true,
        transcript: { language: language || "en", segments: DEMO_SEGMENTS, text },
        translations: translateList.map((lang) => ({
          language: lang,
          segments: DEMO_SEGMENTS.map((s) => ({ ...s, text: `[${lang}] ${s.text}` })),
        })),
        content: contentList.map((kind) => ({ kind, text: `Sample ${kind} content generated from your video.` })),
      });
    }

    // ---- LIVE MODE ----
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    if (file.size > 25 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File exceeds 25MB (Whisper API limit). Try a shorter clip or compress the audio." },
        { status: 400 }
      );
    }

    // 1. Transcribe (the essential step — if this fails we surface the error)
    const { segments, text, language: detected } = await transcribeAudio(file, language);

    // 2. Translations + content are BEST-EFFORT. Using allSettled means a
    //    failure/timeout in any extra never discards the transcript the user
    //    already paid for — they still get a successful result.
    const [translationResults, contentResults] = await Promise.all([
      Promise.allSettled(
        translateList.map(async (lang) => ({
          language: lang,
          segments: await translateSegments(segments, lang),
        }))
      ),
      Promise.allSettled(
        contentList.map(async (kind) => ({
          kind,
          text: await generateContent(text, kind, tone),
        }))
      ),
    ]);

    const translations = translationResults
      .filter((r): r is PromiseFulfilledResult<{ language: string; segments: TranscriptSegment[] }> => r.status === "fulfilled")
      .map((r) => r.value);
    const content = contentResults
      .filter((r): r is PromiseFulfilledResult<{ kind: ContentKind; text: string }> => r.status === "fulfilled")
      .map((r) => r.value);

    return NextResponse.json({
      transcript: { language: detected, segments, text },
      translations,
      content,
    });
  } catch (error) {
    console.error("Transcribe error:", error);
    const raw = error instanceof Error ? error.message : "Transcription failed";
    // Turn the opaque OpenAI "Connection error." into actionable guidance.
    const message = /connection error/i.test(raw)
      ? "Could not reach OpenAI in time. Try a shorter/smaller clip (audio or <4.5MB video), and confirm your OPENAI_API_KEY has billing credit."
      : raw;
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
