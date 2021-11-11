import type { NextApiRequest, NextApiResponse } from "next";
import type { NextAuthOptions } from "./types";
declare function NextAuth(options: NextAuthOptions): any;
declare function NextAuth(req: NextApiRequest, res: NextApiResponse, options: NextAuthOptions): any;
export default NextAuth;
