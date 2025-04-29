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
 * Represents the directive to define the bubble color mapping in the maps.
 * ```tsx
 * <MapsComponent>
 * <LayersDirective>
 * <LayerDirective>
 * <BubblesDirective>
 * <ColorMappingsDirective>
 * <ColorMappingDirective></ColorMappingDirective>
 * </ColorMappingsDirective>
 * </BubblesDirective>
 * </LayerDirective>
 * </LayersDirective>
 * </MapsComponent>
 * ```
 */
var ColorMappingDirective = /** @class */ (function (_super) {
    __extends(ColorMappingDirective, _super);
    function ColorMappingDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColorMappingDirective.moduleName = 'colorMapping';
    return ColorMappingDirective;
}(ComplexBase));
export { ColorMappingDirective };
var ColorMappingsDirective = /** @class */ (function (_super) {
    __extends(ColorMappingsDirective, _super);
    function ColorMappingsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColorMappingsDirective.propertyName = 'colorMapping';
    ColorMappingsDirective.moduleName = 'colorMappings';
    return ColorMappingsDirective;
}(ComplexBase));
export { ColorMappingsDirective };
