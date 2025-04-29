import { RangeNavigator, RangeSlider } from '../../range-navigator';
import { Tooltip as SVGTooltip } from '@syncfusion/ej2-svg-base';
/**
 * `Tooltip` module is used to render the tooltip for chart series.
 */
export declare class RangeTooltip {
    leftTooltip: SVGTooltip;
    rightTooltip: SVGTooltip;
    private elementId;
    toolTipInterval: number;
    private control;
    /**
     * Constructor for tooltip module.
     *
     * @param {RangeNavigator} range - The RangeNavigator control.
     * @private
     */
    constructor(range: RangeNavigator);
    /**
     * Left tooltip method called here.
     *
     * @param {RangeSlider} rangeSlider - RangeSlider
     * @returns {void}
     */
    renderLeftTooltip(rangeSlider: RangeSlider): void;
    /**
     * get the content size.
     *
     * @param {string[]} value - The array of values.
     * @returns {number} - The content size.
     */
    private getContentSize;
    /**
     * Right tooltip method called here.
     *
     * @param {RangeSlider} rangeSlider - RangeSlider
     * @returns {void}
     */
    renderRightTooltip(rangeSlider: RangeSlider): void;
    /**
     * Tooltip element creation.
     *
     * @param {string} id - The element id.
     * @returns {Element} - The created tooltip element.
     */
    private createElement;
    /**
     * Tooltip render called here.
     *
     * @param {Rect} bounds - bounds
     * @param {Element} parent - parent
     * @param {number} pointX - pointX
     * @param {string[]} content - content
     * @returns {SVGTooltip} - SVGTooltip
     */
    private renderTooltip;
    /**
     * Tooltip content processed here.
     *
     * @param {number} value - The tooltip value.
     * @returns {string[]} - An array containing the processed tooltip content.
     */
    private getTooltipContent;
    /**
     * Fadeout animation performed here.
     *
     * @returns {void}
     */
    private fadeOutTooltip;
    /**
     * Get module name.
     *
     * @returns {string} - The name of the module.
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
