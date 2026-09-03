# 2026 六都市長候選人永續韌性城市政策承諾

一頁式倡議網站。九個公民團體提出五大面向、十八項政策訴求，公開追蹤六都市長候選人的簽署狀態，並開放公民與團體連署。

## 網站怎麼更新資料

網站的資料來自兩個地方，改資料來源、重新整理網頁就會更新，不需要動程式碼。設定步驟與欄位定義見 `docs/apps-script-deploy.md`。

- 候選人簽署狀態：來自「候選人簽署」這份 Google Sheet，由工作人員手動維護，網站直接讀取。
- 連署團體名單與個人留言：連署走 Google 表單，回覆會落在一份不公開的試算表，網站透過 Apps Script 網頁應用程式讀取整理過的結果，Email 等個資不會外流。
- 兩個設定值填在 `src/data/config.ts`：`SHEET_ID` 是候選人簽署試算表的編號，`APPS_SCRIPT_URL` 是 Apps Script 的網頁應用程式網址。改完要重新部署一次。
- 值填好之前，簽署看板顯示示意資料（畫面上會標示「示意資料」），連署團體則顯示網站內建的已確認名單。

## 開發

```
npm install
npm run dev      開發伺服器
npm run build    產出靜態檔到 dist/
npm run test     跑測試
```

技術：React 18、TypeScript、Vite、Tailwind CSS v4、GSAP ScrollTrigger。字型：Noto Sans TC。

## 部署

push 到 main 後由 GitHub Actions 自動建置並部署到 GitHub Pages。要掛 gcaa.org.tw 子網域時：在 repo Settings → Pages 設定 custom domain，並請網域管理者加一筆 CNAME 記錄；同時把 `vite.config.ts` 的 `base` 改為 `'/'`。

## 授權

程式碼 MIT；網站內容 CC BY-NC 4.0。
