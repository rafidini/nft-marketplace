"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extendRes;

function extendRes(req, res) {
  res.redirect = url => {
    var _req$body;

    if (((_req$body = req.body) === null || _req$body === void 0 ? void 0 : _req$body.json) === "true") {
      return res.json({
        url
      });
    }

    res.status(302).setHeader("Location", url);
    return res.end();
  };
}