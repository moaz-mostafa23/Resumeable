import crypto from "node:crypto";

// ── Types ──────────────────────────────────────────────────────────────

export interface LemonSqueezySubscription {
  id: string;
  type: "subscriptions";
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
  meta?: {
    event_name?: string;
    custom_data?: {
      user_id?: string;
    };
  };
  data: {
    id: string;
    type: string;
    attributes?: Record<string, unknown>;
    relationships?: Record<string, unknown>;
  };
}

// ── Constants ──────────────────────────────────────────────────────────

const LS_API_BASE = "https://api.lemonsqueezy.com/v1";

// ── Helpers ────────────────────────────────────────────────────────────

function requiredEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required env var: ${key}`);
  }
  return value;
}

function lsHeaders() {
  return {
    Accept: "application/vnd.api+json",
    "Content-Type": "application/vnd.api+json",
    Authorization: `Bearer ${requiredEnv("LEMONSQUEEZY_API_KEY")}`,
  };
}

function parseBooleanEnv(value: string | undefined): boolean | undefined {
  if (!value) return undefined;
  const normalized = value.trim().toLowerCase();
  if (["1", "true", "yes", "on"].includes(normalized)) return true;
  if (["0", "false", "no", "off"].includes(normalized)) return false;
  return undefined;
}

function asObject(value: unknown): Record<string, unknown> | null {
  return typeof value === "object" && value !== null
    ? (value as Record<string, unknown>)
    : null;
}

function asStringOrNumber(value: unknown): string | number | null {
  if (typeof value === "string" || typeof value === "number") return value;
  return null;
}

// ── Verification ───────────────────────────────────────────────────────

export function verifyWebhookSignature(
  payload: string,
  signature: string
): boolean {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  if (!secret || !signature) return false;

  const normalizedSignature = signature.replace(/^sha256=/i, "").trim();
  const digest = crypto.createHmac("sha256", secret).update(payload).digest("hex");

  const digestBuffer = Buffer.from(digest, "utf8");
  const signatureBuffer = Buffer.from(normalizedSignature, "utf8");
  if (digestBuffer.length !== signatureBuffer.length) return false;

  return crypto.timingSafeEqual(digestBuffer, signatureBuffer);
}

// ── API helpers ────────────────────────────────────────────────────────

/**
 * Create a checkout URL for a given variant, passing the Supabase user_id
 * as custom data so the webhook can link the subscription to the user.
 */
export async function createCheckout(
  variantId: string,
  userId: string,
  userEmail?: string | null
): Promise<string> {
  const storeId = requiredEnv("LEMONSQUEEZY_STORE_ID");
  const siteUrl = requiredEnv("NEXT_PUBLIC_SITE_URL");
  const checkoutTestMode = parseBooleanEnv(process.env.LEMONSQUEEZY_CHECKOUT_TEST_MODE);

  const attributes: Record<string, unknown> = {
    checkout_data: {
      custom: {
        user_id: userId,
      },
    },
    product_options: {
      redirect_url: `${siteUrl}/dashboard?upgraded=true`,
    },
  };

  if (userEmail) {
    (attributes.checkout_data as { email?: string }).email = userEmail;
  }

  if (typeof checkoutTestMode === "boolean") {
    attributes.test_mode = checkoutTestMode;
  }

  const res = await fetch(`${LS_API_BASE}/checkouts`, {
    method: "POST",
    headers: lsHeaders(),
    body: JSON.stringify({
      data: {
        type: "checkouts",
        attributes,
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
 * Get a subscription object from the Lemon Squeezy API.
 */
export async function getSubscription(
  subscriptionId: string
): Promise<LemonSqueezySubscription> {
  const res = await fetch(`${LS_API_BASE}/subscriptions/${subscriptionId}`, {
    headers: lsHeaders(),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to fetch subscription: ${res.status} ${err}`);
  }

  const json = await res.json();
  return json.data as LemonSqueezySubscription;
}

/**
 * Extract the subscription ID from either a Subscription webhook payload
 * or a Subscription Invoice webhook payload.
 */
export function extractSubscriptionIdFromWebhook(
  event: LemonSqueezyWebhookEvent
): string | null {
  if (event.data.type === "subscriptions") {
    return event.data.id;
  }

  if (event.data.type !== "subscription-invoices") {
    return null;
  }

  const attributes = asObject(event.data.attributes);
  const fromAttributes = asStringOrNumber(attributes?.subscription_id);
  if (fromAttributes !== null) return String(fromAttributes);

  const relationships = asObject(event.data.relationships);
  const subscriptionRel = asObject(relationships?.subscription);
  const relData = asObject(subscriptionRel?.data);
  const fromRelationships = asStringOrNumber(relData?.id);
  if (fromRelationships !== null) return String(fromRelationships);

  return null;
}
