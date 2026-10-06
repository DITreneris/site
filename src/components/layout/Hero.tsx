import { ArrowRight, ClipboardCheck } from 'lucide-react';
import { platformHref } from '../../data/siteContact';
import { trackEvent } from '../../utils/trackEvent';

interface HeroProps {
  onStartAssessment: () => void;
  onExploreEcosystem: () => void;
}

export default function Hero({ onStartAssessment, onExploreEcosystem }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-hero-bg">
      <div className="container-hero px-4 pb-10 pt-14 text-center sm:px-6 lg:px-8">
        <span className="badge-accent mx-auto">Ecosystem</span>

        <h1 className="mt-6 text-3xl font-black leading-[1.08] tracking-[-0.02em] text-brand-dark sm:text-4xl lg:text-5xl">
          Less random prompting.
          <span className="mt-1 block">More structured execution.</span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-body">
          Workflows, templates, and standards &mdash; not one-off chats.
        </p>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted">
          600+ templates · 60 tools · eight stages — across the ecosystem
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={platformHref('hero')}
            target="_blank"
            rel="noreferrer"
            className="btn-primary-md w-full sm:w-auto"
            onClick={() => trackEvent('platform_outbound', { source: 'hero' })}
          >
            Open the platform
            <ArrowRight className="icon-sm" />
          </a>
          <button onClick={onStartAssessment} className="btn-secondary-md w-full sm:w-auto">
            <ClipboardCheck className="icon-sm" />
            Take the 60-second assessment
          </button>
        </div>

        <button
          type="button"
          onClick={onExploreEcosystem}
          className="mt-6 inline-flex min-h-[44px] items-center gap-1.5 rounded-sm text-sm font-semibold text-body-strong focus-ring"
        >
          Explore the ecosystem
          <ArrowRight className="icon-sm" />
        </button>
      </div>
    </section>
  );
}
