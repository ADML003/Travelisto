import * as React from 'react';
import { Maps, MapsModel } from '@syncfusion/ej2-maps';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
/**
 * Represents the React Maps component.
 * It is ideal for rendering maps from GeoJSON data or other map providers like OpenStreetMap, Google Maps, Bing Maps, etc that has rich feature set that includes markers, labels, bubbles and much more.
 * ```tsx
 * <MapsComponent></MapsComponent>
 * ```
 */
export declare class MapsComponent extends Maps {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<MapsModel | DefaultHtmlAttributes>;
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
    }> & Readonly<MapsModel | DefaultHtmlAttributes>;
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
