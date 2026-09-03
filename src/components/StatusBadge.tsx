import type { Candidate } from '../data/types';
import { DEMAND_COUNT } from '../content/demands';

interface StatusBadgeProps {
  candidate: Candidate;
}

export default function StatusBadge({ candidate }: StatusBadgeProps) {
  const signedCount = candidate.checks.filter(Boolean).length;
  if (candidate.status !== 'none' && signedCount >= DEMAND_COUNT) {
    return <span className="rounded-md bg-green px-3 py-1 text-xs font-bold text-white">全數承諾</span>;
  }
  if (candidate.status !== 'none' && signedCount > 0) {
    return (
      <span className="rounded-md bg-green-pale px-3 py-1 text-xs font-bold text-ink/80">
        部分承諾 {signedCount} 項
      </span>
    );
  }
  return <span className="rounded-md border border-ink/25 px-3 py-1 text-xs font-bold text-ink/60">尚未回應</span>;
}
