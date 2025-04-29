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
import { AutoComplete } from '@syncfusion/ej2-dropdowns';
import { ComponentBase, applyMixins } from '@syncfusion/ej2-react-base';
/**
 *The AutoComplete component provides the matched suggestion list when type into the input, from which the user can select one.
 * ```
 * <AutoCompleteComponent dataSource={data}/>
 * ```
 */
var AutoCompleteComponent = /** @class */ (function (_super) {
    __extends(AutoCompleteComponent, _super);
    function AutoCompleteComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = true;
        _this.statelessTemplateProps = ["headerTemplate", "itemTemplate"];
        _this.templateProps = null;
        _this.immediateRender = false;
        _this.isReactMock = true;
        _this.portals = [];
        return _this;
    }
    AutoCompleteComponent.prototype.render = function () {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return React.createElement(React.Fragment, null, [].concat(React.createElement("input", this.getDefaultAttributes()), this.portals));
        }
    };
    return AutoCompleteComponent;
}(AutoComplete));
export { AutoCompleteComponent };
applyMixins(AutoCompleteComponent, [ComponentBase, React.Component]);
