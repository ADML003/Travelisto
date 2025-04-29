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
 * `ChipDirective` directive represent a chip of the React ChipList.
 * ```html
 * <ChipListComponent>
 *   <ChipsDirective>
 *    <ChipDirective text='chip1'></ChipDirective>
 *    <ChipDirective text='chip2'></ChipDirective>
 *   </ChipsDirective>
 * </ChipListComponent>
 * ```
 */
var ChipDirective = /** @class */ (function (_super) {
    __extends(ChipDirective, _super);
    function ChipDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChipDirective.moduleName = 'chip';
    return ChipDirective;
}(ComplexBase));
export { ChipDirective };
var ChipsDirective = /** @class */ (function (_super) {
    __extends(ChipsDirective, _super);
    function ChipsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChipsDirective.propertyName = 'chips';
    ChipsDirective.moduleName = 'chips';
    return ChipsDirective;
}(ComplexBase));
export { ChipsDirective };
