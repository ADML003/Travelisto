/**
 * Circular 3D chart series.
 */
import { ChildProperty } from '@syncfusion/ej2-base';
import { AnimationModel } from '../../common/model/base-model';
import { Rect, Size } from '@syncfusion/ej2-svg-base';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { EmptyPointMode, LegendShape } from '../../common/utils/enum';
import { Data } from '../../common/model/data';
import { CircularChart3D } from '../circularchart3d';
import { CircularChart3DTextRenderEventArgs } from '../model/pie-interface';
import { CircularChart3DDataLabelSettingsModel } from './dataLabel-model';
import { CircularChart3DEmptyPointSettingsModel } from './series-model';
import { CircularChart3DSegments, CircularChart3DSymbolLocation } from '../model/circular3d-base';
/**
 * Model representing data points for the circular 3D series.
 *
 * @public
 */
export declare class CircularChart3DPoints {
    /** Circular 3D point x value. */
    x: Object;
    /** Circular 3D point y value. */
    y: number;
    /**Circular 3D point visibility. */
    visible: boolean;
    /** Circular 3D point text. */
    text: string;
    /** Circular 3D point tooltip. */
    tooltip: string;
    /** accumulation point slice radius. */
    sliceRadius: string;
    /** Circular 3D point slice radius. */
    radius: number;
    /** Circular 3D point original text.
     *
     *  @private
     */
    originalText: string;
    /** Circular 3D point color. */
    color: string;
    /** Circular 3D point percentage value. */
    percentage: number;
    /** Circular 3D point index. */
    index: number;
    /** @private */
    isExplode: boolean;
    /** @private */
    start: number;
    /** @private */
    separatorY: string;
    /** @private  */
    textSize: Size;
    /** @private */
    legendImageUrl: string;
    /** @private */
    symbolLocation: CircularChart3DSymbolLocation;
    /** @private */
    startDepth: number;
    /** @private  */
    argsData: CircularChart3DTextRenderEventArgs;
}
/**
 * Configures settings for empty points in the circular 3D series.
 */
export declare class CircularChart3DEmptyPointSettings extends ChildProperty<CircularChart3DEmptyPointSettings> {
    /**
     * Customize the fill color of empty points.
     *
     * @default null
     */
    fill: string;
    /**
     * Customize the mode of empty points.
     *
     * @default Gap
     */
    mode: EmptyPointMode;
}
/**
 *  Configures the series in a circular 3D chart.
 */
export declare class CircularChart3DSeries extends ChildProperty<CircularChart3DSeries> {
    /**
     * Specifies the dataSource for the series. It can be an array of JSON objects or an instance of DataManager.
     * ```html
     * <div id='Pie'></div>
     * ```
     * ```typescript
     * let dataManager: DataManager = new DataManager({
     *         url: 'http://mvc.syncfusion.com/Services/Northwnd.svc/Tasks/'
     * });
     * let query: Query = new Query().take(50).where('Estimate', 'greaterThan', 0, false);
     * let pie: CircularChart3D = new CircularChart3D({
     * ...
     *     series: [{
     *        dataSource: dataManager,
     *        xName: 'Id',
     *        yName: 'Estimate',
     *        query: query
     *    }],
     * ...
     * });
     * pie.appendTo('#Pie');
     * ```
     *
     * @default ''
     */
    dataSource: Object | DataManager;
    /**
     * Specifies the query to select data from the dataSource. This property is applicable only when the dataSource is `ej.DataManager`.
     *
     * @default null
     */
    query: Query;
    /**
     * The DataSource field that contains the x value
     *
     * @default ''
     */
    xName: string;
    /**
     * The name of the series as displayed in the legend.
     *
     * @default ''
     */
    name: string;
    /**
     * The data source field that contains the tooltip value.
     *
     * @default ''
     */
    tooltipMappingName: string;
    /**
     * The DataSource field that contains the y value.
     *
     * @default ''
     */
    yName: string;
    /**
     * Specifies the visibility of the series.
     *
     * @default true
     */
    visible: boolean;
    /**
     * Options for customizing the animation of the series.
     */
    animation: AnimationModel;
    /**
     * The shape of the legend. Each series has its own legend shape. Available shapes:
     * * Circle - Renders a circle.
     * * Rectangle - Renders a rectangle.
     * * Triangle - Renders a triangle.
     * * Diamond - Renders a diamond.
     * * Cross - Renders a cross.
     * * HorizontalLine - Renders a horizontal line.
     * * VerticalLine - Renders a vertical line.
     * * Pentagon - Renders a pentagon.
     * * InvertedTriangle - Renders an inverted triangle.
     * * SeriesType -Render a legend shape based on series type.
     * * Image - Render an image. *
     *
     * @default 'SeriesType'
     */
    legendShape: LegendShape;
    /**
     * The URL for the image that is to be displayed as a legend icon. It requires `legendShape` value to be an `Image`.
     *
     * @default ''
     */
    legendImageUrl: string;
    /**
     * The DataSource field that contains the point colors.
     *
     * @default ''
     */
    pointColorMapping: string;
    /**
     * The data label settings for the circular 3D series.
     */
    dataLabel: CircularChart3DDataLabelSettingsModel;
    /**
     * Palette configuration for the points in the circular 3D series.
     *
     * @default []
     */
    palettes: string[];
    /**
     * Specifies the radius of the pie series in percentage. Set to `null` for default.
     *
     * @default null
     */
    radius: string;
    /**
     * When the innerRadius value is greater than 0 percentage, a donut will appear in the pie series. It takes values only in percentage.
     *
     * @default '0'
     */
    innerRadius: string;
    /**
     * Specifies whether the tooltip is enabled or disabled for the circular 3D series.
     *
     * @default true
     */
    enableTooltip: boolean;
    /**
     * If set true, series points will be exploded on mouse click or touch.
     *
     * @default false
     */
    explode: boolean;
    /**
     * Distance of the point from the center, which takes values in both pixels and percentage.
     *
     * @default '30%'
     */
    explodeOffset: string;
    /**
     * If set true, all the points in the series will get exploded on load.
     *
     * @default false
     */
    explodeAll: boolean;
    /**
     * Index of the point to be exploded on load. Set to `null` for no explosion.
     *
     * @default null
     */
    explodeIndex: number;
    /**
     * Options to customize the appearance of empty points in the circular 3D series.
     */
    emptyPointSettings: CircularChart3DEmptyPointSettingsModel;
    /**
     * The opacity of the series.
     *
     * @default 1.
     */
    opacity: number;
    /**
     * Calculates the maximum bounds of the data label to facilitate smart legend placement.
     *
     * @private
     */
    labelBound: Rect;
    /** @private */
    points: CircularChart3DPoints[];
    /** @private */
    dataModule: Data;
    /** @private */
    sumOfPoints: number;
    /** @private */
    index: number;
    /** @private */
    resultData: Object;
    /** @private */
    isRectSeries: boolean;
    /** @private */
    clipRect: Rect;
    /** @private */
    category: string;
    /** @private */
    rightSidePoints: CircularChart3DPoints[];
    /** @private */
    leftSidePoints: CircularChart3DPoints[];
    /** @private */
    size: number;
    /** @private */
    isRadiusMapped: boolean;
    /** @private */
    coefficient: number;
    /** @private */
    actualWidth: number;
    /** @private */
    actualHeight: number;
    /** @private */
    segments: CircularChart3DSegments[];
    /** @private */
    isExploded: boolean;
    /** @private */
    dataLabelElement: HTMLElement;
    /**
     * Refreshes the DataManager for the circular 3D series.
     *
     * @private
     * @param {CircularChart3D} chart - The instance of the circular 3D chart.
     * @param {boolean} render - A boolean value indicating whether rendering is required.
     * @returns {void}
     */
    refreshDataManager(chart: CircularChart3D, render: boolean): void;
    /**
     * Handles the success event when the DataManager fetches data for the circular 3D series.
     *
     * @private
     * @param {Object} dataObject - Specifies the series data object.
     * @param {Object} dataObject.result - The actual data.
     * @param {number} dataObject.count - The count of data.
     * @param {CircularChart3D} chart - The instance of the circular 3D chart.
     * @param {boolean} [render=true] - A boolean value indicating whether rendering is required. Default is true.
     * @returns {void}
     */
    dataManagerSuccess(dataObject: {
        result: Object;
        count: number;
    }, chart: CircularChart3D, render?: boolean): void;
    /**
     * Retrieves and processes data points for rendering on a circular 3D chart.
     *
     * @param {Object} result - An object containing the data points for the chart.
     * @param {CircularChart3D}chart - The instance of the circular 3D chart.
     * @returns {void}
     */
    private getPoints;
    /**
     * Sets point index and color for a circular 3D data point.
     *
     * @param {CircularChart3DPoints} point - The CircularChart3DPoints object representing the data point.
     * @param {string[]} colors - An array specifying the point colors.
     * @param {CircularChart3D} chart - The instance of the circular 3D chart.
     * @returns {void}
     */
    private pushPoints;
    /**
     * Calculates the sum of points in the circular 3D series.
     *
     * @param {Object} result - The result object containing data points.
     * @returns {void}
     */
    private findSumOfPoints;
    /**
     * Sets x, y, and text points from the specified data source.
     *
     * @param {Object} data - The data source containing information for the point.
     * @param {number} index - The index specifying the position in the data array.
     * @param {CircularChart3D} chart - Specifies the circular 3D chart instance.
     * @returns {CircularChart3DPoints} - Returns the CircularChart3DPoints object representing the data point.
     */
    private setPoints;
    /**
     * Draws the circular 3D series on the chart.
     *
     * @param {CircularChart3DSeries} series - The series to be drawn.
     * @param {CircularChart3D} chart - The circular 3D chart instance.
     * @returns {void}
     * @private
     */
    draw(series: CircularChart3DSeries, chart: CircularChart3D): void;
    /**
     * Calculates the size of the series based on the chart settings.
     *
     * @param {CircularChart3D} chart - The circular 3D chart instance.
     * @param {CircularChart3DSeries} series - The series for which to calculate the size.
     * @returns {{ centerX: number, centerY: number }} - The calculated center coordinates.
     */
    private calculateSize;
    /**
     * Creates polygons for a 3D circular chart series.
     *
     * @param {CircularChart3DSeries} series - The CircularChart3D series for which to create polygons.
     * @param {CircularChart3D} chart - The circular 3D chart instance.
     * @returns {CircularChart3DPolygon[][]} - The array of created polygons.
     */
    private createPolygons;
    /**
     * Creates sectors for a circular 3D chart based on the specified parameters.
     *
     * @param {CircularChart3DSegments} segment - The CircularChart3DSegments instance defining the segment.
     * @param {CircularChart3D} chart - The circular 3D chart instance.
     * @param {CircularChart3DSeriesStyle} style - The CircularChart3DSeriesStyle defining the style of the sectors.
     * @param {number} seriesIndex - The index of the series to which the sectors belong.
     * @returns {CircularChart3DPolygon[][]} - An array of CircularChart3DPolygon arrays representing the created sectors.
     */
    private createSector;
    /**
     * Creates CircularChart3DSegments based on the provided CircularChart3D series and circular 3D chart.
     *
     * @param {CircularChart3DSeries} series - The circular 3D series for which to generate points.
     * @param {CircularChart3D} chart - The circular 3D chart instance.
     * @returns {CircularChart3DSegments[]} - An array of CircularChart3DSegments created for the series.
     */
    private createPoints;
    /**
     * Adds a data label to a circular 3D chart at the specified position and orientation.
     *
     * @param {number} x - The x-coordinate of the data label position.
     * @param {number} y - The y-coordinate of the data label position.
     * @param {number} startAngle - The starting angle of the pie slice in degrees.
     * @param {number} endAngle - The ending angle of the pie slice in degrees.
     * @param {number} radius - The radius of the pie slice.
     * @param {number} startDepth - The depth at which the pie slice starts in the 3D space.
     * @param {CircularChart3DVector} center - The center point of the pie chart in 3D space.
     * @param {CircularChart3DPoints} point - The specific data point associated with the data label.
     * @returns {void}
     */
    private addPieDataLabel;
    /**
     * Checks if the circular 3D chart is rotated.
     *
     * @param {CircularChart3D} chart - The circular 3D chart instance.
     * @returns {boolean} - A boolean indicating whether the chart is rotated.
     */
    private isChartRotated;
    /**
     * Creates a segment based on the provided parameters.
     *
     * @param {CircularChart3DVector} center - The center point of the segment.
     * @param {number} start - The starting angle of the segment in radians.
     * @param {number} end - The ending angle of the segment in radians.
     * @param {number} height - The height of the segment.
     * @param {number} radius - The radial distance from the center to the segment.
     * @param {number} index - The index value of the segment.
     * @param {number} yValue - The y value associated with the segment.
     * @param {number} insideRadius - The inside radius of the segment.
     * @param {number} pointIndex - The index of the point associated with the segment.
     * @param {CircularChart3DSeries} series - The CircularChart3DSeries to which the segment belongs.
     * @param {string} accessibilityText - The accessibility text of the segment.
     * @returns {CircularChart3DSegments} - The created segment.
     */
    private createSegment;
    /**
     * Creates a new Vector3D instance from provided coordinates.
     *
     * @param {number | { x: number, y: number }} vx - Either an object with x and y properties or the x-coordinate.
     * @param {number} vy - The y-coordinate.
     * @param {number} vz - The z-coordinate.
     * @returns {CircularChart3DVector} - The new Vector3D instance.
     */
    private vector;
    /**
     * Gets the `Y` values from an array of circular 3D series points.
     *
     * @param {CircularChart3DPoints[]} points - An array of CircularChart3DPoints.
     * @returns {number[]} - An array containing the Y values extracted from the CircularChart3DPoints.
     */
    private getYValues;
    /**
     * Updates the total bounds to encompass the maximum area covered by the specified bound and the current total bounds.
     *
     * @param {Rect} totalBound - The current total bounds to be updated.
     * @param {Rect} bound - The new bound to compare and update the total bounds.
     * @returns {void}
     * @private
     */
    findMaxBounds(totalBound: Rect, bound: Rect): void;
    /**
     * Sets the empty point value for null points in the circular 3D chart series.
     *
     * @param {CircularChart3DPoints} point - The data point to be checked and modified.
     * @param {number} index - The index of the data point.
     * @param {Object} data - The data object containing information about the data point.
     * @param {CircularChart3D} chart - The circular 3D chart instance.
     * @returns {void}
     */
    private setEmptyPoint;
}
/**
 * The `PieSeries3D` module is used to render circular 3D `Pie` and `Donut` series.
 */
export declare class PieSeries3D extends CircularChart3DSeries {
    /**
     * To get the module name of the circular 3D chart pie series.
     *
     * @returns {string} - Returns the module name of the Pie series.
     */
    protected getModuleName(): string;
    /**
     * Destroys the circular 3D chart series.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
