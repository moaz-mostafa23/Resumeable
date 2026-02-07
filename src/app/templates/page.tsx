import type { Metadata } from "next";
import { TemplatesGallery } from "./TemplatesGallery";

export const metadata: Metadata = {
  title: "Free Resume Templates — ATS-Friendly Designs",
  description:
    "Browse professional, ATS-friendly resume templates. Pick a layout that fits your style, fill in your details, and download a polished PDF — completely free.",
  alternates: {
    canonical: "https://www.resumeable.cv/templates",
  },
  openGraph: {
    title: "Free Resume Templates — Resumeable",
    description:
      "Professional, ATS-friendly resume templates. Pick one and start building for free.",
    url: "https://www.resumeable.cv/templates",
  },
};

export default function TemplatesPage() {
  return <TemplatesGallery />;
}
