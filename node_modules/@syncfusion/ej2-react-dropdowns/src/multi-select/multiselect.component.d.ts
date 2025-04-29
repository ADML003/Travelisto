import * as React from 'react';
import { MultiSelect, MultiSelectModel } from '@syncfusion/ej2-dropdowns';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
export interface MultiSelectTypecast {
    footerTemplate?: string | Function | any;
    headerTemplate?: string | Function | any;
    valueTemplate?: string | Function | any;
    itemTemplate?: string | Function | any;
    groupTemplate?: string | Function | any;
}
/**
* The MultiSelect allows the user to pick a values from the predefined list of values.
 * ```
 * <MultiSelectComponent dataSource={data}/>
 * ```
 */
export declare class MultiSelectComponent extends MultiSelect {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<MultiSelectModel | DefaultHtmlAttributes | MultiSelectTypecast>;
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
    }> & Readonly<MultiSelectModel | DefaultHtmlAttributes | MultiSelectTypecast>;
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
