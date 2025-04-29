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
import { PathOption, Rect } from '@syncfusion/ej2-svg-base';
import { LineBase } from './line-base';
/**
 * The `StackingAreaSeries` module is used to render the stacking area series.
 */
var StackingAreaSeries = /** @class */ (function (_super) {
    __extends(StackingAreaSeries, _super);
    function StackingAreaSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Render the Stacking area series.
     *
     * @param {Series} series - The series to be rendered.
     * @param {Axis} xAxis - The x-axis of the chart.
     * @param {Axis} yAxis - The y-axis of the chart.
     * @param {boolean} isInverted - Specifies whether the chart is inverted.
     * @param {boolean} pointAnimate - Specifies whether the point has to be animated or not.
     * @param {boolean} pointUpdate - Specifies whether the point has to be updated or not.
     * @returns {void}
     * @private
     */
    StackingAreaSeries.prototype.render = function (series, xAxis, yAxis, isInverted, pointAnimate, pointUpdate) {
        var polarAreaType = series.chart.chartAreaType === 'PolarRadar';
        var getCoordinate = polarAreaType ? TransformToVisible : getPoint;
        var lineDirection = '';
        var visiblePoints = this.enableComplexProperty(series);
        var pointsLength = visiblePoints.length;
        var stackedvalue = series.stackedValues;
        var pointIndex;
        var nextPointIndex;
        var origin = polarAreaType ?
            Math.max(series.yAxis.visibleRange.min, stackedvalue.endValues[0]) :
            Math.max(series.yAxis.visibleRange.min, stackedvalue.startValues[0]);
        var startPoint = 0;
        var point1;
        var point2;
        var emptyPointDirection = '';
        if (pointsLength > 0) {
            point1 = getCoordinate(visiblePoints[0].xValue, origin, xAxis, yAxis, isInverted, series);
            lineDirection = lineDirection.concat('M' + ' ' + (point1.x) + ' ' + (point1.y) + ' ');
        }
        var isPolar = (series.chart && series.chart.chartAreaType === 'PolarRadar');
        var index;
        for (var i = series.index; i >= 0; i--) {
            if (series.chart.visibleSeries[i].visible) {
                index = series.chart.visibleSeries[i].index;
                break;
            }
        }
        for (var i = 0; i < pointsLength; i++) {
            pointIndex = visiblePoints[i].index;
            visiblePoints[i].symbolLocations = [];
            visiblePoints[i].regions = [];
            if (visiblePoints[i].visible && withInRange(visiblePoints[i - 1], visiblePoints[i], visiblePoints[i + 1], series)) {
                var startvalue = series.index > 0 && index !== undefined ?
                    this.chart.visibleSeries[index].stackedValues.endValues[pointIndex] :
                    stackedvalue.startValues[pointIndex];
                point1 = getCoordinate(visiblePoints[i].xValue, (!series.visible && series.isLegendClicked) ? startvalue :
                    stackedvalue.endValues[pointIndex], xAxis, yAxis, isInverted, series);
                lineDirection = lineDirection.concat('L' + ' ' + (point1.x) + ' ' + (point1.y) + ' ');
                visiblePoints[i].symbolLocations.push(getCoordinate(visiblePoints[i].xValue, stackedvalue.endValues[pointIndex], xAxis, yAxis, isInverted, series));
                visiblePoints[i].regions.push(new Rect(visiblePoints[i].symbolLocations[0].x - series.marker.width, visiblePoints[i].symbolLocations[0].y - series.marker.height, 2 * series.marker.width, 2 * series.marker.height));
            }
            else {
                if (!isPolar && series.emptyPointSettings.mode !== 'Drop') {
                    for (var j = i - 1; j >= startPoint; j--) {
                        pointIndex = visiblePoints[j].index;
                        point2 = getCoordinate(visiblePoints[j].xValue, stackedvalue.startValues[pointIndex], xAxis, yAxis, isInverted, series);
                        lineDirection = lineDirection.concat('L' + ' ' + (point2.x) + ' ' + (point2.y) + ' ');
                    }
                    if (visiblePoints[i + 1] && (visiblePoints[i + 1].visible &&
                        (!isPolar || (isPolar && this.withinYRange(visiblePoints[i + 1], yAxis))))) {
                        nextPointIndex = visiblePoints[i + 1].index;
                        point1 = getCoordinate(visiblePoints[i + 1].xValue, stackedvalue.startValues[nextPointIndex], xAxis, yAxis, isInverted, series);
                        lineDirection = lineDirection.concat('M' + ' ' + (point1.x) + ' ' + (point1.y) + ' ');
                    }
                    startPoint = i + 1;
                }
            }
        }
        if (series.chart.chartAreaType === 'PolarRadar' && visiblePoints.length > 1) {
            var connectPoints = this.getFirstLastVisiblePoint(series.points);
            var chart = this.chart;
            point1 = { 'x': connectPoints.first.xValue, 'y': stackedvalue.endValues[connectPoints.first.index] };
            point2 = getCoordinate(point1.x, point1.y, xAxis, yAxis, isInverted, series);
            lineDirection += ('L' + ' ' + (point2.x) + ' ' + (point2.y) + ' ');
            if (this.chart.visible === 1 && (xAxis.isAxisInverse || yAxis.isAxisInverse)) {
                this.chart.enableAnimation = false;
                lineDirection = (series.type === 'Polar' ? chart.polarSeriesModule.getPolarIsInversedPath(xAxis, lineDirection) :
                    chart.radarSeriesModule.getRadarIsInversedPath(xAxis, lineDirection));
            }
        }
        if (!isPolar || (isPolar && series.index !== this.getFirstSeriesIndex(series.chart.visibleSeries))) {
            for (var j = pointsLength - 1; j >= startPoint; j--) {
                pointIndex = visiblePoints[j].index;
                if (isPolar && !visiblePoints[j].visible) {
                    continue;
                }
                var previousSeries = this.getPreviousSeries(series);
                if (previousSeries.emptyPointSettings.mode !== 'Drop' || !previousSeries.points[j].isEmpty) {
                    point2 = getCoordinate(visiblePoints[j].xValue, (!series.visible && series.isLegendClicked && series.index > 0
                        && index !== undefined) ? this.chart.visibleSeries[index].stackedValues.endValues[pointIndex]
                        : stackedvalue.startValues[pointIndex], xAxis, yAxis, isInverted, series);
                    if (stackedvalue.startValues[pointIndex] === stackedvalue.endValues[pointIndex]) {
                        point2.y = Math.floor(point2.y);
                    }
                    lineDirection = lineDirection.concat(((j === (pointsLength - 1) && polarAreaType) ? 'M' : 'L')
                        + ' ' + (point2.x) + ' ' + (point2.y) + ' ');
                }
            }
        }
        var options = new PathOption(series.chart.element.id + '_Series_' + series.index, series.interior, 0, 'transparent', series.opacity, series.dashArray, lineDirection);
        this[pointAnimate ? 'addAreaPath' : 'appendLinePath'](options, series, '');
        /**
         * To draw border for the path directions of area
         */
        if (series.border.width !== 0 && series.visible) {
            emptyPointDirection = this.removeEmptyPointsBorder(this.getBorderDirection(lineDirection));
            var options_1 = new PathOption(series.chart.element.id + '_Series_border_' + series.index, 'transparent', series.visible ? series.border.width : 0, series.border.color ? series.border.color : series.interior, 1, series.border.dashArray, emptyPointDirection);
            this[pointAnimate ? 'addAreaPath' : 'appendLinePath'](options_1, series, '');
        }
        if (!pointUpdate && series.visible) {
            this.renderMarker(series);
        }
    };
    /**
     * To animate point for stacking area series.
     *
     * @param {Series} series - Specifies the series.
     * @param {number} point - Specifies the point.
     * @returns {void}
     * @private
     */
    StackingAreaSeries.prototype.updateDirection = function (series, point) {
        for (var i = 0; i < series.xAxis.series.length; i++) {
            var stackSeries = series.xAxis.series[i];
            this.render(stackSeries, stackSeries.xAxis, stackSeries.yAxis, stackSeries.chart.requireInvertedAxis, false, true);
            for (var j = 0; j < point.length; j++) {
                if (stackSeries.marker && stackSeries.marker.visible) {
                    stackSeries.chart.markerRender.renderMarker(stackSeries, stackSeries.points[point[j]], stackSeries.points[point[j]].symbolLocations[0], null, true);
                }
                if (stackSeries.marker.dataLabel.visible && stackSeries.chart.dataLabelModule) {
                    stackSeries.chart.dataLabelModule.commonId = stackSeries.chart.element.id + '_Series_' + stackSeries.index + '_Point_';
                    stackSeries.chart.dataLabelModule.
                        renderDataLabel(stackSeries, stackSeries.points[point[j]], null, stackSeries.marker.dataLabel);
                }
            }
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
    StackingAreaSeries.prototype.addAreaPath = function (options, series, clipRect) {
        var points = this.appendPathElement(options, series, clipRect);
        if (points.previousDirection !== '' && options.d !== '') {
            var startPathCommands = points.previousDirection.match(/[MLHVCSQTAZ][^MLHVCSQTAZ]*/g);
            var endPathCommands = (options.d).match(/[MLHVCSQTAZ][^MLHVCSQTAZ]*/g);
            var maxLength = Math.max(startPathCommands.length, endPathCommands.length);
            var minLength = Math.min(startPathCommands.length, endPathCommands.length);
            if (startPathCommands.length < endPathCommands.length) {
                for (var i = startPathCommands.length; i < endPathCommands.length; i++) {
                    if (endPathCommands.length !== startPathCommands.length) {
                        startPathCommands.splice((startPathCommands.length + 1) / 2, 0, startPathCommands.slice((startPathCommands.length - 1) / 2)[0], startPathCommands.slice((startPathCommands.length - 1) / 2)[1]);
                    }
                }
                animateAddPoints(points.element, options.d, series.chart.redraw, startPathCommands.join(' '), this.chart.duration);
            }
            else if (startPathCommands.length > endPathCommands.length) {
                for (var i = minLength; i < maxLength; i++) {
                    if (endPathCommands.length !== startPathCommands.length) {
                        endPathCommands.splice(1, 0, endPathCommands[1]);
                        endPathCommands.splice(endPathCommands.length - 1, 0, endPathCommands[endPathCommands.length - 1]);
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
    StackingAreaSeries.prototype.doAnimation = function (series) {
        var option = series.animation;
        this.doLinearAnimation(series, option);
    };
    /**
     * To destroy the stacking area.
     *
     * @returns {void}
     * @private
     */
    StackingAreaSeries.prototype.destroy = function () {
        /**
         * Destroy method calling here.
         */
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    StackingAreaSeries.prototype.getModuleName = function () {
        /**
         * Returns the module name of the series.
         */
        return 'StackingAreaSeries';
    };
    /**
     * Retrieves the previous series from the provided series.
     *
     * @param {Series} series - The current series.
     * @returns {Series} - The previous series.
     */
    StackingAreaSeries.prototype.getPreviousSeries = function (series) {
        var seriesCollection = series.chart.visibleSeries;
        for (var i = 0, length_1 = seriesCollection.length; i < length_1; i++) {
            if (series.index === seriesCollection[i].index && i !== 0) {
                return seriesCollection[i - 1];
            }
        }
        return seriesCollection[0];
    };
    /**
     * To find the first visible series index.
     *
     * @param {Series[]} seriesCollection - The first visible series index.
     * @returns {number} - Returns the first visible series index.
     */
    StackingAreaSeries.prototype.getFirstSeriesIndex = function (seriesCollection) {
        for (var _i = 0, seriesCollection_1 = seriesCollection; _i < seriesCollection_1.length; _i++) {
            var series = seriesCollection_1[_i];
            if (series.visible) {
                return series.index;
            }
        }
        return 0;
    };
    return StackingAreaSeries;
}(LineBase));
export { StackingAreaSeries };
