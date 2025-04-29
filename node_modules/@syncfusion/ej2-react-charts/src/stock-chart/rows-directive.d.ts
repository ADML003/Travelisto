import { ComplexBase } from '@syncfusion/ej2-react-base';
import { StockChartRowModel } from '@syncfusion/ej2-charts';
/**
 * `Row` directive represent a axis row of the react Chart.
 * It must be contained in a Chart component(`ChartComponent`).
 * ```tsx
 * <StockChartComponent>
 * <RowsDirective>
 * <RowDirective></RowDirective>
 * </RowsDirective>
 * </ChartComponent>
 * ```
 */
export declare class StockChartRowDirective extends ComplexBase<StockChartRowModel & {
    children?: React.ReactNode;
}, StockChartRowModel> {
    static moduleName: string;
}
export declare class StockChartRowsDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
