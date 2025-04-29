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
 * AccumulationChart Tooltip file.
 */
import { Browser, remove } from '@syncfusion/ej2-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { AccPointData, withInBounds, indexFinder } from '../../common/utils/helper';
//import { Rect } from '@syncfusion/ej2-svg-base';
import { BaseTooltip } from '../../common/user-interaction/tooltip';
import { tooltipRender } from '../../common/model/constants';
/**
 * The `AccumulationTooltip` module is used to render tooltips for the accumulation chart.
 */
var AccumulationTooltip = /** @class */ (function (_super) {
    __extends(AccumulationTooltip, _super);
    function AccumulationTooltip(accumulation) {
        var _this = _super.call(this, accumulation) || this;
        _this.accumulation = accumulation;
        _this.addEventListener();
        _this.template = _this.accumulation.tooltip.template;
        return _this;
    }
    /**
     * Adds an event listener.
     *
     * @hidden
     * @returns {void}
     */
    AccumulationTooltip.prototype.addEventListener = function () {
        if (this.accumulation.isDestroyed) {
            return;
        }
        this.accumulation.on(Browser.isPointer ? 'pointerleave' : 'mouseleave', this.mouseLeaveHandler, this);
        this.accumulation.on(Browser.touchMoveEvent, this.mouseMoveHandler, this);
        this.accumulation.on(Browser.touchEndEvent, this.mouseUpHandler, this);
    };
    AccumulationTooltip.prototype.mouseLeaveHandler = function () {
        this.removeTooltip(this.accumulation.tooltip.fadeOutDuration);
    };
    AccumulationTooltip.prototype.mouseUpHandler = function (e) {
        var control = this.accumulation;
        if (control.tooltip.enable && control.isTouch && withInBounds(control.mouseX, control.mouseY, control.initialClipRect)) {
            this.tooltip(e);
            this.removeTooltip(2000);
        }
    };
    AccumulationTooltip.prototype.mouseMoveHandler = function (e) {
        var control = this.accumulation;
        // Tooltip for chart series.
        if (control.tooltip.enable && withInBounds(control.mouseX, control.mouseY, control.initialClipRect)) {
            this.tooltip(e);
        }
    };
    /**
     * Renders the tooltip.
     *
     * @param {PointerEvent | TouchEvent} event - The mouse move event or touch event.
     * @returns {void}
     * @private
     */
    AccumulationTooltip.prototype.tooltip = function (event) {
        this.renderSeriesTooltip(this.accumulation, this.getPieData(event, this.accumulation));
    };
    /**
     * @private
     */
    AccumulationTooltip.prototype.renderSeriesTooltip = function (chart, data) {
        var svgElement = this.getElement(this.element.id + '_tooltip_svg');
        var isTooltip = svgElement && parseInt(svgElement.getAttribute('opacity'), 10) > 0;
        var tooltipDiv = this.getTooltipElement(isTooltip);
        var isFirst = !isTooltip;
        this.currentPoints = [];
        if (data.point && (!this.previousPoints[0] || (this.previousPoints[0].point !== data.point))) {
            if (this.previousPoints[0] && data.point.index === this.previousPoints[0].point.index
                && data.series.index === this.previousPoints[0].series.index) {
                return null;
            }
            if (this.pushData(data, isFirst, tooltipDiv, false)) {
                this.triggerTooltipRender(data, isFirst, this.getTooltipText(data, chart.tooltip), this.findHeader(data));
            }
        }
        else {
            if (!data.point && this.isRemove) {
                this.removeTooltip(this.accumulation.tooltip.fadeOutDuration);
                this.isRemove = false;
            }
        }
    };
    AccumulationTooltip.prototype.triggerTooltipRender = function (point, isFirst, textCollection, headerText) {
        var _this = this;
        //let template: string;
        var tooltip = this.chart.tooltip;
        var argsData = {
            cancel: false, name: tooltipRender, text: textCollection, point: point.point, textStyle: this.textStyle,
            series: this.accumulation.isBlazor ? {} : point.series, headerText: headerText,
            data: {
                pointX: point.point.x, pointY: point.point.y, seriesIndex: point.series.index,
                pointIndex: point.point.index, pointText: point.point.text, seriesName: point.series.name
            }
        };
        var tooltipSuccess = function (argsData) {
            if (!argsData.cancel) {
                _this.formattedText = _this.formattedText.concat(argsData.text);
                _this.text = _this.formattedText;
                _this.headerText = argsData.headerText;
                _this.createTooltip(_this.chart, isFirst, { x: (tooltip.location.x !== null) ? tooltip.location.x :
                        point.point.symbolLocation.x, y: (tooltip.location.y !== null) ? tooltip.location.y : point.point.symbolLocation.y }, point.series.clipRect, point.point, !tooltip.enableMarker ? [] : ['Circle'], 0, _this.chart.initialClipRect, false, null, point.point, _this.template ? _this.accumulation.enableHtmlSanitizer ? _this.accumulation.sanitize(_this.template) : argsData.template : '');
            }
            else {
                _this.removeHighlight();
                remove(_this.getElement(_this.element.id + '_tooltip'));
            }
            _this.isRemove = true;
        };
        tooltipSuccess.bind(this, point);
        this.chart.trigger(tooltipRender, argsData, tooltipSuccess);
    };
    AccumulationTooltip.prototype.getPieData = function (e, chart) {
        var target = e.target;
        var id = indexFinder(target.id, true);
        if (!isNaN(id.series)) {
            var seriesIndex = id.series;
            var pointIndex = id.point;
            if (!isNullOrUndefined(seriesIndex) && !isNaN(seriesIndex) && !isNullOrUndefined(pointIndex) && !isNaN(pointIndex)) {
                var series = this.getSeriesFromIndex(seriesIndex, chart.visibleSeries);
                if (series.enableTooltip) {
                    return new AccPointData(series.points[pointIndex], series);
                }
            }
        }
        return new AccPointData(null, null);
    };
    /**
     * To get series from index.
     *
     * @param {number} index - The index of the series to retrieve.
     * @param {AccumulationSeries[]} visibleSeries - The array of visible series in the accumulation chart.
     * @returns {AccumulationSeries} - The series retrieved from the specified index.
     */
    AccumulationTooltip.prototype.getSeriesFromIndex = function (index, visibleSeries) {
        return visibleSeries[0];
    };
    AccumulationTooltip.prototype.getTooltipText = function (data, tooltip) {
        var series = data.series;
        var format = tooltip.format ? tooltip.format : this.accumulation.theme.indexOf('Tailwind3') > -1 ? '${point.x} : ${point.y}' : '${point.x} : <b>${point.y}</b>';
        format = this.accumulation.useGroupingSeparator ? format.replace('${point.y}', '${point.separatorY}') : format;
        return this.parseTemplate(data.point, series, format);
    };
    AccumulationTooltip.prototype.findHeader = function (data) {
        if (this.header === '') {
            return '';
        }
        this.header = this.parseTemplate(data.point, data.series, this.header);
        if (this.header.replace(/<b>/g, '').replace(/<\/b>/g, '').trim() !== '') {
            return this.header;
        }
        return '';
    };
    AccumulationTooltip.prototype.parseTemplate = function (point, series, format) {
        var value;
        var textValue;
        var regExp = RegExp;
        for (var _i = 0, _a = Object.keys(point); _i < _a.length; _i++) {
            var dataValue = _a[_i];
            value = new regExp('${point' + '.' + dataValue + '}', 'gm');
            var pointValue = (dataValue === 'x' && this.accumulation.useGroupingSeparator && typeof point[dataValue] === 'number') ?
                this.accumulation.intl.formatNumber(point.x, { useGrouping: true }) : point[dataValue];
            format = format.replace(value.source, pointValue);
        }
        for (var _b = 0, _c = Object.keys(Object.getPrototypeOf(series)); _b < _c.length; _b++) {
            var dataValue = _c[_b];
            value = new regExp('${series' + '.' + dataValue + '}', 'gm');
            textValue = series[dataValue];
            format = format.replace(value.source, textValue);
        }
        return format;
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    AccumulationTooltip.prototype.getModuleName = function () {
        return 'AccumulationTooltip';
    };
    /**
     * To destroy the Tooltip.
     *
     * @returns {void}
     * @private
     */
    AccumulationTooltip.prototype.destroy = function () {
        /**
         * Destroy method calling here
         */
    };
    return AccumulationTooltip;
}(BaseTooltip));
export { AccumulationTooltip };
