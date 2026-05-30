# Deploy Guide — promptanatomy.site

Step-by-step for connecting [github.com/DITreneris/site](https://github.com/DITreneris/site) to Vercel and Porkbun DNS.

## 1. GitHub (done)

- Repo: https://github.com/DITreneris/site
- Branch: `main`
- Latest release: **v1.0.0**

## 2. Vercel import

1. Sign in at [vercel.com](https://vercel.com) with GitHub.
2. **Add New → Project** → import `DITreneris/site`.
3. Configure:

| Setting | Value |
|---------|-------|
| Framework Preset | Vite |
| Root Directory | `.` |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

4. Deploy. Confirm the `*.vercel.app` URL loads all three tabs.

## 3. Custom domain (Porkbun)

1. Vercel project → **Settings → Domains**.
2. Add `promptanatomy.site` (recommended primary) and optionally `www.promptanatomy.site`.
3. In [Porkbun](https://porkbun.com) DNS for `promptanatomy.site`, apply records Vercel shows:

**Typical apex setup:**

| Type | Host | Value |
|------|------|-------|
| A | `@` | `76.76.21.21` (verify in Vercel dashboard — IP may change) |

**WWW (optional):**

| Type | Host | Value |
|------|------|-------|
| CNAME | `www` | `cname.vercel-dns.com` |

4. Wait for SSL (usually 1–15 minutes).
5. Set **Primary Domain** to `promptanatomy.site` in Vercel.

## 4. Post-deploy verification

- [ ] https://promptanatomy.site/ loads over HTTPS
- [ ] View source: `<link rel="canonical" href="https://promptanatomy.site/" />`
- [ ] https://promptanatomy.site/og_2.png returns 200
- [ ] https://promptanatomy.site/creator-janitor.png returns 200
- [ ] https://promptanatomy.site/robots.txt references `.site` sitemap and AI crawler Allow rules
- [ ] https://promptanatomy.site/llms.txt returns 200
- [ ] https://promptanatomy.site/llms-full.txt returns 200
- [ ] Deep links work: `/#anatomizer`, `/#maturity`, `/#ecosystem`
- [ ] Platform CTAs still open https://promptanatomy.app
- [ ] Test social preview: https://www.opengraph.xyz/url/https://promptanatomy.site
- [ ] LinkedIn cache check: [Post Inspector](https://www.linkedin.com/post-inspector/) with `https://promptanatomy.site/`
- [ ] Validate structured data: [Google Rich Results Test](https://search.google.com/test/rich-results?url=https://promptanatomy.site/)
- [ ] View source: `og:image` and JSON-LD `Product.image` include `og_2.png?v=<hash>` (patched by `generate-og.mjs` at prebuild)

## 5. GitHub repo social preview (manual)

After `npm run generate:og` or deploy, upload the GitHub card (not read from site OG tags):

1. Repo → **Settings → General → Social preview** → upload [`.github/social-preview.png`](.github/social-preview.png) (1280×640, <1 MB).
2. Set **Website** to `https://promptanatomy.site`.
3. Set **About description** (≤350 chars), e.g. *Marketing site for Prompt Anatomy — 8-domain AI OS for teams. React/Vite SPA with Anatomizer, maturity quiz, and AI-crawler docs. Live at promptanatomy.site*.
4. Add **Topics**: `ai`, `prompt-engineering`, `react`, `vite`, `typescript`, `tailwindcss`, `seo`, `vercel`, `marketing-site`.
5. Share `https://github.com/DITreneris/site` in Slack/Discord to confirm the repo card.

Re-upload after OG rebrand changes (when `.github/social-preview.png` changes).

## 6. Search indexing follow-up

- [ ] Submit `https://promptanatomy.site/sitemap.xml` in Google Search Console
- [ ] Submit sitemap in Bing Webmaster Tools

## 7. Optional follow-up

- Google Search Console property for `promptanatomy.site`
- Bing Webmaster Tools
- Git tag: `git tag v1.0.0 && git push origin v1.0.0`

## CLI alternative

If Vercel CLI is installed:

```bash
npx vercel link
npx vercel --prod
```

Then add the domain in the dashboard as above.
