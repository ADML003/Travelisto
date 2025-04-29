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
import { ColumnBase } from './column-base';
/**
 * The `RangeColumnSeries` module is used to render the range column series.
 */
var RangeColumnSeries = /** @class */ (function (_super) {
    __extends(RangeColumnSeries, _super);
    function RangeColumnSeries() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sideBySideInfo = [];
        return _this;
    }
    /**
     * Renders the Range Column series.
     *
     * @param {Series} series - The series to render.
     * @returns {void}
     * @private
     */
    RangeColumnSeries.prototype.render = function (series) {
        this.sideBySideInfo[series.index] = this.getSideBySideInfo(series);
        //let origin: number = Math.max(<number>series.yAxis.visibleRange.min, 0);
        for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
            var rangePoint = _a[_i];
            this.renderPoint(series, rangePoint, this.sideBySideInfo[series.index]);
        }
        this.renderMarker(series);
    };
    RangeColumnSeries.prototype.renderPoint = function (series, rangePoint, sideBySideInfo) {
        var rect;
        rangePoint.symbolLocations = [];
        rangePoint.regions = [];
        if (rangePoint.visible && withInRange(series.points[rangePoint.index - 1], rangePoint, series.points[rangePoint.index + 1], series)) {
            rect = this.getRectangle(rangePoint.xValue + sideBySideInfo.start, rangePoint.high, rangePoint.xValue + sideBySideInfo.end, rangePoint.low, series);
            rect.width = series.columnWidthInPixel ? series.columnWidthInPixel : rect.width;
            rect.x = series.columnWidthInPixel ? rect.x - (((series.columnWidthInPixel / 2) * series.rectCount) -
                (series.columnWidthInPixel * series.index)) : rect.x;
            var argsData = this.triggerEvent(series, rangePoint, series.interior, { width: series.border.width, color: series.border.color });
            if (!argsData.cancel) {
                this.updateSymbolLocation(rangePoint, rect, series);
                this.drawRectangle(series, rangePoint, rect, argsData);
            }
        }
    };
    RangeColumnSeries.prototype.updateDirection = function (series, point) {
        var _loop_1 = function (i) {
            this_1.renderPoint(series, series.points[point[i]], this_1.sideBySideInfo[series.index]);
            if (series.marker && series.marker.visible) {
                series.points[point[i]].symbolLocations.map(function (location, index) {
                    series.chart.markerRender.renderMarker(series, series.points[point[i]], location, index, true);
                });
            }
            if (series.marker.dataLabel.visible && series.chart.dataLabelModule) {
                series.chart.dataLabelModule.commonId = series.chart.element.id + '_Series_' + series.index + '_Point_';
                series.chart.dataLabelModule.renderDataLabel(series, series.points[point[i]], null, series.marker.dataLabel);
            }
        };
        var this_1 = this;
        for (var i = 0; i < point.length; i++) {
            _loop_1(i);
        }
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    RangeColumnSeries.prototype.getModuleName = function () {
        return 'RangeColumnSeries';
        /**
         * return the module name.
         */
    };
    /**
     * Animates the series.
     *
     * @param  {Series} series - Defines the series to animate.
     * @returns {void}
     * @private
     */
    RangeColumnSeries.prototype.doAnimation = function (series) {
        this.animate(series);
    };
    /**
     * To destroy the range column series.
     *
     * @returns {void}
     * @private
     */
    RangeColumnSeries.prototype.destroy = function () {
        /**
         * Destroy method performed here.
         */
    };
    return RangeColumnSeries;
}(ColumnBase));
export { RangeColumnSeries };
