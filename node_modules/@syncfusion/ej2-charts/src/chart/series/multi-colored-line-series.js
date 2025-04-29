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
import { withInRange, getPoint } from '../../common/utils/helper';
import { PathOption } from '@syncfusion/ej2-svg-base';
import { MultiColoredSeries } from './multi-colored-base';
/**
 * The `MultiColoredLineSeries` module is used to render line series with multiple colors.
 */
var MultiColoredLineSeries = /** @class */ (function (_super) {
    __extends(MultiColoredLineSeries, _super);
    function MultiColoredLineSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Render the multi colored line series on the chart.
     *
     * @param {Series} series - The series to be rendered.
     * @param {Axis} xAxis - The x-axis of the chart.
     * @param {Axis} yAxis - The y-axis of the chart.
     * @param {boolean} isInverted - Indicates whether the chart is inverted.
     * @param {boolean} pointAnimate - Specifies whether the point has to be animated or not.
     * @param {boolean} pointUpdate - Specifies whether the point has to be updated or not.
     * @returns {void}
     * @private
     */
    MultiColoredLineSeries.prototype.render = function (series, xAxis, yAxis, isInverted, pointAnimate, pointUpdate) {
        var previous = null;
        var startPoint = 'M';
        var visiblePoints = this.enableComplexProperty(series);
        var options = [];
        var direction = '';
        var lastPoint;
        var segmentPoint = null;
        var segments = this.sortSegments(series, series.segments);
        for (var _i = 0, visiblePoints_1 = visiblePoints; _i < visiblePoints_1.length; _i++) {
            var point = visiblePoints_1[_i];
            point.regions = [];
            if (point.visible && withInRange(visiblePoints[point.index - 1], point, visiblePoints[point.index + 1], series)) {
                lastPoint = point;
                direction += this.getLineDirection(previous, point, series, isInverted, getPoint, startPoint);
                if (previous != null) {
                    if (this.setPointColor(point, previous, series, series.segmentAxis === 'X', segments)) {
                        options.push(new PathOption(series.chart.element.id + '_Series_' + series.index + '_Point_' + previous.index, 'none', series.width, series.setPointColor(previous, series.interior), series.opacity, series.dashArray, direction));
                        startPoint = 'M';
                        direction = '';
                    }
                    else {
                        startPoint = 'L';
                    }
                }
                else {
                    if (this.setPointColor(point, segmentPoint, series, series.segmentAxis === 'X', segments) && direction !== '') {
                        options.push(new PathOption(series.chart.element.id + '_Series_' + series.index + '_Point_' + segmentPoint.index, 'none', series.width, series.setPointColor(segmentPoint, series.interior), series.opacity, series.dashArray, direction));
                        startPoint = 'M';
                        direction = '';
                    }
                }
                previous = point;
                segmentPoint = point;
                this.storePointLocation(point, series, isInverted, getPoint);
            }
            else {
                previous = (series.emptyPointSettings.mode === 'Drop') ? previous : null;
                startPoint = (series.emptyPointSettings.mode === 'Drop') ? startPoint : 'M';
                point.symbolLocations = [];
            }
        }
        if (direction !== '') {
            options.push(new PathOption(series.chart.element.id + '_Series_' + series.index, 'none', series.width, series.setPointColor(lastPoint, series.interior), series.opacity, series.dashArray, direction));
        }
        this.applySegmentAxis(series, options, segments, pointAnimate);
        if (!pointUpdate) {
            this.renderMarker(series);
        }
    };
    /**
     * To animate point for multicolored line series.
     *
     * @param {Series} series - Specifies the series.
     * @param {number} point - Specifies the point.
     * @returns {void}
     * @private
     */
    MultiColoredLineSeries.prototype.updateDirection = function (series, point) {
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
    MultiColoredLineSeries.prototype.doAnimation = function (series) {
        this.doLinearAnimation(series, series.animation);
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    MultiColoredLineSeries.prototype.getModuleName = function () {
        /**
         * Returns the module name of the series.
         */
        return 'MultiColoredLineSeries';
    };
    /**
     * To destroy the line series.
     *
     * @returns {void}
     * @private
     */
    MultiColoredLineSeries.prototype.destroy = function () {
        /**
         * Destroy method performed here.
         */
    };
    return MultiColoredLineSeries;
}(MultiColoredSeries));
export { MultiColoredLineSeries };
