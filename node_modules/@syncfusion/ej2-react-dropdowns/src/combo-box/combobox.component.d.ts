import * as React from 'react';
import { ComboBox, ComboBoxModel } from '@syncfusion/ej2-dropdowns';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
export interface ComboBoxTypecast {
    footerTemplate?: string | Function | any;
    headerTemplate?: string | Function | any;
    groupTemplate?: string | Function | any;
    itemTemplate?: string | Function | any;
}
/**
 *The ComboBox component allows the user to type a value or choose an option from the list of predefined options.
 * ```
 * <ComboBoxComponent dataSource={data}/>
 * ```
 */
export declare class ComboBoxComponent extends ComboBox {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<ComboBoxModel | DefaultHtmlAttributes | ComboBoxTypecast>;
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
    }> & Readonly<ComboBoxModel | DefaultHtmlAttributes | ComboBoxTypecast>;
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
