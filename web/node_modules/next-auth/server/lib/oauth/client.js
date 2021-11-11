"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.openidClient = openidClient;

var _openidClient = require("openid-client");

async function openidClient(options) {
  const provider = options.provider;
  let issuer;

  if (provider.wellKnown) {
    issuer = await _openidClient.Issuer.discover(provider.wellKnown);
  } else {
    var _provider$authorizati, _provider$token$url, _provider$userinfo$ur;

    issuer = new _openidClient.Issuer({
      issuer: provider.issuer,
      authorization_endpoint: (_provider$authorizati = provider.authorization.url) !== null && _provider$authorizati !== void 0 ? _provider$authorizati : provider.authorization,
      token_endpoint: (_provider$token$url = provider.token.url) !== null && _provider$token$url !== void 0 ? _provider$token$url : provider.token,
      userinfo_endpoint: (_provider$userinfo$ur = provider.userinfo.url) !== null && _provider$userinfo$ur !== void 0 ? _provider$userinfo$ur : provider.userinfo
    });
  }

  const client = new issuer.Client({
    client_id: provider.clientId,
    client_secret: provider.clientSecret,
    redirect_uris: [provider.callbackUrl]
  });
  return client;
}