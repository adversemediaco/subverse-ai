import { NextRequest, NextResponse } from "next/server";
import { featureFlags, isDatabaseEnabled, isOpenAIEnabled } from "@/lib/config";
import { getProject, updateProject } from "@/lib/db/queries";
import { runPipeline } from "@/lib/ai/pipeline";
import type { ContentKind } from "@/lib/ai/openai";

/**
 * POST /api/process
 * Runs the AI processing pipeline for an uploaded video.
 *
 * LIVE mode (OpenAI configured): fetches media from R2, transcribes with
 * Whisper, saves subtitles, translates, and generates content — synchronously.
 * NOTE: for large files / heavy workloads this should move to a background
 * queue; serverless functions are time-limited (see maxDuration).
 *
 * DEMO mode: returns the pipeline plan with per-step availability.
 */

// Allow longer execution for the synchronous pipeline (Vercel Pro: up to 300s).
export const maxDuration = 300;

export async function POST(request: NextRequest) {
  try {
    const { projectId, options } = await request.json();
    if (!projectId) {
      return NextResponse.json({ error: "projectId is required" }, { status: 400 });
    }

    const {
      translate = [] as string[],
      generateContent: contentTypes = [] as ContentKind[],
      tone = "professional",
    } = options || {};

    if (isDatabaseEnabled) {
      await updateProject(projectId, { status: "PROCESSING", targetLanguages: translate });
    }

    // ---- LIVE: run the real pipeline ----
    if (isOpenAIEnabled) {
      const project = isDatabaseEnabled ? await getProject(projectId) : null;
      const result = await runPipeline({
        projectId,
        videoKey: project?.videoKey,
        sourceLanguage: project?.sourceLanguage ?? "en",
        targetLanguages: translate,
        contentTypes,
        tone,
      });

      if (isDatabaseEnabled && !result.transcribed) {
        // Nothing could run (e.g. no media) — mark failed so the UI reflects it.
        await updateProject(projectId, { status: "FAILED" });
      }

      return NextResponse.json({ success: true, projectId, result });
    }

    // ---- DEMO: return the plan ----
    const steps = [
      { step: "audio_extraction", status: "queued" },
      { step: "transcription", status: "off" },
      { step: "translation", status: translate.length ? "off" : "skipped" },
      { step: "content_generation", status: contentTypes.length ? "off" : "skipped" },
    ];

    return NextResponse.json({
      success: true,
      projectId,
      demo: true,
      aiEnabled: featureFlags.openai,
      estimatedTime: "3-5 minutes",
      steps,
    });
  } catch (error) {
    console.error("Process error:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * GET /api/process?projectId=xxx — current processing status.
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
    return NextResponse.json({
      projectId,
      status: project.status,
      subtitles: project.subtitles.length,
      translations: project.translations.length,
    });
  }

  return NextResponse.json({ projectId, status: "PROCESSING", progress: 65, demo: true });
}
