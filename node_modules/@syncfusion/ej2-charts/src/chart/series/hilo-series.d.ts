import { DoubleRange } from '../utils/double-range';
import { Series, Points } from './chart-series';
import { ColumnBase } from './column-base';
/**
 * The `HiloSeries` module is used to render the hilo series.
 */
export declare class HiloSeries extends ColumnBase {
    sideBySideInfo: DoubleRange[];
    /**
     * Render Hiloseries.
     *
     * @returns {void}
     * @private
     */
    render(series: Series): void;
    renderPoint(series: Series, point: Points, sideBySideInfo: DoubleRange): void;
    updateDirection(series: Series, point: number[]): void;
    /**
     * Triggers the point render event for the specified series and data point.
     *
     * @param {Series} series - The series associated with the point.
     * @param {Points} point - The data point.
     * @returns {IPointRenderEventArgs} The event arguments.
     */
    private triggerPointRenderEvent;
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
     * To destroy the Hilo series.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
