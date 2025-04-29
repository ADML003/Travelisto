import { Chart } from '../chart';
import { AxisModel } from '../axis/axis-model';
import { ZoomMode } from '../utils/enum';
import { IZoomCompleteEventArgs } from '../../chart/model/chart-interface';
/**
 * The `Toolkit` class provides functionalities for zooming and panning in charts.
 *
 * @private
 */
export declare class Toolkit {
    private chart;
    private selectionColor;
    private fillColor;
    private elementOpacity;
    private elementId;
    private zoomInElements;
    private zoomOutElements;
    private zoomElements;
    private panElements;
    private iconRect;
    private enableZoomButton;
    private hoveredID;
    private selectedID;
    private iconRectOverFill;
    private iconRectSelectionFill;
    /** @private */
    zoomCompleteEvtCollection: IZoomCompleteEventArgs[];
    /** @private */
    isZoomed: boolean;
    /** @private */
    dragHorizontalRatio: number;
    /** @private */
    dragVerticalRatio: number;
    /** @private */
    isDragging: boolean;
    /**
     * Constructor for the chart touch module.
     *
     * @param {Chart} chart - Specifies the chart instance.
     */
    constructor(chart: Chart);
    /**
     * Creates a pan button.
     *
     * @param {Element} childElement - Specifies the child element.
     * @param {Element} parentElement - Specifies the parent element.
     * @returns {void}
     */
    createPanButton(childElement: Element, parentElement: Element): void;
    /**
     * Creates a zoom button.
     *
     * @param {Element} childElement - The child element to create.
     * @param {Element} parentElement - The parent element to append the child element.
     * @returns {void}
     */
    createZoomButton(childElement: Element, parentElement: Element): void;
    /**
     * Creates a zoom in button.
     *
     * @param {Element} childElement - The child element to create.
     * @param {Element} parentElement - The parent element to append the child element.
     * @param {Chart} chart - The chart instance.
     * @returns {void}
     */
    createZoomInButton(childElement: Element, parentElement: Element, chart: Chart): void;
    /**
     * Creates a zoom out button.
     *
     * @param {Element} childElement - The child element to create.
     * @param {Element} parentElement - The parent element to append the child element.
     * @param {Chart} chart - The chart instance.
     * @returns {void}
     */
    createZoomOutButton(childElement: Element, parentElement: Element, chart: Chart): void;
    /**
     * Creates a reset button.
     *
     * @param {Element} childElement - The child element to create.
     * @param {Element} parentElement - The parent element to append the child element.
     * @param {Chart} chart - The chart instance.
     * @param {boolean} isDevice - Specifies whether the device is mobile or not.
     * @returns {void}
     */
    createResetButton(childElement: Element, parentElement: Element, chart: Chart, isDevice: boolean): void;
    /**
     * Wires events to the specified element.
     *
     * @param {Element} element - The element to wire the events to.
     * @param {Function} process - The function to be executed when the event occurs.
     * @returns {void}
     */
    wireEvents(element: Element, process: Function): void;
    /**
     * Handles the mouse move event on the chart.
     *
     * @param {PointerEvent | TouchEvent} e - The mouse move event or touch event.
     * @returns {void}
     * @private
     */
    private mouseMoveHandler;
    /**
     * Handles the mouse down event on the toolkit.
     *
     * @param {PointerEvent} e - The mouse down event.
     * @returns {void}
     * @private
     */
    private mouseDownHandler;
    /**
     * Handles the mouse up event on the window.
     *
     * @param {PointerEvent} e - The mouse up event.
     * @returns {void}
     * @private
     */
    private mouseUpHandler;
    /**
     * Handles the drag-and-drop functionality for the toolkit.
     *
     * @param {PointerEvent | TouchEvent} e - The event triggered by the pointer or touch action.
     * @returns {void}
     * @private
     */
    private performDragAndDrop;
    /**
     * Displays the tooltip on mouse event.
     *
     * @param {MouseEvent} event - The mouse event.
     * @returns {void}
     */
    private showTooltip;
    /**
     * Removes the tooltip.
     *
     * @returns {void}
     */
    removeTooltip(): void;
    /**
     * Resets the chart.
     *
     * @param {PointerEvent | TouchEvent | KeyboardEvent} event - The event object.
     * @returns {boolean} - Returns false.
     */
    reset(event: PointerEvent | TouchEvent | KeyboardEvent): boolean;
    private setDefferedZoom;
    private zoomIn;
    private zoomOut;
    private zoom;
    /**
     * Enables panning for the chart.
     *
     * @returns {boolean} - Returns false.
     */
    pan(): boolean;
    zoomInOutCalculation(scale: number, chart: Chart, axes: AxisModel[], mode: ZoomMode): void;
    private applySelection;
}
