import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

/**
 * Middleware — Route protection.
 *
 * When Clerk is configured (CLERK_SECRET_KEY present), we protect the
 * dashboard/admin routes with Clerk. In demo mode (no key) we fall back to a
 * pass-through so the app stays fully browsable without auth.
 *
 * `clerkMiddleware` is imported statically (Edge-runtime safe) but only invoked
 * when Clerk is configured — importing it is harmless without keys.
 */

const clerkConfigured = !!process.env.CLERK_SECRET_KEY;

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/admin(.*)"]);

const clerkHandler = clerkMiddleware((auth, req) => {
  // Clerk v5 API: call auth() to get the helper, then protect().
  if (isProtectedRoute(req)) auth().protect();
});

// Pass-through used in demo mode.
function passthrough() {
  return NextResponse.next();
}

export default clerkConfigured ? clerkHandler : passthrough;

export const config = {
  matcher: [
    // Skip Next.js internals and static assets, but always run on API routes.
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
