import { NextRequest, NextResponse } from "next/server";
import { isDatabaseEnabled } from "@/lib/config";
import { getProject } from "@/lib/db/queries";
import { prisma } from "@/lib/db/prisma";
import { getCurrentUser, userOwnsProject, UnauthorizedError } from "@/lib/auth";

/**
 * GET    /api/projects/[id] — full project with subtitles/translations/content
 * DELETE /api/projects/[id] — remove a project (owner only)
 */

const DEMO_PROJECT = {
  id: "demo",
  name: "Product Demo v2.1",
  status: "COMPLETE",
  duration: 765,
  sourceLanguage: "en",
  targetLanguages: ["hi", "es", "fr"],
  subtitles: [
    {
      language: "en",
      segments: [
        { index: 0, startTime: 2.1, endTime: 5.4, text: "Welcome to our product demo.", speaker: "Host" },
        { index: 1, startTime: 5.5, endTime: 8.9, text: "Today we'll show how SubVerse AI works.", speaker: "Host" },
      ],
    },
  ],
  translations: [
    { language: "hi", status: "COMPLETE", progress: 100 },
    { language: "es", status: "PROCESSING", progress: 60 },
  ],
  contents: [],
  demo: true,
};

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!isDatabaseEnabled) {
    return NextResponse.json({ project: { ...DEMO_PROJECT, id } });
  }

  const project = await getProject(id);
  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }
  return NextResponse.json({ project });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getCurrentUser();
    if (!user) throw new UnauthorizedError();

    if (!isDatabaseEnabled) {
      return NextResponse.json({ success: true, demo: true });
    }

    if (!(await userOwnsProject(user.id, id))) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Delete project error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
