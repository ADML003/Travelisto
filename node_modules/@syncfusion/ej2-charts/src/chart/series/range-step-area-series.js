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
import { getPoint, withInRange, ChartLocation, animateAddPoints } from '../../common/utils/helper';
import { PathOption, Rect } from '@syncfusion/ej2-svg-base';
import { LineBase } from './line-base';
/**
 * The `RangeStepAreaSeries` module is used to render the range step area series.
 */
var RangeStepAreaSeries = /** @class */ (function (_super) {
    __extends(RangeStepAreaSeries, _super);
    function RangeStepAreaSeries() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.borderDirection = '';
        _this.prevPoint = null;
        return _this;
    }
    /**
     * Renders the Range Step Area series on the chart.
     *
     * @param {Series} series - The series to be rendered.
     * @param {Axis} xAxis - The x-axis associated with the series.
     * @param {Axis} yAxis - The y-axis associated with the series.
     * @param {boolean} isInverted - Specifies whether the series is inverted.
     * @param {boolean} pointAnimate - Specifies whether to animate the series point.
     * @param {boolean} pointUpdate - Specifies whether to update the previous point.
     * @returns {void}
     * @private
     */
    RangeStepAreaSeries.prototype.render = function (series, xAxis, yAxis, isInverted, pointAnimate, pointUpdate) {
        this.prevPoint = null;
        var point;
        var currentPoint;
        var secondPoint;
        var start = null;
        var direction = '';
        var lineLength = 0;
        var command = 'M';
        var closed = undefined;
        var low;
        var high;
        var borderWidth = series.border.width ? series.border.width : 0;
        var borderColor = series.border.color ? series.border.color : series.interior;
        var origin = Math.max(series.yAxis.visibleRange.min, 0);
        var visiblePoints = this.enableComplexProperty(series);
        if (xAxis.valueType === 'Category' && xAxis.labelPlacement === 'BetweenTicks') {
            lineLength = 0.5;
        }
        for (var i = 0, length_1 = visiblePoints.length; i < length_1; i++) {
            point = visiblePoints[i];
            point.symbolLocations = [];
            point.regions = [];
            low = Math.min(point.low, point.high);
            high = Math.max(point.low, point.high);
            if (yAxis.isAxisInverse) {
                var temp = low;
                low = high;
                high = temp;
            }
            var lowPoint = getPoint(point.xValue, low, xAxis, yAxis, isInverted);
            var highPoint = getPoint(point.xValue, high, xAxis, yAxis, isInverted);
            point.symbolLocations.push(highPoint);
            point.symbolLocations.push(lowPoint);
            var rect = new Rect(Math.min(lowPoint.x, highPoint.x), Math.min(lowPoint.y, highPoint.y), Math.max(Math.abs(highPoint.x - lowPoint.x), series.marker.width), Math.max(Math.abs(highPoint.y - lowPoint.y), series.marker.width));
            point.regions.push(rect);
            //Path to connect the high points.
            if (point.visible && withInRange(visiblePoints[point.index - 1], point, visiblePoints[point.index + 1], series)) {
                if (start === null) {
                    start = new ChartLocation(point.xValue, 0);
                    // Start point for the current path.
                    currentPoint = getPoint(point.xValue - lineLength, origin, xAxis, yAxis, isInverted);
                    direction += (command + ' ' + (currentPoint.x) + ' ' + (currentPoint.y) + ' ');
                    currentPoint = getPoint(point.xValue - lineLength, point.high > point.low ? point.high
                        : point.low, xAxis, yAxis, isInverted);
                    direction += ('L' + ' ' + (currentPoint.x) + ' ' + (currentPoint.y) + ' ');
                    this.borderDirection += (command + ' ' + (currentPoint.x) + ' ' + (currentPoint.y) + ' ');
                }
                // First Point to draw the RangeStepArea path.
                if (this.prevPoint != null) {
                    currentPoint = getPoint(point.xValue, point.high > point.low ? point.high
                        : point.low, xAxis, yAxis, isInverted);
                    secondPoint = getPoint(this.prevPoint.xValue, this.prevPoint.high > this.prevPoint.low ? this.prevPoint.high
                        : this.prevPoint.low, xAxis, yAxis, isInverted);
                    direction += (this.GetStepLineDirection(currentPoint, secondPoint, series.step, command, series, false));
                    this.borderDirection += (this.GetStepLineDirection(currentPoint, secondPoint, series.step, command, series, true));
                }
                else if (series.emptyPointSettings.mode === 'Gap') {
                    currentPoint = getPoint(point.xValue, point.high > point.low ? point.high
                        : point.low, xAxis, yAxis, isInverted);
                    direction += command + ' ' + (currentPoint.x) + ' ' + (currentPoint.y) + ' ';
                    this.borderDirection += command + ' ' + (currentPoint.x) + ' ' + (currentPoint.y) + ' ';
                }
                closed = false;
                command = ' L';
                this.prevPoint = point;
                if ((i + 1 < visiblePoints.length && !visiblePoints[i + 1].visible)
                    || i === visiblePoints.length - 1) {
                    // Path to connect the low points.
                    direction = this.closeRangeStepAreaPath(visiblePoints, point, series, direction, i, xAxis, yAxis, isInverted);
                    command = 'M';
                    direction = direction.concat(' ' + 'Z ');
                    closed = true;
                    this.prevPoint = null;
                    start = null;
                }
            }
            else {
                if (closed === false && i !== 0) {
                    direction = this.closeRangeStepAreaPath(visiblePoints, point, series, direction, i, xAxis, yAxis, isInverted);
                    closed = true;
                }
                command = 'M';
                point.symbolLocations = [];
            }
        }
        var options = new PathOption(series.chart.element.id + '_Series_' + series.index, series.interior, 0, 'transparent', series.opacity, series.dashArray, direction);
        this[pointAnimate ? 'addPath' : 'appendLinePath'](options, series, '');
        /**
         * To draw border for the range step area chart.
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
     * Calculating path direction for rendering the low points.
     *
     * @param {Points[]} visiblePoints - The visible data points.
     * @param {Points} point - The current data point.
     * @param {Series} series - The series to which the data point belongs.
     * @param {string} direction - The direction of the series.
     * @param {number} i - The index of the current data point.
     * @param {Axis} xAxis - The x-axis associated with the series.
     * @param {Axis} yAxis - The y-axis associated with the series.
     * @param {boolean} isInverted - Specifies whether the series is inverted.
     * @returns {string} - Returns the path direction for low direction.
     * @private
     */
    RangeStepAreaSeries.prototype.closeRangeStepAreaPath = function (visiblePoints, point, series, direction, i, xAxis, yAxis, isInverted) {
        var currentPoint;
        var secondPoint;
        var low;
        var high;
        for (var j = i; j >= 0; j--) {
            if (visiblePoints[j].visible) {
                point = visiblePoints[j];
                low = Math.min(point.low, point.high);
                high = Math.max(point.low, point.high);
                if (yAxis.isAxisInverse) {
                    var temp = low;
                    low = high;
                    high = temp;
                }
                // Lowpoint for RangeStepArea path.
                if (this.prevPoint != null) {
                    currentPoint = getPoint(point.xValue, point.low < point.high ? point.low
                        : point.high, xAxis, yAxis, isInverted);
                    secondPoint = getPoint(this.prevPoint.xValue, this.prevPoint.low < this.prevPoint.high ? this.prevPoint.low
                        : this.prevPoint.high, xAxis, yAxis, isInverted);
                    direction += (this.GetStepLineDirection(currentPoint, secondPoint, series.step === 'Right' ? 'Left' : (series.step === 'Left' ? 'Right' : series.step), 'L', series, false));
                    if (j === i) {
                        this.borderDirection += (this.GetStepLineDirection(currentPoint, secondPoint, series.step === 'Right' ? 'Left' : (series.step === 'Left' ? 'Right' : series.step), 'M', series, true));
                    }
                    else {
                        this.borderDirection += (this.GetStepLineDirection(currentPoint, secondPoint, series.step === 'Right' ? 'Left' : (series.step === 'Left' ? 'Right' : series.step), 'L', series, true));
                    }
                }
            }
            else {
                break;
            }
            this.prevPoint = point;
        }
        return direction;
    };
    /**
     * To animate point for range step area series.
     *
     * @param {Series} series - Specifies the series.
     * @param {number} point - Specifies the point.
     * @returns {void}
     * @private
     */
    RangeStepAreaSeries.prototype.updateDirection = function (series, point) {
        this.render(series, series.xAxis, series.yAxis, series.chart.requireInvertedAxis, false, true);
        var _loop_1 = function (i) {
            if (series.marker && series.marker.visible) {
                series.points[point[i]].symbolLocations.map(function (location, index) {
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
    RangeStepAreaSeries.prototype.addPath = function (options, series, clipRect) {
        var points = this.appendPathElement(options, series, clipRect);
        if (points.previousDirection !== '' && options.d !== '') {
            var startPathCommands = points.previousDirection.match(/[MLHVCSQTAZ][^MLHVCSQTAZ]*/g);
            var endPathCommands = (options.d).match(/[MLHVCSQTAZ][^MLHVCSQTAZ]*/g);
            var maxLength = Math.max(startPathCommands.length, endPathCommands.length);
            var minLength = Math.min(startPathCommands.length, endPathCommands.length);
            if (startPathCommands.length < endPathCommands.length) {
                for (var i = startPathCommands.length; i < endPathCommands.length; i++) {
                    if (endPathCommands.length !== startPathCommands.length) {
                        startPathCommands.splice((Math.floor((startPathCommands.length / 2)) - 1), 0, startPathCommands[Math.floor((startPathCommands.length / 2)) - 1], startPathCommands[Math.floor((startPathCommands.length / 2)) - 1]);
                        startPathCommands.splice((Math.floor((startPathCommands.length / 2)) + 2), 0, startPathCommands[Math.floor((startPathCommands.length / 2)) + 2], startPathCommands[Math.floor((startPathCommands.length / 2)) + 2]);
                    }
                }
                animateAddPoints(points.element, options.d, series.chart.redraw, startPathCommands.join(' '), this.chart.duration);
            }
            else if (startPathCommands.length > endPathCommands.length) {
                for (var i = minLength; i < maxLength; i++) {
                    if (endPathCommands.length !== startPathCommands.length) {
                        endPathCommands.splice(2, 0, endPathCommands[2]);
                        endPathCommands.splice(endPathCommands.length - 3, 0, endPathCommands[endPathCommands.length - 3]);
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
    RangeStepAreaSeries.prototype.doAnimation = function (series) {
        var option = series.animation;
        this.doLinearAnimation(series, option);
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    RangeStepAreaSeries.prototype.getModuleName = function () {
        /**
         * Returns the module name of the series.
         */
        return 'RangeStepAreaSeries';
    };
    /**
     * To destroy the range step area series.
     *
     * @returns {void}
     * @private
     */
    RangeStepAreaSeries.prototype.destroy = function () {
        /**
         * Destroys range step area series.
         */
    };
    return RangeStepAreaSeries;
}(LineBase));
export { RangeStepAreaSeries };
