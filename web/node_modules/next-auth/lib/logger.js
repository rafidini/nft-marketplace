"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setLogger = setLogger;
exports.proxyLogger = proxyLogger;
exports.default = void 0;

var _errors = require("../server/errors");

function formatError(o) {
  if (o instanceof Error && !(o instanceof _errors.UnknownError)) {
    return {
      message: o.message,
      stack: o.stack,
      name: o.name
    };
  }

  if (o !== null && o !== void 0 && o.error) {
    var _o$message;

    o.error = formatError(o.error);
    o.message = (_o$message = o.message) !== null && _o$message !== void 0 ? _o$message : o.error.message;
  }

  return o;
}

const _logger = {
  error(code, metadata) {
    metadata = formatError(metadata);
    console.error(`[next-auth][error][${code}]`, `\nhttps://next-auth.js.org/errors#${code.toLowerCase()}`, metadata.message, metadata);
  },

  warn(code) {
    console.warn(`[next-auth][warn][${code}]`, `\nhttps://next-auth.js.org/warnings#${code.toLowerCase()}`);
  },

  debug(code, metadata) {
    var _process, _process$env;

    if (!((_process = process) !== null && _process !== void 0 && (_process$env = _process.env) !== null && _process$env !== void 0 && _process$env._NEXTAUTH_DEBUG)) return;
    console.log(`[next-auth][debug][${code}]`, metadata);
  }

};

function setLogger(newLogger = {}) {
  if (newLogger.error) _logger.error = newLogger.error;
  if (newLogger.warn) _logger.warn = newLogger.warn;
  if (newLogger.debug) _logger.debug = newLogger.debug;
}

var _default = _logger;
exports.default = _default;

function proxyLogger(logger = _logger, basePath) {
  try {
    if (typeof window === "undefined") {
      return logger;
    }

    const clientLogger = {};

    for (const level in logger) {
      clientLogger[level] = (code, metadata) => {
        _logger[level](code, metadata);

        if (level === "error") {
          metadata = formatError(metadata);
        }

        metadata.client = true;
        const url = `${basePath}/_log`;
        const body = new URLSearchParams({
          level,
          code,
          ...metadata
        });

        if (navigator.sendBeacon) {
          return navigator.sendBeacon(url, body);
        }

        return fetch(url, {
          method: "POST",
          body,
          keepalive: true
        });
      };
    }

    return clientLogger;
  } catch (_unused) {
    return _logger;
  }
}