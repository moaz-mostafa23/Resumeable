# Resumeable Homepage Redesign: Wireframe + Execution Plan

## 1) Primary UX goals
- Increase first-screen clarity: what Resumeable is, who it is for, and what to do next.
- Remove "generic AI SaaS" signals (glow orbs, vague hype copy, repetitive feature-grid sameness).
- Lead with proof of transformation (before/after quality), then process, then trust.
- Keep motion meaningful and lightweight, with reduced-motion fallback.

## 2) Research distilled (online)
- Users scan pages quickly; concise headings and scannable structure outperform dense blocks.
- Above-the-fold content gets the most attention, so the core value proposition and CTA must appear immediately.
- Credibility signals and specific claims improve trust more than generic marketing language.
- High-performance animation should favor transform/opacity to avoid jank.
- Motion must respect user preferences (`prefers-reduced-motion`) for accessibility.

References used:
- https://www.nngroup.com/articles/how-users-read-on-the-web/
- https://www.nngroup.com/articles/scrolling-and-attention/
- https://www.nngroup.com/articles/trustworthy-design/
- https://web.dev/articles/animations-guide
- https://web.dev/articles/prefers-reduced-motion

## 3) Wireframe (desktop)

[Sticky Nav]
Logo | Templates | Examples | Pricing | Sign in | Primary CTA

[Hero: 2-column]
Left:
- Label: "Built for real job hunts"
- H1: strong anti-generic positioning
- Subhead: ATS-safe + human-readable benefit
- Primary CTA + Secondary CTA
- Lightweight trust line (no card/no watermark/no gate)

Right:
- Before card (dense, weak)
- After card (scannable, quantified)
- Outcome banner (why the transformation matters)

[Proof Strip: 3 cards]
- Recruiter scan behavior fit
- ATS-safe structure
- No signup wall

[Resume Clinic: 3 cards]
Problem -> Method -> Outcome

[How It Works: 3 steps]
Choose direction -> Refine story -> Export PDF

[Builder Quality: 3 cards]
Realtime preview -> Design control -> Flexible sections

[Bottom Split Section]
Left: final CTA panel
Right: FAQ panel (4 common objections)

[Footer]
Core links + legal links

## 4) Motion system
- Entry reveal for hero/nav.
- On-scroll reveal for sections (small vertical offset + fade).
- Small hover lift on cards.
- Single ambient float on "After" card.
- Reduced-motion mode disables ambient animation and keeps instant visibility.

## 5) Execution status
- `src/app/page.tsx`: rebuilt around this wireframe.
- `src/app/globals.css`: homepage visual system + reduced-motion support.
- `src/app/layout.tsx`: added font variables for stronger visual direction.
