var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Maps Component file
 */
import { Component, NotifyPropertyChanges, Property, Fetch } from '@syncfusion/ej2-base';
import { EventHandler, Browser, isNullOrUndefined, createElement, setValue, extend } from '@syncfusion/ej2-base';
import { Event, remove, L10n, Collection, Internationalization, Complex } from '@syncfusion/ej2-base';
import { SvgRenderer } from '@syncfusion/ej2-svg-base';
import { Size, createSvg, Point, removeElement, triggerShapeEvent, showTooltip, checkShapeDataFields, MapLocation, getMousePosition, calculateSize } from './utils/helper';
import { getElement, removeClass, getTranslate, triggerItemSelectionEvent, mergeSeparateCluster, customizeStyle, querySelector } from './utils/helper';
import { createStyle, getProcessedMarginValue } from './utils/helper';
import { ZoomSettings, LegendSettings } from './model/base';
import { LayerSettings, TitleSettings, Border, Margin, MapsAreaSettings, Annotation, CenterPosition } from './model/base';
import { load, click, onclick, rightClick, doubleClick, resize, shapeSelected, zoomIn, mouseMove } from './model/constants';
import { getThemeStyle, Theme } from './model/theme';
import { LayerPanel } from './layers/layer-panel';
import { Rect, RectOption, measureText, getElementByID, MapAjax, processResult, getElementsByClassName } from '../maps/utils/helper';
import { findPosition, textTrim, TextOption, renderTextElement, calculateZoomLevel, convertTileLatLongToPoint, convertGeoToPoint } from '../maps/utils/helper';
import { Annotations } from '../maps/user-interaction/annotation';
import { MarkerSettings } from './index';
import { changeBorderWidth } from './index';
import { DataManager, Query } from '@syncfusion/ej2-data';
/**
 * Represents the maps control. It is ideal for rendering maps from GeoJSON data or other map providers like OpenStreetMap, Google Maps, Bing Maps, etc that
 * has rich feature set that includes markers, labels, bubbles and much more.
 * ```html
 * <div id="maps"/>
 * <script>
 *   var maps = new Maps();
 *   maps.appendTo("#maps");
 * </script>
 * ```
 */
var Maps = /** @class */ (function (_super) {
    __extends(Maps, _super);
    /**
     * Constructor for creating the widget.
     *
     * @param {MapsModel} options Specifies the options
     * @param {string | HTMLElement} element Specifies the element
     */
    function Maps(options, element) {
        var _this = _super.call(this, options, element) || this;
        /**
         * Check layer whether is geometry or tile.
         *
         * @private
         */
        _this.isTileMap = false;
        /**
         * Resize the map
         *
         * @private
         */
        _this.isResize = false;
        /**
         * @private
         */
        _this.isReset = false;
        /** @private */
        _this.baseSize = new Size(0, 0);
        /** @public */
        _this.translatePoint = new Point(0, 0);
        /** @private */
        _this.baseTranslatePoint = new Point(0, 0);
        /** @public */
        _this.zoomTranslatePoint = new Point(0, 0);
        /** @private */
        _this.markerZoomedState = true;
        /** @private */
        _this.zoomPersistence = false;
        /** @private */
        _this.defaultState = true;
        /** @private */
        _this.centerPositionChanged = false;
        /** @private */
        _this.markerNullCount = 0;
        /** @private */
        _this.tileTranslatePoint = new Point(0, 0);
        /** @private */
        _this.baseTileTranslatePoint = new Point(0, 0);
        /** @private */
        // eslint-disable-next-line @typescript-eslint/ban-types
        _this.isDevice = false;
        /** @private */
        _this.staticMapZoom = _this.zoomSettings.enable ? _this.zoomSettings.zoomFactor : 0;
        /** @private */
        _this.zoomNotApplied = false;
        /** @public */
        _this.dataLabelShape = [];
        _this.zoomShapeCollection = [];
        _this.zoomLabelPositions = [];
        _this.mouseDownEvent = { x: null, y: null };
        _this.mouseClickEvent = { x: null, y: null };
        /** @private */
        _this.selectedElementId = [];
        /** @private */
        _this.selectedMarkerElementId = [];
        /** @private */
        _this.selectedBubbleElementId = [];
        /** @private */
        _this.selectedNavigationElementId = [];
        /** @private */
        _this.selectedPolygonElementId = [];
        /** @private */
        _this.selectedLegendElementId = [];
        /** @private */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        _this.legendSelectionCollection = [];
        /** @private */
        _this.shapeSelections = true;
        /** @private */
        _this.legendSelection = true;
        /** @private */
        _this.toggledLegendId = [];
        /** @private */
        _this.toggledElementId = [];
        /** @private */
        _this.checkInitialRender = true;
        /** @private */
        _this.initialTileTranslate = new Point(0, 0);
        /** @private */
        _this.isMarkerZoomCompleted = false;
        /** @private */
        _this.markerDragId = '';
        /** @private */
        _this.initialCheck = true;
        /** @private */
        _this.applyZoomReset = false;
        /** @private */
        _this.markerClusterExpandCheck = false;
        /** @private */
        _this.markerClusterExpand = false;
        /** @private */
        _this.mouseMoveId = '';
        /** @private */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        _this.shapeSelectionItem = [];
        /** @private */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        _this.markerDragArgument = null;
        setValue('mergePersistData', _this.mergePersistMapsData, _this);
        return _this;
    }
    Object.defineProperty(Maps.prototype, "isShapeSelected", {
        /**
         *
         * Specifies whether the shape is selected in the maps or not.
         *
         * @returns {boolean} - Returns a boolean value to specify whether the shape is selected in the maps or not.
         */
        get: function () {
            return this.mapSelect;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * To manage persist maps data.
     *
     * @returns {void}
     */
    Maps.prototype.mergePersistMapsData = function () {
        var data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var windowData;
        try {
            windowData = window.localStorage;
        }
        catch (e) {
            windowData = null;
        }
        if (!isNullOrUndefined(windowData)) {
            data = window.localStorage.getItem(this.getModuleName() + this.element.id);
        }
        if (!(isNullOrUndefined(data) || (data === ''))) {
            var dataObj = JSON.parse(data);
            var keys = Object.keys(dataObj);
            this.isProtectedOnChange = true;
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                if ((typeof this[key] === 'object') && !isNullOrUndefined(this[key])) {
                    extend(this[key], dataObj[key]);
                }
                else {
                    this[key] = dataObj[key];
                }
            }
            this.isProtectedOnChange = false;
        }
    };
    /**
     * Gets the localized label by locale keyword.
     *
     * @param  {string} key - Specifies the key
     * @returns {string} - Returns the string value
     * @private
     */
    Maps.prototype.getLocalizedLabel = function (key) {
        return this.localeObject.getConstant(key);
    };
    /**
     * Initializing pre-required values.
     *
     * @returns {void}
     */
    Maps.prototype.preRender = function () {
        this.isDevice = Browser.isDevice;
        this.initPrivateVariable();
        this.allowServerDataBinding = false;
        this.unWireEVents();
        this.wireEVents();
        this.setCulture();
    };
    Maps.prototype.renderElements = function () {
        if (!this.isDestroyed) {
            this.trigger(load, { maps: this });
            this.createSVG();
            this.findBaseAndSubLayers();
            if (!isNullOrUndefined(this.markerModule) && this.markerModule.getMapsInstance()) {
                this.markerModule.initializeMarkerClusterList();
            }
            this.createSecondaryElement();
            this.addTabIndex();
            this.themeStyle = getThemeStyle(this.theme);
            this.renderBorder();
            this.renderTitle(this.titleSettings, 'title', null, null);
            this.renderArea();
            this.processRequestJsonData();
            this.renderComplete();
            this.isAddLayer = !this.isTileMap ? false : this.isAddLayer;
        }
    };
    /**
     * To Initialize the control rendering.
     *
     * @returns {void}
     */
    Maps.prototype.render = function () {
        this.renderElements();
    };
    Maps.prototype.processRequestJsonData = function () {
        var _this = this;
        var length = this.layersCollection.length - 1;
        this.serverProcess = { request: 0, response: 0 };
        var queryModule;
        var dataModule;
        Array.prototype.forEach.call(this.layersCollection, function (layer, layerIndex) {
            if (layer.shapeData instanceof DataManager) {
                _this.serverProcess['request']++;
                dataModule = layer.shapeData;
                queryModule = layer.query instanceof Query ? layer.query : new Query();
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var dataManager = dataModule.executeQuery(queryModule);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                dataManager.then(function (e) {
                    _this.processResponseJsonData('DataManager', e, layer, 'ShapeData');
                });
            }
            else if (layer.shapeData instanceof MapAjax || layer.shapeData) {
                if (!isNullOrUndefined(layer.shapeData['dataOptions'])) {
                    _this.processAjaxRequest(layer, layer.shapeData, 'ShapeData');
                }
            }
            if (layer.dataSource instanceof DataManager) {
                _this.serverProcess['request']++;
                dataModule = layer.dataSource;
                queryModule = layer.query instanceof Query ? layer.query : new Query();
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var dataManager = dataModule.executeQuery(queryModule);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                dataManager.then(function (e) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    layer.dataSource = processResult(e);
                });
            }
            if (layer.markerSettings.length > 0) {
                var _loop_1 = function (i) {
                    if (layer.markerSettings[i].dataSource instanceof DataManager) {
                        _this.serverProcess['request']++;
                        dataModule = layer.markerSettings[i].dataSource;
                        queryModule = layer.markerSettings[i].query instanceof Query ?
                            layer.markerSettings[i].query : new Query();
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        var dataManager = dataModule.executeQuery(queryModule);
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        dataManager.then(function (e) {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            layer.markerSettings[i].dataSource = processResult(e);
                        });
                    }
                };
                for (var i = 0; i < layer.markerSettings.length; i++) {
                    _loop_1(i);
                }
            }
            if (layer.bubbleSettings.length > 0) {
                var _loop_2 = function (i) {
                    if (layer.bubbleSettings[i].dataSource instanceof DataManager) {
                        _this.serverProcess['request']++;
                        dataModule = layer.bubbleSettings[i].dataSource;
                        queryModule = layer.bubbleSettings[i].query instanceof Query ?
                            layer.bubbleSettings[i].query : new Query();
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        var dataManager = dataModule.executeQuery(queryModule);
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        dataManager.then(function (e) {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            layer.bubbleSettings[i].dataSource = processResult(e);
                        });
                    }
                };
                for (var i = 0; i < layer.bubbleSettings.length; i++) {
                    _loop_2(i);
                }
            }
            if (layer.dataSource instanceof MapAjax || (!isNullOrUndefined(layer.dataSource) && !isNullOrUndefined(layer.dataSource['dataOptions']))) {
                _this.processAjaxRequest(layer, layer.dataSource, 'DataSource');
            }
            if (_this.serverProcess['request'] === _this.serverProcess['response'] && length === layerIndex) {
                _this.processResponseJsonData(null);
            }
        });
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Maps.prototype.processAjaxRequest = function (layer, localAjax, type) {
        var _this = this;
        this.serverProcess['request']++;
        var fetchApiModule = new Fetch(localAjax.dataOptions, localAjax.type, localAjax.contentType);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fetchApiModule.onSuccess = function (args) {
            if (!isNullOrUndefined(args.type) && args.type === 'application/octet-stream') {
                var reader_1 = new FileReader();
                //eslint-disable-next-line @typescript-eslint/no-this-alias
                var map_1 = _this;
                // eslint-disable-next-line @typescript-eslint/tslint/config
                reader_1.onload = function () {
                    args = JSON.parse(reader_1.result.toString());
                    map_1.processResponseJsonData('Fetch', args, layer, type);
                };
                reader_1.readAsText(args);
            }
            else {
                _this.processResponseJsonData('Fetch', args, layer, type);
            }
        };
        fetchApiModule.send(localAjax.sendData);
    };
    /**
     * This method is used to process the JSON data to render the maps.
     *
     * @param {string} processType - Specifies the process type in maps.
     * @param {any | string} data - Specifies the data for maps.
     * @param {LayerSettings} layer - Specifies the layer for the maps.
     * @param {string} dataType - Specifies the data type for maps.
     * @returns {void}
     * @private
     */
    Maps.prototype.processResponseJsonData = function (processType, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data, layer, dataType) {
        this.serverProcess['response']++;
        if (processType) {
            if (dataType === 'ShapeData') {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                layer.shapeData = (processType === 'DataManager') ? processResult(data) : data;
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                layer.dataSource = (processType === 'DataManager') ? processResult(data) : data;
            }
        }
        if (!isNullOrUndefined(processType) && this.serverProcess['request'] === this.serverProcess['response']) {
            var collection = this.layersCollection;
            this.layersCollection = [];
            for (var i = 0; i < collection.length; i++) {
                if (collection[i].isBaseLayer) {
                    this.layersCollection.push(collection[i]);
                }
            }
            for (var j = 0; j < collection.length; j++) {
                if (!collection[j].isBaseLayer) {
                    this.layersCollection.push(collection[j]);
                }
            }
            this.renderMap();
        }
        else if (isNullOrUndefined(processType)) {
            this.renderMap();
        }
    };
    Maps.prototype.renderMap = function () {
        if (this.legendModule && this.legendSettings.visible) {
            this.legendModule.renderLegend();
        }
        this.createTile();
        if (this.zoomSettings.enable && this.zoomModule) {
            this.zoomModule.createZoomingToolbars();
        }
        if (!isNullOrUndefined(this.dataLabelModule)) {
            this.dataLabelModule.dataLabelCollections = [];
        }
        this.mapLayerPanel.measureLayerPanel();
        if (!isNullOrUndefined(this.svgObject)) {
            this.element.appendChild(this.svgObject);
        }
        this.setSecondaryElementPosition();
        for (var i = 0; i < this.layers.length; i++) {
            if (this.layers[i].selectionSettings && this.layers[i].selectionSettings.enable &&
                this.layers[i].initialShapeSelection.length > 0 && this.checkInitialRender) {
                var checkSelection = this.layers[i].selectionSettings.enableMultiSelect;
                this.layers[i].selectionSettings.enableMultiSelect = checkSelection ? checkSelection : true;
                var shapeSelection = this.layers[i].initialShapeSelection;
                for (var j = 0; j < this.layers[i].initialShapeSelection.length; j++) {
                    this.shapeSelection(i, shapeSelection[j].shapePath, shapeSelection[j].shapeValue, true);
                }
                this.layers[i].selectionSettings.enableMultiSelect = checkSelection;
                if (i === this.layers.length - 1) {
                    this.checkInitialRender = false;
                }
            }
            if (!this.isResize) {
                for (var k = 0; k < this.layers[i].markerSettings.length; k++) {
                    // eslint-disable-next-line max-len
                    if (this.layers[i].markerSettings[k].selectionSettings && this.layers[i].markerSettings[k].selectionSettings.enable
                        && this.layers[i].markerSettings[k].initialMarkerSelection.length > 0) {
                        var markerSelectionValues = this.layers[i].markerSettings[k].initialMarkerSelection;
                        for (var j = 0; j < markerSelectionValues.length; j++) {
                            this.markerInitialSelection(i, k, this.layers[i].markerSettings[k], markerSelectionValues[j].latitude, markerSelectionValues[j].longitude);
                        }
                    }
                }
            }
        }
        if (!isNullOrUndefined(document.getElementById(this.element.id + '_tile_parent'))) {
            var svg = this.svgObject.getBoundingClientRect();
            var element = document.getElementById(this.element.id);
            var tileElement = document.getElementById(this.element.id + '_tile_parent');
            var tileElement1 = document.getElementById(this.element.id + '_tiles');
            var tile = tileElement.getBoundingClientRect();
            var top_1;
            var left = void 0;
            left = parseFloat(tileElement.style.left);
            var bottom = svg.bottom - tile.bottom - element.offsetTop;
            top_1 = parseFloat(tileElement.style.top);
            top_1 = (bottom <= 11) ? top_1 : (!isNullOrUndefined(this.legendModule) && this.legendSettings.position === 'Bottom') ? this.mapAreaRect.y : (top_1 * 2);
            left = (bottom <= 11) ? left : !isNullOrUndefined(this.legendModule) ? left : (left * 2);
            tileElement.style.top = top_1 + 'px';
            tileElement.style.left = left + 'px';
            tileElement1.style.top = top_1 + 'px';
            tileElement1.style.left = left + 'px';
            if (!isNullOrUndefined(this.legendModule) && this.legendModule.totalPages.length > 0) {
                tileElement.style.height = tileElement1.style.height = this.legendModule.legendTotalRect.height + 'px';
                tileElement.style.width = tileElement1.style.width = this.legendModule.legendTotalRect.width + 'px';
            }
        }
        this.arrangeTemplate();
        if (this.annotationsModule) {
            if (this.width !== '0px' && this.height !== '0px' && this.width !== '0%' && this.height !== '0%') {
                this.annotationsModule.renderAnnotationElements();
            }
        }
        this.element.style.outline = 'none';
        this.element.style.position = 'relative';
        for (var i = 0; i < document.getElementsByTagName('path').length - 1; i++) {
            if (document.getElementsByTagName('path')[i].id.indexOf('shapeIndex') > -1) {
                document.getElementsByTagName('path')[i].style.outline = 'none';
            }
        }
        this.zoomingChange();
        if (this.zoomModule && this.isDevice) {
            this.zoomModule.removeToolbarOpacity(this.isTileMap ? Math.round(this.tileZoomLevel) : this.mapScaleValue, this.element.id + '_Zooming_');
        }
        if (!this.isZoomByPosition && !this.zoomNotApplied) {
            this.triggerZoomEvent();
        }
        this.isResize = false;
    };
    Maps.prototype.triggerZoomEvent = function () {
        var loadedArgs;
        var minMaxLatitudeLongitude = this.getMinMaxLatitudeLongitude();
        // eslint-disable-next-line prefer-const
        loadedArgs = {
            maps: this, isResized: this.isResize, minLatitude: minMaxLatitudeLongitude.minLatitude,
            maxLatitude: minMaxLatitudeLongitude.maxLatitude, minLongitude: minMaxLatitudeLongitude.minLongitude,
            maxLongitude: minMaxLatitudeLongitude.maxLongitude, cancel: false, name: 'Loaded'
        };
        this.trigger('loaded', loadedArgs);
        //eslint-enable @typescript-eslint/prefer-const
    };
    /**
     * To apply color to the initial selected marker.
     *
     * @param {SelectionSettingsModel} selectionSettings - Specifies the selection settings
     * @param {Maps} map - Specifies the instance of the maps
     * @param {Element} targetElement - Specifies the target element
     * @param {object} data - Specifies the data
     * @returns {void}
     * @private
     */
    Maps.prototype.markerSelection = function (selectionSettings, map, targetElement, data) {
        var border = {
            color: selectionSettings.border.color,
            width: selectionSettings.border.width / map.scale,
            opacity: selectionSettings.border.opacity
        };
        var markerSelectionProperties = {
            opacity: selectionSettings.opacity,
            fill: selectionSettings.fill,
            border: border,
            target: targetElement.id,
            cancel: false,
            data: data,
            maps: map
        };
        if (!getElement('MarkerselectionMap')) {
            document.body.appendChild(createStyle('MarkerselectionMap', 'MarkerselectionMapStyle', markerSelectionProperties));
        }
        else {
            customizeStyle('MarkerselectionMap', 'MarkerselectionMapStyle', markerSelectionProperties);
        }
        if (this.selectedMarkerElementId.length === 0 || selectionSettings.enableMultiSelect) {
            if (targetElement.tagName === 'g') {
                targetElement.children[0].setAttribute('class', 'MarkerselectionMapStyle');
                this.selectedMarkerElementId.push(targetElement.children[0].id);
            }
            else {
                targetElement.setAttribute('class', 'MarkerselectionMapStyle');
                this.selectedMarkerElementId.push(targetElement.id);
            }
        }
    };
    /**
     * initial selection of marker.
     *
     * @param {number} layerIndex - Specifies the layer index
     * @param {number} markerIndex - Specifies the marker index
     * @param {MarkerSettingsModel} markerSettings - Specifies the marker settings
     * @param {number} latitude - Specifies hte latitude
     * @param {number} longitude - Specifies the longitude
     * @returns {void}
     * @private
     */
    Maps.prototype.markerInitialSelection = function (layerIndex, markerIndex, markerSettings, latitude, longitude) {
        var selectionSettings = markerSettings.selectionSettings;
        if (selectionSettings.enable) {
            for (var i = 0; i < markerSettings.dataSource['length']; i++) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var data = markerSettings.dataSource[i];
                if (data['latitude'] === latitude && data['longitude'] === longitude) {
                    var targetId = this.element.id + '_' + 'LayerIndex_' + layerIndex + '_MarkerIndex_' + markerIndex +
                        '_dataIndex_' + i;
                    this.markerSelection(selectionSettings, this, getElement(targetId), data);
                }
            }
        }
    };
    /**
     * Render the map area border.
     *
     * @returns {void}
     */
    Maps.prototype.renderArea = function () {
        var width = this.mapsArea.border.width;
        var background = this.mapsArea.background;
        if (width > 0 || (background || this.themeStyle.areaBackgroundColor)) {
            var mapBorder = {
                opacity: isNullOrUndefined(this.mapsArea.border.opacity) ? 1 : this.mapsArea.border.opacity,
                color: this.mapsArea.border.color, width: this.mapsArea.border.width
            };
            var rect = new RectOption(this.element.id + '_MapAreaBorder', background || this.themeStyle.areaBackgroundColor, mapBorder, 1, this.mapAreaRect);
            this.svgObject.appendChild(this.renderer.drawRectangle(rect));
        }
    };
    /**
     * To add tab index for map element.
     *
     * @returns {void}
     */
    Maps.prototype.addTabIndex = function () {
        this.element.setAttribute('aria-label', this.description || 'Maps Element');
        this.element.setAttribute('role', 'region');
        this.element.tabIndex = this.tabIndex;
    };
    Maps.prototype.setSecondaryElementPosition = function () {
        var element = getElementByID(this.element.id + '_Secondary_Element');
        var rect = this.element.getBoundingClientRect();
        var svgElement = getElementByID(this.element.id + '_svg');
        if (!isNullOrUndefined(svgElement)) {
            var svgRect = svgElement.getBoundingClientRect();
            element.style.left = Math.max(svgRect.left - rect.left, 0) + 'px';
            element.style.top = Math.max(svgRect.top - rect.top, 0) + 'px';
        }
    };
    Maps.prototype.zoomingChange = function () {
        var left;
        var top;
        if (getElementByID(this.element.id + '_Layer_Collections') && this.zoomModule) {
            this.zoomModule.layerCollectionEle = getElementByID(this.element.id + '_Layer_Collections');
        }
        if (this.isTileMap && getElementByID(this.element.id + '_Tile_SVG') && getElementByID(this.element.id + '_tile_parent')) {
            var tileElement = getElementByID(this.element.id + '_tile_parent');
            var tileSvgElement = getElementByID(this.element.id + '_Tile_SVG');
            var tileSvgParentElement = getElementByID(this.element.id + '_Tile_SVG_Parent');
            var tileRect = tileElement.getBoundingClientRect();
            var tileSvgRect = tileSvgElement.getBoundingClientRect();
            left = (tileRect.left - tileSvgRect.left);
            top = (tileRect.top - tileSvgRect.top);
            tileSvgParentElement.style.left = left + 'px';
            tileSvgParentElement.style.top = top + 'px';
            if (!isNullOrUndefined(this.legendModule) && this.legendModule.totalPages.length > 0) {
                tileElement.style.width = tileSvgElement.style.width =
                    this.legendModule.legendTotalRect.width.toString();
                tileElement.style.height = tileSvgElement.style.height =
                    this.legendModule.legendTotalRect.height.toString();
                tileSvgParentElement.style.width = this.legendModule.legendTotalRect.width + 'px';
                tileSvgParentElement.style.height = this.legendModule.legendTotalRect.height + 'px';
            }
            var markerTemplateElements = document.getElementsByClassName('template');
            if (!isNullOrUndefined(markerTemplateElements) && markerTemplateElements.length > 0) {
                for (var i = 0; i < markerTemplateElements.length; i++) {
                    var templateGroupEle = markerTemplateElements[i];
                    templateGroupEle.style.left = left + 'px';
                    templateGroupEle.style.top = top + 'px';
                }
            }
        }
        if (this.zoomSettings.zoomFactor >= 0) {
            if (this.zoomModule && this.zoomModule.toolBarGroup && this.zoomSettings.enable) {
                this.zoomModule.alignToolBar();
            }
            var elements = document.getElementById(this.element.id + '_Layer_Collections');
            if (!isNullOrUndefined(elements) && elements.childElementCount > 0) {
                for (var i = 0; i < elements.childNodes.length; i++) {
                    var childElement = elements.childNodes[i];
                    if (childElement.tagName === 'g' && childElement.id.indexOf('_Legend_Group') === -1) {
                        var layerIndex = parseFloat(childElement.id.split('_LayerIndex_')[1].split('_')[0]);
                        for (var j = 0; j < childElement.childNodes.length; j++) {
                            var childNode = childElement.childNodes[j];
                            if (!(childNode.id.indexOf('_Markers_Group') > -1) &&
                                (!(childNode.id.indexOf('_bubble_Group') > -1)) &&
                                (!(childNode.id.indexOf('_dataLableIndex_Group') > -1))) {
                                changeBorderWidth(childNode, layerIndex, this.scale, this);
                            }
                        }
                    }
                }
            }
            if (this.zoomModule && ((this.previousScale !== this.scale) || this.zoomNotApplied || this.isZoomByPosition)) {
                this.zoomModule.applyTransform(this, false, true);
            }
        }
    };
    Maps.prototype.createSecondaryElement = function () {
        if (isNullOrUndefined(document.getElementById(this.element.id + '_Secondary_Element'))) {
            var secondaryElement = createElement('div', {
                id: this.element.id + '_Secondary_Element'
            });
            secondaryElement.style.cssText = 'position: relative;z-index:2;';
            this.element.appendChild(secondaryElement);
        }
    };
    /**
     * @returns {void}
     */
    Maps.prototype.getMinMaxLatitudeLongitude = function () {
        var mapsElement = document.getElementById(this.element.id);
        if (!isNullOrUndefined(mapsElement)) {
            var element = mapsElement.getBoundingClientRect();
            var marginLeft = getProcessedMarginValue(this.margin.left);
            var minPosition = this.isTileMap ?
                this.pointToLatLong((this.mapAreaRect.x - marginLeft), -this.mapAreaRect.y) :
                this.getGeoLocation(0, (this.mapAreaRect.x + element.left), this.mapAreaRect.y);
            var maxPosition = this.isTileMap ? this.pointToLatLong(this.mapAreaRect.width, (this.mapAreaRect.height - this.mapAreaRect.y)) :
                this.getGeoLocation(0, (this.mapAreaRect.x + element.left + this.mapAreaRect.width), (this.mapAreaRect.y + this.mapAreaRect.height));
            var MinMaxLatitudeLongitude = {
                minLatitude: minPosition.latitude, maxLatitude: maxPosition.latitude, minLongitude: minPosition.longitude,
                maxLongitude: maxPosition.longitude
            };
            return MinMaxLatitudeLongitude;
        }
        else {
            return { minLatitude: 0, maxLatitude: 0, minLongitude: 0,
                maxLongitude: 0 };
        }
    };
    /**
     * @returns {void}
     * @private
     */
    Maps.prototype.arrangeTemplate = function () {
        var _this = this;
        if (document.getElementById(this.element.id + '_Legend_Border')) {
            document.getElementById(this.element.id + '_Legend_Border').style.pointerEvents = 'none';
        }
        var templateElements = document.getElementsByClassName(this.element.id + '_template');
        if (!isNullOrUndefined(templateElements) && templateElements.length > 0 &&
            getElementByID(this.element.id + '_Layer_Collections') && !this.isTileMap) {
            Array.prototype.forEach.call(templateElements, function (templateGroupEle) {
                var offSetLetValue = 0;
                var offSetTopValue = 0;
                if (!isNullOrUndefined(templateGroupEle) && templateGroupEle.childElementCount > 0) {
                    var layerOffset = getElementByID(_this.element.id + '_Layer_Collections').getBoundingClientRect();
                    var elementOffset = getElementByID(templateGroupEle.id).getBoundingClientRect();
                    if (templateGroupEle.id.indexOf('Marker') === -1) {
                        offSetLetValue = _this.isTileMap ? 0 : (layerOffset.left < elementOffset.left) ?
                            -(Math.abs(elementOffset.left - layerOffset.left)) : (Math.abs(elementOffset.left - layerOffset.left));
                        offSetTopValue = _this.isTileMap ? 0 : (layerOffset.top < elementOffset.top) ?
                            -(Math.abs(elementOffset.top - layerOffset.top)) : Math.abs(elementOffset.top - layerOffset.top);
                    }
                    Array.prototype.forEach.call(templateGroupEle.childNodes, function (currentTemplate) {
                        if (currentTemplate.id.indexOf('Marker') === -1) {
                            currentTemplate.style.left = parseFloat(currentTemplate.style.left) + offSetLetValue + 'px';
                            currentTemplate.style.top = parseFloat(currentTemplate.style.top) + offSetTopValue + 'px';
                            currentTemplate.style.transform = 'translate(-50%, -50%)';
                        }
                    });
                }
            });
        }
    };
    Maps.prototype.createTile = function () {
        var mainLayer = this.layersCollection[0];
        var padding = 0;
        if (mainLayer.isBaseLayer && (!isNullOrUndefined(mainLayer.urlTemplate) && mainLayer.urlTemplate !== '' && isNullOrUndefined(mainLayer.shapeData))) {
            removeElement(this.element.id + '_tile_parent');
            removeElement(this.element.id + '_tiles');
            removeElement('animated_tiles');
            var ele = createElement('div', {
                id: this.element.id + '_tile_parent'
            });
            var marginRight = getProcessedMarginValue(this.margin.right);
            ele.style.cssText = 'position: absolute; left: ' +
                (this.mapAreaRect.x) + 'px; right: ' + (marginRight) + 'px; top: '
                + (this.mapAreaRect.y + padding) + 'px; height: ' +
                (this.mapAreaRect.height) + 'px; width: '
                + (this.mapAreaRect.width) + 'px; overflow: hidden;';
            var ele1 = createElement('div', {
                id: this.element.id + '_tiles'
            });
            ele1.style.cssText = 'position: absolute; left: ' +
                (this.mapAreaRect.x) + 'px;  right: ' + (marginRight) + 'px; top: '
                + (this.mapAreaRect.y + padding) + 'px; height: ' + (this.mapAreaRect.height) + 'px; width: '
                + (this.mapAreaRect.width) + 'px; overflow: hidden;';
            this.element.appendChild(ele);
            this.element.appendChild(ele1);
        }
    };
    /**
     * To initilize the private varibales of maps.
     *
     * @returns {void}
     */
    Maps.prototype.initPrivateVariable = function () {
        if (this.element.id === '') {
            var collection = document.getElementsByClassName('e-maps').length;
            this.element.id = 'maps_control_' + collection;
        }
        this.renderer = new SvgRenderer(this.element.id);
        this.mapLayerPanel = new LayerPanel(this);
    };
    Maps.prototype.findBaseAndSubLayers = function () {
        var _this = this;
        var baseIndex = this.baseLayerIndex;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var mainLayers = [];
        var subLayers = [];
        this.layersCollection = [];
        Array.prototype.forEach.call(this.layers, function (layer) {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            (layer.type === 'Layer') ? mainLayers.push(layer) : subLayers.push(layer);
        });
        for (var i = 0; i < mainLayers.length; i++) {
            var baseLayer = mainLayers[i];
            if (baseLayer.visible && baseIndex === i) {
                baseLayer.isBaseLayer = true;
                this.isTileMap = !isNullOrUndefined(baseLayer.shapeData) ? false : true;
                this.layersCollection.push(baseLayer);
                break;
            }
            else if (i === mainLayers.length - 1) {
                this.layersCollection.push(mainLayers[0]);
                break;
            }
        }
        subLayers.map(function (subLayer) {
            if (subLayer.visible) {
                _this.layersCollection.push(subLayer);
            }
        });
    };
    /**
     * Render the map border.
     *
     * @private
     * @returns {void}
     */
    Maps.prototype.renderBorder = function () {
        var width = this.border.width;
        var borderElement = this.svgObject.querySelector('#' + this.element.id + '_MapBorder');
        if ((width > 0 || (this.background || this.themeStyle.backgroundColor)) && isNullOrUndefined(borderElement)) {
            var border = {
                opacity: isNullOrUndefined(this.border.opacity) ? 1 : this.border.opacity,
                color: this.border.color, width: this.border.width
            };
            var borderRect = new RectOption(this.element.id + '_MapBorder', this.background || this.themeStyle.backgroundColor, border, 1, new Rect(width / 2, width / 2, this.availableSize.width - width, this.availableSize.height - width));
            this.svgObject.appendChild(this.renderer.drawRectangle(borderRect));
        }
        else {
            borderElement.setAttribute('fill', this.background || this.themeStyle.backgroundColor);
        }
    };
    /**
     * Render the title and subtitle.
     *
     * @param {TitleSettingsModel} title - Specifies the title
     * @param {string} type - Specifies the type
     * @param {Rect} bounds - Specifies the bounds
     * @param {Element} groupEle - Specifies the group element
     * @returns {void}
     * @private
     */
    Maps.prototype.renderTitle = function (title, type, bounds, groupEle) {
        var style = {
            size: title.textStyle.size,
            color: title.textStyle.color,
            fontFamily: title.textStyle.fontFamily,
            fontWeight: title.textStyle.fontWeight,
            fontStyle: title.textStyle.fontStyle,
            opacity: title.textStyle.opacity
        };
        var height;
        var marginTop = getProcessedMarginValue(this.margin.top);
        var marginBottom = getProcessedMarginValue(this.margin.bottom);
        var marginLeft = getProcessedMarginValue(this.margin.left);
        var marginRight = getProcessedMarginValue(this.margin.right);
        var width = Math.abs((marginLeft + marginRight) - this.availableSize.width);
        style.fontFamily = !isNullOrUndefined(style.fontFamily) ? style.fontFamily : this.themeStyle.fontFamily;
        style.fontWeight = type === 'title' ? style.fontWeight || this.themeStyle.titleFontWeight : style.fontWeight || this.themeStyle.titleFontWeight;
        style.size = type === 'title' ? (style.size || this.themeStyle.titleFontSize) : (style.size || this.themeStyle.subTitleFontSize || Theme.mapsSubTitleFont.size);
        if (title.text) {
            if (isNullOrUndefined(groupEle)) {
                groupEle = this.renderer.createGroup({ id: this.element.id + '_Title_Group' });
            }
            var trimmedTitle = textTrim(width, title.text, style);
            var elementSize = measureText(trimmedTitle, style);
            var rect = (isNullOrUndefined(bounds)) ? new Rect(marginLeft, marginTop, this.availableSize.width, this.availableSize.height) : bounds;
            var location_1 = findPosition(rect, !isNullOrUndefined(title.alignment) ? title.alignment : 'Center', elementSize, type);
            var options = new TextOption(this.element.id + '_Map_' + type, location_1.x, location_1.y, 'start', trimmedTitle);
            var titleBounds = new Rect(location_1.x, location_1.y, elementSize.width, elementSize.height);
            var element = renderTextElement(options, style, style.color || (type === 'title' ? this.themeStyle.titleFontColor : this.themeStyle.subTitleFontColor), groupEle);
            element.setAttribute('aria-label', title.text);
            element.setAttribute('role', 'region');
            if ((type === 'title' && !title.subtitleSettings.text) || (type === 'subtitle')) {
                height = Math.abs((titleBounds.y + marginBottom) - this.availableSize.height);
                this.mapAreaRect = new Rect(marginLeft, titleBounds.y + 10, width, height - 10);
            }
            if (type !== 'subtitle' && title.subtitleSettings.text) {
                this.renderTitle(title.subtitleSettings, 'subtitle', titleBounds, groupEle);
            }
            else {
                this.svgObject.appendChild(groupEle);
            }
        }
        else {
            height = Math.abs((marginTop + marginBottom) - this.availableSize.height);
            this.mapAreaRect = new Rect(marginLeft, marginTop, width, height);
        }
    };
    /**
     * To create svg element for maps.
     *
     * @returns {void}
     */
    Maps.prototype.createSVG = function () {
        this.removeSvg();
        createSvg(this);
    };
    /**
     * To Remove the SVG.
     *
     * @returns {void}
     */
    Maps.prototype.removeSvg = function () {
        removeElement(this.element.id + '_Secondary_Element');
        removeElement(this.element.id + '_tile_parent');
        removeElement(this.element.id + '_tiles');
        if (this.svgObject) {
            while (this.svgObject.childNodes.length > 0) {
                this.svgObject.removeChild(this.svgObject.firstChild);
            }
            if (!this.svgObject.hasChildNodes() && this.svgObject.parentNode) {
                remove(this.svgObject);
            }
        }
        this.clearTemplate();
    };
    /**
     * To bind event handlers for maps.
     *
     * @returns {void}
     */
    Maps.prototype.wireEVents = function () {
        //let cancelEvent: string = Browser.isPointer ? 'pointerleave' : 'mouseleave';
        EventHandler.add(this.element, 'click', this.mapsOnClick, this);
        EventHandler.add(this.element, 'contextmenu', this.mapsOnRightClick, this);
        EventHandler.add(this.element, 'dblclick', this.mapsOnDoubleClick, this);
        EventHandler.add(this.element, Browser.touchStartEvent, this.mouseDownOnMap, this);
        EventHandler.add(this.element, Browser.touchMoveEvent, this.mouseMoveOnMap, this);
        EventHandler.add(this.element, Browser.touchEndEvent, this.mouseEndOnMap, this);
        EventHandler.add(this.element, 'pointerleave mouseleave', this.mouseLeaveOnMap, this);
        EventHandler.add(this.element, 'keydown', this.keyDownHandler, this);
        EventHandler.add(this.element, 'keyup', this.keyUpHandler, this);
        //  EventHandler.add(this.element, cancelEvent, this.mouseLeaveOnMap, this);
        this.resizeEvent = this.mapsOnResize.bind(this);
        window.addEventListener((Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.resizeEvent);
    };
    /**
     * To unbind event handlers from maps.
     *
     * @returns {void}
     */
    Maps.prototype.unWireEVents = function () {
        //let cancelEvent: string = Browser.isPointer ? 'pointerleave' : 'mouseleave';
        EventHandler.remove(this.element, 'click', this.mapsOnClick);
        EventHandler.remove(this.element, 'contextmenu', this.mapsOnRightClick);
        EventHandler.remove(this.element, 'dblclick', this.mapsOnDoubleClick);
        EventHandler.remove(this.element, Browser.touchStartEvent, this.mouseDownOnMap);
        EventHandler.remove(this.element, Browser.touchMoveEvent, this.mouseMoveOnMap);
        EventHandler.remove(this.element, Browser.touchEndEvent, this.mouseEndOnMap);
        EventHandler.remove(this.element, 'pointerleave mouseleave', this.mouseLeaveOnMap);
        EventHandler.remove(this.element, 'keydown', this.keyDownHandler);
        EventHandler.remove(this.element, 'keyup', this.keyUpHandler);
        //EventHandler.remove(this.element, cancelEvent, this.mouseLeaveOnMap);
        window.removeEventListener((Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.resizeEvent);
    };
    /**
     * This method is used to perform operations when mouse pointer leave from maps.
     *
     * @param {PointerEvent} e - Specifies the pointer event on maps.
     * @returns {void}
     * @private
     */
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    Maps.prototype.mouseLeaveOnMap = function (e) {
        if (document.getElementsByClassName('highlightMapStyle').length > 0 && this.legendModule) {
            this.legendModule.removeShapeHighlightCollection();
            removeClass(document.getElementsByClassName('highlightMapStyle')[0]);
        }
    };
    /**
     * This method is used to perform operations when keyboard key from maps.
     *
     * @param {KeyboardEvent} event - Specifies the keyboard event on maps.
     * @returns {void}
     * @private
     */
    Maps.prototype.keyUpHandler = function (event) {
        var id = event.target['id'];
        if (this.isTileMap) {
            this.removeTileMap();
        }
        if (event.code === 'Tab' && id.indexOf('_LayerIndex_') > -1 && id.indexOf('shapeIndex') > -1) {
            this.keyboardHighlightSelection(id, event);
        }
        else if (id.indexOf('_LayerIndex_') === -1 && id.indexOf('shapeIndex') === -1 &&
            getElementsByClassName('highlightMapStyle').length > 0) {
            removeClass(getElementsByClassName('highlightMapStyle')[0]);
            if (this.legendSettings.visible && this.legendModule) {
                this.legendModule.removeShapeHighlightCollection();
            }
        }
    };
    Maps.prototype.keyboardHighlightSelection = function (id, event) {
        var key = event.type;
        var layerIndex = parseInt(id.split('_LayerIndex_')[1].split('_')[0], 10);
        var shapeIndex = parseInt(id.split('_shapeIndex_')[1].split('_')[0], 10);
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        var shapeData = this.layers[layerIndex].shapeData['features']['length'] > shapeIndex ?
            this.layers[layerIndex].shapeData['features'][shapeIndex]['properties'] : null;
        var dataIndex = parseInt(id.split('_dataIndex_')[1].split('_')[0], 10);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var data = isNullOrUndefined(dataIndex) ? null : this.layers[layerIndex].dataSource[dataIndex];
        if (this.layers[layerIndex].selectionSettings.enable && key === 'keydown' && this.selectionModule) {
            this.selectionModule.selectionsettings = this.layers[layerIndex].selectionSettings;
            this.selectionModule.selectionType = 'Shape';
            this.selectionModule.selectElement(event.target, layerIndex, data, shapeData);
        }
        else if (this.highlightModule && (this.layers[layerIndex].highlightSettings.enable && key === 'keyup' &&
            !event.target.classList.contains('ShapeselectionMapStyle'))) {
            this.highlightModule.highlightSettings = this.layers[layerIndex].highlightSettings;
            this.highlightModule.handleHighlight(event.target, layerIndex, data, shapeData);
        }
    };
    /**
     * This method is used to perform operations when keyboard down from maps.
     *
     * @param {KeyboardEvent} event - Specifies the keyboard event on maps.
     * @returns {void}
     * @private
     */
    Maps.prototype.keyDownHandler = function (event) {
        var zoom = this.zoomModule;
        var id = event.target['id'];
        if ((event.code === 'ArrowUp' || event.code === 'ArrowDown' || event.code === 'ArrowLeft'
            || event.code === 'ArrowRight') && zoom) {
            var animatedTiles = document.getElementById(this.element.id + '_animated_tiles');
            if (this.isTileMap && !isNullOrUndefined(animatedTiles)) {
                this.currentTiles = animatedTiles.cloneNode(true);
            }
        }
        if (this.zoomSettings.enable && zoom && (event.key === '+' || event.code === 'Equal')) {
            zoom.performZoomingByToolBar('zoomin');
        }
        else if (this.zoomSettings.enable && zoom && (event.key === '-' || event.code === 'Minus')) {
            zoom.performZoomingByToolBar('zoomout');
        }
        else if (this.zoomSettings.enable && zoom && event['keyCode'] === 82) {
            zoom.performZoomingByToolBar('reset');
            zoom.isPanModeEnabled = false;
        }
        else if (this.zoomSettings.enable && this.zoomSettings.enablePanning && zoom
            && (event.code === 'ArrowUp' || event.code === 'ArrowDown')) {
            event.preventDefault();
            zoom.mouseDownLatLong['x'] = 0;
            zoom.mouseMoveLatLong['y'] = this.mapAreaRect.height / 7;
            zoom.panning('None', zoom.mouseDownLatLong['x'], event.code === 'ArrowUp' ? -(zoom.mouseMoveLatLong['y']) :
                zoom.mouseMoveLatLong['y'], event);
            zoom.mouseDownLatLong['y'] = zoom.mouseMoveLatLong['y'];
        }
        else if (this.zoomSettings.enable && this.zoomSettings.enablePanning && zoom
            && (event.code === 'ArrowLeft' || event.code === 'ArrowRight')) {
            event.preventDefault();
            zoom.mouseDownLatLong['y'] = 0;
            zoom.mouseMoveLatLong['x'] = this.mapAreaRect.width / 7;
            zoom.panning('None', event.code === 'ArrowLeft' ? -(zoom.mouseMoveLatLong['x']) : zoom.mouseMoveLatLong['x'], zoom.mouseDownLatLong['y'], event);
            zoom.mouseDownLatLong['x'] = zoom.mouseMoveLatLong['x'];
        }
        else if (event.code === 'Enter') {
            id = event.target['id'];
            event.preventDefault();
            if (this.legendModule && (id.indexOf('_Left_Page_Rect') > -1 || id.indexOf('_Right_Page_Rect') > -1)) {
                this.mapAreaRect = this.legendModule.initialMapAreaRect;
                this.legendModule.currentPage = (id.indexOf('_Left_Page_') > -1) ? (this.legendModule.currentPage - 1) :
                    (this.legendModule.currentPage + 1);
                this.legendModule.legendGroup = this.renderer.createGroup({ id: this.element.id + '_Legend_Group' });
                this.legendModule.drawLegendItem(this.legendModule.currentPage);
                var textContent = (document.getElementById(this.element.id + '_Paging_Text')).textContent;
                var text = textContent.split('/').map(Number);
                if (id.indexOf('_Left_Page_Rect') > -1) {
                    if (text[0] !== 1) {
                        event.target.focus();
                    }
                    event.target.style.outlineColor = text[0] - 1 !== text[1] ? '' : 'transparent';
                }
                else if (id.indexOf('_Right_Page_Rect') > -1) {
                    if (text[0] !== text[1]) {
                        event.target.focus();
                    }
                    event.target.style.outlineColor = text[0] !== text[1] + 1 ? '' : 'transparent';
                }
                if (querySelector(this.element.id + '_Legend_Border', this.element.id)) {
                    querySelector(this.element.id + '_Legend_Border', this.element.id).style.pointerEvents = 'none';
                }
            }
            if (id.indexOf('shapeIndex') > -1) {
                this.keyboardHighlightSelection(id, event);
            }
        }
        if (this.zoomModule) {
            this.zoomModule.removeToolbarOpacity(this.isTileMap ? Math.round(this.tileZoomLevel) : this.mapScaleValue, this.mouseMoveId);
        }
    };
    /**
     * Gets the selected element to be maintained or not.
     *
     * @param {Element} targetEle - Specifies the target element
     * @returns {boolean} - Returns the boolean value
     * @private
     */
    Maps.prototype.SelectedElement = function (targetEle) {
        var isSelect = false;
        if (targetEle.getAttribute('class') === 'ShapeselectionMapStyle') {
            isSelect = true;
        }
        return isSelect;
    };
    /**
     * This method is used to perform the operations when a click operation is performed on maps.
     *
     * @param {PointerEvent} e - Specifies the pointer event on maps.
     * @returns {void}
     * @private
     */
    Maps.prototype.mapsOnClick = function (e) {
        var _this = this;
        var targetEle = e.target;
        var targetId = targetEle.id;
        var latitude = null;
        var longitude = null;
        this.mouseClickEvent = { x: e.x, y: e.y };
        if (targetEle.id.indexOf('_ToolBar') === -1) {
            var latLongValue = this.getClickLocation(targetId, e.pageX, e.pageY, targetEle, e['layerX'], e['layerY']);
            if (!isNullOrUndefined(latLongValue)) {
                latitude = latLongValue.latitude;
                longitude = latLongValue.longitude;
            }
            var eventArgs_1 = {
                cancel: false, name: click, target: targetId, x: e.clientX, y: e.clientY,
                latitude: latitude, longitude: longitude,
                isShapeSelected: this.SelectedElement(targetEle)
            };
            if (this.onclick) {
                eventArgs_1.name = onclick;
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                this.trigger('onclick', eventArgs_1, function (mouseArgs) {
                    _this.clickHandler(e, eventArgs_1, targetEle);
                });
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                this.trigger('click', eventArgs_1, function (mouseArgs) {
                    _this.clickHandler(e, eventArgs_1, targetEle);
                });
            }
        }
        if (this.zoomModule) {
            this.zoomModule.removeToolbarOpacity(this.isTileMap ? Math.round(this.tileZoomLevel) : this.mapScaleValue, targetId);
            if (this.isDevice) {
                this.zoomModule.removeToolbarClass('', '', '', '', '');
            }
        }
    };
    Maps.prototype.clickHandler = function (e, eventArgs, targetEle) {
        if (targetEle.id.indexOf('shapeIndex') > -1) {
            this.mergeCluster();
            if (getElement(this.element.id + '_mapsTooltip') &&
                this.mapsTooltipModule.tooltipTargetID.indexOf('_MarkerIndex_') > -1) {
                removeElement(this.element.id + '_mapsTooltip');
            }
        }
        if (this.markerModule) {
            this.markerModule.markerClusterClick(e);
        }
        if (!eventArgs.cancel) {
            this.notify(click, targetEle);
        }
        if (!eventArgs.cancel && targetEle.id.indexOf('shapeIndex') !== -1) {
            this.triggerShapeSelection(targetEle);
        }
    };
    Maps.prototype.triggerShapeSelection = function (targetEle) {
        var layerIndex = parseInt(targetEle.id.split('_LayerIndex_')[1].split('_')[0], 10);
        var shapeSelectedEventArgs = triggerShapeEvent(targetEle.id, this.layers[layerIndex].selectionSettings, this, shapeSelected);
        if (!shapeSelectedEventArgs.cancel && this.selectionModule && !isNullOrUndefined(this.shapeSelected)) {
            customizeStyle(this.selectionModule.selectionType + 'selectionMap', this.selectionModule.selectionType + 'selectionMapStyle', shapeSelectedEventArgs);
        }
        else if (shapeSelectedEventArgs.cancel && this.selectionModule
            && isNullOrUndefined(shapeSelectedEventArgs['data'])) {
            removeClass(targetEle);
            this.selectionModule.removedSelectionList(targetEle);
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Maps.prototype.getMarkerClickLocation = function (pageX, pageY, x, y, marker, isDragEnd) {
        document.getElementById(this.element.id + '_svg').style.cursor = 'grabbing';
        var targetElement = getElement(marker.targetId);
        var latLongValue = this.getClickLocation(marker.targetId, pageX, pageY, targetElement, x, y);
        var location = (this.isTileMap) ? convertTileLatLongToPoint(new MapLocation(latLongValue.longitude, latLongValue.latitude), this.tileZoomLevel, this.tileTranslatePoint, true) : convertGeoToPoint(latLongValue.latitude, latLongValue.longitude, this.mapLayerPanel.currentFactor, this.layersCollection[marker.layerIndex], this);
        var transPoint = this.translatePoint;
        var translateX = (this.isTileMap ? location.x : (location.x + transPoint.x) * this.scale);
        var translateY = (this.isTileMap ? location.y : (location.y + transPoint.y) * this.scale);
        if (this.markerDragArgument.shape !== 'Balloon') {
            targetElement.setAttribute('transform', 'translate( ' + translateX + ' ' + translateY + ' )');
        }
        else {
            targetElement.parentElement.setAttribute('transform', 'translate( ' + translateX + ' ' + translateY + ' )');
        }
        if (isDragEnd) {
            var markerSettings = this.layers[marker.layerIndex].markerSettings[marker.markerIndex];
            latLongValue = this.getClickLocation(marker.targetId, (pageX - markerSettings.offset.x), (pageY - markerSettings.offset.y), targetElement, (x - markerSettings.offset.x), (y - markerSettings.offset.y));
        }
        return latLongValue;
    };
    /**
     * Gets the location of the mouse click.
     *
     * @param {string} targetId - Specifies the ID for the target.
     * @param {number} pageX - Defines the page X position.
     * @param {number} pageY - Defines the page Y position.
     * @param {HTMLElement} targetElement - Specifies the target element on the event.
     * @param  {number} x - Defines the x position in pixel.
     * @param {number} y - Defines the y position in pixel.
     * @param {string} type -  Specifies the type.
     * @returns {GeoPosition} -  Returns the position of the event.
     * @private
     */
    Maps.prototype.getClickLocation = function (targetId, pageX, pageY, targetElement, x, y, type) {
        var layerIndex = 0;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var latLongValue;
        if (targetId.indexOf('_LayerIndex_') !== -1 && !this.isTileMap && (!isNullOrUndefined(type) ||
            ((parseInt(this.mouseDownEvent['x'], 10) === parseInt(this.mouseClickEvent['x'], 10)) &&
                (parseInt(this.mouseDownEvent['y'], 10) === parseInt(this.mouseClickEvent['y'], 10))))) {
            layerIndex = parseFloat(targetId.split('_LayerIndex_')[1].split('_')[0]);
            if (this.layers[layerIndex].geometryType === 'Normal') {
                if (targetId.indexOf('_shapeIndex_') > -1) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    var immediateParent = targetElement.parentElement;
                    var parentElement = immediateParent.id.indexOf('_Point_Group') > -1 || immediateParent.id.indexOf('_LineString_Group') > -1
                        || immediateParent.id.indexOf('_MultiLineString_Group') > -1 || immediateParent.id.indexOf('_Polygon_Group') > -1 ?
                        immediateParent.parentElement : immediateParent;
                    var location_2 = getMousePosition(pageX, pageY, parentElement);
                    var zoomScaleValue = this.mapLayerPanel.currentFactor * this.mapScaleValue;
                    var minLongitude = Math.abs((-this.baseMapBounds.longitude.min) * zoomScaleValue);
                    var minLatitude = Math.abs(this.baseMapBounds.latitude.max * zoomScaleValue);
                    latLongValue = {
                        latitude: Math.abs(this.baseMapBounds.latitude.max - (location_2.y / zoomScaleValue)),
                        longitude: Math.abs((location_2.x / zoomScaleValue) + this.baseMapBounds.longitude.min)
                    };
                    if (this.baseMapBounds.longitude.min < 0 && minLongitude > location_2.x) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        latLongValue.longitude = -latLongValue.longitude;
                    }
                    if (this.baseMapBounds.latitude.min < 0 && minLatitude > location_2.y) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        latLongValue.latitude = -latLongValue.latitude;
                    }
                }
                else if (targetId.indexOf('_MarkerIndex_') > -1 && this.markerModule && !this.markerDragArgument) {
                    var markerIndex = parseInt(targetId.split('_MarkerIndex_')[1].split('_')[0], 10);
                    var dataIndex = parseInt(targetId.split('_dataIndex_')[1].split('_')[0], 10);
                    if (!isNaN(markerIndex) && !isNaN(dataIndex)) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        var dataObject = this.layers[layerIndex].markerSettings[markerIndex].dataSource[dataIndex];
                        latLongValue = { latitude: dataObject['latitude'], longitude: dataObject.longitude };
                    }
                    else {
                        latLongValue = { latitude: null, longitude: null };
                    }
                }
                else if (targetId.indexOf('_MarkerIndex_') > -1 && this.markerModule && this.markerDragArgument) {
                    var element = document.getElementById(this.element.id + '_LayerIndex_' + this.markerDragArgument.layerIndex);
                    var elementRect = element.getBoundingClientRect();
                    var location_3 = new MapLocation(pageX > elementRect.left ? Math.abs(elementRect.left - pageX) : 0, pageY > elementRect.top ? Math.abs(elementRect.top - pageY) : 0);
                    var minLongitude = Math.abs((-this.baseMapBounds.longitude.min) * this.mapLayerPanel.currentFactor);
                    var minLatitude = Math.abs(this.baseMapBounds.latitude.max * this.mapLayerPanel.currentFactor);
                    latLongValue = {
                        latitude: Math.abs(this.baseMapBounds.latitude.max
                            - (location_3.y / (this.mapLayerPanel.currentFactor * this.scale))),
                        longitude: Math.abs((location_3.x / (this.mapLayerPanel.currentFactor * this.scale))
                            + this.baseMapBounds.longitude.min)
                    };
                    if (this.baseMapBounds.longitude.min < 0 && minLongitude > location_3.x) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        latLongValue.longitude = -latLongValue.longitude;
                    }
                    if (this.baseMapBounds.latitude.min < 0 && minLatitude > location_3.y) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        latLongValue.latitude = -latLongValue.latitude;
                    }
                }
                else {
                    latLongValue = { latitude: null, longitude: null };
                }
            }
            else {
                latLongValue = this.getGeoLocation(layerIndex, pageX, pageY);
            }
        }
        else if (this.isTileMap && (!isNullOrUndefined(type) ||
            ((parseInt(this.mouseDownEvent['x'], 10) === parseInt(this.mouseClickEvent['x'], 10)) &&
                (parseInt(this.mouseDownEvent['y'], 10) === parseInt(this.mouseClickEvent['y'], 10))))) {
            latLongValue = this.getTileGeoLocation(x, y);
        }
        return latLongValue;
    };
    Maps.prototype.removeTileMap = function () {
        var animateElement = document.getElementById(this.element.id + '_animated_tiles');
        if (!isNullOrUndefined(this.currentTiles) && animateElement.childElementCount < this.currentTiles.childElementCount) {
            for (var l = animateElement.childElementCount - 1; l >= this.currentTiles.childElementCount; l--) {
                animateElement.removeChild(animateElement.children[l]);
            }
        }
        this.currentTiles = null;
    };
    /**
     * This method is used to perform operations when mouse click on maps.
     *
     * @param {PointerEvent} e - Specifies the pointer event on maps.
     * @returns {boolean} - Returns the boolean value
     * @private
     */
    Maps.prototype.mouseEndOnMap = function (e) {
        var pageX;
        var pageY;
        var touchArg;
        var layerX = 0;
        var layerY = 0;
        if (e.type.indexOf('touch') !== -1) {
            this.isTouch = true;
            touchArg = e;
            layerX = pageX = touchArg.changedTouches[0].pageX;
            pageY = touchArg.changedTouches[0].pageY;
            layerY = pageY - (this.isTileMap ? 10 : 0);
            this.mouseClickEvent = { x: pageX, y: pageY };
        }
        else {
            this.isTouch = e.pointerType === 'touch';
            pageX = e.pageX;
            pageY = e.pageY;
            layerX = e['layerX'];
            layerY = e['layerY'] - (this.isTileMap ? 10 : 0);
        }
        if (this.isTileMap) {
            this.removeTileMap();
        }
        if (this.isTouch) {
            this.titleTooltip(e, pageX, pageY, true);
            if (!isNullOrUndefined(this.legendModule)) {
                this.legendTooltip(e, e.pageX, e.pageY, true);
            }
        }
        this.notify(Browser.touchEndEvent, e);
        if (e.cancelable && !this.isTouch) {
            e.preventDefault();
        }
        if (!isNullOrUndefined(this.markerDragArgument)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var marker = this.markerDragArgument;
            this.mouseClickEvent['x'] = this.mouseDownEvent['x'];
            this.mouseClickEvent['y'] = this.mouseDownEvent['y'];
            var latLongValue = this.getMarkerClickLocation(pageX, pageY, layerX, layerY, this.markerDragArgument, true);
            var markerObject = this.layers[marker.layerIndex].markerSettings[marker.markerIndex];
            document.getElementById(this.element.id + '_svg').style.cursor = markerObject.enableDrag ? 'pointer' : 'grabbing';
            var dragEventArgs = {
                name: 'markerDragEnd', x: pageX, y: pageY,
                latitude: latLongValue.latitude, longitude: latLongValue.longitude,
                layerIndex: marker.layerIndex, markerIndex: marker.markerIndex,
                dataIndex: marker.dataIndex
            };
            if (isNullOrUndefined(markerObject.latitudeValuePath) && isNullOrUndefined(markerObject.longitudeValuePath)) {
                var data = markerObject.dataSource[marker.dataIndex];
                if (!isNullOrUndefined(data['Longitude']) && !isNullOrUndefined(data['Latitude'])) {
                    markerObject.dataSource[marker.dataIndex].Latitude = dragEventArgs.latitude;
                    markerObject.dataSource[marker.dataIndex].Longitude = dragEventArgs.longitude;
                }
                else {
                    markerObject.dataSource[marker.dataIndex].latitude = dragEventArgs.latitude;
                    markerObject.dataSource[marker.dataIndex].longitude = dragEventArgs.longitude;
                }
            }
            else {
                markerObject.dataSource[marker.dataIndex][markerObject.latitudeValuePath] = dragEventArgs.latitude;
                markerObject.dataSource[marker.dataIndex][markerObject.longitudeValuePath] = dragEventArgs.longitude;
            }
            this.markerDragId = '';
            this.markerDragArgument = null;
            this.trigger('markerDragEnd', dragEventArgs);
        }
        else {
            document.getElementById(this.element.id + '_svg').style.cursor = 'auto';
        }
        if (this.zoomModule && this.isDevice) {
            this.zoomModule.removeToolbarOpacity(this.isTileMap ? Math.round(this.tileZoomLevel) : this.scale, this.element.id + '_Zooming_');
            this.zoomModule.removeToolbarClass('', '', '', '', '');
        }
        return false;
    };
    /**
     * This method is used to perform operations when mouse is clicked down on maps.
     *
     * @param {PointerEvent} e - Specifies the pointer event on maps
     * @returns {void}
     * @private
     */
    Maps.prototype.mouseDownOnMap = function (e) {
        this.mouseDownEvent = { x: e.x, y: e.y };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (e.type.indexOf('touch') !== -1 && e.changedTouches) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.mouseDownEvent = { x: e.changedTouches[0].pageX, y: e.changedTouches[0].pageY };
        }
        if (this.isDevice && !isNullOrUndefined(this.mapsTooltipModule)) {
            this.mapsTooltipModule.renderTooltip(e);
        }
        var element = e.target;
        this.markerDragId = element.id;
        var animatedTiles = document.getElementById(this.element.id + '_animated_tiles');
        if (this.isTileMap && !isNullOrUndefined(animatedTiles)) {
            this.currentTiles = animatedTiles.cloneNode(true);
        }
        if (element.id.indexOf('_ToolBar') === -1) {
            var markerModule = this.markerModule;
            if (element.id.indexOf('shapeIndex') > -1 || element.id.indexOf('Tile') > -1) {
                this.mergeCluster();
            }
            if (markerModule) {
                markerModule.markerClick(e);
                markerModule.markerClusterClick(e);
            }
            if (this.bubbleModule) {
                this.bubbleModule.bubbleClick(e);
            }
        }
        this.notify(Browser.touchStartEvent, e);
    };
    /**
     * Merges the marker clusters.
     *
     * @returns {void}
     * @private
     */
    Maps.prototype.mergeCluster = function () {
        if (this.markerModule && (this.markerModule.sameMarkerData.length > 0) &&
            (this.zoomModule ? this.zoomModule.isSingleClick : true)) {
            mergeSeparateCluster(this.markerModule.sameMarkerData, this);
            this.markerModule.sameMarkerData = [];
        }
    };
    /**
     * @param {PointerEvent} e - Specifies the pointer event.
     * @returns {void}
     * @private
     */
    Maps.prototype.mapsOnRightClick = function (e) {
        var targetEle = e.target;
        var targetId = targetEle.id;
        var latitude = null;
        var longitude = null;
        this.mouseClickEvent = this.mouseDownEvent = { x: e.x, y: e.y };
        if (targetEle.id.indexOf('_ToolBar') === -1) {
            var latLongValue = this.getClickLocation(targetId, e.pageX, e.pageY, targetEle, e['layerX'], e['layerY']);
            if (!isNullOrUndefined(latLongValue)) {
                latitude = latLongValue.latitude;
                longitude = latLongValue.longitude;
            }
            var eventArgs = {
                cancel: false, name: rightClick, target: targetId, x: e.clientX, y: e.clientY,
                latitude: latitude, longitude: longitude,
                isShapeSelected: false
            };
            this.trigger('rightClick', eventArgs);
        }
    };
    /**
     * This method is used to perform operations when performing the double click operation on maps.
     *
     * @param {PointerEvent} e - Specifies the pointer event.
     * @returns {void}
     * @private
     */
    Maps.prototype.mapsOnDoubleClick = function (e) {
        this.notify('dblclick', e);
        var targetElement = e.target;
        var targetId = targetElement.id;
        var layerIndex = 0;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var latLongValue;
        var latitude = null;
        var longitude = null;
        if (targetElement.id.indexOf('_ToolBar') === -1) {
            if (targetElement.id.indexOf('_LayerIndex_') !== -1 && !this.isTileMap && (this.mouseDownEvent['x'] === e.clientX)
                && (this.mouseDownEvent['y'] === e.clientY)) {
                layerIndex = parseFloat(targetElement.id.split('_LayerIndex_')[1].split('_')[0]);
                latLongValue = this.getGeoLocation(layerIndex, e['layerX'], e['layerY']);
                latitude = latLongValue['latitude'];
                longitude = latLongValue['longitude'];
            }
            else if (this.isTileMap && (this.mouseDownEvent['x'] === e.clientX)
                && (this.mouseDownEvent['y'] === e.clientY)) {
                latLongValue = this.getTileGeoLocation(e['layerX'], e['layerY']);
                latitude = latLongValue['latitude'];
                longitude = latLongValue['longitude'];
            }
            var doubleClickArgs = {
                cancel: false, name: doubleClick, x: e.clientX, y: e.clientY,
                target: targetId, latitude: latitude, longitude: longitude, isShapeSelected: null
            };
            this.trigger('doubleClick', doubleClickArgs);
        }
    };
    /**
     * This method is used to perform operations while performing mouse over on maps.
     *
     * @param {PointerEvent} e - Specifies the pointer event on maps.
     * @returns {void}
     * @private
     */
    Maps.prototype.mouseMoveOnMap = function (e) {
        var target;
        target = (e.type === 'touchmove') ? e.target :
            target = e.target;
        // if (target.id.indexOf('shapeIndex') !== -1 && !this.highlightSettings.enable) {
        //     triggerShapeEvent(target.id, this.highlightSettings, this, shapeHighlight);
        // }
        this.mouseMoveEvent(e);
        if (this.markerModule) {
            this.markerModule.markerMove(e);
            this.markerModule.markerClusterMouseMove(e);
        }
        if (this.bubbleModule) {
            this.bubbleModule.bubbleMove(e);
        }
        if (target.id.indexOf('MarkerIndex') === -1) {
            document.getElementById(this.element.id + '_svg').style.cursor = 'auto';
        }
        this.onMouseMove(e);
        this.notify(Browser.touchMoveEvent, e);
    };
    /**
     * To check and trigger mouse move event on maps.
     *
     * @param {PointerEvent} e - Specifies the pointer event on maps.
     * @returns {void}
     * @private
     */
    Maps.prototype.mouseMoveEvent = function (e) {
        var targetId = e.target.id;
        var layerIndex;
        var eventArgs;
        if (this.isTileMap) {
            var latLongValue = this.getTileGeoLocation(e['layerX'], e['layerY']);
            eventArgs = {
                x: e.clientX, y: e.clientY, latitude: latLongValue.latitude,
                longitude: latLongValue.longitude, target: e.target
            };
        }
        else {
            layerIndex = targetId.indexOf('_LayerIndex_') > -1 ? parseInt(targetId.split('_LayerIndex_')[1].split('_')[0], 10) : this.baseLayerIndex;
            var latLongValue = this.getGeoLocation(layerIndex, e.clientX, e.clientY);
            eventArgs = {
                x: e.clientX, y: e.clientY, latitude: latLongValue.latitude,
                longitude: latLongValue.longitude, target: e.target
            };
        }
        this.trigger(mouseMove, eventArgs);
    };
    /**
     * This method is used to perform operations when mouse move event is performed on maps.
     *
     * @param {PointerEvent} e - Specifies the pointer event on maps.
     * @returns {void}
     * @private
     */
    Maps.prototype.onMouseMove = function (e) {
        var element = e.target;
        this.mouseMoveId = element['id'];
        var pageX;
        var pageY;
        var touches = null;
        var layerX = 0;
        var layerY = 0;
        if (e.type.indexOf('touch') === -1) {
            pageX = e.pageX;
            pageY = e.pageY;
            layerX = e['layerX'];
            layerY = e['layerY'] - (this.isTileMap ? 10 : 0);
            this.titleTooltip(e, e.pageX, e.pageY);
            if (!isNullOrUndefined(this.legendModule)) {
                this.legendTooltip(e, e.pageX, e.pageY, true);
            }
        }
        else {
            touches = e.touches;
            layerX = pageX = touches[0].clientX;
            layerY = pageY = touches[0].clientY - (this.isTileMap ? 10 : 0);
        }
        if (!isNullOrUndefined(this.markerDragArgument)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var marker = this.markerDragArgument;
            this.mouseClickEvent['x'] = this.mouseDownEvent['x'];
            this.mouseClickEvent['y'] = this.mouseDownEvent['y'];
            this.getMarkerClickLocation(pageX, pageY, layerX, layerY, marker, false);
        }
        if (this.zoomModule) {
            this.zoomModule.removeToolbarOpacity(this.isTileMap ? Math.round(this.tileZoomLevel) : this.scale, e.target.id);
        }
        return false;
    };
    Maps.prototype.legendTooltip = function (event, x, y, isTouch) {
        var targetId = event.target.id;
        var legendText;
        var page = this.legendModule.currentPage;
        var legendIndex = event.target.id.split('_Index_')[1];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var collection;
        page = this.legendModule.totalPages.length <= this.legendModule.currentPage
            ? this.legendModule.totalPages.length - 1 : this.legendModule.currentPage < 0 ?
            0 : this.legendModule.currentPage;
        var count = this.legendModule.totalPages.length !== 0 ?
            this.legendModule.totalPages[page]['Collection'].length : this.legendModule.totalPages.length;
        for (var i = 0; i < count; i++) {
            collection = this.legendModule.totalPages[page]['Collection'][i];
            legendText = collection['DisplayText'];
            targetId = event.target['id'];
            legendIndex = event.target['id'].split('_Index_')[1];
            if ((targetId === (this.element.id + '_Legend_Text_Index_' + legendIndex)) &&
                (event.target.textContent.indexOf('...') > -1) && collection['idIndex'] === parseInt(legendIndex, 10)) {
                showTooltip(legendText, this.legendSettings.textStyle.size, x, y, this.element.offsetWidth, this.element.offsetHeight, this.element.id + '_EJ2_Legend_Text_Tooltip', getElement(this.element.id + '_Secondary_Element'), isTouch);
            }
        }
        if ((targetId !== (this.element.id + '_Legend_Text_Index_' + legendIndex))) {
            removeElement(this.element.id + '_EJ2_Legend_Text_Tooltip');
        }
    };
    Maps.prototype.titleTooltip = function (event, x, y, isTouch) {
        var targetId = event.target.id;
        if (targetId === (this.element.id + '_LegendTitle') && (event.target.textContent.indexOf('...') > -1)) {
            showTooltip(this.legendSettings.title.text, this.legendSettings.titleStyle.size, x, y, this.element.offsetWidth, this.element.offsetHeight, this.element.id + '_EJ2_LegendTitle_Tooltip', getElement(this.element.id + '_Secondary_Element'), isTouch);
        }
        else {
            removeElement(this.element.id + '_EJ2_LegendTitle_Tooltip');
        }
        if ((targetId === (this.element.id + '_Map_title')) && (event.target.textContent.indexOf('...') > -1)) {
            showTooltip(this.titleSettings.text, this.titleSettings.textStyle.size || this.themeStyle.titleFontSize, x, y, this.element.offsetWidth, this.element.offsetHeight, this.element.id + '_EJ2_Title_Tooltip', getElement(this.element.id + '_Secondary_Element'), isTouch);
        }
        else {
            removeElement(this.element.id + '_EJ2_Title_Tooltip');
        }
    };
    /*

    /**
     * This method is used to perform operations while resizing the window.
     *
     * @param e - Specifies the arguments of window resize event.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Maps.prototype.mapsOnResize = function (e) {
        var _this = this;
        if (!this.isDestroyed && !this.isExportInitialTileMap) {
            this.isResize = this.isReset = true;
            var args = {
                cancel: false,
                name: resize,
                previousSize: this.availableSize,
                currentSize: calculateSize(this),
                maps: this
            };
            this.trigger(resize, args);
            if (!args.cancel) {
                if (this.resizeTo) {
                    clearTimeout(this.resizeTo);
                }
                if (!isNullOrUndefined(this.element) && this.element.classList.contains('e-maps')) {
                    this.resizeTo = setTimeout(function () {
                        _this.unWireEVents();
                        _this.createSVG();
                        _this.refreshing = true;
                        _this.wireEVents();
                        _this.render();
                        _this.refreshing = false;
                    }, 500);
                }
            }
        }
        return false;
    };
    /**
     * This method is used to zoom the map by specifying the center position.
     *
     * @param {number} centerPosition - Specifies the location of the maps to be zoomed as geographical coordinates.
     * @param {number} centerPosition.longitude - Specifies the longitude of the location to be zoomed.
     * @param {number} centerPosition.latitude - Specifies the latitude of the location to be zoomed.
     * @param {number} zoomFactor - Specifies the zoom factor for the maps.
     * @returns {void}
     */
    Maps.prototype.zoomByPosition = function (centerPosition, zoomFactor) {
        if (!this.isDestroyed) {
            this.zoomNotApplied = this.isMarkerZoomCompleted = false;
            var isRefresh = this.zoomSettings.zoomFactor === zoomFactor;
            this.previousProjection = null;
            if (!this.isTileMap && this.zoomModule) {
                if (!isNullOrUndefined(centerPosition)) {
                    this.zoomSettings.zoomFactor = zoomFactor;
                    isRefresh = this.centerPosition.latitude === centerPosition.latitude &&
                        this.centerPosition.longitude === centerPosition.longitude ? true : isRefresh;
                    this.centerPosition = centerPosition;
                    this.isZoomByPosition = true;
                    this.mapScaleValue = null;
                }
                else {
                    this.zoomSettings.zoomFactor = zoomFactor;
                    this.isZoomByPosition = true;
                    this.mapScaleValue = null;
                }
            }
            else if (this.zoomModule) {
                this.tileZoomLevel = this.zoomSettings.zoomFactor = zoomFactor;
                isRefresh = this.centerPosition.latitude === centerPosition.latitude &&
                    this.centerPosition.longitude === centerPosition.longitude ? true : isRefresh;
                this.centerPosition = centerPosition;
                this.isZoomByPosition = true;
            }
            if (isRefresh) {
                this.refresh();
            }
        }
    };
    /**
     * This method is used to perform panning by specifying the direction.
     *
     * @param {PanDirection} direction - Specifies the direction in which the panning must be performed.
     * @param {PointerEvent | TouchEvent} mouseLocation - Specifies the location of the mouse pointer in maps in pixels.
     * @returns {void}
     */
    Maps.prototype.panByDirection = function (direction, mouseLocation) {
        if (!this.isDestroyed) {
            var xDiff = 0;
            var yDiff = 0;
            switch (direction) {
                case 'Left':
                    xDiff = -(this.mapAreaRect.width / 7);
                    break;
                case 'Right':
                    xDiff = (this.mapAreaRect.width / 7);
                    break;
                case 'Top':
                    yDiff = -(this.mapAreaRect.height / 7);
                    break;
                case 'Bottom':
                    yDiff = (this.mapAreaRect.height / 7);
                    break;
            }
            if (this.zoomModule) {
                this.zoomModule.panning(direction, xDiff, yDiff, mouseLocation);
            }
        }
    };
    /**
     * This method is used to add the layers dynamically to the maps.
     *
     * @param {object} layer - Specifies the layer to be added in the maps.
     * @returns {void}
     */
    Maps.prototype.addLayer = function (layer) {
        if (!this.isDestroyed) {
            var mapsLayer = this.layers;
            mapsLayer.push(layer);
            this.isAddLayer = true;
            this.layers = mapsLayer;
        }
    };
    /**
     * This method is used to remove a layer from the maps.
     *
     * @param {number} index - Specifies the index number of the layer to be removed.
     * @returns {void}
     */
    Maps.prototype.removeLayer = function (index) {
        if (!this.isDestroyed) {
            var mapsLayer = this.layers;
            mapsLayer.splice(index, 1);
            this.layers = mapsLayer;
        }
    };
    /**
     * This method is used to add markers dynamically in the maps.
     * If we provide the index value of the layer in which the marker to be added and the settings
     * of the marker as parameters, the marker will be added in the location.
     *
     * @param {number} layerIndex - Specifies the index number of the layer.
     * @param {MarkerSettingsModel[]} markerCollection - Specifies the settings of the marker to be added.
     * @returns {void}
     */
    Maps.prototype.addMarker = function (layerIndex, markerCollection) {
        if (!this.isDestroyed && !isNullOrUndefined(this.markerModule)) {
            if (!isNullOrUndefined(layerIndex) && !isNullOrUndefined(markerCollection)) {
                var layerEle = document.getElementById(this.element.id + '_LayerIndex_' + layerIndex);
                if (markerCollection.length > 0 && layerEle) {
                    for (var _i = 0, markerCollection_1 = markerCollection; _i < markerCollection_1.length; _i++) {
                        var newMarker = markerCollection_1[_i];
                        this.layersCollection[layerIndex].markerSettings.push(new MarkerSettings(this, 'markerSettings', newMarker));
                    }
                    this.markerModule.markerRender(this, layerEle, layerIndex, this.isTileMap ? this.tileZoomLevel : this.mapLayerPanel['currentFactor'], 'AddMarker');
                    this.arrangeTemplate();
                }
            }
            else {
                for (var i = 0; i < this.layers.length; i++) {
                    var layerEle = document.getElementById(this.element.id + '_LayerIndex_' + i);
                    this.markerModule.zoomedMarkerCluster[i] = [];
                    this.markerModule.initialMarkerCluster[i] = [];
                    this.markerModule.markerRender(this, layerEle, i, this.isTileMap ? this.tileZoomLevel : this.mapLayerPanel['currentFactor'], null);
                }
                this.arrangeTemplate();
            }
        }
    };
    /**
     * This method is used to select the geometric shape element in the maps.
     *
     * @param {number} layerIndex - Specifies the index of the layer in maps.
     * @param {string | string[]} propertyName - Specifies the property name from the data source.
     * @param {string} name - Specifies the name of the shape, which is mapped from the data source, that is selected.
     * @param {boolean} enable - Specifies whether the shape should be selected or the selection should be removed.
     * @returns {void}
     */
    Maps.prototype.shapeSelection = function (layerIndex, propertyName, name, enable) {
        if (!this.isDestroyed && !isNullOrUndefined(this.layers[layerIndex])) {
            var targetEle = void 0;
            var subLayerIndex = void 0;
            var popertyNameArray = Array.isArray(propertyName) ? propertyName : Array(propertyName);
            if (isNullOrUndefined(enable)) {
                enable = true;
            }
            var selectionsettings = this.layers[layerIndex].selectionSettings;
            if (!selectionsettings.enableMultiSelect && this.legendSelection && enable) {
                this.removeShapeSelection();
            }
            if (this.layers[layerIndex].type === 'SubLayer') {
                for (var i = 0; i < this.layersCollection.length; i++) {
                    if ((this.layersCollection[i].shapeData === this.layers[layerIndex].shapeData)) {
                        subLayerIndex = i;
                        break;
                    }
                }
            }
            if (!isNullOrUndefined(selectionsettings) && selectionsettings.enable) {
                var targetId = void 0;
                var dataIndex = void 0;
                var shapeIndex = void 0;
                var indexValue = void 0;
                /* eslint-disable @typescript-eslint/no-explicit-any */
                var shapeDataValue = void 0;
                var data = void 0;
                var shapeData = this.layers[layerIndex].shapeData['features'];
                /* eslint-enable @typescript-eslint/no-explicit-any */
                for (var i = 0; i < shapeData.length; i++) {
                    for (var j = 0; j < popertyNameArray.length; j++) {
                        var propertyName_1 = !isNullOrUndefined(shapeData[i]['properties'][popertyNameArray[j]])
                            && isNaN(shapeData[i]['properties'][popertyNameArray[j]]) ?
                            shapeData[i]['properties'][popertyNameArray[j]].toLowerCase() : shapeData[i]['properties'][popertyNameArray[j]];
                        var shapeName = !isNullOrUndefined(name) && typeof name === 'string' ? name.toLowerCase() : name;
                        var k = void 0;
                        if (propertyName_1 === shapeName) {
                            if (!isNullOrUndefined(this.layers[layerIndex].shapeSettings.colorValuePath)) {
                                k = checkShapeDataFields(
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                this.layers[layerIndex].dataSource, shapeData[i]['properties'], this.layers[layerIndex].shapeDataPath, this.layers[layerIndex].shapePropertyPath, this.layers[layerIndex]);
                            }
                            var baseLayer = this.layers[layerIndex];
                            if (this.baseLayerIndex >= 0 && baseLayer.isBaseLayer) {
                                indexValue = 0;
                            }
                            else if (this.layers[layerIndex].type === 'SubLayer') {
                                indexValue = subLayerIndex;
                            }
                            targetId = this.element.id + '_' + 'LayerIndex_' + indexValue + '_shapeIndex_' + i + '_dataIndex_' + k;
                            targetEle = getElement(targetId);
                            if (isNullOrUndefined(k) && isNullOrUndefined(targetEle)) {
                                targetId = this.element.id + '_' + 'LayerIndex_' + layerIndex + '_shapeIndex_' + i + '_dataIndex_null';
                                targetEle = getElement(targetId);
                            }
                            shapeIndex = parseInt(targetEle.id.split('_shapeIndex_')[1].split('_')[0], 10);
                            shapeDataValue = this.layers[layerIndex].shapeData['features']['length'] > shapeIndex ?
                                this.layers[layerIndex].shapeData['features'][shapeIndex]['properties'] : null;
                            dataIndex = parseInt(targetEle.id.split('_dataIndex_')[1].split('_')[0], 10);
                            data = isNullOrUndefined(dataIndex) ? null : this.layers[layerIndex].dataSource[dataIndex];
                            if (enable) {
                                triggerItemSelectionEvent(selectionsettings, this, targetEle, shapeDataValue, data);
                                this.shapeSelectionClass = getElement('ShapeselectionMap');
                                if (this.legendSettings.visible && targetEle.id.indexOf('_MarkerIndex_') === -1) {
                                    this.legendModule.shapeHighLightAndSelection(targetEle, data, selectionsettings, 'selection', layerIndex);
                                }
                                var shapeToggled = this.legendSettings.visible ? this.legendModule.shapeToggled : true;
                                if (shapeToggled) {
                                    targetEle.setAttribute('class', 'ShapeselectionMapStyle');
                                    if (this.selectedElementId.indexOf(targetEle.getAttribute('id')) === -1) {
                                        this.selectedElementId.push(targetEle.getAttribute('id'));
                                    }
                                    if (!selectionsettings.enableMultiSelect) {
                                        return;
                                    }
                                }
                            }
                            else {
                                this.legendSelection = (!selectionsettings.enableMultiSelect && !this.legendSelection) ?
                                    true : this.legendSelection;
                                if (this.legendSettings.visible && targetEle.id.indexOf('_MarkerIndex_') === -1 &&
                                    targetEle.getAttribute('class') === 'ShapeselectionMapStyle') {
                                    this.legendModule.shapeHighLightAndSelection(targetEle, data, selectionsettings, 'selection', layerIndex);
                                }
                                var shapeToggled = this.legendSettings.visible ? this.legendModule.shapeToggled : true;
                                if (shapeToggled) {
                                    removeClass(targetEle);
                                    var selectedElementIdIndex = this.selectedElementId.indexOf(targetEle.getAttribute('id'));
                                    if (selectedElementIdIndex !== -1) {
                                        this.selectedElementId.splice(selectedElementIdIndex, 1);
                                        if (!selectionsettings.enableMultiSelect && this.legendSelection
                                            && this.selectedElementId.length > 0) {
                                            this.removeShapeSelection();
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    /**
     * This method is used to zoom the maps based on the provided coordinates.
     *
     * @param {number} minLatitude - Specifies the minimum latitude of the location to be zoomed.
     * @param {number} minLongitude - Specifies the minimum latitude of the location to be zoomed.
     * @param {number} maxLatitude - Specifies the maximum latitude of the location to be zoomed.
     * @param {number} maxLongitude - Specifies the maximum longitude of the location to be zoomed.
     * @returns {void}
     */
    Maps.prototype.zoomToCoordinates = function (minLatitude, minLongitude, maxLatitude, maxLongitude) {
        var _a, _b;
        if (!this.isDestroyed) {
            this.isMarkerZoomCompleted = false;
            var centerLatitude = void 0;
            var centerLongtitude = void 0;
            var isTwoCoordinates = false;
            this.centerPosition = {
                latitude: null,
                longitude: null
            };
            this.isZoomByPosition = false;
            if (isNullOrUndefined(maxLatitude) && isNullOrUndefined(maxLongitude)
                || isNullOrUndefined(minLatitude) && isNullOrUndefined(minLongitude)) {
                minLatitude = isNullOrUndefined(minLatitude) ? 0 : minLatitude;
                minLongitude = isNullOrUndefined(minLatitude) ? 0 : minLongitude;
                maxLatitude = isNullOrUndefined(maxLatitude) ? minLatitude : maxLatitude;
                maxLongitude = isNullOrUndefined(maxLongitude) ? minLongitude : maxLongitude;
                isTwoCoordinates = true;
            }
            if (minLatitude > maxLatitude) {
                _a = [maxLatitude, minLatitude], minLatitude = _a[0], maxLatitude = _a[1];
            }
            if (minLongitude > maxLongitude) {
                _b = [maxLongitude, minLongitude], minLongitude = _b[0], maxLongitude = _b[1];
            }
            if (!isTwoCoordinates) {
                centerLatitude = (minLatitude + maxLatitude) / 2;
                centerLongtitude = (minLongitude + maxLongitude) / 2;
            }
            else {
                centerLatitude = (minLatitude + maxLatitude);
                centerLongtitude = (minLongitude + maxLongitude);
            }
            this.centerLatOfGivenLocation = centerLatitude;
            this.centerLongOfGivenLocation = centerLongtitude;
            this.minLatOfGivenLocation = minLatitude;
            this.minLongOfGivenLocation = minLongitude;
            this.maxLatOfGivenLocation = maxLatitude;
            this.maxLongOfGivenLocation = maxLongitude;
            this.zoomNotApplied = true;
            this.scaleOfGivenLocation = calculateZoomLevel(minLatitude, maxLatitude, minLongitude, maxLongitude, this.mapAreaRect.width, this.mapAreaRect.height, this, true);
            var minMaxLatitudeLongitude = this.getMinMaxLatitudeLongitude();
            var zoomArgs = {
                cancel: false, name: 'zoom', type: zoomIn, maps: this,
                tileTranslatePoint: {}, translatePoint: {},
                tileZoomLevel: this.isTileMap ? { previous: this.tileZoomLevel, current: this.scaleOfGivenLocation } : {},
                scale: !this.isTileMap ? { previous: this.scale, current: this.scaleOfGivenLocation } :
                    { previous: this.tileZoomLevel, current: this.scaleOfGivenLocation },
                minLatitude: minMaxLatitudeLongitude.minLatitude, maxLatitude: minMaxLatitudeLongitude.maxLatitude,
                minLongitude: minMaxLatitudeLongitude.minLongitude, maxLongitude: minMaxLatitudeLongitude.maxLongitude
            };
            this.trigger('zoom', zoomArgs);
            this.refresh();
        }
    };
    /**
     * This method is used to remove multiple selected shapes in the maps.
     *
     * @returns {void}
     */
    Maps.prototype.removeShapeSelection = function () {
        var selectedElements = this.selectedElementId.length;
        for (var i = 0; i < selectedElements; i++) {
            removeClass(getElementByID(this.selectedElementId[0]));
            this.selectedElementId.splice(0, 1);
        }
        if (this.legendSettings.visible) {
            var legendSelectedElements = this.legendSelectionCollection.length;
            for (var i = 0; i < legendSelectedElements; i++) {
                removeClass(getElementByID(this.legendSelectionCollection[i]['legendElement']['id']));
                this.selectedLegendElementId.splice(0, 1);
            }
        }
        this.shapeSelectionItem = [];
        this.legendSelectionCollection = [];
    };
    /**
     * This method is used to set culture for maps.
     *
     * @returns {void}
     */
    Maps.prototype.setCulture = function () {
        this.intl = new Internationalization();
        this.setLocaleConstants();
        this.localeObject = new L10n(this.getModuleName(), this.defaultLocalConstants, this.locale);
    };
    /**
     * This method to set locale constants to the maps.
     *
     * @returns {void}
     */
    Maps.prototype.setLocaleConstants = function () {
        // Need to modify after the api confirm
        this.defaultLocalConstants = {
            ZoomIn: 'Zoom in',
            Zoom: 'Zoom',
            ZoomOut: 'Zoom out',
            Pan: 'Pan',
            Reset: 'Reset',
            ImageNotFound: 'Image Not Found'
        };
    };
    /**
     * This method destroys the maps. This method removes the events associated with the maps and disposes the objects created for rendering and updating the maps.
     *
     * @returns {void}
     */
    Maps.prototype.destroy = function () {
        this.unWireEVents();
        if (!isNullOrUndefined(this.mapsTooltipModule)) {
            this.mapsTooltipModule.removeEventListener();
        }
        if (!isNullOrUndefined(this.zoomModule)) {
            this.zoomModule.removeEventListener();
        }
        if (!isNullOrUndefined(this.legendModule)) {
            this.legendModule.removeEventListener();
        }
        if (!isNullOrUndefined(this.selectionModule)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.selectionModule.removeEventListener();
        }
        if (!isNullOrUndefined(this.highlightModule)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.highlightModule.removeEventListener();
        }
        if (!isNullOrUndefined(this.bingMap)) {
            this.bingMap.destroy();
        }
        _super.prototype.destroy.call(this);
        this.shapeSelectionItem = [];
        this.toggledElementId = [];
        this.toggledLegendId = [];
        this.legendSelectionCollection = [];
        this.selectedLegendElementId = [];
        this.selectedNavigationElementId = [];
        this.selectedBubbleElementId = [];
        this.selectedMarkerElementId = [];
        this.selectedElementId = [];
        this.dataLabelShape = [];
        this.zoomShapeCollection = [];
        this.zoomLabelPositions = [];
        this.mouseDownEvent = { x: null, y: null };
        this.mouseClickEvent = { x: null, y: null };
        this.formatFunction = null;
        this.localeObject = null;
        this.defaultLocalConstants = null;
        this.intl = null;
        this.mapAreaRect = null;
        this.layersCollection = null;
        this.themeStyle = null;
        this.totalRect = null;
        this.baseSize = null;
        this.baseMapBounds = null;
        this.baseMapRectBounds = null;
        this.baseTranslatePoint = null;
        this.baseTileTranslatePoint = null;
        this.markerZoomCenterPoint = null;
        this.currentTiles = null;
        this.serverProcess = null;
        this.toolbarProperties = null;
        this.zoomLabelPositions = null;
        this.resizeEvent = null;
        this.availableSize = null;
        if (document.getElementById('mapsmeasuretext')) {
            document.getElementById('mapsmeasuretext').remove();
        }
        this.removeSvg();
        this.svgObject = null;
        this.mapLayerPanel = null;
        this.renderer = null;
        this.translatePoint = null;
        this.tileTranslatePoint = null;
        this.previousPoint = null;
        this.dataLabelShape = [];
        this.zoomShapeCollection = [];
        this.selectedElementId = [];
        this.selectedMarkerElementId = [];
        this.selectedBubbleElementId = [];
        this.shapeSelectionClass = null;
        this.markerSelectionClass = null;
        this.bubbleSelectionClass = null;
        this.navigationSelectionClass = null;
        this.selectedNavigationElementId = [];
        this.polygonSelectionClass = null;
        this.selectedPolygonElementId = [];
        this.legendSelectionClass = null;
        this.previousTranslate = null;
        this.initialTileTranslate = null;
        this.markerDragArgument = null;
    };
    /**
     * Gets component name.
     *
     * @returns {string} - Returns the string value
     * @private
     */
    Maps.prototype.getModuleName = function () {
        return 'maps';
    };
    /**
     * Gets the properties to be maintained in the persisted state.
     *
     * @returns {string} - Returns the string value
     * @private
     */
    Maps.prototype.getPersistData = function () {
        var keyEntity = ['translatePoint', 'zoomSettings', 'mapScaleValue', 'tileTranslatePoint', 'baseTranslatePoint',
            'scale', 'zoomPersistence', 'defaultState', 'markerZoomedState', 'initialCheck', 'initialZoomLevel', 'initialTileTranslate',
            'applyZoomReset', 'markerZoomFactor'];
        return this.addOnPersist(keyEntity);
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @param {MapsModel} newProp - Specifies the new property
     * @param {MapsModel} oldProp - Specifies the old property
     * @returns {void}
     * @private
     */
    Maps.prototype.onPropertyChanged = function (newProp, oldProp) {
        if (!this.isDestroyed) {
            var render = false;
            var isMarker = false;
            var isLayer = false;
            for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
                var prop = _a[_i];
                switch (prop) {
                    case 'background':
                        this.renderBorder();
                        break;
                    case 'height':
                    case 'width':
                    case 'layers':
                    case 'projectionType':
                    case 'centerPosition':
                    case 'legendSettings':
                    case 'baseLayerIndex':
                        if (prop === 'layers') {
                            isLayer = true;
                            var layerPropLength = Object.keys(newProp.layers).length;
                            for (var x = 0; x < layerPropLength; x++) {
                                if (!isNullOrUndefined(newProp.layers[x])) {
                                    var collection = Object.keys(newProp.layers[x]);
                                    for (var _b = 0, collection_1 = collection; _b < collection_1.length; _b++) {
                                        var collectionProp = collection_1[_b];
                                        if ((isNullOrUndefined(this.layers[x].shapeData)
                                            && !isNullOrUndefined(this.layers[x].urlTemplate) && this.layers[x].urlTemplate !== '')) {
                                            this.isReset = true;
                                        }
                                        else if (collectionProp === 'markerSettings') {
                                            isMarker = true;
                                        }
                                    }
                                }
                            }
                        }
                        render = true;
                        break;
                    case 'zoomSettings':
                        if (!isNullOrUndefined(oldProp.zoomSettings)) {
                            if (newProp.zoomSettings.zoomFactor !== oldProp.zoomSettings.zoomFactor && !isLayer) {
                                render = false;
                            }
                            else if (newProp.zoomSettings.shouldZoomInitially !== oldProp.zoomSettings.shouldZoomInitially) {
                                this.zoomSettings.zoomFactor = 1;
                                this.previousProjection = null;
                                this.scale = this.isMarkerZoomCompleted ? null : this.scale;
                                this.isMarkerZoomCompleted = !newProp.zoomSettings.shouldZoomInitially;
                                render = true;
                            }
                            else if (newProp.zoomSettings.enable !== oldProp.zoomSettings.enable) {
                                this.zoomSettings.zoomFactor = 1;
                                render = true;
                            }
                            else {
                                render = true;
                            }
                        }
                        break;
                    case 'locale':
                    case 'currencyCode':
                        _super.prototype.refresh.call(this);
                        break;
                }
            }
            if (render) {
                if (newProp.layers && isMarker) {
                    removeElement(this.element.id + '_Markers_Group');
                    if (this.isTileMap) {
                        this.mapLayerPanel.renderTileLayer(this.mapLayerPanel, this.layers['currentFactor'], (this.layers.length - 1));
                    }
                    else {
                        this.render();
                    }
                }
                else {
                    this.createSVG();
                    this.renderElements();
                }
            }
        }
    };
    /**
     * To provide the array of modules needed for maps rendering.
     *
     * @returns {ModuleDeclaration[]} - Returns the modules
     * @private
     */
    Maps.prototype.requiredModules = function () {
        var modules = [];
        var isVisible = this.findVisibleLayers(this.layers);
        var annotationEnable = false;
        this.annotations.map(function (annotation) {
            annotationEnable = annotation.content != null;
        });
        if (this.isBubbleVisible()) {
            modules.push({
                member: 'Bubble',
                args: [this],
                name: 'Bubble'
            });
        }
        if (isVisible.highlight) {
            modules.push({
                member: 'Highlight',
                args: [this],
                name: 'Highlight'
            });
        }
        if (isVisible.selection) {
            modules.push({
                member: 'Selection',
                args: [this],
                name: 'Selection'
            });
        }
        if (this.legendSettings.visible) {
            modules.push({
                member: 'Legend',
                args: [this],
                name: 'Legend'
            });
        }
        if (this.zoomSettings.enable || this.zoomSettings.zoomFactor > this.zoomSettings.minZoom) {
            modules.push({
                member: 'Zoom',
                args: [this],
                name: 'Zoom'
            });
        }
        if (this.isMarkersVisible()) {
            modules.push({
                member: 'Marker',
                args: [this],
                name: 'Marker'
            });
        }
        if (this.isDataLabelVisible()) {
            modules.push({
                member: 'DataLabel',
                args: [this],
                name: 'DataLabel'
            });
        }
        if (this.isNavigationVisible()) {
            modules.push({
                member: 'NavigationLine',
                args: [this],
                name: 'NavigationLine'
            });
        }
        if (this.isPolygonVisible()) {
            modules.push({
                member: 'Polygon',
                args: [this],
                name: 'Polygon'
            });
        }
        if (isVisible.tooltip) {
            modules.push({
                member: 'MapsTooltip',
                args: [this],
                name: 'MapsTooltip'
            });
        }
        if (annotationEnable) {
            modules.push({
                member: 'Annotations',
                args: [this, Annotations],
                name: 'Annotations'
            });
        }
        if (this.allowPrint) {
            modules.push({
                member: 'Print',
                args: [this],
                name: 'Print'
            });
        }
        if (this.allowImageExport) {
            modules.push({
                member: 'ImageExport',
                args: [this],
                name: 'ImageExport'
            });
        }
        if (this.allowPdfExport) {
            modules.push({
                member: 'PdfExport',
                args: [this],
                name: 'PdfExport'
            });
        }
        return modules;
    };
    /**
     * To find marker visibility.
     *
     * @returns {boolean} - Returns whether the markers are visible or not.
     */
    Maps.prototype.isMarkersVisible = function () {
        var isVisible = false;
        Array.prototype.forEach.call(this.layers, function (layer) {
            for (var i = 0; i < layer.markerSettings.length; i++) {
                if (layer.markerSettings[i].visible) {
                    isVisible = true;
                    break;
                }
            }
        });
        return isVisible;
    };
    /**
     * To find DataLabel visibility.
     *
     * @returns {boolean} - Returns whether the data labels are visible or not.
     */
    Maps.prototype.isDataLabelVisible = function () {
        var isVisible = false;
        for (var i = 0; i < this.layers.length; i++) {
            if (this.layers[i].dataLabelSettings.visible) {
                isVisible = true;
                break;
            }
        }
        return isVisible;
    };
    /**
     * To find navigation line visibility.
     *
     * @returns {boolean} - Returns whether the navigation lines are visible or not.
     */
    Maps.prototype.isNavigationVisible = function () {
        var isVisible = false;
        Array.prototype.forEach.call(this.layers, function (layer) {
            for (var i = 0; i < layer.navigationLineSettings.length; i++) {
                if (layer.navigationLineSettings[i].visible) {
                    isVisible = true;
                    break;
                }
            }
        });
        return isVisible;
    };
    /**
     * To find navigation line visibility.
     *
     * @returns {boolean} - Returns whether the navigation lines are visible or not.
     */
    Maps.prototype.isPolygonVisible = function () {
        var isVisible = false;
        Array.prototype.forEach.call(this.layers, function (layer) {
            for (var i = 0; i < layer.polygonSettings.polygons.length; i++) {
                if (layer.polygonSettings.polygons.length > 0) {
                    isVisible = true;
                    break;
                }
            }
        });
        return isVisible;
    };
    /**
     * To find marker visibility.
     *
     * @returns {boolean} - Returns whether the bubble is visible or not.
     */
    Maps.prototype.isBubbleVisible = function () {
        var isVisible = false;
        for (var _i = 0, _a = this.layers; _i < _a.length; _i++) {
            var layer = _a[_i];
            if (this.getBubbleVisible(layer)) {
                isVisible = true;
                break;
            }
        }
        return isVisible;
    };
    /**
     * To find the bubble visibility from layer.
     *
     * @param {LayerSettingsModel} layer - Spcifies the layer settings model
     * @returns {boolean} - Returns the boolean value
     * @private
     */
    Maps.prototype.getBubbleVisible = function (layer) {
        var isVisible = false;
        for (var _i = 0, _a = layer.bubbleSettings; _i < _a.length; _i++) {
            var bubble = _a[_i];
            if (bubble.visible) {
                isVisible = true;
                break;
            }
        }
        return isVisible;
    };
    /**
     * This method handles the printing functionality for the maps.
     *
     * @param {string[] | string | Element} id - Specifies the element to be printed.
     * @returns {void}
     */
    Maps.prototype.print = function (id) {
        if ((this.allowPrint) && (this.printModule) && !this.isDestroyed) {
            this.printModule.print(this, id);
        }
    };
    /**
     * This method handles the export functionality for the maps.
     *
     * @param {ExportType} type - Specifies the type of the exported file.
     * @param {string} fileName - Specifies the name of the file with which the rendered maps need to be exported.
     * @param {PdfPageOrientation} orientation - Specifies the orientation of the PDF document while exporting.
     * @param {boolean} allowDownload - Specifies whether to download as a file or get as base64 string for the file.
     * @returns {Promise<string>} - Specifies the base64 string of the exported image which is returned when the `allowDownload` is set to false.
     */
    Maps.prototype.export = function (type, fileName, orientation, allowDownload) {
        var _this = this;
        if (!this.isDestroyed) {
            if (isNullOrUndefined(allowDownload)) {
                allowDownload = true;
            }
            if ((type !== 'PDF') && (this.allowImageExport) && (this.imageExportModule)) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                return new Promise(function (resolve) {
                    resolve(_this.imageExportModule.export(_this, type, fileName, allowDownload));
                });
            }
            else if ((this.allowPdfExport) && (this.pdfExportModule)) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                return new Promise(function (resolve) {
                    resolve(_this.pdfExportModule.export(_this, type, fileName, allowDownload, orientation));
                });
            }
        }
        return null;
    };
    /**
     * This method is used to get the Bing maps URL.
     *
     * @param {string} url - Specifies the URL of the Bing maps along with the API key.
     * @returns {Promise<string>} - Returns the processed Bing URL as `Promise`.
     */
    Maps.prototype.getBingUrlTemplate = function (url) {
        var promise;
        if (!this.isDestroyed) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            promise = new Promise(function (resolve) {
                var fetchApi = new Fetch({
                    url: url
                }); // eslint-disable-next-line @typescript-eslint/no-explicit-any
                fetchApi.onSuccess = function (json) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    var resource = json['resourceSets'][0]['resources'][0];
                    resolve(resource['imageUrl']);
                };
                fetchApi.send();
            });
        }
        return promise;
    };
    /**
     * To find visibility of layers and markers for required modules load.
     *
     * @param {LayerSettingsModel[]} layers - Specifies the layers.
     * @param {boolean} isLayerVisible - Specifies whether the layer is visible or not.
     * @param {boolean} isBubblevisible - Specifies whether the bubble is visible or not.
     * @param {boolean} istooltipVisible - Specifies whether the tooltip is visible or not.
     * @param {boolean} isSelection - Specifies whether the shape is selectd or not.
     * @param {boolean} isHighlight - Specfies whether the shape is highlighted or not.
     * @returns {object} - Returns the boolean values in object.
     */
    Maps.prototype.findVisibleLayers = function (layers, isLayerVisible, isBubblevisible, istooltipVisible, isSelection, isHighlight) {
        if (isLayerVisible === void 0) { isLayerVisible = false; }
        if (isBubblevisible === void 0) { isBubblevisible = false; }
        if (istooltipVisible === void 0) { istooltipVisible = false; }
        if (isSelection === void 0) { isSelection = false; }
        if (isHighlight === void 0) { isHighlight = false; }
        var bubbles;
        var markers;
        var polygonSetting;
        for (var _i = 0, layers_1 = layers; _i < layers_1.length; _i++) {
            var layer = layers_1[_i];
            isLayerVisible = layer.visible || isLayerVisible;
            if (layer.visible) {
                bubbles = layer.bubbleSettings;
                markers = layer.markerSettings;
                polygonSetting = layer.polygonSettings;
                var navigationLine = layer.navigationLineSettings;
                for (var _a = 0, navigationLine_1 = navigationLine; _a < navigationLine_1.length; _a++) {
                    var navigation = navigationLine_1[_a];
                    if (navigation.visible) {
                        isSelection = (!isNullOrUndefined(navigation.highlightSettings) &&
                            navigation.highlightSettings.enable) || isSelection;
                        isHighlight = (!isNullOrUndefined(navigation.selectionSettings) &&
                            navigation.selectionSettings.enable) || isHighlight;
                    }
                }
                for (var _b = 0, _c = polygonSetting.polygons; _b < _c.length; _b++) {
                    var polygon = _c[_b];
                    if (!isNullOrUndefined(polygon.points) && polygon.points.length > 0) {
                        isSelection = layer.polygonSettings.highlightSettings.enable || isSelection;
                        isHighlight = layer.polygonSettings.selectionSettings.enable || isHighlight;
                        istooltipVisible = layer.polygonSettings.tooltipSettings.visible || istooltipVisible;
                    }
                }
                for (var _d = 0, markers_1 = markers; _d < markers_1.length; _d++) {
                    var marker = markers_1[_d];
                    if (marker.visible) {
                        istooltipVisible = marker.tooltipSettings.visible || istooltipVisible;
                        isSelection = marker.selectionSettings.enable || isSelection;
                        isHighlight = marker.highlightSettings.enable || isHighlight;
                    }
                    if (istooltipVisible) {
                        break;
                    }
                }
                for (var _e = 0, bubbles_1 = bubbles; _e < bubbles_1.length; _e++) {
                    var bubble = bubbles_1[_e];
                    if (bubble.visible) {
                        istooltipVisible = bubble.tooltipSettings.visible || istooltipVisible;
                        isSelection = bubble.selectionSettings.enable || isSelection;
                        isHighlight = bubble.highlightSettings.enable || isHighlight;
                    }
                    if (istooltipVisible) {
                        break;
                    }
                }
                istooltipVisible = layer.tooltipSettings.visible || istooltipVisible;
                isSelection = layer.selectionSettings.enable || isSelection;
                isHighlight = layer.highlightSettings.enable || isHighlight;
            }
            if (isLayerVisible && isBubblevisible && istooltipVisible) {
                break;
            }
        }
        return {
            layer: isLayerVisible, bubble: isBubblevisible, tooltip: istooltipVisible,
            selection: isSelection, highlight: isHighlight
        };
    };
    /**
     * This method is used to get the geographical coordinates for location points in pixels when shape maps are rendered in the maps.
     *
     * @param {number} layerIndex - Specifies the index number of the layer of the maps.
     * @param {number} x - Specifies the x value in pixel.
     * @param {number} y - Specifies the y value in pixel.
     * @returns {GeoPosition}- Returns the geographical coordinates.
     */
    Maps.prototype.getGeoLocation = function (layerIndex, x, y) {
        var latitude = null;
        var longitude = null;
        if (!this.isDestroyed && !this.isTileMap) {
            var container = document.getElementById(this.element.id);
            var elementClientRect = this.element.getBoundingClientRect();
            var pageX = x - container.offsetLeft - (elementClientRect.left - container.offsetLeft) - window.scrollX;
            var pageY = y - container.offsetTop - (elementClientRect.top - container.offsetTop) - window.scrollY;
            var currentLayer = this.layersCollection[layerIndex];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var translate = getTranslate(this, currentLayer, false);
            var translatePoint = translate['location'];
            var translatePointX = translatePoint.x * this.scale;
            var translatePointY = translatePoint.y * this.scale;
            var mapSize = (Math.min(this.mapAreaRect.height, this.mapAreaRect.width)
                * this.mapLayerPanel['currentFactor']) * this.scale;
            var xx = (this.clip(pageX - translatePointX, 0, mapSize - 1) / mapSize) - 0.5;
            var yy = 0.5 - (this.clip(pageY - translatePointY, 0, mapSize - 1) / mapSize);
            latitude = 90 - 360 * Math.atan(Math.exp(-yy * 2 * Math.PI)) / Math.PI;
            longitude = 360 * xx;
        }
        return { latitude: latitude, longitude: longitude };
    };
    Maps.prototype.clip = function (value, minVal, maxVal) {
        return Math.min(Math.max(value, minVal), maxVal);
    };
    /**
     * This method is used to get the geographical coordinates for location points in pixels when an online map provider is rendered in the maps.
     *
     * @param {number} x - Specifies the x value in pixel.
     * @param {number} y - Specifies the y value in pixel.
     * @returns {GeoPosition} - Returns the geographical coordinates.
     */
    Maps.prototype.getTileGeoLocation = function (x, y) {
        var latitude = null;
        var longitude = null;
        if (this.isTileMap) {
            var element = document.getElementById(this.element.id + '_tile_parent');
            if (!this.isDestroyed && !isNullOrUndefined(element)) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var latLong = this.pointToLatLong(x + this.mapAreaRect.x - element.offsetLeft, y + this.mapAreaRect.y - element.offsetTop);
                latitude = latLong['latitude'];
                longitude = latLong['longitude'];
            }
        }
        return { latitude: latitude, longitude: longitude };
    };
    /**
     * This method is used to convert the point in pixels to latitude and longitude in maps.
     *
     * @param {number} pageX - Specifies the x position value in pixels.
     * @param {number} pageY - Specifies the y position value in pixels.
     * @returns {object} - Returns the latitude and longitude values.
     */
    Maps.prototype.pointToLatLong = function (pageX, pageY) {
        var latitude = 0;
        var longitude = 0;
        if (!this.isDestroyed && !isNullOrUndefined(this.translatePoint)) {
            var padding = 10;
            pageY = !isNullOrUndefined(this.markerDragArgument) ? pageY + padding : pageY;
            var mapSize = 256 * Math.pow(2, this.tileZoomLevel);
            var x1 = (this.clip(pageX - (this.translatePoint.x * this.scale), 0, mapSize - 1) / mapSize) - 0.5;
            var y1 = 0.5 - (this.clip(pageY - (this.translatePoint.y * this.scale), 0, mapSize - 1) / mapSize);
            latitude = 90 - 360 * Math.atan(Math.exp(-y1 * 2 * Math.PI)) / Math.PI;
            longitude = 360 * x1;
        }
        return { latitude: latitude, longitude: longitude };
    };
    __decorate([
        Property(null)
    ], Maps.prototype, "background", void 0);
    __decorate([
        Property(false)
    ], Maps.prototype, "useGroupingSeparator", void 0);
    __decorate([
        Property(null)
    ], Maps.prototype, "format", void 0);
    __decorate([
        Property(null)
    ], Maps.prototype, "width", void 0);
    __decorate([
        Property(null)
    ], Maps.prototype, "height", void 0);
    __decorate([
        Property('MouseMove')
    ], Maps.prototype, "tooltipDisplayMode", void 0);
    __decorate([
        Property(false)
    ], Maps.prototype, "allowPrint", void 0);
    __decorate([
        Property(false)
    ], Maps.prototype, "allowImageExport", void 0);
    __decorate([
        Property(false)
    ], Maps.prototype, "allowPdfExport", void 0);
    __decorate([
        Complex({}, TitleSettings)
    ], Maps.prototype, "titleSettings", void 0);
    __decorate([
        Complex({}, ZoomSettings)
    ], Maps.prototype, "zoomSettings", void 0);
    __decorate([
        Complex({}, LegendSettings)
    ], Maps.prototype, "legendSettings", void 0);
    __decorate([
        Collection([], LayerSettings)
    ], Maps.prototype, "layers", void 0);
    __decorate([
        Collection([], Annotation)
    ], Maps.prototype, "annotations", void 0);
    __decorate([
        Complex({}, Margin)
    ], Maps.prototype, "margin", void 0);
    __decorate([
        Complex({ color: '#DDDDDD', width: 0 }, Border)
    ], Maps.prototype, "border", void 0);
    __decorate([
        Property('Material')
    ], Maps.prototype, "theme", void 0);
    __decorate([
        Property('Mercator')
    ], Maps.prototype, "projectionType", void 0);
    __decorate([
        Property(0)
    ], Maps.prototype, "baseLayerIndex", void 0);
    __decorate([
        Property(null)
    ], Maps.prototype, "description", void 0);
    __decorate([
        Property(0)
    ], Maps.prototype, "tabIndex", void 0);
    __decorate([
        Complex({ latitude: null, longitude: null }, CenterPosition)
    ], Maps.prototype, "centerPosition", void 0);
    __decorate([
        Complex({}, MapsAreaSettings)
    ], Maps.prototype, "mapsArea", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "load", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "beforePrint", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "loaded", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "click", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "onclick", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "doubleClick", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "rightClick", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "resize", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "tooltipRender", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "legendRendering", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "tooltipRenderComplete", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "shapeSelected", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "itemSelection", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "itemHighlight", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "shapeHighlight", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "layerRendering", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "shapeRendering", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "markerRendering", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "markerClusterRendering", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "markerClick", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "markerDragStart", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "markerDragEnd", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "markerClusterClick", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "markerClusterMouseMove", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "markerMouseMove", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "mouseMove", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "dataLabelRendering", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "bubbleRendering", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "bubbleClick", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "bubbleMouseMove", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "animationComplete", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "annotationRendering", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "zoom", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "pan", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "panComplete", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "zoomComplete", void 0);
    Maps = __decorate([
        NotifyPropertyChanges
    ], Maps);
    return Maps;
}(Component));
export { Maps };
