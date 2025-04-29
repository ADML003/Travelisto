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
 * Circular 3D chart file.
 */
import { Animation, Browser, Collection, Complex, Component, Event, EventHandler, Internationalization, NotifyPropertyChanges, Property, animationMode, isNullOrUndefined, remove, extend } from '@syncfusion/ej2-base';
import { Border, Font, Indexes, Margin } from '../common/model/base';
import { getCircular3DThemeColor } from './model/theme';
import { CircularChart3DSeries } from './renderer/series';
import { Data } from '../common/model/data';
import { ImageOption, RectOption, appendChildElement, calculateSize, createSvg, degreeToLocation, getAnimationFunction, getElement, getTitle, redrawElement, removeElement, showTooltip, subtractRect, textElement, titlePositionX, withInBounds } from '../common/utils/helper';
import { PathOption, Rect, Size, TextOption, measureText } from '@syncfusion/ej2-svg-base';
import { CircularChart3DBinaryTreeBuilder, CircularChart3DTransform, CircularChart3DGraphics, CircularChart3DMatrix, CircularChart3DPolygonModule, CircularChart3DSvgRenderer, CircularChart3DVectorModule } from './renderer/3d-renderer';
import { animationComplete, beforeResize, load, pointClick, pointMove, resized } from '../common/model/constants';
import { PrintUtils } from '../common/utils/print';
import { CircularChart3DLegendSettings } from './legend/legend';
import { CircularChart3DPointData, CircularChart3DTooltipSettings } from './user-interaction/tooltip';
/**
 * Represents the circular 3D chart control.
 * ```html
 * <div id="container"/>
 * <script>
 *   let pie: CircularChart3D = new CircularChart3D({ });
 *   pie.appendTo("#container");
 *
 * </script>
 * ```
 *
 * @public
 */
var CircularChart3D = /** @class */ (function (_super) {
    __extends(CircularChart3D, _super);
    /**
     * Constructor for creating the circular 3D chart widget.
     *
     * @private
     * @param {CircularChart3DModel} options - Specifies the instance of the circular 3D chart model.
     * @param {string | HTMLElement} element - Specifies the element for which the circular 3D chart will be rendered
     * @returns {void}
     */
    function CircularChart3D(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.chartId = 57724;
        /** @private */
        _this.explodeDistance = 0;
        /** @private */
        _this.rotateActivate = false;
        /** @private */
        _this.previousTargetId = '';
        /** @private */
        _this.currentPointIndex = 0;
        /** @private */
        _this.currentLegendIndex = 0;
        /** @private */
        _this.isLegendClicked = false;
        /** @private */
        _this.delayRedraw = false;
        return _this;
    }
    Object.defineProperty(CircularChart3D.prototype, "type", {
        get: function () {
            return 'Pie';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * To create SVG object, renderer, and bind events for the container.
     *
     * @private
     * @returns {void}
     */
    CircularChart3D.prototype.preRender = function () {
        this.allowServerDataBinding = false;
        this.unWireEvents();
        this.titleLocation = { x: 0, y: 0, size: new Size(0, 0) };
        this.subTitleLocation = { x: 0, y: 0, size: new Size(0, 0) };
        this.circularRadius = [];
        this.innerRadius = [];
        this.matrixObj = new CircularChart3DMatrix();
        this.bspTreeObj = new CircularChart3DBinaryTreeBuilder();
        this.polygon = new CircularChart3DPolygonModule();
        this.vector = new CircularChart3DVectorModule(null, null, null);
        this.graphics = new CircularChart3DGraphics();
        this.transform3D = new CircularChart3DTransform();
        this.svg3DRenderer = new CircularChart3DSvgRenderer();
        this.circular3DPolygon = [];
        this.explodeDistance = 0;
        this.setCulture();
        this.animateSeries = true;
        if (this.element.id === '') {
            var collection = document.getElementsByClassName('e-circular3dchart').length;
            this.element.id = 'acc_chart_' + this.chartId + '_' + collection;
        }
        this.wireEvents();
        this.element.setAttribute('dir', this.enableRtl ? 'rtl' : '');
        this.element.style.outline = 'none';
    };
    /**
     * Method to unbind events for the circular 3D chart.
     *
     * @returns {void}
     */
    CircularChart3D.prototype.unWireEvents = function () {
        /** Find the Events type */
        var isIE11Pointer = Browser.isPointer;
        var start = Browser.touchStartEvent;
        var move = Browser.touchMoveEvent;
        var stop = Browser.touchEndEvent;
        var cancel = isIE11Pointer ? 'pointerleave' : 'mouseleave';
        /** UnBind the Event handler */
        EventHandler.remove(this.element, move, this.chartOnMouseMove);
        EventHandler.remove(this.element, stop, this.chartMouseUp);
        EventHandler.remove(this.element, start, this.chartMouseDown);
        EventHandler.remove(this.element, 'click', this.chartOnMouseClick);
        EventHandler.remove(this.element, cancel, this.chartMouseLeave);
        EventHandler.remove(this.element, 'keydown', this.circular3DChartKeyDown);
        EventHandler.remove(this.element, 'keyup', this.circular3DChartKeyUp);
        window.removeEventListener((Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.chartResizeBound);
    };
    /**
     * Handles the mouse click on the circular 3D chart.
     *
     * @param {PointerEvent} e - Mouse event arguments.
     * @returns {boolean} - Indicates whether the mouse click event was handled by the circular 3D chart.
     * @private
     */
    CircularChart3D.prototype.chartOnMouseClick = function (e) {
        this.setMouseXY(e);
        if (this.circularChartLegend3DModule && this.legendSettings.visible) {
            this.circularChartLegend3DModule.click(e);
        }
        if (this.selectionMode !== 'None' && this.circularChartSelection3DModule) {
            this.circularChartSelection3DModule.calculateSelectedElements(this, e.target, e.type);
        }
        if (this.visibleSeries[0].explode) {
            var id = e.target.id;
            var indexes = void 0;
            var pointIndex = void 0;
            if (id.indexOf('-point-') > -1) {
                indexes = id.split('-series-')[1].split('-point-');
                pointIndex = parseInt(indexes[1], 10);
                var currentPointIndex = this.visibleSeries[0].explodeIndex;
                if (currentPointIndex === pointIndex || this.visibleSeries[0].points[pointIndex].isExplode) {
                    this.visibleSeries[0].explodeIndex = null;
                    this.visibleSeries[0].isExploded = true;
                    this.visibleSeries[0].points.forEach(function (point) {
                        point.isExplode = false;
                    });
                }
                else {
                    this.visibleSeries[0].explodeIndex = pointIndex;
                }
                this.removeSeriesElements(this);
                this.visibleSeries[0].segments = [];
                this.circular3DPolygon = [];
                this.renderSeries();
                this.processSelection();
                this.delayRedraw = true;
            }
        }
        this.trigger('circularChart3DMouseClick', { target: e.target.id, x: this.mouseX, y: this.mouseY });
        if (this.pointClick) {
            this.triggerPointEvent(pointClick, e.target, e);
        }
        this.removeNavigationStyle();
        return false;
    };
    /**
     * Triggers a point event for a circular 3D chart element.
     *
     * @param {string} event - The type of event to trigger.
     * @param {Element} element - The DOM element associated with the event.
     * @param {PointerEvent | TouchEvent | undefined} e - The pointer or touch event.
     * @returns {void}
     */
    CircularChart3D.prototype.triggerPointEvent = function (event, element, e) {
        var evt = e;
        var point;
        var series = this.visibleSeries[0];
        if (element.id.indexOf('point') > -1 && element.id.indexOf('series') > -1) {
            var pointIndex = parseInt(element.id.split('point-')[1], 10);
            point = series.points[pointIndex];
        }
        if (point) {
            this.trigger(event, {
                series: series,
                point: point,
                seriesIndex: series.index, pointIndex: point.index,
                x: this.mouseX, y: this.mouseY, pageX: evt.pageX, pageY: evt.pageY
            });
        }
    };
    /**
     * Handles the mouse move on the circular 3D chart.
     *
     * @param {PointerEvent} e - Mouse event arguments.
     * @returns {boolean} - Indicates whether the mouse move event was handled by the circular 3D chart.
     * @private
     */
    CircularChart3D.prototype.chartOnMouseMove = function (e) {
        if (!getElement(this.element.id + '_svg')) {
            return false;
        }
        this.setMouseXY(e);
        this.trigger('circularChart3DMouseMove', { target: e.target.id, x: this.mouseX, y: this.mouseY });
        if (this.rotateActivate) {
            var deltaX = this.previousCoords.x - this.mouseX;
            var deltaY = this.previousCoords.y - this.mouseY;
            if (deltaX || deltaY) {
                this.tilt -= deltaY;
                this.rotation += deltaX;
                if (!this.isTouch) {
                    var grpElement = document.getElementById(this.groupElement.id);
                    grpElement.innerHTML = '';
                    grpElement.remove();
                }
                var size = { width: this.availableSize.width, height: this.availableSize.height };
                this.graphics.view(this.svgObject, this, this.rotation, this.tilt, size, 0, this.depth);
                appendChildElement(false, this.svgObject, this.groupElement, this.redraw);
                this.setSeriesTabIndex();
                this.previousCoords.y = this.mouseY;
                this.previousCoords.x = this.mouseX;
                if (this.circularChartHighlight3DModule && this.highlightMode !== 'None') {
                    this.circularChartHighlight3DModule.calculateSelectedElements(this, document.getElementById(this.element.id + '-border'), 'mousemove');
                    this.circularChartHighlight3DModule.previousSelectedElement = [];
                }
                this.processSelection();
            }
        }
        if (this.pointMove) {
            this.triggerPointEvent(pointMove, e.target, e);
        }
        if (this.tooltip.enable && this.circularChartTooltip3DModule) {
            this.circularChartTooltip3DModule.mouseMoveHandler(e, this);
        }
        if (!this.isTouch) {
            this.titleTooltip(e, this.mouseX, this.mouseY);
        }
        this.notify(Browser.touchMoveEvent, e);
        return false;
    };
    /**
     * Displays a tooltip for the given event at the specified coordinates.
     *
     * @param {Event} event - The event triggering the tooltip display.
     * @param {number} x - The x-coordinate for the tooltip position.
     * @param {number} y - The y-coordinate for the tooltip position.
     * @param {boolean} isTouch - Optional parameter indicating whether the event is a touch event. Defaults to false if not provided.
     * @returns {void}
     */
    CircularChart3D.prototype.titleTooltip = function (event, x, y, isTouch) {
        var targetId = event.target.id;
        var id = (targetId === (this.element.id + '-title') || targetId === (this.element.id + '-sub-title') ||
            targetId === (this.element.id + '_chart_legend_title'));
        if ((event.target.textContent.indexOf('...') > -1) && id) {
            var title = (targetId === (this.element.id + '-title')) ?
                this.title : (targetId === (this.element.id + '-sub-title')) ? this.subTitle : this.legendSettings.title;
            showTooltip(title, x, y, this.element.offsetWidth, this.element.id + '_EJ2_Title_Tooltip', getElement(this.element.id + '_Secondary_Element'), isTouch);
        }
        else {
            removeElement(this.element.id + '_EJ2_Title_Tooltip');
        }
    };
    /**
     * Sets the mouse x and y coordinates based on the specified pointer event.
     *
     * @param {PointerEvent} e - Specifies the pointer event.
     * @returns {void}
     */
    CircularChart3D.prototype.setMouseXY = function (e) {
        var pageX;
        var pageY;
        var svgRectElement = getElement(this.element.id + '_svg');
        if (svgRectElement && this.element) {
            var svgRect = svgRectElement.getBoundingClientRect();
            var rect = this.element.getBoundingClientRect();
            if (e.type.indexOf('touch') > -1) {
                this.isTouch = true;
                var touchArg = e;
                pageY = touchArg.changedTouches[0].clientY;
                pageX = touchArg.changedTouches[0].clientX;
            }
            else {
                this.isTouch = e.pointerType === 'touch' || e.pointerType === '2';
                pageX = e.clientX;
                pageY = e.clientY;
            }
            this.mouseY = (pageY - rect.top) - Math.max(svgRect.top - rect.top, 0);
            this.mouseX = (pageX - rect.left) - Math.max(svgRect.left - rect.left, 0);
        }
    };
    /**
     * Method to bind events for the circular 3D chart.
     *
     * @returns {void}
     */
    CircularChart3D.prototype.wireEvents = function () {
        if (!this.element) {
            return;
        }
        /** Find the Events type */
        var isIE11Pointer = Browser.isPointer;
        var start = Browser.touchStartEvent;
        var stop = Browser.touchEndEvent;
        var move = Browser.touchMoveEvent;
        var cancel = isIE11Pointer ? 'pointerleave' : 'mouseleave';
        /** Bind the Event handler */
        EventHandler.add(this.element, move, this.chartOnMouseMove, this);
        EventHandler.add(this.element, stop, this.chartMouseUp, this);
        EventHandler.add(this.element, start, this.chartMouseDown, this);
        EventHandler.add(this.element, 'click', this.chartOnMouseClick, this);
        EventHandler.add(this.element, cancel, this.chartMouseLeave, this);
        EventHandler.add(this.element, 'keydown', this.circular3DChartKeyDown, this);
        EventHandler.add(this.element, 'keyup', this.circular3DChartKeyUp, this);
        this.chartResizeBound = this.chartResize.bind(this);
        window.addEventListener((Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.chartResizeBound);
        //new Touch(this.element); // To avoid geasture blocking for browser
        /** Apply the style for chart */
        this.setStyle(this.element);
    };
    /**
     * Handles the mouse leave on circular 3D chart.
     *
     * @param {PointerEvent} e - Mouse event arguments.
     * @returns {boolean} - Indicates the mouse leave event for the circular 3D chart.
     * @private
     */
    CircularChart3D.prototype.chartMouseLeave = function (e) {
        this.setMouseXY(e);
        this.trigger('circularChart3DMouseLeave', { target: e.target.id, x: this.mouseX, y: this.mouseY });
        if (this.tooltip.enable && this.circularChartTooltip3DModule) {
            this.circularChartTooltip3DModule.mouseLeaveHandler();
        }
        this.notify(Browser.isPointer ? 'pointerleave' : 'mouseleave', e);
        this.rotateActivate = false;
        return false;
    };
    /**
     * Handles the mouse end event for the circular 3D chart.
     *
     * @param {PointerEvent} e - Mouse event arguments.
     * @returns {boolean} - Indicates the mouse end event for the circular 3D chart.
     * @private
     */
    CircularChart3D.prototype.chartMouseUp = function (e) {
        this.setMouseXY(e);
        this.trigger('circularChart3DMouseUp', { target: e.target.id, x: this.mouseX, y: this.mouseY });
        if (this.isTouch) {
            this.titleTooltip(e, this.mouseX, this.mouseY, this.isTouch);
        }
        this.rotateActivate = false;
        if (this.tooltip.enable && this.circularChartTooltip3DModule) {
            this.circularChartTooltip3DModule.mouseUpHandler(e, this);
        }
        this.notify(Browser.touchEndEvent, e);
        return false;
    };
    /**
     * Handles the mouse start event on the circular 3D chart.
     *
     * @param {PointerEvent} e - Mouse event arguments.
     * @returns {boolean} - Indicates whether the mouse start event was handled by the circular 3D chart.
     * @private
     */
    CircularChart3D.prototype.chartMouseDown = function (e) {
        this.setMouseXY(e);
        this.trigger('circularChart3DMouseDown', { target: e.target.id, x: this.mouseX, y: this.mouseY });
        this.cachedX = this.mouseX;
        this.cachedY = this.mouseY;
        var svgRect = getElement(this.element.id + '_svg').getBoundingClientRect();
        var bounds = document.getElementById(this.element.id + '-svg-chart-3d').getBoundingClientRect();
        var rect = { x: bounds.left - svgRect.left, y: bounds.top - svgRect.top, width: bounds.width, height: bounds.height };
        if (this.enableRotation && withInBounds(this.mouseX, this.mouseY, rect)) {
            this.rotateActivate = true;
            this.previousCoords = { x: this.mouseX, y: this.mouseY };
        }
        return false;
    };
    /**
     * Applies styles for the circular 3D chart element.
     *
     * @param {HTMLElement} element - Specifies the circular 3D chart element.
     * @returns {void}
     */
    CircularChart3D.prototype.setStyle = function (element) {
        element.style.touchAction = this.enableRotation ? 'none' : 'element';
        element.style.msTouchAction = 'element';
        element.style.msContentZooming = 'none';
        element.style.msUserSelect = 'none';
        element.style.webkitUserSelect = 'none';
        element.style.position = 'relative';
        element.style.display = 'block';
        element.style.height = (element.style.height || (this.height && this.height.indexOf('%') === -1)) ? element.style.height : 'inherit';
    };
    /**
     * Method to set the culture for the circular 3D chart.
     *
     * @returns {void}
     */
    CircularChart3D.prototype.setCulture = function () {
        this.intl = new Internationalization();
    };
    /**
     * Renders the circular 3D chart elements.
     *
     * @returns {void}
     * @private
     */
    CircularChart3D.prototype.render = function () {
        var _this = this;
        if (this.element.className.indexOf('e-circular3dchart') === -1) {
            this.element.classList.add('e-circular3dchart');
        }
        this.element.setAttribute('role', 'region');
        this.element.setAttribute('tabindex', '0');
        this.element.setAttribute('aria-label', this.title + '. Syncfusion interactive chart.');
        this.element.setAttribute('class', this.element.getAttribute('class') + ' e-circular3dchart-focused');
        var loadEventData = {
            chart: this,
            theme: this.theme, name: load, cancel: false
        };
        this.trigger(load, loadEventData, function () {
            if (!loadEventData.cancel) {
                _this.setTheme();
                _this.calculateVisibleSeries();
                _this.processData();
                _this.renderComplete();
                _this.allowServerDataBinding = true;
            }
        });
    };
    /**
     * Sets the theme for the circular 3D chart.
     *
     * @returns {void}
     */
    CircularChart3D.prototype.setTheme = function () {
        /** Set theme for circular 3D chart */
        this.themeStyle = getCircular3DThemeColor(this.theme);
    };
    /**
     * Processes data from the data source to find points for rendering.
     *
     * @param {boolean} render - A boolean value indicating whether to trigger rendering after processing the data. Default is true.
     * @returns {void}
     */
    CircularChart3D.prototype.processData = function (render) {
        if (render === void 0) { render = true; }
        this.seriesCounts = 0;
        for (var _i = 0, _a = this.visibleSeries; _i < _a.length; _i++) {
            var series = _a[_i];
            series.dataModule = new Data(series.dataSource || this.dataSource, series.query);
            series.refreshDataManager(this, render);
        }
    };
    /**
     * Refreshes the circular 3D chart.
     *
     * @private
     * @returns {void}
     */
    CircularChart3D.prototype.refreshChart = function () {
        this.createPieSvg();
        this.calculateBounds();
        this.circular3DPolygon = [];
        this.visibleSeries[0].segments = [];
        this.groupElement = this.renderer.createGroup({ 'id': this.element.id + '-svg-chart-3d' });
        this.groupElement.setAttribute('role', 'region');
        this.groupElement.setAttribute('aria-hidden', 'false');
        this.renderElements();
        removeElement('chartmeasuretext');
    };
    /**
     * Renders elements for the circular 3D chart.
     *
     * @private
     * @returns {void}
     */
    CircularChart3D.prototype.renderElements = function () {
        this.renderBorder();
        this.createSecondaryElement();
        this.renderTitle();
        this.renderSeries();
        this.renderLegend();
        appendChildElement(false, this.element, this.svgObject, this.redraw);
        this.processSelection();
        this.setSecondaryElementPosition();
        this.trigger('loaded', { chart: this });
        this.setSeriesTabIndex();
        this.doAnimation();
        this.animateSeries = false;
    };
    /**
     * Sets the tabindex attribute to '0' for the last element matching the selector pattern "[id*='region-series-0-point-0']".
     *
     * @returns {void}
     */
    CircularChart3D.prototype.setSeriesTabIndex = function () {
        var elements;
        for (var i = 0; i < this.visibleSeries[0].points.length; i++) {
            if (this.visibleSeries[0].points[i].visible) {
                elements = document.querySelectorAll('[id*="region-series-0-point-' + this.visibleSeries[0].points[i].index + '"]');
                break;
            }
        }
        if (elements && elements.length > 0) {
            var element = elements[elements.length - 1];
            element.setAttribute('tabindex', '0');
        }
    };
    /**
     * Processes the selection in the circular 3D chart.
     *
     * @returns {void}
     */
    CircularChart3D.prototype.processSelection = function () {
        var selectedDataIndexes = [];
        if (this.circularChartSelection3DModule && this.selectionMode !== 'None') {
            selectedDataIndexes = extend([], this.circularChartSelection3DModule.selectedDataIndexes, null, true);
            this.circularChartSelection3DModule.invokeSelection(this);
        }
        if (this.circularChartHighlight3DModule) {
            this.circularChartHighlight3DModule.invokeHighlight(this);
        }
        if (selectedDataIndexes.length > 0) {
            this.circularChartSelection3DModule.selectedDataIndexes = selectedDataIndexes;
            this.circularChartSelection3DModule.redrawSelection(this);
        }
    };
    /**
     * Performs a highlight animation on the specified HTML element with the given duration and starting opacity.
     *
     * @param {HTMLElement} element - The HTML element to animate.
     * @param {number} duration - The duration of the animation in milliseconds.
     * @param {number} startOpacity - The starting opacity value for the animation.
     * @returns {void}
     * @private
     */
    CircularChart3D.prototype.highlightAnimation = function (element, duration, startOpacity) {
        var endOpacity = parseFloat(this.visibleSeries[0].opacity.toString());
        if (endOpacity) {
            new Animation({}).animate(element, {
                duration: duration,
                progress: function (args) {
                    element.style.animation = '';
                    var progress = args.timeStamp / args.duration;
                    var currentOpacity = startOpacity + (endOpacity - startOpacity) * progress;
                    element.setAttribute('opacity', currentOpacity.toString());
                },
                end: function () {
                    element.setAttribute('opacity', endOpacity.toString());
                }
            });
        }
    };
    /**
     * Stops the animation for the specified HTML element in the circular 3D chart.
     *
     * @param {HTMLElement} element - The HTML element for which the animation should be stopped.
     * @returns {void}
     * @private
     */
    CircularChart3D.prototype.stopElementAnimation = function (element) {
        var endOpacity = parseFloat(this.visibleSeries[0].opacity.toString());
        var animation = element.getAttribute('e-animate');
        if (animation) {
            Animation.stop(element);
        }
        element.setAttribute('opacity', endOpacity.toString());
    };
    /**
     * Initiates and executes the animation for the circular 3D chart.
     * This method assumes the existence of visible series and focuses on the first series for animation.
     *
     * @returns {void}
     */
    CircularChart3D.prototype.doAnimation = function () {
        var series = this.visibleSeries[0];
        if (series.animation.enable && this.animateSeries) {
            var clippath_1 = this.renderer.createClipPath({ id: this.element.id + 'SeriesGroup0' + '_clipPath' });
            var path = new PathOption(this.element.id + 'SeriesGroup0' + '_slice', 'transparent', 1, 'transparent', 1, '', '');
            var clipslice = this.renderer.drawPath(path);
            clippath_1.appendChild(clipslice);
            this.svgObject.appendChild(clippath_1);
            var id_1 = this.element.id;
            var groupElementID_1 = this.groupElement.id;
            document.querySelectorAll('[id*="region-series-"]').forEach(function (slice) {
                if (slice.parentElement.id === groupElementID_1) {
                    slice.style.cssText = 'clip-path:url(#' + clippath_1.id + '); -webkit-clip-path:url(#' + clippath_1.id + ');';
                    slice.setAttribute('clip-path', 'url(#' + id_1 + 'SeriesGroup0' + '_clipPath' + ')');
                }
            });
            if (series.segments[0]) {
                this.animationRect(clipslice, series);
            }
        }
    };
    /**
     * Renders the legend for the circular 3D chart.
     *
     * @returns {void}
     */
    CircularChart3D.prototype.renderLegend = function () {
        if (!this.circularChartLegend3DModule || !this.legendSettings.visible) {
            return null;
        }
        if (this.circularChartLegend3DModule.legendCollections.length && this.visibleSeries[0].labelBound) {
            this.circularChartLegend3DModule.getSmartLegendLocation(this.visibleSeries[0].labelBound, this.circularChartLegend3DModule.legendBounds, this.margin);
        }
        this.circularChartLegend3DModule.renderLegend(this, this.legendSettings, this.circularChartLegend3DModule.legendBounds, this.redraw);
    };
    /**
     * Initiates animation for the circular 3D series.
     *
     * @param {Element} slice - Specifies the slice element to animate.
     * @param {CircularChart3DSeries} series - Specifies the circular 3D chart series.
     * @returns {void}
     */
    CircularChart3D.prototype.animationRect = function (slice, series) {
        var _this = this;
        var startAngle = -90;
        var duration = series.animation.duration; //this.duration ? this.duration : series.animation.duration;
        var value;
        var radius = Math.max(this.availableSize.height, this.availableSize.width) * 0.75;
        radius += radius * (0.414); // formula r + r / 2 * (1.414 -1)
        var effect = getAnimationFunction('Linear'); // need to check animation type
        var center = {
            x: series.segments[0].center.x - this.rotation / 2,
            y: series.segments[0].center.y + this.tilt / 2
        };
        for (var i = 0; i < series.points.length; i++) {
            var dataLabelElement = getElement(this.element.id + '-svg-data-label-text-' + i);
            if (dataLabelElement) {
                dataLabelElement.style.visibility = 'hidden';
            }
            var shapeElement = getElement(this.element.id + '-svg-data-label-series-0-shape-' + i);
            if (shapeElement) {
                shapeElement.style.visibility = 'hidden';
            }
            var templateElement = getElement(this.element.id + '-series-' + series.index + '-data-label-' + i);
            if (templateElement) {
                templateElement.style.visibility = 'hidden';
            }
            var connectorElement = getElement(this.element.id + '-datalabel-series-0-connector-' + i);
            if (connectorElement) {
                connectorElement.style.visibility = 'hidden';
            }
        }
        if (!isNullOrUndefined(slice)) {
            new Animation({}).animate(slice, {
                duration: (duration === 0 && animationMode === 'Enable') ? 1000 : duration,
                delay: series.animation.delay,
                progress: function (args) {
                    value = effect(args.timeStamp, startAngle, 359.99999, args.duration);
                    slice.setAttribute('d', _this.getPathArc(center, startAngle, value, radius));
                },
                end: function () {
                    slice.setAttribute('d', _this.getPathArc(center, 0, 359.99999, radius));
                    _this.trigger(animationComplete, { series: series, chart: _this });
                    for (var i = 0; i < series.points.length; i++) {
                        var dataLabelElement = getElement(_this.element.id + '-svg-data-label-text-' + i);
                        if (dataLabelElement) {
                            dataLabelElement.style.visibility = 'visible';
                        }
                        var shapeElement = getElement(_this.element.id + '-svg-data-label-series-0-shape-' + i);
                        if (shapeElement) {
                            shapeElement.style.visibility = 'visible';
                        }
                        var templateElement = getElement(_this.element.id + '-series-' + series.index + '-data-label-' + i);
                        if (templateElement) {
                            templateElement.style.visibility = 'visible';
                        }
                        var connectorElement = getElement(_this.element.id + '-datalabel-series-0-connector-' + i);
                        if (connectorElement) {
                            connectorElement.style.visibility = 'visible';
                        }
                    }
                }
            });
        }
    };
    /**
     * Gets the path arc direction for the circular 3D chart.
     *
     * @param {ChartLocation} center - Specifies the center of the series segment.
     * @param {number} start - Specifies the start angle in degrees.
     * @param {number} end  - Specifies the end angle in degrees.
     * @param {number} radius - Specifies the radius of the series.
     * @returns {string} - Path arc direction as an SVG path string.
     */
    CircularChart3D.prototype.getPathArc = function (center, start, end, radius) {
        var degree = end - start;
        degree = degree < 0 ? (degree + 360) : degree;
        var flag = (degree < 180) ? 0 : 1;
        return this.getPiePath(center, degreeToLocation(start, radius, center), degreeToLocation(end, radius, center), radius, flag);
    };
    /**
     * Gets the SVG path string for a pie in the circular 3D chart.
     *
     * @param {ChartLocation} center - Specifies the center of the series segment.
     * @param {ChartLocation} start - Specifies the start angle in degrees.
     * @param {ChartLocation} end - Specifies the end angle in degrees.
     * @param {number} radius - Specifies the radius of the series.
     * @param {number} clockWise - Specifies the clockwise direction (0 for anti-clockwise, 1 for clockwise).
     * @returns {string} - SVG path string for the pie.
     */
    CircularChart3D.prototype.getPiePath = function (center, start, end, radius, clockWise) {
        return 'M ' + center.x + ' ' + center.y + ' L ' + start.x + ' ' + start.y + ' A ' + radius + ' ' +
            radius + ' 0 ' + clockWise + ' 1 ' + end.x + ' ' + end.y + ' Z';
    };
    /**
     * Renders the border for the circular 3D chart.
     *
     * @returns {void}
     */
    CircularChart3D.prototype.renderBorder = function () {
        var padding = this.border.width;
        var rect = new RectOption(this.element.id + '-border', this.background || this.themeStyle.background, this.border, 1, new Rect(padding / 2, padding / 2, this.availableSize.width - padding, this.availableSize.height - padding));
        var htmlObject = this.renderer.drawRectangle(rect);
        htmlObject.setAttribute('aria-hidden', 'true');
        appendChildElement(false, this.svgObject, htmlObject, this.redraw);
        var backGroundImage = this.backgroundImage;
        if (backGroundImage) {
            var image = new ImageOption(this.availableSize.height - padding, this.availableSize.width - padding, backGroundImage, 0, 0, this.element.id + '-background', 'visible', 'none');
            appendChildElement(false, this.svgObject, this.renderer.drawImage(image), this.redraw);
        }
    };
    /**
     * Creates the secondary element for tooltips and data labels.
     *
     * @returns {void}
     */
    CircularChart3D.prototype.createSecondaryElement = function () {
        var element = redrawElement(this.redraw, this.element.id + '_Secondary_Element') ||
            this.createElement('div', {
                id: this.element.id + '_Secondary_Element',
                styles: 'position: relative'
            });
        appendChildElement(false, this.element, element, this.redraw);
    };
    /**
     * Renders the series for the circular 3D chart.
     *
     * @returns {void}
     */
    CircularChart3D.prototype.renderSeries = function () {
        if (!this.redraw) {
            this.svgObject.appendChild(this.renderer.createGroup({ id: this.element.id + '_SeriesCollection' }));
        }
        for (var _i = 0, _a = this.visibleSeries; _i < _a.length; _i++) {
            var series = _a[_i];
            if (series.visible && this[('pie' + 'Series3DModule')]) {
                series.draw(series, this);
                this.defaultLabelBound(series);
            }
        }
    };
    /**
     * Sets the default label bounds for the specified circular 3D chart series based on its circular bounds.
     *
     * @param {CircularChart3DSeries} series - The CircularChart3DSeries for which to set the default label bounds.
     * @returns {void}
     */
    CircularChart3D.prototype.defaultLabelBound = function (series) {
        if (series.segments.length > 0 && series.dataLabel.visible) {
            var circularBound = this.getSeriesBound(series);
            if (series.dataLabel.visible && series.dataLabel.position === 'Inside') {
                series.labelBound = new Rect(circularBound.x, circularBound.y, circularBound.width + circularBound.x, circularBound.height + circularBound.y);
            }
            series.findMaxBounds(series.labelBound, circularBound);
            if (this.circularChartLegend3DModule) {
                series.labelBound.x -= this.explodeDistance;
                series.labelBound.y -= this.explodeDistance;
                series.labelBound.height += (this.explodeDistance - series.labelBound.y);
                series.labelBound.width += (this.explodeDistance - series.labelBound.x);
            }
        }
    };
    /**
     * Calculates and returns the bounding rectangle (Rect) for the specified circular 3D chart series.
     *
     * @param {CircularChart3DSeries} series - The CircularChart3DSeries for which to calculate the bounding rectangle.
     * @returns {Rect} - The calculated bounding rectangle for the series.
     */
    CircularChart3D.prototype.getSeriesBound = function (series) {
        var rect = new Rect(Infinity, Infinity, -Infinity, -Infinity);
        var start = 0;
        var total = 360;
        var end = (0 + total) % 360;
        end = (end === 0) ? 360 : end;
        series.findMaxBounds(rect, this.getRectFromAngle(start));
        series.findMaxBounds(rect, this.getRectFromAngle(end));
        series.findMaxBounds(rect, new Rect(series.segments[0].center.x, series.segments[0].center.y, 0, 0));
        var nextQuandrant = (Math.floor(start / 90) * 90 + 90) % 360;
        var lastQuadrant = (Math.floor(end / 90) * 90) % 360;
        lastQuadrant = (lastQuadrant === 0) ? 360 : lastQuadrant;
        if (total >= 90 || lastQuadrant === nextQuandrant) {
            series.findMaxBounds(rect, this.getRectFromAngle(nextQuandrant));
            series.findMaxBounds(rect, this.getRectFromAngle(lastQuadrant));
        }
        if (start === 0 || (start + total >= 360)) {
            series.findMaxBounds(rect, this.getRectFromAngle(0));
        }
        var length = nextQuandrant === lastQuadrant ? 0 : Math.floor(total / 90);
        for (var i = 1; i < length; i++) {
            nextQuandrant = nextQuandrant + 90;
            if ((nextQuandrant < lastQuadrant || end < start) || total === 360) {
                series.findMaxBounds(rect, this.getRectFromAngle(nextQuandrant));
            }
        }
        rect.width -= rect.x;
        rect.height -= rect.y;
        return rect;
    };
    /**
     * Computes and returns a rectangle (Rect) based on the specified angle.
     *
     * @param {number} angle - The angle used to calculate the rectangle position.
     * @returns {Rect} - The calculated rectangle representing the position.
     */
    CircularChart3D.prototype.getRectFromAngle = function (angle) {
        var location = degreeToLocation(angle, this.circularRadius[0], this.visibleSeries[0].segments[0].center);
        return new Rect(location.x, location.y, 0, 0);
    };
    /**
     * Renders the title for the circular 3D chart.
     *
     * @returns {void}
     */
    CircularChart3D.prototype.renderTitle = function () {
        var margin = this.margin;
        if (!this.title) {
            return null;
        }
        var getAnchor = this.getTextAnchor(this.titleStyle.textAlignment, this.enableRtl);
        var titleSize = measureText(this.title, this.titleStyle, this.themeStyle.chartTitleFont);
        var titleHeight = this.margin.top + (titleSize.height * 3 / 4);
        var rect = new Rect(margin.left, 0, this.availableSize.width - margin.left - margin.right, 0);
        var options = new TextOption(this.element.id + '-title', titlePositionX(rect, this.titleStyle), titleHeight, getAnchor, this.titleCollection, '', 'auto');
        this.titleLocation = { x: options.x, y: options.y, size: titleSize };
        var element = textElement(this.renderer, options, this.titleStyle, this.titleStyle.color || this.themeStyle.chartTitleFont.color, this.svgObject, false, this.redraw, null, null, null, null, null, null, null, null, this.themeStyle.chartTitleFont);
        if (element) {
            element.setAttribute('tabindex', '0');
            element.style.outline = 'none';
            element.parentNode.insertBefore(element, this.svgObject.children && this.svgObject.children[1]);
        }
        if (this.subTitle) {
            this.renderSubTitle(options);
        }
    };
    /**
     * Gets the text anchor based on the specified alignment and RTL setting.
     *
     * @param {Alignment} alignment - The alignment of the text.
     * @param {boolean} enableRTL - A boolean indicating whether right-to-left (RTL) text is enabled.
     * @returns {string} - The text anchor value.
     */
    CircularChart3D.prototype.getTextAnchor = function (alignment, enableRTL) {
        switch (alignment) {
            case 'Near':
                return enableRTL ? 'end' : 'start';
            case 'Far':
                return enableRTL ? 'start' : 'end';
            default:
                return 'middle';
        }
    };
    /**
     * Renders the subtitle for the circular 3D chart.
     *
     * @param {TextOption} options - The text options for rendering the subtitle.
     * @returns {void}
     */
    CircularChart3D.prototype.renderSubTitle = function (options) {
        var maxWidth = 0;
        var titleWidth = 0;
        var padding = 10;
        var alignment = this.titleStyle.textAlignment;
        var subTitleElementSize = measureText(this.subTitle, this.subTitleStyle, this.themeStyle.chartSubTitleFont);
        for (var _i = 0, _a = this.titleCollection; _i < _a.length; _i++) {
            var titleText = _a[_i];
            titleWidth = measureText(titleText, this.titleStyle, this.themeStyle.chartTitleFont).width;
            maxWidth = titleWidth > maxWidth ? titleWidth : maxWidth;
        }
        var rect = new Rect(alignment === 'Center' ? (options.x - maxWidth / 2) : alignment === 'Far' ? options.x - maxWidth : options.x, 0, maxWidth, 0);
        var subTitleOption = new TextOption(this.element.id + '-sub-title', titlePositionX(rect, this.subTitleStyle), options.y * options.text.length + ((subTitleElementSize.height) * 3 / 4) + padding, this.getTextAnchor(this.subTitleStyle.textAlignment, this.enableRtl), this.subTitleCollection, '', 'auto');
        this.subTitleLocation = { x: subTitleOption.x, y: subTitleOption.y, size: subTitleElementSize };
        textElement(this.renderer, subTitleOption, this.subTitleStyle, this.subTitleStyle.color || this.themeStyle.chartSubTitleFont.color, this.svgObject, false, this.redraw, null, null, null, null, null, null, null, null, this.themeStyle.chartSubTitleFont);
    };
    /**
     * Sets the left and top position for the data label and tooltip template for center-aligned chart.
     *
     * @private
     * @returns {void}
     */
    CircularChart3D.prototype.setSecondaryElementPosition = function () {
        var tooltipParent = getElement(this.element.id + '_Secondary_Element');
        if (!tooltipParent) {
            return;
        }
        var rect = this.element.getBoundingClientRect();
        var svgRect = getElement(this.element.id + '_svg').getBoundingClientRect();
        tooltipParent.style.left = Math.max(svgRect.left - rect.left, 0) + 'px';
        tooltipParent.style.top = Math.max(svgRect.top - rect.top, 0) + 'px';
    };
    /**
     * Creates an SVG element for the circular 3D chart.
     *
     * @returns {void}
     */
    CircularChart3D.prototype.createPieSvg = function () {
        this.removeSvg();
        createSvg(this);
    };
    /**
     * Removes the SVG from the circular 3D chart.
     *
     * @returns {void}
     * @private
     */
    CircularChart3D.prototype.removeSvg = function () {
        if (this.redraw) {
            return null;
        }
        removeElement(this.element.id + '_Secondary_Element');
        if (this.svgObject) {
            while (this.svgObject.childNodes.length > 0) {
                this.svgObject.removeChild(this.svgObject.firstChild);
            }
            if (!this.svgObject.hasChildNodes() && this.svgObject.parentNode) {
                remove(this.svgObject);
            }
        }
        removeElement('EJ2_legend_tooltip');
        removeElement('EJ2_datalabel_tooltip');
        removeElement(this.element.id + 'PointHover_Border');
    };
    /**
     * Calculates and sets the visible series for the circular 3D chart.
     *
     * @returns {void}
     */
    CircularChart3D.prototype.calculateVisibleSeries = function () {
        this.visibleSeries = [];
        this.series[0].index = 0;
        this.visibleSeries.push(this.series[0]);
    };
    /**
     * Method to calculate bounds for the circular 3D chart.
     *
     * @returns {void}
     * @private
     */
    CircularChart3D.prototype.calculateBounds = function () {
        this.initialClipRect = new Rect(this.margin.left, this.margin.top, this.availableSize.width, this.availableSize.height);
        this.titleCollection = [];
        this.subTitleCollection = [];
        var titleHeight = 0;
        var subTitleHeight = 0;
        var maxWidth = 0;
        var titleWidth = 0;
        if (this.title) {
            this.titleCollection = getTitle(this.title, this.titleStyle, this.initialClipRect.width, this.enableRtl, this.themeStyle.chartTitleFont);
        }
        titleHeight = this.title ? measureText(this.title, this.titleStyle, this.themeStyle.chartTitleFont).height * this.titleCollection.length : titleHeight;
        if (this.subTitle) {
            for (var _i = 0, _a = this.titleCollection; _i < _a.length; _i++) {
                var titleText = _a[_i];
                titleWidth = measureText(titleText, this.titleStyle, this.themeStyle.chartTitleFont).width;
                maxWidth = titleWidth > maxWidth ? titleWidth : maxWidth;
            }
            this.subTitleCollection = getTitle(this.subTitle, this.subTitleStyle, maxWidth, this.enableRtl, this.themeStyle.chartSubTitleFont);
            subTitleHeight = (measureText(this.subTitle, this.subTitleStyle, this.themeStyle.chartSubTitleFont).height * this.subTitleCollection.length);
        }
        subtractRect(this.initialClipRect, new Rect(0, (subTitleHeight + titleHeight), this.margin.right + this.margin.left, this.margin.bottom + this.margin.top));
        this.calculateLegendBounds();
    };
    /*
     * Method to calculate legend bounds for the circular 3D chart.
     *
     * @returns {void}
     */
    CircularChart3D.prototype.calculateLegendBounds = function () {
        if (!this.circularChartLegend3DModule || !this.legendSettings.visible) {
            return null;
        }
        this.circularChartLegend3DModule.getLegendOptions(this, this.visibleSeries);
        this.circularChartLegend3DModule.calculateLegendBounds(this.initialClipRect, this.availableSize, null);
    };
    /**
     * Handles the print method for the circular 3D chart control.
     *
     * @param {string[] | string | Element} id - Specifies the element to print.
     * @returns {void}
     */
    CircularChart3D.prototype.print = function (id) {
        var exportChart = new PrintUtils(this);
        exportChart.print(id);
    };
    /**
     * Export method for the circular 3D chart.
     *
     * @param {ExportType} type - Specifies the type of the image file (PNG, JPEG, SVG).
     * @param {string} fileName - Specifies the name of the exported image file.
     * @returns {void}
     */
    CircularChart3D.prototype.export = function (type, fileName) {
        if (this.circularChartExport3DModule) {
            this.circularChartExport3DModule.export(type, fileName);
            if (this.afterExport) {
                this.circularChartExport3DModule.getDataUrl(this);
            }
        }
    };
    /**
     * Export the chart on the page to a PDF document.
     *
     * @param {string} fileName - The name of the exported file.
     * @param {PdfPageOrientation} orientation - Page orientation (portrait or landscape).
     * @param {CircularChart3D[]} controls - Array of controls to be exported.
     * @param {number} width - The width of the exported chart.
     * @param {number} height - The height of the exported chart.
     * @param {boolean} isVertical - Export the chart vertically or horizontally.
     * @param {string} header - Text to appear at the top of the exported PDF document.
     * @param {string} footer - Text to appear at the bottom of the exported PDF document.
     * @param {boolean} exportToMultiplePage - Export the chart to multiple PDF pages.
     * @returns {void}
     */
    CircularChart3D.prototype.pdfExport = function (fileName, orientation, controls, width, height, isVertical, header, footer, exportToMultiplePage) {
        if (this.circularChartExport3DModule) {
            this.circularChartExport3DModule.pdfExport(fileName, orientation, controls, width, height, isVertical, header, footer, exportToMultiplePage);
        }
    };
    /**
     * Provides an array of modules needed for control rendering in the circular 3D chart.
     *
     * @returns {ModuleDeclaration[]} - An array of required modules.
     * @private
     */
    CircularChart3D.prototype.requiredModules = function () {
        var modules = [];
        modules.push({
            member: this.type + 'Series3D',
            args: [this]
        });
        if (this.legendSettings.visible) {
            modules.push({
                member: 'CircularChartLegend3D',
                args: [this]
            });
        }
        if (this.series[0].dataLabel.visible) {
            modules.push({
                member: 'CircularChartDataLabel3D',
                args: [this]
            });
        }
        if (this.tooltip.enable) {
            modules.push({
                member: 'CircularChartTooltip3D',
                args: [this]
            });
        }
        if (this.selectionMode !== 'None') {
            modules.push({
                member: 'CircularChartSelection3D',
                args: [this]
            });
        }
        if (this.highlightMode !== 'None' || this.legendSettings.enableHighlight) {
            modules.push({
                member: 'CircularChartHighlight3D',
                args: [this]
            });
        }
        if (this.enableExport) {
            modules.push({
                member: 'CircularChartExport3D',
                args: [this]
            });
        }
        return modules;
    };
    /**
     * Handles to set style for key event on the document.
     *
     * @param {target} target - element which currently focused.
     * @returns {void}
     * @private
     */
    CircularChart3D.prototype.setNavigationStyle = function (target) {
        var tabColor = '';
        switch (this.theme) {
            case 'HighContrastLight':
            case 'HighContrast':
                tabColor = '#969696';
                break;
            case 'MaterialDark':
            case 'FabricDark':
            case 'Bootstrap':
            case 'Bootstrap4':
                tabColor = '#66afe9';
                break;
            case 'Tailwind':
            case 'TailwindDark':
                tabColor = '#4f46e5';
                break;
            case 'Bootstrap5':
            case 'Bootstrap5Dark':
                tabColor = '#0d6efd';
                break;
            case 'Fluent':
            case 'FluentDark':
                tabColor = '#9e9e9e';
                break;
            case 'Fluent2':
            case 'Fluent2Dark':
            case 'Fluent2HighContrast':
                tabColor = '#0078D4';
                break;
            default:
                tabColor = '#9e9e9e';
                break;
        }
        var currentElement = document.getElementById(target);
        if (currentElement) {
            currentElement.style.setProperty('outline', "1.5px solid " + tabColor);
        }
    };
    /**
     * Handles to remove style for key event on the document.
     *
     * @returns {void}
     * @private
     */
    CircularChart3D.prototype.removeNavigationStyle = function () {
        var currentElement = document.querySelectorAll("path[id*=_Series_0_Point_], [id*=" + this.element.id + "], [id*=_ChartBorder], text[id*=_title],g[id*=_chart_legend]");
        if (currentElement) {
            currentElement.forEach(function (element) {
                if (element instanceof HTMLElement || element instanceof SVGElement) {
                    element.style.setProperty('outline', 'none');
                }
            });
        }
    };
    /**
     * Handles the keyboard onkeydown event in the circular 3D chart.
     *
     * @param {KeyboardEvent} e - The keydown event arguments.
     * @returns {boolean} - Returns `false`.
     * @private
     */
    CircularChart3D.prototype.circular3DChartKeyDown = function (e) {
        var actionKey = '';
        if (this.tooltip.enable && ((e.code === 'Tab' && this.previousTargetId.indexOf('series') > -1) || (this.previousTargetId.indexOf('legend') > -1) || e.code === 'Escape')) {
            actionKey = 'ESC';
        }
        if (e.code.indexOf('Arrow') > -1) {
            e.preventDefault();
        }
        if (e.ctrlKey && (e.key === 'p')) {
            e.preventDefault();
            actionKey = 'CtrlP';
        }
        if (actionKey !== '') {
            this.chartKeyboardNavigations(e, e.target.id, actionKey);
        }
        if (e.code === 'Tab') {
            this.removeNavigationStyle();
        }
        return false;
    };
    /**
     * Handles keyboard navigation for the chart based on the provided KeyboardEvent, targetId, and actionKey.
     *
     * @param {KeyboardEvent} e - The keyboard event object.
     * @param {string} targetId - The ID of the target element related to the keyboard action.
     * @param {string} actionKey - The key representing the type of action (e.g., 'Tab', 'ArrowMove').
     * @returns {void}
     */
    CircularChart3D.prototype.chartKeyboardNavigations = function (e, targetId, actionKey) {
        this.isLegendClicked = false;
        switch (actionKey) {
            case 'Tab':
            case 'ArrowMove':
                if (targetId.indexOf('-point-') > -1) {
                    var seriesIndex = 0;
                    var pointIndex = parseInt(targetId.split('point-')[1], 10);
                    var point = this.visibleSeries[0].points[pointIndex];
                    var center = point.symbolLocation.center;
                    var dradius = point.symbolLocation.radius * this.visibleSeries[0].coefficient;
                    var radius = dradius + (point.symbolLocation.radius - dradius) / 2;
                    this.mouseX = center.x + radius * Math.cos(point.symbolLocation.angle);
                    this.mouseY = center.y + radius * Math.sin(point.symbolLocation.angle);
                    if (this.circularChartHighlight3DModule) {
                        var targetElement = getElement(targetId);
                        if (!isNullOrUndefined(targetElement)) {
                            if (targetElement.id.indexOf('text') > 1) {
                                targetElement = getElement(targetElement.id.replace('text', 'shape'));
                            }
                            if (this.circularChartSelection3DModule) {
                                this.circularChartSelection3DModule.calculateSelectedElements(this, targetElement, 'mousemove');
                            }
                            else {
                                this.circularChartHighlight3DModule.calculateSelectedElements(this, targetElement, 'mousemove');
                            }
                        }
                    }
                    if (this.circularChartTooltip3DModule) {
                        var series = this.visibleSeries[seriesIndex];
                        var data = void 0;
                        if (series.enableTooltip) {
                            data = new CircularChart3DPointData(series.points[pointIndex], series);
                        }
                        this.circularChartTooltip3DModule.element = this.element;
                        this.circularChartTooltip3DModule.control = this;
                        this.circularChartTooltip3DModule.renderSeriesTooltip(this, data);
                    }
                }
                if (this.circularChartHighlight3DModule && this.highlightMode !== 'None') {
                    targetId = targetId.indexOf('_chart_legend_g_') > -1 ? document.getElementById(targetId).firstChild['id'] : targetId;
                    var legendID = this.element.id + '_chart_legend';
                    var legendItemsId = [legendID + '_text_', legendID + '_shape_marker_',
                        legendID + '_shape_'];
                    for (var i = 0; i < legendItemsId.length; i++) {
                        var id = legendItemsId[i];
                        if (targetId.indexOf(id) > -1) {
                            document.getElementById(targetId).setAttribute('class', '');
                            if (this.circularChartSelection3DModule) {
                                this.circularChartSelection3DModule.legendSelection(this, getElement(targetId), 'mousemove');
                            }
                            else {
                                this.circularChartHighlight3DModule.legendSelection(this, getElement(targetId), 'mousemove');
                            }
                            break;
                        }
                    }
                }
                break;
            case 'Enter':
            case 'Space':
                if (targetId.indexOf('_chart_legend_') > -1 && this.circularChartLegend3DModule) {
                    this.isLegendClicked = true;
                    this.circularChartLegend3DModule.click(e);
                    this.focusChild(document.getElementById(targetId).parentElement);
                    this.setNavigationStyle(document.getElementById(targetId).parentElement.id);
                }
                else {
                    if (this.circularChartSelection3DModule) {
                        this.circularChartSelection3DModule.calculateSelectedElements(this, document.getElementById(targetId), 'click');
                    }
                    this.setNavigationStyle(targetId);
                }
                break;
            case 'CtrlP':
                this.print();
                break;
            case 'ESC':
                if (this.circularChartTooltip3DModule) {
                    this.circularChartTooltip3DModule.removeTooltip(1);
                }
                if (this.circularChartSelection3DModule) {
                    this.circularChartSelection3DModule.calculateSelectedElements(this, document.getElementById(this.element.id + '-border'), 'mousemove');
                }
                else if (this.circularChartHighlight3DModule && this.highlightMode !== 'None') {
                    this.circularChartHighlight3DModule.calculateSelectedElements(this, document.getElementById(this.element.id + '-border'), 'mousemove');
                }
                break;
        }
    };
    /**
     * Sets the tabindex attribute of the provided HTML element to '0'.
     *
     * @param {HTMLElement} element - The HTML element to be focused.
     * @returns {string} - The updated class attribute of the focused element.
     */
    CircularChart3D.prototype.focusChild = function (element) {
        element.setAttribute('tabindex', '0');
        var className = element.getAttribute('class');
        element.setAttribute('tabindex', '0');
        if (className && className.indexOf('e-circular3dchart-focused') === -1) {
            className = 'e-circular3dchart-focused ' + className;
        }
        else if (!className) {
            className = 'e-circular3dchart-focused';
        }
        element.setAttribute('class', className);
        element.focus();
        return element.id;
    };
    /**
     * Handles the keyboard onkeyup event in the circular 3D chart.
     *
     * @param {KeyboardEvent} e - The keyup event arguments.
     * @returns {boolean} - Returns `false`.
     * @private
     */
    CircularChart3D.prototype.circular3DChartKeyUp = function (e) {
        var actionKey = '';
        var targetId = e.target['id'];
        var legendElement = getElement(this.element.id + '_chart_legend_translate_g');
        var pagingElement = getElement(this.element.id + '_chart_legend_pageup');
        if (legendElement) {
            var firstChild = legendElement.firstElementChild;
            var className = firstChild.getAttribute('class');
            if (className && className.indexOf('e-circular3dchart-focused') === -1) {
                className = className + ' e-circular3dchart-focused';
            }
            else if (!className) {
                className = 'e-circular3dchart-focused';
            }
            firstChild.setAttribute('class', className);
        }
        if (pagingElement) {
            pagingElement.setAttribute('class', 'e-circular3dchart-focused');
        }
        this.removeNavigationStyle();
        if (e.code === 'Tab') {
            if (this.previousTargetId !== '') {
                if (this.previousTargetId.indexOf('-point-') > -1 && targetId.indexOf('-point-') === -1) {
                    // const groupElement: HTMLElement = document.getElementById(this.previousTargetId).parentElement;
                    // this.setTabIndex(groupElement.children[this.currentPointIndex] as HTMLElement,
                    //                  groupElement.firstElementChild as HTMLElement);
                    this.currentPointIndex = 0;
                }
                else if (this.previousTargetId.indexOf('_chart_legend_page') > -1 && targetId.indexOf('_chart_legend_page') === -1 &&
                    targetId.indexOf('_chart_legend_g_') === -1) {
                    this.setTabIndex(e.target, pagingElement);
                }
                else if (this.previousTargetId.indexOf('_chart_legend_g_') > -1 && targetId.indexOf('chart_legend_g_') === -1) {
                    this.setTabIndex(legendElement.children[this.currentLegendIndex], legendElement.firstElementChild);
                }
                else if (this.previousTargetId.indexOf('-title') > -1 && targetId.indexOf('-point-') > -1) {
                    this.currentPointIndex = parseInt(targetId.split('point-')[1], 10);
                }
            }
            this.previousTargetId = targetId;
            if (targetId.indexOf('_chart_legend_g_') > -1 && this.highlightMode !== 'None') {
                targetId = e.target['lastElementChild'].id;
                actionKey = 'Tab';
            }
            else if (targetId.indexOf('-point-') > -1 && (this.highlightMode !== 'None' || this.tooltip.enable)) {
                actionKey = 'Tab';
            }
        }
        else if (e.code.indexOf('Arrow') > -1) {
            e.preventDefault();
            if (targetId.indexOf('_chart_legend_page') > -1) {
                e.target.removeAttribute('tabindex');
                this.previousTargetId = targetId = this.element.id + '_chart_legend_page' + (e.code === 'ArrowRight' ? 'up' : 'down');
                this.focusTarget(getElement(targetId));
            }
            else if ((targetId.indexOf('_chart_legend_') > -1)) {
                e.target.removeAttribute('tabindex');
                this.currentLegendIndex += (e.code === 'ArrowUp' || e.code === 'ArrowRight') ? +1 : -1;
                this.currentLegendIndex = this.getActualIndex(this.currentLegendIndex, legendElement.children.length);
                var currentLegend = legendElement.children[this.currentLegendIndex];
                this.focusTarget(currentLegend);
                this.removeNavigationStyle();
                this.setNavigationStyle(currentLegend.id);
                this.previousTargetId = targetId = currentLegend.lastElementChild.id;
                actionKey = this.highlightMode !== 'None' ? 'ArrowMove' : '';
            }
            else if (targetId.indexOf('-point-') > -1) {
                e.target.setAttribute('tabindex', '-1');
                var totalLength = 0;
                var seriesIndexes = [];
                for (var i = 0; i < this.visibleSeries[0].points.length; i++) {
                    var point = this.visibleSeries[0].points[i];
                    totalLength = point.visible ? totalLength + 1 : totalLength;
                    if (this.visibleSeries[0].points[i].visible) {
                        seriesIndexes.push(this.visibleSeries[0].points[i].index);
                    }
                }
                this.currentPointIndex = seriesIndexes.indexOf(this.currentPointIndex) + ((e.code === 'ArrowUp' || e.code === 'ArrowRight') ? 1 : -1);
                this.currentPointIndex = seriesIndexes[this.getActualIndex(this.currentPointIndex, seriesIndexes.length)];
                var elements = document.querySelectorAll("[id*=\"region-series-0-point-" + this.currentPointIndex + "\"]");
                var element = void 0;
                if (elements.length > 0) {
                    element = elements[elements.length - 1];
                }
                targetId = element ? element.id : '';
                this.focusTarget(getElement(targetId));
                this.removeNavigationStyle();
                this.setNavigationStyle(targetId);
                actionKey = this.tooltip.enable || this.circularChartHighlight3DModule ? 'ArrowMove' : '';
            }
        }
        else if ((e.code === 'Enter' || e.code === 'Space') && ((targetId.indexOf('_chart_legend_') > -1) ||
            (targetId.indexOf('-point-') > -1))) {
            targetId = (targetId.indexOf('_chart_legend_g') > -1) ? e.target['lastElementChild'].id : targetId;
            actionKey = 'Enter';
        }
        if (actionKey !== '') {
            this.chartKeyboardNavigations(e, targetId, actionKey);
        }
        if (e.code === 'Tab') {
            this.setNavigationStyle(targetId);
        }
        return false;
    };
    /**
     * Calculates the actual index based on the specified index and total length.
     *
     * @param {number} index - The index to be adjusted.
     * @param {number} totalLength - The total length of the collection or array.
     * @returns {number} - The actual index after adjustment.
     */
    CircularChart3D.prototype.getActualIndex = function (index, totalLength) {
        return index > totalLength - 1 ? 0 : (index < 0 ? totalLength - 1 : index);
    };
    /**
     * Focuses the specified HTML element by setting its tabindex attribute to '0'.
     *
     * @param {HTMLElement} element - The HTML element to be focused.
     * @returns {string} - The updated class attribute of the focused element.
     */
    CircularChart3D.prototype.focusTarget = function (element) {
        var className = element.getAttribute('class');
        element.setAttribute('tabindex', '0');
        if (className && className.indexOf('e-circular3dchart-focused') === -1) {
            className = className + ' e-circular3dchart-focused';
        }
        else if (!className) {
            className = 'e-circular3dchart-focused';
        }
        element.setAttribute('tabindex', '0');
        element.setAttribute('class', className);
        element.focus();
        return element.id;
    };
    /**
     * Sets the tabIndex property on the provided currentElement.
     *
     * @param {HTMLElement} previousElement - The previously focused HTML element.
     * @param {HTMLElement} currentElement - The currently focused HTML element.
     * @returns {void}
     */
    CircularChart3D.prototype.setTabIndex = function (previousElement, currentElement) {
        if (previousElement) {
            previousElement.removeAttribute('tabindex');
        }
        if (currentElement) {
            currentElement.setAttribute('tabindex', '0');
        }
    };
    /**
     * Gets the properties to be maintained in the persisted state.
     *
     * @private
     * @returns {string} - A string representing the persisted data.
     */
    CircularChart3D.prototype.getPersistData = function () {
        return '';
    };
    /**
     * Gets the module name for the circular 3D chart.
     *
     *  @private
     * @returns {string} - The circular 3D chart module name.
     */
    CircularChart3D.prototype.getModuleName = function () {
        return 'circularchart3d';
    };
    /**
     * Destroys the circular 3D chart instance.
     *
     * @private
     * @returns {void}
     */
    CircularChart3D.prototype.destroy = function () {
        if (this.element) {
            this.unWireEvents();
            this.circular3DPolygon = [];
            this.visibleSeries[0].segments = [];
            _super.prototype.destroy.call(this);
            this.element.classList.remove('e-circular3dchart');
            this.element.classList.remove('e-circular3dchart-focused');
            var element = document.getElementById(this.element.id + 'Keyboard_circular3dchart_focus');
            if (element) {
                element.remove();
            }
            var highlightElement = document.getElementById(this.element.id + '_ej2_chart_highlight');
            if (highlightElement) {
                highlightElement.remove();
            }
            var selectionElement = document.getElementById(this.element.id + '_ej2_chart_selection');
            if (selectionElement) {
                selectionElement.remove();
            }
            removeElement('chartmeasuretext');
            this.removeSvg();
            this.svgObject = null;
        }
    };
    /**
     * Handles the resize of the circular 3D chart.
     *
     * @returns {boolean} - Returns `true` to indicate the resize method of the circular 3D chart.
     * @private
     */
    CircularChart3D.prototype.chartResize = function () {
        var _this = this;
        this.animateSeries = false;
        var args = {
            previousSize: new Size(this.availableSize.width, this.availableSize.height),
            currentSize: new Size(0, 0),
            chart: this
        };
        var beforeResizeArgs = { cancel: false };
        if (this.resizeTo) {
            clearTimeout(this.resizeTo);
        }
        this.trigger(beforeResize, beforeResizeArgs);
        if (!beforeResizeArgs.cancel) {
            this.resizeTo = +setTimeout(function () {
                if (_this.isDestroyed) {
                    clearTimeout(_this.resizeTo);
                    return;
                }
                calculateSize(_this);
                args.currentSize = _this.availableSize;
                _this.trigger(resized, args);
                _this.refreshChart();
            }, 500);
        }
        return false;
    };
    /**
     * Retrieves the visible circular 3D chart series based on the specified index.
     *
     * @param {CircularChart3DSeries[]} visibleSeries - An array of visible circular 3D chart series.
     * @param {number} index - The index of the desired series.
     * @returns {CircularChart3DSeries} - The CircularChart3D series corresponding to the provided index.
     */
    CircularChart3D.prototype.changeVisibleSeries = function (visibleSeries, index) {
        for (var _i = 0, visibleSeries_1 = visibleSeries; _i < visibleSeries_1.length; _i++) {
            var series = visibleSeries_1[_i];
            if (index === series.index) {
                return series;
            }
        }
        return null;
    };
    /**
     * Removes elements with IDs containing the substring "region-series-".
     *
     * @param {CircularChart3D} chart - The instance of the circular 3D chart.
     * @returns {void}
     * @private
     */
    CircularChart3D.prototype.removeSeriesElements = function (chart) {
        document.querySelectorAll('[id*="region-series-"]').forEach(function (element) {
            if (element.parentElement.id === chart.groupElement.id) {
                return element.remove();
            }
        });
        document.querySelectorAll('[id*="data-label-text-"]').forEach(function (element) {
            if (element.parentElement.id === chart.groupElement.id) {
                return element.remove();
            }
        });
        document.querySelectorAll('[id*="data-label-series-0-shape-"]').forEach(function (element) {
            if (element.parentElement.id === chart.groupElement.id) {
                return element.remove();
            }
        });
        document.querySelectorAll('[id*="datalabel-series-0-connector-"]').forEach(function (element) {
            if (element.parentElement.id === chart.groupElement.id) {
                return element.remove();
            }
        });
    };
    /**
     * Called internally when any property value changes in the circular 3D chart.
     *
     * @private
     * @param {CircularChart3DModel} newProp - Specifies the new properties of the circular 3D chart.
     * @param {CircularChart3DModel} oldProp - Specifies the old properties of the circular 3D chart.
     */
    // tslint:disable-next-line:max-func-body-length
    CircularChart3D.prototype.onPropertyChanged = function (newProp, oldProp) {
        var update = {
            refreshElements: false, refreshBounds: false
        };
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'theme':
                    this.animateSeries = true;
                    break;
                case 'title':
                case 'subTitle':
                case 'height':
                case 'width':
                case 'margin':
                case 'enableRotation':
                case 'depth':
                    update.refreshBounds = true;
                    break;
                case 'tilt':
                case 'rotation':
                    if (!this.rotateActivate) {
                        update.refreshBounds = true;
                        this.animateSeries = false;
                    }
                    break;
                case 'titleStyle':
                    if (newProp.titleStyle && (newProp.titleStyle.size || newProp.titleStyle.textOverflow)) {
                        update.refreshBounds = true;
                    }
                    else {
                        update.refreshElements = true;
                    }
                    break;
                case 'subTitleStyle':
                    if (newProp.subTitleStyle && (newProp.subTitleStyle.size || newProp.subTitleStyle.textOverflow)) {
                        update.refreshBounds = true;
                    }
                    else {
                        update.refreshElements = true;
                    }
                    break;
                case 'legendSettings':
                    update.refreshBounds = true;
                    update.refreshElements = true;
                    break;
                case 'dataSource':
                    this.processData(false);
                    update.refreshBounds = true;
                    break;
                case 'series':
                    if (!this.delayRedraw) {
                        var seriesRefresh = false;
                        var series = void 0;
                        var seriesRender = void 0;
                        for (var i = 0; i < this.series.length; i++) {
                            series = newProp.series[i];
                            if ((series.explodeOffset ||
                                series.radius || series.innerRadius || series.emptyPointSettings)) {
                                seriesRender = true;
                            }
                            if (newProp.series[i] && (newProp.series[i].dataSource || newProp.series[i].yName
                                || newProp.series[i].xName ||
                                newProp.series[i].dataLabel || seriesRender)) {
                                extend(this.changeVisibleSeries(this.visibleSeries, i), series, null, true);
                                seriesRefresh = true;
                            }
                            if (newProp.series[i] && !isNullOrUndefined(newProp.series[i].explodeIndex) &&
                                newProp.series[i].explodeIndex >= 0
                                && newProp.series[i].explodeIndex !== oldProp.series[i].explodeIndex) {
                                seriesRefresh = true;
                                this.removeSeriesElements(this);
                            }
                        }
                        if (seriesRefresh) {
                            this.processData(false);
                            update.refreshBounds = true;
                        }
                    }
                    this.delayRedraw = false;
                    this.redraw = false;
                    break;
                case 'enableRtl':
                case 'locale':
                    if (this.circularChartHighlight3DModule) {
                        removeElement(this.circularChartHighlight3DModule.styleId);
                    }
                    if (this.circularChartSelection3DModule) {
                        removeElement(this.circularChartSelection3DModule.styleId);
                    }
                    _super.prototype.refresh.call(this);
                    break;
                case 'background':
                case 'border':
                    update.refreshElements = true;
                    break;
                case 'isMultiSelect':
                case 'selectedDataIndexes':
                case 'selectionMode':
                    if (this.circularChartSelection3DModule) {
                        if (isNullOrUndefined(this.circularChartSelection3DModule.selectedDataIndexes)) {
                            this.circularChartSelection3DModule.invokeSelection(this);
                        }
                        else {
                            this.circularChartSelection3DModule.selectedDataIndexes = this.selectedDataIndexes;
                            this.circularChartSelection3DModule.redrawSelection(this);
                        }
                    }
                    break;
                case 'tooltip':
                    if (this.circularChartTooltip3DModule) {
                        this.circularChartTooltip3DModule.previousPoints = [];
                        if (this.tooltip.template) {
                            this.circularChartTooltip3DModule.template = this.tooltip.template;
                        }
                    }
                    break;
            }
            if (!update.refreshBounds && update.refreshElements) {
                this.removeSeriesElements(this);
                this.createPieSvg();
                this.circular3DPolygon = [];
                this.visibleSeries[0].segments = [];
                this.renderElements();
            }
            else if (update.refreshBounds) {
                this.removeSeriesElements(this);
                this.createPieSvg();
                this.circular3DPolygon = [];
                this.visibleSeries[0].segments = [];
                this.calculateBounds();
                this.renderElements();
            }
        }
    };
    __decorate([
        Property(null)
    ], CircularChart3D.prototype, "width", void 0);
    __decorate([
        Property(null)
    ], CircularChart3D.prototype, "height", void 0);
    __decorate([
        Property(null)
    ], CircularChart3D.prototype, "title", void 0);
    __decorate([
        Property(null)
    ], CircularChart3D.prototype, "backgroundImage", void 0);
    __decorate([
        Property('')
    ], CircularChart3D.prototype, "dataSource", void 0);
    __decorate([
        Complex({ fontFamily: null, size: null, fontStyle: null, fontWeight: null, color: null }, Font)
    ], CircularChart3D.prototype, "titleStyle", void 0);
    __decorate([
        Property(null)
    ], CircularChart3D.prototype, "subTitle", void 0);
    __decorate([
        Complex({ fontFamily: null, size: null, fontStyle: null, fontWeight: null, color: null }, Font)
    ], CircularChart3D.prototype, "subTitleStyle", void 0);
    __decorate([
        Property('None')
    ], CircularChart3D.prototype, "selectionMode", void 0);
    __decorate([
        Property('None')
    ], CircularChart3D.prototype, "highlightMode", void 0);
    __decorate([
        Collection([{}], CircularChart3DSeries)
    ], CircularChart3D.prototype, "series", void 0);
    __decorate([
        Complex({}, CircularChart3DLegendSettings)
    ], CircularChart3D.prototype, "legendSettings", void 0);
    __decorate([
        Property('')
    ], CircularChart3D.prototype, "highlightColor", void 0);
    __decorate([
        Property('None')
    ], CircularChart3D.prototype, "selectionPattern", void 0);
    __decorate([
        Property('None')
    ], CircularChart3D.prototype, "highlightPattern", void 0);
    __decorate([
        Property(false)
    ], CircularChart3D.prototype, "isMultiSelect", void 0);
    __decorate([
        Property(true)
    ], CircularChart3D.prototype, "enableAnimation", void 0);
    __decorate([
        Property('Material')
    ], CircularChart3D.prototype, "theme", void 0);
    __decorate([
        Collection([], Indexes)
    ], CircularChart3D.prototype, "selectedDataIndexes", void 0);
    __decorate([
        Complex({}, Margin)
    ], CircularChart3D.prototype, "margin", void 0);
    __decorate([
        Complex({ color: '#DDDDDD', width: 0 }, Border)
    ], CircularChart3D.prototype, "border", void 0);
    __decorate([
        Complex({}, CircularChart3DTooltipSettings)
    ], CircularChart3D.prototype, "tooltip", void 0);
    __decorate([
        Property(null)
    ], CircularChart3D.prototype, "background", void 0);
    __decorate([
        Property(false)
    ], CircularChart3D.prototype, "useGroupingSeparator", void 0);
    __decorate([
        Property(50)
    ], CircularChart3D.prototype, "depth", void 0);
    __decorate([
        Property(0)
    ], CircularChart3D.prototype, "tilt", void 0);
    __decorate([
        Property(false)
    ], CircularChart3D.prototype, "enableRotation", void 0);
    __decorate([
        Property(0)
    ], CircularChart3D.prototype, "rotation", void 0);
    __decorate([
        Property(false)
    ], CircularChart3D.prototype, "enableExport", void 0);
    __decorate([
        Event()
    ], CircularChart3D.prototype, "load", void 0);
    __decorate([
        Event()
    ], CircularChart3D.prototype, "loaded", void 0);
    __decorate([
        Event()
    ], CircularChart3D.prototype, "legendRender", void 0);
    __decorate([
        Event()
    ], CircularChart3D.prototype, "legendClick", void 0);
    __decorate([
        Event()
    ], CircularChart3D.prototype, "selectionComplete", void 0);
    __decorate([
        Event()
    ], CircularChart3D.prototype, "pointRender", void 0);
    __decorate([
        Event()
    ], CircularChart3D.prototype, "seriesRender", void 0);
    __decorate([
        Event()
    ], CircularChart3D.prototype, "textRender", void 0);
    __decorate([
        Event()
    ], CircularChart3D.prototype, "beforeExport", void 0);
    __decorate([
        Event()
    ], CircularChart3D.prototype, "afterExport", void 0);
    __decorate([
        Event()
    ], CircularChart3D.prototype, "beforePrint", void 0);
    __decorate([
        Event()
    ], CircularChart3D.prototype, "beforeResize", void 0);
    __decorate([
        Event()
    ], CircularChart3D.prototype, "resized", void 0);
    __decorate([
        Event()
    ], CircularChart3D.prototype, "circularChart3DMouseMove", void 0);
    __decorate([
        Event()
    ], CircularChart3D.prototype, "circularChart3DMouseClick", void 0);
    __decorate([
        Event()
    ], CircularChart3D.prototype, "circularChart3DMouseDown", void 0);
    __decorate([
        Event()
    ], CircularChart3D.prototype, "circularChart3DMouseLeave", void 0);
    __decorate([
        Event()
    ], CircularChart3D.prototype, "circularChart3DMouseUp", void 0);
    __decorate([
        Event()
    ], CircularChart3D.prototype, "pointClick", void 0);
    __decorate([
        Event()
    ], CircularChart3D.prototype, "pointMove", void 0);
    __decorate([
        Event()
    ], CircularChart3D.prototype, "tooltipRender", void 0);
    CircularChart3D = __decorate([
        NotifyPropertyChanges
    ], CircularChart3D);
    return CircularChart3D;
}(Component));
export { CircularChart3D };
