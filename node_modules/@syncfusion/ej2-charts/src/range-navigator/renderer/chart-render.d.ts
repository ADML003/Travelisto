import { Axis } from '../../chart/axis/axis';
import { NiceInterval } from '../../chart/axis/axis-helper';
import { RangeNavigator } from '../range-navigator';
/**
 * To render Chart series
 */
export declare class RangeSeries extends NiceInterval {
    private dataSource;
    private xName;
    private yName;
    private query;
    xMin: number;
    xMax: number;
    yMin: number;
    yMax: number;
    private yAxis;
    xAxis: Axis;
    labels: string[];
    indexLabels: object;
    private seriesLength;
    private chartGroup;
    constructor(range: RangeNavigator);
    /**
     * To render light weight and data manager process.
     *
     * @param {RangeNavigator} control - RangeNavigator instance.
     * @returns {void}
     */
    renderChart(control: RangeNavigator): void;
    private processDataSource;
    /**
     * data manager process calculated here.
     *
     * @param {Object} e - The data manager result object.
     * @param {Object} e.result - The result of the data manager process.
     * @param {number} e.count - The count of items in the result.
     * @param {RangeNavigator} control - The RangeNavigator control.
     * @param {RangeNavigatorSeries} series - Optional parameter representing the series data.
     * @returns {void}
     */
    private dataManagerSuccess;
    /**
     * Process JSON data from data source.
     *
     * @param {Object[]} viewData - The data array to be processed.
     * @param {RangeNavigator} control - The RangeNavigator control.
     * @param {number} len - The length of the data array.
     * @param {RangeNavigatorSeries} series - The series data for the RangeNavigator control.
     * @returns {void}
     */
    private processJsonData;
    /**
     * Process x axis for range navigator.
     *
     * @private
     * @param {RangeNavigator} control - The RangeNavigator control.
     * @returns {void}
     */
    processXAxis(control: RangeNavigator): void;
    /**
     * Process yAxis for range navigator.
     *
     * @param {RangeNavigator} control - RangeNavigator instance.
     * @private
     * @returns {void}
     */
    processYAxis(control: RangeNavigator): void;
    /**
     * Process Light weight control.
     *
     * @param {RangeNavigator} control - RangeNavigator instance.
     * @private
     * @returns {void}
     */
    renderSeries(control: RangeNavigator): void;
    /**
     * Append series elements in element.
     *
     * @param {RangeNavigator} control - The RangeNavigator control.
     * @returns {void}
     */
    appendSeriesElements(control: RangeNavigator): void;
    private createSeriesElement;
    /**
     * Calculate grouping bounds for x axis.
     *
     * @private
     * @param {RangeNavigator} control - The RangeNavigator control.
     * @returns {void}
     */
    calculateGroupingBounds(control: RangeNavigator): void;
    private drawSeriesBorder;
}
