import { Series } from './chart-series';
import { PolarSeries } from '../series/polar-series';
import { Axis } from '../axis/axis';
/**
 * The `RadarSeries` module is used to render the radar series.
 */
export declare class RadarSeries extends PolarSeries {
    /**
     * Renders the provided radar series on the chart based on the given x-axis, y-axis, and inversion status.
     *
     * @param {Series} series - The series to render.
     * @param {Axis} xAxis - The x-axis of the chart.
     * @param {Axis} yAxis - The y-axis of the chart.
     * @param {boolean} inverted - A flag indicating whether the chart is inverted or not.
     * @returns {void}
     * @private
     */
    render(series: Series, xAxis: Axis, yAxis: Axis, inverted: boolean): void;
    getRadarIsInversedPath(xAxis: Axis, endPoint: string): string;
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the radar series.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
