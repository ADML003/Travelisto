import { ChartLocation } from '../../common/utils/helper';
import { Chart } from '../chart';
import { Series, Points } from './chart-series';
import { MarkerExplode } from './marker-explode';
import { ChartShape } from '../utils/enum';
export declare const markerShapes: ChartShape[];
/**
 * The `Marker` module is used to render markers for line-type series.
 */
export declare class Marker extends MarkerExplode {
    /**
     * Constructor for the marker module.
     *
     * @private
     */
    constructor(chart: Chart);
    /**
     * Render the marker for series.
     *
     * @returns {void}
     * @private
     */
    render(series: Series): void;
    renderMarker(series: Series, point: Points, location: ChartLocation, index: number, redraw: boolean): void;
    createElement(series: Series, redraw: boolean): void;
    private getRangeLowPoint;
    /**
     * Calculates the distance between two points in a chart.
     *
     * @param {ChartLocation} startPoint - The starting point with x and y coordinates.
     * @param {ChartLocation} endPoint - The ending point with x and y coordinates.
     * @returns {number} - The distance between the startPoint and endPoint.
     */
    private calculateDistance;
    /**
     * Perform marker animation for the given series.
     *
     * @param {Series} series - The series for which marker animation needs to be performed.
     * @returns {void}
     * @private
     */
    doMarkerAnimation(series: Series): void;
}
