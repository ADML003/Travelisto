import { Animation, Browser, createElement } from '@syncfusion/ej2-base';
import { textElement, getValueXByPoint, stopTimer, findCrosshairDirection, getValueYByPoint, ChartLocation, withInBounds, removeElement, convertHexToColor, colorNameToHex } from '../../common/utils/helper';
import { PathOption, Rect, TextOption, measureText, SvgRenderer } from '@syncfusion/ej2-svg-base';
import { ChartData } from '../../chart/utils/get-data';
/**
 * The `Crosshair` module is used to render the crosshair for the chart.
 */
var Crosshair = /** @class */ (function () {
    /**
     * Constructor for crosshair module.
     *
     * @private
     */
    function Crosshair(chart) {
        this.arrowLocation = new ChartLocation(0, 0);
        this.rx = 2;
        this.ry = 2;
        this.highlightWidth = 0;
        this.crosshairLeftOverflow = 0;
        this.crosshairRightOverflow = 0;
        this.chart = chart;
        this.elementID = this.chart.element.id;
        this.svgRenderer = new SvgRenderer(this.chart.element.id);
        if (this.chart.crosshair.snapToData || this.chart.crosshair.highlightCategory) {
            this.data = new ChartData(this.chart);
        }
        this.addEventListener();
    }
    /**
     * Adds event listeners to the chart elements.
     *
     * @private
     * @returns {void}
     */
    Crosshair.prototype.addEventListener = function () {
        if (this.chart.isDestroyed) {
            return;
        }
        var cancelEvent = Browser.isPointer ? 'pointerleave' : 'mouseleave';
        this.chart.on(Browser.touchMoveEvent, this.mouseMoveHandler, this);
        this.chart.on(Browser.touchEndEvent, this.mouseUpHandler, this);
        this.chart.on(cancelEvent, this.mouseLeaveHandler, this);
        this.chart.on('tapHold', this.longPress, this);
    };
    Crosshair.prototype.mouseUpHandler = function () {
        if (this.chart.startMove) {
            this.removeCrosshair(2000);
        }
    };
    Crosshair.prototype.mouseLeaveHandler = function () {
        this.removeCrosshair(1000);
    };
    Crosshair.prototype.mouseMoveHandler = function (event) {
        var chart = this.chart;
        if (chart.stockChart && chart.stockChart.onPanning) {
            if (chart.mouseY < chart.chartAxisLayoutPanel.seriesClipRect.y) {
                chart.mouseY = chart.chartAxisLayoutPanel.seriesClipRect.y;
            }
            else if (chart.mouseY > chart.chartAxisLayoutPanel.seriesClipRect.y + chart.chartAxisLayoutPanel.seriesClipRect.height) {
                chart.mouseY = chart.chartAxisLayoutPanel.seriesClipRect.y + chart.chartAxisLayoutPanel.seriesClipRect.height;
            }
        }
        if (event.type === 'touchmove' && (Browser.isIos || Browser.isIos7) && chart.startMove && event.preventDefault) {
            event.preventDefault();
        }
        // Tooltip for chart series.
        if (!chart.disableTrackTooltip) {
            if (chart.crosshair.enable && withInBounds(chart.mouseX, chart.mouseY, chart.chartAxisLayoutPanel.seriesClipRect)) {
                if (chart.startMove || !chart.isTouch) {
                    this.crosshair();
                }
            }
            else {
                this.removeCrosshair(1000);
            }
        }
    };
    /**
     * Handles the long press on chart.
     *
     * @returns {boolean} false
     * @private
     */
    Crosshair.prototype.longPress = function () {
        var chart = this.chart;
        if (withInBounds(chart.mouseX, chart.mouseY, chart.chartAxisLayoutPanel.seriesClipRect)) {
            this.crosshair();
        }
        return false;
    };
    /**
     * Finds the data points closest to the mouse position for all visible series in the chart.
     * Updates the `data` object with the nearest data point to be used for mouse interactions.
     *
     * @param {Chart} chart - The chart instance containing the visible series and mouse position.
     * @returns {boolean} -  True if chart has atleast one visible series.
     * @private
     */
    Crosshair.prototype.findMousePoints = function (chart) {
        var data = this.data.getData();
        var pointLocations = [];
        var axisCoordinate = chart.isTransposed ? 'x' : 'y';
        var nearestDataPoint = null;
        var nearestValue = null;
        var minDifference = Infinity; // For finding the nearest value
        var mouseCoordinate = axisCoordinate === 'x' ? chart.mouseX : chart.mouseY;
        var seriesVisibility = false;
        var commonXvalues = this.data.mergeXvalues(this.chart.visibleSeries);
        for (var _i = 0, _a = chart.visibleSeries; _i < _a.length; _i++) {
            var series = _a[_i];
            seriesVisibility = seriesVisibility ? seriesVisibility : series.visible;
            if (series.visible && series.category !== 'TrendLine') {
                // Get the closest X value and store the data point
                var closestData = this.data.getClosestX(chart, series, commonXvalues) || data;
                if (closestData && closestData.point && closestData.point.symbolLocations[0]) {
                    var pointLocation = closestData.point.symbolLocations[0][axisCoordinate] +
                        closestData.series.clipRect[axisCoordinate];
                    if (chart.crosshair.snapToData || chart.crosshair.highlightCategory) {
                        pointLocations.push(pointLocation); // Store point locations for nearest calculation
                        // Calculate the nearest point to the mouse
                        var difference = Math.abs(pointLocation - mouseCoordinate);
                        if (difference < minDifference) {
                            minDifference = difference;
                            nearestValue = pointLocation;
                            nearestDataPoint = closestData;
                        }
                    }
                }
            }
        }
        // Use the nearest data point
        if ((chart.crosshair.snapToData || chart.crosshair.highlightCategory) && nearestDataPoint) {
            data = nearestDataPoint;
            chart.crosshairModule.highlightWidth = 0;
            if (chart.crosshair.highlightCategory && data.series.xAxis.valueType === 'Category') {
                var clipRectSize = chart.isTransposed || chart.requireInvertedAxis ?
                    chart.chartAxisLayoutPanel.seriesClipRect.height : chart.chartAxisLayoutPanel.seriesClipRect.width;
                var highlightCategoryWidth = clipRectSize / data.series.xAxis.visibleRange.delta;
                var pointRelativePosition = (data.point.xValue - data.series.xAxis.visibleRange.min) /
                    (data.series.xAxis.visibleRange.max - data.series.xAxis.visibleRange.min);
                chart.crosshairModule.crosshairLeftOverflow = Math.max(0, (highlightCategoryWidth / 2) -
                    pointRelativePosition * clipRectSize);
                chart.crosshairModule.crosshairRightOverflow = Math.max(0, (pointRelativePosition * clipRectSize +
                    (highlightCategoryWidth / 2)) - clipRectSize);
                chart.crosshairModule.highlightWidth = Math.max(0, highlightCategoryWidth - chart.crosshairModule.crosshairLeftOverflow -
                    chart.crosshairModule.crosshairRightOverflow);
            }
        }
        if (data && data.point) {
            this.data.findMouseValues(data, chart, this);
        }
        return seriesVisibility;
    };
    /**
     * Renders the crosshair.
     *
     * @returns {void}
     * @private
     */
    Crosshair.prototype.crosshair = function () {
        var visibleSeriesLength = this.chart.series.filter(function (series) { return series.visible; }).length;
        var seriesVisible = true;
        if (this.chart.crosshair.snapToData || this.chart.crosshair.highlightCategory) {
            seriesVisible = this.findMousePoints(this.chart);
        }
        var chart = this.chart;
        var horizontalCross = '';
        var verticalCross = '';
        var options;
        var axisTooltipGroup = document.getElementById(this.elementID + '_crosshair_axis');
        var crosshair = chart.crosshair;
        var tooltipdiv = document.getElementById(this.elementID + '_tooltip');
        var chartRect = chart.chartAxisLayoutPanel.seriesClipRect;
        var crossGroup = chart.enableCanvas ? document.getElementById(this.elementID + '_Secondary_Element') :
            document.getElementById(this.elementID + '_UserInteraction');
        var crosshairsvg;
        var cross = document.getElementById(this.elementID + '_Crosshair');
        if (chart.enableCanvas) {
            if (!cross) {
                cross = createElement('div', {
                    id: this.elementID + '_Crosshair', styles: 'position: absolute; pointer-events: none'
                });
                crossGroup.appendChild(cross);
            }
        }
        this.stopAnimation();
        if (visibleSeriesLength === 0 || (chart.crosshair.snapToData && this.valueY === undefined) ||
            chart.isCrosshair && chart.tooltip.enable && chart.tooltipModule &&
                !withInBounds(chart.tooltipModule.valueX, chart.tooltipModule.valueY, chartRect) ||
            (chart.crosshair.snapToData && !seriesVisible)) {
            return null;
        }
        this.valueX = chart.crosshair.snapToData || chart.crosshair.highlightCategory ? this.valueX :
            (chart.tooltip.enable && chart.tooltipModule && chart.tooltipModule.valueX ? chart.tooltipModule.valueX : chart.mouseX);
        this.valueY = chart.crosshair.snapToData || chart.crosshair.highlightCategory ? this.valueY :
            (chart.tooltip.enable && chart.tooltipModule && chart.tooltipModule.valueY ? chart.tooltipModule.valueY : chart.mouseY);
        if (!chart.enableCanvas) {
            crossGroup.setAttribute('opacity', '1');
        }
        if (crosshair.lineType === 'Both' || crosshair.lineType === 'Horizontal') {
            if ((chart.crosshair.highlightCategory && this.highlightWidth !== 0) && (chart.isTransposed || chart.requireInvertedAxis)) {
                var crosshairHighlightWidth = this.highlightWidth;
                chart.crosshairModule.valueY = this.adjustCrosshairPositionForOverflow(this.valueY, true, chart);
                var y = this.valueY - (crosshairHighlightWidth / 2);
                horizontalCross = 'M ' + chartRect.x + ' ' + y +
                    ' L ' + (chartRect.x + chartRect.width) + ' ' + y +
                    ' L ' + (chartRect.x + chartRect.width) + ' ' + (y + crosshairHighlightWidth) +
                    ' L ' + chartRect.x + ' ' + (y + crosshairHighlightWidth) + ' Z';
            }
            else {
                horizontalCross += 'M ' + chartRect.x + ' ' + this.valueY +
                    ' L ' + (chartRect.x + chartRect.width) + ' ' + this.valueY;
            }
        }
        if (crosshair.lineType === 'Both' || crosshair.lineType === 'Vertical') {
            if ((chart.crosshair.highlightCategory && this.highlightWidth !== 0) && !chart.requireInvertedAxis) {
                var crosshairHighlightWidth = this.highlightWidth;
                chart.crosshairModule.valueX = this.adjustCrosshairPositionForOverflow(this.valueX, false, chart);
                var x = this.valueX - (crosshairHighlightWidth / 2);
                verticalCross = 'M ' + x + ' ' + chartRect.y +
                    ' L ' + (x + crosshairHighlightWidth) + ' ' + chartRect.y +
                    ' L ' + (x + crosshairHighlightWidth) + ' ' + (chartRect.y + chartRect.height) +
                    ' L ' + x + ' ' + (chartRect.y + chartRect.height) + ' Z';
            }
            else {
                verticalCross += 'M ' + this.valueX + ' ' + chartRect.y +
                    ' L ' + this.valueX + ' ' + (chartRect.y + chartRect.height);
            }
        }
        if (chart.enableCanvas) {
            if (!axisTooltipGroup) {
                axisTooltipGroup = this.svgRenderer.createGroup({ 'id': this.elementID + '_crosshair_axis' });
            }
            var elementID = chart.tooltip.enable ? chart.element.id + '_tooltip_svg' : chart.element.id + '_svg';
            crosshairsvg = this.svgRenderer.createSvg({
                id: elementID,
                width: chart.availableSize.width,
                height: chart.availableSize.height
            });
            if (chart.tooltip.enable) {
                tooltipdiv = !tooltipdiv ? chart.tooltipModule.createElement() : tooltipdiv;
                tooltipdiv.appendChild(crosshairsvg);
                crossGroup.appendChild(tooltipdiv);
            }
            options = new PathOption(this.elementID + '_HorizontalLine', 'none', crosshair.line.width, crosshair.horizontalLineColor || crosshair.line.color || chart.themeStyle.crosshairLine, crosshair.opacity, (chart.theme.indexOf('Bootstrap5') > -1 || chart.theme === 'Fluent2HighContrast' || chart.theme.indexOf('Tailwind3') > -1) ? crosshair.dashArray || '2.5' : crosshair.dashArray, horizontalCross);
            this.drawCrosshairLine(options, cross, chartRect.x, this.valueY, chartRect.width, 0, horizontalCross);
            /**
             * due to not working for vertical line side I added new option
             * options.d = verticalCross; options.id = this.elementID + '_VerticalLine';
             */
            options = new PathOption(this.elementID + '_VerticalLine', 'none', crosshair.line.width, crosshair.verticalLineColor || crosshair.line.color || chart.themeStyle.crosshairLine, crosshair.opacity, (chart.theme.indexOf('Bootstrap5') > -1 || chart.theme === 'Fluent2HighContrast' || chart.theme.indexOf('Tailwind3') > -1) ? crosshair.dashArray || '2.5' : crosshair.dashArray, verticalCross);
            this.drawCrosshairLine(options, cross, this.valueX, chartRect.y, 0, chartRect.height, verticalCross);
            this.renderAxisTooltip(chart, chartRect, axisTooltipGroup);
            crosshairsvg.appendChild(axisTooltipGroup);
            if (!chart.tooltip.enable) {
                cross.appendChild(crosshairsvg);
            }
        }
        else {
            if (crossGroup.childNodes.length === 0) {
                var horizontalHighlight = (chart.crosshair.highlightCategory && this.highlightWidth !== 0) &&
                    (chart.isTransposed || chart.requireInvertedAxis);
                var verticalHighlight = (chart.crosshair.highlightCategory && this.highlightWidth !== 0) &&
                    !chart.requireInvertedAxis;
                axisTooltipGroup = chart.renderer.createGroup({ 'id': this.elementID + '_crosshair_axis' });
                options = new PathOption(this.elementID + '_HorizontalLine', horizontalHighlight ? (crosshair.horizontalLineColor || crosshair.line.color) ? this.crosshairLightenColor(crosshair.horizontalLineColor || crosshair.line.color) : chart.themeStyle.crosshairBackground : 'none', horizontalHighlight ? 0 : crosshair.line.width, horizontalHighlight ? 'none' : crosshair.horizontalLineColor || crosshair.line.color || chart.themeStyle.crosshairLine, crosshair.opacity, horizontalHighlight ? null : (chart.theme.indexOf('Bootstrap5') > -1 || chart.theme === 'Fluent2HighContrast' || chart.theme.indexOf('Tailwind3') > -1) ? crosshair.dashArray || '2.5' : crosshair.dashArray, horizontalCross);
                this.renderCrosshairLine(options, crossGroup);
                options = new PathOption(this.elementID + '_VerticalLine', verticalHighlight ? (crosshair.verticalLineColor || crosshair.line.color) ? this.crosshairLightenColor(crosshair.verticalLineColor || crosshair.line.color) : chart.themeStyle.crosshairBackground : 'none', verticalHighlight ? 0 : crosshair.line.width, verticalHighlight ? 'none' : crosshair.verticalLineColor || crosshair.line.color || chart.themeStyle.crosshairLine, crosshair.opacity, verticalHighlight ? null : (chart.theme.indexOf('Bootstrap5') > -1 || chart.theme === 'Fluent2HighContrast' || chart.theme.indexOf('Tailwind3') > -1) ? crosshair.dashArray || '2.5' : crosshair.dashArray, verticalCross);
                this.renderCrosshairLine(options, crossGroup);
                crossGroup.appendChild(axisTooltipGroup);
                this.renderAxisTooltip(chart, chartRect, crossGroup.lastChild);
            }
            else {
                document.getElementById(this.elementID + '_HorizontalLine').setAttribute('d', horizontalCross);
                document.getElementById(this.elementID + '_VerticalLine').setAttribute('d', verticalCross);
                this.renderAxisTooltip(chart, chartRect, crossGroup.lastChild);
            }
        }
    };
    /**
     * Converts a specified color into a semi-transparent RGB string format.
     *
     * @param {string} color - The main color in hex format.
     * @returns {string} - The lightened color in RGBA format with an alpha value of 0.25.
     */
    Crosshair.prototype.crosshairLightenColor = function (color) {
        var rgbValue = convertHexToColor(colorNameToHex(color));
        return 'rgb(' + rgbValue.r + ',' + rgbValue.g + ',' + rgbValue.b + ',' + 0.25 + ')';
    };
    /**
     * Adjusts the crosshair position to account for any overflow beyond the chart boundaries,
     * ensuring it stays within visible limits. It handles horizontal and vertical orientations separately.
     *
     * @param {number} initialPosition - The initial calculated position of the crosshair before adjustments.
     * @param {boolean} isHorizontalOrientation - Determines whether the crosshair is oriented horizontally.
     * @param {Chart} chart - The chart instance containing details on crosshair module and overflow values.
     * @returns {number} - The adjusted position of the crosshair after accounting for boundary overflow.
     * @private
     */
    Crosshair.prototype.adjustCrosshairPositionForOverflow = function (initialPosition, isHorizontalOrientation, chart) {
        if (chart.crosshairModule.crosshairLeftOverflow > 0) {
            initialPosition += isHorizontalOrientation ? -chart.crosshairModule.crosshairLeftOverflow / 2 :
                chart.crosshairModule.crosshairLeftOverflow / 2;
        }
        if (chart.crosshairModule.crosshairRightOverflow > 0) {
            initialPosition += isHorizontalOrientation ? chart.crosshairModule.crosshairRightOverflow / 2 :
                -chart.crosshairModule.crosshairRightOverflow / 2;
        }
        return initialPosition;
    };
    Crosshair.prototype.renderCrosshairLine = function (options, crossGroup) {
        var htmlObject = this.chart.renderer.drawPath(options);
        crossGroup.appendChild(htmlObject);
    };
    Crosshair.prototype.drawCrosshairLine = function (options, crossGroup, left, top, width, height, direction) {
        if (!document.getElementById(options.id) && direction) {
            var line = createElement('div', {
                id: options.id
            });
            crossGroup.appendChild(line);
        }
        if (document.getElementById(options.id)) {
            var style = 'top:' + top.toString() + 'px;' +
                'left:' + left.toString() + 'px;' +
                'width:' + width + 'px;' +
                'height:' + height + 'px;' +
                'fill:' + options.stroke + ';' +
                'border: 0.5px solid ' + options.stroke + ';' +
                'opacity: ' + options.opacity + ' ; ' +
                'position: absolute';
            var crosshairline = document.getElementById(options.id);
            var crosshairtooltip = document.getElementById(this.elementID + '_crosshair_axis');
            crosshairline.style.cssText = style;
            crossGroup.style.opacity = '1';
            if (crosshairtooltip) {
                crosshairtooltip.style.opacity = '1';
            }
        }
    };
    Crosshair.prototype.renderAxisTooltip = function (chart, chartRect, axisGroup) {
        var axis;
        var text;
        var rect;
        var pathElement;
        var textElem;
        var options;
        var padding = 5;
        var direction;
        var axisRect;
        for (var k = 0, length_1 = chart.axisCollections.length; k < length_1; k++) {
            axis = chart.axisCollections[k];
            axisRect = !axis.placeNextToAxisLine ? axis.rect : axis.updatedRect;
            if (axis.crosshairTooltip.enable) {
                if (axisRect && ((this.valueX <= (axisRect.x + axisRect.width) && axisRect.x <= this.valueX) ||
                    (this.valueY <= (axisRect.y + axisRect.height) && axisRect.y <= this.valueY))) {
                    pathElement = document.getElementById(this.elementID + '_axis_tooltip_' + k);
                    textElem = document.getElementById(this.elementID + '_axis_tooltip_text_' + k);
                    text = this.getAxisText(axis);
                    if (text && text.indexOf('<br') > -1) {
                        text = this.getAxisText(axis).split(/<br.*?>/g);
                    }
                    if (!text) {
                        continue;
                    }
                    rect = this.tooltipLocation(text, axis, chartRect, axisRect);
                    if (rect.y + rect.height / 2 > chart.availableSize.height || rect.y < 0) {
                        continue;
                    }
                    if (pathElement === null) {
                        if (chart.enableCanvas) {
                            pathElement = this.svgRenderer.drawPath({
                                'id': this.elementID + '_axis_tooltip_' + k,
                                'fill': axis.crosshairTooltip.fill || chart.themeStyle.crosshairFill
                            });
                        }
                        else {
                            pathElement = chart.renderer.drawPath({
                                'id': this.elementID + '_axis_tooltip_' + k,
                                'fill': axis.crosshairTooltip.fill || chart.themeStyle.crosshairFill
                            }, null);
                        }
                        axisGroup.appendChild(pathElement);
                        options = new TextOption(this.elementID + '_axis_tooltip_text_' + k, 0, 0, (chart.stockChart && chart.enableRtl) ? 'end' : 'start', text);
                        var render = chart.enableCanvas ? this.svgRenderer : chart.renderer;
                        textElem = textElement(render, options, axis.crosshairTooltip.textStyle, axis.crosshairTooltip.textStyle.color || chart.themeStyle.crosshairLabelFont.color, axisGroup, null, null, null, null, null, null, null, null, chart.enableCanvas, null, this.chart.themeStyle.crosshairLabelFont);
                    }
                    direction = findCrosshairDirection(this.rx, this.ry, rect, this.arrowLocation, 9, this.isTop, this.isBottom, this.isLeft, this.valueX, this.valueY);
                    pathElement.setAttribute('d', direction);
                    if (typeof text !== 'string' && text.length > 1) {
                        for (var i = 0; i < text.length; i++) {
                            textElem.childNodes[i].textContent = text[i];
                        }
                    }
                    else {
                        textElem.textContent = text;
                    }
                    textElem.setAttribute('x', (rect.x + padding + (chart.enableRtl ? this.elementSize.width : 0)).toString());
                    textElem.setAttribute('y', (rect.y + padding + 3 * this.elementSize.height / 4).toString());
                    var shadowId = this.chart.element.id + '_shadow';
                    if (typeof text !== 'string' && text.length > 1) {
                        var height = 0;
                        textElem.setAttribute('y', (rect.y + padding + 3 * this.elementSize.height / (4 * text.length)).toString());
                        for (var i = 0; i < textElem.children.length; i++) {
                            height += this.elementSize.height / text.length;
                            textElem.children[i].setAttribute('x', (rect.x + padding + (chart.enableRtl ? this.elementSize.width : 0) + this.elementSize.width / 2).toString());
                            textElem.children[i].setAttribute('y', ((parseInt(textElem.getAttribute('y'), 10) + height).toString()));
                            textElem.children[i].style.textAnchor = 'middle';
                        }
                    }
                    if (this.chart.theme === 'Fluent' || this.chart.theme === 'FluentDark' || this.chart.theme === 'Fabric' || this.chart.theme === 'FabricDark' || this.chart.theme === 'Fluent2HighContrast') {
                        var defElement = this.chart.renderer.createDefs();
                        var bordercolor = this.chart.theme === 'Fluent' || this.chart.theme === 'Fabric' ? '#D2D0CE' : this.chart.theme === 'Fluent2HighContrast' ? '#FFFFFF' : null;
                        var borderwidth = this.chart.theme === 'Fluent' || this.chart.theme === 'Fabric' || this.chart.theme === 'Fluent2HighContrast' ? 1 : null;
                        defElement.setAttribute('id', this.chart.element.id + 'SVG_tooltip_definition');
                        axisGroup.appendChild(defElement);
                        pathElement.setAttribute('stroke', bordercolor);
                        pathElement.setAttribute('stroke-width', ' ' + borderwidth);
                    }
                    else if (this.chart.theme.indexOf('Fluent2') > -1) {
                        pathElement.setAttribute('box-shadow', '0px 1.6px 3.6px 0px #00000021, 0px 0.3px 0.9px 0px #0000001A');
                        pathElement.setAttribute('filter', Browser.isIE ? '' : 'url(#' + shadowId + ')');
                        var shadow = '<filter id="' + shadowId + '" height="130%"><feGaussianBlur in="SourceAlpha" stdDeviation="3"/>';
                        shadow += '<feOffset dx="-1" dy="3.6" result="offsetblur"/><feComponentTransfer><feFuncA type="linear" slope="0.2"/>';
                        shadow += '</feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>';
                        var defElement = this.chart.renderer.createDefs();
                        defElement.setAttribute('id', this.chart.element.id + 'SVG_tooltip_definition');
                        pathElement.appendChild(defElement);
                        defElement.innerHTML = shadow;
                    }
                }
                else {
                    removeElement(this.elementID + '_axis_tooltip_' + k);
                    removeElement(this.elementID + '_axis_tooltip_text_' + k);
                }
            }
        }
    };
    Crosshair.prototype.getAxisText = function (axis) {
        var value;
        this.isBottom = false;
        this.isTop = false;
        this.isLeft = false;
        this.isRight = false;
        var labelValue = (axis.valueType === 'Category' && axis.labelPlacement === 'BetweenTicks')
            ? 0.5 : 0;
        var isOpposed = axis.isAxisOpposedPosition;
        if (axis.orientation === 'Horizontal') {
            value = getValueXByPoint(Math.abs(this.valueX - axis.rect.x), axis.rect.width, axis) + labelValue;
            this.isBottom = !isOpposed;
            this.isTop = isOpposed;
        }
        else {
            value = getValueYByPoint(Math.abs(this.valueY - axis.rect.y), axis.rect.height, axis) + labelValue;
            this.isRight = isOpposed;
            this.isLeft = !isOpposed;
        }
        if (axis.valueType === 'DateTime') {
            return axis.format(new Date(value));
        }
        else if (axis.valueType === 'Category') {
            return axis.labels[Math.floor(value)];
        }
        else if (axis.valueType === 'DateTimeCategory') {
            return this.chart.dateTimeCategoryModule.getIndexedAxisLabel(axis.labels[Math.round(value)], axis.format);
        }
        else if (axis.valueType === 'Logarithmic') {
            return value = axis.format(Math.pow(axis.logBase, value));
        }
        else {
            var customLabelFormat = axis.labelFormat && axis.labelFormat.match('{value}') !== null;
            return customLabelFormat ? axis.labelFormat.replace('{value}', axis.format(value)) : axis.format(value);
        }
    };
    Crosshair.prototype.tooltipLocation = function (text, axis, bounds, axisRect) {
        var padding = 5;
        var arrowPadding = 9;
        var tooltipRect;
        var boundsX = bounds.x;
        var boundsY = bounds.y;
        var islabelInside = axis.labelPosition === 'Inside';
        var scrollBarHeight = axis.scrollbarSettings.enable || (axis.zoomingScrollBar && axis.zoomingScrollBar.svgObject)
            ? axis.scrollBarHeight : 0;
        this.elementSize = measureText(text, axis.crosshairTooltip.textStyle, this.chart.themeStyle.crosshairLabelFont);
        if (typeof text !== 'string' && text.length > 1) {
            this.elementSize.width = 0;
            this.elementSize.height = 0;
            for (var i = 0; i < text.length; i++) {
                var size = measureText(text[i], axis.crosshairTooltip.textStyle, this.chart.themeStyle.crosshairLabelFont);
                this.elementSize.height += size.height;
                if (this.elementSize.width < size.width) {
                    this.elementSize.width = size.width;
                }
            }
        }
        var isOpposed = axis.isAxisOpposedPosition;
        if (axis.orientation === 'Horizontal') {
            var yLocation = islabelInside ? axisRect.y - this.elementSize.height - (padding * 2 + arrowPadding) :
                axisRect.y + scrollBarHeight;
            var height = islabelInside ? axisRect.y - this.elementSize.height - arrowPadding : axisRect.y + arrowPadding;
            this.arrowLocation = new ChartLocation(this.valueX, yLocation);
            tooltipRect = new Rect((this.valueX - (this.elementSize.width / 2) - padding), height + (!islabelInside ? scrollBarHeight : 0), this.elementSize.width + padding * 2, this.elementSize.height + padding * 2);
            if (isOpposed) {
                tooltipRect.y = islabelInside ? axisRect.y : axisRect.y -
                    (this.elementSize.height + padding * 2 + arrowPadding) - scrollBarHeight;
            }
            if (tooltipRect.x < boundsX) {
                tooltipRect.x = boundsX;
            }
            if (tooltipRect.x + tooltipRect.width > boundsX + bounds.width) {
                tooltipRect.x -= ((tooltipRect.x + tooltipRect.width) - (boundsX + bounds.width));
            }
            if (this.arrowLocation.x + arrowPadding / 2 > tooltipRect.x + tooltipRect.width - this.rx) {
                this.arrowLocation.x = tooltipRect.x + tooltipRect.width - this.rx - arrowPadding;
            }
            if (this.arrowLocation.x - arrowPadding < tooltipRect.x + this.rx) {
                this.arrowLocation.x = tooltipRect.x + this.rx + arrowPadding;
            }
        }
        else {
            scrollBarHeight = scrollBarHeight * (isOpposed ? 1 : -1);
            this.arrowLocation = new ChartLocation(axisRect.x, this.valueY);
            var width = islabelInside ? axisRect.x - scrollBarHeight :
                axisRect.x - (this.elementSize.width) - (padding * 2 + arrowPadding);
            tooltipRect = new Rect(width + scrollBarHeight, this.valueY - (this.elementSize.height / 2) - padding, this.elementSize.width + (padding * 2), this.elementSize.height + padding * 2);
            if (isOpposed) {
                tooltipRect.x = islabelInside ? axisRect.x - this.elementSize.width - arrowPadding :
                    axisRect.x + arrowPadding + scrollBarHeight;
                if ((tooltipRect.x + tooltipRect.width) > this.chart.availableSize.width) {
                    this.arrowLocation.x -= ((tooltipRect.x + tooltipRect.width) - this.chart.availableSize.width);
                    tooltipRect.x -= ((tooltipRect.x + tooltipRect.width) - this.chart.availableSize.width);
                }
            }
            else {
                if (tooltipRect.x < 0) {
                    this.arrowLocation.x -= tooltipRect.x;
                    tooltipRect.x = 0;
                }
            }
            if (tooltipRect.y < boundsY) {
                tooltipRect.y = boundsY;
            }
            if (tooltipRect.y + tooltipRect.height >= boundsY + bounds.height) {
                tooltipRect.y -= ((tooltipRect.y + tooltipRect.height) - (boundsY + bounds.height));
            }
            if (this.arrowLocation.y + arrowPadding / 2 > tooltipRect.y + tooltipRect.height - this.ry) {
                this.arrowLocation.y = tooltipRect.y + tooltipRect.height - this.ry - arrowPadding / 2;
            }
            if (this.arrowLocation.y - arrowPadding / 2 < tooltipRect.y + this.ry) {
                this.arrowLocation.y = tooltipRect.y + this.ry + arrowPadding / 2;
            }
        }
        return tooltipRect;
    };
    Crosshair.prototype.stopAnimation = function () {
        stopTimer(this.crosshairInterval);
    };
    Crosshair.prototype.progressAnimation = function () {
        stopTimer(this.crosshairInterval);
    };
    /**
     * Removes the crosshair on mouse leave.
     *
     * @returns {void}
     * @private
     */
    Crosshair.prototype.removeCrosshair = function (duration) {
        var chart = this.chart;
        var crosshair = chart.enableCanvas ? document.getElementById(this.elementID + '_Crosshair') :
            document.getElementById(this.elementID + '_UserInteraction');
        var crosshairtooltip = chart.enableCanvas ? document.getElementById(this.elementID + '_crosshair_axis') : null;
        this.stopAnimation();
        if (crosshair && crosshair.getAttribute('opacity') !== '0') {
            this.crosshairInterval = +setTimeout(function () {
                new Animation({}).animate(crosshair, {
                    duration: 200,
                    progress: function (args) {
                        // crosshair.removeAttribute('e-animate');
                        crosshair.style.animation = '';
                        if (!chart.enableCanvas) {
                            crosshair.setAttribute('opacity', (1 - (args.timeStamp / args.duration)).toString());
                        }
                        else {
                            crosshair.style.opacity = (1 - (args.timeStamp / args.duration)).toString();
                            crosshairtooltip.style.opacity = (1 - (args.timeStamp / args.duration)).toString();
                        }
                    },
                    end: function () {
                        if (chart.enableCanvas) {
                            crosshair.style.opacity = '0';
                            crosshairtooltip.style.opacity = '0';
                        }
                        else {
                            crosshair.setAttribute('opacity', '0');
                        }
                        chart.startMove = false;
                        if (chart.tooltipModule) {
                            chart.tooltipModule.valueX = null;
                            chart.tooltipModule.valueY = null;
                        }
                    }
                });
            }, duration);
        }
    };
    /**
     * Get module name.
     *
     * @returns {string} module name
     */
    Crosshair.prototype.getModuleName = function () {
        /**
         * Returns the module name.
         */
        return 'Crosshair';
    };
    /**
     * To destroy the crosshair.
     *
     * @returns {void}
     * @private
     */
    Crosshair.prototype.destroy = function () {
        /**
         * Destroy method performed here.
         */
    };
    return Crosshair;
}());
export { Crosshair };
