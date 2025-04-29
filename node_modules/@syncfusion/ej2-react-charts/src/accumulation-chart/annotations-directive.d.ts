import { ComplexBase } from '@syncfusion/ej2-react-base';
import { AccumulationAnnotationSettingsModel } from '@syncfusion/ej2-charts';
export interface AccumulationAnnotationSettingsDirTypecast {
    content?: string | Function | any;
}
/**
 * `AccumulationAnnotationsDirective` directive represent a annotation of the react AccumulationChart.
 * It must be contained in a Pie component(`AccumulationChart`).
 * ```tsx
 * <AccumulationChartComponent>
 * <AccumulationAnnotationsDirective>
 * <AccumulationAnnotationDirective></AccumulationAnnotationDirective>
 * </AccumulationAnnotationsDirective>
 * </AccumulationChartComponent>
 * ```
 */
export declare class AccumulationAnnotationDirective extends ComplexBase<AccumulationAnnotationSettingsModel | AccumulationAnnotationSettingsDirTypecast & {
    children?: React.ReactNode;
}, AccumulationAnnotationSettingsModel | AccumulationAnnotationSettingsDirTypecast> {
    static moduleName: string;
}
export declare class AccumulationAnnotationsDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
