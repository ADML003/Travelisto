import { ComplexBase } from '@syncfusion/ej2-react-base';
import { AccumulationSeriesModel } from '@syncfusion/ej2-charts';
export interface AccumulationSeriesDirTypecast {
    dataLabel?: any;
}
/**
 * `AccumulationSeriesDirective` directive represent a series of the react AccumulationChart.
 * It must be contained in a Pie component(`AccumulationChart`).
 * ```tsx
 * <AccumulationChartComponent>
 * <AccumulationSeriesCollectionDirective>
 * <AccumulationSeriesDirective></AccumulationSeriesDirective>
 * </AccumulationSeriesCollectionDirective>
 * </AccumulationChartComponent>
 * ```
 */
export declare class AccumulationSeriesDirective extends ComplexBase<AccumulationSeriesModel | AccumulationSeriesDirTypecast & {
    children?: React.ReactNode;
}, AccumulationSeriesModel | AccumulationSeriesDirTypecast> {
    static moduleName: string;
    static complexTemplate: Object;
}
export declare class AccumulationSeriesCollectionDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
