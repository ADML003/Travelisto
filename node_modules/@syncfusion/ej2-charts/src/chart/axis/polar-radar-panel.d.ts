import { Chart } from '../chart';
import { Axis, Row, Column } from '../axis/axis';
import { Size, Rect } from '@syncfusion/ej2-svg-base';
import { LineBase } from '../series/line-base';
/**
 * Specifies the layout for polar axis panels.
 *
 * @private
 */
export declare class PolarRadarPanel extends LineBase {
    private initialClipRect;
    private htmlObject;
    private element;
    centerX: number;
    centerY: number;
    startAngle: number;
    /** @private */
    visibleAxisLabelRect: Rect[];
    /** @private */
    seriesClipRect: Rect;
    /**
     * Measure the polar radar axis size.
     *
     * @returns {void}
     * @private
     */
    measureAxis(rect: Rect): void;
    private measureRowAxis;
    private measureColumnAxis;
    /**
     * Measures the column and row in the chart.
     *
     * @param {Row | Column} definition - The row or column to measure.
     * @param {Chart} chart - The chart instance.
     * @param {Size} size - The size of the chart.
     * @returns {void}
     * @private
     */
    measureDefinition(definition: Row | Column, chart: Chart, size: Size): void;
    /**
     * Measure the axis.
     *
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
    /**
     * Measure the row size.
     *
     * @returns {void}
     */
    private calculateRowSize;
    /**
     * Measure the row size.
     *
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
    private drawYAxisLine;
    drawYAxisLabels(axis: Axis, index: number): void;
    private drawYAxisGridLine;
    private renderRadarGrid;
    private drawXAxisGridLine;
    private drawAxisMinorLine;
    /**
     * To render the axis label.
     *
     * @param {Axis} axis axis
     * @param {number} index index
     * @returns {void}
     * @private
     */
    drawXAxisLabels(axis: Axis, index: number): void;
    /**
     * To get available space to trim.
     *
     * @param {Rect} legendRect legendRect
     * @param {Rect} labelRect labelRect
     * @returns {number} available space value
     */
    private getAvailableSpaceToTrim;
    /**
     * Getting axis label bounds
     *
     * @param {number} pointX pointX
     * @param {number} pointY pointY
     * @param {VisibleLabels} label label
     * @param {string} anchor anchor
     * @returns {Rect} label region
     */
    private getLabelRegion;
    private renderTickLine;
    private renderGridLine;
    private setPointerEventNone;
}
