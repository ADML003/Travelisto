import { Series, Trendline } from '../series/chart-series';
import { Chart } from '../chart';
/**
 * The `Trendlines` module is used to render six types of trendlines in the chart.
 */
export declare class Trendlines {
    /**
     * Initializes the series collection for the specified trendline in the chart.
     *
     * @param {Trendline} trendline - The trendline for which the series collection is initialized.
     * @param {Chart} chart - The chart instance.
     * @returns {void}
     * @private
     */
    initSeriesCollection(trendline: Trendline, chart: Chart): void;
    /**
     * Sets the properties for the specified series related to the specified trendline.
     *
     * @param {Series} series - The series to which properties are applied.
     * @param {Trendline} trendline - The trendline associated with the series.
     * @param {string} name - The name of the series.
     * @param {string} fill - The fill color of the series.
     * @param {number} width - The width of the series.
     * @param {Chart} chart - The chart instance.
     * @returns {void}
     */
    private setSeriesProperties;
    /**
     * Creates elements for the specified trendline and adds them to the chart.
     *
     * @param {Chart} chart - The chart instance.
     * @param {Trendline} trendline - The trendline for which elements are created.
     * @param {number} index - The index of the trendline.
     * @param {Element} element - The parent element to which trendline elements are added.
     * @param {Element} clipRectElement - The clip rect element associated with the chart.
     * @returns {void}
     */
    private createTrendLineElements;
    /**
     * Retrieves the data point at the specified index from the series.
     *
     * @param {Object} x - The x-value of the data point.
     * @param {Object} y - The y-value of the data point.
     * @param {Series} series - The series from which to retrieve the data point.
     * @param {number} index - The index of the data point in the series.
     * @returns {Points} - The data point object.
     */
    private getDataPoint;
    /**
     * Finds the slope and intercept for the trendline.
     *
     * @param {number[]} xValues - The array of x-values.
     * @param {number[]} yValues - The array of y-values.
     * @param {Trendline} trendline - The trendline configuration.
     * @param {Points[]} points - The data points for the trendline.
     * @returns {SlopeIntercept} - The slope and intercept values.
     */
    private findSlopeIntercept;
    /**
     * Initializes the data source for the trendline.
     *
     * @param {Trendline} trendline - The trendline configuration.
     * @returns {void}
     * @private
     */
    initDataSource(trendline: Trendline): void;
    /**
     * Sets the range for an exponential trendline.
     *
     * @param {Points[]} points - The data points of the series.
     * @param {Trendline} trendline - The exponential trendline configuration.
     * @param {Series} series - The series to which the trendline belongs.
     * @returns {void}
     */
    private setExponentialRange;
    /**
     * Sets the range for a logarithmic trendline.
     *
     * @param {Points[]} points - The data points of the series.
     * @param {Trendline} trendline - The logarithmic trendline configuration.
     * @param {Series} series - The series to which the trendline belongs.
     * @returns {void}
     */
    private setLogarithmicRange;
    /**
     * Sets the range for a polynomial trendline.
     *
     * @param {Points[]} points - The data points of the series.
     * @param {Trendline} trendline - The polynomial trendline configuration.
     * @param {Series} series - The series to which the trendline belongs.
     * @returns {void}
     */
    private setPolynomialRange;
    /**
     * Sets the range for a power trendline.
     *
     * @param {Points[]} points - The data points of the series.
     * @param {Trendline} trendline - The power trendline configuration.
     * @param {Series} series - The series to which the trendline belongs.
     * @returns {void}
     */
    private setPowerRange;
    /**
     * Sets the range for a linear trendline.
     *
     * @param {Points[]} points - The data points of the series.
     * @param {Trendline} trendline - The linear trendline configuration.
     * @param {Series} series - The series to which the trendline belongs.
     * @returns {void}
     */
    private setLinearRange;
    /**
     * Sets the range for a moving average trendline.
     *
     * @param {Points[]} points - The data points of the series.
     * @param {Trendline} trendline - The moving average trendline configuration.
     * @param {Series} series - The series to which the trendline belongs.
     * @returns {void}
     */
    private setMovingAverageRange;
    /**
     * Calculates the points for a logarithmic trendline.
     *
     * @param {Trendline} trendline - The logarithmic trendline configuration.
     * @param {Points[]} points - The data points of the series.
     * @param {number[]} xValues - The x values of the data points.
     * @param {number[]} yValues - The y values of the data points.
     * @param {Series} series - The series to which the trendline belongs.
     * @param {SlopeIntercept} slopeInterceptLog - The slope and intercept of the logarithmic trendline.
     * @returns {Points[]} - The calculated points for the logarithmic trendline.
     */
    private getLogarithmicPoints;
    /**
     * Calculates the points for a power trendline.
     *
     * @param {Trendline} trendline - The power trendline configuration.
     * @param {Points[]} points - The data points of the series.
     * @param {number[]} xValues - The x values of the data points.
     * @param {number[]} yValues - The y values of the data points.
     * @param {Series} series - The series to which the trendline belongs.
     * @param {SlopeIntercept} slopeInterceptPower - The slope and intercept of the power trendline.
     * @returns {Points[]} - The calculated points for the power trendline.
     */
    private getPowerPoints;
    /**
     * Calculates the points for a polynomial trendline.
     *
     * @param {Trendline} trendline - The polynomial trendline configuration.
     * @param {Points[]} points - The data points of the series.
     * @param {number[]} xValues - The x values of the data points.
     * @param {number[]} yValues - The y values of the data points.
     * @param {Series} series - The series to which the trendline belongs.
     * @returns {Points[]} - The calculated points for the polynomial trendline.
     */
    private getPolynomialPoints;
    /**
     * Calculates the points for a moving average trendline.
     *
     * @param {Trendline} trendline - The moving average trendline configuration.
     * @param {Points[]} points - The data points of the series.
     * @param {number[]} xValues - The x values of the data points.
     * @param {number[]} yValues - The y values of the data points.
     * @param {Series} series - The series to which the trendline belongs.
     * @returns {Points[]} - The calculated points for the moving average trendline.
     */
    private getMovingAveragePoints;
    /**
     * Calculates the points for a linear trendline.
     *
     * @param {Trendline} trendline - The linear trendline configuration.
     * @param {Points[]} points - The data points of the series.
     * @param {number[]} xValues - The x values of the data points.
     * @param {number[]} yValues - The y values of the data points.
     * @param {Series} series - The series to which the trendline belongs.
     * @param {SlopeIntercept} slopeInterceptLinear - The slope and intercept of the linear trendline.
     * @returns {Points[]} - The calculated points for the linear trendline.
     */
    private getLinearPoints;
    /**
     * Calculates the points for an exponential trendline.
     *
     * @param {Trendline} trendline - The exponential trendline configuration.
     * @param {Points[]} points - The data points of the series.
     * @param {number[]} xValues - The x values of the data points.
     * @param {number[]} yValues - The y values of the data points.
     * @param {Series} series - The series to which the trendline belongs.
     * @param {SlopeIntercept} slopeInterceptExp - The slope and intercept of the exponential trendline.
     * @returns {Points[]} - The calculated points for the exponential trendline.
     */
    private getExponentialPoints;
    /**
     * Calculates the points for the specified type of trendline.
     *
     * @param {Trendline} trendline - The trendline configuration.
     * @param {Points[]} points - The data points of the series.
     * @param {number[]} xValues - The x values of the data points.
     * @param {Series} series - The series to which the trendline belongs.
     * @returns {Points[]} - The calculated points for the trendline.
     */
    private getPoints;
    /**
     * Calculates the y value for the specified x value using polynomial regression.
     *
     * @param {number[]} slopes - The coefficients of the polynomial equation.
     * @param {number} x - The x value for which to calculate the y value.
     * @returns {number} - The calculated y value.
     */
    private getPolynomialYValue;
    /**
     * Applies Gauss-Jordan elimination to solve a system of linear equations represented by a matrix.
     * Updates the coefficients of the polynomial equation.
     *
     * @param {number[][]} matrix - The matrix representing the system of linear equations.
     * @param {number[]} polynomialSlopes - The coefficients of the polynomial equation to be updated.
     * @returns {boolean} - A boolean indicating whether the elimination process was successful.
     */
    private gaussJordanElimination;
    /**
     * Retrieves the elements required for rendering trendlines for a series in the chart.
     *
     * @param {Series} series - The series for which trendlines are to be rendered.
     * @param {Chart} chart - The chart instance.
     * @returns {void}
     * @private
     */
    getTrendLineElements(series: Series, chart: Chart): void;
    /**
     * To destroy the trendline.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    protected getModuleName(): string;
}
/** @private */
export interface SlopeIntercept {
    slope?: number;
    intercept?: number;
}
