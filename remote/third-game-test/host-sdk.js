(function (w) {
    // 遊戲放在殼頁的 iframe 裡時 用這支跟殼頁溝通 不在殼頁裡就什麼都不做
    var inFrame = w.parent !== w;
    function send(type, payload) {
        if (inFrame) w.parent.postMessage({ source: 'game', type: type, payload: payload || {} }, '*');
    }
    var hello = null;
    w.HostBridge = {
        // 殼頁握手後的資料 { gameId, lang } 還沒握手是 null
        get hello() { return hello; },
        // 遊戲畫面準備好了 殼頁收到就拿掉遮罩
        ready: function () { send('ready'); },
        // 載入進度 0 到 100
        loading: function (percent) { send('loading', { percent: percent }); },
        // 玩家在遊戲內按退出 殼頁會彈出退出確認窗
        exit: function () { send('exit'); },
        error: function (message) { send('error', { message: message }); },
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
            if (event.source === w.parent && data && data.source === 'host-shell' && data.type === 'hello') hello = data.payload || {};
        });
        // 啟動時主動問一次握手
        send('hi');
    }
})(window);
