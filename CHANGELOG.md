# Changelog

All notable changes to the Prompt Anatomy ecosystem site are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Footer design tokens and utilities in `src/index.css`: `--color-surface-footer`, `--color-border-footer`; `footer-shell`, `footer-accent-band`, and `link-footer-meta` for legal/meta inline links.
- Dual OG export: `scripts/og-constants.mjs` and refactored `scripts/generate-og.mjs` now write `public/og-image.png` (1200×630) and `.github/social-preview.png` (1280×640) via Satori + resvg, with PNG size guard (warn >300 KB, fail >1 MB).
- Build-time cache bust: `generate-og.mjs` patches `og-image.png?v=<hash>` in `index.html` for `og:image`, `twitter:image`, and JSON-LD `Product`/`SoftwareApplication` image fields.
- `MOBILE_UX_AUDIT.md` — mobile UX audit findings and fix status; prompt template in `mobile.txt`; indexed in `DOCS_INDEX.md`.
- Vercel Web Analytics: `@vercel/analytics` dependency and `<Analytics />` in `src/main.tsx`; enable Web Analytics in the Vercel project dashboard after deploy — data appears once production traffic hits the site.
- `DOCS_INDEX.md` — central document map with task router, tiered file registry, agent roster, and skills catalog for humans and coding agents.
- `seo-specialist` agent and `seo-crawler` skill — SEO/GEO/AIO and crawler work wired to `seo.txt`, `public/`, and `index.html`.
- Agent–skill assignments documented in `AGENTS.md` and each `.cursor/agents/*.md` file.

### Changed

- Footer premium polish: navy/gold `footer-accent-band` above a tinted `footer-shell` (bridges from dark `ClosingCta`); brand block as three short lines with semibold taglines; tighter nav column spacing; nav `link-footer` refined (compact block links, hover underline, navy hover text); legal row uses `link-footer-meta` without inflated touch height; two-row legal hierarchy — row 1: copyright · email · policies; row 2: founder · mailing address inline on one muted line. `DESIGN_SYSTEM.md` and `react-ui.mdc` document the new footer utilities.
- Site OG image switched to hand-maintained `public/og_2.png` (1600×900); `generate-og.mjs` now cache-busts and copies to `.github/social-preview.png` instead of Satori generation.
- `index.html`: OG/Twitter/schema image URLs, dimensions, and alt text updated for `og_2.png`.
- `DEPLOY.md` §5 — GitHub repo social preview upload checklist; LinkedIn Post Inspector link in §4.
- `DOCS_INDEX.md`, `deploy-vercel.mdc`, and `seo-crawler` skill document dual OG assets and cache-bust behavior.

### Fixed

- Mobile: `SequencePath` uses single-column stage grid below `sm` and `break-all` on mono domain labels — reduces crowding at 320px.
- Mobile: 44px touch targets on LayerSelector options, Header logo/desktop tabs, Anatomizer copy button (`btn-tertiary-sm`), inline links (`link-inline`), and DomainDetail external link.
- Mobile: Hero H1 scales `text-3xl sm:text-4xl lg:text-5xl`; StatsStrip numbers use `text-5xl sm:text-stat`; header tagline hidden below 360px.
- Mobile QA: `scripts/viewport-qa.mjs` extended to 360 / 390 / 430px widths; `DESIGN_SYSTEM.md` §13 updated.

## [1.1.0] - 2026-05-30

SEO, GEO, AIO, and crawler discoverability — no visible UI redesign.

### Added

- AI-aware `public/robots.txt`: explicit Allow rules for search engines (Googlebot, Bingbot, DuckDuckBot, Applebot) and LLM/answer-engine crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, and others); defensive Disallow for `/src/` and `/node_modules/`.
- `public/llms.txt` — curated site map for AI crawlers (canonical URLs, ecosystem domains, contact/trust, hash section links, ignore list).
- Build-time LLM reference: `scripts/generate-llms.mjs` writes `public/llms-full.txt` from `domains.ts` and `anatomyBuilder.ts`; stamps `lastmod` on `public/sitemap.xml`. Wired into `prebuild` alongside OG generation; `npm run generate:llms` for local runs.
- `src/data/seoFaq.ts` — six FAQ entries as source of truth for JSON-LD (not rendered in visible UI).
- Hash-based tab deep links: `/#ecosystem`, `/#anatomizer`, `/#maturity` via `src/utils/tabNavigation.ts` and `navigateToTab` in `App.tsx` (hash sync on load, tab change, and browser back/forward).

### Changed

- `index.html` head: `robots` meta, `og:locale`, `og:image:alt`, `llms.txt` alternate link; Twitter description aligned with Open Graph; JSON-LD extended with `Product` url/image, `SoftwareApplication`, and `FAQPage`.
- `App.tsx`: all three tab panels always mounted (`hidden` attribute) so ecosystem, Anatomizer, and maturity content stay in the DOM for crawlers; tab-switch scroll-into-view unchanged.
- `DEPLOY.md`: post-deploy checklist for `/llms.txt`, `/llms-full.txt`, hash deep links, Rich Results Test, and sitemap submission to GSC/Bing.

## [1.0.0] - 2026-05-30

First public production deploy at [promptanatomy.site](https://promptanatomy.site) via [github.com/DITreneris/site](https://github.com/DITreneris/site) and Vercel.

### Added

- `README.md` — project onboarding, local dev, deploy steps, and source-of-truth table.
- Build-time OG image generation: `scripts/generate-og.mjs` (Satori + `@resvg/resvg-js`), `npm run generate:og`, wired as `prebuild`.
- Deploy agent environment: `.cursor/rules/deploy-vercel.mdc`, `.cursor/skills/deploy-vercel/SKILL.md`.
- Isolated git repository in project root; remote `github.com/DITreneris/site`.
- `public/creator-janitor.png` hero asset for `ProblemSolution`.
- `SITE_URL` / `PLATFORM_URL` constants in `src/data/siteContact.ts` documenting the `.site` vs `.app` split.
- Design system **v1.5 pre-release**: §13 responsive + accessibility maturity (breakpoint matrix, mobile QA checklist, WCAG contrast matrix, focus-order audit, a11y baseline table, visual regression risks); §14 agent readiness and coding guardrails with allowed/forbidden examples; §15–§17 staged roadmap, document canon, and release checklist. No UI redesign.
- Design system **v1.0** declared: §10 implementation checklist complete; automated viewport QA at 320 / 768 / 1280 via `scripts/viewport-qa.mjs` (`npm run qa:viewport`); Playwright added as dev dependency for QA script.
- `DESIGN_SYSTEM.md` — design system maturity audit and roadmap (v0.4 baseline documented).
- Design system v0.5–v0.7 code: Inter font in `index.html`; typography tokens `text-micro` / `text-caption` / `text-eyebrow-light`; layout containers (`container-hero` through `container-wide`); utilities `card-light`, `card-light-lg`, `btn-secondary-dark` (+ `-md`), `btn-tertiary-sm`, `link-footer`, `link-inline`; component refactors; quiz result `aria-live="polite"`; dark-band copy contrast bump (`text-slate-300` on ecosystem intros); cross-links in `AGENTS.md` and `.cursor/rules/react-ui.mdc`.
- Footer trust block (mother-brand adaptation): `src/data/siteContact.ts` for organization, author, social, and legal constants; third **Contact & community** column (LinkedIn, X, Telegram, email); legal bar (copyright, `info@promptanatomy.app`, Privacy/Terms/Cookies on promptanatomy.blog); founder line and mailing `<address>`; Organization JSON-LD extended with `email`, `PostalAddress`, and `sameAs`; `twitter:site` / `twitter:creator` meta.
- Premium SaaS integration polish (UI only, no copy/architecture changes):
  - Solid component surfaces: new `--color-surface-card` / `--color-surface-card-hover` / `--color-surface-inset` tokens; `card-glass` and the `SequencePath` panel now sit opaquely above the grid so cards read as real components (figure/ground) instead of letting the grid bleed through.
  - Scroll-adaptive `Header`: light glass over the hero, dark glass once scrolled over a dark section; nav tabs, logo, and mobile toggle keep full contrast and remain clickable in both states.
  - Per-phase selection language: selected ecosystem stages use a phase-colored ring + soft `shadow-glow-*` (new tokens) instead of generic gold; gold is reserved for the Core hub. `DomainDetail` carries a soft phase glow that echoes the selection.
  - Hub-to-journey connector "bus" replacing the single hairline (decorative, `aria-hidden`, `lg`+), plus a right-aligned phase-dot cluster that balances the Core hub bar.
  - Motion: shared `animate-panel-in` entrance for tab panels, the domain detail card, and quiz steps/result; tab changes smooth-scroll the active panel into view (both respect `prefers-reduced-motion`).
  - Anatomizer terminal: thin custom scrollbar (`scrollbar-thin-dark`) and accent-tinted block tags (render-only; the copied prompt string is unchanged).
  - Brand `::selection` color and dark-section focus-ring offset for legible focus on dark surfaces.
- Ecosystem as a connected maturity system: `SequencePath` presents the core hub as the spine origin followed by a four-phase journey (Adopt, Apply, Scale, Learn) with directional connectors between phases. Phase-derived color is always visible and the card intensifies on selection.
- Phase-driven color model in `src/data/ecosystemTheme.ts` (`PHASE_ACCENT`, `DOMAIN_PHASE`, `phaseFor`, `accentForPhase`, `phaseLabelFor`) replacing the previous arbitrary domain-to-accent mapping; each phase maps to one `ecosystem-*` token (no rainbow).
- New `phase`, `transition`, and optional `maturityTier` fields on `Domain` (`src/types/index.ts`, populated in `src/data/domains.ts`); `DomainDetail` now shows a phase badge, the maturity tier (tied to quiz tiers), a "next in the journey" line, and a cross-link into the Anatomizer.
- Hero CTAs: "See the workflows" (-> promptanatomy.app) and "Take the 60-second assessment" (switches to the assessment tab) via a lifted `onStartAssessment` callback.
- Quiz result now drives conversion: a primary CTA opens the recommended live domain alongside the in-app pivot.
- Problem-first framing (`ProblemSolution`) and a proof/stats strip (`StatsStrip`, using the `--text-stat` token) under the hero; a closing CTA band (`ClosingCta`) before the footer.
- Emotional "Creator to Output Janitor" visual (`public/creator-janitor.png`) in `ProblemSolution`, centered and framed (`mx-auto max-w-3xl`, `rounded-2xl`, `shadow-tier-2`) as the section's emotional hook.
- `StatsStrip` rebuilt as a premium dark promo banner: `section-dark` band with radial gold glow, a "Prompt Anatomy" gold wordmark eyebrow, gold `accent-gradient` figures, and `lg` vertical dividers between tiles.
- SEO/social/AI-crawler basics in `index.html`: canonical, Open Graph, Twitter card, `theme-color`, and JSON-LD (`Organization`/`WebSite`/`Product`); `public/robots.txt`; branded `public/og-image.png`.
- Accessibility: `role="tablist"/"tab"/"tabpanel"` with `aria-selected`/`aria-controls` across `Header` and `App`, plus a skip-to-content link.

### Changed

- UI polish consistency (no copy changes): light-surface eyebrows in `AnatomizerBuilder` and `MaturityQuiz` switched from low-contrast gold to `text-amber-700`; `DomainDetail` icon container neutralized (`bg-white/[0.04]`) so phase color lives only on the dot + icon stroke; `SequencePath` stage cards raised with white-alpha surfaces and inter-phase arrows strengthened (`slate-400`, `icon-md`) and nudged to the card row; `LayerSelector` relaxes to two columns under `sm` with press feedback; quiz options adopt a unified `hover-lift`.
- `ProblemSolution` copy trimmed to lead with emotion: heading "Random prompting quietly taxes your team" -> "More output is not less work"; intro cut to one line; the Random and Structured lists reduced from four to three fragment-style bullets each.
- `StatsStrip` numbers now count up on scroll into view (one-time `IntersectionObserver` trigger, `requestAnimationFrame` ease-out ~1s, `tabular-nums`), including the `30-50%` range; respects `prefers-reduced-motion` by showing final values instantly.
- `EcosystemMap` intro paragraph trimmed: dropped the redundant "Seven stages... Enter, Use, Upgrade, Recruit, Manage, Decide, Learn" recap (already shown in the heading and `SequencePath`), leaving a single role-focused line.
- Above-the-fold copy tightened for scannability:
  - Tab UI labels shortened: "AI OS Map" -> "Ecosystem", "Team AI Assessment" -> "Team Assessment" (internal tab ids unchanged); matching `aria-label`s updated in `App`, and the label references in `AGENTS.md` / `react-ui.mdc` kept in sync.
  - Header logo lockup decluttered: removed the "AI OS" pill, leaving the wordmark + "Structured Work Systems" caption.
  - Hero badge shortened to "Random chat -> repeatable systems" (Sparkles icon dropped); subhead rewritten in active voice ("Build reusable AI workflows, prompt templates, and team standards - so everyday AI use becomes a repeatable business process.") and "tool maps" dropped since tools are covered by the stats strip.
  - Hero primary CTA "See the workflows" -> "Explore workflows" (still -> promptanatomy.app).
- Landing message hierarchy cleanup to reduce label/taxonomy overload:
  - `SequencePath` decluttered while keeping the four-phase grouping (Adopt, Apply, Scale, Learn) as the single organizing axis: removed `Stage 0n` numbers and the "Deployment Sequence"/"Central OS" labels, and simplified the section header to "Where to start". Each stage card now shows its name, a one-line role, and the demoted domain URL; phase remains a small group caption with its accent color.
  - Ecosystem heading "One operating system, eight focused domains" -> "One platform. Seven workflow modules, one core hub." to resolve the eight-vs-seven count contradiction.
  - Tab UI labels renamed: "Ecosystem Map" -> "AI OS Map", "Anatomizer Builder" -> "Prompt Builder" (internal tab ids and the `AnatomizerBuilder` component name unchanged); matching `aria-label`s updated in `App`.
  - Hero primary CTA "Explore the platform" -> "See the workflows"; support copy tightened to concrete deliverables (reusable workflows, prompt templates, tool maps, team standards).
  - `DomainDetail` now has a single primary action ("Open promptanatomy.{x}"); the Anatomizer cross-link is demoted to a quiet text link ("See an example prompt for this stage").
- Stats strip: the 30-50% metric is reframed as "Target reduction in routine team work" with a clarifying basis line ("Target based on workflow standardization, not full task automation.") to protect credibility.
- Hero headline accent now uses a darker `accent-gradient-strong` token for WCAG-legible contrast on the light background.
- CTA wording: footer "Get enterprise OS access" -> "Open the platform"; domain detail "Visit live site" -> "Open promptanatomy.{x}"; quiz "Explore stage solution" -> "See your recommended starting point".
- SEO canonical, Open Graph, Twitter cards, sitemap, and robots.txt now target `promptanatomy.site`; Organization JSON-LD remains on `promptanatomy.app` with `.site` in `sameAs`; WebSite schema on `promptanatomy.site`.
- Refreshed Cursor agents (`ui-builder`, `verifier`), rules (`project-core`, `deploy-vercel`), and skills (`ecosystem-content`, `scaffold-mvp` marked historical) for post-scaffold production state.
- `AGENTS.md` updated: React 19, official repo/URL/deploy, expanded scope.
- `DESIGN_SYSTEM.md`: fixed stale Inter gap in audit; added README and deploy paths to file map.

## [0.1.0] - 2026-05-30

### Added

- Vite + React 18 + TypeScript scaffold with Tailwind CSS v4 (`@tailwindcss/vite`) and lucide-react.
- Design token layer in `src/index.css` (`@theme` + `@utility`) ported from the mother repo: brand navy `#0b1320` / gold `#cfa73a`, `ecosystem-1..4` accents, CTA/accent/hero gradients, shadow tiers, and utilities (`btn-primary`, `section-default`, `section-dark`, `section-heading`, `card-glass`, `badge-accent`, `focus-ring`, `text-label-upper`, `text-nav-link`, `icon-sm/md/lg`).
- Brand assets: navy + gold lightning `public/favicon.svg` and `public/noise.svg`.
- Data layer in `src/data/`: `domains.ts` (8 domains, slim fields, 3 features each), `anatomyBuilder.ts` (5 layers + presets), `maturityQuiz.ts` (3 questions + tier scoring), and `ecosystemTheme.ts` (8 domains mapped onto 4 accent colors). Shared types in `src/types/`.
- Three-tab MVP: Ecosystem Map (`SequencePath` + `DomainDetail` on a dark band), Anatomizer Builder (reusable `LayerSelector` x5 + live prompt preview equal to the copy string + copy-to-clipboard), and Team AI Assessment (3-step quiz with tier result and pivot to the recommended domain).
- Layout components: `Header` (3-tab nav + mobile menu), `Hero`, and a mother-aligned `Footer` (gold lightning, wordmark, tagline, real `promptanatomy.*` link columns, legal bar with year and creator credit).
- Cursor environment: `AGENTS.md`, rules (`project-core`, `react-ui`, `content-brand`), agents (`ui-builder`, `content-editor`, `verifier`), and skills (`ecosystem-content`, `anatomizer-prompt`, `scaffold-mvp`).

### Changed

- Full brand alignment with the mother repo: replaced the prototype's full-page dark slate + indigo palette and 8 rainbow gradients with light page surfaces, a dark ecosystem band, and the navy/gold token system.
- `.cursor/rules/react-ui.mdc` now points to `src/index.css` `@theme` as the token source of truth and forbids raw `rgba(...)` / ad-hoc `text-[NNpx]` in JSX.

### Removed

- Applied KISS-Marry-Kill cuts from the prototype: the duplicate System Directory grid, the right-hand sidebar, per-domain stats blocks, fake footer trust links, the duplicate "Diagnose Maturity" header button, dead imports, and the partial 2-domain Anatomizer prefill.

[Unreleased]: https://github.com/DITreneris/site/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/DITreneris/site/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/DITreneris/site/releases/tag/v1.0.0
[0.1.0]: https://github.com/DITreneris/site/releases/tag/v0.1.0
