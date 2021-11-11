/**
 *
 * Generates an authorization/request token URL.
 *
 * [OAuth 2](https://www.oauth.com/oauth2-servers/authorization/the-authorization-request/) | [OAuth 1](https://oauth.net/core/1.0a/#auth_step2)
 * @type {import("src/lib/types").NextAuthApiHandler}
 * @returns {string}
 */
export default function getAuthorizationUrl(req: import("src/lib/types").NextAuthRequest, res: import("src/lib/types").NextAuthResponse<any>): string;
