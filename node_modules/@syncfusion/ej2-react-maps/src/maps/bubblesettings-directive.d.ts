import { ComplexBase } from '@syncfusion/ej2-react-base';
import { BubbleSettingsModel } from '@syncfusion/ej2-maps';
export interface BubbleSettingsDirTypecast {
    tooltipSettings?: any;
}
/**
 * Represents the directive to define the bubbles in the maps.
 * ```tsx
 * <MapsComponent>
 * <LayersDirective>
 * <LayerDirective>
 * <BubblesDirective>
 * <BubbleDirective></BubbleDirective>
 * </BubblesDirective>
 * </LayerDirective>
 * </LayersDirective>
 * </MapsComponent>
 * ```
 */
export declare class BubbleDirective extends ComplexBase<BubbleSettingsModel | BubbleSettingsDirTypecast & {
    children?: React.ReactNode;
}, BubbleSettingsModel | BubbleSettingsDirTypecast> {
    static moduleName: string;
    static complexTemplate: Object;
}
export declare class BubblesDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
