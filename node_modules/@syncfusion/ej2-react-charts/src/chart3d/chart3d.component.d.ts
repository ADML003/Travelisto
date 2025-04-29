import * as React from 'react';
import { Chart3D, Chart3DModel } from '@syncfusion/ej2-charts';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
export interface Chart3DTypecast {
    tooltip?: any;
}
/**
 * Represents react 3D Chart Component
 * ```tsx
 * <Chart3DComponent></Chart3DComponent>
 * ```
 */
export declare class Chart3DComponent extends Chart3D {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<Chart3DModel | DefaultHtmlAttributes | Chart3DTypecast>;
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
    }> & Readonly<Chart3DModel | DefaultHtmlAttributes | Chart3DTypecast>;
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
