// src/vite/plugin.tsx
import chalk from "chalk";
import { normalizePath as normalizePath2 } from "vite";

// src/client/utils/common.ts
var cutArrayToLastN = (arr, n) => {
  if (arr.length < n) return arr;
  return arr.slice(arr.length - n);
};

// src/vite/editor.ts
import { normalizePath } from "vite";

// src/vite/utils.ts
async function processPlugins(pluginDirectoryPath) {
  const fs = await import("node:fs");
  const { join } = await import("node:path");
  const files = fs.readdirSync(pluginDirectoryPath);
  const allExports = [];
  for (const file of files) {
    const filePath = join(pluginDirectoryPath, file);
    const fileCode = fs.readFileSync(filePath, "utf8");
    const lines = fileCode.split("\n");
    for (const line of lines) {
      if (line.includes("export const")) {
        const [name] = line.split("export const ")[1].split(" =");
        allExports.push({ name, path: join("..", filePath).replaceAll("\\", "/") });
      }
    }
  }
  return allExports;
}
var handleDevToolsViteRequest = (req, res, next, cb) => {
  if (!req.url?.includes("react-router-devtools-request")) {
    return next();
  }
  const chunks = [];
  req.on("data", (chunk) => {
    chunks.push(chunk);
  });
  req.on("end", () => {
    const dataToParse = Buffer.concat(chunks);
    try {
      const parsedData = JSON.parse(dataToParse.toString());
      cb(parsedData);
    } catch (e) {
    }
    res.write("OK");
  });
};
async function checkPath(routePath, extensions = [".tsx", ".jsx", ".ts", ".js"]) {
  const fs = await import("node:fs");
  if (fs.existsSync(routePath) && fs.lstatSync(routePath).isDirectory()) {
    return { validPath: routePath, type: "directory" };
  }
  for (const ext of extensions) {
    const filePath = `${routePath}${ext}`;
    if (fs.existsSync(filePath) && fs.lstatSync(filePath).isFile()) {
      return { validPath: filePath, type: "file" };
    }
  }
  return null;
}

// src/vite/editor.ts
var DEFAULT_EDITOR_CONFIG = {
  name: "VSCode",
  open: async (path, lineNumber) => {
    const { exec } = await import("node:child_process");
    exec(`code -g "${normalizePath(path).replaceAll("$", "\\$")}${lineNumber ? `:${lineNumber}` : ""}"`);
  }
};
var handleOpenSource = async ({
  data,
  openInEditor,
  appDir
}) => {
  const { source, line, routeID } = data.data;
  const lineNum = line ? `${line}` : void 0;
  const fs = await import("node:fs");
  const path = await import("node:path");
  if (source) {
    return openInEditor(source, lineNum);
  }
  if (routeID) {
    const routePath = path.join(appDir, routeID);
    const checkedPath = await checkPath(routePath);
    if (!checkedPath) return;
    const { type, validPath } = checkedPath;
    const reactExtensions = ["tsx", "jsx"];
    const allExtensions = ["ts", "js", ...reactExtensions];
    const isRoot = routeID === "root";
    const findFileByExtension = (prefix, filePaths) => {
      const file = filePaths.find((file2) => allExtensions.some((ext) => file2 === `${prefix}.${ext}`));
      return file;
    };
    if (isRoot) {
      if (!fs.existsSync(appDir)) return;
      const filesInReactRouterPath = fs.readdirSync(appDir);
      const rootFile = findFileByExtension("root", filesInReactRouterPath);
      rootFile && openInEditor(path.join(appDir, rootFile), lineNum);
      return;
    }
    if (type === "directory") {
      const filesInFolderRoute = fs.readdirSync(validPath);
      const routeFile = findFileByExtension("route", filesInFolderRoute);
      routeFile && openInEditor(path.join(appDir, routeID, routeFile), lineNum);
      return;
    }
    return openInEditor(validPath, lineNum);
  }
};

// src/vite/file.ts
import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

// src/vite/generators/action.ts
var generateAction = () => {
  return ["export const action = async ({ request }: ActionFunctionArgs) => {", "  return null;", "};"].join("\n");
};

// src/vite/generators/clientAction.ts
var generateClientAction = () => {
  return [
    "export const clientAction = async ({ request }: ClientActionFunctionArgs) => {",
    "  return null;",
    "};"
  ].join("\n");
};

// src/vite/generators/clintLoader.ts
var generateClientLoader = () => {
  return [
    "export const clientLoader = async ({ request }: ClientLoaderFunctionArgs) => {",
    "  return null;",
    "};"
  ].join("\n");
};

// src/vite/generators/component.ts
var generateComponent = (withLoader = false) => {
  return [
    "export default function RouteComponent(){",
    ...withLoader ? ["  const data = useLoaderData<typeof loader>()"] : [],
    "  return (",
    "    <div />",
    "  );",
    "}"
  ].join("\n");
};

// src/vite/generators/dependencies.ts
var generateDependencies = (selectedGenerators, shouldIncludeLoaderData = true) => {
  const actionImports = "";
  const loaderImports = "";
  const reactRouterDeps = [];
  const typeDeps = [];
  if (selectedGenerators.includes("meta")) {
    typeDeps.push("MetaFunction");
  }
  if (selectedGenerators.includes("headers")) {
    typeDeps.push("HeadersFunction");
  }
  if (selectedGenerators.includes("links")) {
    typeDeps.push("LinksFunction");
  }
  if (selectedGenerators.includes("loader")) {
    typeDeps.push("LoaderFunctionArgs");
    if (shouldIncludeLoaderData) {
      reactRouterDeps.push("useLoaderData");
    }
  }
  if (selectedGenerators.includes("clientLoader")) {
    typeDeps.push("ClientLoaderFunctionArgs");
  }
  if (selectedGenerators.includes("clientAction")) {
    typeDeps.push("ClientActionFunctionArgs");
  }
  if (selectedGenerators.includes("action")) {
    typeDeps.push("ActionFunctionArgs");
  }
  if (selectedGenerators.includes("revalidate")) {
    typeDeps.push("ShouldRevalidateFunction");
  }
  if (selectedGenerators.includes("errorBoundary")) {
    reactRouterDeps.push("isRouteErrorResponse", "useRouteError");
  }
  const output = [
    ...actionImports && selectedGenerators.includes("action") ? [actionImports] : [],
    ...loaderImports && selectedGenerators.includes("loader") ? [loaderImports] : []
  ];
  if (typeDeps.length) {
    output.push(`import type { ${typeDeps.join(", ")} } from "react-router";`);
  }
  if (reactRouterDeps.length) {
    output.push(`import { ${reactRouterDeps.join(", ")} } from "react-router";`);
  }
  return output.join("\n");
};

// src/vite/generators/errorBoundary.ts
var generateErrorBoundary = () => {
  return [
    "export function ErrorBoundary(){",
    "  const error = useRouteError();",
    "  if (isRouteErrorResponse(error)) {",
    "    return <div/>",
    "  }",
    "  return <div/>",
    "}"
  ].join("\n");
};

// src/vite/generators/handler.ts
var generateHandler = () => {
  return ["export const handle = () => ({", "  // your handler here", "});"].join("\n");
};

// src/vite/generators/headers.ts
var generateHeaders = () => {
  return ["export const headers: HeadersFunction = () => (", "  {", "    // your headers here", "  }", ");"].join("\n");
};

// src/vite/generators/links.ts
var generateLinks = () => {
  return ["export const links: LinksFunction = () => (", "  [", "    // your links here", "  ]", ");"].join("\n");
};

// src/vite/generators/loader.ts
var generateLoader = () => {
  return ["export const loader = async ({ request }: LoaderFunctionArgs) => {", "  return null;", "};"].join("\n");
};

// src/vite/generators/meta.ts
var generateMeta = () => {
  return ["export const meta: MetaFunction = () => [", "  // your meta here", "];"].join("\n");
};

// src/vite/generators/revalidate.ts
var generateRevalidate = () => {
  return ["export const shouldRevalidate: ShouldRevalidateFunction = () => {", " return true;", "};"].join("\n");
};

// src/vite/generators/index.ts
var GENERATORS = {
  action: generateAction,
  component: generateComponent,
  errorBoundary: generateErrorBoundary,
  handler: generateHandler,
  headers: generateHeaders,
  links: generateLinks,
  loader: generateLoader,
  clientLoader: generateClientLoader,
  clientAction: generateClientAction,
  meta: generateMeta,
  revalidate: generateRevalidate,
  dependencies: generateDependencies
};

// src/vite/file.ts
var defaultGenerationOrder = [
  "links",
  "meta",
  "handler",
  "headers",
  "loader",
  "clientLoader",
  "action",
  "clientAction",
  "component",
  "errorBoundary",
  "revalidate"
];
var handleWriteFile = async ({ path, options, openInEditor }) => {
  const generatorOptions = Object.entries(options).map(([key, value]) => {
    if (value) {
      return { key };
    }
  }).filter(Boolean);
  let outputFile = `${resolve("app", "routes", path)}`;
  const extensions = [".tsx", ".jsx", ".ts", ".js"];
  if (!extensions.some((ext) => outputFile.endsWith(ext))) {
    outputFile = `${outputFile}.tsx`;
  }
  const selectedGenerators = [
    "component",
    ...generatorOptions.map((option) => option.key)
  ];
  const withLoader = selectedGenerators.includes("loader");
  const fileContent = [
    GENERATORS.dependencies(selectedGenerators),
    ...defaultGenerationOrder.map((generatorKey) => {
      if (generatorKey === "component") {
        return GENERATORS[generatorKey](withLoader);
      }
      if (selectedGenerators.includes(generatorKey)) {
        return GENERATORS[generatorKey]();
      }
      return void 0;
    })
  ].filter(Boolean).join("\n\n");
  await writeFile(outputFile, fileContent);
  openInEditor(outputFile, void 0);
};

// src/vite/utils/babel.ts
import { parse } from "@babel/parser";
import * as t from "@babel/types";
import generate from "@babel/generator";
import traverse from "@babel/traverse";
var trav = typeof traverse.default !== "undefined" ? traverse.default : traverse;
var gen = typeof generate.default !== "undefined" ? generate.default : generate;

// src/vite/utils/data-functions-augment.ts
var SERVER_COMPONENT_EXPORTS = ["loader", "action"];
var CLIENT_COMPONENT_EXPORTS = ["clientLoader", "clientAction"];
var ALL_EXPORTS = [...SERVER_COMPONENT_EXPORTS, ...CLIENT_COMPONENT_EXPORTS];
var transform = (ast, routeId) => {
  const serverHocs = [];
  const clientHocs = [];
  function getServerHocId(path, hocName) {
    const uid = path.scope.generateUidIdentifier(hocName);
    const hasHoc = serverHocs.find(([name]) => name === hocName);
    if (hasHoc) {
      return uid;
    }
    serverHocs.push([hocName, uid]);
    return uid;
  }
  function getClientHocId(path, hocName) {
    const uid = path.scope.generateUidIdentifier(hocName);
    const hasHoc = clientHocs.find(([name]) => name === hocName);
    if (hasHoc) {
      return uid;
    }
    clientHocs.push([hocName, uid]);
    return uid;
  }
  function uppercaseFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  const transformations = [];
  const importDeclarations = [];
  trav(ast, {
    ExportDeclaration(path) {
      if (path.isExportNamedDeclaration()) {
        const decl = path.get("declaration");
        if (decl.isVariableDeclaration()) {
          for (const varDeclarator of decl.get("declarations")) {
            const id = varDeclarator.get("id");
            const init = varDeclarator.get("init");
            const expr = init.node;
            if (!expr) return;
            if (!id.isIdentifier()) return;
            const { name } = id.node;
            if (!ALL_EXPORTS.includes(name)) return;
            const uid = CLIENT_COMPONENT_EXPORTS.includes(name) ? getClientHocId(path, `with${uppercaseFirstLetter(name)}Wrapper`) : getServerHocId(path, `with${uppercaseFirstLetter(name)}Wrapper`);
            init.replaceWith(t.callExpression(uid, [expr, t.stringLiteral(routeId)]));
          }
          return;
        }
        if (decl.isFunctionDeclaration()) {
          const { id } = decl.node;
          if (!id) return;
          const { name } = id;
          if (!ALL_EXPORTS.includes(name)) return;
          const uid = CLIENT_COMPONENT_EXPORTS.includes(name) ? getClientHocId(path, `with${uppercaseFirstLetter(name)}Wrapper`) : getServerHocId(path, `with${uppercaseFirstLetter(name)}Wrapper`);
          decl.replaceWith(
            t.variableDeclaration("const", [
              t.variableDeclarator(
                t.identifier(name),
                t.callExpression(uid, [toFunctionExpression(decl.node), t.stringLiteral(routeId)])
              )
            ])
          );
        }
      }
    },
    ExportNamedDeclaration(path) {
      const specifiers = path.node.specifiers;
      for (const specifier of specifiers) {
        if (!(t.isExportSpecifier(specifier) && t.isIdentifier(specifier.exported))) {
          return;
        }
        const name = specifier.exported.name;
        if (!ALL_EXPORTS.includes(name)) {
          return;
        }
        const uid = CLIENT_COMPONENT_EXPORTS.includes(name) ? getClientHocId(path, `with${uppercaseFirstLetter(name)}Wrapper`) : getServerHocId(path, `with${uppercaseFirstLetter(name)}Wrapper`);
        const binding = path.scope.getBinding(name);
        if (path.node.source) {
          const source = path.node.source.value;
          importDeclarations.push(
            t.importDeclaration(
              [t.importSpecifier(t.identifier(`_${name}`), t.identifier(name))],
              t.stringLiteral(source)
            )
          );
          transformations.push(() => {
            path.insertBefore(
              t.exportNamedDeclaration(
                t.variableDeclaration("const", [
                  t.variableDeclarator(
                    t.identifier(name),
                    t.callExpression(uid, [t.identifier(`_${name}`), t.stringLiteral(routeId)])
                  )
                ])
              )
            );
          });
          transformations.push(() => {
            const remainingSpecifiers = path.node.specifiers.filter(
              (exportSpecifier) => !(t.isIdentifier(exportSpecifier.exported) && exportSpecifier.exported.name === name)
            );
            path.replaceWith(t.exportNamedDeclaration(null, remainingSpecifiers, path.node.source));
          });
        } else if (binding?.path.isFunctionDeclaration()) {
          binding.path.replaceWith(
            t.variableDeclaration("const", [
              t.variableDeclarator(
                t.identifier(name),
                t.callExpression(uid, [toFunctionExpression(binding.path.node), t.stringLiteral(routeId)])
              )
            ])
          );
        } else if (binding?.path.isVariableDeclarator()) {
          const init = binding.path.get("init");
          if (init.node) {
            init.replaceWith(t.callExpression(uid, [init.node, t.stringLiteral(routeId)]));
          }
        } else {
          transformations.push(() => {
            const uniqueName = path.scope.generateUidIdentifier(name).name;
            path.replaceWith(
              t.exportNamedDeclaration(
                null,
                [t.exportSpecifier(t.identifier(name), t.identifier(uniqueName))],
                path.node.source
              )
            );
            path.insertAfter(
              t.exportNamedDeclaration(
                t.variableDeclaration("const", [
                  t.variableDeclarator(
                    t.identifier(name),
                    t.callExpression(uid, [t.identifier(uniqueName), t.stringLiteral(routeId)])
                  )
                ]),
                []
              )
            );
          });
        }
      }
    }
  });
  for (const transformation of transformations) {
    transformation();
  }
  if (importDeclarations.length > 0) {
    ast.program.body.unshift(...importDeclarations);
  }
  if (serverHocs.length > 0) {
    ast.program.body.unshift(
      t.importDeclaration(
        serverHocs.map(([name, identifier]) => t.importSpecifier(identifier, t.identifier(name))),
        t.stringLiteral("react-router-devtools/server")
      )
    );
  }
  if (clientHocs.length > 0) {
    ast.program.body.unshift(
      t.importDeclaration(
        clientHocs.map(([name, identifier]) => t.importSpecifier(identifier, t.identifier(name))),
        t.stringLiteral("react-router-devtools/client")
      )
    );
  }
  const didTransform = clientHocs.length > 0 || serverHocs.length > 0;
  return didTransform;
};
function toFunctionExpression(decl) {
  return t.functionExpression(decl.id, decl.params, decl.body, decl.generator, decl.async);
}
function augmentDataFetchingFunctions(code, routeId, id) {
  const [filePath] = id.split("?");
  try {
    const ast = parse(code, { sourceType: "module" });
    const didTransform = transform(ast, routeId);
    if (!didTransform) {
      return { code };
    }
    return gen(ast, { sourceMaps: true, filename: id, sourceFileName: filePath });
  } catch (e) {
    return { code };
  }
}

// src/vite/utils/inject-client.ts
var ALL_EXPORTS2 = ["links"];
var transform2 = (ast, clientConfig) => {
  const hocs = [];
  function getHocUid(path, hocName) {
    const uid = path.scope.generateUidIdentifier(hocName);
    hocs.push([hocName, uid]);
    return uid;
  }
  const clientConfigObj = JSON.parse(clientConfig);
  if (clientConfigObj.plugins) {
    clientConfigObj.plugins = clientConfigObj.plugins.replace("[", "").replace("]", "").split(",").map((plugin) => t.identifier(plugin.trim()));
  }
  const clientConfigExpression = t.objectExpression(
    Object.entries(clientConfigObj).map(
      ([key, value]) => t.objectProperty(t.identifier(key), key === "plugins" ? t.arrayExpression(value) : t.valueToNode(value))
    )
  );
  function uppercaseFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  const transformations = [];
  trav(ast, {
    ExportDeclaration(path) {
      if (path.isExportDefaultDeclaration()) {
        const declaration = path.get("declaration");
        const expr = declaration.isExpression() ? declaration.node : declaration.isFunctionDeclaration() ? toFunctionExpression2(declaration.node) : void 0;
        if (expr) {
          const uid = getHocUid(path, "withViteDevTools");
          declaration.replaceWith(t.callExpression(uid, [expr, clientConfigExpression]));
        }
        return;
      }
      if (path.isExportNamedDeclaration()) {
        const decl = path.get("declaration");
        if (decl.isVariableDeclaration()) {
          for (const varDeclarator of decl.get("declarations")) {
            const id = varDeclarator.get("id");
            const init = varDeclarator.get("init");
            const expr = init.node;
            if (!expr) return;
            if (!id.isIdentifier()) return;
            const { name } = id.node;
            if (!ALL_EXPORTS2.includes(name)) return;
            const uid = getHocUid(path, `with${uppercaseFirstLetter(name)}Wrapper`);
            init.replaceWith(t.callExpression(uid, [expr, t.identifier("rdtStylesheet")]));
          }
          return;
        }
        if (decl.isFunctionDeclaration()) {
          const { id } = decl.node;
          if (!id) return;
          const { name } = id;
          if (!ALL_EXPORTS2.includes(name)) return;
          const uid = getHocUid(path, `with${uppercaseFirstLetter(name)}Wrapper`);
          decl.replaceWith(
            t.variableDeclaration("const", [
              t.variableDeclarator(
                t.identifier(name),
                t.callExpression(uid, [toFunctionExpression2(decl.node), t.identifier("rdtStylesheet")])
              )
            ])
          );
        }
        const specifiers = path.node.specifiers;
        for (const specifier of specifiers) {
          if (t.isExportSpecifier(specifier) && t.isIdentifier(specifier.exported) && specifier.exported.name === "default" && t.isIdentifier(specifier.local)) {
            const localName = specifier.local.name;
            const uid = getHocUid(path, "withViteDevTools");
            transformations.push(() => {
              path.insertBefore(
                t.exportDefaultDeclaration(t.callExpression(uid, [t.identifier(localName), clientConfigExpression]))
              );
              const remainingSpecifiers = path.node.specifiers.filter(
                (s) => !(t.isExportSpecifier(s) && t.isIdentifier(s.exported) && s.exported.name === "default")
              );
              if (remainingSpecifiers.length > 0) {
                path.replaceWith(t.exportNamedDeclaration(null, remainingSpecifiers, path.node.source));
              } else {
                path.remove();
              }
            });
          }
        }
      }
    }
  });
  for (const transformation of transformations) {
    transformation();
  }
  if (hocs.length > 0) {
    ast.program.body.unshift(
      t.importDeclaration(
        hocs.map(([name, identifier]) => t.importSpecifier(identifier, t.identifier(name))),
        t.stringLiteral("react-router-devtools/client")
      ),
      t.importDeclaration(
        [t.importDefaultSpecifier(t.identifier("rdtStylesheet"))],
        t.stringLiteral("react-router-devtools/client.css?url")
      )
    );
  }
  return hocs.length > 0;
};
function toFunctionExpression2(decl) {
  return t.functionExpression(decl.id, decl.params, decl.body, decl.generator, decl.async);
}
function injectRdtClient(code, clientConfig, pluginImports, id) {
  const [filePath] = id.split("?");
  const ast = parse(code, { sourceType: "module" });
  const didTransform = transform2(ast, clientConfig);
  if (!didTransform) {
    return { code };
  }
  const generatedOutput = gen(ast, { sourceMaps: true, sourceFileName: filePath, filename: id });
  const output = `${pluginImports}
${generatedOutput.code}`;
  if (!output.includes("export const links")) {
    return {
      code: [output, "", `export const links = () => [{ rel: "stylesheet", href: rdtStylesheet }];`].join("\n"),
      map: generatedOutput.map
    };
  }
  return {
    code: output,
    map: generatedOutput.map
  };
}

// src/vite/utils/inject-context.ts
var SERVER_COMPONENT_EXPORTS2 = ["loader", "action"];
var CLIENT_COMPONENT_EXPORTS2 = ["clientLoader", "clientAction"];
var ALL_EXPORTS3 = [...SERVER_COMPONENT_EXPORTS2, ...CLIENT_COMPONENT_EXPORTS2];
var transform3 = (ast, routeId) => {
  const hocs = [];
  function getHocId(path, hocName) {
    const uid = path.scope.generateUidIdentifier(hocName);
    const hasHoc = hocs.find(([name]) => name === hocName);
    if (hasHoc) {
      return uid;
    }
    hocs.push([hocName, uid]);
    return uid;
  }
  function uppercaseFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  const transformations = [];
  const importDeclarations = [];
  trav(ast, {
    ExportDeclaration(path) {
      if (path.isExportNamedDeclaration()) {
        const decl = path.get("declaration");
        if (decl.isVariableDeclaration()) {
          for (const varDeclarator of decl.get("declarations")) {
            const id = varDeclarator.get("id");
            const init = varDeclarator.get("init");
            const expr = init.node;
            if (!expr) return;
            if (!id.isIdentifier()) return;
            const { name } = id.node;
            if (!ALL_EXPORTS3.includes(name)) return;
            const uid = getHocId(path, `with${uppercaseFirstLetter(name)}ContextWrapper`);
            init.replaceWith(t.callExpression(uid, [expr, t.stringLiteral(routeId)]));
          }
          return;
        }
        if (decl.isFunctionDeclaration()) {
          const { id } = decl.node;
          if (!id) return;
          const { name } = id;
          if (!ALL_EXPORTS3.includes(name)) return;
          const uid = getHocId(path, `with${uppercaseFirstLetter(name)}ContextWrapper`);
          decl.replaceWith(
            t.variableDeclaration("const", [
              t.variableDeclarator(
                t.identifier(name),
                t.callExpression(uid, [toFunctionExpression3(decl.node), t.stringLiteral(routeId)])
              )
            ])
          );
        }
      }
    },
    ExportNamedDeclaration(path) {
      const specifiers = path.node.specifiers;
      for (const specifier of specifiers) {
        if (!(t.isExportSpecifier(specifier) && t.isIdentifier(specifier.exported))) {
          return;
        }
        const name = specifier.exported.name;
        if (!ALL_EXPORTS3.includes(name)) {
          return;
        }
        const uid = getHocId(path, `with${uppercaseFirstLetter(name)}ContextWrapper`);
        const binding = path.scope.getBinding(name);
        if (path.node.source) {
          const source = path.node.source.value;
          importDeclarations.push(
            t.importDeclaration(
              [t.importSpecifier(t.identifier(`_${name}`), t.identifier(name))],
              t.stringLiteral(source)
            )
          );
          transformations.push(() => {
            path.insertBefore(
              t.exportNamedDeclaration(
                t.variableDeclaration("const", [
                  t.variableDeclarator(
                    t.identifier(name),
                    t.callExpression(uid, [t.identifier(`_${name}`), t.stringLiteral(routeId)])
                  )
                ])
              )
            );
          });
          transformations.push(() => {
            const remainingSpecifiers = path.node.specifiers.filter(
              (exportSpecifier) => !(t.isIdentifier(exportSpecifier.exported) && exportSpecifier.exported.name === name)
            );
            path.replaceWith(t.exportNamedDeclaration(null, remainingSpecifiers, path.node.source));
          });
        } else if (binding?.path.isFunctionDeclaration()) {
          binding.path.replaceWith(
            t.variableDeclaration("const", [
              t.variableDeclarator(
                t.identifier(name),
                t.callExpression(uid, [toFunctionExpression3(binding.path.node), t.stringLiteral(routeId)])
              )
            ])
          );
        } else if (binding?.path.isVariableDeclarator()) {
          const init = binding.path.get("init");
          if (init.node) {
            init.replaceWith(t.callExpression(uid, [init.node, t.stringLiteral(routeId)]));
          }
        } else {
          transformations.push(() => {
            const uniqueName = path.scope.generateUidIdentifier(name).name;
            path.replaceWith(
              t.exportNamedDeclaration(
                null,
                [t.exportSpecifier(t.identifier(name), t.identifier(uniqueName))],
                path.node.source
              )
            );
            path.insertAfter(
              t.exportNamedDeclaration(
                t.variableDeclaration("const", [
                  t.variableDeclarator(
                    t.identifier(name),
                    t.callExpression(uid, [t.identifier(uniqueName), t.stringLiteral(routeId)])
                  )
                ]),
                []
              )
            );
          });
        }
      }
    }
  });
  for (const transformation of transformations) {
    transformation();
  }
  if (importDeclarations.length > 0) {
    ast.program.body.unshift(...importDeclarations);
  }
  if (hocs.length > 0) {
    ast.program.body.unshift(
      t.importDeclaration(
        hocs.map(([name, identifier]) => t.importSpecifier(identifier, t.identifier(name))),
        t.stringLiteral("react-router-devtools/context")
      )
    );
  }
  const didTransform = hocs.length > 0;
  return didTransform;
};
function toFunctionExpression3(decl) {
  return t.functionExpression(decl.id, decl.params, decl.body, decl.generator, decl.async);
}
function injectContext(code, routeId, id) {
  const [filePath] = id.split("?");
  try {
    const ast = parse(code, { sourceType: "module" });
    const didTransform = transform3(ast, routeId);
    if (!didTransform) {
      return { code };
    }
    return gen(ast, { sourceMaps: true, sourceFileName: filePath, filename: id });
  } catch (e) {
    return { code };
  }
}

// src/vite/plugin.tsx
var routeInfo = /* @__PURE__ */ new Map();
var unusedEvents = /* @__PURE__ */ new Map();
var defineRdtConfig = (config) => config;
var reactRouterDevTools = (args) => {
  const serverConfig = args?.server || {};
  const clientConfig = {
    ...args?.client,
    editorName: args?.editor?.name
  };
  const includeClient = args?.includeInProd?.client ?? false;
  const includeServer = args?.includeInProd?.server ?? false;
  const includeDevtools = args?.includeInProd?.devTools ?? false;
  const appDir = args?.appDir || "./app";
  const appDirName = appDir.replace("./", "");
  const shouldInject = (mode, include) => mode === "development" || include;
  const isTransformable = (id) => {
    const extensions = [".tsx", ".jsx", ".ts", ".js"];
    if (!extensions.some((ext) => id.endsWith(ext))) {
      return;
    }
    const isRoute = id.includes(`${appDirName}/root`) || id.includes(`${appDirName}/routes`);
    if (id.includes("node_modules") || id.includes("dist") || id.includes("build") || id.includes("?") || !isRoute) {
      return;
    }
    const routeId = id.replace(normalizePath2(process.cwd()), "").replace(`/${appDirName}/`, "").replace(".tsx", "");
    return routeId;
  };
  if (typeof process !== "undefined") {
    process.rdt_config = serverConfig;
  }
  return [
    {
      name: "react-router-devtools",
      apply(config) {
        return shouldInject(config.mode, includeClient);
      },
      async configResolved(resolvedViteConfig) {
        const reactRouterIndex = resolvedViteConfig.plugins.findIndex((p) => p.name === "react-router");
        const devToolsIndex = resolvedViteConfig.plugins.findIndex((p) => p.name === "react-router-devtools");
        if (reactRouterIndex >= 0 && devToolsIndex > reactRouterIndex) {
          throw new Error("react-router-devtools plugin has to be before the react-router plugin!");
        }
      },
      config(config) {
        config.optimizeDeps = {
          ...config.optimizeDeps,
          include: [
            ...config.optimizeDeps?.include ?? [],
            "react-router-devtools > beautify",
            "react-router-devtools > react-diff-viewer-continued",
            "react-router-devtools > react-d3-tree",
            "react-router-devtools > classnames",
            "react-router-devtools > @bkrem/react-transition-group",
            "react-router-devtools/client",
            "react-router-devtools/context",
            "react-router-devtools/server"
          ]
        };
      },
      async transform(code, id) {
        const isRoot = id.endsWith("/root.tsx") || id.endsWith("/root.jsx");
        if (!isRoot) {
          return;
        }
        const pluginDir = args?.pluginDir || void 0;
        const plugins = pluginDir && process.env.NODE_ENV === "development" ? await processPlugins(pluginDir) : [];
        const pluginNames = plugins.map((p) => p.name);
        const pluginImports = plugins.map((plugin) => `import { ${plugin.name} } from "${plugin.path}";`).join("\n");
        const config = `{ "config": ${JSON.stringify(clientConfig)}, "plugins": "[${pluginNames.join(",")}]" }`;
        return injectRdtClient(code, config, pluginImports, id);
      }
    },
    {
      name: "react-router-devtools-inject-context",
      apply(config) {
        return shouldInject(config.mode, includeDevtools);
      },
      transform(code, id) {
        const routeId = isTransformable(id);
        if (!routeId) {
          return;
        }
        const finalCode = injectContext(code, routeId, id);
        return finalCode;
      }
    },
    {
      name: "react-router-devtools-data-function-augment",
      apply(config) {
        return shouldInject(config.mode, includeServer);
      },
      transform(code, id) {
        const routeId = isTransformable(id);
        if (!routeId) {
          return;
        }
        const finalCode = augmentDataFetchingFunctions(code, routeId, id);
        return finalCode;
      }
    },
    {
      enforce: "pre",
      name: "react-router-devtools-custom-server",
      apply(config) {
        return config.mode === "development";
      },
      async configureServer(server) {
        if (server.config.appType !== "custom") {
          return;
        }
        server.httpServer?.on("listening", () => {
          process.rdt_port = server.config.server.port ?? 5173;
        });
        const channel = server.hot.channels.find((channel2) => channel2.name === "ws") ?? server.environments?.client.hot;
        server.middlewares.use(
          (req, res, next) => handleDevToolsViteRequest(req, res, next, (parsedData) => {
            const { type, data, routine } = parsedData;
            if (routine === "request-event") {
              unusedEvents.set(parsedData.id + parsedData.startTime, parsedData);
              for (const client of server.hot.channels) {
                client.send("request-event", JSON.stringify(parsedData));
              }
              return;
            }
            const id = data.id;
            const existingData = routeInfo.get(id);
            if (existingData) {
              if (type === "loader") {
                existingData.loader = cutArrayToLastN([...existingData.loader, data], 30);
              }
              if (type === "action") {
                existingData.action = cutArrayToLastN([...existingData.action, data], 30);
              }
            } else {
              if (type === "loader") {
                routeInfo.set(id, { loader: [data], action: [] });
              }
              if (type === "action") {
                routeInfo.set(id, { loader: [], action: [data] });
              }
            }
            for (const client of server.hot.channels) {
              client.send("route-info", JSON.stringify({ type, data }));
            }
          })
        );
        server.hot.on("all-route-info", (data, client) => {
          client.send(
            "all-route-info",
            JSON.stringify({
              type: "all-route-info",
              data: Object.fromEntries(routeInfo.entries())
            })
          );
        });
        if (!server.config.isProduction) {
          channel?.on("remove-event", (data, client) => {
            const parsedData = data;
            const { id, startTime } = parsedData;
            unusedEvents.delete(id + startTime);
          });
          channel?.on("get-events", (_, client) => {
            const events = Array.from(unusedEvents.values());
            if (events) {
              client.send("get-events", JSON.stringify(events));
            }
          });
          channel?.on("request-event", (data, client) => {
            unusedEvents.set(data.id + data.startTime, data);
            client.send(
              "request-event",
              JSON.stringify({
                type: "request-event",
                data,
                ...data
              })
            );
          });
          const editor = args?.editor ?? DEFAULT_EDITOR_CONFIG;
          const openInEditor = async (path, lineNum) => {
            if (!path) {
              return;
            }
            editor.open(path, lineNum);
          };
          server.hot.on("open-source", (data) => handleOpenSource({ data, openInEditor, appDir }));
          server.hot.on("add-route", (data) => handleWriteFile({ ...data, openInEditor }));
        }
      }
    },
    {
      name: "better-console-logs",
      enforce: "pre",
      apply(config) {
        return config.mode === "development";
      },
      async transform(code, id) {
        if (id.includes("node_modules") || id.includes("?raw") || id.includes("dist") || id.includes("build") || !id.includes(appDirName))
          return;
        if (code.includes("console.")) {
          const lines = code.split("\n");
          return lines.map((line, lineNumber) => {
            if (line.trim().startsWith("//") || line.trim().startsWith("/**") || line.trim().startsWith("*")) {
              return line;
            }
            if (line.replaceAll(" ", "").includes("=>console.") || line.includes("return console.")) {
              return line;
            }
            const column = line.indexOf("console.");
            const logMessage = `"${chalk.magenta("LOG")} ${chalk.blueBright(`${id.replace(normalizePath2(process.cwd()), "")}:${lineNumber + 1}:${column + 1}`)}\\n \u2192 "`;
            if (line.includes("console.log(")) {
              const newLine = `console.log(${logMessage},`;
              return line.replace("console.log(", newLine);
            }
            if (line.includes("console.error(")) {
              const newLine = `console.error(${logMessage},`;
              return line.replace("console.error(", newLine);
            }
            return line;
          }).join("\n");
        }
      }
    }
  ];
};
export {
  defineRdtConfig,
  reactRouterDevTools
};
