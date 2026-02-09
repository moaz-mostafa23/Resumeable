import type { Metadata } from "next";
import { Fraunces, Inter, Manrope } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { JsonLd } from "@/components/seo/JsonLd";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

const SITE_URL = "https://www.resumeable.cv";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Resumeable — Free Resume Builder | Create ATS-Friendly Resumes",
    template: "%s | Resumeable",
  },
  description:
    "Build professional, ATS-friendly resumes for free. Drag-and-drop editor, beautiful templates, and instant PDF export — no design skills needed.",
  keywords: [
    "resume builder",
    "free resume builder",
    "ATS resume",
    "resume maker",
    "CV builder",
    "resume templates",
    "professional resume",
    "resume PDF",
    "drag and drop resume builder",
  ],
  openGraph: {
    title: "Resumeable — Free Resume Builder",
    description:
      "Create professional, ATS-friendly resumes in minutes. Free drag-and-drop builder with beautiful templates and instant PDF export.",
    type: "website",
    url: SITE_URL,
    siteName: "Resumeable",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Resumeable — Free Resume Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resumeable — Free Resume Builder",
    description:
      "Create professional, ATS-friendly resumes in minutes. Free drag-and-drop builder with instant PDF export.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en">
      <body className={`${inter.className} ${fraunces.variable} ${manrope.variable}`}>
        <JsonLd />
        <AuthProvider>{children}</AuthProvider>
      </body>
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}
