import { Series } from './chart-series';
import { LineBase } from './line-base';
import { Axis } from '../../chart/axis/axis';
/**
 * The `LineSeries` module is used to render the line series.
 */
export declare class LineSeries extends LineBase {
    /**
     * Renders the line series based on the provided axis and inversion status.
     *
     * @param {Series} series - The series to render.
     * @param {Axis} xAxis - The X-axis associated with the series.
     * @param {Axis} yAxis - The Y-axis associated with the series.
     * @param {boolean} isInverted - Specifies whether the chart is inverted.
     * @param {boolean} pointAnimate - Specifies whether the point has to be animated or not.
     * @param {boolean} pointUpdate - Specifies whether the point has to be updated or not.
     * @returns {void}
     * @private
     */
    render(series: Series, xAxis: Axis, yAxis: Axis, isInverted: boolean, pointAnimate?: boolean, pointUpdate?: boolean): void;
    /**
     * To animate point for line series.
     *
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
