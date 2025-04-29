import { Smithchart } from '../../smithchart';
import { SmithchartRect, LegendSeries } from '../../smithchart/utils/utils';
export declare class SmithchartLegend {
    legendActualBounds: SmithchartRect;
    legendSeries: LegendSeries[];
    legendGroup: Element;
    /**
     * legend rendering.
     */
    legendItemGroup: Element;
    renderLegend(smithchart: Smithchart): void;
    calculateLegendBounds(smithchart: Smithchart): SmithchartRect;
    private _getLegendSize;
    private _drawLegend;
    private drawLegendBorder;
    private drawLegendTitle;
    private drawLegendItem;
    private drawLegendShape;
    /**
     * Get module name.
     *
     * @returns {string} - To get the module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the legend.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
