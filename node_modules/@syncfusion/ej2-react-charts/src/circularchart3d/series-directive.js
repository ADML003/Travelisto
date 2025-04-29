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
 * `CircularChart3DSeriesDirective` directive represent a series of the react Circular3D Chart.
 * It must be contained in a Pie component(`CircularChart3D`).
 * ```tsx
 * <CircularChart3DComponent>
 * <CircularChart3DSeriesCollectionDirective>
 * <CircularChart3DSeriesDirective></CircularChart3DSeriesDirective>
 * </CircularChart3DSeriesCollectionDirective>
 * </CircularChart3DComponent>
 * ```
 */
var CircularChart3DSeriesDirective = /** @class */ (function (_super) {
    __extends(CircularChart3DSeriesDirective, _super);
    function CircularChart3DSeriesDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CircularChart3DSeriesDirective.moduleName = 'circularChart3DSeries';
    CircularChart3DSeriesDirective.complexTemplate = { 'dataLabel.template': 'dataLabel.template' };
    return CircularChart3DSeriesDirective;
}(ComplexBase));
export { CircularChart3DSeriesDirective };
var CircularChart3DSeriesCollectionDirective = /** @class */ (function (_super) {
    __extends(CircularChart3DSeriesCollectionDirective, _super);
    function CircularChart3DSeriesCollectionDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CircularChart3DSeriesCollectionDirective.propertyName = 'series';
    CircularChart3DSeriesCollectionDirective.moduleName = 'circularChart3DSeriesCollection';
    return CircularChart3DSeriesCollectionDirective;
}(ComplexBase));
export { CircularChart3DSeriesCollectionDirective };
