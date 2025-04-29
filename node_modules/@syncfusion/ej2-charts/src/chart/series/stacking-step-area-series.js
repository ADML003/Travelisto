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
import { ChartLocation, animateAddPoints, getPoint, withInRange } from '../../common/utils/helper';
import { PathOption, Rect } from '@syncfusion/ej2-svg-base';
import { LineBase } from './line-base';
/**
 * The `StackingStepAreaSeries` module is used to render the stacking step area series.
 */
var StackingStepAreaSeries = /** @class */ (function (_super) {
    __extends(StackingStepAreaSeries, _super);
    function StackingStepAreaSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Render the Stacking Step Area series.
     *
     * @param {Series} stackSeries - The series to be rendered.
     * @param {Axis} xAxis - The x-axis of the chart.
     * @param {Axis} yAxis - The y-axis of the chart.
     * @param {boolean} isInverted - Specifies whether the chart is inverted.
     * @param {boolean} pointAnimate - Specifies whether the point has to be animated or not.
     * @param {boolean} pointUpdate - Specifies whether the point has to be updated or not.
     * @returns {void}
     * @private
     */
    StackingStepAreaSeries.prototype.render = function (stackSeries, xAxis, yAxis, isInverted, pointAnimate, pointUpdate) {
        var currentPointLocation;
        var secondPoint;
        var start = null;
        var direction = '';
        var borderDirection = '';
        var stackedvalue = stackSeries.stackedValues;
        var visiblePoint = this.enableComplexProperty(stackSeries);
        var origin = Math.max(stackSeries.yAxis.visibleRange.min, stackedvalue.startValues[0]);
        var pointsLength = visiblePoint.length;
        var options;
        var point;
        var point2;
        var point3;
        var xValue;
        var lineLength;
        var prevPoint = null;
        var validIndex;
        var startPoint = 0;
        var pointIndex;
        if (xAxis.valueType === 'Category' && xAxis.labelPlacement === 'BetweenTicks') {
            lineLength = 0.5;
        }
        else {
            lineLength = 0;
        }
        for (var i = 0; i < pointsLength; i++) {
            point = visiblePoint[i];
            xValue = point.xValue;
            point.symbolLocations = [];
            point.regions = [];
            pointIndex = point.index;
            if (point.visible && withInRange(visiblePoint[i - 1], point, visiblePoint[i + 1], stackSeries)) {
                if (start === null) {
                    start = new ChartLocation(xValue, 0);
                    currentPointLocation = getPoint(xValue - lineLength, origin, xAxis, yAxis, isInverted);
                    direction += ('M' + ' ' + (currentPointLocation.x) + ' ' + (currentPointLocation.y) + ' ');
                    currentPointLocation = getPoint(xValue - lineLength, stackedvalue.endValues[pointIndex], xAxis, yAxis, isInverted);
                    direction += ('L' + ' ' + (currentPointLocation.x) + ' ' + (currentPointLocation.y) + ' ');
                    borderDirection += ('M' + ' ' + (currentPointLocation.x) + ' ' + (currentPointLocation.y) + ' ');
                }
                if (prevPoint != null) {
                    currentPointLocation = getPoint(point.xValue, stackedvalue.endValues[pointIndex], xAxis, yAxis, isInverted);
                    secondPoint = getPoint(prevPoint.xValue, stackedvalue.endValues[prevPoint.index], xAxis, yAxis, isInverted);
                    direction += (this.GetStepLineDirection(currentPointLocation, secondPoint, stackSeries.step, 'L', stackSeries, false));
                    borderDirection += (this.GetStepLineDirection(currentPointLocation, secondPoint, stackSeries.step, 'L', stackSeries, true));
                }
                else if (stackSeries.emptyPointSettings.mode === 'Gap') {
                    currentPointLocation = getPoint(point.xValue, stackedvalue.endValues[pointIndex], xAxis, yAxis, isInverted);
                    direction += 'L' + ' ' + (currentPointLocation.x) + ' ' + (currentPointLocation.y) + ' ';
                    borderDirection += 'L' + ' ' + (currentPointLocation.x) + ' ' + (currentPointLocation.y) + ' ';
                }
                visiblePoint[i].symbolLocations.push(getPoint(visiblePoint[i].xValue, stackedvalue.endValues[pointIndex], xAxis, yAxis, isInverted));
                visiblePoint[i].regions.push(new Rect(visiblePoint[i].symbolLocations[0].x - stackSeries.marker.width, visiblePoint[i].symbolLocations[0].y - stackSeries.marker.height, 2 * stackSeries.marker.width, 2 * stackSeries.marker.height));
                prevPoint = point;
            }
            // If we set the empty point mode is Gap or next point of the current point is false, we will close the series path.
            if (visiblePoint[i + 1] && (!visiblePoint[i + 1].visible && start !== null) && stackSeries.emptyPointSettings.mode !== 'Drop') {
                var previousPointIndex = void 0;
                for (var j = i; j >= startPoint; j--) {
                    pointIndex = visiblePoint[j].index;
                    previousPointIndex = j === 0 ? 0 : visiblePoint[j - 1].index;
                    currentPointLocation = getPoint(visiblePoint[pointIndex].xValue, stackedvalue.startValues[pointIndex], xAxis, yAxis, isInverted);
                    if (j !== 0 && (stackedvalue.startValues[pointIndex] <
                        stackedvalue.startValues[previousPointIndex] ||
                        stackedvalue.startValues[pointIndex] > stackedvalue.startValues[previousPointIndex])) {
                        direction = direction.concat('L' + ' ' + (currentPointLocation.x) + ' ' + (currentPointLocation.y) + ' ');
                        secondPoint = getPoint(visiblePoint[previousPointIndex].xValue, stackedvalue.startValues[previousPointIndex], xAxis, yAxis, isInverted);
                    }
                    else {
                        secondPoint = getPoint(visiblePoint[pointIndex].xValue, stackedvalue.startValues[pointIndex], xAxis, yAxis, isInverted);
                    }
                    if (visiblePoint[previousPointIndex].visible) {
                        direction = direction.concat(this.GetStepLineDirection(secondPoint, currentPointLocation, this.prevStep, 'L', stackSeries));
                    }
                }
                startPoint = i + 2;
                start = null;
                prevPoint = null;
            }
        }
        if (direction !== '') {
            // For category axis
            if (pointsLength > 1) {
                pointIndex = visiblePoint[pointsLength - 1].index;
                start = { 'x': visiblePoint[pointsLength - 1].xValue + lineLength, 'y': stackedvalue.endValues[pointIndex] };
                secondPoint = getPoint(start.x, start.y, xAxis, yAxis, isInverted);
                direction += ('L' + ' ' + (secondPoint.x) + ' ' + (secondPoint.y) + ' ');
                borderDirection += ('L' + ' ' + (secondPoint.x) + ' ' + (secondPoint.y) + ' ');
                start = { 'x': visiblePoint[pointsLength - 1].xValue + lineLength, 'y': stackedvalue.startValues[pointIndex] };
                secondPoint = getPoint(start.x, start.y, xAxis, yAxis, isInverted);
                direction += ('L' + ' ' + (secondPoint.x) + ' ' + (secondPoint.y) + ' ');
            }
            // To close the stacked step area series path in reverse order
            for (var j = pointsLength - 1; j >= startPoint; j--) {
                var index = void 0;
                if (visiblePoint[j].visible) {
                    pointIndex = visiblePoint[j].index;
                    point2 = getPoint(visiblePoint[j].xValue, stackedvalue.startValues[pointIndex], xAxis, yAxis, isInverted);
                    direction = direction.concat('L' + ' ' + (point2.x) + ' ' + (point2.y) + ' ');
                }
                if (j !== 0 && !visiblePoint[j - 1].visible) {
                    index = this.getNextVisiblePointIndex(visiblePoint, j);
                }
                if (j !== 0) {
                    validIndex = index ? index : j - 1;
                    pointIndex = index ? visiblePoint[index].index : visiblePoint[j - 1].index;
                    point3 = getPoint(visiblePoint[validIndex].xValue, stackedvalue.startValues[pointIndex], xAxis, yAxis, isInverted);
                    if (!(j !== 0 && !visiblePoint[j - 1].visible)) {
                        direction = direction.concat(this.GetStepLineDirection(point3, point2, this.prevStep, 'L', stackSeries));
                    }
                }
            }
            this.prevStep = stackSeries.step === 'Right' ? 'Left' : stackSeries.step === 'Left' ? 'Right' : stackSeries.step;
            options = new PathOption(stackSeries.chart.element.id + '_Series_' + stackSeries.index, stackSeries.interior, 0, 'transparent', stackSeries.opacity, stackSeries.dashArray, direction);
            this[pointAnimate ? 'addPath' : 'appendLinePath'](options, stackSeries, '');
            /**
             * To draw border for the path directions of area
             */
            if (stackSeries.border.width !== 0) {
                options = new PathOption(stackSeries.chart.element.id + '_Series_border_' + stackSeries.index, 'transparent', stackSeries.border.width, stackSeries.border.color ? stackSeries.border.color : stackSeries.interior, 1, stackSeries.border.dashArray, borderDirection);
                this[pointAnimate ? 'addPath' : 'appendLinePath'](options, stackSeries, '');
            }
            if (!pointUpdate) {
                this.renderMarker(stackSeries);
            }
        }
    };
    /**
     * To animate point for stacking step area series.
     *
     * @param {Series} series - Specifies the series.
     * @param {number} point - Specifies the point.
     * @returns {void}
     * @private
     */
    StackingStepAreaSeries.prototype.updateDirection = function (series, point) {
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
    StackingStepAreaSeries.prototype.addPath = function (options, series, clipRect) {
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
                        startPathCommands.splice((Math.floor((startPathCommands.length / 2)) + 2), 0, startPathCommands[Math.floor((startPathCommands.length / 2)) + 2], startPathCommands[Math.floor((startPathCommands.length / 2)) + 2], startPathCommands[Math.floor((startPathCommands.length / 2)) + 2]);
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
    StackingStepAreaSeries.prototype.doAnimation = function (series) {
        var option = series.animation;
        this.doLinearAnimation(series, option);
    };
    /**
     * To destroy the stacking step area.
     *
     * @returns {void}
     * @private
     */
    StackingStepAreaSeries.prototype.destroy = function () {
        /**
         * Destroy method calling here.
         */
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    StackingStepAreaSeries.prototype.getModuleName = function () {
        /**
         * Returns the module name of the series.
         */
        return 'StackingStepAreaSeries';
    };
    /**
     * To get the nearest visible point.
     *
     * @param {Points[]} points points
     * @param {number} j index
     * @returns {number} - Returns the nearest visible point.
     */
    StackingStepAreaSeries.prototype.getNextVisiblePointIndex = function (points, j) {
        var index;
        for (index = j - 1; index >= 0; index--) {
            if (!points[index].visible) {
                continue;
            }
            else {
                return index;
            }
        }
        return 0;
    };
    return StackingStepAreaSeries;
}(LineBase));
export { StackingStepAreaSeries };
