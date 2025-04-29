import { Series, Points } from './chart-series';
import { Axis } from '../../chart/axis/axis';
/**
 * The `BubbleSeries` module is used to render the bubble series.
 */
export declare class BubbleSeries {
    /**
     * Render the Bubble series.
     *
     * @param {Series} series - The series to be rendered.
     * @param {Axis} xAxis - The X-axis associated with the series.
     * @param {Axis} yAxis - The Y-axis associated with the series.
     * @param {boolean} isInverted - Indicates whether the chart is inverted or not.
     * @returns {void}
     * @private
     */
    render(series: Series, xAxis: Axis, yAxis: Axis, isInverted: boolean): void;
    renderPoint(series: Series, bubblePoint: Points, isInverted: boolean, radius: number, maximumSize: number, minRadius: number, visiblePoints: Points[], pointUpdate?: boolean): void;
    updateDirection(series: Series, point: number[], isInverted: boolean): void;
    /**
     * To destroy the Bubble.
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
     * Animates the series.
     *
     * @param  {Series} series - Defines the series to animate.
     * @returns {void}
     * @private
     */
    doAnimation(series: Series): void;
}
