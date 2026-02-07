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
 * Static ATS Minimal preview for gallery — no store dependency.
 * Mirrors the real ATSMinimalPreview layout exactly.
 */
export function StaticATSMinimal() {
  const theme = getMockTheme("ats-minimal");
  const sections = mockSections.filter((s) => s.visible).sort((a, b) => a.order - b.order);
  const sd = mockSectionData;

  const sectionTitleStyle: React.CSSProperties = {
    color: theme.primaryColor,
    borderBottom: `2px solid ${theme.primaryColor}`,
    paddingBottom: 4,
    marginBottom: theme.sectionSpacing / 2,
    marginTop: theme.sectionSpacing,
    fontSize: theme.fontSize + 2,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: 1,
  };

  const header = sd.header as HeaderData;
  const summary = sd.summary as SummaryData;
  const experience = sd.experience as ExperienceData;
  const education = sd.education as EducationData;
  const skills = sd.skills as SkillsData;
  const projects = sd.projects as ProjectsData;
  const certifications = sd.certifications as CertificationsData;

  const contactItems = [
    header.email,
    header.phone,
    header.location,
    header.linkedin,
    header.website,
  ].filter(Boolean);

  return (
    <div
      style={{
        width: 612,
        height: 792,
        paddingTop: theme.marginVertical,
        paddingBottom: theme.marginVertical,
        paddingLeft: theme.marginHorizontal,
        paddingRight: theme.marginHorizontal,
        fontFamily: theme.fontFamily,
        fontSize: theme.fontSize,
        lineHeight: theme.lineHeight,
        backgroundColor: "white",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 16 }}>
        <h1
          style={{
            fontSize: theme.nameFontSize,
            color: theme.primaryColor,
            fontWeight: 700,
            marginBottom: 4,
          }}
        >
          {header.fullName}
        </h1>
        <p style={{ fontSize: theme.titleFontSize, color: "#4b5563", marginBottom: 8 }}>
          {header.title}
        </p>
        <p style={{ fontSize: theme.fontSize - 1, color: "#4b5563" }}>
          {contactItems.join(" | ")}
        </p>
      </div>

      {/* Summary */}
      <div>
        <h2 style={sectionTitleStyle}>Professional Summary</h2>
        <p style={{ color: "#374151" }}>{summary.content}</p>
      </div>

      {/* Experience */}
      <div>
        <h2 style={sectionTitleStyle}>Work Experience</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {experience.items.map((item) => (
            <div key={item.id}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <h3 style={{ fontWeight: 600 }}>{item.title}</h3>
                  <p style={{ color: "#4b5563" }}>
                    {item.company} | {item.location}
                  </p>
                </div>
                <p style={{ color: "#6b7280", fontSize: theme.fontSize - 1 }}>
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
        <h2 style={sectionTitleStyle}>Education</h2>
        {education.items.map((item) => (
          <div key={item.id}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <h3 style={{ fontWeight: 600 }}>
                  {item.degree} in {item.field}
                </h3>
                <p style={{ color: "#4b5563" }}>
                  {item.institution} | {item.location}
                </p>
              </div>
              <p style={{ color: "#6b7280", fontSize: theme.fontSize - 1 }}>
                {item.startDate} - {item.endDate}
              </p>
            </div>
            {item.gpa && (
              <p style={{ color: "#4b5563", fontSize: theme.fontSize - 1 }}>GPA: {item.gpa}</p>
            )}
          </div>
        ))}
      </div>

      {/* Skills */}
      <div>
        <h2 style={sectionTitleStyle}>Skills</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {skills.categories.map((cat) => (
            <div key={cat.id} style={{ display: "flex" }}>
              <span style={{ fontWeight: 600, minWidth: 150 }}>{cat.name}:</span>
              <span style={{ color: "#374151" }}>{cat.skills.join(", ")}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Projects */}
      <div>
        <h2 style={sectionTitleStyle}>Projects</h2>
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
                {item.technologies.join(", ")}
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

      {/* Certifications */}
      <div>
        <h2 style={sectionTitleStyle}>Certifications</h2>
        {certifications.items.map((item) => (
          <div
            key={item.id}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <span>
              <span style={{ fontWeight: 500 }}>{item.name}</span>
              {item.issuer && (
                <span style={{ color: "#4b5563" }}> — {item.issuer}</span>
              )}
            </span>
            <span style={{ color: "#6b7280", fontSize: theme.fontSize - 1 }}>
              {item.date}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
