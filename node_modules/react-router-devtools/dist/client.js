// src/client/embedded-dev-tools.tsx
import clsx17 from "clsx";
import { useEffect as useEffect22, useState as useState14 } from "react";
import { useLocation as useLocation2 } from "react-router";

// src/client/context/RDTContext.tsx
import { createContext, useEffect as useEffect2, useMemo, useReducer } from "react";

// src/shared/bigint-util.ts
var bigIntReplacer = (key, value) => typeof value === "bigint" ? value.toString() : value;
var convertBigIntToString = (data) => {
  if (typeof data === "bigint") {
    return data.toString();
  }
  if (Array.isArray(data)) {
    return data.map((item) => convertBigIntToString(item));
  }
  if (data !== null && typeof data === "object") {
    return Object.fromEntries(Object.entries(data).map(([key, value]) => [key, convertBigIntToString(value)]));
  }
  return data;
};

// src/client/hooks/detached/useRemoveBody.ts
import { useEffect } from "react";

// src/client/utils/storage.ts
var getStorageItem = (key) => localStorage.getItem(key);
var setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    return;
  }
};
var getSessionItem = (key) => sessionStorage.getItem(key);
var setSessionItem = (key, value) => {
  try {
    sessionStorage.setItem(key, value);
  } catch (e) {
    return;
  }
};
var getBooleanFromStorage = (key) => getStorageItem(key) === "true";
var getBooleanFromSession = (key) => getSessionItem(key) === "true";
var REACT_ROUTER_DEV_TOOLS = "react_router_devtools";
var REACT_ROUTER_DEV_TOOLS_STATE = "react_router_devtools_state";
var REACT_ROUTER_DEV_TOOLS_SETTINGS = "react_router_devtools_settings";
var REACT_ROUTER_DEV_TOOLS_DETACHED = "react_router_devtools_detached";
var REACT_ROUTER_DEV_TOOLS_DETACHED_OWNER = "react_router_devtools_detached_owner";
var REACT_ROUTER_DEV_TOOLS_IS_DETACHED = "react_router_devtools_is_detached";
var REACT_ROUTER_DEV_TOOLS_CHECK_DETACHED = "react_router_devtools_check_detached";

// src/client/hooks/detached/useRemoveBody.ts
var useRemoveBody = (state) => {
  useEffect(() => {
    if (!state.detachedWindow) {
      return;
    }
    const elements = document.body.children;
    document.body.classList.add("bg-[#212121]");
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (element.id !== REACT_ROUTER_DEV_TOOLS) {
        element.classList.add("hidden");
      }
    }
  }, [state]);
};

// src/client/utils/detached.ts
var checkIsDetachedWindow = () => getBooleanFromSession(REACT_ROUTER_DEV_TOOLS_DETACHED);
var checkIsDetached = () => getBooleanFromStorage(REACT_ROUTER_DEV_TOOLS_IS_DETACHED);
var checkIsDetachedOwner = () => getBooleanFromSession(REACT_ROUTER_DEV_TOOLS_DETACHED_OWNER);

// src/client/utils/sanitize.ts
var convertReactRouterPathToUrl = (routes, route) => {
  let currentRoute = route;
  const path = [];
  while (currentRoute) {
    path.push(currentRoute.path);
    if (!currentRoute.parentId) break;
    if (!routes[currentRoute.parentId]) break;
    currentRoute = routes[currentRoute.parentId];
  }
  const output = path.reverse().filter(Boolean).join("/");
  return output === "" ? "/" : output;
};
var findParentErrorBoundary = (routes, route) => {
  let currentRoute = route;
  while (currentRoute) {
    const hasErrorBoundary = currentRoute.hasErrorBoundary;
    if (hasErrorBoundary) return { hasErrorBoundary, errorBoundaryId: currentRoute.id };
    if (!currentRoute.parentId) break;
    if (!routes[currentRoute.parentId]) break;
    currentRoute = routes[currentRoute.parentId];
  }
  return { hasErrorBoundary: false, errorBoundaryId: null };
};
var tryParseJson = (json) => {
  if (!json) return void 0;
  try {
    return JSON.parse(json);
  } catch (e) {
    return void 0;
  }
};
var constructTree = (routes, parentId) => {
  const nodes = [];
  const routeKeys = Object.keys(routes);
  for (const key of routeKeys) {
    const route = routes[key];
    if (route.parentId === parentId) {
      const url = convertReactRouterPathToUrl(routes, route);
      const node = {
        name: url,
        attributes: {
          ...route,
          url
        },
        errorBoundary: findParentErrorBoundary(routes, route),
        children: constructTree(routes, route.id)
      };
      nodes.push(node);
    }
  }
  return nodes;
};
var createRouteTree = (routes) => {
  return constructTree(routes);
};
var uppercaseFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// src/client/utils/common.ts
var cutArrayToLastN = (arr, n) => {
  if (arr.length < n) return arr;
  return arr.slice(arr.length - n);
};
var cutArrayToFirstN = (arr, n) => {
  if (arr.length < n) return arr;
  return arr.slice(0, n);
};

// src/client/context/rdtReducer.ts
var defaultServerRouteState = {
  highestExecutionTime: 0,
  lowestExecutionTime: 0,
  averageExecutionTime: 0,
  loaderTriggerCount: 0,
  actionTriggerCount: 0,
  lastAction: {},
  lastLoader: {},
  loaders: [],
  actions: []
};
var ROUTE_BOUNDARY_GRADIENTS = {
  sea: "sea-gradient",
  hyper: "hyper-gradient",
  gotham: "gotham-gradient",
  gray: "gray-gradient",
  watermelon: "watermelon-gradient",
  ice: "ice-gradient",
  silver: "silver-gradient"
};
var RouteBoundaryOptions = Object.keys(ROUTE_BOUNDARY_GRADIENTS);
var initialState = {
  timeline: [],
  terminals: [{ id: 0, locked: false, output: [], history: [] }],
  server: void 0,
  settings: {
    enableInspector: false,
    showRouteBoundariesOn: "click",
    breakpoints: [
      { name: "", min: 0, max: 639 },
      { name: "sm", min: 640, max: 767 },
      { name: "md", min: 768, max: 1023 },
      { name: "lg", min: 1024, max: 1279 },
      { name: "xl", min: 1280, max: 1535 },
      { name: "2xl", min: 1536, max: 9999 }
    ],
    showBreakpointIndicator: true,
    liveUrls: [],
    liveUrlsPosition: "bottom-left",
    editorName: "VSCode",
    routeBoundaryGradient: "watermelon",
    routeWildcards: {},
    activeTab: "page",
    height: 400,
    maxHeight: 600,
    minHeight: 200,
    defaultOpen: false,
    hideUntilHover: false,
    position: "bottom-right",
    expansionLevel: 1,
    hoveredRoute: "",
    isHoveringRoute: false,
    routeViewMode: "tree",
    panelLocation: "bottom",
    withServerDevTools: true,
    openHotkey: "shift+a",
    requireUrlFlag: false,
    urlFlag: "rdt"
  },
  htmlErrors: [],
  persistOpen: false,
  detachedWindow: false,
  detachedWindowOwner: false
};
var rdtReducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_DETACHED_WINDOW_OWNER":
      return {
        ...state,
        detachedWindowOwner: payload
      };
    case "SET_HTML_ERRORS":
      return {
        ...state,
        htmlErrors: [...payload]
      };
    case "SET_SERVER_INFO":
      return {
        ...state,
        server: payload
      };
    case "SET_SETTINGS":
      return {
        ...state,
        settings: {
          ...state.settings,
          ...payload
        }
      };
    case "SET_TIMELINE_EVENT":
      return {
        ...state,
        timeline: cutArrayToFirstN([payload, ...state.timeline], 30)
      };
    case "SET_WHOLE_STATE": {
      return {
        ...payload
      };
    }
    case "PURGE_TIMELINE":
      return {
        ...state,
        timeline: []
      };
    case "SET_IS_SUBMITTED":
      return {
        ...state,
        ...payload,
        isSubmitted: true
      };
    case "SET_PROCESS_ID":
      return {
        ...state,
        terminals: state.terminals.map((terminal) => {
          if (terminal.id === payload.terminalId) {
            return {
              ...terminal,
              processId: payload.processId
            };
          }
          return terminal;
        })
      };
    case "TOGGLE_TERMINAL_LOCK":
      return {
        ...state,
        terminals: state.terminals.map((terminal) => {
          if (terminal.id === payload.terminalId) {
            return {
              ...terminal,
              locked: payload.locked ?? !terminal.locked
            };
          }
          return terminal;
        })
      };
    case "ADD_OR_REMOVE_TERMINAL": {
      const terminalExists = state.terminals.some((terminal) => terminal.id === payload);
      if (terminalExists) {
        return {
          ...state,
          terminals: state.terminals.filter((terminal) => terminal.id !== payload).map((terminal, i) => ({ ...terminal, id: i }))
        };
      }
      return {
        ...state,
        terminals: [
          ...state.terminals,
          {
            id: state.terminals.length,
            locked: false,
            history: [],
            output: []
          }
        ]
      };
    }
    case "ADD_TERMINAL_OUTPUT":
      return {
        ...state,
        terminals: state.terminals.map((terminal) => {
          if (terminal.id === payload.terminalId) {
            return {
              ...terminal,
              output: [...terminal.output, payload.output]
            };
          }
          return terminal;
        })
      };
    case "CLEAR_TERMINAL_OUTPUT":
      return {
        ...state,
        terminals: state.terminals.map((terminal) => {
          if (terminal.id === payload) {
            return {
              ...terminal,
              output: []
            };
          }
          return terminal;
        })
      };
    case "ADD_TERMINAL_HISTORY":
      return {
        ...state,
        terminals: state.terminals.map((terminal) => {
          if (terminal.id === payload.terminalId) {
            return {
              ...terminal,
              history: [...terminal.history, payload.history]
            };
          }
          return terminal;
        })
      };
    case "SET_PERSIST_OPEN":
      return {
        ...state,
        persistOpen: payload
      };
    default:
      return state;
  }
};

// src/client/context/RDTContext.tsx
import { jsx } from "react/jsx-runtime";
var RDTContext = createContext({ state: initialState, dispatch: () => null });
RDTContext.displayName = "RDTContext";
var setIsDetachedIfRequired = () => {
  const isDetachedWindow = checkIsDetachedWindow();
  if (!isDetachedWindow && window.RDT_MOUNTED) {
    setSessionItem(REACT_ROUTER_DEV_TOOLS_DETACHED, "true");
  }
};
var resetIsDetachedCheck = () => {
  setStorageItem(REACT_ROUTER_DEV_TOOLS_CHECK_DETACHED, "false");
};
var detachedModeSetup = () => {
  resetIsDetachedCheck();
  setIsDetachedIfRequired();
  const isDetachedWindow = checkIsDetachedWindow();
  const isDetached = checkIsDetached();
  const isDetachedOwner = checkIsDetachedOwner();
  if (isDetachedWindow && !isDetached) {
    window.close();
  }
  if (!isDetached && isDetachedOwner) {
  }
  return {
    detachedWindow: window.RDT_MOUNTED ?? isDetachedWindow,
    detachedWindowOwner: isDetachedOwner
  };
};
var getSettings = () => {
  const settingsString = getStorageItem(REACT_ROUTER_DEV_TOOLS_SETTINGS);
  const settings = tryParseJson(settingsString);
  return {
    ...settings
  };
};
var getExistingStateFromStorage = (config) => {
  const existingState = getStorageItem(REACT_ROUTER_DEV_TOOLS_STATE);
  const settings = getSettings();
  const { detachedWindow, detachedWindowOwner } = detachedModeSetup();
  const state = {
    ...initialState,
    ...existingState ? JSON.parse(existingState) : {},
    settings: {
      ...initialState.settings,
      ...config,
      ...settings,
      editorName: config?.editorName ?? initialState.settings.editorName,
      liveUrls: config?.liveUrls ?? initialState.settings.liveUrls,
      breakpoints: config?.breakpoints ?? initialState.settings.breakpoints
    },
    detachedWindow,
    detachedWindowOwner
  };
  return state;
};
var RDTContextProvider = ({ children, config }) => {
  const [state, dispatch] = useReducer(rdtReducer, getExistingStateFromStorage(config));
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  useRemoveBody(state);
  useEffect2(() => {
    const { settings, detachedWindow, detachedWindowOwner, ...rest } = state;
    setStorageItem(REACT_ROUTER_DEV_TOOLS_SETTINGS, JSON.stringify(settings));
    setStorageItem(REACT_ROUTER_DEV_TOOLS_STATE, JSON.stringify(rest, bigIntReplacer));
  }, [state]);
  return /* @__PURE__ */ jsx(RDTContext.Provider, { value, children });
};

// src/client/context/useRDTContext.ts
import { useCallback, useContext } from "react";
var useRDTContext = () => {
  const context = useContext(RDTContext);
  if (context === void 0) {
    throw new Error("useRDTContext must be used within a RDTContextProvider");
  }
  const { state, dispatch } = context;
  return {
    dispatch,
    state
  };
};
var useHtmlErrors = () => {
  const { state, dispatch } = useRDTContext();
  const { htmlErrors } = state;
  const setHtmlErrors = useCallback(
    (htmlErrors2) => {
      dispatch({
        type: "SET_HTML_ERRORS",
        payload: htmlErrors2
      });
    },
    [dispatch]
  );
  return { htmlErrors, setHtmlErrors };
};
var useServerInfo = () => {
  const { state, dispatch } = useRDTContext();
  const { server } = state;
  const setServerInfo = useCallback(
    (serverInfo) => {
      dispatch({
        type: "SET_SERVER_INFO",
        payload: {
          ...server,
          ...serverInfo,
          routes: {
            ...server?.routes,
            ...serverInfo?.routes
          }
        }
      });
    },
    [dispatch, server]
  );
  return { server, setServerInfo };
};
var useDetachedWindowControls = () => {
  const { state, dispatch } = useRDTContext();
  const { detachedWindow, detachedWindowOwner } = state;
  const setDetachedWindowOwner = useCallback(
    (isDetachedWindowOwner) => {
      dispatch({
        type: "SET_DETACHED_WINDOW_OWNER",
        payload: isDetachedWindowOwner
      });
    },
    [dispatch]
  );
  return {
    detachedWindow: detachedWindow || window.RDT_MOUNTED,
    detachedWindowOwner,
    setDetachedWindowOwner,
    isDetached: detachedWindow || detachedWindowOwner
  };
};
var useSettingsContext = () => {
  const { dispatch, state } = useRDTContext();
  const { settings } = state;
  const setSettings = useCallback(
    (settings2) => {
      dispatch({
        type: "SET_SETTINGS",
        payload: settings2
      });
    },
    [dispatch]
  );
  return { setSettings, settings };
};
var usePersistOpen = () => {
  const { dispatch, state } = useRDTContext();
  const { persistOpen } = state;
  const setPersistOpen = useCallback(
    (persistOpen2) => {
      dispatch({
        type: "SET_PERSIST_OPEN",
        payload: persistOpen2
      });
    },
    [dispatch]
  );
  return { persistOpen, setPersistOpen };
};
var useTimelineContext = () => {
  const { state, dispatch } = useRDTContext();
  const { timeline } = state;
  const setTimelineEvent = useCallback(
    (payload) => {
      dispatch({ type: "SET_TIMELINE_EVENT", payload });
    },
    [dispatch]
  );
  const clearTimeline = useCallback(() => {
    dispatch({ type: "PURGE_TIMELINE", payload: void 0 });
  }, [dispatch]);
  return { setTimelineEvent, timeline, clearTimeline };
};

// src/client/hooks/useReactTreeListeners.ts
import { onCommitFiberRoot, traverseFiber } from "bippy";
import { useCallback as useCallback2, useEffect as useEffect3, useRef } from "react";
import { useNavigation } from "react-router";
var ROUTE_CLASS = "outlet-route";
var isSourceElement = (fiberNode) => {
  return fiberNode?.elementType && fiberNode?.stateNode && fiberNode?._debugSource && !fiberNode?.stateNode?.getAttribute?.("data-source");
};
function useReactTreeListeners() {
  const invalidHtmlCollection = useRef([]);
  const { setHtmlErrors } = useHtmlErrors();
  const addToInvalidCollection = (entry) => {
    if (invalidHtmlCollection.current.find((item) => JSON.stringify(item) === JSON.stringify(entry))) return;
    invalidHtmlCollection.current.push(entry);
  };
  const navigation = useNavigation();
  const styleNearestElement = useCallback2((fiberNode) => {
    if (!fiberNode) return;
    if (fiberNode.stateNode) {
      return fiberNode.stateNode?.classList?.add(ROUTE_CLASS);
    }
    styleNearestElement(fiberNode?.child);
  }, []);
  const findIncorrectHtml = useCallback2(
    (fiberNode, originalFiberNode, originalTag) => {
      if (!fiberNode) return;
      const tag = fiberNode.elementType;
      const addInvalid = () => {
        const parentSource = originalFiberNode?._debugOwner?._debugSource ?? originalFiberNode?._debugSource;
        const source = fiberNode?._debugOwner?._debugSource ?? fiberNode?._debugSource;
        addToInvalidCollection({
          child: {
            file: parentSource?.fileName,
            tag
          },
          parent: {
            file: source?.fileName,
            tag: originalTag
          }
        });
      };
      if (originalTag === "a") {
        const element = fiberNode.stateNode;
        switch (tag) {
          case "a":
          case "button":
          case "details":
          case "embed":
          case "iframe":
          case "label":
          case "select":
          case "textarea": {
            addInvalid();
            break;
          }
          case "audio": {
            if (element.getAttribute("controls") !== null) {
              addInvalid();
            }
            break;
          }
          case "img": {
            if (element.getAttribute("usemap") !== null) {
              addInvalid();
            }
            break;
          }
          case "input": {
            if (element.getAttribute("type") !== "hidden") {
              addInvalid();
            }
            break;
          }
          case "object": {
            if (element.getAttribute("usemap") !== null) {
              addInvalid();
            }
            break;
          }
          case "video": {
            if (element.getAttribute("controls") !== null) {
              addInvalid();
            }
            break;
          }
          default: {
            break;
          }
        }
      }
      if (originalTag === "p") {
        switch (tag) {
          case "div":
          case "h1":
          case "h2":
          case "h3":
          case "h4":
          case "h5":
          case "h6":
          case "main":
          case "pre":
          case "p":
          case "section":
          case "table":
          case "ul":
          case "ol":
          case "li": {
            addInvalid();
            break;
          }
          default: {
            break;
          }
        }
      }
      if (originalTag === "form") {
        if (tag === "form") {
          addInvalid();
        }
      }
      if (["h1", "h2", "h3", "h4", "h5", "h6"].includes(originalTag)) {
        if (tag === "h1" || tag === "h2" || tag === "h3" || tag === "h4" || tag === "h5" || tag === "h6") {
          addInvalid();
        }
      }
      findIncorrectHtml(fiberNode?.child, originalFiberNode, originalTag);
      if (fiberNode?.sibling) {
        findIncorrectHtml(fiberNode?.sibling, originalFiberNode, originalTag);
      }
    },
    []
  );
  useEffect3(() => {
    if (navigation.state !== "idle") return;
    onCommitFiberRoot(
      (root) => traverseFiber(root.current, (fiberNode) => {
        if (isSourceElement(fiberNode) && typeof import.meta.hot !== "undefined") {
          const originalSource = fiberNode?._debugSource;
          const source = fiberNode?._debugOwner?._debugSource ?? fiberNode?._debugSource;
          const line = source?.fileName?.startsWith("/") ? originalSource?.lineNumber : source?.lineNumber;
          const fileName = source?.fileName?.startsWith("/") ? originalSource?.fileName : source?.fileName;
          fiberNode.stateNode?.setAttribute?.(
            "data-source",
            `${fileName}:::${line}`
            //
          );
        }
        if (fiberNode?.stateNode && fiberNode?.elementType === "form") {
          findIncorrectHtml(fiberNode.child, fiberNode, "form");
        }
        if (fiberNode?.stateNode && fiberNode?.elementType === "a") {
          findIncorrectHtml(fiberNode.child, fiberNode, "a");
        }
        if (fiberNode?.stateNode && fiberNode?.elementType === "p") {
          findIncorrectHtml(fiberNode.child, fiberNode, "p");
        }
        if (fiberNode?.stateNode && ["h1", "h2", "h3", "h4", "h5", "h6"].includes(fiberNode?.elementType)) {
          findIncorrectHtml(fiberNode.child, fiberNode, fiberNode?.elementType);
        }
        if (fiberNode?.elementType?.name === "default" || fiberNode?.elementType?.name === "RenderedRoute") {
          styleNearestElement(fiberNode);
        }
      })
    );
    setHtmlErrors(invalidHtmlCollection.current);
    invalidHtmlCollection.current = [];
  }, [navigation.state, styleNearestElement, findIncorrectHtml, setHtmlErrors]);
}

// src/client/hooks/useSetRouteBoundaries.ts
import { useCallback as useCallback3, useEffect as useEffect5 } from "react";
import { useMatches } from "react-router";

// src/client/hooks/useAttachListener.ts
import { useEffect as useEffect4, useRef as useRef2 } from "react";
var getAttachment = (target) => {
  switch (target) {
    case "window":
      return typeof window !== "undefined" ? window : null;
    case "document":
      return typeof document !== "undefined" ? document : null;
    case "body":
      return typeof document !== "undefined" ? document.body : null;
  }
};
var useAttachListener = (listener, attachTarget, fn, shouldAttach = true) => useAttachListenerToNode(listener, getAttachment(attachTarget), fn, shouldAttach);
var useAttachListenerToNode = (listener, node, fn, shouldAttach = true) => {
  const callbackRef = useRef2(fn);
  useEffect4(() => {
    callbackRef.current = fn;
  });
  useEffect4(() => {
    if (!shouldAttach) return;
    node?.addEventListener(listener, (e) => callbackRef.current(e));
    return () => node?.removeEventListener(listener, (e) => callbackRef.current(e));
  }, [listener, node, shouldAttach]);
};
var useAttachWindowListener = (listener, fn, shouldAttach = true) => {
  return useAttachListener(listener, "window", fn, shouldAttach);
};
var useAttachDocumentListener = (listener, fn, shouldAttach = true) => {
  return useAttachListener(listener, "document", fn, shouldAttach);
};

// src/client/hooks/useSetRouteBoundaries.ts
var useSetRouteBoundaries = () => {
  const matches = useMatches();
  const { settings, setSettings } = useSettingsContext();
  const { detachedWindow } = useDetachedWindowControls();
  const applyOrRemoveClasses = useCallback3(
    (isHovering) => {
      const hovering = isHovering ?? settings.isHoveringRoute;
      const classes = ["apply-tw", ROUTE_BOUNDARY_GRADIENTS[settings.routeBoundaryGradient]].join(" ");
      const isRoot = settings.hoveredRoute === "root";
      const elements = isRoot ? document.getElementsByTagName("body") : document.getElementsByClassName(ROUTE_CLASS);
      const element = isRoot ? elements.item(elements.length - 1) : elements.item(matches.length - 1 - Number.parseInt(settings.hoveredRoute));
      if (element) {
        const outlet = element;
        for (const classItem of classes.split(" ")) {
          outlet.classList[hovering ? "add" : "remove"](classItem);
        }
      }
    },
    [settings.hoveredRoute, settings.isHoveringRoute, settings.routeBoundaryGradient, matches.length]
  );
  useAttachListener("mouseleave", "document", () => {
    if (settings.showRouteBoundariesOn === "click") {
      return;
    }
    applyOrRemoveClasses();
    if (!detachedWindow) {
      return;
    }
    setSettings({
      isHoveringRoute: false
    });
  });
  useAttachListener("wheel", "window", () => {
    if (settings.showRouteBoundariesOn === "click") {
      return;
    }
    applyOrRemoveClasses(false);
    if (!detachedWindow) {
      return;
    }
    setSettings({
      isHoveringRoute: false
    });
  });
  useEffect5(() => {
    if (!settings.isHoveringRoute && !settings.hoveredRoute) return;
    applyOrRemoveClasses();
    if (!settings.isHoveringRoute && !detachedWindow) {
      setSettings({
        hoveredRoute: "",
        isHoveringRoute: false
      });
    }
  }, [
    settings.hoveredRoute,
    settings.isHoveringRoute,
    settings.routeBoundaryGradient,
    applyOrRemoveClasses,
    detachedWindow,
    setSettings
  ]);
};

// src/client/hooks/useTimelineHandler.ts
import { useEffect as useEffect6, useRef as useRef3 } from "react";
import { useActionData, useFetchers, useNavigation as useNavigation2 } from "react-router";
var uniqueId = () => (Math.random() * Date.now()).toString();
var convertFormDataToObject = (formData) => {
  const obj = {};
  if (!formData) {
    return void 0;
  }
  for (const key of formData.keys()) {
    if (key.includes(".")) {
      const [prefix, suffix] = key.split(".");
      if (Number.isNaN(Number.parseInt(suffix))) {
        obj[prefix] ??= {};
        for (const [_, element] of formData.getAll(key).entries()) {
          obj[prefix][suffix] = element;
        }
      } else {
        obj[prefix] ??= [];
        for (const [index, element] of formData.getAll(key).entries()) {
          if (index > 1) {
            obj[prefix][suffix] = [...obj[prefix][suffix], element];
          } else if (index === 1) {
            obj[prefix][suffix] = [obj[prefix][suffix], element];
          } else {
            obj[prefix][suffix] = element;
          }
        }
      }
    } else {
      for (const [index, element] of formData.getAll(key).entries()) {
        if (index > 1) {
          obj[key] = [...obj[key], element];
        } else if (index === 1) {
          obj[key] = [obj[key], element];
        } else {
          obj[key] = element;
        }
      }
    }
  }
  if (Object.keys(obj).length === 0) {
    return void 0;
  }
  return obj;
};
var useTimelineHandler = () => {
  const navigation = useNavigation2();
  const fetchers = useFetchers();
  const navigationEventQueue = useRef3([]);
  const { setTimelineEvent } = useTimelineContext();
  const responseData = useActionData();
  const { detachedWindow } = useDetachedWindowControls();
  useEffect6(() => {
    if (detachedWindow) {
      return;
    }
    const { state, location, formAction, formData, formMethod, formEncType } = navigation;
    if (state === "idle") {
      navigationEventQueue.current.map(
        (event) => setTimelineEvent({
          ...event,
          id: uniqueId()
        })
      );
      navigationEventQueue.current = [];
      return;
    }
    const { state: locState, pathname, search, hash } = location;
    const data = convertFormDataToObject(formData);
    if (state === "submitting") {
      navigationEventQueue.current.push({
        type: "FORM_SUBMISSION",
        from: pathname,
        to: formAction,
        method: formMethod,
        data,
        encType: formEncType,
        id: uniqueId()
      });
      return;
    }
    if (state === "loading") {
      if (formAction && formData && formMethod && locState?._isRedirect) {
        navigationEventQueue.current.push({
          type: "ACTION_REDIRECT",
          from: pathname,
          to: formAction,
          method: formMethod,
          data,
          encType: formEncType,
          responseData,
          id: uniqueId()
        });
        return;
      }
      if (formAction && formData && formMethod) {
        navigationEventQueue.current.push({
          type: "ACTION_RESPONSE",
          from: pathname,
          to: formAction,
          method: formMethod,
          data,
          encType: formEncType,
          responseData,
          id: uniqueId()
        });
        return;
      }
      navigationEventQueue.current.push({
        type: locState?._isFetchActionRedirect || locState?._isFetchLoaderRedirect ? "FETCHER_REDIRECT" : "REDIRECT",
        to: pathname,
        search,
        hash,
        method: "GET",
        id: uniqueId()
      });
      return;
    }
  }, [navigation, responseData, setTimelineEvent, detachedWindow]);
  const fetcherEventQueue = useRef3([]);
  useEffect6(() => {
    if (navigation.state !== "idle") return;
    const activeFetchers = fetchers.filter((f) => f.state !== "idle");
    if (activeFetchers.length === 0 && fetcherEventQueue.current.length > 0) {
      fetcherEventQueue.current.map(
        ({ position, ...event }) => setTimelineEvent({
          ...event,
          responseData: (
            // If the fetcher is a GET request, the response data is stored in the fetcher, otherwise it's already set at this point
            event.method === "GET" ? fetchers[position]?.data : event.responseData
          )
        })
      );
      fetcherEventQueue.current = [];
      return;
    }
    fetchers.forEach((fetcher, i) => {
      if (fetcher.state === "idle") return;
      const { data, formAction, formData, formEncType, formMethod, key: fetcherKey } = fetcher;
      if (formAction && formMethod) {
        const form = convertFormDataToObject(formData);
        const event = {
          type: fetcher.state === "loading" ? "FETCHER_RESPONSE" : "FETCHER_SUBMIT",
          to: formAction,
          method: formMethod,
          ...fetcherKey ? { fetcherKey } : {},
          data: form,
          encType: formEncType,
          responseData: fetcher.state === "submitting" ? void 0 : data,
          position: i,
          id: uniqueId()
        };
        fetcherEventQueue.current.push(event);
      }
    });
  }, [fetchers, navigation.state, setTimelineEvent]);
};

// src/client/layout/ContentPanel.tsx
import clsx14 from "clsx";
import { Fragment as Fragment6 } from "react";

// src/client/hooks/useTabs.ts
import { useMemo as useMemo5 } from "react";

// src/client/components/util.ts
import { clsx } from "clsx";

// node_modules/tailwind-merge/dist/bundle-mjs.mjs
var CLASS_PART_SEPARATOR = "-";
var createClassGroupUtils = (config) => {
  const classMap = createClassMap(config);
  const {
    conflictingClassGroups,
    conflictingClassGroupModifiers
  } = config;
  const getClassGroupId = (className) => {
    const classParts = className.split(CLASS_PART_SEPARATOR);
    if (classParts[0] === "" && classParts.length !== 1) {
      classParts.shift();
    }
    return getGroupRecursive(classParts, classMap) || getGroupIdForArbitraryProperty(className);
  };
  const getConflictingClassGroupIds = (classGroupId, hasPostfixModifier) => {
    const conflicts = conflictingClassGroups[classGroupId] || [];
    if (hasPostfixModifier && conflictingClassGroupModifiers[classGroupId]) {
      return [...conflicts, ...conflictingClassGroupModifiers[classGroupId]];
    }
    return conflicts;
  };
  return {
    getClassGroupId,
    getConflictingClassGroupIds
  };
};
var getGroupRecursive = (classParts, classPartObject) => {
  if (classParts.length === 0) {
    return classPartObject.classGroupId;
  }
  const currentClassPart = classParts[0];
  const nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
  const classGroupFromNextClassPart = nextClassPartObject ? getGroupRecursive(classParts.slice(1), nextClassPartObject) : void 0;
  if (classGroupFromNextClassPart) {
    return classGroupFromNextClassPart;
  }
  if (classPartObject.validators.length === 0) {
    return void 0;
  }
  const classRest = classParts.join(CLASS_PART_SEPARATOR);
  return classPartObject.validators.find(({
    validator
  }) => validator(classRest))?.classGroupId;
};
var arbitraryPropertyRegex = /^\[(.+)\]$/;
var getGroupIdForArbitraryProperty = (className) => {
  if (arbitraryPropertyRegex.test(className)) {
    const arbitraryPropertyClassName = arbitraryPropertyRegex.exec(className)[1];
    const property = arbitraryPropertyClassName?.substring(0, arbitraryPropertyClassName.indexOf(":"));
    if (property) {
      return "arbitrary.." + property;
    }
  }
};
var createClassMap = (config) => {
  const {
    theme,
    classGroups
  } = config;
  const classMap = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  for (const classGroupId in classGroups) {
    processClassesRecursively(classGroups[classGroupId], classMap, classGroupId, theme);
  }
  return classMap;
};
var processClassesRecursively = (classGroup, classPartObject, classGroupId, theme) => {
  classGroup.forEach((classDefinition) => {
    if (typeof classDefinition === "string") {
      const classPartObjectToEdit = classDefinition === "" ? classPartObject : getPart(classPartObject, classDefinition);
      classPartObjectToEdit.classGroupId = classGroupId;
      return;
    }
    if (typeof classDefinition === "function") {
      if (isThemeGetter(classDefinition)) {
        processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
        return;
      }
      classPartObject.validators.push({
        validator: classDefinition,
        classGroupId
      });
      return;
    }
    Object.entries(classDefinition).forEach(([key, classGroup2]) => {
      processClassesRecursively(classGroup2, getPart(classPartObject, key), classGroupId, theme);
    });
  });
};
var getPart = (classPartObject, path) => {
  let currentClassPartObject = classPartObject;
  path.split(CLASS_PART_SEPARATOR).forEach((pathPart) => {
    if (!currentClassPartObject.nextPart.has(pathPart)) {
      currentClassPartObject.nextPart.set(pathPart, {
        nextPart: /* @__PURE__ */ new Map(),
        validators: []
      });
    }
    currentClassPartObject = currentClassPartObject.nextPart.get(pathPart);
  });
  return currentClassPartObject;
};
var isThemeGetter = (func) => func.isThemeGetter;
var createLruCache = (maxCacheSize) => {
  if (maxCacheSize < 1) {
    return {
      get: () => void 0,
      set: () => {
      }
    };
  }
  let cacheSize = 0;
  let cache = /* @__PURE__ */ new Map();
  let previousCache = /* @__PURE__ */ new Map();
  const update = (key, value) => {
    cache.set(key, value);
    cacheSize++;
    if (cacheSize > maxCacheSize) {
      cacheSize = 0;
      previousCache = cache;
      cache = /* @__PURE__ */ new Map();
    }
  };
  return {
    get(key) {
      let value = cache.get(key);
      if (value !== void 0) {
        return value;
      }
      if ((value = previousCache.get(key)) !== void 0) {
        update(key, value);
        return value;
      }
    },
    set(key, value) {
      if (cache.has(key)) {
        cache.set(key, value);
      } else {
        update(key, value);
      }
    }
  };
};
var IMPORTANT_MODIFIER = "!";
var MODIFIER_SEPARATOR = ":";
var MODIFIER_SEPARATOR_LENGTH = MODIFIER_SEPARATOR.length;
var createParseClassName = (config) => {
  const {
    prefix,
    experimentalParseClassName
  } = config;
  let parseClassName = (className) => {
    const modifiers = [];
    let bracketDepth = 0;
    let parenDepth = 0;
    let modifierStart = 0;
    let postfixModifierPosition;
    for (let index = 0; index < className.length; index++) {
      let currentCharacter = className[index];
      if (bracketDepth === 0 && parenDepth === 0) {
        if (currentCharacter === MODIFIER_SEPARATOR) {
          modifiers.push(className.slice(modifierStart, index));
          modifierStart = index + MODIFIER_SEPARATOR_LENGTH;
          continue;
        }
        if (currentCharacter === "/") {
          postfixModifierPosition = index;
          continue;
        }
      }
      if (currentCharacter === "[") {
        bracketDepth++;
      } else if (currentCharacter === "]") {
        bracketDepth--;
      } else if (currentCharacter === "(") {
        parenDepth++;
      } else if (currentCharacter === ")") {
        parenDepth--;
      }
    }
    const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.substring(modifierStart);
    const baseClassName = stripImportantModifier(baseClassNameWithImportantModifier);
    const hasImportantModifier = baseClassName !== baseClassNameWithImportantModifier;
    const maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : void 0;
    return {
      modifiers,
      hasImportantModifier,
      baseClassName,
      maybePostfixModifierPosition
    };
  };
  if (prefix) {
    const fullPrefix = prefix + MODIFIER_SEPARATOR;
    const parseClassNameOriginal = parseClassName;
    parseClassName = (className) => className.startsWith(fullPrefix) ? parseClassNameOriginal(className.substring(fullPrefix.length)) : {
      isExternal: true,
      modifiers: [],
      hasImportantModifier: false,
      baseClassName: className,
      maybePostfixModifierPosition: void 0
    };
  }
  if (experimentalParseClassName) {
    const parseClassNameOriginal = parseClassName;
    parseClassName = (className) => experimentalParseClassName({
      className,
      parseClassName: parseClassNameOriginal
    });
  }
  return parseClassName;
};
var stripImportantModifier = (baseClassName) => {
  if (baseClassName.endsWith(IMPORTANT_MODIFIER)) {
    return baseClassName.substring(0, baseClassName.length - 1);
  }
  if (baseClassName.startsWith(IMPORTANT_MODIFIER)) {
    return baseClassName.substring(1);
  }
  return baseClassName;
};
var createSortModifiers = (config) => {
  const orderSensitiveModifiers = Object.fromEntries(config.orderSensitiveModifiers.map((modifier) => [modifier, true]));
  const sortModifiers = (modifiers) => {
    if (modifiers.length <= 1) {
      return modifiers;
    }
    const sortedModifiers = [];
    let unsortedModifiers = [];
    modifiers.forEach((modifier) => {
      const isPositionSensitive = modifier[0] === "[" || orderSensitiveModifiers[modifier];
      if (isPositionSensitive) {
        sortedModifiers.push(...unsortedModifiers.sort(), modifier);
        unsortedModifiers = [];
      } else {
        unsortedModifiers.push(modifier);
      }
    });
    sortedModifiers.push(...unsortedModifiers.sort());
    return sortedModifiers;
  };
  return sortModifiers;
};
var createConfigUtils = (config) => ({
  cache: createLruCache(config.cacheSize),
  parseClassName: createParseClassName(config),
  sortModifiers: createSortModifiers(config),
  ...createClassGroupUtils(config)
});
var SPLIT_CLASSES_REGEX = /\s+/;
var mergeClassList = (classList, configUtils) => {
  const {
    parseClassName,
    getClassGroupId,
    getConflictingClassGroupIds,
    sortModifiers
  } = configUtils;
  const classGroupsInConflict = [];
  const classNames = classList.trim().split(SPLIT_CLASSES_REGEX);
  let result = "";
  for (let index = classNames.length - 1; index >= 0; index -= 1) {
    const originalClassName = classNames[index];
    const {
      isExternal,
      modifiers,
      hasImportantModifier,
      baseClassName,
      maybePostfixModifierPosition
    } = parseClassName(originalClassName);
    if (isExternal) {
      result = originalClassName + (result.length > 0 ? " " + result : result);
      continue;
    }
    let hasPostfixModifier = !!maybePostfixModifierPosition;
    let classGroupId = getClassGroupId(hasPostfixModifier ? baseClassName.substring(0, maybePostfixModifierPosition) : baseClassName);
    if (!classGroupId) {
      if (!hasPostfixModifier) {
        result = originalClassName + (result.length > 0 ? " " + result : result);
        continue;
      }
      classGroupId = getClassGroupId(baseClassName);
      if (!classGroupId) {
        result = originalClassName + (result.length > 0 ? " " + result : result);
        continue;
      }
      hasPostfixModifier = false;
    }
    const variantModifier = sortModifiers(modifiers).join(":");
    const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
    const classId = modifierId + classGroupId;
    if (classGroupsInConflict.includes(classId)) {
      continue;
    }
    classGroupsInConflict.push(classId);
    const conflictGroups = getConflictingClassGroupIds(classGroupId, hasPostfixModifier);
    for (let i = 0; i < conflictGroups.length; ++i) {
      const group = conflictGroups[i];
      classGroupsInConflict.push(modifierId + group);
    }
    result = originalClassName + (result.length > 0 ? " " + result : result);
  }
  return result;
};
function twJoin() {
  let index = 0;
  let argument;
  let resolvedValue;
  let string = "";
  while (index < arguments.length) {
    if (argument = arguments[index++]) {
      if (resolvedValue = toValue(argument)) {
        string && (string += " ");
        string += resolvedValue;
      }
    }
  }
  return string;
}
var toValue = (mix) => {
  if (typeof mix === "string") {
    return mix;
  }
  let resolvedValue;
  let string = "";
  for (let k = 0; k < mix.length; k++) {
    if (mix[k]) {
      if (resolvedValue = toValue(mix[k])) {
        string && (string += " ");
        string += resolvedValue;
      }
    }
  }
  return string;
};
function createTailwindMerge(createConfigFirst, ...createConfigRest) {
  let configUtils;
  let cacheGet;
  let cacheSet;
  let functionToCall = initTailwindMerge;
  function initTailwindMerge(classList) {
    const config = createConfigRest.reduce((previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig), createConfigFirst());
    configUtils = createConfigUtils(config);
    cacheGet = configUtils.cache.get;
    cacheSet = configUtils.cache.set;
    functionToCall = tailwindMerge;
    return tailwindMerge(classList);
  }
  function tailwindMerge(classList) {
    const cachedResult = cacheGet(classList);
    if (cachedResult) {
      return cachedResult;
    }
    const result = mergeClassList(classList, configUtils);
    cacheSet(classList, result);
    return result;
  }
  return function callTailwindMerge() {
    return functionToCall(twJoin.apply(null, arguments));
  };
}
var fromTheme = (key) => {
  const themeGetter = (theme) => theme[key] || [];
  themeGetter.isThemeGetter = true;
  return themeGetter;
};
var arbitraryValueRegex = /^\[(?:(\w[\w-]*):)?(.+)\]$/i;
var arbitraryVariableRegex = /^\((?:(\w[\w-]*):)?(.+)\)$/i;
var fractionRegex = /^\d+\/\d+$/;
var tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
var lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
var colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/;
var shadowRegex = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
var imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
var isFraction = (value) => fractionRegex.test(value);
var isNumber = (value) => Boolean(value) && !Number.isNaN(Number(value));
var isInteger = (value) => Boolean(value) && Number.isInteger(Number(value));
var isPercent = (value) => value.endsWith("%") && isNumber(value.slice(0, -1));
var isTshirtSize = (value) => tshirtUnitRegex.test(value);
var isAny = () => true;
var isLengthOnly = (value) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  lengthUnitRegex.test(value) && !colorFunctionRegex.test(value)
);
var isNever = () => false;
var isShadow = (value) => shadowRegex.test(value);
var isImage = (value) => imageRegex.test(value);
var isAnyNonArbitrary = (value) => !isArbitraryValue(value) && !isArbitraryVariable(value);
var isArbitrarySize = (value) => getIsArbitraryValue(value, isLabelSize, isNever);
var isArbitraryValue = (value) => arbitraryValueRegex.test(value);
var isArbitraryLength = (value) => getIsArbitraryValue(value, isLabelLength, isLengthOnly);
var isArbitraryNumber = (value) => getIsArbitraryValue(value, isLabelNumber, isNumber);
var isArbitraryPosition = (value) => getIsArbitraryValue(value, isLabelPosition, isNever);
var isArbitraryImage = (value) => getIsArbitraryValue(value, isLabelImage, isImage);
var isArbitraryShadow = (value) => getIsArbitraryValue(value, isNever, isShadow);
var isArbitraryVariable = (value) => arbitraryVariableRegex.test(value);
var isArbitraryVariableLength = (value) => getIsArbitraryVariable(value, isLabelLength);
var isArbitraryVariableFamilyName = (value) => getIsArbitraryVariable(value, isLabelFamilyName);
var isArbitraryVariablePosition = (value) => getIsArbitraryVariable(value, isLabelPosition);
var isArbitraryVariableSize = (value) => getIsArbitraryVariable(value, isLabelSize);
var isArbitraryVariableImage = (value) => getIsArbitraryVariable(value, isLabelImage);
var isArbitraryVariableShadow = (value) => getIsArbitraryVariable(value, isLabelShadow, true);
var getIsArbitraryValue = (value, testLabel, testValue) => {
  const result = arbitraryValueRegex.exec(value);
  if (result) {
    if (result[1]) {
      return testLabel(result[1]);
    }
    return testValue(result[2]);
  }
  return false;
};
var getIsArbitraryVariable = (value, testLabel, shouldMatchNoLabel = false) => {
  const result = arbitraryVariableRegex.exec(value);
  if (result) {
    if (result[1]) {
      return testLabel(result[1]);
    }
    return shouldMatchNoLabel;
  }
  return false;
};
var isLabelPosition = (label) => label === "position";
var imageLabels = /* @__PURE__ */ new Set(["image", "url"]);
var isLabelImage = (label) => imageLabels.has(label);
var sizeLabels = /* @__PURE__ */ new Set(["length", "size", "percentage"]);
var isLabelSize = (label) => sizeLabels.has(label);
var isLabelLength = (label) => label === "length";
var isLabelNumber = (label) => label === "number";
var isLabelFamilyName = (label) => label === "family-name";
var isLabelShadow = (label) => label === "shadow";
var getDefaultConfig = () => {
  const themeColor = fromTheme("color");
  const themeFont = fromTheme("font");
  const themeText = fromTheme("text");
  const themeFontWeight = fromTheme("font-weight");
  const themeTracking = fromTheme("tracking");
  const themeLeading = fromTheme("leading");
  const themeBreakpoint = fromTheme("breakpoint");
  const themeContainer = fromTheme("container");
  const themeSpacing = fromTheme("spacing");
  const themeRadius = fromTheme("radius");
  const themeShadow = fromTheme("shadow");
  const themeInsetShadow = fromTheme("inset-shadow");
  const themeDropShadow = fromTheme("drop-shadow");
  const themeBlur = fromTheme("blur");
  const themePerspective = fromTheme("perspective");
  const themeAspect = fromTheme("aspect");
  const themeEase = fromTheme("ease");
  const themeAnimate = fromTheme("animate");
  const scaleBreak = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"];
  const scalePosition = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"];
  const scaleOverflow = () => ["auto", "hidden", "clip", "visible", "scroll"];
  const scaleOverscroll = () => ["auto", "contain", "none"];
  const scaleInset = () => [isFraction, "px", "full", "auto", isArbitraryVariable, isArbitraryValue, themeSpacing];
  const scaleGridTemplateColsRows = () => [isInteger, "none", "subgrid", isArbitraryVariable, isArbitraryValue];
  const scaleGridColRowStartAndEnd = () => ["auto", {
    span: ["full", isInteger, isArbitraryVariable, isArbitraryValue]
  }, isArbitraryVariable, isArbitraryValue];
  const scaleGridColRowStartOrEnd = () => [isInteger, "auto", isArbitraryVariable, isArbitraryValue];
  const scaleGridAutoColsRows = () => ["auto", "min", "max", "fr", isArbitraryVariable, isArbitraryValue];
  const scaleGap = () => [isArbitraryVariable, isArbitraryValue, themeSpacing];
  const scaleAlignPrimaryAxis = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline"];
  const scaleAlignSecondaryAxis = () => ["start", "end", "center", "stretch"];
  const scaleUnambiguousSpacing = () => [isArbitraryVariable, isArbitraryValue, themeSpacing];
  const scalePadding = () => ["px", ...scaleUnambiguousSpacing()];
  const scaleMargin = () => ["px", "auto", ...scaleUnambiguousSpacing()];
  const scaleSizing = () => [isFraction, "auto", "px", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", isArbitraryVariable, isArbitraryValue, themeSpacing];
  const scaleColor = () => [themeColor, isArbitraryVariable, isArbitraryValue];
  const scaleGradientStopPosition = () => [isPercent, isArbitraryLength];
  const scaleRadius = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    themeRadius,
    isArbitraryVariable,
    isArbitraryValue
  ];
  const scaleBorderWidth = () => ["", isNumber, isArbitraryVariableLength, isArbitraryLength];
  const scaleLineStyle = () => ["solid", "dashed", "dotted", "double"];
  const scaleBlendMode = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"];
  const scaleBlur = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    themeBlur,
    isArbitraryVariable,
    isArbitraryValue
  ];
  const scaleOrigin = () => ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", isArbitraryVariable, isArbitraryValue];
  const scaleRotate = () => ["none", isNumber, isArbitraryVariable, isArbitraryValue];
  const scaleScale = () => ["none", isNumber, isArbitraryVariable, isArbitraryValue];
  const scaleSkew = () => [isNumber, isArbitraryVariable, isArbitraryValue];
  const scaleTranslate = () => [isFraction, "full", "px", isArbitraryVariable, isArbitraryValue, themeSpacing];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [isTshirtSize],
      breakpoint: [isTshirtSize],
      color: [isAny],
      container: [isTshirtSize],
      "drop-shadow": [isTshirtSize],
      ease: ["in", "out", "in-out"],
      font: [isAnyNonArbitrary],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [isTshirtSize],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [isTshirtSize],
      shadow: [isTshirtSize],
      spacing: [isNumber],
      text: [isTshirtSize],
      tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"]
    },
    classGroups: {
      // --------------
      // --- Layout ---
      // --------------
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", isFraction, isArbitraryValue, isArbitraryVariable, themeAspect]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       * @deprecated since Tailwind CSS v4.0.0
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [isNumber, isArbitraryValue, isArbitraryVariable, themeContainer]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": scaleBreak()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": scaleBreak()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Screen Reader Only
       * @see https://tailwindcss.com/docs/display#screen-reader-only
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: [...scalePosition(), isArbitraryValue, isArbitraryVariable]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: scaleOverflow()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": scaleOverflow()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": scaleOverflow()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: scaleOverscroll()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": scaleOverscroll()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": scaleOverscroll()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: scaleInset()
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": scaleInset()
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": scaleInset()
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: scaleInset()
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: scaleInset()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: scaleInset()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: scaleInset()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: scaleInset()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: scaleInset()
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: [isInteger, "auto", isArbitraryVariable, isArbitraryValue]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [isFraction, "full", "auto", isArbitraryVariable, isArbitraryValue, themeContainer, themeSpacing]
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["nowrap", "wrap", "wrap-reverse"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: [isNumber, isFraction, "auto", "initial", "none", isArbitraryValue]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [isInteger, "first", "last", "none", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": scaleGridTemplateColsRows()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: scaleGridColRowStartAndEnd()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": scaleGridColRowStartOrEnd()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": scaleGridColRowStartOrEnd()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": scaleGridTemplateColsRows()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: scaleGridColRowStartAndEnd()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": scaleGridColRowStartOrEnd()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": scaleGridColRowStartOrEnd()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": scaleGridAutoColsRows()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": scaleGridAutoColsRows()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: scaleGap()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": scaleGap()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": scaleGap()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...scaleAlignPrimaryAxis(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...scaleAlignSecondaryAxis(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...scaleAlignSecondaryAxis()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...scaleAlignPrimaryAxis()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...scaleAlignSecondaryAxis(), "baseline"]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...scaleAlignSecondaryAxis(), "baseline"]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": scaleAlignPrimaryAxis()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...scaleAlignSecondaryAxis(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...scaleAlignSecondaryAxis()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: scalePadding()
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: scalePadding()
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: scalePadding()
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: scalePadding()
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: scalePadding()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: scalePadding()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: scalePadding()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: scalePadding()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: scalePadding()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: scaleMargin()
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: scaleMargin()
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: scaleMargin()
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: scaleMargin()
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: scaleMargin()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: scaleMargin()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: scaleMargin()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: scaleMargin()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: scaleMargin()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": scaleUnambiguousSpacing()
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y": [{
        "space-y": scaleUnambiguousSpacing()
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y-reverse": ["space-y-reverse"],
      // --------------
      // --- Sizing ---
      // --------------
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      /**
       * Size
       * @see https://tailwindcss.com/docs/width#setting-both-width-and-height
       */
      size: [{
        size: scaleSizing()
      }],
      w: [{
        w: [themeContainer, "screen", ...scaleSizing()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          themeContainer,
          "screen",
          /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "none",
          ...scaleSizing()
        ]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [
          themeContainer,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [themeBreakpoint]
          },
          ...scaleSizing()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", ...scaleSizing()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "none", ...scaleSizing()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", ...scaleSizing()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", themeText, isArbitraryVariableLength, isArbitraryLength]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: [themeFontWeight, isArbitraryVariable, isArbitraryNumber]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", isPercent, isArbitraryValue]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [isArbitraryVariableFamilyName, isArbitraryValue, themeFont]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: [themeTracking, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [isNumber, "none", isArbitraryVariable, isArbitraryNumber]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          isArbitraryVariable,
          isArbitraryValue,
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          themeLeading,
          themeSpacing
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["disc", "decimal", "none", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://v3.tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: scaleColor()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: scaleColor()
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...scaleLineStyle(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [isNumber, "from-font", "auto", isArbitraryVariable, isArbitraryLength]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: scaleColor()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [isNumber, "auto", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: ["px", ...scaleUnambiguousSpacing()]
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", isArbitraryVariable, isArbitraryValue]
      }],
      // -------------------
      // --- Backgrounds ---
      // -------------------
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: [...scalePosition(), isArbitraryVariablePosition, isArbitraryPosition]
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: ["no-repeat", {
          repeat: ["", "x", "y", "space", "round"]
        }]
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: ["auto", "cover", "contain", isArbitraryVariableSize, isArbitrarySize]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, isInteger, isArbitraryVariable, isArbitraryValue],
          radial: ["", isArbitraryVariable, isArbitraryValue],
          conic: [isInteger, isArbitraryVariable, isArbitraryValue]
        }, isArbitraryVariableImage, isArbitraryImage]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: scaleColor()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: scaleGradientStopPosition()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: scaleGradientStopPosition()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: scaleGradientStopPosition()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: scaleColor()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: scaleColor()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: scaleColor()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: scaleRadius()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": scaleRadius()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": scaleRadius()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": scaleRadius()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": scaleRadius()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": scaleRadius()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": scaleRadius()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": scaleRadius()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": scaleRadius()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": scaleRadius()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": scaleRadius()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": scaleRadius()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": scaleRadius()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": scaleRadius()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": scaleRadius()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: scaleBorderWidth()
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": scaleBorderWidth()
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": scaleBorderWidth()
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": scaleBorderWidth()
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": scaleBorderWidth()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": scaleBorderWidth()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": scaleBorderWidth()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": scaleBorderWidth()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": scaleBorderWidth()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": scaleBorderWidth()
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y": [{
        "divide-y": scaleBorderWidth()
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...scaleLineStyle(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...scaleLineStyle(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: scaleColor()
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": scaleColor()
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": scaleColor()
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": scaleColor()
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": scaleColor()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": scaleColor()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": scaleColor()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": scaleColor()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": scaleColor()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: scaleColor()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...scaleLineStyle(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", isNumber, isArbitraryVariableLength, isArbitraryLength]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: [themeColor]
      }],
      // ---------------
      // --- Effects ---
      // ---------------
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          themeShadow,
          isArbitraryVariableShadow,
          isArbitraryShadow
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: scaleColor()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", isArbitraryVariable, isArbitraryValue, themeInsetShadow]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": scaleColor()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: scaleBorderWidth()
      }],
      /**
       * Ring Width Inset
       * @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
       */
      "ring-color": [{
        ring: scaleColor()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [isNumber, isArbitraryLength]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": scaleColor()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": scaleBorderWidth()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": scaleColor()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...scaleBlendMode(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": scaleBlendMode()
      }],
      // ---------------
      // --- Filters ---
      // ---------------
      /**
       * Filter
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          isArbitraryVariable,
          isArbitraryValue
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: scaleBlur()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          themeDropShadow,
          isArbitraryVariable,
          isArbitraryValue
        ]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Filter
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          isArbitraryVariable,
          isArbitraryValue
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": scaleBlur()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      // --------------
      // --- Tables ---
      // --------------
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": scaleUnambiguousSpacing()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": scaleUnambiguousSpacing()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": scaleUnambiguousSpacing()
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // ---------------------------------
      // --- Transitions and Animation ---
      // ---------------------------------
      /**
       * Transition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Transition Behavior
       * @see https://tailwindcss.com/docs/transition-behavior
       */
      "transition-behavior": [{
        transition: ["normal", "discrete"]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: [isNumber, "initial", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", themeEase, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", themeAnimate, isArbitraryVariable, isArbitraryValue]
      }],
      // ------------------
      // --- Transforms ---
      // ------------------
      /**
       * Backface Visibility
       * @see https://tailwindcss.com/docs/backface-visibility
       */
      backface: [{
        backface: ["hidden", "visible"]
      }],
      /**
       * Perspective
       * @see https://tailwindcss.com/docs/perspective
       */
      perspective: [{
        perspective: [themePerspective, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": scaleOrigin()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: scaleRotate()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": scaleRotate()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": scaleRotate()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": scaleRotate()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: scaleScale()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": scaleScale()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": scaleScale()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": scaleScale()
      }],
      /**
       * Scale 3D
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-3d": ["scale-3d"],
      /**
       * Skew
       * @see https://tailwindcss.com/docs/skew
       */
      skew: [{
        skew: scaleSkew()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": scaleSkew()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": scaleSkew()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [isArbitraryVariable, isArbitraryValue, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: scaleOrigin()
      }],
      /**
       * Transform Style
       * @see https://tailwindcss.com/docs/transform-style
       */
      "transform-style": [{
        transform: ["3d", "flat"]
      }],
      /**
       * Translate
       * @see https://tailwindcss.com/docs/translate
       */
      translate: [{
        translate: scaleTranslate()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": scaleTranslate()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": scaleTranslate()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": scaleTranslate()
      }],
      /**
       * Translate None
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-none": ["translate-none"],
      // ---------------------
      // --- Interactivity ---
      // ---------------------
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: scaleColor()
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: scaleColor()
      }],
      /**
       * Color Scheme
       * @see https://tailwindcss.com/docs/color-scheme
       */
      "color-scheme": [{
        scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Field Sizing
       * @see https://tailwindcss.com/docs/field-sizing
       */
      "field-sizing": [{
        "field-sizing": ["fixed", "content"]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["auto", "none"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "", "y", "x"]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", isArbitraryVariable, isArbitraryValue]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...scaleColor()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [isNumber, isArbitraryVariableLength, isArbitraryLength, isArbitraryNumber]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...scaleColor()]
      }],
      // ---------------------
      // --- Accessibility ---
      // ---------------------
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      translate: ["translate-x", "translate-y", "translate-none"],
      "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    },
    orderSensitiveModifiers: ["before", "after", "placeholder", "file", "marker", "selection", "first-line", "first-letter", "backdrop", "*", "**"]
  };
};
var twMerge = /* @__PURE__ */ createTailwindMerge(getDefaultConfig);

// src/client/components/util.ts
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/client/components/icon/Icon.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var IconSize = /* @__PURE__ */ ((IconSize2) => {
  IconSize2["xs"] = "12";
  IconSize2["sm"] = "16";
  IconSize2["md"] = "20";
  IconSize2["lg"] = "32";
  IconSize2["xl"] = "40";
  IconSize2["2xl"] = "80";
  IconSize2["jumbo"] = "160";
  return IconSize2;
})(IconSize || {});
var emptyFill = [];
var strokeIcon = [];
var Icon = ({ name, testId, className, size = "sm", ...props }) => {
  const iconSize = IconSize[size];
  const isEmptyFill = emptyFill.includes(name);
  const isStrokeIcon = strokeIcon.includes(name);
  const iconClasses = cn("inline-block flex-shrink-0", className, isEmptyFill && "fill-transparent");
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      className: iconClasses,
      fill: isEmptyFill ? "none" : "currentColor",
      stroke: isStrokeIcon ? "currentColor" : "none",
      width: iconSize,
      height: iconSize,
      "data-testid": testId,
      "data-name": name,
      ...props,
      children: [
        /* @__PURE__ */ jsx2("title", { children: name }),
        /* @__PURE__ */ jsxs("defs", { children: [
          /* @__PURE__ */ jsxs(
            "symbol",
            {
              id: "Layout",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              children: [
                /* @__PURE__ */ jsx2("rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }),
                /* @__PURE__ */ jsx2("line", { x1: "3", x2: "21", y1: "9", y2: "9" }),
                /* @__PURE__ */ jsx2("line", { x1: "9", x2: "9", y1: "21", y2: "9" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "symbol",
            {
              id: "Root",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              children: [
                /* @__PURE__ */ jsx2("rect", { x: "16", y: "16", width: "6", height: "6", rx: "1" }),
                /* @__PURE__ */ jsx2("rect", { x: "2", y: "16", width: "6", height: "6", rx: "1" }),
                /* @__PURE__ */ jsx2("rect", { x: "9", y: "2", width: "6", height: "6", rx: "1" }),
                /* @__PURE__ */ jsx2("path", { d: "M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" }),
                /* @__PURE__ */ jsx2("path", { d: "M12 12V8" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "symbol",
            {
              id: "Network",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              children: [
                /* @__PURE__ */ jsx2("path", { d: "m13.11 7.664 1.78 2.672" }),
                /* @__PURE__ */ jsx2("path", { d: "m14.162 12.788-3.324 1.424" }),
                /* @__PURE__ */ jsx2("path", { d: "m20 4-6.06 1.515" }),
                /* @__PURE__ */ jsx2("path", { d: "M3 3v16a2 2 0 0 0 2 2h16" }),
                /* @__PURE__ */ jsx2("circle", { cx: "12", cy: "6", r: "2" }),
                /* @__PURE__ */ jsx2("circle", { cx: "16", cy: "12", r: "2" }),
                /* @__PURE__ */ jsx2("circle", { cx: "9", cy: "15", r: "2" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "symbol",
            {
              id: "X",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              children: [
                /* @__PURE__ */ jsx2("path", { d: "M18 6 6 18" }),
                /* @__PURE__ */ jsx2("path", { d: "m6 6 12 12" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "symbol",
            {
              id: "Terminal",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              children: [
                /* @__PURE__ */ jsx2("polyline", { points: "4 17 10 11 4 5" }),
                /* @__PURE__ */ jsx2("line", { x1: "12", x2: "20", y1: "19", y2: "19" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "symbol",
            {
              id: "Settings",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              children: [
                /* @__PURE__ */ jsx2("path", { d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" }),
                /* @__PURE__ */ jsx2("circle", { cx: "12", cy: "12", r: "3" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "symbol",
            {
              id: "Send",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              children: [
                /* @__PURE__ */ jsx2("path", { d: "m22 2-7 20-4-9-9-4Z" }),
                /* @__PURE__ */ jsx2("path", { d: "M22 2 11 13" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "symbol",
            {
              id: "Radio",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              children: [
                /* @__PURE__ */ jsx2("path", { d: "M4.9 19.1C1 15.2 1 8.8 4.9 4.9" }),
                /* @__PURE__ */ jsx2("path", { d: "M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" }),
                /* @__PURE__ */ jsx2("circle", { cx: "12", cy: "12", r: "2" }),
                /* @__PURE__ */ jsx2("path", { d: "M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" }),
                /* @__PURE__ */ jsx2("path", { d: "M19.1 4.9C23 8.8 23 15.1 19.1 19" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "symbol",
            {
              id: "Network",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              children: [
                /* @__PURE__ */ jsx2("rect", { x: "16", y: "16", width: "6", height: "6", rx: "1" }),
                /* @__PURE__ */ jsx2("rect", { x: "2", y: "16", width: "6", height: "6", rx: "1" }),
                /* @__PURE__ */ jsx2("rect", { x: "9", y: "2", width: "6", height: "6", rx: "1" }),
                /* @__PURE__ */ jsx2("path", { d: "M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" }),
                /* @__PURE__ */ jsx2("path", { d: "M12 12V8" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "symbol",
            {
              id: "List",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              children: [
                /* @__PURE__ */ jsx2("line", { x1: "8", x2: "21", y1: "6", y2: "6" }),
                /* @__PURE__ */ jsx2("line", { x1: "8", x2: "21", y1: "12", y2: "12" }),
                /* @__PURE__ */ jsx2("line", { x1: "8", x2: "21", y1: "18", y2: "18" }),
                /* @__PURE__ */ jsx2("line", { x1: "3", x2: "3.01", y1: "6", y2: "6" }),
                /* @__PURE__ */ jsx2("line", { x1: "3", x2: "3.01", y1: "12", y2: "12" }),
                /* @__PURE__ */ jsx2("line", { x1: "3", x2: "3.01", y1: "18", y2: "18" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "symbol",
            {
              id: "Layers",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              children: [
                /* @__PURE__ */ jsx2("path", { d: "m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" }),
                /* @__PURE__ */ jsx2("path", { d: "m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" }),
                /* @__PURE__ */ jsx2("path", { d: "m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "symbol",
            {
              id: "GitMerge",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              children: [
                /* @__PURE__ */ jsx2("circle", { cx: "18", cy: "18", r: "3" }),
                /* @__PURE__ */ jsx2("circle", { cx: "6", cy: "6", r: "3" }),
                /* @__PURE__ */ jsx2("path", { d: "M6 21V9a9 9 0 0 0 9 9" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "symbol",
            {
              id: "CornerDownRight",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              children: [
                /* @__PURE__ */ jsx2("polyline", { points: "15 10 20 15 15 20" }),
                /* @__PURE__ */ jsx2("path", { d: "M4 4v7a4 4 0 0 0 4 4h12" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "symbol",
            {
              id: "CopySlash",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              children: [
                /* @__PURE__ */ jsx2("line", { x1: "12", x2: "18", y1: "18", y2: "12" }),
                /* @__PURE__ */ jsx2("rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2" }),
                /* @__PURE__ */ jsx2("path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "symbol",
            {
              id: "Columns",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              children: [
                /* @__PURE__ */ jsx2("rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }),
                /* @__PURE__ */ jsx2("line", { x1: "12", x2: "12", y1: "3", y2: "21" })
              ]
            }
          ),
          /* @__PURE__ */ jsx2(
            "symbol",
            {
              id: "ChevronDown",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              children: /* @__PURE__ */ jsx2("path", { d: "m6 9 6 6 6-6" })
            }
          ),
          /* @__PURE__ */ jsx2(
            "symbol",
            {
              id: "Check",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              children: /* @__PURE__ */ jsx2("polyline", { points: "20 6 9 17 4 12" })
            }
          ),
          /* @__PURE__ */ jsx2(
            "symbol",
            {
              id: "Activity",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              children: /* @__PURE__ */ jsx2("path", { d: "M22 12h-4l-3 9L9 3l-3 9H2" })
            }
          ),
          /* @__PURE__ */ jsxs(
            "symbol",
            {
              id: "Shield",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              children: [
                /* @__PURE__ */ jsx2("path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" }),
                /* @__PURE__ */ jsx2("path", { d: "m14.5 9-5 5" }),
                /* @__PURE__ */ jsx2("path", { d: "m9.5 9 5 5" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "symbol",
            {
              id: "Accessibility",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              children: [
                /* @__PURE__ */ jsx2("circle", { cx: "16", cy: "4", r: "1" }),
                /* @__PURE__ */ jsx2("path", { d: "m18 19 1-7-6 1" }),
                /* @__PURE__ */ jsx2("path", { d: "m5 8 3-3 5.5 3-2.36 3.5" }),
                /* @__PURE__ */ jsx2("path", { d: "M4.24 14.5a5 5 0 0 0 6.88 6" }),
                /* @__PURE__ */ jsx2("path", { d: "M13.76 17.5a5 5 0 0 0-6.88-6" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx2("use", { href: `#${name}` })
      ]
    }
  );
};

// src/client/tabs/ErrorsTab.tsx
import beautify from "beautify";
import { useEffect as useEffect8, useState } from "react";
import ReactDiffViewer, { DiffMethod } from "react-diff-viewer-continued";

// src/client/hooks/useDevServerConnection.ts
import { useEffect as useEffect7 } from "react";
import { useNavigation as useNavigation3 } from "react-router";
var updateRouteInfo = (server, routes, event, includeServerInfo = true) => {
  const { data, type } = event;
  const { id, ...rest } = data;
  const existingRouteInfo = !includeServerInfo ? routes?.[id] : routes?.[id] ?? server?.routes?.[id];
  let newRouteData = [...existingRouteInfo?.[type === "loader" ? "loaders" : "actions"] || [], rest];
  newRouteData = cutArrayToLastN(newRouteData, 20);
  const { min, max, total } = newRouteData.reduce(
    (acc, dataPiece) => {
      return {
        min: Math.min(acc.min, dataPiece.executionTime),
        max: Math.max(acc.max, dataPiece.executionTime),
        total: acc.total + dataPiece.executionTime
      };
    },
    { min: 1e5, max: 0, total: 0 }
  );
  const loaderTriggerCount = existingRouteInfo?.loaderTriggerCount || 0;
  const actionTriggerCount = existingRouteInfo?.actionTriggerCount || 0;
  routes[id] = {
    ...existingRouteInfo,
    lowestExecutionTime: min,
    highestExecutionTime: max,
    averageExecutionTime: Number(Number(total / newRouteData.length).toFixed(2)),
    loaderTriggerCount: type === "loader" ? loaderTriggerCount + 1 : loaderTriggerCount,
    loaders: type === "loader" ? newRouteData : existingRouteInfo?.loaders ?? [],
    actions: type === "action" ? newRouteData : existingRouteInfo?.actions ?? [],
    lastLoader: type === "loader" ? rest : existingRouteInfo?.lastLoader ?? {},
    lastAction: type === "action" ? rest : existingRouteInfo?.lastAction ?? {},
    actionTriggerCount: type === "action" ? actionTriggerCount + 1 : actionTriggerCount
  };
};
var useDevServerConnection = () => {
  const navigation = useNavigation3();
  const { server, setServerInfo } = useServerInfo();
  useEffect7(() => {
    if (typeof import.meta.hot === "undefined") return;
    if (navigation.state !== "idle") return;
    import.meta.hot.send("all-route-info");
  }, [navigation.state]);
  useEffect7(() => {
    const cb2 = (data) => {
      const events = JSON.parse(data).data;
      const routes = {};
      for (const routeInfo of Object.values(events)) {
        const { loader, action } = routeInfo;
        const events2 = [
          loader.map((e) => ({ type: "loader", data: e })),
          action.map((e) => ({ type: "action", data: e }))
        ].flat();
        for (const event of events2) {
          updateRouteInfo(server, routes, event, false);
        }
      }
      setServerInfo({ routes });
    };
    if (typeof import.meta.hot !== "undefined") {
      import.meta.hot.on("all-route-info", cb2);
    }
    return () => {
      if (typeof import.meta.hot !== "undefined") {
        import.meta.hot.dispose(cb2);
      }
    };
  }, [server, setServerInfo]);
  const isConnected = typeof import.meta.hot !== "undefined";
  return {
    sendJsonMessage: (data) => import.meta.hot?.send(data.type, data),
    connectionStatus: "Open",
    isConnected
  };
};

// src/client/tabs/ErrorsTab.tsx
import { Fragment, jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var DiffViewer = ReactDiffViewer.default ? (
  // @ts-expect-error
  ReactDiffViewer.default
) : ReactDiffViewer;
var ErrorsTab = () => {
  const { htmlErrors } = useHtmlErrors();
  const { sendJsonMessage } = useDevServerConnection();
  const [SSRHtml, setSSRHtml] = useState("");
  const [CSRHtml, setCSRHtml] = useState("");
  const [hasHydrationMismatch, setHasHydrationMismatch] = useState(false);
  useEffect8(() => {
    if (typeof window === "undefined") return;
    if (!window.HYDRATION_OVERLAY) {
      return;
    }
    const ssrHtml = window.HYDRATION_OVERLAY?.SSR_HTML;
    const newCSRHtml = window.HYDRATION_OVERLAY?.CSR_HTML;
    if (!ssrHtml || !newCSRHtml) return;
    const newSSR = beautify(ssrHtml, { format: "html" });
    const newCSR = beautify(newCSRHtml, { format: "html" });
    setSSRHtml(newSSR);
    setCSRHtml(newCSR);
    setHasHydrationMismatch(window.HYDRATION_OVERLAY?.ERROR ?? false);
  }, []);
  return /* @__PURE__ */ jsxs2("div", { className: "flex flex-col gap-1", children: [
    htmlErrors.length > 0 ? /* @__PURE__ */ jsx3(Fragment, { children: /* @__PURE__ */ jsxs2("div", { className: "mb-1", children: [
      /* @__PURE__ */ jsx3("span", { className: "text-lg font-semibold", children: "HTML Nesting Errors" }),
      /* @__PURE__ */ jsx3("hr", { className: "mt-2 border-gray-400" })
    ] }) }) : /* @__PURE__ */ jsx3("div", { className: "text-2xl", children: "No errors detected!" }),
    htmlErrors.map((error) => {
      return /* @__PURE__ */ jsxs2(
        "div",
        {
          className: "flex justify-start gap-2 rounded-lg border border-solid border-red-600/20 p-2",
          children: [
            /* @__PURE__ */ jsx3(Icon, { size: "md", className: "text-red-600", name: "Shield" }),
            /* @__PURE__ */ jsxs2("div", { className: "flex flex-col gap-2 lg:gap-0", children: [
              /* @__PURE__ */ jsxs2("div", { children: [
                /* @__PURE__ */ jsx3("span", { className: "font-bold text-red-600", children: error.child.tag }),
                " element can't be nested inside of",
                " ",
                /* @__PURE__ */ jsx3("span", { className: "font-bold text-red-600", children: error.parent.tag }),
                " element"
              ] }),
              /* @__PURE__ */ jsxs2("div", { className: "flex lg:flex-row flex-col items-start gap-1 text-sm text-gray-500", children: [
                "The parent element is located inside of the",
                /* @__PURE__ */ jsx3(
                  "div",
                  {
                    onClick: () => sendJsonMessage({
                      type: "open-source",
                      data: { source: error.parent.file }
                    }),
                    className: "cursor-pointer text-white",
                    children: error.parent.file
                  }
                ),
                "file"
              ] }),
              /* @__PURE__ */ jsxs2("div", { className: "flex lg:flex-row flex-col items-start gap-1 text-sm text-gray-500", children: [
                "The child element is located inside of the",
                /* @__PURE__ */ jsx3(
                  "div",
                  {
                    onClick: () => sendJsonMessage({
                      type: "open-source",
                      data: { source: error.child.file }
                    }),
                    className: "cursor-pointer text-white",
                    children: error.child.file
                  }
                ),
                "file"
              ] })
            ] })
          ]
        },
        JSON.stringify(error)
      );
    }),
    hasHydrationMismatch && /* @__PURE__ */ jsxs2("div", { className: "relative mt-4 w-full border-2 overflow-y-auto rounded border-gray-800", children: [
      /* @__PURE__ */ jsx3("h1", { className: "text-xl p-2 text-center", children: "Hydration mismatch comparison" }),
      /* @__PURE__ */ jsx3("hr", { className: "mb-1 border-gray-600/30" }),
      /* @__PURE__ */ jsx3(
        DiffViewer,
        {
          oldValue: SSRHtml,
          newValue: CSRHtml,
          leftTitle: "Server-Side Render",
          rightTitle: "Client-Side Render",
          compareMethod: DiffMethod.WORDS,
          styles: {
            titleBlock: {
              textAlign: "center"
            },
            variables: {
              light: {
                diffViewerBackground: "#212121",
                diffViewerColor: "#FFF",
                addedBackground: "#044B53",
                addedColor: "white",
                removedBackground: "#632F34",
                removedColor: "white",
                wordAddedBackground: "#055d67",
                wordRemovedBackground: "#7d383f",
                addedGutterBackground: "#034148",
                removedGutterBackground: "#632b30",
                gutterBackground: "#1F2937",
                highlightBackground: "#212121",
                highlightGutterBackground: "#212121",
                codeFoldGutterBackground: "#1F2937",
                codeFoldBackground: "#1F2937",
                emptyLineBackground: "#363946",
                gutterColor: "#white",
                addedGutterColor: "#8c8c8c",
                removedGutterColor: "#8c8c8c",
                codeFoldContentColor: "white",
                diffViewerTitleBackground: "#212121",
                diffViewerTitleColor: "white",
                diffViewerTitleBorderColor: "#353846"
              },
              dark: {
                diffViewerBackground: "#212121",
                diffViewerColor: "#FFF",
                addedBackground: "#044B53",
                addedColor: "white",
                removedBackground: "#632F34",
                removedColor: "white",
                wordAddedBackground: "#055d67",
                wordRemovedBackground: "#7d383f",
                addedGutterBackground: "#034148",
                removedGutterBackground: "#632b30",
                gutterBackground: "#1F2937",
                highlightBackground: "#212121",
                highlightGutterBackground: "#212121",
                codeFoldGutterBackground: "#1F2937",
                codeFoldBackground: "#1F2937",
                emptyLineBackground: "#363946",
                gutterColor: "#white",
                addedGutterColor: "#8c8c8c",
                removedGutterColor: "#8c8c8c",
                codeFoldContentColor: "white",
                diffViewerTitleBackground: "#212121",
                diffViewerTitleColor: "white",
                diffViewerTitleBorderColor: "#353846"
              }
            }
          },
          extraLinesSurroundingDiff: 2,
          useDarkTheme: true
        }
      )
    ] })
  ] });
};

// src/client/components/network-tracer/NetworkPanel.tsx
import { useEffect as useEffect16, useState as useState7 } from "react";

// src/client/context/requests/request-context.tsx
import { createContext as createContext2, useCallback as useCallback4, useContext as useContext2, useEffect as useEffect9, useState as useState2 } from "react";
import { jsx as jsx4 } from "react/jsx-runtime";
var RequestContext = createContext2({ requests: [], removeAllRequests: () => {
} });
var requestMap = /* @__PURE__ */ new Map();
var RequestProvider = ({ children }) => {
  const [requests, setRequests] = useState2([]);
  const setNewRequests = useCallback4((payload) => {
    const requests2 = JSON.parse(payload);
    const newRequests = Array.isArray(requests2) ? requests2 : [requests2];
    for (const req of newRequests) {
      requestMap.set(req.id + req.startTime, req);
      import.meta.hot?.send("remove-event", { ...req, fromClient: true });
    }
    setRequests(Array.from(requestMap.values()));
  }, []);
  useEffect9(() => {
    import.meta.hot?.send("get-events");
    import.meta.hot?.on("get-events", setNewRequests);
    import.meta.hot?.on("request-event", setNewRequests);
    return () => {
      import.meta.hot?.off?.("get-events", setNewRequests);
      import.meta.hot?.off?.("request-event", setNewRequests);
    };
  }, [setNewRequests]);
  const removeAllRequests = useCallback4(() => {
    setRequests([]);
    requestMap.clear();
  }, []);
  return /* @__PURE__ */ jsx4(RequestContext.Provider, { value: { requests, removeAllRequests }, children });
};
var useRequestContext = () => {
  return useContext2(RequestContext);
};

// src/client/components/network-tracer/NetworkWaterfall.tsx
import { AnimatePresence } from "framer-motion";
import { useEffect as useEffect15, useRef as useRef7, useState as useState6 } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { Tooltip } from "react-tooltip";

// src/client/components/Tag.tsx
import clsx2 from "clsx";
import { jsx as jsx5 } from "react/jsx-runtime";
var TAG_COLORS = {
  GREEN: "border-green-500 border border-solid text-white",
  BLUE: "border-blue-500 border border-solid text-white",
  TEAL: "border-teal-400 border border-solid text-white",
  RED: "border-red-500 border border-solid text-white",
  PURPLE: "border-purple-500 border border-solid text-white"
};
var Tag = ({ color, children, className }) => {
  return /* @__PURE__ */ jsx5("span", { className: clsx2("flex items-center rounded px-2.5 py-0.5 text-sm font-medium", className, TAG_COLORS[color]), children });
};

// src/client/components/jsonRenderer.tsx
import { useEffect as useEffect13, useMemo as useMemo3, useRef as useRef6, useState as useState5 } from "react";

// src/external/react-json-view/index.tsx
import { forwardRef as forwardRef2 } from "react";

// src/external/react-json-view/store.tsx
import { createContext as createContext8, useContext as useContext8, useEffect as useEffect10, useReducer as useReducer7 } from "react";

// src/external/react-json-view/store/ShowTools.tsx
import { createContext as createContext3, useContext as useContext3, useReducer as useReducer2 } from "react";
import { jsx as jsx6 } from "react/jsx-runtime";
var initialState2 = {};
var Context = createContext3(initialState2);
var reducer = (state, action) => ({
  ...state,
  ...action
});
var useShowToolsStore = () => {
  return useContext3(Context);
};
var DispatchShowTools = createContext3(() => {
});
DispatchShowTools.displayName = "JVR.DispatchShowTools";
function useShowTools() {
  return useReducer2(reducer, initialState2);
}
function useShowToolsDispatch() {
  return useContext3(DispatchShowTools);
}
var ShowTools = ({ initial, dispatch, children }) => {
  return /* @__PURE__ */ jsx6(Context.Provider, { value: initial, children: /* @__PURE__ */ jsx6(DispatchShowTools.Provider, { value: dispatch, children }) });
};
ShowTools.displayName = "JVR.ShowTools";

// src/external/react-json-view/store/Expands.tsx
import { createContext as createContext4, useContext as useContext4, useReducer as useReducer3 } from "react";
import { jsx as jsx7 } from "react/jsx-runtime";
var initialState3 = {};
var Context2 = createContext4(initialState3);
var reducer2 = (state, action) => ({
  ...state,
  ...action
});
var useExpandsStore = () => {
  return useContext4(Context2);
};
var DispatchExpands = createContext4(() => {
});
DispatchExpands.displayName = "JVR.DispatchExpands";
function useExpands() {
  return useReducer3(reducer2, initialState3);
}
function useExpandsDispatch() {
  return useContext4(DispatchExpands);
}
var Expands = ({ initial, dispatch, children }) => {
  return /* @__PURE__ */ jsx7(Context2.Provider, { value: initial, children: /* @__PURE__ */ jsx7(DispatchExpands.Provider, { value: dispatch, children }) });
};
Expands.displayName = "JVR.Expands";

// src/external/react-json-view/store/Types.tsx
import { createContext as createContext5, useContext as useContext5, useReducer as useReducer4 } from "react";
import { jsx as jsx8 } from "react/jsx-runtime";
var initialState4 = {
  Str: {
    as: "span",
    "data-type": "string",
    style: {
      color: "var(--w-rjv-type-string-color, #cb4b16)"
    },
    className: "w-rjv-type",
    children: "string"
  },
  Url: {
    as: "a",
    style: {
      color: "var(--w-rjv-type-url-color, #0969da)"
    },
    "data-type": "url",
    className: "w-rjv-type",
    children: "url"
  },
  Undefined: {
    style: {
      color: "var(--w-rjv-type-undefined-color, #586e75)"
    },
    as: "span",
    "data-type": "undefined",
    className: "w-rjv-type",
    children: "undefined"
  },
  Null: {
    style: {
      color: "var(--w-rjv-type-null-color, #d33682)"
    },
    as: "span",
    "data-type": "null",
    className: "w-rjv-type",
    children: "null"
  },
  Map: {
    style: {
      color: "var(--w-rjv-type-map-color, #268bd2)"
    },
    as: "span",
    "data-type": "map",
    className: "w-rjv-type",
    children: "Map"
  },
  Nan: {
    style: {
      color: "var(--w-rjv-type-nan-color, #859900)"
    },
    as: "span",
    "data-type": "nan",
    className: "w-rjv-type",
    children: "NaN"
  },
  Bigint: {
    style: {
      color: "var(--w-rjv-type-bigint-color, #268bd2)"
    },
    as: "span",
    "data-type": "bigint",
    className: "w-rjv-type",
    children: "bigint"
  },
  Int: {
    style: {
      color: "var(--w-rjv-type-int-color, #268bd2)"
    },
    as: "span",
    "data-type": "int",
    className: "w-rjv-type",
    children: "int"
  },
  Set: {
    style: {
      color: "var(--w-rjv-type-set-color, #268bd2)"
    },
    as: "span",
    "data-type": "set",
    className: "w-rjv-type",
    children: "Set"
  },
  Float: {
    style: {
      color: "var(--w-rjv-type-float-color, #859900)"
    },
    as: "span",
    "data-type": "float",
    className: "w-rjv-type",
    children: "float"
  },
  True: {
    style: {
      color: "var(--w-rjv-type-boolean-color, #2aa198)"
    },
    as: "span",
    "data-type": "bool",
    className: "w-rjv-type",
    children: "bool"
  },
  False: {
    style: {
      color: "var(--w-rjv-type-boolean-color, #2aa198)"
    },
    as: "span",
    "data-type": "bool",
    className: "w-rjv-type",
    children: "bool"
  },
  Date: {
    style: {
      color: "var(--w-rjv-type-date-color, #268bd2)"
    },
    as: "span",
    "data-type": "date",
    className: "w-rjv-type",
    children: "date"
  }
};
var Context3 = createContext5(initialState4);
var reducer3 = (state, action) => ({
  ...state,
  ...action
});
var useTypesStore = () => {
  return useContext5(Context3);
};
var DispatchTypes = createContext5(() => {
});
DispatchTypes.displayName = "JVR.DispatchTypes";
function useTypes() {
  return useReducer4(reducer3, initialState4);
}
function useTypesDispatch() {
  return useContext5(DispatchTypes);
}
var Types = ({ initial, dispatch, children }) => {
  return /* @__PURE__ */ jsx8(Context3.Provider, { value: initial, children: /* @__PURE__ */ jsx8(DispatchTypes.Provider, { value: dispatch, children }) });
};
Types.displayName = "JVR.Types";

// src/external/react-json-view/store/Symbols.tsx
import {
  createContext as createContext6,
  useContext as useContext6,
  useReducer as useReducer5
} from "react";

// src/external/react-json-view/arrow/TriangleArrow.tsx
import { jsx as jsx9 } from "react/jsx-runtime";
function TriangleArrow(props) {
  const { style, ...reset } = props;
  const defaultStyle = {
    cursor: "pointer",
    height: "1em",
    width: "1em",
    userSelect: "none",
    display: "flex",
    ...style
  };
  return /* @__PURE__ */ jsx9("svg", { viewBox: "0 0 24 24", fill: "var(--w-rjv-arrow-color, currentColor)", style: defaultStyle, ...reset, children: /* @__PURE__ */ jsx9("path", { d: "M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z" }) });
}
TriangleArrow.displayName = "JVR.TriangleArrow";

// src/external/react-json-view/store/Symbols.tsx
import { jsx as jsx10 } from "react/jsx-runtime";
var initialState5 = {
  Arrow: {
    as: "span",
    className: "w-rjv-arrow",
    style: {
      transform: "rotate(0deg)",
      transition: "all 0.3s"
    },
    children: /* @__PURE__ */ jsx10(TriangleArrow, {})
  },
  Colon: {
    as: "span",
    style: {
      color: "var(--w-rjv-colon-color, var(--w-rjv-color))",
      marginLeft: 0,
      marginRight: 2
    },
    className: "w-rjv-colon",
    children: ":"
  },
  Quote: {
    as: "span",
    style: {
      color: "var(--w-rjv-quotes-color, #236a7c)"
    },
    className: "w-rjv-quotes",
    children: '"'
  },
  ValueQuote: {
    as: "span",
    style: {
      color: "var(--w-rjv-quotes-string-color, #cb4b16)"
    },
    className: "w-rjv-quotes",
    children: '"'
  },
  BracketsLeft: {
    as: "span",
    style: {
      color: "var(--w-rjv-brackets-color, #236a7c)"
    },
    className: "w-rjv-brackets-start",
    children: "["
  },
  BracketsRight: {
    as: "span",
    style: {
      color: "var(--w-rjv-brackets-color, #236a7c)"
    },
    className: "w-rjv-brackets-end",
    children: "]"
  },
  BraceLeft: {
    as: "span",
    style: {
      color: "var(--w-rjv-curlybraces-color, #236a7c)"
    },
    className: "w-rjv-curlybraces-start",
    children: "{"
  },
  BraceRight: {
    as: "span",
    style: {
      color: "var(--w-rjv-curlybraces-color, #236a7c)"
    },
    className: "w-rjv-curlybraces-end",
    children: "}"
  }
};
var Context4 = createContext6(initialState5);
var reducer4 = (state, action) => ({
  ...state,
  ...action
});
var useSymbolsStore = () => {
  return useContext6(Context4);
};
var DispatchSymbols = createContext6(() => {
});
DispatchSymbols.displayName = "JVR.DispatchSymbols";
function useSymbols() {
  return useReducer5(reducer4, initialState5);
}
function useSymbolsDispatch() {
  return useContext6(DispatchSymbols);
}
var Symbols = ({ initial, dispatch, children }) => {
  return /* @__PURE__ */ jsx10(Context4.Provider, { value: initial, children: /* @__PURE__ */ jsx10(DispatchSymbols.Provider, { value: dispatch, children }) });
};
Symbols.displayName = "JVR.Symbols";

// src/external/react-json-view/store/Section.tsx
import { createContext as createContext7, useContext as useContext7, useReducer as useReducer6 } from "react";
import { jsx as jsx11 } from "react/jsx-runtime";
var initialState6 = {
  Copied: {
    className: "w-rjv-copied",
    style: {
      height: "1em",
      width: "1em",
      cursor: "pointer",
      verticalAlign: "middle",
      marginLeft: 5
    }
  },
  CountInfo: {
    as: "span",
    className: "w-rjv-object-size",
    style: {
      color: "var(--w-rjv-info-color, #0000004d)",
      paddingLeft: 8,
      fontStyle: "italic"
    }
  },
  CountInfoExtra: {
    as: "span",
    className: "w-rjv-object-extra",
    style: {
      paddingLeft: 8
    }
  },
  Ellipsis: {
    as: "span",
    style: {
      cursor: "pointer",
      color: "var(--w-rjv-ellipsis-color, #cb4b16)",
      userSelect: "none"
    },
    className: "w-rjv-ellipsis",
    children: "..."
  },
  KeyName: {
    as: "span",
    className: "w-rjv-object-key"
  }
};
var Context5 = createContext7(initialState6);
var reducer5 = (state, action) => ({
  ...state,
  ...action
});
var useSectionStore = () => {
  return useContext7(Context5);
};
var DispatchSection = createContext7(() => {
});
DispatchSection.displayName = "JVR.DispatchSection";
function useSection() {
  return useReducer6(reducer5, initialState6);
}
function useSectionDispatch() {
  return useContext7(DispatchSection);
}
var Section = ({ initial, dispatch, children }) => {
  return /* @__PURE__ */ jsx11(Context5.Provider, { value: initial, children: /* @__PURE__ */ jsx11(DispatchSection.Provider, { value: dispatch, children }) });
};
Section.displayName = "JVR.Section";

// src/external/react-json-view/store.tsx
import { jsx as jsx12 } from "react/jsx-runtime";
var initialState7 = {
  objectSortKeys: false,
  indentWidth: 15
};
var Context6 = createContext8(initialState7);
Context6.displayName = "JVR.Context";
var DispatchContext = createContext8(() => {
});
DispatchContext.displayName = "JVR.DispatchContext";
function reducer6(state, action) {
  return {
    ...state,
    ...action
  };
}
var useStore = () => {
  return useContext8(Context6);
};
var Provider = ({
  children,
  initialState: init,
  initialTypes
}) => {
  const [state, dispatch] = useReducer7(reducer6, Object.assign({}, initialState7, init));
  const [showTools, showToolsDispatch] = useShowTools();
  const [expands, expandsDispatch] = useExpands();
  const [types, typesDispatch] = useTypes();
  const [symbols, symbolsDispatch] = useSymbols();
  const [section, sectionDispatch] = useSection();
  useEffect10(() => dispatch({ ...init }), [init]);
  return /* @__PURE__ */ jsx12(Context6.Provider, { value: state, children: /* @__PURE__ */ jsx12(DispatchContext.Provider, { value: dispatch, children: /* @__PURE__ */ jsx12(ShowTools, { initial: showTools, dispatch: showToolsDispatch, children: /* @__PURE__ */ jsx12(Expands, { initial: expands, dispatch: expandsDispatch, children: /* @__PURE__ */ jsx12(Types, { initial: { ...types, ...initialTypes }, dispatch: typesDispatch, children: /* @__PURE__ */ jsx12(Symbols, { initial: symbols, dispatch: symbolsDispatch, children: /* @__PURE__ */ jsx12(Section, { initial: section, dispatch: sectionDispatch, children }) }) }) }) }) }) });
};
Provider.displayName = "JVR.Provider";

// src/external/react-json-view/Container.tsx
import { forwardRef, useId as useId2 } from "react";

// src/external/react-json-view/symbol/index.tsx
import { jsx as jsx13 } from "react/jsx-runtime";
var Quote = (props) => {
  const { Quote: Comp = {} } = useSymbolsStore();
  const { isNumber: isNumber2, ...other } = props;
  if (isNumber2) return null;
  const { as, render, ...reset } = Comp;
  const Elm = as || "span";
  const elmProps = { ...other, ...reset };
  const child = render && typeof render === "function" && render(elmProps);
  if (child) return child;
  return /* @__PURE__ */ jsx13(Elm, { ...elmProps });
};
Quote.displayName = "JVR.Quote";
var ValueQuote = (props) => {
  const { ValueQuote: Comp = {} } = useSymbolsStore();
  const { ...other } = props;
  const { as, render, ...reset } = Comp;
  const Elm = as || "span";
  const elmProps = { ...other, ...reset };
  const child = render && typeof render === "function" && render(elmProps);
  if (child) return child;
  return /* @__PURE__ */ jsx13(Elm, { ...elmProps });
};
ValueQuote.displayName = "JVR.ValueQuote";
var Colon = () => {
  const { Colon: Comp = {} } = useSymbolsStore();
  const { as, render, ...reset } = Comp;
  const Elm = as || "span";
  const child = render && typeof render === "function" && render(reset);
  if (child) return child;
  return /* @__PURE__ */ jsx13(Elm, { ...reset });
};
Colon.displayName = "JVR.Colon";
var Arrow = (props) => {
  const { Arrow: Comp = {} } = useSymbolsStore();
  const expands = useExpandsStore();
  const { expandKey } = props;
  const isExpanded = !!expands[expandKey];
  const { as, style, render, ...reset } = Comp;
  const Elm = as || "span";
  const isRender = render && typeof render === "function";
  const child = isRender && render({ ...reset, "data-expanded": isExpanded, style: { ...style, ...props.style } });
  if (child) return child;
  return /* @__PURE__ */ jsx13(Elm, { ...reset, style: { ...style, ...props.style } });
};
Arrow.displayName = "JVR.Arrow";
var BracketsOpen = ({ isBrackets }) => {
  const { BracketsLeft: BracketsLeft2 = {}, BraceLeft: BraceLeft2 = {} } = useSymbolsStore();
  if (isBrackets) {
    const { as, render: render2, ...reset } = BracketsLeft2;
    const BracketsLeftComp = as || "span";
    const child2 = render2 && typeof render2 === "function" && render2(reset);
    if (child2) return child2;
    return /* @__PURE__ */ jsx13(BracketsLeftComp, { ...reset });
  }
  const { as: elm, render, ...props } = BraceLeft2;
  const BraceLeftComp = elm || "span";
  const child = render && typeof render === "function" && render(props);
  if (child) return child;
  return /* @__PURE__ */ jsx13(BraceLeftComp, { ...props });
};
BracketsOpen.displayName = "JVR.BracketsOpen";
var BracketsClose = ({ isBrackets, isVisiable }) => {
  if (!isVisiable) return null;
  const { BracketsRight: BracketsRight2 = {}, BraceRight: BraceRight2 = {} } = useSymbolsStore();
  if (isBrackets) {
    const { as, render: render2, ...reset2 } = BracketsRight2;
    const BracketsRightComp = as || "span";
    const child2 = render2 && typeof render2 === "function" && render2(reset2);
    if (child2) return child2;
    return /* @__PURE__ */ jsx13(BracketsRightComp, { ...reset2 });
  }
  const { as: elm, render, ...reset } = BraceRight2;
  const BraceRightComp = elm || "span";
  const child = render && typeof render === "function" && render(reset);
  if (child) return child;
  return /* @__PURE__ */ jsx13(BraceRightComp, { ...reset });
};
BracketsClose.displayName = "JVR.BracketsClose";

// src/external/react-json-view/comps/NestedClose.tsx
import { jsx as jsx14 } from "react/jsx-runtime";
var NestedClose = (props) => {
  const { value, expandKey, level } = props;
  const expands = useExpandsStore();
  const isArray = Array.isArray(value);
  const { collapsed } = useStore();
  const isMySet = value instanceof Set;
  const isExpanded = expands[expandKey] ?? (typeof collapsed === "boolean" ? collapsed : typeof collapsed === "number" ? level > collapsed : false);
  const len = Object.keys(value).length;
  if (isExpanded || len === 0) {
    return null;
  }
  const style = {
    paddingLeft: 4
  };
  return /* @__PURE__ */ jsx14("div", { style, children: /* @__PURE__ */ jsx14(BracketsClose, { isBrackets: isArray || isMySet, isVisiable: true }) });
};
NestedClose.displayName = "JVR.NestedClose";

// src/external/react-json-view/comps/KeyValues.tsx
import { Fragment as Fragment3, useId, useRef as useRef5 } from "react";

// src/external/react-json-view/types/index.tsx
import { Fragment as Fragment2, useState as useState4 } from "react";

// src/external/react-json-view/comps/Copied.tsx
import { useState as useState3 } from "react";
import { jsx as jsx15 } from "react/jsx-runtime";
var Copied = (props) => {
  const { keyName, value, expandKey, ...other } = props;
  const { onCopied, enableClipboard } = useStore();
  const showTools = useShowToolsStore();
  const isShowTools = showTools[expandKey];
  const [copied, setCopied] = useState3(false);
  const { Copied: Comp = {} } = useSectionStore();
  if (enableClipboard === false || !isShowTools)
    return /* @__PURE__ */ jsx15("div", { style: { display: "inline-block", height: "13px", width: "13px", marginLeft: "5px" }, children: "\xA0" });
  const click = (event) => {
    event.stopPropagation();
    let copyText = JSON.stringify(
      value,
      (key, value2) => {
        if (typeof value2 === "bigint") {
          return value2.toString();
        }
        return value2;
      },
      2
    );
    if (typeof value === "number" && value === Infinity) copyText = "Infinity";
    if (typeof value === "number" && isNaN(value)) copyText = "NaN";
    if (typeof value === "bigint") copyText = value + "n";
    navigator.clipboard.writeText(copyText).then(() => {
      onCopied && onCopied(copyText, value);
      setCopied(true);
      const timer = setTimeout(() => {
        setCopied(false);
        clearTimeout(timer);
      }, 3e3);
    }).catch((error) => {
    });
  };
  const svgProps = {
    fill: copied ? "var(--w-rjv-copied-success-color, #28a745)" : "var(--w-rjv-copied-color, currentColor)",
    onClick: click
  };
  const { as, render, ...reset } = Comp;
  const elmProps = { ...reset, ...other, ...svgProps };
  const isRender = render && typeof render === "function";
  const child = isRender && render({ ...elmProps, "data-copied": copied }, { value, keyName });
  if (child) return child;
  if (copied) {
    return /* @__PURE__ */ jsx15("svg", { style: { display: "inline", height: "1em", width: "1em" }, viewBox: "0 0 32 36", ...elmProps, children: /* @__PURE__ */ jsx15("path", { d: "M27.5,33 L2.5,33 L2.5,12.5 L27.5,12.5 L27.5,15.2249049 C29.1403264,13.8627542 29.9736597,13.1778155 30,13.1700887 C30,11.9705278 30,10.0804982 30,7.5 C30,6.1 28.9,5 27.5,5 L20,5 C20,2.2 17.8,0 15,0 C12.2,0 10,2.2 10,5 L2.5,5 C1.1,5 0,6.1 0,7.5 L0,33 C0,34.4 1.1,36 2.5,36 L27.5,36 C28.9,36 30,34.4 30,33 L30,26.1114493 L27.5,28.4926435 L27.5,33 Z M7.5,7.5 L10,7.5 C10,7.5 12.5,6.4 12.5,5 C12.5,3.6 13.6,2.5 15,2.5 C16.4,2.5 17.5,3.6 17.5,5 C17.5,6.4 18.8,7.5 20,7.5 L22.5,7.5 C22.5,7.5 25,8.6 25,10 L5,10 C5,8.5 6.1,7.5 7.5,7.5 Z M5,27.5 L10,27.5 L10,25 L5,25 L5,27.5 Z M28.5589286,16 L32,19.6 L21.0160714,30.5382252 L13.5303571,24.2571429 L17.1303571,20.6571429 L21.0160714,24.5428571 L28.5589286,16 Z M17.5,15 L5,15 L5,17.5 L17.5,17.5 L17.5,15 Z M10,20 L5,20 L5,22.5 L10,22.5 L10,20 Z" }) });
  }
  return /* @__PURE__ */ jsx15("svg", { style: { display: "inline", height: "1em", width: "1em" }, viewBox: "0 0 32 36", ...elmProps, children: /* @__PURE__ */ jsx15("path", { d: "M27.5,33 L2.5,33 L2.5,12.5 L27.5,12.5 L27.5,20 L30,20 L30,7.5 C30,6.1 28.9,5 27.5,5 L20,5 C20,2.2 17.8,0 15,0 C12.2,0 10,2.2 10,5 L2.5,5 C1.1,5 0,6.1 0,7.5 L0,33 C0,34.4 1.1,36 2.5,36 L27.5,36 C28.9,36 30,34.4 30,33 L30,29 L27.5,29 L27.5,33 Z M7.5,7.5 L10,7.5 C10,7.5 12.5,6.4 12.5,5 C12.5,3.6 13.6,2.5 15,2.5 C16.4,2.5 17.5,3.6 17.5,5 C17.5,6.4 18.8,7.5 20,7.5 L22.5,7.5 C22.5,7.5 25,8.6 25,10 L5,10 C5,8.5 6.1,7.5 7.5,7.5 Z M5,27.5 L10,27.5 L10,25 L5,25 L5,27.5 Z M22.5,21.5 L22.5,16.5 L12.5,24 L22.5,31.5 L22.5,26.5 L32,26.5 L32,21.5 L22.5,21.5 Z M17.5,15 L5,15 L5,17.5 L17.5,17.5 L17.5,15 Z M10,20 L5,20 L5,22.5 L10,22.5 L10,20 Z" }) });
};
Copied.displayName = "JVR.Copied";

// src/external/react-json-view/types/index.tsx
import { jsx as jsx16, jsxs as jsxs3 } from "react/jsx-runtime";
var SetComp = ({ value }) => {
  const { Set: Comp = {}, displayDataTypes } = useTypesStore();
  const isSet = value instanceof Set;
  if (!isSet || !displayDataTypes) return null;
  const { as, render, ...reset } = Comp;
  const isRender = render && typeof render === "function";
  const type = isRender && render(reset, { type: "type", value });
  if (type) return type;
  const Elm = as || "span";
  return /* @__PURE__ */ jsx16(Elm, { ...reset });
};
SetComp.displayName = "JVR.SetComp";
var MapComp = ({ value }) => {
  const { Map: Comp = {}, displayDataTypes } = useTypesStore();
  const isMap = value instanceof Map;
  if (!isMap || !displayDataTypes) return null;
  const { as, render, ...reset } = Comp;
  const isRender = render && typeof render === "function";
  const type = isRender && render(reset, { type: "type", value });
  if (type) return type;
  const Elm = as || "span";
  return /* @__PURE__ */ jsx16(Elm, { ...reset });
};
MapComp.displayName = "JVR.MapComp";
var defalutStyle = {
  opacity: 0.75,
  paddingRight: 4
};
var TypeString = ({ children = "", expandKey, keyName }) => {
  const { Str = {}, displayDataTypes } = useTypesStore();
  const { shortenTextAfterLength: length = 30 } = useStore();
  const { as, render, ...reset } = Str;
  const childrenStr = children;
  const [shorten, setShorten] = useState4(length && childrenStr.length >= length);
  const Comp = as || "span";
  const style = {
    ...defalutStyle,
    ...Str.style || {}
  };
  if (length > 0) {
    reset.style = {
      ...reset.style,
      cursor: childrenStr.length <= length ? "initial" : "pointer"
    };
    if (childrenStr.length > length) {
      reset.onClick = () => {
        setShorten(!shorten);
      };
    }
  }
  const text = shorten ? `${childrenStr.slice(0, length)}...` : childrenStr;
  const isRender = render && typeof render === "function";
  const type = isRender && render({ ...reset, style }, { type: "type", value: children });
  const child = isRender && render({ ...reset, children: text, className: "w-rjv-value" }, { type: "value", value: children });
  return /* @__PURE__ */ jsxs3(Fragment2, { children: [
    displayDataTypes && (type || /* @__PURE__ */ jsx16(Comp, { ...reset, style })),
    child || /* @__PURE__ */ jsxs3(Fragment2, { children: [
      /* @__PURE__ */ jsx16(ValueQuote, {}),
      /* @__PURE__ */ jsx16(Comp, { ...reset, className: "w-rjv-value", children: text }),
      /* @__PURE__ */ jsx16(ValueQuote, {})
    ] }),
    /* @__PURE__ */ jsx16(Copied, { keyName, value: children, expandKey })
  ] });
};
TypeString.displayName = "JVR.TypeString";
var TypeTrue = ({ children, expandKey, keyName }) => {
  const { True: True2 = {}, displayDataTypes } = useTypesStore();
  const { as, render, ...reset } = True2;
  const Comp = as || "span";
  const style = {
    ...defalutStyle,
    ...True2.style || {}
  };
  const isRender = render && typeof render === "function";
  const type = isRender && render({ ...reset, style }, { type: "type", value: children });
  const child = isRender && render({ ...reset, children, className: "w-rjv-value" }, { type: "value", value: children });
  return /* @__PURE__ */ jsxs3(Fragment2, { children: [
    displayDataTypes && (type || /* @__PURE__ */ jsx16(Comp, { ...reset, style })),
    child || /* @__PURE__ */ jsx16(Comp, { ...reset, className: "w-rjv-value", children: children?.toString() }),
    /* @__PURE__ */ jsx16(Copied, { keyName, value: children, expandKey })
  ] });
};
TypeTrue.displayName = "JVR.TypeTrue";
var TypeFalse = ({ children, expandKey, keyName }) => {
  const { False: False2 = {}, displayDataTypes } = useTypesStore();
  const { as, render, ...reset } = False2;
  const Comp = as || "span";
  const style = {
    ...defalutStyle,
    ...False2.style || {}
  };
  const isRender = render && typeof render === "function";
  const type = isRender && render({ ...reset, style }, { type: "type", value: children });
  const child = isRender && render({ ...reset, children, className: "w-rjv-value" }, { type: "value", value: children });
  return /* @__PURE__ */ jsxs3(Fragment2, { children: [
    displayDataTypes && (type || /* @__PURE__ */ jsx16(Comp, { ...reset, style })),
    child || /* @__PURE__ */ jsx16(Comp, { ...reset, className: "w-rjv-value", children: children?.toString() }),
    /* @__PURE__ */ jsx16(Copied, { keyName, value: children, expandKey })
  ] });
};
TypeFalse.displayName = "JVR.TypeFalse";
var TypeFloat = ({ children, expandKey, keyName }) => {
  const { Float: Float2 = {}, displayDataTypes } = useTypesStore();
  const { as, render, ...reset } = Float2;
  const Comp = as || "span";
  const style = {
    ...defalutStyle,
    ...Float2.style || {}
  };
  const isRender = render && typeof render === "function";
  const type = isRender && render({ ...reset, style }, { type: "type", value: children });
  const child = isRender && render({ ...reset, children, className: "w-rjv-value" }, { type: "value", value: children });
  return /* @__PURE__ */ jsxs3(Fragment2, { children: [
    displayDataTypes && (type || /* @__PURE__ */ jsx16(Comp, { ...reset, style })),
    child || /* @__PURE__ */ jsx16(Comp, { ...reset, className: "w-rjv-value", children: children?.toString() }),
    /* @__PURE__ */ jsx16(Copied, { keyName, value: children, expandKey })
  ] });
};
TypeFloat.displayName = "JVR.TypeFloat";
var TypeInt = ({ children, expandKey, keyName }) => {
  const { Int: Int2 = {}, displayDataTypes } = useTypesStore();
  const { as, render, ...reset } = Int2;
  const Comp = as || "span";
  const style = {
    ...defalutStyle,
    ...Int2.style || {}
  };
  const isRender = render && typeof render === "function";
  const type = isRender && render({ ...reset, style }, { type: "type", value: children });
  const child = isRender && render({ ...reset, children, className: "w-rjv-value" }, { type: "value", value: children });
  return /* @__PURE__ */ jsxs3(Fragment2, { children: [
    displayDataTypes && (type || /* @__PURE__ */ jsx16(Comp, { ...reset, style })),
    child || /* @__PURE__ */ jsx16(Comp, { ...reset, className: "w-rjv-value", children: children?.toString() }),
    /* @__PURE__ */ jsx16(Copied, { keyName, value: children, expandKey })
  ] });
};
TypeInt.displayName = "JVR.TypeInt";
var TypeBigint = ({
  children,
  expandKey,
  keyName
}) => {
  const { Bigint: CompBigint = {}, displayDataTypes } = useTypesStore();
  const { as, render, ...reset } = CompBigint;
  const Comp = as || "span";
  const style = {
    ...defalutStyle,
    ...CompBigint.style || {}
  };
  const isRender = render && typeof render === "function";
  const type = isRender && render({ ...reset, style }, { type: "type", value: children });
  const child = isRender && render({ ...reset, children, className: "w-rjv-value" }, { type: "value", value: children });
  return /* @__PURE__ */ jsxs3(Fragment2, { children: [
    displayDataTypes && (type || /* @__PURE__ */ jsx16(Comp, { ...reset, style })),
    child || /* @__PURE__ */ jsx16(Comp, { ...reset, className: "w-rjv-value", children: children?.toString() + "n" }),
    /* @__PURE__ */ jsx16(Copied, { keyName, value: children, expandKey })
  ] });
};
TypeBigint.displayName = "JVR.TypeFloat";
var TypeUrl = ({ children, expandKey, keyName }) => {
  const { Url: Url2 = {}, displayDataTypes } = useTypesStore();
  const { as, render, ...reset } = Url2;
  const Comp = as || "span";
  const style = {
    ...defalutStyle,
    ...Url2.style
  };
  const isRender = render && typeof render === "function";
  const type = isRender && render({ ...reset, style }, { type: "type", value: children });
  const child = isRender && render({ ...reset, children: children?.href, className: "w-rjv-value" }, { type: "value", value: children });
  return /* @__PURE__ */ jsxs3(Fragment2, { children: [
    displayDataTypes && (type || /* @__PURE__ */ jsx16(Comp, { ...reset, style })),
    child || /* @__PURE__ */ jsxs3("a", { href: children?.href, target: "_blank", ...reset, className: "w-rjv-value", children: [
      /* @__PURE__ */ jsx16(ValueQuote, {}),
      children?.href,
      /* @__PURE__ */ jsx16(ValueQuote, {})
    ] }),
    /* @__PURE__ */ jsx16(Copied, { keyName, value: children, expandKey })
  ] });
};
TypeUrl.displayName = "JVR.TypeUrl";
var TypeDate = ({ children, expandKey, keyName }) => {
  const { Date: CompData = {}, displayDataTypes } = useTypesStore();
  const { as, render, ...reset } = CompData;
  const Comp = as || "span";
  const style = {
    ...defalutStyle,
    ...CompData.style || {}
  };
  const isRender = render && typeof render === "function";
  const type = isRender && render({ ...reset, style }, { type: "type", value: children });
  const childStr = children?.toString();
  const child = isRender && render({ ...reset, children: childStr, className: "w-rjv-value" }, { type: "value", value: children });
  return /* @__PURE__ */ jsxs3(Fragment2, { children: [
    displayDataTypes && (type || /* @__PURE__ */ jsx16(Comp, { ...reset, style })),
    child || /* @__PURE__ */ jsx16(Comp, { ...reset, className: "w-rjv-value", children: childStr }),
    /* @__PURE__ */ jsx16(Copied, { keyName, value: children, expandKey })
  ] });
};
TypeDate.displayName = "JVR.TypeDate";
var TypeUndefined = ({ children, expandKey, keyName }) => {
  const { Undefined: Undefined2 = {}, displayDataTypes } = useTypesStore();
  const { as, render, ...reset } = Undefined2;
  const Comp = as || "span";
  const style = {
    ...defalutStyle,
    ...Undefined2.style || {}
  };
  const isRender = render && typeof render === "function";
  const type = isRender && render({ ...reset, style }, { type: "type", value: children });
  const child = isRender && render({ ...reset, children, className: "w-rjv-value" }, { type: "value", value: children });
  return /* @__PURE__ */ jsxs3(Fragment2, { children: [
    displayDataTypes && (type || /* @__PURE__ */ jsx16(Comp, { ...reset, style })),
    child,
    /* @__PURE__ */ jsx16(Copied, { keyName, value: children, expandKey })
  ] });
};
TypeUndefined.displayName = "JVR.TypeUndefined";
var TypeNull = ({ children, expandKey, keyName }) => {
  const { Null: Null2 = {}, displayDataTypes } = useTypesStore();
  const { as, render, ...reset } = Null2;
  const Comp = as || "span";
  const style = {
    ...defalutStyle,
    ...Null2.style || {}
  };
  const isRender = render && typeof render === "function";
  const type = isRender && render({ ...reset, style }, { type: "type", value: children });
  const child = isRender && render({ ...reset, children, className: "w-rjv-value" }, { type: "value", value: children });
  return /* @__PURE__ */ jsxs3(Fragment2, { children: [
    displayDataTypes && (type || /* @__PURE__ */ jsx16(Comp, { ...reset, style })),
    child,
    /* @__PURE__ */ jsx16(Copied, { keyName, value: children, expandKey })
  ] });
};
TypeNull.displayName = "JVR.TypeNull";
var TypeNan = ({ children, expandKey, keyName }) => {
  const { Nan: Nan2 = {}, displayDataTypes } = useTypesStore();
  const { as, render, ...reset } = Nan2;
  const Comp = as || "span";
  const style = {
    ...defalutStyle,
    ...Nan2.style || {}
  };
  const isRender = render && typeof render === "function";
  const type = isRender && render({ ...reset, style }, { type: "type", value: children });
  const child = isRender && render({ ...reset, children: children?.toString(), className: "w-rjv-value" }, { type: "value", value: children });
  return /* @__PURE__ */ jsxs3(Fragment2, { children: [
    displayDataTypes && (type || /* @__PURE__ */ jsx16(Comp, { ...reset, style })),
    child,
    /* @__PURE__ */ jsx16(Copied, { keyName, value: children, expandKey })
  ] });
};
TypeNan.displayName = "JVR.TypeNan";

// src/external/react-json-view/comps/Value.tsx
import { jsx as jsx17 } from "react/jsx-runtime";
var isFloat = (n) => Number(n) === n && n % 1 !== 0 || isNaN(n);
var Value = (props) => {
  const { value, keyName, expandKey } = props;
  const reset = { keyName, expandKey };
  if (value instanceof URL) {
    return /* @__PURE__ */ jsx17(TypeUrl, { ...reset, children: value });
  }
  if (typeof value === "string") {
    return /* @__PURE__ */ jsx17(TypeString, { ...reset, children: value });
  }
  if (value === true) {
    return /* @__PURE__ */ jsx17(TypeTrue, { ...reset, children: value });
  }
  if (value === false) {
    return /* @__PURE__ */ jsx17(TypeFalse, { ...reset, children: value });
  }
  if (value === null) {
    return /* @__PURE__ */ jsx17(TypeNull, { ...reset, children: value });
  }
  if (value === void 0) {
    return /* @__PURE__ */ jsx17(TypeUndefined, { ...reset, children: value });
  }
  if (value instanceof Date) {
    return /* @__PURE__ */ jsx17(TypeDate, { ...reset, children: value });
  }
  if (typeof value === "number" && isNaN(value)) {
    return /* @__PURE__ */ jsx17(TypeNan, { ...reset, children: value });
  } else if (typeof value === "number" && isFloat(value)) {
    return /* @__PURE__ */ jsx17(TypeFloat, { ...reset, children: value });
  } else if (typeof value === "bigint") {
    return /* @__PURE__ */ jsx17(TypeBigint, { ...reset, children: value });
  } else if (typeof value === "number") {
    return /* @__PURE__ */ jsx17(TypeInt, { ...reset, children: value });
  }
  return null;
};
Value.displayName = "JVR.Value";

// src/external/react-json-view/utils/useRender.tsx
import { useEffect as useEffect11 } from "react";
function useSymbolsRender(currentProps, props, key) {
  const dispatch = useSymbolsDispatch();
  const cls = [currentProps.className, props.className].filter(Boolean).join(" ");
  const reset = {
    ...currentProps,
    ...props,
    className: cls,
    style: {
      ...currentProps.style,
      ...props.style
    },
    children: props.children || currentProps.children
  };
  useEffect11(() => dispatch({ [key]: reset }), [props]);
}
function useTypesRender(currentProps, props, key) {
  const dispatch = useTypesDispatch();
  const cls = [currentProps.className, props.className].filter(Boolean).join(" ");
  const reset = {
    ...currentProps,
    ...props,
    className: cls,
    style: {
      ...currentProps.style,
      ...props.style
    },
    children: props.children || currentProps.children
  };
  useEffect11(() => dispatch({ [key]: reset }), [props]);
}
function useSectionRender(currentProps, props, key) {
  const dispatch = useSectionDispatch();
  const cls = [currentProps.className, props.className].filter(Boolean).join(" ");
  const reset = {
    ...currentProps,
    ...props,
    className: cls,
    style: {
      ...currentProps.style,
      ...props.style
    },
    children: props.children || currentProps.children
  };
  useEffect11(() => dispatch({ [key]: reset }), [props]);
}

// src/external/react-json-view/section/KeyName.tsx
import { jsx as jsx18 } from "react/jsx-runtime";
var KeyName = (props) => {
  const { KeyName: Comp = {} } = useSectionStore();
  useSectionRender(Comp, props, "KeyName");
  return null;
};
KeyName.displayName = "JVR.KeyName";
var KeyNameComp = (props) => {
  const { children, value, keyName } = props;
  const isNumber2 = typeof children === "number";
  const style = {
    color: isNumber2 ? "var(--w-rjv-key-number, #268bd2)" : "var(--w-rjv-key-string, #002b36)"
  };
  const { KeyName: Comp = {} } = useSectionStore();
  const { as, render, ...reset } = Comp;
  reset.style = { ...reset.style, ...style };
  const Elm = as || "span";
  const child = render && typeof render === "function" && render({ ...reset, children }, { value, keyName });
  if (child) return child;
  return /* @__PURE__ */ jsx18(Elm, { ...reset, children });
};
KeyNameComp.displayName = "JVR.KeyNameComp";

// src/external/react-json-view/utils/useHighlight.tsx
import { useMemo as useMemo2, useRef as useRef4, useEffect as useEffect12 } from "react";
function usePrevious(value) {
  const ref = useRef4();
  useEffect12(() => {
    ref.current = value;
  });
  return ref.current;
}
function useHighlight({ value, highlightUpdates, highlightContainer }) {
  const prevValue = usePrevious(value);
  const isHighlight = useMemo2(() => {
    if (!highlightUpdates || prevValue === void 0) return false;
    if (typeof value !== typeof prevValue) {
      return true;
    }
    if (typeof value === "number") {
      if (isNaN(value) && isNaN(prevValue)) return false;
      return value !== prevValue;
    }
    if (Array.isArray(value) !== Array.isArray(prevValue)) {
      return true;
    }
    if (typeof value === "object" || typeof value === "function") {
      return false;
    }
    if (value !== prevValue) {
      return true;
    }
  }, [highlightUpdates, value]);
  useEffect12(() => {
    if (highlightContainer && highlightContainer.current && isHighlight && "animate" in highlightContainer.current) {
      highlightContainer.current.animate(
        [{ backgroundColor: "var(--w-rjv-update-color, #ebcb8b)" }, { backgroundColor: "" }],
        {
          duration: 1e3,
          easing: "ease-in"
        }
      );
    }
  }, [isHighlight, value, highlightContainer]);
}

// src/external/react-json-view/comps/KeyValues.tsx
import { jsx as jsx19, jsxs as jsxs4 } from "react/jsx-runtime";
var KeyValues = (props) => {
  const { value, expandKey = "", level } = props;
  const expands = useExpandsStore();
  const { objectSortKeys, indentWidth, collapsed } = useStore();
  const isMyArray = Array.isArray(value);
  const isExpanded = expands[expandKey] ?? (typeof collapsed === "boolean" ? collapsed : typeof collapsed === "number" ? level > collapsed : false);
  if (isExpanded) {
    return null;
  }
  let entries = isMyArray ? Object.entries(value).map((m) => [Number(m[0]), m[1]]) : Object.entries(value);
  if (objectSortKeys) {
    entries = objectSortKeys === true ? entries.sort(([a], [b]) => typeof a === "string" && typeof b === "string" ? a.localeCompare(b) : 0) : entries.sort(
      ([a, valA], [b, valB]) => typeof a === "string" && typeof b === "string" ? objectSortKeys(a, b, valA, valB) : 0
    );
  }
  const style = {
    borderLeft: "var(--w-rjv-border-left-width, 1px) var(--w-rjv-line-style, solid) var(--w-rjv-line-color, #ebebeb)",
    paddingLeft: indentWidth,
    marginLeft: 6
  };
  return /* @__PURE__ */ jsx19("div", { className: "w-rjv-wrap", style, children: entries.map(([key, val], idx) => {
    return /* @__PURE__ */ jsx19(KeyValuesItem, { parentValue: value, keyName: key, value: val, level }, idx);
  }) });
};
KeyValues.displayName = "JVR.KeyValues";
var KayName = (props) => {
  const { keyName, value } = props;
  const { highlightUpdates } = useStore();
  const isNumber2 = typeof keyName === "number";
  const highlightContainer = useRef5(null);
  useHighlight({ value, highlightUpdates, highlightContainer });
  return /* @__PURE__ */ jsxs4(Fragment3, { children: [
    /* @__PURE__ */ jsxs4("span", { ref: highlightContainer, children: [
      /* @__PURE__ */ jsx19(Quote, { isNumber: isNumber2, "data-placement": "left" }),
      /* @__PURE__ */ jsx19(KeyNameComp, { keyName, value, children: keyName }),
      /* @__PURE__ */ jsx19(Quote, { isNumber: isNumber2, "data-placement": "right" })
    ] }),
    /* @__PURE__ */ jsx19(Colon, {})
  ] });
};
KayName.displayName = "JVR.KayName";
var KeyValuesItem = (props) => {
  const { keyName, value, parentValue, level = 0 } = props;
  const dispatch = useShowToolsDispatch();
  const subkeyid = useId();
  const isMyArray = Array.isArray(value);
  const isMySet = value instanceof Set;
  const isMyMap = value instanceof Map;
  const isDate = value instanceof Date;
  const isUrl = value instanceof URL;
  const isMyObject = value && typeof value === "object" && !isMyArray && !isMySet && !isMyMap && !isDate && !isUrl;
  const isNested = isMyObject || isMyArray || isMySet || isMyMap;
  if (isNested) {
    const myValue = isMySet ? Array.from(value) : isMyMap ? Object.fromEntries(value) : value;
    return /* @__PURE__ */ jsx19(Container, { keyName, value: myValue, parentValue, initialValue: value, level: level + 1 });
  }
  const reset = {
    onMouseEnter: () => dispatch({ [subkeyid]: true }),
    onMouseLeave: () => dispatch({ [subkeyid]: false })
  };
  return /* @__PURE__ */ jsxs4("div", { className: "w-rjv-line", ...reset, children: [
    /* @__PURE__ */ jsx19(KayName, { keyName, value }),
    /* @__PURE__ */ jsx19(Value, { keyName, value, expandKey: subkeyid })
  ] });
};
KeyValuesItem.displayName = "JVR.KeyValuesItem";

// src/external/react-json-view/section/CountInfoExtra.tsx
import { jsx as jsx20 } from "react/jsx-runtime";
var CountInfoExtra = (props) => {
  const { CountInfoExtra: Comp = {} } = useSectionStore();
  useSectionRender(Comp, props, "CountInfoExtra");
  return null;
};
CountInfoExtra.displayName = "JVR.CountInfoExtra";
var CountInfoExtraComps = (props) => {
  const { value = {}, keyName, ...other } = props;
  const { CountInfoExtra: Comp = {} } = useSectionStore();
  const { as, render, ...reset } = Comp;
  if (!render && !reset.children) return null;
  const Elm = as || "span";
  const isRender = render && typeof render === "function";
  const elmProps = { ...reset, ...other };
  const child = isRender && render(elmProps, { value, keyName });
  if (child) return child;
  return /* @__PURE__ */ jsx20(Elm, { ...elmProps });
};
CountInfoExtraComps.displayName = "JVR.CountInfoExtraComps";

// src/external/react-json-view/section/CountInfo.tsx
import { jsx as jsx21 } from "react/jsx-runtime";
var CountInfo = (props) => {
  const { CountInfo: Comp = {} } = useSectionStore();
  useSectionRender(Comp, props, "CountInfo");
  return null;
};
CountInfo.displayName = "JVR.CountInfo";
var CountInfoComp = (props) => {
  const { value = {}, keyName, ...other } = props;
  const { displayObjectSize } = useStore();
  const { CountInfo: Comp = {} } = useSectionStore();
  if (!displayObjectSize) return null;
  const { as, render, ...reset } = Comp;
  const Elm = as || "span";
  reset.style = { ...reset.style, ...props.style };
  const len = Object.keys(value).length;
  if (!reset.children) {
    reset.children = `${len} items`;
  }
  const elmProps = { ...reset, ...other };
  const isRender = render && typeof render === "function";
  const child = isRender && render({ ...elmProps, "data-length": len }, { value, keyName });
  if (child) return child;
  return /* @__PURE__ */ jsx21(Elm, { ...elmProps });
};
CountInfoComp.displayName = "JVR.CountInfoComp";

// src/external/react-json-view/section/Ellipsis.tsx
import { jsx as jsx22 } from "react/jsx-runtime";
var Ellipsis = (props) => {
  const { Ellipsis: Comp = {} } = useSectionStore();
  useSectionRender(Comp, props, "Ellipsis");
  return null;
};
Ellipsis.displayName = "JVR.Ellipsis";
var EllipsisComp = ({ isExpanded, value, keyName }) => {
  const { Ellipsis: Comp = {} } = useSectionStore();
  const { as, render, ...reset } = Comp;
  const Elm = as || "span";
  const child = render && typeof render === "function" && render({ ...reset, "data-expanded": isExpanded }, { value, keyName });
  if (child) return child;
  if (!isExpanded) return null;
  return /* @__PURE__ */ jsx22(Elm, { ...reset });
};
EllipsisComp.displayName = "JVR.EllipsisComp";

// src/external/react-json-view/comps/NestedOpen.tsx
import { jsx as jsx23, jsxs as jsxs5 } from "react/jsx-runtime";
var NestedOpen = (props) => {
  const { keyName, expandKey, initialValue, value, level } = props;
  const expands = useExpandsStore();
  const dispatchExpands = useExpandsDispatch();
  const { onExpand, collapsed } = useStore();
  const isArray = Array.isArray(value);
  const isMySet = value instanceof Set;
  const isExpanded = expands[expandKey] ?? (typeof collapsed === "boolean" ? collapsed : typeof collapsed === "number" ? level > collapsed : false);
  const isObject = typeof value === "object";
  const click = () => {
    const opt = { expand: !isExpanded, value, keyid: expandKey, keyName };
    onExpand && onExpand(opt);
    dispatchExpands({ [expandKey]: opt.expand });
  };
  const style = { display: "inline-flex", alignItems: "center" };
  const arrowStyle = { transform: `rotate(${!isExpanded ? "0" : "-90"}deg)`, transition: "all 0.3s" };
  const len = Object.keys(value).length;
  const showArrow = len !== 0 && (isArray || isMySet || isObject);
  const reset = { style };
  if (showArrow) {
    reset.onClick = click;
  }
  return /* @__PURE__ */ jsxs5("span", { ...reset, children: [
    showArrow && /* @__PURE__ */ jsx23(Arrow, { style: arrowStyle, expandKey }),
    (keyName || typeof keyName === "number") && /* @__PURE__ */ jsx23(KayName, { keyName }),
    /* @__PURE__ */ jsx23(SetComp, { value: initialValue }),
    /* @__PURE__ */ jsx23(MapComp, { value: initialValue }),
    /* @__PURE__ */ jsx23(BracketsOpen, { isBrackets: isArray || isMySet }),
    /* @__PURE__ */ jsx23(EllipsisComp, { keyName, value, isExpanded }),
    /* @__PURE__ */ jsx23(BracketsClose, { isVisiable: isExpanded || !showArrow, isBrackets: isArray || isMySet }),
    /* @__PURE__ */ jsx23(CountInfoComp, { value, keyName }),
    /* @__PURE__ */ jsx23(CountInfoExtraComps, { value, keyName }),
    /* @__PURE__ */ jsx23(Copied, { keyName, value, expandKey })
  ] });
};
NestedOpen.displayName = "JVR.NestedOpen";

// src/external/react-json-view/Container.tsx
import { jsx as jsx24, jsxs as jsxs6 } from "react/jsx-runtime";
var Container = forwardRef((props, ref) => {
  const { className = "", children, parentValue, keyid, level = 1, value, initialValue, keyName, ...elmProps } = props;
  const dispatch = useShowToolsDispatch();
  const subkeyid = useId2();
  const defaultClassNames = [className, "w-rjv-inner"].filter(Boolean).join(" ");
  const reset = {
    onMouseEnter: () => dispatch({ [subkeyid]: true }),
    onMouseLeave: () => dispatch({ [subkeyid]: false })
  };
  return /* @__PURE__ */ jsxs6("div", { className: defaultClassNames, ref, ...elmProps, ...reset, children: [
    /* @__PURE__ */ jsx24(NestedOpen, { expandKey: subkeyid, value, level, keyName, initialValue }),
    /* @__PURE__ */ jsx24(KeyValues, { expandKey: subkeyid, value, level }),
    /* @__PURE__ */ jsx24(NestedClose, { expandKey: subkeyid, value, level })
  ] });
});
Container.displayName = "JVR.Container";

// src/external/react-json-view/symbol/BraceLeft.tsx
var BraceLeft = (props) => {
  const { BraceLeft: Comp = {} } = useSymbolsStore();
  useSymbolsRender(Comp, props, "BraceLeft");
  return null;
};
BraceLeft.displayName = "JVR.BraceLeft";

// src/external/react-json-view/symbol/BraceRight.tsx
var BraceRight = (props) => {
  const { BraceRight: Comp = {} } = useSymbolsStore();
  useSymbolsRender(Comp, props, "BraceRight");
  return null;
};
BraceRight.displayName = "JVR.BraceRight";

// src/external/react-json-view/symbol/BracketsLeft.tsx
var BracketsLeft = (props) => {
  const { BracketsLeft: Comp = {} } = useSymbolsStore();
  useSymbolsRender(Comp, props, "BracketsLeft");
  return null;
};
BracketsLeft.displayName = "JVR.BracketsLeft";

// src/external/react-json-view/symbol/BracketsRight.tsx
var BracketsRight = (props) => {
  const { BracketsRight: Comp = {} } = useSymbolsStore();
  useSymbolsRender(Comp, props, "BracketsRight");
  return null;
};
BracketsRight.displayName = "JVR.BracketsRight";

// src/external/react-json-view/symbol/Arrow.tsx
var Arrow2 = (props) => {
  const { Arrow: Comp = {} } = useSymbolsStore();
  useSymbolsRender(Comp, props, "Arrow");
  return null;
};
Arrow2.displayName = "JVR.Arrow";

// src/external/react-json-view/symbol/Colon.tsx
var Colon2 = (props) => {
  const { Colon: Comp = {} } = useSymbolsStore();
  useSymbolsRender(Comp, props, "Colon");
  return null;
};
Colon2.displayName = "JVR.Colon";

// src/external/react-json-view/symbol/Quote.tsx
var Quote2 = (props) => {
  const { Quote: Comp = {} } = useSymbolsStore();
  useSymbolsRender(Comp, props, "Quote");
  return null;
};
Quote2.displayName = "JVR.Quote";

// src/external/react-json-view/symbol/ValueQuote.tsx
var ValueQuote2 = (props) => {
  const { ValueQuote: Comp = {} } = useSymbolsStore();
  useSymbolsRender(Comp, props, "ValueQuote");
  return null;
};
ValueQuote2.displayName = "JVR.ValueQuote";

// src/external/react-json-view/types/Bigint.tsx
var Bigint = (props) => {
  const { Bigint: Comp = {} } = useTypesStore();
  useTypesRender(Comp, props, "Bigint");
  return null;
};
Bigint.displayName = "JVR.Bigint";

// src/external/react-json-view/types/Date.tsx
var Date2 = (props) => {
  const { Date: Comp = {} } = useTypesStore();
  useTypesRender(Comp, props, "Date");
  return null;
};
Date2.displayName = "JVR.Date";

// src/external/react-json-view/types/False.tsx
var False = (props) => {
  const { False: Comp = {} } = useTypesStore();
  useTypesRender(Comp, props, "False");
  return null;
};
False.displayName = "JVR.False";

// src/external/react-json-view/types/Float.tsx
var Float = (props) => {
  const { Float: Comp = {} } = useTypesStore();
  useTypesRender(Comp, props, "Float");
  return null;
};
Float.displayName = "JVR.Float";

// src/external/react-json-view/types/Int.tsx
var Int = (props) => {
  const { Int: Comp = {} } = useTypesStore();
  useTypesRender(Comp, props, "Int");
  return null;
};
Int.displayName = "JVR.Int";

// src/external/react-json-view/types/Map.tsx
var Map2 = (props) => {
  const { Map: Comp = {} } = useTypesStore();
  useTypesRender(Comp, props, "Map");
  return null;
};
Map2.displayName = "JVR.Map";

// src/external/react-json-view/types/Nan.tsx
var Nan = (props) => {
  const { Nan: Comp = {} } = useTypesStore();
  useTypesRender(Comp, props, "Nan");
  return null;
};
Nan.displayName = "JVR.Nan";

// src/external/react-json-view/types/Null.tsx
var Null = (props) => {
  const { Null: Comp = {} } = useTypesStore();
  useTypesRender(Comp, props, "Null");
  return null;
};
Null.displayName = "JVR.Null";

// src/external/react-json-view/types/Set.tsx
var Set2 = (props) => {
  const { Set: Comp = {} } = useTypesStore();
  useTypesRender(Comp, props, "Set");
  return null;
};
Set2.displayName = "JVR.Set";

// src/external/react-json-view/types/String.tsx
var StringText = (props) => {
  const { Str: Comp = {} } = useTypesStore();
  useTypesRender(Comp, props, "Str");
  return null;
};
StringText.displayName = "JVR.StringText";

// src/external/react-json-view/types/True.tsx
var True = (props) => {
  const { True: Comp = {} } = useTypesStore();
  useTypesRender(Comp, props, "True");
  return null;
};
True.displayName = "JVR.True";

// src/external/react-json-view/types/Undefined.tsx
var Undefined = (props) => {
  const { Undefined: Comp = {} } = useTypesStore();
  useTypesRender(Comp, props, "Undefined");
  return null;
};
Undefined.displayName = "JVR.Undefined";

// src/external/react-json-view/types/Url.tsx
var Url = (props) => {
  const { Url: Comp = {} } = useTypesStore();
  useTypesRender(Comp, props, "Url");
  return null;
};
Url.displayName = "JVR.Url";

// src/external/react-json-view/section/Copied.tsx
var Copied2 = (props) => {
  const { Copied: Comp = {} } = useSectionStore();
  useSectionRender(Comp, props, "Copied");
  return null;
};
Copied2.displayName = "JVR.Copied";

// src/external/react-json-view/index.tsx
import { jsx as jsx25, jsxs as jsxs7 } from "react/jsx-runtime";
var JsonView = forwardRef2((props, ref) => {
  const {
    className = "",
    style,
    value,
    children,
    collapsed,
    indentWidth = 15,
    displayObjectSize = true,
    shortenTextAfterLength = 20,
    highlightUpdates = true,
    enableClipboard = true,
    displayDataTypes = true,
    objectSortKeys = false,
    onExpand,
    ...elmProps
  } = props;
  const defaultStyle = {
    lineHeight: 1.4,
    fontFamily: "var(--w-rjv-font-family, Menlo, monospace)",
    color: "var(--w-rjv-color, #002b36)",
    backgroundColor: "var(--w-rjv-background-color, #00000000)",
    fontSize: 14,
    ...style
  };
  const cls = ["w-json-view-container", "w-rjv", className].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsxs7(
    Provider,
    {
      initialState: {
        value,
        objectSortKeys,
        indentWidth,
        displayObjectSize,
        collapsed,
        enableClipboard,
        shortenTextAfterLength,
        highlightUpdates,
        onExpand
      },
      initialTypes: { displayDataTypes },
      children: [
        /* @__PURE__ */ jsx25(Container, { value, ...elmProps, ref, className: cls, style: defaultStyle }),
        children
      ]
    }
  );
});
JsonView.Bigint = Bigint;
JsonView.Date = Date2;
JsonView.False = False;
JsonView.Float = Float;
JsonView.Int = Int;
JsonView.Map = Map2;
JsonView.Nan = Nan;
JsonView.Null = Null;
JsonView.Set = Set2;
JsonView.String = StringText;
JsonView.True = True;
JsonView.Undefined = Undefined;
JsonView.Url = Url;
JsonView.ValueQuote = ValueQuote2;
JsonView.Arrow = Arrow2;
JsonView.Colon = Colon2;
JsonView.Quote = Quote2;
JsonView.Ellipsis = Ellipsis;
JsonView.BraceLeft = BraceLeft;
JsonView.BraceRight = BraceRight;
JsonView.BracketsLeft = BracketsLeft;
JsonView.BracketsRight = BracketsRight;
JsonView.Copied = Copied2;
JsonView.CountInfo = CountInfo;
JsonView.CountInfoExtra = CountInfoExtra;
JsonView.KeyName = KeyName;
JsonView.displayName = "JVR.JsonView";
var react_json_view_default = JsonView;

// src/external/react-json-view/theme/custom.tsx
var customTheme = {
  "--w-rjv-font-family": "monospace",
  "--w-rjv-color": "#E7E5E4",
  "--w-rjv-key-string": "#fff",
  "--w-rjv-background-color": "#2e3440",
  "--w-rjv-line-color": "#4c566a",
  "--w-rjv-arrow-color": "var(--w-rjv-color)",
  "--w-rjv-edit-color": "var(--w-rjv-color)",
  "--w-rjv-info-color": "#60A5FA",
  "--w-rjv-update-color": "#88c0cf75",
  "--w-rjv-copied-color": "#119cc0",
  "--w-rjv-copied-success-color": "#28a745",
  "--w-rjv-curlybraces-color": "#E7E5E4",
  "--w-rjv-colon-color": "#E7E5E4",
  "--w-rjv-brackets-color": "#E7E5E4",
  "--w-rjv-quotes-color": "var(--w-rjv-key-string)",
  "--w-rjv-quotes-string-color": "var(--w-rjv-type-string-color)",
  "--w-rjv-ellipsis-color": "var(--w-rjv-color)",
  "--w-rjv-type-string-color": "#28a745",
  "--w-rjv-type-int-color": "#60A5FA",
  "--w-rjv-type-float-color": "#60A5FA",
  "--w-rjv-type-bigint-color": "#60A5FA",
  "--w-rjv-type-boolean-color": "#F43F5E",
  "--w-rjv-type-date-color": "#41a2c2",
  "--w-rjv-type-url-color": "#5e81ac",
  "--w-rjv-type-null-color": "#22D3EE",
  "--w-rjv-type-nan-color": "#60A5FA",
  "--w-rjv-type-undefined-color": "#22D3EE"
};

// src/client/components/jsonRenderer.tsx
import { jsx as jsx26 } from "react/jsx-runtime";
var isPromise = (value) => {
  return value && typeof value.then === "function";
};
var JsonRenderer = ({ data, expansionLevel }) => {
  const { settings } = useSettingsContext();
  const ref = useRef6(true);
  useEffect13(() => {
    ref.current = true;
    return () => {
      ref.current = false;
    };
  }, []);
  const originalData = useMemo3(
    () => typeof data === "string" ? data : Object.entries(data).map(([key, value]) => {
      if (isPromise(value)) {
        value.then((res) => {
          if (!ref.current) return;
          setJson((json2) => ({
            ...json2,
            [key]: res
          }));
        }).catch((e) => {
        });
        return { [key]: "Loading deferred data..." };
      }
      return { [key]: value };
    }).reduce((acc, curr) => {
      return { ...acc, ...curr };
    }, {}),
    [data]
  );
  const [json, setJson] = useState5(originalData);
  useEffect13(() => {
    let mounted = true;
    if (mounted) {
      setJson(data);
    }
    return () => {
      mounted = false;
    };
  }, [data]);
  if (typeof json === "string") {
    return /* @__PURE__ */ jsx26("div", { className: "rdt-max-w-xs rdt-text-green-600", children: json });
  }
  return /* @__PURE__ */ jsx26(react_json_view_default, { highlightUpdates: true, style: customTheme, collapsed: expansionLevel ?? settings.expansionLevel, value: json });
};

// src/client/tabs/TimelineTab.tsx
import { jsx as jsx27, jsxs as jsxs8 } from "react/jsx-runtime";
var Translations = {
  REDIRECT: "Normal Page navigation",
  FETCHER_REDIRECT: "Page navigation due to fetcher",
  ACTION_REDIRECT: "Page navigation due to action",
  FORM_SUBMISSION: "Form submission",
  FETCHER_SUBMIT: "Form submission from a fetcher",
  ACTION_RESPONSE: "Action response",
  FETCHER_RESPONSE: "Fetcher action response"
};
var RedirectEventComponent = (event) => {
  return /* @__PURE__ */ jsxs8("div", { className: "mb-4", children: [
    /* @__PURE__ */ jsxs8("time", { className: "mb-2 block text-sm font-normal leading-none text-gray-500", children: [
      'Navigated to url: "',
      event.to + event.search,
      '"'
    ] }),
    /* @__PURE__ */ jsx27("p", { className: "mb-4 text-base font-normal text-gray-400", children: event.hash }),
    event.responseData && /* @__PURE__ */ jsxs8("p", { className: "mb-4 text-base font-normal text-gray-400", children: [
      "Data received:",
      /* @__PURE__ */ jsx27(JsonRenderer, { data: event.responseData })
    ] })
  ] });
};
var FormEventComponent = (event) => {
  const firstPart = event.type === "ACTION_REDIRECT" ? `Redirect from "${event.to}" to "${event.from}"` : `Submission to url: "${event.to}"`;
  const responseData = event.responseData;
  return /* @__PURE__ */ jsxs8("div", { className: "mb-4", children: [
    /* @__PURE__ */ jsxs8("time", { className: "mb-2 block text-sm font-normal leading-none text-gray-500", children: [
      firstPart,
      " | encType: ",
      event.encType,
      " ",
      "fetcherKey" in event && typeof event.fetcherKey !== "undefined" ? `| Fetcher Key: ${event.fetcherKey}` : ""
    ] }),
    /* @__PURE__ */ jsxs8("div", { className: "flex gap-8", children: [
      event.data && event.type !== "ACTION_RESPONSE" && /* @__PURE__ */ jsxs8("div", { className: "mb-4 truncate text-base font-normal text-gray-400", children: [
        "Data sent:",
        /* @__PURE__ */ jsx27(JsonRenderer, { data: event.data })
      ] }),
      responseData && /* @__PURE__ */ jsxs8("div", { className: "mb-4 truncate text-base font-normal text-gray-400", children: [
        "Server Response Data:",
        /* @__PURE__ */ jsx27(JsonRenderer, { data: responseData })
      ] })
    ] })
  ] });
};
var METHOD_COLORS = {
  GET: "GREEN",
  POST: "BLUE",
  PUT: "TEAL",
  DELETE: "RED",
  PATCH: "PURPLE"
};
var TimelineTab = () => {
  const { timeline, clearTimeline } = useTimelineContext();
  return /* @__PURE__ */ jsxs8("div", { className: "relative flex h-full flex-col overflow-y-auto p-6 px-6", children: [
    timeline.length > 0 && /* @__PURE__ */ jsx27(
      "button",
      {
        type: "button",
        onClick: () => clearTimeline(),
        className: "absolute right-3 top-0 z-20 cursor-pointer rounded-lg border border-red-500 px-3 py-1 text-sm font-semibold text-white",
        children: "Clear"
      }
    ),
    /* @__PURE__ */ jsx27("ol", { className: "relative", children: timeline.map((event) => {
      return /* @__PURE__ */ jsxs8("li", { className: "mb-2 ml-8 animate-fade-in-left", children: [
        /* @__PURE__ */ jsx27("span", { className: "absolute -left-3 mt-2 flex h-6 w-6 animate-fade-in items-center justify-center rounded-full bg-blue-900 ring-4 ring-blue-900", children: /* @__PURE__ */ jsx27(Icon, { name: "Activity" }) }),
        /* @__PURE__ */ jsxs8("h3", { className: "-mt-3 mb-1 flex items-center gap-2 text-lg font-semibold text-white", children: [
          Translations[event.type],
          event?.method && /* @__PURE__ */ jsx27(Tag, { color: METHOD_COLORS[event.method], children: event.method })
        ] }),
        event.type === "REDIRECT" || event.type === "FETCHER_REDIRECT" ? /* @__PURE__ */ jsx27(RedirectEventComponent, { ...event }) : /* @__PURE__ */ jsx27(FormEventComponent, { ...event })
      ] }, event.id);
    }) })
  ] });
};

// src/client/components/network-tracer/NetworkBar.tsx
import { animate, motion, useMotionValue } from "framer-motion";
import { useEffect as useEffect14 } from "react";
import { jsx as jsx28, jsxs as jsxs9 } from "react/jsx-runtime";
var COLORS = {
  loader: "#4ade80",
  "client-loader": "#60a5fa",
  action: "#f59e0b",
  "client-action": "#ef4444",
  "custom-event": "#ffffff",
  pending: "#94a3b8",
  error: "#dc2626"
};
var NetworkBar = ({
  request,
  index,
  minTime,
  pixelsPerMs,
  barHeight,
  barPadding,
  now,
  onClick,
  isActive
}) => {
  const startX = (request.startTime - minTime) * pixelsPerMs;
  const currentEndTime = request.endTime || now;
  const duration = currentEndTime - request.startTime;
  const y = index * (barHeight + barPadding) + 24;
  const state = request.endTime ? "finished" : "pending";
  const color = state === "pending" ? COLORS.pending : COLORS[request.aborted ? "error" : request.type];
  const barWidth = useMotionValue(2);
  useEffect14(() => {
    const updateWidth = () => {
      if (request.endTime) {
        animate(barWidth, Math.max(2, (request.endTime - request.startTime) * pixelsPerMs), {
          duration: 0.3,
          ease: "easeOut"
        });
      } else if (isActive) {
        barWidth.set(Math.max(2, (now - request.startTime) * pixelsPerMs));
        requestAnimationFrame(updateWidth);
      }
    };
    if (isActive) {
      requestAnimationFrame(updateWidth);
    }
    if (!isActive) {
      barWidth.stop();
    }
    return () => {
      barWidth.stop();
    };
  }, [request.endTime, request.startTime, pixelsPerMs, now, barWidth, isActive]);
  return /* @__PURE__ */ jsxs9(
    motion.div,
    {
      style: {
        position: "absolute",
        top: y,
        height: barHeight,
        backgroundColor: color,
        borderRadius: "2px",
        width: barWidth,
        minWidth: "2px",
        x: startX
      },
      transition: {
        x: { duration: 0.3, ease: "easeOut" }
      },
      className: "relative overflow-hidden group cursor-pointer hover:brightness-110",
      onClick: (e) => onClick(e, request, index),
      children: [
        isActive && /* @__PURE__ */ jsx28(
          motion.div,
          {
            className: "absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20",
            animate: { x: ["-100%", "100%"] },
            transition: {
              repeat: Number.POSITIVE_INFINITY,
              duration: 1.5,
              ease: "linear"
            }
          }
        ),
        /* @__PURE__ */ jsxs9("div", { className: "absolute left-full top-1/2 -translate-y-1/2 ml-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 px-2 py-1 rounded text-xs whitespace-nowrap pointer-events-none z-10", children: [
          request.method,
          " ",
          request.url,
          /* @__PURE__ */ jsx28("br", {}),
          request.endTime ? `Duration: ${duration.toFixed(0)}ms` : `Elapsed: ${duration.toFixed(0)}ms...`
        ] })
      ]
    }
  );
};

// src/client/components/network-tracer/RequestDetails.tsx
import { jsx as jsx29, jsxs as jsxs10 } from "react/jsx-runtime";
var REQUEST_BORDER_COLORS = {
  loader: "border-green-500",
  "client-loader": "border-blue-500",
  action: "border-yellow-500",
  "client-action": "border-purple-500",
  "custom-event": "border-white",
  error: "border-red-500"
};
var RequestDetails = ({ request, onClose, total, index, onChangeRequest }) => {
  if (index === null) {
    return;
  }
  return /* @__PURE__ */ jsx29("div", { className: " w-full mt-4 bg-main rounded-lg shadow-xl p-4 z-50", children: /* @__PURE__ */ jsxs10("div", { className: "text-sm", children: [
    /* @__PURE__ */ jsxs10("div", { className: "font-bold text-lg mb-2 flex-col gap-4 w-full items-center", children: [
      /* @__PURE__ */ jsxs10("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxs10("div", { className: "flex items-center gap-2", children: [
          request?.method && /* @__PURE__ */ jsx29(Tag, { className: "w-max", color: METHOD_COLORS[request.method], children: request.method }),
          request?.type && /* @__PURE__ */ jsx29(
            "div",
            {
              className: `w-max flex items-center rounded px-2.5 py-0.5 text-sm font-medium border ${REQUEST_BORDER_COLORS[request.type]}`,
              children: request.type
            }
          ),
          request?.aborted && /* @__PURE__ */ jsx29(
            "div",
            {
              className: `w-max flex items-center rounded px-2.5 py-0.5 text-sm font-medium border ${REQUEST_BORDER_COLORS.error}`,
              children: "Request aborted"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs10("div", { className: "flex ml-auto items-center gap-4", children: [
          /* @__PURE__ */ jsxs10("div", { className: "flex items-center gap-2", children: [
            index > 0 ? /* @__PURE__ */ jsx29(
              "button",
              {
                type: "button",
                onClick: () => onChangeRequest(index - 1),
                className: "text-gray-400 hover:text-white flex items-center justify-center size-8 rounded-md border border-gray-500 text-gray-500",
                children: /* @__PURE__ */ jsx29(Icon, { name: "ChevronDown", className: "rotate-90" })
              }
            ) : null,
            index < total - 1 ? /* @__PURE__ */ jsx29(
              "button",
              {
                type: "button",
                onClick: () => onChangeRequest(index + 1),
                className: "text-gray-400 hover:text-white flex items-center justify-center size-8 rounded-md border border-gray-500 text-gray-500",
                children: /* @__PURE__ */ jsx29(Icon, { name: "ChevronDown", className: "-rotate-90" })
              }
            ) : null
          ] }),
          /* @__PURE__ */ jsx29(
            "button",
            {
              type: "button",
              className: "text-gray-400 hover:text-white flex items-center justify-center size-8 rounded-md border border-red-500 text-red-500",
              onClick: onClose,
              children: /* @__PURE__ */ jsx29(Icon, { name: "X" })
            }
          )
        ] })
      ] }),
      request.id,
      " ",
      /* @__PURE__ */ jsxs10("span", { className: "font-normal text-green-500", children: [
        "- ",
        request.url
      ] })
    ] }),
    /* @__PURE__ */ jsxs10("div", { children: [
      "Request duration: ",
      new Date(request.startTime).toLocaleTimeString(),
      " ",
      request.endTime && `- ${new Date(request.endTime).toLocaleTimeString()} `,
      request.endTime && /* @__PURE__ */ jsxs10("span", { className: "font-bold text-green-500", children: [
        "(",
        (request.endTime - request.startTime).toFixed(0),
        "ms)"
      ] })
    ] }),
    request.data && /* @__PURE__ */ jsxs10("div", { className: "mt-4 border border-gray-800 rounded-lg overflow-hidden border-2", children: [
      /* @__PURE__ */ jsx29("div", { className: "w-full px-4 py-2 bg-gray-800 text-lg", children: "Returned Data" }),
      /* @__PURE__ */ jsx29("div", { className: "p-4", children: /* @__PURE__ */ jsx29(JsonRenderer, { data: request.data }) })
    ] }),
    request.headers && Object.keys(request.headers).length > 0 && /* @__PURE__ */ jsxs10("div", { className: "mt-4 border border-gray-800 rounded-lg overflow-hidden border-2", children: [
      /* @__PURE__ */ jsx29("div", { className: "w-full px-4 py-2 bg-gray-800 text-lg", children: "Headers" }),
      /* @__PURE__ */ jsx29("div", { className: "p-4", children: /* @__PURE__ */ jsx29(JsonRenderer, { data: request.headers }) })
    ] })
  ] }) });
};

// src/client/components/network-tracer/NetworkWaterfall.tsx
import { jsx as jsx30, jsxs as jsxs11 } from "react/jsx-runtime";
var BAR_HEIGHT = 20;
var BAR_PADDING = 8;
var TIME_COLUMN_INTERVAL = 1e3;
var FUTURE_BUFFER = 1e3;
var INACTIVE_THRESHOLD = 100;
var TYPE_COLORS = {
  loader: "bg-green-500",
  "client-loader": "bg-blue-500",
  action: "bg-yellow-500",
  "client-action": "bg-purple-500",
  "custom-event": "bg-white"
};
var TYPE_TEXT_COLORS = {
  loader: "text-green-500",
  "client-loader": "text-blue-500",
  action: "text-yellow-500",
  "client-action": "text-purple-500",
  "custom-event": "text-white"
};
var NetworkWaterfall = ({ requests, width }) => {
  const containerRef = useRef7(null);
  const [scale, setScale] = useState6(0.1);
  const [isDragging, setIsDragging] = useState6(false);
  const [dragStart, setDragStart] = useState6({ x: 0, scrollLeft: 0 });
  const [selectedRequestIndex, setSelectedRequest] = useState6(null);
  const [now, setNow] = useState6(Date.now());
  const selectedRequest = selectedRequestIndex !== null ? requests[selectedRequestIndex] : null;
  const hasActiveRequests = requests.some(
    (req) => !req.endTime || req.endTime && now - req.endTime < INACTIVE_THRESHOLD
  );
  useEffect15(() => {
    if (!hasActiveRequests) {
      return;
    }
    const interval = setInterval(() => setNow(Date.now()), 16);
    return () => clearInterval(interval);
  }, [hasActiveRequests]);
  const minTime = Math.min(...requests.map((r) => r.startTime));
  const maxTime = hasActiveRequests ? now + FUTURE_BUFFER : requests.length > 0 ? Math.max(...requests.map((r) => r.endTime || r.startTime)) + 1e3 : now;
  const duration = maxTime - minTime;
  const pixelsPerMs = scale;
  const scaledWidth = Math.max(width, duration * pixelsPerMs);
  const timeColumns = Math.ceil(duration / TIME_COLUMN_INTERVAL);
  useEffect15(() => {
    if (containerRef.current && !isDragging && hasActiveRequests) {
      const currentTimePosition = (now - minTime) * pixelsPerMs;
      const containerWidth = containerRef.current.clientWidth;
      const targetScroll = Math.max(0, currentTimePosition - containerWidth * 0.8);
      containerRef.current.scrollLeft = targetScroll;
    }
  }, [now, minTime, pixelsPerMs, isDragging, hasActiveRequests]);
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.pageX - (containerRef.current?.offsetLeft || 0),
      scrollLeft: containerRef.current?.scrollLeft || 0
    });
  };
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (containerRef.current?.offsetLeft || 0);
    const walk = (x - dragStart.x) * 2;
    if (containerRef.current) {
      containerRef.current.scrollLeft = dragStart.scrollLeft - walk;
    }
  };
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  const handleBarClick = (e, request, index) => {
    setSelectedRequest(index);
  };
  const onChangeRequest = (index) => {
    setSelectedRequest(index);
  };
  const onClose = () => {
    setSelectedRequest(null);
  };
  useHotkeys("arrowleft,arrowright", (e) => {
    const order = selectedRequestIndex;
    if (order === null) {
      return onChangeRequest(0);
    }
    if (!selectedRequest) {
      return;
    }
    if (e.key === "ArrowLeft" && order > 0) {
      onChangeRequest(order - 1);
    }
    if (e.key === "ArrowRight" && order < requests.length - 1) {
      onChangeRequest(order + 1);
    }
  });
  return /* @__PURE__ */ jsxs11("div", { className: "relative", children: [
    /* @__PURE__ */ jsxs11("div", { className: "flex", children: [
      /* @__PURE__ */ jsxs11("div", { children: [
        /* @__PURE__ */ jsx30("div", { className: "h-5 flex items-center border-b border-gray-700 mb-1   pb-2", children: "Requests" }),
        /* @__PURE__ */ jsx30("div", { style: { gap: BAR_PADDING }, className: " pr-4 flex flex-col z-50 ", children: requests.map((request, index) => /* @__PURE__ */ jsxs11(
          "div",
          {
            style: { height: BAR_HEIGHT },
            className: "flex gap-2 items-center",
            children: [
              /* @__PURE__ */ jsxs11(
                "button",
                {
                  type: "button",
                  className: `flex w-full items-center focus-visible:outline-none gap-2 px-2 py-0.5 text-md text-white border rounded ${index === selectedRequestIndex ? `${REQUEST_BORDER_COLORS[request.type]}` : "border-transparent"}`,
                  onClick: (e) => handleBarClick(e, request, index),
                  children: [
                    /* @__PURE__ */ jsx30(
                      "div",
                      {
                        "data-tooltip-id": `${request.id}${request.startTime}`,
                        "data-tooltip-html": `<div>This was triggered by ${request.type.startsWith("a") ? "an" : "a"} <span class="font-bold ${TYPE_TEXT_COLORS[request.type]}">${request.type}</span> request</div>`,
                        "data-tooltip-place": "top",
                        className: `size-2 p-1 ${TYPE_COLORS[request.type]}`
                      }
                    ),
                    /* @__PURE__ */ jsx30(Tooltip, { place: "top", id: `${request.id}${request.startTime}` }),
                    /* @__PURE__ */ jsx30("div", { className: "pr-4", children: /* @__PURE__ */ jsx30("div", { className: "whitespace-nowrap", children: request.id }) })
                  ]
                }
              ),
              /* @__PURE__ */ jsx30("div", { className: "flex items-center ml-auto", children: request?.method && /* @__PURE__ */ jsx30(Tag, { className: "!px-1 !py-0 text-[0.7rem]", color: METHOD_COLORS[request.method], children: request.method }) })
            ]
          },
          request.id + request.startTime
        )) })
      ] }),
      /* @__PURE__ */ jsx30(
        "div",
        {
          ref: containerRef,
          className: "relative overflow-x-auto scrollbar-hide flex",
          style: {
            height: Math.min(requests.length * (BAR_HEIGHT + BAR_PADDING) + 24, window.innerHeight - 200),
            cursor: isDragging ? "grabbing" : "grab"
          },
          onMouseDown: handleMouseDown,
          onMouseMove: handleMouseMove,
          onMouseUp: handleMouseUp,
          onMouseLeave: handleMouseUp,
          children: /* @__PURE__ */ jsxs11("div", { className: "relative", style: { width: scaledWidth }, children: [
            /* @__PURE__ */ jsx30("div", { className: "absolute top-0 left-0 right-0 h-5 border-b border-gray-700", children: Array.from({ length: timeColumns }).map((_, i) => /* @__PURE__ */ jsxs11(
              "div",
              {
                className: "absolute top-0 h-full border-r-none border-t-none border-b-none !border-l border-white border-l-2 text-xs text-white ",
                style: {
                  left: i * TIME_COLUMN_INTERVAL * pixelsPerMs
                },
                children: [
                  /* @__PURE__ */ jsxs11("span", { className: "ml-1", children: [
                    i,
                    "s"
                  ] }),
                  /* @__PURE__ */ jsx30(
                    "div",
                    {
                      className: "absolute -left-[1px] border-l  stroke-5 border-dashed border-gray-700 ",
                      style: { height: BAR_HEIGHT * requests.length + 1 + (BAR_PADDING * requests.length + 1), width: 1 }
                    }
                  )
                ]
              },
              i
            )) }),
            /* @__PURE__ */ jsx30(AnimatePresence, { children: requests.map((request, index) => /* @__PURE__ */ jsx30(
              NetworkBar,
              {
                request,
                index,
                minTime,
                pixelsPerMs,
                barHeight: BAR_HEIGHT,
                barPadding: BAR_PADDING,
                now,
                onClick: handleBarClick,
                isActive: hasActiveRequests
              },
              request.id + request.startTime
            )) })
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsx30("div", { className: "w-full", children: selectedRequest && /* @__PURE__ */ jsx30(AnimatePresence, { children: /* @__PURE__ */ jsx30(
      RequestDetails,
      {
        total: requests.length,
        index: selectedRequestIndex,
        request: selectedRequest,
        onChangeRequest,
        onClose
      }
    ) }) })
  ] });
};
var NetworkWaterfall_default = NetworkWaterfall;

// src/client/components/network-tracer/NetworkPanel.tsx
import { jsx as jsx31 } from "react/jsx-runtime";
function NetworkPanel() {
  const { requests } = useRequestContext();
  const [containerWidth, setContainerWidth] = useState7(800);
  useEffect16(() => {
    const updateWidth = () => {
      const container = document.querySelector(".network-container");
      if (container) {
        setContainerWidth(container.clientWidth);
      }
    };
    window.addEventListener("resize", updateWidth);
    updateWidth();
    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  return /* @__PURE__ */ jsx31("div", { className: " text-gray-100", children: /* @__PURE__ */ jsx31("div", { className: "mx-auto p-1", children: /* @__PURE__ */ jsx31("div", { className: "bg-gray-800 rounded-lg shadow-xl overflow-hidden", children: /* @__PURE__ */ jsx31("div", { className: "border-t border-gray-700 p-4 network-container", children: /* @__PURE__ */ jsx31(NetworkWaterfall_default, { requests, width: containerWidth - 32 }) }) }) }) });
}
var NetworkPanel_default = NetworkPanel;

// src/client/tabs/NetworkTab.tsx
import { jsx as jsx32 } from "react/jsx-runtime";
var NetworkTab = () => {
  return /* @__PURE__ */ jsx32(NetworkPanel_default, {});
};

// src/client/tabs/PageTab.tsx
import clsx6 from "clsx";
import { useMemo as useMemo4 } from "react";
import { useMatches as useMatches2, useRevalidator } from "react-router";

// src/client/components/RouteSegmentInfo.tsx
import clsx5 from "clsx";

// src/server/parser.ts
var parseCacheControlHeader = (headers) => {
  const cacheControl = headers.get("cache-control");
  if (!cacheControl) return {};
  const parts = cacheControl.split(",");
  const cacheControlObject = {};
  for (const part of parts) {
    const [key, value] = part.split("=");
    if (!key) continue;
    cacheControlObject[key.trim()] = value?.trim();
  }
  const returnValue = Object.entries(cacheControlObject).reduce((acc, [key, value]) => {
    const k = key.trim().split("-").map((k2, i) => i === 0 ? k2 : uppercaseFirstLetter(k2)).join("");
    if (!value) {
      return { ...acc, [k]: true };
    }
    return { ...acc, [k]: value };
  }, {});
  return returnValue;
};

// src/client/utils/routing.ts
function getRouteType(route) {
  if (route.id === "root") {
    return "ROOT";
  }
  if (route.index) {
    return "ROUTE";
  }
  if (!route.path) {
    return "LAYOUT";
  }
  if (!window.__reactRouterManifest) {
    return "ROUTE";
  }
  const childIndexRoute = Object.values(window.__reactRouterManifest.routes).find(
    (r) => r?.parentId === route.id && r.index
  );
  return childIndexRoute ? "LAYOUT" : "ROUTE";
}
function isLayoutRoute(route) {
  if (!route) {
    return false;
  }
  return getRouteType(route) === "LAYOUT";
}
function isLeafRoute(route) {
  return getRouteType(route) === "ROUTE";
}
var ROUTE_FILLS = {
  GREEN: "fill-green-500 text-white",
  BLUE: "fill-blue-500 text-white",
  PURPLE: "fill-purple-500 text-white"
};
function getRouteColor(route) {
  switch (getRouteType(route)) {
    case "ROOT":
      return ROUTE_FILLS.PURPLE;
    case "LAYOUT":
      return ROUTE_FILLS.BLUE;
    case "ROUTE":
      return ROUTE_FILLS.GREEN;
  }
}
var constructRoutePath = (route, routeWildcards) => {
  const hasWildcard = route.url.includes(":");
  const wildcards = routeWildcards[route.id];
  const path = route.url.split("/").map((p) => {
    if (p.startsWith(":")) {
      return wildcards?.[p] ? wildcards?.[p] : p;
    }
    return p;
  }).join("/");
  const pathToOpen = document.location.origin + (path === "/" ? path : `/${path}`);
  return { pathToOpen, path, hasWildcard };
};
var createExtendedRoutes = () => {
  if (!window.__reactRouterManifest) {
    return [];
  }
  return Object.values(window.__reactRouterManifest.routes).map((route) => {
    return {
      ...route,
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      url: convertReactRouterPathToUrl(window.__reactRouterManifest.routes, route),
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      errorBoundary: findParentErrorBoundary(window.__reactRouterManifest.routes, route)
    };
  }).filter((route) => isLeafRoute(route));
};

// src/client/components/CacheInfo.tsx
import { add } from "date-fns/add";
import { formatDistance } from "date-fns/formatDistance";

// src/client/hooks/useCountdown.ts
import { useEffect as useEffect17, useState as useState8 } from "react";
var getTimeLeft = (countDown) => {
  const days = Math.floor(countDown / (1e3 * 60 * 60 * 24));
  const hours = Math.floor(countDown % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60));
  const minutes = Math.floor(countDown % (1e3 * 60 * 60) / (1e3 * 60));
  const seconds = Math.floor(countDown % (1e3 * 60) / 1e3);
  return { days, hours, minutes, seconds };
};
var useCountdown = (targetDate) => {
  const countDownDate = new Date(targetDate).getTime();
  const [countDown, setCountDown] = useState8(countDownDate - (/* @__PURE__ */ new Date()).getTime());
  useEffect17(() => {
    const timeLeft2 = getTimeLeft(countDown);
    if (timeLeft2.seconds <= 0) {
      return;
    }
    const interval = setInterval(() => {
      setCountDown(countDownDate - (/* @__PURE__ */ new Date()).getTime());
    }, 1e3);
    return () => clearInterval(interval);
  }, [countDownDate]);
  const timeLeft = getTimeLeft(countDown);
  const stringRepresentation = `${timeLeft.days > 0 ? `${timeLeft.days}d ` : ""}${timeLeft.hours ? `${timeLeft.hours}h ` : ""}${timeLeft.minutes ? `${timeLeft.minutes}m ` : ""}${timeLeft.seconds ? `${timeLeft.seconds}s` : ""}`;
  return { ...timeLeft, stringRepresentation };
};

// src/client/components/CacheInfo.tsx
import { jsxs as jsxs12 } from "react/jsx-runtime";
var CacheInfo = ({ cacheDate, cacheControl }) => {
  const { maxAge, sMaxage, private: isPrivate } = cacheControl;
  const age = !isPrivate && !maxAge ? sMaxage : maxAge;
  const targetDate = add(cacheDate, { seconds: age ? Number.parseInt(age) : 0 });
  const { minutes, seconds, stringRepresentation } = useCountdown(targetDate);
  const distance = formatDistance(targetDate, cacheDate, { addSuffix: true });
  if (seconds <= 0) {
    return;
  }
  return /* @__PURE__ */ jsxs12(Tag, { color: minutes < 1 ? "RED" : "PURPLE", children: [
    "[",
    cacheControl.private ? "Private" : "Shared",
    "] Loader Cache expires ",
    distance,
    " (",
    stringRepresentation,
    ")"
  ] });
};

// src/client/components/EditorButton.tsx
import clsx3 from "clsx";
import { jsxs as jsxs13 } from "react/jsx-runtime";
var EditorButton = ({ name, onClick, ...props }) => {
  return /* @__PURE__ */ jsxs13(
    "button",
    {
      onClick,
      type: "button",
      className: clsx3(
        "flex cursor-pointer items-center gap-1 rounded border border-[#1F9CF0] px-2.5 py-0.5 text-sm font-medium text-[#1F9CF0]"
      ),
      ...props,
      children: [
        "Open in ",
        name
      ]
    }
  );
};

// src/client/components/InfoCard.tsx
import clsx4 from "clsx";
import { jsx as jsx33, jsxs as jsxs14 } from "react/jsx-runtime";
var InfoCard = ({
  children,
  title,
  onClear
}) => {
  return /* @__PURE__ */ jsxs14("div", { className: "mb-4 h-min rounded-lg border-solid border-gray-500/40 text-base font-normal text-white transition-all", children: [
    /* @__PURE__ */ jsxs14(
      "h3",
      {
        className: clsx4(
          "flex min-h-[30px] items-center text-left text-sm",
          onClear ? "flex items-center justify-between gap-3" : ""
        ),
        children: [
          title,
          onClear && typeof import.meta.hot === "undefined" && /* @__PURE__ */ jsx33(
            "button",
            {
              type: "button",
              onClick: onClear,
              className: "cursor-pointer rounded bg-red-500 px-2 py-1 text-sm font-semibold text-white",
              children: "Clear"
            }
          )
        ]
      }
    ),
    children
  ] });
};

// src/client/components/RouteSegmentInfo.tsx
import { jsx as jsx34, jsxs as jsxs15 } from "react/jsx-runtime";
var getLoaderData = (data) => {
  if (typeof data === "string") {
    try {
      const temp = JSON.parse(data);
      return JSON.stringify(temp, null, 2);
    } catch (e) {
      return data;
    }
  }
  return data;
};
var cleanupLoaderOrAction = (routeInfo) => {
  if (!Object.keys(routeInfo).length) return {};
  return {
    executionTime: `${routeInfo.executionTime}ms`,
    ...routeInfo.responseData ? { responseData: routeInfo.responseData } : {},
    ...routeInfo.requestData ? { requestData: routeInfo.requestData } : {},
    ...routeInfo.responseHeaders ? { responseHeaders: routeInfo.responseHeaders } : {},
    ...routeInfo.requestHeaders ? { requestHeaders: routeInfo.requestHeaders } : {},
    ...routeInfo.responseHeaders?.["cache-control"] && {
      cacheInfo: { ...parseCacheControlHeader(new Headers(routeInfo.responseHeaders)) }
    }
  };
};
var cleanServerInfo = (routeInfo) => {
  return {
    loaderInfo: {
      loaderTriggerCount: routeInfo.loaderTriggerCount,
      lowestExecutionTime: `${routeInfo.lowestExecutionTime}ms`,
      highestExecutionTime: `${routeInfo.highestExecutionTime}ms`,
      averageExecutionTime: `${routeInfo.averageExecutionTime}ms`,
      lastLoaderInfo: cleanupLoaderOrAction(routeInfo.lastLoader),
      lastNLoaderCalls: routeInfo.loaders?.map((loader) => cleanupLoaderOrAction(loader)).reverse()
    },
    actionInfo: {
      actionTriggerCount: routeInfo.actionTriggerCount,
      ...routeInfo.lastAction && {
        lastActionInfo: cleanupLoaderOrAction(routeInfo.lastAction)
      },
      lastNActionCalls: routeInfo.actions?.map((action) => cleanupLoaderOrAction(action)).reverse()
    },
    ...cleanupLoaderOrAction(routeInfo.lastLoader)
  };
};
var ROUTE_COLORS = {
  GREEN: "bg-green-500 ring-green-500 text-white",
  BLUE: "bg-blue-500 ring-blue-500 text-white",
  TEAL: "bg-teal-400 ring-teal-400 text-white",
  RED: "bg-red-500 ring-red-500 text-white",
  PURPLE: "bg-purple-500 ring-purple-500 text-white"
};
var RouteSegmentInfo = ({ route, i }) => {
  const { server, setServerInfo } = useServerInfo();
  const { isConnected, sendJsonMessage } = useDevServerConnection();
  const loaderData = getLoaderData(route.data);
  const serverInfo = server?.routes?.[route.id];
  const isRoot = route.id === "root";
  const { setSettings, settings } = useSettingsContext();
  const editorName = settings.editorName;
  const cacheControl = serverInfo?.lastLoader.responseHeaders ? parseCacheControlHeader(new Headers(serverInfo?.lastLoader.responseHeaders)) : void 0;
  const onHover = (path, type) => {
    if (settings.showRouteBoundariesOn === "click") {
      return;
    }
    setSettings({
      hoveredRoute: path,
      isHoveringRoute: type === "enter"
    });
  };
  const entryRoute = window.__reactRouterManifest?.routes[route.id];
  const isLayout = isLayoutRoute(entryRoute);
  const clearServerInfoForRoute = () => {
    const newServerInfo = { ...server?.routes };
    newServerInfo[route.id] = defaultServerRouteState;
    setServerInfo({ routes: newServerInfo });
  };
  return /* @__PURE__ */ jsxs15(
    "li",
    {
      "data-testid": route.id,
      onMouseEnter: () => onHover(route.id === "root" ? "root" : i.toString(), "enter"),
      onMouseLeave: () => onHover(route.id === "root" ? "root" : i.toString(), "leave"),
      className: "mb-8 ml-6 lg:ml-8",
      children: [
        /* @__PURE__ */ jsx34(
          "div",
          {
            className: clsx5(
              "absolute -left-4 flex h-8 w-8 items-center justify-center rounded-full",
              ROUTE_COLORS[isRoot ? "PURPLE" : isLayout ? "BLUE" : "GREEN"]
            ),
            children: /* @__PURE__ */ jsx34(Icon, { name: isRoot ? "Root" : isLayout ? "Layout" : "CornerDownRight", size: "sm" })
          }
        ),
        /* @__PURE__ */ jsxs15("h2", { className: "text-md -mt-3 mb-1 text-white flex items-center justify-between gap-2 font-semibold text-white", children: [
          route.pathname,
          /* @__PURE__ */ jsxs15("div", { className: "flex gap-2", children: [
            Boolean(cacheControl && serverInfo?.lastLoader.timestamp) && /* @__PURE__ */ jsx34(
              CacheInfo,
              {
                cacheControl,
                cacheDate: new Date(serverInfo?.lastLoader.timestamp ?? "")
              },
              JSON.stringify(serverInfo?.lastLoader ?? "")
            ),
            /* @__PURE__ */ jsxs15("div", { className: "flex items-center gap-2", children: [
              isConnected && import.meta.env.DEV && /* @__PURE__ */ jsx34(
                EditorButton,
                {
                  name: editorName,
                  "data-testid": `${route.id}-open-source`,
                  onClick: () => {
                    sendJsonMessage({
                      type: "open-source",
                      data: { routeID: route.id }
                    });
                  }
                }
              ),
              settings.showRouteBoundariesOn === "click" && /* @__PURE__ */ jsx34(
                "button",
                {
                  type: "button",
                  "data-testid": `${route.id}-show-route-boundaries`,
                  className: "rounded border border-green-600 rounded border border-[#1F9CF0] px-2.5 py-0.5 text-sm font-medium text-green-600",
                  onClick: () => {
                    const routeId = route.id === "root" ? "root" : i.toString();
                    if (routeId !== settings.hoveredRoute) {
                      setSettings({
                        isHoveringRoute: false
                      });
                      setTimeout(() => {
                        setSettings({
                          hoveredRoute: routeId,
                          isHoveringRoute: true
                        });
                      });
                    } else {
                      setSettings({
                        isHoveringRoute: !settings.isHoveringRoute
                      });
                    }
                  },
                  children: "Show Route Boundary"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs15("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsxs15("p", { className: "mb-2 block text-sm font-normal leading-none text-gray-500  ", children: [
            "Route segment file: ",
            route.id
          ] }),
          /* @__PURE__ */ jsxs15("div", { className: "flex flex-wrap gap-6", children: [
            loaderData && /* @__PURE__ */ jsx34(InfoCard, { title: "Returned loader data", children: /* @__PURE__ */ jsx34(JsonRenderer, { data: loaderData }) }),
            serverInfo && import.meta.env.DEV && /* @__PURE__ */ jsx34(InfoCard, { onClear: clearServerInfoForRoute, title: "Server information", children: /* @__PURE__ */ jsx34(JsonRenderer, { data: cleanServerInfo(serverInfo) }) }),
            route.params && Object.keys(route.params).length > 0 && /* @__PURE__ */ jsx34(InfoCard, { title: "Route params", children: /* @__PURE__ */ jsx34(JsonRenderer, { data: route.params }) }),
            Boolean(route.handle && Object.keys(route.handle).length > 0) && /* @__PURE__ */ jsx34(InfoCard, { title: "Route handle", children: /* @__PURE__ */ jsx34(JsonRenderer, { data: route.handle }) })
          ] })
        ] })
      ]
    }
  );
};

// src/client/tabs/PageTab.tsx
import { Fragment as Fragment4, jsx as jsx35, jsxs as jsxs16 } from "react/jsx-runtime";
var PageTab = () => {
  const routes = useMatches2();
  const reversed = useMemo4(() => routes.reverse(), [routes]);
  const { revalidate, state } = useRevalidator();
  return /* @__PURE__ */ jsxs16(Fragment4, { children: [
    /* @__PURE__ */ jsxs16("div", { className: "sticky w-full top-0 z-30 mb-2 bg-[#212121] pt-2", children: [
      /* @__PURE__ */ jsxs16("div", { className: "mb-1 flex justify-between ", children: [
        /* @__PURE__ */ jsx35("div", { className: "text-lg font-semibold", children: "Active Route Segments" }),
        /* @__PURE__ */ jsx35(
          "button",
          {
            type: "button",
            onClick: () => revalidate(),
            "data-testid": "revalidate-button",
            className: clsx6(
              "z-20 cursor-pointer rounded-lg border border-green-500 px-3 py-1 text-sm font-semibold text-white",
              state !== "idle" && "pointer-events-none opacity-50"
            ),
            children: state !== "idle" ? "Revalidating..." : "Revalidate"
          }
        )
      ] }),
      /* @__PURE__ */ jsx35("hr", { className: "border-gray-700" })
    ] }),
    /* @__PURE__ */ jsx35("div", { className: "relative flex h-full flex-col p-6 px-2 pl-4 lg:px-6", children: /* @__PURE__ */ jsx35(
      "ol",
      {
        className: clsx6("relative border-l border-gray-700", state === "loading" && "pointer-events-none opacity-50"),
        children: reversed.map((route, i) => /* @__PURE__ */ jsx35(RouteSegmentInfo, { route, i }, route.id))
      }
    ) })
  ] });
};

// src/client/tabs/RoutesTab.tsx
import { useState as useState10 } from "react";
import { useMatches as useMatches3, useNavigate as useNavigate2 } from "react-router";

// src/client/components/Accordion.tsx
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import * as React4 from "react";
import { jsx as jsx36, jsxs as jsxs17 } from "react/jsx-runtime";
var Accordion = AccordionPrimitive.Root;
var AccordionItem = React4.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx36(AccordionPrimitive.Item, { ref, className: cn("border-b border-b-gray-500", className), ...props }));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = React4.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx36(AccordionPrimitive.Header, { className: "flex", children: /* @__PURE__ */ jsxs17(
  AccordionPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex flex-1 items-center w-full justify-between py-2 text-sm font-medium transition-all [&[data-state=open]>svg]:rotate-180",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx36(Icon, { className: "text-white h-4 w-4 shrink-0 transition-transform duration-200", name: "ChevronDown" })
    ]
  }
) }));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;
var AccordionContent = React4.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx36(
  AccordionPrimitive.Content,
  {
    ref,
    className: cn(
      "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx36("div", { className: "pt-0", children })
  }
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

// src/client/components/NewRouteForm.tsx
import clsx8 from "clsx";
import { useState as useState9 } from "react";

// src/client/components/Checkbox.tsx
import { jsx as jsx37, jsxs as jsxs18 } from "react/jsx-runtime";
var Checkbox = ({ onChange, id, children, value, hint, ...props }) => {
  return /* @__PURE__ */ jsxs18("div", { children: [
    /* @__PURE__ */ jsx37("label", { className: "text-md cursor-pointer", htmlFor: id, children: /* @__PURE__ */ jsxs18("div", { className: "flex items-center gap-2 py-1", children: [
      /* @__PURE__ */ jsx37(
        "input",
        {
          value: value ? "checked" : void 0,
          checked: value,
          onChange,
          id,
          type: "checkbox",
          ...props
        }
      ),
      children
    ] }) }),
    hint && /* @__PURE__ */ jsx37("p", { className: "text-sm text-gray-500", children: hint })
  ] });
};

// src/client/components/Input.tsx
import clsx7 from "clsx";
import { jsx as jsx38, jsxs as jsxs19 } from "react/jsx-runtime";
var Label = ({ className, children, ...props }) => {
  return /* @__PURE__ */ jsx38("label", { htmlFor: props.name, className: clsx7("block text-white text-sm", className), ...props, children });
};
var Hint = ({ children }) => {
  return /* @__PURE__ */ jsx38("p", { className: "text-sm text-gray-500", children });
};
var Input = ({ className, name, label, hint, ...props }) => {
  return /* @__PURE__ */ jsxs19("div", { className: "flex w-full flex-col gap-1", children: [
    label && /* @__PURE__ */ jsx38(Label, { htmlFor: name, children: label }),
    /* @__PURE__ */ jsx38(
      "input",
      {
        name,
        id: name,
        className: clsx7(
          "w-full rounded transition-all text-white border border-gray-400 hover:border-gray-400/50 bg-[#121212] px-2 py-1 text-sm",
          className
        ),
        ...props
      }
    ),
    hint && /* @__PURE__ */ jsx38(Hint, { children: hint })
  ] });
};

// src/client/components/NewRouteForm.tsx
import { jsx as jsx39, jsxs as jsxs20 } from "react/jsx-runtime";
var DEFAULT_VALUES = {
  path: "",
  loader: false,
  clientLoader: false,
  action: false,
  clientAction: false,
  headers: false,
  errorBoundary: false,
  revalidate: false,
  handler: false,
  meta: false,
  links: false
};
var NewRouteForm = () => {
  const [newRouteInfo, setNewRouteInfo] = useState9(DEFAULT_VALUES);
  const handleSubmit = () => {
    const { path, ...options } = newRouteInfo;
    import.meta.hot?.send("add-route", { type: "add-route", path, options });
  };
  const setNewInfo = (info) => {
    setNewRouteInfo({ ...newRouteInfo, ...info });
  };
  return /* @__PURE__ */ jsxs20("div", { className: "mb-2 rounded-lg border border-gray-500/20 p-2", children: [
    /* @__PURE__ */ jsx39("div", { className: "mb-2 block ", children: "Route path:" }),
    /* @__PURE__ */ jsx39(
      Input,
      {
        onBlur: () => setNewInfo({
          path: newRouteInfo.path.trim()
        }),
        onChange: (e) => setNewInfo({ path: e.target.value }),
        className: "mb-1"
      }
    ),
    /* @__PURE__ */ jsx39("span", { className: "mb-4 block text-gray-500", children: "This will be added to your routes folder under your entered name, only supports .tsx and .ts extensions, you can also emit the extension" }),
    /* @__PURE__ */ jsx39("div", { className: "mb-2 block", children: "Additional options:" }),
    /* @__PURE__ */ jsx39(
      Checkbox,
      {
        value: newRouteInfo.loader,
        onChange: () => setNewInfo({
          loader: !newRouteInfo.loader
        }),
        id: "loader",
        children: "Add a loader"
      }
    ),
    " ",
    /* @__PURE__ */ jsx39(
      Checkbox,
      {
        value: newRouteInfo.clientLoader,
        onChange: () => setNewInfo({
          clientLoader: !newRouteInfo.clientLoader
        }),
        id: "clientLoader",
        children: "Add a clientLoader"
      }
    ),
    /* @__PURE__ */ jsx39(
      Checkbox,
      {
        value: newRouteInfo.action,
        onChange: () => setNewInfo({
          action: !newRouteInfo.action
        }),
        id: "action",
        children: "Add an action"
      }
    ),
    " ",
    /* @__PURE__ */ jsx39(
      Checkbox,
      {
        value: newRouteInfo.clientAction,
        onChange: () => setNewInfo({
          clientAction: !newRouteInfo.clientAction
        }),
        id: "clientAction",
        children: "Add a clientAction"
      }
    ),
    /* @__PURE__ */ jsx39(
      Checkbox,
      {
        value: newRouteInfo.errorBoundary,
        onChange: () => setNewInfo({
          errorBoundary: !newRouteInfo.errorBoundary
        }),
        id: "error-boundary",
        children: "Add an error boundary"
      }
    ),
    /* @__PURE__ */ jsx39(
      Checkbox,
      {
        value: newRouteInfo.handler,
        onChange: () => setNewInfo({
          handler: !newRouteInfo.handler
        }),
        id: "handle",
        children: "Add a handle"
      }
    ),
    /* @__PURE__ */ jsx39(Checkbox, { value: newRouteInfo.meta, onChange: () => setNewInfo({ meta: !newRouteInfo.meta }), id: "meta", children: "Add a meta export" }),
    /* @__PURE__ */ jsx39(Checkbox, { value: newRouteInfo.links, onChange: () => setNewInfo({ links: !newRouteInfo.links }), id: "links", children: "Add a links export" }),
    /* @__PURE__ */ jsx39(
      Checkbox,
      {
        value: newRouteInfo.headers,
        onChange: () => setNewInfo({
          headers: !newRouteInfo.headers
        }),
        id: "headers",
        children: "Add a headers export"
      }
    ),
    /* @__PURE__ */ jsx39(
      Checkbox,
      {
        value: newRouteInfo.revalidate,
        onChange: () => setNewInfo({
          revalidate: !newRouteInfo.revalidate
        }),
        id: "shouldRevalidate",
        children: "Add a shouldRevalidate export"
      }
    ),
    /* @__PURE__ */ jsx39(
      "button",
      {
        onClick: handleSubmit,
        disabled: !newRouteInfo.path,
        type: "button",
        className: clsx8(
          "mr-2 mt-2 self-end text-white rounded border border-gray-400 px-2 py-1 text-sm",
          !newRouteInfo.path && "opacity-50"
        ),
        children: "Add route"
      }
    )
  ] });
};

// src/client/hooks/detached/useListenToRouteChange.ts
import { useEffect as useEffect18, useRef as useRef8 } from "react";
import { useLocation, useNavigate, useNavigation as useNavigation4 } from "react-router";
var LOCAL_STORAGE_ROUTE_KEY = "rdt_route";
var setRouteInLocalStorage = (route) => setStorageItem(LOCAL_STORAGE_ROUTE_KEY, route);
var getRouteFromLocalStorage = () => getStorageItem(LOCAL_STORAGE_ROUTE_KEY);
var useListenToRouteChange = () => {
  const { detachedWindowOwner } = useDetachedWindowControls();
  const location = useLocation();
  const navigate = useNavigate();
  const navigation = useNavigation4();
  const locationRoute = location.pathname + location.search;
  const navigationRoute = (navigation.location?.pathname ?? "") + (navigation.location?.search ?? "");
  const ref = useRef8(locationRoute);
  const route = getRouteFromLocalStorage();
  useEffect18(() => {
    const { detachedWindowOwner: detachedWindowOwner2 } = detachedModeSetup();
    if (!detachedWindowOwner2) {
      return;
    }
    if (route !== locationRoute) {
      setRouteInLocalStorage(locationRoute);
    }
  }, [locationRoute, detachedWindowOwner, route]);
  useAttachListener("storage", "window", (e) => {
    if (e.key !== LOCAL_STORAGE_ROUTE_KEY) {
      return;
    }
    const route2 = getRouteFromLocalStorage();
    if (route2 && route2 !== ref.current && route2 !== navigationRoute && navigation.state === "idle") {
      ref.current = route2;
      navigate(route2);
    }
  });
};

// src/client/tabs/RoutesTab.tsx
import clsx12 from "clsx";
import Tree from "react-d3-tree";

// src/client/components/RouteInfo.tsx
import clsx9 from "clsx";
import { Link } from "react-router";
import { Fragment as Fragment5, jsx as jsx40, jsxs as jsxs21 } from "react/jsx-runtime";
var RouteInfo = ({ route, className, openNewRoute, onClose }) => {
  const { settings, setSettings } = useSettingsContext();
  const { routeWildcards, routeViewMode } = settings;
  const { hasWildcard, path, pathToOpen } = constructRoutePath(route, routeWildcards);
  const isTreeView = routeViewMode === "tree";
  const hasParentErrorBoundary = route.errorBoundary.errorBoundaryId && route.errorBoundary.errorBoundaryId !== route.id;
  const hasErrorBoundary = route.errorBoundary.hasErrorBoundary;
  return /* @__PURE__ */ jsxs21("div", { className: clsx9(className, "relative"), children: [
    isTreeView && /* @__PURE__ */ jsxs21(Fragment5, { children: [
      /* @__PURE__ */ jsx40(Icon, { onClick: onClose, className: "absolute right-2 top-2 cursor-pointer text-red-600", name: "X" }),
      /* @__PURE__ */ jsx40("h1", { className: "text-xl font-semibold", children: route.url }),
      /* @__PURE__ */ jsx40("hr", { className: "mb-4 mt-1" }),
      /* @__PURE__ */ jsxs21("h3", { children: [
        /* @__PURE__ */ jsx40("span", { className: "text-gray-500", children: "Path:" }),
        " ",
        path
      ] }),
      /* @__PURE__ */ jsxs21("h3", { children: [
        /* @__PURE__ */ jsx40("span", { className: "text-gray-500", children: "Url:" }),
        " ",
        pathToOpen
      ] })
    ] }),
    /* @__PURE__ */ jsxs21("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsx40("span", { className: "whitespace-nowrap text-gray-500", children: "Route file:" }),
      route.id
    ] }),
    /* @__PURE__ */ jsxs21("div", { className: "mb-4 mt-4 flex flex-col gap-2", children: [
      /* @__PURE__ */ jsx40("span", { className: "text-gray-500", children: "Components contained in the route:" }),
      /* @__PURE__ */ jsxs21("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx40(Tag, { className: "h-max", color: route.hasLoader ? "GREEN" : "RED", children: "Loader" }),
        /* @__PURE__ */ jsx40(Tag, { className: "h-max", color: route.hasAction ? "GREEN" : "RED", children: "Action" }),
        /* @__PURE__ */ jsx40(
          Tag,
          {
            className: clsx9(hasErrorBoundary && "rounded-br-none rounded-tr-none"),
            color: hasErrorBoundary ? "GREEN" : "RED",
            children: "ErrorBoundary"
          }
        )
      ] }),
      hasErrorBoundary ? /* @__PURE__ */ jsx40("div", { className: "mr-2", children: hasParentErrorBoundary ? `Covered by parent ErrorBoundary located in: ${route.errorBoundary.errorBoundaryId}` : "" }) : null
    ] }),
    hasWildcard && /* @__PURE__ */ jsxs21(Fragment5, { children: [
      /* @__PURE__ */ jsx40("p", { className: "mb-2 text-gray-500", children: "Wildcard parameters:" }),
      /* @__PURE__ */ jsx40("div", { className: clsx9("mb-4 grid w-full grid-cols-2 gap-2", isTreeView && "grid-cols-1"), children: route.url.split("/").filter((p) => p.startsWith(":")).map((param) => /* @__PURE__ */ jsxs21("div", { className: "flex w-full gap-2", children: [
        /* @__PURE__ */ jsx40(Tag, { color: "BLUE", children: param }, param),
        /* @__PURE__ */ jsx40(
          Input,
          {
            value: routeWildcards[route.id]?.[param] || "",
            onChange: (e) => setSettings({
              routeWildcards: {
                ...routeWildcards,
                [route.id]: {
                  ...routeWildcards[route.id],
                  [param]: e.target.value
                }
              }
            }),
            placeholder: param
          }
        )
      ] }, param)) })
    ] }),
    isTreeView && /* @__PURE__ */ jsx40(
      "button",
      {
        type: "button",
        className: "mr-2 whitespace-nowrap !text-white rounded border border-gray-400 px-2 py-1 text-sm",
        onClick: openNewRoute(path),
        children: /* @__PURE__ */ jsx40(Link, { className: "text-white", to: path, children: "Open in browser" })
      }
    )
  ] });
};

// src/client/components/RouteNode.tsx
import clsx10 from "clsx";
import { jsx as jsx41, jsxs as jsxs22 } from "react/jsx-runtime";
var RouteNode = ({
  nodeDatum,
  hierarchyPointNode,
  toggleNode,
  setActiveRoute,
  activeRoutes,
  navigate
}) => {
  const parent = hierarchyPointNode.parent?.data;
  const parentName = parent && parent?.name !== "/" ? parent.name : "";
  const name = nodeDatum.name.replace(parentName, "") ?? "/";
  const route = { ...nodeDatum, ...nodeDatum.attributes };
  return /* @__PURE__ */ jsxs22("g", { className: "flex", children: [
    /* @__PURE__ */ jsx41(
      "circle",
      {
        x: 20,
        onClick: toggleNode,
        className: clsx10(
          getRouteColor(route),
          "stroke-white",
          nodeDatum.__rd3t.collapsed && nodeDatum.children?.length && "fill-gray-800"
        ),
        r: 12
      }
    ),
    /* @__PURE__ */ jsx41("g", { children: /* @__PURE__ */ jsx41("foreignObject", { y: -15, x: 17, width: 110, height: 140, children: /* @__PURE__ */ jsx41(
      "p",
      {
        onClick: () => setActiveRoute(route),
        onDoubleClickCapture: () => {
          navigate(route.url);
        },
        style: { width: 100, fontSize: 14 },
        className: clsx10(
          "w-full break-all fill-white stroke-transparent",
          activeRoutes.includes(route.id) && "text-yellow-500"
        ),
        children: nodeDatum.attributes?.id === "root" ? "Root" : name ? name : "Index"
      }
    ) }) })
  ] });
};

// src/client/components/RouteToggle.tsx
import clsx11 from "clsx";
import { jsx as jsx42, jsxs as jsxs23 } from "react/jsx-runtime";
var RouteToggle = () => {
  const { settings, setSettings } = useSettingsContext();
  const { routeViewMode } = settings;
  return /* @__PURE__ */ jsxs23("div", { className: "absolute left-0 top-0 flex items-center gap-2 rounded-lg border border-white px-3 py-1", children: [
    /* @__PURE__ */ jsx42(
      Icon,
      {
        className: clsx11("h-5 w-5 hover:cursor-pointer", routeViewMode === "tree" && "text-yellow-500"),
        onClick: () => setSettings({ routeViewMode: "tree" }),
        name: "Network"
      }
    ),
    "/",
    /* @__PURE__ */ jsx42(
      Icon,
      {
        name: "List",
        className: clsx11("h-5 w-5 hover:cursor-pointer", routeViewMode === "list" && "text-yellow-500"),
        onClick: () => setSettings({ routeViewMode: "list" })
      }
    )
  ] });
};

// src/client/tabs/RoutesTab.tsx
import { jsx as jsx43, jsxs as jsxs24 } from "react/jsx-runtime";
var RoutesTab = () => {
  const matches = useMatches3();
  const navigate = useNavigate2();
  const activeRoutes = matches.map((match) => match.id);
  const { settings } = useSettingsContext();
  const { routeWildcards, routeViewMode } = settings;
  const { detachedWindow } = useDetachedWindowControls();
  const [activeRoute, setActiveRoute] = useState10(null);
  const [routes] = useState10(createExtendedRoutes());
  const [treeRoutes] = useState10(createRouteTree(window.__reactRouterManifest?.routes));
  const isTreeView = routeViewMode === "tree";
  const openNewRoute = (path) => (e) => {
    e?.preventDefault();
    navigate(path);
    if (detachedWindow) {
      setRouteInLocalStorage(path);
    }
  };
  return /* @__PURE__ */ jsxs24("div", { className: clsx12("relative h-full w-full ", !isTreeView && "pt-8"), children: [
    /* @__PURE__ */ jsx43(RouteToggle, {}),
    isTreeView ? /* @__PURE__ */ jsxs24("div", { className: "flex h-full w-full", children: [
      /* @__PURE__ */ jsx43(
        Tree,
        {
          translate: { x: window.innerWidth / 2 - (isTreeView && activeRoute ? 0 : 0), y: 30 },
          pathClassFunc: (link) => activeRoutes.includes(link.target.data.attributes.id) ? "stroke-yellow-500" : "stroke-gray-400",
          renderCustomNodeElement: (props) => RouteNode({
            ...props,
            routeWildcards,
            setActiveRoute,
            activeRoutes,
            navigate
          }),
          orientation: "vertical",
          data: treeRoutes
        }
      ),
      activeRoute && /* @__PURE__ */ jsx43(
        RouteInfo,
        {
          openNewRoute,
          onClose: () => setActiveRoute(null),
          route: activeRoute,
          className: "w-[600px] border-l border-l-slate-800 p-2 px-4"
        }
      )
    ] }) : /* @__PURE__ */ jsxs24(Accordion, { className: "h-full w-full overflow-y-auto pr-4", type: "single", collapsible: true, children: [
      /* @__PURE__ */ jsxs24(AccordionItem, { value: "add-new", children: [
        /* @__PURE__ */ jsx43(AccordionTrigger, { className: "text-white", children: /* @__PURE__ */ jsx43("span", { className: "text-lg font-semibold", children: "Add a new route to the project" }) }),
        /* @__PURE__ */ jsx43(AccordionContent, { children: /* @__PURE__ */ jsx43(NewRouteForm, {}) })
      ] }),
      /* @__PURE__ */ jsxs24("div", { className: "py-2", children: [
        /* @__PURE__ */ jsx43("span", { className: "text-lg font-semibold", children: "Project routes" }),
        /* @__PURE__ */ jsx43("hr", { className: "mt-2 border-gray-400" })
      ] }),
      routes?.map((route) => {
        const { path, pathToOpen } = constructRoutePath(route, routeWildcards);
        return /* @__PURE__ */ jsxs24(AccordionItem, { value: route.id, children: [
          /* @__PURE__ */ jsx43(AccordionTrigger, { children: /* @__PURE__ */ jsxs24("div", { className: "justify-center flex-wrap text-white flex px-3 lg:px-0 flex-col lg:flex-row w-full items-start lg:items-center gap-1 ", children: [
            /* @__PURE__ */ jsx43("span", { className: "text-gray-500" }),
            " ",
            route.url,
            " ",
            /* @__PURE__ */ jsxs24("div", { className: "lg:ml-auto flex-wrap flex items-center gap-2", children: [
              /* @__PURE__ */ jsxs24("span", { className: " text-left text-xs text-gray-500", children: [
                'Url: "',
                pathToOpen,
                '"'
              ] }),
              /* @__PURE__ */ jsx43(
                "div",
                {
                  title: pathToOpen,
                  className: "mr-2  whitespace-nowrap rounded border border-gray-400 px-2 py-1 text-sm",
                  onClick: openNewRoute(path),
                  children: "Open in browser"
                }
              )
            ] })
          ] }) }),
          /* @__PURE__ */ jsx43(AccordionContent, { children: /* @__PURE__ */ jsx43(RouteInfo, { openNewRoute, route }) })
        ] }, route.id);
      })
    ] })
  ] });
};

// src/client/tabs/SettingsTab.tsx
import { useState as useState11 } from "react";

// src/client/components/Select.tsx
import * as SelectPrimitive from "@radix-ui/react-select";

// src/client/components/Stack.tsx
import clsx13 from "clsx";
import { jsx as jsx44 } from "react/jsx-runtime";
var GAPS = {
  sm: "gap-1",
  md: "gap-2",
  lg: "gap-4"
};
var Stack = ({ gap = "md", className, children, ...props }) => {
  return /* @__PURE__ */ jsx44("div", { className: clsx13("flex flex-col", GAPS[gap], className), ...props, children });
};

// src/client/components/Select.tsx
import { jsx as jsx45, jsxs as jsxs25 } from "react/jsx-runtime";
var Select = SelectPrimitive.Root;
var SelectGroup = SelectPrimitive.Group;
var SelectValue = SelectPrimitive.Value;
var SelectTrigger = ({ className, children, ref, ...props }) => /* @__PURE__ */ jsxs25(
  SelectPrimitive.Trigger,
  {
    ref,
    className: cn(
      "hover:border-gray-400/50 transition-all ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex h-8 w-full items-center justify-between rounded-md border border-gray-400 bg-[#121212] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx45(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx45(Icon, { name: "ChevronDown", className: "h-4 w-4 opacity-50" }) })
    ]
  }
);
var SelectContent = ({
  className,
  children,
  position = "popper",
  ref,
  ...props
}) => {
  return (
    // @ts-ignore
    /* @__PURE__ */ jsx45(SelectPrimitive.Portal, { className: "react-router-dev-tools", children: /* @__PURE__ */ jsx45(
      SelectPrimitive.Content,
      {
        ref,
        className: cn(
          "relative z-[9999] min-w-[8rem] overflow-hidden rounded-md border border-solid border-[#121212] bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        ),
        position,
        ...props,
        children: /* @__PURE__ */ jsx45(
          SelectPrimitive.Viewport,
          {
            className: cn(
              "border border-gray-500 p-1",
              position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
            ),
            children
          }
        )
      }
    ) })
  );
};
var SelectLabel = ({ className, ref, ...props }) => /* @__PURE__ */ jsx45(SelectPrimitive.Label, { ref, className: cn("py-1.5 pl-8 pr-2 font-sans text-sm", className), ...props });
var SelectItem = ({ className, children, ref, ...props }) => /* @__PURE__ */ jsxs25(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "focus:text-accent-foreground relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 font-sans text-sm outline-none hover:cursor-pointer hover:bg-[#121212] focus:bg-[#121212] data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx45("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx45(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx45(Icon, { name: "Check", className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsx45(SelectPrimitive.ItemText, { children })
    ]
  }
);
var SelectWithOptions = ({
  placeholder,
  label,
  options,
  onSelect,
  hint,
  value,
  className
}) => {
  return /* @__PURE__ */ jsxs25(Stack, { className, gap: "sm", children: [
    label && /* @__PURE__ */ jsx45(Label, { children: label }),
    /* @__PURE__ */ jsxs25(
      Select,
      {
        onOpenChange: () => {
          const el = document.querySelector("div[data-radix-popper-content-wrapper]");
          el?.setAttribute("class", "react-router-dev-tools");
        },
        value,
        onValueChange: onSelect,
        children: [
          /* @__PURE__ */ jsx45(SelectTrigger, { className: "w-full text-white", children: /* @__PURE__ */ jsx45(SelectValue, { placeholder }) }),
          /* @__PURE__ */ jsx45(SelectContent, { children: /* @__PURE__ */ jsxs25(SelectGroup, { children: [
            /* @__PURE__ */ jsx45(SelectLabel, { children: label }),
            options.map((option) => /* @__PURE__ */ jsx45(SelectItem, { value: option.value, children: option.label }, option.value))
          ] }) })
        ]
      }
    ),
    hint && /* @__PURE__ */ jsx45(Hint, { children: hint })
  ] });
};

// src/client/utils/string.ts
var uppercaseFirstLetter2 = (value) => value.charAt(0).toUpperCase() + value.slice(1);

// src/client/tabs/SettingsTab.tsx
import { jsx as jsx46, jsxs as jsxs26 } from "react/jsx-runtime";
var SettingsTab = () => {
  const { settings, setSettings } = useSettingsContext();
  const [minHeight, setMinHeight] = useState11(settings.minHeight.toString());
  const [maxHeight, setMaxHeight] = useState11(settings.maxHeight.toString());
  const [expansionLevel, setExpansionLevel] = useState11(settings.expansionLevel.toString());
  const [openHotkey, setOpenHotkey] = useState11(settings.openHotkey.toString());
  return /* @__PURE__ */ jsxs26(Stack, { className: "mb-4", children: [
    /* @__PURE__ */ jsxs26("h1", { children: [
      /* @__PURE__ */ jsx46("span", { className: "text-lg font-semibold", children: "Settings" }),
      /* @__PURE__ */ jsx46("hr", { className: "mt-2 border-gray-400" })
    ] }),
    /* @__PURE__ */ jsx46(
      Checkbox,
      {
        id: "defaultOpen",
        hint: "The dev tools will be open by default when you run the application and when you refresh the browser.",
        onChange: () => setSettings({ defaultOpen: !settings.defaultOpen }),
        value: settings.defaultOpen,
        children: "Open dev tools by default"
      }
    ),
    /* @__PURE__ */ jsxs26(
      Checkbox,
      {
        id: "requireUrlFlag",
        hint: `Allows you to only show rdt when there is a flag in the URL search params set. (${settings.urlFlag}=true)`,
        onChange: () => setSettings({ requireUrlFlag: !settings.requireUrlFlag }),
        value: settings.requireUrlFlag,
        children: [
          "Show dev tools only when URL flag is set ?",
          settings.urlFlag,
          "=true"
        ]
      }
    ),
    /* @__PURE__ */ jsx46(
      Checkbox,
      {
        id: "hideUntilHover",
        hint: "The dev tools trigger will be hidden on the page until you hover over it.",
        onChange: () => setSettings({ hideUntilHover: !settings.hideUntilHover }),
        value: settings.hideUntilHover,
        children: "Hide the trigger until hovered"
      }
    ),
    /* @__PURE__ */ jsx46(
      Checkbox,
      {
        id: "showBreakpointIndicator",
        hint: "Whether to show the breakpoint indicator or not",
        onChange: () => setSettings({ showBreakpointIndicator: !settings.showBreakpointIndicator }),
        value: settings.showBreakpointIndicator,
        children: "Show breakpoint indicator"
      }
    ),
    /* @__PURE__ */ jsx46("hr", { className: "mt-2 border-gray-700" }),
    /* @__PURE__ */ jsxs26(Stack, { gap: "lg", children: [
      settings.requireUrlFlag && /* @__PURE__ */ jsx46(
        Input,
        {
          name: "urlFlag",
          id: "urlFlag",
          label: "URL flag to use",
          hint: `This allows you to change the URL search param flag that will be used to show the dev tools when "Show dev tools only when URL flag is set" is set to true`,
          value: settings.urlFlag,
          onChange: (e) => setSettings({ urlFlag: e.target.value ?? "" }),
          onBlur: (e) => {
            setSettings({ urlFlag: e.target.value.trim() });
          }
        }
      ),
      /* @__PURE__ */ jsx46(
        Input,
        {
          name: "expansionLevel",
          id: "expansionLevel",
          label: "Depth of expansion for JSON objects",
          hint: "This allows you to change the depth of expanded properties of json objects.",
          value: expansionLevel,
          onChange: (e) => setExpansionLevel(e.target.value ?? ""),
          onBlur: (e) => {
            const value = Number.parseInt(e.target.value);
            if (value && !Number.isNaN(value) && value >= 0) {
              setSettings({ expansionLevel: value });
            }
          }
        }
      ),
      /* @__PURE__ */ jsx46(
        Input,
        {
          name: "openHotkey",
          id: "openHotkey",
          label: "Hotkey to open/close development tools",
          hint: "This allows you to change the default hotkey used to open development tools.",
          value: openHotkey,
          onChange: (e) => setOpenHotkey(e.target.value ?? ""),
          onBlur: (e) => {
            const value = e.target.value;
            if (value) {
              setSettings({ openHotkey: value });
            }
          }
        }
      ),
      /* @__PURE__ */ jsxs26("div", { className: "flex flex-col gap-2 lg:flex-row", children: [
        /* @__PURE__ */ jsx46(
          Input,
          {
            name: "minHeight",
            label: "Min height of the dev tools (px)",
            hint: "The dev tools will not shrink below this height when being dragged.",
            id: "minHeight",
            value: minHeight,
            onChange: (e) => setMinHeight(e.target.value ?? ""),
            onBlur: (e) => {
              const value = Number.parseInt(e.target.value);
              if (value && !Number.isNaN(value) && value < settings.maxHeight && value > 100) {
                setSettings({ minHeight: value });
              }
            }
          }
        ),
        /* @__PURE__ */ jsx46(
          Input,
          {
            name: "maxHeight",
            id: "maxHeight",
            label: "Max height of the dev tools (px)",
            hint: "The dev tools will not expand beyond this height when being dragged.",
            value: maxHeight,
            onChange: (e) => setMaxHeight(e.target.value ?? ""),
            onBlur: (e) => {
              const value = Number.parseInt(e.target.value);
              if (value && !Number.isNaN(value) && value > settings.minHeight) {
                setSettings({ maxHeight: value });
              }
            }
          }
        )
      ] }),
      /* @__PURE__ */ jsxs26("div", { className: "flex flex-col gap-2 lg:flex-row", children: [
        /* @__PURE__ */ jsx46(
          SelectWithOptions,
          {
            label: "Trigger position",
            onSelect: (value) => setSettings({ position: value }),
            value: settings.position,
            className: "w-full",
            options: [
              { label: "Bottom Right", value: "bottom-right" },
              { label: "Bottom Left", value: "bottom-left" },
              { label: "Top Right", value: "top-right" },
              { label: "Top Left", value: "top-left" },
              { label: "Middle Right", value: "middle-right" },
              { label: "Middle Left", value: "middle-left" }
            ],
            hint: "This will determine where your trigger position on the screen is when the tools are collapsed."
          }
        ),
        /* @__PURE__ */ jsx46(
          SelectWithOptions,
          {
            label: "Environments position",
            onSelect: (value) => setSettings({ liveUrlsPosition: value }),
            value: settings.liveUrlsPosition,
            className: "w-full",
            options: [
              { label: "Bottom Right", value: "bottom-right" },
              { label: "Bottom Left", value: "bottom-left" },
              { label: "Top Right", value: "top-right" },
              { label: "Top Left", value: "top-left" }
            ],
            hint: "This will determine where your environments position on the screen is."
          }
        ),
        /* @__PURE__ */ jsx46(
          SelectWithOptions,
          {
            label: "Panel position",
            onSelect: (value) => setSettings({ panelLocation: value }),
            value: settings.panelLocation,
            className: "w-full",
            options: [
              { label: "Top", value: "top" },
              { label: "Bottom", value: "bottom" }
            ],
            hint: "This will determine where your panel shows up once opened"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs26("div", { className: "flex flex-col gap-2 lg:flex-row", children: [
        /* @__PURE__ */ jsx46(
          SelectWithOptions,
          {
            label: "Route boundary gradient",
            onSelect: (value) => setSettings({ routeBoundaryGradient: value }),
            value: settings.routeBoundaryGradient,
            options: RouteBoundaryOptions.map((option) => ({
              label: uppercaseFirstLetter2(option),
              value: option
            })),
            className: "w-full",
            hint: "This will determine the look of the gradient shown for route boundaries."
          }
        ),
        /* @__PURE__ */ jsx46(
          SelectWithOptions,
          {
            label: "Show route boundaries on",
            onSelect: (value) => setSettings({ showRouteBoundariesOn: value }),
            value: settings.showRouteBoundariesOn,
            options: [
              { value: "hover", label: "Hover" },
              { value: "click", label: "Click" }
            ],
            className: "w-full",
            hint: "This will determine if the route boundaries show on hover of a route segment or clicking a button."
          }
        )
      ] })
    ] })
  ] });
};

// src/client/tabs/index.tsx
import { jsx as jsx47 } from "react/jsx-runtime";
var tabs = [
  {
    name: "Active page",
    icon: /* @__PURE__ */ jsx47(Icon, { size: "md", name: "Layers" }),
    id: "page",
    component: /* @__PURE__ */ jsx47(PageTab, {}),
    hideTimeline: false
  },
  {
    name: "Routes",
    icon: /* @__PURE__ */ jsx47(Icon, { size: "md", name: "GitMerge" }),
    id: "routes",
    component: /* @__PURE__ */ jsx47(RoutesTab, {}),
    hideTimeline: false
  },
  {
    name: "Errors",
    icon: /* @__PURE__ */ jsx47(Icon, { size: "md", name: "Shield" }),
    id: "errors",
    component: /* @__PURE__ */ jsx47(ErrorsTab, {}),
    hideTimeline: false
  },
  {
    name: "Network",
    icon: /* @__PURE__ */ jsx47(Icon, { size: "md", name: "Network" }),
    id: "network",
    component: /* @__PURE__ */ jsx47(NetworkTab, {}),
    hideTimeline: true
  },
  {
    name: "Settings",
    icon: /* @__PURE__ */ jsx47(Icon, { size: "md", name: "Settings" }),
    id: "settings",
    component: /* @__PURE__ */ jsx47(SettingsTab, {}),
    hideTimeline: false
  }
];

// src/client/hooks/useTabs.ts
var shouldHideTimeline = (activeTab, tab, settings) => {
  if (activeTab === "routes" && settings.routeViewMode === "tree") return true;
  return tab?.hideTimeline;
};
var useTabs = (pluginsArray) => {
  const { settings } = useSettingsContext();
  const { activeTab } = settings;
  const plugins = pluginsArray?.map((plugin) => typeof plugin === "function" ? plugin() : plugin);
  const allTabs = useMemo5(() => [...tabs, ...plugins ? plugins : []], [plugins]);
  const { Component, hideTimeline } = useMemo5(() => {
    const tab = allTabs.find((tab2) => tab2.id === activeTab);
    return { Component: tab?.component, hideTimeline: shouldHideTimeline(activeTab, tab, settings) };
  }, [activeTab, allTabs, settings]);
  return {
    visibleTabs: allTabs,
    Component,
    allTabs,
    hideTimeline,
    activeTab,
    isPluginTab: !tabs.find((tab) => activeTab === tab.id)
  };
};

// src/client/layout/ContentPanel.tsx
import { jsx as jsx48, jsxs as jsxs27 } from "react/jsx-runtime";
var ContentPanel = ({ plugins }) => {
  const { Component, hideTimeline, isPluginTab, activeTab } = useTabs(plugins);
  return /* @__PURE__ */ jsxs27("div", { className: "flex h-full w-full overflow-y-hidden", children: [
    /* @__PURE__ */ jsx48(
      "div",
      {
        className: clsx14(
          "z-20 h-full w-full overflow-y-auto overflow-x-hidden bg-main px-1 lg:px-4 pt-3 pb-4 ",
          isPluginTab && "unset",
          activeTab === "page" && "!pt-0"
        ),
        children: Component
      }
    ),
    !hideTimeline && /* @__PURE__ */ jsxs27(Fragment6, { children: [
      /* @__PURE__ */ jsx48("div", { className: "w-1 bg-gray-500/20" }),
      /* @__PURE__ */ jsx48("div", { className: clsx14("z-10 hidden lg:block h-full w-1/3 p-2"), children: /* @__PURE__ */ jsx48(TimelineTab, {}) })
    ] })
  ] });
};

// src/client/layout/MainPanel.tsx
import clsx15 from "clsx";
import { useState as useState13 } from "react";

// src/client/hooks/useDebounce.ts
import React5 from "react";
function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
function useDebounce(callback, delay = 300) {
  const callbackRef = React5.useRef(callback);
  React5.useEffect(() => {
    callbackRef.current = callback;
  });
  return React5.useMemo(() => debounce((...args) => callbackRef.current(...args), delay), [delay]);
}

// src/client/hooks/useResize.ts
import { useCallback as useCallback5, useEffect as useEffect20, useState as useState12 } from "react";
var useResize = () => {
  const { setSettings, settings } = useSettingsContext();
  const { height, maxHeight, minHeight, panelLocation } = settings;
  const [isResizing, setIsResizing] = useState12(false);
  const enableResize = useCallback5(() => {
    setIsResizing(true);
  }, [setIsResizing]);
  const disableResize = useCallback5(() => {
    setIsResizing(false);
  }, [setIsResizing]);
  const resize = useCallback5(
    (e) => {
      if (isResizing) {
        window.getSelection()?.removeAllRanges();
        const newHeight = panelLocation === "top" ? e.clientY : window.innerHeight - e.clientY;
        if (newHeight > maxHeight) {
          setSettings({ height: maxHeight });
          return;
        }
        if (newHeight < minHeight) {
          setSettings({ height: minHeight });
          return;
        }
        setSettings({ height: newHeight });
      }
    },
    [isResizing, maxHeight, minHeight, setSettings, panelLocation]
  );
  useEffect20(() => {
    document.addEventListener("mousemove", resize);
    document.addEventListener("mouseup", disableResize);
    return () => {
      document.removeEventListener("mousemove", resize);
      document.removeEventListener("mouseup", disableResize);
    };
  }, [disableResize, resize]);
  return { height, enableResize, disableResize, isResizing };
};

// src/client/layout/MainPanel.tsx
import { jsx as jsx49, jsxs as jsxs28 } from "react/jsx-runtime";
var useResizeDetachedPanel = () => {
  const { isDetached } = useDetachedWindowControls();
  const [state, setState] = useState13(0);
  const debounce2 = useDebounce(() => {
    setState(state + 1);
  });
  useAttachWindowListener("resize", debounce2, isDetached);
};
var MainPanel = ({ children, isOpen, isEmbedded = false, className }) => {
  const { settings } = useSettingsContext();
  const { detachedWindow } = useDetachedWindowControls();
  const { height, panelLocation } = settings;
  const { enableResize, disableResize, isResizing } = useResize();
  useResizeDetachedPanel();
  return /* @__PURE__ */ jsxs28(
    "div",
    {
      "data-testid": "react-router-devtools-main-panel",
      style: {
        zIndex: 9998,
        ...!isEmbedded && { height: detachedWindow ? window.innerHeight : height }
      },
      className: clsx15(
        "duration-600 box-border flex w-screen flex-col overflow-auto bg-main text-white opacity-0 transition-all",
        isOpen ? "opacity-100 drop-shadow-2xl" : "!h-0",
        isResizing && "cursor-grabbing ",
        !isEmbedded ? `fixed left-0 ${panelLocation === "bottom" ? "bottom-0" : "top-0 border-b-2 border-main"}` : "",
        className
      ),
      children: [
        panelLocation === "bottom" && /* @__PURE__ */ jsx49(
          "div",
          {
            onMouseDown: enableResize,
            onMouseUp: disableResize,
            className: clsx15("absolute z-50 h-1 w-full", isResizing ? "cursor-grabbing" : "cursor-ns-resize")
          }
        ),
        children,
        panelLocation === "top" && /* @__PURE__ */ jsx49(
          "div",
          {
            onMouseDown: enableResize,
            onMouseUp: disableResize,
            className: clsx15("absolute bottom-0 z-50 h-1 w-full", isResizing ? "cursor-grabbing" : "cursor-ns-resize")
          }
        )
      ]
    }
  );
};

// src/client/layout/Tabs.tsx
import clsx16 from "clsx";

// src/client/hooks/useHorizontalScroll.ts
import { useEffect as useEffect21, useRef as useRef9 } from "react";
var useHorizontalScroll = () => {
  const ref = useRef9(null);
  useEffect21(() => {
    const elem = ref.current;
    const onWheel = (ev) => {
      if (!elem || ev.deltaY === 0) return;
      elem.scrollTo({
        left: elem.scrollLeft + ev.deltaY,
        behavior: "smooth"
      });
    };
    elem?.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      elem?.removeEventListener("wheel", onWheel);
    };
  }, []);
  return ref;
};

// src/client/layout/Tabs.tsx
import { Fragment as Fragment7, jsx as jsx50, jsxs as jsxs29 } from "react/jsx-runtime";
var Tab = ({
  tab,
  activeTab,
  className,
  onClick
}) => {
  const { setSettings } = useSettingsContext();
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: ignored
    /* @__PURE__ */ jsxs29(
      "div",
      {
        "data-testid": tab.id,
        onClick: () => onClick ? onClick() : setSettings({ activeTab: tab.id }),
        className: clsx16(
          "group relative flex shrink-0 cursor-pointer items-center justify-center border-0 border-b border-solid border-b-[#212121] border-r-[#212121] p-2 font-sans transition-all",
          activeTab !== tab.id && "hover:bg-[#212121]",
          activeTab === tab.id && "bg-[#212121]",
          "hover:bg-[#212121]/50"
        ),
        children: [
          /* @__PURE__ */ jsx50("div", { className: clsx16(className, "group-hover:opacity-80 transition-all"), children: tab.icon }),
          /* @__PURE__ */ jsx50(
            "div",
            {
              className: clsx16(
                "duration-400 invisible text-white opacity-0 transition after:absolute after:-left-2 after:top-1/2 after:h-0 after:w-0 after:-translate-y-1/2 after:-rotate-90 after:border-x-4 after:border-b-[6px] after:border-x-transparent after:border-b-gray-700 group-hover:visible",
                "absolute left-full z-50 ml-2 whitespace-nowrap rounded border border-gray-700 bg-gray-800 px-2 group-hover:opacity-100"
              ),
              children: tab.name
            }
          )
        ]
      }
    )
  );
};
var Tabs = ({ plugins, setIsOpen }) => {
  const { settings } = useSettingsContext();
  const { htmlErrors } = useHtmlErrors();
  const { setPersistOpen } = usePersistOpen();
  const { activeTab } = settings;
  const { visibleTabs } = useTabs(plugins);
  const scrollRef = useHorizontalScroll();
  const { setDetachedWindowOwner, detachedWindowOwner, detachedWindow } = useDetachedWindowControls();
  const handleDetachment = () => {
    const rdtWindow = window.open(
      window.location.href,
      "",
      `popup,width=${window.innerWidth},height=${settings.height},top=${window.screen.height},left=${window.screenLeft}}`
    );
    if (rdtWindow) {
      setDetachedWindowOwner(true);
      setStorageItem(REACT_ROUTER_DEV_TOOLS_IS_DETACHED, "true");
      setSessionItem(REACT_ROUTER_DEV_TOOLS_DETACHED_OWNER, "true");
      rdtWindow.RDT_MOUNTED = true;
    }
  };
  const getErrorCount = () => {
    return htmlErrors.length + (window.HYDRATION_OVERLAY.ERROR ? 1 : 0);
  };
  const hasErrors = getErrorCount() > 0;
  return /* @__PURE__ */ jsx50("div", { className: "relative flex h-full bg-gray-800", children: /* @__PURE__ */ jsxs29("div", { ref: scrollRef, className: "react-router-dev-tools-tab  flex h-full w-full flex-col", children: [
    visibleTabs.map((tab) => /* @__PURE__ */ jsx50(
      Tab,
      {
        tab: {
          ...tab,
          name: tab.id === "errors" && hasErrors ? `Errors (${getErrorCount()})` : tab.name
        },
        activeTab,
        className: clsx16(
          "cursor-pointer",
          tab.id === "errors" && activeTab !== "errors" && hasErrors && "animate-pulse font-bold text-red-600 duration-1000"
        )
      },
      tab.id
    )),
    /* @__PURE__ */ jsx50("div", { className: clsx16("mt-auto flex w-full flex-col items-center"), children: !detachedWindow && setIsOpen && /* @__PURE__ */ jsxs29(Fragment7, { children: [
      !detachedWindowOwner && /* @__PURE__ */ jsx50(
        Tab,
        {
          className: "transition-all hover:text-green-600",
          tab: {
            icon: /* @__PURE__ */ jsx50(Icon, { name: "CopySlash", size: "md", onClick: handleDetachment }),
            id: "detach",
            name: "Detach",
            hideTimeline: false,
            component: /* @__PURE__ */ jsx50(Fragment7, {})
          }
        }
      ),
      /* @__PURE__ */ jsx50(
        Tab,
        {
          className: "hover:text-red-600",
          tab: {
            icon: /* @__PURE__ */ jsx50(Icon, { name: "X", size: "md" }),
            id: "close",
            name: "Close",
            hideTimeline: false,
            component: /* @__PURE__ */ jsx50(Fragment7, {})
          },
          onClick: () => {
            setPersistOpen(false);
            setIsOpen(false);
          }
        }
      )
    ] }) })
  ] }) });
};

// src/client/embedded-dev-tools.tsx
import { jsx as jsx51, jsxs as jsxs30 } from "react/jsx-runtime";
var Embedded = ({ plugins: pluginArray, mainPanelClassName, className }) => {
  useTimelineHandler();
  useReactTreeListeners();
  useSetRouteBoundaries();
  const { settings } = useSettingsContext();
  const { position } = settings;
  const leftSideOriented = position.includes("left");
  const url = useLocation2().search;
  const plugins = pluginArray?.map((plugin) => typeof plugin === "function" ? plugin() : plugin);
  if (settings.requireUrlFlag && !url.includes(settings.urlFlag)) return null;
  return /* @__PURE__ */ jsx51("div", { id: REACT_ROUTER_DEV_TOOLS, className: clsx17("react-router-dev-tools react-router-dev-tools-reset", className), children: /* @__PURE__ */ jsxs30(MainPanel, { className: mainPanelClassName, isEmbedded: true, isOpen: true, children: [
    /* @__PURE__ */ jsx51(Tabs, { plugins }),
    /* @__PURE__ */ jsx51(ContentPanel, { leftSideOriented, plugins })
  ] }) });
};
var hydrating = true;
function useHydrated() {
  const [hydrated, setHydrated] = useState14(() => !hydrating);
  useEffect22(function hydrate() {
    hydrating = false;
    setHydrated(true);
  }, []);
  return hydrated;
}
var EmbeddedDevTools = ({ plugins, mainPanelClassName, className }) => {
  const hydrated = useHydrated();
  if (!hydrated) return null;
  return /* @__PURE__ */ jsx51(RDTContextProvider, { children: /* @__PURE__ */ jsx51(Embedded, { mainPanelClassName, className, plugins }) });
};

// src/client/init/root.tsx
import { useEffect as useEffect26, useState as useState18 } from "react";
import { createPortal } from "react-dom";

// src/client/react-router-dev-tools.tsx
import { useEffect as useEffect25, useState as useState17 } from "react";
import { useLocation as useLocation4 } from "react-router";

// src/client/components/Trigger.tsx
import clsx18 from "clsx";

// src/client/components/Logo.tsx
import { jsx as jsx52, jsxs as jsxs31 } from "react/jsx-runtime";
var Logo = ({ className, style }) => {
  return /* @__PURE__ */ jsxs31("svg", { style, className, viewBox: "0 0 602 360", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ jsx52("title", { children: "Logo" }),
    /* @__PURE__ */ jsx52(
      "path",
      {
        d: "M481.36 180C481.36 196.572 474.638 211.572 463.757 222.42C452.875 233.28 437.845 240 421.24 240C404.635 240 389.605 246.708 378.735 257.568C367.853 268.428 361.12 283.428 361.12 300C361.12 316.572 354.398 331.572 343.517 342.42C332.635 353.28 317.605 360 301 360C284.395 360 269.365 353.28 258.495 342.42C247.613 331.572 240.88 316.572 240.88 300C240.88 283.428 247.613 268.428 258.495 257.568C269.365 246.708 284.395 240 301 240C317.605 240 332.635 233.28 343.517 222.42C354.398 211.572 361.12 196.572 361.12 180C361.12 146.856 334.21 120 301 120C284.395 120 269.365 113.28 258.495 102.42C247.613 91.572 240.88 76.572 240.88 60C240.88 43.428 247.613 28.428 258.495 17.568C269.365 6.708 284.395 0 301 0C334.21 0 361.12 26.856 361.12 60C361.12 76.572 367.853 91.572 378.735 102.42C389.605 113.28 404.635 120 421.24 120C454.45 120 481.36 146.856 481.36 180Z",
        fill: "#F44250"
      }
    ),
    /* @__PURE__ */ jsx52(
      "path",
      {
        d: "M240.88 180C240.88 146.862 213.963 120 180.76 120C147.557 120 120.64 146.862 120.64 180C120.64 213.137 147.557 240 180.76 240C213.963 240 240.88 213.137 240.88 180Z",
        fill: "white"
      }
    ),
    /* @__PURE__ */ jsx52(
      "path",
      {
        d: "M120.64 300C120.64 266.863 93.7233 240 60.5199 240C27.3165 240 0.399902 266.863 0.399902 300C0.399902 333.138 27.3165 360 60.5199 360C93.7233 360 120.64 333.138 120.64 300Z",
        fill: "white"
      }
    ),
    /* @__PURE__ */ jsx52(
      "path",
      {
        d: "M601.6 300C601.6 266.863 574.683 240 541.48 240C508.277 240 481.36 266.863 481.36 300C481.36 333.138 508.277 360 541.48 360C574.683 360 601.6 333.138 601.6 300Z",
        fill: "white"
      }
    )
  ] });
};

// src/client/components/Trigger.tsx
import { jsx as jsx53 } from "react/jsx-runtime";
var Trigger3 = ({
  isOpen,
  setIsOpen
}) => {
  const { settings } = useSettingsContext();
  const { setPersistOpen } = usePersistOpen();
  const { hideUntilHover, position } = settings;
  const handleHover = (e, event) => {
    if (!hideUntilHover) return;
    const classesToRemove = "opacity-0";
    const classesToAdd = "opacity-100";
    if (event === "enter") {
      e.currentTarget.classList.remove(classesToRemove);
      e.currentTarget.classList.add(classesToAdd);
    }
    if (event === "leave") {
      e.currentTarget.classList.remove(classesToAdd);
      e.currentTarget.classList.add(classesToRemove);
    }
  };
  return /* @__PURE__ */ jsx53(
    "button",
    {
      type: "button",
      "data-testid": "react-router-devtools-trigger",
      style: { zIndex: 9999 },
      onClick: () => {
        setIsOpen(!isOpen);
        setPersistOpen(!isOpen);
      },
      onMouseEnter: (e) => handleHover(e, "enter"),
      onMouseLeave: (e) => handleHover(e, "leave"),
      className: clsx18(
        "fixed m-1.5 h-14 w-14 cursor-pointer p-2 bg-main flex items-center justify-center rounded-full transition-all ",
        "hover:cursor-pointer hover:ring-2 hover:ring-offset-2 ring-[#212121]",
        hideUntilHover && "opacity-0",
        position === "bottom-right" && "bottom-0 right-0",
        position === "bottom-left" && "bottom-0 left-0",
        position === "top-right" && "right-0 top-0",
        position === "top-left" && "left-0 top-0",
        position === "middle-right" && "right-0 top-1/2 -translate-y-1/2",
        position === "middle-left" && "left-0 top-1/2 -translate-y-1/2",
        isOpen && "hidden"
        // Hide the button when the dev tools is open
      ),
      children: /* @__PURE__ */ jsx53(
        Logo,
        {
          className: clsx18(
            "focus:outline-none w-full h-full -mt-1 rounded-full transition-all duration-200 overflow-visible"
          )
        }
      )
    }
  );
};

// src/client/hooks/detached/useCheckIfStillDetached.ts
import { useCallback as useCallback6, useContext as useContext9, useEffect as useEffect23, useState as useState15 } from "react";
var useCheckIfStillDetached = () => {
  const { dispatch } = useContext9(RDTContext);
  const [checking, setChecking] = useState15(false);
  const isDetached = getBooleanFromStorage(REACT_ROUTER_DEV_TOOLS_IS_DETACHED);
  useEffect23(() => {
    if (!checking || !isDetached) {
      return;
    }
    const isNotDetachedAnymore = getBooleanFromStorage(REACT_ROUTER_DEV_TOOLS_CHECK_DETACHED);
    if (isNotDetachedAnymore) {
      setStorageItem(REACT_ROUTER_DEV_TOOLS_IS_DETACHED, "false");
      setStorageItem(REACT_ROUTER_DEV_TOOLS_CHECK_DETACHED, "false");
      sessionStorage.removeItem(REACT_ROUTER_DEV_TOOLS_DETACHED_OWNER);
      sessionStorage.removeItem(REACT_ROUTER_DEV_TOOLS_DETACHED);
      const state = getExistingStateFromStorage();
      dispatch({ type: "SET_WHOLE_STATE", payload: state });
      setChecking(false);
    }
  }, [checking, dispatch, isDetached]);
  const checkDetachment = useCallback6(
    (e) => {
      if (e.key !== REACT_ROUTER_DEV_TOOLS_CHECK_DETACHED) {
        return;
      }
      const shouldCheckDetached = getBooleanFromStorage(REACT_ROUTER_DEV_TOOLS_CHECK_DETACHED);
      if (shouldCheckDetached && !checking) {
        setTimeout(() => setChecking(true), 200);
      }
    },
    [checking]
  );
  useEffect23(() => {
    if (checking || !isDetached) {
      return;
    }
    addEventListener("storage", checkDetachment);
    return () => removeEventListener("storage", checkDetachment);
  }, [checking, isDetached, checkDetachment]);
};

// src/client/hooks/detached/useResetDetachmentCheck.ts
var useResetDetachmentCheck = () => {
  const { isDetached } = useDetachedWindowControls();
  useCheckIfStillDetached();
  useAttachListener("unload", "window", () => setStorageItem(REACT_ROUTER_DEV_TOOLS_CHECK_DETACHED, "true"), isDetached);
};

// src/client/hooks/detached/useSyncStateWhenDetached.ts
var refreshRequiredKeys = [REACT_ROUTER_DEV_TOOLS_SETTINGS, REACT_ROUTER_DEV_TOOLS_STATE];
var useSyncStateWhenDetached = () => {
  const { dispatch, state } = useRDTContext();
  useAttachListener("storage", "window", (e) => {
    if (!state.detachedWindow && !state.detachedWindowOwner) {
      return;
    }
    if (!refreshRequiredKeys.includes(e.key)) {
      return;
    }
    if (e.key === REACT_ROUTER_DEV_TOOLS_SETTINGS) {
      const oldSettings = JSON.stringify(state.settings);
      if (oldSettings === e.newValue) {
        return;
      }
    }
    if (e.key === REACT_ROUTER_DEV_TOOLS_STATE) {
      const { settings, ...rest } = state;
      const oldState = JSON.stringify(rest);
      if (oldState === e.newValue) {
        return;
      }
    }
    const newState = getExistingStateFromStorage();
    dispatch({ type: "SET_WHOLE_STATE", payload: newState });
  });
};

// src/client/react-router-dev-tools.tsx
import { useHotkeys as useHotkeys2 } from "react-hotkeys-hook";

// src/client/components/Breakpoints.tsx
import clsx19 from "clsx";

// src/client/hooks/useOnWindowResize.ts
import { useEffect as useEffect24, useState as useState16 } from "react";
var useOnWindowResize = () => {
  const [windowSize, setWindowSize] = useState16({
    width: window.innerWidth,
    height: window.innerHeight
  });
  useEffect24(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return windowSize;
};

// src/client/components/Breakpoints.tsx
import { jsx as jsx54 } from "react/jsx-runtime";
var Breakpoints = () => {
  const { width } = useOnWindowResize();
  const { settings } = useSettingsContext();
  const breakpoints = settings.breakpoints;
  const show = settings.showBreakpointIndicator;
  const breakpoint = breakpoints.find((bp) => bp.min <= width && bp.max >= width);
  if (!breakpoint || !breakpoint.name || !show) {
    return null;
  }
  return /* @__PURE__ */ jsx54(
    "div",
    {
      className: clsx19(
        "flex fixed bottom-0 left-0 mb-5 rounded-full bg-[#212121] z-[9998] size-10 text-white flex items-center justify-center items-center gap-2 mx-1"
      ),
      children: breakpoint?.name
    }
  );
};

// src/client/components/LiveUrls.tsx
import clsx20 from "clsx";
import { Link as Link2, useLocation as useLocation3 } from "react-router";
import { jsx as jsx55 } from "react/jsx-runtime";
var LiveUrls = () => {
  const { settings } = useSettingsContext();
  const location = useLocation3();
  const envsPosition = settings.liveUrlsPosition;
  const envsClassName = {
    "bottom-0": envsPosition === "bottom-left" || envsPosition === "bottom-right",
    "top-0": envsPosition === "top-left" || envsPosition === "top-right",
    "right-0": envsPosition === "bottom-right" || envsPosition === "top-right",
    "left-0": envsPosition === "bottom-left" || envsPosition === "top-left"
  };
  if (settings.liveUrls.length === 0) return null;
  return /* @__PURE__ */ jsx55("div", { className: clsx20("flex fixed items-center z-[9998] gap-2 px-2", envsClassName), children: settings.liveUrls.map((env) => {
    return /* @__PURE__ */ jsx55(
      Link2,
      {
        referrerPolicy: "no-referrer",
        target: "_blank",
        to: env.url + location.pathname,
        className: "flex transition-all hover:text-gray-500 items-center gap-2 text-sm font-semibold text-gray-400",
        children: env.name
      },
      env.name
    );
  }) });
};

// src/client/hooks/useOpenElementSource.ts
var useOpenElementSource = () => {
  const { sendJsonMessage } = useDevServerConnection();
  useAttachDocumentListener("contextmenu", (e) => {
    if (!e.shiftKey || !e) {
      return;
    }
    e.stopPropagation();
    e.preventDefault();
    const target = e.target;
    const rdtSource = target?.getAttribute("data-source");
    if (rdtSource) {
      const [source, line, column] = rdtSource.split(":::");
      return sendJsonMessage({
        type: "open-source",
        data: { source, line, column }
      });
    }
    for (const key in e.target) {
      if (key.startsWith("__reactFiber")) {
        const fiberNode = e.target[key];
        const originalSource = fiberNode?._debugSource;
        const source = fiberNode?._debugOwner?._debugSource ?? fiberNode?._debugSource;
        const line = source?.fileName?.startsWith("/") ? originalSource?.lineNumber : source?.lineNumber;
        const fileName = source?.fileName?.startsWith("/") ? originalSource?.fileName : source?.fileName;
        if (fileName && line) {
          return sendJsonMessage({
            type: "open-source",
            data: { source: fileName, line, column: 0 }
          });
        }
      }
    }
  });
};

// src/client/react-router-dev-tools.tsx
import { jsx as jsx56, jsxs as jsxs32 } from "react/jsx-runtime";
var recursivelyChangeTabIndex = (node, remove = true) => {
  if (remove) {
    node.setAttribute("tabIndex", "-1");
  } else {
    node.removeAttribute("tabIndex");
  }
  for (const child of node.children) {
    recursivelyChangeTabIndex(child, remove);
  }
};
var DevTools = ({ plugins: pluginArray }) => {
  useTimelineHandler();
  useResetDetachmentCheck();
  useReactTreeListeners();
  useSetRouteBoundaries();
  useSyncStateWhenDetached();
  useDevServerConnection();
  useOpenElementSource();
  useListenToRouteChange();
  const { setPersistOpen } = usePersistOpen();
  const url = useLocation4().search;
  const { detachedWindowOwner, isDetached, setDetachedWindowOwner } = useDetachedWindowControls();
  const { settings } = useSettingsContext();
  const { persistOpen } = usePersistOpen();
  const { position } = settings;
  const [isOpen, setIsOpen] = useState17(isDetached || settings.defaultOpen || persistOpen);
  const leftSideOriented = position.includes("left");
  const plugins = pluginArray?.map((plugin) => typeof plugin === "function" ? plugin() : plugin);
  const debounceSetOpen = useDebounce(() => {
    setIsOpen(!isOpen);
    setPersistOpen(!isOpen);
  }, 100);
  useHotkeys2(settings.openHotkey, () => debounceSetOpen());
  useHotkeys2("esc", () => isOpen ? debounceSetOpen() : null);
  useEffect25(() => {
    const el = document.getElementById(REACT_ROUTER_DEV_TOOLS);
    if (!el) return;
    recursivelyChangeTabIndex(el, !isOpen);
  }, [isOpen]);
  if (settings.requireUrlFlag && !url.includes(settings.urlFlag)) return null;
  if (detachedWindowOwner) {
    return /* @__PURE__ */ jsx56(
      "div",
      {
        "data-testid": "react-router-devtools",
        id: REACT_ROUTER_DEV_TOOLS,
        className: "react-router-dev-tools react-router-dev-tools-reset",
        children: /* @__PURE__ */ jsx56(
          Trigger3,
          {
            isOpen: false,
            setIsOpen: () => {
              setDetachedWindowOwner(false);
              setStorageItem(REACT_ROUTER_DEV_TOOLS_IS_DETACHED, "false");
              setSessionItem(REACT_ROUTER_DEV_TOOLS_DETACHED_OWNER, "false");
            }
          }
        )
      }
    );
  }
  return /* @__PURE__ */ jsxs32(
    "div",
    {
      "data-testid": "react-router-devtools",
      id: REACT_ROUTER_DEV_TOOLS,
      className: "react-router-dev-tools react-router-dev-tools-reset",
      children: [
        /* @__PURE__ */ jsx56(Trigger3, { isOpen, setIsOpen }),
        /* @__PURE__ */ jsx56(LiveUrls, {}),
        /* @__PURE__ */ jsx56(Breakpoints, {}),
        /* @__PURE__ */ jsx56(MainPanel, { isOpen, children: /* @__PURE__ */ jsxs32("div", { className: "flex h-full", children: [
          /* @__PURE__ */ jsx56(Tabs, { plugins, setIsOpen }),
          /* @__PURE__ */ jsx56(ContentPanel, { leftSideOriented, plugins })
        ] }) })
      ]
    }
  );
};
var ReactRouterDevTools = ({ plugins, config }) => {
  return /* @__PURE__ */ jsx56(RDTContextProvider, { config, children: /* @__PURE__ */ jsx56(DevTools, { plugins }) });
};

// src/client/init/hydration.ts
function removeStyleAndDataAttributes(inputString) {
  const styleTagRegex = /<style\b[^>]*>[\s\S]*?<\/style>/gi;
  const scriptTagRegex = /<script\b[^>]*>[\s\S]*?<\/script>/gi;
  const templateRegex = /<template\b[^>]*>[\s\S]*?<\/template>/gi;
  const styleRegex = /style="([^"]*)"/g;
  let resultString = inputString.replaceAll(styleTagRegex, "").replaceAll(scriptTagRegex, "").replaceAll(templateRegex, "").replaceAll("<!--$?-->", "").replaceAll("<!--/$-->", "");
  resultString = resultString.replaceAll(styleRegex, (match, styleValue) => {
    const updatedStyle = styleValue.trim().endsWith(";") ? styleValue : `${styleValue};`;
    return `style="${updatedStyle.replaceAll(" ", "")}"`;
  });
  return resultString;
}
var hydrationDetector = () => {
  if (typeof window !== "undefined") {
    if (!window.HYDRATION_OVERLAY) {
      window.HYDRATION_OVERLAY = {};
    }
    window.addEventListener("error", (event) => {
      const msg = event.message.toLowerCase();
      const isHydrationMsg = msg.includes("hydration") || msg.includes("hydrating") || msg.includes("minified react error #418");
      if (isHydrationMsg) {
        window.HYDRATION_OVERLAY.ERROR = true;
        const appRootEl = document.querySelector("html");
        if (appRootEl) {
          window.HYDRATION_OVERLAY.CSR_HTML = removeStyleAndDataAttributes(appRootEl.outerHTML);
        }
      }
    });
  }
  const HYDRATION_OVERLAY_ELEMENT = typeof document !== "undefined" && document.querySelector("html");
  if (HYDRATION_OVERLAY_ELEMENT) {
    window.HYDRATION_OVERLAY.SSR_HTML = removeStyleAndDataAttributes(HYDRATION_OVERLAY_ELEMENT.outerHTML);
  }
};

// src/client/init/root.tsx
import { jsx as jsx57, jsxs as jsxs33 } from "react/jsx-runtime";
var hydrating2 = true;
function useHydrated2() {
  const [hydrated, setHydrated] = useState18(() => !hydrating2);
  useEffect26(function hydrate() {
    hydrating2 = false;
    setHydrated(true);
  }, []);
  return hydrated;
}
var defineClientConfig = (config) => config;
var withViteDevTools = (Component, config) => (props) => {
  hydrationDetector();
  function AppWithDevTools(props2) {
    const hydrated = useHydrated2();
    if (!hydrated)
      return /* @__PURE__ */ jsx57(RequestProvider, { children: /* @__PURE__ */ jsx57(Component, { ...props2 }) });
    return /* @__PURE__ */ jsxs33(RequestProvider, { children: [
      /* @__PURE__ */ jsx57(Component, { ...props2 }),
      createPortal(/* @__PURE__ */ jsx57(ReactRouterDevTools, { ...config }), document.body)
    ] });
  }
  return AppWithDevTools(props);
};

// src/client/hof.ts
var sendEventToDevServer = (req) => {
  if (req.data) {
    req.data = convertBigIntToString(req.data);
  }
  import.meta.hot?.send("request-event", req);
};
var analyzeClientLoaderOrAction = (loaderOrAction, routeId, type) => {
  return async (args) => {
    const startTime = Date.now();
    const headers = Object.fromEntries(args.request.headers.entries());
    sendEventToDevServer({
      type,
      url: args.request.url,
      headers,
      startTime,
      id: routeId,
      method: args.request.method
    });
    let aborted = false;
    args.request.signal.addEventListener("abort", () => {
      aborted = true;
      sendEventToDevServer({
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
    const data = await loaderOrAction(args);
    if (!aborted) {
      sendEventToDevServer({
        type,
        url: args.request.url,
        headers,
        startTime,
        endTime: Date.now(),
        id: routeId,
        data,
        method: args.request.method
      });
    }
    return data;
  };
};
var withClientLoaderWrapper = (clientLoader, routeId) => {
  return analyzeClientLoaderOrAction(clientLoader, routeId, "client-loader");
};
var withLinksWrapper = (links, rdtStylesheet) => {
  return () => [...links(), { rel: "stylesheet", href: rdtStylesheet }];
};
var withClientActionWrapper = (clientAction, routeId) => {
  return analyzeClientLoaderOrAction(clientAction, routeId, "client-action");
};
export {
  EmbeddedDevTools,
  defineClientConfig,
  withClientActionWrapper,
  withClientLoaderWrapper,
  withLinksWrapper,
  withViteDevTools
};
