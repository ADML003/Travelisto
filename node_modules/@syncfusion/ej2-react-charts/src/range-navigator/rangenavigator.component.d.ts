import * as React from 'react';
import { RangeNavigator, RangeNavigatorModel } from '@syncfusion/ej2-charts';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
export interface RangeNavigatorTypecast {
    tooltip?: any;
}
/**
 * Represents react RangeNavigator Component
 * ```tsx
 * <RangeNavigatorComponent></RangeNavigatorComponent>
 * ```
 */
export declare class RangeNavigatorComponent extends RangeNavigator {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<RangeNavigatorModel | DefaultHtmlAttributes | RangeNavigatorTypecast>;
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
    }> & Readonly<RangeNavigatorModel | DefaultHtmlAttributes | RangeNavigatorTypecast>;
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
