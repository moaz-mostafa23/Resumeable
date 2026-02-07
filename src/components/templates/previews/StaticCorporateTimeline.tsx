"use client";

/**
 * Static Corporate Timeline preview — thumbnail-optimized.
 * Timeline layout: date on left, dot indicator, content on right.
 * Navy accent (#0f172a), thick header rule.
 */
export function StaticCorporateTimeline() {
  const navy = "#0f172a";

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
      <div style={{ marginBottom: 6, paddingBottom: 5, borderBottom: `2.5px solid ${navy}` }}>
        <h1 style={{ fontSize: 12, color: navy, fontWeight: 700, marginBottom: 1 }}>Sarah Chen</h1>
        <p style={{ fontSize: 8, color: "#4b5563", fontWeight: 500, marginBottom: 2 }}>Senior UX Designer</p>
        <p style={{ fontSize: 6, color: "#6b7280" }}>sarah.chen@email.com · (415) 555-0142 · San Francisco, CA</p>
      </div>

      {/* Summary */}
      <div style={{ marginBottom: 5 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
          <span style={{ fontSize: 7, fontWeight: 700, color: navy, textTransform: "uppercase", letterSpacing: 1 }}>Summary</span>
          <div style={{ flexGrow: 1, height: 1.5, backgroundColor: `${navy}25` }} />
        </div>
        <p style={{ fontStyle: "italic" }}>Award-winning UX designer with 6+ years crafting intuitive digital experiences for enterprise SaaS and consumer products.</p>
      </div>

      {/* Experience */}
      <div style={{ marginBottom: 5 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
          <span style={{ fontSize: 7, fontWeight: 700, color: navy, textTransform: "uppercase", letterSpacing: 1 }}>Experience</span>
          <div style={{ flexGrow: 1, height: 1.5, backgroundColor: `${navy}25` }} />
        </div>

        {/* Stripe */}
        <div style={{ display: "flex", marginBottom: 3 }}>
          <div style={{ width: 42, flexShrink: 0, textAlign: "right", paddingRight: 6 }}>
            <p style={{ fontWeight: 600, fontSize: 6, color: navy }}>2022</p>
            <p style={{ color: "#6b7280", fontSize: 5.5 }}>Present</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: 6 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", border: `1.5px solid ${navy}`, backgroundColor: "white", flexShrink: 0 }} />
            <div style={{ width: 1.5, flexGrow: 1, backgroundColor: `${navy}25` }} />
          </div>
          <div style={{ flexGrow: 1, paddingBottom: 3 }}>
            <h3 style={{ fontWeight: 700, color: "#111827" }}>Senior UX Designer</h3>
            <p style={{ color: "#4b5563" }}>Stripe <span style={{ color: "#9ca3af" }}>— San Francisco, CA</span></p>
            <div style={{ display: "flex", flexDirection: "column", gap: 0.5, marginTop: 1.5 }}>
              {["Led dashboard redesign, +34% task completion across 2M+ users", "Built 120+ component library, reducing handoff time by 40%", "Conducted 50+ user interviews for payments onboarding"].map((text, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 3 }}>
                  <span style={{ color: "#9ca3af", marginTop: 0 }}>›</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Figma */}
        <div style={{ display: "flex" }}>
          <div style={{ width: 42, flexShrink: 0, textAlign: "right", paddingRight: 6 }}>
            <p style={{ fontWeight: 600, fontSize: 6, color: navy }}>2019</p>
            <p style={{ color: "#6b7280", fontSize: 5.5 }}>2022</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: 6 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", border: `1.5px solid ${navy}`, backgroundColor: "white", flexShrink: 0 }} />
            <div style={{ width: 1.5, flexGrow: 1, backgroundColor: `${navy}25` }} />
          </div>
          <div style={{ flexGrow: 1, paddingBottom: 2 }}>
            <h3 style={{ fontWeight: 700, color: "#111827" }}>UX Designer</h3>
            <p style={{ color: "#4b5563" }}>Figma</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 0.5, marginTop: 1.5 }}>
              {["Designed collaborative features used by 4M+ designers", "Reduced new user drop-off by 28% through A/B testing"].map((text, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 3 }}>
                  <span style={{ color: "#9ca3af", marginTop: 0 }}>›</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Education */}
      <div style={{ marginBottom: 5 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
          <span style={{ fontSize: 7, fontWeight: 700, color: navy, textTransform: "uppercase", letterSpacing: 1 }}>Education</span>
          <div style={{ flexGrow: 1, height: 1.5, backgroundColor: `${navy}25` }} />
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ width: 42, flexShrink: 0, textAlign: "right", paddingRight: 6 }}>
            <p style={{ fontWeight: 600, fontSize: 6, color: navy }}>2017</p>
            <p style={{ color: "#6b7280", fontSize: 5.5 }}>2019</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: 6 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", border: `1.5px solid ${navy}`, backgroundColor: "white", flexShrink: 0 }} />
          </div>
          <div style={{ flexGrow: 1 }}>
            <h3 style={{ fontWeight: 700, color: "#111827" }}>MS Human-Computer Interaction</h3>
            <p style={{ color: "#4b5563" }}>Stanford University</p>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div style={{ marginBottom: 4 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
          <span style={{ fontSize: 7, fontWeight: 700, color: navy, textTransform: "uppercase", letterSpacing: 1 }}>Skills</span>
          <div style={{ flexGrow: 1, height: 1.5, backgroundColor: `${navy}25` }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}>
          <div><span style={{ fontWeight: 600, color: "#111827" }}>Design: </span><span>Figma, Sketch, Adobe XD, Framer</span></div>
          <div><span style={{ fontWeight: 600, color: "#111827" }}>Research: </span><span>User Interviews, A/B Testing</span></div>
          <div><span style={{ fontWeight: 600, color: "#111827" }}>Technical: </span><span>HTML/CSS, React, Design Systems</span></div>
        </div>
      </div>

      {/* Certifications */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
          <span style={{ fontSize: 7, fontWeight: 700, color: navy, textTransform: "uppercase", letterSpacing: 1 }}>Certifications</span>
          <div style={{ flexGrow: 1, height: 1.5, backgroundColor: `${navy}25` }} />
        </div>
        <p>Google UX Design Professional Certificate — Google, 2023</p>
      </div>
    </div>
  );
}
