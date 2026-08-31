# 六都永續韌性倡議網站修改 -- 跨 Session Checkpoints

> 供本次網站修改續作使用。每完成一個階段，更新下方狀態與下一階段提示。

## 狀態

- **Phase 1 -- 現況畫面與資產審查**：完成（2026-08-31）
- **Phase 2 -- 文案、連署入口與頁尾修改**：完成（2026-08-31）
- **Phase 3 -- 裝飾資產調整與完整驗證**：完成（2026-08-31）
- **Phase 4 -- 提交與部署目前修改**：完成（2026-08-31）
- **Phase 5 -- 天際線、連署示意與介面圖示修訂**：完成（2026-08-31）

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

## Phase 4 完成紀錄

- 提交 `39079d2` 已推送至 `main`。
- GitHub Actions 工作流程 `33382639407` 的測試、建置與部署工作皆成功。
- 公開網址 `https://litostswirrl.github.io/six-counties/` 已確認更新；桌面 1200px、手機 390px 穩定畫面無水平溢出，指定 Google 表單連結共 3 個，頁尾沒有募捐／捐款文字。
- 下一階段維持等待 Joseph 指定範圍；不自行加入資料或功能。

## Phase 5 本機完成紀錄

- 天際線改為左北右南排列，加入臺北 101、桃園機場塔台、臺中國家歌劇院、赤崁樓、高雄 85 大樓與港區起重機；屋頂元素改為少量光電板、約三個水塔與一般屋頂的混合，輸出尺寸為 1855×848，改以原始比例顯示。
- 只保留首頁天際線，資料段和頁尾的重複圖片已移除；`CityBackdrop` 不再使用固定裁切模式。
- 加入六筆明確標示為示意的連署團體，首頁數量與名稱同一份資料同步，連署區以桌面雙欄、手機單欄呈現完整名稱；欄位名稱改為「連署團體」。
- top nav 的「加入連署」連到 `#join`，加入連署區內按鈕仍連到指定 Google 表單。
- 五個訴求圖示與投票箱重新繪製，採一致線寬、留白與簡化構圖。
- 本機 `npm run test` 37 項通過、`npm run build` 通過；390px 與 1200px 穩定畫面無水平溢出，天際線只出現一次且未裁切。部署與公開網址驗證待完成。

## Phase 5 公開完成紀錄

- 頁尾恢復天際線，使用同一構圖的夜間版 `public/images/city-skyline-night.webp`；首頁保留日間版，資料段不放圖，頁面總共兩張天際線。
- `CityBackdrop` 以日間／夜間變體載入素材；兩張圖都以原始比例顯示，不使用固定高度裁切。
- 提交 `e4de681` 已推送至 `main`；GitHub Actions 工作流程 `33385157680` 的測試、建置與 GitHub Pages 部署均成功。
- 公開網址 `https://litostswirrl.github.io/six-counties/?rev=e4de681` 已確認 390px 與 1200px 穩定畫面無水平溢出；日間與夜間天際線均完成載入，夜間版確實位於頁尾。
- `npm run test` 38 項通過；`npm run build` 通過，僅有既有字型路徑警告；`git diff --check` 通過。
- 下一階段尚未決定，維持等待 Joseph 指定範圍。

## Phase 5 Resume Prompt

```text
繼續 Phase 5：修訂六都永續韌性倡議網站的天際線、連署示意、導覽行為與介面圖示。

工作目錄：/Users/jinsoon/Docs/Projects/gcaa/six_counties

目前狀態：
- Phase 1 至 Phase 4 已完成，公開網站為 https://litostswirrl.github.io/six-counties/。
- Phase 4 的功能提交為 39079d2，進度提交為 94000f9。
- 使用者已確認本階段設計方向：天際線左北右南、移除重複天際線、修正裁切、連署使用示意資料、導覽先到加入連署區段、重新繪製圖示。
- 先前工作樹刻意保留的 tsconfig.tsbuildinfo 與 .playwright-mcp 暫存紀錄不屬於本階段產物。

開始前：
1. 讀取 progress.md 與本檔案。
2. 讀取相關元件與測試，確認既有資料邊界和元件呼叫關係。
3. 行為修改遵守測試先行：先寫會失敗的測試並確認失敗，再寫最小實作。

本階段目標：
- 以目前城市插畫風格重製 public/images/city-skyline.webp，知名建物由左至右呈現北到南的順序，平衡光電板、水塔與一般屋頂，減少水塔，且不裁切建物上半部。
- 只保留首頁第一張天際線，移除資料段與頁尾的重複使用。
- 將首頁欄位「團體名稱」改為「連署團體」，加入明確標示為示意資料的完整團體名單，並與示意數量同步。
- 連署區呈現完整團體名單，桌面雙欄、手機單欄，不截斷名稱。
- top nav 的「加入連署」先連到頁面下方加入連署區段，區段內按鈕仍連到指定 Google 表單。
- 重新繪製五個訴求圖示與投票箱，使用一致的線寬、比例、填色與留白。

共通規則：
- 不新增外部氣候資料，不更動暫緩中的老年人口、熱傷害來源與「六都關鍵」名稱。
- 使用臺灣正體中文，不使用表情符號；原有專案文案與資料不要擴寫。
- 圖示使用現有 SVG／程式碼資產；城市插畫使用影像產生工具編輯既有資產，並驗證輸出後放回專案。
- 保留載入中、錯誤、空名單、成功狀態；正式 Google Sheet 有資料時不可被示意資料蓋掉。

輸出：
- 修改網站原始碼、測試與 public/images/city-skyline.webp。
- 更新 progress.md 與本檔案的 Phase 5 完成紀錄。
- 完成後建立提交並推送 main，等待 GitHub Actions 成功，再讀回公開網站。

完成後必做：
1. 執行 npm run test、npm run build、git diff --check。
2. 以瀏覽器檢查公開網站的 1200px 與 390px 畫面，確認無水平溢出、天際線未裁切、表單連結和導覽錨點正確。
3. 核對測試、建置、部署和公開網址的實際結果，不以推測代替驗證。
4. 更新 progress.md 與本檔案的狀態和 What／Why／Next 紀錄。
5. 若下一階段範圍尚未決定，只完成檢查點，不建立含有條件分支的續作提示；若已決定且需要交接，才將下一個續作提示寫入本檔案並靜默複製到剪貼簿。
```

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
