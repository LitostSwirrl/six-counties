import { NEWS } from '../content/news';
import { SITE } from '../content/site';

export default function News() {
  return (
    <section id={SITE.sections.news.id} className="bg-white/40 py-24">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-center font-display text-3xl tracking-[0.2em] text-ink md:text-4xl">
          {SITE.sections.news.title}
        </h2>
        {NEWS.length === 0 ? (
          <p className="mt-4 text-center text-base leading-7 text-ink/75">目前還沒有消息，敬請期待。</p>
        ) : (
          <ul className="mt-12 flex flex-wrap justify-center gap-6">
            {NEWS.map((item) => (
              <li key={item.href} className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]">
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink/12 bg-white/80 transition-colors hover:border-purple-mid"
                >
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <div className="flex flex-1 flex-col px-5 pt-4 pb-5">
                    <div className="flex items-center justify-between gap-3 border-b border-ink/10 pb-3">
                      <span className="rounded-full bg-purple-deep/10 px-3 py-1 text-xs font-bold text-purple-deep">{item.kind}</span>
                      <time dateTime={item.date} className="font-display text-sm text-ink/70">
                        {item.date}
                      </time>
                    </div>
                    <h3 className="mt-3 font-display text-lg leading-7 text-ink transition-colors group-hover:text-purple-deep">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-ink/70">{item.summary}</p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
