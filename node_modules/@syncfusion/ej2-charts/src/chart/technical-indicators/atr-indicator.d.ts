import { TechnicalIndicator } from './technical-indicator';
import { TechnicalAnalysis } from './indicator-base';
/**
 * The `AtrIndicator` module is used to render the Average True Range indicator.
 */
export declare class AtrIndicator extends TechnicalAnalysis {
    /**
     * Defines the predictions using Average True Range approach
     *
     * @private
     * @param {TechnicalIndicator} indicator - The technical indicator for which the data source is to be initialized.
     * @returns {void}
     */
    initDataSource(indicator: TechnicalIndicator): void;
    /**
     * Calculates the Average True Range (ATR) points for a technical indicator.
     *
     * @param {TechnicalIndicator} indicator - The technical indicator for which the ATR points are calculated.
     * @param {Points[]} validData - The valid data points used for calculation.
     * @returns {void}
     */
    private calculateATRPoints;
    /**
     * To destroy the Average true range indicator.
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
