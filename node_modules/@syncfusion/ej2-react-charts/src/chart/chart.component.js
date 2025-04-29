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
import { Chart } from '@syncfusion/ej2-charts';
import { ComponentBase, applyMixins } from '@syncfusion/ej2-react-base';
/**
 * Represents react Chart Component
 * ```tsx
 * <ChartComponent></ChartComponent>
 * ```
 */
var ChartComponent = /** @class */ (function (_super) {
    __extends(ChartComponent, _super);
    function ChartComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = true;
        _this.directivekeys = { 'seriesCollection': { 'series': { 'trendlines': 'trendline', 'segments': 'segment' } }, 'axes': { 'axis': { 'stripLines': 'stripLine', 'multiLevelLabels': { 'multiLevelLabel': { 'categories': 'category' } } } }, 'rows': 'row', 'columns': 'column', 'rangeColorSettings': 'rangeColorSetting', 'annotations': 'annotation', 'selectedDataIndexes': 'selectedDataIndex', 'indicators': 'indicator' };
        _this.statelessTemplateProps = null;
        _this.templateProps = null;
        _this.immediateRender = false;
        _this.isReactMock = true;
        _this.portals = [];
        return _this;
    }
    ChartComponent.prototype.render = function () {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return React.createElement('div', this.getDefaultAttributes(), [].concat(this.props.children, this.portals));
        }
    };
    return ChartComponent;
}(Chart));
export { ChartComponent };
applyMixins(ChartComponent, [ComponentBase, React.Component]);
