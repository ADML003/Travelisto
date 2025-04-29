import { ComplexBase } from '@syncfusion/ej2-react-base';
import { TrendlineModel } from '@syncfusion/ej2-charts';
/**
 * `TrendlineDirective` directive represent a trendline of the react chart.
 * It must be contained in a Chart component(`ChartComponent`).
 * ```tsx
 * <ChartComponent>
 * <SeriesCollectionDirective>
 * <SeriesDirective>
 * <TrendlinesDirective>
 * <TrendlineDirective></TrendlineDirective>
 * </TrendlinesDirective>
 * </SeriesDirective>
 * </SeriesCollectionDirective>
 * </ChartComponent>
 * ```
 */
export declare class TrendlineDirective extends ComplexBase<TrendlineModel & {
    children?: React.ReactNode;
}, TrendlineModel> {
    static moduleName: string;
}
export declare class TrendlinesDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
