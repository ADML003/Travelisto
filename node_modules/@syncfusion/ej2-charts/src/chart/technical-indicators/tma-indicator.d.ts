import { TechnicalIndicator } from './technical-indicator';
import { TechnicalAnalysis } from './indicator-base';
/**
 * The `TmaIndicator` module is used to render the Triangular Moving Average indicator.
 */
export declare class TmaIndicator extends TechnicalAnalysis {
    /**
     * Defines the predictions based on TMA approach.
     *
     * @private
     * @param {TechnicalIndicator} indicator - The technical indicator for which the data source is to be initialized.
     * @returns {void}
     */
    initDataSource(indicator: TechnicalIndicator): void;
    /**
     * To destroy the TMA indicator.
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
