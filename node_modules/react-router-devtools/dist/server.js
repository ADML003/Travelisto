// src/server/config.ts
var defineServerConfig = (config) => config;
var getConfig = () => process.rdt_config ?? { silent: true };

// src/server/utils.ts
import chalk2 from "chalk";

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

// src/server/logger.ts
import chalk from "chalk";
var log = (message) => {
  const config = getConfig();
  if (config.silent) {
    return;
  }
  console.log(message);
};
var errorLog = (message) => {
  log(`${chalk.redBright.bold("ERROR")} ${message}`);
};
var redirectLog = (message) => {
  log(`${chalk.yellowBright.bold("REDIRECT")} ${message}`);
};
var infoLog = (message) => {
  log(`${chalk.blueBright.bold("INFO")} ${message}`);
};
var loaderLog = (message) => {
  const config = getConfig();
  if (config.logs?.loaders === false) {
    return;
  }
  const messageToLog = `${chalk.green.bold("LOADER")} ${message}`;
  log(messageToLog);
  return messageToLog;
};
var actionLog = (message) => {
  const config = getConfig();
  if (config.logs?.actions === false) {
    return;
  }
  const messageToLog = `${chalk.yellowBright.bold("ACTION")} ${message}`;
  log(messageToLog);
  return messageToLog;
};

// src/server/perf.ts
var diffInMs = (start, end = performance.now()) => Number((end - start).toFixed(2));
var secondsToHuman = (s) => {
  if (s > 3600) {
    const hours = Math.floor(s / 3600);
    const minutes = Math.floor(s % 3600 / 60);
    const seconds = Math.floor(s % 3600 % 60);
    const minutesString = minutes < 10 ? `0${minutes}` : minutes;
    const secondsString = seconds < 10 ? `0${seconds}` : seconds;
    if (minutes === 0 && seconds === 0) return `${hours}h`;
    if (seconds === 0) return `${hours}:${minutesString}:${secondsString}h`;
    return `${hours}:${minutesString}:${secondsString}h`;
  }
  if (s > 60) {
    const minutes = Math.floor(s / 60);
    const seconds = Math.floor(s % 60);
    const secondsString = seconds < 10 ? `0${seconds}` : seconds;
    if (seconds === 0 && minutes === 60) return "1h";
    if (seconds === 0) return `${minutes}m`;
    return `${minutes}:${secondsString}m`;
  }
  if (s === 60) return "1m";
  return `${s}s`;
};

// src/server/utils.ts
var analyzeCookies = (routeId, config, headers) => {
  if (config.logs?.cookies === false) {
    return;
  }
  if (headers.get("Set-Cookie")) {
    infoLog(`\u{1F36A} Cookie set by ${chalk2.blueBright(routeId)}`);
  }
};
var analyzeCache = (routeId, config, headers) => {
  if (config.logs?.cache === false) {
    return;
  }
  if (headers.get("Cache-Control")) {
    const cacheDuration = headers.get("Cache-Control")?.split(" ").map((x) => x.trim().replace(",", ""));
    const age = cacheDuration?.find((x) => x.includes("max-age"));
    const serverAge = cacheDuration?.find((x) => x.includes("s-maxage"));
    const isPrivate = cacheDuration?.find((x) => x.includes("private"));
    if (age && serverAge && !isPrivate) {
      const duration = serverAge.split("=")[1];
      const durationNumber = Number.isNaN(Number.parseInt(duration)) ? 0 : Number.parseInt(duration);
      return infoLog(
        `\u{1F4E6} Route ${chalk2.blueBright(routeId)} cached for ${chalk2.green(secondsToHuman(durationNumber))} ${chalk2.green(
          "[Shared Cache]"
        )}`
      );
    }
    if (age) {
      const duration = age.split("=")[1];
      const durationNumber = Number.isNaN(Number.parseInt(duration)) ? 0 : Number.parseInt(duration);
      infoLog(
        `\u{1F4E6} Route ${chalk2.blueBright(routeId)} cached for ${chalk2.green(secondsToHuman(durationNumber))} ${chalk2.green(
          `[${isPrivate ? "Private Cache" : "Shared Cache"}]`
        )}`
      );
    }
    if (serverAge) {
      const duration = serverAge.split("=")[1];
      const durationNumber = Number.isNaN(Number.parseInt(duration)) ? 0 : Number.parseInt(duration);
      infoLog(
        `\u{1F4E6} Route ${chalk2.blueBright(routeId)} cached for ${chalk2.green(secondsToHuman(durationNumber))} ${chalk2.green(
          "[Shared Cache]"
        )}`
      );
    }
  }
};
var analyzeClearSite = (routeId, config, headers) => {
  if (config.logs?.siteClear === false) {
    return;
  }
  if (headers.get("Clear-Site-Data")) {
    const data = headers.get("Clear-Site-Data");
    infoLog(`\u{1F9F9} Site data cleared by ${chalk2.blueBright(routeId)} ${chalk2.green(`[${data}]`)}`);
  }
};
var analyzeServerTimings = (routeId, config, headers) => {
  if (config.logs?.serverTimings === false) {
    return;
  }
  const data = headers.get("Server-Timing");
  if (data) {
    const splitEntries = data.split(",");
    for (const entry of splitEntries) {
      const segments = entry.split(";");
      let name = null;
      let desc = null;
      let dur = null;
      for (const segment of segments) {
        const [key, value] = segment.split("=");
        if (key === "desc") {
          desc = value;
        } else if (key === "dur") {
          dur = Number(value);
        } else {
          name = segment.trim();
        }
      }
      if (!name || dur === null) {
        return;
      }
      const threshold = config.serverTimingThreshold ?? Number.POSITIVE_INFINITY;
      const overThreshold = dur >= threshold;
      const durationColor = overThreshold ? chalk2.redBright : chalk2.green;
      infoLog(
        `\u23F0  Server timing for route ${chalk2.blueBright(routeId)} - ${chalk2.cyanBright(name)} ${durationColor(`[${dur}ms]`)} ${desc ? chalk2.yellow(`[${desc}]`) : ""}`.trim()
      );
    }
  }
};
var analyzeHeaders = (routeId, response) => {
  const headers = new Headers(
    isDataFunctionResponse(response) && response.init ? response.init.headers : response instanceof Response ? response.headers : {}
  );
  const config = getConfig();
  analyzeCookies(routeId, config, headers);
  analyzeCache(routeId, config, headers);
  analyzeClearSite(routeId, config, headers);
  analyzeServerTimings(routeId, config, headers);
};
var logDeferredObject = (response, id, start, preKey = "") => {
  let hasPromises = false;
  const deferredKeys = [];
  for (const [key, value] of Object.entries(isDataFunctionResponse(response) ? response.data : response)) {
    if (value instanceof Promise) {
      deferredKeys.push(preKey ? `${preKey}.${key}` : key);
      hasPromises = true;
      value.then((val) => {
        const end = diffInMs(start);
        infoLog(
          `Promise ${chalk2.white(preKey ? `${preKey}.${key}` : key)} resolved in ${chalk2.blueBright(id)} - ${chalk2.white(`${end}ms`)}`
        );
        logDeferredObject(val, id, start, preKey ? `${preKey}.${key}` : key);
      }).catch((e) => {
        errorLog(`Promise ${chalk2.white(preKey ? `${preKey}.${key}` : key)} rejected in ${chalk2.blueBright(id)}`);
        errorLog(e?.message ? e.message : e);
      });
    }
  }
  if (hasPromises) {
    infoLog(`Promises detected in ${chalk2.blueBright(id)} - ${chalk2.white(deferredKeys.join(", "))}`);
  }
};
var analyzeDeferred = (id, start, response) => {
  const config = getConfig();
  if (config.logs?.defer === false || config.silent) {
    return;
  }
  if (!response || response instanceof Response || typeof response !== "object") {
    return;
  }
  logDeferredObject(response, id, start);
};
var unAwaited = async (promise) => {
  promise();
};
var errorHandler = (routeId, e, shouldThrow = false) => {
  unAwaited(() => {
    if (isDataFunctionResponse(e)) {
      const headers = new Headers(e.init?.headers);
      const location = headers.get("Location");
      if (location) {
        redirectLog(`${chalk2.blueBright(routeId)} threw a response!`);
        redirectLog(`${chalk2.blueBright(routeId)} redirected to ${chalk2.green(location)}`);
      } else {
        errorLog(`${chalk2.blueBright(routeId)} threw a response!`);
        if (e.init?.status) {
          errorLog(`${chalk2.blueBright(routeId)} responded with ${chalk2.white(e.init.status)}`);
        }
      }
      return;
    }
    if (e instanceof Response) {
      const headers = new Headers(e.headers);
      const location = headers.get("Location");
      if (location) {
        redirectLog(`${chalk2.blueBright(routeId)} threw a response!`);
        redirectLog(`${chalk2.blueBright(routeId)} redirected to ${chalk2.green(location)}`);
      } else {
        errorLog(`${chalk2.blueBright(routeId)} threw a response!`);
        if (e.status) {
          errorLog(`${chalk2.blueBright(routeId)} responded with ${chalk2.white(e.status)}`);
        }
      }
    } else {
      errorLog(`${chalk2.blueBright(routeId)} threw an error!`);
      errorLog(`${e?.message ?? e}`);
    }
  });
  if (shouldThrow) {
    throw e;
  }
};
var logTrigger = (id, type, end) => {
  if (type === "action") {
    actionLog(`${chalk2.blueBright(id)} triggered - ${chalk2.white(`${end}ms`)}`);
  } else {
    loaderLog(`${chalk2.blueBright(id)} triggered - ${chalk2.white(`${end}ms`)}`);
  }
};
var extractHeadersFromResponseOrRequest = (response) => {
  if (!isDataFunctionResponse(response) && !(response instanceof Response) && !(response instanceof Request)) {
    return null;
  }
  const headers = new Headers(!isDataFunctionResponse(response) ? response.headers : response.init?.headers);
  return Object.fromEntries(headers.entries());
};
var storeAndEmitActionOrLoaderInfo = async (type, routeId, response, end, args) => {
  const responseHeaders = extractHeadersFromResponseOrRequest(response);
  const requestHeaders = extractHeadersFromResponseOrRequest(args.request);
  const event = {
    type,
    data: {
      id: routeId,
      executionTime: end,
      timestamp: (/* @__PURE__ */ new Date()).getTime(),
      responseData: isDataFunctionResponse(response) ? response.data : response,
      requestHeaders,
      responseHeaders
    }
  };
  if (typeof process === "undefined") {
    return;
  }
  const port = process.rdt_port;
  if (port) {
    fetch(`http://localhost:${port}/react-router-devtools-request`, {
      method: "POST",
      body: JSON.stringify(event, bigIntReplacer)
    }).then(async (res) => {
      if (res.ok) {
        await res.text();
      }
    }).catch(() => {
    });
  }
};
var isDataFunctionResponse = (res) => {
  return res?.type && res.type === "DataWithResponseInit" && res.data && res.init;
};
var analyzeLoaderOrAction = (routeId, type, loaderOrAction) => async (args) => {
  const start = performance.now();
  const response = loaderOrAction(args);
  const headers = Object.fromEntries(args.request.headers.entries());
  const startTime = Date.now();
  sendEvent({
    type,
    headers,
    startTime,
    method: args.request.method,
    url: args.request.url,
    id: routeId
  });
  let aborted = false;
  args.request.signal.addEventListener("abort", () => {
    aborted = true;
    sendEvent({
      type,
      url: args.request.url,
      headers,
      startTime,
      endTime: Date.now(),
      id: routeId,
      method: args.request.method,
      aborted: true
    });
  });
  try {
    const res = await response;
    unAwaited(() => {
      const end = diffInMs(start);
      const endTime = Date.now();
      storeAndEmitActionOrLoaderInfo(type, routeId, res, end, args);
      logTrigger(routeId, type, end);
      analyzeDeferred(routeId, start, res);
      analyzeHeaders(routeId, res);
      if (!aborted) {
        sendEvent({
          type,
          headers,
          startTime,
          endTime,
          data: res,
          id: routeId,
          url: args.request.url,
          method: args.request.method,
          status: res && typeof res === "object" ? res.status : void 0
        });
      }
    });
    return res;
  } catch (err) {
    errorHandler(routeId, err, true);
  }
};

// src/server/hof.ts
var withLoaderWrapper = (loader, id) => {
  return analyzeLoaderOrAction(id, "loader", loader);
};
var withActionWrapper = (action, id) => {
  return analyzeLoaderOrAction(id, "action", action);
};
export {
  defineServerConfig,
  withActionWrapper,
  withLoaderWrapper
};
