import { CookiesOptions } from "../..";
/** Stringified form of `JWT`. Extract the content with `jwt.decode` */
export declare type JWTString = string;
/** If `options.session.jwt` is set to `true`, this is a stringified `JWT`. In case of a database persisted session, this is the `sessionToken` of the session in the database.. */
export declare type SessionToken<T extends "jwt" | "db" = "jwt"> = T extends "jwt" ? JWTString : string;
/**
 * Function to set cookies server side
 *
 * Credit to @huv1k and @jshttp contributors for the code which this is based on (MIT License).
 * * https://github.com/jshttp/cookie/blob/master/index.js
 * * https://github.com/zeit/next.js/blob/master/examples/api-routes-middleware/utils/cookies.js
 *
 * As only partial functionlity is required, only the code we need has been incorporated here
 * (with fixes for specific issues) to keep dependancy size down.
 */
export declare function set(res: any, name: any, value: any, options?: {
    expires?: Date;
    maxAge?: number;
}): void;
/**
 * Use secure cookies if the site uses HTTPS
 * This being conditional allows cookies to work non-HTTPS development URLs
 * Honour secure cookie option, which sets 'secure' and also adds '__Secure-'
 * prefix, but enable them by default if the site URL is HTTPS; but not for
 * non-HTTPS URLs like http://localhost which are used in development).
 * For more on prefixes see https://googlechrome.github.io/samples/cookie-prefixes/
 *
 * @TODO Review cookie settings (names, options)
 */
export declare function defaultCookies(useSecureCookies: any): CookiesOptions;
