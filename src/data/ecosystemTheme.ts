import type { EcosystemAccent, EcosystemPhase } from '../types';

/**
 * Color encodes the ecosystem PHASE, not the individual stage (no rainbow).
 * The four maturity phases map onto the mother repo's four accent tokens, and
 * the hub keeps brand gold. This makes color a learnable signal: stages in the
 * same phase share a color.
 */
export const PHASE_ACCENT: Record<EcosystemPhase, EcosystemAccent> = {
  Hub: 'brand',
  Adopt: 'ecosystem-1',
  Apply: 'ecosystem-2',
  Scale: 'ecosystem-3',
  Knowledge: 'ecosystem-4',
};

/** Domain id -> phase, kept in sync with src/data/domains.ts. */
export const DOMAIN_PHASE: Record<string, EcosystemPhase> = {
  app: 'Hub',
  cloud: 'Adopt',
  info: 'Adopt',
  space: 'Apply',
  help: 'Apply',
  ceo: 'Scale',
  pro: 'Scale',
  blog: 'Knowledge',
  lol: 'Knowledge',
};

export const DOMAIN_ACCENT: Record<string, EcosystemAccent> = Object.fromEntries(
  Object.entries(DOMAIN_PHASE).map(([id, phase]) => [id, PHASE_ACCENT[phase]]),
);

export function phaseFor(domainId: string): EcosystemPhase {
  return DOMAIN_PHASE[domainId] ?? 'Hub';
}

interface AccentClasses {
  text: string;
  bg: string;
  ring: string;
  dot: string;
  glow: string;
}

const ACCENT_CLASSES: Record<EcosystemAccent, AccentClasses> = {
  brand: {
    text: 'text-brand-accent',
    bg: 'bg-brand-accent/15',
    ring: 'ring-brand-accent',
    dot: 'bg-brand-accent',
    glow: 'shadow-glow-brand',
  },
  'ecosystem-1': {
    text: 'text-ecosystem-1',
    bg: 'bg-ecosystem-1/15',
    ring: 'ring-ecosystem-1',
    dot: 'bg-ecosystem-1',
    glow: 'shadow-glow-1',
  },
  'ecosystem-2': {
    text: 'text-ecosystem-2',
    bg: 'bg-ecosystem-2/15',
    ring: 'ring-ecosystem-2',
    dot: 'bg-ecosystem-2',
    glow: 'shadow-glow-2',
  },
  'ecosystem-3': {
    text: 'text-ecosystem-3',
    bg: 'bg-ecosystem-3/15',
    ring: 'ring-ecosystem-3',
    dot: 'bg-ecosystem-3',
    glow: 'shadow-glow-3',
  },
  'ecosystem-4': {
    text: 'text-ecosystem-4',
    bg: 'bg-ecosystem-4/15',
    ring: 'ring-ecosystem-4',
    dot: 'bg-ecosystem-4',
    glow: 'shadow-glow-4',
  },
};

export function accentFor(domainId: string): AccentClasses {
  const accent = DOMAIN_ACCENT[domainId] ?? 'brand';
  return ACCENT_CLASSES[accent];
}

export function accentForPhase(phase: EcosystemPhase): AccentClasses {
  return ACCENT_CLASSES[PHASE_ACCENT[phase]];
}

/** Short label shown above grouped pipeline stages. */
export function phaseLabelFor(phase: EcosystemPhase): string {
  return phase === 'Knowledge' ? 'Learn' : phase;
}
