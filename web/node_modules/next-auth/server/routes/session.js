"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = session;

var cookie = _interopRequireWildcard(require("../lib/cookie"));

var _utils = require("../lib/utils");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

async function session(req, res) {
  const {
    cookies,
    adapter,
    jwt,
    events,
    callbacks,
    logger
  } = req.options;
  const useJwtSession = req.options.session.jwt;
  const sessionMaxAge = req.options.session.maxAge;
  const sessionToken = req.cookies[cookies.sessionToken.name];

  if (!sessionToken) {
    return res.json({});
  }

  let response = {};

  if (useJwtSession) {
    try {
      var _events$session;

      const decodedToken = await jwt.decode({ ...jwt,
        token: sessionToken
      });
      const newExpires = (0, _utils.fromDate)(sessionMaxAge);
      const defaultSession = {
        user: {
          name: decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.name,
          email: decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.email,
          image: decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.picture
        },
        expires: newExpires.toISOString()
      };
      const token = await callbacks.jwt({
        token: decodedToken
      });
      const session = await callbacks.session({
        session: defaultSession,
        token
      });
      response = session;
      const newToken = await jwt.encode({ ...jwt,
        token
      });
      cookie.set(res, cookies.sessionToken.name, newToken, {
        expires: newExpires,
        ...cookies.sessionToken.options
      });
      await ((_events$session = events.session) === null || _events$session === void 0 ? void 0 : _events$session.call(events, {
        session,
        token
      }));
    } catch (error) {
      logger.error("JWT_SESSION_ERROR", error);
      cookie.set(res, cookies.sessionToken.name, "", { ...cookies.sessionToken.options,
        maxAge: 0
      });
    }
  } else {
    try {
      const {
        getSessionAndUser,
        deleteSession,
        updateSession
      } = adapter;
      let userAndSession = await getSessionAndUser(sessionToken);

      if (userAndSession && userAndSession.session.expires.valueOf() < Date.now()) {
        await deleteSession(sessionToken);
        userAndSession = null;
      }

      if (userAndSession) {
        var _events$session2;

        const {
          user,
          session
        } = userAndSession;
        const sessionUpdateAge = req.options.session.updateAge;
        const sessionIsDueToBeUpdatedDate = session.expires.valueOf() - sessionMaxAge * 1000 + sessionUpdateAge * 1000;
        const newExpires = (0, _utils.fromDate)(sessionMaxAge);

        if (sessionIsDueToBeUpdatedDate <= Date.now()) {
          await updateSession({
            sessionToken,
            expires: newExpires
          });
        }

        const sessionPayload = await callbacks.session({
          session: {
            user: {
              name: user.name,
              email: user.email,
              image: user.image
            },
            expires: session.expires.toISOString()
          },
          user
        });
        response = sessionPayload;
        cookie.set(res, cookies.sessionToken.name, sessionToken, {
          expires: newExpires,
          ...cookies.sessionToken.options
        });
        await ((_events$session2 = events.session) === null || _events$session2 === void 0 ? void 0 : _events$session2.call(events, {
          session: sessionPayload
        }));
      } else if (sessionToken) {
        cookie.set(res, cookies.sessionToken.name, "", { ...cookies.sessionToken.options,
          maxAge: 0
        });
      }
    } catch (error) {
      logger.error("SESSION_ERROR", error);
    }
  }

  res.json(response);
}