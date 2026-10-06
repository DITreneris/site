---

name: ecosystem-content

description: Reference for Prompt Anatomy nine-domain ecosystem structure, IDs, audiences, and messaging. Use when adding or editing domain content, navigation labels, or cross-domain links.

---



# Ecosystem Content Skill



## When to use



- Adding/editing domain cards or detail panels

- Writing CTAs that reference ecosystem stages

- Ensuring copy matches brand narrative



## Canonical domain map



Read `primal_concept.txt` for full narratives. Quick reference:



| ID | Domain | Stage | Phase |

|----|--------|-------|-------|

| `app` | promptanatomy.app | Core | Hub |

| `cloud` | promptanatomy.cloud | 1. Enter | Adopt |

| `info` | promptanatomy.info | 2. Use | Adopt |

| `space` | promptanatomy.space | 3. Create | Apply |

| `help` | promptanatomy.help | 4. Hire | Apply |

| `ceo` | promptanatomy.ceo | 5. Manage | Scale |

| `pro` | promptanatomy.pro | 6. Decide | Scale |

| `blog` | promptanatomy.blog | 7. Deepen | Knowledge |
| `lol` | promptanatomy.lol | 8. Play | Knowledge |



## Deployment sequence (non-core pipeline)



```

cloud → info → space → help → ceo → pro → blog → lol

```



Core hub (`app`) sits outside the linear pipeline but links to all modules.



## Data shape (TypeScript)



Domain objects in `src/data/domains.ts` match `src/types/index.ts`:



```typescript

{

  id: string;

  domain: string;

  title: string;

  role: string;

  description: string;

  audience: string;

  icon: LucideIcon;

  isCore: boolean;

  features: string[];

  phase: EcosystemPhase;       // Hub | Adopt | Apply | Scale | Knowledge

  transition: string;          // "next in journey" copy

  maturityTier?: string;       // tied to quiz tiers where applicable

}

```



Phase accent colors come from `src/data/ecosystemTheme.ts` — do not add per-domain rainbow gradients.

**Phase UI label:** `phaseLabelFor('Knowledge')` → **Deepen** (internal id stays `Knowledge`). Never show “Learn” as the phase badge.



## Copy rules



- Align with `primal_concept.txt`; do not invent new product areas

- **Kit, not OS** — static subdomain products are "prompt kit" or "playbook". The hub product is an AI Training System. This discovery site’s title names the visit (ecosystem for teams). Do not put “operating system” in the `.site` title, badge, h1, or the founder FAQ answer. The Tier 3 label Structured AI OS Ready stays.

- **Count what you ship** — feature bullets must map to a product README fact (no API, multi-agent, or enterprise automation unless the repo has it)

- **Hub vs ecosystem** — 6-module training lives on `promptanatomy.app`; focused kits live on subdomains

- Stats (600+ templates, 60 tools, 100-term glossary, 30–50% routine) are **ecosystem-wide aggregates** — always pair with "across the ecosystem" context in UI; not one library on a single URL

- External URLs: `https://{domain}` for each subdomain

- Platform hub CTAs → `platformHref(medium)` in `siteContact.ts` (gateway UTM). Lesson → `lessonHref`; exec kit → `execKitHref`. This marketing site → `promptanatomy.site`. **No EUR amounts on `.site`.**
- Three prompt models: enter-5 (`.cloud`) / demo-5 (Anatomizer) / course-6 (META → ADVANCED on `.app`). Comparison UI: `#method` (`promptLadder.ts`).

- Footer labels follow kit roles (e.g. `Use — organization kit`, `Decide — executive kit`) — not “daily automation” / “scaling”

- DomainDetail feature list heading: **What's included**

- After domain/FAQ/quiz-source edits that feed generators, run `npm run generate:llms` and/or `npm run generate:jsonld`

- Read [`.cursor/LESSONS.md`](../LESSONS.md) before large copy passes

### Product truth anchors (GitHub)

| ID | Repo | Ships |
|----|------|-------|
| app | inzinerija | Starter (1–3) / Core (1–6) / Pilot; 6-block META→ADVANCED; 500+ library |
| cloud | lead | 15-slide lesson (EN+LT), Quick Send Check, PDF |
| info | automation | 8 org-analysis prompts |
| space | cmo | 10 marketing prompts |
| help | personalas | 10 HR prompts + PDFs |
| ceo | ceo | Prompt generator + 2 PDF playbooks |
| pro | leader | ~35 executive prompts, static kit |
| blog | (external) | Articles / knowledge hub |
| lol | ladder | Corporate Ladder Telegram mini-game |

