import { NextAuthRequest, NextAuthResponse } from "../../lib/types";
/**
 * Get callback URL based on query param / cookie + validation,
 * and add it to `req.options.callbackUrl`.
 */
export default function callbackUrlHandler(req: NextAuthRequest, res: NextAuthResponse): Promise<void>;
