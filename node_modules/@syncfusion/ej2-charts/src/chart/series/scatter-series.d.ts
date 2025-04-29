import { Series, Points } from './chart-series';
import { Axis } from '../../chart/axis/axis';
import { BorderModel } from '../../common/model/base-model';
/**
 * The `ScatterSeries` module is used to render the scatter series.
 */
export declare class ScatterSeries {
    /**
     * Renders the series.
     *
     * @param {Series} series - The series to be rendered.
     * @param {Axis} xAxis - The x-axis of the chart.
     * @param {Axis} yAxis - The y-axis of the chart.
     * @param {boolean} isInverted - Specifies whether the chart is inverted.
     * @returns {void}
     * @private
     */
    render(series: Series, xAxis: Axis, yAxis: Axis, isInverted: boolean): void;
    renderPoint(series: Series, point: Points, isInverted: boolean, getCoordinate: Function, scatterBorder: BorderModel, visiblePoints: Points[]): void;
    updateDirection(series: Series, point: number[], isInverted: boolean): void;
    private isLineShapeMarker;
    /**
     * Enables complex properties for the series.
     *
     * @param {Series} series - The series for which complex properties need to be enabled.
     * @returns {Points[]} - Returns the updated points array.
     * @private
     */
    enableComplexProperty(series: Series): Points[];
    /**
     * To append scatter element
     *
     * @param {Series} series series
     * @param {Points} point point
     * @param {IPointRenderEventArgs} argsData argsData
     * @param {ChartLocation} startLocation startLocation
     * @returns {void}
     */
    private refresh;
    /**
     * Animates the series.
     *
     * @param  {Series} series - Defines the series to animate.
     * @returns {void}
     * @private
     */
    doAnimation(series: Series): void;
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the scatter.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
