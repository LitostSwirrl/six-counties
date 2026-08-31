import type { CSSProperties } from 'react';

interface SkylineProps {
  className?: string;
  animateIn?: boolean;
  variant?: SkylineVariant;
}

export const SKYLINE_VARIANTS = ['day', 'night'] as const;
type SkylineVariant = (typeof SKYLINE_VARIANTS)[number];

const INK = 'var(--color-ink)';
const GREEN = 'var(--color-green)';
const GREEN_PALE = 'var(--color-green-pale)';
const TEAL = 'var(--color-teal)';
const SKY = 'var(--color-sky)';
const SKY_PALE = 'var(--color-sky-pale)';
const CREAM = 'var(--color-cream)';
const WINDOW_LIT = '#FFE9A3';

function WindowGrid({ x, y, w, h, cols, rows, lit = false }: { x: number; y: number; w: number; h: number; cols: number; rows: number; lit?: boolean }) {
  const cellW = 8;
  const cellH = 10;
  const gapX = (w - cols * cellW) / (cols + 1);
  const gapY = (h - rows * cellH) / (rows + 1);
  const cells = [];
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      cells.push(
        <rect
          key={`${r}-${c}`}
          className="skyline-window"
          x={x + gapX + c * (cellW + gapX)}
          y={y + gapY + r * (cellH + gapY)}
          width={cellW}
          height={cellH}
          rx={1.5}
          fill={lit && (r + c) % 3 === 0 ? WINDOW_LIT : CREAM}
          opacity={0.9}
        />
      );
    }
  }
  return <g>{cells}</g>;
}

function WaterTank({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <line x1={x - 5} y1={y + 12} x2={x - 5} y2={y + 2} stroke={INK} strokeWidth={1.2} />
      <line x1={x + 5} y1={y + 12} x2={x + 5} y2={y + 2} stroke={INK} strokeWidth={1.2} />
      <ellipse cx={x} cy={y} rx={9} ry={7} fill={SKY_PALE} stroke={INK} strokeWidth={1.2} />
      <ellipse cx={x} cy={y - 5} rx={9} ry={2.5} fill={CREAM} stroke={INK} strokeWidth={1} />
    </g>
  );
}

function AcUnit({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x} y={y} width={10} height={7} rx={1} fill={CREAM} stroke={INK} strokeWidth={1} />
      <circle cx={x + 5} cy={y + 3.5} r={2} fill="none" stroke={INK} strokeWidth={0.8} />
    </g>
  );
}

function Tree({ cx, kind = 'round' }: { cx: number; kind?: 'round' | 'pine' }) {
  if (kind === 'pine') {
    return (
      <g className="skyline-building">
        <line x1={cx} y1={290} x2={cx} y2={262} stroke={INK} strokeWidth={2} />
        <path d={`M${cx} 232 L${cx + 13} 254 H${cx - 13} Z`} fill={GREEN} stroke={INK} strokeWidth={1.3} />
        <path d={`M${cx} 244 L${cx + 16} 268 H${cx - 16} Z`} fill={GREEN} stroke={INK} strokeWidth={1.3} />
      </g>
    );
  }
  return (
    <g className="skyline-building">
      <line x1={cx} y1={290} x2={cx} y2={260} stroke={INK} strokeWidth={2} />
      <circle cx={cx - 8} cy={252} r={10} fill={GREEN} stroke={INK} strokeWidth={1.3} />
      <circle cx={cx + 8} cy={254} r={9} fill={GREEN} stroke={INK} strokeWidth={1.3} />
      <circle cx={cx} cy={244} r={11} fill={GREEN} stroke={INK} strokeWidth={1.3} />
    </g>
  );
}

function Cloud({ cx, cy, scale = 1 }: { cx: number; cy: number; scale?: number }) {
  return (
    <g className="skyline-cloud" fill={CREAM} stroke={INK} strokeWidth={1} opacity={0.85} transform={`translate(${cx} ${cy}) scale(${scale})`}>
      <path d="M-34 8 Q-34 -6 -20 -6 Q-16 -18 -2 -16 Q10 -22 18 -12 Q32 -12 32 0 Q38 8 28 8 Z" />
    </g>
  );
}

function Taipei101({ x }: { x: number }) {
  const segs = [];
  for (let i = 0; i < 7; i += 1) {
    const top = 96 + i * 22;
    segs.push(
      <path
        key={i}
        d={`M${x - 20} ${top + 4} L${x + 20} ${top + 4} L${x + 15} ${top + 22} L${x - 15} ${top + 22} Z`}
        fill={GREEN_PALE}
        stroke={INK}
        strokeWidth={1.2}
      />
    );
  }
  return (
    <g className="skyline-building">
      <line x1={x} y1={96} x2={x} y2={58} stroke={INK} strokeWidth={2} strokeLinecap="round" />
      <path d={`M${x - 11} 96 L${x + 11} 96 L${x + 8} 78 L${x - 8} 78 Z`} fill={GREEN_PALE} stroke={INK} strokeWidth={1.2} />
      {segs}
      <rect x={x - 17} y={250} width={34} height={40} fill={GREEN_PALE} stroke={INK} strokeWidth={1.2} />
      <WindowGrid x={x - 17} y={252} w={34} h={36} cols={2} rows={2} />
    </g>
  );
}

function OperaHouse({ x }: { x: number }) {
  return (
    <g className="skyline-building">
      <path d={`M${x - 72} 290 L${x - 62} 240 Q${x - 45} 218 ${x - 26} 240 Q${x} 202 ${x + 26} 240 Q${x + 45} 218 ${x + 62} 240 L${x + 72} 290 Z`} fill={CREAM} stroke={INK} strokeWidth={1.3} />
      <path d={`M${x - 48} 290 V250 Q${x - 34} 229 ${x - 18} 250 V290 M${x + 18} 290 V250 Q${x + 34} 229 ${x + 48} 250 V290`} fill={SKY_PALE} stroke={INK} strokeWidth={1.1} />
      <path d={`M${x - 26} 240 Q${x} 218 ${x + 26} 240`} fill="none" stroke={INK} strokeWidth={1.1} />
      <line x1={x - 62} y1={270} x2={x + 62} y2={270} stroke={INK} strokeWidth={1} opacity={0.7} />
    </g>
  );
}

function ControlTower({ x }: { x: number }) {
  return (
    <g className="skyline-building">
      <path d={`M${x - 7} 290 L${x - 4} 190 H${x + 4} L${x + 7} 290 Z`} fill={CREAM} stroke={INK} strokeWidth={1.2} />
      <path d={`M${x - 16} 190 L${x + 16} 190 L${x + 12} 168 L${x - 12} 168 Z`} fill={TEAL} stroke={INK} strokeWidth={1.2} />
      <rect x={x - 13} y={172} width={26} height={8} rx={2} fill={WINDOW_LIT} stroke={INK} strokeWidth={0.9} className="skyline-window" />
      <line x1={x} y1={168} x2={x} y2={152} stroke={INK} strokeWidth={1.5} strokeLinecap="round" />
      <circle cx={x} cy={150} r={2.5} fill={SKY} stroke={INK} strokeWidth={1} />
      <path d={`M${x + 22} 290 L${x + 22} 258 L${x + 70} 250 L${x + 70} 290 Z`} fill={SKY_PALE} stroke={INK} strokeWidth={1.2} />
      <rect x={x + 30} y={264} width={32} height={9} rx={4.5} fill={CREAM} stroke={INK} strokeWidth={1} />
    </g>
  );
}

function ChihkanTower({ x }: { x: number }) {
  return (
    <g className="skyline-building">
      <rect x={x - 46} y={250} width={92} height={40} fill={CREAM} stroke={INK} strokeWidth={1.3} />
      <path d={`M${x - 55} 250 Q${x - 44} 240 ${x - 48} 229 Q${x - 22} 240 ${x} 240 Q${x + 22} 240 ${x + 48} 229 Q${x + 44} 240 ${x + 55} 250 Z`} fill={TEAL} stroke={INK} strokeWidth={1.3} />
      <path d={`M${x - 38} 229 Q${x - 30} 221 ${x - 33} 212 Q${x - 14} 222 ${x} 222 Q${x + 14} 222 ${x + 33} 212 Q${x + 30} 221 ${x + 38} 229 Z`} fill={TEAL} stroke={INK} strokeWidth={1.3} />
      <rect x={x - 12} y={264} width={24} height={26} fill={SKY_PALE} stroke={INK} strokeWidth={1.1} />
      <line x1={x - 29} y1={252} x2={x - 29} y2={290} stroke={INK} strokeWidth={1} />
      <line x1={x + 29} y1={252} x2={x + 29} y2={290} stroke={INK} strokeWidth={1} />
    </g>
  );
}

function SolarPanel({ x, y }: { x: number; y: number }) {
  return (
    <g className="skyline-building">
      <path d={`M${x - 16} ${y + 4} L${x + 12} ${y} L${x + 17} ${y + 11} L${x - 11} ${y + 15} Z`} fill={SKY_PALE} stroke={INK} strokeWidth={1.1} />
      <path d={`M${x - 9} ${y + 3} L${x - 4} ${y + 13} M${x} ${y + 2} L${x + 5} ${y + 12} M${x - 14} ${y + 9} L${x + 15} ${y + 5}`} fill="none" stroke={INK} strokeWidth={0.8} />
      <path d={`M${x + 1} ${y + 12} V${y + 21} M${x - 6} ${y + 21} H${x + 8}`} fill="none" stroke={INK} strokeWidth={1.1} />
    </g>
  );
}

function Tower85({ x }: { x: number }) {
  return (
    <g className="skyline-building">
      <rect x={x - 38} y={170} width={24} height={120} fill={SKY} stroke={INK} strokeWidth={1.2} />
      <rect x={x + 14} y={170} width={24} height={120} fill={SKY} stroke={INK} strokeWidth={1.2} />
      <rect x={x - 38} y={96} width={76} height={54} rx={3} fill={SKY} stroke={INK} strokeWidth={1.2} />
      <rect x={x - 12} y={150} width={24} height={140} fill={SKY} stroke={INK} strokeWidth={1.2} />
      <WindowGrid x={x - 38} y={100} w={76} h={48} cols={5} rows={3} lit />
      <WindowGrid x={x - 38} y={176} w={24} h={110} cols={2} rows={5} />
      <WindowGrid x={x + 14} y={176} w={24} h={110} cols={2} rows={5} />
      <path d={`M${x - 6} 96 L${x} 62 L${x + 6} 96`} fill={SKY} stroke={INK} strokeWidth={1.2} />
      <line x1={x} y1={62} x2={x} y2={48} stroke={INK} strokeWidth={1.5} strokeLinecap="round" />
    </g>
  );
}

function HarborCrane({ x }: { x: number }) {
  return (
    <g className="skyline-building">
      <path d={`M${x - 20} 290 L${x - 6} 216 H${x + 2} L${x + 16} 290`} fill="none" stroke={INK} strokeWidth={2} />
      <line x1={x - 34} y1={216} x2={x + 52} y2={208} stroke={INK} strokeWidth={2.2} strokeLinecap="round" />
      <line x1={x - 2} y1={216} x2={x + 20} y2={186} stroke={INK} strokeWidth={1.3} />
      <line x1={x + 20} y1={186} x2={x + 50} y2={208} stroke={INK} strokeWidth={1.3} />
      <line x1={x + 36} y1={210} x2={x + 36} y2={238} stroke={INK} strokeWidth={1} />
      <rect x={x + 26} y={238} width={20} height={13} rx={1.5} fill={GREEN} stroke={INK} strokeWidth={1.2} />
      <rect x={x - 16} y={262} width={44} height={28} fill={TEAL} stroke={INK} strokeWidth={1.2} />
      <WindowGrid x={x - 16} y={264} w={44} h={24} cols={3} rows={1} />
    </g>
  );
}

function Shophouse({ x, w, h, fill, awning, lit = false }: { x: number; w: number; h: number; fill: string; awning?: boolean; lit?: boolean }) {
  const top = 290 - h;
  const floors = Math.max(Math.floor((h - 26) / 30), 1);
  const rails = [];
  for (let f = 0; f < floors; f += 1) {
    const ry = top + 12 + f * 30;
    rails.push(
      <g key={f}>
        <rect x={x + 5} y={ry} width={w - 10} height={14} rx={1.5} fill={lit && f % 2 === 0 ? WINDOW_LIT : CREAM} stroke={INK} strokeWidth={0.9} className="skyline-window" />
        <line x1={x + 5} y1={ry + 7} x2={x + w - 5} y2={ry + 7} stroke={INK} strokeWidth={0.5} opacity={0.6} />
        <line x1={x + w / 2} y1={ry} x2={x + w / 2} y2={ry + 14} stroke={INK} strokeWidth={0.5} opacity={0.6} />
      </g>
    );
  }
  return (
    <g className="skyline-building">
      <rect x={x} y={top} width={w} height={h} rx={2} fill={fill} stroke={INK} strokeWidth={1.4} />
      <line x1={x - 3} y1={top} x2={x + w + 3} y2={top} stroke={INK} strokeWidth={1.4} strokeLinecap="round" />
      {rails}
      {awning ? (
        <g>
          <path d={`M${x + 2} 268 L${x + w - 2} 268 L${x + w - 6} 276 L${x + 6} 276 Z`} fill={GREEN_PALE} stroke={INK} strokeWidth={1} />
          <line x1={x + w * 0.33} y1={268} x2={x + w * 0.35} y2={276} stroke={INK} strokeWidth={0.6} />
          <line x1={x + w * 0.66} y1={268} x2={x + w * 0.65} y2={276} stroke={INK} strokeWidth={0.6} />
          <rect x={x + w / 2 - 7} y={278} width={14} height={12} fill={CREAM} stroke={INK} strokeWidth={0.9} />
        </g>
      ) : null}
    </g>
  );
}

function Birds({ x, y }: { x: number; y: number }) {
  return (
    <g stroke={INK} strokeWidth={1.2} fill="none" strokeLinecap="round" opacity={0.7}>
      <path d={`M${x} ${y} q4 -5 8 0 q4 -5 8 0`} />
      <path d={`M${x + 30} ${y - 12} q3 -4 6 0 q3 -4 6 0`} />
      <path d={`M${x + 14} ${y + 10} q3 -4 6 0 q3 -4 6 0`} />
    </g>
  );
}

export default function Skyline({ className = '', animateIn = false, variant = 'day' }: SkylineProps) {
  const nightStyle: CSSProperties | undefined = variant === 'night'
    ? {
        '--color-ink': '#F5E9D5',
        '--color-purple-deep': '#4E3C64',
        '--color-purple-mid': '#B98AB2',
        '--color-purple-light': '#C59ABE',
        '--color-green': '#79B57D',
        '--color-green-pale': '#6C8F7A',
        '--color-teal': '#5D8D9A',
        '--color-sky': '#7899AD',
        '--color-sky-pale': '#7F909A',
        '--color-cream': '#D8C7B0',
      } as CSSProperties
    : undefined;

  return (
    <svg
      viewBox="0 0 1440 300"
      className={`${className} ${animateIn ? 'skyline-animate' : ''}`.trim()}
      role="img"
      aria-label="六都城市天際線插圖：臺北 101、桃園機場塔台、臺中國家歌劇院、臺南歷史建築、高雄 85 大樓與港區起重機"
      preserveAspectRatio="xMidYMax meet"
      style={nightStyle}
    >
      <g data-layer="back">
        <path d="M0 214 Q160 168 340 200 T700 196 Q900 176 1080 198 T1440 190 V300 H0 Z" fill={GREEN_PALE} opacity={0.35} />
        <g opacity={0.5}>
          <rect x={130} y={170} width={46} height={120} rx={3} fill={SKY_PALE} />
          <rect x={330} y={186} width={38} height={104} rx={3} fill={GREEN_PALE} />
          <rect x={640} y={176} width={50} height={114} rx={3} fill={SKY_PALE} />
          <rect x={868} y={192} width={40} height={98} rx={3} fill={GREEN_PALE} />
          <rect x={1150} y={178} width={46} height={112} rx={3} fill={SKY_PALE} />
          <rect x={1372} y={190} width={40} height={100} rx={3} fill={GREEN_PALE} />
        </g>
      </g>
      <g data-layer="mid">
        <circle cx={1348} cy={56} r={22} fill={WINDOW_LIT} stroke={INK} strokeWidth={1.3} opacity={0.9} />
        <Cloud cx={250} cy={62} />
        <Cloud cx={820} cy={44} scale={0.8} />
        <Cloud cx={1180} cy={70} scale={0.65} />
        <Birds x={520} y={70} />
        <Taipei101 x={180} />
        <ControlTower x={430} />
        <OperaHouse x={700} />
        <ChihkanTower x={920} />
        <Tower85 x={1130} />
        <HarborCrane x={1330} />
      </g>
      <g data-layer="front">
        <Shophouse x={30} w={64} h={96} fill={GREEN} awning lit />
        <Shophouse x={102} w={54} h={78} fill={GREEN_PALE} awning />
        <Tree cx={182} />
        <Shophouse x={252} w={60} h={86} fill={TEAL} awning />
        <Tree cx={438} kind="pine" />
        <Shophouse x={452} w={58} h={92} fill={GREEN_PALE} awning lit />
        <Shophouse x={610} w={62} h={82} fill={GREEN} awning />
        <Tree cx={690} />
        <Shophouse x={806} w={56} h={88} fill={SKY_PALE} awning />
        <Tree cx={968} kind="pine" />
        <Shophouse x={984} w={60} h={80} fill={GREEN_PALE} awning lit />
        <Shophouse x={1132} w={58} h={94} fill={GREEN} awning />
        <Tree cx={1216} />
        <Shophouse x={1320} w={62} h={84} fill={GREEN_PALE} awning />
        <Tree cx={1408} />
        <g>
          <WaterTank x={62} y={180} />
          <WaterTank x={482} y={184} />
          <WaterTank x={1014} y={196} />
          <SolarPanel x={132} y={204} />
          <SolarPanel x={620} y={201} />
          <SolarPanel x={1160} y={178} />
          <AcUnit x={266} y={216} />
          <AcUnit x={624} y={220} />
          <AcUnit x={1146} y={208} />
        </g>
        <line x1={0} y1={290} x2={1440} y2={290} stroke={INK} strokeWidth={2.2} />
        <g stroke={INK} strokeWidth={1} opacity={0.5}>
          <line x1={140} y1={295} x2={168} y2={295} />
          <line x1={560} y1={295} x2={588} y2={295} />
          <line x1={950} y1={295} x2={978} y2={295} />
          <line x1={1290} y1={295} x2={1318} y2={295} />
        </g>
      </g>
    </svg>
  );
}
