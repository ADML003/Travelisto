/**
 * Numeric Range.
 *
 * @private
 */
export declare class DoubleRange {
    private mStart;
    private mEnd;
    /**
     * The start value.
     *
     * @private
     * @returns {number} - The start value.
     */
    readonly start: number;
    /**
     * The end value.
     *
     * @private
     * @returns {number} - The end value.
     */
    readonly end: number;
    /**
     * The delta between the start and end values.
     *
     * @private
     * @returns {number} - The delta value.
     */
    readonly delta: number;
    constructor(start: number, end: number);
}
