import { CircularChart3D } from '../circularchart3d';
import { CircularChartSelection3D } from './selection';
/**
 * The `CircularChart3DHighlight` module handles highlighting for the Circular 3D chart.
 *
 * @private
 */
export declare class CircularChartHighlight3D extends CircularChartSelection3D {
    /**
     * Constructor for the highlight module.
     *
     * @param {CircularChart3D} circular3D - The instance of the circular 3D chart.
     * @private.
     */
    constructor(circular3D: CircularChart3D);
    /**
     * Binds events for the highlight module.
     *
     * @returns {void}
     */
    private wireEvents;
    /**
     * Unbinds events for the highlight module.
     *
     * @returns {void}
     */
    private unWireEvents;
    /**
     * Initializes private variables for highlight and deselection.
     *
     * @param {CircularChart3D} circular3D - The instance of the circular 3D chart.
     * @returns {void}
     */
    private declarePrivateVariables;
    /**
     * Invokes the highlight style to highlight the point and series in the circular 3D chart.
     *
     * @param {CircularChart3D} circular3D - The instance of the circular 3D chart.
     * @returns {void}
     */
    invokeHighlight(circular3D: CircularChart3D): void;
    /**
     * Gets the module name for the circular 3D highlight module.
     *
     * @returns {string} - The module name.
     * @private
     */
    getModuleName(): string;
    /**
     * Destroys the `CircularChart3DHighlight` module.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
