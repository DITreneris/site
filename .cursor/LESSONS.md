# Agent lessons — Prompt Anatomy site

**Purpose:** Durable corrections from audits and shipped work. Agents and skills must follow these; do not reintroduce fixed drifts.

**Last updated:** 2026-08-23 (private planning docs)

---

## Naming & product truth

1. **Kits, not legacy nicknames** — Footer and schema must use kit roles (`organization kit`, `executive kit`). Never restore `daily automation`, `scaling`, `Daily Automation Library`, `Enterprise Scaling Engine`, or `.lol` as a “sandbox” unless the product actually ships that.
2. **Stage 7 is Deepen** — Domain title `7. Deepen`. Internal phase id stays `Knowledge`; UI label via `phaseLabelFor` must render **Deepen** (not Learn).
3. **Play is Corporate Ladder** — Telegram mini-game framing only; no “Experiment & Exploration Lab” / sandbox marketing copy.
4. **DomainDetail features** — Heading is **What's included**, not “Included system components” (subdomains ship kits/playbooks, not full OS modules).
5. **Aggregate stats** — StatsStrip eyebrow is **Across the ecosystem**; counts are ecosystem-wide, not one URL’s library.

## URLs & assets

6. **Platform CTAs** — Use `platformHref(medium)` from `src/data/siteContact.ts` (adds `utm_source=site&utm_medium={medium}&utm_campaign=gateway`). Do not hardcode `https://promptanatomy.app` or use a raw stripped `PLATFORM_URL` in Hero / ClosingCta / Footer / quiz / Anatomizer. Leave `ENTITY_FOOTER_URL` as the affiliation line. Do not conflate enter-5 (Role → Quality control on `.cloud`), demo-5 (Anatomizer layers), and course-6 (META → ADVANCED on `.app`).
7. **Entity footer (QW1b)** — Quiet affiliation line uses `ENTITY_FOOTER_URL` (www + entity UTM). Do not replace conversion CTAs with it, and do not put the founder name in that line.
8. **OG asset** — Live file is `public/og_2.png` (1600×900). Agent/deploy checklists must not require `og-image.png`. `generate-og.mjs` cache-busts and copies to `.github/social-preview.png` — it does **not** run Satori.
9. **Canonical split** — `.site` for this marketing site; `.app` for Organization / platform CTAs only.

## Quiz & SEO copy

10. **Tier 3 result** — Soften claims; point to the executive kit on `.pro`. Do not say “fully scaled enterprise configurations.”
11. **FAQ capsules vs FAQPage** — `seoFaq.ts` feeds on-page `FaqSection`, `llms-full.txt`, and FAQPage JSON-LD. Keep those surfaces in sync. After `seoFaq.ts` edits, run `npm run generate:llms` and `npm run generate:jsonld`.
12. **llms / sitemap** — After domain or quiz mirror changes in generators, run `npm run generate:llms` so `lastmod` and `llms-full.txt` stay fresh.
13. **OAI-SearchBot** — Always Allow in `robots.txt` for ChatGPT Search citations. GPTBot (training) remains Allow by policy; do not conflate the two.
14. **Organization.sameAs** — Brand identities only (`.app`, `.site`, Telegram, company pages). Personal LinkedIn / article URLs belong on Person or as CreativeWork — never dump article URLs into Organization.sameAs.

## Docs hygiene

15. **CHANGELOG `[Unreleased]`** — Must match live product. Remove or correct bullets that contradict later superseding work (e.g. sandbox Play, Satori dual OG) instead of leaving them as pending truth.
16. **DS version** — Implementation maturity is **v2.2**. Do not document the live site as “v1.5 pre-release” or “v2.0 only” in README / AGENTS when §19 declares v2.2 (historical prompts like `second.txt` may still say v1.5 as their baseline).
17. **Cross-surface edits** — When renaming a stage or kit role, update together: `domains.ts`, footer labels, FAQ capsules, `llms.txt`, JSON-LD Product description, agent skills, and phase UI label if applicable.
18. **Private planning** — Do not recreate `ROADMAP.md`, `TODO.md`, or `DEPLOY.md` at the repo root. Those files live in `docs/private/` (local / private — do not commit). If missing, use the public `deploy-vercel` skill and skip roadmap/todo work.

## Dead code

19. Do not reintroduce unused `phaseFor` or `public/noise.svg` without a real consumer.
