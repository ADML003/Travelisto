import { ComplexBase } from '@syncfusion/ej2-react-base';
import { ChartAnnotationSettingsModel } from '@syncfusion/ej2-charts';
export interface ChartAnnotationSettingsDirTypecast {
    content?: string | Function | any;
}
/**
 * `Annotation` directive represent a annotation of the react Chart.
 * It must be contained in a Chart component(`ChartComponent`).
 * ```tsx
 * <ChartComponent>
 * <AnnotationsDirective>
 * <AnnotationDirective></AnnotationDirective>
 * </AnnotationsDirective>
 * </ChartComponent>
 * ```
 */
export declare class AnnotationDirective extends ComplexBase<ChartAnnotationSettingsModel | ChartAnnotationSettingsDirTypecast & {
    children?: React.ReactNode;
}, ChartAnnotationSettingsModel | ChartAnnotationSettingsDirTypecast> {
    static moduleName: string;
}
export declare class AnnotationsDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
