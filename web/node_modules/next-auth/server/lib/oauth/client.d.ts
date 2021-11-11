/**
 * NOTE: We can add auto discovery of the provider's endpoint
 * that requires only one endpoint to be specified by the user.
 * Check out `Issuer.discover`
 *
 * Client supporting OAuth 2.x and OIDC
 * @param {import("src/lib/types").InternalOptions} options
 */
export function openidClient(options: import("src/lib/types").InternalOptions): Promise<import("openid-client").Client>;
