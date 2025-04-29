import { ComplexBase } from '@syncfusion/ej2-react-base';
import { StockChartIndicatorModel } from '@syncfusion/ej2-charts';
/**
 * `IndicatorDirective` directive represent a indicator of the react chart.
 * It must be contained in a Chart component(`ChartComponent`).
 * ```tsx
 * <StockChartComponent>
 * <StockChartIndicatorsDirective>
 * <StockChartIndicatorDirective></StockChartIndicatorDirective>
 * </StockChartIndicatorsDirective>
 * </StockChartComponent>
 * ```
 */
export declare class StockChartIndicatorDirective extends ComplexBase<StockChartIndicatorModel & {
    children?: React.ReactNode;
}, StockChartIndicatorModel> {
    static moduleName: string;
}
export declare class StockChartIndicatorsDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
