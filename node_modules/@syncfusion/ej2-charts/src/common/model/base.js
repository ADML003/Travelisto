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
import { Property, ChildProperty, Browser, Complex, Collection } from '@syncfusion/ej2-base';
/**
 * The `Connector` class configures the appearance and properties of connectors in chart controls.
 */
var Connector = /** @class */ (function (_super) {
    __extends(Connector, _super);
    function Connector() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('Line')
    ], Connector.prototype, "type", void 0);
    __decorate([
        Property(null)
    ], Connector.prototype, "color", void 0);
    __decorate([
        Property(1)
    ], Connector.prototype, "width", void 0);
    __decorate([
        Property(null)
    ], Connector.prototype, "length", void 0);
    __decorate([
        Property('')
    ], Connector.prototype, "dashArray", void 0);
    return Connector;
}(ChildProperty));
export { Connector };
/**
 * Configures the location for the legend and tooltip in the chart.
 */
var Location = /** @class */ (function (_super) {
    __extends(Location, _super);
    function Location() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(0)
    ], Location.prototype, "x", void 0);
    __decorate([
        Property(0)
    ], Location.prototype, "y", void 0);
    return Location;
}(ChildProperty));
export { Location };
/**
 * The `Accessibility` class configures accessibility options for chart controls.
 */
var Accessibility = /** @class */ (function (_super) {
    __extends(Accessibility, _super);
    function Accessibility() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(null)
    ], Accessibility.prototype, "accessibilityDescription", void 0);
    __decorate([
        Property(null)
    ], Accessibility.prototype, "accessibilityRole", void 0);
    __decorate([
        Property(true)
    ], Accessibility.prototype, "focusable", void 0);
    __decorate([
        Property(0)
    ], Accessibility.prototype, "tabIndex", void 0);
    return Accessibility;
}(ChildProperty));
export { Accessibility };
/**
 * The `SeriesAccessibility` class configures accessibility options specifically for chart series elements.
 */
var SeriesAccessibility = /** @class */ (function (_super) {
    __extends(SeriesAccessibility, _super);
    function SeriesAccessibility() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(null)
    ], SeriesAccessibility.prototype, "accessibilityDescriptionFormat", void 0);
    return SeriesAccessibility;
}(Accessibility));
export { SeriesAccessibility };
/**
 * The `Font` class provides configuration options for customizing the fonts used in the charts.
 */
var Font = /** @class */ (function (_super) {
    __extends(Font, _super);
    function Font() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('Normal')
    ], Font.prototype, "fontStyle", void 0);
    __decorate([
        Property('16px')
    ], Font.prototype, "size", void 0);
    __decorate([
        Property('Normal')
    ], Font.prototype, "fontWeight", void 0);
    __decorate([
        Property('')
    ], Font.prototype, "color", void 0);
    __decorate([
        Property('Center')
    ], Font.prototype, "textAlignment", void 0);
    __decorate([
        Property('Segoe UI')
    ], Font.prototype, "fontFamily", void 0);
    __decorate([
        Property(1)
    ], Font.prototype, "opacity", void 0);
    __decorate([
        Property('Wrap')
    ], Font.prototype, "textOverflow", void 0);
    return Font;
}(ChildProperty));
export { Font };
/**
 * The `StackLabelsFont` class provides configuration options for customizing the font properties of stack labels in charts.
 */
var StackLabelsFont = /** @class */ (function (_super) {
    __extends(StackLabelsFont, _super);
    function StackLabelsFont() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('Normal')
    ], StackLabelsFont.prototype, "fontStyle", void 0);
    __decorate([
        Property('16px')
    ], StackLabelsFont.prototype, "size", void 0);
    __decorate([
        Property('Normal')
    ], StackLabelsFont.prototype, "fontWeight", void 0);
    __decorate([
        Property('')
    ], StackLabelsFont.prototype, "color", void 0);
    __decorate([
        Property('Center')
    ], StackLabelsFont.prototype, "textAlignment", void 0);
    __decorate([
        Property('Segoe UI')
    ], StackLabelsFont.prototype, "fontFamily", void 0);
    __decorate([
        Property(1)
    ], StackLabelsFont.prototype, "opacity", void 0);
    return StackLabelsFont;
}(ChildProperty));
export { StackLabelsFont };
/**
 * Options to customize the center label of the Pie and Donut charts.
 *
 * @default {}
 */
var CenterLabel = /** @class */ (function (_super) {
    __extends(CenterLabel, _super);
    function CenterLabel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(null)
    ], CenterLabel.prototype, "text", void 0);
    __decorate([
        Complex({ fontFamily: null, size: '16px', fontStyle: 'Normal', fontWeight: '600', color: null }, Font)
    ], CenterLabel.prototype, "textStyle", void 0);
    __decorate([
        Property(null)
    ], CenterLabel.prototype, "hoverTextFormat", void 0);
    return CenterLabel;
}(ChildProperty));
export { CenterLabel };
/**
 * The `Border` class provides configuration options for setting the borders in a chart.
 */
var Border = /** @class */ (function (_super) {
    __extends(Border, _super);
    function Border() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('')
    ], Border.prototype, "color", void 0);
    __decorate([
        Property(1)
    ], Border.prototype, "width", void 0);
    __decorate([
        Property('')
    ], Border.prototype, "dashArray", void 0);
    return Border;
}(ChildProperty));
export { Border };
/**
 * The `Offset` class provides options to adjust the position of the marker relative to its default location.
 */
var Offset = /** @class */ (function (_super) {
    __extends(Offset, _super);
    function Offset() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(0)
    ], Offset.prototype, "x", void 0);
    __decorate([
        Property(0)
    ], Offset.prototype, "y", void 0);
    return Offset;
}(ChildProperty));
export { Offset };
/**
 * The `Margin` class enables configuration of the space around the chart's content.
 */
var Margin = /** @class */ (function (_super) {
    __extends(Margin, _super);
    function Margin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(Browser.isDevice ? 5 : 10)
    ], Margin.prototype, "left", void 0);
    __decorate([
        Property(Browser.isDevice ? 5 : 10)
    ], Margin.prototype, "right", void 0);
    __decorate([
        Property(Browser.isDevice ? 5 : 10)
    ], Margin.prototype, "top", void 0);
    __decorate([
        Property(Browser.isDevice ? 5 : 10)
    ], Margin.prototype, "bottom", void 0);
    return Margin;
}(ChildProperty));
export { Margin };
/**
 * Configures the animation behavior for the chart series.
 */
var Animation = /** @class */ (function (_super) {
    __extends(Animation, _super);
    function Animation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(true)
    ], Animation.prototype, "enable", void 0);
    __decorate([
        Property(1000)
    ], Animation.prototype, "duration", void 0);
    __decorate([
        Property(0)
    ], Animation.prototype, "delay", void 0);
    return Animation;
}(ChildProperty));
export { Animation };
var TooltipSettings = /** @class */ (function (_super) {
    __extends(TooltipSettings, _super);
    function TooltipSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(false)
    ], TooltipSettings.prototype, "enable", void 0);
    __decorate([
        Property(true)
    ], TooltipSettings.prototype, "enableMarker", void 0);
    __decorate([
        Property(false)
    ], TooltipSettings.prototype, "shared", void 0);
    __decorate([
        Property(null)
    ], TooltipSettings.prototype, "fill", void 0);
    __decorate([
        Property(null)
    ], TooltipSettings.prototype, "header", void 0);
    __decorate([
        Property(null)
    ], TooltipSettings.prototype, "opacity", void 0);
    __decorate([
        Complex({ fontFamily: null, size: null, fontStyle: 'Normal', fontWeight: null, color: null }, Font)
    ], TooltipSettings.prototype, "textStyle", void 0);
    __decorate([
        Property(null)
    ], TooltipSettings.prototype, "format", void 0);
    __decorate([
        Property(null)
    ], TooltipSettings.prototype, "template", void 0);
    __decorate([
        Property(true)
    ], TooltipSettings.prototype, "enableAnimation", void 0);
    __decorate([
        Property(300)
    ], TooltipSettings.prototype, "duration", void 0);
    __decorate([
        Property(1000)
    ], TooltipSettings.prototype, "fadeOutDuration", void 0);
    __decorate([
        Property('Move')
    ], TooltipSettings.prototype, "fadeOutMode", void 0);
    __decorate([
        Property(false)
    ], TooltipSettings.prototype, "enableTextWrap", void 0);
    __decorate([
        Property(true)
    ], TooltipSettings.prototype, "showNearestPoint", void 0);
    __decorate([
        Complex({ color: null, width: null }, Border)
    ], TooltipSettings.prototype, "border", void 0);
    __decorate([
        Complex({ x: null, y: null }, Location)
    ], TooltipSettings.prototype, "location", void 0);
    __decorate([
        Property(false)
    ], TooltipSettings.prototype, "enableHighlight", void 0);
    __decorate([
        Property(false)
    ], TooltipSettings.prototype, "showNearestTooltip", void 0);
    __decorate([
        Property(true)
    ], TooltipSettings.prototype, "showHeaderLine", void 0);
    return TooltipSettings;
}(ChildProperty));
export { TooltipSettings };
/**
 * This class configures the appearance and behavior of points with empty data in the series.
 */
var EmptyPointSettings = /** @class */ (function (_super) {
    __extends(EmptyPointSettings, _super);
    function EmptyPointSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(null)
    ], EmptyPointSettings.prototype, "fill", void 0);
    __decorate([
        Complex({ color: '', width: 0 }, Border)
    ], EmptyPointSettings.prototype, "border", void 0);
    __decorate([
        Property('Gap')
    ], EmptyPointSettings.prototype, "mode", void 0);
    return EmptyPointSettings;
}(ChildProperty));
export { EmptyPointSettings };
/**
 * Specifies the indexes for the series and data points.
 *
 * @public
 */
var Indexes = /** @class */ (function (_super) {
    __extends(Indexes, _super);
    function Indexes() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(0)
    ], Indexes.prototype, "series", void 0);
    __decorate([
        Property(0)
    ], Indexes.prototype, "point", void 0);
    return Indexes;
}(ChildProperty));
export { Indexes };
/**
 * The `CornerRadius` class provides options to customize the rounding of the corners for columns in the column series.
 */
var CornerRadius = /** @class */ (function (_super) {
    __extends(CornerRadius, _super);
    function CornerRadius() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(0)
    ], CornerRadius.prototype, "topLeft", void 0);
    __decorate([
        Property(0)
    ], CornerRadius.prototype, "topRight", void 0);
    __decorate([
        Property(0)
    ], CornerRadius.prototype, "bottomLeft", void 0);
    __decorate([
        Property(0)
    ], CornerRadius.prototype, "bottomRight", void 0);
    return CornerRadius;
}(ChildProperty));
export { CornerRadius };
/**
 * Configures the padding around the chart legend container.
 */
var ContainerPadding = /** @class */ (function (_super) {
    __extends(ContainerPadding, _super);
    function ContainerPadding() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(0)
    ], ContainerPadding.prototype, "left", void 0);
    __decorate([
        Property(0)
    ], ContainerPadding.prototype, "right", void 0);
    __decorate([
        Property(0)
    ], ContainerPadding.prototype, "top", void 0);
    __decorate([
        Property(0)
    ], ContainerPadding.prototype, "bottom", void 0);
    return ContainerPadding;
}(ChildProperty));
export { ContainerPadding };
/**
 * Configures the borders of the chart title and subtitle.
 */
var titleBorder = /** @class */ (function (_super) {
    __extends(titleBorder, _super);
    function titleBorder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('transparent')
    ], titleBorder.prototype, "color", void 0);
    __decorate([
        Property(0)
    ], titleBorder.prototype, "width", void 0);
    __decorate([
        Property(0.8)
    ], titleBorder.prototype, "cornerRadius", void 0);
    return titleBorder;
}(ChildProperty));
export { titleBorder };
/**
 * The `titleSettings` class provides options to customize the title and subtitle displayed in the chart.
 */
var titleSettings = /** @class */ (function (_super) {
    __extends(titleSettings, _super);
    function titleSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('Normal')
    ], titleSettings.prototype, "fontStyle", void 0);
    __decorate([
        Property('15px')
    ], titleSettings.prototype, "size", void 0);
    __decorate([
        Property('500')
    ], titleSettings.prototype, "fontWeight", void 0);
    __decorate([
        Property('')
    ], titleSettings.prototype, "color", void 0);
    __decorate([
        Property('Center')
    ], titleSettings.prototype, "textAlignment", void 0);
    __decorate([
        Property('Segoe UI')
    ], titleSettings.prototype, "fontFamily", void 0);
    __decorate([
        Property(1)
    ], titleSettings.prototype, "opacity", void 0);
    __decorate([
        Property('Wrap')
    ], titleSettings.prototype, "textOverflow", void 0);
    __decorate([
        Property('Top')
    ], titleSettings.prototype, "position", void 0);
    __decorate([
        Property(0)
    ], titleSettings.prototype, "x", void 0);
    __decorate([
        Property(0)
    ], titleSettings.prototype, "y", void 0);
    __decorate([
        Property('transparent')
    ], titleSettings.prototype, "background", void 0);
    __decorate([
        Complex({}, titleBorder)
    ], titleSettings.prototype, "border", void 0);
    __decorate([
        Complex({}, Accessibility)
    ], titleSettings.prototype, "accessibility", void 0);
    return titleSettings;
}(ChildProperty));
export { titleSettings };
/**
 * The `TitleStyleSettings` class provides options to customize the title and subtitle displayed in the accumulation chart.
 */
var TitleStyleSettings = /** @class */ (function (_super) {
    __extends(TitleStyleSettings, _super);
    function TitleStyleSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('Top')
    ], TitleStyleSettings.prototype, "position", void 0);
    __decorate([
        Property(0)
    ], TitleStyleSettings.prototype, "x", void 0);
    __decorate([
        Property(0)
    ], TitleStyleSettings.prototype, "y", void 0);
    return TitleStyleSettings;
}(Font));
export { TitleStyleSettings };
/**
 * The `ChartArea` class provides properties to customize the appearance and layout of the chart's display area.
 */
var ChartArea = /** @class */ (function (_super) {
    __extends(ChartArea, _super);
    function ChartArea() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Complex({}, Border)
    ], ChartArea.prototype, "border", void 0);
    __decorate([
        Property('transparent')
    ], ChartArea.prototype, "background", void 0);
    __decorate([
        Property(1)
    ], ChartArea.prototype, "opacity", void 0);
    __decorate([
        Property(null)
    ], ChartArea.prototype, "backgroundImage", void 0);
    __decorate([
        Property(null)
    ], ChartArea.prototype, "width", void 0);
    __decorate([
        Complex({ left: 0, right: 0, top: 0, bottom: 0 }, Margin)
    ], ChartArea.prototype, "margin", void 0);
    return ChartArea;
}(ChildProperty));
export { ChartArea };
/**
 * Configures the drag settings for series in the chart.
 */
var DragSettings = /** @class */ (function (_super) {
    __extends(DragSettings, _super);
    function DragSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(false)
    ], DragSettings.prototype, "enable", void 0);
    __decorate([
        Property(null)
    ], DragSettings.prototype, "minY", void 0);
    __decorate([
        Property(null)
    ], DragSettings.prototype, "maxY", void 0);
    __decorate([
        Property(null)
    ], DragSettings.prototype, "fill", void 0);
    return DragSettings;
}(ChildProperty));
export { DragSettings };
/**
 * Configures the button settings in period selector.
 */
var Periods = /** @class */ (function (_super) {
    __extends(Periods, _super);
    function Periods() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('Years')
    ], Periods.prototype, "intervalType", void 0);
    __decorate([
        Property(1)
    ], Periods.prototype, "interval", void 0);
    __decorate([
        Property(null)
    ], Periods.prototype, "text", void 0);
    __decorate([
        Property(false)
    ], Periods.prototype, "selected", void 0);
    return Periods;
}(ChildProperty));
export { Periods };
/**
 * Configures the period selector settings.
 */
var PeriodSelectorSettings = /** @class */ (function (_super) {
    __extends(PeriodSelectorSettings, _super);
    function PeriodSelectorSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(43)
    ], PeriodSelectorSettings.prototype, "height", void 0);
    __decorate([
        Property('Bottom')
    ], PeriodSelectorSettings.prototype, "position", void 0);
    __decorate([
        Collection([], Periods)
    ], PeriodSelectorSettings.prototype, "periods", void 0);
    return PeriodSelectorSettings;
}(ChildProperty));
export { PeriodSelectorSettings };
var StockTooltipSettings = /** @class */ (function (_super) {
    __extends(StockTooltipSettings, _super);
    function StockTooltipSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(false)
    ], StockTooltipSettings.prototype, "enable", void 0);
    __decorate([
        Property(true)
    ], StockTooltipSettings.prototype, "enableMarker", void 0);
    __decorate([
        Property(false)
    ], StockTooltipSettings.prototype, "shared", void 0);
    __decorate([
        Property(null)
    ], StockTooltipSettings.prototype, "fill", void 0);
    __decorate([
        Property(null)
    ], StockTooltipSettings.prototype, "header", void 0);
    __decorate([
        Property(0.75)
    ], StockTooltipSettings.prototype, "opacity", void 0);
    __decorate([
        Complex({ fontFamily: null, size: '12px', fontStyle: 'Normal', fontWeight: null, color: null }, Font)
    ], StockTooltipSettings.prototype, "textStyle", void 0);
    __decorate([
        Property(null)
    ], StockTooltipSettings.prototype, "format", void 0);
    __decorate([
        Property(null)
    ], StockTooltipSettings.prototype, "template", void 0);
    __decorate([
        Property(true)
    ], StockTooltipSettings.prototype, "enableAnimation", void 0);
    __decorate([
        Property(300)
    ], StockTooltipSettings.prototype, "duration", void 0);
    __decorate([
        Property(1000)
    ], StockTooltipSettings.prototype, "fadeOutDuration", void 0);
    __decorate([
        Property('Move')
    ], StockTooltipSettings.prototype, "fadeOutMode", void 0);
    __decorate([
        Property(false)
    ], StockTooltipSettings.prototype, "enableTextWrap", void 0);
    __decorate([
        Property(true)
    ], StockTooltipSettings.prototype, "showNearestPoint", void 0);
    __decorate([
        Complex({ color: null, width: null }, Border)
    ], StockTooltipSettings.prototype, "border", void 0);
    __decorate([
        Property('Fixed')
    ], StockTooltipSettings.prototype, "position", void 0);
    __decorate([
        Property(false)
    ], StockTooltipSettings.prototype, "showNearestTooltip", void 0);
    __decorate([
        Property(true)
    ], StockTooltipSettings.prototype, "showHeaderLine", void 0);
    return StockTooltipSettings;
}(ChildProperty));
export { StockTooltipSettings };
/**
 * @private
 */
var Index = /** @class */ (function () {
    function Index(seriesIndex, pointIndex) {
        this.series = seriesIndex;
        this.point = pointIndex;
    }
    return Index;
}());
export { Index };
