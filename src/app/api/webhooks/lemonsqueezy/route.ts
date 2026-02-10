import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  extractSubscriptionIdFromWebhook,
  getSubscription,
  verifyWebhookSignature,
  type LemonSqueezySubscription,
  type LemonSqueezyWebhookEvent,
} from "@/lib/lemonsqueezy";

// Use service role to bypass RLS — webhooks are server-to-server
function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

function normalizeSubscriptionRow(subscription: LemonSqueezySubscription) {
  return {
    lemonsqueezy_subscription_id: subscription.id,
    lemonsqueezy_customer_id: String(subscription.attributes.customer_id),
    lemonsqueezy_variant_id: String(subscription.attributes.variant_id),
    status: subscription.attributes.status,
    current_period_end:
      subscription.attributes.renews_at ?? subscription.attributes.ends_at,
    cancel_at_period_end: subscription.attributes.status === "cancelled",
  };
}

async function syncSubscriptionToDatabase(params: {
  userId?: string;
  subscription: LemonSqueezySubscription;
}) {
  const { userId, subscription } = params;
  const supabase = createServiceClient();
  const payload = normalizeSubscriptionRow(subscription);

  // Preferred path: upsert by user_id when custom_data.user_id is present.
  if (userId) {
    const { error } = await supabase.from("subscriptions").upsert(
      {
        user_id: userId,
        ...payload,
      },
      { onConflict: "user_id" }
    );
    return { error, mapped: true };
  }

  // Fallback path: update the existing row by Lemon Squeezy subscription id.
  const { data: updatedRows, error: updateError } = await supabase
    .from("subscriptions")
    .update(payload)
    .eq("lemonsqueezy_subscription_id", subscription.id)
    .select("id");

  if (updateError) {
    return { error: updateError, mapped: false };
  }

  if (updatedRows && updatedRows.length > 0) {
    return { error: null, mapped: true };
  }

  // Last fallback: recover mapping by customer id (covers a few edge cases).
  const { data: existingCustomerRow, error: customerLookupError } = await supabase
    .from("subscriptions")
    .select("user_id")
    .eq("lemonsqueezy_customer_id", payload.lemonsqueezy_customer_id)
    .maybeSingle();

  if (customerLookupError || !existingCustomerRow?.user_id) {
    return { error: customerLookupError, mapped: false };
  }

  const { error: recoveredUpsertError } = await supabase.from("subscriptions").upsert(
    {
      user_id: existingCustomerRow.user_id,
      ...payload,
    },
    { onConflict: "user_id" }
  );

  return { error: recoveredUpsertError, mapped: recoveredUpsertError == null };
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("x-signature") ?? "";

    // Verify the webhook is from LemonSqueezy
    if (!verifyWebhookSignature(rawBody, signature)) {
      console.error("Invalid webhook signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const event: LemonSqueezyWebhookEvent = JSON.parse(rawBody);
    const eventName =
      event.meta?.event_name ?? request.headers.get("x-event-name") ?? "unknown_event";
    const userId = event.meta?.custom_data?.user_id;
    const subscriptionId = extractSubscriptionIdFromWebhook(event);

    // Ignore non-subscription webhooks if they are sent to this endpoint.
    if (!subscriptionId) {
      console.log(`[LS Webhook] Ignored ${eventName}: no subscription id in payload`);
      return NextResponse.json({ received: true });
    }

    const subscription = await getSubscription(subscriptionId);
    console.log(
      `[LS Webhook] ${eventName} — sub ${subscription.id}, user ${userId ?? "unknown"}`
    );

    const { error, mapped } = await syncSubscriptionToDatabase({
      userId,
      subscription,
    });

    if (error) {
      console.error("Error syncing subscription:", error);
      return NextResponse.json({ error: "DB sync error" }, { status: 500 });
    }

    if (!mapped) {
      console.warn(
        `[LS Webhook] Could not map subscription ${subscription.id} to a user. ` +
          "Ensure checkout_data.custom.user_id is sent during checkout creation."
      );
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook handler error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
