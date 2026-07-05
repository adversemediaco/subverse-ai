import { NextRequest, NextResponse } from "next/server";
import { isStripeEnabled } from "@/lib/config";
import { createCheckoutSession, createBillingPortalSession } from "@/lib/stripe";

/**
 * POST /api/billing
 * Handles checkout, billing-portal, and cancellation actions.
 * Falls back to demo placeholder URLs when Stripe isn't configured.
 */

export async function POST(request: NextRequest) {
  try {
    const { action, priceId, customerId, customerEmail } = await request.json();

    switch (action) {
      case "create-checkout": {
        if (!isStripeEnabled) {
          return NextResponse.json({ url: "https://checkout.stripe.com/demo-session", demo: true });
        }
        if (!priceId) {
          return NextResponse.json({ error: "priceId is required" }, { status: 400 });
        }
        const { url, sessionId } = await createCheckoutSession({ priceId, customerId, customerEmail });
        return NextResponse.json({ url, sessionId });
      }

      case "manage-subscription": {
        if (!isStripeEnabled) {
          return NextResponse.json({ url: "https://billing.stripe.com/demo-portal", demo: true });
        }
        if (!customerId) {
          return NextResponse.json({ error: "customerId is required" }, { status: 400 });
        }
        const { url } = await createBillingPortalSession(customerId);
        return NextResponse.json({ url });
      }

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("Billing error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * GET /api/billing — current subscription + usage summary.
 * (Demo values; wire to your DB/Stripe customer in production.)
 */
export async function GET() {
  return NextResponse.json({
    plan: "PRO",
    status: "active",
    currentPeriodEnd: "2024-08-15T00:00:00Z",
    usage: {
      videos: { used: 32, limit: 50 },
      storage: { used: 4.2, limit: 10, unit: "GB" },
      credits: { used: 880, limit: 1000 },
    },
  });
}
