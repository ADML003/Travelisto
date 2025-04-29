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
 * `SpeedDialItemDirective` represent a item of the React SpeedDial.
 * It must be contained in a SpeedDial component(`SpeedDialComponent`).
 * ```tsx
 * <SpeedDialComponent>
 *   <SpeedDialItemsDirective>
 *    <SpeedDialItemDirective text='Cut'></SpeedDialItemDirective>
 *    <SpeedDialItemDirective text='Copy'></SpeedDialItemDirective>
 *   <SpeedDialItemsDirective>
 * </SpeedDialComponent>
 * ```
 */
var SpeedDialItemDirective = /** @class */ (function (_super) {
    __extends(SpeedDialItemDirective, _super);
    function SpeedDialItemDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SpeedDialItemDirective.moduleName = 'speedDialItem';
    return SpeedDialItemDirective;
}(ComplexBase));
export { SpeedDialItemDirective };
var SpeedDialItemsDirective = /** @class */ (function (_super) {
    __extends(SpeedDialItemsDirective, _super);
    function SpeedDialItemsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SpeedDialItemsDirective.propertyName = 'items';
    SpeedDialItemsDirective.moduleName = 'speedDialItems';
    return SpeedDialItemsDirective;
}(ComplexBase));
export { SpeedDialItemsDirective };
