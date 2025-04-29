import { ComplexBase } from '@syncfusion/ej2-react-base';
import { BreadcrumbItemModel } from '@syncfusion/ej2-navigations';
/**
 * `BreadcrumbItemDirective` represent a item of the React Breadcrumb.
 * It must be contained in a Breadcrumb component(`BreadcrumbComponent`).
 * ```tsx
 * <BreadcrumbComponent>
 *   <BreadcrumbItemsDirective>
 *    <BreadcrumbItemDirective text='Home' url='/'></BreadcrumbItemDirective>
 *    <BreadcrumbItemDirective text='Index' url='./index'></BreadcrumbItemDirective>
 *   </BreadcrumbItemsDirective>
 * </BreadcrumbComponent>
 * ```
 */
export declare class BreadcrumbItemDirective extends ComplexBase<BreadcrumbItemModel & {
    children?: React.ReactNode;
}, BreadcrumbItemModel> {
    static moduleName: string;
}
export declare class BreadcrumbItemsDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
