"use client";

/**
 * Static Two-Column Sidebar preview — thumbnail-optimized.
 * Renders directly at card size with readable micro-typography.
 * Dark navy sidebar (~33%) with white text for name/contact/skills.
 * White main area for experience/education.
 */
export function StaticTwoColumnSidebar() {
  const navy = "#1e293b";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: 7,
        lineHeight: 1.25,
        backgroundColor: "white",
        overflow: "hidden",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: "33%",
          backgroundColor: navy,
          padding: "14px 10px",
          flexShrink: 0,
          overflow: "hidden",
          color: "rgba(255,255,255,0.9)",
        }}
      >
        {/* Name */}
        <h1
          style={{
            fontSize: 11,
            color: "white",
            fontWeight: 700,
            marginBottom: 2,
            lineHeight: 1.2,
          }}
        >
          Sarah Chen
        </h1>
        <p
          style={{
            fontSize: 7.5,
            color: "rgba(255,255,255,0.75)",
            marginBottom: 10,
          }}
        >
          Senior UX Designer
        </p>

        {/* Contact */}
        <div style={{ marginBottom: 10 }}>
          <h3
            style={{
              fontSize: 7.5,
              fontWeight: 600,
              color: "white",
              borderBottom: "1px solid rgba(255,255,255,0.3)",
              paddingBottom: 2,
              marginBottom: 4,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            Contact
          </h3>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              fontSize: 6.5,
            }}
          >
            {["sarah.chen@email.com", "(415) 555-0142", "San Francisco, CA"].map(
              (item, i) => (
                <div
                  key={i}
                  style={{ display: "flex", alignItems: "center", gap: 4 }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: "rgba(255,255,255,0.2)",
                      display: "inline-block",
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ wordBreak: "break-all" }}>{item}</span>
                </div>
              ),
            )}
          </div>
        </div>

        {/* Skills */}
        <div>
          <h3
            style={{
              fontSize: 7.5,
              fontWeight: 600,
              color: "white",
              borderBottom: "1px solid rgba(255,255,255,0.3)",
              paddingBottom: 2,
              marginBottom: 4,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            Skills
          </h3>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 5,
              fontSize: 6.5,
            }}
          >
            <div>
              <p
                style={{
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.7)",
                  marginBottom: 2,
                }}
              >
                Design Tools
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                {["Figma", "Sketch", "Adobe XD"].map((s, i) => (
                  <span
                    key={i}
                    style={{
                      padding: "1px 4px",
                      fontSize: 6,
                      borderRadius: 2,
                      backgroundColor: "rgba(255,255,255,0.15)",
                      color: "white",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p
                style={{
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.7)",
                  marginBottom: 2,
                }}
              >
                Research
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                {["User Interviews", "A/B Testing"].map((s, i) => (
                  <span
                    key={i}
                    style={{
                      padding: "1px 4px",
                      fontSize: 6,
                      borderRadius: 2,
                      backgroundColor: "rgba(255,255,255,0.15)",
                      color: "white",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p
                style={{
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.7)",
                  marginBottom: 2,
                }}
              >
                Technical
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                {["HTML/CSS", "React", "Design Systems"].map((s, i) => (
                  <span
                    key={i}
                    style={{
                      padding: "1px 4px",
                      fontSize: 6,
                      borderRadius: 2,
                      backgroundColor: "rgba(255,255,255,0.15)",
                      color: "white",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          flexGrow: 1,
          padding: 14,
          overflow: "hidden",
          color: "#374151",
        }}
      >
        {/* Summary */}
        <div style={{ marginBottom: 6 }}>
          <h2
            style={{
              fontSize: 8,
              fontWeight: 600,
              color: navy,
              textTransform: "uppercase",
              letterSpacing: 0.8,
              borderBottom: `1.5px solid ${navy}`,
              paddingBottom: 2,
              marginBottom: 4,
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
        <div style={{ marginBottom: 6 }}>
          <h2
            style={{
              fontSize: 8,
              fontWeight: 600,
              color: navy,
              textTransform: "uppercase",
              letterSpacing: 0.8,
              borderBottom: `1.5px solid ${navy}`,
              paddingBottom: 2,
              marginBottom: 4,
            }}
          >
            Experience
          </h2>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}
            >
              <span style={{ fontWeight: 600, color: "#111827" }}>
                Senior UX Designer
              </span>
              <span style={{ color: "#6b7280", fontSize: 6.5, flexShrink: 0 }}>
                2022 – Present
              </span>
            </div>
            <p style={{ color: "#4b5563", marginBottom: 2 }}>Stripe</p>
            <ul
              style={{
                listStyleType: "disc",
                paddingLeft: 10,
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <li>
                Led dashboard redesign, +34% task completion across 2M+ users
              </li>
              <li>Built 120+ component library, 40% faster handoff</li>
            </ul>
          </div>
        </div>

        {/* Education */}
        <div>
          <h2
            style={{
              fontSize: 8,
              fontWeight: 600,
              color: navy,
              textTransform: "uppercase",
              letterSpacing: 0.8,
              borderBottom: `1.5px solid ${navy}`,
              paddingBottom: 2,
              marginBottom: 4,
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
            <span style={{ color: "#6b7280", fontSize: 6.5, flexShrink: 0 }}>
              2017 – 2019
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
