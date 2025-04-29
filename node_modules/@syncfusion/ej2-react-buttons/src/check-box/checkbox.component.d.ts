import * as React from 'react';
import { CheckBox, CheckBoxModel } from '@syncfusion/ej2-buttons';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
/**
 * Represents the react CheckBox Component.
 * ```ts
 * <CheckBoxComponent label='Default'></CheckBoxComponent>
 * ```
 */
export declare class CheckBoxComponent extends CheckBox {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<CheckBoxModel | DefaultHtmlAttributes>;
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
    }> & Readonly<CheckBoxModel | DefaultHtmlAttributes>;
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
