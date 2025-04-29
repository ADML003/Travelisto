import { Chart } from '../chart';
import { Axis, Row, Column } from '../axis/axis';
import { ChartLocation } from '../../common/utils/helper';
import { Size, Rect } from '@syncfusion/ej2-svg-base';
export declare class CartesianAxisLayoutPanel {
    private chart;
    private initialClipRect;
    private htmlObject;
    /** @private */
    element: Element;
    private padding;
    /** @private */
    leftSize: number;
    /** @private */
    rightSize: number;
    /** @private */
    topSize: number;
    /** @private */
    bottomSize: number;
    /** @private */
    seriesClipRect: Rect;
    /** @private */
    previousXLabel: number;
    /** @private */
    previousYLabel: number;
    /** @private */
    /**
     * Constructor for creating the chart.
     *
     * @param {Chart} chartModule - Specifies the Chart model.
     * @private */
    constructor(chartModule?: Chart);
    /**
     * Measure the axis size.
     *
     * @returns {void}
     * @private
     */
    measureAxis(rect: Rect): void;
    private calculateFixedChartArea;
    private measureRowAxis;
    private measureColumnAxis;
    /**
     * Measure the column and row in chart.
     *
     * @returns {void}
     * @private
     */
    measureDefinition(definition: Row | Column, chart: Chart, size: Size): void;
    /**
     * Measure the axis.
     *
     * @param {Rect} rect - The rect for measuring the axis.
     * @returns {void}
     * @private
     */
    private calculateAxisSize;
    /**
     * Measure the axis.
     *
     * @returns {void}
     * @private
     */
    measure(): void;
    private getAxisOffsetValue;
    private crossAt;
    private updateCrossAt;
    private pushAxis;
    private arrangeAxis;
    private getActualColumn;
    private getActualRow;
    /**
     * Measure the row size.
     *
     * @returns {void}
     */
    private calculateRowSize;
    /**
     * Measure the row size.
     *
     * @param {Rect} rect rect
     * @returns {void}
     */
    private calculateColumnSize;
    /**
     * To render the axis element.
     *
     * @returns {void}
     * @private
     */
    renderAxes(): Element;
    /**
     * To render the axis scrollbar
     *
     * @param {Chart} chart chart
     * @param {Axis} axis axis
     * @returns {void}
     */
    private renderScrollbar;
    /**
     * Draws pane lines for the specified chart.
     *
     * @param {Chart} chart -The chart for which pane lines are to be drawn.
     * @param {Element} [axisElement] -Optional. The axis element to which the pane lines are associated.
     * @returns {void}
     * @private
     */
    drawPaneLines(chart: Chart, axisElement?: Element): void;
    /**
     * Draws an axis for the specified axis configuration.
     *
     * @private
     * @param {Axis} axis -The axis configuration to be drawn.
     * @param {number} index -The index of the axis.
     * @param {boolean} isInside -Indicates whether the axis is inside or outside the plot area.
     * @param {Element} outsideElement -The element where the axis should be drawn if it's outside the plot area.
     * @param {Element} axisElement -The element representing the axis.
     * @param {Element} axisLineElement -The element representing the axis line.
     * @returns {void}
     */
    drawAxis(axis: Axis, index: number, isInside: boolean, outsideElement: Element, axisElement: Element, axisLineElement: Element): void;
    /**
     * To find the axis position
     *
     * @param {Axis} axis axis
     * @returns {boolean} axis position
     * @private
     */
    findAxisPosition(axis: Axis): boolean;
    /**
     * To render the bootom line of the columns and rows
     *
     * @param {Row | Column} definition definition
     * @param {number} index index
     * @param {boolean} isRow isRow
     * @returns {void}
     */
    private drawBottomLine;
    /**
     * To render the axis line
     *
     * @param {Axis} axis axis
     * @param {number} index index
     * @param {number} plotX plotX
     * @param {number} plotY plotY
     * @param {number} plotBottom plotBottom
     * @param {number} plotTop plotTop
     * @param {number} plotLeft plotLeft
     * @param {number} plotRight plotRight
     * @param {Element} parent parent
     * @param {Rect} rect rect
     * @returns {void}
     */
    private drawAxisLine;
    /**
     * To render the yAxis grid line
     *
     * @param {Axis} axis axis
     * @param {number} index index
     * @param {Element} parent parent
     * @param {Rect} rect rect
     * @returns {void}
     */
    private drawYAxisGridLine;
    /**
     * To check the border of the axis
     *
     * @param {Axis} axis axis
     * @param {number} index index
     * @param {number} value value
     * @returns {boolean} check the border of the axis
     */
    private isBorder;
    /**
     * To render the yAxis label
     *
     * @param {Axis} axis axis
     * @param {number} index index
     * @param {Element} parent parent
     * @param {Rect} rect rect
     * @returns {void}
     * @private
     */
    drawYAxisLabels(axis: Axis, index: number, parent: Element, rect: Rect): void;
    /**
     * Animates the template element.
     *
     * @param {Axis} axis axis
     * @param {Element} element - The element to animate.
     * @param {number} duration - The duration of the animation.
     * @param {boolean} label - Label.
     * @param {Rect} bounds - The bounding rectangle.
     * @param {boolean} isRemove isRemoved
     * @param {number} i index of the element
     * @returns {void}
     * @private
     */
    private rangeAnimate;
    /**
     * To get X value based on lineBreakAlignment for Y axis line break labels only.
     *
     * @param {number} x text x position
     * @param {Axis} axis y axis values
     * @param {number} textWidth axis label width
     * @returns {number} returns suitable axis label x position
     */
    private getAxisLabelXvalue;
    /**
     * To render the yAxis label border.
     *
     * @param {Axis} axis axis
     * @param {number} index index
     * @param {Element} parent parent
     * @param {Rect} rect rect
     * @returns {void}
     */
    private drawYAxisBorder;
    /**
     * To render the yAxis title
     *
     * @param {Axis} axis axis
     * @param {number} index index
     * @param {Element} parent parent
     * @param {Rect} rect rect
     * @returns {void}
     */
    private drawYAxisTitle;
    /**
     * xAxis grid line calculation performed here
     *
     * @param {Axis} axis axis
     * @param {number} index index
     * @param {Element} parent parent
     * @param {Rect} rect rect
     * @returns {void}
     */
    private drawXAxisGridLine;
    private calculateGridLineId;
    /**
     * To render missing minor grid lines while zooming
     *
     * @param {Axis} axis axis
     * @param {number} tempInterval tempInterval
     * @param {Rect} rect rect
     * @param {number} i i
     * @param {number} index index
     * @param {IThemeStyle} chartThemeStyle chartThemeStyle
     * @param {Element} parent parent
     * @returns {void}
     */
    private renderMinorGridOnZooming;
    /**
     * To calcualte the axis minor line
     *
     * @param {Axis} axis axis
     * @param {number} tempInterval tempInterval
     * @param {Rect} rect rect
     * @param {number} labelIndex labelIndex
     * @param {boolean} isFirstLabel isFirstLabel
     * @returns {string[]} axis minor line path
     */
    private drawAxisMinorLine;
    /**
     * To find the numeric value of the log
     *
     * @param {Axis} axis axis
     * @param {number} logPosition logPosition
     * @param {number} value value
     * @param {number} labelIndex labelIndex
     * @param {boolean} isFirstLabel isFirstLabel
     * @returns {number} value
     */
    private findLogNumeric;
    /**
     * To render the xAxis Labels
     *
     * @param {Axis} axis axis
     * @param {number} index index
     * @param {Element} parent parent
     * @param {Rect} rect rect
     * @returns {void}
     * @private
     */
    drawXAxisLabels(axis: Axis, index: number, parent: Element, rect: Rect): void;
    /**
     * To render the axis grid, tick lines and label
     *
     * @param {Axis} axis axis
     * @param {number} index index
     * @param {string} gridDirection gridDirection
     * @param {number} i index of the element
     * @param {string} elementId elementId
     * @param {Element} parentElement parent
     * @param {boolean} isRemove isRemoved
     * @param {TextOption} option - The options for the text element.
     * @param {VisibleLabels} label - Label.
     * @returns {void}
     */
    private updateAxisElement;
    private removeAxisLabelElements;
    calculateIntersection(p1: ChartLocation, p2: ChartLocation, p3: ChartLocation, p4: ChartLocation): ChartLocation;
    /**
     * To get text anchor value for line break labels.
     *
     * @param {Axis} axis axis model
     * @returns {string} returns text anchor
     */
    private getAnchor;
    /**
     * Get rect coordinates
     *
     * @param {Rect} rect rect
     * @returns {ChartLocation[]} rectangle points
     */
    private getRectanglePoints;
    /**
     * To get axis label text
     *
     * @param {VisibleLabels} label label
     * @param {Axis} axis axis
     * @param {number} intervalLength intervalLength
     * @returns {string | string[]} label or label collection
     */
    private getLabelText;
    /**
     * To render the x-axis label border.
     *
     * @param {Axis} axis axis
     * @param {number} index index
     * @param {Element} parent parent
     * @param {Rect} axisRect axisRect
     * @returns {void}
     */
    private drawXAxisBorder;
    /**
     * To create border element of the axis
     *
     * @param {Axis} axis axis
     * @param {number} index index
     * @param {string} labelBorder labelBorder
     * @param {Element} parent parent
     * @returns {void}
     */
    private createAxisBorderElement;
    /**
     * To find the axis label of the intersect action
     *
     * @param {Axis} axis axis
     * @param {string} label label
     * @param {number} width width
     * @returns {string} label
     */
    private findAxisLabel;
    /**
     * X-Axis Title function performed
     *
     * @param {Axis} axis axis
     * @param {number} index index
     * @param {Element} parent parent
     * @param {Rect} rect rect
     * @returns {void}
     */
    private drawXAxisTitle;
    /**
     * To render the axis grid and tick lines(Both Major and Minor)
     *
     * @param {Axis} axis axis
     * @param {number} index index
     * @param {string} gridDirection gridDirection
     * @param {MajorTickLinesModel | MinorTickLinesModel | MajorGridLinesModel | MinorGridLinesModel} gridModel gridModel
     * @param {string} gridId gridId
     * @param {number} gridIndex gridIndex
     * @param {Element} parent parent
     * @param {string} themeColor themeColor
     * @param {string} dashArray dashArray
     * @param {number} removeIndex removeIndex
     * @param {boolean} isRemoved isRemoved
     * @returns {void}
     */
    private renderGridLine;
    /**
     * To Find the parent node of the axis
     *
     * @param {string} elementId elementId
     * @param {Element} label label
     * @param {number} index index
     * @returns {Element} parent node of the axis
     */
    private findParentNode;
    /**
     * Create Zooming Labels Function Called here
     *
     * @param {Chart} chart chart
     * @param {Element} labelElement labelElement
     * @param {Axis} axis axis
     * @param {number} index index
     * @param {Rect} rect rect
     * @returns {void}
     */
    private createZoomingLabel;
}
export interface rectPoints {
    x: number;
    y: number;
}
