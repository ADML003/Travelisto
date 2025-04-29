/**
 * Defines the common functionalities of accumulation series
 */
import { isNullOrUndefined, Animation, createElement } from '@syncfusion/ej2-base';
import { degreeToLocation, getElement, indexFinder, linear } from '../../common/utils/helper';
import { pointByIndex } from '../model/acc-base';
/**
 * The `AccumulationBase` class is used to perform base calculations for accumulation charts.
 *
 * @private
 */
var AccumulationBase = /** @class */ (function () {
    /** @private */
    function AccumulationBase(accumulation) {
        this.accumulation = accumulation;
    }
    Object.defineProperty(AccumulationBase.prototype, "center", {
        /**
         * Gets the center of the pie.
         *
         * @private
         * @returns {ChartLocation} - The center of the pie.
         */
        get: function () {
            return this.pieCenter || (this.accumulation.visibleSeries[0].type === 'Pie' ?
                this.accumulation.pieSeriesModule.pieBaseCenter : null);
        },
        /**
         * Sets the center of the pie.
         *
         * @private
         * @param {ChartLocation} value - The center point to set.
         */
        set: function (value) {
            this.pieCenter = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccumulationBase.prototype, "radius", {
        /**
         * Gets the radius of the pie.
         *
         * @private
         * @returns {number} - The radius of the pie.
         */
        get: function () {
            return this.pieRadius !== undefined ? this.pieRadius :
                this.accumulation.pieSeriesModule.pieBaseRadius;
        },
        /**
         * Sets the radius of the pie.
         *
         * @private
         * @param {number} value - The radius value to set.
         */
        set: function (value) {
            this.pieRadius = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccumulationBase.prototype, "labelRadius", {
        /**
         * Gets the label radius of the pie.
         *
         * @private
         * @returns {number} - The label radius of the pie.
         */
        get: function () {
            return this.pieLabelRadius !== undefined ? this.pieLabelRadius :
                this.accumulation.pieSeriesModule.pieBaseLabelRadius;
        },
        /**
         * Sets the label radius of the pie.
         *
         * @private
         * @param {number} value - The label radius value to set.
         */
        set: function (value) {
            this.pieLabelRadius = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Checks whether the series is circular or not.
     *
     * @private
     * @returns {boolean} - True if the series is circular, otherwise false.
     */
    AccumulationBase.prototype.isCircular = function () {
        return this.accumulation.type === 'Pie';
    };
    /**
     * To check various radius pie.
     *
     * @private
     * @returns {boolean} - True if various radius is enabled, otherwise false.
     */
    AccumulationBase.prototype.isVariousRadius = function () {
        return this.accumulation.pieSeriesModule.isRadiusMapped;
    };
    /**
     * To process the explode on accumulation chart loading.
     *
     * @private
     * @param {Event} event - The event triggered during loading.
     * @returns {void}
     */
    AccumulationBase.prototype.processExplode = function (event) {
        if (event.target.id.indexOf('_Series_') > -1 || event.target.id.indexOf('_datalabel_') > -1) {
            var pointIndex = indexFinder(event.target.id).point;
            if (isNaN(pointIndex) || (event.target.id.indexOf('_datalabel_') > -1 &&
                this.accumulation.visibleSeries[0].points[pointIndex].labelPosition === 'Outside')) {
                return null;
            }
            this.explodePoints(pointIndex, this.accumulation);
            this.deExplodeAll(pointIndex, this.accumulation.enableAnimation ? 300 : 0);
        }
    };
    /**
     * To invoke the explode on accumulation chart loading.
     *
     * @private
     * @returns {void}
     */
    AccumulationBase.prototype.invokeExplode = function () {
        var series = this.accumulation.visibleSeries[0];
        var duration = this.accumulation.enableAnimation ? 300 : 0;
        for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
            var point = _a[_i];
            if (point.isExplode && point.y !== 0) {
                this.pointExplode(point.index, point, duration);
            }
        }
        if (this.accumulation.accumulationSelectionModule && this.accumulation.selectionMode !== 'None' &&
            this.accumulation.accumulationSelectionModule.selectedDataIndexes.length) {
            for (var _b = 0, _c = this.accumulation.accumulationSelectionModule.selectedDataIndexes; _b < _c.length; _b++) {
                var index = _c[_b];
                this.explodePoints(index.point, this.accumulation, true);
                this.deExplodeAll(index.point, duration);
            }
        }
    };
    /**
     * To deExplode all points in the series.
     *
     * @private
     * @param {number} index - The index of the point to explode.
     * @param {number} animationDuration - The duration of the animation.
     * @returns {void}
     */
    AccumulationBase.prototype.deExplodeAll = function (index, animationDuration) {
        var pointId = this.accumulation.element.id + '_Series_0_Point_';
        var points = this.accumulation.visibleSeries[0].points;
        for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
            var currentPoint = points_1[_i];
            if ((index !== currentPoint.index && !currentPoint.isSliced) || currentPoint.isClubbed) {
                currentPoint.isExplode = false;
                this.deExplodeSlice(currentPoint.index, pointId, animationDuration);
            }
        }
    };
    /**
     * To explode point by index.
     *
     * @private
     * @param {number} index - The index of the point to explode.
     * @param {AccumulationChart} chart - The accumulation chart control.
     * @param {boolean} explode - Specifies whether to explode the point (default: false).
     * @param {boolean} pointAnimation - Specifies whether the point based animation is enabled.
     * @returns {void}
     */
    AccumulationBase.prototype.explodePoints = function (index, chart, explode, pointAnimation) {
        if (explode === void 0) { explode = false; }
        var series = chart.visibleSeries[0];
        var points = series.points;
        var point = pointByIndex(index, points);
        var explodePoints = true;
        var duration = this.accumulation.enableAnimation ? 300 : 0;
        if (isNullOrUndefined(point)) {
            return null;
        }
        var clubPointsExploded = !explode &&
            (point.isSliced || (series.clubbedPoints.length &&
                points[points.length - 1].index === series.clubbedPoints[series.clubbedPoints.length - 1].index));
        if (series.type === 'Pie' && (clubPointsExploded || point.isClubbed)) {
            explodePoints = this.clubPointExplode(index, point, series, points, chart, duration, clubPointsExploded);
        }
        if (explodePoints && point.y !== 0) {
            this.pointExplode(index, point, duration, explode, pointAnimation);
        }
    };
    AccumulationBase.prototype.getSum = function (points) {
        var total = 0;
        points.map(function (point) {
            total += point.visible ? point.y : 0;
        });
        return total;
    };
    AccumulationBase.prototype.clubPointExplode = function (index, point, series, points, chart, duration, clubPointsExploded) {
        if (clubPointsExploded === void 0) { clubPointsExploded = false; }
        if (point.isClubbed) {
            chart.animateSeries = false;
            points.splice(points.length - 1, 1);
            series.clubbedPoints.map(function (point) {
                point.visible = true;
                point.isExplode = true;
            });
            chart.visibleSeries[0].points = points.concat(series.clubbedPoints);
            this.deExplodeAll(index, duration);
            series.sumOfPoints = this.getSum(chart.visibleSeries[0].points);
            chart.refreshChart();
            return false;
        }
        else if (clubPointsExploded || point.isSliced) {
            chart.animateSeries = false;
            points.splice(points.length - series.clubbedPoints.length, series.clubbedPoints.length);
            var clubPoint = series.generateClubPoint();
            clubPoint.index = points.length;
            clubPoint.color = series.clubbedPoints[0].color;
            points.push(clubPoint);
            series.sumOfPoints = this.getSum(points);
            this.deExplodeAll(index, duration);
            clubPoint.isExplode = false;
            chart.visibleSeries[0].points = points;
            chart.refreshChart();
            this.pointExplode(clubPoint.index, points[clubPoint.index], 0, true);
            clubPoint.isExplode = false;
            this.deExplodeSlice(clubPoint.index, chart.element.id + '_Series_0_Point_', duration);
            if (point.isSliced) {
                return false;
            }
        }
        return true;
    };
    /**
     * To Explode points.
     *
     * @param {number} index - Index of a point.
     * @param {AccPoints} point - To get the point of explode.
     * @param {number} duration - Duration of the explode point.
     * @param {boolean} explode - Either true or false.
     * @param {boolean} pointAnimation - Specifies whether the point based animation is enabled.
     * @returns {void}
     */
    AccumulationBase.prototype.pointExplode = function (index, point, duration, explode, pointAnimation) {
        var translate;
        var pointId = this.accumulation.element.id + '_Series_0_Point_';
        var chart = this.accumulation;
        if (!this.isCircular()) {
            translate = {
                x: ((point.labelRegion && point.labelRegion.x < point.region.x) ? -chart.explodeDistance :
                    chart.explodeDistance), y: 0
            };
        }
        else {
            translate = degreeToLocation(point.midAngle, chart.explodeDistance, this.center);
        }
        if (this.isExplode(pointId + index) || explode) {
            point.isExplode = true;
            this.explodeSlice(index, translate, pointId, this.center || { x: 0, y: 0 }, duration, pointAnimation);
        }
        else {
            point.isExplode = false;
            this.deExplodeSlice(index, pointId, duration);
        }
    };
    /**
     * To check point is exploded by id.
     *
     * @param {string} id - The id of the point to check.
     * @returns {boolean} - True if the point is exploded, otherwise false.
     */
    AccumulationBase.prototype.isExplode = function (id) {
        var element = getElement(id);
        var transform = element ? element.getAttribute('transform') : null;
        return (element && (transform === 'translate(0, 0)' || transform === null || transform === 'translate(0)'));
    };
    /**
     * To deExplode the point by index.
     *
     * @param {number} index - The index of the point.
     * @param {string} sliceId - The id of the slice.
     * @param {number} animationDuration - The duration of the animation.
     * @returns {void}
     */
    AccumulationBase.prototype.deExplodeSlice = function (index, sliceId, animationDuration) {
        var element = getElement(sliceId + index);
        var transform = element ? element.getAttribute('transform') : null;
        if (this.accumulation.enableAnimation && element && transform &&
            transform !== 'translate(0, 0)' && transform !== 'translate(0)') {
            var result = transform.split('(')[1].split(')')[0].split(',');
            this.performAnimation(index, sliceId, 0, 0, +result[0], +result[1] || 0, animationDuration, true);
        }
        else {
            this.performAnimation(index, sliceId, 0, 0, 0, 0, animationDuration, true);
        }
    };
    /**
     * To translate the point elements by index and position.
     *
     * @param {number} index - The index of the point.
     * @param {string} sliceId - The id of the slice.
     * @param {string} position - The position to translate the point to.
     * @param {string} transform - The transformation to apply to the point.
     * @returns {void}
     */
    AccumulationBase.prototype.setTranslate = function (index, sliceId, position, transform) {
        this.setElementTransform(sliceId + index, position);
        this.setElementTransform(sliceId + index + '_polygon', position);
        if (this.accumulation.visibleSeries[0].dataLabel.visible) {
            sliceId = this.accumulation.element.id + '_datalabel_Series_0_';
            this.setElementTransform(sliceId + 'shape_' + index, position);
            this.setElementTransform(sliceId + 'text_' + index, position + transform);
            this.setElementTransform(sliceId + 'connector_' + index, position);
        }
    };
    /**
     * To translate the point element by id and position.
     *
     * @param {string} id - The id of the point element.
     * @param {string} position - The position to translate the point to.
     * @returns {void}
     */
    AccumulationBase.prototype.setElementTransform = function (id, position) {
        var element = getElement(id);
        if (element) {
            element.setAttribute('transform', position);
        }
    };
    /**
     * To translate the point elements by index position.
     *
     * @param {number} index - The index of the point.
     * @param {ChartLocation} translate - The translation values (x, y).
     * @param {string} sliceId - The id of the slice.
     * @param {ChartLocation} center - The center point of the accumulation chart.
     * @param {number} animationDuration - The duration of the animation.
     * @param {boolean} pointAnimation - Specifies whether the point based animation is enabled.
     * @returns {void}
     */
    AccumulationBase.prototype.explodeSlice = function (index, translate, sliceId, center, animationDuration, pointAnimation) {
        if (pointAnimation
            && getElement(this.accumulation.element.id + '_Series_0_Point_' + index).getAttribute('transform')) {
            this.setElementTransform(sliceId + index, "translate(" + (translate.x - center.x) + ", " + (translate.y - center.y) + ")");
        }
        else {
            this.performAnimation(index, sliceId, 0, 0, translate.x - center.x, translate.y - center.y, animationDuration);
        }
    };
    /**
     * To Perform animation point explode.
     *
     * @param {number} index - Index of the series.
     * @param {string} sliceId - ID of the series.
     * @param {number} startX - X value of start.
     * @param {number} startY - Y value of start.
     * @param {number} endX - X value of end.
     * @param {number} endY - Y value of end.
     * @param {number} duration - Duration of the animation.
     * @param {boolean} isReverse - Duration of the animation.
     * @returns {void}
     */
    AccumulationBase.prototype.performAnimation = function (index, sliceId, startX, startY, endX, endY, duration, isReverse) {
        var _this = this;
        var chart = this.accumulation;
        var values = sliceId.split('_');
        var seriesIndex = parseInt(sliceId.split('_')[values.length - 3], 10);
        var point = chart.visibleSeries[seriesIndex].points[index];
        if (duration <= 0) {
            this.setTranslate(index, sliceId, 'translate(' + (endX) + ', ' + (endY) + ')', point.transform);
            return null;
        }
        var xValue;
        var yValue;
        var delay = (this.accumulation.series[seriesIndex].type === 'Pie')
            && (this.accumulation.animateSeries) && (this.accumulation.series[0].animation.enable)
            ? this.accumulation.series[0].animation.duration : 0;
        new Animation({}).animate(createElement('div'), {
            duration: duration,
            delay: delay,
            progress: function (args) {
                xValue = linear(args.timeStamp, startX, endX, args.duration);
                yValue = linear(args.timeStamp, startY, endY, args.duration);
                _this.setTranslate(index, sliceId, 'translate(' + (isReverse ? endX - xValue : xValue) + ', ' + (isReverse ? endY - yValue : yValue) + ')', point.transform);
            },
            end: function () {
                _this.setTranslate(index, sliceId, 'translate(' + (isReverse ? startX : endX) + ', ' + (isReverse ? startX : endY) + ')', point.transform);
            }
        });
    };
    return AccumulationBase;
}());
export { AccumulationBase };
