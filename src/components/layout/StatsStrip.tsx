import { useEffect, useRef, useState } from 'react';
import { Zap } from 'lucide-react';

type Stat = { to: number; prefix?: string; suffix?: string; label: string };

const STATS: Stat[] = [
  { to: 600, suffix: '+', label: 'Copy-ready templates & workflows' },
  { to: 60, label: 'Evaluated business AI tools' },
  { to: 100, label: 'Term AI & ML glossary' },
  { to: 50, prefix: '30-', suffix: '%', label: 'Target reduction in routine team work' },
];

const COUNT_DURATION = 1000;

function useInView<T extends Element>(threshold = 0.3) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry], obs) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.unobserve(entry.target);
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

function Counter({ to, prefix = '', suffix = '', start }: Stat & { start: boolean }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    if (prefersReducedMotion()) {
      setValue(to);
      return;
    }
    let frame = 0;
    let startTs = 0;
    const tick = (ts: number) => {
      if (!startTs) startTs = ts;
      const progress = Math.min((ts - startTs) / COUNT_DURATION, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(to * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, to]);

  return (
    <>
      {prefix}
      <span className="tabular-nums">{value}</span>
      {suffix}
    </>
  );
}

export default function StatsStrip() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section className="section-dark border-y border-white/10">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: 'var(--background-image-ecosystem-center-glow)' }}
      />
      <div
        ref={ref}
        className={`container-promo relative transition-all duration-700 ease-out ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
      >
        <div className="flex flex-col items-center justify-center gap-1 text-brand-accent">
          <div className="flex items-center gap-2">
            <Zap className="icon-sm" />
            <span className="text-label-upper">Prompt Anatomy</span>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-y-10 lg:grid-cols-4 lg:gap-y-0 lg:divide-x lg:divide-white/10">
          {STATS.map((stat) => (
            <div key={stat.label} className="px-4 text-center">
              <div className="bg-accent-gradient bg-clip-text text-5xl font-black leading-[var(--text-stat--line-height)] tracking-[-0.02em] text-transparent sm:text-[length:var(--text-stat)]">
                <Counter {...stat} start={inView} />
              </div>
              <div className="mx-auto mt-3 max-w-[14rem] text-xs leading-relaxed text-slate-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-slate-500">
          Templates, tool references, and glossary terms span training and subdomain kits &mdash;
          not one downloadable library on one URL. The 30&ndash;50% target reflects workflow
          standardization, not full automation.
        </p>
      </div>
    </section>
  );
}
