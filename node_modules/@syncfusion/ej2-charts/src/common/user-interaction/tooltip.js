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
import { extend, isNullOrUndefined, Animation } from '@syncfusion/ej2-base';
import { ChartLocation } from '../../common/utils/helper';
import { stopTimer, removeElement } from '../../common/utils/helper';
import { ChartData } from '../../chart/utils/get-data';
import { Tooltip as SVGTooltip } from '@syncfusion/ej2-svg-base';
import { indexFinder } from '../../common/utils/helper';
import { Selection } from '../../chart/user-interaction/selection';
/**
 * `Tooltip` module is used to render the tooltip for series.
 */
var BaseTooltip = /** @class */ (function (_super) {
    __extends(BaseTooltip, _super);
    /**
     * Constructor for tooltip module.
     *
     * @private
     */
    function BaseTooltip(chart) {
        var _this = _super.call(this, chart) || this;
        _this.element = _this.chart.element;
        _this.textStyle = chart.tooltip.textStyle;
        _this.control = chart;
        _this.template = chart.tooltip.template;
        return _this;
    }
    BaseTooltip.prototype.getElement = function (id) {
        return document.getElementById(id);
    };
    /**
     * Renders the tooltip.
     *
     * @returns {void}
     * @private
     */
    BaseTooltip.prototype.getTooltipElement = function (isTooltip) {
        this.inverted = this.chart.requireInvertedAxis;
        this.header = (this.control.tooltip.header === null) ?
            ((this.control.tooltip.shared) ? '${point.x}' : '${series.name}')
            : (this.control.tooltip.header);
        this.formattedText = [];
        var tooltipDiv = document.getElementById(this.chart.element.id + '_tooltip');
        var isStockChart = this.chart.element.id.indexOf('stockChart') > -1;
        if (!isTooltip && !tooltipDiv || isStockChart) {
            return this.createElement();
        }
        return null;
    };
    BaseTooltip.prototype.createElement = function () {
        var tooltipDiv = document.createElement('div');
        tooltipDiv.id = this.element.id + '_tooltip';
        tooltipDiv.className = 'ejSVGTooltip';
        tooltipDiv.style.pointerEvents = 'none';
        tooltipDiv.style.position = 'absolute';
        tooltipDiv.style.zIndex = '1';
        return tooltipDiv;
    };
    BaseTooltip.prototype.pushData = function (data, isFirst, tooltipDiv, isChart, enable3D) {
        if (data.series.enableTooltip) {
            if (enable3D) {
                this.currentPoints.push(data);
            }
            else if (isChart) {
                this.currentPoints.push(data);
            }
            else {
                this.currentPoints.push(data);
            }
            this.stopAnimation();
            if (tooltipDiv && !document.getElementById(tooltipDiv.id)) {
                if (!this.chart.stockChart) {
                    document.getElementById(this.element.id + '_Secondary_Element').appendChild(tooltipDiv);
                }
                else {
                    document.getElementById(this.chart.stockChart.element.id + '_Secondary_Element').appendChild(tooltipDiv);
                }
            }
            return true;
        }
        return false;
    };
    BaseTooltip.prototype.removeHighlight = function () {
        var item;
        // let series: Series;
        for (var i = 0, len = this.previousPoints.length; i < len; i++) {
            item = this.previousPoints[i];
            if (item.series.isRectSeries || this.chart.tooltip.enableHighlight) {
                if (item.series.visible) {
                    this.highlightPoint(item.series, item.point.index, false);
                }
                continue;
            }
            // series = item.series as Series;
        }
    };
    /**
     * Animates the opacity change of the given element to simulate a highlight effect.
     *
     * @param {number} targetOpacity - The final opacity value to which the element's opacity will be animated.
     * @param {HTMLElement} targetElement - The DOM element whose opacity is to be animated.
     * @param {number} duration - The duration of the animation effect.
     * @param {number} targetStrokeWidth - The final stroke-width value to which the element's stroke-width will be animated.
     * @returns {void}
     * @private
     */
    BaseTooltip.prototype.animateHighlight = function (targetOpacity, targetElement, duration, targetStrokeWidth) {
        var _this = this;
        var initialOpacity = parseFloat(targetElement.getAttribute('opacity'));
        var initialStrokeWidth = null;
        if (targetStrokeWidth !== null) {
            initialStrokeWidth = parseFloat(targetElement.getAttribute('stroke-width'));
        }
        new Animation({}).animate(targetElement, {
            duration: duration,
            progress: function (args) {
                targetElement.style.animation = '';
                if (_this.svgTooltip) {
                    return;
                }
                if (targetStrokeWidth !== null) {
                    var newStrokeWidth = initialStrokeWidth
                        + (args.timeStamp / args.duration) * (targetStrokeWidth - initialStrokeWidth);
                    targetElement.setAttribute('stroke-width', Math.max(newStrokeWidth, targetStrokeWidth).toString());
                }
                var newOpacity = initialOpacity + (args.timeStamp / args.duration) * (targetOpacity - initialOpacity);
                targetElement.setAttribute('opacity', Math.min(newOpacity, targetOpacity).toString());
            },
            end: function () {
                if (_this.svgTooltip) {
                    return;
                }
                if (targetStrokeWidth !== null) {
                    targetElement.setAttribute('stroke-width', targetStrokeWidth.toString());
                }
                targetElement.setAttribute('opacity', targetOpacity.toString());
            }
        });
    };
    BaseTooltip.prototype.highlightPoint = function (series, pointIndex, highlight) {
        var _this = this;
        var element = this.getElement(this.element.id + '_Series_' + series.index + '_Point_' + pointIndex);
        var selectionModule = this.control.accumulationSelectionModule;
        var isAccumulation = this.chart.getModuleName() === 'accumulationchart';
        var isSelectedElement = selectionModule && selectionModule.selectedDataIndexes.length > 0 ? true : false;
        if ((element) || (!series.isRectSeries)) {
            if ((!isSelectedElement || isSelectedElement && element.getAttribute('class')
                && element.getAttribute('class').indexOf('_ej2_chart_selection_series_') === -1) || (!series.isRectSeries)) {
                if (series.isRectSeries && this.chart.highlightColor !== '' && !isNullOrUndefined(this.chart.highlightColor)) {
                    element.setAttribute('fill', (highlight && this.chart.highlightColor !== 'transparent' ? this.chart.highlightColor : series.pointColorMapping !== '' ? (series.points[0]).color : series.points[pointIndex].color || series.interior));
                }
                else {
                    if ((this.control.highlightMode === 'None') && (this.chart.tooltip.enableHighlight) && ((!this.chart.tooltip.shared) || (isAccumulation))) {
                        if (highlight && (isAccumulation ? this.control.accumulationSelectionModule
                            && this.control.accumulationSelectionModule.selectedDataIndexes.length > 0
                            : this.chart.selectionModule && this.chart.selectionModule.selectedDataIndexes.length > 0)) {
                            return;
                        }
                        var target_1 = this.element.id + '_Series_' + series.index + '_Point_' + pointIndex;
                        var _loop_1 = function (currentSeries) {
                            var seriesElementsGroupCollections = [];
                            var currentSeriesWidth = typeof currentSeries.width === 'number' ? currentSeries.width : parseFloat(currentSeries.width);
                            seriesElementsGroupCollections = isAccumulation
                                ? [this_1.getElement(this_1.chart.element.id + '_Series_' + currentSeries.index)]
                                : new Selection(this_1.chart).getSeriesElements(currentSeries);
                            if (isAccumulation && this_1.control.series[0].dataLabel.visible) {
                                var dataLabelCollection = this_1.getElement(this_1.element.id + '_datalabel_Series_0');
                                if (dataLabelCollection) {
                                    seriesElementsGroupCollections.push(dataLabelCollection);
                                }
                            }
                            seriesElementsGroupCollections.forEach(function (seriesElementsGroup) {
                                seriesElementsGroup.childNodes.forEach(function (seriesElement) {
                                    var targetOpacity = seriesElement.id.indexOf('border') > -1 ? 1 :
                                        seriesElement.id.indexOf('Symbol') > -1 ? currentSeries.marker.opacity : currentSeries.opacity;
                                    var targetStrokeWidth = seriesElement.id.indexOf('border') > -1 && currentSeries.border.width
                                        ? parseFloat(currentSeries.border.width.toString())
                                        : seriesElement.id.indexOf('Symbol') > -1 && currentSeries.marker.border.width
                                            ? parseFloat(currentSeries.marker.border.width.toString())
                                            : currentSeriesWidth;
                                    if (highlight && _this.chart.highlightColor !== 'transparent' && seriesElement.id !== '') {
                                        if (isAccumulation ? (seriesElementsGroup.getAttribute('id').indexOf('datalabel') > -1 ? indexFinder(seriesElement.id).point === pointIndex :
                                            seriesElement.id === target_1) : (seriesElementsGroup.getAttribute('id') === _this.element.id + 'DataLabelCollection' ? (indexFinder(seriesElement.id).series === series.index) : (currentSeries.index === series.index))) {
                                            seriesElement.setAttribute('opacity', targetOpacity.toString());
                                            if ((!series.isRectSeries || (seriesElement.id.indexOf('border') > -1)) && (!isAccumulation)) {
                                                seriesElement.setAttribute('stroke-width', (targetStrokeWidth + 1).toString());
                                            }
                                        }
                                        else {
                                            seriesElement.setAttribute('opacity', isAccumulation ? seriesElement.id.indexOf('datalabel') > -1 ? '0.5' : '0.3'
                                                : (seriesElement.getAttribute('id').indexOf('Text') > -1 ? '0.5' : '0.3'));
                                            if ((!series.isRectSeries || (seriesElement.id.indexOf('border') > -1)) && (!isAccumulation)) {
                                                seriesElement.setAttribute('stroke-width', (targetStrokeWidth).toString());
                                            }
                                        }
                                    }
                                    else if (!_this.currentPoints[0] && seriesElement.id !== '') {
                                        _this.animateHighlight(targetOpacity, seriesElement, _this.chart.tooltip.duration, ((!series.isRectSeries || (seriesElement.id.indexOf('border') > -1)) && (!isAccumulation)) ? targetStrokeWidth : null);
                                    }
                                });
                            });
                        };
                        var this_1 = this;
                        for (var _i = 0, _a = this.chart.visibleSeries; _i < _a.length; _i++) {
                            var currentSeries = _a[_i];
                            _loop_1(currentSeries);
                        }
                    }
                    else if (series.isRectSeries) {
                        element.setAttribute('opacity', (highlight && this.chart.highlightColor !== 'transparent' ? series.opacity / 2 : series.opacity).toString());
                    }
                }
            }
            else {
                element.setAttribute('opacity', series.opacity.toString());
            }
        }
    };
    BaseTooltip.prototype.highlightPoints = function () {
        for (var _i = 0, _a = this.currentPoints; _i < _a.length; _i++) {
            var item = _a[_i];
            if ((item.series.isRectSeries || this.chart.tooltip.enableHighlight) && item.series.category === 'Series') {
                this.highlightPoint(item.series, item.point.index, true);
            }
        }
    };
    BaseTooltip.prototype.createTooltip = function (chart, isFirst, location, clipLocation, point, shapes, offset, bounds, crosshairEnabled, extraPoints, templatePoint, customTemplate) {
        if (crosshairEnabled === void 0) { crosshairEnabled = false; }
        if (extraPoints === void 0) { extraPoints = null; }
        if (templatePoint === void 0) { templatePoint = null; }
        var series = this.currentPoints[0].series;
        var tooltipModule = chart.tooltipModule || chart.tooltip3DModule ||
            chart.accumulationTooltipModule;
        if (!tooltipModule || location === null) { // For the tooltip enable is false.
            removeElement(this.chart.element.id + '_tooltip');
            return;
        }
        if (isFirst) {
            this.svgTooltip = new SVGTooltip({
                opacity: chart.tooltip.opacity ? chart.tooltip.opacity : ((this.chart.theme === 'Material3' || this.chart.theme === 'Material3Dark' || this.chart.theme.indexOf('Bootstrap5') > -1) ? 1 : 0.75),
                header: this.headerText,
                content: this.text,
                fill: chart.tooltip.fill,
                border: chart.tooltip.border,
                enableAnimation: chart.tooltip.enableAnimation,
                location: location,
                shared: this.control.tooltip.shared,
                crosshair: crosshairEnabled,
                shapes: shapes,
                clipBounds: this.chart.chartAreaType === 'PolarRadar' ? new ChartLocation(0, 0) : clipLocation,
                areaBounds: bounds,
                palette: this.findPalette(),
                template: customTemplate || this.template,
                data: templatePoint,
                theme: chart.theme,
                offset: offset,
                textStyle: chart.tooltip.textStyle,
                isNegative: (series.isRectSeries && series.type !== 'Waterfall' && point && point.y < 0),
                inverted: this.chart.requireInvertedAxis && series.isRectSeries,
                arrowPadding: this.text.length > 1 || this.chart.stockChart || (this.chart.tooltip.location.x !== null
                    || this.chart.tooltip.location.y !== null) ? 0 : 7,
                availableSize: chart.availableSize,
                duration: this.chart.tooltip.duration,
                isCanvas: this.chart.enableCanvas,
                isFixed: (this.chart.tooltip.location.x !== null || this.chart.tooltip.location.y !== null),
                isTextWrap: chart.tooltip.enableTextWrap && chart.getModuleName() === 'chart',
                blazorTemplate: { name: 'Template', parent: this.chart.tooltip },
                controlInstance: this.chart,
                enableRTL: chart.enableRtl,
                controlName: 'Chart',
                allowHighlight: chart.getModuleName() === 'chart' && !series.marker.allowHighlight,
                tooltipRender: function () {
                    tooltipModule.removeHighlight();
                    tooltipModule.highlightPoints();
                    tooltipModule.updatePreviousPoint(extraPoints);
                },
                animationComplete: function (args) {
                    if (args.tooltip.fadeOuted) {
                        tooltipModule.fadeOut(tooltipModule.previousPoints);
                    }
                },
                showHeaderLine: this.chart.tooltip.showHeaderLine,
                showNearestTooltip: this.chart.tooltip.showNearestTooltip
            });
            this.svgTooltip.appendTo(this.getElement(this.element.id + '_tooltip'));
        }
        else {
            if (this.svgTooltip) {
                this.svgTooltip.location = location;
                this.svgTooltip.content = this.text;
                this.svgTooltip.header = this.headerText;
                this.svgTooltip.offset = offset;
                this.svgTooltip.palette = this.findPalette();
                this.svgTooltip.shapes = shapes;
                this.svgTooltip.data = templatePoint;
                this.svgTooltip.template = this.template;
                this.svgTooltip.controlName = 'Chart';
                this.svgTooltip.crosshair = crosshairEnabled;
                this.svgTooltip.textStyle = chart.tooltip.textStyle;
                this.svgTooltip.isNegative = (series.isRectSeries && series.type !== 'Waterfall' && point && point.y < 0);
                this.svgTooltip.clipBounds = this.chart.chartAreaType === 'PolarRadar' ? new ChartLocation(0, 0) : clipLocation;
                this.svgTooltip.arrowPadding = this.text.length > 1 || this.chart.stockChart || (this.chart.tooltip.location.x !== null
                    || this.chart.tooltip.location.y !== null) ? 0 : 7;
                this.svgTooltip.allowHighlight = chart.getModuleName() === 'chart' && !series.marker.allowHighlight;
                this.svgTooltip.dataBind();
            }
        }
        if (this.chart.isReact) {
            this.chart.renderReactTemplates();
        }
    };
    BaseTooltip.prototype.findPalette = function () {
        var colors = [];
        for (var _i = 0, _a = this.currentPoints; _i < _a.length; _i++) {
            var data = _a[_i];
            colors.push(this.findColor(data, data.series));
        }
        return colors;
    };
    BaseTooltip.prototype.findColor = function (data, series) {
        if (series.isRectSeries && (series.type === 'Candle' || series.type === 'Hilo' || series.type === 'HiloOpenClose')) {
            return data.point.color;
        }
        else {
            return (data.point.color && data.point.color !== '#ffffff' ? data.point.color
                : data.point.interior) ||
                series.marker.fill || series.interior;
        }
    };
    BaseTooltip.prototype.updatePreviousPoint = function (extraPoints) {
        if (extraPoints) {
            this.currentPoints = this.currentPoints.concat(extraPoints);
        }
        this.previousPoints = extend([], this.currentPoints, null, true);
    };
    BaseTooltip.prototype.fadeOut = function (data) {
        var svgElement = this.chart.enableCanvas ? this.getElement(this.element.id + '_tooltip_group') :
            this.getElement(this.element.id + '_tooltip_svg') || this.getElement(this.element.id + '_tooltipparent_template');
        var isTooltip = (svgElement && parseInt(svgElement.getAttribute('opacity'), 10) > 0);
        if (!isTooltip) {
            this.valueX = null;
            this.valueY = null;
            this.currentPoints = [];
            this.removeHighlight();
            this.removeHighlightedMarker(data, true);
            this.svgTooltip = null;
            this.control.trigger('animationComplete', {});
        }
    };
    /*
    * @hidden
    */
    BaseTooltip.prototype.removeHighlightedMarker = function (data, fadeOut) {
        if (this.chart.markerRender) {
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var item = data_1[_i];
                removeElement(this.element.id + '_Series_' + item.series.index +
                    '_Point_' + item.point.index + '_Trackball');
                this.chart.markerRender.removeHighlightedMarker(item.series, item.point, fadeOut);
            }
        }
        this.previousPoints = [];
    };
    // public triggerEvent(point: PointData | AccPointData, isFirst: boolean, textCollection: string, firstText: boolean = true): boolean {
    //     let argsData: ITooltipRenderEventArgs = {
    //         cancel: false, name: tooltipRender, text: textCollection,
    //         point: point.point, series: point.series, textStyle: this.textStyle
    //     };
    //     this.chart.trigger(tooltipRender, argsData);
    //     if (!argsData.cancel) {
    //         if (point.series.type === 'BoxAndWhisker') {
    //             this.removeText();
    //             isFirst = true;
    //         }
    //         this.formattedText = this.formattedText.concat(argsData.text);
    //         this.text = this.formattedText;
    //     }
    //     return !argsData.cancel;
    // }
    BaseTooltip.prototype.removeText = function () {
        this.textElements = [];
        var element = this.getElement(this.element.id + '_tooltip_group');
        if (element && element.childNodes.length > 0) {
            while (element.lastChild && element.childNodes.length !== 1) {
                element.removeChild(element.lastChild);
            }
        }
    };
    BaseTooltip.prototype.stopAnimation = function () {
        stopTimer(this.toolTipInterval);
    };
    /**
     * Removes the tooltip on mouse leave.
     *
     * @returns {void}
     * @private
     */
    BaseTooltip.prototype.removeTooltip = function (duration) {
        var _this = this;
        var tooltipElement = this.getElement(this.element.id + '_tooltip');
        // const tooltipTemplate: HTMLElement = tooltipElement ? this.getElement(tooltipElement.id + 'parent_template') : null;
        // const isTemplateRendered: boolean = tooltipTemplate && tooltipTemplate.innerText !== '<div></div>';
        this.stopAnimation();
        if (tooltipElement && this.previousPoints.length > 0) {
            this.toolTipInterval = +setTimeout(function () {
                if (_this.svgTooltip) {
                    _this.svgTooltip.fadeOut();
                }
            }, duration);
        }
    };
    return BaseTooltip;
}(ChartData));
export { BaseTooltip };
