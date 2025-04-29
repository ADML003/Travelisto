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
/* eslint-disable max-len */
/**
 * Helper functions for maps control
 */
import { createElement, isNullOrUndefined, remove, compile as templateComplier, merge, SanitizeHtmlHelper } from '@syncfusion/ej2-base';
import { Animation, animationMode } from '@syncfusion/ej2-base';
import { SvgRenderer } from '@syncfusion/ej2-svg-base';
import { itemSelection } from '../../index';
import { animationComplete } from '../index';
import { markerClusterRendering } from '../index';
/**
 * Specifies the size information of an element.
 */
var Size = /** @class */ (function () {
    function Size(width, height) {
        this.width = width;
        this.height = height;
    }
    return Size;
}());
export { Size };
/**
 * To find number from string.
 *
 * @param {string} value Specifies the value
 * @param {number} containerSize Specifies the container size
 * @returns {number} Returns the number
 * @private
 */
export function stringToNumber(value, containerSize) {
    if (typeof value !== 'string') {
        return value;
    }
    if (!isNullOrUndefined(value)) {
        return value.indexOf('%') !== -1 ? (containerSize / 100) * parseInt(value, 10) : parseInt(value, 10);
    }
    return null;
}
/**
 * Method to calculate the width and height of the maps.
 *
 * @param {Maps} maps Specifies the maps instance
 * @returns {void}
 * @private
 */
export function calculateSize(maps) {
    maps.element.style.height = !isNullOrUndefined(maps.height) ? maps.height : 'auto';
    maps.element.style.width = !isNullOrUndefined(maps.width) ? maps.width : 'auto';
    maps.element.style.setProperty('display', 'block');
    var containerWidth = maps.element.clientWidth;
    var containerHeight = maps.element.clientHeight;
    var containerElementWidth = (typeof maps.element.style.width === 'string') ?
        stringToNumber(maps.element.style.width, containerWidth) : maps.element.style.width;
    var containerElementHeight = (typeof maps.element.style.height === 'string') ?
        stringToNumber(maps.element.style.height, containerHeight) : maps.element.style.height;
    var availableSize = new Size(0, 0);
    if (maps.width === '0px' || maps.width === '0%' || maps.height === '0%' || maps.height === '0px') {
        availableSize = new Size(0, 0);
    }
    else {
        availableSize = new Size(stringToNumber(maps.width, containerWidth) || containerWidth || containerElementWidth || 600, stringToNumber(maps.height, containerHeight) || containerHeight || containerElementHeight || (maps.isDevice ?
            Math.min(window.innerWidth, window.innerHeight) : 450));
    }
    return availableSize;
}
/**
 * Method to create svg for maps.
 *
 * @param {Maps} maps Specifies the map instance
 * @returns {void}
 * @private
 */
export function createSvg(maps) {
    maps.renderer = new SvgRenderer(maps.element.id);
    maps.availableSize = calculateSize(maps);
    maps.svgObject = maps.renderer.createSvg({
        id: maps.element.id + '_svg',
        width: maps.availableSize.width,
        height: maps.availableSize.height
    });
    if (maps.width === '0px' || maps.width === '0%' || maps.height === '0%' || maps.height === '0px') {
        maps.svgObject.setAttribute('height', '0');
        maps.svgObject.setAttribute('width', '0');
    }
}
/**
 * Method to get the mouse position.
 *
 * @param {number} pageX - Specifies the pageX.
 * @param {number} pageY - Specifies the pageY.
 * @param {Element} element - Specifies the element.
 * @returns {MapLocation} - Returns the location.
 * @private
 */
export function getMousePosition(pageX, pageY, element) {
    var elementRect = element.getBoundingClientRect();
    var pageXOffset = element.ownerDocument.defaultView.pageXOffset;
    var pageYOffset = element.ownerDocument.defaultView.pageYOffset;
    var clientTop = element.ownerDocument.documentElement.clientTop;
    var clientLeft = element.ownerDocument.documentElement.clientLeft;
    var positionX = elementRect.left + pageXOffset - clientLeft;
    var positionY = elementRect.top + pageYOffset - clientTop;
    return new MapLocation((pageX - positionX), (pageY - positionY));
}
/**
 * Method to convert degrees to radians.
 *
 * @param {number} deg Specifies the degree value
 * @returns {number} Returns the number
 * @private
 */
export function degreesToRadians(deg) {
    return deg * (Math.PI / 180);
}
/**
 * Convert radians to degrees method.
 *
 * @param {number} radian Specifies the radian value
 * @returns {number} Returns the number
 * @private
 */
export function radiansToDegrees(radian) {
    return radian * (180 / Math.PI);
}
/**
 * Method for converting from latitude and longitude values to points.
 *
 * @param {number} latitude - Specifies the latitude.
 * @param {number} longitude - Specifies the longitude.
 * @param {number} factor - Specifies the factor.
 * @param {LayerSettings} layer - Specifies the layer settings.
 * @param {Maps} mapModel - Specifies the maps.
 * @returns {Point} - Returns the point values.
 * @private
 */
export function convertGeoToPoint(latitude, longitude, factor, layer, mapModel) {
    var mapSize = new Size(mapModel.mapAreaRect.width, mapModel.mapAreaRect.height);
    var x;
    var y;
    var value;
    var lat;
    var lng;
    var temp;
    var longitudeMinMax = mapModel.baseMapBounds.longitude;
    var latitudeMinMax = mapModel.baseMapBounds.latitude;
    var latRadian = degreesToRadians(latitude);
    var lngRadian = degreesToRadians(longitude);
    var type = !isNullOrUndefined(mapModel.projectionType) ? mapModel.projectionType : 'Mercator';
    var size = (mapModel.isTileMap) ? Math.pow(2, 1) * 256 : (isNullOrUndefined(factor)) ?
        Math.min(mapSize.width, mapSize.height) : (Math.min(mapSize.width, mapSize.height) * factor);
    if (layer.geometryType === 'Normal') {
        x = isNullOrUndefined(factor) ? longitude : Math.abs((longitude - longitudeMinMax.min) * factor);
        y = isNullOrUndefined(factor) ? latitude : Math.abs((latitudeMinMax.max - latitude) * factor);
    }
    else if (layer.geometryType === 'Geographic') {
        switch (type) {
            case 'Mercator': {
                var pixelOrigin = new Point(size / 2, size / 2);
                x = pixelOrigin.x + longitude * (size / 360);
                var sinY = calculateBound(Math.sin(degreesToRadians(latitude)), -0.9999, 0.9999);
                y = pixelOrigin.y + 0.5 * (Math.log((1 + sinY) / (1 - sinY))) * (-(size / (2 * Math.PI)));
                break;
            }
            case 'Winkel3':
                value = aitoff(lngRadian, latRadian);
                lng = (value.x + lngRadian / (Math.PI / 2)) / 2;
                lat = (value.y + latRadian) / 2;
                break;
            case 'Miller':
                lng = lngRadian;
                lat = (1.25 * Math.log(Math.tan((Math.PI / 4) + (.4 * latRadian))));
                break;
            case 'Eckert3':
                temp = Math.sqrt(Math.PI * (4 + Math.PI));
                lng = 2 / temp * lngRadian * (1 + Math.sqrt(1 - 4 * latRadian * latRadian / (Math.PI * Math.PI)));
                lat = 4 / temp * latRadian;
                break;
            case 'AitOff':
                value = aitoff(lngRadian, latRadian);
                lng = value.x;
                lat = value.y;
                break;
            case 'Eckert5':
                lng = lngRadian * (1 + Math.cos(latRadian)) / Math.sqrt(2 + Math.PI);
                lat = 2 * latRadian / Math.sqrt(2 + Math.PI);
                break;
            case 'Equirectangular':
                lng = lngRadian;
                lat = latRadian;
                break;
            case 'Eckert6': {
                var epsilon = 1e-6;
                temp = (1 + (Math.PI / 2)) * Math.sin(latRadian);
                var delta = Infinity;
                for (var i = 0; i < 10 && Math.abs(delta) > epsilon; i++) {
                    delta = (latRadian + (Math.sin(latRadian)) - temp) / (1 + Math.cos(latRadian));
                    latRadian = latRadian - delta;
                }
                temp = Math.sqrt(2 + Math.PI);
                lng = lngRadian * (1 + Math.cos(latRadian)) / temp;
                lat = 2 * latRadian / temp;
                break;
            }
        }
        x = (type === 'Mercator') ? x : roundTo(xToCoordinate(mapModel, radiansToDegrees(lng)), 3);
        y = (type === 'Mercator') ? y : (-(roundTo(yToCoordinate(mapModel, radiansToDegrees(lat)), 3)));
    }
    return new Point(x, y);
}
/**
 * @param {Maps} maps - Specifies the map control.
 * @param {number} factor - Specifies the factor.
 * @param {LayerSettings} currentLayer - Specifies the current layer.
 * @param {Coordinate} markerData - Specifies the marker data.
 * @returns {string} - Returns the path.
 * @private
 */
export function calculatePolygonPath(maps, factor, currentLayer, markerData) {
    var path = '';
    if (!isNullOrUndefined(markerData) && markerData.length > 1) {
        Array.prototype.forEach.call(markerData, function (data, dataIndex) {
            var lat = data.latitude;
            var lng = data.longitude;
            var location = (maps.isTileMap) ? convertTileLatLongToPoint(new MapLocation(lng, lat), factor, maps.tileTranslatePoint, true) : convertGeoToPoint(lat, lng, factor, currentLayer, maps);
            if (dataIndex === 0) {
                path += 'M ' + location.x + ' ' + location.y;
            }
            else {
                path += ' L ' + location.x + ' ' + location.y;
            }
        });
        path += ' z ';
    }
    return path;
}
/**
 * Converting tile latitude and longitude to point.
 *
 * @param {MapLocation} center Specifies the map center location
 * @param {number} zoomLevel Specifies the zoom level
 * @param {MapLocation} tileTranslatePoint Specifies the tile translate point
 * @param {boolean} isMapCoordinates Specifies the boolean value
 * @returns {MapLocation} Returns the location value
 * @private
 */
export function convertTileLatLongToPoint(center, zoomLevel, tileTranslatePoint, isMapCoordinates) {
    var size = Math.pow(2, zoomLevel) * 256;
    var x = (center.x + 180) / 360;
    var sinLatitude = Math.sin(center.y * Math.PI / 180);
    var y = 0.5 - Math.log((1 + sinLatitude) / (1 - sinLatitude)) / (4 * Math.PI);
    var pixelX = center.x;
    var pixelY = center.y;
    if (isMapCoordinates) {
        pixelX = (x * size + 0.5) + tileTranslatePoint.x;
        pixelY = (y * size + 0.5) + tileTranslatePoint.y;
    }
    return { x: pixelX, y: pixelY };
}
/**
 * Method for calculate x point.
 *
 * @param {Maps} mapObject - Specifies the maps.
 * @param {number} val - Specifies the value.
 * @returns {number} - Returns the number.
 * @private
 */
export function xToCoordinate(mapObject, val) {
    var longitudeMinMax = mapObject.baseMapBounds.longitude;
    var totalSize = isNullOrUndefined(mapObject.baseSize) ? mapObject.mapAreaRect.width : mapObject.mapAreaRect.width +
        (Math.abs(mapObject.baseSize.width - mapObject.mapAreaRect.width) / 2);
    return Math.round(totalSize * (val - longitudeMinMax.min) / (longitudeMinMax.max - longitudeMinMax.min) * 100) / 100;
}
/**
 * Method for calculate y point.
 *
 * @param {Maps} mapObject - Specifies the maps.
 * @param {number} val - Specifies the value.
 * @returns {number} - Returns the number.
 * @private
 */
export function yToCoordinate(mapObject, val) {
    var latitudeMinMax = mapObject.baseMapBounds.latitude;
    return Math.round(mapObject.mapAreaRect.height * (val - latitudeMinMax.min) / (latitudeMinMax.max - latitudeMinMax.min) * 100) / 100;
}
/**
 * Method for calculate aitoff projection.
 *
 * @param {number} x - Specifies the x value.
 * @param {number} y - Specifies the y value.
 * @returns {Point} - Returns the point value.
 * @private
 */
export function aitoff(x, y) {
    var cosy = Math.cos(y);
    var sincia = sinci(acos(cosy * Math.cos(x /= 2)));
    return new Point(2 * cosy * Math.sin(x) * sincia, Math.sin(y) * sincia);
}
/**
 * Method to round the number.
 *
 * @param {number} a - Specifies the a value
 * @param {number} b - Specifies the b value
 * @returns {number} - Returns the number
 * @private
 */
export function roundTo(a, b) {
    var c = Math.pow(10, b);
    return (Math.round(a * c) / c);
}
/**
 *
 * @param {number} x - Specifies the x value
 * @returns {number} - Returns the number
 * @private
 */
export function sinci(x) {
    return x / Math.sin(x);
}
/**
 *
 * @param {number} a - Specifies the a value
 * @returns {number} - Returns the number
 * @private
 */
export function acos(a) {
    return Math.acos(a);
}
/**
 * Method to calculate bound.
 *
 * @param {number} value Specifies the value
 * @param {number} min Specifies the minimum value
 * @param {number} max Specifies the maximum value
 * @returns {number} Returns the value
 * @private
 */
export function calculateBound(value, min, max) {
    if (!isNullOrUndefined(min)) {
        value = Math.max(value, min);
    }
    if (!(isNullOrUndefined(max))) {
        value = Math.min(value, max);
    }
    return value;
}
/**
 * To trigger the download element.
 *
 * @param {string} fileName Specifies the file name
 * @param {ExportType} type Specifies the type
 * @param {string} url Specifies the url
 * @param {boolean} isDownload Specifies whether download a file.
 * @returns {void}
 * @private
 */
export function triggerDownload(fileName, type, url, isDownload) {
    createElement('a', {
        attrs: {
            'download': fileName + '.' + type.toLocaleLowerCase(),
            'href': url
        }
    }).dispatchEvent(new MouseEvent(isDownload ? 'click' : 'move', {
        view: window,
        bubbles: false,
        cancelable: true
    }));
}
/**
 * Specifies the information of the position of the point in maps.
 */
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
}());
export { Point };
/**
 * Specifies the position of the legend on the map, with options to set the
 * position values as percentages. The legend is placed relative to the Maps,
 * ensuring responsiveness.
 */
var RelativePoint = /** @class */ (function () {
    function RelativePoint(x, y) {
        this.x = x;
        this.y = y;
    }
    return RelativePoint;
}());
export { RelativePoint };
/**
 * Defines the latitude and longitude values that define a map location.
 */
var Coordinate = /** @class */ (function () {
    function Coordinate(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }
    return Coordinate;
}());
export { Coordinate };
/**
 * Map internal class for min and max
 *
 */
var MinMax = /** @class */ (function () {
    function MinMax(min, max) {
        this.min = min;
        this.max = max;
    }
    return MinMax;
}());
export { MinMax };
/**
 * Map internal class locations
 */
var GeoLocation = /** @class */ (function () {
    function GeoLocation(latitude, longitude) {
        this.latitude = new MinMax(latitude.min, latitude.max);
        this.longitude = new MinMax(longitude.min, longitude.max);
    }
    return GeoLocation;
}());
export { GeoLocation };
/**
 * Function to measure the height and width of the text.
 *
 * @param  {string} text Specifies the text
 * @param  {FontModel} font Specifies the font
 * @returns {Size} Returns the size
 * @private
 */
export function measureText(text, font) {
    var measureObject = document.getElementById('mapsmeasuretext');
    if (measureObject === null) {
        measureObject = document.createElement('text');
        measureObject.id = 'mapsmeasuretext';
        document.body.appendChild(measureObject);
    }
    measureObject.innerText = text;
    measureObject.style.cssText = 'position: absolute; font-size: ' + (typeof (font.size) === 'number' ? (font.size + 'px') : font.size) +
        '; font-weight: ' + font.fontWeight + '; font-style: ' + font.fontStyle + '; font-family: ' + font.fontFamily +
        '; visibility: hidden; top: -100; left: 0; whiteSpace: nowrap; lineHeight: normal';
    return new Size(measureObject.clientWidth, measureObject.clientHeight);
}
/**
 * @param {string} text - Specifies the text.
 * @param {FontModel} font - Specifies the font.
 * @returns {Size} - Returns the size of text.
 * @private
 */
export function measureTextElement(text, font) {
    var canvas = document.createElement('canvas');
    // eslint-disable-next-line @typescript-eslint/tslint/config
    var context = canvas.getContext('2d');
    context.font = font.fontStyle + " " + font.fontWeight + " " + (typeof font.size === 'number' ? font.size + 'px' : font.size) + " " + font.fontFamily;
    var metrics = context.measureText(text);
    var width = metrics.width;
    var height = parseFloat(font.size) || 16;
    canvas = null;
    return new Size(width, height);
}
/**
 * Internal use of text options.
 *
 * @private
 */
var TextOption = /** @class */ (function () {
    function TextOption(id, x, y, anchor, text, transform, baseLine) {
        if (transform === void 0) { transform = ''; }
        this.transform = '';
        this.baseLine = 'auto';
        this.id = id;
        this.text = text;
        this.transform = transform;
        this.anchor = anchor;
        this.x = x;
        this.y = y;
        this.baseLine = baseLine;
    }
    return TextOption;
}());
export { TextOption };
/**
 * Internal use of path options.
 *
 * @private
 */
var PathOption = /** @class */ (function () {
    function PathOption(id, fill, width, color, fillOpacity, strokeOpacity, dashArray, d) {
        this.id = id;
        this['fill-opacity'] = fillOpacity;
        this['stroke-opacity'] = strokeOpacity;
        this.fill = fill;
        this.stroke = color;
        this['stroke-width'] = width;
        this['stroke-dasharray'] = dashArray;
        this.d = d;
    }
    return PathOption;
}());
export { PathOption };
/** @private */
var ColorValue = /** @class */ (function () {
    function ColorValue(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
    return ColorValue;
}());
export { ColorValue };
/**
 * Internal use of rectangle options.
 *
 * @private
 */
var RectOption = /** @class */ (function (_super) {
    __extends(RectOption, _super);
    function RectOption(id, fill, border, fillOpacity, rect, rx, ry, transform, dashArray) {
        var _this = _super.call(this, id, fill, border.width, border.color, fillOpacity, border.opacity) || this;
        _this.y = rect.y;
        _this.x = rect.x;
        _this.height = rect.height;
        _this.width = rect.width;
        _this.rx = rx ? rx : 0;
        _this.ry = ry ? ry : 0;
        _this.transform = transform ? transform : '';
        _this['stroke-dasharray'] = dashArray;
        _this['fill-opacity'] = fillOpacity;
        _this['stroke-opacity'] = border.opacity;
        return _this;
    }
    return RectOption;
}(PathOption));
export { RectOption };
/**
 * Internal use of circle options.
 *
 * @private
 */
var CircleOption = /** @class */ (function (_super) {
    __extends(CircleOption, _super);
    function CircleOption(id, fill, border, fillOpacity, cx, cy, r, dashArray) {
        var _this = _super.call(this, id, fill, border.width, border.color, fillOpacity, border.opacity, dashArray) || this;
        _this.cy = cy;
        _this.cx = cx;
        _this.r = r;
        _this['stroke-dasharray'] = dashArray;
        _this['fill-opacity'] = fillOpacity;
        _this['stroke-opacity'] = border.opacity;
        return _this;
    }
    return CircleOption;
}(PathOption));
export { CircleOption };
/**
 * Internal use of polygon options.
 *
 * @private
 */
var PolygonOption = /** @class */ (function (_super) {
    __extends(PolygonOption, _super);
    function PolygonOption(id, points, fill, width, color, fillOpacity, strokeOpacity, dashArray) {
        if (fillOpacity === void 0) { fillOpacity = 1; }
        if (strokeOpacity === void 0) { strokeOpacity = 1; }
        if (dashArray === void 0) { dashArray = ''; }
        var _this = _super.call(this, id, fill, width, color, fillOpacity, strokeOpacity, dashArray) || this;
        _this.points = points;
        return _this;
    }
    return PolygonOption;
}(PathOption));
export { PolygonOption };
/**
 * Internal use of polyline options.
 *
 * @private
 */
var PolylineOption = /** @class */ (function (_super) {
    __extends(PolylineOption, _super);
    function PolylineOption(id, points, fill, width, color, fillOpacity, strokeOpacity, dashArray) {
        if (fillOpacity === void 0) { fillOpacity = 1; }
        if (strokeOpacity === void 0) { strokeOpacity = 1; }
        if (dashArray === void 0) { dashArray = ''; }
        return _super.call(this, id, points, fill, width, color, fillOpacity, strokeOpacity, dashArray) || this;
    }
    return PolylineOption;
}(PolygonOption));
export { PolylineOption };
/**
 * Internal use of line options.
 *
 * @private
 */
var LineOption = /** @class */ (function (_super) {
    __extends(LineOption, _super);
    function LineOption(id, line, fill, width, color, fillOpacity, strokeOpacity, dashArray) {
        if (fillOpacity === void 0) { fillOpacity = 1; }
        if (strokeOpacity === void 0) { strokeOpacity = 1; }
        if (dashArray === void 0) { dashArray = ''; }
        var _this = _super.call(this, id, fill, width, color, fillOpacity, strokeOpacity, dashArray) || this;
        _this.x1 = line.x1;
        _this.y1 = line.y1;
        _this.x2 = line.x2;
        _this.y2 = line.y2;
        return _this;
    }
    return LineOption;
}(PathOption));
export { LineOption };
/**
 * Internal use of line.
 *
 * @property {number} Line - Specifies the line class
 * @private
 */
var Line = /** @class */ (function () {
    function Line(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }
    return Line;
}());
export { Line };
/**
 * Internal use of map location type.
 *
 * @private
 */
var MapLocation = /** @class */ (function () {
    function MapLocation(x, y) {
        this.x = x;
        this.y = y;
    }
    return MapLocation;
}());
export { MapLocation };
/**
 * Internal use of type rect.
 *
 * @private
 */
var Rect = /** @class */ (function () {
    function Rect(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    return Rect;
}());
export { Rect };
/**
 * Internal use for pattern creation.
 *
 * @property {PatternOptions} PatternOptions - Specifies the pattern option class.
 * @private
 */
var PatternOptions = /** @class */ (function () {
    function PatternOptions(id, x, y, width, height, patternUnits, patternContentUnits, patternTransform, href) {
        if (patternUnits === void 0) { patternUnits = 'userSpaceOnUse'; }
        if (patternContentUnits === void 0) { patternContentUnits = 'userSpaceOnUse'; }
        if (patternTransform === void 0) { patternTransform = ''; }
        if (href === void 0) { href = ''; }
        this.id = id;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.patternUnits = patternUnits;
        this.patternContentUnits = patternContentUnits;
        this.patternTransform = patternTransform;
        this.href = href;
    }
    return PatternOptions;
}());
export { PatternOptions };
/**
 * Internal rendering of text.
 *
 * @param {TextOption} option Specifies the text option
 * @param {FontModel} style Specifies the style
 * @param {string} color Specifies the color
 * @param {HTMLElement | Element} parent Specifies the parent element
 * @param {boolean} isMinus Specifies the boolean value
 * @returns {Element} Returns the html object
 * @private
 */
export function renderTextElement(option, style, color, parent, isMinus) {
    if (isMinus === void 0) { isMinus = false; }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var renderOptions = {
        'id': option.id,
        'x': option.x,
        'y': option.y,
        'fill': color,
        'font-size': style.size,
        'font-style': style.fontStyle,
        'font-family': style.fontFamily,
        'font-weight': style.fontWeight,
        'text-anchor': option.anchor,
        'transform': option.transform,
        'opacity': style.opacity,
        'dominant-baseline': option.baseLine
    };
    var text = typeof option.text === 'string' || typeof option.text === 'number' ? option.text : isMinus ? option.text[option.text.length - 1] : option.text[0];
    var tspanElement;
    var renderer = new SvgRenderer('');
    var height;
    var htmlObject = renderer.createText(renderOptions, text);
    htmlObject.style['user-select'] = 'none';
    htmlObject.style['font-family'] = style.fontFamily;
    htmlObject.style['font-size'] = style.size;
    htmlObject.style['font-weight'] = style.fontWeight;
    htmlObject.style['font-color'] = style.color;
    htmlObject.style['-moz-user-select'] = 'none';
    htmlObject.style['-webkit-touch-callout'] = 'none';
    htmlObject.style['-webkit-user-select'] = 'none';
    htmlObject.style['-khtml-user-select'] = 'none';
    htmlObject.style['-ms-user-select'] = 'none';
    htmlObject.style['-o-user-select'] = 'none';
    if (typeof option.text !== 'string' && option.text.length > 1) {
        for (var i = 1, len = option.text.length; i < len; i++) {
            height = (measureText(option.text[i], style).height);
            tspanElement = renderer.createTSpan({
                'x': option.x, 'id': option.id,
                'y': (option.y) + ((isMinus) ? -(i * height) : (i * height))
            }, isMinus ? option.text[option.text.length - (i + 1)] : option.text[i]);
            htmlObject.appendChild(tspanElement);
        }
    }
    parent.appendChild(htmlObject);
    return htmlObject;
}
/**
 * @param {HTMLCollection} element - Specifies the html collection
 * @param {string} markerId - Specifies the marker id
 * @param {object} data - Specifies the data
 * @param {number} index - Specifies the index
 * @param {Maps} mapObj - Specifies the map object
 * @param {string} templateType - Specifies the template type
 * @returns {HTMLElement} - Returns the html element
 * @private
 */
export function convertElement(element, markerId, data, index, mapObj, templateType) {
    var childElement = createElement('div', {
        id: markerId, className: mapObj.element.id + '_marker_template_element'
    });
    childElement.style.cssText = 'position: absolute;pointer-events: auto;';
    var elementLength = element.length;
    while (elementLength > 0) {
        childElement.appendChild(element[0]);
        elementLength--;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!mapObj.isReact || templateType !== 'function') {
        var templateHtml = childElement.innerHTML;
        var properties = Object.keys(data);
        var regExp = RegExp;
        for (var i = 0; i < properties.length; i++) {
            if (typeof data[properties[i]] === 'object') {
                templateHtml = convertStringToValue(templateHtml, '', data, mapObj);
                // eslint-disable-next-line @typescript-eslint/ban-types
            }
            else if (properties[i].toLowerCase() !== 'latitude' && properties[i].toLowerCase() !== 'longitude') {
                templateHtml = templateHtml.replace(new regExp('{{:' + properties[i] + '}}', 'g'), data[properties[i].toString()]);
            }
        }
        childElement.innerHTML = templateHtml;
    }
    return childElement;
}
/**
 *
 * @param {string} value - Specifies the value
 * @param {Maps} maps - Specifies the instance of the maps
 * @returns {string} - Returns the string value
 * @private
 */
export function formatValue(value, maps) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var formatValue;
    var formatFunction;
    if (maps.format && !isNaN(Number(value))) {
        formatFunction = maps.intl.getNumberFormat({ format: maps.format, useGrouping: maps.useGroupingSeparator });
        formatValue = formatFunction(Number(value));
    }
    else {
        formatValue = value;
    }
    return formatValue;
}
/**
 *
 * @param {string} stringTemplate - Specifies the template
 * @param {string} format - Specifies the format
 * @param {object} data - Specifies the data
 * @param {Maps} maps - Specifies the instance of the maps
 * @returns {string} - Returns the string value
 * @private
 */
export function convertStringToValue(stringTemplate, format, data, maps) {
    var templateHtml = (stringTemplate === '') ? format : stringTemplate;
    var templateValue = (stringTemplate === '') ? templateHtml.split('${') : templateHtml.split('{{:');
    var regExp = RegExp;
    for (var i = 0; i < templateValue.length; i++) {
        if ((templateValue[i].indexOf('}}') > -1 && templateValue[i].indexOf('.') > -1) ||
            (templateValue[i].indexOf('}') > -1 && templateValue[i].search('.') > -1)) {
            var split = (stringTemplate === '') ? templateValue[i].split('}') : templateValue[i].split('}}');
            for (var j = 0; j < split.length; j++) {
                if (split[j].indexOf('.') > -1) {
                    var templateSplitValue = (getValueFromObject(data, split[j])).toString();
                    templateHtml = (stringTemplate === '') ?
                        templateHtml.split('${' + split[j] + '}').join(formatValue(templateSplitValue, maps)) :
                        templateHtml.replace(new regExp('{{:' + split[j] + '}}', 'g'), templateSplitValue);
                }
            }
        }
    }
    return templateHtml;
}
/**
 *
 * @param {Element} element - Specifies the element
 * @param {string} labelId - Specifies the label id
 * @param {object} data - Specifies the data
 * @returns {HTMLElement} - Returns the html element
 * @private
 */
export function convertElementFromLabel(element, labelId, data) {
    var labelEle = isNullOrUndefined(element.childElementCount) ? element[0] : element;
    var templateHtml = labelEle.outerHTML;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var properties = Object.keys(data);
    var regExp = RegExp;
    for (var i = 0; i < properties.length; i++) {
        // eslint-disable-next-line @typescript-eslint/ban-types
        templateHtml = templateHtml.replace(new regExp('{{:' + properties[i] + '}}', 'g'), data[properties[i].toString()]);
    }
    var templateEle = createElement('div', {
        id: labelId,
        innerHTML: templateHtml
    });
    templateEle.style.position = 'absolute';
    return templateEle;
}
/**
 *
 * @param {MarkerType} shape - Specifies the shape
 * @param {string} imageUrl - Specifies the image url
 * @param {Point} location - Specifies the location
 * @param {string} markerID - Specifies the marker id
 * @param {any} shapeCustom - Specifies the shape custom
 * @param {Element} markerCollection - Specifies the marker collection
 * @param {Maps} maps - Specifies the instance of the maps
 * @returns {Element} - Returns the element
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function drawSymbols(shape, imageUrl, location, markerID, shapeCustom, markerCollection, maps) {
    var markerEle;
    var x;
    var y;
    var size = shapeCustom['size'];
    var borderColor = shapeCustom['borderColor'];
    var borderWidth = parseFloat(shapeCustom['borderWidth']);
    var borderOpacity = parseFloat(shapeCustom['borderOpacity']);
    var fill = shapeCustom['fill'];
    var dashArray = shapeCustom['dashArray'];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var border = { color: borderColor, width: borderWidth, opacity: borderOpacity };
    var opacity = shapeCustom['opacity'];
    var rectOptions;
    var pathOptions = new PathOption(markerID, fill, borderWidth, borderColor, opacity, borderOpacity, dashArray, '');
    size.width = typeof (size.width) === 'string' ? parseInt(size.width, 10) : size.width;
    size.height = typeof (size.height) === 'string' ? parseInt(size.height, 10) : size.height;
    if (shape === 'Circle') {
        var radius = (size.width + size.height) / 4;
        var circleOptions = new CircleOption(markerID, fill, border, opacity, location.x, location.y, radius, dashArray);
        markerEle = maps.renderer.drawCircle(circleOptions);
    }
    else if (shape === 'Rectangle') {
        x = location.x - (size.width / 2);
        y = location.y - (size.height / 2);
        rectOptions = new RectOption(markerID, fill, border, opacity, new Rect(x, y, size.width, size.height), null, null, '', dashArray);
        markerEle = maps.renderer.drawRectangle(rectOptions);
    }
    else if (shape === 'Image') {
        x = location.x - (size.width / 2);
        y = location.y - (markerID.indexOf('cluster') > -1 ? (size.height / 2) : size.height);
        merge(pathOptions, { 'href': imageUrl, 'height': size.height, 'width': size.width, x: x, y: y });
        markerEle = maps.renderer.drawImage(pathOptions);
    }
    else {
        markerEle = calculateShapes(maps, shape, pathOptions, size, location, markerCollection);
    }
    return markerEle;
}
/**
 *
 * @param {object} data - Specifies the data
 * @param {string} value - Specifies the value
 * @returns {any} - Returns the data
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getValueFromObject(data, value) {
    if (!isNullOrUndefined(data) && !isNullOrUndefined(value)) {
        var splits = value.replace(/\[/g, '.').replace(/\]/g, '').split('.');
        if (splits.length === 1) {
            data = data[splits[0]];
        }
        else {
            for (var i = 0; i < splits.length && !isNullOrUndefined(data); i++) {
                data = data[splits[i]];
            }
        }
    }
    return data;
}
/**
 *
 * @param {IMarkerRenderingEventArgs} eventArgs - Specifies the event arguments
 * @param {object} data - Specifies the data
 * @returns {IMarkerRenderingEventArgs} - Returns the arguments
 * @private
 */
export function markerColorChoose(eventArgs, data) {
    var color = (!isNullOrUndefined(eventArgs.colorValuePath)) ? ((eventArgs.colorValuePath.indexOf('.') > -1) ? (getValueFromObject(data, eventArgs.colorValuePath)).toString() :
        data[eventArgs.colorValuePath]) : data[eventArgs.colorValuePath];
    eventArgs.fill = (!isNullOrUndefined(eventArgs.colorValuePath) &&
        !isNullOrUndefined(color)) ?
        ((eventArgs.colorValuePath.indexOf('.') > -1) ? (getValueFromObject(data, eventArgs.colorValuePath)).toString() :
            data[eventArgs.colorValuePath]) : eventArgs.fill;
    return eventArgs;
}
/**
 *
 * @param {IMarkerRenderingEventArgs} eventArgs - Specifies the event arguments
 * @param {object} data - Specifies the data
 * @returns {IMarkerRenderingEventArgs} - Returns the arguments
 * @private
 */
export function markerShapeChoose(eventArgs, data) {
    if (!isNullOrUndefined(eventArgs.shapeValuePath) && !isNullOrUndefined(data[eventArgs.shapeValuePath])) {
        updateShape(eventArgs, data);
        if (data[eventArgs.shapeValuePath] === 'Image') {
            updateImageUrl(eventArgs, data);
        }
    }
    else {
        updateShape(eventArgs, data);
        updateImageUrl(eventArgs, data);
    }
    return eventArgs;
}
/**
 *
 * @param {any} path - contains a dot, it implies that the desired property is nested within the object.
 * @param {any} data - The data object from which the value is to be retrieved. This can be any object that contains the properties specified in the path.
 * @returns {any} - Returns the value of the property specified in the path.
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getValue(path, data) {
    return (path.indexOf('.') > -1) ? getValueFromObject(data, path).toString() : data[path];
}
/**
 *
 * @param {any} eventArgs - Specifies the event arguments
 * @param {any} data - Specifies the data
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function updateShape(eventArgs, data) {
    if (!isNullOrUndefined(eventArgs.shapeValuePath)) {
        var shape = getValue(eventArgs.shapeValuePath, data);
        eventArgs.shape = (!isNullOrUndefined(shape) && shape.toString() !== '') ? shape : eventArgs.shape;
    }
}
/**
 *
 * @param {any} eventArgs - Specifies the event arguments
 * @param {any} data - Specifies the data
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function updateImageUrl(eventArgs, data) {
    if (!isNullOrUndefined(eventArgs.imageUrlValuePath)) {
        var imageUrl = getValue(eventArgs.imageUrlValuePath, data);
        eventArgs.imageUrl = (!isNullOrUndefined(imageUrl)) ? imageUrl : eventArgs.imageUrl;
    }
}
/**
 *
 * @param {LayerSettings} currentLayer - Specifies the current layer
 * @param {HTMLElement | Element} markerTemplate - Specifies the marker template
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {number} layerIndex - Specifies the layer index
 * @param {number} markerIndex - Specifies the marker index
 * @param {Element} markerCollection - Specifies the marker collection
 * @param {Element} layerElement - Specifies the layer element
 * @param {boolean} check - Specifies the boolean value
 * @param {boolean} zoomCheck - Specifies the boolean value
 * @param {any} translatePoint - Specifies the data
 * @param {boolean} allowInnerClusterSetting - Specifies the boolean value
 * @returns {boolean} -Returns boolean for cluster completion
 * @private
 */
export function clusterTemplate(currentLayer, markerTemplate, maps, layerIndex, markerIndex, markerCollection, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
layerElement, check, zoomCheck, translatePoint, allowInnerClusterSetting) {
    var bounds1;
    var bounds2;
    var colloideBounds = [];
    var clusterColloideBounds = [];
    var tempX = 0;
    var tempY = 0;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var data;
    var markerSetting = currentLayer.markerSettings[markerIndex];
    var options;
    var textElement;
    var tempElement1;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var shapeCustom;
    var tempElement;
    var postionY = (15 / 4);
    var m = 0;
    var indexCollection = [];
    var clusters = !allowInnerClusterSetting && currentLayer.markerClusterSettings.allowClustering ?
        currentLayer.markerClusterSettings : markerSetting.clusterSettings;
    var style = clusters.labelStyle;
    var clusterGroup = maps.renderer.createGroup({ id: maps.element.id + '_LayerIndex_' + layerIndex + '_markerCluster' });
    var eventArg = {
        cancel: false, name: markerClusterRendering, fill: clusters.fill, height: clusters.height,
        width: clusters.width, imageUrl: clusters.imageUrl, shape: clusters.shape,
        data: data, maps: maps, cluster: clusters, border: clusters.border
    };
    var containerRect = maps.element.getBoundingClientRect();
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    (maps.isTileMap) ? new Object() : getTranslate(maps, currentLayer, false);
    var factor;
    if (!maps.isTileMap) {
        factor = maps.mapLayerPanel.calculateFactor(currentLayer);
    }
    var isClusteringCompleted = false;
    var currentZoomFactor = !maps.isTileMap ? maps.mapScaleValue : maps.tileZoomLevel;
    var markerGroup = (markerSetting.clusterSettings.allowClustering
        || (currentLayer.markerClusterSettings.allowClustering && currentLayer.markerSettings.length > 1))
        ? markerTemplate.querySelectorAll("[id*='LayerIndex_" + layerIndex + "_MarkerIndex_" + markerIndex + "']:not([id*='_Group'])")
        : markerTemplate.childNodes;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    maps.trigger('markerClusterRendering', eventArg, function (clusterargs) {
        Array.prototype.forEach.call(markerGroup, function (markerElement, o) {
            indexCollection = [];
            if (markerElement['style']['visibility'] !== 'hidden') {
                tempElement = markerElement;
                bounds1 = tempElement.getBoundingClientRect();
                indexCollection.push(o);
                if (!isNullOrUndefined(bounds1)) {
                    var list = (maps.markerModule.zoomedMarkerCluster.length > 0 && maps.markerModule.zoomedMarkerCluster[layerIndex] && maps.markerModule.zoomedMarkerCluster[layerIndex][o] && maps.markerModule.zoomedMarkerCluster[layerIndex][o].length > 0)
                        || (maps.markerModule.initialMarkerCluster.length > 0 && maps.markerModule.initialMarkerCluster[layerIndex] && maps.markerModule.initialMarkerCluster[layerIndex][o] && maps.markerModule.initialMarkerCluster[layerIndex][o].length > 0) ?
                        (maps.previousScale < currentZoomFactor ? maps.markerModule.zoomedMarkerCluster[layerIndex][o] : maps.markerModule.initialMarkerCluster[layerIndex][o]) : null;
                    if (!isNullOrUndefined(list) && list.length !== 0 && !markerSetting.clusterSettings.allowClustering) {
                        Array.prototype.forEach.call(list, function (currentIndex) {
                            if (o !== currentIndex) {
                                var otherMarkerElement = document.getElementById(maps.element.id + '_LayerIndex_' + layerIndex + '_MarkerIndex_'
                                    + markerIndex + '_dataIndex_' + currentIndex);
                                if (otherMarkerElement && otherMarkerElement['style']['visibility'] !== 'hidden') {
                                    markerBoundsComparer(otherMarkerElement, bounds1, colloideBounds, indexCollection, currentIndex);
                                }
                            }
                        });
                    }
                    else {
                        Array.prototype.forEach.call(markerGroup, function (otherMarkerElement, p) {
                            if (p >= o + 1 && otherMarkerElement['style']['visibility'] !== 'hidden') {
                                markerBoundsComparer(otherMarkerElement, bounds1, colloideBounds, indexCollection, p);
                            }
                        });
                    }
                    markerClusterListHandler(maps, currentZoomFactor, layerIndex, o, indexCollection);
                    tempX = bounds1.left + bounds1.width / 2;
                    tempY = bounds1.top + bounds1.height;
                    if (colloideBounds.length > 0) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        indexCollection = indexCollection.filter(function (item, index, value) { return value.indexOf(item) === index; });
                        tempX = tempX - containerRect['left'];
                        tempY = (tempY - ((maps.availableSize.height <= containerRect['height']) ?
                            containerRect['top'] : (containerRect['bottom'] - containerRect['top'])));
                        var dataIndex = parseInt(markerElement['id'].split('_dataIndex_')[1].split('_')[0], 10);
                        var markerIndex_1 = parseInt(markerElement['id'].split('_MarkerIndex_')[1].split('_')[0], 10);
                        var markerSetting_1 = currentLayer.markerSettings[markerIndex_1];
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        var markerData = markerSetting_1.dataSource[dataIndex];
                        var location_1;
                        var longitude = (!isNullOrUndefined(markerSetting_1.longitudeValuePath)) ?
                            Number(getValueFromObject(markerData, markerSetting_1.longitudeValuePath)) :
                            !isNullOrUndefined(markerData['longitude']) ? parseFloat(markerData['longitude']) :
                                !isNullOrUndefined(markerData['Longitude']) ? parseFloat(markerData['Longitude']) : 0;
                        var latitude = (!isNullOrUndefined(markerSetting_1.latitudeValuePath)) ?
                            Number(getValueFromObject(markerData, markerSetting_1.latitudeValuePath)) :
                            !isNullOrUndefined(markerData['latitude']) ? parseFloat(markerData['latitude']) :
                                !isNullOrUndefined(markerData['Latitude']) ? parseFloat(markerData['Latitude']) : 0;
                        if (!maps.isTileMap) {
                            location_1 = convertGeoToPoint(latitude, longitude, factor, currentLayer, maps);
                        }
                        else if (maps.isTileMap) {
                            location_1 = convertTileLatLongToPoint(new Point(longitude, latitude), maps.tileZoomLevel, maps.tileTranslatePoint, true);
                        }
                        markerElement['style']['visibility'] = 'hidden';
                        if (eventArg.cancel) {
                            shapeCustom = {
                                size: new Size(clusters.width, clusters.height),
                                fill: clusters.fill, borderColor: clusters.border.color,
                                borderWidth: clusters.border.width, opacity: clusters.opacity,
                                dashArray: clusters.dashArray, imageUrl: clusters.imageUrl, shape: clusters.shape
                            };
                            shapeCustom['borderOpacity'] = isNullOrUndefined(clusters.border.opacity) ? clusters.opacity : clusters.border.opacity;
                        }
                        else {
                            shapeCustom = {
                                size: new Size(eventArg.width, eventArg.height),
                                fill: eventArg.fill, borderColor: eventArg.border.color,
                                borderWidth: eventArg.border.width, opacity: clusters.opacity,
                                dashArray: clusters.dashArray, imageUrl: eventArg.imageUrl,
                                shape: eventArg.shape
                            };
                            shapeCustom['borderOpacity'] = isNullOrUndefined(eventArg.border.opacity) ? clusters.opacity : eventArg.border.opacity;
                        }
                        tempX = (maps.isTileMap) ? tempX : (markerTemplate.id.indexOf('_Markers_Group') > -1) ? tempX : tempX + postionY - (eventArg.width / 2);
                        tempY = (maps.isTileMap) ? tempY : (markerTemplate.id.indexOf('_Markers_Group') > -1) ? tempY : tempY - (eventArg.height / 2);
                        if (maps.isTileMap) {
                            tempX = location_1.x;
                            tempY = location_1.y;
                        }
                        else {
                            tempX = (((location_1.x + ((!isNullOrUndefined(maps.translatePoint) && maps.translatePoint.x !== 0 && !maps.isResize) ? maps.translatePoint.x : translatePoint.location.x)) * (isNullOrUndefined(maps.scale) ? translatePoint.scale : maps.scale)) + markerSetting_1.offset.x);
                            tempY = (((location_1.y + ((!isNullOrUndefined(maps.translatePoint) && maps.translatePoint.y !== 0 && !maps.isResize) ? maps.translatePoint.y : translatePoint.location.y)) * (isNullOrUndefined(maps.scale) ? translatePoint.scale : maps.scale)) + markerSetting_1.offset.y);
                        }
                        var clusterID = maps.element.id + '_LayerIndex_' + layerIndex + '_MarkerIndex_' + markerIndex_1 + '_dataIndex_' + dataIndex + '_cluster_' + (m);
                        var labelID = maps.element.id + '_LayerIndex_' + layerIndex + '_MarkerIndex_' + markerIndex_1 + '_dataIndex_' + dataIndex + '_cluster_' + (m) + '_datalabel_' + m;
                        m++;
                        var ele = drawSymbols(shapeCustom['shape'], shapeCustom['imageUrl'], { x: 0, y: 0 }, clusterID, shapeCustom, markerCollection, maps);
                        ele.setAttribute('transform', 'translate( ' + tempX + ' ' + tempY + ' )');
                        if (eventArg.shape === 'Balloon') {
                            ele.children[0].textContent = indexCollection.toString();
                        }
                        else {
                            ele.textContent = indexCollection.toString();
                        }
                        options = new TextOption(labelID, (0), postionY, 'middle', (colloideBounds.length + 1).toString(), '', '');
                        textElement = renderTextElement(options, style, style.color, markerCollection);
                        textElement.setAttribute('transform', 'translate( ' + tempX + ' ' + tempY + ' )');
                        var eleMarkerIndex = parseFloat(ele.id.split('_MarkerIndex_')[1]);
                        if ((markerSetting_1.clusterSettings.allowClustering && eleMarkerIndex === markerIndex_1) ||
                            (currentLayer.markerClusterSettings.allowClustering && currentLayer.markerSettings.length > 1 && eleMarkerIndex === markerIndex_1)) {
                            clusterGroup.appendChild(ele);
                            clusterGroup.appendChild(textElement);
                        }
                        else {
                            clusterGroup.appendChild(textElement);
                            clusterGroup.appendChild(ele);
                        }
                    }
                }
                colloideBounds = [];
            }
            else {
                markerClusterListHandler(maps, currentZoomFactor, layerIndex, o, indexCollection);
            }
            isClusteringCompleted = true;
        });
        layerElement.appendChild(clusterGroup);
        maps.svgObject.appendChild(layerElement);
        maps.element.appendChild(maps.svgObject);
        if (clusters.allowDeepClustering && !allowInnerClusterSetting) {
            Array.prototype.forEach.call(clusterGroup.childNodes, function (clusterElement, o) {
                if (clusterElement['style']['visibility'] !== 'hidden') {
                    tempElement = clusterElement;
                    bounds1 = tempElement.getBoundingClientRect();
                    if (!isNullOrUndefined(bounds1) && !(tempElement.id.indexOf('_datalabel_') > -1)) {
                        for (var p = o + 1; p < clusterGroup.childElementCount; p++) {
                            if (clusterGroup.childNodes[p]['style']['visibility'] !== 'hidden') {
                                tempElement1 = clusterGroup.childNodes[p];
                                bounds2 = tempElement1.getBoundingClientRect();
                                if (!isNullOrUndefined(bounds2) && !(tempElement1.id.indexOf('_datalabel_') > -1)) {
                                    if (!(bounds1.left > bounds2.right || bounds1.right < bounds2.left
                                        || bounds1.top > bounds2.bottom || bounds1.bottom < bounds2.top)) {
                                        clusterColloideBounds.push(tempElement1);
                                        clusterColloideBounds.push(clusterGroup.childNodes[p - 1]);
                                        clusterGroup.childNodes[p]['style']['visibility'] = 'hidden';
                                        var eleMarkerIndex = !isNullOrUndefined(clusterGroup.childNodes[p + 1]) ?
                                            parseFloat(clusterGroup.childNodes[p + 1].id.split('_MarkerIndex_')[1]) : null;
                                        if ((markerSetting.clusterSettings.allowClustering && eleMarkerIndex === markerIndex) ||
                                            (currentLayer.markerClusterSettings.allowClustering && currentLayer.markerSettings.length > 1 && eleMarkerIndex === markerIndex)) {
                                            clusterGroup.childNodes[p + 1]['style']['visibility'] = 'hidden';
                                        }
                                        else {
                                            eleMarkerIndex = parseFloat(clusterGroup.childNodes[p - 1].id.split('_MarkerIndex_')[1]);
                                            clusterGroup.childNodes[p - 1]['style']['visibility'] = (eleMarkerIndex === markerIndex) ? 'hidden' : clusterGroup.childNodes[p - 1]['style']['visibility'];
                                        }
                                        indexCollection.push(p);
                                    }
                                }
                            }
                        }
                        if (clusterColloideBounds.length > 0) {
                            tempElement = clusterElement;
                            for (var i = 0; i < clusterColloideBounds.length; i++) {
                                if (tempElement.tagName === 'g') {
                                    tempElement.childNodes[0].textContent = tempElement.childNodes[0].textContent + ',' +
                                        clusterColloideBounds[i].textContent;
                                }
                                else {
                                    tempElement.textContent = tempElement.textContent + ',' + clusterColloideBounds[i].textContent;
                                }
                                var eleMarkerIndex = parseFloat(clusterGroup.childNodes[o + 1].id.split('_MarkerIndex_')[1]);
                                if ((markerSetting.clusterSettings.allowClustering && eleMarkerIndex === markerIndex) ||
                                    (currentLayer.markerClusterSettings.allowClustering && currentLayer.markerSettings.length > 1 && eleMarkerIndex === markerIndex)) {
                                    clusterGroup.childNodes[o + 1].textContent = ((+(clusterGroup.childNodes[o + 1].textContent)) + (+(clusterColloideBounds[i + 1].textContent))).toString();
                                }
                                else {
                                    eleMarkerIndex = parseFloat(clusterGroup.childNodes[o - 1].id.split('_MarkerIndex_')[1]);
                                    clusterGroup.childNodes[o - 1].textContent = (eleMarkerIndex === markerIndex) ?
                                        ((+(clusterGroup.childNodes[o - 1].textContent)) + (+(clusterColloideBounds[i + 1].textContent))).toString() : clusterGroup.childNodes[o - 1].textContent;
                                }
                                i++;
                            }
                        }
                        clusterColloideBounds = [];
                    }
                }
            });
        }
        while (0 < clusterGroup.childNodes.length) {
            var eleMarkerIndex = parseFloat(clusterGroup.childNodes[0].id.split('_MarkerIndex_')[1]);
            if ((markerSetting.clusterSettings.allowClustering && eleMarkerIndex === markerIndex) ||
                (currentLayer.markerClusterSettings.allowClustering && currentLayer.markerSettings.length > 1 && eleMarkerIndex === markerIndex)) {
                markerCollection.insertBefore(clusterGroup.childNodes[0], null);
            }
            else {
                if (eleMarkerIndex === markerIndex) {
                    markerCollection.insertBefore(clusterGroup.childNodes[0], markerCollection.firstChild);
                }
            }
        }
        if (!check) {
            getElementByID(maps.element.id + '_Secondary_Element').appendChild(markerCollection);
        }
        var element = document.getElementById(maps.element.id + '_LayerIndex_' + layerIndex + '_Polygon_Group');
        var polygonElement = document.getElementById(maps.element.id + '_LayerIndex_' + layerIndex + '_Polygons_Group');
        if (isNullOrUndefined(element) && !maps.isTileMap) {
            layerElement.insertBefore(markerCollection, layerElement.firstChild);
        }
        else if (!maps.isTileMap) {
            layerElement.appendChild(markerCollection);
        }
        else {
            if (!isNullOrUndefined(polygonElement)) {
                polygonElement.insertAdjacentElement('afterend', markerCollection);
            }
            else if (!isNullOrUndefined(element)) {
                element.insertAdjacentElement('afterend', markerCollection);
            }
            else {
                layerElement.insertBefore(markerCollection, layerElement.firstChild);
            }
        }
        var markerCluster = document.getElementById(maps.element.id + '_LayerIndex_' + layerIndex + '_markerCluster');
        if (!isNullOrUndefined(markerCluster)) {
            markerCluster.remove();
        }
        if (zoomCheck) {
            var layerGroupElement = document.getElementById(maps.element.id + '_Layer_Collections');
            var element_1 = document.getElementById(maps.element.id + '_LayerIndex_' + (layerIndex + 1));
            if (!isNullOrUndefined(layerGroupElement) && !isNullOrUndefined(element_1)) {
                layerGroupElement.insertBefore(layerElement, element_1);
            }
            else if (!isNullOrUndefined(layerGroupElement)) {
                layerGroupElement.appendChild(layerElement);
            }
        }
    });
    return isClusteringCompleted;
}
/**
 * @param {Maps} maps - Specifies the map control.
 * @param {number} currentZoomFactor - Specifies the current zoom factor.
 * @param {number} layerIndex - Specifies the layer index.
 * @param {number} index - Specifies the index.
 * @param {number} indexCollection - Specifies the index Collection.
 * @returns {void}
 * @private
 */
export function markerClusterListHandler(maps, currentZoomFactor, layerIndex, index, indexCollection) {
    if (currentZoomFactor === 1) {
        var initialMarkerClusterList = isNullOrUndefined(maps.markerModule.initialMarkerCluster[layerIndex][index]) ? [] : indexCollection.length > 1 ? indexCollection : [];
        maps.markerModule.initialMarkerCluster[layerIndex][index] = initialMarkerClusterList;
        var zoomedMarkerClusterList = isNullOrUndefined(maps.markerModule.zoomedMarkerCluster[layerIndex][index]) ? [] : indexCollection.length > 1 ? indexCollection : [];
        maps.markerModule.zoomedMarkerCluster[layerIndex][index] = zoomedMarkerClusterList;
    }
    else if (currentZoomFactor > 1) {
        maps.markerModule.zoomedMarkerCluster[layerIndex][index] = indexCollection.length > 1 ? indexCollection : [];
    }
}
/**
 * @param {Element} tempElement - Specifies the temp element.
 * @param {ClientRect} markerBounds - Specifies the marker bounds.
 * @param {ClientRect} colloideBounds - Specifies the colloide Bounds.
 * @param {number[]} indexCollection - Specifies the index collection.
 * @param {number} p - Specifies the p.
 * @returns {void}
 * @private
 */
export function markerBoundsComparer(tempElement, markerBounds, colloideBounds, indexCollection, p) {
    // eslint-disable-next-line @typescript-eslint/tslint/config
    var currentMarkerBound = tempElement.getBoundingClientRect();
    if (!isNullOrUndefined(currentMarkerBound)) {
        if (!(markerBounds.left > currentMarkerBound.right || markerBounds.right < currentMarkerBound.left
            || markerBounds.top > currentMarkerBound.bottom || markerBounds.bottom < currentMarkerBound.top)) {
            colloideBounds.push(currentMarkerBound);
            tempElement['style']['visibility'] = 'hidden';
            indexCollection.push(p);
        }
    }
}
/**
 *
 * @param {MarkerClusterData[]} sameMarkerData - Specifies the marker data
 * @param {Maps} maps - Specifies the instance of the maps
 * @returns {void}
 * @private
 */
export function mergeSeparateCluster(sameMarkerData, maps) {
    var layerIndex = sameMarkerData[0].layerIndex;
    var clusterIndex = sameMarkerData[0].targetClusterIndex;
    var markerIndex = sameMarkerData[0].markerIndex;
    var dataIndex = sameMarkerData[0].dataIndex;
    var markerId = maps.element.id + '_LayerIndex_' + layerIndex + '_MarkerIndex_' + markerIndex;
    var clusterId = markerId + '_dataIndex_' + dataIndex + '_cluster_' + clusterIndex;
    var clusterEle = maps.layers[layerIndex].markerClusterSettings.shape === 'Balloon' ? getElement(clusterId + '_Group') : getElement(clusterId);
    var clusterEleLabel = getElement(clusterId + '_datalabel_' + clusterIndex);
    clusterEle.setAttribute('visibility', 'visible');
    clusterEleLabel.setAttribute('visibility', 'visible');
    var markerEle;
    var markerDataLength = sameMarkerData[0].data.length;
    for (var i = 0; i < markerDataLength; i++) {
        markerEle = getElement(markerId + '_dataIndex_' + sameMarkerData[0].data[i]['index'] + '_Group') ? getElement(markerId + '_dataIndex_' + sameMarkerData[0].data[i]['index'] + '_Group') : getElement(markerId + '_dataIndex_' + sameMarkerData[0].data[i]['index']);
        markerEle['style']['visibility'] = 'hidden';
        if (markerEle.id.indexOf('Group') > -1) {
            var marker_1 = getElement(markerId + '_dataIndex_' + sameMarkerData[0].data[i]['index']);
            marker_1['style']['visibility'] = 'hidden';
        }
    }
    removeElement(maps.element.id + '_LayerIndex_' + layerIndex + '_MarkerIndex_' + markerIndex + '_markerClusterConnectorLine');
}
/**
 *
 * @param {MarkerClusterData[]} sameMarkerData - Specifies the marker data
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {Element | HTMLElement} markerElement - Specifies the marker element
 * @param {boolean} isDom - Specifies the boolean value
 * @returns {void}
 * @private
 */
export function clusterSeparate(sameMarkerData, maps, markerElement, isDom) {
    var layerIndex = sameMarkerData[0].layerIndex;
    var markerIndex = sameMarkerData[0].markerIndex;
    var clusterIndex = sameMarkerData[0].targetClusterIndex;
    var dataIndex = sameMarkerData[0].dataIndex;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var getElementFunction = isDom ? getElement : markerElement.querySelector.bind(markerElement);
    var getQueryConnect = isDom ? '' : '#';
    var markerId = maps.element.id + '_LayerIndex_' + layerIndex + '_MarkerIndex_' + markerIndex;
    var layer = maps.layers[layerIndex];
    var allowInnerClusterSetting = maps.markerModule.allowInnerClusterSetting(layer);
    var cluster = !allowInnerClusterSetting && layer.markerClusterSettings.allowClustering ?
        layer.markerClusterSettings : layer.markerSettings[markerIndex].clusterSettings;
    var marker = layer.markerSettings[markerIndex];
    var clusterId = markerId + '_dataIndex_' + dataIndex + '_cluster_' + clusterIndex;
    var clusterEle = cluster.shape === 'Balloon' ? getElementFunction(getQueryConnect + '' + clusterId + '_Group') : getElementFunction(getQueryConnect + '' + clusterId);
    var clusterEleLabel = getElementFunction(getQueryConnect + '' + clusterId + '_datalabel_' + clusterIndex);
    clusterEle.setAttribute('visibility', 'hidden');
    clusterEleLabel.setAttribute('visibility', 'hidden');
    var markerEle = getElementFunction(getQueryConnect + '' + markerId + '_dataIndex_' + dataIndex + '_Group') ? getElementFunction(getQueryConnect + '' + markerId + '_dataIndex_' + dataIndex + '_Group') : getElementFunction(getQueryConnect + '' + markerId + '_dataIndex_' + dataIndex);
    var height = markerEle.parentElement.id.indexOf('Template_Group') > -1 ? markerEle.getBoundingClientRect().height : marker.height;
    var width = markerEle.parentElement.id.indexOf('Template_Group') > -1 ? markerEle.getBoundingClientRect().width : marker.width;
    var centerX = +clusterEle.getAttribute('transform').split('translate(')[1].trim().split(' ')[0];
    var centerY = +clusterEle.getAttribute('transform').split('translate(')[1].trim().split(' ')[1].split(')')[0].trim();
    width = (typeof width === 'string' ? parseFloat(width) : width);
    var radius = width + 5;
    var area = 2 * 3.14 * radius;
    var totalMarker = 0;
    var numberOfMarker = Math.round(area / width);
    totalMarker += numberOfMarker;
    var markerDataLength = sameMarkerData[0].data.length;
    var percent = Math.round((height / area) * 100);
    percent = markerDataLength < numberOfMarker ? 100 / markerDataLength : percent;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var angle = (percent / 100) * 360;
    var newAngle = markerDataLength < numberOfMarker ? 45 : 0;
    var count = 1;
    var start = 'M ' + centerX + ' ' + centerY + ' ';
    var path = '';
    for (var i = 0; i < markerDataLength; i++) {
        if (totalMarker === i || Math.round(newAngle) >= 360) {
            count++;
            radius = (width + 5) * count;
            newAngle = 0;
            area = 2 * 3.14 * radius;
            numberOfMarker = Math.round(area / height);
            percent = Math.round((height / area) * 100);
            while (percent * numberOfMarker < 100) {
                numberOfMarker++;
            }
            angle = ((percent / 100) * 360);
            totalMarker += numberOfMarker;
        }
        var x1 = centerX + radius * Math.sin((Math.PI * 2 * newAngle) / 360);
        var y1 = centerY + radius * Math.cos((Math.PI * 2 * newAngle) / 360);
        path += start + 'L ' + (x1) + ' ' + y1 + ' ';
        markerEle = getElementFunction(getQueryConnect + '' + markerId + '_dataIndex_' + sameMarkerData[0].data[i]['index'] + '_Group') ? getElementFunction(getQueryConnect + '' + markerId + '_dataIndex_' + sameMarkerData[0].data[i]['index'] + '_Group') : getElementFunction(getQueryConnect + '' + markerId + '_dataIndex_' + sameMarkerData[0].data[i]['index']);
        if (markerEle.parentElement.id.indexOf('Template_Group') > -1) {
            markerEle['style']['transform'] = '';
            markerEle['style']['left'] = maps.isTileMap ? x1 - (width / 2) + 'px' : (x1 - (width / 2) - 10) + 'px';
            markerEle['style']['top'] = maps.isTileMap ? y1 - (height / 2) + 'px' : (y1 - (height / 2) - 10) + 'px';
            markerEle.setAttribute('transform', 'translate( ' + x1 + ' ' + y1 + ')');
        }
        else {
            markerEle.setAttribute('transform', 'translate( ' + x1 + ' ' + y1 + ')');
        }
        markerEle['style']['visibility'] = 'visible';
        if (markerEle.id.indexOf('Group') > -1) {
            var marker_2 = getElementFunction(getQueryConnect + '' + markerId + '_dataIndex_' + sameMarkerData[0].data[i]['index']);
            marker_2['style']['visibility'] = 'visible';
        }
        newAngle += angle;
    }
    var connectorLine = cluster.connectorLineSettings;
    var options = {
        d: path, id: maps.element.id + '_LayerIndex_' + layerIndex + '_MarkerIndex_' + markerIndex + '_dataIndex_' + dataIndex + '_markerClusterConnectorLine', stroke: connectorLine.color,
        'fill-opacity': connectorLine.opacity, 'stroke-opacity': connectorLine.opacity, 'stroke-width': connectorLine.width
    };
    markerElement = isDom ? getElementFunction(maps.element.id + '_Markers_Group') : markerElement;
    var layerElement = getElementFunction(maps.element.id + '_LayerIndex_' + layerIndex);
    markerElement = layerElement.querySelector('#' + markerElement.id);
    var groupEle = maps.renderer.createGroup({ id: maps.element.id + '_LayerIndex_' + layerIndex + '_MarkerIndex_' + markerIndex + '_markerClusterConnectorLine' });
    groupEle.appendChild(maps.renderer.drawPath(options));
    if (marker.shape === 'Balloon') {
        markerElement.insertBefore(groupEle, markerElement.querySelector('#' + markerId + '_dataIndex_0_Group'));
    }
    else {
        markerElement.insertBefore(groupEle, markerElement.querySelector('#' + markerId + '_dataIndex_0'));
    }
}
/**
 *
 * @param {IMarkerRenderingEventArgs} eventArgs - Specifies the arguments
 * @param {MarkerSettings} markerSettings - Specifies the marker settings
 * @param {any[]} markerData - Specifies the marker data
 * @param {number} dataIndex - Specifies the data index
 * @param {Point} location - Specifies the location
 * @param {Point} transPoint - Specifies the translate point
 * @param {string} markerID - Specifies the marker id
 * @param {Point} offset - Specifies the offset value
 * @param {number} scale - Specifies the scale value
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {Element} markerCollection - Specifies the marker collection
 * @returns {Element} - Returns the element
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function marker(eventArgs, markerSettings, markerData, dataIndex, location, transPoint, markerID, offset, scale, maps, markerCollection) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var shapeCustom = {
        size: new Size(eventArgs.width, eventArgs.height),
        fill: eventArgs.fill, borderColor: eventArgs.border.color,
        borderWidth: eventArgs.border.width, opacity: markerSettings.opacity,
        dashArray: markerSettings.dashArray, borderOpacity: isNullOrUndefined(eventArgs.border.opacity) ? markerSettings.opacity :
            eventArgs.border.opacity
    };
    removeElement(markerID);
    var ele = drawSymbols(eventArgs.shape, eventArgs.imageUrl, { x: 0, y: 0 }, markerID, shapeCustom, markerCollection, maps);
    var x = (maps.isTileMap ? location.x : (location.x + transPoint.x) * scale) + ((!isNullOrUndefined(offset) && !isNullOrUndefined(offset.x)) ? offset.x : 0);
    var y = (maps.isTileMap ? location.y : (location.y + transPoint.y) * scale) + ((!isNullOrUndefined(offset) && !isNullOrUndefined(offset.y)) ? offset.y : 0);
    ele.setAttribute('transform', 'translate( ' + x + ' ' + y + ' )');
    maintainSelection(maps.selectedMarkerElementId, maps.markerSelectionClass, ele, 'MarkerselectionMapStyle');
    if (maps.legendSettings.toggleLegendSettings.enable && maps.legendSettings.type === 'Markers') {
        var layerIndex = parseInt(ele.id.split('_LayerIndex_')[1], 10);
        maintainToggleSelection(maps.toggledElementId, ele.tagName === 'g' ? ele.children[0] : ele, maps.legendSettings.toggleLegendSettings.applyShapeSettings ?
            maps.layers[layerIndex].shapeSettings : maps.legendSettings.toggleLegendSettings);
    }
    markerCollection.appendChild(ele);
    var element = (markerData.length - 1) === dataIndex ? 'marker' : null;
    var markerPoint = new Point(x, y);
    if (markerSettings.animationDuration > 0 || animationMode === 'Enable') {
        elementAnimate(ele, markerSettings.animationDelay, markerSettings.animationDuration, markerPoint, maps, element);
    }
    return markerCollection;
}
/**
 *
 * @param {IMarkerRenderingEventArgs} eventArgs - Specifies the arguments
 * @param {any} templateFn - Specifies the template function
 * @param {string} markerID - Specifies the marker id
 * @param {any} data - Specifies the data
 * @param {number} markerIndex - Specifies the marker index
 * @param {HTMLElement} markerTemplate - Specifies the marker template element
 * @param {Point} location - Specifies the location
 * @param {Point} transPoint - Specifies the translate point.
 * @param {number} scale - Specifies the scale value
 * @param {Point} offset - Specifies the offset value
 * @param {Maps} maps - Specifies the instance of the maps
 * @returns {HTMLElement} - Returns the html element
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function markerTemplate(eventArgs, templateFn, markerID, data, markerIndex, markerTemplate, location, transPoint, scale, offset, maps) {
    templateFn = getTemplateFunction(eventArgs.template, maps);
    if (templateFn && (templateFn(data, maps, eventArgs.template, maps.element.id + '_MarkerTemplate' + markerIndex, false).length)) {
        var templateElement = templateFn(data, maps, eventArgs.template, maps.element.id + '_MarkerTemplate' + markerIndex, false);
        var markerElement = convertElement(templateElement, markerID, data, markerIndex, maps, typeof eventArgs.template);
        for (var i = 0; i < markerElement.children.length; i++) {
            markerElement.children[i].style.pointerEvents = 'auto';
        }
        markerElement.style.left = (maps.isTileMap ? location.x : (location.x + transPoint.x) * scale) + offset.x - (maps.isTileMap ? 0 : maps.mapAreaRect.x) + 'px';
        markerElement.style.top = (maps.isTileMap ? location.y : (location.y + transPoint.y) * scale) + offset.y - (maps.isTileMap ? 0 : maps.mapAreaRect.y) + 'px';
        markerElement.style.transform = 'translate(-50%, -50%)';
        markerTemplate.appendChild(markerElement);
    }
    return markerTemplate;
}
/**
 * To maintain selection during page resize.
 *
 * @param {string[]} elementId - Specifies the element id
 * @param {Element} elementClass - Specifies the element class
 * @param {Element} element - Specifies the element
 * @param {string} className - Specifies the class name
 * @returns {void}
 * @private
 */
export function maintainSelection(elementId, elementClass, element, className) {
    if (elementId) {
        for (var index = 0; index < elementId.length; index++) {
            if (element.getAttribute('id') === elementId[index]) {
                if (index === 0 || element.tagName === 'g') {
                    if (!isNullOrUndefined(elementClass) && !isNullOrUndefined(elementClass.id)) {
                        document.body.appendChild(elementClass);
                    }
                    if (element.id.indexOf('_MarkerIndex_') > -1 && element.childElementCount > 0) {
                        element.children[0].setAttribute('class', className);
                    }
                }
                element.setAttribute('class', className);
            }
        }
    }
}
/**
 * To maintain toggle state during page resize.
 *
 * @param {string[]} toggledElements - Specifies the list of toggled elements
 * @param {Element} element - Specifies the element id
 * @param {any} styleProperty - Specifies the style properties
 * @returns {void}
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function maintainToggleSelection(toggledElements, element, styleProperty) {
    if (!isNullOrUndefined(toggledElements) && toggledElements.length > 0) {
        for (var j = 0; j < toggledElements.length; j++) {
            if (toggledElements[j] === element.id) {
                element.setAttribute('fill', styleProperty.fill);
                element.setAttribute('stroke', styleProperty.border.color);
                element.setAttribute('fill-opacity', (styleProperty.opacity).toString());
                element.setAttribute('stroke-opacity', (isNullOrUndefined(styleProperty.border.opacity) ? styleProperty.opacity : styleProperty.border.opacity).toString());
                element.setAttribute('stroke-width', (isNullOrUndefined(styleProperty.border.width) ? 0 : styleProperty.border.width).toString());
            }
        }
    }
}
/**
 * To maintain selection style class.
 *
 * @param {string} id - Specifies the id
 * @param {string} idClass - Specifies the class id
 * @param {string} fill - Specifies the fill
 * @param {string} opacity - Specifies the opactiy
 * @param {string} borderColor - Specifies the border color
 * @param {string} borderWidth - Specifies the border width
 * @param {Maps} maps - Specifies the maps
 * @returns {void}
 * @private
 */
export function maintainStyleClass(id, idClass, fill, opacity, borderColor, borderWidth, maps) {
    if (!getElement(id)) {
        var styleClass = createElement('style', {
            id: id
        });
        styleClass.innerText = '.' + idClass + '{fill:'
            + fill + ';' + 'opacity:' + opacity + ';' +
            'stroke-width:' + borderWidth + ';' +
            'stroke:' + borderColor + ';' + '}';
        maps.shapeSelectionClass = styleClass;
        document.body.appendChild(styleClass);
    }
}
/**
 * Internal use of append shape element.
 *
 * @param {Element} shape - Specifies the shape
 * @param {Element} element - Specifies the element
 * @returns {Element} - Returns the element
 * @private
 */
export function appendShape(shape, element) {
    if (element) {
        element.appendChild(shape);
    }
    return shape;
}
/**
 * Internal rendering of Circle.
 *
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {CircleOption} options - Specifies the circle options
 * @param {Element} element - Specifies the element
 * @returns {Element} - Returns the element
 * @private
 */
export function drawCircle(maps, options, element) {
    return appendShape(maps.renderer.drawCircle(options), element);
}
/**
 * Internal rendering of Rectangle.
 *
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {RectOption} options - Specifies the rect options
 * @param {Element} element - Specifies the element
 * @returns {Element} - Returns the element
 * @private
 */
export function drawRectangle(maps, options, element) {
    return appendShape(maps.renderer.drawRectangle(options), element);
}
/**
 * Internal rendering of Path.
 *
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {PathOption} options - Specifies the polygon options
 * @param {Element} element - Specifies the element
 * @returns {Element} - Returns the element
 * @private
 */
export function drawPath(maps, options, element) {
    return appendShape(maps.renderer.drawPath(options), element);
}
/**
 * Internal rendering of Polygon.
 *
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {PolygonOption} options - Specifies the polygon options
 * @param {Element} element - Specifies the element
 * @returns {Element} - Returns the element
 * @private
 */
export function drawPolygon(maps, options, element) {
    return appendShape(maps.renderer.drawPolygon(options), element);
}
/**
 * Internal rendering of Polyline.
 *
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {PolylineOption} options - Specifies the poly line options
 * @param {Element} element - Specifies the element
 * @returns {Element} - Returns the element
 * @private
 */
export function drawPolyline(maps, options, element) {
    return appendShape(maps.renderer.drawPolyline(options), element);
}
/**
 * Internal rendering of Line.
 *
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {LineOption} options - Specifies the line options
 * @param {Element} element - Specifies the element
 * @returns {Element} - Returns the element
 * @private
 */
export function drawLine(maps, options, element) {
    return appendShape(maps.renderer.drawLine(options), element);
}
/**
 * Calculate marker shapes.
 *
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {MarkerType} shape - Specifies the marker type
 * @param {PathOption} options - Specifies the path options
 * @param {Size} size - Specifies the size
 * @param {MapLocation} location - Specifies the map location
 * @param {Element} markerEle - Specifies the element
 * @returns {Element} - Returns the element
 * @private
 */
export function calculateShapes(maps, shape, options, size, location, markerEle) {
    var tempGroup;
    switch (shape) {
        case 'Balloon':
            tempGroup = drawBalloon(maps, options, size, location, 'Marker', markerEle);
            break;
        case 'Cross':
            options.d = 'M ' + location.x + ' ' + (location.y - size.height / 2) + ' L ' + location.x + ' ' + (location.y + size.height
                / 2) + ' M ' + (location.x - size.width / 2) + ' ' + location.y + ' L ' + (location.x + size.width / 2) + ' ' + location.y;
            break;
        case 'Diamond':
            options.d = 'M ' + location.x + ' ' + (location.y - size.height / 2) + ' L ' + (location.x + size.width / 2) + ' '
                + location.y + ' L ' + location.x + ' ' + (location.y + size.height / 2) + ' L ' + (location.x - size.width / 2)
                + ' ' + location.y + ' Z';
            break;
        case 'Star':
            options.d = 'M ' + (location.x + size.width / 3) + ' ' + (location.y + size.height / 2) + ' L ' + (location.x - size.width / 2)
                + ' ' + (location.y - size.height / 6) + ' L ' + (location.x + size.width / 2) + ' ' + (location.y - size.height / 6)
                + ' L ' + (location.x - size.width / 3) + ' ' + (location.y + size.height / 2) + ' L ' + location.x + ' ' +
                (location.y - size.height / 2) + ' L ' + (location.x + size.width / 3) + ' ' + (location.y + size.height / 2) + ' Z';
            break;
        case 'Triangle':
            options.d = 'M ' + location.x + ' ' + (location.y - size.height / 2) + ' L ' + (location.x + size.width / 2) + ' ' +
                (location.y + size.height / 2) + ' L ' + (location.x - size.width / 2) + ' ' + (location.y + size.height / 2) + ' Z';
            break;
        case 'HorizontalLine':
            options.d = ' M ' + (location.x - size.width / 2) + ' ' + location.y + ' L ' + (location.x + size.width / 2) + ' '
                + location.y;
            break;
        case 'VerticalLine':
            options.d = 'M ' + location.x + ' ' + (location.y - size.height / 2) + ' L ' + location.x + ' ' +
                (location.y + size.height / 2);
            break;
        case 'InvertedTriangle':
            options.d = 'M ' + (location.x - size.width / 2) + ' ' + (location.y - size.height / 2) + ' L ' + (location.x + size.width / 2) + ' ' +
                (location.y - size.height / 2) + ' L ' + (location.x) + ' ' + (location.y + size.height / 2) + ' Z';
            break;
        case 'Pentagon':
            // eslint-disable-next-line no-case-declarations
            var eq = 72;
            var xValue = void 0;
            var yValue = void 0;
            for (var i = 0; i < 5; i++) {
                xValue = (size.width / 2) * Math.cos((Math.PI / 180) * (i * eq));
                yValue = (size.height / 2) * Math.sin((Math.PI / 180) * (i * eq));
                options.d += (i === 0 ? 'M ' : 'L ') + (location.x + xValue) + ' ' + (location.y + yValue);
            }
            options.d += ' Z';
            break;
    }
    if (shape === 'Cross' || shape === 'HorizontalLine' || shape === 'VerticalLine') {
        options['stroke'] = (options['stroke'] === 'transparent') ? options['fill'] : options['stroke'];
    }
    return shape === 'Balloon' ? tempGroup : maps.renderer.drawPath(options);
}
/**
 * Internal rendering of Diamond.
 *
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {PathOption} options - Specifies the path options
 * @param {Size} size - Specifies the size
 * @param {MapLocation} location - Specifies the map location
 * @param {Element} element - Specifies the element
 * @returns {Element} - Returns the element
 * @private
 */
export function drawDiamond(maps, options, size, location, element) {
    options.d = 'M ' + location.x + ' ' + (location.y - size.height / 2) + ' L ' + (location.x + size.width / 2) + ' ' + location.y +
        ' L ' + location.x + ' ' + (location.y + size.height / 2) + ' L ' + (location.x - size.width / 2) + ' ' + location.y + ' Z';
    return appendShape(maps.renderer.drawPath(options), element);
}
/**
 * Internal rendering of Triangle.
 *
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {PathOption} options - Specifies the path options
 * @param {Size} size - Specifies the size
 * @param {MapLocation} location - Specifies the map location
 * @param {Element} element - Specifies the element
 * @returns {Element} - Returns the element
 * @private
 */
export function drawTriangle(maps, options, size, location, element) {
    options.d = 'M ' + location.x + ' ' + (location.y - size.height / 2) + ' L ' + (location.x + size.width / 2) + ' ' +
        (location.y + size.height / 2) + ' L ' + (location.x - size.width / 2) + ' ' + (location.y + size.height / 2) + ' Z';
    return appendShape(maps.renderer.drawPath(options), element);
}
/**
 * Internal rendering of Cross.
 *
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {PathOption} options - Specifies the path options
 * @param {Size} size - Specifies the size
 * @param {MapLocation} location - Specifies the map location
 * @param {Element} element - Specifies the element
 * @returns {Element} - Returns the element
 * @private
 */
export function drawCross(maps, options, size, location, element) {
    options.d = 'M ' + location.x + ' ' + (location.y - size.height / 2) + ' L ' + location.x + ' ' + (location.y + size.height / 2) +
        ' M ' + (location.x - size.width / 2) + ' ' + location.y + ' L ' + (location.x + size.width / 2) + ' ' + location.y;
    return appendShape(maps.renderer.drawPath(options), element);
}
/**
 * Internal rendering of HorizontalLine.
 *
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {PathOption} options - Specifies the path options
 * @param {Size} size - Specifies the size
 * @param {MapLocation} location - Specifies the map location
 * @param {Element} element - Specifies the element
 * @returns {Element} - Returns the element
 * @private
 */
export function drawHorizontalLine(maps, options, size, location, element) {
    options.d = ' M ' + (location.x - size.width / 2) + ' ' + location.y + ' L ' + (location.x + size.width / 2) + ' ' + location.y;
    return appendShape(maps.renderer.drawPath(options), element);
}
/**
 * Internal rendering of VerticalLine.
 *
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {PathOption} options - Specifies the path options
 * @param {Size} size - Specifies the size
 * @param {MapLocation} location - Specifies the map location
 * @param {Element} element - Specifies the element
 * @returns {Element} - Returns the element
 * @private
 */
export function drawVerticalLine(maps, options, size, location, element) {
    options.d = 'M ' + location.x + ' ' + (location.y - size.height / 2) + ' L ' + location.x + ' ' + (location.y + size.height / 2);
    return appendShape(maps.renderer.drawPath(options), element);
}
/**
 * Internal rendering of Star.
 *
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {PathOption} options - Specifies the path options
 * @param {Size} size - Specifies the size
 * @param {MapLocation} location - Specifies the map location
 * @param {Element} element - Specifies the element
 * @returns {Element} - Returns the element
 * @private
 */
export function drawStar(maps, options, size, location, element) {
    options.d = 'M ' + (location.x + size.width / 3) + ' ' + (location.y + size.height / 2) + ' L ' + (location.x - size.width / 2)
        + ' ' + (location.y - size.height / 6) + ' L ' + (location.x + size.width / 2) + ' ' + (location.y - size.height / 6)
        + ' L ' + (location.x - size.width / 3) + ' ' + (location.y + size.height / 2) + ' L ' + location.x + ' ' +
        (location.y - size.height / 2) + ' L ' + (location.x + size.width / 3) + ' ' + (location.y + size.height / 2) + ' Z';
    return appendShape(maps.renderer.drawPath(options), element);
}
/**
 * Internal rendering of Balloon.
 *
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {PathOption} options - Specifies the path options
 * @param {Size} size - Specifies the size
 * @param {MapLocation} location - Specifies the map location
 * @param {string} type - Specifies the type.
 * @param {Element} element - Specifies the element
 * @returns {Element} - Returns the element
 * @private
 */
export function drawBalloon(maps, options, size, location, type, element) {
    var width = size.width;
    var height = size.height;
    var pathElement;
    location.x -= width / 2;
    location.y -= ((options.id.indexOf('cluster') > -1) ? (height / 2) : options.id.indexOf('Legend') > -1 ? height / 1.25 : height);
    options.d = 'M15,0C8.8,0,3.8,5,3.8,11.2C3.8,17.5,9.4,24.4,15,30c5.6-5.6,11.2-12.5,11.2-18.8C26.2,5,21.2,0,15,0z M15,16' +
        'c-2.8,0-5-2.2-5-5s2.2-5,5-5s5,2.2,5,5S17.8,16,15,16z';
    var balloon = maps.renderer.drawPath(options);
    var x = size.width / 30;
    var y = size.height / 30;
    balloon.setAttribute('transform', 'translate(' + location.x + ', ' + location.y + ') scale(' + x + ', ' + y + ')');
    if (type === 'Marker') {
        var g = maps.renderer.createGroup({ id: options.id + '_Group' });
        appendShape(balloon, g);
        pathElement = appendShape(g, element);
    }
    else {
        pathElement = balloon;
    }
    return pathElement;
}
/**
 * Internal rendering of Pattern.
 *
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {PatternOptions} options - Specifies the pattern options
 * @param {Element[]} elements - Specifies the elements
 * @param {Element} element - Specifies the element
 * @returns {Element} - Returns the element
 * @private
 */
export function drawPattern(maps, options, elements, element) {
    var pattern = maps.renderer.createPattern(options, 'pattern');
    for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
        var ele = elements_1[_i];
        appendShape(ele, pattern);
    }
    return appendShape(pattern, element);
}
/**
 * Method to get specific field and vaues from data.
 *
 * @param {any[]} dataSource - Specifies the data source
 * @param {string[]} fields - Specifies the fields
 * @returns {any[]} - Returns the object
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getFieldData(dataSource, fields) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var newData = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var data;
    for (var _i = 0, dataSource_1 = dataSource; _i < dataSource_1.length; _i++) {
        var temp = dataSource_1[_i];
        data = {};
        for (var _a = 0, fields_1 = fields; _a < fields_1.length; _a++) {
            var field = fields_1[_a];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (temp[field]) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                data[field] = temp[field];
            }
        }
        newData.push(data);
    }
    return newData;
}
/**
 * To find the index of dataSource from shape properties.
 *
 * @param {any[]} dataSource - Specifies the data source
 * @param {any} properties - Specifies the properties
 * @param {string} dataPath - Specifies the data path
 * @param {string | string[]} propertyPath - Specifies the property path
 * @param {LayerSettingsModel} layer - Specifies the layer settings
 * @returns {number} - Returns the number
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function checkShapeDataFields(dataSource, properties, dataPath, propertyPath, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
layer) {
    if (!(isNullOrUndefined(properties)) && !isNullOrUndefined(dataSource) && !isNullOrUndefined(dataPath)) {
        for (var i = 0; i < dataSource.length; i++) {
            var shapeDataPath = ((dataPath.indexOf('.') > -1) ? getValueFromObject(dataSource[i], dataPath) :
                dataSource[i][dataPath]);
            var shapePath = checkPropertyPath(shapeDataPath, propertyPath, properties);
            var shapeDataPathValue = !isNullOrUndefined(shapeDataPath) && isNaN(properties[shapePath])
                ? (typeof shapeDataPath === 'string' ? shapeDataPath.toLowerCase() : shapeDataPath) : shapeDataPath;
            var propertiesShapePathValue = !isNullOrUndefined(properties[shapePath]) && isNaN(properties[shapePath])
                ? properties[shapePath].toLowerCase() : properties[shapePath];
            if (shapeDataPathValue === propertiesShapePathValue) {
                return i;
            }
        }
    }
    return null;
}
/**
 *
 * @param {string} shapeData - Specifies the shape data
 * @param {string | string[]} shapePropertyPath -  Specifies the shape property path
 * @param {object} shape -  Specifies the shape
 * @returns {string} - Returns the string value
 */
export function checkPropertyPath(shapeData, shapePropertyPath, shape) {
    if (!isNullOrUndefined(shapeData) && !isNullOrUndefined(shape)) {
        if (!isNullOrUndefined(shapePropertyPath)) {
            var properties = (Object.prototype.toString.call(shapePropertyPath) === '[object Array]' ?
                shapePropertyPath : [shapePropertyPath]);
            for (var i = 0; i < properties.length; i++) {
                var shapeDataValue = !isNullOrUndefined(shapeData) && typeof shapeData === 'string' ?
                    shapeData.toLowerCase() : shapeData;
                var shapePropertiesValue = !isNullOrUndefined(shape[properties[i]])
                    && isNaN(shape[properties[i]])
                    ? shape[properties[i]].toLowerCase() : shape[properties[i]];
                if (shapeDataValue === shapePropertiesValue) {
                    return properties[i];
                }
            }
        }
    }
    return null;
}
/**
 *
 * @param {MapLocation[]} points - Specifies the location
 * @param {number} start - Specifies the start value
 * @param {number} end - Specifies the end value
 * @returns {MapLocation[]} - Returns the location
 * @private
 */
export function filter(points, start, end) {
    var pointObject = [];
    for (var i = 0; i < points.length; i++) {
        var point = points[i];
        if (start <= point.y && end >= point.y) {
            pointObject.push(point);
        }
    }
    return pointObject;
}
/**
 *
 * @param {number} min - Specifies the min value
 * @param {number} max - Specifies the max value
 * @param {number} value - Specifies the value
 * @param {number} minValue - Specifies the minValue
 * @param {number} maxValue -Specifies the maxValue
 * @returns {number} - Returns the number
 * @private
 */
export function getRatioOfBubble(min, max, value, minValue, maxValue) {
    var percent = (100 / (maxValue - minValue)) * (value - minValue);
    var bubbleRadius = (((max - min) / 100) * percent) + min;
    if (maxValue === minValue) {
        bubbleRadius = (((max - min) / 100)) + min;
    }
    return bubbleRadius;
}
/**
 * To find the midpoint of the polygon from points.
 *
 * @param {MapLocation[]} points - Specifies the points
 * @param {string} type - Specifies the type
 * @param {string} geometryType - Specified the type of the geometry
 * @returns {any} - Specifies the object
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function findMidPointOfPolygon(points, type, geometryType) {
    if (!points.length) {
        return null;
    }
    var min = 0;
    var max = points.length;
    var startX;
    var startY;
    var startX1;
    var startY1;
    var sum = 0;
    var xSum = 0;
    var ySum = 0;
    for (var i = min; i <= max - 1; i++) {
        startX = points[i].x;
        startY = type === 'Mercator' || geometryType === 'Normal' ? points[i].y : -(points[i].y);
        if (i === max - 1) {
            startX1 = points[0].x;
            startY1 = type === 'Mercator' || geometryType === 'Normal' ? points[0].y : -(points[0].y);
        }
        else {
            startX1 = points[i + 1].x;
            startY1 = type === 'Mercator' || geometryType === 'Normal' ? points[i + 1].y : -(points[i + 1].y);
        }
        sum = sum + Math.abs(((startX * startY1)) - (startX1 * startY));
        xSum = xSum + Math.abs(((startX + startX1) * (((startX * startY1) - (startX1 * startY)))));
        ySum = ySum + Math.abs(((startY + startY1) * (((startX * startY1) - (startX1 * startY)))));
    }
    sum = 0.5 * sum;
    // eslint-disable-next-line @typescript-eslint/tslint/config
    var pointValue = points.some(function (point) { return point.x < 5 && point.y < 5; }) && geometryType === 'Normal' ? 6 : 4;
    xSum = sum !== 0 ? (1 / (pointValue * sum)) * xSum : 0;
    ySum = sum !== 0 ? (1 / (pointValue * sum)) * ySum : 0;
    /* Code for finding nearest points in polygon related to midPoint*/
    var rightMinPoint = { x: 0, y: 0 };
    var rightMaxPoint = { x: 0, y: 0 };
    var leftMinPoint = { x: 0, y: 0 };
    var leftMaxPoint = { x: 0, y: 0 };
    var bottomMinPoint = { x: 0, y: 0 };
    var bottomMaxPoint = { x: 0, y: 0 };
    var topMinPoint = { x: 0, y: 0 };
    var topMaxPoint = { x: 0, y: 0 };
    var height = 0;
    for (var i = min; i <= max - 1; i++) {
        var point = points[i];
        point.y = type === 'Mercator' || geometryType === 'Normal' ? point.y : -(point.y);
        if (point.y > ySum) {
            if (point.x < xSum && xSum - point.x < xSum - bottomMinPoint.x) {
                bottomMinPoint = { x: point.x, y: point.y };
            }
            else if (point.x > xSum && (bottomMaxPoint.x === 0 || point.x - xSum < bottomMaxPoint.x - xSum)) {
                bottomMaxPoint = { x: point.x, y: point.y };
            }
        }
        else {
            if (point.x < xSum && xSum - point.x < xSum - topMinPoint.x) {
                topMinPoint = { x: point.x, y: point.y };
            }
            else if (point.x > xSum && (topMaxPoint.x === 0 || point.x - xSum < topMaxPoint.x - xSum)) {
                topMaxPoint = { x: point.x, y: point.y };
            }
        }
        height = (bottomMaxPoint.y - topMaxPoint.y) + ((bottomMaxPoint.y - topMaxPoint.y) / 4);
        if (point.x > xSum) {
            if (point.y < ySum && ySum - point.y < ySum - rightMinPoint.y) {
                rightMinPoint = { x: point.x, y: point.y };
            }
            else if (point.y > ySum && (rightMaxPoint.y === 0 || point.y - ySum < rightMaxPoint.y - ySum)) {
                rightMaxPoint = { x: point.x, y: point.y };
            }
        }
        else {
            if (point.y < ySum && ySum - point.y < ySum - leftMinPoint.y) {
                leftMinPoint = { x: point.x, y: point.y };
            }
            else if (point.y > ySum && (leftMaxPoint.y === 0 || point.y - ySum < leftMaxPoint.y - ySum)) {
                leftMaxPoint = { x: point.x, y: point.y };
            }
        }
    }
    return {
        x: xSum, y: ySum, rightMin: rightMinPoint, rightMax: rightMaxPoint,
        leftMin: leftMinPoint, leftMax: leftMaxPoint, points: points, topMax: topMaxPoint, topMin: topMinPoint,
        bottomMax: bottomMaxPoint, bottomMin: bottomMinPoint, height: height
    };
}
/**
 * Check custom path.
 *
 * @param {any[]} layerData - Specifies the layer data
 * @returns {boolean} - Returns the boolean vlue
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isCustomPath(layerData) {
    var customPath = false;
    if (Object.prototype.toString.call(layerData) === '[object Array]') {
        Array.prototype.forEach.call(layerData, function (layer) {
            if (!isNullOrUndefined(layer['geometry']) && layer['geometry']['type'] === 'Path') {
                customPath = true;
            }
        });
    }
    return customPath;
}
/**
 * Trim the title text.
 *
 * @param {number} maxWidth - Specifies the maximum width
 * @param {string} text - Specifies the text
 * @param {FontModel} font - Specifies the font
 * @param {number} width - Specifies the width of text
 * @param {boolean} isCanvasMeasure - checks the canvas measure
 * @param {number[]} widthList - Specifies the width list
 * @returns {string} - Returns the string
 * @private
 */
export function textTrim(maxWidth, text, font, width, isCanvasMeasure, widthList) {
    var label = text;
    if (isNullOrUndefined(width)) {
        if (!isCanvasMeasure) {
            width = measureText(text, font).width;
        }
        else {
            width = measureTextElement(text, font).width;
        }
    }
    if (width > maxWidth) {
        var textLength = text.length;
        for (var i = textLength - 1; i >= 0; --i) {
            label = text.substring(0, i) + '...';
            if (!isCanvasMeasure) {
                width = measureText(label, font).width;
            }
            else {
                width = measureTextElement(label, font).width;
            }
            if (width <= maxWidth || label.length < 4) {
                if (label.length < 4) {
                    label = ' ';
                }
                if (!isNullOrUndefined(widthList)) {
                    widthList.push(width);
                }
                return label;
            }
        }
    }
    if (!isNullOrUndefined(widthList)) {
        widthList.push(width);
    }
    return label;
}
/**
 * Method to calculate x position of title.
 *
 * @param {Rect} location - Specifies the location
 * @param {Alignment} alignment - Specifies the alignment
 * @param {Size} textSize - Specifies the text size
 * @param {string} type - Specifies the type
 * @returns {Point} - Returns the point values
 * @private
 */
export function findPosition(location, alignment, textSize, type) {
    var x;
    switch (alignment) {
        case 'Near':
            x = location.x;
            break;
        case 'Center':
            x = (type === 'title') ? (location.width / 2 - textSize.width / 2) :
                ((location.x + (location.width / 2)) - textSize.width / 2);
            break;
        case 'Far':
            x = (type === 'title') ? (location.width - location.y - textSize.width) :
                ((location.x + location.width) - textSize.width);
            break;
    }
    var y = (type === 'title') ? location.y + (textSize.height / 2) : ((location.y + location.height / 2) + textSize.height / 2);
    return new Point(x, y);
}
/**
 * To remove element by id.
 *
 * @param {string} id - Specifies the id
 * @returns {void}
 * @private
 */
export function removeElement(id) {
    var element = document.getElementById(id);
    return element ? remove(element) : null;
}
/**
 * To calculate map center position from pixel values.
 *
 * @param {Maps} mapObject - Specifies the map object
 * @param {LayerSettings} layer - Specifies the layer settings
 * @returns {Point} - Returns the x and y points
 * @private
 */
export function calculateCenterFromPixel(mapObject, layer) {
    var point1 = convertGeoToPoint(mapObject.minLatOfGivenLocation, mapObject.minLongOfGivenLocation, mapObject.mapLayerPanel.calculateFactor(layer), layer, mapObject);
    var point2 = convertGeoToPoint(mapObject.maxLatOfGivenLocation, mapObject.maxLongOfGivenLocation, mapObject.mapLayerPanel.calculateFactor(layer), layer, mapObject);
    var x = (point1.x + point2.x) / 2;
    var y = (point1.y + point2.y) / 2;
    return new Point(x, y);
}
/**
 * @param {Maps} mapObject - Specifies the map object
 * @param {LayerSettings} layer - Specifies the layer settings
 * @param {boolean} animate - Specifies the boolean value
 * @returns {any} - Returns the object
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getTranslate(mapObject, layer, animate) {
    var zoomFactorValue = mapObject.zoomSettings.zoomFactor;
    var scaleFactor;
    var center = mapObject.centerPosition;
    var centerLatitude = center.latitude;
    var centerLongitude = center.longitude;
    var checkMethodeZoom = !isNullOrUndefined(mapObject.centerLatOfGivenLocation) &&
        !isNullOrUndefined(mapObject.centerLongOfGivenLocation) && mapObject.zoomNotApplied;
    if (isNullOrUndefined(mapObject.mapScaleValue)) {
        mapObject.mapScaleValue = zoomFactorValue;
    }
    if (mapObject.zoomSettings.shouldZoomInitially && mapObject.zoomSettings.enable) {
        mapObject.mapScaleValue = scaleFactor = zoomFactorValue = ((mapObject.zoomSettings.shouldZoomInitially || mapObject.enablePersistence) && mapObject.scale === 1)
            // eslint-disable-next-line radix
            ? mapObject.scale : (isNullOrUndefined(mapObject.markerZoomFactor)) ? 1 : (mapObject.markerZoomedState ? mapObject.markerZoomFactor : parseInt(mapObject.scale.toString()));
        if (mapObject.markerZoomedState && mapObject.mapScaleValue !== mapObject.markerZoomFactor && !mapObject.enablePersistence) {
            mapObject.mapScaleValue = zoomFactorValue = mapObject.markerZoomFactor;
        }
        if (mapObject.markerZoomedState && !isNullOrUndefined(mapObject.markerCenterLatitude) && !isNullOrUndefined(mapObject.markerCenterLongitude)) {
            centerLatitude = mapObject.markerCenterLatitude;
            centerLongitude = mapObject.markerCenterLongitude;
        }
    }
    if (checkMethodeZoom) {
        mapObject.mapScaleValue = scaleFactor = zoomFactorValue = mapObject.scaleOfGivenLocation;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var min = !isNullOrUndefined(mapObject.baseMapRectBounds) ? mapObject.baseMapRectBounds['min'] : null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var max = !isNullOrUndefined(mapObject.baseMapRectBounds) ? mapObject.baseMapRectBounds['max'] : null;
    var zoomFactor = animate ? 1 : mapObject.mapScaleValue;
    if (isNullOrUndefined(mapObject.currentShapeDataLength) && !isNullOrUndefined(layer.shapeData)) {
        mapObject.currentShapeDataLength = !isNullOrUndefined(layer.shapeData['features'])
            ? layer.shapeData['features'].length : !isNullOrUndefined(layer.shapeData['geometries']) ? layer.shapeData['geometries'].length : 0;
    }
    var size = (mapObject.totalRect && mapObject.legendSettings.visible) ? mapObject.totalRect : mapObject.mapAreaRect;
    var availSize = mapObject.availableSize;
    var x;
    var y;
    if (!isNullOrUndefined(min) && !isNullOrUndefined(max)) {
        var mapWidth = Math.abs(max['x'] - min['x']);
        var mapHeight = Math.abs(min['y'] - max['y']);
        var factor = animate ? 1 : mapObject.markerZoomFactor === 1 ? mapObject.mapScaleValue : zoomFactorValue;
        center = mapObject.zoomSettings.shouldZoomInitially
            && mapObject.markerZoomedState && !mapObject.zoomPersistence ? mapObject.markerZoomCenterPoint :
            mapObject.centerPosition;
        if (((!isNullOrUndefined(centerLongitude) && centerLongitude !== 0) && (!isNullOrUndefined(centerLatitude) && centerLatitude !== 0)) || checkMethodeZoom) {
            var leftPosition = (((mapWidth + Math.abs(mapObject.mapAreaRect.width - mapWidth)) / 2) + mapObject.mapAreaRect.x) / factor;
            var topPosition = (((mapHeight + Math.abs(mapObject.mapAreaRect.height - mapHeight)) / 2) + mapObject.mapAreaRect.y) / factor;
            var point = checkMethodeZoom ? calculateCenterFromPixel(mapObject, layer) :
                convertGeoToPoint(centerLatitude, centerLongitude, mapObject.mapLayerPanel.calculateFactor(layer), layer, mapObject);
            if (isNullOrUndefined(mapObject.previousProjection) || mapObject.previousProjection !== mapObject.projectionType
                || mapObject.isMarkerZoomCompleted) {
                x = -point.x + leftPosition;
                y = -point.y + topPosition;
                scaleFactor = zoomFactor;
            }
            else {
                if (Math.floor(mapObject.scale) !== 1 && mapObject.zoomSettings.shouldZoomInitially || (mapObject.zoomNotApplied)) {
                    x = -point.x + leftPosition;
                    y = -point.y + topPosition;
                }
                else {
                    if (mapObject.zoomSettings.shouldZoomInitially || mapObject.zoomNotApplied) {
                        x = -point.x + leftPosition;
                        y = -point.y + topPosition;
                        scaleFactor = zoomFactor;
                    }
                    else {
                        x = mapObject.zoomTranslatePoint.x;
                        y = mapObject.zoomTranslatePoint.y;
                    }
                }
                scaleFactor = mapObject.mapScaleValue;
            }
        }
        else {
            if (isNullOrUndefined(mapObject.previousProjection) || mapObject.previousProjection !== mapObject.projectionType) {
                if (mapHeight === 0 || mapWidth === 0 || mapHeight === mapWidth) {
                    mapWidth = size.width / 2;
                    mapHeight = size.height;
                }
                scaleFactor = parseFloat(Math.min(size.width / mapWidth, size.height / mapHeight).toFixed(2));
                scaleFactor = scaleFactor > 1.05 ? 1 : scaleFactor;
                mapWidth *= scaleFactor;
                mapHeight *= scaleFactor;
                var widthDiff = min['x'] !== 0 && mapObject.translateType === 'layers' ? availSize.width - size.width : 0;
                x = size.x + ((-(min['x'])) + ((size.width / 2) - (mapWidth / 2))) - widthDiff;
                y = size.y + ((-(min['y'])) + ((size.height / 2) - (mapHeight / 2)));
                mapObject.previousTranslate = new Point(x, y);
            }
            else {
                if (!mapObject.zoomSettings.shouldZoomInitially && mapObject.markerZoomFactor === 1 && mapObject.mapScaleValue === 1) {
                    scaleFactor = parseFloat(Math.min(size.width / mapWidth, size.height / mapHeight).toFixed(2));
                    mapHeight *= scaleFactor;
                    mapWidth *= scaleFactor;
                    y = size.y + ((-(min['y'])) + ((size.height / 2) - (mapHeight / 2)));
                    x = size.x + ((-(min['x'])) + ((size.width / 2) - (mapWidth / 2)));
                }
                else {
                    scaleFactor = mapObject.mapScaleValue < 1 ? mapObject.mapScaleValue + 1 : mapObject.mapScaleValue;
                    mapObject.mapScaleValue = mapObject.zoomSettings.enable && mapObject.mapScaleValue !== 1 ? mapObject.mapScaleValue : 1;
                    if ((mapObject.currentShapeDataLength !== (!isNullOrUndefined(layer.shapeData['features'])
                        ? layer.shapeData['features'].length : layer.shapeData['geometries'].length)) && layer.type !== 'SubLayer') {
                        var scale = parseFloat(Math.min(size.height / mapHeight, size.width / mapWidth).toFixed(2));
                        mapHeight *= scale;
                        mapWidth *= scale;
                        y = size.y + ((-(min['y'])) + ((size.height / 2)
                            - (mapHeight / 2)));
                        scaleFactor = scale;
                        x = size.x + ((-(min['x']))
                            + ((size.width / 2) - (mapWidth / 2)));
                    }
                    else if ((mapObject.availableSize.height !== mapObject.heightBeforeRefresh || mapObject.widthBeforeRefresh !== mapObject.availableSize.width)
                        && !isNullOrUndefined(mapObject.translatePoint) && !isNullOrUndefined(mapObject.previousTranslate)) {
                        var cscaleFactor = parseFloat(Math.min(size.width / mapWidth, size.height / mapHeight).toFixed(2));
                        var cmapWidth = mapWidth;
                        cmapWidth *= cscaleFactor;
                        var cmapHeight = mapHeight;
                        cmapHeight *= cscaleFactor;
                        var x1 = size.x + ((-(min['x'])) + ((size.width / 2) - (cmapWidth / 2)));
                        var y1 = size.y + ((-(min['y'])) + ((size.height / 2) - (cmapHeight / 2)));
                        var xdiff = (mapObject.translatePoint.x - mapObject.previousTranslate.x) / (mapObject.widthBeforeRefresh);
                        var ydiff = (mapObject.translatePoint.y - mapObject.previousTranslate.y) / (mapObject.heightBeforeRefresh);
                        var actxdiff = xdiff * (mapObject.availableSize.width);
                        var actydiff = ydiff * (mapObject.availableSize.height);
                        x = x1 + actxdiff;
                        y = y1 + actydiff;
                        mapObject.previousTranslate = new Point(x1, y1);
                        mapObject.zoomTranslatePoint.x = x;
                        mapObject.zoomTranslatePoint.y = y;
                    }
                    else {
                        if (!isNullOrUndefined(mapObject.previousProjection) && (mapObject.mapScaleValue === 1
                            || mapObject.mapScaleValue <= 1.05) && !mapObject.zoomModule.isDragZoom) {
                            scaleFactor = parseFloat(Math.min(size.width / mapWidth, size.height / mapHeight).toFixed(2));
                            scaleFactor = scaleFactor > 1.05 ? 1 : scaleFactor;
                            mapWidth *= scaleFactor;
                            x = size.x + ((-(min['x'])) + ((size.width / 2) - (mapWidth / 2)));
                            mapHeight *= scaleFactor;
                            y = size.y + ((-(min['y'])) + ((size.height / 2) - (mapHeight / 2)));
                        }
                        else {
                            x = mapObject.zoomTranslatePoint.x;
                            y = mapObject.zoomTranslatePoint.y;
                            scaleFactor = mapObject.scale;
                        }
                    }
                }
            }
        }
        if (!isNullOrUndefined(mapObject.translatePoint)) {
            x = (mapObject.enablePersistence && mapObject.translatePoint.x !== 0 && !mapObject.zoomNotApplied) ?
                mapObject.translatePoint.x : x;
            y = (mapObject.enablePersistence && mapObject.translatePoint.y !== 0 && !mapObject.zoomNotApplied) ?
                mapObject.translatePoint.y : y;
        }
    }
    scaleFactor = (mapObject.enablePersistence) ? ((mapObject.mapScaleValue >= 1) ? mapObject.mapScaleValue : 1) : scaleFactor;
    mapObject.widthBeforeRefresh = mapObject.availableSize.width;
    mapObject.heightBeforeRefresh = mapObject.availableSize.height;
    return { scale: scaleFactor, location: new Point(x, y) };
}
/**
 * @param {Maps} mapObject - Specifies the map object
 * @param {LayerSettings} layer - Specifies the layer
 * @param {boolean} animate - Specifies the boolean value
 * @returns {any} - Returns the object.
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getZoomTranslate(mapObject, layer, animate) {
    var zoomFactorValue = mapObject.zoomSettings.zoomFactor;
    var scaleFactor;
    var center = mapObject.centerPosition;
    var latitude = center.latitude;
    var longitude = center.longitude;
    var checkZoomMethod = !isNullOrUndefined(mapObject.centerLongOfGivenLocation) &&
        !isNullOrUndefined(mapObject.centerLatOfGivenLocation) && mapObject.zoomNotApplied;
    if (isNullOrUndefined(mapObject.previousCenterLatitude) &&
        isNullOrUndefined(mapObject.previousCenterLongitude)) {
        mapObject.previousCenterLatitude = mapObject.centerPosition.latitude;
        mapObject.previousCenterLongitude = mapObject.centerPosition.longitude;
    }
    else if (mapObject.previousCenterLatitude !==
        mapObject.centerPosition.latitude && mapObject.previousCenterLongitude !==
        mapObject.centerPosition.longitude) {
        mapObject.centerPositionChanged = true;
        mapObject.previousCenterLatitude = mapObject.centerPosition.latitude;
        mapObject.previousCenterLongitude = mapObject.centerPosition.longitude;
    }
    else {
        mapObject.centerPositionChanged = false;
    }
    if (isNullOrUndefined(mapObject.mapScaleValue) || (zoomFactorValue > mapObject.mapScaleValue)) {
        if (mapObject.isReset && mapObject.mapScaleValue === 1) {
            // eslint-disable-next-line no-self-assign
            mapObject.mapScaleValue = mapObject.mapScaleValue;
        }
        else if (!isNullOrUndefined(mapObject.mapScaleValue) && mapObject.mapScaleValue <= mapObject.scale) {
            mapObject.mapScaleValue = mapObject.scale;
        }
        else {
            mapObject.mapScaleValue = zoomFactorValue;
        }
    }
    mapObject.mapScaleValue = mapObject.zoomSettings.zoomFactor !== 1 &&
        mapObject.zoomSettings.zoomFactor ===
            mapObject.mapScaleValue ? mapObject.zoomSettings.zoomFactor :
        mapObject.zoomSettings.zoomFactor !== mapObject.mapScaleValue && !mapObject.centerPositionChanged ?
            mapObject.mapScaleValue : mapObject.zoomSettings.zoomFactor;
    if (mapObject.zoomSettings.shouldZoomInitially && !mapObject.isZoomByPosition) {
        mapObject.mapScaleValue = zoomFactorValue = scaleFactor = ((mapObject.enablePersistence
            || mapObject.zoomSettings.shouldZoomInitially) && mapObject.scale === 1)
            ? mapObject.scale : (isNullOrUndefined(mapObject.markerZoomFactor)) ? mapObject.mapScaleValue : mapObject.markerZoomFactor;
        zoomFactorValue = mapObject.mapScaleValue;
        if (!isNullOrUndefined(mapObject.markerCenterLatitude) && !isNullOrUndefined(mapObject.markerCenterLongitude)) {
            latitude = mapObject.markerCenterLatitude;
            longitude = mapObject.markerCenterLongitude;
        }
    }
    if (checkZoomMethod) {
        mapObject.mapScaleValue = scaleFactor = zoomFactorValue = mapObject.scaleOfGivenLocation;
    }
    var zoomFactor = animate ? 1 : mapObject.mapScaleValue;
    var size = mapObject.mapAreaRect;
    var x;
    var y;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var min = mapObject.baseMapRectBounds['min'];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var max = mapObject.baseMapRectBounds['max'];
    var factor = animate ? 1 : mapObject.mapScaleValue;
    var mapWidth = Math.abs(max['x'] - min['x']);
    var mapHeight = Math.abs(min['y'] - max['y']);
    if (((!isNullOrUndefined(longitude) && longitude !== 0) && (!isNullOrUndefined(latitude) && latitude !== 0)) || checkZoomMethod) {
        var topPosition = ((mapHeight + Math.abs(mapObject.mapAreaRect.height - mapHeight)) / 2) / factor;
        var leftPosition = ((mapWidth + Math.abs(mapObject.mapAreaRect.width - mapWidth)) / 2) / factor;
        var point = checkZoomMethod ? calculateCenterFromPixel(mapObject, layer) :
            convertGeoToPoint(latitude, longitude, mapObject.mapLayerPanel.calculateFactor(layer), layer, mapObject);
        if ((!isNullOrUndefined(mapObject.zoomTranslatePoint) || !isNullOrUndefined(mapObject.previousProjection)) &&
            !mapObject.zoomNotApplied) {
            if (mapObject.previousProjection !== mapObject.projectionType) {
                x = -point.x + leftPosition;
                y = -point.y + topPosition;
            }
            else {
                if (mapObject.isZoomByPosition) {
                    mapObject.zoomTranslatePoint.x = -point.x + leftPosition;
                    mapObject.zoomTranslatePoint.y = -point.y + topPosition;
                }
                x = mapObject.zoomTranslatePoint.x;
                y = mapObject.zoomTranslatePoint.y;
                zoomFactorValue = zoomFactor;
            }
        }
        else {
            x = -point.x + leftPosition + mapObject.mapAreaRect.x / zoomFactor;
            y = -point.y + topPosition + mapObject.mapAreaRect.y / zoomFactor;
        }
        if (!isNullOrUndefined(mapObject.translatePoint)) {
            y = (mapObject.enablePersistence && mapObject.translatePoint.y !== 0 && !mapObject.zoomNotApplied) ?
                mapObject.translatePoint.y : y;
            x = (mapObject.enablePersistence && mapObject.translatePoint.x !== 0 && !mapObject.zoomNotApplied) ?
                mapObject.translatePoint.x : x;
        }
        scaleFactor = zoomFactorValue !== 0 ? zoomFactorValue : 1;
    }
    else {
        var zoomFact = mapObject.zoomSettings.zoomFactor === 0 ? 1 : mapObject.zoomSettings.zoomFactor;
        var maxZoomFact = mapObject.zoomSettings.maxZoom;
        zoomFact = zoomFact > maxZoomFact ? maxZoomFact : zoomFact;
        scaleFactor = zoomFact;
        var mapScale = mapObject.mapScaleValue === 0 ? 1 : mapObject.mapScaleValue > maxZoomFact
            ? maxZoomFact : mapObject.mapScaleValue;
        var leftPosition = (size.x + ((-(min['x'])) + ((size.width / 2) - (mapWidth / 2))));
        var topPosition = (size.y + ((-(min['y'])) + ((size.height / 2) - (mapHeight / 2))));
        if (!isNullOrUndefined(mapObject.zoomTranslatePoint) || !isNullOrUndefined(mapObject.previousProjection)) {
            if (mapObject.previousProjection !== mapObject.projectionType) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var previousPositions = [];
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var previousPoints = { x: leftPosition, y: topPosition };
                previousPositions.push(previousPoints);
                for (var i = 1; i < maxZoomFact; i++) {
                    var translatePointX = previousPositions[i - 1]['x'] - (((size.width / (i)) - (size.width / (i + 1))) / 2);
                    var translatePointY = previousPositions[i - 1]['y'] - (((size.height / (i)) - (size.height / (i + 1))) / 2);
                    previousPoints = { x: translatePointX, y: translatePointY };
                    previousPositions.push(previousPoints);
                }
                leftPosition = previousPositions[zoomFact - 1]['x'];
                topPosition = previousPositions[zoomFact - 1]['y'];
            }
            else {
                leftPosition = mapObject.zoomTranslatePoint.x;
                topPosition = mapObject.zoomTranslatePoint.y;
                if (zoomFact !== mapScale) {
                    scaleFactor = mapScale;
                }
            }
        }
        if (!isNullOrUndefined(mapObject.translatePoint)) {
            x = (mapObject.enablePersistence && mapObject.translatePoint.x !== 0 && !mapObject.zoomNotApplied) ?
                mapObject.translatePoint.x : leftPosition;
            y = (mapObject.enablePersistence && mapObject.translatePoint.y !== 0 && !mapObject.zoomNotApplied) ?
                mapObject.translatePoint.y : topPosition;
        }
    }
    scaleFactor = (mapObject.enablePersistence) ? (mapObject.mapScaleValue === 0 ? 1 : mapObject.mapScaleValue) : scaleFactor;
    mapObject.widthBeforeRefresh = mapObject.availableSize.width;
    mapObject.heightBeforeRefresh = mapObject.availableSize.height;
    return { scale: animate ? 1 : scaleFactor, location: new Point(x, y) };
}
/**
 * To get the html element by specified id.
 *
 * @param {Maps} map - Specifies the instance of the maps
 * @returns {void}
 * @private
 */
export function fixInitialScaleForTile(map) {
    map.tileZoomScale = map.tileZoomLevel = Math.floor(map.availableSize.height / 512) + 1;
    var padding = 20;
    var totalSize = Math.pow(2, map.tileZoomLevel) * 256;
    map.tileTranslatePoint.x = (map.availableSize.width / 2) - (totalSize / 2);
    map.tileTranslatePoint.y = (map.availableSize.height / 2) - (totalSize / 2) + padding;
    map.previousTileWidth = map.availableSize.width;
    map.previousTileHeight = map.availableSize.height;
}
/**
 * To get the html element by specified id.
 *
 * @param {string} id - Specifies the id
 * @returns {Element} - Returns the element
 * @private
 */
export function getElementByID(id) {
    return document.getElementById(id);
}
/**
 * Function to return the number value for the string value.
 *
 * @param {string | number} marginValue - Specifies the margin value.
 * @returns {number} - Returns the number value.
 * @private
 */
export function getProcessedMarginValue(marginValue) {
    return typeof marginValue === 'string' ? parseFloat(marginValue) : marginValue;
}
/**
 * To apply internalization.
 *
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {number} value - Specifies the value
 * @returns {string} - Returns the string
 * @private
 */
export function Internalize(maps, value) {
    maps.formatFunction =
        maps.intl.getNumberFormat({ format: maps.format, useGrouping: maps.useGroupingSeparator });
    return maps.formatFunction(value);
}
/**
 * Function to compile the template function for maps.
 *
 * @param {string | Function} template - Specifies the template
 * @param {Maps} maps - Specifies the Maps instance.
 * @returns {any} - Returns the template function
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getTemplateFunction(template, maps) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var templateFn = null;
    try {
        if (typeof template !== 'function' && document.querySelectorAll(template).length) {
            templateFn = templateComplier(document.querySelector(template).innerHTML.trim());
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }
        else if (maps.isVue || maps.isVue3) {
            templateFn = templateComplier(template);
        }
        else if (typeof template === 'function') {
            templateFn = templateComplier(template);
        }
    }
    catch (e) {
        templateFn = templateComplier(template);
    }
    return templateFn;
}
/**
 * Function to get element from id.
 *
 * @param {string} id - Specifies the id
 * @returns {Element} - Returns the element
 * @private
 */
export function getElement(id) {
    return document.getElementById(id);
}
/**
 * Function to get shape data using target id.
 *
 * @param {string} targetId - Specifies the target id
 * @param {Maps} map - Specifies the instance of the maps
 * @returns {object} - Returns the object
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getShapeData(targetId, map) {
    var layerIndex = parseInt(targetId.split('_LayerIndex_')[1].split('_')[0], 10);
    var shapeIndex = parseInt(targetId.split('_shapeIndex_')[1].split('_')[0], 10);
    var layer = map.layersCollection[layerIndex];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var shapeData = layer.layerData[shapeIndex]['property'];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var data;
    if (layer.dataSource) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data = layer.dataSource[checkShapeDataFields(layer.dataSource, shapeData, layer.shapeDataPath, layer.shapePropertyPath, layer)];
    }
    return { shapeData: shapeData, data: data };
}
/**
 * Function to trigger shapeSelected event.
 *
 * @param {string} targetId - Specifies the target id
 * @param {SelectionSettingsModel} selection - Specifies the selection
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {string} eventName - Specifies the event name
 * @returns {IShapeSelectedEventArgs} - Returns the event args
 * @private
 */
export function triggerShapeEvent(targetId, selection, maps, eventName) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var shape = getShapeData(targetId, maps);
    var border = {
        color: selection.border.color, opacity: selection.border.opacity,
        width: selection.border.width
    };
    var eventArgs = (selection.enableMultiSelect) ? {
        cancel: false,
        name: eventName,
        fill: selection.fill,
        opacity: selection.opacity,
        border: border,
        shapeData: shape.shapeData,
        data: shape.data,
        target: targetId,
        maps: maps,
        shapeDataCollection: maps.shapeSelectionItem
    } : {
        cancel: false,
        name: eventName,
        fill: selection.fill,
        opacity: selection.opacity,
        border: border,
        shapeData: shape.shapeData,
        data: shape.data,
        target: targetId,
        maps: maps
    };
    maps.trigger(eventName, eventArgs, function () {
        eventArgs.border.opacity = isNullOrUndefined(eventArgs.border.opacity) ? eventArgs.opacity : eventArgs.border.opacity;
    });
    return eventArgs;
}
/**
 * Function to get elements using class name.
 *
 * @param {string} className - Specifies the class name
 * @returns {HTMLCollectionOf<Element>} - Returns the collection
 * @private
 */
export function getElementsByClassName(className) {
    return document.getElementsByClassName(className);
}
/**
 * Function to get elements using querySelectorAll
 */
// export function querySelectorAll(args: string, element: Element): ArrayOf<Element> {
//     return element.querySelectorAll('.' + args);
// }
/**
 * Function to get elements using querySelector.
 *
 * @param {string} args - Specifies the args
 * @param {string} elementSelector - Specifies the element selector
 * @returns {Element} - Returns the element
 * @private
 */
export function querySelector(args, elementSelector) {
    var targetEle = null;
    if (document.getElementById(elementSelector)) {
        targetEle = document.getElementById(elementSelector).querySelector('#' + args);
    }
    return targetEle;
}
/**
 * Function to get the element for selection and highlight using public method.
 *
 * @param {number} layerIndex - Specifies the layer index
 * @param {string} name - Specifies the layer name
 * @param {boolean} enable - Specifies the boolean value
 * @param {Maps} map - Specifies the instance of the maps
 * @returns {Element} - Returns the element
 * @private
 */
export function getTargetElement(layerIndex, name, enable, map) {
    var targetId;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var shapeData = map.layers[layerIndex].shapeData['features'];
    for (var i = 0; i < shapeData.length; i++) {
        if (shapeData[i]['properties'].name === name) {
            targetId = map.element.id + '_' + 'LayerIndex_' + layerIndex + '_shapeIndex_' + i + '_dataIndex_undefined';
            break;
        }
    }
    var targetEle = getElement(targetId);
    return targetEle;
}
/**
 * Function to create style element for highlight and selection.
 *
 * @param {string} id - Specifies the id
 * @param {string} className - Specifies the class name
 * @param {IShapeSelectedEventArgs | any} eventArgs - Specifies the event args
 * @returns {Element} - Returns the element
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createStyle(id, className, eventArgs) {
    var styleEle = createElement('style', {
        id: id
    });
    styleEle.innerText = '.' + className + '{fill:'
        + eventArgs['fill'] + ';' + 'fill-opacity:' + (!isNullOrUndefined(eventArgs['opacity']) ? (eventArgs['opacity']).toString() : '1') + ';' +
        'stroke-opacity:' + (!isNullOrUndefined(eventArgs['border']['opacity']) ? (eventArgs['border']['opacity']).toString() : '1') + ';' +
        'stroke-width:' + (eventArgs['border']['width']).toString() + ';' +
        'stroke:' + eventArgs['border']['color'] + ';' + '}';
    return styleEle;
}
/**
 * Function to customize the style for highlight and selection.
 *
 * @param {string} id - Specifies the id
 * @param {string} className - Specifies the class name
 * @param {IShapeSelectedEventArgs | any} eventArgs - Specifies the event args
 * @returns {void}
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function customizeStyle(id, className, eventArgs) {
    var styleEle = getElement(id);
    if (!isNullOrUndefined(styleEle)) {
        styleEle.innerText = '.' + className + '{fill:'
            + eventArgs['fill'] + ';' + 'fill-opacity:' + (!isNullOrUndefined(eventArgs['opacity']) ? (eventArgs['opacity']).toString() : '1') + ';' +
            'stroke-width:' + (eventArgs['border']['width']).toString() + ';' +
            'stroke-opacity:' + (!isNullOrUndefined(eventArgs['border']['opacity']) ? (eventArgs['border']['opacity']).toString() : '1') + ';' +
            'stroke:' + eventArgs['border']['color'] + '}';
    }
}
/**
 * Function to trigger itemSelection event for legend selection and public method.
 *
 * @param {SelectionSettingsModel} selectionSettings - Specifies the selection settings
 * @param {Maps} map - Specifies the instance of the maps
 * @param {Element} targetElement - Specifies the target element
 * @param {object} shapeData - Specifies the shape data
 * @param {object} data - Specifies the data
 * @returns {void}
 * @private
 */
export function triggerItemSelectionEvent(selectionSettings, map, targetElement, shapeData, data) {
    var border = {
        color: selectionSettings.border.color,
        width: selectionSettings.border.width / map.scale,
        opacity: selectionSettings.border.opacity
    };
    var eventArgs = {
        opacity: selectionSettings.opacity,
        fill: selectionSettings.fill,
        border: border,
        name: itemSelection,
        target: targetElement.id,
        cancel: false,
        shapeData: shapeData,
        data: data,
        maps: map
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    map.trigger('itemSelection', eventArgs, function (observedArgs) {
        eventArgs.border.opacity = isNullOrUndefined(selectionSettings.border.opacity) ? selectionSettings.opacity :
            selectionSettings.border.opacity;
        map.shapeSelectionItem.push(eventArgs.shapeData);
        if (!getElement('ShapeselectionMap')) {
            document.body.appendChild(createStyle('ShapeselectionMap', 'ShapeselectionMapStyle', eventArgs));
        }
        else {
            customizeStyle('ShapeselectionMap', 'ShapeselectionMapStyle', eventArgs);
        }
    });
}
/**
 * Function to remove class from element.
 *
 * @param {Element} element - Specifies the element
 * @returns {void}
 * @private
 */
export function removeClass(element) {
    element.removeAttribute('class');
}
/**
 * Animation Effect Calculation End
 *
 * @param {Element} element - Specifies the element
 * @param {number} delay - Specifies the delay
 * @param {number} duration - Specifies the duration
 * @param {MapLocation} point - Specifies the location
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {string} ele - Specifies the element
 * @param {number} radius - Specifies the radius
 * @returns {void}
 * @private
 */
export function elementAnimate(element, delay, duration, point, maps, ele, radius) {
    if (radius === void 0) { radius = 0; }
    var centerX = point.x;
    var centerY = point.y;
    var height = 0;
    var transform = element.getAttribute('transform') || '';
    new Animation({}).animate(element, {
        duration: (duration === 0 && animationMode === 'Enable') ? 1000 : duration,
        delay: delay,
        progress: function (args) {
            if ((args.timeStamp > args.delay) && !maps.zoomModule.isPanningInProgress) {
                if (maps.isTileMap && height === 0) {
                    var layerGroupElement = document.querySelector('.GroupElement');
                    if (!isNullOrUndefined(layerGroupElement)) {
                        layerGroupElement.style.display = 'block';
                    }
                }
                height = ((args.timeStamp - args.delay) / args.duration);
                element.setAttribute('transform', 'translate( ' + (centerX - (radius * height)) + ' ' + (centerY - (radius * height)) +
                    ' ) scale(' + height + ')');
            }
            else {
                if (maps.zoomModule.isPanningInProgress) {
                    transform = element.getAttribute('transform');
                }
            }
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        end: function (model) {
            if (!maps.zoomModule.isPanningInProgress) {
                element.setAttribute('transform', transform);
            }
            maps.zoomModule.isPanningInProgress = false;
            if (!ele) {
                return;
            }
            var event = {
                cancel: false, name: animationComplete, element: ele, maps: maps
            };
            maps.trigger(animationComplete, event);
        }
    });
}
/**
 * @param {string} id - Specifies the id
 * @returns {void}
 * @private
 */
export function timeout(id) {
    removeElement(id);
}
/**
 * @param {string} text - Specifies the text
 * @param {string} size - Specifies the size
 * @param {number} x - Specifies the x value
 * @param {number} y - Specifies the y value
 * @param {number} areaWidth - Specifies the area width
 * @param {number} areaHeight - Specifies the area height
 * @param {string} id - Specifies the id
 * @param {Element} element - Specifies the element
 * @param {boolean} isTouch - Specifies the boolean value
 * @returns {void}
 * @private
 */
export function showTooltip(text, size, x, y, areaWidth, areaHeight, id, element, isTouch) {
    var location = getMousePosition(x, y, element);
    if (!isNullOrUndefined(location)) {
        x = location.x;
        y = location.y;
    }
    var tooltip = document.getElementById(id);
    var width = measureText(text, {
        fontFamily: 'Segoe UI', size: '8px',
        fontStyle: 'Normal', fontWeight: 'Regular'
    }).width;
    var str = text.split(' ');
    var demo = str[0].length;
    for (var i = 1; i < str.length; i++) {
        if (demo < str[i].length) {
            demo = (str[i]).length;
        }
    }
    if (!tooltip) {
        tooltip = createElement('div', {
            id: id
        });
        tooltip.style.cssText = 'background-color: rgb(255, 255, 255) !important; color:black !important; ' +
            'position:absolute;border:1px solid rgb(0, 0, 0); padding-left:5px;' +
            'font-size:12px; font-family: "Segoe UI"; text-align:center';
    }
    if (x < (areaWidth - width)) {
        // eslint-disable-next-line no-self-assign
        x = x;
    }
    else if (x > (areaWidth - width) && x < areaWidth - (demo * 8)) {
        width = (areaWidth - x);
    }
    else if (x >= areaWidth - demo * 8) {
        if (x > width) {
            x = x - width;
        }
        else {
            width = x;
            x = 0;
        }
    }
    var size1 = size.split('px');
    wordWrap(tooltip, text, x, y, size1, width, areaWidth, element);
    var height = tooltip.clientHeight;
    if ((height + parseInt(size1[0], 10) * 2) > areaHeight) {
        width = x;
        x = 0;
    }
    wordWrap(tooltip, text, x, y, size1, width, areaWidth, element);
    if (isTouch) {
        setTimeout(timeout, 5000, id);
    }
}
/**
 * @param {HTMLElement} tooltip - Specifies the tooltip element
 * @param {string} text - Specifies the text
 * @param {number} x - Specifies the x value
 * @param {number} y - Specifies the y value
 * @param {string[]} size1 - Specifies the size
 * @param {number} width - Specifies the width
 * @param {number} areaWidth - Specifies the area width
 * @param {Element} element - Specifies the element
 * @returns {void}
 * @private
 */
export function wordWrap(tooltip, text, x, y, size1, width, areaWidth, element) {
    tooltip.innerText = text;
    tooltip.style.top = tooltip.id.indexOf('_Legend') !== -1 ?
        (parseInt(size1[0], 10) + y).toString() + 'px' : (parseInt(size1[0], 10) * 2).toString() + 'px';
    tooltip.style.left = (x).toString() + 'px';
    tooltip.style.width = width.toString() + 'px';
    tooltip.style.maxWidth = (areaWidth).toString() + 'px';
    tooltip.style.wordWrap = 'break-word';
    element.appendChild(tooltip);
}
// /**
//  *
//  * @param touchList
//  * @param e
//  * @param touches
//  */
// export function addTouchPointer(touchList: ITouches[], e: PointerEvent, touches: TouchList): ITouches[] {
//     if (touches) {
//         touchList = [];
//         for (let i: number = 0, length: number = touches.length; i < length; i++) {
//             touchList.push({ pageX: touches[i as number].clientX, pageY: touches[i as number].clientY, pointerId: null });
//         }
//     } else {
//         touchList = touchList ? touchList : [];
//         if (touchList.length === 0) {
//             touchList.push({ pageX: e.clientX, pageY: e.clientY, pointerId: e.pointerId });
//         } else {
//             for (let i: number = 0, length: number = touchList.length; i < length; i++) {
//                 if (touchList[i as number].pointerId === e.pointerId) {
//                     touchList[i as number] = { pageX: e.clientX, pageY: e.clientY, pointerId: e.pointerId };
//                 } else {
//                     touchList.push({ pageX: e.clientX, pageY: e.clientY, pointerId: e.pointerId });
//                 }
//             }
//         }
//     }
//     return touchList;
// }
/**
 * @param {string} id - Specifies the id
 * @param {string} text - Specifies the text
 * @param {number} top - Specifies the top
 * @param {number} left - Specifies the left
 * @param {ZoomToolbarTooltipSettingsModel} settings - Specifies the tooltip settings.
 * @returns {void}
 * @private
 */
export function createTooltip(id, text, top, left, settings) {
    var tooltip = getElement(id);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var borderColor = getHexColor(settings.borderColor);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var fontColor = getHexColor(settings.fontColor);
    var style = 'top:' + top.toString() + 'px;' +
        'left:' + left.toString() + 'px;' +
        'color:' + (fontColor ? 'rgba(' + fontColor.r + ',' + fontColor.g + ',' + fontColor.b + ',' + settings.fontOpacity + ')'
        : settings.fontColor) + ';' +
        'background:' + settings.fill + ';' +
        'z-index: 2;' +
        'position:absolute;border:' + settings.borderWidth + 'px solid ' +
        (borderColor ? 'rgba(' + borderColor.r + ',' + borderColor.g + ',' + borderColor.b + ',' + settings.borderOpacity + ')'
            : settings.borderColor) + ';font-family:' + settings.fontFamily +
        ';font-style:' + settings.fontStyle + ';font-weight:' + settings.fontWeight +
        ';font-size:' + settings.fontSize + ';border-radius:' + settings.borderWidth + 'px;';
    if (!tooltip && settings.visible) {
        tooltip = createElement('div', {
            id: id
        });
        tooltip.innerHTML = SanitizeHtmlHelper.sanitize('&nbsp;' + text + '&nbsp;');
        tooltip.style.cssText = style;
        document.body.appendChild(tooltip);
    }
    else if (settings.visible) {
        tooltip.innerHTML = SanitizeHtmlHelper.sanitize('&nbsp;' + text + '&nbsp;');
        tooltip.style.cssText = style;
    }
}
/**
 * @param {string} color - Specifies the color
 * @returns {any} - Returns the color in rgb
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getHexColor(color) {
    if (color.indexOf('#') !== -1 && color.toLowerCase().indexOf('rgb') === -1) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var colorArray = (/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i).exec(color);
        return colorArray ? { r: parseInt(colorArray[1], 16), g: parseInt(colorArray[2], 16), b: parseInt(colorArray[3], 16) } : null;
    }
    else if (color.toLowerCase().indexOf('rgb') !== -1) {
        var colorArray = color.match(/\d+/g).map(function (a) { return parseInt(a, 10); });
        return colorArray ? { r: colorArray[0], g: colorArray[1], b: colorArray[2] } : null;
    }
    else {
        var divElment = document.createElement('div');
        divElment.style.color = color;
        // eslint-disable-next-line @typescript-eslint/tslint/config
        var colorArray = window.getComputedStyle(document.body.appendChild(divElment)).color.match(/\d+/g).map(function (a) { return parseInt(a, 10); });
        document.body.removeChild(divElment);
        return colorArray ? { r: colorArray[0], g: colorArray[1], b: colorArray[2] } : null;
    }
}
/**
 * @param {Point} location - Specifies the location
 * @param {string} shape - Specifies the shape
 * @param {Size} size - Specifies the size
 * @param {string} url - Specifies the url
 * @param {PathOption} options - Specifies the options
 * @returns {Element} - Returns the element
 * @private
 */
export function drawSymbol(location, shape, size, url, options) {
    var renderer = new SvgRenderer('');
    var temp = renderLegendShape(location, size, shape, options, url);
    var htmlObject = renderer['draw' + temp.functionName](temp.renderOption);
    return htmlObject;
}
/**
 * @param {MapLocation} location - Specifies the location
 * @param {Size} size - Specifies the size
 * @param {string} shape - Specifies the shape
 * @param {PathOption} options - Specifies the path options
 * @param {string} url - Specifies the url
 * @returns {IShapes} - Returns the shapes
 * @private
 */
export function renderLegendShape(location, size, shape, options, url) {
    var renderPath;
    var functionName = 'Path';
    var shapeWidth = size.width;
    var shapeHeight = size.height;
    var shapeX = location.x;
    var shapeY = location.y;
    var x = location.x + (-shapeWidth / 2);
    var y = location.y + (-shapeHeight / 2);
    options['stroke'] = (shape === 'HorizontalLine' || shape === 'VerticalLine' || shape === 'Cross') ? options['fill'] : options['stroke'];
    options['stroke-width'] = (options['stroke-width'] === 0 && (shape === 'HorizontalLine' || shape === 'VerticalLine' || shape === 'Cross')) ? 1 : options['stroke-width'];
    switch (shape) {
        case 'Circle':
        case 'Bubble':
            functionName = 'Ellipse';
            merge(options, { 'rx': shapeWidth / 2, 'ry': shapeHeight / 2, 'cx': shapeX, 'cy': shapeY });
            break;
        case 'VerticalLine':
            renderPath = 'M' + ' ' + shapeX + ' ' + (shapeY + (shapeHeight / 2)) + ' ' + 'L' + ' ' + shapeX + ' '
                + (shapeY + (-shapeHeight / 2));
            merge(options, { 'd': renderPath });
            break;
        case 'HorizontalLine':
            renderPath = 'M' + ' ' + shapeX + ' ' + shapeY + ' ' + 'L' + ' ' + (shapeX + (shapeWidth / 2)) + ' '
                + shapeY;
            merge(options, { 'd': renderPath });
            break;
        case 'Diamond':
            renderPath = 'M' + ' ' + x + ' ' + shapeY + ' ' +
                'L' + ' ' + shapeX + ' ' + (shapeY + (-shapeHeight / 2)) + ' ' +
                'L' + ' ' + (shapeX + (shapeWidth / 2)) + ' ' + shapeY + ' ' +
                'L' + ' ' + shapeX + ' ' + (shapeY + (shapeHeight / 2)) + ' ' +
                'L' + ' ' + x + ' ' + shapeY + ' z';
            merge(options, { 'd': renderPath });
            break;
        case 'Rectangle':
            renderPath = 'M' + ' ' + x + ' ' + (shapeY + (-shapeHeight / 2)) + ' ' +
                'L' + ' ' + (shapeX + (shapeWidth / 2)) + ' ' + (shapeY + (-shapeHeight / 2)) + ' ' +
                'L' + ' ' + (shapeX + (shapeWidth / 2)) + ' ' + (shapeY + (shapeHeight / 2)) + ' ' +
                'L' + ' ' + x + ' ' + (shapeY + (shapeHeight / 2)) + ' ' +
                'L' + ' ' + x + ' ' + (shapeY + (-shapeHeight / 2)) + ' z';
            merge(options, { 'd': renderPath });
            break;
        case 'Triangle':
            renderPath = 'M' + ' ' + x + ' ' + (shapeY + (shapeHeight / 2)) + ' ' +
                'L' + ' ' + shapeX + ' ' + (shapeY + (-shapeHeight / 2)) + ' ' +
                'L' + ' ' + (shapeX + (shapeWidth / 2)) + ' ' + (shapeY + (shapeHeight / 2)) + ' ' +
                'L' + ' ' + x + ' ' + (shapeY + (shapeHeight / 2)) + ' z';
            merge(options, { 'd': renderPath });
            break;
        case 'InvertedTriangle':
            renderPath = 'M' + ' ' + (shapeX + (shapeWidth / 2)) + ' ' + (shapeY - (shapeHeight / 2)) + ' ' +
                'L' + ' ' + shapeX + ' ' + (shapeY + (shapeHeight / 2)) + ' ' +
                'L' + ' ' + (shapeX - (shapeWidth / 2)) + ' ' + (shapeY - (shapeHeight / 2)) + ' ' +
                'L' + ' ' + (shapeX + (shapeWidth / 2)) + ' ' + (shapeY - (shapeHeight / 2)) + ' z';
            merge(options, { 'd': renderPath });
            break;
        case 'Pentagon':
            // eslint-disable-next-line no-case-declarations
            var eq = 72;
            var xValue = void 0;
            var yValue = void 0;
            for (var i = 0; i <= 5; i++) {
                xValue = (shapeWidth / 2) * Math.cos((Math.PI / 180) * (i * eq));
                yValue = (shapeWidth / 2) * Math.sin((Math.PI / 180) * (i * eq));
                if (i === 0) {
                    renderPath = 'M' + ' ' + (shapeX + xValue) + ' ' + (shapeY + yValue) + ' ';
                }
                else {
                    renderPath = renderPath.concat('L' + ' ' + (shapeX + xValue) + ' ' + (shapeY + yValue) + ' ');
                }
            }
            renderPath = renderPath.concat('Z');
            merge(options, { 'd': renderPath });
            break;
        case 'Star':
            renderPath = 'M ' + (location.x + size.width / 3) + ' ' + (location.y + size.height / 2) + ' L ' + (location.x - size.width / 2)
                + ' ' + (location.y - size.height / 6) + ' L ' + (location.x + size.width / 2) + ' ' + (location.y - size.height / 6)
                + ' L ' + (location.x - size.width / 3) + ' ' + (location.y + size.height / 2) + ' L ' + location.x + ' ' +
                (location.y - size.height / 2) + ' L ' + (location.x + size.width / 3) + ' ' + (location.y + size.height / 2) + ' Z';
            merge(options, { 'd': renderPath });
            break;
        case 'Cross':
            renderPath = 'M' + ' ' + x + ' ' + shapeY + ' ' + 'L' + ' ' + (shapeX + (shapeWidth / 2)) + ' ' + shapeY + ' ' +
                'M' + ' ' + shapeX + ' ' + (shapeY + (shapeHeight / 2)) + ' ' + 'L' + ' ' + shapeX + ' ' +
                (shapeY + (-shapeHeight / 2));
            merge(options, { 'd': renderPath });
            break;
        case 'Image':
            functionName = 'Image';
            merge(options, { 'href': url, 'height': shapeHeight, 'width': shapeWidth, x: x, y: y });
            break;
    }
    return { renderOption: options, functionName: functionName };
}
/**
 * Animation Effect Calculation End
 *
 * @private
 */
// export function markerTemplateAnimate(element: Element, delay: number, duration: number, point: MapLocation): void {
//     let delta: number = 0;
//     let top: string = (element as HTMLElement).style.top;
//     let y: number = parseInt(top, 10);
//     new Animation({}).animate(<HTMLElement>element, {
//         duration: duration,
//         delay: delay,
//         progress: (args: AnimationOptions): void => {
//             if (args.timeStamp > args.delay) {
//                 delta = ((args.timeStamp - args.delay) / args.duration);
//                 (element as HTMLElement).style.top = y - 100 + (delta * 100) + 'px';
//             }
//         },
//         end: (model: AnimationOptions) => {
//             (element as HTMLElement).style.top = top;
//         }
//     });
// }
/**
 * @param {HTMLElement} childElement - Specifies the child element
 * @param {HTMLElement} parentElement - Specifies the parent element
 * @returns {Size} - Returns the size
 * @private
 */
export function getElementOffset(childElement, parentElement) {
    parentElement.appendChild(childElement);
    var width = childElement.offsetWidth;
    var height = childElement.offsetHeight;
    parentElement.removeChild(childElement);
    return new Size(width, height);
}
/**
 * @param {Element} element - Specifies the element
 * @param {number} index - Specifies the element
 * @param {number} scale - Specifies the scale
 * @param {Maps} maps - Specifies the instance of the maps
 * @returns {void}
 * @private
 */
export function changeBorderWidth(element, index, scale, maps) {
    var childNode;
    for (var l = 0; l < element.childElementCount; l++) {
        childNode = element.childNodes[l];
        if (childNode.id.indexOf('_NavigationGroup') > -1) {
            changeNavaigationLineWidth(childNode, index, scale, maps);
        }
        else if (childNode.id.indexOf('_Polygons_Group') > -1) {
            for (var i = 0; i < childNode.childElementCount; i++) {
                // eslint-disable-next-line
                var width = maps.layersCollection[index].polygonSettings.polygons[parseInt(childNode.children[i].id.split('_PolygonIndex_')[1])].borderWidth;
                childNode.children[i].setAttribute('stroke-width', (width / scale).toString());
            }
        }
        else {
            var currentStroke = void 0;
            var value = 0;
            var borderWidthValue = maps.layersCollection[index].shapeSettings.borderWidthValuePath;
            var borderWidth = maps.layersCollection[index].shapeSettings.border.width;
            var circleRadius = maps.layersCollection[index].shapeSettings.circleRadius;
            if (maps.layersCollection[index].shapeSettings.borderWidthValuePath) {
                value = checkShapeDataFields(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                maps.layersCollection[index].dataSource, maps.layersCollection[index].layerData[l]['property'], maps.layersCollection[index].shapeDataPath, maps.layersCollection[index].shapePropertyPath, maps.layersCollection[index]);
                if (value !== null) {
                    if (maps.layersCollection[index].dataSource[value][borderWidthValue]) {
                        currentStroke = maps.layersCollection[index].dataSource[value][borderWidthValue];
                    }
                    else {
                        currentStroke = (isNullOrUndefined(borderWidth) ? 0 : borderWidth);
                    }
                }
                else {
                    currentStroke = (isNullOrUndefined(borderWidth) ? 0 : borderWidth);
                }
            }
            else {
                currentStroke = (isNullOrUndefined(borderWidth) ? 0 : borderWidth);
            }
            childNode.setAttribute('stroke-width', (currentStroke / scale).toString());
            if (element.id.indexOf('_Point') > -1 || element.id.indexOf('_MultiPoint') > -1) {
                childNode.setAttribute('r', (circleRadius / scale).toString());
            }
        }
    }
}
/**
 * @param {Element} element - Specifies the element
 * @param {number} index - Specifies the element
 * @param {number} scale - Specifies the scale
 * @param {Maps} maps - Specifies the instance of the maps
 * @returns {void}
 * @private
 */
export function changeNavaigationLineWidth(element, index, scale, maps) {
    var node;
    for (var m = 0; m < element.childElementCount; m++) {
        node = element.childNodes[m];
        if (node.tagName === 'path') {
            var currentStroke = (maps.layersCollection[index]
                .navigationLineSettings[parseFloat(node.id.split('_NavigationIndex_')[1].split('_')[0])].width);
            node.setAttribute('stroke-width', (currentStroke / scale).toString());
        }
    }
}
// /** Pinch zoom helper methods */
/**
 * @param {PointerEvent | TouchEvent} event - Specifies the pointer or touch event
 * @returns {ITouches[]} - Returns the target
 * @private
 */
export function targetTouches(event) {
    var targetTouches = [];
    var touches = event.touches;
    for (var i = 0; i < touches.length; i++) {
        targetTouches.push({ pageX: touches[i].pageX, pageY: touches[i].pageY });
    }
    return targetTouches;
}
/**
 * @param {ITouches[]} startTouches - Specifies the start touches
 * @param {ITouches[]} endTouches - Specifies the end touches
 * @returns {number} - Returns the number
 * @private
 */
export function calculateScale(startTouches, endTouches) {
    var startDistance = getDistance(startTouches[0], startTouches[1]);
    var endDistance = getDistance(endTouches[0], endTouches[1]);
    return (endDistance / startDistance);
}
/**
 * @param {ITouches} a - Specifies the a value
 * @param {ITouches} b - Specifies the b value
 * @returns {number} - Returns the number
 * @private
 */
export function getDistance(a, b) {
    var x = a.pageX - b.pageX;
    var y = a.pageY - b.pageY;
    return Math.sqrt(x * x + y * y);
}
/**
 * @param {ITouches[]} touches - Specifies the touches
 * @param {Maps} maps - Specifies the instance of the maps
 * @returns {any[]} - Returns the object
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getTouches(touches, maps) {
    var rect = maps.element.getBoundingClientRect();
    var posTop = rect.top + document.defaultView.pageXOffset;
    var posLeft = rect.left + document.defaultView.pageYOffset;
    return Array.prototype.slice.call(touches).map(function (touch) {
        return {
            x: touch.pageX - posLeft,
            y: touch.pageY - posTop
        };
    });
}
/**
 * @param {any[]} touches - Specifies the touches
 * @returns {Point} - Returns the point
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getTouchCenter(touches) {
    return {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        x: touches.map(function (e) { return e['x']; }).reduce(sum) / touches.length,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        y: touches.map(function (e) { return e['y']; }).reduce(sum) / touches.length
    };
}
/**
 * @param {number} a - Specifies a value
 * @param {number} b - Specifies b value
 * @returns {number} - Returns the sum of a and b
 * @private
 */
export function sum(a, b) {
    return a + b;
}
/**
 * Animation Effect Calculation End.
 *
 * @param {Element} element - Specifies the element.
 * @param {number} delay - Specifies the delay.
 * @param {number} duration - Specifies the duration.
 * @param {MapLocation} point - Specifies the location.
 * @param {number} scale - Specifies the scale value.
 * @param {Size} size - Specifies the size.
 * @param {Maps} maps - Specifies the maps.
 * @returns {void}
 * @private
 */
export function zoomAnimate(element, delay, duration, point, scale, size, maps) {
    var delta = 0;
    var previousLocation = maps.previousPoint;
    var preScale = maps.previousScale;
    var diffScale = scale - preScale;
    var currentLocation = new MapLocation(0, 0);
    var currentScale = 1;
    if (scale === preScale) {
        element.setAttribute('transform', 'scale( ' + (scale) + ' ) translate( ' + point.x + ' ' + point.y + ' )');
        return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var slope = function (previousLocation, point) {
        if (previousLocation.x === point.x) {
            return null;
        }
        return (point.y - previousLocation.y) / (point.x - previousLocation.x);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var intercept = function (point, slopeValue) {
        if (slopeValue === null) {
            return point.x;
        }
        return point.y - slopeValue * point.x;
    };
    var slopeFactor = slope(previousLocation, point);
    var slopeIntersection = intercept(previousLocation, slopeFactor);
    var horizontalDifference = point.x - previousLocation.x;
    var verticalDifference = point.y - previousLocation.y;
    animate(element, delay, duration, function (args) {
        if (args.timeStamp > args.delay) {
            delta = ((args.timeStamp - args.delay) / args.duration);
            currentScale = preScale + (delta * diffScale);
            currentLocation.x = previousLocation.x + (delta * horizontalDifference) / (currentScale / scale);
            if (slopeFactor == null) {
                currentLocation.y = previousLocation.y + (delta * verticalDifference);
            }
            else {
                currentLocation.y = ((slopeFactor * currentLocation.x) + slopeIntersection);
            }
            args.element.setAttribute('transform', 'scale( ' + currentScale + ' ) ' +
                'translate( ' + currentLocation.x + ' ' + currentLocation.y + ' )');
            maps.translatePoint = currentLocation;
            maps.scale = currentScale;
            maps.zoomModule.processTemplate(point.x, point.y, currentScale, maps);
        }
    }, function () {
        maps.translatePoint = point;
        maps.scale = scale;
        element.setAttribute('transform', 'scale( ' + (scale) + ' ) translate( ' + point.x + ' ' + point.y + ' )');
        maps.zoomModule.processTemplate(point.x, point.y, scale, maps);
    });
}
/**
 * To process custom animation.
 *
 * @param {Element} element - Specifies the element
 * @param {number} delay - Specifies the delay
 * @param {number} duration - Specifies the duration
 * @param {Function} process - Specifies the process
 * @param {Function} end - Specifies the end
 * @returns {void}
 * @private
 */
export function animate(element, delay, duration, process, end) {
    var _this = this;
    var start = null;
    // eslint-disable-next-line prefer-const
    var clearAnimation;
    var markerStyle = 'visibility:visible';
    duration = animationMode === 'Disable' ? 0 : duration;
    var startAnimation = function (timestamp) {
        if (!start) {
            start = timestamp;
        }
        var progress = timestamp - start;
        if (progress < duration) {
            process.call(_this, { element: element, delay: 0, timeStamp: progress, duration: duration });
            window.requestAnimationFrame(startAnimation);
        }
        else {
            window.cancelAnimationFrame(clearAnimation);
            end.call(_this, { element: element });
            if (element.id.indexOf('Marker') > -1) {
                var markerElement = getElementByID(element.id.split('_Layer')[0] + '_Markers_Group');
                markerElement.style.cssText = markerStyle;
            }
        }
    };
    clearAnimation = window.requestAnimationFrame(startAnimation);
}
/**
 * Defines the options to get shape data file using Ajax request.
 */
var MapAjax = /** @class */ (function () {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function MapAjax(options, type, async, contentType, sendData) {
        this.dataOptions = options;
        this.type = type || 'GET';
        this.async = async || true;
        this.contentType = contentType;
        this.sendData = sendData;
    }
    return MapAjax;
}());
export { MapAjax };
/**
 * Animation Translate.
 *
 * @param {Element} element - Specifies the element
 * @param {number} delay - Specifies the delay
 * @param {number} duration - Specifies the duration
 * @param {MapLocation} point - Specifies the location
 * @returns {void}
 * @private
 */
export function smoothTranslate(element, delay, duration, point) {
    var delta = 0;
    var transform = element.getAttribute('transform').split(' ');
    if (transform.length === 2) {
        transform[2] = transform[1].split(')')[0];
        transform[1] = transform[0].split('(')[1];
    }
    var previousLocation = new MapLocation(parseInt(transform[1], 10), parseInt(transform[2], 10));
    var diffx = point.x - previousLocation.x;
    var diffy = point.y - previousLocation.y;
    var currentLocation = new MapLocation(0, 0);
    animate(element, delay, duration, function (args) {
        if (args.timeStamp > args.delay) {
            delta = ((args.timeStamp - args.delay) / args.duration);
            currentLocation.x = previousLocation.x + (delta * diffx);
            currentLocation.y = previousLocation.y + (delta * diffy);
            args.element.setAttribute('transform', 'translate( ' + currentLocation.x + ' ' + currentLocation.y + ' )');
        }
    }, function () {
        element.setAttribute('transform', 'translate( ' + point.x + ' ' + point.y + ' )');
    });
}
/**
 * To find compare should zoom factor with previous factor and current factor.
 *
 * @param {number} scaleFactor - Specifies the scale factor
 * @param {Maps} maps - Specifies the instance of the maps
 * @returns {void}
 * @private
 */
export function compareZoomFactor(scaleFactor, maps) {
    var previous = isNullOrUndefined(maps.shouldZoomPreviousFactor) ?
        null : maps.shouldZoomPreviousFactor;
    var current = isNullOrUndefined(maps.shouldZoomCurrentFactor) ?
        null : maps.shouldZoomCurrentFactor;
    if (!isNullOrUndefined(current)) {
        maps.shouldZoomCurrentFactor = null;
        maps.shouldZoomPreviousFactor = null;
    }
    else if (!isNullOrUndefined(previous)
        && isNullOrUndefined(current)
        && maps.shouldZoomPreviousFactor !== scaleFactor) {
        maps.shouldZoomCurrentFactor = scaleFactor;
    }
    else {
        maps.shouldZoomPreviousFactor = scaleFactor;
    }
}
/**
 * To find zoom level for the min and max latitude values.
 *
 * @param {number} minLat - Specifies the minimum latitude
 * @param {number} maxLat - Specifies the maximum latitude
 * @param {number} minLong - Specifies the minimum longitude
 * @param {number} maxLong - Specifies the maximum longitude
 * @param {number} mapWidth - Specifies the width of the maps
 * @param {number} mapHeight - Specifies the height of the maps
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {boolean} isZoomToCoordinates - Checks for the zoom to coordinates
 * @returns {number} - Returns the scale factor
 * @private
 */
export function calculateZoomLevel(minLat, maxLat, minLong, maxLong, mapWidth, mapHeight, maps, isZoomToCoordinates) {
    var scaleFactor;
    var maxZoomFact = maps.zoomSettings.maxZoom;
    var applyMethodeZoom;
    var maxLatSin = Math.sin(maxLat * Math.PI / 180);
    var maxLatRad = Math.log((1 + maxLatSin) / (1 - maxLatSin)) / 2;
    var maxLatValue = Math.max(Math.min(maxLatRad, Math.PI), -Math.PI) / 2;
    var minLatSin = Math.sin(minLat * Math.PI / 180);
    var minLatRad = Math.log((1 + minLatSin) / (1 - minLatSin)) / 2;
    var minLatValue = Math.max(Math.min(minLatRad, Math.PI), -Math.PI) / 2;
    if (maps.zoomNotApplied && !maps.isTileMap) {
        var latiRatio = Math.abs((maps.baseMapBounds.latitude.max - maps.baseMapBounds.latitude.min) / (maxLat - minLat));
        var longiRatio = Math.abs((maps.baseMapBounds.longitude.max - maps.baseMapBounds.longitude.min) / (maxLong - minLong));
        applyMethodeZoom = isZoomToCoordinates ? (latiRatio + longiRatio) / 2 : Math.min(latiRatio, longiRatio);
    }
    var latRatio = (maxLatValue - minLatValue) / Math.PI;
    var lngDiff = maxLong - minLong;
    var lngRatio = ((lngDiff < 0) ? (lngDiff + 360) : lngDiff) / 360;
    var WORLD_PX_HEIGHT = 256;
    var WORLD_PX_WIDTH = 256;
    var latZoom = (Math.log(mapHeight / WORLD_PX_HEIGHT / latRatio) / Math.LN2);
    var lngZoom = (Math.log(mapWidth / WORLD_PX_WIDTH / lngRatio) / Math.LN2);
    var result = (maps.zoomNotApplied && !maps.isTileMap) ? applyMethodeZoom :
        isZoomToCoordinates && !maps.isTileMap ? (latZoom + lngZoom) / 2 : Math.min(latZoom, lngZoom);
    scaleFactor = Math.min(result, maxZoomFact);
    scaleFactor = maps.isTileMap || !maps.zoomNotApplied ? Math.floor(scaleFactor) : scaleFactor;
    if (!maps.isTileMap) {
        compareZoomFactor(scaleFactor, maps);
    }
    return scaleFactor;
}
/**
 * Method to get the result.
 *
 * @param {any} e - Specifies the any type value
 * @returns {any} - Returns the data value
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function processResult(e) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var dataValue;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var resultValue = !isNullOrUndefined(e['result']) ? e['result'] : e['actual'];
    if (isNullOrUndefined(resultValue.length)) {
        if (!isNullOrUndefined(resultValue['Items'])) {
            dataValue = resultValue['Items'];
        }
    }
    else {
        dataValue = resultValue;
    }
    return dataValue;
}
