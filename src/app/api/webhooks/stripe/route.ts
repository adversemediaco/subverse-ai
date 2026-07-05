import { NextRequest, NextResponse } from "next/server";
import { isStripeEnabled } from "@/lib/config";
import { constructWebhookEvent } from "@/lib/stripe";

/**
 * POST /api/webhooks/stripe
 * Receives Stripe webhook events (subscription lifecycle, payments).
 *
 * IMPORTANT: this route must read the RAW body to verify the signature, so we
 * use request.text() (never request.json()).
 */

export async function POST(request: NextRequest) {
  if (!isStripeEnabled) {
    return NextResponse.json({ received: true, demo: true });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  let event;
  try {
    const body = await request.text();
    event = constructWebhookEvent(body, signature);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Handle the relevant subscription lifecycle events.
  switch (event.type) {
    case "checkout.session.completed":
      // TODO: mark the user's subscription active, store stripeCustomerId/subId
      break;
    case "customer.subscription.updated":
      // TODO: sync plan / current period end
      break;
    case "customer.subscription.deleted":
      // TODO: downgrade the user to FREE
      break;
    case "invoice.payment_failed":
      // TODO: notify the user / flag account
      break;
    default:
      // Unhandled event types are acknowledged without action.
      break;
  }

  return NextResponse.json({ received: true });
}
