/**
 * Defines the behavior of a pyramid series
 */
import { AccPoints, AccumulationSeries } from '../model/acc-base';
import { TriangularBase } from './triangular-base';
/**
 * The `PyramidSeries` module is used to render the `Pyramid` series.
 */
export declare class PyramidSeries extends TriangularBase {
    /**
     * Defines the path of a pyramid segment.
     *
     * @param {AccPoints} point - The points to initialize the segment size.
     * @param {AccumulationSeries} series - The series for which to define the path.
     * @param {AccumulationChart} chart - The accumulation chart control.
     * @returns {string} - The path of the pyramid segment.
     */
    private getSegmentData;
    /**
     * Initializes the size of the pyramid segments.
     *
     * @private
     * @param {AccPoints[]} points - The points to initialize the segment size.
     * @param {AccumulationSeries} series - The series for which to initialize properties.
     * @returns {void}
     */
    protected initializeSizeRatio(points: AccPoints[], series: AccumulationSeries): void;
    /**
     * Defines the size of the pyramid segments, the surface of that will reflect the values.
     *
     * @param {AccumulationSeries} series - The series for which to initialize properties.
     * @returns {void}
     */
    private calculateSurfaceSegments;
    /**
     * Finds the height of pyramid segment.
     *
     * @param {number} y - The y-coordinate of the segment's point.
     * @param {number} surface - The surface area of the segment that reflects the values.
     * @returns {number} - The height of the pyramid segment.
     */
    private getSurfaceHeight;
    /**
     * Solves quadratic equation.
     *
     * @param {number} a - Coefficient.
     * @param {number} b - Coefficient.
     * @param {number} c - Coefficient.
     * @returns {number} - The height of the pyramid segment.
     */
    private solveQuadraticEquation;
    /**
     * Renders a pyramid segment.
     *
     * @param {AccPoints} point - The point data.
     * @param {AccumulationSeries} series - The series of the chart.
     * @param {AccumulationChart} chart - The accumulation chart control.
     * @param {PathOption} options - The rendering options for the segment.
     * @param {Element} seriesGroup - The group element to contain the segment.
     * @param {boolean} redraw - Specifies whether to redraw the segment.
     * @param {string} previousRadius - Specifies the previous radius of the pie when animating the individual series point.
     * @param {Object[]} previousCenter - Specifies the previous center of the pie when animating the individual series point.
     * @param {boolean} pointAnimation - Specifies whether the point based animation is enabled.
     * @returns {void}
     */
    private renderPoint;
    /**
     * To get the module name of the Pyramid series.
     *
     * @returns {string} - Returns the module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the pyramid series.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
