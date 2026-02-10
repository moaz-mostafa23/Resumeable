"use client";

import { useResume } from "@/hooks/useResume";
import { RichTextInline } from "@/components/preview/RichTextInline";
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
 * Modern Minimal Template
 * Contemporary single-column design with accent colors and skill chips.
 */
export function ModernMinimalPreview() {
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
      borderLeft: `4px solid ${theme.primaryColor}`,
      paddingLeft: 12,
      marginBottom: theme.sectionSpacing / 2,
      marginTop: theme.sectionSpacing,
      fontSize: theme.fontSize + 3,
      fontWeight: 600,
    },
  };

  const alignClass = theme.textAlign === 'center' ? 'text-center' : theme.textAlign === 'right' ? 'text-right' : 'text-left';
  const isCentered = theme.textAlign === 'center';

  const renderHeader = () => {
    const data = sectionData.header as HeaderData;
    return (
      <div className={`${alignClass} mb-6`}>
        {data.photoUrl ? (
          <div className={`mb-3 ${isCentered ? "flex justify-center" : theme.textAlign === "right" ? "flex justify-end" : "flex justify-start"}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data.photoUrl}
              alt={data.fullName}
              className="h-20 w-20 rounded-full object-cover"
              style={{ border: `2px solid ${theme.primaryColor}30` }}
            />
          </div>
        ) : null}
        {isCentered ? (
          <>
            <h1
              className="font-bold mb-1 text-center"
              style={{ fontSize: theme.nameFontSize, color: theme.primaryColor }}
            >
              {data.fullName}
            </h1>
            <p className="mb-3 text-center" style={{ fontSize: theme.titleFontSize, color: theme.textColor, opacity: 0.75 }}>
              {data.title}
            </p>
          </>
        ) : (
          <div className={`flex items-baseline gap-3 mb-3 ${theme.textAlign === 'right' ? 'justify-end' : 'justify-start'}`}>
            <h1
              className="font-bold"
              style={{ fontSize: theme.nameFontSize, color: theme.primaryColor }}
            >
              {data.fullName}
            </h1>
            <p style={{ fontSize: theme.titleFontSize, color: theme.textColor, opacity: 0.75 }}>
              {data.title}
            </p>
          </div>
        )}
        <div
          className={`flex flex-wrap ${isCentered ? 'justify-center' : theme.textAlign === 'right' ? 'justify-end' : 'justify-start'} gap-x-4 gap-y-1`}
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
        <p className="leading-relaxed" style={{ color: theme.textColor }}>{data.content}</p>
      </div>
    );
  };

  const renderExperience = (label: string) => {
    const data = sectionData.experience as ExperienceData;
    return (
      <div>
        <h2 style={styles.sectionTitle}>{label}</h2>
        <div className="space-y-5">
          {data.items.map((item) => (
            <div key={item.id}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold" style={{ color: theme.textColor }}>{item.title}</h3>
                  <p style={{ color: theme.textColor, opacity: 0.75 }}>{item.company} • {item.location}</p>
                </div>
                <p 
                  className="text-sm font-medium px-2 py-0.5 rounded"
                  style={{ backgroundColor: `${theme.primaryColor}15`, color: theme.primaryColor }}
                >
                  {item.startDate} - {item.current ? "Present" : item.endDate}
                </p>
              </div>
              <ul className="preview-rich-bullets mt-2 space-y-1.5" style={{ color: theme.textColor }}>
                {item.bullets.map((bullet) => (
                  <li key={bullet.id} className="flex items-start gap-2">
                    <span 
                      className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: theme.primaryColor }}
                    />
                    <RichTextInline html={bullet.content} />
                  </li>
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
        <div className="space-y-4">
          {data.items.map((item) => (
            <div key={item.id}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold" style={{ color: theme.textColor }}>
                    {item.degree} in {item.field}
                  </h3>
                  <p style={{ color: theme.textColor, opacity: 0.75 }}>{item.institution} • {item.location}</p>
                </div>
                <p 
                  className="text-sm font-medium px-2 py-0.5 rounded"
                  style={{ backgroundColor: `${theme.primaryColor}15`, color: theme.primaryColor }}
                >
                  {item.startDate} - {item.endDate}
                </p>
              </div>
              {item.gpa && <p className="text-sm mt-1" style={{ color: theme.textColor, opacity: 0.75 }}>GPA: {item.gpa}</p>}
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
        <div className="space-y-3">
          {data.categories.map((category) => (
            <div key={category.id}>
              <span className="font-medium" style={{ color: theme.textColor }}>{category.name}</span>
              <div className="flex flex-wrap gap-2 mt-1.5">
                {category.skills.map((skill, idx) => (
                  <span 
                    key={idx}
                    className="px-2.5 py-1 text-sm rounded-md"
                    style={{ 
                      backgroundColor: `${theme.primaryColor}10`,
                      color: theme.primaryColor,
                      border: `1px solid ${theme.primaryColor}30`
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
              <div>
                <h3 className="font-semibold" style={{ color: theme.textColor }}>
                  {item.name}
                  {item.link && (
                    <span className="font-normal ml-2 text-sm" style={{ color: theme.textColor, opacity: 0.6 }}>({item.link})</span>
                  )}
                </h3>
                {item.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {item.technologies.map((tech, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-0.5 text-xs rounded"
                        style={{ backgroundColor: '#f3f4f6', color: '#374151' }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <ul className="preview-rich-bullets mt-2 space-y-1" style={{ color: theme.textColor }}>
                {item.bullets.map((bullet) => (
                  <li key={bullet.id} className="flex items-start gap-2">
                    <span 
                      className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: theme.primaryColor }}
                    />
                    <RichTextInline html={bullet.content} />
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
        <h2 style={styles.sectionTitle}>{label}</h2>
        <div className="space-y-2">
          {data.items.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
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
                {item.institution && <span style={{ color: theme.textColor, opacity: 0.75 }}> — {item.institution}</span>}
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
        <div className="flex flex-wrap gap-3">
          {data.items.map((item) => (
            <div 
              key={item.id}
              className="px-3 py-1.5 rounded-md"
              style={{ backgroundColor: `${theme.primaryColor}10` }}
            >
              <span className="font-medium" style={{ color: theme.primaryColor }}>{item.language}</span>
              <span className="text-sm ml-1" style={{ color: theme.textColor, opacity: 0.75 }}>({item.proficiency})</span>
            </div>
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
        <h2 style={styles.sectionTitle}>{label}</h2>
        <div className="space-y-2">
          {data.items.map((item) => (
            <div key={item.id}>
              <div className="flex justify-between">
                <div>
                  <span className="font-medium" style={{ color: theme.textColor }}>{item.name}</span>
                  {item.issuer && <span style={{ color: theme.textColor, opacity: 0.75 }}> — {item.issuer}</span>}
                </div>
                <span className="text-sm" style={{ color: theme.textColor, opacity: 0.6 }}>{item.date}</span>
              </div>
              {item.description && <p className="text-sm mt-1" style={{ color: theme.textColor }}>{item.description}</p>}
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
                  <p style={{ color: theme.textColor, opacity: 0.75 }}>{item.organization}{item.location && ` • ${item.location}`}</p>
                </div>
                <p 
                  className="text-sm font-medium px-2 py-0.5 rounded"
                  style={{ backgroundColor: `${theme.primaryColor}15`, color: theme.primaryColor }}
                >
                  {item.startDate} - {item.current ? "Present" : item.endDate}
                </p>
              </div>
              {item.bullets.length > 0 && (
                <ul className="preview-rich-bullets mt-2 space-y-1" style={{ color: theme.textColor }}>
                  {item.bullets.map((bullet) => (
                    <li key={bullet.id} className="flex items-start gap-2">
                      <span 
                        className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                        style={{ backgroundColor: theme.primaryColor }}
                      />
                      <RichTextInline html={bullet.content} />
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

  const renderInterests = (label: string) => {
    const data = sectionData.interests as InterestsData;
    if (!data) return null;
    return (
      <div>
        <h2 style={styles.sectionTitle}>{label}</h2>
        <div className="flex flex-wrap gap-2">
          {data.items.map((item, idx) => (
            <span 
              key={idx}
              className="px-3 py-1 rounded-full text-sm"
              style={{ backgroundColor: '#f3f4f6', color: '#374151' }}
            >
              {item}
            </span>
          ))}
        </div>
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
                  {item.publisher && <span style={{ color: theme.textColor, opacity: 0.75 }}> — {item.publisher}</span>}
                </div>
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
        <h2 style={styles.sectionTitle}>{label}</h2>
        <div className="grid grid-cols-2 gap-4">
          {data.items.map((item) => (
            <div key={item.id} className="p-3 rounded-lg" style={{ backgroundColor: '#f9fafb' }}>
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
                <ul className="preview-rich-bullets mt-2 space-y-1" style={{ color: theme.textColor }}>
                  {item.bullets.map((bullet) => (
                    <li key={bullet.id} className="flex items-start gap-2">
                      <span 
                        className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                        style={{ backgroundColor: theme.primaryColor }}
                      />
                      <RichTextInline html={bullet.content} />
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
