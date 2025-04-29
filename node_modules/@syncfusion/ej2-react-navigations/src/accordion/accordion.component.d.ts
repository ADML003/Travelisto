import * as React from 'react';
import { Accordion, AccordionModel } from '@syncfusion/ej2-navigations';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
export interface AccordionTypecast {
    headerTemplate?: string | Function | any;
    itemTemplate?: string | Function | any;
}
/**
 * Represents the React Accordion Component.
 * ```html
 * <AccordionComponent></AccordionComponent
 * ```
 */
export declare class AccordionComponent extends Accordion {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<AccordionModel | DefaultHtmlAttributes | AccordionTypecast>;
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
    }> & Readonly<AccordionModel | DefaultHtmlAttributes | AccordionTypecast>;
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
