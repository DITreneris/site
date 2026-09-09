import { createElement } from 'react';
import { Users, Check, ExternalLink, ArrowRight, Terminal } from 'lucide-react';
import type { Domain } from '../../types';
import { accentFor, phaseLabelFor } from '../../data/ecosystemTheme';
import { ANATOMY_SCENARIO_DOMAIN_IDS } from '../../data/anatomyBuilder';
import { kitHref, platformHref } from '../../data/siteContact';
import { trackEvent } from '../../utils/trackEvent';

interface DomainDetailProps {
  domain: Domain;
  onOpenAnatomizer: () => void;
}

export default function DomainDetail({ domain, onOpenAnatomizer }: DomainDetailProps) {
  const accent = accentFor(domain.id);
  const hasStageExample = ANATOMY_SCENARIO_DOMAIN_IDS.has(domain.id);

  return (
    <div className={`card-glass animate-panel-in overflow-hidden p-6 sm:p-8 ${accent.glow}`}>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div className="flex min-w-0 items-center gap-3.5">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl surface-inset">
            {createElement(domain.icon, { className: `icon-md ${accent.text}` })}
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-black text-white">{domain.title}</h2>
              <span className="break-all rounded border border-border-glass bg-black/20 px-2 py-0.5 font-mono text-micro text-subtle">
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
                <span className="rounded-full border border-border-glass bg-black/20 px-2 py-0.5 text-micro font-semibold text-subtle">
                  {domain.maturityTier}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:items-end">
          <a
            href={domain.isCore ? platformHref('domain_detail') : kitHref(domain.domain, 'domain_detail')}
            target="_blank"
            rel="noreferrer"
            className="btn-glass-sm"
            onClick={() => {
              if (domain.isCore) {
                trackEvent('platform_outbound', { source: 'domain_detail' });
              } else {
                trackEvent('kit_outbound', {
                  domain: domain.id,
                  source: 'domain_detail',
                });
              }
            }}
          >
            Open {domain.domain}
            <ExternalLink className="icon-sm" />
          </a>
          {!domain.isCore && (
            <a
              href={platformHref('domain_detail')}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary-dark self-stretch sm:self-end"
              onClick={() =>
                trackEvent('platform_outbound', { source: 'domain_detail' })
              }
            >
              Start training
              <ExternalLink className="icon-sm" />
            </a>
          )}
        </div>
      </div>

      <p className="mt-5 text-sm leading-relaxed text-on-dark">{domain.description}</p>

      <div className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-subtle">
        <ArrowRight className={`icon-sm mt-0.5 flex-shrink-0 ${accent.text}`} />
        <span>
          <span className="font-semibold text-on-dark-strong">Next in the journey: </span>
          {domain.transition}
        </span>
      </div>

      <div className="mt-5 flex items-center gap-2.5 rounded-xl border border-border-glass bg-black/20 p-3.5">
        <Users className={`icon-sm flex-shrink-0 ${accent.text}`} />
        <div>
          <span className="block text-label-upper text-subtle">Best for</span>
          <span className="text-xs font-semibold text-on-dark-strong">{domain.audience}</span>
        </div>
      </div>

      <div className="mt-5">
        <h4 className="text-label-upper text-subtle">What's included</h4>
        <ul className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {domain.features.map((feat) => (
            <li
              key={feat}
              className="flex items-center gap-2.5 rounded-lg border border-border-glass surface-inset-soft p-3"
            >
              <Check className={`icon-sm flex-shrink-0 ${accent.text}`} />
              <span className="text-xs text-on-dark">{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      <button onClick={onOpenAnatomizer} className="link-inline mt-5">
        <Terminal className="icon-sm" />
        {hasStageExample
          ? 'See an example prompt for this stage'
          : 'Try the prompt builder'}
        <ArrowRight className="icon-sm" />
      </button>
    </div>
  );
}
