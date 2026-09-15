import { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Award,
  ArrowRight,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';
import { MATURITY_QUIZ, calculateQuizResult } from '../../data/maturityQuiz';
import { DOMAINS } from '../../data/domains';
import { execKitHref, kitHref, lessonHref, platformHref } from '../../data/siteContact';
import { trackEvent } from '../../utils/trackEvent';
import type { QuizResult } from '../../types';

interface MaturityQuizProps {
  onPivot: (domainId: string) => void;
}

export default function MaturityQuiz({ onPivot }: MaturityQuizProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<QuizResult | null>(null);

  const handleOption = (score: number) => {
    const current = step;
    const updated = { ...answers, [current]: score };
    setAnswers(updated);
    if (current < MATURITY_QUIZ.length - 1) {
      setStep(current + 1);
    } else {
      const total = Object.values(updated).reduce((acc, cur) => acc + cur, 0);
      const next = calculateQuizResult(total, updated);
      setResult(next);
      trackEvent('quiz_complete', {
        tier: next.title,
        score: next.score,
        recommended: next.recommendedId,
      });
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
  };

  const goBack = () => {
    if (step <= 0) return;
    setStep((s) => s - 1);
  };

  const recommended = result
    ? DOMAINS.find((d) => d.id === result.recommendedId)
    : undefined;

  return (
    <section className="section-default">
      <div className="container-narrow space-y-6">
        <div className="text-center">
          <span className="text-eyebrow-light">Team assessment</span>
          <h2 className="section-heading mt-2">60-second team assessment</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-body">
            Three questions on how your team manages prompts and workflows. Get a readiness tier
            and a starting stage.
          </p>
        </div>

        {!result ? (
          <div className="card-light-lg space-y-6">
            <div className="flex items-center justify-between gap-3">
              <span className="text-eyebrow-light">
                Question {step + 1} of {MATURITY_QUIZ.length}
              </span>
              <div className="flex items-center gap-3">
                {step > 0 && (
                  <button type="button" onClick={goBack} className="link-inline">
                    <ChevronLeft className="icon-sm" />
                    Back
                  </button>
                )}
                <div className="flex gap-1.5">
                  {MATURITY_QUIZ.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1 w-6 rounded ${
                        i === step
                          ? 'bg-brand-accent'
                          : i < step
                            ? 'bg-brand-accent/40'
                            : 'bg-slate-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div key={step} className="animate-panel-in space-y-6">
              <h3 className="text-base font-bold text-brand-dark sm:text-lg">
                {MATURITY_QUIZ[step].question}
              </h3>

              <div
                role="group"
                aria-label={MATURITY_QUIZ[step].question}
                className="space-y-2.5"
              >
                {MATURITY_QUIZ[step].options.map((opt) => (
                  <button
                    key={opt.text}
                    type="button"
                    onClick={() => handleOption(opt.score)}
                    className="quiz-option group"
                  >
                    <span className="text-xs text-body group-hover:text-brand-dark">
                      {opt.text}
                    </span>
                    <ChevronRight className="icon-sm flex-shrink-0 text-subtle group-hover:text-brand-accent" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div
            className="card-light-lg animate-panel-in space-y-6"
            aria-live="polite"
            aria-atomic="true"
          >
            <div className="space-y-2 text-center">
              <span className="badge-accent mx-auto">Your tier</span>
              <h3 className="text-lg font-extrabold text-brand-dark">{result.title}</h3>
              <p className="text-xs text-muted">
                Maturity score:{' '}
                <strong className="text-brand-dark">{result.score}</strong> / {result.maxScore}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-1.5 rounded-xl border border-subtle surface-muted p-4">
                <div className="flex items-center gap-2 text-amber-600">
                  <AlertTriangle className="icon-sm" />
                  <h4 className="text-label-upper">Current state</h4>
                </div>
                <p className="text-xs leading-relaxed text-body">{result.description}</p>
                {result.diagnostics.length > 0 && (
                  <div className="mt-3 border-t border-subtle pt-3">
                    <h5 className="text-label-upper text-muted">What this means</h5>
                    <ul className="mt-2 space-y-2">
                      {result.diagnostics.map((line) => (
                        <li key={line} className="text-xs leading-relaxed text-body">
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="callout-accent flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-brand-accent">
                    <Award className="icon-sm" />
                    <h4 className="text-eyebrow-light">Recommended next stage</h4>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-body">
                    {recommended
                      ? `Start with ${recommended.title} (${recommended.domain}).`
                      : 'Explore the recommended stage.'}
                  </p>
                </div>
                <div className="mt-3 space-y-2">
                  {recommended && result.recommendedId === 'cloud' && (
                    <a
                      href={lessonHref('quiz_result')}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-primary-md w-full"
                      onClick={() =>
                        trackEvent('kit_outbound', {
                          domain: 'cloud',
                          source: 'quiz_result',
                        })
                      }
                    >
                      Start the free lesson
                      <ExternalLink className="icon-sm" />
                    </a>
                  )}
                  {recommended && result.recommendedId !== 'cloud' && (
                    <a
                      href={
                        recommended.id === 'pro'
                          ? execKitHref('quiz_result')
                          : kitHref(recommended.domain, 'quiz_result')
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="btn-primary-md w-full"
                      onClick={() =>
                        trackEvent('kit_outbound', {
                          domain: recommended.id,
                          source: 'quiz_result',
                        })
                      }
                    >
                      Open {recommended.domain}
                      <ExternalLink className="icon-sm" />
                    </a>
                  )}
                  <a
                    href={platformHref('quiz_result')}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary-md w-full"
                    onClick={() =>
                      trackEvent('platform_outbound', { source: 'quiz_result' })
                    }
                  >
                    Open the platform
                    <ExternalLink className="icon-sm" />
                  </a>
                  <button
                    type="button"
                    onClick={() => onPivot(result.recommendedId)}
                    className="link-inline mx-auto"
                  >
                    View starting stage
                    <ArrowRight className="icon-sm" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-center border-t border-subtle pt-4">
              <button onClick={reset} className="btn-secondary-md">
                <RefreshCw className="icon-sm" />
                Re-evaluate team
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
