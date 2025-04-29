import { Maps } from '../../index';
import { ColorMappingSettings } from '../index';
import { Rect } from '../utils/helper';
import { HighlightSettingsModel, SelectionSettingsModel } from '../model/base-model';
import { ShapeSettings } from '../model/base';
/**
 * Legend module is used to render legend for the maps
 */
export declare class Legend {
    /**
     * @private
     */
    legendCollection: any[];
    /**
     * @private
     */
    legendRenderingCollections: any[];
    private translate;
    /**
     * @private
     */
    legendBorderRect: Rect;
    /**
     * @private
     */
    initialMapAreaRect: Rect;
    /**
     * @private
     */
    legendTotalRect: Rect;
    private maps;
    /**
     * @private
     */
    totalPages: any[];
    private page;
    /**
     * @private
     */
    currentPage: number;
    private legendItemRect;
    private heightIncrement;
    private widthIncrement;
    private textMaxWidth;
    private arrowTimer;
    /**
     * @private
     */
    legendGroup: Element;
    private shapeHighlightCollection;
    /**
     * @private
     */
    legendHighlightCollection: any[];
    /**
     * @private
     */
    shapePreviousColor: string[];
    /**
     * @private
     */
    selectedNonLegendShapes: any[];
    /**
     * @private
     */
    shapeToggled: boolean;
    private legendLinearGradient;
    private currentLayer;
    private defsElement;
    /**
     * @private
     */
    legendElement: Element[];
    /**
     * @private
     */
    oldShapeElement: Element;
    constructor(maps: Maps);
    /**
     * To calculate legend bounds and draw the legend shape and text.
     *
     * @returns {void}
     * @private
     */
    renderLegend(): void;
    calculateLegendBounds(): void;
    /**
     * Get the legend collections
     *
     * @param {number} layerIndex - Specifies the layer index
     * @param {any[]} layerData - Specifies the layer data
     * @param {ColorMappingSettings[]} colorMapping - Specifies the color mapping
     * @param {any[]} dataSource - Specifies the data source
     * @param {string} dataPath - Specifies the data path
     * @param {string} colorValuePath - Specifies the color value path
     * @param {string | string[]} propertyPath - Specifies the property path
     * @returns {void}
     */
    private getLegends;
    private getPageChanged;
    private legendTextTrim;
    /**
     * To draw the legend shape and text.
     *
     * @private
     */
    drawLegend(): void;
    /**
     * @param {number} page - Specifies the legend page.
     * @returns {void}
     * @private
     */
    drawLegendItem(page: number): void;
    /**
     * @param {number} legendIndex - Specifies the legend index.
     * @param {Element} legendShapeElement - Specifies the legend shape element.
     * @param {Element} legendTextElement - Specifies the legend text element.
     * @returns {void}
     * @private
     */
    maintainLegendToggle(legendIndex: number, legendShapeElement: Element, legendTextElement: Element): void;
    legendHighLightAndSelection(targetElement: Element, value: string): void;
    private setColor;
    pushCollection(targetElement: Element, collection: any[], oldElement: object, shapeSettings: ShapeSettings): void;
    private removeLegend;
    removeLegendHighlightCollection(): void;
    removeLegendSelectionCollection(targetElement: Element): void;
    removeShapeHighlightCollection(): void;
    shapeHighLightAndSelection(targetElement: Element, data: object, legendModule: SelectionSettingsModel | HighlightSettingsModel, getValue: string, layerIndex: number): void;
    private isTargetSelected;
    private updateLegendElement;
    private getIndexofLegend;
    private removeAllSelections;
    legendIndexOnShape(data: object, index: number): any;
    private shapeDataOnLegend;
    private shapesOfLegend;
    private legendToggle;
    private renderLegendBorder;
    changeNextPage(e: PointerEvent): void;
    private getLegendAlignment;
    private getMarkersLegendCollections;
    private getMarkerLegendData;
    private getRangeLegendCollection;
    private getOverallLegendItemsCollection;
    private removeDuplicates;
    private getEqualLegendCollection;
    private getDataLegendCollection;
    interactiveHandler(e: PointerEvent): void;
    private renderInteractivePointer;
    wireEvents(element: Element): void;
    addEventListener(): void;
    private markerToggleSelection;
    private bubbleToggleSelection;
    private legendClick;
    private removeCollections;
    removeEventListener(): void;
    private getLegendData;
    private setToggleAttributes;
    legendGradientColor(colorMap: ColorMappingSettings, legendIndex: number): string;
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name
     */
    protected getModuleName(): string;
    /**
     * To destroy the legend.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
