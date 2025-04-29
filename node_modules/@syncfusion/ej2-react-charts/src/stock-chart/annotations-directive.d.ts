import { ComplexBase } from '@syncfusion/ej2-react-base';
import { StockChartAnnotationSettingsModel } from '@syncfusion/ej2-charts';
export interface StockChartAnnotationSettingsDirTypecast {
    content?: string | Function | any;
}
/**
 * `Annotation` directive represent a annotation of the react Chart.
 * It must be contained in a Chart component(`ChartComponent`).
 * ```tsx
 * <StockChartComponent>
 * <StockChartAnnotationsDirective>
 * <StockChartAnnotationDirective></StockChartAnnotationDirective>
 * </StockChartAnnotationsDirective>
 * </StockChartComponent>
 * ```
 */
export declare class StockChartAnnotationDirective extends ComplexBase<StockChartAnnotationSettingsModel | StockChartAnnotationSettingsDirTypecast & {
    children?: React.ReactNode;
}, StockChartAnnotationSettingsModel | StockChartAnnotationSettingsDirTypecast> {
    static moduleName: string;
}
export declare class StockChartAnnotationsDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
