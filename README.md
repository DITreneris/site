# Prompt Anatomy — Ecosystem Site

Official marketing and demo site for the **Prompt Anatomy** AI Operating System.

| | |
|---|---|
| **Live site** | [promptanatomy.site](https://promptanatomy.site) |
| **Platform hub** | [promptanatomy.app](https://promptanatomy.app) |
| **Repository** | [github.com/DITreneris/site](https://github.com/DITreneris/site) |
| **Host** | Vercel |

**Core message:** Less random prompting. More structured execution.

## What this site does

- Explains the nine-domain ecosystem (Enter → Use → Create → Hire → Manage → Decide → Deepen → Play)
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
npm run build        # prebuild generators, then tsc + vite
npm run preview      # serve dist locally
npm run qa:viewport  # Playwright overflow check (preview must be running)
```

Cursor contributors: start with [AGENTS.md](AGENTS.md).

## Contact

info@promptanatomy.app
