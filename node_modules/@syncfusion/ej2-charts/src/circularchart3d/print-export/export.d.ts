/**
 * Circular 3D chart export.
 */
import { PdfPageOrientation } from '@syncfusion/ej2-pdf-export';
import { ExportType } from '../../common/utils/enum';
import { IPDFArgs } from '../../common/model/interface';
import { CircularChart3D } from '../circularchart3d';
/**
 * The `CircularChartExport3DModule` module is used to print and export the rendered chart.
 */
export declare class CircularChartExport3D {
    private chart;
    /**
     * Constructor for the export module.
     *
     * @param {CircularChart3D} chart - The circular 3D chart.
     * @private
     */
    constructor(chart: CircularChart3D);
    /**
     * Export the circular 3D chart on the page to PNG, JPEG, or SVG format.
     *
     * @param {number} type - The format for exporting the chart (PNG, JPEG, or SVG).
     * @param {string} fileName - The desired name for the exported file.
     * @returns {void}
     */
    export(type: ExportType, fileName: string): void;
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
    pdfExport(fileName: string, orientation?: PdfPageOrientation, controls?: (CircularChart3D)[], width?: number, height?: number, isVertical?: boolean, header?: IPDFArgs, footer?: IPDFArgs, exportToMultiplePage?: boolean): void;
    /**
     * Gets a data URL for the rendered 3D chart as an HTML canvas element, including data URL and blob URL if available.
     *
     * @param {CircularChart3D} chart - The circular 3D chart for which the data URL is requested.
     * @returns {{ element: HTMLCanvasElement, dataUrl?: string, blobUrl?: string }} - An object containing the HTML canvas element, data URL, and blob URL.
     * @private
     */
    getDataUrl(chart: CircularChart3D): {
        element: HTMLCanvasElement;
        dataUrl?: string;
        blobUrl?: string;
    };
    /**
     * Retrieves the module name for the circular 3D chart export.
     *
     * @returns {string} - The module name.
     */
    protected getModuleName(): string;
    /**
     * Destroys the export modules of the circular 3D chart.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
