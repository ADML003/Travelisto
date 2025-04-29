import { Rect } from '@syncfusion/ej2-svg-base';
import { DoubleRange } from '../utils/double-range';
import { Series, Points } from './chart-series';
import { ColumnBase } from './column-base';
import { IPointRenderEventArgs } from '../../chart/model/chart-interface';
/**
 * The `CandleSeries` module is used to render the candle series.
 */
export declare class CandleSeries extends ColumnBase {
    sideBySideInfo: DoubleRange[];
    /**
     * Render Candle series.
     *
     * @param {Series} series - The series to be rendered.
     * @returns {void}
     * @private
     */
    render(series: Series): void;
    renderPoint(series: Series, point: Points, sideBySideInfo: DoubleRange, borderWidth: number): void;
    updateDirection(series: Series, point: number[]): void;
    /**
     * Triggers the point render event for the specified series and point.
     *
     * @protected
     * @param {Series} series - The series associated with the point.
     * @param {Points} point - The point to be rendered.
     * @returns {IPointRenderEventArgs} - The event arguments for the point render event.
     */
    protected triggerPointRenderEvent(series: Series, point: Points): IPointRenderEventArgs;
    /**
     * Find the color of the candle
     *
     * @param {Points} point point
     * @param {Series} series series
     * @returns {string} color of the candle
     * @private
     */
    private getCandleColor;
    /**
     * Generates the SVG path string based on the top and mid rectangles for the specified series.
     *
     * @param {Rect} topRect - The top rectangle.
     * @param {Rect} midRect - The mid rectangle.
     * @param {Series} series - The series for which the path string is generated.
     * @returns {string} - The SVG path string.
     * @private
     */
    getPathString(topRect: Rect, midRect: Rect, series: Series): string;
    /**
     * Draws the candle shape
     *
     * @param {Series} series series
     * @param {Points} point point
     * @param {Rect} rect point region
     * @param {IPointRenderEventArgs} argsData argsData
     * @param {string} direction path direction
     * @returns {void}
     * @private
     */
    drawCandle(series: Series, point: Points, rect: Rect, argsData: IPointRenderEventArgs, direction: string): void;
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
     * To destroy the candle series.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
