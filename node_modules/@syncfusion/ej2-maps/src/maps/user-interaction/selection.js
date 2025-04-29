import { click, itemSelection } from '../index';
import { getElement, createStyle, customizeStyle, removeClass, getTargetElement, getElementByID } from '../utils/helper';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
/**
 * Selection module class
 */
var Selection = /** @class */ (function () {
    function Selection(maps) {
        this.maps = maps;
        this.addEventListener();
    }
    /**
     * For binding events to selection module.
     *
     * @returns {void}
     */
    Selection.prototype.addEventListener = function () {
        if (!this.maps.isDestroyed) {
            this.maps.on(click, this.mouseClick, this);
        }
    };
    /**
     * For removing events from selection module.
     *
     * @returns {void}
     * @private
     */
    Selection.prototype.removeEventListener = function () {
        if (this.maps.isDestroyed) {
            return;
        }
        this.maps.off(click, this.mouseClick);
    };
    Selection.prototype.mouseClick = function (targetElement) {
        if (!isNullOrUndefined(targetElement['type']) && targetElement['type'].indexOf('touch') !== -1 &&
            isNullOrUndefined(targetElement.id)) {
            targetElement = targetElement['target'];
        }
        if (!isNullOrUndefined(targetElement.id) && (targetElement.id.indexOf('LayerIndex') > -1 ||
            targetElement.id.indexOf('NavigationIndex') > -1)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var shapeData = void 0;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var data = void 0;
            var shapeIndex = void 0;
            var dataIndex = void 0;
            var layerIndex = parseInt(targetElement.id.split('_LayerIndex_')[1].split('_')[0], 10);
            if (targetElement.id.indexOf('shapeIndex') > -1) {
                shapeIndex = parseInt(targetElement.id.split('_shapeIndex_')[1].split('_')[0], 10);
                shapeData = !isNullOrUndefined(this.maps.layers[layerIndex].shapeData['features'])
                    && this.maps.layers[layerIndex].shapeData['features']['length'] > shapeIndex ?
                    this.maps.layers[layerIndex].shapeData['features'][shapeIndex]['properties'] :
                    !isNullOrUndefined(this.maps.layers[layerIndex].shapeData['geometries'])
                        && this.maps.layers[layerIndex].shapeData['geometries']['length'] > shapeIndex ?
                        this.maps.layers[layerIndex].shapeData['geometries'][shapeIndex]['properties'] : null;
                dataIndex = parseInt(targetElement.id.split('_dataIndex_')[1].split('_')[0], 10);
                data = isNullOrUndefined(dataIndex) ? null : this.maps.layers[layerIndex].dataSource[dataIndex];
                this.selectionsettings = this.maps.layers[layerIndex].selectionSettings;
                this.selectionType = 'Shape';
            }
            else if (targetElement.id.indexOf('BubbleIndex') > -1) {
                var bubbleIndex = parseInt(targetElement.id.split('_BubbleIndex_')[1].split('_')[0], 10);
                dataIndex = parseInt(targetElement.id.split('_dataIndex_')[1].split('_')[0], 10);
                data = this.maps.layers[layerIndex].bubbleSettings[bubbleIndex].dataSource[dataIndex];
                this.selectionsettings = this.maps.layers[layerIndex].bubbleSettings[bubbleIndex].selectionSettings;
                this.selectionType = 'Bubble';
            }
            else if (targetElement.id.indexOf('MarkerIndex') > -1) {
                var markerIndex = parseInt(targetElement.id.split('_MarkerIndex_')[1].split('_')[0], 10);
                dataIndex = parseInt(targetElement.id.split('_dataIndex_')[1].split('_')[0], 10);
                data = this.maps.layers[layerIndex].markerSettings[markerIndex].dataSource[dataIndex];
                this.selectionsettings = this.maps.layers[layerIndex].markerSettings[markerIndex].selectionSettings;
                this.selectionType = 'Marker';
            }
            else if (targetElement.id.indexOf('_PolygonIndex_') > -1) {
                dataIndex = parseInt(targetElement.id.split('_PolygonIndex_')[1].split('_')[0], 10);
                data = this.maps.layers[layerIndex].polygonSettings.polygons[dataIndex].points;
                this.selectionsettings = this.maps.layers[layerIndex].polygonSettings.selectionSettings;
                this.selectionType = 'Polygon';
            }
            else if (targetElement.id.indexOf('NavigationIndex') > -1) {
                var index = parseInt(targetElement.id.split('_NavigationIndex_')[1].split('_')[0], 10);
                shapeData = null;
                data = {
                    latitude: this.maps.layers[layerIndex].navigationLineSettings[index].latitude,
                    longitude: this.maps.layers[layerIndex].navigationLineSettings[index].longitude
                };
                this.selectionsettings = this.maps.layers[layerIndex].navigationLineSettings[index].selectionSettings;
                this.selectionType = 'navigationline';
            }
            if (!isNullOrUndefined(this.selectionsettings) && this.selectionsettings.enable) {
                this.selectElement(targetElement, layerIndex, data, shapeData);
            }
        }
        else if ((this.maps.legendSettings.visible && !this.maps.legendSettings.toggleLegendSettings.enable && this.maps.legendModule) &&
            !isNullOrUndefined(targetElement.id) && targetElement.id.indexOf('_Text') === -1 &&
            (targetElement.id.indexOf(this.maps.element.id + '_Legend_Shape_Index') > -1 ||
                targetElement.id.indexOf(this.maps.element.id + '_Legend_Index') !== -1)) {
            this.maps.legendModule.legendHighLightAndSelection(targetElement, 'selection');
        }
    };
    /**
     * Selects the element in the map.
     *
     * @param {Element} targetElement - Specifies the target element.
     * @param {number} layerIndex - Specifies the index of the layer.
     * @param {object} data - Specifies the data for the map.
     * @param {object} shapeData - Specifies the data for the map to render.
     * @returns {void}
     * @private
     */
    Selection.prototype.selectElement = function (targetElement, layerIndex, data, shapeData) {
        this.maps.mapSelect = targetElement ? true : false;
        if (this.maps.legendModule && this.maps.legendSettings.visible && targetElement.id.indexOf('_MarkerIndex_') === -1) {
            this.maps.legendModule.shapeHighLightAndSelection(targetElement, data, this.selectionsettings, 'selection', layerIndex);
        }
        var shapeToggled = (targetElement.id.indexOf('shapeIndex') > -1 && this.maps.legendSettings.visible && this.maps.legendModule) ?
            this.maps.legendModule.shapeToggled : true;
        if (shapeToggled) {
            this.selectMap(targetElement, shapeData, data);
        }
    };
    /**
     * Public method for selection.
     *
     * @param {number} layerIndex - Specifies the index of the layer.
     * @param {string} name - Specifies the name.
     * @param {boolean} enable - Specifies the enabling of selection in map.
     * @returns {void}
     * @private
     */
    Selection.prototype.addSelection = function (layerIndex, name, enable) {
        var targetElement = getTargetElement(layerIndex, name, enable, this.maps);
        if (enable) {
            this.selectMap(targetElement, null, null);
        }
        else {
            removeClass(targetElement);
        }
    };
    /**
     * Method for selection.
     *
     * @param {Element} targetElement - Specifies the target element
     * @param {any} shapeData - Specifies the shape data
     * @param {any} data - Specifies the data
     * @returns {void}
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Selection.prototype.selectMap = function (targetElement, shapeData, data) {
        var _this = this;
        var isLineStringShape = targetElement.parentElement.id.indexOf('LineString') > -1;
        var border = {
            color: isLineStringShape ? (this.selectionsettings.fill || this.selectionsettings.border.color) :
                this.selectionsettings.border.color,
            width: isLineStringShape ? (this.selectionsettings.border.width / this.maps.scale) :
                (this.selectionsettings.border.width / (this.selectionType === 'Marker' ? 1 : this.maps.scale)),
            opacity: this.selectionsettings.border.opacity
        };
        var eventArgs = {
            opacity: this.selectionsettings.opacity,
            fill: isLineStringShape ? 'transparent' : (this.selectionType !== 'navigationline' ? this.selectionsettings.fill : 'none'),
            border: border,
            name: itemSelection,
            target: targetElement.id,
            cancel: false,
            shapeData: shapeData,
            data: data,
            maps: this.maps
        };
        //eslint-disable-next-line @typescript-eslint/no-unused-vars
        this.maps.trigger('itemSelection', eventArgs, function (observedArgs) {
            eventArgs.border.opacity = isNullOrUndefined(_this.selectionsettings.border.opacity) ?
                _this.selectionsettings.opacity : _this.selectionsettings.border.opacity;
            if (!eventArgs.cancel) {
                if (targetElement.getAttribute('class') === _this.selectionType + 'selectionMapStyle'
                    || targetElement.getAttribute('class') === 'LineselectionMapStyle') {
                    removeClass(targetElement);
                    _this.removedSelectionList(targetElement);
                    for (var m = 0; m < _this.maps.shapeSelectionItem.length; m++) {
                        if (_this.maps.shapeSelectionItem[m] === eventArgs.shapeData) {
                            _this.maps.shapeSelectionItem.splice(m, 1);
                            break;
                        }
                    }
                    if (targetElement.id.indexOf('NavigationIndex') > -1) {
                        var index = parseInt(targetElement.id.split('_NavigationIndex_')[1].split('_')[0], 10);
                        var layerIndex = parseInt(targetElement.parentElement.id.split('_LayerIndex_')[1].split('_')[0], 10);
                        targetElement.setAttribute('stroke-width', _this.maps.layers[layerIndex].navigationLineSettings[index].width.toString());
                        targetElement.setAttribute('stroke', _this.maps.layers[layerIndex].navigationLineSettings[index].color);
                    }
                }
                else {
                    var layetElement = getElementByID(_this.maps.element.id + '_Layer_Collections');
                    if (!_this.selectionsettings.enableMultiSelect &&
                        (layetElement.getElementsByClassName(_this.selectionType + 'selectionMapStyle').length > 0 ||
                            layetElement.getElementsByClassName('LineselectionMapStyle').length > 0)) {
                        var eleCount = layetElement.getElementsByClassName(_this.selectionType + 'selectionMapStyle').length;
                        var ele = void 0;
                        for (var k = 0; k < eleCount; k++) {
                            ele = layetElement.getElementsByClassName(_this.selectionType + 'selectionMapStyle')[0];
                            removeClass(ele);
                            _this.removedSelectionList(ele);
                        }
                        if (layetElement.getElementsByClassName('LineselectionMapStyle').length > 0) {
                            eleCount = layetElement.getElementsByClassName('LineselectionMapStyle').length;
                            for (var k = 0; k < eleCount; k++) {
                                ele = layetElement.getElementsByClassName('LineselectionMapStyle')[0];
                                removeClass(ele);
                                _this.removedSelectionList(ele);
                            }
                        }
                        if (_this.selectionType === 'Shape') {
                            _this.maps.shapeSelectionItem = [];
                            var selectionLength = _this.maps.selectedElementId.length;
                            for (var i = 0; i < selectionLength; i++) {
                                ele = layetElement.getElementsByClassName(_this.selectionType + 'selectionMapStyle')[0];
                                removeClass(ele);
                                var selectedElementIdIndex = _this.maps.selectedElementId.indexOf(ele.getAttribute('id'));
                                _this.maps.selectedElementId.splice(selectedElementIdIndex, 1);
                            }
                        }
                        if (ele.id.indexOf('NavigationIndex') > -1) {
                            var index = parseInt(targetElement.id.split('_NavigationIndex_')[1].split('_')[0], 10);
                            var layerIndex = parseInt(targetElement.parentElement.id.split('_LayerIndex_')[1].split('_')[0], 10);
                            ele.setAttribute('stroke-width', _this.maps.layers[layerIndex].navigationLineSettings[index].width.toString());
                            ele.setAttribute('stroke', _this.maps.layers[layerIndex].navigationLineSettings[index].color);
                        }
                    }
                    if (!isLineStringShape) {
                        if (!getElement(_this.selectionType + 'selectionMap')) {
                            document.body.appendChild(createStyle(_this.selectionType + 'selectionMap', _this.selectionType + 'selectionMapStyle', eventArgs));
                        }
                        else {
                            customizeStyle(_this.selectionType + 'selectionMap', _this.selectionType + 'selectionMapStyle', eventArgs);
                        }
                        targetElement.setAttribute('class', _this.selectionType + 'selectionMapStyle');
                    }
                    else {
                        if (!getElement('LineselectionMap')) {
                            document.body.appendChild(createStyle('LineselectionMap', 'LineselectionMapStyle', eventArgs));
                        }
                        else {
                            customizeStyle('LineselectionMap', 'LineselectionMapStyle', eventArgs);
                        }
                        targetElement.setAttribute('class', 'LineselectionMapStyle');
                    }
                    if (targetElement.getAttribute('class') === 'ShapeselectionMapStyle') {
                        _this.maps.shapeSelectionClass = getElement(_this.selectionType + 'selectionMap');
                        _this.maps.selectedElementId.push(targetElement.getAttribute('id'));
                        _this.maps.shapeSelectionItem.push(eventArgs.shapeData);
                    }
                    if (targetElement.getAttribute('class') === 'MarkerselectionMapStyle') {
                        _this.maps.markerSelectionClass = getElement(_this.selectionType + 'selectionMap');
                        _this.maps.selectedMarkerElementId.push(targetElement.getAttribute('id'));
                    }
                    if (targetElement.getAttribute('class') === 'BubbleselectionMapStyle') {
                        _this.maps.bubbleSelectionClass = getElement(_this.selectionType + 'selectionMap');
                        _this.maps.selectedBubbleElementId.push(targetElement.getAttribute('id'));
                    }
                    if (targetElement.getAttribute('class') === 'navigationlineselectionMapStyle') {
                        _this.maps.navigationSelectionClass = getElement(_this.selectionType + 'selectionMap');
                        _this.maps.selectedNavigationElementId.push(targetElement.getAttribute('id'));
                    }
                    if (targetElement.getAttribute('class') === 'PolygonselectionMapStyle') {
                        _this.maps.polygonSelectionClass = getElement(_this.selectionType + 'selectionMap');
                        _this.maps.selectedPolygonElementId.push(targetElement.getAttribute('id'));
                    }
                }
            }
        });
    };
    /**
     * Remove legend selection
     */
    // private removeLegendSelection(legendCollection: Object[], targetElement: Element): void {
    //     let shape: Element;
    //     if (!this.selectionsettings.enableMultiSelect) {
    //        for (let i: number = 0; i < legendCollection.length; i++) {
    //             for (let data of legendCollection[i]['data']) {
    //                 shape = getElement(this.maps.element.id + '_LayerIndex_' + data['layerIndex'] +
    //                            '_shapeIndex_' + data['shapeIndex'] + '_dataIndex_' + data['dataIndex']);
    //                 removeClass(shape);
    //             }
    //         }
    //     }
    // }
    /**
     * Get module name.
     *
     * @param {Element} targetElement - Specifies the target element
     * @returns {void}
     * @private
     */
    Selection.prototype.removedSelectionList = function (targetElement) {
        if (this.selectionType === 'Shape') {
            this.maps.selectedElementId.splice(this.maps.selectedElementId.indexOf(targetElement.getAttribute('id')), 1);
        }
        if (this.selectionType === 'Bubble') {
            this.maps.selectedBubbleElementId.splice(this.maps.selectedBubbleElementId.indexOf(targetElement.getAttribute('id')), 1);
        }
        if (this.selectionType === 'Marker') {
            this.maps.selectedMarkerElementId.splice(this.maps.selectedMarkerElementId.indexOf(targetElement.getAttribute('id')), 1);
        }
        if (this.selectionType === 'navigationline') {
            this.maps.selectedBubbleElementId.splice(this.maps.selectedBubbleElementId.indexOf(targetElement.getAttribute('id')), 1);
        }
        if (this.selectionType === 'Polygon') {
            this.maps.selectedPolygonElementId.splice(this.maps.selectedPolygonElementId.indexOf(targetElement.getAttribute('id')), 1);
        }
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name
     */
    Selection.prototype.getModuleName = function () {
        return 'Selection';
    };
    /**
     * To destroy the selection.
     *
     * @returns {void}
     * @private
     */
    Selection.prototype.destroy = function () {
        this.selectionsettings = null;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (!this.maps.refreshing) {
            this.maps = null;
        }
    };
    return Selection;
}());
export { Selection };
