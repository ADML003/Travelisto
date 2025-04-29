import * as React from 'react';
import { BulletChart, BulletChartModel } from '@syncfusion/ej2-charts';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
export interface BulletChartTypecast {
    tooltip?: any;
}
/**
 * Represents react BulletChart Component
 * ```tsx
 * <BulletChartComponent></BulletChartComponent>
 * ```
 */
export declare class BulletChartComponent extends BulletChart {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<BulletChartModel | DefaultHtmlAttributes | BulletChartTypecast>;
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
    }> & Readonly<BulletChartModel | DefaultHtmlAttributes | BulletChartTypecast>;
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
