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
  SectionConfig,
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
 * Two-Column Sidebar Template
 * Professional layout with sidebar for skills/contact and main content area.
 */
export function TwoColumnSidebarPreview() {
  const { resume } = useResumeStore();

  if (!resume) return null;

  const { sections, sectionData, theme } = resume;
  const visibleSections = sections.filter((s) => s.visible).sort((a, b) => a.order - b.order);

  // Sidebar sections: header info, skills, languages, interests, certifications
  const sidebarTypes = ['skills', 'languages', 'interests', 'certifications', 'courses'];
  const sidebarSections = visibleSections.filter(s => sidebarTypes.includes(s.type));
  const mainSections = visibleSections.filter(s => !sidebarTypes.includes(s.type) && s.type !== 'header');

  const sectionTitleStyle = {
    fontSize: theme.fontSize + 1,
    fontWeight: 600,
    marginBottom: 8,
    paddingBottom: 4,
    borderBottom: `1px solid rgba(255,255,255,0.3)`,
  };

  const mainSectionTitleStyle = {
    color: theme.primaryColor,
    fontSize: theme.fontSize + 2,
    fontWeight: 600,
    marginBottom: theme.sectionSpacing / 2,
    marginTop: theme.sectionSpacing,
    borderBottom: `2px solid ${theme.primaryColor}`,
    paddingBottom: 4,
    textTransform: "uppercase" as const,
    letterSpacing: 1,
  };

  const renderSidebarHeader = () => {
    const data = sectionData.header as HeaderData;
    return (
      <div className="mb-6">
        <h1
          className="font-bold mb-2"
          style={{ fontSize: theme.nameFontSize - 4, color: 'white' }}
        >
          {data.fullName}
        </h1>
        <p className="text-white/80 mb-4" style={{ fontSize: theme.titleFontSize - 2 }}>
          {data.title}
        </p>
        <div className="space-y-2 text-white/90" style={{ fontSize: theme.fontSize - 1 }}>
          {data.email && (
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 flex-shrink-0" />
              <span className="break-all">{data.email}</span>
            </div>
          )}
          {data.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span>{data.phone}</span>
            </div>
          )}
          {data.location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span>{data.location}</span>
            </div>
          )}
          {data.linkedin && (
            <a 
              href={data.linkedinUrl ? ensureProtocol(data.linkedinUrl) : '#'}
              target="_blank"
              rel="noopener noreferrer" 
              className="flex items-center gap-2 hover:underline"
            >
              <Linkedin className="w-4 h-4 flex-shrink-0" />
              <span className="break-all">{data.linkedin}</span>
            </a>
          )}
          {data.github && (
            <a 
              href={data.githubUrl ? ensureProtocol(data.githubUrl) : '#'}
              target="_blank"
              rel="noopener noreferrer" 
              className="flex items-center gap-2 hover:underline"
            >
              <Github className="w-4 h-4 flex-shrink-0" />
              <span className="break-all">{data.github}</span>
            </a>
          )}
          {data.website && (
            <a 
              href={data.websiteUrl ? ensureProtocol(data.websiteUrl) : '#'}
              target="_blank"
              rel="noopener noreferrer" 
              className="flex items-center gap-2 hover:underline"
            >
              <Globe className="w-4 h-4 flex-shrink-0" />
              <span className="break-all">{data.website}</span>
            </a>
          )}
        </div>
      </div>
    );
  };

  const renderSidebarSkills = (label: string) => {
    const data = sectionData.skills as SkillsData;
    if (!data) return null;
    return (
      <div className="mb-5">
        <h3 style={sectionTitleStyle} className="text-white">{label}</h3>
        <div className="space-y-3">
          {data.categories.map((category) => (
            <div key={category.id}>
              <p className="text-white/80 font-medium text-sm mb-1">{category.name}</p>
              <div className="flex flex-wrap gap-1.5">
                {category.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 text-xs rounded bg-white/20 text-white"
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

  const renderSidebarLanguages = (label: string) => {
    const data = sectionData.languages as LanguagesData;
    if (!data) return null;
    return (
      <div className="mb-5">
        <h3 style={sectionTitleStyle} className="text-white">{label}</h3>
        <div className="space-y-1">
          {data.items.map((item) => (
            <div key={item.id} className="flex justify-between text-white/90 text-sm">
              <span>{item.language}</span>
              <span className="text-white/70 capitalize">{item.proficiency}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSidebarInterests = (label: string) => {
    const data = sectionData.interests as InterestsData;
    if (!data) return null;
    return (
      <div className="mb-5">
        <h3 style={sectionTitleStyle} className="text-white">{label}</h3>
        <div className="flex flex-wrap gap-1.5">
          {data.items.map((item, idx) => (
            <span key={idx} className="px-2 py-0.5 text-xs rounded bg-white/20 text-white">
              {item}
            </span>
          ))}
        </div>
      </div>
    );
  };

  const renderSidebarCertifications = (label: string) => {
    const data = sectionData.certifications as CertificationsData;
    if (!data) return null;
    return (
      <div className="mb-5">
        <h3 style={sectionTitleStyle} className="text-white">{label}</h3>
        <div className="space-y-2 text-sm">
          {data.items.map((item) => (
            <div key={item.id} className="text-white/90">
              <p className="font-medium">{item.name}</p>
              {item.issuer && <p className="text-white/70 text-xs">{item.issuer}</p>}
              <p className="text-white/60 text-xs">{item.date}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSidebarCourses = (label: string) => {
    const data = sectionData.courses as CoursesData;
    if (!data) return null;
    return (
      <div className="mb-5">
        <h3 style={sectionTitleStyle} className="text-white">{label}</h3>
        <div className="space-y-2 text-sm">
          {data.items.map((item) => (
            <div key={item.id} className="text-white/90">
              <p className="font-medium">{item.name}</p>
              {item.institution && <p className="text-white/70 text-xs">{item.institution}</p>}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSidebarSection = (section: SectionConfig) => {
    switch (section.type) {
      case 'skills': return renderSidebarSkills(section.label);
      case 'languages': return renderSidebarLanguages(section.label);
      case 'interests': return renderSidebarInterests(section.label);
      case 'certifications': return renderSidebarCertifications(section.label);
      case 'courses': return renderSidebarCourses(section.label);
      default: return null;
    }
  };

  // Main content renderers
  const renderSummary = (label: string) => {
    const data = sectionData.summary as SummaryData;
    return (
      <div>
        <h2 style={mainSectionTitleStyle}>{label}</h2>
        <p className="text-gray-700">{data.content}</p>
      </div>
    );
  };

  const renderExperience = (label: string) => {
    const data = sectionData.experience as ExperienceData;
    return (
      <div>
        <h2 style={mainSectionTitleStyle}>{label}</h2>
        <div className="space-y-4">
          {data.items.map((item) => (
            <div key={item.id}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-gray-600">{item.company} | {item.location}</p>
                </div>
                <p className="text-gray-500 text-sm whitespace-nowrap">
                  {item.startDate} - {item.current ? "Present" : item.endDate}
                </p>
              </div>
              <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
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
        <h2 style={mainSectionTitleStyle}>{label}</h2>
        <div className="space-y-3">
          {data.items.map((item) => (
            <div key={item.id}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{item.degree} in {item.field}</h3>
                  <p className="text-gray-600">{item.institution} | {item.location}</p>
                </div>
                <p className="text-gray-500 text-sm whitespace-nowrap">
                  {item.startDate} - {item.endDate}
                </p>
              </div>
              {item.gpa && <p className="text-gray-600 text-sm">GPA: {item.gpa}</p>}
              {item.details && <p className="text-gray-700 mt-1">{item.details}</p>}
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
        <h2 style={mainSectionTitleStyle}>{label}</h2>
        <div className="space-y-4">
          {data.items.map((item) => (
            <div key={item.id}>
              <h3 className="font-semibold">
                {item.name}
                {item.link && <span className="font-normal text-gray-500 ml-2">| {item.link}</span>}
              </h3>
              {item.technologies.length > 0 && (
                <p className="text-gray-600 text-sm">{item.technologies.join(" • ")}</p>
              )}
              <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
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

  const renderAwards = (label: string) => {
    const data = sectionData.awards as AwardsData;
    if (!data) return null;
    return (
      <div>
        <h2 style={mainSectionTitleStyle}>{label}</h2>
        <div className="space-y-2">
          {data.items.map((item) => (
            <div key={item.id}>
              <div className="flex justify-between">
                <span className="font-medium">{item.name}{item.issuer && ` — ${item.issuer}`}</span>
                <span className="text-gray-500 text-sm">{item.date}</span>
              </div>
              {item.description && <p className="text-gray-700 text-sm mt-1">{item.description}</p>}
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
        <h2 style={mainSectionTitleStyle}>{label}</h2>
        <div className="space-y-4">
          {data.items.map((item) => (
            <div key={item.id}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{item.role}</h3>
                  <p className="text-gray-600">{item.organization}{item.location && ` | ${item.location}`}</p>
                </div>
                <p className="text-gray-500 text-sm whitespace-nowrap">
                  {item.startDate} - {item.current ? "Present" : item.endDate}
                </p>
              </div>
              {item.bullets.length > 0 && (
                <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                  {item.bullets.map((bullet) => (<li key={bullet.id}>{bullet.content}</li>))}
                </ul>
              )}
            </div>
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
        <h2 style={mainSectionTitleStyle}>{label}</h2>
        <div className="space-y-2">
          {data.items.map((item) => (
            <div key={item.id}>
              <div className="flex justify-between">
                <span className="font-semibold">{item.title}{item.publisher && ` — ${item.publisher}`}</span>
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
        <h2 style={mainSectionTitleStyle}>{label}</h2>
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
        <h2 style={mainSectionTitleStyle}>{label}</h2>
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
                <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                  {item.bullets.map((bullet) => (<li key={bullet.id}>{bullet.content}</li>))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderMainSection = (section: SectionConfig) => {
    switch (section.type) {
      case 'summary': return renderSummary(section.label);
      case 'experience': return renderExperience(section.label);
      case 'education': return renderEducation(section.label);
      case 'projects': return renderProjects(section.label);
      case 'awards': return renderAwards(section.label);
      case 'volunteer': return renderVolunteer(section.label);
      case 'publications': return renderPublications(section.label);
      case 'references': return renderReferences(section.label);
      case 'custom': return renderCustomSection(section.id, section.label);
      default: return null;
    }
  };

  return (
    <div 
      className="flex"
      style={{
        width: "8.5in",
        minHeight: "11in",
        fontFamily: theme.fontFamily,
        fontSize: theme.fontSize,
        lineHeight: theme.lineHeight,
        backgroundColor: "white",
      }}
      id="resume-preview"
    >
      {/* Sidebar */}
      <div 
        className="flex-shrink-0"
        style={{ 
          width: '35%',
          backgroundColor: theme.primaryColor,
          padding: theme.marginVertical,
          paddingRight: theme.marginHorizontal * 0.6,
          paddingLeft: theme.marginHorizontal * 0.8,
        }}
      >
        {renderSidebarHeader()}
        {sidebarSections.map((section) => (
          <div key={section.id}>{renderSidebarSection(section)}</div>
        ))}
      </div>

      {/* Main Content */}
      <div 
        className="flex-grow"
        style={{
          padding: theme.marginVertical,
          paddingLeft: theme.marginHorizontal * 0.8,
          paddingRight: theme.marginHorizontal,
        }}
      >
        {mainSections.map((section) => (
          <div key={section.id}>{renderMainSection(section)}</div>
        ))}
      </div>
    </div>
  );
}
