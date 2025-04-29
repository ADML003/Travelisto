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
 * Circular 3D chart selection.
 */
import { Browser, extend, isNullOrUndefined } from '@syncfusion/ej2-base';
import { getElement } from '../../common/utils/helper';
import { Index } from '../../common/model/base';
import { BaseSelection } from '../../common/user-interaction/selection';
import { selectionComplete } from '../../common/model/constants';
/**
 * The `CircularChart3DSelection` module handles the selection for circular 3D chart.
 */
var CircularChartSelection3D = /** @class */ (function (_super) {
    __extends(CircularChartSelection3D, _super);
    function CircularChartSelection3D(circular3D) {
        var _this = _super.call(this, circular3D) || this;
        _this.circular3D = circular3D;
        _this.renderer = circular3D.renderer;
        _this.addEventListener();
        return _this;
    }
    /**
     * Binding events for selection module.
     *
     * @returns {void}
     */
    CircularChartSelection3D.prototype.addEventListener = function () {
        if (this.circular3D.isDestroyed) {
            return;
        }
        //let cancelEvent: string = Browser.isPointer ? 'pointerleave' : 'mouseleave';
        this.circular3D.on(Browser.touchMoveEvent, this.mouseMove, this);
        this.circular3D.on('click', this.mouseClick, this);
    };
    /**
     * Unbinding events for selection module.
     *
     * @returns {void}
     */
    CircularChartSelection3D.prototype.removeEventListener = function () {
        if (this.circular3D.isDestroyed) {
            return;
        }
        this.circular3D.off(Browser.touchMoveEvent, this.mouseMove);
        this.circular3D.off('click', this.mouseClick);
    };
    /**
     * Initializes the private variables for selection and deselection.
     *
     * @param {CircularChart3D} circular3D - The instance of the circular 3D chart.
     * @returns {void}
     */
    CircularChartSelection3D.prototype.initPrivateVariables = function (circular3D) {
        this.styleId = circular3D.element.id + '_ej2_chart_selection';
        this.unselected = circular3D.element.id + '_ej2_deselected';
        this.selectedDataIndexes = [];
        this.rectPoints = null;
    };
    /**
     * Invoke selection by creating selection style for rendered chart.
     *
     * @param {CircularChart3D} circular3D - The instance of the circular 3D chart.
     * @returns {void}
     */
    CircularChartSelection3D.prototype.invokeSelection = function (circular3D) {
        this.initPrivateVariables(circular3D);
        this.series = extend({}, circular3D.visibleSeries, null, true);
        this.seriesStyles();
        this.currentMode = circular3D.selectionMode;
        this.selectDataIndex(this.concatIndexes(circular3D.selectedDataIndexes, this.selectedDataIndexes), circular3D);
    };
    /**
     * To get the series selection style class name based on the series and point index.
     *
     * @param {CircularChart3DSeriesModel} series - Specifies the series model.
     * @param {number} point - Specifies the point index.
     * @returns {string} - Returns the style class name.
     */
    CircularChartSelection3D.prototype.generateStyle = function (series, point) {
        return (this.styleId + '_series_' + series.index + '_point_' + point);
    };
    /**
     * Gets series point elements based on the specified series and point index.
     *
     * @param {Index} index - Specifies the index of the series.
     * @returns {Element[]} - Returns the array of elements.
     */
    CircularChartSelection3D.prototype.getElementByIndex = function (index) {
        var _this = this;
        var pointElements = [];
        var elements = document.querySelectorAll('[id*="-region-series-' + index.series + '-point-' + index.point + '"]');
        elements.forEach(function (pointElement) {
            if (pointElement.id.indexOf(_this.circular3D.element.id + '-') > -1 && _this.indexFinder(pointElement.id).point === index.point) {
                pointElements.push(pointElement);
            }
        });
        var element = document.getElementById(this.control.element.id + '-svg-data-label-text-' + index.point);
        var connectorElement = document.getElementById(this.control.element.id + '-datalabel-series-0-connector-' + index.point);
        var shapeElement = document.getElementById(this.control.element.id + '-svg-data-label-series-0-shape-' + index.point);
        if (element) {
            pointElements.push(element);
        }
        if (connectorElement) {
            pointElements.push(connectorElement);
        }
        if (shapeElement) {
            pointElements.push(shapeElement);
        }
        return pointElements;
    };
    /**
     * Checks whether the specified element is already selected based on the given event type and optional index.
     *
     * @param {Element} targetElement - The target element to be checked for selection status.
     * @param {string} eventType - The type of event triggering the selection check (e.g., 'mouse move').
     * @param {Index} [index] - The index to narrow down the selection check for elements with multiple occurrences.
     * @returns {boolean} - Returns true if the element is already selected; otherwise, returns false.
     * @private
     */
    CircularChartSelection3D.prototype.isAlreadySelected = function (targetElement, eventType, index) {
        if (eventType === 'mousemove') {
            this.currentMode = this.circular3D.highlightMode;
            this.highlightDataIndexes = [];
            this.styleId = this.circular3D.element.id + '_ej2_chart_highlight';
        }
        else if (eventType === 'click' || eventType === 'keyup') {
            this.currentMode = this.circular3D.selectionMode;
            this.styleId = this.circular3D.element.id + '_ej2_chart_selection';
        }
        if (this.circular3D.highlightMode !== 'None' && this.circular3D.selectionMode === 'None') {
            if (eventType === 'click') {
                return false;
            }
        }
        if (((this.circular3D.highlightMode !== 'None' || this.circular3D.legendSettings.enableHighlight) && this.previousSelectedElement && this.previousSelectedElement[0])) {
            var isElement = void 0;
            var nodeName = targetElement.nodeName;
            if (targetElement.parentNode) {
                isElement = ((nodeName === 'path' || nodeName === 'shape') && targetElement.id.indexOf('region') > 1) ? true : false;
            }
            var _loop_1 = function (i) {
                if (this_1.previousSelectedElement[i].hasAttribute('class')) {
                    if (this_1.previousSelectedElement[i].getAttribute('class').indexOf('highlight') > -1 &&
                        (isElement || eventType === 'click' || eventType === 'keyup')) {
                        var selectionClass_1;
                        this_1.previousSelectedElement[i].classList.forEach(function (className) {
                            if (className.indexOf('selection') > -1) {
                                selectionClass_1 = className;
                            }
                        });
                        this_1.previousSelectedElement[i].removeAttribute('class');
                        if (selectionClass_1) {
                            this_1.addSvgClass(this_1.previousSelectedElement[i], selectionClass_1);
                        }
                        this_1.previousSelectedElement[i].classList.remove(this_1.styleId + '_series_' + index.series);
                        this_1.addOrRemoveIndex(this_1.highlightDataIndexes, this_1.indexFinder(this_1.previousSelectedElement[i].id));
                    }
                    else if (!isElement && this_1.previousSelectedElement[i].getAttribute('class').indexOf('highlight') > -1) {
                        this_1.performSelection(this_1.indexFinder(this_1.previousSelectedElement[i].id), this_1.circular3D, this_1.previousSelectedElement[i]);
                    }
                }
            };
            var this_1 = this;
            for (var i = 0; i < this.previousSelectedElement.length; i++) {
                _loop_1(i);
            }
        }
        return true;
    };
    /**
     * Handles mouse click events on the specified circular 3D instance instance.
     *
     * @param {CircularChart3D} circular3D - The circular 3D instance where the mouse click event occurred.
     * @param {Event} event - The mouse click event triggering the action.
     * @returns {void}
     */
    CircularChartSelection3D.prototype.mouseClick = function (circular3D, event) {
        this.calculateSelectedElements(circular3D, event.target, event.type);
    };
    /**
     * Calculates and processes selected elements based on the specified circular 3D chart instance, target element, and event type.
     *
     * @param {CircularChart3D} circular3D - The circular 3D chart instance to be used in the selection calculation.
     * @param {Element} targetElement - The target element involved in the selection calculation.
     * @param {string} eventType - The type of event triggering the selection calculation (e.g., 'click').
     * @returns {void}
     */
    CircularChartSelection3D.prototype.calculateSelectedElements = function (circular3D, targetElement, eventType) {
        if (isNullOrUndefined(targetElement)) {
            return;
        }
        if ((circular3D.selectionMode === 'None' && circular3D.highlightMode === 'None') ||
            targetElement.id && targetElement.id.indexOf(circular3D.element.id + '-') === -1) {
            return;
        }
        if (targetElement.getAttribute('id').indexOf('_connector_') > -1) {
            return;
        }
        else {
            this.isAlreadySelected(targetElement, eventType, this.indexFinder(targetElement.id));
            if (targetElement.id.indexOf('-series-') > -1 || targetElement.id.indexOf('-data-label-') > -1) {
                this.performSelection(this.indexFinder(targetElement.id), circular3D, targetElement);
            }
        }
    };
    /**
     * Finds and returns the index associated with the specified identifier.
     *
     * @param {string} id - The identifier used to find the associated index.
     * @returns {Index} - The index associated with the specified identifier.
     * @private
     */
    CircularChartSelection3D.prototype.indexFinder = function (id) {
        var ids = ['NaN', 'NaN'];
        if (id.indexOf('-point-') > -1) {
            ids = id.split('-series-')[1].split('-point-');
        }
        else if (id.indexOf('-border-') > -1) {
            ids[0] = id.split('-border-')[1];
        }
        else if (id.indexOf('data-label-series-0-shape-') > -1 && this.control.series[0].dataLabel.position === 'Inside') {
            ids[0] = '0';
            ids[1] = id.split('-shape-')[1];
        }
        else if (id.indexOf('-series-') > -1) {
            ids[0] = id.split('-series-')[1];
        }
        else if (id.indexOf('_chart_legend_shape_') > -1) {
            ids = id.split('_chart_legend_shape_');
            ids[0] = '0';
        }
        else if (id.indexOf('_chart_legend_g_') > -1) {
            ids = id.split('_chart_legend_g_');
            ids[0] = '0';
        }
        else if (id.indexOf('-data-label-') > -1) {
            ids[0] = '0';
            ids[1] = id.split('-data-label-text-')[1];
        }
        else if (id.indexOf('-connector-') > -1) {
            ids[0] = '0';
            ids[1] = id.split('-connector-')[1];
        }
        return new Index(parseInt(ids[0], 10), parseInt(ids[1], 10));
    };
    /**
     * Performs the selection based on the specified index, circular 3D instance, and optional element.
     *
     * @param {Index} index - The index used for selection, including the point information.
     * @param {CircularChart3D} circular3D - The circular 3D instance used for the selection operation.
     * @param {Element | undefined} [element] - The target element for selection.
     * @returns {void}
     * @private
     */
    CircularChartSelection3D.prototype.performSelection = function (index, circular3D, element) {
        if (!isNaN(index.point) && this.currentMode === 'Point' && element && this.getElementByIndex(index).length > 0) {
            this.selection(circular3D, index, this.getElementByIndex(index));
            this.selectionComplete(circular3D, circular3D.series[0]);
            this.blurEffect(circular3D.element.id, circular3D.visibleSeries);
        }
    };
    /**
     * Handles the completion of the selection process in the specified circular 3D chart instance and Circular3DSeries.
     *
     * @param {CircularChart3D} circular3D - The circular 3D chart instance where the selection is completed.
     * @param {CircularChart3DSeries} series - The Circular3DSeries associated with the completed selection.
     * @returns {void}
     * @private
     */
    CircularChartSelection3D.prototype.selectionComplete = function (circular3D, series) {
        var pointIndex;
        var selectedPointValues = [];
        for (var i = 0; i < this.selectedDataIndexes.length; i++) {
            pointIndex = this.selectedDataIndexes[i].point;
            if (!isNaN(pointIndex)) {
                selectedPointValues.push({
                    x: series.dataSource[pointIndex][series.xName], y: series.points[pointIndex].y,
                    seriesIndex: this.selectedDataIndexes[i].series, pointIndex: pointIndex
                });
            }
        }
        var args = {
            name: selectionComplete,
            selectedDataValues: selectedPointValues,
            cancel: false
        };
        circular3D.trigger(selectionComplete, args);
    };
    /**
     * Handles the selection process in the specified circular 3D instance based on the provided index and selected elements.
     *
     * @param {CircularChart3D} circular3D - The circular 3D chart instance where the selection is being performed.
     * @param {Index} index - The index used for selection, including point information.
     * @param {Element[]} selectedElements - The array of elements that have been selected.
     * @returns {void}
     * @private
     */
    CircularChartSelection3D.prototype.selection = function (circular3D, index, selectedElements) {
        if (!circular3D.isMultiSelect && this.styleId.indexOf('highlight') === -1 &&
            circular3D.selectionMode !== 'None') {
            this.removeMultiSelectElements(circular3D, this.selectedDataIndexes, index);
        }
        var className = selectedElements[0] && (selectedElements[0].getAttribute('class') || '');
        if (selectedElements[0] && className.indexOf(this.getSelectionClass(selectedElements[0].id)) > -1) {
            this.removeStyles(selectedElements);
            if (this.styleId.indexOf('highlight') > 0 && (circular3D.highlightMode !== 'None' || circular3D.legendSettings.enableHighlight)) {
                this.addOrRemoveIndex(this.highlightDataIndexes, index);
            }
            else {
                this.addOrRemoveIndex(this.selectedDataIndexes, index);
            }
        }
        else {
            this.previousSelectedElement = circular3D.highlightMode !== 'None' ? selectedElements : [];
            if (className.indexOf('selection') < 0) {
                this.applyStyles(selectedElements, index);
            }
            if (this.styleId.indexOf('highlight') > 0 && (circular3D.highlightMode !== 'None' || circular3D.legendSettings.enableHighlight)) {
                this.addOrRemoveIndex(this.highlightDataIndexes, index, true);
            }
            else {
                this.addOrRemoveIndex(this.selectedDataIndexes, index, true);
            }
        }
    };
    /**
     * Redraws the selection in the specified circular 3D chart instance based on the selected data indexes.
     *
     * @param {CircularChart3D} circular3D - The circular 3D chart  instance where the selection is to be redrawn.
     * @returns {void}
     */
    CircularChartSelection3D.prototype.redrawSelection = function (circular3D) {
        var selectedDataIndexes = extend([], this.selectedDataIndexes, null, true);
        var highlightDataIndexes = extend([], this.highlightDataIndexes, null, true);
        if (this.styleId.indexOf('highlight') > 0 && highlightDataIndexes.length > 0) {
            this.removeSelectedElements(circular3D, this.highlightDataIndexes);
            selectedDataIndexes = highlightDataIndexes;
        }
        else {
            this.removeSelectedElements(circular3D, this.selectedDataIndexes);
        }
        this.blurEffect(circular3D.element.id, circular3D.visibleSeries);
        this.selectDataIndex(selectedDataIndexes, circular3D);
    };
    /**
     * Removes the selected elements from the specified circular 3D chart instance based on the given indexes.
     *
     * @param {CircularChart3D} circular3D - The circular 3D instance from which selected elements will be removed.
     * @param {Index[]} indexes - The indexes representing the selected elements to be removed.
     * @returns {void}
     * @private
     */
    CircularChartSelection3D.prototype.removeSelectedElements = function (circular3D, indexes) {
        for (var _i = 0, indexes_1 = indexes; _i < indexes_1.length; _i++) {
            var index = indexes_1[_i];
            this.removeStyles(this.getElementByIndex(index));
        }
        var points = circular3D.visibleSeries[0].points;
        for (var i = 0; i < points.length; i++) {
            var index = new Index(0, points[i].index);
            this.removeStyles(this.getElementByIndex(index).length === 0 ? [document.getElementById(this.control.element.id + '_chart_legend_shape_' + index.point)] : this.getElementByIndex(index));
        }
    };
    /**
     * Handles legend item selection in the specified circular 3D chart based on the target element and event type.
     *
     * @param {CircularChart3D} chart - The circular 3D chart instance where legend item selection is being processed.
     * @param {Element} targetElement - The target element associated with the legend item.
     * @param {string} eventType - The type of event triggering the legend item selection (e.g., 'mouse move').
     * @returns {void}
     */
    CircularChartSelection3D.prototype.legendSelection = function (chart, targetElement, eventType) {
        if (eventType === 'mousemove') {
            if (targetElement.id.indexOf('text') > 1) {
                targetElement = getElement(targetElement.id.replace('text', 'shape'));
            }
            if (targetElement.id.indexOf('marker') > 1) {
                targetElement = getElement(targetElement.id.replace('_marker', ''));
            }
            if (targetElement.id.indexOf('g') > 1) {
                targetElement = getElement(targetElement.id.replace('_g_', '_shape_'));
            }
            if (targetElement.hasAttribute('class') && (targetElement.getAttribute('class').indexOf('highlight') > -1 ||
                targetElement.getAttribute('class').indexOf('selection') > -1)) {
                return;
            }
            this.currentMode = this.circular3D.highlightMode;
        }
        else if (eventType === 'click') {
            if (targetElement.id.indexOf('text') > 1) {
                targetElement = getElement(targetElement.id.replace('text', 'shape'));
            }
            if (targetElement.id.indexOf('g') > 1) {
                targetElement = getElement(targetElement.id.replace('_g_', '_shape_'));
            }
        }
        var index = this.indexFinder(targetElement.id);
        var isPreSelected = this.isAlreadySelected(targetElement, eventType, index);
        if (isPreSelected) {
            var seriesStyle = this.generateStyle(chart.visibleSeries[index.series], index.point);
            var selectedElements = (document.querySelectorAll('.' + seriesStyle));
            var isBlurEffectNeeded = true;
            if (selectedElements.length > 0) {
                this.removeSelection(chart, index.series, selectedElements, seriesStyle, isBlurEffectNeeded, index);
            }
            else {
                for (var _i = 0, _a = chart.visibleSeries[0].points; _i < _a.length; _i++) {
                    var element = _a[_i];
                    if (element.index !== index.point && (!chart.isMultiSelect || seriesStyle.indexOf('highlight') > 0)) {
                        seriesStyle = this.generateStyle(chart.visibleSeries[index.series], element.index);
                        selectedElements = document.querySelectorAll('.' + seriesStyle);
                        this.removeSelection(chart, index.series, selectedElements, seriesStyle, isBlurEffectNeeded, index);
                    }
                }
                var seriesElements = [];
                seriesElements = this.getElementByIndex(index);
                if (seriesElements.length > 0) {
                    this.checkSelectionElements(seriesElements, seriesStyle, false, index.point);
                    this.selection(chart, index, seriesElements);
                    this.blurEffect(chart.element.id, chart.visibleSeries);
                }
            }
        }
    };
    /**
     * Selects elements based on the specified data indexes in the given circular 3D chart instance.
     *
     * @param {Index[]} indexes - The data indexes used for element selection.
     * @param {CircularChart3D} circular3D - The circular 3D instance where elements are to be selected.
     * @returns {void}
     * @private
     */
    CircularChartSelection3D.prototype.selectDataIndex = function (indexes, circular3D) {
        var element;
        for (var _i = 0, indexes_2 = indexes; _i < indexes_2.length; _i++) {
            var index = indexes_2[_i];
            element = this.getElementByIndex(index)[0];
            if (element) {
                this.performSelection(index, circular3D, element);
            }
        }
    };
    /**
     * Removes selection styles for elements in a multi-selection process based on the specified data indexes and current index.
     *
     * @param {CircularChart3D} circular3D - The circular 3D chart instance from which selection styles will be removed.
     * @param {Index[]} index - The data indexes representing the elements to remove selection styles from.
     * @param {Index} currentIndex - The current index used as a reference during the multi-selection process.
     * @returns {void}
     * @private
     */
    CircularChartSelection3D.prototype.removeMultiSelectElements = function (circular3D, index, currentIndex) {
        for (var i = 0; i < index.length; i++) {
            if (!this.checkEquals(index[i], currentIndex)) {
                this.removeStyles(this.getElementByIndex(index[i]));
                index.splice(i, 1);
                i--;
            }
        }
    };
    /**
     * Applies the opacity effect to circular 3D chart series elements based on the specified pieId and visible series.
     *
     * @param {string} pieId - The identifier associated with the circular 3D chart series.
     * @param {CircularChart3DSeries[]} visibleSeries - The array of visible series in the circular 3D chart.
     * @returns {void}
     * @private
     */
    CircularChartSelection3D.prototype.blurEffect = function (pieId, visibleSeries) {
        var visibility = (this.checkVisibility(this.highlightDataIndexes) ||
            this.checkVisibility(this.selectedDataIndexes)); // legend click scenario
        for (var _i = 0, _a = visibleSeries[0].points; _i < _a.length; _i++) {
            var point = _a[_i];
            var pointElements = [];
            if (point.visible) {
                pointElements = this.getElementByIndex({ series: 0, point: point.index });
                this.checkSelectionElements(pointElements, this.generateStyle(visibleSeries[0], point.index), visibility, point.index);
            }
        }
    };
    /**
     * Checks for selection elements based on the specified style class name, visibility, and other parameters.
     *
     * @param {Element[] | Element} element - The element or array of elements to be checked for selection.
     * @param {string} className - The style class name used for identifying selection elements.
     * @param {boolean} visibility - The visibility status of the selection elements.
     * @param {number} [point=0] - The point value associated with the selection elements.
     * @returns {void}
     * @public
     */
    CircularChartSelection3D.prototype.checkSelectionElements = function (element, className, visibility, point) {
        if (point === void 0) { point = 0; }
        var children = element;
        if (this.circular3D.selectionMode !== 'None' && (this.circular3D.highlightMode !== 'None' || this.circular3D.legendSettings.enableHighlight)) {
            children = element;
        }
        var elementClassName;
        var legendShape;
        var selectElement = element;
        for (var i = 0; i < children.length; i++) {
            elementClassName = children[i].getAttribute('class') || '';
            if (this.circular3D.selectionMode !== 'None' && (this.circular3D.highlightMode !== 'None' || this.circular3D.legendSettings.enableHighlight)) {
                className = elementClassName.indexOf('selection') > 0 ||
                    elementClassName.indexOf('highlight') > 0 ? elementClassName : className;
            }
            if (elementClassName.indexOf(className) === -1 && visibility) {
                this.addSvgClass(children[i], this.unselected);
            }
            else {
                selectElement = children[i];
                if (elementClassName.indexOf(this.unselected) !== -1 && className.indexOf('highlight') > 0) {
                    this.circular3D.highlightAnimation(children[i], 700, 0.3);
                }
                this.removeSvgClass(children[i], this.unselected);
                this.removeSvgClass(children[i].parentNode, this.unselected);
            }
            if (children[i].id.indexOf('-data-label-text-') !== -1 || children[i].id.indexOf('-connector-') !== -1 || children[i].id.indexOf('-data-label-series-0-shape-') !== -1) {
                if (this.highlightDataIndexes && this.highlightDataIndexes[0] && point === this.highlightDataIndexes[0].point) {
                    this.removeSvgClass(children[i], this.unselected);
                }
                if (this.selectedDataIndexes) {
                    for (var j = 0; j < this.selectedDataIndexes.length; j++) {
                        if (point === this.selectedDataIndexes[j].point) {
                            this.removeSvgClass(children[i], this.unselected);
                        }
                    }
                }
            }
        }
        if (this.control.circularChartLegend3DModule && this.control.legendSettings.visible) {
            legendShape = getElement(this.control.element.id + '_chart_legend_shape_' + point);
            if (legendShape) {
                if (legendShape.hasAttribute('class')) {
                    this.removeSvgClass(legendShape, legendShape.getAttribute('class'));
                }
                if (selectElement.length > 0) {
                    elementClassName = selectElement[0].getAttribute('class');
                }
                else if (selectElement) {
                    elementClassName = selectElement.getAttribute('class') || '';
                }
                if (elementClassName.indexOf(className) === -1 && visibility) {
                    this.addSvgClass(legendShape, this.unselected);
                }
                else {
                    this.removeSvgClass(legendShape, this.unselected);
                    if (elementClassName === '') {
                        this.removeSvgClass(legendShape, className);
                    }
                    else {
                        this.addSvgClass(legendShape, className);
                    }
                }
            }
        }
    };
    /**
     * Applies selection style to the specified elements based on the provided data index.
     *
     * @param {Element[]} elements - The array of elements to which the selection style will be applied.
     * @param {Index} index - The data index used for selection.
     * @returns {void}
     * @private
     */
    CircularChartSelection3D.prototype.applyStyles = function (elements, index) {
        var circular3DTooltip = this.control.circularChartTooltip3DModule;
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var element = elements_1[_i];
            if (element) {
                this.removeSvgClass(element.parentNode, this.unselected);
                this.removeSvgClass(element, this.unselected);
                var opacity = circular3DTooltip && (circular3DTooltip.previousPoints.length > 0 &&
                    circular3DTooltip.previousPoints[0].point.index !== index.point) ?
                    circular3DTooltip.svgTooltip.opacity : this.series[index.series].opacity;
                element.setAttribute('opacity', opacity.toString());
                if (element.id.indexOf('-data-label-text-') === -1 && element.id.indexOf('-connector-') === -1 && element.id.indexOf('-data-label-series-0-shape-') === -1) {
                    this.addSvgClass(element, this.getSelectionClass(element.id));
                }
                if (this.getSelectionClass(element.id).indexOf('highlight') > 0) {
                    this.circular3D.stopElementAnimation(element);
                }
            }
        }
        if (this.control.circularChartLegend3DModule && this.control.legendSettings.visible) {
            var legendShape = document.getElementById(this.control.element.id + '_chart_legend_shape_' + index.point);
            this.removeSvgClass(legendShape, legendShape.getAttribute('class'));
            this.addSvgClass(legendShape, this.getSelectionClass(legendShape.id));
        }
    };
    /**
     * Retrieves the selection style class name based on the specified element ID.
     *
     * @param {string} id - The identifier used to determine the series and point for generating the selection style.
     * @returns {string} - The selection style class name.
     * @private
     */
    CircularChartSelection3D.prototype.getSelectionClass = function (id) {
        return this.generateStyle(this.control.series[this.indexFinder(id).series], this.indexFinder(id).point);
    };
    /**
     * Handles the removal of selection style class from the selected point in the circular 3D chart.
     *
     * @param {CircularChart3D} chart - The 3D chart instance where the selection needs to be removed.
     * @param {number} series - The index of the series for which the selection is being removed.
     * @param {NodeListOf<HTMLElement>} selectedElements - The HTML elements representing the selected items.
     * @param {string} seriesStyle - The style to be applied to the series after the removal of selection.
     * @param {boolean} isBlurEffectNeeded - A flag indicating whether a blur effect is needed after the removal of selection.
     * @param {Index} index - The index representing the specific data point for which selection is being removed (optional).
     * @returns {void}
     */
    CircularChartSelection3D.prototype.removeSelection = function (chart, series, selectedElements, seriesStyle, isBlurEffectNeeded, index) {
        if (selectedElements.length > 0) {
            var elements = [];
            for (var i = 0; i < selectedElements.length; i++) {
                elements.push(selectedElements[i]);
            }
            this.removeStyles(elements);
            this.addOrRemoveIndex(this.selectedDataIndexes, new Index(series, index.point));
            for (var _i = 0, _a = chart.visibleSeries[0].points; _i < _a.length; _i++) {
                var value = _a[_i];
                seriesStyle = this.generateStyle(chart.visibleSeries[0], value.index);
                if (document.querySelectorAll('.' + seriesStyle).length > 0) {
                    for (var _b = 0, elements_2 = elements; _b < elements_2.length; _b++) {
                        var element = elements_2[_b];
                        this.checkSelectionElements(element, seriesStyle, true, index.point);
                    }
                    isBlurEffectNeeded = false;
                    break;
                }
            }
            if (isBlurEffectNeeded) {
                this.blurEffect(chart.element.id, chart.visibleSeries);
            }
        }
    };
    /**
     * Removes styles associated with the selection from the selected elements.
     *
     *
     * @param {Element[]} elements - An array of chart elements from which selection styles should be removed.
     * @returns {void}
     */
    CircularChartSelection3D.prototype.removeStyles = function (elements) {
        for (var _i = 0, elements_3 = elements; _i < elements_3.length; _i++) {
            var element = elements_3[_i];
            if (element) {
                this.removeSvgClass(element, this.getSelectionClass(element.id));
            }
        }
    };
    /**
     * Adds or removes the specified index from the provided array of indexes based on the 'add' parameter.
     *
     * @param {Index[]} indexes - The array of indexes where the specified index will be added or removed.
     * @param {Index} index - The index to be added or removed.
     * @param {boolean} [add=true] - Indicates whether to add or remove the index. Defaults to true (add).
     * @returns {void}
     * @private
     */
    CircularChartSelection3D.prototype.addOrRemoveIndex = function (indexes, index, add) {
        for (var i = 0; i < indexes.length; i++) {
            if (this.checkEquals(indexes[i], index)) {
                indexes.splice(i, 1);
                i--;
            }
        }
        if (add) {
            indexes.push(index);
        }
    };
    /**
     * Checks if two indexes are equal in terms of their point and series values.
     *
     * @param {Index} first - The first index to be compared.
     * @param {Index} second - The second index to be compared.
     * @returns {boolean} - Returns true if the indexes are equal; otherwise, returns false.
     * @private
     */
    CircularChartSelection3D.prototype.checkEquals = function (first, second) {
        return ((first.point === second.point) && (first.series === second.series));
    };
    /**
     * Handles the mouse move event in the context of the circular 3D chart.
     *
     * @param {PointerEvent | TouchEvent} event - The pointer or touch event triggering the mouse move action.
     * @returns {void}
     * @public
     */
    CircularChartSelection3D.prototype.mouseMove = function (event) {
        var circular3D = this.circular3D;
        var targetElement = event.target;
        if (!circular3D.rotateActivate && circular3D.circularChartHighlight3DModule && (circular3D.highlightMode !== 'None' || circular3D.legendSettings.enableHighlight)) {
            if (!isNullOrUndefined(targetElement)) {
                if (event.target.id.indexOf('text') > 1 && event.target.id.indexOf('legend') > -1) {
                    targetElement = getElement(event.target.id.replace('text', 'shape'));
                }
                if ((targetElement).hasAttribute('class') && ((targetElement).getAttribute('class').indexOf('highlight') > -1 ||
                    targetElement.getAttribute('class').indexOf('selection') > -1)) {
                    return;
                }
                this.calculateSelectedElements(circular3D, event.target, event.type);
                if (this.highlightDataIndexes && (targetElement.id.indexOf('_chart_legend_') === -1 || targetElement.id.indexOf('_legend_element') !== -1) &&
                    this.highlightDataIndexes.length > 0 && targetElement.id.indexOf('-series-') === -1 &&
                    targetElement.id.indexOf('-data-label-') === -1) {
                    this.removeLegendHighlightStyles();
                }
                return;
            }
        }
        if (circular3D.selectionMode === 'None') {
            return;
        }
    };
    /**
     * Removes the highlighted legend and respective points when the legend is not focused.
     *
     * @returns {void}
     * @private
     */
    CircularChartSelection3D.prototype.removeLegendHighlightStyles = function () {
        this.circular3D.circularChartHighlight3DModule.highlightDataIndexes = [];
        var elementCollection;
        for (var i = 0; i < this.circular3D.visibleSeries[0].points.length; i++) {
            elementCollection = document.getElementsByClassName(this.generateStyle(this.circular3D.visibleSeries[0], i));
            if (this.selectedDataIndexes.length === 0) {
                elementCollection = document.getElementsByClassName(this.generateStyle(this.circular3D.visibleSeries[0], i));
                while (elementCollection.length > 0) {
                    var element = elementCollection[0];
                    if (element) {
                        this.removeSvgClass(element, element.getAttribute('class'));
                    }
                }
                elementCollection = document.getElementsByClassName(this.unselected);
                while (elementCollection.length > 0) {
                    var element = elementCollection[0];
                    if (element) {
                        this.removeSvgClass(element, element.getAttribute('class'));
                        if (this.generateStyle(this.circular3D.visibleSeries[0], i).indexOf('highlight') > -1) {
                            this.circular3D.highlightAnimation(element, 700, 0.3);
                        }
                    }
                }
            }
            else {
                elementCollection = document.getElementsByClassName(this.generateStyle(this.circular3D.visibleSeries[0], i));
                while (elementCollection.length > 0) {
                    var element = elementCollection[0];
                    if (element) {
                        this.removeSvgClass(element, element.getAttribute('class'));
                        this.addSvgClass(element, this.unselected);
                    }
                }
            }
        }
    };
    /**
     * Gets the module name for circular 3D chart selection.
     *
     * @returns {string} - The module name.
     * @public
     */
    CircularChartSelection3D.prototype.getModuleName = function () {
        return 'CircularChartSelection3D';
    };
    /**
     * Destroys the `CircularChartSelection3D` module.
     *
     * @returns {void}
     * @private
     */
    CircularChartSelection3D.prototype.destroy = function () {
        // Destroy method performed here
        this.removeEventListener();
    };
    return CircularChartSelection3D;
}(BaseSelection));
export { CircularChartSelection3D };
