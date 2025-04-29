import * as React from 'react';
import { StockChart, StockChartModel } from '@syncfusion/ej2-charts';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
export interface StockChartTypecast {
    tooltip?: any;
}
/**
 * Represents react Chart Component
 * ```tsx
 * <StockChartComponent></StockChartComponent>
 * ```
 */
export declare class StockChartComponent extends StockChart {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<StockChartModel | DefaultHtmlAttributes | StockChartTypecast>;
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
    }> & Readonly<StockChartModel | DefaultHtmlAttributes | StockChartTypecast>;
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
