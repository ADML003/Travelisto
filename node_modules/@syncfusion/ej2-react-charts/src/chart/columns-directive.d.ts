import { ComplexBase } from '@syncfusion/ej2-react-base';
import { ColumnModel } from '@syncfusion/ej2-charts';
/**
 * `Column` directive represent a axis column of the react Chart.
 * It must be contained in a Chart component(`ChartComponent`).
 * ```tsx
 * <ChartComponent>
 * <ColumnsDirective>
 * <ColumnDirective></ColumnDirective>
 * </ColumnsDirective>
 * </ChartComponent>
 * ```
 */
export declare class ColumnDirective extends ComplexBase<ColumnModel & {
    children?: React.ReactNode;
}, ColumnModel> {
    static moduleName: string;
}
export declare class ColumnsDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
