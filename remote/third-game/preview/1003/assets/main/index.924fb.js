System.register("chunks:///_virtual/Launcher.ts",["./rollupPluginModLoBabelHelpers.js","cc"],(function(e){var r,t,n,a,o,c,i,s,u,l,h,p,f,d,m;return{setters:[function(e){r=e.applyDecoratedDescriptor,t=e.inheritsLoose,n=e.initializerDefineProperty,a=e.assertThisInitialized,o=e.asyncToGenerator,c=e.regeneratorRuntime},function(e){i=e.cclegacy,s=e._decorator,u=e.settings,l=e.SettingsCategory,h=e.Component,p=e.sys,f=e.director,d=e.assetManager,m=e.native}],execute:function(){var v,g,w,b,S;i._RF.push({},"389adTq4V1F7oT07UQlVKbn","Launcher",void 0);var y=s.ccclass,_=s.property;e("SlotGameLauncher",(v=y("SlotGameLauncher"),g=_({tooltip:"沒有指定 ?gameId= 而且構建沒有單一遠端遊戲時（例如編輯器預覽），slot_game 獨立測試預設載入的遊戲"}),v((S=r((b=function(e){function r(){for(var r,t=arguments.length,o=new Array(t),c=0;c<t;c++)o[c]=arguments[c];return r=e.call.apply(e,[this].concat(o))||this,n(r,"defaultGameId",S,a(r)),r}t(r,e);var i=r.prototype;return i.wrapInShell=function(){var e=o(c().mark((function e(r){var t;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!p.isNative&&"undefined"!=typeof window&&window.parent===window){e.next=2;break}return e.abrupt("return",!1);case 2:if("0"!==new URLSearchParams(location.search).get("shell")){e.next=4;break}return e.abrupt("return",!1);case 4:return t=new URL("../../shell.html",location.href),e.prev=5,e.next=8,fetch(t.href,{method:"HEAD"});case 8:if(e.sent.ok){e.next=11;break}return e.abrupt("return",!1);case 11:e.next=16;break;case 13:return e.prev=13,e.t0=e.catch(5),e.abrupt("return",!1);case 16:return t.searchParams.set("url",location.href),t.searchParams.set("gameId",r),location.replace(t.href),e.abrupt("return",!0);case 20:case"end":return e.stop()}}),e,null,[[5,13]])})));return function(r){return e.apply(this,arguments)}}(),i.buildGameId=function(){var e,r=null!=(e=u.querySettings(l.ASSETS,"remoteBundles"))?e:[],t=Array.from(new Set(r.filter((function(e){return/^\d+$/.test(e)}))));return 1===t.length?t[0]:""},i.start=function(){var e=o(c().mark((function e(){var r,t,n,a,o,i,s,u,l,h,v;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(p.isNative&&(o=p.localStorage.getItem("native_bundle_update_search_paths")))try{m.fileUtils.setSearchPaths(JSON.parse(o))}catch(e){console.warn("[SlotGameLauncher] 還原原生熱更新搜尋路徑失敗",e)}return i=new URLSearchParams(null!=(r=null==(t=globalThis.location)?void 0:t.search)?r:""),s=(null==(n=i.get("gameId"))?void 0:n.trim())||this.buildGameId()||this.defaultGameId,u=(null==(a=i.get("scene"))?void 0:a.trim())||s,e.next=6,this.wrapInShell(s);case 6:if(!e.sent){e.next=8;break}return e.abrupt("return");case 8:return globalThis.__APP_GAME_ID__=s,console.info("[SlotGameLauncher] loading gameId="+s+", scene="+u),e.prev=10,l=p.isNative?s:"./remote/"+s,e.next=14,new Promise((function(e,r){d.loadBundle(l,(function(t,n){t?r(t):e(n)}))}));case 14:return h=e.sent,e.next=17,new Promise((function(e,r){h.loadScene(u,(function(t,n){t?r(t):null!=n&&n.scene?e(n.scene):r(new Error('scene "'+u+'" was not returned'))}))}));case 17:v=e.sent,f.runScene(v),e.next=24;break;case 21:e.prev=21,e.t0=e.catch(10),console.error("[SlotGameLauncher] failed to load "+s,e.t0);case 24:case"end":return e.stop()}}),e,this,[[10,21]])})));return function(){return e.apply(this,arguments)}}(),r}(h)).prototype,"defaultGameId",[g],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return"1001"}}),w=b))||w));i._RF.pop()}}}));

System.register("chunks:///_virtual/main",["./Launcher.ts"],(function(){return{setters:[null],execute:function(){}}}));

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