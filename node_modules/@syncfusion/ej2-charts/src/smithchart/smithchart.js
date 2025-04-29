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
import { Component, Complex, NotifyPropertyChanges, Property } from '@syncfusion/ej2-base';
import { isNullOrUndefined, Browser } from '@syncfusion/ej2-base';
import { createElement, remove, Event, EventHandler } from '@syncfusion/ej2-base';
import { createSvg, RectOption, measureText, TextOption, renderTextElement } from '../smithchart/utils/helper';
import { removeElement, textTrim } from '../smithchart/utils/helper';
import { SmithchartRect } from '../smithchart/utils/utils';
import { SmithchartMargin, SmithchartBorder, SmithchartFont } from '../smithchart/utils/utils';
import { getThemeColor } from '../smithchart/model/theme';
import { SmithchartLegendSettings } from '../smithchart/legend/legend';
import { SmithchartAxis } from '../smithchart/axis/axis';
import { Title } from '../smithchart/title/title';
import { SmithchartSeries } from '../smithchart/series/series';
import { AreaBounds } from '../smithchart/utils/area';
import { AxisRender } from '../smithchart/axis/axisrender';
import { SeriesRender } from '../smithchart/series/seriesrender';
import { Collection } from '@syncfusion/ej2-base';
import { getSeriesColor } from '../smithchart/model/theme';
import { ExportUtils } from '../smithchart/utils/export';
import { titleRender, subtitleRender, load, loaded } from '../smithchart/model/constant';
import { getElement } from '../common/utils/helper';
/**
 * Represents the Smithchart control.
 * ```html
 * <div id="smithchart"/>
 * <script>
 *   var chartObj = new Smithchart({ isResponsive : true });
 *   chartObj.appendTo("#smithchart");
 * </script>
 * ```
 */
var Smithchart = /** @class */ (function (_super) {
    __extends(Smithchart, _super);
    /**
     * Constructor for creating the Smithchart widget.
     *
     * @param {SmithchartModel} options - The options for configuring the SmithChart.
     * @param {string | HTMLElement} element - The element where the SmithChart will be created.
     */
    function Smithchart(options, element) {
        var _this = _super.call(this, options, element) || this;
        /** @private */
        _this.isLegendClicked = false;
        _this.previousTargetId = '';
        _this.currentPointIndex = 0;
        _this.currentSeriesIndex = 0;
        _this.currentLegendIndex = 0;
        return _this;
    }
    /**
     * Get component name.
     *
     * @returns {string} - Returns the module name.
     */
    Smithchart.prototype.getModuleName = function () {
        return 'smithchart';
    };
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @private
     * @returns {string} - The persisted state data.
     */
    Smithchart.prototype.getPersistData = function () {
        return '';
    };
    /**
     * Method to create SVG element.
     */
    Smithchart.prototype.createChartSvg = function () {
        this.removeSvg();
        createSvg(this);
    };
    Smithchart.prototype.renderTitle = function (title, type, groupEle) {
        var _this = this;
        var font = title.textStyle;
        var textSize = measureText(title.text, font, this.themeStyle.smithchartTitleFont);
        var x;
        var textAlignment = title.textAlignment;
        var titleText = title.text;
        var maxTitleWidth = (isNullOrUndefined(title.maximumWidth)) ?
            Math.abs(this.margin.left + this.margin.right - (this.availableSize.width)) :
            title.maximumWidth;
        var titleWidthEnable = textSize.width > maxTitleWidth ? true : false;
        if (textSize.width > this.availableSize.width) {
            x = this.margin.left + this.border.width;
        }
        else {
            x = textAlignment === 'Center' ? (this.availableSize.width / 2 - textSize['width'] / 2) :
                (textAlignment === 'Near' ? (this.margin.left + this.elementSpacing + this.border.width) : (this.availableSize.width
                    - textSize['width'] - (this.margin.right + this.elementSpacing + this.border.width)));
        }
        var y = this.margin.top + textSize['height'] / 2 + this.elementSpacing;
        if (title.enableTrim && titleWidthEnable) {
            titleText = textTrim(maxTitleWidth, title.text, font, this.themeStyle.smithchartTitleFont);
            textSize = measureText(titleText, font, this.themeStyle.smithchartTitleFont);
        }
        groupEle = this.renderer.createGroup({ id: this.element.id + '_Title_Group' });
        var titleEventArgs = {
            text: titleText,
            x: x,
            y: y,
            name: titleRender,
            cancel: false
        };
        var options;
        var titleRenderSuccess = function (args) {
            if (!args.cancel) {
                options = new TextOption(_this.element.id + '_Smithchart_' + type, args.x, args.y, 'start', args.text);
                var element = renderTextElement(options, font, font.color || _this.themeStyle.smithchartTitleFont.color, groupEle, _this.themeStyle.smithchartTitleFont);
                element.setAttribute('tabindex', '0');
                var titleLocation = { x: args.x, y: args.y, textSize: textSize };
                _this.svgObject.appendChild(groupEle);
                if (title.subtitle.text !== '' && title.subtitle.visible) {
                    _this.renderSubtitle(title, type, textSize, _this.availableSize, titleLocation, groupEle);
                }
            }
        };
        titleRenderSuccess.bind(this);
        this.trigger(titleRender, titleEventArgs, titleRenderSuccess);
    };
    Smithchart.prototype.renderSubtitle = function (title, type, textSize, size, titleLocation, groupEle) {
        var _this = this;
        var font = title.subtitle.textStyle;
        var subTitle = title.subtitle;
        var subTitleSize = measureText(subTitle.text, font, this.themeStyle.smithchartSubtitleFont);
        var subTitleText = subTitle.text;
        var maxSubTitleWidth = isNullOrUndefined(subTitle.maximumWidth) ?
            (this.bounds.width * 0.75) : subTitle.maximumWidth;
        if (subTitle.enableTrim && subTitleSize.width > maxSubTitleWidth) {
            subTitleText = textTrim(maxSubTitleWidth, subTitle.text, font, this.themeStyle.smithchartSubtitleFont);
        }
        var x = title['subtitle'].textAlignment === 'Far' ? (titleLocation.x + (titleLocation.textSize.width)) :
            (title['subtitle'].textAlignment === 'Near') ? titleLocation.x :
                (titleLocation.x + (titleLocation.textSize.width / 2));
        var y = titleLocation.y + (2 * this.elementSpacing);
        var textAnchor = title['subtitle'].textAlignment === 'Far' ? 'end' :
            (title['subtitle'].textAlignment === 'Near') ? 'start' : 'middle';
        var subtitleEventArgs = {
            text: subTitleText,
            x: x,
            y: y,
            name: subtitleRender,
            cancel: false
        };
        var subtitleRenderSuccess = function (args) {
            if (!args.cancel) {
                var options = new TextOption(_this.element.id + '_Smithchart_' + type, args.x, args.y, textAnchor, args.text);
                var element = renderTextElement(options, font, font.color || _this.themeStyle.smithchartSubtitleFont.color, groupEle, _this.themeStyle.smithchartSubtitleFont);
                element.setAttribute('aria-label', subTitle.description || args.text);
                groupEle.appendChild(element);
            }
        };
        subtitleRenderSuccess.bind(this);
        this.trigger(subtitleRender, subtitleEventArgs, subtitleRenderSuccess);
    };
    /**
     * Render the smithchart border.
     *
     * @private
     * @returns {void}
     */
    Smithchart.prototype.renderBorder = function () {
        var border = this.border;
        this.background = this.background ? this.background : this.themeStyle.background;
        var borderRect = new RectOption(this.element.id + '_SmithchartBorder', this.background, border, 1, new SmithchartRect(border.width / 2, border.width / 2, this.availableSize.width - border.width, this.availableSize.height - border.width));
        var element = this.svgObject.appendChild(this.renderer.drawRectangle(borderRect));
        element.setAttribute('aria-hidden', 'true');
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @private
     * @param {SmithchartModel} newProp - The new properties for configuring the SmithChart.
     * @returns {void}
     */
    Smithchart.prototype.onPropertyChanged = function (newProp) {
        var renderer = false;
        if (!this.delayRedraw) {
            for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
                var prop = _a[_i];
                switch (prop) {
                    case 'background':
                    case 'border':
                    case 'series':
                    case 'legendSettings':
                    case 'radius':
                    case 'enableRtl':
                        renderer = true;
                        break;
                    case 'size':
                        this.createChartSvg();
                        renderer = true;
                        break;
                    case 'theme':
                    case 'renderType':
                        this.animateSeries = true;
                        renderer = true;
                        break;
                }
            }
            if (renderer) {
                this.render();
            }
        }
    };
    /**
     * Initialize the event handler.
     */
    Smithchart.prototype.preRender = function () {
        this.allowServerDataBinding = false;
        this.trigger(load, { smithchart: this });
        this.unWireEVents();
        this.initPrivateVariable();
        this.wireEVents();
    };
    Smithchart.prototype.initPrivateVariable = function () {
        this.animateSeries = true;
        this.delayRedraw = false;
        this.element.setAttribute('role', 'region');
        this.element.setAttribute('aria-label', this.title.description || this.title.text + '. Syncfusion interactive chart.');
        this.element.setAttribute('tabindex', '0');
        this.element.style.outline = 'none';
    };
    /**
     * Handles to set style for key event on the document.
     *
     * @param {target} target - element which currently focused.
     * @returns {void}
     * @private
     */
    Smithchart.prototype.setNavigationStyle = function (target) {
        var currentElement = document.getElementById(target);
        if (currentElement) {
            currentElement.style.setProperty('outline', "1.5px solid " + this.themeStyle.tabColor);
        }
    };
    /**
     * Handles to remove style for key event on the document.
     *
     * @returns {void}
     * @private
     */
    Smithchart.prototype.removeNavigationStyle = function () {
        var currentElement = document.querySelectorAll("text[id*=_Smithchart_title], g[id*=_svg_Legend], g[id*=_svg_seriesCollection], path[id*=_Points], [id*=" + this.element.id + "]");
        if (currentElement) {
            currentElement.forEach(function (element) {
                if (element instanceof HTMLElement || element instanceof SVGElement) {
                    element.style.setProperty('outline', 'none');
                    element.style.setProperty('margin', '');
                }
            });
        }
    };
    /**
     * To Initialize the control rendering.
     *
     * @returns {void}
     */
    Smithchart.prototype.setTheme = function () {
        /** Set theme */
        this.themeStyle = getThemeColor(this.theme);
        this.seriesColors = getSeriesColor(this.theme);
    };
    Smithchart.prototype.render = function () {
        this.createChartSvg();
        this.element.appendChild(this.svgObject);
        this.setTheme();
        this.createSecondaryElement();
        this.renderBorder();
        if (this.smithchartLegendModule && this.legendSettings.visible) {
            this.legendBounds = this.smithchartLegendModule.calculateLegendBounds(this);
        }
        var areaBounds = new AreaBounds();
        this.bounds = areaBounds.calculateAreaBounds(this, this.title, this.legendBounds);
        if (this.title.text !== '' && this.title.visible) {
            this.renderTitle(this.title, 'title', null);
        }
        var axisRender = new AxisRender();
        axisRender.renderArea(this, this.bounds);
        this.seriesrender = new SeriesRender();
        this.seriesrender.draw(this, axisRender, this.bounds);
        if (this.smithchartLegendModule && this.legendSettings.visible) {
            this.smithchartLegendModule.renderLegend(this);
        }
        this.renderComplete();
        this.allowServerDataBinding = true;
        this.trigger(loaded, { smithchart: this });
    };
    Smithchart.prototype.createSecondaryElement = function () {
        if (isNullOrUndefined(document.getElementById(this.element.id + '_Secondary_Element'))) {
            var secondaryElement = createElement('div', {
                id: this.element.id + '_Secondary_Element',
                styles: 'z-index:1;'
            });
            this.element.appendChild(secondaryElement);
            var rect = this.element.getBoundingClientRect();
            var svgRect = document.getElementById(this.element.id + '_svg');
            if (svgRect) {
                var svgClientRect = svgRect.getBoundingClientRect();
                secondaryElement.style.left = Math.max(svgClientRect.left - rect.left, 0) + 'px';
                secondaryElement.style.top = Math.max(svgClientRect.top - rect.top, 0) + 'px';
            }
        }
        else {
            removeElement(this.element.id + '_Secondary_Element');
        }
    };
    /**
     * To destroy the widget.
     *
     * @returns {void}.
     */
    Smithchart.prototype.destroy = function () {
        if (this.element) {
            this.unWireEVents();
            _super.prototype.destroy.call(this);
            this.element.classList.remove('e-smithchart');
            this.removeSvg();
            this.svgObject = null;
            var element = document.getElementById(this.element.id + 'Keyboard_smith_chart_focus');
            if (element) {
                element.remove();
            }
            removeElement('smithchartmeasuretext');
        }
    };
    /**
     * To bind event handlers for smithchart.
     *
     * @returns {void}
     */
    Smithchart.prototype.wireEVents = function () {
        EventHandler.add(this.element, 'click', this.smithchartOnClick, this);
        EventHandler.add(this.element, Browser.touchMoveEvent, this.mouseMove, this);
        EventHandler.add(this.element, Browser.touchEndEvent, this.mouseEnd, this);
        EventHandler.add(this.element, 'keyup', this.chartKeyUp, this);
        EventHandler.add(this.element, 'keydown', this.chartKeyDown, this);
        window.addEventListener((Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.smithchartOnResize.bind(this));
    };
    Smithchart.prototype.mouseMove = function (e) {
        if (e.type === 'touchmove') {
            this.isTouch = true;
        }
        else {
            this.isTouch = e.pointerType === 'touch' || e.pointerType === '2' || this.isTouch;
        }
        if (this.tooltipRenderModule && !this.isTouch) {
            this.tooltipRenderModule.smithchartMouseMove(this, e);
        }
    };
    Smithchart.prototype.mouseEnd = function (e) {
        if (e.type === 'touchend') {
            this.isTouch = true;
        }
        else {
            this.isTouch = e.pointerType === 'touch' || e.pointerType === '2';
        }
        if (this.tooltipRenderModule && this.isTouch) {
            var tooltipElement_1 = this.tooltipRenderModule.smithchartMouseMove(this, e);
            if (tooltipElement_1) {
                this.fadeoutTo = +setTimeout(function () {
                    tooltipElement_1.fadeOut();
                }, 2000);
            }
        }
    };
    /**
     * To handle the click event for the smithchart.
     *
     * @param {Event | PointerEvent} e - The event.
     * @returns {void}
     */
    Smithchart.prototype.smithchartOnClick = function (e) {
        var targetEle = e.target;
        var targetId = this.isLegendClicked ? targetEle.children[1].id : targetEle.id;
        var parentElement = document.getElementById(targetId).parentElement;
        var grpElement = document.getElementById(parentElement.id).parentElement;
        if (grpElement.id === 'containerlegendItem_Group' && this.legendSettings.toggleVisibility) {
            var childElement = parentElement.childNodes[1];
            var circleElement = parentElement.childNodes[0];
            var legendText = childElement.textContent;
            var seriesIndex = void 0;
            var fill = void 0;
            for (var i = 0; i < this.smithchartLegendModule.legendSeries.length; i++) {
                if (legendText === this.smithchartLegendModule.legendSeries[i]['text']) {
                    seriesIndex = this.smithchartLegendModule.legendSeries[i].seriesIndex;
                    fill = this.smithchartLegendModule.legendSeries[i].fill;
                }
            }
            var seriesElement = document.getElementById(this.element.id + '_svg' + '_seriesCollection' + seriesIndex);
            if (seriesElement.getAttribute('visibility') === 'visible') {
                circleElement.setAttribute('fill', 'gray');
                seriesElement.setAttribute('visibility', 'hidden');
                this.series[seriesIndex].visibility = 'hidden';
            }
            else {
                circleElement.setAttribute('fill', fill);
                seriesElement.setAttribute('visibility', 'visible');
                this.series[seriesIndex].visibility = 'visible';
            }
        }
        this.removeNavigationStyle();
    };
    /**
     * To unbind event handlers from smithchart.
     *
     * @returns {void}
     */
    Smithchart.prototype.unWireEVents = function () {
        EventHandler.remove(this.element, 'click', this.smithchartOnClick);
        EventHandler.remove(this.element, Browser.touchMoveEvent, this.mouseMove);
        EventHandler.remove(this.element, Browser.touchEndEvent, this.mouseEnd);
        EventHandler.remove(this.element, 'keyup', this.chartKeyUp);
        EventHandler.remove(this.element, 'keydown', this.chartKeyDown);
        window.removeEventListener((Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.smithchartOnResize);
    };
    Smithchart.prototype.print = function (id) {
        var exportChart = new ExportUtils(this);
        exportChart.print(id);
    };
    /**
     * Handles the export method for the smith chart control.
     *
     * @param {SmithchartExportType} type - The smith chart export type.
     * @param {string} fileName - The filename of the exported smith chart.
     * @param {PdfPageOrientation} orientation - The page orientation for PDF export.
     * @returns {void}
     */
    Smithchart.prototype.export = function (type, fileName, orientation) {
        var exportMap = new ExportUtils(this);
        exportMap.export(type, fileName, orientation);
    };
    /**
     * Handles the keyboard onkeydown event on the smith chart.
     *
     * @param {KeyboardEvent} e - The keyboard event.
     * @returns {boolean} - Indicates whether the keydown event is handled.
     * @private
     */
    Smithchart.prototype.chartKeyDown = function (e) {
        var actionKey = '';
        if (this.series[this.currentSeriesIndex].tooltip.visible && ((e.code === 'Tab' && this.previousTargetId.indexOf('_Series') > -1) || e.code === 'Escape')) {
            actionKey = 'ESC';
        }
        if (actionKey !== '') {
            this.smithchartKeyboardNavigations(e, e.target.id, actionKey);
        }
        if (e.code === 'Tab') {
            this.removeNavigationStyle();
        }
        return false;
    };
    /**
     * Handles the keyboard keyup event on the smith chart.
     *
     * @param {KeyboardEvent} e - The keyboard event.
     * @returns {boolean} - Indicates whether the keyup event is handled.
     * @private
     */
    Smithchart.prototype.chartKeyUp = function (e) {
        var actionKey = '';
        var targetId = e.target['id'];
        var groupElement;
        var targetElement = e.target;
        var titleElement = getElement(this.element.id + '_Smithchart_title');
        var seriesElement = getElement(this.element.id + '_svg' + '_seriesCollections');
        var legendElement = getElement(this.element.id + 'legendItem_Group');
        this.removeNavigationStyle();
        if (titleElement) {
            titleElement.setAttribute('class', 'e-smith-chart-focused');
        }
        if (seriesElement && seriesElement.firstElementChild && seriesElement.firstElementChild.children[1].lastElementChild) {
            var firstChild = seriesElement.firstElementChild.children[1].lastElementChild;
            var className = firstChild.getAttribute('class');
            if (className && className.indexOf('e-smith-chart-focused') === -1) {
                className = className + ' e-smith-chart-focused';
            }
            else if (!className) {
                className = 'e-smith-chart-focused';
            }
            firstChild.setAttribute('class', className);
        }
        if (legendElement) {
            var firstChild = legendElement.firstElementChild;
            var className = firstChild.getAttribute('class');
            if (className && className.indexOf('e-smith-chart-focused') === -1) {
                className = className + ' e-smith-chart-focused';
            }
            else if (!className) {
                className = 'e-smith-chart-focused';
            }
            firstChild.setAttribute('class', className);
        }
        if (e.code === 'Tab') {
            if (this.previousTargetId !== '') {
                if ((this.previousTargetId.indexOf('_Series') > -1 && targetId.indexOf('_Series') === -1)) {
                    groupElement = getElement(this.element.id + '_svg_seriesCollections');
                    var previousElement = this.previousTargetId.indexOf('_Marker') > -1 ?
                        getElement(this.element.id + '_svg_series' + this.currentSeriesIndex + '_Marker').children[this.currentPointIndex] :
                        groupElement.children[this.currentSeriesIndex];
                    this.setTabIndex(previousElement, document.getElementById(this.element.id + '_Series0_Points0_Marker0'));
                    this.currentPointIndex = 0;
                    this.currentSeriesIndex = 0;
                }
                else if (this.previousTargetId.indexOf('_svg_Legend') > -1 && targetId.indexOf('_svg_Legend') === -1) {
                    groupElement = getElement(this.element.id + 'legendItem_Group');
                    this.setTabIndex(groupElement.children[this.currentLegendIndex], groupElement.firstElementChild);
                }
            }
            this.previousTargetId = targetId;
            actionKey = this.series[0].tooltip.visible ? 'Tab' : '';
        }
        else if (e.code.indexOf('Arrow') > -1) {
            e.preventDefault();
            this.previousTargetId = targetId;
            if ((targetId.indexOf('_svg_Legend') > -1)) {
                var legendElement_1 = targetElement.parentElement.children;
                legendElement_1[this.currentLegendIndex].removeAttribute('tabindex');
                this.currentLegendIndex += (e.code === 'ArrowUp' || e.code === 'ArrowRight') ? +1 : -1;
                this.currentLegendIndex = this.getActualIndex(this.currentLegendIndex, legendElement_1.length);
                var currentLegend = legendElement_1[this.currentLegendIndex];
                this.focusChild(currentLegend);
                this.removeNavigationStyle();
                this.setNavigationStyle(currentLegend.id);
                targetId = currentLegend.children[1].id;
            }
            else if (targetId.indexOf('_Series') > -1) {
                groupElement = targetElement.parentElement.parentElement.parentElement;
                var currentPoint = e.target;
                targetElement.removeAttribute('tabindex');
                targetElement.blur();
                if (e.code === 'ArrowRight' || e.code === 'ArrowLeft') {
                    var seriesIndexes = [];
                    for (var i = 0; i < groupElement.children.length; i++) {
                        if (groupElement.children[i].id.indexOf('_svg_seriesCollection') > -1) {
                            seriesIndexes.push(+groupElement.children[i].id.split('_svg_seriesCollection')[1]);
                        }
                    }
                    this.currentSeriesIndex = seriesIndexes.indexOf(this.currentSeriesIndex) + (e.code === 'ArrowRight' ? 1 : -1);
                    this.currentSeriesIndex = seriesIndexes[this.getActualIndex(this.currentSeriesIndex, seriesIndexes.length)];
                }
                else {
                    this.currentPointIndex += e.code === 'ArrowUp' ? 1 : -1;
                }
                if (targetId.indexOf('_Marker') > -1) {
                    this.currentPointIndex = this.getActualIndex(this.currentPointIndex, getElement(this.element.id + '_svg_series' + this.currentSeriesIndex + '_Marker').childElementCount);
                    currentPoint = getElement(this.element.id + '_Series' + this.currentSeriesIndex + '_Points' +
                        this.currentPointIndex + '_Marker' + this.currentPointIndex);
                }
                targetId = this.focusChild(currentPoint);
                this.removeNavigationStyle();
                this.setNavigationStyle(targetId);
                actionKey = this.series[this.currentSeriesIndex].tooltip.visible ? 'ArrowMove' : '';
            }
        }
        else if ((e.code === 'Enter' || e.code === 'Space') && (targetId.indexOf('_svg_Legend') > -1)) {
            targetId = (targetId.indexOf('_svg_Legend') > -1) ? targetElement.children[1].id : targetId;
            actionKey = 'Enter';
        }
        if (actionKey !== '') {
            this.smithchartKeyboardNavigations(e, targetId, actionKey);
        }
        if (e.code === 'Tab') {
            this.setNavigationStyle(targetId);
        }
        return false;
    };
    Smithchart.prototype.smithchartKeyboardNavigations = function (e, targetId, actionKey) {
        this.isLegendClicked = false;
        switch (actionKey) {
            case 'Tab':
            case 'ArrowMove':
                if (targetId.indexOf('_Points') > -1) {
                    var seriesIndex = +(targetId.split('_Series')[1].split('_Points')[0]);
                    var pointIndex = +(targetId.split('_Series')[1].split('_Marker')[0].split('_Points')[1]);
                    // const pointRegion: Point = this.seriesrender.location[seriesIndex as number][pointIndex as number];
                    if (this.tooltipRenderModule && this.series[seriesIndex].tooltip.visible) {
                        // let closestPoint: ClosestPoint = new ClosestPoint();
                        // closestPoint = this.tooltipRenderModule.closestPointXY(this, pointRegion.x, pointRegion.y,
                        //                                                        this.series[seriesIndex as number], seriesIndex);
                        this.tooltipRenderModule.createTooltip(this, e, pointIndex, seriesIndex, this.series[seriesIndex]);
                    }
                }
                break;
            case 'Enter':
            case 'Space':
                if (targetId.indexOf('_LegendItemText') > -1) {
                    this.isLegendClicked = true;
                    this.delayRedraw = true;
                    this.smithchartOnClick(e);
                    this.focusChild(document.getElementById(targetId).parentElement);
                    this.setNavigationStyle(document.getElementById(targetId).parentElement.id);
                }
                break;
            case 'ESC':
                this.tooltipRenderModule.tooltipElement.fadeOut();
                break;
        }
    };
    /* @private */
    Smithchart.prototype.setTabIndex = function (previousElement, currentElement) {
        if (previousElement) {
            previousElement.removeAttribute('tabindex');
        }
        if (currentElement) {
            currentElement.setAttribute('tabindex', '0');
        }
    };
    Smithchart.prototype.getActualIndex = function (index, totalLength) {
        return index > totalLength - 1 ? 0 : (index < 0 ? totalLength - 1 : index);
    };
    Smithchart.prototype.focusChild = function (element) {
        element.setAttribute('tabindex', '0');
        var className = element.getAttribute('class');
        element.setAttribute('tabindex', '0');
        if (className && className.indexOf('e-smith-chart-focused') === -1) {
            className = 'e-smith-chart-focused ' + className;
        }
        else if (!className) {
            className = 'e-smith-chart-focused';
        }
        element.setAttribute('class', className);
        element.focus();
        return element.id;
    };
    /**
     * To handle the window resize event on smithchart.
     *
     * @returns {boolean} - Indicates whether the resize event is handled.
     */
    Smithchart.prototype.smithchartOnResize = function () {
        var _this = this;
        this.animateSeries = false;
        if (this.resizeTo) {
            clearTimeout(this.resizeTo);
        }
        this.resizeTo = +setTimeout(function () {
            _this.render();
        }, 500);
        return false;
    };
    /**
     * To provide the array of modules needed for smithchart rendering.
     *
     * @private
     * @returns {ModuleDeclaration[]} - The array of required modules.
     */
    Smithchart.prototype.requiredModules = function () {
        var modules = [];
        if (this.legendSettings.visible) {
            modules.push({
                member: 'SmithchartLegend',
                args: [this]
            });
        }
        for (var i = 0; i < this.series.length; i++) {
            if (this.series[i].tooltip.visible) {
                modules.push({
                    member: 'TooltipRender',
                    args: [this]
                });
                break;
            }
        }
        return modules;
    };
    /**
     * To Remove the SVG.
     *
     * @private
     * @returns {void}
     */
    Smithchart.prototype.removeSvg = function () {
        removeElement(this.element.id + '_Secondary_Element');
        var removeLength = 0;
        if (this.svgObject) {
            while (this.svgObject.childNodes.length > removeLength) {
                this.svgObject.removeChild(this.svgObject.firstChild);
            }
            if (!this.svgObject.hasChildNodes() && this.svgObject.parentNode) {
                remove(this.svgObject);
            }
        }
    };
    __decorate([
        Property('Impedance')
    ], Smithchart.prototype, "renderType", void 0);
    __decorate([
        Property('')
    ], Smithchart.prototype, "width", void 0);
    __decorate([
        Property('')
    ], Smithchart.prototype, "height", void 0);
    __decorate([
        Property('Material')
    ], Smithchart.prototype, "theme", void 0);
    __decorate([
        Complex({}, SmithchartMargin)
    ], Smithchart.prototype, "margin", void 0);
    __decorate([
        Complex({}, SmithchartFont)
    ], Smithchart.prototype, "font", void 0);
    __decorate([
        Complex({}, SmithchartBorder)
    ], Smithchart.prototype, "border", void 0);
    __decorate([
        Complex({}, Title)
    ], Smithchart.prototype, "title", void 0);
    __decorate([
        Collection([{}], SmithchartSeries)
    ], Smithchart.prototype, "series", void 0);
    __decorate([
        Complex({}, SmithchartLegendSettings)
    ], Smithchart.prototype, "legendSettings", void 0);
    __decorate([
        Complex({}, SmithchartAxis)
    ], Smithchart.prototype, "horizontalAxis", void 0);
    __decorate([
        Complex({}, SmithchartAxis)
    ], Smithchart.prototype, "radialAxis", void 0);
    __decorate([
        Property(null)
    ], Smithchart.prototype, "background", void 0);
    __decorate([
        Property(10)
    ], Smithchart.prototype, "elementSpacing", void 0);
    __decorate([
        Property(1)
    ], Smithchart.prototype, "radius", void 0);
    __decorate([
        Event()
    ], Smithchart.prototype, "beforePrint", void 0);
    __decorate([
        Event()
    ], Smithchart.prototype, "animationComplete", void 0);
    __decorate([
        Event()
    ], Smithchart.prototype, "load", void 0);
    __decorate([
        Event()
    ], Smithchart.prototype, "loaded", void 0);
    __decorate([
        Event()
    ], Smithchart.prototype, "legendRender", void 0);
    __decorate([
        Event()
    ], Smithchart.prototype, "titleRender", void 0);
    __decorate([
        Event()
    ], Smithchart.prototype, "subtitleRender", void 0);
    __decorate([
        Event()
    ], Smithchart.prototype, "textRender", void 0);
    __decorate([
        Event()
    ], Smithchart.prototype, "axisLabelRender", void 0);
    __decorate([
        Event()
    ], Smithchart.prototype, "seriesRender", void 0);
    __decorate([
        Event()
    ], Smithchart.prototype, "tooltipRender", void 0);
    Smithchart = __decorate([
        NotifyPropertyChanges
    ], Smithchart);
    return Smithchart;
}(Component));
export { Smithchart };
