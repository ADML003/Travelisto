import { LegendOptions, BaseLegend } from '../../common/legend/legend';
import { Range } from '../model/bullet-base';
import { LegendSettingsModel } from '../../common/legend/legend-model';
import { ChartLocation } from '../../common/utils/helper';
import { Size, Rect } from '@syncfusion/ej2-svg-base';
import { BulletChart } from '../bullet-chart';
/**
 * `Legend` module is used to render legend for the chart.
 */
export declare class BulletChartLegend extends BaseLegend {
    constructor(chart: BulletChart);
    /**
     * Binding events for legend module.
     *
     * @returns {void}
     */
    private addEventListener;
    /**
     * UnBinding events for bullet chart legend module.
     *
     * @returns {void}
     */
    private removeEventListener;
    /**
     * To handle mouse move for legend module.
     *
     * @param {MouseEvent} e - The mouse move event for the legend module.
     * @returns {void}
     */
    private bulletMouseMove;
    /**
     * To handle mouse end for legend module.
     *
     * @param {MouseEvent} e - The mouse end event for the legend module.
     * @returns {void}
     */
    private mouseEnd;
    /**
     * Get the legend options.
     *
     * @param {Range[]} visibleRangeCollection - The collection of visible ranges.
     * @returns {void}
     * @private
     */
    getLegendOptions(visibleRangeCollection: Range[]): void;
    /**
     * Retrieves the legend bounds for the bullet chart.
     *
     * @param {Size} availableSize - The available size for rendering.
     * @param {Rect} bulletLegendBounds - The bounds of the bullet chart legend.
     * @param {LegendSettingsModel} legend - The legend settings for the bullet chart.
     * @returns {void}
     * @private
     */
    getLegendBounds(availableSize: Size, bulletLegendBounds: Rect, legend: LegendSettingsModel): void;
    /**
     * Retrieves the rendering point for the bullet chart legend.
     *
     * @param {LegendOptions} bulletLegendOption - The legend options for the bullet chart.
     * @param {ChartLocation} start - The starting location for rendering.
     * @param {number} textPadding - The padding around the text.
     * @param {LegendOptions} prevLegend - The previous legend options.
     * @param {Rect} rect - The rect region for the legend.
     * @param {number} count - The count of legends.
     * @param {number} firstLegend - The index of the first legend.
     * @returns {void}
     * @private
     */
    getRenderPoint(bulletLegendOption: LegendOptions, start: ChartLocation, textPadding: number, prevLegend: LegendOptions, rect: Rect, count: number, firstLegend: number): void;
    /**
     * To show the tooltip for the trimmed text in legend.
     *
     * @param {Event | PointerEvent} event - The click event.
     * @returns {void}
     */
    click(event: Event | PointerEvent): void;
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the Legend.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
