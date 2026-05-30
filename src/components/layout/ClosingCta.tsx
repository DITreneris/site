import { ArrowRight, ClipboardCheck } from 'lucide-react';

interface ClosingCtaProps {
  onStartAssessment: () => void;
}

export default function ClosingCta({ onStartAssessment }: ClosingCtaProps) {
  return (
    <section className="section-dark">
      <div className="container-narrow relative text-center">
        <h2 className="text-3xl font-black leading-tight tracking-[-0.02em] text-white md:text-4xl">
          Ready to make AI a repeatable system?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-400">
          Start with the central platform, or find your exact starting stage with the 60-second
          team assessment.
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="https://promptanatomy.app"
            target="_blank"
            rel="noreferrer"
            className="btn-primary-md w-full sm:w-auto"
          >
            Open the platform
            <ArrowRight className="icon-sm" />
          </a>
          <button onClick={onStartAssessment} className="btn-secondary-dark-md">
            <ClipboardCheck className="icon-sm" />
            Take the assessment
          </button>
        </div>
      </div>
    </section>
  );
}
