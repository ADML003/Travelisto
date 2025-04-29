import { click, legendRendering } from '../index';
import { Rect, measureText, PathOption, textTrim, drawBalloon, removeClass, querySelector, maintainStyleClass, getValueFromObject, getTemplateFunction } from '../utils/helper';
import { RectOption, Size, TextOption, Point, renderTextElement, drawSymbol, checkPropertyPath, getElement } from '../utils/helper';
import { isNullOrUndefined, Browser, EventHandler, remove, extend } from '@syncfusion/ej2-base';
import { Theme } from '../model/theme';
/**
 * Legend module is used to render legend for the maps
 */
var Legend = /** @class */ (function () {
    function Legend(maps) {
        /**
         * @private
         */
        this.legendBorderRect = new Rect(0, 0, 0, 0);
        /**
         * @private
         */
        this.initialMapAreaRect = new Rect(0, 0, 0, 0);
        /**
         * @private
         */
        this.legendTotalRect = new Rect(0, 0, 0, 0);
        /**
         * @private
         */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.totalPages = [];
        this.page = 0;
        /**
         * @private
         */
        this.currentPage = 0;
        this.legendItemRect = new Rect(0, 0, 0, 0);
        this.heightIncrement = 0;
        this.widthIncrement = 0;
        this.textMaxWidth = 0;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.shapeHighlightCollection = [];
        /**
         * @private
         */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.legendHighlightCollection = [];
        /**
         * @private
         */
        this.shapePreviousColor = [];
        /**
         * @private
         */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.selectedNonLegendShapes = [];
        /**
         * @private
         */
        this.shapeToggled = true;
        /**
         * @private
         */
        this.legendElement = null;
        this.maps = maps;
        this.addEventListener();
    }
    /**
     * To calculate legend bounds and draw the legend shape and text.
     *
     * @returns {void}
     * @private
     */
    Legend.prototype.renderLegend = function () {
        this.legendRenderingCollections = [];
        this.legendCollection = [];
        this.totalPages = [];
        this.widthIncrement = 0;
        this.heightIncrement = 0;
        this.defsElement = this.maps.renderer.createDefs();
        this.maps.svgObject.appendChild(this.defsElement);
        this.initialMapAreaRect = this.maps.mapAreaRect;
        this.calculateLegendBounds();
        this.drawLegend();
    };
    Legend.prototype.calculateLegendBounds = function () {
        var _this = this;
        var map = this.maps;
        var legend = map.legendSettings;
        this.legendCollection = [];
        var spacing = 10;
        var leftPadding = 10;
        var topPadding = map.mapAreaRect.y;
        this.legendRenderingCollections = [];
        Array.prototype.forEach.call(map.layersCollection, function (layer, layerIndex) {
            if (!isNullOrUndefined(layer.shapeData)) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var layerData = layer.shapeData['features'];
                var dataPath = layer.shapeDataPath;
                var propertyPath = layer.shapePropertyPath;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var dataSource = layer.dataSource;
                var colorValuePath = void 0;
                var colorMapping = void 0;
                if (legend.type === 'Layers' && layer.visible) {
                    colorValuePath = layer.shapeSettings.colorValuePath;
                    colorMapping = layer.shapeSettings.colorMapping;
                    _this.getLegends(layerIndex, layerData, colorMapping, dataSource, dataPath, colorValuePath, propertyPath);
                }
                else if (legend.type === 'Bubbles') {
                    for (var _i = 0, _a = layer.bubbleSettings; _i < _a.length; _i++) {
                        var bubble = _a[_i];
                        if (bubble.visible) {
                            colorValuePath = bubble.colorValuePath;
                            colorMapping = bubble.colorMapping;
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            dataSource = bubble.dataSource;
                            _this.getLegends(layerIndex, layerData, colorMapping, dataSource, dataPath, colorValuePath, propertyPath);
                        }
                    }
                }
            }
            if (legend.type === 'Markers') {
                _this.getMarkersLegendCollections(layerIndex, layer.markerSettings);
            }
        });
        if (this.legendCollection.length > 0) {
            for (var i = 0; i < this.legendCollection.length; i++) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var legendItem = this.legendCollection[i];
                var eventArgs = {
                    name: legendRendering, cancel: false, fill: legendItem['fill'], shape: legend.shape,
                    shapeBorder: legend.shapeBorder,
                    text: typeof legendItem['text'] === 'number' ? legendItem['text'].toString() : legendItem['text']
                };
                map.trigger('legendRendering', eventArgs);
                legendItem['fill'] = eventArgs.fill;
                legendItem['shape'] = eventArgs.shape;
                legendItem['shapeBorder'] = eventArgs.shapeBorder;
                legendItem['text'] = eventArgs.text;
                if (eventArgs.cancel) {
                    this.legendCollection.splice(i, 1);
                    i--;
                }
            }
        }
        var defaultSize = 25;
        var legendTitle = map.legendSettings.title.text;
        var titleTextStyle = map.legendSettings.titleStyle;
        if (this.legendCollection.length > 0) {
            var legendMode = legend.mode;
            var shapeX = 0;
            var shapeY = 0;
            var textX = 0;
            var textY = 0;
            var shapePadding = legend.shapePadding;
            var textPadding = 10;
            var shapeHeight = legend.shapeHeight;
            var shapeWidth = legend.shapeWidth;
            var shapeLocation = [];
            var textLocation = [];
            var position = legend.position;
            var labelAction = legend.labelDisplayMode;
            var arrangement = (legend.orientation === 'None') ? ((position === 'Top' || position === 'Bottom')
                ? 'Horizontal' : 'Vertical') : legend.orientation;
            var legendWidth = (legend.width.length > 1) ? (legend.width.indexOf('%') > -1) ? (map.availableSize.width / 100)
                * parseInt(legend.width, 10) : parseInt(legend.width, 10) : null;
            var legendHeight = (legend.height.length > 1) ? (legend.height.indexOf('%') > -1) ? (map.availableSize.height / 100) *
                parseInt(legend.height, 10) : parseInt(legend.height, 10) : null;
            var legendItemStartX_1;
            var legendItemStartY_1;
            var startX = 0;
            var startY = 0;
            var legendtitleSize = measureText(legendTitle, titleTextStyle);
            if (legendMode === 'Interactive') {
                var itemTextStyle = legend.textStyle;
                var legendLength = this.legendCollection.length;
                var rectWidth = (arrangement === 'Horizontal') ? (isNullOrUndefined(legendWidth)) ? (map.mapAreaRect.width / legendLength) :
                    (legendWidth / legendLength) : (isNullOrUndefined(legendWidth)) ? defaultSize : legendWidth;
                var rectHeight = (arrangement === 'Horizontal') ? (isNullOrUndefined(legendHeight)) ? defaultSize : legendHeight :
                    (isNullOrUndefined(legendHeight)) ? (map.mapAreaRect.height / legendLength) : (legendHeight / legendLength);
                startX = 0;
                startY = legendtitleSize.height + spacing;
                var position_1 = legend.labelPosition;
                var textX_1 = 0;
                var textY_1 = 0;
                var textPadding_1 = 10;
                var itemStartX = 0;
                var itemStartY = 0;
                var maxTextHeight = 0;
                var maxTextWidth = 0;
                for (var i = 0; i < this.legendCollection.length; i++) {
                    startX = (arrangement === 'Horizontal') ? (startX + rectWidth) : startX;
                    startY = (arrangement === 'Horizontal') ? startY : (startY + rectHeight);
                    var legendText = this.legendCollection[i]['text'];
                    var itemTextSize = new Size(0, 0);
                    if (labelAction === 'None') {
                        itemTextSize = measureText(legendText, itemTextStyle);
                    }
                    else if (labelAction === 'Trim') {
                        legendText = textTrim((arrangement === 'Horizontal' ? rectWidth : rectHeight), legendText, itemTextStyle);
                        itemTextSize = measureText(legendText, itemTextStyle);
                    }
                    else {
                        legendText = '';
                    }
                    if (legend.position === 'Left' || legend.position === 'Right' || legend.position === 'Float') {
                        for (var i_1 = 0; i_1 < this.legendCollection.length; i_1++) {
                            var legendItem = this.legendCollection[i_1];
                            var legendTextSize = measureText(legendItem['text'], legend.textStyle);
                            this.textMaxWidth = Math.max(this.textMaxWidth, legendTextSize.width);
                        }
                    }
                    maxTextHeight = Math.max(maxTextHeight, itemTextSize.height);
                    maxTextWidth = Math.max(maxTextWidth, itemTextSize.width);
                    if (itemTextSize.width > 0 && itemTextSize.height > 0) {
                        if (arrangement === 'Horizontal') {
                            textX_1 = startX + (rectWidth / 2);
                            textY_1 = (position_1 === 'After') ? (startY + rectHeight + (itemTextSize.height / 2)) + textPadding_1 :
                                (startY - textPadding_1);
                        }
                        else {
                            textX_1 = (position_1 === 'After') ? startX - (this.textMaxWidth / 2) - textPadding_1
                                : (startX + rectWidth + this.textMaxWidth / 2) + textPadding_1;
                            textY_1 = startY + (rectHeight / 2) + (itemTextSize.height / 4);
                        }
                    }
                    if (i === 0) {
                        itemStartX = (arrangement === 'Horizontal') ? startX : (position_1 === 'After') ?
                            textX_1 - (this.textMaxWidth / 2) : startX;
                        itemStartY = (arrangement === 'Horizontal') ? (position_1 === 'After') ? startY :
                            textY_1 - (itemTextSize.height / 2) : startY;
                        if (this.legendCollection.length === 1) {
                            legendWidth = (arrangement === 'Horizontal') ? Math.abs((startX + rectWidth) - itemStartX) :
                                (rectWidth + this.textMaxWidth + textPadding_1);
                            legendHeight = (arrangement === 'Horizontal') ? (rectHeight + (maxTextHeight / 2) + textPadding_1) :
                                Math.abs((startY + rectHeight) - itemStartY);
                        }
                    }
                    else if (i === this.legendCollection.length - 1) {
                        legendWidth = (arrangement === 'Horizontal') ? Math.abs((startX + rectWidth) - itemStartX) :
                            (rectWidth + this.textMaxWidth + textPadding_1);
                        legendHeight = (arrangement === 'Horizontal') ? (rectHeight + (maxTextHeight / 2) + textPadding_1) :
                            Math.abs((startY + rectHeight) - itemStartY);
                    }
                    this.legendRenderingCollections.push({
                        fill: this.legendCollection[i]['fill'], x: startX, y: startY,
                        width: rectWidth, height: rectHeight,
                        text: legendText, textX: textX_1, textY: textY_1,
                        textWidth: itemTextSize.width, textHeight: itemTextSize.height,
                        shapeBorder: this.legendCollection[i]['shapeBorder']
                    });
                }
                if (this.legendCollection.length === 1) {
                    legendHeight = maxTextHeight + textPadding_1;
                    legendWidth = rectWidth;
                }
                this.legendItemRect = { x: itemStartX, y: itemStartY, width: legendWidth, height: legendHeight };
            }
            else {
                legendWidth = (isNullOrUndefined(legendWidth)) ? map.mapAreaRect.width : legendWidth;
                legendHeight = (isNullOrUndefined(legendHeight)) ? map.mapAreaRect.height : legendHeight;
                var j = 0;
                this.page = 0;
                for (var i = 0; i < this.legendCollection.length; i++) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    var legendItem = this.legendCollection[i];
                    if (isNullOrUndefined(this.totalPages[this.page])) {
                        this.totalPages[this.page] = { Page: (this.page + 1), Collection: [] };
                    }
                    var legendTextSize = measureText(legendItem['text'], legend.textStyle);
                    this.textMaxWidth = Math.max(this.textMaxWidth, legendTextSize.width);
                    if (i === 0) {
                        startX = shapeX = (leftPadding + (shapeWidth / 2));
                        startY = shapeY = topPadding + legendtitleSize.height + (shapeHeight > legendTextSize.height ? shapeHeight / 2
                            : (legendTextSize.height / 4));
                    }
                    else {
                        var maxSize = (legendTextSize.height > shapeHeight) ? legendTextSize.height : shapeHeight;
                        if (arrangement === 'Horizontal') {
                            var prvePositionX = (textLocation[j - 1].x + textLocation[j - 1].width) + textPadding + shapeWidth;
                            if ((prvePositionX + shapePadding + legendTextSize.width) > legendWidth) {
                                var nextPositionY = (textLocation[j - 1].y > (shapeLocation[j - 1].y + (shapeHeight / 2)) ?
                                    textLocation[j - 1].y : (shapeLocation[j - 1].y + (shapeHeight / 2))) + topPadding;
                                if ((nextPositionY + maxSize) > legendHeight) {
                                    this.getPageChanged();
                                    j = 0;
                                    shapeLocation = [];
                                    textLocation = [];
                                    shapeX = startX;
                                    shapeY = startY;
                                }
                                else {
                                    shapeX = (shapeLocation[0].x);
                                    shapeY = (nextPositionY + (maxSize / 2));
                                }
                            }
                            else {
                                shapeX = (prvePositionX - (shapeWidth / 2));
                                shapeY = (shapeLocation[j - 1]).y;
                            }
                        }
                        else {
                            var prevPositionY = textLocation[j - 1].y > shapeLocation[j - 1].y + (shapeHeight / 2) ?
                                textLocation[j - 1].y : shapeLocation[j - 1].y + (shapeHeight / 2);
                            if ((prevPositionY + topPadding + maxSize) > legendHeight) {
                                var nextPositionX = (textLocation[j - 1].x + this.textMaxWidth + textPadding);
                                if ((nextPositionX + shapePadding + legendTextSize.width) > legendWidth) {
                                    shapeX = startX;
                                    shapeY = startY;
                                    textLocation = [];
                                    shapeLocation = [];
                                    this.getPageChanged();
                                    j = 0;
                                }
                                else {
                                    shapeX = nextPositionX + (shapeWidth / 2);
                                    shapeY = (shapeLocation[0].y);
                                }
                            }
                            else {
                                var padding = 10;
                                shapeX = shapeLocation[j - 1].x;
                                shapeY = prevPositionY + padding + (shapeHeight / 2);
                            }
                        }
                    }
                    textX = shapeX + (shapeWidth / 2) + shapePadding;
                    textY = shapeY + (legendTextSize.height / 4);
                    shapeLocation.push({ x: shapeX, y: shapeY });
                    textLocation.push({ x: textX, y: textY, width: legendTextSize.width, height: (legendTextSize.height / 2) });
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    this.totalPages[this.page]['Collection'].push({
                        DisplayText: legendItem['text'],
                        ImageSrc: legendItem['imageSrc'],
                        Shape: { x: shapeX, y: shapeY },
                        Text: { x: textX, y: textY },
                        Fill: legendItem['fill'],
                        legendShape: legendItem['shape'],
                        shapeBorder: legendItem['shapeBorder'],
                        idIndex: i,
                        Rect: {
                            x: shapeLocation[j].x - (shapeWidth / 2),
                            y: (shapeLocation[j].y - (shapeHeight / 2)) < (textY - legendTextSize.height) ?
                                (shapeLocation[j].y - (shapeHeight / 2)) : (textY - legendTextSize.height),
                            width: Math.abs((shapeLocation[j].x - (shapeWidth / 2)) - (textX + legendTextSize.width)),
                            height: ((shapeHeight > legendTextSize.height) ? shapeHeight : legendTextSize.height)
                        }
                    });
                    j++;
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var collection = this.totalPages[0]['Collection'];
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                Array.prototype.forEach.call(collection, function (legendObj, index) {
                    var legendRect = new Rect(legendObj['Rect']['x'], legendObj['Rect']['y'], legendObj['Rect']['width'], legendObj['Rect']['height']);
                    if (index === 0) {
                        legendItemStartX_1 = legendRect.x;
                        legendItemStartY_1 = legendRect.y;
                    }
                    _this.widthIncrement = Math.max(_this.widthIncrement, Math.abs(legendItemStartX_1 - (legendRect.x + legendRect.width)));
                    _this.heightIncrement = Math.max(_this.heightIncrement, Math.abs(legendItemStartY_1 - (legendRect.y + legendRect.height)));
                });
                legendWidth = ((this.widthIncrement < legendWidth) ? this.widthIncrement : legendWidth);
                legendHeight = ((this.heightIncrement < legendHeight) ? this.heightIncrement : legendHeight);
                this.legendItemRect = {
                    x: collection[0]['Rect']['x'], y: collection[0]['Rect']['y'],
                    width: legendWidth, height: legendHeight
                };
            }
        }
    };
    /**
     * Get the legend collections
     *
     * @param {number} layerIndex - Specifies the layer index
     * @param {any[]} layerData - Specifies the layer data
     * @param {ColorMappingSettings[]} colorMapping - Specifies the color mapping
     * @param {any[]} dataSource - Specifies the data source
     * @param {string} dataPath - Specifies the data path
     * @param {string} colorValuePath - Specifies the color value path
     * @param {string | string[]} propertyPath - Specifies the property path
     * @returns {void}
     */
    Legend.prototype.getLegends = function (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    layerIndex, layerData, colorMapping, dataSource, dataPath, colorValuePath, propertyPath) {
        this.getRangeLegendCollection(layerIndex, layerData, colorMapping, dataSource, dataPath, colorValuePath, propertyPath);
        this.getEqualLegendCollection(layerIndex, layerData, colorMapping, dataSource, dataPath, colorValuePath, propertyPath);
        this.getDataLegendCollection(layerIndex, layerData, colorMapping, dataSource, dataPath, colorValuePath, propertyPath);
    };
    Legend.prototype.getPageChanged = function () {
        this.page++;
        if (isNullOrUndefined(this.totalPages[this.page])) {
            this.totalPages[this.page] = { Page: (this.page + 1), Collection: [] };
        }
    };
    Legend.prototype.legendTextTrim = function (maxWidth, text, font, legendRectSize) {
        var label = text;
        var size = measureText(text, font).width;
        var legendWithoutTextSize = legendRectSize - size;
        if (legendRectSize > maxWidth) {
            var textLength = text.length;
            for (var i = textLength - 1; i >= 0; --i) {
                label = text.substring(0, i) + '...';
                size = measureText(label, font).width;
                var totalSize = legendWithoutTextSize + size;
                if (totalSize <= maxWidth || label.length < 4) {
                    if (label.length < 4) {
                        label = ' ';
                    }
                    return label;
                }
            }
        }
        return label;
    };
    // eslint-disable-next-line valid-jsdoc
    /**
     * To draw the legend shape and text.
     *
     * @private
     */
    Legend.prototype.drawLegend = function () {
        var map = this.maps;
        var legend = map.legendSettings;
        var render = map.renderer;
        var textOptions;
        var textFont = {
            size: legend.textStyle.size,
            color: legend.textStyle.color,
            fontFamily: legend.textStyle.fontFamily,
            fontWeight: legend.textStyle.fontWeight,
            fontStyle: legend.textStyle.fontStyle,
            opacity: legend.textStyle.opacity
        };
        this.legendGroup = render.createGroup({ id: map.element.id + '_Legend_Group' });
        if (legend.mode === 'Interactive') {
            for (var i = 0; i < this.legendRenderingCollections.length; i++) {
                var itemId = map.element.id + '_Legend_Index_' + i;
                var textId = map.element.id + '_Legend_Index_' + i + '_Text';
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var item = this.legendRenderingCollections[i];
                var bounds = new Rect(item['x'], item['y'], item['width'], item['height']);
                if (i === 0) {
                    this.renderLegendBorder();
                }
                var textLocation = new Point(item['textX'], item['textY']);
                textFont.color = (textFont.color !== null) ? textFont.color : this.maps.themeStyle.legendTextColor;
                var rectOptions = new RectOption(itemId, item['fill'], item['shapeBorder'], legend.opacity, bounds);
                textOptions = new TextOption(textId, textLocation.x, textLocation.y, 'middle', item['text'], '', '');
                textFont.fontFamily = !isNullOrUndefined(textFont.fontFamily) ? textFont.fontFamily : this.maps.themeStyle.fontFamily;
                textFont.size = textFont.size || map.themeStyle.legendFontSize;
                var textElement = renderTextElement(textOptions, textFont, textFont.color, this.legendGroup);
                textElement.setAttribute('aria-label', item['text']);
                textElement.setAttribute('role', 'region');
                var rectElement = render.drawRectangle(rectOptions);
                this.legendGroup.appendChild(rectElement);
                if (map.legendSettings.toggleLegendSettings.enable && (legend.type === 'Layers' || legend.type === 'Markers')) {
                    this.maintainLegendToggle(i, rectElement, textElement);
                }
                this.legendToggle();
            }
        }
        else {
            this.drawLegendItem(this.currentPage);
        }
    };
    /**
     * @param {number} page - Specifies the legend page.
     * @returns {void}
     * @private
     */
    Legend.prototype.drawLegendItem = function (page) {
        var map = this.maps;
        var legend = map.legendSettings;
        var spacing = 10;
        var shapeSize = new Size(legend.shapeWidth, legend.shapeHeight);
        var textOptions;
        var render = map.renderer;
        var legendShape = legend.shape;
        if (page >= 0 && page < this.totalPages.length) {
            if (querySelector(this.legendGroup.id, this.maps.element.id)) {
                remove(querySelector(this.legendGroup.id, this.maps.element.id));
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            for (var i = 0; i < this.totalPages[page]['Collection'].length; i++) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var collection = this.totalPages[page]['Collection'][i];
                var shapeBorder = collection['shapeBorder'];
                var legendElement = render.createGroup({ id: map.element.id + '_Legend_Index_' + collection['idIndex'] });
                var legendText = collection['DisplayText'];
                var pagingArrowPadding = 4;
                var strokeColor = (legend.shape === 'HorizontalLine' || legend.shape === 'VerticalLine'
                    || legend.shape === 'Cross') ? isNullOrUndefined(legend.fill) ? '#000000' : legend.fill : shapeBorder.color;
                var strokeWidth = (legend.shape === 'HorizontalLine' || legend.shape === 'VerticalLine'
                    || legend.shape === 'Cross') ? (shapeBorder.width === 0) ?
                    1 : shapeBorder.width : shapeBorder.width;
                var shapeId = map.element.id + '_Legend_Shape_Index_' + collection['idIndex'];
                var textId = map.element.id + '_Legend_Text_Index_' + collection['idIndex'];
                var shapeLocation = new Point(collection['Shape']['x'], (collection['Shape']['y'] - pagingArrowPadding));
                var textLocation = new Point(collection['Text']['x'], (collection['Text']['y'] - pagingArrowPadding));
                var renderOptions = new PathOption(shapeId, collection['Fill'], strokeWidth, strokeColor, legend.opacity, isNullOrUndefined(shapeBorder.opacity) ? legend.opacity : shapeBorder.opacity, '');
                var legendTextStyle = {
                    fontFamily: legend.textStyle.fontFamily, fontStyle: legend.textStyle.fontStyle,
                    fontWeight: legend.textStyle.fontWeight, size: legend.textStyle.size, color: legend.textStyle.color,
                    opacity: legend.textStyle.opacity
                };
                legendTextStyle.color = (legendTextStyle.color !== null) ? legendTextStyle.color :
                    this.maps.themeStyle.legendTextColor;
                legendTextStyle.fontFamily = !isNullOrUndefined(legendTextStyle.fontFamily) ? legendTextStyle.fontFamily :
                    this.maps.themeStyle.fontFamily;
                legendTextStyle.size = legendTextStyle.size || map.themeStyle.legendFontSize;
                legendTextStyle.fontWeight = legendTextStyle.fontWeight || map.themeStyle.fontWeight;
                if (i === 0) {
                    this.renderLegendBorder();
                }
                if (legend.type === 'Markers' && legend.useMarkerShape) {
                    var legendShapeData = this.legendCollection[collection['idIndex']].data[0];
                    var marker = map.layers[legendShapeData['layerIndex']].markerSettings[legendShapeData['markerIndex']];
                    legendShape = !isNullOrUndefined(marker.dataSource[legendShapeData['dataIndex']][marker['shapeValuePath']]) && marker.dataSource[legendShapeData['dataIndex']][marker['shapeValuePath']] !== '' ? marker.dataSource[legendShapeData['dataIndex']][marker['shapeValuePath']] : marker.shape;
                }
                if (legendShape === 'Balloon') {
                    legendElement.appendChild(drawBalloon(map, renderOptions, shapeSize, { x: shapeLocation.x, y: (shapeLocation.y + 5) }, 'Legend'));
                }
                else {
                    legendElement.appendChild(drawSymbol(shapeLocation, legendShape, shapeSize, collection['ImageSrc'], renderOptions));
                }
                var legendRectSize = collection['Rect']['x'] + collection['Rect']['width'];
                if (legendRectSize > this.legendBorderRect.width) {
                    var trimmedText = this.legendTextTrim(this.legendBorderRect.width, legendText, legendTextStyle, legendRectSize);
                    legendText = trimmedText;
                }
                textOptions = new TextOption(textId, textLocation.x, textLocation.y, 'start', legendText, '', '');
                var textElement = renderTextElement(textOptions, legendTextStyle, legendTextStyle.color, legendElement);
                textElement.setAttribute('aria-label', legendText);
                textElement.setAttribute('role', 'region');
                this.legendGroup.appendChild(legendElement);
                if (map.legendSettings.toggleLegendSettings.enable && (legend.type === 'Layers' || legend.type === 'Markers')) {
                    var legendShapeElement = legendElement.childNodes[0];
                    this.maintainLegendToggle(collection['idIndex'], legendShapeElement, textElement);
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                if (i === (this.totalPages[page]['Collection'].length - 1)) {
                    var pagingGroup = void 0;
                    var width = spacing;
                    var height = (spacing / 2);
                    if (this.page !== 0) {
                        var pagingText = (page + 1) + '/' + this.totalPages.length;
                        var pagingFont = legend.textStyle;
                        var pagingTextSize = measureText(pagingText, pagingFont);
                        var leftPageX = (this.legendItemRect.x + this.legendItemRect.width) - pagingTextSize.width -
                            (width * 2) - (spacing * 2) + (pagingArrowPadding / 2);
                        var rightPageX = (this.legendItemRect.x + this.legendItemRect.width);
                        var pageTextX = rightPageX - width - (pagingTextSize.width / 2) - (spacing / 2) - pagingArrowPadding;
                        var locY = (this.legendItemRect.y + this.legendItemRect.height) + (height / 2) + spacing;
                        pagingGroup = render.createGroup({ id: map.element.id + '_Legend_Paging_Group' });
                        var leftPageElement = render.createGroup({ id: map.element.id + '_Legend_Left_Paging_Group' });
                        var rightPageElement = render.createGroup({ id: map.element.id + '_Legend_Right_Paging_Group' });
                        var rightPath = ' M ' + rightPageX + ' ' + locY + ' L ' + (rightPageX - width) + ' ' + (locY - height) +
                            ' L ' + (rightPageX - width) + ' ' + (locY + height) + ' z ';
                        var leftPath = ' M ' + leftPageX + ' ' + locY + ' L ' + (leftPageX + width) + ' ' + (locY - height) +
                            ' L ' + (leftPageX + width) + ' ' + (locY + height) + ' z ';
                        var leftPageOptions = new PathOption(map.element.id + '_Left_Page', this.maps.themeStyle.legendTextColor, 0, this.maps.themeStyle.legendTextColor, ((page + 1) === 1 ? 0.5 : 1), 1, '', leftPath);
                        leftPageElement.appendChild(render.drawPath(leftPageOptions));
                        var leftRectPageOptions = new RectOption(map.element.id + '_Left_Page_Rect', 'transparent', {}, 1, new Rect(leftPageX - (width / 2), (locY - (height * 2)), width * 2, spacing * 2), null, null, '', '');
                        var pathEle = render.drawRectangle(leftRectPageOptions);
                        pathEle.setAttribute('aria-label', 'Navigate to the previous legend items');
                        pathEle.setAttribute('role', 'button');
                        pathEle.tabIndex = (page + 1) === 1 ? -1 : map.tabIndex;
                        if ((page + 1) === 1) {
                            pathEle.style.cursor = 'default';
                            pathEle.style.setProperty('outline', 'none');
                        }
                        else {
                            pathEle.style.cursor = 'pointer';
                            pathEle.style.removeProperty('outline');
                        }
                        leftPageElement.appendChild(pathEle);
                        this.wireEvents(leftPageElement);
                        var rightPageOptions = new PathOption(map.element.id + '_Right_Page', this.maps.themeStyle.legendTextColor, 0, this.maps.themeStyle.legendTextColor, ((page + 1) === this.totalPages.length ? 0.5 : 1), 1, '', rightPath);
                        rightPageElement.appendChild(render.drawPath(rightPageOptions));
                        var rightRectPageOptions = new RectOption(map.element.id + '_Right_Page_Rect', 'transparent', {}, 1, new Rect(rightPageX - spacing - (width / 2), (locY - (height * 2)), width * 2, spacing * 2), null, null, '', '');
                        pathEle = render.drawRectangle(rightRectPageOptions);
                        pathEle.setAttribute('aria-label', 'Navigate to the next legend items');
                        pathEle.setAttribute('role', 'button');
                        pathEle.tabIndex = (page + 1) === this.totalPages.length ? -1 : map.tabIndex;
                        if ((page + 1) === this.totalPages.length) {
                            pathEle.style.cursor = 'default';
                            pathEle.style.setProperty('outline', 'none');
                        }
                        else {
                            pathEle.style.cursor = 'pointer';
                            pathEle.style.removeProperty('outline');
                        }
                        rightPageElement.appendChild(pathEle);
                        this.wireEvents(rightPageElement);
                        pagingGroup.appendChild(leftPageElement);
                        pagingGroup.appendChild(rightPageElement);
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        var pageTextOptions = {
                            'id': map.element.id + '_Paging_Text',
                            'x': pageTextX,
                            'y': locY + (pagingTextSize.height / 4),
                            'fill': this.maps.themeStyle.legendTextColor,
                            'font-size': '14px',
                            'font-style': pagingFont.fontStyle,
                            'font-family': pagingFont.fontFamily,
                            'font-weight': pagingFont.fontWeight,
                            'text-anchor': 'middle',
                            'transform': '',
                            'opacity': 1,
                            'dominant-baseline': ''
                        };
                        var pagingTextElement = render.createText(pageTextOptions, pagingText);
                        pagingTextElement.style.cssText = 'user-select: none;';
                        pagingTextElement.setAttribute('aria-label', pagingText);
                        pagingTextElement.setAttribute('role', 'region');
                        pagingGroup.appendChild(pagingTextElement);
                        this.legendGroup.appendChild(pagingGroup);
                    }
                    this.legendToggle();
                }
            }
        }
    };
    /**
     * @param {number} legendIndex - Specifies the legend index.
     * @param {Element} legendShapeElement - Specifies the legend shape element.
     * @param {Element} legendTextElement - Specifies the legend text element.
     * @returns {void}
     * @private
     */
    Legend.prototype.maintainLegendToggle = function (legendIndex, legendShapeElement, legendTextElement) {
        if (this.maps.legendSettings.toggleLegendSettings.enable &&
            !isNullOrUndefined(this.maps.toggledLegendId) && this.maps.toggledLegendId.indexOf(legendIndex) > -1 &&
            !isNullOrUndefined(this.maps.toggledElementId) && this.maps.toggledElementId.length > 0) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var currentItem = this.legendCollection[legendIndex]['data'];
            if (!this.maps.legendSettings.toggleLegendSettings.applyShapeSettings) {
                this.setToggleAttributes(legendTextElement, legendShapeElement, this.maps.legendSettings.toggleLegendSettings.fill, this.maps.legendSettings.toggleLegendSettings.opacity, this.maps.legendSettings.toggleLegendSettings.border.color, this.maps.legendSettings.toggleLegendSettings.border.width, isNullOrUndefined(this.maps.legendSettings.toggleLegendSettings.border.opacity) ?
                    this.maps.legendSettings.toggleLegendSettings.opacity :
                    this.maps.legendSettings.toggleLegendSettings.border.opacity, this.maps.legendSettings.toggleLegendSettings.fill);
            }
            else {
                var layerIndex = currentItem[currentItem.length - 1].layerIndex;
                this.setToggleAttributes(legendTextElement, legendShapeElement, this.maps.layers[layerIndex].shapeSettings.fill, this.maps.layers[layerIndex].shapeSettings.opacity, 
                /* eslint-disable-next-line max-len */
                this.maps.layers[layerIndex].shapeSettings.border.color || this.maps.themeStyle.shapeBorderColor, isNullOrUndefined(this.maps.layers[layerIndex].shapeSettings.border.width)
                    ? 0 : this.maps.layers[layerIndex].shapeSettings.border.width, isNullOrUndefined(this.maps.layers[layerIndex].shapeSettings.border.opacity)
                    ? this.maps.layers[layerIndex].shapeSettings.opacity
                    : this.maps.layers[layerIndex].shapeSettings.border.opacity, this.maps.layers[layerIndex].shapeSettings.fill);
            }
            currentItem['_isVisible'] = false;
        }
    };
    Legend.prototype.legendHighLightAndSelection = function (targetElement, value) {
        var shapeIndex;
        var layerIndex;
        var dataIndex;
        var pointIndex;
        var legend = this.maps.legendSettings;
        var textEle = legend.mode === 'Default' ? document.getElementById(targetElement.id.replace('Shape', 'Text')) :
            document.getElementById(targetElement.id + '_Text');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var collection = this.maps.legendModule.legendCollection;
        var length;
        var multiSelectEnable = !isNullOrUndefined(collection[0]['data'][0]['layerIndex']) ? this.maps.layers[collection[0]['data'][0]['layerIndex']].selectionSettings.enableMultiSelect : false;
        var selectLength = 0;
        var interactProcess = true;
        var idIndex = parseFloat(targetElement.id.charAt(targetElement.id.length - 1));
        this.updateLegendElement();
        var toggleLegendCheck = this.maps.toggledLegendId.indexOf(idIndex);
        if (this.maps.legendSettings.toggleLegendSettings.enable && value === 'highlight' && toggleLegendCheck !== -1) {
            var collectionIndex = this.getIndexofLegend(this.legendHighlightCollection, targetElement);
            if (collectionIndex !== -1) {
                this.legendHighlightCollection.splice(collectionIndex, 1);
            }
            this.removeLegendHighlightCollection();
            return null;
        }
        if (value === 'selection') {
            this.shapeHighlightCollection = [];
            if (!this.maps.shapeSelections && !multiSelectEnable) {
                this.removeAllSelections();
                this.maps.shapeSelections = true;
            }
            if (this.maps.legendSelectionCollection.length > 0 && (!multiSelectEnable ? this.maps.shapeSelections : true)) {
                for (var k = 0; k < this.maps.legendSelectionCollection.length; k++) {
                    if (targetElement === this.maps.legendSelectionCollection[k]['legendElement']) {
                        this.maps.legendSelectionCollection[k]['legendElement'] = targetElement;
                        interactProcess = false;
                        this.removeLegendSelectionCollection(this.maps.legendSelectionCollection[k]['legendElement']);
                        this.maps.selectedLegendElementId.splice(this.maps.selectedLegendElementId.indexOf(idIndex), 1);
                        this.maps.legendSelectionCollection.splice(k, 1);
                        this.maps.legendSelection = this.maps.legendSelectionCollection.length > 0 ? false : true;
                        break;
                    }
                    else if (!multiSelectEnable) {
                        if (this.maps.legendSelectionCollection.length > 1) {
                            for (var z = 0; z < this.maps.legendSelectionCollection.length; z++) {
                                this.removeLegendSelectionCollection(this.maps.legendSelectionCollection[z]['legendElement']);
                            }
                            this.maps.legendSelectionCollection = [];
                        }
                        else {
                            this.removeLegendSelectionCollection(this.maps.legendSelectionCollection[k]['legendElement']);
                            this.maps.legendSelectionCollection.splice(k, 1);
                        }
                    }
                }
            }
        }
        else {
            if (this.maps.legendSelectionCollection.length > 0) {
                for (var k = 0; k < this.maps.legendSelectionCollection.length; k++) {
                    if ((targetElement.id.indexOf('_Legend_Shape') > -1 || targetElement.id.indexOf('_Legend_Index')) &&
                        targetElement === this.maps.legendSelectionCollection[k]['legendElement']) {
                        interactProcess = false;
                        break;
                    }
                    else {
                        this.removeLegendHighlightCollection();
                    }
                }
            }
            this.removeLegendHighlightCollection();
        }
        if (interactProcess) {
            for (var i = 0; i < collection.length; i++) {
                var idIndex_1 = this.maps.legendSettings.mode === 'Interactive' ?
                    parseFloat(targetElement.id.split('_Legend_Index_')[1]) :
                    parseFloat(targetElement.id.split('_Legend_Shape_Index_')[1]);
                if (textEle.textContent === collection[i]['text'] && collection[i]['data'].length > 0
                    && idIndex_1 === i) {
                    var layer = this.maps.layers[collection[i]['data'][0]['layerIndex']];
                    var enable = void 0;
                    var legendModule = void 0;
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    var data = void 0;
                    if (!isNullOrUndefined(layer)) {
                        enable = (value === 'selection') ? layer.selectionSettings.enable : layer.highlightSettings.enable;
                        legendModule = void 0;
                        legendModule = (value === 'selection') ? layer.selectionSettings : layer.highlightSettings;
                        data = collection[i]['data'];
                    }
                    if (enable) {
                        for (var j = 0; j < data.length; j++) {
                            var shapeElement = void 0;
                            shapeIndex = data[j]['shapeIndex'];
                            layerIndex = data[j]['layerIndex'];
                            dataIndex = data[j]['dataIndex'];
                            pointIndex = data[j]['pointIndex'];
                            if (pointIndex === -1) {
                                shapeElement = document.getElementById(this.maps.element.id + '_LayerIndex_' +
                                    layerIndex + '_shapeIndex_' + shapeIndex + '_dataIndex_' + dataIndex);
                            }
                            else {
                                shapeElement = document.getElementById(this.maps.element.id + '_LayerIndex_' +
                                    layerIndex + '_shapeIndex_' + shapeIndex + '_dataIndex_' + dataIndex + '_multiLine_' + pointIndex);
                            }
                            if (shapeElement !== null) {
                                var shapeMatch = true;
                                if (this.maps.legendSelectionCollection !== null) {
                                    for (var i_2 = 0; i_2 < this.maps.legendSelectionCollection.length; i_2++) {
                                        if (this.maps.legendSelectionCollection[i_2]['legendElement'] === targetElement) {
                                            shapeMatch = false;
                                            break;
                                        }
                                    }
                                }
                                if (value === 'highlight' && shapeMatch) {
                                    if (j === 0) {
                                        this.legendHighlightCollection = [];
                                        this.pushCollection(targetElement, this.legendHighlightCollection, collection[i], layer.shapeSettings);
                                    }
                                    length = this.legendHighlightCollection.length;
                                    var legendHighlightColor = this.legendHighlightCollection[length - 1]['legendOldFill'];
                                    this.legendHighlightCollection[length - 1]['MapShapeCollection']['Elements'].push(shapeElement);
                                    var shapeItemCount = this.legendHighlightCollection[length - 1]['MapShapeCollection']['Elements'].length - 1;
                                    var shapeOldFillColor = shapeElement.getAttribute('fill');
                                    var shapeOldOpacity = shapeElement.getAttribute('fill-opacity');
                                    this.legendHighlightCollection[length - 1]['shapeOldFillColor'].push(shapeOldFillColor);
                                    this.legendHighlightCollection[length - 1]['shapeOldOpacity'] = shapeOldOpacity;
                                    var shapeOldColor = this.legendHighlightCollection[length - 1]['shapeOldFillColor'][shapeItemCount];
                                    var shapeOldFillOpacity = this.legendHighlightCollection[length - 1]['shapeOldOpacity'];
                                    this.shapePreviousColor = this.legendHighlightCollection[length - 1]['shapeOldFillColor'];
                                    this.setColor(shapeElement, !isNullOrUndefined(legendModule.fill) ? legendModule.fill : shapeOldColor, isNullOrUndefined(legendModule.opacity) ? shapeOldFillOpacity : legendModule.opacity.toString(), legendModule.border.color, legendModule.border.width.toString(), 'highlight');
                                    this.setColor(targetElement, !isNullOrUndefined(legendModule.fill) ? legendModule.fill : legendHighlightColor, isNullOrUndefined(legendModule.opacity) ? shapeOldFillOpacity : legendModule.opacity.toString(), legendModule.border.color, legendModule.border.width.toString(), 'highlight');
                                }
                                else if (value === 'selection') {
                                    this.legendHighlightCollection = [];
                                    this.maps.legendSelectionClass = legendModule;
                                    if (j === 0) {
                                        this.pushCollection(targetElement, this.maps.legendSelectionCollection, collection[i], layer.shapeSettings);
                                        if (multiSelectEnable) {
                                            this.maps.selectedLegendElementId.push(i);
                                        }
                                        else {
                                            if (this.maps.selectedLegendElementId.length === 0) {
                                                this.maps.selectedLegendElementId.push(i);
                                            }
                                            else {
                                                this.maps.selectedLegendElementId = [];
                                                this.maps.selectedLegendElementId.push(i);
                                            }
                                        }
                                    }
                                    selectLength = this.maps.legendSelectionCollection.length;
                                    var legendSelectionColor = this.maps.legendSelectionCollection[selectLength - 1]['legendOldFill'];
                                    this.maps.legendSelectionCollection[selectLength - 1]['MapShapeCollection']['Elements'].push(shapeElement);
                                    this.maps.legendSelectionCollection[selectLength - 1]['shapeOldFillColor'] = this.shapePreviousColor;
                                    this.setColor(targetElement, !isNullOrUndefined(legendModule.fill) ? legendModule.fill : legendSelectionColor, legendModule.opacity.toString(), legendModule.border.color, legendModule.border.width.toString(), 'selection');
                                    this.setColor(shapeElement, !isNullOrUndefined(legendModule.fill) ? legendModule.fill : legendSelectionColor, legendModule.opacity.toString(), legendModule.border.color, legendModule.border.width.toString(), 'selection');
                                    if (this.maps.selectedElementId.indexOf(shapeElement.getAttribute('id')) === -1) {
                                        this.maps.selectedElementId.push(shapeElement.getAttribute('id'));
                                    }
                                    if (j === data.length - 1) {
                                        this.maps.legendSelection = false;
                                        this.removeLegend(this.maps.legendSelectionCollection);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    Legend.prototype.setColor = function (element, fill, opacity, borderColor, borderWidth, type) {
        var isLineStringShape = (element.parentElement.id.indexOf('LineString') > -1);
        if (type === 'selection') {
            maintainStyleClass((isLineStringShape ? 'LineselectionMap' : 'ShapeselectionMap'), (isLineStringShape ? 'LineselectionMapStyle' : 'ShapeselectionMapStyle'), (isLineStringShape ? 'transparent' : fill), opacity, (isLineStringShape ? fill : borderColor), borderWidth, this.maps);
            element.setAttribute('class', isLineStringShape ? 'LineselectionMapStyle' : 'ShapeselectionMapStyle');
        }
        else {
            element.setAttribute('fill', isLineStringShape ? 'transparent' : fill);
            element.setAttribute('fill-opacity', opacity);
            element.setAttribute('stroke', isLineStringShape ? fill : borderColor);
            element.setAttribute('stroke-width', (Number(borderWidth) / this.maps.scale).toString());
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Legend.prototype.pushCollection = function (targetElement, collection, oldElement, shapeSettings) {
        collection.push({
            legendElement: targetElement, legendOldFill: oldElement['fill'], legendOldOpacity: oldElement['opacity'],
            legendOldBorderColor: oldElement['borderColor'], legendOldBorderWidth: oldElement['borderWidth'],
            shapeOpacity: shapeSettings.opacity, shapeOldBorderColor: shapeSettings.border.color || this.maps.themeStyle.shapeBorderColor,
            shapeOldBorderWidth: shapeSettings.border.width
        });
        var length = collection.length;
        collection[length - 1]['MapShapeCollection'] = { Elements: [] };
        collection[length - 1]['shapeOldFillColor'] = [];
        collection[length - 1]['shapeOldOpacity'] = null;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Legend.prototype.removeLegend = function (collection) {
        for (var i = 0; i < collection.length; i++) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var item = collection[i];
            this.setColor(item['legendElement'], item['legendOldFill'], item['legendOldOpacity'], item['legendOldBorderColor'], item['legendOldBorderWidth'], 'highlight');
            var dataCount = item['MapShapeCollection']['Elements'].length;
            for (var j = 0; j < dataCount; j++) {
                var shapeFillColor = item['legendOldFill'].indexOf('url') !== -1
                    ? item['shapeOldFillColor'][j] : item['legendOldFill'];
                var shapeOpacity = !isNullOrUndefined(item['shapeOldOpacity']) ? item['shapeOldOpacity'] : item['shapeOpacity'];
                this.setColor(item['MapShapeCollection']['Elements'][j], shapeFillColor, shapeOpacity, item['shapeOldBorderColor'], item['shapeOldBorderWidth'], 'highlight');
            }
        }
    };
    Legend.prototype.removeLegendHighlightCollection = function () {
        if (this.legendHighlightCollection.length > 0) {
            this.removeLegend(this.legendHighlightCollection);
            this.legendHighlightCollection = [];
        }
    };
    Legend.prototype.removeLegendSelectionCollection = function (targetElement) {
        if (this.maps.legendSelectionCollection.length > 0) {
            removeClass(targetElement);
            var shapeElements = this.shapesOfLegend(targetElement);
            var dataCount = shapeElements.length;
            for (var j = 0; j < dataCount; j++) {
                var shapeElement = getElement(shapeElements[j]);
                if (shapeElement.getAttribute('class') === 'ShapeselectionMapStyle' ||
                    shapeElement.getAttribute('class') === 'LineselectionMapStyle') {
                    removeClass(shapeElement);
                    var selectedElementIdIndex = this.maps.selectedElementId.indexOf(shapeElement.id);
                    if (selectedElementIdIndex !== -1) {
                        this.maps.selectedElementId.splice(selectedElementIdIndex, 1);
                    }
                }
            }
        }
    };
    Legend.prototype.removeShapeHighlightCollection = function () {
        if (this.shapeHighlightCollection.length > 0) {
            for (var i = 0; i < this.shapeHighlightCollection.length; i++) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var item = this.shapeHighlightCollection[i];
                var removeFill = true;
                for (var j = 0; j < this.maps.legendSelectionCollection.length; j++) {
                    if (this.maps.legendSelectionCollection[j]['legendElement'] === item['legendElement']) {
                        removeFill = false;
                    }
                }
                if (removeFill) {
                    this.setColor(item['legendElement'], item['legendOldFill'], item['legendOldOpacity'], item['legendOldBorderColor'], item['legendOldBorderWidth'], 'highlight');
                }
            }
        }
    };
    Legend.prototype.shapeHighLightAndSelection = function (targetElement, data, legendModule, getValue, layerIndex) {
        if (data !== undefined) {
            this.updateLegendElement();
            this.shapeToggled = true;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var collection = this.maps.legendModule.legendCollection;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var indexes = this.legendIndexOnShape(data, layerIndex);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var shapeElement = this.shapeDataOnLegend(targetElement);
            var toggleLegendCheck = this.maps.toggledLegendId.indexOf(indexes['actualIndex']);
            if (this.maps.legendSettings.toggleLegendSettings.enable && toggleLegendCheck !== -1) {
                this.shapeToggled = false;
                this.legendHighlightCollection = [];
                var collectionIndex = this.getIndexofLegend(this.shapeHighlightCollection, shapeElement['LegendEle']);
                if (collectionIndex !== -1) {
                    this.shapeHighlightCollection.splice(collectionIndex, 1);
                }
                this.removeShapeHighlightCollection();
                return null;
            }
            if (indexes['currentIndex'] === undefined && indexes['actualIndex'] === undefined) {
                this.removeShapeHighlightCollection();
                return null;
            }
            if (indexes['currentIndex'] === undefined && getValue === 'selection'
                && !this.maps.layers[layerIndex].selectionSettings.enableMultiSelect &&
                targetElement.getAttribute('class') !== 'ShapeselectionMapStyle') {
                this.maps.legendSelection = false;
            }
            if (getValue === 'selection' && !this.maps.layers[layerIndex].selectionSettings.enableMultiSelect &&
                !this.maps.legendSelection) {
                this.removeAllSelections();
                this.maps.legendSelection = true;
            }
            if (indexes['currentIndex'] === undefined) {
                if (getValue === 'selection' && indexes['actualIndex'] !== undefined) {
                    var checkSelection = 0;
                    for (var i = 0; i < shapeElement['Elements'].length; i++) {
                        if (shapeElement['Elements'][i].getAttribute('class') === 'ShapeselectionMapStyle') {
                            checkSelection++;
                        }
                    }
                    var selectionIndex = this.maps.selectedLegendElementId.indexOf(indexes['actualIndex']);
                    if (selectionIndex === -1) {
                        this.maps.selectedLegendElementId.push(indexes['actualIndex']);
                        this.maps.legendSelectionClass = legendModule;
                    }
                    else {
                        if ((checkSelection <= 1) && (targetElement.getAttribute('class') === 'ShapeselectionMapStyle'
                            || targetElement.getAttribute('class') === 'LineselectionMapStyle')) {
                            if (!this.maps.layers[layerIndex].selectionSettings.enableMultiSelect) {
                                this.maps.selectedLegendElementId.splice(selectionIndex, 1);
                            }
                            else {
                                if (checkSelection <= 1 && (targetElement.getAttribute('class') === 'ShapeselectionMapStyle'
                                    || targetElement.getAttribute('class') === 'LineselectionMapStyle')) {
                                    this.maps.selectedLegendElementId.splice(selectionIndex, 1);
                                }
                            }
                        }
                    }
                }
                this.removeShapeHighlightCollection();
                return null;
            }
            var text = collection[indexes['actualIndex']]['text'];
            var content = void 0;
            var legendShape = void 0;
            if (this.maps.legendSettings.mode === 'Default') {
                if (indexes['currentIndex'] !== undefined) {
                    content = document.getElementById(this.maps.element.id + '_Legend_Text_Index_' + indexes['actualIndex']).textContent;
                    legendShape = document.getElementById(this.maps.element.id + '_Legend_Shape_Index_' + indexes['actualIndex']);
                }
            }
            else {
                content = document.getElementById(this.maps.element.id + '_Legend_Index_' + indexes['actualIndex']
                    + '_Text').textContent;
                legendShape = document.getElementById(this.maps.element.id + '_Legend_Index_' + indexes['actualIndex']);
            }
            this.oldShapeElement = shapeElement['LegendEle'];
            var length_1 = this.maps.legendSelectionCollection.length;
            if (text === content) {
                var shapeMatched = true;
                if (this.maps.legendSelectionCollection) {
                    for (var i = 0; i < this.maps.legendSelectionCollection.length; i++) {
                        if (this.maps.legendSelectionCollection[i]['legendElement'] === shapeElement['LegendEle']) {
                            shapeMatched = false;
                            break;
                        }
                    }
                }
                if (getValue === 'highlight' && shapeMatched) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    var selectionEle = this.isTargetSelected(shapeElement, this.shapeHighlightCollection);
                    if (selectionEle === undefined || (selectionEle && !selectionEle['IsSelected'])) {
                        this.pushCollection(legendShape, this.shapeHighlightCollection, collection[indexes['actualIndex']], this.maps.layers[layerIndex].shapeSettings);
                    }
                    for (var j = 0; j < this.shapeHighlightCollection.length; j++) {
                        if (shapeElement['LegendEle'].id === this.shapeHighlightCollection[j]['legendElement'].id) {
                            this.shapeHighlightCollection[j]['legendElement'] = shapeElement['LegendEle'];
                        }
                    }
                    if (length_1 > 0) {
                        for (var j = 0; j < length_1; j++) {
                            if (shapeElement['LegendEle'] === this.maps.legendSelectionCollection[j]['legendElement']) {
                                this.maps.legendSelectionCollection[j]['legendElement'] = shapeElement['LegendEle'];
                                this.removeShapeHighlightCollection();
                                break;
                            }
                            else if (j === length_1 - 1) {
                                this.removeShapeHighlightCollection();
                                this.setColor(legendShape, !isNullOrUndefined(legendModule.fill) ? legendModule.fill : legendShape.getAttribute('fill'), legendModule.opacity.toString(), legendModule.border.color, legendModule.border.width.toString(), 'highlight');
                            }
                        }
                    }
                    else {
                        this.removeShapeHighlightCollection();
                        this.setColor(legendShape, !isNullOrUndefined(legendModule.fill) ? legendModule.fill : legendShape.getAttribute('fill'), !isNullOrUndefined(legendModule.opacity) ? legendModule.opacity.toString() : '1', legendModule.border.color, legendModule.border.width.toString(), 'highlight');
                    }
                }
                else if (getValue === 'selection') {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    var selectionEle = this.isTargetSelected(shapeElement, this.maps.legendSelectionCollection);
                    if (length_1 > 0) {
                        var j = 0;
                        while (j < this.maps.legendSelectionCollection.length) {
                            if (shapeElement['LegendEle'] !== this.maps.legendSelectionCollection[j]['legendElement'] &&
                                !legendModule.enableMultiSelect) {
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                var element = this.maps.legendSelectionCollection[j];
                                var selectedLegendIndex = this.maps.selectedLegendElementId.indexOf(indexes['actualIndex']);
                                this.maps.selectedLegendElementId.splice(selectedLegendIndex, 1);
                                this.maps.legendSelectionCollection.splice(j, 1);
                                removeClass(element['legendElement']);
                                this.maps.shapeSelections = true;
                                j = 0;
                            }
                            else {
                                j++;
                            }
                        }
                    }
                    if (selectionEle && (selectionEle['IsSelected'] && (targetElement.getAttribute('class') === 'ShapeselectionMapStyle'
                        || targetElement.getAttribute('class') === 'LineselectionMapStyle'))) {
                        var multiSelection = 0;
                        if (legendModule.enableMultiSelect) {
                            for (var i = 0; i < shapeElement['Elements'].length; i++) {
                                if (targetElement.getAttribute('class') === shapeElement['Elements'][i].getAttribute('class')) {
                                    multiSelection++;
                                }
                            }
                        }
                        if (multiSelection <= 1 && (!legendModule.enableMultiSelect ?
                            this.maps.legendSelection : true)) {
                            this.maps.selectedLegendElementId.splice(this.maps.selectedLegendElementId.indexOf(indexes['actualIndex']), 1);
                            if (!isNullOrUndefined(shapeElement['LegendEle'])) {
                                removeClass(shapeElement['LegendEle']);
                            }
                            this.maps.legendSelectionCollection.splice(selectionEle['SelectionIndex'], 1);
                            this.maps.shapeSelections = true;
                        }
                    }
                    else {
                        if ((selectionEle === undefined || (selectionEle && !selectionEle['IsSelected'])) &&
                            !isNullOrUndefined(legendShape)) {
                            var legendSelectionIndex = this.getIndexofLegend(this.maps.legendSelectionCollection, legendShape);
                            if (legendSelectionIndex === -1) {
                                this.pushCollection(legendShape, this.maps.legendSelectionCollection, collection[indexes['actualIndex']], this.maps.layers[layerIndex].shapeSettings);
                            }
                        }
                        var addId = true;
                        for (var i = 0; i < this.maps.selectedLegendElementId.length; i++) {
                            if (indexes['actualIndex'] === this.maps.selectedLegendElementId[i]) {
                                addId = false;
                            }
                        }
                        if (addId) {
                            this.maps.selectedLegendElementId.push(indexes['actualIndex']);
                        }
                        this.maps.legendSelectionClass = legendModule;
                        this.removeLegend(this.shapeHighlightCollection);
                        if (!isNullOrUndefined(legendShape)) {
                            this.setColor(legendShape, !isNullOrUndefined(legendModule.fill) ? legendModule.fill : legendShape.getAttribute('fill'), !isNullOrUndefined(legendModule.opacity) ? legendModule.opacity.toString() : '1', legendModule.border.color, legendModule.border.width.toString(), 'selection');
                            var legendSelectionIndex = this.getIndexofLegend(this.maps.legendSelectionCollection, legendShape);
                            this.maps.legendSelectionCollection[legendSelectionIndex]['MapShapeCollection']['Elements'].push(targetElement);
                        }
                        this.maps.shapeSelections = false;
                    }
                }
                else if (document.getElementsByClassName('highlightMapStyle').length > 0) {
                    this.removeShapeHighlightCollection();
                    removeClass(document.getElementsByClassName('highlightMapStyle')[0]);
                }
            }
        }
        else {
            this.removeShapeHighlightCollection();
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Legend.prototype.isTargetSelected = function (target, collection) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var selectEle;
        for (var i = 0; i < collection.length; i++) {
            if (!isNullOrUndefined(target['LegendEle'].getAttribute('id')) &&
                (target['LegendEle'].getAttribute('id') === collection[i]['legendElement'].getAttribute('id'))) {
                selectEle = { IsSelected: true, SelectionIndex: i };
            }
        }
        return selectEle;
    };
    Legend.prototype.updateLegendElement = function () {
        for (var i = 0; i < this.maps.legendSelectionCollection.length; i++) {
            if (document.getElementById(this.maps.legendSelectionCollection[i]['legendElement'].id)) {
                this.maps.legendSelectionCollection[i]['legendElement'] =
                    document.getElementById(this.maps.legendSelectionCollection[i]['legendElement'].id);
            }
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Legend.prototype.getIndexofLegend = function (targetCollection, targetElement) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var legendIndex = targetCollection.map(function (e) { return e['legendElement']; }).indexOf(targetElement);
        return legendIndex;
    };
    Legend.prototype.removeAllSelections = function () {
        for (var i = 0; i < this.maps.selectedElementId.length; i++) {
            var selectedElement = document.getElementById(this.maps.selectedElementId[i]);
            removeClass(selectedElement);
        }
        for (var j = 0; j < this.maps.selectedLegendElementId.length; j++) {
            var idIndex = this.maps.legendSettings.mode === 'Interactive' ?
                this.maps.element.id + '_Legend_Index_' : this.maps.element.id + '_Legend_Shape_Index_';
            var selectedElement = idIndex + this.maps.selectedLegendElementId[j];
            var legendElement = document.getElementById(selectedElement);
            if (!isNullOrUndefined(legendElement)) {
                removeClass(document.getElementById(selectedElement));
            }
        }
        this.maps.legendSelectionCollection = [];
        this.maps.selectedLegendElementId = [];
        this.maps.selectedElementId = [];
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Legend.prototype.legendIndexOnShape = function (data, index) {
        var legendIndex;
        var actualIndex;
        var path = this.maps.layers[index].shapeDataPath;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var value = data[path];
        var legendType = this.maps.legendSettings.mode;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var collection = this.maps.legendModule.legendCollection;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var currentCollection;
        if (legendType === 'Default' && !isNullOrUndefined(this.maps.legendModule.totalPages) && (this.maps.legendModule.totalPages.length > 0)) {
            currentCollection = this.maps.legendModule.totalPages[this.maps.legendModule.currentPage]['Collection'];
        }
        var currentCollectionLength = (legendType === 'Default' && !isNullOrUndefined(currentCollection)) ? currentCollection['length'] : 1;
        for (var i = 0; i < collection.length; i++) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var dataValue = collection[i]['data'];
            for (var k = 0; k < currentCollectionLength; k++) {
                if (legendType !== 'Default' || collection[i]['text'] === currentCollection[k]['DisplayText']) {
                    for (var j = 0; j < dataValue.length; j++) {
                        if (value === dataValue[j]['name']) {
                            legendIndex = k;
                        }
                    }
                }
            }
            for (var j = 0; j < dataValue.length; j++) {
                if (value === dataValue[j]['name']) {
                    actualIndex = i;
                }
            }
        }
        return { currentIndex: legendIndex, actualIndex: actualIndex };
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Legend.prototype.shapeDataOnLegend = function (targetElement) {
        var shapeIndex;
        var layerIndex;
        var dataIndex;
        var pointIndex;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var collection = this.maps.legendModule.legendCollection;
        var legend = this.maps.legendSettings;
        for (var i = 0; i < collection.length; i++) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var data = collection[i]['data'];
            var process = false;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var elements = [];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var currentElement = { Elements: [] };
            for (var j = 0; j < data.length; j++) {
                var shapeElement = void 0;
                shapeIndex = data[j]['shapeIndex'];
                layerIndex = data[j]['layerIndex'];
                dataIndex = data[j]['dataIndex'];
                pointIndex = data[j]['pointIndex'];
                if (pointIndex === -1) {
                    shapeElement = document.getElementById(this.maps.element.id + '_LayerIndex_' +
                        layerIndex + '_shapeIndex_' + shapeIndex + '_dataIndex_' + dataIndex);
                }
                else {
                    shapeElement = document.getElementById(this.maps.element.id + '_LayerIndex_' +
                        layerIndex + '_shapeIndex_' + shapeIndex + '_dataIndex_' + dataIndex + '_multiLine_' + pointIndex);
                }
                if (targetElement === shapeElement) {
                    process = true;
                }
                elements.push(shapeElement);
            }
            if (process) {
                if (isNullOrUndefined(currentElement['LegendEle'])) {
                    currentElement['LegendEle'] = legend.mode === 'Default' ?
                        document.getElementById(this.maps.element.id + '_Legend_Shape_Index_' + i) :
                        document.getElementById(this.maps.element.id + '_Legend_Index_' + i);
                }
                currentElement['Elements'] = elements;
                return currentElement;
            }
        }
        return null;
    };
    Legend.prototype.shapesOfLegend = function (targetElement) {
        var shapeIndex;
        var layerIndex;
        var dataIndex;
        var pointIndex;
        var idIndex = parseFloat(targetElement.id.charAt(targetElement.id.length - 1));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var data = this.maps.legendModule.legendCollection[idIndex]['data'];
        var legendShapeElements = [];
        for (var i = 0; i < data.length; i++) {
            var shapeElement = void 0;
            shapeIndex = data[i]['shapeIndex'];
            layerIndex = data[i]['layerIndex'];
            dataIndex = data[i]['dataIndex'];
            pointIndex = data[i]['pointIndex'];
            if (pointIndex === -1) {
                shapeElement = document.getElementById(this.maps.element.id + '_LayerIndex_' +
                    layerIndex + '_shapeIndex_' + shapeIndex + '_dataIndex_' + dataIndex);
            }
            else {
                shapeElement = document.getElementById(this.maps.element.id + '_LayerIndex_' +
                    layerIndex + '_shapeIndex_' + shapeIndex + '_dataIndex_' + dataIndex + '_multiLine_' + pointIndex);
            }
            if (!isNullOrUndefined(shapeElement)) {
                legendShapeElements.push(shapeElement.id);
            }
        }
        return legendShapeElements;
    };
    Legend.prototype.legendToggle = function () {
        var map = this.maps;
        var legend = map.legendSettings;
        if (this.maps.selectedLegendElementId) {
            // To maintain the state of legend selection during page resize.
            for (var j = 0; j < this.maps.selectedLegendElementId.length; j++) {
                var idIndex = legend.mode === 'Interactive' ? this.maps.element.id + '_Legend_Index_' : this.maps.element.id + '_Legend_Shape_Index_';
                var selectedElement = map.svgObject.querySelector('#' + idIndex + this.maps.selectedLegendElementId[j]);
                if (!isNullOrUndefined(selectedElement)) {
                    var fill = !isNullOrUndefined(this.maps.legendSelectionClass.fill) ?
                        this.maps.legendSelectionClass.fill : selectedElement.getAttribute('fill');
                    this.setColor(selectedElement, fill, this.maps.legendSelectionClass.opacity.toString(), this.maps.legendSelectionClass.border.color, this.maps.legendSelectionClass.border.width.toString(), 'selection');
                    for (var i = 0; i < this.maps.legendSelectionCollection.length; i++) {
                        if (this.maps.legendSelectionCollection[i]['legendElement'].id === selectedElement.id) {
                            this.maps.legendSelectionCollection[i]['legendElement'] = selectedElement;
                        }
                    }
                    var legendSelectionIndex = this.getIndexofLegend(this.maps.legendSelectionCollection, selectedElement);
                    if (legendSelectionIndex === -1) {
                        var layerIndex = this.maps.legendModule.legendCollection[this.maps.selectedLegendElementId[j]]['data'][j]['layerIndex'];
                        this.pushCollection(selectedElement, this.maps.legendSelectionCollection, this.maps.legendModule.legendCollection[this.maps.selectedLegendElementId[j]], this.maps.layers[layerIndex].shapeSettings);
                    }
                }
            }
        }
        if (this.maps.toggledLegendId) {
            for (var j = 0; j < this.maps.toggledLegendId.length; j++) {
                var legendTextId = legend.mode === 'Interactive' ? ('#' + this.maps.element.id + '_Legend_Index_' + this.maps.toggledLegendId[j] + '_Text') : ('#' + this.maps.element.id + '_Legend_Text_Index_' + this.maps.toggledLegendId[j]);
                var textElement = map.svgObject.querySelector(legendTextId);
                if (!isNullOrUndefined(textElement)) {
                    textElement.setAttribute('fill', '#E5E5E5');
                }
                var legendShapeId = legend.mode === 'Interactive' ? ('#' + this.maps.element.id + '_Legend_Index_' + this.maps.toggledLegendId[j]) : ('#' + this.maps.element.id + '_Legend_Shape_Index_' + this.maps.toggledLegendId[j]);
                var legendElement = map.svgObject.querySelector(legendShapeId);
                if (!isNullOrUndefined(legendElement)) {
                    legendElement.setAttribute('fill', '#E5E5E5');
                }
            }
        }
    };
    Legend.prototype.renderLegendBorder = function () {
        var map = this.maps;
        var legend = map.legendSettings;
        var legendTitle = legend.title.text;
        var textStyle = {
            fontFamily: legend.titleStyle.fontFamily, fontStyle: legend.titleStyle.fontStyle,
            fontWeight: legend.titleStyle.fontWeight, size: legend.titleStyle.size, color: legend.titleStyle.color,
            opacity: legend.titleStyle.opacity
        };
        var textOptions;
        var spacing = 10;
        var trimTitle = textTrim((this.legendItemRect.width + (spacing * 2)), legendTitle, textStyle);
        var textSize = measureText(trimTitle, textStyle);
        this.legendBorderRect = new Rect((this.legendItemRect.x - spacing), (this.legendItemRect.y - spacing - textSize.height), (this.legendItemRect.width) + (spacing * 2), (this.legendItemRect.height) + (spacing * 2) + textSize.height +
            (legend.mode === 'Interactive' ? 0 : (this.page !== 0) ? spacing : 0));
        var legendBorder = {
            color: legend.border.color || this.maps.themeStyle.legendBorderColor, opacity: legend.border.opacity,
            width: legend.border.width || this.maps.themeStyle.legendBorderWidth
        };
        legendBorder.opacity = isNullOrUndefined(legendBorder.opacity) ? 1 : legendBorder.opacity;
        var renderOptions = new RectOption(map.element.id + '_Legend_Border', legend.background, legendBorder, 1, this.legendBorderRect, null, null, '', '');
        this.legendGroup.appendChild(map.renderer.drawRectangle(renderOptions));
        this.getLegendAlignment(map, this.legendBorderRect.width, this.legendBorderRect.height, legend);
        this.legendGroup.setAttribute('transform', 'translate( ' + (this.translate.x + (-this.legendBorderRect.x)) + ' ' +
            (this.translate.y + (-(this.legendBorderRect.y))) + ' )');
        if (legend.position !== 'Float') {
            map.svgObject.appendChild(this.legendGroup);
        }
        if (legendTitle) {
            textStyle.color = (textStyle.color !== null) ? textStyle.color : this.maps.themeStyle.legendTitleFontColor;
            textStyle.fontFamily = !isNullOrUndefined(textStyle.fontFamily) ? textStyle.fontFamily
                : this.maps.themeStyle.fontFamily;
            textStyle.size = !isNullOrUndefined(textStyle.size) ? textStyle.size
                : this.maps.themeStyle.subTitleFontSize || Theme.legendTitleFont.size;
            textStyle.fontWeight = !isNullOrUndefined(textStyle.fontWeight) ? textStyle.fontWeight
                : this.maps.themeStyle.titleFontWeight || Theme.legendTitleFont.fontWeight;
            textOptions = new TextOption(map.element.id + '_LegendTitle', (this.legendItemRect.x) + (this.legendItemRect.width / 2), this.legendItemRect.y - (textSize.height / 2) - spacing / 2, 'middle', trimTitle, '');
            var element = renderTextElement(textOptions, textStyle, textStyle.color, this.legendGroup);
            element.setAttribute('aria-label', legendTitle);
            element.setAttribute('role', 'region');
        }
    };
    Legend.prototype.changeNextPage = function (e) {
        this.currentPage = (e.target.id.indexOf('_Left_Page_') > -1) ? (this.currentPage - 1) :
            (this.currentPage + 1);
        this.legendGroup = this.maps.renderer.createGroup({ id: this.maps.element.id + '_Legend_Group' });
        this.maps.mapAreaRect = this.initialMapAreaRect;
        this.drawLegendItem(this.currentPage);
        if (!isNullOrUndefined(this.maps.legendModule) && this.maps.legendSettings.position === 'Float') {
            if (this.maps.isTileMap) {
                this.maps.mapLayerPanel.layerGroup.appendChild(this.maps.legendModule.legendGroup);
            }
            else {
                this.maps.svgObject.appendChild(this.maps.legendModule.legendGroup);
            }
        }
        if (querySelector(this.maps.element.id + '_Legend_Border', this.maps.element.id)) {
            querySelector(this.maps.element.id + '_Legend_Border', this.maps.element.id).style.pointerEvents = 'none';
        }
    };
    Legend.prototype.getLegendAlignment = function (map, width, height, legend) {
        var x;
        var y;
        var spacing = 10;
        var totalRect;
        // eslint-disable-next-line prefer-const
        totalRect = extend({}, map.mapAreaRect, totalRect, true);
        var areaX = totalRect.x;
        var areaY = totalRect.y;
        var areaHeight = totalRect.height;
        var areaWidth = totalRect.width;
        var totalWidth = map.availableSize.width;
        var totalHeight = map.availableSize.height;
        var locationX = !isNullOrUndefined(legend.location.x) ? (typeof (legend.location.x) === 'string' &&
            legend.location.x.indexOf('%') > -1 ? (map.availableSize.width / 100) * parseFloat(legend.location.x) :
            typeof (legend.location.x) === 'string' ? parseFloat(legend.location.x) : legend.location.x) : 0;
        var locationY = !isNullOrUndefined(legend.location.y) ? (typeof (legend.location.y) === 'string' &&
            legend.location.y.indexOf('%') > -1 ? (map.availableSize.height / 100) * parseFloat(legend.location.y) :
            typeof (legend.location.y) === 'string' ? parseFloat(legend.location.y) : legend.location.y) : 0;
        if (legend.position === 'Float') {
            this.translate = map.isTileMap ? new Point(locationX, locationY + (spacing / 4)) :
                new Point(locationX + map.mapAreaRect.x, locationY + map.mapAreaRect.y);
            this.legendTotalRect = map.mapAreaRect;
        }
        else {
            switch (legend.position) {
                case 'Top':
                case 'Bottom':
                    totalRect.height = (legend.position === 'Top') ? (areaHeight - height) : (areaHeight - height - (spacing * 2));
                    x = (totalWidth / 2) - (width / 2);
                    y = (legend.position === 'Top') ? areaY : (areaY + totalRect.height);
                    totalRect.y = (legend.position === 'Top') ? areaY + height + (map.isTileMap ? (spacing / 2) : spacing) : areaY - (spacing / 2);
                    break;
                case 'Left':
                case 'Right':
                    totalRect.width = (areaWidth - width - map.mapAreaRect.x);
                    x = (legend.position === 'Left') ? areaX + (spacing / 2) : (areaX + totalRect.width + spacing);
                    y = (totalHeight / 2) - (height / 2);
                    totalRect.x = (legend.position === 'Left') ? areaX + width + spacing : areaX;
                    break;
            }
            switch (legend.alignment) {
                case 'Near':
                    if (legend.position === 'Top' || legend.position === 'Bottom') {
                        x = totalRect.x - (legend.mode === 'Interactive' ? spacing : 0);
                    }
                    else {
                        y = totalRect.y - (!(legend.height && legend.width) && legend.mode === 'Interactive' ? map.mapAreaRect.x : 0);
                    }
                    break;
                case 'Far':
                    if (legend.position === 'Top' || legend.position === 'Bottom') {
                        x = (totalWidth - width) - (legend.mode === 'Interactive' ? 0 : spacing);
                    }
                    else {
                        y = totalHeight - height - (legend.mode === 'Default' ? spacing : 0);
                    }
                    break;
            }
            if ((legend.height || legend.width) && legend.mode !== 'Interactive') {
                this.legendTotalRect = map.mapAreaRect = map.totalRect = totalRect;
            }
            else {
                map.totalRect = null;
                if ((legend.height || legend.width) && legend.mode === 'Interactive') {
                    map.totalRect = totalRect;
                }
                this.legendTotalRect = map.mapAreaRect = totalRect;
            }
            if (legend.position === 'Left') {
                map.mapAreaRect.width = totalRect.width;
            }
            this.translate = new Point(x, y);
        }
    };
    Legend.prototype.getMarkersLegendCollections = function (layerIndex, markers) {
        var _this = this;
        Array.prototype.forEach.call(markers, function (marker, markerIndex) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var dataSource = marker.dataSource;
            var field = marker.legendText;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var templateFn;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            Array.prototype.forEach.call(dataSource, function (data, dataIndex) {
                var imageSrc = null;
                var showLegend = isNullOrUndefined(data[_this.maps.legendSettings.showLegendPath]) ? true :
                    data[_this.maps.legendSettings.showLegendPath];
                var latitude = !isNullOrUndefined(data['latitude']) || !isNullOrUndefined(data['Latitude']) || !isNullOrUndefined(data[marker.latitudeValuePath]);
                var longitude = !isNullOrUndefined(data['longitude']) || !isNullOrUndefined(data['Longitude']) || !isNullOrUndefined(data[marker.longitudeValuePath]);
                if (marker.visible && showLegend && latitude && longitude) {
                    if (marker.template) {
                        templateFn = getTemplateFunction(marker.template, _this.maps);
                        var templateElement = templateFn(_this.maps);
                        var markerEle = isNullOrUndefined(templateElement.childElementCount) ? templateElement[0] :
                            templateElement;
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        imageSrc = markerEle.querySelector('img').src;
                    }
                    var text = isNullOrUndefined(data[field]) ? '' : data[field];
                    var legendFill = !isNullOrUndefined(marker.colorValuePath) ? data[marker.colorValuePath] : marker.fill;
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    var newData = [];
                    if (_this.maps.legendSettings.removeDuplicateLegend) {
                        newData.push(_this.getMarkerLegendData(layerIndex, text, legendFill));
                        _this.getOverallLegendItemsCollection(text, legendFill, newData, showLegend);
                    }
                    else {
                        newData.push({ layerIndex: layerIndex, markerIndex: markerIndex, dataIndex: dataIndex, value: legendFill,
                            name: text,
                            shape: (!isNullOrUndefined(marker.shapeValuePath) && !isNullOrUndefined(data[marker.shapeValuePath]) && data[marker.shapeValuePath] !== '') ? data[marker.shapeValuePath] : (_this.maps.legendSettings.useMarkerShape ? marker.shape : _this.maps.legendSettings.shape) });
                        _this.getOverallLegendItemsCollection(text, legendFill, newData, showLegend);
                    }
                }
            });
        });
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Legend.prototype.getMarkerLegendData = function (layerIndex, text, legendFill) {
        var _this = this;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var legendData = [];
        this.maps.layers[layerIndex].markerSettings.map(function (markerSettings, markerIndex) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var markerData = markerSettings.dataSource;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            Array.prototype.forEach.call(markerData, function (data, dataIndex) {
                var marker = _this.maps.layers[layerIndex].markerSettings[markerIndex];
                if ((text === data[marker.legendText] || text === '') && legendFill === (data[marker.colorValuePath] || marker.fill)) {
                    legendData.push({ layerIndex: layerIndex, markerIndex: markerIndex, dataIndex: dataIndex, value: legendFill, name: text,
                        shape: !isNullOrUndefined(marker.shapeValuePath) ? data[marker.shapeValuePath] : marker.shape });
                }
            });
        });
        return legendData;
    };
    Legend.prototype.getRangeLegendCollection = function (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    layerIndex, layerData, colorMapping, dataSource, dataPath, colorValuePath, propertyPath) {
        var _this = this;
        var legendText;
        var legendIndex = 0;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var fill = this.maps.legendSettings.fill;
        var rangeData = [];
        var _loop_1 = function (colorMap) {
            if (!isNullOrUndefined(colorMap.from) && !isNullOrUndefined(colorMap.to)) {
                legendText = !isNullOrUndefined(colorMap.label) ? colorMap.label : colorMap.from + ' - ' + colorMap.to;
                rangeData = [];
                var colorMapProcess_1 = false;
                if (!isNullOrUndefined(dataSource) && dataSource.length > 0) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    Array.prototype.forEach.call(dataSource, function (data, dataIndex) {
                        var colorValue = (colorValuePath.indexOf('.') > -1) ? Number(getValueFromObject(data, colorValuePath)) :
                            parseFloat(data[colorValuePath]);
                        if (colorValue >= colorMap.from && colorValue <= colorMap.to) {
                            colorMapProcess_1 = true;
                            rangeData.push(_this.getLegendData(layerIndex, dataIndex, data, dataPath, layerData, propertyPath, colorValue));
                        }
                    });
                }
                if (!colorMapProcess_1) {
                    rangeData.push({
                        layerIndex: layerIndex, shapeIndex: null, dataIndex: null,
                        name: null, value: null
                    });
                }
                var legendFill = (isNullOrUndefined(fill)) ? Object.prototype.toString.call(colorMap.color) === '[object Array]' ?
                    !isNullOrUndefined(colorMap.value) ? colorMap.color[0] : this_1.legendGradientColor(colorMap, legendIndex) :
                    colorMap.color : fill;
                legendIndex++;
                this_1.getOverallLegendItemsCollection(legendText, legendFill, rangeData, colorMap.showLegend);
            }
        };
        var this_1 = this;
        for (var _i = 0, colorMapping_1 = colorMapping; _i < colorMapping_1.length; _i++) {
            var colorMap = colorMapping_1[_i];
            _loop_1(colorMap);
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Legend.prototype.getOverallLegendItemsCollection = function (legendText, legendFill, legendData, showLegend) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var newColllection = [];
        var legend = this.maps.legendSettings;
        if (legendData.length > 0 && showLegend) {
            for (var i = 0; i < legendData.length; i++) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var collection = legendData[i];
                if (collection.length > 0) {
                    for (var j = 0; j < collection.length; j++) {
                        newColllection.push(collection[j]);
                    }
                }
                else {
                    newColllection.push(legendData[i]);
                }
                newColllection['_isVisible'] = true;
            }
            var isDuplicate = this.maps.legendSettings.removeDuplicateLegend ?
                this.removeDuplicates(this.legendCollection, legendText, legendFill) : false;
            if (!isDuplicate) {
                this.legendCollection.push({
                    text: legendText, fill: legendFill, data: newColllection, opacity: legend.opacity,
                    borderColor: legend.shapeBorder.color, borderWidth: legend.shapeBorder.width
                });
            }
            else {
                for (var i = 0; i < this.legendCollection.length; i++) {
                    if (this.legendCollection[i]['text'] === legendText && this.legendCollection[i]['fill'] === legendFill) {
                        this.legendCollection[i].data.push(newColllection[0]);
                    }
                }
            }
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Legend.prototype.removeDuplicates = function (legendCollection, text, legendFill) {
        var isDuplicate = false;
        for (var i = 0; i < legendCollection.length; i++) {
            if ((legendCollection[i]['text'] === text || legendCollection[i]['text'] === '') && legendCollection[i]['fill'] === legendFill) {
                isDuplicate = true;
                break;
            }
            else {
                continue;
            }
        }
        return isDuplicate;
    };
    Legend.prototype.getEqualLegendCollection = function (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    layerIndex, layerData, colorMapping, dataSource, dataPath, colorValuePath, propertyPath) {
        var _this = this;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var fill = this.maps.legendSettings.fill;
        var equalValues = [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var legendText;
        var equalData = [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var outOfRangeValues = [];
        var outOfRange = [];
        var _loop_2 = function (colorMap) {
            if (!isNullOrUndefined(colorMap.value)) {
                legendText = !isNullOrUndefined(colorMap.label) ? colorMap.label : colorMap.value;
                equalData = [];
                var eqaulColorProcess_1 = false;
                if (!isNullOrUndefined(dataSource) && dataSource.length > 0) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    Array.prototype.forEach.call(dataSource, function (data, dataIndex) {
                        var equalValue = ((colorValuePath && colorValuePath.indexOf('.') > -1) ? (getValueFromObject(data, colorValuePath)) :
                            (data[colorValuePath]));
                        if (equalValue === colorMap.value) {
                            eqaulColorProcess_1 = true;
                            if (equalValues.indexOf(equalValue) === -1) {
                                equalValues.push(equalValue);
                            }
                            equalData.push(_this.getLegendData(layerIndex, dataIndex, data, dataPath, layerData, propertyPath, equalValue));
                        }
                        else {
                            if (outOfRangeValues.indexOf(equalValue) === -1) {
                                outOfRangeValues.push(equalValue);
                            }
                        }
                    });
                }
                for (var x = 0; x < equalValues.length; x++) {
                    for (var y = 0; y < outOfRangeValues.length; y++) {
                        if (equalValues[x] === outOfRangeValues[y]) {
                            var equalIndex = outOfRangeValues.indexOf(equalValues[x]);
                            outOfRangeValues.splice(equalIndex, 1);
                        }
                    }
                }
                if (!eqaulColorProcess_1) {
                    equalData.push({
                        layerIndex: layerIndex, shapeIndex: null, dataIndex: null,
                        name: null, value: null
                    });
                }
                var legendFill = (isNullOrUndefined(fill)) ? Object.prototype.toString.call(colorMap.color) === '[object Array]'
                    ? colorMap.color[0] : colorMap.color : fill;
                this_2.getOverallLegendItemsCollection(legendText, legendFill, equalData, colorMap.showLegend);
            }
            else if (isNullOrUndefined(colorMap.minOpacity) && isNullOrUndefined(colorMap.maxOpacity) && isNullOrUndefined(colorMap.value)
                && isNullOrUndefined(colorMap.from) && isNullOrUndefined(colorMap.to) && !isNullOrUndefined(colorMap.color)) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                Array.prototype.forEach.call(dataSource, function (data, dataIndex) {
                    var equalValue = ((colorValuePath.indexOf('.') > -1) ? (getValueFromObject(data, colorValuePath)) :
                        (data[colorValuePath]));
                    for (var k = 0; k < outOfRangeValues.length; k++) {
                        if (equalValue === outOfRangeValues[k]) {
                            outOfRange.push(_this.getLegendData(layerIndex, dataIndex, data, dataPath, layerData, propertyPath, equalValue));
                        }
                    }
                });
                if (outOfRangeValues.length === 0) {
                    var range_1 = false;
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    Array.prototype.forEach.call(dataSource, function (data, dataIndex) {
                        range_1 = false;
                        var rangeValue = data[colorValuePath];
                        for (var z = 0; z < colorMapping.length; z++) {
                            if (!isNullOrUndefined(rangeValue) && !isNaN(rangeValue)) {
                                if (rangeValue >= colorMapping[z].from && rangeValue <= colorMapping[z].to) {
                                    range_1 = true;
                                }
                            }
                            else if (!range_1) {
                                range_1 = false;
                            }
                        }
                        if (!range_1) {
                            outOfRange.push(_this.getLegendData(layerIndex, dataIndex, data, dataPath, layerData, propertyPath, rangeValue));
                        }
                    });
                }
                legendText = !isNullOrUndefined(colorMap.label) ? colorMap.label : 'Others';
                var outfill = ((Object.prototype.toString.call(colorMap.color) === '[object Array]'))
                    ? colorMap.color[0] : colorMap.color;
                var legendOutFill = outfill;
                this_2.getOverallLegendItemsCollection(legendText, legendOutFill, outOfRange, colorMap.showLegend);
            }
        };
        var this_2 = this;
        for (var _i = 0, colorMapping_2 = colorMapping; _i < colorMapping_2.length; _i++) {
            var colorMap = colorMapping_2[_i];
            _loop_2(colorMap);
        }
    };
    Legend.prototype.getDataLegendCollection = function (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    layerIndex, layerData, colorMapping, dataSource, dataPath, colorValuePath, propertyPath) {
        var _this = this;
        var legendText;
        var fill = this.maps.legendSettings.fill;
        var valuePath = this.maps.legendSettings.valuePath;
        if (!isNullOrUndefined(colorValuePath) && !isNullOrUndefined(dataSource)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            Array.prototype.forEach.call(dataSource, function (data, dataIndex) {
                var showLegend = isNullOrUndefined(_this.maps.legendSettings.showLegendPath) ?
                    true : isNullOrUndefined(data[_this.maps.legendSettings.showLegendPath]) ?
                    false : data[_this.maps.legendSettings.showLegendPath];
                var dataValue = ((colorValuePath.indexOf('.') > -1) ? (getValueFromObject(data, colorValuePath)) :
                    (data[colorValuePath]));
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var newData = [];
                var legendFill = (isNullOrUndefined(fill)) ? dataValue : fill;
                if (!isNullOrUndefined(dataValue) && colorMapping.length === 0 &&
                    (!isNullOrUndefined(valuePath) || !isNullOrUndefined(dataPath))) {
                    legendText = !isNullOrUndefined(data[valuePath]) ? ((valuePath.indexOf('.') > -1) ?
                        getValueFromObject(data, valuePath) : data[valuePath]) : ((dataPath.indexOf('.') > -1) ?
                        getValueFromObject(data, dataPath) : data[dataPath]);
                    newData.push(_this.getLegendData(layerIndex, dataIndex, data, dataPath, layerData, propertyPath, dataValue));
                }
                _this.getOverallLegendItemsCollection(legendText, legendFill, newData, showLegend);
            });
        }
    };
    Legend.prototype.interactiveHandler = function (e) {
        var target = e.target;
        var legend = this.maps.legendSettings;
        var id = this.maps.element.id + '_Interactive_Legend';
        var hoverId = legend.type === 'Layers' ? '_shapeIndex_' : (legend.type === 'Markers') ? '_MarkerIndex_' :
            '_BubbleIndex_';
        if (target.id.indexOf(hoverId) > 1) {
            var layerIndex = parseFloat(target.id.split('_LayerIndex_')[1].split('_')[0]);
            var dataIndex = parseFloat(target.id.split(/_dataIndex_/i)[1].split('_')[0]);
            var fill = void 0;
            var stroke = void 0;
            var strokeWidth = void 0;
            if (!(isNullOrUndefined(querySelector(id, this.maps.element.id)))) {
                remove(querySelector(id, this.maps.element.id));
            }
            var layer = this.maps.layersCollection[layerIndex];
            var markerVisible = (legend.type === 'Layers' ? layer.visible :
                legend.type === 'Markers' ? layer.markerSettings[parseFloat(target.id.split('_MarkerIndex_')[1].split('_')[0])].visible :
                    (this.maps.getBubbleVisible(this.maps.layersCollection[layerIndex])));
            if (legend.visible && this.legendRenderingCollections.length > 0
                && legend.mode === 'Interactive' && markerVisible) {
                var svgRect = this.maps.svgObject.getBoundingClientRect();
                for (var i = 0; i < this.legendCollection.length; i++) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    var currentData = this.legendCollection[i];
                    var legendElement = querySelector(this.maps.element.id + '_Legend_Index_' + i, this.maps.element.id);
                    var legendRect = legendElement.getBoundingClientRect();
                    var rect = new Rect(Math.abs(legendRect.left - svgRect.left), Math.abs(legendRect.top - svgRect.top), legendRect.width, legendRect.height);
                    fill = legendElement.getAttribute('fill');
                    stroke = legend.shapeBorder.color;
                    strokeWidth = legend.shapeBorder.width;
                    if (!isNullOrUndefined(currentData['data'])) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        var data = currentData['data'];
                        var _loop_3 = function (j) {
                            if (dataIndex === data[j]['dataIndex'] && layerIndex === data[j]['layerIndex']) {
                                this_3.renderInteractivePointer(legend, fill, stroke, id, strokeWidth, rect);
                                var arrowElement_1 = querySelector(id, this_3.maps.element.id);
                                if (this_3.maps.isDevice && !(isNullOrUndefined(arrowElement_1))) {
                                    clearTimeout(this_3.arrowTimer);
                                    this_3.arrowTimer = setTimeout(function () {
                                        if (!isNullOrUndefined(arrowElement_1.parentNode)) {
                                            remove(arrowElement_1);
                                        }
                                    }, 2000);
                                }
                                return "break";
                            }
                        };
                        var this_3 = this;
                        for (var j = 0; j < data.length; j++) {
                            var state_1 = _loop_3(j);
                            if (state_1 === "break")
                                break;
                        }
                    }
                }
            }
        }
        else {
            if (!(isNullOrUndefined(querySelector(id, this.maps.element.id)))) {
                remove(querySelector(id, this.maps.element.id));
            }
        }
    };
    Legend.prototype.renderInteractivePointer = function (legend, fill, stroke, id, strokeWidth, rect) {
        var path;
        var locX;
        var locY;
        var height = 10;
        var width = 10;
        var direction = (legend.orientation === 'None') ? (legend.position === 'Top' || legend.position === 'Bottom')
            ? 'Horizontal' : 'Vertical' : legend.orientation;
        rect.y = legend.position === 'Float' && this.maps.isTileMap ? rect.y - this.maps.mapAreaRect.y : rect.y;
        if (direction === 'Horizontal') {
            if (!legend.invertedPointer) {
                locX = rect.x + (rect.width / 2) - (legend.position === 'Float' && this.maps.isTileMap ? this.maps.mapAreaRect.x : 0);
                locY = rect.y;
                path = ' M ' + locX + ' ' + locY + ' L ' + (locX - width) + ' ' + (locY - height) +
                    ' L ' + (locX + width) + ' ' + (locY - height) + ' Z ';
            }
            else {
                locX = rect.x + (rect.width / 2) - (legend.position === 'Float' && this.maps.isTileMap ? this.maps.mapAreaRect.x : 0);
                locY = rect.y + (rect.height);
                path = ' M ' + locX + ' ' + locY + ' L ' + (locX - width) + ' ' + (locY + height) +
                    ' L ' + (locX + width) + ' ' + (locY + height) + ' Z ';
            }
        }
        else {
            if (!legend.invertedPointer) {
                locX = rect.x + rect.width - (legend.position === 'Float' && this.maps.isTileMap ? this.maps.mapAreaRect.x : 0);
                locY = rect.y + (rect.height / 2);
                path = ' M ' + locX + ' ' + locY + ' L ' + (locX + width) + ' ' + (locY - height) +
                    ' L ' + (locX + width) + ' ' + (locY + height) + ' z ';
            }
            else {
                locX = rect.x - (legend.position === 'Float' && this.maps.isTileMap ? this.maps.mapAreaRect.x : 0);
                locY = rect.y + (rect.height / 2);
                path = ' M ' + locX + ' ' + locY + ' L ' + (locX - width) + ' ' + (locY - height) +
                    ' L ' + (locX - width) + ' ' + (locY + height) + ' z ';
            }
        }
        var pathOptions = new PathOption(id, fill, strokeWidth, stroke, 1, 1, '', path);
        if (legend.position === 'Float' && this.maps.isTileMap) {
            this.maps.mapLayerPanel.layerGroup.appendChild(this.maps.renderer.drawPath(pathOptions));
        }
        else {
            this.maps.svgObject.appendChild(this.maps.renderer.drawPath(pathOptions));
        }
    };
    Legend.prototype.wireEvents = function (element) {
        EventHandler.add(element, Browser.touchStartEvent, this.changeNextPage, this);
    };
    Legend.prototype.addEventListener = function () {
        if (this.maps.isDestroyed) {
            return;
        }
        this.maps.on(Browser.touchMoveEvent, this.interactiveHandler, this);
        this.maps.on(Browser.touchEndEvent, this.interactiveHandler, this);
        this.maps.on(click, this.legendClick, this);
    };
    Legend.prototype.markerToggleSelection = function (mapElement, layerIndex, markerIndex, legendIndex) {
        mapElement.setAttribute('fill', this.legendCollection[legendIndex]['fill']);
        mapElement.setAttribute('stroke', this.maps.layers[layerIndex].markerSettings[markerIndex].border.color);
        mapElement.setAttribute('fill-opacity', (this.maps.layers[layerIndex].markerSettings[markerIndex].opacity).toString());
        mapElement.setAttribute('stroke-width', (this.maps.layers[layerIndex].markerSettings[markerIndex].border.width).toString());
        mapElement.setAttribute('stroke-opacity', (isNullOrUndefined(this.maps.layers[layerIndex].markerSettings[markerIndex].border.opacity) ?
            this.maps.layers[layerIndex].markerSettings[markerIndex].opacity :
            this.maps.layers[layerIndex].markerSettings[markerIndex].border.opacity).toString());
        var indexToRemoveSelectedElement = this.maps.toggledElementId.indexOf(mapElement.id);
        if (indexToRemoveSelectedElement !== -1) {
            this.maps.toggledElementId.splice(indexToRemoveSelectedElement, 1);
        }
    };
    Legend.prototype.bubbleToggleSelection = function (mapElement, layerIndex, bubbleIndex, legendIndex) {
        mapElement.setAttribute('fill', this.legendCollection[legendIndex]['fill']);
        mapElement.setAttribute('stroke', this.maps.layers[layerIndex].bubbleSettings[bubbleIndex].border.color);
        mapElement.setAttribute('fill-opacity', (this.maps.layers[layerIndex].bubbleSettings[bubbleIndex].opacity).toString());
        mapElement.setAttribute('stroke-width', (this.maps.layers[layerIndex].bubbleSettings[bubbleIndex].border.width).toString());
        mapElement.setAttribute('stroke-opacity', (isNullOrUndefined(this.maps.layers[layerIndex].bubbleSettings[bubbleIndex].border.opacity) ?
            this.maps.layers[layerIndex].bubbleSettings[bubbleIndex].opacity :
            this.maps.layers[layerIndex].bubbleSettings[bubbleIndex].border.opacity).toString());
    };
    Legend.prototype.legendClick = function (targetEle) {
        var legendShapeId;
        var legendTextId;
        var legendToggleFill = this.maps.legendSettings.toggleLegendSettings.fill;
        var legendToggleOpacity = this.maps.legendSettings.toggleLegendSettings.opacity;
        var legendToggleBorderColor = this.maps.legendSettings.toggleLegendSettings.border.color;
        var legendToggleBorderWidth = this.maps.legendSettings.toggleLegendSettings.border.width;
        var legendToggleBorderOpacity = isNullOrUndefined(this.maps.legendSettings.toggleLegendSettings.border.opacity) ?
            this.maps.legendSettings.toggleLegendSettings.opacity : this.maps.legendSettings.toggleLegendSettings.border.opacity;
        if (!isNullOrUndefined(targetEle.parentNode) && targetEle.parentNode['id'].indexOf(this.maps.element.id + '_Legend_Index_') > -1) {
            var mapElement = void 0;
            var legendIndex = parseFloat(targetEle.parentElement.id.substr((this.maps.element.id + '_Legend_Index_').length));
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var selectedItem = this.legendCollection[legendIndex]['data'];
            var isVisible = selectedItem['_isVisible'];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var shape = void 0;
            if (this.maps.legendSettings.toggleLegendSettings.enable && (this.maps.legendSettings.type === 'Bubbles' || this.maps.legendSettings.type === 'Markers')) {
                for (var k = 0; k < this.maps.layers.length; k++) {
                    for (var j = 0; j < (this.maps.legendSettings.type === 'Bubbles' ? this.maps.layers[k].bubbleSettings.length : this.maps.layers[k].markerSettings.length); j++) {
                        for (var i = 0; i < selectedItem.length; i++) {
                            shape = this.legendCollection[legendIndex]['data'][i];
                            mapElement = this.maps.legendSettings.type === 'Bubbles' ? querySelector(this.maps.element.id + '_LayerIndex_' + shape['layerIndex'] +
                                '_BubbleIndex_' + j + '_dataIndex_' + shape['dataIndex'], this.maps.element.id) : querySelector(this.maps.element.id + '_LayerIndex_' + shape['layerIndex'] +
                                '_MarkerIndex_' + shape['markerIndex'] + '_dataIndex_' + shape['dataIndex'], this.maps.element.id);
                            if (!isNullOrUndefined(shape['shape']) && shape['shape'] === 'Balloon') {
                                mapElement = this.maps.legendSettings.type === 'Bubbles' ? querySelector(this.maps.element.id + '_LayerIndex_' + shape['layerIndex'] +
                                    '_BubbleIndex_' + j + '_dataIndex_' + shape['dataIndex'] + '_Group', this.maps.element.id) : querySelector(this.maps.element.id + '_LayerIndex_' + shape['layerIndex'] +
                                    '_MarkerIndex_' + shape['markerIndex'] + '_dataIndex_' + shape['dataIndex'] + '_Group', this.maps.element.id);
                                mapElement = mapElement.children[0];
                            }
                            var toggledLegendIdIndex = this.maps.toggledLegendId.indexOf(legendIndex);
                            if (isVisible && mapElement !== null) {
                                if (this.maps.legendSettings.toggleLegendSettings.applyShapeSettings) {
                                    mapElement.setAttribute('fill', this.maps.layers[k].shapeSettings.fill);
                                    mapElement.setAttribute('stroke', this.maps.layers[k].shapeSettings.border.color || this.maps.themeStyle.shapeBorderColor);
                                    mapElement.setAttribute('fill-opacity', (this.maps.layers[k].shapeSettings.opacity).toString());
                                    mapElement.setAttribute('stroke-width', (isNullOrUndefined(this.maps.layers[k].shapeSettings.border.width) ? 0 : this.maps.layers[k].shapeSettings.border.width).toString());
                                    mapElement.setAttribute('stroke-opacity', (isNullOrUndefined(this.maps.layers[k].shapeSettings.border.opacity) ?
                                        this.maps.layers[k].shapeSettings.opacity :
                                        this.maps.layers[k].shapeSettings.border.opacity).toString());
                                }
                                else {
                                    mapElement.setAttribute('fill', legendToggleFill);
                                    mapElement.setAttribute('fill-opacity', (legendToggleOpacity).toString());
                                    mapElement.setAttribute('stroke', legendToggleBorderColor);
                                    mapElement.setAttribute('stroke-width', (legendToggleBorderWidth).toString());
                                    mapElement.setAttribute('stroke-opacity', (legendToggleBorderOpacity).toString());
                                }
                                if (this.maps.legendSettings.type === 'Markers') {
                                    if (toggledLegendIdIndex === -1) {
                                        this.maps.toggledLegendId.push(legendIndex);
                                    }
                                    var index = this.maps.toggledElementId.indexOf(mapElement.id);
                                    if (index === -1) {
                                        this.maps.toggledElementId.push(mapElement.id);
                                    }
                                }
                                if (targetEle !== null) {
                                    legendShapeId = querySelector(this.maps.element.id + '_Legend_Shape_Index_' + legendIndex, this.maps.element.id);
                                    legendTextId = querySelector(this.maps.element.id + '_Legend_Text_Index_' + legendIndex, this.maps.element.id);
                                    if (!this.maps.legendSettings.toggleLegendSettings.applyShapeSettings) {
                                        this.setToggleAttributes(legendTextId, legendShapeId, legendToggleFill, legendToggleOpacity, legendToggleBorderColor, legendToggleBorderWidth, legendToggleBorderOpacity, legendToggleFill);
                                    }
                                    else {
                                        this.setToggleAttributes(legendTextId, legendShapeId, this.maps.layers[k].shapeSettings.fill, this.maps.layers[k].shapeSettings.opacity, 
                                        /* eslint-disable-next-line max-len */
                                        this.maps.layers[k].shapeSettings.border.color || this.maps.themeStyle.shapeBorderColor, isNullOrUndefined(this.maps.layers[k].shapeSettings.border.width)
                                            ? 0 : this.maps.layers[k].shapeSettings.border.width, 
                                        /* eslint-disable-next-line max-len */
                                        isNullOrUndefined(this.maps.layers[k].shapeSettings.border.opacity)
                                            ? this.maps.layers[k].shapeSettings.opacity
                                            : this.maps.layers[k].shapeSettings.border.opacity, this.maps.layers[k].shapeSettings.fill);
                                    }
                                }
                            }
                            else {
                                if (this.maps.legendSettings.type === 'Markers') {
                                    if (toggledLegendIdIndex !== -1 && i === 0) {
                                        this.maps.toggledLegendId.splice(toggledLegendIdIndex, 1);
                                    }
                                    this.markerToggleSelection(mapElement, k, j, legendIndex);
                                }
                                else {
                                    this.bubbleToggleSelection(mapElement, k, j, legendIndex);
                                }
                                if (targetEle !== null) {
                                    legendShapeId = querySelector(this.maps.element.id + '_Legend_Shape_Index_' + legendIndex, this.maps.element.id);
                                    legendTextId = querySelector(this.maps.element.id + '_Legend_Text_Index_' + legendIndex, this.maps.element.id);
                                    this.setToggleAttributes(legendTextId, legendShapeId, this.legendCollection[legendIndex]['fill'], this.legendCollection[legendIndex]['opacity'], this.legendCollection[legendIndex]['shapeBorder']['color'], this.legendCollection[legendIndex]['shapeBorder']['width'], this.legendCollection[legendIndex]['shapeBorder']['opacity'], this.maps.legendSettings.textStyle.color);
                                    if (this.maps.legendSettings.shape === 'HorizontalLine' || this.maps.legendSettings.shape === 'VerticalLine' || this.maps.legendSettings.shape === 'Cross') {
                                        legendShapeId.setAttribute('stroke', this.legendCollection[legendIndex]['fill']);
                                    }
                                }
                            }
                        }
                        selectedItem['_isVisible'] = isVisible ? false : true;
                    }
                }
            }
            if (this.maps.legendSettings.type === 'Layers' && this.maps.legendSettings.toggleLegendSettings.enable) {
                var layerElement = void 0;
                this.removeCollections(targetEle, legendIndex);
                var toggledLegendIdIndex = this.maps.toggledLegendId.indexOf(legendIndex);
                if (toggledLegendIdIndex !== -1) {
                    isVisible = false;
                }
                for (var j = 0; j < this.maps.layers.length; j++) {
                    for (var i = 0; i < selectedItem.length; i++) {
                        shape = this.legendCollection[legendIndex]['data'][i];
                        layerElement = querySelector(this.maps.element.id + '_LayerIndex_' + shape['layerIndex'] +
                            '_shapeIndex_' + shape['shapeIndex'] + '_dataIndex_' + shape['dataIndex'], this.maps.element.id);
                        if (layerElement !== null) {
                            var toggledShapeIdIndex = this.maps.toggledElementId.indexOf(layerElement.id);
                            if (isVisible) {
                                if (i === 0) {
                                    this.maps.toggledLegendId.push(legendIndex);
                                }
                                if (toggledShapeIdIndex === -1) {
                                    this.maps.toggledElementId.push(layerElement.id);
                                }
                                if (this.maps.legendSettings.toggleLegendSettings.applyShapeSettings) {
                                    layerElement.setAttribute('fill', this.maps.layers[j].shapeSettings.fill);
                                    layerElement.setAttribute('fill-opacity', (this.maps.layers[j].shapeSettings.opacity).toString());
                                    layerElement.setAttribute('stroke', this.maps.layers[j].shapeSettings.border.color || this.maps.themeStyle.shapeBorderColor);
                                    layerElement.setAttribute('stroke-width', (isNullOrUndefined(this.maps.layers[j].shapeSettings.border.width) ? 0 : this.maps.layers[j].shapeSettings.border.width).toString());
                                    layerElement.setAttribute('stroke-opacity', (isNullOrUndefined(this.maps.layers[j].shapeSettings.border.opacity) ?
                                        this.maps.layers[j].shapeSettings.opacity :
                                        this.maps.layers[j].shapeSettings.border.opacity).toString());
                                }
                                else {
                                    layerElement.setAttribute('fill', legendToggleFill);
                                    layerElement.setAttribute('fill-opacity', (legendToggleOpacity).toString());
                                    layerElement.setAttribute('stroke', legendToggleBorderColor);
                                    layerElement.setAttribute('stroke-width', (legendToggleBorderWidth).toString());
                                    layerElement.setAttribute('stroke-opacity', (legendToggleBorderOpacity).toString());
                                }
                                if (targetEle !== null) {
                                    legendTextId = querySelector(this.maps.element.id + '_Legend_Text_Index_' + legendIndex, this.maps.element.id);
                                    legendShapeId = querySelector(this.maps.element.id + '_Legend_Shape_Index_' + legendIndex, this.maps.element.id);
                                    if (!this.maps.legendSettings.toggleLegendSettings.applyShapeSettings) {
                                        this.setToggleAttributes(legendTextId, legendShapeId, legendToggleFill, legendToggleOpacity, legendToggleBorderColor, legendToggleBorderWidth, legendToggleBorderOpacity, legendToggleFill);
                                    }
                                    else {
                                        this.setToggleAttributes(legendTextId, legendShapeId, this.maps.layers[j].shapeSettings.fill, this.maps.layers[j].shapeSettings.opacity, 
                                        /* eslint-disable-next-line max-len */
                                        this.maps.layers[j].shapeSettings.border.color || this.maps.themeStyle.shapeBorderColor, isNullOrUndefined(this.maps.layers[j].shapeSettings.border.width)
                                            ? 0 : this.maps.layers[j].shapeSettings.border.width, 
                                        /* eslint-disable-next-line max-len */
                                        isNullOrUndefined(this.maps.layers[j].shapeSettings.border.opacity)
                                            ? this.maps.layers[j].shapeSettings.opacity
                                            : this.maps.layers[j].shapeSettings.border.opacity, this.maps.layers[j].shapeSettings.fill);
                                    }
                                }
                            }
                            else {
                                if (toggledLegendIdIndex !== -1 && i === 0) {
                                    this.maps.toggledLegendId.splice(toggledLegendIdIndex, 1);
                                }
                                if (toggledShapeIdIndex !== -1) {
                                    this.maps.toggledElementId.splice(toggledShapeIdIndex, 1);
                                }
                                layerElement.setAttribute('fill', this.legendCollection[legendIndex]['fill']);
                                layerElement.setAttribute('stroke-opacity', (isNullOrUndefined(this.maps.layers[j].shapeSettings.border.opacity) ?
                                    this.maps.layers[j].shapeSettings.opacity :
                                    this.maps.layers[j].shapeSettings.border.opacity).toString());
                                layerElement.setAttribute('stroke-width', (isNullOrUndefined(this.maps.layers[j].shapeSettings.border.width) ? 0 : this.maps.layers[j].shapeSettings.border.width).toString());
                                layerElement.setAttribute('fill-opacity', (this.maps.layers[j].shapeSettings.opacity).toString());
                                layerElement.setAttribute('stroke', this.maps.layers[j].shapeSettings.border.color || this.maps.themeStyle.shapeBorderColor);
                                if (targetEle !== null) {
                                    legendTextId = querySelector(this.maps.element.id + '_Legend_Text_Index_' + legendIndex, this.maps.element.id);
                                    legendShapeId = querySelector(this.maps.element.id + '_Legend_Shape_Index_' + legendIndex, this.maps.element.id);
                                    this.setToggleAttributes(legendTextId, legendShapeId, this.legendCollection[legendIndex]['fill'], this.legendCollection[legendIndex]['opacity'], this.legendCollection[legendIndex]['shapeBorder']['color'], this.legendCollection[legendIndex]['shapeBorder']['width'], this.legendCollection[legendIndex]['shapeBorder']['opacity'], '#757575');
                                }
                            }
                        }
                    }
                }
                selectedItem['_isVisible'] = isVisible ? false : true;
            }
        }
        else if (!isNullOrUndefined(targetEle.id) && (targetEle.id.indexOf(this.maps.element.id + '_Legend_Shape_Index') > -1 ||
            targetEle.id.indexOf(this.maps.element.id + '_Legend_Index') !== -1) && this.maps.legendSettings.visible &&
            targetEle.id.indexOf('_Text') === -1) {
            var LegendInteractive = void 0;
            var legendIndex = parseFloat(targetEle.id.split(this.maps.element.id + '_Legend_Index_')[1]);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var mapdata = void 0;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var selectedItem = this.legendCollection[legendIndex]['data'];
            var isVisible = selectedItem['_isVisible'];
            if ((this.maps.legendSettings.type === 'Bubbles' || this.maps.legendSettings.type === 'Markers') && this.maps.legendSettings.toggleLegendSettings.enable) {
                var toggledLegendIdIndex = this.maps.toggledLegendId.indexOf(legendIndex);
                for (var k = 0; k < this.maps.layers.length; k++) {
                    for (var j = 0; j < (this.maps.legendSettings.type === 'Bubbles' ? this.maps.layers[k].bubbleSettings.length : this.maps.layers[k].markerSettings.length); j++) {
                        for (var i = 0; i < selectedItem.length; i++) {
                            mapdata = this.legendCollection[legendIndex]['data'][i];
                            LegendInteractive = this.maps.legendSettings.type === 'Bubbles' ? querySelector(this.maps.element.id + '_LayerIndex_' + mapdata['layerIndex'] +
                                '_BubbleIndex_' + j + '_dataIndex_' + mapdata['dataIndex'], this.maps.element.id) : querySelector(this.maps.element.id + '_LayerIndex_' + mapdata['layerIndex'] +
                                '_MarkerIndex_' + j + '_dataIndex_' + mapdata['dataIndex'], this.maps.element.id);
                            if (!isNullOrUndefined(mapdata['shape']) && mapdata['shape'] === 'Balloon') {
                                LegendInteractive = this.maps.legendSettings.type === 'Bubbles' ? querySelector(this.maps.element.id + '_LayerIndex_' + mapdata['layerIndex'] +
                                    '_BubbleIndex_' + j + '_dataIndex_' + mapdata['dataIndex'] + '_Group', this.maps.element.id) : querySelector(this.maps.element.id + '_LayerIndex_' + mapdata['layerIndex'] +
                                    '_MarkerIndex_' + j + '_dataIndex_' + mapdata['dataIndex'] + '_Group', this.maps.element.id);
                                LegendInteractive = LegendInteractive.children[0];
                            }
                            if (isVisible && LegendInteractive !== null) {
                                if (this.maps.legendSettings.type === 'Markers') {
                                    if (toggledLegendIdIndex === -1) {
                                        this.maps.toggledLegendId.push(legendIndex);
                                    }
                                    var index = this.maps.toggledElementId.indexOf(LegendInteractive.id);
                                    if (index === -1) {
                                        this.maps.toggledElementId.push(LegendInteractive.id);
                                    }
                                }
                                if (this.maps.legendSettings.toggleLegendSettings.applyShapeSettings) {
                                    LegendInteractive.setAttribute('fill', this.maps.layers[k].shapeSettings.fill);
                                    LegendInteractive.setAttribute('stroke', this.maps.layers[k].shapeSettings.border.color || this.maps.themeStyle.shapeBorderColor);
                                    LegendInteractive.setAttribute('stroke-width', (isNullOrUndefined(this.maps.layers[k].shapeSettings.border.width) ? 0 : this.maps.layers[k].shapeSettings.border.width).toString());
                                    LegendInteractive.setAttribute('stroke-opacity', (isNullOrUndefined(this.maps.layers[k].shapeSettings.border.opacity) ?
                                        this.maps.layers[k].shapeSettings.opacity :
                                        this.maps.layers[k].shapeSettings.border.opacity).toString());
                                    LegendInteractive.setAttribute('fill-opacity', (this.maps.layers[k].shapeSettings.opacity).toString());
                                }
                                else {
                                    LegendInteractive.setAttribute('fill', legendToggleFill);
                                    LegendInteractive.setAttribute('fill-opacity', (legendToggleOpacity).toString());
                                    LegendInteractive.setAttribute('stroke', legendToggleBorderColor);
                                    LegendInteractive.setAttribute('stroke-width', (legendToggleBorderWidth).toString());
                                    LegendInteractive.setAttribute('stroke-opacity', (legendToggleBorderOpacity).toString());
                                }
                                if (targetEle !== null) {
                                    legendTextId = querySelector(this.maps.element.id + '_Legend_Index_' + legendIndex + '_Text', this.maps.element.id);
                                    legendShapeId = querySelector(this.maps.element.id + '_Legend_Index_' + legendIndex, this.maps.element.id);
                                    if (!this.maps.legendSettings.toggleLegendSettings.applyShapeSettings) {
                                        this.setToggleAttributes(legendTextId, legendShapeId, legendToggleFill, legendToggleOpacity, legendToggleBorderColor, legendToggleBorderWidth, legendToggleBorderOpacity, legendToggleFill);
                                    }
                                    else {
                                        this.setToggleAttributes(legendTextId, legendShapeId, this.maps.layers[k].shapeSettings.fill, this.maps.layers[k].shapeSettings.opacity, 
                                        /* eslint-disable-next-line max-len */
                                        this.maps.layers[k].shapeSettings.border.color || this.maps.themeStyle.shapeBorderColor, 
                                        /* eslint-disable-next-line max-len */
                                        (isNullOrUndefined(this.maps.layers[k].shapeSettings.border.width)
                                            ? 0
                                            : this.maps.layers[k].shapeSettings.border.width), 
                                        /* eslint-disable-next-line max-len */
                                        (isNullOrUndefined(this.maps.layers[k].shapeSettings.border.opacity)
                                            ? this.maps.layers[k].shapeSettings.opacity
                                            : this.maps.layers[k].shapeSettings.border.opacity), this.maps.layers[k].shapeSettings.fill);
                                    }
                                }
                            }
                            else {
                                if (this.maps.legendSettings.type === 'Markers') {
                                    if (toggledLegendIdIndex !== -1 && i === 0) {
                                        this.maps.toggledLegendId.splice(toggledLegendIdIndex, 1);
                                    }
                                    this.markerToggleSelection(LegendInteractive, k, j, legendIndex);
                                }
                                else {
                                    this.bubbleToggleSelection(LegendInteractive, k, j, legendIndex);
                                }
                                if (targetEle !== null) {
                                    legendShapeId = querySelector(this.maps.element.id + '_Legend_Index_' + legendIndex, this.maps.element.id);
                                    legendShapeId.setAttribute('fill', this.legendCollection[legendIndex]['fill']);
                                    legendShapeId.setAttribute('fill-opacity', this.legendCollection[legendIndex]['opacity']);
                                    legendShapeId.setAttribute('stroke', this.legendCollection[legendIndex]['shapeBorder']['color']);
                                    legendShapeId.setAttribute('stroke-width', this.legendCollection[legendIndex]['shapeBorder']['width']);
                                    legendShapeId.setAttribute('stroke-opacity', this.legendCollection[legendIndex]['shapeBorder']['opacity']);
                                    legendTextId = querySelector(this.maps.element.id + '_Legend_Index_' + legendIndex + '_Text', this.maps.element.id);
                                    legendTextId.setAttribute('fill', this.maps.legendSettings.textStyle.color);
                                }
                            }
                        }
                        selectedItem['_isVisible'] = isVisible ? false : true;
                    }
                }
            }
            if (this.maps.legendSettings.type === 'Layers' && this.maps.legendSettings.toggleLegendSettings.enable) {
                var mapLegendElement = void 0;
                this.removeCollections(targetEle, legendIndex);
                var toggleLegendIdIndex = this.maps.toggledLegendId.indexOf(legendIndex);
                if (toggleLegendIdIndex !== -1) {
                    isVisible = false;
                }
                for (var k = 0; k < this.maps.layers.length; k++) {
                    for (var i = 0; i < selectedItem.length; i++) {
                        mapdata = this.legendCollection[legendIndex]['data'][i];
                        mapLegendElement = querySelector(this.maps.element.id + '_LayerIndex_' + mapdata['layerIndex'] +
                            '_shapeIndex_' + mapdata['shapeIndex'] + '_dataIndex_' + mapdata['dataIndex'], this.maps.element.id);
                        if (mapLegendElement !== null) {
                            var toggledShapeIdIndex = this.maps.toggledElementId.indexOf(mapLegendElement.id);
                            if (isVisible) {
                                if (i === 0) {
                                    this.maps.toggledLegendId.push(legendIndex);
                                }
                                if (toggledShapeIdIndex === -1) {
                                    this.maps.toggledElementId.push(mapLegendElement.id);
                                }
                                if (this.maps.legendSettings.toggleLegendSettings.applyShapeSettings) {
                                    mapLegendElement.setAttribute('fill', this.maps.layers[0].shapeSettings.fill);
                                    mapLegendElement.setAttribute('stroke', this.maps.layers[0].shapeSettings.border.color || this.maps.themeStyle.shapeBorderColor);
                                    mapLegendElement.setAttribute('fill-opacity', (this.maps.layers[k].shapeSettings.opacity).toString());
                                    mapLegendElement.setAttribute('stroke-width', (isNullOrUndefined(this.maps.layers[k].shapeSettings.border.width) ? 0 : this.maps.layers[k].shapeSettings.border.width).toString());
                                    mapLegendElement.setAttribute('stroke-opacity', (isNullOrUndefined(this.maps.layers[k].shapeSettings.border.opacity) ?
                                        this.maps.layers[k].shapeSettings.opacity :
                                        this.maps.layers[k].shapeSettings.border.opacity).toString());
                                }
                                else {
                                    mapLegendElement.setAttribute('fill', legendToggleFill);
                                    mapLegendElement.setAttribute('fill-opacity', (legendToggleOpacity).toString());
                                    mapLegendElement.setAttribute('stroke', legendToggleBorderColor);
                                    mapLegendElement.setAttribute('stroke-width', (legendToggleBorderWidth).toString());
                                    mapLegendElement.setAttribute('stroke-opacity', (legendToggleBorderOpacity).toString());
                                }
                                if (targetEle !== null) {
                                    legendShapeId = querySelector(this.maps.element.id + '_Legend_Index_' + legendIndex, this.maps.element.id);
                                    legendTextId = querySelector(this.maps.element.id + '_Legend_Index_' + legendIndex + '_Text', this.maps.element.id);
                                    if (!this.maps.legendSettings.toggleLegendSettings.applyShapeSettings) {
                                        this.setToggleAttributes(legendTextId, legendShapeId, legendToggleFill, legendToggleOpacity, legendToggleBorderColor, legendToggleBorderWidth, legendToggleBorderOpacity, legendToggleFill);
                                    }
                                    else {
                                        this.setToggleAttributes(legendTextId, legendShapeId, this.maps.layers[0].shapeSettings.fill, this.maps.layers[k].shapeSettings.opacity, 
                                        /* eslint-disable-next-line max-len */
                                        this.maps.layers[0].shapeSettings.border.color || this.maps.themeStyle.shapeBorderColor, isNullOrUndefined(this.maps.layers[k].shapeSettings.border.width)
                                            ? 0
                                            : this.maps.layers[k].shapeSettings.border.width, 
                                        /* eslint-disable-next-line max-len */
                                        isNullOrUndefined(this.maps.layers[k].shapeSettings.border.opacity)
                                            ? this.maps.layers[k].shapeSettings.opacity
                                            : this.maps.layers[k].shapeSettings.border.opacity, this.maps.layers[0].shapeSettings.fill);
                                    }
                                }
                            }
                            else {
                                if (toggleLegendIdIndex !== -1 && i === 0) {
                                    this.maps.toggledLegendId.splice(toggleLegendIdIndex, 1);
                                }
                                if (toggledShapeIdIndex !== -1) {
                                    this.maps.toggledElementId.splice(toggledShapeIdIndex, 1);
                                }
                                mapLegendElement.setAttribute('fill-opacity', (this.maps.layers[k].shapeSettings.opacity).toString());
                                mapLegendElement.setAttribute('stroke-width', (isNullOrUndefined(this.maps.layers[k].shapeSettings.border.width) ? 0 :
                                    this.maps.layers[k].shapeSettings.border.width).toString());
                                mapLegendElement.setAttribute('stroke', this.maps.layers[0].shapeSettings.border.color || this.maps.themeStyle.shapeBorderColor);
                                mapLegendElement.setAttribute('stroke-opacity', (isNullOrUndefined(this.maps.layers[k].shapeSettings.border.opacity) ?
                                    this.maps.layers[k].shapeSettings.opacity :
                                    this.maps.layers[k].shapeSettings.border.opacity).toString());
                                mapLegendElement.setAttribute('fill', this.legendCollection[legendIndex]['fill']);
                                if (targetEle !== null) {
                                    legendTextId = querySelector(this.maps.element.id + '_Legend_Index_' + legendIndex + '_Text', this.maps.element.id);
                                    legendShapeId = querySelector(this.maps.element.id + '_Legend_Index_' + legendIndex, this.maps.element.id);
                                    this.setToggleAttributes(legendTextId, legendShapeId, this.legendCollection[legendIndex]['fill'], this.legendCollection[legendIndex]['opacity'], this.legendCollection[legendIndex]['shapeBorder']['color'], this.legendCollection[legendIndex]['shapeBorder']['width'], this.legendCollection[legendIndex]['shapeBorder']['opacity'], '#757575');
                                }
                            }
                        }
                    }
                }
                selectedItem['_isVisible'] = isVisible ? false : true;
            }
        }
    };
    Legend.prototype.removeCollections = function (targetEle, legendIndex) {
        this.removeLegendSelectionCollection(targetEle);
        var legendSelectionIndex = this.getIndexofLegend(this.maps.legendSelectionCollection, targetEle);
        if (legendSelectionIndex !== -1) {
            this.maps.legendSelectionCollection.splice(legendSelectionIndex, 1);
        }
        var legendHighlightIndex = this.getIndexofLegend(this.legendHighlightCollection, targetEle);
        if (legendHighlightIndex !== -1) {
            this.legendHighlightCollection.splice(legendSelectionIndex, 1);
        }
        var shapeHighlightIndex = this.getIndexofLegend(this.shapeHighlightCollection, targetEle);
        if (shapeHighlightIndex !== -1) {
            this.shapeHighlightCollection.splice(shapeHighlightIndex, 1);
        }
        var selectedIndex = this.maps.selectedLegendElementId.indexOf(legendIndex);
        if (selectedIndex !== -1) {
            this.maps.selectedLegendElementId.splice(selectedIndex, 1);
        }
    };
    Legend.prototype.removeEventListener = function () {
        if (this.maps.isDestroyed) {
            return;
        }
        this.maps.off(Browser.touchMoveEvent, this.interactiveHandler);
        this.maps.off(Browser.touchEndEvent, this.interactiveHandler);
        this.maps.off(click, this.legendClick);
        var pagingElement = document.getElementById(this.maps.element.id + '_Legend_Paging_Group');
        if (pagingElement) {
            for (var i = 0; i < pagingElement.childElementCount; i++) {
                EventHandler.remove(pagingElement.childNodes[i], Browser.touchStartEvent, this.changeNextPage);
            }
        }
    };
    Legend.prototype.getLegendData = function (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    layerIndex, dataIndex, data, dataPath, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    layerData, shapePropertyPath, value
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var legendData = [];
        if (Object.prototype.toString.call(layerData) === '[object Array]') {
            for (var i = 0; i < layerData.length; i++) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var shapeData = layerData[i];
                var dataPathValue = (dataPath.indexOf('.') > -1) ? getValueFromObject(data, dataPath) : data[dataPath];
                var shapePath = checkPropertyPath(data[dataPath], shapePropertyPath, shapeData['properties']);
                var dataPathValueCase = !isNullOrUndefined(dataPathValue) &&
                    typeof dataPathValue === 'string' ? dataPathValue.toLowerCase() : dataPathValue;
                var shapeDataValueCase = !isNullOrUndefined(shapeData['properties'][shapePath])
                    && isNaN(shapeData['properties'][shapePath]) ?
                    shapeData['properties'][shapePath].toLowerCase() : shapeData['properties'][shapePath];
                if (shapeDataValueCase === dataPathValueCase) {
                    if (shapeData['geometry']['type'] !== 'MultiPoint') {
                        legendData.push({
                            layerIndex: layerIndex, shapeIndex: i, dataIndex: dataIndex,
                            name: data[dataPath], value: value, pointIndex: -1
                        });
                    }
                    else {
                        for (var j = 0; j < shapeData['geometry'].coordinates.length; j++) {
                            legendData.push({
                                layerIndex: layerIndex, shapeIndex: i, dataIndex: dataIndex,
                                name: data[dataPath], value: value, pointIndex: j
                            });
                        }
                    }
                }
            }
        }
        return legendData;
    };
    Legend.prototype.setToggleAttributes = function (textElement, shapeElement, fillColor, fillOpacity, borderColor, borderWidth, borderOpacity, textColor) {
        textElement.setAttribute('fill', textColor);
        shapeElement.setAttribute('fill', fillColor);
        shapeElement.setAttribute('fill-opacity', (fillOpacity).toString());
        shapeElement.setAttribute('stroke', borderColor);
        shapeElement.setAttribute('stroke-width', (borderWidth).toString());
        if (!isNullOrUndefined(borderOpacity)) {
            shapeElement.setAttribute('stroke-opacity', (borderOpacity).toString());
        }
    };
    Legend.prototype.legendGradientColor = function (colorMap, legendIndex) {
        var legendFillColor;
        var xmlns = 'http://www.w3.org/2000/svg';
        if (!isNullOrUndefined(colorMap.color) && typeof (colorMap.color) === 'object') {
            var linerGradientEle = document.createElementNS(xmlns, 'linearGradient');
            var opacity = 1;
            var position = this.maps.legendSettings.position;
            var x2 = position === 'Top' || position === 'Bottom' ? '100' : '0';
            var y2 = position === 'Top' || position === 'Bottom' ? '0' : '100';
            linerGradientEle.setAttribute('id', 'linear_' + legendIndex + '_' + this.maps.element.id);
            linerGradientEle.setAttribute('x1', 0 + '%');
            linerGradientEle.setAttribute('y1', 0 + '%');
            linerGradientEle.setAttribute('x2', x2 + '%');
            linerGradientEle.setAttribute('y2', y2 + '%');
            for (var b = 0; b < colorMap.color.length; b++) {
                var offsetColor = 100 / (colorMap.color.length - 1);
                var stopEle = document.createElementNS(xmlns, 'stop');
                stopEle.setAttribute('offset', b * offsetColor + '%');
                stopEle.setAttribute('stop-color', colorMap.color[b]);
                stopEle.setAttribute('stop-opacity', opacity.toString());
                linerGradientEle.appendChild(stopEle);
            }
            this.legendLinearGradient = linerGradientEle;
            var color = 'url(' + '#linear_' + legendIndex + '_' + this.maps.element.id + ')';
            this.defsElement.appendChild(linerGradientEle);
            legendFillColor = color;
        }
        return legendFillColor;
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name
     */
    Legend.prototype.getModuleName = function () {
        return 'Legend';
    };
    /**
     * To destroy the legend.
     *
     * @returns {void}
     * @private
     */
    Legend.prototype.destroy = function () {
        this.legendCollection = [];
        this.legendRenderingCollections = [];
        this.translate = null;
        this.legendBorderRect = null;
        this.initialMapAreaRect = null;
        this.legendTotalRect = null;
        this.totalPages = [];
        this.legendItemRect = null;
        this.legendGroup = null;
        this.shapeHighlightCollection = [];
        this.legendHighlightCollection = [];
        this.shapePreviousColor = [];
        this.selectedNonLegendShapes = [];
        this.legendLinearGradient = null;
        this.currentLayer = null;
        this.defsElement = null;
        this.legendElement = [];
        this.oldShapeElement = null;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (!this.maps.refreshing) {
            this.maps = null;
        }
    };
    return Legend;
}());
export { Legend };
