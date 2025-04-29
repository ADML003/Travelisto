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
/**
 * Circular 3D chart legend.
 */
import { Browser, isNullOrUndefined, Animation, Property, Complex, ChildProperty } from '@syncfusion/ej2-base';
import { Border, ContainerPadding, Font, Margin } from '../../common/model/base';
import { BaseLegend, LegendOptions } from '../../common/legend/legend';
import { Rect, measureText } from '@syncfusion/ej2-svg-base';
import { textTrim, getElement } from '../../common/utils/helper';
import { textWrap } from '../../common/utils/helper';
import { legendClick } from '../../common/model/constants';
import { Location } from '../../common/model/base';
/**
 * Configures the legends in circular 3D charts.
 */
var CircularChart3DLegendSettings = /** @class */ (function (_super) {
    __extends(CircularChart3DLegendSettings, _super);
    function CircularChart3DLegendSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(true)
    ], CircularChart3DLegendSettings.prototype, "visible", void 0);
    __decorate([
        Property(null)
    ], CircularChart3DLegendSettings.prototype, "height", void 0);
    __decorate([
        Property(null)
    ], CircularChart3DLegendSettings.prototype, "width", void 0);
    __decorate([
        Complex({ x: 0, y: 0 }, Location)
    ], CircularChart3DLegendSettings.prototype, "location", void 0);
    __decorate([
        Property('Auto')
    ], CircularChart3DLegendSettings.prototype, "position", void 0);
    __decorate([
        Property(8)
    ], CircularChart3DLegendSettings.prototype, "padding", void 0);
    __decorate([
        Property(null)
    ], CircularChart3DLegendSettings.prototype, "itemPadding", void 0);
    __decorate([
        Property('Center')
    ], CircularChart3DLegendSettings.prototype, "alignment", void 0);
    __decorate([
        Complex({ fontFamily: null, size: null, fontStyle: null, fontWeight: null, color: null }, Font)
    ], CircularChart3DLegendSettings.prototype, "textStyle", void 0);
    __decorate([
        Property(10)
    ], CircularChart3DLegendSettings.prototype, "shapeHeight", void 0);
    __decorate([
        Property(10)
    ], CircularChart3DLegendSettings.prototype, "shapeWidth", void 0);
    __decorate([
        Complex({}, Border)
    ], CircularChart3DLegendSettings.prototype, "border", void 0);
    __decorate([
        Complex({ left: 0, right: 0, top: 0, bottom: 0 }, Margin)
    ], CircularChart3DLegendSettings.prototype, "margin", void 0);
    __decorate([
        Complex({ left: 0, right: 0, top: 0, bottom: 0 }, ContainerPadding)
    ], CircularChart3DLegendSettings.prototype, "containerPadding", void 0);
    __decorate([
        Property(8)
    ], CircularChart3DLegendSettings.prototype, "shapePadding", void 0);
    __decorate([
        Property('transparent')
    ], CircularChart3DLegendSettings.prototype, "background", void 0);
    __decorate([
        Property(1)
    ], CircularChart3DLegendSettings.prototype, "opacity", void 0);
    __decorate([
        Property(true)
    ], CircularChart3DLegendSettings.prototype, "toggleVisibility", void 0);
    __decorate([
        Property(false)
    ], CircularChart3DLegendSettings.prototype, "enableHighlight", void 0);
    __decorate([
        Property(null)
    ], CircularChart3DLegendSettings.prototype, "description", void 0);
    __decorate([
        Property(3)
    ], CircularChart3DLegendSettings.prototype, "tabIndex", void 0);
    __decorate([
        Property(null)
    ], CircularChart3DLegendSettings.prototype, "title", void 0);
    __decorate([
        Complex({ fontFamily: null, size: null, fontStyle: null, fontWeight: null, color: null }, Font)
    ], CircularChart3DLegendSettings.prototype, "titleStyle", void 0);
    __decorate([
        Property('Top')
    ], CircularChart3DLegendSettings.prototype, "titlePosition", void 0);
    __decorate([
        Property('Normal')
    ], CircularChart3DLegendSettings.prototype, "textWrap", void 0);
    __decorate([
        Property('Ellipsis')
    ], CircularChart3DLegendSettings.prototype, "textOverflow", void 0);
    __decorate([
        Property(100)
    ], CircularChart3DLegendSettings.prototype, "maximumTitleWidth", void 0);
    __decorate([
        Property(null)
    ], CircularChart3DLegendSettings.prototype, "maximumLabelWidth", void 0);
    __decorate([
        Property(true)
    ], CircularChart3DLegendSettings.prototype, "enablePages", void 0);
    __decorate([
        Property(false)
    ], CircularChart3DLegendSettings.prototype, "isInversed", void 0);
    __decorate([
        Property(false)
    ], CircularChart3DLegendSettings.prototype, "reverse", void 0);
    return CircularChart3DLegendSettings;
}(ChildProperty));
export { CircularChart3DLegendSettings };
/**
 * The `CircularChartLegend3D` module used to render the legend for a circular 3D chart.
 */
var CircularChartLegend3D = /** @class */ (function (_super) {
    __extends(CircularChartLegend3D, _super);
    /**
     * Constructor for CircularChart3D legend.
     *
     * @param {CircularChart3D} chart - The chart instance to which the legend belongs.
     */
    function CircularChartLegend3D(chart) {
        var _this = _super.call(this, chart) || this;
        _this.library = _this;
        _this.titleRect = new Rect(0, chart.margin.top, 0, 0);
        _this.addEventListener();
        return _this;
    }
    /**
     * Binds events for the legend module.
     *
     * @returns {void}
     */
    CircularChartLegend3D.prototype.addEventListener = function () {
        if (this.chart.isDestroyed) {
            return;
        }
        this.chart.on(Browser.touchMoveEvent, this.mouseMove, this);
        this.chart.on(Browser.touchEndEvent, this.mouseEnd, this);
        this.chart.on('click', this.click, this);
    };
    /**
     * Unbinds events for the legend module.
     *
     * @returns {void}
     */
    CircularChartLegend3D.prototype.removeEventListener = function () {
        if (this.chart.isDestroyed) {
            return;
        }
        this.chart.off(Browser.touchMoveEvent, this.mouseMove);
        this.chart.off('click', this.click);
        this.chart.off(Browser.touchEndEvent, this.mouseEnd);
    };
    /**
     * Handles mouse movement for the legend module.
     *
     * @param {MouseEvent} e - The mouse event.
     * @returns {void}
     */
    CircularChartLegend3D.prototype.mouseMove = function (e) {
        if (this.chart.legendSettings.visible && !this.chart.isTouch) {
            this.move(e);
            if (this.chart.circularChartHighlight3DModule && (this.chart.highlightMode !== 'None' || this.chart.legendSettings.enableHighlight)) {
                var legendItemsId = [this.legendID + '_text_', this.legendID + '_shape_marker_',
                    this.legendID + '_shape_', this.legendID + '_g_'];
                var targetId = e.target.id;
                for (var _i = 0, legendItemsId_1 = legendItemsId; _i < legendItemsId_1.length; _i++) {
                    var id = legendItemsId_1[_i];
                    if (targetId.indexOf(id) > -1) {
                        if (this.chart.circularChartSelection3DModule) {
                            this.chart.circularChartSelection3DModule.legendSelection(this.chart, e.target, e.type);
                        }
                        else if (this.chart.circularChartHighlight3DModule) {
                            this.chart.circularChartHighlight3DModule.legendSelection(this.chart, e.target, e.type);
                        }
                        break;
                    }
                }
            }
        }
    };
    /**
     * Handles mouse end for the legend module.
     *
     * @param {MouseEvent} e - The mouse event.
     * @returns {void}
     */
    CircularChartLegend3D.prototype.mouseEnd = function (e) {
        if (this.chart.legendSettings.visible && this.chart.isTouch) {
            this.move(e);
        }
    };
    /**
     * Retrieves the legend options for the circular 3D chart.
     *
     * @param {CircularChart3D} chart - The circular 3D chart instance.
     * @param {CircularChart3DSeries[]} series - The array of circular 3D series in the chart.
     * @returns {void}
     * @private
     */
    CircularChartLegend3D.prototype.getLegendOptions = function (chart, series) {
        this.legendCollections = [];
        this.isRtlEnable = chart.enableRtl;
        this.isReverse = !this.isRtlEnable && chart.legendSettings.reverse;
        for (var i = 0; i < 1; i++) {
            for (var _i = 0, _a = series[i].points; _i < _a.length; _i++) {
                var point = _a[_i];
                if (!isNullOrUndefined(point.x) && !isNullOrUndefined(point.y)) {
                    this.legendCollections.push(new LegendOptions(point.x.toString(), point.color, series[i].legendShape, point.visible, 'Pie', series[0].legendImageUrl, null, null, point.index, series[i].index));
                }
            }
            if (this.isReverse) {
                this.legendCollections.reverse();
            }
        }
    };
    /**
     * Calculates the legend bounds based on the available size, existing legend bounds, and legend settings.
     *
     * @param {Size} availableSize - The available size for the legend.
     * @param {Rect} legendBounds - The existing bounds of the legend.
     * @param {LegendSettingsModel} legend - The legend settings model.
     * @returns {void}
     * @private
     */
    CircularChartLegend3D.prototype.getLegendBounds = function (availableSize, legendBounds, legend) {
        this.calculateLegendTitle(legend, legendBounds);
        this.isTitle = legend.title ? true : false;
        var extraWidth = 0;
        var extraHeight = 0;
        var legendOption;
        this.chartRowCount = 1;
        this.rowHeights = [];
        this.columnHeights = [];
        this.pageHeights = [];
        var padding = legend.padding;
        var titlePosition = legend.titlePosition;
        var titlePlusArrowSpace = 0;
        var arrowWidth = this.arrowWidth;
        var arrowHeight = legend.enablePages ? 0 : this.arrowHeight;
        if (!this.isVertical) {
            extraHeight = !legend.height ? ((availableSize.height / 100) * 5) : 0;
        }
        else {
            extraWidth = !legend.width ? ((availableSize.width / 100) * 5) : 0;
        }
        legendBounds.width += extraWidth;
        legendBounds.height += extraHeight;
        var shapePadding = legend.shapePadding;
        var maximumWidth = legend.maximumLabelWidth ? legend.maximumLabelWidth : 0;
        var shapeWidth = legend.shapeWidth;
        var rowWidth = 0;
        var columnCount = 0;
        var rowCount = 0;
        var columnWidth = [];
        var pageWidth = [];
        var pageRowWidth = 0;
        var previousRowCount = 0;
        var columnHeight = 0;
        var legendWidth = 0;
        var titleHeight = 0;
        this.maxItemHeight = Math.max(measureText('MeasureText', legend.textStyle, this.chart.themeStyle.legendLabelFont).height, legend.shapeHeight);
        var legendEventArgs;
        var render = false;
        for (var i = 0; i < this.legendCollections.length; i++) {
            legendOption = this.legendCollections[i];
            legendEventArgs = {
                fill: legendOption.fill, text: legendOption.text, shape: legendOption.shape,
                name: 'legendRender', cancel: false
            };
            this.chart.trigger('legendRender', legendEventArgs);
            legendOption.render = !legendEventArgs.cancel;
            legendOption.text = ((legendEventArgs.text.indexOf('&') > -1) ?
                this.convertHtmlEntities(legendEventArgs.text) : legendEventArgs.text);
            legendOption.fill = legendEventArgs.fill;
            legendOption.shape = legendEventArgs.shape;
            legendOption.textSize = measureText(legendOption.text, legend.textStyle, this.chart.themeStyle.legendLabelFont);
            if (legendOption.render && legendOption.text !== '') {
                render = true;
                legendWidth = shapeWidth + shapePadding + (legend.maximumLabelWidth ? legend.maximumLabelWidth :
                    legendOption.textSize.width) + (!this.isVertical ? (i === 0) ? padding : this.itemPadding : padding);
                this.getLegendHeight(legendOption, legend, legendBounds, rowWidth, this.maxItemHeight, padding);
                if (this.isVertical) {
                    columnHeight += legendOption.textSize.height + ((i === 0) ? padding : this.itemPadding);
                    if (columnHeight + this.itemPadding + (arrowHeight / this.pageButtonSize) > (legendBounds.height)) {
                        rowWidth = rowWidth + maximumWidth;
                        pageRowWidth = this.getPageWidth(pageWidth);
                        this.totalPages = Math.max(rowCount, this.totalPages || 1);
                        if ((rowWidth - pageRowWidth + legendWidth) > legendBounds.width) {
                            pageWidth.push(rowWidth - pageRowWidth);
                            rowCount = this.rowHeights.length;
                            previousRowCount = rowCount;
                        }
                        else {
                            rowCount = previousRowCount;
                        }
                        columnWidth.push(maximumWidth);
                        maximumWidth = 0;
                        columnHeight = legendOption.textSize.height + padding;
                        columnCount++;
                    }
                    this.columnHeights[columnCount] = (this.columnHeights[columnCount] ?
                        this.columnHeights[columnCount] : 0) +
                        legendOption.textSize.height + ((i === 0) ? padding : this.itemPadding);
                    maximumWidth = Math.max(legendWidth, maximumWidth);
                    this.rowHeights[rowCount] = Math.max((this.rowHeights[rowCount] ?
                        this.rowHeights[rowCount] : 0), legendOption.textSize.height);
                    rowCount++;
                }
                else {
                    if (!legend.enablePages) { // For new legend navigation support
                        titlePlusArrowSpace = this.isTitle && titlePosition !== 'Top' ? this.legendTitleSize.width + this.fivePixel : 0;
                        titlePlusArrowSpace += arrowWidth;
                    }
                    rowWidth = rowWidth + legendWidth;
                    if (legendBounds.width < (padding + rowWidth + titlePlusArrowSpace)) {
                        maximumWidth = Math.max(maximumWidth, (rowWidth + padding + titlePlusArrowSpace - legendWidth));
                        if (rowCount === 0 && (legendWidth !== rowWidth)) {
                            rowCount = 1;
                        }
                        rowWidth = legendWidth;
                        rowCount++;
                        columnCount = 0;
                    }
                    var len = rowCount ? (rowCount - 1) : rowCount;
                    this.rowHeights[len] = Math.max((this.rowHeights[len] ? this.rowHeights[len] : 0), legendOption.textSize.height);
                    this.columnHeights[columnCount] = (this.columnHeights[columnCount] ?
                        this.columnHeights[columnCount] : 0) +
                        legendOption.textSize.height + padding;
                    columnCount++;
                }
            }
        }
        titleHeight = titlePosition === 'Top' ? this.legendTitleSize.height : 0;
        if (this.isVertical) {
            rowWidth = rowWidth + maximumWidth;
            this.isPaging = legendBounds.width < (rowWidth + padding);
            columnHeight = Math.max.apply(null, this.columnHeights) + padding + arrowHeight + titleHeight;
            columnHeight = Math.max(columnHeight, ((this.totalPages || 1) * (this.maxItemHeight + padding)) + padding + arrowHeight);
            this.isPaging = this.isPaging && (this.totalPages > 1);
            columnWidth.push(maximumWidth);
        }
        else {
            this.totalPages = rowCount;
            columnHeight = Math.max.apply(null, this.columnHeights) + padding + arrowHeight + titleHeight;
            this.isPaging = legendBounds.height < columnHeight;
            columnHeight = !legend.enablePages && this.isPaging ? (this.maxItemHeight + padding) + padding + titleHeight : columnHeight;
            columnHeight = Math.max(columnHeight, (this.maxItemHeight + padding) + padding + titleHeight);
            if (!this.isPaging) { // For title left and right position
                rowWidth += this.isTitle && titlePosition !== 'Top' ? (this.fivePixel + this.legendTitleSize.width + this.fivePixel) : 0;
            }
        }
        this.maxColumns = 0; // initialization for max columns
        var width = this.isVertical ? this.getMaxColumn(columnWidth, legendBounds.width, padding, rowWidth + padding) :
            Math.max(rowWidth + padding, maximumWidth);
        if (render) { // if any legends not skipped in event check
            this.setBounds(width, columnHeight, legend, legendBounds);
        }
        else {
            this.setBounds(0, 0, legend, legendBounds);
        }
    };
    /**
     * Calculates the total width by summing up the values in the provided array of page widths.
     *
     * @param {number[]} pageWidth - An array containing individual page widths.
     * @returns {number} - The total width calculated as the sum of page widths.
     * @private
     */
    CircularChartLegend3D.prototype.getPageWidth = function (pageWidth) {
        var sum = 0;
        for (var i = 0; i < pageWidth.length; i++) {
            sum += pageWidth[i];
        }
        return sum;
    };
    /**
     * Calculates the legend height based on the provided legend options, legend settings, bounds, row width,
     * legend height, and padding values.
     *
     * @param {LegendOptions} option - The legend options containing necessary information.
     * @param {LegendSettingsModel} legend - The legend settings model.
     * @param {Rect} bounds - The bounds of the legend.
     * @param {number} rowWidth - The width of the legend row.
     * @param {number} legendHeight - The height of the legend.
     * @param {number} padding - The padding value for additional space.
     * @returns {void}
     * @private
     */
    CircularChartLegend3D.prototype.getLegendHeight = function (option, legend, bounds, rowWidth, legendHeight, padding) {
        var legendWidth = option.textSize.width;
        var textPadding = legend.shapePadding + (padding * 2) + legend.shapeWidth;
        switch (legend.textWrap) {
            case 'Wrap':
            case 'AnyWhere':
                if (legendWidth > legend.maximumLabelWidth || legendWidth + rowWidth > bounds.width) {
                    option.textCollection = textWrap(option.text, (legend.maximumLabelWidth ? Math.min(legend.maximumLabelWidth, (bounds.width - textPadding)) :
                        (bounds.width - textPadding)), legend.textStyle, this.chart.enableRtl, null, null, this.chart.themeStyle.legendLabelFont);
                }
                else {
                    option.textCollection.push(option.text);
                }
                option.textSize.height = (legendHeight * option.textCollection.length);
                break;
        }
    };
    /**
     * Converts HTML entities in the given legend text to their corresponding normal string values.
     *
     * @param {string} legendText - The legend text containing HTML entities.
     * @returns {string} - The string with HTML entities converted to their normal values.
     * @private
     */
    CircularChartLegend3D.prototype.convertHtmlEntities = function (legendText) {
        var text = (legendText).replace('&amp;', '&').replace('&lt;', '<').replace('&gt;', '>').replace('&quot;', '"').replace('&nbsp;', ' ').replace('&cent;', '¢').replace('&pound;', '£').replace('&yen;', '¥').replace('&euro;', '€').replace('&copy;', '©').replace('&reg;', '®');
        text = (text).replace('&#38;', '&').replace('&#60;', '<').replace('&#62;', '>').replace('&#34;', '"').replace('&#160;', ' ').
            replace('&#162;', '¢').replace('&#163;', '£').replace('&#165;', '¥').replace('&#8364;', '€').replace('&#169;', '©').replace('&#174;', '®');
        return text;
    };
    /**
     * Retrieves the maximum column value for a given set of columns based on the specified width, padding, and row width.
     *
     * @param {number[]} columns - The array of column values to find the maximum from.
     * @param {number} width - The width parameter used in the calculation.
     * @param {number} padding - The padding value for additional space.
     * @param {number} rowWidth - The width of the legend row.
     * @returns {number} - The maximum column value calculated from the provided array.
     * @private
     */
    CircularChartLegend3D.prototype.getMaxColumn = function (columns, width, padding, rowWidth) {
        var maxPageColumn = padding;
        this.maxColumnWidth = Math.max.apply(null, columns);
        for (var i = 0; i < columns.length; i++) {
            maxPageColumn += this.maxColumnWidth;
            this.maxColumns++;
            if (maxPageColumn + padding > width) {
                maxPageColumn -= this.maxColumnWidth;
                this.maxColumns--;
                break;
            }
        }
        this.isPaging = (maxPageColumn < rowWidth) && (this.totalPages > 1);
        if (maxPageColumn === padding) {
            maxPageColumn = width;
        }
        this.maxColumns = Math.max(1, this.maxColumns);
        this.maxWidth = maxPageColumn;
        var columnWidth = this.maxColumnWidth + padding;
        var prevPage = 0;
        var columnCount = this.columnHeights.length;
        if (this.isPaging && this.isVertical) {
            for (var i = 1; i < columnCount; i++) {
                columnWidth += (this.maxColumnWidth + padding);
                if (columnWidth > width) {
                    this.pageHeights.push(((prevPage !== i - 1) ? Math.max.apply(null, this.columnHeights.slice(prevPage, i - 1)) :
                        this.columnHeights[prevPage]));
                    columnWidth = this.maxColumnWidth + padding;
                    prevPage = i;
                }
            }
            this.pageHeights.push(((prevPage !== columnCount - 1) ?
                Math.max.apply(null, this.columnHeights.slice(prevPage, columnCount - 1)) : this.columnHeights[prevPage]));
            this.totalPages = this.pageHeights.length;
        }
        return maxPageColumn;
    };
    /**
     * Calculates the available width from the legend's x position.
     *
     * @param {number} tx - The x position of the legend.
     * @param {number} width - The width of the legend.
     * @returns {number} - The available width of the legend.
     */
    CircularChartLegend3D.prototype.getAvailWidth = function (tx, width) {
        if (this.isVertical) {
            width = this.maxWidth;
        }
        else if (!this.isVertical && this.isPaging && !this.legend.enablePages) {
            return width - tx - this.fivePixel;
        }
        return width - ((this.legend.padding * 2) + this.legend.shapeWidth + this.legend.shapePadding);
    };
    /**
     * Determines the legend rendering locations from legend items.
     *
     * @param {LegendOptions} legendOption - The current legend option.
     * @param {ChartLocation} start - The start location of the legend.
     * @param {number} textPadding - The text padding of the legend text.
     * @param {LegendOptions} prevLegend - The previous legend option.
     * @param {Rect} rect - The legend bounds.
     * @param {number} count - The legend index.
     * @param {number} firstLegend - The current legend location.
     * @returns {void}
     * @private
     */
    CircularChartLegend3D.prototype.getRenderPoint = function (legendOption, start, textPadding, prevLegend, rect, count, firstLegend) {
        var padding = this.legend.padding;
        var previousLocation = prevLegend.location.y + this.maxItemHeight / 4 + (prevLegend.textCollection.length > 0 ?
            ((prevLegend.textCollection.length - 1) * this.maxItemHeight) : 0);
        if (this.isVertical) {
            if (count === firstLegend || (previousLocation + legendOption.textSize.height + padding > (rect.y + rect.height))) {
                legendOption.location.x = prevLegend.location.x + ((count === firstLegend) ? 0 : (!this.isRtlEnable) ?
                    this.maxColumnWidth : -this.maxColumnWidth);
                legendOption.location.y = start.y;
                var textStartLoc = (this.legend.shapeWidth / 2) + padding;
                this.pageXCollections.push(legendOption.location.x + ((!this.isRtlEnable) ? -textStartLoc : textStartLoc));
            }
            else {
                legendOption.location.x = prevLegend.location.x;
                legendOption.location.y = prevLegend.location.y + prevLegend.textSize.height + this.itemPadding;
            }
        }
        else {
            var textWidth = textPadding + (this.legend.maximumLabelWidth ?
                this.legend.maximumLabelWidth : prevLegend.textSize.width);
            var previousBound = prevLegend.location.x + ((!this.isRtlEnable) ? textWidth : -textWidth);
            if (this.isWithinBounds(previousBound, (this.legend.maximumLabelWidth ? this.legend.maximumLabelWidth :
                legendOption.textSize.width) + textPadding - this.itemPadding, rect, this.legend.shapeWidth / 2)) {
                if (count !== firstLegend) {
                    this.chartRowCount++;
                }
                legendOption.location.y = (count === firstLegend) ? prevLegend.location.y :
                    prevLegend.location.y + this.rowHeights[(this.chartRowCount - 2)] + padding;
                legendOption.location.x = start.x;
            }
            else {
                legendOption.location.y = prevLegend.location.y;
                legendOption.location.x = (count === firstLegend) ? prevLegend.location.x : previousBound;
            }
        }
        var availablewidth = this.getAvailWidth(legendOption.location.x, this.legendBounds.width);
        availablewidth = this.legend.maximumLabelWidth ? Math.min(this.legend.maximumLabelWidth, availablewidth) : availablewidth;
        if (this.legend.textOverflow === 'Ellipsis' && this.legend.textWrap === 'Normal') {
            legendOption.text = textTrim(+availablewidth.toFixed(4), legendOption.text, this.legend.textStyle, this.chart.enableRtl, this.chart.themeStyle.legendLabelFont);
        }
    };
    /**
     * Checks whether the legend group is within the specified legend bounds, considering RTL (Right-to-Left) rendering.
     *
     * @param {number} previousBound - The previous legend bound value.
     * @param {number} textWidth - The width of the legend text.
     * @param {Rect} legendBounds - The bounds of the legend.
     * @param {number} shapeWidth - The width of the legend shape.
     * @returns {boolean} - Returns true if the legend group is within bounds; otherwise, returns false.
     * @private
     */
    CircularChartLegend3D.prototype.isWithinBounds = function (previousBound, textWidth, legendBounds, shapeWidth) {
        if (!this.isRtlEnable) {
            return (previousBound + textWidth) > (legendBounds.x + legendBounds.width + shapeWidth);
        }
        else {
            return (previousBound - textWidth) < (legendBounds.x - shapeWidth);
        }
    };
    /**
     * Determines the smart legend placement based on specified label bounds, legend bounds, and margin settings.
     *
     * @param {Rect} labelBound - The bounds of the legend label.
     * @param {Rect} legendBound - The bounds of the legend.
     * @param {MarginModel} margin - The margin settings for additional space.
     * @returns {void}
     * @private
     */
    CircularChartLegend3D.prototype.getSmartLegendLocation = function (labelBound, legendBound, margin) {
        var space;
        switch (this.position) {
            case 'Left':
                space = ((labelBound.x - legendBound.width) - margin.left) / 2;
                legendBound.x = (labelBound.x - legendBound.width) < margin.left ? legendBound.x :
                    (labelBound.x - legendBound.width) - space;
                break;
            case 'Right':
                space = ((this.chart.availableSize.width - margin.right) - (labelBound.x + labelBound.width + legendBound.width)) / 2;
                legendBound.x = (labelBound.x + labelBound.width + legendBound.width) > (this.chart.availableSize.width - margin.right) ?
                    legendBound.x : (labelBound.x + labelBound.width + space);
                break;
            case 'Top':
                this.getTitleRect(this.chart);
                space = ((labelBound.y - legendBound.height) - (this.titleRect.y + this.titleRect.height)) / 2;
                legendBound.y = (labelBound.y - legendBound.height) < margin.top ? legendBound.y :
                    (labelBound.y - legendBound.height) - space;
                break;
            case 'Bottom':
                space = ((this.chart.availableSize.height - margin.bottom) - (labelBound.y + labelBound.height + legendBound.height)) / 2;
                legendBound.y = labelBound.y + labelBound.height + legendBound.height > (this.chart.availableSize.height - margin.bottom) ?
                    legendBound.y : (labelBound.y + labelBound.height) + space;
                break;
        }
    };
    /**
     * Retrieves the title rectangle for the circular 3D chart.
     *
     * @param {CircularChart3D} circular - The circular 3D chart instance.
     * @returns {Rect | null} - The title rectangle or null if no title is present.
     * @private
     */
    CircularChartLegend3D.prototype.getTitleRect = function (circular) {
        if (!circular.title) {
            return null;
        }
        var titleSize = measureText(circular.title, circular.titleStyle, this.chart.themeStyle.legendTitleFont);
        this.titleRect = new Rect(circular.availableSize.width / 2 - titleSize.width / 2, circular.margin.top, titleSize.width, titleSize.height);
    };
    /**
     * Retrieves the legend options based on the specified index from the given legend collections.
     *
     * @param {number} index - The index used to find the corresponding legend in the legend collections.
     * @param {LegendOptions[]} legendCollections - The array of legend options containing legend information.
     * @returns {LegendOptions | undefined} - The legend options corresponding to the specified index, or null if not found.
     * @private
     */
    CircularChartLegend3D.prototype.legendByIndex = function (index, legendCollections) {
        for (var _i = 0, legendCollections_1 = legendCollections; _i < legendCollections_1.length; _i++) {
            var legend = legendCollections_1[_i];
            if (legend.pointIndex === index) {
                return legend;
            }
        }
        return null;
    };
    /**
     * Handles the click event to show or hide the legend.
     *
     * @param {Event} event - The event object representing the click event.
     * @returns {void}
     * @private
     */
    CircularChartLegend3D.prototype.click = function (event) {
        var targetId = event.target.id.indexOf('_chart_legend_g_') > -1 ?
            event.target.firstChild['id'] : event.target.id;
        var chart = this.chart;
        var legendItemsId = [this.legendID + '_text_', this.legendID + '_shape_', this.legendID + '_shape_marker_'];
        this.chart.animateSeries = false;
        for (var _i = 0, legendItemsId_2 = legendItemsId; _i < legendItemsId_2.length; _i++) {
            var id = legendItemsId_2[_i];
            if (targetId.indexOf(id) > -1) {
                var pointIndex = parseInt(targetId.split(id)[1], 10);
                if (this.chart.legendSettings.toggleVisibility && !isNaN(pointIndex)) {
                    var currentSeries = this.chart.visibleSeries[0];
                    var point = currentSeries.points[pointIndex];
                    var legendOption = this.legendByIndex(pointIndex, this.legendCollections);
                    var legendClickArgs = {
                        legendText: legendOption.text, legendShape: legendOption.shape,
                        chart: chart,
                        series: currentSeries, point: point,
                        name: legendClick, cancel: false
                    };
                    this.chart.trigger(legendClick, legendClickArgs);
                    if (!legendClickArgs.cancel) {
                        point.visible = !point.visible;
                        legendOption.visible = point.visible;
                        currentSeries.sumOfPoints += point.visible ? point.y : -point.y;
                        chart.redraw = chart.enableAnimation;
                        this.sliceVisibility(pointIndex, point.visible);
                        chart.removeSeriesElements(chart);
                        chart.removeSvg();
                        var svgObject = document.getElementById(this.chart.element.id + '-svg-chart-3d');
                        if (svgObject) {
                            while (svgObject.childNodes.length > 0) {
                                svgObject.removeChild(svgObject.firstChild);
                            }
                        }
                        this.chart.circular3DPolygon = [];
                        this.chart.visibleSeries[0].segments = [];
                        this.chart.animateSeries = false;
                        this.chart.calculateBounds();
                        this.chart.renderElements();
                        if (chart.circularChartHighlight3DModule && (chart.highlightMode !== 'None' || chart.legendSettings.enableHighlight)) {
                            chart.circularChartHighlight3DModule.redrawSelection(chart);
                        }
                    }
                }
                else {
                    if (this.chart.circularChartSelection3DModule && !isNaN(pointIndex)) {
                        this.chart.circularChartSelection3DModule.legendSelection(this.chart, event.target, event.type);
                    }
                    else if (this.chart.circularChartHighlight3DModule && !isNaN(pointIndex)) {
                        this.chart.circularChartHighlight3DModule.legendSelection(this.chart, event.target, event.type);
                    }
                }
            }
        }
        if (targetId.indexOf(this.legendID + '_pageup') > -1) {
            this.changePage(event, true);
        }
        else if (targetId.indexOf(this.legendID + '_pagedown') > -1) {
            this.changePage(event, false);
        }
        chart.redraw = false;
    };
    /**
     * Updates the visibility of a slice in the circular 3D chart based on the specified index and visibility status.
     *
     * @param {number} index - The index of the slice to be updated.
     * @param {boolean} isVisible - The visibility status to be set for the slice.
     * @returns {void}
     * @private
     */
    CircularChartLegend3D.prototype.sliceVisibility = function (index, isVisible) {
        var sliceId = this.chart.element.id + '_Series_0_Point_';
        if (this.chart.visibleSeries[0].dataLabel.visible) {
            sliceId = this.chart.element.id + '_datalabel_Series_0_';
            this.sliceAnimate(getElement(sliceId + 'g_' + index), isVisible);
        }
    };
    /**
     * Performs animation on the specified slice elements based on the visibility of a slice.
     *
     * @param {Element} element - The slice element to be animated.
     * @param {boolean} isVisible - A boolean value indicating the visibility of the slice.
     * @returns {void}
     */
    CircularChartLegend3D.prototype.sliceAnimate = function (element, isVisible) {
        if (!element) {
            return null;
        }
        new Animation({}).animate(element, {
            duration: 300,
            delay: 0,
            name: isVisible ? 'FadeIn' : 'FadeOut',
            end: function (args) {
                args.element.style.visibility = isVisible ? 'visible' : 'hidden';
            }
        });
    };
    /**
     * Retrieves the module name for the circular 3D chart legend.
     *
     * @returns {string} - The module name.
     */
    CircularChartLegend3D.prototype.getModuleName = function () {
        return 'CircularChartLegend3D';
    };
    /**
     * Destroys the circular 3D chart legend.
     *
     * @returns {void}
     * @private
     */
    CircularChartLegend3D.prototype.destroy = function () {
        this.removeEventListener();
    };
    return CircularChartLegend3D;
}(BaseLegend));
export { CircularChartLegend3D };
