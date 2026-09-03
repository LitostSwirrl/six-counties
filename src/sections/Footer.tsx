import CityBackdrop from '../components/CityBackdrop';
import { SITE } from '../content/site';

export default function Footer() {
  return (
    <footer className="bg-purple-deep text-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 pt-16 pb-8">
        <p className="font-display text-2xl tracking-wide">2026 六都市長候選人永續韌性城市政策承諾</p>
        <div className="flex flex-col gap-2 text-sm text-white/80">
          <p>本網站由綠色公民行動聯盟建置</p>
          <p>
            如有相關疑問請聯絡我們：
            <a href={`mailto:${SITE.contactEmail}`} className="underline underline-offset-4 hover:text-white">
              {SITE.contactEmail}
            </a>
          </p>
          <p>本網站內容以創用 CC 姓名標示－非商業性 4.0 授權釋出。</p>
        </div>
      </div>
      <div className="footer-skyline pointer-events-none opacity-70">
        <CityBackdrop variant="night" className="h-auto w-full" />
      </div>
    </footer>
  );
}
