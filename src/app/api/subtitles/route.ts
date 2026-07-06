import { NextRequest, NextResponse } from "next/server";
import { isDatabaseEnabled } from "@/lib/config";
import { getProject } from "@/lib/db/queries";
import { prisma } from "@/lib/db/prisma";

/**
 * GET /api/subtitles?projectId=&language=  — fetch a subtitle track's segments
 * PUT /api/subtitles                        — save edited segments
 *   body: { projectId, language, segments: [{ startTime, endTime, text, speaker? }] }
 */

const DEMO_SEGMENTS = [
  { index: 0, startTime: 2.1, endTime: 5.4, text: "Welcome to our product demo.", speaker: "Host" },
  { index: 1, startTime: 5.5, endTime: 8.9, text: "Today we'll show how SubVerse AI transforms your workflow.", speaker: "Host" },
  { index: 2, startTime: 9.2, endTime: 13.1, text: "Let's start with the upload process.", speaker: "Host" },
];

export async function GET(request: NextRequest) {
  const projectId = request.nextUrl.searchParams.get("projectId");
  const language = request.nextUrl.searchParams.get("language") ?? "en";

  if (!isDatabaseEnabled) {
    return NextResponse.json({ language, segments: DEMO_SEGMENTS, demo: true });
  }
  if (!projectId) {
    return NextResponse.json({ error: "projectId is required" }, { status: 400 });
  }

  const project = await getProject(projectId);
  const track =
    project?.subtitles.find((s) => s.language === language) ?? project?.subtitles[0];
  if (!track) {
    return NextResponse.json({ error: "Subtitle track not found" }, { status: 404 });
  }
  return NextResponse.json({ language: track.language, segments: track.segments });
}

interface EditableSegment {
  startTime: number;
  endTime: number;
  text: string;
  speaker?: string;
}

export async function PUT(request: NextRequest) {
  try {
    const { projectId, language = "en", segments } = await request.json();

    if (!Array.isArray(segments)) {
      return NextResponse.json({ error: "segments array is required" }, { status: 400 });
    }
    if (!isDatabaseEnabled) {
      return NextResponse.json({ success: true, demo: true, count: segments.length });
    }
    if (!projectId) {
      return NextResponse.json({ error: "projectId is required" }, { status: 400 });
    }

    // Replace the track's segments atomically.
    const track = await prisma.subtitle.findUnique({
      where: { projectId_language: { projectId, language } },
    });
    if (!track) {
      return NextResponse.json({ error: "Subtitle track not found" }, { status: 404 });
    }

    await prisma.$transaction([
      prisma.subtitleSegment.deleteMany({ where: { subtitleId: track.id } }),
      prisma.subtitleSegment.createMany({
        data: (segments as EditableSegment[]).map((s, i) => ({
          subtitleId: track.id,
          index: i,
          startTime: s.startTime,
          endTime: s.endTime,
          text: s.text,
          speaker: s.speaker ?? null,
        })),
      }),
    ]);

    return NextResponse.json({ success: true, count: segments.length });
  } catch (error) {
    console.error("Save subtitles error:", error);
    return NextResponse.json({ error: "Failed to save subtitles" }, { status: 500 });
  }
}
