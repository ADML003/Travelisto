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
import { withInRange, logBase, markerAnimate, PolarArc, firstToLowerCase } from '../../common/utils/helper';
import { valueToCoefficient, CoefficientToVector, valueToPolarCoefficient } from '../../common/utils/helper';
import { PathOption } from '@syncfusion/ej2-svg-base';
import { PolarRadarPanel } from '../axis/polar-radar-panel';
import { pointRender } from '../../common/model/constants';
import { Animation, isNullOrUndefined } from '@syncfusion/ej2-base';
/**
 * The `PolarSeries` module is used to render the polar series.
 */
var PolarSeries = /** @class */ (function (_super) {
    __extends(PolarSeries, _super);
    function PolarSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Renders the provided polar series on the chart based on the given x-axis, y-axis, and inversion status.
     *
     * @param {Series} series - The series to render.
     * @param {Axis} xAxis - The x-axis of the chart.
     * @param {Axis} yAxis - The y-axis of the chart.
     * @param {boolean} inverted - A flag indicating whether the chart is inverted or not.
     * @returns {void}
     * @private
     */
    PolarSeries.prototype.render = function (series, xAxis, yAxis, inverted) {
        var seriesType = firstToLowerCase(series.drawType);
        var yAxisMin = yAxis.minimum;
        var yAxisMax = yAxis.maximum;
        for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
            var visiblePoint = _a[_i];
            visiblePoint.visible = visiblePoint.visible && !((!isNullOrUndefined(yAxisMin) && visiblePoint.yValue < yAxisMin) ||
                (!isNullOrUndefined(yAxisMax) && visiblePoint.yValue > yAxisMax));
        }
        if (series.points.length) {
            if ((series.drawType.indexOf('Column') > -1)) {
                this.columnDrawTypeRender(series, xAxis, yAxis);
            }
            else {
                series.chart[seriesType + 'SeriesModule'].render(series, xAxis, yAxis, inverted);
            }
        }
    };
    /**
     * Renders the column draw type for the provided series based on the given x-axis and y-axis.
     *
     * @param {Series} series - The series for which the column draw type should be rendered.
     * @param {Axis} xAxis - The x-axis of the chart.
     * @param {Axis} yAxis - The y-axis of the chart.
     * @returns {void}
     * @private
     */
    PolarSeries.prototype.columnDrawTypeRender = function (series, xAxis, yAxis) {
        var options;
        var argsData;
        var startAngle;
        var endAngle;
        var itemCurrentXPos;
        var radius;
        var inversedValue;
        var pointStartAngle;
        var pointEndAngle;
        var x1;
        var x2;
        var y1;
        var y2;
        var startValue;
        var endValue;
        var innerRadius;
        var min = xAxis.actualRange.min;
        var centerX = (series.clipRect.width / 2) + series.clipRect.x;
        var dStartX;
        var dStartY;
        var centerY = (series.clipRect.height / 2) + series.clipRect.y;
        var dEndX;
        var dEndY;
        var isRangeColumn = series.drawType === 'RangeColumn';
        var isPolar = series.type === 'Polar';
        var isLogAxis = yAxis.valueType === 'Logarithmic';
        var isStacking = series.drawType === 'StackingColumn';
        var direction = '';
        var sumofYValues = 0;
        var arcValue;
        var interval = (series.points[1] ? series.points[1].xValue : 2 * series.points[0].xValue) - series.points[0].xValue;
        var isInverse = xAxis.isAxisInverse;
        //customer issue ID-I249730, Polar columnSeries in OnTicks with inversed axis
        var ticks = (xAxis.valueType === 'Category' && xAxis.labelPlacement === 'BetweenTicks') ? 0 :
            isInverse ? -interval / 2 : interval / 2;
        var rangeInterval = xAxis.valueType === 'DateTime' ? xAxis.dateTimeInterval : 1;
        this.getSeriesPosition(series);
        var position = isInverse ? (series.rectCount - 1 - series.position) : series.position;
        do {
            sumofYValues += rangeInterval;
            min += rangeInterval;
        } while (min <= xAxis.actualRange.max - (xAxis.valueType === 'Category' ? 0 : 1));
        for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
            var point = _a[_i];
            point.symbolLocations = [];
            point.regions = [];
            if (point.visible && withInRange(series.points[point.index - 1], point, series.points[point.index + 1], series)) {
                inversedValue = isInverse ? (xAxis.visibleRange.max - point.xValue) : point.xValue - xAxis.visibleRange.min;
                itemCurrentXPos = (inversedValue) +
                    ((interval / series.rectCount) * position - ticks) + (sumofYValues / 360 * xAxis.startAngle);
                itemCurrentXPos = (((itemCurrentXPos) / (sumofYValues)));
                startAngle = 2 * Math.PI * (itemCurrentXPos + xAxis.startAngle);
                endAngle = 2 * Math.PI * ((itemCurrentXPos + xAxis.startAngle) + (interval / series.rectCount) / (sumofYValues));
                if (startAngle === 0 && endAngle === 0) {
                    endAngle = 2 * Math.PI;
                    arcValue = '1';
                }
                else {
                    arcValue = '0';
                }
                pointStartAngle = startAngle;
                pointEndAngle = endAngle;
                startAngle = (startAngle - 0.5 * Math.PI) + (series.columnSpacing / 2);
                endAngle = ((endAngle - 0.5 * Math.PI) - 0.000001) - (series.columnSpacing / 2);
                if (isStacking || isRangeColumn) {
                    startValue = isRangeColumn ? point.low : series.stackedValues.startValues[point.index];
                    endValue = isRangeColumn ? point.high : series.stackedValues.endValues[point.index];
                    endValue = (isLogAxis ? logBase(endValue === 0 ? 1 : endValue, yAxis.logBase) : endValue);
                    endValue = endValue > yAxis.actualRange.max ? yAxis.actualRange.max : endValue;
                }
                else {
                    startValue = yAxis.visibleRange.min;
                    endValue = point.yValue > yAxis.actualRange.max ? yAxis.actualRange.max : point.yValue;
                }
                radius = startValue === endValue ? 0 : series.chart.radius * valueToCoefficient(endValue, yAxis);
                x1 = centerX + radius * Math.cos(startAngle);
                x2 = centerX + radius * Math.cos(endAngle);
                y1 = centerY + radius * Math.sin(startAngle);
                y2 = centerY + radius * Math.sin(endAngle);
                innerRadius = series.chart.radius * valueToCoefficient((startValue === 0 && yAxis.visibleRange.min !== 0) ? yAxis.visibleRange.min : startValue, yAxis);
                dStartX = centerX + innerRadius * Math.cos(startAngle);
                dStartY = centerY + innerRadius * Math.sin(startAngle);
                dEndX = centerX + innerRadius * Math.cos(endAngle);
                dEndY = centerY + innerRadius * Math.sin(endAngle);
                if (isPolar) {
                    direction = ('M' + ' ' + x1 + ' ' + y1 + ' ' + 'A' + ' ' + radius + ' ' + radius + ' ' + '0' + ' '
                        + arcValue + ' ' + 1 + ' ' + x2 + ' ' + y2 + ' ' + 'L' + ' ' + dEndX + ' ' + dEndY + ' ' +
                        'A' + ' ' + innerRadius + ' ' + innerRadius + ' ' + '1' + ' ' + '0' + ' ' + '0' + ' '
                        + dStartX + ' ' + dStartY + ' ' + 'Z');
                }
                else {
                    direction = ('M' + ' ' + x1 + ' ' + y1 + ' ' + 'L' + ' ' + x2 + ' ' + y2 + ' ' + 'L '
                        + dEndX + ' ' + dEndY + ' ' + 'L' + ' ' + dStartX + ' ' + dStartY + ' ' + 'Z');
                }
                point.regionData = new PolarArc(pointStartAngle, pointEndAngle, innerRadius, radius, itemCurrentXPos);
                argsData = this.triggerEvent(series.chart, series, point);
                options = new PathOption(series.chart.element.id + '_Series_' + series.index + '_Point_' + point.index, argsData.fill, argsData.border.width, argsData.border.color, series.opacity, series.dashArray, direction);
                if (!argsData.cancel) {
                    this.appendLinePath(options, series, '');
                    if (isPolar) {
                        point.symbolLocations.push({
                            x: centerX + radius * Math.cos((startAngle + (endAngle - startAngle) / 2)),
                            y: centerY + radius * Math.sin((startAngle + (endAngle - startAngle) / 2))
                        });
                        if (isRangeColumn) {
                            point.symbolLocations.push({
                                x: centerX + innerRadius * Math.cos((startAngle + (endAngle - startAngle) / 2)),
                                y: centerY + innerRadius * Math.sin((startAngle + (endAngle - startAngle) / 2))
                            });
                        }
                    }
                    else {
                        point.symbolLocations.push({ x: (x1 + x2) / 2, y: (y1 + y2) / 2 });
                        if (isRangeColumn) {
                            point.symbolLocations.push({ x: (dEndX + dStartX) / 2, y: (dEndY + dStartY) / 2 });
                        }
                    }
                }
            }
        }
        this.renderMarker(series);
        series.isRectSeries = true;
    };
    /**
     * Triggers the point render event for the provided chart, series, and point.
     *
     * @param {Chart} chart - The chart instance.
     * @param {Series} series - The series to which the point belongs.
     * @param {Points} point - The point for which the event should be triggered.
     * @returns {IPointRenderEventArgs} - The point render event arguments.
     * @private
     */
    PolarSeries.prototype.triggerEvent = function (chart, series, point) {
        var argsData = {
            cancel: false, name: pointRender, series: series, point: point,
            fill: series.setPointColor(point, series.interior),
            border: series.setBorderColor(point, { width: series.border.width, color: series.border.color })
        };
        chart.trigger(pointRender, argsData);
        point.color = argsData.fill;
        return argsData;
    };
    /**
     * Gets the position of the series.
     *
     * @param {Series} series - The series for which to get the position.
     * @returns {void}
     * @private
     */
    PolarSeries.prototype.getSeriesPosition = function (series) {
        var chart = series.chart;
        var seriesCollection = [];
        var stackingGroup = [];
        var vSeries = { rectCount: 0, position: null };
        for (var _i = 0, _a = chart.visibleSeries; _i < _a.length; _i++) {
            var series_1 = _a[_i];
            if (series_1.visible && (series_1.type === 'Polar' || series_1.type === 'Radar') && series_1.drawType.indexOf('Column') !== -1) {
                seriesCollection.push(series_1);
            }
        }
        for (var i = 0; i < seriesCollection.length; i++) {
            var series_2 = seriesCollection[i];
            if (series_2.drawType.indexOf('Stacking') !== -1) {
                if (series_2.stackingGroup) {
                    if (stackingGroup[series_2.stackingGroup] === undefined) {
                        series_2.position = vSeries.rectCount;
                        stackingGroup[series_2.stackingGroup] = vSeries.rectCount++;
                    }
                    else {
                        series_2.position = stackingGroup[series_2.stackingGroup];
                    }
                }
                else {
                    if (vSeries.position === null) {
                        series_2.position = vSeries.rectCount;
                        vSeries.position = vSeries.rectCount++;
                    }
                    else {
                        series_2.position = vSeries.position;
                    }
                }
            }
            else {
                series_2.position = vSeries.rectCount++;
            }
        }
        for (var i = 0; i < seriesCollection.length; i++) {
            var value = seriesCollection[i];
            value.rectCount = vSeries.rectCount;
        }
    };
    /**
     * Animates the series.
     *
     * @param  {Series} series - Defines the series to animate.
     * @returns {void}
     * @private
     */
    PolarSeries.prototype.doAnimation = function (series) {
        var duration = series.animation.duration;
        var delay = series.animation.delay;
        var rectElements = series.seriesElement.childNodes;
        var count = 1;
        if (series.drawType === 'Scatter') {
            for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
                var point = _a[_i];
                if (!point.symbolLocations.length || !rectElements[count]) {
                    continue;
                }
                markerAnimate(rectElements[count], delay, duration, series, point.index, point.symbolLocations[0], false);
                count++;
            }
        }
        else {
            for (count = 1; count < rectElements.length; count++) {
                this.doPolarRadarAnimation(rectElements[count], delay, duration, series);
            }
        }
    };
    /**
     * Performs animation for polar/radar series.
     *
     * @param {Element} animateElement - The element to animate.
     * @param {number} delay - The delay for animation.
     * @param {number} duration - The duration of animation.
     * @param {Series} series - The series for which to perform animation.
     * @returns {void}
     * @private
     */
    PolarSeries.prototype.doPolarRadarAnimation = function (animateElement, delay, duration, series) {
        var chartcenterX = series.clipRect.width / 2 + series.clipRect.x;
        var chartcenterY = series.clipRect.height / 2 + series.clipRect.y;
        var elementHeight = 0;
        animateElement.style.visibility = 'hidden';
        new Animation({}).animate(animateElement, {
            duration: duration,
            delay: delay,
            progress: function (args) {
                if (args.timeStamp > args.delay) {
                    args.element.style.visibility = 'visible';
                    elementHeight = ((args.timeStamp - args.delay) / args.duration);
                    animateElement.setAttribute('transform', 'translate(' + chartcenterX
                        + ' ' + chartcenterY + ') scale(' + elementHeight + ') translate(' + (-chartcenterX) + ' ' + (-chartcenterY) + ')');
                }
            },
            end: function () {
                var annotations = document.getElementById(series.chart.element.id + '_Annotation_Collections');
                if (annotations) {
                    annotations.style.visibility = 'visible';
                }
                animateElement.style.visibility = 'visible';
                animateElement.removeAttribute('transform');
                series.chart.trigger('animationComplete', { series: series.chart.isBlazor ? {} : series });
            }
        });
    };
    // path calculation for isInversed polar area series
    PolarSeries.prototype.getPolarIsInversedPath = function (xAxis, endPoint) {
        // let vector: ChartLocation;
        // let x1: number;
        // let y1: number;
        var chart = this.chart;
        var radius = chart.radius;
        var direction = endPoint;
        var circleRotate = xAxis.isAxisInverse ? '1 1 ' : '1 0 ';
        var vector = CoefficientToVector(valueToPolarCoefficient(xAxis.visibleLabels[0].value, xAxis), this.startAngle);
        var x1 = this.centerX + radius * vector.x;
        var y1 = this.centerY + radius * vector.y;
        return direction += 'L ' + x1 + ' ' + y1 + ' A ' + radius + ' ' + radius + ' 0 ' + circleRotate +
            x1 + ' ' + (this.centerY + radius) + ' A ' + radius + ' ' + radius + ' 0 ' + circleRotate + x1 + ' ' + y1 + ' ';
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    PolarSeries.prototype.getModuleName = function () {
        /**
         * Returns the module name of the series.
         */
        return 'PolarSeries';
    };
    /**
     * To destroy the polar series.
     *
     * @returns {void}
     * @private
     */
    PolarSeries.prototype.destroy = function () {
        /**
         * Destroy method performed here.
         */
    };
    return PolarSeries;
}(PolarRadarPanel));
export { PolarSeries };
