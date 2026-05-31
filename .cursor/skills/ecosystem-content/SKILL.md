---

name: ecosystem-content

description: Reference for Prompt Anatomy 8-domain ecosystem structure, IDs, audiences, and messaging. Use when adding or editing domain content, navigation labels, or cross-domain links.

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

| `blog` | promptanatomy.blog | 7. Learn | Knowledge |



## Deployment sequence (non-core pipeline)



```

cloud → info → space → help → ceo → pro → blog

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

- Stats (600+ templates, 60 tools, etc.) are marketing references — keep consistent site-wide

- External URLs: `https://{domain}` for each subdomain

- Platform hub CTAs → `promptanatomy.app`; this marketing site → `promptanatomy.site`

