interface BallotBoxProps {
  className?: string;
}

export default function BallotBox({ className = '' }: BallotBoxProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="投票箱圖示">
      <path d="M25 6 H39 V25 H25 Z" fill="var(--color-cream)" stroke="var(--color-ink)" strokeWidth={2} strokeLinejoin="round" />
      <path d="M29 12 H35 M29 17 H35" fill="none" stroke="var(--color-purple-mid)" strokeWidth={1.8} strokeLinecap="round" />
      <path d="M10 24 H54 V58 H10 Z" fill="var(--color-purple-deep)" stroke="var(--color-ink)" strokeWidth={2} strokeLinejoin="round" />
      <path d="M20 22 H44 V28 H20 Z" fill="var(--color-ink)" />
      <rect x={17} y={36} width={30} height={15} rx={2} fill="var(--color-cream)" opacity={0.95} />
      <path d="M24 44 L28 48 L39 38" fill="none" stroke="var(--color-green)" strokeWidth={2.8} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
