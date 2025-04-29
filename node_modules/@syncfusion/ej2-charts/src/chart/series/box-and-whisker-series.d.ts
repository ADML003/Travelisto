import { ChartLocation } from '../../common/utils/helper';
import { Series, Points } from './chart-series';
import { ColumnBase } from './column-base';
import { IPointRenderEventArgs } from '../../chart/model/chart-interface';
import { BoxPlotMode } from '../utils/enum';
import { Axis } from '../../chart/axis/axis';
/**
 * The `BoxAndWhiskerSeries` module is used to render the box and whisker series.
 */
export declare class BoxAndWhiskerSeries extends ColumnBase {
    private sideBySideInfo;
    /**
     * Renders the BoxAndWhisker series on the chart.
     *
     * @param {Series} series - The series to be rendered.
     * @param {Axis} xAxis - The X-axis associated with the series.
     * @param {Axis} yAxis - The Y-axis associated with the series.
     * @param {boolean} isInverted - Indicates whether the chart is inverted or not.
     * @returns {void}
     * @private
     */
    render(series: Series, xAxis: Axis, yAxis: Axis, isInverted: boolean): void;
    /**
     * update the tip region fo box plot
     *
     * @param {Series} series series
     * @param {Points} point point
     * @param {DoubleRange} sideBySideInfo sideBySideInfo
     * @returns {void}
     */
    private updateTipRegion;
    /**
     * Update tip size to tip regions
     *
     * @param {Series} series Series
     * @param {Points} point Points
     * @param {Rect} region rect region
     * @param {boolean} isInverted isInverted
     * @returns {void}
     */
    private updateTipSize;
    private renderPoint;
    /**
     * Updates the direction of rendering for the specified series.
     *
     * @param {Series} series - The series to be rendered.
     * @param {number[]} point - The point to be updated.
     * @param {boolean} isInverted - Specifies the inverted axis.
     * @returns {void}
     * @private
     */
    updateDirection(series: Series, point: number[], isInverted: boolean): void;
    /**
     * Calculation for path direction performed here.
     *
     * @param {Points} point point
     * @param {Series} series series
     * @param {ChartLocation} median median
     * @param {ChartLocation} average average
     * @returns {string} direction
     * @private
     */
    getPathString(point: Points, series: Series, median: ChartLocation, average: ChartLocation): string;
    /**
     * Rendering for box and whisker append here.
     *
     * @param {Series} series series
     * @param {Points} point point
     * @param {IPointRenderEventArgs} argsData argsData
     * @param {string} direction path direction
     * @param {number} median median
     * @returns {void}
     * @private
     */
    renderBoxAndWhisker(series: Series, point: Points, argsData: IPointRenderEventArgs, direction: string, median: number): void;
    /**
     * To find the box plot values.
     *
     * @param {number[]} yValues yValues
     * @param {Points} point point
     * @param {BoxPlotMode} mode mode
     * @param {boolean} showOutliers - Specifies to show or hide the outliers in a box-and-whisker series type.
     * @returns {void}
     * @private
     */
    findBoxPlotValues(yValues: number[], point: Points, mode: BoxPlotMode, showOutliers: boolean): void;
    /**
     * to find the exclusive quartile values
     *
     * @param {number[]} yValues yValues
     * @param {number} count count
     * @param {number} percentile percentile
     * @returns {number} exclusive quartile value
     */
    private getExclusiveQuartileValue;
    /**
     * to find the inclusive quartile values
     *
     * @param {number[]} yValues yValues
     * @param {number} count count
     * @param {number} percentile percentile
     * @returns {number} inclusive quartile value
     */
    private getInclusiveQuartileValue;
    /**
     * To find the quartile values
     *
     * @param {number[]} yValues yValues
     * @param {number} count count
     * @param {IBoxPlotQuartile} quartile quartile
     * @returns {void}
     */
    private getQuartileValues;
    /**
     * To find the min, max and outlier values
     *
     * @param {number[]} yValues yValues
     * @param {number} count count
     * @param {IBoxPlotQuartile} quartile quartile
     * @param {boolean} showOutliers - Specifies to show or hide the outliers in a box-and-whisker series type.
     * @returns {void}
     */
    private getMinMaxOutlier;
    /**
     * Animates the series.
     *
     * @param  {Series} series - Defines the series to animate.
     * @returns {void}
     * @private
     */
    doAnimation(series: Series): void;
    /**
     * Get module name.
     *
     * @returns {string} module name
     */
    protected getModuleName(): string;
    /**
     * To destroy the candle series.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
