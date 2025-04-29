import { ComplexBase } from '@syncfusion/ej2-react-base';
import { StackedColumnModel } from '@syncfusion/ej2-grids';
export interface StackedColumnDirTypecast {
    template?: string | Function | any;
    headerTemplate?: string | Function | any;
    commandsTemplate?: string | Function | any;
    filter?: any;
    editTemplate?: string | Function | any;
    filterTemplate?: string | Function | any;
}
export declare class StackedColumnDirective extends ComplexBase<StackedColumnModel | StackedColumnDirTypecast & {
    children?: React.ReactNode;
}, StackedColumnModel | StackedColumnDirTypecast> {
    static moduleName: string;
    static complexTemplate: Object;
}
export declare class StackedColumnsDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
