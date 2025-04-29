// src/shared/bigint-util.ts
var bigIntReplacer = (key, value) => typeof value === "bigint" ? value.toString() : value;

// src/shared/send-event.ts
var sendEvent = (event) => {
  if (typeof process === "undefined") {
    return;
  }
  const port = process.rdt_port;
  if (port) {
    fetch(`http://localhost:${port}/react-router-devtools-request`, {
      method: "POST",
      body: JSON.stringify({ routine: "request-event", ...event }, bigIntReplacer)
    }).then(async (res) => {
      if (res.ok) {
        await res.text();
      }
    }).catch(() => {
    });
  }
};

// src/context/tracing.ts
var traceEvent = (type, args) => async (name, event) => {
  const isServer = type === "action" || type === "loader";
  const emitEventFunction = isServer ? sendEvent : (data2) => import.meta.hot?.send("request-event", data2);
  const startTime = Date.now();
  emitEventFunction({
    type: "custom-event",
    startTime,
    url: args.request.url,
    id: `${name}`,
    headers: {},
    method: args.request.method
  });
  const data = await event();
  emitEventFunction({
    type: "custom-event",
    startTime,
    endTime: Date.now(),
    url: args.request.url,
    id: `${name}`,
    headers: {},
    method: args.request.method,
    data
  });
  return data;
};
var traceStart = (type, args) => (name) => {
  const isServer = type === "action" || type === "loader";
  const emitEventFunction = isServer ? sendEvent : (data) => import.meta.hot?.send("request-event", data);
  const startTime = Date.now();
  emitEventFunction({
    type: "custom-event",
    startTime,
    url: args.request.url,
    id: `${name}`,
    headers: {},
    method: args.request.method
  });
  return startTime;
};
var traceEnd = (type, args) => (name, startTime, data) => {
  const isServer = type === "action" || type === "loader";
  const emitEventFunction = isServer ? sendEvent : (data2) => import.meta.hot?.send("request-event", data2);
  emitEventFunction({
    type: "custom-event",
    startTime,
    endTime: Date.now(),
    url: args.request.url,
    id: `${name}`,
    headers: {},
    method: args.request.method,
    data
  });
  return data;
};

// src/context/extend-context.ts
var extendContextObject = (routeId, type, args) => {
  return {
    // Current route ID
    routeId,
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
      trace: traceEvent(type, args),
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
      start: traceStart(type, args),
      /**
       * end is a function that will end a trace for the name provided to it and return the end time
       *
       * @param name - The name of the event
       * @param startTime - The start time of the sendEvent
       * @param data - The data to be sent with the event
       * @returns The data provided in the last parameter
       */
      end: traceEnd(type, args)
    }
  };
};
var extendContext = (routeId, type, loaderOrAction) => async (args) => {
  const devTools = extendContextObject(routeId, type, args);
  const res = await loaderOrAction({
    ...args,
    devTools
  });
  return res;
};
var withLoaderContextWrapper = (loader, id) => {
  return extendContext(id, "loader", loader);
};
var withActionContextWrapper = (action, id) => {
  return extendContext(id, "action", action);
};
var withClientLoaderContextWrapper = (loader, id) => {
  return extendContext(id, "client-loader", loader);
};
var withClientActionContextWrapper = (action, id) => {
  return extendContext(id, "client-action", action);
};
export {
  withActionContextWrapper,
  withClientActionContextWrapper,
  withClientLoaderContextWrapper,
  withLoaderContextWrapper
};
