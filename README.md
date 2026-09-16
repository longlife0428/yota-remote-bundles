# yota-remote-bundles

子遊戲熱更新的 CDN 內容。push 到 `main` 之後由 Cloudflare Pages 自動部署，**幾分鐘內直接上線，沒有測試也沒有審核擋**。

發布包由 `slot_game` 產生，不要手動編輯這裡的任何檔案。

## 結構

```text
remote/<gameId>/
├── version.json              ← Web 版本指標
├── config.<hash>.json        ← Web Bundle 設定
├── index.<hash>.js
├── import/                   ← Web Bundle 資產
├── native/                   ← Web Bundle 的二進位資產（不是原生熱更新）
└── hotupdate/                ← 原生熱更新只有這層
    └── <platform>/           ← ios / android 各自獨立
        ├── project.manifest
        ├── version.manifest
        └── <version>/<gameId>/<gameId>.zip
```

`remote/<gameId>/native/` 是 Cocos Bundle 放二進位資產的固定資料夾名，**跟原生熱更新無關**。

Web 開 MD5 Cache，檔名自帶 hash，不分版本資料夾，新版直接覆蓋。原生每個平台每個版本一個資料夾，舊版保留以便回滾。

## 發布

在 `slot_game` 打包，把產出的 zip 解壓到本 repo **根目錄**，commit 後 push。

```bash
# slot_game
bash scripts/hotupdate/package-web.sh --bundle 1002
bash scripts/hotupdate/package-native.sh --bundle 1002 --platform ios
```

兩種包解壓後都以 `remote/` 開頭，路徑天生對齊。

原生要**先傳 payload zip，最後才傳兩份 manifest**。順序反了會讓客戶端抓到還不存在的檔案。

## 四條不能違反的規則

**1. 只能合併，不能取代目錄**

Web 發布包不含 `hotupdate/`，直接取代 `remote/<gameId>/` 會把原生熱更新的 manifest 與所有版本 ZIP 一起刪掉，線上原生端立刻抓不到更新。反向亦然。

**2. 不要刪舊版本資料夾**

`hotupdate/<platform>/<version>/` 是回滾用的。

**3. 不要改動路徑結構**

更新器是跟著子遊戲 Bundle 一起發布的：裝置上跑的是舊版更新器，只認舊路徑。路徑一改，**所有已安裝的裝置都永遠更新不到**，因為帶有新路徑的程式碼要靠更新才能送達。

真的非改不可，就新舊路徑並存：舊路徑繼續指向一個新版本，等舊裝置都升上來之後再拆掉舊的。

**4. 版號只能往上加**

同版號重新發布，客戶端不會認為有更新。Web 比對的是 `version.json` 的 `configVersion`，原生比對的是 `project.manifest` 的 `version`。

## 驗證

發布後直接開網址確認：

```text
https://yota-remote-bundles.pages.dev/remote/1001/version.json
https://yota-remote-bundles.pages.dev/remote/1001/hotupdate/ios/project.manifest
https://yota-remote-bundles.pages.dev/remote/1001/hotupdate/ios/<version>/1001/1001.zip
```

manifest 要關閉快取，payload zip 可以快取。

## 倉庫大小

每個版本的 ZIP 都永久留在 git 歷史裡，`.git` 會持續變大。清理工作區的舊版本資料夾不會縮小歷史，日後可能需要改用物件儲存。

## 詳細說明

`slot_game/docs/build-sync-hot-update.md`
