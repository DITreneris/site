import type { AnatomyOption } from '../../types';

interface LayerSelectorProps {
  label: string;
  options: AnatomyOption[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export default function LayerSelector({
  label,
  options,
  selectedIndex,
  onSelect,
}: LayerSelectorProps) {
  return (
    <div className="card-light space-y-2">
      <span className="text-label-upper text-slate-500">{label}</span>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {options.map((option, i) => (
          <button
            key={option.title}
            onClick={() => onSelect(i)}
            className={`rounded-lg border min-h-[44px] px-2 py-2.5 text-center text-caption font-bold transition-all focus-ring active:scale-[0.98] ${
              selectedIndex === i
                ? 'border-brand-accent bg-accent-muted-bg text-brand-dark'
                : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:text-brand-dark'
            }`}
          >
            {option.title}
          </button>
        ))}
      </div>
    </div>
  );
}
