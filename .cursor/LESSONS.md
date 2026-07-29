# Agent lessons — Prompt Anatomy site

**Purpose:** Durable corrections from audits and shipped work. Agents and skills must follow these; do not reintroduce fixed drifts.

**Last updated:** 2026-07-30 (SEO/GEO harden)

---

## Naming & product truth

1. **Kits, not legacy nicknames** — Footer and schema must use kit roles (`organization kit`, `executive kit`). Never restore `daily automation`, `scaling`, `Daily Automation Library`, `Enterprise Scaling Engine`, or `.lol` as a “sandbox” unless the product actually ships that.
2. **Stage 7 is Deepen** — Domain title `7. Deepen`. Internal phase id stays `Knowledge`; UI label via `phaseLabelFor` must render **Deepen** (not Learn).
3. **Play is Corporate Ladder** — Telegram mini-game framing only; no “Experiment & Exploration Lab” / sandbox marketing copy.
4. **DomainDetail features** — Heading is **What's included**, not “Included system components” (subdomains ship kits/playbooks, not full OS modules).
5. **Aggregate stats** — StatsStrip eyebrow is **Across the ecosystem**; counts are ecosystem-wide, not one URL’s library.

## URLs & assets

6. **Platform CTAs** — Use `PLATFORM_URL` from `src/data/siteContact.ts` (strip trailing slash for `href`). Do not hardcode `https://promptanatomy.app` in Hero / ClosingCta / Footer.
7. **OG asset** — Live file is `public/og_2.png` (1600×900). Agent/deploy checklists must not require `og-image.png`. `generate-og.mjs` cache-busts and copies to `.github/social-preview.png` — it does **not** run Satori.
8. **Canonical split** — `.site` for this marketing site; `.app` for Organization / platform CTAs only.

## Quiz & SEO copy

9. **Tier 3 result** — Soften claims; point to the executive kit on `.pro`. Do not say “fully scaled enterprise configurations.”
10. **FAQ capsules vs FAQPage** — `seoFaq.ts` feeds on-page `FaqSection`, `llms-full.txt`, and FAQPage JSON-LD. Keep those surfaces in sync. After `seoFaq.ts` edits, run `npm run generate:llms` and `npm run generate:jsonld`.
11. **llms / sitemap** — After domain or quiz mirror changes in generators, run `npm run generate:llms` so `lastmod` and `llms-full.txt` stay fresh.
12. **OAI-SearchBot** — Always Allow in `robots.txt` for ChatGPT Search citations. GPTBot (training) remains Allow by policy; do not conflate the two.
13. **Organization.sameAs** — Brand identities only (`.app`, `.site`, Telegram, company pages). Personal LinkedIn / article URLs belong on Person or as CreativeWork — never dump article URLs into Organization.sameAs.

## Docs hygiene

14. **CHANGELOG `[Unreleased]`** — Must match live product. Remove or correct bullets that contradict later superseding work (e.g. sandbox Play, Satori dual OG) instead of leaving them as pending truth.
15. **DS version** — Implementation maturity is **v2.2**. Do not document the live site as “v1.5 pre-release” or “v2.0 only” in README / AGENTS when §19 declares v2.2 (historical prompts like `second.txt` may still say v1.5 as their baseline).
16. **Cross-surface edits** — When renaming a stage or kit role, update together: `domains.ts`, footer labels, FAQ capsules, `llms.txt`, JSON-LD Product description, agent skills, and phase UI label if applicable.

## Dead code

17. Do not reintroduce unused `phaseFor` or `public/noise.svg` without a real consumer.
