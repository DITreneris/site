import { X, Check, ArrowRight } from 'lucide-react';

const PROBLEMS = [
  'Rewritten from scratch, every time.',
  'Knowledge trapped in private chat threads.',
  'Quality depends on the individual.',
];

const SOLUTIONS = [
  'Templates make every output predictable.',
  'Workflows become reusable team assets.',
  'Roles, context, and constraints set the standard.',
];

export default function ProblemSolution() {
  return (
    <section className="section-default bg-slate-50">
      <div className="container-default">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="section-heading">More output is not less work</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Treating AI like a chat box buries teams in disposable output.
          </p>
        </div>

        <figure className="mx-auto mt-8 max-w-3xl overflow-hidden rounded-2xl shadow-tier-2">
          <img
            src="/creator-janitor.png"
            alt="A professional reduced to sorting a mountain of half-finished AI drafts into Keep, Fix, and Delete bins"
            className="block h-auto w-full"
            loading="lazy"
          />
        </figure>

        <div className="mt-10 grid grid-cols-1 items-stretch gap-4 md:grid-cols-[1fr_auto_1fr]">
          <div className="card-light">
            <h3 className="text-label-upper text-slate-500">Random prompting</h3>
            <ul className="mt-4 space-y-3">
              {PROBLEMS.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-slate-100">
                    <X className="icon-sm text-slate-400" />
                  </span>
                  <span className="text-sm leading-relaxed text-slate-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-center" aria-hidden="true">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-accent-muted-border bg-accent-muted-bg">
              <ArrowRight className="icon-md text-brand-accent" />
            </span>
          </div>

          <div className="card-light border-accent-muted-border shadow-tier-2">
            <h3 className="text-label-upper text-amber-700">Structured execution</h3>
            <ul className="mt-4 space-y-3">
              {SOLUTIONS.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent-muted-bg">
                    <Check className="icon-sm text-brand-accent" />
                  </span>
                  <span className="text-sm leading-relaxed text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
