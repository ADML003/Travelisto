import { ExportUtils } from '../../common/utils/export';
import { beforeExport } from '../../common/model/constants';
/**
 * The `CircularChartExport3DModule` module is used to print and export the rendered chart.
 */
var CircularChartExport3D = /** @class */ (function () {
    /**
     * Constructor for the export module.
     *
     * @param {CircularChart3D} chart - The circular 3D chart.
     * @private
     */
    function CircularChartExport3D(chart) {
        this.chart = chart;
    }
    /**
     * Export the circular 3D chart on the page to PNG, JPEG, or SVG format.
     *
     * @param {number} type - The format for exporting the chart (PNG, JPEG, or SVG).
     * @param {string} fileName - The desired name for the exported file.
     * @returns {void}
     */
    CircularChartExport3D.prototype.export = function (type, fileName) {
        var exportChart = new ExportUtils(this.chart);
        var argsData = {
            cancel: false, width: null, height: null
        };
        this.chart.trigger(beforeExport, argsData);
        if (!argsData.cancel) {
            exportChart.export(type, fileName, undefined, [this.chart]);
        }
    };
    /**
     * Export the circular 3D chart on the page to a PDF document.
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
    CircularChartExport3D.prototype.pdfExport = function (fileName, orientation, controls, width, height, isVertical, header, footer, exportToMultiplePage) {
        var exportChart = new ExportUtils(this.chart);
        controls = controls ? controls : [this.chart];
        var argsData = {
            cancel: false, width: width, height: height
        };
        this.chart.trigger(beforeExport, argsData);
        if (!argsData.cancel) {
            exportChart.export('PDF', fileName, orientation, controls, width = argsData.width, height = argsData.height, isVertical, header, footer, exportToMultiplePage);
        }
    };
    /**
     * Gets a data URL for the rendered 3D chart as an HTML canvas element, including data URL and blob URL if available.
     *
     * @param {CircularChart3D} chart - The circular 3D chart for which the data URL is requested.
     * @returns {{ element: HTMLCanvasElement, dataUrl?: string, blobUrl?: string }} - An object containing the HTML canvas element, data URL, and blob URL.
     * @private
     */
    CircularChartExport3D.prototype.getDataUrl = function (chart) {
        var exportUtil = new ExportUtils(chart);
        return exportUtil.getDataUrl(chart);
    };
    /**
     * Retrieves the module name for the circular 3D chart export.
     *
     * @returns {string} - The module name.
     */
    CircularChartExport3D.prototype.getModuleName = function () {
        return 'CircularChartExport3D';
    };
    /**
     * Destroys the export modules of the circular 3D chart.
     *
     * @returns {void}
     * @private
     */
    CircularChartExport3D.prototype.destroy = function () {
        // Perform the destroy method here.
    };
    return CircularChartExport3D;
}());
export { CircularChartExport3D };
