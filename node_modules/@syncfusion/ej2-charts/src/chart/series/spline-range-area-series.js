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
import { withInRange, getPoint, animateAddPoints } from '../../common/utils/helper';
import { PathOption, Rect } from '@syncfusion/ej2-svg-base';
import { SplineBase } from './spline-base';
/**
 * The `SplineRangeAreaSeries` module is used to render the spline range area series.
 */
var SplineRangeAreaSeries = /** @class */ (function (_super) {
    __extends(SplineRangeAreaSeries, _super);
    function SplineRangeAreaSeries() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.borderDirection = '';
        return _this;
    }
    /**
     * Render SplineRangeArea Series.
     *
     * @param {Series} series - The series to be rendered.
     * @param {Axis} xAxis - The x-axis of the chart.
     * @param {Axis} yAxis - The y-axis of the chart.
     * @param {boolean} inverted - Specifies whether the chart is inverted.
     * @param {boolean} pointAnimate - Specifies whether the point has to be animated or not.
     * @param {boolean} pointUpdate - Specifies whether the point has to be updated or not.
     * @returns {void}
     * @private
     */
    SplineRangeAreaSeries.prototype.render = function (series, xAxis, yAxis, inverted, pointAnimate, pointUpdate) {
        var point;
        var direction = '';
        var closed = undefined;
        var firstPoint = null;
        var pt;
        var betweenPt1;
        var betweenPt2;
        var highControlPt1;
        var highControlPt2;
        var realPoint = [];
        var points = [];
        var Index = 0;
        var borderWidth = series.border.width ? series.border.width : 0;
        var borderColor = series.border.color ? series.border.color : series.interior;
        var lastPoint = '';
        realPoint = this.filterEmptyPoints(series);
        for (var i = 0; i < realPoint.length; i++) {
            point = realPoint[i];
            if (point.x === null || point.x === '') {
                continue;
            }
            else {
                point.index = Index;
                Index++;
                points.push(point);
            }
        }
        var previous;
        var next;
        var visiblePoint = this.enableComplexProperty(series);
        var length = visiblePoint.length;
        for (var i = 0; i < length; i++) {
            point = visiblePoint[i];
            point.regions = [];
            point.symbolLocations = [];
            next = this.getNextIndex(points, point.index - 1, series);
            previous = this.getPreviousIndex(points, point.index - 1, series);
            var lowPoint = Math.min(point.low, point.high);
            var highPoint = Math.max(point.low, point.high);
            if (yAxis.isAxisInverse) {
                var temp = lowPoint;
                lowPoint = highPoint;
                highPoint = temp;
            }
            var lowPtCoordinate = getPoint(point.xValue, lowPoint, xAxis, yAxis, inverted);
            var highPtCoordinate = getPoint(point.xValue, highPoint, xAxis, yAxis, inverted);
            point.symbolLocations.push(highPtCoordinate);
            point.symbolLocations.push(lowPtCoordinate);
            var rect1 = new Rect(Math.min(lowPtCoordinate.x, highPtCoordinate.x), Math.min(lowPtCoordinate.y, highPtCoordinate.y), Math.max(Math.abs(highPtCoordinate.x - lowPtCoordinate.x), series.marker.width), Math.max(Math.abs(highPtCoordinate.y - lowPtCoordinate.y), series.marker.width));
            if (!inverted) {
                rect1.x -= series.marker.width / 2;
            }
            else {
                rect1.y -= series.marker.width / 2;
            }
            point.regions.push(rect1);
            //Path to connect the high points
            if (point.visible &&
                withInRange(visiblePoint[previous], point, visiblePoint[next], series)) {
                if (firstPoint) {
                    highControlPt1 = series.drawPoints[previous].controlPoint1;
                    highControlPt2 = series.drawPoints[previous].controlPoint2;
                    pt = getPoint(point.xValue, point.high > point.low ? point.high : point.low, xAxis, yAxis, inverted);
                    betweenPt1 = getPoint(highControlPt1.x, highControlPt1.y, xAxis, yAxis, inverted);
                    betweenPt2 = getPoint(highControlPt2.x, highControlPt2.y, xAxis, yAxis, inverted);
                    direction = direction.concat('C ' + betweenPt1.x + ' '
                        + betweenPt1.y + ' ' + betweenPt2.x + ' ' + betweenPt2.y + ' ' + pt.x + ' ' + pt.y + ' ');
                    this.borderDirection += 'C ' + betweenPt1.x + ' '
                        + betweenPt1.y + ' ' + betweenPt2.x + ' ' + betweenPt2.y + ' ' + pt.x + ' ' + pt.y + ' ';
                }
                else {
                    if (yAxis.isAxisInverse) {
                        direction = direction.concat('M ' + (highPtCoordinate.x) + ' ' + (highPtCoordinate.y) + ' ' + 'L ' + (lowPtCoordinate.x) + ' ' + (lowPtCoordinate.y) + ' ');
                        this.borderDirection += 'M ' + (highPtCoordinate.x) + ' ' + (highPtCoordinate.y) + ' ';
                        lastPoint = 'L ' + (lowPtCoordinate.x) + ' ' + (lowPtCoordinate.y);
                    }
                    else {
                        direction = direction.concat('M ' + (lowPtCoordinate.x) + ' ' + (lowPtCoordinate.y) + ' ' + 'L ' + (highPtCoordinate.x) + ' ' + (highPtCoordinate.y) + ' ');
                        this.borderDirection += 'M ' + (highPtCoordinate.x) + ' ' + (highPtCoordinate.y) + ' ';
                        lastPoint = 'L ' + (lowPtCoordinate.x) + ' ' + (lowPtCoordinate.y);
                    }
                    closed = false;
                }
                if ((i + 1 < visiblePoint.length && !visiblePoint[i + 1].visible)
                    || i === visiblePoint.length - 1) {
                    // Path to connect the low points
                    direction = this.closeSplineRangeAreaPath(visiblePoint, point, series, direction, i, xAxis, yAxis, inverted);
                    this.borderDirection += lastPoint;
                    lastPoint = '';
                    direction = direction.concat(' ' + 'Z');
                    closed = true;
                }
                firstPoint = point;
            }
            else {
                if (closed === false && i !== 0) {
                    direction = this.closeSplineRangeAreaPath(visiblePoint, point, series, direction, i, xAxis, yAxis, inverted);
                    closed = true;
                }
                firstPoint = null;
                point.symbolLocations = [];
            }
        }
        var name1 = series.category === 'Indicator' ? series.chart.element.id + '_Indicator_' + series.index + '_' + series.name :
            series.chart.element.id + '_Series_' + series.index;
        var options = new PathOption(name1, series.interior, 0, 'transparent', series.opacity, series.dashArray, direction);
        this[pointAnimate ? 'addPath' : 'appendLinePath'](options, series, '');
        /**
         * To draw border for the path directions of area
         */
        if (series.border.width !== 0) {
            this[pointAnimate ? 'addPath' : 'appendLinePath'](new PathOption(series.chart.element.id + '_Series_border_' + series.index, 'transparent', borderWidth, borderColor, 1, series.border.dashArray, this.borderDirection), series, '');
            this.borderDirection = '';
        }
        if (!pointUpdate) {
            this.renderMarker(series);
        }
    };
    /**
     * path for rendering the low points in SplineRangeArea
     *
     * @returns {void}.
     * @private
     */
    SplineRangeAreaSeries.prototype.closeSplineRangeAreaPath = function (visiblePoint, point, series, direction, i, xAxis, yAxis, inverted) {
        var firstPoint = null;
        var pt;
        var betweenPt1;
        var betweenPt2;
        var lowControlPt1;
        var lowControlPt2;
        for (var j = i; j > 0; j--) {
            if (visiblePoint[j].visible) {
                point = visiblePoint[j];
                var low = Math.min(point.low, point.high);
                var high = Math.max(point.low, point.high);
                if (yAxis.isAxisInverse) {
                    var temp = low;
                    low = high;
                    high = temp;
                }
                var lowPtCoordinate = getPoint(point.xValue, low, xAxis, yAxis, inverted);
                var highPtCoordinate = getPoint(point.xValue, high, xAxis, yAxis, inverted);
                if (firstPoint) {
                    lowControlPt1 = series.lowDrawPoints[j].controlPoint1;
                    lowControlPt2 = series.lowDrawPoints[j].controlPoint2;
                    pt = getPoint(point.xValue, point.low < point.high ? point.low : point.high, xAxis, yAxis, inverted);
                    betweenPt1 = getPoint(lowControlPt1.x, lowControlPt1.y, xAxis, yAxis, inverted);
                    betweenPt2 = getPoint(lowControlPt2.x, lowControlPt2.y, xAxis, yAxis, inverted);
                    if (!isNaN(betweenPt1.y) || !isNaN(betweenPt2.y)) {
                        direction = direction.concat('C ' + betweenPt2.x + ' '
                            + betweenPt2.y + ' ' + betweenPt1.x + ' ' + betweenPt1.y + ' ' + pt.x + ' ' + pt.y + ' ');
                        this.borderDirection += 'C ' + betweenPt2.x + ' '
                            + betweenPt2.y + ' ' + betweenPt1.x + ' ' + betweenPt1.y + ' ' + pt.x + ' ' + pt.y + ' ';
                    }
                }
                else {
                    if (yAxis.isAxisInverse) {
                        direction = direction.concat('L ' + (highPtCoordinate.x) + ' ' + (highPtCoordinate.y) + ' ');
                        this.borderDirection += 'M ' + (highPtCoordinate.x) + ' ' + (highPtCoordinate.y) + ' ';
                    }
                    else {
                        direction = direction.concat('L ' + (lowPtCoordinate.x) + ' ' + (lowPtCoordinate.y) + ' ');
                        this.borderDirection += 'M ' + (lowPtCoordinate.x) + ' ' + (lowPtCoordinate.y) + ' ';
                    }
                }
            }
            else {
                break;
            }
            firstPoint = point;
        }
        return direction;
    };
    /**
     * To animate point for spline range area series.
     *
     * @param {Series} series - Specifies the series.
     * @param {number} point - Specifies the point.
     * @returns {void}
     * @private
     */
    SplineRangeAreaSeries.prototype.updateDirection = function (series, point) {
        this.render(series, series.xAxis, series.yAxis, series.chart.requireInvertedAxis, false, true);
        var _loop_1 = function (i) {
            if (series.marker && series.marker.visible) {
                series.points[i].symbolLocations.map(function (location, index) {
                    series.chart.markerRender.renderMarker(series, series.points[point[i]], location, index, true);
                });
            }
            if (series.marker.dataLabel.visible && series.chart.dataLabelModule) {
                series.chart.dataLabelModule.commonId = series.chart.element.id + '_Series_' + series.index + '_Point_';
                series.chart.dataLabelModule.renderDataLabel(series, series.points[point[i]], null, series.marker.dataLabel);
            }
        };
        for (var i = 0; i < point.length; i++) {
            _loop_1(i);
        }
    };
    /**
     * Adds a area path to equate the start and end paths.
     *
     * @param {PathOption} options - The options for the path.
     * @param {Series} series - The series to which the path belongs.
     * @param {string} clipRect - The clip rectangle for the path.
     * @returns {void}
     * @private
     */
    SplineRangeAreaSeries.prototype.addPath = function (options, series, clipRect) {
        var points = this.appendPathElement(options, series, clipRect);
        if (points.previousDirection !== '' && options.d !== '') {
            var startPathCommands = points.previousDirection.match(/[MLHVCSQTAZ][^MLHVCSQTAZ]*/g);
            var endPathCommands = (options.d).match(/[MLHVCSQTAZ][^MLHVCSQTAZ]*/g);
            var maxLength = Math.max(startPathCommands.length, endPathCommands.length);
            var minLength = Math.min(startPathCommands.length, endPathCommands.length);
            if (startPathCommands.length < endPathCommands.length) {
                for (var i = startPathCommands.length; i < endPathCommands.length; i++) {
                    if (endPathCommands.length !== startPathCommands.length) {
                        startPathCommands.splice(((startPathCommands.length) / 2) + 1, 0, 'C ' + ((startPathCommands[(startPathCommands.length - 1) / 2].split(' ')).slice(5, 7)).join(' ') + ' ' + ((startPathCommands[(startPathCommands.length - 1) / 2].split(' ')).slice(5, 7)).join(' ') + ' ' + ((startPathCommands[(startPathCommands.length - 1) / 2].split(' ')).slice(5, 7)).join(' '));
                        startPathCommands.splice((startPathCommands.length / 2) + 2, 0, 'C ' + (startPathCommands[(startPathCommands.length / 2) + 1].split(' ')).slice(1, 3).join(' ') + ' ' + (startPathCommands[(startPathCommands.length / 2) + 1].split(' ')).slice(1, 3).join(' ') + ' ' + (startPathCommands[(startPathCommands.length / 2) + 1].split(' ')).slice(1, 3).join(' '));
                    }
                }
                animateAddPoints(points.element, options.d, series.chart.redraw, startPathCommands.join(' '), this.chart.duration);
            }
            else if (startPathCommands.length > endPathCommands.length) {
                for (var i = minLength; i < maxLength; i++) {
                    if (endPathCommands.length !== startPathCommands.length) {
                        endPathCommands.splice(2, 0, 'C ' + endPathCommands[1].split(' ').slice(-3).join(' ') + endPathCommands[1].split(' ').slice(-3).join(' ') + endPathCommands[1].split(' ').slice(-3).join(' '));
                        endPathCommands.splice(endPathCommands.length - 1, 0, 'C ' + endPathCommands[endPathCommands.length - 2].split(' ').slice(-4).join(' ') + endPathCommands[endPathCommands.length - 2].split(' ').slice(-4).join(' ') + endPathCommands[endPathCommands.length - 2].split(' ').slice(-4).join(' '));
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
     * Animates the series.
     *
     * @param  {Series} series - Defines the series to animate.
     * @returns {void}
     * @private
     */
    SplineRangeAreaSeries.prototype.doAnimation = function (series) {
        var option = series.animation;
        this.doLinearAnimation(series, option);
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    SplineRangeAreaSeries.prototype.getModuleName = function () {
        /**
         * Returns the module name of the series.
         */
        return 'SplineRangeAreaSeries';
    };
    /**
     * To destroy the line series.
     *
     * @returns {void}
     * @private
     */
    SplineRangeAreaSeries.prototype.destroy = function () {
        /**
         * Destroys range area series.
         */
    };
    return SplineRangeAreaSeries;
}(SplineBase));
export { SplineRangeAreaSeries };
