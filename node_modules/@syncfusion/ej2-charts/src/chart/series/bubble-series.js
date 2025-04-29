import { withInRange, getPoint, drawSymbol, getElement } from '../../common/utils/helper';
import { Size, PathOption, Rect } from '@syncfusion/ej2-svg-base';
import { markerAnimate, appendChildElement, animateRedrawElement } from '../../common/utils/helper';
import { pointRender } from '../../common/model/constants';
/**
 * The `BubbleSeries` module is used to render the bubble series.
 */
var BubbleSeries = /** @class */ (function () {
    function BubbleSeries() {
    }
    /**
     * Render the Bubble series.
     *
     * @param {Series} series - The series to be rendered.
     * @param {Axis} xAxis - The X-axis associated with the series.
     * @param {Axis} yAxis - The Y-axis associated with the series.
     * @param {boolean} isInverted - Indicates whether the chart is inverted or not.
     * @returns {void}
     * @private
     */
    BubbleSeries.prototype.render = function (series, xAxis, yAxis, isInverted) {
        var visiblePoints = series.points;
        var radius;
        var value = Math.max(series.chart.initialClipRect.height, series.chart.initialClipRect.width);
        var percentChange = value / 100;
        var maxRadius = series.maxRadius * percentChange;
        var minRadius = series.minRadius * percentChange;
        var maximumSize = null;
        var maxValue = null;
        if ((series.maxRadius === null || series.minRadius === null)) {
            for (var _i = 0, _a = series.chart.visibleSeries; _i < _a.length; _i++) {
                var value_1 = _a[_i];
                if (value_1.type === 'Bubble' && value_1.visible === true && (value_1.maxRadius === null || value_1.minRadius === null)) {
                    maximumSize = value_1.sizeMax > maximumSize ? value_1.sizeMax : maximumSize;
                }
            }
            maxValue = (value / 5) / 2;
            minRadius = maxRadius = 1;
            radius = maxValue * maxRadius;
        }
        else {
            maximumSize = series.sizeMax;
            radius = maxRadius - minRadius;
        }
        for (var _b = 0, visiblePoints_1 = visiblePoints; _b < visiblePoints_1.length; _b++) {
            var bubblePoint = visiblePoints_1[_b];
            this.renderPoint(series, bubblePoint, isInverted, radius, maximumSize, minRadius, visiblePoints);
        }
    };
    BubbleSeries.prototype.renderPoint = function (series, bubblePoint, isInverted, radius, maximumSize, minRadius, visiblePoints, pointUpdate) {
        var startLocation = series.chart.redraw && bubblePoint.symbolLocations ? bubblePoint.symbolLocations[0] : null;
        bubblePoint.symbolLocations = [];
        bubblePoint.regions = [];
        var segmentRadius;
        if (bubblePoint.visible &&
            withInRange(visiblePoints[bubblePoint.index - 1], bubblePoint, visiblePoints[bubblePoint.index + 1], series)) {
            if ((series.maxRadius === null || series.minRadius === null)) {
                segmentRadius = radius * Math.abs(+bubblePoint.size / maximumSize);
            }
            else {
                segmentRadius = minRadius + radius * Math.abs(+bubblePoint.size / maximumSize);
            }
            segmentRadius = segmentRadius || minRadius;
            var argsData = {
                cancel: false, name: pointRender, series: series, point: bubblePoint,
                fill: series.setPointColor(bubblePoint, series.interior),
                border: series.setBorderColor(bubblePoint, { width: series.border.width, color: series.border.color }),
                height: 2 * segmentRadius, width: 2 * segmentRadius
            };
            series.chart.trigger(pointRender, argsData);
            if (!argsData.cancel) {
                bubblePoint.symbolLocations.push(getPoint(bubblePoint.xValue, bubblePoint.yValue, series.xAxis, series.yAxis, isInverted));
                bubblePoint.color = argsData.fill;
                var shapeOption = new PathOption(series.chart.element.id + '_Series_' + series.index + '_Point_' + bubblePoint.index, argsData.fill, argsData.border.width, argsData.border.color, series.opacity, series.border.dashArray);
                if (pointUpdate && getElement(shapeOption.id)) {
                    var markerElement = getElement(shapeOption.id);
                    startLocation = {
                        x: +markerElement.getAttribute('cx'), y: +markerElement.getAttribute('cy')
                    };
                }
                var element = drawSymbol(bubblePoint.symbolLocations[0], 'Circle', new Size(argsData.width, argsData.height), series.marker.imageUrl, shapeOption, bubblePoint.x.toString() + ':' + bubblePoint.yValue.toString(), series.chart.svgRenderer, series.clipRect);
                appendChildElement(series.chart.enableCanvas, series.seriesElement, element, series.chart.redraw, true, 'cx', 'cy', startLocation, null, false, false, null, series.chart.duration, true);
                bubblePoint.regions.push(new Rect(bubblePoint.symbolLocations[0].x - segmentRadius, bubblePoint.symbolLocations[0].y - segmentRadius, 2 * segmentRadius, 2 * segmentRadius));
                bubblePoint.marker = {
                    border: argsData.border, fill: argsData.fill,
                    height: argsData.height, visible: true,
                    shape: 'Circle', width: argsData.width
                };
                if (series.chart.enableCanvas) {
                    series.chart.markerRender.render(series);
                }
                startLocation = series.chart.redraw && !startLocation ? bubblePoint.symbolLocations[0] : startLocation;
                if (series.chart.redraw) {
                    animateRedrawElement(element, series.chart.duration ? series.chart.duration : 300, startLocation, bubblePoint.symbolLocations[0], 'cx', 'cy');
                }
            }
            else {
                bubblePoint.marker = { visible: false };
            }
        }
    };
    BubbleSeries.prototype.updateDirection = function (series, point, isInverted) {
        var visiblePoints = series.points;
        var radius;
        var value = Math.max(series.chart.initialClipRect.height, series.chart.initialClipRect.width);
        var percentChange = value / 100;
        var maxRadius = series.maxRadius * percentChange;
        var minRadius = series.minRadius * percentChange;
        var maximumSize = null;
        var maxValue = null;
        if ((series.maxRadius === null || series.minRadius === null)) {
            for (var _i = 0, _a = series.chart.visibleSeries; _i < _a.length; _i++) {
                var value_2 = _a[_i];
                if (value_2.type === 'Bubble' && value_2.visible === true && (value_2.maxRadius === null || value_2.minRadius === null)) {
                    maximumSize = value_2.sizeMax > maximumSize ? value_2.sizeMax : maximumSize;
                }
            }
            maxValue = (value / 5) / 2;
            minRadius = maxRadius = 1;
            radius = maxValue * maxRadius;
        }
        else {
            maximumSize = series.sizeMax;
            radius = maxRadius - minRadius;
        }
        for (var i = 0; i < point.length; i++) {
            this.renderPoint(series, series.points[point[i]], isInverted, radius, maximumSize, minRadius, visiblePoints, true);
            if (series.marker.dataLabel.visible && series.chart.dataLabelModule) {
                series.chart.dataLabelModule.commonId = series.chart.element.id + '_Series_' + series.index + '_Point_';
                series.chart.dataLabelModule.renderDataLabel(series, series.points[point[i]], null, series.marker.dataLabel);
            }
        }
    };
    /**
     * To destroy the Bubble.
     *
     * @returns {void}
     * @private
     */
    BubbleSeries.prototype.destroy = function () {
        /**
         * Destroy method calling here.
         */
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    BubbleSeries.prototype.getModuleName = function () {
        /**
         * Returns the module name of the series.
         */
        return 'BubbleSeries';
    };
    /**
     * Animates the series.
     *
     * @param  {Series} series - Defines the series to animate.
     * @returns {void}
     * @private
     */
    BubbleSeries.prototype.doAnimation = function (series) {
        var duration = series.animation.duration;
        var delay = series.animation.delay;
        var rectElements = series.seriesElement.childNodes;
        var count = 1;
        for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
            var bubblePoint = _a[_i];
            if (!bubblePoint.symbolLocations.length) {
                continue;
            }
            markerAnimate(rectElements[count], delay, duration, series, bubblePoint.index, bubblePoint.symbolLocations[0], false);
            count++;
        }
    };
    return BubbleSeries;
}());
export { BubbleSeries };
