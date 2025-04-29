import * as React from 'react';
import { SplitButton, SplitButtonModel } from '@syncfusion/ej2-splitbuttons';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
/**
 * `SplitButtonComponent` represents the react SplitButton Component.
 * ```ts
 * <SplitButtonComponent content='Split Button'></SplitButtonComponent>
 * ```
 */
export declare class SplitButtonComponent extends SplitButton {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<SplitButtonModel | DefaultHtmlAttributes>;
    setState: any;
    private getDefaultAttributes;
    initRenderCalled: boolean;
    private checkInjectedModules;
    directivekeys: {
        [key: string]: Object;
    };
    private statelessTemplateProps;
    private templateProps;
    private immediateRender;
    private isReactMock;
    props: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<SplitButtonModel | DefaultHtmlAttributes>;
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
