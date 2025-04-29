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
/**
 * AccumulationChart DataLabel module file
 */
import { extend, createElement, getValue, isNullOrUndefined, animationMode } from '@syncfusion/ej2-base';
import { Rect, Size, PathOption, measureText, TextOption } from '@syncfusion/ej2-svg-base';
import { ChartLocation, degreeToLocation, isOverlap, stringToNumber, getAngle, appendChildElement } from '../../common/utils/helper';
import { textTrim, subtractThickness, Thickness, getElement } from '../../common/utils/helper';
import { removeElement, RectOption, textElement, showTooltip } from '../../common/utils/helper';
import { colorNameToHex, convertHexToColor, containsRect, textWrap, CircleOption } from '../../common/utils/helper';
import { getSeriesFromIndex } from '../model/acc-base';
import { textRender } from '../../common/model/constants';
import { getFontStyle, createTemplate, measureElementRect, templateAnimate } from '../../common/utils/helper';
import { AccumulationBase } from './accumulation-base';
/**
 * The `AccumulationDataLabel` module is used to render data labels for the Accumulation chart.
 */
var AccumulationDataLabel = /** @class */ (function (_super) {
    __extends(AccumulationDataLabel, _super);
    function AccumulationDataLabel(accumulation) {
        var _this = _super.call(this, accumulation) || this;
        _this.rightSideRenderingPoints = [];
        _this.leftSideRenderingPoints = [];
        _this.id = accumulation.element.id + '_datalabel_Series_';
        return _this;
    }
    /**
     * Method to get datalabel text location.
     *
     * @private
     * @param {AccPoints} point - The data point for which to calculate the label text location.
     * @param {AccumulationDataLabelSettingsModel} dataLabel - The data label settings for the series.
     * @param {Size} textSize - The size of the text to be displayed.
     * @param {AccPoints[]} points - The array of data points in the series.
     * @returns {void}
     */
    AccumulationDataLabel.prototype.getDataLabelPosition = function (point, dataLabel, textSize, points) {
        var radius = this.isCircular() ? (!this.isVariousRadius() ? this.accumulation.pieSeriesModule.labelRadius :
            this.accumulation.pieSeriesModule.getLabelRadius(this.accumulation.visibleSeries[0], point)) :
            this.getLabelDistance(point, dataLabel);
        //let radius: number = this.isCircular() ? this.labelRadius : this.getLabelDistance(point, dataLabel);
        if (this.accumulation.title) {
            var titleSize = measureText(this.accumulation.title, this.accumulation.titleStyle, this.accumulation.themeStyle.datalabelFont);
            this.titleRect = new Rect(this.accumulation.availableSize.width / 2 - titleSize.width / 2, this.accumulation.margin.top, titleSize.width, titleSize.height);
        }
        this.getLabelRegion(point, dataLabel.position, textSize, radius, this.marginValue);
        point.labelAngle = point.midAngle;
        point.labelPosition = dataLabel.position;
        if (this.accumulation.enableSmartLabels) {
            this.getSmartLabel(point, dataLabel, textSize, points);
        }
    };
    /**
     * Method to get datalabel bound.
     */
    AccumulationDataLabel.prototype.getLabelRegion = function (point, position, textSize, labelRadius, margin, endAngle) {
        if (endAngle === void 0) { endAngle = 0; }
        var labelAngle = endAngle || point.midAngle;
        var space = 20;
        var location = degreeToLocation(labelAngle, labelRadius, this.isCircular() ? this.center :
            this.getLabelLocation(point, position));
        location.y = (position === 'Inside') ? (location.y - textSize.height / 2) : location.y;
        location.x = (position === 'Inside') ? (location.x - textSize.width / 2) : location.x;
        point.labelRegion = new Rect(location.x, location.y, textSize.width + (margin * 2), textSize.height + (margin * 2));
        if (position === 'Outside') {
            point.labelRegion.y -= point.labelRegion.height / 2;
            if (labelAngle >= 90 && labelAngle <= 270) {
                point.labelRegion.x -= (point.labelRegion.width + space);
            }
            else {
                point.labelRegion.x += space;
            }
        }
    };
    /**
     * Method to get data label collection.
     *
     * @param {AccPoints} point - The data point for which to calculate the label collection.
     * @param {AccumulationDataLabelSettingsModel} dataLabel - The data label settings for the series.
     * @returns {void}
     * @private
     */
    AccumulationDataLabel.prototype.calculateLabelCollection = function (point, dataLabel) {
        if (point.argsData.template !== null) {
            return null;
        }
        var position = point.labelPosition || dataLabel.position;
        var labelRadius = this.isCircular() ? (!this.isVariousRadius() ? this.accumulation.pieSeriesModule.labelRadius :
            this.accumulation.pieSeriesModule.getLabelRadius(this.accumulation.visibleSeries[0], point)) :
            this.getLabelDistance(point, dataLabel);
        var radius = (!this.isVariousRadius() ?
            (this.accumulation.pieSeriesModule.radius - this.accumulation.pieSeriesModule.innerRadius) :
            this.accumulation.pieSeriesModule.getLabelRadius(this.accumulation.visibleSeries[0], point));
        var location = degreeToLocation(point.midAngle, labelRadius, this.isCircular() ? this.center :
            this.getLabelLocation(point, position));
        var padding = 20;
        var maxWidth = dataLabel.maxWidth;
        if (!maxWidth) {
            if (position === 'Outside') {
                maxWidth = this.isCircular() ? (location.x >= this.center.x) ? (this.areaRect.x + this.areaRect.width - location.x) :
                    (location.x - this.areaRect.x) : (location.x >= point.region.x) ?
                    (this.areaRect.x + this.areaRect.width - location.x) : (location.x - this.areaRect.x);
            }
            else {
                maxWidth = this.isCircular() ? (radius - padding) : point.region.width;
            }
        }
        if ((point.label.indexOf('<br>') !== -1)) {
            point.labelCollection = point.label.split('<br>');
        }
        else if (dataLabel.textWrap === 'Normal' && dataLabel.textOverflow === 'Ellipsis') {
            point.labelCollection[0] = textTrim(maxWidth, point.label, point.argsData.font, this.accumulation.enableRtl, this.accumulation.themeStyle.datalabelFont);
        }
        else if (dataLabel.textWrap === 'Wrap' || dataLabel.textWrap === 'AnyWhere') {
            point.labelCollection = textWrap(point.label, maxWidth, point.argsData.font, this.accumulation.enableRtl, dataLabel.textWrap === 'AnyWhere', dataLabel.textOverflow === 'Clip', this.accumulation.themeStyle.datalabelFont);
        }
        else {
            point.labelCollection[0] = point.label;
        }
    };
    /**
     * To calculate label collection text size.
     *
     * @param {string[]} labelCollection - The collection of label texts.
     * @param {AccumulationDataLabelSettingsModel} dataLabel - The data label settings for the series.
     * @returns {Size} - The size of the label text collection.
     * @private
     */
    AccumulationDataLabel.prototype.getTextSize = function (labelCollection, dataLabel) {
        var height = 0;
        var font = dataLabel.font;
        var width = dataLabel.maxWidth ? dataLabel.maxWidth : 0;
        var textSize;
        for (var i = 0; i < labelCollection.length; i++) {
            textSize = measureText(labelCollection[i], font, this.accumulation.themeStyle.datalabelFont);
            width = Math.max(textSize.width, width);
            height += textSize.height;
        }
        if (dataLabel.textOverflow === 'Clip' && dataLabel.textWrap !== 'Normal' && dataLabel.maxWidth) {
            width = dataLabel.maxWidth;
        }
        return (new Size(width, height));
    };
    /**
     * Method to get datalabel smart position.
     *
     * @param {AccPoints} point - The data point for which to calculate the label smart position.
     * @param {AccumulationDataLabelSettingsModel} dataLabel - The data label settings for the series.
     * @param {Size} textSize - The size of the text.
     * @param {AccPoints[]} points - The collection of data points.
     * @returns {void}
     */
    AccumulationDataLabel.prototype.getSmartLabel = function (point, dataLabel, textSize, points) {
        var circular = this.isCircular();
        var labelRadius = circular ? this.radius : this.getLabelDistance(point, dataLabel);
        var connectorLength = circular ? (dataLabel.connectorStyle.length || '4%') :
            '0px';
        labelRadius += stringToNumber(connectorLength, labelRadius);
        var previousPoint = this.findPreviousPoint(points, point.index, point.labelPosition);
        if (dataLabel.position === 'Inside') {
            // `4` is padding adding to height and width of label region.
            point.labelRegion.height -= 4;
            point.labelRegion.width -= 4;
            if (previousPoint && previousPoint.labelRegion && !dataLabel.enableRotation &&
                (isOverlap(point.labelRegion, previousPoint.labelRegion)
                    || this.isOverlapping(point, points)) || !circular && !containsRect(point.region, point.labelRegion)) {
                point.labelPosition = 'Outside';
                if (!circular) {
                    labelRadius = this.getLabelDistance(point, dataLabel);
                }
                this.calculateLabelCollection(point, dataLabel);
                textSize = this.getTextSize(point.labelCollection, dataLabel);
                textSize.height += 4; // 4 for calculation with padding for smart label shape
                textSize.width += 4;
                this.getLabelRegion(point, point.labelPosition, textSize, labelRadius, this.marginValue);
                previousPoint = this.findPreviousPoint(points, point.index, point.labelPosition);
                if (previousPoint && (isOverlap(point.labelRegion, previousPoint.labelRegion) ||
                    this.isConnectorLineOverlapping(point, previousPoint))) {
                    this.setOuterSmartLabel(previousPoint, point, dataLabel.border.width, labelRadius, textSize, this.marginValue);
                }
            }
        }
        else {
            if (previousPoint && previousPoint.labelRegion && (isOverlap(point.labelRegion, previousPoint.labelRegion)
                || this.isOverlapping(point, points) || this.isConnectorLineOverlapping(point, previousPoint))) {
                this.setOuterSmartLabel(previousPoint, point, dataLabel.border.width, labelRadius, textSize, this.marginValue);
            }
        }
        if (this.isOverlapping(point, points) && (this.accumulation.type === 'Pyramid' || this.accumulation.type === 'Funnel')) {
            var position = 'OutsideLeft';
            var space = 20;
            var labelAngle = point.midAngle || 0;
            var labelRadius_1 = circular ? this.radius : this.getLabelDistance(point, dataLabel);
            var location_1 = degreeToLocation(labelAngle, -labelRadius_1, this.isCircular() ? this.center :
                this.getLabelLocation(point, position));
            point.labelRegion = new Rect(location_1.x, location_1.y, textSize.width + (this.marginValue * 2), textSize.height + (this.marginValue * 2));
            point.labelRegion.y -= point.labelRegion.height / 2;
            point.labelRegion.x = point.labelRegion.x - space - point.labelRegion.width;
            if (previousPoint && previousPoint.labelRegion && (isOverlap(point.labelRegion, previousPoint.labelRegion)
                || this.isOverlapping(point, points) || this.isConnectorLineOverlapping(point, previousPoint))) {
                this.setOuterSmartLabel(previousPoint, point, dataLabel.border.width, labelRadius_1, textSize, this.marginValue);
            }
        }
    };
    /**
     * To find trimmed datalabel tooltip needed.
     *
     * @param {Event} e - The move event.
     * @param {number} x - The x-coordinate.
     * @param {number} y - The y-coordinate.
     * @param {boolean} isTouch - Indicates if the interaction is touch-based.
     * @returns {void}
     * @private
     */
    AccumulationDataLabel.prototype.move = function (e, x, y, isTouch) {
        var _this = this;
        if (e.target.textContent.indexOf('...') > -1) {
            var targetId = e.target.id.split(this.id);
            if (targetId.length === 2) {
                var seriesIndex = parseInt(targetId[1].split('_text_')[0], 10);
                var pointIndex = parseInt(targetId[1].split('_text_')[1], 10);
                if (!isNaN(seriesIndex) && !isNaN(pointIndex)) {
                    if (isTouch) {
                        removeElement(this.accumulation.element.id + '_EJ2_Datalabel_Tooltip');
                    }
                    var point = getSeriesFromIndex(seriesIndex, (this.accumulation).visibleSeries).points[pointIndex];
                    showTooltip(point.text || point.y.toString(), x, y, this.areaRect.width, this.accumulation.element.id + '_EJ2_Datalabel_Tooltip', getElement(this.accumulation.element.id + '_Secondary_Element'), null, null, this.accumulation.initialClipRect);
                }
            }
        }
        else {
            removeElement(this.accumulation.element.id + '_EJ2_Datalabel_Tooltip');
        }
        if (isTouch) {
            clearTimeout(this.clearTooltip);
            this.clearTooltip = +setTimeout(function () { removeElement(_this.accumulation.element.id + '_EJ2_Datalabel_Tooltip'); }, 1000);
        }
    };
    /**
     * To find previous valid label point.
     *
     * @param {AccPoints[]} points - The array of accumulation points.
     * @param {number} index - The index of the current point.
     * @param {AccumulationLabelPosition} position - The position of the label.
     * @returns {AccPoints} - Find the previous value of accumulation point.
     */
    AccumulationDataLabel.prototype.findPreviousPoint = function (points, index, position) {
        var point = points[0];
        for (var i = index - 1; i >= 0; i--) {
            point = points[i];
            if (point.visible && point.labelVisible && point.labelRegion && point.labelPosition === position) {
                return point;
            }
        }
        return null;
    };
    /**
     * To find current point datalabel is overlapping with other points.
     *
     * @param {AccPoints} currentPoint - The current point.
     * @param {AccPoints[]} points - The array of accumulation points.
     * @returns {boolean} - It returns boolean value of overlapping.
     */
    AccumulationDataLabel.prototype.isOverlapping = function (currentPoint, points) {
        for (var i = currentPoint.index - 1; i >= 0; i--) {
            if (points[i].visible && points[i].labelVisible &&
                points[i].labelRegion && currentPoint.labelRegion &&
                currentPoint.labelVisible && isOverlap(currentPoint.labelRegion, points[i].labelRegion)) {
                return true;
            }
        }
        return false;
    };
    /**
     * To get text trimmed while exceeds the accumulation chart area.
     *
     * @param {AccPoints} point - The accumulation point.
     * @param {Rect} rect - The area of the accumulation chart.
     * @param {FontModel} font - The font settings.
     * @param {string} position - The position of the data label.
     * @param {AccumulationDataLabelSettingsModel} dataLabel - The data label settings.
     * @returns {void}
     */
    AccumulationDataLabel.prototype.textTrimming = function (point, rect, font, position, dataLabel) {
        if (isOverlap(point.labelRegion, rect)) {
            var size = point.labelRegion.width;
            if (position === 'Right') {
                size = rect.x - point.labelRegion.x;
            }
            else if (position === 'Left') {
                size = point.labelRegion.x - (rect.x + rect.width);
                if (size < 0) {
                    size += point.labelRegion.width;
                    point.labelRegion.x = rect.x + rect.width;
                }
            }
            else if (position === 'InsideRight') {
                size = (rect.x + rect.width) - point.labelRegion.x;
            }
            else if (position === 'InsideLeft') {
                size = (point.labelRegion.x + point.labelRegion.width) - rect.x;
                if (size < point.labelRegion.width) {
                    point.labelRegion.x = rect.x;
                }
            }
            else if (this.accumulation.enableSmartLabels) {
                this.setPointVisibileFalse(point);
            }
            if (point.labelVisible && point.labelRegion) {
                if ((point.label.indexOf('<br>') !== -1)) {
                    point.labelCollection = point.label.split('<br>');
                }
                else if (size < point.labelRegion.width) {
                    if (dataLabel.textWrap === 'Normal' && dataLabel.textOverflow === 'Ellipsis') {
                        point.labelCollection[0] = textTrim(size - (this.marginValue * 2), point.label, font, this.accumulation.enableRtl, this.accumulation.themeStyle.datalabelFont);
                    }
                    else if (dataLabel.textWrap === 'Wrap' || dataLabel.textWrap === 'AnyWhere') {
                        point.labelCollection = textWrap(point.label, size - (this.marginValue * 2), font, this.accumulation.enableRtl, dataLabel.textWrap === 'AnyWhere', dataLabel.textOverflow === 'Clip', this.accumulation.themeStyle.datalabelFont);
                    }
                    point.labelRegion.width = size;
                }
                for (var i = 0; i < point.labelCollection.length; i++) {
                    if (point.labelCollection[i].length === 3 && point.labelCollection[i].indexOf('...') > -1) {
                        this.setPointVisibileFalse(point);
                        break;
                    }
                }
            }
        }
    };
    /**
     * To set point label visible and region to disable.
     *
     * @param {AccPoints} point - The accumulation point.
     * @returns {void}
     */
    AccumulationDataLabel.prototype.setPointVisibileFalse = function (point) {
        point.labelVisible = false;
        point.labelRegion = null;
    };
    /**
     * To set point label visible to enable.
     *
     * @param {AccPoints} point - The accumulation point.
     * @returns {void}
     */
    AccumulationDataLabel.prototype.setPointVisibleTrue = function (point) {
        point.labelVisible = true;
    };
    /**
     * To set datalabel angle position for outside labels.
     *
     * @param {AccPoints} previousPoint - The previous accumulation point.
     * @param {AccPoints} point - The accumulation point.
     * @param {number} border - The border size.
     * @param {number} labelRadius - The radius for the labels.
     * @param {Size} textsize - The size of the labels.
     * @param {number} margin - The margin value.
     * @returns {void}
     */
    AccumulationDataLabel.prototype.setOuterSmartLabel = function (previousPoint, point, border, labelRadius, textsize, margin) {
        if (!this.isCircular()) {
            this.setSmartLabelForSegments(point, previousPoint);
        }
        else {
            var labelAngle = this.getOverlappedAngle(previousPoint.labelRegion, point.labelRegion, point.midAngle, border * 2);
            this.getLabelRegion(point, 'Outside', textsize, labelRadius, margin, labelAngle);
            if (labelAngle > point.endAngle) {
                labelAngle = point.midAngle;
                //this.setPointVisibileFalse(point);
            }
            point.labelAngle = labelAngle;
            while (point.labelVisible && (isOverlap(previousPoint.labelRegion, point.labelRegion) || labelAngle <= previousPoint.labelAngle
                || labelAngle <= point.midAngle * 0.9 || this.isConnectorLineOverlapping(point, previousPoint))) {
                if (labelAngle > point.endAngle) {
                    //this.setPointVisibileFalse(point);
                    break;
                }
                point.labelAngle = labelAngle;
                this.getLabelRegion(point, 'Outside', textsize, labelRadius, margin, labelAngle);
                labelAngle += 0.1;
            }
        }
    };
    /**
     * Sets smart label positions for funnel and pyramid series.
     *
     * @param {AccPoints} point - The accumulation point.
     * @param {AccPoints} prevPoint - The previous point.
     * @returns {void} setSmartLabelForSegments.
     */
    AccumulationDataLabel.prototype.setSmartLabelForSegments = function (point, prevPoint) {
        var textRegion = point.labelRegion;
        //let overlapWidth: number = prevPoint.labelRegion.x + prevPoint.labelRegion.width - textRegion.x;
        var overlapHeight = this.accumulation.type === 'Funnel' ?
            prevPoint.labelRegion.y - (textRegion.y + textRegion.height) :
            point.labelRegion.y - (prevPoint.labelRegion.y + prevPoint.labelRegion.height);
        if (overlapHeight < 0) {
            point.labelRegion.y += this.accumulation.type === 'Funnel' ? overlapHeight : -overlapHeight;
        }
    };
    /**
     * To find connector line overlapping.
     *
     * @param {AccPoints} point - The accumulation point.
     * @param {AccPoints} previous - The previous point.
     * @returns {boolean} - To find connector line overlapping or not.
     */
    AccumulationDataLabel.prototype.isConnectorLineOverlapping = function (point, previous) {
        var position;
        if (!this.isCircular() && point.labelRegion.x < point.region.x) {
            position = 'outsideLeft';
        }
        var start = this.getLabelLocation(point, position);
        var end = new ChartLocation(0, 0);
        this.getEdgeOfLabel(point.labelRegion, point.labelAngle, end, 0, point);
        var previousstart = this.getLabelLocation(previous);
        var previousend = new ChartLocation(0, 0);
        this.getEdgeOfLabel(previous.labelRegion, previous.labelAngle, previousend, 0, point);
        return this.isLineRectangleIntersect(start, end, point.labelRegion) ||
            this.isLineRectangleIntersect(start, end, previous.labelRegion) ||
            this.isLineRectangleIntersect(previousstart, previousend, point.labelRegion);
    };
    /**
     * To find two rectangle intersect.
     *
     * @param {ChartLocation} line1 - The first line.
     * @param {ChartLocation} line2 - The second line.
     * @param {Rect} rect - The rectangle to check against.
     * @returns {boolean} - To find line rectangle intersect value.
     */
    AccumulationDataLabel.prototype.isLineRectangleIntersect = function (line1, line2, rect) {
        var rectPoints = [
            new ChartLocation(Math.round(rect.x), Math.round(rect.y)),
            new ChartLocation(Math.round((rect.x + rect.width)), Math.round(rect.y)),
            new ChartLocation(Math.round((rect.x + rect.width)), Math.round((rect.y + rect.height))),
            new ChartLocation(Math.round(rect.x), Math.round((rect.y + rect.height)))
        ];
        line1.x = Math.round(line1.x);
        line1.y = Math.round(line1.y);
        line2.x = Math.round(line2.x);
        line2.y = Math.round(line2.y);
        for (var i = 0; i < rectPoints.length; i++) {
            if (this.isLinesIntersect(line1, line2, rectPoints[i], rectPoints[(i + 1) % rectPoints.length])) {
                return true;
            }
        }
        return false;
    };
    /**
     * To find two line intersect.
     *
     * @param {ChartLocation} point1 - The first point of the first line.
     * @param {ChartLocation} point2 - The second point of the first line.
     * @param {ChartLocation} point11 - The first point of the second line.
     * @param {ChartLocation} point12 - The second point of the second line.
     * @returns {boolean} - To find line intersect or not.
     */
    AccumulationDataLabel.prototype.isLinesIntersect = function (point1, point2, point11, point12) {
        var a1 = point2.y - point1.y;
        var b1 = point1.x - point2.x;
        var c1 = a1 * point1.x + b1 * point1.y;
        var a2 = point12.y - point11.y;
        var b2 = point11.x - point12.x;
        var c2 = a2 * point11.x + b2 * point11.y;
        var delta = a1 * b2 - a2 * b1;
        if (delta !== 0) {
            var x = (b2 * c1 - b1 * c2) / delta;
            var y = (a1 * c2 - a2 * c1) / delta;
            var lies = Math.min(point1.x, point2.x) <= x && x <= Math.max(point1.x, point2.x);
            lies = lies && Math.min(point1.y, point2.y) <= y && y <= Math.max(point1.y, point2.y);
            lies = lies && Math.min(point11.x, point12.x) <= x && x <= Math.max(point11.x, point12.x);
            lies = lies && Math.min(point11.y, point12.y) <= y && y <= Math.max(point11.y, point12.y);
            return lies;
        }
        return false;
    };
    /**
     * To get two rectangle overlapping angles.
     *
     * @param {Rect} first - The first rectangle.
     * @param {Rect} second - The second rectangle.
     * @param {number} angle - The angle.
     * @param {number} padding - The padding.
     * @returns {number} - Get overlapped angle.
     */
    AccumulationDataLabel.prototype.getOverlappedAngle = function (first, second, angle, padding) {
        var x = first.x;
        if (angle >= 90 && angle <= 270) {
            second.y = first.y - (padding + second.height / 2);
            x = first.x + first.width;
        }
        else {
            second.y = first.y + first.height + padding;
        }
        return getAngle(this.center, new ChartLocation(x, second.y));
    };
    /**
     * To get connector line path.
     *
     * @param {Rect} label - The label.
     * @param {AccPoints} point - The accumulation point.
     * @param {AccumulationDataLabelSettingsModel} dataLabel - The data label settings.
     * @param {number} end - The end.
     * @returns {string} - Get connector line path.
     */
    AccumulationDataLabel.prototype.getConnectorPath = function (label, point, dataLabel, end) {
        if (end === void 0) { end = 0; }
        var connector = dataLabel.connectorStyle;
        var labelRadius = this.isCircular() ? (!this.isVariousRadius() ? this.labelRadius :
            this.accumulation.pieSeriesModule.getLabelRadius(this.accumulation.visibleSeries[0], point)) :
            this.getLabelDistance(point, dataLabel);
        //let labelRadius: number = this.isCircular() ? this.labelRadius : this.getLabelDistance(point, dataLabel);
        var start = this.getConnectorStartPoint(point, connector);
        var labelAngle = this.accumulation.enableSmartLabels ? point.midAngle : end || point.midAngle;
        var middle = new ChartLocation(0, 0);
        var endPoint = this.getEdgeOfLabel(label, labelAngle, middle, connector.width, point);
        if (connector.type === 'Curve') {
            if (this.isCircular()) {
                var r = labelRadius - (this.isVariousRadius() ? stringToNumber(point.sliceRadius, this.accumulation.pieSeriesModule.size / 2) :
                    this.radius);
                //let r: number = labelRadius - this.radius;
                if (point.isLabelUpdated) {
                    middle = this.getPerpendicularDistance(start, point);
                }
                else {
                    middle = degreeToLocation(labelAngle, labelRadius - (r / 2), this.center);
                    if (point.labelPosition === 'Outside' && dataLabel.position === 'Inside') {
                        middle = degreeToLocation(labelAngle, labelRadius - r * 1.25, this.center);
                    }
                }
                return 'M ' + start.x + ' ' + start.y + ' Q ' + middle.x + ' ' + middle.y + ' ' + endPoint.x + ' ' + endPoint.y;
            }
            else {
                return this.getPolyLinePath(start, endPoint);
            }
        }
        else {
            return 'M ' + start.x + ' ' + start.y + ' L ' + middle.x + ' ' + middle.y + ' L ' + endPoint.x + ' ' + endPoint.y;
        }
    };
    /**
     * Finds the curved path for funnel/pyramid data label connectors.
     *
     * @param {ChartLocation} start - The start location.
     * @param {ChartLocation} end - The end location.
     * @returns {string} - Get poly line path.
     */
    AccumulationDataLabel.prototype.getPolyLinePath = function (start, end) {
        var controlPoints = [start, end];
        if (start.y === end.y) {
            return 'M ' + start.x + ' ' + start.y + ' L ' + end.x + ' ' + end.y;
        }
        var path = 'M';
        for (var i = 0; i <= 16; i++) {
            var t = i / 16;
            var points = this.getBezierPoint(t, controlPoints, 0, 2);
            path += points.x + ',' + points.y;
            if (i !== 16) {
                path += ' L';
            }
        }
        return path;
    };
    /**
     * Finds the bezier point for funnel/pyramid data label connectors.
     *
     * @param {number} t - The parameter value.
     * @param {ChartLocation[]} controlPoints - The control points for the bezier point.
     * @param {number} index - The index of the point.
     * @param {number} count - The total count of points.
     * @returns {ChartLocation} - Get bazier point.
     */
    AccumulationDataLabel.prototype.getBezierPoint = function (t, controlPoints, index, count) {
        if (count === 1) {
            return controlPoints[index];
        }
        var p0 = this.getBezierPoint(t, controlPoints, index, count - 1);
        var p1 = this.getBezierPoint(t, controlPoints, index + 1, count - 1);
        var x = (p0.x) ? p0.x : p0.x;
        var y = (p0.y) ? p0.y : p0.y;
        var x1 = (p1.x) ? p1.x : p1.x;
        var y1 = (p1.y) ? p1.y : p1.y;
        var x2 = (1 - t) * x + t * x1;
        var y2 = (1 - t) * y + t * y1;
        if (p0.x) {
            return { x: x2, y: y2 };
        }
        else {
            return { x: x2, y: y2 };
        }
    };
    /**
     * To get label edges based on the center and label rect position.
     *
     * @param {Rect} labelshape - The label shape.
     * @param {number} angle - The angle of the label.
     * @param {ChartLocation} middle - The middle point of the label.
     * @param {number} border - The border value.
     * @param {AccPoints} point - The accumulation point.
     * @returns {ChartLocation} - Get label edge value.
     */
    AccumulationDataLabel.prototype.getEdgeOfLabel = function (labelshape, angle, middle, border, point) {
        if (border === void 0) { border = 1; }
        var edge = new ChartLocation(labelshape.x, labelshape.y);
        var space = 10;
        if (angle >= 90 && angle <= 270) {
            edge.x += labelshape.width + border / 2 + space;
            edge.y += labelshape.height / 2;
            middle.x = edge.x + 10;
            middle.y = edge.y;
        }
        else if (point && point.region && point.region.x > point.labelRegion.x) {
            edge.x += border * 2 + labelshape.width + space;
            edge.y += labelshape.height / 2;
            middle.x = edge.x + 10;
            middle.y = edge.y;
        }
        else {
            edge.x -= space - border / 2;
            edge.y += labelshape.height / 2;
            middle.x = edge.x - 10;
            middle.y = edge.y;
        }
        return edge;
    };
    /**
     * Finds the distance between the label position and the edge/center of the funnel/pyramid.
     *
     * @param {AccPoints} point - The accumulation point.
     * @param {AccumulationDataLabelSettingsModel} dataLabel - The data label settings.
     * @returns {number} - Get label distance.
     */
    AccumulationDataLabel.prototype.getLabelDistance = function (point, dataLabel) {
        if (point.labelPosition && dataLabel.position !== point.labelPosition || (dataLabel.connectorStyle.length && dataLabel.position === 'Outside')) {
            var length_1 = stringToNumber(dataLabel.connectorStyle.length || '70px', this.accumulation.initialClipRect.width);
            if (length_1 < this.accumulation.initialClipRect.width) {
                return length_1;
            }
        }
        var position = point.labelPosition || dataLabel.position;
        var series = this.accumulation.visibleSeries[0];
        var extraSpace = (this.accumulation.initialClipRect.width - series.triangleSize.width) / 2;
        var labelLocation;
        switch (position) {
            case 'Inside':
                return 0;
            case 'Outside':
                labelLocation = point.symbolLocation.x + point.labelOffset.x;
                return this.accumulation.initialClipRect.width - labelLocation - extraSpace;
        }
    };
    /**
     * Finds the label position / beginning of the connector(ouside funnel labels).
     *
     * @param {AccPoints} point - The accumulation point.
     * @param {AccumulationLabelPosition | string} position - The data label position.
     * @returns {ChartLocation} - Get label location.
     */
    AccumulationDataLabel.prototype.getLabelLocation = function (point, position) {
        if (position === void 0) { position = 'Outside'; }
        if (this.accumulation.type !== 'Pie' && this.accumulation.series[0].funnelMode !== 'Trapezoidal') {
            position = position === 'OutsideLeft' ? 'OutsideLeft' : point.labelPosition || position;
            var location_2 = {
                x: point.symbolLocation.x,
                y: point.symbolLocation.y - point.labelOffset.y
            };
            switch (position) {
                case 'Inside':
                    location_2.y = point.region.y + point.region.height / 2;
                    break;
                case 'Outside':
                    location_2.x += point.labelOffset.x;
                    break;
                case 'OutsideLeft':
                    location_2.x -= point.labelOffset.x;
            }
            return location_2;
        }
        else if (this.accumulation.series[0].funnelMode === 'Trapezoidal' && this.accumulation.type === 'Funnel') {
            var location_3 = {
                x: point.symbolLocation.x,
                y: point.symbolLocation.y
            };
            if (position === 'Outside') {
                location_3.x = point.labelOffset.x;
            }
            return location_3;
        }
        else {
            //return degreeToLocation(point.midAngle, this.radius, this.center);
            return degreeToLocation(point.midAngle, (this.isVariousRadius() ? stringToNumber(point.sliceRadius, this.accumulation.pieSeriesModule.seriesRadius) :
                this.radius), this.center);
        }
    };
    /**
     * Finds the beginning of connector line.
     *
     * @param {AccPoints} point - The accumulation point.
     * @param {ConnectorModel} connector - The connector line.
     * @returns {ChartLocation} - Staring point of connector line.
     */
    AccumulationDataLabel.prototype.getConnectorStartPoint = function (point, connector) {
        // return this.isCircular() ? degreeToLocation(point.midAngle, this.radius - connector.width, this.center) :
        //     this.getLabelLocation(point);
        var position;
        if (!this.isCircular() && point.region.x > point.labelRegion.x) {
            position = 'OutsideLeft';
        }
        return this.isCircular() ? degreeToLocation(point.midAngle, (this.isVariousRadius() ? stringToNumber(point.sliceRadius, this.accumulation.pieSeriesModule.seriesRadius) :
            this.radius) - connector.width, this.center) : this.getLabelLocation(point, position);
    };
    /**
     * To find area rect based on margin, available size.
     *
     * @private
     * @returns {void}
     */
    AccumulationDataLabel.prototype.findAreaRect = function () {
        this.areaRect = new Rect(0, 0, this.accumulation.availableSize.width, this.accumulation.availableSize.height);
        var margin = this.accumulation.margin;
        subtractThickness(this.areaRect, new Thickness(margin.left, margin.right, margin.top, margin.bottom));
    };
    /**
     * To render the data labels from series points.
     *
     * @param {AccPoints} point - The point for which to render the data label.
     * @param {AccumulationDataLabelSettingsModel} dataLabel - The settings for the data labels.
     * @param {Element} parent - The parent element to which the data labels are appended.
     * @param {AccPoints[]} points - The collection of points in the series.
     * @param {number} series - The index of the series.
     * @param {HTMLElement} templateElement - The template element for the data label.
     * @param {boolean} redraw - Indicates whether the data labels are being redrawn.
     * @returns {void}
     * @private
     */
    AccumulationDataLabel.prototype.renderDataLabel = function (point, dataLabel, parent, points, series, templateElement, redraw) {
        var id = this.accumulation.element.id + '_datalabel_Series_' + series + '_';
        var datalabelGroup = this.accumulation.renderer.createGroup({ id: id + 'g_' + point.index });
        var border = { width: dataLabel.border.width, color: dataLabel.border.color };
        var argsFont = (extend({}, getValue('properties', dataLabel.font), null, true));
        point.label = this.getDatalabelText(dataLabel.format, this.accumulation, point.originalText || point.y.toString());
        var argsData = {
            cancel: false, name: textRender, series: this.accumulation.visibleSeries[0], point: point,
            text: point.label, border: border, color: dataLabel.fill, template: this.accumulation.enableHtmlSanitizer ?
                this.accumulation.sanitize(dataLabel.template) : dataLabel.template, font: argsFont
        };
        this.accumulation.trigger(textRender, argsData);
        point.argsData = argsData;
        var isTemplate = argsData.template !== null;
        point.labelVisible = !argsData.cancel;
        point.text = point.label = argsData.text;
        point.labelCollection = [];
        this.marginValue = argsData.border.width ? (5 + argsData.border.width) : 1;
        var childElement = createElement('div', {
            id: this.accumulation.element.id + '_Series_' + 0 + '_DataLabel_' + point.index,
            styles: 'position: absolute;background-color:' + argsData.color + ';' +
                getFontStyle(dataLabel.font, this.accumulation.themeStyle.datalabelFont) + ';border:' + argsData.border.width + 'px solid ' + argsData.border.color + ';'
        });
        this.calculateLabelSize(isTemplate, childElement, point, points, argsData, datalabelGroup, id, dataLabel, redraw);
    };
    AccumulationDataLabel.prototype.getDatalabelText = function (labelFormat, chart, labelText) {
        if (Number(labelText)) {
            var customLabelFormat = labelFormat.match('{value}') !== null;
            var format = chart.intl.getNumberFormat({
                format: customLabelFormat ? '' : labelFormat,
                useGrouping: chart.useGroupingSeparator
            });
            labelText = customLabelFormat ? labelFormat.replace('{value}', format(parseFloat(labelText))) : format(parseFloat(labelText));
        }
        return labelText;
    };
    /**
     * To calculate label size.
     *
     * @param {boolean} isTemplate - Indicates whether the label is a template.
     * @param {HTMLElement} childElement - The child element of the label.
     * @param {AccPoints} point - The point associated with the label.
     * @param {AccPoints[]} points - The collection of points.
     * @param {IAccTextRenderEventArgs} argsData - The arguments data for text rendering.
     * @param {Element} datalabelGroup - The group element for data labels.
     * @param {string} id - The id of the label.
     * @param {AccumulationDataLabelSettingsModel} dataLabel - The settings for the data labels.
     * @param {boolean} redraw - Indicates whether the labels are being redrawn.
     * @param {ClientRect} clientRect - The client rectangle.
     * @param {boolean} isReactCallback - Indicates whether a React callback is being used.
     * @returns {void}
     * @private
     */
    AccumulationDataLabel.prototype.calculateLabelSize = function (isTemplate, childElement, point, points, argsData, datalabelGroup, id, dataLabel, redraw, clientRect, isReactCallback) {
        this.calculateLabelCollection(point, dataLabel);
        var textSize = isTemplate ? (isReactCallback ? { width: clientRect.width, height: clientRect.height } :
            this.getTemplateSize(childElement, point, argsData, redraw, isTemplate, points, datalabelGroup, id, dataLabel)) : this.getTextSize(point.labelCollection, dataLabel);
        textSize.height += 4; // 4 for calculation with padding for smart label shape
        textSize.width += 4;
        point.textSize = textSize;
        point.templateElement = childElement;
        this.getDataLabelPosition(point, dataLabel, textSize, points);
        if (point.labelRegion) {
            this.correctLabelRegion(point.labelRegion, point.textSize);
        }
    };
    /**
     * To draw a data label.
     *
     * @param {AccumulationSeries} series - The series associated with the data label.
     * @param {AccumulationDataLabelSettingsModel} dataLabel - The settings for the data labels.
     * @param {HTMLElement} parent - The parent element of the data labels.
     * @param {HTMLElement} templateElement - The template element for the data label.
     * @param {boolean} redraw - Indicates whether the data labels are being redrawn.
     * @returns {void}
     * @private
     */
    AccumulationDataLabel.prototype.drawDataLabels = function (series, dataLabel, parent, templateElement, redraw) {
        var angle;
        var degree;
        var modifiedPoints = series.leftSidePoints.concat(series.rightSidePoints);
        modifiedPoints.sort(function (a, b) { return a.index - b.index; });
        if (series.type === 'Pie' && this.accumulation.enableSmartLabels) {
            this.extendedLabelsCalculation();
        }
        for (var _i = 0, modifiedPoints_1 = modifiedPoints; _i < modifiedPoints_1.length; _i++) {
            var point = modifiedPoints_1[_i];
            if (!isNullOrUndefined(point.argsData) && !isNullOrUndefined(point.y)) {
                this.finalizeDatalabels(point, modifiedPoints, dataLabel);
                var pointElement = document.getElementById(this.accumulation.element.id + '_Series_0_Point_' + point.index);
                var id = this.accumulation.element.id + '_datalabel_Series_' + 0 + '_';
                var datalabelGroup = this.accumulation.renderer.createGroup({ id: id + 'g_' + point.index });
                datalabelGroup.setAttribute('aria-hidden', 'true');
                var dataLabelElement = void 0;
                var location_4 = void 0;
                var element = void 0;
                if (point.visible && point.labelVisible) {
                    angle = degree = dataLabel.angle;
                    if (point.argsData.template) {
                        this.setTemplateStyle(point.templateElement, point, templateElement, dataLabel.font.color, point.color, redraw);
                    }
                    else {
                        location_4 = new ChartLocation(point.labelRegion.x + this.marginValue, point.labelRegion.y
                            + (point.textSize.height * 3 / (point.labelCollection.length * 4)) + this.marginValue);
                        element = getElement(id + 'shape_' + point.index);
                        var startLocation = element ? new ChartLocation(+element.getAttribute('x'), +element.getAttribute('y')) : null;
                        var textWidth = point.textSize.width;
                        if (dataLabel.enableRotation) {
                            if (angle === 0) {
                                if (point.labelPosition === 'Outside') {
                                    degree = 0;
                                }
                                else if (point.midAngle >= 90 && point.midAngle <= 260) {
                                    degree = point.midAngle + 180;
                                }
                                else {
                                    degree = point.midAngle;
                                }
                            }
                            else {
                                degree = (angle > 360) ? angle - 360 : (angle < -360) ? angle + 360 : angle;
                            }
                        }
                        else {
                            degree = 0;
                        }
                        var rotate = 'rotate(' + degree + ',' + (location_4.x + (textWidth / 2)) + ',' + (location_4.y) + ')';
                        point.transform = rotate;
                        dataLabelElement = this.accumulation.renderer.drawRectangle(new RectOption(id + 'shape_' + point.index, point.argsData.color, point.argsData.border, 1, point.labelRegion, dataLabel.rx, dataLabel.ry, rotate, series.dataLabel.border.dashArray));
                        appendChildElement(false, datalabelGroup, dataLabelElement, redraw, true, 'x', 'y', startLocation, null, false, false, null, this.accumulation.duration);
                        textElement(this.accumulation.renderer, new TextOption(id + 'text_' + point.index, location_4.x, location_4.y, this.accumulation.enableRtl ? 'end' : 'start', point.labelCollection, rotate, 'auto', degree), point.argsData.font, point.argsData.font.color || this.getSaturatedColor(point, point.argsData.color), datalabelGroup, false, redraw, true, false, this.accumulation.duration, null, null, null, null, true, this.accumulation.themeStyle.datalabelFont);
                        element = null;
                    }
                    if (pointElement && this.accumulation.highlightMode !== 'None') {
                        datalabelGroup.setAttribute('class', pointElement.getAttribute('class') ? pointElement.getAttribute('class') : '');
                        for (var i = 0; i < datalabelGroup.children.length; i++) {
                            var existing = document.getElementById(datalabelGroup.children[i].id);
                            if (existing) {
                                datalabelGroup.children[i].style.opacity = existing.style.opacity;
                            }
                        }
                    }
                    if (this.accumulation.accumulationLegendModule && this.accumulation.legendSettings.visible && !this.accumulation.redraw && (dataLabel.position === 'Outside'
                        || this.accumulation.enableSmartLabels)) {
                        this.accumulation.visibleSeries[0].findMaxBounds(this.accumulation.visibleSeries[0].labelBound, point.labelRegion);
                    }
                    if (point.labelPosition === 'Outside') {
                        var element_1 = getElement(id + 'connector_' + point.index);
                        var previousDirection = element_1 ? element_1.getAttribute('d') : '';
                        var pathElement = this.accumulation.renderer.drawPath(new PathOption(id + 'connector_' + point.index, 'transparent', dataLabel.connectorStyle.width, dataLabel.connectorStyle.color || point.color, 1, dataLabel.connectorStyle.dashArray, this.getConnectorPath(extend({}, point.labelRegion, null, true), point, dataLabel, point.labelAngle)));
                        appendChildElement(false, datalabelGroup, pathElement, redraw, true, null, null, null, previousDirection, false, false, null, this.accumulation.duration);
                    }
                    appendChildElement(false, parent, datalabelGroup, redraw);
                }
                else if (getElement(datalabelGroup.id)) {
                    (getElement(datalabelGroup.id)).parentNode.removeChild(getElement(datalabelGroup.id));
                }
            }
        }
        if (this.accumulation.type === 'Pie' && dataLabel.textWrap === 'Normal' && dataLabel.textOverflow === 'Clip') {
            this.dataLabelClipPath(dataLabel, parent);
        }
    };
    /**
     * To calculate data label clip path.
     *
     * @param {AccumulationDataLabelSettingsModel} dataLabel - The settings for the data labels.
     * @param {HTMLElement} parent - The parent element of the data labels.
     * @returns {void}
     */
    AccumulationDataLabel.prototype.dataLabelClipPath = function (dataLabel, parent) {
        var id = this.accumulation.element.id + '_datalabel_Series_' + 0 + '_';
        var clippath = this.accumulation.renderer.createClipPath({ id: id + 'clipPath' });
        var clipRect;
        var radius = this.accumulation.pieSeriesModule.pieBaseRadius;
        if (dataLabel.position === 'Inside') {
            clipRect = this.accumulation.renderer.drawCircle(new CircleOption(id + 'clipPath_rect', 'transparent', { width: 0 }, 0, this.center.x, this.center.y, radius));
        }
        else if (dataLabel.maxWidth) {
            var x = this.center.x - radius - stringToNumber((dataLabel.connectorStyle.length || '4%'), radius) - dataLabel.maxWidth;
            var y = this.center.y - radius - stringToNumber((dataLabel.connectorStyle.length || '4%'), radius) - dataLabel.maxWidth;
            var height = (radius + stringToNumber((dataLabel.connectorStyle.length || '4%'), radius) + dataLabel.maxWidth) * 2;
            var width = height;
            if (this.accumulation.legendSettings.visible) {
                var legendModule = this.accumulation.accumulationLegendModule;
                if (legendModule.position === 'Left') {
                    width = (legendModule.legendBounds.x + legendModule.legendBounds.width - x) > 0 ?
                        (width - (legendModule.legendBounds.width - x)) : width;
                    x = (legendModule.legendBounds.x + legendModule.legendBounds.width) < x ? x :
                        (legendModule.legendBounds.x + legendModule.legendBounds.width);
                }
                else if (legendModule.position === 'Right') {
                    width = (x + width - legendModule.legendBounds.x) > 0 ? (width - (x + width - legendModule.legendBounds.x)) : width;
                }
            }
            clipRect = this.accumulation.renderer.drawRectangle(new RectOption(id + 'clipPath_rect', 'transparent', { width: 0 }, 0, new Rect(x, y, height, width), 0, 0));
        }
        if (dataLabel.position === 'Inside' || dataLabel.maxWidth) {
            clippath.appendChild(clipRect);
            appendChildElement(false, this.accumulation.svgObject, clippath);
            parent.style.cssText = 'clip-path:url(#' + clippath.id + ')';
        }
    };
    /**
     * In this method datalabels region checked with legebdBounds and areaBounds.
     * Trimming of datalabel and point's visibility again changed here.
     *
     * @param {AccPoints} point - Current point in which trimming and visibility to be checked.
     * @param {AccPoints[]} points - Finalized points.
     * @param {AccumulationDataLabelSettingsModel} dataLabel - Datalabel model.
     * @returns {void}
     */
    AccumulationDataLabel.prototype.finalizeDatalabels = function (point, points, dataLabel) {
        if (this.isOverlapping(point, points) ||
            (this.titleRect && point.labelRegion && isOverlap(point.labelRegion, this.titleRect))) {
            if (this.isCircular() && point.labelPosition === 'Outside' && this.accumulation.enableSmartLabels) {
                this.setPointVisibileFalse(point);
            }
        }
        if (this.accumulation.accumulationLegendModule && this.accumulation.legendSettings.visible &&
            point.labelVisible && point.labelRegion && (!dataLabel.maxWidth ? dataLabel.textOverflow === 'Clip' ? dataLabel.textWrap !== 'Normal' : true : false)) {
            var rect = this.accumulation.accumulationLegendModule.legendBounds;
            if (this.accumulation.visibleSeries[0].type !== 'Pie' && this.accumulation.legendSettings.position === 'Left'
                && dataLabel.position === 'Outside') {
                point.labelRegion.x = point.labelRegion.x + rect.width;
            }
            var padding = this.accumulation.legendSettings.border.width / 2;
            this.textTrimming(point, new Rect(rect.x - padding, rect.y - padding, rect.width + (2 * padding), rect.height + (2 * padding)), dataLabel.font, this.accumulation.accumulationLegendModule.position, dataLabel);
        }
        if (point.labelVisible && point.labelRegion && (!dataLabel.maxWidth ? dataLabel.textOverflow === 'Clip' ? dataLabel.textWrap !== 'Normal' : true : false)) {
            var position = this.isCircular() ? (point.labelRegion.x >= this.center.x) ? 'InsideRight' : 'InsideLeft' :
                (point.labelRegion.x >= point.region.x) ? 'InsideRight' : 'InsideLeft';
            this.textTrimming(point, this.areaRect, dataLabel.font, position, dataLabel);
        }
        if (point.labelVisible && point.labelRegion && !dataLabel.maxWidth && dataLabel.textOverflow !== 'Clip' && this.accumulation.enableSmartLabels && ((point.labelRegion.y + point.labelRegion.height / 2 >
            this.areaRect.y + this.areaRect.height || point.labelRegion.y < this.areaRect.y) || (point.labelRegion.x < this.areaRect.x ||
            point.labelRegion.x + point.labelRegion.width > this.areaRect.x + this.areaRect.width))) {
            this.setPointVisibileFalse(point);
        }
    };
    /**
     * To find the template element size.
     *
     * @param {HTMLElement} element - To get a template element.
     * @param {AccPoints} point - The accumulation point for the template.
     * @param {IAccTextRenderEventArgs} argsData - The arguments for the accumulation points.
     * @param {boolean} redraw - Indicates whether to redraw the template.
     * @param {boolean} isTemplate - Indicates whether the element is a template.
     * @param {AccPoints[]} points - The accumulation points for the template.
     * @param {Element} datalabelGroup - The group element for the data labels.
     * @param {string} id - The identifier for the template.
     * @param {AccumulationDataLabelSettingsModel} dataLabel - The settings for the data labels.
     * @returns {Size} - The size of the template.
     */
    AccumulationDataLabel.prototype.getTemplateSize = function (element, point, argsData, redraw, isTemplate, points, datalabelGroup, id, dataLabel) {
        element = createTemplate(element, point.index, argsData.template, this.accumulation, point, this.accumulation.visibleSeries[0], this.accumulation.element.id + '_DataLabel', 0, argsData, isTemplate, points, datalabelGroup, id, dataLabel, redraw);
        var clientRect = measureElementRect(element, redraw);
        return { width: clientRect.width, height: clientRect.height };
    };
    /**
     * To set the template element style.
     *
     * @param {HTMLElement} childElement - The child element of the template.
     * @param {AccPoints} point - The point data for the template.
     * @param {Element} parent - The parent element of the template.
     * @param {string} labelColor - The color of the label in the template.
     * @param {string} fill - The fill color of the template.
     * @param {boolean} redraw - Indicates whether to redraw the template.
     * @returns {void}
     */
    AccumulationDataLabel.prototype.setTemplateStyle = function (childElement, point, parent, labelColor, fill, redraw) {
        childElement.style.left = (point.labelRegion.x) + 'px';
        childElement.style.top = (point.labelRegion.y) + 'px';
        childElement.style.color = labelColor || this.getSaturatedColor(point, point.labelPosition === 'Inside' ? fill : this.getLabelBackground(point));
        if (this.accumulation.isBlazor) {
            var position = this.isCircular() ? (point.labelRegion.x >= this.center.x) ? 'InsideRight' : 'InsideLeft' :
                (point.labelRegion.x >= point.region.x) ? 'InsideRight' : 'InsideLeft';
            if (position === 'InsideRight') {
                childElement.style.transform = 'translate(0%, -50%)';
            }
            else {
                childElement.style.transform = 'translate(-100%, -50%)';
            }
        }
        if (childElement.childElementCount) {
            appendChildElement(false, parent, childElement, redraw, true, 'left', 'top');
            this.doTemplateAnimation(this.accumulation, childElement);
        }
    };
    /**
     * To find saturated color for datalabel
     *
     * @param {AccPoints} point - The accumulation point.
     * @param {string} color - The original color.
     * @returns {string} - Get a saturated color.
     */
    AccumulationDataLabel.prototype.getSaturatedColor = function (point, color) {
        var saturatedColor;
        if (this.marginValue >= 1) {
            saturatedColor = color === 'transparent' ? this.getLabelBackground(point) : color;
        }
        else {
            saturatedColor = this.getLabelBackground(point);
        }
        saturatedColor = (saturatedColor === 'transparent') ? ((this.accumulation.theme.indexOf('Dark') > -1 || this.accumulation.theme.indexOf('HighContrast') > -1) ? 'black' : 'white') : saturatedColor;
        var rgbValue = convertHexToColor(colorNameToHex(saturatedColor));
        var contrast = Math.round((rgbValue.r * 299 + rgbValue.g * 587 + rgbValue.b * 114) / 1000);
        return this.accumulation.theme === 'Bootstrap5' ? '#212529' : this.accumulation.theme === 'Bootstrap5Dark' ? '#DEE2E6' : contrast >= 128 ? this.accumulation.theme.indexOf('Tailwind3') > -1 ? '#111827' : 'black' : this.accumulation.theme.indexOf('Tailwind3') > -1 ? '#FFFFFF' : 'white';
    };
    /**
     * Animates the data label template.
     *
     * @param {AccumulationChart} accumulation - The accumulation chart control.
     * @param {Element} element - The element to animate.
     * @returns {void}
     * @private
     */
    AccumulationDataLabel.prototype.doTemplateAnimation = function (accumulation, element) {
        var series = accumulation.visibleSeries[0];
        var delay = series.animation.delay + series.animation.duration;
        if (((series.animation.enable && animationMode !== 'Disable') || animationMode === 'Enable') && accumulation.animateSeries) {
            element.style.visibility = 'hidden';
            templateAnimate(element, delay, 200, 'ZoomIn');
        }
    };
    /**
     * To find background color for the datalabel.
     *
     * @param {AccPoints} point - The data point for which to determine the background color.
     * @returns {string} - The background color for the data label.
     */
    AccumulationDataLabel.prototype.getLabelBackground = function (point) {
        return point.labelPosition === 'Outside' ?
            this.accumulation.background || this.accumulation.themeStyle.background : !point.y ? this.accumulation.theme.indexOf('dark') ? 'white' : 'black' : point.color;
    };
    /**
     * To correct the padding between datalabel regions.
     *
     * @param {Rect} labelRegion - The region occupied by the data label.
     * @param {Size} textSize - The size of the text within the data label.
     * @param {number} padding - The padding value to adjust the spacing.
     * @returns {void}
     */
    AccumulationDataLabel.prototype.correctLabelRegion = function (labelRegion, textSize, padding) {
        if (padding === void 0) { padding = 4; }
        labelRegion.height -= padding;
        labelRegion.width -= padding;
        labelRegion.x += padding / 2;
        labelRegion.y += padding / 2;
        textSize.height -= padding;
        textSize.width -= padding;
    };
    /**
     * To get the dataLabel module name.
     *
     * @returns {string} - Returns the module name.
     */
    AccumulationDataLabel.prototype.getModuleName = function () {
        return 'AccumulationDataLabel';
    };
    /**
     * To destroy the data label.
     *
     * @returns {void}
     * @private
     */
    AccumulationDataLabel.prototype.destroy = function () {
        /**
         * Destroy method performed here.
         */
    };
    //calculation for placing labels smartly
    AccumulationDataLabel.prototype.extendedLabelsCalculation = function () {
        var _this = this;
        var series = this.accumulation.series[0];
        series.rightSidePoints.forEach(function (point, index, halfSidePoints) {
            point.initialLabelRegion = point.labelRegion;
            point.isLabelUpdated = 0;
            _this.skipPoints(point, halfSidePoints, index);
        });
        series.leftSidePoints.forEach(function (point, index, halfSidePoints) {
            point.initialLabelRegion = point.labelRegion;
            point.isLabelUpdated = 0;
            _this.skipPoints(point, halfSidePoints, index);
        });
        this.arrangeLeftSidePoints(series);
        this.isIncreaseAngle = false;
        this.arrangeRightSidePoints(series);
    };
    /**
     * Rightside points alignments calculation.
     *
     * @param {AccumulationSeries} series - To get a proper series.
     * @returns {void}
     */
    AccumulationDataLabel.prototype.arrangeRightSidePoints = function (series) {
        var startFresh;
        var angleChanged;
        var rightSideRenderPoints = series.rightSidePoints.filter(function (point) { return (point.labelVisible && point.labelPosition === 'Outside'); });
        this.rightSideRenderingPoints = rightSideRenderPoints;
        var checkAngle;
        var currentPoint;
        var lastPoint = rightSideRenderPoints[rightSideRenderPoints.length - 1];
        var nextPoint;
        if (lastPoint) {
            if (lastPoint.labelAngle > 90 && lastPoint.labelAngle < 270) {
                this.isIncreaseAngle = true;
                this.changeLabelAngle(lastPoint, 89);
            }
        }
        /**
         * Right side points arranged from last point.
         * A point checked with successive points for overlapping.
         * If that is overlapped, its label angle is decreased and placing in optimal position
         * If one point's angle is decreased, its previous points in the half side points also decreased until it reaced optimum position.
         * When decreasing angle falls beyond 270, label angle increased.
         * If one point's angle is increased, its successive points in that half point also increased until it reaced optimum position.
         */
        for (var i = rightSideRenderPoints.length - 1; i >= 0; i--) {
            currentPoint = rightSideRenderPoints[i];
            nextPoint = rightSideRenderPoints[i + 1];
            // A point checked for overlapping, label visibility
            if (this.isOverlapWithNext(currentPoint, rightSideRenderPoints, i) && currentPoint.labelVisible
                || !(currentPoint.labelAngle <= 90 || currentPoint.labelAngle >= 270)) {
                checkAngle = lastPoint.labelAngle + 10;
                angleChanged = true;
                //If last's point change angle in beyond the limit, stop the increasing angle and do decrease the angle.
                if (startFresh) {
                    this.isIncreaseAngle = false;
                }
                else if (checkAngle > 90 && checkAngle < 270 && nextPoint.isLabelUpdated) {
                    this.isIncreaseAngle = true;
                }
                if (!this.isIncreaseAngle) {
                    for (var k = i + 1; k < rightSideRenderPoints.length; k++) {
                        this.increaseAngle(rightSideRenderPoints[k - 1], rightSideRenderPoints[k], series, true);
                    }
                }
                else {
                    for (var k = i + 1; k > 0; k--) {
                        this.decreaseAngle(rightSideRenderPoints[k], rightSideRenderPoints[k - 1], series, true);
                    }
                }
            }
            else {
                //If a point did not overlapped with previous points, increase the angle always for right side points.
                if (angleChanged && nextPoint && !nextPoint.isLabelUpdated) {
                    startFresh = true;
                }
            }
        }
    };
    /**
     * Leftside points alignments calculation.
     *
     * @param {AccumulationSeries} series - To get a proper series.
     * @returns {void}
     */
    AccumulationDataLabel.prototype.arrangeLeftSidePoints = function (series) {
        var _this = this;
        var leftSideRenderPoints = series.leftSidePoints.filter(function (point) { return (point.labelVisible && point.labelPosition === 'Outside'); });
        this.leftSideRenderingPoints = leftSideRenderPoints;
        var previousPoint;
        var currentPoint;
        var angleChanged;
        var startFresh;
        /**
         * Left side points arranged from first point.
         * A point checked with previous points for overlapping.
         * If that is overlapped, its label angle is decreased and placing in optimal position
         * If one point's angle is decreased, its previous points in the half side points also decreased until it reaced optimum position.
         * When decreasing angle falls beyond 90, label angle increased.
         * If one point's angle is increased, its successive points in that half point also increased until it reaced optimum position.
         */
        for (var i = 0; i < leftSideRenderPoints.length; i++) {
            currentPoint = leftSideRenderPoints[i];
            previousPoint = leftSideRenderPoints[i - 1];
            // A point checked
            if (this.isOverlapWithPrevious(currentPoint, leftSideRenderPoints, i) && currentPoint.labelVisible
                || !(currentPoint.labelAngle < 270)) {
                angleChanged = true;
                if (startFresh) {
                    this.isIncreaseAngle = false;
                }
                if (!this.isIncreaseAngle) {
                    for (var k = i; k > 0; k--) {
                        this.decreaseAngle(leftSideRenderPoints[k], leftSideRenderPoints[k - 1], series, false);
                        leftSideRenderPoints.filter(function (point, index) {
                            if (point.isLabelUpdated && leftSideRenderPoints[index].labelAngle - 10 < 100) {
                                _this.isIncreaseAngle = true;
                            }
                        });
                    }
                }
                else {
                    for (var k = i; k < leftSideRenderPoints.length; k++) {
                        this.increaseAngle(leftSideRenderPoints[k - 1], leftSideRenderPoints[k], series, false);
                    }
                }
            }
            else {
                if (angleChanged && previousPoint && previousPoint.isLabelUpdated) {
                    startFresh = true;
                }
            }
        }
    };
    AccumulationDataLabel.prototype.decreaseAngle = function (currentPoint, previousPoint, series, isRightSide) {
        if (isNullOrUndefined(currentPoint) || isNullOrUndefined(previousPoint)) {
            return null;
        }
        var count = 1;
        if (isRightSide) {
            while (isOverlap(currentPoint.labelRegion, previousPoint.labelRegion) || (!this.isVariousRadius() &&
                !((previousPoint.labelRegion.height + previousPoint.labelRegion.y) < currentPoint.labelRegion.y))) {
                var newAngle = previousPoint.midAngle - count;
                if (newAngle < 0) {
                    newAngle = 360 + newAngle;
                }
                if (newAngle <= 270 && newAngle >= 90) {
                    newAngle = 270;
                    this.isIncreaseAngle = true;
                    break;
                }
                this.changeLabelAngle(previousPoint, newAngle);
                count++;
            }
        }
        else {
            if (currentPoint.labelAngle > 270) {
                this.changeLabelAngle(currentPoint, 270);
                previousPoint.labelAngle = 270;
            }
            while (isOverlap(currentPoint.labelRegion, previousPoint.labelRegion) || (!this.isVariousRadius() &&
                ((currentPoint.labelRegion.y + currentPoint.labelRegion.height) > previousPoint.labelRegion.y))) {
                var newAngle = previousPoint.midAngle - count;
                if (!(newAngle <= 270 && newAngle >= 90)) {
                    newAngle = 90;
                    this.isIncreaseAngle = true;
                    break;
                }
                this.changeLabelAngle(previousPoint, newAngle);
                if (isOverlap(currentPoint.labelRegion, previousPoint.labelRegion) &&
                    !series.leftSidePoints.indexOf(previousPoint) && (newAngle - 1 < 90 && newAngle - 1 > 270)) {
                    this.changeLabelAngle(currentPoint, currentPoint.labelAngle + 1);
                    this.arrangeLeftSidePoints(series);
                    break;
                }
                count++;
            }
        }
    };
    AccumulationDataLabel.prototype.increaseAngle = function (currentPoint, nextPoint, series, isRightSide) {
        if (isNullOrUndefined(currentPoint) || isNullOrUndefined(nextPoint)) {
            return null;
        }
        var count = 1;
        if (isRightSide) {
            while (isOverlap(currentPoint.labelRegion, nextPoint.labelRegion) || (!this.isVariousRadius() &&
                !((currentPoint.labelRegion.y + currentPoint.labelRegion.height) < nextPoint.labelRegion.y))) {
                var newAngle = nextPoint.midAngle + count;
                if (newAngle < 270 && newAngle > 90) {
                    newAngle = 90;
                    this.isIncreaseAngle = true;
                    break;
                }
                this.changeLabelAngle(nextPoint, newAngle);
                if (isOverlap(currentPoint.labelRegion, nextPoint.labelRegion) && (newAngle + 1 > 90 && newAngle + 1 < 270) &&
                    this.rightSideRenderingPoints.indexOf(nextPoint) === this.rightSideRenderingPoints.length - 1) {
                    this.changeLabelAngle(currentPoint, currentPoint.labelAngle - 1);
                    nextPoint.labelRegion = nextPoint.initialLabelRegion;
                    this.arrangeRightSidePoints(series);
                    break;
                }
                if (count > 360) {
                    break;
                }
                count++;
            }
        }
        else {
            while (isOverlap(currentPoint.labelRegion, nextPoint.labelRegion) || (!this.isVariousRadius() &&
                (currentPoint.labelRegion.y < (nextPoint.labelRegion.y + nextPoint.labelRegion.height)))) {
                var newAngle = nextPoint.midAngle + count;
                if (!(newAngle < 270 && newAngle > 90)) {
                    newAngle = 270;
                    this.isIncreaseAngle = false;
                    break;
                }
                this.changeLabelAngle(nextPoint, newAngle);
                if (count > 360) {
                    break;
                }
                count++;
            }
        }
    };
    AccumulationDataLabel.prototype.changeLabelAngle = function (currentPoint, newAngle) {
        var dataLabel = this.accumulation.series[0].dataLabel;
        var variableR;
        if (this.isVariousRadius()) {
            variableR = this.accumulation.pieSeriesModule.getLabelRadius(this.accumulation.visibleSeries[0], currentPoint);
        }
        //padding 10px is added to label radius for increasing the angle and avoid congestion.
        var labelRadius = (currentPoint.labelPosition === 'Outside' && this.accumulation.enableSmartLabels &&
            dataLabel.position === 'Inside') ?
            this.radius + stringToNumber(dataLabel.connectorStyle.length || '4%', this.accumulation.pieSeriesModule.size / 2) :
            (!this.isVariousRadius() ? this.accumulation.pieSeriesModule.labelRadius + 10 : variableR);
        var radius = (!this.isVariousRadius() ? labelRadius : variableR);
        this.getLabelRegion(currentPoint, 'Outside', currentPoint.textSize, radius, this.marginValue, newAngle);
        currentPoint.isLabelUpdated = 1;
        currentPoint.labelAngle = newAngle;
    };
    AccumulationDataLabel.prototype.isOverlapWithPrevious = function (currentPoint, points, currentPointIndex) {
        for (var i = 0; i < currentPointIndex; i++) {
            if (i !== points.indexOf(currentPoint) &&
                points[i].visible && points[i].labelVisible &&
                points[i].labelRegion && currentPoint.labelRegion &&
                currentPoint.labelVisible && isOverlap(currentPoint.labelRegion, points[i].labelRegion)) {
                return true;
            }
        }
        return false;
    };
    AccumulationDataLabel.prototype.isOverlapWithNext = function (point, points, pointIndex) {
        for (var i = pointIndex; i < points.length; i++) {
            if (i !== points.indexOf(point) && points[i].visible &&
                points[i].labelVisible && points[i].labelRegion &&
                point.labelRegion && point.labelVisible && isOverlap(point.labelRegion, points[i].labelRegion)) {
                return true;
            }
        }
        return false;
    };
    AccumulationDataLabel.prototype.skipPoints = function (currentPoint, halfsidePoints, pointIndex) {
        if (pointIndex > 0 && ((currentPoint.midAngle < 285 && currentPoint.midAngle > 255) ||
            (currentPoint.midAngle < 105 && currentPoint.midAngle > 75))) {
            var previousPoint = halfsidePoints[pointIndex - 1];
            var angleDiff = currentPoint.endAngle % 360 - currentPoint.startAngle % 360;
            var prevAngleDiff = previousPoint.endAngle % 360 - previousPoint.startAngle % 360;
            if (prevAngleDiff <= angleDiff && angleDiff < 5 && previousPoint.labelVisible) {
                this.setPointVisibleTrue(currentPoint);
            }
        }
        else if (pointIndex > 1 && ((currentPoint.midAngle < 300 && currentPoint.midAngle > 240) ||
            (currentPoint.midAngle < 120 && currentPoint.midAngle > 60))) {
            var prevPoint = halfsidePoints[pointIndex - 1];
            var secondPrevPoint = halfsidePoints[pointIndex - 2];
            var angleDiff = currentPoint.endAngle % 360 - currentPoint.startAngle % 360;
            var prevAngleDiff = prevPoint.endAngle % 360 - prevPoint.startAngle % 360;
            var thirdAngleDiff = secondPrevPoint.endAngle % 360 - secondPrevPoint.startAngle % 360;
            if (angleDiff < 3 && prevAngleDiff < 3 && thirdAngleDiff < 3 && prevPoint.labelVisible && currentPoint.labelVisible) {
                this.setPointVisibleTrue(currentPoint);
            }
        }
    };
    AccumulationDataLabel.prototype.getPerpendicularDistance = function (startPoint, point) {
        var increasedLocation;
        var add = 10;
        var height = add + 10 * Math.sin(point.midAngle * Math.PI / 360);
        if (point.midAngle > 270 && point.midAngle < 360) {
            increasedLocation = new ChartLocation(startPoint.x + height * (Math.cos((360 - point.midAngle) * Math.PI / 180)), startPoint.y - height * (Math.sin((360 - point.midAngle) * Math.PI / 180)));
        }
        else if (point.midAngle > 0 && point.midAngle < 90) {
            increasedLocation = new ChartLocation(startPoint.x + height * (Math.cos((point.midAngle) * Math.PI / 180)), startPoint.y + height * (Math.sin((point.midAngle) * Math.PI / 180)));
            // eslint-disable-next-line no-dupe-else-if
        }
        else if (point.midAngle > 0 && point.midAngle < 90) {
            increasedLocation = new ChartLocation(startPoint.x - height * (Math.cos((point.midAngle - 90) * Math.PI / 180)), startPoint.y + height * (Math.sin((point.midAngle - 90) * Math.PI / 180)));
        }
        else {
            increasedLocation = new ChartLocation(startPoint.x - height * (Math.cos((point.midAngle - 180) * Math.PI / 180)), startPoint.y - height * (Math.sin((point.midAngle - 180) * Math.PI / 180)));
        }
        return increasedLocation;
    };
    return AccumulationDataLabel;
}(AccumulationBase));
export { AccumulationDataLabel };
