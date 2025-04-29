import { ComplexBase } from '@syncfusion/ej2-react-base';
import { StockSeriesModel } from '@syncfusion/ej2-charts';
/**
 * `SeriesDirective` directive represent a series of the react chart.
 * It must be contained in a Chart component(`ChartComponent`).
 * ```tsx
 * <StockChartComponent>
 * <StockChartSeriesCollectionDirective>
 * <StockChartSeriesDirective></SeriesDirective>
 * </StockChartSeriesCollectionDirective>
 * </StockChartComponent>
 * ```
 */
export declare class StockChartSeriesDirective extends ComplexBase<StockSeriesModel & {
    children?: React.ReactNode;
}, StockSeriesModel> {
    static moduleName: string;
}
export declare class StockChartSeriesCollectionDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
