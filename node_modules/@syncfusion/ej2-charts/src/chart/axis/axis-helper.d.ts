import { Double } from '../axis/double-axis';
import { Axis } from '../../chart/index';
import { Size } from '@syncfusion/ej2-svg-base';
/**
 * Common axis classes
 *
 * @private
 */
export declare class NiceInterval extends Double {
    /**
     * Method to calculate numeric datetime interval.
     *
     * @param {Axis} axis - The axis for which to calculate the interval.
     * @param {Size} size - The size of the axis.
     * @param {number} start - The start value of the axis.
     * @param {number} end - The end value of the axis.
     * @param {boolean} [isChart=true] - Indicating whether it's a chart. Defaults to true.
     * @returns {number} - The calculated numeric datetime interval.
     */
    calculateDateTimeNiceInterval(axis: Axis, size: Size, start: number, end: number, isChart?: boolean): number;
    /**
     * To get the skeleton for the DateTime axis.
     *
     * @param {Axis} axis - The DateTime axis for which to get the skeleton.
     * @param {number} currentValue - The current value.
     * @param {number} previousValue - The previous value.
     * @param {boolean} isBlazor - Indicates whether it's for Blazor.
     * @returns {string} - The skeleton for the DateTime axis.
     * @private
     */
    getSkeleton(axis: Axis, currentValue: number, previousValue: number, isBlazor?: boolean): string;
    /**
     * Find label format for axis
     *
     * @param {Axis} axis - axis
     * @returns {string} - Returns the label format.
     * @private
     */
    findCustomFormats(axis: Axis): string;
}
