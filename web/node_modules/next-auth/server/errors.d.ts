import { EventCallbacks, LoggerInstance } from "..";
import { Adapter } from "../adapters";
/**
 * Same as the default `Error`, but it is JSON serializable.
 * @source https://iaincollins.medium.com/error-handling-in-javascript-a6172ccdf9af
 */
export declare class UnknownError extends Error {
    constructor(error: any);
    toJSON(): {
        name: string;
        message: string;
        stack: string | undefined;
    };
}
export declare class OAuthCallbackError extends UnknownError {
    name: string;
}
/**
 * Thrown when an Email address is already associated with an account
 * but the user is trying an OAuth account that is not linked to it.
 */
export declare class AccountNotLinkedError extends UnknownError {
    name: string;
}
export declare function upperSnake(s: string): string;
export declare function capitalize(s: string): string;
/**
 * Wraps an object of methods and adds error handling.
 */
export declare function eventsErrorHandler(methods: Partial<EventCallbacks>, logger: LoggerInstance): Partial<EventCallbacks>;
/** Handles adapter induced errors. */
export declare function adapterErrorHandler(adapter: Adapter | undefined, logger: LoggerInstance): Adapter | undefined;
