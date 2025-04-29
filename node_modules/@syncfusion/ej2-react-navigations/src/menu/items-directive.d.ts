import { ComplexBase } from '@syncfusion/ej2-react-base';
import { MenuItemModel } from '@syncfusion/ej2-navigations';
export declare class MenuItemDirective extends ComplexBase<MenuItemModel & {
    children?: React.ReactNode;
}, MenuItemModel> {
    static moduleName: string;
}
export declare class MenuItemsDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
