import { TechnicalIndicator } from './technical-indicator';
import { TechnicalAnalysis } from './indicator-base';
import { Chart } from '../chart';
/**
 * The `BollingerBands` module is used to render the Bollinger Band indicator.
 */
export declare class BollingerBands extends TechnicalAnalysis {
    /**
     * Initializes the series collection for a technical indicator.
     *
     * @param {TechnicalIndicator} indicator - The technical indicator for which the series collection is initialized.
     * @param {Chart} chart - The chart associated with the technical indicator.
     * @returns {void}
     * @private
     */
    initSeriesCollection(indicator: TechnicalIndicator, chart: Chart): void;
    /**
     * Defines the predictions using Bollinger Band Approach
     *
     * @private
     * @param {TechnicalIndicator} indicator - The technical indicator for which the data source is to be initialized.
     * @returns {void}
     */
    initDataSource(indicator: TechnicalIndicator): void;
    /**
     * To destroy the Bollinger Band.
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
