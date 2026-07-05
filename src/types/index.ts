/**
 * Shared TypeScript types for SubVerse AI.
 * These mirror the Prisma schema and API contracts.
 */

export type Plan = "FREE" | "PRO" | "ENTERPRISE";

export type ProjectStatus =
  | "UPLOADING"
  | "PROCESSING"
  | "TRANSCRIBING"
  | "TRANSLATING"
  | "GENERATING"
  | "COMPLETE"
  | "FAILED";

export type TranslationStatus = "PENDING" | "PROCESSING" | "COMPLETE" | "FAILED";

export type ContentType =
  | "INSTAGRAM_CAPTION"
  | "LINKEDIN_POST"
  | "TWITTER_THREAD"
  | "FACEBOOK_POST"
  | "BLOG_ARTICLE"
  | "NEWSLETTER"
  | "YOUTUBE_TITLE"
  | "YOUTUBE_DESCRIPTION"
  | "SEO_DESCRIPTION"
  | "HASHTAGS"
  | "PODCAST_NOTES";

export type ExportFormat = "SRT" | "VTT" | "ASS" | "JSON" | "TXT" | "BURNED_VIDEO";

export interface User {
  id: string;
  clerkId: string;
  email: string;
  name: string | null;
  avatar: string | null;
  plan: Plan;
  credits: number;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  userId: string;
  name: string;
  description: string | null;
  status: ProjectStatus;
  videoUrl: string | null;
  videoKey: string | null;
  duration: number | null;
  fileSize: number | null;
  resolution: string | null;
  format: string | null;
  thumbnail: string | null;
  sourceLanguage: string | null;
  targetLanguages: string[];
  createdAt: string;
  updatedAt: string;
}

export interface SubtitleSegment {
  id: string;
  subtitleId: string;
  index: number;
  startTime: number;
  endTime: number;
  text: string;
  speaker: string | null;
  confidence: number | null;
}

export interface Subtitle {
  id: string;
  projectId: string;
  language: string;
  segments: SubtitleSegment[];
  wordCount: number | null;
  confidence: number | null;
  speakers: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface Translation {
  id: string;
  projectId: string;
  language: string;
  status: TranslationStatus;
  progress: number;
  segments: SubtitleSegment[] | null;
  bleuScore: number | null;
  wordCount: number | null;
}

export interface GeneratedContent {
  id: string;
  projectId: string;
  type: ContentType;
  content: string;
  metadata: Record<string, unknown> | null;
  tone: string | null;
  createdAt: string;
}

export interface Language {
  code: string;
  name: string;
  flag: string;
}

export interface PipelineStep {
  step: string;
  status: "queued" | "processing" | "complete" | "failed";
  progress?: number;
  languages?: string[];
  types?: string[];
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
