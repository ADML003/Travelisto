import { StackValues } from '../../common/utils/helper';
import { Rect } from '@syncfusion/ej2-svg-base';
import { DoubleRange } from '../utils/double-range';
import { Points, Series } from './chart-series';
import { ColumnBase } from './column-base';
/**
 * The `StackingBarSeries` module is used to render the stacking bar series.
 */
export declare class StackingBarSeries extends ColumnBase {
    sideBySideInfo: DoubleRange[];
    /**
     * Render the Stacking bar series.
     *
     * @returns {void}
     * @private
     */
    rect: Rect;
    render(series: Series): void;
    renderPoint(series: Series, pointStack: Points, sideBySideInfo: DoubleRange, stackedValue: StackValues): void;
    updateDirection(series: Series, point: number[]): void;
    /**
     * To destroy the stacking bar.
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
