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
import { Chart3D } from '@syncfusion/ej2-charts';
import { ComponentBase, applyMixins } from '@syncfusion/ej2-react-base';
/**
 * Represents react 3D Chart Component
 * ```tsx
 * <Chart3DComponent></Chart3DComponent>
 * ```
 */
var Chart3DComponent = /** @class */ (function (_super) {
    __extends(Chart3DComponent, _super);
    function Chart3DComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = true;
        _this.directivekeys = { 'chart3DSeriesCollection': 'chart3DSeries', 'chart3DAxes': 'chart3DAxis', 'chart3DRows': 'chart3DRow', 'chart3DColumns': 'chart3DColumn', 'chart3DSelectedDataIndexes': 'chart3DSelectedDataIndex' };
        _this.statelessTemplateProps = null;
        _this.templateProps = null;
        _this.immediateRender = false;
        _this.isReactMock = true;
        _this.portals = [];
        return _this;
    }
    Chart3DComponent.prototype.render = function () {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return React.createElement('div', this.getDefaultAttributes(), [].concat(this.props.children, this.portals));
        }
    };
    return Chart3DComponent;
}(Chart3D));
export { Chart3DComponent };
applyMixins(Chart3DComponent, [ComponentBase, React.Component]);
