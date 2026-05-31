# Design System v1.5 → v2.0 Release Audit

**Product:** Prompt Anatomy ecosystem site (`promptanatomy.site`)  
**Scope:** Marketing MVP — design system delta audit (read-only)  
**Baseline:** v1.5 pre-release (`DESIGN_SYSTEM.md` §17 complete, declared 2026-05-30); mobile baseline (`MOBILE_UX_AUDIT.md`, 8.5/10)  
**Method:** Static code review + documentation delta vs §17 / MOBILE_UX_AUDIT; drift grep (`slate-*`, inline card recipes, `btn-ghost`, `text-[10px]`)

---

## 1. Executive Summary

### Proposed v2.0 definition

**Design System v2.0 (implementation maturity)** = public marketing release readiness: close remaining utility drift in MVP components, record a formal `verifier` pass, and declare implementation v2.0 — without visual redesign, new domains, or `components/ui/` unless explicitly approved post-release.

### Version clarity

| Label | Meaning | Status |
| ----- | ------- | ------ |
| **v1.5 pre-release** (implementation) | Documented, testable, agent-ready; §17 governance gate complete | **Achieved** 2026-05-30 |
| **Document version 2.0** (`DESIGN_SYSTEM.md` line 829) | Roadmap doc structure revision (§14–§18 canon) | **Achieved** — not the same as implementation v2.0 |
| **v2.0** (implementation — proposed) | Drift closed + verifier pass + optional dead-code cleanup | **Not yet declared** |

### Readiness scorecard

| Category | Score | Status | Notes |
| -------- | ----: | ------ | ----- |
| Token / utility coverage | 9/10 | Good | `index.css` closed set; Appendix D complete |
| Component consistency | 7/10 | Needs polish | 3 inline card/button recipes remain in `MaturityQuiz.tsx` |
| Mobile UX | 8.5/10 | Good | Baseline from MOBILE_UX_AUDIT — no new regressions found |
| Accessibility | 8/10 | Good | §13 baseline met; skip link, tabs, 44px targets |
| Content / US English | 8/10 | Good | Strong overall; minor CTA label inconsistency |
| Agent safety (§14) | 8/10 | Good | Guardrails exist; drift in quiz shell invites copy-paste errors |
| Documentation | 9/10 | Good | §16 canon complete; v2.0 declaration criteria not yet written |
| Release readiness | 7.5/10 | Needs polish | No recorded verifier pass; small utility drift |

**Overall readiness score: 8.1 / 10**

### What already works

- Navy/gold brand, phase accents, light shell + dark ecosystem band preserved
- Button hierarchy utilities (`btn-primary`, `btn-secondary`, `btn-secondary-dark`, `btn-tertiary-sm`) used consistently on Hero, ClosingCta, quiz CTAs
- `card-light` adopted in ProblemSolution, LayerSelector; `card-light-lg` on quiz result; `card-glass` on DomainDetail
- §17 checklist fully complete; mobile audit fixes landed; `text-[10px]`/`text-[11px]` drift eliminated (now `text-micro`/`text-caption`)
- `npm run qa:viewport` at six widths; §14 agent guardrails with allowed/forbidden examples

### What blocks v2.0 quality (delta only)

1. **Utility drift** — `MaturityQuiz.tsx` question shell and option buttons duplicate documented card/button recipes
2. **Dead utility** — `btn-ghost` defined but unused (documented gap since v1.5)
3. **No formal verifier record** — workflow exists; pass not documented for DS release
4. **Micro UX** — clipboard failure silent in Anatomizer; tab IA scroll friction (product, not DS blocker)

### Biggest release risks

| Risk | Impact | Mitigation |
| ---- | ------ | ---------- |
| Agents copy inline quiz recipes into new components | Medium | Replace with utilities before v2.0 declaration |
| Confusion between doc v2.0 and implementation v2.0 | Low | Declare implementation v2.0 only in DESIGN_SYSTEM.md §1/§19 with date |
| Tab IA buried below fold | Medium (conversion) | Product decision — anchor jump or sticky tab CTA (P2) |

### Top 5 most valuable improvements

1. Refactor `MaturityQuiz.tsx:57` question shell to `card-light-lg` (Low effort, high agent-safety impact)
2. Extract quiz option button pattern to `@utility` or document inline as sole exception (Low)
3. Remove or adopt `btn-ghost` — pick one (Low)
4. Run and record `verifier` agent pass; fix any P0 findings (Low–Medium)
5. Align Hero vs ClosingCta primary CTA labels (`Explore workflows` vs `Open the platform`) (Low, Content)

### v2.0 achievable without redesign?

**Yes.** Estimated **3–5 days** of focused frontend + QA work for P0/P1 items. No architectural change required.

---

## 2. OK / FAIL Analysis

| Area | Status | Delta vs §17 / MOBILE_UX_AUDIT | Reason | Priority |
| ---- | ------ | ------------------------------ | ------ | -------- |
| Brand consistency | OK | Already resolved | Navy/gold/phase accents via `ecosystemTheme.ts`; no snippet palette regression | — |
| Typography | OK | Already resolved | `section-heading`, `text-micro`, `text-caption` in use; no `text-[NNpx]` in TSX | — |
| Spacing | Needs polish | **New** | `MaturityQuiz.tsx:57` duplicates `card-light-lg` padding/radius inline | P1 |
| Components | Needs polish | **New** | Inline recipes at `MaturityQuiz.tsx:88`, `AnatomizerBuilder.tsx:67,103`, `DomainDetail.tsx:48` | P1 |
| Mobile UX | OK | Already resolved | MOBILE_UX_AUDIT 8.5/10; no new overflow/tap regressions in code review | — |
| Accessibility | OK | Already resolved | §13.4–§13.6 baseline; focus-ring, skip link, tab roles present | — |
| Content clarity | Needs polish | **New** | CTA label mismatch Hero:34 vs ClosingCta:25; otherwise strong | P2 |
| Release readiness | Needs polish | **New** | No verifier pass recorded; v2.0 declaration criteria undocumented | P1 |

---

## 3. What Should NOT Change

Align with `DESIGN_SYSTEM.md` §18:

| Preserve | Why |
| -------- | --- |
| Navy `#0b1320`, gold `#cfa73a`, four phase accents | Core brand; mapped in `ecosystemTheme.ts` |
| Page rhythm: Hero → Problem/Solution → Stats → tabs → ClosingCta → Footer | Proven IA; mobile audit validated |
| Three-tab ids (`ecosystem` \| `anatomizer` \| `maturity`) | Fixed in AGENTS.md; hash deep links depend on them |
| `card-glass` + `section-dark` ecosystem band | Distinct visual model vs light marketing shell |
| Anatomizer 5-block prompt format and `### BEGIN RESPONSE` trailer | Product contract; content-brand rule |
| Domain copy in `domains.ts` / `primal_concept.txt` | Strong, audience-aware; no rewrite unless product requests |
| MOBILE_UX_AUDIT fixes (SequencePath single-col, touch targets, Hero scale) | Regression risk if re-opened |
| Button grid quiz/Anatomizer (no native forms) | MVP-intentional per AGENTS.md |

---

## 4. What Breaks First

Repo-specific weak points (ordered by likelihood):

1. **Agent drift via nearest-file copy** — `MaturityQuiz.tsx:57–88` inline card/option styles are the clearest §14 violation risk (`DESIGN_SYSTEM.md` §19).
2. **Dead utility confusion** — `btn-ghost` in `index.css:133` with no TSX usage; agents may adopt it inconsistently.
3. **CTA vocabulary split** — Hero says "Explore workflows"; ClosingCta says "Open the platform"; both link to `promptanatomy.app` — minor trust friction for repeat scanners.
4. **Silent clipboard failure** — `AnatomizerBuilder.tsx:34–36` catch block resets `copied` with no user feedback.
5. **Tab discovery below fold** — MOBILE_UX_AUDIT conversion 7/10; users scroll past Hero/Problem/Stats before ecosystem (product IA, not token failure).
6. **Terminal chrome one-off** — `AnatomizerBuilder.tsx:67` dark panel is intentional but undocumented as allowed exception vs forbidden inline card.

---

## 5. Micro UI Polish Audit

### Typography — No delta

Heading scale, `text-micro`/`text-caption`, and mobile readability addressed in v1.5 + MOBILE_UX_AUDIT.

### Spacing — One finding

| Problem | Why it matters | Micro-fix | Priority | Effort |
| ------- | -------------- | --------- | -------- | ------ |
| `MaturityQuiz.tsx:57` uses inline `rounded-2xl border … p-6 sm:p-8` while result state uses `card-light-lg` | Inconsistent card padding ladder; agents may copy inline recipe | Replace outer div class with `card-light-lg space-y-6` | P1 | Low |

### Color and Contrast — No delta

Light-section `slate-*` usage is documented in utilities (`btn-secondary`, `card-light`, link utilities) and light components. Gold-on-light pairs covered in §13.4.

### Components

| Problem | File:line | Why it matters | Micro-fix | Priority | Effort |
| ------- | --------- | -------------- | --------- | -------- | ------ |
| Quiz option buttons inline recipe | `MaturityQuiz.tsx:88` | Duplicates hover-lift + border pattern outside `@utility` | Add `@utility quiz-option` or extend `hover-lift` doc with quiz pattern | P1 | Low |
| Terminal preview shell inline | `AnatomizerBuilder.tsx:67` | Dark chrome not `card-glass`; acceptable but undocumented | Document as allowed exception in DESIGN_SYSTEM.md §14.3 or add `card-terminal` utility | P2 | Low |
| Accent info box inline | `AnatomizerBuilder.tsx:103` | `rounded-xl border border-accent-muted-border bg-accent-muted-bg` — third light accent box recipe | Optional `@utility callout-accent` | P2 | Low |
| Domain external link inline | `DomainDetail.tsx:48` | Glass CTA on dark card; differs from `btn-secondary-dark-md` | Document as domain-card CTA exception or align to `btn-secondary-dark-md` sizing | P2 | Low |
| `btn-ghost` unused | `index.css:133` | Dead code; appendix lists it | Remove utility or use for tertiary text actions | P1 | Low |
| Tables, Modals, Tooltips, native Forms | — | **N/A** — not in MVP | — | — | — |

### Visual Hierarchy — No critical delta

Hero → Problem/Solution → Stats flow is clear. Tab panels require scroll — see §6.

---

## 6. Micro UX Polish Audit

| Issue | File:line | Current risk | Better UX | Suggested change | Priority | Effort |
| ----- | --------- | ------------ | --------- | ---------------- | -------- | ------ |
| Clipboard error silent | `AnatomizerBuilder.tsx:34–36` | User thinks copy worked | Visible error state | Brief `aria-live` message or button label "Copy failed" on catch | P2 | Low |
| Tab panels below fold | `App.tsx` / MOBILE_UX_AUDIT | Users may miss interactive demo | Earlier tab discovery | Optional sticky "Explore ecosystem" jump link in Hero (product) | P2 | Medium |
| Hero vs Closing CTA labels | `Hero.tsx:34`, `ClosingCta.tsx:25` | Same destination, different verbs | Consistent primary label | Pick one: "Explore workflows" or "Open the platform" | P2 | Low |
| Quiz progress clarity | `MaturityQuiz.tsx:59–75` | Clear | Keep | — | — | — |
| Copy success feedback | `AnatomizerBuilder.tsx:77–80` | 2s "Copied" state works | Keep | — | — | — |
| Header tab + mobile menu | `Header.tsx` | MOBILE_UX_AUDIT 8/10 | Keep | — | — | — |
| Quiz result pivot flow | `MaturityQuiz.tsx:147–152` | Clear tier → domain pivot | Keep | — | — | — |

---

## 7. Content and US English Audit

### Strong — keep

| Copy | Location | Why strong |
| ---- | -------- | ---------- |
| "Turn AI from a chat tool into a structured operating system" | `Hero.tsx:15–19` | Clear outcome; matches tagline hierarchy |
| "More output is not less work" | `ProblemSolution.tsx:21` | Concrete, non-hype problem frame |
| "Build a structured prompt, layer by layer" | `AnatomizerBuilder.tsx:44` | Specific product behavior |
| "AI operational maturity diagnostic" | `MaturityQuiz.tsx:49` | Enterprise-appropriate tone |
| "Ready to make AI a repeatable system?" | `ClosingCta.tsx:11–12` | Closes narrative arc |

### Light polish

| Current copy | Issue | Improved US English | Why better |
| ------------ | ----- | ------------------- | ---------- |
| Hero: "Explore workflows" / ClosingCta: "Open the platform" | Same URL, different primary verbs | Use one label site-wide (recommend **"Open the platform"** on both, or **"Explore workflows"** on both) | Reduces cognitive mismatch for users who scroll full page |
| `MaturityQuiz.tsx:51–52` "three questions" | Accurate (3 items in `maturityQuiz.ts`) | No change needed | — |

### Unclear / abstract — none critical

Domain descriptions in `domains.ts` are appropriately specific for B2B buyers.

### Non-native / buzzword — none flagged

Copy avoids generic "revolutionary AI" language; aligns with `content-brand.mdc`.

### Conversion weakeners — none P0

Tab IA scroll friction is structural (§6), not copy.

---

## 8. Design System Documentation Gaps

Compared to `DESIGN_SYSTEM.md` §16 canon — **gaps only**:

| Gap | Why it matters | What to document | Example rule |
| --- | -------------- | ---------------- | ------------ |
| v2.0 implementation declaration criteria | Prevents confusion with doc version 2.0 | New subsection in §19 | "Declare implementation v2.0 when: §17 complete + P0 drift closed + verifier pass recorded" |
| Anatomizer terminal chrome exception | Agents may flag as forbidden inline card | §14.3 FAQ entry | "Dark terminal preview in AnatomizerBuilder may use inline dark border stack; do not copy to light sections" |
| Quiz option button pattern | Drift source | §14.3 or new `@utility` | "Quiz options use `quiz-option` utility — not ad-hoc border stacks" |
| `btn-ghost` disposition | Dead utility in Appendix D | Remove from appendix or mark deprecated | "btn-ghost removed in v2.0 — use btn-tertiary-sm" |

No gaps in color tokens, typography scale, spacing, breakpoints, or §13 accessibility matrix.

---

## 9. v1.5 → v2.0 Roadmap

### P0 — Must Fix Before v2.0 Declaration

| Task | Area | Priority | Effort | Owner | Acceptance criteria |
| ---- | ---- | -------- | ------ | ----- | ------------------- |
| Record formal verifier pass | QA | P0 | Low | QA | `verifier` agent checklist run; findings logged; P0 items closed or waived in writing |
| Document v2.0 declaration criteria | Docs | P0 | Low | Product | `DESIGN_SYSTEM.md` §19 updated with implementation v2.0 definition + date field |

### P1 — Should Fix Before Public Marketing Push

| Task | Area | Priority | Effort | Owner | Acceptance criteria |
| ---- | ---- | -------- | ------ | ----- | ------------------- |
| Replace quiz question shell inline card with `card-light-lg` | Frontend | P1 | Low | Frontend | `MaturityQuiz.tsx:57` uses utility; `npm run build` passes |
| Resolve `btn-ghost` (remove or adopt) | Frontend | P1 | Low | Frontend | No unused utilities in Appendix D; `index.css` updated |
| Extract or document quiz option button pattern | Frontend | P1 | Low | Frontend | Pattern in `@utility` or §14.3 exception; no inline duplicate at `:88` |
| Run `npm run qa:viewport` after card refactor | QA | P1 | Low | QA | Six widths green |

### P2 — Nice Polish After v2.0 Declaration

| Task | Area | Priority | Effort | Owner | Acceptance criteria |
| ---- | ---- | -------- | ------ | ----- | ------------------- |
| Align Hero/ClosingCta primary CTA labels | Content | P2 | Low | Content | Single verb for `promptanatomy.app` links |
| Anatomizer clipboard error feedback | UX | P2 | Low | Frontend | Catch path shows user-visible message |
| Optional `components/ui/` thin wrappers | Frontend | P2 | Medium | Frontend | Product-approved; §14 updated |
| Document Anatomizer terminal + accent callout exceptions | Docs | P2 | Low | Design | §14.3 entries added |
| Sticky tab discovery / anchor CTA | Product | P2 | Medium | Product | A/B or qualitative test if pursued |

---

## 10. Release Checklist for Design System v2.0

Cross-reference `DESIGN_SYSTEM.md` §17 — only new or v2.0-specific items.

### Visual QA

- [x] Typography scale (`text-micro`, `text-caption`, `section-heading`) — v1.5
- [x] Button hierarchy utilities — v1.5
- [x] Card utilities (`card-light`, `card-light-lg`, `card-glass`) — v1.5
- [x] **Quiz question shell uses `card-light-lg` (no inline duplicate)**
- [x] **`btn-ghost` resolved** (removed in v2.0)

### UX QA

- [x] Mobile flow — MOBILE_UX_AUDIT production ready
- [x] Anatomizer copy flow — functional
- [x] Quiz result pivot — functional
- [x] **Primary CTA labels aligned across Hero and ClosingCta**
- [x] **Hero "Explore the ecosystem" jump link** (tab discovery)

### Content QA

- [x] US English baseline — strong
- [x] No conflicting domain messaging
- [x] **CTA verb consistency** — "Open the platform" site-wide for `.app` links

### Accessibility QA

- [x] Contrast matrix §13.4
- [x] Keyboard / focus / touch targets
- [x] Semantic headings and alt text on hero figure
- [x] Anatomizer copy failure uses `aria-live="polite"` feedback

### Documentation QA

- [x] Tokens and components documented — v1.5
- [x] Agent guardrails §14
- [x] **v2.0 implementation declaration criteria in §19**
- [x] **Verifier pass recorded** (see below)
- [x] **Version updated to implementation v2.0** (declared 2026-05-31)

### Verifier pass — 2026-05-31

Formal checklist per `.cursor/agents/verifier.md` + v2.0 delta checks.

| Section | Result | Notes |
| ------- | ------ | ----- |
| Landing shell | **Pass** | Hero, ProblemSolution, StatsStrip, ClosingCta, Footer render; Hero CTA "Open the platform"; ecosystem jump wired |
| Ecosystem tab | **Pass** | 8 domains, SequencePath, DomainDetail, cross-links |
| Prompt Builder tab | **Pass** | 5 selectors, copy success/error feedback, 5-block format |
| Team Assessment tab | **Pass** | `card-light-lg` question shell; `quiz-option` buttons; tier scoring; pivot + reset |
| Global | **Pass** | Tab nav, mobile layout, external URLs, skip link + ARIA tabs |
| Deploy assets | **Pass** (waived doc drift) | Live asset is `public/og_2.png`; canonical/OG on `promptanatomy.site`. Verifier agent still references legacy `og-image.png` — update verifier.md separately (non-blocking) |
| Build / viewport | **Pass** | `npm run build` and `npm run qa:viewport` green (six widths) |

**Overall: Pass** — implementation v2.0 declared.

---

## 11. Final Recommendation

### Proposed v2.0 definition (restated)

**Design System v2.0** = implementation maturity milestone marking public marketing readiness: utility drift closed in MVP components, formal verifier pass recorded, and declaration dated in `DESIGN_SYSTEM.md` — not a visual redesign.

### Is the design system ready for v2.0?

**Yes — Achieved.** Implementation v2.0 declared **2026-05-31**. P0, P1, and P2 items from this audit are closed. Readiness score post-implementation: **~9/10** (remaining optional work: `components/ui/` wrappers, verifier.md OG asset reference).

### What was fixed

1. Verifier pass recorded (§10 above)
2. v2.0 declaration criteria documented in DESIGN_SYSTEM.md §19
3. `MaturityQuiz.tsx:57` refactored to `card-light-lg`
4. `btn-ghost` removed; `quiz-option` utility added
5. Hero CTA aligned; ecosystem jump link added
6. Anatomizer clipboard error feedback added
7. §14.3 documented allowed inline exceptions (terminal, callout, DomainDetail link)

### Postponed (unchanged)

- `components/ui/` layer
- Anatomizer terminal utility extraction (`card-terminal`, `callout-accent`)
- Sticky tab discovery beyond Hero jump link

### Safest path to release

```
✅ P0 verifier + §19 criteria → P1 quiz card + btn-ghost → P2 polish → qa:viewport → v2.0 declared → ship
```

Do **not** run a visual redesign pass. Do **not** re-open MOBILE_UX_AUDIT items unless regression found.

### Estimated effort (actual)

**~1 focused session** for P0 + P1 + P2 code and docs. Audit estimate of 3–5 days included buffer; core drift closure was low effort as predicted.

---

*Audit generated per `second.txt` prompt v1.0.0. Implementation closed 2026-05-31.*
