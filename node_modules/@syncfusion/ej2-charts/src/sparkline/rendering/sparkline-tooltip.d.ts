import { Sparkline } from '../index';
import { SparkValues } from '../utils/helper';
/**
 * Sparkline Tooltip Module
 */
export declare class SparklineTooltip {
    /**
     * Sparkline instance in tooltip.
     */
    private sparkline;
    /**
     * Sparkline current point index.
     */
    private pointIndex;
    /**
     * Sparkline tooltip timer.
     */
    private clearTooltip;
    constructor(sparkline: Sparkline);
    /**
     * @hidden
     * @returns {void}
     */
    private addEventListener;
    private mouseLeaveHandler;
    private mouseUpHandler;
    private fadeOut;
    /**
     * To remove tooltip and tracker elements.
     *
     * @private
     * @returns {void}
     */
    removeTooltipElements(): void;
    private mouseMoveHandler;
    private processTooltip;
    /**
     * To render tracker line.
     *
     * @param {SparkValues} points - The data points for rendering the tracker line.
     * @returns {void}
     */
    private renderTrackerLine;
    /**
     * To render tooltip.
     *
     * @param {SparkValues} points - The data points for rendering the tooltip.
     * @returns {void}
     */
    renderTooltip(points: SparkValues): void;
    private addTooltip;
    /**
     * To get tooltip format.
     *
     * @param {string} format - The format string for tooltip.
     * @param {Sparkline} spark - The Sparkline instance.
     * @param {string} x - The x-coordinate of the data point.
     * @param {string} y - The y-coordinate of the data point.
     * @returns {string[]} - The formatted tooltip text.
     */
    private getFormat;
    private formatValue;
    /**
     * To remove tracker line.
     *
     * @returns {void}
     */
    private removeTracker;
    /**
     * To remove tooltip element.
     *
     * @returns {void}
     */
    private removeTooltip;
    /**
     * Get module name.
     *
     * @returns {string} - To get the module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the tooltip.
     *
     * @returns {void}
     */
    destroy(): void;
}
