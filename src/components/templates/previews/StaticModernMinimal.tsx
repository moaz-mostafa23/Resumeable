"use client";

/**
 * Static Modern Minimal preview — thumbnail-optimized.
 * Renders directly at card size with readable micro-typography.
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
        fontSize: 7,
        lineHeight: 1.25,
        backgroundColor: "white",
        overflow: "hidden",
        color: "#374151",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 8 }}>
        <h1
          style={{
            fontSize: 13,
            color: accent,
            fontWeight: 700,
            marginBottom: 2,
          }}
        >
          Sarah Chen
        </h1>
        <p style={{ fontSize: 9, color: "#4b5563", marginBottom: 5 }}>
          Senior UX Designer
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "2px 8px",
            color: "#4b5563",
            fontSize: 6.5,
          }}
        >
          {["sarah.chen@email.com", "(415) 555-0142", "San Francisco, CA"].map(
            (item, i) => (
              <span
                key={i}
                style={{ display: "flex", alignItems: "center", gap: 3 }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: `${accent}20`,
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                />
                {item}
              </span>
            ),
          )}
        </div>
      </div>

      {/* Summary */}
      <div style={{ marginBottom: 6 }}>
        <h2
          style={{
            fontSize: 8.5,
            fontWeight: 600,
            color: accent,
            borderLeft: `3px solid ${accent}`,
            paddingLeft: 6,
            marginBottom: 3,
          }}
        >
          Professional Summary
        </h2>
        <p>
          Award-winning UX designer with 6+ years of experience crafting
          intuitive digital experiences for enterprise SaaS products.
        </p>
      </div>

      {/* Experience */}
      <div style={{ marginBottom: 6 }}>
        <h2
          style={{
            fontSize: 8.5,
            fontWeight: 600,
            color: accent,
            borderLeft: `3px solid ${accent}`,
            paddingLeft: 6,
            marginBottom: 3,
          }}
        >
          Work Experience
        </h2>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <div>
              <span style={{ fontWeight: 600, color: "#111827" }}>
                Senior UX Designer
              </span>
            </div>
            <span
              style={{
                fontSize: 6,
                fontWeight: 500,
                padding: "1px 5px",
                borderRadius: 3,
                backgroundColor: `${accent}15`,
                color: accent,
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              Mar 2022 – Present
            </span>
          </div>
          <p style={{ color: "#4b5563", marginBottom: 2 }}>
            Stripe • San Francisco, CA
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {[
              "Led redesign of merchant dashboard, increasing task completion by 34%",
              "Built component library of 120+ reusable patterns, reducing handoff time by 40%",
            ].map((text, i) => (
              <div
                key={i}
                style={{ display: "flex", alignItems: "flex-start", gap: 4 }}
              >
                <span
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    backgroundColor: accent,
                    display: "inline-block",
                    flexShrink: 0,
                    marginTop: 3,
                  }}
                />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Education */}
      <div style={{ marginBottom: 6 }}>
        <h2
          style={{
            fontSize: 8.5,
            fontWeight: 600,
            color: accent,
            borderLeft: `3px solid ${accent}`,
            paddingLeft: 6,
            marginBottom: 3,
          }}
        >
          Education
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <div>
            <span style={{ fontWeight: 600, color: "#111827" }}>
              MS Human-Computer Interaction
            </span>
            <p style={{ color: "#4b5563" }}>Stanford University</p>
          </div>
          <span
            style={{
              fontSize: 6,
              fontWeight: 500,
              padding: "1px 5px",
              borderRadius: 3,
              backgroundColor: `${accent}15`,
              color: accent,
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            2017 – 2019
          </span>
        </div>
      </div>

      {/* Skills */}
      <div>
        <h2
          style={{
            fontSize: 8.5,
            fontWeight: 600,
            color: accent,
            borderLeft: `3px solid ${accent}`,
            paddingLeft: 6,
            marginBottom: 3,
          }}
        >
          Skills
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
          {[
            "Figma",
            "Sketch",
            "Adobe XD",
            "User Interviews",
            "A/B Testing",
            "HTML/CSS",
            "React",
            "Design Systems",
          ].map((skill, i) => (
            <span
              key={i}
              style={{
                padding: "1.5px 5px",
                fontSize: 6.5,
                borderRadius: 4,
                backgroundColor: `${accent}10`,
                color: accent,
                border: `0.5px solid ${accent}30`,
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
