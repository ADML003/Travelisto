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
import { withInRange, getPoint, TransformToVisible } from '../../common/utils/helper';
import { PathOption } from '@syncfusion/ej2-svg-base';
import { LineBase } from './line-base';
/**
 * The `LineSeries` module is used to render the line series.
 */
var LineSeries = /** @class */ (function (_super) {
    __extends(LineSeries, _super);
    function LineSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Renders the line series based on the provided axis and inversion status.
     *
     * @param {Series} series - The series to render.
     * @param {Axis} xAxis - The X-axis associated with the series.
     * @param {Axis} yAxis - The Y-axis associated with the series.
     * @param {boolean} isInverted - Specifies whether the chart is inverted.
     * @param {boolean} pointAnimate - Specifies whether the point has to be animated or not.
     * @param {boolean} pointUpdate - Specifies whether the point has to be updated or not.
     * @returns {void}
     * @private
     */
    LineSeries.prototype.render = function (series, xAxis, yAxis, isInverted, pointAnimate, pointUpdate) {
        var point1;
        var point2;
        var direction = '';
        var prevPoint = null;
        var startPoint = 'M';
        var isPolar = (series.chart && series.chart.chartAreaType === 'PolarRadar');
        var isDrop = (series.emptyPointSettings && series.emptyPointSettings.mode === 'Drop');
        var getCoordinate = isPolar ? TransformToVisible : getPoint;
        var visiblePoints = series.category === 'TrendLine' ? series.points : this.enableComplexProperty(series);
        for (var _i = 0, visiblePoints_1 = visiblePoints; _i < visiblePoints_1.length; _i++) {
            var point = visiblePoints_1[_i];
            point.regions = [];
            point.symbolLocations = [];
            if (point.visible && withInRange(visiblePoints[point.index - 1], point, visiblePoints[point.index + 1], series)) {
                direction += this.getLineDirection(prevPoint, point, series, isInverted, getCoordinate, startPoint);
                startPoint = prevPoint ? 'L' : startPoint;
                prevPoint = point;
                this.storePointLocation(point, series, isInverted, getCoordinate);
                if (direction === '' && visiblePoints.length === 1) {
                    direction = 'M ' + point.symbolLocations[0].x + ' ' + point.symbolLocations[0].y;
                }
            }
            else {
                prevPoint = isDrop ? prevPoint : null;
                startPoint = isDrop ? startPoint : 'M';
            }
        }
        if (isPolar) {
            if (series.isClosed) {
                var points = this.getFirstLastVisiblePoint(visiblePoints);
                point2 = getCoordinate(points.last.xValue, points.last.yValue, xAxis, yAxis, isInverted, series);
                point1 = getCoordinate(points.first.xValue, points.first.yValue, xAxis, yAxis, isInverted, series);
                direction = direction.concat(startPoint + ' ' + point2.x + ' ' + point2.y + ' ' + 'L' + ' ' + point1.x + ' ' + point1.y);
            }
        }
        var name = series.category === 'Indicator' ? series.chart.element.id + '_Indicator_' + series.index + '_' + series.name :
            series.category === 'TrendLine' ? series.chart.element.id + '_Series_' + series.sourceIndex + '_TrendLine_' + series.index :
                series.chart.element.id + '_Series_' + (series.index === undefined ? series.category : series.index);
        var options = new PathOption(name, 'none', series.width, series.interior, series.opacity, series.dashArray, direction);
        this[pointAnimate ? 'addPath' : 'appendLinePath'](options, series, '');
        if (!pointUpdate) {
            this.renderMarker(series);
        }
    };
    /**
     * To animate point for line series.
     *
     * @returns {void}
     * @private
     */
    LineSeries.prototype.updateDirection = function (series, point) {
        this.render(series, series.xAxis, series.yAxis, series.chart.requireInvertedAxis, false, true);
        for (var i = 0; i < point.length; i++) {
            if (series.marker && series.marker.visible) {
                series.chart.markerRender.renderMarker(series, series.points[point[i]], series.points[point[i]].symbolLocations[0], null, true);
            }
            if (series.marker.dataLabel.visible && series.chart.dataLabelModule) {
                series.chart.dataLabelModule.commonId = series.chart.element.id + '_Series_' + series.index + '_Point_';
                series.chart.dataLabelModule.renderDataLabel(series, series.points[point[i]], null, series.marker.dataLabel);
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
    LineSeries.prototype.doAnimation = function (series) {
        var option = series.animation;
        this.doProgressiveAnimation(series, option);
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    LineSeries.prototype.getModuleName = function () {
        /**
         * Returns the module name of the series
         */
        return 'LineSeries';
    };
    /**
     * To destroy the line series.
     *
     * @returns {void}
     * @private
     */
    LineSeries.prototype.destroy = function () {
        /**
         * Destroy method performed here.
         */
    };
    return LineSeries;
}(LineBase));
export { LineSeries };
