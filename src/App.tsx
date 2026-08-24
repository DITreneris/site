import { useCallback, useEffect, useRef, useState } from 'react';

import Header from './components/layout/Header';

import Hero from './components/layout/Hero';

import ProblemSolution from './components/layout/ProblemSolution';

import StatsStrip from './components/layout/StatsStrip';

import ClosingCta from './components/layout/ClosingCta';

import Footer from './components/layout/Footer';

import EcosystemMap from './components/ecosystem/EcosystemMap';

import AnatomizerBuilder from './components/anatomizer/AnatomizerBuilder';

import CorrectPromptPractice from './components/anatomizer/CorrectPromptPractice';

import MaturityQuiz from './components/maturity/MaturityQuiz';

import type { TabId } from './types';

import { hashForTab, tabFromHash } from './utils/tabNavigation';

import { trackEvent } from './utils/trackEvent';

import MethodSection from './components/layout/MethodSection';
import FaqSection from './components/layout/FaqSection';



export default function App() {

  const [activeTab, setActiveTab] = useState<TabId>(() => tabFromHash(window.location.hash));

  const [selectedDomain, setSelectedDomain] = useState('app');

  const didMount = useRef(false);



  const navigateToTab = useCallback((tab: TabId) => {

    setActiveTab(tab);

    trackEvent('tab_open', { tab });

    const target = hashForTab(tab);

    if (window.location.hash !== target) {

      window.history.replaceState(null, '', target);

    }

  }, []);



  useEffect(() => {

    const onHashChange = () => {
      const hash = window.location.hash.replace(/^#/, '');
      setActiveTab(tabFromHash(window.location.hash));
      if (hash !== 'method' && hash !== 'faq') return;
      const el = document.getElementById(hash);
      if (!el) return;
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    };

    window.addEventListener('hashchange', onHashChange);

    return () => window.removeEventListener('hashchange', onHashChange);

  }, []);



  // Page anchors (#method, #faq) are always mounted; scroll on first paint too
  // because native hash jump runs before React renders those nodes.

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, '');
    if (hash !== 'method' && hash !== 'faq') return;
    const el = document.getElementById(hash);
    if (!el) return;
    el.scrollIntoView({ behavior: 'auto', block: 'start' });
  }, []);

  // Bring the active panel into view on tab change (skip first render).

  useEffect(() => {

    if (!didMount.current) {

      didMount.current = true;

      return;

    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hash = window.location.hash.replace(/^#/, '');
    const pageAnchor = hash === 'method' || hash === 'faq' ? document.getElementById(hash) : null;
    const target = pageAnchor ?? document.getElementById('main-content');
    if (!target) return;
    target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });

  }, [activeTab]);



  const pivotToDomain = (domainId: string) => {

    setSelectedDomain(domainId);

    navigateToTab('ecosystem');

  };



  return (

    <div className="min-h-screen bg-white text-brand-dark antialiased">

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

          navigateToTab('ecosystem');

          setSelectedDomain('app');

        }}

      />



      <Hero
        onStartAssessment={() => navigateToTab('maturity')}
        onExploreEcosystem={() => navigateToTab('ecosystem')}
      />



      <ProblemSolution />

      <StatsStrip />



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

            onOpenAnatomizer={() => navigateToTab('anatomizer')}

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

          <AnatomizerBuilder />

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



      <MethodSection onOpenAnatomizer={() => navigateToTab('anatomizer')} />

      <ClosingCta onStartAssessment={() => navigateToTab('maturity')} />

      <FaqSection />

      <Footer />

    </div>

  );

}


