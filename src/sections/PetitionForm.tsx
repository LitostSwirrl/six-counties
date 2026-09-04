import { PETITION_URL, SITE } from '../content/site';

export default function PetitionForm() {
  return (
    <section id={SITE.sections.join.id} className="bg-purple-deep/[0.03] py-24">
      <div className="mx-auto max-w-xl px-6 text-center">
        <h2 className="font-display text-3xl tracking-[0.2em] text-ink md:text-4xl">
          {SITE.sections.join.title}
        </h2>
        <p className="mt-4 text-base leading-7 text-ink/75">
          <span className="block">連署名單會在十月的記者會上，連同候選人簽署結果一起公開。</span>
          <span className="block">留下你的名字，一起要求候選人公開承諾。</span>
        </p>
        <a
          href={PETITION_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-10 inline-block rounded-full bg-purple-deep px-8 py-3.5 font-bold text-white transition-colors hover:bg-purple-mid"
        >
          前往 Google 表單
        </a>
      </div>
    </section>
  );
}
