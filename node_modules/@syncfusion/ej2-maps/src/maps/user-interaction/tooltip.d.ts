import { Maps } from '../index';
import { Tooltip } from '@syncfusion/ej2-svg-base';
/**
 * Map Tooltip
 */
export declare class MapsTooltip {
    private maps;
    /**
     * @private
     */
    svgTooltip: Tooltip;
    private isTouch;
    private tooltipId;
    private tooltipTimer;
    /**
     * @private
     */
    tooltipTargetID: string;
    constructor(maps: Maps);
    /**
     * @param {PointerEvent} e - Specifies the event.
     * @returns {void}
     * @private
     */
    renderTooltip(e: PointerEvent): void;
    /**
     * To get content for the current toolitp.
     *
     * @param {TooltipSettingsModel} options - Specifies the options for rendering tooltip
     * @param {any} templateData - Specifies the template data
     * @returns {any} - Returns the local data
     */
    private setTooltipContent;
    private formatter;
    /**
     * Handles the mouse up.
     *
     * @param {PointerEvent} e - Specifies the event
     * @returns {void}
     * @private
     */
    mouseUpHandler(e: PointerEvent): void;
    /**
     * Removes the tooltip.
     *
     * @returns {boolean} - Returns the boolean whether tooltip is removed or not.
     * @private
     */
    removeTooltip(): boolean;
    private clearTooltip;
    /**
     * To bind events for tooltip module.
     *
     * @returns {void}
     * @private
     */
    addEventListener(): void;
    /**
     * Removes the event listeners.
     *
     * @returns {void}
     * @private
     */
    removeEventListener(): void;
    /**
     * Get module name.
     *
     * @returns {string} Returns the module name
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
