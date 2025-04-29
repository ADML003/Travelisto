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
 * Represents the directive to define the markers in the maps.
 * ```tsx
 * <MapsComponent>
 * <LayersDirective>
 * <LayerDirective>
 * <MarkersDirective>
 * <MarkerDirective></MarkerDirective>
 * </MarkersDirective>
 * </LayerDirective>
 * </LayersDirective>
 * </MapsComponent>
 * ```
 */
var MarkerDirective = /** @class */ (function (_super) {
    __extends(MarkerDirective, _super);
    function MarkerDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MarkerDirective.moduleName = 'marker';
    MarkerDirective.complexTemplate = { 'tooltipSettings.template': 'tooltipSettings.template' };
    return MarkerDirective;
}(ComplexBase));
export { MarkerDirective };
var MarkersDirective = /** @class */ (function (_super) {
    __extends(MarkersDirective, _super);
    function MarkersDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MarkersDirective.propertyName = 'markerSettings';
    MarkersDirective.moduleName = 'markers';
    return MarkersDirective;
}(ComplexBase));
export { MarkersDirective };
