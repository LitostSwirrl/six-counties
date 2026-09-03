import { useState } from 'react';
import type { Candidate } from '../data/types';
import { PILLARS } from '../content/demands';
import StatusBadge from './StatusBadge';

interface CandidateCardProps {
  candidate: Candidate;
}

function Silhouette() {
  return (
    <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden="true">
      <rect width="48" height="48" fill="var(--color-sky-pale)" opacity="0.5" />
      <circle cx="24" cy="18" r="9" fill="var(--color-teal)" opacity="0.55" />
      <path d="M8 48 Q8 32 24 32 Q40 32 40 48 Z" fill="var(--color-teal)" opacity="0.55" />
    </svg>
  );
}

function CheckGlyph({ checked }: { checked: boolean }) {
  if (checked) {
    return (
      <svg viewBox="0 0 20 20" className="h-5 w-5 shrink-0" aria-hidden="true">
        <circle cx="10" cy="10" r="9" fill="var(--color-green)" />
        <path d="M6 10.5 L9 13.5 L14.5 7" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5 shrink-0" aria-hidden="true">
      <circle cx="10" cy="10" r="9" fill="none" stroke="var(--color-ink)" strokeOpacity="0.25" strokeWidth="1.5" />
    </svg>
  );
}

export default function CandidateCard({ candidate }: CandidateCardProps) {
  const [open, setOpen] = useState(false);
  let flatIndex = 0;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-ink/12 bg-white/80">
      {candidate.isDemo ? (
        <span className="absolute top-3 -left-8 -rotate-45 bg-sky-pale px-8 py-0.5 text-[10px] font-bold text-ink/70">
          示意資料
        </span>
      ) : null}
      <button
        type="button"
        className="flex w-full items-center gap-4 p-5 text-left"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full border border-ink/10">
          {candidate.photoUrl ? (
            <img src={candidate.photoUrl} alt={`${candidate.name}照片`} className="h-full w-full object-cover" />
          ) : (
            <Silhouette />
          )}
        </div>
        <div className="flex-1">
          <p className="font-display text-xl text-ink">{candidate.name}</p>
          <p className="mt-0.5 text-sm text-ink/60">
            {candidate.city}｜{candidate.party}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <StatusBadge candidate={candidate} />
          <span className="flex items-center gap-1 text-xs text-ink/50">
            {open ? '收合' : '展開看候選人承諾'}
            <svg viewBox="0 0 20 20" className={`h-4 w-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} aria-hidden="true">
              <path d="M5 8 L10 13 L15 8" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </button>
      <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <div className="border-t border-ink/10 px-5 py-4">
            {candidate.signedDate ? (
              <p className="mb-3 text-xs text-ink/55">簽署日期：{candidate.signedDate}</p>
            ) : null}
            <div className="flex flex-col gap-4">
              {PILLARS.map((pillar) => (
                <div key={pillar.id}>
                  <p className="font-display text-sm text-purple-mid">
                    {pillar.index}、{pillar.fullName}
                  </p>
                  <ul className="mt-2 flex flex-col gap-1.5">
                    {pillar.items.map((item) => {
                      const checked = candidate.checks[flatIndex] ?? false;
                      flatIndex += 1;
                      return (
                        <li key={item.id} className="flex items-start gap-2 text-sm leading-6 text-ink/75">
                          <CheckGlyph checked={checked} />
                          {item.title}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
