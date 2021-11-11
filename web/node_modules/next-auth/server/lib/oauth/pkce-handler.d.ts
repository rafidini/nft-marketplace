/**
 * Returns `code_challenge` and `code_challenge_method`
 * and saves them in a cookie.
 * @type {import("src/lib/types").NextAuthApiHandler}
 * @returns {Promise<undefined | {code_challenge: string; code_challenge_method: "S256"}>
 */
export function createPKCE(req: import("src/lib/types").NextAuthRequest, res: import("src/lib/types").NextAuthResponse<any>): Promise<undefined | {
    code_challenge: string;
    code_challenge_method: "S256";
}>;
/**
 * Returns code_verifier if provider uses PKCE,
 * and clears the cookie afterwards.
 * @param {import("src/lib/types").NextAuthRequest} req
 * @return {Promise<string | undefined>}
 */
export function usePKCECodeVerifier(req: import("src/lib/types").NextAuthRequest, res: any): Promise<string | undefined>;
