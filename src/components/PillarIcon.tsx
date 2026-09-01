import type { DemandPillar } from '../content/demands';

interface PillarIconProps {
  pillar: DemandPillar['id'];
  className?: string;
}

const S = {
  stroke: 'var(--color-ink)',
  strokeWidth: 2.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

export default function PillarIcon({ pillar, className = '' }: PillarIconProps) {
  return (
    <svg viewBox="0 0 56 56" className={className} aria-hidden="true" data-icon-family="civic-line">
      {pillar === 'energy' ? (
        <>
          <g data-icon-part="sun">
            <circle cx={14} cy={12} r={5.5} fill="#FFE9A3" {...S} />
            <path d="M14 2 V5 M14 19 V22 M4 12 H7 M21 12 H24 M6.9 4.9 L9 7 M21.1 4.9 L19 7 M6.9 19.1 L9 17 M21.1 19.1 L19 17" fill="none" {...S} strokeWidth={1.8} />
          </g>
          <g data-icon-part="solar-panel">
            <path d="M9 29 L34 25 L42 41 L17 45 Z" fill="var(--color-sky-pale)" {...S} />
            <path d="M15 28 L21 44 M23 27 L29 42 M31 26 L37 41 M11 35 L39 31 M14 40 L40 36" fill="none" stroke="var(--color-ink)" strokeWidth={1.4} strokeLinecap="round" />
            <path d="M29 45 V51 M21 51 H37" fill="none" {...S} />
          </g>
        </>
      ) : null}
      {pillar === 'resilience' ? (
        <>
          <g data-icon-part="house">
            <path d="M8 26 L27 10 L45 25 V49 H9 V25" fill="var(--color-green-pale)" {...S} />
            <path d="M19 49 V34 H30 V49 M34 29 H40 V35 H34 Z" fill="var(--color-cream)" {...S} strokeWidth={2} />
          </g>
          <path data-icon-part="heart" d="M43 35 C45.5 31.5 51 32.5 51 37 C50.5 41 47 44 43 48 C39 44 36 41 36 37 C36 32.5 40.5 31.5 43 35 Z" fill="var(--color-purple-light)" {...S} />
        </>
      ) : null}
      {pillar === 'heat' ? (
        <>
          <g data-icon-part="sun">
            <circle cx={13} cy={15} r={6} fill="var(--color-purple-light)" {...S} />
            <path d="M13 3 V6 M13 24 V27 M2 15 H5 M21 15 H24 M5.2 7.2 L7.3 9.3 M20.8 7.2 L18.7 9.3 M5.2 22.8 L7.3 20.7 M20.8 22.8 L18.7 20.7" fill="none" {...S} strokeWidth={1.8} />
          </g>
          <g data-icon-part="thermometer">
            <rect x={31} y={10} width={10} height={28} rx={5} fill="var(--color-cream)" {...S} />
            <circle cx={36} cy={45} r={7} fill="var(--color-purple-light)" {...S} />
            <path d="M36 45 V16 M45 19 H50 M45 26 H50 M45 33 H50" fill="none" {...S} strokeWidth={1.8} />
          </g>
        </>
      ) : null}
      {pillar === 'flood' ? (
        <>
          <g data-icon-part="cloud">
            <path d="M8 24 C8 18 13 15 19 16 C21 12 28 11 33 15 C40 14 47 18 47 24 C47 28 44 30 40 30 H15 C11 30 8 28 8 24 Z" fill="var(--color-sky-pale)" {...S} />
          </g>
          <g data-icon-part="rain" fill="none" stroke="var(--color-sky)" strokeWidth={2.5} strokeLinecap="round">
            <path d="M18 35 L16 41 M28 35 L26 41 M38 35 L36 41" />
          </g>
          <g data-icon-part="waves" fill="none" stroke="var(--color-teal)" strokeWidth={2.5} strokeLinecap="round">
            <path d="M5 47 Q12 42 19 47 T33 47 T47 47" />
            <path d="M5 53 Q12 48 19 53 T33 53 T47 53" />
          </g>
        </>
      ) : null}
      {pillar === 'transport' ? (
        <>
          <g data-icon-part="bus">
            <path d="M8 19 C8 15 11 13 15 13 H36 C41 13 44 16 44 20 V40 H8 Z" fill="var(--color-green)" {...S} />
            <path d="M13 18 H23 V28 H13 Z M28 18 H39 V28 H28 Z" fill="var(--color-cream)" {...S} strokeWidth={1.8} />
            <path d="M8 33 H44 M14 40 H38" fill="none" {...S} />
            <circle cx={16} cy={40} r={4} fill="var(--color-ink)" />
            <circle cx={35} cy={40} r={4} fill="var(--color-ink)" />
          </g>
          <path data-icon-part="direction" d="M47 21 H53 M50 18 L53 21 L50 24" fill="none" stroke="var(--color-purple-mid)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
        </>
      ) : null}
    </svg>
  );
}
