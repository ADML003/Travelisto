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
 * `CategoryDirective` directive represent a trendline of the react chart.
 * It must be contained in a Chart component(`ChartComponent`).
 * ```tsx
 * <ChartComponent>
 * <AxesDirective>
 * <AxisDirective>
 * <MultiLevelLabelsDirective>
 * <MultiLevelLabelDirective>
 * <CategoriesDirective>
 * <CategoryDirective>
 * </CategoryDirective>
 * </CategoriesDirective>
 * </MultiLevelLabelDirective>
 * </MultiLevelLabelsDirective>
 * </AxisDirective>
 * </AxesDirective>
 * </ChartComponent>
 * ```
 */
var CategoryDirective = /** @class */ (function (_super) {
    __extends(CategoryDirective, _super);
    function CategoryDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CategoryDirective.moduleName = 'category';
    return CategoryDirective;
}(ComplexBase));
export { CategoryDirective };
var CategoriesDirective = /** @class */ (function (_super) {
    __extends(CategoriesDirective, _super);
    function CategoriesDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CategoriesDirective.propertyName = 'categories';
    CategoriesDirective.moduleName = 'categories';
    return CategoriesDirective;
}(ComplexBase));
export { CategoriesDirective };
