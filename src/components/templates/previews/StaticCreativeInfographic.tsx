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
 * Static Creative Infographic preview for gallery — no store dependency.
 * Mirrors the real CreativeInfographicPreview: bold header banner,
 * numbered experience, rounded skill chips, icon boxes.
 */
export function StaticCreativeInfographic() {
  const theme = getMockTheme("creative-infographic");
  const sd = mockSectionData;

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

  const sectionTitleStyle: React.CSSProperties = {
    color: theme.primaryColor,
    fontSize: theme.fontSize + 2,
    fontWeight: 700,
    marginBottom: theme.sectionSpacing / 2,
    marginTop: theme.sectionSpacing,
    display: "flex",
    alignItems: "center",
    gap: 10,
  };

  const iconBox: React.CSSProperties = {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: `${theme.primaryColor}15`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    fontSize: 14,
    color: theme.primaryColor,
    fontWeight: 700,
  };

  return (
    <div
      style={{
        width: 612,
        height: 792,
        fontFamily: theme.fontFamily,
        fontSize: theme.fontSize,
        lineHeight: theme.lineHeight,
        backgroundColor: "white",
        overflow: "hidden",
      }}
    >
      {/* Header Banner */}
      <div
        style={{
          backgroundColor: theme.primaryColor,
          padding: `${theme.marginVertical}px ${theme.marginHorizontal}px`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 200,
            height: 200,
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.1)",
            transform: "translate(30%, -30%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: 150,
            height: 150,
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.1)",
            transform: "translate(-30%, 30%)",
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <h1
            style={{
              fontSize: theme.nameFontSize + 4,
              color: "white",
              fontWeight: 700,
              marginBottom: 6,
            }}
          >
            {header.fullName}
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.9)",
              fontSize: theme.titleFontSize + 2,
              fontWeight: 500,
              marginBottom: 14,
            }}
          >
            {header.title}
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "6px 18px",
              color: "rgba(255,255,255,0.9)",
              fontSize: theme.fontSize,
            }}
          >
            {contactItems.map((item, i) => (
              <span key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    backgroundColor: "rgba(255,255,255,0.2)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    flexShrink: 0,
                  }}
                >
                  ✉
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
          backgroundColor: `${theme.primaryColor}08`,
          padding: theme.marginHorizontal / 2,
          margin: `${theme.marginVertical / 2}px ${theme.marginHorizontal}px`,
          borderRadius: 12,
          borderLeft: `4px solid ${theme.primaryColor}`,
        }}
      >
        <p style={{ color: "#374151", lineHeight: 1.6 }}>{summary.content}</p>
      </div>

      {/* Experience */}
      <div style={{ padding: `0 ${theme.marginHorizontal}px` }}>
        <div style={sectionTitleStyle}>
          <div style={iconBox}>💼</div>
          Work Experience
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {experience.items.map((item, index) => (
            <div key={item.id} style={{ display: "flex", gap: 12 }}>
              {/* Number circle */}
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  backgroundColor: theme.primaryColor,
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: 13,
                  flexShrink: 0,
                }}
              >
                {index + 1}
              </div>
              <div style={{ flexGrow: 1 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <div>
                    <h3 style={{ fontWeight: 700, color: "#111827" }}>{item.title}</h3>
                    <p style={{ color: theme.primaryColor, fontWeight: 500 }}>
                      {item.company}
                    </p>
                    <p style={{ color: "#6b7280", fontSize: theme.fontSize - 1 }}>
                      {item.location}
                    </p>
                  </div>
                  <span
                    style={{
                      padding: "3px 10px",
                      borderRadius: 20,
                      fontSize: theme.fontSize - 1,
                      fontWeight: 500,
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
                    marginTop: 8,
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
                      <span
                        style={{
                          width: 7,
                          height: 7,
                          borderRadius: "50%",
                          backgroundColor: theme.primaryColor,
                          marginTop: 6,
                          flexShrink: 0,
                        }}
                      />
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
      <div style={{ padding: `0 ${theme.marginHorizontal}px` }}>
        <div style={sectionTitleStyle}>
          <div style={iconBox}>🎓</div>
          Education
        </div>
        {education.items.map((item) => (
          <div
            key={item.id}
            style={{
              padding: 12,
              borderRadius: 8,
              borderLeft: `4px solid ${theme.primaryColor}`,
              backgroundColor: `${theme.primaryColor}05`,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div>
                <h3 style={{ fontWeight: 700, color: "#111827" }}>
                  {item.degree} in {item.field}
                </h3>
                <p style={{ color: theme.primaryColor, fontWeight: 500 }}>
                  {item.institution}
                </p>
                <p style={{ color: "#6b7280", fontSize: theme.fontSize - 1 }}>
                  {item.location}
                </p>
              </div>
              <span
                style={{
                  padding: "3px 10px",
                  borderRadius: 20,
                  fontSize: theme.fontSize - 1,
                  fontWeight: 500,
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
      <div style={{ padding: `0 ${theme.marginHorizontal}px` }}>
        <div style={sectionTitleStyle}>
          <div style={iconBox}>⚡</div>
          Skills
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {skills.categories.map((cat) => (
            <div key={cat.id}>
              <h4
                style={{
                  fontWeight: 600,
                  color: theme.primaryColor,
                  marginBottom: 6,
                }}
              >
                {cat.name}
              </h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {cat.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    style={{
                      padding: "4px 12px",
                      borderRadius: 20,
                      fontSize: theme.fontSize - 1,
                      fontWeight: 500,
                      backgroundColor: theme.primaryColor,
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
      <div style={{ padding: `0 ${theme.marginHorizontal}px` }}>
        <div style={sectionTitleStyle}>
          <div style={iconBox}>🏅</div>
          Certifications
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {certifications.items.map((item) => (
            <div
              key={item.id}
              style={{
                padding: "6px 14px",
                borderRadius: 8,
                backgroundColor: `${theme.primaryColor}10`,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span style={{ fontSize: 14 }}>🏅</span>
              <div>
                <span style={{ fontWeight: 500 }}>{item.name}</span>
                <span
                  style={{
                    color: "#6b7280",
                    fontSize: theme.fontSize - 1,
                    marginLeft: 8,
                  }}
                >
                  {item.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
