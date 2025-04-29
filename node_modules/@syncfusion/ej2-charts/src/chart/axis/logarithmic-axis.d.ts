import { Axis } from '../axis/axis';
import { Double } from '../axis/double-axis';
import { Size } from '@syncfusion/ej2-svg-base';
import { Chart } from '../chart';
import { RangeNavigator } from '../../range-navigator';
/**
 * The `Logarithmic` module is used to render the logarithmic axis in charts.
 */
export declare class Logarithmic extends Double {
    /**
     * Constructor for the logerithmic module.
     *
     * @private
     * @param {Chart} chart - Specifies the chart.
     */
    constructor(chart: Chart);
    /**
     * The method to calculate the range and labels for the axis.
     *
     * @returns {void}
     * @private
     */
    calculateRangeAndInterval(size: Size, axis: Axis): void;
    /**
     * Calculates actual range for the axis.
     *
     * @private
     */
    getActualRange(axis: Axis, size: Size): void;
    /**
     * Calculates visible range for the axis.
     *
     * @private
     * @param {Size} size - The size used for calculation.
     * @param {Axis} axis - The axis for which the visible range is calculated.
     * @returns {void}
     */
    protected calculateVisibleRange(size: Size, axis: Axis): void;
    /**
     * Calculates log inteval for the axis.
     *
     * @private
     * @param {number} delta - The difference between the axis maximum and minimum values.
     * @param {Size} size - The size of the axis.
     * @param {Axis} axis - The axis.
     * @returns {number} - The calculated logarithmic interval.
     */
    protected calculateLogNiceInterval(delta: number, size: Size, axis: Axis): number;
    /**
     * Calculates labels for the axis.
     *
     * @private
     * @param {Axis} axis - The axis.
     * @param {Chart | RangeNavigator} chart - The chart or range navigator control.
     * @returns {void}
     */
    calculateVisibleLabels(axis: Axis, chart: Chart | RangeNavigator): void;
    /**
     * Get module name
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
