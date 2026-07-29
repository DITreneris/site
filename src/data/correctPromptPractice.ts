export interface CorrectPromptChoice {
  id: string;
  label: string;
  description: string;
  prompt: string;
  isCorrect: boolean;
}

export interface CorrectPromptPracticeData {
  title: string;
  intro: string;
  weakPrompt: string;
  choices: CorrectPromptChoice[];
  feedbackCorrect: string;
  feedbackIncorrect: string;
  buildOwnHint: string;
  courseNote: string;
}

const CORRECT_PROMPT = `[SYSTEM ROLE]
You are a senior operations architect specializing in system efficiency and bottlenecks. Your style is analytical, direct, and completely free of boilerplate jargon.

[BUSINESS CONTEXT]
Our customer success group is experiencing an 18% delay in milestone sign-offs, causing operational friction during critical customer handoffs.

[DYNAMIC VARIABLES]
Bottleneck: Step 4 (Data Handshake), Target Speed: under 2 hours, Current Lag: 14 hours average.

[INSTRUCTIONS]
Draft a clear, chronological 14-day tactical roadmap in a clean markdown table showing immediate remediation steps, assignees, and output formats.

[OUTPUT CONSTRAINTS]
Strictly avoid conversational filler, introductory pleasantries, and terms like 'moreover', 'game-changing', or 'delighted'. Keep under 300 words total.

### BEGIN RESPONSE ACCORDING TO SYSTEM RULES`;

export const CORRECT_PROMPT_PRACTICE: CorrectPromptPracticeData = {
  title: 'Fix a weak prompt',
  intro:
    'Chat-style asks produce disposable drafts. Pick the structured five-layer version that teams can reuse.',
  weakPrompt:
    'Help me fix our slow customer handoffs. Make a plan and keep it short. Thanks!',
  choices: [
    {
      id: 'longer-chat',
      label: 'Longer chat ask',
      description: 'Same casual ask with more adjectives — still no role, context, or format.',
      prompt:
        'Please help our team urgently fix slow customer success handoffs. Create a really thorough action plan that covers everything and make it concise but detailed. Thanks so much!',
      isCorrect: false,
    },
    {
      id: 'partial-blocks',
      label: 'Partial structure',
      description: 'Adds a role, but skips variables and output constraints.',
      prompt: `[SYSTEM ROLE]
You are a helpful operations assistant.

[INSTRUCTIONS]
Write a plan to fix customer handoffs.

### BEGIN RESPONSE ACCORDING TO SYSTEM RULES`,
      isCorrect: false,
    },
    {
      id: 'five-layer',
      label: 'Five-layer anatomy',
      description: 'Role, context, variables, instructions, and output constraints — ready to copy.',
      prompt: CORRECT_PROMPT,
      isCorrect: true,
    },
  ],
  feedbackCorrect:
    'Correct. Explicit layers make the ask repeatable — the same structure the Anatomizer builds below.',
  feedbackIncorrect:
    'Not yet. Look for all five layers: System Role, Business Context, Dynamic Variables, Instructions, and Output Constraints.',
  buildOwnHint: 'Build your own below',
  courseNote: 'Demo uses 5 layers; the course at promptanatomy.app teaches the full 6-block system.',
};

export const CORRECT_SOLUTION_COPYABLE =
  CORRECT_PROMPT_PRACTICE.choices.find((c) => c.isCorrect)?.prompt ?? CORRECT_PROMPT;
