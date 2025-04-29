import { createElement, Fragment, Component } from 'react';
import { DropDownList, ComboBox, AutoComplete, MultiSelect, ListBox, DropDownTree, Mention } from '@syncfusion/ej2-dropdowns';
export * from '@syncfusion/ej2-dropdowns';
import { applyMixins, ComponentBase } from '@syncfusion/ej2-react-base';
export { Inject } from '@syncfusion/ej2-react-base';

/**
 * The DropDownList component contains a list of predefined values, from which the user can choose a single value.
 * ```
 * <DropDownListComponent dataSource={data}/>
 * ```
 */
class DropDownListComponent extends DropDownList {
    constructor(props) {
        super(props);
        this.initRenderCalled = false;
        this.checkInjectedModules = true;
        this.statelessTemplateProps = ["headerTemplate", "valueTemplate", "itemTemplate"];
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
            return createElement(Fragment, null, [].concat(createElement("input", this.getDefaultAttributes()), this.portals));
        }
    }
}
applyMixins(DropDownListComponent, [ComponentBase, Component]);

/**
 *The ComboBox component allows the user to type a value or choose an option from the list of predefined options.
 * ```
 * <ComboBoxComponent dataSource={data}/>
 * ```
 */
class ComboBoxComponent extends ComboBox {
    constructor(props) {
        super(props);
        this.initRenderCalled = false;
        this.checkInjectedModules = true;
        this.statelessTemplateProps = ["headerTemplate", "itemTemplate"];
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
            return createElement(Fragment, null, [].concat(createElement("input", this.getDefaultAttributes()), this.portals));
        }
    }
}
applyMixins(ComboBoxComponent, [ComponentBase, Component]);

/**
 *The AutoComplete component provides the matched suggestion list when type into the input, from which the user can select one.
 * ```
 * <AutoCompleteComponent dataSource={data}/>
 * ```
 */
class AutoCompleteComponent extends AutoComplete {
    constructor(props) {
        super(props);
        this.initRenderCalled = false;
        this.checkInjectedModules = true;
        this.statelessTemplateProps = ["headerTemplate", "itemTemplate"];
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
            return createElement(Fragment, null, [].concat(createElement("input", this.getDefaultAttributes()), this.portals));
        }
    }
}
applyMixins(AutoCompleteComponent, [ComponentBase, Component]);

/**
* The MultiSelect allows the user to pick a values from the predefined list of values.
 * ```
 * <MultiSelectComponent dataSource={data}/>
 * ```
 */
class MultiSelectComponent extends MultiSelect {
    constructor(props) {
        super(props);
        this.initRenderCalled = false;
        this.checkInjectedModules = true;
        this.statelessTemplateProps = ["headerTemplate", "valueTemplate", "itemTemplate"];
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
            return createElement(Fragment, null, [].concat(createElement("input", this.getDefaultAttributes()), this.portals));
        }
    }
}
applyMixins(MultiSelectComponent, [ComponentBase, Component]);

/**
* The ListBox allows the user to select values from the predefined list of values.
 * ```
 * <ListBoxComponent dataSource={data} />
 * ```
 */
class ListBoxComponent extends ListBox {
    constructor(props) {
        super(props);
        this.initRenderCalled = false;
        this.checkInjectedModules = true;
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
            return createElement(Fragment, null, [].concat(createElement("input", this.getDefaultAttributes()), this.portals));
        }
    }
}
applyMixins(ListBoxComponent, [ComponentBase, Component]);

/**
 *The DropDownTree component contains a list of predefined values from which you can choose a single or multiple values.
 * ```
 * <DropDownTreeComponent/>
 * ```
 */
class DropDownTreeComponent extends DropDownTree {
    constructor(props) {
        super(props);
        this.initRenderCalled = false;
        this.checkInjectedModules = false;
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
            return createElement(Fragment, null, [].concat(createElement("input", this.getDefaultAttributes()), this.portals));
        }
    }
}
applyMixins(DropDownTreeComponent, [ComponentBase, Component]);

/**
 * The Mention component contains a list of predefined values, from which the user can choose a single value.
 * ```
 * <MentionComponent dataSource={data}/>
 * ```
 */
class MentionComponent extends Mention {
    constructor(props) {
        super(props);
        this.initRenderCalled = false;
        this.checkInjectedModules = false;
        this.statelessTemplateProps = ["itemTemplate"];
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
applyMixins(MentionComponent, [ComponentBase, Component]);

export { AutoCompleteComponent, ComboBoxComponent, DropDownListComponent, DropDownTreeComponent, ListBoxComponent, MentionComponent, MultiSelectComponent };
//# sourceMappingURL=ej2-react-dropdowns.es2015.js.map
