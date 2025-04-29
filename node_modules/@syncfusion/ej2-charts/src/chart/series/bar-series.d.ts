import { Rect } from '@syncfusion/ej2-svg-base';
import { DoubleRange } from '../utils/double-range';
import { Points, Series } from './chart-series';
import { ColumnBase } from './column-base';
/**
 * The `BarSeries` module is used to render the bar series.
 */
export declare class BarSeries extends ColumnBase {
    rect: Rect;
    sideBySideInfo: DoubleRange[];
    /**
     * Render Bar series.
     *
     * @param {Series} series - Defines the series.
     * @returns {void}
     * @private
     */
    render(series: Series): void;
    renderPoint(series: Series, pointBar: Points, sideBySideInfo: DoubleRange, origin: number): void;
    updateDirection(series: Series, point: number[]): void;
    /**
     * Animates the series.
     *
     * @param  {Series} series - Defines the series to animate.
     * @returns {void}
     * @private
     */
    doAnimation(series: Series): void;
    /**
     * To destroy the bar series.
     *
     * @returns {void}
     * @private
     */
    protected destroy(): void;
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    protected getModuleName(): string;
}
