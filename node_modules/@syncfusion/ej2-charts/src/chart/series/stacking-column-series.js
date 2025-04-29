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
import { withInRange, getVisiblePoints } from '../../common/utils/helper';
import { ColumnBase } from './column-base';
/**
 * The `StackingColumnSeries` module is used to render the stacking column series.
 */
var StackingColumnSeries = /** @class */ (function (_super) {
    __extends(StackingColumnSeries, _super);
    function StackingColumnSeries() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sideBySideInfo = [];
        return _this;
    }
    StackingColumnSeries.prototype.render = function (series) {
        series.isRectSeries = true;
        this.sideBySideInfo[series.index] = this.getSideBySideInfo(series);
        var stackedValue = series.stackedValues;
        var visiblePoints = getVisiblePoints(series);
        for (var _i = 0, visiblePoints_1 = visiblePoints; _i < visiblePoints_1.length; _i++) {
            var point = visiblePoints_1[_i];
            this.renderPoint(series, point, this.sideBySideInfo[series.index], stackedValue, visiblePoints);
        }
        if (series.visible) {
            this.renderMarker(series);
        }
    };
    StackingColumnSeries.prototype.renderPoint = function (series, point, sideBySideInfo, stackedValue, visiblePoints) {
        point.symbolLocations = [];
        point.regions = [];
        if (point.visible && withInRange(visiblePoints[point.index - 1], point, visiblePoints[point.index + 1], series)) {
            var index = void 0;
            var startvalue = void 0;
            if (!series.visible && series.isLegendClicked) {
                for (var i = series.index; i >= 0; i--) {
                    if (series.chart.visibleSeries[i].visible) {
                        index = series.chart.visibleSeries[i].index;
                        break;
                    }
                }
                startvalue = series.index > 0 && index !== undefined ?
                    series.chart.visibleSeries[index].stackedValues.endValues[point.index] :
                    series.stackedValues.startValues[point.index];
            }
            this.rect = this.getRectangle(point.xValue + sideBySideInfo.start, (!series.visible && series.isLegendClicked) ? startvalue :
                stackedValue.endValues[point.index], point.xValue + sideBySideInfo.end, (!series.visible && series.isLegendClicked) ?
                startvalue : stackedValue.startValues[point.index], series);
            if (series.chart.isTransposed && series.columnWidthInPixel) {
                this.rect.height = series.columnWidthInPixel ? series.columnWidthInPixel : this.rect.width;
                this.rect.y -= series.columnWidthInPixel / 2;
            }
            else {
                this.rect.width = series.columnWidthInPixel ? series.columnWidthInPixel : this.rect.width;
            }
            this.rect.x = series.columnWidthInPixel ? series.chart.isTransposed ? this.rect.x : this.rect.x -
                (((series.columnWidthInPixel / 2) * series.rectCount) - (series.columnWidthInPixel * series.position)) : this.rect.x;
            var argsData = this.triggerEvent(series, point, series.interior, { width: series.visible ?
                    series.border.width : 0, color: series.visible ? series.border.color : '' });
            if (!argsData.cancel) {
                this.drawRectangle(series, point, this.rect, argsData);
                this.updateSymbolLocation(point, this.rect, series);
                if (series.columnFacet === 'Cylinder') {
                    var cylinderSeriesOption = {
                        'isColumn': true,
                        'stacking': series.type === 'StackingColumn100',
                        'isLastSeries': true
                    };
                    this.drawCylinder(this.options, this.element, cylinderSeriesOption, this.rect, series);
                }
            }
        }
    };
    StackingColumnSeries.prototype.updateDirection = function (series, point) {
        var seriesCollection = [];
        for (var i = 0; i < series.xAxis.series.length; i++) {
            var stackSeries = series.xAxis.series[i];
            if (stackSeries.stackingGroup === series.stackingGroup) {
                seriesCollection.push(stackSeries);
            }
        }
        for (var j = 0; j < seriesCollection.length; j++) {
            var visiblePoints = getVisiblePoints(seriesCollection[j]);
            for (var i = 0; i < point.length; i++) {
                this.renderPoint(seriesCollection[j], seriesCollection[j].points[point[i]], this.sideBySideInfo[series.index], seriesCollection[j].stackedValues, visiblePoints);
                if (series.marker && series.marker.visible) {
                    seriesCollection[j].chart.markerRender.renderMarker(seriesCollection[j], seriesCollection[j].points[point[i]], seriesCollection[j].points[point[i]].symbolLocations[0], null, true);
                }
                if (seriesCollection[j].marker.dataLabel.visible && seriesCollection[j].chart.dataLabelModule) {
                    seriesCollection[j].chart.dataLabelModule.commonId = seriesCollection[j].chart.element.id + '_Series_' + seriesCollection[j].index + '_Point_';
                    seriesCollection[j].chart.dataLabelModule.renderDataLabel(seriesCollection[j], seriesCollection[j].points[point[i]], null, seriesCollection[j].marker.dataLabel);
                }
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
    StackingColumnSeries.prototype.doAnimation = function (series) {
        this.animate(series);
    };
    /**
     * To destroy the stacking column.
     *
     * @returns {void}
     * @private
     */
    StackingColumnSeries.prototype.destroy = function () {
        /**
         * Destroy method performed here.
         */
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    StackingColumnSeries.prototype.getModuleName = function () {
        return 'StackingColumnSeries';
    };
    return StackingColumnSeries;
}(ColumnBase));
export { StackingColumnSeries };
