/**
 * Numeric Range.
 *
 * @private
 */
var DoubleRange = /** @class */ (function () {
    function DoubleRange(start, end) {
        if (start < end) {
            this.mStart = start;
            this.mEnd = end;
        }
        else {
            this.mStart = end;
            this.mEnd = start;
        }
    }
    Object.defineProperty(DoubleRange.prototype, "start", {
        /**
         * The start value.
         *
         * @private
         * @returns {number} - The start value.
         */
        get: function () {
            return this.mStart;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DoubleRange.prototype, "end", {
        /**
         * The end value.
         *
         * @private
         * @returns {number} - The end value.
         */
        get: function () {
            return this.mEnd;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DoubleRange.prototype, "delta", {
        /**
         * The delta between the start and end values.
         *
         * @private
         * @returns {number} - The delta value.
         */
        get: function () {
            return (this.mEnd - this.mStart);
        },
        enumerable: true,
        configurable: true
    });
    return DoubleRange;
}());
export { DoubleRange };
