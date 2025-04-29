import { BaseEventArgs } from '@syncfusion/ej2-base';
import { CheckBox } from '../check-box';
import { Switch } from '../switch';
/**
 * Initialize wrapper element for angular.
 *
 * @private
 *
 * @param {CreateElementArgs} createElement - Specifies created element args
 * @param {string} tag - Specifies tag name
 * @param {string} type - Specifies type name
 * @param {HTMLInputElement} element - Specifies input element
 * @param {string} WRAPPER - Specifies wrapper element
 * @param {string} role - Specifies role
 * @returns {HTMLInputElement} - Input Element
 */
export declare function wrapperInitialize(createElement: CreateElementArgs, tag: string, type: string, element: HTMLInputElement, WRAPPER: string, role: string): HTMLInputElement;
/**
 * Get the text node.
 *
 * @param {HTMLElement} element - Specifies html element
 * @private
 * @returns {Node} - Text node.
 */
export declare function getTextNode(element: HTMLElement): Node;
/**
 * Destroy the button components.
 *
 * @private
 * @param {Switch | CheckBox} ejInst - Specifies eJ2 Instance
 * @param {Element} wrapper - Specifies wrapper element
 * @param {string} tagName - Specifies tag name
 * @returns {void}
 */
export declare function destroy(ejInst: Switch | CheckBox, wrapper: Element, tagName: string): void;
/**
 * Initialize control pre rendering.
 *
 * @private
 * @param {Switch | CheckBox} proxy - Specifies proxy
 * @param {string} control - Specifies control
 * @param {string} wrapper - Specifies wrapper element
 * @param {HTMLInputElement} element - Specifies input element
 * @param {string} moduleName - Specifies module name
 * @returns {void}
 */
export declare function preRender(proxy: Switch | CheckBox, control: string, wrapper: string, element: HTMLInputElement, moduleName: string): void;
/**
 * Creates CheckBox component UI with theming and ripple support.
 *
 * @private
 * @param {CreateElementArgs} createElement - Specifies Created Element args
 * @param {boolean} enableRipple - Specifies ripple effect
 * @param {CheckBoxUtilModel} options - Specifies Checkbox util Model
 * @returns {Element} - Checkbox Element
 */
export declare function createCheckBox(createElement: CreateElementArgs, enableRipple?: boolean, options?: CheckBoxUtilModel): Element;
/**
 * Handles ripple mouse.
 *
 * @private
 * @param {MouseEvent} e - Specifies mouse event
 * @param {Element} rippleSpan - Specifies Ripple span element
 * @returns {void}
 */
export declare function rippleMouseHandler(e: MouseEvent, rippleSpan: Element): void;
/**
 * Append hidden input to given element
 *
 * @private
 * @param {Switch | CheckBox} proxy - Specifies Proxy
 * @param {Element} wrap - Specifies Wrapper ELement
 * @returns {void}
 */
export declare function setHiddenInput(proxy: Switch | CheckBox, wrap: Element): void;
export interface CheckBoxUtilModel {
    checked?: boolean;
    label?: string;
    enableRtl?: boolean;
    cssClass?: string;
    disableHtmlEncode?: boolean;
}
/**
 * Interface for change event arguments.
 */
export interface ChangeEventArgs extends BaseEventArgs {
    /** Returns the event parameters of the CheckBox or Switch.
     *
     * @blazorType MouseEventArgs
     */
    event?: Event;
    /** Returns the checked value of the CheckBox or Switch. */
    checked?: boolean;
}
/**
 * Represents the event arguments for a "beforeChange" event.
 *
 * This object contains details about an action that is about to occur, allowing you to intercept and cancel the action before it's finalized.
 */
export declare class BeforeChangeEventArgs {
    /**
     * The original event object that triggered the state change.
     *
     * This object contains information about the user action or system event
     * (such as a mouse click, key press, or programmatic trigger) that initiated the change in the component's state.
     */
    event?: Event;
    /**
     * Indicates whether the change action in the switch component can be canceled.
     *
     * When set to `true`, the switch action can be reverted or canceled before being finalized.
     * This is useful in scenarios where users may want to confirm or undo the switch action before committing to the change.
     */
    cancel?: boolean;
    /**
     * Returns the value that determines whether the switch is checked or unchecked.
     *
     * When `true`, the switch is in the "on" (checked) position;
     * when `false`, it is in the "off" (unchecked) position.
     * This value controls the visual state of the switch.
     */
    checked?: boolean;
}
export declare type CreateElementArgs = (tag: string, prop?: {
    id?: string;
    className?: string;
    innerHTML?: string;
    styles?: string;
    attrs?: {
        [key: string]: string;
    };
}) => HTMLElement;
