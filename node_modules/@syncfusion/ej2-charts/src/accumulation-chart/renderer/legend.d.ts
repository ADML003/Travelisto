import { AccumulationSeries } from '../model/acc-base';
import { MarginModel } from '../../common/model/base-model';
import { AccumulationChart } from '../accumulation';
import { BaseLegend, LegendOptions } from '../../common/legend/legend';
import { LegendSettingsModel } from '../../common/legend/legend-model';
import { Rect, Size } from '@syncfusion/ej2-svg-base';
import { ChartLocation } from '../../common/utils/helper';
/**
 * The `AccumulationLegend` module is used to render the `Legend` for the Accumulation chart.
 */
export declare class AccumulationLegend extends BaseLegend {
    titleRect: Rect;
    private totalRowCount;
    private maxColumnWidth;
    /**
     * Constructor for Accumulation Legend.
     *
     * @param {AccumulationChart} chart Get a chart as a parameter.
     */
    constructor(chart: AccumulationChart);
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
     * @param {MouseEvent} e - The mouse move event for legend module.
     * @returns {void}
     */
    private mouseMove;
    /**
     * To handle mosue end for legend module.
     *
     * @param {MouseEvent} e - The mouse end event for legend module.
     * @returns {void}
     */
    private mouseEnd;
    /**
     * Get the legend options.
     *
     * @param {AccumulationChart} chart - The accumulation chart control.
     * @param {AccumulationSeries[]} series - The array of series in the accumulation chart.
     * @returns {void}
     * @private
     */
    getLegendOptions(chart: AccumulationChart, series: AccumulationSeries[]): void;
    /**
     * To find legend bounds for accumulation chart.
     *
     * @param {Size} availableSize - The available size for the legend.
     * @param {Rect} legendBounds - The boundary of the legend.
     * @param {LegendSettingsModel} legend - The legend settings.
     * @returns {void}
     * @private
     */
    getLegendBounds(availableSize: Size, legendBounds: Rect, legend: LegendSettingsModel): void;
    private getPageWidth;
    /** @private */
    getLegendHeight(option: LegendOptions, legend: LegendSettingsModel, bounds: Rect, rowWidth: number, legendHeight: number, padding: number): void;
    /**
     * To find html entities value for legend.
     *
     * @param {string} legendText - The text of the legend item.
     * @returns {string} - Converts the entities to normal string.
     * @private
     */
    convertHtmlEntities(legendText: string): string;
    /**
     * To find maximum column size for legend.
     *
     * @param {number[]} columns - Array containing the number of legend items in each column.
     * @param {number} width - The total width available.
     * @param {number} padding - The padding between legend items.
     * @param {number} rowWidth - The width of each row of legend items.
     * @returns {number} - Get a maximum columns.
     */
    private getMaxColumn;
    /**
     * To find available width from legend x position.
     *
     * @param {number} tx - The x-coordinate of the legend.
     * @param {number} width - The total width available.
     * @returns {number} - Get a available width.
     */
    private getAvailWidth;
    /**
     * To find legend rendering locations from legend items.
     *
     * @param {LegendOptions} legendOption - The legend options.
     * @param {ChartLocation} start - The starting location for legend rendering.
     * @param {number} textPadding - The padding between legend text items.
     * @param {LegendOptions} prevLegend - The previous legend options.
     * @param {Rect} rect - The bounding of the legend.
     * @param {number} count - The count of legend items.
     * @param {number} firstLegend - The index of the first legend item.
     * @returns {void}
     * @private
     */
    getRenderPoint(legendOption: LegendOptions, start: ChartLocation, textPadding: number, prevLegend: LegendOptions, rect: Rect, count: number, firstLegend: number): void;
    /**
     * Check whether legend group within legend bounds or not.
     *
     * @param {number} previousBound - The previous bound value.
     * @param {number} textWidth - The width of the legend text.
     * @param {Rect} legendBounds - The bounding of the legend.
     * @param {number} shapeWidth - The width of the legend shape.
     * @returns {boolean} - A boolean indicating whether the legend group is within the legend bounds.
     */
    private isWithinBounds;
    /**
     * Finding the smart legend place according to positions.
     *
     * @param {Rect} labelBound - The bounding of the label.
     * @param {Rect} legendBound - The bounding of the legend.
     * @param {MarginModel} margin - The margin of the legend.
     * @returns {void}
     * @private
     */
    getSmartLegendLocation(labelBound: Rect, legendBound: Rect, margin: MarginModel): void;
    /**
     * To get title rect.
     *
     * @param {AccumulationChart} accumulation - The accumulation chart control.
     * @returns {void}
     */
    private getTitleRect;
    /**
     * To get legend by index.
     *
     * @param {number} index - The index of the legend.
     * @param {LegendOptions[]} legendCollections - The array of legend options.
     * @returns {LegendOptions} - Return legend index.
     */
    private legendByIndex;
    /**
     * To show or hide the legend on clicking the legend.
     *
     * @param {Event} event - The click event.
     * @returns {void}
     * @private
     */
    click(event: Event): void;
    /**
     * To translate the point elements by index and position.
     *
     * @param {number} index - The index of the point element.
     * @param {boolean} isVisible - A boolean value indicating whether the point is visible.
     * @returns {void}
     */
    private sliceVisibility;
    /**
     * Slice animation.
     *
     * @param {Element} element - slice element.
     * @param {boolean} isVisible - boolean value of slice.
     * @returns {void}
     */
    private sliceAnimate;
    /**
     * Get module name.
     *
     * @returns {string} - Return module name.
     * @private
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
