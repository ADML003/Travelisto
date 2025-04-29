import { ComplexBase } from '@syncfusion/ej2-react-base';
import { AnnotationModel } from '@syncfusion/ej2-maps';
export interface AnnotationDirTypecast {
    content?: string | Function | any;
}
/**
 * Represents the directive to define the annotations in the maps.
 * ```tsx
 * <MapsComponent>
 * <AnnotationsDirective>
 * <AnnotationDirective></AnnotationDirective>
 * </AnnotationsDirective>
 * </MapsComponent>
 * ```
 */
export declare class AnnotationDirective extends ComplexBase<AnnotationModel | AnnotationDirTypecast & {
    children?: React.ReactNode;
}, AnnotationModel | AnnotationDirTypecast> {
    static moduleName: string;
}
export declare class AnnotationsDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
