System.register([], function(_export, _context) { return { execute: function () {
System.register("chunks:///_virtual/HistoryAdapter3.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './HistoryAdapter.ts', './AppAssetBundle.ts', './GameConfigManager.ts', './StoreMap.ts', './SlotGameDefinition3.ts'], function (exports) {
  var _inheritsLoose, _asyncToGenerator, _regeneratorRuntime, Button, instantiate, UITransform, BitmapFont, Node, Label, HistoryAdapter$1, AppAssetBundle, GameConfigManager, GAMEVIEWMAP, SLOT_GAME_DEFINITION;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      Button = module.Button;
      instantiate = module.instantiate;
      UITransform = module.UITransform;
      BitmapFont = module.BitmapFont;
      Node = module.Node;
      Label = module.Label;
    }, function (module) {
      HistoryAdapter$1 = module.HistoryAdapter;
    }, function (module) {
      AppAssetBundle = module.default;
    }, function (module) {
      GameConfigManager = module.default;
    }, function (module) {
      GAMEVIEWMAP = module.GAMEVIEWMAP;
    }, function (module) {
      SLOT_GAME_DEFINITION = module.SLOT_GAME_DEFINITION;
    }],
    execute: function () {
      var HistoryAdapter = exports('default', /*#__PURE__*/function (_HistoryAdapterBase) {
        _inheritsLoose(HistoryAdapter, _HistoryAdapterBase);
        function HistoryAdapter() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _HistoryAdapterBase.call.apply(_HistoryAdapterBase, [this].concat(args)) || this;
          _this.symbolsFolder = 'Images/symbols';
          _this.symbolCatalog = SLOT_GAME_DEFINITION.symbols;
          _this.multiplierFont = null;
          _this.historyRoundUnits = [];
          _this.historyRoundIndex = 0;
          return _this;
        }
        var _proto = HistoryAdapter.prototype;
        _proto.resolveMulti = function resolveMulti(symbolId) {
          var info = this.symbolCatalog.resolve(symbolId);
          return info.kind === 'multiplier' ? info.value + "x" : undefined; // 6x
        };

        _proto.getRoundDetail = /*#__PURE__*/function () {
          var _getRoundDetail = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(data, isPortrait) {
            var _this2 = this;
            var prefab, root, portraitWidth, setWidth, rounds, units;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  if (isPortrait === void 0) {
                    isPortrait = false;
                  }
                  _context.next = 3;
                  return AppAssetBundle.getInstance(GameConfigManager.GAMEID).loadPrefab(GAMEVIEWMAP.HISTORYROUNDDETAIL.path);
                case 3:
                  prefab = _context.sent;
                  root = instantiate(prefab);
                  portraitWidth = 700;
                  setWidth = function setWidth(unit) {
                    if (!isPortrait) return;
                    var ut = unit.getComponent(UITransform);
                    if (ut) ut.width = portraitWidth;
                  };
                  rounds = this.getMainHistoryRounds(data);
                  _context.next = 10;
                  return Promise.all(rounds.map(function (round) {
                    return _this2.createNormalUnit(round.grid);
                  }));
                case 10:
                  units = _context.sent;
                  units.forEach(function (unit, index) {
                    setWidth(unit);
                    _this2.setUnitWin(unit, data.summary.currency, rounds[index].win);
                    _this2.bindHistoryRoundButtons(unit);
                    _this2.updateHistoryRoundButtons(unit, index, units.length);
                    unit.active = index === 0;
                    root.addChild(unit);
                  });
                  this.historyRoundUnits = units;
                  this.historyRoundIndex = 0;
                  return _context.abrupt("return", root);
                case 15:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function getRoundDetail(_x, _x2) {
            return _getRoundDetail.apply(this, arguments);
          }
          return getRoundDetail;
        }() /** NG遊戲盤面 */;
        _proto.getMainHistoryRounds = function getMainHistoryRounds(data) {
          return data.mainSteps;
        }

        /** FG遊戲盤面 確定後再接入 */;
        _proto.getFreeHistoryRounds = function getFreeHistoryRounds(data) {
          return data.freeRounds;
        }

        /** 上一盤 */;
        _proto.showPreviousHistoryRound = function showPreviousHistoryRound() {
          this.showHistoryRound(this.historyRoundIndex - 1);
        }

        /** 下一盤 */;
        _proto.showNextHistoryRound = function showNextHistoryRound() {
          this.showHistoryRound(this.historyRoundIndex + 1);
        };
        _proto.bindHistoryRoundButtons = function bindHistoryRoundButtons(unit) {
          var table = unit.getChildByName('Table');
          var previousButton = table == null ? void 0 : table.getChildByName('PreviousButton');
          var nextButton = table == null ? void 0 : table.getChildByName('NextButton');
          previousButton == null || previousButton.on(Button.EventType.CLICK, this.showPreviousHistoryRound, this);
          nextButton == null || nextButton.on(Button.EventType.CLICK, this.showNextHistoryRound, this);
        };
        _proto.showHistoryRound = function showHistoryRound(index) {
          var _this3 = this;
          var total = this.historyRoundUnits.length;
          if (total === 0) return;
          this.historyRoundIndex = Math.min(Math.max(index, 0), total - 1);
          this.historyRoundUnits.forEach(function (unit, unitIndex) {
            unit.active = unitIndex === _this3.historyRoundIndex;
            _this3.updateHistoryRoundButtons(unit, unitIndex, total);
          });
        };
        _proto.updateHistoryRoundButtons = function updateHistoryRoundButtons(unit, index, total) {
          var table = unit.getChildByName('Table');
          var previousButton = table == null ? void 0 : table.getChildByName('PreviousButton');
          var nextButton = table == null ? void 0 : table.getChildByName('NextButton');
          if (previousButton) previousButton.active = index > 0;
          if (nextButton) nextButton.active = index < total - 1;
        };
        _proto.getMultiplierFont = /*#__PURE__*/function () {
          var _getMultiplierFont = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
            var _this4 = this;
            var bundle;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  if (!this.multiplierFont) {
                    _context2.next = 2;
                    break;
                  }
                  return _context2.abrupt("return", this.multiplierFont);
                case 2:
                  _context2.next = 4;
                  return AppAssetBundle.getInstance(GameConfigManager.GAMEID).getBundle();
                case 4:
                  bundle = _context2.sent;
                  return _context2.abrupt("return", new Promise(function (resolve) {
                    bundle.load(HistoryAdapter.MULTIPLIER_FONT_PATH, BitmapFont, function (err, asset) {
                      if (err) {
                        console.warn("[HistoryAdapter] load font failed: " + HistoryAdapter.MULTIPLIER_FONT_PATH, err);
                        resolve(null);
                        return;
                      }
                      _this4.multiplierFont = asset;
                      resolve(_this4.multiplierFont);
                    });
                  }));
                case 6:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this);
          }));
          function getMultiplierFont() {
            return _getMultiplierFont.apply(this, arguments);
          }
          return getMultiplierFont;
        }() /** 沒有prefab 容器會直接清空 label直接疊上去 */;
        _proto.renderMultiplierLabel = /*#__PURE__*/
        function () {
          var _renderMultiplierLabel = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(posNode, multi) {
            var font, labelNode, label;
            return _regeneratorRuntime().wrap(function _callee3$(_context3) {
              while (1) switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return this.getMultiplierFont();
                case 2:
                  font = _context3.sent;
                  labelNode = new Node('MultiplierLabel');
                  labelNode.addComponent(UITransform);
                  label = labelNode.addComponent(Label);
                  label.string = multi;
                  label.fontSize = HistoryAdapter.MULTIPLIER_LABEL_FONT_SIZE;
                  label.horizontalAlign = Label.HorizontalAlign.CENTER;
                  label.verticalAlign = Label.VerticalAlign.CENTER;
                  if (font) {
                    label.useSystemFont = false;
                    label.font = font;
                  }
                  posNode.addChild(labelNode);
                case 12:
                case "end":
                  return _context3.stop();
              }
            }, _callee3, this);
          }));
          function renderMultiplierLabel(_x3, _x4) {
            return _renderMultiplierLabel.apply(this, arguments);
          }
          return renderMultiplierLabel;
        }();
        return HistoryAdapter;
      }(HistoryAdapter$1));
      HistoryAdapter.MULTIPLIER_FONT_PATH = 'font/MU/num_mu';
      HistoryAdapter.MULTIPLIER_LABEL_FONT_SIZE = 36;
    }
  };
});

System.register("chunks:///_virtual/rollupPluginModLoBabelHelpers.js", [], function (exports) {
  return {
    execute: function () {
      exports({
        applyDecoratedDescriptor: _applyDecoratedDescriptor,
        arrayLikeToArray: _arrayLikeToArray,
        assertThisInitialized: _assertThisInitialized,
        asyncToGenerator: _asyncToGenerator,
        construct: _construct,
        createClass: _createClass,
        createForOfIteratorHelperLoose: _createForOfIteratorHelperLoose,
        extends: _extends,
        getPrototypeOf: _getPrototypeOf,
        inheritsLoose: _inheritsLoose,
        initializerDefineProperty: _initializerDefineProperty,
        isNativeFunction: _isNativeFunction,
        isNativeReflectConstruct: _isNativeReflectConstruct,
        regeneratorRuntime: _regeneratorRuntime,
        setPrototypeOf: _setPrototypeOf,
        toPrimitive: _toPrimitive,
        toPropertyKey: _toPropertyKey,
        unsupportedIterableToArray: _unsupportedIterableToArray,
        wrapNativeSuper: _wrapNativeSuper
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
      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        Object.defineProperty(Constructor, "prototype", {
          writable: false
        });
        return Constructor;
      }
      function _extends() {
        _extends = exports('extends', Object.assign ? Object.assign.bind() : function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }
          return target;
        });
        return _extends.apply(this, arguments);
      }
      function _inheritsLoose(subClass, superClass) {
        subClass.prototype = Object.create(superClass.prototype);
        subClass.prototype.constructor = subClass;
        _setPrototypeOf(subClass, superClass);
      }
      function _getPrototypeOf(o) {
        _getPrototypeOf = exports('getPrototypeOf', Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
          return o.__proto__ || Object.getPrototypeOf(o);
        });
        return _getPrototypeOf(o);
      }
      function _setPrototypeOf(o, p) {
        _setPrototypeOf = exports('setPrototypeOf', Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
          o.__proto__ = p;
          return o;
        });
        return _setPrototypeOf(o, p);
      }
      function _isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct) return false;
        if (Reflect.construct.sham) return false;
        if (typeof Proxy === "function") return true;
        try {
          Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
          return true;
        } catch (e) {
          return false;
        }
      }
      function _construct(Parent, args, Class) {
        if (_isNativeReflectConstruct()) {
          _construct = exports('construct', Reflect.construct.bind());
        } else {
          _construct = exports('construct', function _construct(Parent, args, Class) {
            var a = [null];
            a.push.apply(a, args);
            var Constructor = Function.bind.apply(Parent, a);
            var instance = new Constructor();
            if (Class) _setPrototypeOf(instance, Class.prototype);
            return instance;
          });
        }
        return _construct.apply(null, arguments);
      }
      function _isNativeFunction(fn) {
        return Function.toString.call(fn).indexOf("[native code]") !== -1;
      }
      function _wrapNativeSuper(Class) {
        var _cache = typeof Map === "function" ? new Map() : undefined;
        _wrapNativeSuper = exports('wrapNativeSuper', function _wrapNativeSuper(Class) {
          if (Class === null || !_isNativeFunction(Class)) return Class;
          if (typeof Class !== "function") {
            throw new TypeError("Super expression must either be null or a function");
          }
          if (typeof _cache !== "undefined") {
            if (_cache.has(Class)) return _cache.get(Class);
            _cache.set(Class, Wrapper);
          }
          function Wrapper() {
            return _construct(Class, arguments, _getPrototypeOf(this).constructor);
          }
          Wrapper.prototype = Object.create(Class.prototype, {
            constructor: {
              value: Wrapper,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
          return _setPrototypeOf(Wrapper, Class);
        });
        return _wrapNativeSuper(Class);
      }
      function _assertThisInitialized(self) {
        if (self === void 0) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return self;
      }
      function _unsupportedIterableToArray(o, minLen) {
        if (!o) return;
        if (typeof o === "string") return _arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor) n = o.constructor.name;
        if (n === "Map" || n === "Set") return Array.from(o);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
      }
      function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length) len = arr.length;
        for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
        return arr2;
      }
      function _createForOfIteratorHelperLoose(o, allowArrayLike) {
        var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
        if (it) return (it = it.call(o)).next.bind(it);
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
          if (it) o = it;
          var i = 0;
          return function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      function _toPrimitive(input, hint) {
        if (typeof input !== "object" || input === null) return input;
        var prim = input[Symbol.toPrimitive];
        if (prim !== undefined) {
          var res = prim.call(input, hint || "default");
          if (typeof res !== "object") return res;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return (hint === "string" ? String : Number)(input);
      }
      function _toPropertyKey(arg) {
        var key = _toPrimitive(arg, "string");
        return typeof key === "symbol" ? key : String(key);
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

System.register("chunks:///_virtual/SlotGameDefinition3.ts", ['./SlotGameDefinition.ts'], function (exports) {
  var createSlotSymbolCatalog;
  return {
    setters: [function (module) {
      createSlotSymbolCatalog = module.createSlotSymbolCatalog;
    }],
    execute: function () {
      var MULTIPLIER_VALUES = [2, 3, 4, 6, 8, 10, 12, 15, 18, 25, 50, 55, 60, 65, 80, 100, 150, 200, 250, 500];
      var NORMAL_SYMBOLS = [{
        id: 1,
        kind: 'normal',
        name: 'sym1',
        frame: 'symbol_h1'
      }, {
        id: 2,
        kind: 'normal',
        name: 'sym2',
        frame: 'symbol_h2'
      }, {
        id: 3,
        kind: 'normal',
        name: 'sym3',
        frame: 'symbol_h3'
      }, {
        id: 4,
        kind: 'normal',
        name: 'sym4',
        frame: 'symbol_h4'
      }, {
        id: 5,
        kind: 'normal',
        name: 'sym5',
        frame: 'symbol_l1'
      }, {
        id: 6,
        kind: 'normal',
        name: 'sym6',
        frame: 'symbol_l2'
      }, {
        id: 7,
        kind: 'normal',
        name: 'sym7',
        frame: 'symbol_l3'
      }, {
        id: 8,
        kind: 'normal',
        name: 'sym8',
        frame: 'symbol_l4'
      }, {
        id: 9,
        kind: 'normal',
        name: 'sym9',
        frame: 'symbol_l5'
      }];
      var SCATTER_SYMBOL = {
        id: 10,
        kind: 'scatter',
        name: 'scatter',
        frame: 'symbol_scatter'
      };
      var JACKPOT_SYMBOL = {
        id: 1000,
        kind: 'jackpot',
        name: 'jackpot',
        frame: 'symbol_jackpot'
      };
      var multiplierSymbols = function multiplierSymbols(startId, upgradeable) {
        return MULTIPLIER_VALUES.map(function (value, index) {
          return {
            id: startId + index,
            kind: 'multiplier',
            name: "mul" + value,
            value: value,
            upgradeable: upgradeable,
            colorTier: 4 - Math.floor(index / 5),
            frame: function frame(_ref) {
              var side = _ref.side,
                symbol = _ref.symbol;
              return "symbol_m" + side + "_" + symbol.colorTier;
            }
          };
        });
      };
      var SLOT_GAME_DEFINITION = exports('SLOT_GAME_DEFINITION', {
        symbols: createSlotSymbolCatalog({
          symbols: [].concat(NORMAL_SYMBOLS, [SCATTER_SYMBOL], multiplierSymbols(11, false), multiplierSymbols(111, true), [JACKPOT_SYMBOL]),
          fallback: {
            kind: 'normal',
            name: 'unknown',
            frame: 'symbol_h1'
          }
        })
      });
    }
  };
});

} }; });
//# sourceMappingURL=bundle.js.map