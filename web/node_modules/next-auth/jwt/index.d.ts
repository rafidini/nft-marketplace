import { NextApiRequest } from "next";
import type { JWT, JWTDecodeParams, JWTEncodeParams } from "./types";
export * from "./types";
export declare function encode({ token, maxAge, secret, signingKey, signingOptions, encryptionKey, encryptionOptions, encryption, }: JWTEncodeParams): Promise<string>;
export declare function decode({ secret, token, maxAge, signingKey, verificationKey, // Optional (defaults to encryptionKey)
verificationOptions, encryptionKey, decryptionKey, // Optional (defaults to encryptionKey)
decryptionOptions, encryption, }: JWTDecodeParams): Promise<JWT | null>;
export declare type GetTokenParams<R extends boolean = false> = {
    req: NextApiRequest;
    secureCookie?: boolean;
    cookieName?: string;
    raw?: R;
    decode?: typeof decode;
    secret?: string;
} & Omit<JWTDecodeParams, "secret">;
/** [Documentation](https://next-auth.js.org/tutorials/securing-pages-and-api-routes#using-gettoken) */
export declare function getToken<R extends boolean = false>(params?: GetTokenParams<R>): Promise<R extends true ? string : JWT | null>;
