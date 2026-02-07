"use client";

import {
  mockSections,
  mockSectionData,
  getMockTheme,
} from "@/data/mock-resume";
import {
  HeaderData,
  SummaryData,
  ExperienceData,
  EducationData,
  SkillsData,
  ProjectsData,
  CertificationsData,
} from "@/types/resume";

/**
 * Static Two-Column Sidebar preview for gallery — no store dependency.
 * Mirrors the real TwoColumnSidebarPreview: dark sidebar with name/contact/skills,
 * white main area with experience/education/projects.
 */
export function StaticTwoColumnSidebar() {
  const theme = getMockTheme("two-column-sidebar");
  const sd = mockSectionData;

  const header = sd.header as HeaderData;
  const summary = sd.summary as SummaryData;
  const experience = sd.experience as ExperienceData;
  const education = sd.education as EducationData;
  const skills = sd.skills as SkillsData;
  const projects = sd.projects as ProjectsData;
  const certifications = sd.certifications as CertificationsData;

  const sidebarSectionTitle: React.CSSProperties = {
    fontSize: theme.fontSize + 1,
    fontWeight: 600,
    marginBottom: 8,
    paddingBottom: 4,
    borderBottom: "1px solid rgba(255,255,255,0.3)",
    color: "white",
  };

  const mainSectionTitle: React.CSSProperties = {
    color: theme.primaryColor,
    fontSize: theme.fontSize + 2,
    fontWeight: 600,
    marginBottom: theme.sectionSpacing / 2,
    marginTop: theme.sectionSpacing,
    borderBottom: `2px solid ${theme.primaryColor}`,
    paddingBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 1,
  };

  return (
    <div
      style={{
        width: 612,
        height: 792,
        display: "flex",
        fontFamily: theme.fontFamily,
        fontSize: theme.fontSize,
        lineHeight: theme.lineHeight,
        backgroundColor: "white",
        overflow: "hidden",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: "35%",
          backgroundColor: theme.primaryColor,
          padding: theme.marginVertical,
          paddingRight: theme.marginHorizontal * 0.6,
          paddingLeft: theme.marginHorizontal * 0.8,
          flexShrink: 0,
          overflow: "hidden",
        }}
      >
        {/* Name & Contact */}
        <div style={{ marginBottom: 20 }}>
          <h1
            style={{
              fontSize: theme.nameFontSize - 4,
              color: "white",
              fontWeight: 700,
              marginBottom: 6,
            }}
          >
            {header.fullName}
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.8)",
              fontSize: theme.titleFontSize - 2,
              marginBottom: 14,
            }}
          >
            {header.title}
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 7,
              color: "rgba(255,255,255,0.9)",
              fontSize: theme.fontSize - 1,
            }}
          >
            {[header.email, header.phone, header.location, header.linkedin, header.website]
              .filter(Boolean)
              .map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span
                    style={{
                      width: 16,
                      height: 16,
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
        <div style={{ marginBottom: 18 }}>
          <h3 style={sidebarSectionTitle}>Skills</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {skills.categories.map((cat) => (
              <div key={cat.id}>
                <p
                  style={{
                    color: "rgba(255,255,255,0.8)",
                    fontWeight: 500,
                    fontSize: theme.fontSize - 1,
                    marginBottom: 4,
                  }}
                >
                  {cat.name}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {cat.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      style={{
                        padding: "2px 8px",
                        fontSize: theme.fontSize - 2,
                        borderRadius: 4,
                        backgroundColor: "rgba(255,255,255,0.2)",
                        color: "white",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div style={{ marginBottom: 18 }}>
          <h3 style={sidebarSectionTitle}>Certifications</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: theme.fontSize - 1 }}>
            {certifications.items.map((item) => (
              <div key={item.id} style={{ color: "rgba(255,255,255,0.9)" }}>
                <p style={{ fontWeight: 500 }}>{item.name}</p>
                {item.issuer && (
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: theme.fontSize - 2 }}>
                    {item.issuer}
                  </p>
                )}
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: theme.fontSize - 2 }}>
                  {item.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          flexGrow: 1,
          padding: theme.marginVertical,
          paddingLeft: theme.marginHorizontal * 0.8,
          paddingRight: theme.marginHorizontal,
          overflow: "hidden",
        }}
      >
        {/* Summary */}
        <div>
          <h2 style={{ ...mainSectionTitle, marginTop: 0 }}>Professional Summary</h2>
          <p style={{ color: "#374151" }}>{summary.content}</p>
        </div>

        {/* Experience */}
        <div>
          <h2 style={mainSectionTitle}>Work Experience</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {experience.items.map((item) => (
              <div key={item.id}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <div>
                    <h3 style={{ fontWeight: 600 }}>{item.title}</h3>
                    <p style={{ color: "#4b5563" }}>
                      {item.company} | {item.location}
                    </p>
                  </div>
                  <p
                    style={{
                      color: "#6b7280",
                      fontSize: theme.fontSize - 1,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.startDate} - {item.current ? "Present" : item.endDate}
                  </p>
                </div>
                <ul
                  style={{
                    listStyleType: "disc",
                    listStylePosition: "inside",
                    marginTop: 6,
                    color: "#374151",
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                  }}
                >
                  {item.bullets.map((b) => (
                    <li key={b.id}>{b.content}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <h2 style={mainSectionTitle}>Education</h2>
          {education.items.map((item) => (
            <div key={item.id}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div>
                  <h3 style={{ fontWeight: 600 }}>
                    {item.degree} in {item.field}
                  </h3>
                  <p style={{ color: "#4b5563" }}>
                    {item.institution} | {item.location}
                  </p>
                </div>
                <p
                  style={{
                    color: "#6b7280",
                    fontSize: theme.fontSize - 1,
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.startDate} - {item.endDate}
                </p>
              </div>
              {item.gpa && (
                <p style={{ color: "#4b5563", fontSize: theme.fontSize - 1 }}>
                  GPA: {item.gpa}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Projects */}
        <div>
          <h2 style={mainSectionTitle}>Projects</h2>
          {projects.items.map((item) => (
            <div key={item.id}>
              <h3 style={{ fontWeight: 600 }}>
                {item.name}
                {item.link && (
                  <span style={{ fontWeight: 400, color: "#6b7280", marginLeft: 8 }}>
                    | {item.link}
                  </span>
                )}
              </h3>
              {item.technologies.length > 0 && (
                <p style={{ color: "#4b5563", fontSize: theme.fontSize - 1 }}>
                  {item.technologies.join(" • ")}
                </p>
              )}
              <ul
                style={{
                  listStyleType: "disc",
                  listStylePosition: "inside",
                  marginTop: 6,
                  color: "#374151",
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                }}
              >
                {item.bullets.map((b) => (
                  <li key={b.id}>{b.content}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
