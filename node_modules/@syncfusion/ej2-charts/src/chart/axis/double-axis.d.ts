import { Axis } from '../axis/axis';
import { Size } from '@syncfusion/ej2-svg-base';
import { Chart } from '../chart';
import { RangeNavigator } from '../../range-navigator';
/**
 * The `Double` module is used to render the numeric axis in charts.
 */
export declare class Double {
    /** @private */
    chart: Chart;
    /** @private */
    min: Object;
    /** @private */
    max: Object;
    private isDrag;
    private interval;
    private paddingInterval;
    private isColumn;
    private isStacking;
    /**
     * Constructor for the dateTime module.
     *
     * @private
     * @param {Chart} chart - Specifies the chart.
     */
    constructor(chart?: Chart);
    /**
     * Numeric Nice Interval for the axis.
     *
     * @private
     * @param {Axis} axis - The axis.
     * @param {number} delta - The delta value.
     * @param {Size} size - The size.
     * @returns {number} - The calculated nice interval.
     */
    protected calculateNumericNiceInterval(axis: Axis, delta: number, size: Size): number;
    /**
     * Determines whether auto interval is enabled on both axes.
     *
     * @private
     * @param {Axis} axis - The axis.
     * @returns {boolean} - The boolean value indicating if auto interval is enabled on both axes.
     */
    isAutoIntervalOnBothAxis(axis: Axis): boolean;
    getActualRange(axis: Axis, size: Size): void;
    /**
     * Range for the axis.
     *
     * @private
     * @param {Axis} axis - The axis.
     * @returns {void}
     */
    initializeDoubleRange(axis: Axis): void;
    /**
     * The function to calculate the range and labels for the axis.
     *
     * @returns {void}
     * @private
     */
    calculateRangeAndInterval(size: Size, axis: Axis): void;
    /**
     * Calculate Range for the axis.
     *
     * @private
     */
    protected calculateRange(axis: Axis): void;
    private yAxisRange;
    private findMinMax;
    /**
     * Apply padding for the range.
     *
     * @private
     * @param {Axis} axis - The axis for which padding is applied.
     * @param {Size} size - The size used for padding calculation.
     * @returns {void}
     */
    applyRangePadding(axis: Axis, size: Size): void;
    updateActualRange(axis: Axis, minimum: number, maximum: number, interval: number): void;
    private findAdditional;
    private findNormal;
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
     * Calculate label for the axis.
     *
     * @private
     */
    calculateVisibleLabels(axis: Axis, chart: Chart | RangeNavigator): void;
    /**
     * Format of the axis label.
     *
     * @private
     */
    protected getFormat(axis: Axis): string;
    /**
     * Formatted the axis label.
     *
     * @private
     */
    formatValue(axis: Axis, isCustom: boolean, format: string, tempInterval: number): string;
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the double axis.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
