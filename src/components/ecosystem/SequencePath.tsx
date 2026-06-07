import { createElement } from 'react';
import { Layers, ArrowRight } from 'lucide-react';
import { DOMAINS } from '../../data/domains';
import { accentFor, accentForPhase, phaseLabelFor } from '../../data/ecosystemTheme';
import type { EcosystemPhase } from '../../types';

interface SequencePathProps {
  selectedDomain: string;
  onSelectDomain: (id: string) => void;
}

const PHASE_ORDER: EcosystemPhase[] = ['Adopt', 'Apply', 'Scale', 'Knowledge'];

export default function SequencePath({ selectedDomain, onSelectDomain }: SequencePathProps) {
  const pipeline = DOMAINS.filter((d) => !d.isCore);
  const hubSelected = selectedDomain === 'app';

  return (
    <div className="rounded-2xl border border-border-glass bg-surface-card backdrop-blur-md p-5 sm:p-6">
      <div className="mb-5 border-b border-border-glass pb-4">
        <h3 className="text-label-upper text-slate-200">Where to start</h3>
        <p className="mt-1 text-xs text-slate-300">
          Select any kit to view its audience, role, and features.
        </p>
      </div>

      {/* Spine origin: the central hub everything connects to */}
      <button
        onClick={() => onSelectDomain('app')}
        className={`mb-3 flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors focus-ring ${
          hubSelected
            ? 'border-brand-accent/70 bg-brand-accent/15 shadow-glow-brand'
            : 'border-border-glass bg-white/[0.04] hover:bg-white/[0.07] hover:border-border-glass-hover'
        }`}
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-accent/15">
          <Layers className="icon-md text-brand-accent" />
        </span>
        <span>
          <span className="block text-xs font-bold text-white">Core hub</span>
          <span className="block font-mono text-micro text-slate-400">promptanatomy.app</span>
        </span>
        <span className="ml-auto hidden items-center gap-1.5 pr-1 sm:flex" aria-hidden="true">
          {PHASE_ORDER.map((phase) => (
            <span key={phase} className={`h-1.5 w-1.5 rounded-full ${accentForPhase(phase).dot}`} />
          ))}
        </span>
      </button>

      {/* Connector: the hub branches down into the four-phase journey (decorative) */}
      <div className="relative mb-2 hidden h-6 lg:block" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-border-glass" />
        <div className="absolute left-[12.5%] right-[12.5%] top-3 h-px bg-border-glass" />
        <div className="absolute left-[12.5%] top-3 h-3 w-px bg-border-glass" />
        <div className="absolute left-[37.5%] top-3 h-3 w-px bg-border-glass" />
        <div className="absolute left-[62.5%] top-3 h-3 w-px bg-border-glass" />
        <div className="absolute right-[12.5%] top-3 h-3 w-px bg-border-glass" />
      </div>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
        {PHASE_ORDER.map((phase, pIdx) => {
          const stages = pipeline.filter((d) => d.phase === phase);
          const phaseAccent = accentForPhase(phase);
          return (
            <div key={phase} className="flex items-stretch gap-3 lg:flex-1">
              <div className="flex-1 rounded-xl border border-border-glass bg-white/[0.02] p-3 sm:p-3.5">
                <div className="mb-3 flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${phaseAccent.dot}`} />
                  <span className="text-label-upper text-slate-300">{phaseLabelFor(phase)}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
                  {stages.map((item) => {
                    const isSelected = selectedDomain === item.id;
                    const accent = accentFor(item.id);
                    return (
                      <button
                        key={item.id}
                        onClick={() => onSelectDomain(item.id)}
                        aria-pressed={isSelected}
                        className={`flex h-full flex-col rounded-lg border p-3 text-left transition-all focus-ring ${
                          isSelected
                            ? `border-transparent bg-white/10 ring-2 ${accent.ring} ${accent.glow}`
                            : 'border-border-glass bg-white/[0.04] hover:bg-white/[0.07] hover:border-border-glass-hover'
                        }`}
                      >
                        <span className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04]">
                          {createElement(item.icon, { className: `icon-sm ${accent.text}` })}
                        </span>
                        <h4 className="text-xs font-bold text-white">{item.title}</h4>
                        <span className="mt-1 block text-caption leading-snug text-slate-400">
                          {item.role}
                        </span>
                        <span className="mt-1.5 block break-all font-mono text-micro tracking-tight text-slate-500">
                          {item.domain}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {pIdx < PHASE_ORDER.length - 1 && (
                <div className="hidden items-center pt-7 lg:flex" aria-hidden="true">
                  <ArrowRight className="icon-md text-slate-400" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
