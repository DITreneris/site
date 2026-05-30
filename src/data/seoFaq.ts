/** FAQ copy for JSON-LD — keep index.html FAQPage in sync. Not rendered in visible UI. */

export interface SeoFaqItem {
  question: string;
  answer: string;
}

export const SEO_FAQ: SeoFaqItem[] = [
  {
    question: 'What is Prompt Anatomy?',
    answer:
      'Prompt Anatomy is an AI Operating System for modern teams. It helps organizations move from random prompting to structured, repeatable AI workflows across learning, daily work, automation, marketing, HR, operations, and executive decision-making.',
  },
  {
    question: 'Who is Prompt Anatomy for?',
    answer:
      'Prompt Anatomy is built for CEOs, COOs, IT leaders, managers, and operational teams who want to implement AI in a structured way — from onboarding beginners to executives scaling enterprise workflows.',
  },
  {
    question: 'What is the 8-domain ecosystem?',
    answer:
      'The ecosystem spans eight domains in order: Enter (promptanatomy.cloud), Use (promptanatomy.info), Upgrade (promptanatomy.space), Recruit (promptanatomy.help), Manage (promptanatomy.ceo), Decide (promptanatomy.pro), and Learn (promptanatomy.blog), with the central platform at promptanatomy.app.',
  },
  {
    question: 'What is structured prompting and the Anatomizer?',
    answer:
      'Structured prompting uses five layers: System Role, Business Context, Dynamic Variables, Instructions, and Output Constraints. The Anatomizer on promptanatomy.site lets teams assemble prompts layer by layer for repeatable, cost-efficient execution.',
  },
  {
    question: 'What does the Team Assessment measure?',
    answer:
      'The 60-second Team Assessment scores AI operational maturity across three tiers: Unstructured Ad-Hoc (Tier 1), Fragmented Adoption (Tier 2), and Structured AI OS Ready (Tier 3), with a recommended ecosystem domain for your next step.',
  },
  {
    question: 'Where is the main platform?',
    answer:
      'The central AI operating system lives at https://promptanatomy.app/, with structured templates, workflows, and frameworks. The marketing and demo site at https://promptanatomy.site/ showcases the ecosystem, Anatomizer, and maturity assessment.',
  },
];
