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
 * Represents the directive to define the bubbles in the maps.
 * ```tsx
 * <MapsComponent>
 * <LayersDirective>
 * <LayerDirective>
 * <BubblesDirective>
 * <BubbleDirective></BubbleDirective>
 * </BubblesDirective>
 * </LayerDirective>
 * </LayersDirective>
 * </MapsComponent>
 * ```
 */
var BubbleDirective = /** @class */ (function (_super) {
    __extends(BubbleDirective, _super);
    function BubbleDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BubbleDirective.moduleName = 'bubble';
    BubbleDirective.complexTemplate = { 'tooltipSettings.template': 'tooltipSettings.template' };
    return BubbleDirective;
}(ComplexBase));
export { BubbleDirective };
var BubblesDirective = /** @class */ (function (_super) {
    __extends(BubblesDirective, _super);
    function BubblesDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BubblesDirective.propertyName = 'bubbleSettings';
    BubblesDirective.moduleName = 'bubbles';
    return BubblesDirective;
}(ComplexBase));
export { BubblesDirective };
