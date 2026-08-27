import { ORGS } from '../content/orgs';
import { SITE } from '../content/site';

export default function About() {
  return (
    <section id={SITE.sections.about.id} className="mx-auto max-w-5xl px-6 py-24">
      <h2 className="text-center font-display text-3xl tracking-[0.2em] text-ink md:text-4xl">
        {SITE.sections.about.title}
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-center text-[15px] leading-7 text-ink/75">
        這場行動由九個長期關注能源、環境、交通與居住議題的公民團體共同發起。我們各自在不同領域累積多年經驗，這次為了同一件事走在一起：讓永續與韌性成為六都市政的核心承諾。
      </p>
      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {ORGS.map((org) => (
          <a
            key={org.name}
            href={org.url || undefined}
            target={org.url ? '_blank' : undefined}
            rel={org.url ? 'noreferrer' : undefined}
            className={`flex items-center justify-between gap-2 rounded-2xl border border-ink/12 bg-white/75 px-5 py-4 font-display text-base text-ink ${org.url ? 'transition-colors hover:border-purple-mid hover:text-purple-deep' : ''}`}
          >
            {org.name}
            {org.url ? (
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0 opacity-45" aria-hidden="true">
                <path d="M6 3 H13 V10 M13 3 L3 13" stroke="currentColor" strokeWidth={1.8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : null}
          </a>
        ))}
      </div>
    </section>
  );
}
