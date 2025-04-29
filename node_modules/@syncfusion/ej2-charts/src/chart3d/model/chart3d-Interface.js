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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ChildProperty, Complex, Property } from '@syncfusion/ej2-base';
/**
 * Configures the fonts in charts.
 */
var Chart3DTextFont = /** @class */ (function (_super) {
    __extends(Chart3DTextFont, _super);
    function Chart3DTextFont() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('Normal')
    ], Chart3DTextFont.prototype, "fontStyle", void 0);
    __decorate([
        Property('16px')
    ], Chart3DTextFont.prototype, "size", void 0);
    __decorate([
        Property('Normal')
    ], Chart3DTextFont.prototype, "fontWeight", void 0);
    __decorate([
        Property('')
    ], Chart3DTextFont.prototype, "color", void 0);
    __decorate([
        Property('Segoe UI')
    ], Chart3DTextFont.prototype, "fontFamily", void 0);
    __decorate([
        Property(1)
    ], Chart3DTextFont.prototype, "opacity", void 0);
    return Chart3DTextFont;
}(ChildProperty));
export { Chart3DTextFont };
/**
 * Configures the borders in the 3D chart title.
 */
var TitleBorder = /** @class */ (function (_super) {
    __extends(TitleBorder, _super);
    function TitleBorder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('transparent')
    ], TitleBorder.prototype, "color", void 0);
    __decorate([
        Property(0)
    ], TitleBorder.prototype, "width", void 0);
    __decorate([
        Property(0.8)
    ], TitleBorder.prototype, "cornerRadius", void 0);
    return TitleBorder;
}(ChildProperty));
export { TitleBorder };
/**
 * Configures the title settings in 3D chart.
 */
var TitleSettings = /** @class */ (function (_super) {
    __extends(TitleSettings, _super);
    function TitleSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('Normal')
    ], TitleSettings.prototype, "fontStyle", void 0);
    __decorate([
        Property('15px')
    ], TitleSettings.prototype, "size", void 0);
    __decorate([
        Property('500')
    ], TitleSettings.prototype, "fontWeight", void 0);
    __decorate([
        Property('')
    ], TitleSettings.prototype, "color", void 0);
    __decorate([
        Property('Center')
    ], TitleSettings.prototype, "textAlignment", void 0);
    __decorate([
        Property('Segoe UI')
    ], TitleSettings.prototype, "fontFamily", void 0);
    __decorate([
        Property(1)
    ], TitleSettings.prototype, "opacity", void 0);
    __decorate([
        Property('Wrap')
    ], TitleSettings.prototype, "textOverflow", void 0);
    __decorate([
        Property('Top')
    ], TitleSettings.prototype, "position", void 0);
    __decorate([
        Property(0)
    ], TitleSettings.prototype, "x", void 0);
    __decorate([
        Property(0)
    ], TitleSettings.prototype, "y", void 0);
    __decorate([
        Property('transparent')
    ], TitleSettings.prototype, "background", void 0);
    __decorate([
        Complex({}, TitleBorder)
    ], TitleSettings.prototype, "border", void 0);
    return TitleSettings;
}(ChildProperty));
export { TitleSettings };
