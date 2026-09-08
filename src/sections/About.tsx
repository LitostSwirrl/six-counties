import OrgGrid from '../components/OrgGrid';
import { ORGS } from '../content/orgs';
import { SITE } from '../content/site';

export default function About() {
  return (
    <section id={SITE.sections.about.id} className="mx-auto max-w-5xl px-6 py-24">
      <h2 className="text-center font-display text-3xl tracking-[0.2em] text-ink md:text-4xl">
        {SITE.sections.about.title}
      </h2>
      <p className="mx-auto mt-4 text-center text-base leading-7 text-ink/75">
        {SITE.aboutLines.map((line) => (
          <span key={line} className="lg:block">
            {line}
          </span>
        ))}
      </p>
      <OrgGrid items={ORGS} variant="tile" className="mx-auto mt-10 max-w-3xl" />
    </section>
  );
}
