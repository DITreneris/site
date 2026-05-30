import type { QuizQuestion, QuizResult } from '../types';

export const MATURITY_QUIZ: QuizQuestion[] = [
  {
    question: 'How does your team currently utilize generative AI models?',
    options: [
      { text: 'Ad-hoc basis: Random individuals write single-sentence conversational prompts.', score: 1 },
      { text: 'Scattered libraries: A few copy-paste prompt documents live locally in text files.', score: 2 },
      { text: 'Basic custom tools: Some departments share custom bots, but workflows are unstandardized.', score: 3 },
      { text: 'Unified ecosystem: Standard system roles, templates, and API integrations guide operations.', score: 4 },
    ],
  },
  {
    question: 'How are prompt parameters and instructions managed for daily tasks?',
    options: [
      { text: 'No system guidelines: Staff asks models questions as they would ask a coworker.', score: 1 },
      { text: 'Implicit guidelines: Basic instructions are typed manually, frequently requiring re-writes.', score: 2 },
      { text: 'Anatomical standard: Prompts explicitly define Role, Context, Variables, and Constraints.', score: 3 },
      { text: 'Fully automated pipeline: Prompts are managed as code elements, tested, and tracked.', score: 4 },
    ],
  },
  {
    question: 'What does AI training and onboarding look like inside your organization?',
    options: [
      { text: 'None: Employees are entirely self-taught.', score: 1 },
      { text: 'Passive assets: A basic instruction sheet or recorded video tutorial is provided.', score: 2 },
      { text: 'Active onboarding: Structured courses are assigned relative to specific roles.', score: 3 },
      { text: 'Continuous excellence: Standard structured playbooks are updated and certified weekly.', score: 4 },
    ],
  },
];

export const MAX_QUIZ_SCORE = MATURITY_QUIZ.length * 4;

export function calculateQuizResult(score: number): QuizResult {
  if (score <= 5) {
    return {
      score,
      maxScore: MAX_QUIZ_SCORE,
      title: 'Unstructured Ad-Hoc (Tier 1)',
      description:
        'Your organization uses AI primarily as an isolated conversational playground. This leads to high cognitive variance, security hazards, and zero repeatable leverage.',
      recommendedId: 'cloud',
    };
  }
  if (score <= 9) {
    return {
      score,
      maxScore: MAX_QUIZ_SCORE,
      title: 'Fragmented Adoption (Tier 2)',
      description:
        'Standardized prompt concepts exist, but templates are localized and uncentralized. Some speed gains occur but standard workflows remain disconnected.',
      recommendedId: 'info',
    };
  }
  return {
    score,
    maxScore: MAX_QUIZ_SCORE,
    title: 'Structured AI OS Ready (Tier 3)',
    description:
      'You understand that strict parameters beat casual chat boxes. You are prepared to integrate fully scaled enterprise configurations and strategic frameworks.',
    recommendedId: 'pro',
  };
}
