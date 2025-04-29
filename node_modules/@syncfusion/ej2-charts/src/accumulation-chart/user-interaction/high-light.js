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
 * AccumulationChart highlight source file
 */
import { Browser } from '@syncfusion/ej2-base';
import { extend } from '@syncfusion/ej2-base';
import { AccumulationSelection } from './selection';
/**
 * The `AccumulationHighlight` module handles highlighting for the accumulation chart.
 *
 * @private
 */
var AccumulationHighlight = /** @class */ (function (_super) {
    __extends(AccumulationHighlight, _super);
    /**
     * Constructor for selection module.
     *
     * @private.
     * @param {AccumulationChart} accumulation - The accumulation chart control.
     */
    function AccumulationHighlight(accumulation) {
        var _this = _super.call(this, accumulation) || this;
        _this.accumulation = accumulation;
        _this.renderer = accumulation.renderer;
        _this.wireEvents();
        return _this;
    }
    /**
     * Binding events for selection module.
     *
     * @returns {void}
     */
    AccumulationHighlight.prototype.wireEvents = function () {
        if (this.accumulation.isDestroyed) {
            return;
        }
        this.accumulation.on(Browser.touchMoveEvent, this.mouseMove, this);
    };
    /**
     * UnBinding events for selection module.
     *
     * @returns {void}
     */
    AccumulationHighlight.prototype.unWireEvents = function () {
        if (this.accumulation.isDestroyed) {
            return;
        }
        this.accumulation.off(Browser.touchMoveEvent, this.mouseMove);
    };
    /**
     * To find private variable values.
     *
     * @param {AccumulationChart} accumulation - The accumulation chart control.
     * @returns {void}
     */
    AccumulationHighlight.prototype.declarePrivateVariables = function (accumulation) {
        this.styleId = accumulation.element.id + '_ej2_chart_highlight';
        this.unselected = accumulation.element.id + '_ej2_deselected';
        this.selectedDataIndexes = [];
        this.highlightDataIndexes = [];
    };
    /**
     * Method to select the point and series.
     *
     * @param {AccumulationChart} accumulation - The accumulation chart control.
     * @returns {void}
     */
    AccumulationHighlight.prototype.invokeHighlight = function (accumulation) {
        this.declarePrivateVariables(accumulation);
        this.series = extend({}, accumulation.visibleSeries, null, true);
        this.seriesStyles();
        this.currentMode = accumulation.highlightMode;
    };
    /**
     * Get module name.
     *
     * @private
     * @returns {string} - Returns the module name.
     */
    AccumulationHighlight.prototype.getModuleName = function () {
        return 'AccumulationHighlight';
    };
    /**
     * To destroy the highlight.
     *
     * @returns {void}
     * @private
     */
    AccumulationHighlight.prototype.destroy = function () {
        this.unWireEvents();
        //Destroy method performed here
    };
    return AccumulationHighlight;
}(AccumulationSelection));
export { AccumulationHighlight };
