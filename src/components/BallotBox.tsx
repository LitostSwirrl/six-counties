interface BallotBoxProps {
  className?: string;
}

export default function BallotBox({ className = '' }: BallotBoxProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="投票箱圖示" data-icon-family="civic-line">
      <path data-icon-part="paper" d="M23 5 H41 V25 H23 Z" fill="var(--color-cream)" stroke="var(--color-ink)" strokeWidth={2.5} strokeLinejoin="round" />
      <path d="M27 11 H37 M27 16 H37" fill="none" stroke="var(--color-purple-mid)" strokeWidth={2} strokeLinecap="round" />
      <path data-icon-part="box" d="M10 25 H54 V57 H10 Z" fill="var(--color-purple-deep)" stroke="var(--color-ink)" strokeWidth={2.5} strokeLinejoin="round" />
      <path data-icon-part="slot" d="M18 22 H46 V28 H18 Z" fill="var(--color-ink)" stroke="var(--color-ink)" strokeWidth={1.5} strokeLinejoin="round" />
      <g data-icon-part="check">
        <rect x={16} y={35} width={32} height={16} rx={3} fill="var(--color-cream)" stroke="var(--color-ink)" strokeWidth={1.5} />
        <path d="M23 43 L28 47 L40 37.5" fill="none" stroke="var(--color-green)" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}
