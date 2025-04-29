import { withInRange, getPoint, drawSymbol, getElement } from '../../common/utils/helper';
import { markerAnimate, TransformToVisible, appendChildElement } from '../../common/utils/helper';
import { PathOption, Rect, Size } from '@syncfusion/ej2-svg-base';
import { pointRender } from '../../common/model/constants';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
/**
 * The `ScatterSeries` module is used to render the scatter series.
 */
var ScatterSeries = /** @class */ (function () {
    function ScatterSeries() {
    }
    /**
     * Renders the series.
     *
     * @param {Series} series - The series to be rendered.
     * @param {Axis} xAxis - The x-axis of the chart.
     * @param {Axis} yAxis - The y-axis of the chart.
     * @param {boolean} isInverted - Specifies whether the chart is inverted.
     * @returns {void}
     * @private
     */
    ScatterSeries.prototype.render = function (series, xAxis, yAxis, isInverted) {
        // Scatter series DataLabel is not rendered after selecting StackingColumn
        series.isRectSeries = false;
        var marker = series.marker;
        var visiblePoints = this.enableComplexProperty(series);
        var getCoordinate = series.chart.chartAreaType === 'PolarRadar' ? TransformToVisible : getPoint;
        var scatterBorder = {
            width: this.isLineShapeMarker(marker.shape) ? series.width : series.border.width,
            color: this.isLineShapeMarker(marker.shape) ? series.interior : series.border.color
        };
        for (var _i = 0, visiblePoints_1 = visiblePoints; _i < visiblePoints_1.length; _i++) {
            var point = visiblePoints_1[_i];
            this.renderPoint(series, point, isInverted, getCoordinate, scatterBorder, visiblePoints);
        }
    };
    ScatterSeries.prototype.renderPoint = function (series, point, isInverted, getCoordinate, scatterBorder, visiblePoints) {
        var redraw = series.chart.redraw;
        var argsData;
        var startLocation = (redraw && point.symbolLocations) ? point.symbolLocations[0] : null;
        point.symbolLocations = [];
        point.regions = [];
        if (point.visible && withInRange(visiblePoints[point.index - 1], point, visiblePoints[point.index + 1], series)) {
            argsData = {
                cancel: false, name: pointRender, series: series, point: point,
                fill: series.setPointColor(point, series.interior),
                border: series.setBorderColor(point, { width: scatterBorder.width, color: scatterBorder.color }),
                height: series.marker.height, width: series.marker.width, shape: series.marker.shape
            };
            series.chart.trigger(pointRender, argsData);
            if (!argsData.cancel) {
                point.symbolLocations.push(getCoordinate(point.xValue, point.yValue, series.xAxis, series.yAxis, isInverted, series));
                point.color = argsData.fill;
                this.refresh(series, point, argsData, startLocation);
            }
            else {
                point.marker = { visible: true };
            }
        }
    };
    ScatterSeries.prototype.updateDirection = function (series, point, isInverted) {
        var marker = series.marker;
        var visiblePoints = this.enableComplexProperty(series);
        var getCoordinate = series.chart.chartAreaType === 'PolarRadar' ? TransformToVisible : getPoint;
        var scatterBorder = {
            width: this.isLineShapeMarker(marker.shape) ? series.width : series.border.width,
            color: this.isLineShapeMarker(marker.shape) ? series.interior : series.border.color
        };
        for (var i = 0; i < point.length; i++) {
            this.renderPoint(series, series.points[point[i]], isInverted, getCoordinate, scatterBorder, visiblePoints);
            if (series.marker.dataLabel.visible && series.chart.dataLabelModule) {
                series.chart.dataLabelModule.commonId = series.chart.element.id + '_Series_' + series.index + '_Point_';
                series.chart.dataLabelModule.renderDataLabel(series, series.points[point[i]], null, series.marker.dataLabel);
            }
        }
    };
    ScatterSeries.prototype.isLineShapeMarker = function (shape) {
        return shape === 'HorizontalLine' || shape === 'VerticalLine' || shape === 'Cross';
    };
    /**
     * Enables complex properties for the series.
     *
     * @param {Series} series - The series for which complex properties need to be enabled.
     * @returns {Points[]} - Returns the updated points array.
     * @private
     */
    ScatterSeries.prototype.enableComplexProperty = function (series) {
        var tempPoints2 = [];
        var tempPoints = [];
        var yVisibleRange = series.yAxis.visibleRange;
        var xVisibleRange = series.xAxis.visibleRange;
        var areaBounds = series.clipRect;
        var seriesPoints = series.points;
        var yTolerance = Math.abs(yVisibleRange.delta / areaBounds.height);
        var xTolerance = Math.abs(xVisibleRange.delta / areaBounds.width);
        var prevYValue = (seriesPoints[0] && seriesPoints[0].y > yTolerance) ? 0 : yTolerance;
        var prevXValue = (seriesPoints[0] && seriesPoints[0].x > xTolerance) ? 0 : xTolerance;
        var yVal = 0;
        var xVal = 0;
        for (var _i = 0, seriesPoints_1 = seriesPoints; _i < seriesPoints_1.length; _i++) {
            var currentPoint = seriesPoints_1[_i];
            if (!currentPoint.symbolLocations) {
                currentPoint.symbolLocations = [];
            }
            yVal = currentPoint.yValue ? currentPoint.yValue : yVisibleRange.min;
            xVal = currentPoint.xValue ? currentPoint.xValue : xVisibleRange.min;
            if (Math.abs(prevYValue - yVal) >= yTolerance || Math.abs(prevXValue - xVal) >= xTolerance) {
                tempPoints.push(currentPoint);
                prevYValue = yVal;
                prevXValue = xVal;
            }
        }
        var currentTempPoint;
        for (var i = 0; i < tempPoints.length; i++) {
            currentTempPoint = tempPoints[i];
            if (isNullOrUndefined(currentTempPoint.x) || currentTempPoint.x === '') {
                continue;
            }
            else {
                tempPoints2.push(currentTempPoint);
            }
        }
        return tempPoints2;
    };
    /**
     * To append scatter element
     *
     * @param {Series} series series
     * @param {Points} point point
     * @param {IPointRenderEventArgs} argsData argsData
     * @param {ChartLocation} startLocation startLocation
     * @returns {void}
     */
    ScatterSeries.prototype.refresh = function (series, point, argsData, startLocation) {
        var chart = series.chart;
        var circlePath;
        var previousPath;
        var marker = series.marker;
        var imageURL = argsData.point.marker.imageUrl || marker.imageUrl;
        var shapeOption = new PathOption(chart.element.id + '_Series_' + series.index + '_Point_' + point.index, argsData.fill, argsData.border.width, (series.chart.enableCanvas && !argsData.border.color) ? argsData.fill :
            argsData.border.color, series.opacity, series.border.dashArray);
        if (chart.redraw && getElement(shapeOption.id)) {
            circlePath = argsData.shape === 'Circle' ? 'c' : '';
            previousPath = getElement(shapeOption.id).getAttribute('d');
            var scatterElement = getElement(shapeOption.id);
            startLocation = {
                x: +scatterElement.getAttribute(circlePath + 'x'), y: +scatterElement.getAttribute(circlePath + 'y')
            };
        }
        var element = drawSymbol(point.symbolLocations[0], argsData.shape, new Size(argsData.width, argsData.height), imageURL, shapeOption, point.x.toString() + ':' + point.yValue.toString(), series.chart.renderer, series.clipRect);
        appendChildElement(series.chart.enableCanvas, series.seriesElement, element, chart.redraw, true, circlePath + 'x', circlePath + 'y', startLocation, previousPath, false, false, null, chart.duration, true);
        point.regions.push(new Rect(point.symbolLocations[0].x - marker.width, point.symbolLocations[0].y - marker.height, 2 * marker.width, 2 * marker.height));
        point.marker = {
            border: argsData.border, fill: argsData.fill,
            height: argsData.height, visible: true,
            width: argsData.width, shape: argsData.shape, imageUrl: imageURL
        };
    };
    /**
     * Animates the series.
     *
     * @param  {Series} series - Defines the series to animate.
     * @returns {void}
     * @private
     */
    ScatterSeries.prototype.doAnimation = function (series) {
        var duration = series.animation.duration;
        var delay = series.animation.delay;
        var rectElements = series.seriesElement.childNodes;
        var count = 1;
        for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
            var point = _a[_i];
            if (!point.symbolLocations.length || !rectElements[count]) {
                continue;
            }
            markerAnimate(rectElements[count], delay, duration, series, point.index, point.symbolLocations[0], false);
            count++;
        }
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    ScatterSeries.prototype.getModuleName = function () {
        /**
         * Returns the module name of the series.
         */
        return 'ScatterSeries';
    };
    /**
     * To destroy the scatter.
     *
     * @returns {void}
     * @private
     */
    ScatterSeries.prototype.destroy = function () {
        /**
         * Destroy method calling here.
         */
    };
    return ScatterSeries;
}());
export { ScatterSeries };
