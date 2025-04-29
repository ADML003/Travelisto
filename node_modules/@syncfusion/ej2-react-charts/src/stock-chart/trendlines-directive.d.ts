import { ComplexBase } from '@syncfusion/ej2-react-base';
import { StockChartTrendlineModel } from '@syncfusion/ej2-charts';
/**
 * `TrendlineDirective` directive represent a trendline of the react chart.
 * It must be contained in a Chart component(`ChartComponent`).
 * ```tsx
 * <StockChartComponent>
 * <StockChartSeriesCollectionDirective>
 * <StockSeriesDirective>
 * <TrendlinesDirective>
 * <TrendlineDirective></TrendlineDirective>
 * </TrendlinesDirective>
 * </StockChartSeriesDirective>
 * </StockChartSeriesCollectionDirective>
 * </StockChartComponent>
 * ```
 */
export declare class StockChartTrendlineDirective extends ComplexBase<StockChartTrendlineModel & {
    children?: React.ReactNode;
}, StockChartTrendlineModel> {
    static moduleName: string;
}
export declare class StockChartTrendlinesDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
