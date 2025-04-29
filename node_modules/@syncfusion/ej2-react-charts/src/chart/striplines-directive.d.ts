import { ComplexBase } from '@syncfusion/ej2-react-base';
import { StripLineSettingsModel } from '@syncfusion/ej2-charts';
/**
 * `StriplineDirective` directive represent a stripline of the react chart.
 * It must be contained in a Chart component(`ChartComponent`).
 * ```tsx
 * <ChartComponent>
 * <AxesDirective>
 * <AxisDirective>
 * <StriplinesDirective>
 * <StriplineDirective></StriplineDirective>
 * </StriplinesDirective>
 * </AxisDirective>
 * </AxesDirective>
 * </ChartComponent>
 * ```
 */
export declare class StripLineDirective extends ComplexBase<StripLineSettingsModel & {
    children?: React.ReactNode;
}, StripLineSettingsModel> {
    static moduleName: string;
}
export declare class StripLinesDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
