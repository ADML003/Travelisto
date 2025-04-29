import { BulletChart } from '../bullet-chart';
/**
 * Class for Bullet chart axis
 */
export declare class BulletChartAxis {
    bulletChart: BulletChart;
    private labelOffset;
    private labelSize;
    private isHorizontal;
    private isVertical;
    private isLabelBelow;
    private isLabelsInside;
    private majorTickSize;
    private length;
    private isLeft;
    private isRight;
    private isTop;
    private location;
    private rangeCollection;
    /** @private */
    format: Function;
    constructor(bullet: BulletChart);
    renderMajorTickLines(intervalValue: number, scale: Element): void;
    renderMinorTickLines(intervalValue: number, scale: Element): void;
    renderAxisLabels(intervalValue: number, scale: Element): void;
    /**
     * To render grid lines of bullet chart axis.
     *
     * @param {number} intervalValue - The interval value between minor grid lines.
     * @param {Element} scale - The scale element to which the minor grid lines will be appended.
     * @returns {void}
     */
    renderXMajorTickLines(intervalValue: number, scale: Element): void;
    /**
     * To render grid lines of bullet chart axis.
     *
     * @param {number} intervalValue - The interval value between minor grid lines.
     * @param {Element} scale - The scale element to which the minor grid lines will be appended.
     * @returns {void}
     */
    renderYMajorTickLines(intervalValue: number, scale: Element): void;
    private majorTicks;
    private bindingRangeStrokes;
    /**
     * To render minor tick lines of bullet chart.
     *
     * @param {number} intervalValue - The interval value between minor tick lines.
     * @param {Element} scaleGroup - The group element to which the minor tick lines will be appended.
     * @returns {void}
     */
    renderXMinorTickLines(intervalValue: number, scaleGroup: Element): void;
    /**
     * To render minor tick lines of bullet chart.
     *
     * @param {number} intervalValue - The interval value between minor tick lines.
     * @param {Element} scaleGroup - The group element to which the minor tick lines will be appended.
     * @returns {void}
     */
    renderYMinorTickLines(intervalValue: number, scaleGroup: Element): void;
    private minorXTicks;
    private forwardStrokeBinding;
    private backwardStrokeBinding;
    /**
     * To render axis labels of bullet chart.
     *
     * @param {number} intervalValue - The interval value between axis labels.
     * @param {Element} scaleGroup - The group element to which the axis labels will be appended.
     * @returns {void}
     */
    renderXAxisLabels(intervalValue: number, scaleGroup: Element): void;
    private labelXOptions;
    /**
     * To render axis labels of bullet chart.
     *
     * @param {number} intervalValue - The interval value between the axis labels.
     * @param {Element} scaleGroup - The scale group element to render the axis labels.
     * @returns {void}
     */
    renderYAxisLabels(intervalValue: number, scaleGroup: Element): void;
    /**
     * Format of the axis label.
     *
     * @private
     */
    getFormat(axis: BulletChart): string;
    /**
     * Formatted the axis label.
     *
     * @private
     */
    formatValue(axis: BulletChartAxis, isCustom: boolean, format: string, tempInterval: number): string;
}
