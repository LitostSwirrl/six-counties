interface OrgGridItem {
  name: string;
  url?: string;
}

interface OrgGridProps {
  items: OrgGridItem[];
  className?: string;
}

export default function OrgGrid({ items, className = '' }: OrgGridProps) {
  return (
    <div className={`grid gap-3 sm:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {items.map((item) =>
        item.url ? (
          <a
            key={item.name}
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between gap-2 rounded-2xl border border-ink/12 bg-white/75 px-5 py-4 font-display text-base text-ink transition-colors hover:border-purple-mid hover:text-purple-deep"
          >
            {item.name}
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0 opacity-45" aria-hidden="true">
              <path d="M6 3 H13 V10 M13 3 L3 13" stroke="currentColor" strokeWidth={1.8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        ) : (
          <span
            key={item.name}
            className="flex items-center rounded-2xl border border-ink/12 bg-white/75 px-5 py-4 font-display text-base text-ink"
          >
            {item.name}
          </span>
        )
      )}
    </div>
  );
}
