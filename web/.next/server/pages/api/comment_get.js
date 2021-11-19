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
exports.id = "pages/api/comment_get";
exports.ids = ["pages/api/comment_get"];
exports.modules = {

/***/ "./pages/api/comment_get.js":
/*!**********************************!*\
  !*** ./pages/api/comment_get.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ CommentGetAPI)\n/* harmony export */ });\nasync function CommentGetAPI(req, res) {\n  const url = \"http://api:8000/comments/get\";\n  const api_res = await fetch(url, {\n    method: \"GET\",\n    headers: {\n      'accept': 'application/json',\n      'Content-Type': 'application/json'\n    }\n  }).then(response => response.json()).then(res => res);\n  res.status(200).json(api_res);\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9hcGkvY29tbWVudF9nZXQuanMuanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFlLGVBQWVBLGFBQWYsQ0FBNkJDLEdBQTdCLEVBQWtDQyxHQUFsQyxFQUF1QztBQUNsRCxRQUFNQyxHQUFHLEdBQUcsOEJBQVo7QUFFQSxRQUFNQyxPQUFPLEdBQUcsTUFBTUMsS0FBSyxDQUFDRixHQUFELEVBQU07QUFDN0JHLElBQUFBLE1BQU0sRUFBRSxLQURxQjtBQUU3QkMsSUFBQUEsT0FBTyxFQUFFO0FBQ0wsZ0JBQVUsa0JBREw7QUFFTCxzQkFBZ0I7QUFGWDtBQUZvQixHQUFOLENBQUwsQ0FPakJDLElBUGlCLENBT1hDLFFBQUQsSUFBY0EsUUFBUSxDQUFDQyxJQUFULEVBUEYsRUFRakJGLElBUmlCLENBUVhOLEdBQUQsSUFBU0EsR0FSRyxDQUF0QjtBQVVBQSxFQUFBQSxHQUFHLENBQUNTLE1BQUosQ0FBVyxHQUFYLEVBQWdCRCxJQUFoQixDQUFxQk4sT0FBckI7QUFDSCIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3BhZ2VzL2FwaS9jb21tZW50X2dldC5qcz80MWQ5Il0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIENvbW1lbnRHZXRBUEkocmVxLCByZXMpIHtcbiAgICBjb25zdCB1cmwgPSBcImh0dHA6Ly9hcGk6ODAwMC9jb21tZW50cy9nZXRcIlxuXG4gICAgY29uc3QgYXBpX3JlcyA9IGF3YWl0IGZldGNoKHVybCwge1xuICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICdhY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgfSlcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgIC50aGVuKChyZXMpID0+IHJlcylcblxuICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKGFwaV9yZXMpXG59Il0sIm5hbWVzIjpbIkNvbW1lbnRHZXRBUEkiLCJyZXEiLCJyZXMiLCJ1cmwiLCJhcGlfcmVzIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsInN0YXR1cyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/api/comment_get.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/api/comment_get.js"));
module.exports = __webpack_exports__;

})();