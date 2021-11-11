/**
 * Simple universal (client/server) function to split host and path.
 * We use this rather than a library because we need to use the same logic both
 * client and server side and we only need to parse out the host and path, while
 * supporting a default value, so a simple split is sufficent.
 * @todo Use `URL` instead of custom parsing. (Remember: `protocol` is not standard)
 */
export default function parseUrl(url?: string): {
    baseUrl: string;
    basePath: string;
};
