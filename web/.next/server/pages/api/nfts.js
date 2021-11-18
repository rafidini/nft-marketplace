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
exports.id = "pages/api/nfts";
exports.ids = ["pages/api/nfts"];
exports.modules = {

/***/ "./pages/api/nfts.js":
/*!***************************!*\
  !*** ./pages/api/nfts.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ NftsAPI)\n/* harmony export */ });\nasync function NftsAPI(req, res) {\n  const query_limit = 'limit=';\n  var limit = '';\n  if ('limit' in req['query']) limit = query_limit + req['query']['limit'];\n  const url = \"http://api:8000/nfts?\" + limit;\n  const api_res = await fetch(url).then(response => response.json()).catch(() => 'Not found');\n  res.status(200).json(api_res);\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9hcGkvbmZ0cy5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQWUsZUFBZUEsT0FBZixDQUF1QkMsR0FBdkIsRUFBNEJDLEdBQTVCLEVBQWlDO0FBQzVDLFFBQU1DLFdBQVcsR0FBRyxRQUFwQjtBQUNBLE1BQUlDLEtBQUssR0FBRyxFQUFaO0FBRUEsTUFBSSxXQUFXSCxHQUFHLENBQUMsT0FBRCxDQUFsQixFQUNJRyxLQUFLLEdBQUdELFdBQVcsR0FBR0YsR0FBRyxDQUFDLE9BQUQsQ0FBSCxDQUFhLE9BQWIsQ0FBdEI7QUFFSixRQUFNSSxHQUFHLEdBQUcsMEJBQTBCRCxLQUF0QztBQUVBLFFBQU1FLE9BQU8sR0FBRyxNQUFNQyxLQUFLLENBQUNGLEdBQUQsQ0FBTCxDQUNqQkcsSUFEaUIsQ0FDWEMsUUFBRCxJQUFjQSxRQUFRLENBQUNDLElBQVQsRUFERixFQUVqQkMsS0FGaUIsQ0FFWCxNQUFNLFdBRkssQ0FBdEI7QUFJQVQsRUFBQUEsR0FBRyxDQUFDVSxNQUFKLENBQVcsR0FBWCxFQUFnQkYsSUFBaEIsQ0FBcUJKLE9BQXJCO0FBQ0giLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9hcGkvbmZ0cy5qcz8xMTU4Il0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIE5mdHNBUEkocmVxLCByZXMpIHtcbiAgICBjb25zdCBxdWVyeV9saW1pdCA9ICdsaW1pdD0nXG4gICAgdmFyIGxpbWl0ID0gJydcblxuICAgIGlmICgnbGltaXQnIGluIHJlcVsncXVlcnknXSlcbiAgICAgICAgbGltaXQgPSBxdWVyeV9saW1pdCArIHJlcVsncXVlcnknXVsnbGltaXQnXVxuICAgIFxuICAgIGNvbnN0IHVybCA9IFwiaHR0cDovL2FwaTo4MDAwL25mdHM/XCIgKyBsaW1pdFxuICAgIFxuICAgIGNvbnN0IGFwaV9yZXMgPSBhd2FpdCBmZXRjaCh1cmwpXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAuY2F0Y2goKCkgPT4gJ05vdCBmb3VuZCcpXG5cbiAgICByZXMuc3RhdHVzKDIwMCkuanNvbihhcGlfcmVzKVxufSJdLCJuYW1lcyI6WyJOZnRzQVBJIiwicmVxIiwicmVzIiwicXVlcnlfbGltaXQiLCJsaW1pdCIsInVybCIsImFwaV9yZXMiLCJmZXRjaCIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJjYXRjaCIsInN0YXR1cyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/api/nfts.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/api/nfts.js"));
module.exports = __webpack_exports__;

})();