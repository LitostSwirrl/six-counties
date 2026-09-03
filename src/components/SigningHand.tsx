interface SigningHandProps {
  className?: string;
}

const S = {
  stroke: 'var(--color-ink)',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

export default function SigningHand({ className = '' }: SigningHandProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="簽名圖示" data-icon-family="civic-line">
      <g data-icon-part="paper">
        <path d="M9 12 H43 L52 21 V56 H9 Z" fill="var(--color-cream)" {...S} />
        <path d="M43 12 V21 H52" fill="none" {...S} strokeWidth={1.8} />
      </g>
      <path
        data-icon-part="signature"
        d="M16 44 Q21 32 25 44 T33 44 Q37 36 41 45"
        fill="none"
        stroke="var(--color-purple-mid)"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g data-icon-part="pen">
        <path d="M56 14 L61 19 L37 43 L30 45 L32 38 Z" fill="var(--color-purple-deep)" {...S} />
        <path d="M32 38 L37 43" fill="none" {...S} strokeWidth={1.8} />
      </g>
      <g data-icon-part="hand">
        <path d="M24 62 V52 C24 47 28 44 33 45 L45 48 C49 49 50 52 48 55 L44 62 Z" fill="#F2C9A0" {...S} />
        <path d="M33 51 L41 53" fill="none" {...S} strokeWidth={1.6} />
      </g>
    </svg>
  );
}
