import { ComplexBase } from '@syncfusion/ej2-react-base';
import { IndexesModel } from '@syncfusion/ej2-charts';
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
export declare class SelectedDataIndexDirective extends ComplexBase<IndexesModel & {
    children?: React.ReactNode;
}, IndexesModel> {
    static moduleName: string;
}
export declare class SelectedDataIndexesDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
