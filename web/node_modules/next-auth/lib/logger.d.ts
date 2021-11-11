/**
 * Override any of the methods, and the rest will use the default logger.
 *
 * [Documentation](https://next-auth.js.org/configuration/options#logger)
 */
export interface LoggerInstance {
    warn: (code: "JWT_AUTO_GENERATED_SIGNING_KEY" | "JWT_AUTO_GENERATED_ENCRYPTION_KEY" | "NEXTAUTH_URL") => void;
    error: (code: string, 
    /**
     * Either an instance of (JSON serializable) Error
     * or an object that contains some debug information.
     * (Error is still available through `metadata.error`)
     */
    metadata: Error | {
        error: Error;
        [key: string]: unknown;
    }) => void;
    debug: (code: string, metadata: unknown) => void;
}
declare const _logger: LoggerInstance;
/**
 * Override the built-in logger.
 * Any `undefined` level will use the default logger.
 */
export declare function setLogger(newLogger?: Partial<LoggerInstance>): void;
export default _logger;
/** Serializes client-side log messages and sends them to the server */
export declare function proxyLogger(logger?: LoggerInstance, basePath?: string): LoggerInstance;
