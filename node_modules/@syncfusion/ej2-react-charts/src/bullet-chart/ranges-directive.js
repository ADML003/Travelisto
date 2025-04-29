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
 * `BulletRangeDirective` directive represent a ranges of the react BulletChart.
 * ```tsx
 * <BulletChartComponent>
 * <BulletRangeCollectionDirective>
 * <BulletRangeDirective></BulletRangeDirective>
 * </BulletRangeCollectionDirective>
 * </BulletChartComponent>
 * ```
 */
var BulletRangeDirective = /** @class */ (function (_super) {
    __extends(BulletRangeDirective, _super);
    function BulletRangeDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BulletRangeDirective.moduleName = 'bulletRange';
    return BulletRangeDirective;
}(ComplexBase));
export { BulletRangeDirective };
var BulletRangeCollectionDirective = /** @class */ (function (_super) {
    __extends(BulletRangeCollectionDirective, _super);
    function BulletRangeCollectionDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BulletRangeCollectionDirective.propertyName = 'ranges';
    BulletRangeCollectionDirective.moduleName = 'bulletRangeCollection';
    return BulletRangeCollectionDirective;
}(ComplexBase));
export { BulletRangeCollectionDirective };
