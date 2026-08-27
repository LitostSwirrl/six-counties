import { useState } from 'react';
import type { FormEvent } from 'react';
import { SITE } from '../content/site';
import { APPS_SCRIPT_URL } from '../data/config';
import { submitPetition, validatePetition, type PetitionPayload } from '../data/petition';

const TAIWAN_CITIES = [
  '臺北市', '新北市', '桃園市', '臺中市', '臺南市', '高雄市',
  '基隆市', '新竹市', '新竹縣', '苗栗縣', '彰化縣', '南投縣',
  '雲林縣', '嘉義市', '嘉義縣', '屏東縣', '宜蘭縣', '花蓮縣',
  '臺東縣', '澎湖縣', '金門縣', '連江縣',
];

interface PetitionFormProps {
  onSigned: () => void;
}

type SubmitState = 'idle' | 'submitting' | 'done';

export default function PetitionForm({ onSigned }: PetitionFormProps) {
  const [kind, setKind] = useState<'individual' | 'group'>('individual');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');
  const [consentPublic, setConsentPublic] = useState(false);
  const [website, setWebsite] = useState('');
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const payload: PetitionPayload = { kind, name, email, city, message, consentPublic, website };
    const invalid = validatePetition(payload);
    if (invalid) {
      setError(invalid);
      return;
    }
    setError(null);
    setSubmitState('submitting');
    submitPetition(payload)
      .then(() => {
        setSubmitState('done');
        onSigned();
      })
      .catch(() => {
        setSubmitState('idle');
        setError('送出失敗，請檢查網路後再試一次。');
      });
  };

  return (
    <section id={SITE.sections.join.id} className="bg-purple-deep/5 py-24">
      <div className="mx-auto max-w-xl px-6">
        <h2 className="text-center font-display text-3xl tracking-[0.2em] text-ink md:text-4xl">
          {SITE.sections.join.title}
        </h2>
        <p className="mt-4 text-center text-[15px] leading-7 text-ink/75">
          連署名單會在十月的記者會上，連同候選人簽署結果一起公開。留下你的名字，一起要求候選人公開承諾。
        </p>
        {APPS_SCRIPT_URL === '' ? (
          <p className="mx-auto mt-5 w-fit rounded-full bg-sky-pale/60 px-4 py-1.5 text-sm text-ink/75">
            示意模式：目前送出的資料不會被保存
          </p>
        ) : null}
        {submitState === 'done' ? (
          <div className="mt-10 rounded-3xl border border-green bg-white/80 px-8 py-12 text-center">
            <p className="font-display text-2xl text-green">感謝你的連署！</p>
            <p className="mt-3 text-[15px] leading-7 text-ink/75">
              我們會把你的聲音帶到候選人面前。把這個網站分享給更多人，連署的力量會更大。
            </p>
          </div>
        ) : (
          <form className="mt-10 flex flex-col gap-5" onSubmit={onSubmit}>
            <fieldset className="flex gap-3">
              <legend className="mb-2 text-sm font-bold text-ink/80">我要以什麼身分連署</legend>
              {(
                [
                  ['individual', '個人'],
                  ['group', '團體'],
                ] as const
              ).map(([value, label]) => (
                <label
                  key={value}
                  className={`flex-1 cursor-pointer rounded-full border px-4 py-2.5 text-center text-sm font-bold transition-colors ${
                    kind === value ? 'border-purple-deep bg-purple-deep text-white' : 'border-ink/20 text-ink/70'
                  }`}
                >
                  <input
                    type="radio"
                    name="kind"
                    value={value}
                    checked={kind === value}
                    onChange={() => setKind(value)}
                    className="sr-only"
                  />
                  {label}
                </label>
              ))}
            </fieldset>
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-bold text-ink/80">{kind === 'group' ? '團體名稱' : '姓名'}</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-2xl border border-ink/20 bg-white px-4 py-3 text-[15px] outline-none focus:border-purple-mid"
                autoComplete={kind === 'group' ? 'organization' : 'name'}
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-bold text-ink/80">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-2xl border border-ink/20 bg-white px-4 py-3 text-[15px] outline-none focus:border-purple-mid"
                autoComplete="email"
              />
              <span className="text-xs text-ink/50">只用於必要時與你聯繫，不會出現在網站上。</span>
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-bold text-ink/80">{kind === 'group' ? '團體所在縣市' : '居住縣市'}</span>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="rounded-2xl border border-ink/20 bg-white px-4 py-3 text-[15px] outline-none focus:border-purple-mid"
              >
                <option value="">請選擇</option>
                {TAIWAN_CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-bold text-ink/80">想對候選人說的話（選填）</span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="rounded-2xl border border-ink/20 bg-white px-4 py-3 text-[15px] outline-none focus:border-purple-mid"
              />
            </label>
            <label className="flex items-start gap-2.5 text-sm text-ink/75">
              <input
                type="checkbox"
                checked={consentPublic}
                onChange={(e) => setConsentPublic(e.target.checked)}
                className="mt-1 h-4 w-4 accent-purple-deep"
              />
              我同意在網站上公開我的留言（姓名會部分遮蔽）
            </label>
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
            {error ? <p className="text-sm font-bold text-[#C0392B]">{error}</p> : null}
            <button
              type="submit"
              disabled={submitState === 'submitting'}
              className="rounded-full bg-purple-deep px-7 py-3.5 font-bold text-white transition-colors hover:bg-purple-mid disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitState === 'submitting' ? '送出中⋯' : '送出連署'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
