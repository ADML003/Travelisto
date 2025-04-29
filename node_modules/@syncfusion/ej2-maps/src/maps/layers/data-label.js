import { findMidPointOfPolygon, Rect, filter, getTemplateFunction, getZoomTranslate, getTranslate, RectOption, convertElementFromLabel, Point, TextOption, renderTextElement, textTrim, Internalize, measureTextElement } from '../utils/helper';
import { isNullOrUndefined, Animation, animationMode } from '@syncfusion/ej2-base';
import { dataLabelRendering } from '../model/constants';
/**
 * DataLabel Module used to render the maps datalabel
 */
var DataLabel = /** @class */ (function () {
    function DataLabel(maps) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.value = { rightWidth: 0, leftWidth: 0, heightTop: 0, heightBottom: 0 };
        this.maps = maps;
        this.dataLabelCollections = [];
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    DataLabel.prototype.getDataLabel = function (dataSource, labelPath, shapeName, shapeDataPath) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var text;
        var shapeNameValue;
        for (var i = 0; i < (isNullOrUndefined(dataSource) ? 0 : dataSource.length); i++) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var data = dataSource[i];
            var dataShapePathValue = !isNullOrUndefined(data[shapeDataPath]) && isNaN(data[shapeDataPath]) &&
                typeof data[shapeDataPath] === 'string' ? data[shapeDataPath].toLowerCase() : data[shapeDataPath];
            shapeName = !isNullOrUndefined(shapeName) && typeof shapeName === 'string' ? shapeName.toString() : shapeName;
            shapeNameValue = !isNullOrUndefined(shapeName) && typeof shapeName === 'string' ? shapeName.toLowerCase() : shapeName;
            if ((dataShapePathValue) === shapeNameValue) {
                text = data;
                break;
            }
        }
        return text;
    };
    /**
     * To render label for maps.
     *
     * @param {LayerSettings} layer - Specifies the layer settings
     * @param {number} layerIndex - Specifies the layer index.
     * @param {object} shape - Specifies the shape.
     * @param {any[]} layerData - Specifies the layer data.
     * @param {Element} group Specifies the element.
     * @param {HTMLElement} labelTemplateElement - Specifies the template element.
     * @param {number} index - Specifies the index number.
     * @param {any[]} intersect - Specifies the intersect.
     * @returns {void}
     * @private
     */
    DataLabel.prototype.renderLabel = function (layer, layerIndex, shape, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    layerData, group, labelTemplateElement, index, intersect) {
        var _this = this;
        var dataLabel = layer.dataLabelSettings;
        var style = layer.dataLabelSettings.textStyle;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var templateFn;
        var options;
        var dataLabelSettings = layer.dataLabelSettings;
        var labelpath = layer.dataLabelSettings.labelPath;
        var shapePoint = [[]];
        var midIndex = 0;
        var pointsLength = 0;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var shapeData = shape;
        var element;
        var rect;
        var text = '';
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var datasrcObj;
        var currentLength = 0;
        var oldIndex;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var location;
        var sublayerIndexLabel = false;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var shapeProperties = shape['properties'];
        var labelId = this.maps.element.id + '_LayerIndex_' + layerIndex + '_shapeIndex_' + index + '_LabelIndex_' + index;
        var textLocation = new Point(0, 0);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var shapes = layerData[index];
        var locationX;
        var locationY;
        style.fontFamily = this.maps.theme.toLowerCase() !== 'material' ? this.maps.themeStyle.labelFontFamily : style.fontFamily;
        style.fontWeight = style.fontWeight || this.maps.themeStyle.fontWeight;
        style.size = style.size || this.maps.themeStyle.fontSize;
        shape = !isNullOrUndefined(shapes) ? shapes['property'] : null;
        var properties = (Object.prototype.toString.call(layer.shapePropertyPath) === '[object Array]' ?
            layer.shapePropertyPath : [layer.shapePropertyPath]);
        var propertyPath;
        var isPoint = false;
        var animate = (layer.animationDuration !== 0 || animationMode === 'Enable') || isNullOrUndefined(this.maps.zoomModule);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var translate = (this.maps.isTileMap) ? new Object() : ((this.maps.zoomSettings.zoomFactor > 1 &&
            !isNullOrUndefined(this.maps.zoomModule)) ? getZoomTranslate(this.maps, layer, animate) :
            getTranslate(this.maps, layer, animate));
        var scale = (this.maps.isTileMap) ? this.maps.scale : translate['scale'];
        var transPoint = (this.maps.isTileMap) ? this.maps.translatePoint : translate['location'];
        var zoomTransPoint = this.maps.zoomTranslatePoint;
        var shapeWidth;
        var scaleZoomValue = !isNullOrUndefined(this.maps.scale) ? Math.floor(this.maps.scale) : 1;
        var zoomLabelsPosition = this.maps.zoomSettings.enable ? !isNullOrUndefined(this.maps.zoomShapeCollection) &&
            this.maps.zoomShapeCollection.length > 0 && !this.maps.isAddLayer : this.maps.zoomSettings.enable;
        this.maps.translateType = 'labels';
        for (var j = 0; j < properties.length; j++) {
            if (shapeProperties[properties[j]]) {
                propertyPath = properties[j];
                datasrcObj = this.getDataLabel(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                layer.dataSource, layer.shapeDataPath, shapeData['properties'][propertyPath], layer.shapeDataPath);
                if (datasrcObj) {
                    break;
                }
            }
        }
        datasrcObj = this.getDataLabel(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        layer.dataSource, layer.shapeDataPath, shapeData['properties'][propertyPath], layer.shapeDataPath);
        if (!isNullOrUndefined(shapes) && !isNullOrUndefined(shapes['property'])) {
            shapePoint = [[]];
            if (!layerData[index]['_isMultiPolygon'] && layerData[index]['type'] !== 'Point' && layerData[index]['type'] !== 'MultiPoint') {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                shapePoint.push(this.getPoint(layerData[index], []));
                currentLength = shapePoint[shapePoint.length - 1].length;
                if (pointsLength < currentLength) {
                    pointsLength = currentLength;
                    midIndex = shapePoint.length - 1;
                }
            }
            else if (layerData[index]['type'] !== 'Point' && layerData[index]['type'] !== 'MultiPoint') {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var layer_1 = layerData[index];
                for (var j = 0; j < layer_1.length; j++) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    shapePoint.push(this.getPoint(layer_1[j], []));
                    currentLength = shapePoint[shapePoint.length - 1].length;
                    if (pointsLength < currentLength) {
                        pointsLength = currentLength;
                        midIndex = shapePoint.length - 1;
                    }
                }
            }
        }
        text = (!isNullOrUndefined(datasrcObj)) ? !isNullOrUndefined(datasrcObj[labelpath]) ?
            datasrcObj[labelpath].toString() : shapeData['properties'][labelpath] || datasrcObj[layer.shapeDataPath] : shapeData['properties'][labelpath];
        if ((Object.prototype.toString.call(layer.shapePropertyPath) === '[object Array]') &&
            (isNullOrUndefined(text) && (!isNullOrUndefined(layer.dataSource) && layer.dataSource['length'] === 0))) {
            for (var l = 0; l < layer.shapePropertyPath.length; l++) {
                if (shapeData['properties'][layer.shapePropertyPath[l]]) {
                    text = shapeData['properties'][layer.shapePropertyPath[l]];
                    break;
                }
            }
        }
        if (isNullOrUndefined(text) && (layer.dataLabelSettings.template !== '' && layer.dataSource['length'] === 0)) {
            text = shapeData['properties'][layer.shapePropertyPath];
        }
        if (isNullOrUndefined(text) && (!isNullOrUndefined(layer.dataSource) && layer.dataSource['length'] > 0)) {
            text = '';
        }
        var dataLabelText = text;
        var projectionType = this.maps.projectionType;
        if (isPoint) {
            location = {
                x: shapePoint[midIndex][index]['x'], y: shapePoint[midIndex][index]['y'],
                rightMin: 0, rightMax: 0, leftMin: 0, leftMax: 0,
                points: shapePoint[midIndex][index], topMax: 0, topMin: 0,
                bottomMax: 0, bottomMin: 0, height: 0
            };
        }
        else {
            location = findMidPointOfPolygon(shapePoint[midIndex], projectionType, layer.geometryType);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var firstLevelMapLocation = location;
        if (!isNullOrUndefined(text) && !isNullOrUndefined(location)) {
            if (zoomLabelsPosition && scaleZoomValue > 1 && !this.maps.zoomNotApplied && dataLabel.template === '') {
                if (layerIndex > 0) {
                    for (var k = 0; k < this.maps.zoomLabelPositions.length; k++) {
                        if (this.maps.zoomLabelPositions[k]['dataLabelText'] === text) {
                            oldIndex = index;
                            index = k;
                            sublayerIndexLabel = true;
                            break;
                        }
                    }
                }
                locationX = location['x'];
                locationY = location['y'];
                location['x'] = ((location['x'] + zoomTransPoint['x']) * scale);
                location['y'] = ((location['y'] + zoomTransPoint['y']) * scale);
            }
            location['y'] = (this.maps.projectionType === 'Mercator') || layer.geometryType === 'Normal' ? location['y'] : (-location['y']);
            if (!isNullOrUndefined(this.maps.format) && !isNaN(Number(text)) && !isNaN(parseFloat(text))) {
                if (this.maps.useGroupingSeparator) {
                    text = Internalize(this.maps, parseFloat(text));
                    if (!isNullOrUndefined(datasrcObj)) {
                        datasrcObj[labelpath] = text;
                    }
                }
            }
            var eventargs_1 = {
                name: dataLabelRendering, maps: this.maps, cancel: false, border: { color: dataLabel.border.color,
                    width: dataLabel.border.width, opacity: dataLabel.border.opacity }, datalabel: dataLabel,
                fill: dataLabel.fill, template: dataLabel.template, text: text, offsetX: 0, offsetY: 0
            };
            this.maps.trigger('dataLabelRendering', eventargs_1, function (labelArgs) {
                if (eventargs_1.cancel) {
                    return;
                }
                var position = [];
                var width = zoomLabelsPosition && scaleZoomValue > 1 && !_this.maps.zoomNotApplied
                    && _this.maps.zoomShapeCollection.length > index ? (_this.maps.dataLabelShape[index]) * scale :
                    (location['rightMax']['x'] - location['leftMax']['x']) * scale;
                if (!isNullOrUndefined(_this.maps.dataLabelShape) && !_this.maps.isReset) {
                    shapeWidth = firstLevelMapLocation['rightMax']['x'] - firstLevelMapLocation['leftMax']['x'];
                    _this.maps.dataLabelShape.push(shapeWidth);
                }
                if (eventargs_1.text !== text && !eventargs_1.cancel) {
                    text = eventargs_1.text;
                }
                var textSize = measureTextElement(text, style);
                var trimmedLable = text;
                var elementSize = textSize;
                var startY = location['y'] - textSize['height'] / 2;
                var endY = location['y'] + textSize['height'] / 2;
                var start = ((location['y'] + transPoint['y']) * scale) - textSize['height'] / 2;
                var end = ((location['y'] + transPoint['y']) * scale) + textSize['height'] / 2;
                position = filter(shapePoint[midIndex], startY, endY);
                if (!isPoint && position.length > 5 && (shapeData['geometry']['type'] !== 'MultiPolygon') &&
                    (shapeData['type'] !== 'MultiPolygon')) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    var location1 = findMidPointOfPolygon(position, projectionType, layer.geometryType);
                    if (zoomLabelsPosition && scaleZoomValue > 1 && !_this.maps.zoomNotApplied && eventargs_1.template === '') {
                        location1['x'] = ((_this.maps.zoomLabelPositions[index]['location']['x'] + zoomTransPoint['x']) * scale);
                        location1['y'] = ((_this.maps.zoomLabelPositions[index]['location']['y'] + zoomTransPoint['y']) * scale);
                    }
                    locationX = location1['x'];
                    location['x'] = location1['x'];
                    width = zoomLabelsPosition && scaleZoomValue > 1 && !_this.maps.zoomNotApplied
                        && _this.maps.zoomShapeCollection.length > index ? (_this.maps.dataLabelShape[index]) * scale :
                        ((location1['rightMax']['x'] - location1['leftMax']['x']) * scale) > 0 ?
                            ((location1['rightMax']['x'] - location1['leftMax']['x']) * scale) : width;
                }
                var xpositionEnds = ((location['x'] + transPoint['x']) * scale) + textSize['width'] / 2;
                var xpositionStart = ((location['x'] + transPoint['x']) * scale) - textSize['width'] / 2;
                _this.value[index] = { rightWidth: xpositionEnds, leftWidth: xpositionStart, heightTop: start, heightBottom: end };
                var labelElement;
                if (eventargs_1.template !== '') {
                    templateFn = getTemplateFunction(eventargs_1.template, _this.maps);
                    var templateElement = templateFn ? templateFn(!isNullOrUndefined(datasrcObj) ?
                        datasrcObj : shapeData['properties'], _this.maps, eventargs_1.template, _this.maps.element.id + '_LabelTemplate', false) : document.createElement('div');
                    templateElement.innerHTML = !templateFn ? eventargs_1.template : '';
                    labelElement = convertElementFromLabel(templateElement, labelId, !isNullOrUndefined(datasrcObj) ? datasrcObj : shapeData['properties']);
                    if (_this.maps.isTileMap) {
                        labelElement.style.left = (((location['x'] + transPoint['x']) * scale) - (textSize['width'] / 2)) + 'px';
                        labelElement.style.top = (((location['y'] + transPoint['y']) * scale) - textSize['height']) + 'px';
                    }
                    else {
                        labelElement.style.left = ((Math.abs(_this.maps.baseMapRectBounds['min']['x'] - location['x'])) * scale) + labelArgs.offsetX + 'px';
                        labelElement.style.top = ((Math.abs(_this.maps.baseMapRectBounds['min']['y'] - location['y'])) * scale) + labelArgs.offsetY + 'px';
                    }
                    labelTemplateElement.appendChild(labelElement);
                }
                else {
                    var smartLabelMode = !isNullOrUndefined(dataLabelSettings.smartLabelMode) ? dataLabelSettings.smartLabelMode.toString() : 'None';
                    if (smartLabelMode === 'Trim') {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        var textType = typeof text === 'number' ? text.toString() : text;
                        trimmedLable = textTrim(width, textType, style, null, true);
                        elementSize = measureTextElement(trimmedLable, style);
                        options = new TextOption(labelId, textLocation.x, textLocation.y, 'middle', trimmedLable, '', '');
                    }
                    if (smartLabelMode === 'None') {
                        options = new TextOption(labelId, (textLocation.x), textLocation.y, 'middle', text, '', '');
                    }
                    if (smartLabelMode === 'Hide') {
                        text = (width >= textSize['width']) ? text : '';
                        options = new TextOption(labelId, (textLocation.x), (textLocation.y), 'middle', text, '', '');
                    }
                    if (!isNullOrUndefined(options)) {
                        text = options['text'];
                    }
                    var intersectionAction = !isNullOrUndefined(dataLabelSettings.intersectionAction) ? dataLabelSettings.intersectionAction.toString() : 'None';
                    if (intersectionAction === 'Hide') {
                        for (var i = 0; i < intersect.length; i++) {
                            if (!isNullOrUndefined(intersect[i])) {
                                if (!(_this.value[index]['leftWidth'] > intersect[i]['rightWidth']
                                    || _this.value[index]['rightWidth'] < intersect[i]['leftWidth']
                                    || _this.value[index]['heightTop'] > intersect[i]['heightBottom']
                                    || _this.value[index]['heightBottom'] < intersect[i]['heightTop'])) {
                                    text = '';
                                    break;
                                }
                            }
                        }
                        intersect.push(_this.value[index]);
                        options = new TextOption(labelId, textLocation.x, textLocation.y, 'middle', text, '', '');
                    }
                    var difference = void 0;
                    if (intersectionAction === 'Trim') {
                        for (var j = 0; j < intersect.length; j++) {
                            if (!isNullOrUndefined(intersect[j])) {
                                if (intersect[j]['rightWidth'] < _this.value[index]['leftWidth']
                                    || intersect[j]['leftWidth'] > _this.value[index]['rightWidth']
                                    || intersect[j]['heightBottom'] < _this.value[index]['heightTop']
                                    || intersect[j]['heightTop'] > _this.value[index]['heightBottom']) {
                                    trimmedLable = text;
                                    difference = 0;
                                }
                                else {
                                    if (_this.value[index]['leftWidth'] > intersect[j]['leftWidth']) {
                                        width = intersect[j]['rightWidth'] - _this.value[index]['leftWidth'];
                                        difference = width - (_this.value[index]['rightWidth'] - _this.value[index]['leftWidth']);
                                        trimmedLable = textTrim(difference, text, style, null, true);
                                        break;
                                    }
                                    if (_this.value[index]['leftWidth'] < intersect[j]['leftWidth']) {
                                        width = _this.value[index]['rightWidth'] - intersect[j]['leftWidth'];
                                        difference = Math.abs(width - (_this.value[index]['rightWidth'] - _this.value[index]['leftWidth']));
                                        trimmedLable = textTrim(difference, text, style, null, true);
                                        break;
                                    }
                                }
                            }
                        }
                        elementSize = measureTextElement(trimmedLable, style);
                        intersect.push(_this.value[index]);
                        options = new TextOption(labelId, textLocation.x, (textLocation.y), 'middle', trimmedLable, '', '');
                    }
                    if (intersectionAction === 'None') {
                        options = new TextOption(labelId, (textLocation.x), (textLocation.y), 'middle', text, '', '');
                    }
                    if (trimmedLable.length > 1) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        var border = eventargs_1.border;
                        if (border['width'] > 1) {
                            var fill = eventargs_1.fill;
                            var opacity = dataLabelSettings.opacity;
                            var rx = dataLabelSettings.rx;
                            var ry = dataLabelSettings.ry;
                            var x = void 0;
                            var y = void 0;
                            var padding = 5;
                            if (zoomLabelsPosition && scaleZoomValue > 1 && !_this.maps.zoomNotApplied) {
                                x = ((location['x'])) - textSize['width'] / 2;
                                y = ((location['y'])) - textSize['height'] / 2 - padding;
                            }
                            else {
                                x = ((location['x'] + transPoint['x']) * scale) - textSize['width'] / 2;
                                y = ((location['y'] + transPoint['y']) * scale) - textSize['height'] / 2;
                            }
                            border.opacity = isNullOrUndefined(border.opacity) ? opacity : border.opacity;
                            var rectOptions = new RectOption(_this.maps.element.id + '_LayerIndex_' + layerIndex + '_shapeIndex_' + index + '_rectIndex_' + index, fill, border, opacity, new Rect((x + labelArgs.offsetX), (y + labelArgs.offsetY), textSize['width'], textSize['height']), rx, ry);
                            rect = _this.maps.renderer.drawRectangle(rectOptions);
                            rect.setAttribute('visibility', layer.dataLabelSettings.animationDuration > 0 || animationMode === 'Enable' ? 'hidden' : 'visibile');
                            group.appendChild(rect);
                        }
                    }
                    element = renderTextElement(options, style, style.color || _this.maps.themeStyle.dataLabelFontColor, group);
                    element.setAttribute('aria-label', text);
                    element.setAttribute('role', 'region');
                    element.setAttribute('visibility', layer.dataLabelSettings.animationDuration > 0 || animationMode === 'Enable' ? 'hidden' : 'visibile');
                    if (zoomLabelsPosition && scaleZoomValue > 1 && !_this.maps.zoomNotApplied) {
                        element.setAttribute('transform', 'translate( ' + ((location['x'] + labelArgs.offsetX)) + ' '
                            + (((location['y'] + labelArgs.offsetY))) + ' )');
                        location['x'] = locationX;
                        location['y'] = locationY;
                    }
                    else {
                        element.setAttribute('transform', 'translate( ' + (((location['x'] + transPoint.x) * scale) + labelArgs.offsetX) + ' '
                            + ((((location['y'] + transPoint.y) * scale) + (elementSize.height / 2)) + labelArgs.offsetY) + ' )');
                    }
                    group.appendChild(element);
                }
                _this.dataLabelCollections.push({
                    location: { x: location['x'] + labelArgs.offsetX, y: location['y'] + labelArgs.offsetY },
                    element: isNullOrUndefined(labelElement) ? element : labelElement,
                    layerIndex: layerIndex,
                    shapeIndex: sublayerIndexLabel ? oldIndex : index,
                    labelIndex: sublayerIndexLabel ? oldIndex : index,
                    dataLabelText: dataLabelText
                });
                if (labelTemplateElement.childElementCount > 0 && !_this.maps.element.contains(labelTemplateElement)) {
                    document.getElementById(_this.maps.element.id + '_Secondary_Element').appendChild(labelTemplateElement);
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    _this.maps.renderReactTemplates();
                }
                if (layer.dataLabelSettings.animationDuration > 0 || animationMode === 'Enable') {
                    if (!isNullOrUndefined(element)) {
                        _this.datalabelAnimate(element, dataLabelSettings.animationDuration, style.opacity, false);
                        if (!isNullOrUndefined(rect)) {
                            _this.datalabelAnimate(rect, dataLabelSettings.animationDuration, dataLabelSettings.opacity, true);
                        }
                    }
                }
            });
        }
    };
    DataLabel.prototype.datalabelAnimate = function (element, duration, opacity, isRect) {
        var height = 0;
        new Animation({}).animate(element, {
            duration: (duration === 0 && animationMode === 'Enable') ? 1000 : duration,
            delay: 0,
            progress: function (args) {
                if (args.timeStamp > args.delay) {
                    height = ((args.timeStamp - args.delay) / args.duration);
                    element.setAttribute('style', 'user-select: none; visibility: visible;');
                    element.setAttribute(isRect ? 'fill-opacity' : 'opacity', (opacity * height).toString());
                }
            },
            end: function () {
                element.style.visibility = 'visible';
                element.setAttribute(isRect ? 'fill-opacity' : 'opacity', opacity.toString());
            }
        });
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    DataLabel.prototype.getPoint = function (shapes, points) {
        if (shapes['type'] === 'MultiLineString') {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            Array.prototype.forEach.call(shapes, function (current) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                Array.prototype.forEach.call(current, function (shape) {
                    points.push(new Point(shape['point']['x'], shape['point']['y']));
                });
            });
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            Array.prototype.forEach.call(shapes, function (current) {
                points.push(new Point(current['point']['x'], current['point']['y']));
            });
        }
        return points;
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    DataLabel.prototype.getModuleName = function () {
        return 'DataLabel';
    };
    /**
     * @returns {void}
     * @private
     */
    DataLabel.prototype.destroy = function () {
        this.dataLabelCollections = [];
        this.value = null;
        this.maps = null;
    };
    return DataLabel;
}());
export { DataLabel };
