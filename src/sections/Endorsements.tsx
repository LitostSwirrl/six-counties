import OrgGrid from '../components/OrgGrid';
import type { PetitionMessage } from '../data/petition';
import { SITE } from '../content/site';

interface EndorsementsProps {
  groupsState: 'loading' | 'error' | 'empty' | 'ready';
  groupNames: string[];
  individualCount: number | null;
  messages: PetitionMessage[];
}

export default function Endorsements({ groupsState, groupNames, individualCount, messages }: EndorsementsProps) {
  return (
    <section id={SITE.sections.endorse.id} className="mx-auto max-w-5xl px-6 py-24">
      <h2 className="text-center font-display text-3xl tracking-[0.2em] text-ink md:text-4xl">
        {SITE.sections.endorse.title}
      </h2>
      <div className="mt-12">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-lg text-purple-deep">{SITE.endorsementLabel}</h3>
          {groupsState === 'ready' ? <span className="text-sm text-ink/60">共 {groupNames.length} 個</span> : null}
        </div>
        {groupsState === 'loading' ? <p className="mt-4 text-sm text-ink/60">連署團體名單載入中⋯</p> : null}
        {groupsState === 'error' ? (
          <p className="mt-4 text-sm text-ink/60">名單暫時讀取失敗，稍後重新整理頁面即可再試。</p>
        ) : null}
        {groupsState === 'empty' ? (
          <p className="mt-4 text-sm text-ink/60">開放團體連署中，歡迎成為第一個響應的團體。</p>
        ) : null}
        {groupsState === 'ready' ? (
          <OrgGrid items={groupNames.map((name) => ({ name }))} className="mt-4" />
        ) : null}
      </div>
      <div className="mt-12">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-lg text-purple-deep">連署公民</h3>
          {individualCount === null ? null : <span className="text-sm text-ink/60">共 {individualCount} 位</span>}
        </div>
        {messages.length > 0 ? (
          <div className="marquee-wrap mt-4" aria-label="連署人留言">
            <div className="marquee-track marquee-track-fast flex gap-4">
              {[...messages, ...messages].map((m, i) => (
                <figure
                  key={`${m.name}-${i}`}
                  className="w-64 shrink-0 rounded-2xl border border-ink/10 bg-white/85 p-4"
                  aria-hidden={i >= messages.length}
                >
                  <blockquote className="text-sm leading-6 text-ink/80">{m.message}</blockquote>
                  <figcaption className="mt-2 text-xs font-bold text-purple-mid">{m.name}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
