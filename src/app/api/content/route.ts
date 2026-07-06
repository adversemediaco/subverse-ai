import { NextRequest, NextResponse } from "next/server";
import { isOpenAIEnabled, isDatabaseEnabled } from "@/lib/config";
import { generateContent, type ContentKind } from "@/lib/ai/openai";
import { getProject } from "@/lib/db/queries";
import { prisma } from "@/lib/db/prisma";

/**
 * POST /api/content
 * Generate a piece of platform content from a project's transcript.
 * Body: { projectId, kind, tone?, transcript? }
 *
 * Live (OpenAI configured): generates real content and persists it.
 * Demo: returns representative sample content.
 */

const DEMO_CONTENT: Partial<Record<ContentKind, string>> = {
  instagram:
    "🚀 Just turned one video into content for every platform with SubVerse AI!\n\n✅ Subtitles in 12 languages\n✅ Blog post\n✅ This caption\n\nContent creation just got 10x easier 🤖\n\n#ContentCreator #AITools #SubVerseAI",
  linkedin:
    "I saved 20+ hours this week using AI for content repurposing.\n\nRecord once → SubVerse AI generates subtitles, translations, and platform-ready posts automatically.\n\nWhat's your biggest content bottleneck?",
  twitter:
    "🧵 How we 10x'd our content output:\n\n1/ Upload one video\n2/ Get captions in 100+ languages\n3/ Auto-generate every social post\n\nAll with @SubVerseAI 👇",
  blog: "# How AI Is Transforming Video Content Creation\n\nCreating content for multiple platforms used to mean hours of manual work...",
  seo: "Turn any video into subtitles, translations, and platform-ready content with SubVerse AI. AI-powered transcription in 100+ languages.",
  hashtags: "#ContentCreator #AITools #VideoMarketing #Subtitles #SubVerseAI #SocialMediaTips #ContentStrategy #Automation",
  "youtube-title": "How I Create Content for EVERY Platform With ONE Video (AI Workflow)",
};

export async function POST(request: NextRequest) {
  try {
    const { projectId, kind, tone = "professional", transcript } = await request.json();

    if (!kind) {
      return NextResponse.json({ error: "kind is required" }, { status: 400 });
    }

    // Demo mode — return sample content.
    if (!isOpenAIEnabled) {
      return NextResponse.json({
        content: DEMO_CONTENT[kind as ContentKind] ?? "Sample generated content.",
        demo: true,
      });
    }

    // Resolve the transcript: from request, else from the project's subtitles.
    let text = transcript as string | undefined;
    if (!text && projectId && isDatabaseEnabled) {
      const project = await getProject(projectId);
      const track = project?.subtitles[0];
      text = track?.segments.map((s) => s.text).join(" ");
    }
    if (!text) {
      return NextResponse.json(
        { error: "No transcript available. Process the video first." },
        { status: 400 }
      );
    }

    const content = await generateContent(text, kind as ContentKind, tone);

    // Persist when possible.
    if (projectId && isDatabaseEnabled) {
      await prisma.generatedContent.create({
        data: { projectId, type: dbType(kind as ContentKind), content, tone },
      });
    }

    return NextResponse.json({ content });
  } catch (error) {
    console.error("Content generation error:", error);
    return NextResponse.json({ error: "Failed to generate content" }, { status: 500 });
  }
}

function dbType(kind: ContentKind): string {
  const map: Record<ContentKind, string> = {
    instagram: "INSTAGRAM_CAPTION",
    linkedin: "LINKEDIN_POST",
    twitter: "TWITTER_THREAD",
    blog: "BLOG_ARTICLE",
    newsletter: "NEWSLETTER",
    seo: "SEO_DESCRIPTION",
    hashtags: "HASHTAGS",
    "youtube-title": "YOUTUBE_TITLE",
  };
  return map[kind];
}
