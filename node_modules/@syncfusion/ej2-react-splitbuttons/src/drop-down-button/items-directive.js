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
var DropDownButtonItemDirective = /** @class */ (function (_super) {
    __extends(DropDownButtonItemDirective, _super);
    function DropDownButtonItemDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DropDownButtonItemDirective.moduleName = 'dropDownButtonItem';
    return DropDownButtonItemDirective;
}(ComplexBase));
export { DropDownButtonItemDirective };
var DropDownButtonItemsDirective = /** @class */ (function (_super) {
    __extends(DropDownButtonItemsDirective, _super);
    function DropDownButtonItemsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DropDownButtonItemsDirective.propertyName = 'items';
    DropDownButtonItemsDirective.moduleName = 'dropDownButtonItems';
    return DropDownButtonItemsDirective;
}(ComplexBase));
export { DropDownButtonItemsDirective };
