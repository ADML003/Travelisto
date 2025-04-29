import { Maps } from '../../maps/maps';
import { Point } from '../utils/helper';
import { LayerSettings, Tile } from '../model/base';
import { BingMap } from './bing-map';
/**
 * To calculate and render the shape layer
 */
export declare class LayerPanel {
    private mapObject;
    currentFactor: number;
    private groupElements;
    private layerObject;
    private currentLayer;
    private rectBounds;
    tiles: Tile[];
    private clipRectElement;
    private urlTemplate;
    private isMapCoordinates;
    private tileSvgObject;
    private ajaxModule;
    private ajaxResponse;
    private bing;
    private animateToZoomX;
    private animateToZoomY;
    horizontalPan: boolean;
    horizontalPanXCount: number;
    layerGroup: Element;
    constructor(map: Maps);
    measureLayerPanel(): void;
    /**
     * Tile rendering
     *
     * @param {LayerPanel} panel - Specifies the layer panel.
     * @param {LayerSettings} layer - Specifies the layer settings.
     * @param {number} layerIndex - Specifies the layer index.
     * @param {BingMap} bing - Specifies the bing map.
     * @returns {void}
     * @private
     */
    renderTileLayer(panel: LayerPanel, layer: LayerSettings, layerIndex: number, bing?: BingMap): void;
    protected processLayers(layer: LayerSettings, layerIndex: number): void;
    private bingMapCalculation;
    private bubbleCalculation;
    calculatePathCollection(layerIndex: number, renderData: any[]): void;
    /**
     * layer features as bubble, marker, datalabel, navigation line.
     *
     * @param {Element} groupElement - Specifies the element to append the group.
     * @param {Element} pathEle - Specifies the svg element.
     * @param {string} drawingType - Specifies the data type.
     * @param {any} currentShapeData - Specifies the layer of shapedata.
     * @returns {void}
     */
    private pathAttributeCalculate;
    /**
     * layer features as bubble, marker, datalabel, navigation line.
     *
     * @param {number} layerIndex - Specifies the layer index
     * @param {string[]} colors - Specifies the colors
     * @param {any[]} renderData - Specifies the render data
     * @param {HTMLElement} labelTemplateEle - Specifies the label template element
     * @returns {void}
     */
    private layerFeatures;
    /**
     * render datalabel.
     *
     * @param {LayerSettings} layer - Specifies the layer
     * @param {number} layerIndex - Specifies the layer index
     * @param {any[]} shape - Specifies the shape
     * @param {Element} group - Specifies the group
     * @param {number} shapeIndex - Specifies the shape index
     * @param {HTMLElement} labelTemplateEle - Specifies the label template element
     * @param {any[]} intersect - Specifies the intersect
     * @returns {void}
     */
    private renderLabel;
    /**
     * To render path for multipolygon.
     *
     * @param {any[]} currentShapeData Specifies the current shape data
     * @returns {string} Returns the path
     */
    private generateMultiPolygonPath;
    /**
     * To render bubble.
     *
     * @param {LayerSettings} layer - Specifies the layer
     * @param {object} bubbleData - Specifies the bubble data
     * @param {string} color - Specifies the color
     * @param {number} range - Specifies the range
     * @param {number} range.min - Specifies the minimum range
     * @param {number} range.max - Specifies the maximum range
     * @param {number} bubbleIndex - Specifies the bubble index
     * @param {number} dataIndex - Specifies the data index
     * @param {number} group - Specifies the group
     * @param {number} layerIndex - Specifies the layer index
     * @param {BubbleSettingsModel} bubbleSettings - Specifies the bubble settings
     * @returns {void}
     */
    private renderBubble;
    /**
     * To get the shape color from color mapping module.
     *
     * @param {LayerSettingsModel} layer - Specifies the layer
     * @param {any} shape - Specifies the shape
     * @param {string} color - Specifies the color
     * @returns {any} - Returns the object
     */
    private getShapeColorMapping;
    generatePoints(type: string, coordinates: any[], data: object, properties: object): void;
    calculateBox(point: Point, extraSpace: number): void;
    calculateFactor(layer: LayerSettings): number;
    translateLayerElements(layerElement: Element): void;
    calculateRectBounds(layerData: any[]): void;
    calculatePolygonBox(coordinates: any[]): any;
    calculateRectBox(coordinates: any[], type?: string, isFirstItem?: boolean): void;
    generateTiles(zoomLevel: number, tileTranslatePoint: Point, zoomType?: string, bing?: BingMap, position?: Point, isPinch?: boolean): void;
    arrangeTiles(type: string, x: number, y: number, isPinch?: boolean): void;
    private tileProcess;
    /**
     * Animation for tile layers and hide the group element until the tile layer rendering.
     *
     * @param {string} zoomType - Specifies the zoom type
     * @param {number} translateX - Specifies the x translate point
     * @param {number} translateY - Specifies the y translate point
     * @returns {void}
     */
    private tileAnimation;
    /**
     * To find the tile translate point.
     *
     * @param {number} factorX - Specifies the x factor
     * @param {number} factorY - Specifies the x factor
     * @param {MapLocation} centerPosition - Specifies the map location
     * @returns {Point} - Returns point values
     */
    private panTileMap;
    /**
     * @returns {void}
     * @private
     */
    destroy(): void;
}
