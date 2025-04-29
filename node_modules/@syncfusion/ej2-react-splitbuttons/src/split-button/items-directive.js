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
var SplitButtonItemDirective = /** @class */ (function (_super) {
    __extends(SplitButtonItemDirective, _super);
    function SplitButtonItemDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SplitButtonItemDirective.moduleName = 'splitButtonItem';
    return SplitButtonItemDirective;
}(ComplexBase));
export { SplitButtonItemDirective };
var SplitButtonItemsDirective = /** @class */ (function (_super) {
    __extends(SplitButtonItemsDirective, _super);
    function SplitButtonItemsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SplitButtonItemsDirective.propertyName = 'items';
    SplitButtonItemsDirective.moduleName = 'splitButtonItems';
    return SplitButtonItemsDirective;
}(ComplexBase));
export { SplitButtonItemsDirective };
