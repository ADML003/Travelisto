import { ComplexBase } from '@syncfusion/ej2-react-base';
import { RowModel } from '@syncfusion/ej2-charts';
/**
 * `Row` directive represent a axis row of the react Chart.
 * It must be contained in a Chart component(`ChartComponent`).
 * ```tsx
 * <ChartComponent>
 * <RowsDirective>
 * <RowDirective></RowDirective>
 * </RowsDirective>
 * </ChartComponent>
 * ```
 */
export declare class RowDirective extends ComplexBase<RowModel & {
    children?: React.ReactNode;
}, RowModel> {
    static moduleName: string;
}
export declare class RowsDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
