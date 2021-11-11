"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.oAuth1Client = oAuth1Client;

var _oauth = require("oauth");

function oAuth1Client(options) {
  const provider = options.provider;
  const oauth1Client = new _oauth.OAuth(provider.requestTokenUrl, provider.accessTokenUrl, provider.clientId, provider.clientSecret, provider.version || "1.0", provider.callbackUrl, provider.encoding || "HMAC-SHA1");
  const originalGet = oauth1Client.get.bind(oauth1Client);

  oauth1Client.get = (...args) => {
    return new Promise((resolve, reject) => {
      originalGet(...args, (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve(result);
      });
    });
  };

  const originalGetOAuth1AccessToken = oauth1Client.getOAuthAccessToken.bind(oauth1Client);

  oauth1Client.getOAuthAccessToken = (...args) => {
    return new Promise((resolve, reject) => {
      originalGetOAuth1AccessToken(...args, (error, oauth_token, oauth_token_secret) => {
        if (error) {
          return reject(error);
        }

        resolve({
          oauth_token,
          oauth_token_secret
        });
      });
    });
  };

  const originalGetOAuthRequestToken = oauth1Client.getOAuthRequestToken.bind(oauth1Client);

  oauth1Client.getOAuthRequestToken = (params = {}) => {
    return new Promise((resolve, reject) => {
      originalGetOAuthRequestToken(params, (error, oauth_token, oauth_token_secret, params) => {
        if (error) {
          return reject(error);
        }

        resolve({
          oauth_token,
          oauth_token_secret,
          params
        });
      });
    });
  };

  return oauth1Client;
}