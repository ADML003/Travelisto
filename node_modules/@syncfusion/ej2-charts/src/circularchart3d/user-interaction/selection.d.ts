import { Rect, SvgRenderer, CanvasRenderer } from '@syncfusion/ej2-svg-base';
import { CircularChart3DSelectionMode, CircularChart3DHighlightMode } from '../model/enum';
import { CircularChart3D } from '../circularchart3d';
import { CircularChart3DSeries } from '../renderer/series';
import { Index, Indexes } from '../../common/model/base';
import { BaseSelection } from '../../common/user-interaction/selection';
/**
 * The `CircularChart3DSelection` module handles the selection for circular 3D chart.
 */
export declare class CircularChartSelection3D extends BaseSelection {
    /** @private */
    renderer: SvgRenderer | CanvasRenderer;
    /** @private */
    rectPoints: Rect;
    /** @private */
    selectedDataIndexes: Indexes[];
    /** @private */
    highlightDataIndexes: Indexes[];
    /** @private */
    series: CircularChart3DSeries[];
    /** @private */
    circular3D: CircularChart3D;
    /** @private */
    currentMode: CircularChart3DSelectionMode | CircularChart3DHighlightMode;
    /** @private */
    previousSelectedElement: Element[];
    constructor(circular3D: CircularChart3D);
    /**
     * Binding events for selection module.
     *
     * @returns {void}
     */
    private addEventListener;
    /**
     * Unbinding events for selection module.
     *
     * @returns {void}
     */
    private removeEventListener;
    /**
     * Initializes the private variables for selection and deselection.
     *
     * @param {CircularChart3D} circular3D - The instance of the circular 3D chart.
     * @returns {void}
     */
    private initPrivateVariables;
    /**
     * Invoke selection by creating selection style for rendered chart.
     *
     * @param {CircularChart3D} circular3D - The instance of the circular 3D chart.
     * @returns {void}
     */
    invokeSelection(circular3D: CircularChart3D): void;
    /**
     * To get the series selection style class name based on the series and point index.
     *
     * @param {CircularChart3DSeriesModel} series - Specifies the series model.
     * @param {number} point - Specifies the point index.
     * @returns {string} - Returns the style class name.
     */
    private generateStyle;
    /**
     * Gets series point elements based on the specified series and point index.
     *
     * @param {Index} index - Specifies the index of the series.
     * @returns {Element[]} - Returns the array of elements.
     */
    getElementByIndex(index: Index): Element[];
    /**
     * Checks whether the specified element is already selected based on the given event type and optional index.
     *
     * @param {Element} targetElement - The target element to be checked for selection status.
     * @param {string} eventType - The type of event triggering the selection check (e.g., 'mouse move').
     * @param {Index} [index] - The index to narrow down the selection check for elements with multiple occurrences.
     * @returns {boolean} - Returns true if the element is already selected; otherwise, returns false.
     * @private
     */
    isAlreadySelected(targetElement: Element, eventType: string, index?: Index): boolean;
    /**
     * Handles mouse click events on the specified circular 3D instance instance.
     *
     * @param {CircularChart3D} circular3D - The circular 3D instance where the mouse click event occurred.
     * @param {Event} event - The mouse click event triggering the action.
     * @returns {void}
     */
    mouseClick(circular3D: CircularChart3D, event: Event): void;
    /**
     * Calculates and processes selected elements based on the specified circular 3D chart instance, target element, and event type.
     *
     * @param {CircularChart3D} circular3D - The circular 3D chart instance to be used in the selection calculation.
     * @param {Element} targetElement - The target element involved in the selection calculation.
     * @param {string} eventType - The type of event triggering the selection calculation (e.g., 'click').
     * @returns {void}
     */
    calculateSelectedElements(circular3D: CircularChart3D, targetElement: Element, eventType: string): void;
    /**
     * Finds and returns the index associated with the specified identifier.
     *
     * @param {string} id - The identifier used to find the associated index.
     * @returns {Index} - The index associated with the specified identifier.
     * @private
     */
    indexFinder(id: string): Index;
    /**
     * Performs the selection based on the specified index, circular 3D instance, and optional element.
     *
     * @param {Index} index - The index used for selection, including the point information.
     * @param {CircularChart3D} circular3D - The circular 3D instance used for the selection operation.
     * @param {Element | undefined} [element] - The target element for selection.
     * @returns {void}
     * @private
     */
    private performSelection;
    /**
     * Handles the completion of the selection process in the specified circular 3D chart instance and Circular3DSeries.
     *
     * @param {CircularChart3D} circular3D - The circular 3D chart instance where the selection is completed.
     * @param {CircularChart3DSeries} series - The Circular3DSeries associated with the completed selection.
     * @returns {void}
     * @private
     */
    private selectionComplete;
    /**
     * Handles the selection process in the specified circular 3D instance based on the provided index and selected elements.
     *
     * @param {CircularChart3D} circular3D - The circular 3D chart instance where the selection is being performed.
     * @param {Index} index - The index used for selection, including point information.
     * @param {Element[]} selectedElements - The array of elements that have been selected.
     * @returns {void}
     * @private
     */
    private selection;
    /**
     * Redraws the selection in the specified circular 3D chart instance based on the selected data indexes.
     *
     * @param {CircularChart3D} circular3D - The circular 3D chart  instance where the selection is to be redrawn.
     * @returns {void}
     */
    redrawSelection(circular3D: CircularChart3D): void;
    /**
     * Removes the selected elements from the specified circular 3D chart instance based on the given indexes.
     *
     * @param {CircularChart3D} circular3D - The circular 3D instance from which selected elements will be removed.
     * @param {Index[]} indexes - The indexes representing the selected elements to be removed.
     * @returns {void}
     * @private
     */
    private removeSelectedElements;
    /**
     * Handles legend item selection in the specified circular 3D chart based on the target element and event type.
     *
     * @param {CircularChart3D} chart - The circular 3D chart instance where legend item selection is being processed.
     * @param {Element} targetElement - The target element associated with the legend item.
     * @param {string} eventType - The type of event triggering the legend item selection (e.g., 'mouse move').
     * @returns {void}
     */
    legendSelection(chart: CircularChart3D, targetElement: Element, eventType: string): void;
    /**
     * Selects elements based on the specified data indexes in the given circular 3D chart instance.
     *
     * @param {Index[]} indexes - The data indexes used for element selection.
     * @param {CircularChart3D} circular3D - The circular 3D instance where elements are to be selected.
     * @returns {void}
     * @private
     */
    private selectDataIndex;
    /**
     * Removes selection styles for elements in a multi-selection process based on the specified data indexes and current index.
     *
     * @param {CircularChart3D} circular3D - The circular 3D chart instance from which selection styles will be removed.
     * @param {Index[]} index - The data indexes representing the elements to remove selection styles from.
     * @param {Index} currentIndex - The current index used as a reference during the multi-selection process.
     * @returns {void}
     * @private
     */
    private removeMultiSelectElements;
    /**
     * Applies the opacity effect to circular 3D chart series elements based on the specified pieId and visible series.
     *
     * @param {string} pieId - The identifier associated with the circular 3D chart series.
     * @param {CircularChart3DSeries[]} visibleSeries - The array of visible series in the circular 3D chart.
     * @returns {void}
     * @private
     */
    private blurEffect;
    /**
     * Checks for selection elements based on the specified style class name, visibility, and other parameters.
     *
     * @param {Element[] | Element} element - The element or array of elements to be checked for selection.
     * @param {string} className - The style class name used for identifying selection elements.
     * @param {boolean} visibility - The visibility status of the selection elements.
     * @param {number} [point=0] - The point value associated with the selection elements.
     * @returns {void}
     * @public
     */
    checkSelectionElements(element: Element[] | Element, className: string, visibility: boolean, point?: number): void;
    /**
     * Applies selection style to the specified elements based on the provided data index.
     *
     * @param {Element[]} elements - The array of elements to which the selection style will be applied.
     * @param {Index} index - The data index used for selection.
     * @returns {void}
     * @private
     */
    private applyStyles;
    /**
     * Retrieves the selection style class name based on the specified element ID.
     *
     * @param {string} id - The identifier used to determine the series and point for generating the selection style.
     * @returns {string} - The selection style class name.
     * @private
     */
    private getSelectionClass;
    /**
     * Handles the removal of selection style class from the selected point in the circular 3D chart.
     *
     * @param {CircularChart3D} chart - The 3D chart instance where the selection needs to be removed.
     * @param {number} series - The index of the series for which the selection is being removed.
     * @param {NodeListOf<HTMLElement>} selectedElements - The HTML elements representing the selected items.
     * @param {string} seriesStyle - The style to be applied to the series after the removal of selection.
     * @param {boolean} isBlurEffectNeeded - A flag indicating whether a blur effect is needed after the removal of selection.
     * @param {Index} index - The index representing the specific data point for which selection is being removed (optional).
     * @returns {void}
     */
    removeSelection(chart: CircularChart3D, series: number, selectedElements: NodeListOf<HTMLElement>, seriesStyle: string, isBlurEffectNeeded: boolean, index?: Index): void;
    /**
     * Removes styles associated with the selection from the selected elements.
     *
     *
     * @param {Element[]} elements - An array of chart elements from which selection styles should be removed.
     * @returns {void}
     */
    removeStyles(elements: Element[]): void;
    /**
     * Adds or removes the specified index from the provided array of indexes based on the 'add' parameter.
     *
     * @param {Index[]} indexes - The array of indexes where the specified index will be added or removed.
     * @param {Index} index - The index to be added or removed.
     * @param {boolean} [add=true] - Indicates whether to add or remove the index. Defaults to true (add).
     * @returns {void}
     * @private
     */
    private addOrRemoveIndex;
    /**
     * Checks if two indexes are equal in terms of their point and series values.
     *
     * @param {Index} first - The first index to be compared.
     * @param {Index} second - The second index to be compared.
     * @returns {boolean} - Returns true if the indexes are equal; otherwise, returns false.
     * @private
     */
    private checkEquals;
    /**
     * Handles the mouse move event in the context of the circular 3D chart.
     *
     * @param {PointerEvent | TouchEvent} event - The pointer or touch event triggering the mouse move action.
     * @returns {void}
     * @public
     */
    mouseMove(event: PointerEvent | TouchEvent): void;
    /**
     * Removes the highlighted legend and respective points when the legend is not focused.
     *
     * @returns {void}
     * @private
     */
    removeLegendHighlightStyles(): void;
    /**
     * Gets the module name for circular 3D chart selection.
     *
     * @returns {string} - The module name.
     * @public
     */
    getModuleName(): string;
    /**
     * Destroys the `CircularChartSelection3D` module.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
