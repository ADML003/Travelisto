import * as React from 'react';
import { Switch, SwitchModel } from '@syncfusion/ej2-buttons';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
/**
 * Represents the react Switch Component.
 * ```ts
 * <SwitchComponent></SwitchComponent>
 * ```
 */
export declare class SwitchComponent extends Switch {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<SwitchModel | DefaultHtmlAttributes>;
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
    }> & Readonly<SwitchModel | DefaultHtmlAttributes>;
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
