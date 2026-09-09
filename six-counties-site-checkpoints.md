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
- **Phase 5 至 Phase 20 -- 逐次修訂與公開部署**：完成（2026-08-27 至 2026-09-01），逐階段紀錄見 progress.md
- **Phase 21 -- 全站審查修正批次（Joseph 2026-09-03 整批意見）＋連署資料改接表單回覆試算表**：完成（2026-09-03），提交 `3a60ff1` 已公開部署並驗證。Apps Script 與候選人簽署試算表均已接上。決策與驗證見 progress.md「Phase 21」。下一階段範圍未定（等同事填候選人資料或 Joseph 下一輪意見），尚未產 resume prompt
- **Phase 22 至 Phase 32 -- 逐次修訂與公開部署**：完成（2026-09-03 至 2026-09-09），逐階段紀錄見 progress.md
- **Phase 33 -- 最新消息改讀 Google 試算表**：完成（2026-09-09）。程式部署 `fb382c7`、讀取失敗提示 `e8a4029`；工作表「最新消息」已建立並驗證公開站吃到試算表資料。下方「Phase 33 續作 Resume Prompt」已執行完畢、不需再用。下一階段範圍未定，尚未產 resume prompt

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

---

## Phase 33 續作 Resume Prompt

（2026-09-09 10:35 產生，程式部署後、工作表建立前）

````
繼續 Phase 33 收尾：在候選人簽署試算表建立「最新消息」工作表，讓已部署的最新消息區改吃試算表資料

工作目錄：/Users/jinsoon/Docs/Projects/gcaa/six_counties

狀態：
- 程式端已完成並部署（提交 fb382c7，GitHub Actions 34303385853 成功）：src/data/newsSheet.ts 讀同一份試算表的「最新消息」工作表（gviz），src/sections/News.tsx 依 loading／error／empty／ready 顯示；讀不到工作表時退回 src/content/news.ts 內建的 8 月 12 日那一則。
- 工作表尚未建立。上次 gws 回 401 invalid_grant（invalid_rapt），要 Joseph 先在 prompt 輸入 `! gws auth login` 重新登入。
- 決策與審查紀錄見 progress.md「Phase 33」；協作者填表說明已寫在 docs/apps-script-deploy.md「最新消息工作表」。

開始前：
1. 讀 CLAUDE.md、progress.md「Phase 33」段落、docs/apps-script-deploy.md「最新消息工作表」段落。
2. 跑 `gws auth status`；若仍 401，請 Joseph 執行 `! gws auth login`，不要自己動 ~/.config/gws。

目標：
- 用下列腳本建工作表（試算表 ID 18MZP1jPFbK7Orn_W-66r-LjVsIpFIt1GkYwSlfvS_GY）。先確認該試算表還沒有「最新消息」工作表（`gws sheets spreadsheets get --params '{"spreadsheetId":"...","fields":"sheets.properties.title"}'`），有的話跳過 addSheet 那一步。
- 驗證 gviz：`curl -s 'https://docs.google.com/spreadsheets/d/18MZP1jPFbK7Orn_W-66r-LjVsIpFIt1GkYwSlfvS_GY/gviz/tq?tqx=out:json&sheet=%E6%9C%80%E6%96%B0%E6%B6%88%E6%81%AF'` 的 cols label 應為 日期／類別／…／顯示，rows[0] 的 A 欄是 Date(2026,7,12)、H 欄是 true。
- 驗證公開站 https://litostswirrl.github.io/six-counties/ 最新消息區：卡片連結 gcaa.org.tw/16551、縮圖 src 變成 https://gcaa.org.tw/wp-content/uploads/2026/08/20260812-大合照2_RE.jpg（不再是本機 webp）。用 chrome-devtools-mcp 或 Playwright 看 DOM，不要只看原始碼。
- 在試算表加一列測試（顯示不勾）確認不會出現，再刪掉。

腳本（zsh）：
```
#!/bin/zsh
set -e
ID=18MZP1jPFbK7Orn_W-66r-LjVsIpFIt1GkYwSlfvS_GY
gws sheets spreadsheets batchUpdate --params "{\"spreadsheetId\":\"$ID\"}" --json '{"requests":[{"addSheet":{"properties":{"title":"最新消息","gridProperties":{"rowCount":200,"columnCount":8,"frozenRowCount":1}}}}]}' --format json > /tmp/news-addsheet.json
SID=$(python3 -c "import json;print(json.load(open('/tmp/news-addsheet.json'))['replies'][0]['addSheet']['properties']['sheetId'])")
echo "sheetId=$SID"
gws sheets spreadsheets values update --params "{\"spreadsheetId\":\"$ID\",\"range\":\"最新消息!A1:H2\",\"valueInputOption\":\"USER_ENTERED\"}" --json '{"values":[["日期","類別","標題","摘要","連結","圖片網址","圖片說明","顯示"],["2026/08/12","新聞稿","【聯合新聞稿】六都市長候選人永續韌性城市政策承諾訴求發布","九個公民團體共同發布「六都市長候選人永續韌性城市政策承諾」，提出再生能源與產業永續轉型、防災韌性與民生保障、高溫調適與健康安全、水患治理轉型及永續交通轉型五大政策面向，邀請六都市長候選人簽署。","https://gcaa.org.tw/16551/","https://gcaa.org.tw/wp-content/uploads/2026/08/20260812-大合照2_RE.jpg","九個公民團體代表在記者會合照","TRUE"]]}' --format json > /dev/null
gws sheets spreadsheets batchUpdate --params "{\"spreadsheetId\":\"$ID\"}" --json "{\"requests\":[
 {\"repeatCell\":{\"range\":{\"sheetId\":$SID,\"startRowIndex\":0,\"endRowIndex\":1},\"cell\":{\"userEnteredFormat\":{\"textFormat\":{\"bold\":true},\"backgroundColor\":{\"red\":0.93,\"green\":0.91,\"blue\":0.97}}},\"fields\":\"userEnteredFormat(textFormat,backgroundColor)\"}},
 {\"repeatCell\":{\"range\":{\"sheetId\":$SID,\"startRowIndex\":1,\"startColumnIndex\":0,\"endColumnIndex\":1},\"cell\":{\"userEnteredFormat\":{\"numberFormat\":{\"type\":\"DATE\",\"pattern\":\"yyyy/mm/dd\"}}},\"fields\":\"userEnteredFormat.numberFormat\"}},
 {\"setDataValidation\":{\"range\":{\"sheetId\":$SID,\"startRowIndex\":1,\"startColumnIndex\":1,\"endColumnIndex\":2},\"rule\":{\"condition\":{\"type\":\"ONE_OF_LIST\",\"values\":[{\"userEnteredValue\":\"新聞稿\"},{\"userEnteredValue\":\"投書\"},{\"userEnteredValue\":\"活動\"}]},\"strict\":true,\"showCustomUi\":true}}},
 {\"setDataValidation\":{\"range\":{\"sheetId\":$SID,\"startRowIndex\":1,\"startColumnIndex\":7,\"endColumnIndex\":8},\"rule\":{\"condition\":{\"type\":\"BOOLEAN\"},\"strict\":true}}},
 {\"repeatCell\":{\"range\":{\"sheetId\":$SID,\"startRowIndex\":1,\"startColumnIndex\":2,\"endColumnIndex\":4},\"cell\":{\"userEnteredFormat\":{\"wrapStrategy\":\"WRAP\"}},\"fields\":\"userEnteredFormat.wrapStrategy\"}},
 {\"updateDimensionProperties\":{\"range\":{\"sheetId\":$SID,\"dimension\":\"COLUMNS\",\"startIndex\":0,\"endIndex\":1},\"properties\":{\"pixelSize\":110},\"fields\":\"pixelSize\"}},
 {\"updateDimensionProperties\":{\"range\":{\"sheetId\":$SID,\"dimension\":\"COLUMNS\",\"startIndex\":1,\"endIndex\":2},\"properties\":{\"pixelSize\":80},\"fields\":\"pixelSize\"}},
 {\"updateDimensionProperties\":{\"range\":{\"sheetId\":$SID,\"dimension\":\"COLUMNS\",\"startIndex\":2,\"endIndex\":3},\"properties\":{\"pixelSize\":320},\"fields\":\"pixelSize\"}},
 {\"updateDimensionProperties\":{\"range\":{\"sheetId\":$SID,\"dimension\":\"COLUMNS\",\"startIndex\":3,\"endIndex\":4},\"properties\":{\"pixelSize\":420},\"fields\":\"pixelSize\"}},
 {\"updateDimensionProperties\":{\"range\":{\"sheetId\":$SID,\"dimension\":\"COLUMNS\",\"startIndex\":4,\"endIndex\":7},\"properties\":{\"pixelSize\":260},\"fields\":\"pixelSize\"}},
 {\"updateDimensionProperties\":{\"range\":{\"sheetId\":$SID,\"dimension\":\"COLUMNS\",\"startIndex\":7,\"endIndex\":8},\"properties\":{\"pixelSize\":60},\"fields\":\"pixelSize\"}}
]}" --format json > /dev/null
echo done
```

慣例：gws 寫入前先 --dry-run 看一次；工作表名稱「最新消息」必須完全一致；圖片只收直接圖片網址。

輸出：無新檔案。progress.md「Phase 33」追加一則「工作表建立與驗證」紀錄（What／Why／Next）。

完成後必做：
1. progress.md 追加紀錄並更新 six-counties-site-checkpoints.md 狀態區的 Phase 33 為完成。
2. 下一階段範圍未定（等 Joseph 下一輪意見），不產 resume prompt。
3. 若視窗已用到三成以上，告知可以 /clear；否則留在同一 session。
````
