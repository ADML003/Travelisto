import { StockChart } from '../stock-chart';
import { PeriodsModel } from '../../common/model/base-model';
import { TechnicalIndicators } from '../../chart/utils/enum';
import { MenuEventArgs } from '@syncfusion/ej2-splitbuttons';
/**
 * Period selector for range navigator
 */
/** @private */
export declare class ToolBarSelector {
    private stockChart;
    private indicatorDropDown;
    private trendlineDropDown;
    private selectedSeries;
    private selectedIndicator;
    private selectedTrendLine;
    constructor(chart: StockChart);
    initializePeriodSelector(): void;
    /**
     * This method returns itemModel for dropdown button.
     *
     * @param {ChartSeriesType[] | TechnicalIndicators[] | ExportType[] | TrendlineTypes[]} type - The type of data for the dropdown button (e.g., ChartSeriesType, TechnicalIndicators, ExportType, TrendlineTypes).
     * @returns {ItemModel[]} - An array of item models for the dropdown button.
     */
    private getDropDownItems;
    /**
     * This method changes the type of series while selectind series in dropdown button.
     *
     * @param {string} seriesType - The type of series selected from the dropdown button.
     * @returns {void}
     */
    private addedSeries;
    initializeSeriesSelector(): void;
    private trendline;
    private indicators;
    initializeTrendlineSelector(): void;
    initializeIndicatorSelector(): void;
    private getIndicator;
    createIndicatorAxes(type: TechnicalIndicators, args: MenuEventArgs): void;
    tickMark(args: MenuEventArgs): string;
    exportButton(): void;
    calculateAutoPeriods(): PeriodsModel[];
    /**
     * Finds the range of periods between the specified minimum and maximum values.
     *
     * @param {number} min - The minimum value of the range.
     * @param {number} max - The maximum value of the range.
     * @returns {PeriodsModel[]} - An array of PeriodsModel objects that fall within the specified range.
     * @private
     */
    findRange(min: number, max: number): PeriodsModel[];
    /**
     * Text elements added to while export the chart
     * It details about the seriesTypes, indicatorTypes and Trendlines selected in chart.
     *
     * @param {boolean} isPrint - Specifies whether the export is for printing.
     * @returns {Element} - The element containing the exported chart details.
     */
    private addExportSettings;
    /** @private */
    private textElementSpan;
}
