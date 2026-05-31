import { ArrowRight, ClipboardCheck } from 'lucide-react';

interface HeroProps {
  onStartAssessment: () => void;
  onExploreEcosystem: () => void;
}

export default function Hero({ onStartAssessment, onExploreEcosystem }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-hero-bg">
      <div className="container-hero px-4 pb-10 pt-14 text-center sm:px-6 lg:px-8">
        <span className="badge-accent mx-auto">
          Prompt Anatomy &middot; AI Operating System for Teams
        </span>

        <h1 className="mt-6 text-3xl font-black leading-[1.08] tracking-[-0.02em] text-brand-dark sm:text-4xl lg:text-5xl">
          Turn AI from a chat tool into a{' '}
          <span className="bg-accent-gradient-strong bg-clip-text text-transparent">
            structured operating system
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600">
          Build reusable AI workflows, prompt templates, and team standards &mdash; so everyday AI
          use becomes a repeatable business process.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="https://promptanatomy.app"
            target="_blank"
            rel="noreferrer"
            className="btn-primary-md w-full sm:w-auto"
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
          className="link-inline mt-4"
        >
          Explore the ecosystem
          <ArrowRight className="icon-sm" />
        </button>
      </div>
    </section>
  );
}
