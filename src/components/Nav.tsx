import { useEffect, useState } from 'react';
import { JOIN_SECTION_HREF, SITE } from '../content/site';

const LINKS = [
  SITE.sections.whySix,
  SITE.sections.demands,
  SITE.sections.timeline,
  SITE.sections.board,
  SITE.sections.about,
  SITE.sections.endorse,
];

function useActiveSection(): string {
  const [active, setActive] = useState('');

  useEffect(() => {
    const ids = [...LINKS.map((l) => l.id), SITE.sections.join.id];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio);
          else visible.delete(entry.target.id);
        });
        let best = '';
        let bestRatio = 0;
        visible.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            best = id;
            bestRatio = ratio;
          }
        });
        if (best) setActive(best);
        else if (window.scrollY < 200) setActive('');
      },
      { threshold: [0.15, 0.4, 0.7], rootMargin: '-64px 0px 0px 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return active;
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-white/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 md:px-6">
        <a href="#top" className="flex items-baseline gap-1.5 whitespace-nowrap font-display leading-none">
          <span className="text-xl font-bold text-ink md:text-2xl">永續韌性城市</span>
          <span className="text-xl font-bold text-purple-deep md:text-2xl">政策承諾</span>
        </a>
        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((link) => {
            const isActive = active === link.id;
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative block px-3 py-2 text-[0.95rem] transition-colors ${
                    isActive ? 'font-bold text-purple-deep' : 'text-ink/70 hover:text-ink'
                  }`}
                >
                  {link.nav}
                  <span
                    className={`absolute inset-x-3 -bottom-[13px] h-[3px] rounded-t bg-purple-deep transition-opacity ${isActive ? 'opacity-100' : 'opacity-0'}`}
                  />
                </a>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center gap-2">
          <a
            href={JOIN_SECTION_HREF}
            className="rounded-full bg-purple-deep px-5 py-2.5 text-[0.95rem] font-bold text-white transition-colors hover:bg-purple-mid"
          >
            加入連署
          </a>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-ink/15 lg:hidden"
            aria-expanded={open}
            aria-label={open ? '關閉選單' : '開啟選單'}
            onClick={() => setOpen((prev) => !prev)}
          >
            <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden="true">
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
        <div className="border-t border-ink/10 bg-white/95 backdrop-blur-md lg:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-4 py-2">
            {LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={`block px-2 py-3 text-lg ${active === link.id ? 'font-bold text-purple-deep' : ''}`}
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
