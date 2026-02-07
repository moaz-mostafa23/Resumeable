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
 * Static Corporate Timeline preview for gallery — no store dependency.
 * Mirrors the real CorporateTimelinePreview: date-rail, timeline dots,
 * section divider lines.
 */
export function StaticCorporateTimeline() {
  const theme = getMockTheme("corporate-timeline");
  const sd = mockSectionData;

  const header = sd.header as HeaderData;
  const summary = sd.summary as SummaryData;
  const experience = sd.experience as ExperienceData;
  const education = sd.education as EducationData;
  const skills = sd.skills as SkillsData;
  const certifications = sd.certifications as CertificationsData;

  const contactItems = [header.email, header.phone, header.location].filter(Boolean);
  const linkItems = [header.linkedin, header.website].filter(Boolean);

  const sectionTitleStyle: React.CSSProperties = {
    color: theme.primaryColor,
    fontSize: theme.fontSize + 3,
    fontWeight: 700,
    marginBottom: theme.sectionSpacing / 2,
    marginTop: theme.sectionSpacing,
    textTransform: "uppercase",
    letterSpacing: 2,
    display: "flex",
    alignItems: "center",
    gap: 12,
  };

  const dateColWidth = 100;

  const Divider = () => (
    <div
      style={{
        flexGrow: 1,
        height: 2,
        backgroundColor: `${theme.primaryColor}30`,
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
      <div
        style={{
          marginBottom: 20,
          paddingBottom: 14,
          borderBottom: `3px solid ${theme.primaryColor}`,
        }}
      >
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
        <p
          style={{
            color: "#4b5563",
            fontSize: theme.titleFontSize,
            fontWeight: 500,
            marginBottom: 10,
          }}
        >
          {header.title}
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "4px 20px",
            color: "#4b5563",
            fontSize: theme.fontSize - 1,
          }}
        >
          {contactItems.length > 0 && <span>{contactItems.join(" • ")}</span>}
          {linkItems.length > 0 && <span>{linkItems.join(" • ")}</span>}
        </div>
      </div>

      {/* Summary */}
      <div>
        <div style={sectionTitleStyle}>
          <span>Professional Summary</span>
          <Divider />
        </div>
        <p style={{ color: "#374151", fontStyle: "italic" }}>{summary.content}</p>
      </div>

      {/* Experience */}
      <div>
        <div style={sectionTitleStyle}>
          <span>Work Experience</span>
          <Divider />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {experience.items.map((item) => (
            <div key={item.id} style={{ display: "flex" }}>
              {/* Date column */}
              <div
                style={{
                  width: dateColWidth,
                  flexShrink: 0,
                  textAlign: "right",
                  paddingRight: 18,
                }}
              >
                <p
                  style={{
                    fontWeight: 600,
                    fontSize: theme.fontSize - 1,
                    color: theme.primaryColor,
                  }}
                >
                  {item.startDate}
                </p>
                <p style={{ color: "#6b7280", fontSize: theme.fontSize - 1 }}>
                  {item.current ? "Present" : item.endDate}
                </p>
              </div>
              {/* Timeline dot + line */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginRight: 18,
                }}
              >
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    border: `2px solid ${theme.primaryColor}`,
                    backgroundColor: "white",
                    flexShrink: 0,
                  }}
                />
                <div
                  style={{
                    width: 2,
                    flexGrow: 1,
                    backgroundColor: `${theme.primaryColor}30`,
                  }}
                />
              </div>
              {/* Content */}
              <div style={{ flexGrow: 1, paddingBottom: 4 }}>
                <h3 style={{ fontWeight: 700, color: "#111827" }}>{item.title}</h3>
                <p style={{ color: "#4b5563", fontWeight: 500 }}>
                  {item.company}
                  <span style={{ color: "#9ca3af", fontWeight: 400 }}>
                    {" "}
                    — {item.location}
                  </span>
                </p>
                <ul
                  style={{
                    marginTop: 6,
                    color: "#374151",
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                  }}
                >
                  {item.bullets.map((b) => (
                    <li
                      key={b.id}
                      style={{ display: "flex", alignItems: "flex-start", gap: 6 }}
                    >
                      <span style={{ color: "#9ca3af", marginTop: 1 }}>›</span>
                      {b.content}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div>
        <div style={sectionTitleStyle}>
          <span>Education</span>
          <Divider />
        </div>
        {education.items.map((item) => (
          <div key={item.id} style={{ display: "flex" }}>
            <div
              style={{
                width: dateColWidth,
                flexShrink: 0,
                textAlign: "right",
                paddingRight: 18,
              }}
            >
              <p
                style={{
                  fontWeight: 600,
                  fontSize: theme.fontSize - 1,
                  color: theme.primaryColor,
                }}
              >
                {item.startDate}
              </p>
              <p style={{ color: "#6b7280", fontSize: theme.fontSize - 1 }}>{item.endDate}</p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginRight: 18,
              }}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  border: `2px solid ${theme.primaryColor}`,
                  backgroundColor: "white",
                  flexShrink: 0,
                }}
              />
              <div
                style={{
                  width: 2,
                  flexGrow: 1,
                  backgroundColor: `${theme.primaryColor}30`,
                }}
              />
            </div>
            <div style={{ flexGrow: 1 }}>
              <h3 style={{ fontWeight: 700, color: "#111827" }}>
                {item.degree} in {item.field}
              </h3>
              <p style={{ color: "#4b5563" }}>
                {item.institution}, {item.location}
              </p>
              {item.gpa && (
                <p style={{ color: "#4b5563", fontSize: theme.fontSize - 1, marginTop: 3 }}>
                  GPA: {item.gpa}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div>
        <div style={sectionTitleStyle}>
          <span>Skills</span>
          <Divider />
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
          }}
        >
          {skills.categories.map((cat) => (
            <div key={cat.id}>
              <h4 style={{ fontWeight: 600, color: "#111827", marginBottom: 3 }}>
                {cat.name}
              </h4>
              <p style={{ color: "#374151" }}>{cat.skills.join(", ")}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div>
        <div style={sectionTitleStyle}>
          <span>Certifications</span>
          <Divider />
        </div>
        {certifications.items.map((item) => (
          <div
            key={item.id}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <span>
              <span style={{ fontWeight: 500 }}>{item.name}</span>
              {item.issuer && (
                <span style={{ color: "#4b5563", fontSize: theme.fontSize - 1 }}>
                  {" "}
                  — {item.issuer}
                </span>
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
