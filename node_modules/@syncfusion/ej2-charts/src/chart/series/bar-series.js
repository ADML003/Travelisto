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
 * The `BarSeries` module is used to render the bar series.
 */
var BarSeries = /** @class */ (function (_super) {
    __extends(BarSeries, _super);
    function BarSeries() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sideBySideInfo = [];
        return _this;
    }
    /**
     * Render Bar series.
     *
     * @param {Series} series - Defines the series.
     * @returns {void}
     * @private
     */
    BarSeries.prototype.render = function (series) {
        var origin = Math.max(series.yAxis.visibleRange.min, 0);
        this.sideBySideInfo[series.index] = this.getSideBySideInfo(series);
        for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
            var pointBar = _a[_i];
            this.renderPoint(series, pointBar, this.sideBySideInfo[series.index], origin);
        }
        this.renderMarker(series);
    };
    BarSeries.prototype.renderPoint = function (series, pointBar, sideBySideInfo, origin) {
        pointBar.symbolLocations = [];
        pointBar.regions = [];
        if (pointBar.visible && withInRange(series.points[pointBar.index - 1], pointBar, series.points[pointBar.index + 1], series)) {
            this.rect = this.getRectangle(pointBar.xValue + sideBySideInfo.start, pointBar.yValue, pointBar.xValue + sideBySideInfo.end, origin, series);
            this.rect.height = series.columnWidthInPixel ? series.columnWidthInPixel : this.rect.height;
            this.rect.y = series.columnWidthInPixel ? this.rect.y - (((series.columnWidthInPixel / 2) * series.rectCount) -
                (series.columnWidthInPixel * series.index)) : this.rect.y;
            var argsData = this.triggerEvent(series, pointBar, series.interior, { width: series.border.width, color: series.border.color });
            if (!argsData.cancel) {
                this.updateSymbolLocation(pointBar, this.rect, series);
                this.drawRectangle(series, pointBar, this.rect, argsData);
                if (series.columnFacet === 'Cylinder') {
                    var cylinderSeriesOption = {
                        'isColumn': false,
                        'stacking': false,
                        'isLastSeries': true
                    };
                    this.drawCylinder(this.options, this.element, cylinderSeriesOption, this.rect, series);
                }
            }
        }
    };
    BarSeries.prototype.updateDirection = function (series, point) {
        var origin = Math.max(series.yAxis.visibleRange.min, 0);
        for (var i = 0; i < point.length; i++) {
            this.renderPoint(series, series.points[point[i]], this.sideBySideInfo[series.index], origin);
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
    BarSeries.prototype.doAnimation = function (series) {
        this.animate(series);
    };
    /**
     * To destroy the bar series.
     *
     * @returns {void}
     * @private
     */
    BarSeries.prototype.destroy = function () {
        /**
         * Destroy method performed here.
         */
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    BarSeries.prototype.getModuleName = function () {
        return 'BarSeries';
    };
    return BarSeries;
}(ColumnBase));
export { BarSeries };
