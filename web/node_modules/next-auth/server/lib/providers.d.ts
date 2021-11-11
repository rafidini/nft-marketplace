import { InternalProvider } from "src/lib/types";
import { Provider } from "../../providers";
/**
 * Adds `signinUrl` and `callbackUrl` to each provider
 * and deep merge user-defined options.
 */
export default function parseProviders(params: {
    providers: Provider[];
    base: string;
}): InternalProvider[];
