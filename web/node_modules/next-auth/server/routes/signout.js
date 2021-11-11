"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = signout;

var cookie = _interopRequireWildcard(require("../lib/cookie"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

async function signout(req, res) {
  const {
    adapter,
    cookies,
    events,
    jwt,
    callbackUrl,
    logger
  } = req.options;
  const useJwtSession = req.options.session.jwt;
  const sessionToken = req.cookies[cookies.sessionToken.name];

  if (useJwtSession) {
    try {
      var _events$signOut;

      const decodedJwt = await jwt.decode({ ...jwt,
        token: sessionToken
      });
      await ((_events$signOut = events.signOut) === null || _events$signOut === void 0 ? void 0 : _events$signOut.call(events, {
        token: decodedJwt
      }));
    } catch (error) {}
  } else {
    try {
      var _events$signOut2;

      const session = await adapter.deleteSession(sessionToken);
      await ((_events$signOut2 = events.signOut) === null || _events$signOut2 === void 0 ? void 0 : _events$signOut2.call(events, {
        session
      }));
    } catch (error) {
      logger.error("SIGNOUT_ERROR", error);
    }
  }

  cookie.set(res, cookies.sessionToken.name, "", { ...cookies.sessionToken.options,
    maxAge: 0
  });
  return res.redirect(callbackUrl);
}