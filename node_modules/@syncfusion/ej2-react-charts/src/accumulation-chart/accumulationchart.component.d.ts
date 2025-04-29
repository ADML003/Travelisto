import * as React from 'react';
import { AccumulationChart, AccumulationChartModel } from '@syncfusion/ej2-charts';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
export interface AccumulationChartTypecast {
    tooltip?: any;
}
/**
 * Represents react AccumulationChart Component
 * ```tsx
 * <AccumulationChartComponent></AccumulationChartComponent>
 * ```
 */
export declare class AccumulationChartComponent extends AccumulationChart {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<AccumulationChartModel | DefaultHtmlAttributes | AccumulationChartTypecast>;
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
    }> & Readonly<AccumulationChartModel | DefaultHtmlAttributes | AccumulationChartTypecast>;
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
