import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: subscription } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (!subscription) {
      return NextResponse.json({ isPro: false, subscription: null });
    }

    // User is Pro if status is active, or cancelled but period hasn't ended
    const isPro =
      subscription.status === "active" ||
      subscription.status === "on_trial" ||
      (subscription.status === "cancelled" &&
        subscription.current_period_end &&
        new Date(subscription.current_period_end) > new Date());

    return NextResponse.json({
      isPro,
      subscription: {
        status: subscription.status,
        currentPeriodEnd: subscription.current_period_end,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        customerPortalUrl: null, // fetched client-side if needed
      },
    });
  } catch (err) {
    console.error("Subscription check error:", err);
    return NextResponse.json(
      { error: "Failed to check subscription" },
      { status: 500 }
    );
  }
}
