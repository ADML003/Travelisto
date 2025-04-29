import { Sparkline } from '../index';
import { SparkValues } from '../utils/helper';
/**
 * Sparkline rendering calculation file
 */
export declare class SparklineRenderer {
    /**
     * To process sparkline instance internally.
     */
    private sparkline;
    private min;
    private maxLength;
    private unitX;
    private unitY;
    private axisColor;
    private axisWidth;
    private axisValue;
    private clipId;
    /**
     * To get visible points options internally.
     *
     * @private
     */
    visiblePoints: SparkValues[];
    private axisHeight;
    /**
     * To process highpoint index color for tooltip customization
     *
     * @private
     */
    highPointIndex: number;
    /**
     * To process low point index color for tooltip customization
     *
     * @private
     */
    lowPointIndex: number;
    /**
     * To process start point index color for tooltip customization
     *
     * @private
     */
    startPointIndex: number;
    /**
     * To process end point index color for tooltip customization
     *
     * @private
     */
    endPointIndex: number;
    /**
     * To process negative point index color for tooltip customization
     *
     * @private
     */
    negativePointIndexes: number[];
    /**
     * Sparkline data calculations.
     *
     * @param {Sparkline} sparkline - The Sparkline control.
     */
    constructor(sparkline: Sparkline);
    /**
     * To process the sparkline data.
     *
     * @returns {void}
     */
    processData(): void;
    processDataManager(): void;
    /**
     * To process sparkline category data.
     *
     * @param {Object[]} data - The data array to process.
     * @param {string} x - The name of the x-field.
     * @param {string} y - The name of the y-field.
     * @returns {void}
     */
    private processCategory;
    /**
     * To process sparkline DateTime data.
     *
     * @param {Object[]} data - The data array to process.
     * @param {string} x - The name of the x-field.
     * @param {string} y - The name of the y-field.
     * @returns {void}
     */
    private processDateTime;
    /**
     * To render sparkline series.
     *
     * @private
     * @returns {void}
     */
    renderSeries(): void;
    /**
     * To render a range band.
     *
     * @param {RangeBandSettingsModel} rangeBandSettings - The settings for the range band.
     * @param {Element} group - The group element to render the range band.
     * @param {number} index - The index of the range band.
     * @returns {void}
     */
    private rangeBand;
    /**
     * To render line series.
     *
     * @param {SparkValues[]} points - The data points for the line series.
     * @param {ISeriesRenderingEventArgs} args - The rendering event arguments.
     * @returns {void}
     */
    private renderLine;
    /**
     * To render pie series.
     *
     * @param {SparkValues[]} points - The data points for the pie series.
     * @param {ISeriesRenderingEventArgs} args - The rendering event arguments.
     * @returns {void}
     */
    private renderPie;
    /**
     * To get special point color and option for Pie series.
     *
     * @param {SparkValues} temp - The data point for the special point.
     * @param {Sparkline} spark - The sparkline instance.
     * @param {PathOption} option - The option for the special point.
     * @param {number} i - The index of the special point.
     * @param {number} high - The high value.
     * @param {number} low - The low value.
     * @param {number} length - The total number of data points.
     * @returns {void}
     */
    private getPieSpecialPoint;
    /**
     * To render area series.
     *
     * @param {SparkValues[]} points - The data points for the area series.
     * @param {ISeriesRenderingEventArgs} args - The rendering event arguments.
     * @returns {void}
     */
    private renderArea;
    /**
     * To render column series.
     *
     * @param {SparkValues[]} points - The data points for the column series.
     * @param {ISeriesRenderingEventArgs} args - The rendering event arguments.
     * @returns {void}
     */
    private renderColumn;
    /**
     * To render WinLoss series.
     *
     * @param {SparkValues[]} points - The data points for the winloss series.
     * @param {ISeriesRenderingEventArgs} args - The rendering event arguments.
     * @returns {void}
     */
    private renderWinLoss;
    private renderMarker;
    /**
     * To get special point color and option.
     *
     * @param {boolean} render - Indicates whether to render the special point.
     * @param {SparkValues} temp - The data point for the special point.
     * @param {Sparkline} spark - The sparkline instance.
     * @param {PathOption} option - The option for the special point.
     * @param {number} i - The index of the special point.
     * @param {number} highPos - The position of the high value.
     * @param {number} lowPos - The position of the low value.
     * @param {number} length - The total number of data points.
     * @param {string} visible - The visibility state of the special point.
     * @returns {boolean} - Indicates whether the special point is rendered.
     */
    private getSpecialPoint;
    /**
     * To render data label for sparkline.
     *
     * @param {SparkValues[]} points - The data points for the series datalabels.
     * @returns {void}
     */
    private renderLabel;
    private arrangeLabelPosition;
    /**
     * To get special point color and option.
     *
     * @param {boolean} render - Indicates whether to render the special point.
     * @param {SparkValues} temp - The data point for the special point.
     * @param {number} i - The index of the sparkline instance.
     * @param {SparklineDataLabelSettingsModel} label - The options for the special point.
     * @param {number} length - The total number of data points.
     * @param {number} highPos - The position of the high value.
     * @param {number} lowPos - The position of the low value.
     * @returns {boolean} - Indicates whether the special point is rendered.
     */
    private getLabelVisible;
    /**
     * To format text.
     *
     * @param {string} format - The format string to apply.
     * @param {object} data - The data object to format.
     * @returns {string} - The formatted text.
     */
    private formatter;
    /**
     * To calculate min and max for x and y axis.
     *
     * @returns {void}
     */
    private axisCalculation;
    /**
     * To find x axis interval.
     *
     * @param {Object[]} data - The data points.
     * @param {string} x - The x-axis field name.
     * @returns {number} - The calculated interval.
     */
    private getInterval;
    /**
     * To find x axis interval for padding.
     *
     * @param {Object[]} data - The data points.
     * @param {string} x - The x-axis field name.
     * @param {SparklineValueType} type - The type of sparkline value.
     * @param {number} delta - The delta values.
     * @returns {number} - The calculated x-axis interval for padding.
     */
    private getPaddingInterval;
    /**
     * To calculate axis ranges internally.
     *
     * @param {Object[]} data - The data points.
     * @returns {void}
     */
    private findRanges;
    /**
     * To render the sparkline axis.
     *
     * @returns {void}
     */
    private drawAxis;
    /**
     * To trigger point render event.
     *
     * @param {string} name - The name of the data point.
     * @param {number} i - The index of the data point.
     * @param {string} fill - The fill color of the data point.
     * @param {SparklineBorderModel} border - The border settings of the data point.
     * @returns {ISparklinePointEventArgs} - The event arguments for the point render event.
     */
    private triggerPointRender;
}
