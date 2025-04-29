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
 * `SelectedDataIndex` directive represent the selected data in react Chart.
 * It must be contained in a Chart component(`Chart3DComponent`).
 * ```tsx
 * <Chart3DComponent>
 * <Chart3DSelectedDataIndexesDirective>
 * <Chart3DSelectedDataIndexDirective></Chart3DSelectedDataIndexDirective>
 * </Chart3DSelectedDataIndexesDirective>
 * </Chart3DComponent>
 * ```
 */
var Chart3DSelectedDataIndexDirective = /** @class */ (function (_super) {
    __extends(Chart3DSelectedDataIndexDirective, _super);
    function Chart3DSelectedDataIndexDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Chart3DSelectedDataIndexDirective.moduleName = 'chart3DSelectedDataIndex';
    return Chart3DSelectedDataIndexDirective;
}(ComplexBase));
export { Chart3DSelectedDataIndexDirective };
var Chart3DSelectedDataIndexesDirective = /** @class */ (function (_super) {
    __extends(Chart3DSelectedDataIndexesDirective, _super);
    function Chart3DSelectedDataIndexesDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Chart3DSelectedDataIndexesDirective.propertyName = 'selectedDataIndexes';
    Chart3DSelectedDataIndexesDirective.moduleName = 'chart3DSelectedDataIndexes';
    return Chart3DSelectedDataIndexesDirective;
}(ComplexBase));
export { Chart3DSelectedDataIndexesDirective };
