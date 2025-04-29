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
 * Highlight src file
 */
import { Browser } from '@syncfusion/ej2-base';
import { extend } from '@syncfusion/ej2-base';
import { Selection } from './selection';
/**
 * The `Highlight` module manages the highlighting of chart elements.
 *
 * @private
 */
var Highlight = /** @class */ (function (_super) {
    __extends(Highlight, _super);
    /**
     * Constructor for selection module.
     *
     * @private
     */
    function Highlight(chart) {
        var _this = _super.call(this, chart) || this;
        _this.chart = chart;
        _this.renderer = chart.renderer;
        _this.wireEvents();
        return _this;
    }
    /**
     * Binding events for selection module.
     *
     * @returns {void}
     */
    Highlight.prototype.wireEvents = function () {
        if (this.chart.isDestroyed || (this.chart.stockChart && this.chart.stockChart.onPanning)) {
            return;
        }
        this.chart.on(Browser.touchMoveEvent, this.mouseMove, this);
    };
    /**
     * UnBinding events for selection module.
     *
     * @returns {void}
     */
    Highlight.prototype.unWireEvents = function () {
        if (this.chart.isDestroyed) {
            return;
        }
        this.chart.off(Browser.touchMoveEvent, this.mouseMove);
    };
    /**
     * Declares private variables used within the chart.
     *
     * @param {Chart} chart - The chart instance.
     * @returns {void}
     */
    Highlight.prototype.declarePrivateVariables = function (chart) {
        this.styleId = chart.element.id + '_ej2_chart_highlight';
        this.unselected = chart.element.id + '_ej2_deselected';
        this.selectedDataIndexes = [];
        this.highlightDataIndexes = [];
        this.isSeriesMode = chart.highlightMode === 'Series';
    };
    /**
     * Method to select the point and series.
     *
     * @param {Chart} chart - The chart instance.
     * @returns {void}
     */
    Highlight.prototype.invokeHighlight = function (chart) {
        this.declarePrivateVariables(chart);
        this.series = extend({}, chart.visibleSeries, null, true);
        this.seriesStyles();
        this.currentMode = chart.highlightMode;
    };
    /**
     * Get module name.
     *
     * @private
     * @returns {string} - Returns the module name.
     */
    Highlight.prototype.getModuleName = function () {
        return 'Highlight';
    };
    /**
     * To destroy the highlight.
     *
     * @returns {void}
     * @private
     */
    Highlight.prototype.destroy = function () {
        this.unWireEvents();
        // Destroy method performed here.
    };
    return Highlight;
}(Selection));
export { Highlight };
