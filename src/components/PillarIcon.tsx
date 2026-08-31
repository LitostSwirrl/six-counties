import type { DemandPillar } from '../content/demands';

interface PillarIconProps {
  pillar: DemandPillar['id'];
  className?: string;
}

const S = {
  stroke: 'var(--color-ink)',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

export default function PillarIcon({ pillar, className = '' }: PillarIconProps) {
  return (
    <svg viewBox="0 0 56 56" className={className} aria-hidden="true">
      {pillar === 'energy' ? (
        <>
          <circle cx={43} cy={12} r={6} fill="#FFE9A3" {...S} />
          <path d="M43 2 V5 M43 19 V22 M33 12 H30 M56 12 H53 M36 5 L34 3 M50 5 L52 3" fill="none" {...S} strokeWidth={1.5} />
          <path d="M8 29 L35 24 L43 40 L16 45 Z" fill="var(--color-sky-pale)" {...S} />
          <path d="M14 30 L20 43 M22 28 L28 42 M30 26 L36 40 M11 36 L39 31 M14 41 L41 37" fill="none" {...S} strokeWidth={1.2} />
          <path d="M28 45 V51 M20 51 H36" fill="none" {...S} />
        </>
      ) : null}
      {pillar === 'resilience' ? (
        <>
          <path d="M7 27 L28 9 L45 23 V48 H11 V24" fill="var(--color-green-pale)" {...S} />
          <path d="M20 48 V34 H31 V48 M36 28 H42 V34 H36 Z" fill="var(--color-cream)" {...S} />
          <path d="M47 34 C51 29 55 32 54 36 C53 40 49 42 47 47 C45 42 41 40 40 36 C39 32 43 29 47 34 Z" fill="var(--color-purple-light)" {...S} />
        </>
      ) : null}
      {pillar === 'heat' ? (
        <>
          <circle cx={14} cy={14} r={7} fill="var(--color-purple-light)" {...S} />
          <path d="M14 3 V6 M14 22 V25 M3 14 H6 M22 14 H25 M6 6 L8 8 M22 6 L20 8" fill="none" {...S} strokeWidth={1.5} />
          <rect x={32} y={9} width={10} height={28} rx={5} fill="var(--color-cream)" {...S} />
          <circle cx={37} cy={43} r={8} fill="var(--color-purple-light)" {...S} />
          <path d="M37 43 V16 M46 19 H51 M46 26 H51 M46 33 H51" fill="none" {...S} />
        </>
      ) : null}
      {pillar === 'flood' ? (
        <>
          <path d="M9 24 C9 18 14 15 19 16 C21 10 29 9 33 15 C40 14 46 18 46 24 C46 28 43 30 39 30 H16 C12 30 9 28 9 24 Z" fill="var(--color-sky-pale)" {...S} />
          <path d="M18 34 L16 39 M28 34 L26 39 M38 34 L36 39" fill="none" stroke="var(--color-sky)" strokeWidth={2.2} strokeLinecap="round" />
          <path d="M5 46 Q12 40 19 46 T33 46 T47 43 M5 53 Q12 47 19 53 T33 53 T47 50" fill="none" stroke="var(--color-teal)" strokeWidth={2.3} strokeLinecap="round" />
        </>
      ) : null}
      {pillar === 'transport' ? (
        <>
          <path d="M8 18 C8 15 11 13 14 13 H38 C41 13 44 16 44 19 V39 H8 Z" fill="var(--color-green)" {...S} />
          <path d="M13 18 H24 V28 H13 Z M28 18 H39 V28 H28 Z" fill="var(--color-cream)" {...S} strokeWidth={1.4} />
          <path d="M8 33 H44 M14 40 H38" fill="none" {...S} />
          <circle cx={17} cy={40} r={4} fill="var(--color-ink)" />
          <circle cx={35} cy={40} r={4} fill="var(--color-ink)" />
          <path d="M47 20 H53 M50 17 L53 20 L50 23" fill="none" stroke="var(--color-purple-mid)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </>
      ) : null}
    </svg>
  );
}
