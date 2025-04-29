import { ComplexBase } from '@syncfusion/ej2-react-base';
import { StockChartAxisModel } from '@syncfusion/ej2-charts';
/**
 * `Axis` directive represent a axis row of the react Chart.
 * It must be contained in a Chart component(`ChartComponent`).
 * ```tsx
 * <StockChartComponent>
 * <StockChartAxesDirective>
 * <StockChartAxisDirective></StockChartAxisDirective>
 * </StockChartAxesDirective>
 * </StockChartComponent>
 * ```
 */
export declare class StockChartAxisDirective extends ComplexBase<StockChartAxisModel & {
    children?: React.ReactNode;
}, StockChartAxisModel> {
    static moduleName: string;
}
export declare class StockChartAxesDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
