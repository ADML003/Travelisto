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
 * Selection src file
 */
import { Animation, Browser } from '@syncfusion/ej2-base';
import { remove } from '@syncfusion/ej2-base';
import { extend, isNullOrUndefined } from '@syncfusion/ej2-base';
import { ChartLocation, RectOption, CircleOption, withInBounds, getDraggedRectLocation, removeElement, getElement } from '../../common/utils/helper';
import { Rect, PathOption } from '@syncfusion/ej2-svg-base';
import { Index } from '../../common/model/base';
import { dragComplete, selectionComplete } from '../../common/model/constants';
import { BaseSelection } from '../../common/user-interaction/selection';
/**
 * The `Selection` module handles the selection of chart elements.
 *
 * @private
 */
var Selection = /** @class */ (function (_super) {
    __extends(Selection, _super);
    /**
     * Constructor for selection module.
     *
     * @private
     */
    function Selection(chart) {
        var _this = _super.call(this, chart) || this;
        _this.isdrawRect = true;
        _this.multiDataIndexes = [];
        _this.pathIndex = 0;
        _this.seriesIndex = 0;
        _this.count = -1;
        _this.dragRectArray = [];
        _this.filterArray = [];
        _this.totalSelectedPoints = [];
        _this.chart = chart;
        _this.renderer = chart.renderer;
        var mode = chart.selectionMode;
        _this.isMultiDrag = chart.isMultiSelect && (mode.indexOf('Drag') > -1);
        _this.addEventListener();
        return _this;
    }
    /**
     * Adds event listeners for the chart.
     *
     * @returns {void}
     */
    Selection.prototype.addEventListener = function () {
        if (this.chart.isDestroyed || (this.chart.stockChart && this.chart.stockChart.onPanning)) {
            return;
        }
        var cancelEvent = Browser.isPointer ? 'pointerleave' : 'mouseleave';
        this.chart.on(Browser.touchMoveEvent, this.mouseMove, this);
        this.chart.on(cancelEvent, this.mouseLeave, this);
        this.chart.on('click', this.mouseClick, this);
        this.chart.on(Browser.touchStartEvent, this.mousedown, this);
        this.chart.on(Browser.touchEndEvent, this.mouseLeave, this);
    };
    /**
     * Handles the mousedown event.
     *
     * @private
     * @param {Event} e - The event object.
     * @returns {void}
     */
    Selection.prototype.mousedown = function (e) {
        var chart = this.chart;
        if (chart.isPointMouseDown || chart.selectionMode === 'None' || chart.isChartDrag) {
            return;
        }
        if (chart.isDoubleTap || !chart.isTouch || this.rectPoints) {
            this.dragStart(chart, chart.chartAxisLayoutPanel.seriesClipRect, chart.mouseDownX, chart.mouseDownY, e);
        }
    };
    /**
     * UnBinding events for selection module.
     *
     * @returns {void}
     */
    Selection.prototype.removeEventListener = function () {
        if (this.chart.isDestroyed) {
            return;
        }
        this.chart.off(Browser.touchMoveEvent, this.mouseMove);
        this.chart.off('pointerleave' || 'mouseleave', this.mouseLeave);
        this.chart.off('click', this.mouseClick);
        this.chart.off(Browser.touchStartEvent, this.mousedown);
        this.chart.off(Browser.touchEndEvent, this.mouseLeave);
    };
    /**
     * Initializes private variables for the chart.
     *
     * @private
     * @param {Chart} chart - The chart instance.
     * @returns {void}
     */
    Selection.prototype.initPrivateVariables = function (chart) {
        this.styleId = chart.element.id + '_ej2_chart_selection';
        this.unselected = chart.element.id + '_ej2_deselected';
        this.closeIconId = chart.element.id + '_ej2_drag_close';
        this.draggedRectGroup = chart.element.id + '_ej2_drag_group';
        this.multiRectGroup = chart.element.id + '_ej2_drag_multi_group';
        this.draggedRect = chart.element.id + '_ej2_drag_rect';
        this.lassoPath = chart.element.id + '_ej2_drag_path';
        this.selectedDataIndexes = [];
        this.rectPoints = null;
        this.isSeriesMode = chart.selectionMode === 'Series';
    };
    /**
     * Method to select the point and series.
     *
     * @param {Chart} chart - The chart instance.
     * @returns {void}
     */
    Selection.prototype.invokeSelection = function (chart) {
        this.initPrivateVariables(chart);
        this.series = extend({}, chart.visibleSeries, null, true);
        this.seriesStyles();
        this.currentMode = chart.selectionMode;
        if (!(chart.selectionMode.indexOf('Drag') > -1)) {
            this.selectDataIndex(chart, this.concatIndexes(chart.selectedDataIndexes, this.selectedDataIndexes));
        }
    };
    Selection.prototype.generateStyle = function (series) {
        if (series) {
            if (this.styleId.indexOf('selection') > 1 && this.chart.selectionMode !== 'None') {
                this.unselected = series.unSelectedStyle || this.unselected;
            }
            if (this.styleId.indexOf('highlight') > 0 && (this.chart.highlightMode !== 'None' || this.chart.legendSettings.enableHighlight)) {
                this.unselected = series.nonHighlightStyle || this.unselected;
            }
            return (series.selectionStyle || this.styleId + '_series_' + series.index);
        }
        return 'undefined';
    };
    /**
     * Selects data points in the chart based on the provided indexes.
     *
     * @param {Chart} chart - The chart instance.
     * @param {Index[]} indexes - An array of Index objects specifying the series and point indexes to be selected.
     * @returns {void}
     */
    Selection.prototype.selectDataIndex = function (chart, indexes) {
        for (var _i = 0, indexes_1 = indexes; _i < indexes_1.length; _i++) {
            var index = indexes_1[_i];
            this.performSelection(index, chart, this.getElementByIndex(chart, index, '', this.series[index.series].marker.visible)[0]);
        }
    };
    /**
     * Retrieves the DOM elements corresponding to the specified data point index.
     *
     * @param {Chart} chart - The chart instance.
     * @param {Index} index - The index object specifying the series and point indexes.
     * @param {string} [suffix=''] - Optional suffix to be appended to the element IDs.
     * @param {boolean} [marker] - Optional parameter to specify whether to retrieve marker elements. Default is false.
     * @param {boolean} [dataLabel] - Optional parameter to specify whether to retrieve datalabel elements. Default is false.
     * @returns {Element[]} - An array of DOM elements corresponding to the specified data point index.
     */
    Selection.prototype.getElementByIndex = function (chart, index, suffix, marker, dataLabel) {
        if (suffix === void 0) { suffix = ''; }
        var elementId = chart.element.id + '_Series_' + index.series + '_Point' + '_' + index.point;
        var series = chart.series[index.series];
        elementId = (series.type !== 'Scatter' && series.type !== 'Bubble' && marker) ? (elementId + '_Symbol' + suffix) : elementId;
        if (!marker && dataLabel) {
            return [getElement(elementId + '_Text_0' + suffix), getElement(elementId + '_TextShape_0' + suffix)];
        }
        return [getElement(elementId), ((series.type === 'RangeArea' || series.type === 'SplineRangeArea' || series.type === 'RangeStepArea') && series.marker.visible) ?
                getElement(elementId + '1') : null];
    };
    /**
     * Retrieves the DOM elements corresponding to the cluster of data points at the specified index.
     *
     * @param {Chart} chart - The chart instance.
     * @param {Index} index - The index object specifying the series and point indexes.
     * @returns {Element[]} - An array of DOM elements corresponding to the cluster of data points at the specified index.
     */
    Selection.prototype.getClusterElements = function (chart, index) {
        var clusters = [];
        var seriesStyle;
        var selectedElements;
        for (var _i = 0, _a = chart.visibleSeries; _i < _a.length; _i++) {
            var series = _a[_i];
            if (series.visible) {
                index = new Index(series.index, index.point);
                if (series.isRectSeries) {
                    clusters.push(this.getElementByIndex(chart, index)[0]);
                }
                clusters.push(this.getElementByIndex(chart, index, '', series.marker.visible)[0]);
                var dataLabelTextElement = document.getElementById(chart.element.id + '_Series_' + series.index + '_Point_' + index.point + '_Text_0');
                var dataLabelShapeElement = document.getElementById(chart.element.id + '_Series_' + series.index + '_Point_' + index.point + '_TextShape_0');
                if (dataLabelTextElement) {
                    clusters.push(dataLabelTextElement);
                }
                if (dataLabelShapeElement) {
                    clusters.push(dataLabelShapeElement);
                }
                seriesStyle = this.generateStyle(chart.visibleSeries[index.series]);
                selectedElements = document.querySelectorAll('.' + seriesStyle);
                this.findTrackballElements(selectedElements, seriesStyle);
                var clusterIndex = series.marker.visible && series.isRectSeries ? 2 : 1;
                clusterIndex += (dataLabelTextElement && dataLabelShapeElement) ? 2 :
                    (dataLabelTextElement || dataLabelShapeElement) ? 1 : 0;
                if (!chart.isMultiSelect && selectedElements.length > 0 &&
                    selectedElements[0].id !== (clusters[clusters.length - clusterIndex] ? clusters[clusters.length - clusterIndex].id : '')) {
                    this.removeSelection(chart, index.series, selectedElements, seriesStyle, true);
                }
            }
        }
        return clusters;
    };
    /**
     * Finds the elements within the selected elements that match the specified class name.
     *
     * @param {Element[] | NodeListOf<HTMLElement>} selectedElements - The elements to search within.
     * @param {string} className - The class name to search for.
     * @returns {void}
     */
    Selection.prototype.findTrackballElements = function (selectedElements, className) {
        var trackballElements;
        var elements;
        for (var i = 0; i < selectedElements.length; i++) {
            if (!isNullOrUndefined(selectedElements[i])) {
                trackballElements = !isNullOrUndefined(selectedElements[i].parentNode) ?
                    [].slice.call(selectedElements[0].parentNode.querySelectorAll('.' + className)) : [];
                if (trackballElements.length > 0) {
                    elements = [];
                    for (var i_1 = 0; i_1 < trackballElements.length; i_1++) {
                        if (trackballElements[i_1].id.indexOf('Trackball') > -1) {
                            elements.push(trackballElements[i_1]);
                        }
                    }
                    this.removeStyles(elements);
                }
            }
        }
    };
    /**
     * Finds the elements in the chart corresponding to the specified series and data point index.
     *
     * @param {Chart} chart - The chart instance.
     * @param {SeriesModel} series - The series for which to find the elements.
     * @param {Index} index - The index of the data point.
     * @param {string} [suffix=''] - A suffix to append to the element IDs.
     * @param {boolean} [marker] - Specifies whether to include marker elements.
     * @param {boolean} [dataLabel] - Specifies whether to include datalabel elements.
     * @returns {Element[]} - An array of elements corresponding to the specified series and data point index.
     */
    Selection.prototype.findElements = function (chart, series, index, suffix, marker, dataLabel) {
        if (suffix === void 0) { suffix = ''; }
        if (this.isSeriesMode) {
            return this.getSeriesElements(series);
        }
        else if (this.currentMode === 'Cluster') {
            return this.getClusterElements(chart, index);
        }
        else {
            return this.getElementByIndex(chart, index, suffix, marker, dataLabel);
        }
    };
    /**
     * Checks if the target element is already selected for the specified event type.
     *
     * @param {Element} targetElem - The target element to check.
     * @param {string} eventType - The type of event (e.g., 'mouse move', 'touch move').
     * @returns {boolean} - A boolean value indicating whether the target element is already selected for the specified event type.
     */
    Selection.prototype.isAlreadySelected = function (targetElem, eventType) {
        if (eventType === 'click') {
            this.currentMode = this.chart.selectionMode;
            this.styleId = this.chart.element.id + (this.chart.selectionModule && this.chart.selectionMode !== 'None' ? '_ej2_chart_selection' : '_ej2_chart_highlight');
        }
        else if (eventType === 'mousemove' || eventType === 'pointermove') {
            this.currentMode = this.chart.highlightMode;
            this.highlightDataIndexes = [];
            this.styleId = this.chart.element.id + '_ej2_chart_highlight';
        }
        if (this.chart.highlightMode !== 'None' && this.chart.selectionMode === 'None') {
            if (eventType === 'click') {
                return false;
            }
        }
        if (((this.chart.highlightMode !== 'None' || this.chart.legendSettings.enableHighlight) && this.previousSelectedEle && this.previousSelectedEle[0])) {
            var parentNodeId = targetElem.parentNode ? targetElem.parentNode.id : '';
            var isElement = void 0;
            if (targetElem.parentNode) {
                isElement = (parentNodeId.indexOf('SeriesGroup') > 0 || parentNodeId.indexOf('SymbolGroup') > 0) ? true : false;
            }
            for (var i = 0; i < this.previousSelectedEle.length; i++) {
                if (this.previousSelectedEle[i] && this.previousSelectedEle[i].hasAttribute('class')) {
                    if (this.previousSelectedEle[i].getAttribute('class').indexOf('highlight') > -1 &&
                        (isElement || eventType === 'click')) {
                        this.previousSelectedEle[i].removeAttribute('class');
                        if (this.previousSelectedEle[i].id.indexOf('Group') > 0) {
                            for (var j = 0; j < this.previousSelectedEle[i].children.length; j++) {
                                if (this.chart.highlightColor !== '' && !isNullOrUndefined(this.chart.highlightColor) && this.chart.highlightPattern === 'None') {
                                    this.previousSelectedEle[i].children[j].setAttribute('fill', (this.previousSelectedEle[i].children[j].id.indexOf('Text') > -1 || this.previousSelectedEle[i].children[j].id.indexOf('TextShape') > -1) ? this.previousSelectedEle[i].children[j].getAttribute('fill') : this.control.visibleSeries[this.indexFinder(this.previousSelectedEle[i].id).series].interior);
                                }
                                this.previousSelectedEle[i].children[j].removeAttribute('style');
                            }
                        }
                        else {
                            if (this.chart.highlightColor !== '' && !isNullOrUndefined(this.chart.highlightColor) && this.chart.highlightPattern === 'None') {
                                this.previousSelectedEle[i].setAttribute('fill', (this.previousSelectedEle[i].id.indexOf('Text') > -1 || this.previousSelectedEle[i].id.indexOf('TextShape') > -1) ? this.previousSelectedEle[i].getAttribute('fill') : this.control.visibleSeries[this.indexFinder(this.previousSelectedEle[i].id).series].interior);
                            }
                            this.previousSelectedEle[i].removeAttribute('style');
                        }
                        this.addOrRemoveIndex(this.highlightDataIndexes, this.indexFinder(this.previousSelectedEle[i].id));
                    }
                    else if (!isElement && this.previousSelectedEle[i].getAttribute('class').indexOf('highlight') > -1) {
                        this.performSelection(this.indexFinder(this.previousSelectedEle[i].id), this.chart, this.previousSelectedEle[i]);
                    }
                }
            }
        }
        return true;
    };
    Selection.prototype.mouseClick = function (event) {
        this.calculateSelectedElements(event.target, event.type, true);
        if (this.chart.highlightModule && this.chart.highlightModule.highlightDataIndexes
            && this.chart.highlightModule.highlightDataIndexes.length > 0 && event.target.id.indexOf('_chart_legend_') === -1
            && event.target.id.indexOf('_Series_') === -1 && this.chart.isTouch && Browser.isDevice) {
            this.removeLegendHighlightStyles();
        }
    };
    /**
     * Calculates the selected elements based on the target element and event type.
     *
     * @param {HTMLElement} targetElement - The target element for which to calculate selected elements.
     * @param {string} eventType - The type of event (e.g., 'mouse move', 'touch move').
     * @param {boolean} pointClick - Selection of series points.
     * @returns {void}
     */
    Selection.prototype.calculateSelectedElements = function (targetElement, eventType, pointClick) {
        if (isNullOrUndefined(targetElement)) {
            return;
        }
        if ((this.chart.selectionMode === 'None' && this.chart.highlightMode === 'None') ||
            targetElement.id && targetElement.id.indexOf(this.chart.element.id + '_') === -1) {
            return;
        }
        if (eventType === 'mousemove' || eventType === 'pointermove') {
            if (targetElement.hasAttribute('class') && (targetElement.getAttribute('class').indexOf('highlight') > -1 ||
                targetElement.getAttribute('class').indexOf('selection') > -1)) {
                return;
            }
            if (!isNullOrUndefined(targetElement.parentNode) && targetElement.parentNode.hasAttribute('class') &&
                (targetElement.parentNode.getAttribute('class').indexOf('highlight') > 0 ||
                    targetElement.parentNode.getAttribute('class').indexOf('selection') > 0)) {
                return;
            }
        }
        this.isAlreadySelected(targetElement, eventType);
        if (targetElement.id && targetElement.id.indexOf('_Series_') > -1 && targetElement.id.indexOf('_Text_') === -1) {
            var element = void 0;
            if (targetElement.id.indexOf('_Trackball_1') > -1) {
                element = getElement(targetElement.id.split('_Trackball_')[0] + '_Symbol');
                element = isNullOrUndefined(element) ? getElement(targetElement.id.split('_Trackball_')[0]) : element;
            }
            else if (targetElement.id.indexOf('_Trackball_0') > -1) {
                return null;
            }
            this.performSelection(this.indexFinder(targetElement.id), this.chart, element || targetElement, pointClick);
        }
    };
    /**
     * Performs selection based on the provided index and chart.
     *
     * @param {Index} index - The index for which to perform the selection.
     * @param {Chart} chart - The chart instance.
     * @param {Element} [element] - Optional. The element associated with the selection.
     * @param {boolean} pointClick - Selection of series points.
     * @returns {void}
     */
    Selection.prototype.performSelection = function (index, chart, element, pointClick) {
        this.isSeriesMode = this.currentMode === 'Series';
        if (chart.visibleSeries[index.series].type === 'BoxAndWhisker' && element &&
            element.id === chart.element.id + '_Series_' + index.series + '_Point_' + index.point + '_BoxPath') {
            element = element.parentNode;
        }
        if (chart.visibleSeries[index.series].type === 'Area' && (this.currentMode === 'Point' || this.currentMode === 'Cluster') && element &&
            (element.id === this.chart.element.id + '_Series_' + index.series)) {
            var className = this.generateStyle(chart.series[index.series]);
            var selectionEle = document.querySelectorAll('.' + className);
            this.findTrackballElements(selectionEle, className);
            this.blurEffect(chart.element.id, chart.visibleSeries, false, index.point);
        }
        switch (this.currentMode) {
            case 'Series':
                this.selection(chart, index, this.getSeriesElements(chart.series[index.series]));
                this.selectionComplete(chart, index, this.currentMode);
                this.blurEffect(chart.element.id, chart.visibleSeries, false, index.point);
                break;
            case 'Point':
                if ((!isNaN(index.point) && element) || (!pointClick && isNaN(index.point))) {
                    var pointElements = [];
                    pointElements.push(element);
                    var series = this.chart.visibleSeries[index.series];
                    var baseId = chart.element.id + "_Series_" + index.series + "_Point_" + index.point;
                    var textElement = document.getElementById(baseId + "_Text_0");
                    if (series.marker.dataLabel.visible && textElement !== null) {
                        pointElements.push(textElement);
                        pointElements.push(document.getElementById(baseId + "_TextShape_0"));
                    }
                    if (pointElements[0] !== null && chart.series[index.series].marker.visible &&
                        (chart.series[index.series].type.indexOf('Column') !== -1 || chart.series[index.series].type.indexOf('Bar') !== -1)) {
                        if (!(element.id.indexOf('_Symbol') !== -1) && getElement(element.id + '_Symbol')) {
                            pointElements.push(getElement(element.id + '_Symbol'));
                        }
                        else if (element.id.indexOf('_Symbol') !== -1 && getElement(element.id.replace('_Symbol', ''))) {
                            pointElements.push(getElement(element.id.replace('_Symbol', '')));
                        }
                    }
                    this.selection(chart, index, (!pointClick && isNaN(index.point)) ?
                        this.getSeriesElements(chart.series[index.series]) : pointElements);
                    this.selectionComplete(chart, index, this.currentMode);
                    this.blurEffect(chart.element.id, chart.visibleSeries, false, index.point);
                }
                break;
            case 'Cluster':
                if (!isNaN(index.point) || (!pointClick && isNaN(index.point))) {
                    if (!pointClick && isNaN(index.point)) {
                        this.selection(chart, index, this.getSeriesElements(chart.series[index.series]));
                    }
                    else {
                        this.clusterSelection(chart, index);
                    }
                    this.selectionComplete(chart, index, this.currentMode);
                    this.blurEffect(chart.element.id, chart.visibleSeries, false, index.point);
                }
                break;
        }
    };
    /**
     * Completes the selection process based on the provided index and selection mode.
     *
     * @param {Chart} chart - The chart instance.
     * @param {Index} index - The index for which the selection is completed.
     * @param {SelectionMode | HighlightMode} selectionMode - The selection mode.
     * @returns {void}
     */
    Selection.prototype.selectionComplete = function (chart, index, selectionMode) {
        var points;
        var pointIndex;
        var seriesIndex;
        var selectedPointValues = [];
        var yValue;
        var selectedPointX;
        if (selectionMode === 'Cluster') {
            for (var _i = 0, _a = chart.visibleSeries; _i < _a.length; _i++) {
                var series = _a[_i];
                if (series.visible) {
                    for (var i = 0; i < this.selectedDataIndexes.length; i++) {
                        pointIndex = chart.isMultiSelect ? this.selectedDataIndexes[i].point : index.point;
                        seriesIndex = series.index;
                        points = series.points;
                        if (!isNaN(pointIndex) && (pointIndex < points.length)) {
                            yValue = (series.type !== 'RangeArea' || series.type.indexOf('SplineRangeArea') > -1 || series.type.indexOf('RangeStepArea') > -1) ? points[pointIndex].yValue :
                                points[pointIndex].regions[0].y;
                            selectedPointX = points[pointIndex].xValue;
                            if (chart.primaryXAxis.valueType === 'Category') {
                                selectedPointX = points[pointIndex].x.toLocaleString();
                            }
                            else if (chart.primaryXAxis.valueType === 'DateTime') {
                                selectedPointX = new Date(points[pointIndex].xValue);
                            }
                            if (series.category !== 'Indicator') {
                                selectedPointValues.push({
                                    x: selectedPointX, y: yValue, seriesIndex: seriesIndex,
                                    pointIndex: pointIndex
                                });
                            }
                            if (series.type === 'RangeArea' || series.type === 'SplineRangeArea' || series.type === 'RangeStepArea') {
                                selectedPointValues.push({
                                    x: selectedPointX, y: points[pointIndex].regions[0].y,
                                    seriesIndex: seriesIndex, pointIndex: pointIndex
                                });
                            }
                        }
                    }
                }
            }
        }
        else if (selectionMode === 'Series') {
            if (chart.isMultiSelect) {
                for (var i = 0; i < this.selectedDataIndexes.length; i++) {
                    seriesIndex = this.selectedDataIndexes[i].series;
                    if (this.selectedDataIndexes.length > 0) {
                        selectedPointValues.push({
                            seriesIndex: seriesIndex
                        });
                    }
                }
            }
            else {
                seriesIndex = (this.selectedDataIndexes.length > 0) ? this.selectedDataIndexes[0].series :
                    (this.highlightDataIndexes && this.highlightDataIndexes.length > 0) ? this.highlightDataIndexes[0].series : 0;
                if (this.selectedDataIndexes.length > 0 || (this.highlightDataIndexes && this.highlightDataIndexes.length > 0)) {
                    selectedPointValues.push({
                        seriesIndex: seriesIndex
                    });
                }
            }
        }
        else if (selectionMode === 'Point') {
            var selectedData = [];
            if (this.styleId.indexOf('highlight') > -1) {
                selectedData = this.highlightDataIndexes;
            }
            else {
                selectedData = this.selectedDataIndexes;
            }
            for (var i = 0; i < selectedData.length; i++) {
                pointIndex = selectedData[i].point;
                seriesIndex = selectedData[i].series;
                var series = chart.series[seriesIndex];
                points = series.points;
                if (!isNaN(pointIndex)) {
                    selectedPointX = points[pointIndex].xValue;
                    yValue = (series.type !== 'RangeArea' || series.type.indexOf('SplineRangeArea') > -1 || series.type.indexOf('RangeStepArea') > -1) ? points[pointIndex].yValue :
                        points[pointIndex].regions[0].y;
                    if (chart.primaryXAxis.valueType === 'Category') {
                        selectedPointX = points[pointIndex].x.toLocaleString();
                    }
                    else if (chart.primaryXAxis.valueType === 'DateTime') {
                        selectedPointX = new Date(points[pointIndex].xValue);
                    }
                    selectedPointValues.push({
                        x: selectedPointX, y: yValue, seriesIndex: seriesIndex,
                        pointIndex: pointIndex
                    });
                }
            }
        }
        var args = {
            name: selectionComplete,
            selectedDataValues: selectedPointValues,
            cancel: false,
            chart: chart
        };
        chart.trigger(selectionComplete, args);
    };
    /**
     * Handles the selection logic for the chart.
     *
     * @param {Chart} chart - The chart instance.
     * @param {Index} index - The index of the selected data point.
     * @param {Element[]} selectedElements - The elements representing the selected data point.
     * @returns {void}
     */
    Selection.prototype.selection = function (chart, index, selectedElements) {
        if (!(this.currentMode === 'Lasso')) {
            if (!chart.isMultiSelect && (this.currentMode.indexOf('Drag') === -1 && this.styleId.indexOf('highlight') === -1 &&
                chart.selectionMode !== 'None')) {
                this.removeMultiSelectElements(chart, this.selectedDataIndexes, index, chart.series);
            }
        }
        var indexValue = (this.rangeColorMappingEnabled()) ? 0 : index.series;
        if (!isNullOrUndefined(selectedElements[0])) {
            if (chart.visibleSeries[indexValue].isRectSeries) {
                if (selectedElements[0].id) {
                    if (document.getElementById(selectedElements[0].id + '_Symbol')) {
                        selectedElements.push(getElement(selectedElements[0].id + '_Symbol'));
                    }
                    else if (selectedElements[0].id.indexOf('SeriesGroup') !== -1) {
                        if (document.getElementById(selectedElements[0].id.replace('SeriesGroup', 'SymbolGroup'))) {
                            selectedElements.push(getElement(selectedElements[0].id.replace('SeriesGroup', 'SymbolGroup')));
                        }
                    }
                }
            }
            var isAdd = void 0;
            var className = selectedElements[0] && (selectedElements[0].getAttribute('class') || '');
            className = className.replace('e-chart-focused', '').trim();
            var pClassName = selectedElements[0].parentNode &&
                (selectedElements[0].parentNode.getAttribute('class') || '');
            if (className !== '' && this.currentMode !== 'Cluster') {
                this.findTrackballElements(selectedElements, className);
            }
            if (selectedElements[0] && className.indexOf(this.getSelectionClass(selectedElements[0].id)) > -1) {
                this.removeStyles(selectedElements);
            }
            else if (selectedElements[0].parentNode && pClassName.indexOf(this.getSelectionClass(selectedElements[0].id)) > -1) {
                this.removeStyles([selectedElements[0].parentNode]);
            }
            else {
                this.previousSelectedEle = (chart.highlightMode !== 'None' || chart.legendSettings.enableHighlight) ? selectedElements : [];
                this.applyStyles(selectedElements);
                isAdd = true;
            }
            if (this.styleId.indexOf('highlight') > 0 && (chart.highlightMode !== 'None' || chart.legendSettings.enableHighlight)) {
                this.addOrRemoveIndex(this.highlightDataIndexes, index, isAdd);
            }
            else {
                this.addOrRemoveIndex(this.selectedDataIndexes, index, isAdd);
            }
        }
    };
    /**
     * Handles the selection logic for clustered data points in the chart.
     *
     * @param {Chart} chart - The chart instance.
     * @param {Index} index - The index of the selected clustered data point.
     * @returns {void}
     */
    Selection.prototype.clusterSelection = function (chart, index) {
        this.selection(chart, index, this.getClusterElements(chart, new Index(index.series, index.point)));
    };
    /**
     * Removes the multi-selected elements from the chart.
     *
     * @param {Chart} chart - The chart instance.
     * @param {Index[]} index - The indices of the multi-selected elements to be removed.
     * @param {Index} currentIndex - The index of the current selected element.
     * @param {SeriesModel[]} seriesCollection - The collection of series in the chart.
     * @returns {void}
     */
    Selection.prototype.removeMultiSelectElements = function (chart, index, currentIndex, seriesCollection) {
        var series;
        for (var i = 0; i < index.length; i++) {
            series = seriesCollection[index[i].series];
            if ((this.isSeriesMode && !this.toEquals(index[i], currentIndex, this.isSeriesMode)) ||
                (this.currentMode === 'Cluster' && !this.toEquals(index[i], currentIndex, false)) ||
                (!this.isSeriesMode && this.toEquals(index[i], currentIndex, true) &&
                    !this.toEquals(index[i], currentIndex, false))) {
                this.removeStyles(this.findElements(chart, series, index[i], '', false));
                if (series.marker.visible) {
                    this.removeStyles(this.findElements(chart, series, index[i], '', true));
                }
                if (series.marker.dataLabel.visible) {
                    this.removeStyles(this.findElements(chart, series, index[i], '', false, true));
                }
                index.splice(i, 1);
                i--;
            }
        }
    };
    /**
     * Applies a blur effect to a specific chart or legend.
     *
     * @param {string} chartId - The ID of the chart or legend.
     * @param {Series[]} visibleSeries - The collection of visible series in the chart.
     * @param {boolean} isLegend - Indicates whether the blur effect should be applied to a legend. Defaults to false.
     * @param {number} index - The index of the series or legend item to which the blur effect should be applied. Defaults to 0.
     * @returns {void}
     */
    Selection.prototype.blurEffect = function (chartId, visibleSeries, isLegend, index) {
        if (isLegend === void 0) { isLegend = false; }
        if (index === void 0) { index = 0; }
        var visibility = (this.checkVisibility(this.highlightDataIndexes, this.chart) ||
            this.checkVisibility(this.selectedDataIndexes, this.chart)); // legend click scenario
        for (var _i = 0, visibleSeries_1 = visibleSeries; _i < visibleSeries_1.length; _i++) {
            var series = visibleSeries_1[_i];
            var legendIndex = void 0;
            var legendStrokeColor = void 0;
            if (this.rangeColorMappingEnabled()) {
                if (isLegend === false) {
                    legendIndex = Object.keys(series.rangeColorPoints).indexOf(series.points[index].interior);
                    legendStrokeColor = series.points[index].interior;
                }
                else {
                    legendIndex = index;
                    legendStrokeColor = document.getElementById(chartId + '_chart_legend_shape_' + index).getAttribute('fill');
                }
            }
            else {
                legendIndex = series.index;
                legendStrokeColor = this.chart.visibleSeries[series.index].interior;
            }
            if (series.visible) {
                this.checkSelectionElements(getElement(chartId + 'SeriesGroup' + series.index), this.generateStyle(series), visibility, isLegend, legendIndex, legendStrokeColor);
                if (series.marker.dataLabel.visible && !isNullOrUndefined(series.shapeElement)) {
                    this.checkSelectionElements(series.shapeElement, this.generateStyle(series), visibility, isLegend, legendIndex, legendStrokeColor);
                    this.checkSelectionElements(series.textElement, this.generateStyle(series), visibility, isLegend, legendIndex, legendStrokeColor);
                }
                if (!isNullOrUndefined(getElement(chartId + 'SymbolGroup' + series.index))) {
                    this.checkSelectionElements(getElement(chartId + 'SymbolGroup' + series.index), this.generateStyle(series), visibility, isLegend, legendIndex, legendStrokeColor);
                }
            }
        }
    };
    /**
     * Checks and updates the selection state of elements based on the provided criteria.
     *
     * @param {Element} element - The element to check for selection.
     * @param {string} className - The class name used for selecting elements.
     * @param {boolean} visibility - The visibility state of the element.
     * @param {boolean} isLegend - Indicates whether the element is a legend. Defaults to true.
     * @param {number} series - The index of the series associated with the element. Defaults to 0.
     * @param {string} legendStrokeColor - The stroke color of the legend. Defaults to '#D3D3D3'.
     * @returns {void}
     */
    Selection.prototype.checkSelectionElements = function (element, className, visibility, isLegend, series, legendStrokeColor) {
        if (isLegend === void 0) { isLegend = true; }
        if (series === void 0) { series = 0; }
        if (legendStrokeColor === void 0) { legendStrokeColor = '#D3D3D3'; }
        var children = (this.isSeriesMode ?
            element.childNodes || [element] : element.childNodes || element);
        if (this.chart.selectionMode !== 'None' && (this.chart.highlightMode !== 'None' || this.chart.legendSettings.enableHighlight)) {
            children = (element.childNodes || element);
        }
        if (this.chart.selectionMode === 'Cluster' && element.tagName.toLowerCase() === 'text' && element.id.indexOf('_Text_') >= 0) {
            children = [element];
        }
        var elementClassName;
        var parentClassName;
        var legendShape;
        var selectElement = element;
        var isDataLabelTextElement = (this.chart.visibleSeries[this.rangeColorMappingEnabled() ? 0 : series].marker.dataLabel.visible && (element.id.indexOf('Text') > -1 || element.id.indexOf('TextShape') > -1) && element.tagName !== 'g');
        for (var i = 0; i < children.length && !isDataLabelTextElement; i++) {
            elementClassName = children[i].getAttribute('class') || '';
            parentClassName = children[i].parentNode.getAttribute('class') || '';
            if (this.chart.selectionMode !== 'None' && (this.chart.highlightMode !== 'None' || this.chart.legendSettings.enableHighlight)) {
                className = elementClassName.indexOf('selection') > 0 ||
                    elementClassName.indexOf('highlight') > 0 ? elementClassName : className;
                className = (parentClassName.indexOf('selection') > 0 ||
                    parentClassName.indexOf('highlight') > 0) ? parentClassName : className;
            }
            if (elementClassName.indexOf(className) === -1 &&
                parentClassName.indexOf(className) === -1 && visibility) {
                this.addSvgClass(children[i], this.unselected);
            }
            else {
                selectElement = children[i];
                this.removeSvgClass(children[i], this.unselected);
                this.removeSvgClass(children[i].parentNode, this.unselected);
                if (children[i].id !== '' && elementClassName.indexOf(this.unselected) !== -1 && parentClassName.indexOf(className) === -1) {
                    this.highlightAnimation(children[i], this.chart.series.length === 1 ? 0 :
                        this.indexFinder(children[i].id).series, 700, 0.3);
                }
            }
            if (children[i].id.indexOf('Trackball') > 0 && selectElement.classList[0] === className) {
                this.removeSvgClass(children[i], this.unselected);
                this.removeSvgClass(children[i].parentNode, this.unselected);
                this.addSvgClass(children[i], className);
            }
        }
        if (element.id.indexOf('Symbol') > -1) {
            if ((element.querySelectorAll('.' + className)[0]) && element.querySelectorAll('.' + className)[0].getAttribute('class')
                === className) {
                var symbolEle = getElement(this.control.element.id + '_Series_' + element.id[element.id.length - 1]);
                var seriesClassName = symbolEle && symbolEle.hasAttribute('class') ? symbolEle.getAttribute('class') : '';
                if (seriesClassName.indexOf(this.unselected) > -1) {
                    this.removeSvgClass(symbolEle, this.unselected);
                }
            }
        }
        if (this.control.legendModule && this.control.legendSettings.visible && this.control.legendSettings.visible
            && !(isLegend && this.rangeColorMappingEnabled && (element === this.control.visibleSeries[0].textElement
                || element === this.control.visibleSeries[0].shapeElement))) {
            legendShape = getElement(this.control.element.id + '_chart_legend_shape_' + series);
            if (legendShape) {
                if (legendShape.hasAttribute('class')) {
                    this.removeSvgClass(legendShape, legendShape.getAttribute('class'));
                    if (!isNullOrUndefined(this.chart.highlightColor && this.chart.highlightColor !== '') && !this.chart.legendSettings.enableHighlight) {
                        legendShape.setAttribute('stroke', legendStrokeColor);
                        if (this.chart.highlightPattern === 'None') {
                            legendShape.setAttribute('fill', legendStrokeColor);
                        }
                    }
                }
                elementClassName = selectElement.getAttribute('class') || '';
                parentClassName = selectElement.parentNode.getAttribute('class') || '';
                if (elementClassName.indexOf(className) === -1 && parentClassName.indexOf(className) === -1 && visibility) {
                    this.addSvgClass(legendShape, (this.chart.highlightMode === 'None' && this.chart.legendSettings.enableHighlight && (!this.chart.selectionModule || this.chart.selectionModule.selectedDataIndexes.length === 0)) ? className : this.unselected);
                    this.removeSvgClass(legendShape, className);
                    if (this.chart.highlightColor !== '' && !isNullOrUndefined(this.chart.highlightColor)) {
                        legendShape.setAttribute('stroke', this.control.visibleSeries[series].interior);
                        if (this.chart.highlightPattern === 'None') {
                            legendShape.setAttribute('fill', this.control.visibleSeries[series].interior);
                        }
                    }
                }
                else {
                    this.removeSvgClass(legendShape, this.unselected);
                    if (!isNullOrUndefined(this.chart.highlightColor) && this.chart.highlightColor !== '') {
                        legendShape.setAttribute('stroke', this.control.visibleSeries[series].interior);
                        if (this.chart.highlightPattern === 'None') {
                            legendShape.setAttribute('fill', this.control.visibleSeries[series].interior);
                        }
                    }
                    if ((elementClassName === '' && parentClassName === '') || elementClassName.trim() === 'EJ2-Trackball') {
                        this.removeSvgClass(legendShape, className);
                    }
                    else {
                        this.addSvgClass(legendShape, className);
                        if (className.indexOf('highlight') > 0 && this.chart.highlightColor !== '' && this.chart.highlightColor !== 'transparent' && !isNullOrUndefined(this.chart.highlightColor)) {
                            legendShape.setAttribute('stroke', this.chart.highlightColor);
                            if (this.styleId.indexOf('highlight') > 0 && this.chart.highlightPattern === 'None') {
                                legendShape.setAttribute('fill', this.chart.highlightColor);
                            }
                        }
                    }
                }
                var legendItemsId = void 0;
                if (this.rangeColorMappingEnabled()) {
                    for (var i = 0; i < this.chart.rangeColorSettings.length; i++) {
                        legendItemsId = document.getElementById(this.chart.element.id + '_chart_legend_shape_' + i);
                        if (legendShape !== legendItemsId) {
                            this.addSvgClass(legendItemsId, this.unselected);
                            this.removeSvgClass(legendItemsId, className);
                        }
                        else if (isLegend === true) {
                            this.addSvgClass(legendItemsId, className);
                        }
                        if (elementClassName.indexOf(className) === -1 && isLegend === false) {
                            this.removeSvgClass(legendItemsId, this.unselected);
                        }
                    }
                }
                if (isLegend && parentClassName.indexOf(className) > -1) {
                    this.addSvgClass(legendShape, className);
                }
            }
        }
    };
    /**
     * Applies styles to the specified elements.
     *
     * @param {Element[]} elements - The elements to which styles will be applied.
     * @returns {void}
     */
    Selection.prototype.applyStyles = function (elements) {
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var element = elements_1[_i];
            if (element) {
                this.removeSvgClass(element.parentNode, this.unselected);
                this.removeSvgClass(element, this.unselected);
                if (this.chart.series[0].pointColorMapping === 'fill' || this.rangeColorMappingEnabled()) {
                    var className = this.getSelectionClass(element.id);
                    var index = className.indexOf('highlight') > -1 ? parseInt(className.split(this.chart.element.id + '_ej2_chart_highlight_series_')[1], 10) : parseInt(className.split(this.chart.element.id + '_ej2_chart_selection_series_')[1], 10);
                    var patternName = this.styleId.indexOf('highlight') > 0 ? this.chart.highlightPattern : this.chart.selectionPattern;
                    var pattern = void 0;
                    if (className.indexOf('highlight') > -1 || className.indexOf('selection') > -1) {
                        pattern = document.getElementById(this.chart.element.id + '_' + patternName + '_' + 'Selection' + '_' + index);
                    }
                    if (element.id.indexOf('legend') === -1 && element.id.indexOf('Text') === -1 && element.id.indexOf('TextShape') === -1 && element.id.indexOf('Group') === -1 && pattern != null) {
                        for (var i = 1; i < pattern.children.length; i++) {
                            pattern.children[i].setAttribute('fill', element.getAttribute('fill'));
                            pattern.children[i].setAttribute('stroke', element.getAttribute('fill'));
                        }
                    }
                }
                this.addSvgClass(element, this.getSelectionClass(element.id));
                if (element.id.indexOf('Group') > 0) {
                    var seriesIndex = this.indexFinder(element.id);
                    for (var i = 0; i < element.children.length; i++) {
                        if (element.children[i].nodeName !== 'defs') {
                            this.stopElementAnimation(element.children[i], seriesIndex.series);
                        }
                    }
                }
                if (this.styleId.indexOf('highlight') > 0 && this.chart.highlightColor !== '' && !isNullOrUndefined(this.chart.highlightColor) && this.chart.highlightPattern === 'None' && this.chart.highlightColor !== 'transparent') {
                    if (element.id.indexOf('Group') > 0) {
                        for (var i = 0; i < element.children.length; i++) {
                            element.children[i].setAttribute('fill', (element.id.indexOf('Text') > -1
                                || element.id.indexOf('TextShape') > -1) ? element.children[i].getAttribute('fill')
                                : this.chart.highlightColor);
                        }
                    }
                    else {
                        element.setAttribute('fill', (element.id.indexOf('Text') > -1
                            || element.id.indexOf('TextShape') > -1) ? element.getAttribute('fill')
                            : this.chart.highlightColor);
                    }
                }
            }
        }
    };
    /**
     * Gets the CSS class for selection based on the provided identifier.
     *
     * @param {string} id - The identifier used to determine the selection class.
     * @returns {string} - The CSS class for selection.
     */
    Selection.prototype.getSelectionClass = function (id) {
        return this.generateStyle(this.control.visibleSeries[this.indexFinder(id).series]);
    };
    /**
     * Removes styles from the provided elements.
     *
     * @param {Element[]} elements - The elements from which styles will be removed.
     * @returns {void}
     */
    Selection.prototype.removeStyles = function (elements) {
        for (var _i = 0, elements_2 = elements; _i < elements_2.length; _i++) {
            var element = elements_2[_i];
            if (element) {
                this.removeSvgClass(element, this.getSelectionClass(element.id));
                if (this.chart.highlightPattern === 'None' && this.chart.highlightColor !== '' && !isNullOrUndefined(this.chart.highlightColor) && this.chart.highlightColor !== 'transparent') {
                    if (element.id.indexOf('Group') > 0) {
                        for (var i = 0; i < element.children.length; i++) {
                            element.children[i].setAttribute('fill', (element.id.indexOf('Text') > -1
                                || element.id.indexOf('TextShape') > -1) ? element.children[i].getAttribute('fill')
                                : this.control.visibleSeries[this.indexFinder(element.id).series].interior);
                        }
                    }
                    else {
                        element.setAttribute('fill', (element.id.indexOf('Text') > -1
                            || element.id.indexOf('TextShape') > -1) ? element.getAttribute('fill')
                            : this.control.visibleSeries[this.indexFinder(element.id).series].interior);
                    }
                }
            }
        }
    };
    /**
     * Adds or removes an index from the provided array of indexes.
     *
     * @param {Index[]} indexes - The array of indexes.
     * @param {Index} index - The index to add or remove.
     * @param {boolean} [isAdd] - Optional parameter to specify whether to add or remove the index. Defaults to true (add).
     * @returns {void}
     */
    Selection.prototype.addOrRemoveIndex = function (indexes, index, isAdd) {
        for (var i = 0; i < indexes.length; i++) {
            if (this.toEquals(indexes[i], index, this.isSeriesMode)) {
                indexes.splice(i, 1);
                i--;
            }
        }
        if (isAdd) {
            indexes.push(index);
        }
    };
    /**
     * Checks if two Index objects are equal.
     *
     * @param {Index} first - The first Index object.
     * @param {Index} second - The second Index object.
     * @param {boolean} checkSeriesOnly - Specifies whether to check series properties only.
     * @returns {boolean} - True if the two Index objects are equal, otherwise false.
     */
    Selection.prototype.toEquals = function (first, second, checkSeriesOnly) {
        return ((first.series === second.series || (this.currentMode === 'Cluster' && !checkSeriesOnly))
            && (checkSeriesOnly || (first.point === second.point)));
    };
    /**
     * Redraws the selection or highlight on the chart.
     *
     * @param {Chart} chart - The chart instance.
     * @param {SelectionMode | HighlightMode} oldMode - The previous selection or highlight mode.
     * @param {boolean} chartRedraw - Specifies whether to redraw the entire chart.
     * @returns {void}
     */
    Selection.prototype.redrawSelection = function (chart, oldMode, chartRedraw) {
        this.isSeriesMode = oldMode === 'Series';
        if (!isNullOrUndefined(oldMode)) {
            if (oldMode.indexOf('Drag') !== -1 || oldMode === 'Lasso' || chartRedraw) {
                chart.isRedrawSelection = false;
            }
            else {
                chart.isRedrawSelection = true;
            }
        }
        var selectedDataIndexes = extend([], this.selectedDataIndexes, null, true);
        var highlightDataIndexes = extend([], this.highlightDataIndexes, null, true);
        if (this.styleId.indexOf('highlight') > 0 && highlightDataIndexes.length > 0) {
            this.removeSelectedElements(chart, this.highlightDataIndexes, chart.series);
            selectedDataIndexes = highlightDataIndexes;
        }
        else {
            this.removeSelectedElements(chart, this.selectedDataIndexes, chart.series);
        }
        this.blurEffect(chart.element.id, chart.visibleSeries, false);
        this.selectDataIndex(chart, selectedDataIndexes);
    };
    /**
     * Handles selection on legend item click.
     *
     * @param {Chart} chart - The chart instance.
     * @param {number} series - The index of the series.
     * @param {Element} targetElement - The target element clicked.
     * @param {string} eventType - The type of event triggered.
     * @returns {void}
     */
    Selection.prototype.legendSelection = function (chart, series, targetElement, eventType) {
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
            this.currentMode = this.chart.highlightMode;
        }
        var isPreSelected = this.isAlreadySelected(targetElement, eventType);
        if (isPreSelected) {
            var seriesStyle = this.generateStyle(chart.visibleSeries[series]);
            var selectedElements = (document.querySelectorAll('.' + seriesStyle));
            this.isSeriesMode = this.currentMode === 'Series';
            var isBlurEffectNeeded = true;
            if (selectedElements.length > 0) {
                this.removeSelection(chart, series, selectedElements, seriesStyle, isBlurEffectNeeded);
            }
            else {
                for (var _i = 0, _a = chart.visibleSeries; _i < _a.length; _i++) {
                    var element = _a[_i];
                    if (element.index !== series && !chart.isMultiSelect) {
                        seriesStyle = this.generateStyle(chart.visibleSeries[element.index]);
                        selectedElements = document.querySelectorAll('.' + seriesStyle);
                        this.removeSelection(chart, series, selectedElements, seriesStyle, isBlurEffectNeeded);
                    }
                }
                var seriesElements = [];
                if (this.rangeColorMappingEnabled()) {
                    for (var i = 0, a = chart.visibleSeries[0].seriesElement.children; i < a.length; i++) {
                        var point = a[i];
                        if (targetElement.getAttribute('fill') === point.getAttribute('fill')) {
                            if (chart.visibleSeries[0].marker.dataLabel.visible) {
                                var pointIndex = this.indexFinder(point.id).point;
                                if (!isNaN(pointIndex) && pointIndex >= 0) {
                                    var dataLabel = document.getElementById(this.chart.element.id + "_Series_0_Point_" + pointIndex + "_Text_0");
                                    var dataLabelBorder = document.getElementById(this.chart.element.id + "_Series_0_Point_" + pointIndex + "_TextShape_0");
                                    if (dataLabel) {
                                        seriesElements.push(dataLabel);
                                    }
                                    if (dataLabelBorder) {
                                        seriesElements.push(dataLabelBorder);
                                    }
                                }
                            }
                            seriesElements.push(point);
                        }
                    }
                    for (var _b = 0, seriesElements_1 = seriesElements; _b < seriesElements_1.length; _b++) {
                        var element = seriesElements_1[_b];
                        if (isNullOrUndefined(element)) {
                            return;
                        }
                        this.checkSelectionElements(element, seriesStyle, false, true, series);
                    }
                }
                else {
                    if (chart.visibleSeries[series].visible) {
                        seriesElements = this.getSeriesElements(chart.visibleSeries[series]);
                        for (var _c = 0, seriesElements_2 = seriesElements; _c < seriesElements_2.length; _c++) {
                            var seriesElement = seriesElements_2[_c];
                            if (isNullOrUndefined(seriesElement)) {
                                return;
                            }
                            this.checkSelectionElements(seriesElement, seriesStyle, false, true, series);
                        }
                    }
                }
                this.isSeriesMode = true;
                this.selection(chart, new Index(series, NaN), seriesElements);
                this.isSeriesMode = chart.selectionMode === 'Series';
                this.blurEffect(chart.element.id, chart.visibleSeries, true, series);
            }
        }
    };
    /**
     * Checks if range color mapping is enabled for the chart.
     *
     * @returns {boolean} - Returns true if range color mapping is enabled, otherwise false.
     */
    Selection.prototype.rangeColorMappingEnabled = function () {
        if ((this.chart.rangeColorSettings && this.chart.rangeColorSettings.length > 0 && this.chart.visibleSeries.length === 1 &&
            this.chart.rangeColorSettings[0].colors.length > 0 &&
            (this.chart.series[0].type === 'Column' || this.chart.series[0].type === 'Bar' ||
                this.chart.series[0].type === 'Scatter' || this.chart.series[0].type === 'Bubble'))) {
            return true;
        }
        else {
            return false;
        }
    };
    Selection.prototype.removeSelection = function (chart, series, selectedElements, seriesStyle, isBlurEffectNeeded) {
        if (selectedElements.length > 0) {
            var elements = [];
            for (var i = 0; i < selectedElements.length; i++) {
                elements.push(selectedElements[i]);
            }
            this.removeStyles(elements);
            this.isSeriesMode = true;
            this.addOrRemoveIndex(this.selectedDataIndexes, new Index(series, NaN));
            for (var _i = 0, _a = chart.visibleSeries; _i < _a.length; _i++) {
                var value = _a[_i];
                seriesStyle = this.generateStyle(value);
                if (document.querySelectorAll('.' + seriesStyle).length > 0) {
                    for (var _b = 0, elements_3 = elements; _b < elements_3.length; _b++) {
                        var element = elements_3[_b];
                        this.checkSelectionElements(element, seriesStyle, true, true, series);
                    }
                    isBlurEffectNeeded = false;
                    break;
                }
            }
            if (isBlurEffectNeeded) {
                this.isSeriesMode = chart.selectionMode === 'Series';
                this.blurEffect(chart.element.id, chart.visibleSeries);
            }
        }
    };
    /**
     * Retrieves the SVG elements associated with a particular series in the chart.
     *
     * @param {SeriesModel} series - The series for which to retrieve the SVG elements.
     * @returns {Element[]} - An array of SVG elements representing the series.
     */
    Selection.prototype.getSeriesElements = function (series) {
        var seriesElements = [series.seriesElement];
        if (series.marker.visible && series.type !== 'Scatter' && series.type !== 'Bubble' && !series.isRectSeries) {
            seriesElements.push(series.symbolElement);
        }
        else if (series.marker.visible && series.isRectSeries) {
            seriesElements.push(series.symbolElement);
        }
        if (series.marker.dataLabel.visible) {
            seriesElements.push(series.textElement);
            seriesElements.push(series.shapeElement);
        }
        return seriesElements;
    };
    /**
     * Finds the index associated with a particular element ID.
     *
     * @param {string} id - The ID of the element to find the index for.
     * @returns {Index} - The index associated with the element ID.
     */
    Selection.prototype.indexFinder = function (id) {
        var ids = ['NaN', 'NaN'];
        if (id.indexOf('SeriesGroup') > -1) {
            ids = id.split('SeriesGroup');
            ids[0] = ids[1];
        }
        else if (id.indexOf('SymbolGroup') > -1) {
            ids = id.split('SymbolGroup');
            ids[0] = ids[1];
        }
        else if (id.indexOf('_Point_') > -1) {
            ids = id.split('_Series_')[1].split('_Point_');
        }
        else if (id.indexOf('_border_') > -1) {
            ids[0] = id.split('_border_')[1];
        }
        else if (id.indexOf('_Series_') > -1) {
            ids[0] = id.split('_Series_')[1];
        }
        else if (id.indexOf('_chart_legend_shape_') > -1) {
            ids = id.split('_chart_legend_shape_');
            ids[0] = ids[1];
        }
        else if (id.indexOf('TextGroup') > -1) {
            ids = id.split('TextGroup');
            ids[0] = ids[1];
        }
        else if (id.indexOf('ShapeGroup') > -1) {
            ids = id.split('ShapeGroup');
            ids[0] = ids[1];
        }
        return new Index(parseInt(ids[0], 10), parseInt(ids[1], 10));
    };
    /**
     * Calculates the elements selected by dragging a rectangle on the chart.
     *
     * @param {Chart} chart - The chart instance.
     * @param {Rect} dragRect - The rectangle representing the selection area.
     * @param {boolean} isClose - Flag indicating whether the selection should be close.
     * @returns {void}
     */
    Selection.prototype.calculateDragSelectedElements = function (chart, dragRect, isClose) {
        this.removeSelectedElements(chart, this.selectedDataIndexes, chart.series);
        var isLasso = chart.selectionMode === 'Lasso';
        var rect = new Rect(dragRect.x, dragRect.y, dragRect.width, dragRect.height);
        var axisOffset = new ChartLocation(chart.chartAxisLayoutPanel.seriesClipRect.x, chart.chartAxisLayoutPanel.seriesClipRect.y);
        this.removeOffset(rect, axisOffset);
        var points;
        var index;
        var selectedPointValues = [];
        var selectedSeriesValues = [];
        this.isSeriesMode = false;
        var isDragResize = (chart.allowMultiSelection) && (this.rectGrabbing || this.resizing);
        this.rectPoints = this.dragRectArray[isDragResize ? this.targetIndex : this.count] =
            new Rect(dragRect.x, dragRect.y, dragRect.width, dragRect.height);
        if (dragRect.width && dragRect.height && !isClose) {
            var rt = new Rect(dragRect.x, dragRect.y, dragRect.width, dragRect.height);
            this.removeOffset(rt, axisOffset);
            this.filterArray[isDragResize ? this.targetIndex : this.count] = rt;
        }
        var _loop_1 = function (series) {
            if (series.visible) {
                points = series.points;
                selectedPointValues = [];
                var xAxisOffset_1;
                var yAxisOffset_1;
                if ((chart.isTransposed || series.type.indexOf('Bar') !== -1) &&
                    !(chart.isTransposed && series.type.indexOf('Bar') !== -1)) {
                    xAxisOffset_1 = series.xAxis.rect.y - axisOffset.y;
                    yAxisOffset_1 = series.yAxis.rect.x - axisOffset.x;
                }
                else {
                    xAxisOffset_1 = series.xAxis.rect.x - axisOffset.x;
                    yAxisOffset_1 = series.yAxis.rect.y - axisOffset.y;
                }
                for (var j = 0; j < points.length; j++) {
                    var yValue = (series.type !== 'RangeArea' || series.type.indexOf('SplineRangeArea') > -1 || series.type.indexOf('RangeStepArea') > -1) ? points[j].yValue :
                        points[j].regions[0].y;
                    var isCurrentPoint = void 0;
                    var selectedPointX = points[j].xValue;
                    if (chart.primaryXAxis.valueType === 'Category') {
                        selectedPointX = points[j].x.toLocaleString();
                    }
                    else if (chart.primaryXAxis.valueType === 'DateTime') {
                        selectedPointX = new Date(points[j].xValue);
                    }
                    if (series.type === 'BoxAndWhisker') {
                        isCurrentPoint = points[j].regions.some(function (region) {
                            return withInBounds(region.x + xAxisOffset_1, region.y + yAxisOffset_1, rect);
                        });
                    }
                    else {
                        if (chart.selectionMode === 'Lasso') {
                            isCurrentPoint = points[j].isSelect;
                        }
                        else {
                            isCurrentPoint = (chart.allowMultiSelection) ?
                                this_1.isPointSelect(points[j], xAxisOffset_1, yAxisOffset_1, this_1.filterArray) :
                                points[j].symbolLocations.some(function (location) {
                                    return location && withInBounds(location.x + xAxisOffset_1, location.y + yAxisOffset_1, rect);
                                });
                        }
                    }
                    if (isCurrentPoint && series.category !== 'Indicator') {
                        index = new Index(series.index, points[j].index);
                        this_1.selection(chart, index, this_1.findElements(chart, series, index, '', !series.isRectSeries ? series.marker.visible : false));
                        selectedPointValues.push({ x: selectedPointX, y: yValue });
                    }
                    if (isCurrentPoint && (series.type === 'RangeArea' || series.type === 'SplineRangeArea' || series.type === 'RangeStepArea')) {
                        selectedPointValues.push({ x: selectedPointX, y: points[j].regions[0].y });
                    }
                }
                selectedSeriesValues.push(selectedPointValues);
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = chart.visibleSeries; _i < _a.length; _i++) {
            var series = _a[_i];
            _loop_1(series);
        }
        this.blurEffect(chart.element.id, chart.visibleSeries);
        var x = isLasso ? chart.mouseDownX : (dragRect.x + dragRect.width);
        var y = isLasso ? chart.mouseDownY : dragRect.y;
        if (!isClose) {
            this.createCloseButton(x, y);
        }
        var args = {
            name: dragComplete,
            selectedDataValues: selectedSeriesValues,
            cancel: false
        };
        chart.trigger(dragComplete, args);
    };
    Selection.prototype.removeOffset = function (rect, clip) {
        rect.x -= clip.x;
        rect.y -= clip.y;
    };
    Selection.prototype.isPointSelect = function (points, xAxisOffset, yAxisOffset, rectCollection) {
        var location = points.symbolLocations[0];
        for (var _i = 0, rectCollection_1 = rectCollection; _i < rectCollection_1.length; _i++) {
            var rect = rectCollection_1[_i];
            if (rect && location && withInBounds(location.x + xAxisOffset, location.y + yAxisOffset, rect)) {
                return true;
            }
        }
        return false;
    };
    /**
     * Draws the dragging rectangle on the chart.
     *
     * @param {Chart} chart - The chart instance.
     * @param {Rect} dragRect - The rectangle representing the dragging area.
     * @returns {void}
     */
    Selection.prototype.drawDraggingRect = function (chart, dragRect) {
        var cartesianLayout = chart.chartAxisLayoutPanel.seriesClipRect;
        var border = chart.chartArea.border.width;
        var rectFill = chart.themeStyle.selectionRectFill;
        var rectStroke = chart.themeStyle.selectionRectStroke;
        var isLasso = chart.selectionMode === 'Lasso';
        if (this.isdrawRect) {
            cartesianLayout.x = cartesianLayout.x - border / 2;
            cartesianLayout.y = cartesianLayout.y - border / 2;
            cartesianLayout.width = cartesianLayout.width + border;
            cartesianLayout.height = cartesianLayout.height + border;
            this.isdrawRect = false;
        }
        switch (chart.selectionMode) {
            case 'DragX':
                dragRect.y = cartesianLayout.y;
                dragRect.height = cartesianLayout.height;
                break;
            case 'DragY':
                dragRect.x = cartesianLayout.x;
                dragRect.width = cartesianLayout.width;
                break;
        }
        if ((dragRect.width < 5 || dragRect.height < 5) && !isLasso) {
            return null;
        }
        var isDragMode = chart.selectionMode.indexOf('Drag') > -1 || chart.selectionMode === 'Lasso';
        if ((chart.allowMultiSelection) && isDragMode) {
            var element = void 0;
            var dragGroup = void 0;
            var multiGroup = getElement(this.multiRectGroup);
            if (!multiGroup) {
                multiGroup = chart.svgRenderer.createGroup({ id: this.multiRectGroup });
                chart.svgObject.appendChild(multiGroup);
            }
            if (this.rectGrabbing || this.resizing) {
                var rectElement = getElement(this.draggedRect + this.targetIndex);
                if (rectElement.nextSibling) {
                    remove(rectElement.nextSibling);
                }
                this.setAttributes(rectElement, dragRect);
            }
            else if (!getElement(this.draggedRectGroup + this.count)) {
                dragGroup = chart.svgRenderer.createGroup({ id: this.draggedRectGroup + this.count });
                var svgElement = document.getElementById(chart.element.id + '_series_svg');
                if (chart.enableCanvas) {
                    svgElement.appendChild(dragGroup);
                }
                else {
                    multiGroup.appendChild(dragGroup);
                }
                // chart.enableCanvas ? svgElement.appendChild(dragGroup) : multiGroup.appendChild(dragGroup);
            }
            if (!(chart.selectionMode === 'Lasso')) {
                element = chart.svgRenderer.drawRectangle(new RectOption(this.draggedRect + this.count, rectFill, { color: rectStroke, width: 1 }, 1, dragRect, 0, 0, '', chart.theme.indexOf('Fluent2') < 1 ? '3' : ''));
                element.style.cursor = 'move';
            }
            else {
                element = chart.svgRenderer.drawPath(new PathOption(this.lassoPath + this.count, rectFill, 3, rectStroke, 1, '', this.path));
            }
            if (!dragGroup && !this.rectGrabbing && !this.resizing) {
                getElement(this.draggedRectGroup + this.count).appendChild(element);
            }
            else if (!this.rectGrabbing && !this.resizing) {
                dragGroup.appendChild(element);
            }
        }
        else {
            var element = isLasso ?
                getElement(this.lassoPath) : getElement(this.draggedRect);
            if (this.closeIcon) {
                removeElement(this.closeIconId);
            }
            if (element) {
                if (isLasso) {
                    element.setAttribute('d', this.path);
                }
                else {
                    this.setAttributes(element, dragRect);
                }
            }
            else {
                var dragGroup = chart.svgRenderer.createGroup({ id: this.draggedRectGroup });
                var svgElement = document.getElementById(chart.element.id + '_series_svg');
                if (chart.enableCanvas) {
                    svgElement.appendChild(dragGroup);
                }
                else {
                    chart.svgObject.appendChild(dragGroup);
                }
                // chart.enableCanvas ? svgElement.appendChild(dragGroup) : chart.svgObject.appendChild(dragGroup);
                if (!(chart.selectionMode === 'Lasso')) {
                    element = chart.svgRenderer.drawRectangle(new RectOption(this.draggedRect, rectFill, { color: rectStroke, width: 1 }, 1, dragRect, 0, 0, '', chart.theme.indexOf('Fluent2') < 1 ? '3' : ''));
                }
                else {
                    element = chart.svgRenderer.drawPath(new PathOption(this.lassoPath, rectFill, 3, rectStroke, 1, '', this.path));
                }
                //element.setAttribute('style', 'cursor:move;');
                dragGroup.appendChild(element);
            }
        }
    };
    /**
     * Retrieves the index of a particular item based on its identifier.
     *
     * @param {string} id - The identifier of the item.
     * @returns {number} - The index of the item, or -1 if not found.
     */
    Selection.prototype.getIndex = function (id) {
        var i;
        for (i = id.length - 1; i > 0; i--) {
            var x = Number(id[i]);
            if (!isNaN(x)) {
                continue;
            }
            else {
                break;
            }
        }
        var index = +id.substr(i + 1, id.length - 1);
        return index;
    };
    Selection.prototype.createCloseButton = function (x, y) {
        var isMultiDrag = this.chart.allowMultiSelection;
        var circleStroke = this.chart.themeStyle.selectionCircleStroke;
        var isDrag = this.rectGrabbing || this.resizing;
        var closeIcon = this.chart.svgRenderer.createGroup({
            id: this.closeIconId + (isMultiDrag ? (isDrag ? this.targetIndex : this.count) : ''),
            style: 'cursor:pointer; visibility: visible;'
        });
        closeIcon.appendChild(this.chart.svgRenderer.drawCircle(new CircleOption(this.closeIconId + '_circle' + (isMultiDrag ? (isDrag ? this.targetIndex : this.count) : ''), '#FFFFFF', { color: circleStroke, width: 1 }, 1, x, y, 10)));
        var direction = 'M ' + (x - 4) + ' ' + (y - 4) + ' L ' + (x + 4) + ' ' + (y + 4) + ' M ' + (x - 4) + ' ' + (y + 4) +
            ' L ' + (x + 4) + ' ' + (y - 4);
        closeIcon.appendChild(this.chart.svgRenderer.drawPath({
            id: this.closeIconId + '_cross' +
                (isMultiDrag ? (isDrag ? this.targetIndex : this.count) : ''), d: direction,
            stroke: circleStroke, 'stroke-width': 2, fill: circleStroke
        }));
        this.closeIcon = closeIcon;
        var pathElement = getElement(this.draggedRectGroup + (isMultiDrag ? (isDrag ? this.targetIndex : this.count) : ''));
        if (pathElement) {
            pathElement.appendChild(closeIcon);
        }
    };
    /**
     * Method to remove dragged element.
     *
     * @returns {void}
     * @private
     */
    Selection.prototype.removeDraggedElements = function (chart, targetElement, eventType) {
        if ((targetElement.id && targetElement.id.indexOf(this.closeIconId) > -1) && (eventType.indexOf('move') === -1)) {
            var isSelectedvalues = true;
            if ((chart.allowMultiSelection)) {
                var index = this.getIndex(targetElement.id);
                var multiRectGroupElement = getElement(this.multiRectGroup);
                remove(getElement(this.draggedRectGroup + index));
                this.dragRectArray[index] = null;
                this.filterArray[index] = null;
                this.totalSelectedPoints[index] = null;
                if (multiRectGroupElement && multiRectGroupElement.childElementCount === 0) {
                    removeElement(multiRectGroupElement);
                    this.dragRectArray = [];
                    this.filterArray = [];
                    this.totalSelectedPoints = [];
                }
                if (this.currentMode === 'Lasso') {
                    if (this.multiDataIndexes[index] != null) {
                        for (var i = 0; i < this.multiDataIndexes[index].length; i++) {
                            this.multiDataIndexes[index][i].isSelect = false;
                        }
                    }
                    this.multiDataIndexes[index] = null;
                    for (var j = 0; j < this.multiDataIndexes.length; j++) {
                        if (this.multiDataIndexes[j] != null) {
                            isSelectedvalues = false;
                            for (var k = 0; k < this.multiDataIndexes[j].length; k++) {
                                this.multiDataIndexes[j][k].isSelect = true;
                            }
                        }
                    }
                    this.calculateDragSelectedElements(chart, this.dragRect, true);
                }
                else if (this.filterArray.length) {
                    for (var i = 0; i < this.filterArray.length; i++) {
                        if (this.filterArray[i]) {
                            isSelectedvalues = false;
                            this.calculateDragSelectedElements(chart, this.filterArray[i], true);
                        }
                    }
                }
                else {
                    this.calculateDragSelectedElements(chart, new Rect(0, 0, 0, 0), true);
                }
            }
            else {
                remove(getElement(this.draggedRectGroup));
                this.removeSelectedElements(chart, this.selectedDataIndexes, chart.series);
            }
            this.blurEffect(chart.element.id, chart.visibleSeries);
            this.changeCursorStyle(false, chart.svgObject, 'auto');
            if (!(chart.allowMultiSelection) || isSelectedvalues) {
                this.rectPoints = null;
            }
        }
    };
    /**
     * Updates the selection rectangle during resizing.
     *
     * @param {Chart} chart - The chart instance.
     * @param {ChartLocation} location - The location of the resizing action.
     * @param {boolean} [tapped=false] - Indicates whether the resizing action was initiated by tapping.
     * @param {Element} [target] - The target element of the resizing action.
     * @returns {void}
     */
    Selection.prototype.resizingSelectionRect = function (chart, location, tapped, target) {
        var rect;
        if (((chart.allowMultiSelection) && (target.id.indexOf('_ej2_drag_rect') > -1)) ||
            this.dragRectArray[this.targetIndex]) {
            if (target.id.indexOf('_ej2_drag_rect') > -1) {
                this.targetIndex = this.getIndex(target.id);
            }
            var r = this.dragRectArray[this.targetIndex];
            rect = new Rect(r.x, r.y, r.width, r.height);
        }
        if (!(chart.allowMultiSelection)) {
            rect = new Rect(this.rectPoints.x, this.rectPoints.y, this.rectPoints.width, this.rectPoints.height);
        }
        if (rect) {
            var resize = this.findResizeMode(chart.svgObject, rect, location);
            if (this.resizing) {
                rect = getDraggedRectLocation(rect.x, rect.y, (rect.x + rect.width), (rect.y + rect.height), chart.chartAxisLayoutPanel.seriesClipRect);
                this.drawDraggingRect(chart, rect);
                this.dragRect = rect;
            }
            if (tapped) {
                this.resizing = resize;
            }
        }
        else {
            return;
        }
    };
    Selection.prototype.findResizeMode = function (chartSvgObject, rect, location) {
        var cursorStyle = 'se-resize';
        var resize = false;
        if (!this.resizing) {
            var resizeEdges = [new Rect(rect.x, (rect.y), rect.width - 5, 5),
                new Rect((rect.x), rect.y, 5, rect.height),
                new Rect(rect.x, (rect.y + rect.height - 5), rect.width - 5, 5),
                new Rect((rect.x + rect.width - 5), rect.y + 5, 5, rect.height - 15),
                new Rect((rect.x + rect.width - 10), (rect.y + rect.height - 10), 10, 10)]; //corner
            for (var i = 0; i < resizeEdges.length; i++) {
                if (withInBounds(location.x, location.y, resizeEdges[i])) {
                    cursorStyle = (i === 4) ? cursorStyle : (i % 2 === 0) ? 'ns-resize' : 'ew-resize';
                    resize = true;
                    this.resizeMode = i;
                    break;
                }
            }
        }
        else {
            var x = rect.x;
            var y = rect.y;
            var width = (location.x - x);
            var height = (location.y - y);
            switch (this.resizeMode) {
                case 0:
                    height = Math.abs((rect.height + rect.y) - location.y);
                    rect.y = Math.min((rect.height + rect.y), location.y);
                    rect.height = height;
                    break;
                case 1:
                    width = Math.abs((rect.width + rect.x) - location.x);
                    rect.x = Math.min((rect.width + rect.x), location.x);
                    rect.width = width;
                    break;
                case 2:
                    rect.height = Math.abs(height);
                    rect.y = Math.min(location.y, y);
                    break;
                case 3:
                    rect.width = Math.abs(width);
                    rect.x = Math.min(location.x, x);
                    break;
                case 4:
                    rect.width = Math.abs(width);
                    rect.height = Math.abs(height);
                    rect.x = Math.min(location.x, x);
                    rect.y = Math.min(location.y, y);
                    break;
            }
        }
        if (this.currentMode !== 'Lasso') {
            this.changeCursorStyle(resize, getElement((this.chart.allowMultiSelection) ? this.draggedRect +
                this.targetIndex : this.draggedRect), cursorStyle);
        }
        this.changeCursorStyle(resize, chartSvgObject, cursorStyle);
        return resize;
    };
    Selection.prototype.changeCursorStyle = function (isResize, rectelement, cursorStyle) {
        cursorStyle = isResize ? cursorStyle : (this.control.svgObject === rectelement) ? 'auto' : 'move';
        if (rectelement) {
            rectelement.style.cursor = cursorStyle;
        }
    };
    Selection.prototype.removeSelectedElements = function (chart, index, seriesCollection) {
        index = chart.isRedrawSelection ? index : index.splice(0, index.length); // No need to remove selected indexes while redrawing
        var seriesElements;
        for (var _i = 0, seriesCollection_1 = seriesCollection; _i < seriesCollection_1.length; _i++) {
            var series = seriesCollection_1[_i];
            if (series.visible) {
                seriesElements = this.getSeriesElements(series);
                this.removeStyles(seriesElements);
                for (var _a = 0, seriesElements_3 = seriesElements; _a < seriesElements_3.length; _a++) {
                    var seriesElement = seriesElements_3[_a];
                    this.removeStyles(this.getChildren(seriesElement));
                }
            }
        }
    };
    Selection.prototype.setAttributes = function (ele, object) {
        var keys = Object.keys(object);
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            ele.setAttribute(key, object[key]);
        }
    };
    /**
     * Updates the position of the dragged rectangle.
     *
     * @param {Chart} chart - The chart instance.
     * @param {Rect} grabbedPoint - The rectangle representing the grabbed point.
     * @param {boolean} [doDrawing=false] - Indicates whether to redraw the dragging rectangle.
    //  * @param {Element} [target] - The target element related to the dragging action.
     * @returns {void}
     */
    Selection.prototype.draggedRectMoved = function (chart, grabbedPoint, doDrawing) {
        var rect;
        if ((this.resizing || this.rectGrabbing) && (chart.allowMultiSelection)) {
            var r = this.dragRectArray[this.targetIndex];
            rect = new Rect(r.x, r.y, r.width, r.height);
        }
        else {
            rect = new Rect(this.rectPoints.x, this.rectPoints.y, this.rectPoints.width, this.rectPoints.height);
        }
        rect.x -= (grabbedPoint.x - chart.mouseX);
        rect.y -= (grabbedPoint.y - chart.mouseY);
        rect = getDraggedRectLocation(rect.x, rect.y, rect.x + rect.width, rect.height + rect.y, chart.chartAxisLayoutPanel.seriesClipRect);
        if (doDrawing) {
            this.drawDraggingRect(chart, rect);
        }
        else {
            this.calculateDragSelectedElements(chart, rect);
        }
    };
    Selection.prototype.mouseLeave = function (event) {
        this.completeSelection(event.target, event.type);
    };
    /**
     * Completes the selection process.
     *
     * @param {HTMLElement} target - The target element where the selection is completed.
     * @param {string} eventType - The type of event that triggered the selection completion.
     * @returns {void}
     */
    Selection.prototype.completeSelection = function (target, eventType) {
        var chart = this.chart;
        if (chart.selectionMode === 'None') {
            return;
        }
        this.currentMode = chart.selectionMode;
        if ((this.dragging || this.resizing) && this.dragRect.width > 5 && this.dragRect.height > 5) {
            this.calculateDragSelectedElements(chart, this.dragRect);
        }
        else if (!(chart.allowMultiSelection) && this.rectGrabbing &&
            this.rectPoints.width && this.rectPoints.height) {
            this.draggedRectMoved(chart, this.dragRect);
        }
        else if (this.rectGrabbing && this.dragRectArray[this.targetIndex].width && this.dragRectArray[this.targetIndex].height) {
            this.draggedRectMoved(chart, this.dragRect);
        }
        if (chart.selectionMode === 'Lasso' && this.dragging && this.path) {
            if (this.path.indexOf('L') !== -1) {
                if (!(chart.allowMultiSelection)) {
                    getElement(this.lassoPath).setAttribute('d', this.path + 'Z');
                    this.pointChecking(getElement(this.lassoPath));
                }
                else if (getElement(this.lassoPath + this.count)) {
                    getElement(this.lassoPath + this.count).setAttribute('d', this.path + 'Z');
                    this.pointChecking(getElement(this.lassoPath + this.count));
                }
                if (this.dragging || this.resizing) {
                    this.calculateDragSelectedElements(chart, this.dragRect);
                }
            }
        }
        this.dragging = false;
        this.rectGrabbing = false;
        this.resizing = false;
        this.removeDraggedElements(chart, target, eventType);
    };
    Selection.prototype.getDragRect = function (chart, seriesClipRect) {
        return getDraggedRectLocation(chart.mouseDownX, chart.mouseDownY, chart.mouseX, chart.mouseY, seriesClipRect);
    };
    /**
     * Initiates the drag operation.
     *
     * @param {Chart} chart - The chart instance where the drag operation is initiated.
     * @param {Rect} seriesClipRect - The clipping rectangle of the series.
     * @param {number} mouseDownX - The X-coordinate where the mouse was pressed down.
     * @param {number} mouseDownY - The Y-coordinate where the mouse was pressed down.
     * @param {Event} event - The event object associated with the mouse down event.
     * @returns {void}
     */
    Selection.prototype.dragStart = function (chart, seriesClipRect, mouseDownX, mouseDownY, event) {
        var mode = chart.selectionMode;
        this.currentMode = chart.selectionMode;
        this.dragging = (mode.indexOf('Drag') > -1 || mode === 'Lasso') && (chart.isDoubleTap || !chart.isTouch) &&
            chart.chartAreaType !== 'PolarRadar';
        var target = event.target;
        this.path = undefined;
        if (this.dragging) {
            this.count = getElement(this.multiRectGroup) ? (this.count + 1) : 0;
            this.dragRect = new Rect(chart.mouseDownX, chart.mouseDownY, 0, 0);
            if (chart.mouseDownX < seriesClipRect.x || chart.mouseDownX > (seriesClipRect.x + seriesClipRect.width) ||
                chart.mouseDownY < seriesClipRect.y || chart.mouseDownY > (seriesClipRect.y + seriesClipRect.height)) {
                this.dragging = false;
            }
        }
        if (mode === 'Lasso') {
            for (var _i = 0, _a = chart.visibleSeries; _i < _a.length; _i++) {
                var series = _a[_i];
                if (series.visible) {
                    for (var _b = 0, _c = series.points; _b < _c.length; _b++) {
                        var point = _c[_b];
                        if (!(chart.allowMultiSelection)) {
                            point.isSelect = false;
                        }
                    }
                }
            }
        }
        if (!(mode === 'Lasso')) {
            if (this.rectPoints && !(chart.allowMultiSelection)) {
                this.dragRect = new Rect(chart.mouseDownX, chart.mouseDownY, 0, 0);
                this.resizingSelectionRect(chart, new ChartLocation(mouseDownX, mouseDownY), true);
                this.rectGrabbing = withInBounds(mouseDownX, mouseDownY, this.rectPoints);
            }
            if ((chart.allowMultiSelection)) {
                var index = this.getIndex(target.id);
                this.targetIndex = this.isDragRect(target.id) ? index : undefined;
                if (this.dragRectArray.length && this.isDragRect(target.id)) {
                    this.resizingSelectionRect(chart, new ChartLocation(mouseDownX, mouseDownY), true, target);
                    this.rectGrabbing = withInBounds(mouseDownX, mouseDownY, this.dragRectArray[index]);
                }
            }
        }
    };
    Selection.prototype.isDragRect = function (id) {
        return id.indexOf('_ej2_drag_rect') > -1;
    };
    /**
     * Handles the mouse move event.
     *
     * @param {PointerEvent | TouchEvent} event - The pointer event or touch event associated with the mouse move.
     * @returns {void}
     */
    Selection.prototype.mouseMove = function (event) {
        var chart = this.chart;
        var target = event.target;
        var eventType = event.type;
        this.highlightChart(target, eventType);
        if (chart.selectionMode === 'None') {
            return;
        }
        if (eventType === 'touchmove' && (Browser.isIos || Browser.isIos7) && this.dragging && event.preventDefault) {
            event.preventDefault();
        }
        this.selectionAndDrag(chart, target, eventType);
    };
    /**
     * Highlights the specified chart element.
     *
     * @param {Element} target - The target element to highlight.
     * @param {string} eventType - The type of event triggering the highlighting.
     * @returns {void}
     */
    Selection.prototype.highlightChart = function (target, eventType) {
        if (this.chart.highlightMode !== 'None' || this.chart.legendSettings.enableHighlight) {
            if (!isNullOrUndefined(target)) {
                if (target.id.indexOf('_legend_text') > 1) {
                    target = getElement(target.id.replace('text', 'shape'));
                }
                if ((target).hasAttribute('class') && ((target).getAttribute('class').indexOf('highlight') > -1 ||
                    target.getAttribute('class').indexOf('selection') > -1)) {
                    return;
                }
                this.calculateSelectedElements(target, eventType);
                if (this.chart.highlightModule.highlightDataIndexes && this.chart.highlightModule.highlightDataIndexes.length > 0 &&
                    target.id.indexOf('_chart_legend_g_') === -1 && target.id.indexOf('chart_legend_shape') === -1 && target.id.indexOf('_Series_') === -1) {
                    this.removeLegendHighlightStyles();
                }
                else if (this.chart.highlightModule.highlightDataIndexes && this.chart.highlightModule.highlightDataIndexes.length > 0 &&
                    target.id.indexOf('_chart_legend_') === -1 && target.id.indexOf('_Series_') > -1 && this.chart.tooltip && this.chart.tooltip.enableHighlight && this.chart.highlightMode === 'None') {
                    this.removeLegendHighlightStyles(true);
                }
            }
            return;
        }
    };
    /**
     * Handles the selection and dragging functionality for the chart.
     *
     * @param {Chart} chart - The chart instance.
     * @param {Element} target - The target element involved in the selection or dragging action.
     * @param {string} eventType - The type of event triggering the selection or dragging action.
     * @returns {void}
     */
    Selection.prototype.selectionAndDrag = function (chart, target, eventType) {
        var insideMoving = withInBounds(chart.mouseX, chart.mouseY, chart.chartAxisLayoutPanel.seriesClipRect);
        if (insideMoving && !this.chart.enableCanvas) {
            if (this.rectGrabbing && !this.resizing) {
                this.draggedRectMoved(chart, this.dragRect, true);
            }
            else if (this.dragging && !this.resizing) {
                if (chart.selectionMode === 'Lasso') {
                    this.getPath(chart.mouseDownX, chart.mouseDownY, chart.mouseX, chart.mouseY);
                    this.drawDraggingRect(chart, this.dragRect);
                }
                else {
                    this.dragRect = this.getDragRect(chart, chart.chartAxisLayoutPanel.seriesClipRect);
                    this.drawDraggingRect(chart, this.dragRect);
                }
            }
            if (this.rectPoints && !(chart.allowMultiSelection)) {
                this.resizingSelectionRect(chart, new ChartLocation(chart.mouseX, chart.mouseY), null, target);
            }
            else if (((chart.allowMultiSelection) && !this.dragging) || this.resizing) {
                this.resizingSelectionRect(chart, new ChartLocation(chart.mouseX, chart.mouseY), null, target);
            }
        }
        else {
            this.completeSelection(target, eventType);
        }
    };
    /**
     * Remove highlighted legend when not focused.
     * @param {boolean} tooltipHighlight - Specifies whether the tooltip highlighting is enabled.
     * @private
     * @returns {void}
     */
    Selection.prototype.removeLegendHighlightStyles = function (tooltipHighlight) {
        this.chart.highlightModule.highlightDataIndexes = [];
        var elementCollection;
        for (var i = 0; i < this.chart.visibleSeries.length; i++) {
            elementCollection = document.getElementsByClassName(this.generateStyle(this.chart.visibleSeries[i]));
            if (this.selectedDataIndexes.length === 0) {
                elementCollection = document.getElementsByClassName(this.generateStyle(this.chart.visibleSeries[i]));
                while (elementCollection.length > 0) {
                    var element = elementCollection[0];
                    if (element) {
                        this.removeSvgClass(element, element.getAttribute('class'));
                        if (element.id.indexOf('Group') > 0 && !this.chart.visibleSeries[i].isRectSeries) {
                            var seriesIndex = this.indexFinder(element.id);
                            for (var j = 0; j < element.children.length; j++) {
                                if (element.children[j].nodeName !== 'defs') {
                                    this.highlightAnimation(element.children[j], seriesIndex.series, tooltipHighlight ? 0 : 700, 0.3, !tooltipHighlight);
                                }
                            }
                        }
                    }
                }
                elementCollection = document.getElementsByClassName(this.unselected);
                while (elementCollection.length > 0) {
                    var element = elementCollection[0];
                    if (element) {
                        this.removeSvgClass(element, element.getAttribute('class'));
                        if (element.id !== '') {
                            this.highlightAnimation(element, this.chart.series.length === 1 ? 0 : this.indexFinder(element.id).series, tooltipHighlight ? 0 : 700, 0.3);
                        }
                    }
                }
            }
            else {
                elementCollection = document.getElementsByClassName(this.generateStyle(this.chart.visibleSeries[i]));
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
    Selection.prototype.getPath = function (startX, startY, endX, endY) {
        if (this.dragging) {
            if (this.path) {
                this.path = this.path + ' L' + endX + ' ' + endY;
            }
            else {
                this.path = 'M ' + startX + ' ' + startY;
            }
        }
    };
    /**
     * Performs a highlight animation on the specified HTML element.
     *
     * @param {HTMLElement} element - The HTML element to animate.
     * @param {number} index - The index to find the opacity value of the series.
     * @param {number} duration - The duration of the animation in milliseconds.
     * @param {number} startOpacity - The starting opacity value for the animation.
     * @param {boolean} strokeWidth - The starting opacity value for the animation.
     * @returns {void}
     */
    Selection.prototype.highlightAnimation = function (element, index, duration, startOpacity, strokeWidth) {
        var _this = this;
        var endOpacity;
        var endWidth;
        var startWidth = parseFloat(this.chart.visibleSeries[index].width.toString()) + 1;
        if (strokeWidth) {
            if (element.id.indexOf('border') !== -1 && this.chart.visibleSeries[index].border.width) {
                endWidth = parseFloat(this.chart.visibleSeries[index].border.width.toString());
            }
            else if (element.id.indexOf('Symbol') !== -1 && this.chart.visibleSeries[index].marker.border.width) {
                endWidth = parseFloat(this.chart.visibleSeries[index].marker.border.width.toString());
            }
            else {
                endWidth = parseFloat(this.chart.visibleSeries[index].width.toString());
            }
        }
        else {
            if (element.id.indexOf('border') !== -1) {
                endOpacity = 1;
            }
            else if (element.id.indexOf('Symbol') !== -1) {
                endOpacity = parseFloat(this.chart.visibleSeries[index].marker.opacity.toString());
            }
            else if (element.id.indexOf('legend_shape') !== -1) {
                endOpacity = parseFloat(this.chart.legendSettings.opacity.toString());
            }
            else {
                endOpacity = parseFloat(this.chart.visibleSeries[index].opacity.toString());
            }
            if (isNullOrUndefined(this.chart.selectionModule) && this.chart.selectionMode === 'None' && this.chart.highlightColor !== '') {
                startOpacity = 1;
            }
        }
        if (endOpacity || (strokeWidth && endWidth && startWidth)) {
            new Animation({}).animate(element, {
                duration: duration,
                progress: function (args) {
                    element.style.animation = '';
                    if (_this.chart.tooltip.enableHighlight && _this.chart.tooltipModule.svgTooltip) {
                        return;
                    }
                    var progress = args.timeStamp / args.duration;
                    if (strokeWidth) {
                        var currentWidth = startWidth + (endWidth - startWidth) * progress;
                        element.setAttribute('stroke-width', currentWidth.toString());
                    }
                    else {
                        var currentOpacity = startOpacity + (endOpacity - startOpacity) * progress;
                        element.setAttribute('opacity', currentOpacity.toString());
                    }
                },
                end: function () {
                    if (_this.chart.tooltip.enableHighlight && _this.chart.tooltipModule.svgTooltip) {
                        return;
                    }
                    if (strokeWidth) {
                        element.setAttribute('stroke-width', endWidth.toString());
                    }
                    else {
                        element.setAttribute('opacity', endOpacity.toString());
                    }
                }
            });
        }
    };
    /**
     * Stops the animation and sets opacity of the specified HTML element.
     *
     * @param {HTMLElement} element - The HTML element to stop the animation.
     * @param {number} index - The index to find the opacity value of the series.
     * @returns {void}
     */
    Selection.prototype.stopElementAnimation = function (element, index) {
        var endOpacity;
        if (element.id.indexOf('border') !== -1) {
            endOpacity = 1;
        }
        else if (element.id.indexOf('Symbol') !== -1) {
            endOpacity = parseFloat(this.chart.visibleSeries[index].marker.opacity.toString());
        }
        else {
            endOpacity = parseFloat(this.chart.visibleSeries[index].opacity.toString());
        }
        if (element.getAttribute('e-animate')) {
            Animation.stop(element);
        }
        element.setAttribute('opacity', endOpacity.toString());
    };
    Selection.prototype.pointChecking = function (path) {
        var _this = this;
        var chart = this.chart;
        var element;
        var svgRect = getElement(chart.svgId).getBoundingClientRect();
        var offsetX = chart.chartAxisLayoutPanel.seriesClipRect.x + Math.max(svgRect.left, 0);
        var offsetY = chart.chartAxisLayoutPanel.seriesClipRect.y + Math.max(svgRect.top, 0);
        this.multiDataIndexes[this.count] = [];
        for (var _i = 0, _a = chart.visibleSeries; _i < _a.length; _i++) {
            var series = _a[_i];
            series.points.filter(function (point) {
                // To check whether the point have symbol location value or not.
                if (point.symbolLocations && point.symbolLocations.length) {
                    element = document.elementFromPoint(point.symbolLocations[0].x + offsetX, point.symbolLocations[0].y + offsetY);
                }
                if (element === path) {
                    point.isSelect = true;
                    if ((_this.chart.allowMultiSelection) && _this.currentMode === 'Lasso') {
                        _this.multiDataIndexes[_this.count][_this.seriesIndex] = point;
                        _this.seriesIndex++;
                    }
                }
                else if (!(chart.allowMultiSelection)) {
                    point.isSelect = false;
                }
            });
        }
        this.seriesIndex = 0;
    };
    /**
     * Get module name.
     *
     * @private
     * @returns {string} - Returns the module name.
     */
    Selection.prototype.getModuleName = function () {
        return 'Selection';
    };
    /**
     * To destroy the selection.
     *
     * @returns {void}
     * @private
     */
    Selection.prototype.destroy = function () {
        this.removeEventListener();
        // Destroy method performed here
    };
    return Selection;
}(BaseSelection));
export { Selection };
