/**
 * Handle requests to /api/auth/signout
 * @param {import("src/lib/types").NextAuthRequest} req
 * @param {import("src/lib/types").NextAuthResponse} res
 */
export default function signout(req: import("src/lib/types").NextAuthRequest, res: import("src/lib/types").NextAuthResponse): Promise<import("next").NextApiResponse<any>>;
