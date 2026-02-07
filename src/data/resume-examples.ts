// ── Types ──────────────────────────────────────────────────────────────

export interface ResumeExample {
  slug: string;
  jobTitle: string;
  category: string;
  metaDescription: string;
  intro: string;
  sampleResume: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
    experience: {
      title: string;
      company: string;
      period: string;
      bullets: string[];
    }[];
    education: {
      degree: string;
      school: string;
      year: string;
    }[];
    skills: string[];
  };
  writingTips: { title: string; description: string }[];
  keySkills: string[];
  commonMistakes: string[];
}

// ── Categories ─────────────────────────────────────────────────────────

export const categories = [
  "Technology",
  "Healthcare",
  "Business & Finance",
  "Creative & Design",
  "Education",
  "Engineering",
  "Marketing & Sales",
  "Hospitality & Food Service",
  "Entry Level & Students",
] as const;

// ── Data ───────────────────────────────────────────────────────────────

export const resumeExamples: ResumeExample[] = [
  // ─── TECHNOLOGY ────────────────────────────────────────────────────
  {
    slug: "software-engineer",
    jobTitle: "Software Engineer",
    category: "Technology",
    metaDescription:
      "See a professional software engineer resume example with real-world experience, technical skills, and actionable writing tips to help you land your next developer role.",
    intro:
      "A strong software engineer resume demonstrates both technical depth and real business impact. Hiring managers want to see the languages and frameworks you know, but more importantly, they want to see what you built and how it mattered. Here's a complete example to guide you.",
    sampleResume: {
      name: "Alex Chen",
      title: "Software Engineer",
      email: "alex.chen@email.com",
      phone: "(415) 555-0192",
      location: "San Francisco, CA",
      summary:
        "Full-stack software engineer with 5 years of experience building scalable web applications. Proficient in TypeScript, React, and Node.js with a track record of reducing load times, improving reliability, and shipping features that drive user engagement.",
      experience: [
        {
          title: "Software Engineer",
          company: "Streamline Technologies",
          period: "2021 – Present",
          bullets: [
            "Architected and shipped a real-time collaboration feature used by 12K+ daily active users, reducing support tickets by 34%",
            "Led migration from monolithic REST API to microservices architecture, improving deployment frequency from weekly to multiple times per day",
            "Mentored 3 junior engineers through code reviews and pair programming sessions",
            "Optimized database queries that reduced average API response time from 450ms to 120ms",
          ],
        },
        {
          title: "Junior Software Engineer",
          company: "Bright Path Software",
          period: "2019 – 2021",
          bullets: [
            "Built and maintained React components for a B2B SaaS dashboard serving 200+ enterprise clients",
            "Implemented automated testing pipeline that caught 40% more bugs before production releases",
            "Collaborated with design team to rebuild the onboarding flow, increasing trial-to-paid conversion by 18%",
          ],
        },
      ],
      education: [
        {
          degree: "B.S. Computer Science",
          school: "University of California, Berkeley",
          year: "2019",
        },
      ],
      skills: [
        "TypeScript",
        "React",
        "Node.js",
        "PostgreSQL",
        "AWS",
        "Docker",
        "Git",
        "REST APIs",
        "GraphQL",
        "CI/CD",
      ],
    },
    writingTips: [
      {
        title: "Lead with impact, not duties",
        description:
          "Instead of 'Responsible for developing features,' write 'Built a real-time notification system that increased user engagement by 23%.' Numbers and outcomes beat job descriptions every time.",
      },
      {
        title: "Tailor your tech stack",
        description:
          "Match the technologies in your resume to the job posting. If they want React and you know React, make sure it's prominent — don't bury it in a list of 20 technologies.",
      },
      {
        title: "Show system design thinking",
        description:
          "Senior roles care about architecture decisions. Mention migrations, scaling challenges, and trade-offs you navigated — not just the code you wrote.",
      },
      {
        title: "Keep it to one page",
        description:
          "Unless you have 10+ years of experience, a single page is expected. Cut older or less relevant roles to make room for what matters most.",
      },
    ],
    keySkills: [
      "Programming languages (Python, JavaScript, TypeScript, Java)",
      "Frontend frameworks (React, Vue, Angular)",
      "Backend technologies (Node.js, Django, Spring Boot)",
      "Database design and optimization",
      "Cloud platforms (AWS, GCP, Azure)",
      "Version control (Git)",
      "CI/CD pipelines",
      "System design and architecture",
      "Agile/Scrum methodologies",
      "Technical communication",
    ],
    commonMistakes: [
      "Listing every technology you've ever touched instead of highlighting relevant expertise",
      "Describing what your team did instead of your specific contributions",
      "Missing quantifiable results — always include metrics where possible",
      "Using a generic summary that could apply to any developer",
    ],
  },
  {
    slug: "data-scientist",
    jobTitle: "Data Scientist",
    category: "Technology",
    metaDescription:
      "Professional data scientist resume example with machine learning projects, statistical skills, and expert tips for landing data science roles in 2026.",
    intro:
      "Data scientist resumes need to balance technical rigor with business storytelling. Recruiters want to see your ML expertise, but hiring managers want to know how your models drove decisions. This example shows how to do both.",
    sampleResume: {
      name: "Priya Sharma",
      title: "Data Scientist",
      email: "priya.sharma@email.com",
      phone: "(617) 555-0284",
      location: "Boston, MA",
      summary:
        "Data scientist with 4 years of experience building predictive models and data pipelines. Specializing in NLP and recommendation systems, with a proven ability to translate complex analyses into actionable business strategies that have generated $2M+ in measurable revenue impact.",
      experience: [
        {
          title: "Data Scientist",
          company: "Meridian Analytics",
          period: "2022 – Present",
          bullets: [
            "Built a customer churn prediction model (XGBoost) that identified at-risk accounts with 89% accuracy, enabling proactive retention campaigns that saved $1.2M annually",
            "Developed an NLP pipeline to analyze 50K+ customer support tickets, surfacing product issues 3 weeks earlier than manual review",
            "Created interactive Tableau dashboards used by C-suite to track KPIs across 5 business units",
          ],
        },
        {
          title: "Junior Data Analyst",
          company: "Vertex Commerce",
          period: "2020 – 2022",
          bullets: [
            "Designed A/B testing framework that standardized experimentation across marketing team, running 40+ tests per quarter",
            "Built ETL pipelines in Python and Airflow to consolidate data from 8 sources into a unified warehouse",
            "Delivered weekly insights reports to product team, directly informing 3 major feature launches",
          ],
        },
      ],
      education: [
        {
          degree: "M.S. Data Science",
          school: "Northeastern University",
          year: "2020",
        },
        {
          degree: "B.S. Statistics",
          school: "University of Michigan",
          year: "2018",
        },
      ],
      skills: [
        "Python",
        "SQL",
        "TensorFlow",
        "scikit-learn",
        "Pandas",
        "Tableau",
        "Apache Spark",
        "AWS SageMaker",
        "A/B Testing",
        "NLP",
      ],
    },
    writingTips: [
      {
        title: "Highlight business outcomes",
        description:
          "Don't just say you built a model. Explain what decision it informed and what the financial or operational impact was. '$1.2M saved' beats 'improved accuracy' every time.",
      },
      {
        title: "Mention the full stack",
        description:
          "Show that you can go from raw data to deployed model. Mention data cleaning, feature engineering, model selection, deployment, and monitoring.",
      },
      {
        title: "Include relevant projects",
        description:
          "If you have Kaggle competitions, published papers, or open-source contributions, include them — especially if you're early in your career.",
      },
      {
        title: "Separate tools from techniques",
        description:
          "Distinguish between tools (Python, Spark) and methods (regression, clustering, deep learning). Both matter, but for different reasons.",
      },
    ],
    keySkills: [
      "Machine learning (supervised and unsupervised)",
      "Statistical analysis and hypothesis testing",
      "Python (NumPy, Pandas, scikit-learn)",
      "Deep learning frameworks (TensorFlow, PyTorch)",
      "SQL and database querying",
      "Data visualization (Tableau, matplotlib)",
      "Big data tools (Spark, Hadoop)",
      "Natural language processing",
      "A/B testing and experimentation",
      "Cloud ML platforms (AWS SageMaker, GCP Vertex AI)",
    ],
    commonMistakes: [
      "Focusing on algorithms without explaining the business problem they solved",
      "Listing Jupyter notebooks as 'projects' without context or outcomes",
      "Ignoring data engineering skills — companies want end-to-end capabilities",
      "Not mentioning collaboration with non-technical stakeholders",
    ],
  },
  {
    slug: "product-manager",
    jobTitle: "Product Manager",
    category: "Technology",
    metaDescription:
      "Product manager resume example with real metrics, cross-functional leadership examples, and writing tips to stand out in competitive PM hiring.",
    intro:
      "Product manager resumes are all about demonstrating strategic thinking and execution. You need to show that you can identify opportunities, rally teams, and ship products that move metrics. Here's what a strong PM resume looks like.",
    sampleResume: {
      name: "Jordan Rivera",
      title: "Product Manager",
      email: "jordan.rivera@email.com",
      phone: "(212) 555-0347",
      location: "New York, NY",
      summary:
        "Product manager with 6 years of experience driving product strategy for B2B SaaS platforms. Led cross-functional teams of 8–15 people to ship features that grew ARR by $4M and improved retention by 22%. Passionate about data-informed decisions and user-centric design.",
      experience: [
        {
          title: "Senior Product Manager",
          company: "CloudSync Inc.",
          period: "2022 – Present",
          bullets: [
            "Owned the product roadmap for the integrations platform, growing third-party connections from 15 to 80+ and driving $2.4M in new ARR",
            "Led discovery research with 120+ customer interviews that identified a critical workflow gap, resulting in a new feature adopted by 67% of enterprise accounts",
            "Collaborated with engineering, design, and sales to reduce time-to-value for new customers from 14 days to 3 days",
          ],
        },
        {
          title: "Product Manager",
          company: "TalentBridge",
          period: "2019 – 2022",
          bullets: [
            "Managed a 10-person squad shipping recruiting analytics tools used by 500+ HR teams",
            "Defined and tracked KPIs that improved applicant screening efficiency by 35%",
            "Prioritized backlog using RICE scoring and quarterly OKRs, shipping 95% of committed features on time",
          ],
        },
      ],
      education: [
        {
          degree: "MBA",
          school: "Columbia Business School",
          year: "2019",
        },
        {
          degree: "B.A. Economics",
          school: "NYU",
          year: "2016",
        },
      ],
      skills: [
        "Product Strategy",
        "User Research",
        "A/B Testing",
        "SQL",
        "Jira",
        "Figma",
        "OKRs",
        "Agile/Scrum",
        "Stakeholder Management",
        "Data Analysis",
      ],
    },
    writingTips: [
      {
        title: "Frame everything as outcomes",
        description:
          "PMs are measured by results. Every bullet should connect your actions to a metric: revenue, retention, adoption, NPS, or efficiency gains.",
      },
      {
        title: "Show cross-functional leadership",
        description:
          "Mention the teams you worked with (engineering, design, sales, support) and the size of teams you led. PMs lead without authority — make that visible.",
      },
      {
        title: "Demonstrate user empathy",
        description:
          "Reference customer interviews, usability tests, or user research. Companies want PMs who deeply understand their users.",
      },
      {
        title: "Include your process",
        description:
          "Mention frameworks you use (RICE, Jobs-to-be-Done, OKRs) to show strategic thinking, not just execution.",
      },
    ],
    keySkills: [
      "Product strategy and roadmapping",
      "User research and customer interviews",
      "Data analysis (SQL, Excel, Amplitude)",
      "A/B testing and experimentation",
      "Agile and Scrum methodologies",
      "Cross-functional team leadership",
      "Stakeholder management",
      "Competitive analysis",
      "Go-to-market strategy",
      "Technical communication with engineering teams",
    ],
    commonMistakes: [
      "Writing like a project manager — focus on what you decided and why, not just what was delivered",
      "Not including metrics for product outcomes",
      "Being too vague about your specific role vs. the team's work",
      "Overlooking technical skills like SQL or data tools",
    ],
  },
  {
    slug: "web-developer",
    jobTitle: "Web Developer",
    category: "Technology",
    metaDescription:
      "Web developer resume example with portfolio highlights, modern tech stack, and tips for both frontend and full-stack developer positions.",
    intro:
      "Web developer resumes should showcase your ability to build fast, accessible, user-friendly websites. Whether you're frontend-focused or full-stack, employers want to see live projects, clean code practices, and performance awareness.",
    sampleResume: {
      name: "Sam Okafor",
      title: "Web Developer",
      email: "sam.okafor@email.com",
      phone: "(503) 555-0178",
      location: "Portland, OR",
      summary:
        "Web developer with 4 years of experience building responsive, accessible web applications. Skilled in React, Next.js, and modern CSS with a focus on performance optimization and clean user experiences.",
      experience: [
        {
          title: "Frontend Developer",
          company: "Pixel & Code Studio",
          period: "2022 – Present",
          bullets: [
            "Built and maintained 15+ client websites using Next.js and Tailwind CSS, achieving average Lighthouse scores of 95+",
            "Implemented lazy loading and image optimization that reduced page load times by 60% across client sites",
            "Created a reusable component library adopted by the entire 8-person development team",
          ],
        },
        {
          title: "Junior Web Developer",
          company: "Green Leaf Digital",
          period: "2020 – 2022",
          bullets: [
            "Developed responsive landing pages for 30+ marketing campaigns with an average conversion rate 25% above industry benchmark",
            "Migrated legacy jQuery codebase to React, reducing bundle size by 45% and improving maintainability",
            "Collaborated with designers to implement pixel-perfect UIs from Figma mockups",
          ],
        },
      ],
      education: [
        {
          degree: "B.S. Web Development",
          school: "Oregon State University",
          year: "2020",
        },
      ],
      skills: [
        "HTML5/CSS3",
        "JavaScript/TypeScript",
        "React",
        "Next.js",
        "Tailwind CSS",
        "Node.js",
        "Git",
        "Responsive Design",
        "Web Accessibility (WCAG)",
        "Performance Optimization",
      ],
    },
    writingTips: [
      {
        title: "Link to your work",
        description:
          "Include a portfolio URL or GitHub profile. Web development is visual — let hiring managers see what you've built.",
      },
      {
        title: "Emphasize performance metrics",
        description:
          "Mention Lighthouse scores, load times, Core Web Vitals. Performance is a competitive differentiator that hiring managers understand.",
      },
      {
        title: "Show modern stack awareness",
        description:
          "Frameworks evolve fast. Show you're current with modern tools (Next.js, Tailwind, TypeScript) rather than only listing older technologies.",
      },
      {
        title: "Highlight accessibility knowledge",
        description:
          "WCAG compliance and accessibility awareness are increasingly required. Mention it if you have experience — it sets you apart.",
      },
    ],
    keySkills: [
      "HTML5, CSS3, and modern CSS (Flexbox, Grid)",
      "JavaScript and TypeScript",
      "React, Vue, or Angular",
      "Server-side rendering (Next.js, Nuxt)",
      "CSS frameworks (Tailwind, Bootstrap)",
      "Responsive and mobile-first design",
      "Web accessibility (WCAG 2.1)",
      "Version control (Git/GitHub)",
      "API integration (REST, GraphQL)",
      "Performance optimization and Core Web Vitals",
    ],
    commonMistakes: [
      "Not including a portfolio link — this is a dealbreaker for many employers",
      "Listing only technologies without showing what you built with them",
      "Ignoring soft skills like client communication and teamwork",
      "Using an outdated or poorly designed resume for a design-adjacent role",
    ],
  },
  {
    slug: "cybersecurity-analyst",
    jobTitle: "Cybersecurity Analyst",
    category: "Technology",
    metaDescription:
      "Cybersecurity analyst resume example with incident response experience, security certifications, and tips for SOC and security engineering roles.",
    intro:
      "Cybersecurity resumes need to demonstrate technical depth in threat detection, incident response, and security architecture. Certifications matter here more than most fields, and quantifying your impact on risk reduction is key.",
    sampleResume: {
      name: "Maria Torres",
      title: "Cybersecurity Analyst",
      email: "maria.torres@email.com",
      phone: "(703) 555-0456",
      location: "Arlington, VA",
      summary:
        "Cybersecurity analyst with 5 years of experience in threat detection, incident response, and vulnerability management. CompTIA Security+ and CEH certified. Reduced organizational security incidents by 45% through proactive monitoring and employee security training programs.",
      experience: [
        {
          title: "Cybersecurity Analyst",
          company: "SecurePoint Defense",
          period: "2021 – Present",
          bullets: [
            "Monitor and analyze security alerts from SIEM (Splunk) across 3,000+ endpoints, triaging an average of 200 alerts daily",
            "Led incident response for a phishing campaign that targeted 500 employees, containing the threat within 2 hours with zero data loss",
            "Developed and delivered quarterly security awareness training that reduced phishing click rates from 23% to 4%",
            "Conducted 50+ vulnerability assessments and coordinated remediation with IT teams, closing critical vulnerabilities within 48 hours",
          ],
        },
        {
          title: "IT Security Intern",
          company: "Federal Reserve Bank of Richmond",
          period: "2019 – 2021",
          bullets: [
            "Assisted in deploying endpoint detection and response (EDR) tools across 800 workstations",
            "Documented security procedures and updated incident response playbooks for 12 threat scenarios",
            "Performed weekly vulnerability scans and generated compliance reports for auditors",
          ],
        },
      ],
      education: [
        {
          degree: "B.S. Cybersecurity",
          school: "George Mason University",
          year: "2019",
        },
      ],
      skills: [
        "SIEM (Splunk, QRadar)",
        "Incident Response",
        "Vulnerability Management",
        "Network Security",
        "Python Scripting",
        "Firewalls & IDS/IPS",
        "CompTIA Security+",
        "CEH",
        "NIST Framework",
        "Risk Assessment",
      ],
    },
    writingTips: [
      {
        title: "Highlight certifications prominently",
        description:
          "Security+, CEH, CISSP, and similar certs are often hard requirements. Put them in your summary and skills section — don't make recruiters hunt for them.",
      },
      {
        title: "Quantify risk reduction",
        description:
          "Use numbers like '45% reduction in incidents' or 'contained breach within 2 hours.' Security is about measurable risk mitigation.",
      },
      {
        title: "Show your tools",
        description:
          "Name the specific SIEM, EDR, and scanning tools you've used. Hiring managers filter for tool experience.",
      },
      {
        title: "Mention frameworks",
        description:
          "Reference NIST, ISO 27001, or CIS Controls. It shows you understand the compliance landscape, not just the technical side.",
      },
    ],
    keySkills: [
      "SIEM platforms (Splunk, QRadar, Sentinel)",
      "Incident response and forensics",
      "Vulnerability scanning (Nessus, Qualys)",
      "Network security and firewall management",
      "Endpoint detection and response (EDR)",
      "Python/PowerShell scripting",
      "Risk assessment and mitigation",
      "Security frameworks (NIST, ISO 27001, CIS)",
      "Threat intelligence",
      "Security awareness training",
    ],
    commonMistakes: [
      "Not listing certifications — they're often required, not optional",
      "Being vague about incident response experience (include timelines and outcomes)",
      "Focusing only on defensive skills — mention any offensive security or pen testing experience too",
      "Forgetting to mention compliance and audit experience",
    ],
  },
  {
    slug: "devops-engineer",
    jobTitle: "DevOps Engineer",
    category: "Technology",
    metaDescription:
      "DevOps engineer resume example with CI/CD pipeline experience, infrastructure-as-code skills, and tips for SRE and platform engineering roles.",
    intro:
      "DevOps resumes should demonstrate your ability to bridge development and operations. Employers want to see automation, infrastructure-as-code, and measurable improvements in deployment speed, uptime, and developer experience.",
    sampleResume: {
      name: "Ethan Park",
      title: "DevOps Engineer",
      email: "ethan.park@email.com",
      phone: "(206) 555-0331",
      location: "Seattle, WA",
      summary:
        "DevOps engineer with 5 years of experience designing CI/CD pipelines, managing cloud infrastructure, and improving system reliability. Reduced deployment time by 80% and maintained 99.95% uptime across production services handling 2M+ daily requests.",
      experience: [
        {
          title: "Senior DevOps Engineer",
          company: "Nimbus Cloud Solutions",
          period: "2022 – Present",
          bullets: [
            "Designed and maintained CI/CD pipelines (GitHub Actions, ArgoCD) for 40+ microservices, reducing deployment time from 45 minutes to 8 minutes",
            "Migrated infrastructure from manually provisioned EC2 instances to Terraform-managed EKS clusters, cutting infrastructure costs by 35%",
            "Implemented comprehensive monitoring with Prometheus and Grafana, reducing mean time to detection (MTTD) from 30 minutes to under 3 minutes",
            "Led on-call rotation and incident response, maintaining 99.95% uptime SLA across all production services",
          ],
        },
        {
          title: "DevOps Engineer",
          company: "DataFlow Systems",
          period: "2019 – 2022",
          bullets: [
            "Built Docker containerization strategy that standardized local development environments for a 25-person engineering team",
            "Automated database backup and disaster recovery processes, reducing RTO from 4 hours to 20 minutes",
            "Created self-service deployment tools that empowered developers to ship without DevOps bottlenecks",
          ],
        },
      ],
      education: [
        {
          degree: "B.S. Computer Science",
          school: "University of Washington",
          year: "2019",
        },
      ],
      skills: [
        "AWS/GCP",
        "Kubernetes",
        "Terraform",
        "Docker",
        "CI/CD (GitHub Actions, Jenkins)",
        "Prometheus/Grafana",
        "Linux",
        "Python/Bash",
        "Infrastructure as Code",
        "Incident Response",
      ],
    },
    writingTips: [
      {
        title: "Show before-and-after metrics",
        description:
          "DevOps impact is highly measurable. '45 min → 8 min deployments' or '4hr → 20min RTO' tells a clear story of improvement.",
      },
      {
        title: "Highlight automation",
        description:
          "The core of DevOps is eliminating manual work. Every bullet should ideally describe something you automated, standardized, or streamlined.",
      },
      {
        title: "Name your cloud platform",
        description:
          "AWS, GCP, and Azure require different skills. Be specific about which cloud you know and what services you've used.",
      },
      {
        title: "Show team impact",
        description:
          "DevOps serves developers. Mention how your work improved developer experience, reduced friction, or sped up their workflows.",
      },
    ],
    keySkills: [
      "Cloud platforms (AWS, GCP, Azure)",
      "Container orchestration (Kubernetes, Docker)",
      "Infrastructure as Code (Terraform, Pulumi, CloudFormation)",
      "CI/CD pipelines (GitHub Actions, Jenkins, GitLab CI)",
      "Monitoring and observability (Prometheus, Grafana, Datadog)",
      "Linux system administration",
      "Scripting (Python, Bash, Go)",
      "Networking and security fundamentals",
      "Incident management and SRE practices",
      "GitOps and deployment strategies",
    ],
    commonMistakes: [
      "Listing tools without explaining how you used them or what you achieved",
      "Focusing purely on infrastructure without showing developer experience improvements",
      "Not mentioning uptime, SLA, or reliability metrics",
      "Leaving out soft skills like incident communication and cross-team collaboration",
    ],
  },

  // ─── HEALTHCARE ────────────────────────────────────────────────────
  {
    slug: "registered-nurse",
    jobTitle: "Registered Nurse",
    category: "Healthcare",
    metaDescription:
      "Registered nurse resume example with clinical experience, certifications, and tips for RN, ICU, ER, and new graduate nursing positions.",
    intro:
      "Nursing resumes need to balance clinical competencies with compassionate patient care. Whether you're an experienced RN or a new graduate, this example shows how to present your certifications, specialties, and patient outcomes effectively.",
    sampleResume: {
      name: "Sarah Mitchell",
      title: "Registered Nurse, BSN",
      email: "sarah.mitchell@email.com",
      phone: "(312) 555-0198",
      location: "Chicago, IL",
      summary:
        "Compassionate registered nurse with 6 years of experience in medical-surgical and ICU settings. BLS and ACLS certified. Recognized for reducing patient fall rates by 30% through evidence-based safety protocols. Skilled in patient assessment, care coordination, and electronic health records (Epic).",
      experience: [
        {
          title: "Registered Nurse – ICU",
          company: "Northwestern Memorial Hospital",
          period: "2021 – Present",
          bullets: [
            "Provide critical care for 4–6 patients per shift in a 30-bed ICU, managing ventilators, vasopressors, and continuous monitoring",
            "Led implementation of a nurse-driven mobility protocol that reduced ICU length of stay by an average of 1.2 days",
            "Precepted 8 new graduate nurses during their first year, all of whom successfully passed competency assessments",
            "Achieved 98% compliance rate in hand hygiene audits across the unit",
          ],
        },
        {
          title: "Registered Nurse – Med/Surg",
          company: "Rush University Medical Center",
          period: "2018 – 2021",
          bullets: [
            "Managed care for 5–7 patients per shift across orthopedic and general surgery units",
            "Implemented hourly rounding protocol that decreased patient call light usage by 40% and improved satisfaction scores",
            "Collaborated with multidisciplinary teams for discharge planning, reducing readmission rates by 15%",
          ],
        },
      ],
      education: [
        {
          degree: "Bachelor of Science in Nursing (BSN)",
          school: "University of Illinois Chicago",
          year: "2018",
        },
      ],
      skills: [
        "Patient Assessment",
        "Critical Care",
        "IV Therapy",
        "Epic EHR",
        "BLS/ACLS Certified",
        "Care Coordination",
        "Patient Education",
        "Wound Care",
        "Medication Administration",
        "Team Leadership",
      ],
    },
    writingTips: [
      {
        title: "Lead with your certifications",
        description:
          "RN, BSN, BLS, ACLS, CCRN — put these right in your header or summary. They're the first thing nurse recruiters look for.",
      },
      {
        title: "Quantify patient outcomes",
        description:
          "Use numbers: patient ratios, satisfaction scores, fall rate reductions, readmission rates. Outcomes-driven nursing is what hospitals want to see.",
      },
      {
        title: "Specify your unit and speciality",
        description:
          "ICU, ER, Med/Surg, L&D — be specific. A 'registered nurse' is too vague. Your specialty experience determines which jobs you qualify for.",
      },
      {
        title: "Mention EHR systems",
        description:
          "Epic, Cerner, Meditech — name the systems you've used. Hospitals invest heavily in these and want nurses who can hit the ground running.",
      },
    ],
    keySkills: [
      "Patient assessment and triage",
      "Critical care and ICU nursing",
      "Electronic health records (Epic, Cerner)",
      "Medication administration and IV therapy",
      "Care coordination and discharge planning",
      "Patient and family education",
      "Wound care management",
      "BLS, ACLS, and specialty certifications",
      "Infection control protocols",
      "Interdisciplinary team collaboration",
    ],
    commonMistakes: [
      "Not listing certifications and licensure prominently",
      "Being vague about unit type and patient ratios",
      "Forgetting to include EHR/technology proficiency",
      "Writing a resume longer than 2 pages — keep it focused",
    ],
  },
  {
    slug: "medical-assistant",
    jobTitle: "Medical Assistant",
    category: "Healthcare",
    metaDescription:
      "Medical assistant resume example with clinical and administrative skills, certification details, and tips for getting hired at clinics and hospitals.",
    intro:
      "Medical assistants wear many hats — from taking vitals and drawing blood to scheduling appointments and handling insurance. Your resume should reflect both your clinical skills and administrative capabilities.",
    sampleResume: {
      name: "Daniel Kim",
      title: "Certified Medical Assistant",
      email: "daniel.kim@email.com",
      phone: "(602) 555-0267",
      location: "Phoenix, AZ",
      summary:
        "CMA-certified medical assistant with 3 years of experience in fast-paced family practice and urgent care settings. Proficient in phlebotomy, EKGs, patient intake, and medical billing. Known for maintaining high patient satisfaction scores and efficient clinical workflows.",
      experience: [
        {
          title: "Medical Assistant",
          company: "Desert Valley Family Practice",
          period: "2022 – Present",
          bullets: [
            "Perform patient intake for 35+ patients daily including vital signs, medical histories, and medication reconciliation",
            "Assist physicians with minor surgical procedures, wound care, and injections",
            "Manage referral coordination and prior authorizations, reducing approval wait times by 40%",
          ],
        },
        {
          title: "Medical Assistant",
          company: "QuickCare Urgent Center",
          period: "2021 – 2022",
          bullets: [
            "Conducted phlebotomy, EKGs, and point-of-care testing for an average of 45 patients per day",
            "Maintained inventory of medical supplies and reduced waste by implementing a tracking system",
            "Achieved 100% accuracy in specimen labeling over 12-month period",
          ],
        },
      ],
      education: [
        {
          degree: "Medical Assisting Diploma",
          school: "Maricopa Community College",
          year: "2021",
        },
      ],
      skills: [
        "Phlebotomy",
        "EKG Administration",
        "Patient Intake",
        "Medical Billing (ICD-10)",
        "EMR (athenahealth)",
        "Vital Signs",
        "Injections",
        "HIPAA Compliance",
        "Scheduling",
        "CMA Certified",
      ],
    },
    writingTips: [
      {
        title: "Show both clinical and admin skills",
        description:
          "MAs do both. Highlight phlebotomy and vitals alongside scheduling and billing. Versatility is your selling point.",
      },
      {
        title: "Include patient volume",
        description:
          "Saying '35+ patients daily' shows you can handle a busy practice. Hiring managers care about throughput.",
      },
      {
        title: "List your certification",
        description:
          "CMA (AAMA), RMA (AMT), or CCMA — list it next to your name. Certified MAs earn more and get hired faster.",
      },
      {
        title: "Mention specific EMR systems",
        description:
          "athenahealth, eClinicalWorks, NextGen — name them. Clinics want MAs who don't need weeks of EMR training.",
      },
    ],
    keySkills: [
      "Phlebotomy and specimen collection",
      "Vital signs and patient intake",
      "EKG administration",
      "Medical billing and coding (ICD-10, CPT)",
      "Electronic medical records",
      "Patient scheduling and referral coordination",
      "Injection administration",
      "HIPAA compliance",
      "Medical supply management",
      "CPR/BLS certification",
    ],
    commonMistakes: [
      "Only listing clinical skills and ignoring administrative experience",
      "Not mentioning certification — it's often a minimum requirement",
      "Using vague descriptions like 'assisted doctor' without specifics",
      "Forgetting to include patient volume or efficiency metrics",
    ],
  },
  {
    slug: "pharmacist",
    jobTitle: "Pharmacist",
    category: "Healthcare",
    metaDescription:
      "Pharmacist resume example with clinical pharmacy experience, dispensing metrics, and tips for retail, hospital, and clinical pharmacist positions.",
    intro:
      "Pharmacist resumes should highlight your clinical knowledge, patient counseling abilities, and attention to detail. Whether you work in retail, hospital, or clinical settings, demonstrating accuracy and patient safety is paramount.",
    sampleResume: {
      name: "Lisa Nguyen",
      title: "Pharmacist, PharmD",
      email: "lisa.nguyen@email.com",
      phone: "(714) 555-0412",
      location: "Irvine, CA",
      summary:
        "Licensed pharmacist with 7 years of experience in retail and clinical pharmacy. PharmD with expertise in medication therapy management, immunization administration, and patient counseling. Maintained 99.97% dispensing accuracy across 300+ daily prescriptions.",
      experience: [
        {
          title: "Staff Pharmacist",
          company: "MedStar Community Pharmacy",
          period: "2020 – Present",
          bullets: [
            "Dispense and verify 300+ prescriptions daily with a 99.97% accuracy rate",
            "Conduct medication therapy management (MTM) consultations for 40+ patients monthly, identifying and resolving drug interactions",
            "Administer 50+ immunizations weekly including flu, COVID-19, and shingles vaccines",
            "Supervise and train 4 pharmacy technicians and 2 interns",
          ],
        },
        {
          title: "Clinical Pharmacist",
          company: "Hoag Memorial Hospital",
          period: "2017 – 2020",
          bullets: [
            "Reviewed medication orders for 200-bed facility, catching an average of 12 potential adverse interactions per week",
            "Participated in patient rounds with medical team, providing drug therapy recommendations",
            "Developed antibiotic stewardship protocols that reduced unnecessary antibiotic prescriptions by 22%",
          ],
        },
      ],
      education: [
        {
          degree: "Doctor of Pharmacy (PharmD)",
          school: "USC School of Pharmacy",
          year: "2017",
        },
      ],
      skills: [
        "Prescription Dispensing",
        "Medication Therapy Management",
        "Patient Counseling",
        "Immunization Certified",
        "Drug Interaction Review",
        "Pharmacy Software (QS/1, PioneerRx)",
        "Inventory Management",
        "HIPAA Compliance",
        "Compounding",
        "Controlled Substance Management",
      ],
    },
    writingTips: [
      {
        title: "Emphasize accuracy metrics",
        description:
          "Dispensing accuracy is critical. A number like '99.97% accuracy across 300+ daily prescriptions' immediately builds confidence.",
      },
      {
        title: "Show clinical contributions",
        description:
          "Beyond dispensing, highlight MTM consultations, drug interaction catches, and collaboration with medical teams.",
      },
      {
        title: "Include immunization experience",
        description:
          "Pharmacist-administered vaccinations are a growing part of the role. If you're certified, make it visible.",
      },
      {
        title: "List your license and PharmD",
        description:
          "Put PharmD and your state license in the header. Recruiters scan for this first.",
      },
    ],
    keySkills: [
      "Prescription verification and dispensing",
      "Medication therapy management (MTM)",
      "Patient counseling and education",
      "Drug interaction and allergy screening",
      "Immunization administration",
      "Pharmacy management software",
      "Controlled substance compliance (DEA)",
      "Compounding and sterile preparation",
      "Inventory and formulary management",
      "Clinical rounds and physician collaboration",
    ],
    commonMistakes: [
      "Not quantifying dispensing volume or accuracy rates",
      "Leaving out immunization certification and experience",
      "Being too generic — specify retail vs. hospital vs. clinical experience",
      "Forgetting to mention supervisory or training responsibilities",
    ],
  },

  // ─── BUSINESS & FINANCE ────────────────────────────────────────────
  {
    slug: "accountant",
    jobTitle: "Accountant",
    category: "Business & Finance",
    metaDescription:
      "Accountant resume example with financial reporting experience, CPA credentials, and tips for public accounting, corporate, and tax positions.",
    intro:
      "Accountant resumes need precision — just like the work itself. Hiring managers want to see your technical accounting skills, software proficiency, and the scope of financials you've managed. Here's what an effective accountant resume looks like.",
    sampleResume: {
      name: "Michael Johnson",
      title: "CPA, Accountant",
      email: "michael.johnson@email.com",
      phone: "(469) 555-0234",
      location: "Dallas, TX",
      summary:
        "CPA-licensed accountant with 5 years of experience in financial reporting, tax preparation, and audit support. Managed month-end close for a $40M revenue business unit. Skilled in QuickBooks, SAP, and Excel with advanced financial modeling capabilities.",
      experience: [
        {
          title: "Senior Accountant",
          company: "Pinnacle Financial Group",
          period: "2022 – Present",
          bullets: [
            "Manage month-end and year-end close processes for a $40M revenue business unit, reducing close time from 10 days to 6 days",
            "Prepare financial statements, budget variance analyses, and board-ready reports for executive leadership",
            "Identified and corrected $180K in billing discrepancies through account reconciliation improvements",
            "Coordinate with external auditors during annual audits, achieving clean opinions for 3 consecutive years",
          ],
        },
        {
          title: "Staff Accountant",
          company: "Reed & Associates CPAs",
          period: "2019 – 2022",
          bullets: [
            "Prepared 150+ individual and business tax returns annually with a 99.5% accuracy rate",
            "Performed monthly bank reconciliations for 20+ client accounts",
            "Assisted in transitioning 8 clients from manual bookkeeping to QuickBooks Online, saving an average of 15 hours per month per client",
          ],
        },
      ],
      education: [
        {
          degree: "B.S. Accounting",
          school: "University of Texas at Dallas",
          year: "2019",
        },
      ],
      skills: [
        "Financial Reporting",
        "Tax Preparation",
        "Month-End Close",
        "QuickBooks",
        "SAP",
        "Advanced Excel",
        "Account Reconciliation",
        "GAAP Compliance",
        "Budgeting & Forecasting",
        "CPA Licensed",
      ],
    },
    writingTips: [
      {
        title: "Lead with CPA if you have it",
        description: "CPA is the gold standard. Put it in your name/header: 'Michael Johnson, CPA'. It's often a minimum requirement for senior roles.",
      },
      {
        title: "Quantify the scope",
        description: "Revenue size, number of tax returns, accounts managed — these numbers show the scale you can handle.",
      },
      {
        title: "Name your software",
        description: "QuickBooks, SAP, Oracle, NetSuite — accounting software proficiency is a key differentiator. Be specific.",
      },
      {
        title: "Mention audit experience",
        description: "Whether you supported or conducted audits, include it. Audit experience is highly valued across accounting roles.",
      },
    ],
    keySkills: [
      "Financial statement preparation (GAAP/IFRS)", "Tax preparation and compliance", "Month-end and year-end close", "Account reconciliation",
      "Accounting software (QuickBooks, SAP, Oracle)", "Advanced Excel and financial modeling", "Budgeting and variance analysis", "Audit preparation and coordination",
      "Accounts payable/receivable", "Regulatory compliance",
    ],
    commonMistakes: [
      "Not mentioning CPA status or progress toward it", "Being vague about revenue/portfolio size you managed",
      "Forgetting to list software proficiency — it's essential", "Not highlighting process improvements or efficiency gains",
    ],
  },
  {
    slug: "financial-analyst",
    jobTitle: "Financial Analyst",
    category: "Business & Finance",
    metaDescription: "Financial analyst resume example with modeling experience, valuation skills, and tips for corporate finance and investment analyst roles.",
    intro: "Financial analyst resumes should demonstrate strong analytical thinking and the ability to turn data into decisions. Employers want to see your modeling skills, forecasting accuracy, and the business impact of your recommendations.",
    sampleResume: {
      name: "Rachel Green",
      title: "Financial Analyst",
      email: "rachel.green@email.com",
      phone: "(646) 555-0189",
      location: "New York, NY",
      summary: "Financial analyst with 4 years of experience in corporate FP&A. Expert in financial modeling, forecasting, and variance analysis. Built models that informed $15M+ in capital allocation decisions. Proficient in Excel, SQL, and Tableau.",
      experience: [
        { title: "Financial Analyst", company: "Atlas Capital Partners", period: "2022 – Present", bullets: [
          "Build and maintain 3-statement financial models used for quarterly board presentations and $15M+ investment decisions",
          "Developed rolling forecast model that improved revenue projection accuracy from ±12% to ±4%",
          "Automate monthly reporting using Python and SQL, saving the finance team 20 hours per month",
        ]},
        { title: "Junior Financial Analyst", company: "Horizon Media Holdings", period: "2020 – 2022", bullets: [
          "Prepared monthly budget-vs-actual variance reports for 5 departments totaling $30M in annual spend",
          "Built DCF and comparable company models for 3 potential acquisition targets",
          "Supported annual budgeting process by gathering inputs from 12 department heads and consolidating into master budget",
        ]},
      ],
      education: [{ degree: "B.S. Finance", school: "NYU Stern School of Business", year: "2020" }],
      skills: ["Financial Modeling", "DCF Valuation", "Variance Analysis", "Excel (Advanced)", "SQL", "Python", "Tableau", "Budgeting & Forecasting", "3-Statement Models", "Bloomberg Terminal"],
    },
    writingTips: [
      { title: "Show your models' impact", description: "Don't just say you built models. Explain what decisions they informed and the dollar amounts involved." },
      { title: "Highlight accuracy improvements", description: "Forecasting precision matters. If your model improved accuracy, that's a strong bullet point." },
      { title: "Include technical tools", description: "Excel is a given. SQL, Python, Tableau, and Bloomberg set you apart from other candidates." },
      { title: "Quantify everything", description: "Budget sizes, portfolio values, time saved — finance is the most numbers-driven field. Use them." },
    ],
    keySkills: ["Financial modeling and valuation (DCF, LBO, comps)", "Budgeting and forecasting", "Variance and trend analysis", "Advanced Excel (VBA, pivot tables, macros)",
      "SQL and database querying", "Data visualization (Tableau, Power BI)", "3-statement financial models", "Capital allocation analysis", "Bloomberg Terminal", "Presentation to executive leadership"],
    commonMistakes: ["Not quantifying the financial scope of your work", "Listing only Excel — include SQL, Python, or BI tools to stand out",
      "Being too technical without connecting to business outcomes", "Not mentioning presentation or communication experience"],
  },
  {
    slug: "project-manager",
    jobTitle: "Project Manager",
    category: "Business & Finance",
    metaDescription: "Project manager resume example with PMP certification, budget management, and tips for IT, construction, and agile PM positions.",
    intro: "Project manager resumes need to prove you can deliver — on time, on budget, and on scope. Use concrete metrics and reference the methodologies you apply. Here's a complete example.",
    sampleResume: {
      name: "David Chen",
      title: "PMP, Project Manager",
      email: "david.chen@email.com",
      phone: "(408) 555-0145",
      location: "San Jose, CA",
      summary: "PMP-certified project manager with 7 years of experience leading cross-functional teams on IT and software projects. Managed portfolios totaling $8M+ with a 96% on-time delivery rate. Expert in Agile, Scrum, and hybrid methodologies.",
      experience: [
        { title: "Senior Project Manager", company: "Apex Digital Solutions", period: "2021 – Present", bullets: [
          "Managed a portfolio of 6 concurrent projects with combined budgets of $8.2M, delivering 96% on time and within budget",
          "Led an ERP implementation for a 500-person organization, completing migration 2 weeks ahead of schedule",
          "Established PMO best practices including standardized risk registers and weekly status dashboards adopted across 4 project teams",
        ]},
        { title: "Project Manager", company: "Vertex Software", period: "2017 – 2021", bullets: [
          "Delivered 15+ software development projects using Agile/Scrum with an average sprint velocity improvement of 25% over 6 months",
          "Managed stakeholder relationships across engineering, product, and executive teams for a SaaS platform serving 10K+ users",
          "Reduced project overhead costs by 18% through resource optimization and vendor renegotiation",
        ]},
      ],
      education: [{ degree: "B.S. Business Administration", school: "Santa Clara University", year: "2017" }],
      skills: ["PMP Certified", "Agile/Scrum", "MS Project", "Jira", "Budget Management", "Risk Assessment", "Stakeholder Management", "Resource Planning", "Waterfall", "Confluence"],
    },
    writingTips: [
      { title: "Lead with PMP or relevant certification", description: "PMP, PRINCE2, CSM — certifications signal credibility. Put them in your title line." },
      { title: "Use delivery metrics", description: "On-time rate, budget adherence, scope completion — these are the core PM metrics. Include them." },
      { title: "Reference methodologies", description: "Agile, Scrum, Waterfall, hybrid — name the methodologies and show you can adapt to what the project needs." },
      { title: "Show scale", description: "Team size, budget, number of concurrent projects — scale demonstrates capability." },
    ],
    keySkills: ["Project planning and scheduling", "Budget management and cost control", "Risk identification and mitigation", "Agile, Scrum, and Waterfall methodologies",
      "Stakeholder communication", "Resource allocation", "Project management tools (Jira, MS Project, Asana)", "Change management", "Vendor management", "PMP/PRINCE2 certification"],
    commonMistakes: ["Describing tasks instead of outcomes — 'managed project' vs 'delivered $3M project 2 weeks early'", "Not mentioning budget sizes or team sizes",
      "Forgetting to list PM tools and software", "Not highlighting risk management or problem-solving examples"],
  },
  {
    slug: "business-analyst",
    jobTitle: "Business Analyst",
    category: "Business & Finance",
    metaDescription: "Business analyst resume example with requirements gathering, process improvement, and tips for IT BA and management consulting roles.",
    intro: "Business analyst resumes should demonstrate your ability to bridge business needs and technical solutions. Show that you can gather requirements, analyze processes, and deliver recommendations that create measurable value.",
    sampleResume: {
      name: "Sophia Patel",
      title: "Business Analyst",
      email: "sophia.patel@email.com",
      phone: "(312) 555-0278",
      location: "Chicago, IL",
      summary: "Business analyst with 4 years of experience in requirements gathering, process mapping, and data-driven decision support. Led process improvement initiatives that saved $500K+ annually. Expert in SQL, Tableau, and business process modeling.",
      experience: [
        { title: "Business Analyst", company: "Midwest Insurance Group", period: "2022 – Present", bullets: [
          "Gathered and documented business requirements for a claims automation project, reducing manual processing time by 60%",
          "Created process maps and workflow diagrams using Visio and Lucidchart, improving cross-team understanding of 8 business processes",
          "Developed Tableau dashboards tracking KPIs for claims, underwriting, and customer service — adopted by 50+ users company-wide",
        ]},
        { title: "Junior Business Analyst", company: "Accenture", period: "2020 – 2022", bullets: [
          "Supported 3 concurrent client engagements in financial services, facilitating stakeholder workshops with groups of 10–20",
          "Wrote user stories and acceptance criteria for a $2M digital transformation project, completing UAT with zero critical defects",
          "Conducted competitive analysis and market research that informed client go-to-market strategy",
        ]},
      ],
      education: [{ degree: "B.S. Information Systems", school: "DePaul University", year: "2020" }],
      skills: ["Requirements Gathering", "Process Mapping", "SQL", "Tableau", "User Stories", "UAT Testing", "Stakeholder Workshops", "Visio/Lucidchart", "Agile/Scrum", "Data Analysis"],
    },
    writingTips: [
      { title: "Show the bridge", description: "BAs connect business and tech. Show examples where you translated business needs into technical requirements." },
      { title: "Quantify process improvements", description: "'Reduced processing time by 60%' is much stronger than 'improved efficiency.'" },
      { title: "Mention stakeholder management", description: "Workshop facilitation, executive presentations, vendor coordination — show you can work across all levels." },
      { title: "Include both tools and methods", description: "SQL and Tableau for the technical side. Workshops and process mapping for the methodology side." },
    ],
    keySkills: ["Requirements elicitation and documentation", "Business process modeling (BPMN)", "SQL and data analysis", "Data visualization (Tableau, Power BI)",
      "User story writing and acceptance criteria", "UAT planning and execution", "Stakeholder workshop facilitation", "Agile/Scrum methodologies", "Competitive and market analysis", "Change management"],
    commonMistakes: ["Being too technical or too business-focused — BAs need to show both", "Not including measurable outcomes from process improvements",
      "Forgetting to mention specific tools (Jira, Confluence, Visio)", "Writing vague bullets like 'analyzed business requirements' without context"],
  },

  // ─── CREATIVE & DESIGN ────────────────────────────────────────────
  {
    slug: "graphic-designer",
    jobTitle: "Graphic Designer",
    category: "Creative & Design",
    metaDescription: "Graphic designer resume example with portfolio highlights, brand design experience, and tips for agency and in-house design positions.",
    intro: "Graphic designer resumes must balance visual presentation with clear communication of your skills and impact. Your portfolio does the heavy lifting, but your resume needs to tell the story of your creative career with metrics and context.",
    sampleResume: {
      name: "Maya Roberts",
      title: "Graphic Designer",
      email: "maya.roberts@email.com",
      phone: "(310) 555-0156",
      location: "Los Angeles, CA",
      summary: "Graphic designer with 5 years of experience creating brand identities, marketing collateral, and digital assets for B2C and B2B clients. Portfolio includes work for 40+ brands across tech, fashion, and non-profit sectors. Expert in Adobe Creative Suite and Figma.",
      experience: [
        { title: "Senior Graphic Designer", company: "Wildflower Creative Agency", period: "2022 – Present", bullets: [
          "Lead visual design for 12+ client accounts, producing brand guidelines, social media assets, packaging, and print collateral",
          "Redesigned brand identity for a D2C skincare brand, contributing to a 45% increase in social media engagement post-launch",
          "Manage and mentor 2 junior designers, conducting weekly design critiques and portfolio reviews",
        ]},
        { title: "Graphic Designer", company: "Spark Digital Media", period: "2019 – 2022", bullets: [
          "Designed 200+ social media graphics, email templates, and landing page visuals for 8 recurring clients",
          "Created a modular design system that reduced production time for recurring campaigns by 30%",
          "Produced event branding and signage for 3 annual conferences (500–2,000 attendees each)",
        ]},
      ],
      education: [{ degree: "B.F.A. Graphic Design", school: "Art Center College of Design", year: "2019" }],
      skills: ["Adobe Photoshop", "Adobe Illustrator", "Figma", "InDesign", "Brand Identity", "Typography", "Layout Design", "Print Production", "Motion Graphics (After Effects)", "UI Design"],
    },
    writingTips: [
      { title: "Always link to your portfolio", description: "A graphic design resume without a portfolio link is incomplete. Include your URL prominently — in the header." },
      { title: "Quantify creative impact", description: "'45% increase in engagement' after a rebrand shows business value. Creative work has outcomes — measure them." },
      { title: "Show range", description: "Include examples across print, digital, branding, and social. Versatility is valued, especially in smaller teams." },
      { title: "Keep your resume well-designed", description: "This is one field where resume design actually matters. A poorly designed resume from a designer is an automatic rejection." },
    ],
    keySkills: ["Adobe Creative Suite (Photoshop, Illustrator, InDesign)", "Figma and collaborative design tools", "Brand identity and guidelines",
      "Typography and layout", "Print production and prepress", "Social media and digital asset creation", "Motion graphics and animation", "UI/UX design basics",
      "Design systems and component libraries", "Client presentation and communication"],
    commonMistakes: ["Not including a portfolio link — this is the #1 mistake", "Designing a flashy resume that's hard to read or ATS-unfriendly",
      "Only listing tools without showing creative problem-solving", "Not mentioning client management or collaboration experience"],
  },
  {
    slug: "ux-designer",
    jobTitle: "UX Designer",
    category: "Creative & Design",
    metaDescription: "UX designer resume example with user research, prototyping, and usability testing experience. Tips for product design and UX research roles.",
    intro: "UX designer resumes need to demonstrate both creative thinking and analytical rigor. Show your design process — from research to wireframes to tested prototypes — and quantify how your designs improved user outcomes.",
    sampleResume: {
      name: "James Wright",
      title: "UX Designer",
      email: "james.wright@email.com",
      phone: "(512) 555-0390",
      location: "Austin, TX",
      summary: "UX designer with 4 years of experience creating user-centered digital products. Conducted 100+ user interviews and usability tests. Led redesigns that improved task completion rates by 40% and reduced support tickets by 25%. Expert in Figma, user research, and design systems.",
      experience: [
        { title: "UX Designer", company: "Clearpath Health", period: "2022 – Present", bullets: [
          "Led end-to-end UX design for a patient portal used by 50K+ users, from discovery research through final UI implementation",
          "Conducted 60+ user interviews and usability tests, synthesizing findings into actionable design recommendations",
          "Redesigned the appointment booking flow, improving task completion rate from 62% to 91% and reducing average time-on-task by 45%",
        ]},
        { title: "Junior UX Designer", company: "Tidal Wave Software", period: "2020 – 2022", bullets: [
          "Created wireframes, prototypes, and user flows for 5 product features across web and mobile platforms",
          "Built and maintained a Figma design system with 150+ components used by a 4-person design team",
          "Ran bi-weekly usability tests with 5 participants per round, identifying and prioritizing 30+ UX improvements",
        ]},
      ],
      education: [{ degree: "B.A. Human-Computer Interaction", school: "University of Texas at Austin", year: "2020" }],
      skills: ["Figma", "User Research", "Wireframing", "Prototyping", "Usability Testing", "Design Systems", "Information Architecture", "Accessibility (WCAG)", "User Flows", "Stakeholder Presentations"],
    },
    writingTips: [
      { title: "Show your process", description: "UX is a process, not just an output. Mention research, synthesis, ideation, prototyping, and testing in your bullets." },
      { title: "Quantify usability improvements", description: "Task completion rates, time-on-task, error rates, NPS scores — these prove your designs work." },
      { title: "Include research numbers", description: "Number of interviews, tests conducted, participants involved. It shows rigor, not just intuition." },
      { title: "Link to case studies", description: "A portfolio with detailed case studies is essential. Link to it and make sure it shows your thinking, not just pretty screens." },
    ],
    keySkills: ["User research and interviews", "Wireframing and prototyping (Figma, Sketch)", "Usability testing and analysis", "Design systems and component libraries",
      "Information architecture", "Interaction design", "Accessibility standards (WCAG 2.1)", "User journey mapping", "A/B testing collaboration", "Stakeholder management and presentation"],
    commonMistakes: ["Showing only final designs without explaining the research and reasoning behind them", "Not including usability metrics or user feedback data",
      "Forgetting to mention collaboration with developers and PMs", "Having a portfolio that's all visual and no process"],
  },
  {
    slug: "content-writer",
    jobTitle: "Content Writer",
    category: "Creative & Design",
    metaDescription: "Content writer resume example with SEO writing, content strategy, and portfolio tips for copywriting and content marketing roles.",
    intro: "Content writer resumes need to demonstrate both writing skill and business impact. Employers want to see your ability to create content that ranks, converts, and engages — not just that you can string sentences together.",
    sampleResume: {
      name: "Emma Sullivan",
      title: "Content Writer",
      email: "emma.sullivan@email.com",
      phone: "(720) 555-0241",
      location: "Denver, CO",
      summary: "Content writer with 4 years of experience creating SEO-optimized blog posts, landing pages, and email campaigns. Published 300+ articles with a combined 2M+ organic page views. Skilled in content strategy, keyword research, and conversion-focused copywriting.",
      experience: [
        { title: "Senior Content Writer", company: "GrowthLab Marketing", period: "2022 – Present", bullets: [
          "Write 8–10 long-form blog posts per month (1,500–3,000 words) on SaaS, fintech, and health topics",
          "Grew organic blog traffic from 15K to 85K monthly visitors over 18 months through strategic content and SEO optimization",
          "Created a content brief template and style guide adopted by a 6-person writing team, improving consistency and reducing revision rounds by 40%",
        ]},
        { title: "Content Writer", company: "Beacon Digital Agency", period: "2020 – 2022", bullets: [
          "Produced website copy, email sequences, and social content for 10+ clients across B2B and B2C sectors",
          "Wrote landing page copy for a SaaS client that increased demo requests by 28%",
          "Managed editorial calendar and published 4 blog posts per week while maintaining brand voice consistency",
        ]},
      ],
      education: [{ degree: "B.A. English", school: "University of Colorado Boulder", year: "2020" }],
      skills: ["SEO Writing", "Blog & Long-Form Content", "Copywriting", "Content Strategy", "Keyword Research (Ahrefs, SEMrush)", "Email Marketing", "WordPress/CMS", "Google Analytics", "Social Media Copy", "AP Style"],
    },
    writingTips: [
      { title: "Show traffic and conversion results", description: "Content is measured by performance. '15K → 85K monthly visitors' or '28% more demo requests' proves your writing works." },
      { title: "Include your output volume", description: "'8–10 posts per month' shows you can produce at scale while maintaining quality." },
      { title: "Mention SEO tools", description: "Ahrefs, SEMrush, Clearscope, SurferSEO — name the tools. Content marketing is increasingly technical." },
      { title: "Link to published work", description: "Include 2–3 links to your best published pieces or a portfolio site. Let your writing speak for itself." },
    ],
    keySkills: ["SEO content writing and optimization", "Long-form blog posts and articles", "Conversion-focused copywriting", "Content strategy and editorial planning",
      "Keyword research (Ahrefs, SEMrush)", "Email marketing copywriting", "CMS management (WordPress, Webflow)", "Google Analytics and Search Console",
      "Social media copywriting", "Brand voice and style guide development"],
    commonMistakes: ["Not including performance metrics for your content", "Having typos or formatting errors — instant disqualification for a writer",
      "Not mentioning SEO — it's expected in most content roles now", "Listing 'writing' as a skill instead of showing specific content types"],
  },

  // ─── EDUCATION ─────────────────────────────────────────────────────
  {
    slug: "teacher",
    jobTitle: "Teacher",
    category: "Education",
    metaDescription: "Teacher resume example with classroom management experience, student achievement data, and tips for K-12 and subject-specific teaching positions.",
    intro: "Teacher resumes should highlight your ability to create engaging learning environments and improve student outcomes. Include your certifications, grade levels, subjects, and measurable impacts on student achievement.",
    sampleResume: {
      name: "Amanda Collins",
      title: "High School English Teacher",
      email: "amanda.collins@email.com",
      phone: "(615) 555-0312",
      location: "Nashville, TN",
      summary: "Certified English teacher with 6 years of experience in high school education. State-certified in grades 9–12 English Language Arts. Improved student standardized test scores by 18% over two years through differentiated instruction and data-driven lesson planning.",
      experience: [
        { title: "English Teacher", company: "Hillcrest High School", period: "2020 – Present", bullets: [
          "Teach 5 sections of English Language Arts (grades 9–11) to 150+ students with diverse learning needs",
          "Designed and implemented a reading intervention program that improved struggling readers' comprehension scores by 22%",
          "Serve as English Department Lead, coordinating curriculum alignment across 6 teachers",
          "Advise the school newspaper and creative writing club with 30+ participating students",
        ]},
        { title: "English Teacher", company: "Madison Preparatory Academy", period: "2018 – 2020", bullets: [
          "Taught AP English Literature and Composition with a 78% AP exam pass rate (vs. 55% national average)",
          "Developed project-based learning units that increased student engagement survey scores by 25%",
          "Mentored 4 student teachers through their practicum requirements",
        ]},
      ],
      education: [{ degree: "M.Ed. Curriculum & Instruction", school: "Vanderbilt University", year: "2018" }, { degree: "B.A. English", school: "University of Tennessee", year: "2016" }],
      skills: ["Lesson Planning", "Differentiated Instruction", "Classroom Management", "Assessment Design", "Google Classroom", "IEP/504 Accommodation", "AP Curriculum", "Data-Driven Instruction", "Student Mentoring", "State Certified (9-12 ELA)"],
    },
    writingTips: [
      { title: "Include your certification", description: "State certification, grade levels, and subject endorsements should be clearly visible. It's often a legal requirement." },
      { title: "Show student outcome data", description: "'18% improvement in test scores' or '78% AP pass rate' demonstrates your effectiveness. Use data wherever possible." },
      { title: "Mention grade levels and class sizes", description: "Teaching 150 students is different from 20. Context matters — always include grade levels and approximate class sizes." },
      { title: "Include extracurriculars", description: "Clubs, coaching, committees — these show your commitment beyond the classroom and are often expected." },
    ],
    keySkills: ["Lesson planning and curriculum development", "Differentiated instruction", "Classroom management", "Student assessment and grading",
      "Educational technology (Google Classroom, Canvas)", "IEP/504 compliance and accommodations", "Data-driven instruction", "Parent communication and conferences",
      "Extracurricular program management", "State teaching certification"],
    commonMistakes: ["Not listing certification and grade-level endorsements", "Being vague about student outcomes — include specific data",
      "Only describing what you taught, not how well students learned", "Forgetting to mention technology integration"],
  },
  {
    slug: "academic-advisor",
    jobTitle: "Academic Advisor",
    category: "Education",
    metaDescription: "Academic advisor resume example with student success metrics, advising caseload experience, and tips for higher education and student affairs roles.",
    intro: "Academic advisor resumes need to show your ability to guide students toward success — from course selection to graduation. Demonstrate your caseload management, retention impact, and student development skills.",
    sampleResume: {
      name: "Robert Taylor",
      title: "Academic Advisor",
      email: "robert.taylor@email.com",
      phone: "(614) 555-0189",
      location: "Columbus, OH",
      summary: "Academic advisor with 5 years of experience in higher education advising. Managed caseloads of 350+ students while maintaining a 92% retention rate. Experienced in degree auditing, academic probation interventions, and first-year student programming.",
      experience: [
        { title: "Academic Advisor", company: "Ohio State University — College of Arts & Sciences", period: "2021 – Present", bullets: [
          "Advise 350+ undergraduate students on course selection, degree requirements, and academic planning",
          "Developed an early alert intervention program for at-risk students that improved fall-to-spring retention by 8%",
          "Coordinate new student orientation advising sessions for 600+ incoming freshmen annually",
          "Present academic success workshops on time management, study strategies, and major exploration to groups of 30–50 students",
        ]},
        { title: "Academic Advisor", company: "Columbus State Community College", period: "2019 – 2021", bullets: [
          "Managed a caseload of 400+ students in the undeclared/exploratory program",
          "Created a major-matching assessment process that increased timely major declarations by 25%",
          "Collaborated with financial aid and registrar offices to resolve 200+ student holds per semester",
        ]},
      ],
      education: [{ degree: "M.Ed. Higher Education Administration", school: "Ohio University", year: "2019" }, { degree: "B.A. Psychology", school: "Miami University (OH)", year: "2017" }],
      skills: ["Academic Advising", "Degree Auditing", "Student Success Planning", "DegreeWorks/Banner", "Retention Strategies", "Crisis Intervention", "Workshop Facilitation", "FERPA Compliance", "First-Year Experience", "Multicultural Competency"],
    },
    writingTips: [
      { title: "Quantify your caseload", description: "'350+ students' shows you can manage scale. Always include caseload size." },
      { title: "Show retention impact", description: "Retention and graduation rates are the metrics higher ed cares about most. If you moved the needle, say so." },
      { title: "Include technology", description: "DegreeWorks, Banner, PeopleSoft, EAB Navigate — advising is increasingly tech-enabled. Name the tools." },
      { title: "Highlight programming", description: "Orientation, workshops, first-year experience — these show initiative beyond one-on-one advising." },
    ],
    keySkills: ["Academic advising and degree planning", "Student information systems (Banner, PeopleSoft)", "Degree audit tools (DegreeWorks)", "Retention and early alert programs",
      "Workshop development and facilitation", "Crisis intervention and referral", "FERPA compliance", "First-year experience programming", "Multicultural and inclusive advising", "Data analysis for student outcomes"],
    commonMistakes: ["Not mentioning caseload size — it's essential context", "Being vague about student outcomes and retention data",
      "Forgetting technology — advising tools matter to employers", "Not highlighting programming and event coordination experience"],
  },

  // ─── ENGINEERING ───────────────────────────────────────────────────
  {
    slug: "mechanical-engineer",
    jobTitle: "Mechanical Engineer",
    category: "Engineering",
    metaDescription: "Mechanical engineer resume example with CAD experience, product design projects, and tips for manufacturing and design engineering roles.",
    intro: "Mechanical engineering resumes should showcase your design skills, technical software proficiency, and the tangible impact of your engineering work. Include specific projects, tools, and results.",
    sampleResume: {
      name: "Kevin Hernandez",
      title: "Mechanical Engineer, PE",
      email: "kevin.hernandez@email.com",
      phone: "(313) 555-0278",
      location: "Detroit, MI",
      summary: "Licensed PE mechanical engineer with 6 years of experience in product design and manufacturing engineering. Led design of components for automotive powertrains that reduced manufacturing costs by $1.2M annually. Expert in SolidWorks, ANSYS, and GD&T.",
      experience: [
        { title: "Senior Mechanical Engineer", company: "Precision Automotive Systems", period: "2021 – Present", bullets: [
          "Lead design and development of powertrain mounting systems for 3 vehicle platforms, from concept through production release",
          "Redesigned a transmission bracket using topology optimization, reducing part weight by 28% while maintaining structural requirements",
          "Managed a $1.2M cost reduction project by transitioning 8 cast parts to stamped alternatives with equivalent performance",
          "Mentor 2 junior engineers and review all CAD deliverables for design standards compliance",
        ]},
        { title: "Mechanical Engineer", company: "Great Lakes Manufacturing", period: "2018 – 2021", bullets: [
          "Designed and released 40+ components using SolidWorks, maintaining 100% on-time delivery for production milestones",
          "Conducted FEA simulations (ANSYS) to validate structural integrity, reducing physical prototype iterations by 50%",
          "Collaborated with manufacturing to resolve 20+ producibility issues during FMEA reviews",
        ]},
      ],
      education: [{ degree: "B.S. Mechanical Engineering", school: "University of Michigan", year: "2018" }],
      skills: ["SolidWorks", "ANSYS FEA", "GD&T", "Design for Manufacturing (DFM)", "FMEA", "3D Printing/Prototyping", "Tolerance Analysis", "AutoCAD", "Product Development (APQP)", "PE Licensed"],
    },
    writingTips: [
      { title: "Include PE or EIT status", description: "Professional licensure is a major differentiator. Put PE or EIT in your title." },
      { title: "Name your CAD and simulation tools", description: "SolidWorks, CATIA, ANSYS, Abaqus — hiring managers filter for specific tools." },
      { title: "Quantify engineering outcomes", description: "Cost savings, weight reduction, performance improvements — engineering results should always have numbers." },
      { title: "Show full product lifecycle experience", description: "Concept → design → analysis → prototype → production. Show you've been through the whole cycle." },
    ],
    keySkills: ["3D CAD (SolidWorks, CATIA, NX)", "Finite Element Analysis (ANSYS, Abaqus)", "GD&T and tolerance analysis", "Design for Manufacturing (DFM/DFA)",
      "FMEA and risk assessment", "Prototyping and 3D printing", "Product development lifecycle (APQP)", "Thermal and structural analysis", "Technical drawing and documentation", "PE licensure"],
    commonMistakes: ["Not specifying CAD software — 'CAD experience' is too vague", "Forgetting to include PE/EIT licensure status",
      "Listing responsibilities without measurable outcomes", "Not mentioning cross-functional collaboration with manufacturing or quality teams"],
  },
  {
    slug: "civil-engineer",
    jobTitle: "Civil Engineer",
    category: "Engineering",
    metaDescription: "Civil engineer resume example with infrastructure project experience, PE licensure, and tips for structural, transportation, and environmental engineering roles.",
    intro: "Civil engineer resumes need to demonstrate project leadership, technical expertise, and compliance knowledge. Include project scope, budget, and your specific engineering contributions.",
    sampleResume: {
      name: "Angela Morrison",
      title: "Civil Engineer, PE",
      email: "angela.morrison@email.com",
      phone: "(303) 555-0167",
      location: "Denver, CO",
      summary: "PE-licensed civil engineer with 7 years of experience in infrastructure design and project management. Led design for $25M+ transportation and water infrastructure projects. Expert in AutoCAD Civil 3D, HEC-RAS, and state DOT design standards.",
      experience: [
        { title: "Project Engineer", company: "Summit Engineering Group", period: "2020 – Present", bullets: [
          "Lead design for highway improvement projects valued at $15M–$25M, managing scope from preliminary to final design",
          "Designed stormwater management systems for 3 commercial developments, ensuring compliance with MS4 permit requirements",
          "Coordinate with DOT, municipalities, and utility companies to obtain 30+ permits and approvals per project",
          "Supervise 3 EIT engineers and review all design calculations and plan sets before submission",
        ]},
        { title: "Civil Engineer", company: "Cascade Infrastructure", period: "2017 – 2020", bullets: [
          "Prepared grading plans, utility layouts, and drainage designs for residential subdivisions (50–200+ lots)",
          "Performed hydraulic modeling using HEC-RAS for floodplain analysis on 5 FEMA-regulated waterways",
          "Managed construction observation for $8M water main replacement project, ensuring contractor compliance with specifications",
        ]},
      ],
      education: [{ degree: "B.S. Civil Engineering", school: "Colorado School of Mines", year: "2017" }],
      skills: ["AutoCAD Civil 3D", "HEC-RAS", "StormCAD", "Site Design", "Stormwater Management", "Highway Design", "Utility Coordination", "PE Licensed", "DOT Standards", "Construction Administration"],
    },
    writingTips: [
      { title: "Lead with PE licensure", description: "PE is often required for civil engineering roles. Put it right next to your name." },
      { title: "Include project dollar values", description: "'$25M highway project' communicates scope and responsibility. Always include project value when possible." },
      { title: "Show regulatory knowledge", description: "Mention DOT standards, FEMA, MS4, ADA compliance — civil engineering is heavily regulated." },
      { title: "Name specific software", description: "Civil 3D, HEC-RAS, MicroStation, StormCAD — list the tools relevant to your specialty." },
    ],
    keySkills: ["AutoCAD Civil 3D and MicroStation", "Hydraulic and hydrologic modeling (HEC-RAS, HEC-HMS)", "Site design and grading", "Stormwater management design",
      "Highway and transportation design", "Utility coordination and design", "Construction administration", "Permit acquisition and regulatory compliance", "Geotechnical analysis", "PE licensure"],
    commonMistakes: ["Not including project budget/scale — it's critical context in civil engineering", "Being too general about your specialty (structural, transportation, water resources)",
      "Forgetting PE or EIT status", "Not mentioning permit and regulatory experience"],
  },
  {
    slug: "electrical-engineer",
    jobTitle: "Electrical Engineer",
    category: "Engineering",
    metaDescription: "Electrical engineer resume example with circuit design, power systems, and embedded systems experience. Tips for EE roles in manufacturing and tech.",
    intro: "Electrical engineer resumes should highlight your technical specialization, design tools, and project outcomes. Whether you work in power systems, embedded electronics, or signal processing, specificity wins.",
    sampleResume: {
      name: "Ryan Nakamura",
      title: "Electrical Engineer",
      email: "ryan.nakamura@email.com",
      phone: "(858) 555-0345",
      location: "San Diego, CA",
      summary: "Electrical engineer with 5 years of experience in embedded systems design and PCB layout. Led development of IoT sensor modules shipped in 50K+ units. Expert in Altium Designer, MATLAB, and C/C++ firmware development.",
      experience: [
        { title: "Electrical Engineer", company: "TechNode Systems", period: "2021 – Present", bullets: [
          "Designed and validated PCB layouts for 6 IoT sensor products, from schematic capture through manufacturing release",
          "Developed firmware (C/C++) for ARM Cortex-M4 microcontrollers, achieving 30% power consumption reduction through sleep mode optimization",
          "Led EMC testing and compliance (FCC, CE) for 4 products, achieving first-pass certification for 3 of 4",
          "Collaborated with mechanical engineering to integrate electronics into IP67-rated enclosures",
        ]},
        { title: "Junior Electrical Engineer", company: "Pacific Power Solutions", period: "2019 – 2021", bullets: [
          "Designed power supply circuits (switching and linear regulators) for industrial control systems",
          "Created test procedures and automated test fixtures that reduced production testing time by 35%",
          "Performed signal integrity analysis using oscilloscopes and spectrum analyzers for high-speed digital interfaces",
        ]},
      ],
      education: [{ degree: "B.S. Electrical Engineering", school: "UC San Diego", year: "2019" }],
      skills: ["Altium Designer", "PCB Layout", "C/C++ Firmware", "MATLAB/Simulink", "Oscilloscope/Logic Analyzer", "Power Supply Design", "EMC Testing (FCC/CE)", "ARM Cortex-M", "Signal Integrity", "Schematic Capture"],
    },
    writingTips: [
      { title: "Specify your EE discipline", description: "Power, embedded, RF, signal processing — electrical engineering is broad. Make your specialization clear." },
      { title: "Name your design tools", description: "Altium, KiCad, Cadence, LTspice, MATLAB — tool proficiency is a key hiring filter." },
      { title: "Include compliance experience", description: "FCC, CE, UL — certification experience is valuable and shows you can ship products, not just design them." },
      { title: "Quantify production impact", description: "'50K+ units shipped' or '35% faster testing' connects your engineering work to business outcomes." },
    ],
    keySkills: ["PCB design and layout (Altium, KiCad, Cadence)", "Embedded firmware (C/C++, ARM)", "Power supply design", "MATLAB and Simulink",
      "Test and measurement instruments", "EMC/EMI testing and compliance", "Signal integrity analysis", "Schematic capture and simulation", "FPGA development (VHDL/Verilog)", "Product lifecycle management"],
    commonMistakes: ["Being too broad — specify your EE specialty", "Not mentioning production volume or units shipped",
      "Forgetting compliance and certification experience", "Listing only tools without describing the projects you used them on"],
  },

  // ─── MARKETING & SALES ────────────────────────────────────────────
  {
    slug: "marketing-manager",
    jobTitle: "Marketing Manager",
    category: "Marketing & Sales",
    metaDescription: "Marketing manager resume example with campaign ROI, team leadership, and multi-channel marketing strategy experience for B2B and B2C roles.",
    intro: "Marketing manager resumes must demonstrate strategic thinking and measurable ROI. Show that you can plan campaigns, lead teams, and deliver results across channels — always with numbers to back it up.",
    sampleResume: {
      name: "Jessica Chang",
      title: "Marketing Manager",
      email: "jessica.chang@email.com",
      phone: "(415) 555-0287",
      location: "San Francisco, CA",
      summary: "Marketing manager with 6 years of experience leading multi-channel campaigns for B2B SaaS companies. Managed $1.5M annual marketing budget and a 5-person team. Grew marketing-sourced pipeline by 150% in 18 months through content, paid, and event marketing.",
      experience: [
        { title: "Marketing Manager", company: "SaaSGrid", period: "2022 – Present", bullets: [
          "Manage $1.5M annual marketing budget across content, paid acquisition, events, and email channels",
          "Grew marketing-sourced pipeline from $2M to $5M in 18 months through targeted ABM campaigns and content strategy",
          "Led team of 5 (content writer, designer, demand gen, SDR, coordinator) with weekly sprint planning",
          "Launched company's first webinar series, generating 2,500+ registrations and 180 qualified leads in Q1",
        ]},
        { title: "Digital Marketing Specialist", company: "Elevate Tech", period: "2018 – 2022", bullets: [
          "Managed $40K/month Google Ads and LinkedIn Ads budget with a 4.2x average ROAS",
          "Built and optimized email nurture sequences that improved MQL-to-SQL conversion by 35%",
          "Created SEO strategy that grew organic traffic from 8K to 45K monthly sessions",
        ]},
      ],
      education: [{ degree: "B.S. Marketing", school: "San Francisco State University", year: "2018" }],
      skills: ["Marketing Strategy", "Budget Management", "Google Ads", "LinkedIn Ads", "HubSpot", "SEO", "Content Marketing", "ABM", "Email Marketing", "Team Leadership"],
    },
    writingTips: [
      { title: "Always include ROI metrics", description: "Budget managed, pipeline generated, ROAS, conversion rates — marketing is measured by numbers. Include them everywhere." },
      { title: "Show channel breadth", description: "Paid, organic, email, events, content — show you can orchestrate across channels, not just execute in one." },
      { title: "Highlight team leadership", description: "Include team size, who you managed, and how you structured work (sprints, OKRs, etc.)." },
      { title: "Name your tech stack", description: "HubSpot, Marketo, Google Analytics, Salesforce — marketing is increasingly technical. Show your tools." },
    ],
    keySkills: ["Marketing strategy and campaign planning", "Budget management and ROI analysis", "Paid advertising (Google, LinkedIn, Meta)", "Content marketing and SEO",
      "Email marketing and automation", "Marketing automation (HubSpot, Marketo)", "Account-based marketing (ABM)", "Analytics (Google Analytics, Mixpanel)", "Team leadership and development", "Event marketing and webinars"],
    commonMistakes: ["Not including budget size or ROI metrics", "Listing tactics without strategic context", "Forgetting to mention team management experience", "Not naming specific tools and platforms"],
  },
  {
    slug: "sales-representative",
    jobTitle: "Sales Representative",
    category: "Marketing & Sales",
    metaDescription: "Sales representative resume example with quota attainment, CRM experience, and tips for inside sales, outside sales, and account executive roles.",
    intro: "Sales resumes are the ultimate numbers game. Quota attainment, deal sizes, pipeline value — every line should reinforce that you can close. Here's how to build a resume that sells you as well as you sell your product.",
    sampleResume: {
      name: "Marcus Thompson",
      title: "Sales Representative",
      email: "marcus.thompson@email.com",
      phone: "(972) 555-0198",
      location: "Dallas, TX",
      summary: "B2B sales representative with 4 years of experience in SaaS and technology sales. Consistently exceeded quota by 20–35% with $1.8M+ in closed revenue last year. Expert in consultative selling, Salesforce, and complex deal negotiations.",
      experience: [
        { title: "Account Executive", company: "CloudVault Software", period: "2022 – Present", bullets: [
          "Closed $1.8M in ARR in 2024, exceeding annual quota of $1.4M by 29%",
          "Managed full-cycle sales for mid-market accounts ($15K–$80K ACV), from prospecting through contract signing",
          "Built and maintained pipeline of $3.5M+ through outbound prospecting, referrals, and marketing-sourced leads",
          "Shortened average sales cycle from 62 days to 44 days through improved discovery and qualification process",
        ]},
        { title: "Sales Development Representative", company: "DataPulse Analytics", period: "2020 – 2022", bullets: [
          "Generated 40+ qualified meetings per month through cold calling, email outreach, and LinkedIn engagement",
          "Achieved 145% of meeting quota for 6 consecutive quarters",
          "Developed outbound sequences in Outreach.io that were adopted as templates by the 12-person SDR team",
        ]},
      ],
      education: [{ degree: "B.B.A. Marketing", school: "University of Texas at Arlington", year: "2020" }],
      skills: ["Salesforce", "Consultative Selling", "Pipeline Management", "Cold Calling", "Outreach.io", "Deal Negotiation", "Account Management", "Forecasting", "Discovery & Qualification", "LinkedIn Sales Navigator"],
    },
    writingTips: [
      { title: "Lead with quota attainment", description: "'129% of quota' or '$1.8M closed' should be in your first or second bullet. In sales, your number IS your resume." },
      { title: "Show the full funnel", description: "Prospecting → qualification → demo → close. Show you can work the entire pipeline, not just close warm leads." },
      { title: "Include deal metrics", description: "ACV range, pipeline size, sales cycle length — these give context to your closing ability." },
      { title: "Name your tools", description: "Salesforce, HubSpot, Outreach, Gong, LinkedIn Sales Nav — sales tech proficiency matters." },
    ],
    keySkills: ["Quota attainment and revenue generation", "Full-cycle B2B sales", "Salesforce CRM", "Pipeline management and forecasting", "Consultative and solution selling",
      "Cold calling and outbound prospecting", "Deal negotiation and closing", "Sales engagement tools (Outreach, SalesLoft)", "Account management and expansion", "Sales presentations and demos"],
    commonMistakes: ["Not including quota attainment percentage — it's the most important metric in sales", "Being vague about deal sizes and revenue numbers",
      "Focusing on activities instead of results", "Not mentioning CRM proficiency"],
  },
  {
    slug: "digital-marketing-specialist",
    jobTitle: "Digital Marketing Specialist",
    category: "Marketing & Sales",
    metaDescription: "Digital marketing specialist resume example with SEO, PPC, social media, and analytics experience. Tips for digital marketing and growth roles.",
    intro: "Digital marketing specialist resumes need to show proficiency across channels — SEO, PPC, social, email — with data to prove everything. Employers want marketers who can both execute campaigns and analyze their performance.",
    sampleResume: {
      name: "Ashley Rodriguez",
      title: "Digital Marketing Specialist",
      email: "ashley.rodriguez@email.com",
      phone: "(305) 555-0234",
      location: "Miami, FL",
      summary: "Digital marketing specialist with 3 years of experience managing SEO, PPC, and social media campaigns for e-commerce and SaaS brands. Grew organic traffic by 200% and managed $25K/month ad spend with consistent 5x+ ROAS.",
      experience: [
        { title: "Digital Marketing Specialist", company: "Coral Growth Agency", period: "2022 – Present", bullets: [
          "Manage SEO strategy for 6 client websites, growing combined organic traffic from 30K to 95K monthly sessions",
          "Run Google Ads and Meta Ads campaigns with $25K/month combined budget, maintaining 5.2x average ROAS",
          "Create and A/B test landing pages that improved conversion rates by an average of 32%",
          "Produce monthly analytics reports for clients using Google Analytics 4 and Looker Studio",
        ]},
        { title: "Marketing Coordinator", company: "Seaside E-Commerce", period: "2021 – 2022", bullets: [
          "Managed social media accounts (Instagram, TikTok, Pinterest) growing combined following from 5K to 28K",
          "Set up email automation in Klaviyo that generated $45K in attributed revenue in the first 6 months",
          "Wrote product descriptions and blog content optimized for SEO, ranking 15 pages on the first page of Google",
        ]},
      ],
      education: [{ degree: "B.S. Digital Marketing", school: "Florida International University", year: "2021" }],
      skills: ["SEO (On-Page & Technical)", "Google Ads", "Meta Ads", "Google Analytics 4", "Social Media Marketing", "Email Marketing (Klaviyo)", "A/B Testing", "Looker Studio", "Content Creation", "CRO"],
    },
    writingTips: [
      { title: "Include ROAS and conversion metrics", description: "Digital marketing is all about measurable results. Always include ROAS, CPA, conversion rates, or traffic growth." },
      { title: "Show multi-channel capability", description: "SEO + PPC + social + email shows you can think holistically about growth, not just execute one channel." },
      { title: "List certifications", description: "Google Ads certification, HubSpot certifications, Meta Blueprint — they're free to earn and show initiative." },
      { title: "Be specific about platforms", description: "Google Ads vs. Meta Ads vs. TikTok Ads — each requires different skills. Name which you know." },
    ],
    keySkills: ["Search engine optimization (technical and on-page)", "PPC advertising (Google Ads, Meta Ads)", "Google Analytics 4 and data analysis", "Social media marketing and management",
      "Email marketing and automation (Klaviyo, Mailchimp)", "Conversion rate optimization (CRO)", "A/B testing", "Content marketing and copywriting",
      "Marketing reporting (Looker Studio, Data Studio)", "Landing page optimization"],
    commonMistakes: ["Not including specific metrics for campaigns", "Listing 'social media management' without growth or engagement numbers",
      "Forgetting to mention analytics and reporting skills", "Being too broad — specify which platforms and channels you specialize in"],
  },

  // ─── HOSPITALITY & FOOD SERVICE ────────────────────────────────────
  {
    slug: "restaurant-manager",
    jobTitle: "Restaurant Manager",
    category: "Hospitality & Food Service",
    metaDescription: "Restaurant manager resume example with P&L experience, team leadership, and guest satisfaction metrics for fine dining and casual restaurant positions.",
    intro: "Restaurant manager resumes should balance operational expertise with people leadership. Show your ability to manage P&L, lead teams, maintain quality standards, and keep guests happy — all at the same time.",
    sampleResume: {
      name: "Carlos Mendez",
      title: "Restaurant Manager",
      email: "carlos.mendez@email.com",
      phone: "(512) 555-0167",
      location: "Austin, TX",
      summary: "Restaurant manager with 6 years of experience running high-volume restaurants ($2M–$4M annual revenue). Skilled in P&L management, team development, and guest experience optimization. Improved annual revenue by 18% while reducing food costs by 4 percentage points.",
      experience: [
        { title: "Restaurant Manager", company: "Harvest Kitchen & Bar", period: "2021 – Present", bullets: [
          "Manage all operations for a 120-seat restaurant generating $3.5M annual revenue with a team of 35 staff",
          "Improved annual revenue by 18% through menu optimization, private events, and enhanced online ordering",
          "Reduced food cost from 32% to 28% by implementing inventory management system and renegotiating vendor contracts",
          "Maintained 4.6-star Google rating (900+ reviews) through guest experience training and service recovery protocols",
        ]},
        { title: "Assistant Manager", company: "Urban Plate Restaurant Group", period: "2018 – 2021", bullets: [
          "Supervised front-of-house operations for a 200-seat fast-casual restaurant during peak service (300+ covers daily)",
          "Hired, trained, and scheduled a team of 20 servers and hosts, reducing turnover from 85% to 55% annually",
          "Implemented a table management system that reduced average wait times by 12 minutes during peak hours",
        ]},
      ],
      education: [{ degree: "A.S. Hospitality Management", school: "Austin Community College", year: "2018" }],
      skills: ["P&L Management", "Team Leadership", "Inventory Management", "Toast POS", "Food Cost Control", "Guest Experience", "Staff Training", "Health & Safety Compliance", "Event Coordination", "Vendor Negotiation"],
    },
    writingTips: [
      { title: "Include revenue and cost metrics", description: "Revenue managed, food cost percentage, labor cost — these numbers prove you can run a profitable operation." },
      { title: "Show team management", description: "Team size, hiring, training, turnover reduction — people management is the core of the role." },
      { title: "Mention guest satisfaction data", description: "Google/Yelp ratings, NPS scores, or guest satisfaction surveys. Happy guests = successful manager." },
      { title: "Highlight operational improvements", description: "Systems you implemented, processes you improved, costs you reduced — show you make things better." },
    ],
    keySkills: ["P&L management and financial reporting", "Staff recruitment, training, and scheduling", "Food and labor cost control", "Point-of-sale systems (Toast, Square, Aloha)",
      "Inventory management and ordering", "Guest experience and service recovery", "Health and safety compliance (ServSafe)", "Menu development and pricing", "Vendor relationship management", "Event planning and catering"],
    commonMistakes: ["Not including revenue or financial metrics", "Being vague about team size", "Forgetting to mention guest satisfaction scores or reviews",
      "Not listing POS systems and restaurant technology"],
  },
  {
    slug: "chef",
    jobTitle: "Chef",
    category: "Hospitality & Food Service",
    metaDescription: "Chef resume example with menu development experience, kitchen management skills, and tips for executive chef, sous chef, and line cook positions.",
    intro: "Chef resumes need to showcase your culinary creativity alongside operational management. Menu development, food cost control, kitchen leadership, and health compliance are all essential elements.",
    sampleResume: {
      name: "Nicole Baker",
      title: "Sous Chef",
      email: "nicole.baker@email.com",
      phone: "(773) 555-0298",
      location: "Chicago, IL",
      summary: "Sous chef with 5 years of progressive culinary experience in fine dining and farm-to-table restaurants. Developed seasonal menus that increased covers by 20%. Expert in French and Mediterranean cuisine with a focus on locally sourced ingredients.",
      experience: [
        { title: "Sous Chef", company: "The Verdant Table", period: "2022 – Present", bullets: [
          "Oversee kitchen operations for a 75-seat farm-to-table restaurant, managing a brigade of 8 cooks during service",
          "Develop seasonal menus (rotated quarterly) using local suppliers, contributing to a 20% increase in covers",
          "Maintain food cost at 29% through precise portioning, waste tracking, and creative use of trim and surplus",
          "Train and evaluate kitchen staff on technique, plating standards, and food safety compliance",
        ]},
        { title: "Line Cook / Chef de Partie", company: "Alinea Restaurant Group", period: "2019 – 2022", bullets: [
          "Executed garde manger and sauté stations during 200+ cover services in a Michelin-starred kitchen",
          "Developed 5 specials that were added to the permanent menu based on guest feedback and sales data",
          "Maintained 100% health inspection scores across 4 consecutive inspections",
        ]},
      ],
      education: [{ degree: "A.O.S. Culinary Arts", school: "Le Cordon Bleu Chicago", year: "2019" }],
      skills: ["Menu Development", "Kitchen Management", "Food Cost Control", "French Technique", "Farm-to-Table", "Food Safety (ServSafe)", "Plating & Presentation", "Inventory Management", "Staff Training", "Supplier Sourcing"],
    },
    writingTips: [
      { title: "Highlight menu contributions", description: "Chefs who create, not just execute, are more valuable. Mention menus you developed and how they performed." },
      { title: "Include food cost management", description: "Running a profitable kitchen matters. Include your food cost percentage and any improvements you achieved." },
      { title: "Show progression", description: "Line cook → CDP → sous chef → head chef. Show clear career progression, as is traditional in culinary careers." },
      { title: "Mention cuisine specialties", description: "French, Italian, Asian fusion, farm-to-table — your specialty defines which kitchens you're right for." },
    ],
    keySkills: ["Menu development and recipe creation", "Kitchen brigade management", "Food cost control and waste reduction", "Culinary technique (French, Mediterranean, etc.)",
      "Food safety and sanitation (ServSafe)", "Inventory management and ordering", "Plating and presentation standards", "Supplier relationship management", "Staff training and mentorship", "Health inspection compliance"],
    commonMistakes: ["Not mentioning food cost or budget management", "Focusing only on cooking skills without showing leadership",
      "Being vague about cuisine type and restaurant style", "Forgetting health and safety compliance — it's a basic requirement"],
  },

  // ─── ENTRY LEVEL & STUDENTS ────────────────────────────────────────
  {
    slug: "internship",
    jobTitle: "Internship",
    category: "Entry Level & Students",
    metaDescription: "Internship resume example for college students with limited experience. Tips for writing a resume that highlights coursework, projects, and transferable skills.",
    intro: "Writing an internship resume with limited work experience can feel daunting, but it's completely normal. Focus on coursework, projects, campus involvement, and transferable skills. Every intern starts here.",
    sampleResume: {
      name: "Taylor Kim",
      title: "Computer Science Student",
      email: "taylor.kim@email.com",
      phone: "(919) 555-0134",
      location: "Raleigh, NC",
      summary: "Computer science junior at NC State with hands-on experience in Python, Java, and web development. Completed 3 personal projects and contributed to an open-source library. Seeking a summer software engineering internship to apply classroom knowledge in a professional environment.",
      experience: [
        { title: "IT Help Desk Assistant", company: "NC State University", period: "2023 – Present", bullets: [
          "Resolve 20+ technical support tickets weekly for students and faculty, including software installations and network issues",
          "Created a FAQ knowledge base that reduced repeat tickets by 25%",
          "Train 3 new help desk assistants on ticketing system and troubleshooting procedures",
        ]},
        { title: "Barista", company: "Campus Grounds Coffee", period: "2022 – 2023", bullets: [
          "Managed high-volume drink preparation during rush hours (50+ drinks per hour)",
          "Handled cash register and daily reconciliation with 100% accuracy",
          "Trained 4 new team members on recipes and customer service standards",
        ]},
      ],
      education: [{ degree: "B.S. Computer Science (Expected 2025)", school: "North Carolina State University", year: "2025" }],
      skills: ["Python", "Java", "HTML/CSS/JavaScript", "Git/GitHub", "React (learning)", "SQL basics", "Problem Solving", "Communication", "Time Management", "Team Collaboration"],
    },
    writingTips: [
      { title: "Lead with education", description: "As a student, your education section should come first. Include GPA if it's 3.0+ and relevant coursework." },
      { title: "Include projects", description: "Personal projects, class projects, and hackathons count. Treat them like work experience with descriptions and outcomes." },
      { title: "Transfer skills from any job", description: "Your barista job taught you customer service, multitasking, and teamwork. Frame non-technical jobs in terms of transferable skills." },
      { title: "Write a targeted summary", description: "Mention the specific internship type you're seeking and what you bring. Generic objectives ('seeking a challenging role') hurt more than help." },
    ],
    keySkills: ["Programming languages (Python, Java, JavaScript)", "Version control (Git/GitHub)", "Problem-solving and critical thinking", "Written and verbal communication",
      "Time management and organization", "Team collaboration", "Basic database knowledge (SQL)", "Research and analysis", "Adaptability and willingness to learn", "Customer service experience"],
    commonMistakes: ["Having an empty experience section — include any job, campus role, or volunteer work", "Not including personal or class projects",
      "Writing a generic objective statement instead of a targeted summary", "Including high school information when you're in college (unless you're a freshman)"],
  },
  {
    slug: "recent-graduate",
    jobTitle: "Recent Graduate",
    category: "Entry Level & Students",
    metaDescription: "Recent graduate resume example for entry-level job seekers with no professional experience. Tips for highlighting education, projects, and transferable skills.",
    intro: "Just graduated? Your resume doesn't need 5 years of experience — it needs to show potential. Focus on your education, projects, internships, and the transferable skills that make you a strong entry-level hire.",
    sampleResume: {
      name: "Jordan Ellis",
      title: "Recent Marketing Graduate",
      email: "jordan.ellis@email.com",
      phone: "(404) 555-0267",
      location: "Atlanta, GA",
      summary: "Recent marketing graduate from Georgia State University with internship experience in social media management and content creation. Grew a campus organization's Instagram from 200 to 1,800 followers. Google Analytics and HubSpot certified. Eager to apply data-driven marketing skills in an entry-level role.",
      experience: [
        { title: "Marketing Intern", company: "Peachtree Digital Agency", period: "Summer 2024", bullets: [
          "Assisted with social media content creation and scheduling for 4 client accounts across Instagram, LinkedIn, and TikTok",
          "Wrote 12 blog posts optimized for SEO, 3 of which ranked on page 1 of Google within 2 months",
          "Analyzed campaign performance in Google Analytics and compiled weekly reports for the account manager",
        ]},
        { title: "Social Media Director (Volunteer)", company: "GSU Marketing Club", period: "2023 – 2024", bullets: [
          "Grew the club's Instagram following from 200 to 1,800 through consistent content strategy and student engagement",
          "Planned and promoted 6 networking events with 50–100 attendees each",
          "Managed a content calendar and team of 3 volunteer content creators",
        ]},
      ],
      education: [{ degree: "B.B.A. Marketing", school: "Georgia State University", year: "2024" }],
      skills: ["Social Media Marketing", "Content Creation", "Google Analytics", "SEO Basics", "Canva", "HubSpot (Certified)", "Copywriting", "Email Marketing", "Microsoft Office", "Team Leadership"],
    },
    writingTips: [
      { title: "Treat volunteer and club roles like jobs", description: "Leading a club's social media IS marketing experience. Format these roles with titles, organizations, dates, and bullet points." },
      { title: "Highlight certifications", description: "Google Analytics, HubSpot, Meta Blueprint — free certifications show initiative and give you concrete skills to list." },
      { title: "Include relevant coursework", description: "If you lack work experience, add a 'Relevant Coursework' section: Marketing Analytics, Consumer Behavior, Digital Marketing, etc." },
      { title: "Focus on what you achieved, not just what you did", description: "'Grew Instagram from 200 to 1,800' is much stronger than 'managed social media accounts.'" },
    ],
    keySkills: ["Social media management and content creation", "Basic SEO and keyword research", "Google Analytics and data analysis", "Copywriting and content marketing",
      "Email marketing", "Presentation and communication", "Design tools (Canva, basic Photoshop)", "Project management and organization", "Research and competitive analysis", "Adaptability and fast learning"],
    commonMistakes: ["Leaving out volunteer, club, or campus leadership experience", "Not including certifications — they fill gaps in work experience",
      "Writing 'no experience' or having empty sections — reframe what you have", "Using a generic objective instead of a specific, targeted summary"],
  },
  {
    slug: "college-student",
    jobTitle: "College Student",
    category: "Entry Level & Students",
    metaDescription: "College student resume example for part-time jobs and first professional roles. Tips for building a resume with limited work experience.",
    intro: "Building your first real resume as a college student? You have more to work with than you think. Part-time jobs, campus activities, class projects, and volunteer work all count. Here's how to put it together.",
    sampleResume: {
      name: "Chris Patel",
      title: "Business Administration Student",
      email: "chris.patel@email.com",
      phone: "(480) 555-0189",
      location: "Tempe, AZ",
      summary: "Sophomore at Arizona State University pursuing a B.S. in Business Administration with a concentration in Finance. Dean's List student with part-time retail experience and campus leadership as Treasurer of the Finance Club. Seeking a summer analyst position.",
      experience: [
        { title: "Sales Associate", company: "Target", period: "2023 – Present", bullets: [
          "Assist 30+ customers daily, consistently achieving top 3 ranking in monthly customer satisfaction surveys",
          "Process transactions and handle cash/register operations with 100% accuracy over 6 months",
          "Restock and organize merchandise, improving section presentation and contributing to 8% sales increase in department",
        ]},
        { title: "Treasurer", company: "ASU Finance Club", period: "2023 – Present", bullets: [
          "Manage $12,000 annual budget, tracking expenses, processing reimbursements, and presenting financial reports to executive board",
          "Organized a stock pitch competition with 45 participants and 3 industry judges",
          "Recruited 30 new members through campus outreach, growing membership by 40%",
        ]},
      ],
      education: [{ degree: "B.S. Business Administration – Finance (Expected 2026)", school: "Arizona State University", year: "2026" }],
      skills: ["Microsoft Excel", "Financial Analysis (basics)", "Customer Service", "Cash Handling", "Budget Management", "Public Speaking", "Team Leadership", "Time Management", "PowerPoint", "Research"],
    },
    writingTips: [
      { title: "Put education first", description: "As a current student, education goes at the top. Include your expected graduation date, GPA (if 3.0+), and relevant coursework." },
      { title: "Make campus roles shine", description: "Club Treasurer managing $12K is real financial experience. Frame campus roles with the same rigor as paid positions." },
      { title: "Translate retail into business skills", description: "Customer service = client relations. Cash handling = financial accuracy. Register operations = process management. Reframe everything." },
      { title: "Keep it to one page", description: "With limited experience, one page is not just enough — it's expected. Don't pad." },
    ],
    keySkills: ["Microsoft Office (Excel, PowerPoint, Word)", "Customer service and communication", "Basic financial analysis", "Budget tracking and management",
      "Teamwork and collaboration", "Time management and prioritization", "Public speaking and presentations", "Cash handling and POS systems", "Organizational leadership", "Research and critical thinking"],
    commonMistakes: ["Thinking you 'don't have enough' for a resume — campus roles and part-time jobs count", "Not including GPA when it's above 3.0",
      "Writing long paragraphs instead of concise bullet points", "Including high school activities after freshman year of college"],
  },
  {
    slug: "career-changer",
    jobTitle: "Career Changer",
    category: "Entry Level & Students",
    metaDescription: "Career changer resume example for professionals transitioning to a new field. Tips for highlighting transferable skills and reframing past experience.",
    intro: "Switching careers? Your past experience isn't a liability — it's a differentiator. The key is reframing your transferable skills and showing genuine commitment to your new direction through projects, certifications, or education.",
    sampleResume: {
      name: "Lisa Fernandez",
      title: "Former Teacher → UX Researcher",
      email: "lisa.fernandez@email.com",
      phone: "(503) 555-0345",
      location: "Portland, OR",
      summary: "Former high school teacher transitioning to UX research. 8 years of experience in curriculum design, student assessment, and data-driven instruction. Completed Google UX Design Certificate and conducted 3 independent research projects. Combines deep empathy and analytical thinking with a passion for user-centered design.",
      experience: [
        { title: "UX Research Projects (Independent)", company: "Self-Directed", period: "2024", bullets: [
          "Conducted usability study of a mental health app with 12 participants, identifying 8 critical UX issues and presenting findings in a 30-page report",
          "Designed and ran a card sorting exercise with 20 users to improve information architecture for a local non-profit website",
          "Created user personas, journey maps, and wireframes for a meal planning app as part of Google UX Design Certificate capstone",
        ]},
        { title: "High School English Teacher", company: "Lincoln High School", period: "2016 – 2024", bullets: [
          "Designed curriculum for 150+ students using data from assessments, surveys, and classroom observation — directly transferable to user research methodology",
          "Conducted formative assessments (analogous to usability testing) and iterated lesson plans based on student performance data",
          "Facilitated workshops for 30+ teachers on data-driven instructional methods",
          "Managed parent-teacher communications and stakeholder presentations for IEP meetings",
        ]},
      ],
      education: [
        { degree: "Google UX Design Professional Certificate", school: "Coursera", year: "2024" },
        { degree: "M.Ed. Curriculum & Instruction", school: "Portland State University", year: "2016" },
      ],
      skills: ["User Research", "Usability Testing", "Survey Design", "Figma", "Data Analysis", "Persona Development", "Journey Mapping", "Presentation Skills", "Curriculum Design (transferable)", "Empathy & Active Listening"],
    },
    writingTips: [
      { title: "Lead with your new direction", description: "Put your new target role in the summary and header. Don't make the reader guess what you're transitioning to." },
      { title: "Reframe past experience", description: "Teaching → user research. Sales → customer success. Management → project management. Draw explicit connections between old skills and new roles." },
      { title: "Show commitment through action", description: "Certifications, bootcamps, personal projects, volunteer work in the new field — these prove you're serious, not just curious." },
      { title: "Use a combination resume format", description: "Lead with a skills section highlighting transferable and new skills, then list experience. This shifts focus from your job titles to your capabilities." },
    ],
    keySkills: ["Transferable research and analysis skills", "Data collection and interpretation", "Stakeholder communication and presentation", "New field certifications and training",
      "Project-based portfolio work", "Empathy and active listening", "Problem-solving and critical thinking", "Written and verbal communication", "Adaptability and continuous learning", "Domain expertise from previous career"],
    commonMistakes: ["Not explaining the career change — address it directly in your summary", "Hiding past experience — reframe it as a strength instead",
      "Not showing any new-field experience (projects, certifications, or volunteer work)", "Using the same resume format as if you had linear career progression"],
  },
];

// ── Helpers ────────────────────────────────────────────────────────────

export function getExampleBySlug(slug: string): ResumeExample | undefined {
  return resumeExamples.find((e) => e.slug === slug);
}

export function getExamplesByCategory(category: string): ResumeExample[] {
  return resumeExamples.filter((e) => e.category === category);
}
