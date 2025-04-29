/**
 * The `DoubleRange` class represents a numeric range with minimum and maximum values.
 *
 * @private
 */
export declare class DoubleRange {
    private mStart;
    private mEnd;
    /**
     * Gets the start value.
     *
     * @returns {number} - The start value.
     * @private
     */
    readonly start: number;
    /**
     * Gets the end value.
     *
     * @returns {number} - The end value.
     * @private
     */
    readonly end: number;
    /**
     * Gets the delta value.
     *
     * @returns {number} - The delta value.
     * @private
     */
    readonly delta: number;
    /**
     * Gets the median value.
     *
     * @returns {number} - The median value.
     * @private
     */
    readonly median: number;
    constructor(start: number, end: number);
}
