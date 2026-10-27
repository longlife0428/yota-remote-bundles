// 只給第三方遊戲用 我們自己的遊戲在各自的程式裡實作同一套訊息 約定見 shell.html 檔頭
(function (w) {
    // 遊戲放在殼頁的 iframe 裡時 用這支跟殼頁溝通 不在殼頁裡就什麼都不做
    var inFrame = w.parent !== w;
    var hello = null;
    var waiting = {};
    var dialogCount = 0;

    function send(type, payload) {
        if (inFrame) w.parent.postMessage({ source: 'game', type: type, payload: payload || {} }, '*');
    }

    // 彈窗要等玩家按 用代號對回結果
    function askDialog(type, options) {
        var id = 'game-' + (++dialogCount);
        var payload = Object.assign({}, options, { id: id });
        return new Promise(function (resolve) {
            waiting[id] = resolve;
            send(type, payload);
        });
    }

    w.HostBridge = {
        // 殼頁握手後的資料 { gameId, lang, settings } 還沒握手是 null
        get hello() { return hello; },
        // 遊戲畫面準備好了 殼頁收到就拿掉遮罩
        ready: function () { send('ready'); },
        // 載入進度 0 到 100
        loading: function (percent) { send('loading', { percent: percent }); },
        error: function (message) { send('error', { message: message }); },
        // 以下跟大廳呼叫殼頁的指令同一套
        // 打開殼頁的系統選單 音樂音效切換會用 onHost 收到 setting { music, sound }
        showSystemMenu: function () { send('show-system-menu'); },
        // 選擇自動旋轉局數 counts 可省略 要給就剛好 6 個 -1 代表無限 回傳局數 沒選就關掉回 null
        showAutoPlay: function (counts) { return askDialog('show-auto-play', counts ? { counts: counts } : {}); },
        // 彈出退出確認窗 玩家確認後大廳會離開遊戲
        showExitDialog: function () { send('show-exit'); },
        // 彈出確認窗 options = { title, message, confirm, cancel } 回傳 'ok' 'cancel' 'closed'
        showConfirmDialog: function (options) { return askDialog('show-confirm', options); },
        // 彈出只有一個按鈕的提示窗
        showAlertDialog: function (options) { return askDialog('show-alert', options).then(function () {}); },
        closeDialog: function () { send('close-dialog'); },
        showLoading: function (text) { send('show-loading', { text: text }); },
        hideLoading: function () { send('hide-loading'); },
        showToast: function (text, ms) { send('show-toast', { text: text, ms: ms }); },
        // 接殼頁傳來的訊息 callback(type, payload)
        onHost: function (callback) {
            w.addEventListener('message', function (event) {
                var data = event.data;
                if (event.source === w.parent && data && data.source === 'host-shell') callback(data.type, data.payload || {});
            });
        }
    };

    if (inFrame) {
        w.addEventListener('message', function (event) {
            var data = event.data;
            if (event.source !== w.parent || !data || data.source !== 'host-shell') return;
            if (data.type === 'hello') hello = data.payload || {};
            // 確認窗回 result 自動旋轉選單回 count 都用代號對回去
            if (data.type === 'dialog-result' || data.type === 'auto-play-result') {
                var payload = data.payload || {};
                if (waiting[payload.id]) {
                    waiting[payload.id](data.type === 'auto-play-result' ? payload.count : payload.result);
                    delete waiting[payload.id];
                }
            }
        });
        // 啟動時主動問一次握手
        send('hi');
    }
})(window);
