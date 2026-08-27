import type { DemandPillar } from '../content/demands';

interface PillarIconProps {
  pillar: DemandPillar['id'];
  className?: string;
}

const INK = 'var(--color-ink)';
const S = { stroke: INK, strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

export default function PillarIcon({ pillar, className = '' }: PillarIconProps) {
  return (
    <svg viewBox="0 0 56 56" className={className} aria-hidden="true">
      {pillar === 'energy' ? (
        <>
          <circle cx={40} cy={13} r={6.5} {...S} fill="#FFE9A3" />
          <g {...S} strokeWidth={1.3}>
            <line x1={40} y1={3} x2={40} y2={0.5} />
            <line x1={49} y1={13} x2={51.5} y2={13} />
            <line x1={46.5} y1={6.5} x2={48.5} y2={4.5} />
            <line x1={46.5} y1={19.5} x2={48.5} y2={21.5} />
          </g>
          <path d="M10 26 H38 L44 42 H16 Z" {...S} fill="var(--color-sky-pale)" />
          <path d="M17.5 26 L21.5 42 M26.5 26 L29 42 M34 26 L37.5 42 M12.7 31.5 H40 M15 37 H42.3" {...S} strokeWidth={1.1} fill="none" />
          <line x1={30} y1={42} x2={30} y2={50} {...S} />
          <line x1={22} y1={50} x2={38} y2={50} {...S} />
          <path d="M9 50 L13 43 L11.5 43 L15 37.5" fill="none" {...S} stroke="var(--color-purple-mid)" strokeWidth={2} />
        </>
      ) : null}
      {pillar === 'resilience' ? (
        <>
          <path d="M8 26 L26 11 L44 26" fill="none" {...S} strokeWidth={2} />
          <path d="M12 23 V46 H40 V23" fill="var(--color-green-pale)" {...S} />
          <rect x={17} y={30} width={8} height={8} rx={1} fill="#FFE9A3" {...S} strokeWidth={1.2} />
          <path d="M17 34 H25 M21 30 V38" {...S} strokeWidth={0.9} fill="none" />
          <rect x={29} y={34} width={7} height={12} rx={1} fill="var(--color-cream)" {...S} strokeWidth={1.2} />
          <rect x={44} y={28} width={9} height={16} rx={2} fill="var(--color-green)" {...S} strokeWidth={1.4} />
          <rect x={46.5} y={25.5} width={4} height={2.5} rx={1} fill={INK} />
          <path d="M49.5 31 L47 36 H49 L46.5 41" fill="none" stroke="#ffffff" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
          <path d="M26 5 L26 11" {...S} strokeWidth={1.2} fill="none" />
          <circle cx={26} cy={4} r={1.6} fill="var(--color-purple-mid)" />
        </>
      ) : null}
      {pillar === 'heat' ? (
        <>
          <circle cx={13} cy={11} r={6} {...S} fill="var(--color-purple-light)" />
          <g {...S} strokeWidth={1.3}>
            <line x1={13} y1={1.5} x2={13} y2={3.5} />
            <line x1={4} y1={11} x2={2} y2={11} />
            <line x1={7} y1={5} x2={5.5} y2={3.5} />
            <line x1={19} y1={5} x2={20.5} y2={3.5} />
            <line x1={22} y1={11} x2={24} y2={11} />
          </g>
          <rect x={30} y={6} width={9} height={28} rx={4.5} fill="var(--color-cream)" {...S} />
          <circle cx={34.5} cy={41} r={8} fill="var(--color-purple-light)" {...S} />
          <line x1={34.5} y1={37} x2={34.5} y2={14} stroke="var(--color-purple-light)" strokeWidth={3.4} strokeLinecap="round" />
          <g {...S} strokeWidth={1}>
            <line x1={41.5} y1={12} x2={44} y2={12} />
            <line x1={41.5} y1={18} x2={44} y2={18} />
            <line x1={41.5} y1={24} x2={44} y2={24} />
          </g>
          <path d="M6 47 Q12 40 20 44 Q16 50 8 50 Z" fill="var(--color-green)" {...S} strokeWidth={1.3} />
          <line x1={12} y1={47} x2={7} y2={54} {...S} strokeWidth={1.4} />
        </>
      ) : null}
      {pillar === 'flood' ? (
        <>
          <path d="M14 7 Q14 1.5 20 1.5 Q22 -1.5 26 0.5 Q31 -1.5 32 3 Q37 3.5 36 8 Q35 11 31 11 H17 Q14 11 14 7 Z" fill="var(--color-sky-pale)" {...S} strokeWidth={1.3} />
          <g stroke="var(--color-sky)" strokeWidth={1.8} strokeLinecap="round">
            <line x1={19} y1={15} x2={17.5} y2={20} />
            <line x1={25} y1={15} x2={23.5} y2={20} />
            <line x1={31} y1={15} x2={29.5} y2={20} />
          </g>
          <path d="M40 14 L50 23 V32 H40 V23 Z" fill="var(--color-green-pale)" {...S} strokeWidth={1.3} transform="rotate(3 45 23)" />
          <path d="M2 34 Q8 28 14 34 T26 34 T38 34 T50 34 T56 32" fill="none" stroke="var(--color-sky)" strokeWidth={2.2} strokeLinecap="round" />
          <path d="M2 42 Q8 36 14 42 T26 42 T38 42 T50 42 T56 40" fill="none" stroke="var(--color-teal)" strokeWidth={2.2} strokeLinecap="round" />
          <path d="M2 50 Q8 44 14 50 T26 50 T38 50 T50 50 T56 48" fill="none" stroke="var(--color-sky-pale)" strokeWidth={2.2} strokeLinecap="round" />
          <circle cx={20} cy={26} r={2.2} fill="var(--color-green)" {...S} strokeWidth={1} />
          <circle cx={30} cy={27.5} r={1.6} fill="var(--color-green)" {...S} strokeWidth={1} />
        </>
      ) : null}
      {pillar === 'transport' ? (
        <>
          <rect x={4} y={10} width={30} height={22} rx={4} fill="var(--color-green)" {...S} />
          <rect x={8} y={14} width={9} height={8} rx={1.5} fill="var(--color-cream)" {...S} strokeWidth={1.1} />
          <rect x={21} y={14} width={9} height={8} rx={1.5} fill="var(--color-cream)" {...S} strokeWidth={1.1} />
          <line x1={4} y1={26} x2={34} y2={26} {...S} strokeWidth={1.1} />
          <circle cx={12} cy={33} r={3.6} fill={INK} />
          <circle cx={27} cy={33} r={3.6} fill={INK} />
          <circle cx={12} cy={33} r={1.4} fill="#ffffff" />
          <circle cx={27} cy={33} r={1.4} fill="#ffffff" />
          <circle cx={40} cy={47} r={6.5} fill="none" {...S} />
          <circle cx={53} cy={47} r={6.5} fill="none" {...S} strokeWidth={1.4} />
          <path d="M40 47 L44.5 38 H50 L53 47 M44.5 38 L47.5 47" fill="none" {...S} strokeWidth={1.4} />
          <circle cx={13} cy={43} r={2.4} fill="var(--color-purple-mid)" {...S} strokeWidth={1} />
          <path d="M13 46 V51 M13 47.5 L9.5 50 M13 47.5 L16.5 50 M13 51 L10.5 55 M13 51 L15.5 55" fill="none" {...S} strokeWidth={1.4} />
          <g stroke={INK} strokeWidth={1} opacity={0.55}>
            <line x1={20} y1={54} x2={26} y2={54} />
            <line x1={29} y1={54} x2={35} y2={54} />
          </g>
        </>
      ) : null}
    </svg>
  );
}
