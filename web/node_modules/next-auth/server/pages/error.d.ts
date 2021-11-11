/// <reference types="react" />
/**
 * Renders an error page.
 * @param {{
 *   baseUrl: string
 *   basePath: string
 *   error?: string
 *   res: import("src/lib/types").NextAuthResponse
 * }} params
 */
export default function Error({ baseUrl, basePath, error, res }: {
    baseUrl: any;
    basePath: any;
    error?: string | undefined;
    res: any;
}): JSX.Element;
