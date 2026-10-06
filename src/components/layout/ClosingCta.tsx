import { ArrowRight, ClipboardCheck } from 'lucide-react';
import { platformHref } from '../../data/siteContact';
import { trackEvent } from '../../utils/trackEvent';

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
        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-on-dark">
          Know your stage in 60 seconds, then open the hub.
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={platformHref('closing')}
            target="_blank"
            rel="noreferrer"
            className="btn-primary-md w-full sm:w-auto"
            onClick={() => trackEvent('platform_outbound', { source: 'closing' })}
          >
            Open the platform
            <ArrowRight className="icon-sm" />
          </a>
          <button onClick={onStartAssessment} className="btn-secondary-dark-md">
            <ClipboardCheck className="icon-sm" />
            Take the 60-second assessment
          </button>
        </div>
      </div>
    </section>
  );
}
