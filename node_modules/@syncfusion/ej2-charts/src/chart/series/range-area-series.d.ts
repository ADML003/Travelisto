import { PathOption } from '@syncfusion/ej2-svg-base';
import { Series, Points } from './chart-series';
import { LineBase } from './line-base';
import { Axis } from '../axis/axis';
/**
 * The `RangeAreaSeries` module is used to render the range area series.
 */
export declare class RangeAreaSeries extends LineBase {
    borderDirection: string;
    /**
     * Renders the provided Range Area series on the chart based on the given x-axis, y-axis, and inversion status.
     *
     * @param {Series} series - The series to render.
     * @param {Axis} xAxis - The x-axis of the chart.
     * @param {Axis} yAxis - The y-axis of the chart.
     * @param {boolean} inverted - A flag indicating whether the chart is inverted or not.
     * @param {boolean} pointAnimate - A flag indicating whether the points should be animated.
     * @param {boolean} pointUpdate - A flag indicating whether the points should be updated.
     * @returns {void}
     * @private
     */
    render(series: Series, xAxis: Axis, yAxis: Axis, inverted: boolean, pointAnimate: boolean, pointUpdate?: boolean): void;
    /**
     * path for rendering the low points
     *
     * @returns {void}.
     * @private
     */
    protected closeRangeAreaPath(visiblePoints: Points[], point: Points, series: Series, direction: string, i: number): string;
    /**
     * To animate point for range area series.
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
     * To destroy the line series.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
