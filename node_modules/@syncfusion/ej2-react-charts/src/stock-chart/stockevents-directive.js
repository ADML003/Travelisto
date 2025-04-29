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
 * `StockChartStockEvents` directive represent a stockevent of the react chart.
 * It must be contained in a Chart component(`StockChartComponent`).
 * ```tsx
 * <StockChartComponent>
 * <StockChartStockEventsDirective>
 * <StockChartStockEventDirective></StockChartStockEventDirective>
 * </StockChartStockEventsDirective>
 * </StockChartComponent>
 * ```
 */
var StockEventDirective = /** @class */ (function (_super) {
    __extends(StockEventDirective, _super);
    function StockEventDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StockEventDirective.moduleName = 'stockEvent';
    return StockEventDirective;
}(ComplexBase));
export { StockEventDirective };
var StockEventsDirective = /** @class */ (function (_super) {
    __extends(StockEventsDirective, _super);
    function StockEventsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StockEventsDirective.propertyName = 'stockEvents';
    StockEventsDirective.moduleName = 'stockEvents';
    return StockEventsDirective;
}(ComplexBase));
export { StockEventsDirective };
