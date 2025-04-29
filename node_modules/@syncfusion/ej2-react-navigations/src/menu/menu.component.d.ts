import * as React from 'react';
import { Menu, MenuModel } from '@syncfusion/ej2-navigations';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
export interface MenuTypecast {
    template?: string | Function | any;
}
/**
 * `MenuComponent` represents the react Menu Component.
 * ```ts
 * <MenuComponent items={menuItems} />
 * ```
 */
export declare class MenuComponent extends Menu {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<MenuModel | DefaultHtmlAttributes | MenuTypecast>;
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
    }> & Readonly<MenuModel | DefaultHtmlAttributes | MenuTypecast>;
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
