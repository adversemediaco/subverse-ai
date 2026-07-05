import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/process
 * Triggers AI processing pipeline for an uploaded video.
 * Pipeline: Audio Extract → Whisper Transcription → Translation → Content Generation
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { projectId, options } = body;

    if (!projectId) {
      return NextResponse.json({ error: "projectId is required" }, { status: 400 });
    }

    // Processing options
    const {
      transcribe = true,
      detectSpeakers = true,
      translate = [],       // array of language codes
      burnCaptions = false,
      generateContent = [], // array of content types
      captionStyle = "youtube",
    } = options || {};

    // In production: Queue processing job
    // await queue.add("process-video", {
    //   projectId,
    //   steps: [
    //     transcribe && { type: "transcribe", model: "whisper-large-v3" },
    //     detectSpeakers && { type: "diarize" },
    //     translate.length > 0 && { type: "translate", languages: translate },
    //     burnCaptions && { type: "burn", style: captionStyle },
    //     generateContent.length > 0 && { type: "generate", types: generateContent },
    //   ].filter(Boolean),
    // });

    // Update project status
    // await prisma.project.update({
    //   where: { id: projectId },
    //   data: { status: "PROCESSING", targetLanguages: translate }
    // });

    return NextResponse.json({
      success: true,
      projectId,
      message: "Processing started. You'll be notified when complete.",
      estimatedTime: "3-5 minutes",
      steps: [
        { step: "audio_extraction", status: "queued" },
        transcribe && { step: "transcription", status: "queued" },
        detectSpeakers && { step: "speaker_detection", status: "queued" },
        translate.length > 0 && { step: "translation", status: "queued", languages: translate },
        generateContent.length > 0 && { step: "content_generation", status: "queued", types: generateContent },
        burnCaptions && { step: "burn_captions", status: "queued" },
      ].filter(Boolean),
    });
  } catch (error) {
    console.error("Process error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/process?projectId=xxx
 * Check processing status of a project.
 */
export async function GET(request: NextRequest) {
  const projectId = request.nextUrl.searchParams.get("projectId");

  if (!projectId) {
    return NextResponse.json({ error: "projectId is required" }, { status: 400 });
  }

  // In production: fetch from database
  // const project = await prisma.project.findUnique({ where: { id: projectId } });

  return NextResponse.json({
    projectId,
    status: "PROCESSING",
    progress: 65,
    currentStep: "translation",
    steps: [
      { step: "audio_extraction", status: "complete", progress: 100 },
      { step: "transcription", status: "complete", progress: 100 },
      { step: "speaker_detection", status: "complete", progress: 100 },
      { step: "translation", status: "processing", progress: 65 },
      { step: "content_generation", status: "queued", progress: 0 },
    ],
  });
}
