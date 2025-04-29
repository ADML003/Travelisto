import { PathOption } from '@syncfusion/ej2-svg-base';
import { Series } from './chart-series';
import { SplineBase } from './spline-base';
import { Axis } from '../../chart/axis/axis';
/**
 * The `SplineAreaSeries` module is used to render the spline area series.
 */
export declare class SplineAreaSeries extends SplineBase {
    /**
     * Render the splineArea series.
     *
     * @param {Series} series - The series to be rendered.
     * @param {Axis} xAxis - The x-axis of the chart.
     * @param {Axis} yAxis - The y-axis of the chart.
     * @param {boolean} isInverted - Specifies whether the chart is inverted.
     * @param {boolean} pointAnimate - Specifies whether the point has to be animated.
     * @param {boolean} pointUpdate - Specifies whether the point has to be updated.
     * @returns {void}
     * @private
     */
    render(series: Series, xAxis: Axis, yAxis: Axis, isInverted: boolean, pointAnimate: boolean, pointUpdate?: boolean): void;
    /**
     * To animate point for spline area series.
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
     * @param {ChartLocation[]} [firstSymbol] - The location of the first symbol.
     * @returns {void}
     * @private
     */
    addPath(options: PathOption, series: Series, clipRect: string): void;
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the spline.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
