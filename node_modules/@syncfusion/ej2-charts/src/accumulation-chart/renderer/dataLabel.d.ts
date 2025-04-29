import { Rect, Size } from '@syncfusion/ej2-svg-base';
import { AccPoints, AccumulationSeries } from '../model/acc-base';
import { IAccTextRenderEventArgs } from '../model/pie-interface';
import { AccumulationDataLabelSettingsModel } from '../model/acc-base-model';
import { AccumulationChart } from '../accumulation';
import { AccumulationBase } from './accumulation-base';
/**
 * The `AccumulationDataLabel` module is used to render data labels for the Accumulation chart.
 */
export declare class AccumulationDataLabel extends AccumulationBase {
    /** @private */
    titleRect: Rect;
    /** @private */
    areaRect: Rect;
    /** @private */
    clearTooltip: number;
    private id;
    marginValue: number;
    /**
     * This varaible indicated the change of angle direction.
     * Such as increase/decrease the label angle while doing smart label arrangements.
     */
    private isIncreaseAngle;
    private rightSideRenderingPoints;
    private leftSideRenderingPoints;
    constructor(accumulation: AccumulationChart);
    /**
     * Method to get datalabel text location.
     *
     * @private
     * @param {AccPoints} point - The data point for which to calculate the label text location.
     * @param {AccumulationDataLabelSettingsModel} dataLabel - The data label settings for the series.
     * @param {Size} textSize - The size of the text to be displayed.
     * @param {AccPoints[]} points - The array of data points in the series.
     * @returns {void}
     */
    getDataLabelPosition(point: AccPoints, dataLabel: AccumulationDataLabelSettingsModel, textSize: Size, points: AccPoints[]): void;
    /**
     * Method to get datalabel bound.
     */
    private getLabelRegion;
    /**
     * Method to get data label collection.
     *
     * @param {AccPoints} point - The data point for which to calculate the label collection.
     * @param {AccumulationDataLabelSettingsModel} dataLabel - The data label settings for the series.
     * @returns {void}
     * @private
     */
    calculateLabelCollection(point: AccPoints, dataLabel: AccumulationDataLabelSettingsModel): void;
    /**
     * To calculate label collection text size.
     *
     * @param {string[]} labelCollection - The collection of label texts.
     * @param {AccumulationDataLabelSettingsModel} dataLabel - The data label settings for the series.
     * @returns {Size} - The size of the label text collection.
     * @private
     */
    getTextSize(labelCollection: string[], dataLabel: AccumulationDataLabelSettingsModel): Size;
    /**
     * Method to get datalabel smart position.
     *
     * @param {AccPoints} point - The data point for which to calculate the label smart position.
     * @param {AccumulationDataLabelSettingsModel} dataLabel - The data label settings for the series.
     * @param {Size} textSize - The size of the text.
     * @param {AccPoints[]} points - The collection of data points.
     * @returns {void}
     */
    private getSmartLabel;
    /**
     * To find trimmed datalabel tooltip needed.
     *
     * @param {Event} e - The move event.
     * @param {number} x - The x-coordinate.
     * @param {number} y - The y-coordinate.
     * @param {boolean} isTouch - Indicates if the interaction is touch-based.
     * @returns {void}
     * @private
     */
    move(e: Event, x: number, y: number, isTouch?: boolean): void;
    /**
     * To find previous valid label point.
     *
     * @param {AccPoints[]} points - The array of accumulation points.
     * @param {number} index - The index of the current point.
     * @param {AccumulationLabelPosition} position - The position of the label.
     * @returns {AccPoints} - Find the previous value of accumulation point.
     */
    private findPreviousPoint;
    /**
     * To find current point datalabel is overlapping with other points.
     *
     * @param {AccPoints} currentPoint - The current point.
     * @param {AccPoints[]} points - The array of accumulation points.
     * @returns {boolean} - It returns boolean value of overlapping.
     */
    private isOverlapping;
    /**
     * To get text trimmed while exceeds the accumulation chart area.
     *
     * @param {AccPoints} point - The accumulation point.
     * @param {Rect} rect - The area of the accumulation chart.
     * @param {FontModel} font - The font settings.
     * @param {string} position - The position of the data label.
     * @param {AccumulationDataLabelSettingsModel} dataLabel - The data label settings.
     * @returns {void}
     */
    private textTrimming;
    /**
     * To set point label visible and region to disable.
     *
     * @param {AccPoints} point - The accumulation point.
     * @returns {void}
     */
    private setPointVisibileFalse;
    /**
     * To set point label visible to enable.
     *
     * @param {AccPoints} point - The accumulation point.
     * @returns {void}
     */
    private setPointVisibleTrue;
    /**
     * To set datalabel angle position for outside labels.
     *
     * @param {AccPoints} previousPoint - The previous accumulation point.
     * @param {AccPoints} point - The accumulation point.
     * @param {number} border - The border size.
     * @param {number} labelRadius - The radius for the labels.
     * @param {Size} textsize - The size of the labels.
     * @param {number} margin - The margin value.
     * @returns {void}
     */
    private setOuterSmartLabel;
    /**
     * Sets smart label positions for funnel and pyramid series.
     *
     * @param {AccPoints} point - The accumulation point.
     * @param {AccPoints} prevPoint - The previous point.
     * @returns {void} setSmartLabelForSegments.
     */
    private setSmartLabelForSegments;
    /**
     * To find connector line overlapping.
     *
     * @param {AccPoints} point - The accumulation point.
     * @param {AccPoints} previous - The previous point.
     * @returns {boolean} - To find connector line overlapping or not.
     */
    private isConnectorLineOverlapping;
    /**
     * To find two rectangle intersect.
     *
     * @param {ChartLocation} line1 - The first line.
     * @param {ChartLocation} line2 - The second line.
     * @param {Rect} rect - The rectangle to check against.
     * @returns {boolean} - To find line rectangle intersect value.
     */
    private isLineRectangleIntersect;
    /**
     * To find two line intersect.
     *
     * @param {ChartLocation} point1 - The first point of the first line.
     * @param {ChartLocation} point2 - The second point of the first line.
     * @param {ChartLocation} point11 - The first point of the second line.
     * @param {ChartLocation} point12 - The second point of the second line.
     * @returns {boolean} - To find line intersect or not.
     */
    private isLinesIntersect;
    /**
     * To get two rectangle overlapping angles.
     *
     * @param {Rect} first - The first rectangle.
     * @param {Rect} second - The second rectangle.
     * @param {number} angle - The angle.
     * @param {number} padding - The padding.
     * @returns {number} - Get overlapped angle.
     */
    private getOverlappedAngle;
    /**
     * To get connector line path.
     *
     * @param {Rect} label - The label.
     * @param {AccPoints} point - The accumulation point.
     * @param {AccumulationDataLabelSettingsModel} dataLabel - The data label settings.
     * @param {number} end - The end.
     * @returns {string} - Get connector line path.
     */
    private getConnectorPath;
    /**
     * Finds the curved path for funnel/pyramid data label connectors.
     *
     * @param {ChartLocation} start - The start location.
     * @param {ChartLocation} end - The end location.
     * @returns {string} - Get poly line path.
     */
    private getPolyLinePath;
    /**
     * Finds the bezier point for funnel/pyramid data label connectors.
     *
     * @param {number} t - The parameter value.
     * @param {ChartLocation[]} controlPoints - The control points for the bezier point.
     * @param {number} index - The index of the point.
     * @param {number} count - The total count of points.
     * @returns {ChartLocation} - Get bazier point.
     */
    private getBezierPoint;
    /**
     * To get label edges based on the center and label rect position.
     *
     * @param {Rect} labelshape - The label shape.
     * @param {number} angle - The angle of the label.
     * @param {ChartLocation} middle - The middle point of the label.
     * @param {number} border - The border value.
     * @param {AccPoints} point - The accumulation point.
     * @returns {ChartLocation} - Get label edge value.
     */
    private getEdgeOfLabel;
    /**
     * Finds the distance between the label position and the edge/center of the funnel/pyramid.
     *
     * @param {AccPoints} point - The accumulation point.
     * @param {AccumulationDataLabelSettingsModel} dataLabel - The data label settings.
     * @returns {number} - Get label distance.
     */
    private getLabelDistance;
    /**
     * Finds the label position / beginning of the connector(ouside funnel labels).
     *
     * @param {AccPoints} point - The accumulation point.
     * @param {AccumulationLabelPosition | string} position - The data label position.
     * @returns {ChartLocation} - Get label location.
     */
    private getLabelLocation;
    /**
     * Finds the beginning of connector line.
     *
     * @param {AccPoints} point - The accumulation point.
     * @param {ConnectorModel} connector - The connector line.
     * @returns {ChartLocation} - Staring point of connector line.
     */
    private getConnectorStartPoint;
    /**
     * To find area rect based on margin, available size.
     *
     * @private
     * @returns {void}
     */
    findAreaRect(): void;
    /**
     * To render the data labels from series points.
     *
     * @param {AccPoints} point - The point for which to render the data label.
     * @param {AccumulationDataLabelSettingsModel} dataLabel - The settings for the data labels.
     * @param {Element} parent - The parent element to which the data labels are appended.
     * @param {AccPoints[]} points - The collection of points in the series.
     * @param {number} series - The index of the series.
     * @param {HTMLElement} templateElement - The template element for the data label.
     * @param {boolean} redraw - Indicates whether the data labels are being redrawn.
     * @returns {void}
     * @private
     */
    renderDataLabel(point: AccPoints, dataLabel: AccumulationDataLabelSettingsModel, parent: Element, points: AccPoints[], series: number, templateElement?: HTMLElement, redraw?: boolean): void;
    private getDatalabelText;
    /**
     * To calculate label size.
     *
     * @param {boolean} isTemplate - Indicates whether the label is a template.
     * @param {HTMLElement} childElement - The child element of the label.
     * @param {AccPoints} point - The point associated with the label.
     * @param {AccPoints[]} points - The collection of points.
     * @param {IAccTextRenderEventArgs} argsData - The arguments data for text rendering.
     * @param {Element} datalabelGroup - The group element for data labels.
     * @param {string} id - The id of the label.
     * @param {AccumulationDataLabelSettingsModel} dataLabel - The settings for the data labels.
     * @param {boolean} redraw - Indicates whether the labels are being redrawn.
     * @param {ClientRect} clientRect - The client rectangle.
     * @param {boolean} isReactCallback - Indicates whether a React callback is being used.
     * @returns {void}
     * @private
     */
    calculateLabelSize(isTemplate: boolean, childElement: HTMLElement, point: AccPoints, points: AccPoints[], argsData: IAccTextRenderEventArgs, datalabelGroup: Element, id: string, dataLabel: AccumulationDataLabelSettingsModel, redraw?: boolean, clientRect?: ClientRect, isReactCallback?: boolean): void;
    /**
     * To draw a data label.
     *
     * @param {AccumulationSeries} series - The series associated with the data label.
     * @param {AccumulationDataLabelSettingsModel} dataLabel - The settings for the data labels.
     * @param {HTMLElement} parent - The parent element of the data labels.
     * @param {HTMLElement} templateElement - The template element for the data label.
     * @param {boolean} redraw - Indicates whether the data labels are being redrawn.
     * @returns {void}
     * @private
     */
    drawDataLabels(series: AccumulationSeries, dataLabel: AccumulationDataLabelSettingsModel, parent: HTMLElement, templateElement?: HTMLElement, redraw?: boolean): void;
    /**
     * To calculate data label clip path.
     *
     * @param {AccumulationDataLabelSettingsModel} dataLabel - The settings for the data labels.
     * @param {HTMLElement} parent - The parent element of the data labels.
     * @returns {void}
     */
    private dataLabelClipPath;
    /**
     * In this method datalabels region checked with legebdBounds and areaBounds.
     * Trimming of datalabel and point's visibility again changed here.
     *
     * @param {AccPoints} point - Current point in which trimming and visibility to be checked.
     * @param {AccPoints[]} points - Finalized points.
     * @param {AccumulationDataLabelSettingsModel} dataLabel - Datalabel model.
     * @returns {void}
     */
    private finalizeDatalabels;
    /**
     * To find the template element size.
     *
     * @param {HTMLElement} element - To get a template element.
     * @param {AccPoints} point - The accumulation point for the template.
     * @param {IAccTextRenderEventArgs} argsData - The arguments for the accumulation points.
     * @param {boolean} redraw - Indicates whether to redraw the template.
     * @param {boolean} isTemplate - Indicates whether the element is a template.
     * @param {AccPoints[]} points - The accumulation points for the template.
     * @param {Element} datalabelGroup - The group element for the data labels.
     * @param {string} id - The identifier for the template.
     * @param {AccumulationDataLabelSettingsModel} dataLabel - The settings for the data labels.
     * @returns {Size} - The size of the template.
     */
    private getTemplateSize;
    /**
     * To set the template element style.
     *
     * @param {HTMLElement} childElement - The child element of the template.
     * @param {AccPoints} point - The point data for the template.
     * @param {Element} parent - The parent element of the template.
     * @param {string} labelColor - The color of the label in the template.
     * @param {string} fill - The fill color of the template.
     * @param {boolean} redraw - Indicates whether to redraw the template.
     * @returns {void}
     */
    private setTemplateStyle;
    /**
     * To find saturated color for datalabel
     *
     * @param {AccPoints} point - The accumulation point.
     * @param {string} color - The original color.
     * @returns {string} - Get a saturated color.
     */
    private getSaturatedColor;
    /**
     * Animates the data label template.
     *
     * @param {AccumulationChart} accumulation - The accumulation chart control.
     * @param {Element} element - The element to animate.
     * @returns {void}
     * @private
     */
    doTemplateAnimation(accumulation: AccumulationChart, element: Element): void;
    /**
     * To find background color for the datalabel.
     *
     * @param {AccPoints} point - The data point for which to determine the background color.
     * @returns {string} - The background color for the data label.
     */
    private getLabelBackground;
    /**
     * To correct the padding between datalabel regions.
     *
     * @param {Rect} labelRegion - The region occupied by the data label.
     * @param {Size} textSize - The size of the text within the data label.
     * @param {number} padding - The padding value to adjust the spacing.
     * @returns {void}
     */
    private correctLabelRegion;
    /**
     * To get the dataLabel module name.
     *
     * @returns {string} - Returns the module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the data label.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
    private extendedLabelsCalculation;
    /**
     * Rightside points alignments calculation.
     *
     * @param {AccumulationSeries} series - To get a proper series.
     * @returns {void}
     */
    private arrangeRightSidePoints;
    /**
     * Leftside points alignments calculation.
     *
     * @param {AccumulationSeries} series - To get a proper series.
     * @returns {void}
     */
    private arrangeLeftSidePoints;
    private decreaseAngle;
    private increaseAngle;
    private changeLabelAngle;
    private isOverlapWithPrevious;
    private isOverlapWithNext;
    private skipPoints;
    private getPerpendicularDistance;
}
