import type { HazardKey } from '../content/heatData';

const INK = 'var(--color-ink)';
const S = { stroke: INK, strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' } as const;

export default function HazardIcon({ hazard, active }: { hazard: HazardKey; active: boolean }) {
  return (
    <svg viewBox="0 0 28 28" className={`h-7 w-7 ${active ? '' : 'opacity-0'}`} aria-hidden="true" data-icon-family="civic-line">
      {hazard === 'flood' ? (
        <>
          <g data-icon-part="house">
            <path d="M8.5 16 V10.4 L14 5.6 L19.5 10.4 V16 Z" fill="var(--color-green-pale)" />
            <path d="M7 11 L14 5 L21 11" {...S} />
            <path d="M8.5 10.6 V16 H19.5 V10.6" {...S} />
          </g>
          <g data-icon-part="waves" fill="none" stroke="var(--color-teal)" strokeWidth={2} strokeLinecap="round">
            <path d="M2.5 20.5 Q6.5 17 10.5 20.5 T18.5 20.5 T26 20.5" />
            <path d="M3 24.5 Q7 21 11 24.5 T19 24.5 T26 24.5" stroke="var(--color-sky)" />
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
            <circle cx={19} cy={8} r={3.5} {...S} fill="#FFE9A3" />
            <path d="M19 1.6 V3.2 M19 12.8 V14.4 M12.6 8 H14.2 M23.8 8 H25.4 M14.5 3.5 L15.6 4.6 M23.5 3.5 L22.4 4.6 M14.5 12.5 L15.6 11.4 M23.5 12.5 L22.4 11.4" {...S} strokeWidth={1.4} />
          </g>
          <path data-icon-part="horizon" d="M3 18 H25 M7 18 L8.5 22 L7 25 M14 18 L12.5 21 L14 24 M21 18 L19.5 22 L21 25" {...S} strokeWidth={1.6} />
        </>
      ) : null}
      {hazard === 'sea' ? (
        <>
          <g data-icon-part="waves" fill="none" stroke="var(--color-teal)" strokeWidth={2} strokeLinecap="round">
            <path d="M2.5 19.5 Q6.5 15.5 10.5 19.5 T18.5 19.5 T26 19.5" />
            <path d="M2.5 24.5 Q6.5 20.5 10.5 24.5 T18.5 24.5 T26 24.5" stroke="var(--color-sky)" />
          </g>
          <path d="M14 14 V4 M10.5 7.5 L14 4 L17.5 7.5" {...S} />
        </>
      ) : null}
      {hazard === 'slope' ? (
        <>
          <g data-icon-part="slope">
            <path d="M3 24 L12 9 L18 18 L22 14 L26 24 Z" {...S} fill="var(--color-green-pale)" />
            <path d="M12.5 13.2 L14.9 16.8 M10.9 15.9 L13.3 19.5 M9.2 18.6 L11.6 22.2" stroke={INK} strokeWidth={1.5} opacity={0.75} strokeLinecap="round" />
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
