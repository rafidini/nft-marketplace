"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/crypto";
exports.ids = ["pages/api/crypto"];
exports.modules = {

/***/ "./pages/api/crypto.js":
/*!*****************************!*\
  !*** ./pages/api/crypto.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ CryptoAPI)\n/* harmony export */ });\nasync function CryptoAPI(req, res) {\n  const url = \"http://api:8000/crypto?ticker=\" + req['query']['ticker'];\n  const api_res = await fetch(url).then(response => response.json()).catch(() => 'Not found');\n  res.status(200).json(api_res);\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9hcGkvY3J5cHRvLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBZSxlQUFlQSxTQUFmLENBQXlCQyxHQUF6QixFQUE4QkMsR0FBOUIsRUFBbUM7QUFDOUMsUUFBTUMsR0FBRyxHQUFHLG1DQUFtQ0YsR0FBRyxDQUFDLE9BQUQsQ0FBSCxDQUFhLFFBQWIsQ0FBL0M7QUFFQSxRQUFNRyxPQUFPLEdBQUcsTUFBTUMsS0FBSyxDQUFDRixHQUFELENBQUwsQ0FDakJHLElBRGlCLENBQ1hDLFFBQUQsSUFBY0EsUUFBUSxDQUFDQyxJQUFULEVBREYsRUFFakJDLEtBRmlCLENBRVgsTUFBTSxXQUZLLENBQXRCO0FBSUFQLEVBQUFBLEdBQUcsQ0FBQ1EsTUFBSixDQUFXLEdBQVgsRUFBZ0JGLElBQWhCLENBQXFCSixPQUFyQjtBQUNIIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcGFnZXMvYXBpL2NyeXB0by5qcz9iN2UwIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIENyeXB0b0FQSShyZXEsIHJlcykgeyAgICBcbiAgICBjb25zdCB1cmwgPSBcImh0dHA6Ly9hcGk6ODAwMC9jcnlwdG8/dGlja2VyPVwiICsgcmVxWydxdWVyeSddWyd0aWNrZXInXVxuICAgIFxuICAgIGNvbnN0IGFwaV9yZXMgPSBhd2FpdCBmZXRjaCh1cmwpXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAuY2F0Y2goKCkgPT4gJ05vdCBmb3VuZCcpXG5cbiAgICByZXMuc3RhdHVzKDIwMCkuanNvbihhcGlfcmVzKVxufSJdLCJuYW1lcyI6WyJDcnlwdG9BUEkiLCJyZXEiLCJyZXMiLCJ1cmwiLCJhcGlfcmVzIiwiZmV0Y2giLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwiY2F0Y2giLCJzdGF0dXMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/api/crypto.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/api/crypto.js"));
module.exports = __webpack_exports__;

})();