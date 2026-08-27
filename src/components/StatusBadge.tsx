import type { Candidate } from '../data/types';

interface StatusBadgeProps {
  candidate: Candidate;
}

export default function StatusBadge({ candidate }: StatusBadgeProps) {
  const signedCount = candidate.checks.filter(Boolean).length;
  if (candidate.status === 'signed') {
    return (
      <span className="rounded-full bg-green px-3 py-1 text-xs font-bold text-white">
        已簽署 {signedCount} 項
      </span>
    );
  }
  if (candidate.status === 'partial') {
    return (
      <span className="rounded-full bg-green-pale px-3 py-1 text-xs font-bold text-ink/80">
        部分簽署 {signedCount} 項
      </span>
    );
  }
  if (candidate.status === 'met') {
    return <span className="rounded-full bg-sky-pale px-3 py-1 text-xs font-bold text-ink/80">已拜會</span>;
  }
  return <span className="rounded-full border border-ink/25 px-3 py-1 text-xs font-bold text-ink/60">尚未回應</span>;
}
