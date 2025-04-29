import { Maps } from '../../index';
import { ExportType } from '../utils/enum';
import { PdfPageOrientation } from '@syncfusion/ej2-pdf-export';
/**
 * This module enables the export to PDF functionality in maps.
 *
 * @hidden
 */
export declare class PdfExport {
    /**
     * Constructor for Maps
     *
     */
    constructor();
    /**
     * To export the file as image/svg format
     *
     * @param {Maps} maps - Specifies the Maps instance.
     * @param {ExportType} type - Specifies the type of the document.
     * @param {string} fileName - Specifies the name of the PDF document.
     * @param {boolean} allowDownload - Specifies whether to download the document or not.
     * @param {PdfPageOrientation} orientation - Specifies the orientation of the PDF document to export the maps.
     * @returns {Promise<string>} - Returns "null" value when the allowDownload is set to false.
     * @private
     */
    export(maps: Maps, type: ExportType, fileName: string, allowDownload?: boolean, orientation?: PdfPageOrientation): Promise<string>;
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name
     */
    protected getModuleName(): string;
    /**
     * To destroy the PdfExport.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
