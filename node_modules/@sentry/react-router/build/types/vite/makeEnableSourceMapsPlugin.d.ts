import type { Plugin, UserConfig } from 'vite';
import type { SentryReactRouterBuildOptions } from './types';
/**
 * A Sentry plugin for React Router to enable "hidden" source maps if they are unset.
 */
export declare function makeEnableSourceMapsPlugin(options: SentryReactRouterBuildOptions): Plugin;
/** There are 3 ways to set up source map generation
 *
 *     1. User explicitly disabled source maps
 *       - keep this setting (emit a warning that errors won't be unminified in Sentry)
 *       - we won't upload anything
 *
 *     2. Users enabled source map generation (true, 'hidden', 'inline').
 *       - keep this setting (don't do anything - like deletion - besides uploading)
 *
 *     3. Users didn't set source maps generation
 *       - we enable 'hidden' source maps generation
 *       - configure `filesToDeleteAfterUpload` to delete all .map files (we emit a log about this)
 *
 * --> only exported for testing
 */
export declare function getUpdatedSourceMapSettings(viteConfig: UserConfig, sentryPluginOptions?: SentryReactRouterBuildOptions): boolean | 'inline' | 'hidden';
//# sourceMappingURL=makeEnableSourceMapsPlugin.d.ts.map