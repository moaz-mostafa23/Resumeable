"use client";

import { useResume } from "@/hooks/useResume";
import {
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
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from "lucide-react";

// Helper to ensure URL has protocol
function ensureProtocol(url: string): string {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  return url;
}

/**
 * ATS Minimal Template
 * Clean single-column layout optimized for ATS parsing.
 * No icons, minimal styling, maximum compatibility.
 */
export function ATSMinimalPreview() {
  const resume = useResume();

  if (!resume) return null;

  const { sections, sectionData, theme } = resume;
  const visibleSections = sections.filter((s) => s.visible).sort((a, b) => a.order - b.order);

  const styles = {
    page: {
      width: "8.5in",
      minHeight: "11in",
      paddingTop: theme.marginVertical,
      paddingBottom: theme.marginVertical,
      paddingLeft: theme.marginHorizontal,
      paddingRight: theme.marginHorizontal,
      fontFamily: theme.fontFamily,
      fontSize: theme.fontSize,
      lineHeight: theme.lineHeight,
      backgroundColor: "white",
    },
    sectionTitle: {
      color: theme.primaryColor,
      borderBottom: `2px solid ${theme.primaryColor}`,
      paddingBottom: 4,
      marginBottom: theme.sectionSpacing / 2,
      marginTop: theme.sectionSpacing,
      fontSize: theme.fontSize + 2,
      fontWeight: 600,
      textTransform: "uppercase" as const,
      letterSpacing: 1,
    },
  };

  const renderHeader = () => {
    const data = sectionData.header as HeaderData;

    return (
      <div className="text-center mb-4">
        <h1
          className="font-bold mb-1"
          style={{ fontSize: theme.nameFontSize, color: theme.primaryColor }}
        >
          {data.fullName}
        </h1>
        <p className="mb-2" style={{ fontSize: theme.titleFontSize, color: theme.textColor, opacity: 0.75 }}>
          {data.title}
        </p>
        <div
          className="flex flex-wrap justify-center gap-x-4 gap-y-1"
          style={{ fontSize: theme.fontSize - 1, color: theme.textColor, opacity: 0.75 }}
        >
          {data.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" style={{ color: theme.primaryColor }} />
              {data.email}
            </span>
          )}
          {data.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" style={{ color: theme.primaryColor }} />
              {data.phone}
            </span>
          )}
          {data.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" style={{ color: theme.primaryColor }} />
              {data.location}
            </span>
          )}
          {data.linkedin && (
            <a 
              href={data.linkedinUrl ? ensureProtocol(data.linkedinUrl) : '#'}
              target="_blank"
              rel="noopener noreferrer" 
              className="flex items-center gap-1 hover:underline"
              style={{ color: 'inherit' }}
            >
              <Linkedin className="w-3.5 h-3.5" style={{ color: theme.primaryColor }} />
              {data.linkedin}
            </a>
          )}
          {data.github && (
            <a 
              href={data.githubUrl ? ensureProtocol(data.githubUrl) : '#'}
              target="_blank"
              rel="noopener noreferrer" 
              className="flex items-center gap-1 hover:underline"
              style={{ color: 'inherit' }}
            >
              <Github className="w-3.5 h-3.5" style={{ color: theme.primaryColor }} />
              {data.github}
            </a>
          )}
          {data.website && (
            <a 
              href={data.websiteUrl ? ensureProtocol(data.websiteUrl) : '#'}
              target="_blank"
              rel="noopener noreferrer" 
              className="flex items-center gap-1 hover:underline"
              style={{ color: 'inherit' }}
            >
              <Globe className="w-3.5 h-3.5" style={{ color: theme.primaryColor }} />
              {data.website}
            </a>
          )}
        </div>
      </div>
    );
  };

  const renderSummary = (label: string) => {
    const data = sectionData.summary as SummaryData;
    return (
      <div>
        <h2 style={styles.sectionTitle}>{label}</h2>
        <p style={{ color: theme.textColor }}>{data.content}</p>
      </div>
    );
  };

  const renderExperience = (label: string) => {
    const data = sectionData.experience as ExperienceData;
    return (
      <div>
        <h2 style={styles.sectionTitle}>{label}</h2>
        <div className="space-y-4">
          {data.items.map((item) => (
            <div key={item.id}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold" style={{ color: theme.textColor }}>{item.title}</h3>
                  <p style={{ color: theme.textColor, opacity: 0.75 }}>{item.company} | {item.location}</p>
                </div>
                <p className="text-sm" style={{ color: theme.textColor, opacity: 0.6 }}>
                  {item.startDate} - {item.current ? "Present" : item.endDate}
                </p>
              </div>
              <ul className="list-disc list-inside mt-2 space-y-1" style={{ color: theme.textColor }}>
                {item.bullets.map((bullet) => (
                  <li key={bullet.id}>{bullet.content}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderEducation = (label: string) => {
    const data = sectionData.education as EducationData;
    return (
      <div>
        <h2 style={styles.sectionTitle}>{label}</h2>
        <div className="space-y-3">
          {data.items.map((item) => (
            <div key={item.id}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold" style={{ color: theme.textColor }}>
                    {item.degree} in {item.field}
                  </h3>
                  <p style={{ color: theme.textColor, opacity: 0.75 }}>{item.institution} | {item.location}</p>
                </div>
                <p className="text-sm" style={{ color: theme.textColor, opacity: 0.6 }}>
                  {item.startDate} - {item.endDate}
                </p>
              </div>
              {item.gpa && <p className="text-sm" style={{ color: theme.textColor, opacity: 0.75 }}>GPA: {item.gpa}</p>}
              {item.details && <p className="mt-1" style={{ color: theme.textColor }}>{item.details}</p>}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSkills = (label: string) => {
    const data = sectionData.skills as SkillsData;
    return (
      <div>
        <h2 style={styles.sectionTitle}>{label}</h2>
        <div className="space-y-2">
          {data.categories.map((category) => (
            <div key={category.id} className="flex">
              <span className="font-semibold min-w-[150px]" style={{ color: theme.textColor }}>{category.name}:</span>
              <span style={{ color: theme.textColor }}>{category.skills.join(", ")}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderProjects = (label: string) => {
    const data = sectionData.projects as ProjectsData;
    return (
      <div>
        <h2 style={styles.sectionTitle}>{label}</h2>
        <div className="space-y-4">
          {data.items.map((item) => (
            <div key={item.id}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold" style={{ color: theme.textColor }}>
                    {item.name}
                    {item.link && (
                      <span className="font-normal ml-2" style={{ color: theme.textColor, opacity: 0.6 }}>| {item.link}</span>
                    )}
                  </h3>
                  {item.technologies.length > 0 && (
                    <p className="text-sm" style={{ color: theme.textColor, opacity: 0.75 }}>
                      {item.technologies.join(", ")}
                    </p>
                  )}
                </div>
              </div>
              <ul className="list-disc list-inside mt-2 space-y-1" style={{ color: theme.textColor }}>
                {item.bullets.map((bullet) => (
                  <li key={bullet.id}>{bullet.content}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderCertifications = (label: string) => {
    const data = sectionData.certifications as CertificationsData;
    return (
      <div>
        <h2 style={styles.sectionTitle}>{label}</h2>
        <div className="space-y-1">
          {data.items.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span>
                <span className="font-medium" style={{ color: theme.textColor }}>{item.name}</span>
                {item.issuer && <span style={{ color: theme.textColor, opacity: 0.75 }}> — {item.issuer}</span>}
              </span>
              <span className="text-sm" style={{ color: theme.textColor, opacity: 0.6 }}>{item.date}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderCourses = (label: string) => {
    const data = sectionData.courses as CoursesData;
    if (!data) return null;
    return (
      <div>
        <h2 style={styles.sectionTitle}>{label}</h2>
        <div className="space-y-2">
          {data.items.map((item) => (
            <div key={item.id} className="flex justify-between">
              <div>
                <span className="font-medium" style={{ color: theme.textColor }}>{item.name}</span>
                {item.institution && (
                  <span style={{ color: theme.textColor, opacity: 0.75 }}> — {item.institution}</span>
                )}
              </div>
              <span className="text-sm" style={{ color: theme.textColor, opacity: 0.6 }}>{item.date}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderLanguages = (label: string) => {
    const data = sectionData.languages as LanguagesData;
    if (!data) return null;
    return (
      <div>
        <h2 style={styles.sectionTitle}>{label}</h2>
        <p style={{ color: theme.textColor }}>
          {data.items.map((item) => `${item.language} (${item.proficiency})`).join(", ")}
        </p>
      </div>
    );
  };

  const renderAwards = (label: string) => {
    const data = sectionData.awards as AwardsData;
    if (!data) return null;
    return (
      <div>
        <h2 style={styles.sectionTitle}>{label}</h2>
        <div className="space-y-2">
          {data.items.map((item) => (
            <div key={item.id}>
              <div className="flex justify-between">
                <div>
                  <span className="font-medium" style={{ color: theme.textColor }}>{item.name}</span>
                  {item.issuer && (
                    <span style={{ color: theme.textColor, opacity: 0.75 }}> — {item.issuer}</span>
                  )}
                </div>
                <span className="text-sm" style={{ color: theme.textColor, opacity: 0.6 }}>{item.date}</span>
              </div>
              {item.description && (
                <p className="text-sm mt-1" style={{ color: theme.textColor }}>{item.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderVolunteer = (label: string) => {
    const data = sectionData.volunteer as VolunteerData;
    if (!data) return null;
    return (
      <div>
        <h2 style={styles.sectionTitle}>{label}</h2>
        <div className="space-y-4">
          {data.items.map((item) => (
            <div key={item.id}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold" style={{ color: theme.textColor }}>{item.role}</h3>
                  <p style={{ color: theme.textColor, opacity: 0.75 }}>
                    {item.organization}
                    {item.location && ` | ${item.location}`}
                  </p>
                </div>
                <p className="text-sm" style={{ color: theme.textColor, opacity: 0.6 }}>
                  {item.startDate} - {item.current ? "Present" : item.endDate}
                </p>
              </div>
              {item.bullets.length > 0 && (
                <ul className="list-disc list-inside mt-2 space-y-1" style={{ color: theme.textColor }}>
                  {item.bullets.map((bullet) => (
                    <li key={bullet.id}>{bullet.content}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderInterests = (label: string) => {
    const data = sectionData.interests as InterestsData;
    if (!data) return null;
    return (
      <div>
        <h2 style={styles.sectionTitle}>{label}</h2>
        <p style={{ color: theme.textColor }}>{data.items.join(", ")}</p>
      </div>
    );
  };

  const renderPublications = (label: string) => {
    const data = sectionData.publications as PublicationsData;
    if (!data) return null;
    return (
      <div>
        <h2 style={styles.sectionTitle}>{label}</h2>
        <div className="space-y-2">
          {data.items.map((item) => (
            <div key={item.id}>
              <div className="flex justify-between">
                <div>
                  <span className="font-semibold" style={{ color: theme.textColor }}>{item.title}</span>
                  {item.publisher && (
                    <span style={{ color: theme.textColor, opacity: 0.75 }}> — {item.publisher}</span>
                  )}
                </div>
                <span className="text-sm" style={{ color: theme.textColor, opacity: 0.6 }}>{item.date}</span>
              </div>
              {item.description && (
                <p className="text-sm mt-1" style={{ color: theme.textColor }}>{item.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderReferences = (label: string) => {
    const data = sectionData.references as ReferencesData;
    if (!data) return null;
    return (
      <div>
        <h2 style={styles.sectionTitle}>{label}</h2>
        <div className="space-y-3">
          {data.items.map((item) => (
            <div key={item.id}>
              <p className="font-semibold" style={{ color: theme.textColor }}>{item.name}</p>
              <p className="text-sm" style={{ color: theme.textColor, opacity: 0.75 }}>
                {item.title}
                {item.company && `, ${item.company}`}
              </p>
              {item.email && <p className="text-sm" style={{ color: theme.textColor, opacity: 0.6 }}>{item.email}</p>}
              {item.phone && <p className="text-sm" style={{ color: theme.textColor, opacity: 0.6 }}>{item.phone}</p>}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderCustomSection = (sectionId: string, label: string) => {
    const data = sectionData[sectionId] as CustomSectionData;
    if (!data) return null;

    return (
      <div>
        <h2 style={styles.sectionTitle}>{label}</h2>
        <div className="space-y-3">
          {data.items.map((item) => (
            <div key={item.id}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold" style={{ color: theme.textColor }}>{item.title}</h3>
                  {item.subtitle && <p style={{ color: theme.textColor, opacity: 0.75 }}>{item.subtitle}</p>}
                </div>
                {item.date && <p className="text-sm" style={{ color: theme.textColor, opacity: 0.6 }}>{item.date}</p>}
              </div>
              {item.description && <p className="mt-1" style={{ color: theme.textColor }}>{item.description}</p>}
              {item.bullets.length > 0 && (
                <ul className="list-disc list-inside mt-2 space-y-1" style={{ color: theme.textColor }}>
                  {item.bullets.map((bullet) => (
                    <li key={bullet.id}>{bullet.content}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
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
      case "courses":
        return renderCourses(section.label);
      case "languages":
        return renderLanguages(section.label);
      case "awards":
        return renderAwards(section.label);
      case "volunteer":
        return renderVolunteer(section.label);
      case "interests":
        return renderInterests(section.label);
      case "publications":
        return renderPublications(section.label);
      case "references":
        return renderReferences(section.label);
      case "custom":
        return renderCustomSection(section.id, section.label);
      default:
        return null;
    }
  };

  return (
    <div style={styles.page} id="resume-preview">
      {visibleSections.map((section) => (
        <div key={section.id}>{renderSection(section)}</div>
      ))}
    </div>
  );
}
