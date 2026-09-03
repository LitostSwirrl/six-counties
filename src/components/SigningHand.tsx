interface SigningHandProps {
  className?: string;
}

const S = {
  stroke: 'var(--color-ink)',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

const SKIN = '#F2C9A0';

export default function SigningHand({ className = '' }: SigningHandProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="簽名圖示" data-icon-family="civic-line">
      <g data-icon-part="paper">
        <path d="M8 9 H40 L50 19 V56 H8 Z" fill="var(--color-cream)" {...S} />
        <path d="M40 9 V19 H50" fill="none" {...S} strokeWidth={1.8} />
      </g>
      <path
        data-icon-part="signature"
        d="M13 45 C16 37 20 37 22 43 C24 49 26 48 26 42"
        fill="none"
        stroke="var(--color-purple-mid)"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g transform="translate(28 44) rotate(45)">
        <g data-icon-part="hand">
          <path d="M-1 -20 Q-1 -27 6 -27 H16 Q22 -27 22 -20 V-13 Q22 -8 17 -8 H6 Q-1 -8 -1 -13 Z" fill={SKIN} {...S} />
          <path d="M3 -8 a3.5 3.5 0 0 1 7 0 a3.5 3.5 0 0 1 7 0" fill="none" {...S} strokeWidth={1.6} />
        </g>
        <g data-icon-part="pen">
          <path d="M0 0 L-3.5 -8 H3.5 Z" fill="var(--color-cream)" {...S} />
          <rect x={-3.5} y={-42} width={7} height={34} rx={1.5} fill="var(--color-purple-deep)" {...S} />
          <path d="M-3.5 -36 H3.5" fill="none" {...S} strokeWidth={1.6} />
        </g>
        <g data-icon-part="hand">
          <rect x={-10} y={-26} width={7} height={16} rx={3.5} fill={SKIN} {...S} />
          <rect x={3} y={-20} width={7} height={10} rx={3.5} fill={SKIN} {...S} />
        </g>
      </g>
    </svg>
  );
}
