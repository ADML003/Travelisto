import { ComplexBase } from '@syncfusion/ej2-react-base';
import { RangeNavigatorSeriesModel } from '@syncfusion/ej2-charts';
/**
 * `rangenavigatorSeriesDirective` directive represent a series of the react AccumulationChart.
 * It must be contained in a Rangenavigator component(`Rangenavigator`).
 * ```tsx
 * <RangenavigatorComponent>
 * <RangenavigatorSeriesCollectionDirective>
 * <RangenavigatorSeriesDirective></RangenavigatorSeriesDirective>
 * </RangenavigatorSeriesCollectionDirective>
 * </RangenavigatorChartComponent>
 * ```
 */
export declare class RangenavigatorSeriesDirective extends ComplexBase<RangeNavigatorSeriesModel & {
    children?: React.ReactNode;
}, RangeNavigatorSeriesModel> {
    static moduleName: string;
}
export declare class RangenavigatorSeriesCollectionDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
