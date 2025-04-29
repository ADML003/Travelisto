import { ChartLocation } from '../../common/utils/helper';
import { AccumulationChart } from '../accumulation';
/**
 * The `AccumulationBase` class is used to perform base calculations for accumulation charts.
 *
 * @private
 */
export declare class AccumulationBase {
    /** @private */
    constructor(accumulation: AccumulationChart);
    private pieCenter;
    /**
     * Gets the center of the pie.
     *
     * @private
     * @returns {ChartLocation} - The center of the pie.
     */
    /**
    * Sets the center of the pie.
    *
    * @private
    * @param {ChartLocation} value - The center point to set.
    */
    center: ChartLocation;
    private pieRadius;
    /**
     * Gets the radius of the pie.
     *
     * @private
     * @returns {number} - The radius of the pie.
     */
    /**
    * Sets the radius of the pie.
    *
    * @private
    * @param {number} value - The radius value to set.
    */
    radius: number;
    private pieLabelRadius;
    /**
     * Gets the label radius of the pie.
     *
     * @private
     * @returns {number} - The label radius of the pie.
     */
    /**
    * Sets the label radius of the pie.
    *
    * @private
    * @param {number} value - The label radius value to set.
    */
    labelRadius: number;
    /** @private */
    protected accumulation: AccumulationChart;
    /**
     * Checks whether the series is circular or not.
     *
     * @private
     * @returns {boolean} - True if the series is circular, otherwise false.
     */
    protected isCircular(): boolean;
    /**
     * To check various radius pie.
     *
     * @private
     * @returns {boolean} - True if various radius is enabled, otherwise false.
     */
    protected isVariousRadius(): boolean;
    /**
     * To process the explode on accumulation chart loading.
     *
     * @private
     * @param {Event} event - The event triggered during loading.
     * @returns {void}
     */
    processExplode(event: Event): void;
    /**
     * To invoke the explode on accumulation chart loading.
     *
     * @private
     * @returns {void}
     */
    invokeExplode(): void;
    /**
     * To deExplode all points in the series.
     *
     * @private
     * @param {number} index - The index of the point to explode.
     * @param {number} animationDuration - The duration of the animation.
     * @returns {void}
     */
    deExplodeAll(index: number, animationDuration: number): void;
    /**
     * To explode point by index.
     *
     * @private
     * @param {number} index - The index of the point to explode.
     * @param {AccumulationChart} chart - The accumulation chart control.
     * @param {boolean} explode - Specifies whether to explode the point (default: false).
     * @param {boolean} pointAnimation - Specifies whether the point based animation is enabled.
     * @returns {void}
     */
    explodePoints(index: number, chart: AccumulationChart, explode?: boolean, pointAnimation?: boolean): void;
    private getSum;
    private clubPointExplode;
    /**
     * To Explode points.
     *
     * @param {number} index - Index of a point.
     * @param {AccPoints} point - To get the point of explode.
     * @param {number} duration - Duration of the explode point.
     * @param {boolean} explode - Either true or false.
     * @param {boolean} pointAnimation - Specifies whether the point based animation is enabled.
     * @returns {void}
     */
    private pointExplode;
    /**
     * To check point is exploded by id.
     *
     * @param {string} id - The id of the point to check.
     * @returns {boolean} - True if the point is exploded, otherwise false.
     */
    private isExplode;
    /**
     * To deExplode the point by index.
     *
     * @param {number} index - The index of the point.
     * @param {string} sliceId - The id of the slice.
     * @param {number} animationDuration - The duration of the animation.
     * @returns {void}
     */
    private deExplodeSlice;
    /**
     * To translate the point elements by index and position.
     *
     * @param {number} index - The index of the point.
     * @param {string} sliceId - The id of the slice.
     * @param {string} position - The position to translate the point to.
     * @param {string} transform - The transformation to apply to the point.
     * @returns {void}
     */
    private setTranslate;
    /**
     * To translate the point element by id and position.
     *
     * @param {string} id - The id of the point element.
     * @param {string} position - The position to translate the point to.
     * @returns {void}
     */
    private setElementTransform;
    /**
     * To translate the point elements by index position.
     *
     * @param {number} index - The index of the point.
     * @param {ChartLocation} translate - The translation values (x, y).
     * @param {string} sliceId - The id of the slice.
     * @param {ChartLocation} center - The center point of the accumulation chart.
     * @param {number} animationDuration - The duration of the animation.
     * @param {boolean} pointAnimation - Specifies whether the point based animation is enabled.
     * @returns {void}
     */
    private explodeSlice;
    /**
     * To Perform animation point explode.
     *
     * @param {number} index - Index of the series.
     * @param {string} sliceId - ID of the series.
     * @param {number} startX - X value of start.
     * @param {number} startY - Y value of start.
     * @param {number} endX - X value of end.
     * @param {number} endY - Y value of end.
     * @param {number} duration - Duration of the animation.
     * @param {boolean} isReverse - Duration of the animation.
     * @returns {void}
     */
    private performAnimation;
}
