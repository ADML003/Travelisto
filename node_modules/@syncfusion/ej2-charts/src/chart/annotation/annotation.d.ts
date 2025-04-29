import { Chart } from '../../chart/chart';
import { ChartAnnotationSettings } from './../model/chart-base';
import { AnnotationBase } from '../../common/annotation/annotation';
/**
 * The `ChartAnnotation` module handles annotations for the chart.
 */
export declare class ChartAnnotation extends AnnotationBase {
    private chart;
    private annotations;
    private parentElement;
    /**
     * Constructor for chart annotation.
     *
     * @private
     * @param {Chart} control - The chart control instance.
     * @param {ChartAnnotationSettings[]} annotations - The array of annotation settings.
     */
    constructor(control: Chart, annotations: ChartAnnotationSettings[]);
    /**
     * Method to render the annotation for chart
     *
     * @param {Element} element - annotation element.
     * @returns {void}
     * @private
     */
    renderAnnotations(element: Element): void;
    /**
     * To destroy the annotation.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    protected getModuleName(): string;
}
