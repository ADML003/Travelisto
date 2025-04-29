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
 * `rangenavigatorSeriesDirective` directive represent a series of the react AccumulationChart.
 * It must be contained in a Rangenavigator component(`Rangenavigator`).
 * ```tsx
 * <RangenavigatorComponent>
 * <RangenavigatorSeriesCollectionDirective>
 * <RangenavigatorSeriesDirective></RangenavigatorSeriesDirective>
 * </RangenavigatorSeriesCollectionDirective>
 * </RangenavigatorChartComponent>
 * ```
 */
var RangenavigatorSeriesDirective = /** @class */ (function (_super) {
    __extends(RangenavigatorSeriesDirective, _super);
    function RangenavigatorSeriesDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RangenavigatorSeriesDirective.moduleName = 'rangenavigatorSeries';
    return RangenavigatorSeriesDirective;
}(ComplexBase));
export { RangenavigatorSeriesDirective };
var RangenavigatorSeriesCollectionDirective = /** @class */ (function (_super) {
    __extends(RangenavigatorSeriesCollectionDirective, _super);
    function RangenavigatorSeriesCollectionDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RangenavigatorSeriesCollectionDirective.propertyName = 'series';
    RangenavigatorSeriesCollectionDirective.moduleName = 'rangenavigatorSeriesCollection';
    return RangenavigatorSeriesCollectionDirective;
}(ComplexBase));
export { RangenavigatorSeriesCollectionDirective };
