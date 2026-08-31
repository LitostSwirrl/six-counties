import type { DemandPillar } from '../content/demands';

interface PillarIconProps {
  pillar: DemandPillar['id'];
  className?: string;
}

const S = {
  stroke: 'var(--color-ink)',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

export default function PillarIcon({ pillar, className = '' }: PillarIconProps) {
  return (
    <svg viewBox="0 0 56 56" className={className} aria-hidden="true">
      {pillar === 'energy' ? (
        <>
          <circle cx={43} cy={12} r={6} fill="#FFE9A3" {...S} />
          <path d="M43 2 V5 M43 19 V22 M33 12 H30 M56 12 H53 M36 5 L34 3 M50 5 L52 3" fill="none" {...S} strokeWidth={1.4} />
          <path d="M8 27 L35 23 L43 39 L16 43 Z" fill="var(--color-sky-pale)" {...S} />
          <path d="M14 28 L20 41 M22 27 L28 40 M30 25 L36 38 M11 34 L39 30 M14 39 L41 35" fill="none" {...S} strokeWidth={1.1} />
          <path d="M28 43 V50 M20 50 H36" fill="none" {...S} />
          <path d="M10 50 L15 44 H12 L18 37" fill="none" stroke="var(--color-purple-mid)" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
        </>
      ) : null}
      {pillar === 'resilience' ? (
        <>
          <path d="M8 27 L28 10 L48 27" fill="var(--color-green-pale)" {...S} />
          <path d="M13 24 V47 H43 V24" fill="var(--color-green-pale)" {...S} />
          <path d="M20 47 V34 H29 V47 M35 47 V37 H39 V47" fill="var(--color-cream)" {...S} strokeWidth={1.4} />
          <path d="M38 4 V10 M35 7 H41" fill="none" stroke="var(--color-purple-mid)" strokeWidth={1.6} strokeLinecap="round" />
          <path d="M50 29 V45" fill="none" stroke="var(--color-green)" strokeWidth={5} strokeLinecap="round" />
          <path d="M50 32 L47 38 H50 L47.5 43" fill="none" stroke="white" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        </>
      ) : null}
      {pillar === 'heat' ? (
        <>
          <circle cx={13} cy={12} r={6} fill="var(--color-purple-light)" {...S} />
          <path d="M13 2 V5 M13 19 V22 M3 12 H6 M20 12 H23 M6 5 L8 7 M20 5 L18 7" fill="none" {...S} strokeWidth={1.4} />
          <rect x={29} y={7} width={10} height={29} rx={5} fill="var(--color-cream)" {...S} />
          <circle cx={34} cy={42} r={8} fill="var(--color-purple-light)" {...S} />
          <path d="M34 42 V15" fill="none" stroke="var(--color-purple-light)" strokeWidth={3.5} strokeLinecap="round" />
          <path d="M43 17 H47 M43 23 H47 M43 29 H47" fill="none" {...S} strokeWidth={1.1} />
          <path d="M7 50 Q14 43 21 47" fill="none" stroke="var(--color-green)" strokeWidth={2.2} strokeLinecap="round" />
        </>
      ) : null}
      {pillar === 'flood' ? (
        <>
          <path d="M10 20 Q10 13 17 13 Q20 7 26 11 Q32 7 36 13 Q44 13 44 20 Q44 24 39 24 H16 Q10 24 10 20 Z" fill="var(--color-sky-pale)" {...S} />
          <path d="M18 28 L16 33 M27 28 L25 33 M36 28 L34 33" fill="none" stroke="var(--color-sky)" strokeWidth={2} strokeLinecap="round" />
          <path d="M4 39 Q10 34 16 39 T28 39 T40 39 T52 37 M4 48 Q10 43 16 48 T28 48 T40 48 T52 46" fill="none" stroke="var(--color-teal)" strokeWidth={2.2} strokeLinecap="round" />
          <path d="M43 24 L50 30 V39 H43 Z" fill="var(--color-green-pale)" {...S} strokeWidth={1.3} />
          <circle cx={47} cy={34} r={1.5} fill="var(--color-green)" />
        </>
      ) : null}
      {pillar === 'transport' ? (
        <>
          <rect x={8} y={13} width={34} height={23} rx={4} fill="var(--color-green)" {...S} />
          <path d="M13 17 H23 V26 H13 Z M27 17 H37 V26 H27 Z" fill="var(--color-cream)" {...S} strokeWidth={1.2} />
          <path d="M8 31 H42" fill="none" {...S} strokeWidth={1.2} />
          <circle cx={17} cy={37} r={3.5} fill="var(--color-ink)" />
          <circle cx={34} cy={37} r={3.5} fill="var(--color-ink)" />
          <path d="M7 48 H49 M14 44 L10 48 M42 44 L46 48" fill="none" stroke="var(--color-purple-mid)" strokeWidth={1.8} strokeLinecap="round" />
          <path d="M49 16 Q54 19 51 23" fill="none" stroke="var(--color-teal)" strokeWidth={2} strokeLinecap="round" />
        </>
      ) : null}
    </svg>
  );
}
