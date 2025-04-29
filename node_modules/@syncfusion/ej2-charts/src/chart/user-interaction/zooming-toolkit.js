import { EventHandler, isNullOrUndefined } from '@syncfusion/ej2-base';
import { remove } from '@syncfusion/ej2-base';
import { removeElement, RectOption, PolygonOption, createTooltip, minMax, getElement } from '../../common/utils/helper';
import { textElement } from '../../common/utils/helper';
import { PathOption, Rect, measureText, TextOption, SvgRenderer } from '@syncfusion/ej2-svg-base';
import { Zoom } from './zooming';
import { zoomComplete, onZooming } from '../../common/model/constants';
/**
 * The `Toolkit` class provides functionalities for zooming and panning in charts.
 *
 * @private
 */
var Toolkit = /** @class */ (function () {
    /**
     * Constructor for the chart touch module.
     *
     * @param {Chart} chart - Specifies the chart instance.
     */
    function Toolkit(chart) {
        this.iconRectOverFill = 'transparent';
        this.iconRectSelectionFill = 'transparent';
        /** @private */
        this.zoomCompleteEvtCollection = [];
        /** @private */
        this.isZoomed = false;
        this.chart = chart;
        this.elementId = chart.element.id;
        this.chart.svgRenderer = new SvgRenderer(this.elementId);
    }
    /**
     * Creates a pan button.
     *
     * @param {Element} childElement - Specifies the child element.
     * @param {Element} parentElement - Specifies the parent element.
     * @returns {void}
     */
    Toolkit.prototype.createPanButton = function (childElement, parentElement) {
        var render = this.chart.svgRenderer;
        var fillColor = this.chart.zoomModule.isPanning ? this.chart.themeStyle.toolkitSelectionColor :
            this.chart.themeStyle.toolkitFill;
        var direction = 'M5,3h2.3L7.275,5.875h1.4L8.65,3H11L8,0L5,3z M3,11V8.7l2.875,0.025v-1.4L3,7.35V5L0,8L3,';
        direction += '11z M11,13H8.7l0.025-2.875h-1.4L7.35,13H5l3,3L11,13z M13,5v2.3l-2.875-0.025v1.4L13,8.65V11l3-3L13,5z';
        //This is for setting low opacity to PAN Button
        this.elementOpacity = !this.chart.zoomModule.isZoomed && this.chart.zoomSettings.showToolbar ? '0.2' : '1';
        childElement.setAttribute('opacity', this.chart.theme === 'Fluent2HighContrast' ? '1' : this.elementOpacity);
        childElement.id = this.elementId + '_Zooming_Pan';
        childElement.setAttribute('role', this.chart.zoomSettings.accessibility.accessibilityRole ? this.chart.zoomSettings.accessibility.accessibilityRole : 'button');
        childElement.setAttribute('tabindex', this.chart.zoomSettings.accessibility.focusable ? String(this.chart.zoomSettings.accessibility.tabIndex) : '-1');
        childElement.setAttribute('aria-label', this.chart.zoomSettings.accessibility.accessibilityDescription ? this.chart.zoomSettings.accessibility.accessibilityDescription : this.chart.getLocalizedLabel('Pan'));
        this.panElements = childElement;
        childElement.appendChild(render.drawRectangle(new RectOption(this.elementId + '_Zooming_Pan_1', 'transparent', {}, 1, this.chart.themeStyle.toolkitIconRect, this.chart.theme.indexOf('Fluent2') > -1 || this.chart.theme.indexOf('Bootstrap5') > -1 ? 4 : 0, this.chart.theme.indexOf('Fluent2') > -1 || this.chart.theme.indexOf('Bootstrap5') > -1 ? 4 : 0)));
        childElement.appendChild(render.drawPath(new PathOption(this.elementId + '_Zooming_Pan_2', this.chart.theme === 'Fluent2HighContrast' && this.elementOpacity === '0.2' ? '#3FF23F' : fillColor, null, null, 1, null, direction)));
        parentElement.appendChild(childElement);
        this.wireEvents(childElement, this.pan);
    };
    /**
     * Creates a zoom button.
     *
     * @param {Element} childElement - The child element to create.
     * @param {Element} parentElement - The parent element to append the child element.
     * @returns {void}
     */
    Toolkit.prototype.createZoomButton = function (childElement, parentElement) {
        var render = this.chart.svgRenderer;
        //This is for selecting initial fill color to ZOOM button
        var fillColor = this.chart.zoomModule.isPanning || (!this.chart.zoomModule.isZoomed &&
            this.chart.zoomSettings.showToolbar) ? this.chart.themeStyle.toolkitFill : this.chart.themeStyle.toolkitSelectionColor;
        this.elementOpacity = !this.chart.zoomModule.isPanning && !this.chart.zoomModule.isZoomed && this.chart.zoomSettings.showToolbar ? '0.2' : '1';
        var rectColor = this.chart.zoomModule.isPanning ? 'transparent' : this.chart.themeStyle.toolkitIconRectSelectionFill;
        var direction = 'M0.001,14.629L1.372,16l4.571-4.571v-0.685l0.228-0.274c1.051,0.868,2.423,1.417,3.885,1.417c3.291,0,';
        direction += '5.943-2.651,5.943-5.943S13.395,0,10.103,0S4.16,2.651,4.16,5.943c0,1.508,0.503,2.834,1.417,3.885l-0.274,0.228H4.571';
        direction = direction + 'L0.001,14.629L0.001,14.629z M5.943,5.943c0-2.285,1.828-4.114,4.114-4.114s4.114,1.828,4.114,';
        childElement.id = this.elementId + '_Zooming_Zoom';
        childElement.setAttribute('role', this.chart.zoomSettings.accessibility.accessibilityRole ? this.chart.zoomSettings.accessibility.accessibilityRole : 'button');
        childElement.setAttribute('tabindex', this.chart.zoomSettings.accessibility.focusable ? String(this.chart.zoomSettings.accessibility.tabIndex) : '-1');
        childElement.setAttribute('aria-label', this.chart.zoomSettings.accessibility.accessibilityDescription ? this.chart.zoomSettings.accessibility.accessibilityDescription : this.chart.getLocalizedLabel('Zoom'));
        childElement.setAttribute('opacity', this.elementOpacity);
        this.zoomElements = childElement;
        this.selectedID = this.chart.zoomModule.isPanning ? this.chart.element.id + '_Zooming_Pan_1' : this.elementId + '_Zooming_Zoom_1';
        childElement.appendChild(render.drawRectangle(new RectOption(this.elementId + '_Zooming_Zoom_1', rectColor, {}, 1, this.chart.themeStyle.toolkitIconRect, this.chart.theme.indexOf('Fluent2') > -1 || this.chart.theme.indexOf('Bootstrap5') > -1 ? 4 : 0, this.chart.theme.indexOf('Fluent2') > -1 || this.chart.theme.indexOf('Bootstrap5') > -1 ? 4 : 0)));
        childElement.appendChild(render.drawPath(new PathOption(this.elementId + '_Zooming_Zoom_3', fillColor, null, null, 1, null, direction + '4.114s-1.828,4.114-4.114,4.114S5.943,8.229,5.943,5.943z')));
        parentElement.appendChild(childElement);
        this.wireEvents(childElement, this.zoom);
    };
    /**
     * Creates a zoom in button.
     *
     * @param {Element} childElement - The child element to create.
     * @param {Element} parentElement - The parent element to append the child element.
     * @param {Chart} chart - The chart instance.
     * @returns {void}
     */
    Toolkit.prototype.createZoomInButton = function (childElement, parentElement, chart) {
        var render = this.chart.svgRenderer;
        var fillColor = this.chart.themeStyle.toolkitFill;
        var direction = 'M10.103,0C6.812,0,4.16,2.651,4.16,5.943c0,1.509,0.503,2.834,1.417,3.885l-0.274,0.229H4.571L0,';
        direction += '14.628l0,0L1.372,16l4.571-4.572v-0.685l0.228-0.275c1.052,0.868,2.423,1.417,3.885,1.417c3.291,0,5.943-2.651,';
        direction += '5.943-5.943C16,2.651,13.395,0,10.103,0z M10.058,10.058c-2.286,0-4.114-1.828-4.114-4.114c0-2.286,1.828-4.114,';
        childElement.id = this.elementId + '_Zooming_ZoomIn';
        childElement.setAttribute('role', this.chart.zoomSettings.accessibility.accessibilityRole ? this.chart.zoomSettings.accessibility.accessibilityRole : 'button');
        childElement.setAttribute('tabindex', this.chart.zoomSettings.accessibility.focusable ? String(this.chart.zoomSettings.accessibility.tabIndex) : '-1');
        childElement.setAttribute('aria-label', this.chart.zoomSettings.accessibility.accessibilityDescription ? this.chart.zoomSettings.accessibility.accessibilityDescription : this.chart.getLocalizedLabel('ZoomIn'));
        var polygonDirection = '12.749,5.466 10.749,5.466 10.749,3.466 9.749,3.466 9.749,5.466 7.749,5.466 7.749,6.466';
        childElement.appendChild(render.drawRectangle(new RectOption(this.elementId + '_Zooming_ZoomIn_1', 'transparent', {}, 1, this.chart.themeStyle.toolkitIconRect, this.chart.theme.indexOf('Fluent2') > -1 ? 4 : this.chart.theme.indexOf('Bootstrap5') > -1 ? 2 : 0, this.chart.theme.indexOf('Fluent2') > -1 ? 4 : this.chart.theme.indexOf('Bootstrap5') > -1 ? 2 : 0)));
        childElement.appendChild(render.drawPath(new PathOption(this.elementId + '_Zooming_ZoomIn_2', fillColor, null, null, 1, null, direction + '4.114-4.114c2.286,0,4.114,1.828,4.114,4.114C14.172,8.229,12.344,10.058,10.058,10.058z')));
        childElement.appendChild(render.drawPolygon(new PolygonOption(this.elementId + '_Zooming_ZoomIn_3', polygonDirection + ' 9.749,6.466 9.749,8.466 10.749,8.466 10.749,6.466 12.749,6.466', fillColor)));
        this.zoomInElements = childElement;
        //This is for low opacity to ZOOM IN button
        this.elementOpacity = chart.zoomModule.isPanning || (!chart.zoomModule.isZoomed && !chart.zoomSettings.showToolbar && !this.enableZoomButton) ? '0.2' : '1';
        childElement.setAttribute('opacity', this.elementOpacity);
        parentElement.appendChild(childElement);
        this.wireEvents(childElement, this.zoomIn);
    };
    /**
     * Creates a zoom out button.
     *
     * @param {Element} childElement - The child element to create.
     * @param {Element} parentElement - The parent element to append the child element.
     * @param {Chart} chart - The chart instance.
     * @returns {void}
     */
    Toolkit.prototype.createZoomOutButton = function (childElement, parentElement, chart) {
        var render = this.chart.svgRenderer;
        var fillColor = this.chart.themeStyle.toolkitFill;
        var direction = 'M0,14.622L1.378,16l4.533-4.533v-0.711l0.266-0.266c1.022,0.889,2.4,1.422,3.866,';
        direction += '1.422c3.289,0,5.955-2.666,5.955-5.955S13.333,0,10.044,0S4.089,2.667,4.134,5.911c0,1.466,0.533,2.844,';
        direction += '1.422,3.866l-0.266,0.266H4.578L0,14.622L0,14.622z M5.911,5.911c0-2.311,1.822-4.133,4.133-4.133s4.133,1.822,4.133,';
        childElement.id = this.elementId + '_Zooming_ZoomOut';
        childElement.setAttribute('role', this.chart.zoomSettings.accessibility.accessibilityRole ? this.chart.zoomSettings.accessibility.accessibilityRole : 'button');
        childElement.setAttribute('tabindex', this.chart.zoomSettings.accessibility.focusable ? String(this.chart.zoomSettings.accessibility.tabIndex) : '-1');
        childElement.setAttribute('aria-label', this.chart.zoomSettings.accessibility.accessibilityDescription ? this.chart.zoomSettings.accessibility.accessibilityDescription : this.chart.getLocalizedLabel('ZoomOut'));
        childElement.appendChild(render.drawRectangle(new RectOption(this.elementId + '_Zooming_ZoomOut_1', 'transparent', {}, 1, this.chart.themeStyle.toolkitIconRect, this.chart.theme.indexOf('Fluent2') > -1 || this.chart.theme.indexOf('Bootstrap5') > -1 ? 4 : 0, this.chart.theme.indexOf('Fluent2') > -1 || this.chart.theme.indexOf('Bootstrap5') > -1 ? 4 : 0)));
        childElement.appendChild(render.drawPath(new PathOption(this.elementId + '_Zooming_ZoomOut_2', (chart.theme === 'Fluent2HighContrast' && !chart.zoomModule.isZoomed) || (chart.theme === 'Fluent2HighContrast' && chart.zoomModule.isPanning) ? '#3FF23F' : fillColor, null, null, 1, null, direction + '4.133s-1.866,4.133-4.133,4.133S5.911,8.222,5.911,5.911z M12.567,6.466h-5v-1h5V6.466z')));
        this.zoomOutElements = childElement;
        //This is for low opacity of ZOOM OUT button
        this.elementOpacity = chart.zoomModule.isPanning || (!chart.zoomModule.isZoomed && chart.zoomSettings.showToolbar && !this.enableZoomButton) ? '0.2' : '1';
        childElement.setAttribute('opacity', chart.theme === 'Fluent2HighContrast' ? '1' : this.elementOpacity);
        parentElement.appendChild(childElement);
        this.wireEvents(childElement, this.zoomOut);
    };
    /**
     * Creates a reset button.
     *
     * @param {Element} childElement - The child element to create.
     * @param {Element} parentElement - The parent element to append the child element.
     * @param {Chart} chart - The chart instance.
     * @param {boolean} isDevice - Specifies whether the device is mobile or not.
     * @returns {void}
     */
    Toolkit.prototype.createResetButton = function (childElement, parentElement, chart, isDevice) {
        var render = this.chart.svgRenderer;
        var fillColor = this.chart.themeStyle.toolkitFill;
        var size;
        var direction = 'M12.364,8h-2.182l2.909,3.25L16,8h-2.182c0-3.575-2.618-6.5-5.818-6.5c-1.128,0-2.218,0.366-3.091,';
        direction += '1.016l1.055,1.178C6.581,3.328,7.272,3.125,8,3.125C10.4,3.125,12.363,5.319,12.364,8L12.364,8z M11.091,';
        direction += '13.484l-1.055-1.178C9.419,12.672,8.728,12.875,8,12.875c-2.4,0-4.364-2.194-4.364-4.875h2.182L2.909,4.75L0,8h2.182c0,';
        childElement.id = this.elementId + '_Zooming_Reset';
        childElement.setAttribute('role', this.chart.zoomSettings.accessibility.accessibilityRole ? this.chart.zoomSettings.accessibility.accessibilityRole : 'button');
        childElement.setAttribute('tabindex', this.chart.zoomSettings.accessibility.focusable ? String(this.chart.zoomSettings.accessibility.tabIndex) : '-1');
        childElement.setAttribute('aria-label', this.chart.zoomSettings.accessibility.accessibilityDescription ? this.chart.zoomSettings.accessibility.accessibilityDescription : this.chart.getLocalizedLabel('Reset'));
        //This is for low opacity to RESET button
        this.elementOpacity = !chart.zoomModule.isZoomed && chart.zoomSettings.showToolbar ? '0.2' : '1';
        childElement.setAttribute('opacity', chart.theme === 'Fluent2HighContrast' ? '1' : this.elementOpacity);
        if (!isDevice) {
            childElement.appendChild(render.drawRectangle(new RectOption(this.elementId + '_Zooming_Reset_1', 'transparent', {}, 1, this.chart.themeStyle.toolkitIconRect, this.chart.theme.indexOf('Fluent2') > -1 || this.chart.theme.indexOf('Bootstrap5') > -1 ? 4 : 0, this.chart.theme.indexOf('Fluent2') > -1 || this.chart.theme.indexOf('Bootstrap5') > -1 ? 4 : 0)));
            childElement.appendChild(render.drawPath(new PathOption(this.elementId + '_Zooming_Reset_2', chart.theme === 'Fluent2HighContrast' && this.elementOpacity === '0.2' ? '#3FF23F' : fillColor, null, null, 1, null, direction + '3.575,2.618,6.5,5.818,6.5C9.128,14.5,10.219,14.134,11.091,13.484L11.091,13.484z')));
        }
        else {
            size = measureText(this.chart.getLocalizedLabel('ResetZoom'), { size: '12px' }, { size: '12px', fontStyle: 'Normal', fontWeight: '400', fontFamily: 'Segoe UI' });
            childElement.appendChild(render.drawRectangle(new RectOption(this.elementId + '_Zooming_Reset_1', 'transparent', {}, 1, new Rect(0, 0, size.width, size.height))));
            textElement(chart.renderer, new TextOption(this.elementId + '_Zooming_Reset_2', 0 + size.width / 2, 0 + size.height * 3 / 4, 'middle', this.chart.getLocalizedLabel('ResetZoom'), 'rotate(0,' + (0) + ',' + (0) + ')', 'auto'), { size: '12px' }, this.chart.theme === 'Material3Dark' || this.chart.theme === 'Fluent2Dark' || this.chart.theme === 'Fluent2HighContrast' ? 'White' : 'black', childElement, null, null, null, null, null, null, null, null, chart.enableCanvas, null, { size: '12px', fontStyle: 'Normal', fontWeight: '400', fontFamily: 'Segoe UI' });
        }
        parentElement.appendChild(childElement);
        this.wireEvents(childElement, this.reset);
    };
    /**
     * Wires events to the specified element.
     *
     * @param {Element} element - The element to wire the events to.
     * @param {Function} process - The function to be executed when the event occurs.
     * @returns {void}
     */
    Toolkit.prototype.wireEvents = function (element, process) {
        EventHandler.add(element, 'mousedown touchstart', process, this);
        EventHandler.add(element, 'mouseover', this.showTooltip, this);
        EventHandler.add(element, 'mouseout', this.removeTooltip, this);
        EventHandler.add(this.chart.element, 'mousemove', this.mouseMoveHandler, this);
        EventHandler.add(this.chart.zoomModule.toolkitElements, 'mousedown', this.mouseDownHandler, this);
        window.addEventListener('mouseup', this.mouseUpHandler.bind(this), true);
    };
    /**
     * Handles the mouse move event on the chart.
     *
     * @param {PointerEvent | TouchEvent} e - The mouse move event or touch event.
     * @returns {void}
     * @private
     */
    Toolkit.prototype.mouseMoveHandler = function (e) {
        if (this.chart.zoomSettings.toolbarPosition.draggable) {
            if (this.isDragging) {
                this.performDragAndDrop(e);
            }
            else {
                this.chart.zoomModule.toolkitElements.setAttribute('cursor', e.target.id.indexOf('Zooming_Rect') > -1 ? 'grab' : 'none');
            }
        }
    };
    /**
     * Handles the mouse down event on the toolkit.
     *
     * @param {PointerEvent} e - The mouse down event.
     * @returns {void}
     * @private
     */
    Toolkit.prototype.mouseDownHandler = function (e) {
        if (this.chart.zoomSettings.toolbarPosition.draggable && !this.isDragging && e.target.
            id.indexOf('Zooming_Rect') > -1) {
            this.isDragging = true;
            this.chart.zoomModule.toolkitElements.setAttribute('cursor', 'grabbing');
        }
    };
    /**
     * Handles the mouse up event on the window.
     *
     * @param {PointerEvent} e - The mouse up event.
     * @returns {void}
     * @private
     */
    Toolkit.prototype.mouseUpHandler = function (e) {
        if (this.isDragging) {
            this.isDragging = false;
            this.chart.zoomModule.toolkitElements.setAttribute('cursor', e.target.id.indexOf('Zooming_Rect') > -1 ? 'grab' : 'none');
        }
    };
    /**
     * Handles the drag-and-drop functionality for the toolkit.
     *
     * @param {PointerEvent | TouchEvent} e - The event triggered by the pointer or touch action.
     * @returns {void}
     * @private
     */
    Toolkit.prototype.performDragAndDrop = function (e) {
        var elementWidth = this.chart.zoomModule.toolkitElements.getBoundingClientRect().width;
        var elementHeight = this.chart.zoomModule.toolkitElements.getBoundingClientRect().height;
        // Padding to apply when the toolkit is positioned at the chart area border
        var toolkitShadowPadding = 2;
        var x = e.type.indexOf('touch') > -1 ? e.changedTouches[0].clientX : this.chart.mouseX;
        var y = e.type.indexOf('touch') > -1 ? e.changedTouches[0].clientY : this.chart.mouseY;
        var transX = Math.max(this.chart.border.width + toolkitShadowPadding, Math.min(x - elementWidth / 2, this.chart.availableSize.width - elementWidth - this.chart.border.width - toolkitShadowPadding));
        var transY = Math.max(this.chart.border.width + toolkitShadowPadding, Math.min(y - elementHeight / 2, this.chart.availableSize.height - elementHeight - this.chart.border.width - toolkitShadowPadding));
        if (x < this.chart.availableSize.width && y < this.chart.availableSize.height) {
            this.chart.zoomModule.toolkitElements.setAttribute('transform', 'translate(' + transX + ',' + transY + ')');
            this.dragHorizontalRatio = transX / this.chart.availableSize.width;
            this.dragVerticalRatio = transY / this.chart.availableSize.height;
        }
    };
    /**
     * Displays the tooltip on mouse event.
     *
     * @param {MouseEvent} event - The mouse event.
     * @returns {void}
     */
    Toolkit.prototype.showTooltip = function (event) {
        var text = event.currentTarget.id.split('_Zooming_')[1];
        var left = (event.pageX - (measureText(text, { size: '10px' }, { size: '10px', fontStyle: 'Normal', fontWeight: '400', fontFamily: 'Segoe UI' }).width + 5));
        var rect = getElement(event.currentTarget.id + '_1');
        var icon2 = getElement(event.currentTarget.id + '_2');
        var icon3 = getElement(event.currentTarget.id + '_3');
        if (event.currentTarget.getAttribute('opacity') === '1') {
            event.currentTarget.setAttribute('cursor', 'pointer');
        }
        else {
            event.currentTarget.setAttribute('cursor', 'auto');
        }
        if (rect) {
            this.hoveredID = rect.id;
            rect.setAttribute('fill', this.chart.theme === 'Fluent2HighContrast' && event.currentTarget.childNodes[1].getAttribute('fill') === '#3FF23F' ? 'transparent' : this.chart.themeStyle.toolkitIconRectOverFill);
        }
        if (icon2) {
            icon2.setAttribute('fill', this.chart.theme === 'Fluent2HighContrast' && event.currentTarget.childNodes[1].getAttribute('fill') === '#3FF23F' ? '#3FF23F' : this.chart.themeStyle.toolkitSelectionColor);
        }
        if (icon3) {
            icon3.setAttribute('fill', this.chart.theme === 'Fluent2HighContrast' && event.currentTarget.childNodes[1].getAttribute('fill') === '#3FF23F' ? '#3FF23F' : this.chart.themeStyle.toolkitSelectionColor);
        }
        if (!this.chart.isTouch && !this.isDragging) {
            createTooltip('EJ2_Chart_ZoomTip', this.chart.getLocalizedLabel(text), (event.pageY + 10), left, '10px');
        }
    };
    /**
     * Removes the tooltip.
     *
     * @returns {void}
     */
    Toolkit.prototype.removeTooltip = function () {
        if (this.hoveredID && getElement(this.hoveredID)) {
            var rectColor = this.chart.zoomModule.isPanning ? (this.hoveredID.indexOf('_Pan_') > -1) ? this.chart.themeStyle.toolkitIconRectSelectionFill : 'transparent' : (this.hoveredID.indexOf('_Zoom_') > -1) && (this.elementOpacity !== '0.2' && this.chart.theme !== 'Fluent2HighContrast') ? this.chart.themeStyle.toolkitIconRectSelectionFill : 'transparent';
            getElement(this.hoveredID).setAttribute('fill', rectColor);
        }
        var icon2 = this.hoveredID ? getElement(this.hoveredID.replace('_1', '_2')) : null;
        var icon3 = this.hoveredID ? getElement(this.hoveredID.replace('_1', '_3')) : null;
        if (icon2) {
            var iconColor = this.chart.zoomModule.isPanning ? (this.hoveredID.indexOf('_Pan_') > -1) ? this.chart.themeStyle.toolkitSelectionColor : this.elementOpacity === '0.2' && this.chart.theme === 'Fluent2HighContrast' && getElement(this.hoveredID).nextElementSibling.getAttribute('fill') === '#3FF23F' ? '#3FF23F' : this.elementOpacity === '1' && this.chart.theme === 'Tailwind3' ? '#212529' : this.chart.themeStyle.toolkitFill : (this.hoveredID.indexOf('_Zoom_') > -1) ? this.chart.themeStyle.toolkitSelectionColor : this.chart.theme === 'Fluent2HighContrast' && getElement(this.hoveredID).nextElementSibling.getAttribute('fill') === '#3FF23F' ? '#3FF23F' : (this.chart.theme === 'Tailwind3Dark' && this.chart.zoomModule.isDevice) ? 'black' : this.chart.themeStyle.toolkitFill;
            icon2.setAttribute('fill', iconColor);
        }
        if (icon3) {
            //This is used for change color while hover on ZOOM button
            var iconColor = this.chart.zoomModule.isPanning || (!this.chart.isZoomed && this.chart.zoomSettings.showToolbar) ? this.chart.theme === 'Fluent2HighContrast' && getElement(this.hoveredID).nextElementSibling.getAttribute('fill') === '#3FF23F' && this.elementOpacity === '1' ? '#3FF23F' : this.elementOpacity === '1' && this.chart.theme === 'Tailwind3' ? '#212529' : this.chart.themeStyle.toolkitFill : (this.hoveredID.indexOf('_Zoom_') > -1) ? this.chart.themeStyle.toolkitSelectionColor : this.chart.theme === 'Fluent2HighContrast' && getElement(this.hoveredID).nextElementSibling.getAttribute('fill') === '#3FF23F' ? '#3FF23F' : this.chart.themeStyle.toolkitFill;
            icon3.setAttribute('fill', iconColor);
        }
        removeElement('EJ2_Chart_ZoomTip');
    };
    // Toolkit events function calculation here.
    /**
     * Resets the chart.
     *
     * @param {PointerEvent | TouchEvent | KeyboardEvent} event - The event object.
     * @returns {boolean} - Returns false.
     */
    Toolkit.prototype.reset = function (event) {
        var _this = this;
        if (!this.chart.zoomModule.isZoomed) {
            return false;
        }
        var chart = this.chart;
        this.enableZoomButton = false;
        chart.redraw = chart.enableCanvas ? chart.redraw : chart.zoomSettings.enableAnimation;
        if (!chart.zoomModule.isDevice) {
            remove(chart.zoomModule.toolkitElements);
        }
        else if (event.type === 'touchstart') {
            event.stopPropagation();
        }
        var argsData;
        this.removeTooltip();
        chart.svgObject.setAttribute('cursor', 'auto');
        var zoomedAxisCollection = [];
        this.zoomCompleteEvtCollection = [];
        for (var _i = 0, _a = chart.axisCollections; _i < _a.length; _i++) {
            var axis = _a[_i];
            argsData = {
                cancel: false, name: zoomComplete, axis: axis, previousZoomFactor: axis.zoomFactor,
                previousZoomPosition: axis.zoomPosition, currentZoomFactor: 1, currentZoomPosition: 0,
                previousVisibleRange: axis.visibleRange, currentVisibleRange: null
            };
            axis.zoomFactor = 1;
            axis.zoomPosition = 0;
            if (axis.zoomingScrollBar) {
                axis.zoomingScrollBar.isScrollUI = false;
            }
            if (!argsData.cancel) {
                axis.zoomFactor = argsData.currentZoomFactor;
                axis.zoomPosition = argsData.currentZoomPosition;
                this.zoomCompleteEvtCollection.push(argsData);
            }
            zoomedAxisCollection.push({
                zoomFactor: axis.zoomFactor, zoomPosition: axis.zoomFactor, axisName: axis.name,
                axisRange: axis.visibleRange
            });
            if (chart.zoomModule.isDevice && !this.chart.isBlazor) {
                chart.trigger(zoomComplete, argsData);
            }
        }
        var zoomingEventArgs = { cancel: false, axisCollection: zoomedAxisCollection, name: onZooming };
        if (!zoomingEventArgs.cancel && this.chart.isBlazor) {
            this.chart.trigger(onZooming, zoomingEventArgs, function () {
                _this.setDefferedZoom(chart);
            });
            return false;
        }
        else {
            return (this.setDefferedZoom(chart));
        }
    };
    Toolkit.prototype.setDefferedZoom = function (chart) {
        chart.disableTrackTooltip = false;
        var chartDuration = chart.duration;
        chart.duration = 600;
        chart.zoomModule.isZoomed = chart.zoomModule.isPanning = chart.isChartDrag = chart.delayRedraw = false;
        chart.zoomModule.touchMoveList = chart.zoomModule.touchStartList = [];
        chart.zoomModule.pinchTarget = null;
        chart.zoomRedraw = chart.zoomSettings.enableAnimation;
        if (chart.redraw) {
            var zoomToolBar = getElement(chart.element.id + '_Zooming_KitCollection');
            if (zoomToolBar) {
                zoomToolBar.remove();
            }
            if (chart.tooltipModule) {
                if (getElement(chart.element.id + '_tooltip')) {
                    getElement(chart.element.id + '_tooltip').remove();
                }
                for (var _i = 0, _a = chart.visibleSeries; _i < _a.length; _i++) {
                    var series = _a[_i];
                    if (!isNullOrUndefined(series) && (series.marker.visible || chart.tooltip.shared || series.type === 'Scatter' || series.type === 'Bubble')) {
                        chart.markerRender.removeHighlightedMarker(series, null, true);
                    }
                }
            }
        }
        else {
            chart.removeSvg();
        }
        chart.refreshAxis();
        chart.refreshBound();
        this.elementOpacity = '1';
        chart.duration = chartDuration;
        chart.redraw = false;
        return false;
    };
    Toolkit.prototype.zoomIn = function () {
        this.zoomInOutCalculation(1, this.chart, this.chart.axisCollections, this.chart.zoomSettings.mode);
        return false;
    };
    Toolkit.prototype.zoomOut = function () {
        this.enableZoomButton = false;
        this.zoomInOutCalculation(-1, this.chart, this.chart.axisCollections, this.chart.zoomSettings.mode);
        return false;
    };
    Toolkit.prototype.zoom = function () {
        this.chart.zoomModule.isPanning = false;
        // const zoomModule: Zoom = this.chart.zoomModule;
        this.elementOpacity = '1';
        this.chart.svgObject.setAttribute('cursor', 'auto');
        if (this.zoomInElements) {
            this.zoomInElements.setAttribute('opacity', this.elementOpacity);
        }
        this.elementOpacity = (!this.chart.zoomModule.isZoomed && this.chart.zoomSettings.showToolbar) ? '0.2' : '1';
        if (this.zoomOutElements) {
            this.zoomOutElements.setAttribute('opacity', this.elementOpacity);
        }
        this.applySelection(this.zoomElements.childNodes, this.chart.themeStyle.toolkitSelectionColor);
        if (this.chart.theme === 'Fluent2HighContrast') {
            if (this.zoomInElements) {
                this.applySelection(this.zoomInElements.childNodes, this.chart.themeStyle.toolkitFill);
            }
            if (this.zoomOutElements) {
                this.applySelection(this.zoomOutElements.childNodes, this.chart.themeStyle.toolkitFill);
            }
        }
        if (this.panElements) {
            this.applySelection(this.panElements.childNodes, this.chart.theme === 'Tailwind3Dark' ? '#FFFFFF' : '#737373');
        }
        if (getElement(this.selectedID)) {
            getElement(this.selectedID).setAttribute('fill', 'transparent');
        }
        this.selectedID = this.chart.element.id + '_Zooming_Zoom_1';
        getElement(this.selectedID).setAttribute('fill', this.chart.themeStyle.toolkitIconRectSelectionFill);
        return false;
    };
    /**
     * Enables panning for the chart.
     *
     * @returns {boolean} - Returns false.
     */
    Toolkit.prototype.pan = function () {
        if (!this.chart.zoomModule.isZoomed) {
            return false;
        }
        var element;
        this.chart.zoomModule.isPanning = true;
        this.chart.svgObject.setAttribute('cursor', 'pointer');
        this.elementOpacity = '0.2';
        element = this.zoomInElements ? this.zoomInElements.setAttribute('opacity', this.elementOpacity) : null;
        element = this.zoomOutElements ? this.zoomOutElements.setAttribute('opacity', this.elementOpacity) : null;
        if (this.chart.theme === 'Fluent2HighContrast') {
            var zoomOut = getElement(this.chart.element.id + '_Zooming_ZoomOut');
            if (zoomOut) {
                zoomOut.setAttribute('opacity', '1');
            }
            var zoomIn = getElement(this.chart.element.id + '_Zooming_ZoomIn');
            if (zoomIn) {
                zoomIn.setAttribute('opacity', '1');
            }
            var zoomOut2 = getElement(this.chart.element.id + '_Zooming_ZoomOut_2');
            if (zoomOut2) {
                zoomOut2.setAttribute('fill', '#3FF23F');
            }
            var zoomIn2 = getElement(this.chart.element.id + '_Zooming_ZoomIn_2');
            if (zoomIn2) {
                (zoomIn2.setAttribute('fill', '#3FF23F'));
            }
            var zoomIn3 = getElement(this.chart.element.id + '_Zooming_ZoomIn_3');
            if (zoomIn3) {
                zoomIn3.setAttribute('fill', '#3FF23F');
            }
        }
        element = this.panElements ? this.applySelection(this.panElements.childNodes, this.chart.themeStyle.toolkitSelectionColor) : null;
        element = this.zoomElements ? this.applySelection(this.zoomElements.childNodes, this.chart.theme === 'Tailwind3Dark' ? '#FFFFFF' : '#737373') : null;
        if (getElement(this.selectedID)) {
            getElement(this.selectedID).setAttribute('fill', 'transparent');
        }
        this.selectedID = this.chart.element.id + '_Zooming_Pan_1';
        getElement(this.selectedID).setAttribute('fill', this.chart.themeStyle.toolkitIconRectSelectionFill);
        return false;
    };
    Toolkit.prototype.zoomInOutCalculation = function (scale, chart, axes, mode) {
        var _this = this;
        this.isZoomed = true;
        if (chart.zoomSettings.showToolbar) {
            this.elementOpacity = this.zoomInElements.getAttribute('opacity');
        }
        if (!chart.zoomModule.isPanning && this.elementOpacity !== '0.2') {
            if ((chart.zoomSettings.showToolbar && !chart.isZoomed)) {
                chart.zoomModule.isZoomed = true;
            }
            var zoomFactor = void 0;
            var zoomPosition = void 0;
            var cumulative = void 0;
            chart.disableTrackTooltip = true;
            chart.delayRedraw = true;
            var argsData = void 0;
            this.zoomCompleteEvtCollection = [];
            var zoomedAxisCollection = [];
            for (var _i = 0, _a = axes; _i < _a.length; _i++) {
                var axis = _a[_i];
                argsData = {
                    cancel: false, name: zoomComplete, axis: axis, previousZoomFactor: axis.zoomFactor,
                    previousZoomPosition: axis.zoomPosition, currentZoomFactor: axis.zoomFactor, currentZoomPosition: axis.zoomPosition,
                    previousVisibleRange: axis.visibleRange, currentVisibleRange: null
                };
                if ((axis.orientation === 'Horizontal' && mode !== 'Y') ||
                    (axis.orientation === 'Vertical' && mode !== 'X')) {
                    cumulative = Math.max(Math.max(1 / minMax(axis.zoomFactor, 0, 1), 1) + (0.25 * scale), 1);
                    zoomFactor = (cumulative === 1) ? 1 : minMax(1 / cumulative, 0, 1);
                    zoomPosition = (cumulative === 1) ? 0 : axis.zoomPosition + ((axis.zoomFactor - zoomFactor) * 0.5);
                    if (axis.zoomPosition !== zoomPosition || axis.zoomFactor !== zoomFactor) {
                        zoomFactor = (zoomPosition + zoomFactor) > 1 ? (1 - zoomPosition) : zoomFactor;
                    }
                    argsData.currentZoomFactor = zoomFactor;
                    argsData.currentZoomPosition = zoomPosition;
                    if (!argsData.cancel) {
                        axis.zoomFactor = argsData.currentZoomFactor;
                        axis.zoomPosition = argsData.currentZoomPosition;
                        this.zoomCompleteEvtCollection.push(argsData);
                    }
                    zoomedAxisCollection.push({
                        zoomFactor: axis.zoomFactor, zoomPosition: axis.zoomFactor, axisName: axis.name,
                        axisRange: axis.visibleRange
                    });
                }
            }
            var zoomingEventArgs_1 = { cancel: false, axisCollection: zoomedAxisCollection, name: onZooming };
            this.chart.trigger(onZooming, zoomingEventArgs_1, function () {
                if (zoomingEventArgs_1.cancel) {
                    var zoom = new Zoom(chart);
                    zoom.zoomCancel(axes, _this.zoomCompleteEvtCollection);
                }
            });
        }
    };
    Toolkit.prototype.applySelection = function (elements, color) {
        for (var i = 1, length_1 = elements.length; i < length_1; i++) {
            elements[i].setAttribute('fill', color);
        }
    };
    return Toolkit;
}());
export { Toolkit };
