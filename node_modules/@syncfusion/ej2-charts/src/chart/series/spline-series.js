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
import { getPoint, withInRange, TransformToVisible, animateAddPoints } from '../../common/utils/helper';
import { PathOption } from '@syncfusion/ej2-svg-base';
import { SplineBase } from './spline-base';
/**
 * The `SplineSeries` module is used to render the spline series.
 */
var SplineSeries = /** @class */ (function (_super) {
    __extends(SplineSeries, _super);
    function SplineSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Render the spline series.
     *
     * @param {Series} series - The series to be rendered.
     * @param {Axis} xAxis - The x-axis of the chart.
     * @param {Axis} yAxis - The y-axis of the chart.
     * @param {boolean} isInverted - Specifies whether the chart is inverted.
     * @param {boolean} pointAnimate - Specifies whether the chart is inverted.
     * @param {boolean} pointUpdate - Specifies whether the chart is inverted.
     * @returns {void}
     * @private
     */
    SplineSeries.prototype.render = function (series, xAxis, yAxis, isInverted, pointAnimate, pointUpdate) {
        var firstPoint = null;
        var direction = '';
        var startPoint = 'M';
        var points = [];
        var tempPoints = series.category === 'TrendLine' ? series.points : this.enableComplexProperty(series);
        points = this.filterEmptyPoints(series, tempPoints);
        var previous;
        var getCoordinate = series.chart.chartAreaType === 'PolarRadar' ? TransformToVisible : getPoint;
        for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
            var point = points_1[_i];
            if (point.index === 1) {
                direction = '';
            }
            previous = this.getPreviousIndex(points, point.index - 1, series);
            point.symbolLocations = [];
            point.regions = [];
            if (point.visible) {
                if (withInRange(points[previous], point, points[this.getNextIndex(points, point.index - 1, series)], series)) {
                    if (firstPoint !== null) {
                        direction = this.getSplineDirection(series.drawPoints[previous], firstPoint, point, xAxis, yAxis, isInverted, series, startPoint, getCoordinate, direction);
                        startPoint = 'L';
                    }
                    this.storePointLocation(point, series, isInverted, getCoordinate);
                    if (direction === '' && points.length === 1) {
                        direction = 'M ' + point.symbolLocations[0].x + ' ' + point.symbolLocations[0].y;
                    }
                    if (firstPoint === null && direction !== '' && (point.index === points.length - 1 || (points[point.index + 1] && !points[point.index + 1].visible))) {
                        direction += 'M ' + point.symbolLocations[0].x + ' ' + point.symbolLocations[0].y + ' ';
                    }
                }
                firstPoint = point;
            }
            else {
                startPoint = 'M';
                firstPoint = null;
                point.symbolLocations = [];
            }
        }
        if ((points.length > 0 && series.drawPoints.length > 0) && series.chart.chartAreaType === 'PolarRadar' && series.isClosed) {
            var connectPoints = this.getFirstLastVisiblePoint(points);
            direction = this.getSplineDirection(series.drawPoints[series.drawPoints.length - 1], connectPoints.last, { xValue: connectPoints.first.xValue, yValue: connectPoints.first.yValue }, xAxis, yAxis, isInverted, series, startPoint, getCoordinate, direction);
            startPoint = 'L';
        }
        var name = series.category === 'TrendLine' ? series.chart.element.id + '_Series_' + series.sourceIndex + '_TrendLine_' + series.index :
            series.chart.element.id + '_Series_' + series.index;
        var options = new PathOption(name, 'transparent', series.width, series.interior, series.opacity, series.dashArray, direction);
        this[pointAnimate ? 'addPath' : 'appendLinePath'](options, series, '');
        if (!pointUpdate) {
            this.renderMarker(series);
        }
    };
    /**
     * To find the direct of spline using points.
     *
     * @param {ControlPoints} data data
     * @param {Points} firstPoint firstPoint
     * @param {Points} point point
     * @param {Axis} xAxis xAxis
     * @param {Axis} yAxis yAxis
     * @param {boolean} isInverted isInverted
     * @param {Series} series series
     * @param {string} startPoint startPoint
     * @param {Function} getCoordinate getCoordinate
     * @param {string} direction direction
     * @returns {string} - Returns the direct of spline using points.
     * @private
     */
    SplineSeries.prototype.getSplineDirection = function (data, firstPoint, point, xAxis, yAxis, isInverted, series, startPoint, getCoordinate, direction) {
        var controlPoint1 = data.controlPoint1;
        var controlPoint2 = data.controlPoint2;
        var pt1 = getCoordinate(firstPoint.xValue, firstPoint.yValue, xAxis, yAxis, isInverted, series);
        var pt2 = getCoordinate(point.xValue, point.yValue, xAxis, yAxis, isInverted, series);
        var bpt1 = getCoordinate(controlPoint1.x, controlPoint1.y, xAxis, yAxis, isInverted, series);
        var bpt2 = getCoordinate(controlPoint2.x, controlPoint2.y, xAxis, yAxis, isInverted, series);
        return direction.concat((startPoint + ' ' + (pt1.x) + ' ' + (pt1.y) + ' ' + 'C' + ' ' + (bpt1.x) + ' '
            + (bpt1.y) + ' ' + (bpt2.x) + ' ' + (bpt2.y) + ' ' + (pt2.x) + ' ' + (pt2.y) + ' '));
    };
    SplineSeries.prototype.updateDirection = function (series, point) {
        this.render(series, series.xAxis, series.yAxis, series.chart.requireInvertedAxis, false, true);
        for (var i = 0; i < point.length; i++) {
            if (series.marker && series.marker.visible) {
                series.chart.markerRender.renderMarker(series, series.points[point[i]], series.points[point[i]].symbolLocations[0], null, true);
            }
            if (series.marker.dataLabel.visible && series.chart.dataLabelModule) {
                series.chart.dataLabelModule.commonId = series.chart.element.id + '_Series_' + series.index + '_Point_';
                series.chart.dataLabelModule.renderDataLabel(series, series.points[point[i]], null, series.marker.dataLabel);
            }
        }
    };
    /**
     * Adds a area path to equate the start and end paths.
     *
     * @param {PathOption} options - The options for the path.
     * @param {Series} series - The series to which the path belongs.
     * @param {string} clipRect - The clip rectangle for the path.
     * @param {ChartLocation[]} [firstSymbol] - The location of the first symbol.
     * @returns {void}
     * @private
     */
    SplineSeries.prototype.addPath = function (options, series, clipRect) {
        var points = this.appendPathElement(options, series, clipRect);
        if (points.previousDirection !== '' && options.d !== '') {
            var startPathCommands = points.previousDirection.match(/[MLHVCSQTAZ][^MLHVCSQTAZ]*/g);
            var endPathCommands = (options.d).match(/[MLHVCSQTAZ][^MLHVCSQTAZ]*/g);
            var maxLength = Math.max(startPathCommands.length, endPathCommands.length);
            var minLength = Math.min(startPathCommands.length, endPathCommands.length);
            if (series.removedPointIndex === 0 && startPathCommands.length > endPathCommands.length && startPathCommands[2] && startPathCommands[2].indexOf('M') === 0) {
                startPathCommands.splice(0, startPathCommands.length - endPathCommands.length);
                points.previousDirection = startPathCommands.join('');
            }
            if (startPathCommands.length < endPathCommands.length) {
                for (var i = startPathCommands.length; i < endPathCommands.length; i++) {
                    if (endPathCommands.length !== startPathCommands.length) {
                        if (endPathCommands.length === startPathCommands.length + 1 && endPathCommands[endPathCommands.length - 1].indexOf('M') === 0) {
                            startPathCommands.push(endPathCommands[endPathCommands.length - 1]);
                        }
                        else if (startPathCommands[startPathCommands.length - 1].indexOf('C') === 0) {
                            startPathCommands.push('L ' + ((startPathCommands[startPathCommands.length - 1]).split(' ').slice(-3)).join(' '));
                        }
                        else if (startPathCommands[startPathCommands.length - 1].indexOf('L') === 0) {
                            var points_2 = ((startPathCommands[startPathCommands.length - 1])).split(' ').slice(-3);
                            startPathCommands.push('C ' + points_2.join(' ') + points_2.join(' ') + points_2.join(' '));
                        }
                        else {
                            var points_3 = (startPathCommands[startPathCommands.length - 1]).replace('M', '');
                            startPathCommands.push('C' + points_3 + points_3 + points_3);
                        }
                    }
                }
                animateAddPoints(points.element, options.d, series.chart.redraw, startPathCommands.join(' '), this.chart.duration);
            }
            else if (startPathCommands.length > endPathCommands.length) {
                for (var i = minLength; i < maxLength; i++) {
                    if (series.removedPointIndex === series.points.length && endPathCommands.length !== startPathCommands.length) {
                        if (endPathCommands[endPathCommands.length - 1].indexOf('C') === 0) {
                            endPathCommands.push('L ' + ((endPathCommands[endPathCommands.length - 1]).split(' ').slice(-3)).join(' '));
                        }
                        else if (endPathCommands[endPathCommands.length - 1].indexOf('L') === 0) {
                            var points_4 = ((endPathCommands[endPathCommands.length - 1])).split(' ').slice(-3);
                            endPathCommands.push('C ' + points_4.join(' ') + points_4.join(' ') + points_4.join(' '));
                        }
                        else {
                            var points_5 = (endPathCommands[endPathCommands.length - 1]).replace('M', '');
                            endPathCommands.push('C' + points_5 + points_5 + points_5);
                        }
                    }
                    else {
                        if (endPathCommands.length === 1) {
                            var points_6 = (endPathCommands[endPathCommands.length - 1]).replace('M', '');
                            endPathCommands.push('C' + points_6 + points_6 + points_6);
                        }
                        else if (endPathCommands.length !== startPathCommands.length) {
                            endPathCommands.splice(1, 0, 'C ' + endPathCommands[0].split(' ').slice(-3).join(' ') + endPathCommands[0].split(' ').slice(-3).join(' ') + endPathCommands[0].split(' ').slice(-3).join(' '), endPathCommands[0].replace('M', 'L'));
                        }
                    }
                }
                animateAddPoints(points.element, endPathCommands.join(''), series.chart.redraw, points.previousDirection, this.chart.duration, options.d);
            }
            else {
                animateAddPoints(points.element, options.d, series.chart.redraw, points.previousDirection, this.chart.duration);
            }
        }
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    SplineSeries.prototype.getModuleName = function () {
        /**
         * Returns the module name of the series.
         */
        return 'SplineSeries';
    };
    /**
     * To destroy the spline.
     *
     * @returns {void}
     * @private
     */
    SplineSeries.prototype.destroy = function () {
        /**
         * Destroy method calling here.
         */
    };
    return SplineSeries;
}(SplineBase));
export { SplineSeries };
