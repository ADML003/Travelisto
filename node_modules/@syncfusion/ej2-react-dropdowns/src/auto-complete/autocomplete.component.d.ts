import * as React from 'react';
import { AutoComplete, AutoCompleteModel } from '@syncfusion/ej2-dropdowns';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
export interface AutoCompleteTypecast {
    footerTemplate?: string | Function | any;
    headerTemplate?: string | Function | any;
    groupTemplate?: string | Function | any;
    itemTemplate?: string | Function | any;
}
/**
 *The AutoComplete component provides the matched suggestion list when type into the input, from which the user can select one.
 * ```
 * <AutoCompleteComponent dataSource={data}/>
 * ```
 */
export declare class AutoCompleteComponent extends AutoComplete {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<AutoCompleteModel | DefaultHtmlAttributes | AutoCompleteTypecast>;
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
    }> & Readonly<AutoCompleteModel | DefaultHtmlAttributes | AutoCompleteTypecast>;
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
