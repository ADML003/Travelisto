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
 * Circular 3D chart highlight.
 */
import { Browser } from '@syncfusion/ej2-base';
import { extend } from '@syncfusion/ej2-base';
import { CircularChartSelection3D } from './selection';
/**
 * The `CircularChart3DHighlight` module handles highlighting for the Circular 3D chart.
 *
 * @private
 */
var CircularChartHighlight3D = /** @class */ (function (_super) {
    __extends(CircularChartHighlight3D, _super);
    /**
     * Constructor for the highlight module.
     *
     * @param {CircularChart3D} circular3D - The instance of the circular 3D chart.
     * @private.
     */
    function CircularChartHighlight3D(circular3D) {
        var _this = _super.call(this, circular3D) || this;
        _this.circular3D = circular3D;
        _this.renderer = circular3D.renderer;
        _this.wireEvents();
        return _this;
    }
    /**
     * Binds events for the highlight module.
     *
     * @returns {void}
     */
    CircularChartHighlight3D.prototype.wireEvents = function () {
        if (this.circular3D.isDestroyed) {
            return;
        }
        this.circular3D.on(Browser.touchMoveEvent, this.mouseMove, this);
    };
    /**
     * Unbinds events for the highlight module.
     *
     * @returns {void}
     */
    CircularChartHighlight3D.prototype.unWireEvents = function () {
        if (this.circular3D.isDestroyed) {
            return;
        }
        this.circular3D.off(Browser.touchMoveEvent, this.mouseMove);
    };
    /**
     * Initializes private variables for highlight and deselection.
     *
     * @param {CircularChart3D} circular3D - The instance of the circular 3D chart.
     * @returns {void}
     */
    CircularChartHighlight3D.prototype.declarePrivateVariables = function (circular3D) {
        this.styleId = circular3D.element.id + '_ej2_chart_highlight';
        this.unselected = circular3D.element.id + '_ej2_deselected';
        this.selectedDataIndexes = [];
        this.highlightDataIndexes = [];
    };
    /**
     * Invokes the highlight style to highlight the point and series in the circular 3D chart.
     *
     * @param {CircularChart3D} circular3D - The instance of the circular 3D chart.
     * @returns {void}
     */
    CircularChartHighlight3D.prototype.invokeHighlight = function (circular3D) {
        this.declarePrivateVariables(circular3D);
        this.series = extend({}, circular3D.visibleSeries, null, true);
        this.seriesStyles();
        this.currentMode = circular3D.highlightMode;
    };
    /**
     * Gets the module name for the circular 3D highlight module.
     *
     * @returns {string} - The module name.
     * @private
     */
    CircularChartHighlight3D.prototype.getModuleName = function () {
        return 'CircularChartHighlight3D';
    };
    /**
     * Destroys the `CircularChart3DHighlight` module.
     *
     * @returns {void}
     * @private
     */
    CircularChartHighlight3D.prototype.destroy = function () {
        this.unWireEvents();
        //Destroy method performed here
    };
    return CircularChartHighlight3D;
}(CircularChartSelection3D));
export { CircularChartHighlight3D };
