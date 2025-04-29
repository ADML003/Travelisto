import { ComplexBase } from '@syncfusion/ej2-react-base';
import { LayerSettingsModel } from '@syncfusion/ej2-maps';
/**
 * Represents the directive to define the layer of the maps.
 * ```tsx
 * <MapsComponent>
 * <LayersDirective>
 * <LayerDirective></LayerDirective>
 * </LayersDirective>
 * </MapsComponent>
 * ```
 */
export declare class LayerDirective extends ComplexBase<LayerSettingsModel & {
    children?: React.ReactNode;
}, LayerSettingsModel> {
    static moduleName: string;
}
export declare class LayersDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
