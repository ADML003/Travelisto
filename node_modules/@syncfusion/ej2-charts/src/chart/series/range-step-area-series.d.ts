import { PathOption } from '@syncfusion/ej2-svg-base';
import { Series, Points } from './chart-series';
import { LineBase } from './line-base';
import { Axis } from '../../chart/axis/axis';
/**
 * The `RangeStepAreaSeries` module is used to render the range step area series.
 */
export declare class RangeStepAreaSeries extends LineBase {
    private borderDirection;
    private prevPoint;
    /**
     * Renders the Range Step Area series on the chart.
     *
     * @param {Series} series - The series to be rendered.
     * @param {Axis} xAxis - The x-axis associated with the series.
     * @param {Axis} yAxis - The y-axis associated with the series.
     * @param {boolean} isInverted - Specifies whether the series is inverted.
     * @param {boolean} pointAnimate - Specifies whether to animate the series point.
     * @param {boolean} pointUpdate - Specifies whether to update the previous point.
     * @returns {void}
     * @private
     */
    render(series: Series, xAxis: Axis, yAxis: Axis, isInverted: boolean, pointAnimate: boolean, pointUpdate?: boolean): void;
    /**
     * Calculating path direction for rendering the low points.
     *
     * @param {Points[]} visiblePoints - The visible data points.
     * @param {Points} point - The current data point.
     * @param {Series} series - The series to which the data point belongs.
     * @param {string} direction - The direction of the series.
     * @param {number} i - The index of the current data point.
     * @param {Axis} xAxis - The x-axis associated with the series.
     * @param {Axis} yAxis - The y-axis associated with the series.
     * @param {boolean} isInverted - Specifies whether the series is inverted.
     * @returns {string} - Returns the path direction for low direction.
     * @private
     */
    protected closeRangeStepAreaPath(visiblePoints: Points[], point: Points, series: Series, direction: string, i: number, xAxis: Axis, yAxis: Axis, isInverted: boolean): string;
    /**
     * To animate point for range step area series.
     *
     * @param {Series} series - Specifies the series.
     * @param {number} point - Specifies the point.
     * @returns {void}
     * @private
     */
    updateDirection(series: Series, point: number[]): void;
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
     * To destroy the range step area series.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
