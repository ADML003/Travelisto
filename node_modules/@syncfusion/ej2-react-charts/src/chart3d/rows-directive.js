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
 * `Row3D` directive represent a axis row of the react Chart.
 * It must be contained in a Chart component(`Chart3DComponent`).
 * ```tsx
 * <Chart3DComponent>
 * <Chart3DRowsDirective>
 * <Chart3DRowDirective></Chart3DRowDirective>
 * </Chart3DRowsDirective>
 * </Chart3DComponent>
 * ```
 */
var Chart3DRowDirective = /** @class */ (function (_super) {
    __extends(Chart3DRowDirective, _super);
    function Chart3DRowDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Chart3DRowDirective.moduleName = 'chart3DRow';
    return Chart3DRowDirective;
}(ComplexBase));
export { Chart3DRowDirective };
var Chart3DRowsDirective = /** @class */ (function (_super) {
    __extends(Chart3DRowsDirective, _super);
    function Chart3DRowsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Chart3DRowsDirective.propertyName = 'rows';
    Chart3DRowsDirective.moduleName = 'chart3DRows';
    return Chart3DRowsDirective;
}(ComplexBase));
export { Chart3DRowsDirective };
