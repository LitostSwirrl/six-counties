import { PETITION_URL, SITE } from '../content/site';

export default function PetitionForm() {
  return (
    <section id={SITE.sections.join.id} className="bg-purple-deep/[0.03] py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-3xl tracking-[0.2em] text-ink md:text-4xl">
          {SITE.sections.join.title}
        </h2>
        <p className="mt-4 text-base leading-7 text-ink/75">
          {SITE.joinLines.map((line) => (
            <span key={line} className="md:block">
              {line}
            </span>
          ))}
        </p>
        <a
          href={PETITION_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-10 inline-block rounded-full bg-purple-deep px-8 py-3.5 font-bold text-white transition-colors hover:bg-purple-mid"
        >
          {SITE.joinCta}
        </a>
      </div>
    </section>
  );
}
