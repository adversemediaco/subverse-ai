/**
 * Feature configuration & environment detection.
 *
 * SubVerse AI is designed to run in two modes:
 *  1. DEMO mode  — no third-party keys configured. All screens render with
 *                  mock data so the app still builds, deploys, and is browsable.
 *  2. LIVE mode  — when the relevant env vars are present, real integrations
 *                  (auth, DB, AI, storage, payments) activate automatically.
 *
 * These flags let every integration degrade gracefully instead of crashing
 * the app when a key is missing. Never throw at import time — only when a
 * feature is actually invoked without configuration.
 */

/** Clerk auth is enabled when the publishable key is present (client-safe). */
export const isClerkEnabled =
  !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.startsWith("pk_");

/** Database is enabled when a connection string is configured. */
export const isDatabaseEnabled = !!process.env.DATABASE_URL;

/** Stripe billing is enabled when the secret key is present. */
export const isStripeEnabled = !!process.env.STRIPE_SECRET_KEY;

/** OpenAI (Whisper transcription + LLM translation/content) is enabled. */
export const isOpenAIEnabled = !!process.env.OPENAI_API_KEY;

/** Cloudflare R2 storage is enabled when all R2 credentials are present. */
export const isR2Enabled =
  !!process.env.R2_ACCOUNT_ID &&
  !!process.env.R2_ACCESS_KEY_ID &&
  !!process.env.R2_SECRET_ACCESS_KEY &&
  !!process.env.R2_BUCKET_NAME;

/** A single object useful for debugging / health endpoints. */
export const featureFlags = {
  clerk: isClerkEnabled,
  database: isDatabaseEnabled,
  stripe: isStripeEnabled,
  openai: isOpenAIEnabled,
  r2: isR2Enabled,
} as const;

/**
 * Public app URL, used for building absolute redirect URLs (Stripe, OAuth).
 * Falls back to Vercel's system env, then localhost.
 */
export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
