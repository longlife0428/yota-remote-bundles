System.register("chunks:///_virtual/Launcher.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, settings, SettingsCategory, Component, sys, director, assetManager, native;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      settings = module.settings;
      SettingsCategory = module.SettingsCategory;
      Component = module.Component;
      sys = module.sys;
      director = module.director;
      assetManager = module.assetManager;
      native = module.native;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "389adTq4V1F7oT07UQlVKbn", "Launcher", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;

      // 預覽資料夾裡的遊戲頁找殼頁的位置 third-game/preview/<遊戲ID>/index.html 對 third-game/shell.html
      var SHELL_PAGE = '../../shell.html';
      /**
       * slot_game 的獨立測試入口。
       *
       * Editor：直接按執行時載入本專案 Bundle。
       * Web 構建：從同一份構建輸出的 remote/<gameId> 載入。
       * URL 可用 ?gameId=1002 或 ?gameId=1002&scene=1002 覆寫。
       * 沒有指定時 構建只帶一個遠端遊戲就用它 其餘才用預設值。
       * 直接開網頁版時 最外層沒有殼頁就去找殼頁並跳過去 讓選單與遊戲說明有地方彈。
       * entry 正式載入子遊戲時不會經過這個 Component。
       */
      var SlotGameLauncher = exports('SlotGameLauncher', (_dec = ccclass('SlotGameLauncher'), _dec2 = property({
        tooltip: '沒有指定 ?gameId= 而且構建沒有單一遠端遊戲時（例如編輯器預覽），slot_game 獨立測試預設載入的遊戲'
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(SlotGameLauncher, _Component);
        function SlotGameLauncher() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "defaultGameId", _descriptor, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = SlotGameLauncher.prototype;
        /**
         * 最外層沒有殼頁或大廳時 找殼頁並跳過去 殼頁才有選單 自動旋轉 選座與遊戲說明可以彈
         *
         * 在編輯器 原生 殼頁或大廳的 iframe 裡不處理 找不到殼頁就留在原頁 網址加 shell=0 也不跳
         *
         * @param gameId 遊戲代號 殼頁用它找遊戲說明。
         * @returns 已經跳轉時為 true。
         */
        _proto.wrapInShell = /*#__PURE__*/
        function () {
          var _wrapInShell = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(gameId) {
            var shellUrl, res;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  if (!(sys.isNative || typeof window === 'undefined' || window.parent !== window)) {
                    _context.next = 2;
                    break;
                  }
                  return _context.abrupt("return", false);
                case 2:
                  if (!(new URLSearchParams(location.search).get('shell') === '0')) {
                    _context.next = 4;
                    break;
                  }
                  return _context.abrupt("return", false);
                case 4:
                  shellUrl = new URL(SHELL_PAGE, location.href);
                  _context.prev = 5;
                  _context.next = 8;
                  return fetch(shellUrl.href, {
                    method: 'HEAD'
                  });
                case 8:
                  res = _context.sent;
                  if (res.ok) {
                    _context.next = 11;
                    break;
                  }
                  return _context.abrupt("return", false);
                case 11:
                  _context.next = 16;
                  break;
                case 13:
                  _context.prev = 13;
                  _context.t0 = _context["catch"](5);
                  return _context.abrupt("return", false);
                case 16:
                  shellUrl.searchParams.set('url', location.href);
                  shellUrl.searchParams.set('gameId', gameId);
                  location.replace(shellUrl.href);
                  return _context.abrupt("return", true);
                case 20:
                case "end":
                  return _context.stop();
              }
            }, _callee, null, [[5, 13]]);
          }));
          function wrapInShell(_x) {
            return _wrapInShell.apply(this, arguments);
          }
          return wrapInShell;
        }()
        /**
         * 這份構建帶的遠端遊戲代號
         *
         * @returns 構建只含一個遠端遊戲時回傳它 沒有或多個回傳空字串。
         */;

        _proto.buildGameId = function buildGameId() {
          var _settings$querySettin;
          var remote = (_settings$querySettin = settings.querySettings(SettingsCategory.ASSETS, 'remoteBundles')) != null ? _settings$querySettin : [];
          var games = Array.from(new Set(remote.filter(function (name) {
            return /^\d+$/.test(name);
          })));
          return games.length === 1 ? games[0] : '';
        };
        _proto.start = /*#__PURE__*/function () {
          var _start = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
            var _globalThis$location$, _globalThis$location, _params$get, _params$get2;
            var raw, params, gameId, sceneName, source, bundle, scene;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  // 原生熱更新完成 game.restart() 重啟後 回到這個獨立測試入口
                  // 沒有還原下載到的 searchPaths 就會抓不到剛更新的內容 又跑回內建舊版
                  if (sys.isNative) {
                    raw = sys.localStorage.getItem('native_bundle_update_search_paths');
                    if (raw) {
                      try {
                        native.fileUtils.setSearchPaths(JSON.parse(raw));
                      } catch (err) {
                        console.warn('[SlotGameLauncher] 還原原生熱更新搜尋路徑失敗', err);
                      }
                    }
                  }
                  params = new URLSearchParams((_globalThis$location$ = (_globalThis$location = globalThis.location) == null ? void 0 : _globalThis$location.search) != null ? _globalThis$location$ : '');
                  gameId = ((_params$get = params.get('gameId')) == null ? void 0 : _params$get.trim()) || this.buildGameId() || this.defaultGameId;
                  sceneName = ((_params$get2 = params.get('scene')) == null ? void 0 : _params$get2.trim()) || gameId;
                  _context2.next = 6;
                  return this.wrapInShell(gameId);
                case 6:
                  if (!_context2.sent) {
                    _context2.next = 8;
                    break;
                  }
                  return _context2.abrupt("return");
                case 8:
                  globalThis.__APP_GAME_ID__ = gameId;
                  console.info("[SlotGameLauncher] loading gameId=" + gameId + ", scene=" + sceneName);
                  _context2.prev = 10;
                  source = sys.isNative ? gameId : "./remote/" + gameId;
                  _context2.next = 14;
                  return new Promise(function (resolve, reject) {
                    assetManager.loadBundle(source, function (err, loaded) {
                      if (err) reject(err);else resolve(loaded);
                    });
                  });
                case 14:
                  bundle = _context2.sent;
                  _context2.next = 17;
                  return new Promise(function (resolve, reject) {
                    bundle.loadScene(sceneName, function (err, loaded) {
                      if (err) reject(err);else if (!(loaded != null && loaded.scene)) reject(new Error("scene \"" + sceneName + "\" was not returned"));else resolve(loaded.scene);
                    });
                  });
                case 17:
                  scene = _context2.sent;
                  director.runScene(scene);
                  _context2.next = 24;
                  break;
                case 21:
                  _context2.prev = 21;
                  _context2.t0 = _context2["catch"](10);
                  console.error("[SlotGameLauncher] failed to load " + gameId, _context2.t0);
                case 24:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this, [[10, 21]]);
          }));
          function start() {
            return _start.apply(this, arguments);
          }
          return start;
        }();
        return SlotGameLauncher;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "defaultGameId", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '1001';
        }
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./Launcher.ts'], function () {
  return {
    setters: [null],
    execute: function () {}
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});
//# sourceMappingURL=index.js.map