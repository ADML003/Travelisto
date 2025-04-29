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
 * `AccumulationSeriesDirective` directive represent a series of the react AccumulationChart.
 * It must be contained in a Pie component(`AccumulationChart`).
 * ```tsx
 * <AccumulationChartComponent>
 * <AccumulationSeriesCollectionDirective>
 * <AccumulationSeriesDirective></AccumulationSeriesDirective>
 * </AccumulationSeriesCollectionDirective>
 * </AccumulationChartComponent>
 * ```
 */
var AccumulationSeriesDirective = /** @class */ (function (_super) {
    __extends(AccumulationSeriesDirective, _super);
    function AccumulationSeriesDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AccumulationSeriesDirective.moduleName = 'accumulationSeries';
    AccumulationSeriesDirective.complexTemplate = { 'dataLabel.template': 'dataLabel.template' };
    return AccumulationSeriesDirective;
}(ComplexBase));
export { AccumulationSeriesDirective };
var AccumulationSeriesCollectionDirective = /** @class */ (function (_super) {
    __extends(AccumulationSeriesCollectionDirective, _super);
    function AccumulationSeriesCollectionDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AccumulationSeriesCollectionDirective.propertyName = 'series';
    AccumulationSeriesCollectionDirective.moduleName = 'accumulationSeriesCollection';
    return AccumulationSeriesCollectionDirective;
}(ComplexBase));
export { AccumulationSeriesCollectionDirective };
