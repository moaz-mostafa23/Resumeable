"use client";

/**
 * Static Creative Infographic preview — thumbnail-optimized.
 * Renders directly at card size with readable micro-typography.
 * Purple (#7c3aed) header banner with name. Rounded skill pills.
 * Icon-style section markers. Most visually distinct template.
 */
export function StaticCreativeInfographic() {
  const purple = "#7c3aed";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: 7,
        lineHeight: 1.25,
        backgroundColor: "white",
        overflow: "hidden",
        color: "#374151",
      }}
    >
      {/* Header Banner */}
      <div
        style={{
          backgroundColor: purple,
          padding: "14px 14px 12px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circle */}
        <div
          style={{
            position: "absolute",
            top: -20,
            right: -20,
            width: 70,
            height: 70,
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -15,
            left: -15,
            width: 50,
            height: 50,
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.08)",
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <h1
            style={{
              fontSize: 14,
              color: "white",
              fontWeight: 700,
              marginBottom: 2,
            }}
          >
            Sarah Chen
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.9)",
              fontSize: 9,
              fontWeight: 500,
              marginBottom: 5,
            }}
          >
            Senior UX Designer
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "2px 10px",
              color: "rgba(255,255,255,0.85)",
              fontSize: 6.5,
            }}
          >
            {[
              "sarah.chen@email.com",
              "(415) 555-0142",
              "San Francisco, CA",
            ].map((item, i) => (
              <span
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                }}
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: "rgba(255,255,255,0.2)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 5,
                    flexShrink: 0,
                  }}
                >
                  ✦
                </span>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Summary callout */}
      <div
        style={{
          backgroundColor: `${purple}08`,
          padding: "6px 10px",
          margin: "8px 14px 0",
          borderRadius: 6,
          borderLeft: `3px solid ${purple}`,
        }}
      >
        <p style={{ fontSize: 6.5 }}>
          Award-winning UX designer with 6+ years crafting intuitive digital
          experiences for enterprise SaaS and consumer products.
        </p>
      </div>

      <div style={{ padding: "0 14px" }}>
        {/* Experience */}
        <div style={{ marginTop: 7, marginBottom: 6 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              marginBottom: 4,
            }}
          >
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: 4,
                backgroundColor: `${purple}15`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 8,
                flexShrink: 0,
              }}
            >
              💼
            </div>
            <span
              style={{
                fontSize: 8.5,
                fontWeight: 700,
                color: purple,
              }}
            >
              Experience
            </span>
          </div>

          <div style={{ display: "flex", gap: 6 }}>
            {/* Number circle */}
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                backgroundColor: purple,
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 7,
                flexShrink: 0,
                marginTop: 1,
              }}
            >
              1
            </div>
            <div style={{ flexGrow: 1 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                }}
              >
                <div>
                  <span style={{ fontWeight: 700, color: "#111827" }}>
                    Senior UX Designer
                  </span>
                  <p style={{ color: purple, fontWeight: 500 }}>Stripe</p>
                </div>
                <span
                  style={{
                    padding: "1px 5px",
                    borderRadius: 10,
                    fontSize: 6,
                    fontWeight: 500,
                    backgroundColor: `${purple}15`,
                    color: purple,
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  2022 – Present
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  marginTop: 2,
                }}
              >
                {[
                  "Led dashboard redesign, +34% task completion for 2M+ users",
                  "Built 120+ component library, 40% faster handoff",
                ].map((text, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 3,
                    }}
                  >
                    <span
                      style={{
                        width: 3.5,
                        height: 3.5,
                        borderRadius: "50%",
                        backgroundColor: purple,
                        marginTop: 3,
                        flexShrink: 0,
                      }}
                    />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Education */}
        <div style={{ marginBottom: 6 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              marginBottom: 3,
            }}
          >
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: 4,
                backgroundColor: `${purple}15`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 8,
                flexShrink: 0,
              }}
            >
              🎓
            </div>
            <span
              style={{
                fontSize: 8.5,
                fontWeight: 700,
                color: purple,
              }}
            >
              Education
            </span>
          </div>
          <div
            style={{
              padding: "4px 8px",
              borderRadius: 5,
              borderLeft: `3px solid ${purple}`,
              backgroundColor: `${purple}05`,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}
            >
              <div>
                <span style={{ fontWeight: 700, color: "#111827" }}>
                  MS Human-Computer Interaction
                </span>
                <p style={{ color: purple, fontWeight: 500 }}>
                  Stanford University
                </p>
              </div>
              <span
                style={{
                  padding: "1px 5px",
                  borderRadius: 10,
                  fontSize: 6,
                  fontWeight: 500,
                  backgroundColor: `${purple}15`,
                  color: purple,
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                2017 – 2019
              </span>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              marginBottom: 4,
            }}
          >
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: 4,
                backgroundColor: `${purple}15`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 8,
                flexShrink: 0,
              }}
            >
              ⚡
            </div>
            <span
              style={{
                fontSize: 8.5,
                fontWeight: 700,
                color: purple,
              }}
            >
              Skills
            </span>
          </div>
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
                  padding: "2px 6px",
                  borderRadius: 10,
                  fontSize: 6.5,
                  fontWeight: 500,
                  backgroundColor: purple,
                  color: "white",
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
