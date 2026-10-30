System.register("bundle://main/_virtual/Launcher.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, settings, SettingsCategory, Component, director, sys, assetManager, native;
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
      director = module.director;
      sys = module.sys;
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

System.register("bundle://main/_virtual/main", ['./Launcher.ts'], function () {
  return {
    setters: [null],
    execute: function () {}
  };
});

System.register("bundle://main/_virtual/rollupPluginModLoBabelHelpers.js", [], function (exports) {
  return {
    execute: function () {
      exports({
        applyDecoratedDescriptor: _applyDecoratedDescriptor,
        assertThisInitialized: _assertThisInitialized,
        asyncToGenerator: _asyncToGenerator,
        inheritsLoose: _inheritsLoose,
        initializerDefineProperty: _initializerDefineProperty,
        regeneratorRuntime: _regeneratorRuntime,
        setPrototypeOf: _setPrototypeOf
      });
      function _regeneratorRuntime() {
        /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
        _regeneratorRuntime = exports('regeneratorRuntime', function () {
          return e;
        });
        var t,
          e = {},
          r = Object.prototype,
          n = r.hasOwnProperty,
          o = Object.defineProperty || function (t, e, r) {
            t[e] = r.value;
          },
          i = "function" == typeof Symbol ? Symbol : {},
          a = i.iterator || "@@iterator",
          c = i.asyncIterator || "@@asyncIterator",
          u = i.toStringTag || "@@toStringTag";
        function define(t, e, r) {
          return Object.defineProperty(t, e, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0
          }), t[e];
        }
        try {
          define({}, "");
        } catch (t) {
          define = function (t, e, r) {
            return t[e] = r;
          };
        }
        function wrap(t, e, r, n) {
          var i = e && e.prototype instanceof Generator ? e : Generator,
            a = Object.create(i.prototype),
            c = new Context(n || []);
          return o(a, "_invoke", {
            value: makeInvokeMethod(t, r, c)
          }), a;
        }
        function tryCatch(t, e, r) {
          try {
            return {
              type: "normal",
              arg: t.call(e, r)
            };
          } catch (t) {
            return {
              type: "throw",
              arg: t
            };
          }
        }
        e.wrap = wrap;
        var h = "suspendedStart",
          l = "suspendedYield",
          f = "executing",
          s = "completed",
          y = {};
        function Generator() {}
        function GeneratorFunction() {}
        function GeneratorFunctionPrototype() {}
        var p = {};
        define(p, a, function () {
          return this;
        });
        var d = Object.getPrototypeOf,
          v = d && d(d(values([])));
        v && v !== r && n.call(v, a) && (p = v);
        var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
        function defineIteratorMethods(t) {
          ["next", "throw", "return"].forEach(function (e) {
            define(t, e, function (t) {
              return this._invoke(e, t);
            });
          });
        }
        function AsyncIterator(t, e) {
          function invoke(r, o, i, a) {
            var c = tryCatch(t[r], t, o);
            if ("throw" !== c.type) {
              var u = c.arg,
                h = u.value;
              return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
                invoke("next", t, i, a);
              }, function (t) {
                invoke("throw", t, i, a);
              }) : e.resolve(h).then(function (t) {
                u.value = t, i(u);
              }, function (t) {
                return invoke("throw", t, i, a);
              });
            }
            a(c.arg);
          }
          var r;
          o(this, "_invoke", {
            value: function (t, n) {
              function callInvokeWithMethodAndArg() {
                return new e(function (e, r) {
                  invoke(t, n, e, r);
                });
              }
              return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
            }
          });
        }
        function makeInvokeMethod(e, r, n) {
          var o = h;
          return function (i, a) {
            if (o === f) throw new Error("Generator is already running");
            if (o === s) {
              if ("throw" === i) throw a;
              return {
                value: t,
                done: !0
              };
            }
            for (n.method = i, n.arg = a;;) {
              var c = n.delegate;
              if (c) {
                var u = maybeInvokeDelegate(c, n);
                if (u) {
                  if (u === y) continue;
                  return u;
                }
              }
              if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
                if (o === h) throw o = s, n.arg;
                n.dispatchException(n.arg);
              } else "return" === n.method && n.abrupt("return", n.arg);
              o = f;
              var p = tryCatch(e, r, n);
              if ("normal" === p.type) {
                if (o = n.done ? s : l, p.arg === y) continue;
                return {
                  value: p.arg,
                  done: n.done
                };
              }
              "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
            }
          };
        }
        function maybeInvokeDelegate(e, r) {
          var n = r.method,
            o = e.iterator[n];
          if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
          var i = tryCatch(o, e.iterator, r.arg);
          if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
          var a = i.arg;
          return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
        }
        function pushTryEntry(t) {
          var e = {
            tryLoc: t[0]
          };
          1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
        }
        function resetTryEntry(t) {
          var e = t.completion || {};
          e.type = "normal", delete e.arg, t.completion = e;
        }
        function Context(t) {
          this.tryEntries = [{
            tryLoc: "root"
          }], t.forEach(pushTryEntry, this), this.reset(!0);
        }
        function values(e) {
          if (e || "" === e) {
            var r = e[a];
            if (r) return r.call(e);
            if ("function" == typeof e.next) return e;
            if (!isNaN(e.length)) {
              var o = -1,
                i = function next() {
                  for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
                  return next.value = t, next.done = !0, next;
                };
              return i.next = i;
            }
          }
          throw new TypeError(typeof e + " is not iterable");
        }
        return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
          value: GeneratorFunctionPrototype,
          configurable: !0
        }), o(GeneratorFunctionPrototype, "constructor", {
          value: GeneratorFunction,
          configurable: !0
        }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
          var e = "function" == typeof t && t.constructor;
          return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
        }, e.mark = function (t) {
          return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
        }, e.awrap = function (t) {
          return {
            __await: t
          };
        }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
          return this;
        }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
          void 0 === i && (i = Promise);
          var a = new AsyncIterator(wrap(t, r, n, o), i);
          return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
            return t.done ? t.value : a.next();
          });
        }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
          return this;
        }), define(g, "toString", function () {
          return "[object Generator]";
        }), e.keys = function (t) {
          var e = Object(t),
            r = [];
          for (var n in e) r.push(n);
          return r.reverse(), function next() {
            for (; r.length;) {
              var t = r.pop();
              if (t in e) return next.value = t, next.done = !1, next;
            }
            return next.done = !0, next;
          };
        }, e.values = values, Context.prototype = {
          constructor: Context,
          reset: function (e) {
            if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
          },
          stop: function () {
            this.done = !0;
            var t = this.tryEntries[0].completion;
            if ("throw" === t.type) throw t.arg;
            return this.rval;
          },
          dispatchException: function (e) {
            if (this.done) throw e;
            var r = this;
            function handle(n, o) {
              return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
            }
            for (var o = this.tryEntries.length - 1; o >= 0; --o) {
              var i = this.tryEntries[o],
                a = i.completion;
              if ("root" === i.tryLoc) return handle("end");
              if (i.tryLoc <= this.prev) {
                var c = n.call(i, "catchLoc"),
                  u = n.call(i, "finallyLoc");
                if (c && u) {
                  if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
                  if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
                } else if (c) {
                  if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
                } else {
                  if (!u) throw new Error("try statement without catch or finally");
                  if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
                }
              }
            }
          },
          abrupt: function (t, e) {
            for (var r = this.tryEntries.length - 1; r >= 0; --r) {
              var o = this.tryEntries[r];
              if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
                var i = o;
                break;
              }
            }
            i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
            var a = i ? i.completion : {};
            return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
          },
          complete: function (t, e) {
            if ("throw" === t.type) throw t.arg;
            return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
          },
          finish: function (t) {
            for (var e = this.tryEntries.length - 1; e >= 0; --e) {
              var r = this.tryEntries[e];
              if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
            }
          },
          catch: function (t) {
            for (var e = this.tryEntries.length - 1; e >= 0; --e) {
              var r = this.tryEntries[e];
              if (r.tryLoc === t) {
                var n = r.completion;
                if ("throw" === n.type) {
                  var o = n.arg;
                  resetTryEntry(r);
                }
                return o;
              }
            }
            throw new Error("illegal catch attempt");
          },
          delegateYield: function (e, r, n) {
            return this.delegate = {
              iterator: values(e),
              resultName: r,
              nextLoc: n
            }, "next" === this.method && (this.arg = t), y;
          }
        }, e;
      }
      function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) {
          resolve(value);
        } else {
          Promise.resolve(value).then(_next, _throw);
        }
      }
      function _asyncToGenerator(fn) {
        return function () {
          var self = this,
            args = arguments;
          return new Promise(function (resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
              asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
              asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
          });
        };
      }
      function _inheritsLoose(subClass, superClass) {
        subClass.prototype = Object.create(superClass.prototype);
        subClass.prototype.constructor = subClass;
        _setPrototypeOf(subClass, superClass);
      }
      function _setPrototypeOf(o, p) {
        _setPrototypeOf = exports('setPrototypeOf', Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
          o.__proto__ = p;
          return o;
        });
        return _setPrototypeOf(o, p);
      }
      function _assertThisInitialized(self) {
        if (self === void 0) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return self;
      }
      function _initializerDefineProperty(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
          enumerable: descriptor.enumerable,
          configurable: descriptor.configurable,
          writable: descriptor.writable,
          value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
      }
      function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object.keys(descriptor).forEach(function (key) {
          desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;
        if ('value' in desc || desc.initializer) {
          desc.writable = true;
        }
        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
          return decorator(target, property, desc) || desc;
        }, desc);
        if (context && desc.initializer !== void 0) {
          desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
          desc.initializer = undefined;
        }
        if (desc.initializer === void 0) {
          Object.defineProperty(target, property, desc);
          desc = null;
        }
        return desc;
      }
    }
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/main', 'bundle://main/_virtual/main'); 
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