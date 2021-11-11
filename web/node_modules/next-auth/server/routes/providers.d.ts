/**
 * Return a JSON object with a list of all OAuth providers currently configured
 * and their signin and callback URLs. This makes it possible to automatically
 * generate buttons for all providers when rendering client side.
 * @param {import("src/lib/types").NextAuthRequest} req
 * @param {import("src/lib/types").NextAuthResponse} res
 */
export default function providers(req: import("src/lib/types").NextAuthRequest, res: import("src/lib/types").NextAuthResponse): void;
