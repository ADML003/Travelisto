/**
 * MultiLevel Labels src
 */
import { Chart } from '../chart';
import { Axis } from '../axis/axis';
import { FontModel } from '../../common/model/base-model';
import { TextOption, Rect } from '@syncfusion/ej2-svg-base';
import { IAxisMultiLabelRenderEventArgs, IMultiLevelLabelClickEventArgs } from '../../chart/model/chart-interface';
import { Alignment } from '../../common/utils/enum';
/**
 * The `MultiLevelLabel` module is used to render multi-level labels in charts.
 */
export declare class MultiLevelLabel {
    /** @private */
    chart: Chart;
    /** @private */
    xAxisPrevHeight: number[];
    /** @private */
    xAxisMultiLabelHeight: number[];
    /** @private */
    yAxisPrevHeight: number[];
    /** @private */
    yAxisMultiLabelHeight: number[];
    /** @private */
    multiElements: Element;
    /** @private */
    labelElement: Element;
    /** @private */
    multiLevelLabelRectXRegion: Rect[];
    /** @private */
    xLabelCollection: TextOption[];
    /**
     * Constructor for the logerithmic module.
     *
     * @private
     * @param {Chart} chart - Specifies the chart.
     */
    constructor(chart: Chart);
    /**
     * Binding events for multi level module.
     *
     * @returns {void}
     */
    private addEventListener;
    /**
     * Gets the height of multilevel labels for the axis.
     *
     * @private
     * @param {Axis} axis - The axis.
     * @returns {void}
     */
    getMultilevelLabelsHeight(axis: Axis): void;
    /**
     * Renders the multilevel labels for the X-axis.
     *
     * @private
     * @param {Axis} axis - The X-axis.
     * @param {number} index - The index of the axis.
     * @param {Element} parent - The parent element to render the multilevel labels.
     * @param {Rect} axisRect - The axis rectangle.
     * @returns {void}
     */
    renderXAxisMultiLevelLabels(axis: Axis, index: number, parent: Element, axisRect: Rect): void;
    /**
     * Renders the border for the X-axis labels.
     *
     * @private
     * @param {number} labelIndex - The index of the label.
     * @param {number} gap - The gap between labels.
     * @param {Axis} axis - The X-axis.
     * @param {number} startX - The starting X-coordinate.
     * @param {number} startY - The starting Y-coordinate.
     * @param {Size} labelSize - The size of the label.
     * @param {TextOption} textOptions - The text options for the label.
     * @param {Rect} axisRect - The axis rectangle.
     * @param {Alignment} alignment - The alignment of the label.
     * @param {string} path - The SVG path.
     * @param {boolean} isOutside - Indicates if the label is outside the axis.
     * @param {boolean} opposedPosition - Indicates if the axis is in the opposed position.
     * @param {number} categoryIndex - The index of the category.
     * @returns {string} - The SVG path.
     */
    private renderXAxisLabelBorder;
    /**
     * Renders the multi-level labels for the Y-axis.
     *
     * @private
     * @param {Axis} axis - The Y-axis.
     * @param {number} index - The index of the axis.
     * @param {Element} parent - The parent element to which the labels are appended.
     * @param {Rect} rect - The axis rectangle.
     * @returns {void}
     */
    renderYAxisMultiLevelLabels(axis: Axis, index: number, parent: Element, rect: Rect): void;
    /**
     * Renders the border for the Y-axis labels.
     *
     * @param {number} labelIndex - The index of the label.
     * @param {number} gap - The gap between labels.
     * @param {Axis} axis - The Y-axis.
     * @param {number} endY - The end Y-coordinate.
     * @param {number} startX - The start X-coordinate.
     * @param {number} startY - The start Y-coordinate.
     * @param {Size} labelSize - The size of the label.
     * @param {TextOption} textOptions - The text options for the label.
     * @param {Rect} rect - The axis rectangle.
     * @param {Alignment} alignment - The alignment of the label.
     * @param {string} path - The path for rendering.
     * @param {boolean} isOutside - Indicates whether the label is outside.
     * @param {boolean} opposedPosition - Indicates whether the label position is opposed.
     * @param {number} categoryIndex - The index of the category.
     * @returns {string} - The path for rendering the label border.
     */
    private renderYAxisLabelBorder;
    /**
     * create cliprect
     *
     * @returns {void}
     * @private
     */
    createClipRect(x: number, y: number, height: number, width: number, clipId: string, axisId: string): void;
    /**
     * create borer element
     *
     * @returns {void}
     * @private
     */
    createBorderElement(borderIndex: number, axisIndex: number, axis: Axis, path: string, pointIndex?: number): void;
    /**
     * Triggers the event.
     *
     * @returns {void}
     * @private
     */
    triggerMultiLabelRender(axis: Axis, text: string, textStyle: FontModel, textAlignment: Alignment, customAttributes: object): IAxisMultiLabelRenderEventArgs;
    /**
     * Handles the click event for multi-level labels.
     *
     * @private
     * @param {string} labelIndex - The index of the clicked label.
     * @param {number} axisIndex - The index of the axis.
     * @returns {IMultiLevelLabelClickEventArgs} - The event arguments for multi-level label click.
     */
    MultiLevelLabelClick(labelIndex: string, axisIndex: number): IMultiLevelLabelClickEventArgs;
    /**
     * To click the multi level label
     *
     * @param {Event} event - The click event.
     * @returns {void}
     * @private
     */
    click(event: Event): void;
    /**
     * To get the module name for `MultiLevelLabel`.
     *
     * @private
     * @returns {string} - Returns the module name.
     */
    getModuleName(): string;
    /**
     * To destroy the `MultiLevelLabel` module.
     *
     * @private
     * @returns {void}
     */
    destroy(): void;
}
