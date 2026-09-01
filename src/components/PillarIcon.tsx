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
            <circle cx={14} cy={13} r={5.5} fill="#FFE9A3" {...S} />
            <path d="M14 2 V5 M14 21 V24 M3 13 H6 M22 13 H25 M6.5 5.5 L8.5 7.5 M21.5 5.5 L19.5 7.5 M6.5 20.5 L8.5 18.5 M21.5 20.5 L19.5 18.5" fill="none" {...S} strokeWidth={1.8} />
          </g>
          <g data-icon-part="solar-panel">
            <path d="M8 29 L34 24 L43 41 L17 46 Z" fill="var(--color-sky-pale)" {...S} />
            <path d="M14 29.5 L20 44 M22 28 L28 42.5 M30 26.5 L36 41 M11 35.5 L39 30.5 M14 41 L41 36.5" fill="none" stroke="var(--color-ink)" strokeWidth={1.4} strokeLinecap="round" />
            <path d="M29 46 V52 M21 52 H37" fill="none" {...S} />
          </g>
        </>
      ) : null}
      {pillar === 'resilience' ? (
        <>
          <g data-icon-part="house">
            <path d="M7 27 L28 9 L48 26 V49 H9 V25" fill="var(--color-green-pale)" {...S} />
            <path d="M20 49 V34 H31 V49 M36 29 H42 V35 H36 Z" fill="var(--color-cream)" {...S} strokeWidth={2} />
          </g>
          <path data-icon-part="heart" d="M45 34 C48 30 54 32 53 37 C52 41 48 44 45 48 C42 44 38 41 37 37 C36 32 42 30 45 34 Z" fill="var(--color-purple-light)" {...S} />
        </>
      ) : null}
      {pillar === 'heat' ? (
        <>
          <g data-icon-part="sun">
            <circle cx={13} cy={14} r={6.5} fill="var(--color-purple-light)" {...S} />
            <path d="M13 2 V5 M13 23 V26 M1 14 H4 M22 14 H25 M4.5 5.5 L6.5 7.5 M21.5 5.5 L19.5 7.5 M4.5 22.5 L6.5 20.5 M21.5 22.5 L19.5 20.5" fill="none" {...S} strokeWidth={1.8} />
          </g>
          <g data-icon-part="thermometer">
            <rect x={31} y={8} width={11} height={30} rx={5.5} fill="var(--color-cream)" {...S} />
            <circle cx={36.5} cy={44} r={8} fill="var(--color-purple-light)" {...S} />
            <path d="M36.5 44 V15 M46 19 H51 M46 26 H51 M46 33 H51" fill="none" {...S} strokeWidth={2} />
          </g>
        </>
      ) : null}
      {pillar === 'flood' ? (
        <>
          <g data-icon-part="cloud">
            <path d="M8 24 C8 18 13 15 19 16 C21 11 29 10 33 15 C40 14 47 18 47 24 C47 28 44 30 40 30 H15 C11 30 8 28 8 24 Z" fill="var(--color-sky-pale)" {...S} />
          </g>
          <g data-icon-part="rain" fill="none" stroke="var(--color-sky)" strokeWidth={2.5} strokeLinecap="round">
            <path d="M18 35 L16 41 M28 35 L26 41 M38 35 L36 41" />
          </g>
          <g data-icon-part="waves" fill="none" stroke="var(--color-teal)" strokeWidth={2.5} strokeLinecap="round">
            <path d="M5 47 Q12 41 19 47 T33 47 T47 44" />
            <path d="M5 53 Q12 47 19 53 T33 53 T47 50" />
          </g>
        </>
      ) : null}
      {pillar === 'transport' ? (
        <>
          <g data-icon-part="bus">
            <path d="M8 19 C8 15 11 13 15 13 H37 C42 13 45 16 45 20 V40 H8 Z" fill="var(--color-green)" {...S} />
            <path d="M13 18 H24 V28 H13 Z M29 18 H40 V28 H29 Z" fill="var(--color-cream)" {...S} strokeWidth={1.8} />
            <path d="M8 33 H45 M14 40 H39" fill="none" {...S} />
            <circle cx={17} cy={40} r={4} fill="var(--color-ink)" />
            <circle cx={36} cy={40} r={4} fill="var(--color-ink)" />
          </g>
          <path data-icon-part="direction" d="M48 21 H54 M51 18 L54 21 L51 24" fill="none" stroke="var(--color-purple-mid)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
        </>
      ) : null}
    </svg>
  );
}
