interface OrgGridItem {
  name: string;
  url?: string;
}

interface OrgGridProps {
  items: OrgGridItem[];
  variant?: 'row' | 'tile';
  className?: string;
}

const ROW_BASE = 'rounded-2xl border border-ink/12 bg-white/75 px-5 py-4 font-display text-base text-ink';
const TILE_BASE =
  'aspect-[5/4] rounded-2xl border border-ink/12 bg-white/75 px-4 py-4 text-center font-display text-base text-ink md:text-lg';

export default function OrgGrid({ items, variant = 'row', className = '' }: OrgGridProps) {
  const tile = variant === 'tile';
  const grid = tile ? 'grid-cols-2 sm:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-3';
  const base = tile ? TILE_BASE : ROW_BASE;
  return (
    <div className={`grid gap-3 ${grid} ${className}`}>
      {items.map((item) =>
        item.url ? (
          <a
            key={item.name}
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className={`${base} ${tile ? 'relative flex items-center justify-center' : 'flex items-center justify-between gap-2'} transition-colors hover:border-purple-mid hover:text-purple-deep`}
          >
            {item.name}
            <svg
              viewBox="0 0 16 16"
              className={`h-3.5 w-3.5 shrink-0 opacity-45 ${tile ? 'absolute top-3 right-3' : ''}`}
              aria-hidden="true"
            >
              <path d="M6 3 H13 V10 M13 3 L3 13" stroke="currentColor" strokeWidth={1.8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        ) : (
          <span key={item.name} className={`${base} flex items-center ${tile ? 'justify-center' : ''}`}>
            {item.name}
          </span>
        )
      )}
    </div>
  );
}
