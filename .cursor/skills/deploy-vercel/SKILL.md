---
name: deploy-vercel
description: Cold deploy and Vercel DNS checklist for the Prompt Anatomy ecosystem site at promptanatomy.site. Use when preparing releases, connecting GitHub to Vercel, or verifying production deploy.
---

# Deploy Vercel Skill

## When to use

- First production deploy or cold deploy to a new Vercel project
- Adding/updating custom domain DNS
- Verifying SEO assets and build output before release

## Pre-push checklist

1. `git rev-parse --show-toplevel` → must be the project folder (not user home)
2. `npm install && npm run build` → exit 0
3. `public/og-image.png` exists (from `npm run generate:og`)
4. `public/creator-janitor.png` exists
5. `index.html` canonical + OG → `https://promptanatomy.site`
6. `public/robots.txt` + `sitemap.xml` → `.site` domain
7. Organization JSON-LD → `promptanatomy.app`; WebSite → `promptanatomy.site`

## GitHub

```bash
git remote -v   # origin → https://github.com/DITreneris/site.git
git push -u origin main
```

## Vercel project settings

| Setting | Value |
|---------|-------|
| Framework | Vite |
| Build command | `npm run build` |
| Output directory | `dist` |
| Install command | `npm install` |
| Root directory | `.` |

No environment variables required for MVP.

## Custom domain (Porkbun → Vercel)

1. Vercel → Project → Settings → Domains → add `promptanatomy.site`
2. Apply DNS records Vercel provides at Porkbun
3. Wait for SSL (usually minutes)
4. Set `promptanatomy.site` as primary domain

## Post-deploy verification

- [ ] https://promptanatomy.site/ loads over HTTPS
- [ ] `/og-image.png` and `/creator-janitor.png` return 200
- [ ] View-source: `canonical` = `.site`
- [ ] All 3 tabs work on mobile
- [ ] Platform CTAs still link to `promptanatomy.app`

## Do not

- Deploy from a git root outside this project folder
- Use runtime OG API routes for MVP — static PNG only
- Change platform hub URL in CTAs to `.site`
