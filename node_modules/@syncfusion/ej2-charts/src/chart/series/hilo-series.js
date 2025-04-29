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
 * The `HiloSeries` module is used to render the hilo series.
 */
var HiloSeries = /** @class */ (function (_super) {
    __extends(HiloSeries, _super);
    function HiloSeries() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sideBySideInfo = [];
        return _this;
    }
    /**
     * Render Hiloseries.
     *
     * @returns {void}
     * @private
     */
    HiloSeries.prototype.render = function (series) {
        this.sideBySideInfo[series.index] = this.getSideBySideInfo(series);
        for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
            var point = _a[_i];
            this.renderPoint(series, point, this.sideBySideInfo[series.index]);
        }
    };
    HiloSeries.prototype.renderPoint = function (series, point, sideBySideInfo) {
        point.symbolLocations = [];
        point.regions = [];
        var region;
        if (point.visible &&
            withInRange(series.points[point.index - 1], point, series.points[point.index + 1], series)) {
            region = this.getRectangle(point.xValue + sideBySideInfo.median, point.high, point.xValue + sideBySideInfo.median, point.low, series);
            var argsData = this.triggerPointRenderEvent(series, point);
            if (!argsData.cancel) {
                if (!series.chart.requireInvertedAxis) {
                    region.width = argsData.border.width;
                    region.x = region.x - (region.width / 2);
                }
                else {
                    region.height = argsData.border.width;
                    region.y = region.y - (region.height / 2);
                }
                argsData.border.width = 0;
                this.updateSymbolLocation(point, region, series);
                this.drawRectangle(series, point, region, argsData);
            }
        }
    };
    HiloSeries.prototype.updateDirection = function (series, point) {
        for (var i = 0; i < point.length; i++) {
            this.renderPoint(series, series.points[point[i]], this.sideBySideInfo[series.index]);
            if (series.marker.dataLabel.visible && series.chart.dataLabelModule) {
                series.chart.dataLabelModule.commonId = series.chart.element.id + '_Series_' + series.index + '_Point_';
                series.chart.dataLabelModule.renderDataLabel(series, series.points[point[i]], null, series.marker.dataLabel);
            }
        }
    };
    /**
     * Triggers the point render event for the specified series and data point.
     *
     * @param {Series} series - The series associated with the point.
     * @param {Points} point - The data point.
     * @returns {IPointRenderEventArgs} The event arguments.
     */
    HiloSeries.prototype.triggerPointRenderEvent = function (series, point) {
        var border = { color: series.fill, width: Math.max(series.border.width, 2) };
        return _super.prototype.triggerEvent.call(this, series, point, series.interior, border);
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    HiloSeries.prototype.getModuleName = function () {
        return 'HiloSeries';
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
    HiloSeries.prototype.doAnimation = function (series) {
        this.animate(series);
    };
    /**
     * To destroy the Hilo series.
     *
     * @returns {void}
     * @private
     */
    HiloSeries.prototype.destroy = function () {
        /**
         * Destroys the Hilo Series.
         */
    };
    return HiloSeries;
}(ColumnBase));
export { HiloSeries };
