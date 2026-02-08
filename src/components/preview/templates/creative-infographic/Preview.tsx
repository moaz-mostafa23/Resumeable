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
import { Mail, Phone, MapPin, Linkedin, Github, Globe, Briefcase, GraduationCap, Code, Award, Heart, Newspaper, Users } from "lucide-react";

// Helper to ensure URL has protocol
function ensureProtocol(url: string): string {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  return url;
}

/**
 * Creative Infographic Template
 * Bold design with visual elements, icons, and color blocks.
 * Best for creative and design professionals.
 */
export function CreativeInfographicPreview() {
  const resume = useResume();

  if (!resume) return null;

  const { sections, sectionData, theme } = resume;
  const visibleSections = sections.filter((s) => s.visible).sort((a, b) => a.order - b.order);

  const getSectionIcon = (type: string) => {
    const iconProps = { className: "w-5 h-5", style: { color: theme.primaryColor } };
    switch (type) {
      case 'experience': return <Briefcase {...iconProps} />;
      case 'education': return <GraduationCap {...iconProps} />;
      case 'skills': return <Code {...iconProps} />;
      case 'projects': return <Code {...iconProps} />;
      case 'certifications': return <Award {...iconProps} />;
      case 'awards': return <Award {...iconProps} />;
      case 'volunteer': return <Heart {...iconProps} />;
      case 'publications': return <Newspaper {...iconProps} />;
      case 'references': return <Users {...iconProps} />;
      default: return null;
    }
  };

  const styles = {
    page: {
      width: "8.5in",
      minHeight: "11in",
      fontFamily: theme.fontFamily,
      fontSize: theme.fontSize,
      lineHeight: theme.lineHeight,
      backgroundColor: "white",
    },
    sectionTitle: {
      color: theme.primaryColor,
      fontSize: theme.fontSize + 2,
      fontWeight: 700,
      marginBottom: theme.sectionSpacing / 2,
      marginTop: theme.sectionSpacing,
      display: "flex" as const,
      alignItems: "center" as const,
      gap: 10,
    },
  };

  const renderHeader = () => {
    const data = sectionData.header as HeaderData;
    return (
      <div 
        className="relative overflow-hidden"
        style={{ 
          backgroundColor: theme.primaryColor,
          padding: `${theme.marginVertical}px ${theme.marginHorizontal}px`,
        }}
      >
        {/* Decorative shapes */}
        <div 
          className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10"
          style={{ backgroundColor: 'white', transform: 'translate(30%, -30%)' }}
        />
        <div 
          className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10"
          style={{ backgroundColor: 'white', transform: 'translate(-30%, 30%)' }}
        />
        
        <div className="relative z-10">
          <h1
            className="font-bold text-white mb-2"
            style={{ fontSize: theme.nameFontSize + 4 }}
          >
            {data.fullName}
          </h1>
          <p 
            className="text-white/90 mb-4 font-medium"
            style={{ fontSize: theme.titleFontSize + 2 }}
          >
            {data.title}
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-white/90" style={{ fontSize: theme.fontSize }}>
            {data.email && (
              <span className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                {data.email}
              </span>
            )}
            {data.phone && (
              <span className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                {data.phone}
              </span>
            )}
            {data.location && (
              <span className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                {data.location}
              </span>
            )}
            {data.linkedin && (
              <a 
                href={data.linkedinUrl ? ensureProtocol(data.linkedinUrl) : '#'}
                target="_blank"
                rel="noopener noreferrer" 
                className="flex items-center gap-2 hover:underline"
                style={{ color: 'inherit' }}
              >
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Linkedin className="w-4 h-4" />
                </div>
                {data.linkedin}
              </a>
            )}
            {data.github && (
              <a 
                href={data.githubUrl ? ensureProtocol(data.githubUrl) : '#'}
                target="_blank"
                rel="noopener noreferrer" 
                className="flex items-center gap-2 hover:underline"
                style={{ color: 'inherit' }}
              >
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Github className="w-4 h-4" />
                </div>
                {data.github}
              </a>
            )}
            {data.website && (
              <a 
                href={data.websiteUrl ? ensureProtocol(data.websiteUrl) : '#'}
                target="_blank"
                rel="noopener noreferrer" 
                className="flex items-center gap-2 hover:underline"
                style={{ color: 'inherit' }}
              >
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Globe className="w-4 h-4" />
                </div>
                {data.website}
              </a>
            )}
          </div>
        </div>
      </div>
    );
  };

  const ContentWrapper = ({ children }: { children: React.ReactNode }) => (
    <div 
      style={{
        padding: `${theme.marginVertical / 2}px ${theme.marginHorizontal}px`,
      }}
    >
      {children}
    </div>
  );

  const renderSummary = (label: string) => {
    const data = sectionData.summary as SummaryData;
    return (
      <div 
        style={{
          backgroundColor: `${theme.primaryColor}08`,
          padding: theme.marginHorizontal / 2,
          margin: `${theme.marginVertical / 2}px ${theme.marginHorizontal}px`,
          borderRadius: 12,
          borderLeft: `4px solid ${theme.primaryColor}`,
        }}
      >
        <p className="text-gray-700 leading-relaxed">{data.content}</p>
      </div>
    );
  };

  const renderExperience = (label: string) => {
    const data = sectionData.experience as ExperienceData;
    return (
      <div>
        <h2 style={styles.sectionTitle}>
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${theme.primaryColor}15` }}
          >
            <Briefcase className="w-5 h-5" style={{ color: theme.primaryColor }} />
          </div>
          {label}
        </h2>
        <div className="space-y-5">
          {data.items.map((item, index) => (
            <div key={item.id} className="flex gap-4">
              {/* Number indicator */}
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
                style={{ backgroundColor: theme.primaryColor }}
              >
                {index + 1}
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900">{item.title}</h3>
                    <p style={{ color: theme.primaryColor }} className="font-medium">
                      {item.company}
                    </p>
                    <p className="text-gray-500 text-sm">{item.location}</p>
                  </div>
                  <div 
                    className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{ 
                      backgroundColor: `${theme.primaryColor}15`,
                      color: theme.primaryColor
                    }}
                  >
                    {item.startDate} - {item.current ? "Present" : item.endDate}
                  </div>
                </div>
                <ul className="mt-3 space-y-2 text-gray-700">
                  {item.bullets.map((bullet) => (
                    <li key={bullet.id} className="flex items-start gap-2">
                      <span 
                        className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                        style={{ backgroundColor: theme.primaryColor }}
                      />
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
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${theme.primaryColor}15` }}
          >
            <GraduationCap className="w-5 h-5" style={{ color: theme.primaryColor }} />
          </div>
          {label}
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {data.items.map((item) => (
            <div 
              key={item.id} 
              className="p-4 rounded-lg border-l-4"
              style={{ 
                backgroundColor: `${theme.primaryColor}05`,
                borderLeftColor: theme.primaryColor
              }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900">{item.degree} in {item.field}</h3>
                  <p style={{ color: theme.primaryColor }} className="font-medium">
                    {item.institution}
                  </p>
                  <p className="text-gray-500 text-sm">{item.location}</p>
                </div>
                <div 
                  className="px-3 py-1 rounded-full text-sm font-medium"
                  style={{ 
                    backgroundColor: `${theme.primaryColor}15`,
                    color: theme.primaryColor
                  }}
                >
                  {item.startDate} - {item.endDate}
                </div>
              </div>
              {item.gpa && <p className="text-gray-600 text-sm mt-2">GPA: {item.gpa}</p>}
              {item.details && <p className="text-gray-700 mt-2">{item.details}</p>}
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
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${theme.primaryColor}15` }}
          >
            <Code className="w-5 h-5" style={{ color: theme.primaryColor }} />
          </div>
          {label}
        </h2>
        <div className="space-y-4">
          {data.categories.map((category) => (
            <div key={category.id}>
              <h4 
                className="font-semibold mb-2"
                style={{ color: theme.primaryColor }}
              >
                {category.name}
              </h4>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, idx) => (
                  <span 
                    key={idx}
                    className="px-3 py-1.5 rounded-full text-sm font-medium"
                    style={{ 
                      backgroundColor: theme.primaryColor,
                      color: 'white',
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
        <h2 style={styles.sectionTitle}>
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${theme.primaryColor}15` }}
          >
            <Code className="w-5 h-5" style={{ color: theme.primaryColor }} />
          </div>
          {label}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {data.items.map((item) => (
            <div 
              key={item.id}
              className="p-4 rounded-lg"
              style={{ backgroundColor: `${theme.primaryColor}05` }}
            >
              <h3 className="font-bold text-gray-900">{item.name}</h3>
              {item.link && (
                <p className="text-gray-500 text-sm">{item.link}</p>
              )}
              {item.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {item.technologies.map((tech, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-0.5 text-xs rounded"
                      style={{ backgroundColor: `${theme.primaryColor}20`, color: theme.primaryColor }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
              <ul className="mt-2 space-y-1 text-gray-700 text-sm">
                {item.bullets.slice(0, 2).map((bullet) => (
                  <li key={bullet.id} className="flex items-start gap-1.5">
                    <span 
                      className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                      style={{ backgroundColor: theme.primaryColor }}
                    />
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
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${theme.primaryColor}15` }}
          >
            <Award className="w-5 h-5" style={{ color: theme.primaryColor }} />
          </div>
          {label}
        </h2>
        <div className="flex flex-wrap gap-3">
          {data.items.map((item) => (
            <div 
              key={item.id}
              className="px-4 py-2 rounded-lg flex items-center gap-2"
              style={{ backgroundColor: `${theme.primaryColor}10` }}
            >
              <Award className="w-4 h-4" style={{ color: theme.primaryColor }} />
              <div>
                <span className="font-medium">{item.name}</span>
                <span className="text-gray-500 text-sm ml-2">{item.date}</span>
              </div>
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
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${theme.primaryColor}15` }}>
            <GraduationCap className="w-5 h-5" style={{ color: theme.primaryColor }} />
          </div>
          {label}
        </h2>
        <div className="flex flex-wrap gap-2">
          {data.items.map((item) => (
            <span key={item.id} className="px-3 py-1.5 rounded-lg text-sm" style={{ backgroundColor: `${theme.primaryColor}10` }}>
              {item.name}
            </span>
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
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${theme.primaryColor}15` }}>
            <Globe className="w-5 h-5" style={{ color: theme.primaryColor }} />
          </div>
          {label}
        </h2>
        <div className="flex flex-wrap gap-3">
          {data.items.map((item) => (
            <div 
              key={item.id}
              className="px-4 py-2 rounded-lg text-center"
              style={{ backgroundColor: theme.primaryColor, color: 'white' }}
            >
              <p className="font-bold">{item.language}</p>
              <p className="text-xs opacity-80 capitalize">{item.proficiency}</p>
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
        <h2 style={styles.sectionTitle}>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${theme.primaryColor}15` }}>
            <Award className="w-5 h-5" style={{ color: theme.primaryColor }} />
          </div>
          {label}
        </h2>
        <div className="space-y-2">
          {data.items.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.primaryColor }} />
              <span className="font-medium">{item.name}</span>
              {item.issuer && <span className="text-gray-500">— {item.issuer}</span>}
              <span className="text-gray-400 text-sm ml-auto">{item.date}</span>
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
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${theme.primaryColor}15` }}>
            <Heart className="w-5 h-5" style={{ color: theme.primaryColor }} />
          </div>
          {label}
        </h2>
        <div className="space-y-4">
          {data.items.map((item) => (
            <div key={item.id}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold">{item.role}</h3>
                  <p style={{ color: theme.primaryColor }}>{item.organization}</p>
                </div>
                <span className="text-gray-500 text-sm">{item.startDate} - {item.current ? "Present" : item.endDate}</span>
              </div>
              {item.bullets.length > 0 && (
                <ul className="mt-2 space-y-1 text-gray-700">
                  {item.bullets.map((bullet) => (
                    <li key={bullet.id} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full mt-2" style={{ backgroundColor: theme.primaryColor }} />
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

  const renderInterests = (label: string) => {
    const data = sectionData.interests as InterestsData;
    if (!data) return null;
    return (
      <div>
        <h2 style={styles.sectionTitle}>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${theme.primaryColor}15` }}>
            <Heart className="w-5 h-5" style={{ color: theme.primaryColor }} />
          </div>
          {label}
        </h2>
        <div className="flex flex-wrap gap-2">
          {data.items.map((item, idx) => (
            <span 
              key={idx}
              className="px-4 py-2 rounded-full text-sm font-medium"
              style={{ 
                backgroundColor: idx % 2 === 0 ? theme.primaryColor : `${theme.primaryColor}20`,
                color: idx % 2 === 0 ? 'white' : theme.primaryColor,
              }}
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
        <h2 style={styles.sectionTitle}>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${theme.primaryColor}15` }}>
            <Newspaper className="w-5 h-5" style={{ color: theme.primaryColor }} />
          </div>
          {label}
        </h2>
        <div className="space-y-3">
          {data.items.map((item) => (
            <div key={item.id} className="p-3 rounded-lg" style={{ backgroundColor: `${theme.primaryColor}05` }}>
              <p className="font-semibold">{item.title}</p>
              {item.publisher && <p className="text-gray-600 text-sm">{item.publisher} • {item.date}</p>}
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
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${theme.primaryColor}15` }}>
            <Users className="w-5 h-5" style={{ color: theme.primaryColor }} />
          </div>
          {label}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {data.items.map((item) => (
            <div key={item.id} className="p-4 rounded-lg" style={{ backgroundColor: `${theme.primaryColor}08` }}>
              <p className="font-bold">{item.name}</p>
              <p className="text-sm" style={{ color: theme.primaryColor }}>{item.title}{item.company && `, ${item.company}`}</p>
              {item.email && <p className="text-gray-500 text-sm mt-1">{item.email}</p>}
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
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${theme.primaryColor}15` }}>
            <Code className="w-5 h-5" style={{ color: theme.primaryColor }} />
          </div>
          {label}
        </h2>
        <div className="space-y-4">
          {data.items.map((item) => (
            <div key={item.id}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold">{item.title}</h3>
                  {item.subtitle && <p className="text-gray-600">{item.subtitle}</p>}
                </div>
                {item.date && <span className="text-gray-500 text-sm">{item.date}</span>}
              </div>
              {item.description && <p className="text-gray-700 mt-1">{item.description}</p>}
              {item.bullets.length > 0 && (
                <ul className="mt-2 space-y-1 text-gray-700">
                  {item.bullets.map((bullet) => (
                    <li key={bullet.id} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full mt-2" style={{ backgroundColor: theme.primaryColor }} />
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
      {visibleSections.map((section) => {
        if (section.type === 'header' || section.type === 'summary') {
          return <div key={section.id}>{renderSection(section)}</div>;
        }
        return (
          <ContentWrapper key={section.id}>
            {renderSection(section)}
          </ContentWrapper>
        );
      })}
    </div>
  );
}
