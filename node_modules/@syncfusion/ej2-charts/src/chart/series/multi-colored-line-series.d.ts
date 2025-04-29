import { Series } from './chart-series';
import { Axis } from '../../chart/axis/axis';
import { MultiColoredSeries } from './multi-colored-base';
/**
 * The `MultiColoredLineSeries` module is used to render line series with multiple colors.
 */
export declare class MultiColoredLineSeries extends MultiColoredSeries {
    /**
     * Render the multi colored line series on the chart.
     *
     * @param {Series} series - The series to be rendered.
     * @param {Axis} xAxis - The x-axis of the chart.
     * @param {Axis} yAxis - The y-axis of the chart.
     * @param {boolean} isInverted - Indicates whether the chart is inverted.
     * @param {boolean} pointAnimate - Specifies whether the point has to be animated or not.
     * @param {boolean} pointUpdate - Specifies whether the point has to be updated or not.
     * @returns {void}
     * @private
     */
    render(series: Series, xAxis: Axis, yAxis: Axis, isInverted: boolean, pointAnimate?: boolean, pointUpdate?: boolean): void;
    /**
     * To animate point for multicolored line series.
     *
     * @param {Series} series - Specifies the series.
     * @param {number} point - Specifies the point.
     * @returns {void}
     * @private
     */
    updateDirection(series: Series, point: number[]): void;
    /**
     * Animates the series.
     *
     * @param  {Series} series - Defines the series to animate.
     * @returns {void}
     * @private
     */
    doAnimation(series: Series): void;
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the line series.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
