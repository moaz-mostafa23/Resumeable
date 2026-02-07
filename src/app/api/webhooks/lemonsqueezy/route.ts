import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  verifyWebhookSignature,
  type LemonSqueezyWebhookEvent,
} from "@/lib/lemonsqueezy";

// Use service role to bypass RLS — webhooks are server-to-server
function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
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
    const eventName = event.meta.event_name;
    const subscription = event.data;
    const attrs = subscription.attributes;
    const userId = event.meta.custom_data?.user_id;

    console.log(`[LS Webhook] ${eventName} — sub ${subscription.id}, user ${userId}`);

    const supabase = createServiceClient();

    switch (eventName) {
      case "subscription_created": {
        if (!userId) {
          console.error("No user_id in custom_data for subscription_created");
          return NextResponse.json({ error: "Missing user_id" }, { status: 400 });
        }

        const { error } = await supabase.from("subscriptions").upsert(
          {
            user_id: userId,
            lemonsqueezy_subscription_id: subscription.id,
            lemonsqueezy_customer_id: String(attrs.customer_id),
            lemonsqueezy_variant_id: String(attrs.variant_id),
            status: attrs.status,
            current_period_end: attrs.renews_at,
            cancel_at_period_end: false,
          },
          { onConflict: "user_id" }
        );

        if (error) {
          console.error("Error upserting subscription:", error);
          return NextResponse.json({ error: "DB error" }, { status: 500 });
        }
        break;
      }

      case "subscription_updated": {
        const { error } = await supabase
          .from("subscriptions")
          .update({
            status: attrs.status,
            current_period_end: attrs.renews_at ?? attrs.ends_at,
            lemonsqueezy_variant_id: String(attrs.variant_id),
            cancel_at_period_end: attrs.status === "cancelled",
          })
          .eq("lemonsqueezy_subscription_id", subscription.id);

        if (error) console.error("Error updating subscription:", error);
        break;
      }

      case "subscription_cancelled": {
        // LS sends "cancelled" — the sub stays active until period end
        const { error } = await supabase
          .from("subscriptions")
          .update({
            status: "cancelled",
            cancel_at_period_end: true,
            current_period_end: attrs.ends_at,
          })
          .eq("lemonsqueezy_subscription_id", subscription.id);

        if (error) console.error("Error cancelling subscription:", error);
        break;
      }

      case "subscription_expired": {
        const { error } = await supabase
          .from("subscriptions")
          .update({
            status: "expired",
            cancel_at_period_end: false,
          })
          .eq("lemonsqueezy_subscription_id", subscription.id);

        if (error) console.error("Error expiring subscription:", error);
        break;
      }

      case "subscription_payment_success": {
        // Renew: update period end and ensure status is active
        const { error } = await supabase
          .from("subscriptions")
          .update({
            status: "active",
            current_period_end: attrs.renews_at,
          })
          .eq("lemonsqueezy_subscription_id", subscription.id);

        if (error) console.error("Error on payment success:", error);
        break;
      }

      case "subscription_payment_failed": {
        const { error } = await supabase
          .from("subscriptions")
          .update({
            status: "past_due",
          })
          .eq("lemonsqueezy_subscription_id", subscription.id);

        if (error) console.error("Error on payment failed:", error);
        break;
      }

      default:
        console.log(`[LS Webhook] Unhandled event: ${eventName}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook handler error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
