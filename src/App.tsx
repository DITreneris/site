import { useCallback, useEffect, useRef, useState } from 'react';

import Header from './components/layout/Header';
import Hero from './components/layout/Hero';
import ProblemSolution from './components/layout/ProblemSolution';
import StatsStrip from './components/layout/StatsStrip';
import ClosingCta from './components/layout/ClosingCta';
import GatewayBand from './components/layout/GatewayBand';
import StickyHubCta from './components/layout/StickyHubCta';
import Footer from './components/layout/Footer';
import EcosystemMap from './components/ecosystem/EcosystemMap';
import AnatomizerBuilder from './components/anatomizer/AnatomizerBuilder';
import CorrectPromptPractice from './components/anatomizer/CorrectPromptPractice';
import MaturityQuiz from './components/maturity/MaturityQuiz';
import type { TabId } from './types';
import {
  hashForTab,
  hashKey,
  isPageAnchor,
  prefersReducedMotion,
  scrollToHash,
  tabFromHash,
  type NavigateOpts,
} from './utils/tabNavigation';
import { trackEvent } from './utils/trackEvent';
import { ANATOMY_SCENARIOS } from './data/anatomyBuilder';
import MethodSection from './components/layout/MethodSection';
import FaqSection from './components/layout/FaqSection';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>(() => tabFromHash(window.location.hash));
  const [selectedDomain, setSelectedDomain] = useState('app');
  const [anatomizerScenarioId, setAnatomizerScenarioId] = useState<string | null>(null);
  const [scenarioNonce, setScenarioNonce] = useState(0);
  const activeTabRef = useRef(activeTab);
  const pendingScrollRef = useRef<string | null>(null);

  activeTabRef.current = activeTab;

  const queueScroll = useCallback((hash: string, immediate: boolean) => {
    const behavior: ScrollBehavior = prefersReducedMotion() ? 'auto' : 'smooth';
    const run = () => scrollToHash(hash, behavior);
    if (immediate) {
      run();
      return;
    }
    pendingScrollRef.current = hash;
  }, []);

  const navigateToTab = useCallback(
    (tab: TabId, opts?: NavigateOpts) => {
      const sameTab = activeTabRef.current === tab;
      if (!sameTab) {
        setActiveTab(tab);
        trackEvent('tab_open', { tab });
      }
      const target = opts?.anchor ? `#${opts.anchor}` : hashForTab(tab);
      if (window.location.hash !== target) {
        window.history.replaceState(null, '', target);
      }
      const shouldScroll = Boolean(opts?.forceScroll || opts?.anchor || !sameTab);
      if (!shouldScroll) return;
      const key = hashKey(target);
      const panelReady = sameTab || key === 'method' || key === 'faq';
      queueScroll(target, panelReady);
    },
    [queueScroll],
  );

  useEffect(() => {
    const hash = pendingScrollRef.current;
    if (!hash) return;
    pendingScrollRef.current = null;
    const behavior: ScrollBehavior = prefersReducedMotion() ? 'auto' : 'smooth';
    requestAnimationFrame(() => scrollToHash(hash, behavior));
  }, [activeTab]);

  useEffect(() => {
    const onHashChange = () => {
      const next = tabFromHash(window.location.hash, activeTabRef.current);
      const sameTab = next === activeTabRef.current;
      if (!sameTab) {
        setActiveTab(next);
      }
      const key = hashKey(window.location.hash);
      const behavior: ScrollBehavior = prefersReducedMotion() ? 'auto' : 'smooth';
      if (isPageAnchor(key)) {
        if (sameTab || key !== 'anatomizer-builder') {
          scrollToHash(window.location.hash, behavior);
        } else {
          pendingScrollRef.current = window.location.hash;
        }
        return;
      }
      if (sameTab) {
        scrollToHash(window.location.hash, behavior);
      } else {
        pendingScrollRef.current = window.location.hash;
      }
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Page anchors can miss the native hash jump (React mounts after it).
  useEffect(() => {
    const key = hashKey(window.location.hash);
    if (!isPageAnchor(key)) return;
    const run = () => scrollToHash(window.location.hash, 'auto');
    const raf = requestAnimationFrame(() => requestAnimationFrame(run));
    const timer = window.setTimeout(run, 50);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
  }, []);

  const pivotToDomain = (domainId: string) => {
    setSelectedDomain(domainId);
    navigateToTab('ecosystem', { forceScroll: true });
  };

  const openAnatomizer = (domainId?: string) => {
    const scenario = domainId
      ? ANATOMY_SCENARIOS.find((s) => s.domainId === domainId)
      : undefined;
    setAnatomizerScenarioId(scenario?.id ?? null);
    setScenarioNonce((n) => n + 1);
    navigateToTab('anatomizer', { anchor: 'anatomizer-builder' });
  };

  return (
    <div className="pb-sticky-clearance min-h-screen bg-white text-brand-dark antialiased">
      <a
        href="#main-content"
        className="sr-only rounded-lg bg-brand-dark px-4 py-2 text-sm font-bold text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus-ring"
      >
        Skip to content
      </a>
      <Header
        activeTab={activeTab}
        onTabChange={navigateToTab}
        onLogoClick={() => {
          setSelectedDomain('app');
          navigateToTab('ecosystem', { forceScroll: true });
        }}
      />

      <Hero
        onStartAssessment={() => navigateToTab('maturity')}
        onExploreEcosystem={() => navigateToTab('ecosystem', { forceScroll: true })}
      />

      <ProblemSolution />
      <StatsStrip />
      <GatewayBand />

      <main id="main-content" className="scroll-mt-16">
        <div
          role="tabpanel"
          id="panel-ecosystem"
          aria-label="Ecosystem"
          hidden={activeTab !== 'ecosystem'}
          tabIndex={activeTab === 'ecosystem' ? 0 : -1}
          className={activeTab === 'ecosystem' ? 'animate-panel-in' : undefined}
        >
          <EcosystemMap
            selectedDomain={selectedDomain}
            onSelectDomain={setSelectedDomain}
            onOpenAnatomizer={openAnatomizer}
          />
        </div>
        <div
          role="tabpanel"
          id="panel-anatomizer"
          aria-label="Prompt Builder"
          hidden={activeTab !== 'anatomizer'}
          tabIndex={activeTab === 'anatomizer' ? 0 : -1}
          className={activeTab === 'anatomizer' ? 'animate-panel-in' : undefined}
        >
          <CorrectPromptPractice />
          <AnatomizerBuilder scenarioId={anatomizerScenarioId} scenarioNonce={scenarioNonce} />
        </div>
        <div
          role="tabpanel"
          id="panel-maturity"
          aria-label="Team Assessment"
          hidden={activeTab !== 'maturity'}
          tabIndex={activeTab === 'maturity' ? 0 : -1}
          className={activeTab === 'maturity' ? 'animate-panel-in' : undefined}
        >
          <MaturityQuiz onPivot={pivotToDomain} />
        </div>
      </main>

      <MethodSection onOpenAnatomizer={() => openAnatomizer()} />
      <ClosingCta onStartAssessment={() => navigateToTab('maturity')} />
      <FaqSection />
      <Footer />
      <StickyHubCta />
    </div>
  );
}
