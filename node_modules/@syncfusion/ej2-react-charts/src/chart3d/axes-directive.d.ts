import { ComplexBase } from '@syncfusion/ej2-react-base';
import { Chart3DAxisModel } from '@syncfusion/ej2-charts';
/**
 * `Axis3D` directive represent a axis row of the react Chart.
 * It must be contained in a Chart component(`Chart3DComponent`).
 * ```tsx
 * <Chart3DComponent>
 * <Chart3DAxesDirective>
 * <Chart3DAxisDirective></Chart3DAxisDirective>
 * </Chart3DAxesDirective>
 * </Chart3DComponent>
 * ```
 */
export declare class Chart3DAxisDirective extends ComplexBase<Chart3DAxisModel & {
    children?: React.ReactNode;
}, Chart3DAxisModel> {
    static moduleName: string;
}
export declare class Chart3DAxesDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
