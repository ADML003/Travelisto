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
 * Circular 3D chart series.
 */
import { Browser, ChildProperty, Complex, Property, getValue, isNullOrUndefined } from '@syncfusion/ej2-base';
import { Animation } from '../../common/model/base';
import { appendChildElement, stringToNumber } from '../../common/utils/helper';
import { Rect, Size } from '@syncfusion/ej2-svg-base';
import { DataManager } from '@syncfusion/ej2-data';
import { pointRender, seriesRender } from '../../common/model/constants';
import { getCircular3DSeriesColor } from '../model/theme';
import { CircularChart3DDataLabelSettings } from './dataLabel';
/**
 * Model representing data points for the circular 3D series.
 *
 * @public
 */
var CircularChart3DPoints = /** @class */ (function () {
    function CircularChart3DPoints() {
        /**Circular 3D point visibility. */
        this.visible = true;
        /** @private */
        this.isExplode = false;
        /** @private  */
        this.argsData = null;
    }
    return CircularChart3DPoints;
}());
export { CircularChart3DPoints };
/**
 * Configures settings for empty points in the circular 3D series.
 */
var CircularChart3DEmptyPointSettings = /** @class */ (function (_super) {
    __extends(CircularChart3DEmptyPointSettings, _super);
    function CircularChart3DEmptyPointSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(null)
    ], CircularChart3DEmptyPointSettings.prototype, "fill", void 0);
    __decorate([
        Property('Gap')
    ], CircularChart3DEmptyPointSettings.prototype, "mode", void 0);
    return CircularChart3DEmptyPointSettings;
}(ChildProperty));
export { CircularChart3DEmptyPointSettings };
/**
 *  Configures the series in a circular 3D chart.
 */
var CircularChart3DSeries = /** @class */ (function (_super) {
    __extends(CircularChart3DSeries, _super);
    function CircularChart3DSeries() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** @private */
        _this.points = [];
        /** @private */
        _this.sumOfPoints = 0;
        /** @private */
        _this.isRectSeries = true;
        /** @private */
        _this.clipRect = new Rect(0, 0, 0, 0);
        /** @private */
        _this.category = 'Series';
        /** @private */
        _this.rightSidePoints = [];
        /** @private */
        _this.leftSidePoints = [];
        /** @private */
        _this.segments = [];
        /** @private */
        _this.isExploded = false;
        return _this;
    }
    /**
     * Refreshes the DataManager for the circular 3D series.
     *
     * @private
     * @param {CircularChart3D} chart - The instance of the circular 3D chart.
     * @param {boolean} render - A boolean value indicating whether rendering is required.
     * @returns {void}
     */
    CircularChart3DSeries.prototype.refreshDataManager = function (chart, render) {
        var _this = this;
        var dateSource = this.dataSource || chart.dataSource;
        if (!(dateSource instanceof DataManager) && isNullOrUndefined(this.query)) {
            this.dataManagerSuccess({ result: dateSource, count: dateSource.length }, chart, render);
            return;
        }
        var dataManager = this.dataModule.getData(this.dataModule.generateQuery().requiresCount());
        dataManager.then(function (e) { return _this.dataManagerSuccess(e, chart); });
    };
    /**
     * Handles the success event when the DataManager fetches data for the circular 3D series.
     *
     * @private
     * @param {Object} dataObject - Specifies the series data object.
     * @param {Object} dataObject.result - The actual data.
     * @param {number} dataObject.count - The count of data.
     * @param {CircularChart3D} chart - The instance of the circular 3D chart.
     * @param {boolean} [render=true] - A boolean value indicating whether rendering is required. Default is true.
     * @returns {void}
     */
    CircularChart3DSeries.prototype.dataManagerSuccess = function (dataObject, chart, render) {
        if (render === void 0) { render = true; }
        var argsData = {
            name: seriesRender, series: this, data: dataObject.result
        };
        chart.allowServerDataBinding = false;
        chart.trigger(seriesRender, argsData);
        this.resultData = dataObject.result !== '' ? dataObject.result : [];
        if (!render) {
            this.getPoints(this.resultData, chart);
        }
        if ((++chart.seriesCounts === chart.visibleSeries.length && render)) {
            this.getPoints(this.resultData, chart);
            chart.refreshChart();
        }
    };
    /**
     * Retrieves and processes data points for rendering on a circular 3D chart.
     *
     * @param {Object} result - An object containing the data points for the chart.
     * @param {CircularChart3D}chart - The instance of the circular 3D chart.
     * @returns {void}
     */
    CircularChart3DSeries.prototype.getPoints = function (result, chart) {
        var length = Object.keys(result).length;
        this.sumOfPoints = 0;
        if (length === 0) {
            this.points = [];
            return null;
        }
        this.findSumOfPoints(result);
        this.points = [];
        var point;
        var colors = this.palettes.length ? this.palettes : getCircular3DSeriesColor(chart.theme);
        for (var i = 0; i < length; i++) {
            point = this.setPoints(result, i, chart);
            if (isNullOrUndefined(point.y)) {
                point.visible = false;
            }
            this.pushPoints(point, colors, chart);
        }
    };
    /**
     * Sets point index and color for a circular 3D data point.
     *
     * @param {CircularChart3DPoints} point - The CircularChart3DPoints object representing the data point.
     * @param {string[]} colors - An array specifying the point colors.
     * @param {CircularChart3D} chart - The instance of the circular 3D chart.
     * @returns {void}
     */
    CircularChart3DSeries.prototype.pushPoints = function (point, colors, chart) {
        point.index = this.points.length;
        point.isExplode = this.explodeAll || (point.index === this.explodeIndex);
        point.color = point.color || colors[point.index % colors.length];
        var argsData = {
            cancel: false, name: pointRender, series: this, point: point,
            fill: point.color
        };
        chart.trigger(pointRender, argsData);
        point.color = argsData.fill;
        point.visible = !argsData.cancel;
        this.points.push(point);
    };
    /**
     * Calculates the sum of points in the circular 3D series.
     *
     * @param {Object} result - The result object containing data points.
     * @returns {void}
     */
    CircularChart3DSeries.prototype.findSumOfPoints = function (result) {
        var length = Object.keys(result).length;
        for (var i = 0; i < length; i++) {
            if (!isNullOrUndefined(result[i]) &&
                !isNullOrUndefined(result[i][this.yName]) && !isNaN(result[i][this.yName])) {
                this.sumOfPoints += Math.abs(result[i][this.yName]);
            }
        }
    };
    /**
     * Sets x, y, and text points from the specified data source.
     *
     * @param {Object} data - The data source containing information for the point.
     * @param {number} index - The index specifying the position in the data array.
     * @param {CircularChart3D} chart - Specifies the circular 3D chart instance.
     * @returns {CircularChart3DPoints} - Returns the CircularChart3DPoints object representing the data point.
     */
    CircularChart3DSeries.prototype.setPoints = function (data, index, chart) {
        var point = new CircularChart3DPoints();
        point.x = getValue(this.xName, data[index]);
        point.y = getValue(this.yName, data[index]);
        point.percentage = (+(point.y / this.sumOfPoints * 100).toFixed(2));
        point.legendImageUrl = getValue(this.legendImageUrl, data[index]);
        point.color = getValue(this.pointColorMapping, data[index]);
        point.text = point.originalText = getValue(this.dataLabel.name || '', data[index]);
        point.tooltip = getValue(this.tooltipMappingName || '', data[index]);
        point.sliceRadius = getValue(this.radius ? this.radius : '80%', data[index]);
        point.sliceRadius = isNullOrUndefined(point.sliceRadius) ? '80%' : point.sliceRadius;
        point.separatorY = chart.intl.formatNumber(point.y, { useGrouping: chart.useGroupingSeparator });
        this.setEmptyPoint(point, index, data, chart);
        return point;
    };
    /**
     * Draws the circular 3D series on the chart.
     *
     * @param {CircularChart3DSeries} series - The series to be drawn.
     * @param {CircularChart3D} chart - The circular 3D chart instance.
     * @returns {void}
     * @private
     */
    CircularChart3DSeries.prototype.draw = function (series, chart) {
        var marginRatio = 0.03;
        var seriesIndex = chart.visibleSeries.indexOf(series);
        this.calculateSize(chart, series);
        var seriesRadius = series.radius ? series.radius : (Browser.isDevice && series.dataLabel.position === 'Outside') ? '40%' : '80%';
        var radius = parseInt(seriesRadius, 10);
        if (!((seriesRadius.indexOf('%') !== -1 || typeof radius === 'number') && !isNaN(radius))) {
            this.isRadiusMapped = true;
        }
        series.size = this.isRadiusMapped ? 0.8 : parseInt(seriesRadius, 10) / 100;
        series.coefficient = parseInt(series.innerRadius, 10) / 100;
        chart.circularRadius[seriesIndex] =
            (((1 - marginRatio) * Math.min(series.actualWidth / 2 - ((chart.legendSettings.visible && chart.circularChartLegend3DModule && (chart.legendSettings.position === 'Right' ||
                chart.legendSettings.position === 'Left')) ? chart.circularChartLegend3DModule.legendBounds.width : 0), series.actualHeight / 2)) * series.size);
        chart.innerRadius[seriesIndex] =
            series.coefficient * chart.circularRadius[seriesIndex];
        this.createPolygons(series, chart);
        if (this.dataLabel.visible) {
            chart.circularChartDataLabel3DModule.renderDataLabel(series, chart);
        }
        appendChildElement(false, chart.svgObject, chart.groupElement, chart.redraw);
        var size = new Size(chart.availableSize.width, chart.availableSize.height);
        chart.graphics.prepareView(0, chart.depth, chart.rotation, chart.tilt, size, chart);
        chart.graphics.view(chart.svgObject, chart);
    };
    /**
     * Calculates the size of the series based on the chart settings.
     *
     * @param {CircularChart3D} chart - The circular 3D chart instance.
     * @param {CircularChart3DSeries} series - The series for which to calculate the size.
     * @returns {{ centerX: number, centerY: number }} - The calculated center coordinates.
     */
    CircularChart3DSeries.prototype.calculateSize = function (chart, series) {
        var legend = chart.legendSettings;
        var legXSpace = 0;
        var legYSpace = 0;
        var legendPosition = chart.circularChartLegend3DModule ? chart.circularChartLegend3DModule.position : 'Auto';
        var title = chart.title;
        var subTitle = chart.subTitle;
        var titleLocation = chart.titleLocation;
        var subTitleLocation = chart.subTitleLocation;
        var titleTextOverflow = chart.titleStyle.textOverflow;
        var subTitleTextOverflow = chart.subTitleStyle.textOverflow;
        var titleEnable = (title &&
            (titleTextOverflow === 'Wrap')) ? true : false;
        var subTitleEnable = (subTitle &&
            (subTitleTextOverflow === 'Wrap')) ? true : false;
        if (legend.visible && chart.circularChartLegend3DModule && legendPosition !== 'Custom') {
            if (legendPosition === 'Right' || legendPosition === 'Left') {
                legXSpace = (legendPosition.toLowerCase() === 'right') ?
                    chart.margin.right : chart.margin.left + chart.circularChartLegend3DModule.legendBounds.width;
            }
            else {
                legYSpace = (legendPosition === 'Top') ? chart.margin.top :
                    ((legendPosition === 'Bottom') ? chart.margin.bottom + chart.circularChartLegend3DModule.legendBounds.height : 0);
            }
        }
        series.actualWidth = chart.availableSize.width - legXSpace;
        var centerx = (series.actualWidth * 0.5) + ((legendPosition === 'Left') ? legXSpace : 0);
        if (titleEnable || subTitleEnable) {
            var yOffset = titleLocation.size.height + (subTitleEnable ? subTitleLocation.size.height : 0) + legYSpace;
            series.actualHeight = chart.svgObject.height.baseVal.value - yOffset;
            var centery = series.actualHeight * 0.5 + (titleLocation.size.height + (subTitleEnable ? subTitleLocation.size.height : 0));
            return { centerX: centerx, centerY: centery };
        }
        else {
            var yOffset = ((title) ? titleLocation.y : 0) + legYSpace;
            series.actualHeight = chart.svgObject.height.baseVal.value - yOffset;
            var centery = series.actualHeight * 0.5 + ((legendPosition === 'Top') ?
                yOffset : ((title) ? (titleLocation.y) : 0));
            return { centerX: centerx, centerY: centery };
        }
    };
    /**
     * Creates polygons for a 3D circular chart series.
     *
     * @param {CircularChart3DSeries} series - The CircularChart3D series for which to create polygons.
     * @param {CircularChart3D} chart - The circular 3D chart instance.
     * @returns {CircularChart3DPolygon[][]} - The array of created polygons.
     */
    CircularChart3DSeries.prototype.createPolygons = function (series, chart) {
        var segments = [];
        var polygons = [];
        var seg;
        var style;
        var pointIndex;
        var polygonCollection = [];
        if (series.segments.length === 0) {
            segments = this.createPoints(series, chart);
        }
        else {
            segments = series.segments;
        }
        var segmentsLength = segments.length;
        for (var i = 0; i < segmentsLength; i++) {
            seg = segments[i];
            if (seg.visible) {
                pointIndex = segments[i].pointIndex;
                style = {
                    opacity: series.opacity,
                    interior: series.points[pointIndex].color
                };
                polygonCollection = this.createSector(seg, chart, style, series.index);
                if (polygonCollection !== null) {
                    for (var k = 0; k < polygonCollection.length; k++) {
                        if (!polygons[k]) {
                            polygons[k] = [];
                        }
                        if (polygonCollection[k] !== null) {
                            for (var j = 0; j < polygonCollection[k].length; j++) {
                                polygons[k].push(polygonCollection[k][j]);
                            }
                        }
                    }
                }
            }
        }
        for (var i = 0; i < polygons.length; i++) {
            for (var k = 0; k < polygons[i].length; k++) {
                var polygone = (polygons[i][k]);
                chart.circular3DPolygon.push(polygone);
            }
        }
        return null;
    };
    /**
     * Creates sectors for a circular 3D chart based on the specified parameters.
     *
     * @param {CircularChart3DSegments} segment - The CircularChart3DSegments instance defining the segment.
     * @param {CircularChart3D} chart - The circular 3D chart instance.
     * @param {CircularChart3DSeriesStyle} style - The CircularChart3DSeriesStyle defining the style of the sectors.
     * @param {number} seriesIndex - The index of the series to which the sectors belong.
     * @returns {CircularChart3DPolygon[][]} - An array of CircularChart3DPolygon arrays representing the created sectors.
     */
    CircularChart3DSeries.prototype.createSector = function (segment, chart, style, seriesIndex) {
        var count = Math.ceil(segment.actualEndValue / 6);
        var degreesToRadians = Math.PI / 180;
        var index = 0;
        var depth = chart.depth;
        if (count < 1) {
            return null;
        }
        var polygonCollection = [];
        var endValue = segment.actualEndValue / count;
        var outputPoints = [];
        var inputPoints = [];
        for (var i = 0; i < count + 1; i++) {
            var ox = segment.center.x + segment.radius * Math.cos((segment.actualStartValue + i * endValue) * degreesToRadians);
            var oy = segment.center.y + segment.radius * Math.sin((segment.actualStartValue + i * endValue) * degreesToRadians);
            outputPoints[i] = { x: ox, y: oy };
            var ix = segment.center.x +
                segment.inSideRadius * Math.cos((segment.actualStartValue + i * endValue) * degreesToRadians);
            var iy = segment.center.y +
                segment.inSideRadius * Math.sin((segment.actualStartValue + i * endValue) * degreesToRadians);
            inputPoints[i] = { x: ix, y: iy };
        }
        var originPolygon = [];
        var vts = [];
        for (var i = 0; i < count; i++) {
            vts = [
                this.vector(outputPoints[i].x, outputPoints[i].y, 0),
                this.vector(outputPoints[i].x, outputPoints[i].y, depth),
                this.vector(outputPoints[i + 1].x, outputPoints[i + 1].y, depth),
                this.vector(outputPoints[i + 1].x, outputPoints[i + 1].y, 0)
            ];
            originPolygon[i] = chart.polygon.polygon3D(vts, null, segment.index, null, null, style.opacity, style.interior, index.toString() + '-region' + '-series-' + seriesIndex + '-point-' + segment.index, chart.groupElement, segment.accessibilityText);
            index++;
        }
        polygonCollection[1] = originPolygon;
        if (segment.inSideRadius > 0) {
            var iPlgs = [];
            for (var i = 0; i < count; i++) {
                vts = [
                    this.vector(inputPoints[i].x, inputPoints[i].y, 0),
                    this.vector(inputPoints[i].x, inputPoints[i].y, depth),
                    this.vector(inputPoints[i + 1].x, inputPoints[i + 1].y, depth),
                    this.vector(inputPoints[i + 1].x, inputPoints[i + 1].y, 0)
                ];
                iPlgs[i] = chart.polygon.polygon3D(vts, null, segment.index, null, null, style.opacity, style.interior, index.toString() + '-region' + '-series-' + seriesIndex + '-point-' + segment.index, chart.groupElement, segment.accessibilityText);
                index++;
            }
            polygonCollection[3] = iPlgs;
        }
        var tVtxs = [];
        var bVtxs = [];
        for (var i = 0; i < count + 1; i++) {
            tVtxs.push(this.vector(outputPoints[i].x, outputPoints[i].y, 0));
            bVtxs.push(this.vector(outputPoints[i].x, outputPoints[i].y, depth));
        }
        if (segment.inSideRadius > 0) {
            for (var i = count; i > -1; i--) {
                tVtxs.push(this.vector(inputPoints[i].x, inputPoints[i].y, 0));
                bVtxs.push(this.vector(inputPoints[i].x, inputPoints[i].y, depth));
            }
        }
        else {
            tVtxs.push(segment.center);
            bVtxs.push(this.vector(segment.center.x, segment.center.y, depth));
        }
        polygonCollection[0] = [];
        polygonCollection[0].push(chart.polygon.polygon3D(tVtxs, null, segment.index, null, null, style.opacity, style.interior, index.toString() + '-region' + '-series-' + seriesIndex + '-point-' + segment.index, chart.groupElement, segment.accessibilityText));
        index++;
        polygonCollection[0].push(chart.polygon.polygon3D(bVtxs, null, segment.index, null, null, style.opacity, style.interior, index.toString() + '-region' + '-series-' + seriesIndex + '-point-' + segment.index, chart.groupElement, segment.accessibilityText));
        index++;
        if (segment.inSideRadius > 0) {
            var rvts = [
                this.vector(outputPoints[0].x, outputPoints[0].y, 0),
                this.vector(outputPoints[0].x, outputPoints[0].y, depth),
                this.vector(inputPoints[0].x, inputPoints[0].y, depth),
                this.vector(inputPoints[0].x, inputPoints[0].y, 0)
            ];
            var lvts = [
                this.vector(outputPoints[count].x, outputPoints[count].y, 0),
                this.vector(outputPoints[count].x, outputPoints[count].y, depth),
                this.vector(inputPoints[count].x, inputPoints[count].y, depth),
                this.vector(inputPoints[count].x, inputPoints[count].y, 0)
            ];
            polygonCollection[2] = [];
            polygonCollection[2].push(chart.polygon.polygon3D(rvts, null, segment.index, null, null, style.opacity, style.interior, index.toString() + '-region' + '-series-' + seriesIndex + '-point-' + segment.index, chart.groupElement, segment.accessibilityText));
            index++;
            polygonCollection[2].push(chart.polygon.polygon3D(lvts, null, segment.index, null, null, style.opacity, style.interior, index.toString() + '-region' + '-series-' + seriesIndex + '-point-' + segment.index, chart.groupElement, segment.accessibilityText));
            index++;
        }
        else {
            var rvts = [
                this.vector(outputPoints[0].x, outputPoints[0].y, 0),
                this.vector(outputPoints[0].x, outputPoints[0].y, depth),
                this.vector(segment.center.x, segment.center.y, depth),
                this.vector(segment.center.x, segment.center.y, 0)
            ];
            var lvts = [
                this.vector(outputPoints[count].x, outputPoints[count].y, 0),
                this.vector(outputPoints[count].x, outputPoints[count].y, depth),
                this.vector(segment.center.x, segment.center.y, depth),
                this.vector(segment.center.x, segment.center.y, 0)
            ];
            polygonCollection[2] = [];
            polygonCollection[2].push(chart.polygon.polygon3D(rvts, null, segment.index, null, null, style.opacity, style.interior, index.toString() + '-region' + '-series-' + seriesIndex + '-point-' + segment.index, chart.groupElement, segment.accessibilityText));
            index++;
            polygonCollection[2].push(chart.polygon.polygon3D(lvts, null, segment.index, null, null, style.opacity, style.interior, index.toString() + '-region' + '-series-' + seriesIndex + '-point-' + segment.index, chart.groupElement, segment.accessibilityText));
            index++;
        }
        return polygonCollection;
    };
    /**
     * Creates CircularChart3DSegments based on the provided CircularChart3D series and circular 3D chart.
     *
     * @param {CircularChart3DSeries} series - The circular 3D series for which to generate points.
     * @param {CircularChart3D} chart - The circular 3D chart instance.
     * @returns {CircularChart3DSegments[]} - An array of CircularChart3DSegments created for the series.
     */
    CircularChart3DSeries.prototype.createPoints = function (series, chart) {
        series.segments = [];
        var size = this.calculateSize(chart, series);
        var all = 0;
        var visiblePoints = series.points;
        var count = visiblePoints.length;
        for (var j = 0; j < count; j++) {
            if (visiblePoints[j].visible && !isNullOrUndefined(visiblePoints[j].y)) {
                all += visiblePoints[j].y;
            }
        }
        all = all !== 0 ? all : 1;
        var coefficient = 360 / all;
        var seriesIndex = series.index;
        var insideRadius = chart.innerRadius[seriesIndex];
        var yValues = this.getYValues(series.points);
        var pieHeight = chart.depth;
        var center;
        var arcStartAngle = 0;
        var arcEndAngle = 0;
        var current = 0;
        var pointIndex;
        var value;
        var rect = new Rect(0, 0, 0, 0);
        var offset = { X: 0, Y: 0 };
        var segment;
        var segIndex = 0;
        var radius = chart.circularRadius[seriesIndex];
        for (var i = 0; i < count; i++) {
            if (series.points[i].visible && !isNullOrUndefined(yValues[i])) {
                pointIndex = series.points[i].index;
                value = Math.abs(yValues[i]);
                arcEndAngle = Math.abs(value) * ((Math.PI * 2) / all);
                rect.x = 0;
                rect.y = 0;
                var point = series.points[i];
                if (series.isRadiusMapped) {
                    if (series.points[i].sliceRadius.indexOf('%') !== -1) {
                        point.radius = stringToNumber(series.points[i].sliceRadius, this.size / 2);
                    }
                    else {
                        point.radius = parseInt(series.points[i].sliceRadius, 10);
                    }
                }
                else {
                    point.radius = radius;
                }
                var accessibilityText = point.x + ':' + point.y + ', ' + series.name;
                if (!isNullOrUndefined(value)) {
                    if (series.explode && (series.explodeIndex === point.index ||
                        !series.isExploded && series.explodeAll)) {
                        offset.X = Math.cos(2 * Math.PI * (current + value / 2) / all);
                        offset.Y = Math.sin(2 * Math.PI * (current + value / 2) / all);
                        rect.x = 0.01 * point.radius * offset.X * stringToNumber(series.explodeOffset, 100);
                        rect.y = 0.01 * point.radius * offset.Y * stringToNumber(series.explodeOffset, 100);
                    }
                    center = this.vector(rect.x + size.centerX, rect.y + size.centerY, 0);
                    segment = this.createSegment(center, (coefficient * current), (coefficient * value), pieHeight, point.radius, i, value, insideRadius, pointIndex, series, accessibilityText);
                    series.segments.push(segment);
                }
                this.addPieDataLabel(segIndex, yValues[i], arcStartAngle, arcStartAngle + arcEndAngle, point.radius, this.isChartRotated(chart) ? chart.depth + 5 : 0, center, series.points[i]);
                segIndex++;
                arcStartAngle += arcEndAngle;
                current += value;
            }
        }
        return series.segments;
    };
    /**
     * Adds a data label to a circular 3D chart at the specified position and orientation.
     *
     * @param {number} x - The x-coordinate of the data label position.
     * @param {number} y - The y-coordinate of the data label position.
     * @param {number} startAngle - The starting angle of the pie slice in degrees.
     * @param {number} endAngle - The ending angle of the pie slice in degrees.
     * @param {number} radius - The radius of the pie slice.
     * @param {number} startDepth - The depth at which the pie slice starts in the 3D space.
     * @param {CircularChart3DVector} center - The center point of the pie chart in 3D space.
     * @param {CircularChart3DPoints} point - The specific data point associated with the data label.
     * @returns {void}
     */
    CircularChart3DSeries.prototype.addPieDataLabel = function (x, y, startAngle, endAngle, radius, startDepth, center, point) {
        var angle = (startAngle + endAngle) / 2;
        point.symbolLocation = { x: 0, y: 0, radius: 0, angle: 0 };
        point.symbolLocation.x = x;
        point.symbolLocation.y = y;
        point.symbolLocation.radius = radius;
        point.symbolLocation.angle = angle;
        point.symbolLocation.center = center;
        point.startDepth = startDepth;
    };
    /**
     * Checks if the circular 3D chart is rotated.
     *
     * @param {CircularChart3D} chart - The circular 3D chart instance.
     * @returns {boolean} - A boolean indicating whether the chart is rotated.
     */
    CircularChart3DSeries.prototype.isChartRotated = function (chart) {
        var actualTiltView = Math.abs(chart.tilt % 360);
        var actualRotateView = Math.abs(chart.rotation % 360);
        if ((actualTiltView > 90 && actualTiltView < 270) !== (actualRotateView > 90 && actualRotateView < 270)) {
            return true;
        }
        return false;
    };
    /**
     * Creates a segment based on the provided parameters.
     *
     * @param {CircularChart3DVector} center - The center point of the segment.
     * @param {number} start - The starting angle of the segment in radians.
     * @param {number} end - The ending angle of the segment in radians.
     * @param {number} height - The height of the segment.
     * @param {number} radius - The radial distance from the center to the segment.
     * @param {number} index - The index value of the segment.
     * @param {number} yValue - The y value associated with the segment.
     * @param {number} insideRadius - The inside radius of the segment.
     * @param {number} pointIndex - The index of the point associated with the segment.
     * @param {CircularChart3DSeries} series - The CircularChart3DSeries to which the segment belongs.
     * @param {string} accessibilityText - The accessibility text of the segment.
     * @returns {CircularChart3DSegments} - The created segment.
     */
    CircularChart3DSeries.prototype.createSegment = function (center, start, end, height, radius, index, yValue, insideRadius, pointIndex, series, accessibilityText) {
        return {
            startValue: start,
            endValue: end,
            depth: height,
            radius: radius,
            index: index,
            yData: yValue,
            center: center,
            inSideRadius: insideRadius,
            actualEndValue: end,
            actualStartValue: start,
            pointIndex: pointIndex,
            series: series,
            visible: true,
            accessibilityText: accessibilityText
        };
    };
    /**
     * Creates a new Vector3D instance from provided coordinates.
     *
     * @param {number | { x: number, y: number }} vx - Either an object with x and y properties or the x-coordinate.
     * @param {number} vy - The y-coordinate.
     * @param {number} vz - The z-coordinate.
     * @returns {CircularChart3DVector} - The new Vector3D instance.
     */
    CircularChart3DSeries.prototype.vector = function (vx, vy, vz) {
        return { x: vx, y: vy, z: vz };
    };
    /**
     * Gets the `Y` values from an array of circular 3D series points.
     *
     * @param {CircularChart3DPoints[]} points - An array of CircularChart3DPoints.
     * @returns {number[]} - An array containing the Y values extracted from the CircularChart3DPoints.
     */
    CircularChart3DSeries.prototype.getYValues = function (points) {
        var values = [];
        var length = points.length;
        for (var i = 0; i < length; i++) {
            values.push(points[i].y);
        }
        return values;
    };
    /**
     * Updates the total bounds to encompass the maximum area covered by the specified bound and the current total bounds.
     *
     * @param {Rect} totalBound - The current total bounds to be updated.
     * @param {Rect} bound - The new bound to compare and update the total bounds.
     * @returns {void}
     * @private
     */
    CircularChart3DSeries.prototype.findMaxBounds = function (totalBound, bound) {
        totalBound.x = bound.x < totalBound.x ? bound.x : totalBound.x;
        totalBound.y = bound.y < totalBound.y ? bound.y : totalBound.y;
        totalBound.height = (bound.y + bound.height) > totalBound.height ? (bound.y + bound.height) : totalBound.height;
        totalBound.width = (bound.x + bound.width) > totalBound.width ? (bound.x + bound.width) : totalBound.width;
    };
    /**
     * Sets the empty point value for null points in the circular 3D chart series.
     *
     * @param {CircularChart3DPoints} point - The data point to be checked and modified.
     * @param {number} index - The index of the data point.
     * @param {Object} data - The data object containing information about the data point.
     * @param {CircularChart3D} chart - The circular 3D chart instance.
     * @returns {void}
     */
    CircularChart3DSeries.prototype.setEmptyPoint = function (point, index, data, chart) {
        if (!(isNullOrUndefined(point.y) || isNaN(point.y))) {
            return null;
        }
        point.color = this.emptyPointSettings.fill || point.color;
        var previous;
        var next;
        switch (this.emptyPointSettings.mode) {
            case 'Zero':
                point.y = 0;
                point.visible = true;
                break;
            case 'Average':
                previous = data[index - 1] ? (data[index - 1][this.yName] || 0) : 0;
                next = data[index + 1] ? (data[index + 1][this.yName] || 0) : 0;
                point.y = (Math.abs(previous) + Math.abs(next)) / 2;
                point.separatorY = chart.intl.formatNumber(point.y, { useGrouping: chart.useGroupingSeparator });
                this.sumOfPoints += point.y;
                point.visible = true;
                break;
            default:
                point.visible = false;
                break;
        }
    };
    __decorate([
        Property('')
    ], CircularChart3DSeries.prototype, "dataSource", void 0);
    __decorate([
        Property()
    ], CircularChart3DSeries.prototype, "query", void 0);
    __decorate([
        Property('')
    ], CircularChart3DSeries.prototype, "xName", void 0);
    __decorate([
        Property('')
    ], CircularChart3DSeries.prototype, "name", void 0);
    __decorate([
        Property('')
    ], CircularChart3DSeries.prototype, "tooltipMappingName", void 0);
    __decorate([
        Property('')
    ], CircularChart3DSeries.prototype, "yName", void 0);
    __decorate([
        Property(true)
    ], CircularChart3DSeries.prototype, "visible", void 0);
    __decorate([
        Complex(null, Animation)
    ], CircularChart3DSeries.prototype, "animation", void 0);
    __decorate([
        Property('SeriesType')
    ], CircularChart3DSeries.prototype, "legendShape", void 0);
    __decorate([
        Property('')
    ], CircularChart3DSeries.prototype, "legendImageUrl", void 0);
    __decorate([
        Property('')
    ], CircularChart3DSeries.prototype, "pointColorMapping", void 0);
    __decorate([
        Complex({}, CircularChart3DDataLabelSettings)
    ], CircularChart3DSeries.prototype, "dataLabel", void 0);
    __decorate([
        Property([])
    ], CircularChart3DSeries.prototype, "palettes", void 0);
    __decorate([
        Property(null)
    ], CircularChart3DSeries.prototype, "radius", void 0);
    __decorate([
        Property('0')
    ], CircularChart3DSeries.prototype, "innerRadius", void 0);
    __decorate([
        Property(true)
    ], CircularChart3DSeries.prototype, "enableTooltip", void 0);
    __decorate([
        Property(false)
    ], CircularChart3DSeries.prototype, "explode", void 0);
    __decorate([
        Property('30%')
    ], CircularChart3DSeries.prototype, "explodeOffset", void 0);
    __decorate([
        Property(false)
    ], CircularChart3DSeries.prototype, "explodeAll", void 0);
    __decorate([
        Property(null)
    ], CircularChart3DSeries.prototype, "explodeIndex", void 0);
    __decorate([
        Complex({ mode: 'Drop' }, CircularChart3DEmptyPointSettings)
    ], CircularChart3DSeries.prototype, "emptyPointSettings", void 0);
    __decorate([
        Property(1)
    ], CircularChart3DSeries.prototype, "opacity", void 0);
    return CircularChart3DSeries;
}(ChildProperty));
export { CircularChart3DSeries };
/**
 * The `PieSeries3D` module is used to render circular 3D `Pie` and `Donut` series.
 */
var PieSeries3D = /** @class */ (function (_super) {
    __extends(PieSeries3D, _super);
    function PieSeries3D() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * To get the module name of the circular 3D chart pie series.
     *
     * @returns {string} - Returns the module name of the Pie series.
     */
    PieSeries3D.prototype.getModuleName = function () {
        return 'PieSeries3D';
    };
    /**
     * Destroys the circular 3D chart series.
     *
     * @returns {void}
     * @private
     */
    PieSeries3D.prototype.destroy = function () {
        /**
         * Calling the destroy method here.
         */
    };
    return PieSeries3D;
}(CircularChart3DSeries));
export { PieSeries3D };
