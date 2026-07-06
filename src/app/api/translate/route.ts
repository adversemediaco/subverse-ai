import { NextRequest, NextResponse } from "next/server";
import { isOpenAIEnabled, isDatabaseEnabled } from "@/lib/config";
import { translateSegments, type TranscriptSegment } from "@/lib/ai/openai";
import { getProject } from "@/lib/db/queries";
import { prisma } from "@/lib/db/prisma";

/**
 * POST /api/translate
 * Translate a project's source subtitles into a target language.
 * Body: { projectId, language, segments? }
 */

export async function POST(request: NextRequest) {
  try {
    const { projectId, language, segments: bodySegments } = await request.json();

    if (!language) {
      return NextResponse.json({ error: "language is required" }, { status: 400 });
    }

    if (!isOpenAIEnabled) {
      return NextResponse.json({
        demo: true,
        language,
        status: "COMPLETE",
        segments: [
          { start: 2.1, end: 5.4, text: `[${language}] Welcome to our product demo.` },
        ],
      });
    }

    // Resolve source segments.
    let segments = bodySegments as TranscriptSegment[] | undefined;
    if (!segments && projectId && isDatabaseEnabled) {
      const project = await getProject(projectId);
      const track = project?.subtitles[0];
      segments = track?.segments.map((s) => ({ start: s.startTime, end: s.endTime, text: s.text }));
    }
    if (!segments || segments.length === 0) {
      return NextResponse.json(
        { error: "No source subtitles found. Transcribe the video first." },
        { status: 400 }
      );
    }

    const translated = await translateSegments(segments, language);

    if (projectId && isDatabaseEnabled) {
      await prisma.translation.upsert({
        where: { projectId_language: { projectId, language } },
        update: { status: "COMPLETE", progress: 100, segments: translated as unknown as object },
        create: {
          projectId,
          language,
          status: "COMPLETE",
          progress: 100,
          segments: translated as unknown as object,
        },
      });
    }

    return NextResponse.json({ language, status: "COMPLETE", segments: translated });
  } catch (error) {
    console.error("Translation error:", error);
    return NextResponse.json({ error: "Translation failed" }, { status: 500 });
  }
}
