import { useEffect, useRef, useState } from 'react';
import { NEWS, type NewsItem } from '../content/news';
import { mockNews } from '../content/newsMock';
import { SITE } from '../content/site';
import { fetchNews } from '../data/newsSheet';
import { useSheetData, type SheetDataState } from '../hooks/useSheetData';

const GRID_MAX = 3;
const CARD_WIDTH = 'w-[85%] sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]';

function newsFetcher(): () => Promise<NewsItem[]> {
  if (import.meta.env.DEV && typeof window !== 'undefined') {
    const count = Number(new URLSearchParams(window.location.search).get('news'));
    if (count > 0) return () => Promise.resolve(mockNews(count));
  }
  return fetchNews;
}

function SkeletonCard() {
  return (
    <div className="animate-pulse overflow-hidden rounded-3xl border border-ink/10 bg-white/60 motion-reduce:animate-none">
      <div className="aspect-[4/3] w-full bg-ink/10" />
      <div className="px-5 pt-4 pb-5">
        <div className="h-4 w-24 rounded bg-ink/10" />
        <div className="mt-4 h-5 w-full rounded bg-ink/10" />
        <div className="mt-2 h-5 w-3/4 rounded bg-ink/10" />
        <div className="mt-4 h-3 w-full rounded bg-ink/10" />
        <div className="mt-2 h-3 w-5/6 rounded bg-ink/10" />
      </div>
    </div>
  );
}

function NewsCard({ item }: { item: NewsItem }) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noreferrer"
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink/12 bg-white/80 transition-colors hover:border-purple-mid"
    >
      {item.image ? (
        <img src={item.image} alt={item.imageAlt ?? ''} loading="lazy" className="aspect-[4/3] w-full object-cover" />
      ) : (
        <div className="aspect-[4/3] w-full bg-ink/[0.07]" />
      )}
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
  );
}

function ArrowButton({ direction, disabled, onClick }: { direction: 'prev' | 'next'; disabled: boolean; onClick: () => void }) {
  const side = direction === 'prev' ? '-left-5 lg:-left-7' : '-right-5 lg:-right-7';
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === 'prev' ? '上一頁' : '下一頁'}
      className={`absolute top-1/2 ${side} hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ink/12 bg-white text-purple-deep shadow-sm transition-colors hover:border-purple-mid hover:bg-purple-deep hover:text-white disabled:cursor-default disabled:opacity-30 disabled:hover:border-ink/12 disabled:hover:bg-white disabled:hover:text-purple-deep sm:flex`}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {direction === 'prev' ? <path d="M15 5l-7 7 7 7" /> : <path d="M9 5l7 7-7 7" />}
      </svg>
    </button>
  );
}

function NewsCarousel({ items }: { items: NewsItem[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      setAtStart(track.scrollLeft <= 1);
      setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 1);
    };
    update();
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      track.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [items.length]);

  const page = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth, behavior: 'smooth' });
  };

  return (
    <div className="relative mt-12" aria-label="最新消息輪播">
      <ul ref={trackRef} className="news-track flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2">
        {items.map((item) => (
          <li key={item.href} className={`shrink-0 snap-start ${CARD_WIDTH}`}>
            <NewsCard item={item} />
          </li>
        ))}
      </ul>
      <ArrowButton direction="prev" disabled={atStart} onClick={() => page(-1)} />
      <ArrowButton direction="next" disabled={atEnd} onClick={() => page(1)} />
    </div>
  );
}

export function NewsCards({ items }: { items: NewsItem[] }) {
  if (items.length === 0) {
    return <p className="mt-4 text-center text-base leading-7 text-ink/75">目前還沒有消息，敬請期待。</p>;
  }
  if (items.length > GRID_MAX) return <NewsCarousel items={items} />;
  return (
    <ul className="mt-12 flex flex-wrap justify-center gap-6">
      {items.map((item) => (
        <li key={item.href} className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]">
          <NewsCard item={item} />
        </li>
      ))}
    </ul>
  );
}

export function NewsBody({ state, items }: { state: SheetDataState; items: NewsItem[] }) {
  if (state === 'loading') {
    return (
      <ul aria-busy="true" className="mt-12 flex flex-wrap justify-center gap-6">
        {Array.from({ length: GRID_MAX }, (_, i) => (
          <li key={i} className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]">
            <SkeletonCard />
          </li>
        ))}
      </ul>
    );
  }
  if (state === 'error') return <NewsCards items={NEWS} />;
  return <NewsCards items={items} />;
}

export default function News() {
  const { state, data } = useSheetData(newsFetcher());
  return (
    <section id={SITE.sections.news.id} className="bg-white/40 py-24">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-center font-display text-3xl tracking-[0.2em] text-ink md:text-4xl">
          {SITE.sections.news.title}
        </h2>
        <NewsBody state={state} items={data} />
      </div>
    </section>
  );
}
