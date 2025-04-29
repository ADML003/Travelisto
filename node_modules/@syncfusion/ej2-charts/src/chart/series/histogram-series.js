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
import { sum, getPoint, templateAnimate, appendChildElement } from '../../common/utils/helper';
import { PathOption } from '@syncfusion/ej2-svg-base';
import { ColumnSeries } from './column-series';
import { animationMode } from '@syncfusion/ej2-base';
/**
 * The `HistogramSeries` module is used to render the histogram series.
 */
var HistogramSeries = /** @class */ (function (_super) {
    __extends(HistogramSeries, _super);
    function HistogramSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Render Histogram series.
     *
     * @param {Series} series - The series to render.
     * @returns {void}
     * @private
     */
    HistogramSeries.prototype.render = function (series) {
        _super.prototype.render.call(this, series);
        if (series.showNormalDistribution) {
            this.renderNormalDistribution(series);
        }
    };
    /**
     * To calculate bin interval for Histogram series.
     *
     * @param {number[]} yValues - The y values of the series.
     * @param {Series} series - The series for which the bin interval is calculated.
     * @returns {void}
     * @private
     */
    HistogramSeries.prototype.calculateBinInterval = function (yValues, series) {
        var mean = sum(yValues) / yValues.length;
        var sumValue = 0;
        for (var _i = 0, yValues_1 = yValues; _i < yValues_1.length; _i++) {
            var value = yValues_1[_i];
            sumValue += (value - mean) * (value - mean);
        }
        series.histogramValues.mean = mean;
        series.histogramValues.sDValue = Math.sqrt(Math.abs(sumValue / yValues.length));
        series.histogramValues.binWidth = series.binInterval ||
            Math.round((3.5 * series.histogramValues.sDValue) / Math.pow(yValues.length, 1 / 3)) || 1;
    };
    /**
     * Processes the internal data for the series.
     *
     * @param {Object[]} data - The internal data to be processed.
     * @param {Series} series - The series for which the internal data is processed.
     * @returns {Object[]} - The processed internal data.
     * @private
     */
    HistogramSeries.prototype.processInternalData = function (data, series) {
        var _a;
        var updatedData = [];
        var yValues = [];
        var keys = Object.keys(data);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            yValues.push(data[key][series.yName]);
        }
        series.histogramValues = {
            yValues: yValues
        };
        var min = Math.min.apply(Math, series.histogramValues.yValues);
        var max = Math.max.apply(Math, series.histogramValues.yValues);
        this.calculateBinInterval(series.histogramValues.yValues, series);
        var binWidth = series.histogramValues.binWidth;
        var yCount;
        for (var j = 0; j < data.length;) {
            yCount = yValues.filter(function (y) { return y >= min && y < (min + (binWidth)); }).length;
            if ((min + binWidth) === max) {
                yCount += yValues.filter(function (y) { return y >= max; }).length;
            }
            updatedData.push((_a = {
                    'x': min + binWidth / 2
                },
                _a[series.yName] = yCount,
                _a));
            min = min + binWidth;
            j += yCount;
        }
        return updatedData;
    };
    /**
     * Calculates the bin values for the series.
     *
     * @param {Series} series - The series for which the bin values are calculated.
     * @returns {void}
     * @private
     */
    HistogramSeries.prototype.calculateBinValues = function (series) {
        var yValuesCount = series.histogramValues.yValues.length;
        var binWidth = series.histogramValues.binWidth;
        var mean = series.histogramValues.mean;
        var sDValue = series.histogramValues.sDValue;
        var pointsCount = 500;
        var min = series.xAxis.minimum ? parseInt(series.xAxis.minimum.toString(), 10) : series.xMin;
        var max = series.xAxis.maximum ? parseInt(series.xAxis.maximum.toString(), 10) : series.xMax;
        var points = series.points.length;
        var xValue;
        var yValue;
        var del = (max - min) / (pointsCount - 1);
        if (points) {
            for (var i = 0; i < pointsCount; i++) {
                xValue = min + i * del;
                yValue = (Math.exp(-(xValue - mean) * (xValue - mean) / (2 * sDValue * sDValue)) /
                    (sDValue * Math.sqrt(2 * Math.PI))) * binWidth * yValuesCount;
                series.yMin = series.yMin > yValue ? yValue : series.yMin;
                series.yMax = series.yMax < yValue ? yValue : series.yMax;
            }
        }
    };
    /**
     * Render Normal Distribution for Histogram series.
     *
     * @param {Series} series - The series for which the normal distribution is rendered.
     * @returns {void}
     * @private
     */
    HistogramSeries.prototype.renderNormalDistribution = function (series) {
        var min = series.xAxis.actualRange.min;
        var max = series.xAxis.actualRange.max;
        var xValue;
        var pointLocation;
        var yValue;
        var direction = '';
        var startPoint = 'M';
        var yValuesCount = series.histogramValues.yValues.length;
        var binWidth = series.histogramValues.binWidth;
        var mean = series.histogramValues.mean;
        var sDValue = series.histogramValues.sDValue;
        var pointsCount = 500;
        var del = (max - min) / (pointsCount - 1);
        var points = series.points.length;
        if (points) {
            for (var i = 0; i < pointsCount; i++) {
                xValue = min + i * del;
                yValue = Math.exp(-(xValue - mean) * (xValue - mean) / (2 * sDValue * sDValue)) /
                    (sDValue * Math.sqrt(2 * Math.PI));
                pointLocation = getPoint(xValue, yValue * binWidth * yValuesCount, series.xAxis, series.yAxis, series.chart.requireInvertedAxis);
                direction += startPoint + ' ' + (pointLocation.x) + ' ' + (pointLocation.y) + ' ';
                startPoint = 'L';
            }
        }
        var distributionLine = series.chart.renderer.drawPath(new PathOption(series.chart.element.id + '_Series_' + series.index + '_NDLine', 'transparent', 2, series.chart.themeStyle.histogram || series.chart.themeStyle.errorBar, series.opacity, series.dashArray, direction), new Int32Array([series.clipRect.x, series.clipRect.y]));
        distributionLine.style.visibility = (!series.chart.enableCanvas) ? ((((series.animation.enable && animationMode !== 'Disable') || animationMode === 'Enable') &&
            series.chart.animateSeries) ? 'hidden' : 'visible') : null;
        if (!series.chart.enableCanvas) {
            series.seriesElement.appendChild(distributionLine);
        }
    };
    /**
     * Animates the series.
     *
     * @param  {Series} series - Defines the series to animate.
     * @returns {void}
     * @private
     */
    HistogramSeries.prototype.doAnimation = function (series) {
        _super.prototype.doAnimation.call(this, series);
        if (series.showNormalDistribution) {
            templateAnimate(series.seriesElement.lastElementChild, ((series.animation.duration === 0) ? 1000 : series.animation.duration), 500, 'FadeIn');
        }
    };
    /**
     * Updates the direction of rendering for the specified series.
     *
     * @param {Series} series - The series to be rendered.
     * @returns {void}
     * @private
     */
    HistogramSeries.prototype.updateDirection = function (series) {
        this.render(series);
        if (series.marker.visible) {
            appendChildElement(series.chart.enableCanvas, series.chart.seriesElements, series.symbolElement, true);
        }
        if (series.marker.dataLabel.visible && series.chart.dataLabelModule) {
            series.chart.dataLabelCollections = [];
            series.chart.dataLabelModule.render(series, series.chart, series.marker.dataLabel);
            if (series.textElement) {
                appendChildElement(series.chart.enableCanvas, series.chart.dataLabelElements, series.shapeElement, true);
                appendChildElement(series.chart.enableCanvas, series.chart.dataLabelElements, series.textElement, true);
            }
        }
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    HistogramSeries.prototype.getModuleName = function () {
        return 'HistogramSeries';
        /**
         * return the module name.
         */
    };
    /**
     * To destroy the histogram series.
     *
     * @returns {void}
     * @private
     */
    HistogramSeries.prototype.destroy = function () {
        /**
         * Destroy method performed here.
         */
    };
    return HistogramSeries;
}(ColumnSeries));
export { HistogramSeries };
