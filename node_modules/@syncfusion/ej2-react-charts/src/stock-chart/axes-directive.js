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
 * `Axis` directive represent a axis row of the react Chart.
 * It must be contained in a Chart component(`ChartComponent`).
 * ```tsx
 * <StockChartComponent>
 * <StockChartAxesDirective>
 * <StockChartAxisDirective></StockChartAxisDirective>
 * </StockChartAxesDirective>
 * </StockChartComponent>
 * ```
 */
var StockChartAxisDirective = /** @class */ (function (_super) {
    __extends(StockChartAxisDirective, _super);
    function StockChartAxisDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StockChartAxisDirective.moduleName = 'stockChartAxis';
    return StockChartAxisDirective;
}(ComplexBase));
export { StockChartAxisDirective };
var StockChartAxesDirective = /** @class */ (function (_super) {
    __extends(StockChartAxesDirective, _super);
    function StockChartAxesDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StockChartAxesDirective.propertyName = 'axes';
    StockChartAxesDirective.moduleName = 'stockChartAxes';
    return StockChartAxesDirective;
}(ComplexBase));
export { StockChartAxesDirective };
