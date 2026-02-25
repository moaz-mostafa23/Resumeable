import { PrintResumeSurface } from "@/components/preview/PrintResumeSurface";
import { Metadata } from "next";
import "./print.css";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function PrintPage() {
  return <PrintResumeSurface />;
}
