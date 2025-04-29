/**
 * Circular 3D chart file.
 */
import { Component, EmitType, INotifyPropertyChanged, Internationalization, ModuleDeclaration } from '@syncfusion/ej2-base';
import { BorderModel, FontModel, IndexesModel, MarginModel } from '../common/model/base-model';
import { ExportType, SelectionPattern } from '../common/utils/enum';
import { DataManager } from '@syncfusion/ej2-data';
import { CircularChart3DHighlightMode, CircularChart3DSelectionMode, CircularChart3DTheme } from './model/enum';
import { CircularChart3DModel } from './circularchart3d-model';
import { CircularChart3DAfterExportEventArgs, CircularChart3DBeforeResizeEventArgs, CircularChart3DExportEventArgs, CircularChart3DLegendClickEventArgs, CircularChart3DLegendRenderEventArgs, CircularChart3DLoadedEventArgs, CircularChart3DMouseEventArgs, CircularChart3DPointEventArgs, CircularChart3DPointRenderEventArgs, CircularChart3DPrintEventArgs, CircularChart3DResizeEventArgs, CircularChart3DSeriesRenderEventArgs, CircularChart3DTextRenderEventArgs, CircularChart3DTooltipRenderEventArgs, CircularChart3DSelectionCompleteEventArgs } from './model/pie-interface';
import { CircularChart3DSeries } from './renderer/series';
import { CircularChart3DSeriesModel } from './renderer/series-model';
import { Rect, Size, SvgRenderer } from '@syncfusion/ej2-svg-base';
import { CircularChart3DBinaryTreeBuilder, CircularChart3DTransform, CircularChart3DGraphics, CircularChart3DMatrix, CircularChart3DPolygonModule, CircularChart3DSvgRenderer, CircularChart3DVectorModule } from './renderer/3d-renderer';
import { CircularChartDataLabel3D } from './renderer/dataLabel';
import { CircularChartExport3D } from './print-export/export';
import { PdfPageOrientation } from '@syncfusion/ej2-pdf-export';
import { IPDFArgs } from '../common/model/interface';
import { CircularChartLegend3D } from './legend/legend';
import { CircularChart3DLegendSettingsModel } from './legend/legend-model';
import { CircularChartSelection3D } from './user-interaction/selection';
import { CircularChartHighlight3D } from './user-interaction/high-light';
import { CircularChartTooltip3D } from './user-interaction/tooltip';
import { CircularChart3DTooltipSettingsModel } from './user-interaction/tooltip-model';
import { CircularChart3DPolygon, CircularChart3DThemeStyle, CircularChart3DTitlePosition } from './model/circular3d-base';
/**
 * Represents the circular 3D chart control.
 * ```html
 * <div id="container"/>
 * <script>
 *   let pie: CircularChart3D = new CircularChart3D({ });
 *   pie.appendTo("#container");
 *
 * </script>
 * ```
 *
 * @public
 */
export declare class CircularChart3D extends Component<HTMLElement> implements INotifyPropertyChanged {
    /**
     * The width of the chart as a string, accepting input as both '100px' or '100%'
     * If specified as '100%', the chart renders to the full width of its parent element.
     *
     * @default null
     */
    width: string;
    /**
     * The height of the chart as a string, accepting input as both '100px' or '100%'.
     * If specified as '100%', the chart renders to the full height of its parent element.
     *
     * @default null
     */
    height: string;
    /**
     * Represents the title for the circular 3D chart.
     *
     * @default null
     */
    title: string;
    /**
     * The background image of the chart, specified as a URL link or the location of an image.
     *
     * @default null
     */
    backgroundImage: string;
    /**
     * Specifies the dataSource for the circular 3D chart. It can be an array of JSON objects or an instance of DataManager.
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
     *     dataSource: dataManager,
     *     series: [{
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
     * Options for customizing the title of the circular 3D chart.
     */
    titleStyle: FontModel;
    /**
     * Represents the subtitle for the circular 3D chart.
     *
     * @default null
     */
    subTitle: string;
    /**
     * Options for customizing the subtitle of the circular 3D Chart.
     */
    subTitleStyle: FontModel;
    /**
     * Specifies whether a point has to be selected or not.
     * Takes values: 'None' or 'Point'.
     * * None: Disables the selection.
     * * Point: Selects a point.
     *
     * @default None
     */
    selectionMode: CircularChart3DSelectionMode;
    /**
     * Specifies whether a point has to be highlighted or not.
     * Takes values: 'None' or 'Point'.
     * * None: Disables the highlight.
     * * Point: Highlights a point.
     *
     * @default None
     */
    highlightMode: CircularChart3DHighlightMode;
    /**
     * The configuration for series in circular 3D chart.
     * The `series` property allows you to define an array of circular 3D series, each with its own settings and data.
     */
    series: CircularChart3DSeriesModel[];
    /**
     * Options for customizing the legend of the circular 3D chart.
     */
    legendSettings: CircularChart3DLegendSettingsModel;
    /**
     * Defines the color for the highlighted data point.
     *
     * @default ''
     */
    highlightColor: string;
    /**
     * Specifies the selection pattern for series or data points in the circular 3D chart. Options include:
     * * none: No specific selection pattern.
     * * chessboard: Chessboard pattern.
     * * dots: Dots pattern.
     * * diagonalForward: Diagonal forward pattern.
     * * crosshatch: Crosshatch pattern.
     * * pacman: Pacman pattern.
     * * diagonalbackward: Diagonal backward pattern.
     * * grid: Grid pattern.
     * * turquoise: Turquoise pattern.
     * * star: Star pattern.
     * * triangle: Triangle pattern.
     * * circle: Circle pattern.
     * * tile: Tile pattern.
     * * horizontaldash: Horizontal dash pattern.
     * * verticaldash: Vertical dash pattern.
     * * rectangle: Rectangle pattern.
     * * box: Box pattern.
     * * verticalstripe: Vertical stripe pattern.
     * * horizontalstripe: Horizontal stripe pattern.
     * * bubble: Bubble pattern.
     *
     * @default None
     */
    selectionPattern: SelectionPattern;
    /**
     * Specifies the highlight pattern for series or data points in the circular 3D chart. Options include:
     * * none: No specific selection pattern.
     * * chessboard: Chessboard pattern.
     * * dots: Dots pattern.
     * * diagonalForward: Diagonal forward pattern.
     * * crosshatch: Crosshatch pattern.
     * * pacman: Pacman pattern.
     * * diagonalbackward: Diagonal backward pattern.
     * * grid: Grid pattern.
     * * turquoise: Turquoise pattern.
     * * star: Star pattern.
     * * triangle: Triangle pattern.
     * * circle: Circle pattern.
     * * tile: Tile pattern.
     * * horizontaldash: Horizontal dash pattern.
     * * verticaldash: Vertical dash pattern.
     * * rectangle: Rectangle pattern.
     * * box: Box pattern.
     * * verticalstripe: Vertical stripe pattern.
     * * horizontalstripe: Horizontal stripe pattern.
     * * bubble: Bubble pattern.
     *
     * @default None
     */
    highlightPattern: SelectionPattern;
    /**
     * Enables or disables multi-selection in the circular 3D chart.
     * If set true, enables the multi selection in circular 3D chart. It requires `selectionMode` to be `Point`.
     *
     * @default false
     */
    isMultiSelect: boolean;
    /**
     * If set true, enables the animation for circular 3D chart.
     *
     * @default true
     */
    enableAnimation: boolean;
    /**
     * Specifies the theme for the circular 3D chart.
     *
     * @default 'Material'
     */
    theme: CircularChart3DTheme;
    /**
     * Specifies the point indexes to be selected while loading a circular 3D chart.
     * It requires `selectionMode` to be `Point`.
     * ```html
     * <div id='Pie'></div>
     * ```
     * ```typescript
     * let pie: CircularChart3D = new CircularChart3D({
     * ...
     *   selectionMode: 'Point',
     *   selectedDataIndexes: [ { series: 0, point: 1},
     *                          { series: 2, point: 3} ],
     * ...
     * });
     * pie.appendTo('#Pie');
     * ```
     *
     * @default []
     */
    selectedDataIndexes: IndexesModel[];
    /**
     * Options to customize the left, right, top, and bottom margins of the circular 3D chart.
     */
    margin: MarginModel;
    /**
     * Options for customizing the color and width of the circular 3D chart border.
     */
    border: BorderModel;
    /**
     * Options for customizing the tooltip of the circular 3D chart.
     */
    tooltip: CircularChart3DTooltipSettingsModel;
    /**
     * The background color of the circular 3D chart, which accepts a value in hex, rgba as a valid CSS color string.
     *
     * @default null
     */
    background: string;
    /**
     * Specifies whether a grouping separator should be used for numbers.
     *
     * @default false
     */
    useGroupingSeparator: boolean;
    /**
     * Specifies the depth of the circular 3D chart.
     *
     * @default 50
     */
    depth: number;
    /**
     * Defines the slope angle for the circular 3D chart.
     *
     * @default 0
     */
    tilt: number;
    /**
     * Enables or disables rotation in the circular 3D chart.
     *
     * @default false
     */
    enableRotation: boolean;
    /**
     * Defines the rotation angle for the circular 3D chart.
     *
     * @default 0
     */
    rotation: number;
    /**
     * Enables or disables the export feature in the circular 3D chart.
     *
     * @default false
     */
    enableExport: boolean;
    /**
     * Triggered before the circular 3D is loaded.
     *
     * @event load
     */
    load: EmitType<CircularChart3DLoadedEventArgs>;
    /**
     * Triggers after the circular 3D chart is loaded.
     *
     * @event loaded
     */
    loaded: EmitType<CircularChart3DLoadedEventArgs>;
    /**
     * Triggers before the legend is rendered.
     *
     * @event legendRender
     */
    legendRender: EmitType<CircularChart3DLegendRenderEventArgs>;
    /**
     * Triggers after a legend is clicked.
     *
     * @event legendClick
     */
    legendClick: EmitType<CircularChart3DLegendClickEventArgs>;
    /**
     * Triggers after the selection is completed.
     *
     * @event selectionComplete
     */
    selectionComplete: EmitType<CircularChart3DSelectionCompleteEventArgs>;
    /**
     * Triggers before each point for a series is rendered.
     *
     * @event pointRender
     */
    pointRender: EmitType<CircularChart3DPointRenderEventArgs>;
    /**
     * Triggers before a series is rendered.
     *
     * @event seriesRender
     */
    seriesRender: EmitType<CircularChart3DSeriesRenderEventArgs>;
    /**
     * Triggers before the data label for a series is rendered.
     *
     * @event textRender
     */
    textRender: EmitType<CircularChart3DTextRenderEventArgs>;
    /**
     * Triggers before the export starts.
     *
     * @event beforeExport
     */
    beforeExport: EmitType<CircularChart3DExportEventArgs>;
    /**
     * Triggers after the export is completed.
     *
     * @event afterExport
     */
    afterExport: EmitType<CircularChart3DAfterExportEventArgs>;
    /**
     * Triggers before printing starts.
     *
     * @event beforePrint
     */
    beforePrint: EmitType<CircularChart3DPrintEventArgs>;
    /**
     * The `circularChartDataLabel3DModule` is used to manipulate and add data labels in the circular 3D chart.
     */
    circularChartDataLabel3DModule: CircularChartDataLabel3D;
    /**
     * The `circularChartSelection3DModule` is used to manipulate and add selection in the circular 3D chart.
     */
    circularChartSelection3DModule: CircularChartSelection3D;
    /**
     * The `circularHighlight3DModule` is used to manipulate and add highlights to the circular 3D chart.
     */
    circularChartHighlight3DModule: CircularChartHighlight3D;
    /**
     * Triggered before resizing the chart.
     *
     * @event beforeResize
     */
    beforeResize: EmitType<CircularChart3DBeforeResizeEventArgs>;
    /**
     * Triggered after the chart is resized.
     *
     * @event resized
     */
    resized: EmitType<CircularChart3DResizeEventArgs>;
    /**
     * Triggered when the user hovers over a circular 3D chart.
     *
     * @event circularChart3DMouseMove
     *
     */
    circularChart3DMouseMove: EmitType<CircularChart3DMouseEventArgs>;
    /**
     * Triggered when the user clicks on a circular 3D chart.
     *
     * @event circularChart3DMouseClick
     *
     */
    circularChart3DMouseClick: EmitType<CircularChart3DMouseEventArgs>;
    /**
     * Triggered when the mouse is pressed down on a circular 3D chart.
     *
     * @event circularChart3DMouseDown
     *
     */
    circularChart3DMouseDown: EmitType<CircularChart3DMouseEventArgs>;
    /**
     * Triggered when the cursor leaves a circular 3D chart.
     *
     * @event circularChart3DMouseLeave
     *
     */
    circularChart3DMouseLeave: EmitType<CircularChart3DMouseEventArgs>;
    /**
     * Triggered when the mouse button is released on a circular 3D chart.
     *
     * @event circularChart3DMouseUp
     *
     */
    circularChart3DMouseUp: EmitType<CircularChart3DMouseEventArgs>;
    /**
     * Triggered when the user clicks on data points.
     *
     * @event pointClick
     */
    pointClick: EmitType<CircularChart3DPointEventArgs>;
    /**
     * Triggered when the user hovers over data points.
     *
     * @event pointMove
     */
    pointMove: EmitType<CircularChart3DPointEventArgs>;
    /**
     * Triggered when the tooltip is ready to render on the screen.
     *
     * @event tooltipRender
     */
    tooltipRender: EmitType<CircularChart3DTooltipRenderEventArgs>;
    /**
     * The `circularChartExport3DModule` Module is used to facilitate the export of the circular 3D chart.
     */
    circularChartExport3DModule: CircularChartExport3D;
    /**
     * The `circularChartTooltip3DModule` is used to manipulate and add tooltips in the circular 3D chart.
     */
    circularChartTooltip3DModule: CircularChartTooltip3D;
    /**
     * The `circularChartLegend3DModule` is used to manipulate and add legend in the circular 3D chart.
     */
    circularChartLegend3DModule: CircularChartLegend3D;
    /** @private */
    intl: Internationalization;
    /** @private */
    visibleSeries: CircularChart3DSeries[];
    /** @private */
    seriesCounts: number;
    /** @private */
    animateSeries: boolean;
    private chartId;
    /** @private */
    themeStyle: CircularChart3DThemeStyle;
    /** @private */
    redraw: boolean;
    /** @private */
    svgObject: Element;
    /** @private */
    renderer: SvgRenderer;
    /** @private */
    availableSize: Size;
    /** @private */
    explodeDistance: number;
    /** @private */
    initialClipRect: Rect;
    private titleCollection;
    private subTitleCollection;
    /** @private */
    circularRadius: number[];
    /** @private */
    innerRadius: number[];
    /** @private */
    groupElement: Element;
    /** @private */
    titleLocation: CircularChart3DTitlePosition;
    /** @private */
    subTitleLocation: CircularChart3DTitlePosition;
    /** @private */
    circular3DPolygon: CircularChart3DPolygon[];
    /** @private */
    matrixObj: CircularChart3DMatrix;
    /** @private */
    bspTreeObj: CircularChart3DBinaryTreeBuilder;
    /** @private */
    polygon: CircularChart3DPolygonModule;
    /** @private */
    vector: CircularChart3DVectorModule;
    /** @private */
    graphics: CircularChart3DGraphics;
    /** @private */
    transform3D: CircularChart3DTransform;
    /** @private */
    svg3DRenderer: CircularChart3DSvgRenderer;
    /** @private */
    chartResizeBound: EventListenerOrEventListenerObject;
    /** @private */
    mouseX: number;
    /** @private */
    mouseY: number;
    private resizeTo;
    /** @private */
    isTouch: boolean;
    /** @private */
    rotateActivate: boolean;
    /** @private */
    previousCoords: {
        x: number;
        y: number;
    };
    /** @private */
    previousID: string;
    /** @private */
    cachedX: number;
    /** @private */
    cachedY: number;
    /** @private */
    previousTargetId: string;
    /** @private */
    currentPointIndex: number;
    /** @private */
    currentLegendIndex: number;
    /** @private */
    isLegendClicked: boolean;
    /** @private */
    delayRedraw: boolean;
    readonly type: string;
    /**
     * Constructor for creating the circular 3D chart widget.
     *
     * @private
     * @param {CircularChart3DModel} options - Specifies the instance of the circular 3D chart model.
     * @param {string | HTMLElement} element - Specifies the element for which the circular 3D chart will be rendered
     * @returns {void}
     */
    constructor(options?: CircularChart3DModel, element?: string | HTMLElement);
    /**
     * To create SVG object, renderer, and bind events for the container.
     *
     * @private
     * @returns {void}
     */
    protected preRender(): void;
    /**
     * Method to unbind events for the circular 3D chart.
     *
     * @returns {void}
     */
    private unWireEvents;
    /**
     * Handles the mouse click on the circular 3D chart.
     *
     * @param {PointerEvent} e - Mouse event arguments.
     * @returns {boolean} - Indicates whether the mouse click event was handled by the circular 3D chart.
     * @private
     */
    chartOnMouseClick(e: PointerEvent): boolean;
    /**
     * Triggers a point event for a circular 3D chart element.
     *
     * @param {string} event - The type of event to trigger.
     * @param {Element} element - The DOM element associated with the event.
     * @param {PointerEvent | TouchEvent | undefined} e - The pointer or touch event.
     * @returns {void}
     */
    private triggerPointEvent;
    /**
     * Handles the mouse move on the circular 3D chart.
     *
     * @param {PointerEvent} e - Mouse event arguments.
     * @returns {boolean} - Indicates whether the mouse move event was handled by the circular 3D chart.
     * @private
     */
    chartOnMouseMove(e: PointerEvent): boolean;
    /**
     * Displays a tooltip for the given event at the specified coordinates.
     *
     * @param {Event} event - The event triggering the tooltip display.
     * @param {number} x - The x-coordinate for the tooltip position.
     * @param {number} y - The y-coordinate for the tooltip position.
     * @param {boolean} isTouch - Optional parameter indicating whether the event is a touch event. Defaults to false if not provided.
     * @returns {void}
     */
    private titleTooltip;
    /**
     * Sets the mouse x and y coordinates based on the specified pointer event.
     *
     * @param {PointerEvent} e - Specifies the pointer event.
     * @returns {void}
     */
    private setMouseXY;
    /**
     * Method to bind events for the circular 3D chart.
     *
     * @returns {void}
     */
    private wireEvents;
    /**
     * Handles the mouse leave on circular 3D chart.
     *
     * @param {PointerEvent} e - Mouse event arguments.
     * @returns {boolean} - Indicates the mouse leave event for the circular 3D chart.
     * @private
     */
    chartMouseLeave(e: PointerEvent): boolean;
    /**
     * Handles the mouse end event for the circular 3D chart.
     *
     * @param {PointerEvent} e - Mouse event arguments.
     * @returns {boolean} - Indicates the mouse end event for the circular 3D chart.
     * @private
     */
    chartMouseUp(e: PointerEvent): boolean;
    /**
     * Handles the mouse start event on the circular 3D chart.
     *
     * @param {PointerEvent} e - Mouse event arguments.
     * @returns {boolean} - Indicates whether the mouse start event was handled by the circular 3D chart.
     * @private
     */
    chartMouseDown(e: PointerEvent): boolean;
    /**
     * Applies styles for the circular 3D chart element.
     *
     * @param {HTMLElement} element - Specifies the circular 3D chart element.
     * @returns {void}
     */
    private setStyle;
    /**
     * Method to set the culture for the circular 3D chart.
     *
     * @returns {void}
     */
    private setCulture;
    /**
     * Renders the circular 3D chart elements.
     *
     * @returns {void}
     * @private
     */
    protected render(): void;
    /**
     * Sets the theme for the circular 3D chart.
     *
     * @returns {void}
     */
    private setTheme;
    /**
     * Processes data from the data source to find points for rendering.
     *
     * @param {boolean} render - A boolean value indicating whether to trigger rendering after processing the data. Default is true.
     * @returns {void}
     */
    private processData;
    /**
     * Refreshes the circular 3D chart.
     *
     * @private
     * @returns {void}
     */
    refreshChart(): void;
    /**
     * Renders elements for the circular 3D chart.
     *
     * @private
     * @returns {void}
     */
    renderElements(): void;
    /**
     * Sets the tabindex attribute to '0' for the last element matching the selector pattern "[id*='region-series-0-point-0']".
     *
     * @returns {void}
     */
    private setSeriesTabIndex;
    /**
     * Processes the selection in the circular 3D chart.
     *
     * @returns {void}
     */
    private processSelection;
    /**
     * Performs a highlight animation on the specified HTML element with the given duration and starting opacity.
     *
     * @param {HTMLElement} element - The HTML element to animate.
     * @param {number} duration - The duration of the animation in milliseconds.
     * @param {number} startOpacity - The starting opacity value for the animation.
     * @returns {void}
     * @private
     */
    highlightAnimation(element: HTMLElement, duration: number, startOpacity: number): void;
    /**
     * Stops the animation for the specified HTML element in the circular 3D chart.
     *
     * @param {HTMLElement} element - The HTML element for which the animation should be stopped.
     * @returns {void}
     * @private
     */
    stopElementAnimation(element: HTMLElement): void;
    /**
     * Initiates and executes the animation for the circular 3D chart.
     * This method assumes the existence of visible series and focuses on the first series for animation.
     *
     * @returns {void}
     */
    private doAnimation;
    /**
     * Renders the legend for the circular 3D chart.
     *
     * @returns {void}
     */
    private renderLegend;
    /**
     * Initiates animation for the circular 3D series.
     *
     * @param {Element} slice - Specifies the slice element to animate.
     * @param {CircularChart3DSeries} series - Specifies the circular 3D chart series.
     * @returns {void}
     */
    private animationRect;
    /**
     * Gets the path arc direction for the circular 3D chart.
     *
     * @param {ChartLocation} center - Specifies the center of the series segment.
     * @param {number} start - Specifies the start angle in degrees.
     * @param {number} end  - Specifies the end angle in degrees.
     * @param {number} radius - Specifies the radius of the series.
     * @returns {string} - Path arc direction as an SVG path string.
     */
    private getPathArc;
    /**
     * Gets the SVG path string for a pie in the circular 3D chart.
     *
     * @param {ChartLocation} center - Specifies the center of the series segment.
     * @param {ChartLocation} start - Specifies the start angle in degrees.
     * @param {ChartLocation} end - Specifies the end angle in degrees.
     * @param {number} radius - Specifies the radius of the series.
     * @param {number} clockWise - Specifies the clockwise direction (0 for anti-clockwise, 1 for clockwise).
     * @returns {string} - SVG path string for the pie.
     */
    private getPiePath;
    /**
     * Renders the border for the circular 3D chart.
     *
     * @returns {void}
     */
    private renderBorder;
    /**
     * Creates the secondary element for tooltips and data labels.
     *
     * @returns {void}
     */
    private createSecondaryElement;
    /**
     * Renders the series for the circular 3D chart.
     *
     * @returns {void}
     */
    private renderSeries;
    /**
     * Sets the default label bounds for the specified circular 3D chart series based on its circular bounds.
     *
     * @param {CircularChart3DSeries} series - The CircularChart3DSeries for which to set the default label bounds.
     * @returns {void}
     */
    private defaultLabelBound;
    /**
     * Calculates and returns the bounding rectangle (Rect) for the specified circular 3D chart series.
     *
     * @param {CircularChart3DSeries} series - The CircularChart3DSeries for which to calculate the bounding rectangle.
     * @returns {Rect} - The calculated bounding rectangle for the series.
     */
    private getSeriesBound;
    /**
     * Computes and returns a rectangle (Rect) based on the specified angle.
     *
     * @param {number} angle - The angle used to calculate the rectangle position.
     * @returns {Rect} - The calculated rectangle representing the position.
     */
    private getRectFromAngle;
    /**
     * Renders the title for the circular 3D chart.
     *
     * @returns {void}
     */
    private renderTitle;
    /**
     * Gets the text anchor based on the specified alignment and RTL setting.
     *
     * @param {Alignment} alignment - The alignment of the text.
     * @param {boolean} enableRTL - A boolean indicating whether right-to-left (RTL) text is enabled.
     * @returns {string} - The text anchor value.
     */
    private getTextAnchor;
    /**
     * Renders the subtitle for the circular 3D chart.
     *
     * @param {TextOption} options - The text options for rendering the subtitle.
     * @returns {void}
     */
    private renderSubTitle;
    /**
     * Sets the left and top position for the data label and tooltip template for center-aligned chart.
     *
     * @private
     * @returns {void}
     */
    setSecondaryElementPosition(): void;
    /**
     * Creates an SVG element for the circular 3D chart.
     *
     * @returns {void}
     */
    private createPieSvg;
    /**
     * Removes the SVG from the circular 3D chart.
     *
     * @returns {void}
     * @private
     */
    removeSvg(): void;
    /**
     * Calculates and sets the visible series for the circular 3D chart.
     *
     * @returns {void}
     */
    private calculateVisibleSeries;
    /**
     * Method to calculate bounds for the circular 3D chart.
     *
     * @returns {void}
     * @private
     */
    calculateBounds(): void;
    private calculateLegendBounds;
    /**
     * Handles the print method for the circular 3D chart control.
     *
     * @param {string[] | string | Element} id - Specifies the element to print.
     * @returns {void}
     */
    print(id?: string[] | string | Element): void;
    /**
     * Export method for the circular 3D chart.
     *
     * @param {ExportType} type - Specifies the type of the image file (PNG, JPEG, SVG).
     * @param {string} fileName - Specifies the name of the exported image file.
     * @returns {void}
     */
    export(type: ExportType, fileName: string): void;
    /**
     * Export the chart on the page to a PDF document.
     *
     * @param {string} fileName - The name of the exported file.
     * @param {PdfPageOrientation} orientation - Page orientation (portrait or landscape).
     * @param {CircularChart3D[]} controls - Array of controls to be exported.
     * @param {number} width - The width of the exported chart.
     * @param {number} height - The height of the exported chart.
     * @param {boolean} isVertical - Export the chart vertically or horizontally.
     * @param {string} header - Text to appear at the top of the exported PDF document.
     * @param {string} footer - Text to appear at the bottom of the exported PDF document.
     * @param {boolean} exportToMultiplePage - Export the chart to multiple PDF pages.
     * @returns {void}
     */
    pdfExport(fileName: string, orientation?: PdfPageOrientation, controls?: (CircularChart3D)[], width?: number, height?: number, isVertical?: boolean, header?: IPDFArgs, footer?: IPDFArgs, exportToMultiplePage?: boolean): void;
    /**
     * Provides an array of modules needed for control rendering in the circular 3D chart.
     *
     * @returns {ModuleDeclaration[]} - An array of required modules.
     * @private
     */
    requiredModules(): ModuleDeclaration[];
    /**
     * Handles to set style for key event on the document.
     *
     * @param {target} target - element which currently focused.
     * @returns {void}
     * @private
     */
    private setNavigationStyle;
    /**
     * Handles to remove style for key event on the document.
     *
     * @returns {void}
     * @private
     */
    private removeNavigationStyle;
    /**
     * Handles the keyboard onkeydown event in the circular 3D chart.
     *
     * @param {KeyboardEvent} e - The keydown event arguments.
     * @returns {boolean} - Returns `false`.
     * @private
     */
    circular3DChartKeyDown(e: KeyboardEvent): boolean;
    /**
     * Handles keyboard navigation for the chart based on the provided KeyboardEvent, targetId, and actionKey.
     *
     * @param {KeyboardEvent} e - The keyboard event object.
     * @param {string} targetId - The ID of the target element related to the keyboard action.
     * @param {string} actionKey - The key representing the type of action (e.g., 'Tab', 'ArrowMove').
     * @returns {void}
     */
    private chartKeyboardNavigations;
    /**
     * Sets the tabindex attribute of the provided HTML element to '0'.
     *
     * @param {HTMLElement} element - The HTML element to be focused.
     * @returns {string} - The updated class attribute of the focused element.
     */
    private focusChild;
    /**
     * Handles the keyboard onkeyup event in the circular 3D chart.
     *
     * @param {KeyboardEvent} e - The keyup event arguments.
     * @returns {boolean} - Returns `false`.
     * @private
     */
    circular3DChartKeyUp(e: KeyboardEvent): boolean;
    /**
     * Calculates the actual index based on the specified index and total length.
     *
     * @param {number} index - The index to be adjusted.
     * @param {number} totalLength - The total length of the collection or array.
     * @returns {number} - The actual index after adjustment.
     */
    private getActualIndex;
    /**
     * Focuses the specified HTML element by setting its tabindex attribute to '0'.
     *
     * @param {HTMLElement} element - The HTML element to be focused.
     * @returns {string} - The updated class attribute of the focused element.
     */
    private focusTarget;
    /**
     * Sets the tabIndex property on the provided currentElement.
     *
     * @param {HTMLElement} previousElement - The previously focused HTML element.
     * @param {HTMLElement} currentElement - The currently focused HTML element.
     * @returns {void}
     */
    private setTabIndex;
    /**
     * Gets the properties to be maintained in the persisted state.
     *
     * @private
     * @returns {string} - A string representing the persisted data.
     */
    getPersistData(): string;
    /**
     * Gets the module name for the circular 3D chart.
     *
     *  @private
     * @returns {string} - The circular 3D chart module name.
     */
    getModuleName(): string;
    /**
     * Destroys the circular 3D chart instance.
     *
     * @private
     * @returns {void}
     */
    destroy(): void;
    /**
     * Handles the resize of the circular 3D chart.
     *
     * @returns {boolean} - Returns `true` to indicate the resize method of the circular 3D chart.
     * @private
     */
    chartResize(): boolean;
    /**
     * Retrieves the visible circular 3D chart series based on the specified index.
     *
     * @param {CircularChart3DSeries[]} visibleSeries - An array of visible circular 3D chart series.
     * @param {number} index - The index of the desired series.
     * @returns {CircularChart3DSeries} - The CircularChart3D series corresponding to the provided index.
     */
    private changeVisibleSeries;
    /**
     * Removes elements with IDs containing the substring "region-series-".
     *
     * @param {CircularChart3D} chart - The instance of the circular 3D chart.
     * @returns {void}
     * @private
     */
    removeSeriesElements(chart: CircularChart3D): void;
    /**
     * Called internally when any property value changes in the circular 3D chart.
     *
     * @private
     * @param {CircularChart3DModel} newProp - Specifies the new properties of the circular 3D chart.
     * @param {CircularChart3DModel} oldProp - Specifies the old properties of the circular 3D chart.
     */
    onPropertyChanged(newProp: CircularChart3DModel, oldProp: CircularChart3DModel): void;
}
