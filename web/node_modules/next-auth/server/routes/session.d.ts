/**
 * Return a session object (without any private fields)
 * for Single Page App clients
 * @param {import("src/lib/types").NextAuthRequest} req
 * @param {import("src/lib/types").NextAuthResponse} res
 */
export default function session(req: import("src/lib/types").NextAuthRequest, res: import("src/lib/types").NextAuthResponse): Promise<void>;
