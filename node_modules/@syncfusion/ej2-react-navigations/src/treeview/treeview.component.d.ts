import * as React from 'react';
import { TreeView, TreeViewModel } from '@syncfusion/ej2-navigations';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
export interface TreeViewTypecast {
    nodeTemplate?: string | Function | any;
}
/**
 * `TreeViewComponent` represents the react TreeView Component.
 * ```ts
 * <TreeViewComponent allowDragAndDrop={true}></TreeViewComponent>
 * ```
 */
export declare class TreeViewComponent extends TreeView {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<TreeViewModel | DefaultHtmlAttributes | TreeViewTypecast>;
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
    }> & Readonly<TreeViewModel | DefaultHtmlAttributes | TreeViewTypecast>;
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
