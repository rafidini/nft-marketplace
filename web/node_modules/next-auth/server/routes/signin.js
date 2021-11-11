"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = signin;

var _authorizationUrl = _interopRequireDefault(require("../lib/oauth/authorization-url"));

var _signin = _interopRequireDefault(require("../lib/email/signin"));

async function signin(req, res) {
  const {
    baseUrl,
    basePath,
    adapter,
    callbacks,
    logger
  } = req.options;
  const provider = req.options.provider;

  if (!provider.type) {
    return res.status(500).end(`Error: Type not specified for ${provider.name}`);
  }

  if (provider.type === "oauth") {
    try {
      const authorizationUrl = await (0, _authorizationUrl.default)(req, res);
      return res.redirect(authorizationUrl);
    } catch (error) {
      logger.error("SIGNIN_OAUTH_ERROR", {
        error,
        provider
      });
      return res.redirect(`${baseUrl}${basePath}/error?error=OAuthSignin`);
    }
  } else if (provider.type === "email") {
    var _req$body$email$toLow, _req$body$email, _ref;

    if (!adapter) {
      logger.error("EMAIL_REQUIRES_ADAPTER_ERROR", new Error("E-mail login requires an adapter but it was undefined"));
      return res.redirect(`${baseUrl}${basePath}/error?error=Configuration`);
    }

    const email = (_req$body$email$toLow = (_req$body$email = req.body.email) === null || _req$body$email === void 0 ? void 0 : _req$body$email.toLowerCase()) !== null && _req$body$email$toLow !== void 0 ? _req$body$email$toLow : null;
    const {
      getUserByEmail
    } = adapter;
    const user = (_ref = email ? await getUserByEmail(email) : null) !== null && _ref !== void 0 ? _ref : {
      email
    };
    const account = {
      providerAccountId: user.email,
      type: "email",
      provider: provider.id
    };

    try {
      const signInCallbackResponse = await callbacks.signIn({
        user,
        account,
        email: {
          verificationRequest: true
        }
      });

      if (!signInCallbackResponse) {
        return res.redirect(`${baseUrl}${basePath}/error?error=AccessDenied`);
      } else if (typeof signInCallbackResponse === "string") {
        return res.redirect(signInCallbackResponse);
      }
    } catch (error) {
      return res.redirect(`${baseUrl}${basePath}/error?${new URLSearchParams({
        error
      })}}`);
    }

    try {
      await (0, _signin.default)(email, req.options);
    } catch (error) {
      logger.error("SIGNIN_EMAIL_ERROR", error);
      return res.redirect(`${baseUrl}${basePath}/error?error=EmailSignin`);
    }

    const params = new URLSearchParams({
      provider: provider.id,
      type: provider.type
    });
    const url = `${baseUrl}${basePath}/verify-request?${params}`;
    return res.redirect(url);
  }

  return res.redirect(`${baseUrl}${basePath}/signin`);
}