import { Chart } from '../chart';
import { Rect } from '@syncfusion/ej2-svg-base';
import { Toolkit } from './zooming-toolkit';
import { AxisModel } from '../axis/axis-model';
import { IZoomCompleteEventArgs, ITouches, IZoomAxisRange } from '../../chart/model/chart-interface';
/**
 * The `Zooming` module handles zooming functionality for charts.
 */
export declare class Zoom {
    private chart;
    private zooming;
    private elementId;
    /** @private */
    zoomingRect: Rect;
    /** @private */
    toolkit: Toolkit;
    /** @private */
    toolkitElements: Element;
    /** @private */
    isPanning: boolean;
    /** @private */
    isZoomed: boolean;
    /** @private */
    isPointer: boolean;
    /** @private */
    pinchTarget: Element;
    /** @private */
    isDevice: boolean;
    /** @private */
    browserName: string;
    /** @private */
    touchStartList: ITouches[] | TouchList;
    /** @private */
    touchMoveList: ITouches[] | TouchList;
    /** @private */
    offset: Rect;
    /** @private */
    zoomAxes: IZoomAxisRange[];
    /** @private */
    isIOS: boolean;
    /** @private */
    performedUI: boolean;
    private zoomkitOpacity;
    private wheelEvent;
    private cancelEvent;
    private zoomCompleteEvtCollection;
    /** @private */
    startPanning: boolean;
    /**
     * Constructor for Zooming module.
     *
     * @private
     */
    constructor(chart: Chart);
    /**
     * Renders the zooming functionality for the chart.
     *
     * @param {PointerEvent | TouchEvent} e - The pointer or touch event.
     * @param {Chart} chart - The chart instance.
     * @param {boolean} isTouch - Indicates whether the event is a touch event.
     * @returns {void}
     * @private
     */
    renderZooming(e: PointerEvent | TouchEvent, chart: Chart, isTouch: boolean): void;
    private drawZoomingRectangle;
    doPan(chart: Chart, axes: AxisModel[], xDifference?: number, yDifference?: number): void;
    private performDefferedZoom;
    /**
     * Redraw the chart on zooming.
     *
     * @param {Chart} chart - The chart instance.
     * @returns {void}
     * @private
     */
    performZoomRedraw(chart: Chart): void;
    private refreshAxis;
    private doZoom;
    /**
     * Redraws the chart on zooming.
     *
     * @param {Chart} chart - The chart instance.
     * @param {boolean} [isRedraw=true] - Indicates whether to redraw the chart.
     * @param {boolean} [isMouseUp=false] - Indicates whether the mouse button is released.
     * @returns {void}
     */
    private redrawOnZooming;
    /**
     * Performs mouse wheel zooming on the chart.
     *
     * @param {WheelEvent} e - The wheel event.
     * @param {number} mouseX - The X-coordinate of the mouse pointer.
     * @param {number} mouseY - The Y-coordinate of the mouse pointer.
     * @param {Chart} chart - The chart instance.
     * @param {AxisModel[]} axes - The axes in the chart.
     * @returns {void}
     * @private
     */
    performMouseWheelZooming(e: WheelEvent, mouseX: number, mouseY: number, chart: Chart, axes: AxisModel[]): void;
    /**
     * Performs pinch zooming on the chart.
     *
     * @param {TouchEvent} e - The touch event.
     * @param {Chart} chart - The chart instance.
     * @returns {boolean} - Indicates whether pinch zooming is performed.
     * @private
     */
    performPinchZooming(e: TouchEvent, chart: Chart): boolean;
    private calculatePinchZoomFactor;
    private setTransform;
    private calculateZoomAxesRange;
    private showZoomingToolkit;
    /**
     * Applies the zoom toolkit on the chart.
     *
     * @param {Chart} chart - The chart instance.
     * @param {AxisModel[]} axes - The axis models.
     * @returns {void}
     * @private
     */
    applyZoomToolkit(chart: Chart, axes: AxisModel[]): void;
    /**
     * Cancels the zoom action.
     *
     * @param {AxisModel[]} axes - The axis models.
     * @param {IZoomCompleteEventArgs[]} zoomCompleteEventCollection - The collection of zoom complete events.
     * @returns {void}
     * @private
     */
    zoomCancel(axes: AxisModel[], zoomCompleteEventCollection: IZoomCompleteEventArgs[]): void;
    /**
     * Checks if any of the axes is zoomed.
     *
     * @param {AxisModel[]} axes - The axis models.
     * @returns {boolean} - True if any axis is zoomed; otherwise, false.
     * @private
     */
    isAxisZoomed(axes: AxisModel[]): boolean;
    private zoomToolkitMove;
    private zoomToolkitLeave;
    /**
     * Adds event listeners for the chart.
     *
     * @returns {void}
     * @private
     */
    private addEventListener;
    /**
     * Remove event listeners for the chart.
     *
     * @returns {void}
     * @private
     */
    removeEventListener(): void;
    /**
     * Handles the mouse wheel event on the chart.
     *
     * @param {WheelEvent} e - The wheel event.
     * @returns {boolean} - Returns false.
     * @private
     */
    chartMouseWheel(e: WheelEvent): boolean;
    /**
     * Handles the mouse move event on the chart.
     *
     * @param {PointerEvent | TouchEvent} e - The mouse move event or touch event.
     * @returns {void}
     * @private
     */
    private mouseMoveHandler;
    /**
     * Handles the mouse down event on the chart.
     *
     * @param {PointerEvent} e - The mouse down event.
     * @returns {void}
     * @private
     */
    private mouseDownHandler;
    /**
     * Handles the mouse up event on the chart.
     *
     * @param {PointerEvent} e - The mouse up event.
     * @returns {void}
     * @private
     */
    private mouseUpHandler;
    /**
     * Handles the mouse cancel event on the chart.
     *
     * @returns {void}
     * @private
     */
    private mouseCancelHandler;
    /**
     * Adds touch pointer to the touch list.
     *
     * @param {ITouches[]} touchList - The touch list.
     * @param {PointerEvent} e - The pointer event.
     * @param {TouchList} touches - The touch list.
     * @returns {ITouches[]} - The updated touch list.
     * @private
     */
    addTouchPointer(touchList: ITouches[], e: PointerEvent, touches: TouchList): ITouches[];
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the zooming.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
