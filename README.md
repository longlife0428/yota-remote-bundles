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

Web 發布、新版上線並驗證後，要清掉 `remote/<gameId>/` 底下的舊版 Web 檔（hash 檔名解壓不會蓋掉舊檔），步驟見 `slot_game/docs/build-sync-hot-update.md` §5 步驟 11。

## 殼頁與網頁預覽（third-game）

`remote/third-game/` 是殼頁與網頁預覽，**不是熱更新內容，可以手動更新**，下面四條規則不適用。

```text
remote/third-game/
├── shell.html            ← 殼頁 通訊約定寫在檔頭註解
├── host-sdk.js           ← 第三方遊戲用
├── demo-game.html、return.html
├── popups/、game-info/   ← 彈窗素材、遊戲說明頁
└── preview/<gameId>/     ← 遊戲網頁預覽 進遊戲模式是網頁的遊戲由大廳載入這裡
```

更新預覽：

1. 在 `slot_game` 構建 web，輸出名稱用 `<gameId>-web`。完成時 Console 最後一行會印出預覽網址，鉤子只提示，不複製檔案。
2. 自己把 `slot_game/build/<gameId>-web` 複製到 `remote/third-game/preview/<gameId>` 覆蓋，不要複製 `.map` 檔。
   - 完整構建：先清掉舊的再複製。
   - 只構建 Bundle：覆蓋 `assets/internal`、`assets/main`、`remote/<gameId>`、`src/settings*.json` 即可。
3. commit 後 push，同步到 R2 後生效。

預覽網址：

```text
https://pub-42d4a6164a8043969925bdede61d36a1.r2.dev/remote/third-game/preview/<gameId>/index.html
https://pub-42d4a6164a8043969925bdede61d36a1.r2.dev/remote/third-game/shell.html?url=preview/<gameId>/index.html&gameId=<gameId>
```

第二條是經過殼頁開，有選單、自動旋轉、選座、遊戲說明與音樂音效開關。直接開第一條時，遊戲啟動頁會先確認上兩層有 `shell.html`，有就自動跳到第二條；網址加 `shell=0` 可以不跳。沒上傳過的遊戲打開會失敗。

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
