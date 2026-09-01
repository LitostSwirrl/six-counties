import { COUNTY_HEAT, HAZARDS, SIX_HAZARDS, type HazardKey } from '../content/heatData';

const INK = 'var(--color-ink)';
const S = { stroke: INK, strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' } as const;

export function HazardIcon({ hazard, active }: { hazard: HazardKey; active: boolean }) {
  return (
    <svg viewBox="0 0 28 28" className={`h-7 w-7 ${active ? '' : 'opacity-0'}`} aria-hidden="true" data-icon-family="civic-line">
      {hazard === 'heat' ? (
        <>
          <g data-icon-part="sun">
            <circle cx={14} cy={14} r={6} {...S} fill="var(--color-purple-light)" />
            <g {...S} strokeWidth={1.6}>
              <line x1={14} y1={2.5} x2={14} y2={5} />
              <line x1={14} y1={23} x2={14} y2={25.5} />
              <line x1={2.5} y1={14} x2={5} y2={14} />
              <line x1={23} y1={14} x2={25.5} y2={14} />
              <line x1={5.8} y1={5.8} x2={7.6} y2={7.6} />
              <line x1={20.4} y1={20.4} x2={22.2} y2={22.2} />
              <line x1={22.2} y1={5.8} x2={20.4} y2={7.6} />
              <line x1={7.6} y1={20.4} x2={5.8} y2={22.2} />
            </g>
          </g>
        </>
      ) : null}
      {hazard === 'flood' ? (
        <>
          <g data-icon-part="house">
            <path d="M8 13 L14 8 L20 13" {...S} />
            <path d="M9.5 12 V18 H18.5 V12" {...S} fill="var(--color-green-pale)" />
          </g>
          <g data-icon-part="waves" fill="none" stroke="var(--color-teal)" strokeWidth={2} strokeLinecap="round">
            <path d="M2.5 22 Q6 18.5 9.5 22 T16.5 22 T23.5 22 T27 20" />
            <path d="M4 26 Q7.5 22.5 11 26 T18 26 T25 24" stroke="var(--color-sky)" />
          </g>
        </>
      ) : null}
      {hazard === 'rain' ? (
        <>
          <g data-icon-part="cloud">
            <path d="M6 12 C6 8.5 9 7 12 7.5 C13.5 4.5 18 4.5 19.5 8 C22 8 23 10 22.5 12 C22 14 20.5 15 18 15 H10 C7.5 15 6 14 6 12 Z" {...S} fill="var(--color-sky-pale)" />
          </g>
          <g data-icon-part="rain" stroke="var(--color-sky)" strokeWidth={2.2} strokeLinecap="round">
            <line x1={10} y1={18} x2={9} y2={22} />
            <line x1={14.5} y1={18} x2={13.5} y2={22} />
            <line x1={19} y1={18} x2={18} y2={22} />
          </g>
        </>
      ) : null}
      {hazard === 'drought' ? (
        <>
          <g data-icon-part="sun">
            <circle cx={19} cy={8} r={4} {...S} fill="#FFE9A3" />
            <path d="M19 2 V4 M13 8 H15 M23 8 H25 M14.5 3.5 L16 5 M23.5 3.5 L22 5" {...S} strokeWidth={1.4} />
          </g>
          <path data-icon-part="horizon" d="M3 19 H25 M8 19 L6.5 24 M14 19 V25 M20 19 L21.5 24 M11 19 L12 15 M17 19 L16 15" {...S} strokeWidth={1.6} />
        </>
      ) : null}
      {hazard === 'sea' ? (
        <>
          <g data-icon-part="waves" fill="none" stroke="var(--color-teal)" strokeWidth={2} strokeLinecap="round">
            <path d="M2.5 21 Q6.5 17 10.5 21 T18.5 21 T26.5 21" />
            <path d="M2.5 26 Q6.5 22 10.5 26 T18.5 26 T26.5 26" stroke="var(--color-sky)" />
          </g>
          <path d="M14.5 14 V4 M11 7.5 L14.5 4 L18 7.5" {...S} />
        </>
      ) : null}
      {hazard === 'slope' ? (
        <>
          <g data-icon-part="slope">
            <path d="M3 24 L12 8 L18 18 L21 14 L26 24 Z" {...S} fill="var(--color-green-pale)" />
            <path d="M14 14 L17 17 M12.5 17 L16 20.5 M11 20 L14 23" stroke={INK} strokeWidth={1.5} opacity={0.75} strokeLinecap="round" />
          </g>
        </>
      ) : null}
      {hazard === 'wind' ? (
        <>
          <g data-icon-part="wind" {...S}>
            <path d="M3 9 H17 Q21 9 21 6 Q21 3.5 18.5 3.5" />
            <path d="M3 14 H22 Q26 14 26 17.5 Q26 20.5 23 20.5" />
            <path d="M3 20 H14 Q17 20 17 23 Q17 25 14.5 25" />
          </g>
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
        六都面對哪些氣候風險
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
