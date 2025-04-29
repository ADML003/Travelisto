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
/**
 * Accumulation charts base file
 */
import { Animation, animationMode, isNullOrUndefined } from '@syncfusion/ej2-base';
import { stringToNumber, ChartLocation, degreeToLocation, getAnimationFunction, getElement, markerAnimate } from '../../common/utils/helper';
import { Rect } from '@syncfusion/ej2-svg-base';
import { animationComplete } from '../../common/model/constants';
import { AccumulationBase } from './accumulation-base';
/**
 * The `PieBase` class is used to perform base calculations for the `Pie` series.
 *
 * @private
 */
var PieBase = /** @class */ (function (_super) {
    __extends(PieBase, _super);
    function PieBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * To initialize the property values.
     *
     * @private
     * @param {AccumulationChart} chart - The accumulation chart control.
     * @param {AccumulationSeries} series - The series for which the properties are initialized.
     * @returns {void}
     */
    PieBase.prototype.initProperties = function (chart, series) {
        this.accumulation = chart;
        this.size = Math.min(chart.initialClipRect.width, chart.initialClipRect.height);
        this.initAngles(series);
        var r = parseInt(series.radius, 10);
        if ((series.radius.indexOf('%') !== -1 || typeof r === 'number') && !isNaN(r)) {
            this.isRadiusMapped = false;
            this.pieBaseRadius = stringToNumber(series.radius, this.size / 2);
            this.innerRadius = stringToNumber(series.innerRadius, this.pieBaseRadius);
            this.pieBaseLabelRadius = series.dataLabel.position === 'Inside' ? (((this.pieBaseRadius - this.innerRadius) / 2) + this.innerRadius) :
                (this.pieBaseRadius + stringToNumber(series.dataLabel.connectorStyle.length || '4%', this.size / 2));
        }
        else {
            var radiusCollection = [];
            this.isRadiusMapped = true;
            for (var i = 0; i < Object.keys(series.points).length; i++) {
                if (series.points[i].sliceRadius.indexOf('%') !== -1) {
                    radiusCollection[i] = stringToNumber(series.points[i].sliceRadius, this.size / 2);
                }
                else {
                    radiusCollection[i] = parseInt(series.points[i].sliceRadius, 10);
                }
            }
            var minRadius = Math.min.apply(null, radiusCollection);
            var maxRadius = Math.max.apply(null, radiusCollection);
            this.pieBaseRadius = this.seriesRadius = maxRadius;
            this.innerRadius = stringToNumber(series.innerRadius, this.seriesRadius);
            this.innerRadius = this.innerRadius > minRadius ? (this.innerRadius / 2) : this.innerRadius;
        }
        // this.radius = stringToNumber(series.radius, size / 2);
        // this.innerRadius = stringToNumber(series.innerRadius, this.radius);
        // this.labelRadius = series.dataLabel.position === 'Inside' ? (((this.radius - this.innerRadius) / 2) + this.innerRadius) :
        //     (this.radius + stringToNumber(series.dataLabel.connectorStyle.length || '4%', size / 2));
        this.radius = this.pieBaseRadius;
        this.labelRadius = this.pieBaseLabelRadius;
        chart.explodeDistance = series.explode ? stringToNumber(series.explodeOffset, this.pieBaseRadius) : 0;
        this.findCenter(chart, series);
        this.center = this.pieBaseCenter;
        if (!chart.redraw) {
            this.defaultLabelBound(series, series.dataLabel.visible, series.dataLabel.position);
        }
        this.totalAngle -= 0.001;
    };
    /*
     * To get label radius of the pie.
     * @private
     */
    PieBase.prototype.getLabelRadius = function (series, point) {
        return series.dataLabel.position === 'Inside' ?
            ((((stringToNumber(point.sliceRadius, this.pieBaseRadius) - this.innerRadius)) / 2) + this.innerRadius) :
            (stringToNumber(point.sliceRadius, this.size / 2) + stringToNumber(series.dataLabel.connectorStyle.length || '4%', this.size / 2));
    };
    /**
     * To find the center of the accumulation.
     *
     * @private
     * @param {AccumulationChart} accumulation - The accumulation chart control.
     * @param {AccumulationSeries} series - The series for which the center is calculated.
     * @returns {void}
     */
    PieBase.prototype.findCenter = function (accumulation, series) {
        this.accumulation = accumulation;
        this.pieBaseCenter = {
            x: stringToNumber(accumulation.center.x, accumulation.initialClipRect.width) + (accumulation.initialClipRect.x),
            y: stringToNumber(accumulation.center.y, accumulation.initialClipRect.height) + (accumulation.initialClipRect.y)
        };
        var accumulationRect = this.getSeriesBound(series);
        var accumulationRectCenter = new ChartLocation(accumulationRect.x + accumulationRect.width / 2, accumulationRect.y + accumulationRect.height / 2);
        this.pieBaseCenter.x += (this.pieBaseCenter.x - accumulationRectCenter.x);
        this.pieBaseCenter.y += (this.pieBaseCenter.y - accumulationRectCenter.y);
        this.accumulation.origin = this.pieBaseCenter;
    };
    /**
     * To find angles from series.
     *
     * @param {AccumulationSeries} series - The series for which to calculate angles.
     * @returns {void}
     */
    PieBase.prototype.initAngles = function (series) {
        var endAngle = isNullOrUndefined(series.endAngle) ? series.startAngle : series.endAngle;
        this.totalAngle = (endAngle - series.startAngle) % 360;
        this.startAngle = series.startAngle - 90;
        this.totalAngle = this.totalAngle <= 0 ? (360 + this.totalAngle) : this.totalAngle;
        this.startAngle = (this.startAngle < 0 ? (this.startAngle + 360) : this.startAngle) % 360;
    };
    /**
     * To calculate data-label bound.
     *
     * @private
     * @param {AccumulationSeries} series - The series for which to calculate data-label bounds.
     * @param {boolean} visible - Indicates whether the data-labels are visible.
     * @param {AccumulationLabelPosition} position - The position of the data-labels.
     * @returns {void}
     */
    PieBase.prototype.defaultLabelBound = function (series, visible, position) {
        var accumulationBound = this.getSeriesBound(series);
        series.accumulationBound = accumulationBound;
        series.labelBound = new Rect(accumulationBound.x, accumulationBound.y, accumulationBound.width + accumulationBound.x, accumulationBound.height + accumulationBound.y);
        if (visible && position === 'Outside') {
            series.labelBound = new Rect(Infinity, Infinity, -Infinity, -Infinity);
        }
    };
    /**
     * To calculate series bound.
     *
     * @private
     * @param {AccumulationSeries} series - The series for which to calculate the bound.
     * @returns {Rect} - Returns a rect.
     */
    PieBase.prototype.getSeriesBound = function (series) {
        var rect = new Rect(Infinity, Infinity, -Infinity, -Infinity);
        this.initAngles(series);
        var start = this.startAngle;
        var total = this.totalAngle;
        var end = (this.startAngle + total) % 360;
        end = (end === 0) ? 360 : end;
        series.findMaxBounds(rect, this.getRectFromAngle(start));
        series.findMaxBounds(rect, this.getRectFromAngle(end));
        series.findMaxBounds(rect, new Rect(this.pieBaseCenter.x, this.pieBaseCenter.y, 0, 0));
        var nextQuandrant = (Math.floor(start / 90) * 90 + 90) % 360;
        var lastQuadrant = (Math.floor(end / 90) * 90) % 360;
        lastQuadrant = (lastQuadrant === 0) ? 360 : lastQuadrant;
        if (total >= 90 || lastQuadrant === nextQuandrant) {
            series.findMaxBounds(rect, this.getRectFromAngle(nextQuandrant));
            series.findMaxBounds(rect, this.getRectFromAngle(lastQuadrant));
        }
        if (start === 0 || (start + total >= 360)) {
            series.findMaxBounds(rect, this.getRectFromAngle(0));
        }
        var length = nextQuandrant === lastQuadrant ? 0 : Math.floor(total / 90);
        for (var i = 1; i < length; i++) {
            nextQuandrant = nextQuandrant + 90;
            if ((nextQuandrant < lastQuadrant || end < start) || total === 360) {
                series.findMaxBounds(rect, this.getRectFromAngle(nextQuandrant));
            }
        }
        rect.width -= rect.x;
        rect.height -= rect.y;
        return rect;
    };
    /**
     * To get rect location size from angle.
     *
     * @param {number} angle - The angle in degrees.
     * @returns {Rect} - The rect representing the location size from angle.
     */
    PieBase.prototype.getRectFromAngle = function (angle) {
        var location = degreeToLocation(angle, this.pieBaseRadius, this.pieBaseCenter);
        return new Rect(location.x, location.y, 0, 0);
    };
    /**
     * To get path arc direction.
     *
     * @param {ChartLocation} center - The center coordinates of the arc.
     * @param {number} start - The starting angle of the arc in degrees.
     * @param {number} end - The ending angle of the arc in degrees.
     * @param {number} radius - The radius of the arc.
     * @param {number} innerRadius - The inner radius of the arc.
     * @param {number} borderRadius - The border radius of the arc.
     * @param {boolean} isBorder - It specifies whether it is for rendering a border.
     * @param {AccPoints[]} seriesPoints - The points of the series.
     * @returns {string} - The path string representing the arc direction.
     */
    PieBase.prototype.getPathArc = function (center, start, end, radius, innerRadius, borderRadius, isBorder, seriesPoints) {
        var degree = end - start;
        degree = degree < 0 ? (degree + 360) : degree;
        var flag = (degree < 180) ? 0 : 1;
        if (!innerRadius && innerRadius === 0) {
            return this.getPiePath(center, degreeToLocation(start, radius, center), degreeToLocation(end, radius, center), radius, flag, borderRadius, seriesPoints);
        }
        else {
            return this.getDoughnutPath(center, degreeToLocation(start, radius, center), degreeToLocation(end, radius, center), radius, degreeToLocation(start, innerRadius, center), degreeToLocation(end, innerRadius, center), innerRadius, flag, borderRadius, isBorder, seriesPoints);
        }
    };
    /**
     * To get pie direction.
     *
     * @param {ChartLocation} center - The center of the pie.
     * @param {ChartLocation} start - The starting location of the pie.
     * @param {ChartLocation} end - The ending location of the pie.
     * @param {number} radius - The radius of the pie.
     * @param {number} clockWise - The direction of the pie.
     * @param {number} cornerRadius - The border radius of the arc.
     * @param {AccPoints[]} seriesPoints - The points of the series.
     * @returns {string} - The path direction for the pie.
     */
    PieBase.prototype.getPiePath = function (center, start, end, radius, clockWise, cornerRadius, seriesPoints) {
        var sliceCount = this.sliceCheck(seriesPoints);
        cornerRadius = sliceCount === 1 ? 0 : cornerRadius;
        var startAngle = Math.atan2(start.y - center.y, start.x - center.x);
        var endAngle = Math.atan2(end.y - center.y, end.x - center.x);
        cornerRadius = this.adjustCornerRadius(startAngle, endAngle, radius, cornerRadius);
        var x1 = start.x - cornerRadius * Math.cos(startAngle);
        var y1 = start.y - cornerRadius * Math.sin(startAngle);
        var x2 = end.x - cornerRadius * Math.cos(Math.PI / 2 + endAngle);
        var y2 = end.y - cornerRadius * Math.sin(Math.PI / 2 + endAngle);
        var cx2 = end.x - cornerRadius * Math.cos(endAngle);
        var cy2 = end.y - cornerRadius * Math.sin(endAngle);
        var cx1 = start.x + cornerRadius * Math.cos(Math.PI / 2 + startAngle);
        var cy1 = start.y + cornerRadius * Math.sin(Math.PI / 2 + startAngle);
        return "M " + center.x + " " + center.y + " L " + x1 + " " + y1 + " A " + cornerRadius + " " + cornerRadius + " 0 0 1 " + cx1 + " " + cy1 + " A " + radius + " " + radius + " 0 " + clockWise + " 1 " + x2 + " " + y2 + " A " + cornerRadius + " " + cornerRadius + " 0 0 1 " + cx2 + " " + cy2 + " Z";
    };
    /**
     * To get doughnut direction.
     *
     * @param {ChartLocation} center - The center of the doughnut.
     * @param {ChartLocation} start - The starting location of the outer doughnut.
     * @param {ChartLocation} end - The ending location of the outer doughnut.
     * @param {number} radius - The radius of the outer doughnut.
     * @param {ChartLocation} innerStart - The starting location of the inner doughnut.
     * @param {ChartLocation} innerEnd - The ending location of the inner doughnut.
     * @param {number} innerRadius - The radius of the inner doughnut.
     * @param {number} clockWise - The direction of the doughnut.
     * @param {number} cornerRadius - The border radius of the arc.
     * @param {boolean} isBorder - It specifies whether it is for rendering a border.
     * @param {AccPoints[]} seriesPoints - The points of the series.
     * @returns {string} - The path direction for the doughnut.
     */
    PieBase.prototype.getDoughnutPath = function (center, start, end, radius, innerStart, innerEnd, innerRadius, clockWise, cornerRadius, isBorder, seriesPoints) {
        var sliceCount = this.sliceCheck(seriesPoints);
        cornerRadius = sliceCount === 1 ? 0 : cornerRadius;
        var startAngle = Math.atan2(start.y - innerStart.y, start.x - innerStart.x);
        var endAngle = Math.atan2(end.y - innerEnd.y, end.x - innerEnd.x);
        cornerRadius = this.adjustCornerRadius(startAngle, endAngle, innerRadius, cornerRadius);
        cornerRadius = (isBorder && (this.innerRadius === 0)) ? cornerRadius * -1 : cornerRadius;
        var x1 = start.x - cornerRadius * Math.cos(startAngle);
        var y1 = start.y - cornerRadius * Math.sin(startAngle);
        var x2 = end.x - cornerRadius * Math.cos(Math.PI / 2 + endAngle);
        var y2 = end.y - cornerRadius * Math.sin(Math.PI / 2 + endAngle);
        var x3 = innerEnd.x + cornerRadius * Math.cos(endAngle);
        var y3 = innerEnd.y + cornerRadius * Math.sin(endAngle);
        var x4 = innerStart.x + cornerRadius * Math.cos(Math.PI / 2 + startAngle);
        var y4 = innerStart.y + cornerRadius * Math.sin(Math.PI / 2 + startAngle);
        var cx1 = start.x + cornerRadius * Math.cos(Math.PI / 2 + startAngle);
        var cy1 = start.y + cornerRadius * Math.sin(Math.PI / 2 + startAngle);
        var cx2 = end.x - cornerRadius * Math.cos(endAngle);
        var cy2 = end.y - cornerRadius * Math.sin(endAngle);
        var cx3 = innerEnd.x - cornerRadius * Math.cos(Math.PI / 2 + endAngle);
        var cy3 = innerEnd.y - cornerRadius * Math.sin(Math.PI / 2 + endAngle);
        var cx4 = innerStart.x + cornerRadius * Math.cos(startAngle);
        var cy4 = innerStart.y + cornerRadius * Math.sin(startAngle);
        if (isBorder) {
            return "M " + cx1 + " " + cy1 + " A " + radius + " " + radius + " 0 " + clockWise + " 1 " + x2 + " " + y2 + " L " + cx3 + " " + cy3 + " A " + innerRadius + " " + innerRadius + " 0 " + clockWise + " 0 " + x4 + " " + y4 + " Z";
        }
        else {
            return "M " + x1 + " " + y1 + " A " + cornerRadius + " " + cornerRadius + " 0 0 1 " + cx1 + " " + cy1 + " A " + radius + " " + radius + " 0 " + clockWise + " 1 " + x2 + " " + y2 + " A " + cornerRadius + " " + cornerRadius + " 0 0 1 " + cx2 + " " + cy2 + " L " + x3 + " " + y3 + " A " + cornerRadius + " " + cornerRadius + " 0 0 1 " + cx3 + " " + cy3 + " A " + innerRadius + " " + innerRadius + " 0 " + clockWise + " 0 " + x4 + " " + y4 + " A " + cornerRadius + " " + cornerRadius + " 0 0 1 " + cx4 + " " + cy4 + " Z";
        }
    };
    /**
     * Adjusts the corner radius of a pie chart slice based on the angle of the slice.
     * Ensures that the corner radius does not exceed a value that would cause the arcs
     * of the slice to overlap or create an invalid shape.
     *
     * @param {number} startAngle - The start angle of the pie.
     * @param {number} endAngle - The end angle of the pie.
     * @param {number} radius - The radius of the pie.
     * @param {number} cornerRadius - The border radius of the arc.
     * @returns {number} - The adjusted corner radius of the pie.
     */
    PieBase.prototype.adjustCornerRadius = function (startAngle, endAngle, radius, cornerRadius) {
        var anglePerSlice = Math.abs(endAngle - startAngle);
        if (anglePerSlice > Math.PI) {
            anglePerSlice = 2 * Math.PI - anglePerSlice; // Handle large angles that cross the -PI to PI boundary
        }
        // Adjust corner radius based on the angle per slice
        var angleFactor = anglePerSlice / (2 * Math.PI);
        var adjustedCornerRadius = radius * angleFactor;
        return Math.min(cornerRadius, adjustedCornerRadius);
    };
    /**
     * To Check slice count.
     *
     * @param {AccPoints[]} seriesPoints - The points of the series.
     * @returns {number} - The number of visible pie slice.
     */
    PieBase.prototype.sliceCheck = function (seriesPoints) {
        var isOneSlice = 0;
        for (var index = 0; index < seriesPoints.length; index++) {
            var point = seriesPoints[index];
            if (point.visible) {
                isOneSlice++;
            }
        }
        return isOneSlice;
    };
    /**
     * Method to start animation for pie series.
     *
     * @param {Element} slice - The slice element to animate.
     * @param {AccumulationSeries} series - The accumulation chart control.
     * @param {Element} groupElement - The group element containing the pie series.
     * @param {number} borderRadius - The border radius of the arc.
     * @param {AccPoints[]} seriesPoints - The points of the series.
     * @returns {void}
     */
    PieBase.prototype.doAnimation = function (slice, series, groupElement, borderRadius, seriesPoints) {
        var _this = this;
        var startAngle = series.startAngle - 90;
        var duration = this.accumulation.duration ? this.accumulation.duration : series.animation.duration;
        var value;
        this.pieBaseCenter.x += 1;
        var radius = Math.max(this.accumulation.availableSize.height, this.accumulation.availableSize.width) * 0.75;
        radius += radius * (0.414); // formula r + r / 2 * (1.414 -1)
        var effect = getAnimationFunction('Linear'); // need to check animation type
        new Animation({}).animate(slice, {
            duration: (duration === 0 && animationMode === 'Enable') ? 1000 : duration,
            delay: series.animation.delay,
            progress: function (args) {
                value = effect(args.timeStamp, startAngle, _this.totalAngle, args.duration);
                slice.setAttribute('d', _this.getPathArc(_this.pieBaseCenter, startAngle, value, radius, 0, borderRadius, false, seriesPoints));
            },
            end: function () {
                _this.pieBaseCenter.x -= 1;
                slice.setAttribute('d', _this.getPathArc(_this.pieBaseCenter, 0, 359.99999, radius, 0, borderRadius, false, seriesPoints));
                _this.accumulation.trigger(animationComplete, _this.accumulation.isBlazor ? {} :
                    { series: series, accumulation: _this.accumulation, chart: _this.accumulation });
                var datalabelGroup = getElement(_this.accumulation.element.id + '_datalabel_Series_' + series.index);
                if (datalabelGroup) {
                    markerAnimate(datalabelGroup, series.animation.delay, series.animation.duration, series, null, null, false);
                }
                groupElement.style.cssText = '';
                var annotationElement = getElement(_this.accumulation.element.id + '_Annotation_Collections');
                if (annotationElement) {
                    annotationElement.style.visibility = 'visible';
                }
            }
        });
    };
    return PieBase;
}(AccumulationBase));
export { PieBase };
