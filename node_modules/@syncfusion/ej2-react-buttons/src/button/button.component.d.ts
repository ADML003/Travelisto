import * as React from 'react';
import { Button, ButtonModel } from '@syncfusion/ej2-buttons';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
/**
 * `ButtonComponent` represents the react Button Component.
 * ```ts
 * <ButtonComponent></ButtonComponent>
 * ```
 */
export declare class ButtonComponent extends Button {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<ButtonModel | DefaultHtmlAttributes>;
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
    }> & Readonly<ButtonModel | DefaultHtmlAttributes>;
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
