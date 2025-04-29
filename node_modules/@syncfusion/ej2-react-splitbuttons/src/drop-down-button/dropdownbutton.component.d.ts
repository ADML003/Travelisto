import * as React from 'react';
import { DropDownButton, DropDownButtonModel } from '@syncfusion/ej2-splitbuttons';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
/**
 * `DropDownButtonComponent` represents the react DropDownButton Component.
 * ```ts
 * <DropDownButtonComponent content='DropDownButton'></DropDownButtonComponent>
 * ```
 */
export declare class DropDownButtonComponent extends DropDownButton {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<DropDownButtonModel | DefaultHtmlAttributes>;
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
    }> & Readonly<DropDownButtonModel | DefaultHtmlAttributes>;
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
