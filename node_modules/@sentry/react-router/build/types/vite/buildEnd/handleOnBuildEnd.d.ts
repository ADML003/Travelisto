import type { Config } from '@react-router/dev/config';
type BuildEndHook = NonNullable<Config['buildEnd']>;
/**
 * A build end hook that handles Sentry release creation and source map uploads.
 * It creates a new Sentry release if configured, uploads source maps to Sentry,
 * and optionally deletes the source map files after upload.
 */
export declare const sentryOnBuildEnd: BuildEndHook;
export {};
//# sourceMappingURL=handleOnBuildEnd.d.ts.map