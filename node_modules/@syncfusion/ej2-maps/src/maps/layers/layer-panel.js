/* eslint-disable no-case-declarations */
import { isNullOrUndefined, extend, createElement, Fetch, animationMode } from '@syncfusion/ej2-base';
import { getShapeColor } from '../model/theme';
import { GeoLocation, isCustomPath, convertGeoToPoint, Point, PathOption, Size, removeElement, maintainToggleSelection } from '../utils/helper';
import { getElementByID, maintainSelection, getValueFromObject } from '../utils/helper';
import { RectOption, getTranslate, convertTileLatLongToPoint, checkShapeDataFields, CircleOption } from '../utils/helper';
import { getZoomTranslate, fixInitialScaleForTile } from '../utils/helper';
import { Tile } from '../model/base';
import { BingMap } from './bing-map';
import { ColorMapping } from './color-mapping';
import { layerRendering, shapeRendering } from '../index';
/**
 * To calculate and render the shape layer
 */
var LayerPanel = /** @class */ (function () {
    function LayerPanel(map) {
        this.isMapCoordinates = true;
        this.horizontalPan = false;
        this.horizontalPanXCount = 0;
        this.mapObject = map;
        this.ajaxModule = new Fetch();
        this.ajaxResponse = [];
    }
    LayerPanel.prototype.measureLayerPanel = function () {
        var _this = this;
        var layerCollection = this.mapObject.layersCollection;
        var areaRect = this.mapObject.mapAreaRect;
        var secondaryEle = getElementByID(this.mapObject.element.id + '_Secondary_Element');
        if (this.mapObject.isTileMap && secondaryEle) {
            this.tileSvgObject = this.mapObject.renderer.createSvg({
                id: this.mapObject.element.id + '_Tile_SVG', width: areaRect.width,
                height: areaRect.height
            });
            var parentElement = createElement('div', {
                id: this.mapObject.element.id + '_Tile_SVG_Parent'
            });
            parentElement.style.cssText = 'position: absolute; height: ' + (areaRect.height) + 'px; width: ' +
                (areaRect.width) + 'px;';
            parentElement.appendChild(this.tileSvgObject);
            secondaryEle.appendChild(parentElement);
        }
        this.layerGroup = (this.mapObject.renderer.createGroup({
            id: this.mapObject.element.id + '_Layer_Collections',
            'clip-path': 'url(#' + this.mapObject.element.id + '_MapArea_ClipRect)'
        }));
        this.clipRectElement = this.mapObject.renderer.drawClipPath(new RectOption(this.mapObject.element.id + '_MapArea_ClipRect', 'transparent', { width: 1, color: 'Gray' }, 1, {
            x: this.mapObject.isTileMap ? 0 : areaRect.x, y: this.mapObject.isTileMap ? 0 : areaRect.y,
            width: areaRect.width, height: areaRect.height
        }));
        this.layerGroup.appendChild(this.clipRectElement);
        this.mapObject.baseMapBounds = null;
        this.mapObject.baseMapRectBounds = null;
        this.mapObject.baseSize = null;
        Array.prototype.forEach.call(layerCollection, function (layer, index) {
            _this.currentLayer = layer;
            _this.processLayers(layer, index);
        });
        if (!isNullOrUndefined(this.mapObject.legendModule) && this.mapObject.legendSettings.position === 'Float') {
            if (this.mapObject.isTileMap) {
                this.layerGroup.appendChild(this.mapObject.legendModule.legendGroup);
            }
            else {
                this.mapObject.svgObject.appendChild(this.mapObject.legendModule.legendGroup);
            }
        }
    };
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
    LayerPanel.prototype.renderTileLayer = function (panel, layer, layerIndex, bing) {
        panel.currentFactor = panel.calculateFactor(layer);
        panel.mapObject.defaultState = ((panel.mapObject.zoomSettings.zoomFactor !== 1) &&
            (!isNullOrUndefined(panel.mapObject.tileZoomLevel) && panel.mapObject.tileZoomLevel !== 1)) ?
            false : true;
        if (isNullOrUndefined(panel.mapObject.previousCenterLatitude) &&
            isNullOrUndefined(panel.mapObject.previousCenterLongitude) && !panel.mapObject.isZoomByPosition) {
            panel.mapObject.previousCenterLatitude = panel.mapObject.centerPosition.latitude;
            panel.mapObject.previousCenterLongitude = panel.mapObject.centerPosition.longitude;
        }
        else if ((panel.mapObject.previousCenterLatitude !==
            panel.mapObject.centerPosition.latitude && panel.mapObject.previousCenterLongitude !==
            panel.mapObject.centerPosition.longitude) || panel.mapObject.isZoomByPosition) {
            panel.mapObject.centerPositionChanged = true;
            panel.mapObject.previousCenterLatitude = panel.mapObject.centerPosition.latitude;
            panel.mapObject.previousCenterLongitude = panel.mapObject.centerPosition.longitude;
        }
        else {
            panel.mapObject.centerPositionChanged = false;
        }
        var center = new Point(panel.mapObject.centerPosition.longitude, panel.mapObject.centerPosition.latitude);
        var centerTileMap = center;
        if ((this.mapObject.isTileMap && panel.mapObject.markerModule) && panel.mapObject.zoomSettings.enable) {
            panel.mapObject.markerModule.calculateZoomCenterPositionAndFactor(this.mapObject.layersCollection);
            if (!isNullOrUndefined(this.mapObject.markerCenterLatitude) && !isNullOrUndefined(this.mapObject.markerCenterLongitude)
                && !panel.mapObject.isZoomByPosition) {
                centerTileMap = new Point(panel.mapObject.markerCenterLongitude, panel.mapObject.markerCenterLatitude);
            }
        }
        if (!panel.mapObject.zoomSettings.shouldZoomInitially && panel.mapObject.centerPosition.longitude
            && panel.mapObject.centerPosition.latitude && !panel.mapObject.zoomPersistence && panel.mapObject.defaultState) {
            center = new Point(panel.mapObject.centerPosition.longitude, panel.mapObject.centerPosition.latitude);
        }
        else if (panel.mapObject.zoomSettings.shouldZoomInitially
            && panel.mapObject.markerZoomedState && !panel.mapObject.zoomPersistence
            && !isNullOrUndefined(panel.mapObject.markerZoomCenterPoint)) {
            center = new Point(panel.mapObject.markerZoomCenterPoint.longitude, panel.mapObject.markerZoomCenterPoint.latitude);
        }
        else {
            center = { x: null, y: null };
        }
        var zoomFactorValue = (panel.mapObject.zoomSettings.shouldZoomInitially && !panel.mapObject.isZoomByPosition) ?
            isNullOrUndefined(panel.mapObject.markerZoomFactor) ? 1 :
                panel.mapObject.markerZoomFactor : panel.mapObject.zoomSettings.zoomFactor;
        zoomFactorValue = (panel.mapObject.enablePersistence) ? ((isNullOrUndefined(panel.mapObject.mapScaleValue))
            ? (isNullOrUndefined(panel.mapObject.markerZoomFactor) ? panel.mapObject.zoomSettings.zoomFactor :
                panel.mapObject.markerZoomFactor) : panel.mapObject.mapScaleValue) : zoomFactorValue;
        zoomFactorValue = panel.mapObject.zoomSettings.enable ? zoomFactorValue : panel.mapObject.zoomSettings.zoomFactor;
        zoomFactorValue = zoomFactorValue > 0 ? zoomFactorValue : 1;
        panel.mapObject.defaultState = zoomFactorValue !== 1 ? false : true;
        if (!panel.mapObject.markerZoomedState && panel.mapObject.zoomSettings.shouldZoomInitially &&
            panel.mapObject.zoomSettings.zoomFactor === 1) {
            panel.mapObject.defaultState = true;
        }
        if (isNullOrUndefined(panel.mapObject.tileZoomLevel)) {
            panel.mapObject.tileZoomLevel = zoomFactorValue;
            panel.mapObject.previousZoomFactor = zoomFactorValue;
        }
        else if (this.mapObject.isReset && panel.mapObject.tileZoomLevel === 1 && !panel.mapObject.zoomSettings.shouldZoomInitially) {
            var zoomLevel = panel.mapObject.tileZoomLevel;
            panel.mapObject.tileZoomLevel = zoomLevel;
        }
        else if (panel.mapObject.zoomSettings.zoomFactor !== 1 || panel.mapObject.zoomSettings.shouldZoomInitially) {
            panel.mapObject.previousZoomFactor = panel.mapObject.tileZoomLevel;
            panel.mapObject.tileZoomLevel = panel.mapObject.defaultState && panel.mapObject.zoomSettings.enable ?
                panel.mapObject.tileZoomLevel : !panel.mapObject.zoomSettings.shouldZoomInitially
                && !panel.mapObject.centerPositionChanged ?
                panel.mapObject.previousZoomFactor !== panel.mapObject.zoomSettings.zoomFactor ?
                    panel.mapObject.zoomSettings.zoomFactor : panel.mapObject.tileZoomLevel : zoomFactorValue;
            panel.mapObject.tileZoomLevel = zoomFactorValue === 1 && panel.mapObject.zoomSettings.zoomFactor === 0 ?
                zoomFactorValue : panel.mapObject.tileZoomLevel;
            if (!isNullOrUndefined(panel.mapObject.tileTranslatePoint) &&
                (panel.mapObject.markerZoomFactor !== panel.mapObject.mapScaleValue
                    || (isNullOrUndefined(panel.mapObject.markerZoomFactor)
                        && isNullOrUndefined(panel.mapObject.mapScaleValue)))
                && (panel.mapObject.zoomSettings.zoomFactor <= 1 || panel.mapObject.previousZoomFactor !==
                    panel.mapObject.zoomSettings.zoomFactor)) {
                panel.mapObject.tileTranslatePoint.x = 0;
                panel.mapObject.tileTranslatePoint.y = 0;
            }
        }
        else if (panel.mapObject.defaultState) {
            panel.mapObject.previousZoomFactor = panel.mapObject.tileZoomLevel;
            panel.mapObject.tileZoomLevel = zoomFactorValue;
            if (!isNullOrUndefined(panel.mapObject.tileTranslatePoint)) {
                panel.mapObject.tileTranslatePoint.x = 0;
                panel.mapObject.tileTranslatePoint.y = 0;
            }
        }
        if (zoomFactorValue <= 1 && !isNullOrUndefined(panel.mapObject.height) && !panel.mapObject.zoomSettings.shouldZoomInitially
            && (panel.mapObject.tileZoomLevel === panel.mapObject.tileZoomScale) && this.mapObject.initialCheck) {
            fixInitialScaleForTile(this.mapObject);
        }
        if (!isNullOrUndefined(panel.mapObject.centerLatOfGivenLocation) && !isNullOrUndefined(panel.mapObject.centerLongOfGivenLocation) &&
            panel.mapObject.zoomNotApplied) {
            if (!isNullOrUndefined(centerTileMap)) {
                centerTileMap.y = panel.mapObject.centerLatOfGivenLocation;
                centerTileMap.x = panel.mapObject.centerLongOfGivenLocation;
            }
            panel.mapObject.tileZoomLevel = panel.mapObject.mapScaleValue = panel.mapObject.scaleOfGivenLocation;
        }
        panel.mapObject.tileTranslatePoint = panel.panTileMap(panel.mapObject.availableSize.width, panel.mapObject.availableSize.height, centerTileMap);
        if (this.mapObject.zoomSettings.resetToInitial && this.mapObject.initialCheck && !isNullOrUndefined(panel.mapObject.height)
            && this.mapObject.availableSize.height > 512) {
            this.mapObject.applyZoomReset = true;
            this.mapObject.initialZoomLevel = Math.floor(this.mapObject.availableSize.height / 512);
            var padding = 20;
            var totalSize = Math.pow(2, this.mapObject.initialZoomLevel) * 256;
            if (!isNullOrUndefined(this.mapObject.initialTileTranslate)) {
                this.mapObject.initialTileTranslate.x = (this.mapObject.availableSize.width / 2) - (totalSize / 2);
                this.mapObject.initialTileTranslate.y = (this.mapObject.availableSize.height / 2) - (totalSize / 2) + padding;
            }
        }
        panel.generateTiles(panel.mapObject.tileZoomLevel, panel.mapObject.tileTranslatePoint, null, bing);
        if (!isNullOrUndefined(panel.mapObject.previousZoomFactor)
            && panel.mapObject.previousZoomFactor !== panel.mapObject.zoomSettings.zoomFactor) {
            panel.mapObject.previousZoomFactor = panel.mapObject.zoomSettings.zoomFactor;
        }
        if (panel.mapObject.polygonModule) {
            var polygonElement = panel.mapObject.polygonModule.polygonRender(this.mapObject, layerIndex, panel.mapObject.tileZoomLevel);
            if (!isNullOrUndefined(polygonElement)) {
                panel.layerObject.appendChild(polygonElement);
            }
        }
        if (panel.mapObject.navigationLineModule) {
            var navigationLineElement = panel.mapObject.navigationLineModule.renderNavigation(panel.currentLayer, panel.mapObject.tileZoomLevel, layerIndex);
            if (!isNullOrUndefined(navigationLineElement)) {
                panel.layerObject.appendChild(navigationLineElement);
            }
        }
        if (panel.mapObject.markerModule) {
            panel.mapObject.markerModule.markerRender(this.mapObject, panel.layerObject, layerIndex, panel.mapObject.tileZoomLevel, null);
        }
        panel.translateLayerElements(panel.layerObject);
        panel.layerGroup.appendChild(panel.layerObject);
    };
    LayerPanel.prototype.processLayers = function (layer, layerIndex) {
        var _this = this;
        this.layerObject = (this.mapObject.renderer.createGroup({
            id: this.mapObject.element.id + '_LayerIndex_' + layerIndex
        }));
        if (!this.mapObject.enablePersistence) {
            var itemName = this.mapObject.getModuleName() + this.mapObject.element.id;
            if (navigator.userAgent.indexOf('Edge') === -1) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var data = void 0;
                try {
                    data = window.localStorage;
                }
                catch (e) {
                    data = null;
                }
                if (!isNullOrUndefined(data) && window.localStorage.getItem(itemName)) {
                    window.localStorage.removeItem(itemName);
                }
            }
        }
        var eventArgs = {
            cancel: false, name: layerRendering, index: layerIndex,
            layer: layer, maps: this.mapObject, visible: layer.visible
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this.mapObject.trigger('layerRendering', eventArgs, function (observedArgs) {
            if (!eventArgs.cancel && eventArgs.visible) {
                if ((isNullOrUndefined(layer.shapeData) && !isNullOrUndefined(layer.urlTemplate) && layer.urlTemplate !== '')) {
                    if (!isNullOrUndefined(layer.urlTemplate) && layer.urlTemplate.indexOf('quadkey') > -1) {
                        var bing = new BingMap(_this.mapObject);
                        _this.bingMapCalculation(layer, layerIndex, _this, bing);
                    }
                    else {
                        _this.renderTileLayer(_this, layer, layerIndex);
                    }
                }
                else {
                    if (!isNullOrUndefined(layer.shapeData) && (!isNullOrUndefined(layer.shapeData['geometries']) ||
                        !isNullOrUndefined(layer.shapeData['features']))) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        var featureData = (!isNullOrUndefined(layer.shapeData['geometries']) &&
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            layer.shapeData['geometries'].length > 0 ? layer.shapeData['geometries'] :
                            layer.shapeData['features']);
                        layer.layerData = [];
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        var bbox = layer.shapeData['bbox'];
                        if (!isNullOrUndefined(bbox) && layer.isBaseLayer) {
                            _this.mapObject.baseMapBounds = new GeoLocation({ min: bbox[0][1], max: bbox[1][1] }, { min: bbox[0][0], max: bbox[1][0] });
                        }
                        else if (isNullOrUndefined(_this.mapObject.baseMapBounds) && !isCustomPath(featureData)) {
                            _this.calculateRectBounds(featureData);
                        }
                        _this.calculatePathCollection(layerIndex, featureData);
                    }
                }
            }
        });
        if (!this.mapObject.isTileMap) {
            this.mapObject.svgObject.appendChild(this.layerGroup);
        }
        else if (this.tileSvgObject) {
            this.tileSvgObject.appendChild(this.layerGroup);
            this.mapObject.baseMapBounds = null;
        }
    };
    LayerPanel.prototype.bingMapCalculation = function (layer, layerIndex, proxy, bing) {
        bing.imageUrl = layer.urlTemplate;
        bing.subDomains = ['t0', 't1', 't2', 't3'];
        bing.maxZoom = '21';
        proxy.mapObject.bingMap = bing;
        proxy.renderTileLayer(proxy, layer, layerIndex, bing);
        this.mapObject.arrangeTemplate();
        if (this.mapObject.zoomModule && (this.mapObject.previousScale !== this.mapObject.scale)) {
            this.mapObject.zoomModule.applyTransform(this.mapObject, false, true);
        }
    };
    LayerPanel.prototype.bubbleCalculation = function (bubbleSettings, range) {
        if (bubbleSettings.dataSource != null && bubbleSettings != null) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var bubbleDataSource = bubbleSettings.dataSource;
            for (var i = 0; i < bubbleDataSource.length; i++) {
                var bubbledata = (!isNullOrUndefined(bubbleSettings.valuePath)) ? ((bubbleSettings.valuePath.indexOf('.') > -1) ?
                    Number(getValueFromObject(bubbleSettings.dataSource[i], bubbleSettings.valuePath)) :
                    parseFloat(bubbleSettings.dataSource[i][bubbleSettings.valuePath])) :
                    parseFloat(bubbleSettings.dataSource[i][bubbleSettings.valuePath]);
                if (!isNaN(bubbledata)) {
                    if (i !== 0) {
                        if (bubbledata > range.max) {
                            range.max = bubbledata;
                        }
                        else if (bubbledata < range.min) {
                            range.min = bubbledata;
                        }
                    }
                    else {
                        range.max = range.min = bubbledata;
                    }
                }
            }
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    LayerPanel.prototype.calculatePathCollection = function (layerIndex, renderData) {
        var _this = this;
        this.groupElements = [];
        if ((!isCustomPath(renderData))) {
            this.currentFactor = this.calculateFactor(this.currentLayer);
        }
        this.rectBounds = null;
        var shapeSettings = this.currentLayer.shapeSettings;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Array.prototype.forEach.call(renderData, function (geometryData) {
            if (!isNullOrUndefined(geometryData['geometry']) || !isNullOrUndefined(geometryData['coordinates'])) {
                var type = !isNullOrUndefined(geometryData['geometry']) ? geometryData['geometry']['type'] : geometryData['type'];
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var coords = !isNullOrUndefined(geometryData['geometry']) ? geometryData['geometry']['coordinates'] :
                    geometryData['coordinates'];
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var data = geometryData['geometry'];
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var properties = geometryData['properties'];
                _this.generatePoints(type, coords, data, properties);
            }
        });
        this.currentLayer.rectBounds = this.rectBounds;
        if (isNullOrUndefined(this.mapObject.baseMapRectBounds) && this.currentLayer.isBaseLayer) {
            this.mapObject.baseMapRectBounds = this.rectBounds;
        }
        var colors = (!isNullOrUndefined(shapeSettings.palette) && shapeSettings.palette.length > 1) ?
            shapeSettings.palette : getShapeColor(this.mapObject.theme);
        var labelTemplateEle = createElement('div', {
            id: this.mapObject.element.id + '_LayerIndex_' + layerIndex + '_Label_Template_Group',
            className: this.mapObject.element.id + '_template'
        });
        labelTemplateEle.style.cssText = 'pointer-events: none; overflow: hidden; position: absolute;' +
            'top:' + this.mapObject.mapAreaRect.y + 'px;' +
            'left:' + this.mapObject.mapAreaRect.x + 'px;' +
            'height:' + this.mapObject.mapAreaRect.height + 'px;' +
            'width:' + this.mapObject.mapAreaRect.width + 'px;';
        if (this.currentLayer.layerData.length !== 0) {
            var _loop_1 = function (i) {
                var k = void 0;
                var borderValue = {
                    color: shapeSettings.border.color || this_1.mapObject.themeStyle.shapeBorderColor,
                    width: shapeSettings.border.width,
                    opacity: shapeSettings.border.opacity
                };
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var currentShapeData = this_1.currentLayer.layerData[i];
                var pathOptions;
                var circleOptions;
                var groupElement;
                var path = '';
                var fill = (shapeSettings.autofill) ? colors[i % colors.length] :
                    (shapeSettings.fill || this_1.mapObject.themeStyle.shapeFill);
                if (shapeSettings.colorValuePath !== null && !isNullOrUndefined(currentShapeData['property'])) {
                    k = checkShapeDataFields(
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    this_1.currentLayer.dataSource, currentShapeData['property'], this_1.currentLayer.shapeDataPath, this_1.currentLayer.shapePropertyPath, this_1.currentLayer);
                    if (k !== null && shapeSettings.colorMapping.length === 0) {
                        fill = ((this_1.currentLayer.shapeSettings.colorValuePath.indexOf('.') > -1) ?
                            (getValueFromObject(this_1.currentLayer.dataSource[k], shapeSettings.colorValuePath)) :
                            this_1.currentLayer.dataSource[k][shapeSettings.colorValuePath]);
                    }
                    else if (currentShapeData['property'][shapeSettings.colorValuePath] &&
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        this_1.currentLayer.dataSource.length === 0 && shapeSettings.colorMapping.length === 0) {
                        fill = ((this_1.currentLayer.shapeSettings.colorValuePath.indexOf('.') > -1) ?
                            (getValueFromObject(currentShapeData['property'], shapeSettings.colorValuePath)) :
                            currentShapeData['property'][shapeSettings.colorValuePath]);
                    }
                    fill = !isNullOrUndefined(fill) ? fill : (shapeSettings.fill || this_1.mapObject.themeStyle.shapeFill);
                }
                var shapeID = this_1.mapObject.element.id + '_LayerIndex_' + layerIndex + '_shapeIndex_' + i + '_dataIndex_' + k;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var getShapeColor_1 = this_1.getShapeColorMapping(this_1.currentLayer, currentShapeData['property'], fill);
                fill = Object.prototype.toString.call(getShapeColor_1) === '[object Object]' && !isNullOrUndefined(getShapeColor_1['fill'])
                    ? getShapeColor_1['fill'] : fill;
                if (this_1.currentLayer.shapeSettings.borderColorValuePath || this_1.currentLayer.shapeSettings.borderWidthValuePath) {
                    k = checkShapeDataFields(
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    this_1.currentLayer.dataSource, currentShapeData['property'], this_1.currentLayer.shapeDataPath, this_1.currentLayer.shapePropertyPath, this_1.currentLayer);
                    if (k !== null) {
                        if (this_1.currentLayer.dataSource[k][shapeSettings.borderColorValuePath]) {
                            borderValue.color = this_1.currentLayer.dataSource[k][shapeSettings.borderColorValuePath];
                        }
                        if (this_1.currentLayer.dataSource[k][shapeSettings.borderWidthValuePath]) {
                            borderValue.width = this_1.currentLayer.dataSource[k][shapeSettings.borderWidthValuePath];
                        }
                    }
                }
                var opacity = (Object.prototype.toString.call(getShapeColor_1) === '[object Object]'
                    && !isNullOrUndefined(getShapeColor_1['opacity'])) ? getShapeColor_1['opacity'] : shapeSettings.opacity;
                var eventArgs = {
                    cancel: false, name: shapeRendering, index: i,
                    data: this_1.currentLayer.dataSource ? this_1.currentLayer.dataSource[k] : null,
                    maps: this_1.mapObject,
                    shape: shapeSettings, fill: fill,
                    border: { width: borderValue.width, color: borderValue.color, opacity: borderValue.opacity }
                };
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var shapeRenderingSuccess = function (eventArgs) {
                    var drawingType = !isNullOrUndefined(currentShapeData['_isMultiPolygon'])
                        ? 'MultiPolygon' : isNullOrUndefined(currentShapeData['type']) ? currentShapeData[0]['type'] : currentShapeData['type'];
                    drawingType = (drawingType === 'Polygon' || drawingType === 'MultiPolygon') ? 'Polygon' : drawingType;
                    if (!eventArgs.cancel) {
                        eventArgs.fill = eventArgs.fill === '#A6A6A6' ? eventArgs.shape.fill ||
                            _this.mapObject.themeStyle.shapeFill : eventArgs.fill;
                        eventArgs.border.color = eventArgs.border.color === 'transparent' ?
                            eventArgs.shape.border.color : eventArgs.border.color;
                        eventArgs.border.width = eventArgs.border.width === 0 ? eventArgs.shape.border.width : eventArgs.border.width;
                        if (isNullOrUndefined(shapeSettings.borderColorValuePath)) {
                            borderValue.color = eventArgs.border.color;
                        }
                        if (isNullOrUndefined(shapeSettings.borderWidthValuePath)) {
                            borderValue.width = eventArgs.border.width;
                        }
                    }
                    else {
                        eventArgs.fill = fill;
                        eventArgs.border.color = shapeSettings.border.color || _this.mapObject.themeStyle.shapeBorderColor;
                        eventArgs.border.width = shapeSettings.border.width;
                    }
                    eventArgs.border.opacity = isNullOrUndefined(eventArgs.border.opacity) ? opacity : eventArgs.border.opacity;
                    if (_this.groupElements.length < 1) {
                        groupElement = _this.mapObject.renderer.createGroup({
                            id: _this.mapObject.element.id + '_LayerIndex_' + layerIndex + '_' + drawingType + '_Group', transform: ''
                        });
                        _this.groupElements.push(groupElement);
                    }
                    else {
                        for (var i_1 = 0; i_1 < _this.groupElements.length; i_1++) {
                            var ele = _this.groupElements[i_1];
                            if (ele.id.indexOf(drawingType) > -1) {
                                groupElement = ele;
                                break;
                            }
                            else if (i_1 >= _this.groupElements.length - 1) {
                                groupElement = _this.mapObject.renderer.createGroup({
                                    id: _this.mapObject.element.id + '_LayerIndex_' + layerIndex + '_' + drawingType + '_Group'
                                });
                                _this.groupElements.push(groupElement);
                                break;
                            }
                        }
                    }
                    var pathEle;
                    switch (drawingType) {
                        case 'Polygon':
                            if (!currentShapeData['_isMultiPolygon']) {
                                path += 'M' + (currentShapeData[0]['point']['x']) + ' ' + (currentShapeData[0]['point']['y']);
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                currentShapeData.map(function (shapeData) {
                                    path += ' L ' + (shapeData['point']['x']) + ' ' + (shapeData['point']['y']);
                                });
                            }
                            else {
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                path = _this.generateMultiPolygonPath(currentShapeData);
                            }
                            path += ' z ';
                            if (path.length > 3) {
                                pathOptions = new PathOption(shapeID, eventArgs.fill, eventArgs.border.width, eventArgs.border.color, opacity, eventArgs.border.opacity, shapeSettings.dashArray, path);
                                pathEle = _this.mapObject.renderer.drawPath(pathOptions);
                            }
                            break;
                        case 'LineString':
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            currentShapeData.map(function (lineData, index) {
                                if (index === 0) {
                                    path += 'M ' + (lineData['point']['x']) + ' ' + (lineData['point']['y']);
                                }
                                else {
                                    path += 'L' + (lineData['point']['x']) + ' , ' + (lineData['point']['y']) + ' ';
                                }
                            });
                            if (path.length > 3) {
                                pathOptions = new PathOption(shapeID, 'transparent', !isNullOrUndefined(eventArgs.border.width) ? eventArgs.border.width : 1, !isNullOrUndefined(eventArgs.fill) ? eventArgs.fill :
                                    eventArgs.border.color, opacity, eventArgs.border.opacity, shapeSettings.dashArray, path);
                                pathEle = _this.mapObject.renderer.drawPath(pathOptions);
                            }
                            break;
                        case 'MultiLineString':
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            currentShapeData.map(function (multilineData) {
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                multilineData.map(function (lineData, index) {
                                    if (index === 0) {
                                        path += 'M ' + (lineData['point']['x']) + ' ' + (lineData['point']['y']);
                                    }
                                    else {
                                        path += 'L' + (lineData['point']['x']) + ' , ' + (lineData['point']['y']) + ' ';
                                    }
                                });
                            });
                            if (path.length > 3) {
                                pathOptions = new PathOption(shapeID, 'transparent', !isNullOrUndefined(eventArgs.border.width) ? eventArgs.border.width : 1, !isNullOrUndefined(eventArgs.fill) ? eventArgs.fill :
                                    eventArgs.border.color, opacity, eventArgs.border.opacity, shapeSettings.dashArray, path);
                                pathEle = _this.mapObject.renderer.drawPath(pathOptions);
                            }
                            break;
                        case 'Point':
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            var pointData = currentShapeData['point'];
                            var circleRadius = (_this.mapObject.layers[layerIndex].type !== 'SubLayer') ?
                                shapeSettings.circleRadius : shapeSettings.circleRadius / (_this.mapObject.isTileMap ?
                                _this.mapObject.scale : _this.currentFactor);
                            circleOptions = new CircleOption(shapeID, eventArgs.fill, eventArgs.border, opacity, pointData['x'], pointData['y'], circleRadius, shapeSettings.dashArray);
                            pathEle = _this.mapObject.renderer.drawCircle(circleOptions);
                            break;
                        case 'MultiPoint':
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            currentShapeData.map(function (multiPointData, index) {
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                var pointData = multiPointData['point'];
                                var circleRadius = (_this.mapObject.layers[layerIndex].type !== 'SubLayer') ? shapeSettings.circleRadius : shapeSettings.circleRadius / (_this.mapObject.isTileMap ? _this.mapObject.scale : _this.currentFactor);
                                circleOptions = new CircleOption((shapeID + '_multiLine_' + index), eventArgs.fill, eventArgs.border, opacity, pointData['x'], pointData['y'], circleRadius, shapeSettings.dashArray);
                                pathEle = _this.mapObject.renderer.drawCircle(circleOptions);
                                _this.pathAttributeCalculate(groupElement, pathEle, drawingType, currentShapeData);
                            });
                            break;
                        case 'Path':
                            path = currentShapeData['point'];
                            pathOptions = new PathOption(shapeID, eventArgs.fill, eventArgs.border.width, eventArgs.border.color, opacity, eventArgs.border.opacity, shapeSettings.dashArray, path);
                            pathEle = _this.mapObject.renderer.drawPath(pathOptions);
                            break;
                    }
                    if (!isNullOrUndefined(pathEle) && drawingType !== 'MultiPoint') {
                        _this.pathAttributeCalculate(groupElement, pathEle, drawingType, currentShapeData);
                    }
                    if (i === _this.currentLayer.layerData.length - 1) {
                        _this.layerFeatures(layerIndex, colors, renderData, labelTemplateEle);
                    }
                };
                shapeRenderingSuccess.bind(this_1);
                this_1.mapObject.trigger('shapeRendering', eventArgs, shapeRenderingSuccess);
            };
            var this_1 = this;
            for (var i = 0; i < this.currentLayer.layerData.length; i++) {
                _loop_1(i);
            }
        }
        else {
            this.layerFeatures(layerIndex, colors, renderData, labelTemplateEle);
        }
    };
    /**
     * layer features as bubble, marker, datalabel, navigation line.
     *
     * @param {Element} groupElement - Specifies the element to append the group.
     * @param {Element} pathEle - Specifies the svg element.
     * @param {string} drawingType - Specifies the data type.
     * @param {any} currentShapeData - Specifies the layer of shapedata.
     * @returns {void}
     */
    LayerPanel.prototype.pathAttributeCalculate = function (groupElement, pathEle, drawingType, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    currentShapeData) {
        var property = (Object.prototype.toString.call(this.currentLayer.shapePropertyPath) === '[object Array]' ?
            this.currentLayer.shapePropertyPath : [this.currentLayer.shapePropertyPath]);
        var properties;
        for (var j = 0; j < property.length; j++) {
            if (!isNullOrUndefined(currentShapeData['property'])) {
                properties = property[j];
                break;
            }
        }
        pathEle.setAttribute('aria-label', ((!isNullOrUndefined(currentShapeData['property'])) ?
            (currentShapeData['property'][properties]) : ''));
        if (this.currentLayer.selectionSettings.enable || this.currentLayer.highlightSettings.enable) {
            pathEle.tabIndex = this.mapObject.tabIndex;
            pathEle.setAttribute('role', 'button');
            pathEle.style.cursor = this.currentLayer.highlightSettings.enable && !this.currentLayer.selectionSettings.enable ? 'default' : 'pointer';
        }
        else {
            pathEle.setAttribute('role', 'region');
        }
        if (drawingType === 'LineString' || drawingType === 'MultiLineString') {
            pathEle.style.cssText = 'outline:none';
        }
        maintainSelection(this.mapObject.selectedElementId, this.mapObject.shapeSelectionClass, pathEle, 'ShapeselectionMapStyle');
        if (this.mapObject.legendSettings.toggleLegendSettings.enable && this.mapObject.legendSettings.type === 'Layers') {
            maintainToggleSelection(this.mapObject.toggledElementId, pathEle, this.mapObject.legendSettings.toggleLegendSettings.applyShapeSettings ? this.currentLayer.shapeSettings
                : this.mapObject.legendSettings.toggleLegendSettings);
        }
        groupElement.appendChild(pathEle);
    };
    /**
     * layer features as bubble, marker, datalabel, navigation line.
     *
     * @param {number} layerIndex - Specifies the layer index
     * @param {string[]} colors - Specifies the colors
     * @param {any[]} renderData - Specifies the render data
     * @param {HTMLElement} labelTemplateEle - Specifies the label template element
     * @returns {void}
     */
    LayerPanel.prototype.layerFeatures = function (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    layerIndex, colors, renderData, labelTemplateEle) {
        var _this = this;
        var bubbleG;
        if (this.mapObject.polygonModule) {
            this.groupElements.push(this.mapObject.polygonModule.polygonRender(this.mapObject, layerIndex, (this.mapObject.isTileMap ? Math.floor(this.currentFactor)
                : this.currentFactor)));
        }
        if (this.currentLayer.bubbleSettings.length && this.mapObject.bubbleModule) {
            var length_1 = this.currentLayer.bubbleSettings.length;
            var bubble_1;
            var _loop_2 = function (j) {
                bubble_1 = this_2.currentLayer.bubbleSettings[j];
                bubbleG = this_2.mapObject.renderer.createGroup({
                    id: this_2.mapObject.element.id + '_LayerIndex_' + layerIndex + '_bubble_Group_' + j
                });
                var range = { min: 0, max: 0 };
                this_2.bubbleCalculation(bubble_1, range);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var bubbleDataSource = bubble_1.dataSource;
                this_2.mapObject.bubbleModule.bubbleCollection = [];
                if (!isNullOrUndefined(bubbleDataSource) && bubbleDataSource.length > 0) {
                    bubbleDataSource.map(function (bubbleData, i) {
                        _this.renderBubble(_this.currentLayer, bubbleData, colors[i % colors.length], range, j, i, bubbleG, layerIndex, bubble_1);
                    });
                    this_2.groupElements.push(bubbleG);
                }
            };
            var this_2 = this;
            for (var j = 0; j < length_1; j++) {
                _loop_2(j);
            }
        }
        if ((this.mapObject.markerModule && !this.mapObject.isTileMap) && this.mapObject.zoomSettings.enable) {
            this.mapObject.markerModule.calculateZoomCenterPositionAndFactor(this.mapObject.layersCollection);
        }
        var group = (this.mapObject.renderer.createGroup({
            id: this.mapObject.element.id + '_LayerIndex_' + layerIndex + '_dataLableIndex_Group'
        }));
        group.style.pointerEvents = 'none';
        if (this.mapObject.dataLabelModule && this.currentLayer.dataLabelSettings.visible) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var intersect_1 = [];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            Array.prototype.forEach.call(renderData, function (currentShapeData, i) {
                _this.renderLabel(_this.currentLayer, layerIndex, currentShapeData, group, i, labelTemplateEle, intersect_1);
            });
            this.groupElements.push(group);
        }
        if (this.mapObject.navigationLineModule) {
            this.groupElements.push(this.mapObject.navigationLineModule.renderNavigation(this.currentLayer, this.currentFactor, layerIndex));
        }
        if (!isNullOrUndefined(this.groupElements) && !isNullOrUndefined(this.layerObject)) {
            this.groupElements.map(function (element) {
                if (!isNullOrUndefined(element)) {
                    _this.layerObject.appendChild(element);
                }
            });
        }
        if (this.mapObject.markerModule) {
            this.mapObject.markerModule.markerRender(this.mapObject, this.layerObject, layerIndex, (this.mapObject.isTileMap ? Math.floor(this.currentFactor) :
                this.currentFactor), null);
        }
        this.translateLayerElements(this.layerObject);
        this.layerGroup.appendChild(this.layerObject);
    };
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
    LayerPanel.prototype.renderLabel = function (layer, layerIndex, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    shape, group, shapeIndex, labelTemplateEle, intersect) {
        this.mapObject.dataLabelModule.renderLabel(layer, layerIndex, shape, layer.layerData, group, labelTemplateEle, shapeIndex, intersect);
    };
    /**
     * To render path for multipolygon.
     *
     * @param {any[]} currentShapeData Specifies the current shape data
     * @returns {string} Returns the path
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    LayerPanel.prototype.generateMultiPolygonPath = function (currentShapeData) {
        var path = '';
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var shape;
        for (var j = 0; j < currentShapeData.length; j++) {
            path += 'M' + (currentShapeData[j][0]['point']['x']) + ' ' + (currentShapeData[j][0]['point']['y']);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            shape = currentShapeData[j];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            shape.map(function (shapeData) {
                path += ' L ' + (shapeData['point']['x']) + ' ' + (shapeData['point']['y']);
            });
        }
        return path;
    };
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
    LayerPanel.prototype.renderBubble = function (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    layer, bubbleData, color, range, bubbleIndex, dataIndex, group, layerIndex, bubbleSettings) {
        if (isNullOrUndefined(this.mapObject.bubbleModule) || !bubbleSettings.visible) {
            return null;
        }
        color = bubbleSettings.fill ? bubbleSettings.fill : color;
        this.mapObject.bubbleModule.id = this.mapObject.element.id + '_LayerIndex_' + layerIndex + '_BubbleIndex_' +
            bubbleIndex + '_dataIndex_' + dataIndex;
        this.mapObject.bubbleModule.renderBubble(bubbleSettings, bubbleData, color, range, bubbleIndex, dataIndex, layerIndex, layer, group, this.mapObject.bubbleModule.id);
    };
    /**
     * To get the shape color from color mapping module.
     *
     * @param {LayerSettingsModel} layer - Specifies the layer
     * @param {any} shape - Specifies the shape
     * @param {string} color - Specifies the color
     * @returns {any} - Returns the object
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    LayerPanel.prototype.getShapeColorMapping = function (layer, shape, color) {
        color = color ? color : layer.shapeSettings.fill;
        if (layer.shapeSettings.colorMapping.length === 0 && isNullOrUndefined(layer.dataSource)) {
            return color;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var index = checkShapeDataFields(layer.dataSource, shape, layer.shapeDataPath, layer.shapePropertyPath, layer);
        var colorMapping = new ColorMapping(this.mapObject);
        if (isNullOrUndefined(layer.dataSource) || isNullOrUndefined(layer.dataSource[index])) {
            return color;
        }
        return colorMapping.getShapeColorMapping(layer.shapeSettings, layer.dataSource[index], color);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    LayerPanel.prototype.generatePoints = function (type, coordinates, data, properties) {
        var _this = this;
        var latitude;
        var longitude;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var newData = [];
        switch (type.toLowerCase()) {
            case 'polygon':
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                newData = this.calculatePolygonBox(coordinates[0]);
                if (newData.length > 0) {
                    newData['property'] = properties;
                    newData['type'] = type;
                    newData['_isMultiPolygon'] = false;
                    this.currentLayer.layerData.push(newData);
                }
                break;
            case 'multipolygon':
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var multiPolygonDatas = [];
                for (var i = 0; i < coordinates.length; i++) {
                    for (var j = 0; j < coordinates[i].length; j++) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        newData = this.calculatePolygonBox(coordinates[i][j]);
                        if (newData.length > 0) {
                            multiPolygonDatas.push(newData);
                        }
                    }
                }
                multiPolygonDatas['property'] = properties;
                multiPolygonDatas['type'] = type;
                multiPolygonDatas['_isMultiPolygon'] = true;
                this.currentLayer.layerData.push(multiPolygonDatas);
                break;
            case 'linestring':
                var lineExtraSpace_1 = !isNullOrUndefined(this.currentLayer.shapeSettings.border.width) ?
                    (typeof (this.currentLayer.shapeSettings.border.width) === 'string' ?
                        parseInt(this.currentLayer.shapeSettings.border.width, 10) : this.currentLayer.shapeSettings.border.width) : 1;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                coordinates.map(function (points) {
                    latitude = points[1];
                    longitude = points[0];
                    var point = convertGeoToPoint(latitude, longitude, _this.currentFactor, _this.currentLayer, _this.mapObject);
                    _this.calculateBox(point, lineExtraSpace_1);
                    newData.push({
                        point: point, lat: latitude, lng: longitude
                    });
                });
                newData['property'] = properties;
                newData['type'] = type;
                this.currentLayer.layerData.push(newData);
                break;
            case 'multilinestring':
                var extraSpaces_1 = !isNullOrUndefined(this.currentLayer.shapeSettings.border.width) ?
                    (typeof (this.currentLayer.shapeSettings.border.width) === 'string' ?
                        parseInt(this.currentLayer.shapeSettings.border.width, 10) : this.currentLayer.shapeSettings.border.width) : 1;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var multiLineData_1 = [];
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                coordinates.map(function (multiPoints) {
                    newData = [];
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    multiPoints.map(function (points) {
                        latitude = points[1];
                        longitude = points[0];
                        var point = convertGeoToPoint(latitude, longitude, _this.currentFactor, _this.currentLayer, _this.mapObject);
                        _this.calculateBox(point, extraSpaces_1);
                        newData.push({
                            point: point, lat: latitude, lng: longitude
                        });
                    });
                    multiLineData_1.push(newData);
                });
                multiLineData_1['property'] = properties;
                multiLineData_1['type'] = type;
                this.currentLayer.layerData.push(multiLineData_1);
                break;
            case 'point':
                var pointExtraSpace = (!isNullOrUndefined(this.currentLayer.shapeSettings.border.width) ?
                    (typeof (this.currentLayer.shapeSettings.border.width) === 'string' ?
                        parseInt(this.currentLayer.shapeSettings.border.width, 10) : this.currentLayer.shapeSettings.border.width) : 1) +
                    (this.currentLayer.shapeSettings.circleRadius * 2);
                latitude = coordinates[1];
                longitude = coordinates[0];
                var point = convertGeoToPoint(latitude, longitude, this.currentFactor, this.currentLayer, this.mapObject);
                this.calculateBox(point, pointExtraSpace);
                this.currentLayer.layerData.push({
                    point: point, type: type, lat: latitude, lng: longitude, property: properties
                });
                break;
            case 'multipoint':
                var extraSpace_1 = (!isNullOrUndefined(this.currentLayer.shapeSettings.border.width) ?
                    (typeof (this.currentLayer.shapeSettings.border.width) === 'string' ?
                        parseInt(this.currentLayer.shapeSettings.border.width, 10) : this.currentLayer.shapeSettings.border.width) : 1) +
                    (this.currentLayer.shapeSettings.circleRadius * 2);
                newData = [];
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                coordinates.map(function (points) {
                    latitude = points[1];
                    longitude = points[0];
                    var point = convertGeoToPoint(latitude, longitude, _this.currentFactor, _this.currentLayer, _this.mapObject);
                    _this.calculateBox(point, extraSpace_1);
                    newData.push({
                        point: point, lat: latitude, lng: longitude
                    });
                });
                newData['property'] = properties;
                newData['type'] = type;
                this.currentLayer.layerData.push(newData);
                break;
            case 'path':
                this.currentLayer.layerData.push({
                    point: data['d'], type: type, property: properties
                });
                break;
        }
    };
    LayerPanel.prototype.calculateBox = function (point, extraSpace) {
        if (isNullOrUndefined(this.rectBounds)) {
            this.rectBounds = { min: { x: point.x - extraSpace, y: point.y - extraSpace }, max: { x: point.x + extraSpace,
                    y: point.y + extraSpace } };
        }
        else {
            this.rectBounds['min']['x'] = Math.min(this.rectBounds['min']['x'], point.x - extraSpace);
            this.rectBounds['min']['y'] = Math.min(this.rectBounds['min']['y'], point.y - extraSpace);
            this.rectBounds['max']['x'] = Math.max(this.rectBounds['max']['x'], point.x + extraSpace);
            this.rectBounds['max']['y'] = Math.max(this.rectBounds['max']['y'], point.y + extraSpace);
        }
    };
    LayerPanel.prototype.calculateFactor = function (layer) {
        var horFactor;
        var verFactor = 1;
        var divide = 10;
        var exp = 'e+1';
        var bounds = this.mapObject.baseMapBounds;
        var mapSize = new Size(this.mapObject.mapAreaRect.width, this.mapObject.mapAreaRect.height - 5);
        var mapHeight;
        var mapWidth;
        if (bounds) {
            var start = convertGeoToPoint(bounds.latitude.min, bounds.longitude.min, null, layer, this.mapObject);
            var end = convertGeoToPoint(bounds.latitude.max, bounds.longitude.max, null, layer, this.mapObject);
            mapHeight = end.y - start.y;
            mapWidth = end.x - start.x;
            if (mapHeight === 0 || mapWidth === 0) {
                mapWidth = mapSize.width / 2;
                mapHeight = mapSize.height;
            }
        }
        else {
            mapHeight = mapWidth = 500;
        }
        if (mapHeight < mapSize.height) {
            horFactor = parseFloat(Math.abs(Number(mapSize.height / Number(mapHeight.toString() + exp)) * 100).toString().split('.')[0])
                / divide;
        }
        else {
            horFactor = mapSize.height / mapHeight;
        }
        if (mapWidth < mapSize.width) {
            verFactor = parseFloat(Math.abs(Number(mapSize.width / Number(mapWidth.toString() + exp)) * 100).toString().split('.')[0])
                / divide;
        }
        else {
            verFactor = mapSize.width / mapWidth;
        }
        return (Math.min(verFactor, horFactor));
    };
    LayerPanel.prototype.translateLayerElements = function (layerElement) {
        var childNode;
        this.mapObject.translateType = 'layer';
        if (!isNullOrUndefined(this.mapObject.baseMapRectBounds)) {
            var duration = animationMode === 'Disable' ? 0 : (this.currentLayer.animationDuration === 0 && animationMode === 'Enable') ?
                1000 : this.currentLayer.animationDuration;
            var animate = duration !== 0 || isNullOrUndefined(this.mapObject.zoomModule);
            this.mapObject.baseTranslatePoint = this.mapObject.zoomTranslatePoint;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var translate = void 0;
            if (this.mapObject.zoomSettings.zoomFactor > 1 && !isNullOrUndefined(this.mapObject.zoomModule)) {
                translate = getZoomTranslate(this.mapObject, this.currentLayer, animate);
            }
            else {
                translate = getTranslate(this.mapObject, this.currentLayer, animate);
            }
            var scale = this.mapObject.previousScale = translate['scale'];
            var location_1 = this.mapObject.previousPoint = translate['location'];
            this.mapObject.baseTranslatePoint = this.mapObject.translatePoint = location_1;
            this.mapObject.baseScale = this.mapObject.scale = scale;
            for (var i = 0; i < layerElement.childElementCount; i++) {
                childNode = layerElement.childNodes[i];
                if (!(childNode.id.indexOf('_Markers_Group') > -1) &&
                    (!(childNode.id.indexOf('_bubble_Group') > -1)) &&
                    (!(childNode.id.indexOf('_dataLableIndex_Group') > -1))) {
                    var transform = 'scale( ' + scale + ' ) '
                        + 'translate( ' + location_1.x + ' ' + location_1.y + ' ) ';
                    childNode.setAttribute('transform', transform);
                    if (duration > 0 && !isNullOrUndefined(this.mapObject.zoomModule)) {
                        if (this.mapObject.zoomSettings.zoomFactor > 1) {
                            translate = getZoomTranslate(this.mapObject, this.currentLayer);
                        }
                        else {
                            translate = getTranslate(this.mapObject, this.currentLayer);
                        }
                        this.mapObject.scale = translate['scale'];
                        this.mapObject.zoomTranslatePoint = this.mapObject.translatePoint = translate['location'];
                    }
                }
            }
        }
        else if (this.mapObject.isTileMap && !isNullOrUndefined(this.mapObject.scale)) {
            for (var j = 0; j < layerElement.childElementCount; j++) {
                childNode = layerElement.childNodes[j];
                if (!(childNode.id.indexOf('_Markers_Group') > -1) &&
                    (!(childNode.id.indexOf('_bubble_Group') > -1)) &&
                    (!(childNode.id.indexOf('_dataLableIndex_Group') > -1)) &&
                    (!(childNode.id.indexOf('_line_Group') > -1))) {
                    if (childNode.id.indexOf('_Polygons_Group') === -1) {
                        var transform = 'scale( ' + this.mapObject.scale + ' ) ' + 'translate( ' + this.mapObject.translatePoint.x
                            + ' ' + this.mapObject.translatePoint.y + ' ) ';
                        childNode.setAttribute('transform', transform);
                    }
                }
            }
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    LayerPanel.prototype.calculateRectBounds = function (layerData) {
        var _this = this;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Array.prototype.forEach.call(layerData, function (obj) {
            if (!isNullOrUndefined(obj['geometry']) || !isNullOrUndefined(obj['coordinates'])) {
                var type = !isNullOrUndefined(obj['geometry']) ? obj['geometry']['type'] : obj['type'];
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var coordinates = !isNullOrUndefined(obj['geometry']) ? obj['geometry']['coordinates'] : obj['coordinates'];
                switch (type.toLowerCase()) {
                    case 'polygon':
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        _this.calculateRectBox(coordinates[0]);
                        break;
                    case 'multipolygon':
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        coordinates.map(function (point) {
                            _this.calculateRectBox(point[0]);
                        });
                        break;
                    case 'multilinestring':
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        coordinates.map(function (multiPoint) {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            multiPoint.map(function (point, index) {
                                _this.calculateRectBox(point, 'multilinestring', index === 0 ? true : false);
                            });
                        });
                        break;
                    case 'linestring':
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        coordinates.map(function (point, index) {
                            _this.calculateRectBox(point, 'linestring', index === 0 ? true : false);
                        });
                        break;
                    case 'point':
                        _this.calculateRectBox(coordinates, 'point');
                        break;
                    case 'multipoint':
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        coordinates.map(function (point, index) {
                            _this.calculateRectBox(point, 'multipoint', index === 0 ? true : false);
                        });
                        break;
                }
            }
        });
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    LayerPanel.prototype.calculatePolygonBox = function (coordinates) {
        var _this = this;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var newData = [];
        var bounds = this.mapObject.baseMapBounds;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        coordinates.map(function (currentPoint) {
            var latitude = currentPoint[1];
            var longitude = currentPoint[0];
            if ((longitude >= bounds.longitude.min && longitude <= bounds.longitude.max)
                && (latitude >= bounds.latitude.min && latitude <= bounds.latitude.max)) {
                var point = convertGeoToPoint(latitude, longitude, _this.currentFactor, _this.currentLayer, _this.mapObject);
                if (isNullOrUndefined(_this.rectBounds)) {
                    _this.rectBounds = { min: { x: point.x, y: point.y }, max: { x: point.x, y: point.y } };
                }
                else {
                    _this.rectBounds['min']['x'] = Math.min(_this.rectBounds['min']['x'], point.x);
                    _this.rectBounds['min']['y'] = Math.min(_this.rectBounds['min']['y'], point.y);
                    _this.rectBounds['max']['x'] = Math.max(_this.rectBounds['max']['x'], point.x);
                    _this.rectBounds['max']['y'] = Math.max(_this.rectBounds['max']['y'], point.y);
                }
                newData.push({
                    point: point,
                    lat: latitude,
                    lng: longitude
                });
            }
        });
        return newData;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    LayerPanel.prototype.calculateRectBox = function (coordinates, type, isFirstItem) {
        var _this = this;
        if ((type !== 'linestring' && type !== 'multilinestring') && (type !== 'point' && type !== 'multipoint')) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            Array.prototype.forEach.call(coordinates, function (currentCoords) {
                if (isNullOrUndefined(_this.mapObject.baseMapBounds)) {
                    _this.mapObject.baseMapBounds = new GeoLocation({ min: currentCoords[1], max: currentCoords[1] }, { min: currentCoords[0], max: currentCoords[0] });
                }
                else {
                    _this.mapObject.baseMapBounds.latitude.min = Math.min(_this.mapObject.baseMapBounds.latitude.min, currentCoords[1]);
                    _this.mapObject.baseMapBounds.latitude.max = Math.max(_this.mapObject.baseMapBounds.latitude.max, currentCoords[1]);
                    _this.mapObject.baseMapBounds.longitude.min = Math.min(_this.mapObject.baseMapBounds.longitude.min, currentCoords[0]);
                    _this.mapObject.baseMapBounds.longitude.max = Math.max(_this.mapObject.baseMapBounds.longitude.max, currentCoords[0]);
                }
            });
        }
        else {
            if ((isFirstItem || type === 'point') && isNullOrUndefined(this.mapObject.baseMapBounds)) {
                this.mapObject.baseMapBounds = new GeoLocation({ min: coordinates[1], max: coordinates[1] }, { min: coordinates[0], max: coordinates[0] });
            }
            else {
                this.mapObject.baseMapBounds.latitude.min = Math.min(this.mapObject.baseMapBounds.latitude.min, coordinates[1]);
                this.mapObject.baseMapBounds.latitude.max = Math.max(this.mapObject.baseMapBounds.latitude.max, coordinates[1]);
                this.mapObject.baseMapBounds.longitude.min = Math.min(this.mapObject.baseMapBounds.longitude.min, coordinates[0]);
                this.mapObject.baseMapBounds.longitude.max = Math.max(this.mapObject.baseMapBounds.longitude.max, coordinates[0]);
            }
        }
    };
    LayerPanel.prototype.generateTiles = function (zoomLevel, tileTranslatePoint, zoomType, bing, position, isPinch) {
        var userLang = this.mapObject.locale;
        var size = this.mapObject.availableSize;
        this.tiles = [];
        var xcount;
        var ycount;
        xcount = ycount = Math.pow(2, zoomLevel);
        var xLeft = 0;
        var xRight = 0;
        if ((tileTranslatePoint.x + (xcount * 256)) < size.width) {
            xLeft = tileTranslatePoint.x > 0 ? Math.ceil(tileTranslatePoint.x / 256) : 0;
            xRight = ((tileTranslatePoint.x + xcount * 256) < size.width) ?
                Math.ceil((size.width - (tileTranslatePoint.x + xcount * 256)) / 256) : 0;
        }
        xcount += xLeft + xRight;
        if (zoomType === 'Pan') {
            xcount = (this.horizontalPanXCount >= xcount) ? this.horizontalPanXCount : xcount;
            this.horizontalPan = false;
        }
        else {
            this.horizontalPanXCount = xcount;
            this.horizontalPan = true;
        }
        var baseLayer = this.mapObject.layers[this.mapObject.baseLayerIndex];
        this.urlTemplate = baseLayer.urlTemplate;
        var endY = Math.min(ycount, ((-tileTranslatePoint.y + size.height) / 256) + 1);
        var endX = Math.min(xcount, ((-tileTranslatePoint.x + size.width + (xRight * 256)) / 256) + 1);
        var startX = (-((tileTranslatePoint.x + (xLeft * 256)) + 256) / 256);
        var startY = (-(tileTranslatePoint.y + 256) / 256);
        bing = bing || this.bing || this.mapObject.bingMap;
        for (var i = Math.round(startX); i < Math.round(endX); i++) {
            for (var j = Math.round(startY); j < Math.round(endY); j++) {
                var x = 256 * i + tileTranslatePoint.x;
                var y = 256 * j + tileTranslatePoint.y;
                if (x > -256 && x <= size.width && y > -256 && y < size.height) {
                    if (j >= 0) {
                        var tileI = i;
                        if (i < 0) {
                            tileI = (tileI % ycount) + ycount;
                        }
                        var tile = new Tile(tileI % ycount, j);
                        tile.left = Math.round(x);
                        tile.top = Math.round(y);
                        if ((bing && !isNullOrUndefined(baseLayer.urlTemplate) && baseLayer.urlTemplate !== '' && baseLayer.urlTemplate.indexOf('quadkey') > -1)) {
                            tile.src = bing.getBingMap(tile, '', '', userLang, bing.imageUrl, bing.subDomains);
                        }
                        else {
                            bing = null;
                            tile.src = this.urlTemplate.replace('level', zoomLevel.toString()).replace('tileX', tile.x.toString())
                                .replace('tileY', tile.y.toString());
                        }
                        this.tiles.push(tile);
                    }
                }
            }
        }
        if (!isNullOrUndefined(zoomType)) {
            if (zoomType.indexOf('wheel') > 1) {
                this.animateToZoomX = (this.mapObject.availableSize.width / 2) - position.x - 10;
                this.animateToZoomY = -position.y;
            }
            else {
                this.animateToZoomX = -10;
                this.animateToZoomY = -(this.mapObject.availableSize.height / 2 + 11.5) + 10;
            }
        }
        var proxTiles = extend([], this.tiles, [], true);
        for (var _i = 0, _a = this.mapObject.layers; _i < _a.length; _i++) {
            var layer = _a[_i];
            if (!(layer.type === 'SubLayer' && layer.visible)) {
                continue;
            }
            if (isNullOrUndefined(layer.shapeData) && !isNullOrUndefined(layer.urlTemplate) && layer.urlTemplate !== '') {
                for (var _b = 0, proxTiles_1 = proxTiles; _b < proxTiles_1.length; _b++) {
                    var baseTile = proxTiles_1[_b];
                    var subtile = extend({}, baseTile, {}, true);
                    if (layer.urlTemplate.indexOf('quadkey')) {
                        bing = new BingMap(this.mapObject);
                        subtile.src = bing.getBingMap(subtile, '', '', userLang, bing.imageUrl, bing.subDomains);
                    }
                    else {
                        subtile.src = layer.urlTemplate.replace('level', zoomLevel.toString()).replace('tileX', baseTile.x.toString())
                            .replace('tileY', baseTile.y.toString());
                    }
                    this.tiles.push(subtile);
                }
            }
        }
        if (this.mapObject.previousScale !== this.mapObject.scale || this.mapObject.isReset || this.mapObject.isZoomByPosition
            || this.mapObject.zoomNotApplied) {
            this.arrangeTiles(zoomType, this.animateToZoomX, this.animateToZoomY, isPinch);
        }
    };
    LayerPanel.prototype.arrangeTiles = function (type, x, y, isPinch) {
        var _this = this;
        if (isPinch === void 0) { isPinch = false; }
        var element = document.getElementById(this.mapObject.element.id + '_tile_parent');
        var element1 = document.getElementById(this.mapObject.element.id + '_tiles');
        if (!isPinch) {
            var timeOut = void 0;
            if (!isNullOrUndefined(type) && type !== 'Pan') {
                this.tileAnimation(type, x, y);
                timeOut = animationMode === 'Disable' ? 0 : (this.mapObject.layersCollection[0].animationDuration === 0 &&
                    animationMode === 'Enable') ? 1000 : this.mapObject.layersCollection[0].animationDuration;
            }
            else {
                timeOut = 0;
            }
            setTimeout(function () {
                if (element) {
                    element.style.zIndex = '1';
                }
                if (element1) {
                    element1.style.zIndex = '0';
                }
                var animateElement;
                if (!document.getElementById(_this.mapObject.element.id + '_animated_tiles') && element) {
                    animateElement = createElement('div', { id: _this.mapObject.element.id + '_animated_tiles' });
                    element.appendChild(animateElement);
                }
                else {
                    if (type !== 'Pan' && element1 && element) {
                        element1.appendChild(element.children[0]);
                        if (!_this.mapObject.isAddLayer && !isNullOrUndefined(document.getElementById(_this.mapObject.element.id + '_animated_tiles'))) {
                            document.getElementById(_this.mapObject.element.id + '_animated_tiles').id =
                                _this.mapObject.element.id + '_animated_tiles_old';
                        }
                        animateElement = createElement('div', { id: _this.mapObject.element.id + '_animated_tiles' });
                        element.appendChild(animateElement);
                    }
                    else {
                        animateElement = element ? element.children[0] : null;
                    }
                }
                _this.tileProcess(type, animateElement, isPinch);
                if (!isNullOrUndefined(_this.mapObject.currentTiles)) {
                    for (var l = _this.tiles.length; l < animateElement.childElementCount; l++) {
                        var isExistingElement = false;
                        for (var a = 0; a < _this.mapObject.currentTiles.childElementCount; a++) {
                            if (!isExistingElement &&
                                _this.mapObject.currentTiles.children[a].id === animateElement.children[l].id) {
                                isExistingElement = true;
                            }
                        }
                        if (isExistingElement) {
                            animateElement.children[l].style.display = 'none';
                        }
                        else {
                            animateElement.removeChild(animateElement.children[l]);
                        }
                    }
                }
            }, timeOut);
        }
        else {
            var animateElement = document.getElementById(this.mapObject.element.id + '_animates_tiles');
            if (isNullOrUndefined(animateElement)) {
                animateElement = createElement('div', { id: this.mapObject.element.id + '_animates_tiles' });
            }
            this.tileProcess(type, animateElement, isPinch);
            element1.appendChild(animateElement);
        }
    };
    LayerPanel.prototype.tileProcess = function (type, animateElement, isPinch) {
        for (var id = 0; id < this.tiles.length; id++) {
            var tile = this.tiles[id];
            var imgElement = null;
            var mapId = this.mapObject.element.id;
            if (type === 'Pan') {
                var child = document.getElementById(mapId + '_tile_' + id);
                var isNewTile = false;
                if (isNullOrUndefined(child)) {
                    isNewTile = true;
                    child = createElement('div', { id: mapId + '_tile_' + id });
                    imgElement = createElement('img');
                }
                else {
                    child.style.removeProperty('display');
                    imgElement = child.children[0];
                }
                if (!isNewTile && imgElement && imgElement.src !== tile.src) {
                    imgElement.src = tile.src;
                }
                child.style.position = 'absolute';
                child.style.left = tile.left + 'px';
                child.style.top = tile.top + 'px';
                child.style.height = tile.height + 'px';
                child.style.width = tile.width + 'px';
                if (isNewTile) {
                    imgElement.setAttribute('height', '256px');
                    imgElement.setAttribute('width', '256px');
                    imgElement.setAttribute('src', tile.src);
                    imgElement.setAttribute('alt', this.mapObject.getLocalizedLabel('ImageNotFound'));
                    imgElement.style.setProperty('user-select', 'none');
                    child.appendChild(imgElement);
                    animateElement.appendChild(child);
                }
            }
            else {
                imgElement = createElement('img');
                imgElement.setAttribute('height', '256px');
                imgElement.setAttribute('width', '256px');
                imgElement.setAttribute('src', tile.src);
                imgElement.style.setProperty('user-select', 'none');
                imgElement.setAttribute('alt', this.mapObject.getLocalizedLabel('ImageNotFound'));
                var child = createElement('div', { id: mapId + '_tile_' + id });
                child.style.position = 'absolute';
                child.style.left = tile.left + 'px';
                child.style.top = tile.top + 'px';
                child.style.height = tile.height + 'px';
                child.style.width = tile.width + 'px';
                child.appendChild(imgElement);
                if (animateElement) {
                    animateElement.appendChild(child);
                }
            }
            if (!isPinch && id === (this.tiles.length - 1) && document.getElementById(this.mapObject.element.id + '_animated_tiles_old')) {
                removeElement(this.mapObject.element.id + '_animated_tiles_old');
            }
        }
    };
    /**
     * Animation for tile layers and hide the group element until the tile layer rendering.
     *
     * @param {string} zoomType - Specifies the zoom type
     * @param {number} translateX - Specifies the x translate point
     * @param {number} translateY - Specifies the y translate point
     * @returns {void}
     */
    LayerPanel.prototype.tileAnimation = function (zoomType, translateX, translateY) {
        var tileParent = document.getElementById(this.mapObject.element.id + '_tile_parent');
        var animatedTiles = document.getElementById(this.mapObject.element.id + '_animated_tiles');
        var tileElement = document.getElementById(this.mapObject.element.id + '_tiles');
        var scaleValue = '2';
        if (zoomType.indexOf('ZoomOut') === 0 || zoomType === 'Reset') {
            tileElement.style.zIndex = '1';
            tileParent.style.zIndex = '0';
            while (tileElement.childElementCount >= 1) {
                tileElement.removeChild(tileElement.children[0]);
            }
            translateX = 0;
            translateY = document.getElementById(this.mapObject.element.id + '_tile_parent').getClientRects()[0].height / 4;
            scaleValue = zoomType.indexOf('ZoomOut') === 0 ? '0.5' : '0.2';
        }
        if (!isNullOrUndefined(animatedTiles)) {
            animatedTiles.style.transition = animationMode === 'Disable' ? '0ms' : (this.mapObject.layersCollection[0].animationDuration === 0
                && animationMode === 'Enable') ? '1000ms' : this.mapObject.layersCollection[0].animationDuration + 'ms';
            animatedTiles.style.transform = 'translate(' + translateX + 'px, ' + translateY + 'px) scale(' + scaleValue + ')';
        }
    };
    /**
     * To find the tile translate point.
     *
     * @param {number} factorX - Specifies the x factor
     * @param {number} factorY - Specifies the x factor
     * @param {MapLocation} centerPosition - Specifies the map location
     * @returns {Point} - Returns point values
     */
    LayerPanel.prototype.panTileMap = function (factorX, factorY, centerPosition) {
        if (this.mapObject.tileZoomLevel <= this.mapObject.tileZoomScale && this.mapObject.initialCheck) {
            this.mapObject.tileZoomLevel = this.mapObject.tileZoomScale;
        }
        var level = this.mapObject.tileZoomLevel;
        var padding = 20;
        var x;
        var y;
        var totalSize = Math.pow(2, level) * 256;
        x = (factorX / 2) - (totalSize / 2);
        y = (factorY / 2) - (totalSize / 2);
        var position = convertTileLatLongToPoint(centerPosition, level, { x: x, y: y }, this.isMapCoordinates);
        padding = this.mapObject.zoomNotApplied ? 0 : padding;
        x -= position.x - (factorX / 2);
        y = (y - (position.y - (factorY / 2))) + padding;
        this.mapObject.scale = Math.pow(2, level - 1);
        if ((isNullOrUndefined(this.mapObject.tileTranslatePoint) || (this.mapObject.tileTranslatePoint.y === 0 &&
            this.mapObject.tileTranslatePoint.x === 0)) || (isNullOrUndefined(this.mapObject.previousTileWidth) ||
            isNullOrUndefined(this.mapObject.previousTileHeight))) {
            this.mapObject.previousTileWidth = factorX;
            this.mapObject.previousTileHeight = factorY;
        }
        if (!isNullOrUndefined(this.mapObject.tileTranslatePoint) && (isNullOrUndefined(centerPosition.x)) &&
            (this.mapObject.zoomSettings.zoomFactor === 1 ||
                this.mapObject.zoomSettings.zoomFactor !== level || !this.mapObject.defaultState)) {
            if ((factorX !== this.mapObject.previousTileWidth || factorY !== this.mapObject.previousTileHeight)) {
                var xdiff = x - ((this.mapObject.previousTileWidth / 2) - (totalSize / 2));
                var ydiff = y - ((this.mapObject.previousTileHeight / 2) - (totalSize / 2) + padding);
                this.mapObject.tileTranslatePoint.x = this.mapObject.tileTranslatePoint.x + xdiff;
                this.mapObject.tileTranslatePoint.y = this.mapObject.tileTranslatePoint.y + ydiff;
            }
        }
        if (!isNullOrUndefined(this.mapObject.tileTranslatePoint) && !this.mapObject.zoomNotApplied) {
            if (this.mapObject.tileTranslatePoint.x !== 0 && this.mapObject.tileTranslatePoint.x !== x
                && !this.mapObject.centerPositionChanged) {
                x = this.mapObject.tileTranslatePoint.x;
            }
            if (this.mapObject.tileTranslatePoint.y !== 0 && this.mapObject.tileTranslatePoint.y !== y
                && !this.mapObject.centerPositionChanged) {
                y = this.mapObject.tileTranslatePoint.y;
            }
        }
        this.mapObject.translatePoint = new Point((x - (0.01 * this.mapObject.zoomSettings.zoomFactor)) / this.mapObject.scale, (y - (0.01 * this.mapObject.zoomSettings.zoomFactor)) / this.mapObject.scale);
        this.mapObject.previousTileWidth = factorX;
        this.mapObject.previousTileHeight = factorY;
        return new Point(x, y);
    };
    /**
     * @returns {void}
     * @private
     */
    LayerPanel.prototype.destroy = function () {
        this.mapObject = null;
        this.groupElements = [];
        this.layerObject = null;
        this.currentLayer = null;
        this.rectBounds = null;
        this.tiles = [];
        this.clipRectElement = null;
        this.tileSvgObject = null;
        this.ajaxModule = null;
        this.ajaxResponse = [];
        this.layerGroup = null;
        if (!isNullOrUndefined(this.bing)) {
            this.bing.destroy();
        }
        this.bing = null;
    };
    return LayerPanel;
}());
export { LayerPanel };
