import { ComplexBase } from '@syncfusion/ej2-react-base';
import { StockEventsSettingsModel } from '@syncfusion/ej2-charts';
/**
 * `StockChartStockEvents` directive represent a stockevent of the react chart.
 * It must be contained in a Chart component(`StockChartComponent`).
 * ```tsx
 * <StockChartComponent>
 * <StockChartStockEventsDirective>
 * <StockChartStockEventDirective></StockChartStockEventDirective>
 * </StockChartStockEventsDirective>
 * </StockChartComponent>
 * ```
 */
export declare class StockEventDirective extends ComplexBase<StockEventsSettingsModel & {
    children?: React.ReactNode;
}, StockEventsSettingsModel> {
    static moduleName: string;
}
export declare class StockEventsDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
