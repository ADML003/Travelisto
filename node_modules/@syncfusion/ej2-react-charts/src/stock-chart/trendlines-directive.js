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
import { ComplexBase } from '@syncfusion/ej2-react-base';
/**
 * `TrendlineDirective` directive represent a trendline of the react chart.
 * It must be contained in a Chart component(`ChartComponent`).
 * ```tsx
 * <StockChartComponent>
 * <StockChartSeriesCollectionDirective>
 * <StockSeriesDirective>
 * <TrendlinesDirective>
 * <TrendlineDirective></TrendlineDirective>
 * </TrendlinesDirective>
 * </StockChartSeriesDirective>
 * </StockChartSeriesCollectionDirective>
 * </StockChartComponent>
 * ```
 */
var StockChartTrendlineDirective = /** @class */ (function (_super) {
    __extends(StockChartTrendlineDirective, _super);
    function StockChartTrendlineDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StockChartTrendlineDirective.moduleName = 'stockChartTrendline';
    return StockChartTrendlineDirective;
}(ComplexBase));
export { StockChartTrendlineDirective };
var StockChartTrendlinesDirective = /** @class */ (function (_super) {
    __extends(StockChartTrendlinesDirective, _super);
    function StockChartTrendlinesDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StockChartTrendlinesDirective.propertyName = 'trendlines';
    StockChartTrendlinesDirective.moduleName = 'stockChartTrendlines';
    return StockChartTrendlinesDirective;
}(ComplexBase));
export { StockChartTrendlinesDirective };
