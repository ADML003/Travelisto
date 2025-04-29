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
 * `Row` directive represent a axis row of the react Chart.
 * It must be contained in a Chart component(`ChartComponent`).
 * ```tsx
 * <StockChartComponent>
 * <RowsDirective>
 * <RowDirective></RowDirective>
 * </RowsDirective>
 * </ChartComponent>
 * ```
 */
var StockChartRowDirective = /** @class */ (function (_super) {
    __extends(StockChartRowDirective, _super);
    function StockChartRowDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StockChartRowDirective.moduleName = 'stockChartRow';
    return StockChartRowDirective;
}(ComplexBase));
export { StockChartRowDirective };
var StockChartRowsDirective = /** @class */ (function (_super) {
    __extends(StockChartRowsDirective, _super);
    function StockChartRowsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StockChartRowsDirective.propertyName = 'rows';
    StockChartRowsDirective.moduleName = 'stockChartRows';
    return StockChartRowsDirective;
}(ComplexBase));
export { StockChartRowsDirective };
