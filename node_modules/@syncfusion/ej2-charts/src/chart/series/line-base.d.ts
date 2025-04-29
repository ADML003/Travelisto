import { ChartLocation } from '../../common/utils/helper';
import { PathAttributes, PathOption } from '@syncfusion/ej2-svg-base';
import { Axis } from '../axis/axis';
import { Series, Points } from './chart-series';
import { Chart } from '../chart';
import { AnimationModel } from '../../common/model/base-model';
import { StepPosition } from '../utils/enum';
/**
 * Base class for line-type series.
 * This class provides common properties and methods for line-type series in the chart.
 *
 * @private
 */
export declare class LineBase {
    chart: Chart;
    private previousX;
    private previousY;
    /**
     * Initializes the tooltip module for the chart.
     *
     * @param {Chart} [chartModule] - The chart instance to which the tooltip module is initialized.
     */
    constructor(chartModule?: Chart);
    /**
     * Enhances the performance of the chart by enabling complex properties.
     *
     * @param {Series} series - The series for which complex properties are enabled.
     * @returns {Points[]} An array of points.
     * @private
     */
    enableComplexProperty(series: Series): Points[];
    /**
     * To generate the line path direction.
     *
     * @param {Points} firstPoint firstPoint
     * @param {Points} secondPoint secondPoint
     * @param {Series} series series
     * @param {boolean} isInverted isInverted
     * @param {Function} getPointLocation getPointLocation
     * @param {string} startPoint startPoint
     * @returns {string} get line path direction
     * @private
     */
    getLineDirection(firstPoint: Points, secondPoint: Points, series: Series, isInverted: boolean, getPointLocation: Function, startPoint: string): string;
    /**
     * Appends a line path to the chart.
     *
     * @param {PathOption} options - The options for the path.
     * @param {Series} series - The series to which the path belongs.
     * @param {string} clipRect - The clipping rectangle for the path.
     * @returns {void}
     * @private
     */
    appendLinePath(options: PathOption, series: Series, clipRect: string): void;
    appendPathElement(options: PathOption | PathAttributes, series: Series, clipRect: string): {
        element: Element;
        previousDirection: string;
        chart: Chart;
    };
    /**
     * Adds a line path to equate the start and end paths.
     *
     * @param {PathOption} options - The options for the path.
     * @param {Series} series - The series to which the path belongs.
     * @param {string} clipRect - The clip rectangle for the path.
     * @returns {void}
     * @private
     */
    addPath(options: PathOption, series: Series, clipRect: string): void;
    /**
     * Adds a area path to equate the start and end paths.
     *
     * @param {PathOption} options - The options for the path.
     * @param {Series} series - The series to which the path belongs.
     * @param {string} clipRect - The clip rectangle for the path.
     * @returns {void}
     * @private
     */
    addAreaPath(options: PathOption, series: Series, clipRect: string): void;
    /**
     * To render the marker for the series.
     *
     * @param {Series} series - The series for which markers are rendered.
     * @returns {void}
     * @private
     */
    renderMarker(series: Series): void;
    /**
     * Executes progressive animation for the series.
     *
     * @param {Series} series - The series for which progressive animation is executed.
     * @param {AnimationModel} option - The animation option.
     * @returns {void}
     * @private
     */
    doProgressiveAnimation(series: Series, option: AnimationModel): void;
    /**
     * To store the symbol location and region.
     *
     * @param {Points} point point
     * @param {Series} series series
     * @param {boolean} isInverted isInverted
     * @param {Function} getLocation getLocation
     * @returns {void}
     * @private
     */
    storePointLocation(point: Points, series: Series, isInverted: boolean, getLocation: Function): void;
    /**
     * Checks if the y-value of a point falls within the y-axis range.
     *
     * @param {Points} point - The point to be checked.
     * @param {Axis} yAxis - The y-axis.
     * @returns {boolean} - Returns true if the y-value falls within the y-axis range, otherwise false.
     * @private
     */
    withinYRange(point: Points, yAxis: Axis): boolean;
    GetStepLineDirection(currentPoint: ChartLocation, previousPoint: ChartLocation, stepLineType: StepPosition, command: string, series: Series, isBorder?: boolean): string;
    /**
     * Gets the first and last visible points from a collection of points.
     *
     * @param {Points[]} points - Collection of points.
     * @returns {{ first: Points, last: Points }} - Returns an object containing the first and last visible points.
     * @private
     */
    getFirstLastVisiblePoint(points: Points[]): {
        first: Points;
        last: Points;
    };
    /**
     * Gets the border direction based on the provided direction.
     *
     * @param {string} direction - The direction string.
     * @returns {string} - Returns the border direction.
     * @private
     */
    getBorderDirection(direction: string): string;
    /**
     * Removes the border from the empty points based on the provided border direction.
     *
     * @param {string} borderDirection - The border direction.
     * @returns {string} - Returns the updated border direction.
     * @private
     */
    removeEmptyPointsBorder(borderDirection: string): string;
    /**
     * Performs linear animation for the series based on the provided animation model.
     *
     * @param {Series} series - The series to animate.
     * @param {AnimationModel} animation - The animation model containing animation details.
     * @returns {void}
     * @private
     */
    doLinearAnimation(series: Series, animation: AnimationModel): void;
    /**
     * Animates the given clip rectangle with the specified animation parameters.
     *
     * @param {Series} series - The series to which the clip rectangle belongs.
     * @param {AnimationModel} animation - The animation model containing animation details.
     * @param {HTMLElement} clipRect - The clip rectangle to animate.
     * @param {number} duration - The duration of the animation.
     * @param {Function} effect - The animation function to use.
     * @param {number} elementHeight - The height of the clip rectangle element.
     * @param {number} elementWidth - The width of the clip rectangle element.
     * @param {number} xCenter - The x-coordinate of the clip rectangle's center.
     * @param {number} yCenter - The y-coordinate of the clip rectangle's center.
     * @param {number} value - The animation value.
     * @returns {void}
     */
    private animateRect;
}
