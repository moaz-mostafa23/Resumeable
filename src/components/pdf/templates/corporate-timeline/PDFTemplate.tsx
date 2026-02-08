"use client";

import {
  Document,
  Page,
  Text,
  View,
  Link,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Helper to ensure URL has protocol
function ensureProtocol(url: string): string {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  return url;
}

import {
  ResumeDocument,
  HeaderData,
  SummaryData,
  ExperienceData,
  EducationData,
  SkillsData,
  ProjectsData,
  CertificationsData,
  CoursesData,
  LanguagesData,
  AwardsData,
  VolunteerData,
  InterestsData,
  PublicationsData,
  ReferencesData,
  CustomSectionData,
} from "@/types/resume";

// Register fonts
Font.register({
  family: "Inter",
  fonts: [
    { src: "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff", fontWeight: 400 },
    { src: "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hjp-Ek-_EeA.woff", fontWeight: 600 },
    { src: "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hjp-Ek-_EeA.woff", fontWeight: 700 },
  ],
});

interface PDFTemplateProps {
  resume: ResumeDocument;
}

/**
 * Corporate Timeline PDF Template  
 * Professional layout with date rail and timeline dots for experience entries.
 */
export function PDFTemplate({ resume }: PDFTemplateProps) {
  const { sections, sectionData, theme } = resume;
  const visibleSections = sections.filter((s) => s.visible).sort((a, b) => a.order - b.order);

  const styles = StyleSheet.create({
    page: {
      paddingTop: theme.marginVertical,
      paddingBottom: theme.marginVertical,
      paddingLeft: theme.marginHorizontal,
      paddingRight: theme.marginHorizontal,
      fontFamily: "Inter",
      fontSize: theme.fontSize,
      lineHeight: theme.lineHeight,
      color: "#1F2937",
    },
    header: {
      marginBottom: 20,
    },
    name: {
      fontSize: theme.nameFontSize,
      fontWeight: 700,
      color: "#111827",
      marginBottom: 2,
    },
    title: {
      fontSize: theme.titleFontSize,
      color: theme.primaryColor,
      marginBottom: 10,
    },
    contactRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 16,
      fontSize: theme.fontSize - 1,
      color: "#6B7280",
    },
    sectionWrapper: {
      marginTop: theme.sectionSpacing,
    },
    sectionTitleRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: theme.sectionSpacing / 2,
    },
    sectionTitleText: {
      fontSize: theme.fontSize + 1,
      fontWeight: 600,
      color: "#374151",
      textTransform: "uppercase",
      letterSpacing: 1,
      paddingRight: 12,
    },
    sectionTitleLine: {
      flex: 1,
      height: 1,
      backgroundColor: "#D1D5DB",
    },
    timelineItem: {
      flexDirection: "row",
      marginBottom: 14,
    },
    dateColumn: {
      width: 80,
      paddingRight: 12,
      alignItems: "flex-end",
    },
    dateText: {
      fontSize: theme.fontSize - 1,
      color: "#9CA3AF",
      textAlign: "right",
    },
    timelineDotColumn: {
      width: 20,
      alignItems: "center",
    },
    timelineDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.primaryColor,
      marginTop: 4,
    },
    timelineLine: {
      flex: 1,
      width: 2,
      backgroundColor: "#E5E7EB",
      marginTop: 4,
    },
    contentColumn: {
      flex: 1,
      paddingLeft: 8,
    },
    itemTitle: {
      fontWeight: 600,
      fontSize: theme.fontSize,
      color: "#1F2937",
      marginBottom: 2,
    },
    itemSubtitle: {
      color: "#6B7280",
      fontSize: theme.fontSize - 1,
      marginBottom: 4,
    },
    bulletList: {
      marginTop: 4,
      paddingLeft: 12,
    },
    bulletItem: {
      marginBottom: 2,
      color: "#374151",
    },
    skillRow: {
      flexDirection: "row",
      marginBottom: 4,
    },
    skillLabel: {
      fontWeight: 600,
      width: 130,
      color: "#374151",
    },
    skillValue: {
      flex: 1,
      color: "#6B7280",
    },
    summaryText: {
      color: "#4B5563",
      lineHeight: 1.6,
    },
  });

  const renderSectionTitle = (label: string) => (
    <View style={styles.sectionTitleRow}>
      <Text style={styles.sectionTitleText}>{label}</Text>
      <View style={styles.sectionTitleLine} />
    </View>
  );

  const renderHeader = () => {
    const data = sectionData.header as HeaderData;
    return (
      <View style={styles.header}>
        <Text style={styles.name}>{data.fullName}</Text>
        <Text style={styles.title}>{data.title}</Text>
        <View style={styles.contactRow}>
          {data.email && <Text>{data.email}</Text>}
          {data.phone && <Text>{data.phone}</Text>}
          {data.location && <Text>{data.location}</Text>}
          {data.linkedin && (
            <Link src={data.linkedinUrl ? ensureProtocol(data.linkedinUrl) : '#'}>
              {data.linkedin}
            </Link>
          )}
          {data.github && (
            <Link src={data.githubUrl ? ensureProtocol(data.githubUrl) : '#'}>
              {data.github}
            </Link>
          )}
          {data.website && (
            <Link src={data.websiteUrl ? ensureProtocol(data.websiteUrl) : '#'}>
              {data.website}
            </Link>
          )}
        </View>
      </View>
    );
  };

  const renderSummary = (label: string) => {
    const data = sectionData.summary as SummaryData;
    return (
      <View style={styles.sectionWrapper}>
        {renderSectionTitle(label)}
        <Text style={styles.summaryText}>{data.content}</Text>
      </View>
    );
  };

  const renderExperience = (label: string) => {
    const data = sectionData.experience as ExperienceData;
    return (
      <View style={styles.sectionWrapper}>
        {renderSectionTitle(label)}
        {data.items.map((item, index) => (
          <View key={item.id} style={styles.timelineItem}>
            <View style={styles.dateColumn}>
              <Text style={styles.dateText}>{item.startDate}</Text>
              <Text style={styles.dateText}>– {item.current ? "Present" : item.endDate}</Text>
            </View>
            <View style={styles.timelineDotColumn}>
              <View style={styles.timelineDot} />
              {index < data.items.length - 1 && <View style={styles.timelineLine} />}
            </View>
            <View style={styles.contentColumn}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemSubtitle}>{item.company} • {item.location}</Text>
              <View style={styles.bulletList}>
                {item.bullets.map((bullet) => (
                  <Text key={bullet.id} style={styles.bulletItem}>•  {bullet.content}</Text>
                ))}
              </View>
            </View>
          </View>
        ))}
      </View>
    );
  };

  const renderEducation = (label: string) => {
    const data = sectionData.education as EducationData;
    return (
      <View style={styles.sectionWrapper}>
        {renderSectionTitle(label)}
        {data.items.map((item, index) => (
          <View key={item.id} style={styles.timelineItem}>
            <View style={styles.dateColumn}>
              <Text style={styles.dateText}>{item.startDate}</Text>
              <Text style={styles.dateText}>– {item.endDate}</Text>
            </View>
            <View style={styles.timelineDotColumn}>
              <View style={styles.timelineDot} />
              {index < data.items.length - 1 && <View style={styles.timelineLine} />}
            </View>
            <View style={styles.contentColumn}>
              <Text style={styles.itemTitle}>{item.degree} in {item.field}</Text>
              <Text style={styles.itemSubtitle}>{item.institution} • {item.location}</Text>
              {item.gpa && <Text style={{ fontSize: theme.fontSize - 1, marginTop: 2 }}>GPA: {item.gpa}</Text>}
              {item.details && <Text style={{ marginTop: 4, color: "#4B5563" }}>{item.details}</Text>}
            </View>
          </View>
        ))}
      </View>
    );
  };

  const renderSkills = (label: string) => {
    const data = sectionData.skills as SkillsData;
    return (
      <View style={styles.sectionWrapper}>
        {renderSectionTitle(label)}
        {data.categories.map((category) => (
          <View key={category.id} style={styles.skillRow}>
            <Text style={styles.skillLabel}>{category.name}:</Text>
            <Text style={styles.skillValue}>{category.skills.join(", ")}</Text>
          </View>
        ))}
      </View>
    );
  };

  const renderProjects = (label: string) => {
    const data = sectionData.projects as ProjectsData;
    return (
      <View style={styles.sectionWrapper}>
        {renderSectionTitle(label)}
        {data.items.map((item) => (
          <View key={item.id} style={{ marginBottom: 12 }}>
            <Text style={styles.itemTitle}>
              {item.name}
              {item.link && <Text style={{ fontWeight: 400, color: theme.primaryColor }}> ({item.link})</Text>}
            </Text>
            {item.technologies.length > 0 && (
              <Text style={{ fontSize: theme.fontSize - 1, color: "#6B7280", marginBottom: 4 }}>
                {item.technologies.join(", ")}
              </Text>
            )}
            <View style={styles.bulletList}>
              {item.bullets.map((bullet) => (
                <Text key={bullet.id} style={styles.bulletItem}>•  {bullet.content}</Text>
              ))}
            </View>
          </View>
        ))}
      </View>
    );
  };

  const renderCertifications = (label: string) => {
    const data = sectionData.certifications as CertificationsData;
    return (
      <View style={styles.sectionWrapper}>
        {renderSectionTitle(label)}
        {data.items.map((item, index) => (
          <View key={item.id} style={styles.timelineItem}>
            <View style={styles.dateColumn}>
              <Text style={styles.dateText}>{item.date}</Text>
            </View>
            <View style={styles.timelineDotColumn}>
              <View style={styles.timelineDot} />
              {index < data.items.length - 1 && <View style={styles.timelineLine} />}
            </View>
            <View style={styles.contentColumn}>
              <Text style={styles.itemTitle}>{item.name}</Text>
              {item.issuer && <Text style={styles.itemSubtitle}>{item.issuer}</Text>}
            </View>
          </View>
        ))}
      </View>
    );
  };

  const renderCourses = (label: string) => {
    const data = sectionData.courses as CoursesData;
    if (!data) return null;
    return (
      <View style={styles.sectionWrapper}>
        {renderSectionTitle(label)}
        {data.items.map((item) => (
          <View key={item.id} style={{ marginBottom: 4 }}>
            <Text>
              <Text style={{ fontWeight: 500 }}>{item.name}</Text>
              {item.institution && <Text style={{ color: "#6B7280" }}> — {item.institution}</Text>}
              {item.date && <Text style={{ color: "#9CA3AF" }}> ({item.date})</Text>}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  const renderLanguages = (label: string) => {
    const data = sectionData.languages as LanguagesData;
    if (!data) return null;
    return (
      <View style={styles.sectionWrapper}>
        {renderSectionTitle(label)}
        <Text style={{ color: "#4B5563" }}>
          {data.items.map((item) => `${item.language} (${item.proficiency})`).join(" • ")}
        </Text>
      </View>
    );
  };

  const renderAwards = (label: string) => {
    const data = sectionData.awards as AwardsData;
    if (!data) return null;
    return (
      <View style={styles.sectionWrapper}>
        {renderSectionTitle(label)}
        {data.items.map((item, index) => (
          <View key={item.id} style={styles.timelineItem}>
            <View style={styles.dateColumn}>
              <Text style={styles.dateText}>{item.date}</Text>
            </View>
            <View style={styles.timelineDotColumn}>
              <View style={styles.timelineDot} />
              {index < data.items.length - 1 && <View style={styles.timelineLine} />}
            </View>
            <View style={styles.contentColumn}>
              <Text style={styles.itemTitle}>{item.name}</Text>
              {item.issuer && <Text style={styles.itemSubtitle}>{item.issuer}</Text>}
              {item.description && (
                <Text style={{ fontSize: theme.fontSize - 1, marginTop: 2, color: "#4B5563" }}>{item.description}</Text>
              )}
            </View>
          </View>
        ))}
      </View>
    );
  };

  const renderVolunteer = (label: string) => {
    const data = sectionData.volunteer as VolunteerData;
    if (!data) return null;
    return (
      <View style={styles.sectionWrapper}>
        {renderSectionTitle(label)}
        {data.items.map((item, index) => (
          <View key={item.id} style={styles.timelineItem}>
            <View style={styles.dateColumn}>
              <Text style={styles.dateText}>{item.startDate}</Text>
              <Text style={styles.dateText}>– {item.current ? "Present" : item.endDate}</Text>
            </View>
            <View style={styles.timelineDotColumn}>
              <View style={styles.timelineDot} />
              {index < data.items.length - 1 && <View style={styles.timelineLine} />}
            </View>
            <View style={styles.contentColumn}>
              <Text style={styles.itemTitle}>{item.role}</Text>
              <Text style={styles.itemSubtitle}>
                {item.organization}{item.location && ` • ${item.location}`}
              </Text>
              {item.bullets.length > 0 && (
                <View style={styles.bulletList}>
                  {item.bullets.map((bullet) => (
                    <Text key={bullet.id} style={styles.bulletItem}>•  {bullet.content}</Text>
                  ))}
                </View>
              )}
            </View>
          </View>
        ))}
      </View>
    );
  };

  const renderInterests = (label: string) => {
    const data = sectionData.interests as InterestsData;
    if (!data) return null;
    return (
      <View style={styles.sectionWrapper}>
        {renderSectionTitle(label)}
        <Text style={{ color: "#4B5563" }}>{data.items.join(" • ")}</Text>
      </View>
    );
  };

  const renderPublications = (label: string) => {
    const data = sectionData.publications as PublicationsData;
    if (!data) return null;
    return (
      <View style={styles.sectionWrapper}>
        {renderSectionTitle(label)}
        {data.items.map((item) => (
          <View key={item.id} style={{ marginBottom: 6 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text>
                <Text style={{ fontWeight: 600 }}>{item.title}</Text>
                {item.publisher && <Text style={{ color: "#6B7280" }}> — {item.publisher}</Text>}
              </Text>
              <Text style={{ fontSize: theme.fontSize - 1, color: "#9CA3AF" }}>{item.date}</Text>
            </View>
            {item.description && (
              <Text style={{ fontSize: theme.fontSize - 1, marginTop: 2, color: "#4B5563" }}>{item.description}</Text>
            )}
          </View>
        ))}
      </View>
    );
  };

  const renderReferences = (label: string) => {
    const data = sectionData.references as ReferencesData;
    if (!data) return null;
    return (
      <View style={styles.sectionWrapper}>
        {renderSectionTitle(label)}
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 20 }}>
          {data.items.map((item) => (
            <View key={item.id} style={{ width: "45%", marginBottom: 8 }}>
              <Text style={{ fontWeight: 600 }}>{item.name}</Text>
              <Text style={{ color: "#6B7280", fontSize: theme.fontSize - 1 }}>
                {item.title}{item.company && `, ${item.company}`}
              </Text>
              {item.email && <Text style={{ color: theme.primaryColor, fontSize: theme.fontSize - 1 }}>{item.email}</Text>}
              {item.phone && <Text style={{ color: "#9CA3AF", fontSize: theme.fontSize - 1 }}>{item.phone}</Text>}
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderCustomSection = (sectionId: string, label: string) => {
    const data = sectionData[sectionId] as CustomSectionData;
    if (!data) return null;
    return (
      <View style={styles.sectionWrapper}>
        {renderSectionTitle(label)}
        {data.items.map((item) => (
          <View key={item.id} style={{ marginBottom: 10 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <View>
                <Text style={styles.itemTitle}>{item.title}</Text>
                {item.subtitle && <Text style={styles.itemSubtitle}>{item.subtitle}</Text>}
              </View>
              {item.date && <Text style={{ fontSize: theme.fontSize - 1, color: "#9CA3AF" }}>{item.date}</Text>}
            </View>
            {item.description && <Text style={{ marginTop: 4, color: "#4B5563" }}>{item.description}</Text>}
            {item.bullets.length > 0 && (
              <View style={styles.bulletList}>
                {item.bullets.map((bullet) => (
                  <Text key={bullet.id} style={styles.bulletItem}>•  {bullet.content}</Text>
                ))}
              </View>
            )}
          </View>
        ))}
      </View>
    );
  };

  const renderSection = (section: typeof visibleSections[0]) => {
    switch (section.type) {
      case "header": return renderHeader();
      case "summary": return renderSummary(section.label);
      case "experience": return renderExperience(section.label);
      case "education": return renderEducation(section.label);
      case "skills": return renderSkills(section.label);
      case "projects": return renderProjects(section.label);
      case "certifications": return renderCertifications(section.label);
      case "courses": return renderCourses(section.label);
      case "languages": return renderLanguages(section.label);
      case "awards": return renderAwards(section.label);
      case "volunteer": return renderVolunteer(section.label);
      case "interests": return renderInterests(section.label);
      case "publications": return renderPublications(section.label);
      case "references": return renderReferences(section.label);
      case "custom": return renderCustomSection(section.id, section.label);
      default: return null;
    }
  };

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        {visibleSections.map((section) => (
          <View key={section.id}>{renderSection(section)}</View>
        ))}
      </Page>
    </Document>
  );
}
