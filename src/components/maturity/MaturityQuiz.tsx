import { useState } from 'react';
import {
  ChevronRight,
  AlertTriangle,
  Award,
  ArrowRight,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';
import { MATURITY_QUIZ, calculateQuizResult } from '../../data/maturityQuiz';
import { DOMAINS } from '../../data/domains';
import type { QuizResult } from '../../types';

interface MaturityQuizProps {
  onPivot: (domainId: string) => void;
}

export default function MaturityQuiz({ onPivot }: MaturityQuizProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<QuizResult | null>(null);

  const handleOption = (score: number) => {
    const updated = { ...answers, [step]: score };
    setAnswers(updated);
    if (step < MATURITY_QUIZ.length - 1) {
      setStep((s) => s + 1);
    } else {
      const total = Object.values(updated).reduce((acc, cur) => acc + cur, 0);
      setResult(calculateQuizResult(total));
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
  };

  const recommended = result
    ? DOMAINS.find((d) => d.id === result.recommendedId)
    : undefined;

  return (
    <section className="section-default">
      <div className="container-narrow space-y-6">
        <div className="text-center">
          <span className="text-label-upper text-amber-700">Team assessment</span>
          <h2 className="section-heading mt-2">AI operational maturity diagnostic</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-600">
            Evaluate how consistently your organization manages prompts, instructions, and
            workflows. Get your readiness tier in three questions.
          </p>
        </div>

        {!result ? (
          <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-tier-1 sm:p-8">
            <div className="flex items-center justify-between">
              <span className="text-label-upper text-amber-700">
                Question {step + 1} of {MATURITY_QUIZ.length}
              </span>
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

            <div key={step} className="animate-panel-in space-y-6">
              <h3 className="text-base font-bold text-brand-dark sm:text-lg">
                {MATURITY_QUIZ[step].question}
              </h3>

              <div className="space-y-2.5">
                {MATURITY_QUIZ[step].options.map((opt) => (
                  <button
                    key={opt.text}
                    onClick={() => handleOption(opt.score)}
                    className="hover-lift group flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white p-4 text-left hover:border-brand-accent/50 hover:bg-accent-muted-bg focus-ring"
                  >
                    <span className="text-xs text-slate-600 group-hover:text-brand-dark">
                      {opt.text}
                    </span>
                    <ChevronRight className="icon-sm flex-shrink-0 text-slate-400 group-hover:text-brand-accent" />
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
              <span className="badge-accent mx-auto">Diagnostic outcome</span>
              <h3 className="text-lg font-extrabold text-brand-dark">{result.title}</h3>
              <p className="text-xs text-slate-500">
                Maturity score:{' '}
                <strong className="text-brand-dark">{result.score}</strong> / {result.maxScore}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-1.5 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-amber-600">
                  <AlertTriangle className="icon-sm" />
                  <h4 className="text-label-upper">Current state</h4>
                </div>
                <p className="text-xs leading-relaxed text-slate-600">{result.description}</p>
              </div>

              <div className="flex flex-col justify-between rounded-xl border border-accent-muted-border bg-accent-muted-bg p-4">
                <div>
                  <div className="flex items-center gap-2 text-brand-accent">
                    <Award className="icon-sm" />
                    <h4 className="text-label-upper text-amber-700">Recommended next stage</h4>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">
                    {recommended
                      ? `Start with ${recommended.title} (${recommended.domain}).`
                      : 'Explore the recommended stage.'}
                  </p>
                </div>
                <div className="mt-3 space-y-2">
                  {recommended && (
                    <a
                      href={`https://${recommended.domain}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-primary-md w-full"
                    >
                      Open {recommended.domain}
                      <ExternalLink className="icon-sm" />
                    </a>
                  )}
                  <button
                    onClick={() => onPivot(result.recommendedId)}
                    className="btn-secondary-md w-full"
                  >
                    See your recommended starting point
                    <ArrowRight className="icon-sm" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-center border-t border-slate-200 pt-4">
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
