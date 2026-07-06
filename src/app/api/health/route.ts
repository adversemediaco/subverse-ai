import { NextResponse } from "next/server";
import { featureFlags } from "@/lib/config";

/**
 * GET /api/health
 * Reports which integrations are currently configured (booleans only — never
 * exposes secret values). Use this after adding env vars in Vercel to confirm
 * each integration flipped from demo → live.
 *
 * Example: https://your-app.vercel.app/api/health
 */
export const dynamic = "force-dynamic";

export async function GET() {
  const allEnabled = Object.values(featureFlags).every(Boolean);

  return NextResponse.json({
    status: "ok",
    mode: allEnabled ? "live" : "partial/demo",
    integrations: {
      auth_clerk: featureFlags.clerk,
      database_postgres: featureFlags.database,
      ai_openai: featureFlags.openai,
      storage_r2: featureFlags.r2,
      billing_stripe: featureFlags.stripe,
    },
    timestamp: new Date().toISOString(),
  });
}
