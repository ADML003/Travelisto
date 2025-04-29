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
import { Grid } from '@syncfusion/ej2-grids';
import { ComponentBase, applyMixins } from '@syncfusion/ej2-react-base';
/**
 * `GridComponent` represents the react Grid.
 * ```tsx
 * <GridComponent dataSource={data} allowPaging={true} allowSorting={true}/>
 * ```
 */
var GridComponent = /** @class */ (function (_super) {
    __extends(GridComponent, _super);
    function GridComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = true;
        _this.directivekeys = { 'columns': { 'column': { 'stackedColumns': 'stackedColumn' } }, 'aggregates': { 'aggregate': { 'aggregateColumns': 'aggregateColumn' } } };
        _this.statelessTemplateProps = null;
        _this.templateProps = ["template", "headerTemplate", "commandsTemplate", "filter.itemTemplate", "editTemplate", "filterTemplate", "columnChooserSettings.headerTemplate", "columnChooserSettings.template", "columnChooserSettings.footerTemplate"];
        _this.immediateRender = false;
        _this.isReactMock = true;
        _this.portals = [];
        return _this;
    }
    GridComponent.prototype.render = function () {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return React.createElement('div', this.getDefaultAttributes(), [].concat(this.props.children, this.portals));
        }
    };
    return GridComponent;
}(Grid));
export { GridComponent };
applyMixins(GridComponent, [ComponentBase, React.Component]);
