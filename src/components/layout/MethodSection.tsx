import { ArrowRight, ExternalLink } from 'lucide-react';
import {
  METHOD_CATEGORY_LINE,
  METHOD_PRICING_LINE,
  METHOD_START_PATHS,
  PROMPT_LADDER_SURFACES,
} from '../../data/promptLadder';
import { execKitHref, lessonHref, platformHref } from '../../data/siteContact';
import { trackEvent } from '../../utils/trackEvent';

interface MethodSectionProps {
  onOpenAnatomizer: () => void;
}

export default function MethodSection({ onOpenAnatomizer }: MethodSectionProps) {
  return (
    <section
      className="section-default surface-muted scroll-mt-16"
      id="method"
      aria-labelledby="method-heading"
    >
      <div className="container-narrow space-y-8">
        <div className="text-center">
          <span className="text-eyebrow-light">How the system works</span>
          <h2 id="method-heading" className="section-heading mt-2">
            Lesson, demo, then the course
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-body">
            Three surfaces, three prompt models. Pick the one that matches your stage.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {PROMPT_LADDER_SURFACES.map((surface) => (
            <li key={surface.id} className="card-light flex flex-col">
              <p className="text-eyebrow-light">{surface.eyebrow}</p>
              <h3 className="mt-2 text-sm font-bold text-brand-dark">{surface.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-body">{surface.job}</p>
              <p className="mt-3 flex-1 font-mono text-caption leading-relaxed text-muted">
                {surface.model}
              </p>
              {surface.action === 'demo' ? (
                <button type="button" onClick={onOpenAnatomizer} className="link-inline mt-4">
                  {surface.ctaLabel}
                  <ArrowRight className="icon-sm" />
                </button>
              ) : (
                <a
                  href={
                    surface.action === 'lesson'
                      ? lessonHref('method')
                      : platformHref('method')
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="link-inline mt-4"
                  onClick={() => {
                    if (surface.action === 'lesson') {
                      trackEvent('kit_outbound', { domain: 'cloud', source: 'method' });
                    } else {
                      trackEvent('platform_outbound', { source: 'method' });
                    }
                  }}
                >
                  {surface.ctaLabel}
                  <ExternalLink className="icon-sm" />
                </a>
              )}
            </li>
          ))}
        </ul>

        <div className="space-y-3 text-center">
          <p className="text-label-upper text-muted">Where to start</p>
          <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:flex-wrap sm:gap-5">
            {METHOD_START_PATHS.map((path) => (
              <a
                key={path.id}
                href={
                  path.action === 'lesson'
                    ? lessonHref('method')
                    : path.action === 'exec'
                      ? execKitHref('method')
                      : platformHref('method')
                }
                target="_blank"
                rel="noreferrer"
                className="link-inline"
                onClick={() => {
                  if (path.action === 'course') {
                    trackEvent('platform_outbound', { source: 'method' });
                  } else {
                    trackEvent('kit_outbound', {
                      domain: path.action === 'lesson' ? 'cloud' : 'pro',
                      source: 'method',
                    });
                  }
                }}
              >
                {path.label}
                <ExternalLink className="icon-sm" />
              </a>
            ))}
          </div>
          <p className="text-caption leading-relaxed text-muted">{METHOD_PRICING_LINE}</p>
          <p className="text-sm leading-relaxed text-body">{METHOD_CATEGORY_LINE}</p>
        </div>
      </div>
    </section>
  );
}
