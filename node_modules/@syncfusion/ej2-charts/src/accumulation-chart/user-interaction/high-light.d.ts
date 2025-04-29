import { AccumulationChart } from '../accumulation';
import { AccumulationSelection } from './selection';
/**
 * The `AccumulationHighlight` module handles highlighting for the accumulation chart.
 *
 * @private
 */
export declare class AccumulationHighlight extends AccumulationSelection {
    /**
     * Constructor for selection module.
     *
     * @private.
     * @param {AccumulationChart} accumulation - The accumulation chart control.
     */
    constructor(accumulation: AccumulationChart);
    /**
     * Binding events for selection module.
     *
     * @returns {void}
     */
    private wireEvents;
    /**
     * UnBinding events for selection module.
     *
     * @returns {void}
     */
    private unWireEvents;
    /**
     * To find private variable values.
     *
     * @param {AccumulationChart} accumulation - The accumulation chart control.
     * @returns {void}
     */
    private declarePrivateVariables;
    /**
     * Method to select the point and series.
     *
     * @param {AccumulationChart} accumulation - The accumulation chart control.
     * @returns {void}
     */
    invokeHighlight(accumulation: AccumulationChart): void;
    /**
     * Get module name.
     *
     * @private
     * @returns {string} - Returns the module name.
     */
    getModuleName(): string;
    /**
     * To destroy the highlight.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
