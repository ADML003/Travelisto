import { ChartLocation } from '../../common/utils/helper';
import { Rect } from '@syncfusion/ej2-svg-base';
import { DoubleRange } from '../utils/double-range';
import { Series, Points } from './chart-series';
import { ColumnBase } from './column-base';
import { IPointRenderEventArgs } from '../../chart/model/chart-interface';
/**
 * The `HiloOpenCloseSeries` module is used to render the hilo open close series.
 */
export declare class HiloOpenCloseSeries extends ColumnBase {
    sideBySideInfo: DoubleRange[];
    /**
     * Render HiloOpenCloseSeries series.
     *
     * @returns {void}
     * @private
     */
    render(series: Series): void;
    renderPoint(series: Series, point: Points, sideBySideInfo: DoubleRange, borderWidth: number): void;
    updateDirection(series: Series, point: number[]): void;
    /**
     * Updates the tick region based on the specified parameters.
     *
     * @param {boolean} horizontal - Specifies whether the tick region is horizontal.
     * @param {Rect} region - The region to update.
     * @param {number} borderWidth - The width of the border.
     * @returns {void}
     */
    private updateTickRegion;
    /**
     * Triggers the point render event and returns the event arguments.
     *
     * @param {Series} series - The series associated with the point.
     * @param {Points} point - The data point.
     * @returns {IPointRenderEventArgs} The event arguments.
     */
    private triggerPointRenderEvent;
    /**
     * Draws the path for high, low, open, and close values in the series.
     *
     * @param {Series} series - The series associated with the point.
     * @param {Points} point - The data point.
     * @param {ChartLocation} open - The location of the open value.
     * @param {ChartLocation} close - The location of the close value.
     * @param {Rect} rect - The rectangle bounds.
     * @param {IPointRenderEventArgs} argsData - The event arguments.
     * @returns {void}
     */
    protected drawHiloOpenClosePath(series: Series, point: Points, open: ChartLocation, close: ChartLocation, rect: Rect, argsData: IPointRenderEventArgs): void;
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
     * To destroy the column series.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
