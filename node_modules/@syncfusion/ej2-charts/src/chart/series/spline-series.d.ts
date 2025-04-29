import { PathOption } from '@syncfusion/ej2-svg-base';
import { Series } from './chart-series';
import { SplineBase } from './spline-base';
import { Axis } from '../../chart/axis/axis';
/**
 * The `SplineSeries` module is used to render the spline series.
 */
export declare class SplineSeries extends SplineBase {
    /**
     * Render the spline series.
     *
     * @param {Series} series - The series to be rendered.
     * @param {Axis} xAxis - The x-axis of the chart.
     * @param {Axis} yAxis - The y-axis of the chart.
     * @param {boolean} isInverted - Specifies whether the chart is inverted.
     * @param {boolean} pointAnimate - Specifies whether the chart is inverted.
     * @param {boolean} pointUpdate - Specifies whether the chart is inverted.
     * @returns {void}
     * @private
     */
    render(series: Series, xAxis: Axis, yAxis: Axis, isInverted: boolean, pointAnimate?: boolean, pointUpdate?: boolean): void;
    /**
     * To find the direct of spline using points.
     *
     * @param {ControlPoints} data data
     * @param {Points} firstPoint firstPoint
     * @param {Points} point point
     * @param {Axis} xAxis xAxis
     * @param {Axis} yAxis yAxis
     * @param {boolean} isInverted isInverted
     * @param {Series} series series
     * @param {string} startPoint startPoint
     * @param {Function} getCoordinate getCoordinate
     * @param {string} direction direction
     * @returns {string} - Returns the direct of spline using points.
     * @private
     */
    private getSplineDirection;
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
