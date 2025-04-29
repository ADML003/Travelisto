/**
 * Circular 3D chart theme file.
 */
import { CircularChart3DTheme } from './enum';
import { CircularChart3DThemeStyle } from './circular3d-base';
/**
 * Gets an array of series colors for circular 3D chart visualization.
 *
 * @param {CircularChart3DTheme} theme - The theme for which to retrieve the series colors.
 * @returns {string[]} - An array of series colors.
 * @private
 */
export declare function getCircular3DSeriesColor(theme: CircularChart3DTheme): string[];
/**
 * Gets the theme color for circular 3D chart visualization.
 *
 * @param {CircularChart3DTheme} theme - The theme for which to retrieve the color.
 * @returns {CircularChart3DThemeStyle} - The theme color style object.
 * @private
 */
export declare function getCircular3DThemeColor(theme: CircularChart3DTheme): CircularChart3DThemeStyle;
