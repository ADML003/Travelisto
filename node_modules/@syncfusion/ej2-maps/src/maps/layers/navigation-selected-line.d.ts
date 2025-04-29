import { Maps } from '../../index';
import { LayerSettings } from '../index';
/**
 * navigation-selected-line
 */
export declare class NavigationLine {
    private maps;
    constructor(maps: Maps);
    /**
     * To render navigation line for maps.
     *
     * @param {LayerSettings} layer - Specifies the layer instance to which the navigation line is to be rendered.
     * @param {number} factor - Specifies the current zoom factor of the Maps.
     * @param {number} layerIndex -Specifies the index of current layer.
     * @returns {Element} - Returns the navigation line element.
     * @private
     */
    renderNavigation(layer: LayerSettings, factor: number, layerIndex: number): Element;
    private convertRadius;
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name
     */
    protected getModuleName(): string;
    /**
     * To destroy the layers.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
