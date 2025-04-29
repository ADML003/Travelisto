import { PathOption } from '@syncfusion/ej2-svg-base';
import { Series } from './chart-series';
import { LineBase } from './line-base';
import { Axis } from '../../chart/axis/axis';
/**
 * The `StackingAreaSeries` module is used to render the stacking area series.
 */
export declare class StackingAreaSeries extends LineBase {
    /**
     * Render the Stacking area series.
     *
     * @param {Series} series - The series to be rendered.
     * @param {Axis} xAxis - The x-axis of the chart.
     * @param {Axis} yAxis - The y-axis of the chart.
     * @param {boolean} isInverted - Specifies whether the chart is inverted.
     * @param {boolean} pointAnimate - Specifies whether the point has to be animated or not.
     * @param {boolean} pointUpdate - Specifies whether the point has to be updated or not.
     * @returns {void}
     * @private
     */
    render(series: Series, xAxis: Axis, yAxis: Axis, isInverted: boolean, pointAnimate?: boolean, pointUpdate?: boolean): void;
    /**
     * To animate point for stacking area series.
     *
     * @param {Series} series - Specifies the series.
     * @param {number} point - Specifies the point.
     * @returns {void}
     * @private
     */
    updateDirection(series: Series, point: number[]): void;
    /**
     * Adds a area path to equate the start and end paths.
     *
     * @param {PathOption} options - The options for the path.
     * @param {Series} series - The series to which the path belongs.
     * @param {string} clipRect - The clip rectangle for the path.
     * @returns {void}
     * @private
     */
    addAreaPath(options: PathOption, series: Series, clipRect: string): void;
    /**
     * Animates the series.
     *
     * @param  {Series} series - Defines the series to animate.
     * @returns {void}
     * @private
     */
    doAnimation(series: Series): void;
    /**
     * To destroy the stacking area.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    protected getModuleName(): string;
    /**
     * Retrieves the previous series from the provided series.
     *
     * @param {Series} series - The current series.
     * @returns {Series} - The previous series.
     */
    private getPreviousSeries;
    /**
     * To find the first visible series index.
     *
     * @param {Series[]} seriesCollection - The first visible series index.
     * @returns {number} - Returns the first visible series index.
     */
    private getFirstSeriesIndex;
}
