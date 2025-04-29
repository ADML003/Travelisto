import * as React from 'react';
import { SpeedDial, SpeedDialModel } from '@syncfusion/ej2-buttons';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
export interface SpeedDialTypecast {
    itemTemplate?: string | Function | any;
    popupTemplate?: string | Function | any;
}
/**
 * `SpeedDialComponent` represents the react SpeedDial Component.
 * ```ts
 * <SpeedDialComponent content='Edit'></SpeedDialComponent>
 * ```
 */
export declare class SpeedDialComponent extends SpeedDial {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<SpeedDialModel | DefaultHtmlAttributes | SpeedDialTypecast>;
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
    }> & Readonly<SpeedDialModel | DefaultHtmlAttributes | SpeedDialTypecast>;
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
