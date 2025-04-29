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
 * Represents the directive to configure the selection of the shapes when the maps is initially rendered.
 * ```tsx
 * <MapsComponent>
 * <LayersDirective>
 * <LayerDirective>
 * <initialShapeSelectionsDirective>
 * <initialShapeSelectionDirective></initialShapeSelectionDirective>
 * </initialShapeSelectionsDirective>
 * </LayerDirective>
 * </LayersDirective>
 * </MapsComponent>
 * ```
 */
var InitialShapeSelectionDirective = /** @class */ (function (_super) {
    __extends(InitialShapeSelectionDirective, _super);
    function InitialShapeSelectionDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InitialShapeSelectionDirective.moduleName = 'initialShapeSelection';
    return InitialShapeSelectionDirective;
}(ComplexBase));
export { InitialShapeSelectionDirective };
var InitialShapeSelectionsDirective = /** @class */ (function (_super) {
    __extends(InitialShapeSelectionsDirective, _super);
    function InitialShapeSelectionsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InitialShapeSelectionsDirective.propertyName = 'initialShapeSelection';
    InitialShapeSelectionsDirective.moduleName = 'initialShapeSelections';
    return InitialShapeSelectionsDirective;
}(ComplexBase));
export { InitialShapeSelectionsDirective };
