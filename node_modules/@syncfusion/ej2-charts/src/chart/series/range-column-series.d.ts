import { DoubleRange } from '../utils/double-range';
import { Points, Series } from './chart-series';
import { ColumnBase } from './column-base';
/**
 * The `RangeColumnSeries` module is used to render the range column series.
 */
export declare class RangeColumnSeries extends ColumnBase {
    sideBySideInfo: DoubleRange[];
    /**
     * Renders the Range Column series.
     *
     * @param {Series} series - The series to render.
     * @returns {void}
     * @private
     */
    render(series: Series): void;
    renderPoint(series: Series, rangePoint: Points, sideBySideInfo: DoubleRange): void;
    updateDirection(series: Series, point: number[]): void;
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
    /**
     * To destroy the range column series.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
