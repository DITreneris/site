import { useMemo, useState } from 'react';
import { Terminal, Copy, Check, ShieldCheck } from 'lucide-react';
import LayerSelector from './LayerSelector';
import { ANATOMY_BUILDER_ITEMS, ANATOMY_LAYERS } from '../../data/anatomyBuilder';
import type { AnatomyLayerKey } from '../../types';

type SelectionState = Record<AnatomyLayerKey, number>;

const INITIAL: SelectionState = {
  persona: 0,
  context: 0,
  variable: 0,
  instruction: 0,
  constraint: 0,
};

export default function AnatomizerBuilder() {
  const [selection, setSelection] = useState<SelectionState>(INITIAL);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  const assembledPrompt = useMemo(() => {
    const blocks = ANATOMY_LAYERS.map((layer) => {
      const option = ANATOMY_BUILDER_ITEMS[layer.key][selection[layer.key]];
      return `[${layer.blockTag}]\n${option.content}`;
    });
    return `${blocks.join('\n\n')}\n\n### BEGIN RESPONSE ACCORDING TO SYSTEM RULES`;
  }, [selection]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(assembledPrompt);
      setCopyError(false);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
      setCopyError(true);
      setTimeout(() => setCopyError(false), 2000);
    }
  };

  return (
    <section className="section-default">
      <div className="container-wide space-y-6">
        <div className="max-w-2xl">
          <span className="text-label-upper text-amber-700">The Anatomizer</span>
          <h2 className="section-heading mt-2">Build a structured prompt, layer by layer</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Instead of an ad-hoc chat message, assemble five explicit layers. Change any selection
            and watch the structured prompt rebuild in real time.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-6">
            {ANATOMY_LAYERS.map((layer) => (
              <LayerSelector
                key={layer.key}
                label={layer.label}
                options={ANATOMY_BUILDER_ITEMS[layer.key]}
                selectedIndex={selection[layer.key]}
                onSelect={(index) =>
                  setSelection((prev) => ({ ...prev, [layer.key]: index }))
                }
              />
            ))}
          </div>

          <div className="space-y-4 lg:col-span-6">
            <div className="overflow-hidden rounded-2xl border border-slate-800 bg-brand-dark shadow-tier-2">
              <div className="flex items-center justify-between border-b border-slate-800 px-5 py-3">
                <span className="flex items-center gap-2 font-mono text-caption font-bold text-slate-300">
                  <Terminal className="icon-sm text-brand-accent" />
                  anatomy_template.md
                </span>
                <button
                  onClick={handleCopy}
                  className="btn-tertiary-sm"
                  aria-live="polite"
                >
                  {copyError ? (
                    <>Copy failed</>
                  ) : copied ? (
                    <>
                      <Check className="icon-sm" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="icon-sm" />
                      Copy prompt
                    </>
                  )}
                </button>
              </div>
              <pre className="scrollbar-thin-dark max-h-[480px] overflow-y-auto whitespace-pre-wrap break-words p-5 font-mono text-caption leading-relaxed text-slate-300">
                {assembledPrompt.split('\n').map((line, i) => {
                  const highlight = /^\[.*\]$/.test(line) || line.startsWith('###');
                  return (
                    <span key={i} className={highlight ? 'font-bold text-brand-accent' : undefined}>
                      {line}
                      {'\n'}
                    </span>
                  );
                })}
              </pre>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-accent-muted-border bg-accent-muted-bg p-4">
              <ShieldCheck className="icon-sm mt-0.5 flex-shrink-0 text-brand-accent" />
              <p className="text-caption leading-relaxed text-slate-600">
                Explicit structural divisions stop models from generating conversational filler,
                keeping instructions repeatable and cost-efficient across the team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
