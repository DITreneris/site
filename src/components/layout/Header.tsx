import { useEffect, useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import type { TabId } from '../../types';
import { platformHref } from '../../data/siteContact';
import { trackEvent } from '../../utils/trackEvent';
import BrandLockup from '../shared/BrandLockup';

const TABS: { id: TabId; label: string }[] = [
  { id: 'ecosystem', label: 'Ecosystem' },
  { id: 'anatomizer', label: 'Prompt Builder' },
  { id: 'maturity', label: 'Team Assessment' },
];

interface HeaderProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  onLogoClick: () => void;
}

export default function Header({ activeTab, onTabChange, onLogoClick }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  // Light glass over the hero at the top; dark glass once a dark section is underneath.
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // The mobile menu always renders on a solid surface for legibility regardless of scroll.
  const dark = scrolled || mobileOpen;

  const handleTab = (tab: TabId) => {
    onTabChange(tab);
    setMobileOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 border-b backdrop-blur transition-colors duration-300 ${
        dark ? 'header-shell-dark' : 'header-shell'
      }`}
    >
      <div className="container-wide flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          onClick={onLogoClick}
          className="flex min-h-[44px] items-center rounded-lg focus-ring"
          aria-label="Prompt Anatomy home"
        >
          <BrandLockup tone={dark ? 'navy' : 'light'} />
        </button>

        <div className="hidden min-w-0 flex-1 items-center justify-end gap-3 md:flex">
          <nav className="flex items-center gap-1" role="tablist" aria-label="Site sections">
            {TABS.map((tab) => {
              const active = activeTab === tab.id;
              const tabClass = scrolled
                ? active
                  ? 'nav-tab-dark-active'
                  : 'nav-tab-dark'
                : active
                  ? 'nav-tab-active'
                  : 'nav-tab';
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={active}
                  aria-controls={`panel-${tab.id}`}
                  onClick={() => handleTab(tab.id)}
                  className={tabClass}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>
          <a
            href={platformHref('header')}
            target="_blank"
            rel="noreferrer"
            className="btn-primary-md hidden shrink-0 lg:inline-flex"
            onClick={() => trackEvent('platform_outbound', { source: 'header' })}
          >
            Open the platform
            <ArrowRight className="icon-sm" />
          </a>
        </div>

        <button
          onClick={() => setMobileOpen((v) => !v)}
          className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg px-2 font-semibold transition-colors duration-300 focus-ring md:hidden ${
            dark ? 'text-on-dark-strong hover:bg-white/10' : 'text-body hover:bg-slate-100'
          }`}
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="icon-md" /> : <Menu className="icon-md" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-brand-dark px-4 py-3 md:hidden">
          <nav role="tablist" aria-label="Site sections">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`panel-${tab.id}`}
                onClick={() => handleTab(tab.id)}
                className={
                  activeTab === tab.id ? 'nav-tab-mobile-active' : 'nav-tab-mobile'
                }
              >
                {tab.label}
              </button>
            ))}
          </nav>
          <a
            href={platformHref('header')}
            target="_blank"
            rel="noreferrer"
            className="btn-primary-md mt-2 w-full"
            onClick={() => {
              trackEvent('platform_outbound', { source: 'header' });
              setMobileOpen(false);
            }}
          >
            Open the platform
            <ArrowRight className="icon-sm" />
          </a>
        </div>
      )}
    </header>
  );
}
