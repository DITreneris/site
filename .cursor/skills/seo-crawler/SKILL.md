---
name: seo-crawler
description: SEO, GEO, AIO, and crawler strategy for promptanatomy.site. Use when editing metadata, robots.txt, sitemap, llms.txt, JSON-LD, or hash deep links — without redesigning visible UI.
---

# SEO & Crawler Skill

## When to use

- Auditing or improving search and AI crawler visibility
- Editing `index.html` head, `public/robots.txt`, `public/sitemap.xml`, `public/llms.txt`
- Updating FAQ in `src/data/seoFaq.ts` (on-page FaqSection, FAQPage JSON-LD, and `llms-full.txt`)
- Regenerating `public/llms-full.txt` or OG assets

## Full audit template

For a comprehensive audit plan, read [seo.txt](../../seo.txt) at repo root. It defines executive summary, crawlability, AI crawler policy, metadata, schema, and implementation phases.

## URL policy (non-negotiable)

| Purpose | Domain |
|---------|--------|
| Canonical, OG, sitemap, WebSite schema | `https://promptanatomy.site` |
| Organization HQ, platform CTAs | `https://promptanatomy.app` |

Do not point canonical/OG at `.app` for this site.

## Key files

| File | Role |
|------|------|
| `index.html` | Title, meta, OG/Twitter, noscript capsule; JSON-LD `@graph` from `scripts/generate-jsonld.mjs` |
| `scripts/generate-jsonld.mjs` | Build-time Person, Organization, WebSite, WebPage, ItemList, Product, SoftwareApplication, FAQPage |
| `scripts/og-constants.mjs` | OG copy, colors, layout — keep `og:image:alt` in sync |
| `scripts/generate-og.mjs` | Cache-bust patch + copy `og_2.png` → `.github/social-preview.png` |
| `public/og_2.png` | Hand-maintained site OG (1600×900) |
| `public/robots.txt` | Allow search + AI crawlers (incl. OAI-SearchBot); Disallow `/src/`, `/node_modules/` |
| `public/sitemap.xml` | Canonical URLs; `lastmod` from `scripts/generate-llms.mjs` |
| `public/llms.txt` | Curated AI-readable site map (hand-maintained) |
| `public/llms-full.txt` | Extended reference — domains, Anatomizer, FAQ capsules, quiz |
| `public/.well-known/security.txt` | Security contact |
| `src/data/seoFaq.ts` | FAQ source for FaqSection, FAQPage JSON-LD, and `llms-full.txt` |
| `src/data/siteContact.ts` | Founder `AUTHOR.sameAs`, `ORG_SAME_AS`, footer social links |
| `src/utils/tabNavigation.ts` | Hash deep links: `/#ecosystem`, `/#anatomizer`, `/#maturity` (tabs); `/#method`, `/#faq` are always-visible page anchors |
| `App.tsx` | All tab panels mounted (`hidden`) for crawler DOM access |

## Build commands

```bash
npm run generate:og      # patch og_2.png ?v= hash + copy to .github/social-preview.png
npm run generate:llms    # public/llms-full.txt + sitemap lastmod
npm run generate:jsonld  # patch index.html JSON-LD @graph
npm run build            # prebuild runs all three generators
```

## OG assets

- **Site OG:** `public/og_2.png` at 1600×900 — referenced by `og:image`, `twitter:image`, JSON-LD.
- **GitHub repo card:** `.github/social-preview.png` — copy of `og_2.png`; upload via GitHub Settings. Optional steps: `docs/private/DEPLOY.md` if present (local / private — do not commit).
- **Cache bust:** `generate-og.mjs` patches `og_2.png?v=<sha256-prefix>` in `index.html` on each build when PNG bytes change.

## Crawler policy (MVP)

- **Allow:** Googlebot, Bingbot, DuckDuckBot, Applebot, **OAI-SearchBot** (ChatGPT Search), GPTBot (training — allowed by policy), ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended, and peers listed in `robots.txt`
- **Block:** `/src/`, `/node_modules/`, staging/preview URLs (not production)
- **Strategy:** Open for discovery; closed for source/build paths
- Keep FAQPage JSON-LD in sync with visible on-page FaqSection (`seoFaq.ts` is the single source)

## Constraints

- Do not redesign frontend or change visible copy unless required for SEO clarity
- Do not break hash routing or tab navigation
- Do not expose admin, API, or internal routes
- Static OG only — `public/og_2.png` (not `og-image.png`); no runtime OG API routes for MVP
- Product / founder FAQ copy: kit-accurate nine-domain wording — no “daily automation” / “scaling” legacy phrases
- After `seoFaq.ts` edits, run `npm run generate:llms` and `npm run generate:jsonld`. After `generate-jsonld.mjs` edits, run `npm run generate:jsonld`
- See [`.cursor/LESSONS.md`](../LESSONS.md) for durable SEO/naming corrections

## Post-change verification

Use the `deploy-vercel` skill post-deploy checklist: HTTPS, canonical, `/llms.txt`, Rich Results Test, sitemap. Optional extra steps: `docs/private/DEPLOY.md` if present.

## Delegate

- Visible UI/layout regressions → `ui-builder` agent
- Domain marketing copy → `content-editor` + `ecosystem-content` skill
- Release notes → `changelog-keeper` agent
