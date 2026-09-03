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
            <circle cx={13} cy={12} r={5.5} fill="#FFE9A3" {...S} />
            <path d="M13 2 V4.5 M13 19.5 V22 M3 12 H5.5 M20.5 12 H23 M5.9 4.9 L7.7 6.7 M20.1 4.9 L18.3 6.7 M5.9 19.1 L7.7 17.3 M20.1 19.1 L18.3 17.3" fill="none" {...S} strokeWidth={1.8} />
          </g>
          <g data-icon-part="solar-panel">
            <path d="M10 28 L38 24 L44 42 L16 46 Z" fill="var(--color-sky-pale)" {...S} />
            <path d="M19.33 26.67 L25.33 44.67 M28.67 25.33 L34.67 43.33 M13 37 L41 33" fill="none" stroke="var(--color-ink)" strokeWidth={1.6} strokeLinecap="round" />
            <path d="M30 46 V51 M22 51 H38" fill="none" {...S} />
          </g>
        </>
      ) : null}
      {pillar === 'resilience' ? (
        <>
          <g data-icon-part="house">
            <path d="M8 26 L27 10 L45 25 V49 H9 V25" fill="var(--color-green-pale)" {...S} />
            <path d="M20 49 V35 H31 V49 M13 31 H19 V37 H13 Z" fill="var(--color-cream)" {...S} strokeWidth={2} />
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
            <path d="M5 45.5 Q12 40.5 19 45.5 T33 45.5 T47 45.5" />
            <path d="M5 51.5 Q12 46.5 19 51.5 T33 51.5 T47 51.5" />
          </g>
        </>
      ) : null}
      {pillar === 'transport' ? (
        <>
          <g data-icon-part="bicycle">
            <circle cx={14} cy={39} r={9.5} fill="var(--color-cream)" {...S} />
            <circle cx={42} cy={39} r={9.5} fill="var(--color-cream)" {...S} />
            <path d="M14 39 L22 23 L36 23 L42 39 M22 23 L28 40 L36 23 M28 40 L14 39" fill="none" stroke="var(--color-green)" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
            <circle cx={28} cy={40} r={2.2} fill="var(--color-cream)" {...S} strokeWidth={2} />
            <path d="M17.5 21 H26 M36 23 L37 18.5 M32.5 18.5 H41.5" fill="none" {...S} strokeWidth={2.2} />
          </g>
          <path data-icon-part="direction" d="M45 14 H52 M49 10.5 L52.5 14 L49 17.5" fill="none" stroke="var(--color-purple-mid)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
        </>
      ) : null}
    </svg>
  );
}
