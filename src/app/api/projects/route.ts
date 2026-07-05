import { NextResponse } from "next/server";
import { isDatabaseEnabled, isClerkEnabled } from "@/lib/config";
import { listProjects } from "@/lib/db/queries";

/**
 * GET /api/projects
 * Returns the authenticated user's projects. In demo mode (no DB/auth) it
 * returns representative sample data so the dashboard renders fully.
 */

const DEMO_PROJECTS = [
  { id: "1", name: "Marketing Webinar Q4", duration: 5076, languages: 5, status: "COMPLETE", createdAt: "2024-07-03T10:00:00Z", fileSize: 2_576_980_377 },
  { id: "2", name: "Product Demo v2.1", duration: 765, languages: 3, status: "PROCESSING", createdAt: "2024-07-03T08:00:00Z", fileSize: 478_150_656 },
  { id: "3", name: "Podcast Ep. 42", duration: 2720, languages: 8, status: "COMPLETE", createdAt: "2024-07-02T14:00:00Z", fileSize: 1_181_116_006 },
  { id: "4", name: "Instagram Reels Pack", duration: 192, languages: 2, status: "COMPLETE", createdAt: "2024-07-01T12:00:00Z", fileSize: 134_217_728 },
];

export async function GET() {
  // LIVE: real projects for the signed-in user.
  if (isDatabaseEnabled && isClerkEnabled) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { auth } = require("@clerk/nextjs/server");
      const { userId } = await auth();
      if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      const projects = await listProjects(userId);
      return NextResponse.json({ projects, demo: false });
    } catch (error) {
      console.error("Projects fetch error:", error);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
  }

  // DEMO: sample data
  return NextResponse.json({ projects: DEMO_PROJECTS, demo: true });
}
