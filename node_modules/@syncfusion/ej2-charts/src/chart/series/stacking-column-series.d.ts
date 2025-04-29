import { StackValues } from '../../common/utils/helper';
import { Rect } from '@syncfusion/ej2-svg-base';
import { DoubleRange } from '../utils/double-range';
import { Series, Points } from './chart-series';
import { ColumnBase } from './column-base';
/**
 * The `StackingColumnSeries` module is used to render the stacking column series.
 */
export declare class StackingColumnSeries extends ColumnBase {
    sideBySideInfo: DoubleRange[];
    /**
     * Render the Stacking column series.
     *
     * @returns {void}
     * @private
     */
    rect: Rect;
    render(series: Series): void;
    renderPoint(series: Series, point: Points, sideBySideInfo: DoubleRange, stackedValue: StackValues, visiblePoints: Points[]): void;
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
     * To destroy the stacking column.
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
}
