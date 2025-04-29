import { ComplexBase } from '@syncfusion/ej2-react-base';
import { PeriodsModel } from '@syncfusion/ej2-charts';
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
export declare class StockChartPeriodDirective extends ComplexBase<PeriodsModel & {
    children?: React.ReactNode;
}, PeriodsModel> {
    static moduleName: string;
}
export declare class StockChartPeriodsDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
