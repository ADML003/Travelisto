import { ComplexBase } from '@syncfusion/ej2-react-base';
import { AccordionItemModel } from '@syncfusion/ej2-navigations';
export interface AccordionItemDirTypecast {
    header?: string | Function | any;
    content?: string | Function | any;
}
/**
 * `AccordionItemDirective` represent a item of the React Accordion.
 * It must be contained in a Accordion component(`AccordionComponent`).
 * ```tsx
 * <AccordionComponent>
 *   <AccordionItemsDirective>
 *    <AccordionItemDirective  header='Header1'></AccordionItemDirective>
 *    <AccordionItemDirective  header='Header2' content='Content2'></AccordionItemDirective>
 *   <AccordionItemsDirective>
 * </AccordionComponent>
 * ```
 */
export declare class AccordionItemDirective extends ComplexBase<AccordionItemModel | AccordionItemDirTypecast & {
    children?: React.ReactNode;
}, AccordionItemModel | AccordionItemDirTypecast> {
    static moduleName: string;
}
export declare class AccordionItemsDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
