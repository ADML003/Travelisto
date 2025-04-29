import { Maps } from '../../index';
/**
 * When injected, this module will be used to render polygon shapes over the Maps.
 */
export declare class Polygon {
    constructor(maps: Maps);
    /**
     * To render polygon for maps.
     *
     * @param {Maps} maps - Specifies the layer instance to which the polygon is to be rendered.
     * @param {number} layerIndex -Specifies the index of current layer.
     * @param {number} factor - Specifies the current zoom factor of the Maps.
     * @returns {Element} - Returns the polygon element.
     * @private
     */
    polygonRender(maps: Maps, layerIndex: number, factor: number): Element;
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
