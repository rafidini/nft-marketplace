"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getAuthorizationUrl;

var _client = require("../oauth/client");

var _clientLegacy = require("../oauth/client-legacy");

var _stateHandler = require("../oauth/state-handler");

var _pkceHandler = require("../oauth/pkce-handler");

async function getAuthorizationUrl(req, res) {
  const {
    logger
  } = req.options;

  try {
    var _provider$version;

    const provider = req.options.provider;
    let params = {};

    if (typeof provider.authorization === "string") {
      const parsedUrl = new URL(provider.authorization);
      const parsedParams = Object.fromEntries(parsedUrl.searchParams.entries());
      params = { ...params,
        ...parsedParams
      };
    } else {
      var _provider$authorizati;

      params = { ...params,
        ...((_provider$authorizati = provider.authorization) === null || _provider$authorizati === void 0 ? void 0 : _provider$authorizati.params)
      };
    }

    params = { ...params,
      ...req.query
    };

    if ((_provider$version = provider.version) !== null && _provider$version !== void 0 && _provider$version.startsWith("1.")) {
      const client = (0, _clientLegacy.oAuth1Client)(req.options);
      const tokens = await client.getOAuthRequestToken(params);
      const url = `${provider.authorization}?${new URLSearchParams({
        oauth_token: tokens.oauth_token,
        oauth_token_secret: tokens.oauth_token_secret,
        ...tokens.params
      })}`;
      logger.debug("GET_AUTHORIZATION_URL", {
        url
      });
      return url;
    }

    const client = await (0, _client.openidClient)(req.options);
    const pkce = await (0, _pkceHandler.createPKCE)(req, res);
    const url = client.authorizationUrl({ ...params,
      ...pkce,
      state: (0, _stateHandler.createState)(req)
    });
    logger.debug("GET_AUTHORIZATION_URL", {
      url
    });
    return url;
  } catch (error) {
    logger.error("GET_AUTHORIZATION_URL_ERROR", error);
    throw error;
  }
}