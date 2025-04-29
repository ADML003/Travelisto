import { ComplexBase } from '@syncfusion/ej2-react-base';
import { Chart3DSeriesModel } from '@syncfusion/ej2-charts';
export interface Chart3DSeriesDirTypecast {
    dataLabel?: any;
}
/**
 * `SeriesDirective` directive represent a series of the react chart.
 * It must be contained in a Chart component(`Chart3DComponent`).
 * ```tsx
 * <Chart3DComponent>
 * <Chart3DSeriesCollectionDirective>
 * <Chart3DSeriesDirective></Chart3DSeriesDirective>
 * </Chart3DSeriesCollectionDirective>
 * </Chart3DComponent>
 * ```
 */
export declare class Chart3DSeriesDirective extends ComplexBase<Chart3DSeriesModel | Chart3DSeriesDirTypecast & {
    children?: React.ReactNode;
}, Chart3DSeriesModel | Chart3DSeriesDirTypecast> {
    static moduleName: string;
    static complexTemplate: Object;
}
export declare class Chart3DSeriesCollectionDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
