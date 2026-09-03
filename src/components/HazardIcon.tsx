import type { HazardIconKey } from '../content/heatData';

const INK = 'var(--color-ink)';
const S = { stroke: INK, strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' } as const;

export default function HazardIcon({ hazard, active }: { hazard: HazardIconKey; active: boolean }) {
  return (
    <svg viewBox="0 0 28 28" className={`h-7 w-7 ${active ? '' : 'opacity-0'}`} aria-hidden="true" data-icon-family="civic-line">
      {hazard === 'water' ? (
        <>
          <g data-icon-part="cloud">
            <path d="M6 8.5 C6 5.5 9 4 11.5 4.8 C13 2.2 17 2.4 18.2 5.6 C20.6 5.6 21.8 7.4 21.4 9.2 C21 10.8 19.6 11.6 17.6 11.6 H10 C7.6 11.6 6 10.6 6 8.5 Z" {...S} fill="var(--color-sky-pale)" />
          </g>
          <g data-icon-part="rain" stroke="var(--color-sky)" strokeWidth={2} strokeLinecap="round">
            <line x1={11} y1={13.5} x2={10.4} y2={16} />
            <line x1={17} y1={13.5} x2={16.4} y2={16} />
          </g>
          <g data-icon-part="house">
            <path d="M8 21 L14 16 L20 21" {...S} strokeWidth={1.6} />
            <path d="M9.5 20 V24 H18.5 V20" {...S} strokeWidth={1.6} fill="var(--color-green-pale)" />
          </g>
          <g data-icon-part="waves" fill="none" stroke="var(--color-teal)" strokeWidth={1.8} strokeLinecap="round">
            <path d="M2.5 25.5 Q6.5 22.5 10.5 25.5 T18.5 25.5 T26 25.5" />
          </g>
        </>
      ) : null}
      {hazard === 'flood' ? (
        <>
          <g data-icon-part="house">
            <path d="M7 13 L14 7 L21 13" {...S} />
            <path d="M8.5 12 V18 H19.5 V12" {...S} fill="var(--color-green-pale)" />
          </g>
          <g data-icon-part="waves" fill="none" stroke="var(--color-teal)" strokeWidth={2} strokeLinecap="round">
            <path d="M2.5 22 Q6.5 18.5 10.5 22 T18.5 22 T26 22" />
            <path d="M3 26 Q7 22.5 11 26 T19 26 T26 26" stroke="var(--color-sky)" />
          </g>
        </>
      ) : null}
      {hazard === 'rain' ? (
        <>
          <g data-icon-part="cloud">
            <path d="M5.5 12 C5.5 8.5 9 7 12 7.5 C13.5 4.5 18 4.5 19.5 8 C22 8 23 10 22.5 12 C22 14 20.5 15 18 15 H10 C7.5 15 5.5 14 5.5 12 Z" {...S} fill="var(--color-sky-pale)" />
          </g>
          <g data-icon-part="rain" stroke="var(--color-sky)" strokeWidth={2.2} strokeLinecap="round">
            <line x1={10} y1={18} x2={9.2} y2={22} />
            <line x1={14.5} y1={18} x2={13.7} y2={22} />
            <line x1={19} y1={18} x2={18.2} y2={22} />
          </g>
        </>
      ) : null}
      {hazard === 'drought' ? (
        <>
          <g data-icon-part="sun">
            <circle cx={19} cy={8} r={4} {...S} fill="#FFE9A3" />
            <path d="M19 2 V4 M19 12 V14 M13 8 H15 M23 8 H25 M14.5 3.5 L16 5 M23.5 3.5 L22 5" {...S} strokeWidth={1.4} />
          </g>
          <path data-icon-part="horizon" d="M3 18 H25 M7 18 L8.5 22 L7 25 M14 18 L12.5 21 L14 24 M21 18 L19.5 22 L21 25" {...S} strokeWidth={1.6} />
        </>
      ) : null}
      {hazard === 'sea' ? (
        <>
          <g data-icon-part="waves" fill="none" stroke="var(--color-teal)" strokeWidth={2} strokeLinecap="round">
            <path d="M2.5 21 Q6.5 17 10.5 21 T18.5 21 T26 21" />
            <path d="M2.5 26 Q6.5 22 10.5 26 T18.5 26 T26 26" stroke="var(--color-sky)" />
          </g>
          <path d="M14 14 V4 M10.5 7.5 L14 4 L17.5 7.5" {...S} />
        </>
      ) : null}
      {hazard === 'slope' ? (
        <>
          <g data-icon-part="slope">
            <path d="M3 24 L12 9 L18 18 L22 14 L26 24 Z" {...S} fill="var(--color-green-pale)" />
            <path d="M14 14 L17 17 M12.5 17.5 L16 21 M11 21 L14 24" stroke={INK} strokeWidth={1.5} opacity={0.75} strokeLinecap="round" />
          </g>
        </>
      ) : null}
      {hazard === 'wind' ? (
        <>
          <g data-icon-part="wind" {...S}>
            <path d="M3 9 H18 Q22 9 22 6 Q22 3.5 19 3.5" />
            <path d="M3 14 H23 Q26 14 26 17 Q26 20 23 20" />
            <path d="M3 20 H15 Q18 20 18 23 Q18 25 15 25" />
          </g>
        </>
      ) : null}
    </svg>
  );
}
