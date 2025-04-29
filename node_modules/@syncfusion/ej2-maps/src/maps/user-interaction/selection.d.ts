import { Maps } from '../../index';
import { SelectionSettingsModel } from '../index';
/**
 * Selection module class
 */
export declare class Selection {
    private maps;
    /**
     * @private
     */
    selectionsettings: SelectionSettingsModel;
    /**
     * @private
     */
    selectionType: string;
    constructor(maps: Maps);
    /**
     * For binding events to selection module.
     *
     * @returns {void}
     */
    private addEventListener;
    /**
     * For removing events from selection module.
     *
     * @returns {void}
     * @private
     */
    removeEventListener(): void;
    private mouseClick;
    /**
     * Selects the element in the map.
     *
     * @param {Element} targetElement - Specifies the target element.
     * @param {number} layerIndex - Specifies the index of the layer.
     * @param {object} data - Specifies the data for the map.
     * @param {object} shapeData - Specifies the data for the map to render.
     * @returns {void}
     * @private
     */
    selectElement(targetElement: Element, layerIndex: number, data: object, shapeData: object): void;
    /**
     * Public method for selection.
     *
     * @param {number} layerIndex - Specifies the index of the layer.
     * @param {string} name - Specifies the name.
     * @param {boolean} enable - Specifies the enabling of selection in map.
     * @returns {void}
     * @private
     */
    addSelection(layerIndex: number, name: string, enable: boolean): void;
    /**
     * Method for selection.
     *
     * @param {Element} targetElement - Specifies the target element
     * @param {any} shapeData - Specifies the shape data
     * @param {any} data - Specifies the data
     * @returns {void}
     */
    private selectMap;
    /**
     * Remove legend selection
     */
    /**
     * Get module name.
     *
     * @param {Element} targetElement - Specifies the target element
     * @returns {void}
     * @private
     */
    removedSelectionList(targetElement: Element): void;
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name
     */
    protected getModuleName(): string;
    /**
     * To destroy the selection.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
