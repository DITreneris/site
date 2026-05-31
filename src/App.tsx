import { useCallback, useEffect, useRef, useState } from 'react';

import Header from './components/layout/Header';

import Hero from './components/layout/Hero';

import ProblemSolution from './components/layout/ProblemSolution';

import StatsStrip from './components/layout/StatsStrip';

import ClosingCta from './components/layout/ClosingCta';

import Footer from './components/layout/Footer';

import EcosystemMap from './components/ecosystem/EcosystemMap';

import AnatomizerBuilder from './components/anatomizer/AnatomizerBuilder';

import MaturityQuiz from './components/maturity/MaturityQuiz';

import type { TabId } from './types';

import { hashForTab, tabFromHash } from './utils/tabNavigation';



export default function App() {

  const [activeTab, setActiveTab] = useState<TabId>(() => tabFromHash(window.location.hash));

  const [selectedDomain, setSelectedDomain] = useState('app');

  const didMount = useRef(false);



  const navigateToTab = useCallback((tab: TabId) => {

    setActiveTab(tab);

    const target = hashForTab(tab);

    if (window.location.hash !== target) {

      window.history.replaceState(null, '', target);

    }

  }, []);



  useEffect(() => {

    const onHashChange = () => setActiveTab(tabFromHash(window.location.hash));

    window.addEventListener('hashchange', onHashChange);

    return () => window.removeEventListener('hashchange', onHashChange);

  }, []);



  // Bring the active panel into view on tab change (skip first render).

  useEffect(() => {

    if (!didMount.current) {

      didMount.current = true;

      return;

    }

    const main = document.getElementById('main-content');

    if (!main) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    main.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });

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



      <ClosingCta onStartAssessment={() => navigateToTab('maturity')} />

      <Footer />

    </div>

  );

}


