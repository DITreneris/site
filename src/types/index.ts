import type { LucideIcon } from 'lucide-react';

export type TabId = 'ecosystem' | 'anatomizer' | 'maturity';

export type EcosystemAccent = 'brand' | 'ecosystem-1' | 'ecosystem-2' | 'ecosystem-3' | 'ecosystem-4';

export type EcosystemPhase = 'Hub' | 'Adopt' | 'Apply' | 'Scale' | 'Knowledge';

export interface Domain {
  id: string;
  domain: string;
  title: string;
  role: string;
  description: string;
  audience: string;
  icon: LucideIcon;
  isCore: boolean;
  features: string[];
  phase: EcosystemPhase;
  transition: string;
  maturityTier?: string;
}

export type AnatomyLayerKey = 'persona' | 'context' | 'variable' | 'instruction' | 'constraint';

export interface AnatomyOption {
  title: string;
  content: string;
}

export interface AnatomyLayerMeta {
  key: AnatomyLayerKey;
  label: string;
  blockTag: string;
}

export interface QuizOption {
  text: string;
  score: number;
}

export interface QuizQuestion {
  question: string;
  options: QuizOption[];
}

export interface QuizResult {
  score: number;
  maxScore: number;
  title: string;
  description: string;
  recommendedId: string;
}
