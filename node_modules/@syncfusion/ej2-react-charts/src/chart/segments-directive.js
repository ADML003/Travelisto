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
 * `SegmentDirective` directive represent a segment of the react chart.
 * It must be contained in a Chart component(`ChartComponent`).
 * ```tsx
 * <ChartComponent>
 * <SeriesCollectionDirective>
 * <SeriesDirective>
 * <SegmentsDirective>
 * <SegmentDirective></SegmentDirective>
 * </SegmentsDirective>
 * </SeriesDirective>
 * </SeriesCollectionDirective>
 * </ChartComponent>
 * ```
 */
var SegmentDirective = /** @class */ (function (_super) {
    __extends(SegmentDirective, _super);
    function SegmentDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SegmentDirective.moduleName = 'segment';
    return SegmentDirective;
}(ComplexBase));
export { SegmentDirective };
var SegmentsDirective = /** @class */ (function (_super) {
    __extends(SegmentsDirective, _super);
    function SegmentsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SegmentsDirective.propertyName = 'segments';
    SegmentsDirective.moduleName = 'segments';
    return SegmentsDirective;
}(ComplexBase));
export { SegmentsDirective };
