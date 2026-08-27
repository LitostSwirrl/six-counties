import { COUNTY_HEAT, HAZARDS, SIX_HAZARDS, type HazardKey } from '../content/heatData';

const INK = 'var(--color-ink)';
const S = { stroke: INK, strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' } as const;

function HazardIcon({ hazard, active }: { hazard: HazardKey; active: boolean }) {
  return (
    <svg viewBox="0 0 28 28" className={`h-7 w-7 ${active ? '' : 'opacity-0'}`} aria-hidden="true">
      {hazard === 'heat' ? (
        <>
          <circle cx={14} cy={14} r={6} {...S} fill="var(--color-purple-light)" />
          <g {...S} strokeWidth={1.3}>
            <line x1={14} y1={3} x2={14} y2={5.5} />
            <line x1={14} y1={22.5} x2={14} y2={25} />
            <line x1={3} y1={14} x2={5.5} y2={14} />
            <line x1={22.5} y1={14} x2={25} y2={14} />
            <line x1={6} y1={6} x2={7.8} y2={7.8} />
            <line x1={20.2} y1={20.2} x2={22} y2={22} />
            <line x1={22} y1={6} x2={20.2} y2={7.8} />
            <line x1={7.8} y1={20.2} x2={6} y2={22} />
          </g>
        </>
      ) : null}
      {hazard === 'flood' ? (
        <>
          <path d="M9 13 L14 8.5 L19 13" {...S} />
          <path d="M10.5 12 V17 H17.5 V12" {...S} fill="var(--color-green-pale)" strokeWidth={1.3} />
          <path d="M3 20 Q6 17 9 20 T15 20 T21 20 T27 20" stroke="var(--color-teal)" strokeWidth={2} fill="none" strokeLinecap="round" />
          <path d="M5 24 Q8 21 11 24 T17 24 T23 24" stroke="var(--color-sky)" strokeWidth={2} fill="none" strokeLinecap="round" />
        </>
      ) : null}
      {hazard === 'rain' ? (
        <>
          <path d="M7 12 Q7 8 11 8 Q12.5 5 15.5 6 Q19 5 19.5 8.5 Q23 9 22 12 Q21.5 14 18.5 14 H10 Q7 14 7 12 Z" {...S} fill="var(--color-sky-pale)" strokeWidth={1.3} />
          <g stroke="var(--color-sky)" strokeWidth={1.8} strokeLinecap="round">
            <line x1={10} y1={17} x2={9} y2={21} />
            <line x1={14.5} y1={17} x2={13.5} y2={21} />
            <line x1={19} y1={17} x2={18} y2={21} />
            <line x1={12} y1={23} x2={11.5} y2={25} />
            <line x1={16.5} y1={23} x2={16} y2={25} />
          </g>
        </>
      ) : null}
      {hazard === 'drought' ? (
        <>
          <circle cx={19} cy={8} r={4} {...S} fill="#FFE9A3" strokeWidth={1.3} />
          <path d="M4 19 H24 M9 19 L7.5 24 M14 19 L14 25 M19 19 L21 24 M11 19 L12 15 M17 19 L16.5 15.5" {...S} strokeWidth={1.3} />
        </>
      ) : null}
      {hazard === 'sea' ? (
        <>
          <path d="M3 20 Q7 16.5 11 20 T19 20 T27 20" stroke="var(--color-teal)" strokeWidth={2} fill="none" strokeLinecap="round" />
          <path d="M3 25 Q7 21.5 11 25 T19 25 T27 25" stroke="var(--color-sky)" strokeWidth={2} fill="none" strokeLinecap="round" />
          <path d="M14 13 V4 M10.5 7.5 L14 4 L17.5 7.5" {...S} strokeWidth={1.6} />
        </>
      ) : null}
      {hazard === 'slope' ? (
        <>
          <path d="M3 24 L12 8 L18 18 L21 14 L26 24 Z" {...S} fill="var(--color-green-pale)" strokeWidth={1.3} />
          <g stroke={INK} strokeWidth={1.1} opacity={0.7}>
            <line x1={14} y1={14} x2={17} y2={17} />
            <line x1={12.5} y1={17} x2={16} y2={20.5} />
            <line x1={11} y1={20} x2={14} y2={23} />
          </g>
        </>
      ) : null}
      {hazard === 'wind' ? (
        <>
          <path d="M4 10 H17 Q21 10 21 6.5 Q21 4 18.5 4" {...S} strokeWidth={1.7} />
          <path d="M4 15 H22 Q26 15 26 18.5 Q26 21 23.5 21" {...S} strokeWidth={1.7} />
          <path d="M4 20 H14 Q17 20 17 23 Q17 25 15 25" {...S} strokeWidth={1.7} />
        </>
      ) : null}
    </svg>
  );
}

export default function RiskMatrix() {
  const verbatim = new Map(COUNTY_HEAT.map((c) => [c.city, c]));

  return (
    <div className="mx-auto mt-20 max-w-5xl px-6">
      <h3 className="text-center font-display text-2xl tracking-[0.15em] text-ink md:text-3xl">
        六都要面對哪些氣候風險
      </h3>
      <p className="mx-auto mt-3 max-w-2xl text-center text-base leading-8 text-ink/75">
        六個城市自己的氣候變遷調適計畫，就寫著各自要面對的災害。高溫之外，淹水、乾旱、海平面上升與坡地災害，分別排進了不同城市的風險清單。
      </p>
      <div className="mt-8 overflow-x-auto rounded-3xl border border-ink/10 bg-white/80 p-5 md:p-8">
        <table className="w-full min-w-[640px] border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="pb-3 text-left font-display text-base font-normal text-ink/60">縣市</th>
              {HAZARDS.map((h) => (
                <th key={h.key} className="pb-3 text-center">
                  <span className="flex flex-col items-center gap-1">
                    <HazardIcon hazard={h.key} active />
                    <span className="text-[13px] leading-4 font-medium whitespace-nowrap text-ink/75">{h.label}</span>
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SIX_HAZARDS.map((row, ri) => (
              <tr key={row.city}>
                <td className={`py-2.5 pr-3 font-display text-lg whitespace-nowrap text-ink ${ri > 0 ? 'border-t border-ink/10' : ''}`}>
                  {row.city}
                </td>
                {HAZARDS.map((h) => {
                  const active = row.hazards.includes(h.key);
                  return (
                    <td
                      key={h.key}
                      className={`py-2.5 text-center ${ri > 0 ? 'border-t border-ink/10' : ''}`}
                      title={active ? `${row.city}：${h.label}` : undefined}
                    >
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg" style={active ? { background: 'var(--color-cream)' } : undefined}>
                        {active ? <HazardIcon hazard={h.key} active /> : <span className="h-1.5 w-1.5 rounded-full bg-ink/15" />}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <details className="mt-5 border-t border-ink/10 pt-4">
          <summary className="cursor-pointer text-sm text-ink/60 underline underline-offset-4 hover:text-ink">
            查看各縣市調適計畫原文
          </summary>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SIX_HAZARDS.map((row) => {
              const c = verbatim.get(row.city);
              if (!c) return null;
              return (
                <div key={row.city} className="rounded-xl bg-cream/70 p-4">
                  <p className="font-display text-base text-ink">{row.city}</p>
                  <p className="mt-1.5 text-sm leading-6 text-ink/75">高溫列為主要風險：{c.riskListed}</p>
                  <p className="mt-1 text-sm leading-6 text-ink/60">其他主要風險：{c.otherRisks}</p>
                </div>
              );
            })}
          </div>
        </details>
      </div>
    </div>
  );
}
