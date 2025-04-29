import { ComplexBase } from '@syncfusion/ej2-react-base';
import { InitialShapeSelectionSettingsModel } from '@syncfusion/ej2-maps';
/**
 * Represents the directive to configure the selection of the shapes when the maps is initially rendered.
 * ```tsx
 * <MapsComponent>
 * <LayersDirective>
 * <LayerDirective>
 * <initialShapeSelectionsDirective>
 * <initialShapeSelectionDirective></initialShapeSelectionDirective>
 * </initialShapeSelectionsDirective>
 * </LayerDirective>
 * </LayersDirective>
 * </MapsComponent>
 * ```
 */
export declare class InitialShapeSelectionDirective extends ComplexBase<InitialShapeSelectionSettingsModel & {
    children?: React.ReactNode;
}, InitialShapeSelectionSettingsModel> {
    static moduleName: string;
}
export declare class InitialShapeSelectionsDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
