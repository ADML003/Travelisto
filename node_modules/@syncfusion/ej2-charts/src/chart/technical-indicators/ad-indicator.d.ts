import { TechnicalIndicator } from './technical-indicator';
import { TechnicalAnalysis } from './indicator-base';
/**
 * The `AccumulationDistributionIndicator` module is used to render the accumulation distribution indicator.
 */
export declare class AccumulationDistributionIndicator extends TechnicalAnalysis {
    /**
     * Defines the predictions using accumulation distribution approach.
     *
     * @private
     * @param {TechnicalIndicator} indicator - The technical indicator for which the data source is to be initialized.
     * @returns {void}
     */
    initDataSource(indicator: TechnicalIndicator): void;
    /**
     * Calculates the accumulation distribution (AD) points for a technical indicator.
     *
     * @param {TechnicalIndicator} indicator - The technical indicator for which the AD points are calculated.
     * @param {Points[]} validData - The valid data points used for calculation.
     * @returns {Points[]} - The calculated accumulation distribution (AD) points.
     */
    private calculateADPoints;
    /**
     * To destroy the Accumulation Distribution Technical Indicator.
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
