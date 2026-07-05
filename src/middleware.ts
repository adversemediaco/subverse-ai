import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware — Route protection and request handling.
 *
 * In production with Clerk, this would use clerkMiddleware() to protect
 * dashboard and admin routes. Here we provide a lightweight scaffold that
 * demonstrates the intended protected-route matching.
 *
 * To enable Clerk:
 *   import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
 *   const isProtected = createRouteMatcher(["/dashboard(.*)", "/admin(.*)"]);
 *   export default clerkMiddleware((auth, req) => {
 *     if (isProtected(req)) auth().protect();
 *   });
 */

const PROTECTED_PREFIXES = ["/dashboard", "/admin"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );

  // In production, verify the Clerk session token here.
  // For the scaffold we simply allow through and let Clerk components handle auth UI.
  if (isProtected) {
    // Example redirect logic (disabled in scaffold):
    // const isAuthed = Boolean(request.cookies.get("__session"));
    // if (!isAuthed) {
    //   const loginUrl = new URL("/login", request.url);
    //   loginUrl.searchParams.set("redirect_url", pathname);
    //   return NextResponse.redirect(loginUrl);
    // }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|.*\\..*).*)",
  ],
};
