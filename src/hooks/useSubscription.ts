"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuthContext } from "@/components/auth/AuthProvider";

interface SubscriptionState {
  isPro: boolean;
  status: string | null;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
  loading: boolean;
}

export function useSubscription() {
  const { user } = useAuthContext();
  const [state, setState] = useState<SubscriptionState>({
    isPro: false,
    status: null,
    currentPeriodEnd: null,
    cancelAtPeriodEnd: false,
    loading: true,
  });

  const fetchSubscription = useCallback(async () => {
    if (!user) {
      setState((s) => ({ ...s, isPro: false, loading: false }));
      return;
    }

    try {
      const res = await fetch("/api/subscription");
      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      setState({
        isPro: data.isPro,
        status: data.subscription?.status ?? null,
        currentPeriodEnd: data.subscription?.currentPeriodEnd ?? null,
        cancelAtPeriodEnd: data.subscription?.cancelAtPeriodEnd ?? false,
        loading: false,
      });
    } catch {
      setState((s) => ({ ...s, loading: false }));
    }
  }, [user]);

  useEffect(() => {
    fetchSubscription();
  }, [fetchSubscription]);

  const startCheckout = async () => {
    if (!user) {
      // Redirect to login first
      window.location.href = "/login?next=/pricing";
      return;
    }

    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      if (!res.ok) throw new Error("Failed to create checkout");

      const { url } = await res.json();
      window.location.href = url;
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  const manageBilling = async () => {
    if (!user) {
      window.location.href = "/login?next=/pricing";
      return;
    }

    try {
      const res = await fetch("/api/billing-portal", { method: "POST" });
      if (!res.ok) throw new Error("Failed to load billing portal");

      const { url } = await res.json();
      window.location.href = url;
    } catch (err) {
      console.error("Billing portal error:", err);
      alert("Unable to open billing settings right now. Please try again.");
    }
  };

  return {
    ...state,
    startCheckout,
    manageBilling,
    refetch: fetchSubscription,
  };
}
