"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = oAuthCallback;

var _client = require("./client");

var _clientLegacy = require("./client-legacy");

var _stateHandler = require("./state-handler");

var _pkceHandler = require("./pkce-handler");

var _errors = require("../../errors");

var _openidClient = require("openid-client");

async function oAuthCallback(req, res) {
  var _req$body$error, _provider$version;

  const {
    logger
  } = req.options;
  const provider = req.options.provider;
  const errorMessage = (_req$body$error = req.body.error) !== null && _req$body$error !== void 0 ? _req$body$error : req.query.error;

  if (errorMessage) {
    const error = new Error(errorMessage);
    logger.error("OAUTH_CALLBACK_HANDLER_ERROR", {
      error,
      body: req.body,
      providerId: provider.id
    });
    throw error;
  }

  if ((_provider$version = provider.version) !== null && _provider$version !== void 0 && _provider$version.startsWith("1.")) {
    try {
      const client = await (0, _clientLegacy.oAuth1Client)(req.options);
      const {
        oauth_token,
        oauth_verifier
      } = req.query;
      const tokens = await client.getOAuthAccessToken(oauth_token, null, oauth_verifier);
      let profile = await client.get(provider.profileUrl, tokens.oauth_token, tokens.oauth_token_secret);

      if (typeof profile === "string") {
        profile = JSON.parse(profile);
      }

      return await getProfile({
        profile,
        tokens,
        provider,
        logger
      });
    } catch (error) {
      logger.error("OAUTH_V1_GET_ACCESS_TOKEN_ERROR", error);
      throw error;
    }
  }

  try {
    var _provider$token, _provider$token2, _provider$userinfo, _ref, _req$body$user;

    const client = await (0, _client.openidClient)(req.options);
    let tokens;
    const checks = {
      code_verifier: await (0, _pkceHandler.usePKCECodeVerifier)(req, res),
      state: (0, _stateHandler.getState)(req)
    };
    const params = { ...client.callbackParams(req),
      ...((_provider$token = provider.token) === null || _provider$token === void 0 ? void 0 : _provider$token.params)
    };

    if ((_provider$token2 = provider.token) !== null && _provider$token2 !== void 0 && _provider$token2.request) {
      const response = await provider.token.request({
        provider,
        params,
        checks,
        client
      });
      tokens = new _openidClient.TokenSet(response.tokens);
    } else if (provider.idToken) {
      tokens = await client.callback(provider.callbackUrl, params, checks);
    } else {
      tokens = await client.oauthCallback(provider.callbackUrl, params, checks);
    }

    if (Array.isArray(tokens.scope)) {
      tokens.scope = tokens.scope.join(" ");
    }

    let profile;

    if ((_provider$userinfo = provider.userinfo) !== null && _provider$userinfo !== void 0 && _provider$userinfo.request) {
      profile = await provider.userinfo.request({
        provider,
        tokens,
        client
      });
    } else if (provider.idToken) {
      profile = tokens.claims();
    } else {
      var _provider$userinfo2;

      profile = await client.userinfo(tokens, {
        params: (_provider$userinfo2 = provider.userinfo) === null || _provider$userinfo2 === void 0 ? void 0 : _provider$userinfo2.params
      });
    }

    profile.user = JSON.parse((_ref = (_req$body$user = req.body.user) !== null && _req$body$user !== void 0 ? _req$body$user : req.query.user) !== null && _ref !== void 0 ? _ref : null);
    return await getProfile({
      profile,
      provider,
      tokens,
      logger
    });
  } catch (error) {
    logger.error("OAUTH_CALLBACK_ERROR", {
      error,
      providerId: provider.id
    });
    throw new _errors.OAuthCallbackError(error);
  }
}

async function getProfile({
  profile: OAuthProfile,
  tokens,
  provider,
  logger
}) {
  try {
    var _profile$email;

    logger.debug("PROFILE_DATA", {
      OAuthProfile
    });
    const profile = await provider.profile(OAuthProfile, tokens);
    profile.email = (_profile$email = profile.email) === null || _profile$email === void 0 ? void 0 : _profile$email.toLowerCase();
    return {
      profile,
      account: {
        provider: provider.id,
        type: provider.type,
        providerAccountId: profile.id.toString(),
        ...tokens
      },
      OAuthProfile
    };
  } catch (error) {
    logger.error("OAUTH_PARSE_PROFILE_ERROR", {
      error,
      OAuthProfile
    });
    return {
      profile: null,
      account: null,
      OAuthProfile
    };
  }
}