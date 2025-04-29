import * as React from 'react';
import { Mention, MentionModel } from '@syncfusion/ej2-dropdowns';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
export interface MentionTypecast {
    displayTemplate?: string | Function | any;
    itemTemplate?: string | Function | any;
    spinnerTemplate?: string | Function | any;
}
/**
 * The Mention component contains a list of predefined values, from which the user can choose a single value.
 * ```
 * <MentionComponent dataSource={data}/>
 * ```
 */
export declare class MentionComponent extends Mention {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<MentionModel | DefaultHtmlAttributes | MentionTypecast>;
    setState: any;
    private getDefaultAttributes;
    initRenderCalled: boolean;
    private checkInjectedModules;
    private statelessTemplateProps;
    private templateProps;
    private immediateRender;
    private isReactMock;
    props: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<MentionModel | DefaultHtmlAttributes | MentionTypecast>;
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
