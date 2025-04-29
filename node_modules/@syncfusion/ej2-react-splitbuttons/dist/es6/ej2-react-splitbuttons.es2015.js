import { ComplexBase, applyMixins, ComponentBase } from '@syncfusion/ej2-react-base';
import { createElement, Component } from 'react';
import { DropDownButton, SplitButton, ProgressButton } from '@syncfusion/ej2-splitbuttons';
export * from '@syncfusion/ej2-splitbuttons';

class DropDownButtonItemDirective extends ComplexBase {
}
DropDownButtonItemDirective.moduleName = 'dropDownButtonItem';
class DropDownButtonItemsDirective extends ComplexBase {
}
DropDownButtonItemsDirective.propertyName = 'items';
DropDownButtonItemsDirective.moduleName = 'dropDownButtonItems';

/**
 * `DropDownButtonComponent` represents the react DropDownButton Component.
 * ```ts
 * <DropDownButtonComponent content='DropDownButton'></DropDownButtonComponent>
 * ```
 */
class DropDownButtonComponent extends DropDownButton {
    constructor(props) {
        super(props);
        this.initRenderCalled = false;
        this.checkInjectedModules = false;
        this.directivekeys = { 'dropDownButtonItems': 'dropDownButtonItem' };
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
applyMixins(DropDownButtonComponent, [ComponentBase, Component]);

class SplitButtonItemDirective extends ComplexBase {
}
SplitButtonItemDirective.moduleName = 'splitButtonItem';
class SplitButtonItemsDirective extends ComplexBase {
}
SplitButtonItemsDirective.propertyName = 'items';
SplitButtonItemsDirective.moduleName = 'splitButtonItems';

/**
 * `SplitButtonComponent` represents the react SplitButton Component.
 * ```ts
 * <SplitButtonComponent content='Split Button'></SplitButtonComponent>
 * ```
 */
class SplitButtonComponent extends SplitButton {
    constructor(props) {
        super(props);
        this.initRenderCalled = false;
        this.checkInjectedModules = false;
        this.directivekeys = { 'splitButtonItems': 'splitButtonItem' };
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
applyMixins(SplitButtonComponent, [ComponentBase, Component]);

/**
 * `ProgressButtonComponent` represents the react ProgressButton Component.
 * ```ts
 * <ProgressButtonComponent content='Progress Button'></ProgressButtonComponent>
 * ```
 */
class ProgressButtonComponent extends ProgressButton {
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
applyMixins(ProgressButtonComponent, [ComponentBase, Component]);

export { DropDownButtonComponent, DropDownButtonItemDirective, DropDownButtonItemsDirective, ProgressButtonComponent, SplitButtonComponent, SplitButtonItemDirective, SplitButtonItemsDirective };
//# sourceMappingURL=ej2-react-splitbuttons.es2015.js.map
