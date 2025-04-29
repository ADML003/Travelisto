import { Series } from './chart-series';
import { ColumnSeries } from './column-series';
/**
 * The `HistogramSeries` module is used to render the histogram series.
 */
export declare class HistogramSeries extends ColumnSeries {
    /**
     * Render Histogram series.
     *
     * @param {Series} series - The series to render.
     * @returns {void}
     * @private
     */
    render(series: Series): void;
    /**
     * To calculate bin interval for Histogram series.
     *
     * @param {number[]} yValues - The y values of the series.
     * @param {Series} series - The series for which the bin interval is calculated.
     * @returns {void}
     * @private
     */
    private calculateBinInterval;
    /**
     * Processes the internal data for the series.
     *
     * @param {Object[]} data - The internal data to be processed.
     * @param {Series} series - The series for which the internal data is processed.
     * @returns {Object[]} - The processed internal data.
     * @private
     */
    processInternalData(data: Object[], series: Series): Object[];
    /**
     * Calculates the bin values for the series.
     *
     * @param {Series} series - The series for which the bin values are calculated.
     * @returns {void}
     * @private
     */
    calculateBinValues(series: Series): void;
    /**
     * Render Normal Distribution for Histogram series.
     *
     * @param {Series} series - The series for which the normal distribution is rendered.
     * @returns {void}
     * @private
     */
    private renderNormalDistribution;
    /**
     * Animates the series.
     *
     * @param  {Series} series - Defines the series to animate.
     * @returns {void}
     * @private
     */
    doAnimation(series: Series): void;
    /**
     * Updates the direction of rendering for the specified series.
     *
     * @param {Series} series - The series to be rendered.
     * @returns {void}
     * @private
     */
    updateDirection(series: Series): void;
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the histogram series.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
