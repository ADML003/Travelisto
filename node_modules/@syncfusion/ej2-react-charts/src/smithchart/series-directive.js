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
var SmithchartSeriesDirective = /** @class */ (function (_super) {
    __extends(SmithchartSeriesDirective, _super);
    function SmithchartSeriesDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SmithchartSeriesDirective.moduleName = 'smithchartSeries';
    return SmithchartSeriesDirective;
}(ComplexBase));
export { SmithchartSeriesDirective };
var SmithchartSeriesCollectionDirective = /** @class */ (function (_super) {
    __extends(SmithchartSeriesCollectionDirective, _super);
    function SmithchartSeriesCollectionDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SmithchartSeriesCollectionDirective.propertyName = 'series';
    SmithchartSeriesCollectionDirective.moduleName = 'smithchartSeriesCollection';
    return SmithchartSeriesCollectionDirective;
}(ComplexBase));
export { SmithchartSeriesCollectionDirective };
