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
 * It must be contained in a Chart component(`Chart3DComponent`).
 * ```tsx
 * <Chart3DComponent>
 * <Chart3DSeriesCollectionDirective>
 * <Chart3DSeriesDirective></Chart3DSeriesDirective>
 * </Chart3DSeriesCollectionDirective>
 * </Chart3DComponent>
 * ```
 */
var Chart3DSeriesDirective = /** @class */ (function (_super) {
    __extends(Chart3DSeriesDirective, _super);
    function Chart3DSeriesDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Chart3DSeriesDirective.moduleName = 'chart3DSeries';
    Chart3DSeriesDirective.complexTemplate = { 'dataLabel.template': 'dataLabel.template' };
    return Chart3DSeriesDirective;
}(ComplexBase));
export { Chart3DSeriesDirective };
var Chart3DSeriesCollectionDirective = /** @class */ (function (_super) {
    __extends(Chart3DSeriesCollectionDirective, _super);
    function Chart3DSeriesCollectionDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Chart3DSeriesCollectionDirective.propertyName = 'series';
    Chart3DSeriesCollectionDirective.moduleName = 'chart3DSeriesCollection';
    return Chart3DSeriesCollectionDirective;
}(ComplexBase));
export { Chart3DSeriesCollectionDirective };
