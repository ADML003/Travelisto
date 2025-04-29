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
 * `RangeColorSetting` directive represent range color mapping of the react Chart.
 * It must be contained in a Chart component(`ChartComponent`).
 * ```tsx
 * <ChartComponent>
 * <RangeColorSettingsDirective>
 * <RangeColorSettingDirective></RangeColorSettingDirective>
 * </RangeColorSettingsDirective>
 * </ChartComponent>
 * ```
 */
var RangeColorSettingDirective = /** @class */ (function (_super) {
    __extends(RangeColorSettingDirective, _super);
    function RangeColorSettingDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RangeColorSettingDirective.moduleName = 'rangeColorSetting';
    return RangeColorSettingDirective;
}(ComplexBase));
export { RangeColorSettingDirective };
var RangeColorSettingsDirective = /** @class */ (function (_super) {
    __extends(RangeColorSettingsDirective, _super);
    function RangeColorSettingsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RangeColorSettingsDirective.propertyName = 'rangeColorSettings';
    RangeColorSettingsDirective.moduleName = 'rangeColorSettings';
    return RangeColorSettingsDirective;
}(ComplexBase));
export { RangeColorSettingsDirective };
