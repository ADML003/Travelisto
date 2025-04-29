import { ComplexBase } from '@syncfusion/ej2-react-base';
import { NavigationLineSettingsModel } from '@syncfusion/ej2-maps';
export interface NavigationLineSettingsDirTypecast {
    tooltipSettings?: any;
}
/**
 * Represents the directive to define the navigation lines in the maps.
 * ```tsx
 * <MapsComponent>
 * <LayersDirective>
 * <LayerDirective>
 * <NavigationLinesDirective>
 * <NavigationLineDirective></NavigationLineDirective>
 * </NavigationLinesDirective>
 * </LayerDirective>
 * </LayersDirective>
 * </MapsComponent>
 * ```
 */
export declare class NavigationLineDirective extends ComplexBase<NavigationLineSettingsModel | NavigationLineSettingsDirTypecast & {
    children?: React.ReactNode;
}, NavigationLineSettingsModel | NavigationLineSettingsDirTypecast> {
    static moduleName: string;
    static complexTemplate: Object;
}
export declare class NavigationLinesDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
