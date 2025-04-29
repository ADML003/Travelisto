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
 * Represents the directive to define the layer of the maps.
 * ```tsx
 * <MapsComponent>
 * <LayersDirective>
 * <LayerDirective></LayerDirective>
 * </LayersDirective>
 * </MapsComponent>
 * ```
 */
var LayerDirective = /** @class */ (function (_super) {
    __extends(LayerDirective, _super);
    function LayerDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LayerDirective.moduleName = 'layer';
    return LayerDirective;
}(ComplexBase));
export { LayerDirective };
var LayersDirective = /** @class */ (function (_super) {
    __extends(LayersDirective, _super);
    function LayersDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LayersDirective.propertyName = 'layers';
    LayersDirective.moduleName = 'layers';
    return LayersDirective;
}(ComplexBase));
export { LayersDirective };
