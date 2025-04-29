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
 * `Annotation` directive represent a annotation of the react Chart.
 * It must be contained in a Chart component(`ChartComponent`).
 * ```tsx
 * <StockChartComponent>
 * <StockChartAnnotationsDirective>
 * <StockChartAnnotationDirective></StockChartAnnotationDirective>
 * </StockChartAnnotationsDirective>
 * </StockChartComponent>
 * ```
 */
var StockChartAnnotationDirective = /** @class */ (function (_super) {
    __extends(StockChartAnnotationDirective, _super);
    function StockChartAnnotationDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StockChartAnnotationDirective.moduleName = 'stockChartAnnotation';
    return StockChartAnnotationDirective;
}(ComplexBase));
export { StockChartAnnotationDirective };
var StockChartAnnotationsDirective = /** @class */ (function (_super) {
    __extends(StockChartAnnotationsDirective, _super);
    function StockChartAnnotationsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StockChartAnnotationsDirective.propertyName = 'annotations';
    StockChartAnnotationsDirective.moduleName = 'stockChartAnnotations';
    return StockChartAnnotationsDirective;
}(ComplexBase));
export { StockChartAnnotationsDirective };
