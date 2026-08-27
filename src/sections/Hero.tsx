import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Skyline from '../components/Skyline';
import BallotBox from '../components/BallotBox';
import { SITE } from '../content/site';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  signedCount: number | null;
  petitionCount: number | null;
}

function StatChip({ label, count }: { label: string; count: number | null }) {
  return (
    <div className="flex items-baseline gap-2 rounded-xl border border-ink/15 bg-white/70 px-5 py-2">
      <span className="text-sm text-ink/70">{label}</span>
      <span className="font-display text-2xl text-purple-deep">{count === null ? '—' : count}</span>
      <span className="text-sm text-ink/70">{label.includes('連署') ? '人' : '位'}</span>
    </div>
  );
}

export default function Hero({ signedCount, petitionCount }: HeroProps) {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.from('.hero-enter', { y: 24, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power2.out' });
      const layers: [string, number][] = [
        ['[data-layer="back"]', 60],
        ['[data-layer="mid"]', 30],
        ['[data-layer="front"]', 0],
      ];
      layers.forEach(([selector, distance]) => {
        if (distance === 0) return;
        gsap.to(selector, {
          y: -distance,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true },
        });
      });
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
            href={`#${SITE.sections.join.id}`}
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
        <div className="hero-enter mt-8 flex flex-wrap justify-center gap-3">
          <StatChip label="候選人已簽署" count={signedCount} />
          <StatChip label="公民連署" count={petitionCount} />
        </div>
      </div>
      <div className="pointer-events-none w-full">
        <Skyline className="block w-full" animateIn />
      </div>
    </section>
  );
}
