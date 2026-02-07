import type { Metadata } from "next";
import { PricingPage } from "./PricingPage";

export const metadata: Metadata = {
  title: "Pricing — Free & Pro Plans",
  description:
    "Resumeable is free to use. Upgrade to Pro for premium templates, AI-powered suggestions, and watermark-free PDF exports.",
  alternates: {
    canonical: "https://www.resumeable.cv/pricing",
  },
  openGraph: {
    title: "Pricing — Resumeable",
    description:
      "Resumeable is free to use. Upgrade to Pro for premium templates, AI suggestions, and clean PDF exports.",
    url: "https://www.resumeable.cv/pricing",
  },
};

export default function Page() {
  return <PricingPage />;
}
