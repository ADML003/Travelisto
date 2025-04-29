import { Chart } from '../../chart/chart';
import { AccumulationChart } from '../../accumulation-chart/accumulation';
import { RangeNavigator } from '../../range-navigator/range-navigator';
import { StockChart } from '../../stock-chart/stock-chart';
import { BulletChart } from '../../bullet-chart/bullet-chart';
import { Chart3D } from '../../chart3d/chart3D';
import { CircularChart3D } from '../../circularchart3d';
export declare class PrintUtils {
    private control;
    private printWindow;
    /**
     * Constructor for chart and accumulation annotation
     *
     * @param control
     */
    constructor(control: Chart | AccumulationChart | RangeNavigator | StockChart | BulletChart | Chart3D | CircularChart3D);
    /**
     * To print the accumulation and chart elements.
     *
     * @param elements
     */
    print(elements?: string[] | string | Element): void;
    /**
     * To get the html string of the chart and accumulation
     *
     * @param elements
     * @private
     */
    getHTMLContent(elements?: string[] | string | Element): Element;
}
