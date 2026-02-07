import crypto from "crypto";

// ── Types ──────────────────────────────────────────────────────────────

export interface LemonSqueezySubscription {
  id: string;
  attributes: {
    store_id: number;
    customer_id: number;
    variant_id: number;
    status: string;
    renews_at: string | null;
    ends_at: string | null;
    created_at: string;
    updated_at: string;
    urls: {
      update_payment_method: string;
      customer_portal: string;
    };
  };
}

export interface LemonSqueezyWebhookEvent {
  meta: {
    event_name: string;
    custom_data?: {
      user_id?: string;
    };
  };
  data: LemonSqueezySubscription;
}

// ── Verification ───────────────────────────────────────────────────────

export function verifyWebhookSignature(
  payload: string,
  signature: string
): boolean {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET!;
  const hmac = crypto.createHmac("sha256", secret);
  const digest = hmac.update(payload).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}

// ── API helpers ────────────────────────────────────────────────────────

const LS_API_BASE = "https://api.lemonsqueezy.com/v1";

function lsHeaders() {
  return {
    Accept: "application/vnd.api+json",
    "Content-Type": "application/vnd.api+json",
    Authorization: `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`,
  };
}

/**
 * Create a checkout URL for a given variant, passing the Supabase user_id
 * as custom data so the webhook can link the subscription to the user.
 */
export async function createCheckout(
  variantId: string,
  userId: string,
  userEmail: string
): Promise<string> {
  const storeId = process.env.LEMONSQUEEZY_STORE_ID!;

  const res = await fetch(`${LS_API_BASE}/checkouts`, {
    method: "POST",
    headers: lsHeaders(),
    body: JSON.stringify({
      data: {
        type: "checkouts",
        attributes: {
          checkout_data: {
            custom: {
              user_id: userId,
            },
            email: userEmail,
          },
          product_options: {
            redirect_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?upgraded=true`,
          },
        },
        relationships: {
          store: {
            data: {
              type: "stores",
              id: storeId,
            },
          },
          variant: {
            data: {
              type: "variants",
              id: variantId,
            },
          },
        },
      },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`LemonSqueezy checkout error: ${err}`);
  }

  const json = await res.json();
  return json.data.attributes.url;
}

/**
 * Get a customer portal URL for managing their subscription.
 */
export async function getSubscription(
  subscriptionId: string
): Promise<LemonSqueezySubscription> {
  const res = await fetch(`${LS_API_BASE}/subscriptions/${subscriptionId}`, {
    headers: lsHeaders(),
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch subscription: ${res.statusText}`);
  }

  const json = await res.json();
  return json.data;
}
