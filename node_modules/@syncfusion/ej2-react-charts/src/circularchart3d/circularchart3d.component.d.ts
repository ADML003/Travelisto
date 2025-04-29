import * as React from 'react';
import { CircularChart3D, CircularChart3DModel } from '@syncfusion/ej2-charts';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
export interface CircularChart3DTypecast {
    tooltip?: any;
}
/**
 * Represents react Circular 3D chart Component
 * ```tsx
 * <CircularChart3DComponent></CircularChart3DComponent>
 * ```
 */
export declare class CircularChart3DComponent extends CircularChart3D {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<CircularChart3DModel | DefaultHtmlAttributes | CircularChart3DTypecast>;
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
    }> & Readonly<CircularChart3DModel | DefaultHtmlAttributes | CircularChart3DTypecast>;
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
