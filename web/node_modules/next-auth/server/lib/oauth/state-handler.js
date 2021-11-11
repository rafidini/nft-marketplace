"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createState = createState;
exports.getState = getState;

var _crypto = require("crypto");

function createState(req) {
  var _provider$checks;

  const {
    csrfToken,
    logger
  } = req.options;
  const provider = req.options.provider;

  if (!((_provider$checks = provider.checks) !== null && _provider$checks !== void 0 && _provider$checks.includes("state"))) {
    return;
  }

  const state = (0, _crypto.createHash)("sha256").update(csrfToken).digest("hex");
  logger.debug("OAUTH_CALLBACK_PROTECTION", {
    state,
    csrfToken
  });
  return state;
}

function getState({
  options
}) {
  const provider = options.provider;

  if (provider !== null && provider !== void 0 && provider.checks.includes("state")) {
    return (0, _crypto.createHash)("sha256").update(options.csrfToken).digest("hex");
  }
}