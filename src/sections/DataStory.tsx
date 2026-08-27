import { useEffect, useRef, useState } from 'react';
import { KEY_STATS } from '../content/stats';
import { SITE } from '../content/site';
import CountUp from '../components/CountUp';
import Skyline from '../components/Skyline';
import HeatChart from '../components/HeatChart';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

function useIsDesktop(): boolean {
  const [desktop, setDesktop] = useState(() => window.matchMedia('(min-width: 768px)').matches);
  useEffect(() => {
    const query = window.matchMedia('(min-width: 768px)');
    const onChange = () => setDesktop(query.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);
  return desktop;
}

function SceneText({ index, active }: { index: number; active: boolean }) {
  const stat = KEY_STATS[index];
  if (!stat) return null;
  return (
    <div
      className={`absolute inset-x-0 top-0 flex flex-col items-center text-center transition-all duration-500 ${active ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'}`}
    >
      <p className="font-display text-lg text-purple-mid">{stat.label}</p>
      <p className="gradient-title mt-1 font-display text-[clamp(4rem,12vw,7.5rem)] leading-none">
        {active ? <CountUp to={stat.value} decimals={stat.value % 1 === 0 ? 0 : 1} suffix={stat.suffix} /> : null}
      </p>
      <p className="mt-4 max-w-xl px-6 text-[15px] leading-7 text-ink/80">{stat.description}</p>
    </div>
  );
}

function StaticStory() {
  return (
    <div className="flex flex-col gap-10">
      {KEY_STATS.map((stat) => (
        <div key={stat.motif} className="flex flex-col items-center text-center">
          <p className="font-display text-base text-purple-mid">{stat.label}</p>
          <p className="gradient-title mt-1 font-display text-6xl leading-none">
            <CountUp to={stat.value} decimals={stat.value % 1 === 0 ? 0 : 1} suffix={stat.suffix} />
          </p>
          <p className="mt-3 max-w-xl text-[15px] leading-7 text-ink/80">{stat.description}</p>
        </div>
      ))}
      <Skyline className="w-full" />
    </div>
  );
}

export default function DataStory() {
  const reduced = usePrefersReducedMotion();
  const desktop = useIsDesktop();
  const [scene, setScene] = useState(0);
  const sentinelsRef = useRef<HTMLDivElement>(null);
  const pinned = desktop && !reduced;

  useEffect(() => {
    if (!pinned) return;
    const container = sentinelsRef.current;
    if (!container) return;
    const sentinels = Array.from(container.children);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = sentinels.indexOf(entry.target);
          if (idx >= 0) setScene(idx);
        });
      },
      { threshold: 0.5 }
    );
    sentinels.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pinned]);

  const motif = KEY_STATS[scene]?.motif ?? 'population';

  return (
    <section id={SITE.sections.whySix.id} className="bg-white/40 py-24">
      <h2 className="text-center font-display text-3xl tracking-[0.2em] text-ink md:text-4xl">
        {SITE.sections.whySix.title}
      </h2>
      <p className="mx-auto mt-4 max-w-2xl px-6 text-center text-[15px] leading-7 text-ink/75">
        台灣近七成的人口、六成五的用電、七成以上的碳排，都集中在六都。這三個數字，決定了下一任市長的責任有多大。
      </p>
      {pinned ? (
        <div className="relative mt-8 h-[300vh]">
          <div className="pointer-events-none absolute inset-0" ref={sentinelsRef} aria-hidden="true">
            <div className="h-[100vh]" />
            <div className="h-[100vh]" />
            <div className="h-[100vh]" />
          </div>
          <div className="sticky top-0 flex h-svh flex-col justify-between overflow-hidden pt-24">
            <div className="relative min-h-[22rem]">
              {KEY_STATS.map((stat, i) => (
                <SceneText key={stat.motif} index={i} active={scene === i} />
              ))}
            </div>
            <div data-motif={motif} className="skyline-stage w-full">
              <Skyline className="block w-full" />
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-10 px-6">
          <StaticStory />
        </div>
      )}
      <div className="mx-auto mt-20 max-w-4xl rounded-3xl border border-ink/10 bg-white/70 px-5 py-10 md:px-10">
        <HeatChart />
      </div>
    </section>
  );
}
