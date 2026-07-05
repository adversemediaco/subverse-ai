import { NextRequest, NextResponse } from "next/server";
import { convertSubtitles, type Segment, type SubtitleFormat } from "@/lib/subtitles";
import { isDatabaseEnabled } from "@/lib/config";
import { getProject } from "@/lib/db/queries";

/**
 * POST /api/export
 * Generates subtitle export content in the requested text format.
 *
 * - For text formats (srt/vtt/txt/json) we build and return the file content
 *   directly (works in demo mode with sample segments).
 * - For "burned" video, real rendering requires an FFmpeg worker; here we
 *   return a job reference the client can poll.
 */

const SAMPLE_SEGMENTS: Segment[] = [
  { start: 2.1, end: 5.4, text: "Welcome to our product demo.", speaker: "Host" },
  { start: 5.5, end: 8.9, text: "Today we'll show how SubVerse AI transforms your workflow.", speaker: "Host" },
  { start: 9.2, end: 13.1, text: "Let's start with the upload process — it's incredibly simple.", speaker: "Host" },
];

const TEXT_FORMATS: SubtitleFormat[] = ["srt", "vtt", "txt", "json"];

export async function POST(request: NextRequest) {
  try {
    const { projectId, format, language } = await request.json();

    if (!projectId || !format) {
      return NextResponse.json({ error: "projectId and format are required" }, { status: 400 });
    }

    // Resolve segments: from DB when available, else sample data.
    let segments: Segment[] = SAMPLE_SEGMENTS;
    if (isDatabaseEnabled) {
      const project = await getProject(projectId);
      const track =
        project?.subtitles.find((s) => s.language === (language || "en")) ??
        project?.subtitles[0];
      if (track) {
        segments = track.segments.map((s) => ({
          start: s.startTime,
          end: s.endTime,
          text: s.text,
          speaker: s.speaker ?? undefined,
        }));
      }
    }

    // Burned video requires FFmpeg processing (async job).
    if (format === "burned") {
      return NextResponse.json({
        success: true,
        format,
        jobId: `export_${projectId}_${Date.now()}`,
        status: "queued",
        message: "Burned-caption video queued. Poll the job for the download URL.",
      });
    }

    if (!TEXT_FORMATS.includes(format as SubtitleFormat)) {
      return NextResponse.json({ error: `Unsupported format: ${format}` }, { status: 400 });
    }

    const content = convertSubtitles(segments, format as SubtitleFormat);
    const mime =
      format === "json" ? "application/json" : format === "vtt" ? "text/vtt" : "text/plain";

    // Return the file as a download.
    return new NextResponse(content, {
      status: 200,
      headers: {
        "Content-Type": `${mime}; charset=utf-8`,
        "Content-Disposition": `attachment; filename="${projectId}.${format}"`,
      },
    });
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
