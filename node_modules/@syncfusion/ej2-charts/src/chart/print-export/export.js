import { ExportUtils } from '../../common/utils/export';
import { beforeExport } from '../../common/model/constants';
import { Workbook } from '@syncfusion/ej2-excel-export';
import { getValue } from '@syncfusion/ej2-base';
/**
 * The `Export` module is used to print and export the rendered chart.
 */
var Export = /** @class */ (function () {
    /**
     * Constructor for export module.
     *
     * @private
     */
    function Export(chart) {
        this.actualRowCount = 0;
        this.series = [];
        this.axisCollection = [];
        this.requiredValuesLength = 0;
        this.histogramSeriesCount = 0;
        this.chart = chart;
    }
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
    Export.prototype.export = function (type, fileName, orientation, controls, width, height, isVertical, header, footer, exportToMultiplePage) {
        var exportChart = new ExportUtils(this.chart);
        controls = controls ? controls : [this.chart];
        if (type === 'CSV' || type === 'XLSX') {
            this.excelExport(controls, fileName, type, width, height);
        }
        else {
            var argsData = {
                cancel: false, name: beforeExport, width: width, height: height, excelProperties: {
                    rows: undefined,
                    columns: undefined
                }
            };
            this.chart.trigger(beforeExport, argsData);
            if (!argsData.cancel) {
                exportChart.export(type, fileName, orientation, controls, width = argsData.width, height = argsData.height, isVertical, header, footer, exportToMultiplePage);
            }
        }
    };
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
    Export.prototype.excelExport = function (controls, fileName, type, width, height) {
        this.rows = [];
        this.actualRowCount = 1;
        var workSheets = [];
        var requiredValues = [];
        var headerStyle = { bold: true, hAlign: 'Center', vAlign: 'Center', wrapText: true };
        var xValues = [];
        for (var i = 0; i < controls.length; i++) {
            var isRangeNavigator = controls[i].getModuleName() === 'rangeNavigator';
            var isAccumulation = controls[i].getModuleName() === 'accumulationchart';
            this.series = isRangeNavigator ? controls[i].series :
                controls[i].visibleSeries;
            if (isRangeNavigator && this.series.length === 0) {
                if (controls[i].dataSource) {
                    //To create an Excel sheet when the Rangenavigator series is not given.
                    this.createRangeNavigatorExcelSheet(controls[i], headerStyle, type);
                }
            }
            else {
                this.histogramSeriesCount = 0;
                this.requiredValuesLength = 0;
                this.axisCollection = [];
                if (isAccumulation || isRangeNavigator) {
                    this.axisCollection.push(null);
                }
                else {
                    this.axisCollection = controls[i].getModuleName() === 'stockChart' ? controls[i].chart.horizontalAxes : controls[i].horizontalAxes;
                }
                //To get the number of columns for the excel.
                requiredValues = this.getRequiredValues(isRangeNavigator);
                if (this.requiredValuesLength === 0 && this.series.length === this.histogramSeriesCount) {
                    return;
                }
                //To get all x values in the series.
                xValues = this.getXValue(requiredValues, controls[i], isRangeNavigator, isAccumulation);
                //To get the the chart title and series name.
                this.getTitle(requiredValues, headerStyle, controls[i], isRangeNavigator, isAccumulation, type, xValues[0].length);
                //To create an Excel sheet.
                this.createExcelSheet(isRangeNavigator, isAccumulation, xValues, type, requiredValues, headerStyle, controls[i]);
            }
        }
        var columns = [];
        this.requiredValuesLength = this.requiredValuesLength === 0 ? 1 : this.requiredValuesLength;
        for (var columnCount = 0; columnCount < this.requiredValuesLength; columnCount++) {
            columns.push({ index: columnCount + 1, width: 100 });
        }
        var argsData = {
            cancel: false, name: beforeExport, width: width, height: height, excelProperties: {
                rows: this.rows,
                columns: columns
            }
        };
        controls[0].trigger(beforeExport, argsData);
        if (!argsData.cancel) {
            workSheets.push({ columns: argsData.excelProperties.columns, rows: argsData.excelProperties.rows });
            var book = new Workbook({ worksheets: workSheets }, type === 'XLSX' ? 'xlsx' : 'csv');
            fileName = fileName ? fileName : type === 'XLSX' ? 'XLSX' : 'CSV';
            book.save(fileName + (type === 'XLSX' ? '.xlsx' : '.csv'));
        }
    };
    /**
     * Creates an Excel sheet for exporting RangeNavigator control data.
     *
     * @param {RangeNavigator} controls - The RangeNavigator control to export.
     * @param {ExcelCellStyle} headerStyle - The style to apply to the header cells in the Excel sheet.
     * @param {ExportType} type - The type of export (e.g., 'XLSX', 'CSV', etc.).
     * @returns {void}
     * @private
     */
    Export.prototype.createRangeNavigatorExcelSheet = function (controls, headerStyle, type) {
        var xName = controls.xName;
        var yName = controls.yName;
        this.rows.push({
            index: this.actualRowCount, cells: [{ index: 1, value: controls.valueType.indexOf('DateTime') > -1 ? controls.valueType : 'Category', colSpan: 1, rowSpan: 1,
                    style: headerStyle },
                { index: 2, value: yName, colSpan: 1, rowSpan: 1, style: headerStyle }]
        });
        this.actualRowCount++;
        var dataSource = controls.dataSource;
        for (var dataCount = 0; dataCount < dataSource.length; dataCount++) {
            this.rows.push({ index: this.actualRowCount, cells: [{ index: 1, value: (type === 'CSV' && dataSource[dataCount][xName] === null) ? '' :
                            dataSource[dataCount][xName], colSpan: 1, rowSpan: 1, style: headerStyle },
                    { index: 2, value: (type === 'CSV' && dataSource[dataCount][yName] === null) ? '' : dataSource[dataCount][yName], colSpan: 1, rowSpan: 1, style: {} }] });
            this.actualRowCount++;
        }
        this.requiredValuesLength = 2;
    };
    /**
     * Gets the number of columns for the Excel sheet.
     *
     * @param {boolean} isRangeNavigator - Specifies whether the data is for a RangeNavigator control.
     * @returns {string[][]} - An array containing the required values for the Excel sheet.
     * @private
     */
    Export.prototype.getRequiredValues = function (isRangeNavigator) {
        var requiredValues = [];
        var _loop_1 = function (seriesCount) {
            var seriesType = this_1.series[seriesCount].type;
            if ((!isRangeNavigator && !this_1.series[seriesCount].visible) || this_1.series[seriesCount].category === 'TrendLine') {
                requiredValues.push([]);
                return "continue";
            }
            if (seriesType === 'Histogram') {
                requiredValues.push([]);
                this_1.histogramSeriesCount++;
            }
            else if (this_1.series[seriesCount].category === 'Pareto') {
                requiredValues.push([this_1.series[seriesCount]['xName'], 'y']);
            }
            else if (seriesType.indexOf('Range') !== -1 || seriesType === 'Hilo') {
                requiredValues.push([this_1.series[seriesCount]['xName'], this_1.series[seriesCount]['high'], this_1.series[seriesCount]['low']]);
            }
            else if (seriesType === 'HiloOpenClose' || seriesType === 'Candle') {
                requiredValues.push([this_1.series[seriesCount]['xName'], this_1.series[seriesCount]['high'], this_1.series[seriesCount]['low'], this_1.series[seriesCount]['open'], this_1.series[seriesCount]['close']]);
                if (seriesType === 'Candle' && this_1.series[seriesCount]['volume'] !== '') {
                    requiredValues[seriesCount].push(this_1.series[seriesCount]['volume']);
                }
            }
            else if (seriesType === 'BoxAndWhisker') {
                requiredValues.push([this_1.series[seriesCount]['xName'], 'maximum', 'upperQuartile', 'median', 'lowerQuartile', 'minimum', 'outliers']);
            }
            else if (seriesType === 'Bubble') {
                requiredValues.push([this_1.series[seriesCount]['xName'], this_1.series[seriesCount]['yName']]);
                if (this_1.series[seriesCount]['size'] !== '') {
                    requiredValues[seriesCount].push(this_1.series[seriesCount]['size']);
                }
            }
            else if (seriesType === 'Pie') {
                requiredValues.push([this_1.series[seriesCount]['xName'], this_1.series[seriesCount]['yName']]);
                if (this_1.series[seriesCount]['radius'].match(/[a-zA-Z]/)) {
                    requiredValues[seriesCount].push(this_1.series[seriesCount]['radius']);
                }
            }
            else {
                requiredValues.push([this_1.series[seriesCount]['xName'], this_1.series[seriesCount]['yName']]);
            }
            if (this_1.series[seriesCount].errorBar &&
                this_1.series[seriesCount].errorBar.visible) {
                var errorBar_1 = this_1.series[seriesCount].errorBar;
                var errorTypes = ['verticalError', 'horizontalError', 'verticalNegativeError', 'horizontalNegativeError', 'verticalPositiveError', 'horizontalPositiveError'];
                errorTypes.forEach(function (errorType) {
                    if (typeof errorBar_1[errorType] === 'string') {
                        requiredValues[seriesCount].push(errorBar_1[errorType]);
                    }
                });
            }
            this_1.requiredValuesLength += requiredValues[seriesCount].length;
        };
        var this_1 = this;
        for (var seriesCount = 0; seriesCount < this.series.length; seriesCount++) {
            _loop_1(seriesCount);
        }
        return requiredValues;
    };
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
    Export.prototype.getTitle = function (requiredValues, headerStyle, control, isRangeNavigator, isAccumulation, type, xValueLength) {
        var cells = [];
        var additionalCells = [];
        var index = 1;
        var isTitle = false;
        var titlePushRowIndex;
        if (!isRangeNavigator && type === 'XLSX' && control.title) {
            this.rows.push({});
            titlePushRowIndex = this.rows.length > 0 ? this.rows.length - 1 : -1;
            this.actualRowCount++;
            isTitle = true;
        }
        for (var axisCount = 0; axisCount < this.axisCollection.length; axisCount++) {
            if (isAccumulation && xValueLength === 0) {
                break;
            }
            var isYName = false;
            var valueType = '';
            var currentIndex = index;
            var isXValue = false;
            for (var seriesCount = 0; seriesCount < this.series.length; seriesCount++) {
                var axisName = this.axisCollection[axisCount] !== null ? (this.axisCollection[axisCount].name === 'primaryXAxis' || (this.axisCollection[axisCount].name === 'primaryYAxis' && this.series[seriesCount].type.indexOf('Bar') > -1)) ? null : this.axisCollection[axisCount].name : '';
                if (!isRangeNavigator && ((!isAccumulation && (axisName !==
                    this.series[seriesCount].xAxisName)) ||
                    !this.series[seriesCount].visible ||
                    this.series[seriesCount].category === 'TrendLine' || this.series[seriesCount].type === 'Histogram')) {
                    continue;
                }
                if (!isXValue) {
                    cells.push({});
                    index++;
                }
                isXValue = true;
                var seriesName = this.series[seriesCount].name;
                var requiredValuesLength = this.series[seriesCount].type === 'BoxAndWhisker' ? requiredValues[seriesCount].length - 1 : requiredValues[seriesCount].length;
                if (requiredValues[seriesCount][1] === this.series[seriesCount].yName) {
                    for (var requiredValuesCount = 1; requiredValuesCount < requiredValuesLength; requiredValuesCount++) {
                        cells.push({ index: index, value: (requiredValuesCount === 1 ? seriesName ? seriesName : 'Series-' + (seriesCount + 1) : requiredValues[seriesCount][requiredValuesCount]), colSpan: 1, rowSpan: 1, style: headerStyle });
                        index++;
                    }
                }
                else {
                    cells.push({ index: index, value: seriesName ? seriesName : 'Series-' + (seriesCount + 1), colSpan: requiredValuesLength - 1, rowSpan: 1, style: headerStyle });
                    var localIndex = index;
                    for (var requiredValuesCount = 1; requiredValuesCount < requiredValuesLength; requiredValuesCount++) {
                        additionalCells.push({
                            index: localIndex, value: requiredValues[seriesCount][requiredValuesCount],
                            colSpan: 1, rowSpan: 1, style: headerStyle
                        });
                        localIndex++;
                    }
                    if (this.series[seriesCount].type === 'BoxAndWhisker') {
                        cells.push({ index: localIndex, value: requiredValues[seriesCount][requiredValuesLength],
                            colSpan: 1, rowSpan: 2, style: headerStyle
                        });
                        localIndex++;
                    }
                    index = localIndex;
                    isYName = true;
                }
                valueType = isAccumulation ? requiredValues[0][0] : isRangeNavigator ? control.valueType :
                    this.axisCollection[axisCount].valueType;
                valueType = (isAccumulation || valueType.indexOf('DateTime') > -1) ? valueType : 'Category';
            }
            if (isXValue) {
                cells[(currentIndex - 1)] = { index: currentIndex, value: valueType, colSpan: 1,
                    rowSpan: isYName ? 2 : 1, style: headerStyle };
            }
        }
        if (cells.length) {
            this.rows.push({ index: this.actualRowCount, cells: cells });
            this.actualRowCount++;
        }
        if (additionalCells.length) {
            this.rows.push({ index: this.actualRowCount, cells: additionalCells });
            this.actualRowCount++;
        }
        if (isTitle) {
            cells = [];
            cells.push({ index: 1, value: control.title,
                colSpan: (index === 1 ? index : index - 1), rowSpan: 1, style: headerStyle });
            this.rows[titlePushRowIndex] = ({ index: titlePushRowIndex + 1, cells: cells });
        }
        this.requiredValuesLength = index - 1;
    };
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
    Export.prototype.getXValue = function (requiredValues, control, isRangeNavigator, isAccumulation) {
        var xValues = [];
        for (var axisCount = 0; axisCount < this.axisCollection.length; axisCount++) {
            var xValue = [];
            var valueType = isAccumulation ? '' : isRangeNavigator ? control.valueType : this.axisCollection[axisCount].valueType;
            for (var seriesCount = 0; seriesCount < this.series.length; seriesCount++) {
                var axisName = this.axisCollection[axisCount] !== null ? (this.axisCollection[axisCount].name === 'primaryXAxis' || (this.axisCollection[axisCount].name === 'primaryYAxis' && this.series[seriesCount].type.indexOf('Bar') > -1)) ? null : this.axisCollection[axisCount].name : '';
                if ((!isRangeNavigator && ((!isAccumulation && (axisName !==
                    this.series[seriesCount].xAxisName)) ||
                    !this.series[seriesCount].visible) ||
                    this.series[seriesCount].category === 'TrendLine' || this.series[seriesCount].type === 'Histogram')) {
                    continue;
                }
                for (var dataCount = 0; dataCount < this.series[seriesCount].dataSource.length; dataCount++) {
                    if (isAccumulation && !this.series[seriesCount].points[dataCount].visible) {
                        continue;
                    }
                    xValue.push((valueType.indexOf('DateTime') > -1) ? new Date(this.series[seriesCount].
                        dataSource[dataCount][requiredValues[seriesCount][0]]).getTime() :
                        this.series[seriesCount].dataSource[dataCount][requiredValues[seriesCount][0]]);
                }
            }
            xValues.push(xValue);
        }
        var _loop_2 = function (xValuesLength) {
            xValues[xValuesLength] = xValues[xValuesLength].filter(function (item, index) {
                return xValues[xValuesLength].indexOf(item) === index;
            });
        };
        for (var xValuesLength = 0; xValuesLength < xValues.length; xValuesLength++) {
            _loop_2(xValuesLength);
        }
        return (xValues);
    };
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
    Export.prototype.createExcelSheet = function (isRangeNavigator, isAccumulation, xValues, type, requiredValues, headerStyle, controls) {
        var startIndex = 0;
        var index = 0;
        for (var axisCount = 0; axisCount < this.axisCollection.length; axisCount++) {
            var valueType = isAccumulation ? '' : isRangeNavigator ? controls[0].valueType : this.axisCollection[axisCount].valueType;
            for (var xValueLength = 0; xValueLength < xValues[axisCount].length; xValueLength++) {
                index = startIndex ? startIndex : 1;
                var cells = [];
                var isXValue = true;
                for (var seriesCount = 0; seriesCount < this.series.length; seriesCount++) {
                    var axisName = this.axisCollection[axisCount] !== null ? (this.axisCollection[axisCount].name === 'primaryXAxis' || (this.axisCollection[axisCount].name === 'primaryYAxis' && this.series[seriesCount].type.indexOf('Bar') > -1)) ? null : this.axisCollection[axisCount].name : '';
                    if ((!isRangeNavigator && ((!isAccumulation &&
                        this.series[seriesCount].xAxisName !== axisName) ||
                        !this.series[seriesCount].visible) ||
                        this.series[seriesCount].category === 'TrendLine' || this.series[seriesCount].type === 'Histogram')) {
                        continue;
                    }
                    var isExist = false;
                    var dataSource = this.series[seriesCount].dataSource;
                    for (var dataCount = 0; dataCount < dataSource.length; dataCount++) {
                        var xValue = (valueType.indexOf('DateTime') > -1) ? this.series[seriesCount].category === 'Pareto' ? new Date(this.series[seriesCount].points[dataCount][requiredValues[seriesCount][0]]).getTime() :
                            new Date(dataSource[dataCount][requiredValues[seriesCount][0]]).getTime() :
                            this.series[seriesCount].category === 'Pareto' ? this.series[seriesCount].points[dataCount][requiredValues[seriesCount][0]] : dataSource[dataCount][requiredValues[seriesCount][0]];
                        if (xValues[axisCount][xValueLength] === xValue) {
                            var usedValueCount = isXValue ? 0 : 1;
                            var usedValueLength = this.series[seriesCount].type === 'BoxAndWhisker' ? requiredValues[seriesCount].length - 1 : requiredValues[seriesCount].length;
                            for (; usedValueCount < usedValueLength; usedValueCount++) {
                                var cellValue = this.series[seriesCount].enableComplexProperty ?
                                    getValue(requiredValues[seriesCount][usedValueCount], dataSource[dataCount]) :
                                    dataSource[dataCount][requiredValues[seriesCount][usedValueCount]];
                                var value = (usedValueCount !== 0 && (this.series[seriesCount].type === 'BoxAndWhisker' || this.series[seriesCount].category === 'Pareto')) ? this.series[seriesCount].points[dataCount][requiredValues[seriesCount][usedValueCount]] : cellValue;
                                if (value === null && type === 'CSV') {
                                    value = '';
                                }
                                cells.push({
                                    index: (usedValueCount === 0 ? startIndex === 0 ? 1 : startIndex : index), value: value,
                                    colSpan: 1, rowSpan: 1, style: usedValueCount === 0 ? headerStyle : {}
                                });
                                index++;
                            }
                            if (this.series[seriesCount].type === 'BoxAndWhisker') {
                                cells.push({ index: index, value: this.series[seriesCount].points[dataCount]['outliers'][0], colSpan: 1, rowSpan: 1, style: {} });
                                index++;
                            }
                            isXValue = false;
                            isExist = true;
                            break;
                        }
                    }
                    if (!isExist) {
                        index += (requiredValues[seriesCount].length - 1);
                    }
                }
                this.rows.push({ index: this.actualRowCount, cells: cells });
                this.actualRowCount++;
            }
            startIndex = index;
        }
    };
    /**
     * Gets the data URL of the chart or accumulation chart.
     *
     * @param {Chart | AccumulationChart} chart - The chart or accumulation chart.
     * @returns {{ element: HTMLCanvasElement, dataUrl?: string, blobUrl?: string}} - The data URL information.
     */
    Export.prototype.getDataUrl = function (chart) {
        var exportUtil = new ExportUtils(chart);
        return exportUtil.getDataUrl(chart);
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    Export.prototype.getModuleName = function () {
        // Returns the module name
        return 'Export';
    };
    /**
     * To destroy the chart.
     *
     * @returns {void}
     * @private
     */
    Export.prototype.destroy = function () {
        // Destroy method performed here
    };
    return Export;
}());
export { Export };
