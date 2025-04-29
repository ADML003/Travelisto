import { Series } from './chart-series';
import { Axis } from '../../chart/axis/axis';
import { MultiColoredSeries } from './multi-colored-base';
/**
 * The `MultiColoredAreaSeries` module is used to render area series with multiple colors.
 */
export declare class MultiColoredAreaSeries extends MultiColoredSeries {
    /**
     * Render the multi colored area series on the chart.
     *
     * @param {Series} series - The series to be rendered.
     * @param {Axis} xAxis - The X-axis associated with the series.
     * @param {Axis} yAxis - The Y-axis associated with the series.
     * @param {boolean} isInverted - Specifies whether the chart is inverted or not.
     * @param {boolean} pointAnimate - Specifies whether the point has to be animated or not.
     * @param {boolean} pointUpdate - Specifies whether the point has to be updated or not.
     * @returns {void}
     * @private
     */
    render(series: Series, xAxis: Axis, yAxis: Axis, isInverted: boolean, pointAnimate?: boolean, pointUpdate?: boolean): void;
    /**
     * Generate path options for rendering series elements.
     *
     * @param {PathOption[]} options - The array of path options to be updated.
     * @param {Series} series - The series associated with the path options.
     * @param {Points} point - The point associated with the path options.
     * @param {string} direction - The direction of the path options.
     * @param {string} id - The id associated with the path options.
     * @returns {void}
     */
    private generatePathOption;
    /**
     * Generate path options for rendering series border elements.
     *
     * @param {PathOption[]} options - The array of path options to be updated.
     * @param {Series} series - The series associated with the path options.
     * @param {Points} point - The point associated with the path options.
     * @param {string} emptyPointDirection - The direction of the empty point.
     * @param {string} id - The ID associated with the path options.
     * @returns {void}
     */
    private generateBorderPathOption;
    /**
     * To animate point for multicolored area series.
     *
     * @param {Series} series - Specifies the series.
     * @param {number} point - Specifies the point.
     * @returns {void}
     * @private
     */
    updateDirection(series: Series, point: number[]): void;
    /**
     * To destroy the area series.
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
    /**
     * Animates the series.
     *
     * @param  {Series} series - Defines the series to animate.
     * @returns {void}
     * @private
     */
    doAnimation(series: Series): void;
}
