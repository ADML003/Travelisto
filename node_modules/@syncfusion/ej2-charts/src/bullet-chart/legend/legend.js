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
/**
 * Chart legend
 */
import { Browser, isNullOrUndefined } from '@syncfusion/ej2-base';
import { LegendOptions, BaseLegend } from '../../common/legend/legend';
import { textTrim } from '../../common/utils/helper';
import { measureText } from '@syncfusion/ej2-svg-base';
import { legendRender } from '../../common/model/constants';
/**
 * `Legend` module is used to render legend for the chart.
 */
var BulletChartLegend = /** @class */ (function (_super) {
    __extends(BulletChartLegend, _super);
    function BulletChartLegend(chart) {
        var _this = _super.call(this, chart) || this;
        _this.library = _this;
        _this.addEventListener();
        return _this;
    }
    /**
     * Binding events for legend module.
     *
     * @returns {void}
     */
    BulletChartLegend.prototype.addEventListener = function () {
        if (this.chart.isDestroyed) {
            return;
        }
        this.chart.on('click', this.click, this);
        this.chart.on(Browser.touchEndEvent, this.mouseEnd, this);
        this.chart.on(Browser.touchMoveEvent, this.bulletMouseMove, this);
    };
    /**
     * UnBinding events for bullet chart legend module.
     *
     * @returns {void}
     */
    BulletChartLegend.prototype.removeEventListener = function () {
        if (this.chart.isDestroyed) {
            return;
        }
        this.chart.off('click', this.click);
        this.chart.off(Browser.touchEndEvent, this.mouseEnd);
        this.chart.off(Browser.touchMoveEvent, this.bulletMouseMove);
    };
    /**
     * To handle mouse move for legend module.
     *
     * @param {MouseEvent} e - The mouse move event for the legend module.
     * @returns {void}
     */
    BulletChartLegend.prototype.bulletMouseMove = function (e) {
        if (this.chart.legendSettings.visible && this.chart.isTouch) {
            this.move(e);
        }
    };
    /**
     * To handle mouse end for legend module.
     *
     * @param {MouseEvent} e - The mouse end event for the legend module.
     * @returns {void}
     */
    BulletChartLegend.prototype.mouseEnd = function (e) {
        if (this.chart.legendSettings.visible && this.chart.isTouch) {
            this.move(e);
        }
    };
    /**
     * Get the legend options.
     *
     * @param {Range[]} visibleRangeCollection - The collection of visible ranges.
     * @returns {void}
     * @private
     */
    BulletChartLegend.prototype.getLegendOptions = function (visibleRangeCollection) {
        this.legendCollections = [];
        var fill;
        var count = 0;
        this.isRtlEnable = this.chart.enableRtl;
        var key = 'color';
        var bulletChart = this.chart;
        for (var _i = 0, visibleRangeCollection_1 = visibleRangeCollection; _i < visibleRangeCollection_1.length; _i++) {
            var range = visibleRangeCollection_1[_i];
            if (range.name !== null) {
                fill = range.color ? range.color : bulletChart.themeStyle.rangeStrokes[range.index][key];
                this.legendCollections.push(new LegendOptions(range.name, fill, range.shape, this.chart.legendSettings.visible, null, range.legendImageUrl, null, false, range.index, null));
                count++;
            }
        }
        if (bulletChart.dataSource !== null && bulletChart.valueField !== '') {
            fill = (bulletChart.theme.indexOf('Dark') > -1) ? 'white' : bulletChart.valueFill ? bulletChart.valueFill : 'black';
            var shape = bulletChart.orientation === 'Vertical' ? 'TargetRect' : 'ActualRect';
            this.legendCollections.push(new LegendOptions('Actual', fill, shape, this.chart.legendSettings.visible, null, '', null, false, count++, null));
        }
        if (bulletChart.dataSource !== null && bulletChart.targetField !== '') {
            fill = (bulletChart.theme.indexOf('Dark') > -1) ? 'white' : bulletChart.targetColor ? bulletChart.targetColor : 'black';
            var shape = bulletChart.orientation === 'Vertical' ? 'ActualRect' : 'TargetRect';
            for (var i = 0; i < Object.keys(bulletChart.dataSource).length; i++) {
                if (isNullOrUndefined(bulletChart.dataSource[i][bulletChart.targetField].length)
                    || bulletChart.dataSource[i][bulletChart.targetField].length === 1) {
                    while (i === 0) {
                        this.legendCollections.push(new LegendOptions('Target', fill, shape, this.chart.legendSettings.visible, null, '', null, false, count++, null));
                        break;
                    }
                }
                else {
                    var targetTypes = bulletChart.targetTypes;
                    var targetType = [];
                    var targetTypeLength = targetTypes.length;
                    while (i === 0) {
                        for (var i_1 = 0; i_1 < targetTypeLength; i_1++) {
                            targetType[i_1] = targetTypes[i_1 % targetTypeLength];
                            targetType[i_1] = (targetType[i_1] === 'Rect') ? bulletChart.orientation === 'Vertical' ?
                                'ActualRect' : 'TargetRect' : (targetType[i_1]);
                            targetType[i_1] = (targetType[i_1] === 'Cross') ? 'Multiply' : targetType[i_1];
                            this.legendCollections.push(new LegendOptions('Target_' + i_1, fill, targetType[i_1], this.chart.legendSettings.visible, null, '', null, false, count++, null));
                        }
                        break;
                    }
                }
            }
        }
    };
    /**
     * Retrieves the legend bounds for the bullet chart.
     *
     * @param {Size} availableSize - The available size for rendering.
     * @param {Rect} bulletLegendBounds - The bounds of the bullet chart legend.
     * @param {LegendSettingsModel} legend - The legend settings for the bullet chart.
     * @returns {void}
     * @private
     */
    BulletChartLegend.prototype.getLegendBounds = function (availableSize, bulletLegendBounds, legend) {
        var extraWidth = 0;
        var padding = legend.padding;
        var extraHeight = 0;
        if (!this.isVertical) {
            extraHeight = ((availableSize.height / 100) * 5);
        }
        else {
            extraWidth = ((availableSize.width / 100) * 5);
        }
        bulletLegendBounds.height += extraHeight;
        bulletLegendBounds.width += extraWidth;
        var maximumWidth = 0;
        var legendRowWidth = 0;
        var legendRowCount = 0;
        var legendWidth = 0;
        var columnHeight = 0;
        var shapeWidth = legend.shapeWidth;
        var shapePadding = legend.shapePadding;
        var legendEventArgs;
        this.maxItemHeight = Math.max(measureText('MeasureText', legend.textStyle, this.chart.themeStyle.legendLabelFont).height, legend.shapeHeight);
        var render = false;
        for (var _i = 0, _a = this.legendCollections; _i < _a.length; _i++) {
            var bulletLegendOption = _a[_i];
            legendEventArgs = {
                fill: bulletLegendOption.fill, text: bulletLegendOption.text, shape: bulletLegendOption.shape,
                name: legendRender, cancel: false
            };
            this.chart.trigger(legendRender, legendEventArgs);
            bulletLegendOption.render = !legendEventArgs.cancel;
            bulletLegendOption.text = legendEventArgs.text;
            bulletLegendOption.fill = legendEventArgs.fill;
            bulletLegendOption.shape = legendEventArgs.shape;
            bulletLegendOption.textSize = measureText(bulletLegendOption.text, legend.textStyle, this.chart.themeStyle.legendLabelFont);
            if (bulletLegendOption.render && bulletLegendOption.text !== '') {
                render = true;
                legendWidth = shapeWidth + shapePadding + bulletLegendOption.textSize.width + padding;
                legendRowWidth = legendRowWidth + legendWidth;
                if (bulletLegendBounds.width < (padding + legendRowWidth) || this.isVertical) {
                    maximumWidth = Math.max(maximumWidth, (legendRowWidth + padding - (this.isVertical ? 0 : legendWidth)));
                    if (legendRowCount === 0 && (legendWidth !== legendRowWidth)) {
                        legendRowCount = 1;
                    }
                    legendRowWidth = this.isVertical ? 0 : legendWidth;
                    legendRowCount++;
                    columnHeight = (legendRowCount * (this.maxItemHeight + padding)) + padding;
                }
            }
        }
        columnHeight = Math.max(columnHeight, (this.maxItemHeight + padding) + padding);
        this.isPaging = bulletLegendBounds.height < columnHeight;
        this.totalPages = legendRowCount;
        if (render) {
            this.setBounds(Math.max((legendRowWidth + padding), maximumWidth), (this.position === 'Bottom' || this.position === 'Top') ? Math.min(columnHeight, this.chart.initialClipRect.height -
                (this.legend.border.width + this.legend.margin.bottom + this.legend.margin.top)) : columnHeight, legend, bulletLegendBounds);
        }
        else {
            this.setBounds(0, 0, legend, bulletLegendBounds);
        }
    };
    /**
     * Retrieves the rendering point for the bullet chart legend.
     *
     * @param {LegendOptions} bulletLegendOption - The legend options for the bullet chart.
     * @param {ChartLocation} start - The starting location for rendering.
     * @param {number} textPadding - The padding around the text.
     * @param {LegendOptions} prevLegend - The previous legend options.
     * @param {Rect} rect - The rect region for the legend.
     * @param {number} count - The count of legends.
     * @param {number} firstLegend - The index of the first legend.
     * @returns {void}
     * @private
     */
    BulletChartLegend.prototype.getRenderPoint = function (bulletLegendOption, start, textPadding, prevLegend, rect, count, firstLegend) {
        var textWidth = textPadding + (this.legend.maximumLabelWidth ? this.legend.maximumLabelWidth : prevLegend.textSize.width);
        var previousBound = prevLegend.location.x + ((!this.isRtlEnable) ? textWidth : -textWidth);
        var padding = this.legend.padding;
        if ((previousBound + (bulletLegendOption.textSize.width + textPadding)) > (rect.x + rect.width + this.legend.shapeWidth / 2) ||
            this.isVertical) {
            bulletLegendOption.location.x = start.x;
            bulletLegendOption.location.y = (count === firstLegend) ? prevLegend.location.y :
                prevLegend.location.y + this.maxItemHeight + padding;
        }
        else {
            bulletLegendOption.location.x = (count === firstLegend) ? prevLegend.location.x : previousBound;
            bulletLegendOption.location.y = prevLegend.location.y;
        }
        var availwidth = (!this.isRtlEnable) ? (this.legendBounds.x + this.legendBounds.width) - (bulletLegendOption.location.x +
            textPadding - this.itemPadding - this.legend.shapeWidth / 2) : (bulletLegendOption.location.x - textPadding +
            this.itemPadding + (this.legend.shapeWidth / 2)) - this.legendBounds.x;
        bulletLegendOption.text = textTrim(+availwidth.toFixed(4), bulletLegendOption.text, this.legend.textStyle, this.chart.enableRtl, this.chart.themeStyle.legendLabelFont);
    };
    /**
     * To show the tooltip for the trimmed text in legend.
     *
     * @param {Event | PointerEvent} event - The click event.
     * @returns {void}
     */
    BulletChartLegend.prototype.click = function (event) {
        var symbolTargetId = event.target.id;
        if (symbolTargetId.indexOf(this.legendID + '_pagedown') > -1) {
            this.changePage(event, false);
        }
        else if (symbolTargetId.indexOf(this.legendID + '_pageup') > -1) {
            this.changePage(event, true);
        }
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    BulletChartLegend.prototype.getModuleName = function () {
        return 'BulletChartLegend';
    };
    /**
     * To destroy the Legend.
     *
     * @returns {void}
     * @private
     */
    BulletChartLegend.prototype.destroy = function () {
        /**
         * Destroy method calling here.
         */
        this.removeEventListener();
    };
    return BulletChartLegend;
}(BaseLegend));
export { BulletChartLegend };
