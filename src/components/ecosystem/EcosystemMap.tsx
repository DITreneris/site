import { useMemo } from 'react';
import SequencePath from './SequencePath';
import DomainDetail from './DomainDetail';
import { DOMAINS } from '../../data/domains';

const ROLE_CHIPS: { label: string; domainId: string }[] = [
  { label: 'Ops', domainId: 'info' },
  { label: 'Marketing', domainId: 'space' },
  { label: 'HR', domainId: 'help' },
  { label: 'Exec', domainId: 'pro' },
];

interface EcosystemMapProps {
  selectedDomain: string;
  onSelectDomain: (id: string) => void;
  onOpenAnatomizer: (domainId: string) => void;
}

export default function EcosystemMap({
  selectedDomain,
  onSelectDomain,
  onOpenAnatomizer,
}: EcosystemMapProps) {
  const activeDomain = useMemo(
    () => DOMAINS.find((d) => d.id === selectedDomain) ?? DOMAINS[0],
    [selectedDomain],
  );

  return (
    <section className="section-dark">
      <div className="bg-ecosystem-grid pointer-events-none absolute inset-0 opacity-60" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: 'var(--background-image-ecosystem-center-glow)' }}
      />
      <div className="container-wide relative space-y-8">
        <div className="max-w-2xl">
          <span className="text-label-upper text-brand-accent">The ecosystem</span>
          <h2 className="mt-2 text-3xl font-black leading-tight tracking-[-0.02em] text-white md:text-4xl">
            Six-module training. Eight ecosystem stages. One core hub.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-on-dark">
            6-block training at the hub; role kits from first lesson to executive playbooks,
            plus knowledge depth and Play.
          </p>
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Jump to role">
          {ROLE_CHIPS.map((chip) => (
            <button
              key={chip.domainId}
              type="button"
              onClick={() => onSelectDomain(chip.domainId)}
              className={
                selectedDomain === chip.domainId
                  ? 'btn-secondary-dark border-brand-accent'
                  : 'btn-secondary-dark'
              }
              aria-pressed={selectedDomain === chip.domainId}
            >
              {chip.label}
            </button>
          ))}
        </div>

        <SequencePath selectedDomain={selectedDomain} onSelectDomain={onSelectDomain} />
        <DomainDetail
          key={activeDomain.id}
          domain={activeDomain}
          onOpenAnatomizer={onOpenAnatomizer}
        />
      </div>
    </section>
  );
}
