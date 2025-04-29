import { Chart } from '../chart';
import { Rect } from '@syncfusion/ej2-svg-base';
import { DataLabelSettingsModel } from '../series/chart-series-model';
import { Series, Points } from './chart-series';
/**
 * The `DataLabel` module is used to render data labels for data points.
 */
export declare class DataLabel {
    private chart;
    private margin;
    private isShape;
    private locationX;
    private locationY;
    private fontBackground;
    private borderWidth;
    private markerHeight;
    commonId: string;
    private yAxisInversed;
    private inverted;
    private errorHeight;
    private chartBackground;
    private extraSpace;
    /** @private */
    dataLabelRectCollection: {
        [id: string]: Rect;
    };
    /**
     * Constructor for the data label module.
     *
     * @private
     */
    constructor(chart: Chart);
    private initPrivateVariables;
    private calculateErrorHeight;
    private isRectSeries;
    /**
     * Render the data label for series.
     *
     * @param {Series} series - The series to render.
     * @param {Chart} chart - The parent chart.
     * @param {DataLabelSettingsModel} dataLabel - The settings for data labels.
     * @returns {void}
     * @private
     */
    render(series: Series, chart: Chart, dataLabel: DataLabelSettingsModel): void;
    renderDataLabel(series: Series, point: Points, element: HTMLElement, dataLabel: DataLabelSettingsModel): Element[];
    /**
     * Renders the stack labels for the chart.
     *
     * This method is responsible for displaying cumulative total values on stacked chart segments.
     *
     * @returns {void}
     */
    renderStackLabels(): void;
    /**
     * Retrieves the points of a rectangle.
     *
     * @param {Rect} rect - The rectangle whose points are to be retrieved.
     * @returns {ChartLocation[]} - The points of the rectangle.
     */
    private getRectanglePoints;
    private isDataLabelOverlapWithChartBound;
    /**
     * Creates a template for data labels.
     *
     * @param {HTMLElement} parentElement - The parent element to which the template will be appended.
     * @param {Series} series - The series associated with the data label.
     * @param {DataLabelSettingsModel} dataLabel - The settings for the data label.
     * @param {Points} point - The data point to which the data label is associated.
     * @param {ITextRenderEventArgs} data - The event data associated with rendering the data label.
     * @param {number} labelIndex - The index of the data label.
     * @param {boolean} redraw - Specifies whether to redraw the template.
     * @returns {void}
     */
    private createDataLabelTemplate;
    calculateTemplateLabelSize(parentElement: HTMLElement, childElement: HTMLElement, point: Points, series: Series, dataLabel: DataLabelSettingsModel, labelIndex: number, clip: Rect, redraw: boolean, isReactCallback?: boolean): void;
    private calculateTextPosition;
    private calculatePolarRectPosition;
    /**
     * Gets the location for the data label.
     *
     * @param {Points} point - The data point associated with the label.
     * @param {Series} series - The series associated with the data label.
     * @param {Size} textSize - The size of the text to be displayed in the data label.
     * @param {number} labelIndex - The index of the data label.
     * @returns {ChartLocation} - The location for the data label.
     */
    private getLabelLocation;
    private calculateRectPosition;
    private calculatePathPosition;
    private isDataLabelShape;
    private calculateRectActualPosition;
    private calculateAlignment;
    private calculateTopAndOuterPosition;
    /**
     * Updates the location of the data label.
     *
     * @param {LabelPosition} position - The position of the data label.
     * @param {number} location - The initial location of the data label.
     * @param {number} extraSpace - Extra space to adjust the label position.
     * @param {MarginModel} margin - The margin for the chart.
     * @param {Rect} rect - The rectangle associated with the data label.
     * @param {boolean} top - Indicates whether the label is positioned at the top.
     * @param {boolean} inside - Indicates whether the label is inside the chart area.
     * @returns {number} The updated location of the data label.
     */
    private updateLabelLocation;
    private calculatePathActualPosition;
    /**
     * Initiates the animation for data labels.
     *
     * @param {Series} series - The series associated with the data labels.
     * @param {Element} [element] - The element to animate.
     * @returns {void}
     * @private
     */
    doDataLabelAnimation(series: Series, element?: Element): void;
    private getPosition;
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the dataLabel for series.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
