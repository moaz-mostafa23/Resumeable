"use client";

/**
 * Static Creative Infographic preview — thumbnail-optimized.
 * Purple (#7c3aed) header banner with name. Rounded skill pills.
 * Icon-style section markers.
 */
export function StaticCreativeInfographic() {
  const purple = "#7c3aed";

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
      <div style={{ backgroundColor: purple, padding: "12px 14px 10px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -20, right: -20, width: 70, height: 70, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.1)" }} />
        <div style={{ position: "absolute", bottom: -15, left: -15, width: 50, height: 50, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.08)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <h1 style={{ fontSize: 13, color: "white", fontWeight: 700, marginBottom: 1 }}>Sarah Chen</h1>
          <p style={{ color: "rgba(255,255,255,0.9)", fontSize: 8, fontWeight: 500, marginBottom: 4 }}>Senior UX Designer</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "2px 8px", color: "rgba(255,255,255,0.85)", fontSize: 6 }}>
            {["sarah.chen@email.com", "(415) 555-0142", "San Francisco, CA"].map((item, i) => (
              <span key={i} style={{ display: "flex", alignItems: "center", gap: 2 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.2)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 4, flexShrink: 0 }}>✦</span>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Summary callout */}
      <div style={{ backgroundColor: `${purple}08`, padding: "4px 10px", margin: "6px 14px 0", borderRadius: 5, borderLeft: `3px solid ${purple}` }}>
        <p style={{ fontSize: 6 }}>Award-winning UX designer with 6+ years crafting intuitive digital experiences for enterprise SaaS and consumer products.</p>
      </div>

      <div style={{ padding: "0 14px" }}>
        {/* Experience */}
        <div style={{ marginTop: 5, marginBottom: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 3 }}>
            <div style={{ width: 14, height: 14, borderRadius: 3, backgroundColor: `${purple}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7, flexShrink: 0 }}>💼</div>
            <span style={{ fontSize: 7.5, fontWeight: 700, color: purple }}>Experience</span>
          </div>

          {/* Stripe */}
          <div style={{ display: "flex", gap: 5, marginBottom: 3 }}>
            <div style={{ width: 13, height: 13, borderRadius: "50%", backgroundColor: purple, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 6.5, flexShrink: 0, marginTop: 1 }}>1</div>
            <div style={{ flexGrow: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <div>
                  <span style={{ fontWeight: 700, color: "#111827" }}>Senior UX Designer</span>
                  <p style={{ color: purple, fontWeight: 500 }}>Stripe</p>
                </div>
                <span style={{ padding: "1px 4px", borderRadius: 10, fontSize: 5.5, fontWeight: 500, backgroundColor: `${purple}15`, color: purple, whiteSpace: "nowrap", flexShrink: 0 }}>2022 – Present</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 0.5, marginTop: 1.5 }}>
                {["Led dashboard redesign, +34% task completion for 2M+ users", "Built 120+ component library, 40% faster handoff", "Conducted 50+ user interviews for payments onboarding"].map((text, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                    <span style={{ width: 3, height: 3, borderRadius: "50%", backgroundColor: purple, marginTop: 2.5, flexShrink: 0 }} />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Figma */}
          <div style={{ display: "flex", gap: 5 }}>
            <div style={{ width: 13, height: 13, borderRadius: "50%", backgroundColor: purple, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 6.5, flexShrink: 0, marginTop: 1 }}>2</div>
            <div style={{ flexGrow: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <div>
                  <span style={{ fontWeight: 700, color: "#111827" }}>UX Designer</span>
                  <p style={{ color: purple, fontWeight: 500 }}>Figma</p>
                </div>
                <span style={{ padding: "1px 4px", borderRadius: 10, fontSize: 5.5, fontWeight: 500, backgroundColor: `${purple}15`, color: purple, whiteSpace: "nowrap", flexShrink: 0 }}>2019 – 2022</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 0.5, marginTop: 1.5 }}>
                {["Designed collaborative features used by 4M+ designers", "Reduced new user drop-off by 28% via A/B testing"].map((text, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                    <span style={{ width: 3, height: 3, borderRadius: "50%", backgroundColor: purple, marginTop: 2.5, flexShrink: 0 }} />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Education */}
        <div style={{ marginBottom: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 2 }}>
            <div style={{ width: 14, height: 14, borderRadius: 3, backgroundColor: `${purple}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7, flexShrink: 0 }}>🎓</div>
            <span style={{ fontSize: 7.5, fontWeight: 700, color: purple }}>Education</span>
          </div>
          <div style={{ padding: "3px 8px", borderRadius: 4, borderLeft: `3px solid ${purple}`, backgroundColor: `${purple}05` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <div>
                <span style={{ fontWeight: 700, color: "#111827" }}>MS Human-Computer Interaction</span>
                <p style={{ color: purple, fontWeight: 500 }}>Stanford University</p>
              </div>
              <span style={{ padding: "1px 4px", borderRadius: 10, fontSize: 5.5, fontWeight: 500, backgroundColor: `${purple}15`, color: purple, whiteSpace: "nowrap", flexShrink: 0 }}>2017 – 2019</span>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div style={{ marginBottom: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 2 }}>
            <div style={{ width: 14, height: 14, borderRadius: 3, backgroundColor: `${purple}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7, flexShrink: 0 }}>⚡</div>
            <span style={{ fontSize: 7.5, fontWeight: 700, color: purple }}>Skills</span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 2.5 }}>
            {["Figma", "Sketch", "Adobe XD", "User Interviews", "A/B Testing", "Journey Mapping", "HTML/CSS", "React", "Design Systems"].map((skill, i) => (
              <span key={i} style={{ padding: "1.5px 5px", borderRadius: 10, fontSize: 6, fontWeight: 500, backgroundColor: purple, color: "white" }}>{skill}</span>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 2 }}>
            <div style={{ width: 14, height: 14, borderRadius: 3, backgroundColor: `${purple}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7, flexShrink: 0 }}>🏆</div>
            <span style={{ fontSize: 7.5, fontWeight: 700, color: purple }}>Certifications</span>
          </div>
          <p>Google UX Design Professional Certificate — Google, 2023</p>
        </div>
      </div>
    </div>
  );
}
