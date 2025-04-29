import * as React from 'react';
import { ChipList, ChipListModel } from '@syncfusion/ej2-buttons';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
/**
 * Represents the Essential JS 2 React ChipList Component.
 * ```ts
 * <ChipListComponent></ChipListComponent>
 * ```
 */
export declare class ChipListComponent extends ChipList {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<ChipListModel | DefaultHtmlAttributes>;
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
    }> & Readonly<ChipListModel | DefaultHtmlAttributes>;
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
