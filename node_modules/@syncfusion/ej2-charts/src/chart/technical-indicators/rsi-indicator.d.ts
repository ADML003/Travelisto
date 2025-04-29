import { TechnicalIndicator } from './technical-indicator';
import { TechnicalAnalysis } from './indicator-base';
import { Chart } from '../chart';
/**
 * The `RsiIndicator` module is used to render the Relative Strength Index indicator.
 */
export declare class RsiIndicator extends TechnicalAnalysis {
    /**
     * Initializes the series collection to represent the RSI Indicator
     *
     * @private
     * @param {TechnicalIndicator} indicator - The technical indicator for which the series collection is initialized.
     * @param {Chart} chart - The chart associated with the technical indicator.
     * @returns {void}
     */
    initSeriesCollection(indicator: TechnicalIndicator, chart: Chart): void;
    /**
     * Defines the predictions using RSI approach
     *
     * @private
     * @param {TechnicalIndicator} indicator - The technical indicator for which the data source is to be initialized.
     * @returns {void}
     */
    initDataSource(indicator: TechnicalIndicator): void;
    /**
     * To destroy the RSI Indicator.
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
