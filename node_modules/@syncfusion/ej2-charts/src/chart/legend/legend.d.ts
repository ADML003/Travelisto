import { Series } from '../series/chart-series';
import { LegendOptions, BaseLegend } from '../../common/legend/legend';
import { Chart } from '../../chart';
import { LegendSettingsModel } from '../../common/legend/legend-model';
import { ChartLocation } from '../../common/utils/helper';
import { Size, Rect } from '@syncfusion/ej2-svg-base';
/**
 * The `Legend` module is used to render the legend for the chart.
 */
export declare class Legend extends BaseLegend {
    constructor(chart: Chart);
    /**
     * Binding events for legend module.
     *
     * @returns {void}
     */
    private addEventListener;
    /**
     * UnBinding events for legend module.
     *
     * @returns {void}
     */
    private removeEventListener;
    /**
     * To handle mosue move for legend module.
     *
     * @param {MouseEvent} e - The mouse event.
     * @returns {void}
     */
    private mouseMove;
    /**
     * To handle mosue end for legend module.
     *
     * @param {MouseEvent} e - The mouse event.
     * @returns {void}
     */
    private mouseEnd;
    /**
     * Retrieves the legend options based on the visible series collection and chart.
     *
     * @param {Series[]} visibleSeriesCollection - The collection of visible series.
     * @param {Chart} chart - The chart instance.
     * @returns {void}
     * @private
     */
    getLegendOptions(visibleSeriesCollection: Series[], chart: Chart): void;
    /**
     * Calculates the legend bounds based on the available size and legend settings.
     *
     * @param {Size} availableSize - The available size for the legend.
     * @param {Rect} legendBounds - The current bounds of the legend.
     * @param {LegendSettingsModel} legend - The legend settings.
     * @returns {void}
     * @private
     */
    getLegendBounds(availableSize: Size, legendBounds: Rect, legend: LegendSettingsModel): void;
    /**
     * Calculates the height of the legend based on the legend options, settings, and available space.
     *
     * @param {LegendOptions} legendOption - The legend options.
     * @param {LegendSettingsModel} legend - The legend settings.
     * @param {Rect} legendBounds - The current bounds of the legend.
     * @param {number} rowWidth - The width of the legend rows.
     * @param {number} legendHeight - The current height of the legend.
     * @param {number} padding - The padding around the legend items.
     * @returns {void}
     * @private
     */
    getLegendHeight(legendOption: LegendOptions, legend: LegendSettingsModel, legendBounds: Rect, rowWidth: number, legendHeight: number, padding: number): void;
    /**
     * Calculates the rendering point for the legend item based on various parameters.
     *
     * @param {LegendOptions} legendOption - The legend options.
     * @param {ChartLocation} start - The starting location for the legend.
     * @param {number} textPadding - The padding around the legend text.
     * @param {LegendOptions} previousLegend - The options of the previous legend item.
     * @param {Rect} rect - The bounding rectangle for the legend.
     * @param {number} count - The count of legend items.
     * @param {number} firstLegend - The index of the first legend item.
     * @returns {void}
     * @private
     */
    getRenderPoint(legendOption: LegendOptions, start: ChartLocation, textPadding: number, previousLegend: LegendOptions, rect: Rect, count: number, firstLegend: number): void;
    private isWithinBounds;
    /**
     * Handles the click event for a legend item.
     *
     * @param {number} index - The index of the clicked legend item.
     * @param {Event | PointerEvent} event - The click event.
     * @returns {void}
     * @private
     */
    LegendClick(index: number, event: Event | PointerEvent): void;
    private refreshLegendToggle;
    private changeSeriesVisiblity;
    private isSecondaryAxis;
    private redrawSeriesElements;
    private refreshSeries;
    /**
     * Handles the click event for showing tooltip on trimmed text in legend.
     *
     * @param {Event | PointerEvent} event - The click event.
     * @returns {void}
     * @private
     */
    click(event: Event | PointerEvent): void;
    /**
     * Checks whether the provided coordinates are within the bounds.
     *
     * @param {number} pageX - The x-coordinate of the mouse pointer.
     * @param {number} pageY - The y-coordinate of the mouse pointer.
     * @returns {void}
     * @protected
     */
    protected checkWithinBounds(pageX: number, pageY: number): void;
    private canvasPageDown;
    private canvasPageUp;
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
