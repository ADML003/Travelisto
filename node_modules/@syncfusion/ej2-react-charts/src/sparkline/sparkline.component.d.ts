import * as React from 'react';
import { Sparkline, SparklineModel } from '@syncfusion/ej2-charts';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
/**
 * Represents react Sparkline Component
 * ```tsx
 * <SparklineComponent></SparklineComponent>
 * ```
 */
export declare class SparklineComponent extends Sparkline {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<SparklineModel | DefaultHtmlAttributes>;
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
    }> & Readonly<SparklineModel | DefaultHtmlAttributes>;
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
