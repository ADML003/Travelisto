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
 * `Axis3D` directive represent a axis row of the react Chart.
 * It must be contained in a Chart component(`Chart3DComponent`).
 * ```tsx
 * <Chart3DComponent>
 * <Chart3DAxesDirective>
 * <Chart3DAxisDirective></Chart3DAxisDirective>
 * </Chart3DAxesDirective>
 * </Chart3DComponent>
 * ```
 */
var Chart3DAxisDirective = /** @class */ (function (_super) {
    __extends(Chart3DAxisDirective, _super);
    function Chart3DAxisDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Chart3DAxisDirective.moduleName = 'chart3DAxis';
    return Chart3DAxisDirective;
}(ComplexBase));
export { Chart3DAxisDirective };
var Chart3DAxesDirective = /** @class */ (function (_super) {
    __extends(Chart3DAxesDirective, _super);
    function Chart3DAxesDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Chart3DAxesDirective.propertyName = 'axes';
    Chart3DAxesDirective.moduleName = 'chart3DAxes';
    return Chart3DAxesDirective;
}(ComplexBase));
export { Chart3DAxesDirective };
