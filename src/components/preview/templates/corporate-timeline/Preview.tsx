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
 * Corporate Timeline Template
 * Executive-style chronological layout with date rail alignment.
 * Professional look for experienced candidates.
 */
export function CorporateTimelinePreview() {
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
        <div className="mb-3 flex items-center gap-4">
          {data.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.photoUrl}
              alt={data.fullName}
              className="h-20 w-20 rounded-full object-cover"
              style={{ border: `2px solid ${theme.primaryColor}30` }}
            />
          ) : null}
          <div>
            <h1
              className="font-bold mb-1"
              style={{ fontSize: theme.nameFontSize, color: theme.primaryColor }}
            >
              {data.fullName}
            </h1>
            <p className="font-medium" style={{ fontSize: theme.titleFontSize, color: theme.textColor, opacity: 0.75 }}>
              {data.title}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-1" style={{ fontSize: theme.fontSize - 1, color: theme.textColor, opacity: 0.75 }}>
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
              href={data.linkedinUrl ? ensureProtocol(data.linkedinUrl) : '#'} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:underline"
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
              className="flex items-center gap-1.5 hover:underline"
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
              className="flex items-center gap-1.5 hover:underline"
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
        <p className="italic" style={{ color: theme.textColor }}>{data.content}</p>
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
                <p className="text-sm" style={{ color: theme.textColor, opacity: 0.6 }}>
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
                <h3 className="font-bold" style={{ color: theme.textColor }}>{item.title}</h3>
                <p className="font-medium" style={{ color: theme.textColor, opacity: 0.75 }}>
                  {item.company}
                  <span className="font-normal" style={{ color: theme.textColor, opacity: 0.5 }}> — {item.location}</span>
                </p>
                <ul className="mt-2 space-y-1" style={{ color: theme.textColor }}>
                  {item.bullets.map((bullet) => (
                    <li key={bullet.id} className="flex items-start gap-2">
                      <span style={{ color: theme.textColor, opacity: 0.5 }} className="mt-0.5">›</span>
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
                <p className="text-sm" style={{ color: theme.textColor, opacity: 0.6 }}>{item.endDate}</p>
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
                <h3 className="font-bold" style={{ color: theme.textColor }}>{item.degree} in {item.field}</h3>
                <p style={{ color: theme.textColor, opacity: 0.75 }}>{item.institution}, {item.location}</p>
                {item.gpa && <p className="text-sm mt-1" style={{ color: theme.textColor, opacity: 0.75 }}>GPA: {item.gpa}</p>}
                {item.details && <p className="mt-1" style={{ color: theme.textColor }}>{item.details}</p>}
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
              <h4 className="font-semibold mb-1" style={{ color: theme.textColor }}>{category.name}</h4>
              <p style={{ color: theme.textColor }}>{category.skills.join(", ")}</p>
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
              <h3 className="font-bold" style={{ color: theme.textColor }}>
                {item.name}
                {item.link && (
                  <span className="font-normal ml-2 text-sm" style={{ color: theme.textColor, opacity: 0.6 }}>({item.link})</span>
                )}
              </h3>
              {item.technologies.length > 0 && (
                <p className="text-sm italic" style={{ color: theme.textColor, opacity: 0.75 }}>{item.technologies.join(", ")}</p>
              )}
              <ul className="mt-2 space-y-1" style={{ color: theme.textColor }}>
                {item.bullets.map((bullet) => (
                  <li key={bullet.id} className="flex items-start gap-2">
                    <span style={{ color: theme.textColor, opacity: 0.5 }} className="mt-0.5">›</span>
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
                <span className="font-medium" style={{ color: theme.textColor }}>{item.name}</span>
                {item.issuer && <span className="text-sm" style={{ color: theme.textColor, opacity: 0.75 }}> — {item.issuer}</span>}
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
        <h2 style={styles.sectionTitle}>
          {label}
          <SectionDivider />
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {data.items.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span>
                <span className="font-medium" style={{ color: theme.textColor }}>{item.name}</span>
                {item.institution && <span style={{ color: theme.textColor, opacity: 0.75 }}> — {item.institution}</span>}
              </span>
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
        <h2 style={styles.sectionTitle}>
          {label}
          <SectionDivider />
        </h2>
        <div className="flex flex-wrap gap-4">
          {data.items.map((item) => (
            <span key={item.id}>
              <span className="font-semibold" style={{ color: theme.textColor }}>{item.language}</span>
              <span className="text-sm ml-1" style={{ color: theme.textColor, opacity: 0.75 }}>({item.proficiency})</span>
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
                <p className="text-sm" style={{ color: theme.textColor, opacity: 0.6 }}>{item.current ? "Present" : item.endDate}</p>
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
                <h3 className="font-bold" style={{ color: theme.textColor }}>{item.role}</h3>
                <p style={{ color: theme.textColor, opacity: 0.75 }}>{item.organization}{item.location && `, ${item.location}`}</p>
                {item.bullets.length > 0 && (
                  <ul className="mt-2 space-y-1" style={{ color: theme.textColor }}>
                    {item.bullets.map((bullet) => (
                      <li key={bullet.id} className="flex items-start gap-2">
                        <span style={{ color: theme.textColor, opacity: 0.5 }} className="mt-0.5">›</span>
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
        <p style={{ color: theme.textColor }}>{data.items.join(" • ")}</p>
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
                  <span className="font-semibold" style={{ color: theme.textColor }}>{item.title}</span>
                  {item.publisher && <span style={{ color: theme.textColor, opacity: 0.75 }}> — {item.publisher}</span>}
                </span>
                <span className="text-sm" style={{ color: theme.textColor, opacity: 0.6 }}>{item.date}</span>
              </div>
              {item.description && <p className="text-sm mt-1" style={{ color: theme.textColor }}>{item.description}</p>}
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
              <p className="font-semibold" style={{ color: theme.textColor }}>{item.name}</p>
              <p className="text-sm" style={{ color: theme.textColor, opacity: 0.75 }}>{item.title}{item.company && `, ${item.company}`}</p>
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
        <h2 style={styles.sectionTitle}>
          {label}
          <SectionDivider />
        </h2>
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
                <ul className="mt-2 space-y-1" style={{ color: theme.textColor }}>
                  {item.bullets.map((bullet) => (
                    <li key={bullet.id} className="flex items-start gap-2">
                      <span style={{ color: theme.textColor, opacity: 0.5 }} className="mt-0.5">›</span>
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
