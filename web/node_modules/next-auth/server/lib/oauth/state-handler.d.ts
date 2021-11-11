/**
 * Returns state if provider supports it
 * @param {import("src/lib/types").NextAuthRequest} req
 * @param {import("src/lib/types").NextAuthResponse} res
 */
export function createState(req: import("src/lib/types").NextAuthRequest): string | undefined;
/**
 * Consistently recreate state from the csrfToken
 * if `provider.checks` supports `"state"`.
 * @param {import("src/lib/types").NextAuthRequest} req
 */
export function getState({ options }: import("src/lib/types").NextAuthRequest): string | undefined;
