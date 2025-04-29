import * as React from 'react';
import { AppBar, AppBarModel } from '@syncfusion/ej2-navigations';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
/**
 * `AppBarComponent` represents the Essential JS 2 React AppBar Component.
 * ```ts
 * <AppBarComponent></AppBarComponent>
 * ```
 */
export declare class AppBarComponent extends AppBar {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<AppBarModel | DefaultHtmlAttributes>;
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
    }> & Readonly<AppBarModel | DefaultHtmlAttributes>;
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
