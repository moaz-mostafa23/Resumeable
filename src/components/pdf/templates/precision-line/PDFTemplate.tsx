"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Link,
} from "@react-pdf/renderer";
import {
  ResumeDocument,
  HeaderData,
  SummaryData,
  ExperienceData,
  EducationData,
  SkillsData,
  ProjectsData,
  CertificationsData,
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

export function PDFTemplate({ resume }: PDFTemplateProps) {
  const { sections, sectionData, theme } = resume;
  const visibleSections = sections.filter((s) => s.visible).sort((a, b) => a.order - b.order);

  const styles = StyleSheet.create({
    page: {
      padding: theme.pageMargins,
      fontFamily: "Inter",
      fontSize: theme.fontSize,
      lineHeight: theme.lineHeight,
      color: "#374151",
    },
    sectionTitle: {
      color: theme.primaryColor,
      borderBottomWidth: 2,
      borderBottomColor: theme.primaryColor,
      paddingBottom: 4,
      marginBottom: theme.sectionSpacing / 2,
      marginTop: theme.sectionSpacing,
      fontSize: theme.fontSize + 2,
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: 1,
    },
    header: {
      textAlign: "center",
      marginBottom: 16,
    },
    name: {
      fontSize: theme.nameFontSize,
      fontWeight: 700,
      color: theme.primaryColor,
      marginBottom: 4,
    },
    title: {
      fontSize: theme.titleFontSize,
      color: "#6B7280",
      marginBottom: 8,
    },
    contactRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: 16,
      fontSize: theme.fontSize - 1,
      color: "#6B7280",
    },
    contactItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    itemTitle: {
      fontWeight: 600,
      marginBottom: 2,
    },
    itemSubtitle: {
      color: "#6B7280",
      marginBottom: 4,
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
      marginBottom: 2,
    },
    skillRow: {
      flexDirection: "row",
      marginBottom: 4,
    },
    skillLabel: {
      fontWeight: 600,
      width: 130,
    },
    skillValue: {
      flex: 1,
      color: "#374151",
    },
    certGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    certItem: {
      width: "50%",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingRight: 16,
      marginBottom: 4,
    },
    certName: {
      fontWeight: 500,
    },
    certDate: {
      fontSize: theme.fontSize - 1,
      color: "#9CA3AF",
    },
    techTags: {
      fontSize: theme.fontSize - 1,
      color: "#6B7280",
      marginBottom: 4,
    },
  });

  const renderHeader = () => {
    const data = sectionData.header as HeaderData;
    return (
      <View style={styles.header}>
        <Text style={styles.name}>{data.fullName}</Text>
        <Text style={styles.title}>{data.title}</Text>
        <View style={styles.contactRow}>
          {data.email && <Text>{data.email}</Text>}
          {data.phone && <Text>|  {data.phone}</Text>}
          {data.location && <Text>|  {data.location}</Text>}
          {data.linkedin && <Text>|  {data.linkedin}</Text>}
          {data.github && <Text>|  {data.github}</Text>}
          {data.website && <Text>|  {data.website}</Text>}
        </View>
      </View>
    );
  };

  const renderSummary = (label: string) => {
    const data = sectionData.summary as SummaryData;
    return (
      <View>
        <Text style={styles.sectionTitle}>{label}</Text>
        <Text>{data.content}</Text>
      </View>
    );
  };

  const renderExperience = (label: string) => {
    const data = sectionData.experience as ExperienceData;
    return (
      <View>
        <Text style={styles.sectionTitle}>{label}</Text>
        {data.items.map((item) => (
          <View key={item.id} style={{ marginBottom: 12 }}>
            <View style={styles.itemRow}>
              <View>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemSubtitle}>{item.company} | {item.location}</Text>
              </View>
              <Text style={styles.itemDates}>
                {item.startDate} - {item.current ? "Present" : item.endDate}
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
        <Text style={styles.sectionTitle}>{label}</Text>
        {data.items.map((item) => (
          <View key={item.id} style={{ marginBottom: 8 }}>
            <View style={styles.itemRow}>
              <View>
                <Text style={styles.itemTitle}>{item.degree} in {item.field}</Text>
                <Text style={styles.itemSubtitle}>{item.institution} | {item.location}</Text>
              </View>
              <Text style={styles.itemDates}>
                {item.startDate} - {item.endDate}
              </Text>
            </View>
            {item.gpa && <Text style={{ fontSize: theme.fontSize - 1 }}>GPA: {item.gpa}</Text>}
            {item.details && <Text style={{ marginTop: 4 }}>{item.details}</Text>}
          </View>
        ))}
      </View>
    );
  };

  const renderSkills = (label: string) => {
    const data = sectionData.skills as SkillsData;
    return (
      <View>
        <Text style={styles.sectionTitle}>{label}</Text>
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
      <View>
        <Text style={styles.sectionTitle}>{label}</Text>
        {data.items.map((item) => (
          <View key={item.id} style={{ marginBottom: 12 }}>
            <View style={styles.itemRow}>
              <View>
                <Text style={styles.itemTitle}>
                  {item.name}
                  {item.link && (
                    <Text style={{ fontWeight: 400, color: "#9CA3AF" }}> | {item.link}</Text>
                  )}
                </Text>
                {item.technologies.length > 0 && (
                  <Text style={styles.techTags}>{item.technologies.join(" • ")}</Text>
                )}
              </View>
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

  const renderCertifications = (label: string) => {
    const data = sectionData.certifications as CertificationsData;
    return (
      <View>
        <Text style={styles.sectionTitle}>{label}</Text>
        <View style={styles.certGrid}>
          {data.items.map((item) => (
            <View key={item.id} style={styles.certItem}>
              <Text style={styles.certName}>{item.name}</Text>
              <Text style={styles.certDate}>{item.date}</Text>
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
        <Text style={styles.sectionTitle}>{label}</Text>
        {data.items.map((item) => (
          <View key={item.id} style={{ marginBottom: 8 }}>
            <View style={styles.itemRow}>
              <View>
                <Text style={styles.itemTitle}>{item.title}</Text>
                {item.subtitle && <Text style={styles.itemSubtitle}>{item.subtitle}</Text>}
              </View>
              {item.date && <Text style={styles.itemDates}>{item.date}</Text>}
            </View>
            {item.description && <Text style={{ marginTop: 4 }}>{item.description}</Text>}
            {item.bullets.length > 0 && (
              <View style={styles.bulletList}>
                {item.bullets.map((bullet) => (
                  <Text key={bullet.id} style={styles.bulletItem}>
                    •  {bullet.content}
                  </Text>
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
      case "header":
        return renderHeader();
      case "summary":
        return renderSummary(section.label);
      case "experience":
        return renderExperience(section.label);
      case "education":
        return renderEducation(section.label);
      case "skills":
        return renderSkills(section.label);
      case "projects":
        return renderProjects(section.label);
      case "certifications":
        return renderCertifications(section.label);
      case "custom":
        return renderCustomSection(section.id, section.label);
      default:
        return null;
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
