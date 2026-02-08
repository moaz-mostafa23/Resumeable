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
 * Creative Infographic PDF Template
 * Bold colored header, numbered experience items, icon backgrounds for skills.
 */
export function PDFTemplate({ resume }: PDFTemplateProps) {
  const { sections, sectionData, theme } = resume;
  const visibleSections = sections.filter((s) => s.visible).sort((a, b) => a.order - b.order);

  const styles = StyleSheet.create({
    page: {
      fontFamily: "Inter",
      fontSize: theme.fontSize,
      lineHeight: theme.lineHeight,
      color: "#1F2937",
    },
    headerBanner: {
      backgroundColor: theme.primaryColor,
      paddingTop: 30,
      paddingBottom: 30,
      paddingHorizontal: theme.marginHorizontal,
      marginBottom: 16,
    },
    name: {
      fontSize: theme.nameFontSize + 4,
      fontWeight: 700,
      color: "#FFFFFF",
      marginBottom: 4,
    },
    title: {
      fontSize: theme.titleFontSize + 2,
      color: "rgba(255,255,255,0.9)",
      marginBottom: 12,
    },
    contactRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 16,
      fontSize: theme.fontSize - 1,
      color: "rgba(255,255,255,0.85)",
    },
    body: {
      paddingHorizontal: theme.marginHorizontal,
      paddingBottom: theme.marginVertical,
    },
    sectionWrapper: {
      marginTop: theme.sectionSpacing,
    },
    sectionTitleWrapper: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: theme.sectionSpacing / 2,
      gap: 8,
    },
    sectionIcon: {
      width: 24,
      height: 24,
      borderRadius: 4,
      backgroundColor: theme.primaryColor,
      alignItems: "center",
      justifyContent: "center",
    },
    sectionIconText: {
      color: "#FFFFFF",
      fontWeight: 700,
      fontSize: 12,
    },
    sectionTitle: {
      fontSize: theme.fontSize + 2,
      fontWeight: 700,
      color: theme.primaryColor,
      textTransform: "uppercase",
      letterSpacing: 1,
    },
    numberedItem: {
      flexDirection: "row",
      marginBottom: 14,
    },
    numberBadge: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: theme.primaryColor,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 12,
      marginTop: 2,
    },
    numberText: {
      color: "#FFFFFF",
      fontWeight: 700,
      fontSize: 11,
    },
    itemContent: {
      flex: 1,
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
      marginBottom: 2,
    },
    itemDates: {
      fontSize: theme.fontSize - 1,
      color: theme.primaryColor,
      fontWeight: 500,
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
    skillsGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 12,
    },
    skillCard: {
      width: "48%",
      backgroundColor: "#F9FAFB",
      borderRadius: 6,
      padding: 10,
      marginBottom: 8,
    },
    skillCardTitle: {
      fontWeight: 600,
      fontSize: theme.fontSize - 1,
      color: theme.primaryColor,
      marginBottom: 6,
    },
    skillChip: {
      backgroundColor: "#FFFFFF",
      borderWidth: 1,
      borderColor: "#E5E7EB",
      paddingVertical: 2,
      paddingHorizontal: 6,
      borderRadius: 3,
      fontSize: theme.fontSize - 1,
      color: "#374151",
      marginRight: 4,
      marginBottom: 4,
    },
    summaryText: {
      color: "#4B5563",
      lineHeight: 1.6,
      backgroundColor: "#F9FAFB",
      padding: 12,
      borderRadius: 6,
      borderLeftWidth: 3,
      borderLeftColor: theme.primaryColor,
    },
  });

  const getSectionInitial = (type: string): string => {
    const initials: Record<string, string> = {
      summary: "S",
      experience: "E",
      education: "Ed",
      skills: "Sk",
      projects: "P",
      certifications: "C",
      courses: "Co",
      languages: "L",
      awards: "A",
      volunteer: "V",
      interests: "I",
      publications: "Pb",
      references: "R",
      custom: "★",
    };
    return initials[type] || "•";
  };

  const renderSectionTitle = (label: string, type: string) => (
    <View style={styles.sectionTitleWrapper}>
      <View style={styles.sectionIcon}>
        <Text style={styles.sectionIconText}>{getSectionInitial(type)}</Text>
      </View>
      <Text style={styles.sectionTitle}>{label}</Text>
    </View>
  );

  const renderHeader = () => {
    const data = sectionData.header as HeaderData;
    return (
      <View style={styles.headerBanner}>
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
        {renderSectionTitle(label, "summary")}
        <Text style={styles.summaryText}>{data.content}</Text>
      </View>
    );
  };

  const renderExperience = (label: string) => {
    const data = sectionData.experience as ExperienceData;
    return (
      <View style={styles.sectionWrapper}>
        {renderSectionTitle(label, "experience")}
        {data.items.map((item, index) => (
          <View key={item.id} style={styles.numberedItem}>
            <View style={styles.numberBadge}>
              <Text style={styles.numberText}>{index + 1}</Text>
            </View>
            <View style={styles.itemContent}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemSubtitle}>{item.company} • {item.location}</Text>
              <Text style={styles.itemDates}>
                {item.startDate} – {item.current ? "Present" : item.endDate}
              </Text>
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
        {renderSectionTitle(label, "education")}
        {data.items.map((item, index) => (
          <View key={item.id} style={styles.numberedItem}>
            <View style={styles.numberBadge}>
              <Text style={styles.numberText}>{index + 1}</Text>
            </View>
            <View style={styles.itemContent}>
              <Text style={styles.itemTitle}>{item.degree} in {item.field}</Text>
              <Text style={styles.itemSubtitle}>{item.institution} • {item.location}</Text>
              <Text style={styles.itemDates}>{item.startDate} – {item.endDate}</Text>
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
        {renderSectionTitle(label, "skills")}
        <View style={styles.skillsGrid}>
          {data.categories.map((category) => (
            <View key={category.id} style={styles.skillCard}>
              <Text style={styles.skillCardTitle}>{category.name}</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {category.skills.map((skill, idx) => (
                  <Text key={idx} style={styles.skillChip}>{skill}</Text>
                ))}
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderProjects = (label: string) => {
    const data = sectionData.projects as ProjectsData;
    return (
      <View style={styles.sectionWrapper}>
        {renderSectionTitle(label, "projects")}
        {data.items.map((item, index) => (
          <View key={item.id} style={styles.numberedItem}>
            <View style={styles.numberBadge}>
              <Text style={styles.numberText}>{index + 1}</Text>
            </View>
            <View style={styles.itemContent}>
              <Text style={styles.itemTitle}>
                {item.name}
                {item.link && <Text style={{ fontWeight: 400, color: theme.primaryColor }}> ({item.link})</Text>}
              </Text>
              {item.technologies.length > 0 && (
                <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 4, marginBottom: 4 }}>
                  {item.technologies.map((tech, idx) => (
                    <Text key={idx} style={styles.skillChip}>{tech}</Text>
                  ))}
                </View>
              )}
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

  const renderCertifications = (label: string) => {
    const data = sectionData.certifications as CertificationsData;
    return (
      <View style={styles.sectionWrapper}>
        {renderSectionTitle(label, "certifications")}
        {data.items.map((item) => (
          <View key={item.id} style={{ marginBottom: 6, flexDirection: "row", justifyContent: "space-between" }}>
            <Text>
              <Text style={{ fontWeight: 500 }}>{item.name}</Text>
              {item.issuer && <Text style={{ color: "#6B7280" }}> — {item.issuer}</Text>}
            </Text>
            <Text style={{ fontSize: theme.fontSize - 1, color: theme.primaryColor }}>{item.date}</Text>
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
        {renderSectionTitle(label, "courses")}
        {data.items.map((item) => (
          <View key={item.id} style={{ marginBottom: 4 }}>
            <Text>
              <Text style={{ fontWeight: 500 }}>{item.name}</Text>
              {item.institution && <Text style={{ color: "#6B7280" }}> — {item.institution}</Text>}
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
        {renderSectionTitle(label, "languages")}
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
          {data.items.map((item) => (
            <View key={item.id} style={[styles.skillChip, { paddingVertical: 4, paddingHorizontal: 10 }]}>
              <Text>{item.language} ({item.proficiency})</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderAwards = (label: string) => {
    const data = sectionData.awards as AwardsData;
    if (!data) return null;
    return (
      <View style={styles.sectionWrapper}>
        {renderSectionTitle(label, "awards")}
        {data.items.map((item) => (
          <View key={item.id} style={{ marginBottom: 6 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text>
                <Text style={{ fontWeight: 500 }}>{item.name}</Text>
                {item.issuer && <Text style={{ color: "#6B7280" }}> — {item.issuer}</Text>}
              </Text>
              <Text style={{ fontSize: theme.fontSize - 1, color: theme.primaryColor }}>{item.date}</Text>
            </View>
            {item.description && (
              <Text style={{ fontSize: theme.fontSize - 1, marginTop: 2, color: "#4B5563" }}>{item.description}</Text>
            )}
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
        {renderSectionTitle(label, "volunteer")}
        {data.items.map((item, index) => (
          <View key={item.id} style={styles.numberedItem}>
            <View style={styles.numberBadge}>
              <Text style={styles.numberText}>{index + 1}</Text>
            </View>
            <View style={styles.itemContent}>
              <Text style={styles.itemTitle}>{item.role}</Text>
              <Text style={styles.itemSubtitle}>
                {item.organization}{item.location && ` • ${item.location}`}
              </Text>
              <Text style={styles.itemDates}>
                {item.startDate} – {item.current ? "Present" : item.endDate}
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
        {renderSectionTitle(label, "interests")}
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
          {data.items.map((item, idx) => (
            <View key={idx} style={[styles.skillChip, { paddingVertical: 4, paddingHorizontal: 10 }]}>
              <Text>{item}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderPublications = (label: string) => {
    const data = sectionData.publications as PublicationsData;
    if (!data) return null;
    return (
      <View style={styles.sectionWrapper}>
        {renderSectionTitle(label, "publications")}
        {data.items.map((item) => (
          <View key={item.id} style={{ marginBottom: 6 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text>
                <Text style={{ fontWeight: 600 }}>{item.title}</Text>
                {item.publisher && <Text style={{ color: "#6B7280" }}> — {item.publisher}</Text>}
              </Text>
              <Text style={{ fontSize: theme.fontSize - 1, color: theme.primaryColor }}>{item.date}</Text>
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
        {renderSectionTitle(label, "references")}
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 16 }}>
          {data.items.map((item) => (
            <View key={item.id} style={[styles.skillCard, { width: "45%" }]}>
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
        {renderSectionTitle(label, "custom")}
        {data.items.map((item, index) => (
          <View key={item.id} style={styles.numberedItem}>
            <View style={styles.numberBadge}>
              <Text style={styles.numberText}>{index + 1}</Text>
            </View>
            <View style={styles.itemContent}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              {item.subtitle && <Text style={styles.itemSubtitle}>{item.subtitle}</Text>}
              {item.date && <Text style={styles.itemDates}>{item.date}</Text>}
              {item.description && <Text style={{ marginTop: 4, color: "#4B5563" }}>{item.description}</Text>}
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

  const renderSection = (section: typeof visibleSections[0]) => {
    switch (section.type) {
      case "header": return null; // Header rendered separately
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
        {renderHeader()}
        <View style={styles.body}>
          {visibleSections.filter(s => s.type !== "header").map((section) => (
            <View key={section.id}>{renderSection(section)}</View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
