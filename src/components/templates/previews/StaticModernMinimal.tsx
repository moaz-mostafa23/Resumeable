"use client";

/**
 * Static Modern Minimal preview — thumbnail-optimized.
 * Blue accent (#2563eb), left colored borders on sections, skill chips, date badges.
 */
export function StaticModernMinimal() {
  const accent = "#2563eb";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        padding: 14,
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: 6.5,
        lineHeight: 1.2,
        backgroundColor: "white",
        overflow: "hidden",
        color: "#374151",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 6 }}>
        <h1 style={{ fontSize: 12, color: accent, fontWeight: 700, marginBottom: 1 }}>Sarah Chen</h1>
        <p style={{ fontSize: 8, color: "#4b5563", marginBottom: 4 }}>Senior UX Designer</p>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "2px 8px", color: "#4b5563", fontSize: 6 }}>
          {["sarah.chen@email.com", "(415) 555-0142", "San Francisco, CA"].map((item, i) => (
            <span key={i} style={{ display: "flex", alignItems: "center", gap: 3 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: `${accent}20`, display: "inline-block", flexShrink: 0 }} />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div style={{ marginBottom: 5 }}>
        <h2 style={{ fontSize: 7.5, fontWeight: 600, color: accent, borderLeft: `3px solid ${accent}`, paddingLeft: 6, marginBottom: 2 }}>Professional Summary</h2>
        <p>Award-winning UX designer with 6+ years of experience crafting intuitive digital experiences for enterprise SaaS products.</p>
      </div>

      {/* Experience */}
      <div style={{ marginBottom: 5 }}>
        <h2 style={{ fontSize: 7.5, fontWeight: 600, color: accent, borderLeft: `3px solid ${accent}`, paddingLeft: 6, marginBottom: 2 }}>Work Experience</h2>
        {/* Stripe */}
        <div style={{ marginBottom: 4 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ fontWeight: 600, color: "#111827" }}>Senior UX Designer</span>
            <span style={{ fontSize: 5.5, fontWeight: 500, padding: "1px 4px", borderRadius: 3, backgroundColor: `${accent}15`, color: accent, whiteSpace: "nowrap", flexShrink: 0 }}>Mar 2022 – Present</span>
          </div>
          <p style={{ color: "#4b5563", marginBottom: 1.5 }}>Stripe • San Francisco, CA</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            {["Led redesign of merchant dashboard, increasing task completion by 34%", "Built component library of 120+ reusable patterns, reducing handoff time by 40%", "Conducted 50+ user interviews for payments onboarding flow"].map((text, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 3 }}>
                <span style={{ width: 3.5, height: 3.5, borderRadius: "50%", backgroundColor: accent, display: "inline-block", flexShrink: 0, marginTop: 2.5 }} />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Figma */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ fontWeight: 600, color: "#111827" }}>UX Designer</span>
            <span style={{ fontSize: 5.5, fontWeight: 500, padding: "1px 4px", borderRadius: 3, backgroundColor: `${accent}15`, color: accent, whiteSpace: "nowrap", flexShrink: 0 }}>Jun 2019 – Feb 2022</span>
          </div>
          <p style={{ color: "#4b5563", marginBottom: 1.5 }}>Figma • San Francisco, CA</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            {["Designed collaborative features used by 4M+ designers", "Reduced new user drop-off by 28% through A/B-tested onboarding redesign"].map((text, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 3 }}>
                <span style={{ width: 3.5, height: 3.5, borderRadius: "50%", backgroundColor: accent, display: "inline-block", flexShrink: 0, marginTop: 2.5 }} />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Education */}
      <div style={{ marginBottom: 5 }}>
        <h2 style={{ fontSize: 7.5, fontWeight: 600, color: accent, borderLeft: `3px solid ${accent}`, paddingLeft: 6, marginBottom: 2 }}>Education</h2>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <div>
            <span style={{ fontWeight: 600, color: "#111827" }}>MS Human-Computer Interaction</span>
            <p style={{ color: "#4b5563" }}>Stanford University</p>
          </div>
          <span style={{ fontSize: 5.5, fontWeight: 500, padding: "1px 4px", borderRadius: 3, backgroundColor: `${accent}15`, color: accent, whiteSpace: "nowrap", flexShrink: 0 }}>2017 – 2019</span>
        </div>
      </div>

      {/* Skills */}
      <div style={{ marginBottom: 4 }}>
        <h2 style={{ fontSize: 7.5, fontWeight: 600, color: accent, borderLeft: `3px solid ${accent}`, paddingLeft: 6, marginBottom: 2 }}>Skills</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
          {["Figma", "Sketch", "Adobe XD", "User Interviews", "A/B Testing", "Journey Mapping", "HTML/CSS", "React Prototyping", "Design Systems"].map((skill, i) => (
            <span key={i} style={{ padding: "1.5px 5px", fontSize: 6, borderRadius: 4, backgroundColor: `${accent}10`, color: accent, border: `0.5px solid ${accent}30` }}>{skill}</span>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div>
        <h2 style={{ fontSize: 7.5, fontWeight: 600, color: accent, borderLeft: `3px solid ${accent}`, paddingLeft: 6, marginBottom: 2 }}>Certifications</h2>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span>Google UX Design Professional Certificate — Google</span>
          <span style={{ fontSize: 5.5, fontWeight: 500, padding: "1px 4px", borderRadius: 3, backgroundColor: `${accent}15`, color: accent, whiteSpace: "nowrap", flexShrink: 0 }}>2023</span>
        </div>
      </div>
    </div>
  );
}
