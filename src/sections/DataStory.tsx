import { KEY_STATS } from '../content/stats';
import { SITE } from '../content/site';
import CountUp from '../components/CountUp';
import HeatExplorer from '../components/HeatExplorer';
import RiskMatrix from '../components/RiskMatrix';

export default function DataStory() {
  return (
    <section id={SITE.sections.whySix.id} className="bg-white/40 py-24">
      <h2 className="text-center font-display text-3xl tracking-[0.2em] text-ink md:text-4xl">
        {SITE.sections.whySix.title}
      </h2>
      <p className="mx-auto mt-4 max-w-2xl px-6 text-center text-base leading-8 text-ink/75">
        台灣近七成的人口、六成五的用電、七成以上的碳排，都集中在六都。這三個數字，決定了下一任市長的責任有多大。
      </p>
      <div className="mx-auto mt-14 grid max-w-6xl gap-12 px-6 md:grid-cols-3 md:gap-6">
        {KEY_STATS.map((stat) => (
          <div key={stat.motif} className="flex flex-col items-center text-center">
            <p className="font-display text-lg text-purple-mid">{stat.label}</p>
            <p className="gradient-title mt-2 font-display text-[clamp(3.6rem,7vw,5.2rem)] leading-none">
              <CountUp to={stat.value} decimals={stat.value % 1 === 0 ? 0 : 1} suffix={stat.suffix} />
            </p>
            <p className="mt-4 max-w-sm text-base leading-8 text-ink/80">{stat.description}</p>
          </div>
        ))}
      </div>
      <RiskMatrix />
      <HeatExplorer />
    </section>
  );
}
