import { ChartLocation } from '../../common/utils/helper';
import { PathOption } from '@syncfusion/ej2-svg-base';
import { Chart } from '../chart';
import { Series, Points } from './chart-series';
import { Axis } from '../../chart/axis/axis';
import { LineBase } from './line-base';
import { ChartSegmentModel } from './chart-series-model';
/**
 * Base class for multi-colored series.
 *
 * @private
 */
export declare class MultiColoredSeries extends LineBase {
    /**
     * To generate the area path direction.
     *
     * @param {number} xValue xValue
     * @param {number} yValue yValue
     * @param {Series} series series
     * @param {boolean} isInverted isInverted
     * @param {Function} getPointLocation getPointLocation
     * @param {ChartLocation} startPoint startPoint
     * @param {string} startPath startPath
     * @returns {string} Returns the area path direction.
     * @private
     */
    getAreaPathDirection(xValue: number, yValue: number, series: Series, isInverted: boolean, getPointLocation: Function, startPoint: ChartLocation, startPath: string): string;
    /**
     * To generate the empty point direction.
     *
     * @param {ChartLocation} firstPoint firstPoint
     * @param {ChartLocation} secondPoint secondPoint
     * @param {Series} series series
     * @param {boolean} isInverted isInverted
     * @param {Function} getPointLocation getPointLocation
     * @returns {string} Returns the empty point direction.
     * @private
     */
    getAreaEmptyDirection(firstPoint: ChartLocation, secondPoint: ChartLocation, series: Series, isInverted: boolean, getPointLocation: Function): string;
    /**
     * Set the color for a point based on its current state and previous state.
     *
     * @param {Points} currentPoint - The current point whose color needs to be set.
     * @param {Points} previous - The previous state of the point.
     * @param {Series} series - The series associated with the point.
     * @param {boolean} isXSegment - Indicates whether the point is in the x-segment.
     * @param {ChartSegmentModel[]} segments - The segments associated with the point.
     * @returns {boolean} - Returns true if the color is set successfully, false otherwise.
     * @private
     */
    setPointColor(currentPoint: Points, previous: Points, series: Series, isXSegment: boolean, segments: ChartSegmentModel[]): boolean;
    sortSegments(series: Series, chartSegments: ChartSegmentModel[]): ChartSegmentModel[];
    /**
     * Segment calculation performed here.
     *
     * @param {Series} series series
     * @param {PathOption[]} options options
     * @param {ChartSegmentModel[]} segments chartSegments
     * @param {boolean} pointAnimate pointAnimate
     * @returns {void}
     * @private
     */
    applySegmentAxis(series: Series, options: PathOption[], segments: ChartSegmentModel[], pointAnimate?: boolean): void;
    private includeSegment;
    private addMulticolorPath;
    /**
     * To create clip rect for segment axis.
     *
     * @param {number} startValue startValue
     * @param {number} endValue endValue
     * @param {Series} series series
     * @param {number} index index
     * @param {boolean} isX isX
     * @returns {string} clip rect for segment axis
     * @private
     */
    createClipRect(startValue: number, endValue: number, series: Series, index: number, isX: boolean): string;
    /**
     * To get exact value from segment value.
     *
     * @param {Object} segmentValue segmentValue
     * @param {Axis} axis axis
     * @param {Chart} chart chart
     * @returns {number} - Returns segment value.
     * @private
     */
    getAxisValue(segmentValue: Object, axis: Axis, chart: Chart): number;
}
