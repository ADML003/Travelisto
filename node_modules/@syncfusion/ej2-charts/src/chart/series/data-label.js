import { ChartLocation, RectOption, isCollide, rotateTextSize } from '../../common/utils/helper';
import { markerAnimate, appendChildElement, getVisiblePoints } from '../../common/utils/helper';
import { getLabelText, convertHexToColor, calculateRect, textElement, colorNameToHex, animateTextElement } from '../../common/utils/helper';
import { measureText, TextOption, Rect } from '@syncfusion/ej2-svg-base';
import { textRender } from '../../common/model/constants';
import { createTemplate, getFontStyle, getElement, measureElementRect, templateAnimate, withIn, withInBounds } from '../../common/utils/helper';
import { createElement, getValue, extend } from '@syncfusion/ej2-base';
import { getPoint, isRotatedRectIntersect } from '../../common/utils/helper';
/**
 * The `DataLabel` module is used to render data labels for data points.
 */
var DataLabel = /** @class */ (function () {
    /**
     * Constructor for the data label module.
     *
     * @private
     */
    function DataLabel(chart) {
        this.errorHeight = 0;
        /** @private */
        this.dataLabelRectCollection = {};
        this.chart = chart;
    }
    DataLabel.prototype.initPrivateVariables = function (series, marker) {
        var transform = '';
        var clipPath = '';
        var render = series.chart.renderer;
        var index = (series.index === undefined) ? series.category : series.index;
        if (series.chart.chartAreaType === 'Cartesian') {
            transform = 'translate(' + series.clipRect.x + ',' + (series.clipRect.y) + ')';
            clipPath = 'url(#' + this.chart.element.id + '_ChartSeriesClipRect_' + index + ')';
        }
        if (marker.dataLabel.visible && !this.chart.enableCanvas) {
            series.shapeElement = render.createGroup({
                'id': this.chart.element.id + 'ShapeGroup' + index,
                'transform': transform,
                'clip-path': 'url(#' + this.chart.element.id + '_ChartSeriesClipRect_' + index + ')'
            });
            series.textElement = render.createGroup({
                'id': this.chart.element.id + 'TextGroup' + index,
                'transform': transform,
                'clip-path': clipPath
            });
            series.textElement.setAttribute('aria-hidden', 'true');
        }
        this.markerHeight = ((series.type === 'Scatter' || marker.visible)) ? (marker.height / 2) : 0;
        this.commonId = this.chart.element.id + '_Series_' + index + '_Point_';
        this.calculateErrorHeight(series, series.marker.dataLabel.position);
        this.chartBackground = this.chart.chartArea.background === 'transparent' ?
            this.chart.background || this.chart.themeStyle.background : this.chart.chartArea.background;
    };
    DataLabel.prototype.calculateErrorHeight = function (series, position) {
        if (!series.errorBar.visible) {
            return null;
        }
        else if (series.errorBar.visible && this.chart.chartAreaType !== 'PolarRadar') {
            var direction = series.errorBar.direction;
            var positiveHeight = this.chart.errorBarModule.positiveHeight;
            var negativeHeight = this.chart.errorBarModule.negativeHeight;
            if (this.isRectSeries(series)) {
                if (position === 'Top' || position === 'Auto') {
                    if (direction === 'Both' || direction === 'Minus') {
                        this.errorHeight = negativeHeight;
                    }
                    else {
                        this.errorHeight = 0;
                    }
                }
                if (position === 'Outer' || position === 'Auto') {
                    if (direction === 'Both' || direction === 'Plus') {
                        this.errorHeight = positiveHeight;
                    }
                    else {
                        this.errorHeight = 0;
                    }
                }
            }
            else {
                if (position === 'Top' || position === 'Outer' || position === 'Auto') {
                    if ((direction === 'Both' || direction === 'Plus') && (!series.chart.isTransposed)) {
                        this.errorHeight = positiveHeight;
                    }
                    else {
                        this.errorHeight = 0;
                    }
                }
                if (position === 'Bottom' || position === 'Auto') {
                    if (direction === 'Both' || direction === 'Minus') {
                        this.errorHeight = negativeHeight;
                    }
                    else {
                        this.errorHeight = 0;
                    }
                }
            }
        }
        else {
            this.errorHeight = 0;
        }
    };
    DataLabel.prototype.isRectSeries = function (series) {
        return series.isRectSeries || series.type === 'RangeArea' || series.type === 'SplineRangeArea' || series.type === 'RangeStepArea';
    };
    /**
     * Render the data label for series.
     *
     * @param {Series} series - The series to render.
     * @param {Chart} chart - The parent chart.
     * @param {DataLabelSettingsModel} dataLabel - The settings for data labels.
     * @returns {void}
     * @private
     */
    DataLabel.prototype.render = function (series, chart, dataLabel) {
        // initialize the private variable
        this.initPrivateVariables(series, series.marker);
        this.inverted = chart.requireInvertedAxis;
        this.yAxisInversed = series.yAxis.isAxisInverse;
        var templateId = chart.element.id + '_Series_' +
            (series.index === undefined ? series.category : series.index) + '_DataLabelCollections';
        var element = createElement('div', {
            id: templateId
        });
        var visiblePoints = getVisiblePoints(series);
        // Data label point iteration started
        if (series.visible) {
            for (var i = 0; i < visiblePoints.length; i++) {
                this.renderDataLabel(series, visiblePoints[i], element, dataLabel);
            }
        }
        if (element.childElementCount) {
            if (!chart.enableCanvas) {
                appendChildElement(chart.enableCanvas, getElement(chart.element.id + '_Secondary_Element'), element, chart.redraw, false, 'x', 'y', null, '', false, false, null, chart.duration);
            }
            else {
                getElement(chart.element.id + '_Secondary_Element').appendChild(element);
            }
        }
    };
    DataLabel.prototype.renderDataLabel = function (series, point, element, dataLabel) {
        if (!dataLabel.showZero && ((point.y === 0) || (point.y === 0 && series.emptyPointSettings.mode === 'Zero'))) {
            return null;
        }
        this.margin = dataLabel.margin;
        var labelText = [];
        var labelLength;
        var xPos;
        var yPos;
        var xValue;
        var yValue;
        var degree;
        var rectCenterX;
        var rectCenterY;
        var labelLocation = { x: 0, y: 0 };
        var textSize;
        var clip = series.clipRect;
        var shapeRect;
        var isDataLabelOverlap = false;
        var dataLabelElement = [];
        var startLocation;
        dataLabel.angle = dataLabel.labelIntersectAction === 'Rotate90' ? 90 : dataLabel.angle;
        dataLabel.enableRotation = dataLabel.labelIntersectAction === 'Rotate90' ? true : dataLabel.enableRotation;
        var angle = degree = dataLabel.angle;
        var border = { width: dataLabel.border.width, color: dataLabel.border.color };
        var argsFont = (extend({}, getValue('properties', dataLabel.font), null, true));
        if ((point.symbolLocations.length && point.symbolLocations[0]) ||
            (series.type === 'BoxAndWhisker' && point.regions.length)) {
            labelText = point.text !== null ? getLabelText(point, series, this.chart) : [];
            labelLength = labelText.length;
            for (var i = 0; i < labelLength; i++) {
                var argsData = {
                    cancel: false, name: textRender, series: series,
                    point: point, text: labelText[i], border: border,
                    color: dataLabel.fill, template: dataLabel.template, font: argsFont, location: labelLocation,
                    textSize: measureText(labelText[i], dataLabel.font, this.chart.themeStyle.datalabelFont)
                };
                this.chart.trigger(textRender, argsData);
                if (!argsData.cancel) {
                    this.fontBackground = argsData.color;
                    this.isDataLabelShape(argsData);
                    this.markerHeight = series.type === 'Bubble' ? (point.regions[0].height / 2) : this.markerHeight;
                    if (argsData.template !== null) {
                        this.createDataLabelTemplate(element, series, dataLabel, point, argsData, i, this.chart.redraw);
                    }
                    else {
                        if (dataLabel.enableRotation) {
                            textSize = rotateTextSize(dataLabel.font, argsData.text, dataLabel.angle, this.chart, this.chart.themeStyle.datalabelFont);
                        }
                        else {
                            textSize = measureText(argsData.text, dataLabel.font, this.chart.themeStyle.datalabelFont);
                        }
                        var rect = this.calculateTextPosition(point, series, textSize, dataLabel, i);
                        var actualRect = new Rect(rect.x + clip.x, rect.y + clip.y, rect.width, rect.height);
                        //let notOverlapping: boolean;
                        if (dataLabel.enableRotation) {
                            var rectCoordinates = this.getRectanglePoints(actualRect);
                            rectCenterX = rect.x + (rect.width / 2);
                            rectCenterY = (rect.y + (rect.height / 2));
                            isDataLabelOverlap = (dataLabel.labelIntersectAction === 'Rotate90' || angle === -90) ? false : this.isDataLabelOverlapWithChartBound(rectCoordinates, this.chart, { x: 0, y: 0, width: 0, height: 0 });
                            if (!isDataLabelOverlap) {
                                this.chart.rotatedDataLabelCollections.push(rectCoordinates);
                                var currentPointIndex = this.chart.rotatedDataLabelCollections.length - 1;
                                for (var index = currentPointIndex; index >= 0; index--) {
                                    if (this.chart.rotatedDataLabelCollections[currentPointIndex] &&
                                        this.chart.rotatedDataLabelCollections[index - 1] &&
                                        isRotatedRectIntersect(this.chart.rotatedDataLabelCollections[currentPointIndex], this.chart.rotatedDataLabelCollections[index - 1])) {
                                        isDataLabelOverlap = true;
                                        this.chart.rotatedDataLabelCollections[currentPointIndex] = null;
                                        break;
                                    }
                                }
                            }
                        }
                        else {
                            isDataLabelOverlap = isCollide(rect, this.chart.dataLabelCollections, clip);
                        }
                        if ((!isDataLabelOverlap || dataLabel.labelIntersectAction === 'None')) {
                            var dataLabelShapeElement = getElement(this.commonId + point.index + '_TextShape_' + i);
                            if (dataLabelShapeElement) {
                                startLocation = { x: +dataLabelShapeElement.getAttribute('x'), y: +dataLabelShapeElement.getAttribute('y') };
                            }
                            this.chart.dataLabelCollections.push(actualRect);
                            if (this.isShape) {
                                shapeRect = this.chart.renderer.drawRectangle(new RectOption(this.commonId + point.index + '_TextShape_' + i, argsData.color, argsData.border, dataLabel.opacity, rect, dataLabel.rx, dataLabel.ry, '', dataLabel.border.dashArray), new Int32Array([clip.x, clip.y]));
                                if (series.shapeElement) {
                                    appendChildElement(this.chart.enableCanvas, series.shapeElement, shapeRect, this.chart.redraw, true, 'x', 'y', startLocation);
                                }
                            }
                            // Checking the font color
                            var backgroundColor = this.fontBackground === 'transparent' ? ((this.chart.theme.indexOf('Dark') > -1 || this.chart.theme.indexOf('HighContrast') > -1) ? 'black' : 'white') : this.fontBackground;
                            var rgbValue = convertHexToColor(colorNameToHex(backgroundColor));
                            var contrast = Math.round((rgbValue.r * 299 + rgbValue.g * 587 + rgbValue.b * 114) / 1000);
                            xPos = (rect.x + this.margin.left + textSize.width / 2) + labelLocation.x;
                            yPos = dataLabel.enableRotation && this.chart.chartAreaType !== 'PolarRadar' ? (rect.y + this.margin.top + textSize.height / 2 + textSize.width / 4 + (dataLabel.position === 'Auto' ? point.regions[0].width / 10 : 0)) + labelLocation.y : (rect.y + this.margin.top + textSize.height * 3 / 4) + labelLocation.y;
                            labelLocation = { x: 0, y: 0 };
                            if (angle !== 0 && dataLabel.enableRotation) {
                                // xValue = xPos - (dataLabel.margin.left) / 2 + (dataLabel.margin.right / 2);
                                xValue = rectCenterX;
                                //yValue = yPos - (dataLabel.margin.top) / 2 - (textSize.height / dataLabel.margin.top) +
                                // (dataLabel.margin.bottom) / 2;
                                yValue = rectCenterY;
                                degree = (angle > 360) ? angle - 360 : (angle < -360) ? angle + 360 : angle;
                            }
                            else {
                                degree = 0;
                                xValue = rect.x;
                                yValue = rect.y;
                                xPos -= this.chart.chartAreaType === 'Cartesian' && xPos + (textSize.width / 2) > clip.width ? (!this.chart.requireInvertedAxis && xPos > clip.width) ? 0 : (xPos + textSize.width / 2) - clip.width : 0;
                                yPos -= (yPos + textSize.height > clip.y + clip.height && !(series.type.indexOf('Bar') > -1)) ? (yPos + textSize.height) - (clip.y + clip.height) : 0;
                            }
                            var textAnchor = dataLabel.labelIntersectAction === 'Rotate90' ? (dataLabel.position === 'Top' ? 'start' : (dataLabel.position === 'Middle' ? 'middle' : 'end')) :
                                ((angle === -90 && dataLabel.enableRotation) ? (dataLabel.position === 'Top' ? 'end' : (dataLabel.position === 'Middle' ? 'middle' : 'start')) : 'middle');
                            var oldText = void 0;
                            if (this.chart.redraw && document.getElementById(this.commonId + point.index + '_Text_' + i)) {
                                oldText = document.getElementById(this.commonId + point.index + '_Text_' + i).textContent;
                            }
                            dataLabelElement.push(textElement(this.chart.renderer, new TextOption(this.commonId + ((series.removedPointIndex !== null && series.removedPointIndex <= point.index) ? (point.index + 1) : point.index) + '_Text_' + i, xPos, yPos, textAnchor, argsData.text, 'rotate(' + degree + ',' + (xValue) + ',' + (yValue) + ')', 'auto', degree), argsData.font, argsData.font.color || (this.chart.theme === 'Bootstrap5' ? '#212529' : this.chart.theme === 'Bootstrap5Dark' ? '#DEE2E6' : ((contrast >= 128 || series.type === 'Hilo' || series.type === 'HiloOpenClose') ?
                                this.chart.theme.indexOf('Tailwind3') > -1 ? '#111827' : 'black' : this.chart.theme.indexOf('Tailwind3') > -1 ? '#FFFFFF' : 'white')), series.textElement, false, this.chart.redraw, true, false, series.chart.duration, series.clipRect, null, null, this.chart.enableCanvas, null, this.chart.themeStyle.datalabelFont, new ChartLocation(xValue, yValue)));
                            if (this.isShape && dataLabel.enableRotation) {
                                shapeRect.setAttribute('transform', 'rotate(' + dataLabel.angle + ', ' + xValue + ', ' + yValue + ')');
                            }
                            if (this.chart.stackLabels.visible && series.type.indexOf('Stacking') > -1) {
                                this.dataLabelRectCollection = !this.dataLabelRectCollection ? {}
                                    : this.dataLabelRectCollection;
                                this.dataLabelRectCollection[this.commonId + ((series.removedPointIndex !== null && series.removedPointIndex <= point.index) ? (point.index + 1) : point.index) + '_Text_' + i] = actualRect;
                                this.dataLabelRectCollection[this.commonId + point.index + '_TextShape_' + i] = actualRect;
                            }
                            if (series.removedPointIndex !== null && series.removedPointIndex <= point.index) {
                                series.textElement.lastChild.id = this.commonId + point.index + '_Text_' + i;
                            }
                            if (this.chart.redraw && oldText !== argsData.text) {
                                animateTextElement(series.textElement.querySelector('#' + this.commonId + point.index + '_Text_' + i), this.chart.duration, parseFloat(oldText), parseFloat(argsData.text), series.marker.dataLabel.format || series.yAxis.labelFormat);
                            }
                        }
                        else if (getElement(this.commonId + point.index + '_Text_0') && series.chart.redraw && series.currentData) {
                            getElement(this.commonId + point.index + '_Text_0').remove();
                        }
                    }
                }
            }
        }
        return dataLabelElement;
    };
    /**
     * Renders the stack labels for the chart.
     *
     * This method is responsible for displaying cumulative total values on stacked chart segments.
     *
     * @returns {void}
     */
    DataLabel.prototype.renderStackLabels = function () {
        var _this = this;
        var stackLabelGroup = this.chart.renderer.createGroup({ id: this.chart.element.id + "_StackLabelGroup" });
        this.chart.seriesElements.appendChild(stackLabelGroup);
        var positivePoints = {};
        var negativePoints = {};
        if (this.chart.visibleSeries && this.chart.visibleSeries.length > 0) {
            for (var seriesIndex = this.chart.visibleSeries.length - 1; seriesIndex >= 0; seriesIndex--) {
                var series = this.chart.visibleSeries[seriesIndex];
                if (series.animation.enable && this.chart.animateSeries) {
                    stackLabelGroup.setAttribute('visibility', 'hidden');
                }
                if (series.visible && series.points && series.points.length > 0) {
                    for (var pointIndex = 0; pointIndex < series.points.length; pointIndex++) {
                        var point = series.points[pointIndex];
                        var pointXValueAsKey = String(point.x);
                        if (!positivePoints[pointXValueAsKey] && series.stackedValues.endValues[pointIndex] > 0
                            && point.visible) {
                            positivePoints[pointXValueAsKey] = point;
                        }
                        if (!negativePoints[pointXValueAsKey] && series.stackedValues.endValues[pointIndex] < 0
                            && point.visible) {
                            negativePoints[pointXValueAsKey] = point;
                        }
                    }
                }
            }
        }
        var stackLabelIndex = 0;
        [positivePoints, negativePoints].forEach(function (points, index) {
            if (points) {
                var totalValue_1 = 0;
                var currentPoint_1;
                Object.keys(points).forEach(function (pointXValueAsKey) {
                    var positiveValue = points[pointXValueAsKey].series
                        .stackedValues.endValues[points[pointXValueAsKey].index];
                    var negativeValue = negativePoints[pointXValueAsKey] ?
                        negativePoints[pointXValueAsKey].series.stackedValues.
                            endValues[negativePoints[pointXValueAsKey].index] : 0;
                    if (index === 0) {
                        // Handle positive points
                        totalValue_1 = positiveValue + negativeValue;
                        currentPoint_1 = points[pointXValueAsKey];
                    }
                    else if (!positivePoints[pointXValueAsKey]) {
                        // Handle negative points only if no corresponding positive point
                        totalValue_1 = positiveValue;
                        currentPoint_1 = points[pointXValueAsKey];
                    }
                    if (currentPoint_1 && currentPoint_1.symbolLocations[0]) {
                        var series = currentPoint_1.series;
                        var symbolLocation = currentPoint_1.symbolLocations[0];
                        var labelFormat = _this.chart.stackLabels.format;
                        var stackLabeltext = (totalValue_1 % 1 === 0)
                            ? totalValue_1.toFixed(0)
                            : (totalValue_1.toFixed(2).slice(-1) === '0' ? totalValue_1.toFixed(1) : totalValue_1.toFixed(2));
                        if (labelFormat) {
                            var customLabelFormat = labelFormat.match('{value}') !== null;
                            stackLabeltext = customLabelFormat
                                ? labelFormat.replace('{value}', stackLabeltext.toString())
                                : _this.chart.intl.getNumberFormat({
                                    format: labelFormat,
                                    useGrouping: _this.chart.useGroupingSeparator
                                })(totalValue_1);
                        }
                        var textSize = measureText(stackLabeltext, _this.chart.stackLabels.font, _this.chart.themeStyle.datalabelFont);
                        // Define padding to maintain a consistent gap from the symbol location values
                        var padding = 10;
                        var backgroundColor = _this.chart.stackLabels.fill === 'transparent' && _this.chartBackground === 'transparent' ? ((_this.chart.theme.indexOf('Dark') > -1 || _this.chart.theme.indexOf('HighContrast') > -1) ? 'black' : 'white') : _this.chart.stackLabels.fill !== 'transparent' ? _this.chart.stackLabels.fill : _this.chartBackground;
                        var rgbValue = convertHexToColor(colorNameToHex(backgroundColor));
                        var contrast = Math.round((rgbValue.r * 299 + rgbValue.g * 587 + rgbValue.b * 114) / 1000);
                        var alignmentValue = textSize.width + _this.chart.stackLabels.border.width
                            + _this.chart.stackLabels.margin.left + _this.chart.stackLabels.margin.right - padding / 2;
                        var yOffset = _this.chart.requireInvertedAxis ? padding / 2 :
                            (_this.chart.primaryYAxis.isInversed ? (index === 0 ? (textSize.height + padding / 2) : -padding)
                                : (index === 0 ? -padding : (textSize.height + padding / 2)));
                        var xOffset = _this.chart.requireInvertedAxis ?
                            ((_this.chart.primaryYAxis.isInversed ? (index === 0 ? -(padding + textSize.width / 2) :
                                (padding + textSize.width / 2)) : (index === 0 ? (padding + textSize.width / 2) :
                                -(padding + textSize.width / 2)))) : 0;
                        xOffset += _this.chart.stackLabels.font.textAlignment === 'Far' ? alignmentValue :
                            (_this.chart.stackLabels.font.textAlignment === 'Near' ? -alignmentValue : 0);
                        var xPosition = Math.max(series.clipRect.x + textSize.width, Math.min(xOffset + series.clipRect.x + symbolLocation.x, series.clipRect.x
                            + series.clipRect.width - textSize.width));
                        var yPosition = Math.max(series.clipRect.y + textSize.height, Math.min(yOffset + series.clipRect.y + symbolLocation.y -
                            ((_this.chart.stackLabels.angle > 0 && !_this.chart.requireInvertedAxis) ? textSize.width / 2 : 0), series.clipRect.y + series.clipRect.height - textSize.height));
                        var rect = new Rect(xPosition - textSize.width / 2 - _this.chart.stackLabels.margin.left, yPosition - textSize.height - _this.chart.stackLabels.margin.top, textSize.width + (_this.chart.stackLabels.margin.left + _this.chart.stackLabels.margin.right), textSize.height + padding / 2 + (_this.chart.stackLabels.margin.top + _this.chart.stackLabels.margin.bottom));
                        var shapeRect = _this.chart.renderer.drawRectangle(new RectOption(_this.chart.element.id + "StackLabel_TextShape_" + stackLabelIndex, _this.chart.stackLabels.fill, _this.chart.stackLabels.border, null, rect, _this.chart.stackLabels.rx, _this.chart.stackLabels.ry, '', null), new Int32Array([symbolLocation.x, symbolLocation.y]));
                        shapeRect.setAttribute('transform', "rotate(" + _this.chart.stackLabels.angle + ", " + xPosition + ", " + yPosition + ")");
                        stackLabelGroup.appendChild(shapeRect);
                        textElement(_this.chart.renderer, new TextOption(_this.chart.element.id + "_StackLabel_" + stackLabelIndex, xPosition, yPosition, 'middle', stackLabeltext, "rotate(" + _this.chart.stackLabels.angle + ", " + xPosition + ", " + yPosition + ")", 'auto', _this.chart.stackLabels.angle), _this.chart.stackLabels.font, (_this.chart.stackLabels.font.color || (_this.chart.theme === 'Bootstrap5' ? '#212529' : _this.chart.theme === 'Bootstrap5Dark' ? '#DEE2E6' : ((contrast >= 128) ?
                            _this.chart.theme.indexOf('Tailwind3') > -1 ? '#111827' : 'black' : _this.chart.theme.indexOf('Tailwind3') > -1 ? '#FFFFFF' : 'white'))), stackLabelGroup, null, _this.chart.redraw, true, null, _this.chart.duration, series.clipRect, null, null, _this.chart.enableCanvas, null, _this.chart.themeStyle.datalabelFont, null);
                        if (series.type === 'StackingLine' || series.type === 'StackingArea') {
                            document.querySelectorAll("[id^=\"" + _this.chart.element.id + "_Series_" + series.index + "_Point_" + currentPoint_1.index + "_Text_\"], \n                                [id^=\"" + _this.chart.element.id + "_Series_" + series.index + "_Point_" + currentPoint_1.index + "_TextShape_\"]").forEach(function (element) {
                                if (element.id) {
                                    element.style.visibility = 'hidden';
                                    element.setAttribute('data-collide', 'true');
                                }
                            });
                        }
                        for (var dataLabelID in _this.dataLabelRectCollection) {
                            if (Object.prototype.hasOwnProperty.call(_this.dataLabelRectCollection, dataLabelID)) {
                                var dataLabelRect = _this.dataLabelRectCollection[dataLabelID];
                                if (dataLabelRect) {
                                    var isCollided = isCollide(rect, [dataLabelRect], { x: 0, y: 0, height: 0, width: 0 });
                                    if (isCollided) {
                                        var dataLabelElement = document.getElementById(dataLabelID);
                                        if (dataLabelElement) {
                                            dataLabelElement.style.visibility = 'hidden';
                                            dataLabelElement.setAttribute('data-collide', 'true');
                                        }
                                    }
                                }
                            }
                        }
                    }
                    stackLabelIndex++;
                });
            }
        });
    };
    /**
     * Retrieves the points of a rectangle.
     *
     * @param {Rect} rect - The rectangle whose points are to be retrieved.
     * @returns {ChartLocation[]} - The points of the rectangle.
     */
    DataLabel.prototype.getRectanglePoints = function (rect) {
        var loc1 = new ChartLocation(rect.x, rect.y);
        var loc2 = new ChartLocation(rect.x + rect.width, rect.y);
        var loc3 = new ChartLocation(rect.x + rect.width, rect.y + rect.height);
        var loc4 = new ChartLocation(rect.x, rect.y + rect.height);
        return [loc1, loc2, loc3, loc4];
    };
    DataLabel.prototype.isDataLabelOverlapWithChartBound = function (rectCoordinates, chart, clip) {
        for (var index = 0; index < rectCoordinates.length; index++) {
            if (!withInBounds(rectCoordinates[index].x + clip.x, rectCoordinates[index].y + clip.y, chart.initialClipRect)) {
                return true;
            }
        }
        return false;
    };
    /**
     * Creates a template for data labels.
     *
     * @param {HTMLElement} parentElement - The parent element to which the template will be appended.
     * @param {Series} series - The series associated with the data label.
     * @param {DataLabelSettingsModel} dataLabel - The settings for the data label.
     * @param {Points} point - The data point to which the data label is associated.
     * @param {ITextRenderEventArgs} data - The event data associated with rendering the data label.
     * @param {number} labelIndex - The index of the data label.
     * @param {boolean} redraw - Specifies whether to redraw the template.
     * @returns {void}
     */
    DataLabel.prototype.createDataLabelTemplate = function (parentElement, series, dataLabel, point, data, labelIndex, redraw) {
        this.margin = { left: 0, right: 0, bottom: 0, top: 0 };
        var clip = series.clipRect;
        var childElement = createTemplate(createElement('div', {
            id: this.chart.element.id + '_Series_' + (series.index === undefined ? series.category : series.index) + '_DataLabel_'
                + point.index + (labelIndex ? ('_' + labelIndex) : ''),
            styles: 'position: absolute;background-color:' + data.color + ';' +
                getFontStyle(dataLabel.font, this.chart.themeStyle.datalabelFont) + ';border:' + data.border.width + 'px solid ' + data.border.color + ';'
        }), point.index, (this.chart.enableHtmlSanitizer ? this.chart.sanitize(data.template) : data.template), this.chart, point, series, this.chart.element.id + '_DataLabel', labelIndex);
        this.calculateTemplateLabelSize(parentElement, childElement, point, series, dataLabel, labelIndex, clip, redraw);
    };
    DataLabel.prototype.calculateTemplateLabelSize = function (parentElement, childElement, point, series, dataLabel, labelIndex, clip, redraw, isReactCallback) {
        var elementRect = measureElementRect(childElement, redraw, isReactCallback);
        var rect = this.calculateTextPosition(point, series, { width: elementRect.width, height: elementRect.height }, dataLabel, labelIndex);
        var clipWidth = 0;
        var clipHeight = 0;
        var isOverlap = false;
        if (isReactCallback) {
            isOverlap = (elementRect.width === 0 || elementRect.height === 0); // To check the data label already overlap before react callback call
            // clipWidth = ((series.clipRect.x + rect.x) + elementRect.width) > parentElement.clientWidth ?
            //     (parentElement.clientWidth - (series.clipRect.x + rect.x)) : 0;
            // clipHeight = (series.points.length - 1 === point.index) ? elementRect.height / 2 : 0;
        }
        childElement.style.left = ((this.chart.chartAreaType === 'PolarRadar' ? 0 : series.clipRect.x) + rect.x - clipWidth) + 'px';
        childElement.style.top = ((this.chart.chartAreaType === 'PolarRadar' ? 0 : series.clipRect.y) + rect.y + clipHeight) + 'px';
        var vAxis = series.chart.requireInvertedAxis ? series.xAxis : series.yAxis;
        var hAxis = series.chart.requireInvertedAxis ? series.yAxis : series.xAxis;
        if (childElement.childElementCount && !isOverlap && (!isCollide(rect, this.chart.dataLabelCollections, clip) ||
            dataLabel.labelIntersectAction === 'None') && (series.seriesType !== 'XY' || point.yValue === undefined ||
            withIn(point.yValue, series.yAxis.visibleRange) || (series.type.indexOf('Stacking') > -1) ||
            (series.type.indexOf('100') > -1 && withIn(series.stackedValues.endValues[point.index], series.yAxis.visibleRange))) &&
            withIn(point.xValue, series.xAxis.visibleRange) && parseFloat(childElement.style.top) >= vAxis.rect.y &&
            parseFloat(childElement.style.left) >= hAxis.rect.x &&
            parseFloat(childElement.style.top) <= vAxis.rect.y + vAxis.rect.height &&
            parseFloat(childElement.style.left) <= hAxis.rect.x + hAxis.rect.width) {
            this.chart.dataLabelCollections.push(new Rect(rect.x + clip.x, rect.y + clip.y, rect.width, rect.height));
            appendChildElement(this.chart.enableCanvas, parentElement, childElement, redraw, true, 'left', 'top');
            if (series.animation.enable && this.chart.animateSeries && !this.chart.enableCanvas) {
                this.doDataLabelAnimation(series, childElement);
            }
            else if (this.chart.enableCanvas) {
                parentElement.appendChild(childElement);
            }
        }
    };
    DataLabel.prototype.calculateTextPosition = function (point, series, textSize, dataLabel, labelIndex) {
        var labelRegion = labelIndex > 1 ? (series.type === 'Candle') ? point.regions[1] : point.regions[0] : point.regions[0];
        if (labelIndex > 1 && series.type === 'HiloOpenClose') {
            labelRegion = (labelIndex === 2) ? point.regions[1] : point.regions[2];
        }
        var location;
        location = this.getLabelLocation(point, series, textSize, labelIndex);
        var padding = 5;
        var clipRect = series.clipRect;
        // calculating alignment
        if (!this.chart.requireInvertedAxis || !this.isRectSeries(series) || series.type === 'BoxAndWhisker') {
            this.locationX = location.x;
            var alignmentValue = textSize.height + (this.borderWidth * 2) + this.markerHeight +
                this.margin.bottom + this.margin.top + padding;
            location.x = (dataLabel.position === 'Auto') ? location.x :
                this.calculateAlignment(alignmentValue, location.x, dataLabel.alignment, this.isRectSeries(series) ? point.yValue < 0 : false);
            // calculating position
            location.y = (!this.isRectSeries(series) || series.type === 'BoxAndWhisker') ?
                this.calculatePathPosition(location.y, dataLabel.position, series, point, textSize, labelIndex) :
                this.calculateRectPosition(location.y, labelRegion, point.yValue < 0 !== this.yAxisInversed, dataLabel.position, series, textSize, labelIndex, point);
            if (this.isRectSeries(series) && this.chart.chartAreaType === 'PolarRadar') {
                location = this.calculatePolarRectPosition(location, dataLabel.position, series, point, textSize, labelIndex, dataLabel.alignment, alignmentValue);
            }
        }
        else {
            this.locationY = location.y;
            var alignmentValue = textSize.width + this.borderWidth + this.margin.left + this.margin.right - padding;
            location.x = dataLabel.position === 'Auto' ? location.x :
                this.calculateAlignment(alignmentValue, location.x, dataLabel.alignment, point.yValue < 0);
            location.x = this.calculateRectPosition(location.x, labelRegion, point.yValue < 0 !== this.yAxisInversed, dataLabel.position, series, textSize, labelIndex, point);
        }
        var rect = calculateRect(location, textSize, this.margin);
        // Checking the condition whether data Label has been exist the clip rect
        if (!(dataLabel.enableRotation === true && dataLabel.angle !== 0) &&
            !((rect.y > (clipRect.y + clipRect.height)) || (rect.x > (clipRect.x + clipRect.width)) ||
                (rect.x + rect.width < 0) || (rect.y + rect.height < 0))) {
            rect.x = rect.x < 0 ? (series.type === 'StackingColumn' && !this.inverted ? 0 : padding) : rect.x;
            rect.y = (rect.y < 0 && !this.chart.requireInvertedAxis) && !(dataLabel.labelIntersectAction === 'None') ? padding : rect.y;
            rect.x -= (rect.x + rect.width) > (clipRect.x + clipRect.width) ? (rect.x + rect.width)
                - (clipRect.x + clipRect.width) + padding : 0;
            rect.y -= (rect.y + rect.height) > (clipRect.y + clipRect.height) ? (rect.y + rect.height)
                - (clipRect.y + clipRect.height) + padding : 0;
            this.fontBackground = this.fontBackground === 'transparent' ? this.chartBackground : this.fontBackground;
        }
        var dataLabelOutRegion;
        if (this.inverted && series.isRectSeries && (rect.x + rect.width > labelRegion.x + labelRegion.width)) {
            dataLabelOutRegion = true;
        }
        this.fontBackground = dataLabelOutRegion ? this.chartBackground : this.fontBackground;
        return rect;
    };
    // Calculation label location for polar column draw types
    DataLabel.prototype.calculatePolarRectPosition = function (location, position, series, point, size, labelIndex, alignment, alignmentValue) {
        var padding = 5;
        var columnRadius;
        var chartWidth = this.chart.availableSize.width;
        var alignmentSign = (alignment === 'Center') ? 0 : (alignment === 'Far' ? 1 : -1);
        var angle = (point.regionData.startAngle - 0.5 * Math.PI) + (point.regionData.endAngle - point.regionData.startAngle) / 2;
        if (labelIndex === 0) {
            columnRadius = point.regionData.radius < point.regionData.innerRadius ? point.regionData.innerRadius
                : point.regionData.radius;
        }
        else {
            columnRadius = point.regionData.radius > point.regionData.innerRadius ? point.regionData.innerRadius
                : point.regionData.radius;
        }
        this.fontBackground = this.fontBackground === 'transparent' ? this.chartBackground : this.fontBackground;
        if (series.drawType.indexOf('Stacking') > -1) {
            position = position === 'Outer' ? 'Top' : position;
        }
        else if (series.drawType.indexOf('Range') > -1) {
            position = (position === 'Outer' || position === 'Top') ? position : 'Auto';
        }
        if (position === 'Outer') {
            columnRadius = labelIndex === 0 ? columnRadius + 2 * padding + this.markerHeight :
                columnRadius - 2 * padding - this.markerHeight;
        }
        else if (position === 'Middle') {
            columnRadius = columnRadius / 2 + padding;
            if (series.drawType === 'StackingColumn') {
                columnRadius = point.regionData.innerRadius + ((point.regionData.radius - point.regionData.innerRadius) / 2)
                    + padding - (size.height / 2);
            }
        }
        else if (position === 'Top') {
            columnRadius = labelIndex === 0 ? columnRadius - 2 * padding - this.markerHeight :
                columnRadius + 2 * padding + this.markerHeight;
        }
        else if (position === 'Bottom') {
            columnRadius = 2 * padding;
            columnRadius += (series.drawType === 'StackingColumn') ? (point.regionData.innerRadius + this.markerHeight) : 0;
        }
        else {
            if (labelIndex === 0) {
                columnRadius = columnRadius >= series.chart.radius ? columnRadius - padding :
                    series.drawType === 'StackingColumn' ? columnRadius - 2 * padding : columnRadius + 2 * padding;
            }
            else {
                columnRadius = columnRadius >= series.chart.radius ? columnRadius + padding : columnRadius - 2 * padding;
            }
        }
        columnRadius += (alignmentValue * alignmentSign);
        location.x = series.clipRect.width / 2 + series.clipRect.x + columnRadius * Math.cos(angle);
        // To change x location based on text anchor for column and stackingcolumn chart
        if (series.drawType === 'StackingColumn') {
            location.x = location.x < chartWidth / 2 ? location.x + size.width / 2 :
                (location.x > chartWidth / 2 ? location.x - size.width / 2 : location.x);
        }
        else if (series.drawType === 'Column') {
            location.x = location.x < chartWidth / 2 ? location.x - size.width / 2 :
                (location.x > chartWidth / 2 ? location.x + size.width / 2 : location.x);
        }
        location.y = series.clipRect.height / 2 + series.clipRect.y + columnRadius * Math.sin(angle);
        return location;
    };
    /**
     * Gets the location for the data label.
     *
     * @param {Points} point - The data point associated with the label.
     * @param {Series} series - The series associated with the data label.
     * @param {Size} textSize - The size of the text to be displayed in the data label.
     * @param {number} labelIndex - The index of the data label.
     * @returns {ChartLocation} - The location for the data label.
     */
    DataLabel.prototype.getLabelLocation = function (point, series, textSize, labelIndex) {
        var location = new ChartLocation(0, 0);
        var labelRegion = (series.type === 'Candle' && labelIndex > 1) ? point.regions[1] : point.regions[0];
        if (series.type === 'HiloOpenClose') {
            labelRegion = (labelIndex === 2) ? point.regions[1] : point.regions[2];
        }
        var xAxis = series.xAxis;
        var yAxis = series.yAxis;
        var isInverted = series.chart.requireInvertedAxis;
        if (series.type === 'BoxAndWhisker') {
            this.markerHeight = 0;
            switch (labelIndex) {
                case 0:
                    location = getPoint(point.xValue, point.median, xAxis, yAxis, isInverted);
                    break;
                case 1:
                    location = getPoint(point.xValue, point.maximum, xAxis, yAxis, isInverted);
                    break;
                case 2:
                    location = getPoint(point.xValue, point.minimum, xAxis, yAxis, isInverted);
                    break;
                case 3:
                    location = getPoint(point.xValue, point.upperQuartile, xAxis, yAxis, isInverted);
                    break;
                case 4:
                    location = getPoint(point.xValue, point.lowerQuartile, xAxis, yAxis, isInverted);
                    break;
                default: {
                    location = getPoint(point.xValue, point.outliers[labelIndex - 5], xAxis, yAxis, isInverted);
                    this.markerHeight = series.marker.height / 2;
                    break;
                }
            }
            if (isInverted) {
                location.y = point.regions[0].y + (point.regions[0].height / 2);
            }
            else {
                location.x = point.regions[0].x + (point.regions[0].width / 2);
            }
        }
        else if (isInverted && series.type.indexOf('Stacking') > -1 && point.yValue === 0) {
            location = { x: labelRegion.x + labelRegion.width, y: labelRegion.y + (labelRegion.height) / 2 };
        }
        else if (labelIndex === 0 || labelIndex === 1) {
            location = new ChartLocation(point.symbolLocations[0].x, point.symbolLocations[0].y);
        }
        else if ((labelIndex === 2 || labelIndex === 3) && series.type === 'Candle') {
            location = new ChartLocation(point.symbolLocations[1].x, point.symbolLocations[1].y);
        }
        else if (isInverted) {
            location = { x: labelRegion.x + (labelRegion.width) / 2, y: labelRegion.y };
        }
        else {
            location = { x: labelRegion.x + labelRegion.width, y: labelRegion.y + (labelRegion.height) / 2 };
        }
        //Aligning the label at the beginning of the tick, when tick size is less than text size
        if (labelIndex > 1 && series.type === 'HiloOpenClose') {
            if (series.chart.requireInvertedAxis) {
                var height = labelRegion.height;
                location.y = labelRegion.y + height / 2 + 2 * (labelIndex === 2 ? 1 : -1);
            }
            else {
                var width = labelRegion.width;
                location.x = labelRegion.x + width / 2 + 2 * (labelIndex === 2 ? 1 : -1);
            }
        }
        return location;
    };
    DataLabel.prototype.calculateRectPosition = function (labelLocation, rect, isMinus, position, series, textSize, labelIndex, point) {
        if (series.chart.chartAreaType === 'PolarRadar') {
            return null;
        }
        var padding = 5;
        var margin = this.margin;
        var textLength = (series.marker.dataLabel.enableRotation ? textSize.width :
            (!this.inverted ? textSize.height : textSize.width));
        if (position === 'Bottom' && series.type === 'StackingColumn' && !this.inverted && rect.height < textSize.height) {
            this.extraSpace = this.borderWidth + ((Math.abs(rect.height - textSize.height / 2) < padding) ? 0 : padding);
        }
        else {
            this.extraSpace = this.borderWidth + textLength / 2 + (position !== 'Outer' && series.type.indexOf('Column') > -1 &&
                (Math.abs(rect.height - textSize.height) < padding) ? 0 : padding);
        }
        if (series.type === 'StackingColumn100' || series.type === 'StackingBar100') {
            position = (position === 'Outer') ? 'Top' : position;
        }
        else if (series.type.indexOf('Range') > -1) {
            position = (position === 'Outer' || position === 'Top') ? position : 'Auto';
        }
        else if (series.type === 'Waterfall') {
            position = position === 'Auto' ? 'Middle' : position;
        }
        switch (position) {
            case 'Bottom':
                labelLocation = !this.inverted ?
                    isMinus ? (labelLocation + (series.type === 'Waterfall' ? (-this.extraSpace - margin.top - this.markerHeight) : (-rect.height + this.extraSpace + margin.top))) :
                        (labelLocation + rect.height - this.extraSpace - margin.bottom) :
                    isMinus ? (labelLocation + (series.type === 'Waterfall' ? (+this.extraSpace + margin.left + this.markerHeight) : (+rect.width - this.extraSpace - margin.left))) :
                        (labelLocation - rect.width + this.extraSpace + margin.right);
                break;
            case 'Middle':
                labelLocation = labelLocation = !this.inverted ?
                    (isMinus ? labelLocation - (rect.height / 2) : labelLocation + (rect.height / 2)) :
                    (isMinus ? labelLocation + (rect.width / 2) : labelLocation - (rect.width / 2));
                break;
            case 'Auto':
                labelLocation = this.calculateRectActualPosition(labelLocation, rect, isMinus, series, textSize, labelIndex, point);
                break;
            default:
                this.extraSpace += this.errorHeight;
                labelLocation = this.calculateTopAndOuterPosition(labelLocation, rect, position, series, labelIndex, this.extraSpace, isMinus, point);
                break;
        }
        var check = !this.inverted ? (labelLocation < rect.y || labelLocation > rect.y + rect.height) :
            (labelLocation < rect.x || labelLocation > rect.x + rect.width);
        this.fontBackground = check ?
            (this.fontBackground === 'transparent' ? this.chartBackground : this.fontBackground)
            : this.fontBackground === 'transparent' ? (point.color || series.interior) : this.fontBackground;
        var seriesLength = series.chart.series.length;
        if (position === 'Outer' && (series.type.indexOf('Stacking') > -1) && ((seriesLength - 1) > series.index)) {
            var nextSeries = void 0;
            var nextSeriesPoint = void 0;
            for (var i = series.index + 1; i < seriesLength; i++) {
                nextSeries = series.chart.series[i];
                nextSeriesPoint = nextSeries.points[point.index];
                if ((nextSeries.type.indexOf('Stacking') > -1) && (nextSeries.type.indexOf('100') === -1)) {
                    this.fontBackground = (nextSeriesPoint && ((nextSeriesPoint.yValue < 0 && point.yValue < 0) ||
                        (nextSeriesPoint.yValue > 0 && point.yValue > 0))) ? (nextSeriesPoint ? nextSeriesPoint.color :
                        nextSeries.interior) : this.fontBackground;
                    break;
                }
            }
        }
        return labelLocation;
    };
    DataLabel.prototype.calculatePathPosition = function (labelLocation, position, series, point, size, labelIndex) {
        var padding = 5;
        if ((series.type.indexOf('Area') > -1 && series.type !== 'RangeArea' && series.type !== 'SplineRangeArea' && series.type !== 'RangeStepArea')
            && this.yAxisInversed && series.marker.dataLabel.position !== 'Auto') {
            position = position === 'Top' ? 'Bottom' : position === 'Bottom' ? 'Top' : position;
        }
        this.fontBackground = this.fontBackground === 'transparent' ? this.chartBackground : this.fontBackground;
        switch (position) {
            case 'Top':
            case 'Outer':
                labelLocation = labelLocation - this.markerHeight - this.borderWidth - size.height / 2 - this.margin.bottom - padding -
                    this.errorHeight;
                break;
            case 'Bottom':
                labelLocation = labelLocation + this.markerHeight + this.borderWidth + size.height / 2 + this.margin.top + padding +
                    this.errorHeight;
                break;
            case 'Auto':
                labelLocation = this.calculatePathActualPosition(labelLocation, this.markerHeight, series, point, size, labelIndex);
                break;
        }
        return labelLocation;
    };
    DataLabel.prototype.isDataLabelShape = function (style) {
        this.isShape = (style.color !== 'transparent' || style.border.width > 0);
        this.borderWidth = style.border.width;
        if (!this.isShape) {
            this.margin = { left: 0, right: 0, bottom: 0, top: 0 };
        }
    };
    DataLabel.prototype.calculateRectActualPosition = function (labelLocation, rect, isMinus, series, size, labelIndex, point) {
        var location;
        var labelRect;
        var isOverLap = true;
        var position = 0;
        var collection = this.chart.dataLabelCollections;
        var finalPosition = series.type.indexOf('Range') !== -1 || series.type === 'Hilo' ? 2 : 4;
        while (isOverLap && position < finalPosition) {
            var actualPosition = this.getPosition(position);
            this.fontBackground = series.marker.dataLabel.fill;
            if (series.type.indexOf('Stacking') > -1 && actualPosition === 'Outer') {
                actualPosition = 'Top';
                position++;
            }
            location = this.calculateRectPosition(labelLocation, rect, isMinus, actualPosition, series, size, labelIndex, point);
            if (!this.inverted) {
                if (series.marker.dataLabel.enableRotation) {
                    size.width = size.width - point.regions[0].width / 10;
                }
                labelRect = calculateRect(new ChartLocation(this.locationX, location), size, this.margin);
                isOverLap = labelRect.y < 0 || isCollide(labelRect, collection, series.clipRect) || labelRect.y > series.clipRect.height;
                if (series.marker.dataLabel.template === null && isOverLap !== true) {
                    isOverLap = labelRect.y / 2 + size.height + (actualPosition === 'Outer' ? point.regions[0].height + this.extraSpace : point.regions[0].height - 2 * this.extraSpace) > series.clipRect.height;
                }
            }
            else {
                labelRect = calculateRect(new ChartLocation(location, this.locationY), size, this.margin);
                isOverLap = labelRect.x < 0 || isCollide(labelRect, collection, series.clipRect) ||
                    labelRect.x + labelRect.width > series.clipRect.width;
            }
            position++;
        }
        return location;
    };
    // alignment calculation assigned here
    DataLabel.prototype.calculateAlignment = function (value, labelLocation, alignment, isMinus) {
        switch (alignment) {
            case 'Far':
                labelLocation = !this.inverted ? (isMinus ? labelLocation + value : labelLocation - value) :
                    (isMinus ? labelLocation - value : labelLocation + value);
                break;
            case 'Near':
                labelLocation = !this.inverted ? (isMinus ? labelLocation - value : labelLocation + value) :
                    (isMinus ? labelLocation + value : labelLocation - value);
                break;
        }
        return labelLocation;
    };
    //calculation for top and outer position of datalabel for rect series
    DataLabel.prototype.calculateTopAndOuterPosition = function (location, rect, position, series, index, extraSpace, isMinus, point) {
        var margin = this.margin;
        var top;
        switch (series.type) {
            case 'RangeColumn':
            case 'RangeArea':
            case 'RangeStepArea':
            case 'SplineRangeArea':
            case 'Hilo':
                top = (index === 0 && !this.yAxisInversed) || (index === 1 && this.yAxisInversed);
                location = this.updateLabelLocation(position, location, extraSpace, margin, rect, top);
                break;
            case 'Candle':
                top = (index === 0 || index === 2) && !this.yAxisInversed
                    || (index === 1 || index === 3) && this.yAxisInversed;
                location = this.updateLabelLocation(position, location, extraSpace, margin, rect, top, index > 1);
                break;
            case 'HiloOpenClose':
                if (index <= 1) {
                    top = (index === 0 && !this.yAxisInversed) || (index === 1 && this.yAxisInversed);
                    location = this.updateLabelLocation(position, location, extraSpace, margin, rect, top);
                }
                else {
                    if (this.yAxisInversed) {
                        location = !this.inverted ? location + extraSpace + margin.top : location - extraSpace - margin.right;
                    }
                    else {
                        location = !this.inverted ? location - extraSpace - margin.bottom : location + extraSpace + margin.left;
                    }
                }
                break;
            default:
                if (((isMinus && position === 'Top') || (!isMinus && position === 'Outer')) || (position === 'Top' && series.visiblePoints[point.index].yValue === 0)) {
                    location = !this.inverted ? location + (isMinus && series.type === 'Waterfall' ? (-rect.height + extraSpace + margin.bottom) : (-extraSpace - margin.bottom - this.markerHeight)) :
                        location + (isMinus && series.type === 'Waterfall' ? (+rect.width - extraSpace - margin.left) : (+extraSpace + margin.left + this.markerHeight));
                }
                else {
                    location = !this.inverted ? location + (isMinus && series.type === 'Waterfall' ? (-rect.height - extraSpace - margin.top) : (+extraSpace + margin.top + this.markerHeight)) :
                        location + (isMinus && series.type === 'Waterfall' ? (+rect.width + extraSpace + margin.top) : (-extraSpace - margin.right - this.markerHeight));
                }
                break;
        }
        return location;
    };
    /**
     * Updates the location of the data label.
     *
     * @param {LabelPosition} position - The position of the data label.
     * @param {number} location - The initial location of the data label.
     * @param {number} extraSpace - Extra space to adjust the label position.
     * @param {MarginModel} margin - The margin for the chart.
     * @param {Rect} rect - The rectangle associated with the data label.
     * @param {boolean} top - Indicates whether the label is positioned at the top.
     * @param {boolean} inside - Indicates whether the label is inside the chart area.
     * @returns {number} The updated location of the data label.
     */
    DataLabel.prototype.updateLabelLocation = function (position, location, extraSpace, margin, rect, top, inside) {
        if (inside === void 0) { inside = false; }
        if (!this.inverted) {
            if (top) {
                location = (position === 'Outer' && !inside) ? location - extraSpace - margin.bottom - this.markerHeight :
                    location + extraSpace + margin.top + this.markerHeight;
            }
            else {
                location = (position === 'Outer' && !inside) ? location + rect.height + extraSpace + margin.top + this.markerHeight :
                    location + rect.height - extraSpace - margin.bottom - this.markerHeight;
            }
        }
        else {
            if (top) {
                location = (position === 'Outer' && !inside) ? location + extraSpace + margin.left + this.markerHeight :
                    location - extraSpace - margin.right - this.markerHeight;
            }
            else {
                location = (position === 'Outer' && !inside) ? location - rect.width - extraSpace - margin.right - this.markerHeight :
                    location - rect.width + extraSpace + margin.left + this.markerHeight;
            }
        }
        return location;
    };
    DataLabel.prototype.calculatePathActualPosition = function (y, markerSize, series, point, size, labelIndex) {
        var points = series.points;
        var index = point.index;
        var yValue = points[index].yValue;
        var position;
        var nextPoint = points.length - 1 > index ? points[index + 1] : null;
        var previousPoint = index > 0 ? points[index - 1] : null;
        var yLocation;
        var isOverLap = true;
        var labelRect;
        var isBottom;
        var positionIndex;
        var collection = this.chart.dataLabelCollections;
        if (series.type === 'Bubble') {
            position = 'Top';
        }
        else if (series.type.indexOf('Step') > -1) {
            position = 'Top';
            if (index) {
                position = (!previousPoint || !previousPoint.visible || (yValue > previousPoint.yValue !== this.yAxisInversed)
                    || yValue === previousPoint.yValue) ? 'Top' : 'Bottom';
            }
        }
        else if (series.type === 'BoxAndWhisker') {
            if (labelIndex === 1 || labelIndex === 3 || labelIndex > 4) {
                position = series.yAxis.isAxisInverse ? 'Bottom' : 'Top';
            }
            else if (labelIndex === 2 || labelIndex === 4) {
                position = series.yAxis.isAxisInverse ? 'Top' : 'Bottom';
            }
            else {
                isOverLap = false;
                position = 'Middle';
                yLocation = this.calculatePathPosition(y, position, series, point, size, labelIndex);
            }
        }
        else {
            if (index === 0) {
                position = (!nextPoint || !nextPoint.visible || yValue > nextPoint.yValue ||
                    (yValue < nextPoint.yValue && this.yAxisInversed)) ? 'Top' : 'Bottom';
            }
            else if (index === points.length - 1) {
                position = (!previousPoint || !previousPoint.visible || yValue > previousPoint.yValue ||
                    (yValue < previousPoint.yValue && this.yAxisInversed)) ? 'Top' : 'Bottom';
            }
            else {
                if (!nextPoint.visible && !(previousPoint && previousPoint.visible)) {
                    position = 'Top';
                }
                else if (!nextPoint.visible || !previousPoint) {
                    position = (nextPoint.yValue > yValue || (previousPoint && previousPoint.yValue > yValue)) ?
                        'Bottom' : 'Top';
                }
                else {
                    var slope = (nextPoint.yValue - previousPoint.yValue) / 2;
                    var intersectY = (slope * index) + (nextPoint.yValue - (slope * (index + 1)));
                    position = !this.yAxisInversed ? intersectY < yValue ? 'Top' : 'Bottom' :
                        intersectY < yValue ? 'Bottom' : 'Top';
                }
            }
        }
        isBottom = position === 'Bottom';
        positionIndex = ['Outer', 'Top', 'Bottom', 'Middle', 'Auto'].indexOf(position);
        while (isOverLap && positionIndex < 4) {
            yLocation = this.calculatePathPosition(y, this.getPosition(positionIndex), series, point, size, labelIndex);
            labelRect = calculateRect(new ChartLocation(this.locationX, yLocation), size, this.margin);
            isOverLap = labelRect.y < 0 || isCollide(labelRect, collection, series.clipRect)
                || (labelRect.y + labelRect.height) > series.clipRect.height;
            positionIndex = isBottom ? positionIndex - 1 : positionIndex + 1;
            isBottom = false;
        }
        return yLocation;
    };
    /**
     * Initiates the animation for data labels.
     *
     * @param {Series} series - The series associated with the data labels.
     * @param {Element} [element] - The element to animate.
     * @returns {void}
     * @private
     */
    DataLabel.prototype.doDataLabelAnimation = function (series, element) {
        var shapeElements = series.shapeElement.childNodes;
        var textNode = series.textElement.childNodes;
        var delay = series.animation.delay + series.animation.duration;
        var duration = series.chart.animated ? series.chart.duration : 200;
        var location;
        var length = element ? 1 : textNode.length;
        var tempElement;
        for (var i = 0; i < length; i++) {
            tempElement = textNode[i];
            if (element) {
                element.style.visibility = 'hidden';
                templateAnimate(element, delay, duration, 'ZoomIn');
            }
            else {
                location = new ChartLocation((+tempElement.getAttribute('x')) + ((+tempElement.getAttribute('width')) / 2), (+tempElement.getAttribute('y')) + ((+tempElement.getAttribute('height')) / 2));
                markerAnimate(tempElement, delay, series.animation.duration, series, null, location, true);
                if (shapeElements[i]) {
                    tempElement = shapeElements[i];
                    location = new ChartLocation((+tempElement.getAttribute('x')) + ((+tempElement.getAttribute('width')) / 2), (+tempElement.getAttribute('y')) + ((+tempElement.getAttribute('height')) / 2));
                    markerAnimate(tempElement, delay, series.animation.duration, series, null, location, true);
                }
            }
        }
    };
    DataLabel.prototype.getPosition = function (index) {
        return (['Outer', 'Top', 'Bottom', 'Middle', 'Auto'][index]);
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    DataLabel.prototype.getModuleName = function () {
        // Returns the module name
        return 'DataLabel';
    };
    /**
     * To destroy the dataLabel for series.
     *
     * @returns {void}
     * @private
     */
    DataLabel.prototype.destroy = function () {
        // Destroy method performed here
    };
    return DataLabel;
}());
export { DataLabel };
