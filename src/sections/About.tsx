import OrgGrid from '../components/OrgGrid';
import { ORGS } from '../content/orgs';
import { SITE } from '../content/site';

export default function About() {
  return (
    <section id={SITE.sections.about.id} className="mx-auto max-w-5xl px-6 py-24">
      <h2 className="text-center font-display text-3xl tracking-[0.2em] text-ink md:text-4xl">
        {SITE.sections.about.title}
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-7 text-ink/75">
        這場行動由九個公民團體共同發起，成員長期分別耕耘能源、氣候、防災、河川、交通與障礙者權益等領域，這次共同要求六都市長候選人把永續與韌性納入市政承諾。
      </p>
      <OrgGrid items={ORGS} className="mt-10" />
    </section>
  );
}
