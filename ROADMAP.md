# Prompt Anatomy Site — Roadmap

**Product:** [promptanatomy.site](https://promptanatomy.site) (marketing / demo gateway)  
**Horizon:** 2026-07-30 → **2027-01-01**  
**Status:** Living plan — revise after each milestone review  
**Related:** [AGENTS.md](AGENTS.md) · [primal_concept.txt](primal_concept.txt) · [DOCS_INDEX.md](DOCS_INDEX.md) · [TODO.md](TODO.md) (max-ROI queue)

---

## 1. North star

This repo is a **gateway**, not the product.

| Priority | Outcome |
|----------|---------|
| **1. Ecosystem clarity** | Visitors understand Enter → Use → Create → Hire → Manage → Decide → Deepen → Play and can reach the right kit or hub. |
| **2. Platform traffic** | Qualified visitors land on [promptanatomy.app](https://promptanatomy.app) — the 6-module training hub and primary commercial CTA. |

**Decision rule for every feature:** Does this make the ecosystem clearer, or move more qualified people to `.app` (or the correct kit when that is the better next step)? If neither — skip.

**Default outbound:** `.app` via `PLATFORM_URL`. **Exception:** role-ready visitors may go straight to a kit (e.g. Hire → `.help`) while `.app` stays available as the hub.

---

## 2. What we will not chase before 2027-01-01

Unless product explicitly reopens scope:

- Auth, CMS, payments, or a backend on `.site`
- Shared design-system package across all ecosystem domains
- Open / embeddable Anatomizer for third parties
- Full i18n
- Heavy multi-page content system that competes with `.blog`
- Keeping users *on* `.site` as if it were the training product

MVP scope remains: marketing shell + three interactive surfaces (Ecosystem, Prompt Builder, Team Assessment).

---

## 3. Success measures (by 2027-01-01)

Track in Vercel Analytics (and any event layer added in Phase A). Targets are directional — adjust after baseline month.

| Signal | Intent |
|--------|--------|
| Outbound clicks to `promptanatomy.app` | Primary conversion |
| Outbound clicks to kit domains (`.cloud` … `.lol`) | Ecosystem routing health |
| Completions: Anatomizer copy / CorrectPromptPractice / maturity quiz | Demo engagement |
| Tab discovery (ecosystem / anatomizer / maturity opens) | IA health |
| Organic / AI-crawler discovery (GSC, `llms.txt` freshness) | Top-of-funnel |

Qualitative gate: domain copy and CTAs stay truth-aligned with [primal_concept.txt](primal_concept.txt) and [.cursor/LESSONS.md](.cursor/LESSONS.md) — no legacy nicknames or overclaims.

---

## 4. Phased plan

### Phase A — Conversion foundation  
**When:** 2026-08 → 2026-09  
**Theme:** Make interactive demos feed `.app` and surface the three tabs earlier.

| Workstream | Deliverables | Owner cue |
|------------|--------------|-----------|
| **A1. Anatomizer → platform bridge** | Clear “5-layer demo → 6-block course” path; stronger post-copy / post-practice CTA to `.app`; optional domain-flavored presets that map to kits without inventing new domains | `ui-builder` + `content-editor` (`anatomizer-prompt`) |
| **A2. Assessment close** | Quiz result always offers (1) recommended kit/domain pivot and (2) primary `.app` CTA; keep Tier 3 claims soft (executive kit / training — not “fully scaled enterprise”) | `content-editor` |
| **A3. Tab discovery** | Reduce “tabs below fold” friction (Hero jump already exists — strengthen sticky/scroll cues if needed; keep first viewport disciplined) | `ui-builder` |
| **A4. Instrumentation** | Event taxonomy for: tab opens, Anatomizer copy, practice complete, quiz complete, outbound `.app`, outbound kit | Product + light analytics |
| **A5. Hygiene** | Clipboard failure feedback; CTA label consistency for platform links; `verifier` pass after layout changes | `ui-builder` + `verifier` |

**Phase A exit:** A visitor who finishes Builder or Assessment has an obvious, honest next click to `.app` or the recommended kit; outbound events are measurable.

---

### Phase B — Ecosystem routing excellence  
**When:** 2026-10 → 2026-11  
**Theme:** Domain map sells the *next click*, not only the explanation.

| Workstream | Deliverables | Owner cue |
|------------|--------------|-----------|
| **B1. DomainDetail conversion** | Kit-truth bullets, audience match, dual CTA pattern: primary kit URL + secondary “Start training on `.app`” where appropriate | `content-editor` + `ui-builder` |
| **B2. Role-based entry** | Lightweight paths (e.g. ops / marketing / HR / exec) that preselect a domain and preset without new ecosystem stages | `content-editor` + `ui-builder` |
| **B3. Kit truth sync** | Counts, feature lines, and labels stay synced with live kits (`domains.ts`, footer, FAQ capsules, `llms.txt`, JSON-LD) | `content-editor` + `seo-specialist` |
| **B4. SequencePath clarity** | Phase labels and transitions reinforce Enter→…→Play and hub role of `.app` | `content-editor` |

**Phase B exit:** A role-identified visitor can reach the right kit in few clicks; hub CTA never disappears; copy passes a truth audit against `primal_concept.txt`.

---

### Phase C — Demand capture for the gateway  
**When:** 2026-12 → **2027-01-01**  
**Theme:** Attract and qualify traffic that the gateway can route.

| Workstream | Deliverables | Owner cue |
|------------|--------------|-----------|
| **C1. Visible FAQ** | **Done 2026-07-30** — on-page FaqSection + FAQPage JSON-LD from `seoFaq.ts` | `seo-specialist` + `content-editor` |
| **C2. Intent surfaces** | Thin SEO/GEO sections or hash-landable copy for maturity assessment, structured prompting, kit-vs-chat — no CMS sprawl | `seo-specialist` |
| **C3. Crawler freshness** | Keep `llms.txt` / `llms-full` / sitemap / `@graph` current after every content milestone | `seo-specialist` |
| **C4. Optional lead assist** | Only if Phase A–B conversion is healthy: shareable quiz summary or mailto/lightweight capture that does **not** gate “Open the platform” | Product decision |
| **C5. Year-end review** | Score Phase A–C against §3 measures; freeze or rewrite the next roadmap past 2027-01-01 | Product |

**Phase C exit:** FAQ/schema live; crawler assets current; decision recorded on lead capture; roadmap review dated ≤ 2027-01-01.

---

## 5. Milestone calendar

| Date | Checkpoint |
|------|------------|
| **2026-09-30** | Phase A exit criteria met or explicitly waived in writing |
| **2026-11-30** | Phase B exit criteria met or waived |
| **2026-12-15** | FAQ on-page + FAQPage — **completed early 2026-07-30** |
| **2027-01-01** | Horizon close — metrics review + next-horizon plan |

---

## 6. Working agreements

1. Prefer **smallest diff** that improves clarity or outbound conversion.
2. Follow agent workflow: change → `npm run build` → layout → `npm run qa:viewport` → changelog → `verifier`.
3. Cross-surface naming: update `domains.ts`, footer, FAQ, `llms.txt`, and Product JSON-LD together (see `.cursor/LESSONS.md`).
4. Canonical/OG/sitemap stay on `promptanatomy.site`; Organization / platform CTAs stay on `promptanatomy.app`.
5. Record user-visible work under `CHANGELOG.md` → `[Unreleased]`.

---

## 7. Backlog (parked after 2027-01-01 unless pulled forward)

Ordered by fit to north star — not commitments:

1. Shareable assessment report (B2B sales assist) with privacy review  
2. Deeper kit preview embeds (still static-first)  
3. Lightweight comparison / case snippets that link out to `.app` and kits  
4. Experimentation on CTA order (only with instrumentation from A4)  
5. Design-token package for other repos  
6. Open Anatomizer embed  
7. Multi-language EU shell  

---

## 8. Document maintenance

| When | Action |
|------|--------|
| Phase exit | Update §4 checkboxes / notes; add a short “Done” line under the phase |
| Product priority change | Revise §1 and re-order phases before adding features |
| New major doc/agent/skill | Register in [DOCS_INDEX.md](DOCS_INDEX.md) |

*Last updated: 2026-07-30*
