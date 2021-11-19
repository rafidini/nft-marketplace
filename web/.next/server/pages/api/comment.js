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
exports.id = "pages/api/comment";
exports.ids = ["pages/api/comment"];
exports.modules = {

/***/ "./pages/api/comment.js":
/*!******************************!*\
  !*** ./pages/api/comment.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ CommentInsertAPI)\n/* harmony export */ });\nasync function CommentInsertAPI(req, res) {\n  const url = \"http://api:8000/comments/add\";\n  const comment = JSON.parse(req[\"body\"]);\n  comment[\"mood\"] = parseInt(comment[\"mood\"]);\n  const api_res = await fetch(url, {\n    method: \"POST\",\n    headers: {\n      'accept': 'application/json',\n      'Content-Type': 'application/json'\n    },\n    body: JSON.stringify(comment)\n  }).then(response => response.json()).then(res => res);\n  res.status(200).json(api_res);\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9hcGkvY29tbWVudC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQWUsZUFBZUEsZ0JBQWYsQ0FBZ0NDLEdBQWhDLEVBQXFDQyxHQUFyQyxFQUEwQztBQUNyRCxRQUFNQyxHQUFHLEdBQUcsOEJBQVo7QUFDQSxRQUFNQyxPQUFPLEdBQUdDLElBQUksQ0FBQ0MsS0FBTCxDQUFXTCxHQUFHLENBQUMsTUFBRCxDQUFkLENBQWhCO0FBQ0FHLEVBQUFBLE9BQU8sQ0FBQyxNQUFELENBQVAsR0FBa0JHLFFBQVEsQ0FBQ0gsT0FBTyxDQUFDLE1BQUQsQ0FBUixDQUExQjtBQUVBLFFBQU1JLE9BQU8sR0FBRyxNQUFNQyxLQUFLLENBQUNOLEdBQUQsRUFBTTtBQUM3Qk8sSUFBQUEsTUFBTSxFQUFFLE1BRHFCO0FBRTdCQyxJQUFBQSxPQUFPLEVBQUU7QUFDTCxnQkFBVSxrQkFETDtBQUVMLHNCQUFnQjtBQUZYLEtBRm9CO0FBTTdCQyxJQUFBQSxJQUFJLEVBQUVQLElBQUksQ0FBQ1EsU0FBTCxDQUFlVCxPQUFmO0FBTnVCLEdBQU4sQ0FBTCxDQVFqQlUsSUFSaUIsQ0FRWEMsUUFBRCxJQUFjQSxRQUFRLENBQUNDLElBQVQsRUFSRixFQVNqQkYsSUFUaUIsQ0FTWFosR0FBRCxJQUFTQSxHQVRHLENBQXRCO0FBV0FBLEVBQUFBLEdBQUcsQ0FBQ2UsTUFBSixDQUFXLEdBQVgsRUFBZ0JELElBQWhCLENBQXFCUixPQUFyQjtBQUNIIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcGFnZXMvYXBpL2NvbW1lbnQuanM/NzQ5ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBDb21tZW50SW5zZXJ0QVBJKHJlcSwgcmVzKSB7XG4gICAgY29uc3QgdXJsID0gXCJodHRwOi8vYXBpOjgwMDAvY29tbWVudHMvYWRkXCJcbiAgICBjb25zdCBjb21tZW50ID0gSlNPTi5wYXJzZShyZXFbXCJib2R5XCJdKVxuICAgIGNvbW1lbnRbXCJtb29kXCJdID0gcGFyc2VJbnQoY29tbWVudFtcIm1vb2RcIl0pXG5cbiAgICBjb25zdCBhcGlfcmVzID0gYXdhaXQgZmV0Y2godXJsLCB7XG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICdhY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGNvbW1lbnQpXG4gICAgfSlcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgIC50aGVuKChyZXMpID0+IHJlcylcblxuICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKGFwaV9yZXMpXG59Il0sIm5hbWVzIjpbIkNvbW1lbnRJbnNlcnRBUEkiLCJyZXEiLCJyZXMiLCJ1cmwiLCJjb21tZW50IiwiSlNPTiIsInBhcnNlIiwicGFyc2VJbnQiLCJhcGlfcmVzIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwiYm9keSIsInN0cmluZ2lmeSIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJzdGF0dXMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/api/comment.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/api/comment.js"));
module.exports = __webpack_exports__;

})();