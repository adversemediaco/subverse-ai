import "server-only";
import Stripe from "stripe";
import { APP_URL, isStripeEnabled } from "@/lib/config";

/**
 * Stripe client + billing helpers.
 *
 * The client is created lazily so importing this module never throws in demo
 * mode. Call `getStripe()` only from server code that has verified billing is
 * enabled (or handle the thrown error).
 */

let stripeClient: Stripe | null = null;

export function getStripe(): Stripe {
  if (!isStripeEnabled) {
    throw new Error(
      "Stripe is not configured. Set STRIPE_SECRET_KEY to enable billing."
    );
  }
  if (!stripeClient) {
    // apiVersion is intentionally omitted so the installed SDK uses its own
    // pinned default — avoids a strict literal-type mismatch across versions.
    stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      typescript: true,
    });
  }
  return stripeClient;
}

/**
 * Create a Checkout Session for a subscription plan.
 * @returns the hosted checkout URL to redirect the user to.
 */
export async function createCheckoutSession(params: {
  priceId: string;
  customerId?: string;
  customerEmail?: string;
}): Promise<{ url: string; sessionId: string }> {
  const stripe = getStripe();

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: params.priceId, quantity: 1 }],
    customer: params.customerId,
    customer_email: params.customerId ? undefined : params.customerEmail,
    success_url: `${APP_URL}/dashboard/billing?status=success`,
    cancel_url: `${APP_URL}/dashboard/billing?status=canceled`,
    allow_promotion_codes: true,
    billing_address_collection: "auto",
  });

  return { url: session.url ?? "", sessionId: session.id };
}

/**
 * Create a Billing Portal session so customers can manage their subscription.
 */
export async function createBillingPortalSession(
  customerId: string
): Promise<{ url: string }> {
  const stripe = getStripe();
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${APP_URL}/dashboard/billing`,
  });
  return { url: session.url };
}

/**
 * Verify and construct a Stripe webhook event from the raw request body.
 * Throws if the signature is invalid.
 */
export function constructWebhookEvent(
  payload: string | Buffer,
  signature: string
): Stripe.Event {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    throw new Error("STRIPE_WEBHOOK_SECRET is not configured.");
  }
  return stripe.webhooks.constructEvent(payload, signature, secret);
}
