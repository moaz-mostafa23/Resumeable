# Sitewide UX + Mobile + SEO Research Notes (Feb 9, 2026)

## External research references
- Responsive layout fundamentals: https://web.dev/articles/responsive-web-design-basics
- Mobile tap target accessibility (48x48 CSS px guidance): https://web.dev/articles/accessible-tap-targets
- Mobile-first indexing expectations: https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing
- Form UX for mobile and autofill patterns: https://web.dev/sign-in-form-best-practices
- Motion accessibility (`prefers-reduced-motion`): https://web.dev/articles/prefers-reduced-motion
- Mobile homepage behavior research: https://baymard.com/mcommerce-usability/benchmark/mobile-page-types/homepage

## Design system rollout goals
- Keep one visual identity across all pages (palette, typography, card language, spacing rhythm).
- Preserve fast scanning on mobile through clear heading hierarchy and short section blocks.
- Raise touch usability with larger interactive targets.
- Keep SEO pages crawlable and utility/auth pages out of index.

## What was changed by page

### 1) Shared shell + consistency
- Added shared site header: `src/components/site/SiteHeader.tsx`
- Added shared site footer: `src/components/site/SiteFooter.tsx`
- Added shared marketing page wrapper: `src/components/site/MarketingShell.tsx`

### 2) Public marketing pages
- Pricing redesigned to themed card layout and better mobile stacking:
  - `src/app/pricing/PricingPage.tsx`
- Templates gallery redesigned with consistent theme and mobile filters/cards:
  - `src/app/templates/TemplatesGallery.tsx`
- Resume examples list redesigned for role discovery on mobile:
  - `src/app/resume-examples/page.tsx`
- Resume example detail redesigned with stacked mobile content flow:
  - `src/app/resume-examples/[slug]/page.tsx`
- Legal pages moved into themed readable article shell:
  - `src/app/privacy/page.tsx`
  - `src/app/terms/page.tsx`
- 404 page redesigned in same visual system:
  - `src/app/not-found.tsx`

### 3) Auth + app utility pages
- Auth pages themed and centered for mobile-first sign-in:
  - `src/app/(auth)/login/page.tsx`
  - `src/app/(auth)/signup/page.tsx`
- Auth forms rebuilt with larger, clearer CTA targets:
  - `src/components/auth/LoginForm.tsx`
  - `src/components/auth/SignupForm.tsx`
- Dashboard redesigned to match theme and remain usable on small screens:
  - `src/app/dashboard/page.tsx`
- New resume/template selection redesigned with sticky mobile action bar:
  - `src/app/builder/new/page.tsx`
- Builder route unauth state themed and clearer:
  - `src/app/builder/[id]/page.tsx`
- Editor layout improved for mobile (stacked panels, hidden desktop-only drag handle):
  - `src/components/editor/EditorLayout.tsx`

### 4) SEO and indexing hygiene
- Added `noindex, nofollow` metadata for auth group:
  - `src/app/(auth)/layout.tsx`
- Added `noindex, nofollow` metadata for dashboard:
  - `src/app/dashboard/layout.tsx`
- Added `noindex, nofollow` metadata for builder flows:
  - `src/app/builder/layout.tsx`
- Expanded structured data where applicable on examples/templates/pricing pages.
- Preserved canonical URLs on key public pages.

### 5) Mobile-specific interaction improvements
- Increased base button tap target sizing globally:
  - `src/components/ui/button.tsx`
- Added mobile-safe sticky action region in template selection flow.
- Reduced horizontal overflow risk by using stacked layouts and responsive widths.
- Preserved reduced-motion safety for animated elements.
