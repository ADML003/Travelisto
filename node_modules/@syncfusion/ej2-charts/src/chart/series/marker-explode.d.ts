import { ChartLocation } from '../../common/utils/helper';
import { Chart } from '../chart';
import { Series, Points } from './chart-series';
import { ChartData } from '../../chart/utils/get-data';
/**
 * The `Marker` module is used to render markers for line-type series.
 *
 * @private
 */
export declare class MarkerExplode extends ChartData {
    private markerExplode;
    private isRemove;
    /** @private */
    elementId: string;
    /**
     * Constructor for the marker module.
     *
     * @private
     */
    constructor(chart: Chart);
    /**
     * Adds event listeners for the series.
     *
     * @returns {void}
     * @private
     */
    addEventListener(): void;
    /**
     * Removes event listeners for the series.
     *
     * @private
     *
     * @returns {void}
     */
    removeEventListener(): void;
    /**
     * Handles the mouse up event.
     *
     * @returns {void}
     */
    private mouseUpHandler;
    /**
     * Handles the mouse move event.
     *
     * @returns {void}
     * @private
     */
    mouseMoveHandler(): void;
    markerMove(remove: boolean): void;
    private animationDuration;
    private drawTrackBall;
    /**
     * Perform animation for the series.
     *
     * @param {Series} series - The series to animate.
     * @param {Points} point - The point to animate.
     * @param {boolean} [endAnimate=false] - Flag to indicate if the animation is ending.
     * @returns {void}
     * @private
     */
    doAnimation(series: Series, point: Points, endAnimate?: boolean): void;
    /**
     * Perform animation for the trackball.
     *
     * @param {Element} elements - The elements to animate.
     * @param {number} delays - The delay duration for the animation.
     * @param {number} durations - The duration of the animation.
     * @param {Series} series - The series associated with the trackball.
     * @param {number} pointIndex - The index of the point to animate.
     * @param {ChartLocation} point - The location of the point to animate.
     * @param {boolean} isLabel - Flag to indicate if the animated element is a label.
     * @param {boolean} [endAnimate=false] - Flag to indicate if the animation is ending.
     * @param {boolean} [isRemove=false] - Flag to indicate if element need to remove.
     * @returns {void}
     * @private
     */
    trackballAnimate(elements: Element, delays: number, durations: number, series: Series, pointIndex: number, point: ChartLocation, isLabel: boolean, endAnimate: boolean, isRemove?: boolean): void;
    /**
     * Remove the highlighted marker.
     *
     * @param {Series} [series=null] - The series associated with the marker to remove. Defaults to null.
     * @param {Points} [point=null] - The point associated with the marker to remove. Defaults to null.
     * @param {boolean} [fadeOut=false] - Flag to indicate if the removal should be faded out. Defaults to false.
     * @returns {void}
     * @private
     */
    removeHighlightedMarker(series?: Series, point?: Points, fadeOut?: boolean): void;
}
