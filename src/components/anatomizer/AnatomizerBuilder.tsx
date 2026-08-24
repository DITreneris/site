import { useMemo, useState } from 'react';
import { Terminal, Copy, Check, ShieldCheck, ExternalLink } from 'lucide-react';
import LayerSelector from './LayerSelector';
import {
  ANATOMY_BUILDER_ITEMS,
  ANATOMY_LAYERS,
  ANATOMY_SCENARIOS,
  PRE_COPY_CHECKS,
  type PreCopyCheckId,
} from '../../data/anatomyBuilder';
import { platformHref } from '../../data/siteContact';
import { trackEvent } from '../../utils/trackEvent';
import type { AnatomyLayerKey } from '../../types';

type SelectionState = Record<AnatomyLayerKey, number>;
type CheckState = Record<PreCopyCheckId, boolean>;

const INITIAL: SelectionState = {
  persona: 0,
  context: 0,
  variable: 0,
  instruction: 0,
  constraint: 0,
};

const INITIAL_CHECKS: CheckState = {
  role: false,
  context: false,
  format: false,
};

export default function AnatomizerBuilder() {
  const [selection, setSelection] = useState<SelectionState>(INITIAL);
  const [checks, setChecks] = useState<CheckState>(INITIAL_CHECKS);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [showPlatformBridge, setShowPlatformBridge] = useState(false);
  const [activeScenario, setActiveScenario] = useState<string | null>(null);

  const assembledPrompt = useMemo(() => {
    const blocks = ANATOMY_LAYERS.map((layer) => {
      const option = ANATOMY_BUILDER_ITEMS[layer.key][selection[layer.key]];
      return `[${layer.blockTag}]\n${option.content}`;
    });
    return `${blocks.join('\n\n')}\n\n### BEGIN RESPONSE ACCORDING TO SYSTEM RULES`;
  }, [selection]);

  const allChecked = PRE_COPY_CHECKS.every((item) => checks[item.id]);

  const handleSelect = (key: AnatomyLayerKey, index: number) => {
    if (selection[key] === index) return;
    setChecks(INITIAL_CHECKS);
    setActiveScenario(null);
    setSelection((prev) => ({ ...prev, [key]: index }));
  };

  const loadScenario = (id: string) => {
    const scenario = ANATOMY_SCENARIOS.find((s) => s.id === id);
    if (!scenario) return;
    setSelection({ ...scenario.selection });
    setChecks(INITIAL_CHECKS);
    setActiveScenario(id);
  };

  const toggleCheck = (id: PreCopyCheckId) => {
    setChecks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopy = async () => {
    if (!allChecked) return;
    try {
      await navigator.clipboard.writeText(assembledPrompt);
      setCopyError(false);
      setCopied(true);
      setShowPlatformBridge(true);
      trackEvent('anatomizer_copy');
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
        <div className="max-w-2xl" id="anatomizer-builder">
          <span className="text-eyebrow-light">The Anatomizer</span>
          <h2 className="section-heading mt-2">Build a structured prompt, layer by layer</h2>
          <p className="mt-3 text-sm leading-relaxed text-body">
            Assemble five layers into a live prompt. The course drills the full 6-block system:
            META, INPUT, OUTPUT, REASONING, QUALITY, ADVANCED.{' '}
            <a href="#method" className="link-footer-meta">
              How lesson, demo, and course relate
            </a>
          </p>
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Kit scenario presets">
          {ANATOMY_SCENARIOS.map((scenario) => (
            <button
              key={scenario.id}
              type="button"
              onClick={() => loadScenario(scenario.id)}
              className={
                activeScenario === scenario.id
                  ? 'btn-secondary-md border-brand-accent'
                  : 'btn-secondary-md'
              }
              aria-pressed={activeScenario === scenario.id}
            >
              {scenario.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-6">
            {ANATOMY_LAYERS.map((layer) => (
              <LayerSelector
                key={layer.key}
                label={layer.label}
                options={ANATOMY_BUILDER_ITEMS[layer.key]}
                selectedIndex={selection[layer.key]}
                onSelect={(index) => handleSelect(layer.key, index)}
              />
            ))}
          </div>

          <div className="space-y-4 lg:col-span-6">
            <div className="shell-terminal">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 px-5 py-3">
                <span className="flex items-center gap-2 font-mono text-caption font-bold text-on-dark">
                  <Terminal className="icon-sm text-brand-accent" />
                  anatomy_template.md
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={!allChecked}
                  className="btn-tertiary-sm disabled:cursor-not-allowed disabled:opacity-40"
                  aria-live="polite"
                  aria-describedby="pre-copy-hint"
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
              <pre className="scrollbar-thin-dark max-h-[480px] overflow-y-auto whitespace-pre-wrap break-words p-5 font-mono text-caption leading-relaxed text-on-dark">
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

            <div className="callout-accent">
              <p id="pre-copy-hint" className="text-eyebrow-light">
                Before you copy
              </p>
              <p className="mt-1 text-caption leading-relaxed text-body">
                Confirm the three checks before copying.
              </p>
              <ul className="mt-3 space-y-1">
                {PRE_COPY_CHECKS.map((item) => (
                  <li key={item.id}>
                    <label className="flex min-h-[44px] cursor-pointer items-center gap-3 rounded-lg px-1 py-1 hover:bg-white/50">
                      <input
                        type="checkbox"
                        checked={checks[item.id]}
                        onChange={() => toggleCheck(item.id)}
                        className="h-4 w-4 shrink-0 rounded border-slate-300 text-brand-accent focus-ring"
                      />
                      <span className="text-caption text-body-strong">{item.label}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {showPlatformBridge && (
              <div className="callout-accent space-y-3">
                <p className="text-caption leading-relaxed text-body">
                  This demo uses five layers. The course teaches META → INPUT → OUTPUT →
                  REASONING → QUALITY → ADVANCED.
                </p>
                <a
                  href={platformHref('anatomizer')}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary-md"
                  onClick={() =>
                    trackEvent('platform_outbound', { source: 'anatomizer' })
                  }
                >
                  Open the platform
                  <ExternalLink className="icon-sm" />
                </a>
              </div>
            )}

            <div className="callout-accent flex items-start gap-3">
              <ShieldCheck className="icon-sm mt-0.5 flex-shrink-0 text-brand-accent" />
              <p className="text-caption leading-relaxed text-body">
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
