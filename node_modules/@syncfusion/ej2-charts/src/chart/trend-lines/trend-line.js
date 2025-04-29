import { Series, Points } from '../series/chart-series';
import { findClipRect, RectOption } from '../../common/utils/helper';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
/**
 * The `Trendlines` module is used to render six types of trendlines in the chart.
 */
var Trendlines = /** @class */ (function () {
    function Trendlines() {
    }
    /**
     * Initializes the series collection for the specified trendline in the chart.
     *
     * @param {Trendline} trendline - The trendline for which the series collection is initialized.
     * @param {Chart} chart - The chart instance.
     * @returns {void}
     * @private
     */
    Trendlines.prototype.initSeriesCollection = function (trendline, chart) {
        var trendLineSeries = new Series(trendline, 'targetSeries', {}, true);
        if (trendline.type === 'Linear' || trendline.type === 'MovingAverage') {
            trendLineSeries.type = 'Line';
        }
        else {
            trendLineSeries.type = 'Spline';
        }
        this.setSeriesProperties(trendLineSeries, trendline, trendline.type, trendline.fill, trendline.width, chart);
    };
    /**
     * Sets the properties for the specified series related to the specified trendline.
     *
     * @param {Series} series - The series to which properties are applied.
     * @param {Trendline} trendline - The trendline associated with the series.
     * @param {string} name - The name of the series.
     * @param {string} fill - The fill color of the series.
     * @param {number} width - The width of the series.
     * @param {Chart} chart - The chart instance.
     * @returns {void}
     */
    Trendlines.prototype.setSeriesProperties = function (series, trendline, name, fill, width, chart) {
        series.name = trendline.name;
        series.xName = 'x';
        series.yName = 'y';
        series.fill = fill || 'blue';
        series.width = width;
        series.dashArray = trendline.dashArray;
        series.clipRectElement = trendline.clipRectElement;
        series.points = [];
        series.enableTooltip = trendline.enableTooltip;
        series.index = trendline.index;
        series.sourceIndex = trendline.sourceIndex;
        series.interior = series.fill;
        series.animation = trendline.animation;
        series.legendShape = 'HorizontalLine';
        series.marker = trendline.marker;
        series.category = 'TrendLine';
        series.chart = chart;
        series.xMin = Infinity;
        series.xMax = -Infinity;
        series.yMin = Infinity;
        series.yMax = -Infinity;
        series.xData = [];
        series.yData = [];
        trendline.targetSeries = series;
        if (chart.isBlazor) {
            trendline.targetSeries.border = {}; // To avoid console error in blazor
            trendline.targetSeries.connector = {}; // To avoid console error in blazor
        }
    };
    /**
     * Creates elements for the specified trendline and adds them to the chart.
     *
     * @param {Chart} chart - The chart instance.
     * @param {Trendline} trendline - The trendline for which elements are created.
     * @param {number} index - The index of the trendline.
     * @param {Element} element - The parent element to which trendline elements are added.
     * @param {Element} clipRectElement - The clip rect element associated with the chart.
     * @returns {void}
     */
    Trendlines.prototype.createTrendLineElements = function (chart, trendline, index, element, clipRectElement) {
        trendline.trendLineElement = element;
        trendline.targetSeries.clipRectElement = clipRectElement;
        trendline.targetSeries.seriesElement = element;
        if (chart.trendLineElements) {
            chart.trendLineElements.appendChild(trendline.trendLineElement);
        }
    };
    /**
     * Retrieves the data point at the specified index from the series.
     *
     * @param {Object} x - The x-value of the data point.
     * @param {Object} y - The y-value of the data point.
     * @param {Series} series - The series from which to retrieve the data point.
     * @param {number} index - The index of the data point in the series.
     * @returns {Points} - The data point object.
     */
    Trendlines.prototype.getDataPoint = function (x, y, series, index) {
        var trendPoint = new Points();
        trendPoint.x = series.xAxis.valueType === 'DateTime' ? new Date(Number(x)) : x;
        trendPoint.y = y;
        trendPoint.xValue = Number(x);
        trendPoint.color = series.fill;
        trendPoint.index = index;
        trendPoint.yValue = Number(y);
        trendPoint.visible = true;
        series.xMin = Math.min(series.xMin, trendPoint.xValue);
        series.yMin = Math.min(series.yMin, trendPoint.yValue);
        series.xMax = Math.max(series.xMax, trendPoint.xValue);
        series.yMax = Math.max(series.yMax, trendPoint.yValue);
        series.xData.push(trendPoint.xValue);
        return trendPoint;
    };
    /**
     * Finds the slope and intercept for the trendline.
     *
     * @param {number[]} xValues - The array of x-values.
     * @param {number[]} yValues - The array of y-values.
     * @param {Trendline} trendline - The trendline configuration.
     * @param {Points[]} points - The data points for the trendline.
     * @returns {SlopeIntercept} - The slope and intercept values.
     */
    Trendlines.prototype.findSlopeIntercept = function (xValues, yValues, trendline, points) {
        var xAvg = 0;
        var yAvg = 0;
        var xyAvg = 0;
        var xxAvg = 0;
        var index = 0;
        var slope = 0;
        var intercept = 0;
        while (index < points.length) {
            // To fix trendline not rendered issue while Nan Value is provided for y values.
            if (isNaN(yValues[index])) {
                yValues[index] = ((yValues[index - 1] + yValues[index + 1]) / 2);
            }
            xAvg += xValues[index];
            yAvg += yValues[index];
            xyAvg += xValues[index] * yValues[index];
            xxAvg += xValues[index] * xValues[index];
            index++;
        }
        var type = trendline.type;
        if (trendline.intercept && (type === 'Linear' || type === 'Exponential')) {
            intercept = trendline.intercept;
            switch (type) {
                case 'Linear':
                    slope = ((xyAvg) - (trendline.intercept * xAvg)) / xxAvg;
                    break;
                case 'Exponential':
                    slope = ((xyAvg) - (Math.log(Math.abs(trendline.intercept)) * xAvg)) / xxAvg;
                    break;
            }
        }
        else {
            slope = ((points.length * xyAvg) - (xAvg * yAvg)) / ((points.length * xxAvg) - (xAvg * xAvg));
            slope = (type === 'Linear' ? slope : Math.abs(slope));
            if (type === 'Exponential' || type === 'Power') {
                intercept = Math.exp((yAvg - (slope * xAvg)) / points.length);
            }
            else {
                intercept = (yAvg - (slope * xAvg)) / points.length;
            }
        }
        return { slope: slope, intercept: intercept };
    };
    /**
     * Initializes the data source for the trendline.
     *
     * @param {Trendline} trendline - The trendline configuration.
     * @returns {void}
     * @private
     */
    Trendlines.prototype.initDataSource = function (trendline) {
        var points = trendline.points;
        if (points && points.length) {
            //prepare data
            var trendlineSeries = trendline.targetSeries;
            switch (trendline.type) {
                case 'Linear':
                    this.setLinearRange(points, trendline, trendlineSeries);
                    break;
                case 'Exponential':
                    this.setExponentialRange(points, trendline, trendlineSeries);
                    break;
                case 'MovingAverage':
                    this.setMovingAverageRange(points, trendline, trendlineSeries);
                    break;
                case 'Polynomial':
                    this.setPolynomialRange(points, trendline, trendlineSeries);
                    break;
                case 'Power':
                    this.setPowerRange(points, trendline, trendlineSeries);
                    break;
                case 'Logarithmic':
                    this.setLogarithmicRange(points, trendline, trendlineSeries);
                    break;
            }
            if (trendline.type !== 'Linear' && trendline.type !== 'MovingAverage') {
                trendlineSeries.chart.splineSeriesModule.findSplinePoint(trendlineSeries);
            }
        }
    };
    /**
     * Sets the range for an exponential trendline.
     *
     * @param {Points[]} points - The data points of the series.
     * @param {Trendline} trendline - The exponential trendline configuration.
     * @param {Series} series - The series to which the trendline belongs.
     * @returns {void}
     */
    Trendlines.prototype.setExponentialRange = function (points, trendline, series) {
        var xValue = [];
        var yValue = [];
        var index = 0;
        while (index < points.length) {
            var point = points[index];
            var yDataValue = point.yValue ? Math.log(point.yValue) : 0;
            xValue.push(point.xValue);
            yValue.push(yDataValue);
            index++;
        }
        var slopeIntercept = this.findSlopeIntercept(xValue, yValue, trendline, points);
        series.points = this.getExponentialPoints(trendline, points, xValue, yValue, series, slopeIntercept);
    };
    /**
     * Sets the range for a logarithmic trendline.
     *
     * @param {Points[]} points - The data points of the series.
     * @param {Trendline} trendline - The logarithmic trendline configuration.
     * @param {Series} series - The series to which the trendline belongs.
     * @returns {void}
     */
    Trendlines.prototype.setLogarithmicRange = function (points, trendline, series) {
        var xLogValue = [];
        var yLogValue = [];
        var xPointsLgr = [];
        var index = 0;
        while (index < points.length) {
            var point = points[index];
            var xDataValue = point.xValue ? Math.log(point.xValue) : 0;
            xPointsLgr.push(point.xValue);
            xLogValue.push(xDataValue);
            yLogValue.push(point.yValue);
            index++;
        }
        var slopeIntercept = this.findSlopeIntercept(xLogValue, yLogValue, trendline, points);
        series.points = this.getLogarithmicPoints(trendline, points, xPointsLgr, yLogValue, series, slopeIntercept);
    };
    /**
     * Sets the range for a polynomial trendline.
     *
     * @param {Points[]} points - The data points of the series.
     * @param {Trendline} trendline - The polynomial trendline configuration.
     * @param {Series} series - The series to which the trendline belongs.
     * @returns {void}
     */
    Trendlines.prototype.setPolynomialRange = function (points, trendline, series) {
        var xPolyValues = [];
        var yPolyValues = [];
        var index = 0;
        while (index < points.length) {
            var point = points[index];
            xPolyValues.push(point.xValue);
            yPolyValues.push(point.yValue);
            index++;
        }
        series.points = this.getPolynomialPoints(trendline, points, xPolyValues, yPolyValues, series);
    };
    /**
     * Sets the range for a power trendline.
     *
     * @param {Points[]} points - The data points of the series.
     * @param {Trendline} trendline - The power trendline configuration.
     * @param {Series} series - The series to which the trendline belongs.
     * @returns {void}
     */
    Trendlines.prototype.setPowerRange = function (points, trendline, series) {
        var xValues = [];
        var yValues = [];
        var powerPoints = [];
        var index = 0;
        while (index < points.length) {
            var point = points[index];
            var xDataValue = point.xValue ? Math.log(point.xValue) : 0;
            var yDataValue = point.yValue ? Math.log(point.yValue) : 0;
            powerPoints.push(point.xValue);
            xValues.push(xDataValue);
            yValues.push(yDataValue);
            index++;
        }
        var slopeIntercept = this.findSlopeIntercept(xValues, yValues, trendline, points);
        series.points = this.getPowerPoints(trendline, points, powerPoints, yValues, series, slopeIntercept);
    };
    /**
     * Sets the range for a linear trendline.
     *
     * @param {Points[]} points - The data points of the series.
     * @param {Trendline} trendline - The linear trendline configuration.
     * @param {Series} series - The series to which the trendline belongs.
     * @returns {void}
     */
    Trendlines.prototype.setLinearRange = function (points, trendline, series) {
        var xValues = [];
        var yValues = [];
        var index = 0;
        while (index < points.length) {
            var point = points[index];
            xValues.push(point.xValue);
            yValues.push(point.yValue);
            index++;
        }
        var slopeIntercept = this.findSlopeIntercept(xValues, yValues, trendline, points);
        series.points = this.getLinearPoints(trendline, points, xValues, yValues, series, slopeIntercept);
    };
    /**
     * Sets the range for a moving average trendline.
     *
     * @param {Points[]} points - The data points of the series.
     * @param {Trendline} trendline - The moving average trendline configuration.
     * @param {Series} series - The series to which the trendline belongs.
     * @returns {void}
     */
    Trendlines.prototype.setMovingAverageRange = function (points, trendline, series) {
        var xValues = [];
        var yValues = [];
        var xAvgValues = [];
        var index = 0;
        while (index < points.length) {
            var point = points[index];
            xAvgValues.push(point.xValue);
            xValues.push(index + 1);
            yValues.push(point.yValue);
            index++;
        }
        series.points = this.getMovingAveragePoints(trendline, points, xAvgValues, yValues, series);
    };
    /**
     * Calculates the points for a logarithmic trendline.
     *
     * @param {Trendline} trendline - The logarithmic trendline configuration.
     * @param {Points[]} points - The data points of the series.
     * @param {number[]} xValues - The x values of the data points.
     * @param {number[]} yValues - The y values of the data points.
     * @param {Series} series - The series to which the trendline belongs.
     * @param {SlopeIntercept} slopeInterceptLog - The slope and intercept of the logarithmic trendline.
     * @returns {Points[]} - The calculated points for the logarithmic trendline.
     */
    Trendlines.prototype.getLogarithmicPoints = function (trendline, points, xValues, yValues, series, slopeInterceptLog) {
        var midPoint = Math.round((points.length / 2));
        var pts = [];
        var x1Log = xValues[0] - trendline.backwardForecast;
        var x1 = x1Log ? Math.log(x1Log) : 0;
        var y1Log = slopeInterceptLog.intercept + (slopeInterceptLog.slope * x1);
        var x2Log = xValues[midPoint - 1];
        var x2 = x2Log ? Math.log(x2Log) : 0;
        var y2Log = slopeInterceptLog.intercept + (slopeInterceptLog.slope * x2);
        var x3Log = xValues[xValues.length - 1] + trendline.forwardForecast;
        var x3 = x3Log ? Math.log(x3Log) : 0;
        var y3Log = slopeInterceptLog.intercept + (slopeInterceptLog.slope * x3);
        pts.push(this.getDataPoint(x1Log, y1Log, series, pts.length));
        pts.push(this.getDataPoint(x2Log, y2Log, series, pts.length));
        pts.push(this.getDataPoint(x3Log, y3Log, series, pts.length));
        return pts;
    };
    /**
     * Calculates the points for a power trendline.
     *
     * @param {Trendline} trendline - The power trendline configuration.
     * @param {Points[]} points - The data points of the series.
     * @param {number[]} xValues - The x values of the data points.
     * @param {number[]} yValues - The y values of the data points.
     * @param {Series} series - The series to which the trendline belongs.
     * @param {SlopeIntercept} slopeInterceptPower - The slope and intercept of the power trendline.
     * @returns {Points[]} - The calculated points for the power trendline.
     */
    Trendlines.prototype.getPowerPoints = function (trendline, points, xValues, yValues, series, slopeInterceptPower) {
        var midPoint = Math.round((points.length / 2));
        var pts = [];
        var x1 = xValues[0] - trendline.backwardForecast;
        x1 = x1 > -1 ? x1 : 0;
        var y1 = slopeInterceptPower.intercept * Math.pow(x1, slopeInterceptPower.slope);
        var x2 = xValues[midPoint - 1];
        var y2 = slopeInterceptPower.intercept * Math.pow(x2, slopeInterceptPower.slope);
        var x3 = xValues[xValues.length - 1] + trendline.forwardForecast;
        var y3 = slopeInterceptPower.intercept * Math.pow(x3, slopeInterceptPower.slope);
        pts.push(this.getDataPoint(x1, y1, series, pts.length));
        pts.push(this.getDataPoint(x2, y2, series, pts.length));
        pts.push(this.getDataPoint(x3, y3, series, pts.length));
        return pts;
    };
    /**
     * Calculates the points for a polynomial trendline.
     *
     * @param {Trendline} trendline - The polynomial trendline configuration.
     * @param {Points[]} points - The data points of the series.
     * @param {number[]} xValues - The x values of the data points.
     * @param {number[]} yValues - The y values of the data points.
     * @param {Series} series - The series to which the trendline belongs.
     * @returns {Points[]} - The calculated points for the polynomial trendline.
     */
    Trendlines.prototype.getPolynomialPoints = function (trendline, points, xValues, yValues, series) {
        var pts = [];
        var polynomialOrder = points.length <= trendline.polynomialOrder ? points.length : trendline.polynomialOrder;
        polynomialOrder = Math.max(2, polynomialOrder);
        polynomialOrder = Math.min(6, polynomialOrder);
        trendline.polynomialOrder = polynomialOrder;
        trendline.polynomialSlopes = [];
        trendline.polynomialSlopes.length = trendline.polynomialOrder + 1;
        var index = 0;
        while (index < xValues.length) {
            var xVal = xValues[index];
            var yVal = yValues[index];
            var subIndex = 0;
            while (subIndex <= trendline.polynomialOrder) {
                if (!trendline.polynomialSlopes[subIndex]) {
                    trendline.polynomialSlopes[subIndex] = 0;
                }
                trendline.polynomialSlopes[subIndex] += Math.pow(xVal, subIndex) * yVal;
                ++subIndex;
            }
            index++;
        }
        var numArray = [];
        numArray.length = 1 + 2 * trendline.polynomialOrder;
        var matrix = [];
        matrix.length = trendline.polynomialOrder + 1;
        var newIndex = 0;
        while (newIndex < (trendline.polynomialOrder + 1)) {
            matrix[newIndex] = [];
            matrix[newIndex].length = 3;
            newIndex++;
        }
        var nIndex = 0;
        while (nIndex < xValues.length) {
            var d = xValues[nIndex];
            var num2 = 1.0;
            var nIndex2 = 0;
            while (nIndex2 < numArray.length) {
                if (!numArray[nIndex2]) {
                    numArray[nIndex2] = 0;
                }
                numArray[nIndex2] += num2;
                num2 *= d;
                ++nIndex2;
            }
            ++nIndex;
        }
        var nnIndex = 0;
        while (nnIndex <= trendline.polynomialOrder) {
            var nnIndex2 = 0;
            while (nnIndex2 <= trendline.polynomialOrder) {
                matrix[nnIndex][nnIndex2] = numArray[nnIndex + nnIndex2];
                ++nnIndex2;
            }
            ++nnIndex;
        }
        if (!this.gaussJordanElimination(matrix, trendline.polynomialSlopes)) {
            trendline.polynomialSlopes = null;
        }
        pts = this.getPoints(trendline, points, xValues, series);
        return pts;
    };
    /**
     * Calculates the points for a moving average trendline.
     *
     * @param {Trendline} trendline - The moving average trendline configuration.
     * @param {Points[]} points - The data points of the series.
     * @param {number[]} xValues - The x values of the data points.
     * @param {number[]} yValues - The y values of the data points.
     * @param {Series} series - The series to which the trendline belongs.
     * @returns {Points[]} - The calculated points for the moving average trendline.
     */
    Trendlines.prototype.getMovingAveragePoints = function (trendline, points, xValues, yValues, series) {
        var pts = [];
        var period = trendline.period >= points.length ? points.length - 1 : trendline.period;
        period = period === 1 ? 1 : Math.max(2, period);
        var index = 0;
        var y;
        var x;
        var count;
        var nullCount;
        while (index < points.length) {
            y = count = nullCount = 0;
            for (var j = index; count < period; j++) {
                count++;
                y += yValues[j];
            }
            y = period - nullCount < 0 ? null : y ? y / (period - nullCount) : y;
            if (!isNullOrUndefined(y) && !isNaN(y)) {
                x = xValues[period - 1 + index];
                pts.push(this.getDataPoint(x, y, series, pts.length));
            }
            index++;
        }
        return pts;
    };
    /**
     * Calculates the points for a linear trendline.
     *
     * @param {Trendline} trendline - The linear trendline configuration.
     * @param {Points[]} points - The data points of the series.
     * @param {number[]} xValues - The x values of the data points.
     * @param {number[]} yValues - The y values of the data points.
     * @param {Series} series - The series to which the trendline belongs.
     * @param {SlopeIntercept} slopeInterceptLinear - The slope and intercept of the linear trendline.
     * @returns {Points[]} - The calculated points for the linear trendline.
     */
    Trendlines.prototype.getLinearPoints = function (trendline, points, xValues, yValues, series, slopeInterceptLinear) {
        var pts = [];
        var max = xValues.indexOf(Math.max.apply(null, xValues));
        var min = xValues.indexOf(Math.min.apply(null, xValues));
        var x1Linear = xValues[min] - trendline.backwardForecast;
        var y1Linear = slopeInterceptLinear.slope * x1Linear + slopeInterceptLinear.intercept;
        var x2Linear = xValues[max] + trendline.forwardForecast;
        var y2Linear = slopeInterceptLinear.slope * x2Linear + slopeInterceptLinear.intercept;
        pts.push(this.getDataPoint(x1Linear, y1Linear, series, pts.length));
        pts.push(this.getDataPoint(x2Linear, y2Linear, series, pts.length));
        return pts;
    };
    /**
     * Calculates the points for an exponential trendline.
     *
     * @param {Trendline} trendline - The exponential trendline configuration.
     * @param {Points[]} points - The data points of the series.
     * @param {number[]} xValues - The x values of the data points.
     * @param {number[]} yValues - The y values of the data points.
     * @param {Series} series - The series to which the trendline belongs.
     * @param {SlopeIntercept} slopeInterceptExp - The slope and intercept of the exponential trendline.
     * @returns {Points[]} - The calculated points for the exponential trendline.
     */
    Trendlines.prototype.getExponentialPoints = function (trendline, points, xValues, yValues, series, slopeInterceptExp) {
        var midPoint = Math.round((points.length / 2));
        var ptsExp = [];
        var x1 = xValues[0] - trendline.backwardForecast;
        var y1 = slopeInterceptExp.intercept * Math.exp(slopeInterceptExp.slope * x1);
        var x2 = xValues[midPoint - 1];
        var y2 = slopeInterceptExp.intercept * Math.exp(slopeInterceptExp.slope * x2);
        var x3 = xValues[xValues.length - 1] + trendline.forwardForecast;
        var y3 = slopeInterceptExp.intercept * Math.exp(slopeInterceptExp.slope * x3);
        ptsExp.push(this.getDataPoint(x1, isNaN(y1) ? 0 : y1, series, ptsExp.length));
        ptsExp.push(this.getDataPoint(x2, isNaN(y2) ? 0 : y2, series, ptsExp.length));
        ptsExp.push(this.getDataPoint(x3, isNaN(y3) ? 0 : y3, series, ptsExp.length));
        return ptsExp;
    };
    /**
     * Calculates the points for the specified type of trendline.
     *
     * @param {Trendline} trendline - The trendline configuration.
     * @param {Points[]} points - The data points of the series.
     * @param {number[]} xValues - The x values of the data points.
     * @param {Series} series - The series to which the trendline belongs.
     * @returns {Points[]} - The calculated points for the trendline.
     */
    Trendlines.prototype.getPoints = function (trendline, points, xValues, series) {
        var polynomialSlopes = trendline.polynomialSlopes;
        var pts = [];
        var x1 = 1;
        var index = 1;
        var xValue;
        var yValue;
        // We have to sort the points in ascending order. Because, the data source of the series may be random order.
        points.sort(function (a, b) { return a.xValue - b.xValue; });
        xValues.sort(function (a, b) { return a - b; });
        while (polynomialSlopes !== null && index <= polynomialSlopes.length) {
            if (index === 1) {
                xValue = xValues[0] - trendline.backwardForecast;
                yValue = this.getPolynomialYValue(polynomialSlopes, xValue);
                pts.push(this.getDataPoint(xValue, yValue, series, pts.length));
            }
            else if (index === polynomialSlopes.length) {
                xValue = xValues[points.length - 1] + trendline.forwardForecast;
                yValue = this.getPolynomialYValue(polynomialSlopes, xValue);
                pts.push(this.getDataPoint(xValue, yValue, series, pts.length));
            }
            else {
                x1 += (points.length + (series.xAxis.valueType === 'DateTime' ? index : trendline.forwardForecast)) / polynomialSlopes.length;
                xValue = xValues[parseInt(x1.toString(), 10) - 1];
                yValue = this.getPolynomialYValue(polynomialSlopes, xValue);
                pts.push(this.getDataPoint(xValue, yValue, series, pts.length));
            }
            index++;
        }
        return pts;
    };
    /**
     * Calculates the y value for the specified x value using polynomial regression.
     *
     * @param {number[]} slopes - The coefficients of the polynomial equation.
     * @param {number} x - The x value for which to calculate the y value.
     * @returns {number} - The calculated y value.
     */
    Trendlines.prototype.getPolynomialYValue = function (slopes, x) {
        var sum = 0;
        var index = 0;
        while (index < slopes.length) {
            sum += slopes[index] * Math.pow(x, index);
            index++;
        }
        return sum;
    };
    /**
     * Applies Gauss-Jordan elimination to solve a system of linear equations represented by a matrix.
     * Updates the coefficients of the polynomial equation.
     *
     * @param {number[][]} matrix - The matrix representing the system of linear equations.
     * @param {number[]} polynomialSlopes - The coefficients of the polynomial equation to be updated.
     * @returns {boolean} - A boolean indicating whether the elimination process was successful.
     */
    Trendlines.prototype.gaussJordanElimination = function (matrix, polynomialSlopes) {
        var length = matrix.length;
        var numArray1 = [];
        var numArray2 = [];
        var numArray3 = [];
        numArray1.length = length;
        numArray2.length = length;
        numArray3.length = length;
        var index = 0;
        while (index < length) {
            numArray3[index] = 0;
            ++index;
        }
        var index1 = 0;
        while (index1 < length) {
            var num1 = 0;
            var index2 = 0;
            var index3 = 0;
            var index4 = 0;
            while (index4 < length) {
                if (numArray3[index4] !== 1) {
                    var index5 = 0;
                    while (index5 < length) {
                        if (numArray3[index5] === 0 && Math.abs(matrix[index4][index5]) >= num1) {
                            num1 = Math.abs(matrix[index4][index5]);
                            index2 = index4;
                            index3 = index5;
                        }
                        ++index5;
                    }
                }
                ++index4;
            }
            ++numArray3[index3];
            if (index2 !== index3) {
                var index4_1 = 0;
                while (index4_1 < length) {
                    var num2 = matrix[index2][index4_1];
                    matrix[index2][index4_1] = matrix[index3][index4_1];
                    matrix[index3][index4_1] = num2;
                    ++index4_1;
                }
                var num3 = polynomialSlopes[index2];
                polynomialSlopes[index2] = polynomialSlopes[index3];
                polynomialSlopes[index3] = num3;
            }
            numArray2[index1] = index2;
            numArray1[index1] = index3;
            if (matrix[index3][index3] === 0.0) {
                return false;
            }
            var num4 = 1.0 / matrix[index3][index3];
            matrix[index3][index3] = 1.0;
            var iindex4 = 0;
            while (iindex4 < length) {
                matrix[index3][iindex4] *= num4;
                ++iindex4;
            }
            polynomialSlopes[index3] *= num4;
            var iandex4 = 0;
            while (iandex4 < length) {
                if (iandex4 !== index3) {
                    var num2 = matrix[iandex4][index3];
                    matrix[iandex4][index3] = 0.0;
                    var index5 = 0;
                    while (index5 < length) {
                        matrix[iandex4][index5] -= matrix[index3][index5] * num2;
                        ++index5;
                    }
                    polynomialSlopes[iandex4] -= polynomialSlopes[index3] * num2;
                }
                ++iandex4;
            }
            ++index1;
        }
        var iindex1 = length - 1;
        while (iindex1 >= 0) {
            if (numArray2[iindex1] !== numArray1[iindex1]) {
                var iindex2 = 0;
                while (iindex2 < length) {
                    var num = matrix[iindex2][numArray2[iindex1]];
                    matrix[iindex2][numArray2[iindex1]] = matrix[iindex2][numArray1[iindex1]];
                    matrix[iindex2][numArray1[iindex1]] = num;
                    ++iindex2;
                }
            }
            --iindex1;
        }
        return true;
    };
    /**
     * Retrieves the elements required for rendering trendlines for a series in the chart.
     *
     * @param {Series} series - The series for which trendlines are to be rendered.
     * @param {Chart} chart - The chart instance.
     * @returns {void}
     * @private
     */
    Trendlines.prototype.getTrendLineElements = function (series, chart) {
        findClipRect(series);
        var clipRect = series.clipRect;
        var clipRectElement = chart.renderer.drawClipPath(new RectOption(chart.element.id + '_ChartTrendlineClipRect_' + series.index, 'transparent', { width: 1, color: 'Gray' }, 1, {
            x: 0, y: 0, width: clipRect.width,
            height: clipRect.height
        }));
        var element = chart.renderer.createGroup({
            'id': chart.element.id + 'TrendlineSeriesGroup' + series.index,
            'transform': 'translate(' + clipRect.x + ',' + clipRect.y + ')',
            'clip-path': 'url(#' + chart.element.id + '_ChartTrendlineClipRect_' + series.index + ')'
        });
        //defines the clip rect element
        if (element) {
            element.appendChild(clipRectElement);
        }
        for (var _i = 0, _a = series.trendlines; _i < _a.length; _i++) {
            var trendline = _a[_i];
            this.createTrendLineElements(chart, trendline, trendline.index, element, clipRectElement);
        }
    };
    /**
     * To destroy the trendline.
     *
     * @returns {void}
     * @private
     */
    Trendlines.prototype.destroy = function () {
        /**
         * Destroys the Linear Trendline.
         */
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    Trendlines.prototype.getModuleName = function () {
        /**
         * Returns the module name of the series.
         */
        return 'TrendLine';
    };
    return Trendlines;
}());
export { Trendlines };
