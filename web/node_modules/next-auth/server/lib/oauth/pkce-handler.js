"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPKCE = createPKCE;
exports.usePKCECodeVerifier = usePKCECodeVerifier;

var cookie = _interopRequireWildcard(require("../cookie"));

var jwt = _interopRequireWildcard(require("../../../jwt"));

var _openidClient = require("openid-client");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const PKCE_LENGTH = 64;
const PKCE_CODE_CHALLENGE_METHOD = "S256";
const PKCE_MAX_AGE = 60 * 15;

async function createPKCE(req, res) {
  var _provider$checks;

  const {
    cookies,
    logger
  } = req.options;
  const provider = req.options.provider;

  if (!((_provider$checks = provider.checks) !== null && _provider$checks !== void 0 && _provider$checks.includes("pkce"))) {
    return;
  }

  const codeVerifier = _openidClient.generators.codeVerifier(PKCE_LENGTH);

  const codeChallenge = _openidClient.generators.codeChallenge(codeVerifier);

  const encryptedCodeVerifier = await jwt.encode({
    maxAge: PKCE_MAX_AGE,
    ...req.options.jwt,
    token: {
      code_verifier: codeVerifier
    },
    encryption: true
  });
  const cookieExpires = new Date();
  cookieExpires.setTime(cookieExpires.getTime() + PKCE_MAX_AGE * 1000);
  cookie.set(res, cookies.pkceCodeVerifier.name, encryptedCodeVerifier, {
    expires: cookieExpires.toISOString(),
    ...cookies.pkceCodeVerifier.options
  });
  logger.debug("CREATE_PKCE_CHALLENGE_VERIFIER", {
    pkce: {
      code_challenge: codeChallenge,
      code_verifier: codeVerifier
    },
    pkceLength: PKCE_LENGTH,
    method: PKCE_CODE_CHALLENGE_METHOD
  });
  return {
    code_challenge: codeChallenge,
    code_challenge_method: PKCE_CODE_CHALLENGE_METHOD
  };
}

async function usePKCECodeVerifier(req, res) {
  var _pkce$code_verifier;

  const provider = req.options.provider;
  const {
    cookies
  } = req.options;

  if (!(provider !== null && provider !== void 0 && provider.checks.includes("pkce")) || !(cookies.pkceCodeVerifier.name in req.cookies)) {
    return;
  }

  const pkce = await jwt.decode({ ...req.options.jwt,
    token: req.cookies[cookies.pkceCodeVerifier.name],
    maxAge: PKCE_MAX_AGE,
    encryption: true
  });
  cookie.set(res, cookies.pkceCodeVerifier.name, "", { ...cookies.pkceCodeVerifier.options,
    maxAge: 0
  });
  return (_pkce$code_verifier = pkce === null || pkce === void 0 ? void 0 : pkce.code_verifier) !== null && _pkce$code_verifier !== void 0 ? _pkce$code_verifier : undefined;
}