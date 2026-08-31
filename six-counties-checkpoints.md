# 六都永續韌性倡議網站修改 -- 跨 Session Checkpoints

> 供本次網站修改續作使用。每完成一個階段，更新下方狀態與下一階段提示。

## 狀態

- **Phase 1 -- 現況畫面與資產審查**：完成（2026-08-31）
- **Phase 2 -- 文案、連署入口與頁尾修改**：完成（2026-08-31）
- **Phase 3 -- 裝飾資產調整與完整驗證**：完成（2026-08-31）
- **Phase 4 -- 提交與部署目前修改**：進行中（2026-08-31）

## 共通規則

- **專案目錄**：`/Users/jinsoon/Docs/Projects/gcaa/six_counties`
- **資料邊界**：不新增外部氣候資料；老年人口、熱傷害人數與「六都關鍵」維持暫緩狀態。
- **語言**：使用臺灣正體中文；不使用表情符號。
- **驗證**：完成前執行 `npm run build` 與 `npm run test`，並以瀏覽器檢查桌面與手機畫面。

## Phase 3 完成紀錄

- 加入連署入口統一指向指定 Google 表單，站內表單移除。
- 首頁統計改為候選人連署數量、團體連署數量與團體名稱，保留正式資料缺漏時的狀態提示。
- 風險標題更新，頁尾移除募捐資訊。
- `PillarIcon` 與 `BallotBox` 重畫；生成式寬幅城市插畫採用於首頁、資料段與頁尾，存於 `public/images/city-skyline.webp`。
- `npm run test` 33 項通過；`npm run build` 通過；390px 與 1200px 畫面無水平溢出。

## Phase 4 完成條件

- 提交本次原始碼、測試、進度文件、檢查點與城市插畫，不納入建置索引與瀏覽器暫存錯誤紀錄。
- 推送 `main` 後確認 GitHub Actions 建置與 GitHub Pages 部署結果。
- 以公開網址重新檢查 390px 與 1200px 畫面，以及指定 Google 表單連結。

## Phase 4 -- 下一步

- **狀態**：待 Joseph 指定下一個明確範圍。
- **續作入口**：以下提示已寫入剪貼簿，可直接貼到新的工作階段。

### Resume Prompt

繼續六都永續韌性倡議網站的後續工作。

工作目錄：/Users/jinsoon/Docs/Projects/gcaa/six_counties

先閱讀：
1. /Users/jinsoon/Docs/Projects/gcaa/six_counties/progress.md
2. /Users/jinsoon/Docs/Projects/gcaa/six_counties/six-counties-checkpoints.md

目前已完成：
- 加入連署與站內連署入口已改為指定 Google 表單：https://forms.gle/33wPJC2G4sYm2VBf6
- 首頁統計改為候選人連署數量、團體連署數量、團體名稱，並保留正式資料載入中、錯誤與空名單狀態。
- 風險標題改為「六都面對哪些氣候風險」。
- 頁尾已移除募捐資訊。
- 頁尾天際線及首頁、資料段裝飾已改用 public/images/city-skyline.webp；PillarIcon 與 BallotBox 已重畫為一致的簡化圖示。
- 已完成 npm run test、npm run build、git diff --check，以及 390px 與 1200px 瀏覽器檢查。測試為 33 項通過；建置僅有既有字型路徑警告。
- 尚未建立 Git commit；目前工作樹中的修改屬於本次工作，請保留。

尚待 Joseph 指定或資料到位：
- 「六都關鍵」更名暫緩。
- 老年人口、熱傷害人數及相關文字等待嘉穎提供資料來源。
- 團體連署數量與團體名稱仍需正式資料同步後再做人工確認。

下一步原則：
- 等待 Joseph 指定下一個明確範圍，不要自行擴大功能。
- 若有行為修改，先依現有專案規範補測試，再修改實作。
- 完成前重新執行 npm run test、npm run build、git diff --check，並以瀏覽器檢查桌面與手機畫面。
- 每次完成一個階段，都更新 progress.md 與 six-counties-checkpoints.md。
