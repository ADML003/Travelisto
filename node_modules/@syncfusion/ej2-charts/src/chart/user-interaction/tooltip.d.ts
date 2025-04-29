import { Chart } from '../chart';
import { PointData } from '../../common/utils/helper';
import { BaseTooltip } from '../../common/user-interaction/tooltip';
/**
 * The `Tooltip` module is used to render tooltips for chart series.
 */
export declare class Tooltip extends BaseTooltip {
    /**
     * Constructor for the Touch module.
     *
     * @param {Chart} chart - The chart instance.
     */
    constructor(chart: Chart);
    /**
     * Adds event listeners for the chart.
     *
     * @returns {void}
     */
    private addEventListener;
    private mouseUpHandler;
    private mouseLeaveHandler;
    mouseMoveHandler(): void;
    /**
     * Handles the long press on chart.
     *
     * @returns {boolean} false
     * @private
     */
    private longPress;
    /**
     * Renders the tooltip.
     *
     * @returns {void}
     * @private
     */
    tooltip(): void;
    private findHeader;
    private findShapes;
    private renderSeriesTooltip;
    private triggerTooltipRender;
    private findMarkerHeight;
    private findData;
    private getSymbolLocation;
    private getRangeArea;
    private getWaterfallRegion;
    private getTooltipText;
    private getTemplateText;
    private renderGroupedTooltip;
    private triggerSharedTooltip;
    private findSharedLocation;
    private getBoxLocation;
    private parseTemplate;
    private formatPointValue;
    private getFormat;
    private getIndicatorTooltipFormat;
    removeHighlightedMarker(data: PointData[], fadeOut: boolean): void;
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the tooltip.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
