import { ComplexBase } from '@syncfusion/ej2-react-base';
import { TabItemModel } from '@syncfusion/ej2-navigations';
export interface TabItemDirTypecast {
    content?: string | Function | any;
    header?: any;
    headerTemplate?: string | Function | any;
}
/**
 * `TabItemDirective` represent a item of the React Tab.
 * It must be contained in a Tab component(`Tab`).
 * ```tsx
 * <TabComponent>
 *  <TabItemsDirective>
 *   <TabItemDirective header= { 'Header 1' } content= { 'Content 1' } />
 *   <TabItemDirective header= { 'Header 2' } content= { 'Content 2' } />
 *  <TabItemsDirective>
 * </TabComponent>
 * ```
 */
export declare class TabItemDirective extends ComplexBase<TabItemModel | TabItemDirTypecast & {
    children?: React.ReactNode;
}, TabItemModel | TabItemDirTypecast> {
    static moduleName: string;
    static complexTemplate: Object;
}
export declare class TabItemsDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
