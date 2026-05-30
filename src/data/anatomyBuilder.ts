import type { AnatomyLayerKey, AnatomyLayerMeta, AnatomyOption } from '../types';

export const ANATOMY_BUILDER_ITEMS: Record<AnatomyLayerKey, AnatomyOption[]> = {
  persona: [
    {
      title: 'Operations Auditor',
      content:
        'You are a senior operations architect specializing in system efficiency and bottlenecks. Your style is analytical, direct, and completely free of boilerplate jargon.',
    },
    {
      title: 'Elite PR Strategist',
      content:
        'You are a crisis communication advisor and brand messaging architect. You focus on brevity, impact, high-integrity logic, and clear narratives.',
    },
    {
      title: 'HR Sourcing Expert',
      content:
        'You are a technical recruiting lead specializing in assessing deep technical expertise, culture-add, and long-term professional growth.',
    },
  ],
  context: [
    {
      title: 'Quarterly Team Lag',
      content:
        'Our customer success group is experiencing an 18% delay in milestone sign-offs, causing operational friction during critical customer handoffs.',
    },
    {
      title: 'High-Stakes Feature Rollout',
      content:
        'We are introducing a complex automated reporting engine. Customers express anxiety about losing manual operational granular controls.',
    },
    {
      title: 'Senior Developer Sourcing',
      content:
        'We must recruit a Lead DevOps Engineer to manage multi-region cloud infrastructures under tight data-governance guidelines.',
    },
  ],
  variable: [
    {
      title: 'Operational Metrics',
      content:
        'Bottleneck: Step 4 (Data Handshake), Target Speed: under 2 hours, Current Lag: 14 hours average.',
    },
    {
      title: 'Product Specifics',
      content:
        'Feature Name: Auto-Insights, Security: SOC2 certified, Target audience: Enterprise Risk Directors.',
    },
    {
      title: 'Role Guidelines',
      content:
        'Stack: Kubernetes, AWS, Terraform. Standard: Zero-downtime blue/green deployments.',
    },
  ],
  instruction: [
    {
      title: 'Action Plan Checklist',
      content:
        'Draft a clear, chronological 14-day tactical roadmap in a clean markdown table showing immediate remediation steps, assignees, and output formats.',
    },
    {
      title: 'Messaging Architecture',
      content:
        'Generate 3 distinct brand positioning statements addressing trust concerns. Compare manual safety check steps side-by-side with automated compliance.',
    },
    {
      title: 'Architectural Screen Questions',
      content:
        'Develop 3 complex behavioral scenario questions containing precise grading checklists for candidate evaluations.',
    },
  ],
  constraint: [
    {
      title: 'No Jargon, Under 300 Words',
      content:
        "Strictly avoid conversational filler, introductory pleasantries, and terms like 'moreover', 'game-changing', or 'delighted'. Keep under 300 words total.",
    },
    {
      title: 'JSON Schema Output Only',
      content:
        'Structure the final response strictly in structured JSON, avoiding any preceding conversational text, preamble, or conversational warnings.',
    },
    {
      title: 'Tabular Matrix Only',
      content:
        'The entire response must live inside a clean Markdown grid with clearly designated columns for Objective, Priority, and Metric.',
    },
  ],
};

export const ANATOMY_LAYERS: AnatomyLayerMeta[] = [
  { key: 'persona', label: 'Layer A: System Role / Persona', blockTag: 'SYSTEM ROLE' },
  { key: 'context', label: 'Layer B: Business Context', blockTag: 'BUSINESS CONTEXT' },
  { key: 'variable', label: 'Layer C: Dynamic Variables', blockTag: 'DYNAMIC VARIABLES' },
  { key: 'instruction', label: 'Layer D: Instructions & Goals', blockTag: 'INSTRUCTIONS' },
  { key: 'constraint', label: 'Layer E: Output Constraints', blockTag: 'OUTPUT CONSTRAINTS' },
];
