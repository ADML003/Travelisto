import * as React from 'react';
import { Stepper, StepperModel } from '@syncfusion/ej2-navigations';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
export interface StepperTypecast {
    template?: string | Function | any;
    tooltipTemplate?: string | Function | any;
}
/**
 * `StepperComponent` represents the react Stepper Component.
 * ```ts
 * <StepperComponent steps={stepItems} />
 * ```
 */
export declare class StepperComponent extends Stepper {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<StepperModel | DefaultHtmlAttributes | StepperTypecast>;
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
    }> & Readonly<StepperModel | DefaultHtmlAttributes | StepperTypecast>;
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
