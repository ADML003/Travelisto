import { Point, getElementByID, PathOption, Rect, convertGeoToPoint, CircleOption, convertTileLatLongToPoint, measureTextElement } from '../utils/helper';
import { RectOption, createTooltip, calculateScale, getTouchCenter, getTouches, targetTouches } from '../utils/helper';
import { MapLocation, zoomAnimate, smoothTranslate, measureText, textTrim, clusterTemplate, marker, getProcessedMarginValue } from '../utils/helper';
import { markerTemplate, removeElement, getElement, clusterSeparate, markerColorChoose, calculatePolygonPath } from '../utils/helper';
import { markerShapeChoose } from '../utils/helper';
import { isNullOrUndefined, EventHandler, Browser, remove, createElement, animationMode } from '@syncfusion/ej2-base';
import { changeBorderWidth, markerRendering } from '../index';
import { pan } from '../model/constants';
import { getValueFromObject } from '../utils/helper';
/**
 * Zoom module used to process the zoom for maps
 */
var Zoom = /** @class */ (function () {
    function Zoom(maps) {
        /** @private */
        this.isPanModeEnabled = false;
        /** @private */
        this.mouseEnter = false;
        /** @private */
        this.isTouch = false;
        /** @private */
        this.rectZoomingStart = false;
        /** @private */
        this.browserName = Browser.info.name;
        /** @private */
        this.isPointer = Browser.isPointer;
        this.handled = false;
        /** @private */
        this.isPanningInProgress = false;
        this.isPan = false;
        this.isZoomFinal = false;
        this.isZoomSelection = false;
        this.pinchFactor = 1;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.startTouches = [];
        /** @private */
        this.isCancellation = false;
        this.pinchTileZoomScale = 1;
        this.tileZoomLevel = 1;
        this.pinchZoomScale = 1;
        this.isPinchZooming = false;
        /** @private */
        this.mouseDownLatLong = { x: 0, y: 0 };
        /** @private */
        this.mouseMoveLatLong = { x: 0, y: 0 };
        /** @private */
        this.isSingleClick = false;
        this.maps = maps;
        this.wheelEvent = this.browserName === 'mozilla' ? (this.isPointer ? 'mousewheel' : 'DOMMouseScroll') : 'mousewheel';
        this.cancelEvent = this.isPointer ? 'pointerleave' : 'mouseleave';
        this.selectionColor = this.maps.zoomSettings.toolbarSettings.buttonSettings.selectionColor;
        this.fillColor = this.maps.zoomSettings.toolbarSettings.buttonSettings.color;
        this.addEventListener();
    }
    /**
     * To perform zooming for maps.
     *
     * @param {Point} position - Specifies the position.
     * @param {number} newZoomFactor - Specifies the zoom factor.
     * @param {string} type - Specifies the type.
     * @param {boolean} isMouseWheel - Indicates whether the zoom operation was triggered by the mouse wheel.
     * @returns {void}
     * @private
     */
    Zoom.prototype.performZooming = function (position, newZoomFactor, type, isMouseWheel) {
        var _this = this;
        if (isMouseWheel === void 0) { isMouseWheel = false; }
        var map = this.maps;
        map.previousProjection = newZoomFactor <= 1.5 ? undefined : map.projectionType;
        map.defaultState = false;
        map.initialCheck = false;
        map.markerZoomedState = map.isMarkerZoomCompleted = false;
        map.zoomPersistence = map.enablePersistence;
        var prevLevel = map.tileZoomLevel;
        var maxZoom = map.zoomSettings.maxZoom;
        var minZoom = map.zoomSettings.minZoom;
        newZoomFactor = maxZoom >= newZoomFactor ? newZoomFactor : maxZoom;
        var isToolbarPerform = true;
        switch (type.toLowerCase()) {
            case 'zoomin':
                isToolbarPerform = newZoomFactor <= this.maps.zoomSettings.maxZoom;
                break;
            case 'zoomout':
                isToolbarPerform = newZoomFactor >= this.maps.zoomSettings.minZoom;
                break;
        }
        if (isToolbarPerform) {
            var scale = map.previousScale = map.scale;
            var prevTilePoint = map.tileTranslatePoint;
            if ((!map.isTileMap) && ((type === 'ZoomIn' ? newZoomFactor >= minZoom && newZoomFactor <= maxZoom : newZoomFactor >= minZoom)
                || map.isReset)) {
                var availSize = map.mapAreaRect;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var minBounds = map.baseMapRectBounds['min'];
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var maxBounds = map.baseMapRectBounds['max'];
                var mapTotalWidth = Math.abs(minBounds['x'] - maxBounds['x']);
                var mapTotalHeight = Math.abs(minBounds['y'] - maxBounds['y']);
                var translatePointX = void 0;
                var translatePointY = void 0;
                if (newZoomFactor < 1.2 && map.projectionType !== 'Eckert5') {
                    if (mapTotalWidth === 0 || mapTotalHeight === 0 || mapTotalWidth === mapTotalHeight) {
                        mapTotalWidth = availSize.width / 2;
                        mapTotalHeight = availSize.height;
                    }
                    newZoomFactor = parseFloat(Math.min(availSize.width / mapTotalWidth, availSize.height / mapTotalHeight).toFixed(2));
                    newZoomFactor = newZoomFactor > 1.05 ? 1 : newZoomFactor;
                    map.translatePoint = this.calculateInitalZoomTranslatePoint(newZoomFactor, mapTotalWidth, mapTotalHeight, availSize, minBounds, map);
                }
                else {
                    var point = map.translatePoint;
                    translatePointX = point.x - (((availSize.width / scale) - (availSize.width / newZoomFactor)) / (availSize.width / position.x));
                    translatePointY = point.y - (((availSize.height / scale) - (availSize.height / newZoomFactor)) / (availSize.height / position.y));
                    var currentHeight = Math.abs(map.baseMapRectBounds['max']['y'] - map.baseMapRectBounds['min']['y']) * newZoomFactor;
                    translatePointX = (currentHeight < map.mapAreaRect.height) ? (availSize.x + ((-(minBounds['x'])) + ((availSize.width / 2) - (mapTotalWidth / 2)))) : translatePointX;
                    translatePointY = (currentHeight < map.mapAreaRect.height) ? (availSize.y + ((-(minBounds['y'])) + ((availSize.height / 2) - (mapTotalHeight / 2)))) : translatePointY;
                    map.translatePoint = new Point(translatePointX, translatePointY);
                }
                map.scale = newZoomFactor;
                map.zoomTranslatePoint = map.translatePoint;
                if (this.triggerZoomEvent(prevTilePoint, prevLevel, type)) {
                    map.translatePoint = map.previousPoint;
                    map.scale = map.mapScaleValue = map.previousScale;
                }
                else {
                    this.applyTransform(map, isMouseWheel);
                }
            }
            else if ((map.isTileMap) && (newZoomFactor >= minZoom && newZoomFactor <= maxZoom)) {
                this.getTileTranslatePosition(prevLevel, newZoomFactor, position, type);
                map.tileZoomLevel = newZoomFactor;
                map.zoomSettings.zoomFactor = newZoomFactor;
                map.scale = Math.pow(2, newZoomFactor - 1);
                if (type === 'ZoomOut' && map.zoomSettings.resetToInitial && map.applyZoomReset && newZoomFactor <= map.initialZoomLevel) {
                    map.initialCheck = true;
                    map.zoomPersistence = false;
                    map.tileTranslatePoint.x = map.initialTileTranslate.x;
                    map.tileTranslatePoint.y = map.initialTileTranslate.y;
                    newZoomFactor = map.tileZoomLevel = map.mapScaleValue = map.initialZoomLevel;
                    map.scale = Math.pow(2, newZoomFactor - 1);
                }
                map.mapScaleValue = isNaN(map.mapScaleValue) ? 1 : map.mapScaleValue;
                map.translatePoint.y = (map.tileTranslatePoint.y - (0.01 * map.mapScaleValue)) / map.scale;
                map.translatePoint.x = (map.tileTranslatePoint.x - (0.01 * map.mapScaleValue)) / map.scale;
                if (this.triggerZoomEvent(prevTilePoint, prevLevel, type)) {
                    map.translatePoint = map.tileTranslatePoint = new Point(0, 0);
                    map.scale = map.previousScale;
                    map.tileZoomLevel = prevLevel;
                    map.zoomSettings.zoomFactor = map.previousScale;
                }
                else {
                    if (document.querySelector('.GroupElement')) {
                        document.querySelector('.GroupElement').style.display = 'none';
                    }
                    if (document.getElementById(this.maps.element.id + '_LayerIndex_1')) {
                        document.getElementById(this.maps.element.id + '_LayerIndex_1').style.display = 'none';
                    }
                    this.markerLineAnimation(map);
                    map.mapLayerPanel.generateTiles(newZoomFactor, map.tileTranslatePoint, type + 'wheel', null, position);
                    var animationDuration = this.maps.layersCollection[0].animationDuration === 0 && animationMode === 'Enable' ? 1000 : this.maps.layersCollection[0].animationDuration;
                    setTimeout(function () {
                        // if (type === 'ZoomOut') {
                        //     element1.removeChild(element1.children[element1.childElementCount - 1]);
                        //     if (element1.childElementCount) {
                        //         element1.removeChild(element1.children[element1.childElementCount - 1]);
                        //     } else {
                        //         element1 = element1;
                        //     }
                        // }
                        _this.applyTransform(_this.maps, isMouseWheel);
                        if (document.getElementById(_this.maps.element.id + '_LayerIndex_1')) {
                            document.getElementById(_this.maps.element.id + '_LayerIndex_1').style.display = 'block';
                        }
                    }, animationDuration);
                }
            }
            this.triggerZoomComplete(map, prevLevel, type);
        }
        this.maps.zoomNotApplied = false;
        if (this.maps.isDevice) {
            this.removeToolbarOpacity(map.isTileMap ? Math.round(map.tileZoomLevel) : map.scale, map.element.id + '_Zooming_');
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Zoom.prototype.calculateInitalZoomTranslatePoint = function (newZoomFactor, mapTotalWidth, mapTotalHeight, availSize, minBounds, map) {
        mapTotalWidth *= newZoomFactor;
        mapTotalHeight *= newZoomFactor;
        var widthDiff = minBounds['x'] !== 0 && map.translateType === 'layers' ? map.availableSize.width - availSize.width : 0;
        var translatePointX = availSize.x + ((-(minBounds['x'])) + ((availSize.width / 2) - (mapTotalWidth / 2))) - widthDiff;
        var translatePointY = availSize.y + ((-(minBounds['y'])) + ((availSize.height / 2) - (mapTotalHeight / 2)));
        return new Point(translatePointX, translatePointY);
    };
    Zoom.prototype.triggerZoomEvent = function (prevTilePoint, prevLevel, type) {
        var map = this.maps;
        var zoomArgs;
        if (map.isTileMap) {
            map.mapScaleValue = isNullOrUndefined(map.mapScaleValue) ? 1 : map.mapScaleValue;
            map.translatePoint.y = (map.tileTranslatePoint.y - (0.01 * map.mapScaleValue)) / map.scale;
            map.translatePoint.x = (map.tileTranslatePoint.x - (0.01 * map.mapScaleValue)) / map.scale;
        }
        var minMaxLatitudeLongitude = this.maps.getMinMaxLatitudeLongitude();
        if (!map.isTileMap) {
            zoomArgs = {
                cancel: false, name: 'zoom', type: type, maps: map,
                tileTranslatePoint: {}, translatePoint: { previous: map.previousPoint, current: map.translatePoint },
                tileZoomLevel: {}, scale: { previous: map.previousScale, current: map.scale },
                minLatitude: minMaxLatitudeLongitude.minLatitude, maxLatitude: minMaxLatitudeLongitude.maxLatitude,
                minLongitude: minMaxLatitudeLongitude.minLongitude, maxLongitude: minMaxLatitudeLongitude.maxLongitude
            };
        }
        else {
            zoomArgs = {
                cancel: false, name: 'zoom', type: type, maps: map,
                tileTranslatePoint: { previous: prevTilePoint, current: map.tileTranslatePoint }, translatePoint: { previous: map.previousPoint, current: map.translatePoint },
                tileZoomLevel: { previous: prevLevel, current: map.tileZoomLevel }, scale: { previous: map.previousScale, current: map.scale },
                minLatitude: minMaxLatitudeLongitude.minLatitude, maxLatitude: minMaxLatitudeLongitude.maxLatitude,
                minLongitude: minMaxLatitudeLongitude.minLongitude, maxLongitude: minMaxLatitudeLongitude.maxLongitude
            };
        }
        map.trigger('zoom', zoomArgs);
        return zoomArgs.cancel;
    };
    Zoom.prototype.getTileTranslatePosition = function (prevLevel, currentLevel, position, type) {
        var map = this.maps;
        var tileDefaultSize = 256;
        var padding = type === 'ZoomOut' ? 10 : (type === 'Reset' && currentLevel > 1) ? 0 : 10;
        var bounds = map.availableSize;
        var prevSize = Math.pow(2, prevLevel) * 256;
        var totalSize = Math.pow(2, currentLevel) * 256;
        var x = ((position.x - map.tileTranslatePoint.x) / prevSize) * 100;
        var y = ((position.y - map.tileTranslatePoint.y) / prevSize) * 100;
        map.tileTranslatePoint.x = (currentLevel === 1) ? (bounds.width / 2) - ((tileDefaultSize * 2) / 2) :
            position.x - ((x * totalSize) / 100);
        map.tileTranslatePoint.y = (currentLevel === 1) ? ((bounds.height / 2) - ((tileDefaultSize * 2) / 2) + (padding * 2)) :
            position.y - ((y * totalSize) / 100);
    };
    Zoom.prototype.getTileTranslate = function (currentLevel, type) {
        var map = this.maps;
        var padding = type === 'ZoomOut' ? 10 : (type === 'Reset' && currentLevel > 1) ? 0 : 10;
        var bounds = map.availableSize;
        var totalSize = Math.pow(2, currentLevel) * 256;
        var x = (bounds.width / 2) - (totalSize / 2);
        var y = (bounds.height / 2) - (totalSize / 2);
        var position = convertTileLatLongToPoint(new MapLocation(this.pinchStartLatLong['longitude'], this.pinchStartLatLong['latitude']), currentLevel, { x: x, y: y }, true);
        x -= position.x - (bounds.width / 2);
        y = y - (position.y - (bounds.height / 2)) + padding;
        var scale = Math.pow(2, currentLevel - 1);
        map.tileTranslatePoint.x = x;
        map.tileTranslatePoint.y = y;
        map.translatePoint.x = (x - (0.01 * this.tileZoomLevel)) / scale;
        map.translatePoint.y = (y - (0.01 * this.tileZoomLevel)) / scale;
    };
    /**
     * @returns {void}
     * @private
     */
    Zoom.prototype.performRectZooming = function () {
        this.isDragZoom = true;
        var map = this.maps;
        var size = map.availableSize;
        map.previousProjection = map.projectionType;
        var prevLevel = map.tileZoomLevel;
        var prevTilePoint = map.tileTranslatePoint;
        var zoomRect = this.zoomingRect;
        var maxZoom = map.zoomSettings.maxZoom;
        var minZoom = map.zoomSettings.minZoom;
        var isZoomCancelled;
        if (zoomRect.height > 0 && zoomRect.width > 0) {
            var x = this.zoomingRect.x + (this.zoomingRect.width / 2);
            var y = this.zoomingRect.y + (this.zoomingRect.height / 2);
            var zoomCalculationFactor = void 0;
            if (!map.isTileMap) {
                var scale = map.previousScale = map.scale;
                zoomCalculationFactor = scale + Math.round((((size.width / zoomRect.width) + (size.height / zoomRect.height)) / 2));
                zoomCalculationFactor = zoomCalculationFactor < this.maps.zoomSettings.maxZoom ? zoomCalculationFactor : this.maps.zoomSettings.maxZoom;
                var translatePoint = map.previousPoint = map.translatePoint;
                if (zoomCalculationFactor <= maxZoom) {
                    var translatePointX = translatePoint.x - (((size.width / scale) - (size.width / zoomCalculationFactor)) / (size.width / x));
                    var translatePointY = translatePoint.y - (((size.height / scale) - (size.height / zoomCalculationFactor)) / (size.height / y));
                    map.translatePoint = new Point(translatePointX, translatePointY);
                }
                map.scale = zoomCalculationFactor < this.maps.zoomSettings.maxZoom ? zoomCalculationFactor : this.maps.zoomSettings.maxZoom;
                isZoomCancelled = this.triggerZoomEvent(prevTilePoint, prevLevel, '');
                if (isZoomCancelled) {
                    map.translatePoint = map.previousPoint;
                    map.scale = map.previousScale;
                }
                map.zoomTranslatePoint = map.translatePoint;
            }
            else {
                zoomCalculationFactor = prevLevel + (Math.round(prevLevel + (((size.width / zoomRect.width) + (size.height / zoomRect.height)) / 2)));
                zoomCalculationFactor = (zoomCalculationFactor >= minZoom && zoomCalculationFactor <= maxZoom) ? zoomCalculationFactor : maxZoom;
                map.zoomSettings.zoomFactor = zoomCalculationFactor;
                this.getTileTranslatePosition(prevLevel, zoomCalculationFactor, { x: x, y: y });
                map.tileZoomLevel = zoomCalculationFactor;
                map.translatePoint.x = (map.tileTranslatePoint.x - (0.5 * Math.pow(2, zoomCalculationFactor))) /
                    (Math.pow(2, zoomCalculationFactor));
                map.translatePoint.y = (map.tileTranslatePoint.y - (0.5 * Math.pow(2, zoomCalculationFactor))) /
                    (Math.pow(2, zoomCalculationFactor));
                map.scale = (Math.pow(2, zoomCalculationFactor));
                isZoomCancelled = this.triggerZoomEvent(prevTilePoint, prevLevel, '');
                if (isZoomCancelled) {
                    map.translatePoint = map.tileTranslatePoint = new Point(0, 0);
                    map.scale = map.tileZoomLevel = map.zoomSettings.zoomFactor = prevLevel;
                }
                else {
                    map.mapLayerPanel.generateTiles(zoomCalculationFactor, map.tileTranslatePoint);
                }
            }
            if (!isZoomCancelled) {
                map.mapScaleValue = zoomCalculationFactor;
                this.applyTransform(map, false, true);
                this.maps.zoomNotApplied = false;
                this.zoomingRect = null;
            }
        }
        this.isZoomFinal = this.isZoomSelection && Math.round(map.scale) === this.maps.zoomSettings.maxZoom;
        this.triggerZoomComplete(map, prevLevel, '');
        this.removeToolbarOpacity(map.scale, this.maps.element.id + '_Zooming_');
    };
    Zoom.prototype.setInteraction = function (newInteraction) {
        this.lastScale = 1;
        this.interaction = newInteraction;
    };
    Zoom.prototype.updateInteraction = function () {
        if (this.fingers === 2) {
            this.setInteraction('zoom');
        }
        else {
            this.setInteraction(null);
        }
    };
    Zoom.prototype.tilePinchingProcess = function (scale) {
        this.tileZoomLevel = Math.round(scale);
        this.getTileTranslate(this.tileZoomLevel);
        this.maps.mapLayerPanel.generateTiles(this.tileZoomLevel, this.maps.tileTranslatePoint, null, null, null, true);
    };
    /**
     * @param {PointerEvent} e - Specifies the vent in the map
     * @returns {void}
     * @private
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Zoom.prototype.performPinchZooming = function (e) {
        var map = this.maps;
        var prevLevel = map.tileZoomLevel;
        var zoomCalculationFactor = this.pinchFactor;
        var isZoomCancelled;
        var prevTilePoint = map.tileTranslatePoint;
        this.maps.mergeCluster();
        if (!map.isTileMap) {
            var availSize = map.mapAreaRect;
            map.isMarkerZoomCompleted = false;
            map.previousScale = map.scale;
            map.previousPoint = map.translatePoint;
            map.previousProjection = map.projectionType;
            var scale = calculateScale(this.touchStartList, this.touchMoveList);
            var touchCenter = getTouchCenter(getTouches(this.touchMoveList, this.maps));
            var newScale = scale / this.lastScale;
            this.lastScale = scale;
            this.pinchFactor *= newScale;
            this.pinchFactor = Math.min(this.maps.zoomSettings.maxZoom, Math.max(this.pinchFactor, this.maps.zoomSettings.minZoom));
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var minBounds = map.baseMapRectBounds['min'];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var maxBounds = map.baseMapRectBounds['max'];
            var mapTotalHeight = Math.abs(minBounds['y'] - maxBounds['y']);
            var mapTotalWidth = Math.abs(minBounds['x'] - maxBounds['x']);
            var translatePoint = map.translatePoint;
            var translatePointX = void 0;
            var translatePointY = void 0;
            if (zoomCalculationFactor < 1.2 && map.projectionType !== 'Eckert5') {
                if (mapTotalWidth === 0 || mapTotalHeight === 0 || mapTotalWidth === mapTotalHeight) {
                    mapTotalWidth = availSize.width / 2;
                    mapTotalHeight = availSize.height;
                }
                zoomCalculationFactor = parseFloat(Math.min(availSize.width / mapTotalWidth, availSize.height / mapTotalHeight).toFixed(2));
                zoomCalculationFactor = zoomCalculationFactor > 1.05 ? 1 : zoomCalculationFactor;
                map.translatePoint = this.calculateInitalZoomTranslatePoint(zoomCalculationFactor, mapTotalWidth, mapTotalHeight, availSize, minBounds, map);
            }
            else {
                var currentHeight = Math.abs(map.baseMapRectBounds['max']['y'] - map.baseMapRectBounds['min']['y']) * zoomCalculationFactor;
                translatePointX = translatePoint.x - (((availSize.width / map.scale) - (availSize.width / zoomCalculationFactor)) / (availSize.width / touchCenter.x));
                translatePointY = translatePoint.y - (((availSize.height / map.scale) - (availSize.height / zoomCalculationFactor)) / (availSize.height / touchCenter.y));
                translatePointX = (currentHeight < map.mapAreaRect.height) ? (availSize.x + ((-(minBounds['x'])) + ((availSize.width / 2) - (mapTotalWidth / 2)))) : translatePointX;
                translatePointY = (currentHeight < map.mapAreaRect.height) ? (availSize.y + ((-(minBounds['y'])) + ((availSize.height / 2) - (mapTotalHeight / 2)))) : translatePointY;
                map.translatePoint = new Point(translatePointX, translatePointY);
            }
            map.scale = zoomCalculationFactor;
            isZoomCancelled = this.triggerZoomEvent(prevTilePoint, prevLevel, '');
            if (isZoomCancelled) {
                map.translatePoint = map.previousPoint;
                map.scale = map.previousScale;
            }
        }
        else {
            this.isPinchZooming = true;
            var touchCenter = this.touchCenter;
            var touchOnePoint = this.getMousePosition(this.touchMoveList[0].pageX, this.touchMoveList[0].pageY);
            var touchTwoPoint = this.getMousePosition(this.touchMoveList[1].pageX, this.touchMoveList[1].pageY);
            var distance = Math.sqrt(Math.pow((touchOnePoint.x - touchTwoPoint.x), 2) + Math.pow((touchOnePoint.y - touchTwoPoint.y), 2));
            var pinchScale = distance / this.startDistance;
            if (!isNullOrUndefined(this.pinchDistance)) {
                var pinchZoomFactor = Math.log2(pinchScale * (256 * Math.pow(2, prevLevel)) / 256);
                pinchZoomFactor = Math.min(map.zoomSettings.maxZoom, Math.max(map.zoomSettings.minZoom, pinchZoomFactor));
                var scaleFactor = this.pinchDistance > distance ? (prevLevel * pinchScale) : pinchZoomFactor;
                var factor = pinchZoomFactor;
                var isZoomOut = false;
                if (this.pinchDistance > distance) {
                    factor = (scaleFactor % 1);
                    isZoomOut = true;
                }
                else if (this.pinchDistance < distance) {
                    factor = (scaleFactor % 1) + 1;
                }
                var zoomFactor = Math.ceil(scaleFactor);
                if (zoomFactor > map.zoomSettings.minZoom && zoomFactor <= map.zoomSettings.maxZoom) {
                    var element = document.getElementById(map.element.id);
                    if (element) {
                        element.style.overflow = 'hidden';
                    }
                    this.tileZoomLevel = zoomFactor;
                    var transformOriginX = (touchCenter.x / (map.mapAreaRect.width - map.mapAreaRect.x)) * 100;
                    var transformOriginY = (touchCenter.y / (map.mapAreaRect.height - map.mapAreaRect.y)) * 100;
                    var tilesParent = document.getElementById(map.element.id + '_tile_parent');
                    var copyTilesParent = document.getElementById(map.element.id + '_tiles');
                    if (!copyTilesParent) {
                        copyTilesParent = document.createElement('div');
                        copyTilesParent.id = map.element.id + '_tiles';
                        map.element.appendChild(copyTilesParent);
                        this.copyStyles(tilesParent, copyTilesParent);
                        copyTilesParent.style.zIndex = '0';
                    }
                    copyTilesParent.style.visibility = 'hidden';
                    tilesParent.style.transformOrigin = transformOriginX + "% " + transformOriginY + "%";
                    tilesParent.style.transform = "scale(" + factor + ")";
                    var svgElement = document.getElementById(map.element.id + '_Tile_SVG_Parent');
                    svgElement.style.transformOrigin = transformOriginX + "% " + transformOriginY + "%";
                    svgElement.style.transform = "scale(" + factor + ")";
                    if (!this.isCancellation && (0.2 >= scaleFactor % 1 && scaleFactor % 1 >= 0.1 && !isZoomOut) || (scaleFactor % 1 <= 0.9 && isZoomOut)) {
                        var animateTile = document.getElementById(map.element.id + '_animates_tiles');
                        if (!animateTile) {
                            animateTile = document.createElement('div');
                            animateTile.id = map.element.id + '_animates_tiles';
                            animateTile.classList.add(this.tileZoomLevel.toString());
                            copyTilesParent.appendChild(animateTile);
                        }
                        if (animateTile.childElementCount === 0) {
                            this.pinchZoomScale = isZoomOut ? Math.floor(scaleFactor) : Math.ceil(scaleFactor);
                            this.tilePinchingProcess(this.pinchZoomScale);
                            this.isCancellation = true;
                        }
                    }
                    if (this.isCancellation && (scaleFactor % 1 >= 0.99 && !isZoomOut) || (scaleFactor % 1 <= 0.1 && isZoomOut)) {
                        if (tilesParent.style.transformOrigin !== '' && this.isCancellation) {
                            tilesParent.style.transformOrigin = '';
                            tilesParent.style.transform = '';
                            svgElement.style.transformOrigin = '';
                            svgElement.style.transform = '';
                            this.pinchTileZoomScale = isZoomOut ? Math.floor(scaleFactor) : Math.ceil(scaleFactor);
                            this.getTileTranslate(this.pinchTileZoomScale);
                            var targetElement_1 = document.getElementById(map.element.id + '_animated_tiles');
                            var sourceElement = document.getElementById(map.element.id + '_animates_tiles');
                            while (targetElement_1.firstChild) {
                                targetElement_1.removeChild(targetElement_1.firstChild);
                            }
                            Array.from(sourceElement.children).forEach(function (child) {
                                targetElement_1.appendChild(child.cloneNode(true));
                            });
                            document.getElementById(map.element.id + '_animated_tiles')['className'] = this.pinchTileZoomScale.toFixed(0);
                            if (sourceElement) {
                                while (sourceElement.firstChild) {
                                    sourceElement.removeChild(sourceElement.firstChild);
                                }
                            }
                            this.isCancellation = false;
                            map.mapScaleValue = this.pinchTileZoomScale;
                            map.scale = Math.pow(2, this.pinchTileZoomScale - 1);
                            this.applyTransform(map);
                        }
                    }
                }
            }
            this.pinchDistance = distance;
        }
        if (!map.isTileMap) {
            map.mapScaleValue = zoomCalculationFactor;
            if (!isZoomCancelled) {
                this.applyTransform(map);
            }
            this.triggerZoomComplete(map, prevLevel, '');
        }
        if (Browser.isDevice) {
            this.removeToolbarOpacity(map.isTileMap ? Math.round(map.tileZoomLevel) : map.scale, map.element.id + '_Zooming_');
        }
    };
    Zoom.prototype.copyStyles = function (sourceElement, targetElement) {
        var sourceStyles = window.getComputedStyle(sourceElement);
        Array.from(sourceStyles).forEach(function (style) {
            targetElement.style[style] = sourceStyles.getPropertyValue(style);
        });
    };
    Zoom.prototype.getTouchCenterPoint = function () {
        var touchList = [];
        for (var i = 0; i < this.touchMoveList.length; i++) {
            touchList.push(this.getMousePosition(this.touchMoveList[i].pageX, this.touchMoveList[i].pageY));
        }
        return {
            x: (touchList[0].x + touchList[1].x) / 2,
            y: (touchList[0].y + touchList[1].y) / 2
        };
    };
    Zoom.prototype.triggerZoomComplete = function (map, prevLevel, type) {
        if (map.zoomSettings.enable) {
            var zoomArgs = void 0;
            if (map.isTileMap) {
                map.mapScaleValue = isNullOrUndefined(map.mapScaleValue) ? 1 : map.mapScaleValue;
                map.translatePoint.y = (map.tileTranslatePoint.y - (0.01 * map.mapScaleValue)) / map.scale;
                map.translatePoint.x = (map.tileTranslatePoint.x - (0.01 * map.mapScaleValue)) / map.scale;
            }
            var minMaxLatitudeLongitude = this.maps.getMinMaxLatitudeLongitude();
            if (!map.isTileMap) {
                zoomArgs = {
                    cancel: false, name: 'zoomComplete', type: type, maps: map,
                    tileTranslatePoint: {}, translatePoint: { previous: map.previousPoint, current: map.translatePoint },
                    tileZoomLevel: {}, scale: { previous: map.previousScale, current: map.scale },
                    minLatitude: minMaxLatitudeLongitude.minLatitude, maxLatitude: minMaxLatitudeLongitude.maxLatitude,
                    minLongitude: minMaxLatitudeLongitude.minLongitude, maxLongitude: minMaxLatitudeLongitude.maxLongitude
                };
            }
            else {
                zoomArgs = {
                    cancel: false, name: 'zoomComplete', type: type, maps: map,
                    tileTranslatePoint: { previous: map.tileTranslatePoint, current: map.tileTranslatePoint }, translatePoint: { previous: map.previousPoint, current: map.translatePoint },
                    tileZoomLevel: { previous: prevLevel, current: map.tileZoomLevel }, scale: { previous: map.previousScale, current: map.scale },
                    minLatitude: minMaxLatitudeLongitude.minLatitude, maxLatitude: minMaxLatitudeLongitude.maxLatitude,
                    minLongitude: minMaxLatitudeLongitude.minLongitude, maxLongitude: minMaxLatitudeLongitude.maxLongitude
                };
            }
            this.maps.trigger('zoomComplete', zoomArgs);
        }
    };
    /**
     * @returns {void}
     * @private
     */
    Zoom.prototype.drawZoomRectangle = function () {
        var map = this.maps;
        var down = this.mouseDownPoints;
        var move = this.mouseMovePoints;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var border = { width: 1, color: this.maps.themeStyle.rectangleZoomBorderColor };
        var width = Math.abs(move.x - down.x);
        var height = Math.abs(move.y - down.y);
        var x = ((move.x > down.x) ? down.x : down.x - width);
        var y = ((move.y > down.y) ? down.y : down.y - height);
        if ((x > map.mapAreaRect.x && x < (map.mapAreaRect.x + map.mapAreaRect.width)) &&
            (y > map.mapAreaRect.y) && (y < map.mapAreaRect.y + map.mapAreaRect.height)) {
            this.zoomingRect = new Rect(x, y, width, height);
            var rectSVGObject = map.renderer.createSvg({
                id: map.element.id + '_Selection_Rect_Zooming',
                width: map.availableSize.width,
                height: map.availableSize.height,
                style: 'position: absolute;'
            });
            rectSVGObject.style.position = 'absolute';
            var rectOption = new RectOption(map.element.id + '_ZoomRect', this.maps.themeStyle.rectangleZoomFillColor, border, this.maps.themeStyle.rectangleZoomFillOpacity, this.zoomingRect, 0, 0, '', '3');
            rectSVGObject.appendChild(map.renderer.drawRectangle(rectOption));
            getElementByID(map.element.id + '_Secondary_Element').appendChild(rectSVGObject);
        }
    };
    /**
     * To animate the zooming process.
     *
     * @param {Element} element - Specifies the element
     * @param {boolean} animate - Specifies the boolean value
     * @param {number} x - Specifies the x value
     * @param {number} y - Specifies the y value
     * @param {number} scale - Specifies the scale value
     * @returns {void}
     */
    Zoom.prototype.animateTransform = function (element, animate, x, y, scale) {
        var duration = this.currentLayer.animationDuration === 0 && animationMode === 'Enable' ? 1000 : this.currentLayer.animationDuration;
        if (!animate || duration === 0 || this.maps.isTileMap) {
            if (!(this.maps.isTileMap && element.id.indexOf('_Polygons_Group') > -1)) {
                element.setAttribute('transform', 'scale(' + (scale) + ') translate( ' + x + ' ' + y + ' )');
            }
            return;
        }
        if (!this.maps.isTileMap) {
            zoomAnimate(element, 0, duration, new MapLocation(x, y), scale, this.maps.mapAreaRect, this.maps);
        }
    };
    /**
     * @param {Maps} maps - Specifies the Map control
     * @param {boolean} isMouseWheel - Indicates whether the zoom operation was triggered by the mouse wheel.
     * @param {boolean} animate - Specifies the animation is available or not
     * @param {boolean} isPanning - Specifies that it is panning or not
     * @returns {void}
     * @private
     */
    Zoom.prototype.applyTransform = function (maps, isMouseWheel, animate, isPanning) {
        var _this = this;
        var layerIndex;
        this.templateCount = 0;
        var markerStyle;
        var scale = maps.scale;
        var x = maps.translatePoint.x;
        var y = maps.translatePoint.y;
        var currentLabelIndex = 0;
        maps.zoomShapeCollection = [];
        this.isPanningInProgress = isPanning || false;
        if (document.getElementById(maps.element.id + '_mapsTooltip')) {
            removeElement(maps.element.id + '_mapsTooltip');
        }
        if (maps.isTileMap) {
            var element = document.getElementById(maps.element.id + '_svg');
            if (element) {
                for (var k = 0; k < maps.layers.length; k++) {
                    var layerElement = element.querySelector('#' + maps.element.id + '_LayerIndex_' + k);
                    if (layerElement) {
                        element.removeChild(layerElement);
                    }
                }
            }
        }
        if (this.layerCollectionEle) {
            var _loop_1 = function (i) {
                var layerElement = this_1.layerCollectionEle.childNodes[i];
                if (layerElement.tagName === 'g') {
                    this_1.templateCount++;
                    this_1.index = layerElement.id.indexOf('_LayerIndex_') > -1 && parseFloat(layerElement.id.split('_LayerIndex_')[1].split('_')[0]);
                    this_1.currentLayer = maps.layersCollection[this_1.index];
                    var factor_1 = maps.mapLayerPanel.calculateFactor(this_1.currentLayer);
                    var elementCount = layerElement.childElementCount;
                    var templateElement = document.getElementById(maps.element.id + '_LayerIndex_' + this_1.index + '_Markers_Template_Group');
                    var _loop_2 = function (j) {
                        var currentEle = layerElement.childNodes[j];
                        if (!(currentEle.id.indexOf('_Markers_Group') > -1) && (!(currentEle.id.indexOf('_bubble_Group') > -1))
                            && (!(currentEle.id.indexOf('_dataLableIndex_Group') > -1))) {
                            if (maps.isTileMap && (currentEle.id.indexOf('_line_Group') > -1)) {
                                currentEle.remove();
                                if (layerElement.children.length > 0 && layerElement.children[0]) {
                                    layerElement.insertBefore(maps.navigationLineModule.renderNavigation(this_1.currentLayer, this_1.isPinchZooming ? this_1.pinchZoomScale : maps.tileZoomLevel, this_1.index), layerElement.children[1]);
                                }
                                else {
                                    layerElement.appendChild(maps.navigationLineModule.renderNavigation(this_1.currentLayer, this_1.isPinchZooming ? this_1.pinchZoomScale : maps.tileZoomLevel, this_1.index));
                                }
                            }
                            else if (maps.isTileMap && (currentEle.id.indexOf('_Polygons_Group') > -1)) {
                                if (this_1.currentLayer.polygonSettings.polygons.length > 0) {
                                    this_1.currentLayer.polygonSettings.polygons.map(function (polygonSettings, polygonIndex) {
                                        var markerData = polygonSettings.points;
                                        var path = calculatePolygonPath(maps, _this.isPinchZooming ? _this.pinchZoomScale : maps.tileZoomLevel, _this.currentLayer, markerData);
                                        var element = document.getElementById(maps.element.id + '_LayerIndex_' + _this.index + '_PolygonIndex_' + polygonIndex);
                                        if (!isNullOrUndefined(element)) {
                                            element.setAttribute('d', path);
                                        }
                                    });
                                    document.getElementById(maps.element.id + '_LayerIndex_' + this_1.index + '_Polygons_Group').style.visibility = '';
                                }
                            }
                            else if (currentEle.id.indexOf('Legend') === -1) {
                                changeBorderWidth(currentEle, this_1.index, scale, maps);
                                maps.zoomTranslatePoint = maps.translatePoint;
                                this_1.animateTransform(currentEle, animate, x, y, scale);
                            }
                        }
                        else if (currentEle.id.indexOf('_Markers_Group') > -1) {
                            if ((!this_1.isPanModeEnabled || !isPanning) && (!isNullOrUndefined(currentEle.childNodes[0]) || !isNullOrUndefined(templateElement.childNodes[0]))) {
                                var processElement = (!isNullOrUndefined(currentEle.childNodes[0]) ? currentEle.childNodes[0] : templateElement.childNodes[0]);
                                this_1.markerTranslates(processElement, factor_1, x, y, scale, 'Marker', layerElement);
                            }
                            currentEle = layerElement.childNodes[j];
                            if (!isNullOrUndefined(currentEle) && currentEle.id.indexOf('Markers') !== -1) {
                                Array.prototype.forEach.call(currentEle.childNodes, function (childNode, k) {
                                    _this.markerTranslate(childNode, factor_1, x, y, scale, 'Marker', animate);
                                    var dataIndex = parseInt(childNode['id'].split('_dataIndex_')[1].split('_')[0], 10);
                                    var markerIndex = parseInt(childNode['id'].split('_MarkerIndex_')[1].split('_')[0], 10);
                                    if (_this.currentLayer.markerSettings[markerIndex].initialMarkerSelection.length > 0) {
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        var markerSelectionValues = _this.currentLayer.markerSettings[markerIndex].dataSource[dataIndex];
                                        for (var x_1 = 0; x_1 < _this.currentLayer.markerSettings[markerIndex].initialMarkerSelection.length; x_1++) {
                                            if (_this.currentLayer.markerSettings[markerIndex].initialMarkerSelection[x_1]['latitude'] ===
                                                markerSelectionValues['latitude'] ||
                                                _this.currentLayer.markerSettings[markerIndex].initialMarkerSelection[x_1]['longitude'] ===
                                                    markerSelectionValues['longitude']) {
                                                maps.markerSelection(_this.currentLayer.markerSettings[markerIndex].selectionSettings, maps, currentEle.children[k], _this.currentLayer.markerSettings[markerIndex].dataSource[dataIndex]);
                                            }
                                        }
                                    }
                                    if (((_this.currentLayer.animationDuration > 0 || animationMode === 'Enable') || ((maps.layersCollection[0].animationDuration > 0 || animationMode === 'Enable') && _this.currentLayer.type === 'SubLayer')) && !_this.isPanModeEnabled) {
                                        if (!maps.isTileMap) {
                                            markerStyle = isMouseWheel ? markerStyle : 'visibility:hidden';
                                            if (!isNullOrUndefined(markerStyle)) {
                                                currentEle.style.cssText = markerStyle;
                                            }
                                        }
                                    }
                                });
                                if (this_1.isPanModeEnabled && maps.markerModule.sameMarkerData.length > 0) {
                                    clusterSeparate(maps.markerModule.sameMarkerData, maps, currentEle, true);
                                }
                                else if (maps.markerModule.sameMarkerData.length > 0) {
                                    maps.markerModule.sameMarkerData = [];
                                    if (document.getElementById(maps.element.id + '_mapsTooltip')) {
                                        removeElement(maps.element.id + '_mapsTooltip');
                                    }
                                }
                                if (document.getElementById(maps.element.id + '_mapsTooltip') && maps.mapsTooltipModule.tooltipTargetID.indexOf('_MarkerIndex_')
                                    && !this_1.isPanModeEnabled) {
                                    var mapsTooltip = maps.mapsTooltipModule;
                                    var tooltipElement = currentEle.querySelector('#' + mapsTooltip.tooltipTargetID);
                                    if (!isNullOrUndefined(tooltipElement)) {
                                        if (tooltipElement['style']['visibility'] === 'hidden') {
                                            removeElement(maps.element.id + '_mapsTooltip');
                                        }
                                        else {
                                            var x_2 = parseFloat(tooltipElement.getAttribute('transform').split('(')[1].split(')')[0].split(' ')[1]);
                                            var y_1 = parseFloat(tooltipElement.getAttribute('transform').split('(')[1].split(')')[0].split(' ')[2]);
                                            if (maps.isTileMap) {
                                                x_2 += +getElement(maps.element.id + '_tile_parent')['style']['left'].split('px')[0];
                                                y_1 += +getElement(maps.element.id + '_tile_parent')['style']['top'].split('px')[0];
                                            }
                                            mapsTooltip.svgTooltip.location.x = x_2;
                                            mapsTooltip.svgTooltip.location.y = y_1;
                                            mapsTooltip.svgTooltip.enableAnimation = false;
                                        }
                                    }
                                }
                            }
                        }
                        else if (currentEle.id.indexOf('_bubble_Group') > -1) {
                            var childElement = void 0;
                            for (var k = 0; k < currentEle.childElementCount; k++) {
                                childElement = currentEle.childNodes[k];
                                layerIndex = parseFloat(childElement.id.split('_LayerIndex_')[1].split('_')[0]);
                                var bubleIndex = parseFloat(childElement.id.split('_BubbleIndex_')[1].split('_')[0]);
                                var dataIndex = parseFloat(childElement.id.split('_BubbleIndex_')[1].split('_')[2]);
                                for (var l = 0; l < maps.bubbleModule.bubbleCollection.length; l++) {
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    var bubbleCollection = maps.bubbleModule.bubbleCollection[l];
                                    if (bubbleCollection['LayerIndex'] === layerIndex && bubbleCollection['BubbleIndex'] === bubleIndex &&
                                        bubbleCollection['DataIndex'] === dataIndex) {
                                        var centerX = bubbleCollection['center']['x'];
                                        var centerY = bubbleCollection['center']['y'];
                                        var currentX = ((centerX + x) * scale);
                                        var currentY = ((centerY + y) * scale);
                                        var duration = this_1.currentLayer.animationDuration === 0 && animationMode === 'Enable' ? 1000 : this_1.currentLayer.animationDuration;
                                        if (!animate || duration === 0) {
                                            childElement.setAttribute('transform', 'translate( ' + currentX + ' ' + currentY + ' )');
                                        }
                                        else {
                                            smoothTranslate(childElement, 0, duration, new MapLocation(currentX, currentY));
                                        }
                                        break;
                                    }
                                }
                            }
                        }
                        else if (currentEle.id.indexOf('_dataLableIndex_Group') > -1 && !isNullOrUndefined(maps.layers[this_1.index])) {
                            maps.zoomLabelPositions = [];
                            maps.zoomLabelPositions = maps.dataLabelModule.dataLabelCollections;
                            var labelAnimate_1 = !maps.isTileMap && animate;
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            var intersect_1 = [];
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            Array.prototype.forEach.call(currentEle.childNodes, function (childNode, k) {
                                if (currentEle.childNodes[k]['id'].indexOf('_LabelIndex_') > -1) {
                                    var labelIndex = parseFloat(currentEle.childNodes[k]['id'].split('_LabelIndex_')[1].split('_')[0]);
                                    var zoomShapeWidth = currentEle.childNodes[k].id;
                                    maps.zoomShapeCollection.push(zoomShapeWidth);
                                    _this.dataLabelTranslate(currentEle.childNodes[k], factor_1, x, y, scale, 'DataLabel', labelAnimate_1, currentLabelIndex, isPanning, intersect_1);
                                    currentLabelIndex++;
                                    var dataLabel = maps.layers[_this.index].dataLabelSettings;
                                    var border = dataLabel.border;
                                    if (k > 0 && border['width'] > 1) {
                                        if (currentEle.childNodes[k - 1]['id'].indexOf('_rectIndex_') > -1 && !isNullOrUndefined(maps.zoomLabelPositions[labelIndex])) {
                                            var labelX = ((maps.zoomLabelPositions[labelIndex]['location']['x'] + x) * scale);
                                            var labelY = ((maps.zoomLabelPositions[labelIndex]['location']['y'] + y) * scale);
                                            var zoomtext = currentEle.childNodes[k]['textContent'];
                                            var style = maps.layers[_this.index].dataLabelSettings.textStyle;
                                            var zoomtextSize = measureText(zoomtext, style);
                                            var padding = 5;
                                            var rectElement = currentEle.childNodes[k - 1];
                                            var rectX = labelX - zoomtextSize['width'] / 2;
                                            var rectY = labelY - zoomtextSize['height'] / 2 - padding;
                                            rectElement['setAttribute']('x', rectX);
                                            rectElement['setAttribute']('y', rectY);
                                        }
                                    }
                                }
                            });
                        }
                    };
                    for (var j = 0; j < elementCount; j++) {
                        _loop_2(j);
                    }
                }
                maps.arrangeTemplate();
            };
            var this_1 = this;
            for (var i = 0; i < this.layerCollectionEle.childElementCount; i++) {
                _loop_1(i);
            }
            if (!isNullOrUndefined(this.currentLayer)) {
                if (!animate || this.currentLayer.animationDuration === 0 || maps.isTileMap) {
                    this.processTemplate(x, y, scale, maps);
                }
            }
        }
    };
    Zoom.prototype.markerTranslates = function (element, factor, x, y, scale, type, layerElement) {
        var _this = this;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var templateFn;
        var nullCount = 0;
        var markerCounts = 0;
        var markerTemplateCounts = 0;
        var layerIndex = parseInt((element ? element : layerElement).id.split('_LayerIndex_')[1].split('_')[0], 10);
        var markerSVGObject = this.maps.renderer.createGroup({
            id: this.maps.element.id + '_Markers_Group',
            class: 'GroupElement'
        });
        markerSVGObject.style.pointerEvents = 'auto';
        if (document.getElementById(markerSVGObject.id)) {
            removeElement(markerSVGObject.id);
        }
        var mapsAreaRect = this.maps.mapAreaRect;
        var markerTemplateElements = createElement('div', {
            id: this.maps.element.id + '_LayerIndex_' + layerIndex + '_Markers_Template_Group',
            className: 'template'
        });
        markerTemplateElements.style.cssText = 'overflow: hidden; position: absolute;pointer-events: none;' +
            'top:' + mapsAreaRect.y + 'px;' +
            'left:' + mapsAreaRect.x + 'px;' +
            'height:' + mapsAreaRect.height + 'px;' +
            'width:' + mapsAreaRect.width + 'px;';
        if (document.getElementById(markerTemplateElements.id)) {
            removeElement(markerTemplateElements.id);
        }
        var currentLayers = this.maps.layersCollection[layerIndex];
        var allowInnerClusterSetting = this.maps.markerModule.allowInnerClusterSetting(currentLayers);
        Array.prototype.forEach.call(currentLayers.markerSettings, function (markerSettings, markerIndex) {
            markerTemplateCounts = 0;
            markerCounts = 0;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var markerDatas = markerSettings.dataSource;
            if (!isNullOrUndefined(markerDatas)) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                Array.prototype.forEach.call(markerDatas, function (data, dataIndex) {
                    _this.maps.markerNullCount = markerIndex >= 0 && dataIndex === 0 ? 0 : _this.maps.markerNullCount;
                    var eventArgs = {
                        template: markerSettings.template, data: data, maps: _this.maps, marker: markerSettings,
                        cancel: false, name: markerRendering, fill: markerSettings.fill, colorValuePath: markerSettings.colorValuePath,
                        shapeValuePath: markerSettings.shapeValuePath,
                        height: !isNullOrUndefined(markerSettings.heightValuePath) && !isNullOrUndefined(data[markerSettings.heightValuePath])
                            ? data[markerSettings.heightValuePath] : markerSettings.height,
                        width: !isNullOrUndefined(markerSettings.widthValuePath) && !isNullOrUndefined(data[markerSettings.widthValuePath])
                            ? data[markerSettings.widthValuePath] : markerSettings.width,
                        imageUrl: markerSettings.imageUrl, imageUrlValuePath: markerSettings.imageUrlValuePath, shape: markerSettings.shape,
                        border: markerSettings.border
                    };
                    eventArgs = markerShapeChoose(eventArgs, data);
                    eventArgs = markerColorChoose(eventArgs, data);
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    _this.maps.trigger('markerRendering', eventArgs, function (MarkerArgs) {
                        if (markerSettings.shapeValuePath !== eventArgs.shapeValuePath) {
                            eventArgs = markerShapeChoose(eventArgs, data);
                        }
                        if (markerSettings.colorValuePath !== eventArgs.colorValuePath) {
                            eventArgs = markerColorChoose(eventArgs, data);
                        }
                        var lati = (!isNullOrUndefined(markerSettings.latitudeValuePath)) ?
                            Number(getValueFromObject(data, markerSettings.latitudeValuePath)) : !isNullOrUndefined(data['latitude']) ?
                            parseFloat(data['latitude']) : !isNullOrUndefined(data['Latitude']) ? data['Latitude'] : null;
                        var long = (!isNullOrUndefined(markerSettings.longitudeValuePath)) ?
                            Number(getValueFromObject(data, markerSettings.longitudeValuePath)) : !isNullOrUndefined(data['longitude']) ?
                            parseFloat(data['longitude']) : !isNullOrUndefined(data['Longitude']) ? data['Longitude'] : null;
                        var offset = markerSettings.offset;
                        if (!eventArgs.cancel && markerSettings.visible && !isNullOrUndefined(long) && !isNullOrUndefined(lati)) {
                            var markerID = _this.maps.element.id + '_LayerIndex_' + layerIndex + '_MarkerIndex_'
                                + markerIndex + '_dataIndex_' + dataIndex;
                            var location_1 = (_this.maps.isTileMap) ? convertTileLatLongToPoint(new MapLocation(long, lati), _this.isPinchZooming ? _this.pinchZoomScale : _this.maps.tileZoomLevel, _this.maps.tileTranslatePoint, true) : convertGeoToPoint(lati, long, factor, currentLayers, _this.maps);
                            var transPoint = { x: x, y: y };
                            if (eventArgs.template && (!isNaN(location_1.x) && !isNaN(location_1.y))) {
                                markerTemplateCounts++;
                                markerTemplate(eventArgs, templateFn, markerID, data, markerIndex, markerTemplateElements, location_1, transPoint, scale, offset, _this.maps);
                            }
                            else if (!eventArgs.template && (!isNaN(location_1.x) && !isNaN(location_1.y))) {
                                markerCounts++;
                                marker(eventArgs, markerSettings, markerDatas, dataIndex, location_1, transPoint, markerID, offset, scale, _this.maps, markerSVGObject);
                            }
                        }
                        nullCount += (!isNaN(lati) && !isNaN(long)) ? 0 : 1;
                        markerTemplateCounts += (eventArgs.cancel) ? 1 : 0;
                        markerCounts += (eventArgs.cancel) ? 1 : 0;
                        _this.maps.markerNullCount = (isNullOrUndefined(lati) || isNullOrUndefined(long))
                            ? _this.maps.markerNullCount + 1 : _this.maps.markerNullCount;
                        var markerDataLength = markerDatas.length - _this.maps.markerNullCount;
                        var isMarkersClustered = false;
                        var markerGroup = (markerSettings.clusterSettings.allowClustering
                            || (currentLayers.markerClusterSettings.allowClustering && currentLayers.markerSettings.length > 1))
                            ? markerSVGObject.querySelectorAll("[id*='LayerIndex_" + layerIndex + "_MarkerIndex_" + markerIndex + "']:not([id*='_Group'])")
                            : markerSVGObject.childNodes;
                        if (markerGroup.length === (markerDataLength - markerTemplateCounts - nullCount) && (type !== 'Template')) {
                            if (_this.maps.isTileMap) {
                                var polygonsElement = document.getElementById(_this.maps.element.id + '_LayerIndex_' + layerIndex + '_Polygons_Group');
                                var polygonElement = document.getElementById(_this.maps.element.id + '_LayerIndex_' + layerIndex + '_Polygon_Group');
                                if (!isNullOrUndefined(polygonsElement)) {
                                    polygonsElement.insertAdjacentElement('afterend', markerSVGObject);
                                }
                                else {
                                    if (!isNullOrUndefined(polygonElement)) {
                                        polygonElement.insertAdjacentElement('afterend', markerSVGObject);
                                    }
                                    else {
                                        layerElement.insertBefore(markerSVGObject, layerElement.firstElementChild);
                                    }
                                }
                            }
                            else {
                                layerElement.appendChild(markerSVGObject);
                            }
                            if (currentLayers.markerSettings[markerIndex].clusterSettings.allowClustering ||
                                !allowInnerClusterSetting && currentLayers.markerClusterSettings.allowClustering) {
                                _this.maps.svgObject.appendChild(markerSVGObject);
                                _this.maps.element.appendChild(_this.maps.svgObject);
                                isMarkersClustered = clusterTemplate(currentLayers, markerSVGObject, _this.maps, layerIndex, markerIndex, markerSVGObject, layerElement, true, true, null, allowInnerClusterSetting);
                            }
                        }
                        var markerTemplateGroup = (markerSettings.clusterSettings.allowClustering
                            || (currentLayers.markerClusterSettings.allowClustering && currentLayers.markerSettings.length > 1))
                            ? markerTemplateElements.querySelectorAll("[id*='LayerIndex_" + layerIndex + "_MarkerIndex_" + markerIndex + "']:not([id*='_Group'])")
                            : markerTemplateElements.childNodes;
                        if (markerTemplateGroup.length === (markerDataLength - markerCounts - nullCount) && getElementByID(_this.maps.element.id + '_Secondary_Element')) {
                            getElementByID(_this.maps.element.id + '_Secondary_Element').appendChild(markerTemplateElements);
                            if (scale >= 1) {
                                if ((markerSettings.clusterSettings.allowClustering || !allowInnerClusterSetting &&
                                    currentLayers.markerClusterSettings.allowClustering) && !isMarkersClustered) {
                                    clusterTemplate(currentLayers, markerTemplateElements, _this.maps, layerIndex, markerIndex, markerSVGObject, layerElement, false, true, null, allowInnerClusterSetting);
                                }
                            }
                        }
                    });
                });
            }
        });
    };
    /**
     * To translate the layer template elements.
     *
     * @param {number} x - Specifies the x value
     * @param {number} y - Specifies the y value
     * @param {number} scale - Specifies the scale value
     * @param {Maps} maps - Specifies the maps value
     * @returns {void}
     * @private
     */
    Zoom.prototype.processTemplate = function (x, y, scale, maps) {
        var currentLabelIndex = 0;
        for (var i = 0; i < this.templateCount; i++) {
            var factor = maps.mapLayerPanel.calculateFactor(this.currentLayer);
            var markerTemplateElement = getElementByID(maps.element.id + '_LayerIndex_' +
                i + '_Markers_Template_Group');
            var datalabelTemplateElemement = getElementByID(maps.element.id + '_LayerIndex_'
                + i + '_Label_Template_Group');
            var polygonElement = getElementByID(maps.element.id + '_LayerIndex_'
                + i + '_Polygons_Group');
            if ((!isNullOrUndefined(markerTemplateElement)) && markerTemplateElement.childElementCount > 0) {
                markerTemplateElement.style.visibility = 'visible';
                for (var k = 0; k < markerTemplateElement.childElementCount; k++) {
                    this.markerTranslate(markerTemplateElement.childNodes[k], factor, x, y, scale, 'Template');
                }
            }
            if ((!isNullOrUndefined(datalabelTemplateElemement)) && datalabelTemplateElemement.childElementCount > 0) {
                for (var k = 0; k < datalabelTemplateElemement.childElementCount; k++) {
                    this.dataLabelTranslate(datalabelTemplateElemement.childNodes[k], factor, x, y, scale, 'Template', false, currentLabelIndex);
                    currentLabelIndex++;
                }
            }
            if (!isNullOrUndefined(polygonElement)) {
                for (var k = 0; k < polygonElement.childElementCount; k++) {
                    var width = maps.layersCollection[i].polygonSettings.polygons[k].borderWidth;
                    polygonElement.childNodes[k].childNodes[0].setAttribute('stroke-width', (width / scale).toString());
                }
            }
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Zoom.prototype.dataLabelTranslate = function (element, factor, x, y, scale, type, animate, currentLabelIndex, isPanning, intersect) {
        if (animate === void 0) { animate = false; }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var labelCollection = this.maps.dataLabelModule.dataLabelCollections;
        var text;
        var trimmedLable;
        var style = this.maps.layers[this.index].dataLabelSettings.textStyle;
        var zoomtext;
        var zoomtextSize;
        var zoomtrimLabel;
        var layerIndex = parseFloat(element.id.split('_LayerIndex_')[1].split('_')[0]);
        var shapeIndex = parseFloat(element.id.split('_shapeIndex_')[1].split('_')[0]);
        var labelIndex;
        if (element.id.indexOf('_LabelIndex_') > -1) {
            labelIndex = parseFloat(element.id.split('_LabelIndex_')[1].split('_')[0]);
        }
        var duration = this.currentLayer.animationDuration === 0 && animationMode === 'Enable' ? 1000 : this.currentLayer.animationDuration;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var label = labelCollection[currentLabelIndex];
        var index = currentLabelIndex;
        if (label['layerIndex'] === layerIndex && label['shapeIndex'] === shapeIndex
            && label['labelIndex'] === labelIndex) {
            var labelX = label['location']['x'];
            var labelY = label['location']['y'];
            if (type === 'Template') {
                var locationX = 0;
                var locationY = 0;
                if (this.maps.isTileMap) {
                    zoomtext = label['dataLabelText'];
                    zoomtextSize = measureText(zoomtext, style);
                    locationX = ((labelX + x) * scale) - (zoomtextSize['width'] / 2);
                    locationY = ((labelY + y) * scale) - (zoomtextSize['height']);
                }
                else {
                    var layerEle = getElementByID(this.maps.element.id + '_Layer_Collections');
                    labelX = ((Math.abs(this.maps.baseMapRectBounds['min']['x'] - labelX)) * scale);
                    labelY = ((Math.abs(this.maps.baseMapRectBounds['min']['y'] - labelY)) * scale);
                    var layerOffset = layerEle.getBoundingClientRect();
                    var elementOffset = element.parentElement.getBoundingClientRect();
                    locationX = ((labelX) + (layerOffset.left - elementOffset.left));
                    locationY = ((labelY) + (layerOffset.top - elementOffset.top));
                }
                element.style.left = locationX + 'px';
                element.style.top = locationY + 'px';
            }
            else {
                labelX = ((labelX + x) * scale);
                labelY = ((labelY + y) * scale);
                zoomtext = label['dataLabelText'];
                if (!animate || duration === 0) {
                    element.setAttribute('transform', 'translate( ' + labelX + ' ' + labelY + ' )');
                }
                if ((isNullOrUndefined(isPanning) || !isPanning) && (this.maps.layers[this.index].dataLabelSettings.smartLabelMode !== 'None' ||
                    this.maps.layers[this.index].dataLabelSettings.intersectionAction !== 'None')) {
                    zoomtextSize = measureTextElement(zoomtext, style);
                    var start = labelY - zoomtextSize['height'] / 2;
                    var end = labelY + zoomtextSize['height'] / 2;
                    var xpositionEnds = labelX + zoomtextSize['width'] / 2;
                    var xpositionStart = labelX - zoomtextSize['width'] / 2;
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    var textLocations = { rightWidth: xpositionEnds, leftWidth: xpositionStart, heightTop: start, heightBottom: end };
                    if (this.maps.layers[this.index].dataLabelSettings.smartLabelMode === 'Hide') {
                        if (scale > 1) {
                            text = ((this.maps.dataLabelShape[index] * scale) >= zoomtextSize['width']) ? zoomtext : '';
                            element.textContent = text;
                        }
                        else {
                            text = (this.maps.dataLabelShape[index] >= zoomtextSize['width']) ? zoomtext : '';
                            element.textContent = text;
                        }
                    }
                    var widthList = [];
                    if (this.maps.layers[this.index].dataLabelSettings.smartLabelMode === 'Trim') {
                        if (scale > 1) {
                            zoomtrimLabel = textTrim((this.maps.dataLabelShape[index] * scale), zoomtext, style, zoomtextSize.width, true, widthList);
                            text = zoomtrimLabel;
                            element.textContent = text;
                        }
                        else {
                            zoomtrimLabel = textTrim(this.maps.dataLabelShape[index], zoomtext, style, zoomtextSize.width, true, widthList);
                            text = zoomtrimLabel;
                            element.textContent = text;
                        }
                    }
                    if (this.maps.layers[this.index].dataLabelSettings.intersectionAction === 'Hide') {
                        for (var m = 0; m < intersect.length; m++) {
                            if (!isNullOrUndefined(intersect[m])) {
                                if (textLocations['leftWidth'] > intersect[m]['rightWidth']
                                    || textLocations['rightWidth'] < intersect[m]['leftWidth']
                                    || textLocations['heightTop'] > intersect[m]['heightBottom']
                                    || textLocations['heightBottom'] < intersect[m]['heightTop']) {
                                    text = !isNullOrUndefined(text) ? text : zoomtext;
                                    element.textContent = text;
                                }
                                else {
                                    text = '';
                                    element.textContent = text;
                                    break;
                                }
                            }
                        }
                        intersect.push(textLocations);
                    }
                    if (this.maps.layers[this.index].dataLabelSettings.intersectionAction === 'Trim') {
                        for (var j = 0; j < intersect.length; j++) {
                            if (!isNullOrUndefined(intersect[j])) {
                                if (textLocations['rightWidth'] < intersect[j]['leftWidth']
                                    || textLocations['leftWidth'] > intersect[j]['rightWidth']
                                    || textLocations['heightBottom'] < intersect[j]['heightTop']
                                    || textLocations['heightTop'] > intersect[j]['heightBottom']) {
                                    trimmedLable = !isNullOrUndefined(text) ? text : zoomtext;
                                    if (scale > 1) {
                                        var trimmedWidth = widthList.length > 0 ? widthList[0] : zoomtextSize.width;
                                        trimmedLable = textTrim((this.maps.dataLabelShape[index] * scale), trimmedLable, style, trimmedWidth, true);
                                    }
                                    element.textContent = trimmedLable;
                                }
                                else {
                                    if (textLocations['leftWidth'] > intersect[j]['leftWidth']) {
                                        var width = intersect[j]['rightWidth'] - textLocations['leftWidth'];
                                        var difference = width - (textLocations['rightWidth'] - textLocations['leftWidth']);
                                        text = !isNullOrUndefined(text) ? text : zoomtext;
                                        var trimmedWidth = widthList.length > 0 ? widthList[0] : zoomtextSize.width;
                                        trimmedLable = textTrim(difference, text, style, trimmedWidth, true);
                                        element.textContent = trimmedLable;
                                        break;
                                    }
                                    if (textLocations['leftWidth'] < intersect[j]['leftWidth']) {
                                        var width = textLocations['rightWidth'] - intersect[j]['leftWidth'];
                                        var difference = Math.abs(width - (textLocations['rightWidth'] - textLocations['leftWidth']));
                                        text = !isNullOrUndefined(text) ? text : zoomtext;
                                        var trimmedWidth = widthList.length > 0 ? widthList[0] : zoomtextSize.width;
                                        trimmedLable = textTrim(difference, text, style, trimmedWidth, true);
                                        element.textContent = trimmedLable;
                                        break;
                                    }
                                }
                            }
                        }
                        intersect.push(textLocations);
                        if (isNullOrUndefined(trimmedLable)) {
                            trimmedLable = textTrim((this.maps.dataLabelShape[index] * scale), zoomtext, style, zoomtextSize.width, true);
                            element.textContent = trimmedLable;
                        }
                    }
                }
                if (animate || duration > 0) {
                    smoothTranslate(element, 0, duration, new MapLocation(labelX, labelY));
                }
            }
        }
    };
    /**
     *
     * @param {Element | HTMLElement} element - Specifies the marker element.
     * @param {number} factor - Specifies scale factor.
     * @param {number} x - Specifies the x location of the marker element.
     * @param {number} y - Specifies the y location of the marker element.
     * @param {number} scale - Specifies scale factor.
     * @param {number} type - Specifies the type of the marker processing.
     * @param {number} animate - Specifies whether the animation is enabled or not.
     * @returns {void}
     * @private
     */
    Zoom.prototype.markerTranslate = function (element, factor, x, y, scale, type, animate) {
        if (animate === void 0) { animate = false; }
        var layerIndex = parseInt(element.id.split('_LayerIndex_')[1].split('_')[0], 10);
        var markerIndex = parseInt(element.id.split('_MarkerIndex_')[1].split('_')[0], 10);
        var dataIndex = parseInt(element.id.split('_dataIndex_')[1].split('_')[0], 10);
        var layer = this.maps.layersCollection[layerIndex];
        var marker = layer.markerSettings[markerIndex];
        if (!isNullOrUndefined(marker) && !isNullOrUndefined(marker.dataSource) && !isNullOrUndefined(marker.dataSource[dataIndex])) {
            var lng = (!isNullOrUndefined(marker.longitudeValuePath)) ?
                Number(getValueFromObject(marker.dataSource[dataIndex], marker.longitudeValuePath)) :
                !isNullOrUndefined(marker.dataSource[dataIndex]['longitude']) ? parseFloat(marker.dataSource[dataIndex]['longitude']) :
                    !isNullOrUndefined(marker.dataSource[dataIndex]['Longitude']) ? parseFloat(marker.dataSource[dataIndex]['Longitude']) : 0;
            var lat = (!isNullOrUndefined(marker.latitudeValuePath)) ?
                Number(getValueFromObject(marker.dataSource[dataIndex], marker.latitudeValuePath)) :
                !isNullOrUndefined(marker.dataSource[dataIndex]['latitude']) ? parseFloat(marker.dataSource[dataIndex]['latitude']) :
                    !isNullOrUndefined(marker.dataSource[dataIndex]['Latitude']) ? parseFloat(marker.dataSource[dataIndex]['Latitude']) : 0;
            var duration = this.currentLayer.animationDuration === 0 && animationMode === 'Enable' ? 1000 : this.currentLayer.animationDuration;
            var location_2 = (this.maps.isTileMap) ? convertTileLatLongToPoint(new Point(lng, lat), this.isPinchZooming ? this.pinchZoomScale : this.maps.tileZoomLevel, this.maps.tileTranslatePoint, true) : convertGeoToPoint(lat, lng, factor, layer, this.maps);
            if (this.maps.isTileMap) {
                if (type === 'Template') {
                    element.style.left = (location_2.x + marker.offset.x) + 'px';
                    element.style.top = (location_2.y + marker.offset.y) + 'px';
                }
                else {
                    location_2.x += marker.offset.x;
                    location_2.y += marker.offset.y;
                    element.setAttribute('transform', 'translate( ' + location_2.x + ' ' + location_2.y + ' )');
                }
            }
            else {
                if (type === 'Template') {
                    if (duration > 0) {
                        location_2.x = ((Math.abs(this.maps.baseMapRectBounds['min']['x'] - location_2.x)) * scale);
                        location_2.y = ((Math.abs(this.maps.baseMapRectBounds['min']['y'] - location_2.y)) * scale);
                        var layerOffset = getElementByID(this.maps.element.id + '_Layer_Collections').getBoundingClientRect();
                        var elementOffset = element.parentElement.getBoundingClientRect();
                        element.style.left = (((location_2.x) + (layerOffset.left - elementOffset.left)) + marker.offset.x) + 'px';
                        element.style.top = (((location_2.y) + (layerOffset.top - elementOffset.top)) + marker.offset.y) + 'px';
                        element.style.transform = 'translate(-50%, -50%)';
                    }
                    else {
                        element.style.left = ((location_2.x + x) * scale) + marker.offset.x - this.maps.mapAreaRect.x + 'px';
                        element.style.top = ((location_2.y + y) * scale) + marker.offset.y - this.maps.mapAreaRect.y + 'px';
                    }
                }
                else {
                    location_2.x = (((location_2.x + x) * scale) + marker.offset.x);
                    location_2.y = (((location_2.y + y) * scale) + marker.offset.y);
                    if (!animate || duration === 0) {
                        element.setAttribute('transform', 'translate( ' + location_2.x + ' ' + location_2.y + ' )');
                    }
                    else {
                        smoothTranslate(element, 0, duration, location_2);
                    }
                }
            }
        }
    };
    Zoom.prototype.markerLineAnimation = function (map) {
        if (map.isTileMap) {
            for (var i = 0; i < map.layersCollection.length; i++) {
                var markerTemplateElement = getElementByID(this.maps.element.id + '_LayerIndex_' + i + '_Markers_Template_Group');
                var lineElement = getElementByID(this.maps.element.id + '_LayerIndex_' + i + '_line_Group');
                var polygonElement = getElementByID(this.maps.element.id + '_LayerIndex_' + i + '_Polygons_Group');
                if (!isNullOrUndefined(markerTemplateElement)) {
                    markerTemplateElement.style.visibility = 'hidden';
                }
                if (!isNullOrUndefined(lineElement)) {
                    lineElement.style.visibility = 'hidden';
                }
                if (!isNullOrUndefined(polygonElement)) {
                    polygonElement.style.visibility = 'hidden';
                }
            }
        }
    };
    /**
     * @param {PanDirection} direction - Specifies the direction of the panning.
     * @param {number} xDifference - Specifies the distance moved in the horizontal direction.
     * @param {number} yDifference - Specifies the distance moved in the vertical direction.
     * @param {PointerEvent | TouchEvent | KeyboardEvent} event - Specifies the pointer event argument.
     * @returns {void}
     * @private
     */
    Zoom.prototype.panning = function (direction, xDifference, yDifference, event) {
        var map = this.maps;
        var panArgs;
        var down = this.mouseDownPoints;
        var move = this.mouseMovePoints;
        var scale = map.scale;
        map.markerZoomedState = false;
        map.zoomPersistence = map.enablePersistence;
        map.defaultState = false;
        map.initialCheck = false;
        var translatePoint = map.translatePoint;
        var prevTilePoint = map.tileTranslatePoint;
        var x;
        var y;
        xDifference = !isNullOrUndefined(xDifference) ? xDifference : (down.x - move.x);
        yDifference = !isNullOrUndefined(yDifference) ? yDifference : (down.y - move.y);
        var layerX = event.type.indexOf('mouse') > -1 || event.type.indexOf('key') > -1 ? event['layerX'] : event.touches[0].pageX;
        var layerY = event.type.indexOf('mouse') > -1 || event.type.indexOf('key') > -1 ? event['layerY'] : event.touches[0].pageY;
        this.maps.mergeCluster();
        if (!map.isTileMap) {
            var marginTop = getProcessedMarginValue(map.margin.top);
            var legendElement = document.getElementById(map.element.id + '_Legend_Group');
            var legendHeight = !isNullOrUndefined(legendElement) ? legendElement.getClientRects()[0].height : 0;
            x = translatePoint.x - xDifference / scale;
            y = translatePoint.y - yDifference / scale;
            var layerRect = getElementByID(map.element.id + '_Layer_Collections').getBoundingClientRect();
            var elementRect = getElementByID(map.element.id + '_svg').getBoundingClientRect();
            var panningXDirection = ((xDifference < 0 ? layerRect.left <= (elementRect.left + map.mapAreaRect.x) :
                ((layerRect.left + layerRect.width + map.mapAreaRect.x) >= (elementRect.width))));
            var panningYDirection = ((yDifference < 0 ? layerRect.top <= (elementRect.top + map.mapAreaRect.y) :
                ((layerRect.top + layerRect.height + legendHeight + marginTop) >= (elementRect.top + elementRect.height))));
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var location_3 = this.maps.getGeoLocation(this.maps.layersCollection.length - 1, layerX, layerY);
            var minMaxLatitudeLongitude = this.maps.getMinMaxLatitudeLongitude();
            panArgs = {
                cancel: false, name: pan, maps: map,
                tileTranslatePoint: {}, translatePoint: { previous: translatePoint, current: new Point(x, y) },
                scale: map.scale, tileZoomLevel: map.tileZoomLevel, latitude: location_3['latitude'], longitude: location_3['longitude'],
                minLatitude: minMaxLatitudeLongitude.minLatitude, maxLatitude: minMaxLatitudeLongitude.maxLatitude,
                minLongitude: minMaxLatitudeLongitude.minLongitude, maxLongitude: minMaxLatitudeLongitude.maxLongitude
            };
            map.trigger(pan, panArgs);
            if (!panArgs.cancel) {
                if (panningXDirection && panningYDirection) {
                    map.translatePoint = new Point(x, y);
                    this.applyTransform(map, false, false, true);
                }
                else if (panningXDirection) {
                    map.translatePoint = new Point(x, map.translatePoint.y);
                    this.applyTransform(map, false, false, true);
                }
                else if (panningYDirection) {
                    map.translatePoint = new Point(map.translatePoint.x, y);
                    this.applyTransform(map, false, false, true);
                }
            }
            this.maps.zoomNotApplied = false;
        }
        else if (this.maps.tileZoomLevel > 1) {
            x = map.tileTranslatePoint.x - xDifference;
            y = map.tileTranslatePoint.y - yDifference;
            map.tileTranslatePoint.x = x;
            map.tileTranslatePoint.y = y;
            if ((map.tileTranslatePoint.y > -10 && yDifference < 0) || ((map.tileTranslatePoint.y < -((Math.pow(2, this.maps.tileZoomLevel) - 2) * 256) && yDifference > 0))) {
                map.tileTranslatePoint.x = x + xDifference;
                map.tileTranslatePoint.y = y + yDifference;
            }
            map.translatePoint.x = (map.tileTranslatePoint.x) / map.scale;
            map.translatePoint.y = (map.tileTranslatePoint.y) / map.scale;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var location_4 = this.maps.getTileGeoLocation(layerX, layerY);
            var minMaxLatitudeLongitude = this.maps.getMinMaxLatitudeLongitude();
            panArgs = {
                cancel: false, name: pan, maps: map,
                tileTranslatePoint: { previous: prevTilePoint, current: map.tileTranslatePoint },
                translatePoint: { previous: translatePoint, current: map.translatePoint }, scale: map.scale,
                tileZoomLevel: map.tileZoomLevel, latitude: location_4['latitude'], longitude: location_4['longitude'],
                minLatitude: minMaxLatitudeLongitude.minLatitude, maxLatitude: minMaxLatitudeLongitude.maxLatitude,
                minLongitude: minMaxLatitudeLongitude.minLongitude, maxLongitude: minMaxLatitudeLongitude.maxLongitude
            };
            map.trigger(pan, panArgs);
            map.mapLayerPanel.generateTiles(map.tileZoomLevel, map.tileTranslatePoint, 'Pan');
            this.applyTransform(map, false, false, true);
            map.translatePoint.x = (map.tileTranslatePoint.x - xDifference) / map.scale;
            map.translatePoint.y = (map.tileTranslatePoint.y - yDifference) / map.scale;
        }
        map.zoomTranslatePoint = map.translatePoint;
        this.mouseDownPoints = this.mouseMovePoints;
        this.isSingleClick = false;
    };
    /**
     * @param {number} zoomFactor - Specifies the factor for zooming
     * @param {string} type - Specifies the type
     * @returns {void}
     * @private
     */
    Zoom.prototype.toolBarZooming = function (zoomFactor, type) {
        var _this = this;
        var map = this.maps;
        map.initialCheck = map.isMarkerZoomCompleted = false;
        map.defaultState = ((type === 'Reset' && zoomFactor === 1 && !(map.zoomSettings.resetToInitial && map.applyZoomReset))
            || (type === 'ZoomOut' && zoomFactor === 1));
        var prevLevel = map.tileZoomLevel;
        var scale = map.previousScale = map.scale;
        map.markerZoomedState = false;
        map.zoomPersistence = map.enablePersistence;
        map.mapScaleValue = zoomFactor;
        var maxZoom = map.zoomSettings.maxZoom;
        var minZoom = map.zoomSettings.minZoom;
        var size = map.mapAreaRect;
        var translatePoint = map.previousPoint = map.translatePoint;
        var prevTilePoint = map.tileTranslatePoint;
        this.maps.mergeCluster();
        map.previousProjection = type === 'Reset' ? undefined : map.projectionType;
        zoomFactor = (type === 'ZoomOut') ? (Math.round(zoomFactor) === 1 ? 1 : zoomFactor) : zoomFactor;
        zoomFactor = (type === 'Reset') ? minZoom : (Math.round(zoomFactor) === 0) ? 1 : zoomFactor;
        zoomFactor = (minZoom > zoomFactor && type === 'ZoomIn') ? minZoom + 1 : zoomFactor;
        if ((!map.isTileMap) && (type === 'ZoomIn' ? zoomFactor >= minZoom && Math.round(zoomFactor) <= maxZoom : zoomFactor >= minZoom
            || map.isReset)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var min = map.baseMapRectBounds['min'];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var max = map.baseMapRectBounds['max'];
            var mapWidth = Math.abs(max['x'] - min['x']);
            var mapHeight = Math.abs(min['y'] - max['y']);
            var translatePointX = void 0;
            var translatePointY = void 0;
            if (zoomFactor < 1.2 && map.projectionType !== 'Eckert5') {
                if (mapHeight === 0 || mapWidth === 0 || mapHeight === mapWidth) {
                    mapWidth = size.width / 2;
                    mapHeight = size.height;
                }
                zoomFactor = parseFloat(Math.min(size.width / mapWidth, size.height / mapHeight).toFixed(2));
                zoomFactor = zoomFactor > 1.05 ? 1 : zoomFactor;
                map.translatePoint = this.calculateInitalZoomTranslatePoint(zoomFactor, mapWidth, mapHeight, size, min, map);
            }
            else {
                translatePointX = translatePoint.x - (((size.width / scale) - (size.width / zoomFactor)) / 2);
                translatePointY = translatePoint.y - (((size.height / scale) - (size.height / zoomFactor)) / 2);
                var currentHeight = Math.abs(map.baseMapRectBounds['max']['y'] - map.baseMapRectBounds['min']['y']) * zoomFactor;
                translatePointX = (currentHeight < map.mapAreaRect.height) ? (size.x + ((-(min['x'])) + ((size.width / 2) - (mapWidth / 2))))
                    : translatePointX;
                translatePointY = (currentHeight < map.mapAreaRect.height) ? (size.y + ((-(min['y'])) + ((size.height / 2) - (mapHeight / 2))))
                    : translatePointY;
                map.translatePoint = new Point(translatePointX, translatePointY);
            }
            map.zoomTranslatePoint = map.translatePoint;
            map.scale = zoomFactor;
            if (this.triggerZoomEvent(prevTilePoint, prevLevel, type)) {
                map.translatePoint = map.zoomTranslatePoint = map.previousPoint;
                map.scale = map.previousScale;
            }
            else {
                this.applyTransform(map, false, true);
            }
        }
        else if ((map.isTileMap) && ((zoomFactor >= minZoom && zoomFactor <= maxZoom) || map.isReset)) {
            var tileZoomFactor = prevLevel < minZoom && !map.isReset ? minZoom : zoomFactor;
            map.scale = Math.pow(2, tileZoomFactor - 1);
            map.tileZoomLevel = tileZoomFactor;
            if (map.previousScale !== map.scale || map.isReset) {
                map.zoomSettings.zoomFactor = zoomFactor;
                var position = { x: map.availableSize.width / 2, y: map.availableSize.height / 2 };
                this.getTileTranslatePosition(prevLevel, tileZoomFactor, position, type);
                if (map.zoomSettings.resetToInitial && map.applyZoomReset && type === 'Reset' || (type === 'ZoomOut' && map.zoomSettings.resetToInitial && map.applyZoomReset && tileZoomFactor <= map.initialZoomLevel)) {
                    map.initialCheck = true;
                    map.zoomPersistence = false;
                    map.tileTranslatePoint.x = map.initialTileTranslate.x;
                    map.tileTranslatePoint.y = map.initialTileTranslate.y;
                    tileZoomFactor = map.tileZoomLevel = map.mapScaleValue = map.initialZoomLevel;
                }
                if (this.triggerZoomEvent(prevTilePoint, prevLevel, type)) {
                    map.translatePoint = map.tileTranslatePoint = new Point(0, 0);
                    map.scale = map.previousScale;
                    map.tileZoomLevel = prevLevel;
                    map.zoomSettings.zoomFactor = map.previousScale;
                }
                else {
                    map.translatePoint.y = (map.tileTranslatePoint.y - (0.01 * map.mapScaleValue)) / map.scale;
                    map.translatePoint.x = (map.tileTranslatePoint.x - (0.01 * map.mapScaleValue)) / map.scale;
                    if (document.getElementById(this.maps.element.id + '_LayerIndex_1')) {
                        document.getElementById(this.maps.element.id + '_LayerIndex_1').style.display = 'none';
                    }
                    if (document.querySelector('.GroupElement')) {
                        document.querySelector('.GroupElement').style.display = 'none';
                    }
                    this.markerLineAnimation(map);
                    map.mapLayerPanel.generateTiles(tileZoomFactor, map.tileTranslatePoint, type);
                    var animationDuration = this.maps.layersCollection[0].animationDuration === 0 && animationMode === 'Enable' ? 1000 : this.maps.layersCollection[0].animationDuration;
                    setTimeout(function () {
                        if (type === 'ZoomOut' || type === 'Reset') {
                            // element1.removeChild(element1.children[element1.childElementCount - 1]);
                            // element1.childElementCount ? element1.removeChild(element1.children[element1.childElementCount - 1]) : element1;
                        }
                        _this.applyTransform(_this.maps, false, true);
                        if (document.getElementById(_this.maps.element.id + '_LayerIndex_1')) {
                            document.getElementById(_this.maps.element.id + '_LayerIndex_1').style.display = 'block';
                        }
                        _this.maps.isAddLayer = false;
                    }, animationDuration);
                }
            }
            this.maps.zoomNotApplied = false;
        }
        this.triggerZoomComplete(map, prevLevel, type);
    };
    /**
     * @returns {void}
     * @private
     */
    Zoom.prototype.createZoomingToolbars = function () {
        var map = this.maps;
        this.toolBarGroup = map.renderer.createGroup({
            id: map.element.id + '_Zooming_KitCollection',
            opacity: map.theme.toLowerCase() === 'fluentdark' ? 0.6 : 0.3
        });
        var xSpacing = 15;
        var ySpacing = 15;
        var toolbar = map.zoomSettings.toolbarSettings;
        var button = map.zoomSettings.toolbarSettings.buttonSettings;
        this.maps.toolbarProperties = {
            toolBarOrientation: toolbar.orientation,
            highlightColor: button.highlightColor,
            selectionColor: button.selectionColor,
            horizontalAlignment: toolbar.horizontalAlignment,
            verticalAlignment: toolbar.verticalAlignment,
            color: button.color,
            shapeOpacity: button.opacity,
            borderOpacity: button.borderOpacity
        };
        var buttonRadius = button.radius || map.themeStyle.zoomButtonRadius;
        var cx = buttonRadius / 4;
        var cy = buttonRadius / 4;
        var radius = buttonRadius / 2;
        var padding = button.padding;
        var orientation = this.maps.toolbarProperties.toolBarOrientation;
        var toolbarCollection = map.zoomSettings.toolbarSettings.buttonSettings.toolbarItems.map(function (value) { return value; });
        xSpacing = (buttonRadius / 4) + (button.borderWidth / 2) + padding;
        ySpacing = (buttonRadius / 4) + (button.borderWidth / 2) + padding;
        var shadowElement = '<filter id="chart_shadow" height="130%"><feGaussianBlur in="SourceAlpha" stdDeviation="5"/>';
        shadowElement += '<feOffset dx="-3" dy="4" result="offsetblur"/><feComponentTransfer><feFuncA type="linear" slope="1"/>';
        shadowElement += '</feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>';
        var toolBarLength = toolbarCollection.length;
        var toolWidth = (orientation === 'Horizontal') ? ((toolBarLength * buttonRadius) + (toolBarLength * padding) + padding + (toolBarLength * button.borderWidth)) : (buttonRadius + button.borderWidth + (2 * padding));
        var toolHeight = (orientation === 'Horizontal') ? (buttonRadius + button.borderWidth + (2 * padding)) : ((toolBarLength * buttonRadius) + (toolBarLength * padding) + padding + (toolBarLength * button.borderWidth));
        var defElement = map.renderer.createDefs();
        defElement.innerHTML = shadowElement;
        this.toolBarGroup.appendChild(defElement);
        var outerElement = map.renderer.drawRectangle(new RectOption(map.element.id + '_Zooming_Rect', toolbar.backgroundColor, { color: toolbar.borderColor, width: toolbar.borderWidth, opacity: toolbar.borderOpacity }, toolbar.borderOpacity, new Rect((toolbar.borderWidth / 2), (toolbar.borderWidth / 2), (toolWidth - toolbar.borderWidth), (toolHeight - toolbar.borderWidth)), 0, 0));
        this.toolBarGroup.appendChild(outerElement);
        var scaleX = (buttonRadius - (button.borderWidth / 2)) / 30;
        for (var i = 0; i < toolbarCollection.length; i++) {
            if (i !== 0) {
                xSpacing = (map.toolbarProperties.toolBarOrientation === 'Horizontal') ? (xSpacing + (buttonRadius + padding) + button.borderWidth) : xSpacing;
                ySpacing = (map.toolbarProperties.toolBarOrientation === 'Horizontal') ? ySpacing : (ySpacing + (buttonRadius + padding) + button.borderWidth);
            }
            var toolbar_1 = toolbarCollection[i];
            var pathStroke = !isNullOrUndefined(this.maps.toolbarProperties.color) ? this.maps.toolbarProperties.color : this.maps.themeStyle.zoomFillColor;
            var borderColor = button.borderColor || (this.maps.themeStyle.zoomBorderColor || this.maps.themeStyle.zoomFillColor);
            this.currentToolbarEle = map.renderer.createGroup({
                id: map.element.id + '_Zooming_ToolBar_' + toolbar_1 + '_Group',
                transform: 'translate( ' + xSpacing + ' ' + ySpacing + ' ) '
            });
            this.currentToolbarEle.setAttribute('class', 'e-maps-toolbar');
            this.currentToolbarEle.appendChild(map.renderer.drawCircle(new CircleOption(map.element.id + '_Zooming_ToolBar_' + toolbar_1 + '_Rect', button.fill, { color: borderColor, width: button.borderWidth, opacity: button.borderOpacity }, button.opacity, cx, cy, radius, '')));
            var opacity = 1;
            var direction = '';
            var fill = button.fill;
            this.selectionColor = this.maps.toolbarProperties.selectionColor || this.maps.themeStyle.zoomSelectionColor;
            switch (toolbar_1.toLowerCase()) {
                case 'zoom': {
                    var fillColor = void 0;
                    var strokeColor = void 0;
                    direction = 'M0.001,14.629L1.372,16l4.571-4.571v-0.685l0.228-0.274c1.051,0.868,2.423,1.417,3.885,1.417c3.291,0,';
                    direction += '5.943-2.651,5.943-5.943S13.395,0,10.103,0S4.16,2.651,4.16,5.943c0,1.508,0.503,2.834,1.417,3.885l-0.274,0.228H4.571';
                    direction = direction + 'L0.001,14.629L0.001,14.629z M5.943,5.943c0-2.285,1.828-4.114,4.114-4.114s4.114,1.828,4.114,';
                    this.currentToolbarEle.setAttribute('class', (this.maps.zoomSettings.enableSelectionZooming ? 'e-maps-toolbar' : ''));
                    if (this.maps.zoomSettings.enablePanning && !this.maps.zoomSettings.enableSelectionZooming) {
                        fillColor = fill;
                        strokeColor = pathStroke;
                    }
                    else if (this.maps.zoomSettings.enablePanning && this.maps.zoomSettings.enableSelectionZooming) {
                        fillColor = fill;
                        strokeColor = pathStroke;
                    }
                    else if (!this.maps.zoomSettings.enablePanning && !this.maps.zoomSettings.enableSelectionZooming) {
                        fillColor = fill;
                        strokeColor = pathStroke;
                    }
                    else if (!this.maps.zoomSettings.enablePanning && this.maps.zoomSettings.enableSelectionZooming) {
                        fillColor = this.maps.themeStyle.zoomFillColor;
                        strokeColor = pathStroke;
                    }
                    else {
                        fillColor = this.selectionColor;
                        strokeColor = this.selectionColor;
                    }
                    var zoomPath = map.renderer.drawPath(new PathOption(map.element.id + '_Zooming_ToolBar_' + toolbar_1, fillColor, 1, strokeColor, opacity, opacity, null, direction + '4.114s-1.828,4.114-4.114,4.114S5.943,8.229,5.943,5.943z'));
                    zoomPath.setAttribute('transform', 'scale( ' + scaleX + ',' + scaleX + ' )');
                    this.currentToolbarEle.appendChild(zoomPath);
                    this.zoomElements = this.currentToolbarEle;
                    this.wireEvents(this.currentToolbarEle, this.performToolBarAction);
                    break;
                }
                case 'zoomin':
                    direction = 'M 8, 0 L 8, 16 M 0, 8 L 16, 8';
                    /* eslint-disable no-case-declarations */
                    var zoomInPath = map.renderer.drawPath(new PathOption(map.element.id + '_Zooming_ToolBar_' + toolbar_1 + '_Path', fill, 3, pathStroke, 1, 1, null, direction));
                    /* eslint-enable no-case-declarations */
                    zoomInPath.setAttribute('transform', 'scale( ' + scaleX + ',' + scaleX + ' )');
                    this.currentToolbarEle.appendChild(zoomInPath);
                    this.wireEvents(this.currentToolbarEle, this.performToolBarAction);
                    break;
                case 'zoomout':
                    direction = 'M 0, 8 L 16, 8';
                    /* eslint-disable no-case-declarations */
                    var zoomOutPath = map.renderer.drawPath(new PathOption(map.element.id + '_Zooming_ToolBar_' + toolbar_1, fill, 3, pathStroke, 1, 1, null, direction));
                    /* eslint-enable no-case-declarations */
                    zoomOutPath.setAttribute('transform', 'scale( ' + scaleX + ',' + scaleX + ' )');
                    this.currentToolbarEle.appendChild(zoomOutPath);
                    this.wireEvents(this.currentToolbarEle, this.performToolBarAction);
                    break;
                case 'pan': {
                    var color = void 0;
                    direction = 'M5,3h2.3L7.275,5.875h1.4L8.65,3H11L8,0L5,3z M3,11V8.7l2.875,0.025v-1.4L3,7.35V5L0,8L3,';
                    direction += '11z M11,13H8.7l0.025-2.875h-1.4L7.35,13H5l3,3L11,13z M13,5v2.3l-2.875-0.025v1.4L13,8.65V11l3-3L13,5z';
                    this.currentToolbarEle.setAttribute('class', (this.maps.zoomSettings.enablePanning ? 'e-maps-toolbar' : ''));
                    if (this.maps.zoomSettings.enablePanning && this.maps.zoomModule.isDragZoom) {
                        color = this.selectionColor || this.maps.themeStyle.zoomFillColor;
                    }
                    else if (!this.maps.zoomSettings.enablePanning) {
                        color = this.selectionColor || this.maps.themeStyle.zoomFillColor;
                        this.currentToolbarEle.setAttribute('class', '');
                    }
                    else {
                        color = fill || this.maps.themeStyle.zoomFillColor;
                    }
                    var panPath = map.renderer.drawPath(new PathOption(map.element.id + '_Zooming_ToolBar_' + toolbar_1, color, 1, pathStroke, opacity, opacity, null, direction));
                    panPath.setAttribute('transform', 'scale( ' + scaleX + ',' + scaleX + ' )');
                    this.currentToolbarEle.appendChild(panPath);
                    this.panColor = color;
                    this.panElements = this.currentToolbarEle;
                    this.wireEvents(this.currentToolbarEle, this.performToolBarAction);
                    break;
                }
                case 'reset':
                    direction = 'M12.364,8h-2.182l2.909,3.25L16,8h-2.182c0-3.575-2.618-6.5-5.818-6.5c-1.128,0-2.218,0.366-3.091,';
                    direction += '1.016l1.055,1.178C6.581,3.328,7.272,3.125,8,3.125C10.4,3.125,12.363,5.319,12.364,8L12.364,8z M11.091,';
                    direction += '13.484l-1.055-1.178C9.419,12.672,8.728,12.875,8,12.875c-2.4,0-4.364-2.194-4.364-4.875h2.182L2.909,4.75L0,8h2.182c0,';
                    /* eslint-disable no-case-declarations */
                    var resetPath = map.renderer.drawPath(new PathOption(map.element.id + '_Zooming_ToolBar_' + toolbar_1, fill, null, pathStroke, 1, 1, null, direction + '3.575,2.618,6.5,5.818,6.5C9.128,14.5,10.219,14.134,11.091,13.484L11.091,13.484z'));
                    /* eslint-enable no-case-declarations */
                    resetPath.setAttribute('transform', 'scale( ' + scaleX + ',' + scaleX + ' )');
                    this.currentToolbarEle.appendChild(resetPath);
                    this.wireEvents(this.currentToolbarEle, this.performToolBarAction);
                    break;
            }
            this.toolBarGroup.appendChild(this.currentToolbarEle);
        }
    };
    /**
     * @param {PointerEvent} e - Specifies the event in the map
     * @returns {void}
     * @private
     */
    Zoom.prototype.performToolBarAction = function (e) {
        var target = e.target;
        e.stopImmediatePropagation();
        var isTouch = e.pointerType === 'touch' || e.pointerType === '2' || (e.type.indexOf('touch') > -1);
        var toolbar = target.id.split('_Zooming_ToolBar_')[1].split('_')[0];
        var isToolbarPerform = true;
        switch (toolbar.toLowerCase()) {
            case 'zoomin':
                isToolbarPerform = (this.maps.isTileMap ? this.maps.tileZoomLevel : this.maps.scale) + 1 <= this.maps.zoomSettings.maxZoom;
                break;
            case 'zoomout':
                /* eslint-disable no-case-declarations */
                var scaleValue = this.maps.isTileMap ? this.maps.tileZoomLevel : this.maps.scale;
                /* eslint-enable no-case-declarations */
                isToolbarPerform = (this.maps.projectionType === 'Miller' || this.maps.projectionType === 'Winkel3' ||
                    this.maps.projectionType === 'AitOff') ? Math.round(scaleValue) - 1 >= this.maps.zoomSettings.minZoom :
                    (scaleValue) - 1 >= this.maps.zoomSettings.minZoom;
                break;
            case 'reset':
                isToolbarPerform = Math.round(this.maps.isTileMap ? this.maps.tileZoomLevel : this.maps.scale) !== this.maps.zoomSettings.minZoom;
                break;
        }
        if (isTouch && isToolbarPerform) {
            this.handled = true;
            this.performZoomingByToolBar(toolbar);
        }
        else if ((e.type === 'mousedown' || e.type === 'pointerdown') && !this.handled && isToolbarPerform) {
            this.handled = false;
            this.performZoomingByToolBar(toolbar);
        }
        else {
            this.handled = false;
        }
    };
    /**
     * @param {string} type - Specifies the type.
     * @returns {void}
     * @private
     */
    Zoom.prototype.performZoomingByToolBar = function (type) {
        var map = this.maps;
        map.isReset = false;
        var scale = 0;
        var stateColor = this.fillColor || this.maps.themeStyle.zoomFillColor;
        switch (type.toLowerCase()) {
            case 'zoom':
                this.panColor = stateColor;
                this.zoomColor = this.maps.zoomSettings.enableSelectionZooming ? this.selectionColor : stateColor;
                this.applySelection(this.zoomElements, this.zoomColor);
                this.applySelection(this.panElements, this.panColor);
                this.isPan = false;
                this.isZoomSelection = this.maps.zoomSettings.enableSelectionZooming;
                break;
            case 'pan':
                this.panColor = this.maps.zoomSettings.enablePanning ? this.selectionColor : stateColor;
                this.zoomColor = stateColor;
                if (!this.maps.zoomSettings.enablePanning) {
                    this.applySelection(this.zoomElements, this.selectionColor);
                    this.applySelection(this.panElements, this.panColor);
                }
                else {
                    this.applySelection(this.zoomElements, (this.fillColor || stateColor));
                    this.applySelection(this.panElements, this.panColor);
                }
                this.isPan = this.maps.zoomSettings.enablePanning;
                this.isZoomSelection = false;
                break;
            case 'zoomin':
                map.staticMapZoom = map.tileZoomLevel;
                if (map.staticMapZoom > 0 && map.staticMapZoom < map.zoomSettings.maxZoom) {
                    map.staticMapZoom += 1;
                }
                if (map.isTileMap && map.tileZoomLevel >= map.zoomSettings.minZoom && map.tileZoomLevel < map.zoomSettings.maxZoom) {
                    this.toolBarZooming(map.tileZoomLevel + 1, 'ZoomIn');
                }
                else if (!map.isTileMap) {
                    this.toolBarZooming(map.scale + 1, 'ZoomIn');
                }
                scale = this.maps.isTileMap ? Math.round(this.maps.tileZoomLevel) : Math.round(this.maps.mapScaleValue);
                if (!this.isZoomSelection) {
                    if (scale === map.zoomSettings.maxZoom || scale > 1 || (scale === 1 && this.maps.isTileMap)) {
                        this.applySelection(this.zoomElements, stateColor);
                        this.applySelection(this.panElements, map.zoomSettings.enablePanning ? this.selectionColor : stateColor);
                    }
                    else if (scale === 1 && !this.maps.isTileMap) {
                        this.applySelection(this.zoomElements, stateColor);
                        this.applySelection(this.panElements, stateColor);
                    }
                }
                break;
            case 'zoomout':
                map.staticMapZoom = map.tileZoomLevel;
                map.markerCenterLatitude = null;
                map.markerCenterLongitude = null;
                this.toolBarZooming((map.isTileMap ? map.tileZoomLevel : map.scale) - 1, 'ZoomOut');
                scale = this.maps.isTileMap ? Math.round(this.maps.tileZoomLevel) : Math.round(this.maps.mapScaleValue);
                if (!this.isPan && this.isZoomSelection) {
                    this.panColor = stateColor;
                    this.zoomColor = this.selectionColor;
                    this.applySelection(this.zoomElements, this.selectionColor);
                    this.applySelection(this.panElements, this.panColor);
                }
                else {
                    if (scale <= 1 && !map.isTileMap) {
                        this.applySelection(this.panElements, stateColor);
                    }
                    else {
                        this.applySelection(this.panElements, map.zoomSettings.enablePanning ? this.selectionColor : stateColor);
                    }
                }
                break;
            case 'reset':
                map.staticMapZoom = map.zoomSettings.enable ? map.zoomSettings.zoomFactor : 0;
                map.markerCenterLatitude = null;
                map.markerCenterLongitude = null;
                this.isZoomSelection = false;
                this.isPan = map.zoomSettings.enablePanning;
                this.toolBarZooming(map.zoomSettings.minZoom, 'Reset');
                if ((this.isPan && !this.isZoomSelection) || (!this.isPan && this.isZoomSelection)) {
                    if (!this.maps.zoomSettings.enablePanning) {
                        this.applySelection(this.zoomElements, this.selectionColor);
                        this.applySelection(this.panElements, stateColor);
                    }
                    else {
                        this.applySelection(this.zoomElements, stateColor);
                        this.applySelection(this.panElements, this.selectionColor);
                    }
                }
                else if (!this.isPan && !this.isZoomSelection) {
                    this.applySelection(this.zoomElements, stateColor);
                    this.applySelection(this.panElements, stateColor);
                }
        }
        this.panningStyle(type.toLowerCase());
    };
    Zoom.prototype.panningStyle = function (toolbar) {
        var svg = getElementByID(this.maps.element.id + '_svg');
        if (toolbar === 'pan' || (this.isPanModeEnabled && toolbar !== 'reset')) {
            svg.setAttribute('class', 'e-maps-panning');
        }
        else {
            svg.setAttribute('class', '');
        }
    };
    Zoom.prototype.applySelection = function (elements, color) {
        if (!elements) {
            return;
        }
        var childElement;
        for (var i = 0; i < elements.childElementCount; i++) {
            childElement = elements.childNodes[i];
            if (childElement.tagName !== 'circle') {
                childElement.setAttribute('fill', (elements.id.indexOf('Pan') > -1 ? color : 'transparent'));
                childElement.setAttribute('stroke', color);
            }
        }
    };
    /**
     * @param {PointerEvent} e - Specifies the event in the map
     * @returns {void}
     * @private
     */
    Zoom.prototype.showTooltip = function (e) {
        var text = e.target.id.split('_Zooming_ToolBar_')[1].split('_')[0];
        var tooltip = this.maps.zoomSettings.toolbarSettings.tooltipSettings;
        var tooltipSettings = {
            visible: tooltip.visible,
            fill: tooltip.fill,
            borderOpacity: tooltip.borderOpacity,
            borderWidth: tooltip.borderWidth,
            borderColor: tooltip.borderColor,
            fontColor: tooltip.fontColor,
            fontFamily: tooltip.fontFamily,
            fontStyle: tooltip.fontStyle,
            fontWeight: tooltip.fontWeight,
            fontSize: tooltip.fontSize || '10px',
            fontOpacity: tooltip.fontOpacity
        };
        tooltipSettings.fontFamily = this.maps.themeStyle.fontFamily;
        if (!this.isTouch) {
            createTooltip('EJ2_Map_Toolbar_Tip', this.maps.getLocalizedLabel(text), (e.pageY + 10), (e.pageX + 10), tooltipSettings);
            if (this.maps.isDevice) {
                clearTimeout(this.clearTimeout);
                this.clearTimeout = setTimeout(this.removeTooltip.bind(this), 2000);
            }
        }
    };
    /**
     * @returns {void}
     * @private
     */
    Zoom.prototype.removeTooltip = function () {
        if (getElementByID('EJ2_Map_Toolbar_Tip')) {
            remove(getElementByID('EJ2_Map_Toolbar_Tip'));
        }
    };
    /**
     * @returns {void}
     * @private
     */
    Zoom.prototype.alignToolBar = function () {
        var map = this.maps;
        var padding = 10;
        var element = createElement('div', { id: map.element.id + '_ToolBar' });
        element.style.cssText = 'position:absolute;z-index:2';
        var rectSVGObject = map.renderer.createSvg({
            id: map.element.id + '_Zooming_ToolBar', width: 10, height: 10
        });
        rectSVGObject.appendChild(this.toolBarGroup);
        element.appendChild(rectSVGObject);
        if (getElementByID(map.element.id + '_Secondary_Element')) {
            getElementByID(map.element.id + '_Secondary_Element').appendChild(element);
        }
        var toolBarSize = this.toolBarGroup.getBoundingClientRect();
        rectSVGObject.setAttribute('height', (toolBarSize.height + map.zoomSettings.toolbarSettings.borderWidth).toString());
        rectSVGObject.setAttribute('width', (toolBarSize.width + map.zoomSettings.toolbarSettings.borderWidth).toString());
        var size = !isNullOrUndefined(map.totalRect) ? map.totalRect : map.mapAreaRect;
        var x = 0;
        var y = 0;
        switch (map.toolbarProperties.verticalAlignment) {
            case 'Near':
                y = size.y;
                break;
            case 'Center':
                y = (size.height / 2) - (toolBarSize.height / 2);
                break;
            case 'Far':
                y = (size.height - toolBarSize.height) - padding;
                break;
        }
        switch (map.toolbarProperties.horizontalAlignment) {
            case 'Near':
                x = size.x;
                break;
            case 'Center':
                x = (size.width / 2) - (toolBarSize.width / 2);
                break;
            case 'Far':
                if (!isNullOrUndefined(map.legendModule) && map.legendSettings.position === 'Left') {
                    x = size.width + size.x - toolBarSize.width - padding;
                }
                else {
                    x = (size.width - toolBarSize.width) - padding;
                }
                break;
        }
        element.style.left = x + 'px';
        element.style.top = y + 'px';
        var color = this.maps.toolbarProperties.highlightColor || this.maps.themeStyle.zoomSelectionColor;
        var css = ' .e-maps-toolbar:hover > circle { stroke:' + color + '; } .e-maps-toolbar:hover > path { fill: ' + color + ' ;  stroke: ' + color + '; }' +
            '.e-maps-toolbar:hover { cursor: pointer; } .e-maps-cursor-disable:hover { cursor: not-allowed; } .e-maps-panning:hover { cursor: pointer; } ' +
            '.e-maps-popup-close { display: block; opacity: 0; }';
        var style = document.createElement('style');
        style.appendChild(document.createTextNode(css));
        element.appendChild(style);
    };
    /**
     * @param {number} factor - Specifies the factor for toolbar
     * @param {string} id - Specifies the id
     * @returns {void}
     * @private
     */
    Zoom.prototype.removeToolbarOpacity = function (factor, id) {
        if (!isNullOrUndefined(this.maps) && this.maps.zoomModule && this.maps.zoomSettings.enable) {
            if (getElementByID(this.maps.element.id + '_Zooming_KitCollection') && id.indexOf(this.maps.element.id + '_Zooming_') > -1) {
                if (this.maps.isDevice) {
                    getElementByID(this.maps.element.id + '_Zooming_KitCollection').setAttribute('opacity', '1');
                    this.removeToolbarClass('', '', '', '', '');
                }
                else {
                    this.removeToolbarClass(this.maps.zoomSettings.enableSelectionZooming ? 'e-maps-toolbar' : '', 'e-maps-toolbar', 'e-maps-toolbar', this.maps.zoomSettings.enablePanning ? 'e-maps-toolbar' : '', 'e-maps-toolbar');
                }
                var toolbarShapeOpacity = this.maps.toolbarProperties.shapeOpacity;
                var toolbarButtonOpacity = this.maps.toolbarProperties.borderOpacity;
                if (this.maps.isTileMap && (factor <= 1.1 || this.maps.zoomSettings.minZoom === factor)) {
                    if (!this.maps.isDevice) {
                        this.removeToolbarClass(this.maps.zoomSettings.enableSelectionZooming ? 'e-maps-toolbar' : '', 'e-maps-toolbar', '', this.maps.zoomSettings.enablePanning ? 'e-maps-toolbar' : '', '');
                    }
                    if (this.maps.zoomSettings.enablePanning) {
                        this.removePanColor(this.maps.toolbarProperties.selectionColor || this.maps.themeStyle.zoomSelectionColor);
                    }
                    if (this.isZoomSelection && this.maps.zoomSettings.enableSelectionZooming && !this.maps.isReset) {
                        this.removeZoomColor(this.maps.toolbarProperties.selectionColor || this.maps.themeStyle.zoomSelectionColor);
                        this.removePanColor(this.maps.toolbarProperties.color || this.maps.themeStyle.zoomFillColor);
                    }
                    this.removeZoomOpacity((this.maps.zoomSettings.enableSelectionZooming ? toolbarShapeOpacity : 0.3), (this.maps.zoomSettings.enableSelectionZooming ? toolbarButtonOpacity : 0.3), toolbarShapeOpacity, toolbarButtonOpacity, 0.3, 0.3, (this.maps.zoomSettings.enablePanning ? toolbarShapeOpacity : 0.3), (this.maps.zoomSettings.enablePanning ? toolbarButtonOpacity : 0.3), 0.3, 0.3);
                }
                else if ((factor <= 1.1 || this.maps.zoomSettings.minZoom === factor)) {
                    if (!this.maps.isDevice) {
                        this.removeToolbarClass(this.maps.zoomSettings.enableSelectionZooming ? 'e-maps-toolbar' : '', 'e-maps-toolbar', '', '', '');
                    }
                    if (!this.isZoomSelection && this.maps.zoomSettings.enablePanning) {
                        this.removePanColor(this.maps.toolbarProperties.color || this.maps.themeStyle.zoomFillColor);
                    }
                    if (this.isZoomSelection && this.maps.zoomSettings.enableSelectionZooming && !this.maps.isReset) {
                        this.removeZoomColor(this.maps.toolbarProperties.selectionColor || this.maps.themeStyle.zoomSelectionColor);
                        this.removePanColor(this.maps.toolbarProperties.color || this.maps.themeStyle.zoomFillColor);
                    }
                    this.removeZoomOpacity((this.maps.zoomSettings.enableSelectionZooming ? toolbarShapeOpacity : 0.3), (this.maps.zoomSettings.enableSelectionZooming ? toolbarButtonOpacity : 0.3), toolbarShapeOpacity, toolbarButtonOpacity, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3);
                }
                else if (factor < this.maps.zoomSettings.maxZoom) {
                    if (!this.maps.isDevice) {
                        this.removeToolbarClass(this.maps.zoomSettings.enableSelectionZooming ? 'e-maps-toolbar' : '', 'e-maps-toolbar', 'e-maps-toolbar', this.maps.zoomSettings.enablePanning ? 'e-maps-toolbar' : '', 'e-maps-toolbar');
                    }
                    if (!this.maps.zoomModule.isZoomFinal) {
                        this.removeZoomOpacity((this.maps.zoomSettings.enableSelectionZooming ? toolbarShapeOpacity : 0.3), (this.maps.zoomSettings.enableSelectionZooming ? toolbarButtonOpacity : 0.3), toolbarShapeOpacity, toolbarButtonOpacity, toolbarShapeOpacity, toolbarButtonOpacity, (this.maps.zoomSettings.enablePanning ? toolbarShapeOpacity : 0.3), (this.maps.zoomSettings.enablePanning ? toolbarButtonOpacity : 0.3), toolbarShapeOpacity, toolbarButtonOpacity);
                    }
                    else {
                        this.maps.zoomModule.isZoomFinal = false;
                    }
                    if (this.isZoomSelection && this.maps.zoomSettings.enableSelectionZooming) {
                        this.removeZoomColor(this.maps.toolbarProperties.selectionColor || this.maps.themeStyle.zoomSelectionColor);
                        if (this.maps.zoomModule.isPan && this.maps.zoomSettings.enablePanning) {
                            this.removePanColor(this.maps.toolbarProperties.color || this.maps.themeStyle.zoomFillColor);
                        }
                    }
                    else if (!this.isZoomSelection && this.maps.zoomSettings.enablePanning) {
                        this.removePanColor(this.maps.toolbarProperties.selectionColor || this.maps.themeStyle.zoomSelectionColor);
                        if (this.maps.zoomSettings.enableSelectionZooming) {
                            this.removeZoomColor(this.maps.toolbarProperties.color || this.maps.themeStyle.zoomFillColor);
                        }
                    }
                }
                else {
                    if (!this.maps.isDevice) {
                        this.removeToolbarClass('', '', 'e-maps-toolbar', this.maps.zoomSettings.enablePanning ? 'e-maps-toolbar' : '', 'e-maps-toolbar');
                    }
                    this.removeZoomOpacity(0.3, 0.3, 0.3, 0.3, toolbarShapeOpacity, toolbarButtonOpacity, (this.maps.zoomSettings.enablePanning ? toolbarShapeOpacity : 0.3), (this.maps.zoomSettings.enablePanning ? toolbarButtonOpacity : 0.3), toolbarShapeOpacity, toolbarButtonOpacity);
                    if (this.maps.zoomSettings.enableSelectionZooming) {
                        this.removeZoomColor(this.maps.toolbarProperties.color || this.maps.themeStyle.zoomFillColor);
                    }
                    if (!this.isZoomSelection && this.maps.zoomSettings.enablePanning) {
                        this.removePanColor(this.maps.toolbarProperties.selectionColor || this.maps.themeStyle.zoomSelectionColor);
                    }
                }
            }
            else {
                if (!this.maps.isDevice) {
                    this.removePanColor(this.maps.toolbarProperties.color || this.maps.themeStyle.zoomFillColor);
                    this.removeZoomColor(this.maps.toolbarProperties.color || this.maps.themeStyle.zoomFillColor);
                    this.removeZoomOpacity(1, 1, 1, 1, 1, 1, 1, 1, 1, 1);
                }
            }
        }
    };
    Zoom.prototype.setOpacity = function (circleId, pathId, circleOpacity, pathOpacity) {
        if (getElementByID(this.maps.element.id + circleId)) {
            getElementByID(this.maps.element.id + circleId).setAttribute('stroke-opacity', circleOpacity.toString());
            getElementByID(this.maps.element.id + circleId).setAttribute('fill-opacity', circleOpacity.toString());
            getElementByID(this.maps.element.id + pathId).setAttribute('stroke-opacity', pathOpacity.toString());
            getElementByID(this.maps.element.id + pathId).setAttribute('fill-opacity', pathOpacity.toString());
        }
    };
    Zoom.prototype.removeZoomOpacity = function (zoomOpacity, zoomStrokeOpacity, zoomInOpacity, zoomInStrokeOpacity, zoomOutOpacity, zoomOutStrokeOpacity, panOpacity, panStrokeOpacity, resetOpacity, resetStrokeOpacity) {
        this.setOpacity('_Zooming_ToolBar_Zoom_Rect', '_Zooming_ToolBar_Zoom', zoomStrokeOpacity, zoomOpacity);
        this.setOpacity('_Zooming_ToolBar_ZoomIn_Rect', '_Zooming_ToolBar_ZoomIn_Path', zoomInStrokeOpacity, zoomInOpacity);
        this.setOpacity('_Zooming_ToolBar_ZoomOut_Rect', '_Zooming_ToolBar_ZoomOut', zoomOutStrokeOpacity, zoomOutOpacity);
        this.setOpacity('_Zooming_ToolBar_Pan_Rect', '_Zooming_ToolBar_Pan', panStrokeOpacity, panOpacity);
        this.setOpacity('_Zooming_ToolBar_Reset_Rect', '_Zooming_ToolBar_Reset', resetStrokeOpacity, resetOpacity);
    };
    /**
     * @param {string} zoomClassStyle - Specifies the style for zoom class.
     * @param {string} zoomInClassStyle - Specifies the style for zoom in.
     * @param {string} zoomOutClassStyle - Specifies the style for zoom out.
     * @param {string} panClassStyle -  Specifies the style for pan.
     * @param {string} resetClassStyle - Specifies the style for reset.
     * @returns {void}
     * @private
     */
    Zoom.prototype.removeToolbarClass = function (zoomClassStyle, zoomInClassStyle, zoomOutClassStyle, panClassStyle, resetClassStyle) {
        if (getElementByID(this.maps.element.id + '_Zooming_KitCollection')) {
            if (document.getElementById(this.maps.element.id + '_Zooming_ToolBar_ZoomIn_Group')) {
                getElementByID(this.maps.element.id + '_Zooming_ToolBar_ZoomIn_Group').setAttribute('class', zoomInClassStyle);
            }
            if (document.getElementById(this.maps.element.id + '_Zooming_ToolBar_ZoomOut_Group')) {
                getElementByID(this.maps.element.id + '_Zooming_ToolBar_ZoomOut_Group').setAttribute('class', zoomOutClassStyle);
            }
            if (document.getElementById(this.maps.element.id + '_Zooming_ToolBar_Reset_Group')) {
                getElementByID(this.maps.element.id + '_Zooming_ToolBar_Reset_Group').setAttribute('class', resetClassStyle);
            }
            if (document.getElementById(this.maps.element.id + '_Zooming_ToolBar_Zoom_Group') && this.maps.zoomSettings.enableSelectionZooming) {
                getElementByID(this.maps.element.id + '_Zooming_ToolBar_Zoom_Group').setAttribute('class', zoomClassStyle);
            }
            if (document.getElementById(this.maps.element.id + '_Zooming_ToolBar_Pan_Group') && this.maps.zoomSettings.enablePanning) {
                getElementByID(this.maps.element.id + '_Zooming_ToolBar_Pan_Group').setAttribute('class', panClassStyle);
            }
        }
    };
    Zoom.prototype.removePanColor = function (selectionColor) {
        if (getElementByID(this.maps.element.id + '_Zooming_ToolBar_Pan_Rect') && this.maps.zoomSettings.enablePanning) {
            getElementByID(this.maps.element.id + '_Zooming_ToolBar_Pan').setAttribute('fill', selectionColor);
            getElementByID(this.maps.element.id + '_Zooming_ToolBar_Pan').setAttribute('stroke', selectionColor);
        }
    };
    Zoom.prototype.removeZoomColor = function (selectionColor) {
        if (getElementByID(this.maps.element.id + '_Zooming_ToolBar_Zoom_Rect') && this.maps.zoomSettings.enableSelectionZooming) {
            getElementByID(this.maps.element.id + '_Zooming_ToolBar_Zoom').setAttribute('fill', 'transparent');
            getElementByID(this.maps.element.id + '_Zooming_ToolBar_Zoom').setAttribute('stroke', selectionColor);
        }
    };
    /**
     * To bind events.
     *
     * @param {Element} element - Specifies the element.
     * @param {Function} process - Specifies the process.
     * @returns {void}
     * @private
     */
    Zoom.prototype.wireEvents = function (element, process) {
        EventHandler.add(element, Browser.touchStartEvent, process, this);
        EventHandler.add(element, 'mouseover', this.showTooltip, this);
        EventHandler.add(element, 'mouseout', this.removeTooltip, this);
    };
    /**
     * @param {WheelEvent} e - Specifies the wheel event in the map for zooming
     * @returns {void}
     * @private
     */
    Zoom.prototype.mapMouseWheel = function (e) {
        if (this.maps.zoomSettings.enable && this.maps.zoomSettings.mouseWheelZoom) {
            var map = this.maps;
            map.markerZoomedState = false;
            map.zoomPersistence = map.enablePersistence;
            var position = this.getMousePosition(e.pageX, e.pageY);
            var prevLevel = map.tileZoomLevel;
            var prevScale = map.scale;
            var delta = 1;
            var staticMaxZoomLevel = map.zoomSettings.maxZoom;
            var value = (map.isTileMap) ? prevLevel : prevScale;
            this.maps.mergeCluster();
            if (((position.x > map.mapAreaRect.x) && (position.x < (map.mapAreaRect.x + map.mapAreaRect.width))) &&
                (position.y > map.mapAreaRect.y) && position.y < (map.mapAreaRect.y + map.mapAreaRect.height)) {
                e.preventDefault();
                var direction = (this.browserName === 'mozilla' && !this.isPointer) ?
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    -(e.detail) / 3 > 0 ? 'ZoomIn' : 'ZoomOut' : (e.wheelDelta / 120) > 0 ? 'ZoomIn' : 'ZoomOut';
                if (direction === 'ZoomIn') {
                    map.mapScaleValue = value + delta;
                    if (map.isTileMap) {
                        map.staticMapZoom = map.tileZoomLevel;
                        if (map.staticMapZoom > 0 && map.staticMapZoom < staticMaxZoomLevel) {
                            map.staticMapZoom += 1;
                            this.performZooming(position, (value + delta), direction, true);
                        }
                    }
                    else {
                        this.performZooming(position, (value + delta), direction, true);
                    }
                }
                else {
                    map.mapScaleValue = value - delta;
                    map.isReset = (map.mapScaleValue < 1) ? true : false;
                    map.staticMapZoom = map.tileZoomLevel;
                    if (map.mapScaleValue === 1) {
                        map.markerCenterLatitude = null;
                        map.markerCenterLongitude = null;
                    }
                    if (map.staticMapZoom > 1 && map.staticMapZoom < staticMaxZoomLevel) {
                        map.staticMapZoom -= 1;
                    }
                    this.performZooming(position, (value - delta), direction, true);
                }
            }
            this.removeToolbarOpacity(map.mapScaleValue, (!this.maps.isDevice ? (!isNullOrUndefined(e.target) ? e.target['id'] :
                this.maps.element.id) : this.maps.element.id + '_Zooming_'));
        }
    };
    /**
     * @param {PointerEvent} e - Specifies the event in the map
     * @returns {void}
     * @private
     */
    Zoom.prototype.doubleClick = function (e) {
        var pageX = e.pageX;
        var pageY = e.pageY;
        var tooltipElement = e.target.closest('#' + this.maps.element.id + '_mapsTooltipparent_template');
        if (this.maps.zoomSettings.enable && this.maps.zoomSettings.doubleClickZoom
            && !(e.target['id'].indexOf('_Zooming_') > -1) && isNullOrUndefined(tooltipElement)) {
            var position = this.getMousePosition(pageX, pageY);
            var map = this.maps;
            var prevLevel = map.tileZoomLevel;
            var prevScale = map.scale;
            map.mapScaleValue = map.mapScaleValue + 1;
            var value = (map.isTileMap) ? prevLevel : prevScale;
            if (((position.x > map.mapAreaRect.x) && (position.x < (map.mapAreaRect.x + map.mapAreaRect.width))) &&
                (position.y > map.mapAreaRect.y) && position.y < (map.mapAreaRect.y + map.mapAreaRect.height)) {
                this.performZooming(position, (value + 1), 'ZoomIn');
            }
        }
    };
    /**
     * @param {PointerEvent} e - Specifies the event in the map
     * @returns {void}
     * @private
     */
    Zoom.prototype.mouseDownHandler = function (e) {
        var pageX;
        var pageY;
        var target;
        var touches = null;
        this.isPinchZooming = false;
        //eslint-disable-next-line @typescript-eslint/no-unused-vars
        var element = e.target;
        if (e.type === 'touchstart') {
            this.isTouch = true;
            touches = e.touches;
            target = e.target;
            pageX = touches[0].pageX;
            pageY = touches[0].pageY;
        }
        else {
            pageX = e.pageX;
            pageY = e.pageY;
            //eslint-disable-next-line @typescript-eslint/no-unused-vars
            target = e.target;
        }
        if (!this.isTouch) {
            e.preventDefault();
        }
        if (!this.maps.zoomSettings.enablePanning) {
            this.isPan = this.isPanModeEnabled = this.panColor !== this.selectionColor ? this.maps.zoomSettings.enablePanning
                : this.zoomColor === this.selectionColor;
        }
        else {
            this.isPan = this.isPanModeEnabled = !this.isZoomSelection;
        }
        this.mouseDownLatLong = { x: pageX, y: pageY };
        var scale = this.maps.isTileMap ? Math.round(this.maps.tileZoomLevel) : Math.round(this.maps.mapScaleValue);
        this.rectZoomingStart = ((this.isZoomSelection && scale < this.maps.zoomSettings.maxZoom) && this.maps.zoomSettings.enable);
        this.mouseDownPoints = this.getMousePosition(pageX, pageY);
        if (this.isTouch && touches !== null) {
            this.firstMove = true;
            this.pinchFactor = this.maps.scale;
            this.fingers = touches.length;
        }
        if (this.maps.isTileMap && this.isTouch && e['touches'].length > 1) {
            var startTouch = this.getMousePosition(e['touches'][0].pageX, e['touches'][0].pageY);
            var endTouch = this.getMousePosition(e['touches'][1].pageX, e['touches'][1].pageY);
            this.startDistance = Math.sqrt(Math.pow((startTouch.x - endTouch.x), 2) + Math.pow((startTouch.y - endTouch.y), 2));
            this.touchCenter = { x: (startTouch.x + endTouch.x) / 2, y: (startTouch.y + endTouch.y) / 2 };
            this.pinchStartLatLong = this.maps.pointToLatLong((startTouch.x + endTouch.x) / 2, (startTouch.y + endTouch.y) / 2);
            this.isCancellation = false;
            this.pinchTileZoomScale = this.maps.tileZoomLevel;
            this.pinchDistance = null;
        }
        this.isSingleClick = true;
    };
    /**
     * @param {PointerEvent} e - Specifies the event in the map
     * @returns {void}
     * @private
     */
    Zoom.prototype.mouseMoveHandler = function (e) {
        var pageX;
        var pageY;
        var map = this.maps;
        //eslint-disable-next-line @typescript-eslint/no-unused-vars
        var touchArg;
        var target;
        var touches = null;
        var zoom = this.maps.zoomSettings;
        if (e.type === 'touchmove') {
            this.isTouch = true;
            target = e.target;
            touches = e.touches;
            pageX = touches[0].pageX;
            pageY = touches[0].pageY;
        }
        else {
            pageX = e.pageX;
            pageY = e.pageY;
            target = e.target;
        }
        if (getElementByID(map.element.id + '_Zooming_KitCollection')) {
            if (target.id.indexOf('_Zooming_') > -1) {
                getElementByID(map.element.id + '_Zooming_KitCollection').setAttribute('opacity', '1');
            }
            else if (!map.isDevice) {
                getElementByID(map.element.id + '_Zooming_KitCollection').setAttribute('opacity', map.theme.toLowerCase() === 'fluentdark' ? '0.6' : '0.3');
            }
        }
        if (this.isTouch) {
            if (this.maps.zoomSettings.enable && this.maps.zoomSettings.pinchZooming && touches !== null) {
                if (this.firstMove && touches.length === 2) {
                    this.rectZoomingStart = false;
                    this.updateInteraction();
                    this.touchStartList = targetTouches(e);
                }
                else if (touches.length === 2 && this.touchStartList.length === 2) {
                    this.touchMoveList = targetTouches(e);
                    if (e.cancelable) {
                        e.preventDefault();
                    }
                    this.rectZoomingStart = false;
                    this.performPinchZooming(e);
                }
                this.firstMove = false;
            }
        }
        this.mouseMovePoints = this.getMousePosition(pageX, pageY);
        if (!this.isPinchZooming && (zoom.enable && this.isPanModeEnabled && this.maps.markerDragId.indexOf('_MarkerIndex_') === -1 && ((Browser.isDevice && touches.length >= 1) || !Browser.isDevice))) {
            e.preventDefault();
            this.maps.element.style.cursor = 'pointer';
            this.mouseMoveLatLong = { x: pageX, y: pageY };
            if ((this.mouseDownLatLong['x'] !== this.mouseMoveLatLong['x']) && (this.mouseDownLatLong['y'] !== this.mouseMoveLatLong['y'])) {
                if (this.maps.zoomSettings.enablePanning) {
                    this.panning('None', null, null, e);
                }
                this.mouseDownLatLong['x'] = pageX;
                this.mouseDownLatLong['y'] = pageY;
            }
        }
        if (!this.isPinchZooming && (this.isTouch ? (touches !== null && touches.length === 1 && this.rectZoomingStart) : this.rectZoomingStart)) {
            e.preventDefault();
            var scale = this.maps.isTileMap ? Math.round(this.maps.tileZoomLevel) : Math.round(this.maps.mapScaleValue);
            if (this.maps.zoomSettings.enableSelectionZooming && scale < this.maps.zoomSettings.maxZoom) {
                this.drawZoomRectangle();
            }
            else {
                this.rectZoomingStart = false;
                this.isPan = true;
            }
        }
    };
    /**
     * @param {PointerEvent} e - Specifies the event in the map
     * @returns {void}
     * @private
     */
    Zoom.prototype.mouseUpHandler = function (e) {
        this.rectZoomingStart = false;
        this.isSingleClick = this.isSingleClick ? true : false;
        this.isTouch = false;
        this.touchStartList = [];
        this.touchMoveList = [];
        this.lastScale = 1;
        this.isCancellation = false;
        this.maps.element.style.cursor = 'auto';
        if (this.isPinchZooming && this.maps.isTileMap) {
            this.isPinchZooming = false;
            var tilesParent = document.getElementById(this.maps.element.id + '_tile_parent');
            var svgElement = document.getElementById(this.maps.element.id + '_Tile_SVG_Parent');
            tilesParent.style.transformOrigin = '';
            tilesParent.style.transform = '';
            svgElement.style.transformOrigin = '';
            svgElement.style.transform = '';
            this.maps.tileZoomLevel = this.maps.mapScaleValue = this.maps.zoomSettings.zoomFactor = this.pinchZoomScale;
            this.maps.scale = Math.pow(2, this.pinchZoomScale - 1);
            this.tileZoomLevel = Math.round(this.pinchZoomScale);
            this.getTileTranslate(this.tileZoomLevel);
            this.maps.mapLayerPanel.generateTiles(this.tileZoomLevel, this.maps.tileTranslatePoint);
            this.applyTransform(this.maps);
            if (document.getElementById(this.maps.element.id + '_animates_tiles')) {
                document.getElementById(this.maps.element.id + '_animates_tiles').remove();
            }
        }
        if (this.isPanModeEnabled && this.maps.zoomSettings.enablePanning && !isNullOrUndefined(this.maps.previousPoint) &&
            (!this.maps.isTileMap ? (this.maps.translatePoint.x !== this.maps.previousPoint.x && this.maps.translatePoint.y !== this.maps.previousPoint.y)
                : this.isPanningInProgress)) {
            var pageX = void 0;
            var pageY = void 0;
            var layerX = 0;
            var layerY = 0;
            var target = void 0;
            var element = e.target;
            if (e.type.indexOf('touch') !== -1) {
                var touchArg = e;
                layerX = pageX = touchArg.changedTouches[0].pageX;
                pageY = touchArg.changedTouches[0].pageY;
                layerY = pageY - (this.maps.isTileMap ? 10 : 0);
                target = touchArg.target;
                this.maps.mouseClickEvent = { x: pageX, y: pageY };
            }
            else {
                pageX = e.pageX;
                pageY = e.pageY;
                layerX = e['layerX'];
                layerY = e['layerY'] - (this.maps.isTileMap ? 10 : 0);
                //eslint-disable-next-line @typescript-eslint/no-unused-vars
                target = e.target;
            }
            var panCompleteEventArgs = void 0;
            var minMaxLatitudeLongitude = this.maps.getMinMaxLatitudeLongitude();
            if (!this.maps.isTileMap) {
                this.maps.mouseClickEvent['x'] = this.maps.mouseDownEvent['x'];
                this.maps.mouseClickEvent['y'] = this.maps.mouseDownEvent['y'];
                var location_5 = this.maps.getClickLocation(element.id, pageX, pageY, element, pageX, pageY);
                panCompleteEventArgs = {
                    cancel: false, name: 'panComplete', maps: this.maps,
                    tileTranslatePoint: {}, translatePoint: { previous: this.maps.previousPoint, current: this.maps.translatePoint },
                    scale: this.maps.scale, tileZoomLevel: this.maps.tileZoomLevel, latitude: !isNullOrUndefined(location_5) ?
                        location_5.latitude : 0, longitude: !isNullOrUndefined(location_5) ? location_5.longitude : 0,
                    minLatitude: minMaxLatitudeLongitude.minLatitude, maxLatitude: minMaxLatitudeLongitude.maxLatitude,
                    minLongitude: minMaxLatitudeLongitude.minLongitude, maxLongitude: minMaxLatitudeLongitude.maxLongitude
                };
            }
            else {
                var location_6 = this.maps.getTileGeoLocation(layerX, layerY);
                panCompleteEventArgs = {
                    cancel: false, name: 'panComplete', maps: this.maps,
                    tileTranslatePoint: { previous: this.maps.tileTranslatePoint, current: this.maps.tileTranslatePoint },
                    translatePoint: { previous: this.maps.previousPoint, current: this.maps.translatePoint }, scale: this.maps.scale,
                    tileZoomLevel: this.maps.tileZoomLevel, latitude: location_6.latitude, longitude: location_6.longitude,
                    minLatitude: minMaxLatitudeLongitude.minLatitude, maxLatitude: minMaxLatitudeLongitude.maxLatitude,
                    minLongitude: minMaxLatitudeLongitude.minLongitude, maxLongitude: minMaxLatitudeLongitude.maxLongitude
                };
            }
            this.maps.trigger('panComplete', panCompleteEventArgs);
        }
        this.isPanModeEnabled = false;
        this.isPanningInProgress = false;
        var zoomRectElement = getElementByID(this.maps.element.id + '_Selection_Rect_Zooming');
        if (zoomRectElement && this.maps.zoomSettings.enable && this.maps.zoomSettings.enableSelectionZooming) {
            remove(zoomRectElement);
            this.performRectZooming();
        }
        this.mouseMoveLatLong = { x: 0, y: 0 };
        this.mouseDownLatLong = { x: 0, y: 0 };
        this.pinchDistance = null;
    };
    /**
     * @param {PointerEvent} e - Specifies the event in the map
     * @returns {void}
     * @private
     */
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    Zoom.prototype.mouseCancelHandler = function (e) {
        this.isPanModeEnabled = false;
        this.isTouch = false;
        this.rectZoomingStart = false;
        var zoomRectElement = getElementByID(this.maps.element.id + '_Selection_Rect_Zooming');
        if (zoomRectElement && this.maps.zoomSettings.enable) {
            remove(zoomRectElement);
            this.performRectZooming();
        }
    };
    /**
     * To handle the click event for maps.
     *
     * @param {PointerEvent} e - Specifies the pointer event.
     * @returns {void}
     * @private
     */
    Zoom.prototype.click = function (e) {
        var map = this.maps;
        var tooltipElement = e.target.closest('#' + this.maps.element.id + '_mapsTooltipparent_template');
        if ((map.markerModule && map.markerModule.sameMarkerData.length > 0) ||
            (e.target['id'].indexOf('MarkerIndex') > -1 && e.target['id'].indexOf('cluster') === -1) || !isNullOrUndefined(tooltipElement)) {
            return null;
        }
        if (this.isSingleClick && map.zoomSettings.zoomOnClick && !(e.target['id'].indexOf('_Zooming_') > -1) && !map.zoomSettings.doubleClickZoom
            && (this.zoomColor !== this.selectionColor)) {
            var pageX = e.pageX;
            var pageY = e.pageY;
            var position = this.getMousePosition(pageX, pageY);
            var prevLevel = map.tileZoomLevel;
            var prevScale = map.scale;
            map.mapScaleValue = map.mapScaleValue + 1;
            var value = (map.isTileMap) ? prevLevel : prevScale;
            if (((position.x > map.mapAreaRect.x) && (position.x < (map.mapAreaRect.x + map.mapAreaRect.width))) &&
                (position.y > map.mapAreaRect.y) && position.y < (map.mapAreaRect.y + map.mapAreaRect.height)) {
                this.performZooming(position, (value + 1), 'ZoomIn');
            }
        }
    };
    /**
     * Gets the Mouse Position.
     *
     * @param {number} pageX - Specifies the Page x in map
     * @param {number} pageY - Specifies the Page y in map
     * @returns {Point} - returns the mouse point position
     * @private
     */
    Zoom.prototype.getMousePosition = function (pageX, pageY) {
        var map = this.maps;
        var elementRect = map.element.getBoundingClientRect();
        var pageXOffset = map.element.ownerDocument.defaultView.pageXOffset;
        var pageYOffset = map.element.ownerDocument.defaultView.pageYOffset;
        var clientTop = map.element.ownerDocument.documentElement.clientTop;
        var clientLeft = map.element.ownerDocument.documentElement.clientLeft;
        var positionX = elementRect.left + pageXOffset - clientLeft;
        var positionY = elementRect.top + pageYOffset - clientTop;
        return new Point(Math.abs(pageX - positionX), Math.abs(pageY - positionY));
    };
    /**
     * @returns {void}
     * @private
     */
    Zoom.prototype.addEventListener = function () {
        if (this.maps.isDestroyed) {
            return;
        }
        EventHandler.add(this.maps.element, this.wheelEvent, this.mapMouseWheel, this);
        EventHandler.add(this.maps.element, 'click', this.click, this);
        EventHandler.add(this.maps.element, 'dblclick', this.doubleClick, this);
        this.maps.on(Browser.touchMoveEvent, this.mouseMoveHandler, this);
        this.maps.on(Browser.touchStartEvent, this.mouseDownHandler, this);
        this.maps.on(Browser.touchEndEvent, this.mouseUpHandler, this);
        EventHandler.add(this.maps.element, this.cancelEvent, this.mouseCancelHandler, this);
    };
    /**
     * @returns {void}
     * @private
     */
    Zoom.prototype.removeEventListener = function () {
        if (this.maps.isDestroyed) {
            return;
        }
        EventHandler.remove(this.maps.element, this.wheelEvent, this.mapMouseWheel);
        EventHandler.remove(this.maps.element, 'click', this.click);
        EventHandler.remove(this.maps.element, 'dblclick', this.doubleClick);
        this.maps.off(Browser.touchMoveEvent, this.mouseMoveHandler);
        this.maps.off(Browser.touchStartEvent, this.mouseDownHandler);
        this.maps.off(Browser.touchEndEvent, this.mouseUpHandler);
        EventHandler.remove(this.maps.element, this.cancelEvent, this.mouseCancelHandler);
        var toolbarElement = document.getElementById(this.maps.element.id + '_Zooming_KitCollection');
        if (toolbarElement) {
            for (var i = 0; i < toolbarElement.childNodes.length; i++) {
                if (toolbarElement.childNodes[i].tagName === 'g') {
                    EventHandler.add(toolbarElement.childNodes[i], Browser.touchStartEvent, this.performToolBarAction);
                    EventHandler.add(toolbarElement.childNodes[i], 'mouseover', this.showTooltip);
                    EventHandler.add(toolbarElement.childNodes[i], 'mouseout', this.removeTooltip);
                }
            }
        }
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    Zoom.prototype.getModuleName = function () {
        return 'Zoom';
    };
    /**
     * To destroy the zoom.
     *
     * @returns {void}
     * @private
     */
    Zoom.prototype.destroy = function () {
        this.toolBarGroup = null;
        this.currentToolbarEle = null;
        this.zoomingRect = null;
        this.zoomElements = null;
        this.panElements = null;
        this.baseTranslatePoint = null;
        this.touchStartList = null;
        this.touchMoveList = null;
        this.previousTouchMoveList = null;
        this.mouseDownPoints = null;
        this.mouseMovePoints = null;
        this.startTouches = [];
        this.mouseDownLatLong = null;
        this.mouseMoveLatLong = null;
        this.layerCollectionEle = null;
        this.currentLayer = null;
        this.pinchDistance = null;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (!this.maps.refreshing) {
            this.maps = null;
        }
    };
    return Zoom;
}());
export { Zoom };
