# Max-ROI TODO

**Purpose:** Smallest set of tasks with the highest impact on **ecosystem clarity** and **traffic to promptanatomy.app**.  
**Source:** [ROADMAP.md](ROADMAP.md) Phase A–B (do these first; park the rest).  
**Rule:** If a task does not improve outbound `.app` / kit clicks or make the map clearer — do not start it.

**Last updated:** 2026-07-30

---

## Do now (highest ROI)

Ordered. Finish 1 before expanding scope on 4+.

| # | Task | Why ROI is high | Effort | Done when |
|---|------|-----------------|--------|-----------|
| **1** | **Quiz result → `.app` CTA** | Result today opens kit + pivots on-site only — no platform CTA at peak intent (`MaturityQuiz.tsx`) | S | Result shows primary/secondary: recommended kit **and** “Open the platform” (`PLATFORM_URL`) |
| **2** | **Anatomizer post-copy / post-practice → `.app`** | Copy success is the aha; no bridge to 6-block course (`AnatomizerBuilder`, `CorrectPromptPractice`) | S | After copy (and after practice success): clear CTA to `.app` + one line on 5-layer demo vs 6-block course |
| **3** | **DomainDetail dual CTA** | Ecosystem explorers leave via kit only; hub under-sold (`DomainDetail.tsx`) | S | Kit primary link + secondary “Start training” / Open the platform (hub domain may keep single primary) |
| **4** | **Outbound click events** | Without events, ROI of 1–3 is invisible | S–M | Track (at least): `.app` click, kit click, quiz complete, Anatomizer copy — Vercel Analytics custom events or equivalent |
| **5** | **Clipboard copy failure feedback** | Silent fail wastes demo trust (`AnatomizerBuilder`) | XS | Visible `aria-live` / button state on catch |
| **6** | **Tab discovery check** | Hero already has “Explore the ecosystem”; verify mobile still reaches tabs without extra chrome | XS | Note pass/fail; only add UI if fail (keep hero budget) |

---

## Do next (still high ROI, after 1–4)

| # | Task | Why | Effort | Done when |
|---|------|-----|--------|-----------|
| **7** | **Role chips → preselect domain** | Cuts nine-domain overwhelm; routes ops/marketing/HR/exec faster | M | 3–4 role entry points set `selectedDomain` + open ecosystem tab |
| **8** | **Domain-flavored Anatomizer presets** | Ties Builder to kits; feeds `.app` story without new domains | M | ≥1 preset set mapped to Create / Hire / Manage (or similar) + copy stays kit-truthful |
| **9** | **On-page FAQ → FAQPage** | Capsules already in `seoFaq.ts`; unlocks schema + search/GEO demand | M | FAQ visible on-page; FAQPage in JSON-LD; `generate:llms` / `generate:jsonld` run |
| **10** | **Cross-surface truth pass** | Bad claims kill conversion after click | S | `domains.ts`, footer, FAQ, `llms.txt`, Product JSON-LD aligned with `primal_concept.txt` / `LESSONS.md` |

---

## Explicitly not TODO (low ROI vs north star)

Do not pull these into the active list until 1–4 ship and show movement:

- [ ] Design-system package for other repos  
- [ ] Open / embeddable Anatomizer  
- [ ] i18n  
- [ ] Auth / CMS / payments on `.site`  
- [ ] Shareable quiz reports / email capture (optional later; must not gate `.app`)  
- [ ] Full comparison site or second blog on `.site`  
- [ ] `components/ui/` wrappers for their own sake  
- [ ] Visual redesign / new brand palette  

---

## Execution checklist (per task)

```
[ ] Smallest diff that hits “Done when”
[ ] npm run build
[ ] Layout change? → npm run qa:viewport
[ ] CHANGELOG [Unreleased]
[ ] verifier (feature work)
```

Agents: `ui-builder` (UI/CTA), `content-editor` (copy), `seo-specialist` (FAQ/schema), `changelog-keeper`, `verifier`.

---

## Progress

| # | Status | Notes |
|---|--------|-------|
| 1 | done | 2026-07-30 — primary `.app`, secondary kit, pivot link |
| 2 | done | 2026-07-30 — latch-after-copy bridge + practice `.app` CTA |
| 3 | done | 2026-07-30 — Start training on non-hub domains |
| 4 | done | 2026-07-30 — `trackEvent` + Hero/Closing/Footer/demos |
| 5 | done | 2026-07-30 — already shipped (Copy failed / aria-live); verified in code |
| 6 | done | 2026-07-30 — pass (Hero jump + `qa:viewport`); no extra UI |
| 7 | done | 2026-07-30 — Ops/Marketing/HR/Exec chips on EcosystemMap |
| 8 | done | 2026-07-30 — Manage/Create/Hire scenarios in Anatomizer |
| 9 | done | 2026-07-30 — FaqSection + FAQPage in JSON-LD |
| 10 | done | 2026-07-30 — LESSONS FAQ rule updated; footer/kit labels aligned |

Mark `done` / `waived` with date in Notes when closed.
