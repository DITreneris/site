import { useId, useRef, useState } from 'react';
import { Copy, Check, ArrowDown, ExternalLink } from 'lucide-react';
import ExclusiveChoiceGroup from '../shared/ExclusiveChoiceGroup';
import {
  CORRECT_PROMPT_PRACTICE,
  CORRECT_SOLUTION_COPYABLE,
} from '../../data/correctPromptPractice';
import { PLATFORM_URL } from '../../data/siteContact';
import { trackEvent } from '../../utils/trackEvent';

const platformHref = PLATFORM_URL.replace(/\/$/, '');

export default function CorrectPromptPractice() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const feedbackId = useId();
  const practiceTracked = useRef(false);

  const selected =
    selectedIndex !== null ? CORRECT_PROMPT_PRACTICE.choices[selectedIndex] : null;
  const isCorrect = selected?.isCorrect === true;

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    const choice = CORRECT_PROMPT_PRACTICE.choices[index];
    if (choice?.isCorrect && !practiceTracked.current) {
      practiceTracked.current = true;
      trackEvent('practice_complete');
    }
  };

  const handleCopy = async () => {
    if (!isCorrect) return;
    try {
      await navigator.clipboard.writeText(CORRECT_SOLUTION_COPYABLE);
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
    <section className="section-default pb-0">
      <div className="container-wide">
        <div className="card-light-lg space-y-6">
          <div className="max-w-2xl">
            <span className="text-eyebrow-light">Practice</span>
            <h2 className="mt-2 text-xl font-extrabold tracking-[-0.02em] text-brand-dark sm:text-2xl">
              {CORRECT_PROMPT_PRACTICE.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-body">
              {CORRECT_PROMPT_PRACTICE.intro}
            </p>
          </div>

          <div className="rounded-xl border border-subtle surface-muted p-4">
            <p className="text-label-upper text-muted">Weak prompt</p>
            <p className="mt-2 font-mono text-caption leading-relaxed text-body-strong">
              {CORRECT_PROMPT_PRACTICE.weakPrompt}
            </p>
          </div>

          <ExclusiveChoiceGroup
            legend="Choose the structured fix"
            value={selectedIndex}
            onChange={handleSelect}
            columns={1}
            options={CORRECT_PROMPT_PRACTICE.choices.map((choice) => ({
              id: choice.id,
              label: choice.label,
              description: choice.description,
            }))}
          />

          {selected && (
            <div
              id={feedbackId}
              className={
                isCorrect
                  ? 'callout-accent'
                  : 'rounded-xl border border-subtle surface-muted p-4'
              }
              aria-live="polite"
            >
              <p className="text-sm leading-relaxed text-body-strong">
                {isCorrect
                  ? CORRECT_PROMPT_PRACTICE.feedbackCorrect
                  : CORRECT_PROMPT_PRACTICE.feedbackIncorrect}
              </p>

              {isCorrect && (
                <div className="mt-4 space-y-3">
                  <pre className="max-h-48 overflow-y-auto whitespace-pre-wrap break-words rounded-lg border border-slate-800 bg-brand-dark p-4 font-mono text-caption leading-relaxed text-on-dark">
                    {CORRECT_SOLUTION_COPYABLE}
                  </pre>
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
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
                          Copy structured prompt
                        </>
                      )}
                    </button>
                    <a
                      href={platformHref}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-primary-md"
                      onClick={() =>
                        trackEvent('platform_outbound', { source: 'practice' })
                      }
                    >
                      Open the platform
                      <ExternalLink className="icon-sm" />
                    </a>
                    <a
                      href="#anatomizer-builder"
                      className="link-inline text-brand-dark hover:text-brand-accent"
                    >
                      {CORRECT_PROMPT_PRACTICE.buildOwnHint}
                      <ArrowDown className="icon-sm" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}

          <p className="text-caption text-muted">{CORRECT_PROMPT_PRACTICE.courseNote}</p>
        </div>
      </div>
    </section>
  );
}
