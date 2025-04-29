import { LineBase } from '../series/line-base';
import { Series, Points } from '../series/chart-series';
import { TechnicalIndicator } from './technical-indicator';
import { Chart } from '../chart';
/**
 * The `TechnicalAnalysis` module helps predict market trends.
 *
 * @private
 */
export declare class TechnicalAnalysis extends LineBase {
    /**
     * Defines the collection of series, that are used to represent the given technical indicator
     *
     * @private
     * @param {TechnicalIndicator} indicator - The technical indicator for which the series collection is initialized.
     * @param {Chart} chart - The chart associated with the technical indicator.
     * @returns {void}
     */
    initSeriesCollection(indicator: TechnicalIndicator, chart: Chart): void;
    /**
     * Sets properties for a series associated with a technical indicator.
     *
     * @protected
     * @param {Series} series - The series for which properties are to be set.
     * @param {TechnicalIndicator} indicator - The technical indicator associated with the series.
     * @param {string} name - The name of the series.
     * @param {string} fill - The fill color of the series.
     * @param {number} width - The width of the series line.
     * @param {Chart} chart - The chart associated with the series.
     * @returns {void}
     */
    protected setSeriesProperties(series: Series, indicator: TechnicalIndicator, name: string, fill: string, width: number, chart: Chart): void;
    /**
     * Creates elements for a technical indicator in the chart.
     *
     * @private
     * @param {Chart} chart - The chart in which the indicator elements are to be created.
     * @param {TechnicalIndicator} indicator - The technical indicator for which elements are to be created.
     * @param {number} index - The index of the indicator.
     * @returns {void}
     */
    createIndicatorElements(chart: Chart, indicator: TechnicalIndicator, index: number): void;
    protected getDataPoint(x: Object, y: Object, sourcePoint: Points, series: Series, index: number, indicator?: TechnicalIndicator): Points;
    protected getRangePoint(x: Object, high: Object, low: Object, sourcePoint: Points, series: Series, index: number): Points;
    protected setSeriesRange(points: Points[], indicator: TechnicalIndicator, series?: Series): void;
}
