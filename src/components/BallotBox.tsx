interface BallotBoxProps {
  className?: string;
}

export default function BallotBox({ className = '' }: BallotBoxProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="投票箱圖示">
      <g className="ballot-paper">
        <rect x={24} y={4} width={16} height={20} rx={2} fill="var(--color-cream)" stroke="var(--color-ink)" strokeWidth={2} />
        <line x1={28} y1={10} x2={36} y2={10} stroke="var(--color-purple-mid)" strokeWidth={2} strokeLinecap="round" />
        <line x1={28} y1={15} x2={36} y2={15} stroke="var(--color-purple-mid)" strokeWidth={2} strokeLinecap="round" />
      </g>
      <rect x={8} y={24} width={48} height={34} rx={5} fill="var(--color-purple-deep)" stroke="var(--color-ink)" strokeWidth={2} />
      <rect x={22} y={22} width={20} height={5} rx={2} fill="var(--color-ink)" />
      <rect x={16} y={36} width={32} height={12} rx={2} fill="var(--color-cream)" opacity={0.9} />
      <path d="M22 42 l4 4 l8 -8" fill="none" stroke="var(--color-green)" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
