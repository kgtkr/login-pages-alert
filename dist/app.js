/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __values = (this && this.__values) || function (o) {\n    var m = typeof Symbol === \"function\" && o[Symbol.iterator], i = 0;\n    if (m) return m.call(o);\n    return {\n        next: function () {\n            if (o && i >= o.length) o = void 0;\n            return { value: o && o[i++], done: !o };\n        }\n    };\n};\nvar cur = location.href;\n//null:開いてない、undefined:閉じた、文字列:type\nvar isOpen = null;\nfunction insertHTML(type) {\n    if (isOpen === undefined) {\n        return;\n    }\n    if (isOpen !== type) {\n        close();\n        isOpen = null;\n    }\n    if (isOpen === null) {\n        var el = document.createElement(\"div\");\n        el.className = \"login-pages-alert\";\n        var msg = document.createElement(\"div\");\n        msg.className = \"msg\";\n        msg.innerText = \"\\u3053\\u306E\\u30DA\\u30FC\\u30B8\\u306F\\u6700\\u5F8C\\u307E\\u3067\\u8AAD\\u3080\\u306E\\u306B\" + type + \"\\u4F1A\\u54E1\\u767B\\u9332\\u304C\\u5FC5\\u8981\\u3067\\u3059\\u3002\";\n        el.appendChild(msg);\n        var by = document.createElement(\"div\");\n        by.className = \"by\";\n        by.innerText = \"by Login Pages Alert\";\n        el.appendChild(by);\n        var button = document.createElement(\"a\");\n        button.className = \"close\";\n        button.innerText = \"[閉じる]\";\n        button.onclick = close;\n        el.appendChild(button);\n        document.body.insertAdjacentElement(\"afterbegin\", el);\n        isOpen = type;\n    }\n}\nfunction close() {\n    var e_1, _a;\n    if (typeof isOpen === \"string\") {\n        try {\n            for (var _b = __values(Array.from(document.getElementsByClassName(\"login-pages-alert\"))), _c = _b.next(); !_c.done; _c = _b.next()) {\n                var el = _c.value;\n                document.body.removeChild(el);\n            }\n        }\n        catch (e_1_1) { e_1 = { error: e_1_1 }; }\n        finally {\n            try {\n                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);\n            }\n            finally { if (e_1) throw e_1.error; }\n        }\n        isOpen = undefined;\n    }\n}\nfunction run() {\n    var e_2, _a, e_3, _b;\n    console.log(\"login-pages-alert:run\");\n    if (cur !== location.href) {\n        close();\n        cur = location.href;\n        isOpen = null;\n    }\n    var body = document.body.innerHTML;\n    try {\n        for (var list_1 = __values(list), list_1_1 = list_1.next(); !list_1_1.done; list_1_1 = list_1.next()) {\n            var site = list_1_1.value;\n            if (location.href.includes(site.url)) {\n                try {\n                    for (var _c = __values(site.data), _d = _c.next(); !_d.done; _d = _c.next()) {\n                        var data = _d.value;\n                        if (data.matchs.some(function (x) { return x.every(function (x) { return body.includes(x); }); })) {\n                            insertHTML(data.type);\n                            return;\n                        }\n                    }\n                }\n                catch (e_3_1) { e_3 = { error: e_3_1 }; }\n                finally {\n                    try {\n                        if (_d && !_d.done && (_b = _c.return)) _b.call(_c);\n                    }\n                    finally { if (e_3) throw e_3.error; }\n                }\n            }\n        }\n    }\n    catch (e_2_1) { e_2 = { error: e_2_1 }; }\n    finally {\n        try {\n            if (list_1_1 && !list_1_1.done && (_a = list_1.return)) _a.call(list_1);\n        }\n        finally { if (e_2) throw e_2.error; }\n    }\n    close();\n}\nvar list = [\n    {\n        url: \"https://tech.nikkeibp.co.jp\",\n        data: [\n            {\n                type: \"有料\",\n                matchs: [[\"この先は有料会員の登録が必要です。\"]]\n            },\n        ]\n    },\n    {\n        url: \"https://www.nikkei.com\",\n        data: [\n            {\n                type: \"\",\n                matchs: [[\"この記事は会員限定です。\"]]\n            }\n        ]\n    },\n    {\n        url: \"https://note.mu\",\n        data: [\n            {\n                type: \"有料\",\n                matchs: [[\"この続きをみるには\", \"ノートを購入する\"]],\n            }\n        ]\n    },\n    {\n        url: \"https://www.kobe-np.co.jp\",\n        data: [\n            {\n                type: \"有料\",\n                matchs: [[\"readmore-area\"]]\n            }\n        ]\n    },\n    {\n        url: \"https://mainichi.jp\",\n        data: [\n            {\n                type: \"有料\",\n                matchs: [[\"この記事は有料記事です。\"]]\n            }\n        ]\n    },\n    {\n        url: \"https://special.sankei.com\",\n        data: [\n            {\n                type: \"有料\",\n                matchs: [[\"こちらは有料会員記事です\"]]\n            }\n        ]\n    },\n    {\n        url: \"https://www.asahi.com\",\n        data: [\n            {\n                type: \"\",\n                matchs: [[\"無料登録して全文を読む\"]]\n            },\n            {\n                type: \"有料\",\n                matchs: [[\"有料会員になると続きをお読みいただけます。\"]]\n            }\n        ]\n    }\n];\nwindow.addEventListener(\"load\", function () {\n    run();\n}, false);\nnew MutationObserver(function (mutations) {\n    if (mutations.length !== 0) {\n        run();\n    }\n}).observe(document.body, { childList: true });\n\n\n//# sourceURL=webpack:///./src/main.ts?");

/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/main.ts */\"./src/main.ts\");\n\n\n//# sourceURL=webpack:///multi_./src/main.ts?");

/***/ })

/******/ });