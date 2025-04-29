import { ComplexBase } from '@syncfusion/ej2-react-base';
import { SeriesModel } from '@syncfusion/ej2-charts';
export interface SeriesDirTypecast {
    dataLabel?: any;
}
/**
 * `SeriesDirective` directive represent a series of the react chart.
 * It must be contained in a Chart component(`ChartComponent`).
 * ```tsx
 * <ChartComponent>
 * <SeriesCollectionDirective>
 * <SeriesDirective></SeriesDirective>
 * </SeriesCollectionDirective>
 * </ChartComponent>
 * ```
 */
export declare class SeriesDirective extends ComplexBase<SeriesModel | SeriesDirTypecast & {
    children?: React.ReactNode;
}, SeriesModel | SeriesDirTypecast> {
    static moduleName: string;
    static complexTemplate: Object;
}
export declare class SeriesCollectionDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
