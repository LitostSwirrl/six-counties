import { HAZARD_COLUMNS, RISK_MATRIX_NOTE, SIX_HAZARDS } from '../content/heatData';
import HazardIcon from './HazardIcon';

export default function RiskMatrix() {
  return (
    <div className="mx-auto mt-20 max-w-5xl px-6">
      <h3 className="text-center font-display text-2xl tracking-[0.15em] text-ink md:text-3xl">
        六都面對哪些氣候風險
      </h3>
      <p className="mx-auto mt-3 max-w-2xl text-center text-base leading-8 text-ink/75">
        六個城市自己的氣候變遷調適計畫，就寫著各自要面對的災害。高溫之外，淹水、乾旱、海平面上升與坡地災害，分別排進了不同城市的風險清單。
      </p>
      <div className="mt-8 overflow-x-auto rounded-3xl border border-ink/10 bg-white/80 p-5 md:p-8">
        <table className="w-full min-w-[560px] border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="pb-3 text-left font-display text-base font-normal text-ink/60">縣市</th>
              {HAZARD_COLUMNS.map((col) => (
                <th key={col.key} className="pb-3 text-center">
                  <span className="flex flex-col items-center gap-1">
                    <span className="flex items-center gap-1">
                      {col.hazards.map((h) => (
                        <HazardIcon key={h} hazard={h} active />
                      ))}
                    </span>
                    <span className="text-[13px] leading-4 font-medium whitespace-nowrap text-ink/75">{col.label}</span>
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
                {HAZARD_COLUMNS.map((col) => {
                  const present = col.hazards.filter((h) => row.hazards.includes(h));
                  return (
                    <td
                      key={col.key}
                      className={`py-2.5 text-center ${ri > 0 ? 'border-t border-ink/10' : ''}`}
                      title={present.length > 0 ? `${row.city}：${col.label}` : undefined}
                    >
                      {present.length > 0 ? (
                        <span className="inline-flex items-center justify-center gap-1">
                          {present.map((h) => (
                            <span
                              key={h}
                              className="inline-flex h-9 w-9 items-center justify-center rounded-lg"
                              style={{ background: 'var(--color-cream)' }}
                            >
                              <HazardIcon hazard={h} active />
                            </span>
                          ))}
                        </span>
                      ) : (
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg">
                          <span className="h-1.5 w-1.5 rounded-full bg-ink/15" />
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-5 border-t border-ink/10 pt-4 text-sm leading-6 text-ink/60">{RISK_MATRIX_NOTE}</p>
      </div>
    </div>
  );
}
