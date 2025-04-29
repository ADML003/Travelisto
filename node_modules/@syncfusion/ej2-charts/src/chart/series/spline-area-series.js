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
 * The `SplineAreaSeries` module is used to render the spline area series.
 */
var SplineAreaSeries = /** @class */ (function (_super) {
    __extends(SplineAreaSeries, _super);
    function SplineAreaSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Render the splineArea series.
     *
     * @param {Series} series - The series to be rendered.
     * @param {Axis} xAxis - The x-axis of the chart.
     * @param {Axis} yAxis - The y-axis of the chart.
     * @param {boolean} isInverted - Specifies whether the chart is inverted.
     * @param {boolean} pointAnimate - Specifies whether the point has to be animated.
     * @param {boolean} pointUpdate - Specifies whether the point has to be updated.
     * @returns {void}
     * @private
     */
    SplineAreaSeries.prototype.render = function (series, xAxis, yAxis, isInverted, pointAnimate, pointUpdate) {
        var firstPoint = null;
        var direction = '';
        var startPoint = null;
        var startPoint1 = null;
        var pt2;
        var bpt1;
        var bpt2;
        var controlPt1;
        var controlPt2;
        var realPoints = [];
        var points = [];
        var point;
        var pointIndex = 0;
        realPoints = this.filterEmptyPoints(series);
        var emptyPointDirection = '';
        for (var i = 0; i < realPoints.length; i++) {
            point = realPoints[i];
            if (point.x === null || point.x === '') {
                continue;
            }
            else {
                point.index = pointIndex;
                pointIndex++;
                points.push(point);
            }
        }
        var pointsLength = points.length;
        var previous;
        var getCoordinate = series.chart.chartAreaType === 'PolarRadar' ? TransformToVisible : getPoint;
        var origin = series.chart.chartAreaType === 'PolarRadar' ? series.points[0].yValue :
            Math.max(series.yAxis.visibleRange.min, 0);
        for (var i = 0; i < pointsLength; i++) {
            point = points[i];
            point.symbolLocations = [];
            point.regions = [];
            previous = this.getPreviousIndex(points, point.index - 1, series);
            if (point.visible &&
                withInRange(points[previous], point, points[this.getNextIndex(points, point.index - 1, series)], series)) {
                if (firstPoint) {
                    controlPt1 = series.drawPoints[previous].controlPoint1;
                    controlPt2 = series.drawPoints[previous].controlPoint2;
                    pt2 = getCoordinate(point.xValue, point.yValue, xAxis, yAxis, isInverted, series);
                    bpt1 = getCoordinate(controlPt1.x, controlPt1.y, xAxis, yAxis, isInverted, series);
                    bpt2 = getCoordinate(controlPt2.x, controlPt2.y, xAxis, yAxis, isInverted, series);
                    direction = direction.concat('C ' + bpt1.x + ' '
                        + bpt1.y + ' ' + bpt2.x + ' ' + bpt2.y + ' ' + pt2.x + ' ' + pt2.y + ' ');
                }
                else {
                    // Start point for the current path
                    startPoint = getCoordinate(point.xValue, origin, xAxis, yAxis, isInverted, series);
                    direction += ('M ' + startPoint.x + ' ' + startPoint.y + ' ');
                    // First Point to draw the area path
                    startPoint1 = getCoordinate(point.xValue, point.yValue, xAxis, yAxis, isInverted, series);
                    direction += ('L ' + startPoint1.x + ' ' + startPoint1.y + ' ');
                }
                this.storePointLocation(point, series, isInverted, getCoordinate);
                firstPoint = point;
            }
            else {
                firstPoint = null;
                point.symbolLocations = [];
            }
            if (((i + 1 < pointsLength && !points[i + 1].visible) || i === pointsLength - 1)
                && pt2 && startPoint) {
                startPoint = getCoordinate(point.xValue, origin, xAxis, yAxis, isInverted, series);
                direction = direction.concat('L ' + (startPoint.x) + ' ' + (startPoint.y) + ' ');
            }
        }
        this[pointAnimate ? 'addPath' : 'appendLinePath'](new PathOption(series.chart.element.id + '_Series_' + series.index, series.interior, 0, 'transparent', series.opacity, series.dashArray, direction), series, '');
        /**
         * To draw border for the path directions of area
         */
        if (series.border.width !== 0) {
            emptyPointDirection = this.removeEmptyPointsBorder(this.getBorderDirection(direction));
            this[pointAnimate ? 'addPath' : 'appendLinePath'](new PathOption(series.chart.element.id + '_Series_border_' + series.index, 'transparent', series.border.width, series.border.color ? series.border.color : series.interior, 1, series.border.dashArray, emptyPointDirection), series, '');
        }
        if (!pointUpdate) {
            this.renderMarker(series);
        }
    };
    /**
     * To animate point for spline area series.
     *
     * @param {Series} series - Specifies the series.
     * @param {number} point - Specifies the point.
     * @returns {void}
     * @private
     */
    SplineAreaSeries.prototype.updateDirection = function (series, point) {
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
    SplineAreaSeries.prototype.addPath = function (options, series, clipRect) {
        var points = this.appendPathElement(options, series, clipRect);
        if (points.previousDirection !== '' && options.d !== '') {
            if (points.previousDirection.match(/[MLHVCSQTAZ][^MLHVCSQTAZ]*/g).length === 2) {
                points.previousDirection = points.previousDirection.match(/[MLHVCSQTAZ][^MLHVCSQTAZ]*/g)[0] + 'L ' + points.previousDirection.split(' ')[1] + ' ' + points.previousDirection.split(' ')[2]
                    + ' C ' + points.previousDirection.split(' ')[1] + ' ' + points.previousDirection.split(' ')[2] + ' ' + points.previousDirection.split(' ')[1] + ' ' + points.previousDirection.split(' ')[2] + ' ' + points.previousDirection.split(' ')[1] + ' ' + points.previousDirection.split(' ')[2]
                    + ' L ' + points.previousDirection.split(' ')[1] + ' ' + points.previousDirection.split(' ')[2];
            }
            if ((options.d).match(/[MLHVCSQTAZ][^MLHVCSQTAZ]*/g).length === 2) {
                options.d = points.previousDirection.match(/[MLHVCSQTAZ][^MLHVCSQTAZ]*/g)[0] + 'L ' + points.previousDirection.split(' ')[1] + ' ' + points.previousDirection.split(' ')[2]
                    + ' C ' + points.previousDirection.split(' ')[1] + ' ' + points.previousDirection.split(' ')[2] + ' ' + points.previousDirection.split(' ')[1] + ' ' + points.previousDirection.split(' ')[2] + ' ' + points.previousDirection.split(' ')[1] + ' ' + points.previousDirection.split(' ')[2]
                    + ' L ' + points.previousDirection.split(' ')[1] + ' ' + points.previousDirection.split(' ')[2];
            }
            var startPathCommands = points.previousDirection.match(/[MLHVCSQTAZ][^MLHVCSQTAZ]*/g);
            var endPathCommands = (options.d).match(/[MLHVCSQTAZ][^MLHVCSQTAZ]*/g);
            var maxLength = Math.max(startPathCommands.length, endPathCommands.length);
            var minLength = Math.min(startPathCommands.length, endPathCommands.length);
            if (startPathCommands.length < endPathCommands.length) {
                for (var i = startPathCommands.length; i < endPathCommands.length; i++) {
                    if (endPathCommands.length !== startPathCommands.length) {
                        var lastPointBeforeCurve = void 0;
                        if ((startPathCommands[startPathCommands.length - 1]).split(' ').length === 4 && options.id.indexOf('border') !== -1) {
                            lastPointBeforeCurve = startPathCommands[startPathCommands.length - (options.id.indexOf('border') !== -1 ? 1 : 2)].split(' ').slice(1).join(' ');
                        }
                        else {
                            lastPointBeforeCurve = startPathCommands[startPathCommands.length - (options.id.indexOf('border') !== -1 ? 1 : 2)].split(' ').slice(5).join(' ');
                        }
                        var curveCommand = 'C ' + lastPointBeforeCurve + lastPointBeforeCurve + lastPointBeforeCurve;
                        if (options.id.indexOf('border') !== -1) {
                            startPathCommands.push(curveCommand);
                        }
                        else {
                            startPathCommands.splice(startPathCommands.length - 1, 0, curveCommand);
                        }
                    }
                }
                animateAddPoints(points.element, options.d, series.chart.redraw, startPathCommands.join(' '), this.chart.duration);
            }
            else if (startPathCommands.length > endPathCommands.length) {
                for (var i = minLength; i < maxLength; i++) {
                    if (endPathCommands.length !== startPathCommands.length) {
                        var firstPointBeforeCurve = void 0;
                        if (series.removedPointIndex === series.points.length) {
                            if ((startPathCommands[startPathCommands.length - 1]).split(' ').length === 4 && options.id.indexOf('border') !== -1) {
                                firstPointBeforeCurve = endPathCommands[endPathCommands.length - (options.id.indexOf('border') !== -1 ? 1 : 2)].split(' ').slice(1).join(' ');
                            }
                            else {
                                firstPointBeforeCurve = endPathCommands[endPathCommands.length - (options.id.indexOf('border') !== -1 ? 1 : 2)].split(' ').slice(5).join(' ');
                            }
                            var curveCommand = 'C ' + firstPointBeforeCurve + firstPointBeforeCurve + firstPointBeforeCurve;
                            if (options.id.indexOf('border') !== -1) {
                                endPathCommands.push(curveCommand);
                            }
                            else {
                                endPathCommands.splice(endPathCommands.length - 1, 0, curveCommand);
                            }
                        }
                        else {
                            if ((startPathCommands[startPathCommands.length - 1]).split(' ').length === 4) {
                                firstPointBeforeCurve = 'C ' + endPathCommands[options.id.indexOf('border') !== -1 ? 0 : 1].split(' ').slice(-3).join(' ') + endPathCommands[options.id.indexOf('border') !== -1 ? 0 : 1].split(' ').slice(1).join(' ') + endPathCommands[options.id.indexOf('border') !== -1 ? 0 : 1].split(' ').slice(1).join(' ');
                            }
                            else {
                                firstPointBeforeCurve = 'C ' + endPathCommands[options.id.indexOf('border') !== -1 ? 0 : 1].split(' ').slice(-3).join(' ') + endPathCommands[options.id.indexOf('border') !== -1 ? 0 : 1].split(' ').slice(-3).join(' ') + endPathCommands[options.id.indexOf('border') !== -1 ? 0 : 1].split(' ').slice(-3).join(' ');
                            }
                            endPathCommands.splice((options.id.indexOf('border') !== -1 ? 1 : 2), 0, firstPointBeforeCurve);
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
    SplineAreaSeries.prototype.getModuleName = function () {
        /**
         * Returns the module name of the series.
         */
        return 'SplineAreaSeries';
    };
    /**
     * To destroy the spline.
     *
     * @returns {void}
     * @private
     */
    SplineAreaSeries.prototype.destroy = function () {
        /**
         * Destroy method calling here.
         */
    };
    return SplineAreaSeries;
}(SplineBase));
export { SplineAreaSeries };
