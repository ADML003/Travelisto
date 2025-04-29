/**
 * Circular 3D chart tooltip.
 */
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
import { ChildProperty, Complex, Property, extend, remove } from '@syncfusion/ej2-base';
import { Border, Font, Location } from '../../common/model/base';
import { removeElement, stopTimer, withInBounds } from '../../common/utils/helper';
import { Tooltip as SVGTooltip } from '@syncfusion/ej2-svg-base';
import { tooltipRender } from '../../common/model/constants';
/**
 * Represents data for a 3D point in a circular 3D series.
 *
 * @private
 */
var CircularChart3DPointData = /** @class */ (function () {
    /**
     * Initializes a new instance of the CircularChart3DPointData class.
     *
     * @param {CircularChart3DPoints} point - The 3D point in the circular series.
     * @param {CircularChart3DSeries} series - The circular series to which the point belongs.
     * @param {number} index - The index of the point in the series. Default is 0.
     */
    function CircularChart3DPointData(point, series, index) {
        if (index === void 0) { index = 0; }
        this.point = point;
        this.series = series;
        this.index = index;
    }
    return CircularChart3DPointData;
}());
export { CircularChart3DPointData };
/**
 * Represents the tooltip settings for a circular 3D chart.
 *
 */
var CircularChart3DTooltipSettings = /** @class */ (function (_super) {
    __extends(CircularChart3DTooltipSettings, _super);
    function CircularChart3DTooltipSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(false)
    ], CircularChart3DTooltipSettings.prototype, "enable", void 0);
    __decorate([
        Property(true)
    ], CircularChart3DTooltipSettings.prototype, "enableMarker", void 0);
    __decorate([
        Property(null)
    ], CircularChart3DTooltipSettings.prototype, "fill", void 0);
    __decorate([
        Property(null)
    ], CircularChart3DTooltipSettings.prototype, "header", void 0);
    __decorate([
        Property(null)
    ], CircularChart3DTooltipSettings.prototype, "opacity", void 0);
    __decorate([
        Complex({ fontFamily: null, size: '12px', fontStyle: 'Normal', fontWeight: null, color: null }, Font)
    ], CircularChart3DTooltipSettings.prototype, "textStyle", void 0);
    __decorate([
        Property(null)
    ], CircularChart3DTooltipSettings.prototype, "format", void 0);
    __decorate([
        Property(null)
    ], CircularChart3DTooltipSettings.prototype, "template", void 0);
    __decorate([
        Property(false)
    ], CircularChart3DTooltipSettings.prototype, "enableAnimation", void 0);
    __decorate([
        Property(300)
    ], CircularChart3DTooltipSettings.prototype, "duration", void 0);
    __decorate([
        Property(700)
    ], CircularChart3DTooltipSettings.prototype, "fadeOutDuration", void 0);
    __decorate([
        Property(false)
    ], CircularChart3DTooltipSettings.prototype, "enableTextWrap", void 0);
    __decorate([
        Complex({ color: null, width: null }, Border)
    ], CircularChart3DTooltipSettings.prototype, "border", void 0);
    __decorate([
        Complex({ x: null, y: null }, Location)
    ], CircularChart3DTooltipSettings.prototype, "location", void 0);
    return CircularChart3DTooltipSettings;
}(ChildProperty));
export { CircularChart3DTooltipSettings };
/**
 * The `CircularChart3DTooltip` module is used to render tooltips for a circular 3D chart.
 */
var CircularChartTooltip3D = /** @class */ (function (_super) {
    __extends(CircularChartTooltip3D, _super);
    function CircularChartTooltip3D() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** @private */
        _this.currentPoints = [];
        /** @private */
        _this.previousPoints = [];
        /** @private */
        _this.tooltipRendered = false;
        return _this;
    }
    /**
     * Handles the mouse leave event for the circular 3D chart.
     *
     * @returns {void}
     */
    CircularChartTooltip3D.prototype.mouseLeaveHandler = function () {
        this.removeTooltip(this.control.tooltip.fadeOutDuration);
    };
    /**
     * Handles the mouse up event for the circular 3D chart.
     *
     * @param {PointerEvent | TouchEvent} event - The mouse or touch event.
     * @param {CircularChart3D} chart - The circular 3D chart instance.
     * @returns {void}
     */
    CircularChartTooltip3D.prototype.mouseUpHandler = function (event, chart) {
        this.control = chart;
        this.element = chart.element;
        var swipeThreshold = 10;
        var isWithinSwipeThreshold = Math.abs(chart.mouseX - chart.cachedX) < swipeThreshold &&
            Math.abs(chart.mouseY - chart.cachedY) < swipeThreshold;
        if (this.control.tooltip.enable && !chart.rotateActivate && isWithinSwipeThreshold
            && withInBounds(this.control.mouseX, this.control.mouseY, this.control.initialClipRect) && this.control.isTouch) {
            this.tooltip(event);
            this.removeTooltip(2000);
            this.tooltipRendered = true;
        }
        else if (this.control.isTouch) {
            this.removeTooltip(0);
        }
    };
    /**
     * Handles the mouse move event for the circular 3D chart.
     *
     * @param {PointerEvent | TouchEvent} event - The mouse or touch event.
     * @param {CircularChart3D} chart - The circular 3D chart instance.
     * @returns {void}
     */
    CircularChartTooltip3D.prototype.mouseMoveHandler = function (event, chart) {
        this.control = chart;
        this.element = chart.element;
        if (!this.tooltipRendered) {
            if (this.control.tooltip.enable && !chart.rotateActivate &&
                withInBounds(this.control.mouseX, this.control.mouseY, this.control.initialClipRect)) {
                this.tooltip(event);
            }
            else {
                this.removeTooltip(0);
            }
        }
        this.tooltipRendered = false;
    };
    /**
     * Displays the tooltip for the circular 3D pie chart on pointer events or touch events.
     *
     * @param  {PointerEvent} event - The event triggering the tooltip display (pointer event or touch event).
     * @returns {void}
     */
    CircularChartTooltip3D.prototype.tooltip = function (event) {
        this.renderSeriesTooltip(this.control, this.getPieData(event, this.control));
    };
    /**
     * Gets the HTML element with the specified ID from the document.
     *
     * @param {string} id - The ID of the HTML element to retrieve.
     * @returns {HTMLElement} - The HTML element with the specified ID, or null if not found.
     */
    CircularChartTooltip3D.prototype.getElement = function (id) {
        return document.getElementById(id);
    };
    /**
     * Gets the tooltip element based on the visibility of the tooltip.
     *
     * @param {boolean} isTooltip - A flag indicating whether the tooltip is currently visible.
     * @returns {HTMLDivElement} - The tooltip element is returned, or null if the tooltip is not visible.
     */
    CircularChartTooltip3D.prototype.getTooltipElement = function (isTooltip) {
        this.header = (this.control.tooltip.header === null) ? '${series.name}' : (this.control.tooltip.header);
        this.formattedText = [];
        var tooltipDiv = document.getElementById(this.control.element.id + '_tooltip');
        if (!isTooltip && !tooltipDiv) {
            return this.createElement();
        }
        return null;
    };
    /**
     * Creates and returns an HTMLDivElement for the tooltip.
     *
     * @returns {HTMLDivElement} - The created HTMLDivElement for the tooltip.
     */
    CircularChartTooltip3D.prototype.createElement = function () {
        var tooltipDiv = document.createElement('div');
        tooltipDiv.id = this.element.id + '_tooltip';
        tooltipDiv.className = 'ejSVGTooltip';
        tooltipDiv.style.pointerEvents = 'none';
        tooltipDiv.style.position = 'absolute';
        tooltipDiv.style.zIndex = '1';
        return tooltipDiv;
    };
    /**
     * Renders the tooltip for a circular 3D series based on the provided point data.
     *
     * @param {CircularChart3D} chart - The circular 3D chart instance.
     * @param {CircularChart3DPointData} data - The CircularChart3D point data for which the tooltip will be rendered.
     * @returns {void}
     * @private
     */
    CircularChartTooltip3D.prototype.renderSeriesTooltip = function (chart, data) {
        var svgElement = this.getElement(this.element.id + '_tooltip_svg');
        var isTooltip = svgElement && parseInt(svgElement.getAttribute('opacity'), 10) > 0;
        var tooltipDiv = this.getTooltipElement(isTooltip);
        var isFirst = !isTooltip;
        this.template = chart.tooltip.template;
        this.currentPoints = [];
        if (data.point) {
            if (this.pushData(data, tooltipDiv)) {
                this.triggerTooltipRender(data, isFirst, this.getTooltipText(data, chart.tooltip), this.findHeader(data));
            }
        }
        else {
            if (!data.point && this.isRemove) {
                this.removeTooltip(this.control.tooltip.fadeOutDuration);
                this.isRemove = false;
            }
        }
    };
    /**
     * Removes the tooltip with a specified duration.
     *
     * @param {number} duration - The duration for the tooltip removal animation.
     * @returns {void}
     * @private
     */
    CircularChartTooltip3D.prototype.removeTooltip = function (duration) {
        var _this = this;
        var tooltipElement = this.getElement(this.element.id + '_tooltip');
        this.stopAnimation();
        if (tooltipElement && this.previousPoints.length > 0) {
            this.tooltipInterval = +setTimeout(function () {
                if (_this.svgTooltip) {
                    _this.svgTooltip.fadeOut();
                }
            }, duration);
        }
    };
    /**
     * Stops the animation by clearing the tooltip interval.
     *
     * @returns {void}
     */
    CircularChartTooltip3D.prototype.stopAnimation = function () {
        stopTimer(this.tooltipInterval);
    };
    /**
     * Pushes CircularChart3D point data to the currentPoints array and updates the tooltip div if tooltip are enabled for the series.
     *
     * @param {CircularChart3DPointData} data - The CircularChart3D point data to be pushed.
     * @param {HTMLDivElement} tooltipDiv - The tooltip div element to be updated if tooltip are enabled.
     * @returns {boolean} - A flag indicating whether the data was successfully pushed.
     */
    CircularChartTooltip3D.prototype.pushData = function (data, tooltipDiv) {
        if (data.series.enableTooltip) {
            this.currentPoints.push(data);
            this.stopAnimation();
            if (tooltipDiv && !document.getElementById(tooltipDiv.id)) {
                document.getElementById(this.element.id + '_Secondary_Element').appendChild(tooltipDiv);
            }
            return true;
        }
        return false;
    };
    /**
     * Triggers the rendering of a tooltip for a CircularChart3D point data.
     *
     * @param {CircularChart3DPointData} point - The CircularChart3D point data for which the tooltip will be rendered.
     * @param {boolean} isFirst - A flag indicating whether it is the first rendering of the tooltip.
     * @param {string} textCollection - The collection of text to be included in the tooltip.
     * @param {string} headerText - The header text for the tooltip.
     * @returns {void}
     */
    CircularChartTooltip3D.prototype.triggerTooltipRender = function (point, isFirst, textCollection, headerText) {
        var _this = this;
        var tooltip = this.control.tooltip;
        var argsData = {
            cancel: false, text: textCollection, point: point.point, textStyle: tooltip.textStyle,
            series: point.series, headerText: headerText, template: this.template,
            data: {
                pointX: point.point.x, pointY: point.point.y, seriesIndex: point.series.index,
                pointIndex: point.point.index, pointText: point.point.text, seriesName: point.series.name
            }
        };
        var padding = 10;
        var tooltipSuccess = function (argsData) {
            if (!argsData.cancel) {
                _this.formattedText = _this.formattedText.concat(argsData.text);
                _this.text = _this.formattedText;
                _this.headerText = argsData.headerText;
                var location_1 = {
                    x: (tooltip.location.x !== null) ? tooltip.location.x : _this.control.mouseX,
                    y: (tooltip.location.y !== null) ? tooltip.location.y : _this.control.mouseY - padding
                };
                _this.createTooltip(_this.control, isFirst, location_1, point.series.clipRect, point.point, 0, _this.control.initialClipRect, null, point.point, _this.template ? argsData.template : '');
            }
            else {
                _this.removeHighlight();
                remove(_this.getElement(_this.element.id + '_tooltip'));
            }
            _this.isRemove = true;
        };
        tooltipSuccess.bind(this, point);
        this.control.trigger(tooltipRender, argsData, tooltipSuccess);
    };
    /**
     * Gets the CircularChart3D point data associated with a pointer or touch event on the chart.
     *
     * @param {PointerEvent | TouchEvent} event - The pointer or touch event.
     * @param {CircularChart3D} chart - The circular 3D chart instance.
     * @returns {CircularChart3DPointData} - The CircularChart3D point data corresponding to the event.
     */
    CircularChartTooltip3D.prototype.getPieData = function (event, chart) {
        var point;
        var series = chart.visibleSeries[0];
        var element = event.target;
        if (element.id.indexOf('point') > -1 && element.id.indexOf('series') > -1) {
            var pointIndex = parseInt(element.id.split('point-')[1], 10);
            point = series.points[pointIndex];
        }
        else if (element.id.indexOf('-data-label-text') > -1 && series.dataLabel.position === 'Inside') {
            var index = parseInt(element.id.split('data-label-text-')[1], 10);
            point = series.points[index];
        }
        else if (element.id.indexOf('data-label-series') > -1 && series.dataLabel.position === 'Inside') {
            var index = parseInt(element.id.split('data-label-series-0-shape-')[1], 10);
            point = series.points[index];
        }
        if (point) {
            var pointData = { point: point, series: series, index: point.index };
            return pointData;
        }
        return new CircularChart3DPointData(null, null);
    };
    /**
     * Gets the tooltip text for a circular 3D point data based on the specified tooltip settings.
     *
     * @param {CircularChart3DPointData} data - The circularChart3D point data for which the tooltip text will be generated.
     * @param {CircularChart3DTooltipSettingsModel} tooltip - The tooltip settings to determine the format of the text.
     * @returns {string} - The generated tooltip text.
     */
    CircularChartTooltip3D.prototype.getTooltipText = function (data, tooltip) {
        var series = data.series;
        var format = tooltip.format ? tooltip.format : this.control.theme.indexOf('Tailwind3') > -1 ? '${point.x} : ${point.y}' : '${point.x} : <b>${point.y}</b>';
        format = this.control.useGroupingSeparator ? format.replace('${point.y}', '${point.separatorY}') : format;
        return this.parseTemplate(data.point, series, format);
    };
    /**
     * Finds the header for circular 3D point data.
     *
     * @param {CircularChart3DPointData} data - The circular 3D point data for which the header will be found.
     * @returns {string} - The found header string.
     */
    CircularChartTooltip3D.prototype.findHeader = function (data) {
        if (this.header === '') {
            return '';
        }
        this.header = this.parseTemplate(data.point, data.series, this.header);
        if (this.header.replace(/<b>/g, '').replace(/<\/b>/g, '').trim() !== '') {
            return this.header;
        }
        return '';
    };
    /**
     * Parses a template for a circular 3D chart.
     *
     * @param {CircularChart3DPoints} point - The circular 3D series point associated with the template.
     * @param {CircularChart3DSeries} series - The circular 3D series associated with the template.
     * @param {string} format - The format for parsing the template.
     * @returns {string} - The parsed template string.
     */
    CircularChartTooltip3D.prototype.parseTemplate = function (point, series, format) {
        var value;
        var textValue;
        var regExp = RegExp;
        for (var _i = 0, _a = Object.keys(point); _i < _a.length; _i++) {
            var dataValue = _a[_i];
            value = new regExp('${point' + '.' + dataValue + '}', 'gm');
            format = format.replace(value.source, point[dataValue]);
        }
        for (var _b = 0, _c = Object.keys(Object.getPrototypeOf(series)); _b < _c.length; _b++) {
            var dataValue = _c[_b];
            value = new regExp('${series' + '.' + dataValue + '}', 'gm');
            textValue = series[dataValue];
            format = format.replace(value.source, textValue);
        }
        return format;
    };
    /**
     * Creates a tooltip for a circularChart3D chart.
     *
     * @param {CircularChart3D} chart - The circular 3D chart instance.
     * @param {boolean} isFirst - A flag indicating whether it is the first tooltip.
     * @param {CircularChart3DLocation} location - The location where the tooltip will be positioned.
     * @param {CircularChart3DLocation} clipLocation - The clipping location for the tooltip.
     * @param {CircularChart3DPoints} point - The circular 3D point associated with the tooltip.
     * @param {number} offset - The offset for the tooltip.
     * @param {Rect} bounds - The bounds of the tooltip.
     * @param {CircularChart3DPointData[]} extraPoints - An array of additional CircularChart3DPointData for the tooltip.
     * @param {CircularChart3DPoints | CircularChart3DPoints[]} templatePoint - The template point or points for the tooltip.
     * @param {string | Function} customTemplate - A custom template for the tooltip, specified as a string or a function.
     * @returns {void}
     */
    CircularChartTooltip3D.prototype.createTooltip = function (chart, isFirst, location, clipLocation, point, offset, bounds, extraPoints, templatePoint, customTemplate) {
        if (extraPoints === void 0) { extraPoints = null; }
        if (templatePoint === void 0) { templatePoint = null; }
        var tooltipModule = chart.circularChartTooltip3DModule;
        if (!tooltipModule || location === null) { // For the tooltip enable is false.
            removeElement(this.control.element.id + '_tooltip');
            return;
        }
        if (isFirst) {
            this.svgTooltip = new SVGTooltip({
                opacity: chart.tooltip.opacity ? chart.tooltip.opacity : ((this.control.theme === 'Material3' || this.control.theme === 'Material3Dark' || this.control.theme.indexOf('Bootstrap5') > -1) ? 1 : 0.75),
                header: this.headerText,
                content: this.text,
                fill: chart.tooltip.fill,
                border: chart.tooltip.border,
                enableAnimation: chart.tooltip.enableAnimation,
                location: location,
                shared: false,
                crosshair: false,
                shapes: !chart.tooltip.enableMarker ? [] : ['Circle'],
                clipBounds: clipLocation,
                areaBounds: bounds,
                palette: this.findPalette(),
                template: customTemplate || this.template,
                data: templatePoint,
                theme: chart.theme,
                offset: offset,
                textStyle: chart.tooltip.textStyle,
                isNegative: false,
                inverted: false,
                arrowPadding: 0,
                availableSize: chart.availableSize,
                duration: this.control.tooltip.duration,
                isCanvas: false,
                isFixed: (this.control.tooltip.location.x !== null || this.control.tooltip.location.y !== null),
                isTextWrap: chart.tooltip.enableTextWrap,
                blazorTemplate: { name: 'Template', parent: this.control.tooltip },
                controlInstance: this.control,
                enableRTL: chart.enableRtl,
                controlName: 'Chart',
                allowHighlight: false,
                tooltipRender: function () {
                    tooltipModule.removeHighlight();
                    tooltipModule.highlightPoints();
                    tooltipModule.updatePreviousPoint(extraPoints);
                },
                animationComplete: function (args) {
                    if (args.tooltip.fadeOuted) {
                        tooltipModule.fadeOut();
                    }
                }
            });
            this.svgTooltip.appendTo(this.getElement(this.element.id + '_tooltip'));
        }
        else {
            if (this.svgTooltip) {
                this.svgTooltip.location = location;
                this.svgTooltip.content = this.text;
                this.svgTooltip.header = this.headerText;
                this.svgTooltip.offset = offset;
                this.svgTooltip.palette = this.findPalette();
                this.svgTooltip.shapes = !chart.tooltip.enableMarker ? [] : ['Circle'];
                this.svgTooltip.data = templatePoint;
                this.svgTooltip.template = this.template;
                this.svgTooltip.controlName = 'Chart';
                this.svgTooltip.crosshair = false;
                this.svgTooltip.textStyle = chart.tooltip.textStyle;
                this.svgTooltip.isNegative = false;
                this.svgTooltip.clipBounds = clipLocation;
                this.svgTooltip.arrowPadding = 0;
                this.svgTooltip.allowHighlight = false;
                this.svgTooltip.dataBind();
            }
        }
        if (this.control.isReact) {
            this.control.renderReactTemplates();
        }
    };
    /**
     * Highlights multiple points in a circular 3D chart series.
     * This method iterates through a collection of points (assuming they are represented by 'i') and applies the highlight effect to each point.
     *
     * @returns {void}
     */
    CircularChartTooltip3D.prototype.highlightPoints = function () {
        for (var _i = 0, _a = this.currentPoints; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.series.isRectSeries && item.series.category === 'Series') {
                this.highlightPoint(item.series, item.point.index, true);
            }
        }
    };
    /**
     * Removes the highlight from a previously highlighted point in a circular 3D chart series.
     *
     * @returns {void}
     */
    CircularChartTooltip3D.prototype.removeHighlight = function () {
        var item;
        for (var i = 0, len = this.previousPoints.length; i < len; i++) {
            item = this.previousPoints[i];
            if (item.series.isRectSeries) {
                if (item.series.visible) {
                    this.highlightPoint(item.series, item.point.index, false);
                }
                continue;
            }
        }
    };
    /**
     * Highlights or un highlights a specific point in a circular 3D chart series.
     *
     * @param {CircularChart3DSeries} series - The circular 3D series to which the point belongs.
     * @param {number} pointIndex - The index of the point to be highlighted or un highlighted.
     * @param {boolean} highlight - A flag indicating whether to highlight (true) or un highlight (false) the point.
     * @returns {void}
     */
    CircularChartTooltip3D.prototype.highlightPoint = function (series, pointIndex, highlight) {
        var _this = this;
        if ((this.control.circularChartHighlight3DModule && this.control.highlightMode === 'None') || !this.control.circularChartHighlight3DModule) {
            var elements = document.querySelectorAll("[id*=\"region-series-0-point-" + pointIndex + "\"]");
            var pointElements_1 = [];
            elements.forEach(function (pointElement) {
                var elementIndex = parseInt(pointElement.id.split('point-')[1], 10);
                if (elementIndex === pointIndex) {
                    pointElements_1.push(pointElement);
                }
            });
            var datalabelElement = document.getElementById(this.control.element.id + '-svg-data-label-text-' + pointIndex);
            var connectorElement = document.getElementById(this.control.element.id + '-datalabel-series-0-connector-' + pointIndex);
            var shapeElement = document.getElementById(this.control.element.id + '-svg-data-label-series-0-shape-' + pointIndex);
            if (datalabelElement) {
                pointElements_1.push(datalabelElement);
            }
            if (connectorElement) {
                pointElements_1.push(connectorElement);
            }
            if (shapeElement) {
                pointElements_1.push(shapeElement);
            }
            var seriesElements = document.getElementById(this.element.id + '-svg-chart-3d').children;
            if (seriesElements) {
                for (var _i = 0, seriesElements_1 = seriesElements; _i < seriesElements_1.length; _i++) {
                    var seriesElement = seriesElements_1[_i];
                    if (seriesElement.parentElement.id === this.control.groupElement.id) {
                        var selection = seriesElement.hasAttribute('class') ? seriesElement.getAttribute('class').indexOf('_selection_') === -1 : true;
                        seriesElement.setAttribute('opacity', (highlight && this.control.highlightColor !== 'transparent' && selection ? 0.2 : series.opacity).toString());
                    }
                }
            }
            if (pointElements_1) {
                pointElements_1.forEach(function (element) {
                    if (element.parentElement.id === _this.control.groupElement.id) {
                        element.setAttribute('opacity', (series.opacity).toString());
                    }
                });
            }
        }
    };
    /**
     * Fades out the tooltip associated with the provided CircularChart3DPointData.
     *
     * @returns {void}
     */
    CircularChartTooltip3D.prototype.fadeOut = function () {
        var svgElement = this.getElement(this.element.id + '_tooltip_svg');
        var isTooltip = (svgElement && parseInt(svgElement.getAttribute('opacity'), 10) > 0);
        if (!isTooltip) {
            this.currentPoints = [];
            this.removeHighlight();
            this.previousPoints = [];
            this.svgTooltip = null;
            this.control.trigger('animationComplete', {});
        }
    };
    /**
     * Updates the previous point with additional CircularChart3DPointData.
     *
     * @param {CircularChart3DPointData} extraPoints - An array of additional CircularChart3DPointData to update the previous point.
     * @returns {void}
     */
    CircularChartTooltip3D.prototype.updatePreviousPoint = function (extraPoints) {
        if (extraPoints) {
            this.currentPoints = this.currentPoints.concat(extraPoints);
        }
        this.previousPoints = extend([], this.currentPoints, null, true);
    };
    /**
     * Finds and returns an array of colors from the current points.
     *
     * @returns {string[]} - An array of color strings.
     */
    CircularChartTooltip3D.prototype.findPalette = function () {
        var colors = [];
        for (var _i = 0, _a = this.currentPoints; _i < _a.length; _i++) {
            var data = _a[_i];
            colors.push(data.point.color);
        }
        return colors;
    };
    /**
     * Gets the module name for the circular 3D tooltip.
     *
     * @returns {string} - The module name.
     */
    CircularChartTooltip3D.prototype.getModuleName = function () {
        return 'CircularChartTooltip3D';
    };
    /**
     * Destroys the circular 3D tooltip module.
     *
     * @returns {void}
     * @private
     */
    CircularChartTooltip3D.prototype.destroy = function () {
        /**
         * Destroy method calling here.
         */
    };
    return CircularChartTooltip3D;
}(ChildProperty));
export { CircularChartTooltip3D };
