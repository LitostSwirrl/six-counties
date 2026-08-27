import { useState } from 'react';
import {
  COUNTY_HEAT,
  HEAT_NOTE,
  HEAT_SOURCE,
  INJURY_PERIOD,
  NATIONAL_ELDERLY_PCT,
  SCENARIO_LABELS,
  SCENARIO_MEDIANS,
} from '../content/heatData';

const RAMP = ['#C4A8CE', '#A87FB0', '#925D91', '#4E3C64'];
const ROW_H = 40;
const SIX = COUNTY_HEAT.filter((c) => c.six);

function ScenarioBars() {
  const [scen, setScen] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const rows = showAll ? COUNTY_HEAT : SIX;
  const max = Math.max(...rows.map((r) => r.delta[3] ?? 0));
  const median = SCENARIO_MEDIANS[scen] ?? 0;
  const color = RAMP[scen];
  const sorted = [...rows].sort((a, b) => (b.delta[scen] ?? 0) - (a.delta[scen] ?? 0));
  const rank = new Map(sorted.map((r, i) => [r.city, i]));

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2" role="group" aria-label="暖化情境">
          {SCENARIO_LABELS.map((label, i) => (
            <button
              key={label}
              type="button"
              aria-pressed={scen === i}
              className={`rounded-lg border-2 px-3.5 py-1.5 font-display text-base transition-colors ${
                scen === i ? 'border-ink text-white' : 'border-ink/20 text-ink/70 hover:border-ink/50'
              }`}
              style={scen === i ? { background: RAMP[i] } : undefined}
              onClick={() => setScen(i)}
            >
              {label}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="text-sm text-ink/60 underline underline-offset-4 hover:text-ink"
          onClick={() => setShowAll((prev) => !prev)}
        >
          {showAll ? '只看六都' : '看全台 22 縣市'}
        </button>
      </div>
      <div className="relative mt-6 overflow-hidden" style={{ height: rows.length * ROW_H + 26 }}>
        <div
          className="absolute top-0 border-l-2 border-dashed border-ink/35 transition-all duration-700"
          style={{ left: `calc(4.75rem + (100% - 9.5rem) * ${median / max})`, height: rows.length * ROW_H }}
          aria-hidden="true"
        >
          <span className="absolute -bottom-5 left-1.5 text-[11px] whitespace-nowrap text-ink/50">
            全台中位數 {median} 天
          </span>
        </div>
        {rows.map((r) => {
          const value = r.delta[scen] ?? 0;
          const top = (rank.get(r.city) ?? 0) * ROW_H;
          return (
            <div
              key={r.city}
              className="absolute inset-x-0 flex items-center gap-3 transition-all duration-700 motion-reduce:transition-none"
              style={{ top }}
            >
              <span className={`w-16 shrink-0 text-right text-base ${r.six ? 'font-bold text-ink' : 'text-ink/55'}`}>
                {r.city}
              </span>
              <div className="relative h-[22px] flex-1" style={{ marginRight: '4.75rem' }}>
                <div
                  className="h-full rounded-r-md transition-all duration-700 motion-reduce:transition-none"
                  title={`${r.city}：一年約增加 ${value} 天 36 度以上高溫`}
                  style={{ width: `${Math.max((value / max) * 100, 1)}%`, background: color, opacity: r.six ? 1 : 0.45 }}
                />
                <span
                  className="absolute top-1/2 -translate-y-1/2 pl-2 text-sm whitespace-nowrap text-ink/75 transition-all duration-700 motion-reduce:transition-none"
                  style={{ left: `${Math.max((value / max) * 100, 1)}%` }}
                >
                  +{value} 天
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MiniBars({
  title,
  note,
  unit,
  values,
  refLine,
  color,
}: {
  title: string;
  note: string;
  unit: string;
  values: { city: string; value: number }[];
  refLine?: { value: number; label: string };
  color: string;
}) {
  const max = Math.max(...values.map((v) => v.value), refLine?.value ?? 0) * 1.15;
  const sorted = [...values].sort((a, b) => b.value - a.value);
  return (
    <div className="rounded-2xl border border-ink/10 bg-white/80 p-5 md:p-6">
      <p className="font-display text-lg text-ink">{title}</p>
      <p className="mt-1 text-sm text-ink/55">{note}</p>
      <div className="relative mt-4 flex flex-col gap-2.5">
        {refLine ? (
          <div
            className="absolute top-0 bottom-0 border-l-2 border-dashed border-ink/35"
            style={{ left: `calc(4.5rem + (100% - 4.5rem) * ${refLine.value / max})` }}
            aria-hidden="true"
          >
            <span className="absolute -bottom-5 -left-10 text-[11px] whitespace-nowrap text-ink/50">{refLine.label}</span>
          </div>
        ) : null}
        {sorted.map((v) => (
          <div key={v.city} className="flex items-center gap-3">
            <span className="shrink-0 text-right text-sm text-ink/75" style={{ width: '3.5rem' }}>
              {v.city}
            </span>
            <div className="relative h-[18px] flex-1">
              <div
                className="h-full rounded-r"
                style={{ width: `${(v.value / max) * 100}%`, background: color }}
              />
              <span
                className="absolute top-1/2 -translate-y-1/2 pl-1.5 text-[13px] whitespace-nowrap text-ink/70"
                style={{ left: `${(v.value / max) * 100}%` }}
              >
                {v.value}
                {unit}
              </span>
            </div>
          </div>
        ))}
      </div>
      {refLine ? <div className="h-5" /> : null}
    </div>
  );
}

export default function HeatExplorer() {
  return (
    <div className="mx-auto mt-20 max-w-5xl px-6">
      <h3 className="text-center font-display text-2xl tracking-[0.15em] text-ink md:text-3xl">
        以高溫為例：風險有多近？
      </h3>
      <p className="mx-auto mt-3 max-w-2xl text-center text-base leading-8 text-ink/75">
        切換暖化情境，看每個城市一年會多出幾天 36 度以上的高溫。深色粗體是六都，虛線是全台 22 縣市的中位數。
      </p>
      <div className="mt-8 rounded-3xl border border-ink/10 bg-white/80 p-5 md:p-8">
        <ScenarioBars />
        <p className="mt-4 text-xs leading-5 text-ink/50">
          {HEAT_NOTE}。{HEAT_SOURCE}
        </p>
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <MiniBars
          title="65 歲以上人口比例"
          note="長者是高溫下最需要照顧的族群"
          unit="%"
          color="var(--color-teal)"
          values={SIX.map((c) => ({ city: c.city, value: c.elderlyPct ?? 0 }))}
          refLine={{ value: NATIONAL_ELDERLY_PCT, label: `全國 ${NATIONAL_ELDERLY_PCT}%` }}
        />
        <MiniBars
          title="今年 8 月的熱傷害人次"
          note={`統計期間：${INJURY_PERIOD}`}
          unit=" 人次"
          color="var(--color-purple-light)"
          values={SIX.map((c) => ({ city: c.city, value: c.injuries ?? 0 }))}
        />
      </div>
      <div className="mt-6 rounded-3xl border border-ink/10 bg-white/80 p-5 md:p-8">
        <p className="font-display text-lg text-ink">六都的氣候調適計畫，怎麼看待高溫？</p>
        <p className="mt-1 text-sm text-ink/55">整理自各縣市氣候變遷調適執行方案</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SIX.map((c) => (
            <div key={c.city} className="rounded-xl bg-cream/70 p-4">
              <p className="font-display text-base text-ink">{c.city}</p>
              <p className="mt-1.5 text-sm leading-6 text-ink/75">高溫列為主要風險：{c.riskListed}</p>
              <p className="mt-1 text-sm leading-6 text-ink/60">其他主要風險：{c.otherRisks}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
