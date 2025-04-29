import { Chart } from '../chart';
import { TechnicalIndicator } from './technical-indicator';
import { TechnicalAnalysis } from './indicator-base';
/**
 * The `MacdIndicator` module is used to render the Moving Average Convergence Divergence indicator.
 */
export declare class MacdIndicator extends TechnicalAnalysis {
    /**
     * Defines the collection of series to represent the MACD indicator
     *
     * @private
     * @param {TechnicalIndicator} indicator - The technical indicator for which the series collection is initialized.
     * @param {Chart} chart - The chart associated with the technical indicator.
     * @returns {void}
     */
    initSeriesCollection(indicator: TechnicalIndicator, chart: Chart): void;
    /**
     * Defines the predictions using MACD approach.
     *
     * @private
     * @param {TechnicalIndicator} indicator - The technical indicator for which the data source is to be initialized.
     * @returns {void}
     */
    initDataSource(indicator: TechnicalIndicator): void;
    /**
     * Calculates Exponential Moving Average (EMA) values for the given period and valid data points.
     *
     * @private
     * @param {number} period - The period for which EMA values are to be calculated.
     * @param {Points[]} validData - The valid data points used for calculating EMA.
     * @param {string} field - The field of the data points to be used for EMA calculation.
     * @returns {number[]} - An array containing the calculated EMA values.
     */
    private calculateEMAValues;
    /**
     * Calculates Moving Average Convergence Divergence (MACD) points based on the provided MACD values,
     * valid data points, and series information.
     *
     * @private
     * @param {TechnicalIndicator} indicator - The MACD indicator.
     * @param {number[]} macdPoints - The array of MACD values.
     * @param {Points[]} validData - The valid data points used for calculating MACD.
     * @param {Series} series - The series information.
     * @returns {Points[]} - An array containing the calculated MACD points.
     */
    private getMACDPoints;
    /**
     * Calculates the signal line points for the Moving Average Convergence Divergence (MACD) indicator
     * based on the provided signal EMA values, valid data points, and series information.
     *
     * @private
     * @param {TechnicalIndicator} indicator - The MACD indicator.
     * @param {number[]} signalEma - The array of signal EMA values.
     * @param {Points[]} validData - The valid data points used for calculating MACD.
     * @param {Series} series - The series information.
     * @returns {Points[]} - An array containing the calculated signal line points.
     */
    private getSignalPoints;
    /**
     * Calculates the Moving Average Convergence Divergence (MACD) values based on the provided short EMA
     * and long EMA values for the MACD indicator.
     *
     * @private
     * @param {TechnicalIndicator} indicator - The MACD indicator.
     * @param {number[]} shortEma - The array of short EMA values.
     * @param {number[]} longEma - The array of long EMA values.
     * @returns {number[]} - An array containing the calculated MACD values.
     */
    private getMACDVales;
    /**
     * Calculates the histogram points for the MACD indicator based on the provided MACD values and signal EMA values.
     *
     * @private
     * @param {TechnicalIndicator} indicator - The MACD indicator.
     * @param {number[]} macdPoints - The array of MACD values.
     * @param {number[]} signalEma - The array of signal EMA values.
     * @param {Points[]} validData - The array of valid data points.
     * @param {Series} series - The series associated with the MACD indicator.
     * @returns {Points[]} - An array containing the calculated histogram points.
     */
    private getHistogramPoints;
    /**
     * To destroy the MACD Indicator.
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
