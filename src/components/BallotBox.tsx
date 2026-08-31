interface BallotBoxProps {
  className?: string;
}

export default function BallotBox({ className = '' }: BallotBoxProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="投票箱圖示">
      <g className="ballot-paper">
        <path d="M24 5 H40 V25 H24 Z" fill="var(--color-cream)" stroke="var(--color-ink)" strokeWidth={2} strokeLinejoin="round" />
        <path d="M28 11 H36 M28 16 H36" fill="none" stroke="var(--color-purple-mid)" strokeWidth={1.8} strokeLinecap="round" />
      </g>
      <path d="M8 25 H56 V58 H8 Z" fill="var(--color-purple-deep)" stroke="var(--color-ink)" strokeWidth={2} strokeLinejoin="round" />
      <path d="M20 23 H44 V29 H20 Z" fill="var(--color-ink)" />
      <path d="M16 37 H48 V49 H16 Z" fill="var(--color-cream)" opacity={0.9} />
      <path d="M23 43 L27 47 L36 38" fill="none" stroke="var(--color-green)" strokeWidth={2.8} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
