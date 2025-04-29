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
 * Represents the directive to define the navigation lines in the maps.
 * ```tsx
 * <MapsComponent>
 * <LayersDirective>
 * <LayerDirective>
 * <NavigationLinesDirective>
 * <NavigationLineDirective></NavigationLineDirective>
 * </NavigationLinesDirective>
 * </LayerDirective>
 * </LayersDirective>
 * </MapsComponent>
 * ```
 */
var NavigationLineDirective = /** @class */ (function (_super) {
    __extends(NavigationLineDirective, _super);
    function NavigationLineDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NavigationLineDirective.moduleName = 'navigationLine';
    NavigationLineDirective.complexTemplate = { 'tooltipSettings.template': 'tooltipSettings.template' };
    return NavigationLineDirective;
}(ComplexBase));
export { NavigationLineDirective };
var NavigationLinesDirective = /** @class */ (function (_super) {
    __extends(NavigationLinesDirective, _super);
    function NavigationLinesDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NavigationLinesDirective.propertyName = 'navigationLineSettings';
    NavigationLinesDirective.moduleName = 'navigationLines';
    return NavigationLinesDirective;
}(ComplexBase));
export { NavigationLinesDirective };
