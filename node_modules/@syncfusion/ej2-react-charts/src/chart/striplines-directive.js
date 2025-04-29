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
 * `StriplineDirective` directive represent a stripline of the react chart.
 * It must be contained in a Chart component(`ChartComponent`).
 * ```tsx
 * <ChartComponent>
 * <AxesDirective>
 * <AxisDirective>
 * <StriplinesDirective>
 * <StriplineDirective></StriplineDirective>
 * </StriplinesDirective>
 * </AxisDirective>
 * </AxesDirective>
 * </ChartComponent>
 * ```
 */
var StripLineDirective = /** @class */ (function (_super) {
    __extends(StripLineDirective, _super);
    function StripLineDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StripLineDirective.moduleName = 'stripLine';
    return StripLineDirective;
}(ComplexBase));
export { StripLineDirective };
var StripLinesDirective = /** @class */ (function (_super) {
    __extends(StripLinesDirective, _super);
    function StripLinesDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StripLinesDirective.propertyName = 'stripLines';
    StripLinesDirective.moduleName = 'stripLines';
    return StripLinesDirective;
}(ComplexBase));
export { StripLinesDirective };
