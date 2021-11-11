"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = callback;

var _callback = _interopRequireDefault(require("../lib/oauth/callback"));

var _callbackHandler = _interopRequireDefault(require("../lib/callback-handler"));

var cookie = _interopRequireWildcard(require("../lib/cookie"));

var _utils = require("../lib/utils");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

async function callback(req, res) {
  var _req$cookies$cookies$, _req$cookies;

  const {
    provider,
    adapter,
    baseUrl,
    basePath,
    cookies,
    callbackUrl,
    pages,
    jwt,
    events,
    callbacks,
    session: {
      jwt: useJwtSession,
      maxAge: sessionMaxAge
    },
    logger
  } = req.options;
  const sessionToken = (_req$cookies$cookies$ = (_req$cookies = req.cookies) === null || _req$cookies === void 0 ? void 0 : _req$cookies[cookies.sessionToken.name]) !== null && _req$cookies$cookies$ !== void 0 ? _req$cookies$cookies$ : null;

  if (provider.type === "oauth") {
    try {
      const {
        profile,
        account,
        OAuthProfile
      } = await (0, _callback.default)(req, res);

      try {
        var _events$signIn;

        logger.debug("OAUTH_CALLBACK_RESPONSE", {
          profile,
          account,
          OAuthProfile
        });

        if (!profile) {
          return res.redirect(`${baseUrl}${basePath}/signin`);
        }

        let userOrProfile = profile;

        if (adapter) {
          const {
            getUserByAccount
          } = adapter;
          const userByAccount = await getUserByAccount({
            providerAccountId: account.providerAccountId,
            provider: provider.id
          });
          if (userByAccount) userOrProfile = userByAccount;
        }

        try {
          const isAllowed = await callbacks.signIn({
            user: userOrProfile,
            account,
            profile: OAuthProfile
          });

          if (!isAllowed) {
            return res.redirect(`${baseUrl}${basePath}/error?error=AccessDenied`);
          } else if (typeof isAllowed === "string") {
            return res.redirect(isAllowed);
          }
        } catch (error) {
          return res.redirect(`${baseUrl}${basePath}/error?error=${encodeURIComponent(error.message)}`);
        }

        const {
          user,
          session,
          isNewUser
        } = await (0, _callbackHandler.default)(sessionToken, profile, account, req.options);

        if (useJwtSession) {
          var _user$id;

          const defaultToken = {
            name: user.name,
            email: user.email,
            picture: user.image,
            sub: (_user$id = user.id) === null || _user$id === void 0 ? void 0 : _user$id.toString()
          };
          const token = await callbacks.jwt({
            token: defaultToken,
            user,
            account,
            profile: OAuthProfile,
            isNewUser
          });
          const newEncodedJwt = await jwt.encode({ ...jwt,
            token
          });
          const cookieExpires = new Date();
          cookieExpires.setTime(cookieExpires.getTime() + sessionMaxAge * 1000);
          cookie.set(res, cookies.sessionToken.name, newEncodedJwt, {
            expires: cookieExpires.toISOString(),
            ...cookies.sessionToken.options
          });
        } else {
          cookie.set(res, cookies.sessionToken.name, session.sessionToken, {
            expires: session.expires,
            ...cookies.sessionToken.options
          });
        }

        await ((_events$signIn = events.signIn) === null || _events$signIn === void 0 ? void 0 : _events$signIn.call(events, {
          user,
          account,
          profile,
          isNewUser
        }));

        if (isNewUser && pages.newUser) {
          return res.redirect(`${pages.newUser}${pages.newUser.includes("?") ? "&" : "?"}callbackUrl=${encodeURIComponent(callbackUrl)}`);
        }

        return res.redirect(callbackUrl || baseUrl);
      } catch (error) {
        if (error.name === "AccountNotLinkedError") {
          return res.redirect(`${baseUrl}${basePath}/error?error=OAuthAccountNotLinked`);
        } else if (error.name === "CreateUserError") {
          return res.redirect(`${baseUrl}${basePath}/error?error=OAuthCreateAccount`);
        }

        logger.error("OAUTH_CALLBACK_HANDLER_ERROR", error);
        return res.redirect(`${baseUrl}${basePath}/error?error=Callback`);
      }
    } catch (error) {
      if (error.name === "OAuthCallbackError") {
        logger.error("CALLBACK_OAUTH_ERROR", error);
        return res.redirect(`${baseUrl}${basePath}/error?error=OAuthCallback`);
      }

      logger.error("OAUTH_CALLBACK_ERROR", error);
      return res.redirect(`${baseUrl}${basePath}/error?error=Callback`);
    }
  } else if (provider.type === "email") {
    try {
      var _ref, _events$signIn2;

      if (!adapter) {
        logger.error("EMAIL_REQUIRES_ADAPTER_ERROR", new Error("E-mail login requires an adapter but it was undefined"));
        return res.redirect(`${baseUrl}${basePath}/error?error=Configuration`);
      }

      const {
        useVerificationToken,
        getUserByEmail
      } = adapter;
      const token = req.query.token;
      const identifier = req.query.email;
      const invite = await useVerificationToken({
        identifier,
        token: (0, _utils.hashToken)(token, req.options)
      });
      const invalidInvite = !invite || invite.expires.valueOf() < Date.now();

      if (invalidInvite) {
        return res.redirect(`${baseUrl}${basePath}/error?error=Verification`);
      }

      const profile = (_ref = identifier ? await getUserByEmail(identifier) : null) !== null && _ref !== void 0 ? _ref : {
        email: identifier
      };
      const account = {
        providerAccountId: profile.email,
        type: "email",
        provider: provider.id
      };

      try {
        const signInCallbackResponse = await callbacks.signIn({
          user: profile,
          account,
          email: {
            email: identifier
          }
        });

        if (!signInCallbackResponse) {
          return res.redirect(`${baseUrl}${basePath}/error?error=AccessDenied`);
        } else if (typeof signInCallbackResponse === "string") {
          return res.redirect(signInCallbackResponse);
        }
      } catch (error) {
        return res.redirect(`${baseUrl}${basePath}/error?error=${encodeURIComponent(error.message)}`);
      }

      const {
        user,
        session,
        isNewUser
      } = await (0, _callbackHandler.default)(sessionToken, profile, account, req.options);

      if (useJwtSession) {
        var _user$id2;

        const defaultToken = {
          name: user.name,
          email: user.email,
          picture: user.image,
          sub: (_user$id2 = user.id) === null || _user$id2 === void 0 ? void 0 : _user$id2.toString()
        };
        const token = await callbacks.jwt({
          token: defaultToken,
          user,
          account,
          isNewUser
        });
        const newEncodedJwt = await jwt.encode({ ...jwt,
          token
        });
        const cookieExpires = new Date();
        cookieExpires.setTime(cookieExpires.getTime() + sessionMaxAge * 1000);
        cookie.set(res, cookies.sessionToken.name, newEncodedJwt, {
          expires: cookieExpires.toISOString(),
          ...cookies.sessionToken.options
        });
      } else {
        cookie.set(res, cookies.sessionToken.name, session.sessionToken, {
          expires: session.expires,
          ...cookies.sessionToken.options
        });
      }

      await ((_events$signIn2 = events.signIn) === null || _events$signIn2 === void 0 ? void 0 : _events$signIn2.call(events, {
        user,
        account,
        isNewUser
      }));

      if (isNewUser && pages.newUser) {
        return res.redirect(`${pages.newUser}${pages.newUser.includes("?") ? "&" : "?"}callbackUrl=${encodeURIComponent(callbackUrl)}`);
      }

      return res.redirect(callbackUrl || baseUrl);
    } catch (error) {
      if (error.name === "CreateUserError") {
        return res.redirect(`${baseUrl}${basePath}/error?error=EmailCreateAccount`);
      }

      logger.error("CALLBACK_EMAIL_ERROR", error);
      return res.redirect(`${baseUrl}${basePath}/error?error=Callback`);
    }
  } else if (provider.type === "credentials" && req.method === "POST") {
    var _user$id3, _events$signIn3;

    if (!useJwtSession) {
      logger.error("CALLBACK_CREDENTIALS_JWT_ERROR", new Error("Signin in with credentials is only supported if JSON Web Tokens are enabled"));
      return res.status(500).redirect(`${baseUrl}${basePath}/error?error=Configuration`);
    }

    if (!provider.authorize) {
      logger.error("CALLBACK_CREDENTIALS_HANDLER_ERROR", new Error("Must define an authorize() handler to use credentials authentication provider"));
      return res.status(500).redirect(`${baseUrl}${basePath}/error?error=Configuration`);
    }

    const credentials = req.body;
    let user;

    try {
      user = await provider.authorize(credentials, { ...req,
        options: {},
        cookies: {}
      });

      if (!user) {
        return res.status(401).redirect(`${baseUrl}${basePath}/error?${new URLSearchParams({
          error: "CredentialsSignin",
          provider: provider.id
        })}`);
      }
    } catch (error) {
      return res.redirect(`${baseUrl}${basePath}/error?error=${encodeURIComponent(error.message)}`);
    }

    const account = {
      providerAccountId: user.id,
      type: "credentials",
      provider: provider.id
    };

    try {
      const isAllowed = await callbacks.signIn({
        user,
        account,
        credentials
      });

      if (!isAllowed) {
        return res.status(403).redirect(`${baseUrl}${basePath}/error?error=AccessDenied`);
      } else if (typeof isAllowed === "string") {
        return res.redirect(isAllowed);
      }
    } catch (error) {
      return res.redirect(`${baseUrl}${basePath}/error?error=${encodeURIComponent(error.message)}`);
    }

    const defaultToken = {
      name: user.name,
      email: user.email,
      picture: user.image,
      sub: (_user$id3 = user.id) === null || _user$id3 === void 0 ? void 0 : _user$id3.toString()
    };
    const token = await callbacks.jwt({
      token: defaultToken,
      user,
      account,
      isNewUser: false
    });
    const newEncodedJwt = await jwt.encode({ ...jwt,
      token
    });
    const cookieExpires = new Date();
    cookieExpires.setTime(cookieExpires.getTime() + sessionMaxAge * 1000);
    cookie.set(res, cookies.sessionToken.name, newEncodedJwt, {
      expires: cookieExpires.toISOString(),
      ...cookies.sessionToken.options
    });
    await ((_events$signIn3 = events.signIn) === null || _events$signIn3 === void 0 ? void 0 : _events$signIn3.call(events, {
      user,
      account
    }));
    return res.redirect(callbackUrl || baseUrl);
  }

  return res.status(500).end(`Error: Callback for provider type ${provider.type} not supported`);
}