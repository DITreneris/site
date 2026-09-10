# Changelog

All notable changes to the Prompt Anatomy ecosystem site are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Gateway method map at `/#method`: lesson (enter-5 on `.cloud`), demo (5-layer Anatomizer), and course (6-block META → ADVANCED on `.app`), plus where-to-start paths to `.cloud`, `.app` (Starter or Core), and `.pro`. No EUR prices.
- `platformHref` / `lessonHref` / `execKitHref` gateway UTM on conversion CTAs (`utm_source=site`, `utm_campaign=gateway`). `ENTITY_FOOTER_URL` unchanged.
- Tier 1 quiz result secondary CTA: Start the free lesson on `promptanatomy.cloud`.
- FAQ capsules for the 6-block system, lesson-vs-kit-vs-course, and “not a prompt-ops vault.” `#method` in `llms.txt`, noscript, and JSON-LD.
- Footer entity line (hub QW1b): `Part of Prompt Anatomy · Training & checkout → promptanatomy.app` with `ENTITY_FOOTER_URL` (www + `utm_source=site`) and `entity_footer_click` analytics.
- Header **Open the platform** CTA (desktop `lg+` and mobile menu) to the hub with gateway UTM (`utm_medium=header`).
- Hero proof line under the subhead (600+ templates · 60 tools · eight stages — across the ecosystem); H1 unchanged.
- Mid-page gateway band after the stats strip repeating the hub CTA (`utm_medium=mid`).
- Sticky **Open the platform** bar on viewports below `lg` (`utm_medium=sticky`), with page bottom padding so footer content is not covered.

### Changed

- Public README slimmed to onboarding. Roadmap, TODO, and the full deploy runbook moved to local `docs/private/` (gitignored; do not recreate at repo root).
- Hub, Enter, and Decide copy aligned with live products (Starter/Core/Pilot names, no EUR; 15-slide EN/LT lesson; exec kit as course lead magnet).
- Anatomizer intro names the six course blocks and links `#method`.
- Product JSON-LD description splits six role kits from Deepen and Play; free Offer no longer lists a `$0` price on the paid hub URL (demo Offer stays on `.site`).
- Compressed site OG (`public/og_2.png`, 1600×900, under 1 MB) and cache-bust `?v=`.

### Fixed

- SequencePath stage grid is one column below `sm` (320px no longer splits two cards).
- Hub DomainDetail “Open” uses `platformHref`; quiz Tier 1 keeps a single Cloud CTA (`lessonHref`); other recommended kits use gateway UTM.
- DomainDetail spoke “Open” and footer Enter→Play now use gateway UTM (`kitHref` / `lessonHref` / `execKitHref`). Spoke footer links emit `kit_outbound`. Entity footer, schema, and legal/social URLs unchanged.
- DomainDetail spoke Open, footer Enter→Play, and quiz kit CTAs now land on each spoke’s live 200 storefront (`spokeCanonical.json`: www where that is Production; `/en/` on `.help`, `.ceo`, `.space`) with gateway UTM unchanged. Entity footer, schema, `llms.txt`, and legal/social stay bare apex.
- Anatomizer stage-example CTA maps to domain ids `ceo` / `space` / `help` (Manage / Create / Hire).
- Method start-path row wraps; DomainDetail title/domain badge wrap; Anatomizer toolbar wraps; dark “Best for” / domain labels use `text-subtle`.

## [1.2.0] - 2026-07-30

### Added

- Max-ROI conversion: quiz / Anatomizer / practice / DomainDetail CTAs to `promptanatomy.app`; dual kit+training CTAs on non-hub DomainDetail; latch-after-copy platform bridge.
- `trackEvent` helper (`@vercel/analytics`) for `platform_outbound`, `kit_outbound`, `quiz_complete`, `anatomizer_copy`, `practice_complete`, `tab_open`.
- Ecosystem role chips (Ops / Marketing / HR / Exec) and Anatomizer kit scenarios (Manage / Create / Hire).
- On-page FAQ (`FaqSection` from `seoFaq.ts`) and FAQPage JSON-LD via `generate-jsonld.mjs`.
- [ROADMAP.md](ROADMAP.md) — product plan through **2027-01-01**: north star (ecosystem clarity + traffic to `promptanatomy.app`), phased work (conversion → routing → demand capture), success measures, and parked backlog; registered in `DOCS_INDEX.md`.
- [TODO.md](TODO.md) — max-ROI execution queue (quiz/Anatomizer/DomainDetail → `.app` CTAs, events, FAQ); explicit non-goals; registered in `DOCS_INDEX.md`.
- Design system harden (**v2.2**): semantic text/surface utilities (`text-body`, `text-muted`, `text-subtle`, `text-on-dark*`, `surface-muted`, `border-subtle`); recipe utilities `btn-glass-sm`, `shell-terminal`, `callout-accent`, `surface-inset` / `surface-inset-soft`; Header `header-shell*` + `nav-tab*` dual-mode utilities.
- CorrectPromptPractice micro-lab on `/#anatomizer`: fix a weak chat prompt by choosing a five-layer structured version, then copy.
- Anatomizer pre-copy checklist gates **Copy prompt** until role, context, and format checks are confirmed.
- Shared `ExclusiveChoiceGroup` (`radiogroup` + arrow keys) for LayerSelector and CorrectPromptPractice.
- Maturity quiz result **What this means** diagnostics derived from each selected answer.
- OAI-SearchBot Allow in `public/robots.txt` (ChatGPT Search) with training-vs-search comments; GPTBot remains Allow by policy.
- WebPage JSON-LD with `dateModified` in `generate-jsonld.mjs`.
- noscript entity capsule in `index.html` (brand, ecosystem order, hash links, `llms.txt`).
- `public/.well-known/security.txt`.
- `vercel.json` security headers (`X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`).
- FAQ section in `llms-full.txt` from `seoFaq.ts` via `generate-llms.mjs`.

### Changed

- `DESIGN_SYSTEM.md` §1 live status; §2–§3 marked historical; §14.3 exceptions promoted to named utilities; Appendix D + §19 declare **v2.2**.
- MVP components migrated to semantic text utilities (pixel-parity slate aliases); DomainDetail / Anatomizer / SequencePath / Header use new recipe utilities.
- Maturity sprint: landing copy tightened (hero badge/sub, stats disclaimer, ecosystem/Anatomizer intros, SequencePath helper, ClosingCta progression line); Team Assessment shell renamed to **60-second team assessment** (retired “diagnostic”); tier 1–2 result descriptions simplified; `llms` maturity deep-link label aligned.
- Agents/skills/rules updated from consistency audit: new [`.cursor/LESSONS.md`](.cursor/LESSONS.md); content-brand / ecosystem-content / seo-crawler / anatomizer-prompt / deploy-vercel; content-editor, seo-specialist, ui-builder, verifier, changelog-keeper; `AGENTS.md` phase UI Deepen + `PLATFORM_URL` convention; `DOCS_INDEX.md` lessons registry.
- Consistency pass: footer Use/Decide labels use kit roles (**organization kit** / **executive kit**); Knowledge phase UI label is **Deepen** (was Learn); StatsStrip eyebrow restored to **Across the ecosystem**; DomainDetail feature heading is **What's included**.
- Tier 3 maturity result copy softened (no “fully scaled enterprise”); Product JSON-LD and founder FAQ drop legacy “daily automation” / “scaling” phrasing; `generate-llms` Tier 3 mirror aligned.
- Hero, ClosingCta, and Footer platform CTAs use `PLATFORM_URL` from `siteContact.ts`.
- Agent/docs truth: `verifier`, `deploy-vercel` skill, and `seo-specialist` check `og_2.png`; `AGENTS.md` documents hand-maintained OG cache-bust (not Satori); `README.md` DESIGN_SYSTEM maturity **v2.2**.
- robots meta: `index, follow, max-image-preview:large, max-snippet:-1`.
- Docs/agents: `seo-crawler` skill, `seo-specialist`, `LESSONS.md`, `DOCS_INDEX`, `DEPLOY` checklist synced to on-page FAQ + FAQPage.
- Max-ROI docs: `TODO.md` progress 1–10 marked done; `ROADMAP` C1 completed early; FAQ agent guidance no longer says “capsules only.”
- Pre-launch truth pass: ecosystem H2 uses **eight ecosystem stages** (not “eight focused kits”); FAQ/Product copy separates six role kits from Deepen + Play; SequencePath “Select a stage”; hub transition “every stage connects back”; DomainDetail Anatomizer CTA is stage-specific only for Manage/Create/Hire; domain feature bullets trimmed; free Offer JSON-LD `url` points at `.site`.

### Removed

- Unused `phaseFor` export from `ecosystemTheme.ts` and unused `public/noise.svg`.
- Contradictory Unreleased notes that still described Play as a sandbox lab and dual Satori `og-image.png` generation (superseded by Corporate Ladder + hand-maintained `og_2.png`).

### Fixed

- Regenerated `llms-full.txt`, `sitemap.xml` lastmod, and JSON-LD `@graph` after copy/schema source updates.
- Google Search Console **Page with redirect** and apex sitemap **Could not fetch** when Vercel primary was `www.promptanatomy.site` (apex HTTPS 307 → www) while repo canonical, OG, sitemap, and JSON-LD pointed to `https://promptanatomy.site/`; production policy is now apex Production + www → apex (308).
- Stale Unreleased **Removed** note that claimed FAQPage was dropped (FAQ is on-page + in JSON-LD again).

### Added

- `vercel.json`: permanent `www.promptanatomy.site` → `https://promptanatomy.site/` redirect (backup once Vercel primary domain is apex).
- Ecosystem stage **8. Play** (`promptanatomy.lol`) in the Deepen/Knowledge phase column — Corporate Ladder game; fills the second card in `SequencePath`.

### Changed

- `DEPLOY.md` §3: explicit apex-vs-www domain table, PowerShell redirect verification, and GSC troubleshooting for inverted Vercel primary domain.
- `DEPLOY.md` §6: expanded GSC URL Inspection and sitemap steps; submit only `https://promptanatomy.site/sitemap.xml` and remove legacy `www` sitemap entry after redirect fix.
- `DOCS_INDEX.md`, `verifier.md`, `deploy-vercel.mdc`, `deploy-vercel` skill: register `vercel.json` and redirect verification checklist (apex 200, www 308).

- Landing copy tightened (~20 words): hero badge/sub, problem section lead, stats strip label/disclaimer, closing CTA — less repetition, same positioning.
- Ecosystem marketing copy truth-aligned with GitHub products: hub repositioned as **6-module training**; subdomain entries rewritten as focused **prompt kits**; `.lol` framed as Corporate Ladder game; `.pro` stripped of false API/multi-agent claims; `.info` corrected to 8 org prompts.
- Ecosystem intro H2: **Six-module training. Eight focused kits. One core hub.** — pipeline arrow chain removed from subtitle.
- Stats strip: **Across the ecosystem** label and stronger aggregate disclaimer for 600+/60/100 counts.
- Anatomizer intro clarifies **5-layer demo** vs **6-block course** at `promptanatomy.app`.
- Footer Play label: **Corporate Ladder** (was sandbox).
- `seoFaq.ts`, `public/llms.txt`, `primal_concept.txt`, and agent docs (`ecosystem-content`, `content-brand`) synced to new positioning.

- Stage **7** renamed **Learn → Deepen** on `promptanatomy.blog` (domain ID unchanged); pipeline string `Enter → … → Deepen → Play`; footer, FAQ, `llms.txt`, `primal_concept.txt`, and agent docs updated to nine-domain wording.

- SEO entity graph: `scripts/generate-jsonld.mjs` builds JSON-LD `@graph` at prebuild from `domains.ts` and `siteContact.ts` — Person (founder), Organization with `founder` link, ItemList (8 ecosystem modules), Product `category: AI Operating System`, WebPage with `dateModified` (FAQPage omitted until Q&A is visible on-page; capsules live in `llms-full.txt` via `seoFaq.ts`).
- Founder social profiles in `siteContact.ts` and footer: LinkedIn, X, Medium, Facebook; `ORG_SAME_AS` split from personal profiles.
- Founder credentials for SEO/GEO only: `AUTHOR_PUBLICATIONS` (Amazon books → Book JSON-LD) and `AUTHOR_MEDIA` (YouTube → Person.sameAs); not shown in footer or hero. OpenSea omitted from SEO to keep B2B entity focus.
- FAQ JSON-LD entry: "Who founded Prompt Anatomy?" `quiz-option` utility for maturity quiz options; §14.3 documented allowed inline exceptions (Anatomizer terminal, accent callout, DomainDetail glass link).
- Hero "Explore the ecosystem" jump link — navigates to ecosystem tab with existing scroll-into-view behavior.
- Design system v2.0 audit pipeline: refined repo-grounded prompt in `second.txt` (delta-only, MVP-scoped, read-only); output artifact `DS_V2_RELEASE_AUDIT.md` with proposed v2.0 definition and P0–P2 roadmap; registered in `DOCS_INDEX.md` Tier 4 and task router; `ui-builder` agent references updated.
- Footer design tokens and utilities in `src/index.css`: `--color-surface-footer`, `--color-border-footer`; `footer-shell`, `footer-accent-band`, and `link-footer-meta` for legal/meta inline links.
- `MOBILE_UX_AUDIT.md` — mobile UX audit findings and fix status; prompt template in `mobile.txt`; indexed in `DOCS_INDEX.md`.
- Vercel Web Analytics: `@vercel/analytics` dependency and `<Analytics />` in `src/main.tsx`; enable Web Analytics in the Vercel project dashboard after deploy — data appears once production traffic hits the site.
- `DOCS_INDEX.md` — central document map with task router, tiered file registry, agent roster, and skills catalog for humans and coding agents.
- `seo-specialist` agent and `seo-crawler` skill — SEO/GEO/AIO and crawler work wired to `seo.txt`, `public/`, and `index.html`.
- Agent–skill assignments documented in `AGENTS.md` and each `.cursor/agents/*.md` file.

### Changed

- Ecosystem stage labels renamed: **Upgrade → Create**, **Recruit → Hire** across `domains.ts`, FAQ, footer, `llms.txt`, `primal_concept.txt`, and agent docs.
- Hero badge now surfaces brand + category: "Prompt Anatomy · AI Operating System for Teams".
- Ecosystem intro shows pipeline labels dynamically from `DOMAINS`.
- `Organization.sameAs` in JSON-LD now lists org URLs only; founder profiles moved to `Person.sameAs`.
- Design system **implementation v2.0** declared (2026-05-31): quiz question shell uses `card-light-lg`; maturity quiz options use `quiz-option`; dead `btn-ghost` utility removed from `index.css` and Appendix D.
- Hero primary CTA aligned to **"Open the platform"** (matches ClosingCta and Footer for `promptanatomy.app` links).
- `DESIGN_SYSTEM.md` §19 expanded with implementation v2.0 declaration criteria; maturity bumped to v2.0 in `AGENTS.md`, `react-ui.mdc`, `DOCS_INDEX.md`, and `ui-builder` agent.
- `DS_V2_RELEASE_AUDIT.md` §10 checklist completed; formal verifier pass recorded (2026-05-31).
- Footer premium polish: navy/gold `footer-accent-band` above a tinted `footer-shell` (bridges from dark `ClosingCta`); brand block as three short lines with semibold taglines; tighter nav column spacing; nav `link-footer` refined (compact block links, hover underline, navy hover text); legal row uses `link-footer-meta` without inflated touch height; two-row legal hierarchy — row 1: copyright · email · policies; row 2: founder · mailing address inline on one muted line. `DESIGN_SYSTEM.md` and `react-ui.mdc` document the new footer utilities.
- Site OG image switched to hand-maintained `public/og_2.png` (1600×900); `generate-og.mjs` now cache-busts and copies to `.github/social-preview.png` instead of Satori generation.
- `index.html`: OG/Twitter/schema image URLs, dimensions, and alt text updated for `og_2.png`.
- `DEPLOY.md` §5 — GitHub repo social preview upload checklist; LinkedIn Post Inspector link in §4.
- `DOCS_INDEX.md`, `deploy-vercel.mdc`, and `seo-crawler` skill document dual OG assets and cache-bust behavior.

### Removed

- `btn-ghost` utility — unused dead code; use `btn-tertiary-sm` for small accent actions.

### Fixed

- Google Rich Results: `Product` JSON-LD now includes `offers` (required alongside `SoftwareApplication`). Verified on production via [Rich Results Test](https://search.google.com/test/rich-results) (2026-05-31) — no critical issues; Product, FAQPage, and entity graph pass.
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

[Unreleased]: https://github.com/DITreneris/site/compare/v1.2.0...HEAD
[1.2.0]: https://github.com/DITreneris/site/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/DITreneris/site/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/DITreneris/site/releases/tag/v1.0.0
[0.1.0]: https://github.com/DITreneris/site/releases/tag/v0.1.0
