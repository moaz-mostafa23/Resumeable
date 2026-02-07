import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Resumeable — Free Resume Builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Auto-generated Open Graph image.
 * Next.js serves this at /opengraph-image.png and wires it
 * into the <meta> tags automatically.
 */
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #2563eb 100%)",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {/* Logo area */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              background: "rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
              fontWeight: 700,
              color: "white",
            }}
          >
            R
          </div>
          <span style={{ fontSize: "48px", fontWeight: 700, color: "white" }}>
            Resumeable
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "28px",
            color: "rgba(255,255,255,0.85)",
            maxWidth: "700px",
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          Build professional, ATS-friendly resumes for free — in minutes.
        </div>

        {/* URL */}
        <div
          style={{
            marginTop: "32px",
            fontSize: "20px",
            color: "rgba(255,255,255,0.6)",
          }}
        >
          resumeable.cv
        </div>
      </div>
    ),
    { ...size }
  );
}
