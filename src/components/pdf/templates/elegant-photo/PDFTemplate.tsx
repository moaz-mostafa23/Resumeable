"use client";

import {
  Document,
  Page,
  Text,
  View,
  Image,
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
 * Elegant Photo PDF Template
 * Two-column with dark sidebar (photo, name, contact, skills) and main content area.
 */
export function PDFTemplate({ resume }: PDFTemplateProps) {
  const { sections, sectionData, theme } = resume;
  const visibleSections = sections.filter((s) => s.visible).sort((a, b) => a.order - b.order);

  const sidebarTypes = ["skills", "languages", "certifications", "interests", "courses"];
  const sidebarSections = visibleSections.filter(s => sidebarTypes.includes(s.type) && s.type !== "header");
  const mainSections = visibleSections.filter(s => !sidebarTypes.includes(s.type) && s.type !== "header");

  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      fontFamily: "Inter",
      fontSize: theme.fontSize,
      lineHeight: theme.lineHeight,
    },
    sidebar: {
      width: 200,
      backgroundColor: theme.primaryColor,
      color: "#FFFFFF",
      paddingTop: theme.marginVertical,
      paddingBottom: theme.marginVertical,
      paddingHorizontal: 18,
      alignItems: "center",
    },
    main: {
      flex: 1,
      paddingTop: theme.marginVertical,
      paddingBottom: theme.marginVertical,
      paddingHorizontal: theme.marginHorizontal,
      color: "#1F2937",
    },
    photo: {
      width: 80,
      height: 80,
      borderRadius: 9999,
      marginBottom: 10,
      objectFit: "cover",
    },
    initialsCircle: {
      width: 80,
      height: 80,
      borderRadius: 9999,
      backgroundColor: "rgba(255,255,255,0.15)",
      marginBottom: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    initialsText: {
      fontSize: 24,
      fontWeight: 700,
      color: "rgba(255,255,255,0.6)",
    },
    sidebarName: {
      fontSize: theme.nameFontSize - 4,
      fontWeight: 700,
      marginBottom: 4,
      color: "#FFFFFF",
      textAlign: "center",
    },
    sidebarTitle: {
      fontSize: theme.titleFontSize - 2,
      opacity: 0.9,
      marginBottom: 16,
      textAlign: "center",
    },
    sidebarSectionTitle: {
      fontSize: theme.fontSize,
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: 1,
      marginTop: 16,
      marginBottom: 8,
      paddingBottom: 4,
      borderBottomWidth: 1,
      borderBottomColor: "rgba(255,255,255,0.3)",
      width: "100%",
    },
    sidebarContactItem: {
      fontSize: theme.fontSize - 1,
      marginBottom: 4,
      opacity: 0.95,
      width: "100%",
    },
    sidebarSkillCategory: {
      marginBottom: 10,
      width: "100%",
    },
    sidebarSkillCategoryName: {
      fontSize: theme.fontSize - 1,
      fontWeight: 600,
      marginBottom: 4,
      opacity: 0.8,
    },
    sidebarSkillItem: {
      fontSize: theme.fontSize - 1,
      marginBottom: 2,
      opacity: 0.9,
    },
    mainSectionTitle: {
      fontSize: theme.fontSize + 2,
      fontWeight: 600,
      color: theme.primaryColor,
      textTransform: "uppercase",
      letterSpacing: 1,
      marginTop: theme.sectionSpacing,
      marginBottom: theme.sectionSpacing / 2,
      paddingBottom: 4,
      borderBottomWidth: 2,
      borderBottomColor: theme.primaryColor,
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
      color: "#9CA3AF",
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
  });

  const renderSidebarHeader = () => {
    const data = sectionData.header as HeaderData;
    const initials = data.fullName
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    return (
      <View style={{ alignItems: "center", width: "100%" }}>
        {data.photoUrl ? (
          // eslint-disable-next-line jsx-a11y/alt-text
          <Image src={data.photoUrl} style={styles.photo} />
        ) : (
          <View style={styles.initialsCircle}>
            <Text style={styles.initialsText}>{initials}</Text>
          </View>
        )}
        <Text style={styles.sidebarName}>{data.fullName}</Text>
        <Text style={styles.sidebarTitle}>{data.title}</Text>
        <Text style={styles.sidebarSectionTitle}>Contact</Text>
        {data.email && <Text style={styles.sidebarContactItem}>{data.email}</Text>}
        {data.phone && <Text style={styles.sidebarContactItem}>{data.phone}</Text>}
        {data.location && <Text style={styles.sidebarContactItem}>{data.location}</Text>}
        {data.linkedin && (
          <Link src={data.linkedinUrl ? ensureProtocol(data.linkedinUrl) : '#'} style={styles.sidebarContactItem}>
            {data.linkedin}
          </Link>
        )}
        {data.github && (
          <Link src={data.githubUrl ? ensureProtocol(data.githubUrl) : '#'} style={styles.sidebarContactItem}>
            {data.github}
          </Link>
        )}
        {data.website && (
          <Link src={data.websiteUrl ? ensureProtocol(data.websiteUrl) : '#'} style={styles.sidebarContactItem}>
            {data.website}
          </Link>
        )}
      </View>
    );
  };

  const renderSidebarSkills = (label: string) => {
    const data = sectionData.skills as SkillsData;
    return (
      <View>
        <Text style={styles.sidebarSectionTitle}>{label}</Text>
        {data.categories.map((category) => (
          <View key={category.id} style={styles.sidebarSkillCategory}>
            <Text style={styles.sidebarSkillCategoryName}>{category.name}</Text>
            {category.skills.map((skill, idx) => (
              <Text key={idx} style={styles.sidebarSkillItem}>• {skill}</Text>
            ))}
          </View>
        ))}
      </View>
    );
  };

  const renderSidebarLanguages = (label: string) => {
    const data = sectionData.languages as LanguagesData;
    if (!data) return null;
    return (
      <View>
        <Text style={styles.sidebarSectionTitle}>{label}</Text>
        {data.items.map((item) => (
          <Text key={item.id} style={styles.sidebarSkillItem}>
            • {item.language} ({item.proficiency})
          </Text>
        ))}
      </View>
    );
  };

  const renderSidebarCertifications = (label: string) => {
    const data = sectionData.certifications as CertificationsData;
    if (!data) return null;
    return (
      <View>
        <Text style={styles.sidebarSectionTitle}>{label}</Text>
        {data.items.map((item) => (
          <View key={item.id} style={{ marginBottom: 6 }}>
            <Text style={{ fontSize: theme.fontSize - 1, fontWeight: 500 }}>{item.name}</Text>
            {item.issuer && <Text style={{ fontSize: theme.fontSize - 2, opacity: 0.8 }}>{item.issuer}</Text>}
            {item.date && <Text style={{ fontSize: theme.fontSize - 2, opacity: 0.7 }}>{item.date}</Text>}
          </View>
        ))}
      </View>
    );
  };

  const renderSidebarCourses = (label: string) => {
    const data = sectionData.courses as CoursesData;
    if (!data) return null;
    return (
      <View>
        <Text style={styles.sidebarSectionTitle}>{label}</Text>
        {data.items.map((item) => (
          <View key={item.id} style={{ marginBottom: 6 }}>
            <Text style={{ fontSize: theme.fontSize - 1, fontWeight: 500 }}>{item.name}</Text>
            {item.institution && <Text style={{ fontSize: theme.fontSize - 2, opacity: 0.8 }}>{item.institution}</Text>}
          </View>
        ))}
      </View>
    );
  };

  const renderSidebarInterests = (label: string) => {
    const data = sectionData.interests as InterestsData;
    if (!data) return null;
    return (
      <View>
        <Text style={styles.sidebarSectionTitle}>{label}</Text>
        {data.items.map((item, idx) => (
          <Text key={idx} style={styles.sidebarSkillItem}>• {item}</Text>
        ))}
      </View>
    );
  };

  const renderSidebarSection = (section: typeof visibleSections[0]) => {
    switch (section.type) {
      case "skills": return renderSidebarSkills(section.label);
      case "languages": return renderSidebarLanguages(section.label);
      case "certifications": return renderSidebarCertifications(section.label);
      case "courses": return renderSidebarCourses(section.label);
      case "interests": return renderSidebarInterests(section.label);
      default: return null;
    }
  };

  const renderSummary = (label: string) => {
    const data = sectionData.summary as SummaryData;
    return (
      <View>
        <Text style={styles.mainSectionTitle}>{label}</Text>
        <Text style={{ color: "#4B5563", lineHeight: 1.6 }}>{data.content}</Text>
      </View>
    );
  };

  const renderExperience = (label: string) => {
    const data = sectionData.experience as ExperienceData;
    return (
      <View>
        <Text style={styles.mainSectionTitle}>{label}</Text>
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
                <Text key={bullet.id} style={styles.bulletItem}>•  {bullet.content}</Text>
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
        <Text style={styles.mainSectionTitle}>{label}</Text>
        {data.items.map((item) => (
          <View key={item.id} style={{ marginBottom: 10 }}>
            <View style={styles.itemRow}>
              <View>
                <Text style={styles.itemTitle}>{item.degree} in {item.field}</Text>
                <Text style={styles.itemSubtitle}>{item.institution} • {item.location}</Text>
              </View>
              <Text style={styles.itemDates}>{item.startDate} – {item.endDate}</Text>
            </View>
            {item.gpa && <Text style={{ fontSize: theme.fontSize - 1, marginTop: 2 }}>GPA: {item.gpa}</Text>}
            {item.details && <Text style={{ marginTop: 4, color: "#4B5563" }}>{item.details}</Text>}
          </View>
        ))}
      </View>
    );
  };

  const renderProjects = (label: string) => {
    const data = sectionData.projects as ProjectsData;
    return (
      <View>
        <Text style={styles.mainSectionTitle}>{label}</Text>
        {data.items.map((item) => (
          <View key={item.id} style={{ marginBottom: 12 }}>
            <Text style={styles.itemTitle}>
              {item.name}
              {item.link && <Text style={{ fontWeight: 400, color: theme.primaryColor }}> ({item.link})</Text>}
            </Text>
            {item.technologies.length > 0 && (
              <Text style={{ fontSize: theme.fontSize - 1, color: "#6B7280", marginBottom: 4 }}>
                {item.technologies.join(" • ")}
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

  const renderAwards = (label: string) => {
    const data = sectionData.awards as AwardsData;
    if (!data) return null;
    return (
      <View>
        <Text style={styles.mainSectionTitle}>{label}</Text>
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
        <Text style={styles.mainSectionTitle}>{label}</Text>
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

  const renderPublications = (label: string) => {
    const data = sectionData.publications as PublicationsData;
    if (!data) return null;
    return (
      <View>
        <Text style={styles.mainSectionTitle}>{label}</Text>
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
        <Text style={styles.mainSectionTitle}>{label}</Text>
        {data.items.map((item) => (
          <View key={item.id} style={{ marginBottom: 8 }}>
            <Text style={{ fontWeight: 600 }}>{item.name}</Text>
            <Text style={{ color: "#6B7280", fontSize: theme.fontSize - 1 }}>
              {item.title}{item.company && `, ${item.company}`}
            </Text>
            {item.email && <Text style={{ color: theme.primaryColor, fontSize: theme.fontSize - 1 }}>{item.email}</Text>}
            {item.phone && <Text style={{ color: "#9CA3AF", fontSize: theme.fontSize - 1 }}>{item.phone}</Text>}
          </View>
        ))}
      </View>
    );
  };

  const renderCustomSection = (sectionId: string, label: string) => {
    const data = sectionData[sectionId] as CustomSectionData;
    if (!data) return null;
    return (
      <View>
        <Text style={styles.mainSectionTitle}>{label}</Text>
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

  const renderMainSection = (section: typeof visibleSections[0]) => {
    switch (section.type) {
      case "summary": return renderSummary(section.label);
      case "experience": return renderExperience(section.label);
      case "education": return renderEducation(section.label);
      case "projects": return renderProjects(section.label);
      case "awards": return renderAwards(section.label);
      case "volunteer": return renderVolunteer(section.label);
      case "publications": return renderPublications(section.label);
      case "references": return renderReferences(section.label);
      case "custom": return renderCustomSection(section.id, section.label);
      default: return null;
    }
  };

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <View style={styles.sidebar}>
          {renderSidebarHeader()}
          {sidebarSections.map((section) => (
            <View key={section.id}>{renderSidebarSection(section)}</View>
          ))}
        </View>
        <View style={styles.main}>
          {mainSections.map((section) => (
            <View key={section.id}>{renderMainSection(section)}</View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
