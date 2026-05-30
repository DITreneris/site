# Document Index — Prompt Anatomy Site

**Purpose:** Single navigation map for humans and coding agents.  
**Repo:** [github.com/DITreneris/site](https://github.com/DITreneris/site) · **Live:** [promptanatomy.site](https://promptanatomy.site)

---

## Start here

| Audience | Read first | Then |
|----------|------------|------|
| **Human developer** | [README.md](README.md) | [AGENTS.md](AGENTS.md) → task row below |
| **Coding agent** | [AGENTS.md](AGENTS.md) | Matching **agent** + **skill** + **rules** for the task |
| **Design / UI work** | [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) §14 | [src/index.css](src/index.css), `.cursor/rules/react-ui.mdc` |
| **Copy / domains** | [primal_concept.txt](primal_concept.txt) | `.cursor/skills/ecosystem-content/SKILL.md` |
| **Deploy / release** | [DEPLOY.md](DEPLOY.md) | `.cursor/skills/deploy-vercel/SKILL.md` |
| **SEO / crawlers** | [public/llms.txt](public/llms.txt) | `.cursor/skills/seo-crawler/SKILL.md`, [seo.txt](seo.txt) |
| **Mobile UX audit / fixes** | [MOBILE_UX_AUDIT.md](MOBILE_UX_AUDIT.md) | [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) §13, [mobile.txt](mobile.txt) |

---

## Task router

Use this table to pick the right agent, skill, and documents.

| Task | Delegate agent | Skill(s) | Rules (auto or path) | Primary documents |
|------|----------------|----------|----------------------|-------------------|
| UI components, layout, tokens | `ui-builder` | — | `react-ui.mdc`, `project-core.mdc` | `DESIGN_SYSTEM.md` §6–§14, `src/index.css` |
| Domain copy, quiz, messaging | `content-editor` | `ecosystem-content`, `anatomizer-prompt` | `content-brand.mdc` | `primal_concept.txt`, `src/data/` |
| Anatomizer presets only | `content-editor` | `anatomizer-prompt` | `content-brand.mdc` | `src/data/anatomyBuilder.ts` |
| SEO, robots, schema, llms.txt | `seo-specialist` | `seo-crawler` | `deploy-vercel.mdc` | `index.html`, `public/`, `src/data/seoFaq.ts`, `seo.txt` |
| Vercel deploy, DNS, release check | — (use skill) | `deploy-vercel` | `deploy-vercel.mdc` | `DEPLOY.md`, `CHANGELOG.md` |
| Post-task QA | `verifier` | — | `project-core.mdc` | `AGENTS.md` workflow, agent checklist |
| Record shipped changes | `changelog-keeper` | — | — | `CHANGELOG.md` |

**Workflow (all feature work):** change → `npm run build` → layout changes → `npm run qa:viewport` → `changelog-keeper` → `verifier`.

---

## Document registry

### Tier 1 — Source of truth (read before editing)

| ID | Path | What it governs | Update when |
|----|------|-----------------|-------------|
| `concept` | [primal_concept.txt](primal_concept.txt) | Brand narrative, 8 domains, audiences, ecosystem logic | Product messaging changes |
| `tokens` | [src/index.css](src/index.css) | Design tokens (`@theme`) and utilities (`@utility`) | New colors, spacing, component utilities |
| `domains-data` | [src/data/domains.ts](src/data/domains.ts) | Live domain cards and detail panel content | Domain copy or phase metadata |
| `site-urls` | [src/data/siteContact.ts](src/data/siteContact.ts) | `.site` vs `.app` URL constants | Canonical or platform URL policy |
| `types` | [src/types/index.ts](src/types/index.ts) | Shared TypeScript shapes | Data model changes |

### Tier 2 — Human guides

| ID | Path | Audience | Notes |
|----|------|----------|-------|
| `readme` | [README.md](README.md) | Developers | Onboarding, scripts, folder map |
| `agents` | [AGENTS.md](AGENTS.md) | Agents + leads | Scope, domains, workflow, conventions |
| `design-system` | [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) | Design + frontend + agents | v1.5 pre-release; §14 = agent guardrails |
| `deploy` | [DEPLOY.md](DEPLOY.md) | DevOps / release | Vercel + Porkbun checklist |
| `changelog` | [CHANGELOG.md](CHANGELOG.md) | Everyone | Keep a Changelog format; `[Unreleased]` |
| `docs-index` | DOCS_INDEX.md (this file) | Everyone | Document map; update when adding docs/agents/skills |

### Tier 3 — Generated or public web assets

| ID | Path | Generated | Notes |
|----|------|-----------|-------|
| `og-image` | [public/og-image.png](public/og-image.png) | Yes — `npm run generate:og` | 1200×630; Satori + resvg |
| `llms` | [public/llms.txt](public/llms.txt) | Hand-maintained | AI crawler site map |
| `llms-full` | [public/llms-full.txt](public/llms-full.txt) | Yes — `npm run generate:llms` | Extended reference from data files |
| `sitemap` | [public/sitemap.xml](public/sitemap.xml) | Yes — `generate-llms.mjs` | Canonical `.site` URLs |
| `robots` | [public/robots.txt](public/robots.txt) | Hand-maintained | Crawler allow/disallow policy |
| `seo-faq-data` | [src/data/seoFaq.ts](src/data/seoFaq.ts) | No | FAQ JSON-LD source; not visible UI |
| `html-head` | [index.html](index.html) | No | Meta, OG, JSON-LD, canonical |

### Tier 4 — Agent prompt templates (not runtime source of truth)

| ID | Path | Use | Status |
|----|------|-----|--------|
| `seo-prompt` | [seo.txt](seo.txt) | Full SEO/GEO/AIO audit template | Active — see `seo-crawler` skill |
| `mobile-prompt` | [mobile.txt](mobile.txt) | Full mobile UX/UI audit template | Active — see `MOBILE_UX_AUDIT.md` |
| `mobile-audit` | [MOBILE_UX_AUDIT.md](MOBILE_UX_AUDIT.md) | Mobile audit findings + fix status | Update after mobile QA passes |
| `ds-upgrade-prompt` | [upgrade.txt](upgrade.txt) | Design system v0.7 → v1.5 roadmap prompt | **Historical** — v1.5 achieved; reference only |
| `legacy-ui` | [snippet.txt](snippet.txt) | Original single-file prototype | **Do not reuse palette** — regression guard only |

---

## Agent roster

Agents live in [.cursor/agents/](.cursor/agents/). Invoke by name in Cursor.

| Agent | Mode | Skills | Owns |
|-------|------|--------|------|
| [ui-builder](.cursor/agents/ui-builder.md) | write | — | React/Tailwind components, layout, responsive QA |
| [content-editor](.cursor/agents/content-editor.md) | write | `ecosystem-content`, `anatomizer-prompt` | Copy in `src/data/`, brand alignment |
| [seo-specialist](.cursor/agents/seo-specialist.md) | write | `seo-crawler` | Metadata, crawlers, schema, llms files |
| [verifier](.cursor/agents/verifier.md) | read-only | — | Pre-done QA checklist |
| [changelog-keeper](.cursor/agents/changelog-keeper.md) | write | — | `CHANGELOG.md` `[Unreleased]` entries |

---

## Skills catalog

Skills live in [.cursor/skills/](.cursor/skills/). Agents and main session should read the matching skill before specialized work.

| Skill | Path | When to load |
|-------|------|--------------|
| `ecosystem-content` | [.cursor/skills/ecosystem-content/SKILL.md](.cursor/skills/ecosystem-content/SKILL.md) | Domain cards, CTAs, ecosystem sequence |
| `anatomizer-prompt` | [.cursor/skills/anatomizer-prompt/SKILL.md](.cursor/skills/anatomizer-prompt/SKILL.md) | Anatomizer presets, 5-block prompt format |
| `seo-crawler` | [.cursor/skills/seo-crawler/SKILL.md](.cursor/skills/seo-crawler/SKILL.md) | SEO, GEO, AIO, robots, schema, llms.txt |
| `deploy-vercel` | [.cursor/skills/deploy-vercel/SKILL.md](.cursor/skills/deploy-vercel/SKILL.md) | Cold deploy, DNS, post-deploy verification |
| `scaffold-mvp` | [.cursor/skills/scaffold-mvp/SKILL.md](.cursor/skills/scaffold-mvp/SKILL.md) | **Disabled** — historical scaffold only |

---

## Cursor rules

Rules live in [.cursor/rules/](.cursor/rules/). `alwaysApply: true` rules load every session.

| Rule | Scope | Always on |
|------|-------|-----------|
| [project-core.mdc](.cursor/rules/project-core.mdc) | Project identity, scope, non-negotiables | **Yes** |
| [react-ui.mdc](.cursor/rules/react-ui.mdc) | `src/**/*.tsx`, `src/**/*.ts`, `snippet.txt` | No |
| [content-brand.mdc](.cursor/rules/content-brand.mdc) | `src/data/**`, `primal_concept.txt`, `**/*.md` | No |
| [deploy-vercel.mdc](.cursor/rules/deploy-vercel.mdc) | `README.md`, `package.json`, `index.html`, `public/**` | No |

---

## Code map (quick)

```
src/
  components/layout/     Hero, Header, Footer, marketing shell
  components/ecosystem/  SequencePath, DomainDetail, EcosystemMap
  components/anatomizer/ AnatomizerBuilder, LayerSelector
  components/maturity/   MaturityQuiz
  data/                  domains, quiz, anatomyBuilder, ecosystemTheme, seoFaq, siteContact
  utils/                 tabNavigation (hash deep links)
  index.css              token + utility source of truth
scripts/
  generate-og.mjs        OG PNG prebuild
  generate-llms.mjs      llms-full.txt + sitemap lastmod
  viewport-qa.mjs        Playwright overflow check
```

---

## URL policy (do not mix)

| Purpose | Domain |
|---------|--------|
| This marketing site — canonical, OG, sitemap, WebSite schema | `promptanatomy.site` |
| Platform hub — Organization schema, product CTAs | `promptanatomy.app` |
| Ecosystem modules | `promptanatomy.{cloud,info,space,help,ceo,pro,blog}` |

---

## Maintaining this index

Update **DOCS_INDEX.md** when you add or rename:

- Root-level docs (`*.md`, `*.txt` prompts)
- `.cursor/agents/` or `.cursor/skills/` entries
- Generated public assets or build scripts that affect SEO/deploy
- Source-of-truth data files under `src/data/`

Then add a bullet under `CHANGELOG.md` → `[Unreleased]`.
