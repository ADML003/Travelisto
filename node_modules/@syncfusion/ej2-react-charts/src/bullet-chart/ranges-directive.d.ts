import { ComplexBase } from '@syncfusion/ej2-react-base';
import { RangeModel } from '@syncfusion/ej2-charts';
/**
 * `BulletRangeDirective` directive represent a ranges of the react BulletChart.
 * ```tsx
 * <BulletChartComponent>
 * <BulletRangeCollectionDirective>
 * <BulletRangeDirective></BulletRangeDirective>
 * </BulletRangeCollectionDirective>
 * </BulletChartComponent>
 * ```
 */
export declare class BulletRangeDirective extends ComplexBase<RangeModel & {
    children?: React.ReactNode;
}, RangeModel> {
    static moduleName: string;
}
export declare class BulletRangeCollectionDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
