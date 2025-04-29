import { ComplexBase } from '@syncfusion/ej2-react-base';
import { Chart3DRowModel } from '@syncfusion/ej2-charts';
/**
 * `Row3D` directive represent a axis row of the react Chart.
 * It must be contained in a Chart component(`Chart3DComponent`).
 * ```tsx
 * <Chart3DComponent>
 * <Chart3DRowsDirective>
 * <Chart3DRowDirective></Chart3DRowDirective>
 * </Chart3DRowsDirective>
 * </Chart3DComponent>
 * ```
 */
export declare class Chart3DRowDirective extends ComplexBase<Chart3DRowModel & {
    children?: React.ReactNode;
}, Chart3DRowModel> {
    static moduleName: string;
}
export declare class Chart3DRowsDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
