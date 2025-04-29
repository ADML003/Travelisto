import { ComplexBase } from '@syncfusion/ej2-react-base';
import { AxisModel } from '@syncfusion/ej2-charts';
/**
 * `Axis` directive represent a axis row of the react Chart.
 * It must be contained in a Chart component(`ChartComponent`).
 * ```tsx
 * <ChartComponent>
 * <AxesDirective>
 * <AxisDirective></AxisDirective>
 * </AxesDirective>
 * </ChartComponent>
 * ```
 */
export declare class AxisDirective extends ComplexBase<AxisModel & {
    children?: React.ReactNode;
}, AxisModel> {
    static moduleName: string;
}
export declare class AxesDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
