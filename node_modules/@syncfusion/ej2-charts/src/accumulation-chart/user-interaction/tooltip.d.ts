import { AccumulationChart } from '../accumulation';
import { AccPointData } from '../../common/utils/helper';
import { BaseTooltip } from '../../common/user-interaction/tooltip';
/**
 * The `AccumulationTooltip` module is used to render tooltips for the accumulation chart.
 */
export declare class AccumulationTooltip extends BaseTooltip {
    accumulation: AccumulationChart;
    constructor(accumulation: AccumulationChart);
    /**
     * Adds an event listener.
     *
     * @hidden
     * @returns {void}
     */
    private addEventListener;
    private mouseLeaveHandler;
    private mouseUpHandler;
    private mouseMoveHandler;
    /**
     * Renders the tooltip.
     *
     * @param {PointerEvent | TouchEvent} event - The mouse move event or touch event.
     * @returns {void}
     * @private
     */
    tooltip(event: PointerEvent | TouchEvent): void;
    /**
     * @private
     */
    renderSeriesTooltip(chart: AccumulationChart, data: AccPointData): void;
    private triggerTooltipRender;
    private getPieData;
    /**
     * To get series from index.
     *
     * @param {number} index - The index of the series to retrieve.
     * @param {AccumulationSeries[]} visibleSeries - The array of visible series in the accumulation chart.
     * @returns {AccumulationSeries} - The series retrieved from the specified index.
     */
    private getSeriesFromIndex;
    private getTooltipText;
    private findHeader;
    private parseTemplate;
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the Tooltip.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
