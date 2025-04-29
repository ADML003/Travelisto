import { LoaderFunctionArgs, ActionFunctionArgs, ClientLoaderFunctionArgs, ClientActionFunctionArgs } from 'react-router';

type AllDataFunctionArgs = LoaderFunctionArgs | ActionFunctionArgs | ClientLoaderFunctionArgs | ClientActionFunctionArgs;
type NetworkRequestType = "action" | "loader" | "client-action" | "client-loader";

declare const extendContextObject: (routeId: string, type: NetworkRequestType, args: AllDataFunctionArgs) => {
    routeId: string;
    /**
     * Set of utilities to be used in your data fetching functions to trace events
     * in network tab of react-router-devtools
     */
    tracing: {
        /**
         * trace is a function that will trace the event given to it, pipe it to the network tab of react-router-devtools and show you analytics
         *
         * Warning: This function will only work in production if you install react-router-devtools as a regular dependency
         * and include the context part in production!
         *  @param name - The name of the event
         * @param event - The event to be traced
         * @returns The result of the event

         */
        trace: <T>(name: string, event: (...args: any) => T) => Promise<T>;
        /**
 * start is a function that will start a trace for the name provided to it and return the start time
 * This is used together with traceEnd to trace the time of the event
 *
 * Warning: This function relies on you using the traceEnd with the same name as the start event, otherwise
 * you will end up having a never ending loading bar in the network tab!
 *
 * @param name - The name of the event
 * @returns The start time of the event

 */
        start: (name: string) => number;
        /**
         * end is a function that will end a trace for the name provided to it and return the end time
         *
         * @param name - The name of the event
         * @param startTime - The start time of the sendEvent
         * @param data - The data to be sent with the event
         * @returns The data provided in the last parameter
         */
        end: <T>(name: string, startTime: number, data?: T) => T | undefined;
    };
};
type ExtendedContext = ReturnType<typeof extendContextObject>;
declare const withLoaderContextWrapper: (loader: <T>(args: LoaderFunctionArgs) => T, id: string) => (args: AllDataFunctionArgs) => Promise<unknown>;
declare const withActionContextWrapper: (action: <T>(args: ActionFunctionArgs) => T, id: string) => (args: AllDataFunctionArgs) => Promise<unknown>;
declare const withClientLoaderContextWrapper: (loader: <T>(args: ClientLoaderFunctionArgs) => T, id: string) => (args: AllDataFunctionArgs) => Promise<unknown>;
declare const withClientActionContextWrapper: (action: <T>(args: ClientActionFunctionArgs) => T, id: string) => (args: AllDataFunctionArgs) => Promise<unknown>;

export { type ExtendedContext, withActionContextWrapper, withClientActionContextWrapper, withClientLoaderContextWrapper, withLoaderContextWrapper };
