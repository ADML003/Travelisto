import { Maps } from '../../index';
import { HighlightSettingsModel } from '../index';
/**
 * Highlight module class
 */
export declare class Highlight {
    private maps;
    /**
     * @private
     */
    highlightSettings: HighlightSettingsModel;
    constructor(maps: Maps);
    /**
     * To bind events for highlight module.
     *
     * @returns {void}
     */
    private addEventListener;
    /**
     * To unbind events for highlight module.
     *
     * @returns {void}
     * @private
     */
    removeEventListener(): void;
    /**
     * Public method for highlight module.
     *
     * @param {number} layerIndex - Specifies the index of the layer.
     * @param {string} name - Specifies the name.
     * @param {boolean} enable - Specifies the enabling of highlight in map.
     * @returns {void}
     * @private
     */
    addHighlight(layerIndex: number, name: string, enable: boolean): void;
    private mouseMove;
    /**
     * Handles the highlighting events in map.
     *
     * @param {Element} targetElement - Specifies the target element.
     * @param {number} layerIndex - Specifies the index of the layer.
     * @param {object} data - Specifies the data for the map.
     * @param {object} shapeData - Specifies the data for the map to render.
     * @returns {void}
     * @private
     */
    handleHighlight(targetElement: Element, layerIndex: number, data: object, shapeData: object): void;
    private mapHighlight;
    private highlightMap;
    /**
     * Get module name.
     *
     * @returns {string} - Specifies the module name
     */
    protected getModuleName(): string;
    /**
     * To destroy the highlight.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
