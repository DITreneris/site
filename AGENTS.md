# Prompt Anatomy Ecosystem Site — Agent Guide



## What we are building



A production marketing and demo site for **Prompt Anatomy**. The site is the ecosystem map for teams: nine domains, a prompt builder (Anatomizer), and a team assessment. Training lives at promptanatomy.app.



**Core message:** Less random prompting. More structured execution.



## Deployment



| | |

|---|---|

| **Live URL** | https://promptanatomy.site |

| **Platform hub** | https://promptanatomy.app (external CTAs only) |

| **GitHub** | https://github.com/DITreneris/site |

| **Host** | Vercel (static SPA, output `dist`) |



## Document map



**Full index:** [DOCS_INDEX.md](DOCS_INDEX.md) — task router, document registry, agent roster, skills catalog.



## Source of truth



| File | Purpose |

|------|---------|

| `DOCS_INDEX.md` | Document map for humans and agents (start here for file discovery) |

| `README.md` | Human onboarding, local dev |

| `primal_concept.txt` | Brand narrative, domain roles, audience, ecosystem logic |

| `src/index.css` | Token implementation (`@theme` + `@utility`) |

| `DESIGN_SYSTEM.md` | Design system maturity (**v2.2**), tokens, QA/a11y (§13), agent guardrails (§14) |

| `snippet.txt` | Legacy prototype — do not reintroduce slate-950/indigo/rainbow palette |

| `CHANGELOG.md` | Running log of notable changes (Keep a Changelog format) |
| `.cursor/LESSONS.md` | Durable agent corrections (naming, OG, URLs, CHANGELOG hygiene) |



## Private planning (local)

**Local / private — do not commit.** Roadmap, max-ROI queue, and the full deploy runbook live in [`docs/private/`](docs/private/) when present (`ROADMAP.md`, `TODO.md`, `DEPLOY.md`). Do not recreate those files at the repo root. If they are missing (other machine, Cloud agent), use the public `deploy-vercel` skill checklist and skip roadmap/todo work.



## Agent roster



| Agent | Skills | Use when |

|-------|--------|----------|

| `ui-builder` | — | Components, layout, tokens, responsive UI |

| `content-editor` | `ecosystem-content`, `anatomizer-prompt` | Domain copy, quiz, Anatomizer presets |

| `seo-specialist` | `seo-crawler` | Metadata, crawlers, schema, llms.txt |

| `verifier` | — | Pre-done QA (read-only checklist) |

| `changelog-keeper` | — | `CHANGELOG.md` after shipped work |



Agent files: `.cursor/agents/`. Skills: `.cursor/skills/`. See [DOCS_INDEX.md](DOCS_INDEX.md) for the full task router.



## Workflow



1. Pick agent + skill from [DOCS_INDEX.md](DOCS_INDEX.md) task router (or work inline with matching rules).

2. Make the change following the rules in `.cursor/rules/`.

3. Verify in dev (`npm run dev`) and that `npm run build` passes.

4. After layout changes, run `npm run qa:viewport` (preview + Playwright).

5. Record user-visible changes in `CHANGELOG.md` under `## [Unreleased]` — delegate to the `changelog-keeper` agent or update it directly.

6. Use the `verifier` agent for QA on feature work before considering a task done.



## Ecosystem domains (fixed order)



`Enter → Use → Create → Hire → Manage → Decide → Deepen → Play`



| ID | Domain | Stage |

|----|--------|-------|

| `app` | promptanatomy.app | Core platform (hub) |

| `cloud` | promptanatomy.cloud | 1. Enter |

| `info` | promptanatomy.info | 2. Use |

| `space` | promptanatomy.space | 3. Create |

| `help` | promptanatomy.help | 4. Hire |

| `ceo` | promptanatomy.ceo | 5. Manage |

| `pro` | promptanatomy.pro | 6. Decide |

| `blog` | promptanatomy.blog | 7. Deepen |
| `lol` | promptanatomy.lol | 8. Play |



## MVP scope (in)



- Landing shell: Hero, ProblemSolution, StatsStrip, ClosingCta, Footer

- Three tabs (UI labels): **Ecosystem**, **Prompt Builder**, **Team Assessment** (internal ids: `ecosystem` | `anatomizer` | `maturity`)

- Light marketing shell + dark ecosystem band (`section-dark`, phase accents via `ecosystemTheme.ts`)

- `SequencePath` four-phase journey (Adopt, Apply, Scale, Knowledge — UI label **Deepen**) + `DomainDetail` panel

- Anatomizer: 5-part prompt assembly via reusable `LayerSelector`

- Maturity quiz with tier result, recommended domain pivot, and external CTA

- SEO: canonical/OG/sitemap on `promptanatomy.site`; Organization on `promptanatomy.app`

- Build-time OG cache-bust via `scripts/generate-og.mjs` (hand-maintained `public/og_2.png` → `.github/social-preview.png`)



## MVP scope (out)



- Auth, payments, CMS, backend API

- Multi-language, A/B testing, analytics beyond basic

- Full template library (600+ templates) — reference counts only

- Separate deployable apps per subdomain



## Tech stack



- **Vite** + **React 19** + **TypeScript**

- **Tailwind CSS v4** for styling

- **lucide-react** for icons

- Static deploy on **Vercel**



## Code conventions



- Split UI into `src/components/`, data into `src/data/`

- Domain and quiz data live in `src/data/` as typed constants

- Use tokens from `src/index.css`; no raw hex/rgba in JSX

- Match existing visual language: light page surfaces, navy/gold brand, dark ecosystem band

- Copy changes must align with `primal_concept.txt` tone — professional, structured, no hype filler

- Platform CTAs: import `platformHref(medium)` from `src/data/siteContact.ts` (gateway UTM). Lesson / exec kit: `lessonHref` / `execKitHref`. Do not publish EUR amounts on `.site`.

- Before finishing content/SEO/docs work, skim [`.cursor/LESSONS.md`](.cursor/LESSONS.md) so known drifts are not reintroduced



## When unsure



1. Open [DOCS_INDEX.md](DOCS_INDEX.md) and follow the task router

2. Check `primal_concept.txt` for messaging

3. Check `DESIGN_SYSTEM.md` §14 for UI guardrails

4. Prefer smallest diff that satisfies the request

5. Do not invent new product domains or rename existing ones

