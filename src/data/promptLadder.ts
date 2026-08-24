export interface PromptLadderSurface {
  id: 'enter' | 'demo' | 'course';
  eyebrow: string;
  title: string;
  job: string;
  model: string;
  ctaLabel: string;
  action: 'lesson' | 'demo' | 'course';
}

export const PROMPT_LADDER_SURFACES: PromptLadderSurface[] = [
  {
    id: 'enter',
    eyebrow: 'Enter — promptanatomy.cloud',
    title: 'First lesson',
    job: 'Learn the enter frame before you scale templates.',
    model: 'Role, Context, Reasoning, Output, Quality control',
    ctaLabel: 'Start the free lesson',
    action: 'lesson',
  },
  {
    id: 'demo',
    eyebrow: 'Demo — this site',
    title: 'Discover and assemble',
    job: 'Build a structured prompt layer by layer.',
    model: 'System Role, Business Context, Dynamic Variables, Instructions, Output Constraints',
    ctaLabel: 'Try the prompt builder',
    action: 'demo',
  },
  {
    id: 'course',
    eyebrow: 'Course — promptanatomy.app',
    title: 'Write and drill',
    job: 'Train the full 6-block system on the hub.',
    model: 'META, INPUT, OUTPUT, REASONING, QUALITY, ADVANCED',
    ctaLabel: 'Open the course',
    action: 'course',
  },
];

export const METHOD_START_PATHS = [
  { id: 'lesson', label: 'Start the free lesson', action: 'lesson' as const },
  { id: 'course', label: 'Open the course (Starter or Core)', action: 'course' as const },
  { id: 'exec', label: 'Open the executive kit', action: 'exec' as const },
];

export const METHOD_CATEGORY_LINE =
  'Prompt Anatomy is methodology training plus role kits — not a prompt-ops vault.';

export const METHOD_PRICING_LINE =
  'Plans and checkout live on promptanatomy.app. This page does not list prices.';
