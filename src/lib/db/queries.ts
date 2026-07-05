import "server-only";
import { prisma } from "@/lib/db/prisma";
import { isDatabaseEnabled } from "@/lib/config";
import type { Prisma } from "@prisma/client";

/**
 * Typed database query helpers.
 *
 * Every helper guards on `isDatabaseEnabled` and returns null/[] in demo mode
 * so callers can transparently fall back to mock data without try/catch noise.
 */

/** Ensure a User row exists for the given Clerk user (upsert on sign-in). */
export async function ensureUser(params: {
  clerkId: string;
  email: string;
  name?: string | null;
  avatar?: string | null;
}) {
  if (!isDatabaseEnabled) return null;
  return prisma.user.upsert({
    where: { clerkId: params.clerkId },
    update: { email: params.email, name: params.name, avatar: params.avatar },
    create: {
      clerkId: params.clerkId,
      email: params.email,
      name: params.name,
      avatar: params.avatar,
    },
  });
}

/** List a user's projects, newest first. */
export async function listProjects(userId: string) {
  if (!isDatabaseEnabled) return [];
  return prisma.project.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { subtitles: true, translations: true } } },
  });
}

/** Fetch a single project with all related data. */
export async function getProject(id: string) {
  if (!isDatabaseEnabled) return null;
  return prisma.project.findUnique({
    where: { id },
    include: {
      subtitles: { include: { segments: { orderBy: { index: "asc" } } } },
      translations: true,
      contents: true,
      exports: true,
    },
  });
}

/** Create a new project (called after a successful upload). */
export async function createProject(data: Prisma.ProjectCreateInput) {
  if (!isDatabaseEnabled) return null;
  return prisma.project.create({ data });
}

/** Update a project's status/metadata as it moves through the pipeline. */
export async function updateProject(
  id: string,
  data: Prisma.ProjectUpdateInput
) {
  if (!isDatabaseEnabled) return null;
  return prisma.project.update({ where: { id }, data });
}

/** Record credit consumption for usage-based billing/analytics. */
export async function recordUsage(params: {
  userId: string;
  type: string;
  credits: number;
  metadata?: Prisma.InputJsonValue;
}) {
  if (!isDatabaseEnabled) return null;
  return prisma.usageRecord.create({
    data: {
      userId: params.userId,
      type: params.type,
      credits: params.credits,
      metadata: params.metadata,
    },
  });
}
