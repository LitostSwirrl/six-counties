import { useState } from 'react';
import { PILLARS } from '../content/demands';
import { SITE } from '../content/site';
import PillarIcon from '../components/PillarIcon';

export default function Demands() {
  const [openId, setOpenId] = useState<string | null>(PILLARS[0]?.id ?? null);

  return (
    <section id={SITE.sections.demands.id} className="mx-auto max-w-4xl px-6 py-24">
      <h2 className="text-center font-display text-3xl tracking-[0.2em] text-ink md:text-4xl">
        {SITE.sections.demands.title}
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-7 text-ink/75">{SITE.demandsLead}</p>
      <p className="mx-auto mt-3 max-w-2xl text-center text-base leading-7 text-ink/75">
        九個公民團體針對五大面向提出十八項政策訴求，邀請每一位六都市長候選人公開承諾。點開每個面向，看完整的政策內容。
      </p>
      <div className="mt-12 flex flex-col gap-4">
        {PILLARS.map((pillar) => {
          const open = openId === pillar.id;
          return (
            <div
              key={pillar.id}
              className={`overflow-hidden rounded-3xl border bg-white/70 transition-colors ${open ? 'border-purple-mid/60 shadow-md' : 'border-ink/15'}`}
            >
              <button
                type="button"
                className="flex w-full items-center gap-4 px-5 py-5 text-left md:px-7"
                aria-expanded={open}
                onClick={() => setOpenId(open ? null : pillar.id)}
              >
                <PillarIcon pillar={pillar.id} className="h-14 w-14 shrink-0" />
                <span className="flex-1 font-display text-xl text-ink md:text-2xl">
                  {pillar.index}、{pillar.fullName}
                </span>
                <span className="flex items-center gap-2">
                  <span className="hidden text-sm text-ink/50 md:inline">共 {pillar.items.length} 項</span>
                  <svg
                    viewBox="0 0 20 20"
                    className={`h-5 w-5 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  >
                    <path d="M5 8 L10 13 L15 8" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>
              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
              >
                <div className="overflow-hidden">
                  <div className="border-t border-ink/10 px-5 pt-5 pb-6 md:px-7">
                    {pillar.intro.split('\n').map((para) => (
                      <p key={para.slice(0, 12)} className="mt-2 text-base leading-7 text-ink/75 first:mt-0">
                        {para}
                      </p>
                    ))}
                    <ol className="mt-5 flex flex-col gap-4">
                      {pillar.items.map((item, i) => (
                        <li key={item.id} className="rounded-2xl bg-cream/70 p-4 md:p-5">
                          <p className="flex items-start gap-3">
                            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-deep font-display text-sm text-white">
                              {i + 1}
                            </span>
                            <span className="font-display text-base text-ink md:text-lg">{item.title}</span>
                          </p>
                          <p className="mt-2 pl-9 text-sm leading-6 text-ink/70">{item.detail}</p>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
