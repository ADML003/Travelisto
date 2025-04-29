import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { PathOption, calculatePolygonPath, maintainSelection } from '../utils/helper';
/**
 * When injected, this module will be used to render polygon shapes over the Maps.
 */
var Polygon = /** @class */ (function () {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    /* eslint-disable @typescript-eslint/no-empty-function */
    function Polygon(maps) {
    }
    /* eslint-enable @typescript-eslint/no-unused-vars */
    /* eslint-enable @typescript-eslint/no-empty-function */
    /**
     * To render polygon for maps.
     *
     * @param {Maps} maps - Specifies the layer instance to which the polygon is to be rendered.
     * @param {number} layerIndex -Specifies the index of current layer.
     * @param {number} factor - Specifies the current zoom factor of the Maps.
     * @returns {Element} - Returns the polygon element.
     * @private
     */
    Polygon.prototype.polygonRender = function (maps, layerIndex, factor) {
        var currentLayer = maps.layersCollection[layerIndex];
        var polygonsSVGObject = maps.renderer.createGroup({
            id: maps.element.id + '_LayerIndex_' + layerIndex + '_Polygons_Group'
        });
        currentLayer.polygonSettings.polygons.map(function (polygonSetting, polygonIndex) {
            var polygonSVGObject = maps.renderer.createGroup({
                id: maps.element.id + '_LayerIndex_' + layerIndex + '_Polygons_Group_' + polygonIndex
            });
            var polygonData = polygonSetting.points;
            if (!isNullOrUndefined(polygonSetting.points) && polygonSetting.points.length > 0) {
                var path = calculatePolygonPath(maps, factor, currentLayer, polygonData);
                var pathOptions = new PathOption(maps.element.id + '_LayerIndex_' + layerIndex + '_PolygonIndex_' + polygonIndex, polygonSetting.fill, (polygonSetting.borderWidth / factor), polygonSetting.borderColor, polygonSetting.opacity, polygonSetting.borderOpacity, '', path);
                var polygonEle = maps.renderer.drawPath(pathOptions);
                maintainSelection(maps.selectedPolygonElementId, maps.polygonSelectionClass, polygonEle, 'PolygonselectionMapStyle');
                polygonSVGObject.appendChild(polygonEle);
                polygonsSVGObject.appendChild(polygonSVGObject);
            }
        });
        return polygonsSVGObject;
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name
     */
    Polygon.prototype.getModuleName = function () {
        return 'Polygon';
    };
    /**
     * To destroy the layers.
     *
     * @returns {void}
     * @private
     */
    //eslint-disable-next-line @typescript-eslint/no-empty-function
    Polygon.prototype.destroy = function () {
    };
    return Polygon;
}());
export { Polygon };
