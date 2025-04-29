import * as React from 'react';
import { SmartPasteButton, SmartPasteButtonModel } from '@syncfusion/ej2-buttons';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
/**
 * `SmartPasteButtonComponent` represents the react Smart Paste Button Component.
 * ```html
 * <SmartPasteButtonComponent>Smart paste</SmartPasteButtonComponent>
 * ```
 */
export declare class SmartPasteButtonComponent extends SmartPasteButton {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<SmartPasteButtonModel | DefaultHtmlAttributes>;
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
    }> & Readonly<SmartPasteButtonModel | DefaultHtmlAttributes>;
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
