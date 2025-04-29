import { Chart } from '../chart';
import { Selection } from './selection';
/**
 * The `Highlight` module manages the highlighting of chart elements.
 *
 * @private
 */
export declare class Highlight extends Selection {
    /**
     * Constructor for selection module.
     *
     * @private
     */
    constructor(chart: Chart);
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
     * Declares private variables used within the chart.
     *
     * @param {Chart} chart - The chart instance.
     * @returns {void}
     */
    private declarePrivateVariables;
    /**
     * Method to select the point and series.
     *
     * @param {Chart} chart - The chart instance.
     * @returns {void}
     */
    invokeHighlight(chart: Chart): void;
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
