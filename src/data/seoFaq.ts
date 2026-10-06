/** Curated Q&A — visible on-page (FaqSection) and emitted as FAQPage JSON-LD + llms-full. */

export interface SeoFaqItem {
  question: string;
  answer: string;
}

export const SEO_FAQ: SeoFaqItem[] = [
  {
    question: 'What is Prompt Anatomy?',
    answer:
      'Prompt Anatomy on promptanatomy.site is the ecosystem map for teams: nine domains, a prompt builder, and a 60-second assessment. Training on the 6-block methodology lives at promptanatomy.app.',
  },
  {
    question: 'Who is Prompt Anatomy for?',
    answer:
      'Prompt Anatomy is built for CEOs, COOs, IT leaders, managers, and operational teams who want structured AI workflows — from a free first lesson through the full training course and role-specific prompt kits.',
  },
  {
    question: 'What is the Prompt Anatomy ecosystem?',
    answer:
      'Nine interconnected domains: one core hub at promptanatomy.app (6-module training); six role kits — Enter (promptanatomy.cloud, first lesson), Use (promptanatomy.info, 8 org prompts), Create (promptanatomy.space, 10 marketing prompts), Hire (promptanatomy.help, 10 HR prompts), Manage (promptanatomy.ceo, CEO generator + playbooks), Decide (promptanatomy.pro, executive prompt kit); plus Deepen (promptanatomy.blog, knowledge hub) and Play (promptanatomy.lol, Corporate Ladder game).',
  },
  {
    question: 'Who founded Prompt Anatomy?',
    answer:
      'Prompt Anatomy was founded by Tomas Staniulis, a published author on organizational systems and structured workflows. He connects Enter, Use, Create, Hire, Manage, Decide, Deepen, and Play into one ecosystem for teams. Full founder bio: https://www.promptanatomy.blog/about/',
  },
  {
    question: 'What is structured prompting and the Anatomizer?',
    answer:
      'Three models, one brand. The free lesson on promptanatomy.cloud uses a five-part enter frame: Role, Context, Reasoning, Output, Quality control. The Anatomizer on promptanatomy.site is a five-layer demo: System Role, Business Context, Dynamic Variables, Instructions, and Output Constraints. The course at promptanatomy.app teaches the complete 6-block system: META, INPUT, OUTPUT, REASONING, QUALITY, ADVANCED.',
  },
  {
    question: 'What is the 6-block system?',
    answer:
      'The 6-block system is the course methodology on promptanatomy.app: META, INPUT, OUTPUT, REASONING, QUALITY, and ADVANCED. The site demo uses five layers so visitors can assemble a prompt; the free lesson on promptanatomy.cloud teaches a five-part enter frame. The comparison lives at https://promptanatomy.site/#method.',
  },
  {
    question: 'What is the difference between the lesson, a kit, and the course?',
    answer:
      'The lesson at promptanatomy.cloud is the free first step (15-slide enter frame, no account). Role kits on the subdomain stages are copy-ready workflows for a job (operations, marketing, HR, leadership, executive). The course at promptanatomy.app is Starter (modules 1–3) or Core (full 1–6), plus Team Pilot for cohorts. Plans and checkout live on the hub; this marketing site does not list prices.',
  },
  {
    question: 'What does the Team Assessment measure?',
    answer:
      'The 60-second Team Assessment scores AI operational maturity across three tiers: Unstructured Ad-Hoc (Tier 1), Fragmented Adoption (Tier 2), and Structured AI OS Ready (Tier 3), with a recommended ecosystem domain. The next step is training or the recommended kit — not a prompt vault.',
  },
  {
    question: 'Is Prompt Anatomy a prompt management platform?',
    answer:
      'No. Prompt Anatomy is methodology training plus role kits — not a prompt-ops vault with versioning and approval workflows. The hub teaches the 6-block system; the ecosystem routes teams to a first lesson, a kit, or the course.',
  },
  {
    question: 'Where is the main platform?',
    answer:
      'The 6-module training hub lives at https://promptanatomy.app/ (6-block methodology, Starter or Core plans, Team Pilot, 500+ prompt library, certificate on passing score). Aggregate template and tool counts span training plus subdomain kits — not one library on a single URL. The marketing site at https://promptanatomy.site/ showcases the ecosystem, Anatomizer, method map, and maturity assessment.',
  },
];
