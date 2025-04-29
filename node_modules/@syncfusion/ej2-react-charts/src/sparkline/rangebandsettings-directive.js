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
var RangeBandSettingDirective = /** @class */ (function (_super) {
    __extends(RangeBandSettingDirective, _super);
    function RangeBandSettingDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RangeBandSettingDirective.moduleName = 'rangeBandSetting';
    return RangeBandSettingDirective;
}(ComplexBase));
export { RangeBandSettingDirective };
var RangeBandSettingsDirective = /** @class */ (function (_super) {
    __extends(RangeBandSettingsDirective, _super);
    function RangeBandSettingsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RangeBandSettingsDirective.propertyName = 'rangeBandSettings';
    RangeBandSettingsDirective.moduleName = 'rangeBandSettings';
    return RangeBandSettingsDirective;
}(ComplexBase));
export { RangeBandSettingsDirective };
