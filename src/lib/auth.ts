import "server-only";
import { isClerkEnabled, isDatabaseEnabled } from "@/lib/config";
import { ensureUser } from "@/lib/db/queries";
import { prisma } from "@/lib/db/prisma";

/**
 * Server-side auth helpers.
 *
 * These bridge Clerk (identity) and our database (application user rows).
 * Everything degrades gracefully: in demo mode (no Clerk / no DB) they return
 * a stable demo identity so API routes and pages keep working.
 */

export interface CurrentUser {
  /** Clerk user id (or "demo-user" in demo mode) */
  clerkId: string;
  /** Application DB user id (equals clerkId when DB is disabled) */
  id: string;
  email: string;
  name: string | null;
  avatar: string | null;
  demo: boolean;
}

const DEMO_USER: CurrentUser = {
  clerkId: "demo-user",
  id: "demo-user",
  email: "demo@subverse.ai",
  name: "Demo User",
  avatar: null,
  demo: true,
};

/**
 * Resolve the current request's user.
 *
 * - Clerk disabled  → demo user
 * - Clerk enabled but signed-out → null (caller returns 401)
 * - Clerk enabled + DB enabled → upserts and returns the DB user
 * - Clerk enabled, DB disabled → returns the Clerk identity (id = clerkId)
 */
export async function getCurrentUser(): Promise<CurrentUser | null> {
  if (!isClerkEnabled) return DEMO_USER;

  // Import lazily so demo builds never pull Clerk server code.
  const { currentUser } = await import("@clerk/nextjs/server");
  const clerkUser = await currentUser();
  if (!clerkUser) return null;

  const email = clerkUser.emailAddresses[0]?.emailAddress ?? "";
  const name =
    [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") || null;
  const avatar = clerkUser.imageUrl ?? null;

  if (isDatabaseEnabled) {
    const dbUser = await ensureUser({
      clerkId: clerkUser.id,
      email,
      name,
      avatar,
    });
    if (dbUser) {
      return {
        clerkId: clerkUser.id,
        id: dbUser.id,
        email: dbUser.email,
        name: dbUser.name,
        avatar: dbUser.avatar,
        demo: false,
      };
    }
  }

  // Clerk on, DB off → use Clerk identity directly.
  return {
    clerkId: clerkUser.id,
    id: clerkUser.id,
    email,
    name,
    avatar,
    demo: false,
  };
}

/**
 * Require an authenticated user or throw a 401-style error.
 * Convenience for API routes.
 */
export async function requireUser(): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!user) {
    throw new UnauthorizedError();
  }
  return user;
}

export class UnauthorizedError extends Error {
  constructor() {
    super("Unauthorized");
    this.name = "UnauthorizedError";
  }
}

/**
 * Verify a user owns a project (used by mutating routes).
 * Returns true in demo mode (no ownership to enforce).
 */
export async function userOwnsProject(
  userId: string,
  projectId: string
): Promise<boolean> {
  if (!isDatabaseEnabled) return true;
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    select: { userId: true },
  });
  return project?.userId === userId;
}
