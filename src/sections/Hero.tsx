import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import CityBackdrop from '../components/CityBackdrop';
import BallotBox from '../components/BallotBox';
import { PETITION_URL, SITE } from '../content/site';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

interface HeroProps {
  signedCount: number | null;
  groupCount: number | null;
  groupNames: string[];
  groupState: 'loading' | 'error' | 'empty' | 'ready';
}

function StatChip({ label, count, unit }: { label: string; count: number | null; unit: string }) {
  return (
    <div className="flex min-h-20 flex-col justify-center border border-ink/15 bg-white/70 px-5 py-3 text-left">
      <span className="text-sm text-ink/70">{label}</span>
      <span className="mt-1 flex items-baseline gap-2">
        <span className="font-display text-3xl leading-none text-purple-deep">{count === null ? '—' : count}</span>
        <span className="text-sm text-ink/70">{unit}</span>
      </span>
    </div>
  );
}

function GroupNames({ names, state }: { names: string[]; state: HeroProps['groupState'] }) {
  const content = state === 'loading'
    ? '載入中'
    : state === 'error'
      ? '名單暫時無法載入'
      : state === 'empty'
        ? '尚無團體名單'
        : names.join('、');

  return (
    <div className="min-h-20 border border-ink/15 bg-white/70 px-5 py-3 text-left sm:col-span-2 lg:col-span-1">
      <span className="text-sm text-ink/70">團體名稱</span>
      <p className="mt-1 text-sm leading-6 text-ink/85">{content}</p>
    </div>
  );
}

export default function Hero({ signedCount, groupCount, groupNames, groupState }: HeroProps) {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.from('.hero-enter', { y: 24, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power2.out' });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="top" ref={rootRef} className="relative flex min-h-svh flex-col overflow-hidden">
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-6 pt-28 pb-4 text-center">
        <div className="hero-enter flex items-center gap-3">
          <BallotBox className="h-11 w-11" />
          <p className="font-display text-lg tracking-[0.3em] text-ink">{SITE.heroKicker}</p>
        </div>
        <h1 className="hero-enter gradient-title mt-3 font-display text-[clamp(2.2rem,7vw,4rem)] leading-tight tracking-wide">
          <span className="block">永續韌性城市</span>
          <span className="block">政策承諾</span>
        </h1>
        <p className="hero-enter mt-5 font-display text-[clamp(1.1rem,3.5vw,1.5rem)] text-ink">
          {SITE.slogan}
        </p>
        <p className="hero-enter mt-4 max-w-2xl text-base leading-7 text-ink/80">{SITE.heroSub}</p>
        <p className="hero-enter mt-2 max-w-2xl text-base leading-7 text-ink/80">{SITE.heroSub2}</p>
        <div className="hero-enter mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href={PETITION_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-purple-deep px-7 py-3 font-bold text-white transition-colors hover:bg-purple-mid"
          >
            加入連署
          </a>
          <a
            href={`#${SITE.sections.board.id}`}
            className="rounded-full border-2 border-purple-deep px-7 py-3 font-bold text-purple-deep transition-colors hover:bg-purple-deep/10"
          >
            看簽署結果
          </a>
        </div>
        <div className="hero-enter mt-8 grid w-full max-w-3xl grid-cols-2 gap-3 text-left lg:grid-cols-3">
          <StatChip label="候選人連署數量" count={signedCount} unit="位" />
          <StatChip label="團體連署數量" count={groupCount} unit="個" />
          <GroupNames names={groupNames} state={groupState} />
        </div>
      </div>
      <div className="pointer-events-none h-[180px] w-full overflow-hidden sm:h-[250px]">
        <CityBackdrop className="h-full w-full" />
      </div>
    </section>
  );
}
