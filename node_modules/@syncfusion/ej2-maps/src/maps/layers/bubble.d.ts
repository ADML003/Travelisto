import { Maps } from '../../index';
import { BubbleSettingsModel } from '../index';
import { LayerSettings } from '../index';
/**
 * Bubble module class
 */
export declare class Bubble {
    private maps;
    /** @private */
    bubbleCollection: object[];
    /**
     * Bubble Id for current layer
     *
     * @private
     */
    id: string;
    constructor(maps: Maps);
    /**
     * To render bubble
     *
     * @param {BubbleSettingsModel} bubbleSettings - Specifies the bubble data to be rendered
     * @param {object} shapeData - Specifies the data about the shape
     * @param {string} color - Specifies the color of the bubble
     * @param {number} range - Specifies the range of the bubble
     * @param {number} range.min - Specifies the minimum range of the bubble
     * @param {number} range.max - Specifies the maximum range of the bubble
     * @param {number} bubbleIndex - Specifies the index of the bubble
     * @param {number} dataIndex - Specifies the index of the data
     * @param {number} layerIndex - Specifies the index of the layer
     * @param {LayerSettings} layer - Specifies the layer data
     * @param {Element} group - Specifies the element group
     * @param {string} bubbleID - Specifies the ID of the bubble
     * @returns {void}
     * @private
     */
    renderBubble(bubbleSettings: BubbleSettingsModel, shapeData: object, color: string, range: {
        min: number;
        max: number;
    }, bubbleIndex: number, dataIndex: number, layerIndex: number, layer: LayerSettings, group: Element, bubbleID?: string): void;
    private getPoints;
    /**
     * To check and trigger bubble click event.
     *
     * @param {PointerEvent} e - Specifies the pointer event argument.
     * @returns {void}
     * @private
     */
    bubbleClick(e: PointerEvent): void;
    /**
     * To get bubble from target id.
     *
     * @param {string} target - Specifies the target
     * @returns {object} - Returns the object
     */
    private getbubble;
    /**
     * To check and trigger bubble move event.
     *
     * @param {PointerEvent} e - Specifies the pointer event argument.
     * @retruns {void}
     * @private
     */
    bubbleMove(e: PointerEvent): void;
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the bubble.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
