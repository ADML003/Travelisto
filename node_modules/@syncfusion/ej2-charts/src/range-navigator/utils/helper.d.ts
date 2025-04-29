import { VisibleRangeModel } from '../../common/model/interface';
/**
 * Method for calculating coefficient.
 *
 * @private
 * @param {number} value - The value to calculate the coefficient.
 * @param {VisibleRangeModel} range - The visible range model.
 * @param {boolean} inversed - Indicates whether the range is inversed.
 * @returns {number} - The calculated coefficient.
 */
export declare function rangeValueToCoefficient(value: number, range: VisibleRangeModel, inversed: boolean): number;
/**
 * Calculates the coefficient for the x-location.
 *
 * @private
 * @param {number} x - The value to calculate the coefficient.
 * @param {VisibleRangeModel} range - The visible range model.
 * @param {number} size - The size for calculate the coefficient.
 * @param {boolean} inversed - Indicates whether the range is inversed.
 * @returns {number} - The calculated coefficient.
 */
export declare function getXLocation(x: number, range: VisibleRangeModel, size: number, inversed: boolean): number;
/**
 * Method for calculating range value by x point.
 *
 * @private
 * @param {number} value - The value for which to calculate the range value.
 * @param {number} size - The size used for calculating the coefficient.
 * @param {VisibleRangeModel} range - The visible range model.
 * @param {boolean} inversed - Indicates whether the range is inversed.
 * @returns {number} - The calculated range value.
 */
export declare function getRangeValueXByPoint(value: number, size: number, range: VisibleRangeModel, inversed: boolean): number;
/**
 * Method for calculating the exact data.
 *
 * @private
 * @param {DataPoint[]} points - The array of data points.
 * @param {number} start - The start value of the range.
 * @param {number} end - The end value of the range.
 * @returns {DataPoint[]} - The calculated data points within the range.
 */
export declare function getExactData(points: DataPoint[], start: number, end: number): DataPoint[];
/**
 * Methods for calculating the nearest value.
 *
 * @private
 * @param {number[]} values - The array of values.
 * @param {number} point - The point for which to find the nearest value.
 * @returns {number} - The nearest value.
 */
export declare function getNearestValue(values: number[], point: number): number;
/**
 * Data point
 *
 * @public
 */
export declare class DataPoint {
    /** point x. */
    x: Object;
    /** point y. */
    y: Object;
    /** point x value. */
    xValue?: number;
    /** point y value. */
    yValue?: number;
    /** point visibility. */
    visible?: boolean;
    constructor(x: Object, y: Object, xValue?: number, yValue?: number, visible?: boolean);
}
