import * as React from 'react';
import { Breadcrumb, BreadcrumbModel } from '@syncfusion/ej2-navigations';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
export interface BreadcrumbTypecast {
    separatorTemplate?: string | Function | any;
    itemTemplate?: string | Function | any;
}
/**
 * `BreadcrumbComponent` represents the react Breadcrumb Component.
 * ```ts
 * <BreadcrumbComponent items={breadcrumbItems} />
 * ```
 */
export declare class BreadcrumbComponent extends Breadcrumb {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<BreadcrumbModel | DefaultHtmlAttributes | BreadcrumbTypecast>;
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
    }> & Readonly<BreadcrumbModel | DefaultHtmlAttributes | BreadcrumbTypecast>;
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
