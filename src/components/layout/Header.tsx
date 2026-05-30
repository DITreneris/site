import { useEffect, useState } from 'react';
import { Zap, Menu, X } from 'lucide-react';
import type { TabId } from '../../types';

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
        dark ? 'border-white/10 bg-brand-dark/80 shadow-soft' : 'border-slate-200 bg-white/85'
      }`}
    >
      <div className="container-wide flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          onClick={onLogoClick}
          className="flex items-center gap-3 focus-ring rounded-lg"
          aria-label="Prompt Anatomy home"
        >
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-300 ${
              dark ? 'bg-white/10' : 'bg-brand-dark'
            }`}
          >
            <Zap className="icon-md text-brand-accent" />
          </span>
          <span className="text-left">
            <span
              className={`block text-base font-extrabold tracking-tight transition-colors duration-300 ${
                dark ? 'text-white' : 'text-brand-dark'
              }`}
            >
              Prompt Anatomy
            </span>
            <span
              className={`block text-label-upper transition-colors duration-300 ${
                dark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              Structured Work Systems
            </span>
          </span>
        </button>

        <nav className="hidden items-center gap-1 md:flex" role="tablist" aria-label="Site sections">
          {TABS.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={active}
                aria-controls={`panel-${tab.id}`}
                onClick={() => handleTab(tab.id)}
                className={`text-nav-link rounded-lg px-4 py-2 transition-colors duration-300 focus-ring ${
                  active
                    ? scrolled
                      ? 'bg-white/10 text-white'
                      : 'bg-slate-100 text-brand-dark'
                    : scrolled
                      ? 'text-slate-300 hover:text-white'
                      : 'text-slate-500 hover:text-brand-dark'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        <button
          onClick={() => setMobileOpen((v) => !v)}
          className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg px-2 font-semibold transition-colors duration-300 focus-ring md:hidden ${
            dark ? 'text-slate-200 hover:bg-white/10' : 'text-slate-600 hover:bg-slate-100'
          }`}
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="icon-md" /> : <Menu className="icon-md" />}
        </button>
      </div>

      {mobileOpen && (
        <nav
          className="border-t border-white/10 bg-brand-dark px-4 py-3 md:hidden"
          role="tablist"
          aria-label="Site sections"
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              onClick={() => handleTab(tab.id)}
              className={`block w-full rounded-lg px-4 py-3 text-left text-sm font-bold transition-colors focus-ring ${
                activeTab === tab.id
                  ? 'bg-white/10 text-white'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}
