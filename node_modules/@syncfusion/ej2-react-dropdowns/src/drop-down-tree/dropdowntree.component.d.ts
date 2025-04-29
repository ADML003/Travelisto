import * as React from 'react';
import { DropDownTree, DropDownTreeModel } from '@syncfusion/ej2-dropdowns';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
export interface DropDownTreeTypecast {
    footerTemplate?: string | Function | any;
    headerTemplate?: string | Function | any;
    valueTemplate?: string | Function | any;
    itemTemplate?: string | Function | any;
}
/**
 *The DropDownTree component contains a list of predefined values from which you can choose a single or multiple values.
 * ```
 * <DropDownTreeComponent/>
 * ```
 */
export declare class DropDownTreeComponent extends DropDownTree {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<DropDownTreeModel | DefaultHtmlAttributes | DropDownTreeTypecast>;
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
    }> & Readonly<DropDownTreeModel | DefaultHtmlAttributes | DropDownTreeTypecast>;
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
