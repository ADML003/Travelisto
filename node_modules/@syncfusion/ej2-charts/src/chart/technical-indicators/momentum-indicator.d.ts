import { TechnicalIndicator } from './technical-indicator';
import { TechnicalAnalysis } from './indicator-base';
import { Chart } from '../chart';
/**
 * The `MomentumIndicator` module is used to render the Momentum indicator.
 */
export declare class MomentumIndicator extends TechnicalAnalysis {
    /**
     * Defines the collection of series to represent a momentum indicator.
     *
     * @private
     * @param {TechnicalIndicator} indicator - The technical indicator for which the series collection is initialized.
     * @param {Chart} chart - The chart associated with the technical indicator.
     * @returns {void}
     */
    initSeriesCollection(indicator: TechnicalIndicator, chart: Chart): void;
    /**
     * Defines the predictions using momentum approach
     *
     * @private
     * @param {TechnicalIndicator} indicator - The technical indicator for which the data source is to be initialized.
     * @returns {void}
     */
    initDataSource(indicator: TechnicalIndicator): void;
    /**
     * To destroy the momentum indicator.
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
