import * as react_jsx_runtime from 'react/jsx-runtime';
import { JSX } from 'react';
import { FormEncType, LoaderFunctionArgs, ActionFunctionArgs, ClientLoaderFunctionArgs, ClientActionFunctionArgs, LinksFunction } from 'react-router';

interface RDTEvent<Type extends string, Data extends Record<string, unknown> | any[]> {
    type: Type;
    data: Data;
}
type LoaderEvent = RDTEvent<"loader", {
    id: string;
    executionTime: number;
    requestData: any;
    responseData: any;
    requestHeaders: Record<string, string>;
    responseHeaders: Record<string, string>;
    timestamp: number;
}>;
type ActionEvent = RDTEvent<"action", {
    id: string;
    executionTime: number;
    requestData: any;
    responseData: any;
    requestHeaders: Record<string, string>;
    responseHeaders: Record<string, string>;
    timestamp: number;
}>;

type Tabs = (typeof tabs)[number]["id"];
interface Tab {
    name: string | JSX.Element;
    icon: JSX.Element;
    id: string;
    component: JSX.Element;
    hideTimeline: boolean;
}
declare const tabs: readonly [{
    readonly name: "Active page";
    readonly icon: react_jsx_runtime.JSX.Element;
    readonly id: "page";
    readonly component: react_jsx_runtime.JSX.Element;
    readonly hideTimeline: false;
}, {
    readonly name: "Routes";
    readonly icon: react_jsx_runtime.JSX.Element;
    readonly id: "routes";
    readonly component: react_jsx_runtime.JSX.Element;
    readonly hideTimeline: false;
}, {
    readonly name: "Errors";
    readonly icon: react_jsx_runtime.JSX.Element;
    readonly id: "errors";
    readonly component: react_jsx_runtime.JSX.Element;
    readonly hideTimeline: false;
}, {
    readonly name: "Network";
    readonly icon: react_jsx_runtime.JSX.Element;
    readonly id: "network";
    readonly component: react_jsx_runtime.JSX.Element;
    readonly hideTimeline: true;
}, {
    readonly name: "Settings";
    readonly icon: react_jsx_runtime.JSX.Element;
    readonly id: "settings";
    readonly component: react_jsx_runtime.JSX.Element;
    readonly hideTimeline: false;
}];

interface TerminalOutput {
    type: "output" | "command" | "error";
    value: string;
}
interface Terminal {
    id: number;
    locked: boolean;
    history: string[];
    output: TerminalOutput[];
    processId?: number;
}

interface NormalRedirectEvent {
    type: "REDIRECT";
    to: string;
    search: string;
    hash: string;
    method: "GET";
    id: string;
    responseData?: Record<string, any>;
}
interface FetcherRedirectEvent extends Omit<NormalRedirectEvent, "type"> {
    type: "FETCHER_REDIRECT";
}
interface FetcherSubmissionEvent extends Omit<FormSubmissionEvent, "type" | "from"> {
    type: "FETCHER_SUBMIT";
    key?: string;
    responseData?: Record<string, any>;
}
interface FetcherSubmissionResponseEvent extends Omit<FormSubmissionEvent, "type" | "from"> {
    type: "FETCHER_RESPONSE";
    key?: string;
    responseData?: Record<string, any>;
}
interface FormSubmissionEvent {
    type: "FORM_SUBMISSION";
    id: string;
    to: string;
    data?: Record<string, any>;
    responseData?: Record<string, any>;
    method: "get" | "post" | "put" | "patch" | "delete" | "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    from: string;
    encType?: FormEncType;
}
interface ActionRedirectEvent extends Omit<FormSubmissionEvent, "type"> {
    type: "ACTION_REDIRECT";
}
interface ActionResponseEvent extends Omit<FormSubmissionEvent, "type"> {
    type: "ACTION_RESPONSE";
}
type RedirectEvent = NormalRedirectEvent | FetcherRedirectEvent;
type FormEvent = FormSubmissionEvent | FetcherSubmissionEvent | ActionRedirectEvent | FetcherSubmissionResponseEvent | ActionResponseEvent;
type TimelineEvent = RedirectEvent | FormEvent;

declare const ROUTE_BOUNDARY_GRADIENTS: {
    readonly sea: "sea-gradient";
    readonly hyper: "hyper-gradient";
    readonly gotham: "gotham-gradient";
    readonly gray: "gray-gradient";
    readonly watermelon: "watermelon-gradient";
    readonly ice: "ice-gradient";
    readonly silver: "silver-gradient";
};
type RouteWildcards = Record<string, Record<string, string> | undefined>;
type TriggerPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right" | "middle-left" | "middle-right";
type ServerRouteInfo = {
    actions?: Omit<ActionEvent["data"], "id">[];
    loaders?: Omit<LoaderEvent["data"], "id">[];
    lowestExecutionTime: number;
    highestExecutionTime: number;
    averageExecutionTime: number;
    loaderTriggerCount: number;
    actionTriggerCount: number;
    lastAction: Partial<Omit<ActionEvent["data"], "id">>;
    lastLoader: Partial<Omit<LoaderEvent["data"], "id">>;
};
type ServerInfo = {
    port?: number;
    routes?: {
        [key: string]: ServerRouteInfo;
    };
};
type HTMLErrorPrimitive = {
    file?: string;
    tag: string;
};
type HTMLError = {
    child: HTMLErrorPrimitive;
    parent: HTMLErrorPrimitive;
};
type ReactRouterDevtoolsState = {
    timeline: TimelineEvent[];
    terminals: Terminal[];
    settings: {
        /**
         * Enables the bippy inspector to inspect react components
         */
        enableInspector: boolean;
        /**
         * The breakpoints to show in the corner so you can see the current breakpoint that you defined
         */
        breakpoints: {
            name: string;
            min: number;
            max: number;
        }[];
        /**
         * Whether to show the breakpoint indicator
         */
        showBreakpointIndicator: boolean;
        /**
         * The live urls to show in the corner which allow you to open the app in a different environment (eg. staging, production)
         * @default []
         */
        liveUrls: {
            url: string;
            name: string;
        }[];
        /**
         * The position of the live urls
         * @default "bottom-left"
         */
        liveUrlsPosition: "bottom-left" | "bottom-right" | "top-left" | "top-right";
        /**
         * The route boundary gradient color to use
         * @default "silver"
         */
        editorName: string;
        /**
         * The route boundary gradient color to use
         * @default "watermelon"
         */
        routeBoundaryGradient: keyof typeof ROUTE_BOUNDARY_GRADIENTS;
        routeWildcards: RouteWildcards;
        activeTab: Tabs;
        height: number;
        /**
         * The maximum height of the panel
         * @default 800
         */
        maxHeight: number;
        /**
         * The minimum height of the panel
         * @default 200
         */
        minHeight: number;
        /**
         * Whether the dev tools should be open by default
         * @default false
         */
        defaultOpen: boolean;
        /**
         * Whether the dev tools trigger should be hidden until the user hovers over it
         * @default false
         */
        hideUntilHover: boolean;
        /**
         * The position of the trigger button
         * @default "bottom-right"
         */
        position: TriggerPosition;
        /**
         * The initial expansion level of the JSON viewer objects
         * @default 1
         */
        expansionLevel: number;
        hoveredRoute: string;
        isHoveringRoute: boolean;
        routeViewMode: "list" | "tree";
        /**
         * The location of the panel once it is open
         * @default "bottom"
         */
        panelLocation: "top" | "bottom";
        withServerDevTools: boolean;
        /**
         * The hotkey to open the dev tools
         * @default "shift+a"
         */
        openHotkey: string;
        /**
         * Whether to require the URL flag to open the dev tools
         * @default false
         */
        requireUrlFlag: boolean;
        /**
         * The URL flag to open the dev tools, used in conjunction with requireUrlFlag (if set to true)
         * @default "rdt"
         */
        urlFlag: string;
        /**
         * Whether to show route boundaries on hover of the route segment or clicking a button
         */
        showRouteBoundariesOn: "hover" | "click";
    };
    htmlErrors: HTMLError[];
    server?: ServerInfo;
    persistOpen: boolean;
    detachedWindow: boolean;
    detachedWindowOwner: boolean;
};

type RdtClientConfig = Pick<ReactRouterDevtoolsState["settings"], "defaultOpen" | "breakpoints" | "showBreakpointIndicator" | "showRouteBoundariesOn" | "expansionLevel" | "liveUrls" | "position" | "height" | "minHeight" | "maxHeight" | "hideUntilHover" | "panelLocation" | "requireUrlFlag" | "openHotkey" | "urlFlag" | "enableInspector" | "routeBoundaryGradient">;

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

interface DevToolsServerConfig {
    /**
     * Whether to log in the console, this turns off ALL logging
     * If you want to be granulat use the logs option
     * @default true
     */
    silent?: boolean;
    /**
     * The threshold for server timings to be logged in the console
     * If the server timing is greater than this threshold, it will be logged in red, otherwise it will be logged in green
     * @default Number.POSITIVE_INFINITY
     *
     */
    serverTimingThreshold?: number;
    logs?: {
        /**
         * Whether to log cookie headers in the console
         * @default true
         */
        cookies?: boolean;
        /**
         * Whether to log deferred loaders  in the console
         * @default true
         */
        defer?: boolean;
        /**
         * Whether to log action calls in the console
         * @default true
         * */
        actions?: boolean;
        /**
         * Whether to log loader calls in the console
         * @default true
         */
        loaders?: boolean;
        /**
         * Whether to log cache headers in the console
         * @default true
         */
        cache?: boolean;
        /**
         * Whether to log site clear headers in the console
         * @default true
         */
        siteClear?: boolean;
        /**
         * Whether to log server timings headers in the console
         * @default true
         */
        serverTimings?: boolean;
    };
}
declare global {
    namespace NodeJS {
        interface Process {
            rdt_config: DevToolsServerConfig;
            rdt_port: number;
        }
    }
}

declare global {
    interface Window {
        RDT_MOUNTED: boolean;
    }
    namespace NodeJS {
        interface Process {
            rdt_config: DevToolsServerConfig;
            rdt_port: number;
        }
    }
}

type RdtPlugin = (...args: any) => Tab;
declare module "react-router" {
    interface LoaderFunctionArgs {
        devTools?: ExtendedContext;
    }
    interface ActionFunctionArgs {
        devTools?: ExtendedContext;
    }
}

interface ReactRouterDevtoolsProps {
    plugins?: (Tab | RdtPlugin)[];
    config?: RdtClientConfig;
}

interface EmbeddedDevToolsProps extends ReactRouterDevtoolsProps {
    mainPanelClassName?: string;
    className?: string;
}
declare const EmbeddedDevTools: ({ plugins, mainPanelClassName, className }: EmbeddedDevToolsProps) => react_jsx_runtime.JSX.Element | null;

declare const defineClientConfig: (config: RdtClientConfig) => RdtClientConfig;
/**
 *
 * @description Injects the dev tools into the Vite App, ONLY meant to be used by the package plugin, do not use this yourself!
 */
declare const withViteDevTools: (Component: any, config?: ReactRouterDevtoolsProps) => (props: any) => react_jsx_runtime.JSX.Element;

declare const withClientLoaderWrapper: (clientLoader: (args: ClientLoaderFunctionArgs) => any, routeId: string) => (args: ClientLoaderFunctionArgs | ClientActionFunctionArgs) => Promise<any>;
declare const withLinksWrapper: (links: LinksFunction, rdtStylesheet: string) => LinksFunction;
declare const withClientActionWrapper: (clientAction: (args: ClientActionFunctionArgs) => any, routeId: string) => (args: ClientLoaderFunctionArgs | ClientActionFunctionArgs) => Promise<any>;

export { EmbeddedDevTools, defineClientConfig, withClientActionWrapper, withClientLoaderWrapper, withLinksWrapper, withViteDevTools };
