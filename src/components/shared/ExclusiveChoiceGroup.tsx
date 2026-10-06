import { useId, useRef, type KeyboardEvent, type ReactNode } from 'react';

export interface ExclusiveChoiceOption {
  id: string;
  label: ReactNode;
  description?: string;
}

interface ExclusiveChoiceGroupProps {
  legend: string;
  /** When true, legend is visually hidden (sr-only). */
  legendSrOnly?: boolean;
  value: number | null;
  onChange: (index: number) => void;
  options: ExclusiveChoiceOption[];
  /** Grid columns: 1 = stacked, 2–3 = chip grid. Default 2. */
  columns?: 1 | 2 | 3;
  className?: string;
}

const COLUMN_CLASS: Record<1 | 2 | 3, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-2 sm:grid-cols-3',
};

export default function ExclusiveChoiceGroup({
  legend,
  legendSrOnly = false,
  value,
  onChange,
  options,
  columns = 2,
  className,
}: ExclusiveChoiceGroupProps) {
  const legendId = useId();
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusAndSelect = (next: number) => {
    const clamped = Math.max(0, Math.min(options.length - 1, next));
    onChange(clamped);
    queueMicrotask(() => buttonRefs.current[clamped]?.focus());
  };

  const focusedIndex = () => {
    const idx = buttonRefs.current.findIndex((el) => el === document.activeElement);
    return idx >= 0 ? idx : 0;
  };

  /** Unselected group: step off the focused radio. Selected group: clamp, do not wrap. */
  const move = (delta: number) => {
    if (value === null) {
      const from = focusedIndex();
      const next = from + delta;
      if (next < 0) focusAndSelect(options.length - 1);
      else if (next >= options.length) focusAndSelect(0);
      else focusAndSelect(next);
      return;
    }
    focusAndSelect(value + delta);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (options.length === 0) return;

    const fromNull = value === null;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        move(1);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        move(-1);
        break;
      case 'Home':
        event.preventDefault();
        focusAndSelect(0);
        break;
      case 'End':
        event.preventDefault();
        focusAndSelect(options.length - 1);
        break;
      case ' ':
      case 'Enter':
        if (fromNull) {
          event.preventDefault();
          focusAndSelect(0);
        }
        break;
      default:
        break;
    }
  };

  const stacked = columns === 1;

  return (
    <div
      role="radiogroup"
      aria-labelledby={legendId}
      className={className}
      onKeyDown={onKeyDown}
    >
      <span
        id={legendId}
        className={legendSrOnly ? 'sr-only' : 'text-eyebrow-light'}
      >
        {legend}
      </span>
      <div className={`grid gap-2 ${COLUMN_CLASS[columns]} ${legendSrOnly ? '' : 'mt-2'}`}>
        {options.map((option, i) => {
          const selected = value === i;
          const tabbable = selected || (value === null && i === 0);
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={selected}
              tabIndex={tabbable ? 0 : -1}
              ref={(el) => {
                buttonRefs.current[i] = el;
              }}
              onClick={() => onChange(i)}
              className={
                stacked
                  ? `quiz-option group min-h-[44px] ${
                      selected ? 'border-brand-accent bg-accent-muted-bg' : ''
                    }`
                  : `rounded-lg border min-h-[44px] px-2 py-2.5 text-center text-sm font-bold transition-all focus-ring active:scale-[0.98] ${
                      selected
                        ? 'border-brand-accent bg-accent-muted-bg text-brand-dark'
                        : 'border-subtle text-body-strong hover:border-slate-300 hover:text-brand-dark'
                    }`
              }
            >
              {stacked ? (
                <span className="flex w-full flex-col gap-1 text-left">
                  <span
                    className={`text-sm font-bold ${
                      selected ? 'text-brand-dark' : 'text-body group-hover:text-brand-dark'
                    }`}
                  >
                    {option.label}
                  </span>
                  {option.description ? (
                    <span className="text-sm font-normal leading-relaxed text-muted">
                      {option.description}
                    </span>
                  ) : null}
                </span>
              ) : (
                option.label
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
