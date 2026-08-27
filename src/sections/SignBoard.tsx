import { useState } from 'react';
import type { Candidate } from '../data/types';
import { SITE } from '../content/site';
import CandidateCard from '../components/CandidateCard';

const CITIES = ['全部', '臺北市', '新北市', '桃園市', '臺中市', '臺南市', '高雄市'];

interface SignBoardProps {
  state: 'loading' | 'error' | 'empty' | 'ready';
  candidates: Candidate[];
  onRetry: () => void;
}

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-3xl border border-ink/10 bg-white/60 p-5 motion-reduce:animate-none">
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 rounded-full bg-ink/10" />
        <div className="flex-1">
          <div className="h-4 w-28 rounded bg-ink/10" />
          <div className="mt-2 h-3 w-40 rounded bg-ink/10" />
        </div>
        <div className="h-6 w-20 rounded-full bg-ink/10" />
      </div>
    </div>
  );
}

export default function SignBoard({ state, candidates, onRetry }: SignBoardProps) {
  const [city, setCity] = useState('全部');
  const filtered = city === '全部' ? candidates : candidates.filter((c) => c.city === city);
  const hasDemo = candidates.some((c) => c.isDemo);

  return (
    <section id={SITE.sections.board.id} className="bg-white/40 py-24">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-center font-display text-3xl tracking-[0.2em] text-ink md:text-4xl">
          {SITE.sections.board.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-[15px] leading-7 text-ink/75">
          每一位六都市長候選人都收到了同一份承諾書。誰簽了、簽了哪幾項、誰還沒有回應，都在這裡公開更新。
        </p>
        {hasDemo ? (
          <p className="mx-auto mt-5 w-fit rounded-full bg-sky-pale/60 px-4 py-1.5 text-center text-sm text-ink/75">
            以下為示意資料，正式名單將於候選人回應後更新
          </p>
        ) : null}
        <div className="mt-8 flex flex-wrap justify-center gap-2" role="tablist" aria-label="依縣市篩選">
          {CITIES.map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={city === c}
              className={`rounded-full px-4 py-1.5 text-sm font-bold transition-colors ${
                city === c ? 'bg-purple-deep text-white' : 'border border-ink/20 text-ink/70 hover:bg-purple-deep/10'
              }`}
              onClick={() => setCity(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="mt-8">
          {state === 'loading' ? (
            <div className="grid gap-4 md:grid-cols-2">
              {Array.from({ length: 6 }, (_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : null}
          {state === 'error' ? (
            <div className="flex flex-col items-center gap-4 rounded-3xl border border-ink/10 bg-white/70 px-6 py-12 text-center">
              <p className="text-ink/75">簽署資料讀取失敗，可能是網路連線問題。</p>
              <button
                type="button"
                className="rounded-full bg-purple-deep px-6 py-2.5 font-bold text-white transition-colors hover:bg-purple-mid"
                onClick={onRetry}
              >
                重新載入
              </button>
            </div>
          ) : null}
          {state === 'empty' ? (
            <p className="rounded-3xl border border-ink/10 bg-white/70 px-6 py-12 text-center text-ink/70">
              名單整理中，候選人回應後會第一時間更新。
            </p>
          ) : null}
          {state === 'ready' ? (
            filtered.length === 0 ? (
              <p className="rounded-3xl border border-ink/10 bg-white/70 px-6 py-12 text-center text-ink/70">
                {city}的候選人名單整理中。
              </p>
            ) : (
              <div className="grid items-start gap-4 md:grid-cols-2">
                {filtered.map((c) => (
                  <CandidateCard key={`${c.city}-${c.name}`} candidate={c} />
                ))}
              </div>
            )
          ) : null}
        </div>
      </div>
    </section>
  );
}
