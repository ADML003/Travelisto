import * as React from 'react';
import { DropDownList, DropDownListModel } from '@syncfusion/ej2-dropdowns';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
export interface DropDownListTypecast {
    footerTemplate?: string | Function | any;
    headerTemplate?: string | Function | any;
    valueTemplate?: string | Function | any;
    groupTemplate?: string | Function | any;
    itemTemplate?: string | Function | any;
}
/**
 * The DropDownList component contains a list of predefined values, from which the user can choose a single value.
 * ```
 * <DropDownListComponent dataSource={data}/>
 * ```
 */
export declare class DropDownListComponent extends DropDownList {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<DropDownListModel | DefaultHtmlAttributes | DropDownListTypecast>;
    setState: any;
    private getDefaultAttributes;
    initRenderCalled: boolean;
    private checkInjectedModules;
    private statelessTemplateProps;
    private templateProps;
    private immediateRender;
    private isReactMock;
    props: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<DropDownListModel | DefaultHtmlAttributes | DropDownListTypecast>;
    forceUpdate: (callBack?: () => any) => void;
    context: Object;
    portals: any;
    isReactComponent: Object;
    refs: {
        [key: string]: React.ReactInstance;
    };
    constructor(props: any);
    render(): any;
}
