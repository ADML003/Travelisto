import { ComplexBase } from '@syncfusion/ej2-react-base';
import { RangeColorSettingModel } from '@syncfusion/ej2-charts';
/**
 * `RangeColorSetting` directive represent range color mapping of the react Chart.
 * It must be contained in a Chart component(`ChartComponent`).
 * ```tsx
 * <ChartComponent>
 * <RangeColorSettingsDirective>
 * <RangeColorSettingDirective></RangeColorSettingDirective>
 * </RangeColorSettingsDirective>
 * </ChartComponent>
 * ```
 */
export declare class RangeColorSettingDirective extends ComplexBase<RangeColorSettingModel & {
    children?: React.ReactNode;
}, RangeColorSettingModel> {
    static moduleName: string;
}
export declare class RangeColorSettingsDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
