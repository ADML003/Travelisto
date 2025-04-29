/**
 * Defines the common behavior of funnel and pyramid series
 */
import { AccPoints, AccumulationSeries } from '../model/acc-base';
import { ChartLocation } from '../../common/utils/helper';
import { AccumulationChart } from '../accumulation';
import { AccumulationLabelPosition } from '../model/enum';
import { AccumulationBase } from './accumulation-base';
/**
 * The `TriangularBase` module is used to calculate base functions for funnel and pyramid series.
 *
 * @private
 */
export declare class TriangularBase extends AccumulationBase {
    /**
     * Initializes the properties of funnel/pyramid series.
     *
     * @private
     * @param {AccumulationChart} chart - The accumulation chart control.
     * @param {AccumulationSeries} series - The series for which to initialize properties.
     * @returns {void}
     */
    initProperties(chart: AccumulationChart, series: AccumulationSeries): void;
    /**
     * Initializes the size of the pyramid/funnel segments.
     *
     * @private
     * @param {AccPoints[]} points - The points to initialize the segment size.
     * @param {AccumulationSeries} series - The series for which to initialize properties.
     * @param {boolean} reverse - Indicates whether the pyramid/funnel segments should be reversed.
     * @returns {void}
     */
    protected initializeSizeRatio(points: AccPoints[], series: AccumulationSeries, reverse?: boolean): void;
    /**
     * Marks the label location from the set of points that forms a pyramid/funnel segment.
     *
     * @private
     * @param {AccumulationSeries} series - The series for which to mark label locations.
     * @param {AccPoints} point - The point to mark the label location.
     * @param {ChartLocation[]} points - The set of points that forms a pyramid/funnel segment.
     * @returns {void}
     */
    protected setLabelLocation(series: AccumulationSeries, point: AccPoints, points: ChartLocation[]): void;
    /**
     * Finds the path to connect the list of points.
     *
     * @param {ChartLocation[]} locations - An array of ChartLocation objects representing the points to connect.
     * @param {AccPoints} point - The current AccPoints object containing the data point information.
     * @param {string} path - The initial path string to be modified.
     * @param {number} firstIndex - The index of the first point in the path.
     * @param {number} lastIndex - The index of the last point in the path.
     * @param {AccumulationSeries} series - The series object of the Accumulation.
     * @returns {string} - This string represent the path value of the D attribute.
     * @Private
     */
    protected getPath(locations: ChartLocation[], point: AccPoints, path: string, firstIndex: number, lastIndex: number, series: AccumulationSeries): string;
    /**
     * Creates a path to connect a list of points.
     *
     * @param {ChartLocation[]} locations - An array of ChartLocation objects representing the points to connect.
     * @param {AccPoints} point - The current AccPoints object containing the data point information.
     * @param {AccumulationSeries} series - The series object of the Accumulation.
     * @returns {string} - This string represent the path value of the D attribute.
     * @Private
     */
    protected findPath(locations: ChartLocation[], point?: AccPoints, series?: AccumulationSeries): string;
    /**
     * To calculate data-label bounds.
     *
     * @private
     * @param {AccumulationSeries} series - The series for which to calculate data-label bounds.
     * @param {boolean} visible - Specifies whether the data-labels are visible.
     * @param {AccumulationLabelPosition} position - The position of the data-labels.
     * @param {AccumulationChart} chart - The accumulation chart control.
     * @returns {void}
     */
    defaultLabelBound(series: AccumulationSeries, visible: boolean, position: AccumulationLabelPosition, chart: AccumulationChart): void;
}
