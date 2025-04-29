import { createElement, Component, Fragment } from 'react';
import { Button, CheckBox, RadioButton, Switch, ChipList, Fab, SpeedDial, SmartPasteButton } from '@syncfusion/ej2-buttons';
export * from '@syncfusion/ej2-buttons';
import { applyMixins, ComponentBase, ComplexBase } from '@syncfusion/ej2-react-base';

/**
 * `ButtonComponent` represents the react Button Component.
 * ```ts
 * <ButtonComponent></ButtonComponent>
 * ```
 */
class ButtonComponent extends Button {
    constructor(props) {
        super(props);
        this.initRenderCalled = false;
        this.checkInjectedModules = false;
        this.statelessTemplateProps = null;
        this.templateProps = null;
        this.immediateRender = true;
        this.isReactMock = true;
        this.portals = [];
    }
    render() {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            super.render();
            this.initRenderCalled = true;
        }
        else {
            return createElement('button', this.getDefaultAttributes(), [].concat(this.props.children, this.portals));
        }
    }
}
applyMixins(ButtonComponent, [ComponentBase, Component]);

/**
 * Represents the react CheckBox Component.
 * ```ts
 * <CheckBoxComponent label='Default'></CheckBoxComponent>
 * ```
 */
class CheckBoxComponent extends CheckBox {
    constructor(props) {
        super(props);
        this.initRenderCalled = false;
        this.checkInjectedModules = false;
        this.statelessTemplateProps = null;
        this.templateProps = null;
        this.immediateRender = true;
        this.isReactMock = true;
        this.portals = [];
    }
    render() {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            super.render();
            this.initRenderCalled = true;
        }
        else {
            return createElement(Fragment, null, [].concat(createElement("input", this.getDefaultAttributes()), this.portals));
        }
    }
}
applyMixins(CheckBoxComponent, [ComponentBase, Component]);

/**
 * Represents the react RadioButton Component.
 * ```ts
 * <RadioButtonComponent label='Default'></RadioButtonComponent>
 * ```
 */
class RadioButtonComponent extends RadioButton {
    constructor(props) {
        super(props);
        this.initRenderCalled = false;
        this.checkInjectedModules = false;
        this.statelessTemplateProps = null;
        this.templateProps = null;
        this.immediateRender = true;
        this.isReactMock = true;
        this.portals = [];
    }
    render() {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            super.render();
            this.initRenderCalled = true;
        }
        else {
            return createElement(Fragment, null, [].concat(createElement("input", this.getDefaultAttributes()), this.portals));
        }
    }
}
applyMixins(RadioButtonComponent, [ComponentBase, Component]);

/**
 * Represents the react Switch Component.
 * ```ts
 * <SwitchComponent></SwitchComponent>
 * ```
 */
class SwitchComponent extends Switch {
    constructor(props) {
        super(props);
        this.initRenderCalled = false;
        this.checkInjectedModules = false;
        this.statelessTemplateProps = null;
        this.templateProps = null;
        this.immediateRender = true;
        this.isReactMock = true;
        this.portals = [];
    }
    render() {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            super.render();
            this.initRenderCalled = true;
        }
        else {
            return createElement(Fragment, null, [].concat(createElement("input", this.getDefaultAttributes()), this.portals));
        }
    }
}
applyMixins(SwitchComponent, [ComponentBase, Component]);

/**
 * `ChipDirective` directive represent a chip of the React ChipList.
 * ```html
 * <ChipListComponent>
 *   <ChipsDirective>
 *    <ChipDirective text='chip1'></ChipDirective>
 *    <ChipDirective text='chip2'></ChipDirective>
 *   </ChipsDirective>
 * </ChipListComponent>
 * ```
 */
class ChipDirective extends ComplexBase {
}
ChipDirective.moduleName = 'chip';
class ChipsDirective extends ComplexBase {
}
ChipsDirective.propertyName = 'chips';
ChipsDirective.moduleName = 'chips';

/**
 * Represents the Essential JS 2 React ChipList Component.
 * ```ts
 * <ChipListComponent></ChipListComponent>
 * ```
 */
class ChipListComponent extends ChipList {
    constructor(props) {
        super(props);
        this.initRenderCalled = false;
        this.checkInjectedModules = false;
        this.directivekeys = { 'chips': 'chip' };
        this.statelessTemplateProps = null;
        this.templateProps = null;
        this.immediateRender = false;
        this.isReactMock = true;
        this.portals = [];
    }
    render() {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            super.render();
            this.initRenderCalled = true;
        }
        else {
            return createElement('div', this.getDefaultAttributes(), [].concat(this.props.children, this.portals));
        }
    }
}
applyMixins(ChipListComponent, [ComponentBase, Component]);

/**
 * `FabComponent` represents the react Fab Component.
 * ```ts
 * <FabComponent></FabComponent>
 * ```
 */
class FabComponent extends Fab {
    constructor(props) {
        super(props);
        this.initRenderCalled = false;
        this.checkInjectedModules = false;
        this.statelessTemplateProps = null;
        this.templateProps = null;
        this.immediateRender = true;
        this.isReactMock = true;
        this.portals = [];
    }
    render() {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            super.render();
            this.initRenderCalled = true;
        }
        else {
            return createElement('button', this.getDefaultAttributes(), [].concat(this.props.children, this.portals));
        }
    }
}
applyMixins(FabComponent, [ComponentBase, Component]);

/**
 * `SpeedDialItemDirective` represent a item of the React SpeedDial.
 * It must be contained in a SpeedDial component(`SpeedDialComponent`).
 * ```tsx
 * <SpeedDialComponent>
 *   <SpeedDialItemsDirective>
 *    <SpeedDialItemDirective text='Cut'></SpeedDialItemDirective>
 *    <SpeedDialItemDirective text='Copy'></SpeedDialItemDirective>
 *   <SpeedDialItemsDirective>
 * </SpeedDialComponent>
 * ```
 */
class SpeedDialItemDirective extends ComplexBase {
}
SpeedDialItemDirective.moduleName = 'speedDialItem';
class SpeedDialItemsDirective extends ComplexBase {
}
SpeedDialItemsDirective.propertyName = 'items';
SpeedDialItemsDirective.moduleName = 'speedDialItems';

/**
 * `SpeedDialComponent` represents the react SpeedDial Component.
 * ```ts
 * <SpeedDialComponent content='Edit'></SpeedDialComponent>
 * ```
 */
class SpeedDialComponent extends SpeedDial {
    constructor(props) {
        super(props);
        this.initRenderCalled = false;
        this.checkInjectedModules = false;
        this.directivekeys = { 'speedDialItems': 'speedDialItem' };
        this.statelessTemplateProps = null;
        this.templateProps = null;
        this.immediateRender = false;
        this.isReactMock = true;
        this.portals = [];
    }
    render() {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            super.render();
            this.initRenderCalled = true;
        }
        else {
            return createElement('button', this.getDefaultAttributes(), [].concat(this.props.children, this.portals));
        }
    }
}
applyMixins(SpeedDialComponent, [ComponentBase, Component]);

/**
 * `SmartPasteButtonComponent` represents the react Smart Paste Button Component.
 * ```html
 * <SmartPasteButtonComponent>Smart paste</SmartPasteButtonComponent>
 * ```
 */
class SmartPasteButtonComponent extends SmartPasteButton {
    constructor(props) {
        super(props);
        this.initRenderCalled = false;
        this.checkInjectedModules = false;
        this.statelessTemplateProps = null;
        this.templateProps = null;
        this.immediateRender = true;
        this.isReactMock = true;
        this.portals = [];
    }
    render() {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            super.render();
            this.initRenderCalled = true;
        }
        else {
            return createElement('button', this.getDefaultAttributes(), [].concat(this.props.children, this.portals));
        }
    }
}
applyMixins(SmartPasteButtonComponent, [ComponentBase, Component]);

export { ButtonComponent, CheckBoxComponent, ChipDirective, ChipListComponent, ChipsDirective, FabComponent, RadioButtonComponent, SmartPasteButtonComponent, SpeedDialComponent, SpeedDialItemDirective, SpeedDialItemsDirective, SwitchComponent };
//# sourceMappingURL=ej2-react-buttons.es2015.js.map
