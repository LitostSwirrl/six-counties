interface SigningHandProps {
  className?: string;
}

const PALM = '#F6D2D1';
const FINGER = '#EEADAC';
const PEN_LIGHT = '#93D6F3';
const PEN_DARK = '#78A7F8';
const PEN_CAP = '#4A5688';
const LINE = '#ED6E35';

export default function SigningHand({ className = '' }: SigningHandProps) {
  return (
    <svg viewBox="3 1 110 110" className={className} role="img" aria-label="簽名圖示" data-icon-family="civic-flat">
      <g data-icon-part="hand">
        <rect x={26.5} y={77} width={11} height={14.5} rx={5.5} fill={FINGER} />
        <rect x={38} y={77} width={11} height={14.5} rx={5.5} fill={FINGER} />
        <path d="M21 80 L47 41.5 Q52 37.5 58 39 C66 40 78 47.5 100 52 V80 C100 84 88 86.5 70 86.5 C60 86.5 54 83 53 80 Z" fill={PALM} />
      </g>
      <g transform="translate(13.5 91) rotate(33.6)">
        <rect data-icon-part="thumb" x={-14} y={-71} width={12} height={60} rx={6} fill={FINGER} />
        <g data-icon-part="pen">
          <path d="M0 0 L-5.5 -8 V-72 H0 Z" fill={PEN_LIGHT} />
          <path d="M0 0 L5.5 -8 V-72 H0 Z" fill={PEN_DARK} />
          <rect x={-5.5} y={-86} width={11} height={14} rx={3} fill={PEN_CAP} />
        </g>
      </g>
      <rect data-icon-part="line" x={95.5} y={43.5} width={11} height={46} rx={3} fill={LINE} />
    </svg>
  );
}
