import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getSubscription } from "@/lib/lemonsqueezy";

export async function POST() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: subscription, error: subscriptionError } = await supabase
      .from("subscriptions")
      .select("lemonsqueezy_subscription_id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (subscriptionError) {
      console.error("Subscription lookup error:", subscriptionError);
      return NextResponse.json(
        { error: "Failed to load subscription" },
        { status: 500 }
      );
    }

    if (!subscription?.lemonsqueezy_subscription_id) {
      return NextResponse.json(
        { error: "No active subscription found" },
        { status: 404 }
      );
    }

    const lsSubscription = await getSubscription(
      subscription.lemonsqueezy_subscription_id
    );
    const customerPortalUrl = lsSubscription.attributes.urls.customer_portal;

    if (!customerPortalUrl) {
      return NextResponse.json(
        { error: "Customer portal URL not available" },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: customerPortalUrl });
  } catch (err) {
    console.error("Billing portal error:", err);
    return NextResponse.json(
      { error: "Failed to open billing portal" },
      { status: 500 }
    );
  }
}
