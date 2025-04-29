import * as React from 'react';
import { Toolbar, ToolbarModel } from '@syncfusion/ej2-navigations';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
/**
 * Represents the React Toolbar Component.
 * ```html
 * <ToolbarComponent></ToolbarComponent
 * ```
 */
export declare class ToolbarComponent extends Toolbar {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<ToolbarModel | DefaultHtmlAttributes>;
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
    }> & Readonly<ToolbarModel | DefaultHtmlAttributes>;
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
