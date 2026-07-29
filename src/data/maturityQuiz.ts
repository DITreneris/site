import type { QuizQuestion, QuizResult } from '../types';

export const MATURITY_QUIZ: QuizQuestion[] = [
  {
    question: 'How does your team currently utilize generative AI models?',
    options: [
      {
        text: 'Ad-hoc basis: Random individuals write single-sentence conversational prompts.',
        score: 1,
        diagnostic:
          'If this matches you: start with a shared role + context standard before adding more tools.',
      },
      {
        text: 'Scattered libraries: A few copy-paste prompt documents live locally in text files.',
        score: 2,
        diagnostic:
          'Local files help individuals, but teams still rework the same prompts — centralize the pattern next.',
      },
      {
        text: 'Basic custom tools: Some departments share custom bots, but workflows are unstandardized.',
        score: 3,
        diagnostic:
          'Strong here on tooling; the gap is consistent structure across departments, not more bots.',
      },
      {
        text: 'Unified ecosystem: Standard roles, templates, and integrated workflows guide operations across teams.',
        score: 4,
        diagnostic:
          'Strong here: you already treat prompts as shared operating assets, not private chat habits.',
      },
    ],
  },
  {
    question: 'How are prompt parameters and instructions managed for daily tasks?',
    options: [
      {
        text: 'No system guidelines: Staff asks models questions as they would ask a coworker.',
        score: 1,
        diagnostic:
          'If you confused chat with instructions: define Role, Context, Variables, Instructions, and Constraints explicitly.',
      },
      {
        text: 'Implicit guidelines: Basic instructions are typed manually, frequently requiring re-writes.',
        score: 2,
        diagnostic:
          'Rewrites signal missing constraints — lock format and variables so quality stops depending on memory.',
      },
      {
        text: 'Anatomical standard: Prompts explicitly define Role, Context, Variables, Instructions, and Constraints.',
        score: 3,
        diagnostic:
          'Strong here on structure; next step is reuse and governance so the standard survives handoffs.',
      },
      {
        text: 'Fully automated pipeline: Prompts are managed as code elements, tested, and tracked.',
        score: 4,
        diagnostic:
          'Strong here: prompt parameters are treated as controlled assets, not disposable sentences.',
      },
    ],
  },
  {
    question: 'What does AI training and onboarding look like inside your organization?',
    options: [
      {
        text: 'None: Employees are entirely self-taught.',
        score: 1,
        diagnostic:
          'If this matches you: a short structured first lesson beats another ad-hoc tip sheet.',
      },
      {
        text: 'Passive assets: A basic instruction sheet or recorded video tutorial is provided.',
        score: 2,
        diagnostic:
          'Passive assets create awareness, not habit — pair them with role-based practice next.',
      },
      {
        text: 'Active onboarding: Structured courses are assigned relative to specific roles.',
        score: 3,
        diagnostic:
          'Strong here on training; keep playbooks current so certification matches real workflows.',
      },
      {
        text: 'Continuous excellence: Standard structured playbooks are updated and certified weekly.',
        score: 4,
        diagnostic:
          'Strong here: onboarding already reinforces structured execution as an operating rhythm.',
      },
    ],
  },
];

export const MAX_QUIZ_SCORE = MATURITY_QUIZ.length * 4;

export function calculateQuizResult(
  score: number,
  answers: Record<number, number>,
): QuizResult {
  const selected = MATURITY_QUIZ.map((q, qi) => {
    const chosenScore = answers[qi];
    const option = q.options.find((o) => o.score === chosenScore);
    return option;
  }).filter((o): o is NonNullable<typeof o> => Boolean(o));

  const diagnostics = [...selected]
    .sort((a, b) => a.score - b.score)
    .map((o) => o.diagnostic)
    .filter((line, i, arr) => arr.indexOf(line) === i);

  const base = { score, maxScore: MAX_QUIZ_SCORE, diagnostics };

  if (score <= 5) {
    return {
      ...base,
      title: 'Unstructured Ad-Hoc (Tier 1)',
      description:
        'Your team uses AI as ad-hoc chat with no shared standard. Start at Enter for a free first lesson before the full course.',
      recommendedId: 'cloud',
    };
  }
  if (score <= 9) {
    return {
      ...base,
      title: 'Fragmented Adoption (Tier 2)',
      description:
        'Some prompt templates exist, but they stay local and workflows stay disconnected. Start at Use to map organization-focused prompts.',
      recommendedId: 'info',
    };
  }
  return {
    ...base,
    title: 'Structured AI OS Ready (Tier 3)',
    description:
      'You already favor strict parameters over casual chat. Next step: the executive prompt operating kit on promptanatomy.pro — structured modules, not ad-hoc threads.',
    recommendedId: 'pro',
  };
}
