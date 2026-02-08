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
 * Modern Minimal PDF Template
 * Contemporary design with accent colors, left-bordered section titles, and skill chips.
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
      backgroundColor: "#FFFFFF",
    },
    sectionTitleWrapper: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: theme.sectionSpacing,
      marginBottom: theme.sectionSpacing / 2,
    },
    sectionTitleBar: {
      width: 3,
      height: 14,
      backgroundColor: theme.primaryColor,
      marginRight: 8,
    },
    sectionTitle: {
      fontSize: theme.fontSize + 1,
      fontWeight: 600,
      color: theme.primaryColor,
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    header: {
      marginBottom: 20,
      borderBottomWidth: 2,
      borderBottomColor: theme.primaryColor,
      paddingBottom: 16,
    },
    name: {
      fontSize: theme.nameFontSize,
      fontWeight: 700,
      color: "#1F2937",
      marginBottom: 2,
    },
    title: {
      fontSize: theme.titleFontSize,
      color: theme.primaryColor,
      fontWeight: 500,
      marginBottom: 10,
    },
    contactRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 16,
    },
    contactItem: {
      fontSize: theme.fontSize - 1,
      color: "#6B7280",
    },
    itemTitle: {
      fontWeight: 600,
      fontSize: theme.fontSize,
      color: "#1F2937",
      marginBottom: 2,
    },
    itemSubtitle: {
      color: "#6B7280",
      marginBottom: 2,
    },
    itemDates: {
      fontSize: theme.fontSize - 1,
      color: theme.primaryColor,
      fontWeight: 500,
    },
    itemRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    bulletList: {
      marginTop: 6,
      paddingLeft: 12,
    },
    bulletItem: {
      marginBottom: 3,
      color: "#374151",
    },
    skillChipsRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 6,
      marginBottom: 8,
    },
    skillChip: {
      backgroundColor: "#F3F4F6",
      paddingVertical: 3,
      paddingHorizontal: 8,
      borderRadius: 4,
      fontSize: theme.fontSize - 1,
      color: "#374151",
    },
    skillCategoryName: {
      fontWeight: 600,
      fontSize: theme.fontSize - 1,
      color: "#6B7280",
      marginBottom: 4,
    },
    summaryText: {
      color: "#4B5563",
      lineHeight: 1.6,
    },
  });

  const renderSectionTitle = (label: string) => (
    <View style={styles.sectionTitleWrapper}>
      <View style={styles.sectionTitleBar} />
      <Text style={styles.sectionTitle}>{label}</Text>
    </View>
  );

  const renderHeader = () => {
    const data = sectionData.header as HeaderData;
    return (
      <View style={styles.header}>
        <Text style={styles.name}>{data.fullName}</Text>
        <Text style={styles.title}>{data.title}</Text>
        <View style={styles.contactRow}>
          {data.email && <Text style={styles.contactItem}>{data.email}</Text>}
          {data.phone && <Text style={styles.contactItem}>{data.phone}</Text>}
          {data.location && <Text style={styles.contactItem}>{data.location}</Text>}
          {data.linkedin && (
            <Link src={data.linkedinUrl ? ensureProtocol(data.linkedinUrl) : '#'} style={styles.contactItem}>
              {data.linkedin}
            </Link>
          )}
          {data.github && (
            <Link src={data.githubUrl ? ensureProtocol(data.githubUrl) : '#'} style={styles.contactItem}>
              {data.github}
            </Link>
          )}
          {data.website && (
            <Link src={data.websiteUrl ? ensureProtocol(data.websiteUrl) : '#'} style={styles.contactItem}>
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
      <View>
        {renderSectionTitle(label)}
        <Text style={styles.summaryText}>{data.content}</Text>
      </View>
    );
  };

  const renderExperience = (label: string) => {
    const data = sectionData.experience as ExperienceData;
    return (
      <View>
        {renderSectionTitle(label)}
        {data.items.map((item) => (
          <View key={item.id} style={{ marginBottom: 12 }}>
            <View style={styles.itemRow}>
              <View>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemSubtitle}>{item.company} • {item.location}</Text>
              </View>
              <Text style={styles.itemDates}>
                {item.startDate} – {item.current ? "Present" : item.endDate}
              </Text>
            </View>
            <View style={styles.bulletList}>
              {item.bullets.map((bullet) => (
                <Text key={bullet.id} style={styles.bulletItem}>
                  •  {bullet.content}
                </Text>
              ))}
            </View>
          </View>
        ))}
      </View>
    );
  };

  const renderEducation = (label: string) => {
    const data = sectionData.education as EducationData;
    return (
      <View>
        {renderSectionTitle(label)}
        {data.items.map((item) => (
          <View key={item.id} style={{ marginBottom: 10 }}>
            <View style={styles.itemRow}>
              <View>
                <Text style={styles.itemTitle}>{item.degree} in {item.field}</Text>
                <Text style={styles.itemSubtitle}>{item.institution} • {item.location}</Text>
              </View>
              <Text style={styles.itemDates}>
                {item.startDate} – {item.endDate}
              </Text>
            </View>
            {item.gpa && <Text style={{ fontSize: theme.fontSize - 1, marginTop: 2 }}>GPA: {item.gpa}</Text>}
            {item.details && <Text style={{ marginTop: 4, color: "#4B5563" }}>{item.details}</Text>}
          </View>
        ))}
      </View>
    );
  };

  const renderSkills = (label: string) => {
    const data = sectionData.skills as SkillsData;
    return (
      <View>
        {renderSectionTitle(label)}
        {data.categories.map((category) => (
          <View key={category.id} style={{ marginBottom: 8 }}>
            <Text style={styles.skillCategoryName}>{category.name}</Text>
            <View style={styles.skillChipsRow}>
              {category.skills.map((skill, idx) => (
                <Text key={idx} style={styles.skillChip}>{skill}</Text>
              ))}
            </View>
          </View>
        ))}
      </View>
    );
  };

  const renderProjects = (label: string) => {
    const data = sectionData.projects as ProjectsData;
    return (
      <View>
        {renderSectionTitle(label)}
        {data.items.map((item) => (
          <View key={item.id} style={{ marginBottom: 12 }}>
            <Text style={styles.itemTitle}>
              {item.name}
              {item.link && <Text style={{ fontWeight: 400, color: theme.primaryColor }}> ({item.link})</Text>}
            </Text>
            {item.technologies.length > 0 && (
              <View style={[styles.skillChipsRow, { marginTop: 4, marginBottom: 4 }]}>
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
        ))}
      </View>
    );
  };

  const renderCertifications = (label: string) => {
    const data = sectionData.certifications as CertificationsData;
    return (
      <View>
        {renderSectionTitle(label)}
        {data.items.map((item) => (
          <View key={item.id} style={[styles.itemRow, { marginBottom: 6 }]}>
            <Text>
              <Text style={{ fontWeight: 500 }}>{item.name}</Text>
              {item.issuer && <Text style={{ color: "#6B7280" }}> — {item.issuer}</Text>}
            </Text>
            <Text style={styles.itemDates}>{item.date}</Text>
          </View>
        ))}
      </View>
    );
  };

  const renderCourses = (label: string) => {
    const data = sectionData.courses as CoursesData;
    if (!data) return null;
    return (
      <View>
        {renderSectionTitle(label)}
        {data.items.map((item) => (
          <View key={item.id} style={[styles.itemRow, { marginBottom: 6 }]}>
            <Text>
              <Text style={{ fontWeight: 500 }}>{item.name}</Text>
              {item.institution && <Text style={{ color: "#6B7280" }}> — {item.institution}</Text>}
            </Text>
            <Text style={styles.itemDates}>{item.date}</Text>
          </View>
        ))}
      </View>
    );
  };

  const renderLanguages = (label: string) => {
    const data = sectionData.languages as LanguagesData;
    if (!data) return null;
    return (
      <View>
        {renderSectionTitle(label)}
        <View style={styles.skillChipsRow}>
          {data.items.map((item) => (
            <Text key={item.id} style={styles.skillChip}>
              {item.language} ({item.proficiency})
            </Text>
          ))}
        </View>
      </View>
    );
  };

  const renderAwards = (label: string) => {
    const data = sectionData.awards as AwardsData;
    if (!data) return null;
    return (
      <View>
        {renderSectionTitle(label)}
        {data.items.map((item) => (
          <View key={item.id} style={{ marginBottom: 6 }}>
            <View style={styles.itemRow}>
              <Text>
                <Text style={{ fontWeight: 500 }}>{item.name}</Text>
                {item.issuer && <Text style={{ color: "#6B7280" }}> — {item.issuer}</Text>}
              </Text>
              <Text style={styles.itemDates}>{item.date}</Text>
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
      <View>
        {renderSectionTitle(label)}
        {data.items.map((item) => (
          <View key={item.id} style={{ marginBottom: 12 }}>
            <View style={styles.itemRow}>
              <View>
                <Text style={styles.itemTitle}>{item.role}</Text>
                <Text style={styles.itemSubtitle}>
                  {item.organization}{item.location && ` • ${item.location}`}
                </Text>
              </View>
              <Text style={styles.itemDates}>
                {item.startDate} – {item.current ? "Present" : item.endDate}
              </Text>
            </View>
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

  const renderInterests = (label: string) => {
    const data = sectionData.interests as InterestsData;
    if (!data) return null;
    return (
      <View>
        {renderSectionTitle(label)}
        <View style={styles.skillChipsRow}>
          {data.items.map((item, idx) => (
            <Text key={idx} style={styles.skillChip}>{item}</Text>
          ))}
        </View>
      </View>
    );
  };

  const renderPublications = (label: string) => {
    const data = sectionData.publications as PublicationsData;
    if (!data) return null;
    return (
      <View>
        {renderSectionTitle(label)}
        {data.items.map((item) => (
          <View key={item.id} style={{ marginBottom: 6 }}>
            <View style={styles.itemRow}>
              <Text>
                <Text style={{ fontWeight: 600 }}>{item.title}</Text>
                {item.publisher && <Text style={{ color: "#6B7280" }}> — {item.publisher}</Text>}
              </Text>
              <Text style={styles.itemDates}>{item.date}</Text>
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
      <View>
        {renderSectionTitle(label)}
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 16 }}>
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
      <View>
        {renderSectionTitle(label)}
        {data.items.map((item) => (
          <View key={item.id} style={{ marginBottom: 10 }}>
            <View style={styles.itemRow}>
              <View>
                <Text style={styles.itemTitle}>{item.title}</Text>
                {item.subtitle && <Text style={styles.itemSubtitle}>{item.subtitle}</Text>}
              </View>
              {item.date && <Text style={styles.itemDates}>{item.date}</Text>}
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
