import { ArrowRight } from 'lucide-react';
import { platformHref } from '../../data/siteContact';
import { trackEvent } from '../../utils/trackEvent';

export default function GatewayBand() {
  return (
    <section
      className="border-y border-subtle bg-white px-4 py-8 sm:px-6 md:px-8"
      aria-label="Open the training hub"
    >
      <div className="container-narrow flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="text-sm font-semibold text-brand-dark">
          Training and checkout live on the hub.
        </p>
        <a
          href={platformHref('mid')}
          target="_blank"
          rel="noreferrer"
          className="btn-primary-md w-full shrink-0 sm:w-auto"
          onClick={() => trackEvent('platform_outbound', { source: 'mid' })}
        >
          Open the platform
          <ArrowRight className="icon-sm" />
        </a>
      </div>
    </section>
  );
}
