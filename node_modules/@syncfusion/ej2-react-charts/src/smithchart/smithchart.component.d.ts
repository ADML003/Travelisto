import * as React from 'react';
import { Smithchart, SmithchartModel } from '@syncfusion/ej2-charts';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
/**
 * Represents react Smithchart Component
 * ```tsx
 * <SmithchartComponent></SmithchartComponent>
 * ```
 */
export declare class SmithchartComponent extends Smithchart {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<SmithchartModel | DefaultHtmlAttributes>;
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
    }> & Readonly<SmithchartModel | DefaultHtmlAttributes>;
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
