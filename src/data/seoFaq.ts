/** Curated Q&A — visible on-page (FaqSection) and emitted as FAQPage JSON-LD + llms-full. */

export interface SeoFaqItem {
  question: string;
  answer: string;
}

export const SEO_FAQ: SeoFaqItem[] = [
  {
    question: 'What is Prompt Anatomy?',
    answer:
      'Prompt Anatomy is an AI Operating System for modern teams — 6-module interactive training on the 6-block methodology, plus an ecosystem of focused prompt kits for onboarding, operations, marketing, HR, leadership, and executive workflows.',
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
      'Prompt Anatomy was founded by Tomas Staniulis, a published author on organizational systems and structured workflows. He builds AI operating systems for modern teams — connecting Enter, Use, Create, Hire, Manage, Decide, Deepen, and Play across the Prompt Anatomy ecosystem. Full founder bio: https://www.promptanatomy.blog/about/',
  },
  {
    question: 'What is structured prompting and the Anatomizer?',
    answer:
      'Structured prompting uses five layers in the site demo: System Role, Business Context, Dynamic Variables, Instructions, and Output Constraints. The Anatomizer on promptanatomy.site includes a fix-a-weak-prompt practice plus layer-by-layer assembly. The full course at promptanatomy.app teaches the complete 6-block system.',
  },
  {
    question: 'What does the Team Assessment measure?',
    answer:
      'The 60-second Team Assessment scores AI operational maturity across three tiers: Unstructured Ad-Hoc (Tier 1), Fragmented Adoption (Tier 2), and Structured AI OS Ready (Tier 3), with a recommended ecosystem domain for your next step.',
  },
  {
    question: 'Where is the main platform?',
    answer:
      'The 6-module training hub lives at https://promptanatomy.app/ (6-block methodology, certificates, tool catalog). Aggregate template and tool counts span training plus subdomain kits — not one library on a single URL. The marketing site at https://promptanatomy.site/ showcases the ecosystem, Anatomizer, and maturity assessment.',
  },
];
