"use client";

/**
 * Static Elegant Photo preview — thumbnail-optimized.
 * Two-column: dark sidebar with photo placeholder + main content area.
 * Slate accent (#334155).
 */
export function StaticElegantPhoto() {
  const slate = "#334155";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: 6.5,
        lineHeight: 1.2,
        backgroundColor: "white",
        overflow: "hidden",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: "35%",
          backgroundColor: slate,
          padding: "12px 9px",
          flexShrink: 0,
          overflow: "hidden",
          color: "rgba(255,255,255,0.9)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Photo placeholder */}
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            fontWeight: 700,
            color: "rgba(255,255,255,0.6)",
            marginBottom: 6,
            flexShrink: 0,
          }}
        >
          SC
        </div>

        {/* Name */}
        <h1
          style={{
            fontSize: 10,
            color: "white",
            fontWeight: 700,
            marginBottom: 1,
            lineHeight: 1.2,
            textAlign: "center",
          }}
        >
          Sarah Chen
        </h1>
        <p
          style={{
            fontSize: 7,
            color: "rgba(255,255,255,0.75)",
            marginBottom: 8,
            textAlign: "center",
          }}
        >
          Senior UX Designer
        </p>

        {/* Contact */}
        <div style={{ marginBottom: 8, width: "100%" }}>
          <h3
            style={{
              fontSize: 7,
              fontWeight: 600,
              color: "white",
              borderBottom: "1px solid rgba(255,255,255,0.3)",
              paddingBottom: 2,
              marginBottom: 3,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            Contact
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 2, fontSize: 6 }}>
            {["sarah.chen@email.com", "(415) 555-0142", "San Francisco, CA", "linkedin.com/in/sarahchen"].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 3 }}>
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    backgroundColor: "rgba(255,255,255,0.2)",
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                />
                <span style={{ wordBreak: "break-all" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div style={{ width: "100%", marginBottom: 8 }}>
          <h3
            style={{
              fontSize: 7,
              fontWeight: 600,
              color: "white",
              borderBottom: "1px solid rgba(255,255,255,0.3)",
              paddingBottom: 2,
              marginBottom: 3,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            Skills
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 6 }}>
            {[
              { label: "Design", items: ["Figma", "Sketch", "Adobe XD", "Framer"] },
              { label: "Research", items: ["User Interviews", "A/B Testing", "Journey Mapping"] },
              { label: "Technical", items: ["HTML/CSS", "React", "Design Systems"] },
            ].map((cat, ci) => (
              <div key={ci}>
                <p style={{ fontWeight: 500, color: "rgba(255,255,255,0.7)", marginBottom: 1.5 }}>{cat.label}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                  {cat.items.map((s, i) => (
                    <span key={i} style={{ padding: "1px 3px", fontSize: 5.5, borderRadius: 2, backgroundColor: "rgba(255,255,255,0.15)", color: "white" }}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div style={{ width: "100%" }}>
          <h3
            style={{
              fontSize: 7,
              fontWeight: 600,
              color: "white",
              borderBottom: "1px solid rgba(255,255,255,0.3)",
              paddingBottom: 2,
              marginBottom: 3,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            Certifications
          </h3>
          <div style={{ fontSize: 6 }}>
            <p style={{ fontWeight: 500 }}>Google UX Design Certificate</p>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 5.5 }}>Google · 2023</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flexGrow: 1, padding: 12, overflow: "hidden", color: "#374151" }}>
        {/* Summary */}
        <div style={{ marginBottom: 5 }}>
          <h2
            style={{
              fontSize: 7,
              fontWeight: 600,
              color: slate,
              textTransform: "uppercase",
              letterSpacing: 0.8,
              borderBottom: `1.5px solid ${slate}`,
              paddingBottom: 2,
              marginBottom: 3,
            }}
          >
            Summary
          </h2>
          <p>
            Award-winning UX designer with 6+ years crafting intuitive digital
            experiences for enterprise SaaS products.
          </p>
        </div>

        {/* Experience */}
        <div style={{ marginBottom: 5 }}>
          <h2
            style={{
              fontSize: 7,
              fontWeight: 600,
              color: slate,
              textTransform: "uppercase",
              letterSpacing: 0.8,
              borderBottom: `1.5px solid ${slate}`,
              paddingBottom: 2,
              marginBottom: 3,
            }}
          >
            Experience
          </h2>
          {/* Stripe */}
          <div style={{ marginBottom: 4 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontWeight: 600, color: "#111827" }}>Senior UX Designer</span>
              <span style={{ color: "#6b7280", fontSize: 6, flexShrink: 0 }}>2022 – Present</span>
            </div>
            <p style={{ color: "#4b5563", marginBottom: 1.5 }}>Stripe</p>
            <ul style={{ listStyleType: "disc", paddingLeft: 10, display: "flex", flexDirection: "column", gap: 0.5 }}>
              <li>Led dashboard redesign, +34% task completion across 2M+ users</li>
              <li>Built 120+ component library, 40% faster handoff</li>
            </ul>
          </div>
          {/* Figma */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontWeight: 600, color: "#111827" }}>UX Designer</span>
              <span style={{ color: "#6b7280", fontSize: 6, flexShrink: 0 }}>2019 – 2022</span>
            </div>
            <p style={{ color: "#4b5563", marginBottom: 1.5 }}>Figma</p>
            <ul style={{ listStyleType: "disc", paddingLeft: 10, display: "flex", flexDirection: "column", gap: 0.5 }}>
              <li>Designed collaborative features used by 4M+ designers</li>
              <li>Reduced new user drop-off by 28% with A/B testing</li>
            </ul>
          </div>
        </div>

        {/* Education */}
        <div>
          <h2
            style={{
              fontSize: 7,
              fontWeight: 600,
              color: slate,
              textTransform: "uppercase",
              letterSpacing: 0.8,
              borderBottom: `1.5px solid ${slate}`,
              paddingBottom: 2,
              marginBottom: 3,
            }}
          >
            Education
          </h2>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <div>
              <span style={{ fontWeight: 600, color: "#111827" }}>MS Human-Computer Interaction</span>
              <p style={{ color: "#4b5563" }}>Stanford University</p>
            </div>
            <span style={{ color: "#6b7280", fontSize: 6, flexShrink: 0 }}>2017 – 2019</span>
          </div>
        </div>
      </div>
    </div>
  );
}
