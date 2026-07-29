import { SEO_FAQ } from '../../data/seoFaq';

export default function FaqSection() {
  return (
    <section className="section-default" id="faq" aria-labelledby="faq-heading">
      <div className="container-narrow space-y-8">
        <div className="text-center">
          <span className="text-eyebrow-light">FAQ</span>
          <h2 id="faq-heading" className="section-heading mt-2">
            Common questions
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-body">
            Short answers about the ecosystem, structured prompting, and where to start.
          </p>
        </div>

        <dl className="space-y-4">
          {SEO_FAQ.map((item) => (
            <div key={item.question} className="card-light space-y-2">
              <dt className="text-sm font-bold text-brand-dark">{item.question}</dt>
              <dd className="text-sm leading-relaxed text-body">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
