import { ComplexBase } from '@syncfusion/ej2-react-base';
import { SpeedDialItemModel } from '@syncfusion/ej2-buttons';
/**
 * `SpeedDialItemDirective` represent a item of the React SpeedDial.
 * It must be contained in a SpeedDial component(`SpeedDialComponent`).
 * ```tsx
 * <SpeedDialComponent>
 *   <SpeedDialItemsDirective>
 *    <SpeedDialItemDirective text='Cut'></SpeedDialItemDirective>
 *    <SpeedDialItemDirective text='Copy'></SpeedDialItemDirective>
 *   <SpeedDialItemsDirective>
 * </SpeedDialComponent>
 * ```
 */
export declare class SpeedDialItemDirective extends ComplexBase<SpeedDialItemModel & {
    children?: React.ReactNode;
}, SpeedDialItemModel> {
    static moduleName: string;
}
export declare class SpeedDialItemsDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
