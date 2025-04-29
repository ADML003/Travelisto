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
 * `MultiLevelLabelDirective` directive represent a multilevellabel of the react chart.
 * It must be contained in a Chart component(`ChartComponent`).
 * ```tsx
 * <ChartComponent>
 * <AxesDirective>
 * <AxisDirective>
 * <MultiLevelLabelsDirective>
 * <MultiLevelLabelDirective></MultiLevelLabelDirective>
 * </MultiLevelLabelsDirective>
 * </AxisDirective>
 * </AxesDirective>
 * </ChartComponent>
 * ```
 */
var MultiLevelLabelDirective = /** @class */ (function (_super) {
    __extends(MultiLevelLabelDirective, _super);
    function MultiLevelLabelDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MultiLevelLabelDirective.moduleName = 'multiLevelLabel';
    return MultiLevelLabelDirective;
}(ComplexBase));
export { MultiLevelLabelDirective };
var MultiLevelLabelsDirective = /** @class */ (function (_super) {
    __extends(MultiLevelLabelsDirective, _super);
    function MultiLevelLabelsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MultiLevelLabelsDirective.propertyName = 'multiLevelLabels';
    MultiLevelLabelsDirective.moduleName = 'multiLevelLabels';
    return MultiLevelLabelsDirective;
}(ComplexBase));
export { MultiLevelLabelsDirective };
