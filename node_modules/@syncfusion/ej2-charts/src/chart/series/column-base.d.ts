import { DoubleRange } from '../utils/double-range';
import { PathOption, Rect } from '@syncfusion/ej2-svg-base';
import { Series, Points } from './chart-series';
import { BorderModel } from '../../common/model/base-model';
import { IPointRenderEventArgs } from '../../chart/model/chart-interface';
import { CylinderSeriesOption } from './column-series';
/**
 * Base class for column series.
 * This class provides common properties and methods for column series in the chart.
 *
 * @private
 */
export declare class ColumnBase {
    /**
     * To get the position of the column series.
     *
     * @returns {DoubleRange} doubleRange
     * @private
     */
    options: PathOption;
    element: HTMLElement;
    protected getSideBySideInfo(series: Series): DoubleRange;
    /**
     * Gets the rectangle bounds based on two points.
     *
     * @param {number} x1 - The x-coordinate of the first point.
     * @param {number} y1 - The y-coordinate of the first point.
     * @param {number} x2 - The x-coordinate of the second point.
     * @param {number} y2 - The y-coordinate of the second point.
     * @param {Series} series - The series associated with the rectangle.
     * @returns {Rect} - The rectangle bounds.
     */
    protected getRectangle(x1: number, y1: number, x2: number, y2: number, series: Series): Rect;
    /**
     * Draws a cylinder using the provided options and element.
     *
     * @param {PathOption} options - The path options for drawing the cylinder.
     * @param {HTMLElement} element - The HTML element to which the cylinder is drawn.
     * @param {CylinderSeriesOption} cylinderSeriesOption - The options specific to the cylinder series.
     * @param {Rect} rect - The rectangle bounds within which the cylinder is drawn.
     * @param {Series} series - The series associated with the cylinder.
     * @returns {void}
     */
    protected drawCylinder(options: PathOption, element: HTMLElement, cylinderSeriesOption: CylinderSeriesOption, rect: Rect, series: Series): void;
    /**
     * Draws a gradient using the provided options and gradient element.
     *
     * @param {OptionGradient} optiong - The gradient options for drawing the gradient.
     * @param {Object} gradientElement - The gradient element to which the gradient is applied.
     * @param {Series} series - The series associated with the gradient.
     * @returns {void}
     */
    private drawGradient;
    /**
     * To get the position of each series.
     *
     * @param {Series} series - The series for which side-by-side positions are calculated.
     * @returns {void}
     * @private
     */
    private getSideBySidePositions;
    private findRectPosition;
    /**
     * Updates the location of the symbol based on the point and rect coordinates.
     *
     * @param {Points} point - The point for which the symbol location is updated.
     * @param {Rect} rect - The rect representing the symbol location.
     * @param {Series} series - The series to which the point belongs.
     * @returns {void}
     */
    protected updateSymbolLocation(point: Points, rect: Rect, series: Series): void;
    /**
     * Updates the x-region of the symbol based on the point and rect coordinates.
     *
     * @param {Points} point - The point for which the x-region is updated.
     * @param {Rect} rect - The rect representing the x-region.
     * @param {Series} series - The series to which the point belongs.
     * @returns {void}
     */
    protected updateXRegion(point: Points, rect: Rect, series: Series): void;
    /**
     * Updates the y-region of the symbol based on the point and rect coordinates.
     *
     * @param {Points} point - The point for which the y-region is updated.
     * @param {Rect} rect - The rect representing the y-region.
     * @param {Series} series - The series to which the point belongs.
     * @returns {void}
     */
    protected updateYRegion(point: Points, rect: Rect, series: Series): void;
    /**
     * To render the marker for the series.
     *
     * @param {Series} series - The series for which markers are rendered.
     * @returns {void}
     * @private
     */
    renderMarker(series: Series): void;
    /**
     * To get the marker region when Y value is 0
     *
     * @param {Points} point point
     * @param {rect} rect rect
     * @param {Series} series series
     * @returns {void}
     */
    private getRegion;
    /**
     * Triggers the point render event.
     *
     * @param {Series} series - The series associated with the point.
     * @param {Points} point - The data point for which the event is triggered.
     * @param {string} fill - The fill color of the point.
     * @param {BorderModel} border - The border settings of the point.
     * @returns {IPointRenderEventArgs} - The event arguments.
     */
    protected triggerEvent(series: Series, point: Points, fill: string, border: BorderModel): IPointRenderEventArgs;
    /**
     * Draws a rectangle for the data point.
     *
     * @param {Series} series - The series associated with the point.
     * @param {Points} point - The data point for which the rectangle is drawn.
     * @param {Rect} rect - The rect bounds.
     * @param {IPointRenderEventArgs} argsData - The event arguments.
     * @returns {void}
     */
    protected drawRectangle(series: Series, point: Points, rect: Rect, argsData: IPointRenderEventArgs): void;
    /**
     * To animate the series.
     *
     * @param {Series} series - The series to be animated.
     * @returns {void}
     * @private
     */
    animate(series: Series): void;
    /**
     * Animates the rect element.
     *
     * @param {HTMLElement} element - The rect element to be animated.
     * @param {Series} series - The series associated with the rect.
     * @param {Points} point - The data point associated with the rect.
     * @returns {void}
     */
    private animateRect;
    /**
     * Calculates the path for a rounded rectangle.
     *
     * @param {Rect} rect - The bounding rectangle.
     * @param {number} topLeft - The radius of the top-left corner.
     * @param {number} topRight - The radius of the top-right corner.
     * @param {number} bottomLeft - The radius of the bottom-left corner.
     * @param {number} bottomRight - The radius of the bottom-right corner.
     * @param {boolean} inverted - Indicates whether the rectangle is inverted.
     * @returns {string} The SVG path string representing the rounded rectangle.
     */
    private calculateRoundedRectPath;
}
export interface RectPosition {
    position: number;
    rectCount: number;
}
export interface OptionGradient {
    id: string;
    x1: string;
    y1: string;
    x2: string;
    y2: string;
}
export interface GradientStop {
    colorStop: string;
    color: string;
}
