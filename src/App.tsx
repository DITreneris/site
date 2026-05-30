import { useEffect, useRef, useState } from 'react';
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

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('ecosystem');
  const [selectedDomain, setSelectedDomain] = useState('app');
  const didMount = useRef(false);

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
    setActiveTab('ecosystem');
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
        onTabChange={setActiveTab}
        onLogoClick={() => {
          setActiveTab('ecosystem');
          setSelectedDomain('app');
        }}
      />

      <Hero onStartAssessment={() => setActiveTab('maturity')} />

      <ProblemSolution />
      <StatsStrip />

      <main id="main-content" className="scroll-mt-16">
        {activeTab === 'ecosystem' && (
          <div
            key="ecosystem"
            role="tabpanel"
            id="panel-ecosystem"
            aria-label="Ecosystem"
            tabIndex={0}
            className="animate-panel-in"
          >
            <EcosystemMap
              selectedDomain={selectedDomain}
              onSelectDomain={setSelectedDomain}
              onOpenAnatomizer={() => setActiveTab('anatomizer')}
            />
          </div>
        )}
        {activeTab === 'anatomizer' && (
          <div
            key="anatomizer"
            role="tabpanel"
            id="panel-anatomizer"
            aria-label="Prompt Builder"
            tabIndex={0}
            className="animate-panel-in"
          >
            <AnatomizerBuilder />
          </div>
        )}
        {activeTab === 'maturity' && (
          <div
            key="maturity"
            role="tabpanel"
            id="panel-maturity"
            aria-label="Team Assessment"
            tabIndex={0}
            className="animate-panel-in"
          >
            <MaturityQuiz onPivot={pivotToDomain} />
          </div>
        )}
      </main>

      <ClosingCta onStartAssessment={() => setActiveTab('maturity')} />
      <Footer />
    </div>
  );
}
