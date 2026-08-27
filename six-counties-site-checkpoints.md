# 六都倡議網站 -- 跨 Session Checkpoints

> 多 session 續作用。每完成一個 phase，agent 產下一個 resume prompt，pbcopy 靜默複製並 append 到這裡。使用者 /clear 後把剪貼簿貼進新 session 即可續做。
>
> 規則：只 append、不修改歷史 prompt。每個 prompt 要 self-contained（新 session 只會看到 CLAUDE.md + 貼上的 prompt）。

## 狀態

- **Phase 0 -- 研究與設計**：完成（2026-08-27）。素材讀取（構想 doc、附件 doc、高溫試算表、主視覺）、四參考網站分析、Joseph 方向確認、spec 與 plan 已 commit
- **Phase 1 -- 基礎建設（plan Tasks 1-4）**：完成（2026-08-27）
- **Phase 2 -- 視覺段落（plan Tasks 5-8）**：完成（2026-08-27）
- **Phase 3 -- 互動段落與組裝（plan Tasks 9-11）**：完成（2026-08-27）
- **Phase 4 -- 稽核與部署（plan Task 12）**：完成（2026-08-27）。上線 https://litostswirrl.github.io/six-counties/ ；剩餘人工待辦見 progress.md「Next／待辦」
- **Phase 5 -- 修訂第一輪（Joseph 七項）**：進行中（2026-08-27），resume prompt 見下方

## Phase 5 Resume Prompt

（2026-08-27 產生，Joseph 回覆七項修訂後）

```
繼續 Phase 5：六都倡議網站修訂第一輪
Working directory: /Users/jinsoon/Docs/Projects/gcaa/six_counties

狀態：Phase 1-4 完成，網站已上線 https://litostswirrl.github.io/six-counties/ （GitHub repo LitostSwirrl/six-counties，push main 自動部署）。spec 在 docs/superpowers/specs/2026-08-27-six-counties-site-design.md，決策紀錄在 progress.md。

開始前讀序：CLAUDE.md -> progress.md -> six-counties-site-checkpoints.md -> src/ 相關檔案

目標（Joseph 2026-08-27 七項修訂）：
1. top nav 標題更大更顯眼，不要「永續韌性城市」
2. 六都關鍵三個數字同一畫面呈現，移除逐一 emerge 的 pinned 滾動
3. SVG 線稿（天際線、pillar icons）太簡略，重畫更複雜精緻版（選擇手繪不用 CC 圖庫，色板可控）
4. 全站字級調大，尤其 15px 內文
5. scrollspy：捲動時 nav 對應項目 highlight
6. 去除小標籤 pill 設計（如時程「進行中」）；資訊性標籤改主視覺的方框語言，按鈕可留圓角
7. 深化六都數據段：真實可查證資料（來源 URL 必附），互動式視覺化；方向＝五大訴求面向各配六都比較指標＋三個總量占比。高溫試算表 1uUUZHqTtvYOS2vgG-sg3GZ-w5UuAQrwPAAYn09zkhc8 另有熱傷害、推估天數分頁可用

慣例：見 checkpoints Cross-cutting contracts；doc 原文逐字照搬、生成文案過 humanizer-zh-tw；dataviz skill 規則（sequential ramp、validator）
完成後：progress.md append What/Why/Next＋更新 checkpoints 狀態；視窗 30%+ 才產下一個 resume prompt
```

## Cross-cutting contracts（每個 session 共用）

- **Project root**: `/Users/jinsoon/Docs/Projects/gcaa/six_counties`
- **讀序**（新 session 開場）：CLAUDE.md -> `docs/superpowers/specs/2026-08-27-six-counties-site-design.md` -> `docs/superpowers/plans/2026-08-27-six-counties-site.md` 該 phase 的 tasks -> `progress.md`
- **設計基調**：只依主視覺（`design/keyvisual_ref.png`），不參考淨零觀測站／排碳大戶觀測站視覺。tokens 已定於 plan Global Constraints
- **模型分工**：機械實作派 Opus 5 workers（禁 Sonnet），視覺判斷與文案留主迴圈；UI 實作前載入 frontend-design skill；中文文案最後過 humanizer-zh-tw
- **素材位置**：訴求全文等原始素材在 scratchpad（session 會換），已固化進 `src/content/` 之前如遺失，用 gws 重抓 doc `1h-LEbmhw8MuAL9t9JqLFKy430ftGnKxUgyDxhoe4Ztc`（附件一分頁）與 doc `1enPCJyU3m1jTYTGWWMp4oMcd857lcLS3JoNPCHD2GyA`
- **每完成一個 phase 必做**：TaskUpdate／progress.md append（What/Why/Next）＋更新本檔狀態區；視窗值得 shed（約 30%+）才產 resume prompt + pbcopy + 告知可 /clear
