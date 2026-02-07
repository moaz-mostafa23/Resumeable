"use client";

import {
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
 * Static Modern Minimal preview for gallery — no store dependency.
 * Mirrors the real ModernMinimalPreview layout: accent color left borders,
 * icon-style contact row, skill chips.
 */
export function StaticModernMinimal() {
  const theme = getMockTheme("modern-minimal");
  const sd = mockSectionData;

  const sectionTitleStyle: React.CSSProperties = {
    color: theme.primaryColor,
    borderLeft: `4px solid ${theme.primaryColor}`,
    paddingLeft: 12,
    marginBottom: theme.sectionSpacing / 2,
    marginTop: theme.sectionSpacing,
    fontSize: theme.fontSize + 3,
    fontWeight: 600,
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

  const Dot = () => (
    <span
      style={{
        width: 6,
        height: 6,
        borderRadius: "50%",
        backgroundColor: theme.primaryColor,
        display: "inline-block",
        flexShrink: 0,
        marginTop: 7,
      }}
    />
  );

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
      <div style={{ textAlign: "center", marginBottom: 20 }}>
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
        <p style={{ fontSize: theme.titleFontSize, color: "#4b5563", marginBottom: 10 }}>
          {header.title}
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "4px 16px",
            color: "#4b5563",
            fontSize: theme.fontSize - 1,
          }}
        >
          {contactItems.map((item, i) => (
            <span key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  backgroundColor: `${theme.primaryColor}20`,
                  display: "inline-block",
                }}
              />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div>
        <h2 style={sectionTitleStyle}>Professional Summary</h2>
        <p style={{ color: "#374151", lineHeight: 1.6 }}>{summary.content}</p>
      </div>

      {/* Experience */}
      <div>
        <h2 style={sectionTitleStyle}>Work Experience</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
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
                  <h3 style={{ fontWeight: 600, color: "#111827" }}>{item.title}</h3>
                  <p style={{ color: "#4b5563" }}>
                    {item.company} • {item.location}
                  </p>
                </div>
                <span
                  style={{
                    fontSize: theme.fontSize - 1,
                    fontWeight: 500,
                    padding: "2px 8px",
                    borderRadius: 4,
                    backgroundColor: `${theme.primaryColor}15`,
                    color: theme.primaryColor,
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.startDate} - {item.current ? "Present" : item.endDate}
                </span>
              </div>
              <ul
                style={{
                  marginTop: 6,
                  color: "#374151",
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                {item.bullets.map((b) => (
                  <li
                    key={b.id}
                    style={{ display: "flex", alignItems: "flex-start", gap: 8 }}
                  >
                    <Dot />
                    {b.content}
                  </li>
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
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div>
                <h3 style={{ fontWeight: 600, color: "#111827" }}>
                  {item.degree} in {item.field}
                </h3>
                <p style={{ color: "#4b5563" }}>
                  {item.institution} • {item.location}
                </p>
              </div>
              <span
                style={{
                  fontSize: theme.fontSize - 1,
                  fontWeight: 500,
                  padding: "2px 8px",
                  borderRadius: 4,
                  backgroundColor: `${theme.primaryColor}15`,
                  color: theme.primaryColor,
                  whiteSpace: "nowrap",
                }}
              >
                {item.startDate} - {item.endDate}
              </span>
            </div>
            {item.gpa && (
              <p style={{ color: "#4b5563", fontSize: theme.fontSize - 1, marginTop: 4 }}>
                GPA: {item.gpa}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Skills */}
      <div>
        <h2 style={sectionTitleStyle}>Skills</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {skills.categories.map((cat) => (
            <div key={cat.id}>
              <span style={{ fontWeight: 500, color: "#111827" }}>{cat.name}</span>
              <div
                style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 5 }}
              >
                {cat.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    style={{
                      padding: "3px 10px",
                      fontSize: theme.fontSize - 1,
                      borderRadius: 6,
                      backgroundColor: `${theme.primaryColor}10`,
                      color: theme.primaryColor,
                      border: `1px solid ${theme.primaryColor}30`,
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
      <div>
        <h2 style={sectionTitleStyle}>Certifications</h2>
        {certifications.items.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
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
