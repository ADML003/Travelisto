import { Chart } from '../chart';
/**
 * The `DataEditing` module handles data editing functionalities for chart series.
 */
export declare class DataEditing {
    private chart;
    private seriesIndex;
    private pointIndex;
    /**
     * It is used to identify point is dragging for data editing in other modules.
     *
     * @private
     */
    isPointDragging: boolean;
    /**
     * Initializes the event manager for the chart.
     *
     * @param {Chart} chart - The chart instance.
     */
    constructor(chart: Chart);
    /**
     * Point drag start here.
     *
     * @returns {void}
     * @private
     */
    pointMouseDown(): void;
    /**
     * Handles the mouse move event on chart data points.
     *
     * @param {PointerEvent | TouchEvent} event - The pointer event or touch event.
     * @returns {void}
     * @private
     */
    pointMouseMove(event: PointerEvent | TouchEvent): void;
    /**
     * Gets the cursor style based on the point data.
     *
     * @param {PointData} pointData - The data associated with the chart point.
     * @returns {void}
     */
    private getCursorStyle;
    /**
     * Handles the dragging behavior of a specific point.
     *
     * @param {number} si - Series index.
     * @param {number} pi - Point index.
     * @returns {void}
     */
    private pointDragging;
    /**
     * Point drag ends here.
     *
     * @returns {void}
     * @private
     */
    pointMouseUp(): void;
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the DataEditing.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
