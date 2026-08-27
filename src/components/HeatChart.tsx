import { HEAT_DATA, HEAT_SOURCE } from '../content/stats';

const SCENARIOS = ['暖化 1.5 度', '暖化 2 度', '暖化 4 度'];
const RAMP = ['#C4A8CE', '#925D91', '#4E3C64'];
const CITIES = ['臺北市', '新北市', '桃園市', '臺中市', '臺南市', '高雄市'];

const BAR_H = 13;
const BAR_GAP = 2;
const GROUP_GAP = 18;
const LABEL_W = 64;
const VALUE_W = 76;
const CHART_W = 640;

export default function HeatChart() {
  if (HEAT_DATA.length === 0) return null;
  const max = Math.max(...HEAT_DATA.map((d) => d.extraDays));
  const plotW = CHART_W - LABEL_W - VALUE_W;
  const groupH = SCENARIOS.length * (BAR_H + BAR_GAP) - BAR_GAP;
  const height = CITIES.length * (groupH + GROUP_GAP) - GROUP_GAP + 8;

  return (
    <figure className="mx-auto w-full max-w-2xl">
      <figcaption className="text-center">
        <p className="font-display text-xl text-ink">暖化情境下，六都一年會多出幾天 36 度以上的高溫？</p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-xs text-ink/70">
          {SCENARIOS.map((s, i) => (
            <span key={s} className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-sm" style={{ background: RAMP[i] }} />
              {s}
            </span>
          ))}
        </div>
      </figcaption>
      <svg viewBox={`0 0 ${CHART_W} ${height}`} className="mt-4 w-full" role="img" aria-label="六都在不同暖化情境下的年高溫天數增幅長條圖">
        {CITIES.map((city, ci) => {
          const groupY = ci * (groupH + GROUP_GAP);
          return (
            <g key={city}>
              <text
                x={LABEL_W - 10}
                y={groupY + groupH / 2}
                textAnchor="end"
                dominantBaseline="central"
                fontSize={13}
                fill="var(--color-ink)"
              >
                {city}
              </text>
              {SCENARIOS.map((scenario, si) => {
                const datum = HEAT_DATA.find((d) => d.city === city && d.scenario === scenario);
                if (!datum) return null;
                const w = Math.max((datum.extraDays / max) * plotW, 2);
                const y = groupY + si * (BAR_H + BAR_GAP);
                return (
                  <g key={scenario} className="heat-bar">
                    <rect x={LABEL_W} y={y} width={w} height={BAR_H} rx={3} fill={RAMP[si]}>
                      <title>{`${city}｜${scenario}：一年約增加 ${datum.extraDays} 天`}</title>
                    </rect>
                    <text
                      x={LABEL_W + w + 6}
                      y={y + BAR_H / 2}
                      dominantBaseline="central"
                      fontSize={11}
                      fill="var(--color-ink)"
                      opacity={0.75}
                    >
                      +{datum.extraDays} 天
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })}
        <line x1={LABEL_W} y1={0} x2={LABEL_W} y2={height - 4} stroke="var(--color-ink)" strokeWidth={1} opacity={0.35} />
      </svg>
      <p className="mt-3 text-center text-xs text-ink/55">{HEAT_SOURCE}</p>
    </figure>
  );
}
