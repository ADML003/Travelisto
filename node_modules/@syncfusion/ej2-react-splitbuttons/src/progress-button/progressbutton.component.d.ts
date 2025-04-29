import * as React from 'react';
import { ProgressButton, ProgressButtonModel } from '@syncfusion/ej2-splitbuttons';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
/**
 * `ProgressButtonComponent` represents the react ProgressButton Component.
 * ```ts
 * <ProgressButtonComponent content='Progress Button'></ProgressButtonComponent>
 * ```
 */
export declare class ProgressButtonComponent extends ProgressButton {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<ProgressButtonModel | DefaultHtmlAttributes>;
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
    }> & Readonly<ProgressButtonModel | DefaultHtmlAttributes>;
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
