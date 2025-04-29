import { Axis } from '../axis/axis';
import { Category } from '../axis/category-axis';
import { Size } from '@syncfusion/ej2-svg-base';
import { Chart } from '../chart';
import { RangeIntervalType } from '../../common/utils/enum';
/**
 * The `DateTimeCategory` module is used to render the datetime category axis in charts.
 *
 * @private
 */
export declare class DateTimeCategory extends Category {
    private axisSize;
    /**
     * Constructor for the category module.
     *
     * @private
     * @param {Chart} chart - Specifies the chart.
     */
    constructor(chart: Chart);
    /**
     * The function to calculate the range and labels for the axis.
     *
     * @returns {void}
     * @private
     */
    calculateRangeAndInterval(size: Size, axis: Axis): void;
    /**
     * Calculate label for the axis.
     *
     * @private
     */
    calculateVisibleLabels(axis: Axis): void;
    /**
     * Calculate the Blazor custom format for axis.
     *
     * @param {Axis} axis - The axis for which the custom format is calculated.
     * @returns {string} - The custom format string.
     * @private
     */
    private blazorCustomFormat;
    /**
     * To get the Indexed axis label text with axis format for DateTimeCategory axis.
     *
     * @param {string} value value
     * @param {Function} format format
     * @returns {string} Indexed axis label text
     * @private
     */
    getIndexedAxisLabel(value: string, format: Function): string;
    /**
     * Get the same interval.
     *
     * @param {number} currentDate - The current date.
     * @param {number} previousDate - The previous date.
     * @param {RangeIntervalType} type - The type of range interval.
     * @param {number} index - The index of the interval.
     * @returns {boolean} - Indicates if the intervals are the same.
     * @private
     */
    sameInterval(currentDate: number, previousDate: number, type: RangeIntervalType, index: number): boolean;
    /**
     * To check whether the current label comes in the same week as the previous label week.
     *
     * @param {number} currentDate - The current date.
     * @param {number} previousDate - The previous date.
     * @param {Axis} axis - The axis.
     * @param {number} index - The current index.
     * @param {number} previousIndex - The previous index.
     * @returns {boolean} - Indicates if the labels fall in the same week.
     */
    private StartOfWeek;
    /**
     * To check whether the distance between labels is above the axisLabel maximum length.
     *
     * @param {number} index - The current index.
     * @param {number} previousIndex - The previous index.
     * @param {Axis} axis - The axis.
     * @returns {boolean} - Indicates if the distance between labels exceeds the maximum length.
     * @private
     */
    isMaximum(index: number, previousIndex: number, axis: Axis): boolean;
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the category axis.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
