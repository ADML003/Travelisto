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
 * `SeriesDirective` directive represent a series of the react chart.
 * It must be contained in a Chart component(`ChartComponent`).
 * ```tsx
 * <ChartComponent>
 * <SeriesCollectionDirective>
 * <SeriesDirective></SeriesDirective>
 * </SeriesCollectionDirective>
 * </ChartComponent>
 * ```
 */
var SeriesDirective = /** @class */ (function (_super) {
    __extends(SeriesDirective, _super);
    function SeriesDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SeriesDirective.moduleName = 'series';
    SeriesDirective.complexTemplate = { 'dataLabel.template': 'dataLabel.template' };
    return SeriesDirective;
}(ComplexBase));
export { SeriesDirective };
var SeriesCollectionDirective = /** @class */ (function (_super) {
    __extends(SeriesCollectionDirective, _super);
    function SeriesCollectionDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SeriesCollectionDirective.propertyName = 'series';
    SeriesCollectionDirective.moduleName = 'seriesCollection';
    return SeriesCollectionDirective;
}(ComplexBase));
export { SeriesCollectionDirective };
