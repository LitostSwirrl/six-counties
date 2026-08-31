import type { EndorsingOrg } from '../data/types';
import type { PetitionStats } from '../data/petition';
import { ORGS } from '../content/orgs';
import { SITE } from '../content/site';
import CountUp from '../components/CountUp';

interface EndorsementsProps {
  orgsState: 'loading' | 'error' | 'empty' | 'ready';
  orgs: EndorsingOrg[];
  stats: PetitionStats | null;
  statsFailed: boolean;
}

function OrgChip({ name, url }: { name: string; url: string }) {
  if (!url) {
    return <span className="block min-w-0 break-words rounded-lg border border-ink/15 bg-white/80 px-4 py-2 text-sm">{name}</span>;
  }
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="flex min-w-0 items-center justify-between gap-1.5 break-words rounded-lg border border-ink/15 bg-white/80 px-4 py-2 text-sm transition-colors hover:border-purple-mid hover:text-purple-deep"
    >
      {name}
      <svg viewBox="0 0 16 16" className="h-3 w-3 opacity-50" aria-hidden="true">
        <path d="M6 3 H13 V10 M13 3 L3 13" stroke="currentColor" strokeWidth={1.8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}

export default function Endorsements({ orgsState, orgs, stats, statsFailed }: EndorsementsProps) {
  const messages = stats?.publicMessages ?? [];

  return (
    <section id={SITE.sections.endorse.id} className="mx-auto max-w-5xl px-6 py-24">
      <h2 className="text-center font-display text-3xl tracking-[0.2em] text-ink md:text-4xl">
        {SITE.sections.endorse.title}
      </h2>
      <div className="mt-12 grid gap-10 md:grid-cols-[1fr_auto]">
        <div>
          <h3 className="font-display text-lg text-purple-deep">發起團體</h3>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {ORGS.map((org) => (
              <OrgChip key={org.name} name={org.name} url={org.url} />
            ))}
          </div>
          <h3 className="mt-8 font-display text-lg text-purple-deep">{SITE.endorsementLabel}</h3>
          {orgsState === 'loading' ? (
            <p className="mt-4 text-sm text-ink/60">連署團體名單載入中⋯</p>
          ) : null}
          {orgsState === 'error' ? (
            <p className="mt-4 text-sm text-ink/60">名單暫時讀取失敗，稍後重新整理頁面即可再試。</p>
          ) : null}
          {orgsState === 'empty' ? (
            <p className="mt-4 text-sm text-ink/60">開放團體連署中，歡迎成為第一個響應的團體。</p>
          ) : null}
          {orgsState === 'ready' ? (
            <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {orgs.map((org) => (
                <OrgChip key={org.name} name={org.name} url={org.url} />
              ))}
            </div>
          ) : null}
        </div>
        <div className="flex flex-col items-center justify-center rounded-3xl border border-ink/10 bg-white/70 px-10 py-8 text-center">
          <p className="text-sm text-ink/70">已有</p>
          <p className="gradient-title font-display text-6xl leading-tight">
            {statsFailed ? '—' : <CountUp to={stats?.individualCount ?? 0} />}
          </p>
          <p className="text-sm text-ink/70">位公民加入連署</p>
          {statsFailed ? <p className="mt-2 text-xs text-ink/50">人數暫時讀取失敗</p> : null}
        </div>
      </div>
      {messages.length > 0 ? (
        <div className="marquee-wrap mt-12" aria-label="連署人留言">
          <div className="marquee-track flex gap-4">
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
    </section>
  );
}
