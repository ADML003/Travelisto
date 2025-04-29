import { ChartTheme } from '../../index';
import { IRangeStyle } from '../model/range-navigator-interface';
import { RangeNavigator } from '../index';
/**
 * Methods for getting the theme color for the range navigator.
 *
 * @private
 * @param {ChartTheme} theme - The theme to apply.
 * @param {RangeNavigator} range - The range navigator control.
 * @returns {IRangeStyle} - The theme color.
 */
export declare function getRangeThemeColor(theme: ChartTheme, range: RangeNavigator): IRangeStyle;
