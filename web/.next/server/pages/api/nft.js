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
exports.id = "pages/api/nft";
exports.ids = ["pages/api/nft"];
exports.modules = {

/***/ "./pages/api/nft.js":
/*!**************************!*\
  !*** ./pages/api/nft.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ NftAPI)\n/* harmony export */ });\nasync function NftAPI(req, res) {\n  const url = \"http://api:8000/nft?id=\" + req['query']['id'];\n  const api_res = await fetch(url).then(response => response.json()).catch(() => 'Not found');\n  res.status(200).json(api_res);\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9hcGkvbmZ0LmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBZSxlQUFlQSxNQUFmLENBQXNCQyxHQUF0QixFQUEyQkMsR0FBM0IsRUFBZ0M7QUFDM0MsUUFBTUMsR0FBRyxHQUFHLDRCQUE0QkYsR0FBRyxDQUFDLE9BQUQsQ0FBSCxDQUFhLElBQWIsQ0FBeEM7QUFFQSxRQUFNRyxPQUFPLEdBQUcsTUFBTUMsS0FBSyxDQUFDRixHQUFELENBQUwsQ0FDakJHLElBRGlCLENBQ1hDLFFBQUQsSUFBY0EsUUFBUSxDQUFDQyxJQUFULEVBREYsRUFFakJDLEtBRmlCLENBRVgsTUFBTSxXQUZLLENBQXRCO0FBSUFQLEVBQUFBLEdBQUcsQ0FBQ1EsTUFBSixDQUFXLEdBQVgsRUFBZ0JGLElBQWhCLENBQXFCSixPQUFyQjtBQUNIIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcGFnZXMvYXBpL25mdC5qcz84MWFhIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIE5mdEFQSShyZXEsIHJlcykgeyAgICBcbiAgICBjb25zdCB1cmwgPSBcImh0dHA6Ly9hcGk6ODAwMC9uZnQ/aWQ9XCIgKyByZXFbJ3F1ZXJ5J11bJ2lkJ11cbiAgICBcbiAgICBjb25zdCBhcGlfcmVzID0gYXdhaXQgZmV0Y2godXJsKVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgICAgLmNhdGNoKCgpID0+ICdOb3QgZm91bmQnKVxuXG4gICAgcmVzLnN0YXR1cygyMDApLmpzb24oYXBpX3Jlcylcbn0iXSwibmFtZXMiOlsiTmZ0QVBJIiwicmVxIiwicmVzIiwidXJsIiwiYXBpX3JlcyIsImZldGNoIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsImNhdGNoIiwic3RhdHVzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/api/nft.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/api/nft.js"));
module.exports = __webpack_exports__;

})();