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
 * The `StackingBarSeries` module is used to render the stacking bar series.
 */
var StackingBarSeries = /** @class */ (function (_super) {
    __extends(StackingBarSeries, _super);
    function StackingBarSeries() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sideBySideInfo = [];
        return _this;
    }
    StackingBarSeries.prototype.render = function (series) {
        this.sideBySideInfo[series.index] = this.getSideBySideInfo(series);
        var stackedValue = series.stackedValues;
        for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
            var pointStack = _a[_i];
            this.renderPoint(series, pointStack, this.sideBySideInfo[series.index], stackedValue);
        }
        if (series.visible) {
            this.renderMarker(series);
        }
    };
    StackingBarSeries.prototype.renderPoint = function (series, pointStack, sideBySideInfo, stackedValue) {
        pointStack.symbolLocations = [];
        pointStack.regions = [];
        if (pointStack.visible &&
            withInRange(series.points[pointStack.index - 1], pointStack, series.points[pointStack.index + 1], series)) {
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
                    series.chart.visibleSeries[index].stackedValues.endValues[pointStack.index] :
                    series.stackedValues.startValues[pointStack.index];
            }
            this.rect = this.getRectangle(pointStack.xValue + sideBySideInfo.start, (!series.visible && series.isLegendClicked) ?
                startvalue : stackedValue.endValues[pointStack.index], pointStack.xValue + sideBySideInfo.end, (!series.visible
                && series.isLegendClicked) ? startvalue : stackedValue.startValues[pointStack.index], series);
            if (series.chart.isTransposed && series.columnWidthInPixel) {
                this.rect.width = series.columnWidthInPixel ? series.columnWidthInPixel : this.rect.height;
                this.rect.x -= series.columnWidthInPixel / 2;
            }
            else {
                this.rect.height = series.columnWidthInPixel ? series.columnWidthInPixel : this.rect.height;
            }
            this.rect.y = series.columnWidthInPixel ? series.chart.isTransposed ? this.rect.y : this.rect.y -
                (series.columnWidthInPixel / 2) : this.rect.y;
            var argsData = this.triggerEvent(series, pointStack, series.interior, { width: series.visible ? series.border.width : 0, color: series.visible ? series.border.color : '' });
            if (!argsData.cancel) {
                this.drawRectangle(series, pointStack, this.rect, argsData);
                this.updateSymbolLocation(pointStack, this.rect, series);
                if (series.columnFacet === 'Cylinder') {
                    var cylinderSeriesOption = {
                        'isColumn': false,
                        'stacking': series.type === 'StackingBar100',
                        'isLastSeries': true
                    };
                    this.drawCylinder(this.options, this.element, cylinderSeriesOption, this.rect, series);
                }
            }
        }
    };
    StackingBarSeries.prototype.updateDirection = function (series, point) {
        var seriesCollection = [];
        for (var i = 0; i < series.yAxis.series.length; i++) {
            var stackSeries = series.yAxis.series[i];
            if (stackSeries.stackingGroup === series.stackingGroup) {
                seriesCollection.push(stackSeries);
            }
        }
        for (var j = 0; j < seriesCollection.length; j++) {
            for (var i = 0; i < point.length; i++) {
                this.renderPoint(seriesCollection[j], seriesCollection[j].points[point[i]], this.sideBySideInfo[series.index], seriesCollection[j].stackedValues);
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
     * To destroy the stacking bar.
     *
     * @returns {void}
     * @private
     */
    StackingBarSeries.prototype.destroy = function () {
        /**
         * Destroy method performed here.
         */
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    StackingBarSeries.prototype.getModuleName = function () {
        return 'StackingBarSeries';
    };
    /**
     * Animates the series.
     *
     * @param  {Series} series - Defines the series to animate.
     * @returns {void}
     * @private
     */
    StackingBarSeries.prototype.doAnimation = function (series) {
        this.animate(series);
    };
    return StackingBarSeries;
}(ColumnBase));
export { StackingBarSeries };
