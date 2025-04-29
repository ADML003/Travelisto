import { Smithchart } from '../../smithchart';
import { SmithchartSeriesModel } from '../../smithchart/series/series-model';
import { ClosestPoint } from '../../smithchart/utils/utils';
import { Tooltip } from '@syncfusion/ej2-svg-base';
/**
 * To render tooltip
 */
export declare class TooltipRender {
    mouseX: number;
    mouseY: number;
    private locationX;
    private locationY;
    /** To define the tooltip element. */
    tooltipElement: Tooltip;
    smithchartMouseMove(smithchart: Smithchart, e: PointerEvent): Tooltip;
    private setMouseXY;
    createTooltip(smithchart: Smithchart, e: PointerEvent | Event, pointIndex: number, seriesindex: number, series: SmithchartSeriesModel): void;
    closestPointXY(smithchart: Smithchart, x: number, y: number, series: SmithchartSeriesModel, seriesindex: number): ClosestPoint;
    /**
     * Get module name.
     *
     * @returns {string} It returns module name
     */
    protected getModuleName(): string;
    /**
     * To destroy the legend.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
