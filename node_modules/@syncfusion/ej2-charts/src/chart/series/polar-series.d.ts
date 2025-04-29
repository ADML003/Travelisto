import { Chart } from '../chart';
import { Series, Points } from './chart-series';
import { PolarRadarPanel } from '../axis/polar-radar-panel';
import { IPointRenderEventArgs } from '../../chart/model/chart-interface';
import { Axis } from '../axis/axis';
/**
 * The `PolarSeries` module is used to render the polar series.
 */
export declare class PolarSeries extends PolarRadarPanel {
    /**
     * Renders the provided polar series on the chart based on the given x-axis, y-axis, and inversion status.
     *
     * @param {Series} series - The series to render.
     * @param {Axis} xAxis - The x-axis of the chart.
     * @param {Axis} yAxis - The y-axis of the chart.
     * @param {boolean} inverted - A flag indicating whether the chart is inverted or not.
     * @returns {void}
     * @private
     */
    render(series: Series, xAxis: Axis, yAxis: Axis, inverted: boolean): void;
    /**
     * Renders the column draw type for the provided series based on the given x-axis and y-axis.
     *
     * @param {Series} series - The series for which the column draw type should be rendered.
     * @param {Axis} xAxis - The x-axis of the chart.
     * @param {Axis} yAxis - The y-axis of the chart.
     * @returns {void}
     * @private
     */
    columnDrawTypeRender(series: Series, xAxis: Axis, yAxis: Axis): void;
    /**
     * Triggers the point render event for the provided chart, series, and point.
     *
     * @param {Chart} chart - The chart instance.
     * @param {Series} series - The series to which the point belongs.
     * @param {Points} point - The point for which the event should be triggered.
     * @returns {IPointRenderEventArgs} - The point render event arguments.
     * @private
     */
    triggerEvent(chart: Chart, series: Series, point: Points): IPointRenderEventArgs;
    /**
     * Gets the position of the series.
     *
     * @param {Series} series - The series for which to get the position.
     * @returns {void}
     * @private
     */
    getSeriesPosition(series: Series): void;
    /**
     * Animates the series.
     *
     * @param  {Series} series - Defines the series to animate.
     * @returns {void}
     * @private
     */
    doAnimation(series: Series): void;
    /**
     * Performs animation for polar/radar series.
     *
     * @param {Element} animateElement - The element to animate.
     * @param {number} delay - The delay for animation.
     * @param {number} duration - The duration of animation.
     * @param {Series} series - The series for which to perform animation.
     * @returns {void}
     * @private
     */
    doPolarRadarAnimation(animateElement: Element, delay: number, duration: number, series: Series): void;
    getPolarIsInversedPath(xAxis: Axis, endPoint: string): string;
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the polar series.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
