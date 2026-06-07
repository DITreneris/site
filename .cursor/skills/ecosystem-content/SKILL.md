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



## Copy rules



- Align with `primal_concept.txt`; do not invent new product areas

- **Kit, not OS** — static subdomain products are "prompt kit" or "playbook"; reserve "OS" for brand umbrella and hub training only

- **Count what you ship** — feature bullets must map to a product README fact (no API, multi-agent, or enterprise automation unless the repo has it)

- **Hub vs ecosystem** — 6-module training lives on `promptanatomy.app`; focused kits live on subdomains

- Stats (600+ templates, 60 tools, 100-term glossary, 30–50% routine) are **ecosystem-wide aggregates** — always pair with "across the ecosystem" context in UI; not one library on a single URL

- External URLs: `https://{domain}` for each subdomain

- Platform hub CTAs → `promptanatomy.app`; this marketing site → `promptanatomy.site`

### Product truth anchors (GitHub)

| ID | Repo | Ships |
|----|------|-------|
| app | inzinerija | 6 modules, 6-block method, 15 prompts, 31 tools |
| cloud | lead | First interactive lesson |
| info | automation | 8 org-analysis prompts |
| space | cmo | 10 marketing prompts |
| help | personalas | 10 HR prompts + PDFs |
| ceo | ceo | Prompt generator + 2 PDF playbooks |
| pro | leader | ~35 executive prompts, static kit |
| blog | (external) | Articles / knowledge hub |
| lol | ladder | Corporate Ladder Telegram mini-game |

