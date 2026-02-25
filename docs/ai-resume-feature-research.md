# AI Resume Feature Research (Feb 25, 2026)

## Goal
Identify the highest-value AI features for a resume builder and map them to concrete product work.

## Key user/market signals
- **Users need resume-job alignment, not generic writing.**
  - Indeed recommends matching keywords and skills from the target job description because ATS and recruiters screen for relevance.
  - Source: https://www.indeed.com/career-advice/resumes-cover-letters/how-to-tailor-your-resume

- **Recruiters do a very fast first pass, so bullets must be scannable and outcome-focused.**
  - MIT Communication Lab notes the first resume pass can take around 6-10 seconds.
  - Source: https://mitcommlab.mit.edu/cee/commkit/resume/

- **Strong bullets should emphasize action + measurable impact.**
  - Yale CDO guidance stresses quantifying impact and using concise accomplishment statements.
  - Source: https://ocs.yale.edu/channels/create-a-resume-cv-or-cover-letter/

- **Skills are changing quickly, which increases value of job-specific skill gap suggestions.**
  - World Economic Forum reports that 39% of workers' core skills are expected to change by 2030.
  - Source: https://www.weforum.org/stories/2025/02/future-of-jobs-report-2025/

- **The market is already clustering around AI targeting workflows.**
  - Jobscan emphasizes match-rate optimization, missing keywords, and ATS checks.
  - Source: https://www.jobscan.co
  - Rezi promotes AI bullet rewriting and role-targeted resume updates.
  - Source: https://www.rezi.ai
  - Kickresume highlights AI keyword matching against job descriptions.
  - Source: https://www.kickresume.com/en/help-center/job-description-matcher-how-does-it-work/

## High-value feature decisions
1. **Job-tailored summary generation** (fast role alignment)
2. **Experience bullet rewrite** (impact phrasing + ATS keyword alignment)
3. **Skill gap suggestions from job description** (missing hard-skill coverage)
4. **ATS-style keyword match check** (instant feedback loop)

## What was implemented
- New builder section: `AI Assistant`
- Anthropic-backed API route for summary/bullet/skills actions
- Deterministic ATS keyword overlap scoring and quick-win suggestions
- Apply buttons to write AI outputs directly into the resume store
