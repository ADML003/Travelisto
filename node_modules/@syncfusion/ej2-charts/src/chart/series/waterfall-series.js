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
import { withInRange } from '../../common/utils/helper';
import { PathOption } from '@syncfusion/ej2-svg-base';
import { subArraySum, getElement, appendChildElement, redrawElement } from '../../common/utils/helper';
import { ColumnBase } from './column-base';
import { animationMode, isNullOrUndefined } from '@syncfusion/ej2-base';
/**
 * The `WaterfallSeries` module is used to render the waterfall series.
 */
var WaterfallSeries = /** @class */ (function (_super) {
    __extends(WaterfallSeries, _super);
    function WaterfallSeries() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Store the cumulative values of each index.
         *
         * @private
         */
        _this.cumulativeSums = [];
        return _this;
    }
    /**
     * Render waterfall series.
     *
     * @returns {void}
     * @private
     */
    WaterfallSeries.prototype.render = function (series) {
        var rect;
        var sideBySideInfo = this.getSideBySideInfo(series);
        var origin = Math.max(series.yAxis.visibleRange.min, 0);
        var argsData;
        var prevEndValue = 0;
        var direction = '';
        var currentEndValue = 0;
        var originValue;
        var prevRegion = null;
        var y;
        var isInversed = series.chart.requireInvertedAxis;
        var intermediateOrigin = 0;
        var redraw = series.chart.redraw;
        for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
            var point = _a[_i];
            point.symbolLocations = [];
            point.regions = [];
            if (point.visible && withInRange(series.points[point.index - 1], point, series.points[point.index + 1], series)) {
                //Calcute the current point value to render waterfall series.
                var isSum = this.isIntermediateSum(series, point.index);
                var totalSum = this.isSumIndex(series, point.index);
                currentEndValue += isSum || totalSum === true ? 0 : point.yValue;
                //Calcute the origin value for points
                originValue = (isSum === true ? intermediateOrigin : ((prevEndValue !== null && !totalSum) ? prevEndValue : origin));
                rect = this.getRectangle(point.xValue + sideBySideInfo.start, currentEndValue, point.xValue + sideBySideInfo.end, originValue, series);
                argsData = this.triggerPointRenderEvent(series, point);
                //intermediateOrigin is used only for imtermediate data
                if (isSum) {
                    intermediateOrigin = currentEndValue;
                }
                prevEndValue = currentEndValue;
                if (!argsData.cancel) {
                    this.updateSymbolLocation(point, rect, series);
                    this.drawRectangle(series, point, rect, argsData);
                }
                var currentRegion = point.regions[0];
                if (prevRegion !== null) {
                    var prevLeft = isInversed ? prevRegion.x : prevRegion.y;
                    var currentLeft = isInversed ? currentRegion.x : currentRegion.y;
                    var prevBottom = void 0;
                    var currentBottom = void 0;
                    var currentYValue = currentRegion.y;
                    var currentXValue = currentRegion.x;
                    var beforePoint = series.points[(point.index - 1 === -1) ? 1 : point.index - 1];
                    if (point.yValue === 0) {
                        prevBottom = isInversed ? prevRegion.x + prevRegion.width : prevRegion.y + prevRegion.height;
                        currentBottom = isInversed ?
                            point.symbolLocations[0].x : point.symbolLocations[0].y;
                    }
                    else {
                        prevBottom = isInversed ? (beforePoint.yValue === 0) ?
                            beforePoint.symbolLocations[0].x : prevRegion.x + prevRegion.width : (beforePoint.yValue === 0) ?
                            beforePoint.symbolLocations[0].y : prevRegion.y + prevRegion.height;
                        currentBottom = isInversed ?
                            currentRegion.x + currentRegion.width : currentRegion.y + currentRegion.height;
                    }
                    if (Math.round(prevLeft) === Math.round(currentLeft) ||
                        Math.round(prevBottom) === Math.round(currentLeft)) {
                        y = isInversed ? (currentRegion.x === 0 && prevRegion.x === 0) ? currentBottom : currentRegion.x : currentRegion.y;
                        y = (point.yValue === 0) ?
                            (isInversed ? point.symbolLocations[0].x : point.symbolLocations[0].y) : y;
                    }
                    else {
                        y = currentBottom;
                    }
                    if (isInversed) {
                        if (beforePoint.yValue === 0) {
                            prevRegion.y = ((prevRegion.y + prevRegion.height / 2) + (rect.height / 2)) - prevRegion.height;
                        }
                        if (point.yValue === 0) {
                            currentYValue = ((currentRegion.y + currentRegion.height / 2) - (rect.height / 2));
                        }
                        direction = direction.concat('M' + ' ' + y + ' ' + (series.xAxis.isInversed ? (prevRegion.y + prevRegion.height) : prevRegion.y) + ' ' +
                            'L' + ' ' + y + ' ' + (series.xAxis.isInversed ? currentYValue : (currentYValue + currentRegion.height)) + ' ');
                    }
                    else {
                        var connectorX = prevRegion.x;
                        if (beforePoint.yValue === 0) {
                            connectorX = ((connectorX + prevRegion.width / 2) + (rect.width / 2)) - prevRegion.width;
                            currentXValue = ((currentRegion.x + currentRegion.width / 2) + (rect.width / 2)) - currentRegion.width;
                        }
                        if (point.yValue === 0) {
                            currentXValue = ((currentRegion.x + currentRegion.width / 2) - (rect.width / 2));
                        }
                        direction = direction.concat('M' + ' ' + (series.xAxis.isInversed ? connectorX : (connectorX + prevRegion.width)) + ' ' + y + ' ' +
                            'L' + ' ' + (series.xAxis.isInversed ? (currentXValue + currentRegion.width) : currentXValue) + ' ' + y + ' ');
                    }
                }
                prevRegion = point.regions[0];
            }
        }
        var options = new PathOption(series.chart.element.id + '_Series_' + series.index + '_Connector_', 'none', series.connector.width, series.connector.color, series.opacity, series.connector.dashArray, direction);
        if (redraw && getElement(options.id)) {
            direction = getElement(options.id).getAttribute('d');
        }
        var element = (redrawElement(redraw, options.id, options, series.chart.renderer) ||
            series.chart.renderer.drawPath(options, new Int32Array([series.clipRect.x, series.clipRect.y])));
        element.style.visibility = (!series.chart.enableCanvas) ? ((((series.animation.enable && animationMode !== 'Disable') || animationMode === 'Enable') && series.chart.animateSeries) ?
            'hidden' : 'visible') : null;
        appendChildElement(series.chart.enableCanvas, series.seriesElement, element, redraw, true, null, null, null, direction, null, null, null, series.chart.duration);
        this.renderMarker(series);
    };
    /**
     * Updates the direction of rendering for the specified series.
     *
     * @param {Series} series - The series to be rendered.
     * @param {number} point - Specifies the point.
     * @returns {void}
     * @private
     */
    WaterfallSeries.prototype.updateDirection = function (series, point) {
        this.render(series);
        if (series.marker.visible) {
            appendChildElement(series.chart.enableCanvas, series.chart.seriesElements, series.symbolElement, true);
        }
        if (series.marker.dataLabel.visible && series.chart.dataLabelModule) {
            for (var i = 0; i < point.length; i++) {
                series.chart.dataLabelModule.commonId = series.chart.element.id + '_Series_' + series.index + '_Point_';
                var dataLabelElement = series.chart.dataLabelModule.renderDataLabel(series, series.points[point[i]], null, series.marker.dataLabel);
                for (var j = 0; j < dataLabelElement.length; j++) {
                    series.chart.dataLabelModule.doDataLabelAnimation(series, dataLabelElement[j]);
                }
            }
        }
    };
    /**
     * Checks whether the current point in the series is an intermediate sum.
     *
     * @param {Series} series - The series to check.
     * @param {number} index - The index of the point in the series.
     * @returns {boolean} - Returns true if the current point is an intermediate sum, otherwise false.
     */
    WaterfallSeries.prototype.isIntermediateSum = function (series, index) {
        if (series.intermediateSumIndexes !== undefined && series.intermediateSumIndexes.indexOf(index) !== -1) {
            return true;
        }
        return false;
    };
    /**
     * Checks whether the current point in the series is a sum index.
     *
     * @param {Series} series - The series to check.
     * @param {number} index - The index of the point in the series.
     * @returns {boolean} - Returns true if the current point is a sum index, otherwise false.
     */
    WaterfallSeries.prototype.isSumIndex = function (series, index) {
        if (series.sumIndexes !== undefined && series.sumIndexes.indexOf(index) !== -1) {
            return true;
        }
        return false;
    };
    /**
     * Triggers the point render event for a given series and point.
     *
     * @param {Series} series - The series to which the point belongs.
     * @param {Points} point - The point for which to trigger the event.
     * @returns {IPointRenderEventArgs} - The event arguments for the point render event.
     */
    WaterfallSeries.prototype.triggerPointRenderEvent = function (series, point) {
        var color;
        var isSum = this.isIntermediateSum(series, point.index);
        var totalSum = this.isSumIndex(series, point.index);
        if (isSum || totalSum) {
            color = series.summaryFillColor;
        }
        else if (point.y < 0) {
            color = series.negativeFillColor;
        }
        else {
            color = series.interior;
        }
        return this.triggerEvent(series, point, color, { color: series.border.color, width: series.border.width });
    };
    /**
     * Processes the internal data for a series.
     *
     * @param {Object[]} json - The internal data JSON array.
     * @param {Series} series - The series for which to process the data.
     * @returns {Object[]} - The processed internal data array.
     * @private
     */
    WaterfallSeries.prototype.processInternalData = function (json, series) {
        var data = json;
        var index;
        var sumValue = 0;
        var intermediateSum = (!isNullOrUndefined(series.intermediateSumIndexes) && series.intermediateSumIndexes.length > 0) ?
            series.intermediateSumIndexes.sort(function (a, b) { return a - b; }) : series.intermediateSumIndexes;
        var sumIndex = (!isNullOrUndefined(series.sumIndexes) && series.sumIndexes.length > 0) ?
            series.sumIndexes.sort(function (a, b) { return a - b; }) : series.sumIndexes;
        var cumulativeSum = 0;
        for (var i = 0; i < data.length; i++) {
            cumulativeSum += data[i][series.yName] !== undefined ? data[i][series.yName] : 0;
            this.cumulativeSums.push(cumulativeSum);
        }
        if (intermediateSum !== undefined && intermediateSum.length > 0) {
            for (var i = 0; i < intermediateSum.length; i++) {
                for (var j = 0; j < data.length; j++) {
                    if (j === intermediateSum[i]) {
                        if (i === 0) {
                            index = subArraySum(data, -1, intermediateSum[i], null, series);
                        }
                        else {
                            index = subArraySum(data, intermediateSum[i - 1], intermediateSum[i], null, series);
                        }
                        data[j][series.yName] = index;
                    }
                }
            }
        }
        if (sumIndex !== undefined && sumIndex.length > 0) {
            var intermediateSumCount = 0;
            for (var k = 0; k < sumIndex.length; k++) {
                for (var j = 0; j < data.length; j++) {
                    if (j === sumIndex[k]) {
                        if (intermediateSum !== undefined && intermediateSum.length > intermediateSumCount &&
                            intermediateSum[k] !== sumIndex[k] && intermediateSum[k] <
                            sumIndex[k]) {
                            index = subArraySum(data, intermediateSum.length <= 1 ? intermediateSum[0] - 1 :
                                intermediateSum[k] - 1, sumIndex[k], sumIndex, series);
                            intermediateSumCount += 1;
                        }
                        else {
                            if (k === 0) {
                                index = subArraySum(data, -1, sumIndex[k], null, series);
                            }
                            else {
                                index = subArraySum(data, sumIndex[k - 1], sumIndex[k], null, series);
                            }
                        }
                        sumValue += index;
                        data[j][series.yName] = sumValue;
                    }
                }
            }
        }
        return data;
    };
    /**
     * Animates the series.
     *
     * @param  {Series} series - Defines the series to animate.
     * @returns {void}
     * @private
     */
    WaterfallSeries.prototype.doAnimation = function (series) {
        this.animate(series);
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    WaterfallSeries.prototype.getModuleName = function () {
        return 'WaterfallSeries';
        /**
         * return the module name.
         */
    };
    /**
     * To destroy the waterfall series.
     *
     * @returns {void}
     * @private
     */
    WaterfallSeries.prototype.destroy = function () {
        /**
         * Destroys the waterfall series.
         */
    };
    return WaterfallSeries;
}(ColumnBase));
export { WaterfallSeries };
