import { TechnicalIndicator } from './technical-indicator';
import { TechnicalAnalysis } from './indicator-base';
import { Chart } from '../chart';
/**
 * The `StochasticIndicator` module is used to render the Stochastic indicator.
 */
export declare class StochasticIndicator extends TechnicalAnalysis {
    /**
     * Defines the collection of series that represents the stochastic indicator.
     *
     * @private
     * @param {TechnicalIndicator} indicator - The technical indicator for which the series collection is initialized.
     * @param {Chart} chart - The chart associated with the technical indicator.
     * @returns {void}
     */
    initSeriesCollection(indicator: TechnicalIndicator, chart: Chart): void;
    /**
     * Defines the predictions based on stochastic approach.
     *
     * @private
     * @param {TechnicalIndicator} indicator - The technical indicator for which the data source is to be initialized.
     * @returns {void}
     */
    initDataSource(indicator: TechnicalIndicator): void;
    /**
     * Calculates the Simple Moving Average (SMA) for the given period.
     *
     * @private
     * @param {number} period - The period for the SMA calculation.
     * @param {number} kPeriod - The 'k' period used in the calculation.
     * @param {Points[]} data - The array of data points.
     * @param {Series} sourceSeries - The series associated with the data.
     * @returns {Points[]} - An array containing the calculated SMA points.
     */
    private smaCalculation;
    /**
     * Calculates the period for the indicator.
     *
     * @private
     * @param {number} period - The period for the calculation.
     * @param {number} kPeriod - The 'k' period used in the calculation.
     * @param {Points[]} data - The array of data points.
     * @param {Series} series - The series associated with the data.
     * @returns {Points[]} - An array containing the calculated points for the period.
     */
    private calculatePeriod;
    /**
     * To destroy the Stocastic Indicator.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    protected getModuleName(): string;
}
