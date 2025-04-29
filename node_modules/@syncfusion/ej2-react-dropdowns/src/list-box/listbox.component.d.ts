import * as React from 'react';
import { ListBox, ListBoxModel } from '@syncfusion/ej2-dropdowns';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
export interface ListBoxTypecast {
    itemTemplate?: string | Function | any;
}
/**
* The ListBox allows the user to select values from the predefined list of values.
 * ```
 * <ListBoxComponent dataSource={data} />
 * ```
 */
export declare class ListBoxComponent extends ListBox {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<ListBoxModel | DefaultHtmlAttributes | ListBoxTypecast>;
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
    }> & Readonly<ListBoxModel | DefaultHtmlAttributes | ListBoxTypecast>;
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
