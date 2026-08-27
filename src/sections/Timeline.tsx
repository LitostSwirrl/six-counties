import { SITE } from '../content/site';
import { TIMELINE } from '../content/timeline';
import { currentPhaseIndex } from '../utils/phase';

export default function Timeline() {
  const current = currentPhaseIndex(TIMELINE, new Date());

  return (
    <section id={SITE.sections.timeline.id} className="mx-auto max-w-5xl px-6 py-24">
      <h2 className="text-center font-display text-3xl tracking-[0.2em] text-ink md:text-4xl">
        {SITE.sections.timeline.title}
      </h2>
      <ol className="mt-14 flex flex-col gap-0 md:flex-row md:gap-0">
        {TIMELINE.map((node, i) => {
          const isPast = i < current;
          const isCurrent = i === current;
          return (
            <li key={node.deadline} className="relative flex flex-1 gap-4 md:flex-col md:gap-0">
              <div className="flex flex-col items-center md:w-full md:flex-row">
                <div
                  className={`hidden h-0.5 flex-1 md:block ${i === 0 ? 'bg-transparent' : isPast || isCurrent ? 'bg-green' : 'bg-ink/20'}`}
                />
                <div className="relative flex items-center justify-center">
                  {isCurrent ? (
                    <span className="absolute h-8 w-8 animate-ping rounded-full bg-purple-mid/30 motion-reduce:hidden" />
                  ) : null}
                  <span
                    className={`relative z-10 h-5 w-5 rounded-full border-2 ${
                      isCurrent
                        ? 'scale-125 border-purple-deep bg-purple-mid'
                        : isPast
                          ? 'border-green bg-green'
                          : 'border-ink/30 bg-cream'
                    }`}
                  />
                </div>
                <div
                  className={`hidden h-0.5 flex-1 md:block ${i === TIMELINE.length - 1 ? 'bg-transparent' : i < current ? 'bg-green' : 'bg-ink/20'}`}
                />
                <div
                  className={`absolute top-6 bottom-0 left-[9px] w-0.5 md:hidden ${i === TIMELINE.length - 1 ? 'bg-transparent' : i < current ? 'bg-green' : 'bg-ink/20'}`}
                />
              </div>
              <div className="pb-10 md:px-2 md:pt-4 md:pb-0 md:text-center">
                <p className={`font-display text-lg ${isCurrent ? 'text-purple-deep' : 'text-ink'}`}>{node.date}</p>
                <p className="mt-1 text-sm leading-6 text-ink/75">{node.label}</p>
                {isCurrent ? <p className="tag-box mt-2 text-xs text-purple-deep">進行中</p> : null}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
