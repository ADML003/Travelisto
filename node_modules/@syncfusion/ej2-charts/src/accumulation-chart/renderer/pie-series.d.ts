/**
 * AccumulationChart series file
 */
import { AccPoints, AccumulationSeries } from '../model/acc-base';
import { PathOption } from '@syncfusion/ej2-svg-base';
import { ChartLocation } from '../../common/utils/helper';
import { PieBase } from '../renderer/pie-base';
import { AccumulationChart } from '../accumulation';
import { AnimationModel } from '../../common/model/base-model';
/**
 * The `PieSeries` module is used to render the `Pie` series.
 */
export declare class PieSeries extends PieBase {
    /**
     * To get path option, degree, symbolLocation from the point.
     *
     * @private
     * @param {AccPoints} point - The point data.
     * @param {AccumulationSeries} series - The series of the chart.
     * @param {AccumulationChart} chart - The accumulation chart control.
     * @param {PathOption} option - The rendering options for the point.
     * @param {Element} seriesGroup - The group element to contain the series elements.
     * @param {boolean} redraw - Specifies whether to redraw the series.
     * @param {string} previousRadius - Specifies the previous radius of the pie when animating the individual series point.
     * @param {Object[]} previousCenter - Specifies the previous center of the pie when animating the individual series point.
     * @param {boolean} pointAnimation - Specifies whether the point based animation is enabled.
     * @returns {void}
     */
    renderPoint(point: AccPoints, series: AccumulationSeries, chart: AccumulationChart, option: PathOption, seriesGroup: Element, redraw?: boolean, previousRadius?: number, previousCenter?: ChartLocation, pointAnimation?: boolean): void;
    findSeries(e: PointerEvent | TouchEvent, borderRadius: number): void;
    toggleInnerPoint(event: PointerEvent | TouchEvent, radius: number, innerRadius: number, borderRadius: number): void;
    removeBorder(borderElement: Element, duration: number): void;
    private refresh;
    /**
     * To get path option from the point.
     *
     * @param {AccPoints} point - The point data.
     * @param {number} degree - The angle of the point.
     * @param {number} startAngle - The start angle of the slice.
     * @param {number} borderRadius - The border radius of the arc.
     * @param {AccPoints[]} seriesPoints - The points of the series.
     * @param {number} previouRadius - The previous radius of the pie.
     * @param {number} previousCenterX - The previous center x of the pie.
     * @param {number} previousCenterY - The previous center y of the pie.
     * @returns {string} - Returns the path option.
     */
    private getPathOption;
    /**
     * To animate the pie series.
     *
     * @private
     * @param {AccumulationChart} accumulation - The accumulation chart control.
     * @param {AnimationModel} option - The animation options.
     * @param {AccumulationSeries} series - The pie series.
     * @param {Element} slice - The slice element to animate.
     * @param {number} borderRadius - The border radius of the arc.
     * @param {AccPoints[]} seriesPoints - The points of the series.
     * @returns {void}
     */
    animateSeries(accumulation: AccumulationChart, option: AnimationModel, series: AccumulationSeries, slice: Element, borderRadius: number, seriesPoints?: AccPoints[]): void;
    /**
     * To get the module name of the Pie series.
     *
     * @returns {string} - Returns the module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the pie series.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
