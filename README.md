# 2026 六都市長候選人永續韌性城市政策承諾

一頁式倡議網站。九個公民團體提出五大面向、十八項政策訴求，公開追蹤六都市長候選人的簽署狀態，並開放公民與團體連署。

## 網站怎麼更新資料

網站的簽署與連署資料都來自一份 Google Sheet，改試算表、重新整理網頁就會更新，不需要動程式碼。設定步驟與工作表欄位定義見 `docs/apps-script-deploy.md`。

- 試算表建好後，把試算表 ID 與 Apps Script 網址填入 `src/data/config.ts`，重新部署一次。
- 兩個值都留空時，網站以示意資料運作（畫面上會標示「示意資料」）。

## 開發

```
npm install
npm run dev      開發伺服器
npm run build    產出靜態檔到 dist/
npm run test     跑測試
```

技術：React 18、TypeScript、Vite、Tailwind CSS v4、GSAP ScrollTrigger。字型：jf open 粉圓（標題）、Noto Sans TC（內文）。

## 部署

push 到 main 後由 GitHub Actions 自動建置並部署到 GitHub Pages。要掛 gcaa.org.tw 子網域時：在 repo Settings → Pages 設定 custom domain，並請網域管理者加一筆 CNAME 記錄；同時把 `vite.config.ts` 的 `base` 改為 `'/'`。

## 授權

程式碼 MIT；網站內容 CC BY-NC 4.0。
