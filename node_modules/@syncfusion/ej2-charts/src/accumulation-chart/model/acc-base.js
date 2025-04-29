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
 * AccumulationChart base file
 */
import { Property, ChildProperty, Complex, createElement, Browser, animationMode, extend } from '@syncfusion/ej2-base';
import { isNullOrUndefined, getValue } from '@syncfusion/ej2-base';
import { DataManager } from '@syncfusion/ej2-data';
import { Border, Font, Animation, EmptyPointSettings, Connector, Accessibility } from '../../common/model/base';
import { Rect, PathOption, measureText } from '@syncfusion/ej2-svg-base';
import { stringToNumber, appendChildElement, subtractRect } from '../../common/utils/helper';
import { seriesRender, pointRender } from '../../common/model/constants';
import { getSeriesColor } from '../../common/model/theme';
import { getElement, firstToLowerCase } from '../../common/utils/helper';
import { BaseSelection } from '../../common/user-interaction/selection';
import { LegendOptions } from '../../common/legend/legend';
/**
 * Configures the annotation settings for an accumulation chart.
 * Annotations are used to highlight or provide additional information about specific points or regions in the accumulation chart.
 */
var AccumulationAnnotationSettings = /** @class */ (function (_super) {
    __extends(AccumulationAnnotationSettings, _super);
    function AccumulationAnnotationSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(null)
    ], AccumulationAnnotationSettings.prototype, "content", void 0);
    __decorate([
        Property('0')
    ], AccumulationAnnotationSettings.prototype, "x", void 0);
    __decorate([
        Property('0')
    ], AccumulationAnnotationSettings.prototype, "y", void 0);
    __decorate([
        Property('Pixel')
    ], AccumulationAnnotationSettings.prototype, "coordinateUnits", void 0);
    __decorate([
        Property('Chart')
    ], AccumulationAnnotationSettings.prototype, "region", void 0);
    __decorate([
        Property('Middle')
    ], AccumulationAnnotationSettings.prototype, "verticalAlignment", void 0);
    __decorate([
        Property('Center')
    ], AccumulationAnnotationSettings.prototype, "horizontalAlignment", void 0);
    __decorate([
        Property(null)
    ], AccumulationAnnotationSettings.prototype, "description", void 0);
    return AccumulationAnnotationSettings;
}(ChildProperty));
export { AccumulationAnnotationSettings };
/**
 * This class provides options to customize the appearance and behavior of data labels within a series.
 */
var AccumulationDataLabelSettings = /** @class */ (function (_super) {
    __extends(AccumulationDataLabelSettings, _super);
    function AccumulationDataLabelSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(false)
    ], AccumulationDataLabelSettings.prototype, "visible", void 0);
    __decorate([
        Property(true)
    ], AccumulationDataLabelSettings.prototype, "showZero", void 0);
    __decorate([
        Property(null)
    ], AccumulationDataLabelSettings.prototype, "name", void 0);
    __decorate([
        Property('transparent')
    ], AccumulationDataLabelSettings.prototype, "fill", void 0);
    __decorate([
        Property('Inside')
    ], AccumulationDataLabelSettings.prototype, "position", void 0);
    __decorate([
        Property(5)
    ], AccumulationDataLabelSettings.prototype, "rx", void 0);
    __decorate([
        Property(5)
    ], AccumulationDataLabelSettings.prototype, "ry", void 0);
    __decorate([
        Property(0)
    ], AccumulationDataLabelSettings.prototype, "angle", void 0);
    __decorate([
        Property(false)
    ], AccumulationDataLabelSettings.prototype, "enableRotation", void 0);
    __decorate([
        Complex({ width: null, color: null }, Border)
    ], AccumulationDataLabelSettings.prototype, "border", void 0);
    __decorate([
        Complex({ fontFamily: null, size: null, fontStyle: null, fontWeight: null, color: null }, Font)
    ], AccumulationDataLabelSettings.prototype, "font", void 0);
    __decorate([
        Complex({}, Connector)
    ], AccumulationDataLabelSettings.prototype, "connectorStyle", void 0);
    __decorate([
        Property(null)
    ], AccumulationDataLabelSettings.prototype, "template", void 0);
    __decorate([
        Property('')
    ], AccumulationDataLabelSettings.prototype, "format", void 0);
    __decorate([
        Property(null)
    ], AccumulationDataLabelSettings.prototype, "maxWidth", void 0);
    __decorate([
        Property('Ellipsis')
    ], AccumulationDataLabelSettings.prototype, "textOverflow", void 0);
    __decorate([
        Property('Normal')
    ], AccumulationDataLabelSettings.prototype, "textWrap", void 0);
    return AccumulationDataLabelSettings;
}(ChildProperty));
export { AccumulationDataLabelSettings };
/**
 * The `PieCenter` class provides options to set the center position for the Pie series in a chart.
 */
var PieCenter = /** @class */ (function (_super) {
    __extends(PieCenter, _super);
    function PieCenter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('50%')
    ], PieCenter.prototype, "x", void 0);
    __decorate([
        Property('50%')
    ], PieCenter.prototype, "y", void 0);
    return PieCenter;
}(ChildProperty));
export { PieCenter };
/**
 * The `AccPoints` class is used to define and manage the data points within a series of accumulation charts.
 *
 * @public
 */
var AccPoints = /** @class */ (function () {
    function AccPoints() {
        /** Accumulation point visibility. */
        this.visible = true;
        /** Accumulation point symbol location. */
        this.symbolLocation = null;
        /** @private */
        this.region = null;
        /** @private */
        this.labelRegion = null;
        /** @private */
        this.labelVisible = true;
        this.regions = null;
        /** @private */
        this.isExplode = false;
        /** @private */
        this.isClubbed = false;
        /** @private */
        this.isSliced = false;
        /** @private  */
        this.argsData = null;
        /** @private */
        this.isLabelUpdated = null;
        /** @private */
        this.initialLabelRegion = null;
    }
    return AccPoints;
}());
export { AccPoints };
/**
 * Configures the series in the accumulation chart.
 */
var AccumulationSeries = /** @class */ (function (_super) {
    __extends(AccumulationSeries, _super);
    function AccumulationSeries() {
        /**
         * Specifies the data source for the series. It can be an array of JSON objects, or an instance of DataManager.
         * ```html
         * <div id='Pie'></div>
         * ```
         * ```typescript
         * let dataManager: DataManager = new DataManager({
         *    url: 'https://services.syncfusion.com/js/production/api/orders'
         * });
         * let query: Query = new Query().take(5);
         * let pie: AccumulationChart = new AccumulationChart({
         * ...
         *     series: [{
         *        dataSource: dataManager,
         *        xName: 'CustomerID',
         *        yName: 'Freight',
         *        query: query
         *    }],
         * ...
         * });
         * pie.appendTo('#Pie');
         * ```
         *
         * @default ''
         */
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** @private */
        _this.points = [];
        /** @private */
        _this.clubbedPoints = [];
        /** @private */
        _this.sumOfPoints = 0;
        /** @private */
        _this.isRectSeries = true;
        /** @private */
        _this.clipRect = new Rect(0, 0, 0, 0);
        /** @private */
        _this.category = 'Series';
        /** @private */
        _this.rightSidePoints = [];
        /** @private */
        _this.leftSidePoints = [];
        return _this;
    }
    /**
     * To refresh the Datamanager for series.
     *
     * @private
     * @param {AccumulationChart} accumulation - The accumulation chart control.
     * @param {boolean} render - Specifies whether to render the accumulation chart after refreshing the DataManager.
     * @returns {void}
     */
    AccumulationSeries.prototype.refreshDataManager = function (accumulation, render) {
        var _this = this;
        this.accumulation = accumulation;
        this.radius = this.radius ? this.radius : (Browser.isDevice && this.dataLabel.position === 'Outside') ? '40%' : '80%';
        var dateSource = this.dataSource || accumulation.dataSource;
        if (!(dateSource instanceof DataManager) && isNullOrUndefined(this.query)) {
            this.dataManagerSuccess({ result: dateSource, count: dateSource.length }, accumulation, render);
            return;
        }
        var dataManager = this.dataModule.getData(this.dataModule.generateQuery().requiresCount());
        dataManager.then(function (e) { return _this.dataManagerSuccess(e, accumulation); });
    };
    /**
     * To get points on dataManager is success.
     *
     * @private
     * @param {Object} e - The data manager result object.
     * @param {Object} e.result - The result of the data manager process.
     * @param {number} e.count - The count of items in the result.
     * @param {AccumulationChart} accumulation - The accumulation chart control.
     * @param {boolean} render - Specifies whether to render the accumulation chart after retrieving the points.
     * @returns {void}
     */
    AccumulationSeries.prototype.dataManagerSuccess = function (e, accumulation, render) {
        if (render === void 0) { render = true; }
        var argsData = {
            name: seriesRender, series: this, data: e.result
        };
        accumulation.allowServerDataBinding = false;
        accumulation.trigger(seriesRender, argsData);
        this.resultData = e.result !== '' ? e.result : [];
        if (!accumulation.isBlazor && !render) {
            this.getPoints(this.resultData, accumulation); // To update datasource using onPropertyChanged method. incident id: 290690
        }
        if ((++accumulation.seriesCounts === accumulation.visibleSeries.length && render)
            || (window['Blazor'] && !render && accumulation.seriesCounts === 1)) {
            this.getPoints(this.resultData, accumulation);
            accumulation.refreshChart();
        }
    };
    /**
     * To find points from result data.
     *
     * @private
     * @param {Object} result - The result of the process.
     * @param {AccumulationChart} accumulation - The accumulation chart control.
     * @returns {void}
     */
    AccumulationSeries.prototype.getPoints = function (result, accumulation) {
        var length = Object.keys(result).length;
        this.sumOfPoints = 0;
        if (length === 0) {
            // fix for Pie datalabels are not removed for empty datasource
            this.points = [];
            return null;
        }
        this.findSumOfPoints(result);
        this.points = [];
        this.clubbedPoints = [];
        this.sumOfClub = 0;
        var point;
        var colors = this.palettes.length ? this.palettes : getSeriesColor(accumulation.theme);
        var clubValue = stringToNumber(this.groupTo, this.sumOfPoints);
        for (var i = 0; i < length; i++) {
            point = this.setPoints(result, i, colors, accumulation);
            if (!this.isClub(point, clubValue, i)) {
                if (isNullOrUndefined(point.y)) {
                    point.visible = false;
                }
                this.pushPoints(point, colors);
            }
            else {
                point.index = this.clubbedPoints.length;
                point.isExplode = true;
                this.clubbedPoints.push(point);
                point.isSliced = true;
            }
        }
        this.lastGroupTo = this.groupTo;
        if (this.sumOfClub > 0) {
            var clubPoint_1 = this.generateClubPoint();
            this.pushPoints(clubPoint_1, colors);
            var pointsLength_1 = this.points.length - 1;
            this.clubbedPoints.map(function (point) {
                point.index += pointsLength_1;
                point.color = clubPoint_1.color;
            });
        }
        if (this.clubbedPoints.length && this.explode && this.type === 'Pie'
            && (this.explodeAll || this.points[this.points.length - 1].index === this.explodeIndex)) {
            this.points.splice(this.points.length - 1, 1);
            this.points = this.points.concat(this.clubbedPoints);
        }
    };
    AccumulationSeries.prototype.generateClubPoint = function () {
        var clubPoint = new AccPoints();
        clubPoint.isClubbed = true;
        clubPoint.x = 'Others';
        clubPoint.y = this.sumOfClub;
        clubPoint.text = clubPoint.originalText = clubPoint.x + ': ' + this.sumOfClub;
        clubPoint.sliceRadius = '80%';
        return clubPoint;
    };
    /**
     * Method to set point index and color.
     *
     * @param {AccPoints} point - The point data.
     * @param {string[]} colors - The array of colors used in the accumulation chart.
     * @returns {void}
     */
    AccumulationSeries.prototype.pushPoints = function (point, colors) {
        point.index = this.points.length;
        point.isExplode = this.explodeAll || (point.index === this.explodeIndex);
        point.color = point.color || colors[point.index % colors.length];
        this.points.push(point);
    };
    /**
     * Method to find club point.
     *
     * @param {AccPoints} point - The point data.
     * @param {number} clubValue - The club value for accumulation chart.
     * @param {number} index - The index of the point in the data set.
     * @returns {boolean} - false
     */
    AccumulationSeries.prototype.isClub = function (point, clubValue, index) {
        if (!isNullOrUndefined(clubValue)) {
            if (this.groupMode === 'Value' && Math.abs(point.y) <= clubValue) {
                this.sumOfClub += Math.abs(point.y);
                return true;
            }
            else if (this.groupMode === 'Point' && index >= clubValue) {
                this.sumOfClub += Math.abs(point.y);
                return true;
            }
        }
        return false;
    };
    /**
     * Method to find sum of points in the series.
     *
     * @param {Object} result - The result of the process.
     * @returns {void}
     */
    AccumulationSeries.prototype.findSumOfPoints = function (result) {
        var length = Object.keys(result).length;
        for (var i = 0; i < length; i++) {
            if (!isNullOrUndefined(result[i]) && !isNullOrUndefined(result[i][this.yName])
                && !isNaN(result[i][this.yName])) {
                this.sumOfPoints += Math.abs(result[i][this.yName]);
            }
        }
    };
    /**
     * Method to set points x, y and text from data source.
     *
     * @param {Object} data - The data containing information for the points.
     * @param {number} i - The index of the current point in the data set.
     * @param {string[]} colors - The array of colors used in the accumulation chart.
     * @param {AccumulationChart} accumulation - The accumulation chart control.
     * @returns {AccPoints} - The point data retrieved from the specified index.
     */
    AccumulationSeries.prototype.setPoints = function (data, i, colors, accumulation) {
        var point = new AccPoints();
        point.x = getValue(this.xName, data[i]);
        point.y = getValue(this.yName, data[i]);
        point.legendImageUrl = getValue(this.legendImageUrl, data[i]);
        point.color = getValue(this.pointColorMapping, data[i]);
        point.text = point.originalText = getValue(this.dataLabel.name || '', data[i]);
        point.tooltip = getValue(this.tooltipMappingName || '', data[i]);
        point.sliceRadius = getValue(this.radius, data[i]);
        point.sliceRadius = isNullOrUndefined(point.sliceRadius) ? '80%' : point.sliceRadius;
        point.separatorY = accumulation.intl.formatNumber(point.y, { useGrouping: accumulation.useGroupingSeparator });
        this.setAccEmptyPoint(point, i, data);
        return point;
    };
    /**
     * Method render the series elements for accumulation chart.
     *
     * @private
     * @param {AccumulationChart} accumulation - The AccumulationChart control.
     * @param {boolean} redraw - Specifies whether to redraw the points.
     * @returns {void}
     */
    AccumulationSeries.prototype.renderSeries = function (accumulation, redraw) {
        var seriesGroup = redraw ? getElement(accumulation.element.id + '_Series_' + this.index) :
            accumulation.renderer.createGroup({ id: accumulation.element.id + '_Series_' + this.index });
        this.renderPoints(accumulation, seriesGroup, redraw);
        var datalabelGroup;
        if (accumulation.accumulationDataLabelModule && this.dataLabel.visible) {
            datalabelGroup = accumulation.renderer.createGroup({ id: accumulation.element.id + '_datalabel_Series_' + this.index });
            datalabelGroup.style.visibility =
                (((this.animation.enable && animationMode !== 'Disable') || animationMode === 'Enable') && accumulation.animateSeries && this.type === 'Pie') ? 'hidden' : 'visible';
            this.renderDataLabel(accumulation, datalabelGroup, redraw);
        }
        if (this.type === 'Pie') {
            if (!accumulation.redraw) {
                this.findMaxBounds(this.labelBound, this.accumulationBound);
            }
            accumulation.pieSeriesModule.animateSeries(accumulation, this.animation, this, seriesGroup, this.borderRadius, this.points);
        }
        if (!accumulation.redraw && accumulation.accumulationLegendModule) {
            this.labelBound.x -= accumulation.explodeDistance;
            this.labelBound.y -= accumulation.explodeDistance;
            this.labelBound.height += (accumulation.explodeDistance - this.labelBound.y);
            this.labelBound.width += (accumulation.explodeDistance - this.labelBound.x);
        }
    };
    /**
     * Method render the points elements for accumulation chart series.
     *
     * @param {AccumulationChart} accumulation - The AccumulationChart control.
     * @param {Element} seriesGroup - The group element to contain the point elements.
     * @param {boolean} redraw - Specifies whether to redraw the points.
     * @param {boolean} previouRadius - Specifies the previous radius of the pie when animating the individual series point.
     * @param {boolean} previousCenter - Specifies the previous center of the pie when animating the individual series point.
     * @param {boolean} pointAnimation - Specifies whether the point based animation is enabled.
     * @returns {void}
     */
    AccumulationSeries.prototype.renderPoints = function (accumulation, seriesGroup, redraw, previouRadius, previousCenter, pointAnimation) {
        var pointId = accumulation.element.id + '_Series_' + this.index + '_Point_';
        var option;
        var patternFill;
        var options = [];
        var visiblePoints = [];
        var patterns = ['Chessboard', 'Dots', 'DiagonalForward', 'Crosshatch', 'Pacman', 'DiagonalBackward', 'Grid', 'Turquoise', 'Star', 'Triangle', 'Circle', 'Tile', 'HorizontalDash', 'VerticalDash', 'Rectangle', 'Box', 'VerticalStripe', 'HorizontalStripe', 'Bubble'];
        for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
            var point = _a[_i];
            point.percentage = (+(point.y / this.sumOfPoints * 100).toFixed(2));
            var argsData = {
                cancel: false, name: pointRender, series: this, point: point, fill: point.color,
                border: this.isEmpty(point) ? { width: this.emptyPointSettings.border.width, color: this.emptyPointSettings.border.color } :
                    { width: this.border.width, color: this.border.color }, pattern: this.applyPattern ? patterns[point.index % patterns.length] : 'None'
            };
            accumulation.trigger(pointRender, argsData);
            point.color = argsData.fill;
            patternFill = point.color;
            if (this.applyPattern) {
                var selection = new BaseSelection(accumulation);
                patternFill = selection.pattern(accumulation, point.color, point.index, argsData.pattern, this.opacity);
            }
            option = new PathOption(pointId + point.index, patternFill, argsData.border.width || 1, argsData.border.color || point.color, this.opacity, argsData.series.dashArray, '');
            if (this.funnelMode === 'Trapezoidal' && this.type === 'Funnel') {
                options.push(option);
                if (point.visible) {
                    visiblePoints.push(point);
                }
            }
            else {
                accumulation[(firstToLowerCase(this.type) + 'SeriesModule')].
                    renderPoint(point, this, accumulation, option, seriesGroup, redraw, previouRadius, previousCenter, pointAnimation);
            }
        }
        if (this.funnelMode === 'Trapezoidal' && this.type === 'Funnel') {
            accumulation[(firstToLowerCase(this.type) + 'SeriesModule')].
                renderTrapezoidalFunnel(this, visiblePoints, accumulation, options, seriesGroup, redraw);
        }
        else {
            appendChildElement(false, accumulation.getSeriesElement(), seriesGroup, redraw);
        }
    };
    /**
     * Method render the datalabel elements for accumulation chart.
     *
     * @param {AccumulationChart} accumulation - The AccumulationChart control.
     * @param {Element} datalabelGroup - The group element to contain the data label elements.
     * @param {boolean} redraw - Specifies whether to redraw the data labels.
     * @returns {void}
     */
    AccumulationSeries.prototype.renderDataLabel = function (accumulation, datalabelGroup, redraw) {
        accumulation.accumulationDataLabelModule.findAreaRect();
        var element = createElement('div', {
            id: accumulation.element.id + '_Series_0' + '_DataLabelCollections'
        });
        this.leftSidePoints = [];
        this.rightSidePoints = [];
        var firstQuarter = [];
        var secondQuarter = [];
        for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
            var point = _a[_i];
            if (point.visible) {
                if (this.dataLabel.showZero || (!this.dataLabel.showZero && ((point.y !== 0) || (point.y === 0 &&
                    this.emptyPointSettings.mode === 'Zero')))) {
                    accumulation.accumulationDataLabelModule.renderDataLabel(point, this.dataLabel, datalabelGroup, this.points, this.index, element, redraw);
                }
            }
            if (point.midAngle >= 90 && point.midAngle <= 270) {
                this.leftSidePoints.push(point);
            }
            else {
                if (point.midAngle >= 0 && point.midAngle <= 90) {
                    secondQuarter.push(point);
                }
                else {
                    firstQuarter.push(point);
                }
            }
        }
        firstQuarter.sort(function (a, b) { return a.midAngle - b.midAngle; });
        secondQuarter.sort(function (a, b) { return a.midAngle - b.midAngle; });
        this.leftSidePoints.sort(function (a, b) { return a.midAngle - b.midAngle; });
        this.rightSidePoints = firstQuarter.concat(secondQuarter);
        accumulation.accumulationDataLabelModule.drawDataLabels(this, this.dataLabel, datalabelGroup, element, redraw);
        if (this.dataLabel.template !== null && element.childElementCount) {
            var dataLabelCallBack = accumulation.accumulationDataLabelModule.drawDataLabels.bind(accumulation.accumulationDataLabelModule, this, this.dataLabel, datalabelGroup, element, redraw);
            if (accumulation.isReact) {
                accumulation.renderReactTemplates(dataLabelCallBack);
            }
            appendChildElement(false, getElement(accumulation.element.id + '_Secondary_Element'), element, redraw);
        }
        appendChildElement(false, accumulation.getSeriesElement(), datalabelGroup, redraw);
    };
    /**
     * To find maximum bounds for smart legend placing.
     *
     * @private
     * @param {Rect} totalbound - The total bounding rect.
     * @param {Rect} bound - The bounding rect to be compared.
     * @returns {void}
     */
    AccumulationSeries.prototype.findMaxBounds = function (totalbound, bound) {
        totalbound.x = bound.x < totalbound.x ? bound.x : totalbound.x;
        totalbound.y = bound.y < totalbound.y ? bound.y : totalbound.y;
        totalbound.height = (bound.y + bound.height) > totalbound.height ? (bound.y + bound.height) : totalbound.height;
        totalbound.width = (bound.x + bound.width) > totalbound.width ? (bound.x + bound.width) : totalbound.width;
    };
    /**
     * Finds the maximum width of the labels for legend placement.
     *
     * @private
     * @returns {number} The maximum label width.
     */
    AccumulationSeries.prototype.findMaxLabelWidth = function () {
        var max;
        for (var i = 0; i < this.points.length; i++) {
            max = this.points[0].textSize.width;
            if (max < this.points[i].textSize.width) {
                max = this.points[i].textSize.width;
            }
        }
        return max;
    };
    /**
     * To set empty point value for null points.
     *
     * @private
     * @param {AccPoints} point - The point to set as empty.
     * @param {number} i - The index of the point in the data set.
     * @param {Object} data - The data object.
     * @returns {void}
     */
    AccumulationSeries.prototype.setAccEmptyPoint = function (point, i, data) {
        if (!(isNullOrUndefined(point.y) || isNaN(point.y))) {
            return null;
        }
        point.color = this.emptyPointSettings.fill || point.color;
        switch (this.emptyPointSettings.mode) {
            case 'Zero':
                point.y = 0;
                point.visible = true;
                break;
            case 'Average': {
                var previous = data[i - 1] ? (data[i - 1][this.yName] || 0) : 0;
                var next = data[i + 1] ? (data[i + 1][this.yName] || 0) : 0;
                point.y = (Math.abs(previous) + Math.abs(next)) / 2;
                this.sumOfPoints += point.y;
                point.visible = true;
                break;
            }
            default:
                point.visible = false;
                break;
        }
    };
    /**
     * Updates the data source for the series.
     *
     * @function setData
     * @param {Object} data – Updated data source for the series.
     * @param {number} duration – The duration for the animation.
     * @returns {void}
     */
    AccumulationSeries.prototype.setData = function (data, duration) {
        if (!data) {
            return null;
        }
        var samePoints = false;
        if (this.dataSource.length === data.length) {
            samePoints = true;
            for (var i = 0; i < data.length; i++) {
                if (this.dataSource[i][this.xName] === data[i][this.xName]) {
                    var point = this.points[i];
                    var existingPoint = this.dataSource[i];
                    if ((existingPoint[this.yName] !== data[i][this.yName])) {
                        point.y = data[i][this.yName];
                        this.dataSource[i] = data[i];
                    }
                }
                else {
                    samePoints = false;
                    break;
                }
            }
        }
        if (!samePoints) {
            this.dataSource = data;
        }
        else {
            this.sumOfPoints = 0;
            var visiblePoints = [];
            for (var i = 0; i < this.resultData.length; i++) {
                if (this.points[i] && this.points[i].visible) {
                    visiblePoints.push(this.resultData[i]);
                }
            }
            this.findSumOfPoints(visiblePoints);
            this.accumulation.redraw = this.borderRadius ? false : this.accumulation.enableAnimation;
            this.accumulation.animateSeries = false;
            var chartDuration = this.accumulation.duration;
            this.accumulation.duration = isNullOrUndefined(duration) ? 500 : duration;
            this.accumulation[(firstToLowerCase(this.type) + 'SeriesModule')].initProperties(this.accumulation, this);
            this.renderPoints(this.accumulation, getElement(this.accumulation.element.id + '_Series_' + this.index), this.accumulation.redraw, null, null, true);
            if (this.accumulation.centerLabel.text) {
                this.accumulation.renderCenterLabel(true, true);
            }
            if (this.accumulation.annotationModule) {
                this.accumulation.annotationModule.renderAnnotations(getElement(this.accumulation.element.id + '_Secondary_Element'));
            }
            if (this.accumulation.accumulationDataLabelModule && this.dataLabel.visible) {
                this.renderDataLabel(this.accumulation, getElement(this.accumulation.element.id + '_datalabel_Series_' + this.index), this.accumulation.redraw);
            }
            this.accumulation.redraw = false;
            this.accumulation.duration = chartDuration;
        }
    };
    /**
     * Adds a data point to the data source for the series.
     *
     * @function addPoint
     * @param {Object} dataPoint - The data point to be added.
     * @param {number} duration – The duration for the animation.
     * @returns {void}
     */
    AccumulationSeries.prototype.addPoint = function (dataPoint, duration) {
        var maxWidth;
        if (this.accumulation.series[0].dataLabel.visible) {
            maxWidth = this.findMaxLabelWidth();
        }
        this.dataSource.push(dataPoint);
        this.resultData = this.dataSource;
        this.sumOfPoints = 0;
        var visiblepoints = [];
        for (var i = 0; i < this.resultData.length; i++) {
            if (this.points[i] && this.points[i].visible) {
                visiblepoints.push(this.resultData[i]);
            }
            else if (i === this.resultData.length - 1) {
                visiblepoints.push(this.resultData[i]);
            }
        }
        this.findSumOfPoints(visiblepoints);
        var pointIndex = this.points.length === 0 ? 0 : this.points[this.points.length - 1].index + 1;
        var colors = this.palettes.length ? this.palettes : getSeriesColor(this.accumulation.theme);
        var point = this.setPoints(this.dataSource, pointIndex, colors, this.accumulation);
        this.pushPoints(point, colors);
        this.accumulation.redraw = this.borderRadius ? false : this.accumulation.enableAnimation;
        var chartDuration = this.accumulation.duration;
        this.accumulation.duration = isNullOrUndefined(duration) ? 500 : duration;
        this.updateSeries(getElement(this.accumulation.element.id + '_Series_' + this.index), maxWidth, 'addPoint');
        this.accumulation.redraw = false;
        this.accumulation.duration = chartDuration;
    };
    /**
     * Removes a data point from the series data source at the specified index.
     *
     * @function removePoint
     * @param {number} index – The index of the data point to be removed from the series.
     * @param {number} duration – The duration for the animation.
     * @returns {void}
     */
    AccumulationSeries.prototype.removePoint = function (index, duration) {
        var dataSource = extend([], this.dataSource, null, true);
        var chartDuration = this.accumulation.duration;
        if (dataSource.length > 0 && index >= 0 && index < dataSource.length) {
            this.sumOfPoints = 0;
            var removepoints = [];
            for (var i = 0; i < this.dataSource.length; i++) {
                if (i !== index && this.points[i] && this.points[i].visible) {
                    removepoints.push(this.dataSource[i]);
                }
            }
            dataSource.splice(index, 1);
            this.dataSource.splice(index, 1);
            this.findSumOfPoints(removepoints);
            this.accumulation.redraw = this.borderRadius ? false : this.accumulation.enableAnimation;
            this.accumulation.duration = isNullOrUndefined(duration) ? 500 : duration;
            this.points.splice(index, 1);
            for (var i = index; i < this.points.length; i++) {
                var point = this.points[i];
                point.index = i;
                point.y = this.points[i].y;
            }
            var element = getElement(this.accumulation.element.id + '_Series_0_Point_' + (this.points.length));
            if (element) {
                element.parentNode.removeChild(element);
            }
            this.updateSeries(getElement(this.accumulation.element.id + '_Series_' + this.index), undefined, 'removePoint', index);
            this.accumulation.redraw = false;
            this.accumulation.duration = chartDuration;
        }
    };
    /**
     * Update the series based on addPoint and removePoint function.
     *
     * @param {Element} seriesGroup - Series group needs to be update.
     * @param {number} maxLabelWidth - Specifies the maximum label width.
     * @param {string} updatePoint - Specifies remove or add point.
     * @param {number} index - specifies point index to remove.
     * @returns {void}
     */
    AccumulationSeries.prototype.updateSeries = function (seriesGroup, maxLabelWidth, updatePoint, index) {
        var previousRadius = this.accumulation[(firstToLowerCase(this.type) + 'SeriesModule')].radius;
        var previousCenter = this.accumulation[(firstToLowerCase(this.type) + 'SeriesModule')].center;
        var previousLegendBounds;
        if (this.accumulation.legendSettings.visible) {
            if (updatePoint === 'addPoint') {
                this.accumulation.accumulationLegendModule.
                    legendCollections.push(new LegendOptions(this.points[this.points.length - 1].x.toString(), this.points[this.points.length - 1].color, this.legendShape, this.points[this.points.length - 1].visible, this.type, this.points[this.points.length - 1].legendImageUrl, null, null, this.points[this.points.length - 1].index, this.index));
            }
            else {
                this.accumulation.accumulationLegendModule.legendCollections.splice(index, 1);
                for (var i = index; i < this.accumulation.accumulationLegendModule.legendCollections.length; i++) {
                    this.accumulation.accumulationLegendModule.legendCollections[i].pointIndex = i;
                }
            }
            if (this.accumulation.accumulationLegendModule.legendCollections.length >= 1) {
                previousLegendBounds = this.accumulation.accumulationLegendModule.legendBounds;
                this.accumulation.accumulationLegendModule.calculateLegendBounds(this.accumulation.initialClipRect, this.accumulation.availableSize, null, previousLegendBounds, true);
                if (this.dataLabel && this.dataLabel.position === 'Outside' && (this.accumulation.legendSettings.position === 'Bottom' || (this.accumulation.legendSettings.position === 'Top')) ? (previousLegendBounds.height !== this.accumulation.accumulationLegendModule.legendBounds.height) : (previousLegendBounds.width !== this.accumulation.accumulationLegendModule.legendBounds.width)) {
                    var titleHeight = (this.accumulation.title ? measureText(this.accumulation.title, this.accumulation.titleStyle, this.accumulation.themeStyle.chartTitleFont).height *
                        this.accumulation.titleCollection.length : 0);
                    var subTitleHeight = (this.accumulation.subTitle ?
                        (measureText(this.accumulation.subTitle, this.accumulation.subTitleStyle, this.accumulation.themeStyle.chartSubTitleFont).height *
                            this.accumulation.subTitleCollection.length) : 0);
                    this.accumulation.initialClipRect = new Rect(this.accumulation.margin.left, this.accumulation.margin.top, this.accumulation.availableSize.width, this.accumulation.availableSize.height);
                    subtractRect(this.accumulation.initialClipRect, new Rect(0, (subTitleHeight
                        + titleHeight), this.accumulation.margin.right +
                        this.accumulation.margin.left, this.accumulation.margin.bottom + this.accumulation.margin.top));
                    this.accumulation.accumulationLegendModule.calculateLegendBounds(this.accumulation.initialClipRect, this.accumulation.availableSize, null);
                }
            }
        }
        this.accumulation[(firstToLowerCase(this.type) + 'SeriesModule')].initProperties(this.accumulation, this);
        this.renderPoints(this.accumulation, seriesGroup, this.accumulation.redraw, previousRadius, previousCenter, true);
        if (previousLegendBounds && ((this.accumulation.legendSettings.position === 'Bottom' || (this.accumulation.legendSettings.position === 'Top')) ? (previousLegendBounds.height !== this.accumulation.accumulationLegendModule.legendBounds.height) : (previousLegendBounds.width !== this.accumulation.accumulationLegendModule.legendBounds.width)) && this.accumulation.centerLabel.text) {
            this.accumulation.renderCenterLabel(true, true);
        }
        if (this.accumulation.annotationModule) {
            this.accumulation.annotationModule.renderAnnotations(getElement(this.accumulation.element.id + '_Secondary_Element'));
        }
        if (this.accumulation.accumulationDataLabelModule && this.dataLabel.visible) {
            var datalabelGroup = this.accumulation.renderer.createGroup({ id: this.accumulation.element.id + '_datalabel_Series_' + this.index });
            this.renderDataLabel(this.accumulation, datalabelGroup, this.accumulation.redraw);
        }
        if (this.accumulation.legendSettings.visible) {
            if (this.type === 'Pie') {
                if (this.dataLabel.visible && this.points[this.points.length - 1] && this.points[this.points.length - 1].textSize.width > maxLabelWidth && this.accumulation.legendSettings.position !== 'Top' && this.accumulation.legendSettings.position !== 'Bottom') {
                    this.accumulation.visibleSeries[0].findMaxBounds(this.accumulation.visibleSeries[0].labelBound, this.points[this.points.length - 1].labelRegion);
                    this.findMaxBounds(this.labelBound, this.accumulationBound);
                    this.labelBound.x -= this.accumulation.explodeDistance;
                    this.labelBound.y -= this.accumulation.explodeDistance;
                    this.labelBound.height += (this.accumulation.explodeDistance - this.labelBound.y);
                    this.labelBound.width += (this.accumulation.explodeDistance - this.labelBound.x);
                }
                this.accumulation.accumulationLegendModule.getSmartLegendLocation(this.accumulation.visibleSeries[0].labelBound, this.accumulation.accumulationLegendModule.legendBounds, this.accumulation.margin);
            }
            this.accumulation.accumulationLegendModule.renderLegend(this.accumulation, this.accumulation.legendSettings, this.accumulation.accumulationLegendModule.legendBounds, this.accumulation.redraw, true);
        }
    };
    /**
     * To find point is empty.
     *
     * @param {AccPoints} point - The point to check.
     * @returns {boolean} - True if the point is empty, otherwise false.
     */
    AccumulationSeries.prototype.isEmpty = function (point) {
        return point.color === this.emptyPointSettings.fill;
    };
    __decorate([
        Property('')
    ], AccumulationSeries.prototype, "dataSource", void 0);
    __decorate([
        Property()
    ], AccumulationSeries.prototype, "query", void 0);
    __decorate([
        Property('')
    ], AccumulationSeries.prototype, "xName", void 0);
    __decorate([
        Property('')
    ], AccumulationSeries.prototype, "name", void 0);
    __decorate([
        Property('')
    ], AccumulationSeries.prototype, "tooltipMappingName", void 0);
    __decorate([
        Property('')
    ], AccumulationSeries.prototype, "yName", void 0);
    __decorate([
        Property(true)
    ], AccumulationSeries.prototype, "visible", void 0);
    __decorate([
        Complex({ color: null, width: 0 }, Border)
    ], AccumulationSeries.prototype, "border", void 0);
    __decorate([
        Complex(null, Animation)
    ], AccumulationSeries.prototype, "animation", void 0);
    __decorate([
        Property('SeriesType')
    ], AccumulationSeries.prototype, "legendShape", void 0);
    __decorate([
        Property('')
    ], AccumulationSeries.prototype, "legendImageUrl", void 0);
    __decorate([
        Property('')
    ], AccumulationSeries.prototype, "pointColorMapping", void 0);
    __decorate([
        Property(false)
    ], AccumulationSeries.prototype, "applyPattern", void 0);
    __decorate([
        Property(null)
    ], AccumulationSeries.prototype, "selectionStyle", void 0);
    __decorate([
        Property(null)
    ], AccumulationSeries.prototype, "groupTo", void 0);
    __decorate([
        Property('Value')
    ], AccumulationSeries.prototype, "groupMode", void 0);
    __decorate([
        Complex({}, AccumulationDataLabelSettings)
    ], AccumulationSeries.prototype, "dataLabel", void 0);
    __decorate([
        Property([])
    ], AccumulationSeries.prototype, "palettes", void 0);
    __decorate([
        Property(0)
    ], AccumulationSeries.prototype, "startAngle", void 0);
    __decorate([
        Property(null)
    ], AccumulationSeries.prototype, "endAngle", void 0);
    __decorate([
        Property(null)
    ], AccumulationSeries.prototype, "radius", void 0);
    __decorate([
        Property('0')
    ], AccumulationSeries.prototype, "innerRadius", void 0);
    __decorate([
        Property('Pie')
    ], AccumulationSeries.prototype, "type", void 0);
    __decorate([
        Property(true)
    ], AccumulationSeries.prototype, "enableTooltip", void 0);
    __decorate([
        Property(false)
    ], AccumulationSeries.prototype, "explode", void 0);
    __decorate([
        Property('30%')
    ], AccumulationSeries.prototype, "explodeOffset", void 0);
    __decorate([
        Property(false)
    ], AccumulationSeries.prototype, "explodeAll", void 0);
    __decorate([
        Property(null)
    ], AccumulationSeries.prototype, "explodeIndex", void 0);
    __decorate([
        Complex({ mode: 'Drop' }, EmptyPointSettings)
    ], AccumulationSeries.prototype, "emptyPointSettings", void 0);
    __decorate([
        Property(0)
    ], AccumulationSeries.prototype, "gapRatio", void 0);
    __decorate([
        Property('80%')
    ], AccumulationSeries.prototype, "width", void 0);
    __decorate([
        Property('80%')
    ], AccumulationSeries.prototype, "height", void 0);
    __decorate([
        Property('20%')
    ], AccumulationSeries.prototype, "neckWidth", void 0);
    __decorate([
        Property('20%')
    ], AccumulationSeries.prototype, "neckHeight", void 0);
    __decorate([
        Property('Linear')
    ], AccumulationSeries.prototype, "pyramidMode", void 0);
    __decorate([
        Property('Standard')
    ], AccumulationSeries.prototype, "funnelMode", void 0);
    __decorate([
        Property(1)
    ], AccumulationSeries.prototype, "opacity", void 0);
    __decorate([
        Property('0')
    ], AccumulationSeries.prototype, "dashArray", void 0);
    __decorate([
        Complex({}, Accessibility)
    ], AccumulationSeries.prototype, "accessibility", void 0);
    __decorate([
        Property(0)
    ], AccumulationSeries.prototype, "borderRadius", void 0);
    return AccumulationSeries;
}(ChildProperty));
export { AccumulationSeries };
/**
 * method to get series from index.
 *
 * @private
 * @param {number} index - The index of the series to retrieve.
 * @param {AccumulationSeries[]} visibleSeries - The array of visible series in the chart.
 * @returns {AccumulationSeries} - The series retrieved from the specified index.
 */
export function getSeriesFromIndex(index, visibleSeries) {
    for (var _i = 0, visibleSeries_1 = visibleSeries; _i < visibleSeries_1.length; _i++) {
        var series = visibleSeries_1[_i];
        if (index === series.index) {
            return series;
        }
    }
    return visibleSeries[0];
}
/**
 * method to get point from index.
 *
 * @private
 * @param {number} index - The index of the point to retrieve.
 * @param {AccPoints[]} points - The array of points in the data set.
 * @returns {AccPoints} - The point retrieved from the specified index.
 */
export function pointByIndex(index, points) {
    for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
        var point = points_1[_i];
        if (point.index === index) {
            return point;
        }
    }
    return null;
}
