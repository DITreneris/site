import { ArrowRight } from 'lucide-react';
import { platformHref } from '../../data/siteContact';
import { trackEvent } from '../../utils/trackEvent';

export default function StickyHubCta() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-30 border-t border-subtle bg-white/95 px-4 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] lg:hidden"
      role="region"
      aria-label="Open the training hub"
    >
      <a
        href={platformHref('sticky')}
        target="_blank"
        rel="noreferrer"
        className="btn-primary-md w-full"
        onClick={() => trackEvent('platform_outbound', { source: 'sticky' })}
      >
        Open the platform
        <ArrowRight className="icon-sm" />
      </a>
    </div>
  );
}
