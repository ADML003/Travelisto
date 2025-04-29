import { Axis } from '../axis/axis';
import { Size } from '@syncfusion/ej2-svg-base';
import { Chart } from '../chart';
import { NiceInterval } from '../axis/axis-helper';
import { RangeNavigator } from '../../range-navigator/index';
/**
 * The `DateTime` module is used to render the datetime axis in charts.
 *
 * @private
 */
export declare class DateTime extends NiceInterval {
    min: number;
    max: number;
    startValue: number;
    /**
     * Constructor for the dateTime module.
     *
     * @private
     * @param {Chart} chart - Specifies the chart.
     */
    constructor(chart?: Chart);
    /**
     * The function to calculate the range and labels for the axis.
     *
     * @returns {void}
     * @private
     */
    calculateRangeAndInterval(size: Size, axis: Axis): void;
    /**
     * Actual Range for the axis.
     *
     * @private
     * @param {Axis} axis - The axis for which the actual range is calculated.
     * @param {Size} size - The size used for calculation.
     * @returns {void}
     */
    getActualRange(axis: Axis, size: Size): void;
    /**
     * Apply padding for the range.
     *
     * @private
     * @param {Axis} axis - The axis for which padding is applied.
     * @param {Size} size - The size used for padding calculation.
     * @returns {void}
     */
    applyRangePadding(axis: Axis, size: Size): void;
    private getYear;
    private getMonth;
    private getDay;
    private getHour;
    /**
     * Calculate visible range for axis.
     *
     * @private
     * @param {Size} size - The size used for calculation.
     * @param {Axis} axis - The axis for which the visible range is calculated.
     * @returns {void}
     */
    protected calculateVisibleRange(size: Size, axis: Axis): void;
    /**
     * Calculate visible labels for the axis.
     *
     * @param {Axis} axis axis
     * @param {Chart | RangeNavigator} chart chart
     * @returns {void}
     * @private
     */
    calculateVisibleLabels(axis: Axis, chart: Chart | RangeNavigator): void;
    /**
     * Calculate the Blazor custom format for axis.
     *
     * @param {Axis} axis - The axis for which the custom format is calculated.
     * @returns {string} - The custom format string.
     * @private
     */
    private blazorCustomFormat;
    /**
     * Increase the date-time interval.
     *
     * @param {Axis} axis - The axis for which the interval is increased.
     * @param {number} value - The value of the interval.
     * @param {number} interval - The interval to increase.
     * @returns {Date} - The increased date-time interval.
     * @private
     */
    increaseDateTimeInterval(axis: Axis, value: number, interval: number): Date;
    private alignRangeStart;
    private getDecimalInterval;
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
