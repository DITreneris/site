import { createElement } from 'react';
import { Users, Check, ExternalLink, ArrowRight, Terminal } from 'lucide-react';
import type { Domain } from '../../types';
import { accentFor, phaseLabelFor } from '../../data/ecosystemTheme';

interface DomainDetailProps {
  domain: Domain;
  onOpenAnatomizer: () => void;
}

export default function DomainDetail({ domain, onOpenAnatomizer }: DomainDetailProps) {
  const accent = accentFor(domain.id);

  return (
    <div className={`card-glass animate-panel-in overflow-hidden p-6 sm:p-8 ${accent.glow}`}>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3.5">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.04]">
            {createElement(domain.icon, { className: `icon-md ${accent.text}` })}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-white">{domain.title}</h2>
              <span className="rounded border border-border-glass bg-black/20 px-2 py-0.5 font-mono text-micro text-slate-400">
                {domain.domain}
              </span>
            </div>
            <p className={`mt-0.5 text-xs font-semibold ${accent.text}`}>{domain.role}</p>
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border border-border-glass bg-black/20 px-2 py-0.5 text-label-upper ${accent.text}`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${accent.dot}`} />
                {phaseLabelFor(domain.phase)} phase
              </span>
              {domain.maturityTier && (
                <span className="rounded-full border border-border-glass bg-black/20 px-2 py-0.5 text-micro font-semibold text-slate-400">
                  {domain.maturityTier}
                </span>
              )}
            </div>
          </div>
        </div>
        <a
          href={`https://${domain.domain}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 self-start rounded-xl border border-border-glass bg-white/5 px-3.5 py-2 text-xs font-semibold text-slate-200 transition-colors hover:border-border-glass-hover hover:text-white focus-ring"
        >
          Open {domain.domain}
          <ExternalLink className="icon-sm" />
        </a>
      </div>

      <p className="mt-5 text-sm leading-relaxed text-slate-300">{domain.description}</p>

      <div className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-slate-400">
        <ArrowRight className={`icon-sm mt-0.5 flex-shrink-0 ${accent.text}`} />
        <span>
          <span className="font-semibold text-slate-200">Next in the journey: </span>
          {domain.transition}
        </span>
      </div>

      <div className="mt-5 flex items-center gap-2.5 rounded-xl border border-border-glass bg-black/20 p-3.5">
        <Users className={`icon-sm flex-shrink-0 ${accent.text}`} />
        <div>
          <span className="block text-label-upper text-slate-500">Best for</span>
          <span className="text-xs font-semibold text-slate-200">{domain.audience}</span>
        </div>
      </div>

      <div className="mt-5">
        <h4 className="text-label-upper text-slate-400">Included system components</h4>
        <ul className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {domain.features.map((feat) => (
            <li
              key={feat}
              className="flex items-center gap-2.5 rounded-lg border border-border-glass bg-white/[0.02] p-3"
            >
              <Check className={`icon-sm flex-shrink-0 ${accent.text}`} />
              <span className="text-xs text-slate-300">{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={onOpenAnatomizer}
        className="link-inline mt-5"
      >
        <Terminal className="icon-sm" />
        See an example prompt for this stage
        <ArrowRight className="icon-sm" />
      </button>
    </div>
  );
}
