import { Series } from './chart-series';
import { ColumnBase } from './column-base';
/**
 * The `WaterfallSeries` module is used to render the waterfall series.
 */
export declare class WaterfallSeries extends ColumnBase {
    /**
     * Store the cumulative values of each index.
     *
     * @private
     */
    cumulativeSums: number[];
    /**
     * Render waterfall series.
     *
     * @returns {void}
     * @private
     */
    render(series: Series): void;
    /**
     * Updates the direction of rendering for the specified series.
     *
     * @param {Series} series - The series to be rendered.
     * @param {number} point - Specifies the point.
     * @returns {void}
     * @private
     */
    updateDirection(series: Series, point: number[]): void;
    /**
     * Checks whether the current point in the series is an intermediate sum.
     *
     * @param {Series} series - The series to check.
     * @param {number} index - The index of the point in the series.
     * @returns {boolean} - Returns true if the current point is an intermediate sum, otherwise false.
     */
    private isIntermediateSum;
    /**
     * Checks whether the current point in the series is a sum index.
     *
     * @param {Series} series - The series to check.
     * @param {number} index - The index of the point in the series.
     * @returns {boolean} - Returns true if the current point is a sum index, otherwise false.
     */
    private isSumIndex;
    /**
     * Triggers the point render event for a given series and point.
     *
     * @param {Series} series - The series to which the point belongs.
     * @param {Points} point - The point for which to trigger the event.
     * @returns {IPointRenderEventArgs} - The event arguments for the point render event.
     */
    private triggerPointRenderEvent;
    /**
     * Processes the internal data for a series.
     *
     * @param {Object[]} json - The internal data JSON array.
     * @param {Series} series - The series for which to process the data.
     * @returns {Object[]} - The processed internal data array.
     * @private
     */
    processInternalData(json: Object[], series: Series): Object[];
    /**
     * Animates the series.
     *
     * @param  {Series} series - Defines the series to animate.
     * @returns {void}
     * @private
     */
    doAnimation(series: Series): void;
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the waterfall series.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
