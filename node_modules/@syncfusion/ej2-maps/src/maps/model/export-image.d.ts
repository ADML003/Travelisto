import { Maps } from '../../index';
import { ExportType } from '../utils/enum';
/**
 * This module enables the export to Image functionality in maps.
 *
 * @hidden
 */
export declare class ImageExport {
    /**
     * Constructor for Maps
     *
     * @param {Maps} control - Specifies the instance of the map
     */
    constructor(control: Maps);
    /**
     * To export the file as image/svg format
     *
     * @param {Maps} maps - Specifies the Maps instance.
     * @param {ExportType} type - Specifies the type of the image file for exporting.
     * @param {string} fileName - Specifies the file name of the image file for exporting.
     * @param {boolean} allowDownload - Specifies whether to download image as a file or not.
     * @returns {Promise<string>} - Specifies the base64 string of the exported image which is returned when the allowDownload is set to false.
     * @private
     */
    export(maps: Maps, type: ExportType, fileName: string, allowDownload?: boolean): Promise<string>;
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name
     */
    protected getModuleName(): string;
    /**
     * To destroy the ImageExport.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
