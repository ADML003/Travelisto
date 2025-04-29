import { ChartLocation } from '../../common/utils/helper';
import { Rect, SvgRenderer, CanvasRenderer } from '@syncfusion/ej2-svg-base';
import { SelectionMode, HighlightMode } from '../../common/utils/enum';
import { Chart } from '../chart';
import { Series, Points } from '../series/chart-series';
import { SeriesModel } from '../series/chart-series-model';
import { Index } from '../../common/model/base';
import { BaseSelection } from '../../common/user-interaction/selection';
import { Indexes } from '../../common/model/base';
/**
 * The `Selection` module handles the selection of chart elements.
 *
 * @private
 */
export declare class Selection extends BaseSelection {
    /** @private */
    renderer: SvgRenderer | CanvasRenderer;
    /** @private */
    isSeriesMode: boolean;
    private isdrawRect;
    private resizing;
    /** @private */
    rectPoints: Rect;
    private closeIconId;
    private closeIcon;
    private draggedRectGroup;
    private multiRectGroup;
    private draggedRect;
    private lassoPath;
    /** @private */
    selectedDataIndexes: Indexes[];
    /** @private */
    highlightDataIndexes: Indexes[];
    multiDataIndexes: Points[][];
    pathIndex: number;
    seriesIndex: number;
    /** @private */
    series: Series[];
    private dragging;
    private count;
    private isMultiDrag;
    private targetIndex;
    private dragRect;
    private dragRectArray;
    filterArray: Rect[];
    private totalSelectedPoints;
    private rectGrabbing;
    private path;
    private resizeMode;
    /** @private */
    chart: Chart;
    /** @private */
    currentMode: SelectionMode | HighlightMode;
    /** @private */
    previousSelectedEle: Element[];
    /**
     * Constructor for selection module.
     *
     * @private
     */
    constructor(chart: Chart);
    /**
     * Adds event listeners for the chart.
     *
     * @returns {void}
     */
    private addEventListener;
    /**
     * Handles the mousedown event.
     *
     * @private
     * @param {Event} e - The event object.
     * @returns {void}
     */
    private mousedown;
    /**
     * UnBinding events for selection module.
     *
     * @returns {void}
     */
    private removeEventListener;
    /**
     * Initializes private variables for the chart.
     *
     * @private
     * @param {Chart} chart - The chart instance.
     * @returns {void}
     */
    private initPrivateVariables;
    /**
     * Method to select the point and series.
     *
     * @param {Chart} chart - The chart instance.
     * @returns {void}
     */
    invokeSelection(chart: Chart): void;
    generateStyle(series: SeriesModel): string;
    /**
     * Selects data points in the chart based on the provided indexes.
     *
     * @param {Chart} chart - The chart instance.
     * @param {Index[]} indexes - An array of Index objects specifying the series and point indexes to be selected.
     * @returns {void}
     */
    selectDataIndex(chart: Chart, indexes: Index[]): void;
    /**
     * Retrieves the DOM elements corresponding to the specified data point index.
     *
     * @param {Chart} chart - The chart instance.
     * @param {Index} index - The index object specifying the series and point indexes.
     * @param {string} [suffix=''] - Optional suffix to be appended to the element IDs.
     * @param {boolean} [marker] - Optional parameter to specify whether to retrieve marker elements. Default is false.
     * @param {boolean} [dataLabel] - Optional parameter to specify whether to retrieve datalabel elements. Default is false.
     * @returns {Element[]} - An array of DOM elements corresponding to the specified data point index.
     */
    getElementByIndex(chart: Chart, index: Index, suffix?: string, marker?: boolean, dataLabel?: boolean): Element[];
    /**
     * Retrieves the DOM elements corresponding to the cluster of data points at the specified index.
     *
     * @param {Chart} chart - The chart instance.
     * @param {Index} index - The index object specifying the series and point indexes.
     * @returns {Element[]} - An array of DOM elements corresponding to the cluster of data points at the specified index.
     */
    getClusterElements(chart: Chart, index: Index): Element[];
    /**
     * Finds the elements within the selected elements that match the specified class name.
     *
     * @param {Element[] | NodeListOf<HTMLElement>} selectedElements - The elements to search within.
     * @param {string} className - The class name to search for.
     * @returns {void}
     */
    findTrackballElements(selectedElements: Element[] | NodeListOf<HTMLElement>, className: string): void;
    /**
     * Finds the elements in the chart corresponding to the specified series and data point index.
     *
     * @param {Chart} chart - The chart instance.
     * @param {SeriesModel} series - The series for which to find the elements.
     * @param {Index} index - The index of the data point.
     * @param {string} [suffix=''] - A suffix to append to the element IDs.
     * @param {boolean} [marker] - Specifies whether to include marker elements.
     * @param {boolean} [dataLabel] - Specifies whether to include datalabel elements.
     * @returns {Element[]} - An array of elements corresponding to the specified series and data point index.
     */
    findElements(chart: Chart, series: SeriesModel, index: Index, suffix?: string, marker?: boolean, dataLabel?: boolean): Element[];
    /**
     * Checks if the target element is already selected for the specified event type.
     *
     * @param {Element} targetElem - The target element to check.
     * @param {string} eventType - The type of event (e.g., 'mouse move', 'touch move').
     * @returns {boolean} - A boolean value indicating whether the target element is already selected for the specified event type.
     */
    isAlreadySelected(targetElem: Element, eventType: string): boolean;
    private mouseClick;
    /**
     * Calculates the selected elements based on the target element and event type.
     *
     * @param {HTMLElement} targetElement - The target element for which to calculate selected elements.
     * @param {string} eventType - The type of event (e.g., 'mouse move', 'touch move').
     * @param {boolean} pointClick - Selection of series points.
     * @returns {void}
     */
    calculateSelectedElements(targetElement: HTMLElement, eventType: string, pointClick?: boolean): void;
    /**
     * Performs selection based on the provided index and chart.
     *
     * @param {Index} index - The index for which to perform the selection.
     * @param {Chart} chart - The chart instance.
     * @param {Element} [element] - Optional. The element associated with the selection.
     * @param {boolean} pointClick - Selection of series points.
     * @returns {void}
     */
    performSelection(index: Index, chart: Chart, element?: Element, pointClick?: boolean): void;
    /**
     * Completes the selection process based on the provided index and selection mode.
     *
     * @param {Chart} chart - The chart instance.
     * @param {Index} index - The index for which the selection is completed.
     * @param {SelectionMode | HighlightMode} selectionMode - The selection mode.
     * @returns {void}
     */
    selectionComplete(chart: Chart, index: Index, selectionMode: SelectionMode | HighlightMode): void;
    /**
     * Handles the selection logic for the chart.
     *
     * @param {Chart} chart - The chart instance.
     * @param {Index} index - The index of the selected data point.
     * @param {Element[]} selectedElements - The elements representing the selected data point.
     * @returns {void}
     */
    selection(chart: Chart, index: Index, selectedElements: Element[]): void;
    /**
     * Handles the selection logic for clustered data points in the chart.
     *
     * @param {Chart} chart - The chart instance.
     * @param {Index} index - The index of the selected clustered data point.
     * @returns {void}
     */
    clusterSelection(chart: Chart, index: Index): void;
    /**
     * Removes the multi-selected elements from the chart.
     *
     * @param {Chart} chart - The chart instance.
     * @param {Index[]} index - The indices of the multi-selected elements to be removed.
     * @param {Index} currentIndex - The index of the current selected element.
     * @param {SeriesModel[]} seriesCollection - The collection of series in the chart.
     * @returns {void}
     */
    removeMultiSelectElements(chart: Chart, index: Index[], currentIndex: Index, seriesCollection: SeriesModel[]): void;
    /**
     * Applies a blur effect to a specific chart or legend.
     *
     * @param {string} chartId - The ID of the chart or legend.
     * @param {Series[]} visibleSeries - The collection of visible series in the chart.
     * @param {boolean} isLegend - Indicates whether the blur effect should be applied to a legend. Defaults to false.
     * @param {number} index - The index of the series or legend item to which the blur effect should be applied. Defaults to 0.
     * @returns {void}
     */
    blurEffect(chartId: string, visibleSeries: Series[], isLegend?: boolean, index?: number): void;
    /**
     * Checks and updates the selection state of elements based on the provided criteria.
     *
     * @param {Element} element - The element to check for selection.
     * @param {string} className - The class name used for selecting elements.
     * @param {boolean} visibility - The visibility state of the element.
     * @param {boolean} isLegend - Indicates whether the element is a legend. Defaults to true.
     * @param {number} series - The index of the series associated with the element. Defaults to 0.
     * @param {string} legendStrokeColor - The stroke color of the legend. Defaults to '#D3D3D3'.
     * @returns {void}
     */
    checkSelectionElements(element: Element, className: string, visibility: boolean, isLegend?: boolean, series?: number, legendStrokeColor?: string): void;
    /**
     * Applies styles to the specified elements.
     *
     * @param {Element[]} elements - The elements to which styles will be applied.
     * @returns {void}
     */
    applyStyles(elements: Element[]): void;
    /**
     * Gets the CSS class for selection based on the provided identifier.
     *
     * @param {string} id - The identifier used to determine the selection class.
     * @returns {string} - The CSS class for selection.
     */
    getSelectionClass(id: string): string;
    /**
     * Removes styles from the provided elements.
     *
     * @param {Element[]} elements - The elements from which styles will be removed.
     * @returns {void}
     */
    removeStyles(elements: Element[]): void;
    /**
     * Adds or removes an index from the provided array of indexes.
     *
     * @param {Index[]} indexes - The array of indexes.
     * @param {Index} index - The index to add or remove.
     * @param {boolean} [isAdd] - Optional parameter to specify whether to add or remove the index. Defaults to true (add).
     * @returns {void}
     */
    addOrRemoveIndex(indexes: Index[], index: Index, isAdd?: boolean): void;
    /**
     * Checks if two Index objects are equal.
     *
     * @param {Index} first - The first Index object.
     * @param {Index} second - The second Index object.
     * @param {boolean} checkSeriesOnly - Specifies whether to check series properties only.
     * @returns {boolean} - True if the two Index objects are equal, otherwise false.
     */
    toEquals(first: Index, second: Index, checkSeriesOnly: boolean): boolean;
    /**
     * Redraws the selection or highlight on the chart.
     *
     * @param {Chart} chart - The chart instance.
     * @param {SelectionMode | HighlightMode} oldMode - The previous selection or highlight mode.
     * @param {boolean} chartRedraw - Specifies whether to redraw the entire chart.
     * @returns {void}
     */
    redrawSelection(chart: Chart, oldMode: SelectionMode | HighlightMode, chartRedraw?: boolean): void;
    /**
     * Handles selection on legend item click.
     *
     * @param {Chart} chart - The chart instance.
     * @param {number} series - The index of the series.
     * @param {Element} targetElement - The target element clicked.
     * @param {string} eventType - The type of event triggered.
     * @returns {void}
     */
    legendSelection(chart: Chart, series: number, targetElement: Element, eventType: string): void;
    /**
     * Checks if range color mapping is enabled for the chart.
     *
     * @returns {boolean} - Returns true if range color mapping is enabled, otherwise false.
     */
    rangeColorMappingEnabled(): boolean;
    removeSelection(chart: Chart, series: number, selectedElements: NodeListOf<HTMLElement>, seriesStyle: string, isBlurEffectNeeded: boolean): void;
    /**
     * Retrieves the SVG elements associated with a particular series in the chart.
     *
     * @param {SeriesModel} series - The series for which to retrieve the SVG elements.
     * @returns {Element[]} - An array of SVG elements representing the series.
     */
    getSeriesElements(series: SeriesModel): Element[];
    /**
     * Finds the index associated with a particular element ID.
     *
     * @param {string} id - The ID of the element to find the index for.
     * @returns {Index} - The index associated with the element ID.
     */
    indexFinder(id: string): Index;
    /**
     * Calculates the elements selected by dragging a rectangle on the chart.
     *
     * @param {Chart} chart - The chart instance.
     * @param {Rect} dragRect - The rectangle representing the selection area.
     * @param {boolean} isClose - Flag indicating whether the selection should be close.
     * @returns {void}
     */
    calculateDragSelectedElements(chart: Chart, dragRect: Rect, isClose?: boolean): void;
    private removeOffset;
    private isPointSelect;
    /**
     * Draws the dragging rectangle on the chart.
     *
     * @param {Chart} chart - The chart instance.
     * @param {Rect} dragRect - The rectangle representing the dragging area.
     * @returns {void}
     */
    drawDraggingRect(chart: Chart, dragRect: Rect): void;
    /**
     * Retrieves the index of a particular item based on its identifier.
     *
     * @param {string} id - The identifier of the item.
     * @returns {number} - The index of the item, or -1 if not found.
     */
    private getIndex;
    private createCloseButton;
    /**
     * Method to remove dragged element.
     *
     * @returns {void}
     * @private
     */
    removeDraggedElements(chart: Chart, targetElement: HTMLElement, eventType: string): void;
    /**
     * Updates the selection rectangle during resizing.
     *
     * @param {Chart} chart - The chart instance.
     * @param {ChartLocation} location - The location of the resizing action.
     * @param {boolean} [tapped=false] - Indicates whether the resizing action was initiated by tapping.
     * @param {Element} [target] - The target element of the resizing action.
     * @returns {void}
     */
    resizingSelectionRect(chart: Chart, location: ChartLocation, tapped?: boolean, target?: Element): void;
    private findResizeMode;
    private changeCursorStyle;
    private removeSelectedElements;
    private setAttributes;
    /**
     * Updates the position of the dragged rectangle.
     *
     * @param {Chart} chart - The chart instance.
     * @param {Rect} grabbedPoint - The rectangle representing the grabbed point.
     * @param {boolean} [doDrawing=false] - Indicates whether to redraw the dragging rectangle.
    //  * @param {Element} [target] - The target element related to the dragging action.
     * @returns {void}
     */
    draggedRectMoved(chart: Chart, grabbedPoint: Rect, doDrawing?: boolean): void;
    private mouseLeave;
    /**
     * Completes the selection process.
     *
     * @param {HTMLElement} target - The target element where the selection is completed.
     * @param {string} eventType - The type of event that triggered the selection completion.
     * @returns {void}
     */
    completeSelection(target: HTMLElement, eventType: string): void;
    private getDragRect;
    /**
     * Initiates the drag operation.
     *
     * @param {Chart} chart - The chart instance where the drag operation is initiated.
     * @param {Rect} seriesClipRect - The clipping rectangle of the series.
     * @param {number} mouseDownX - The X-coordinate where the mouse was pressed down.
     * @param {number} mouseDownY - The Y-coordinate where the mouse was pressed down.
     * @param {Event} event - The event object associated with the mouse down event.
     * @returns {void}
     */
    dragStart(chart: Chart, seriesClipRect: Rect, mouseDownX: number, mouseDownY: number, event: Event): void;
    private isDragRect;
    /**
     * Handles the mouse move event.
     *
     * @param {PointerEvent | TouchEvent} event - The pointer event or touch event associated with the mouse move.
     * @returns {void}
     */
    mouseMove(event: PointerEvent | TouchEvent): void;
    /**
     * Highlights the specified chart element.
     *
     * @param {Element} target - The target element to highlight.
     * @param {string} eventType - The type of event triggering the highlighting.
     * @returns {void}
     */
    highlightChart(target: Element, eventType: string): void;
    /**
     * Handles the selection and dragging functionality for the chart.
     *
     * @param {Chart} chart - The chart instance.
     * @param {Element} target - The target element involved in the selection or dragging action.
     * @param {string} eventType - The type of event triggering the selection or dragging action.
     * @returns {void}
     */
    selectionAndDrag(chart: Chart, target: Element, eventType: string): void;
    /**
     * Remove highlighted legend when not focused.
     * @param {boolean} tooltipHighlight - Specifies whether the tooltip highlighting is enabled.
     * @private
     * @returns {void}
     */
    removeLegendHighlightStyles(tooltipHighlight?: boolean): void;
    private getPath;
    /**
     * Performs a highlight animation on the specified HTML element.
     *
     * @param {HTMLElement} element - The HTML element to animate.
     * @param {number} index - The index to find the opacity value of the series.
     * @param {number} duration - The duration of the animation in milliseconds.
     * @param {number} startOpacity - The starting opacity value for the animation.
     * @param {boolean} strokeWidth - The starting opacity value for the animation.
     * @returns {void}
     */
    private highlightAnimation;
    /**
     * Stops the animation and sets opacity of the specified HTML element.
     *
     * @param {HTMLElement} element - The HTML element to stop the animation.
     * @param {number} index - The index to find the opacity value of the series.
     * @returns {void}
     */
    private stopElementAnimation;
    private pointChecking;
    /**
     * Get module name.
     *
     * @private
     * @returns {string} - Returns the module name.
     */
    getModuleName(): string;
    /**
     * To destroy the selection.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
