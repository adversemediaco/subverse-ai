import { NextRequest, NextResponse } from "next/server";
import { featureFlags, isDatabaseEnabled } from "@/lib/config";
import { getProject, updateProject } from "@/lib/db/queries";

/**
 * POST /api/process
 * Kicks off the AI processing pipeline for an uploaded video.
 *
 * The heavy work (Whisper transcription, translation, FFmpeg burning) runs in
 * a background worker/queue in production. This endpoint validates the request,
 * records intent, and returns the pipeline plan. Steps requiring an unconfigured
 * service are marked "skipped" so the client can reflect real capabilities.
 */

export async function POST(request: NextRequest) {
  try {
    const { projectId, options } = await request.json();
    if (!projectId) {
      return NextResponse.json({ error: "projectId is required" }, { status: 400 });
    }

    const {
      transcribe = true,
      detectSpeakers = true,
      translate = [] as string[],
      burnCaptions = false,
      generateContent = [] as string[],
    } = options || {};

    // Mark the project as processing when we have a database.
    if (isDatabaseEnabled) {
      await updateProject(projectId, {
        status: "PROCESSING",
        targetLanguages: translate,
      });
    }

    // A step is "queued" if its backing service is configured, else "skipped".
    const aiReady = featureFlags.openai;
    const step = (name: string, enabled: boolean, needs: boolean) => ({
      step: name,
      status: !enabled ? "off" : needs ? "queued" : "skipped",
    });

    const steps = [
      step("audio_extraction", true, true),
      transcribe && step("transcription", aiReady, true),
      detectSpeakers && step("speaker_detection", aiReady, true),
      translate.length > 0 && step("translation", aiReady, true),
      generateContent.length > 0 && step("content_generation", aiReady, true),
      burnCaptions && step("burn_captions", true, true),
    ].filter(Boolean);

    return NextResponse.json({
      success: true,
      projectId,
      estimatedTime: "3-5 minutes",
      aiEnabled: aiReady,
      steps,
    });
  } catch (error) {
    console.error("Process error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * GET /api/process?projectId=xxx
 * Returns current processing status. Reads from the DB when available,
 * otherwise returns a simulated in-progress state for the demo UI.
 */
export async function GET(request: NextRequest) {
  const projectId = request.nextUrl.searchParams.get("projectId");
  if (!projectId) {
    return NextResponse.json({ error: "projectId is required" }, { status: 400 });
  }

  if (isDatabaseEnabled) {
    const project = await getProject(projectId);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json({ projectId, status: project.status });
  }

  // Demo: simulated progress
  return NextResponse.json({
    projectId,
    status: "PROCESSING",
    progress: 65,
    currentStep: "translation",
  });
}
