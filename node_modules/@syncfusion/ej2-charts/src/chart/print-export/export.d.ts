import { Chart } from '../chart';
import { AccumulationChart } from '../../accumulation-chart';
import { RangeNavigator } from '../../range-navigator';
import { PdfPageOrientation } from '@syncfusion/ej2-pdf-export';
import { ExportType } from '../../common/utils/enum';
import { StockChart } from '../../stock-chart';
import { IPDFArgs } from '../../common/model/interface';
/**
 * Defines the cell style in an Excel export.
 * The `ExcelCellStyle` interface specifies the styling options for cells in an Excel export.
 *
 * @private
 */
interface ExcelCellStyle {
    /**
     * Defines the horizontal alignment for the cell style.
     *
     * @private
     */
    hAlign?: string;
    /**
     * Defines the vertical alignment for the cell style.
     *
     * @private
     */
    vAlign?: string;
    /**
     * Specifies whether the font is bold.
     * The `bold` property determines if the font should be rendered in a bold style.
     *
     * @private
     */
    bold?: boolean;
    /**
     * Specifies whether to wrap text for the cell style.
     *
     * @private
     */
    wrapText?: boolean;
}
/**
 * Defines the cell in an Excel export.
 *
 * @private
 */
interface ExcelCell {
    /**
     * The `index` property specifies the position of the cell within the row or column.
     *
     * @private
     */
    index?: number;
    /**
     * Specifies the number of columns the cell spans across in the worksheet.
     *
     * @private
     */
    colSpan?: number;
    /**
     * Specifies the number of rows the cell spans across in the worksheet.
     *
     * @private
     */
    rowSpan?: number;
    /**
     * The `value` property specifies the content of the cell in the worksheet and can accept text, numbers, boolean values, or dates.
     *
     * @private
     */
    value?: string | boolean | number | Date;
    /**
     * The `style` property specifies how the cell is visually styled in the worksheet.
     *
     * @private
     */
    style?: ExcelCellStyle;
}
/**
 * Defines the row and column position in an Excel export.
 *
 * @private
 */
export interface ExcelRowAndColumn {
    /**
     * The `index` property specifies the position of a cell within a row or column.
     *
     * @private
     */
    index?: number;
    /**
     * Defines the cells in a row and column.
     *
     * @private
     */
    cells?: ExcelCell[];
    /**
     * Defines the width of each row and column.
     *
     * @private
     */
    width?: number;
}
/**
 * The `Export` module is used to print and export the rendered chart.
 */
export declare class Export {
    private chart;
    private rows;
    private actualRowCount;
    private series;
    private axisCollection;
    private requiredValuesLength;
    private histogramSeriesCount;
    /**
     * Constructor for export module.
     *
     * @private
     */
    constructor(chart: Chart);
    /**
     * Exports the chart or charts to the specified file format.
     *
     * @param {ExportType} type - The type of export (e.g., 'PNG', 'JPEG', 'PDF', etc.).
     * @param {string} fileName - The name of the file to save.
     * @param {PdfPageOrientation} [orientation] - The orientation of the PDF page. Defaults to 'Portrait'.
     * @param {(Chart | AccumulationChart | RangeNavigator | StockChart)[]} [controls] - An array of chart or chart-like components to export.
     * @param {number} [width] - The width of the exported image or PDF page.
     * @param {number} [height] - The height of the exported image or PDF page.
     * @param {boolean} [isVertical] - Specifies whether to export the chart vertically. Defaults to false.
     * @param {IPDFArgs} [header] - The header options for the PDF.
     * @param {IPDFArgs} [footer] - The footer options for the PDF.
     * @param {boolean} [exportToMultiplePage] - Specifies whether to export the charts to multiple pages in PDF. Defaults to false.
     * @returns {void}
     * @public
     */
    export(type: ExportType, fileName: string, orientation?: PdfPageOrientation, controls?: (Chart | AccumulationChart | RangeNavigator | StockChart)[], width?: number, height?: number, isVertical?: boolean, header?: IPDFArgs, footer?: IPDFArgs, exportToMultiplePage?: boolean): void;
    /**
     * Exports the specified chart or charts to Excel format.
     *
     * @param {(Chart | AccumulationChart | RangeNavigator | StockChart)[]} controls - An array of chart or chart-like components to export.
     * @param {string} fileName - The name of the Excel file to save.
     * @param {ExportType} type - The type of export (e.g., 'XLSX', 'CSV', etc.).
     * @param {number} [width] - The width of the exported Excel sheet.
     * @param {number} [height] - The width of the exported Excel sheet.
     * @returns {void}
     * @private
     */
    private excelExport;
    /**
     * Creates an Excel sheet for exporting RangeNavigator control data.
     *
     * @param {RangeNavigator} controls - The RangeNavigator control to export.
     * @param {ExcelCellStyle} headerStyle - The style to apply to the header cells in the Excel sheet.
     * @param {ExportType} type - The type of export (e.g., 'XLSX', 'CSV', etc.).
     * @returns {void}
     * @private
     */
    private createRangeNavigatorExcelSheet;
    /**
     * Gets the number of columns for the Excel sheet.
     *
     * @param {boolean} isRangeNavigator - Specifies whether the data is for a RangeNavigator control.
     * @returns {string[][]} - An array containing the required values for the Excel sheet.
     * @private
     */
    private getRequiredValues;
    /**
     * Gets the title for the Excel sheet.
     *
     * @param {string[][]} requiredValues - The required values for the Excel sheet.
     * @param {ExcelCellStyle} headerStyle - The style for the header.
     * @param {(Chart | AccumulationChart | RangeNavigator | StockChart)[]} controls - The controls to export.
     * @param {boolean} isRangeNavigator - Specifies whether the data is for a RangeNavigator control.
     * @param {boolean} isAccumulation - Specifies whether the data is for an AccumulationChart.
     * @param {ExportType} type - The type of export.
     * @param {number} xValueLength - The length of X values.
     * @returns {void}
     * @private
     */
    private getTitle;
    /**
     * Gets the X values for the Excel sheet.
     *
     * @param {string[][]} requiredValues - The required values for the Excel sheet.
     * @param {(Chart | AccumulationChart | RangeNavigator | StockChart)[]} controls - The controls to export.
     * @param {boolean} isRangeNavigator - Specifies whether the data is for a RangeNavigator control.
     * @param {boolean} isAccumulation - Specifies whether the data is for an AccumulationChart.
     * @returns {number[][]} - The X values.
     * @private
     */
    private getXValue;
    /**
     * Creates an Excel sheet.
     *
     * @param {boolean} isRangeNavigator - Specifies whether the data is for a RangeNavigator control.
     * @param {boolean} isAccumulation - Specifies whether the data is for an AccumulationChart.
     * @param {number[][]} xValues - The X values for the Excel sheet.
     * @param {ExportType} type - The type of export.
     * @param {string[][]} requiredValues - The required values for the Excel sheet.
     * @param {ExcelCellStyle} headerStyle - The style for the header in Excel.
     * @param {(Chart | AccumulationChart | RangeNavigator | StockChart)[]} controls - The controls to export.
     * @private
     */
    private createExcelSheet;
    /**
     * Gets the data URL of the chart or accumulation chart.
     *
     * @param {Chart | AccumulationChart} chart - The chart or accumulation chart.
     * @returns {{ element: HTMLCanvasElement, dataUrl?: string, blobUrl?: string}} - The data URL information.
     */
    getDataUrl(chart: Chart | AccumulationChart): {
        element: HTMLCanvasElement;
        dataUrl?: string;
        blobUrl?: string;
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the chart.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
export {};
