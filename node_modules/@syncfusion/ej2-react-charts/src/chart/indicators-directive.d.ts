import { ComplexBase } from '@syncfusion/ej2-react-base';
import { TechnicalIndicatorModel } from '@syncfusion/ej2-charts';
/**
 * `IndicatorDirective` directive represent a indicator of the react chart.
 * It must be contained in a Chart component(`ChartComponent`).
 * ```tsx
 * <ChartComponent>
 * <IndicatorsDirective>
 * <IndicatorDirective></IndicatorDirective>
 * </IndicatorsDirective>
 * </ChartComponent>
 * ```
 */
export declare class IndicatorDirective extends ComplexBase<TechnicalIndicatorModel & {
    children?: React.ReactNode;
}, TechnicalIndicatorModel> {
    static moduleName: string;
}
export declare class IndicatorsDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
