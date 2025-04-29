/**
 * The `DoubleRange` class represents a numeric range with minimum and maximum values.
 *
 * @private
 */
var DoubleRange = /** @class */ (function () {
    function DoubleRange(start, end) {
        /*
          if (!isNaN(start) && !isNaN(end)) {
           this.mIsEmpty = true;
          } else {
              this.mIsEmpty = false;
          }*/
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
        //private mIsEmpty: boolean;
        /**
         * Gets the start value.
         *
         * @returns {number} - The start value.
         * @private
         */
        get: function () {
            return this.mStart;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DoubleRange.prototype, "end", {
        /**
         * Gets the end value.
         *
         * @returns {number} - The end value.
         * @private
         */
        get: function () {
            return this.mEnd;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DoubleRange.prototype, "delta", {
        /*
          get isEmpty(): boolean {
             return this.mIsEmpty;
         }*/
        /**
         * Gets the delta value.
         *
         * @returns {number} - The delta value.
         * @private
         */
        get: function () {
            return (this.mEnd - this.mStart);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DoubleRange.prototype, "median", {
        /**
         * Gets the median value.
         *
         * @returns {number} - The median value.
         * @private
         */
        get: function () {
            return this.mStart + (this.mEnd - this.mStart) / 2;
        },
        enumerable: true,
        configurable: true
    });
    return DoubleRange;
}());
export { DoubleRange };
