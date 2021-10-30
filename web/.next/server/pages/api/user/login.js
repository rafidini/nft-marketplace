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
exports.id = "pages/api/user/login";
exports.ids = ["pages/api/user/login"];
exports.modules = {

/***/ "./pages/api/user/login.js":
/*!*********************************!*\
  !*** ./pages/api/user/login.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ LoginUserAPI)\n/* harmony export */ });\nasync function LoginUserAPI(req, res) {\n  // Prepare POST request\n  const username = req['query']['username'];\n  const password = req['query']['password'];\n  const url = \"http://api:8000/keycloak/user_login?username=\" + username + \"&password=\" + password; // launch POST request\n\n  const api_res = await fetch(url, {\n    method: 'post',\n    headers: {\n      'Content-Type': 'application/json'\n    }\n  }).then(response => response.json()).catch(() => undefined);\n  if (api_res == undefined) res.status(401).json({\n    content: 'Wrong credentials...',\n    status_code: 401\n  });else res.status(201).json({\n    content: api_res,\n    url: url,\n    status_code: 201\n  });\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9hcGkvdXNlci9sb2dpbi5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQWUsZUFBZUEsWUFBZixDQUE0QkMsR0FBNUIsRUFBaUNDLEdBQWpDLEVBQXNDO0FBQ2pEO0FBQ0EsUUFBTUMsUUFBUSxHQUFHRixHQUFHLENBQUMsT0FBRCxDQUFILENBQWEsVUFBYixDQUFqQjtBQUNBLFFBQU1HLFFBQVEsR0FBR0gsR0FBRyxDQUFDLE9BQUQsQ0FBSCxDQUFhLFVBQWIsQ0FBakI7QUFDQSxRQUFNSSxHQUFHLEdBQUcsa0RBQWtERixRQUFsRCxHQUE2RCxZQUE3RCxHQUE0RUMsUUFBeEYsQ0FKaUQsQ0FNakQ7O0FBQ0EsUUFBTUUsT0FBTyxHQUFHLE1BQU1DLEtBQUssQ0FBQ0YsR0FBRCxFQUFNO0FBQzdCRyxJQUFBQSxNQUFNLEVBQUUsTUFEcUI7QUFFN0JDLElBQUFBLE9BQU8sRUFBRTtBQUFDLHNCQUFnQjtBQUFqQjtBQUZvQixHQUFOLENBQUwsQ0FJckJDLElBSnFCLENBSWZDLFFBQUQsSUFBY0EsUUFBUSxDQUFDQyxJQUFULEVBSkUsRUFLckJDLEtBTHFCLENBS2YsTUFBTUMsU0FMUyxDQUF0QjtBQU9BLE1BQUlSLE9BQU8sSUFBSVEsU0FBZixFQUNJWixHQUFHLENBQUNhLE1BQUosQ0FBVyxHQUFYLEVBQWdCSCxJQUFoQixDQUFxQjtBQUFDSSxJQUFBQSxPQUFPLEVBQUUsc0JBQVY7QUFBa0NDLElBQUFBLFdBQVcsRUFBRTtBQUEvQyxHQUFyQixFQURKLEtBR0lmLEdBQUcsQ0FBQ2EsTUFBSixDQUFXLEdBQVgsRUFBZ0JILElBQWhCLENBQXFCO0FBQUNJLElBQUFBLE9BQU8sRUFBRVYsT0FBVjtBQUFtQkQsSUFBQUEsR0FBRyxFQUFFQSxHQUF4QjtBQUE2QlksSUFBQUEsV0FBVyxFQUFFO0FBQTFDLEdBQXJCO0FBQ1AiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9hcGkvdXNlci9sb2dpbi5qcz8yNzU1Il0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIExvZ2luVXNlckFQSShyZXEsIHJlcykge1xuICAgIC8vIFByZXBhcmUgUE9TVCByZXF1ZXN0XG4gICAgY29uc3QgdXNlcm5hbWUgPSByZXFbJ3F1ZXJ5J11bJ3VzZXJuYW1lJ11cbiAgICBjb25zdCBwYXNzd29yZCA9IHJlcVsncXVlcnknXVsncGFzc3dvcmQnXVxuICAgIGNvbnN0IHVybCA9IFwiaHR0cDovL2FwaTo4MDAwL2tleWNsb2FrL3VzZXJfbG9naW4/dXNlcm5hbWU9XCIgKyB1c2VybmFtZSArIFwiJnBhc3N3b3JkPVwiICsgcGFzc3dvcmRcbiAgICBcbiAgICAvLyBsYXVuY2ggUE9TVCByZXF1ZXN0XG4gICAgY29uc3QgYXBpX3JlcyA9IGF3YWl0IGZldGNoKHVybCwge1xuICAgICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgICAgaGVhZGVyczogeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9XG4gICAgfSlcbiAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAuY2F0Y2goKCkgPT4gdW5kZWZpbmVkKVxuIFxuICAgIGlmIChhcGlfcmVzID09IHVuZGVmaW5lZClcbiAgICAgICAgcmVzLnN0YXR1cyg0MDEpLmpzb24oe2NvbnRlbnQ6ICdXcm9uZyBjcmVkZW50aWFscy4uLicsIHN0YXR1c19jb2RlOiA0MDF9KVxuICAgIGVsc2VcbiAgICAgICAgcmVzLnN0YXR1cygyMDEpLmpzb24oe2NvbnRlbnQ6IGFwaV9yZXMsIHVybDogdXJsLCBzdGF0dXNfY29kZTogMjAxfSlcbn0iXSwibmFtZXMiOlsiTG9naW5Vc2VyQVBJIiwicmVxIiwicmVzIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsInVybCIsImFwaV9yZXMiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwiY2F0Y2giLCJ1bmRlZmluZWQiLCJzdGF0dXMiLCJjb250ZW50Iiwic3RhdHVzX2NvZGUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/api/user/login.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/api/user/login.js"));
module.exports = __webpack_exports__;

})();