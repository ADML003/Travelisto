var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import { ListBox } from '@syncfusion/ej2-dropdowns';
import { ComponentBase, applyMixins } from '@syncfusion/ej2-react-base';
/**
* The ListBox allows the user to select values from the predefined list of values.
 * ```
 * <ListBoxComponent dataSource={data} />
 * ```
 */
var ListBoxComponent = /** @class */ (function (_super) {
    __extends(ListBoxComponent, _super);
    function ListBoxComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = true;
        _this.statelessTemplateProps = null;
        _this.templateProps = null;
        _this.immediateRender = false;
        _this.isReactMock = true;
        _this.portals = [];
        return _this;
    }
    ListBoxComponent.prototype.render = function () {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return React.createElement(React.Fragment, null, [].concat(React.createElement("input", this.getDefaultAttributes()), this.portals));
        }
    };
    return ListBoxComponent;
}(ListBox));
export { ListBoxComponent };
applyMixins(ListBoxComponent, [ComponentBase, React.Component]);
