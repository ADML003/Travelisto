import { ColorMapping, bubbleRendering } from '../index';
import { bubbleClick, bubbleMouseMove } from '../index';
import { isNullOrUndefined, animationMode } from '@syncfusion/ej2-base';
import { CircleOption, MapLocation, findMidPointOfPolygon, Point, drawCircle, elementAnimate, getTranslate } from '../utils/helper';
import { RectOption, Rect, drawRectangle, checkPropertyPath, getZoomTranslate, getRatioOfBubble, maintainSelection, getValueFromObject } from '../utils/helper';
/**
 * Bubble module class
 */
var Bubble = /** @class */ (function () {
    function Bubble(maps) {
        /**
         * Bubble Id for current layer
         *
         * @private
         */
        this.id = '';
        this.maps = maps;
        this.bubbleCollection = [];
    }
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
    Bubble.prototype.renderBubble = function (bubbleSettings, shapeData, color, range, bubbleIndex, dataIndex, layerIndex, layer, group, bubbleID) {
        var _this = this;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var layerData = layer.layerData;
        var colorValuePath = bubbleSettings.colorValuePath;
        var equalValue = (!isNullOrUndefined(colorValuePath)) ? ((colorValuePath.indexOf('.') > -1) ?
            (getValueFromObject(shapeData, bubbleSettings.colorValuePath)) : shapeData[colorValuePath]) :
            shapeData[colorValuePath];
        var colorValue = (!isNullOrUndefined(colorValuePath)) ? ((colorValuePath.indexOf('.') > -1) ?
            Number(getValueFromObject(shapeData, bubbleSettings.colorValuePath)) : Number(shapeData[colorValuePath])) :
            Number(shapeData[colorValuePath]);
        var bubbleValue = (!isNullOrUndefined(bubbleSettings.valuePath)) ? ((bubbleSettings.valuePath.indexOf('.') > -1) ?
            Number(getValueFromObject(shapeData, bubbleSettings.valuePath)) : Number(shapeData[bubbleSettings.valuePath])) :
            Number(shapeData[bubbleSettings.valuePath]);
        var opacity;
        var bubbleColor;
        if (isNaN(bubbleValue) && isNaN(colorValue) && isNullOrUndefined(equalValue)) {
            return null;
        }
        var radius = getRatioOfBubble(bubbleSettings.minRadius, bubbleSettings.maxRadius, bubbleValue, range.min, range.max);
        var colorMapping = new ColorMapping(this.maps);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var shapeColor = colorMapping.getColorByValue(bubbleSettings.colorMapping, colorValue, equalValue);
        // eslint-disable-next-line prefer-const
        bubbleColor = (Object.prototype.toString.call(shapeColor) === '[object Object]' &&
            !isNullOrUndefined(shapeColor['fill'])) ? shapeColor['fill'] : color;
        // eslint-disable-next-line prefer-const
        opacity = (Object.prototype.toString.call(shapeColor) === '[object Object]' &&
            !isNullOrUndefined(shapeColor['opacity'])) ? shapeColor['opacity'] : bubbleSettings.opacity;
        var shapePoints = [[]];
        this.maps.translateType = 'bubble';
        var midIndex = 0;
        var pointsLength = 0;
        var currentLength = 0;
        for (var i = 0, len = layerData.length; i < len; i++) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var shape = layerData[i];
            shape = shape['property'];
            var shapePath = checkPropertyPath(shapeData[layer.shapeDataPath], layer.shapePropertyPath, shape);
            var shapeDataLayerPathValue = !isNullOrUndefined(shapeData[layer.shapeDataPath]) &&
                isNaN(shapeData[layer.shapeDataPath]) ? shapeData[layer.shapeDataPath].toLowerCase() : shapeData[layer.shapeDataPath];
            var shapePathValue = !isNullOrUndefined(shape[shapePath]) && isNaN(shape[shapePath])
                ? shape[shapePath].toLowerCase() : shape[shapePath];
            if (shapeDataLayerPathValue === shapePathValue && (layerData[i].type !== 'LineString' && layerData[i].type !== 'MultiLineString' && layerData[i]['type'] !== 'Point' && layerData[i]['type'] !== 'MultiPoint')) {
                if (!layerData[i]['_isMultiPolygon']) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    shapePoints.push(this.getPoints(layerData[i], []));
                    currentLength = shapePoints[shapePoints.length - 1].length;
                    if (pointsLength < currentLength) {
                        pointsLength = currentLength;
                        midIndex = shapePoints.length - 1;
                    }
                }
                else {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    var layer_1 = layerData[i];
                    for (var j = 0; j < layer_1.length; j++) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        shapePoints.push(this.getPoints(layer_1[j], []));
                        currentLength = shapePoints[shapePoints.length - 1].length;
                        if (pointsLength < currentLength) {
                            pointsLength = currentLength;
                            midIndex = shapePoints.length - 1;
                        }
                    }
                }
            }
        }
        var projectionType = this.maps.projectionType;
        var centerY;
        var eventArgs;
        var bubbleBorder = {
            color: bubbleSettings.border.color, opacity: bubbleSettings.border.opacity,
            width: bubbleSettings.border.width
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var center = findMidPointOfPolygon(shapePoints[midIndex], projectionType, layer.geometryType);
        if (bubbleSettings.visible) {
            if (!isNullOrUndefined(center)) {
                centerY = this.maps.projectionType === 'Mercator' ? center['y'] : (-center['y']);
                eventArgs = {
                    cancel: false, name: bubbleRendering, border: bubbleBorder,
                    cx: center['x'], cy: centerY, data: shapeData, fill: bubbleColor,
                    maps: this.maps, radius: radius
                };
            }
            else {
                var shapePointsLength = shapePoints.length - 1;
                if (shapePoints[shapePointsLength]['x'] && shapePoints[shapePointsLength]['y']) {
                    eventArgs = {
                        cancel: false, name: bubbleRendering, border: bubbleBorder,
                        cx: shapePoints[shapePointsLength]['x'], cy: shapePoints[shapePointsLength]['y'],
                        data: shapeData, fill: bubbleColor, maps: this.maps,
                        radius: radius
                    };
                }
                else {
                    return;
                }
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            this.maps.trigger('bubbleRendering', eventArgs, function (bubbleArgs) {
                if (eventArgs.cancel) {
                    return;
                }
                var bubbleElement;
                eventArgs.border.opacity = isNullOrUndefined(eventArgs.border.opacity) ? opacity : eventArgs.border.opacity;
                if (bubbleSettings.bubbleType === 'Circle') {
                    var circle = new CircleOption(bubbleID, eventArgs.fill, eventArgs.border, opacity, 0, 0, eventArgs.radius, null);
                    bubbleElement = drawCircle(_this.maps, circle, group);
                }
                else {
                    var y = _this.maps.projectionType === 'Mercator' ? (eventArgs.cy - radius) : (eventArgs.cy + radius);
                    var rectangle = new RectOption(bubbleID, eventArgs.fill, eventArgs.border, opacity, new Rect(0, 0, radius * 2, radius * 2), 2, 2);
                    eventArgs.cx -= radius;
                    eventArgs.cy = y;
                    bubbleElement = drawRectangle(_this.maps, rectangle, group);
                }
                maintainSelection(_this.maps.selectedBubbleElementId, _this.maps.bubbleSelectionClass, bubbleElement, 'BubbleselectionMapStyle');
                _this.bubbleCollection.push({
                    LayerIndex: layerIndex,
                    BubbleIndex: bubbleIndex,
                    DataIndex: dataIndex,
                    element: bubbleElement,
                    center: { x: eventArgs.cx, y: eventArgs.cy }
                });
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var translate;
                var animate = (layer.animationDuration !== 0 || animationMode === 'Enable') || isNullOrUndefined(_this.maps.zoomModule);
                if (_this.maps.zoomSettings.zoomFactor > 1 && !isNullOrUndefined(_this.maps.zoomModule) && !_this.maps.isTileMap) {
                    translate = getZoomTranslate(_this.maps, layer, animate);
                }
                else {
                    translate = getTranslate(_this.maps, layer, animate);
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var bubbleDataSource = bubbleSettings.dataSource;
                var scale = translate['scale'];
                var transPoint = translate['location'];
                var position = new MapLocation((_this.maps.isTileMap ? ((eventArgs.cx + _this.maps.translatePoint.x) * _this.maps.tileZoomLevel)
                    : ((eventArgs.cx + transPoint.x) * scale)), (_this.maps.isTileMap ? ((eventArgs.cy + _this.maps.translatePoint.y) * _this.maps.tileZoomLevel)
                    : ((eventArgs.cy + transPoint.y) * scale)));
                bubbleElement.setAttribute('transform', 'translate( ' + (position.x) + ' ' + (position.y) + ' )');
                var bubble = (bubbleDataSource.length - 1) === dataIndex ? 'bubble' : null;
                if (bubbleSettings.bubbleType === 'Square') {
                    position.x += radius;
                    position.y += radius * (_this.maps.projectionType === 'Mercator' ? 1 : -1);
                }
                else {
                    radius = 0;
                }
                if (bubbleSettings.animationDuration > 0 || animationMode === 'Enable') {
                    elementAnimate(bubbleElement, bubbleSettings.animationDelay, bubbleSettings.animationDuration, position, _this.maps, bubble, radius);
                }
            });
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Bubble.prototype.getPoints = function (shape, points) {
        if (isNullOrUndefined(shape.map)) {
            points = shape['point'];
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            shape.map(function (current) {
                points.push(new Point(current['point']['x'], current['point']['y']));
            });
        }
        return points;
    };
    /**
     * To check and trigger bubble click event.
     *
     * @param {PointerEvent} e - Specifies the pointer event argument.
     * @returns {void}
     * @private
     */
    Bubble.prototype.bubbleClick = function (e) {
        var target = e.target.id;
        if (target.indexOf('_LayerIndex_') === -1) {
            return;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var data = this.getbubble(target);
        if (isNullOrUndefined(data)) {
            return;
        }
        var eventArgs = {
            cancel: false, name: bubbleClick, data: data, maps: this.maps,
            target: target, x: e.clientX, y: e.clientY
        };
        this.maps.trigger(bubbleClick, eventArgs);
    };
    /**
     * To get bubble from target id.
     *
     * @param {string} target - Specifies the target
     * @returns {object} - Returns the object
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Bubble.prototype.getbubble = function (target) {
        var id = target.split('_LayerIndex_');
        var index = parseInt(id[1].split('_')[0], 10);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var data;
        if (target.indexOf('_BubbleIndex_') > -1) {
            var layer = this.maps.layers[index];
            var bubbleIndex = parseInt(id[1].split('_BubbleIndex_')[1], 10);
            var dataIndex = parseInt(id[1].split('_BubbleIndex_')[1].split('_dataIndex_')[1], 10);
            if (!isNaN(bubbleIndex)) {
                data = layer.bubbleSettings[bubbleIndex].dataSource[dataIndex];
                return data;
            }
        }
        return null;
    };
    // eslint-disable-next-line valid-jsdoc
    /**
     * To check and trigger bubble move event.
     *
     * @param {PointerEvent} e - Specifies the pointer event argument.
     * @retruns {void}
     * @private
     */
    Bubble.prototype.bubbleMove = function (e) {
        var target = e.target.id;
        if (target.indexOf('_LayerIndex_') === -1) {
            return;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var data = this.getbubble(target);
        if (isNullOrUndefined(data)) {
            return;
        }
        var eventArgs = {
            cancel: false, name: bubbleMouseMove, data: data, maps: this.maps,
            target: target, x: e.clientX, y: e.clientY
        };
        this.maps.trigger(bubbleMouseMove, eventArgs);
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    Bubble.prototype.getModuleName = function () {
        return 'Bubble';
    };
    /**
     * To destroy the bubble.
     *
     * @returns {void}
     * @private
     */
    Bubble.prototype.destroy = function () {
        this.bubbleCollection = [];
        this.maps = null;
    };
    return Bubble;
}());
export { Bubble };
