/**
 * Defines the behavior of a funnel series
 */
import { AccPoints, AccumulationSeries } from '../model/acc-base';
import { PathOption } from '@syncfusion/ej2-svg-base';
import { ChartLocation } from '../../common/utils/helper';
import { AccumulationChart } from '../accumulation';
import { TriangularBase } from './triangular-base';
/**
 * The `FunnelSeries` module is used to render the `Funnel` Series.
 */
export declare class FunnelSeries extends TriangularBase {
    /**
     * Defines the path of a funnel segment
     *
     * @private
     * @param {AccPoints} point - The point data.
     * @param {AccumulationSeries} series - The series for which the segment is rendered.
     * @param {AccumulationChart} chart - The accumulation chart control.
     * @returns {string} - Get segment data.
     */
    private getSegmentData;
    /**
     * Renders a funnel segment.
     *
     * @private
     * @param {AccPoints} point - The point data.
     * @param {AccumulationSeries} series - The series for which the segment is rendered.
     * @param {AccumulationChart} chart - The accumulation chart control.
     * @param {PathOption} options - The rendering options for the segment.
     * @param {Element} seriesGroup - The group element to contain the funnel segments.
     * @param {boolean} redraw - Specifies whether to redraw the segment.
     * @param {string} previousRadius - Specifies the previous radius of the pie when animating the individual series point.
     * @param {Object[]} previousCenter - Specifies the previous center of the pie when animating the individual series point.
     * @param {boolean} pointAnimation - Specifies whether the point based animation is enabled.
     * @returns {void}
     */
    renderPoint(point: AccPoints, series: AccumulationSeries, chart: AccumulationChart, options: PathOption, seriesGroup: Element, redraw: boolean, previousRadius?: number, previousCenter?: ChartLocation, pointAnimation?: boolean): void;
    /**
     * Renders the Trapezoidal funnel series in an accumulation chart.
     *
     * @param {AccumulationSeries} series - The series data for the Trapezoidal  funnel.
     * @param {AccPoints[]} points - The data points for the series.
     * @param {AccumulationChart} chart - The instance of the accumulation chart.
     * @param {PathOption[]} options - The path options for rendering the Trapezoidal funnel.
     * @param {Element} seriesGroup - The group element for the series.
     * @param {boolean} redraw - Specifies whether to redraw the series.
     * @returns {void} - This method does not return a value.
     */
    renderTrapezoidalFunnel(series: AccumulationSeries, points: AccPoints[], chart: AccumulationChart, options: PathOption[], seriesGroup: Element, redraw: boolean): void;
    /**
     * Function to lighten a color by blending it with white.
     *
     * @param {string} color - The main color in hex format (e.g., '#1e90ff').
     * @returns {string} - The lightened color in hex format.
     */
    lightenColor(color: string): string;
    /**
     * To get the module name of the funnel series.
     *
     * @returns {string} - Get module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the funnel series.
     *
     * @returns {void} Destroy method.
     * @private
     */
    destroy(): void;
}
