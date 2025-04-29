import { Chart } from '../chart';
import { PointData, AccPointData, Point3D } from '../../common/utils/helper';
import { Series } from '../series/chart-series';
import { Tooltip } from '../user-interaction/tooltip';
import { Crosshair } from '../user-interaction/crosshair';
/**
 * The `ChartData` class is used to retrieve data on mouse move events in a chart.
 *
 * @private
 */
export declare class ChartData {
    /** @private */
    chart: Chart;
    lierIndex: number;
    /** @private */
    currentPoints: PointData[] | AccPointData[] | Point3D[];
    /** @private */
    previousPoints: PointData[] | AccPointData[] | Point3D[];
    insideRegion: boolean;
    commonXvalues: number[];
    /**
     * Constructor for the data.
     *
     * @private
     */
    constructor(chart: Chart);
    /**
     * Method to get the Data.
     *
     * @private
     */
    getData(): PointData;
    isSelected(chart: Chart): boolean;
    private getRectPoint;
    /**
     * Checks if the given point is contained within any of the regions defined by the array of rectangles.
     *
     * @param {Rect[]} regionRect - The array of rectangles defining the regions.
     * @param {Rect} rect - The rectangle to check against the regions.
     * @param {number} x - The x-coordinate of the point.
     * @param {number} y - The y-coordinate of the point.
     * @returns {boolean} - True if the point is contained within any of the regions, otherwise false.
     */
    private checkRegionContainsPoint;
    /**
     * Checks if the given point is within the threshold region of a data point.
     *
     * @param {number} x - The x-coordinate of the point to check.
     * @param {number} y - The y-coordinate of the point to check.
     * @param {Points} point - The data point.
     * @param {Rect} rect - The rectangle representing the threshold region.
     * @param {Series} series - The series to which the data point belongs.
     * @returns {boolean} - True if the point is within the threshold region, otherwise false.
     */
    private isPointInThresholdRegion;
    /**
     * Gets the index of the closest data point to the given value in the series.
     *
     * @param {Series} series - The series.
     * @param {number} value - The value to which the closest data point is sought.
     * @param {number[]} [xvalues] - The x-values of the data points.
     * @returns {number} - The index of the closest data point.
     * @private
     */
    getClosest(series: Series, value: number, xvalues?: number[]): number;
    private binarySearch;
    getClosestX(chart: Chart, series: Series, xvalues?: number[]): PointData;
    /**
     * Merges the x-values of the data points from multiple series into a single array.
     *
     * @param {Series[]} visibleSeries - The array of visible series.
     * @returns {number[]} - The merged array of x-values.
     * @private
     */
    mergeXvalues(visibleSeries: Series[]): number[];
    commonXValue(visibleSeries: Series[]): number[];
    private getDistinctValues;
    /**
     * Calculates and sets the X and Y values for mouse interactions based on the data point and chart configuration.
     *
     * @param {PointData} data - The data point information containing the x and y values.
     * @param {Chart} chart - The chart instance for which the mouse values are being calculated.
     * @param {Tooltip | Crosshair} interactionElement - The interaction element instance to set the calculated mouse values.
     * @returns {void}
     * @private
     */
    findMouseValues(data: PointData, chart: Chart, interactionElement: Tooltip | Crosshair): void;
}
