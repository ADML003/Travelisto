import { Rect } from '@syncfusion/ej2-svg-base';
import { DoubleRange } from '../utils/double-range';
import { Points, Series } from './chart-series';
import { ColumnBase } from './column-base';
export interface CylinderSeriesOption {
    'isColumn': boolean;
    'stacking': boolean;
    'isLastSeries': boolean;
}
/**
 * The `ColumnSeries` module is used to render the column series.
 */
export declare class ColumnSeries extends ColumnBase {
    sideBySideInfo: DoubleRange[];
    /**
     * Render Column series.
     *
     * @returns {void}
     * @private
     */
    rect: Rect;
    render(series: Series): void;
    renderPoint(series: Series, pointColumn: Points, sideBySideInfo: DoubleRange, origin: number): void;
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
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the column series.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
