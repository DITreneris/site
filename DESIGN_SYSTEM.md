# Prompt Anatomy — Design System

**Status:** Living roadmap  
**Audience:** Product owner, frontend developer, UI/UX designer, coding agents  
**Scope:** MVP marketing site (`68_site`) — no redesign, no new brand identity  
**App release version** (`package.json`): `0.1.0` — independent of design-system maturity below.

---

## 1. Executive summary

### Current design system status

The site has **migrated from the `snippet.txt` prototype** (full-page `slate-950`, indigo accents, eight rainbow domain gradients) to a **mother-repo-aligned token layer** in `src/index.css` (Tailwind v4 `@theme` + `@utility`). The visual model is a **light marketing shell** (hero, problem/solution, tab panels) with a **dark ecosystem band** (`section-dark`, glass cards, phase accents). Agent guidance exists in `.cursor/rules/react-ui.mdc` and `AGENTS.md`, but until this file there was **no human-facing design-system documentation** and **no `components/ui/` primitive layer**—patterns are repeated as Tailwind class strings across ~15 TSX files.

### Current design system version: **v1.5 pre-release**

| Signal | Evidence |
|--------|----------|
| **v1.0 achieved** | Closed utility set; Inter loaded; component refactors; §10 checklist passed; `npm run qa:viewport` |
| **v1.2 achieved** | §13 responsive rules, mobile QA checklist, WCAG contrast matrix, focus-order audit, accessibility baseline table |
| **v1.5 pre-release achieved** | §14 coding-agent guardrails (allowed/forbidden examples); §15 staged roadmap; §16 document canon; §17 release checklist |

### What v1.5 pre-release means here

Not a visual redesign. The design system is **documented, testable, and agent-ready**: tokens and utilities are closed, QA gates are written, and coding agents have explicit do/don't rules. Optional follow-up: run verifier agent before public marketing of DS maturity.

---

## 2. Design system maturity audit

### Brand foundations

- **Works:** Navy `#0b1320`, gold `#cfa73a`, four phase accents; gold reserved for hub (`ecosystemTheme.ts`, `react-ui.mdc`). Narrative in `primal_concept.txt`.
- **Gap:** No design-doc section tying colors to usage until this file.

### Color system

- **Works:** `@theme` in `src/index.css` — `brand-dark`, `brand-accent`, `ecosystem-1..4`, `accent-muted-*`, `surface-card`, `border-glass`, gradients, `shadow-glow-*`.
- **Gap:** Light sections still use raw `slate-*`, `amber-700`; dark sections use `white/[0.04]` stacks not exposed as utilities.

### Typography

- **Works:** `--text-label`, `--text-stat`, `--text-nav-link`; utilities `text-label-upper`, `section-heading`, `text-nav-link`.
- **Gap:** Hero `text-4xl sm:text-5xl` vs section `text-3xl md:text-4xl` duplicated; `text-[10px]` / `text-[11px]` in `DomainDetail`, `SequencePath`, `AnatomizerBuilder`, `LayerSelector`.

### Spacing system

- **Works:** `section-default` (`py-16 md:py-24 px-4 sm:px-6 md:px-8`); `min-h-[44px]` on primary interactives.
- **Gap:** No `--spacing-card-*` tokens; card padding varies (`p-4`, `p-5`, `p-6`, `sm:p-8`).

### Layout grid

- **Works:** Repeated `mx-auto max-w-*` + horizontal padding on header/footer.
- **Gap:** Width ladder undocumented — see §6 and Appendix.

### Component consistency

- **Works:** Clear folders: `layout/`, `ecosystem/`, `anatomizer/`, `maturity/`.
- **Gap:** Same UX roles built with different class bundles (light card vs `card-glass` vs terminal chrome).

### Button system

- **Works:** `btn-primary`, `btn-primary-md`, `btn-secondary`, `btn-secondary-md`, `focus-ring`.
- **Gap:** `ClosingCta` dark secondary is inline; `AnatomizerBuilder` copy control is custom; `btn-ghost` defined but unused; `DomainDetail` text link is another pattern.

### Card system

- **Works:** `card-glass` for dark ecosystem detail.
- **Gap:** `ProblemSolution`, `MaturityQuiz`, `LayerSelector` each define their own light card shell.

### Form elements

- **Works:** Quiz and Anatomizer use `<button>` grids (per `react-ui.mdc`).
- **Gap:** No native `input`/`textarea` tokens — acceptable for MVP; document as intentional.

### Navigation

- **Works:** Sticky `Header.tsx`, scroll state, mobile menu, `role="tablist"` / `aria-selected` / `aria-controls`; skip link in `App.tsx`.

### Footer

- **Works:** Three link columns, legal bar, address, `src/data/siteContact.ts`; `linkClass` constant.
- **Gap:** Same link styling repeated in `FooterLegalBar` and `FooterFounder`.

### Icon usage

- **Works:** `lucide-react` only; `icon-sm`, `icon-md`, `icon-lg` in `src/index.css`.

### Shadows and elevation

- **Works:** `shadow-tier-1/2/3`, `shadow-soft`, phase `shadow-glow-*`, `hover-lift`, `shadow-ecosystem-card-rim` on `card-glass`.

### Borders and radius

- **Works:** `rounded-xl` (buttons/chips), `rounded-2xl` (cards/sections), `rounded-lg` (nav, chips).
- **Gap:** No radius token table; opacity borders not named as semantic tokens in JSX.

### Responsive behavior

- **Works:** Tab panels, `lg` ecosystem layout, mobile nav, stacked CTAs `w-full sm:w-auto`.
- **Gap:** `SequencePath` dense on narrow viewports — needs checklist at v0.9.

### Accessibility

- **Works:** Skip link, tab pattern, buttons for interactives, `prefers-reduced-motion` in CSS and `App.tsx` scroll behavior, dark-section focus offset in `index.css`.
- **Gap:** No documented WCAG contrast matrix for gold-on-light or `slate-400` on `brand-dark`.

### Documentation quality

- **Works:** `react-ui.mdc`, `AGENTS.md`, `CHANGELOG.md`.
- **Gap:** No `DESIGN_SYSTEM.md` in repo before this file.

### Code reuse

- **Works:** `ecosystemTheme.ts`, `domains.ts`, shared data patterns.
- **Gap:** UI not extracted to `components/ui/` or additional `@utility` classes.

### Naming conventions

- **Works:** PascalCase components, kebab utilities, semantic phase names.
- **Gap:** Long inline `className` strings in TSX.

---

## 3. Version diagnosis

| Area | Current state | Score 1–5 | Problem | Required for 1.0 |
| ---- | ------------- | --------: | ------- | ---------------- |
| Brand foundations | Mother-repo colors + phase semantics | 4 | Usage rules only in agent rules | Document hub vs phase color rules |
| Color system | `@theme` complete; JSX uses slate/amber ad hoc | 4 | Light semantic colors not tokenized | `text-eyebrow-light` / surface utilities |
| Typography | Partial tokens; Inter fallback only | 3 | Micro sizes ad hoc; font not loaded | Load Inter; `text-caption` / `text-micro` |
| Spacing system | `section-default` only | 3 | Card padding inconsistent | Card spacing utilities |
| Layout grid | Per-section `max-w-*` | 3 | Five widths without names | `container-narrow/default/wide` |
| Component consistency | ~15 TSX, no ui/ layer | 2 | Multiple card/button recipes | Closed utility set |
| Button system | Primary/secondary on light | 3 | Dark secondary one-off | `btn-secondary-dark` |
| Card system | `card-glass` + inline light | 3 | Three light variants | `card-light` |
| Form elements | Button-only selectors | 4 | N/A for MVP | Document “no native inputs” |
| Navigation | Header + tabs a11y | 4 | Tab classes duplicated | Optional `nav-tab` utility |
| Footer | Complete trust block | 4 | Link class duplication | `link-footer` utility |
| Icon usage | lucide + size utilities | 5 | — | Keep as-is |
| Shadows/elevation | Tiers + glows | 4 | Not mapped to card types in doc | Document tier → component map |
| Borders/radius | Visually consistent | 4 | Implicit only | Radius map in doc |
| Responsive | Patterns in components | 4 | SequencePath on 320px | Test checklist |
| Accessibility | Basics present | 3 | No contrast audit | Spot-check + token tweaks |
| Documentation | Agent rules only | 2 | No DS file | This document + cross-links (later) |
| Code reuse | Theme data centralized | 3 | UI strings duplicated | Utilities over copy-paste |
| Naming conventions | Folders clear | 3 | Long className strings | Prefer utilities |

---

## 4. Current version declaration

### Current Design System Version: **v1.5 pre-release**

#### What already works

- **Token source of truth:** `src/index.css` `@theme` (brand, ecosystem, surfaces, gradients, shadows, motion).
- **Closed utility set:** `btn-primary` / `btn-secondary` / `btn-secondary-dark` (+ `-md`), `btn-tertiary-sm`, `card-light` / `card-light-lg`, `card-glass`, `link-footer`, `link-inline`, containers, `text-micro` / `text-caption`, section shells, focus/hover/motion utilities.
- **Semantic color API:** `src/data/ecosystemTheme.ts` (`accentFor`, `PHASE_ACCENT`, gold hub-only).
- **Layout shell:** `App.tsx` wires Header, Hero, ProblemSolution, StatsStrip, three tab panels, ClosingCta, Footer.
- **A11y baseline:** skip link, tab roles, quiz `aria-live`, external links `rel="noreferrer"`, reduced motion, documented contrast matrix (§13).
- **Guardrails:** `.cursor/rules/react-ui.mdc` + `AGENTS.md` + §14 coding-agent guardrails.
- **Viewport QA:** `scripts/viewport-qa.mjs` — no horizontal overflow at 320 / 768 / 1280 (`npm run qa:viewport`).

#### Resolved through v1.2

- WCAG contrast matrix and focus-order audit (§13).
- Mobile QA checklist and responsive rules (§13).
- Accessibility baseline table with acceptance criteria (§13).

#### Resolved through v1.5 pre-release

- Coding-agent guardrails with allowed vs forbidden examples (§14).
- Staged roadmap v1.0 → v1.5 summary table (§15).
- Document canon structure and v1.5 release checklist (§16–§17).
- Non-MVP components (FAQ, pricing, blog) marked N/A in §7.

---

## 5. Roadmap (v1.5 pre-release achieved)

### Completed: v0.4 → v1.0

All milestones below are **done** as of design system v1.0. Kept for history.

## 5a. Historical roadmap to v1.0

### v0.4 → v0.5: Stabilize foundations

| Field | Detail |
|-------|--------|
| **Goal** | Tokens and layout rules are complete, documented, and fonts load correctly. |
| **Tasks** | (1) Load Inter in `index.html` (or `@fontsource`). (2) Add `--text-caption` (11px) and `--text-micro` (10px) to `@theme`; add `text-caption` / `text-micro` utilities; replace JSX `text-[10px]` / `text-[11px]`. (3) Add `container-narrow` (`max-w-3xl`), `container-default` (`max-w-5xl`), `container-wide` (`max-w-7xl`). (4) Document eyebrow rule: light → `text-amber-700` + `text-label-upper`; dark → `text-brand-accent` + `text-label-upper`. |
| **Files likely affected** | `src/index.css`, `index.html`, `src/components/ecosystem/*`, `src/components/anatomizer/*`, `src/components/layout/*` (micro type only) |
| **Risk** | Low — pixel values can match current ad-hoc sizes. |
| **Acceptance criteria** | Zero `text-[10px]` / `text-[11px]` in `src/`; Inter visible in DevTools; sections use named container utilities. |

### v0.5 → v0.7: Standardize components

| Field | Detail |
|-------|--------|
| **Goal** | Closed set of card/button/link patterns; no new one-off CTA styles. |
| **Tasks** | (1) `@utility card-light` — `rounded-2xl border border-slate-200 bg-white shadow-tier-1` + standard padding. (2) `@utility btn-secondary-dark` — match `ClosingCta` secondary. (3) `@utility link-inline` or `btn-tertiary` for text-style actions. (4) `@utility link-footer` from `Footer.tsx` `linkClass`. (5) Refactor `ProblemSolution`, `MaturityQuiz`, `LayerSelector` to `card-light`; `ClosingCta` to `btn-secondary-dark`. |
| **Files likely affected** | `src/index.css`, `ClosingCta.tsx`, `ProblemSolution.tsx`, `MaturityQuiz.tsx`, `LayerSelector.tsx`, `Footer.tsx`, `DomainDetail.tsx`, `AnatomizerBuilder.tsx` |
| **Risk** | Medium — hover/focus/contrast regressions on dark band; visual pass on all three tabs required. |
| **Acceptance criteria** | No duplicate long dark-secondary button strings; all light interactive shells use `card-light`. |

### v0.7 → v0.9: Responsive and accessibility quality

| Field | Detail |
|-------|--------|
| **Goal** | Mobile-safe, accessible, motion-safe without redesign. |
| **Tasks** | (1) Contrast spot-check: `text-slate-400` on `brand-dark`, gold gradient text, `amber-700` on white. (2) Fix failures via token tweaks only. (3) Test `SequencePath` at 320px width. (4) Verify focus order: skip → logo → tabs → menu. (5) Add `aria-live="polite"` on quiz result container. |
| **Files likely affected** | `SequencePath.tsx`, `Header.tsx`, `MaturityQuiz.tsx`, `src/index.css` |
| **Risk** | Low–medium — contrast fixes may slightly shift appearance. |
| **Acceptance criteria** | §10 checklist passes; no horizontal scroll at 320px; focus visible on all interactives. |

### v0.9 → v1.0: Documentation and production readiness

| Field | Detail |
|-------|--------|
| **Goal** | Agents and humans extend UI without reading every TSX file. |
| **Tasks** | (1) Update component inventory in this doc after refactors. (2) Add “copy-paste recipes” subsection (hero, section intro, CTA row, card). (3) Cross-link `react-ui.mdc` ↔ `DESIGN_SYSTEM.md` and `AGENTS.md`. (4) `npm run build` + manual tab walkthrough. (5) Note DS v1.0 in `CHANGELOG.md`. |
| **Files likely affected** | `DESIGN_SYSTEM.md`, `.cursor/rules/react-ui.mdc`, `AGENTS.md`, `CHANGELOG.md` |
| **Risk** | Low |
| **Acceptance criteria** | New block (e.g. FAQ) buildable from documented utilities only; build green; no snippet palette regression. |

### v1.0 → v1.2: QA and accessibility — **done**

| Field | Detail |
|-------|--------|
| **Goal** | Responsive and accessibility maturity with documented acceptance criteria. |
| **Delivered** | §13 breakpoint matrix, mobile QA checklist, contrast matrix, focus-order audit, a11y table, regression risks. |
| **Acceptance criteria** | Met — see §13.3 checklist and §13.6 table. |

### v1.2 → v1.5 pre-release: Governance and scale — **done**

| Field | Detail |
|-------|--------|
| **Goal** | Agent-safe extension with governance docs — not a visual redesign. |
| **Delivered** | §14 guardrails + contribution rules; §15 roadmap table; §16 document canon; §17 release checklist. |
| **Acceptance criteria** | Met — §17 all items checked. |

---

## 6. Token inventory

### Colors

| Token / group | Status | Notes |
|---------------|--------|-------|
| `brand-dark`, `brand-accent`, `brand-accent-hover` | Existing and usable | `@theme` in `src/index.css` |
| `ecosystem-1..4` | Existing and usable | Mapped via `ecosystemTheme.ts` |
| `accent-muted-bg`, `accent-muted-border` | Existing and usable | Light accent surfaces |
| `surface-card`, `surface-card-hover`, `surface-inset`, `surface-glass` | Existing and usable | Dark band |
| `border-glass`, `border-glass-hover`, `grid-line` | Existing and usable | Dark UI |
| Light text semantics (`text-eyebrow`, `text-muted`) | Missing | Use `amber-700`, `slate-*` ad hoc today |
| `white/[0.04]` stacks in JSX | Existing but inconsistent | Should map to `surface-inset` utility |

### Typography

| Token / group | Status | Notes |
|---------------|--------|-------|
| `--font-sans` (Inter stack) | Existing but inconsistent | Not loaded in `index.html` |
| `--font-mono` | Existing and usable | Terminal, domain labels |
| `--text-label`, `--text-stat`, `--text-nav-link`, `--text-price` | Existing and usable | |
| `text-label-upper`, `text-nav-link`, `section-heading` | Existing and usable | |
| Micro 10px / 11px | Existing but inconsistent | Ad hoc in TSX — needs `text-micro` / `text-caption` |
| Hero display scale | Existing but inconsistent | Not tied to `--text-hero` token |

### Spacing

| Token / group | Status | Notes |
|---------------|--------|-------|
| `section-default` padding | Existing and usable | `py-16 md:py-24` |
| Card internal padding | Missing | `p-4` / `p-6` / `p-8` vary |
| Stack gaps (`space-y-6` vs `8`) | Needs cleanup | Document preferred stack per section type |

### Border radius

| Pattern | Status | Notes |
|---------|--------|-------|
| `rounded-lg` | Existing and usable | Nav, chips, layer chips |
| `rounded-xl` | Existing and usable | Buttons, dark chips |
| `rounded-2xl` | Existing and usable | Cards, figures |
| `rounded-full` | Existing and usable | Badges, progress dots |
| Named radius tokens | Missing | Document map only for v1.0 |

### Shadows

| Token / group | Status | Notes |
|---------------|--------|-------|
| `shadow-soft`, `shadow-soft-lg` | Existing and usable | |
| `shadow-tier-1/2/3` | Existing and usable | Map to light cards / hero figure / pricing-style elevation |
| `shadow-cta-shadow`, `shadow-ecosystem-card-rim` | Existing and usable | |
| `shadow-glow-brand`, `shadow-glow-1..4` | Existing and usable | Phase selection |
| `hover-lift` | Existing and usable | Quiz options |

### Breakpoints

| Token / group | Status | Notes |
|---------------|--------|-------|
| Tailwind `sm` / `md` / `lg` | Existing and usable | Default v4 scale; used throughout components |
| Documented breakpoint matrix | Missing | Add in v0.9 |

### Z-index

| Token / group | Status | Notes |
|---------------|--------|-------|
| `z-40` header | Existing and usable | `Header.tsx` |
| `z-50` skip link | Existing and usable | `App.tsx` |
| Z-index scale | Missing | Sufficient for MVP until modals |

### Motion / transitions

| Token / group | Status | Notes |
|---------------|--------|-------|
| `animate-panel-in` | Existing and usable | Tab panels, detail, quiz |
| `duration-200` / `300` / `700` | Existing but inconsistent | Header vs stats entrance |
| `--transition-duration-400` | Existing and usable | In `@theme` |
| `prefers-reduced-motion` block | Existing and usable | `src/index.css` |
| `scroll-behavior: smooth` on `html` | Existing and usable | Overridden when reduced motion |

---

## 7. Component inventory

| Component | Exists? | Consistent? | Reusable? | Notes | Priority |
| --------- | ------- | ----------- | --------- | ----- | -------- |
| Header | Yes | Mostly | Partial | Scroll-adaptive glass; `Header.tsx` | P1 |
| Footer | Yes | Yes | Yes | `link-footer` utility | — |
| Hero | Yes | Yes | No | `container-hero`; recipe doc sufficient | P2 |
| Section shell | Yes | Yes | Yes | `section-default`, `section-dark` | — |
| CTA block | Yes | Yes | Yes | `btn-secondary-dark-md` on dark band | — |
| Button — primary | Yes | Yes | Yes | `btn-primary-md` | — |
| Button — secondary (light) | Yes | Yes | Yes | `btn-secondary-md` | — |
| Button — secondary (dark) | Yes | Yes | Yes | `btn-secondary-dark` / `-md` | — |
| Button — ghost | Utility only | — | No | Defined in CSS, unused | P2 |
| Button — copy (Anatomizer) | Yes | Yes | Yes | `btn-tertiary-sm` | — |
| Card — glass | Yes | Yes | Yes | `card-glass`; ecosystem | — |
| Card — light | Yes | Yes | Yes | `card-light`, `card-light-lg` | — |
| Feature card | Yes | Partial | No | Feature list inside `DomainDetail.tsx` | P2 |
| Pricing card | No | — | — | Not in MVP | — |
| Form input | No | — | — | Selectors are buttons | — |
| Badge / pill | Yes | Mostly | Partial | `badge-accent`, phase pills in `DomainDetail` | P1 |
| Icon block | Yes | Yes | Yes | `icon-sm` / `md` / `lg` | — |
| Testimonial block | No | — | — | — | — |
| FAQ block | No | — | — | — | — |
| Stats strip | Yes | Yes | No | `StatsStrip.tsx`; unique promo band | P2 |
| Problem / solution | Yes | Yes | Yes | Uses `card-light` | — |
| Layer selector | Yes | Yes | Yes | `card-light` shell | — |
| Domain detail | Yes | Yes | Partial | Large composite; `card-glass` | P2 |
| Sequence path | Yes | Yes | No | Complex; document-only | P2 |
| Anatomizer terminal | Yes | Mostly | Partial | `brand-dark` chrome + custom copy btn | P1 |
| Maturity quiz | Yes | Yes | Yes | `card-light-lg`; result `aria-live` | — |

---

## 8. Design System v1.0 definition (this project)

**v1.0** means the MVP single-page site can be extended by a coding agent **without visual drift** and **without a redesign**.

### Requirements

1. **Visual consistency** across Hero → ProblemSolution → StatsStrip → three tab panels → ClosingCta → Footer using documented containers and section utilities.
2. **Stable token system** — colors, type sizes, gradients, shadows live in `src/index.css` `@theme`; no new hex/rgba in TSX.
3. **Reusable patterns** — closed set: `btn-primary-md`, `btn-secondary-md`, `btn-secondary-dark`, `card-glass`, `card-light`, `badge-accent`, `link-footer`, `section-default`, `section-dark`, `section-heading`.
4. **Mobile-safe** — no horizontal overflow at 320px; touch targets ≥ 44px; CTAs stack `w-full sm:w-auto`.
5. **Accessible contrast** — documented text/background pairs pass WCAG AA (spot-checked).
6. **Button hierarchy** — one gold primary per CTA group; one secondary per surface (light vs dark); tertiary text links only where specified.
7. **Cards and spacing** — light interactive shells use `card-light`; dark ecosystem uses `card-glass` or `bg-surface-card`.
8. **Documented usage rules** — this file aligned with `.cursor/rules/react-ui.mdc`.
9. **No major visual regressions** — light hero + dark ecosystem band preserved; no `slate-950` / indigo / eight rainbow gradients from `snippet.txt`.
10. **Agent-safe extension** — new sections (FAQ, testimonial) built from documented recipes only.

---

## 9. Priority fixes

### P0 — resolved at v1.0

| Problem | Status |
|---------|--------|
| No `card-light` utility | ✅ `card-light` / `card-light-lg` + refactors |
| Dark secondary CTA one-off | ✅ `btn-secondary-dark-md` in `ClosingCta.tsx` |
| Micro typography ad hoc | ✅ `text-micro` / `text-caption` |
| Inter not loaded | ✅ Google Fonts in `index.html` |
| Viewport QA not executed | ✅ `scripts/viewport-qa.mjs` + §10 checked |

### P1 — should fix before 1.0

| Problem | Why it matters | Suggested fix | Expected impact |
|---------|----------------|---------------|-----------------|
| Container widths undocumented | Uneven section rhythm | `container-narrow` / `default` / `wide` | Layout predictability |
| Footer link duplication | Four copies of same classes | `link-footer` utility | DRY + consistent focus |
| Eyebrow rules implicit | Mixed `amber-700` / `brand-accent` | Document in `react-ui.mdc` | Clear light vs dark |
| Anatomizer copy button custom | Fourth button variant | Small `btn-tertiary` or document exception | Fewer patterns |
| Contrast not verified | Possible AA failures | Spot-check + token tweak | A11y confidence |

### P2 — nice after 1.0

| Problem | Why it matters | Suggested fix | Expected impact |
|---------|----------------|---------------|-----------------|
| `btn-ghost` unused | Dead utility | Use or remove | Cleaner CSS |
| Optional `nav-tab` utility | Long Header tab classes | Extract if Header grows | Simpler header |
| `components/ui/` wrappers | TS discoverability | Thin wrappers over utilities | DX for React devs |
| Phase pill duplication | Markup in `DomainDetail` only | Small `PhaseBadge` component | Minor DRY |
| Z-index scale | Only two values today | Document when adding modals | Future-proof |

---

## 10. Implementation checklist

Use this order when executing the roadmap (coding agent).

- [x] Read `DESIGN_SYSTEM.md`, `src/index.css`, `.cursor/rules/react-ui.mdc`
- [x] Do not reintroduce `snippet.txt` palette (`slate-950`, indigo CTAs, eight rainbow domain gradients)
- [x] Load Inter; confirm computed `font-family` in DevTools
- [x] Add `text-caption`, `text-micro`, containers to `src/index.css`
- [x] Replace all `text-[10px]` and `text-[11px]` under `src/`
- [x] Add `card-light`, `btn-secondary-dark`, `link-footer`, `link-inline`, `btn-tertiary-sm`
- [x] Refactor `ProblemSolution`, `MaturityQuiz`, `LayerSelector` to `card-light` / `card-light-lg`
- [x] Refactor `ClosingCta` secondary to `btn-secondary-dark-md`
- [x] Eyebrow rules documented in `react-ui.mdc`
- [x] Dark-band intro copy contrast bump (`text-slate-300` on ecosystem intros)
- [x] Test viewports 320px, 768px, 1280px on all three tabs + footer — automated via `npm run qa:viewport` (2026-05-30; no horizontal overflow)
- [x] Quiz result `aria-live="polite"`; skip link and tab `aria-*` unchanged
- [x] Run `npm run build`
- [x] Update `CHANGELOG.md` under `[Unreleased]`
- [x] Refresh §7 inventory and appendices in this doc

---

## 13. Design System v1.2 — Responsive & accessibility maturity

**Goal:** Document responsive behavior, accessibility baseline, and repeatable QA — no UI redesign.

### 13.1 Breakpoint matrix (Tailwind v4 defaults)

| Breakpoint | Min width | MVP usage |
|------------|-----------|-----------|
| (default) | 0 | Mobile-first; stacked CTAs; hamburger nav; `SequencePath` 1-col stage grid |
| `sm` | 640px | CTA row horizontal; `card-light-lg` extra padding; layer selector 2-col; SequencePath 2-col stages |
| `md` | 768px | Header tab bar visible; footer 2-col link grid |
| `lg` | 1024px | Ecosystem phase row horizontal; Anatomizer 12-col split; decorative hub connector |
| `xl` / `2xl` | 1280px / 1536px | Unused explicitly — containers cap at `max-w-7xl` |

### 13.2 Responsive rules

| Rule | Standard | Evidence |
|------|----------|----------|
| Touch targets | ≥ 44px height on **all** interactives | `min-h-[44px]` on `btn-*`, `link-footer`, `link-inline`, `btn-tertiary-sm`, LayerSelector options, Header tabs |
| Nested interactive grids | Single-col below `sm`, 2-col at `sm+`, revert at `lg` where applicable | `SequencePath`: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-1` |
| Mono domain labels | Wrap safely in narrow cards | `break-all` on subdomain strings in `SequencePath` |
| Section padding | `section-default` everywhere | `py-16 md:py-24 px-4 sm:px-6 md:px-8` |
| CTA layout | Stack full-width, then row | `w-full sm:w-auto` on Hero, ClosingCta, quiz CTAs |
| Horizontal overflow | None on core page | `overflow-x: clip` on `html`/`body`; `npm run qa:viewport` |
| Header (mobile) | Hamburger → full-width tab buttons; eyebrow hidden below 360px | `Header.tsx` `md:hidden` menu; `hidden min-[360px]:block` on tagline |
| Header (desktop) | Inline tablist at `md+`, tabs ≥ 44px | Scroll-adaptive light/dark glass |
| Cards | Light: `card-light`; dark: `card-glass` | Single recipe each |
| Ecosystem path | Vertical stack → horizontal phases at `lg` | `SequencePath.tsx` |
| Hero | Centered single column; H1 `text-3xl sm:text-4xl lg:text-5xl` | `container-hero`, stacked CTAs |
| Stats strip | 2×2 grid; numbers `text-5xl sm:text-stat` | `StatsStrip.tsx` |
| Footer | 1-col → 2-col → 3-col link grids | `Footer.tsx` grid |
| Images | `max-w-*`, `rounded-2xl`, no fixed widths | `ProblemSolution` figure |

### 13.3 Mobile QA checklist

Run before any UI release or after layout changes.

- [x] No horizontal scroll on core page at 320 / 360 / 390 / 430 / 768 / 1280 (`npm run qa:viewport`)
- [x] Header usable on mobile (menu opens, tabs switch panels, closes on select)
- [x] All interactives meet touch target requirements (`min-h-[44px]` — buttons, footer links, inline links, tertiary actions, LayerSelector, Header tabs)
- [x] SequencePath uses single-col stage grid below `sm` (not 2-col at 320px)
- [x] Cards stack cleanly (quiz, problem/solution, layer selectors, ecosystem phases)
- [x] Typography remains readable (Hero H1 and stats scaled at narrow widths; micro type tokenized only)
- [x] CTAs remain visible and usable when stacked
- [x] Footer does not collapse awkwardly (legal bar wraps with `flex-wrap`)
- [x] Images scale safely (`creator-janitor.png` in constrained figure)
- [x] Selectors usable on mobile (quiz + Anatomizer use `<button>` grids, not native inputs)
- [x] No clipped content in tab panels (verified at 320px via overflow script)

**Commands:** `npm run build` → `npx vite preview --host 127.0.0.1 --port 4173` → `npm run qa:viewport`

### 13.4 WCAG contrast matrix (spot-checked pairs)

Spot-check method: DevTools color picker + [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/). Target **AA** for body text; **AA Large** or decorative for labels/icons.

| Foreground | Background | Usage | Result | Notes |
|------------|------------|-------|--------|-------|
| `#0b1320` (`brand-dark`) | `#ffffff` | Body, headings on light | **Pass AA** | Primary text |
| `#475569` (`slate-600`) | `#ffffff` / `#f8fafc` | Body secondary, hero subhead | **Pass AA** | |
| `#b45309` (`amber-700`) | `#ffffff` | Light-section eyebrows | **Pass AA** | `text-eyebrow-light` |
| `#8a610f→#b07d12` gradient | `#eef2f7` hero bg | Hero accent phrase | **Pass AA** | `accent-gradient-strong` token |
| `#ffffff` | `#0b1320` (`brand-dark`) | Dark-band headings | **Pass AAA** | |
| `#cbd5e1` (`slate-300`) | `#0b1320` | Dark-band body intros | **Pass AA** | Ecosystem intro bump |
| `#94a3b8` (`slate-400`) | `#0b1320` | Muted labels, mono domains | **Pass AA** large / **AA** 11px+ | Use for secondary/micro only |
| `#cfa73a` (`brand-accent`) | `#0b1320` | Eyebrows, icons, phase accents | **Decorative / large** | Uppercase labels; not body copy |
| Gold CTA gradient | `#0b1320` text on button | Primary buttons | **Pass AA** | Dark text on gold fill |

If a pair fails after a change, fix via **token tweak in `src/index.css` only** — do not ad-hoc hex in TSX.

### 13.5 Focus order audit

Documented tab order for keyboard users (single-page MVP):

1. **Skip to content** — first focusable; reveals on focus (`App.tsx`)
2. **Logo / home** — `Header.tsx` resets to ecosystem tab
3. **Primary nav** — desktop: tablist buttons; mobile: menu toggle then tab buttons
4. **Main panel** — active tabpanel (`tabIndex={0}` on panel wrapper)
5. **In-panel interactives** — domain cards, layer selectors, quiz options, copy button, external links
6. **Closing CTA band** — primary + secondary
7. **Footer** — link columns, legal bar, founder link

**Focus visibility:** all interactives use `focus-ring`; dark sections override ring offset to `brand-dark` (`index.css`).

### 13.6 Accessibility baseline

| Accessibility area | Current state | Risk | Required fix | Acceptance criteria |
| ------------------ | ------------- | ---- | ------------ | ------------------- |
| Color contrast | Matrix in §13.4; hero uses `accent-gradient-strong` | Low | Re-check after token changes | §13.4 pairs pass AA |
| Focus states | `focus-ring` on buttons/links | Low | Keep utility on new interactives | Visible focus on Tab through page |
| Keyboard navigation | Tabs, buttons, skip link | Low | New features use `<button>` or `<a>` | All actions reachable without mouse |
| Semantic HTML | `<header>`, `<main>`, `<footer>`, `<section>`, `<nav>` | Low | Preserve landmarks | One `<h1>` in Hero; section `<h2>`s |
| Heading hierarchy | H1 Hero → H2 sections → H3/H4 in cards | Low | No skipped levels in new blocks | Logical outline in accessibility tree |
| Button/link clarity | Buttons for in-app actions; `<a>` for external | Low | Do not use `<div onClick>` | External links have `rel="noreferrer"` |
| Form labels | N/A — button-grid selectors | — | Document intentional pattern | Quiz/Anatomizer options are named buttons |
| Error messages | Clipboard copy failure silent in Anatomizer | Low | Accept for MVP | No misleading success state |
| ARIA | Tabs, `aria-live` on quiz result, `aria-pressed` on domain cards | Low | ARIA only where native HTML insufficient | No redundant `role` on buttons |
| Reduced motion | CSS + scroll behavior in `App.tsx` | Low | Preserve on new animations | `prefers-reduced-motion` disables entrance |
| Image alt text | `ProblemSolution` emotional figure has descriptive alt | Low | Alt required on new images | Non-decorative images have alt |
| Screen reader | Tab labels match UI; sr-only footer heading | Low | Keep `aria-label` on tab panels | Panel switch announced via focus move |

### 13.7 Visual regression risks

| Area | Risk | Mitigation |
|------|------|------------|
| Dark ecosystem band | Phase glow / selection ring changes | Manual tab walkthrough after `ecosystemTheme` edits |
| Header scroll transition | Light ↔ dark glass contrast | Scroll hero → stats → ecosystem before release |
| `card-glass` hover | Border/glow shift | Compare hover/focus on domain detail |
| StatsStrip counter | Animation vs reduced motion | Verify instant values when reduced motion on |
| Light card padding | `card-light` vs `card-light-lg` drift | Never inline duplicate card shells |
| Snippet palette regression | Indigo / slate-950 / rainbow domains | Forbidden in §16; grep before merge |

---

## 14. Design System v1.5 pre-release — Agent readiness & governance

**Goal:** Make the system safe for coding agents and contributors to extend without drift. **Not a visual redesign.**

### 14.1 Agent must do

- Use existing tokens and `@utility` classes from `src/index.css`
- Use existing component patterns in `src/components/` — extend via utilities before new TSX recipes
- Follow `section-default` / `section-dark` spacing and named containers
- Follow button hierarchy: one primary gold CTA per group; light vs dark secondary; tertiary for minor actions
- Preserve navy/gold/phase-accent visual identity (`ecosystemTheme.ts`)
- Update `DESIGN_SYSTEM.md` and `CHANGELOG.md` when adding new utilities or patterns
- Add only necessary variants — prefer one utility over three similar ones
- Run `npm run build` and `npm run qa:viewport` after layout changes
- Check §13.4 contrast pairs when changing colors

### 14.2 Agent must not do

- Invent new hex/rgba colors in TSX
- Create one-off shadows, spacing, or border stacks in components
- Create new button styles without a new `@utility` + doc entry
- Duplicate components (e.g. second light-card recipe)
- Redesign sections or tab architecture without explicit product request
- Break section rhythm (hero → problem → stats → tabs → CTA → footer)
- Add decorative animation beyond `animate-panel-in`, stat counter, hover transitions
- Change copy in `domains.ts`, `primal_concept.txt`, or quiz unless requested
- Reintroduce `snippet.txt` palette (slate-950, indigo CTAs, eight rainbow gradients)
- Invent domains, ecosystem stages, or tab ids

### 14.3 Coding agent guardrails — allowed vs forbidden

#### Light-section card

```tsx
// ✅ Allowed
<div className="card-light">…</div>
<div className="card-light-lg space-y-6">…</div>

// ❌ Forbidden — duplicates card-light recipe
<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">…</div>
```

#### Dark-band secondary CTA

```tsx
// ✅ Allowed
<button className="btn-secondary-dark-md">Take the assessment</button>

// ❌ Forbidden — one-off glass button
<button className="rounded-xl border border-white/10 bg-white/5 px-6 py-2.5 …">…</button>
```

#### Typography micro sizes

```tsx
// ✅ Allowed
<span className="text-micro">promptanatomy.cloud</span>
<span className="text-caption">Supporting line</span>

// ❌ Forbidden
<span className="text-[10px]">…</span>
```

#### Eyebrows

```tsx
// ✅ Allowed — light section
<span className="text-eyebrow-light">The Anatomizer</span>

// ✅ Allowed — dark section
<span className="text-label-upper text-brand-accent">The ecosystem</span>

// ❌ Forbidden — low-contrast gold on white body copy
<span className="text-brand-accent">Section label on white</span>
```

#### Phase / accent colors

```tsx
// ✅ Allowed — via ecosystemTheme API
const accent = accentFor(domain.id);

// ❌ Forbidden — per-domain rainbow or raw hex
<div style={{ borderColor: '#6366f1' }}>…</div>
```

#### New marketing block (e.g. FAQ)

```tsx
// ✅ Allowed — compose from existing utilities
<section className="section-default">
  <div className="container-default">
    <h2 className="section-heading">…</h2>
    <div className="card-light mt-6">…</div>
  </div>
</section>

// ❌ Forbidden — new purple palette, new button style, new card radius system
```

### 14.4 Contribution rules

1. **Tokens first** — new visual need → add to `@theme` / `@utility` in `index.css`, then use in TSX.
2. **One recipe per role** — one light card, one dark card, four button tiers (primary, secondary light, secondary dark, tertiary sm).
3. **Data in `src/data/`** — domain/quiz/anatomy content stays typed constants.
4. **No new dependencies** without explicit approval.
5. **Document** — utility additions go in Appendix D + `[Unreleased]` changelog.
6. **QA gate** — `npm run build` + `npm run qa:viewport` before marking UI tasks done.

### 14.5 Non-MVP components (explicit N/A)

| Component | MVP status | v1.5 rule |
| --------- | ---------- | --------- |
| Pricing card | Not built | Build from `card-light` + `shadow-tier-3` if product requests |
| FAQ block | Not built | `section-default` + `card-light` accordion pattern TBD |
| Blog card | Not built | Out of scope — external `promptanatomy.blog` |
| Testimonial block | Not built | Out of scope for single-page MVP |
| Native form inputs | Not built | Button-grid selectors intentional; add input tokens only if forms ship |
| Empty / error / loading states | Minimal | Document pattern when async data exists; static MVP has none |
| Comparison table | Not built | N/A |

---

## 15. Staged roadmap summary (v1.0 → v1.5)

| Version step | Goal | Key tasks | Files affected | Acceptance criteria | Risk |
| ------------ | ---- | --------- | -------------- | ------------------- | ---- |
| v1.0 | Internal stable DS | Utilities, refactors, §10 checklist | `index.css`, ~6 TSX, docs | Build green; closed utility set | Medium (visual regressions) — **done** |
| v1.0 → v1.2 | QA + accessibility | Contrast matrix, mobile checklist, focus audit | `DESIGN_SYSTEM.md` §13 | §13 checklists pass; `qa:viewport` green | Low — **done** |
| v1.2 → v1.5 pre-release | Governance + agent safety | Guardrails, release checklist, contribution rules | `DESIGN_SYSTEM.md` §14–§17, `react-ui.mdc` | §17 checklist complete | Low — **done** |
| Post v1.5 | Optional scale | `components/ui/` wrappers, `nav-tab` utility, remove `btn-ghost` | TBD | Product-driven only | Low |

---

## 16. Document canon structure

This file follows the upgrade target structure. Section map:

| # | Topic | Location |
|---|--------|----------|
| 1 | Design system overview | §1 Executive summary |
| 2 | Version and maturity status | §1, §4 |
| 3 | Core principles | §8 v1.0 definition, §14 governance |
| 4 | Brand foundations | §2 audit, `primal_concept.txt` |
| 5 | Tokens | §6 Token inventory |
| 6 | Typography | §6, Appendix D |
| 7 | Colors | §6, §13.4 contrast matrix |
| 8 | Spacing | §6, §13.2 responsive rules |
| 9 | Layout rules | Appendix B containers |
| 10 | Components | §7 inventory |
| 11 | Component usage rules | §14 guardrails, Appendix D |
| 12 | Responsive rules | §13 |
| 13 | Accessibility rules | §13.5–§13.6 |
| 14 | Content hierarchy | §13.6 headings; `content-brand.mdc` |
| 15 | Interaction states | `focus-ring`, `hover-lift`, button utilities |
| 16 | Do / Don't examples | §14.3 |
| 17 | Coding agent guardrails | §14 |
| 18 | QA checklist | §10, §13.3 |
| 19 | Release checklist | §17 |
| 20 | Roadmap | §5, §15 |
| 21 | Changelog | `CHANGELOG.md` |
| 22 | Document index (repo-wide) | `DOCS_INDEX.md` |

---

## 17. v1.5 pre-release — release checklist

Complete before declaring **Design System v1.5 pre-release** (documentation and governance gate — not a visual release).

- [x] All core tokens documented (§6)
- [x] All core components inventoried (§7; non-MVP marked N/A in §14.5)
- [x] Button hierarchy standardized (`btn-primary`, `btn-secondary`, `btn-secondary-dark`, `btn-tertiary-sm`)
- [x] Card system standardized (`card-light`, `card-light-lg`, `card-glass`)
- [x] Section spacing standardized (`section-default`, `section-dark`)
- [x] Typography scale documented (§6, Appendix D; `text-micro` / `text-caption`)
- [x] Mobile rules documented (§13.2–§13.3)
- [x] Accessibility baseline completed (§13.4–§13.6)
- [x] Agent guardrails written (§14)
- [x] Do-not-change rules written (§18 below)
- [x] QA checklist written (§10, §13.3)
- [x] Visual regression risks identified (§13.7)
- [x] Documentation updated (`DESIGN_SYSTEM.md`, `react-ui.mdc`, `AGENTS.md`)
- [x] Changelog updated (`CHANGELOG.md`)
- [x] No major visual drift across core pages (docs-only pass; no UI redesign)

**Declared:** Design System **v1.5 pre-release** — 2026-05-30.

---

## 18. Do-not-change list

- No full redesign or single-page tab architecture change
- No new color palette (navy `#0b1320`, gold `#cfa73a`, four phase accents are fixed)
- No return to `snippet.txt` full-page `slate-950` + indigo + per-domain rainbow gradients
- No unnecessary animations beyond `animate-panel-in`, stat counter, and existing hover transitions
- No content rewrites in `domains.ts`, `primal_concept.txt`, or quiz copy unless product requests
- No new UI framework (MUI, Chakra, etc.)
- No breaking `ecosystemTheme.ts` phase → accent mapping (gold hub; four phases)
- No renaming ecosystem domains or internal tab ids (`ecosystem` | `anatomizer` | `maturity`)
- No auth, CMS, backend, or payment flows
- Do not split domain cards into over-abstracted primitives
- Do not change Anatomizer assembled prompt string format or block tags order
- Do not remove external domain URLs or `target="_blank"` + `rel="noreferrer"` on external links
- Do not invent new product domains or ecosystem stages

---

## 19. Final recommendation

| Item | Recommendation |
|------|----------------|
| **Current version** | **v1.5 pre-release** |
| **Previous milestones** | v1.0 (utilities stable), v1.2 (QA + a11y docs) |
| **Optional next work** | `components/ui/` thin wrappers; remove unused `btn-ghost`; formal verifier agent pass |
| **Biggest risk** | Agents bypassing §14 guardrails and copying nearest TSX file |
| **Safe extension path** | New block → §14.3 FAQ example → utilities only → `qa:viewport` → changelog |

---

## Appendix A: Key file map

| Purpose | Path |
|---------|------|
| Token + utility source | `src/index.css` |
| Phase / accent API | `src/data/ecosystemTheme.ts` |
| Domain content | `src/data/domains.ts` |
| App shell + a11y | `src/App.tsx` |
| Agent UI rules | `.cursor/rules/react-ui.mdc` |
| Agent guide | `AGENTS.md` |
| Human onboarding + deploy | `README.md` |
| Brand narrative | `primal_concept.txt` |
| Legacy prototype (palette do not port) | `snippet.txt` |
| Contact / footer / JSON-LD constants | `src/data/siteContact.ts` |
| Viewport overflow QA | `scripts/viewport-qa.mjs` (`npm run qa:viewport`) |
| OG image generation | `scripts/generate-og.mjs` (`npm run generate:og`) |
| Deploy checklist | `.cursor/skills/deploy-vercel/SKILL.md` |

## Appendix B: Layout containers (current)

| Utility | max-width | Used in |
|---------|-----------|---------|
| `container-hero` | `4xl` | `Hero.tsx` |
| `container-narrow` | `3xl` | `MaturityQuiz.tsx`, `ClosingCta.tsx` |
| `container-default` | `5xl` | `ProblemSolution.tsx` |
| `container-promo` | `6xl` | `StatsStrip.tsx` |
| `container-wide` | `7xl` | `Header.tsx`, `Footer.tsx`, `EcosystemMap.tsx`, `AnatomizerBuilder.tsx` |

Inner `max-w-2xl` / `max-w-3xl` sub-constraints remain for intros and figures.

## Appendix C: Dark secondary CTA (resolved)

`ClosingCta.tsx` uses `btn-secondary-dark-md` — same semantics as the former inline glass button, now a documented utility.

## Appendix D: Existing `@utility` catalog (`src/index.css`)

| Utility | Role |
|---------|------|
| `focus-ring` | Visible focus on interactives |
| `btn-primary`, `btn-primary-md` | Gold gradient CTA |
| `btn-secondary`, `btn-secondary-md` | White bordered CTA (light surfaces) |
| `btn-secondary-dark`, `btn-secondary-dark-md` | Glass bordered CTA (dark surfaces) |
| `btn-tertiary-sm` | Small accent action (e.g. copy prompt) |
| `btn-ghost` | Transparent (unused in TSX today) |
| `card-light`, `card-light-lg` | Light section cards |
| `link-footer`, `link-inline` | Footer and text-style links |
| `text-micro`, `text-caption`, `text-eyebrow-light` | Micro typography |
| `container-hero` … `container-wide` | Section max-width |
| `section-default`, `section-dark` | Section padding + dark bg |
| `section-heading` | H2 scale on light sections |
| `card-glass` | Dark ecosystem card surface |
| `badge-accent` | Gold pill eyebrow |
| `bg-ecosystem-grid` | Grid background on dark band |
| `shadow-tier-1/2/3` | Elevation shortcuts |
| `text-label-upper`, `text-nav-link` | Typography |
| `icon-sm`, `icon-md`, `icon-lg` | Icon sizing |
| `animate-panel-in` | Panel entrance |
| `hover-lift` | Card hover on light surfaces |

---

*Document version: 2.0 (roadmap doc). Design system implementation maturity: **v1.5 pre-release** (declared 2026-05-30).*
