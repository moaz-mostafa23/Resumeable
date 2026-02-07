"use client";

/**
 * Static Bold Header preview — thumbnail-optimized.
 * Teal (#0d9488) header banner with photo placeholder, single-column body.
 */
export function StaticBoldHeader() {
  const teal = "#0d9488";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: 6.5,
        lineHeight: 1.2,
        backgroundColor: "white",
        overflow: "hidden",
        color: "#374151",
      }}
    >
      {/* Header Banner */}
      <div
        style={{
          backgroundColor: teal,
          padding: "10px 14px",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        {/* Photo placeholder */}
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.2)",
            border: "2px solid white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            fontWeight: 700,
            color: "rgba(255,255,255,0.6)",
            flexShrink: 0,
          }}
        >
          SC
        </div>
        <div>
          <h1
            style={{
              fontSize: 13,
              color: "white",
              fontWeight: 700,
              marginBottom: 1,
            }}
          >
            Sarah Chen
          </h1>
          <p style={{ fontSize: 8, color: "rgba(255,255,255,0.9)", fontWeight: 500 }}>
            Senior UX Designer
          </p>
        </div>
      </div>

      {/* Contact bar */}
      <div
        style={{
          backgroundColor: `${teal}10`,
          padding: "4px 14px",
          display: "flex",
          flexWrap: "wrap",
          gap: "2px 10px",
          fontSize: 6,
          color: "#4b5563",
          borderBottom: `1px solid ${teal}30`,
        }}
      >
        {["sarah.chen@email.com", "(415) 555-0142", "San Francisco, CA", "sarahchen.design"].map((item, i) => (
          <span key={i} style={{ display: "flex", alignItems: "center", gap: 3 }}>
            <span style={{ width: 3, height: 3, borderRadius: "50%", backgroundColor: teal, flexShrink: 0 }} />
            {item}
          </span>
        ))}
      </div>

      {/* Body */}
      <div style={{ padding: "8px 14px" }}>
        {/* Summary */}
        <div style={{ marginBottom: 5 }}>
          <h2 style={{ fontSize: 7, fontWeight: 600, color: teal, textTransform: "uppercase", letterSpacing: 0.8, borderBottom: `1.5px solid ${teal}`, paddingBottom: 2, marginBottom: 3 }}>Professional Summary</h2>
          <p>Award-winning UX designer with 6+ years crafting intuitive digital experiences for enterprise SaaS and consumer products.</p>
        </div>

        {/* Experience */}
        <div style={{ marginBottom: 5 }}>
          <h2 style={{ fontSize: 7, fontWeight: 600, color: teal, textTransform: "uppercase", letterSpacing: 0.8, borderBottom: `1.5px solid ${teal}`, paddingBottom: 2, marginBottom: 3 }}>Work Experience</h2>
          {/* Stripe */}
          <div style={{ marginBottom: 4 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontWeight: 600, color: "#111827" }}>Senior UX Designer</span>
              <span style={{ color: "#6b7280", fontSize: 6, flexShrink: 0 }}>Mar 2022 – Present</span>
            </div>
            <p style={{ color: teal, fontWeight: 500, marginBottom: 1.5 }}>Stripe · San Francisco, CA</p>
            <ul style={{ listStyleType: "disc", paddingLeft: 10, display: "flex", flexDirection: "column", gap: 0.5 }}>
              <li>Led dashboard redesign, +34% task completion across 2M+ users</li>
              <li>Built 120+ component library, 40% faster handoff</li>
              <li>Conducted 50+ user interviews for payments onboarding</li>
            </ul>
          </div>
          {/* Figma */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontWeight: 600, color: "#111827" }}>UX Designer</span>
              <span style={{ color: "#6b7280", fontSize: 6, flexShrink: 0 }}>Jun 2019 – Feb 2022</span>
            </div>
            <p style={{ color: teal, fontWeight: 500, marginBottom: 1.5 }}>Figma · San Francisco, CA</p>
            <ul style={{ listStyleType: "disc", paddingLeft: 10, display: "flex", flexDirection: "column", gap: 0.5 }}>
              <li>Designed collaborative features used by 4M+ designers</li>
              <li>Reduced new user drop-off by 28% through A/B testing</li>
            </ul>
          </div>
        </div>

        {/* Education */}
        <div style={{ marginBottom: 5 }}>
          <h2 style={{ fontSize: 7, fontWeight: 600, color: teal, textTransform: "uppercase", letterSpacing: 0.8, borderBottom: `1.5px solid ${teal}`, paddingBottom: 2, marginBottom: 3 }}>Education</h2>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <div>
              <span style={{ fontWeight: 600, color: "#111827" }}>MS Human-Computer Interaction</span>
              <p style={{ color: "#4b5563" }}>Stanford University</p>
            </div>
            <span style={{ color: "#6b7280", fontSize: 6, flexShrink: 0 }}>2017 – 2019</span>
          </div>
        </div>

        {/* Skills */}
        <div style={{ marginBottom: 4 }}>
          <h2 style={{ fontSize: 7, fontWeight: 600, color: teal, textTransform: "uppercase", letterSpacing: 0.8, borderBottom: `1.5px solid ${teal}`, paddingBottom: 2, marginBottom: 3 }}>Skills</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 2.5 }}>
            {["Figma", "Sketch", "Adobe XD", "User Interviews", "A/B Testing", "Journey Mapping", "HTML/CSS", "React", "Design Systems"].map((skill, i) => (
              <span key={i} style={{ padding: "1.5px 5px", fontSize: 6, borderRadius: 10, backgroundColor: `${teal}15`, color: teal, border: `0.5px solid ${teal}30` }}>{skill}</span>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h2 style={{ fontSize: 7, fontWeight: 600, color: teal, textTransform: "uppercase", letterSpacing: 0.8, borderBottom: `1.5px solid ${teal}`, paddingBottom: 2, marginBottom: 3 }}>Certifications</h2>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Google UX Design Professional Certificate — Google</span>
            <span style={{ color: "#6b7280", fontSize: 6 }}>2023</span>
          </div>
        </div>
      </div>
    </div>
  );
}
