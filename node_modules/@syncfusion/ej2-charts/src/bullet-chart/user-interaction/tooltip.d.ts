import { BulletChart } from '../bullet-chart';
import { BulletChartAxis } from '../renderer/bullet-axis';
/**
 * `BulletTooltip` module is used to render the tooltip for bullet chart.
 */
export declare class BulletTooltip {
    private elementId;
    toolTipInterval: number;
    private control;
    private templateFn;
    /** @private */
    bulletAxis: BulletChartAxis;
    /**
     * Constructor for tooltip module.
     *
     * @private
     * @param {BulletChart} bullet - The bullet chart control.
     */
    constructor(bullet: BulletChart);
    /**
     * To create tooltip div element.
     *
     * @param {PointerEvent} e - The pointer event.
     * @param {string} targetClass - The class name of the target element.
     * @param {string} targetId - The id of the target element.
     * @param {number} mouseX - The X-coordinate of the mouse.
     * @returns {void}
     */
    _elementTooltip(e: PointerEvent, targetClass: string, targetId: string, mouseX: number): void;
    /**
     * To display the bullet chart tooltip.
     *
     * @param {PointerEvent} e - The pointer event.
     * @param {string} targetClass - The class name of the target element.
     * @param {string} targetId - The id of the target element.
     * @param {number} mouseX - The X-coordinate of the mouse.
     * @param {number} mouseY - The Y-coordinate of the mouse.
     * @returns {void}
     */
    _displayTooltip(e: PointerEvent, targetClass: string, targetId: string, mouseX: number, mouseY: number): void;
    /**
     * To update template values in the tooltip.
     *
     * @returns {void}
     */
    updateTemplateFn(): void;
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
