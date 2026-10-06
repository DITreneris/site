# Agent lessons — Prompt Anatomy site

**Purpose:** Durable corrections from audits and shipped work. Agents and skills must follow these; do not reintroduce fixed drifts.

**Last updated:** 2026-10-06 (founder FAQ, sitemap lastmod)

---

## Naming & product truth

1. **Kits, not legacy nicknames** — Footer and schema must use kit roles (`organization kit`, `executive kit`). Never restore `daily automation`, `scaling`, `Daily Automation Library`, `Enterprise Scaling Engine`, or `.lol` as a “sandbox” unless the product actually ships that.
2. **Stage 7 is Deepen** — Domain title `7. Deepen`. Internal phase id stays `Knowledge`; UI label via `phaseLabelFor` must render **Deepen** (not Learn).
3. **Play is Corporate Ladder** — Telegram mini-game framing only; no “Experiment & Exploration Lab” / sandbox marketing copy.
4. **DomainDetail features** — Heading is **What's included**, not “Included system components” (subdomains ship kits/playbooks, not full OS modules).
5. **Aggregate stats** — StatsStrip eyebrow is **Across the ecosystem**; counts are ecosystem-wide, not one URL’s library.

## URLs & assets

6. **Platform CTAs** — Use `platformHref(medium)` from `src/data/siteContact.ts` (adds `utm_source=site&utm_medium={medium}&utm_campaign=gateway`). Do not hardcode `https://promptanatomy.app` or use a raw stripped `PLATFORM_URL` in Hero / ClosingCta / Footer / quiz / Anatomizer. Leave `ENTITY_FOOTER_URL` as the affiliation line. Do not conflate enter-5 (Role → Quality control on `.cloud`), demo-5 (Anatomizer layers), and course-6 (META → ADVANCED on `.app`). Spoke Open (DomainDetail), footer Enter→Play, and quiz kit CTAs use `kitHref` / `lessonHref` / `execKitHref` with the same gateway query. `kitHref` resolves `src/data/spokeCanonical.json` (live 200: www and `/en/` where that is the storefront). A bare `https://promptanatomy.{spoke}` on those conversion CTAs is a regression. Schema, `llms.txt`, and legal/social URLs stay bare apex — do not reuse the 200 map there. `verify:hrefs` imports `kitHref` from `src/data/gatewayHref.mjs` (types: `gatewayHref.d.mts`). Do not copy `withGatewayUtm` into the script, and do not add `gatewayHref.d.ts` or `gatewayHref.mjs.d.ts` — those specifiers do not resolve.
7. **Entity footer (QW1b)** — Quiet affiliation line uses `ENTITY_FOOTER_URL` (www + entity UTM). Do not replace conversion CTAs with it, and do not put the founder name in that line.
8. **OG asset** — Live file is `public/og_2.png` (1600×900). Agent/deploy checklists must not require `og-image.png`. `generate-og.mjs` cache-busts and copies to `.github/social-preview.png` — it does **not** run Satori.
9. **Canonical split** — `.site` for this marketing site; `.app` for Organization / platform CTAs only.

## Quiz & SEO copy

10. **Tier 3 result** — Soften claims; point to the executive kit on `.pro`. Do not say “fully scaled enterprise configurations.”
11. **FAQ capsules vs FAQPage** — `seoFaq.ts` feeds on-page `FaqSection`, `llms-full.txt`, and FAQPage JSON-LD. Keep those surfaces in sync. After `seoFaq.ts` edits, run `npm run generate:llms` and `npm run generate:jsonld`. The founder answer must not say he builds an AI operating system. The Tier 3 label **Structured AI OS Ready** stays.
12. **llms / sitemap** — After domain or quiz mirror changes in generators, run `npm run generate:llms`. Compare `llms-full.txt` without the `# Generated:` date. Keep sitemap `lastmod` when that body is unchanged. Do not stamp UTC today on every run.
13. **OAI-SearchBot** — Always Allow in `robots.txt` for ChatGPT Search citations. GPTBot (training) remains Allow by policy; do not conflate the two.
14. **Organization.sameAs** — Brand identities only (`.app`, `.site`, Telegram, company pages). Personal LinkedIn / article URLs belong on Person or as CreativeWork — never dump article URLs into Organization.sameAs.

## Docs hygiene

15. **CHANGELOG `[Unreleased]`** — Must match live product. Remove or correct bullets that contradict later superseding work (e.g. sandbox Play, Satori dual OG) instead of leaving them as pending truth.
16. **DS version** — Implementation maturity is **v2.2**. Do not document the live site as “v1.5 pre-release” or “v2.0 only” in README / AGENTS when §19 declares v2.2 (historical prompts like `second.txt` may still say v1.5 as their baseline).
17. **Cross-surface edits** — When renaming a stage or kit role, update together: `domains.ts`, footer labels, FAQ capsules, `llms.txt`, JSON-LD Product description, agent skills, and phase UI label if applicable.
18. **Private planning** — Do not recreate `ROADMAP.md`, `TODO.md`, or `DEPLOY.md` at the repo root. Those files live in `docs/private/` (local / private — do not commit). If missing, use the public `deploy-vercel` skill and skip roadmap/todo work.

## Dead code

19. Do not reintroduce unused `phaseFor` or `public/noise.svg` without a real consumer.

## Type & surfaces

20. **Semantic text utilities are color, not size** — `text-body`, `text-body-strong`, `text-muted`, `text-subtle`, `text-on-dark`, and `text-on-dark-strong` do not set font size. Pair reading text with `text-sm` or `text-base`. `text-caption` (11px) and `text-micro` (10px) are labels only. Do not use `text-caption` for the hero proof line, terminal body, checklist, quiz answers, or practice prompts.
21. **Contrast** — “Explore the ecosystem”, quiz **Back**, and “View starting stage” are `text-sm font-semibold text-body-strong`, not `link-inline` (12px slate-400 fails on light cards). On navy, the stats disclaimer and closing subtitle use `text-on-dark`, not `text-muted` or `text-subtle`. SequencePath roles and domain labels use `text-on-dark`; stage titles are `text-sm font-bold text-white`. “Best for” and “What's included” stay `text-label-upper text-subtle` because they are labels. Dark header and ecosystem focus rings stay gold: that override is unlayered so it beats `focus-ring`.
22. **Parked chrome** — SequencePath’s outer shell stays static glass. `card-glass` adds a hover rim on the whole map. DomainDetail has no mono domain badge beside the title (it repeated Open {domain}); the phase pill stays. “Start training” stays `btn-secondary-dark`. Repeated “Open the platform” buttons stay. The shield note is plain `text-sm text-body`; only the pre-copy checklist uses `callout-accent`.
23. **Discovery title** — `.site` title, hero badge, h1, and `og:title` name the visit: **Prompt Anatomy — Ecosystem for teams**, badge **Ecosystem**, h1 **Less random prompting. More structured execution.** Do not restore “AI Operating System” or “AI Training System” in those slots. The hub title stays **AI Training System**. Do not lift the hub sentence “Turn random AI chats into repeatable business workflows.” into the `.site` h1.
24. **Lockup** — Header and footer use `BrandLockup`: solid navy tile, filled gold bolt, **Prompt** navy or white and **Anatomy** gold, weight 900. No tagline in the logo row. Favicon copies the hub bolt path, painted `#cfa73a` on flat `#0b1320`. Organization `logo` is `https://www.promptanatomy.app/og-image.png`.
25. **Anatomizer scenario reload** — `openAnatomizer` bumps `scenarioNonce` on every open. The builder effect no-ops at nonce 0 (first mount). The same scenario id must reload when the nonce changes. A null id with nonce > 0 clears the active chip and resets selection to `INITIAL`. Do not clear the three pre-copy checks on scenario load, chip load, or layer change.
26. **Unselected radios** — `ExclusiveChoiceGroup` with `value === null` steps off the focused radio and wraps. ArrowUp and ArrowDown must not both select index 0 (practice index 0 is the wrong answer). A selected group clamps and does not wrap. Space and Enter on an unselected group still activate the focused option.
27. **Sticky clearance** — Page root is `pb-sticky-clearance`: `4.5rem` plus `env(safe-area-inset-bottom)`, zero from `64rem`. Do not restore a fixed `pb-[4.5rem] lg:pb-0`.
28. **JSON-LD date** — `generate-jsonld.mjs` keeps `WebPage.dateModified` when the graph without that field matches the previous block. Do not stamp UTC today on an unchanged graph.
