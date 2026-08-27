import type { DemandPillar } from '../content/demands';

interface PillarIconProps {
  pillar: DemandPillar['id'];
  className?: string;
}

const STROKE = {
  stroke: 'var(--color-ink)',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  fill: 'none',
} as const;

export default function PillarIcon({ pillar, className = '' }: PillarIconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      {pillar === 'energy' ? (
        <>
          <circle cx={34} cy={12} r={6} {...STROKE} fill="var(--color-sky)" />
          <rect x={6} y={22} width={26} height={16} rx={2} transform="skewX(-12)" transform-origin="19 30" {...STROKE} fill="var(--color-green-pale)" />
          <path d="M10 27 H32 M12 33 H34 M17 22 L15 38 M25 22 L23 38" {...STROKE} strokeWidth={1.5} />
        </>
      ) : null}
      {pillar === 'resilience' ? (
        <>
          <path d="M8 24 L24 10 L40 24" {...STROKE} />
          <path d="M12 22 V38 H36 V22" {...STROKE} fill="var(--color-green-pale)" />
          <path d="M25 24 L21 31 H26 L22 38" stroke="var(--color-purple-mid)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </>
      ) : null}
      {pillar === 'heat' ? (
        <>
          <rect x={20} y={8} width={8} height={22} rx={4} {...STROKE} fill="var(--color-cream)" />
          <circle cx={24} cy={34} r={7} {...STROKE} fill="var(--color-purple-light)" />
          <path d="M24 30 V16" stroke="var(--color-purple-light)" strokeWidth={3} strokeLinecap="round" />
          <path d="M36 14 L40 10 M38 20 H43 M34 8 L36 4" {...STROKE} strokeWidth={1.5} />
        </>
      ) : null}
      {pillar === 'flood' ? (
        <>
          <path d="M4 32 Q10 28 16 32 T28 32 T40 32 T48 32" stroke="var(--color-sky)" strokeWidth={2.5} fill="none" strokeLinecap="round" />
          <path d="M4 39 Q10 35 16 39 T28 39 T40 39 T48 39" stroke="var(--color-teal)" strokeWidth={2.5} fill="none" strokeLinecap="round" />
          <circle cx={30} cy={16} r={6} {...STROKE} strokeWidth={1.5} fill="var(--color-green)" />
          <path d="M30 22 V28" {...STROKE} strokeWidth={1.5} />
        </>
      ) : null}
      {pillar === 'transport' ? (
        <>
          <circle cx={14} cy={34} r={7} {...STROKE} fill="var(--color-green-pale)" />
          <circle cx={36} cy={34} r={7} {...STROKE} fill="var(--color-green-pale)" />
          <path d="M14 34 L21 20 H30 L36 34 M21 20 L26 34" {...STROKE} strokeWidth={1.5} />
          <circle cx={27} cy={11} r={3} {...STROKE} strokeWidth={1.5} fill="var(--color-purple-light)" />
        </>
      ) : null}
    </svg>
  );
}
