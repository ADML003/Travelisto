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
 * `IndicatorDirective` directive represent a indicator of the react chart.
 * It must be contained in a Chart component(`ChartComponent`).
 * ```tsx
 * <ChartComponent>
 * <IndicatorsDirective>
 * <IndicatorDirective></IndicatorDirective>
 * </IndicatorsDirective>
 * </ChartComponent>
 * ```
 */
var IndicatorDirective = /** @class */ (function (_super) {
    __extends(IndicatorDirective, _super);
    function IndicatorDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IndicatorDirective.moduleName = 'indicator';
    return IndicatorDirective;
}(ComplexBase));
export { IndicatorDirective };
var IndicatorsDirective = /** @class */ (function (_super) {
    __extends(IndicatorsDirective, _super);
    function IndicatorsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IndicatorsDirective.propertyName = 'indicators';
    IndicatorsDirective.moduleName = 'indicators';
    return IndicatorsDirective;
}(ComplexBase));
export { IndicatorsDirective };
