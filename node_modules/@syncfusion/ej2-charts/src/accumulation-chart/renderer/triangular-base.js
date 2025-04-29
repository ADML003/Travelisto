/**
 * Defines the common behavior of funnel and pyramid series
 */
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
import { Rect, Size } from '@syncfusion/ej2-svg-base';
import { stringToNumber } from '../../common/utils/helper';
import { AccumulationBase } from './accumulation-base';
/**
 * The `TriangularBase` module is used to calculate base functions for funnel and pyramid series.
 *
 * @private
 */
var TriangularBase = /** @class */ (function (_super) {
    __extends(TriangularBase, _super);
    function TriangularBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Initializes the properties of funnel/pyramid series.
     *
     * @private
     * @param {AccumulationChart} chart - The accumulation chart control.
     * @param {AccumulationSeries} series - The series for which to initialize properties.
     * @returns {void}
     */
    TriangularBase.prototype.initProperties = function (chart, series) {
        var actualChartArea = chart.initialClipRect;
        series.triangleSize = new Size(stringToNumber(series.width, actualChartArea.width), stringToNumber(series.height, actualChartArea.height));
        series.neckSize = new Size(stringToNumber(series.neckWidth, actualChartArea.width), stringToNumber(series.neckHeight, actualChartArea.height));
        this.defaultLabelBound(series, series.dataLabel.visible, series.dataLabel.position, chart);
        if (series.explodeOffset === '30%') {
            series.explodeOffset = '25px';
        }
        chart.explodeDistance = stringToNumber(series.explodeOffset, actualChartArea.width);
        var points = series.points;
        this.initializeSizeRatio(points, series);
    };
    /**
     * Initializes the size of the pyramid/funnel segments.
     *
     * @private
     * @param {AccPoints[]} points - The points to initialize the segment size.
     * @param {AccumulationSeries} series - The series for which to initialize properties.
     * @param {boolean} reverse - Indicates whether the pyramid/funnel segments should be reversed.
     * @returns {void}
     */
    TriangularBase.prototype.initializeSizeRatio = function (points, series, reverse) {
        if (reverse === void 0) { reverse = false; }
        var sumOfPoints = series.sumOfPoints;
        //Limiting the ratio within the range of 0 to 1
        var gapRatio = Math.min(Math.max(series.gapRatio, 0), 1);
        //% equivalence of a value 1
        var coEff = (sumOfPoints !== 0) ? 1 / (sumOfPoints * (1 + gapRatio / (1 - gapRatio))) : 0;
        var spacing = gapRatio / (points.length - 1);
        var y = 0;
        //starting from bottom
        for (var i = points.length - 1; i >= 0; i--) {
            var index = reverse ? points.length - 1 - i : i;
            if (points[index].visible) {
                var height = coEff * points[index].y;
                points[index].yRatio = y;
                points[index].heightRatio = height;
                y += height + spacing;
            }
        }
    };
    /**
     * Marks the label location from the set of points that forms a pyramid/funnel segment.
     *
     * @private
     * @param {AccumulationSeries} series - The series for which to mark label locations.
     * @param {AccPoints} point - The point to mark the label location.
     * @param {ChartLocation[]} points - The set of points that forms a pyramid/funnel segment.
     * @returns {void}
     */
    TriangularBase.prototype.setLabelLocation = function (series, point, points) {
        var last = points.length - 1;
        var bottom = series.type === 'Funnel' ? points.length - 2 : points.length - 1;
        var x = (points[0].x + points[bottom].x) / 2;
        var right = (points[1].x + points[bottom - 1].x) / 2;
        point.region = new Rect(x, points[0].y, right - x, points[bottom].y - points[0].y);
        point.symbolLocation = {
            x: point.region.x + point.region.width / 2,
            y: point.region.y + point.region.height / 2
        };
        point.labelOffset = {
            x: point.symbolLocation.x - (points[0].x + points[last].x) / 2,
            y: point.symbolLocation.y - (points[0].y + points[last].y) / 2
        };
    };
    /**
     * Finds the path to connect the list of points.
     *
     * @param {ChartLocation[]} locations - An array of ChartLocation objects representing the points to connect.
     * @param {AccPoints} point - The current AccPoints object containing the data point information.
     * @param {string} path - The initial path string to be modified.
     * @param {number} firstIndex - The index of the first point in the path.
     * @param {number} lastIndex - The index of the last point in the path.
     * @param {AccumulationSeries} series - The series object of the Accumulation.
     * @returns {string} - This string represent the path value of the D attribute.
     * @Private
     */
    TriangularBase.prototype.getPath = function (locations, point, path, firstIndex, lastIndex, series) {
        var length = series.points.length;
        var borderRadius = series.borderRadius;
        var min = Math.min(point.region.width, point.region.height);
        var funnelMinimum = Math.min(series.neckSize.height, series.neckSize.width);
        if (funnelMinimum === 0) {
            funnelMinimum = series.neckSize.height === 0 && series.neckSize.width === 0 ?
                point.region.height : (series.neckSize.width === 0 ? series.neckSize.height : series.neckSize.width);
        }
        borderRadius = borderRadius > min / 2 ? min / 2 : borderRadius;
        if (series.type === 'Funnel') {
            borderRadius = (borderRadius > funnelMinimum / 2) ? funnelMinimum / 2 : borderRadius;
        }
        var angle = Math.atan2(locations[1].x - locations[2].x, locations[1].y - locations[2].y);
        var temp = borderRadius;
        if (series.type === 'Pyramid') {
            borderRadius = (point.index === lastIndex && length !== 1 && firstIndex !== lastIndex) ? 0 : borderRadius;
            path += (locations[0].x - (temp * Math.sin(-angle))) + ' ' + (locations[0].y + (-temp * Math.cos(angle))) + ' Q' + locations[0].x + ' ' + locations[0].y + ' '
                + (locations[0].x + (borderRadius * Math.sin(-angle))) + ' ' + (locations[0].y + (-borderRadius * Math.cos(-angle)));
            path += ' L' + (locations[1].x + (borderRadius * Math.sin(-angle))) + ' ' + (locations[1].y + (-borderRadius * Math.cos(angle)));
            borderRadius = point.index === lastIndex ? temp : 0;
            path += ' L' + (locations[2].x - (temp * Math.sin(-angle))) + ' ' + (locations[2].y - (-temp * Math.cos(angle))) + ' Q' + locations[2].x + ' ' + locations[2].y
                + ' ' + (locations[2].x - borderRadius) + ' ' + locations[2].y;
            path += ' L' + (locations[3].x + borderRadius) + ' ' + locations[3].y + ' Q' + locations[3].x + ' ' + locations[3].y + ' '
                + (locations[3].x + (temp * Math.sin(-angle))) + ' ' + (locations[3].y - (-temp * Math.cos(angle)));
        }
        if (series.type === 'Funnel') {
            borderRadius = (point.index === firstIndex && length !== 1 && firstIndex !== lastIndex) ? 0 : borderRadius;
            path += locations[0].x + (-(borderRadius * Math.sin(-angle))) + ' ' + (locations[0].y + (-borderRadius * Math.cos(angle))) + ' Q' + locations[0].x
                + ' ' + locations[0].y + ' ' + (locations[0].x + borderRadius) + ' ' + locations[0].y;
            path += ' L' + (locations[1].x - borderRadius) + ' ' + locations[1].y + ' Q' + locations[1].x + ' '
                + locations[1].y + ' ' + (locations[1].x - ((borderRadius * Math.sin(angle)))) + ' ' + (locations[1].y + (-borderRadius * Math.cos(angle)));
            borderRadius = point.index === firstIndex ? temp : 0;
            if (series.neckWidth === '0%') {
                var middle = (locations[5].x + (locations[3].x - locations[5].x) / 2);
                path += ' L' + (locations[2].x + (-borderRadius * Math.sin(-angle))) + ' ' + (locations[2].y - (-borderRadius * Math.cos(angle)))
                    + ' Q' + middle + ' ' + locations[2].y + ' ' + (locations[5].x - (-borderRadius * Math.sin(-angle))) + ' ' + (locations[2].y - (-borderRadius * Math.cos(angle)));
            }
            else {
                path = series.neckHeight !== '0%' && locations[2].y !== locations[3].y ? path += ' L' + locations[2].x + ' ' + (locations[2].y) : path;
                var tempX = series.neckHeight === '0%' ? ((borderRadius * Math.sin(-angle))) : 0;
                var tempY = series.neckHeight === '0%' ? (-borderRadius * Math.cos(angle)) : borderRadius;
                path += ' L' + (locations[3].x - (tempX)) + ' ' + (locations[3].y - (tempY)) + ' Q' + locations[3].x + ' ' + locations[3].y + ' '
                    + (locations[3].x - tempY) + ' ' + locations[3].y;
                path += ' L' + (locations[4].x + tempY) + ' ' + locations[4].y + ' Q' + locations[4].x + ' ' + locations[4].y + ' '
                    + (locations[4 + 1].x + tempX) + ' ' + (locations[4].y - tempY);
                path = series.neckHeight !== '0%' && locations[4].y !== locations[5].y ? path += ' L' + locations[5].x + ' ' + (locations[5].y) : path;
            }
        }
        return path;
    };
    /**
     * Creates a path to connect a list of points.
     *
     * @param {ChartLocation[]} locations - An array of ChartLocation objects representing the points to connect.
     * @param {AccPoints} point - The current AccPoints object containing the data point information.
     * @param {AccumulationSeries} series - The series object of the Accumulation.
     * @returns {string} - This string represent the path value of the D attribute.
     * @Private
     */
    TriangularBase.prototype.findPath = function (locations, point, series) {
        var path = 'M ';
        var firstIndex = -1;
        var lastIndex = -1;
        for (var index = 0; index < series.points.length; index++) {
            if (series.points[index].visible) {
                if (firstIndex === -1) {
                    firstIndex = index;
                }
                lastIndex = index;
            }
        }
        if (series.borderRadius && (point.index === lastIndex || point.index === firstIndex)) {
            path = this.getPath(locations, point, path, firstIndex, lastIndex, series);
        }
        else {
            for (var i = 0; i < locations.length; i++) {
                path += locations[i].x + ' ' + locations[i].y;
                if (i !== locations.length - 1) {
                    path += ' L ';
                }
            }
        }
        return path + ' Z ';
    };
    /**
     * To calculate data-label bounds.
     *
     * @private
     * @param {AccumulationSeries} series - The series for which to calculate data-label bounds.
     * @param {boolean} visible - Specifies whether the data-labels are visible.
     * @param {AccumulationLabelPosition} position - The position of the data-labels.
     * @param {AccumulationChart} chart - The accumulation chart control.
     * @returns {void}
     */
    TriangularBase.prototype.defaultLabelBound = function (series, visible, position, chart) {
        var x = (chart.initialClipRect.width - series.triangleSize.width) / 2;
        var y = (chart.initialClipRect.height - series.triangleSize.height) / 2;
        var accumulationBound = new Rect(x, y, series.triangleSize.width, series.triangleSize.height);
        series.labelBound = new Rect(accumulationBound.x, accumulationBound.y, accumulationBound.width + accumulationBound.x, accumulationBound.height + accumulationBound.y);
        series.accumulationBound = accumulationBound;
        if (visible && position === 'Outside') {
            series.labelBound = new Rect(Infinity, Infinity, -Infinity, -Infinity);
        }
    };
    return TriangularBase;
}(AccumulationBase));
export { TriangularBase };
