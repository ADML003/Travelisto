import { Chart } from '../chart';
import { Series } from '../series/chart-series';
import { ColumnBase } from './column-base';
import { Axis } from '../axis/axis';
/**
 * The `ParetoSeries` module is used to render the pareto series.
 */
export declare class ParetoSeries extends ColumnBase {
    paretoAxes: Axis[];
    /**
     * Defines the Line initialization.
     *
     * @private
     */
    initSeries(targetSeries: Series, chart: Chart): void;
    /**
     * Defines the Axis initialization for Line.
     *
     * @private
     */
    initAxis(paretoSeries: Series, targetSeries: Series, chart: Chart): void;
    /**
     * Render Pareto series.
     *
     * @returns {void}
     * @private
     */
    render(series: Series): void;
    /**
     * Perform cumulative calculation on the provided JSON data based on the series type.
     *
     * @param {Object} json - The JSON data to perform cumulative calculation on.
     * @param {Series} series - The series for which cumulative calculation is performed.
     * @returns {Object[]} - An array containing the result of the cumulative calculation.
     * @private
     */
    performCumulativeCalculation(json: Object, series: Series): Object[];
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
     * @returns {string} - Returns the module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the pareto series.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
