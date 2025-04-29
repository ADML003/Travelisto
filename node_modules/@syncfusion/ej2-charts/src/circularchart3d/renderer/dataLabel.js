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
 * Circular 3D chart data label.
 */
import { isNullOrUndefined, ChildProperty, Property, Complex, extend, getValue, createElement } from '@syncfusion/ej2-base';
import { Border } from '../../common/model/base';
import { measureText, Rect } from '@syncfusion/ej2-svg-base';
import { textRender } from '../../common/model/constants';
import { appendChildElement, colorNameToHex, convertHexToColor, getFontStyle, getTemplateFunction, measureElementRect, isOverlap, textTrim } from '../../common/utils/helper';
/**
 * Configures the fonts in the circular 3D data label.
 */
var CircularChart3DDataLabelFont = /** @class */ (function (_super) {
    __extends(CircularChart3DDataLabelFont, _super);
    function CircularChart3DDataLabelFont() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('Normal')
    ], CircularChart3DDataLabelFont.prototype, "fontStyle", void 0);
    __decorate([
        Property('16px')
    ], CircularChart3DDataLabelFont.prototype, "size", void 0);
    __decorate([
        Property('Normal')
    ], CircularChart3DDataLabelFont.prototype, "fontWeight", void 0);
    __decorate([
        Property('')
    ], CircularChart3DDataLabelFont.prototype, "color", void 0);
    __decorate([
        Property('Segoe UI')
    ], CircularChart3DDataLabelFont.prototype, "fontFamily", void 0);
    __decorate([
        Property(1)
    ], CircularChart3DDataLabelFont.prototype, "opacity", void 0);
    return CircularChart3DDataLabelFont;
}(ChildProperty));
export { CircularChart3DDataLabelFont };
/**
 * Defines the appearance of the connector line for the circular 3D chart.
 */
var CircularChart3DConnector = /** @class */ (function (_super) {
    __extends(CircularChart3DConnector, _super);
    function CircularChart3DConnector() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(null)
    ], CircularChart3DConnector.prototype, "color", void 0);
    __decorate([
        Property(1)
    ], CircularChart3DConnector.prototype, "width", void 0);
    __decorate([
        Property(null)
    ], CircularChart3DConnector.prototype, "length", void 0);
    __decorate([
        Property('')
    ], CircularChart3DConnector.prototype, "dashArray", void 0);
    return CircularChart3DConnector;
}(ChildProperty));
export { CircularChart3DConnector };
/**
 * Configures the data label settings for circular 3D chart.
 */
var CircularChart3DDataLabelSettings = /** @class */ (function (_super) {
    __extends(CircularChart3DDataLabelSettings, _super);
    function CircularChart3DDataLabelSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(false)
    ], CircularChart3DDataLabelSettings.prototype, "visible", void 0);
    __decorate([
        Property(null)
    ], CircularChart3DDataLabelSettings.prototype, "name", void 0);
    __decorate([
        Property('transparent')
    ], CircularChart3DDataLabelSettings.prototype, "fill", void 0);
    __decorate([
        Property('Inside')
    ], CircularChart3DDataLabelSettings.prototype, "position", void 0);
    __decorate([
        Property(0)
    ], CircularChart3DDataLabelSettings.prototype, "angle", void 0);
    __decorate([
        Property(false)
    ], CircularChart3DDataLabelSettings.prototype, "enableRotation", void 0);
    __decorate([
        Complex({ width: null, color: null }, Border)
    ], CircularChart3DDataLabelSettings.prototype, "border", void 0);
    __decorate([
        Complex({ fontFamily: null, size: '12px', fontStyle: 'Normal', fontWeight: '400', color: null }, CircularChart3DDataLabelFont)
    ], CircularChart3DDataLabelSettings.prototype, "font", void 0);
    __decorate([
        Complex({}, CircularChart3DConnector)
    ], CircularChart3DDataLabelSettings.prototype, "connectorStyle", void 0);
    __decorate([
        Property(null)
    ], CircularChart3DDataLabelSettings.prototype, "template", void 0);
    __decorate([
        Property('')
    ], CircularChart3DDataLabelSettings.prototype, "format", void 0);
    return CircularChart3DDataLabelSettings;
}(ChildProperty));
export { CircularChart3DDataLabelSettings };
/**
 * The 'CircularChartDataLabel3D' module used to render dataLabel in circular 3D charts.
 */
var CircularChartDataLabel3D = /** @class */ (function (_super) {
    __extends(CircularChartDataLabel3D, _super);
    function CircularChartDataLabel3D() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Renders data labels for a circular 3D series on the given chart.
     *
     * @param {CircularChart3DSeries} series - The circular 3D series for which data labels are to be rendered.
     * @param {CircularChart3D} chart - The circular 3D chart instance.
     * @returns {void}
     * @private
     */
    CircularChartDataLabel3D.prototype.renderDataLabel = function (series, chart) {
        var templateId = chart.element.id + '-series-' + series.index + '-data-label-collections';
        series.labelBound = isNullOrUndefined(series.labelBound) ? new Rect(Infinity, Infinity, -Infinity, -Infinity) : series.labelBound;
        series.dataLabelElement = createElement('div', { id: templateId });
        for (var i = 0; i < series.points.length; i++) {
            var point = series.points[i];
            var pointText = this.getDatalabelText(series.dataLabel.format, chart, point.text ? point.text : isNullOrUndefined(point.y) ? '' : point.y.toString());
            var border = { width: series.dataLabel.border.width, color: series.dataLabel.border.color,
                dashArray: series.dataLabel.border.dashArray };
            var argsFont = (extend({}, getValue('properties', series.dataLabel.font), null, true));
            var argsData = {
                cancel: false, name: textRender, series: series, point: point,
                text: pointText, border: border, color: series.dataLabel.fill, template: series.dataLabel.template, font: argsFont
            };
            chart.trigger(textRender, argsData);
            point.argsData = argsData;
            if (point.visible && !argsData.cancel && !isNullOrUndefined(point.y)) {
                this.draw3DDataLabel(series, point.index, point, chart);
            }
        }
        if (series.dataLabel.template) {
            appendChildElement(false, document.getElementById(chart.element.id + '_Secondary_Element'), series.dataLabelElement, chart.redraw, false, 'x', 'y', null, '', false, false, null);
        }
    };
    /**
     * Creates a data label template for a specific data point in a 3D series.
     *
     * @param {HTMLElement} parentElement - The parent HTML element to which the data label template is attached.
     * @param {CircularChart3DSeries} series - The 3D series to which the data point belongs.
     * @param {CircularChart3DDataLabelSettingsModel} dataLabel - The style settings for data labels.
     * @param {CircularChart3DPoints} point - The data point for which the data label template is created.
     * @param {CircularChart3DTextRenderEventArgs} data - The text render event arguments.
     * @param {number} labelIndex - The index of the data label.
     * @param {boolean} redraw - Indicates whether the template should be redrawn.
     * @param {CircularChart3DLocation} location - The location values for the data label.
     * @param {CircularChart3D} chart - The circular 3D chart instance.
     * @returns {void}
     * @private
     */
    CircularChartDataLabel3D.prototype.createDataLabelTemplate = function (parentElement, series, dataLabel, point, data, labelIndex, redraw, location, chart) {
        var childElement = this.createTemplate(createElement('div', {
            id: chart.element.id + '-series-' + series.index + '-data-label-' + labelIndex,
            styles: 'position: absolute;background-color:' + data.color + ';' +
                getFontStyle(dataLabel.font, chart.themeStyle.datalabelFont) + ';border:' + data.border.width + 'px solid ' + data.border.color + ';'
        }), data.template, chart, point, series, chart.element.id + '-data-label-');
        this.calculateTemplateLabelSize(parentElement, childElement, point, series, dataLabel, redraw, location);
    };
    /**
     * Calculates the size of a data label template for a specific data point in a 3D series.
     *
     * @param {HTMLElement} parentElement - The parent HTML element containing the data label template.
     * @param {HTMLElement} childElement - The child HTML element representing the data label template.
     * @param {CircularChart3DPoints} point - The data point for which the data label template size is calculated.
     * @param {CircularChart3DSeries} series - The circular 3D series to which the data point belongs.
     * @param {CircularChart3DDataLabelSettingsModel} dataLabel - The style for data labels.
     * @param {boolean} redraw - Indicates whether the template should be redrawn.
     * @param {CircularChart3DLocation} location - The location values for the data label.
     * @param {boolean} isReactCallback - Indicates whether the callback is associated with React.
     * @returns {void}
     */
    CircularChartDataLabel3D.prototype.calculateTemplateLabelSize = function (parentElement, childElement, point, series, dataLabel, redraw, location, isReactCallback) {
        var elementRect = measureElementRect(childElement, redraw, isReactCallback);
        childElement.style.left = (location.x - (elementRect.width / 2)) + 'px';
        childElement.style.top = (location.y - elementRect.height) + 'px';
        appendChildElement(false, parentElement, childElement, redraw, true, 'left', 'top');
    };
    /**
     * Creates a template element for rendering data labels associated with a specific data point in a 3D series.
     *
     * @param {HTMLElement} childElement - The child HTML element to contain the template content.
     * @param {string | Function} content - The content or function for the data label template.
     * @param {CircularChart3D} chart - The circular 3D chart instance.
     * @param {CircularChart3DPoints} point - The data point for which the template is created (optional).
     * @param {CircularChart3DSeries} series - The 3D series to which the data point belongs (optional).
     * @param {string} dataLabelId - The ID for the data label element (optional).
     * @returns {HTMLElement} - The created template element.
     */
    CircularChartDataLabel3D.prototype.createTemplate = function (childElement, content, chart, point, series, dataLabelId) {
        var templateFn = getTemplateFunction(content);
        var templateElement;
        try {
            var tempObject = { chart: chart, series: series, point: point };
            var templateId = dataLabelId + '-template';
            var elementData = templateFn ? templateFn(tempObject, chart, templateId, dataLabelId) : [];
            if (elementData.length) {
                templateElement = Array.prototype.slice.call(elementData);
                var len = templateElement.length;
                for (var i = 0; i < len; i++) {
                    childElement.appendChild(templateElement[i]);
                }
            }
            var reactCallback = void 0;
            if (chart.isReact) {
                chart.renderReactTemplates(reactCallback);
            }
        }
        catch (e) {
            return childElement;
        }
        return childElement;
    };
    /**
     * Draws a 3D data label for a circular 3D series.
     * This method is responsible for drawing a 3D data label for a circular 3D series.
     *
     * @param {CircularChart3DSeries} series - The CircularChart3DSeries to which the data label belongs.
     * @param {number} pointIndex - The index of the data label point in the series.
     * @param  {CircularChart3DPoints} point - The CircularChart3DPoints representing the 3D point of the data label.
     * @param {CircularChart3D} chart - The circular 3D chart instance.
     * @returns {void}
     */
    CircularChartDataLabel3D.prototype.draw3DDataLabel = function (series, pointIndex, point, chart) {
        var connectorHeight = series.dataLabel.connectorStyle.length ?
            parseFloat(series.dataLabel.connectorStyle.length) : series.dataLabel.connectorStyle.length;
        var radius;
        var pointX;
        var pointY;
        var degree;
        var commonEventArgs = { data: null };
        var location = { x: 0, y: 0 };
        var seriesIndex = series.index;
        var center = point.symbolLocation.center;
        var dradius = point.symbolLocation.radius * series.coefficient;
        if (isNullOrUndefined(connectorHeight)) {
            connectorHeight = measureText(point.argsData.text, series.dataLabel.font, chart.themeStyle.datalabelFont).height;
        }
        if (series != null && series.dataLabel.position !== 'Inside') {
            radius = point.symbolLocation.radius + connectorHeight;
        }
        else if (series != null) {
            radius = dradius + (point.symbolLocation.radius - dradius) / 2;
        }
        pointX = location.x = center.x + (parseFloat(point.argsData.font.size) / 3) + radius * Math.cos(point.symbolLocation.angle);
        pointY = location.y = center.y + (parseFloat(point.argsData.font.size) / 3) + radius * Math.sin(point.symbolLocation.angle);
        commonEventArgs.data = {
            text: point.argsData.text, location: { x: pointX, y: pointY },
            series: series, pointIndex: pointIndex, seriesIndex: seriesIndex
        };
        commonEventArgs.data.Text = commonEventArgs.data.text;
        var size = measureText(point.argsData.text, series.dataLabel.font, chart.themeStyle.datalabelFont);
        pointX = location.x = commonEventArgs.data.location.x;
        pointY = location.y = commonEventArgs.data.location.y;
        var tag = (!series.dataLabel.template) ? 'text' : 'template';
        var saturationColor = this.getSaturatedColor(point, point.argsData.color, chart);
        var element = { width: size.width, height: size.height, fill: saturationColor, label: commonEventArgs.data, textAnchor: 'middle', tag: tag, font: point.argsData.font, angle: 0, id: chart.element.id + '-svg-data-label-text-' + pointIndex, child: chart.groupElement };
        if (chart.circularChartLegend3DModule && chart.legendSettings.visible && point.visible && series.dataLabel.position === 'Outside') {
            var rect = chart.circularChartLegend3DModule.legendBounds;
            var legendpadding = chart.legendSettings.border.width / 2;
            rect = new Rect(rect.x - legendpadding, rect.y - legendpadding, rect.width +
                (2 * legendpadding), rect.height + (2 * legendpadding));
            var labelRegion = new Rect(element.label.location.x + (size.width / 2) + 20, element.label.location.y + 2.5, element.width, element.height);
            if (isOverlap(labelRegion, rect)) {
                if (chart.circularChartLegend3DModule.position === 'Right') {
                    element.width = rect.x - labelRegion.x;
                }
                else if (chart.circularChartLegend3DModule.position === 'Left') {
                    element.width = labelRegion.x - (rect.x + rect.width);
                    if (element.width < 0) {
                        element.width += labelRegion.width;
                        element.label.location.x = rect.x + rect.width - (size.width / 2) + 20;
                    }
                }
                if (labelRegion && element.width < labelRegion.width) {
                    element.label.text = textTrim(element.width, element.label.text, series.dataLabel.font, chart.enableRtl, chart.themeStyle.datalabelFont);
                }
                if (element.label.text.length === 3 && element.label.text.indexOf('...') > -1) {
                    return;
                }
            }
        }
        var connectorPoints;
        if (series.dataLabel.position !== 'Inside') {
            connectorPoints = this.updateConnectorLine(point, pointIndex, series, connectorHeight, chart);
        }
        if (series.dataLabel.template && series.dataLabel.position !== 'Inside') {
            var childElement = this.createTemplate(createElement('div', {
                id: chart.element.id + '-series-data-label-' + 0,
                styles: 'position: absolute;background-color:' + point.argsData.color + ';' +
                    getFontStyle(point.argsData.font, chart.themeStyle.datalabelFont) + ';border:' + point.argsData.border.width + 'px solid ' + point.argsData.border.color + ';'
            }), point.argsData.template, chart, point, series, chart.element.id + '-data-label-');
            size = measureText(childElement.textContent, series.dataLabel.font, chart.themeStyle.datalabelFont);
        }
        if (chart.circularChartLegend3DModule && chart.legendSettings.visible && (series.dataLabel.position === 'Outside')) {
            chart.visibleSeries[0].findMaxBounds(chart.visibleSeries[0].labelBound, { x: pointX, y: pointY, width: size.width, height: size.height });
        }
        var padding = 0;
        var heightPadding = 0;
        var textAngle = point.symbolLocation.angle;
        if (series.dataLabel.position !== 'Inside') {
            if ((textAngle > 1.5 && textAngle < 1.8) || (textAngle > 1.3 && textAngle < 1.5) ||
                (textAngle > 4.5 && textAngle < 4.8) || (textAngle > 4.3 && textAngle < 4.5)) {
                location.x = connectorPoints.x;
                location.y = connectorPoints.y;
                textAngle = connectorPoints.angle;
            }
            if (textAngle < (Math.PI / 2) || textAngle >= (Math.PI / 2) + Math.PI) {
                padding = (size.width / 2) + 20;
                heightPadding = 5 / 2;
            }
            else {
                padding = -((size.width / 2) + (point.argsData.color !== 'transparent' || point.argsData.border.color ? 25 : 20));
                heightPadding = 5 / 2;
            }
        }
        if (!point.argsData.template && commonEventArgs.data.text !== '') {
            var element_1 = { tag: 'dataLabel', series: series, point: point, pointIndex: pointIndex, id: chart.element.id + '-svg-' + seriesIndex + '-data-label-' + pointIndex, child: chart.groupElement };
            var angle = void 0;
            var transform = '';
            if (series.dataLabel.enableRotation) {
                angle = degree = series.dataLabel.angle;
                if (angle === 0) {
                    var toDegrees = function (angle) { return angle * (180 / Math.PI); };
                    var midAngle = toDegrees(point.symbolLocation.angle);
                    if (series.dataLabel.position === 'Outside') {
                        degree = 0;
                    }
                    else if (midAngle >= 90 && midAngle <= 260) {
                        degree = midAngle + 180;
                        location.x = location.x - (parseFloat(point.argsData.font.size) / 2);
                    }
                    else {
                        degree = midAngle;
                    }
                }
                else {
                    degree = (angle > 360) ? angle - 360 : (angle < -360) ? angle + 360 : angle;
                }
                transform = 'rotate(' + degree + ',' + (location.x) + ',' + (location.y) + ')';
            }
            element_1.transform = transform;
            var borderElement = chart.polygon.createTextElement(chart.vector.vector3D(pointX + padding, pointY + heightPadding, (point.symbolLocation.z) ?
                point.symbolLocation.z : 0), element_1, 0, -size.height);
            chart.circular3DPolygon.push(borderElement);
        }
        element.angle = series.dataLabel.enableRotation ? series.dataLabel.angle !== 0 ? series.dataLabel.angle : degree : 0;
        var polygon = chart.polygon.createTextElement(chart.vector.vector3D(location.x + padding, location.y + heightPadding, -1), element, 0, -size.height);
        chart.circular3DPolygon.push(polygon);
    };
    /**
     * To find saturated color for datalabel.
     *
     * @param {CircularChart3DPoints} point - The point to get the color saturation.
     * @param {string} color - The color to be saturated.
     * @param {CircularChart3D} chart - The circular 3D chart instance.
     * @returns {string} - The saturated color computed for the data label.
     */
    CircularChartDataLabel3D.prototype.getSaturatedColor = function (point, color, chart) {
        var saturatedColor;
        saturatedColor = color === 'transparent' ? this.getLabelBackground(point, chart) : color;
        saturatedColor = (saturatedColor === 'transparent') ? ((chart.theme.indexOf('Dark') > -1 || chart.theme.indexOf('HighContrast') > -1) ? 'black' : 'white') : saturatedColor;
        var rgbValue = convertHexToColor(colorNameToHex(saturatedColor));
        var contrast = Math.round((rgbValue.r * 299 + rgbValue.g * 587 + rgbValue.b * 114) / 1000);
        return chart.theme === 'Bootstrap5' ? '#212529' : chart.theme === 'Bootstrap5Dark' ? '#DEE2E6' : contrast >= 128 ? chart.theme.indexOf('Tailwind3') > -1 ? '#4B5563' : 'black' : chart.theme.indexOf('Tailwind3') > -1 ? '#D1D5DB' : 'white';
    };
    /**
     * To find background color for the datalabel.
     *
     * @param {CircularChart3DPoints} point - The point to get the color saturation.
     * @param {CircularChart3D} chart - The circular 3D chart instance.
     * @returns {string} - The background color computed for the data label.
     */
    CircularChartDataLabel3D.prototype.getLabelBackground = function (point, chart) {
        return point.argsData.series.dataLabel.position === 'Outside' ?
            chart.background || chart.themeStyle.background : !point.y ? chart.theme.indexOf('dark') ? 'white' : 'black' : point.color;
    };
    /**
     * Gets the data label text based on a specified format, chart configuration, and input label text.
     *
     * @param {string} labelFormat - The format string for the data label.
     * @param {CircularChart3D} chart - The Circular 3D chart instance.
     * @param {string} labelText - The original label text to be formatted.
     * @returns {string} - The formatted data label text.
     */
    CircularChartDataLabel3D.prototype.getDatalabelText = function (labelFormat, chart, labelText) {
        if (Number(labelText)) {
            var customLabelFormat = labelFormat.match('{value}') !== null;
            var format = chart.intl.getNumberFormat({
                format: customLabelFormat ? '' : labelFormat,
                useGrouping: chart.useGroupingSeparator
            });
            labelText = customLabelFormat ? labelFormat.replace('{value}', format(parseFloat(labelText))) : format(parseFloat(labelText));
        }
        return labelText;
    };
    /**
     * Updates the connector line for a 3D point in a circular 3D series.
     *
     * @param {CircularChart3DPoints} point - The CircularChart3DPoints representing the 3D point.
     * @param {number} pointIndex - The index of the point in the series.
     * @param {CircularChart3DSeries} series - The instance of the circular 3D series.
     * @param {number} connectorHeight - The height of the connector line.
     * @param {CircularChart3D} chart - The circular 3D chart instance.
     * @returns {void}
     */
    CircularChartDataLabel3D.prototype.updateConnectorLine = function (point, pointIndex, series, connectorHeight, chart) {
        var drawPoints = [];
        var symbolLocation = point.symbolLocation;
        var x = symbolLocation.center.x + Math.cos(symbolLocation.angle) * symbolLocation.radius;
        var y = symbolLocation.center.y + Math.sin(symbolLocation.angle) * symbolLocation.radius;
        drawPoints.push({ x: x, y: y });
        var labelRadiusFromOrigin = symbolLocation.radius + connectorHeight;
        var angle = symbolLocation.angle;
        x = symbolLocation.center.x + Math.cos(angle) * labelRadiusFromOrigin;
        y = symbolLocation.center.y + Math.sin(angle) * labelRadiusFromOrigin;
        drawPoints.push({ x: x, y: y });
        var padding;
        if (angle < (Math.PI / 2) || angle >= (Math.PI / 2) + Math.PI) {
            padding = 10;
        }
        else {
            padding = -10;
        }
        drawPoints.push({ x: x + padding, y: y });
        this.drawLineSegment(drawPoints, pointIndex, series, chart);
        return ({ x: x, y: y, angle: angle });
    };
    /**
     * Draws a line segment based on the provided points in 3D space for the circular 3D series.
     *
     * @param {CircularChart3DLocation[]} drawpoints - An array of CircularChart3DLocation representing the points in 3D space.
     * @param {number} pointIndex - The index of the point in the series.
     * @param {CircularChart3DSeries} series - The instance of the circular 3D series to which the point belongs.
     * @param {CircularChart3D} chart - The circular 3D chart instance.
     * @returns {void}
     */
    CircularChartDataLabel3D.prototype.drawLineSegment = function (drawpoints, pointIndex, series, chart) {
        var vectorPoints = [];
        for (var i = 0; i < drawpoints.length; i++) {
            vectorPoints.push(chart.vector.vector3D(drawpoints[i].x, drawpoints[i].y, 0));
        }
        var seriesIndex = series.index;
        var color = series.points[pointIndex].color;
        var stroke = series.dataLabel.connectorStyle.color ? series.dataLabel.connectorStyle.color : color;
        var line = {
            width: series.dataLabel.connectorStyle.width,
            stroke: stroke,
            child: chart.groupElement,
            tag: 'polyline',
            dashArray: series.dataLabel.connectorStyle.dashArray,
            id: chart.element.id + '-datalabel-series-' + seriesIndex + '-connector-' + pointIndex
        };
        var ploygon = chart.polygon.createPolyline(vectorPoints, line);
        chart.circular3DPolygon.push(ploygon);
    };
    /**
     * Gets the module name for the circular 3D data label.
     *
     * @returns {string} - The module name, which is 'CircularChartDataLabel3D'.
     */
    CircularChartDataLabel3D.prototype.getModuleName = function () {
        return 'CircularChartDataLabel3D';
    };
    /**
     * Destroys the circular 3D chart data label.
     *
     * @returns {void}
     * @private
     */
    CircularChartDataLabel3D.prototype.destroy = function () {
        /**
         * Destroy method performed here.
         */
    };
    return CircularChartDataLabel3D;
}(ChildProperty));
export { CircularChartDataLabel3D };
