import { ComplexBase } from '@syncfusion/ej2-react-base';
import { ChartSegmentModel } from '@syncfusion/ej2-charts';
/**
 * `SegmentDirective` directive represent a segment of the react chart.
 * It must be contained in a Chart component(`ChartComponent`).
 * ```tsx
 * <ChartComponent>
 * <SeriesCollectionDirective>
 * <SeriesDirective>
 * <SegmentsDirective>
 * <SegmentDirective></SegmentDirective>
 * </SegmentsDirective>
 * </SeriesDirective>
 * </SeriesCollectionDirective>
 * </ChartComponent>
 * ```
 */
export declare class SegmentDirective extends ComplexBase<ChartSegmentModel & {
    children?: React.ReactNode;
}, ChartSegmentModel> {
    static moduleName: string;
}
export declare class SegmentsDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
