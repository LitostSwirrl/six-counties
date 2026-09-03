interface SigningHandProps {
  className?: string;
}

const PALM = '#D9C4DC';
const THUMB = '#B892BC';

export default function SigningHand({ className = '' }: SigningHandProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="簽名圖示" data-icon-family="civic-flat">
      <g data-icon-part="hand">
        <path d="M7 42 Q7 30 19 28 L42 24 Q50 23 50 31 V55 H17 Q7 55 7 46 Z" fill={PALM} />
        <circle cx={13} cy={54} r={5.5} fill={PALM} />
        <circle cx={24} cy={57} r={5.5} fill={PALM} />
        <circle cx={35} cy={57} r={5.5} fill={PALM} />
      </g>
      <g data-icon-part="pen" transform="translate(8 54) rotate(45)">
        <path d="M0 0 L-4.5 -9 H4.5 Z" fill="var(--color-purple-deep)" />
        <rect x={-4.5} y={-46} width={9} height={37} rx={1.5} fill="var(--color-sky)" />
        <rect x={-4.5} y={-14} width={9} height={3} fill="var(--color-teal)" />
        <rect x={-4.5} y={-54} width={9} height={9} rx={2} fill="var(--color-purple-deep)" />
      </g>
      <rect
        data-icon-part="thumb"
        x={-4.5}
        y={-19}
        width={9}
        height={19}
        rx={4.5}
        transform="translate(22 45) rotate(45)"
        fill={THUMB}
      />
      <rect data-icon-part="line" x={55} y={30} width={6} height={26} rx={3} fill="var(--color-green)" />
    </svg>
  );
}
