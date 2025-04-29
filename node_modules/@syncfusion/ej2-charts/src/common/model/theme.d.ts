import { IFontMapping } from './interface';
import { AccumulationTheme } from '../../accumulation-chart/model/enum';
import { ChartTheme } from '../utils/enum';
import { IThemeStyle, IScrollbarThemeStyle, AccumulationChart, Chart, StockChart } from '../../index';
/** @private */
export declare const stockEventFont: IFontMapping;
/**
 * Gets an array of series colors for chart visualization.
 *
 * @param {ChartTheme | AccumulationTheme} theme - The theme for which to retrieve the series colors.
 * @returns {string[]} - An array of series colors.
 * @private
 */
export declare function getSeriesColor(theme: ChartTheme | AccumulationTheme): string[];
/**
 * Gets a theme color.
 *
 * @param {ChartTheme | AccumulationTheme} theme - The theme for which to retrieve the series colors.
 * @param {boolean} canvas - Specifies whether the canvas is used.
 * @param {AccumulationChart | Chart | StockChart} [chart] - The chart instance (optional).
 * @returns {IThemeStyle} - Returns theme style.
 * @private
 */
export declare function getThemeColor(theme: ChartTheme | AccumulationTheme, canvas: boolean, chart?: AccumulationChart | Chart | StockChart): IThemeStyle;
/**
 * Gets an scroll bar theme color.
 *
 * @param {ChartTheme} theme - The theme for which to retrieve the series colors.
 * @returns {IScrollbarThemeStyle} - Returns scroll bar theme style.
 * @private
 */
export declare function getScrollbarThemeColor(theme: ChartTheme): IScrollbarThemeStyle;
