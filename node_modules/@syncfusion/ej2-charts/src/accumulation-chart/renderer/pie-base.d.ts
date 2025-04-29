import { AccumulationChart } from '../accumulation';
import { ChartLocation } from '../../common/utils/helper';
import { Rect } from '@syncfusion/ej2-svg-base';
import { AccumulationLabelPosition } from '../model/enum';
import { AccumulationSeries, AccPoints } from '../model/acc-base';
import { AccumulationBase } from './accumulation-base';
import { AccumulationSeriesModel } from '../model/acc-base-model';
/**
 * The `PieBase` class is used to perform base calculations for the `Pie` series.
 *
 * @private
 */
export declare class PieBase extends AccumulationBase {
    protected startAngle: number;
    protected totalAngle: number;
    innerRadius: number;
    pieBaseCenter: ChartLocation;
    pieBaseRadius: number;
    pieBaseLabelRadius: number;
    isRadiusMapped: boolean;
    seriesRadius: number;
    size: number;
    /**
     * To initialize the property values.
     *
     * @private
     * @param {AccumulationChart} chart - The accumulation chart control.
     * @param {AccumulationSeries} series - The series for which the properties are initialized.
     * @returns {void}
     */
    initProperties(chart: AccumulationChart, series: AccumulationSeries): void;
    getLabelRadius(series: AccumulationSeriesModel, point: AccPoints): number;
    /**
     * To find the center of the accumulation.
     *
     * @private
     * @param {AccumulationChart} accumulation - The accumulation chart control.
     * @param {AccumulationSeries} series - The series for which the center is calculated.
     * @returns {void}
     */
    findCenter(accumulation: AccumulationChart, series: AccumulationSeries): void;
    /**
     * To find angles from series.
     *
     * @param {AccumulationSeries} series - The series for which to calculate angles.
     * @returns {void}
     */
    private initAngles;
    /**
     * To calculate data-label bound.
     *
     * @private
     * @param {AccumulationSeries} series - The series for which to calculate data-label bounds.
     * @param {boolean} visible - Indicates whether the data-labels are visible.
     * @param {AccumulationLabelPosition} position - The position of the data-labels.
     * @returns {void}
     */
    defaultLabelBound(series: AccumulationSeries, visible: boolean, position: AccumulationLabelPosition): void;
    /**
     * To calculate series bound.
     *
     * @private
     * @param {AccumulationSeries} series - The series for which to calculate the bound.
     * @returns {Rect} - Returns a rect.
     */
    getSeriesBound(series: AccumulationSeries): Rect;
    /**
     * To get rect location size from angle.
     *
     * @param {number} angle - The angle in degrees.
     * @returns {Rect} - The rect representing the location size from angle.
     */
    private getRectFromAngle;
    /**
     * To get path arc direction.
     *
     * @param {ChartLocation} center - The center coordinates of the arc.
     * @param {number} start - The starting angle of the arc in degrees.
     * @param {number} end - The ending angle of the arc in degrees.
     * @param {number} radius - The radius of the arc.
     * @param {number} innerRadius - The inner radius of the arc.
     * @param {number} borderRadius - The border radius of the arc.
     * @param {boolean} isBorder - It specifies whether it is for rendering a border.
     * @param {AccPoints[]} seriesPoints - The points of the series.
     * @returns {string} - The path string representing the arc direction.
     */
    protected getPathArc(center: ChartLocation, start: number, end: number, radius: number, innerRadius: number, borderRadius?: number, isBorder?: boolean, seriesPoints?: AccPoints[]): string;
    /**
     * To get pie direction.
     *
     * @param {ChartLocation} center - The center of the pie.
     * @param {ChartLocation} start - The starting location of the pie.
     * @param {ChartLocation} end - The ending location of the pie.
     * @param {number} radius - The radius of the pie.
     * @param {number} clockWise - The direction of the pie.
     * @param {number} cornerRadius - The border radius of the arc.
     * @param {AccPoints[]} seriesPoints - The points of the series.
     * @returns {string} - The path direction for the pie.
     */
    protected getPiePath(center: ChartLocation, start: ChartLocation, end: ChartLocation, radius: number, clockWise: number, cornerRadius: number, seriesPoints: AccPoints[]): string;
    /**
     * To get doughnut direction.
     *
     * @param {ChartLocation} center - The center of the doughnut.
     * @param {ChartLocation} start - The starting location of the outer doughnut.
     * @param {ChartLocation} end - The ending location of the outer doughnut.
     * @param {number} radius - The radius of the outer doughnut.
     * @param {ChartLocation} innerStart - The starting location of the inner doughnut.
     * @param {ChartLocation} innerEnd - The ending location of the inner doughnut.
     * @param {number} innerRadius - The radius of the inner doughnut.
     * @param {number} clockWise - The direction of the doughnut.
     * @param {number} cornerRadius - The border radius of the arc.
     * @param {boolean} isBorder - It specifies whether it is for rendering a border.
     * @param {AccPoints[]} seriesPoints - The points of the series.
     * @returns {string} - The path direction for the doughnut.
     */
    protected getDoughnutPath(center: ChartLocation, start: ChartLocation, end: ChartLocation, radius: number, innerStart: ChartLocation, innerEnd: ChartLocation, innerRadius: number, clockWise: number, cornerRadius: number, isBorder: boolean, seriesPoints: AccPoints[]): string;
    /**
     * Adjusts the corner radius of a pie chart slice based on the angle of the slice.
     * Ensures that the corner radius does not exceed a value that would cause the arcs
     * of the slice to overlap or create an invalid shape.
     *
     * @param {number} startAngle - The start angle of the pie.
     * @param {number} endAngle - The end angle of the pie.
     * @param {number} radius - The radius of the pie.
     * @param {number} cornerRadius - The border radius of the arc.
     * @returns {number} - The adjusted corner radius of the pie.
     */
    private adjustCornerRadius;
    /**
     * To Check slice count.
     *
     * @param {AccPoints[]} seriesPoints - The points of the series.
     * @returns {number} - The number of visible pie slice.
     */
    private sliceCheck;
    /**
     * Method to start animation for pie series.
     *
     * @param {Element} slice - The slice element to animate.
     * @param {AccumulationSeries} series - The accumulation chart control.
     * @param {Element} groupElement - The group element containing the pie series.
     * @param {number} borderRadius - The border radius of the arc.
     * @param {AccPoints[]} seriesPoints - The points of the series.
     * @returns {void}
     */
    protected doAnimation(slice: Element, series: AccumulationSeries, groupElement: Element, borderRadius: number, seriesPoints: AccPoints[]): void;
}
