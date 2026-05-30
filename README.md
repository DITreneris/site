# Prompt Anatomy — Ecosystem Site

Official marketing and demo site for the **Prompt Anatomy** AI Operating System.

| | |
|---|---|
| **Live site** | [promptanatomy.site](https://promptanatomy.site) |
| **Platform hub** | [promptanatomy.app](https://promptanatomy.app) |
| **Repository** | [github.com/DITreneris/site](https://github.com/DITreneris/site) |
| **Deploy** | Vercel (primary) |

**Core message:** Less random prompting. More structured execution.

## What this site does

- Explains the 8-domain ecosystem (Enter → Use → Upgrade → Recruit → Manage → Decide → Learn)
- **Ecosystem** tab — phase-driven journey map with domain detail panel
- **Prompt Builder** — interactive 5-part Anatomizer (Persona, Context, Variables, Instructions, Constraints)
- **Team Assessment** — 60-second AI maturity quiz with tier result and domain recommendation

## Tech stack

- Vite 8 + React 19 + TypeScript
- Tailwind CSS v4 (`@tailwindcss/vite`)
- lucide-react icons
- Static SPA — no backend, auth, or CMS

## Local development

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # runs generate:og prebuild, then tsc + vite
npm run preview      # serve dist locally
npm run generate:og  # regenerate public/og-image.png
npm run qa:viewport  # Playwright overflow check (preview must be running)
```

## Project structure

```
src/
  components/
    layout/       Header, Hero, ProblemSolution, StatsStrip, ClosingCta, Footer
    ecosystem/    EcosystemMap, SequencePath, DomainDetail
    anatomizer/   AnatomizerBuilder, LayerSelector
    maturity/     MaturityQuiz
  data/           domains, quiz, anatomy presets, ecosystemTheme, siteContact
  index.css       design tokens (@theme + @utility) — token source of truth
public/           favicon, robots.txt, sitemap.xml, og-image.png, creator-janitor.png
scripts/          generate-og.mjs, viewport-qa.mjs
```

## Source of truth

| File | Purpose |
|------|---------|
| `primal_concept.txt` | Brand narrative, domain roles, audience |
| `DESIGN_SYSTEM.md` | Design system v1.5 pre-release, tokens, QA, agent guardrails |
| `AGENTS.md` | Cursor agent guide |
| `CHANGELOG.md` | Release history (Keep a Changelog) |
| `snippet.txt` | Legacy prototype — palette regression guard only |

## SEO model

- **This site** (`promptanatomy.site`) — canonical URL, Open Graph, sitemap, WebSite schema
- **Brand HQ** (`promptanatomy.app`) — Organization schema, platform CTAs, email

## Deploy to Vercel

1. Push to `main` on [DITreneris/site](https://github.com/DITreneris/site)
2. Import repo in [Vercel](https://vercel.com) → Framework: **Vite**
3. Build command: `npm run build` · Output directory: `dist`
4. Add custom domain `promptanatomy.site` in Vercel → apply DNS records at Porkbun
5. Verify: HTTPS, `/og-image.png`, `/creator-janitor.png`, canonical tag

See [DEPLOY.md](DEPLOY.md) for the full cold-deploy checklist (Vercel import + Porkbun DNS).

## Contact

info@promptanatomy.app · Founder: Tomas Staniulis
