import { Chart } from '../chart';
/**
 * The `Crosshair` module is used to render the crosshair for the chart.
 */
export declare class Crosshair {
    private elementID;
    private elementSize;
    private svgRenderer;
    private data;
    private crosshairInterval;
    private arrowLocation;
    private isTop;
    private isBottom;
    private isLeft;
    private isRight;
    /** @private */
    valueX: number;
    /** @private */
    valueY: number;
    private rx;
    private ry;
    private highlightWidth;
    private crosshairLeftOverflow;
    private crosshairRightOverflow;
    private chart;
    /**
     * Constructor for crosshair module.
     *
     * @private
     */
    constructor(chart: Chart);
    /**
     * Adds event listeners to the chart elements.
     *
     * @private
     * @returns {void}
     */
    private addEventListener;
    private mouseUpHandler;
    private mouseLeaveHandler;
    mouseMoveHandler(event: PointerEvent | TouchEvent): void;
    /**
     * Handles the long press on chart.
     *
     * @returns {boolean} false
     * @private
     */
    private longPress;
    /**
     * Finds the data points closest to the mouse position for all visible series in the chart.
     * Updates the `data` object with the nearest data point to be used for mouse interactions.
     *
     * @param {Chart} chart - The chart instance containing the visible series and mouse position.
     * @returns {boolean} -  True if chart has atleast one visible series.
     * @private
     */
    private findMousePoints;
    /**
     * Renders the crosshair.
     *
     * @returns {void}
     * @private
     */
    crosshair(): void;
    /**
     * Converts a specified color into a semi-transparent RGB string format.
     *
     * @param {string} color - The main color in hex format.
     * @returns {string} - The lightened color in RGBA format with an alpha value of 0.25.
     */
    crosshairLightenColor(color: string): string;
    /**
     * Adjusts the crosshair position to account for any overflow beyond the chart boundaries,
     * ensuring it stays within visible limits. It handles horizontal and vertical orientations separately.
     *
     * @param {number} initialPosition - The initial calculated position of the crosshair before adjustments.
     * @param {boolean} isHorizontalOrientation - Determines whether the crosshair is oriented horizontally.
     * @param {Chart} chart - The chart instance containing details on crosshair module and overflow values.
     * @returns {number} - The adjusted position of the crosshair after accounting for boundary overflow.
     * @private
     */
    private adjustCrosshairPositionForOverflow;
    private renderCrosshairLine;
    private drawCrosshairLine;
    private renderAxisTooltip;
    private getAxisText;
    private tooltipLocation;
    private stopAnimation;
    private progressAnimation;
    /**
     * Removes the crosshair on mouse leave.
     *
     * @returns {void}
     * @private
     */
    removeCrosshair(duration: number): void;
    /**
     * Get module name.
     *
     * @returns {string} module name
     */
    protected getModuleName(): string;
    /**
     * To destroy the crosshair.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
