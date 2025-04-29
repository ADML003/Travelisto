import { Chart } from '../../chart/chart';
import { AccumulationChart } from '../../accumulation-chart/accumulation';
import { ExportType } from '../utils/enum';
import { PdfPageOrientation } from '@syncfusion/ej2-pdf-export';
import { RangeNavigator } from '../..';
import { StockChart } from '../../stock-chart/stock-chart';
import { BulletChart } from '../../bullet-chart/bullet-chart';
import { IPDFArgs } from '../../common/model/interface';
import { Chart3D } from '../../chart3d';
import { CircularChart3D } from '../../circularchart3d';
/** @private */
export declare class ExportUtils {
    private control;
    /**
     * Constructor for chart and accumulation annotation
     *
     * @param control
     */
    constructor(control: Chart | AccumulationChart | RangeNavigator | StockChart | BulletChart | Chart3D | CircularChart3D);
    /**
     * To export the file as image/svg format.
     *
     * @param type
     * @param fileName
     */
    export(type: ExportType, fileName: string, orientation?: PdfPageOrientation, controls?: (Chart | AccumulationChart | RangeNavigator | StockChart | BulletChart | Chart3D | CircularChart3D)[], width?: number, height?: number, isVertical?: boolean, header?: IPDFArgs, footer?: IPDFArgs, exportToMultiplePage?: boolean): void;
    /**
     * To get data url for charts.
     *
     * @param chart
     */
    getDataUrl(chart: Chart | AccumulationChart | Chart3D | CircularChart3D): {
        element: HTMLCanvasElement;
        dataUrl?: string;
        blobUrl?: string;
    };
    /**
     * To trigger the download element.
     *
     * @param fileName
     * @param type
     * @param url
     */
    triggerDownload(fileName: string, type: ExportType, url: string, isDownload: boolean): void;
    /**
     * To get the maximum size value.
     *
     * @param {(Chart | RangeNavigator | AccumulationChart | StockChart | BulletChart | Chart3D | CircularChart3D)[]} controls - The array of controls to retrieve the maximum size value.
     * @param {boolean} isVertical - Indicates whether the orientation is vertical.
     * @param {boolean} isMultiPages - Indicates whether multiple pages are used.
     * @param {ExportType} type - The type of export.
     * @returns {IControlValue[]} - An array of control values.
     */
    private getControlsValue;
    private createCanvas;
    /**
     * To convert svg chart into canvas chart to fix export issue in IE
     * We cant export svg to other formats in IE
     *
     * @param enableCanvas
     * @param chart
     * @param enableCanvas
     * @param chart
     */
    private canvasRender;
    private exportPdf;
    private doexport;
    /**
     * Exports the given images as a file with the specified name and type.
     *
     * @param {string[] | HTMLElement} images - The images to be exported. Can be an array of image URLs or an HTML element containing the image.
     * @param {string} fileName - The name of the exported file.
     * @param {string} fileType - The type of the exported file (e.g., 'png', 'jpeg').
     * @param {string} image - The image data to be used for export.
     * @returns {void}
     * @private
     */
    exportImage(images: string[] | HTMLElement, fileName: string, fileType: string, image: string): void;
}
