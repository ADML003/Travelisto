import { ComplexBase } from '@syncfusion/ej2-react-base';
import { Chart3DColumnModel } from '@syncfusion/ej2-charts';
/**
 * `Column3D` directive represent a axis column of the react Chart.
 * It must be contained in a Chart component(`Chart3DComponent`).
 * ```tsx
 * <Chart3DComponent>
 * <Chart3DColumnsDirective>
 * <Chart3DColumnDirective></Chart3DColumnDirective>
 * </Chart3DColumnsDirective>
 * </Chart3DComponent>
 * ```
 */
export declare class Chart3DColumnDirective extends ComplexBase<Chart3DColumnModel & {
    children?: React.ReactNode;
}, Chart3DColumnModel> {
    static moduleName: string;
}
export declare class Chart3DColumnsDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
