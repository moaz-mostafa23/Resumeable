"use client";

/**
 * Static ATS Minimal preview — thumbnail-optimized.
 * Renders directly at card size (~280×360px) with readable micro-typography.
 * Single column, black text, minimal. Section titles with bottom border.
 */
export function StaticATSMinimal() {
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
        <h1
          style={{
            fontSize: 12,
            color: "#1a1a1a",
            fontWeight: 700,
            marginBottom: 1,
            letterSpacing: 0.3,
          }}
        >
          Sarah Chen
        </h1>
        <p style={{ fontSize: 8, color: "#4b5563", marginBottom: 3 }}>
          Senior UX Designer
        </p>
        <p style={{ fontSize: 6, color: "#6b7280" }}>
          sarah.chen@email.com · (415) 555-0142 · San Francisco, CA
        </p>
      </div>

      {/* Summary */}
      <div style={{ marginBottom: 5 }}>
        <h2
          style={{
            fontSize: 7,
            fontWeight: 600,
            color: "#1a1a1a",
            textTransform: "uppercase",
            letterSpacing: 0.8,
            borderBottom: "1.5px solid #1a1a1a",
            paddingBottom: 2,
            marginBottom: 3,
          }}
        >
          Professional Summary
        </h2>
        <p>
          Award-winning UX designer with 6+ years of experience crafting
          intuitive digital experiences for enterprise SaaS and consumer
          products.
        </p>
      </div>

      {/* Experience */}
      <div style={{ marginBottom: 5 }}>
        <h2
          style={{
            fontSize: 7,
            fontWeight: 600,
            color: "#1a1a1a",
            textTransform: "uppercase",
            letterSpacing: 0.8,
            borderBottom: "1.5px solid #1a1a1a",
            paddingBottom: 2,
            marginBottom: 3,
          }}
        >
          Work Experience
        </h2>
        {/* Stripe */}
        <div style={{ marginBottom: 4 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ fontWeight: 600, color: "#111827" }}>Senior UX Designer</span>
            <span style={{ color: "#6b7280", fontSize: 6, flexShrink: 0 }}>Mar 2022 – Present</span>
          </div>
          <p style={{ color: "#4b5563", marginBottom: 1.5 }}>Stripe · San Francisco, CA</p>
          <ul style={{ listStyleType: "disc", paddingLeft: 10, display: "flex", flexDirection: "column", gap: 0.5 }}>
            <li>Led redesign of merchant dashboard, increasing task completion by 34% across 2M+ users</li>
            <li>Built component library of 120+ patterns, reducing handoff time by 40%</li>
            <li>Conducted 50+ user interviews and usability tests for payments onboarding</li>
          </ul>
        </div>
        {/* Figma */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ fontWeight: 600, color: "#111827" }}>UX Designer</span>
            <span style={{ color: "#6b7280", fontSize: 6, flexShrink: 0 }}>Jun 2019 – Feb 2022</span>
          </div>
          <p style={{ color: "#4b5563", marginBottom: 1.5 }}>Figma · San Francisco, CA</p>
          <ul style={{ listStyleType: "disc", paddingLeft: 10, display: "flex", flexDirection: "column", gap: 0.5 }}>
            <li>Designed collaborative features used by 4M+ designers</li>
            <li>Reduced new user drop-off by 28% through iterative onboarding redesign</li>
          </ul>
        </div>
      </div>

      {/* Education */}
      <div style={{ marginBottom: 5 }}>
        <h2
          style={{
            fontSize: 7,
            fontWeight: 600,
            color: "#1a1a1a",
            textTransform: "uppercase",
            letterSpacing: 0.8,
            borderBottom: "1.5px solid #1a1a1a",
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

      {/* Skills */}
      <div style={{ marginBottom: 4 }}>
        <h2
          style={{
            fontSize: 7,
            fontWeight: 600,
            color: "#1a1a1a",
            textTransform: "uppercase",
            letterSpacing: 0.8,
            borderBottom: "1.5px solid #1a1a1a",
            paddingBottom: 2,
            marginBottom: 3,
          }}
        >
          Skills
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          <div><span style={{ fontWeight: 600 }}>Design Tools: </span><span>Figma, Sketch, Adobe XD, Framer</span></div>
          <div><span style={{ fontWeight: 600 }}>Research: </span><span>User Interviews, A/B Testing, Journey Mapping</span></div>
          <div><span style={{ fontWeight: 600 }}>Technical: </span><span>HTML/CSS, React Prototyping, Design Systems</span></div>
        </div>
      </div>

      {/* Certifications */}
      <div>
        <h2
          style={{
            fontSize: 7,
            fontWeight: 600,
            color: "#1a1a1a",
            textTransform: "uppercase",
            letterSpacing: 0.8,
            borderBottom: "1.5px solid #1a1a1a",
            paddingBottom: 2,
            marginBottom: 3,
          }}
        >
          Certifications
        </h2>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Google UX Design Professional Certificate — Google</span>
          <span style={{ color: "#6b7280", fontSize: 6 }}>2023</span>
        </div>
      </div>
    </div>
  );
}
