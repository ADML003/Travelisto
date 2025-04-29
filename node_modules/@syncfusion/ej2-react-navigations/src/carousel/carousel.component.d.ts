import * as React from 'react';
import { Carousel, CarouselModel } from '@syncfusion/ej2-navigations';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
export interface CarouselTypecast {
    indicatorsTemplate?: string | Function | any;
    nextButtonTemplate?: string | Function | any;
    previousButtonTemplate?: string | Function | any;
    playButtonTemplate?: string | Function | any;
    itemTemplate?: string | Function | any;
}
/**
 * `CarouselComponent` represents the react Carousel Component.
 * ```ts
 * <CarouselComponent items={carouselItems} />
 * ```
 */
export declare class CarouselComponent extends Carousel {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<CarouselModel | DefaultHtmlAttributes | CarouselTypecast>;
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
    }> & Readonly<CarouselModel | DefaultHtmlAttributes | CarouselTypecast>;
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
