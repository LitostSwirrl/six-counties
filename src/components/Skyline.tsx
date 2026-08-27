interface SkylineProps {
  className?: string;
  animateIn?: boolean;
}

interface BuildingSpec {
  x: number;
  y: number;
  w: number;
  h: number;
  fill: string;
  windows?: { cols: number; rows: number };
  antenna?: boolean;
}

const BACK: BuildingSpec[] = [
  { x: 60, y: 140, w: 90, h: 110, fill: 'var(--color-sky-pale)' },
  { x: 300, y: 160, w: 70, h: 90, fill: 'var(--color-green-pale)' },
  { x: 520, y: 120, w: 100, h: 130, fill: 'var(--color-sky-pale)' },
  { x: 780, y: 150, w: 80, h: 100, fill: 'var(--color-green-pale)' },
  { x: 1020, y: 130, w: 90, h: 120, fill: 'var(--color-sky-pale)' },
  { x: 1280, y: 155, w: 70, h: 95, fill: 'var(--color-green-pale)' },
];

const MID: BuildingSpec[] = [
  { x: 140, y: 120, w: 80, h: 130, fill: 'var(--color-teal)', windows: { cols: 3, rows: 4 } },
  { x: 420, y: 100, w: 70, h: 150, fill: 'var(--color-sky)', windows: { cols: 2, rows: 5 }, antenna: true },
  { x: 680, y: 130, w: 90, h: 120, fill: 'var(--color-teal)', windows: { cols: 3, rows: 3 } },
  { x: 940, y: 95, w: 75, h: 155, fill: 'var(--color-sky)', windows: { cols: 2, rows: 5 } },
  { x: 1180, y: 125, w: 85, h: 125, fill: 'var(--color-teal)', windows: { cols: 3, rows: 4 }, antenna: true },
];

const FRONT: BuildingSpec[] = [
  { x: 20, y: 160, w: 100, h: 90, fill: 'var(--color-green)', windows: { cols: 3, rows: 2 } },
  { x: 240, y: 140, w: 90, h: 110, fill: 'var(--color-green-pale)', windows: { cols: 3, rows: 3 } },
  { x: 560, y: 150, w: 110, h: 100, fill: 'var(--color-green)', windows: { cols: 4, rows: 2 } },
  { x: 820, y: 145, w: 95, h: 105, fill: 'var(--color-green-pale)', windows: { cols: 3, rows: 3 } },
  { x: 1080, y: 155, w: 100, h: 95, fill: 'var(--color-green)', windows: { cols: 3, rows: 2 }, antenna: true },
  { x: 1320, y: 140, w: 100, h: 110, fill: 'var(--color-green-pale)', windows: { cols: 3, rows: 3 } },
];

const TREES = [370, 730, 1250];

function Windows({ b }: { b: BuildingSpec }) {
  if (!b.windows) return null;
  const { cols, rows } = b.windows;
  const cellW = 10;
  const cellH = 12;
  const gapX = (b.w - cols * cellW) / (cols + 1);
  const gapY = (b.h - rows * cellH) / (rows + 1);
  const cells = [];
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      cells.push(
        <rect
          key={`${r}-${c}`}
          className="skyline-window"
          x={b.x + gapX + c * (cellW + gapX)}
          y={b.y + gapY + r * (cellH + gapY)}
          width={cellW}
          height={cellH}
          rx={2}
          fill="var(--color-cream)"
          opacity={0.85}
        />
      );
    }
  }
  return <g>{cells}</g>;
}

function Building({ b, stroke }: { b: BuildingSpec; stroke: number }) {
  return (
    <g className="skyline-building">
      <rect
        x={b.x}
        y={b.y}
        width={b.w}
        height={b.h}
        rx={6}
        fill={b.fill}
        stroke="var(--color-ink)"
        strokeWidth={stroke}
      />
      {b.antenna ? (
        <line
          x1={b.x + b.w / 2}
          y1={b.y}
          x2={b.x + b.w / 2}
          y2={b.y - 22}
          stroke="var(--color-ink)"
          strokeWidth={stroke}
          strokeLinecap="round"
        />
      ) : null}
      <Windows b={b} />
    </g>
  );
}

function Tree({ cx }: { cx: number }) {
  return (
    <g className="skyline-building">
      <line x1={cx} y1={250} x2={cx} y2={222} stroke="var(--color-ink)" strokeWidth={2} />
      <circle cx={cx} cy={212} r={20} fill="var(--color-green)" stroke="var(--color-ink)" strokeWidth={1.5} />
    </g>
  );
}

function Cloud({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g className="skyline-cloud" fill="var(--color-sky-pale)" opacity={0.6}>
      <ellipse cx={cx} cy={cy} rx={38} ry={16} />
      <ellipse cx={cx + 28} cy={cy + 6} rx={30} ry={13} />
      <ellipse cx={cx - 30} cy={cy + 7} rx={26} ry={11} />
    </g>
  );
}

export default function Skyline({ className = '', animateIn = false }: SkylineProps) {
  return (
    <svg
      viewBox="0 0 1440 260"
      className={`${className} ${animateIn ? 'skyline-animate' : ''}`.trim()}
      role="img"
      aria-label="六都城市天際線插圖"
      preserveAspectRatio="xMidYMax meet"
    >
      <g data-layer="back" opacity={0.45}>
        {BACK.map((b) => (
          <rect key={b.x} x={b.x} y={b.y} width={b.w} height={b.h} rx={6} fill={b.fill} />
        ))}
      </g>
      <g data-layer="mid">
        <Cloud cx={210} cy={52} />
        <Cloud cx={1130} cy={40} />
        {MID.map((b) => (
          <Building key={b.x} b={b} stroke={1} />
        ))}
      </g>
      <g data-layer="front">
        {FRONT.map((b) => (
          <Building key={b.x} b={b} stroke={1.5} />
        ))}
        {TREES.map((cx) => (
          <Tree key={cx} cx={cx} />
        ))}
        <line x1={0} y1={250} x2={1440} y2={250} stroke="var(--color-ink)" strokeWidth={2} />
      </g>
    </svg>
  );
}
