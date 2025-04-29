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
 * It must be contained in a Chart component(`ChartComponent`).
 * ```tsx
 * <ChartComponent>
 * <SelectedDataIndexesDirective>
 * <SelectedDataIndexDirective></SelectedDataIndexDirective>
 * </SelectedDataIndexesDirective>
 * </ChartComponent>
 * ```
 */
var SelectedDataIndexDirective = /** @class */ (function (_super) {
    __extends(SelectedDataIndexDirective, _super);
    function SelectedDataIndexDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelectedDataIndexDirective.moduleName = 'selectedDataIndex';
    return SelectedDataIndexDirective;
}(ComplexBase));
export { SelectedDataIndexDirective };
var SelectedDataIndexesDirective = /** @class */ (function (_super) {
    __extends(SelectedDataIndexesDirective, _super);
    function SelectedDataIndexesDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelectedDataIndexesDirective.propertyName = 'selectedDataIndexes';
    SelectedDataIndexesDirective.moduleName = 'selectedDataIndexes';
    return SelectedDataIndexesDirective;
}(ComplexBase));
export { SelectedDataIndexesDirective };
