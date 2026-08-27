# 六都倡議網站 -- 跨 Session Checkpoints

> 多 session 續作用。每完成一個 phase，agent 產下一個 resume prompt，pbcopy 靜默複製並 append 到這裡。使用者 /clear 後把剪貼簿貼進新 session 即可續做。
>
> 規則：只 append、不修改歷史 prompt。每個 prompt 要 self-contained（新 session 只會看到 CLAUDE.md + 貼上的 prompt）。

## 狀態

- **Phase 0 -- 研究與設計**：完成（2026-08-27）。素材讀取（構想 doc、附件 doc、高溫試算表、主視覺）、四參考網站分析、Joseph 方向確認、spec 與 plan 已 commit
- **Phase 1 -- 基礎建設（plan Tasks 1-4：scaffold、內容、資料層、連署後端）**：待執行
- **Phase 2 -- 視覺段落（plan Tasks 5-8：hero、數據敘事、訴求、時程）**：待執行
- **Phase 3 -- 互動段落與組裝（plan Tasks 9-11）**：待執行
- **Phase 4 -- 稽核與部署（plan Task 12）**：待執行

## Cross-cutting contracts（每個 session 共用）

- **Project root**: `/Users/jinsoon/Docs/Projects/gcaa/six_counties`
- **讀序**（新 session 開場）：CLAUDE.md -> `docs/superpowers/specs/2026-08-27-six-counties-site-design.md` -> `docs/superpowers/plans/2026-08-27-six-counties-site.md` 該 phase 的 tasks -> `progress.md`
- **設計基調**：只依主視覺（`design/keyvisual_ref.png`），不參考淨零觀測站／排碳大戶觀測站視覺。tokens 已定於 plan Global Constraints
- **模型分工**：機械實作派 Opus 5 workers（禁 Sonnet），視覺判斷與文案留主迴圈；UI 實作前載入 frontend-design skill；中文文案最後過 humanizer-zh-tw
- **素材位置**：訴求全文等原始素材在 scratchpad（session 會換），已固化進 `src/content/` 之前如遺失，用 gws 重抓 doc `1h-LEbmhw8MuAL9t9JqLFKy430ftGnKxUgyDxhoe4Ztc`（附件一分頁）與 doc `1enPCJyU3m1jTYTGWWMp4oMcd857lcLS3JoNPCHD2GyA`
- **每完成一個 phase 必做**：TaskUpdate／progress.md append（What/Why/Next）＋更新本檔狀態區；視窗值得 shed（約 30%+）才產 resume prompt + pbcopy + 告知可 /clear
