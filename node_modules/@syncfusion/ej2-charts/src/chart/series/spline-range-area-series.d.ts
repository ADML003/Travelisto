import { PathOption } from '@syncfusion/ej2-svg-base';
import { Series, Points } from './chart-series';
import { SplineBase } from './spline-base';
import { Axis } from '../axis/axis';
/**
 * The `SplineRangeAreaSeries` module is used to render the spline range area series.
 */
export declare class SplineRangeAreaSeries extends SplineBase {
    borderDirection: string;
    /**
     * Render SplineRangeArea Series.
     *
     * @param {Series} series - The series to be rendered.
     * @param {Axis} xAxis - The x-axis of the chart.
     * @param {Axis} yAxis - The y-axis of the chart.
     * @param {boolean} inverted - Specifies whether the chart is inverted.
     * @param {boolean} pointAnimate - Specifies whether the point has to be animated or not.
     * @param {boolean} pointUpdate - Specifies whether the point has to be updated or not.
     * @returns {void}
     * @private
     */
    render(series: Series, xAxis: Axis, yAxis: Axis, inverted: boolean, pointAnimate?: boolean, pointUpdate?: boolean): void;
    /**
     * path for rendering the low points in SplineRangeArea
     *
     * @returns {void}.
     * @private
     */
    protected closeSplineRangeAreaPath(visiblePoint: Points[], point: Points, series: Series, direction: string, i: number, xAxis: Axis, yAxis: Axis, inverted: boolean): string;
    /**
     * To animate point for spline range area series.
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
    addPath(options: PathOption, series: Series, clipRect: string): void;
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
