import { ComplexBase } from '@syncfusion/ej2-react-base';
import { StockChartIndexesModel } from '@syncfusion/ej2-charts';
/**
 * `SelectedDataIndex` directive represent the selected data in react Chart.
 * It must be contained in a Chart component(`ChartComponent`).
 * ```tsx
 * <ChartComponent>
 * <SelectedDataIndexesDirective>
 * <SelectedDataIndexDirective></SelectedDataIndexDirective>
 * </SelectedDataIndexesDirective>
 * </ChartComponent>
 * ```
 */
export declare class StockChartSelectedDataIndexDirective extends ComplexBase<StockChartIndexesModel & {
    children?: React.ReactNode;
}, StockChartIndexesModel> {
    static moduleName: string;
}
export declare class StockChartSelectedDataIndexesDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
