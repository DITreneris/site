import { Zap } from 'lucide-react';

interface BrandLockupProps {
  /** Light page: Prompt is navy. Navy bar: Prompt is white. Anatomy stays gold. */
  tone?: 'light' | 'navy';
}

export default function BrandLockup({ tone = 'light' }: BrandLockupProps) {
  const promptColor = tone === 'navy' ? 'text-white' : 'text-brand-dark';

  return (
    <span className="flex items-center gap-2.5 sm:gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-brand-dark text-brand-accent sm:h-10 sm:w-10">
        <Zap className="icon-md fill-current" aria-hidden />
      </span>
      <span className="text-lg font-black leading-none tracking-tight sm:text-xl">
        <span className={promptColor}>Prompt </span>
        <span className="text-brand-accent">Anatomy</span>
      </span>
    </span>
  );
}
