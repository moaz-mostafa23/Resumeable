"use client";

import { useResumeStore } from "@/store/useResumeStore";
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

// Helper to extract display text from URL
function getLinkDisplayText(url: string, type: 'linkedin' | 'github' | 'website'): string {
  try {
    // Remove protocol and www
    let cleaned = url.replace(/^(https?:\/\/)?(www\.)?/, '');
    
    if (type === 'linkedin') {
      // Extract LinkedIn username: linkedin.com/in/username -> username
      const match = cleaned.match(/linkedin\.com\/in\/([^/?]+)/);
      return match ? match[1] : cleaned.replace(/\/$/, '');
    }
    
    if (type === 'github') {
      // Extract GitHub username: github.com/username -> username
      const match = cleaned.match(/github\.com\/([^/?]+)/);
      return match ? match[1] : cleaned.replace(/\/$/, '');
    }
    
    // Website: just show domain without trailing slash
    return cleaned.replace(/\/$/, '');
  } catch {
    return url;
  }
}

// Helper to ensure URL has protocol
function ensureProtocol(url: string): string {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  return url;
}

/**
 * Corporate Timeline Template
 * Executive-style chronological layout with date rail alignment.
 * Professional look for experienced candidates.
 */
export function CorporateTimelinePreview() {
  const { resume } = useResumeStore();

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
      fontSize: theme.fontSize + 3,
      fontWeight: 700,
      marginBottom: theme.sectionSpacing / 2,
      marginTop: theme.sectionSpacing,
      textTransform: "uppercase" as const,
      letterSpacing: 2,
      display: "flex",
      alignItems: "center",
      gap: 12,
    },
  };

  const dateColumnWidth = 130;

  const renderHeader = () => {
    const data = sectionData.header as HeaderData;

    return (
      <div 
        className="mb-6 pb-4"
        style={{ borderBottom: `3px solid ${theme.primaryColor}` }}
      >
        <h1
          className="font-bold mb-1"
          style={{ fontSize: theme.nameFontSize, color: theme.primaryColor }}
        >
          {data.fullName}
        </h1>
        <p className="text-gray-600 mb-3 font-medium" style={{ fontSize: theme.titleFontSize }}>
          {data.title}
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-1 text-gray-600" style={{ fontSize: theme.fontSize - 1 }}>
          {data.email && (
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" style={{ color: theme.primaryColor }} />
              {data.email}
            </span>
          )}
          {data.phone && (
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" style={{ color: theme.primaryColor }} />
              {data.phone}
            </span>
          )}
          {data.location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" style={{ color: theme.primaryColor }} />
              {data.location}
            </span>
          )}
          {data.linkedin && (
            <a 
              href={ensureProtocol(data.linkedin)} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:underline"
              style={{ color: 'inherit' }}
            >
              <Linkedin className="w-3.5 h-3.5" style={{ color: theme.primaryColor }} />
              {getLinkDisplayText(data.linkedin, 'linkedin')}
            </a>
          )}
          {data.github && (
            <a 
              href={ensureProtocol(data.github)} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:underline"
              style={{ color: 'inherit' }}
            >
              <Github className="w-3.5 h-3.5" style={{ color: theme.primaryColor }} />
              {getLinkDisplayText(data.github, 'github')}
            </a>
          )}
          {data.website && (
            <a 
              href={ensureProtocol(data.website)} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:underline"
              style={{ color: 'inherit' }}
            >
              <Globe className="w-3.5 h-3.5" style={{ color: theme.primaryColor }} />
              {getLinkDisplayText(data.website, 'website')}
            </a>
          )}
        </div>
      </div>
    );
  };

  const SectionDivider = () => (
    <div className="flex items-center gap-3 flex-grow">
      <div 
        className="flex-grow h-0.5" 
        style={{ backgroundColor: `${theme.primaryColor}30` }} 
      />
    </div>
  );

  const renderSummary = (label: string) => {
    const data = sectionData.summary as SummaryData;
    return (
      <div>
        <h2 style={styles.sectionTitle}>
          {label}
          <SectionDivider />
        </h2>
        <p className="text-gray-700 italic">{data.content}</p>
      </div>
    );
  };

  const renderExperience = (label: string) => {
    const data = sectionData.experience as ExperienceData;
    return (
      <div>
        <h2 style={styles.sectionTitle}>
          {label}
          <SectionDivider />
        </h2>
        <div className="space-y-5">
          {data.items.map((item) => (
            <div key={item.id} className="flex">
              {/* Date Column */}
              <div 
                className="flex-shrink-0 text-right pr-6"
                style={{ width: dateColumnWidth }}
              >
                <p 
                  className="font-semibold text-sm"
                  style={{ color: theme.primaryColor }}
                >
                  {item.startDate}
                </p>
                <p className="text-gray-500 text-sm">
                  {item.current ? "Present" : item.endDate}
                </p>
              </div>
              {/* Timeline Line */}
              <div className="flex flex-col items-center mr-6">
                <div 
                  className="w-3 h-3 rounded-full border-2 flex-shrink-0"
                  style={{ borderColor: theme.primaryColor, backgroundColor: 'white' }}
                />
                <div 
                  className="w-0.5 flex-grow"
                  style={{ backgroundColor: `${theme.primaryColor}30` }}
                />
              </div>
              {/* Content */}
              <div className="flex-grow pb-2">
                <h3 className="font-bold text-gray-900">{item.title}</h3>
                <p className="text-gray-600 font-medium">
                  {item.company}
                  <span className="text-gray-400 font-normal"> — {item.location}</span>
                </p>
                <ul className="mt-2 space-y-1 text-gray-700">
                  {item.bullets.map((bullet) => (
                    <li key={bullet.id} className="flex items-start gap-2">
                      <span className="text-gray-400 mt-0.5">›</span>
                      {bullet.content}
                    </li>
                  ))}
                </ul>
              </div>
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
        <h2 style={styles.sectionTitle}>
          {label}
          <SectionDivider />
        </h2>
        <div className="space-y-4">
          {data.items.map((item) => (
            <div key={item.id} className="flex">
              <div 
                className="flex-shrink-0 text-right pr-6"
                style={{ width: dateColumnWidth }}
              >
                <p className="font-semibold text-sm" style={{ color: theme.primaryColor }}>
                  {item.startDate}
                </p>
                <p className="text-gray-500 text-sm">{item.endDate}</p>
              </div>
              <div className="flex flex-col items-center mr-6">
                <div 
                  className="w-3 h-3 rounded-full border-2 flex-shrink-0"
                  style={{ borderColor: theme.primaryColor, backgroundColor: 'white' }}
                />
                <div 
                  className="w-0.5 flex-grow"
                  style={{ backgroundColor: `${theme.primaryColor}30` }}
                />
              </div>
              <div className="flex-grow">
                <h3 className="font-bold text-gray-900">{item.degree} in {item.field}</h3>
                <p className="text-gray-600">{item.institution}, {item.location}</p>
                {item.gpa && <p className="text-gray-600 text-sm mt-1">GPA: {item.gpa}</p>}
                {item.details && <p className="text-gray-700 mt-1">{item.details}</p>}
              </div>
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
        <h2 style={styles.sectionTitle}>
          {label}
          <SectionDivider />
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {data.categories.map((category) => (
            <div key={category.id}>
              <h4 className="font-semibold text-gray-900 mb-1">{category.name}</h4>
              <p className="text-gray-700">{category.skills.join(", ")}</p>
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
        <h2 style={styles.sectionTitle}>
          {label}
          <SectionDivider />
        </h2>
        <div className="space-y-4">
          {data.items.map((item) => (
            <div key={item.id}>
              <h3 className="font-bold text-gray-900">
                {item.name}
                {item.link && (
                  <span className="font-normal text-gray-500 ml-2 text-sm">({item.link})</span>
                )}
              </h3>
              {item.technologies.length > 0 && (
                <p className="text-gray-600 text-sm italic">{item.technologies.join(", ")}</p>
              )}
              <ul className="mt-2 space-y-1 text-gray-700">
                {item.bullets.map((bullet) => (
                  <li key={bullet.id} className="flex items-start gap-2">
                    <span className="text-gray-400 mt-0.5">›</span>
                    {bullet.content}
                  </li>
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
        <h2 style={styles.sectionTitle}>
          {label}
          <SectionDivider />
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {data.items.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span>
                <span className="font-medium">{item.name}</span>
                {item.issuer && <span className="text-gray-600 text-sm"> — {item.issuer}</span>}
              </span>
              <span className="text-gray-500 text-sm">{item.date}</span>
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
        <h2 style={styles.sectionTitle}>
          {label}
          <SectionDivider />
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {data.items.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span>
                <span className="font-medium">{item.name}</span>
                {item.institution && <span className="text-gray-600"> — {item.institution}</span>}
              </span>
              <span className="text-gray-500 text-sm">{item.date}</span>
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
        <h2 style={styles.sectionTitle}>
          {label}
          <SectionDivider />
        </h2>
        <div className="flex flex-wrap gap-4">
          {data.items.map((item) => (
            <span key={item.id}>
              <span className="font-semibold">{item.language}</span>
              <span className="text-gray-600 text-sm ml-1">({item.proficiency})</span>
            </span>
          ))}
        </div>
      </div>
    );
  };

  const renderAwards = (label: string) => {
    const data = sectionData.awards as AwardsData;
    if (!data) return null;
    return (
      <div>
        <h2 style={styles.sectionTitle}>
          {label}
          <SectionDivider />
        </h2>
        <div className="space-y-2">
          {data.items.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span>
                <span className="font-medium">{item.name}</span>
                {item.issuer && <span className="text-gray-600"> — {item.issuer}</span>}
              </span>
              <span className="text-gray-500 text-sm">{item.date}</span>
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
        <h2 style={styles.sectionTitle}>
          {label}
          <SectionDivider />
        </h2>
        <div className="space-y-4">
          {data.items.map((item) => (
            <div key={item.id} className="flex">
              <div className="flex-shrink-0 text-right pr-6" style={{ width: dateColumnWidth }}>
                <p className="font-semibold text-sm" style={{ color: theme.primaryColor }}>
                  {item.startDate}
                </p>
                <p className="text-gray-500 text-sm">{item.current ? "Present" : item.endDate}</p>
              </div>
              <div className="flex flex-col items-center mr-6">
                <div 
                  className="w-3 h-3 rounded-full border-2 flex-shrink-0"
                  style={{ borderColor: theme.primaryColor, backgroundColor: 'white' }}
                />
                <div 
                  className="w-0.5 flex-grow"
                  style={{ backgroundColor: `${theme.primaryColor}30` }}
                />
              </div>
              <div className="flex-grow">
                <h3 className="font-bold">{item.role}</h3>
                <p className="text-gray-600">{item.organization}{item.location && `, ${item.location}`}</p>
                {item.bullets.length > 0 && (
                  <ul className="mt-2 space-y-1 text-gray-700">
                    {item.bullets.map((bullet) => (
                      <li key={bullet.id} className="flex items-start gap-2">
                        <span className="text-gray-400 mt-0.5">›</span>
                        {bullet.content}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
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
        <h2 style={styles.sectionTitle}>
          {label}
          <SectionDivider />
        </h2>
        <p className="text-gray-700">{data.items.join(" • ")}</p>
      </div>
    );
  };

  const renderPublications = (label: string) => {
    const data = sectionData.publications as PublicationsData;
    if (!data) return null;
    return (
      <div>
        <h2 style={styles.sectionTitle}>
          {label}
          <SectionDivider />
        </h2>
        <div className="space-y-2">
          {data.items.map((item) => (
            <div key={item.id}>
              <div className="flex justify-between">
                <span>
                  <span className="font-semibold">{item.title}</span>
                  {item.publisher && <span className="text-gray-600"> — {item.publisher}</span>}
                </span>
                <span className="text-gray-500 text-sm">{item.date}</span>
              </div>
              {item.description && <p className="text-gray-700 text-sm mt-1">{item.description}</p>}
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
        <h2 style={styles.sectionTitle}>
          {label}
          <SectionDivider />
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {data.items.map((item) => (
            <div key={item.id}>
              <p className="font-semibold">{item.name}</p>
              <p className="text-gray-600 text-sm">{item.title}{item.company && `, ${item.company}`}</p>
              {item.email && <p className="text-gray-500 text-sm">{item.email}</p>}
              {item.phone && <p className="text-gray-500 text-sm">{item.phone}</p>}
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
        <h2 style={styles.sectionTitle}>
          {label}
          <SectionDivider />
        </h2>
        <div className="space-y-3">
          {data.items.map((item) => (
            <div key={item.id}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  {item.subtitle && <p className="text-gray-600">{item.subtitle}</p>}
                </div>
                {item.date && <p className="text-gray-500 text-sm">{item.date}</p>}
              </div>
              {item.description && <p className="text-gray-700 mt-1">{item.description}</p>}
              {item.bullets.length > 0 && (
                <ul className="mt-2 space-y-1 text-gray-700">
                  {item.bullets.map((bullet) => (
                    <li key={bullet.id} className="flex items-start gap-2">
                      <span className="text-gray-400 mt-0.5">›</span>
                      {bullet.content}
                    </li>
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
    <div style={styles.page} id="resume-preview">
      {visibleSections.map((section) => (
        <div key={section.id}>{renderSection(section)}</div>
      ))}
    </div>
  );
}
