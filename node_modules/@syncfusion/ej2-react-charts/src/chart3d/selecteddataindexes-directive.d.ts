import { ComplexBase } from '@syncfusion/ej2-react-base';
import { IndexesModel } from '@syncfusion/ej2-charts';
/**
 * `SelectedDataIndex` directive represent the selected data in react Chart.
 * It must be contained in a Chart component(`Chart3DComponent`).
 * ```tsx
 * <Chart3DComponent>
 * <Chart3DSelectedDataIndexesDirective>
 * <Chart3DSelectedDataIndexDirective></Chart3DSelectedDataIndexDirective>
 * </Chart3DSelectedDataIndexesDirective>
 * </Chart3DComponent>
 * ```
 */
export declare class Chart3DSelectedDataIndexDirective extends ComplexBase<IndexesModel & {
    children?: React.ReactNode;
}, IndexesModel> {
    static moduleName: string;
}
export declare class Chart3DSelectedDataIndexesDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
