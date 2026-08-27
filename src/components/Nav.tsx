import { useState } from 'react';
import { SITE } from '../content/site';

const LINKS = [
  SITE.sections.whySix,
  SITE.sections.demands,
  SITE.sections.timeline,
  SITE.sections.board,
  SITE.sections.endorse,
  SITE.sections.about,
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-3 z-50 flex justify-center px-3">
      <nav className="flex w-full max-w-4xl items-center justify-between gap-2 rounded-full border border-ink/15 bg-white/85 py-2 pl-5 pr-2 shadow-sm backdrop-blur-md">
        <a href="#top" className="font-display text-sm font-bold tracking-wide whitespace-nowrap">
          永續韌性城市
        </a>
        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className="rounded-full px-3 py-1.5 text-sm text-ink/75 transition-colors hover:bg-purple-deep/10 hover:text-ink"
              >
                {link.nav}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <a
            href={`#${SITE.sections.join.id}`}
            className="rounded-full bg-purple-deep px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-purple-mid"
          >
            加入連署
          </a>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 lg:hidden"
            aria-expanded={open}
            aria-label={open ? '關閉選單' : '開啟選單'}
            onClick={() => setOpen((prev) => !prev)}
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
              {open ? (
                <path d="M4 4 L16 16 M16 4 L4 16" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
              ) : (
                <path d="M3 5 H17 M3 10 H17 M3 15 H17" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </nav>
      {open ? (
        <div className="absolute inset-x-3 top-16 rounded-3xl border border-ink/10 bg-white/95 p-4 shadow-lg backdrop-blur-md lg:hidden">
          <ul className="flex flex-col">
            {LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className="block rounded-xl px-4 py-3 text-base"
                  onClick={() => setOpen(false)}
                >
                  {link.nav}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
