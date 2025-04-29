import { convertTileLatLongToPoint } from '../index';
import { convertGeoToPoint, Point, PathOption, maintainSelection } from '../utils/helper';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
/**
 * navigation-selected-line
 */
var NavigationLine = /** @class */ (function () {
    function NavigationLine(maps) {
        this.maps = maps;
    }
    /**
     * To render navigation line for maps.
     *
     * @param {LayerSettings} layer - Specifies the layer instance to which the navigation line is to be rendered.
     * @param {number} factor - Specifies the current zoom factor of the Maps.
     * @param {number} layerIndex -Specifies the index of current layer.
     * @returns {Element} - Returns the navigation line element.
     * @private
     */
    NavigationLine.prototype.renderNavigation = function (layer, factor, layerIndex) {
        var group;
        if (!isNullOrUndefined(this.maps)) {
            var navigationEle = void 0;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var navigation = layer.navigationLineSettings;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var longitude = void 0;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var point = [];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var latitude = void 0;
            var visible = void 0;
            var angle = void 0;
            var width = void 0;
            var color = void 0;
            var dashArray = void 0;
            var pathOption = void 0;
            var direction = void 0;
            var showArrow = void 0;
            var arrowColor = void 0;
            var arrowSize = void 0;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var arrowSettings = void 0;
            var arrowPosition = void 0;
            var startArrow = void 0;
            var endArrow = void 0;
            var offSet = void 0;
            var offSetValue = void 0;
            var navigationGroup = void 0;
            var d = void 0;
            group = (this.maps.renderer.createGroup({
                id: this.maps.element.id + '_LayerIndex_' + layerIndex + '_line_Group'
            }));
            for (var i = 0; i < navigation.length; i++) {
                latitude = navigation[i].latitude;
                longitude = navigation[i].longitude;
                visible = !isNullOrUndefined(navigation[i].visible) ? navigation[i].visible : false;
                angle = !isNullOrUndefined(navigation[i].angle) ? navigation[i].angle : 0;
                width = navigation[i].width || 1;
                color = navigation[i].color;
                dashArray = navigation[i].dashArray;
                arrowSettings = navigation[i].arrowSettings;
                showArrow = !isNullOrUndefined(arrowSettings) ? arrowSettings.showArrow : false;
                if (!isNullOrUndefined(longitude) && !isNullOrUndefined(latitude) && longitude.length === latitude.length && visible) {
                    for (var i_1 = 0; i_1 < longitude.length; i_1++) {
                        var location_1 = (this.maps.isTileMap) ? convertTileLatLongToPoint(new Point(longitude[i_1], latitude[i_1]), factor, this.maps.tileTranslatePoint, true) : convertGeoToPoint(latitude[i_1], longitude[i_1], factor, layer, this.maps);
                        point.push(location_1);
                    }
                }
                navigationGroup = (this.maps.renderer.createGroup({
                    id: this.maps.element.id + '_LayerIndex_' + layerIndex + '_NavigationGroup' + i + ''
                }));
                for (var j = 0; j < point.length - 1; j++) {
                    angle = (-1 > angle) ? -1 : angle;
                    angle = (1 < angle) ? 1 : angle;
                    var arcId = this.maps.element.id + '_LayerIndex_' + layerIndex + '_NavigationIndex_' + i + '_Line' + j + '';
                    var radius = this.convertRadius(point[j], point[j + 1]);
                    if (angle <= 1 && angle > 0) {
                        direction = 0;
                        if (point[j]['x'] > point[j + 1]['x']) {
                            direction = 1;
                        }
                    }
                    if (angle >= -1 && angle < 0) {
                        direction = 1;
                        if (point[j]['x'] > point[j + 1]['x']) {
                            direction = 0;
                        }
                    }
                    if (showArrow) {
                        arrowColor = arrowSettings.color;
                        arrowSize = !isNullOrUndefined(arrowSettings.size) ? arrowSettings.size : 0;
                        offSetValue = !isNullOrUndefined(arrowSettings.offSet) ? arrowSettings.offSet : 0;
                        var divide = (Math.round(arrowSize / 2));
                        arrowPosition = arrowSettings.position;
                        startArrow = (arrowPosition === 'Start') ? 'url(#triangle' + i + ')' : null;
                        endArrow = (arrowPosition === 'End') ? 'url(#triangle' + i + ')' : null;
                        if (offSet !== 0 && angle === 0) {
                            offSet = (arrowPosition === 'Start') ? offSetValue : -(offSetValue);
                        }
                        offSet = (isNullOrUndefined(offSet)) ? 0 : offSet;
                        var triId = this.maps.element.id + '_triangle';
                        var defElement = this.maps.renderer.createDefs();
                        defElement.innerHTML += '<marker id="' + 'triangle' + i + '"></marker>';
                        var markerEle = defElement.querySelector('#' + 'triangle' + i);
                        markerEle.setAttribute('markerWidth', (arrowSize.toString()));
                        markerEle.setAttribute('markerHeight', (arrowSize.toString()));
                        markerEle.setAttribute('refX', (divide - offSet).toString());
                        markerEle.setAttribute('refY', divide.toString());
                        markerEle.setAttribute('orient', 'auto');
                        var d2 = 'M 0,0  L 0,' + arrowSize + ' L ' + divide + ', ' + divide + ' Z';
                        pathOption = new PathOption(triId, arrowColor, width, color, 1, 1, dashArray, d2);
                        navigationEle = this.maps.renderer.drawPath(pathOption);
                        markerEle.appendChild(navigationEle);
                        defElement.appendChild(markerEle);
                        navigationGroup.appendChild(defElement);
                    }
                    angle = Math.abs(angle);
                    d = (angle === 0) ? 'M ' + point[j]['x'] + ',' + point[j]['y'] + 'L ' + point[j + 1]['x']
                        + ',' + point[j + 1]['y'] + ' ' :
                        'M ' + point[j]['x'] + ',' + point[j]['y'] + ' A ' + (radius / 2 + (1 - angle) * radius / (angle * 10)) +
                            ' ' + (radius / 2 + (1 - angle) * radius / (angle * 10)) + ' ' + 0 + ',' + 0 + ','
                            + direction + ' , ' + point[j + 1]['x'] + ',' + point[j + 1]['y'] + ' ';
                    pathOption = new PathOption(arcId, 'none', width, color, 1, 1, dashArray, d);
                    navigationEle = this.maps.renderer.drawPath(pathOption);
                    if (!isNullOrUndefined(arrowPosition)) {
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        var position = (arrowPosition === 'Start') ? navigationEle.setAttribute('marker-start', startArrow)
                            : navigationEle.setAttribute('marker-end', endArrow);
                    }
                    maintainSelection(this.maps.selectedNavigationElementId, this.maps.navigationSelectionClass, navigationEle, 'navigationlineselectionMapStyle');
                    navigationGroup.appendChild(navigationEle);
                    group.appendChild(navigationGroup);
                }
                point = [];
            }
        }
        return group;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    NavigationLine.prototype.convertRadius = function (point1, point2) {
        var value1 = point2['x'] - point1['x'];
        var value2 = point2['y'] - point1['y'];
        var value = Math.sqrt((Math.pow(value1, 2) + Math.pow(value2, 2)));
        return value;
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name
     */
    NavigationLine.prototype.getModuleName = function () {
        return 'NavigationLine';
    };
    /**
     * To destroy the layers.
     *
     * @returns {void}
     * @private
     */
    NavigationLine.prototype.destroy = function () {
        this.maps = null;
    };
    return NavigationLine;
}());
export { NavigationLine };
