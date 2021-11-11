import { EmailConfig } from "src/providers";
import { InternalOptions, InternalProvider } from "src/lib/types";
/**
 * Starts an e-mail login flow, by generating a token,
 * and sending it to the user's e-mail (with the help of a DB adapter)
 */
export default function email(identifier: string, options: InternalOptions<EmailConfig & InternalProvider>): Promise<void>;
