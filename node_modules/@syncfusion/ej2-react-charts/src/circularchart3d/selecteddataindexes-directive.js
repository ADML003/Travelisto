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
var CircularChart3DSelectedDataIndexDirective = /** @class */ (function (_super) {
    __extends(CircularChart3DSelectedDataIndexDirective, _super);
    function CircularChart3DSelectedDataIndexDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CircularChart3DSelectedDataIndexDirective.moduleName = 'circularChart3DSelectedDataIndex';
    return CircularChart3DSelectedDataIndexDirective;
}(ComplexBase));
export { CircularChart3DSelectedDataIndexDirective };
var CircularChart3DSelectedDataIndexesDirective = /** @class */ (function (_super) {
    __extends(CircularChart3DSelectedDataIndexesDirective, _super);
    function CircularChart3DSelectedDataIndexesDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CircularChart3DSelectedDataIndexesDirective.propertyName = 'selectedDataIndexes';
    CircularChart3DSelectedDataIndexesDirective.moduleName = 'circularChart3DSelectedDataIndexes';
    return CircularChart3DSelectedDataIndexesDirective;
}(ComplexBase));
export { CircularChart3DSelectedDataIndexesDirective };
