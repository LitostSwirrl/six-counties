import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import CityBackdrop from '../components/CityBackdrop';
import SigningHand from '../components/SigningHand';
import {
  HERO_BOARD_CTA,
  HERO_CANDIDATE_LABEL,
  HERO_CANDIDATE_LIST_HREF,
  HERO_CANDIDATE_LIST_LABEL,
  HERO_GROUP_LABEL,
  HERO_GROUP_LIST_HREF,
  HERO_GROUP_LIST_LABEL,
  PETITION_URL,
  SITE,
} from '../content/site';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

interface HeroProps {
  signedCount: number | null;
  groupCount: number | null;
}

interface StatChipProps {
  label: string;
  count: number | null;
  unit: string;
  actionLabel: string;
  actionHref: string;
}

function StatChip({ label, count, unit, actionLabel, actionHref }: StatChipProps) {
  return (
    <div className="relative flex min-h-32 flex-col justify-center border border-ink/15 bg-white/70 px-5 py-3 text-left">
      <span className="text-sm text-ink/70">{label}</span>
      <span className="mt-1 flex w-full items-baseline gap-2">
        <span className="font-display text-3xl leading-none text-purple-deep">{count === null ? '—' : count}</span>
        <span className="text-sm text-ink/70">{unit}</span>
        <a
          href={actionHref}
          className="absolute bottom-3 right-5 min-h-8 whitespace-nowrap py-1 text-xs font-bold text-purple-deep transition-colors hover:text-purple-mid lg:static lg:ml-auto lg:min-h-0 lg:py-0"
        >
          {actionLabel}
        </a>
      </span>
    </div>
  );
}

export default function Hero({ signedCount, groupCount }: HeroProps) {
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
        <h1 className="hero-enter font-display leading-tight tracking-wide">
          <span className="flex items-center justify-center gap-3 text-[clamp(1.3rem,4vw,1.9rem)] tracking-[0.3em] text-ink">
            <SigningHand className="h-11 w-11 shrink-0" />
            {SITE.heroKicker}
          </span>
          <span className="gradient-title mt-3 block text-[clamp(2.2rem,7vw,4rem)]">永續韌性城市</span>
          <span className="gradient-title block text-[clamp(2.2rem,7vw,4rem)]">政策承諾</span>
        </h1>
        <p className="hero-enter mt-5 font-display text-[clamp(1.1rem,3.5vw,1.5rem)] text-ink">
          {SITE.slogan}
        </p>
        <p className="hero-enter mt-4 max-w-2xl text-base leading-7 text-ink/80">
          {SITE.heroLines.map((line) => (
            <span key={line} className="md:block">
              {line}
            </span>
          ))}
        </p>
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
            {HERO_BOARD_CTA}
          </a>
        </div>
        <div className="hero-enter mt-8 grid w-full max-w-3xl grid-cols-1 gap-3 text-left sm:grid-cols-2">
          <StatChip
            label={HERO_CANDIDATE_LABEL}
            count={signedCount}
            unit="位"
            actionLabel={HERO_CANDIDATE_LIST_LABEL}
            actionHref={HERO_CANDIDATE_LIST_HREF}
          />
          <StatChip
            label={HERO_GROUP_LABEL}
            count={groupCount}
            unit="個"
            actionLabel={HERO_GROUP_LIST_LABEL}
            actionHref={HERO_GROUP_LIST_HREF}
          />
        </div>
      </div>
      <div className="pointer-events-none w-full">
        <CityBackdrop className="h-auto w-full" />
      </div>
    </section>
  );
}
