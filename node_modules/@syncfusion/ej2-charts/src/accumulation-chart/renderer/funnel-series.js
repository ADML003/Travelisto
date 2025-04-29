/**
 * Defines the behavior of a funnel series
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
import { PathOption, Rect } from '@syncfusion/ej2-svg-base';
import { appendChildElement, colorNameToHex, convertHexToColor, getElement, removeElement } from '../../common/utils/helper';
import { TriangularBase } from './triangular-base';
/**
 * The `FunnelSeries` module is used to render the `Funnel` Series.
 */
var FunnelSeries = /** @class */ (function (_super) {
    __extends(FunnelSeries, _super);
    function FunnelSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Defines the path of a funnel segment
     *
     * @private
     * @param {AccPoints} point - The point data.
     * @param {AccumulationSeries} series - The series for which the segment is rendered.
     * @param {AccumulationChart} chart - The accumulation chart control.
     * @returns {string} - Get segment data.
     */
    FunnelSeries.prototype.getSegmentData = function (point, series, chart) {
        var lineWidth;
        var topRadius;
        var bottomRadius;
        var endTop;
        var endBottom;
        var minRadius;
        var endMin;
        var bottomY;
        var area = series.triangleSize;
        var offset = 0;
        var extraSpace = (chart.initialClipRect.width - series.triangleSize.width) / 2;
        var emptySpaceAtLeft = extraSpace + chart.initialClipRect.x;
        var seriesTop = chart.initialClipRect.y + (chart.initialClipRect.height - area.height) / 2;
        //defines the top and bottom of a segment
        var top = point.yRatio * area.height;
        var bottom = top + point.heightRatio * area.height;
        var neckSize = series.neckSize;
        lineWidth = neckSize.width + (area.width - neckSize.width) * ((area.height - neckSize.height - top) /
            (area.height - neckSize.height));
        topRadius = (area.width / 2) - lineWidth / 2;
        //Calculating the middle slope change and bottom
        endTop = topRadius + lineWidth;
        if (bottom > area.height - neckSize.height || area.height === neckSize.height) {
            lineWidth = neckSize.width;
        }
        else {
            lineWidth = neckSize.width + (area.width - neckSize.width) *
                ((area.height - neckSize.height - bottom) / (area.height - neckSize.height));
        }
        bottomRadius = (area.width / 2) - (lineWidth / 2);
        endBottom = bottomRadius + lineWidth;
        if (top >= area.height - neckSize.height) {
            topRadius = bottomRadius = minRadius = (area.width / 2) - neckSize.width / 2;
            endTop = endBottom = endMin = (area.width / 2) + neckSize.width / 2;
        }
        else if (bottom > (area.height - neckSize.height)) {
            minRadius = bottomRadius = (area.width / 2) - lineWidth / 2;
            endMin = endBottom = minRadius + lineWidth;
            bottomY = area.height - neckSize.height;
        }
        top += seriesTop;
        bottom += seriesTop;
        bottomY += seriesTop;
        var line1 = { x: emptySpaceAtLeft + offset + topRadius, y: top };
        var line2 = { x: emptySpaceAtLeft + offset + endTop, y: top };
        var line4 = { x: emptySpaceAtLeft + offset + endBottom, y: bottom };
        var line5 = { x: emptySpaceAtLeft + offset + bottomRadius, y: bottom };
        var line3 = { x: emptySpaceAtLeft + offset + endBottom, y: bottom };
        var line6 = { x: emptySpaceAtLeft + offset + bottomRadius, y: bottom };
        if (bottomY) {
            line3 = { x: emptySpaceAtLeft + offset + endMin, y: bottomY };
            line6 = { x: emptySpaceAtLeft + offset + minRadius, y: bottomY };
        }
        var polygon = [line1, line2, line3, line4, line5, line6];
        this.setLabelLocation(series, point, polygon);
        var direction = this.findPath(polygon, point, series);
        return direction;
    };
    /**
     * Renders a funnel segment.
     *
     * @private
     * @param {AccPoints} point - The point data.
     * @param {AccumulationSeries} series - The series for which the segment is rendered.
     * @param {AccumulationChart} chart - The accumulation chart control.
     * @param {PathOption} options - The rendering options for the segment.
     * @param {Element} seriesGroup - The group element to contain the funnel segments.
     * @param {boolean} redraw - Specifies whether to redraw the segment.
     * @param {string} previousRadius - Specifies the previous radius of the pie when animating the individual series point.
     * @param {Object[]} previousCenter - Specifies the previous center of the pie when animating the individual series point.
     * @param {boolean} pointAnimation - Specifies whether the point based animation is enabled.
     * @returns {void}
     */
    FunnelSeries.prototype.renderPoint = function (point, series, chart, options, seriesGroup, redraw, previousRadius, previousCenter, pointAnimation) {
        if (!point.visible) {
            removeElement(options.id);
            return null;
        }
        var previousDirection;
        var direction = this.getSegmentData(point, series, chart);
        point.midAngle = 0;
        options.d = direction;
        if (pointAnimation && document.getElementById(options.id)) {
            previousDirection = document.getElementById(options.id).getAttribute('d');
        }
        var element = chart.renderer.drawPath(options);
        element.setAttribute('role', series.accessibility.accessibilityRole ? series.accessibility.accessibilityRole : 'img');
        element.setAttribute('tabindex', (point.index === 0 && series.accessibility.focusable) ? String(series.accessibility.tabIndex) : '-1');
        element.setAttribute('aria-label', series.accessibility.accessibilityDescription ? series.accessibility.accessibilityDescription : (point.x + ':' + point.y + '%. ' + series.name));
        appendChildElement(false, seriesGroup, element, redraw, pointAnimation ? pointAnimation : undefined, pointAnimation ? 'x' : undefined, pointAnimation ? 'y' : undefined, undefined, pointAnimation ? previousDirection : undefined, undefined, undefined, undefined, pointAnimation ? chart.duration : undefined);
        if (point.isExplode) {
            chart.accBaseModule.explodePoints(point.index, chart, true);
        }
    };
    /**
     * Renders the Trapezoidal funnel series in an accumulation chart.
     *
     * @param {AccumulationSeries} series - The series data for the Trapezoidal  funnel.
     * @param {AccPoints[]} points - The data points for the series.
     * @param {AccumulationChart} chart - The instance of the accumulation chart.
     * @param {PathOption[]} options - The path options for rendering the Trapezoidal funnel.
     * @param {Element} seriesGroup - The group element for the series.
     * @param {boolean} redraw - Specifies whether to redraw the series.
     * @returns {void} - This method does not return a value.
     */
    FunnelSeries.prototype.renderTrapezoidalFunnel = function (series, points, chart, options, seriesGroup, redraw) {
        var funnelWidth = series.triangleSize.width;
        var funnelHeight = series.triangleSize.height;
        var horizontalMargin = (chart.initialClipRect.width - funnelWidth) / 2;
        var leftMargin = horizontalMargin + chart.initialClipRect.x;
        var funnelTop = chart.initialClipRect.y + (chart.initialClipRect.height - funnelHeight) / 2;
        var maxPointValue = Math.max.apply(Math, points.map(function (d) { return d.y; }));
        var barPadding = 10;
        var currentVerticalOffset = 0;
        var polygonGroup = redraw ? getElement(chart.element.id + '_Series_' + series.index + '_Polygon') :
            chart.renderer.createGroup({ id: chart.element.id + '_Series_' + series.index + '_Polygon' });
        for (var i = 0; i < series.points.length; i++) {
            var point = series.points[i];
            var pathOption = options[point.index];
            if (!point.visible) {
                removeElement(pathOption.id);
                removeElement(pathOption.id + '_polygon');
                continue;
            }
            var availableHeight = funnelHeight - barPadding * (points.length - 1);
            var barHeight = availableHeight / points.length;
            var barWidth = funnelWidth * (point.y / maxPointValue);
            var visiblePointIndex = points.indexOf(point);
            var nextBarWidth = visiblePointIndex < points.length - 1 ?
                funnelWidth * (points[visiblePointIndex + 1].y / maxPointValue) : 0;
            var x = leftMargin + (funnelWidth - barWidth) / 2;
            var y = funnelTop + currentVerticalOffset;
            var cornerRadius = Math.min(series.borderRadius, barHeight / 2);
            var rectPath = 'M' + (x + cornerRadius) + ' ' + y + ' ' +
                'L' + (x + barWidth - cornerRadius) + ' ' + y + ' ' +
                'A' + cornerRadius + ' ' + cornerRadius + ' 0 0 1 ' + (x + barWidth) + ' ' + (y + cornerRadius) + ' ' +
                'L' + (x + barWidth) + ' ' + (y + barHeight - cornerRadius) + ' ' +
                'A' + cornerRadius + ' ' + cornerRadius + ' 0 0 1 ' + (x + barWidth - cornerRadius) + ' ' + (y + barHeight) + ' ' +
                'L' + (x + cornerRadius) + ' ' + (y + barHeight) + ' ' +
                'A' + cornerRadius + ' ' + cornerRadius + ' 0 0 1 ' + x + ' ' + (y + barHeight - cornerRadius) + ' ' +
                'L' + x + ' ' + (y + cornerRadius) + ' ' +
                'A' + cornerRadius + ' ' + cornerRadius + ' 0 0 1 ' + (x + cornerRadius) + ' ' + y + ' ' +
                'Z';
            point.midAngle = 0;
            pathOption.d = rectPath;
            var element = chart.renderer.drawPath(pathOption);
            element.setAttribute('role', series.accessibility.accessibilityRole ? series.accessibility.accessibilityRole : 'img');
            element.setAttribute('tabindex', (point.index === 0 && series.accessibility.focusable) ? String(series.accessibility.tabIndex) : '-1');
            element.setAttribute('aria-label', series.accessibility.accessibilityDescription ? series.accessibility.accessibilityDescription : (point.x + ':' + point.y + '%. ' + series.name));
            appendChildElement(false, seriesGroup, element, redraw);
            if (visiblePointIndex < points.length - 1) {
                var polygonOption = new PathOption(pathOption.id + '_polygon', this.lightenColor(pathOption.fill), pathOption['stroke-width'] * 0.4, this.lightenColor(pathOption.stroke), pathOption.opacity, pathOption['stroke-dasharray'], '');
                var trapezoidPoints = [
                    [(funnelWidth - barWidth) / 2 + leftMargin + cornerRadius, y + barHeight],
                    [(funnelWidth + barWidth) / 2 + leftMargin - cornerRadius, y + barHeight],
                    [(funnelWidth + nextBarWidth) / 2 + leftMargin, y + barHeight + barPadding],
                    [(funnelWidth - nextBarWidth) / 2 + leftMargin, y + barHeight + barPadding]
                ];
                var trapezoidPath = '' +
                    'M' + trapezoidPoints[0][0] + ' ' + trapezoidPoints[0][1] + ' ' +
                    'L' + trapezoidPoints[1][0] + ' ' + trapezoidPoints[1][1] + ' ' +
                    'L' + trapezoidPoints[2][0] + ' ' + trapezoidPoints[2][1] + ' ' +
                    'L' + trapezoidPoints[3][0] + ' ' + trapezoidPoints[3][1] + ' ' + 'Z';
                polygonOption.d = trapezoidPath;
                var polygon = chart.renderer.drawPath(polygonOption);
                appendChildElement(false, polygonGroup, polygon, redraw);
            }
            else {
                removeElement(pathOption.id + '_polygon');
            }
            currentVerticalOffset += barHeight + barPadding;
            point.region = new Rect(x, y, barWidth, barHeight);
            point.symbolLocation = {
                x: point.region.x + point.region.width / 2,
                y: point.region.y + point.region.height / 2
            };
            point.labelOffset = {
                x: point.symbolLocation.x + point.region.width / 2,
                y: point.symbolLocation.y + point.region.height / 2
            };
            if (point.isExplode) {
                chart.accBaseModule.explodePoints(point.index, chart, true);
            }
        }
        appendChildElement(false, chart.getSeriesElement(), seriesGroup, redraw);
        appendChildElement(false, chart.getSeriesElement(), polygonGroup, redraw);
    };
    /**
     * Function to lighten a color by blending it with white.
     *
     * @param {string} color - The main color in hex format (e.g., '#1e90ff').
     * @returns {string} - The lightened color in hex format.
     */
    FunnelSeries.prototype.lightenColor = function (color) {
        var rgbValue = convertHexToColor(colorNameToHex(color));
        return 'rgb(' + rgbValue.r + ',' + rgbValue.g + ',' + rgbValue.b + ',' + 0.4 + ')';
    };
    /**
     * To get the module name of the funnel series.
     *
     * @returns {string} - Get module name.
     */
    FunnelSeries.prototype.getModuleName = function () {
        return 'FunnelSeries';
    };
    /**
     * To destroy the funnel series.
     *
     * @returns {void} Destroy method.
     * @private
     */
    FunnelSeries.prototype.destroy = function () {
        /**
         * Destroys the funnel series.
         */
    };
    return FunnelSeries;
}(TriangularBase));
export { FunnelSeries };
