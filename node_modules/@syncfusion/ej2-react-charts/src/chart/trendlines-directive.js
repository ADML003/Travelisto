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
 * <ChartComponent>
 * <SeriesCollectionDirective>
 * <SeriesDirective>
 * <TrendlinesDirective>
 * <TrendlineDirective></TrendlineDirective>
 * </TrendlinesDirective>
 * </SeriesDirective>
 * </SeriesCollectionDirective>
 * </ChartComponent>
 * ```
 */
var TrendlineDirective = /** @class */ (function (_super) {
    __extends(TrendlineDirective, _super);
    function TrendlineDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TrendlineDirective.moduleName = 'trendline';
    return TrendlineDirective;
}(ComplexBase));
export { TrendlineDirective };
var TrendlinesDirective = /** @class */ (function (_super) {
    __extends(TrendlinesDirective, _super);
    function TrendlinesDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TrendlinesDirective.propertyName = 'trendlines';
    TrendlinesDirective.moduleName = 'trendlines';
    return TrendlinesDirective;
}(ComplexBase));
export { TrendlinesDirective };
