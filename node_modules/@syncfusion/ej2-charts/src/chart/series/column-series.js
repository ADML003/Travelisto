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
import { getPoint, withInRange } from '../../common/utils/helper';
import { Rect } from '@syncfusion/ej2-svg-base';
import { ColumnBase } from './column-base';
/**
 * The `ColumnSeries` module is used to render the column series.
 */
var ColumnSeries = /** @class */ (function (_super) {
    __extends(ColumnSeries, _super);
    function ColumnSeries() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sideBySideInfo = [];
        return _this;
    }
    ColumnSeries.prototype.render = function (series) {
        this.sideBySideInfo[series.index] = this.getSideBySideInfo(series);
        var origin = Math.max(series.yAxis.visibleRange.min, 0);
        for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
            var pointColumn = _a[_i];
            this.renderPoint(series, pointColumn, this.sideBySideInfo[series.index], origin);
        }
        this.renderMarker(series);
    };
    ColumnSeries.prototype.renderPoint = function (series, pointColumn, sideBySideInfo, origin) {
        pointColumn.symbolLocations = [];
        pointColumn.regions = [];
        if (pointColumn.visible && withInRange(series.points[pointColumn.index - 1], pointColumn, series.points[pointColumn.index + 1], series)) {
            this.rect = this.getRectangle(pointColumn.xValue + sideBySideInfo.start, pointColumn.yValue, pointColumn.xValue + sideBySideInfo.end, origin, series);
            this.rect.width = series.columnWidthInPixel ? (series.columnWidthInPixel - (series.chart.enableSideBySidePlacement ?
                series.columnWidthInPixel * series.columnSpacing : 0)) : this.rect.width;
            this.rect.x = series.columnWidthInPixel ? this.rect.x - (((series.columnWidthInPixel / 2) * series.rectCount) -
                (series.columnWidthInPixel * series.index)) : this.rect.x;
            var color = series.category === 'Indicator' ? pointColumn.color : series.interior;
            var argsData = this.triggerEvent(series, pointColumn, color, { width: series.border.width, color: series.border.color });
            if (!argsData.cancel) {
                var adjustedYPosition = this.rect.y;
                if (pointColumn.yValue < origin && pointColumn.yValue >= 0 && series.chart.zoomModule &&
                    series.chart.zoomModule.isAxisZoomed(series.chart.axisCollections)) {
                    adjustedYPosition = getPoint(pointColumn.xValue + sideBySideInfo.start, pointColumn.yValue, series.xAxis, series.yAxis, series.chart.requireInvertedAxis).y;
                }
                this.updateSymbolLocation(pointColumn, new Rect(this.rect.x, adjustedYPosition, this.rect.width, this.rect.height), series);
                this.drawRectangle(series, pointColumn, this.rect, argsData);
                if (series.columnFacet === 'Cylinder') {
                    var cylinderSeriesOption = {
                        'isColumn': true,
                        'stacking': false,
                        'isLastSeries': true
                    };
                    this.drawCylinder(this.options, this.element, cylinderSeriesOption, this.rect, series);
                }
            }
        }
    };
    ColumnSeries.prototype.updateDirection = function (series, point) {
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
    ColumnSeries.prototype.doAnimation = function (series) {
        this.animate(series);
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    ColumnSeries.prototype.getModuleName = function () {
        return 'ColumnSeries';
        /**
         * return the module name.
         */
    };
    /**
     * To destroy the column series.
     *
     * @returns {void}
     * @private
     */
    ColumnSeries.prototype.destroy = function () {
        /**
         * Destroy method performed here.
         */
    };
    return ColumnSeries;
}(ColumnBase));
export { ColumnSeries };
