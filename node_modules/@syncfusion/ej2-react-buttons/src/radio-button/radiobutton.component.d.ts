import * as React from 'react';
import { RadioButton, RadioButtonModel } from '@syncfusion/ej2-buttons';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
/**
 * Represents the react RadioButton Component.
 * ```ts
 * <RadioButtonComponent label='Default'></RadioButtonComponent>
 * ```
 */
export declare class RadioButtonComponent extends RadioButton {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<RadioButtonModel | DefaultHtmlAttributes>;
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
    }> & Readonly<RadioButtonModel | DefaultHtmlAttributes>;
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
