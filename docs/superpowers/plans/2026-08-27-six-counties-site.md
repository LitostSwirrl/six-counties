# 六都倡議一頁式網站 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 建立「六都市長候選人永續韌性城市政策承諾」一頁式倡議網站：滾動敘事、五大訴求展開、候選人簽署看板（直讀 Google Sheet）、站內連署表單（Apps Script 寫回 Sheet）。

**Architecture:** Vite + React 18 + TypeScript strict 靜態站，Tailwind CSS v4 承載 design tokens，GSAP ScrollTrigger 做 hero 與數據段滾動敘事。資料層統一經 `useSheetData`：優先抓 gviz JSON，失敗時 fallback 到內建示意 JSON 並標示。連署經 Apps Script Web App 讀寫。部署 GitHub Pages。

**Tech Stack:** React 18, TypeScript (strict, no any), Vite, Tailwind CSS v4 (@tailwindcss/vite), GSAP + ScrollTrigger, vitest, GitHub Pages (gh CLI)

**Spec:** `docs/superpowers/specs/2026-08-27-six-counties-site-design.md`

## Global Constraints

- TypeScript strict、禁用 `any`；`interface` over `type`（union 例外）；early returns、扁平程式碼
- 程式碼內不寫註解（僅允許 pragma 與真正非顯而易見的一行說明）；設計理由寫進 progress.md
- 不用 emoji（含 UI 文字、SVG title、commit）；勾選狀態用 SVG 圖示
- 所有資料區塊三態：載入中／讀取失敗／暫無資料；表單送出中 disabled、成功、失敗可重試；永不吞錯
- 中文文案一律台灣用語（資訊／資料／使用者／透過），全形標點；文案集中在 `src/content/`，最後統一過 humanizer-zh-tw
- `prefers-reduced-motion: reduce` 時：GSAP 動畫不註冊、計數直接顯示終值、跑馬燈轉手動橫捲
- Email 永不出現在前端；個人連署只經 Apps Script doGet 的過濾後 JSON
- Design tokens（自主視覺取樣）：米色底 `#EEEBE2`、墨黑 `#111111`、紫漸層 `#4E3C64 → #7D5184 → #925D91`、綠 `#66B564`、淡綠 `#D1F6CA`、藍綠 `#639BA8`、天藍 `#6CB5EC`、淡藍 `#B0C5D6`
- 字型：標題 jf open 粉圓（self-host woff2）、內文 Noto Sans TC（Google Fonts）
- RWD 驗收寬度：375 / 768 / 1280

---

### Task 1: Scaffold 與 design tokens

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/styles/global.css`, `.gitignore`, `public/fonts/`（open-huninn woff2）

**Interfaces:**
- Produces: Tailwind v4 `@theme` tokens（`--color-cream`, `--color-ink`, `--color-purple-deep/-mid/-light`, `--color-green`, `--color-green-pale`, `--color-teal`, `--color-sky`, `--color-sky-pale`; `--font-display`, `--font-body`）；utility class `.gradient-title`（紫漸層文字）

- [ ] **Step 1: 建立 Vite 專案與依賴**

```bash
npm create vite@latest . -- --template react-ts
npm i gsap
npm i -D @tailwindcss/vite tailwindcss vitest @types/node
```

`vite.config.ts`：加入 `tailwindcss()` plugin 與 `base: '/six-counties/'`（GH Pages 路徑，掛自訂網域後改 `'/'`）。`tsconfig`: `"strict": true`。

- [ ] **Step 2: 字型**

下載 jf-openhuninn-2.1 woff2（justfont/open-huninn-font GitHub release，OFL 授權）放 `public/fonts/`；`index.html` 加 Google Fonts Noto Sans TC 400/500/700 與 `lang="zh-Hant-TW"`、title、meta description、OG tags。

- [ ] **Step 3: global.css 寫入 tokens**

```css
@import "tailwindcss";
@theme {
  --color-cream: #EEEBE2;
  --color-ink: #111111;
  --color-purple-deep: #4E3C64;
  --color-purple-mid: #7D5184;
  --color-purple-light: #925D91;
  --color-green: #66B564;
  --color-green-pale: #D1F6CA;
  --color-teal: #639BA8;
  --color-sky: #6CB5EC;
  --color-sky-pale: #B0C5D6;
  --font-display: "jf-openhuninn", "Noto Sans TC", sans-serif;
  --font-body: "Noto Sans TC", sans-serif;
}
@font-face {
  font-family: "jf-openhuninn";
  src: url("/fonts/jf-openhuninn-2.1.woff2") format("woff2");
  font-display: swap;
}
.gradient-title {
  background: linear-gradient(180deg, #4E3C64 0%, #7D5184 55%, #925D91 100%);
  background-clip: text;
  color: transparent;
}
body { background: var(--color-cream); color: var(--color-ink); font-family: var(--font-body); }
```

- [ ] **Step 4: 驗證** `npm run build` 通過；`npm run dev` 首頁顯示 tokens 測試字樣後移除測試字樣
- [ ] **Step 5: Commit** `feat: scaffold Vite React TS with design tokens`

### Task 2: 內容模組（全站文案）

**Files:**
- Create: `src/content/site.ts`（slogan、hero 副標、各段標題與導言、表單文案、footer）
- Create: `src/content/demands.ts`（五大面向：id、短名、全名、引言全文、items[18]{id, title, detail}──全文照抄附件一，存於 scratchpad `doc2_tab_t.2nshx3k882l5.md`）
- Create: `src/content/orgs.ts`（九發起團體 name + url）
- Create: `src/content/stats.ts`（三大數據＋高溫資料）
- Create: `src/content/timeline.ts`（五節點）

**Interfaces:**
- Produces:

```ts
export interface DemandItem { id: string; title: string; detail: string }
export interface DemandPillar { id: 'energy'|'resilience'|'heat'|'flood'|'transport'; index: string; shortName: string; fullName: string; intro: string; items: DemandItem[] }
export const PILLARS: DemandPillar[]
export interface Org { name: string; url: string }
export const ORGS: Org[]
export interface KeyStat { value: number; suffix: string; label: string; description: string; motif: 'population'|'power'|'carbon' }
export const KEY_STATS: KeyStat[]
export interface TimelineNode { date: string; deadline: string; label: string }
export const TIMELINE: TimelineNode[]
```

- [ ] **Step 1:** 依 scratchpad 素材逐字填入（訴求全文不改寫；引言可原文照抄）。九團體 URL 用官網（查證存在，查不到者留空字串由 UI 隱藏連結）。stats：人口 1650 萬／69.9%、用電 65%、碳排 70%（來源：構想 doc 資料蒐集分頁）；高溫：六都在暖化 1.5/2/4 度情境下的年高溫 36 度天數增幅（從試算表「工作表1」讀六都列填入）。
- [ ] **Step 2: 驗證** `tsc --noEmit` 通過；PILLARS 合計 items 數 === 18（寫一個 vitest 斷言）
- [ ] **Step 3: Commit** `feat: site content modules`

### Task 3: 資料層（gviz 讀取＋demo fallback）

**Files:**
- Create: `src/data/types.ts`, `src/data/gviz.ts`, `src/data/sheets.ts`, `src/data/demo.ts`, `src/hooks/useSheetData.ts`, `src/data/config.ts`
- Test: `src/data/gviz.test.ts`

**Interfaces:**
- Produces:

```ts
export type SignStatus = 'signed' | 'partial' | 'met' | 'none';
export interface Candidate {
  city: string; name: string; party: string; status: SignStatus;
  checks: boolean[]; signedDate: string; photoUrl: string; isDemo: boolean;
}
export interface EndorsingOrg { name: string; url: string; logoUrl: string }
export function parseGviz(text: string): string[][]
export function fetchCandidates(): Promise<Candidate[]>
export function fetchEndorsingOrgs(): Promise<EndorsingOrg[]>
export function useSheetData<T>(fetcher: () => Promise<T[]>): { state: 'loading'|'error'|'empty'|'ready'; data: T[]; retry: () => void }
```

- `config.ts`：`SHEET_ID`（空字串＝demo 模式）、`APPS_SCRIPT_URL`（空字串＝demo 模式）、`GVIZ_URL(sheetName)` 組網址

- [ ] **Step 1: 寫 gviz parser 失敗測試**

gviz 回傳格式是 `/*O_o*/\ngoogle.visualization.Query.setResponse({...});`，要剝殼取 `table.rows[].c[].v`。

```ts
import { describe, it, expect } from 'vitest';
import { parseGviz } from './gviz';

const SAMPLE = `/*O_o*/\ngoogle.visualization.Query.setResponse({"version":"0.6","table":{"cols":[{"label":"縣市"},{"label":"姓名"}],"rows":[{"c":[{"v":"臺北市"},{"v":"測試甲"}]},{"c":[{"v":"高雄市"},null]}]}});`;

describe('parseGviz', () => {
  it('回傳列陣列，null 儲存格轉空字串', () => {
    expect(parseGviz(SAMPLE)).toEqual([['臺北市', '測試甲'], ['高雄市', '']]);
  });
  it('非 gviz 內容丟出錯誤', () => {
    expect(() => parseGviz('<html>login</html>')).toThrow();
  });
});
```

- [ ] **Step 2:** `npx vitest run` 確認 FAIL
- [ ] **Step 3: 實作 parseGviz**

```ts
interface GvizCell { v: string | number | boolean | null }
interface GvizRow { c: (GvizCell | null)[] }

export function parseGviz(text: string): string[][] {
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start === -1 || end === -1) throw new Error('gviz 格式錯誤');
  const payload = JSON.parse(text.slice(start, end + 1)) as { table?: { rows?: GvizRow[] } };
  if (!payload.table?.rows) throw new Error('gviz 缺少資料表');
  return payload.table.rows.map((row) =>
    (row.c ?? []).map((cell) => (cell?.v == null ? '' : String(cell.v)))
  );
}
```

- [ ] **Step 4:** vitest PASS
- [ ] **Step 5: sheets.ts＋demo.ts**

`fetchCandidates`：`SHEET_ID` 為空→回傳 `DEMO_CANDIDATES`（每都 2–3 位、假名格式「示意候選人Ａ」、`isDemo: true`、四種狀態都涵蓋、checks 混合）。非空→fetch gviz「候選人簽署」表→欄位映射（0 縣市、1 姓名、2 政黨、3 狀態、4–21 勾選「1」為 true、22 簽署日期、23 照片）。狀態字串映射：已簽署→signed、部分簽署→partial、已拜會→met、其他→none。`useSheetData`：useEffect fetch、state machine、retry。

- [ ] **Step 6:** `npm run build`＋vitest 全過
- [ ] **Step 7: Commit** `feat: sheet data layer with demo fallback`

### Task 4: 連署後端（Apps Script）與前端 client

**Files:**
- Create: `apps-script/Code.gs`, `docs/apps-script-deploy.md`
- Create: `src/data/petition.ts`
- Test: `src/data/petition.test.ts`

**Interfaces:**
- Produces:

```ts
export interface PetitionStats { individualCount: number; groupCount: number; publicMessages: { name: string; message: string }[] }
export interface PetitionPayload { kind: 'individual'|'group'; name: string; email: string; city: string; message: string; consentPublic: boolean; website: string }
export function fetchPetitionStats(): Promise<PetitionStats>
export function submitPetition(payload: PetitionPayload): Promise<void>
export function validatePetition(p: PetitionPayload): string | null
export function maskName(name: string): string
```

- [ ] **Step 1: 驗證邏輯測試**（validatePetition：name 必填、email 格式、city 必填、website honeypot 非空→擋下；maskName：兩字「王○」、三字「王○明」、單字照留、團體名（kind=group 呼叫端不遮）
- [ ] **Step 2:** FAIL 確認
- [ ] **Step 3: 實作** `validatePetition` 回傳錯誤訊息字串或 null；`maskName(name)` 取字元陣列（Array.from，處理 surrogate）、長度>=2 時第 2 字換「○」。`submitPetition`：`APPS_SCRIPT_URL` 空→模擬延遲後成功（demo）；非空→`fetch(url, { method: 'POST', body: JSON.stringify(payload), headers: { 'Content-Type': 'text/plain' } })`（text/plain 避開 CORS preflight，Apps Script 標準做法），回應 `{ ok: true }` 以外皆 throw。`fetchPetitionStats` 同理 demo fallback。
- [ ] **Step 4:** vitest PASS
- [ ] **Step 5: Code.gs**

```javascript
const SHEET_ID = 'PUT_SHEET_ID_HERE';

function doPost(e) {
  const p = JSON.parse(e.postData.contents);
  if (p.website) return json({ ok: false });
  if (!p.name || !p.city || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(p.email)) return json({ ok: false });
  const sheetName = p.kind === 'group' ? '團體連署' : '個人連署';
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(sheetName);
  sheet.appendRow([new Date(), p.name, p.email, p.city, p.message || '', p.consentPublic ? '是' : '否']);
  return json({ ok: true });
}

function doGet() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const individual = ss.getSheetByName('個人連署').getDataRange().getValues().slice(1);
  const group = ss.getSheetByName('團體連署').getDataRange().getValues().slice(1);
  const publicMessages = individual
    .filter(function (r) { return r[5] === '是' && r[4]; })
    .slice(-30)
    .map(function (r) { return { name: mask(String(r[1])), message: String(r[4]) }; });
  return json({ ok: true, individualCount: individual.length, groupCount: group.length, publicMessages: publicMessages });
}

function mask(name) {
  const chars = name.split('');
  if (chars.length < 2) return name;
  chars[1] = '○';
  return chars.join('');
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
```

`docs/apps-script-deploy.md`：以 GCAA 帳號 script.google.com 建專案→貼 Code.gs→填 SHEET_ID→部署為網頁應用程式（執行身分：我；存取權：任何人）→取得 URL 填入 `src/data/config.ts` 的 `APPS_SCRIPT_URL`→重新 build 部署。含試算表四工作表的欄位定義表。

- [ ] **Step 6: Commit** `feat: petition client and Apps Script backend`

### Task 5: 天際線 SVG、Hero、導覽列

**Files:**
- Create: `src/components/Skyline.tsx`（手繪 SVG：建築群線稿，分 3 層 group 供視差；建築用 tokens 綠／藍綠／天藍／淡藍填色＋細黑描邊，混入樹、雲）
- Create: `src/components/BallotBox.tsx`（投票箱線稿 SVG，選票插入槽的形狀）
- Create: `src/sections/Hero.tsx`, `src/components/Nav.tsx`, `src/components/CountUp.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `useSheetData`, `fetchCandidates`, `fetchPetitionStats`, `site.ts` 文案
- Produces: `<Skyline layer?: 'full'|'strip'>`, `<CountUp to={n} suffix?>`（IntersectionObserver 進場才數，reduced-motion 直接顯示終值）；`<Nav>`（吸頂膠囊、錨點清單、常駐「加入連署」按鈕、手機漢堡）

- [ ] **Step 1: Skyline SVG**：viewBox `0 0 1440 240`，12–16 棟不同高度建築（矩形＋窗格線）、2–3 棵圓冠樹、雲朵，三層 `<g data-layer="back|mid|front">`。載入動畫：`stroke-dasharray` 描邊逐段浮現（CSS animation，reduced-motion 停用）。
- [ ] **Step 2: Hero 組裝**：置中直排──投票箱圖示、黑色小標「六都市長候選人」、`.gradient-title` font-display 大標（clamp 2.5rem–5rem）「永續韌性城市政策承諾」、slogan「面對城市的下一個十年，六都市長準備好了嗎？」、副標段落、兩顆按鈕（實心紫「加入連署」／描邊「看簽署結果」）、雙計數（候選人已簽署 n 位｜公民連署 n 人，loading 時顯示「—」）。底部 Skyline 全幅，GSAP 對三層做 scroll 視差（back 0.2x、mid 0.5x、front 1x）。
- [ ] **Step 3: Nav**：`position: fixed` 上緣置中膠囊（`bg-white/85 backdrop-blur border`），錨點：六都關鍵、五大訴求、行動時程、簽署看板、連署響應、關於我們；右端紫底白字「加入連署」。手機：logo＋CTA＋漢堡展開全屏選單。
- [ ] **Step 4: 驗證**：dev server 以 chrome-devtools MCP 截圖 375/1280 檢查；`npm run build`
- [ ] **Step 5: Commit** `feat: hero with skyline parallax and nav`

### Task 6: 六都為什麼關鍵（滾動敘事）

**Files:**
- Create: `src/sections/DataStory.tsx`, `src/components/HeatChart.tsx`, `src/hooks/usePrefersReducedMotion.ts`

**Interfaces:**
- Consumes: `KEY_STATS`, `stats.ts` 高溫資料, `CountUp`, `Skyline` 母題元素
- Produces: pinned 滾動段（GSAP ScrollTrigger `pin: true`, `scrub`）；reduced-motion 或行動裝置寬 <768 時退化為三張依序進場的靜態卡片（不 pin）

- [ ] **Step 1:** 桌機版：容器 pin 住 300vh，三個 KeyStat 場景依 scroll 進度切換──大數字（CountUp，font-display 8rem）＋label＋description；背景天際線隨 motif 變化：population→建築由灰轉綠亮起、power→窗格閃爍（opacity 循環）、carbon→灰色煙霧 path 升起再淡出轉綠。實作用同一 Skyline 變體加 GSAP timeline 控制 class。
- [ ] **Step 2:** HeatChart：手刻 SVG 橫向 bar 群組圖──六都 × 暖化情境（1.5／2／4 度）年高溫 36 度天數增幅，tokens 用 sky→teal→purple 漸強表示情境嚴重度；含圖例與資料來源註記。空資料時整塊隱藏。
- [ ] **Step 3:** 驗證：截圖桌機三場景、手機退化版；reduced-motion 模擬（CDP `Emulation.setEmulatedMedia`）確認無 pin。
- [ ] **Step 4: Commit** `feat: data story scroll narrative with heat chart`

### Task 7: 五大訴求

**Files:**
- Create: `src/sections/Demands.tsx`, `src/components/PillarIcon.tsx`

**Interfaces:**
- Consumes: `PILLARS`
- Produces: 手風琴卡片（一次僅一張展開；`aria-expanded`、`button` 語意）

- [ ] **Step 1:** PillarIcon：五個 48px 線稿 SVG（能源＝太陽能板＋太陽、防災＝房子＋電池閃電、高溫＝溫度計＋樹蔭、水患＝波浪＋堤岸植栽、交通＝行人＋自行車），描邊風格同天際線。
- [ ] **Step 2:** 卡片：米白底、細黑邊、圓角 16、編號（一～五）＋icon＋fullName＋一句摘要；點擊展開：引言段落＋items 清單（title font-medium、detail 內文）。展開動畫 grid-rows transition。進場：卡片依序 fade-up（GSAP batch，reduced-motion 停用）。
- [ ] **Step 3:** 驗證：鍵盤 Tab＋Enter 可操作、截圖、build。
- [ ] **Step 4: Commit** `feat: five demands accordion`

### Task 8: 行動時程

**Files:**
- Create: `src/sections/Timeline.tsx`, `src/utils/phase.ts`
- Test: `src/utils/phase.test.ts`

**Interfaces:**
- Consumes: `TIMELINE`
- Produces: `currentPhaseIndex(nodes: TimelineNode[], today: Date): number`（回傳最後一個 deadline <= today 的索引＋進行中定義）

- [ ] **Step 1:** phase 測試：8/20→index 0（記者會已過、9/11 前＝階段1進行中的表達由 UI 處理，函式回傳「目前進行中節點」索引：deadline 尚未過的第一個）；10/15→最後節點。邊界：等於 deadline 當日算進行中。
- [ ] **Step 2:** FAIL→實作→PASS。
- [ ] **Step 3:** UI：桌機橫向五節點（圓點＋連線，過去＝實心綠、進行中＝紫色放大＋pulse ring、未來＝描邊灰）；手機直向。日期 font-display。
- [ ] **Step 4: Commit** `feat: action timeline with phase highlight`

### Task 9: 簽署看板

**Files:**
- Create: `src/sections/SignBoard.tsx`, `src/components/CandidateCard.tsx`, `src/components/StatusBadge.tsx`, `src/components/CheckIcon.tsx`

**Interfaces:**
- Consumes: `useSheetData(fetchCandidates)`, `PILLARS`（18 項標題對映 checks 索引：pillar 順序展平）
- Produces: 六都 tab 切換（臺北市｜新北市｜桃園市｜臺中市｜臺南市｜高雄市）＋「全部」；卡片 grid

- [ ] **Step 1:** StatusBadge 四態：signed 綠底白字「已簽署 n 項」（n=checks true 數）、partial 淡綠底「部分簽署」、met 淡藍底「已拜會」、none 灰描邊「尚未回應」。CandidateCard：剪影頭像（無 photoUrl 時的 SVG 人形）、姓名 font-display、政黨、徽章；`isDemo` 時左上角「示意資料」斜帶。點擊展開：五面向分組的 18 項清單，勾＝綠圓底白勾 SVG、未勾＝灰橫線 SVG。
- [ ] **Step 2:** SignBoard：三態處理（loading skeleton 卡片 6 張、error 顯示重試按鈕、empty「名單整理中」）；tab 切換 filter；demo 模式時段首顯示說明條「以下為示意資料，正式名單將於候選人回應後更新」。
- [ ] **Step 3:** 驗證：截圖各狀態（暫時強制 state）、build。
- [ ] **Step 4: Commit** `feat: candidate sign board`

### Task 10: 連署響應與加入連署

**Files:**
- Create: `src/sections/Endorsements.tsx`, `src/sections/PetitionForm.tsx`, `src/components/Marquee.tsx`

**Interfaces:**
- Consumes: `fetchEndorsingOrgs`, `fetchPetitionStats`, `submitPetition`, `validatePetition`, `ORGS`
- Produces: 表單成功後呼叫 `onSigned()` 讓計數 refetch（PetitionForm props: `{ onSigned: () => void }`）

- [ ] **Step 1:** Endorsements：團體牆（膠囊 chip：名稱＋外連 icon，logoUrl 有值放圖）、個人計數大字（CountUp）、留言 Marquee（CSS keyframes 左移、hover/focus 暫停、reduced-motion 轉 overflow-x auto；留言卡：訊息＋遮蔽姓名）。三態齊備。
- [ ] **Step 2:** PetitionForm：身分 radio（個人／團體）、名稱、Email、縣市 select（22 縣市）、留言 textarea、同意公開 checkbox、honeypot（`className="hidden"` 的 website 欄）。submit：validate→錯誤訊息 inline 紅字→送出中 spinner disabled→成功替換為感謝卡（含分享請求文案）→失敗 inline 錯誤＋重試。demo 模式在表單上方顯示「示意模式：資料不會送出」。
- [ ] **Step 3:** 驗證：手動送出成功／失敗（暫時 mock reject）兩路徑截圖、build。
- [ ] **Step 4: Commit** `feat: endorsement wall and petition form`

### Task 11: 關於我們、Footer、組裝與 SEO

**Files:**
- Create: `src/sections/About.tsx`, `src/sections/Footer.tsx`
- Modify: `src/App.tsx`（段落組裝＋錨點 id＋`scroll-margin-top`）, `index.html`（OG image 待主視覺完稿、description）

**Interfaces:**
- Consumes: `ORGS`, `site.ts`

- [ ] **Step 1:** About：九團體卡片 grid（名稱＋外連）；導言一段。Footer：深紫底（purple-deep）反白──聯絡 email、綠盟捐款連結、授權（CC BY-NC 4.0 待確認後改）、完整 Skyline 反白線稿收尾。
- [ ] **Step 2:** App 組裝順序照 spec；每段 `id` 與 Nav 錨點一致；`scroll-behavior: smooth`。
- [ ] **Step 3:** 驗證：全頁滾動截圖（375/768/1280）、錨點跳轉、build。
- [ ] **Step 4: Commit** `feat: assemble one-page layout`

### Task 12: 品質稽核、humanizer、部署

**Files:**
- Modify: 稽核發現的檔案
- Create: `public/404.html`（GH Pages SPA 不需 router，僅友善 404）、`README.md`（小組維護手冊：改試算表即更新、Apps Script 部署指引連結）

- [ ] **Step 1:** reduced-motion 全站驗證（CDP emulate）；鍵盤走查；Lighthouse a11y ≥ 90。
- [ ] **Step 2:** 三寬度全段截圖逐段檢查（橫向溢出、字級、觸控目標 ≥ 44px）。
- [ ] **Step 3:** 全站文案跑 humanizer-zh-tw（`src/content/` 全部檔案），修正後 build。
- [ ] **Step 4:** `gh repo create`（gcaa 相關 org 或個人帳號，公開）、push、GH Pages 部署（`gh-pages` branch 或 Actions），確認線上網址可開。
- [ ] **Step 5:** Commit＋progress.md 更新（含待辦：子網域 DNS、正式 Sheet、Apps Script 部署、OG image）。

## Self-Review 紀錄

- Spec 覆蓋：九段落→Tasks 5–11；資料三態→Tasks 3/9/10；表單→Tasks 4/10；reduced-motion→各視覺任務＋Task 12；humanizer→Task 12；部署→Task 12。無缺漏。
- 型別一致性：`Candidate.checks: boolean[]`（Task 3 產出、Task 9 消費）；`PetitionStats` Task 4 產出、Task 10 消費；`TimelineNode` Task 2 產出、Task 8 消費。
- 已知簡化：OG image 待主視覺完稿；訴求 18 項對 checks 索引採 pillar 展平順序，需與試算表欄序一致（寫入 apps-script-deploy.md 欄位定義）。
