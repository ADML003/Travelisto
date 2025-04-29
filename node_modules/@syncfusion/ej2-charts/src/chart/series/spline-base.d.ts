import { ControlPoints } from '../../common/utils/helper';
import { Chart } from '../chart';
import { Series, Points } from './chart-series';
import { LineBase } from './line-base';
/**
 * Base class for spline-type series.
 *
 * @private
 */
export declare class SplineBase extends LineBase {
    private splinePoints;
    private lowSplinePoints;
    /**
     * Initializes the spline rendering module.
     *
     * @param {Chart} [chartModule] - Specifies the chart instance.
     */
    constructor(chartModule?: Chart);
    /**
     * Finds the spline points for the series.
     *
     * @param {Series} series - The series for which spline points need to be found.
     * @returns {void}
     * @private
     */
    findSplinePoint(series: Series): void;
    protected getPreviousIndex(points: Points[], i: number, series: Series): number;
    getNextIndex(points: Points[], i: number, series: Series): number;
    filterEmptyPoints(series: Series, seriesPoints?: Points[]): Points[];
    /**
     * Checks if the data points are within the range.
     *
     * @param {Points[]} points - The data points to check.
     * @returns {boolean} True if the data points are within the range, false otherwise.
     * @private
     */
    isPointInRange(points: Points[]): boolean;
    /**
     * Finds the spline coefficients based on the type of spline interpolation.
     *
     * @param {Points[]} points - The data points for spline interpolation.
     * @param {Series} series - The series associated with the data points.
     * @param {boolean} [isLow] - Indicates whether to calculate the lower bound. Default is false.
     * @returns {number[]} The calculated coefficients.
     * @private
     */
    findSplineCoefficients(points: Points[], series: Series, isLow?: boolean): number[];
    /**
     * Calculates the coefficients for a monotonic spline interpolation.
     *
     * @param {Points[]} points - The data points for spline interpolation.
     * @param {Series} series - The series associated with the data points.
     * @param {boolean} isLow - Indicates whether to calculate the lower bound.
     * @returns {number[]} The calculated coefficients.
     * @private
     */
    private monotonicSplineCoefficients;
    /**
     * Calculates the coefficients for a cardinal spline interpolation.
     *
     * @param {Points[]} points - The data points for spline interpolation.
     * @param {Series} series - The series associated with the data points.
     * @returns {number[]} The calculated coefficients.
     * @private
     */
    private cardinalSplineCofficients;
    /**
     * Calculates the coefficients for a clamped spline interpolation.
     *
     * @param {Points[]} points - The data points for spline interpolation.
     * @param {Series} series - The series associated with the data points.
     * @param {boolean} isLow - Indicates whether to calculate the lower bound.
     * @returns {number[]} The calculated coefficients.
     * @private
     */
    private clampedSplineCofficients;
    /**
     * Calculates the coefficients for a natural spline interpolation.
     *
     * @param {Points[]} points - The data points for spline interpolation.
     * @param {Series} series - The series associated with the data points.
     * @param {boolean} isLow - Indicates whether to calculate the lower bound.
     * @returns {number[]} The calculated coefficients.
     * @private
     */
    private naturalSplineCoefficients;
    /**
     * Calculates the control points for a spline segment.
     *
     * @param {Points} point1 - The first data point.
     * @param {Points} point2 - The second data point.
     * @param {number} ySpline1 - The Y-value of the first spline point.
     * @param {number} ySpline2 - The Y-value of the second spline point.
     * @param {Series} series - The series associated with the data points.
     * @returns {ControlPoints} The calculated control points.
     * @private
     */
    getControlPoints(point1: Points, point2: Points, ySpline1: number, ySpline2: number, series: Series): ControlPoints;
    /**
     * Calculates the date-time interval.
     *
     * @param {Series} series - The series for which the date-time interval needs to be calculated.
     * @returns {number} The calculated date-time interval.
     * @protected
     */
    protected dateTimeInterval(series: Series): number;
    /**
     * Animates the series.
     *
     * @param  {Series} series - Defines the series to animate.
     * @returns {void}
     * @private
     */
    doAnimation(series: Series): void;
}
