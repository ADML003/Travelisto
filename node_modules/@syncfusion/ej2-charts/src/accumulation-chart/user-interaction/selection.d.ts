import { Rect, SvgRenderer, CanvasRenderer } from '@syncfusion/ej2-svg-base';
import { AccumulationSelectionMode, AccumulationHighlightMode } from '../model/enum';
import { AccumulationChart } from '../accumulation';
import { AccumulationSeries } from '../model/acc-base';
import { Indexes } from '../../common/model/base';
import { BaseSelection } from '../../common/user-interaction/selection';
/**
 * The `AccumulationSelection` module handles selection for the accumulation chart.
 *
 * @private
 */
export declare class AccumulationSelection extends BaseSelection {
    /** @private */
    renderer: SvgRenderer | CanvasRenderer;
    /** @private */
    rectPoints: Rect;
    /** @private */
    selectedDataIndexes: Indexes[];
    /** @private */
    highlightDataIndexes: Indexes[];
    /** @private */
    series: AccumulationSeries[];
    /** @private */
    accumulation: AccumulationChart;
    /** @private */
    currentMode: AccumulationSelectionMode | AccumulationHighlightMode;
    /** @private */
    previousSelectedElement: Element[];
    constructor(accumulation: AccumulationChart);
    /**
     * Binding events for selection module.
     *
     * @returns {void}
     */
    private addEventListener;
    /**
     * UnBinding events for selection module.
     *
     * @returns {void}
     */
    private removeEventListener;
    /**
     * To initialize the private variables.
     *
     * @param {AccumulationChart} accumulation - The accumulation chart control.
     * @returns {void}
     */
    private initPrivateVariables;
    /**
     * Invoke selection for rendered chart.
     *
     * @param {AccumulationChart} accumulation - Define the chart to invoke the selection.
     * @returns {void}
     * @private
     */
    invokeSelection(accumulation: AccumulationChart): void;
    /**
     * To get series selection style by series.
     *
     * @param {AccumulationSeriesModel} series - The series for which to get the selection style.
     * @param {number} point - The index of the point within the series.
     * @returns {string} - The selection style for the specified series.
     */
    private generateStyle;
    /**
     * To get elements by index, series.
     *
     * @param {AccumulationChart} accumulation - The accumulation chart control.
     * @param {AccumulationSeriesModel} series - The series for which to get the elements.
     * @param {Index} index - The index of the element within the series.
     * @returns {Element[]} - The elements corresponding to the specified index and series.
     */
    private findElements;
    /**
     * To get series point element by index.
     *
     * @param {Index} index - The index of the element within the series.
     * @returns {Element} - The elements corresponding to the specified index.
     */
    private getElementByIndex;
    /**
     * To find the selected element.
     *
     * @param {Element} targetElement - The target element to check for selection.
     * @param {string} eventType - The type of event that triggered the selection.
     * @returns {boolean} - Indicates whether the element is selected.
     * @private
     */
    isAlreadySelected(targetElement: Element, eventType: string): boolean;
    /**
     * To calculate selected elements on mouse click or touch.
     *
     * @private
     * @param {AccumulationChart} accumulation - The accumulation chart control.
     * @param {Event} event - The event object representing the mouse click or touch event.
     * @returns {void}
     */
    mouseClick(accumulation: AccumulationChart, event: Event): void;
    /**
     * To calculate selected elements on mouse click or touch.
     *
     * @private
     * @param {AccumulationChart} accumulation - The accumulation chart control.
     * @param {Element} targetEle - The target element that triggered the event.
     * @param {string} eventType - The type of event that triggered the selection.
     * @returns {void}
     */
    calculateSelectedElements(accumulation: AccumulationChart, targetEle: Element, eventType: string): void;
    /**
     * To perform the selection process based on index and element.
     *
     * @param {Index} index - The index of the data to select.
     * @param {AccumulationChart} accumulation - The accumulation chart control.
     * @param {Element} element - The element representing the selected data.
     * @returns {void}
     */
    private performSelection;
    /**
     * Method to get the selected data index.
     *
     * @private
     * @param {AccumulationChart} accumulation - The accumulation chart control.
     * @param {AccumulationSeries} series - The series to retrieve the selected data from index.
     * @returns {void}
     */
    private selectionComplete;
    /**
     * To select the element by index. Adding or removing selection style class name.
     *
     * @param {AccumulationChart} accumulation - The accumulation chart control.
     * @param {Index} index - The index of the element to select or deselect.
     * @param {Element[]} selectedElements - The array of selected elements.
     * @returns {void}
     */
    private selection;
    /**
     * To redraw the selection process on accumulation chart refresh.
     *
     * @private
     * @param {AccumulationChart} accumulation - The accumulation chart control.
     * @returns {void}
     */
    redrawSelection(accumulation: AccumulationChart): void;
    /**
     * To remove the selected elements style classes by indexes.
     *
     * @param {AccumulationChart} accumulation - The accumulation chart control.
     * @param {Index[]} indexes - The array of indexes representing elements to remove selection styles.
     * @returns {void}
     */
    private removeSelectedElements;
    /**
     * To perform the selection for legend elements.
     *
     * @private
     */
    legendSelection(accumulation: AccumulationChart, series: number, pointIndex: number, targetEle: Element, eventType: string): void;
    /**
     * To select the element by selected data indexes.
     *
     * @param {Index[]} indexes - The array of indexes representing elements to select.
     * @param {AccumulationChart} accumulation - The accumulation chart control.
     * @returns {void}
     */
    private selectDataIndex;
    /**
     * To remove the selection styles for multi selection process.
     *
     * @param {AccumulationChart} accumulation - The Accumulation Chart control.
     * @param {Index[]} index - The array of indexes representing elements to remove selection styles for multi selection process.
     * @param {Index} currentIndex - The current index to remove from selection.
     * @param {AccumulationSeriesModel[]} seriesCollection - The array of visible series in the accumulation chart.
     * @returns {void}
     */
    private removeMultiSelectEelments;
    /**
     * To apply the opacity effect for accumulation chart series elements.
     *
     * @param  {string} pieId - The id of the pie element.
     * @param  {AccumulationSeries[]} visibleSeries - The array of visible series in the accumulation chart.
     * @returns {void}
     */
    private blurEffect;
    /**
     * To check selection elements by style class name.
     *
     * @param  {Element} element - The element to check selection elements by style class name.
     * @param  {string} className - The class name to check.
     * @param  {boolean} visibility - Indicates whether the element should be visible.
     * @returns {void}
     */
    private checkSelectionElements;
    /**
     * To apply selection style for elements.
     *
     * @param  {Element[]} elements - The array of elements to apply the selection style.
     * @param  {Index} index - The index to apply the selection style.
     * @returns {void}
     */
    private applyStyles;
    /**
     * To get selection style class name by id.
     *
     * @param  {string} id - The id of the element to retrieve the selection style class name.
     * @param  {number} point - The point for the selection.
     * @returns {string} - The selection style class name.
     */
    private getSelectionClass;
    /**
     * To remove selection style for elements.
     *
     * @param  {Element[]} elements - The array of elements from which to remove the selection style.
     * @param  {Index} index - The index to remove from the selection.
     * @returns {void}
     */
    private removeStyles;
    /**
     * To apply or remove selected elements index.
     *
     * @param  {Index[]} indexes - The array of indexes representing elements to apply or remove selection.
     * @param  {Index} index - The index to add or remove from the selection.
     * @param  {boolean} add - Indicates whether to add or remove the index.
     * @returns {void}
     */
    private addOrRemoveIndex;
    /**
     * To check two index, point and series are equal.
     *
     * @param  {Index} first - The first index.
     * @param  {Index} second - The second index.
     * @returns {boolean} - Indicates whether the two indexes are equal.
     */
    private checkEquals;
    /**
     *The mouse move event.
     *
     * @private
     * @param  {PointerEvent | TouchEvent} event - The mouse move event or touch event.
     * @returns {void}
     */
    mouseMove(event: PointerEvent | TouchEvent): void;
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
